const $ = (selector, root = document) => root.querySelector(selector);
const API_BASE_KEY = "mgpic2026.apiBase";
const ADMIN_TOKEN_KEY = "mgpic2026.adminToken";
const DEFAULT_RENDER_API_BASE = "https://mgpic2026.onrender.com";

let registrations = [];
let selectedId = null;
let apiBase = readApiBase();
let adminToken = readAdminToken();
let adminSession = null;

const STAGE_FILTERS = [
  ["all", "全部记录"],
  ["proposal", "申报审核中"],
  ["development", "项目开发中"],
  ["acceptance", "验收审核中"],
  ["accepted", "验收通过"],
  ["showcase", "作品墙"],
  ["needs_action", "需要处理"],
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
    credentials: "same-origin",
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
    const matchesStage = stage === "all" || registrationStage(item) === stage || (stage === "needs_action" && needsAction(item));
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
  const warn = /调整|拒绝|不通过|驳回/.test(text);
  const wait = /待发放|审核中|待上墙|未提交|未开始/.test(text);
  const klass = done ? "admin-badge admin-badge--ok" : warn ? "admin-badge admin-badge--warn" : wait ? "admin-badge admin-badge--wait" : "admin-badge";
  return `<span class="${klass}">${escapeHtml(text)}</span>`;
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
      <div class="admin-toolbar-actions">
        <a class="button secondary" href="${escapeHtml(adminOAuthStartUrl())}">GitHub 管理员登录</a>
        ${adminSession?.user ? `<button class="button secondary" type="button" data-action="logout-github">退出 GitHub 登录</button>` : ""}
        <button class="button secondary" type="button" data-action="refresh">刷新数据</button>
        <button class="button secondary" type="button" data-action="set-admin-token">管理员 Token</button>
        <button class="button secondary" type="button" data-action="export-csv">导出 CSV</button>
        <a class="button secondary" href="https://bxup9uklfcb.feishu.cn/share/base/form/shrcn2duseEVtk3e4sTRA8z5Qyf" target="_blank" rel="noreferrer">飞书报名表</a>
        <a class="button secondary" href="progress.html#progress-plans">导入飞书表</a>
        <button class="button primary" type="button" data-action="open-register">新增报名</button>
      </div>
    </div>
    <div class="admin-stats" id="admin-stats"></div>
    <div class="admin-workflow-board" id="admin-workflow-board"></div>
    <div class="admin-layout">
      <section class="admin-card">
        <div class="admin-card-head">
          <h2>报名数据</h2>
          <span id="admin-count">0 条</span>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>项目与仓库</th>
                <th>选手</th>
                <th>当前阶段</th>
                <th>奖励 / 作品墙</th>
                <th>更新时间</th>
              </tr>
            </thead>
            <tbody id="admin-table-body"></tbody>
          </table>
        </div>
      </section>
      <section class="admin-card" id="admin-detail">
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
  $("#admin-stats").innerHTML = `
    <div><span>报名总数</span><strong>${total}</strong></div>
    <div><span>申报待审</span><strong>${proposalPending}</strong></div>
    <div><span>申报通过</span><strong>${proposalPassed}</strong></div>
    <div><span>验收待审</span><strong>${acceptancePending}</strong></div>
    <div><span>验收通过</span><strong>${accepted}</strong></div>
    <div><span>需处理</span><strong>${actionRequired}</strong></div>
    <div><span>已上作品墙</span><strong>${showcased}</strong></div>
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

function renderList() {
  const rows = filteredRegistrations();
  $("#admin-count").textContent = `${rows.length} 条`;
  $("#admin-table-body").innerHTML = rows.map((item) => `
    <tr data-id="${item.id}" class="${Number(item.id) === Number(selectedId) ? "is-selected" : ""}">
      <td>#${item.id}</td>
      <td>
        <strong>${escapeHtml(item.projectName || "未命名项目")}</strong>
        <span>${escapeHtml(item.projectType || "未填写方向")}</span>
        <span>${escapeHtml(item.githubRepo || "未填写仓库")}</span>
      </td>
      <td>
        <strong>${escapeHtml(item.name || "未填写")}</strong>
        <span>${escapeHtml(item.school || "学校未填")} / ${escapeHtml(item.email || "邮箱未填")}</span>
      </td>
      <td>
        ${statusBadge(stageLabel(item))}
        <span>${escapeHtml(item.status?.proposal || "申报审核中")} / ${escapeHtml(item.status?.acceptance || "未提交")}</span>
      </td>
      <td>
        ${statusBadge(item.status?.reward)}
        <span>${escapeHtml(item.status?.showcase || "待上墙")}</span>
      </td>
      <td>${formatTime(item.updatedAt)}</td>
    </tr>
  `).join("") || `<tr><td colspan="6">暂无报名记录。</td></tr>`;

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
      <button class="button secondary" type="button" data-action="delete">删除</button>
    </div>
    ${workflowStrip(status)}
    <div class="admin-detail-grid">
      <div><span>姓名</span><strong>${escapeHtml(item.name || "-")}</strong></div>
      <div><span>邮箱</span><strong>${escapeHtml(item.email || "-")}</strong></div>
      <div><span>学校 / 组织</span><strong>${escapeHtml(item.school || "-")}</strong></div>
      <div><span>GitHub 用户名</span><strong>${escapeHtml(item.githubLogin || "-")}</strong></div>
      <div><span>项目方向</span><strong>${escapeHtml(item.projectType || "-")}</strong></div>
      <div><span>报名来源</span><strong>${escapeHtml(item.source || "-")}</strong></div>
      <div><span>身份证号</span><strong>${escapeHtml(item.idNumber || item.idNumberMasked || "-")}</strong></div>
      <div><span>银行卡号</span><strong>${escapeHtml(item.bankAccount || item.bankAccountMasked || "-")}</strong></div>
      <div class="admin-detail-wide"><span>开户支行</span><strong>${escapeHtml(item.bankBranch || "-")}</strong></div>
      <div class="admin-detail-wide"><span>GitHub 仓库</span><strong>${item.githubRepo ? `<a href="${escapeHtml(item.githubRepo)}" target="_blank" rel="noreferrer">${escapeHtml(item.githubRepo)}</a>` : "-"}</strong></div>
      <div class="admin-detail-wide"><span>项目简介</span><p>${escapeHtml(item.summary || "未填写")}</p></div>
    </div>
    <div class="progress-alert">
      敏感信息仅用于奖金发放和必要身份核验。对外导出或转交前请确认最小必要范围，不要放到公开进度页或作品墙。
    </div>
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
    <div class="admin-ai-panel">
      <div class="admin-panel-head">
        <div>
          <h3>流程推进与邮件通知</h3>
          <p>推进会同步更新选手进度页，并尝试通过邮件通知选手；SMTP 未配置时会保留待发送记录。</p>
        </div>
      </div>
      <form class="admin-status-form" id="admin-advance-form">
        <label class="form-field"><span>推进阶段</span><select name="mode">
          <option value="proposal">申报通过，进入项目开发</option>
          <option value="acceptance">验收通过，进入优秀项目评选</option>
          <option value="showcase">入选作品墙展示</option>
        </select></label>
        <label class="form-field"><span>邮件标题（可留空）</span><input name="subject" placeholder="默认使用 AI 建议标题"></label>
        <label class="form-field admin-detail-wide"><span>邮件正文（可留空）</span><textarea name="body" rows="5" placeholder="默认使用 AI 建议正文"></textarea></label>
        <div class="admin-form-actions">
          <button class="button primary" type="submit">进入下一流程并通知</button>
          <button class="button secondary" type="button" data-action="send-custom-notice">仅发送邮件通知</button>
        </div>
        <div class="progress-alert" id="admin-advance-message" hidden></div>
      </form>
      <div class="admin-notification-list">${notificationList(data.notifications)}</div>
    </div>
  `;
  $("#admin-status-form").addEventListener("submit", (event) => saveStatus(event, item.id));
  $("#admin-ai-form").addEventListener("submit", (event) => runAiReview(event, item.id));
  $("#admin-advance-form").addEventListener("submit", (event) => advanceRegistration(event, item.id));
  $("#admin-detail").querySelector("[data-action='send-custom-notice']").addEventListener("click", () => sendCustomNotice(item.id));
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
  if (!window.confirm(`确认删除报名记录 #${id}？`)) return;
  await api(`/api/registrations/${encodeURIComponent(id)}`, { method: "DELETE" });
  selectedId = null;
  $("#admin-detail").innerHTML = `<div class="progress-alert">记录已删除。</div>`;
  await loadRegistrations(false);
}

function exportCsv() {
  const rows = filteredRegistrations();
  const headers = ["ID", "姓名", "邮箱", "学校", "GitHub账号", "GitHub仓库", "项目名称", "项目方向", "申报状态", "验收状态", "奖励状态", "作品墙状态", "更新时间"];
  const lines = [
    headers.map(csvEscape).join(","),
    ...rows.map((item) => [
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
      item.updatedAt,
    ].map(csvEscape).join(",")),
  ];
  downloadText(`mgpic2026-registrations-${Date.now()}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
}

async function loadRegistrations(showLoading = true) {
  if (showLoading) $("#admin-app").innerHTML = `<div class="progress-alert">正在连接后台数据库...</div>`;
  try {
    const health = await api("/api/health");
    await syncAdminSession();
    if (showLoading) renderShell();
    const data = await api("/api/registrations");
    registrations = data.registrations || [];
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
