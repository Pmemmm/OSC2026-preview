const STORE_KEY = "mgpic2026.registration.v1";
const CHECK_KEY = "mgpic2026.repoCheck.v1";
const FEISHU_KEY = "mgpic2026.feishuStatus.v1";
const FEISHU_ROWS_KEY = "mgpic2026.feishuRows.v1";
const GITHUB_PROFILE_KEY = "mgpic2026.githubProfile.v1";
const START_DATE_ISO = "2026-04-28T16:00:00Z";
const PROPOSAL_FORM_URL = "https://bxup9uklfcb.feishu.cn/share/base/form/shrcn2duseEVtk3e4sTRA8z5Qyf";
const ACCEPTANCE_FORM_URL = "https://bxup9uklfcb.feishu.cn/share/base/form/shrcnlOdTfQUDNW5raWrQDqVTQg";
const API_BASE = window.MGPIC_API_BASE || "";
let progressActionsBound = false;
let backendSyncStarted = false;

const $ = (selector, root = document) => root.querySelector(selector);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;",
}[char]));

const fieldAliases = {
  name: ["姓名", "参赛者", "项目负责人", "负责人", "name"],
  email: ["邮箱", "联系邮箱", "联系方式", "email", "Email"],
  githubLogin: ["GitHub 账号", "Github 账号", "GitHub用户名", "GitHub 用户名", "github", "githubLogin"],
  githubRepo: ["GitHub 仓库", "Github 仓库", "项目 GitHub 链接", "GitHub仓库链接", "仓库链接", "githubRepo", "repo"],
  projectName: ["项目名称", "项目名", "参赛项目", "projectName", "project"],
  proposal: ["申报审核状态", "项目申报状态", "立项状态", "申报状态", "proposal", "proposalStatus"],
  acceptance: ["验收状态", "项目验收状态", "验收审核状态", "acceptance", "acceptanceStatus"],
  reward: ["奖励状态", "激励状态", "奖金状态", "reward", "rewardStatus"],
  showcase: ["作品墙状态", "展示状态", "上墙状态", "showcase", "showcaseStatus"],
};

