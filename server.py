#!/usr/bin/env python3
import json
import os
import base64
import io
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
BACKUP_DIR = Path(os.environ.get("MGPIC_BACKUP_DIR", DB_PATH.parent / "backups"))
SNAPSHOT_DIR = Path(os.environ.get("MGPIC_SNAPSHOT_DIR", DB_PATH.parent / "snapshots"))
LEDGER_PATH = Path(os.environ.get("MGPIC_LEDGER_PATH", DB_PATH.parent / "ledger" / "events.jsonl"))
MAX_BACKUPS = int(os.environ.get("MGPIC_MAX_BACKUPS", "30"))
MAX_SNAPSHOTS = int(os.environ.get("MGPIC_MAX_SNAPSHOTS", "100"))
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
    "archived_at": "text not null default ''",
    "archived_reason": "text not null default ''",
}

CONTEST_REVIEW_RULES = [
    "赛事名称：MoonBit 国产基础软件生态开源大赛。",
    "面向在校生，个人参赛，每位参赛者提交一个参赛项目。",
    "4 月 29 日前已经存在的项目可以继续维护，但有效工作量只统计 4 月 29 日起新增提交。",
    "申报阶段需提交参赛信息、GitHub 仓库、一页左右 PDF 申报书；仓库建议已有 10-20 个有效 commits，不能用空提交或无意义拆分凑数。",
    "项目应围绕 MoonBit 开源生态库、生态包、开发工具或示例工程，具备明确功能、真实使用场景和可复用价值。",
    "项目可以原创，也可以移植或重写成熟语言生态中的开源库；移植项目必须说明原项目名称、链接、许可证和参考范围。",
    "不得直接重复 MoonBit 生态中已经存在且功能高度重合的成熟项目；如基于已有项目扩展，应说明新增价值和独立贡献。",
    "项目规模参考范围为 4-10k 有效 MoonBit 代码行数，重点看真实可用、边界清晰、文档完整、测试可运行和后续可维护。",
    "验收阶段要求 MoonBit 为主要实现语言，公开 GitHub 仓库，README 说明目标、安装、使用方式、示例和可复现方式。",
    "验收阶段要求 CI 覆盖检查、构建和测试流程，提供核心功能测试，至少一个可运行示例，并发布到 mooncakes.io。",
    "项目须采用 OSI 认可开源许可证，并遵守第三方依赖及参考项目许可证要求。",
    "优秀项目评选综合完成度、MoonBit 生态贡献、工程质量、文档体验、展示表现和长期维护潜力；入选项目可能参加决赛答辩，地点和流程后续公布。",
    "AI 工具可以用于代码生成、接口设计、测试补全、文档撰写和移植分析，但最终质量、许可证和技术边界由参赛者负责。",
]

EXPORT_TABLES = [
    "registrations",
    "registration_statuses",
    "status_events",
    "repo_checks",
    "imported_records",
    "registration_payloads",
    "registration_files",
    "ai_reviews",
    "notifications",
]

RESTORE_TABLES = list(reversed(EXPORT_TABLES))


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("pragma foreign_keys = on")
    connection.execute("pragma busy_timeout = 5000")
    connection.execute("pragma journal_mode = wal")
    return connection


def backup_name(reason):
    reason = "".join(char if char.isalnum() or char in {"-", "_"} else "-" for char in str(reason or "manual").lower())
    reason = "-".join(part for part in reason.split("-") if part)[:40] or "manual"
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    return f"mgpic2026-{stamp}-{reason}.sqlite3"


def backup_info(path):
    stat = path.stat()
    return {
        "name": path.name,
        "size": stat.st_size,
        "createdAt": datetime.fromtimestamp(stat.st_mtime, timezone.utc).isoformat(),
        "downloadUrl": f"/api/admin/backups/{quote(path.name)}",
    }


def list_backups(limit=20):
    if not BACKUP_DIR.exists():
        return []
    backups = sorted(BACKUP_DIR.glob("mgpic2026-*.sqlite3"), key=lambda item: item.stat().st_mtime, reverse=True)
    return [backup_info(path) for path in backups[:limit]]


def prune_backups():
    if MAX_BACKUPS <= 0 or not BACKUP_DIR.exists():
        return
    backups = sorted(BACKUP_DIR.glob("mgpic2026-*.sqlite3"), key=lambda item: item.stat().st_mtime, reverse=True)
    for path in backups[MAX_BACKUPS:]:
        try:
            path.unlink()
        except OSError:
            pass


def backup_database(reason="manual"):
    if not DB_PATH.exists():
        return None
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    destination = BACKUP_DIR / backup_name(reason)
    temporary = BACKUP_DIR / f"{destination.name}.tmp"
    with sqlite3.connect(DB_PATH) as source, sqlite3.connect(temporary) as target:
        source.backup(target)
    temporary.replace(destination)
    prune_backups()
    return backup_info(destination)


def snapshot_name(reason):
    reason = "".join(char if char.isalnum() or char in {"-", "_"} else "-" for char in str(reason or "manual").lower())
    reason = "-".join(part for part in reason.split("-") if part)[:40] or "manual"
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    return f"mgpic2026-{stamp}-{reason}.json"


def snapshot_info(path):
    stat = path.stat()
    return {
        "name": path.name,
        "size": stat.st_size,
        "createdAt": datetime.fromtimestamp(stat.st_mtime, timezone.utc).isoformat(),
        "downloadUrl": f"/api/admin/snapshots/{quote(path.name)}",
    }


def list_snapshots(limit=20):
    if not SNAPSHOT_DIR.exists():
        return []
    snapshots = sorted(SNAPSHOT_DIR.glob("mgpic2026-*.json"), key=lambda item: item.stat().st_mtime, reverse=True)
    return [snapshot_info(path) for path in snapshots[:limit]]


def prune_snapshots():
    if MAX_SNAPSHOTS <= 0 or not SNAPSHOT_DIR.exists():
        return
    snapshots = sorted(SNAPSHOT_DIR.glob("mgpic2026-*.json"), key=lambda item: item.stat().st_mtime, reverse=True)
    for path in snapshots[MAX_SNAPSHOTS:]:
        try:
            path.unlink()
        except OSError:
            pass


