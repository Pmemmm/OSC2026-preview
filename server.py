#!/usr/bin/env python3
import json
import os
import base64
import secrets
import smtplib
import sqlite3
import time
from http.cookies import SimpleCookie
from datetime import datetime, timezone
from email.message import EmailMessage
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib import error as urllib_error
from urllib import request as urllib_request
from urllib.parse import parse_qs, quote, unquote, urlencode, urlparse

ROOT = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("MGPIC_DB", ROOT / "data" / "mgpic2026.sqlite3"))
GITHUB_SESSION_COOKIE = "mgpic_github_session"
GITHUB_SESSION_SECONDS = 60 * 60 * 24 * 14
GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_API_URL = "https://api.github.com"

FIELD_ALIASES = {
    "name": ["姓名", "参赛者", "项目负责人", "负责人", "name"],
    "email": ["邮箱", "联系邮箱", "联系方式", "email", "Email"],
    "school": ["学校", "学校 / 组织", "组织", "高校", "school"],
    "idNumber": ["身份证号", "身份证号码", "身份证", "证件号", "证件号码", "idNumber"],
    "githubLogin": ["GitHub 账号", "Github 账号", "GitHub用户名", "GitHub 用户名", "github", "githubLogin"],
    "githubRepo": ["GitHub 仓库", "Github 仓库", "项目 GitHub 链接", "GitHub仓库链接", "仓库链接", "githubRepo", "repo"],
    "projectName": ["项目名称", "项目名", "参赛项目", "projectName", "project"],
    "projectType": ["项目方向", "方向", "项目类型", "projectType"],
    "summary": ["项目简介", "简介", "项目说明", "summary"],
    "bankAccount": ["银行卡号", "银行账号", "收款账号", "银行卡", "bankAccount"],
    "bankBranch": ["开户支行", "开户银行", "开户行", "支行", "bankBranch"],
    "proposal": ["申报审核状态", "项目申报状态", "立项状态", "申报状态", "proposal", "proposalStatus"],
    "acceptance": ["验收状态", "项目验收状态", "验收审核状态", "acceptance", "acceptanceStatus"],
    "reward": ["奖励状态", "激励状态", "奖金状态", "reward", "rewardStatus"],
    "showcase": ["作品墙状态", "展示状态", "上墙状态", "showcase", "showcaseStatus"],
}

