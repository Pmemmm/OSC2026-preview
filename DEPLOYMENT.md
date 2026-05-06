# MoonBit 国产基础软件生态开源大赛后端部署

GitHub Pages 只能托管静态页面，不能运行 `server.py`。报名数据库、GitHub OAuth、后台管理、AI 审核和邮件通知需要部署这个 Python 后端。

正式后台域名先按 Render 服务名固定为：

`https://mgpic2026.onrender.com`

GitHub Pages 页面会在静态域名下自动把 `/api/*` 请求转到这个 Render 域名；但正式运营时仍建议直接使用 Render 域名访问报名、进度和后台页面。

## Render 部署

1. 在 Render 新建 Blueprint，选择本仓库 `moonbitlang/OSC2026`。
2. Render 会读取 `render.yaml` 并创建 `mgpic2026` Web Service。
3. 如果 Render 生成的域名不是 `https://mgpic2026.onrender.com`，把环境变量 `GITHUB_OAUTH_REDIRECT_URI` 改成实际域名：
   `https://你的域名/api/auth/github/callback`
4. 在 GitHub Developer settings 创建 OAuth App。
5. OAuth App 配置：
   Homepage URL: `https://你的后端域名`
   Authorization callback URL: `https://你的后端域名/api/auth/github/callback`
6. 把 OAuth App 的 `Client ID` 和 `Client Secret` 填入 Render 环境变量：
   `GITHUB_CLIENT_ID`
   `GITHUB_CLIENT_SECRET`
7. 设置后台管理员权限：
   `ADMIN_TOKEN`
   这是后台列表、详情、材料下载、审核推进和邮件通知接口的备用访问凭证，只应发给赛事工作人员。
   `ADMIN_GITHUB_LOGINS`
   填写允许访问后台的 GitHub 用户名，多个账号用英文逗号分隔，例如 `zongen01,moonbit-admin`。配置后，管理员可在后台页面使用 GitHub OAuth 登录，不需要手动输入 Token。
8. 可选环境变量：
   `OPENAI_API_KEY` 用于 ChatGPT 审核建议。
   `SMTP_HOST`、`SMTP_FROM`、`SMTP_USER`、`SMTP_PASSWORD` 用于发送邮件通知。
9. 飞书多维表格双向同步需要额外配置：
   `FEISHU_APP_ID`
   `FEISHU_APP_SECRET`
   `FEISHU_APP_TOKEN`
   `FEISHU_TABLE_ID`
   `FEISHU_VIEW_ID`
   其中 `FEISHU_TABLE_ID` 当前为 `tblpdjqjCZdRNJah`，`FEISHU_VIEW_ID` 当前为 `vewygPXWz5`。`FEISHU_APP_TOKEN` 是多维表格的 app token，不是 table id；系统会自动匹配“邮箱 / 联系邮箱”“GitHub 仓库 / 项目 GitHub 链接”等常见字段名，如果字段名仍不一致，可用 `FEISHU_FIELD_MAP` 配置 JSON，例如 `{"email":"联系邮箱","githubRepo":"项目 GitHub 链接"}`。
   `FEISHU_AUTO_SYNC_ENABLED=1` 会开启飞书报名自动导入后台；`FEISHU_AUTO_SYNC_INTERVAL_SECONDS=21600` 表示每 6 小时导入一次，也就是每天 4 次；`FEISHU_AUTO_SYNC_RUN_ON_START=1` 表示服务启动后先导入一次。

## 重要说明

- 后端服务会同时托管前端页面和 `/api/*` 接口。正式使用时请访问后端域名，而不是 GitHub Pages 静态域名。
- GitHub Pages 首页、报名页、比赛进度页和后台页已经默认把数据接口指向 `https://mgpic2026.onrender.com`。如果 Render 服务名变了，需要同步修改前端里的 `DEFAULT_RENDER_API_BASE`。
- SQLite 数据库路径为 `/var/lib/mgpic/mgpic2026.sqlite3`。注意：Render Free 实例不支持 Persistent Disk；如果服务仍在 Free 实例上，重新部署会清空 SQLite、备份和快照。正式收集报名数据前必须升级到支持 Persistent Disk 的实例，或改接外部数据库。
- Render 的 Disk 页面应显示已启用持久盘，而不是 “Disks are not supported for free instance types”。如果仍看到这个提示，说明当前线上数据不是安全持久化状态。
- 数据库备份目录为 `/var/lib/mgpic/backups`。系统会在报名、导入、审核、状态修改、归档等写入动作后自动生成 SQLite 备份，默认保留最近 30 份。
- 完整 JSON 快照目录为 `/var/lib/mgpic/snapshots`，审计日志为 `/var/lib/mgpic/ledger/events.jsonl`。每次写入都会同步生成 `latest.json`，服务启动时如果发现数据库为空，会尝试用 `latest.json` 自动恢复。
- 后台的“数据安全”区域可以手动生成备份、导出完整 JSON、下载审计日志。涉及身份证、银行卡和材料文件，导出文件只能交给赛事管理员保存。
- 报名表会收集身份证、银行卡和证明材料，部署平台必须限制管理员访问，不要把数据库文件公开。
- 后台管理员推荐使用 `ADMIN_GITHUB_LOGINS` 白名单登录；`ADMIN_TOKEN` 保留给临时排障或没有 GitHub 权限的内部工作人员。
- 后台提供两个飞书同步动作：“飞书同步到后台”会把飞书报名记录写入 Render SQLite；“官网报名写入飞书”会按邮箱或 GitHub 仓库匹配记录，把官网报名数据回写到飞书表。自动同步默认只做“飞书报名读取到后台”，不会自动改动飞书表。
- 如果继续使用 GitHub Pages 作为公开入口，需要再把页面里的 API base 指向后端域名；最简单稳定的方式是直接对外使用后端域名。

## 排查

- 访问 `https://mgpic2026.onrender.com/api/health` 应返回 `{"ok": true, ...}`。
- 如果 Render 返回 `404` 且响应头包含 `x-render-routing: no-server`，说明 Render 上还没有创建名为 `mgpic2026` 的 Web Service，或服务域名不是这个地址。
- 如果服务名不是 `mgpic2026`，需要把前端脚本里的 `DEFAULT_RENDER_API_BASE` 改成实际 Render 域名，并把 `GITHUB_OAUTH_REDIRECT_URI` 改成 `https://实际域名/api/auth/github/callback`。
