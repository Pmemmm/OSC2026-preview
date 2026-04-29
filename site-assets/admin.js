const API_BASE = window.MGPIC_API_BASE || "";
const $ = (selector, root = document) => root.querySelector(selector);

let registrations = [];
let selectedId = null;

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;",
}[char]));

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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
  if (!query) return registrations;
  return registrations.filter((item) => [
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
  ].some((value) => normalize(value).includes(query)));
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function statusBadge(value) {
  const text = String(value || "未设置");
  const done = /通过|已发放|已上墙|完成/.test(text);
  const warn = /调整|拒绝|不通过|驳回/.test(text);
  const klass = done ? "admin-badge admin-badge--ok" : warn ? "admin-badge admin-badge--warn" : "admin-badge";
  return `<span class="${klass}">${escapeHtml(text)}</span>`;
}

function renderShell() {
  const app = $("#admin-app");
  app.innerHTML = `
    <div class="admin-toolbar">
      <div class="admin-search-wrap">
        <label class="form-field">
          <span>搜索报名记录</span>
          <input id="admin-search" placeholder="姓名 / 邮箱 / GitHub / 项目名称 / 状态">
        </label>
      </div>
      <div class="admin-toolbar-actions">
        <button class="button secondary" type="button" data-action="refresh">刷新数据</button>
        <button class="button secondary" type="button" data-action="export-csv">导出 CSV</button>
        <a class="button secondary" href="https://bxup9uklfcb.feishu.cn/share/base/form/shrcn2duseEVtk3e4sTRA8z5Qyf" target="_blank" rel="noreferrer">飞书报名表</a>
        <a class="button secondary" href="progress.html#progress-plans">导入飞书表</a>
        <button class="button primary" type="button" data-action="open-register">新增报名</button>
      </div>
    </div>
    <div class="admin-stats" id="admin-stats"></div>
    <div class="admin-layout">
      <section class="admin-card">
        <div class="admin-card-head">
          <h2>报名列表</h2>
          <span id="admin-count">0 条</span>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>项目</th>
                <th>参赛者</th>
                <th>申报</th>
                <th>验收</th>
                <th>更新</th>
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
  app.querySelector("[data-action='refresh']").addEventListener("click", loadRegistrations);
  app.querySelector("[data-action='export-csv']").addEventListener("click", exportCsv);
  app.querySelector("[data-action='open-register']").addEventListener("click", () => {
    window.location.href = "register.html";
  });
}

function renderStats() {
  const total = registrations.length;
  const proposalPassed = registrations.filter((item) => /通过/.test(item.status?.proposal || "")).length;
  const accepted = registrations.filter((item) => /通过/.test(item.status?.acceptance || "")).length;
  const showcased = registrations.filter((item) => /上墙|展示/.test(item.status?.showcase || "")).length;
  $("#admin-stats").innerHTML = `
    <div><span>报名总数</span><strong>${total}</strong></div>
    <div><span>申报通过</span><strong>${proposalPassed}</strong></div>
    <div><span>验收通过</span><strong>${accepted}</strong></div>
    <div><span>已上作品墙</span><strong>${showcased}</strong></div>
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
        <span>${escapeHtml(item.githubRepo || "未填写仓库")}</span>
      </td>
      <td>
        <strong>${escapeHtml(item.name || "未填写")}</strong>
        <span>${escapeHtml(item.email || "-")}</span>
      </td>
      <td>${statusBadge(item.status?.proposal)}</td>
      <td>${statusBadge(item.status?.acceptance)}</td>
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
    const data = await api(`/api/registrations/${encodeURIComponent(id)}?admin=1`);
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
    <a class="admin-file-link" href="${escapeHtml(file.downloadUrl)}" target="_blank" rel="noreferrer">
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
        <span>${escapeHtml(review.engine || "review")} / ${escapeHtml(review.model || "-")} / ${formatTime(review.createdAt)}</span>
      </div>
      <div>${statusBadge(`${review.decision || "needs_revision"} · ${review.score || 0}分`)}</div>
      <p>下一步：${escapeHtml(review.nextStage || "-")}</p>
      <p>理由：${escapeHtml((review.reasons || []).join("；") || "-")}</p>
      <p>缺失项：${escapeHtml((review.missingItems || []).join("；") || "暂无")}</p>
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

function renderDetail(data) {
  const item = data.registration;
  const status = data.status || {};
  $("#admin-detail").innerHTML = `
    <div class="admin-card-head">
      <h2>#${item.id} ${escapeHtml(item.projectName || "未命名项目")}</h2>
      <button class="button secondary" type="button" data-action="delete">删除</button>
    </div>
    <div class="admin-detail-grid">
      <div><span>姓名</span><strong>${escapeHtml(item.name || "-")}</strong></div>
      <div><span>邮箱</span><strong>${escapeHtml(item.email || "-")}</strong></div>
      <div><span>学校 / 组织</span><strong>${escapeHtml(item.school || "-")}</strong></div>
      <div><span>GitHub 用户名</span><strong>${escapeHtml(item.githubLogin || "-")}</strong></div>
      <div><span>身份证号</span><strong>${escapeHtml(item.idNumber || item.idNumberMasked || "-")}</strong></div>
      <div><span>银行卡号</span><strong>${escapeHtml(item.bankAccount || item.bankAccountMasked || "-")}</strong></div>
      <div class="admin-detail-wide"><span>开户支行</span><strong>${escapeHtml(item.bankBranch || "-")}</strong></div>
      <div class="admin-detail-wide"><span>GitHub 仓库</span><strong>${escapeHtml(item.githubRepo || "-")}</strong></div>
      <div class="admin-detail-wide"><span>项目简介</span><p>${escapeHtml(item.summary || "未填写")}</p></div>
    </div>
    <div class="progress-alert">
      敏感信息仅用于奖金发放和必要身份核验。对外导出或转交前请确认最小必要范围，不要放到公开进度页或作品墙。
    </div>
    <div class="admin-files">
      <h3>材料文件</h3>
      ${fileLinks(data.files)}
    </div>
    <div class="admin-ai-panel">
      <div class="admin-panel-head">
        <h3>ChatGPT 审核建议</h3>
        <form class="admin-inline-form" id="admin-ai-form">
          <select name="mode">
            <option value="proposal">申报审核</option>
            <option value="acceptance">验收审核</option>
            <option value="showcase">作品墙评选</option>
          </select>
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
        <h3>流程推进与邮件通知</h3>
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
    if (showLoading) renderShell();
    const data = await api("/api/registrations");
    registrations = data.registrations || [];
    renderStats();
    renderList();
    if (!registrations.length) {
      $("#admin-detail").innerHTML = `<div class="progress-alert">数据库已连接：${escapeHtml(health.database)}。暂无报名记录。</div>`;
    }
  } catch (error) {
    $("#admin-app").innerHTML = `
      <div class="progress-alert progress-alert--error">
        未连接后台数据库。请在本地或服务器运行 <code>python3 server.py</code> 后访问同源后台页面。
      </div>
    `;
  }
}

loadRegistrations();