def write_text_atomic(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f"{path.name}.tmp")
    temporary.write_text(text, encoding="utf-8")
    temporary.replace(path)


def write_json_atomic(path, payload):
    write_text_atomic(path, json.dumps(payload, ensure_ascii=False, indent=2))


def append_ledger_event(event):
    LEDGER_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LEDGER_PATH.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(event, ensure_ascii=False, separators=(",", ":")) + "\n")


def table_rows(connection, table):
    rows = connection.execute(f"select * from {table}").fetchall()
    return [dict(row) for row in rows]


def database_export(connection=None, reason="manual"):
    close_connection = False
    if connection is None:
        connection = db()
        close_connection = True
    try:
        tables = {table: table_rows(connection, table) for table in EXPORT_TABLES}
        return {
            "version": 1,
            "reason": reason,
            "exportedAt": now_iso(),
            "database": str(DB_PATH),
            "tables": tables,
            "counts": {table: len(rows) for table, rows in tables.items()},
        }
    finally:
        if close_connection:
            connection.close()


def snapshot_database(reason="manual"):
    if not DB_PATH.exists():
        return None
    with db() as connection:
        export = database_export(connection, reason)
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    destination = SNAPSHOT_DIR / snapshot_name(reason)
    write_json_atomic(destination, export)
    write_json_atomic(SNAPSHOT_DIR / "latest.json", export)
    prune_snapshots()
    append_ledger_event({
        "event": "snapshot",
        "reason": reason,
        "createdAt": export["exportedAt"],
        "snapshot": destination.name,
        "counts": export["counts"],
    })
    return snapshot_info(destination)


def persist_database(reason="manual"):
    backup = backup_database(reason)
    snapshot = snapshot_database(reason)
    return {"backup": backup, "snapshot": snapshot}


def restore_export(connection, export):
    tables = export.get("tables") if isinstance(export, dict) else None
    if not isinstance(tables, dict):
        raise ValueError("恢复文件缺少 tables 字段")
    for table in RESTORE_TABLES:
        connection.execute(f"delete from {table}")
    for table in EXPORT_TABLES:
        rows = tables.get(table) or []
        if not rows:
            continue
        columns = [row["name"] for row in connection.execute(f"pragma table_info({table})").fetchall()]
        for row in rows:
            if not isinstance(row, dict):
                continue
            available = [column for column in columns if column in row]
            if not available:
                continue
            placeholders = ", ".join(["?"] * len(available))
            column_sql = ", ".join(available)
            connection.execute(
                f"insert into {table} ({column_sql}) values ({placeholders})",
                [row.get(column) for column in available],
            )


