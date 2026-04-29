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
- 自建报名：`http://127.0.0.1:4174/register.html`
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
- `POST /api/import/feishu`：保存飞书导入记录

公网 GitHub Pages 预览页会自动降级为浏览器本地保存；部署到支持 Python 的服务器后，同源 `/api` 可直接写入 SQLite。

## 维护方式

- 内容结构主要在 [main/main.mbt](/Users/zongen/Documents/New%20project/MGPIC2026/main/main.mbt)
- 样式在 [styles.css](/Users/zongen/Documents/New%20project/MGPIC2026/styles.css)
- 报名和进度页交互在 [site-assets/progress.js](/Users/zongen/Documents/New%20project/MGPIC2026/site-assets/progress.js)
- 数据库后台在 [server.py](/Users/zongen/Documents/New%20project/MGPIC2026/server.py)
- 改完源码后，重新运行 `./scripts/build-site.sh`

这样就能保持“源码”和“可直接发布的静态产物”同步。
