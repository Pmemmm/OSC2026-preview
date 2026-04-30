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

## 重要说明

- 后端服务会同时托管前端页面和 `/api/*` 接口。正式使用时请访问后端域名，而不是 GitHub Pages 静态域名。
- GitHub Pages 首页、报名页、比赛进度页和后台页已经默认把数据接口指向 `https://mgpic2026.onrender.com`。如果 Render 服务名变了，需要同步修改前端里的 `DEFAULT_RENDER_API_BASE`。
- SQLite 数据库路径为 `/var/lib/mgpic/mgpic2026.sqlite3`，Render 会通过 Persistent Disk 持久化。
- 报名表会收集身份证、银行卡和证明材料，部署平台必须限制管理员访问，不要把数据库文件公开。
- 后台管理员推荐使用 `ADMIN_GITHUB_LOGINS` 白名单登录；`ADMIN_TOKEN` 保留给临时排障或没有 GitHub 权限的内部工作人员。
- 如果继续使用 GitHub Pages 作为公开入口，需要再把页面里的 API base 指向后端域名；最简单稳定的方式是直接对外使用后端域名。

## 排查

- 访问 `https://mgpic2026.onrender.com/api/health` 应返回 `{"ok": true, ...}`。
- 如果 Render 返回 `404` 且响应头包含 `x-render-routing: no-server`，说明 Render 上还没有创建名为 `mgpic2026` 的 Web Service，或服务域名不是这个地址。
- 如果服务名不是 `mgpic2026`，需要把前端脚本里的 `DEFAULT_RENDER_API_BASE` 改成实际 Render 域名，并把 `GITHUB_OAUTH_REDIRECT_URI` 改成 `https://实际域名/api/auth/github/callback`。