REGISTRATION_EXTRA_COLUMNS = {
    "id_number": "text not null default ''",
    "bank_account": "text not null default ''",
    "bank_branch": "text not null default ''",
    "id_front_file_name": "text not null default ''",
    "id_back_file_name": "text not null default ''",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("pragma foreign_keys = on")
    return connection


def init_db():
    with db() as connection:
        connection.executescript(
            """
            create table if not exists registrations (
              id integer primary key autoincrement,
              created_at text not null,
              updated_at text not null,
              name text not null default '',
              email text not null default '',
              school text not null default '',
              github_login text not null default '',
              github_repo text not null default '',
              project_name text not null default '',
              project_type text not null default '',
              summary text not null default '',
              proposal_file_name text not null default '',
              student_file_name text not null default '',
              source text not null default 'website'
            );

            create table if not exists registration_statuses (
              registration_id integer primary key,
              proposal text not null default '申报审核中',
              acceptance text not null default '未提交',
              reward text not null default '未开始',
              showcase text not null default '待上墙',
              notes text not null default '',
              updated_at text not null,
              foreign key (registration_id) references registrations(id) on delete cascade
            );

            create table if not exists repo_checks (
              id integer primary key autoincrement,
              registration_id integer not null,
              repo_url text not null default '',
              commit_count integer not null default 0,
              checks_json text not null default '[]',
              checked_at text not null,
              foreign key (registration_id) references registrations(id) on delete cascade
            );

            create table if not exists imported_records (
              id integer primary key autoincrement,
              created_at text not null,
              source text not null default 'feishu',
              payload_json text not null
            );

            create table if not exists registration_files (
              registration_id integer not null,
              kind text not null,
              filename text not null default '',
              content_type text not null default 'application/octet-stream',
              size integer not null default 0,
              data_base64 text not null default '',
              updated_at text not null,
              primary key (registration_id, kind),
              foreign key (registration_id) references registrations(id) on delete cascade
            );

            create table if not exists ai_reviews (
              id integer primary key autoincrement,
              registration_id integer not null,
              created_at text not null,
              mode text not null default 'proposal',
              engine text not null default '',
              model text not null default '',
              decision text not null default '',
              score integer not null default 0,
              next_stage text not null default '',
              summary text not null default '',
              reasons_json text not null default '[]',
              missing_items_json text not null default '[]',
              email_subject text not null default '',
              email_body text not null default '',
              raw_json text not null default '{}',
              foreign key (registration_id) references registrations(id) on delete cascade
            );

            create table if not exists notifications (
              id integer primary key autoincrement,
              registration_id integer not null,
              created_at text not null,
              sent_at text not null default '',
              channel text not null default 'email',
              recipient text not null default '',
              subject text not null default '',
              body text not null default '',
              status text not null default 'pending',
              error text not null default '',
              foreign key (registration_id) references registrations(id) on delete cascade
            );

            create table if not exists github_oauth_states (
              state text primary key,
              return_to text not null default '/progress.html',
              redirect_uri text not null default '',
              created_at real not null
            );

            create table if not exists github_sessions (
              session_id text primary key,
              created_at real not null,
              updated_at real not null,
              expires_at real not null,
              github_id text not null default '',
              github_login text not null default '',
              name text not null default '',
              email text not null default '',
              avatar_url text not null default '',
              html_url text not null default '',
              access_token text not null default ''
            );
            """
        )
        ensure_registration_columns(connection)


def ensure_registration_columns(connection):
    existing = {
        row["name"]
        for row in connection.execute("pragma table_info(registrations)").fetchall()
    }
    for column, definition in REGISTRATION_EXTRA_COLUMNS.items():
        if column not in existing:
            connection.execute(f"alter table registrations add column {column} {definition}")


def mask_middle(value, keep_start=3, keep_end=4):
    value = str(value or "").strip()
    if not value:
        return ""
    if len(value) <= keep_start + keep_end:
        return "*" * len(value)
    return f"{value[:keep_start]}{'*' * (len(value) - keep_start - keep_end)}{value[-keep_end:]}"


def github_oauth_configured():
    return bool(os.environ.get("GITHUB_CLIENT_ID", "").strip() and os.environ.get("GITHUB_CLIENT_SECRET", "").strip())


def request_host(handler):
    return handler.headers.get("X-Forwarded-Host") or handler.headers.get("Host") or "127.0.0.1:4174"


def is_local_host(host):
    hostname = host.split(":", 1)[0].lower()
    return hostname in {"127.0.0.1", "localhost", "::1"}


def request_scheme(handler):
    forwarded = handler.headers.get("X-Forwarded-Proto", "").split(",", 1)[0].strip()
    if forwarded:
        return forwarded
    return "http" if is_local_host(request_host(handler)) else "https"


def github_redirect_uri(handler):
    configured = os.environ.get("GITHUB_OAUTH_REDIRECT_URI", "").strip()
    if configured:
        return configured
    return f"{request_scheme(handler)}://{request_host(handler)}/api/auth/github/callback"


def clean_return_to(value):
    value = str(value or "/progress.html").strip() or "/progress.html"
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc:
        return "/progress.html"
    if not value.startswith("/"):
        value = f"/{value}"
    if "\r" in value or "\n" in value:
        return "/progress.html"
    return value


def append_query(path, params):
    parsed = urlparse(path)
    existing = parse_qs(parsed.query)
    for key, value in params.items():
        existing[key] = [value]
    query = urlencode({key: values[-1] for key, values in existing.items()})
    return parsed._replace(query=query).geturl()


def registration_from_row(row, include_sensitive=False):
    if row is None:
        return None
    sensitive_submitted = any(
        [
            row["id_number"],
            row["bank_account"],
            row["bank_branch"],
            row["id_front_file_name"],
            row["id_back_file_name"],
        ]
    )
    result = {
        "id": row["id"],
        "serverId": row["id"],
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"],
        "name": row["name"],
        "email": row["email"],
        "school": row["school"],
        "githubLogin": row["github_login"],
        "githubRepo": row["github_repo"],
        "projectName": row["project_name"],
        "projectType": row["project_type"],
        "summary": row["summary"],
        "proposalFileName": row["proposal_file_name"],
        "studentFileName": row["student_file_name"],
        "idFrontFileName": row["id_front_file_name"],
        "idBackFileName": row["id_back_file_name"],
        "idNumberMasked": mask_middle(row["id_number"]),
        "bankAccountMasked": mask_middle(row["bank_account"]),
        "sensitiveSubmitted": sensitive_submitted,
        "source": row["source"],
        "backendMode": "sqlite",
    }
    if include_sensitive:
        result.update(
            {
                "idNumber": row["id_number"],
                "bankAccount": row["bank_account"],
                "bankBranch": row["bank_branch"],
            }
        )
    return result


def status_from_row(row):
    if row is None:
        return None
    return {
        "proposal": row["proposal"],
        "acceptance": row["acceptance"],
        "reward": row["reward"],
        "showcase": row["showcase"],
        "notes": row["notes"],
        "updatedAt": row["updated_at"],
        "source": "backend",
    }


def repo_check_from_row(row):
    if row is None:
        return None
    try:
        checks = json.loads(row["checks_json"])
    except json.JSONDecodeError:
        checks = []
    return {
        "repoUrl": row["repo_url"],
        "commitCount": row["commit_count"],
        "checks": checks,
        "checkedAt": row["checked_at"],
    }


def file_from_row(row):
    if row is None:
        return None
    return {
        "kind": row["kind"],
        "filename": row["filename"],
        "contentType": row["content_type"],
        "size": row["size"],
        "updatedAt": row["updated_at"],
        "downloadUrl": f"/api/registrations/{row['registration_id']}/files/{row['kind']}",
    }


def json_list(value):
    try:
        parsed = json.loads(value or "[]")
        return parsed if isinstance(parsed, list) else []
    except json.JSONDecodeError:
        return []


def json_object(value):
    try:
        parsed = json.loads(value or "{}")
        return parsed if isinstance(parsed, dict) else {}
    except json.JSONDecodeError:
        return {}


def ai_review_from_row(row):
    if row is None:
        return None
    return {
        "id": row["id"],
        "registrationId": row["registration_id"],
        "createdAt": row["created_at"],
        "mode": row["mode"],
        "engine": row["engine"],
        "model": row["model"],
        "decision": row["decision"],
        "score": row["score"],
        "nextStage": row["next_stage"],
        "summary": row["summary"],
        "reasons": json_list(row["reasons_json"]),
        "missingItems": json_list(row["missing_items_json"]),
        "emailSubject": row["email_subject"],
        "emailBody": row["email_body"],
        "raw": json_object(row["raw_json"]),
    }


def notification_from_row(row):
    if row is None:
        return None
    return {
        "id": row["id"],
        "registrationId": row["registration_id"],
        "createdAt": row["created_at"],
        "sentAt": row["sent_at"],
        "channel": row["channel"],
        "recipient": row["recipient"],
        "subject": row["subject"],
        "body": row["body"],
        "status": row["status"],
        "error": row["error"],
    }


def clean_text(payload, key):
    value = payload.get(key, "")
    if value is None:
        return ""
    return str(value).strip()


def field_to_text(value):
    if isinstance(value, list):
        return "，".join([field_to_text(item) for item in value if field_to_text(item)])
    if isinstance(value, dict):
        for key in ("text", "name", "value", "url", "link"):
            if value.get(key):
                return str(value[key]).strip()
        return ""
    if value is None:
        return ""
    return str(value).strip()


def import_field(row, key):
    source = row.get("fields", row) if isinstance(row, dict) else {}
    if not isinstance(source, dict):
        return ""
    compact = {str(name).replace(" ", "").lower(): name for name in source.keys()}
    for alias in FIELD_ALIASES.get(key, [key]):
        if alias in source and field_to_text(source[alias]):
            return field_to_text(source[alias])
        compact_key = compact.get(str(alias).replace(" ", "").lower())
        if compact_key and field_to_text(source[compact_key]):
            return field_to_text(source[compact_key])
    return ""


def extract_output_text(data):
    if isinstance(data, dict) and isinstance(data.get("output_text"), str):
        return data["output_text"]
    chunks = []
    for item in data.get("output", []) if isinstance(data, dict) else []:
        for content in item.get("content", []) if isinstance(item, dict) else []:
            if isinstance(content, dict) and isinstance(content.get("text"), str):
                chunks.append(content["text"])
    return "\n".join(chunks)


def local_review(bundle, mode):
    registration = bundle["registration"]
    repo_check = bundle.get("repoCheck") or {}
    status = bundle.get("status") or {}
    files = bundle.get("files") or []
    checks = repo_check.get("checks") or []
    passed_checks = [item for item in checks if item.get("passed")]
    missing = [item.get("label") for item in checks if not item.get("passed")]
    score = 30
    reasons = []
    if registration.get("projectName"):
        score += 10
        reasons.append("已填写项目名称。")
    else:
        missing.append("项目名称")
    if registration.get("githubRepo"):
        score += 10
        reasons.append("已填写 GitHub 仓库。")
    else:
        missing.append("GitHub 仓库")
    if registration.get("summary"):
        score += 10
        reasons.append("已填写项目简介。")
    else:
        missing.append("项目简介")
    if any(file.get("kind") == "proposal" for file in files):
        score += 10
        reasons.append("已提交项目申报书。")
    else:
        missing.append("项目申报书 PDF")
    if checks:
        score += min(30, len(passed_checks) * 4)
        reasons.append(f"仓库检查通过 {len(passed_checks)} / {len(checks)} 项。")
    if mode == "acceptance" and not any(item.get("key") == "package" and item.get("passed") for item in checks):
        missing.append("发布到 mooncakes.io 或提供 MoonBit 包配置")
    if score >= 80:
        decision = "pass"
        next_stage = "进入下一流程"
        summary = "材料和公开仓库状态整体达标，建议进入下一流程。"
    elif score >= 55:
        decision = "needs_revision"
        next_stage = "补充材料后复核"
        summary = "项目具备基础条件，但仍建议补齐缺失项后再进入下一流程。"
    else:
        decision = "reject"
        next_stage = "暂不进入下一流程"
        summary = "关键信息或仓库质量不足，暂不建议进入下一流程。"
    subject = f"MoonBit 开源大赛：{registration.get('projectName') or '项目'}审核进度通知"
    body = (
        f"同学你好，你的项目「{registration.get('projectName') or '未命名项目'}」当前审核建议为：{summary}\n\n"
        f"下一步：{next_stage}\n"
        f"需要关注：{'、'.join(dict.fromkeys([item for item in missing if item])) or '暂无'}\n\n"
        "请登录比赛进度页查看最新状态。"
    )
    return {
        "engine": "local-rules",
        "model": "local-rules",
        "decision": decision,
        "score": min(100, score),
        "nextStage": next_stage,
        "summary": summary,
        "reasons": reasons,
        "missingItems": list(dict.fromkeys([item for item in missing if item])),
        "emailSubject": subject,
        "emailBody": body,
        "raw": {"status": status},
    }


def openai_review(bundle, mode):
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        return local_review(bundle, mode)
    model = os.environ.get("OPENAI_MODEL", "gpt-4o").strip()
    context = {
        "mode": mode,
        "registration": bundle.get("registration"),
        "status": bundle.get("status"),
        "repoCheck": bundle.get("repoCheck"),
        "files": [
            {key: value for key, value in file.items() if key != "downloadUrl"}
            for file in bundle.get("files", [])
        ],
        "rules": [
            "项目须以 MoonBit 为主要实现语言。",
            "公开 GitHub 仓库应有清晰提交记录。",
            "README 应说明目标、安装、使用方法和示例。",
            "CI 应覆盖检查、构建和测试流程。",
            "应提供测试、许可证和可运行示例。",
            "验收阶段应发布到 mooncakes.io 或提供明确包配置。",
        ],
    }
    prompt = (
        "你是 MoonBit 开源大赛的材料初审助手。请只根据给定 JSON 做审核建议，"
        "不要编造不存在的材料。你不能最终决定比赛结果，只能给管理员提供建议。"
        "请返回严格 JSON，字段包括：decision(pass/needs_revision/reject), score(0-100), "
        "nextStage, summary, reasons(array), missingItems(array), emailSubject, emailBody。"
    )
    payload = {
        "model": model,
        "input": [
            {"role": "system", "content": prompt},
            {"role": "user", "content": json.dumps(context, ensure_ascii=False)},
        ],
    }
    request = urllib_request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib_request.urlopen(request, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
        text = extract_output_text(data).strip()
        parsed = json.loads(text)
        return {
            "engine": "openai",
            "model": model,
            "decision": clean_text(parsed, "decision") or "needs_revision",
            "score": int(parsed.get("score") or 0),
            "nextStage": clean_text(parsed, "nextStage") or "补充材料后复核",
            "summary": clean_text(parsed, "summary") or "已生成审核建议。",
            "reasons": parsed.get("reasons") if isinstance(parsed.get("reasons"), list) else [],
            "missingItems": parsed.get("missingItems") if isinstance(parsed.get("missingItems"), list) else [],
            "emailSubject": clean_text(parsed, "emailSubject"),
            "emailBody": clean_text(parsed, "emailBody"),
            "raw": data,
        }
    except (urllib_error.URLError, TimeoutError, json.JSONDecodeError, ValueError) as exc:
        fallback = local_review(bundle, mode)
        fallback["engine"] = "local-rules-fallback"
        fallback["raw"] = {"error": str(exc)}
        return fallback


def send_email(recipient, subject, body):
    smtp_host = os.environ.get("SMTP_HOST", "").strip()
    sender = os.environ.get("SMTP_FROM", "").strip()
    if not smtp_host or not sender:
        return "pending", "SMTP_HOST 或 SMTP_FROM 未配置，通知已记录但未发送。"
    message = EmailMessage()
    message["From"] = sender
    message["To"] = recipient
    message["Subject"] = subject
    message.set_content(body)
    port = int(os.environ.get("SMTP_PORT", "587"))
    username = os.environ.get("SMTP_USER", "").strip()
    password = os.environ.get("SMTP_PASSWORD", "").strip()
    use_tls = os.environ.get("SMTP_TLS", "1") != "0"
    try:
        with smtplib.SMTP(smtp_host, port, timeout=30) as server:
            if use_tls:
                server.starttls()
            if username:
                server.login(username, password)
            server.send_message(message)
        return "sent", ""
    except Exception as exc:
        return "failed", str(exc)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        if path.startswith("/api/"):
            self.handle_api("GET", path)
            return
        if path == "/":
            self.path = "/index.html"
        super().do_GET()

    def do_POST(self):
        self.handle_api("POST", urlparse(self.path).path)

    def do_PUT(self):
        self.handle_api("PUT", urlparse(self.path).path)

    def do_PATCH(self):
        self.handle_api("PATCH", urlparse(self.path).path)

    def do_DELETE(self):
        self.handle_api("DELETE", urlparse(self.path).path)

    def read_json(self):
        size = int(self.headers.get("Content-Length", "0"))
        if size == 0:
            return {}
        body = self.rfile.read(size).decode("utf-8")
        return json.loads(body)

    def write_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def write_error(self, message, status=400):
        self.write_json({"error": message}, status)

    def redirect(self, location, status=302):
        self.send_response(status)
        self.send_header("Location", location)
        self.end_headers()

    def set_session_cookie(self, session_id, max_age=GITHUB_SESSION_SECONDS):
        secure = "; Secure" if request_scheme(self) == "https" else ""
        cookie = (
            f"{GITHUB_SESSION_COOKIE}={session_id}; Path=/; HttpOnly; "
            f"SameSite=Lax; Max-Age={max_age}{secure}"
        )
        self.send_header("Set-Cookie", cookie)

    def clear_session_cookie(self):
        secure = "; Secure" if request_scheme(self) == "https" else ""
        self.send_header(
            "Set-Cookie",
            f"{GITHUB_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0{secure}",
        )

    def cookie_value(self, name):
        cookie = SimpleCookie(self.headers.get("Cookie", ""))
        morsel = cookie.get(name)
        return morsel.value if morsel else ""

    def handle_api(self, method, path):
        try:
            if path == "/api/health" and method == "GET":
                self.write_json({
                    "ok": True,
                    "database": str(DB_PATH),
                    "githubOAuth": github_oauth_configured(),
                })
                return

            if path == "/api/auth/github/start" and method == "GET":
                self.github_oauth_start()
                return

            if path == "/api/auth/github/callback" and method == "GET":
                self.github_oauth_callback()
                return

            if path == "/api/auth/github/session" and method == "GET":
                self.github_session()
                return

            if path == "/api/auth/github/logout" and method == "POST":
                self.github_logout()
                return

            if path == "/api/registrations" and method == "GET":
                self.list_registrations()
                return

            if path == "/api/registrations" and method == "POST":
                self.create_registration()
                return

            parts = [unquote(part) for part in path.strip("/").split("/")]
            if len(parts) >= 3 and parts[0] == "api" and parts[1] == "registrations":
                registration_id = int(parts[2])
                if len(parts) == 3 and method == "GET":
                    self.get_registration(registration_id)
                    return
                if len(parts) == 3 and method == "PUT":
                    self.update_registration(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "status" and method == "PATCH":
                    self.update_status(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "repo-check" and method == "POST":
                    self.save_repo_check(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "ai-review" and method == "POST":
                    self.create_ai_review(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "ai-reviews" and method == "GET":
                    self.list_ai_reviews(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "advance" and method == "POST":
                    self.advance_registration(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "notify" and method == "POST":
                    self.notify_registration(registration_id)
                    return
                if len(parts) == 4 and parts[3] == "files" and method == "GET":
                    self.list_files(registration_id)
                    return
                if len(parts) == 5 and parts[3] == "files" and method == "GET":
                    self.download_file(registration_id, parts[4])
                    return
                if len(parts) == 3 and method == "DELETE":
                    self.delete_registration(registration_id)
                    return

            if path == "/api/import/feishu" and method == "POST":
                self.save_imported_records()
                return

            self.write_error("接口不存在", 404)
        except ValueError:
            self.write_error("请求参数格式错误", 400)
        except json.JSONDecodeError:
            self.write_error("JSON 格式错误", 400)
        except Exception as exc:
            self.write_error(str(exc), 500)

    def github_oauth_start(self):
        query = parse_qs(urlparse(self.path).query)
        return_to = clean_return_to(query.get("return_to", ["/progress.html"])[0])
        if not github_oauth_configured():
            self.redirect(append_query(return_to, {"github_auth": "not_configured"}))
            return

        state = secrets.token_urlsafe(32)
        redirect_uri = github_redirect_uri(self)
        now = time.time()
        with db() as connection:
            connection.execute(
                "delete from github_oauth_states where created_at < ?",
                (now - 600,),
            )
            connection.execute(
                """
                insert into github_oauth_states (state, return_to, redirect_uri, created_at)
                values (?, ?, ?, ?)
                """,
                (state, return_to, redirect_uri, now),
            )
        params = {
            "client_id": os.environ.get("GITHUB_CLIENT_ID", "").strip(),
            "redirect_uri": redirect_uri,
            "scope": "read:user user:email",
            "state": state,
            "allow_signup": "true",
        }
        self.redirect(f"{GITHUB_AUTH_URL}?{urlencode(params)}")

    def github_oauth_callback(self):
        query = parse_qs(urlparse(self.path).query)
        state = query.get("state", [""])[0]
        code = query.get("code", [""])[0]
        error = query.get("error", [""])[0]
        with db() as connection:
            state_row = connection.execute(
                "select * from github_oauth_states where state = ?",
                (state,),
            ).fetchone()
            if state:
                connection.execute("delete from github_oauth_states where state = ?", (state,))
        return_to = clean_return_to(state_row["return_to"] if state_row else "/progress.html")

        if error:
            self.redirect(append_query(return_to, {"github_auth": "denied"}))
            return
        if not state_row or not code or time.time() - float(state_row["created_at"]) > 600:
            self.redirect(append_query(return_to, {"github_auth": "state_error"}))
            return

        try:
            access_token = self.github_exchange_code(code, state_row["redirect_uri"])
            user = self.github_fetch_user(access_token)
            session_id = secrets.token_urlsafe(48)
            now = time.time()
            with db() as connection:
                connection.execute(
                    """
                    insert into github_sessions (
                      session_id, created_at, updated_at, expires_at, github_id,
                      github_login, name, email, avatar_url, html_url, access_token
                    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        session_id,
                        now,
                        now,
                        now + GITHUB_SESSION_SECONDS,
                        str(user.get("id") or ""),
                        user.get("login") or "",
                        user.get("name") or "",
                        user.get("email") or "",
                        user.get("avatarUrl") or "",
                        user.get("htmlUrl") or "",
                        access_token,
                    ),
                )
            self.send_response(302)
            self.send_header("Location", append_query(return_to, {"github_auth": "ok"}))
            self.set_session_cookie(session_id)
            self.end_headers()
        except Exception as exc:
            self.redirect(append_query(return_to, {"github_auth": "failed", "reason": str(exc)[:80]}))

    def github_exchange_code(self, code, redirect_uri):
        payload = urlencode(
            {
                "client_id": os.environ.get("GITHUB_CLIENT_ID", "").strip(),
                "client_secret": os.environ.get("GITHUB_CLIENT_SECRET", "").strip(),
                "code": code,
                "redirect_uri": redirect_uri,
            }
        ).encode("utf-8")
        request = urllib_request.Request(
            GITHUB_TOKEN_URL,
            data=payload,
            headers={
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "MGPIC2026",
            },
            method="POST",
        )
        with urllib_request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
        token = data.get("access_token")
        if not token:
            raise ValueError(data.get("error_description") or data.get("error") or "GitHub 授权失败")
        return token

    def github_api_get(self, access_token, path):
        request = urllib_request.Request(
            f"{GITHUB_API_URL}{path}",
            headers={
                "Accept": "application/vnd.github+json",
                "Authorization": f"Bearer {access_token}",
                "User-Agent": "MGPIC2026",
                "X-GitHub-Api-Version": "2022-11-28",
            },
            method="GET",
        )
        with urllib_request.urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))

    def github_fetch_user(self, access_token):
        profile = self.github_api_get(access_token, "/user")
        email = profile.get("email") or ""
        try:
            emails = self.github_api_get(access_token, "/user/emails")
            if isinstance(emails, list):
                primary = next((item for item in emails if item.get("primary") and item.get("verified")), None)
                verified = next((item for item in emails if item.get("verified")), None)
                chosen = primary or verified or (emails[0] if emails else None)
                email = (chosen or {}).get("email") or email
        except Exception:
            pass
        return {
            "id": profile.get("id"),
            "login": profile.get("login") or "",
            "name": profile.get("name") or "",
            "email": email,
            "avatarUrl": profile.get("avatar_url") or "",
            "htmlUrl": profile.get("html_url") or "",
        }

    def current_github_session(self):
        session_id = self.cookie_value(GITHUB_SESSION_COOKIE)
        if not session_id:
            return None
        with db() as connection:
            row = connection.execute(
                "select * from github_sessions where session_id = ? and expires_at > ?",
                (session_id, time.time()),
            ).fetchone()
            if row is None:
                connection.execute("delete from github_sessions where session_id = ?", (session_id,))
                return None
            connection.execute(
                "update github_sessions set updated_at = ? where session_id = ?",
                (time.time(), session_id),
            )
            return row

    def github_session_user(self, row):
        if row is None:
            return None
        return {
            "id": row["github_id"],
            "login": row["github_login"],
            "name": row["name"],
            "email": row["email"],
            "avatarUrl": row["avatar_url"],
            "htmlUrl": row["html_url"],
            "oauth": True,
        }

    def github_session(self):
        row = self.current_github_session()
        self.write_json(
            {
                "configured": github_oauth_configured(),
                "authenticated": row is not None,
                "user": self.github_session_user(row),
            }
        )

    def github_logout(self):
        session_id = self.cookie_value(GITHUB_SESSION_COOKIE)
        if session_id:
            with db() as connection:
                connection.execute("delete from github_sessions where session_id = ?", (session_id,))
        self.send_response(204)
        self.clear_session_cookie()
        self.end_headers()

    def list_registrations(self):
        with db() as connection:
            rows = connection.execute(
                """
                select
                  r.*,
                  s.proposal,
                  s.acceptance,
                  s.reward,
                  s.showcase,
                  s.notes,
                  s.updated_at as status_updated_at
                from registrations r
                left join registration_statuses s on s.registration_id = r.id
                order by r.id desc
                limit 500
                """
            ).fetchall()
        registrations = []
        for row in rows:
            item = registration_from_row(row)
            item["status"] = {
                "proposal": row["proposal"] or "申报审核中",
                "acceptance": row["acceptance"] or "未提交",
                "reward": row["reward"] or "未开始",
                "showcase": row["showcase"] or "待上墙",
                "notes": row["notes"] or "",
                "updatedAt": row["status_updated_at"] or row["updated_at"],
                "source": "backend",
            }
            registrations.append(item)
        self.write_json({"registrations": registrations})

    def get_registration_bundle(self, connection, registration_id, include_sensitive=False):
        registration = connection.execute(
            "select * from registrations where id = ?", (registration_id,)
        ).fetchone()
        if registration is None:
            return None
        status = connection.execute(
            "select * from registration_statuses where registration_id = ?", (registration_id,)
        ).fetchone()
        repo_check = connection.execute(
            "select * from repo_checks where registration_id = ? order by id desc limit 1",
            (registration_id,),
        ).fetchone()
        files = connection.execute(
            "select * from registration_files where registration_id = ? order by kind",
            (registration_id,),
        ).fetchall()
        ai_reviews = connection.execute(
            "select * from ai_reviews where registration_id = ? order by id desc limit 10",
            (registration_id,),
        ).fetchall()
        notifications = connection.execute(
            "select * from notifications where registration_id = ? order by id desc limit 10",
            (registration_id,),
        ).fetchall()
        return {
            "registration": registration_from_row(registration, include_sensitive=include_sensitive),
            "status": status_from_row(status),
            "repoCheck": repo_check_from_row(repo_check),
            "files": [file_from_row(row) for row in files],
            "aiReviews": [ai_review_from_row(row) for row in ai_reviews],
            "notifications": [notification_from_row(row) for row in notifications],
        }

    def get_registration(self, registration_id):
        query = parse_qs(urlparse(self.path).query)
        include_sensitive = query.get("admin", ["0"])[0] == "1"
        with db() as connection:
            bundle = self.get_registration_bundle(
                connection,
                registration_id,
                include_sensitive=include_sensitive,
            )
        if bundle is None:
            self.write_error("报名记录不存在", 404)
            return
        self.write_json(bundle)

    def create_registration(self):
        payload = self.read_json()
        timestamp = now_iso()
        values = self.registration_values(payload)
        with db() as connection:
            cursor = connection.execute(
                """
                insert into registrations (
                  created_at, updated_at, name, email, school, github_login,
                  github_repo, project_name, project_type, summary,
                  proposal_file_name, student_file_name, id_number, bank_account,
                  bank_branch, id_front_file_name, id_back_file_name, source
                ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (timestamp, timestamp, *values, "website"),
            )
            registration_id = cursor.lastrowid
            connection.execute(
                """
                insert into registration_statuses (
                  registration_id, proposal, acceptance, reward, showcase, updated_at
                ) values (?, '申报审核中', '未提交', '未开始', '待上墙', ?)
                """,
                (registration_id, timestamp),
            )
            self.upsert_files(connection, registration_id, payload, timestamp)
            bundle = self.get_registration_bundle(connection, registration_id)
        self.write_json(bundle, 201)

    def update_registration(self, registration_id):
        payload = self.read_json()
        timestamp = now_iso()
        values = self.registration_values(payload)
        with db() as connection:
            exists = connection.execute(
                "select id from registrations where id = ?", (registration_id,)
            ).fetchone()
            if exists is None:
                self.write_error("报名记录不存在", 404)
                return
            connection.execute(
                """
                update registrations set
                  updated_at = ?, name = ?, email = ?, school = ?, github_login = ?,
                  github_repo = ?, project_name = ?, project_type = ?, summary = ?,
                  proposal_file_name = ?, student_file_name = ?, id_number = ?,
                  bank_account = ?, bank_branch = ?, id_front_file_name = ?,
                  id_back_file_name = ?
                where id = ?
                """,
                (timestamp, *values, registration_id),
            )
            self.upsert_files(connection, registration_id, payload, timestamp)
            bundle = self.get_registration_bundle(connection, registration_id)
        self.write_json(bundle)

    def registration_values(self, payload):
        return (
            clean_text(payload, "name"),
            clean_text(payload, "email"),
            clean_text(payload, "school"),
            clean_text(payload, "githubLogin"),
            clean_text(payload, "githubRepo"),
            clean_text(payload, "projectName"),
            clean_text(payload, "projectType"),
            clean_text(payload, "summary"),
            clean_text(payload, "proposalFileName"),
            clean_text(payload, "studentFileName"),
            clean_text(payload, "idNumber"),
            clean_text(payload, "bankAccount"),
            clean_text(payload, "bankBranch"),
            clean_text(payload, "idFrontFileName"),
            clean_text(payload, "idBackFileName"),
        )

    def upsert_files(self, connection, registration_id, payload, timestamp):
        for kind, key, filename_key in (
            ("proposal", "proposalFile", "proposalFileName"),
            ("student", "studentFile", "studentFileName"),
            ("id_front", "idFrontFile", "idFrontFileName"),
            ("id_back", "idBackFile", "idBackFileName"),
        ):
            file_payload = payload.get(key)
            if not isinstance(file_payload, dict) or not file_payload.get("data"):
                continue
            filename = clean_text(file_payload, "name") or clean_text(payload, filename_key)
            content_type = clean_text(file_payload, "type") or "application/octet-stream"
            data_base64 = clean_text(file_payload, "data")
            size = int(file_payload.get("size") or 0)
            connection.execute(
                """
                insert into registration_files (
                  registration_id, kind, filename, content_type, size, data_base64, updated_at
                ) values (?, ?, ?, ?, ?, ?, ?)
                on conflict(registration_id, kind) do update set
                  filename = excluded.filename,
                  content_type = excluded.content_type,
                  size = excluded.size,
                  data_base64 = excluded.data_base64,
                  updated_at = excluded.updated_at
                """,
                (registration_id, kind, filename, content_type, size, data_base64, timestamp),
            )

    def update_status(self, registration_id):
        payload = self.read_json()
        timestamp = now_iso()
        with db() as connection:
            exists = connection.execute(
                "select id from registrations where id = ?", (registration_id,)
            ).fetchone()
            if exists is None:
                self.write_error("报名记录不存在", 404)
                return
            connection.execute(
                """
                insert into registration_statuses (
                  registration_id, proposal, acceptance, reward, showcase, notes, updated_at
                ) values (?, ?, ?, ?, ?, ?, ?)
                on conflict(registration_id) do update set
                  proposal = excluded.proposal,
                  acceptance = excluded.acceptance,
                  reward = excluded.reward,
                  showcase = excluded.showcase,
                  notes = excluded.notes,
                  updated_at = excluded.updated_at
                """,
                (
                    registration_id,
                    clean_text(payload, "proposal") or "申报审核中",
                    clean_text(payload, "acceptance") or "未提交",
                    clean_text(payload, "reward") or "未开始",
                    clean_text(payload, "showcase") or "待上墙",
                    clean_text(payload, "notes"),
                    timestamp,
                ),
            )
            status = connection.execute(
                "select * from registration_statuses where registration_id = ?",
                (registration_id,),
            ).fetchone()
        self.write_json({"status": status_from_row(status)})

    def save_repo_check(self, registration_id):
        payload = self.read_json()
        checks = payload.get("checks", [])
        if not isinstance(checks, list):
            checks = []
        with db() as connection:
            exists = connection.execute(
                "select id from registrations where id = ?", (registration_id,)
            ).fetchone()
            if exists is None:
                self.write_error("报名记录不存在", 404)
                return
            connection.execute(
                """
                insert into repo_checks (
                  registration_id, repo_url, commit_count, checks_json, checked_at
                ) values (?, ?, ?, ?, ?)
                """,
                (
                    registration_id,
                    clean_text(payload, "repoUrl"),
                    int(payload.get("commitCount") or 0),
                    json.dumps(checks, ensure_ascii=False),
                    clean_text(payload, "checkedAt") or now_iso(),
                ),
            )
        self.write_json({"ok": True})

    def insert_ai_review(self, connection, registration_id, mode, review):
        cursor = connection.execute(
            """
            insert into ai_reviews (
              registration_id, created_at, mode, engine, model, decision, score,
              next_stage, summary, reasons_json, missing_items_json,
              email_subject, email_body, raw_json
            ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                registration_id,
                now_iso(),
                mode,
                review.get("engine", ""),
                review.get("model", ""),
                review.get("decision", ""),
                int(review.get("score") or 0),
                review.get("nextStage", ""),
                review.get("summary", ""),
                json.dumps(review.get("reasons", []), ensure_ascii=False),
                json.dumps(review.get("missingItems", []), ensure_ascii=False),
                review.get("emailSubject", ""),
                review.get("emailBody", ""),
                json.dumps(review.get("raw", {}), ensure_ascii=False),
            ),
        )
        return cursor.lastrowid

    def create_ai_review(self, registration_id):
        payload = self.read_json()
        mode = clean_text(payload, "mode") or "proposal"
        with db() as connection:
            bundle = self.get_registration_bundle(connection, registration_id)
            if bundle is None:
                self.write_error("报名记录不存在", 404)
                return
            review = openai_review(bundle, mode)
            review_id = self.insert_ai_review(connection, registration_id, mode, review)
            row = connection.execute("select * from ai_reviews where id = ?", (review_id,)).fetchone()
        self.write_json({"review": ai_review_from_row(row)})

    def list_ai_reviews(self, registration_id):
        with db() as connection:
            rows = connection.execute(
                "select * from ai_reviews where registration_id = ? order by id desc limit 50",
                (registration_id,),
            ).fetchall()
        self.write_json({"aiReviews": [ai_review_from_row(row) for row in rows]})

    def latest_ai_review(self, connection, registration_id, mode):
        return connection.execute(
            """
            select * from ai_reviews
            where registration_id = ? and mode = ?
            order by id desc limit 1
            """,
            (registration_id, mode),
        ).fetchone()

    def insert_notification(self, connection, registration_id, recipient, subject, body):
        status, error = send_email(recipient, subject, body)
        timestamp = now_iso()
        cursor = connection.execute(
            """
            insert into notifications (
              registration_id, created_at, sent_at, channel, recipient, subject, body, status, error
            ) values (?, ?, ?, 'email', ?, ?, ?, ?, ?)
            """,
            (
                registration_id,
                timestamp,
                timestamp if status == "sent" else "",
                recipient,
                subject,
                body,
                status,
                error,
            ),
        )
        return cursor.lastrowid

    def advance_registration(self, registration_id):
        payload = self.read_json()
        mode = clean_text(payload, "mode") or "proposal"
        with db() as connection:
            bundle = self.get_registration_bundle(connection, registration_id)
            if bundle is None:
                self.write_error("报名记录不存在", 404)
                return
            current = bundle.get("status") or {}
            next_status = {
                "proposal": current.get("proposal") or "申报审核中",
                "acceptance": current.get("acceptance") or "未提交",
                "reward": current.get("reward") or "未开始",
                "showcase": current.get("showcase") or "待上墙",
                "notes": current.get("notes") or "",
            }
            if mode == "acceptance":
                next_status.update({
                    "proposal": "申报通过",
                    "acceptance": "验收通过",
                    "reward": "完成支持待发放",
                    "showcase": "候选项目",
                })
            elif mode == "showcase":
                next_status.update({
                    "proposal": "申报通过",
                    "acceptance": "验收通过",
                    "showcase": "已上墙",
                })
            else:
                next_status.update({
                    "proposal": "申报通过",
                    "reward": "启动支持待发放",
                })
            next_status["notes"] = clean_text(payload, "notes") or next_status["notes"]
            timestamp = now_iso()
            connection.execute(
                """
                insert into registration_statuses (
                  registration_id, proposal, acceptance, reward, showcase, notes, updated_at
                ) values (?, ?, ?, ?, ?, ?, ?)
                on conflict(registration_id) do update set
                  proposal = excluded.proposal,
                  acceptance = excluded.acceptance,
                  reward = excluded.reward,
                  showcase = excluded.showcase,
                  notes = excluded.notes,
                  updated_at = excluded.updated_at
                """,
                (
                    registration_id,
                    next_status["proposal"],
                    next_status["acceptance"],
                    next_status["reward"],
                    next_status["showcase"],
                    next_status["notes"],
                    timestamp,
                ),
            )
            review_row = self.latest_ai_review(connection, registration_id, mode)
            review = ai_review_from_row(review_row) if review_row else None
            registration = bundle["registration"]
            subject = clean_text(payload, "subject") or (review or {}).get("emailSubject") or f"MoonBit 开源大赛：{registration.get('projectName') or '项目'}进入下一流程"
            body = clean_text(payload, "body") or (review or {}).get("emailBody") or (
                f"同学你好，你的项目「{registration.get('projectName') or '未命名项目'}」已进入下一流程。\n\n"
                "请登录比赛进度页查看最新状态，并按要求继续完善项目。"
            )
            notification_id = None
            if registration.get("email"):
                notification_id = self.insert_notification(connection, registration_id, registration["email"], subject, body)
            updated = self.get_registration_bundle(connection, registration_id)
            notification = connection.execute(
                "select * from notifications where id = ?", (notification_id,)
            ).fetchone() if notification_id else None
        self.write_json({
            **updated,
            "notification": notification_from_row(notification),
        })

    def notify_registration(self, registration_id):
        payload = self.read_json()
        with db() as connection:
            bundle = self.get_registration_bundle(connection, registration_id)
            if bundle is None:
                self.write_error("报名记录不存在", 404)
                return
            registration = bundle["registration"]
            recipient = clean_text(payload, "recipient") or registration.get("email", "")
            if not recipient:
                self.write_error("没有可通知的邮箱地址", 400)
                return
            subject = clean_text(payload, "subject") or f"MoonBit 开源大赛：{registration.get('projectName') or '项目'}进度通知"
            body = clean_text(payload, "body") or "你的比赛进度已更新，请登录比赛进度页查看。"
            notification_id = self.insert_notification(connection, registration_id, recipient, subject, body)
            notification = connection.execute(
                "select * from notifications where id = ?", (notification_id,)
            ).fetchone()
        self.write_json({"notification": notification_from_row(notification)})

    def list_files(self, registration_id):
        with db() as connection:
            rows = connection.execute(
                "select * from registration_files where registration_id = ? order by kind",
                (registration_id,),
            ).fetchall()
        self.write_json({"files": [file_from_row(row) for row in rows]})

    def download_file(self, registration_id, kind):
        with db() as connection:
            row = connection.execute(
                "select * from registration_files where registration_id = ? and kind = ?",
                (registration_id, kind),
            ).fetchone()
        if row is None:
            self.write_error("文件不存在", 404)
            return
        data = base64.b64decode(row["data_base64"])
        filename = row["filename"] or f"{kind}.bin"
        self.send_response(200)
        self.send_header("Content-Type", row["content_type"] or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Content-Disposition", f"attachment; filename*=UTF-8''{quote(filename)}")
        self.end_headers()
        self.wfile.write(data)

    def delete_registration(self, registration_id):
        with db() as connection:
            cursor = connection.execute("delete from registrations where id = ?", (registration_id,))
        if cursor.rowcount == 0:
            self.write_error("报名记录不存在", 404)
            return
        self.write_json({"ok": True})

    def save_imported_records(self):
        payload = self.read_json()
        rows = payload.get("rows", [])
        if not isinstance(rows, list):
            self.write_error("rows 必须是数组", 400)
            return
        with db() as connection:
            connection.execute(
                "insert into imported_records (created_at, source, payload_json) values (?, ?, ?)",
                (now_iso(), clean_text(payload, "source") or "feishu", json.dumps(rows, ensure_ascii=False)),
            )
            upserted = self.upsert_feishu_rows(connection, rows)
        self.write_json({"ok": True, "count": len(rows), "upserted": upserted})

    def upsert_feishu_rows(self, connection, rows):
        count = 0
        for row in rows:
            if not isinstance(row, dict):
                continue
            data = {
                "name": import_field(row, "name"),
                "email": import_field(row, "email"),
                "school": import_field(row, "school"),
                "idNumber": import_field(row, "idNumber"),
                "githubLogin": import_field(row, "githubLogin"),
                "githubRepo": import_field(row, "githubRepo"),
                "projectName": import_field(row, "projectName"),
                "projectType": import_field(row, "projectType"),
                "summary": import_field(row, "summary"),
                "bankAccount": import_field(row, "bankAccount"),
                "bankBranch": import_field(row, "bankBranch"),
                "proposal": import_field(row, "proposal"),
                "acceptance": import_field(row, "acceptance"),
                "reward": import_field(row, "reward"),
                "showcase": import_field(row, "showcase"),
            }
            if not any([data["email"], data["githubRepo"], data["projectName"]]):
                continue
            existing = None
            if data["email"]:
                existing = connection.execute(
                    "select id from registrations where lower(email) = lower(?)",
                    (data["email"],),
                ).fetchone()
            if existing is None and data["githubRepo"]:
                existing = connection.execute(
                    "select id from registrations where lower(github_repo) = lower(?)",
                    (data["githubRepo"],),
                ).fetchone()
            timestamp = now_iso()
            if existing:
                registration_id = existing["id"]
                connection.execute(
                    """
                    update registrations set
                      updated_at = ?,
                      name = coalesce(nullif(?, ''), name),
                      email = coalesce(nullif(?, ''), email),
                      school = coalesce(nullif(?, ''), school),
                      id_number = coalesce(nullif(?, ''), id_number),
                      github_login = coalesce(nullif(?, ''), github_login),
                      github_repo = coalesce(nullif(?, ''), github_repo),
                      project_name = coalesce(nullif(?, ''), project_name),
                      project_type = coalesce(nullif(?, ''), project_type),
                      summary = coalesce(nullif(?, ''), summary),
                      bank_account = coalesce(nullif(?, ''), bank_account),
                      bank_branch = coalesce(nullif(?, ''), bank_branch),
                      source = 'feishu'
                    where id = ?
                    """,
                    (
                        timestamp,
                        data["name"],
                        data["email"],
                        data["school"],
                        data["idNumber"],
                        data["githubLogin"],
                        data["githubRepo"],
                        data["projectName"],
                        data["projectType"],
                        data["summary"],
                        data["bankAccount"],
                        data["bankBranch"],
                        registration_id,
                    ),
                )
            else:
                cursor = connection.execute(
                    """
                    insert into registrations (
                      created_at, updated_at, name, email, school, github_login,
                      github_repo, project_name, project_type, summary,
                      proposal_file_name, student_file_name, id_number, bank_account,
                      bank_branch, id_front_file_name, id_back_file_name, source
                    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', '', ?, ?, ?, '', '', 'feishu')
                    """,
                    (
                        timestamp,
                        timestamp,
                        data["name"],
                        data["email"],
                        data["school"],
                        data["githubLogin"],
                        data["githubRepo"],
                        data["projectName"],
                        data["projectType"],
                        data["summary"],
                        data["idNumber"],
                        data["bankAccount"],
                        data["bankBranch"],
                    ),
                )
                registration_id = cursor.lastrowid
            connection.execute(
                """
                insert into registration_statuses (
                  registration_id, proposal, acceptance, reward, showcase, notes, updated_at
                ) values (?, ?, ?, ?, ?, '', ?)
                on conflict(registration_id) do update set
                  proposal = coalesce(nullif(excluded.proposal, ''), registration_statuses.proposal),
                  acceptance = coalesce(nullif(excluded.acceptance, ''), registration_statuses.acceptance),
                  reward = coalesce(nullif(excluded.reward, ''), registration_statuses.reward),
                  showcase = coalesce(nullif(excluded.showcase, ''), registration_statuses.showcase),
                  updated_at = excluded.updated_at
                """,
                (
                    registration_id,
                    data["proposal"] or "申报审核中",
                    data["acceptance"] or "未提交",
                    data["reward"] or "未开始",
                    data["showcase"] or "待上墙",
                    timestamp,
                ),
            )
            count += 1
        return count


def main():
    init_db()
    port = int(os.environ.get("PORT", "4174"))
    host = os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"MGPIC 2026 server: http://{host}:{port}")
    print(f"SQLite database: {DB_PATH}")
    server.serve_forever()


if __name__ == "__main__":
    main()
