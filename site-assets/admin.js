const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const API_BASE_KEY = "mgpic2026.apiBase";
const ADMIN_TOKEN_KEY = "mgpic2026.adminToken";
const DEFAULT_RENDER_API_BASE = "https://mgpic2026.onrender.com";

let registrations = [];
let selectedId = null;
let apiBase = readApiBase();
let adminToken = readAdminToken();
let adminSession = null;
let storageInfo = null;

const STAGE_FILTERS = [
  ["all", "全部记录"],
  ["proposal", "申报审核中"],
  ["development", "项目开发中"],
  ["acceptance", "验收审核中"],
  ["accepted", "验收通过"],
  ["showcase", "作品墙"],
  ["needs_action", "需要处理"],
  ["archived", "已归档"],
];

const REVIEW_MODE_LABELS = {
  proposal: "申报审核",
  acceptance: "验收审核",
  showcase: "优秀作品评选",
};

const FLOW_STEPS = [
  ["proposal", "申报审核"],
  ["development", "项目开发"],
  ["acceptance", "项目验收"],
  ["showcase", "优秀评选"],
  ["display", "作品展示"],
];

const TRANSITION_GROUPS = [
  {
    title: "申报审核",
    actions: [
      ["proposal_pass", "申报通过", "进入项目开发，并标记启动支持待发放", "primary"],
      ["proposal_revise", "需调整", "材料不足，退回选手补充", "secondary"],
      ["proposal_reject", "不通过", "项目暂不进入后续流程", "danger"],
    ],
  },
  {
    title: "项目验收",
    actions: [
      ["acceptance_review", "进入验收", "收到验收材料，开始审核", "secondary"],
      ["acceptance_pass", "验收通过", "进入优秀项目评选，标记完成支持待发放", "primary"],
      ["acceptance_revise", "验收需调整", "验收材料或仓库需补齐", "secondary"],
      ["acceptance_reject", "验收不通过", "项目暂不通过验收", "danger"],
    ],
  },
  {
    title: "奖励与展示",
    actions: [
      ["reward_start_paid", "启动支持已发放", "记录 150 元启动支持状态", "secondary"],
      ["reward_finish_paid", "完成支持已发放", "记录 350 元完成支持状态", "secondary"],
      ["showcase_candidate", "作品墙候选", "进入展示候选池", "secondary"],
      ["showcase_publish", "上架作品墙", "前台作品墙公开展示", "primary"],
      ["showcase_hide", "暂不展示", "不进入公开展示", "danger"],
    ],
  },
];

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;",
}[char]));

async function api(path, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...adminAuthHeaders(),
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    let message = `后台接口 ${response.status}`;
    try {
      const payload = await response.json();
      if (payload.error) message = payload.error;
    } catch {
      // Ignore static 404 pages on GitHub Pages.
    }
    throw new Error(message);
  }
  return response.json();
}

function readAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

function setAdminToken(value) {
  adminToken = String(value || "").trim();
  if (adminToken) {
    localStorage.setItem(ADMIN_TOKEN_KEY, adminToken);
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  }
}

function adminAuthHeaders() {
  return adminToken ? { "X-MGPIC-Admin-Token": adminToken } : {};
}

function normalizeApiBase(value) {
  const text = String(value || "").trim().replace(/\/+$/, "");
  if (!text) return "";
  try {
    const url = new URL(text);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    return url.href.replace(/\/+$/, "");
  } catch {
    return "";
  }
}

function readApiBase() {
  const params = new URLSearchParams(window.location.search);
  const queryBase = params.get("apiBase");
  const configured = normalizeApiBase(queryBase || window.MGPIC_API_BASE || localStorage.getItem(API_BASE_KEY) || defaultApiBase());
  if (queryBase && configured) localStorage.setItem(API_BASE_KEY, configured);
  return configured;
}

function setApiBase(value) {
  const configured = normalizeApiBase(value);
  apiBase = configured || defaultApiBase();
  if (configured) {
    localStorage.setItem(API_BASE_KEY, configured);
  } else {
    localStorage.removeItem(API_BASE_KEY);
  }
}

function defaultApiBase() {
  return isStaticPreviewHost() ? DEFAULT_RENDER_API_BASE : "";
}

function apiUrl(path) {
  if (!path) return apiBase || "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${apiBase}${path}`;
}

function currentEndpointLabel() {
  return apiBase || window.location.origin;
}

function promptAdminToken() {
  const token = window.prompt("请输入后台管理员 Token。留空并确认会清除本机保存的 Token。", adminToken);
  if (token === null) return;
  setAdminToken(token);
  loadRegistrations();
}

function adminOAuthStartUrl() {
  return apiUrl(`/api/auth/github/start?return_to=${encodeURIComponent("/admin.html")}`);
}

function adminAccessBadge() {
  if (adminSession?.user?.admin) {
    return statusBadge(`GitHub 管理员 @${adminSession.user.login}`);
  }
  if (adminSession?.user && !adminSession.user.admin) {
    return statusBadge(`GitHub @${adminSession.user.login} 未在白名单`);
  }
  if (adminToken) {
    return statusBadge("管理员 Token 已授权");
  }
  return statusBadge("管理员未授权");
}

function adminFileUrl(path) {
  const url = new URL(apiUrl(path), window.location.href);
  if (adminToken) url.searchParams.set("adminToken", adminToken);
  return url.href;
}

async function syncAdminSession() {
  try {
    const session = await api("/api/auth/github/session");
    adminSession = session?.authenticated ? session : null;
    return session;
  } catch {
    adminSession = null;
    return null;
  }
}

async function logoutGitHubAdmin() {
  try {
    await api("/api/auth/github/logout", { method: "POST" });
  } finally {
    adminSession = null;
    loadRegistrations();
  }
}

function isStaticPreviewHost() {
  return /github\.io$/i.test(window.location.hostname);
}

function formatTime(value) {
  if (!value) return "-";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, "\"\"")}"`;
}