function loadJson(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const error = new Error(`后台接口 ${response.status}`);
    error.status = response.status;
    try {
      error.payload = await response.json();
      if (error.payload?.error) error.message = error.payload.error;
    } catch {
      // Ignore non-JSON error pages, for example GitHub Pages 404.
    }
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

async function backendHealth() {
  try {
    return await apiRequest("/api/health", { method: "GET" });
  } catch {
    return null;
  }
}

function safeHttpUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function parseRepo(input) {
  const value = (input || "").trim().replace(/\/$/, "");
  if (!value) return null;
  const match = value.match(/github\.com\/([^/\s]+)\/([^/\s#?]+?)(?:\.git)?$/i)
    || value.match(/^([^/\s]+)\/([^/\s#?]+)$/);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, ""),
    url: `https://github.com/${match[1]}/${match[2].replace(/\.git$/i, "")}`,
  };
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeRepo(value) {
  const parsed = parseRepo(value);
  return parsed ? parsed.url.toLowerCase() : normalizeText(value).replace(/\.git$/, "");
}

function normalizedKeys(row) {
  return Object.fromEntries(Object.keys(row || {}).map((key) => [key.replace(/\s+/g, "").toLowerCase(), key]));
}

function fieldToString(value) {
  if (Array.isArray(value)) return value.map(fieldToString).filter(Boolean).join("，");
  if (value && typeof value === "object") {
    return String(value.text || value.name || value.value || value.url || value.link || "").trim();
  }
  return String(value ?? "").trim();
}

function getField(row, key) {
  const source = row?.fields && typeof row.fields === "object" ? { ...row, ...row.fields } : row;
  const aliases = fieldAliases[key] || [key];
  const compact = normalizedKeys(source);
  for (const alias of aliases) {
    if (source?.[alias] !== undefined && fieldToString(source[alias])) return fieldToString(source[alias]);
    const compactKey = compact[String(alias).replace(/\s+/g, "").toLowerCase()];
    if (compactKey && fieldToString(source[compactKey])) return fieldToString(source[compactKey]);
  }
  return "";
}

async function githubJson(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!response.ok) {
    const error = new Error(`GitHub API ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function exists(path) {
  try {
    await githubJson(path);
    return true;
  } catch {
    return false;
  }
}

function hasPath(tree, matcher) {
  return Array.isArray(tree?.tree) && tree.tree.some((item) => matcher(item.path || ""));
}

function buildCheckResult(parsed, repoInfo, commits, tree, readmeExists, workflowExists, licenseExists, packageExists) {
  const commitCount = Array.isArray(commits) ? commits.length : 0;
  const hasTests = hasPath(tree, (path) => /(^|\/)(test|tests|__tests__)(\/|$)/i.test(path) || /_test\.mbt$/i.test(path));
  const hasMoonBitCode = hasPath(tree, (path) => /\.mbt$/i.test(path));
  const checks = [
    { key: "publicRepo", label: "公开仓库", passed: repoInfo.private === false, detail: repoInfo.private ? "仓库不是公开状态" : "GitHub 仓库公开可访问" },
    { key: "commits", label: "有效 commits", passed: commitCount >= 10, detail: `4 月 29 日后检测到 ${commitCount >= 100 ? "100+" : commitCount} 个公开 commits` },
    { key: "readme", label: "README", passed: readmeExists, detail: readmeExists ? "已检测到 README" : "未检测到 README" },
    { key: "ci", label: "CI", passed: workflowExists, detail: workflowExists ? "已检测到 .github/workflows" : "未检测到 CI workflow" },
    { key: "tests", label: "测试", passed: hasTests, detail: hasTests ? "已检测到测试目录或 _test.mbt" : "未检测到测试目录或 _test.mbt" },
    { key: "license", label: "许可证", passed: Boolean(repoInfo.license || licenseExists), detail: repoInfo.license?.spdx_id || (licenseExists ? "已检测到 LICENSE" : "未检测到 LICENSE") },
    { key: "moonbit", label: "MoonBit 代码", passed: hasMoonBitCode, detail: hasMoonBitCode ? "已检测到 .mbt 源码" : "未检测到 .mbt 源码" },
    { key: "package", label: "包配置", passed: packageExists, detail: packageExists ? "已检测到 moon.mod.json 或 moon.pkg.json" : "未检测到 MoonBit 包配置" },
  ];
  return {
    owner: parsed.owner,
    repo: parsed.repo,
    repoUrl: parsed.url,
    defaultBranch: repoInfo.default_branch,
    checkedAt: new Date().toISOString(),
    commitCount,
    checks,
  };
}

async function checkRepository(repoInput) {
  const parsed = parseRepo(repoInput);
  if (!parsed) throw new Error("请输入 GitHub 仓库地址，例如 https://github.com/owner/project");
  const repoInfo = await githubJson(`/repos/${parsed.owner}/${parsed.repo}`);
  const commits = await githubJson(`/repos/${parsed.owner}/${parsed.repo}/commits?since=${encodeURIComponent(START_DATE_ISO)}&per_page=100`);
  const tree = await githubJson(`/repos/${parsed.owner}/${parsed.repo}/git/trees/${repoInfo.default_branch}?recursive=1`);
  const readmeExists = await exists(`/repos/${parsed.owner}/${parsed.repo}/readme`);
  const workflowExists = await exists(`/repos/${parsed.owner}/${parsed.repo}/contents/.github/workflows?ref=${repoInfo.default_branch}`);
  const licenseExists = await exists(`/repos/${parsed.owner}/${parsed.repo}/contents/LICENSE?ref=${repoInfo.default_branch}`)
    || await exists(`/repos/${parsed.owner}/${parsed.repo}/contents/LICENSE.md?ref=${repoInfo.default_branch}`);
  const packageExists = await exists(`/repos/${parsed.owner}/${parsed.repo}/contents/moon.mod.json?ref=${repoInfo.default_branch}`)
    || await exists(`/repos/${parsed.owner}/${parsed.repo}/contents/moon.pkg.json?ref=${repoInfo.default_branch}`)
    || await exists(`/repos/${parsed.owner}/${parsed.repo}/contents/moon.pkg?ref=${repoInfo.default_branch}`);
  return buildCheckResult(parsed, repoInfo, commits, tree, readmeExists, workflowExists, licenseExists, packageExists);
}

async function connectGitHubProfile(input) {
  const login = String(input || "").trim().replace(/^@/, "");
  if (!login) return null;
  const profile = await githubJson(`/users/${encodeURIComponent(login)}`);
  const value = {
    login: profile.login,
    name: profile.name || "",
    avatarUrl: profile.avatar_url || "",
    htmlUrl: profile.html_url || "",
    type: profile.type || "",
    connectedAt: new Date().toISOString(),
  };
  saveJson(GITHUB_PROFILE_KEY, value);
  return value;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const input = String(text || "").replace(/^\uFEFF/, "");
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];
    if (char === "\"" && quoted && next === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((item) => String(item).trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some((item) => String(item).trim())) rows.push(row);
  if (rows.length < 2) return [];
  const headers = rows[0].map((item) => String(item).trim());
  return rows.slice(1).map((items) => Object.fromEntries(headers.map((header, index) => [header, String(items[index] || "").trim()])));
}

function parseDataset(text) {
  const value = String(text || "").trim();
  if (!value) return [];
  if (value.startsWith("[") || value.startsWith("{")) {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.records)) return parsed.records;
    if (Array.isArray(parsed.items)) return parsed.items;
    if (Array.isArray(parsed.data)) return parsed.data;
    if (Array.isArray(parsed.data?.records)) return parsed.data.records;
    if (Array.isArray(parsed.data?.items)) return parsed.data.items;
    return [];
  }
  return parseCsv(value);
}

function compactRecord(row) {
  return {
    name: getField(row, "name"),
    email: getField(row, "email"),
    githubLogin: getField(row, "githubLogin"),
    githubRepo: getField(row, "githubRepo"),
    projectName: getField(row, "projectName"),
    proposal: getField(row, "proposal"),
    acceptance: getField(row, "acceptance"),
    reward: getField(row, "reward"),
    showcase: getField(row, "showcase"),
  };
}

function getRegistration() {
  return loadJson(STORE_KEY, {});
}

function getCheck() {
  return loadJson(CHECK_KEY, null);
}

function getGitHubProfile() {
  return loadJson(GITHUB_PROFILE_KEY, null);
}

function getFeishuRows() {
  return loadJson(FEISHU_ROWS_KEY, []);
}

function getFeishuState() {
  return loadJson(FEISHU_KEY, {
    proposal: "待同步",
    acceptance: "未提交",
    reward: "未开始",
    showcase: "待上墙",
    source: "none",
  });
}

function saveRegistrationFromForm(form) {
  const formData = new FormData(form);
  const previous = getRegistration();
  const value = {
    ...previous,
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    school: String(formData.get("school") || "").trim(),
    githubLogin: String(formData.get("githubLogin") || "").trim(),
    githubRepo: String(formData.get("githubRepo") || "").trim(),
    projectName: String(formData.get("projectName") || "").trim(),
    projectType: String(formData.get("projectType") || "").trim(),
    summary: String(formData.get("summary") || "").trim(),
    proposalFileName: form.elements.proposalFile?.files?.[0]?.name || previous.proposalFileName || "",
    studentFileName: form.elements.studentFile?.files?.[0]?.name || previous.studentFileName || "",
    updatedAt: new Date().toISOString(),
  };
  saveJson(STORE_KEY, value);
  applyFeishuMatch(getFeishuRows());
  return value;
}

function backendPayload(value) {
  return {
    name: value.name || "",
    email: value.email || "",
    school: value.school || "",
    githubLogin: value.githubLogin || "",
    githubRepo: value.githubRepo || "",
    projectName: value.projectName || "",
    projectType: value.projectType || "",
    summary: value.summary || "",
    proposalFileName: value.proposalFileName || "",
    studentFileName: value.studentFileName || "",
  };
}

async function saveRegistrationToBackend(value) {
  const previous = getRegistration();
  const serverId = value.serverId || previous.serverId;
  const path = serverId ? `/api/registrations/${encodeURIComponent(serverId)}` : "/api/registrations";
  const method = serverId ? "PUT" : "POST";
  try {
    const result = await apiRequest(path, {
      method,
      body: JSON.stringify(backendPayload(value)),
    });
    const saved = {
      ...value,
      serverId: result.registration.id,
      backendMode: "sqlite",
      backendSavedAt: result.registration.updatedAt || result.registration.createdAt || new Date().toISOString(),
    };
    saveJson(STORE_KEY, saved);
    return { mode: "backend", registration: saved };
  } catch (error) {
    const saved = {
      ...value,
      backendMode: "local",
      backendError: error.message,
    };
    saveJson(STORE_KEY, saved);
    return { mode: "local", registration: saved, error };
  }
}

async function syncRegistrationFromBackend() {
  const current = getRegistration();
  if (!current.serverId || backendSyncStarted) return;
  backendSyncStarted = true;
  try {
    const result = await apiRequest(`/api/registrations/${encodeURIComponent(current.serverId)}`);
    saveJson(STORE_KEY, {
      ...current,
      ...result.registration,
      serverId: result.registration.id,
      backendMode: "sqlite",
      backendSavedAt: result.registration.updatedAt,
    });
    if (result.status) saveJson(FEISHU_KEY, { ...getFeishuState(), ...result.status, source: "backend" });
    if (result.repoCheck) saveJson(CHECK_KEY, result.repoCheck);
    renderProgressDashboard();
    renderPlanPanels(true);
  } catch {
    // The public GitHub Pages preview has no backend; keep the local copy usable.
  }
}

async function saveRepoCheckToBackend(result) {
  const registration = getRegistration();
  if (!registration.serverId) return;
  try {
    await apiRequest(`/api/registrations/${encodeURIComponent(registration.serverId)}/repo-check`, {
      method: "POST",
      body: JSON.stringify(result),
    });
  } catch {
    // Keep GitHub Pages preview functional without a backend.
  }
}

async function saveStatusToBackend(state) {
  const registration = getRegistration();
  if (!registration.serverId) return null;
  try {
    return await apiRequest(`/api/registrations/${encodeURIComponent(registration.serverId)}/status`, {
      method: "PATCH",
      body: JSON.stringify(state),
    });
  } catch {
    return null;
  }
}

function matchFeishuRecord(rows) {
  const registration = getRegistration();
  const check = getCheck();
  const profile = getGitHubProfile();
  const email = normalizeText(registration.email);
  const repo = normalizeRepo(registration.githubRepo || check?.repoUrl);
  const login = normalizeText(registration.githubLogin || profile?.login || check?.owner);
  const project = normalizeText(registration.projectName || check?.repo);
  const records = rows.map((row) => ({ raw: row, compact: compactRecord(row) }));

  const matchers = [
    { field: "邮箱", test: (item) => email && normalizeText(item.compact.email) === email },
    { field: "GitHub 仓库", test: (item) => repo && normalizeRepo(item.compact.githubRepo) === repo },
    { field: "GitHub 账号", test: (item) => login && normalizeText(item.compact.githubLogin).replace(/^@/, "") === login },
    { field: "项目名称", test: (item) => project && normalizeText(item.compact.projectName) === project },
  ];
  for (const matcher of matchers) {
    const found = records.find(matcher.test);
    if (found) return { record: found.compact, matchField: matcher.field };
  }
  return { record: null, matchField: "" };
}

function applyFeishuMatch(rows) {
  const dataRows = Array.isArray(rows) ? rows : [];
  const { record, matchField } = matchFeishuRecord(dataRows);
  if (!dataRows.length) {
    saveJson(FEISHU_KEY, {
      proposal: "待同步",
      acceptance: "未提交",
      reward: "未开始",
      showcase: "待上墙",
      source: "none",
    });
    return null;
  }
  if (!record) {
    saveJson(FEISHU_KEY, {
      proposal: "已导入，未匹配",
      acceptance: "未匹配",
      reward: "未匹配",
      showcase: "未匹配",
      source: "feishu-import",
      rowCount: dataRows.length,
      matchedAt: new Date().toISOString(),
    });
    return null;
  }
  const state = {
    proposal: record.proposal || "申报状态未填写",
    acceptance: record.acceptance || "验收未提交",
    reward: record.reward || "奖励未开始",
    showcase: record.showcase || "待上墙",
    source: "feishu-import",
    rowCount: dataRows.length,
    matchField,
    record,
    matchedAt: new Date().toISOString(),
  };
  saveJson(FEISHU_KEY, state);
  return state;
}

function statusDone(value) {
  return /通过|完成|已发放|已上墙|展示中|done|pass/i.test(String(value || ""));
}

function inferStage(registration, check, feishu) {
  const passed = check?.checks?.filter((item) => item.passed).length || 0;
  const total = check?.checks?.length || 8;
  const hasRegistration = Boolean(registration.projectName || registration.githubRepo);
  if (statusDone(feishu.acceptance)) return { stage: "已通过验收", next: "等待评选与作品展示" };
  if (statusDone(feishu.proposal) && passed >= Math.max(6, total - 1)) return { stage: "可提交验收", next: "提交验收申请" };
  if (statusDone(feishu.proposal)) return { stage: "项目开发中", next: "补齐仓库检查项" };
  if (/拒绝|不通过|需调整|驳回/i.test(String(feishu.proposal || ""))) return { stage: "申报需调整", next: "修改申报材料后重交" };
  if (hasRegistration) return { stage: "申报审核中", next: "等待审核或补齐仓库" };
  return { stage: "等待项目信息", next: "填写报名信息" };
}

function statusClass(passed) {
  return passed ? "progress-check-card progress-check-card--pass" : "progress-check-card progress-check-card--fail";
}

function humanTime(iso) {
  if (!iso) return "尚未检查";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "尚未检查";
  }
}

function renderAvatar(profile) {
  const avatarUrl = safeHttpUrl(profile?.avatarUrl);
  if (avatarUrl) return `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(profile.login || "GitHub")}">`;
  return escapeHtml((profile?.login || "GH").slice(0, 2).toUpperCase());
}

function renderProgressDashboard() {
  const dashboard = $(".progress-dashboard--preview");
  if (!dashboard) return;

  const registration = getRegistration();
  const check = getCheck();
  const profile = getGitHubProfile();
  const feishu = getFeishuState();
  const parsedRepo = parseRepo(registration.githubRepo || check?.repoUrl);
  const repoUrl = parsedRepo?.url || "";
  const passed = check?.checks?.filter((item) => item.passed).length || 0;
  const total = check?.checks?.length || 8;
  const hasRegistration = Boolean(registration.projectName || registration.githubRepo);
  const hasFeishuMatch = Boolean(feishu.record);
  const { stage, next } = inferStage(registration, check, feishu);
  const percent = Math.max(12, Math.round(((profile ? 1 : 0) + (hasRegistration ? 1 : 0) + (hasFeishuMatch ? 1 : 0) + passed) / (total + 3) * 100));
  const checks = check?.checks || [
    { label: "公开仓库", passed: false, detail: "等待检查" },
    { label: "有效 commits", passed: false, detail: "等待检查" },
    { label: "README", passed: false, detail: "等待检查" },
    { label: "CI", passed: false, detail: "等待检查" },
    { label: "测试", passed: false, detail: "等待检查" },
    { label: "许可证", passed: false, detail: "等待检查" },
    { label: "MoonBit 代码", passed: false, detail: "等待检查" },
    { label: "包配置", passed: false, detail: "等待检查" },
  ];
  const title = registration.projectName || check?.repo || profile?.login || "比赛进度看板";
  const repoLine = repoUrl
    ? `<a href="${escapeHtml(repoUrl)}" target="_blank" rel="noreferrer">${escapeHtml(repoUrl)}</a>`
    : "填写 GitHub 仓库后可检查公开开发进度。";
  const backendLabel = registration.backendMode === "sqlite" ? "SQLite 已保存" : "本地预览";
  const backendDetail = registration.backendMode === "sqlite"
    ? `数据库记录 #${escapeHtml(registration.serverId)}，可用于后台审核。`
    : "当前公网 GitHub Pages 无后端，会先保存到浏览器。";

  dashboard.innerHTML = `
    <div class="progress-user-row">
      <div class="progress-avatar">${renderAvatar(profile)}</div>
      <div>
        <strong>${escapeHtml(title)}</strong>
        <p>${repoLine}</p>
      </div>
      <span class="toolbar-btn progress-logout">${check ? `已检查 ${humanTime(check.checkedAt)}` : "待检查"}</span>
    </div>
    <div class="progress-meter"><div class="progress-meter-fill" style="width:${percent}%"></div></div>
    <div class="progress-summary-grid">
      <div class="progress-summary-item"><span>当前阶段</span><strong>${escapeHtml(stage)}</strong></div>
      <div class="progress-summary-item"><span>仓库检查</span><strong>${passed} / ${total}</strong></div>
      <div class="progress-summary-item"><span>下一步</span><strong>${escapeHtml(next)}</strong></div>
    </div>
    <div class="progress-data-source-grid">
      <div class="progress-source-card"><span>GitHub 账号</span><strong>${profile ? `@${escapeHtml(profile.login)}` : "未连接"}</strong><p>${profile ? "已读取公开资料，不涉及私有仓库权限。" : "输入 GitHub 用户名后可连接公开资料。"}</p></div>
      <div class="progress-source-card"><span>后台数据库</span><strong>${backendLabel}</strong><p>${backendDetail}</p></div>
      <div class="progress-source-card"><span>飞书报名数据</span><strong>${hasFeishuMatch ? "已匹配" : escapeHtml(feishu.proposal)}</strong><p>${hasFeishuMatch ? `通过${escapeHtml(feishu.matchField)}匹配，状态来自导入数据。` : "可导入飞书表 CSV/JSON 后自动匹配。"}</p></div>
      <div class="progress-source-card"><span>自建报名系统</span><strong>${hasRegistration ? "本地已保存" : "未填写"}</strong><p>${escapeHtml(registration.email || "当前原型保存到浏览器 localStorage。")}</p></div>
      <div class="progress-source-card"><span>作品墙状态</span><strong>${escapeHtml(feishu.showcase)}</strong><p>通过验收或表现突出的项目可进入展示墙。</p></div>
    </div>
    <div class="progress-check-grid">
      ${checks.map((item) => `
        <div class="${statusClass(item.passed)}">
          <span>${item.passed ? "通过" : "待补"}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      `).join("")}
    </div>
    <div class="progress-dashboard-actions">
      <button class="button primary" type="button" data-action="recheck-repo">${repoUrl ? "重新检查仓库" : "填写仓库后检查"}</button>
      <a class="button secondary" href="register.html">填写自建报名</a>
      <a class="button secondary" href="${ACCEPTANCE_FORM_URL}">提交验收</a>
    </div>
  `;
}

function statusOptions(current, values) {
  const allValues = current && !values.includes(current) ? [current, ...values] : values;
  return allValues.map((value) => `<option value="${escapeHtml(value)}" ${current === value ? "selected" : ""}>${escapeHtml(value)}</option>`).join("");
}

function sampleFeishuCsv() {
  const registration = getRegistration();
  const check = getCheck();
  const profile = getGitHubProfile();
  return [
    "姓名,邮箱,GitHub 账号,GitHub 仓库,项目名称,申报审核状态,验收状态,奖励状态,作品墙状态",
    [
      registration.name || "参赛者",
      registration.email || "student@example.com",
      registration.githubLogin || profile?.login || "moonbit-builder",
      registration.githubRepo || check?.repoUrl || "https://github.com/owner/project",
      registration.projectName || check?.repo || "MoonBit 示例项目",
      "申报通过",
      "验收未提交",
      "奖励未开始",
      "待上墙",
    ].map((item) => `"${String(item).replace(/"/g, "\"\"")}"`).join(","),
  ].join("\n");
}

function renderPlanPanels(force = false) {
  const plans = $("#progress-plans");
  if (!plans || (plans.dataset.enhanced === "true" && !force)) return;
  plans.dataset.enhanced = "true";
  const feishu = getFeishuState();
  const rows = getFeishuRows();
  const registration = getRegistration();

  plans.innerHTML = `
    <article class="path-card progress-plan-card progress-import-panel">
      <span class="tag">方案一</span>
      <h3>飞书报名数据同步</h3>
      <p>支持把飞书表导出的 CSV 或 JSON 粘贴进来，本页会按邮箱、GitHub 仓库、GitHub 账号、项目名称自动匹配，并把审核状态写入进度看板。</p>
      <label class="form-field form-field--full">
        <span>飞书表 CSV / JSON</span>
        <textarea id="feishu-import-text" rows="7" placeholder="表头建议包含：姓名、邮箱、GitHub 仓库、项目名称、申报审核状态、验收状态、奖励状态、作品墙状态"></textarea>
      </label>
      <div class="progress-compact-actions">
        <button class="button primary" type="button" data-action="import-feishu">导入并匹配</button>
        <button class="button secondary" type="button" data-action="sample-feishu">填入示例数据</button>
        <label class="button secondary progress-file-button">上传 CSV<input id="feishu-file" type="file" accept=".csv,.json,text/csv,application/json"></label>
      </div>
      <div class="progress-alert" id="feishu-import-message">${rows.length ? `已导入 ${rows.length} 条记录，当前状态：${escapeHtml(feishu.proposal)}` : "还没有导入飞书数据。"}</div>
    </article>
    <article class="path-card progress-plan-card progress-status-panel">
      <span class="tag">方案二</span>
      <h3>自建报名系统与后台状态</h3>
      <p>自建报名页已经能保存报名信息，并同步到进度页。这里提供本地后台状态演示，正式版可替换为数据库、后台审核和 GitHub OAuth。</p>
      <div class="progress-mini-list">
        <div><span>报名信息</span><strong>${registration.projectName ? escapeHtml(registration.projectName) : "未填写"}</strong></div>
        <div><span>联系邮箱</span><strong>${registration.email ? escapeHtml(registration.email) : "未填写"}</strong></div>
        <div><span>GitHub 仓库</span><strong>${registration.githubRepo ? "已填写" : "未填写"}</strong></div>
      </div>
      <form class="progress-status-editor" id="progress-status-editor">
        <label class="form-field"><span>申报审核</span><select name="proposal">${statusOptions(feishu.proposal, ["待同步", "申报审核中", "申报通过", "申报需调整"])}</select></label>
        <label class="form-field"><span>验收状态</span><select name="acceptance">${statusOptions(feishu.acceptance, ["未提交", "验收审核中", "验收通过", "验收需调整"])}</select></label>
        <label class="form-field"><span>奖励状态</span><select name="reward">${statusOptions(feishu.reward, ["未开始", "启动支持待发放", "启动支持已发放", "完成支持已发放"])}</select></label>
        <label class="form-field"><span>作品墙</span><select name="showcase">${statusOptions(feishu.showcase, ["待上墙", "候选项目", "已上墙", "暂不展示"])}</select></label>
        <div class="progress-compact-actions">
          <button class="button primary" type="submit">保存演示状态</button>
          <a class="button secondary" href="register.html">打开自建报名</a>
          <button class="button secondary" type="button" data-action="clear-registration">清除本地报名</button>
        </div>
      </form>
    </article>
  `;

  $("#feishu-file")?.addEventListener("change", async (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    $("#feishu-import-text").value = await file.text();
  });
  plans.querySelector("[data-action='sample-feishu']")?.addEventListener("click", () => {
    $("#feishu-import-text").value = sampleFeishuCsv();
  });
  plans.querySelector("[data-action='import-feishu']")?.addEventListener("click", () => {
    const message = $("#feishu-import-message");
    try {
      const rows = parseDataset($("#feishu-import-text").value);
      saveJson(FEISHU_ROWS_KEY, rows);
      apiRequest("/api/import/feishu", {
        method: "POST",
        body: JSON.stringify({ source: "feishu", rows }),
      }).catch(() => {});
      const state = applyFeishuMatch(rows);
      message.className = "progress-alert progress-alert--ok";
      message.textContent = state ? `已导入 ${rows.length} 条记录，并通过${state.matchField}匹配到当前项目。` : `已导入 ${rows.length} 条记录，但还没有匹配到当前项目。`;
      renderProgressDashboard();
    } catch (error) {
      message.className = "progress-alert progress-alert--error";
      message.textContent = `导入失败：${error.message}`;
    }
  });
  $("#progress-status-editor")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const previous = getFeishuState();
    const nextState = {
      ...previous,
      proposal: String(formData.get("proposal") || "待同步"),
      acceptance: String(formData.get("acceptance") || "未提交"),
      reward: String(formData.get("reward") || "未开始"),
      showcase: String(formData.get("showcase") || "待上墙"),
      source: "local-admin",
      updatedAt: new Date().toISOString(),
    };
    saveJson(FEISHU_KEY, nextState);
    await saveStatusToBackend(nextState);
    renderProgressDashboard();
  });
  plans.querySelector("[data-action='clear-registration']")?.addEventListener("click", () => {
    localStorage.removeItem(STORE_KEY);
    renderProgressDashboard();
    renderPlanPanels(true);
  });
}

function initProgressPage() {
  const loginCard = $("#progress-login");
  if (!loginCard || loginCard.dataset.enhanced === "true") return;
  loginCard.dataset.enhanced = "true";
  const registration = getRegistration();
  const check = getCheck();
  const profile = getGitHubProfile();
  const repo = registration.githubRepo || check?.repoUrl || "";
  loginCard.innerHTML = `
    <div class="github-mark">GH</div>
    <h3>连接 GitHub 公开资料</h3>
    <p>静态预览版不保存密钥，也不读取私有仓库。输入 GitHub 用户名和公开仓库后，可以检查比赛进度所需的公开工程信息。</p>
    <form class="progress-form" id="progress-connect-form">
      <label class="form-field">
        <span>GitHub 用户名</span>
        <input name="githubLogin" placeholder="moonbit-builder" value="${escapeHtml(registration.githubLogin || profile?.login || "")}">
      </label>
      <label class="form-field">
        <span>GitHub 仓库</span>
        <input name="repo" type="url" placeholder="https://github.com/owner/project" value="${escapeHtml(repo)}">
      </label>
      <label class="form-field">
        <span>联系邮箱（用于匹配飞书表）</span>
        <input name="email" type="email" placeholder="name@example.com" value="${escapeHtml(registration.email || "")}">
      </label>
      <div class="progress-page-actions">
        <button class="button primary" type="submit">连接并检查</button>
        <button class="button secondary" type="button" data-action="oauth-placeholder">GitHub 登录（正式版）</button>
        <button class="button secondary" type="button" data-action="clear-progress">清除本地数据</button>
      </div>
      <p class="github-login-note">正式 GitHub OAuth 需要后端保存 Client Secret；这里先完成公开资料读取、飞书匹配和仓库检查闭环。</p>
      <div class="progress-alert" id="progress-message" hidden></div>
    </form>
  `;

  const form = $("#progress-connect-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runRepoCheck(form.elements.repo.value, form.elements.email.value, form.elements.githubLogin.value);
  });
  form.querySelector("[data-action='oauth-placeholder']").addEventListener("click", () => {
    const message = $("#progress-message");
    message.hidden = false;
    message.className = "progress-alert";
    message.textContent = "正式 OAuth 需要后端接口。当前预览版已先用公开 GitHub API 模拟登录后的进度查询能力。";
  });
  form.querySelector("[data-action='clear-progress']").addEventListener("click", () => {
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem(CHECK_KEY);
    localStorage.removeItem(FEISHU_KEY);
    localStorage.removeItem(FEISHU_ROWS_KEY);
    localStorage.removeItem(GITHUB_PROFILE_KEY);
    location.reload();
  });

  if (!progressActionsBound) {
    progressActionsBound = true;
    document.addEventListener("click", async (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-action='recheck-repo']") : null;
      if (!target) return;
      const current = getRegistration().githubRepo || getCheck()?.repoUrl || "";
      if (!current) {
        $("#progress-connect-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      await runRepoCheck(current, getRegistration().email || "", getRegistration().githubLogin || getGitHubProfile()?.login || "");
    });
  }

  renderPlanPanels();
  renderProgressDashboard();
}

async function runRepoCheck(repoInput, email, githubLogin) {
  const message = $("#progress-message");
  if (message) {
    message.hidden = false;
    message.className = "progress-alert";
    message.textContent = "正在读取 GitHub 公开数据...";
  }
  try {
    const result = await checkRepository(repoInput);
    let profile = null;
    try {
      profile = await connectGitHubProfile(githubLogin || result.owner);
    } catch {
      profile = getGitHubProfile();
    }
    const previous = getRegistration();
    saveJson(STORE_KEY, {
      ...previous,
      githubLogin: githubLogin || profile?.login || previous.githubLogin || result.owner,
      githubRepo: result.repoUrl,
      email: email || previous.email || "",
      updatedAt: new Date().toISOString(),
    });
    saveJson(CHECK_KEY, result);
    await saveRegistrationToBackend(getRegistration());
    await saveRepoCheckToBackend(result);
    applyFeishuMatch(getFeishuRows());
    if (message) {
      message.className = "progress-alert progress-alert--ok";
      const saved = getRegistration().backendMode === "sqlite" ? "，并已写入后台数据库" : "，当前保存到浏览器本地";
      message.textContent = `连接完成，GitHub 仓库检查和比赛进度看板已更新${saved}。`;
    }
    renderPlanPanels(true);
    renderProgressDashboard();
  } catch (error) {
    if (message) {
      message.className = "progress-alert progress-alert--error";
      message.textContent = error.status === 404 ? "没有找到这个公开仓库，请检查地址或仓库权限。" : error.message;
    }
  }
}

function exportRegistration() {
  const payload = {
    registration: getRegistration(),
    githubProfile: getGitHubProfile(),
    repoCheck: getCheck(),
    feishuStatus: getFeishuState(),
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mgpic2026-registration-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function initRegisterPage() {
  const shell = $("#register-form");
  if (!shell || shell.dataset.enhanced === "true") return;
  shell.dataset.enhanced = "true";
  const data = getRegistration();
  shell.innerHTML = `
    <form class="registration-form" id="registration-form">
      <div class="register-form-head">
        <div class="github-mark">GH</div>
        <div>
          <h3>MoonBit 开源大赛报名</h3>
          <p>当前原型会保存到本地浏览器，并同步到比赛进度页。</p>
        </div>
      </div>
      <div class="register-field-grid">
        <label class="form-field"><span>姓名</span><input name="name" required value="${escapeHtml(data.name || "")}" placeholder="请输入真实姓名"></label>
        <label class="form-field"><span>联系邮箱</span><input name="email" required type="email" value="${escapeHtml(data.email || "")}" placeholder="name@example.com"></label>
        <label class="form-field"><span>学校 / 组织</span><input name="school" value="${escapeHtml(data.school || "")}" placeholder="用于确认学生身份"></label>
        <label class="form-field"><span>GitHub 用户名</span><input name="githubLogin" value="${escapeHtml(data.githubLogin || "")}" placeholder="moonbit-builder"></label>
        <label class="form-field"><span>GitHub 仓库</span><input name="githubRepo" required type="url" value="${escapeHtml(data.githubRepo || "")}" placeholder="https://github.com/owner/project"></label>
        <label class="form-field"><span>项目名称</span><input name="projectName" required value="${escapeHtml(data.projectName || "")}" placeholder="MoonBit 生态库名称"></label>
        <label class="form-field"><span>项目方向</span><select name="projectType">
          ${["生态库", "开发工具", "示例工程", "高校实践", "移植项目"].map((item) => `<option ${data.projectType === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
        </select></label>
      </div>
      <label class="form-field form-field--full"><span>项目简介</span><textarea name="summary" rows="5" placeholder="说明项目做什么、为什么值得做、计划如何实现、最终交付什么。">${escapeHtml(data.summary || "")}</textarea></label>
      <div class="register-upload-grid">
        <label class="register-upload"><strong>项目申报书 PDF</strong><input name="proposalFile" type="file" accept=".pdf"><p>${data.proposalFileName ? `已选择：${escapeHtml(data.proposalFileName)}` : "建议一页，正式系统接文件上传。"}</p></label>
        <label class="register-upload"><strong>学生身份证明</strong><input name="studentFile" type="file" accept=".pdf,.jpg,.jpeg,.png"><p>${data.studentFileName ? `已选择：${escapeHtml(data.studentFileName)}` : "正式上线前需要明确隐私和存储策略。"}</p></label>
      </div>
      <div class="register-system-note">
        <strong>敏感信息处理建议</strong>
        <p>身份证、银行卡等信息建议只在奖励发放阶段单独收集，不放在公开进度页里展示。</p>
      </div>
      <div class="progress-page-actions">
        <button class="button primary" type="submit">保存报名信息</button>
        <a class="button secondary" href="progress.html">查看比赛进度</a>
        <button class="button secondary" type="button" data-action="export-registration">导出本地报名 JSON</button>
        <a class="button secondary" href="${PROPOSAL_FORM_URL}">飞书正式报名</a>
      </div>
      <div class="progress-alert" id="registration-message" hidden></div>
    </form>
  `;

  $("#registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    handleRegistrationSubmit(event.currentTarget);
  });
  shell.querySelector("[data-action='export-registration']")?.addEventListener("click", exportRegistration);
}

async function handleRegistrationSubmit(form) {
  const value = saveRegistrationFromForm(form);
  const msg = $("#registration-message");
  msg.hidden = false;
  msg.className = "progress-alert";
  msg.textContent = "正在保存报名信息...";
  const result = await saveRegistrationToBackend(value);
  if (result.mode === "backend") {
    msg.className = "progress-alert progress-alert--ok";
    msg.innerHTML = `已保存 ${escapeHtml(value.projectName || "项目")} 到后台数据库，记录编号 #${escapeHtml(result.registration.serverId)}。现在可以进入 <a href="progress.html">比赛进度页</a> 检查 GitHub 仓库。`;
  } else {
    const msg = $("#registration-message");
    msg.className = "progress-alert progress-alert--ok";
    msg.innerHTML = `已保存 ${escapeHtml(value.projectName || "项目")} 到浏览器本地。当前页面未连接后台数据库，可以进入 <a href="progress.html">比赛进度页</a> 检查 GitHub 仓库。`;
  }
}

function boot() {
  initProgressPage();
  renderPlanPanels();
  initRegisterPage();
  syncRegistrationFromBackend();
}

window.addEventListener("DOMContentLoaded", boot);
window.addEventListener("load", boot);
window.addEventListener("pageshow", boot);
requestAnimationFrame(boot);

let bootAttempts = 0;
const bootInterval = window.setInterval(() => {
  bootAttempts += 1;
  boot();
  const registerReady = !$("#register-form") || $("#register-form")?.dataset.enhanced === "true";
  const progressReady = !$("#progress-login") || $("#progress-login")?.dataset.enhanced === "true";
  if ((registerReady && progressReady) || bootAttempts > 40) window.clearInterval(bootInterval);
}, 250);

const root = document.getElementById("mgpic-app");
if (root) {
  let timer = 0;
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(boot, 20);
  }).observe(root, { childList: true, subtree: true });
}
