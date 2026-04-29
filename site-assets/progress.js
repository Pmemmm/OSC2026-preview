const STORE_KEY = "mgpic2026.registration.v1";
const CHECK_KEY = "mgpic2026.repoCheck.v1";
const FEISHU_KEY = "mgpic2026.feishuStatus.v1";
const FEISHU_ROWS_KEY = "mgpic2026.feishuRows.v1";
const GITHUB_PROFILE_KEY = "mgpic2026.githubProfile.v1";
const AI_REVIEWS_KEY = "mgpic2026.aiReviews.v1";
const NOTIFICATIONS_KEY = "mgpic2026.notifications.v1";
const START_DATE_ISO = "2026-04-28T16:00:00Z";
const PROPOSAL_FORM_URL = "https://bxup9uklfcb.feishu.cn/share/base/form/shrcn2duseEVtk3e4sTRA8z5Qyf";
const ACCEPTANCE_FORM_URL = "https://bxup9uklfcb.feishu.cn/share/base/form/shrcnlOdTfQUDNW5raWrQDqVTQg";
const API_BASE = window.MGPIC_API_BASE || "";
let progressActionsBound = false;
let backendSyncStarted = false;
let githubSessionSyncStarted = false;

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
    credentials: "same-origin",
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

function currentReturnTo() {
  const page = window.location.pathname.split("/").pop() || "progress.html";
  return page === "register.html" ? "/register.html" : "/progress.html";
}

function githubOAuthStartUrl() {
  return `${API_BASE}/api/auth/github/start?return_to=${encodeURIComponent(currentReturnTo())}`;
}

function saveGitHubSessionUser(user) {
  if (!user?.login) return;
  const profile = {
    login: user.login,
    name: user.name || "",
    email: user.email || "",
    avatarUrl: user.avatarUrl || "",
    htmlUrl: user.htmlUrl || "",
    oauth: true,
    connectedAt: new Date().toISOString(),
  };
  saveJson(GITHUB_PROFILE_KEY, profile);
  const previous = getRegistration();
  saveJson(STORE_KEY, publicRegistrationValue({
    ...previous,
    githubLogin: previous.githubLogin || profile.login,
    email: previous.email || profile.email || "",
    updatedAt: new Date().toISOString(),
  }));
}

function applyGitHubSessionToForms(user) {
  if (!user?.login) return;
  const progressForm = $("#progress-connect-form");
  if (progressForm) {
    if (!progressForm.elements.githubLogin.value) progressForm.elements.githubLogin.value = user.login;
    if (user.email && !progressForm.elements.email.value) progressForm.elements.email.value = user.email;
  }
  const registerForm = $("#registration-form");
  if (registerForm) {
    if (!registerForm.elements.githubLogin.value) registerForm.elements.githubLogin.value = user.login;
    if (user.email && !registerForm.elements.email.value) registerForm.elements.email.value = user.email;
  }
}

async function syncGitHubOAuthSession(force = false) {
  if (githubSessionSyncStarted && !force) return null;
  githubSessionSyncStarted = true;
  try {
    const session = await apiRequest("/api/auth/github/session", { method: "GET" });
    if (session?.authenticated && session.user) {
      const hadOAuth = Boolean(getGitHubProfile()?.oauth);
      saveGitHubSessionUser(session.user);
      applyGitHubSessionToForms(session.user);
      applyFeishuMatch(getFeishuRows());
      renderProgressDashboard();
      const loginCard = $("#progress-login");
      if (loginCard?.dataset.enhanced === "true" && !hadOAuth) {
        loginCard.dataset.enhanced = "false";
        initProgressPage();
      }
      return session;
    }
    return session;
  } catch {
    return null;
  }
}

async function startGitHubOAuth(message) {
  if (message) {
    message.hidden = false;
    message.className = "progress-alert";
    message.textContent = "正在连接 GitHub 授权服务...";
  }
  try {
    const session = await apiRequest("/api/auth/github/session", { method: "GET" });
    if (session?.authenticated && session.user) {
      saveGitHubSessionUser(session.user);
      applyGitHubSessionToForms(session.user);
      if (message) {
        message.className = "progress-alert progress-alert--ok";
        message.textContent = `已通过 GitHub 登录：@${session.user.login}`;
      }
      renderProgressDashboard();
      const loginCard = $("#progress-login");
      if (loginCard) {
        loginCard.dataset.enhanced = "false";
        initProgressPage();
      }
      return;
    }
    if (session?.configured === false) {
      throw new Error("后端未配置 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET，暂时不能发起 GitHub 授权。");
    }
    window.location.href = githubOAuthStartUrl();
  } catch (error) {
    if (message) {
      message.className = "progress-alert progress-alert--error";
      message.textContent = error.status === 404
        ? "当前 GitHub Pages 静态预览没有 OAuth 后端；部署 server.py 并配置 GitHub OAuth App 后即可一键登录。"
        : error.message;
    }
  }
}