def recover_database_from_latest_snapshot():
    latest = SNAPSHOT_DIR / "latest.json"
    if not latest.exists():
        return None
    with db() as connection:
        count = connection.execute("select count(*) from registrations").fetchone()[0]
        if count > 0:
            return None
        try:
            export = json.loads(latest.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            return {"ok": False, "error": str(exc), "snapshot": str(latest)}
        snapshot_count = len((export.get("tables") or {}).get("registrations") or [])
        if snapshot_count <= 0:
            return None
        restore_export(connection, export)
        append_ledger_event({
            "event": "auto-recover",
            "createdAt": now_iso(),
            "snapshot": latest.name,
            "registrations": snapshot_count,
        })
        return {"ok": True, "snapshot": str(latest), "registrations": snapshot_count}


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

            create table if not exists status_events (
              id integer primary key autoincrement,
              registration_id integer not null,
              created_at text not null,
              action text not null default '',
              action_label text not null default '',
              operator text not null default '',
              from_status_json text not null default '{}',
              to_status_json text not null default '{}',
              note text not null default '',
              notification_id integer,
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

            create table if not exists registration_payloads (
              registration_id integer primary key,
              updated_at text not null,
              source text not null default 'website',
              payload_json text not null default '{}',
              foreign key (registration_id) references registrations(id) on delete cascade
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


def admin_github_logins():
    value = os.environ.get("ADMIN_GITHUB_LOGINS", "").strip()
    if not value:
        return set()
    return {
        item.strip().lower().lstrip("@")
        for item in value.replace(";", ",").split(",")
        if item.strip()
    }


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
        "archivedAt": row["archived_at"],
        "archivedReason": row["archived_reason"],
        "archived": bool(row["archived_at"]),
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


def status_snapshot(value):
    if value is None:
        return {
            "proposal": "申报审核中",
            "acceptance": "未提交",
            "reward": "未开始",
            "showcase": "待上墙",
            "notes": "",
        }
    if isinstance(value, sqlite3.Row):
        return {
            "proposal": value["proposal"],
            "acceptance": value["acceptance"],
            "reward": value["reward"],
            "showcase": value["showcase"],
            "notes": value["notes"],
        }
    return {
        "proposal": value.get("proposal") or "申报审核中",
        "acceptance": value.get("acceptance") or "未提交",
        "reward": value.get("reward") or "未开始",
        "showcase": value.get("showcase") or "待上墙",
        "notes": value.get("notes") or "",
    }


def status_event_from_row(row):
    if row is None:
        return None
    return {
        "id": row["id"],
        "registrationId": row["registration_id"],
        "createdAt": row["created_at"],
        "action": row["action"],
        "actionLabel": row["action_label"],
        "operator": row["operator"],
        "fromStatus": json_object(row["from_status_json"]),
        "toStatus": json_object(row["to_status_json"]),
        "note": row["note"],
        "notificationId": row["notification_id"],
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


def payload_from_row(row):
    if row is None:
        return None
    try:
        payload = json.loads(row["payload_json"] or "{}")
    except json.JSONDecodeError:
        payload = {"raw": row["payload_json"] or ""}
    return {
        "updatedAt": row["updated_at"],
        "source": row["source"],
        "payload": payload,
    }


def safe_payload_value(value):
    if isinstance(value, dict):
        result = {}
        for key, item in value.items():
            if key == "data":
                result[key] = f"[已单独保存文件内容，长度 {len(str(item or ''))}]"
            else:
                result[key] = safe_payload_value(item)
        return result
    if isinstance(value, list):
        return [safe_payload_value(item) for item in value]
    return value


def sanitize_submission_payload(payload):
    if not isinstance(payload, dict):
        return {}
    return {key: safe_payload_value(value) for key, value in payload.items()}


def upsert_payload_snapshot(connection, registration_id, payload, source, timestamp):
    connection.execute(
        """
        insert into registration_payloads (
          registration_id, updated_at, source, payload_json
        ) values (?, ?, ?, ?)
        on conflict(registration_id) do update set
          updated_at = excluded.updated_at,
          source = excluded.source,
          payload_json = excluded.payload_json
        """,
        (
            registration_id,
            timestamp,
            source,
            json.dumps(sanitize_submission_payload(payload), ensure_ascii=False),
        ),
    )


def insert_status_event(
    connection,
    registration_id,
    action,
    action_label,
    operator,
    from_status,
    to_status,
    note="",
    notification_id=None,
):
    connection.execute(
        """
        insert into status_events (
          registration_id, created_at, action, action_label, operator,
          from_status_json, to_status_json, note, notification_id
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            registration_id,
            now_iso(),
            action,
            action_label,
            operator,
            json.dumps(status_snapshot(from_status), ensure_ascii=False),
            json.dumps(status_snapshot(to_status), ensure_ascii=False),
            note,
            notification_id,
        ),
    )


def extract_review_text_from_file(row, max_chars=12000):
    filename = row["filename"] or f"{row['kind']}.bin"
    content_type = (row["content_type"] or "").lower()
    try:
        data = base64.b64decode(row["data_base64"])
    except Exception as exc:
        return {
            "kind": row["kind"],
            "filename": filename,
            "contentType": content_type,
            "size": row["size"],
            "text": "",
            "extraction": f"base64 解析失败：{exc}",
        }
    suffix = Path(filename).suffix.lower()
    text = ""
    extraction = "unsupported"
    if suffix == ".pdf" or "pdf" in content_type:
        try:
            from pypdf import PdfReader

            reader = PdfReader(io.BytesIO(data))
            chunks = []
            for page in reader.pages[:8]:
                chunks.append(page.extract_text() or "")
            text = "\n".join(chunks).strip()
            extraction = "pypdf"
        except Exception as exc:
            extraction = f"pdf 解析失败：{exc}"
    elif suffix in {".txt", ".md", ".markdown", ".json", ".csv"} or content_type.startswith("text/"):
        for encoding in ("utf-8", "utf-8-sig", "gb18030"):
            try:
                text = data.decode(encoding).strip()
                extraction = f"text/{encoding}"
                break
            except UnicodeDecodeError:
                continue
        if not text and extraction == "unsupported":
            extraction = "文本解码失败"
    if len(text) > max_chars:
        text = f"{text[:max_chars]}\n\n[已截断，原文件过长]"
    return {
        "kind": row["kind"],
        "filename": filename,
        "contentType": content_type,
        "size": row["size"],
        "text": text,
        "extraction": extraction,
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


def showcase_project_from_row(row):
    repo = row["github_repo"] or ""
    author = row["github_login"] or row["name"] or "MoonBit 参赛者"
    tags = [item for item in [row["project_type"], row["showcase"], row["acceptance"]] if item]
    return {
        "id": row["id"],
        "projectName": row["project_name"] or "未命名项目",
        "projectType": row["project_type"] or "MoonBit 生态项目",
        "summary": row["summary"] or "项目说明待补充。",
        "githubRepo": repo,
        "author": author,
        "school": row["school"] or "",
        "showcaseStatus": row["showcase"] or "已上墙",
        "acceptanceStatus": row["acceptance"] or "",
        "tags": list(dict.fromkeys(tags)),
        "updatedAt": row["status_updated_at"] or row["updated_at"],
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
    if registration.get("name") and registration.get("email") and registration.get("school"):
        score += 8
        reasons.append("参赛者基础信息相对完整。")
    else:
        missing.append("姓名、邮箱、学校等参赛者基础信息")
    if registration.get("projectType"):
        score += 5
        reasons.append("已填写项目方向。")
    else:
        missing.append("项目方向")
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
    if any(file.get("kind") == "student" for file in files):
        score += 5
        reasons.append("已提交学生身份证明。")
    else:
        missing.append("学生身份证明")
    if checks:
        score += min(30, len(passed_checks) * 4)
        reasons.append(f"仓库检查通过 {len(passed_checks)} / {len(checks)} 项。")
        if repo_check.get("commitCount", 0) < 10:
            missing.append("4 月 29 日后 10 个以上有效 commits")
        if not any(item.get("key") == "readme" and item.get("passed") for item in checks):
            missing.append("README")
        if not any(item.get("key") == "moonbit" and item.get("passed") for item in checks):
            missing.append("MoonBit 源码")
        if not any(item.get("key") == "license" and item.get("passed") for item in checks):
            missing.append("OSI 认可许可证")
    else:
        missing.append("仓库检查记录")
    if mode == "acceptance" and not any(item.get("key") == "package" and item.get("passed") for item in checks):
        missing.append("发布到 mooncakes.io 或提供 MoonBit 包配置")
    if mode == "acceptance" and not any(item.get("key") == "ci" and item.get("passed") for item in checks):
        missing.append("CI 检查、构建、测试流程")
    if mode == "acceptance" and not any(item.get("key") == "tests" and item.get("passed") for item in checks):
        missing.append("核心功能测试")
    if mode == "showcase" and "验收通过" not in (status.get("acceptance") or ""):
        missing.append("验收通过状态")
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
    subject = f"MoonBit 国产基础软件生态开源大赛：{registration.get('projectName') or '项目'}审核进度通知"
    body = (
        f"同学你好，你的项目「{registration.get('projectName') or '未命名项目'}」当前审核建议为：{summary}\n\n"
        f"下一步：{next_stage}\n"
        f"需要关注：{'、'.join(dict.fromkeys([item for item in missing if item])) or '暂无'}\n\n"
        "请登录比赛进度页查看最新状态。该建议仅供赛事工作人员复核使用，最终结果以官方邮件通知为准。"
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
        "fileTexts": bundle.get("fileTexts", []),
        "rules": CONTEST_REVIEW_RULES,
    }
    prompt = (
        "你是 MoonBit 国产基础软件生态开源大赛的官方后台材料初审助手。"
        "请严格按 rules 与给定 JSON 做审核建议，不要编造不存在的材料、文件或仓库状态。"
        "mode=proposal 时重点检查参赛资格、项目方向、申报书、仓库链接、4月29日后有效提交、移植来源与许可证说明。"
        "mode=acceptance 时重点检查 MoonBit 主语言、README、示例、测试、CI、开源许可证、mooncakes.io/包配置、核心功能可复现。"
        "mode=showcase 时重点检查工程质量、生态价值、文档体验、展示表现和长期维护潜力。"
        "你不能最终决定比赛结果，只能给 MoonBit 官方管理员提供辅助建议。"
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
        origin = self.headers.get("Origin", "").strip()
        if origin:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Access-Control-Allow-Credentials", "true")
            self.send_header("Vary", "Origin")
        else:
            self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-MGPIC-Admin-Token")
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

    def read_json(self, max_bytes=15 * 1024 * 1024):
        size = int(self.headers.get("Content-Length", "0"))
        if size > max_bytes:
            raise ValueError("请求体过大")
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

    def admin_token(self):
        return os.environ.get("ADMIN_TOKEN", "").strip()

    def request_admin_token(self):
        token = self.headers.get("X-MGPIC-Admin-Token", "").strip()
        if token:
            return token
        query = parse_qs(urlparse(self.path).query)
        return query.get("adminToken", [""])[0].strip()

    def is_admin_request(self):
        expected = self.admin_token()
        provided = self.request_admin_token()
        if expected and provided and secrets.compare_digest(provided, expected):
            return True
        return self.is_admin_github_session()

    def is_admin_github_session(self, row=None):
        allowed = admin_github_logins()
        if not allowed:
            return False
        session_row = row if row is not None else self.current_github_session()
        if session_row is None:
            return False
        login = (session_row["github_login"] or "").strip().lower().lstrip("@")
        return bool(login and login in allowed)

    def require_admin(self):
        if not self.is_admin_request():
            if admin_github_logins():
                self.write_error("需要管理员 GitHub 白名单登录或管理员 Token。", 401)
            else:
                self.write_error("需要管理员 Token。若要使用 GitHub 管理员登录，请在 Render 环境变量中设置 ADMIN_GITHUB_LOGINS。", 401)
            return False
        return True

    def admin_operator_label(self):
        row = self.current_github_session()
        if self.is_admin_github_session(row):
            return f"GitHub @{row['github_login']}"
        if self.admin_token() and self.request_admin_token():
            return "管理员 Token"
        return "管理员"

    def registration_matches_session(self, registration, session_row):
        if registration is None or session_row is None:
            return False
        registration_login = (registration["github_login"] or "").strip().lower()
        registration_email = (registration["email"] or "").strip().lower()
        session_login = (session_row["github_login"] or "").strip().lower()
        session_email = (session_row["email"] or "").strip().lower()
        return bool(
            (registration_login and session_login and registration_login == session_login)
            or (registration_email and session_email and registration_email == session_email)
        )

    def can_access_registration(self, connection, registration_id):
        registration = connection.execute(
            "select * from registrations where id = ?", (registration_id,)
        ).fetchone()
        if registration is None:
            return None, None, False
        if self.is_admin_request():
            return registration, None, True
        session_row = self.current_github_session()
        if session_row is None:
            return registration, None, False
        return registration, session_row, self.registration_matches_session(registration, session_row)

    def handle_api(self, method, path):
        try:
            if path == "/api/health" and method == "GET":
                self.write_json({
                    "ok": True,
                    "database": str(DB_PATH),
                    "githubOAuth": github_oauth_configured(),
                    "adminToken": bool(self.admin_token()),
                    "adminGithub": bool(admin_github_logins()),
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

            if path == "/api/showcase" and method == "GET":
                self.list_showcase_projects()
                return

            if path == "/api/registrations" and method == "GET":
                self.list_registrations()
                return

            if path == "/api/registrations" and method == "POST":
                self.create_registration()
                return

            if path == "/api/admin/storage" and method == "GET":
                self.admin_storage()
                return

            if path == "/api/admin/backup" and method == "POST":
                self.create_admin_backup()
                return

            if path == "/api/admin/export" and method == "GET":
                self.download_admin_export()
                return

            if path == "/api/admin/ledger" and method == "GET":
                self.download_admin_ledger()
                return

            if path == "/api/admin/restore" and method == "POST":
                self.restore_admin_export()
                return

            if path.startswith("/api/admin/backups/") and method == "GET":
                self.download_admin_backup(unquote(path.rsplit("/", 1)[-1]))
                return

            if path.startswith("/api/admin/snapshots/") and method == "GET":
                self.download_admin_snapshot(unquote(path.rsplit("/", 1)[-1]))
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
                if len(parts) == 4 and parts[3] == "transition" and method == "POST":
                    self.transition_registration(registration_id)
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

    def admin_storage(self):
        if not self.require_admin():
            return
        with db() as connection:
            counts = {
                "registrations": connection.execute("select count(*) from registrations").fetchone()[0],
                "archived": connection.execute("select count(*) from registrations where archived_at != ''").fetchone()[0],
                "files": connection.execute("select count(*) from registration_files").fetchone()[0],
                "repoChecks": connection.execute("select count(*) from repo_checks").fetchone()[0],
                "aiReviews": connection.execute("select count(*) from ai_reviews").fetchone()[0],
                "notifications": connection.execute("select count(*) from notifications").fetchone()[0],
                "imports": connection.execute("select count(*) from imported_records").fetchone()[0],
                "payloads": connection.execute("select count(*) from registration_payloads").fetchone()[0],
                "statusEvents": connection.execute("select count(*) from status_events").fetchone()[0],
                "githubSessions": connection.execute("select count(*) from github_sessions").fetchone()[0],
            }
        backups = list_backups()
        snapshots = list_snapshots()
        latest_snapshot_path = SNAPSHOT_DIR / "latest.json"
        ledger_size = LEDGER_PATH.stat().st_size if LEDGER_PATH.exists() else 0
        self.write_json({
            "database": str(DB_PATH),
            "databaseSize": DB_PATH.stat().st_size if DB_PATH.exists() else 0,
            "backupDir": str(BACKUP_DIR),
            "snapshotDir": str(SNAPSHOT_DIR),
            "ledgerPath": str(LEDGER_PATH),
            "maxBackups": MAX_BACKUPS,
            "maxSnapshots": MAX_SNAPSHOTS,
            "counts": counts,
            "backups": backups,
            "snapshots": snapshots,
            "latestSnapshot": str(latest_snapshot_path) if latest_snapshot_path.exists() else "",
            "ledgerSize": ledger_size,
            "storageLocations": [
                {
                    "name": "主 SQLite 数据库",
                    "kind": "server-file",
                    "location": str(DB_PATH),
                    "content": "报名信息、流程状态、仓库检查、AI 审核、通知记录、OAuth 会话和上传材料索引。",
                    "countLabel": f"{counts['registrations']} 条报名 / {counts['files']} 份材料",
                    "safety": "必须依赖 Render Persistent Disk 或外部数据库；Free 实例重新部署会清空。",
                },
                {
                    "name": "报名原始载荷表",
                    "kind": "sqlite-table",
                    "location": "registration_payloads",
                    "content": "每次官网报名提交的原始 JSON 快照，用于后台核查和数据恢复。",
                    "countLabel": f"{counts['payloads']} 条",
                    "safety": "存放在主 SQLite 数据库内，跟随数据库一起备份。",
                },
                {
                    "name": "上传材料表",
                    "kind": "sqlite-table",
                    "location": "registration_files",
                    "content": "项目申报书、学生身份证明、身份证正反面等上传文件，按 Base64 存入数据库。",
                    "countLabel": f"{counts['files']} 份",
                    "safety": "含敏感材料，只能在管理员后台下载；必须保护数据库和导出文件。",
                },
                {
                    "name": "流程流转记录",
                    "kind": "sqlite-table",
                    "location": "registration_statuses / status_events",
                    "content": "申报审核、开发跟进、验收、奖励、作品墙等状态和管理员操作历史。",
                    "countLabel": f"{counts['statusEvents']} 条事件",
                    "safety": "存放在主 SQLite 数据库内，用于追溯审核过程。",
                },
                {
                    "name": "GitHub OAuth 会话",
                    "kind": "sqlite-table",
                    "location": "github_sessions / github_oauth_states",
                    "content": "GitHub 登录会话、公开账号信息和 OAuth access token。",
                    "countLabel": f"{counts['githubSessions']} 个会话",
                    "safety": "含授权令牌，不能公开导出或泄露数据库。",
                },
                {
                    "name": "SQLite 自动备份",
                    "kind": "server-directory",
                    "location": str(BACKUP_DIR),
                    "content": "每次报名、导入、审核、状态修改、归档后生成的 SQLite 备份文件。",
                    "countLabel": f"{len(backups)} 份",
                    "safety": "只有在备份目录位于持久盘时才可靠。",
                },
                {
                    "name": "完整 JSON 快照",
                    "kind": "server-directory",
                    "location": str(SNAPSHOT_DIR),
                    "content": "完整导出的 JSON 快照和 latest.json，可用于跨环境恢复数据。",
                    "countLabel": f"{len(snapshots)} 份",
                    "safety": "只有在快照目录位于持久盘时才可靠；建议定期手动导出离线保存。",
                },
                {
                    "name": "审计日志",
                    "kind": "server-file",
                    "location": str(LEDGER_PATH),
                    "content": "追加写入的报名、恢复、导入、状态修改等关键事件日志。",
                    "countLabel": f"{ledger_size} B",
                    "safety": "只有在日志路径位于持久盘时才可靠。",
                },
                {
                    "name": "飞书渠道报名表",
                    "kind": "external",
                    "location": "https://bxup9uklfcb.feishu.cn/wiki/UtVVwrmahiBQlokfhQrc0hh4np1",
                    "content": "飞书渠道提交或导入的报名数据，和 Render 后台数据库是两套存储。",
                    "countLabel": f"{counts['imports']} 条已导入记录",
                    "safety": "外部数据源，需要后续通过飞书 API 或 CSV/JSON 导入同步。",
                },
                {
                    "name": "浏览器本地缓存",
                    "kind": "browser-local",
                    "location": "localStorage: mgpic2026.*",
                    "content": "管理员或选手浏览器中的临时缓存，例如报名草稿、进度页缓存、管理员 Token。",
                    "countLabel": "仅当前浏览器可见",
                    "safety": "不是正式数据库，只能作为临时恢复线索。",
                },
            ],
            "persistence": {
                "kind": "sqlite-filesystem",
                "requiresPersistentDisk": True,
                "renderFreeDiskUnsupported": True,
                "message": (
                    "当前后台使用 SQLite 文件存储。Render Free 实例不支持 Persistent Disk；"
                    "如果没有升级实例并在 Render Disk 页面启用持久盘，重新部署会导致数据库、备份和快照一起清空。"
                    "正式运营必须使用 Render 持久盘或外部数据库。"
                ),
            },
        })

    def create_admin_backup(self):
        if not self.require_admin():
            return
        persisted = persist_database("manual")
        if persisted["backup"] is None:
            self.write_error("数据库文件还不存在，暂时无法生成备份。", 404)
            return
        self.write_json({
            "ok": True,
            "backup": persisted["backup"],
            "snapshot": persisted["snapshot"],
            "backups": list_backups(),
            "snapshots": list_snapshots(),
        })

    def download_admin_export(self):
        if not self.require_admin():
            return
        with db() as connection:
            payload = database_export(connection, "admin-export")
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        filename = f"mgpic2026-export-{datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')}.json"
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
        self.end_headers()
        self.wfile.write(body)

    def download_admin_ledger(self):
        if not self.require_admin():
            return
        if not LEDGER_PATH.exists():
            self.write_error("审计日志还不存在。", 404)
            return
        body = LEDGER_PATH.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", "application/x-ndjson; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Disposition", 'attachment; filename="mgpic2026-ledger.jsonl"')
        self.end_headers()
        self.wfile.write(body)

    def restore_admin_export(self):
        if not self.require_admin():
            return
        payload = self.read_json(max_bytes=30 * 1024 * 1024)
        if not isinstance(payload, dict):
            self.write_error("恢复数据必须是 JSON 对象", 400)
            return
        with db() as connection:
            before = connection.execute("select count(*) from registrations").fetchone()[0]
            restore_export(connection, payload)
            after = connection.execute("select count(*) from registrations").fetchone()[0]
        persisted = persist_database("restore")
        self.write_json({
            "ok": True,
            "before": before,
            "after": after,
            "backup": persisted["backup"],
            "snapshot": persisted["snapshot"],
        })

    def download_admin_backup(self, filename):
        if not self.require_admin():
            return
        safe_name = Path(filename).name
        if safe_name != filename or not safe_name.startswith("mgpic2026-") or not safe_name.endswith(".sqlite3"):
            self.write_error("备份文件名不合法", 400)
            return
        path = BACKUP_DIR / safe_name
        if not path.exists():
            self.write_error("备份文件不存在", 404)
            return
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", "application/vnd.sqlite3")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Content-Disposition", f"attachment; filename*=UTF-8''{quote(safe_name)}")
        self.end_headers()
        self.wfile.write(data)

    def download_admin_snapshot(self, filename):
        if not self.require_admin():
            return
        safe_name = Path(filename).name
        if safe_name != filename or not safe_name.startswith("mgpic2026-") or not safe_name.endswith(".json"):
            self.write_error("快照文件名不合法", 400)
            return
        path = SNAPSHOT_DIR / safe_name
        if not path.exists():
            self.write_error("快照文件不存在", 404)
            return
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Content-Disposition", f"attachment; filename*=UTF-8''{quote(safe_name)}")
        self.end_headers()
        self.wfile.write(data)

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
        user = self.github_session_user(row)
        if user is not None:
            user["admin"] = self.is_admin_github_session(row)
        self.write_json(
            {
                "configured": github_oauth_configured(),
                "authenticated": row is not None,
                "user": user,
                "adminConfigured": bool(admin_github_logins()),
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
        if not self.require_admin():
            return
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
                  s.updated_at as status_updated_at,
                  c.repo_url as check_repo_url,
                  c.commit_count as check_commit_count,
                  c.checks_json as check_checks_json,
                  c.checked_at as check_checked_at
                from registrations r
                left join registration_statuses s on s.registration_id = r.id
                left join (
                  select rc.*
                  from repo_checks rc
                  join (
                    select registration_id, max(id) as id
                    from repo_checks
                    group by registration_id
                  ) latest on latest.id = rc.id
                ) c on c.registration_id = r.id
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
            if row["check_checked_at"]:
                try:
                    checks = json.loads(row["check_checks_json"] or "[]")
                except json.JSONDecodeError:
                    checks = []
                item["repoCheck"] = {
                    "repoUrl": row["check_repo_url"] or "",
                    "commitCount": row["check_commit_count"] or 0,
                    "checks": checks,
                    "checkedAt": row["check_checked_at"],
                }
            registrations.append(item)
        self.write_json({"registrations": registrations})

    def list_showcase_projects(self):
        with db() as connection:
            rows = connection.execute(
                """
                select
                  r.id,
                  r.updated_at,
                  r.name,
                  r.school,
                  r.github_login,
                  r.github_repo,
                  r.project_name,
                  r.project_type,
                  r.summary,
                  s.acceptance,
                  s.showcase,
                  s.updated_at as status_updated_at
                from registrations r
                join registration_statuses s on s.registration_id = r.id
                where (
                  s.showcase like '%已上墙%'
                  or s.showcase like '%公开展示%'
                  or s.showcase like '%展示中%'
                )
                and s.showcase not like '%暂不展示%'
                order by s.updated_at desc, r.id desc
                limit 100
                """
            ).fetchall()
        self.write_json({
            "projects": [showcase_project_from_row(row) for row in rows],
            "updatedAt": now_iso(),
        })

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
        payload = connection.execute(
            "select * from registration_payloads where registration_id = ?",
            (registration_id,),
        ).fetchone()
        ai_reviews = connection.execute(
            "select * from ai_reviews where registration_id = ? order by id desc limit 10",
            (registration_id,),
        ).fetchall()
        notifications = connection.execute(
            "select * from notifications where registration_id = ? order by id desc limit 10",
            (registration_id,),
        ).fetchall()
        status_events = connection.execute(
            "select * from status_events where registration_id = ? order by id desc limit 30",
            (registration_id,),
        ).fetchall()
        return {
            "registration": registration_from_row(registration, include_sensitive=include_sensitive),
            "status": status_from_row(status),
            "repoCheck": repo_check_from_row(repo_check),
            "files": [file_from_row(row) for row in files],
            "rawPayload": payload_from_row(payload) if include_sensitive else None,
            "aiReviews": [ai_review_from_row(row) for row in ai_reviews],
            "notifications": [notification_from_row(row) for row in notifications],
            "statusEvents": [status_event_from_row(row) for row in status_events] if include_sensitive else [],
        }

    def review_file_texts(self, connection, registration_id):
        rows = connection.execute(
            """
            select * from registration_files
            where registration_id = ? and kind in ('proposal')
            order by kind
            """,
            (registration_id,),
        ).fetchall()
        return [extract_review_text_from_file(row) for row in rows]

    def get_registration(self, registration_id):
        with db() as connection:
            registration, session_row, allowed = self.can_access_registration(connection, registration_id)
            if registration is None:
                self.write_error("报名记录不存在", 404)
                return
            if not allowed:
                if session_row is None:
                    self.write_error("请先使用 GitHub 登录后查看自己的比赛进度。", 401)
                else:
                    self.write_error("当前 GitHub 账号无权查看这条报名记录。", 403)
                return
            bundle = self.get_registration_bundle(
                connection,
                registration_id,
                include_sensitive=self.is_admin_request(),
            )
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
            upsert_payload_snapshot(connection, registration_id, payload, "website", timestamp)
            bundle = self.get_registration_bundle(connection, registration_id)
        persist_database("create")
        self.write_json(bundle, 201)

    def update_registration(self, registration_id):
        payload = self.read_json()
        timestamp = now_iso()
        values = self.registration_values(payload)
        with db() as connection:
            registration, session_row, allowed = self.can_access_registration(connection, registration_id)
            if registration is None:
                self.write_error("报名记录不存在", 404)
                return
            if not allowed:
                if session_row is None:
                    self.write_error("请先使用 GitHub 登录后修改自己的报名记录。", 401)
                else:
                    self.write_error("当前 GitHub 账号无权修改这条报名记录。", 403)
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
            upsert_payload_snapshot(connection, registration_id, payload, registration["source"] or "website", timestamp)
            bundle = self.get_registration_bundle(connection, registration_id)
        persist_database("update")
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
        if not self.require_admin():
            return
        payload = self.read_json()
        timestamp = now_iso()
        operator = self.admin_operator_label()
        with db() as connection:
            exists = connection.execute(
                "select id from registrations where id = ?", (registration_id,)
            ).fetchone()
            if exists is None:
                self.write_error("报名记录不存在", 404)
                return
            previous = connection.execute(
                "select * from registration_statuses where registration_id = ?",
                (registration_id,),
            ).fetchone()
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
            insert_status_event(
                connection,
                registration_id,
                "manual_status",
                "手动保存状态",
                operator,
                previous,
                status,
                clean_text(payload, "notes"),
            )
        persist_database("status")
        self.write_json({"status": status_from_row(status)})

    def save_repo_check(self, registration_id):
        payload = self.read_json()
        checks = payload.get("checks", [])
        if not isinstance(checks, list):
            checks = []
        with db() as connection:
            registration, session_row, allowed = self.can_access_registration(connection, registration_id)
            if registration is None:
                self.write_error("报名记录不存在", 404)
                return
            if not allowed:
                if session_row is None:
                    self.write_error("请先使用 GitHub 登录后同步仓库检查结果。", 401)
                else:
                    self.write_error("当前 GitHub 账号无权同步这条报名记录。", 403)
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
        persist_database("repo-check")
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
        if not self.require_admin():
            return
        payload = self.read_json()
        mode = clean_text(payload, "mode") or "proposal"
        with db() as connection:
            bundle = self.get_registration_bundle(connection, registration_id)
            if bundle is None:
                self.write_error("报名记录不存在", 404)
                return
            bundle["fileTexts"] = self.review_file_texts(connection, registration_id)
            review = openai_review(bundle, mode)
            review_id = self.insert_ai_review(connection, registration_id, mode, review)
            row = connection.execute("select * from ai_reviews where id = ?", (review_id,)).fetchone()
        persist_database("ai-review")
        self.write_json({"review": ai_review_from_row(row)})

    def list_ai_reviews(self, registration_id):
        if not self.require_admin():
            return
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

    def transition_definition(self, action, registration):
        project = registration.get("projectName") or "未命名项目"
        definitions = {
            "proposal_pass": {
                "label": "申报通过，进入项目开发",
                "updates": {"proposal": "申报通过", "reward": "启动支持待发放"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」申报通过",
                "body": (
                    f"同学你好，你的项目「{project}」已通过项目申报审核，进入项目开发阶段。\n\n"
                    "请继续完善公开仓库、README、示例、测试、CI 和许可证信息。启动支持将按赛事安排处理。"
                ),
            },
            "proposal_revise": {
                "label": "申报需调整",
                "updates": {"proposal": "申报需调整"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」申报材料需调整",
                "body": (
                    f"同学你好，你的项目「{project}」申报材料需要补充或调整。\n\n"
                    "请查看赛事通知中的修改意见，补齐后可重新提交或联系赛事工作人员。"
                ),
            },
            "proposal_reject": {
                "label": "申报不通过",
                "updates": {"proposal": "申报不通过"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」申报未通过",
                "body": (
                    f"同学你好，你的项目「{project}」本次申报暂未通过。\n\n"
                    "如需继续参与，请根据反馈调整项目方向、材料或仓库内容后再提交。"
                ),
            },
            "acceptance_review": {
                "label": "进入项目验收审核",
                "updates": {"proposal": "申报通过", "acceptance": "验收审核中"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」进入验收审核",
                "body": (
                    f"同学你好，你的项目「{project}」已进入项目验收审核阶段。\n\n"
                    "赛事组会检查 README、示例、测试、CI、许可证、mooncakes.io 发布或包配置等验收要求。"
                ),
            },
            "acceptance_pass": {
                "label": "验收通过，进入优秀项目评选",
                "updates": {
                    "proposal": "申报通过",
                    "acceptance": "验收通过",
                    "reward": "完成支持待发放",
                    "showcase": "候选项目",
                },
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」验收通过",
                "body": (
                    f"同学你好，你的项目「{project}」已通过项目验收，可进入优秀项目评选与展示候选。\n\n"
                    "完成支持将按赛事安排处理，后续如入选展示或答辩，赛事组会继续通知。"
                ),
            },
            "acceptance_revise": {
                "label": "验收需调整",
                "updates": {"acceptance": "验收需调整"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」验收需调整",
                "body": (
                    f"同学你好，你的项目「{project}」验收材料或仓库内容仍需调整。\n\n"
                    "请重点补齐 README、示例、测试、CI、许可证、包配置或核心功能可复现问题。"
                ),
            },
            "acceptance_reject": {
                "label": "验收不通过",
                "updates": {"acceptance": "验收不通过"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」验收未通过",
                "body": (
                    f"同学你好，你的项目「{project}」本次验收暂未通过。\n\n"
                    "如仍在赛事周期内，可根据反馈继续完善后重新提交验收。"
                ),
            },
            "reward_start_paid": {
                "label": "启动支持已发放",
                "updates": {"reward": "启动支持已发放"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」启动支持已处理",
                "body": f"同学你好，你的项目「{project}」启动支持状态已更新为已发放。",
            },
            "reward_finish_paid": {
                "label": "完成支持已发放",
                "updates": {"reward": "完成支持已发放"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」完成支持已处理",
                "body": f"同学你好，你的项目「{project}」完成支持状态已更新为已发放。",
            },
            "showcase_candidate": {
                "label": "设为作品墙候选",
                "updates": {"showcase": "候选项目"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」进入作品墙候选",
                "body": f"同学你好，你的项目「{project}」已进入作品墙候选池，赛事组会继续评估展示信息。",
            },
            "showcase_publish": {
                "label": "上架作品墙展示",
                "updates": {
                    "proposal": "申报通过",
                    "acceptance": "验收通过",
                    "showcase": "已上墙",
                },
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」已入选作品墙",
                "body": (
                    f"同学你好，你的项目「{project}」已入选赛事作品墙展示。\n\n"
                    "后续可能获得官网展示、社区传播、作者访谈或技术文章发布机会。"
                ),
            },
            "showcase_hide": {
                "label": "暂不展示",
                "updates": {"showcase": "暂不展示"},
                "subject": f"MoonBit 国产基础软件生态开源大赛：项目「{project}」展示状态更新",
                "body": f"同学你好，你的项目「{project}」当前暂不进入作品墙公开展示。",
            },
        }
        return definitions.get(action)

    def payload_wants_notification(self, payload):
        value = payload.get("notify", True)
        if isinstance(value, str):
            return value.strip().lower() not in ("0", "false", "no", "off", "不发送")
        return value is not False

    def transition_registration(self, registration_id):
        if not self.require_admin():
            return
        payload = self.read_json()
        action = clean_text(payload, "action")
        timestamp = now_iso()
        operator = self.admin_operator_label()
        with db() as connection:
            bundle = self.get_registration_bundle(connection, registration_id)
            if bundle is None:
                self.write_error("报名记录不存在", 404)
                return
            registration = bundle["registration"]
            definition = self.transition_definition(action, registration)
            if definition is None:
                self.write_error("未知流程流转操作", 400)
                return
            previous = status_snapshot(bundle.get("status"))
            next_status = {**previous, **definition["updates"]}
            note = clean_text(payload, "note")
            if note:
                next_status["notes"] = note
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
            notification_id = None
            if self.payload_wants_notification(payload) and registration.get("email"):
                subject = clean_text(payload, "subject") or definition["subject"]
                body = clean_text(payload, "body") or definition["body"]
                if note:
                    body = f"{body}\n\n管理员备注：{note}"
                notification_id = self.insert_notification(
                    connection,
                    registration_id,
                    registration["email"],
                    subject,
                    body,
                )
            insert_status_event(
                connection,
                registration_id,
                action,
                definition["label"],
                operator,
                previous,
                next_status,
                note,
                notification_id,
            )
            updated = self.get_registration_bundle(
                connection,
                registration_id,
                include_sensitive=True,
            )
            notification = connection.execute(
                "select * from notifications where id = ?", (notification_id,)
            ).fetchone() if notification_id else None
        persist_database("transition")
        self.write_json({
            **updated,
            "notification": notification_from_row(notification),
        })

    def advance_registration(self, registration_id):
        if not self.require_admin():
            return
        payload = self.read_json()
        mode = clean_text(payload, "mode") or "proposal"
        operator = self.admin_operator_label()
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
            subject = clean_text(payload, "subject") or (review or {}).get("emailSubject") or f"MoonBit 国产基础软件生态开源大赛：{registration.get('projectName') or '项目'}进入下一流程"
            body = clean_text(payload, "body") or (review or {}).get("emailBody") or (
                f"同学你好，你的项目「{registration.get('projectName') or '未命名项目'}」已进入下一流程。\n\n"
                "请登录比赛进度页查看最新状态，并按要求继续完善项目。"
            )
            notification_id = None
            if registration.get("email"):
                notification_id = self.insert_notification(connection, registration_id, registration["email"], subject, body)
            insert_status_event(
                connection,
                registration_id,
                f"advance_{mode}",
                "进入下一流程",
                operator,
                current,
                next_status,
                clean_text(payload, "notes"),
                notification_id,
            )
            updated = self.get_registration_bundle(connection, registration_id)
            notification = connection.execute(
                "select * from notifications where id = ?", (notification_id,)
            ).fetchone() if notification_id else None
        persist_database("advance")
        self.write_json({
            **updated,
            "notification": notification_from_row(notification),
        })

    def notify_registration(self, registration_id):
        if not self.require_admin():
            return
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
            subject = clean_text(payload, "subject") or f"MoonBit 国产基础软件生态开源大赛：{registration.get('projectName') or '项目'}进度通知"
            body = clean_text(payload, "body") or "你的比赛进度已更新，请登录比赛进度页查看。"
            notification_id = self.insert_notification(connection, registration_id, recipient, subject, body)
            notification = connection.execute(
                "select * from notifications where id = ?", (notification_id,)
            ).fetchone()
        persist_database("notify")
        self.write_json({"notification": notification_from_row(notification)})

    def list_files(self, registration_id):
        if not self.require_admin():
            return
        with db() as connection:
            rows = connection.execute(
                "select * from registration_files where registration_id = ? order by kind",
                (registration_id,),
            ).fetchall()
        self.write_json({"files": [file_from_row(row) for row in rows]})

    def download_file(self, registration_id, kind):
        if not self.require_admin():
            return
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
        if not self.require_admin():
            return
        persist_database("before-archive")
        timestamp = now_iso()
        with db() as connection:
            cursor = connection.execute(
                """
                update registrations
                set archived_at = ?, archived_reason = '管理员归档', updated_at = ?
                where id = ? and archived_at = ''
                """,
                (timestamp, timestamp, registration_id),
            )
            if cursor.rowcount == 0:
                exists = connection.execute(
                    "select id from registrations where id = ?", (registration_id,)
                ).fetchone()
                if exists is None:
                    self.write_error("报名记录不存在", 404)
                    return
        persist_database("archive")
        self.write_json({"ok": True, "archived": True})

    def save_imported_records(self):
        if not self.require_admin():
            return
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
        persist_database("import")
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
            upsert_payload_snapshot(
                connection,
                registration_id,
                {"source": "feishu", "mapped": data, "raw": row},
                "feishu",
                timestamp,
            )
            count += 1
        return count


def main():
    init_db()
    recovery = recover_database_from_latest_snapshot()
    if recovery:
        print(f"Snapshot recovery: {recovery}")
    port = int(os.environ.get("PORT", "4174"))
    host = os.environ.get("HOST", "127.0.0.1")
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"MGPIC 2026 server: http://{host}:{port}")
    print(f"SQLite database: {DB_PATH}")
    server.serve_forever()


if __name__ == "__main__":
    main()