function downloadText(filename, text, type = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function filteredRegistrations() {
  const query = normalize($("#admin-search")?.value || "");
  const stage = $("#admin-stage-filter")?.value || "all";
  return registrations.filter((item) => {
    const matchesStage = stage === "all"
      || registrationStage(item) === stage
      || (stage === "needs_action" && needsAction(item))
      || (stage === "archived" && item.archived);
    if (!matchesStage) return false;
    if (!query) return true;
    return [
      item.id,
      item.name,
      item.email,
      item.school,
      item.githubLogin,
      item.githubRepo,
      item.projectName,
      item.projectType,
      item.status?.proposal,
      item.status?.acceptance,
      item.status?.reward,
      item.status?.showcase,
      stageLabel(item),
    ].some((value) => normalize(value).includes(query));
  });
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function needsAction(item) {
  const status = item.status || {};
  return /调整|拒绝|不通过|驳回|待发放/.test([
    status.proposal,
    status.acceptance,
    status.reward,
    status.showcase,
  ].join(" "));
}

function registrationStage(item) {
  const status = item.status || {};
  if (/已上墙|展示/.test(status.showcase || "")) return "showcase";
  if (/验收通过/.test(status.acceptance || "")) return "accepted";
  if (/验收审核/.test(status.acceptance || "")) return "acceptance";
  if (/申报通过/.test(status.proposal || "")) return "development";
  return "proposal";
}

function stageLabel(item) {
  const labels = {
    proposal: "申报审核中",
    development: "项目开发中",
    acceptance: "验收审核中",
    accepted: "验收通过",
    showcase: "作品墙展示",
  };
  return labels[registrationStage(item)] || "待处理";
}

function stageFilterOptions() {
  return STAGE_FILTERS.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function statusBadge(value) {
  const text = String(value || "未设置");
  const done = /通过|已发放|已上墙|完成/.test(text);
  const warn = /调整|拒绝|不通过|驳回|归档/.test(text);
  const wait = /待发放|审核中|待上墙|未提交|未开始/.test(text);
  const klass = done ? "admin-badge admin-badge--ok" : warn ? "admin-badge admin-badge--warn" : wait ? "admin-badge admin-badge--wait" : "admin-badge";
  return `<span class="${klass}">${escapeHtml(text)}</span>`;
}

function sourceLabel(value) {
  const labels = {
    website: "官网报名",
    feishu: "飞书报名",
    backend: "后台录入",
  };
  return labels[value] || value || "未知来源";
}

function materialSummary(item) {
  const materials = [
    ["申报书", item.proposalFileName],
    ["学生证明", item.studentFileName],
    ["身份证正面", item.idFrontFileName],
    ["身份证反面", item.idBackFileName],
  ].filter(([, filename]) => filename);
  return materials.length ? materials.map(([label]) => label).join(" / ") : "未提交文件";
}

function sensitiveSummary(item) {
  if (item.sensitiveSubmitted) return "敏感信息已提交";
  if (item.idNumberMasked || item.bankAccountMasked) return "敏感信息已掩码";
  return "未提交敏感信息";
}

function repoCheckSummary(item) {
  const repoCheck = item.repoCheck;
  if (!repoCheck) return { title: "未检查", body: "暂无仓库检查记录" };
  const checks = repoCheck.checks || [];
  const passed = checks.filter((check) => check.passed).length;
  return {
    title: `${passed} / ${checks.length || 8} 通过`,
    body: `${repoCheck.commitCount ?? "-"} 个 4 月 29 日后公开 commits`,
  };
}

function renderDisconnected(error) {
  const app = $("#admin-app");
  const message = error?.message || "无法连接 /api/health";
  const needsToken = /Token|管理员|401|403/.test(message);
  const staticHint = isStaticPreviewHost()
    ? "当前 GitHub Pages 页面已直接连接 Render 后端；Render 服务可用后，报名数据会在这里直接展示。"
    : "当前页面没有连接到可用的后台接口。请确认 Python 后端已经启动，或填写部署后的后端服务地址。";
  app.innerHTML = `
    <div class="admin-disconnected">
      <div class="progress-alert progress-alert--error">
        <strong>${needsToken ? "需要管理员授权" : "后台连接异常"}</strong>
        <p>${escapeHtml(staticHint)}</p>
        <p>当前连接地址：<code>${escapeHtml(currentEndpointLabel())}</code></p>
        <p>接口提示：${escapeHtml(message)}</p>
        <p>${needsToken ? "请使用管理员 GitHub 白名单账号登录，或填写赛事工作人员持有的管理员 Token。GitHub 登录账号必须出现在 Render 环境变量 ADMIN_GITHUB_LOGINS 中；Token 只保存在当前浏览器本地，不会写入页面代码。" : `如果持续连接失败，请确认 Render 服务已启动，且实际服务域名为 <code>${escapeHtml(DEFAULT_RENDER_API_BASE)}</code>。`}</p>
      </div>
      <form class="admin-api-form" id="admin-api-form">
        <label class="form-field admin-detail-wide">
          <span>后端服务地址</span>
          <input
            name="apiBase"
            value="${escapeHtml(apiBase)}"
            placeholder="例如：https://mgpic2026.onrender.com"
            autocomplete="url"
          >
        </label>
        <label class="form-field admin-detail-wide">
          <span>管理员 Token</span>
          <input
            name="adminToken"
            value="${escapeHtml(adminToken)}"
            placeholder="填写 Render 环境变量 ADMIN_TOKEN"
            autocomplete="off"
          >
        </label>
        <p>
          后台列表、详情、材料下载、审核推进和邮件通知都需要管理员权限。推荐使用 GitHub 白名单登录；
          管理员 Token 仅作为备用入口。
        </p>
        <div class="admin-form-actions">
          <button class="button primary" type="button" data-action="admin-github-login">使用 GitHub 管理员登录</button>
          <button class="button primary" type="submit">保存并连接数据后台</button>
          <a class="button secondary" href="${escapeHtml(apiUrl("/admin.html"))}" target="_blank" rel="noreferrer">打开 Render 后台</a>
          <button class="button secondary" type="button" data-action="clear-api-base">恢复默认 Render 地址</button>
          <a class="button secondary" href="https://github.com/moonbitlang/OSC2026/blob/main/DEPLOYMENT.md" target="_blank" rel="noreferrer">查看部署说明</a>
        </div>
      </form>
    </div>
  `;

  $("#admin-api-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setApiBase(new FormData(form).get("apiBase"));
    setAdminToken(new FormData(form).get("adminToken"));
    loadRegistrations();
  });
  app.querySelector("[data-action='clear-api-base']").addEventListener("click", () => {
    setApiBase("");
    loadRegistrations();
  });
  app.querySelector("[data-action='admin-github-login']").addEventListener("click", () => {
    window.location.href = adminOAuthStartUrl();
  });
}

function renderShell() {
  const app = $("#admin-app");
  app.innerHTML = `
    <div class="admin-operator-note">
      <div>
        <strong>官方内部工作台</strong>
        <p>当前连接：<code>${escapeHtml(currentEndpointLabel())}</code>。这里集中处理报名、材料审核、仓库检查、AI 初审、流程推进和通知记录。</p>
      </div>
      <div class="admin-note-actions">
        ${adminAccessBadge()}
      </div>
    </div>
    <div class="admin-toolbar">
      <div class="admin-toolbar-main">
        <div class="admin-search-wrap">
          <label class="form-field">
            <span>搜索报名记录</span>
            <input id="admin-search" placeholder="姓名 / 邮箱 / GitHub / 项目名称 / 状态">
          </label>
          <label class="form-field">
            <span>流程筛选</span>
            <select id="admin-stage-filter">${stageFilterOptions()}</select>
          </label>
        </div>
      </div>
      <div class="admin-toolbar-action-block">
        <span class="admin-toolbar-label">常用操作</span>
        <div class="admin-toolbar-actions">
          <button class="button primary" type="button" data-action="open-register">新增报名</button>
          <button class="button secondary" type="button" data-action="refresh">刷新数据</button>
          <button class="button secondary" type="button" data-action="export-csv">导出 CSV</button>
          <a class="button secondary" href="https://bxup9uklfcb.feishu.cn/wiki/UtVVwrmahiBQlokfhQrc0hh4np1?table=tblpdjqjCZdRNJah&view=vewygPXWz5" target="_blank" rel="noreferrer">查看飞书报名</a>
          <button class="button secondary" type="button" data-action="sync-feishu-in">飞书同步到后台</button>
          <button class="button secondary" type="button" data-action="sync-feishu-out">官网报名写入飞书</button>
          <button class="button secondary" type="button" data-action="set-admin-token">管理员 Token</button>
          <a class="button secondary" href="${escapeHtml(adminOAuthStartUrl())}">GitHub 管理员登录</a>
          ${adminSession?.user ? `<button class="button secondary" type="button" data-action="logout-github">退出 GitHub 登录</button>` : ""}
        </div>
      </div>
    </div>
    <div class="admin-stats" id="admin-stats"></div>
    <div class="admin-workflow-board" id="admin-workflow-board"></div>
    <div class="admin-storage-panel" id="admin-storage-panel"></div>
    <div class="admin-layout">
      <section class="admin-card admin-card--table">
        <div class="admin-card-head">
          <div>
            <h2>全部提交数据</h2>
            <p>这里展示 Render SQLite 中保存的全部报名记录。选中任意一行可查看完整报名字段、材料文件、仓库检查、AI 审核建议、流程状态和通知记录。</p>
          </div>
          <span id="admin-count">0 条</span>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>编号 / 来源</th>
                <th>项目与仓库</th>
                <th>选手</th>
                <th>联系方式 / 学校</th>
                <th>材料与敏感信息</th>
                <th>仓库检查</th>
                <th>流程状态</th>
                <th>奖励 / 作品墙</th>
                <th>提交时间</th>
              </tr>
            </thead>
            <tbody id="admin-table-body"></tbody>
          </table>
        </div>
      </section>
      <section class="admin-card admin-card--detail" id="admin-detail">
        <div class="progress-alert">选择一条报名记录后，在这里查看详情和维护状态。</div>
      </section>
    </div>
  `;
  $("#admin-search").addEventListener("input", renderList);
  $("#admin-stage-filter").addEventListener("change", renderList);
  app.querySelector("[data-action='refresh']").addEventListener("click", loadRegistrations);
  app.querySelector("[data-action='logout-github']")?.addEventListener("click", logoutGitHubAdmin);
  app.querySelector("[data-action='set-admin-token']").addEventListener("click", promptAdminToken);
  app.querySelector("[data-action='export-csv']").addEventListener("click", exportCsv);
  app.querySelector("[data-action='sync-feishu-in']").addEventListener("click", syncFeishuToBackend);
  app.querySelector("[data-action='sync-feishu-out']").addEventListener("click", syncBackendToFeishu);
  app.querySelector("[data-action='open-register']").addEventListener("click", () => {
    window.location.href = apiBase ? `${apiBase}/register.html` : "register.html";
  });
}

function renderStats() {
  const total = registrations.length;
  const proposalPending = registrations.filter((item) => registrationStage(item) === "proposal").length;
  const proposalPassed = registrations.filter((item) => /通过/.test(item.status?.proposal || "")).length;
  const acceptancePending = registrations.filter((item) => /验收审核/.test(item.status?.acceptance || "")).length;
  const accepted = registrations.filter((item) => /通过/.test(item.status?.acceptance || "")).length;
  const actionRequired = registrations.filter(needsAction).length;
  const showcased = registrations.filter((item) => /上墙|展示/.test(item.status?.showcase || "")).length;
  const archived = registrations.filter((item) => item.archived).length;
  $("#admin-stats").innerHTML = `
    <div><span>报名总数</span><strong>${total}</strong></div>
    <div><span>申报待审</span><strong>${proposalPending}</strong></div>
    <div><span>申报通过</span><strong>${proposalPassed}</strong></div>
    <div><span>验收待审</span><strong>${acceptancePending}</strong></div>
    <div><span>验收通过</span><strong>${accepted}</strong></div>
    <div><span>需处理</span><strong>${actionRequired}</strong></div>
    <div><span>已上作品墙</span><strong>${showcased}</strong></div>
    <div><span>已归档</span><strong>${archived}</strong></div>
  `;
  renderWorkflowBoard();
}

function renderWorkflowBoard() {
  const counts = {
    proposal: registrations.filter((item) => registrationStage(item) === "proposal").length,
    development: registrations.filter((item) => registrationStage(item) === "development").length,
    acceptance: registrations.filter((item) => registrationStage(item) === "acceptance").length,
    accepted: registrations.filter((item) => registrationStage(item) === "accepted").length,
    showcase: registrations.filter((item) => registrationStage(item) === "showcase").length,
  };
  const board = $("#admin-workflow-board");
  if (!board) return;
  board.innerHTML = `
    <div><span>1</span><strong>申报审核</strong><p>${counts.proposal} 个项目待初审，重点看学生身份、申报书、GitHub 仓库和 4 月 29 日后有效提交。</p></div>
    <div><span>2</span><strong>开发跟进</strong><p>${counts.development} 个项目已立项，持续跟进 README、测试、CI、许可证和 MoonBit 包建设。</p></div>
    <div><span>3</span><strong>项目验收</strong><p>${counts.acceptance} 个项目进入验收审核，验收通过后可进入优秀项目评选。</p></div>
    <div><span>4</span><strong>评选展示</strong><p>${counts.accepted + counts.showcase} 个项目可评估生态价值、展示效果和长期维护潜力。</p></div>
  `;
}

function formatBytes(value) {
  const size = Number(value || 0);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function backupLinks(backups = []) {
  if (!backups.length) return `<p>暂无备份；后续每次报名、导入、状态修改、归档都会自动生成备份。</p>`;
  return backups.slice(0, 5).map((backup) => `
    <a class="admin-file-link" href="${escapeHtml(adminFileUrl(backup.downloadUrl))}" target="_blank" rel="noreferrer">
      ${escapeHtml(backup.name)} · ${formatBytes(backup.size)}
    </a>
  `).join("");
}

function snapshotLinks(snapshots = []) {
  if (!snapshots.length) return `<p>暂无 JSON 快照；后续每次写入都会同步生成。</p>`;
  return snapshots.slice(0, 5).map((snapshot) => `
    <a class="admin-file-link" href="${escapeHtml(adminFileUrl(snapshot.downloadUrl))}" target="_blank" rel="noreferrer">
      ${escapeHtml(snapshot.name)} · ${formatBytes(snapshot.size)}
    </a>
  `).join("");
}

function storageLocationCards(locations = []) {
  if (!locations.length) {
    return `<p>后台暂未返回存储位置清单。</p>`;
  }
  return locations.map((item) => `
    <article class="admin-storage-location">
      <div>
        <strong>${escapeHtml(item.name || "未命名存储")}</strong>
        <span>${escapeHtml(item.kind || "storage")} · ${escapeHtml(item.countLabel || "")}</span>
      </div>
      <code>${escapeHtml(item.location || "未配置")}</code>
      <p>${escapeHtml(item.content || "暂无说明")}</p>
      <p class="admin-storage-location-safety">${escapeHtml(item.safety || "请确认访问权限和备份策略。")}</p>
    </article>
  `).join("");
}

function renderStorage() {
  const panel = $("#admin-storage-panel");
  if (!panel) return;
  if (!storageInfo) {
    panel.innerHTML = `
      <div class="admin-storage-card">
        <strong>数据安全</strong>
        <p>正在读取数据库状态和备份信息...</p>
      </div>
    `;
    return;
  }
  const counts = storageInfo.counts || {};
  const latest = (storageInfo.backups || [])[0];
  const latestSnapshot = (storageInfo.snapshots || [])[0];
  const persistence = storageInfo.persistence || {};
  const persistenceWarning = persistence.message || "当前使用 SQLite 文件存储。请确认生产环境已配置持久盘或外部数据库，否则重新部署可能导致数据丢失。";
  panel.innerHTML = `
    <div class="admin-storage-card">
      <div>
        <span class="tag">数据安全</span>
        <h3>报名数据存储状态</h3>
        <p>数据库：<code>${escapeHtml(storageInfo.database)}</code></p>
        <p>备份目录：<code>${escapeHtml(storageInfo.backupDir)}</code></p>
        <p>快照目录：<code>${escapeHtml(storageInfo.snapshotDir || "")}</code></p>
      </div>
      <div class="progress-alert progress-alert--error admin-storage-warning">
        <strong>必须确认持久存储。</strong>
        <p>${escapeHtml(persistenceWarning)}</p>
        <p>当前看到的 SQLite 备份和 JSON 快照只能保护“同一个持久存储卷”内的数据；如果 Render Disk 未生效，它们会随重新部署一起消失。</p>
      </div>
      <div class="admin-storage-locations">
        <div class="admin-storage-section-head">
          <strong>所有数据存储位置</strong>
          <span>用于确认报名数据、材料、日志、外部渠道和浏览器缓存分别存在哪里。</span>
        </div>
        <div class="admin-storage-location-grid">
          ${storageLocationCards(storageInfo.storageLocations)}
        </div>
      </div>
      <div class="admin-storage-metrics">
        <div><span>报名</span><strong>${counts.registrations ?? registrations.length}</strong></div>
        <div><span>材料文件</span><strong>${counts.files ?? 0}</strong></div>
        <div><span>数据库大小</span><strong>${formatBytes(storageInfo.databaseSize)}</strong></div>
        <div><span>最近备份</span><strong>${latest ? formatTime(latest.createdAt) : "暂无"}</strong></div>
        <div><span>最近快照</span><strong>${latestSnapshot ? formatTime(latestSnapshot.createdAt) : "暂无"}</strong></div>
        <div><span>审计日志</span><strong>${formatBytes(storageInfo.ledgerSize || 0)}</strong></div>
      </div>
      <div class="admin-storage-actions">
        <button class="button primary" type="button" data-action="create-backup">立即生成备份</button>
        <a class="button secondary" href="${escapeHtml(adminFileUrl("/api/admin/export"))}" target="_blank" rel="noreferrer">导出完整 JSON</a>
        <button class="button secondary" type="button" data-action="restore-json">从 JSON 恢复</button>
        ${storageInfo.ledgerSize ? `<a class="button secondary" href="${escapeHtml(adminFileUrl("/api/admin/ledger"))}" target="_blank" rel="noreferrer">下载审计日志</a>` : ""}
        <span>系统会在报名、导入、审核、状态修改、归档等写入动作后，同时生成 SQLite 备份、完整 JSON 快照和审计日志；服务启动时若数据库为空，会尝试从 latest.json 自动恢复。正式运营前请先完成 Render 持久盘或外部数据库配置。</span>
      </div>
      <div class="admin-backup-grid">
        <div>
          <strong>SQLite 备份</strong>
          <div class="admin-backup-list">${backupLinks(storageInfo.backups)}</div>
        </div>
        <div>
          <strong>JSON 快照</strong>
          <div class="admin-backup-list">${snapshotLinks(storageInfo.snapshots)}</div>
        </div>
      </div>
    </div>
  `;
  panel.querySelector("[data-action='create-backup']")?.addEventListener("click", createBackup);
  panel.querySelector("[data-action='restore-json']")?.addEventListener("click", restoreFromJsonFile);
}

function renderList() {
  const rows = filteredRegistrations();
  $("#admin-count").textContent = `${rows.length} 条`;
  $("#admin-table-body").innerHTML = rows.map((item) => {
    const repoCheck = repoCheckSummary(item);
    return `
      <tr data-id="${item.id}" class="${[
        Number(item.id) === Number(selectedId) ? "is-selected" : "",
        item.archived ? "is-archived" : "",
      ].filter(Boolean).join(" ")}">
        <td>
          <strong>#${item.id}</strong>
          <span>${escapeHtml(sourceLabel(item.source))}</span>
          ${item.archived ? statusBadge("已归档", { warn: true }) : ""}
        </td>
        <td>
          <strong>${escapeHtml(item.projectName || "未命名项目")}</strong>
          <span>${escapeHtml(item.projectType || "未填写方向")}</span>
          <span>${escapeHtml(item.githubRepo || "未填写仓库")}</span>
        </td>
        <td>
          <strong>${escapeHtml(item.name || "未填写")}</strong>
          <span>GitHub：${escapeHtml(item.githubLogin || "未填写")}</span>
        </td>
        <td>
          <strong>${escapeHtml(item.email || "邮箱未填")}</strong>
          <span>${escapeHtml(item.school || "学校 / 组织未填")}</span>
        </td>
        <td>
          <strong>${escapeHtml(materialSummary(item))}</strong>
          <span>${escapeHtml(sensitiveSummary(item))}</span>
        </td>
        <td>
          <strong>${escapeHtml(repoCheck.title)}</strong>
          <span>${escapeHtml(repoCheck.body)}</span>
        </td>
        <td>
          ${statusBadge(stageLabel(item))}
          <span>申报：${escapeHtml(item.status?.proposal || "申报审核中")}</span>
          <span>验收：${escapeHtml(item.status?.acceptance || "未提交")}</span>
        </td>
        <td>
          ${statusBadge(item.status?.reward)}
          <span>${escapeHtml(item.status?.showcase || "待上墙")}</span>
        </td>
        <td>
          <strong>${formatTime(item.createdAt)}</strong>
          <span>更新：${formatTime(item.updatedAt)}</span>
          ${item.archivedAt ? `<span>归档：${formatTime(item.archivedAt)}</span>` : ""}
        </td>
      </tr>
    `;
  }).join("") || `<tr><td colspan="9">暂无报名记录。</td></tr>`;

  $("#admin-table-body").querySelectorAll("tr[data-id]").forEach((row) => {
    row.addEventListener("click", () => selectRegistration(row.dataset.id));
  });
}

async function selectRegistration(id) {
  selectedId = Number(id);
  renderList();
  const detail = $("#admin-detail");
  detail.innerHTML = `<div class="progress-alert">正在读取 #${escapeHtml(id)}...</div>`;
  try {
    const data = await api(`/api/registrations/${encodeURIComponent(id)}`);
    renderDetail(data);
  } catch (error) {
    detail.innerHTML = `<div class="progress-alert progress-alert--error">${escapeHtml(error.message)}</div>`;
  }
}

function option(value, current) {
  return `<option value="${escapeHtml(value)}" ${value === current ? "selected" : ""}>${escapeHtml(value)}</option>`;
}

function selectOptions(values, current) {
  const all = current && !values.includes(current) ? [current, ...values] : values;
  return all.map((value) => option(value, current)).join("");
}

function fileLinks(files = []) {
  if (!files.length) return "<p>暂无上传文件。</p>";
  const labels = {
    proposal: "申报书",
    student: "学生证明",
    id_front: "身份证正面",
    id_back: "身份证反面",
  };
  return files.map((file) => `
    <a class="admin-file-link" href="${escapeHtml(adminFileUrl(file.downloadUrl))}" target="_blank" rel="noreferrer">
      ${escapeHtml(labels[file.kind] || file.kind)}：${escapeHtml(file.filename || "未命名文件")}
    </a>
  `).join("");
}

function valueOrDash(value) {
  const text = String(value ?? "").trim();
  return text || "-";
}

function detailValue(value, options = {}) {
  const text = valueOrDash(value);
  if (options.link && text !== "-") {
    return `<a href="${escapeHtml(text)}" target="_blank" rel="noreferrer">${escapeHtml(text)}</a>`;
  }
  if (options.multiline) {
    return `<p>${escapeHtml(text)}</p>`;
  }
  return `<strong>${escapeHtml(text)}</strong>`;
}

function infoItem(label, value, options = {}) {
  return `
    <div class="${options.wide ? "admin-info-item admin-info-item--wide" : "admin-info-item"}">
      <span>${escapeHtml(label)}</span>
      ${detailValue(value, options)}
    </div>
  `;
}

function fileInfoItems(item, files = []) {
  const byKind = Object.fromEntries((files || []).map((file) => [file.kind, file]));
  const definitions = [
    ["项目申报书 PDF", "proposal", item.proposalFileName],
    ["学生身份证明", "student", item.studentFileName],
    ["身份证正面（水印版）", "id_front", item.idFrontFileName],
    ["身份证反面（水印版）", "id_back", item.idBackFileName],
  ];
  return definitions.map(([label, kind, fallbackName]) => {
    const file = byKind[kind];
    const filename = file?.filename || fallbackName || "";
    const meta = file ? `${filename || "未命名文件"} · ${formatBytes(file.size)} · ${file.contentType || "文件"}` : filename;
    return infoItem(label, meta || "未上传");
  }).join("");
}

function rawPayloadPanel(rawPayload) {
  if (!rawPayload?.payload) {
    return `
      <div class="admin-files">
        <h3>原始填报快照</h3>
        <p>这条记录创建于原始快照功能上线前，后台会展示数据库中已有字段；之后新提交和飞书导入都会保存完整填报快照。</p>
      </div>
    `;
  }
  return `
    <div class="admin-files admin-detail-wide">
      <div class="admin-section-title">
        <h3>原始填报快照</h3>
        <span>${escapeHtml(sourceLabel(rawPayload.source))} · ${formatTime(rawPayload.updatedAt)}</span>
      </div>
      <pre class="admin-json-preview">${escapeHtml(JSON.stringify(rawPayload.payload, null, 2))}</pre>
    </div>
  `;
}

function completeSubmissionPanel(data) {
  const item = data.registration || {};
  const status = data.status || {};
  return `
    <div class="admin-complete-panel">
      <div class="admin-section-title">
        <h3>完整填报信息</h3>
        <span>管理员可见，含奖金发放相关敏感信息</span>
      </div>
      <div class="admin-info-grid">
        ${infoItem("报名编号", `#${item.id || "-"}`)}
        ${infoItem("报名来源", sourceLabel(item.source))}
        ${infoItem("记录状态", item.archived ? `已归档：${formatTime(item.archivedAt)}` : "正常")}
        ${infoItem("创建时间", formatTime(item.createdAt))}
        ${infoItem("更新时间", formatTime(item.updatedAt))}
        ${infoItem("姓名", item.name)}
        ${infoItem("联系邮箱", item.email)}
        ${infoItem("学校 / 组织", item.school)}
        ${infoItem("身份证号", item.idNumber || item.idNumberMasked)}
        ${infoItem("银行卡号", item.bankAccount || item.bankAccountMasked)}
        ${infoItem("开户支行", item.bankBranch, { wide: true })}
        ${infoItem("GitHub 用户名", item.githubLogin)}
        ${infoItem("GitHub 仓库", item.githubRepo, { link: true, wide: true })}
        ${infoItem("项目名称", item.projectName)}
        ${infoItem("项目方向", item.projectType)}
        ${infoItem("项目简介", item.summary, { multiline: true, wide: true })}
        ${fileInfoItems(item, data.files)}
        ${infoItem("申报审核状态", status.proposal)}
        ${infoItem("验收状态", status.acceptance)}
        ${infoItem("奖励状态", status.reward)}
        ${infoItem("作品墙状态", status.showcase)}
        ${infoItem("管理员备注", status.notes, { multiline: true, wide: true })}
      </div>
      ${rawPayloadPanel(data.rawPayload)}
    </div>
  `;
}

function reviewList(reviews = []) {
  if (!reviews.length) return `<p>还没有 AI 审核建议。</p>`;
  return reviews.map((review) => `
    <div class="admin-review-item">
      <div>
        <strong>${escapeHtml(review.summary || "审核建议")}</strong>
        <span>${escapeHtml(REVIEW_MODE_LABELS[review.mode] || review.mode || "审核")} / ${escapeHtml(review.engine || "review")} / ${escapeHtml(review.model || "-")} / ${formatTime(review.createdAt)}</span>
      </div>
      <div>${statusBadge(`${review.decision || "needs_revision"} · ${review.score || 0}分`)}</div>
      <p>下一步：${escapeHtml(review.nextStage || "-")}</p>
      <p>理由：${escapeHtml((review.reasons || []).join("；") || "-")}</p>
      <p>缺失项：${escapeHtml((review.missingItems || []).join("；") || "暂无")}</p>
      ${review.emailSubject || review.emailBody ? `
        <details>
          <summary>查看 AI 建议通知文案</summary>
          <p><strong>${escapeHtml(review.emailSubject || "邮件标题待生成")}</strong></p>
          <pre>${escapeHtml(review.emailBody || "")}</pre>
        </details>
      ` : ""}
    </div>
  `).join("");
}

function notificationList(notifications = []) {
  if (!notifications.length) return `<p>还没有通知记录。</p>`;
  return notifications.map((item) => `
    <div class="admin-notification-item">
      <strong>${escapeHtml(item.subject || "通知")}</strong>
      <span>${escapeHtml(item.recipient || "-")} / ${escapeHtml(item.status || "pending")} / ${formatTime(item.createdAt)}</span>
      ${item.error ? `<p>${escapeHtml(item.error)}</p>` : ""}
    </div>
  `).join("");
}

function statusLine(status = {}) {
  return [
    `申报：${status.proposal || "-"}`,
    `验收：${status.acceptance || "-"}`,
    `奖励：${status.reward || "-"}`,
    `作品墙：${status.showcase || "-"}`,
  ].join(" / ");
}

function statusEventList(events = []) {
  if (!events.length) {
    return `<p>还没有流程流转记录。后续通过这里推进、退回或上墙都会自动记录。</p>`;
  }
  return events.map((event) => `
    <div class="admin-event-item">
      <div>
        <strong>${escapeHtml(event.actionLabel || event.action || "流程更新")}</strong>
        <span>${escapeHtml(event.operator || "管理员")} · ${formatTime(event.createdAt)}</span>
      </div>
      <p>从：${escapeHtml(statusLine(event.fromStatus))}</p>
      <p>到：${escapeHtml(statusLine(event.toStatus))}</p>
      ${event.note ? `<p>备注：${escapeHtml(event.note)}</p>` : ""}
      ${event.notificationId ? `<span class="admin-event-tag">已创建通知 #${escapeHtml(event.notificationId)}</span>` : `<span class="admin-event-tag">未发送通知</span>`}
    </div>
  `).join("");
}

function transitionPanel(data) {
  const status = data.status || {};
  return `
    <div class="admin-transition-panel">
      <div class="admin-section-title">
        <div>
          <h3>流程流转操作台</h3>
          <p>选择操作后会更新选手进度页，并写入流转记录；勾选通知时会给选手邮箱创建通知。</p>
        </div>
        <span>${escapeHtml(statusLine(status))}</span>
      </div>
      <div class="admin-transition-controls">
        <label class="form-field admin-transition-note">
          <span>本次操作备注</span>
          <textarea id="admin-transition-note" rows="3" placeholder="例如：申报书缺少许可证说明；README 和测试已补齐。"></textarea>
        </label>
        <label class="admin-transition-check">
          <input id="admin-transition-notify" type="checkbox" checked />
          <span>同步给选手邮箱创建通知</span>
        </label>
      </div>
      <div class="admin-transition-groups">
        ${TRANSITION_GROUPS.map((group) => `
          <div class="admin-transition-group">
            <h4>${escapeHtml(group.title)}</h4>
            <div class="admin-transition-actions">
              ${group.actions.map(([key, label, desc, tone]) => `
                <button class="admin-transition-action is-${escapeHtml(tone)}" type="button" data-transition="${escapeHtml(key)}">
                  <strong>${escapeHtml(label)}</strong>
                  <span>${escapeHtml(desc)}</span>
                </button>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
      <div class="progress-alert" id="admin-transition-message" hidden></div>
      <div class="admin-event-layout">
        <div class="admin-files">
          <h3>流程流转记录</h3>
          ${statusEventList(data.statusEvents)}
        </div>
        <div class="admin-files">
          <h3>通知记录</h3>
          ${notificationList(data.notifications)}
        </div>
      </div>
    </div>
  `;
}

function flowStepClass(status, step) {
  if (step === "proposal") return /通过/.test(status.proposal || "") ? "is-done" : "is-current";
  if (step === "development") return /通过/.test(status.proposal || "") && !/验收/.test(status.acceptance || "") ? "is-current" : /验收|通过/.test(status.acceptance || "") ? "is-done" : "";
  if (step === "acceptance") return /验收通过/.test(status.acceptance || "") ? "is-done" : /验收审核/.test(status.acceptance || "") ? "is-current" : "";
  if (step === "showcase") return /已上墙|候选/.test(status.showcase || "") ? "is-current" : "";
  if (step === "display") return /已上墙/.test(status.showcase || "") ? "is-done" : "";
  return "";
}

function workflowStrip(status = {}) {
  return `
    <div class="admin-flow-strip">
      ${FLOW_STEPS.map(([key, label], index) => `
        <div class="${flowStepClass(status, key)}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(label)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function repoCheckPanel(repoCheck) {
  if (!repoCheck) {
    return `
      <div class="admin-files">
        <h3>仓库检查</h3>
        <p>还没有仓库检查记录。选手在比赛进度页填写 GitHub 仓库并检查后，这里会显示公开仓库、有效 commits、README、CI、测试、许可证、MoonBit 代码和包配置。</p>
      </div>
    `;
  }
  const checks = repoCheck.checks || [];
  const passed = checks.filter((item) => item.passed).length;
  return `
    <div class="admin-files">
      <div class="admin-section-title">
        <h3>仓库检查</h3>
        <span>${passed} / ${checks.length || 8} 通过 · ${formatTime(repoCheck.checkedAt)}</span>
      </div>
      <p>仓库：${escapeHtml(repoCheck.repoUrl || "-")}；4 月 29 日后 commits：${escapeHtml(repoCheck.commitCount ?? "-")}</p>
      <div class="admin-check-grid">
        ${checks.map((item) => `
          <div class="${item.passed ? "is-pass" : "is-fail"}">
            <strong>${escapeHtml(item.label || item.key || "检查项")}</strong>
            <p>${escapeHtml(item.detail || (item.passed ? "已通过" : "待补充"))}</p>
          </div>
        `).join("") || "<p>暂无具体检查项。</p>"}
      </div>
    </div>
  `;
}

function ruleChecklist() {
  const items = [
    ["申报初审", "学生身份、联系方式、GitHub 仓库、1 页左右 PDF 申报书、10-20 个有效 commits、移植来源和许可证说明。"],
    ["开发跟进", "公开连续提交，围绕 MoonBit 生态库、工具、示例工程建设；项目边界清晰，避免重复成熟项目。"],
    ["项目验收", "MoonBit 为主要语言，README、示例、测试、CI、OSI 许可证、mooncakes.io 发布或包配置齐全。"],
    ["优秀评选", "综合工程质量、生态价值、文档体验、MoonBit 特性使用、展示表现和长期维护潜力。"],
  ];
  return `
    <div class="admin-rule-panel">
      ${items.map(([title, body]) => `
        <div>
          <strong>${escapeHtml(title)}</strong>
          <p>${escapeHtml(body)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function reviewModeOptions() {
  return Object.entries(REVIEW_MODE_LABELS).map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function renderDetail(data) {
  const item = data.registration;
  const status = data.status || {};
  $("#admin-detail").innerHTML = `
    <div class="admin-card-head">
      <h2>#${item.id} ${escapeHtml(item.projectName || "未命名项目")}</h2>
      <button class="button secondary" type="button" data-action="delete">归档记录</button>
    </div>
    ${item.archived ? `<div class="progress-alert progress-alert--warn">这条记录已归档：${escapeHtml(formatTime(item.archivedAt))}。归档记录仍保留在数据库和备份中，不会从后台彻底删除。</div>` : ""}
    ${workflowStrip(status)}
    <div class="admin-detail-grid">
      <div><span>姓名</span><strong>${escapeHtml(item.name || "-")}</strong></div>
      <div><span>邮箱</span><strong>${escapeHtml(item.email || "-")}</strong></div>
      <div><span>学校 / 组织</span><strong>${escapeHtml(item.school || "-")}</strong></div>
      <div><span>GitHub 用户名</span><strong>${escapeHtml(item.githubLogin || "-")}</strong></div>
      <div><span>项目方向</span><strong>${escapeHtml(item.projectType || "-")}</strong></div>
      <div><span>报名来源</span><strong>${escapeHtml(sourceLabel(item.source))}</strong></div>
      <div><span>记录状态</span><strong>${item.archived ? "已归档" : "正常"}</strong></div>
      <div><span>创建时间</span><strong>${formatTime(item.createdAt)}</strong></div>
      <div><span>更新时间</span><strong>${formatTime(item.updatedAt)}</strong></div>
      <div><span>身份证号</span><strong>${escapeHtml(item.idNumber || item.idNumberMasked || "-")}</strong></div>
      <div><span>银行卡号</span><strong>${escapeHtml(item.bankAccount || item.bankAccountMasked || "-")}</strong></div>
      <div class="admin-detail-wide"><span>开户支行</span><strong>${escapeHtml(item.bankBranch || "-")}</strong></div>
      <div class="admin-detail-wide"><span>材料与敏感信息状态</span><strong>${escapeHtml(materialSummary(item))}；${escapeHtml(sensitiveSummary(item))}</strong></div>
      <div class="admin-detail-wide"><span>GitHub 仓库</span><strong>${item.githubRepo ? `<a href="${escapeHtml(item.githubRepo)}" target="_blank" rel="noreferrer">${escapeHtml(item.githubRepo)}</a>` : "-"}</strong></div>
      <div class="admin-detail-wide"><span>项目简介</span><p>${escapeHtml(item.summary || "未填写")}</p></div>
    </div>
    <div class="progress-alert">
      敏感信息仅用于奖金发放和必要身份核验。对外导出或转交前请确认最小必要范围，不要放到公开进度页或作品墙。
    </div>
    ${transitionPanel(data)}
    ${completeSubmissionPanel(data)}
    ${ruleChecklist()}
    ${repoCheckPanel(data.repoCheck)}
    <div class="admin-files">
      <h3>材料文件</h3>
      ${fileLinks(data.files)}
    </div>
    <div class="admin-ai-panel">
      <div class="admin-panel-head">
        <div>
          <h3>AI 辅助审核</h3>
          <p>按本届比赛规则生成初审建议。AI 只做辅助判断，最终结果由 MoonBit 官方管理员确认。</p>
        </div>
        <form class="admin-inline-form" id="admin-ai-form">
          <select name="mode">${reviewModeOptions()}</select>
          <button class="button secondary" type="submit">生成审核建议</button>
        </form>
      </div>
      <div class="admin-review-list" id="admin-review-list">${reviewList(data.aiReviews)}</div>
      <div class="progress-alert" id="admin-ai-message" hidden></div>
    </div>
    <form class="admin-status-form" id="admin-status-form">
      <label class="form-field"><span>申报审核</span><select name="proposal">${selectOptions(["申报审核中", "申报通过", "申报需调整", "申报不通过"], status.proposal || "申报审核中")}</select></label>
      <label class="form-field"><span>验收状态</span><select name="acceptance">${selectOptions(["未提交", "验收审核中", "验收通过", "验收需调整", "验收不通过"], status.acceptance || "未提交")}</select></label>
      <label class="form-field"><span>奖励状态</span><select name="reward">${selectOptions(["未开始", "启动支持待发放", "启动支持已发放", "完成支持待发放", "完成支持已发放"], status.reward || "未开始")}</select></label>
      <label class="form-field"><span>作品墙</span><select name="showcase">${selectOptions(["待上墙", "候选项目", "已上墙", "暂不展示"], status.showcase || "待上墙")}</select></label>
      <label class="form-field admin-detail-wide"><span>备注</span><textarea name="notes" rows="4">${escapeHtml(status.notes || "")}</textarea></label>
      <div class="admin-form-actions">
        <button class="button primary" type="submit">保存状态</button>
        <a class="button secondary" href="progress.html">打开进度页</a>
      </div>
      <div class="progress-alert" id="admin-detail-message" hidden></div>
    </form>
  `;
  $("#admin-status-form").addEventListener("submit", (event) => saveStatus(event, item.id));
  $("#admin-ai-form").addEventListener("submit", (event) => runAiReview(event, item.id));
  $$(".admin-transition-action", $("#admin-detail")).forEach((button) => {
    button.addEventListener("click", () => transitionRegistration(item.id, button.dataset.transition));
  });
  $("#admin-detail").querySelector("[data-action='delete']").addEventListener("click", () => deleteRegistration(item.id));
}

async function saveStatus(event, id) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());
  const message = $("#admin-detail-message");
  message.hidden = false;
  message.className = "progress-alert";
  message.textContent = "正在保存...";
  try {
    await api(`/api/registrations/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    message.className = "progress-alert progress-alert--ok";
    message.textContent = "状态已保存。";
    await loadRegistrations(false);
    await selectRegistration(id);
  } catch (error) {
    message.className = "progress-alert progress-alert--error";
    message.textContent = error.message;
  }
}

async function runAiReview(event, id) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = $("#admin-ai-message");
  message.hidden = false;
  message.className = "progress-alert";
  message.textContent = "正在生成 AI 审核建议...";
  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const result = await api(`/api/registrations/${encodeURIComponent(id)}/ai-review`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    message.className = "progress-alert progress-alert--ok";
    message.textContent = `已生成建议：${result.review.summary}`;
    await loadRegistrations(false);
    await selectRegistration(id);
  } catch (error) {
    message.className = "progress-alert progress-alert--error";
    message.textContent = error.message;
  }
}

async function transitionRegistration(id, action) {
  if (!action) return;
  const button = $$("[data-transition]").find((item) => item.dataset.transition === action);
  const label = button?.querySelector("strong")?.textContent || "流程流转";
  if (!window.confirm(`确认执行「${label}」？\n\n该操作会更新选手进度页，并写入后台流转记录。`)) return;
  const message = $("#admin-transition-message");
  message.hidden = false;
  message.className = "progress-alert";
  message.textContent = "正在更新流程状态...";
  $$(".admin-transition-action").forEach((item) => {
    item.disabled = true;
  });
  try {
    const payload = {
      action,
      note: $("#admin-transition-note")?.value || "",
      notify: $("#admin-transition-notify")?.checked ?? true,
    };
    const result = await api(`/api/registrations/${encodeURIComponent(id)}/transition`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const notification = result.notification;
    message.className = notification?.status === "failed" ? "progress-alert progress-alert--error" : "progress-alert progress-alert--ok";
    message.textContent = notification
      ? `流程已更新，通知状态：${notification.status}${notification.error ? `（${notification.error}）` : ""}`
      : "流程已更新。本次未创建邮件通知。";
    await loadRegistrations(false);
    await selectRegistration(id);
  } catch (error) {
    message.className = "progress-alert progress-alert--error";
    message.textContent = error.message;
  } finally {
    $$(".admin-transition-action").forEach((item) => {
      item.disabled = false;
    });
  }
}

async function advanceRegistration(event, id) {
  event.preventDefault();
  const form = event.currentTarget;
  const message = $("#admin-advance-message");
  message.hidden = false;
  message.className = "progress-alert";
  message.textContent = "正在推进流程并创建通知...";
  try {
    const payload = Object.fromEntries(new FormData(form).entries());
    const result = await api(`/api/registrations/${encodeURIComponent(id)}/advance`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const notification = result.notification;
    message.className = notification?.status === "failed" ? "progress-alert progress-alert--error" : "progress-alert progress-alert--ok";
    message.textContent = notification
      ? `流程已更新，邮件状态：${notification.status}${notification.error ? `（${notification.error}）` : ""}`
      : "流程已更新，但该选手没有邮箱，未发送通知。";
    await loadRegistrations(false);
    await selectRegistration(id);
  } catch (error) {
    message.className = "progress-alert progress-alert--error";
    message.textContent = error.message;
  }
}

async function sendCustomNotice(id) {
  const form = $("#admin-advance-form");
  const message = $("#admin-advance-message");
  const payload = Object.fromEntries(new FormData(form).entries());
  message.hidden = false;
  message.className = "progress-alert";
  message.textContent = "正在创建邮件通知...";
  try {
    const result = await api(`/api/registrations/${encodeURIComponent(id)}/notify`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    message.className = result.notification.status === "failed" ? "progress-alert progress-alert--error" : "progress-alert progress-alert--ok";
    message.textContent = `通知状态：${result.notification.status}${result.notification.error ? `（${result.notification.error}）` : ""}`;
    await selectRegistration(id);
  } catch (error) {
    message.className = "progress-alert progress-alert--error";
    message.textContent = error.message;
  }
}

async function deleteRegistration(id) {
  if (!window.confirm(`确认归档报名记录 #${id}？\n\n归档不会从数据库中彻底删除，系统会先生成备份，再把该记录标记为已归档。`)) return;
  await api(`/api/registrations/${encodeURIComponent(id)}`, { method: "DELETE" });
  selectedId = null;
  $("#admin-detail").innerHTML = `<div class="progress-alert">记录已归档，数据仍保留在数据库和自动备份中。</div>`;
  await loadRegistrations(false);
}

function exportCsv() {
  const rows = filteredRegistrations();
  const headers = ["ID", "报名来源", "记录状态", "姓名", "邮箱", "学校", "GitHub账号", "GitHub仓库", "项目名称", "项目方向", "项目简介", "材料状态", "敏感信息状态", "仓库检查", "申报状态", "验收状态", "奖励状态", "作品墙状态", "创建时间", "更新时间", "归档时间"];
  const lines = [
    headers.map(csvEscape).join(","),
    ...rows.map((item) => {
      const repoCheck = repoCheckSummary(item);
      return [
        item.id,
        sourceLabel(item.source),
        item.archived ? "已归档" : "正常",
        item.name,
        item.email,
        item.school,
        item.githubLogin,
        item.githubRepo,
        item.projectName,
        item.projectType,
        item.summary,
        materialSummary(item),
        sensitiveSummary(item),
        `${repoCheck.title}；${repoCheck.body}`,
        item.status?.proposal,
        item.status?.acceptance,
        item.status?.reward,
        item.status?.showcase,
        item.createdAt,
        item.updatedAt,
        item.archivedAt,
      ].map(csvEscape).join(",");
    }),
  ];
  downloadText(`mgpic2026-registrations-${Date.now()}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
}

async function runToolbarSync(action, label, path, summary) {
  const button = $(`[data-action='${action}']`);
  const originalText = button?.textContent || label;
  if (button) {
    button.disabled = true;
    button.textContent = `${label}中...`;
  }
  try {
    const result = await api(path, { method: "POST", body: JSON.stringify({}) });
    await loadRegistrations(false);
    window.alert(summary(result));
  } catch (error) {
    window.alert(`${label}失败：${error.message}`);
  } finally {
    const nextButton = $(`[data-action='${action}']`);
    if (nextButton) {
      nextButton.disabled = false;
      nextButton.textContent = originalText;
    }
  }
}

function syncFeishuToBackend() {
  runToolbarSync(
    "sync-feishu-in",
    "飞书同步到后台",
    "/api/feishu/sync-in",
    (result) => `飞书同步完成：读取 ${result.count || 0} 条，写入/更新后台 ${result.upserted || 0} 条。`
  );
}

function syncBackendToFeishu() {
  if (!window.confirm("确认把后台官网报名数据写入飞书报名表？系统会按邮箱或 GitHub 仓库匹配已有飞书记录，匹配不到时会新增。")) return;
  runToolbarSync(
    "sync-feishu-out",
    "官网报名写入飞书",
    "/api/feishu/sync-out",
    (result) => `官网报名已同步到飞书：新增 ${result.created || 0} 条，更新 ${result.updated || 0} 条，跳过 ${result.skipped || 0} 条。`
  );
}

async function loadStorageInfo() {
  storageInfo = await api("/api/admin/storage");
  renderStorage();
}

async function createBackup() {
  const button = $("#admin-storage-panel")?.querySelector("[data-action='create-backup']");
  if (button) {
    button.disabled = true;
    button.textContent = "正在生成备份...";
  }
  try {
    const result = await api("/api/admin/backup", { method: "POST", body: JSON.stringify({}) });
    storageInfo = {
      ...(storageInfo || {}),
      backups: result.backups || [result.backup].filter(Boolean),
    };
    await loadStorageInfo();
  } catch (error) {
    window.alert(`生成备份失败：${error.message}`);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "立即生成备份";
    }
  }
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsText(file, "utf-8");
  });
}

function pickJsonFile() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json,.json";
    input.addEventListener("change", () => resolve(input.files?.[0] || null), { once: true });
    input.click();
  });
}

async function restoreFromJsonFile() {
  const file = await pickJsonFile();
  if (!file) return;
  if (!window.confirm("恢复会用 JSON 里的数据覆盖当前后台数据库。继续前请确认已导出当前数据备份。")) return;
  try {
    const text = await readFileAsText(file);
    const payload = JSON.parse(text);
    const result = await api("/api/admin/restore", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    window.alert(`恢复完成：${result.before} 条 -> ${result.after} 条。`);
    await loadRegistrations();
  } catch (error) {
    window.alert(`恢复失败：${error.message}`);
  }
}

async function loadRegistrations(showLoading = true) {
  if (showLoading) $("#admin-app").innerHTML = `<div class="progress-alert">正在连接后台数据库...</div>`;
  try {
    const health = await api("/api/health");
    await syncAdminSession();
    if (showLoading) renderShell();
    const data = await api("/api/registrations");
    registrations = data.registrations || [];
    await loadStorageInfo();
    renderStats();
    renderList();
    if (!registrations.length) {
      $("#admin-detail").innerHTML = `<div class="progress-alert">数据库已连接：${escapeHtml(health.database)}。暂无报名记录，可以从“新建报名”或飞书导入开始。</div>`;
    }
  } catch (error) {
    renderDisconnected(error);
  }
}

loadRegistrations();
