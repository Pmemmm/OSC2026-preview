# MGPIC 2026

MoonBit MGPIC 2026 官方网站仓库。

现在这套站点已经整理成了：

- `main/`：MoonBit + Rabbita 页面源码
- `index.html` / `preview.html`：很薄的静态入口壳
- `styles.css`：站点源样式
- `site-assets/`：给 GitHub Pages 用的同步产物
- `scripts/build-site.sh`：本地构建并同步产物的脚本

## 本地开发

先确认本机已经安装 `moon`。

### 1. 类型检查

```bash
moon check --target js
```

### 2. 构建 Rabbita 页面

```bash
./scripts/build-site.sh
```

这个脚本会：

- 执行 `moon build --target js --release`
- 从 `_build/js/release/build/.../main/main.js` 找到编译产物
- 同步到 `site-assets/main.js`
- 把 `styles.css` 同步到 `site-assets/styles.css`

### 3. 预览页面

构建完成后，直接打开：

- `index.html`
- `preview.html`

即可预览当前页面。

### 4. 运行带数据库的报名后台

GitHub Pages 只能托管静态页面，不能直接写数据库。需要真实保存报名和进度数据时，运行仓库里的 Python 后台：

```bash
python3 server.py
```

默认访问地址：

- 首页：`http://127.0.0.1:4174/`
- 比赛进度：`http://127.0.0.1:4174/progress.html`
- 官网报名：`http://127.0.0.1:4174/register.html`
- 后台管理：`http://127.0.0.1:4174/admin.html`
- 健康检查：`http://127.0.0.1:4174/api/health`

后台会自动创建 SQLite 数据库：

```text
data/mgpic2026.sqlite3
```

当前 API：

- `POST /api/registrations`：创建报名记录
- `PUT /api/registrations/:id`：更新报名记录
- `GET /api/registrations/:id`：读取报名、审核状态和仓库检查
- `PATCH /api/registrations/:id/status`：更新申报、验收、奖励和作品墙状态
- `POST /api/registrations/:id/repo-check`：保存 GitHub 仓库检查结果
- `POST /api/registrations/:id/ai-review`：调用 ChatGPT 生成审核建议；未配置 `OPENAI_API_KEY` 时使用本地规则检查
- `POST /api/registrations/:id/advance`：管理员确认进入下一流程，并创建邮件通知
- `POST /api/registrations/:id/notify`：仅发送一封进度通知邮件
- `GET /api/registrations/:id/files/:kind`：下载申报书或学生证明
- `DELETE /api/registrations/:id`：删除报名记录
- `POST /api/import/feishu`：保存飞书导入记录
- `POST /api/feishu/sync-in`：管理员手动把飞书报名导入后台；线上服务可通过 `FEISHU_AUTO_SYNC_ENABLED=1` 自动每 6 小时导入一次
- `POST /api/feishu/sync-out`：管理员手动把官网报名写入飞书表，默认不会自动执行
- `GET /api/auth/github/start`：发起 GitHub OAuth 登录
- `GET /api/auth/github/callback`：GitHub OAuth 回调，换取 token 并建立登录会话
- `GET /api/auth/github/session`：读取当前 GitHub 登录会话
- `POST /api/auth/github/logout`：退出 GitHub 登录

两条报名路径都会保留：

- 飞书报名：继续使用飞书表单收集报名信息，再从后台同步到数据库，用邮箱、GitHub 仓库、GitHub 账号或项目名匹配选手进度。
- 官网报名：官网报名页直接写入 SQLite，后台统一管理审核、AI 建议、流程推进和邮件通知。

公网 GitHub Pages 预览页会自动降级为浏览器本地保存；部署到支持 Python 的服务器后，同源 `/api` 可直接写入 SQLite。

如需部署到服务器，可设置：

```bash
HOST=0.0.0.0 PORT=4174 MGPIC_DB=/data/mgpic2026.sqlite3 python3 server.py
```

可选环境变量：

- `OPENAI_API_KEY`：用于 ChatGPT 审核建议
- `OPENAI_MODEL`：默认 `gpt-4o`
- `SMTP_HOST` / `SMTP_PORT` / `SMTP_FROM`：用于邮件通知
- `SMTP_USER` / `SMTP_PASSWORD` / `SMTP_TLS`：SMTP 登录与 TLS 配置
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`：GitHub OAuth App 配置，用于一键 GitHub 登录
- `GITHUB_OAUTH_REDIRECT_URI`：可选，GitHub OAuth 回调地址；本地默认是 `http://127.0.0.1:4174/api/auth/github/callback`

GitHub OAuth App 需要在 GitHub Developer settings 里创建。Authorization callback URL 本地填：

```text
http://127.0.0.1:4174/api/auth/github/callback
```

部署到线上后，把 callback URL 改成线上后端域名的 `/api/auth/github/callback`，并设置同样的 `GITHUB_OAUTH_REDIRECT_URI`。

## 维护方式

- 内容结构主要在 [main/main.mbt](/Users/zongen/Documents/New%20project/MGPIC2026/main/main.mbt)
- 样式在 [styles.css](/Users/zongen/Documents/New%20project/MGPIC2026/styles.css)
- 报名和进度页交互在 [site-assets/progress.js](/Users/zongen/Documents/New%20project/MGPIC2026/site-assets/progress.js)
- 后台管理页交互在 [site-assets/admin.js](/Users/zongen/Documents/New%20project/MGPIC2026/site-assets/admin.js)
- 数据库后台在 [server.py](/Users/zongen/Documents/New%20project/MGPIC2026/server.py)
- 改完源码后，重新运行 `./scripts/build-site.sh`

这样就能保持“源码”和“可直接发布的静态产物”同步。
