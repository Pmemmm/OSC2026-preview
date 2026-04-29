#!/usr/bin/env python3
import json
import os
import base64
import sqlite3
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import quote, unquote, urlparse

ROOT = Path(__file__).resolve().parent
DB_PATH = Path(os.environ.get("MGPIC_DB", ROOT / "data" / "mgpic2026.sqlite3"))


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
        files = connection.execute(
            "select * from registration_files where registration_id = ? order by kind",
            (registration_id,),
        ).fetchall()
        return {
            "registration": registration_from_row(registration),
            "status": status_from_row(status),
            "repoCheck": repo_check_from_row(repo_check),
            "files": [file_from_row(row) for row in files],
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
                  proposal_file_name = ?, student_file_name = ?
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
        )

    def upsert_files(self, connection, registration_id, payload, timestamp):
        for kind, key, filename_key in (
            ("proposal", "proposalFile", "proposalFileName"),
            ("student", "studentFile", "studentFileName"),
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
        self.write_json({"ok": True, "count": len(rows)})


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