async function logoutGitHubOAuth(message) {
  try {
    await apiRequest("/api/auth/github/logout", { method: "POST" });
  } catch {
    // Static previews do not have a backend session to clear.
  }
  localStorage.removeItem(GITHUB_PROFILE_KEY);
  if (message) {
    message.hidden = false;
    message.className = "progress-alert progress-alert--ok";
    message.textContent = "已退出 GitHub 登录。";
  }
  renderProgressDashboard();
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

function getNotifications() {
  return loadJson(NOTIFICATIONS_KEY, []);
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

function maskSensitive(value, keepStart = 3, keepEnd = 4) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text.length <= keepStart + keepEnd) return "*".repeat(text.length);
  return `${text.slice(0, keepStart)}${"*".repeat(text.length - keepStart - keepEnd)}${text.slice(-keepEnd)}`;
}

function publicRegistrationValue(value) {
  const {
    proposalFile,
    studentFile,
    idFrontFile,
    idBackFile,
    idNumber,
    bankAccount,
    bankBranch,
    ...safeValue
  } = value || {};
  return {
    ...safeValue,
    idNumberMasked: safeValue.idNumberMasked || maskSensitive(idNumber),
    bankAccountMasked: safeValue.bankAccountMasked || maskSensitive(bankAccount),
    sensitiveSubmitted: Boolean(
      safeValue.sensitiveSubmitted ||
      idNumber ||
      bankAccount ||
      bankBranch ||
      safeValue.idFrontFileName ||
      safeValue.idBackFileName
    ),
  };
}

function saveRegistrationFromForm(form) {
  const formData = new FormData(form);
  const previous = getRegistration();
  const value = {
    ...previous,
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    school: String(formData.get("school") || "").trim(),
    idNumber: String(formData.get("idNumber") || "").trim(),
    githubLogin: String(formData.get("githubLogin") || "").trim(),
    githubRepo: String(formData.get("githubRepo") || "").trim(),
    projectName: String(formData.get("projectName") || "").trim(),
    projectType: String(formData.get("projectType") || "").trim(),
    summary: String(formData.get("summary") || "").trim(),
    bankAccount: String(formData.get("bankAccount") || "").trim(),
    bankBranch: String(formData.get("bankBranch") || "").trim(),
    proposalFileName: form.elements.proposalFile?.files?.[0]?.name || previous.proposalFileName || "",
    studentFileName: form.elements.studentFile?.files?.[0]?.name || previous.studentFileName || "",
    idFrontFileName: form.elements.idFrontFile?.files?.[0]?.name || previous.idFrontFileName || "",
    idBackFileName: form.elements.idBackFile?.files?.[0]?.name || previous.idBackFileName || "",
    updatedAt: new Date().toISOString(),
  };
  saveJson(STORE_KEY, publicRegistrationValue(value));
  applyFeishuMatch(getFeishuRows());
  return value;
}

function backendPayload(value) {
  return {
    name: value.name || "",
    email: value.email || "",
    school: value.school || "",
    idNumber: value.idNumber || "",
    githubLogin: value.githubLogin || "",
    githubRepo: value.githubRepo || "",
    projectName: value.projectName || "",
    projectType: value.projectType || "",
    summary: value.summary || "",
    bankAccount: value.bankAccount || "",
    bankBranch: value.bankBranch || "",
    proposalFileName: value.proposalFileName || "",
    studentFileName: value.studentFileName || "",
    idFrontFileName: value.idFrontFileName || "",
    idBackFileName: value.idBackFileName || "",
    proposalFile: value.proposalFile || null,
    studentFile: value.studentFile || null,
    idFrontFile: value.idFrontFile || null,
    idBackFile: value.idBackFile || null,
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
    const saved = publicRegistrationValue({
      ...value,
      ...result.registration,
      serverId: result.registration.id,
      backendMode: "sqlite",
      backendSavedAt: result.registration.updatedAt || result.registration.createdAt || new Date().toISOString(),
    });
    saveJson(STORE_KEY, saved);
    return { mode: "backend", registration: saved };
  } catch (error) {
    const saved = publicRegistrationValue({
      ...value,
      backendMode: "local",
      backendError: error.message,
    });
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
    saveBackendBundle(result, current);
    renderProgressDashboard();
    renderPlanPanels(true);
  } catch {
    // The public GitHub Pages preview has no backend; keep the local copy usable.
  }
}

