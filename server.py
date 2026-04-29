#!/usr/bin/env python3
import json
import os
import sqlite3
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("MGPIC_DB", ROOT / "data" / "mgpic2026.sqlite3"))


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def db():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
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
            """
        )


def registration_from_row(row):
    if row is None:
        return None
    return {
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
        "source": row["source"],
        "backendMode": "sqlite",
    }


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


def clean_text(payload, key):
    value = payload.get(key, "")
    if value is None:
        return ""
    return str(value).strip()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS")
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

    def handle_api(self, method, path):
        try:
            if path == "/api/health" and method == "GET":
                self.write_json({"ok": True, "database": str(DB_PATH)})
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

    def list_registrations(self):
        with db() as connection:
            rows = connection.execute(
                "select * from registrations order by id desc limit 200"
            ).fetchall()
        self.write_json({"registrations": [registration_from_row(row) for row in rows]})

    def get_registration_bundle(self, connection, registration_id):
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
        return {
            "registration": registration_from_row(registration),
            "status": status_from_row(status),
            "repoCheck": repo_check_from_row(repo_check),
        }

    def get_registration(self, registration_id):
        with db() as connection:
            bundle = self.get_registration_bundle(connection, registration_id)
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
                  proposal_file_name, student_file_name, source
                ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                  proposal_file_name = ?, student_file_name = ?
                where id = ?
                """,
                (timestamp, *values, registration_id),
            )
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
        self.write_json({"ok": True, "count": len(rows)})


def main():
    init_db()
    port = int(os.environ.get("PORT", "4174"))
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    print(f"MGPIC 2026 server: http://127.0.0.1:{port}")
    print(f"SQLite database: {DB_PATH}")
    server.serve_forever()


if __name__ == "__main__":
    main()