function saveBackendBundle(result, previous = getRegistration()) {
  if (!result?.registration) return;
  saveJson(STORE_KEY, {
    ...previous,
    ...result.registration,
    serverId: result.registration.id,
    backendMode: "sqlite",
    backendSavedAt: result.registration.updatedAt,
    files: result.files || previous.files || [],
  });
  if (result.status) saveJson(FEISHU_KEY, { ...getFeishuState(), ...result.status, source: "backend" });
  if (result.repoCheck) saveJson(CHECK_KEY, result.repoCheck);
  if (result.aiReviews) saveJson(AI_REVIEWS_KEY, result.aiReviews);
  if (result.notifications) saveJson(NOTIFICATIONS_KEY, result.notifications);
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
  const notifications = getNotifications();
  const lastNotification = notifications[0];
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
      <div class="progress-source-card"><span>GitHub 账号</span><strong>${profile ? `@${escapeHtml(profile.login)}` : "未连接"}</strong><p>${profile?.oauth ? "已通过 GitHub OAuth 授权；不涉及私有仓库权限。" : (profile ? "已读取公开资料，不涉及私有仓库权限。" : "可使用 GitHub 一键登录或手动输入用户名。")}</p></div>
      <div class="progress-source-card"><span>后台数据库</span><strong>${backendLabel}</strong><p>${backendDetail}</p></div>
      <div class="progress-source-card"><span>飞书报名数据</span><strong>${hasFeishuMatch ? "已匹配" : escapeHtml(feishu.proposal)}</strong><p>${hasFeishuMatch ? `通过${escapeHtml(feishu.matchField)}匹配，状态来自导入数据。` : "可导入飞书表 CSV/JSON 后自动匹配。"}</p></div>
      <div class="progress-source-card"><span>自建报名系统</span><strong>${hasRegistration ? "已保存" : "未填写"}</strong><p>${escapeHtml(registration.email || "未连接后台时会先保存到浏览器本地。")}</p></div>
      <div class="progress-source-card"><span>作品墙状态</span><strong>${escapeHtml(feishu.showcase)}</strong><p>通过验收或表现突出的项目可进入展示墙。</p></div>
      <div class="progress-source-card"><span>通知状态</span><strong>${lastNotification ? escapeHtml(lastNotification.status) : "暂无通知"}</strong><p>${lastNotification ? escapeHtml(lastNotification.subject || lastNotification.error || "已生成通知记录。") : "管理员推进流程后会邮件通知。"}</p></div>
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
      <a class="button secondary" href="${PROPOSAL_FORM_URL}" target="_blank" rel="noreferrer">飞书报名入口</a>
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
      <p>继续保留飞书路径：选手仍可通过飞书表正式报名，管理员把飞书表导出的 CSV 或 JSON 导入后台后，本页会按邮箱、GitHub 仓库、GitHub 账号、项目名称自动匹配，并把审核状态写入进度看板。</p>
      <label class="form-field form-field--full">
        <span>飞书表 CSV / JSON</span>
        <textarea id="feishu-import-text" rows="7" placeholder="表头建议包含：姓名、邮箱、GitHub 仓库、项目名称、申报审核状态、验收状态、奖励状态、作品墙状态"></textarea>
      </label>
      <div class="progress-compact-actions">
        <button class="button primary" type="button" data-action="import-feishu">导入并匹配</button>
        <button class="button secondary" type="button" data-action="sample-feishu">填入示例数据</button>
        <label class="button secondary progress-file-button">上传 CSV<input id="feishu-file" type="file" accept=".csv,.json,text/csv,application/json"></label>
        <a class="button secondary" href="${PROPOSAL_FORM_URL}" target="_blank" rel="noreferrer">打开飞书报名表</a>
      </div>
      <div class="progress-alert" id="feishu-import-message">${rows.length ? `已导入 ${rows.length} 条记录，当前状态：${escapeHtml(feishu.proposal)}` : "还没有导入飞书数据。"}</div>
    </article>
    <article class="path-card progress-plan-card progress-status-panel">
      <span class="tag">方案二</span>
      <h3>自建报名系统与后台状态</h3>
      <p>自建报名页可保存报名信息，并同步到进度页。后台可统一维护申报审核、验收、奖励、通知和作品墙状态。</p>
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
          <button class="button primary" type="submit">保存当前状态</button>
          <a class="button secondary" href="register.html">打开自建报名</a>
          <a class="button secondary" href="admin.html">后台管理</a>
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
      }).then((result) => {
        message.className = "progress-alert progress-alert--ok";
        message.textContent = `已导入 ${rows.length} 条飞书记录，其中 ${result.upserted || 0} 条已写入后台报名库。`;
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
  const authStatus = new URLSearchParams(window.location.search).get("github_auth");
  const authMessage = {
    ok: "GitHub 登录成功，已同步账号信息。",
    not_configured: "后端还没有配置 GitHub OAuth App，暂时不能一键登录。",
    denied: "你取消了 GitHub 授权。",
    state_error: "GitHub 授权状态已失效，请重新登录。",
    failed: "GitHub 授权失败，请稍后重试。",
  }[authStatus || ""];
  loginCard.innerHTML = `
    <div class="github-mark">GH</div>
    <h3>${profile?.oauth ? `已通过 GitHub 登录` : "使用 GitHub 一键登录"}</h3>
    <p>${profile?.oauth ? `当前账号 @${escapeHtml(profile.login)}，已通过 GitHub 授权读取公开资料和邮箱。` : "点击后跳转到 GitHub 官方授权页，用户确认后返回比赛进度页；权限只申请读取公开资料和邮箱，不申请私有仓库权限。"}</p>
    <div class="progress-page-actions">
      <button class="button primary" type="button" data-action="github-oauth">${profile?.oauth ? "刷新 GitHub 登录状态" : "使用 GitHub 一键登录"}</button>
      ${profile?.oauth ? `<button class="button secondary" type="button" data-action="github-logout">退出 GitHub 登录</button>` : ""}
    </div>
    <form class="progress-form" id="progress-connect-form">
      <label class="form-field">
        <span>GitHub 用户名</span>
        <input name="githubLogin" placeholder="moonbit-builder" value="${escapeHtml(registration.githubLogin || profile?.login || "")}">
      </label>
      <label class="form-field">
        <span>报名编号（已提交后可用来恢复数据库进度）</span>
        <input name="serverId" inputmode="numeric" placeholder="例如 12" value="${escapeHtml(registration.serverId || "")}">
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
        <button class="button secondary" type="button" data-action="load-server-record">读取数据库进度</button>
        <button class="button secondary" type="button" data-action="clear-progress">清除本地数据</button>
      </div>
      <p class="github-login-note">GitHub 登录用于身份确认和账号匹配；仓库检查仍只读取公开仓库。未部署后端时，也可以手动输入公开仓库进行检查。</p>
      <div class="progress-alert" id="progress-message" ${authMessage ? "" : "hidden"}>${escapeHtml(authMessage || "")}</div>
    </form>
  `;

  const form = $("#progress-connect-form");
  loginCard.querySelector("[data-action='github-oauth']")?.addEventListener("click", () => {
    startGitHubOAuth($("#progress-message"));
  });
  loginCard.querySelector("[data-action='github-logout']")?.addEventListener("click", () => {
    logoutGitHubOAuth($("#progress-message"));
    loginCard.dataset.enhanced = "false";
    initProgressPage();
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await runRepoCheck(form.elements.repo.value, form.elements.email.value, form.elements.githubLogin.value);
  });
  form.querySelector("[data-action='load-server-record']").addEventListener("click", async () => {
    await loadServerRegistration(form.elements.serverId.value);
  });
  form.querySelector("[data-action='clear-progress']").addEventListener("click", () => {
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem(CHECK_KEY);
    localStorage.removeItem(FEISHU_KEY);
    localStorage.removeItem(FEISHU_ROWS_KEY);
    localStorage.removeItem(GITHUB_PROFILE_KEY);
    localStorage.removeItem(AI_REVIEWS_KEY);
    localStorage.removeItem(NOTIFICATIONS_KEY);
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
  syncGitHubOAuthSession();
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

async function loadServerRegistration(serverId) {
  const message = $("#progress-message");
  if (message) {
    message.hidden = false;
    message.className = "progress-alert";
    message.textContent = "正在读取后台数据库记录...";
  }
  const id = String(serverId || "").trim();
  if (!id) {
    if (message) {
      message.className = "progress-alert progress-alert--error";
      message.textContent = "请输入报名编号。";
    }
    return;
  }
  try {
    const result = await apiRequest(`/api/registrations/${encodeURIComponent(id)}`, { method: "GET" });
    saveBackendBundle(result);
    if (message) {
      message.className = "progress-alert progress-alert--ok";
      message.textContent = `已读取数据库记录 #${id}，比赛进度已更新。`;
    }
    renderPlanPanels(true);
    renderProgressDashboard();
  } catch (error) {
    if (message) {
      message.className = "progress-alert progress-alert--error";
      message.textContent = error.status === 404 ? "没有找到这个报名编号。" : "当前未连接后台数据库，公网预览页只能读取浏览器本地数据。";
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

function fileToPayload(file) {
  if (!file) return Promise.resolve(null);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      resolve({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        data: dataUrl.includes(",") ? dataUrl.split(",").pop() : dataUrl,
      });
    };
    reader.onerror = () => reject(new Error("文件读取失败"));
    reader.readAsDataURL(file);
  });
}

async function collectRegistrationFiles(form) {
  const proposalFile = form.elements.proposalFile?.files?.[0] || null;
  const studentFile = form.elements.studentFile?.files?.[0] || null;
  const idFrontFile = form.elements.idFrontFile?.files?.[0] || null;
  const idBackFile = form.elements.idBackFile?.files?.[0] || null;
  return {
    proposalFile: await fileToPayload(proposalFile),
    studentFile: await fileToPayload(studentFile),
    idFrontFile: await fileToPayload(idFrontFile),
    idBackFile: await fileToPayload(idBackFile),
  };
}

function initRegisterPage() {
  const shell = $("#register-form");
  if (!shell || shell.dataset.enhanced === "true") return;
  shell.dataset.enhanced = "true";
  const data = getRegistration();
  const requireProposal = data.proposalFileName ? "" : "required";
  const requireStudent = data.studentFileName ? "" : "required";
  const requireIdFront = data.idFrontFileName ? "" : "required";
  const requireIdBack = data.idBackFileName ? "" : "required";
  shell.innerHTML = `
    <form class="registration-form" id="registration-form">
      <div class="register-form-head">
        <img class="register-head-logo" src="site-assets/moonbit-logo.png?v=20260428-progress-system" alt="MoonBit Logo">
        <div>
          <h3>MoonBit 开源大赛报名</h3>
          <p>有后台时写入 SQLite；未连接后台时会先保存到浏览器本地，并同步到比赛进度页。</p>
        </div>
      </div>
      <div class="register-field-grid">
        <label class="form-field"><span>姓名</span><input name="name" required value="${escapeHtml(data.name || "")}" placeholder="请输入真实姓名"></label>
        <label class="form-field"><span>联系邮箱</span><input name="email" required type="email" value="${escapeHtml(data.email || "")}" placeholder="name@example.com"></label>
        <label class="form-field"><span>学校 / 组织</span><input name="school" value="${escapeHtml(data.school || "")}" placeholder="用于确认学生身份"></label>
        <label class="form-field"><span>身份证号</span><input name="idNumber" required autocomplete="off" inputmode="text" placeholder="仅用于奖金发放核验"></label>
        <label class="form-field"><span>GitHub 用户名</span><input name="githubLogin" value="${escapeHtml(data.githubLogin || "")}" placeholder="moonbit-builder"></label>
        <label class="form-field"><span>GitHub 仓库</span><input name="githubRepo" required type="url" value="${escapeHtml(data.githubRepo || "")}" placeholder="https://github.com/owner/project"></label>
        <label class="form-field"><span>项目名称</span><input name="projectName" required value="${escapeHtml(data.projectName || "")}" placeholder="MoonBit 生态库名称"></label>
        <label class="form-field"><span>项目方向</span><select name="projectType">
          ${["生态库", "开发工具", "示例工程", "高校实践", "移植项目"].map((item) => `<option ${data.projectType === item ? "selected" : ""}>${escapeHtml(item)}</option>`).join("")}
        </select></label>
        <label class="form-field"><span>银行卡号</span><input name="bankAccount" required autocomplete="off" inputmode="numeric" placeholder="仅用于奖金发放"></label>
        <label class="form-field"><span>开户支行</span><input name="bankBranch" required autocomplete="off" placeholder="例如：中国银行深圳 xx 支行"></label>
      </div>
      <label class="form-field form-field--full"><span>项目简介</span><textarea name="summary" rows="5" placeholder="说明项目做什么、为什么值得做、计划如何实现、最终交付什么。">${escapeHtml(data.summary || "")}</textarea></label>
      <div class="register-upload-grid">
        <label class="register-upload"><strong>项目申报书 PDF</strong><input name="proposalFile" type="file" accept=".pdf" ${requireProposal}><p>${data.proposalFileName ? `已选择：${escapeHtml(data.proposalFileName)}` : "建议一页，后台用于申报审核。"}</p></label>
        <label class="register-upload"><strong>学生身份证明</strong><input name="studentFile" type="file" accept=".pdf,.jpg,.jpeg,.png" ${requireStudent}><p>${data.studentFileName ? `已选择：${escapeHtml(data.studentFileName)}` : "仅用于学生身份确认，不在公开页面展示。"}</p></label>
        <label class="register-upload"><strong>身份证正面（水印版）</strong><input name="idFrontFile" type="file" accept=".pdf,.jpg,.jpeg,.png" ${requireIdFront}><p>${data.idFrontFileName ? `已选择：${escapeHtml(data.idFrontFileName)}` : "请先加水印：仅用于 MoonBit 开源大赛奖金发放。"}</p></label>
        <label class="register-upload"><strong>身份证反面（水印版）</strong><input name="idBackFile" type="file" accept=".pdf,.jpg,.jpeg,.png" ${requireIdBack}><p>${data.idBackFileName ? `已选择：${escapeHtml(data.idBackFileName)}` : "水印不要遮挡姓名、证件号、有效期等关键信息。"}</p></label>
      </div>
      <div class="register-system-note">
        <strong>敏感信息使用说明</strong>
        <p>身份证、银行卡和开户支行仅用于赛事启动支持、完成支持及优秀作品奖金发放，不会展示在公开比赛进度页或作品墙。</p>
        <p>上传身份证图片前，建议使用 AI 或图片工具添加水印，例如“仅用于 MoonBit 开源大赛奖金发放”。水印要清晰，但不要遮挡姓名、证件号、学校、有效期等核验信息。</p>
        <p>如果当前页面未连接后台数据库，只会在浏览器本地保存非敏感报名信息；敏感信息和证件文件需要在后台可用时重新提交。</p>
      </div>
      <div class="progress-page-actions">
        <button class="button secondary" type="button" data-action="github-oauth">使用 GitHub 登录填充资料</button>
        <button class="button primary" type="submit">提交报名信息</button>
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
  shell.querySelector("[data-action='github-oauth']")?.addEventListener("click", () => {
    startGitHubOAuth($("#registration-message"));
  });
  shell.querySelector("[data-action='export-registration']")?.addEventListener("click", exportRegistration);
  syncGitHubOAuthSession();
}

async function handleRegistrationSubmit(form) {
  const value = saveRegistrationFromForm(form);
  const msg = $("#registration-message");
  msg.hidden = false;
  msg.className = "progress-alert";
  msg.textContent = "正在提交报名信息...";
  try {
    const files = await collectRegistrationFiles(form);
    const result = await saveRegistrationToBackend({ ...value, ...files });
    if (result.mode === "backend") {
      msg.className = "progress-alert progress-alert--ok";
      msg.innerHTML = `已保存 ${escapeHtml(value.projectName || "项目")} 到后台数据库，记录编号 #${escapeHtml(result.registration.serverId)}。现在可以进入 <a href="progress.html">比赛进度页</a> 检查 GitHub 仓库。`;
    } else {
      msg.className = "progress-alert progress-alert--ok";
      msg.innerHTML = `当前页面未连接后台数据库，只保存了 ${escapeHtml(value.projectName || "项目")} 的非敏感报名信息到浏览器本地。身份证和银行卡信息不会本地保存，请在后台可用时重新提交。`;
    }
  } catch (error) {
    msg.className = "progress-alert progress-alert--error";
    msg.textContent = error.message || "保存失败，请稍后重试。";
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
