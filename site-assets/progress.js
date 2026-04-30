const STORE_KEY = "mgpic2026.registration.v1";
const CHECK_KEY = "mgpic2026.repoCheck.v1";
const FEISHU_KEY = "mgpic2026.feishuStatus.v1";
const FEISHU_ROWS_KEY = "mgpic2026.feishuRows.v1";
const GITHUB_PROFILE_KEY = "mgpic2026.githubProfile.v1";
const AI_REVIEWS_KEY = "mgpic2026.aiReviews.v1";
const NOTIFICATIONS_KEY = "mgpic2026.notifications.v1";
const START_DATE_ISO = "2026-04-28T16:00:00Z";
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const PROPOSAL_FORM_URL = "https://bxup9uklfcb.feishu.cn/share/base/form/shrcn2duseEVtk3e4sTRA8z5Qyf";
const ACCEPTANCE_FORM_URL = "https://bxup9uklfcb.feishu.cn/share/base/form/shrcnlOdTfQUDNW5raWrQDqVTQg";
const DEFAULT_RENDER_API_BASE = "https://mgpic2026.onrender.com";
const API_BASE = resolveApiBase();
const PUBLIC_SELF_SERVICE_ENABLED = true;
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

function resolveApiBase() {
  const explicit = normalizeApiBase(window.MGPIC_API_BASE);
  if (explicit) return explicit;
  if (/github\.io$/i.test(window.location.hostname)) return DEFAULT_RENDER_API_BASE;
  return "";
}

function hostedPage(path) {
  const cleanPath = String(path || "").replace(/^\//, "");
  if (API_BASE && /github\.io$/i.test(window.location.hostname)) return `${API_BASE}/${cleanPath}`;
  return cleanPath;
}

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
    const error = new Error(`接口 ${response.status}`);
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
  renderRegisterGitHubStatus(user);
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
      renderRegisterGitHubStatus(session.user);
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
        ? "Render OAuth 接口还不可用。请确认 Render 服务已创建并正在运行，然后配置 GitHub OAuth App。"
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

function githubAuthMessage() {
  const authStatus = new URLSearchParams(window.location.search).get("github_auth");
  return {
    ok: "GitHub 登录成功，已同步账号信息。",
    not_configured: "Render 后端已连接，但还没有配置 GitHub OAuth App 的 Client ID / Secret。",
    denied: "你取消了 GitHub 授权。",
    state_error: "GitHub 授权状态已失效，请重新登录。",
    failed: "GitHub 授权失败，请稍后重试。",
  }[authStatus || ""];
}

function githubUserForDisplay(user = getGitHubProfile()) {
  return user?.login ? user : null;
}

function renderRegisterGitHubStatus(user = getGitHubProfile()) {
  const target = $("#register-github-status");
  if (!target) return;
  const profile = githubUserForDisplay(user);
  const authMessage = githubAuthMessage();
  target.innerHTML = `
    <div class="register-github-identity">
      ${profile?.avatarUrl ? `<img src="${escapeHtml(profile.avatarUrl)}" alt="@${escapeHtml(profile.login)}">` : ""}
      <div>
        <strong>${profile ? `已登录 GitHub：@${escapeHtml(profile.login)}` : "建议先使用 GitHub 一键登录"}</strong>
        <p>${profile ? "报名表会自动带入 GitHub 用户名和邮箱；后续比赛进度也会按该账号匹配。" : "只申请读取公开资料和邮箱，不会申请私有仓库权限。登录后可减少手填并方便后续查看比赛进度。"}</p>
      </div>
    </div>
    <div class="register-github-actions">
      <button class="button primary" type="button" data-action="github-oauth">${profile ? "刷新 GitHub 信息" : "使用 GitHub 一键登录"}</button>
      ${profile ? `<button class="button secondary" type="button" data-action="github-logout">退出 GitHub 登录</button>` : ""}
    </div>
    <div class="progress-alert ${authMessage?.includes("成功") ? "progress-alert--ok" : authMessage ? "progress-alert--error" : ""}" id="register-github-message" ${authMessage ? "" : "hidden"}>${escapeHtml(authMessage || "")}</div>
  `;
  target.querySelectorAll("[data-action='github-oauth']").forEach((button) => {
    button.addEventListener("click", () => startGitHubOAuth($("#register-github-message") || $("#registration-message")));
  });
  target.querySelector("[data-action='github-logout']")?.addEventListener("click", () => {
    logoutGitHubOAuth($("#register-github-message") || $("#registration-message"));
    target.dataset.refreshed = "false";
    renderRegisterGitHubStatus(null);
  });
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
  saveJson(STORE_KEY, publicRegistrationValue({
    ...value,
    id: "",
    serverId: "",
    backendMode: "pending",
    backendError: "",
    backendSavedAt: "",
  }));
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
  const payload = backendPayload(value);
  try {
    let result = null;
    if (serverId) {
      try {
        result = await apiRequest(`/api/registrations/${encodeURIComponent(serverId)}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } catch (error) {
        if (![401, 403, 404].includes(error.status)) throw error;
        result = await apiRequest("/api/registrations", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
    } else {
      result = await apiRequest("/api/registrations", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    if (!result?.registration?.id) {
      throw new Error("服务器没有返回报名记录，请重新提交。");
    }
    const saved = publicRegistrationValue({
      ...value,
      ...result.registration,
      id: result.registration.id,
      serverId: result.registration.id,
      backendMode: "sqlite",
      backendError: "",
      backendSavedAt: result.registration.updatedAt || result.registration.createdAt || new Date().toISOString(),
    });
    saveJson(STORE_KEY, saved);
    return { mode: "backend", registration: saved };
  } catch (error) {
    const saved = publicRegistrationValue({
      ...value,
      id: "",
      serverId: "",
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
  if (!getGitHubProfile()?.oauth) return;
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
  if (!profile) return "";
  const avatarUrl = safeHttpUrl(profile?.avatarUrl);
  if (avatarUrl) return `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(profile.login || "GitHub")}">`;
  return profile?.login ? escapeHtml(profile.login.slice(0, 2).toUpperCase()) : "";
}

function progressSourceCard(label, title, body, tone = "") {
  return `
    <div class="progress-source-card ${tone ? `progress-source-card--${tone}` : ""}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(body)}</p>
    </div>
  `;
}

function renderCheckArea(checks, hasRepo) {
  if (!hasRepo) {
    return `
      <div class="progress-empty-check">
        <span>仓库检查</span>
        <strong>填写 GitHub 仓库后开始检查</strong>
        <p>系统会检查公开仓库、4 月 29 日后的有效 commits、README、CI、测试、许可证、MoonBit 代码和包配置。</p>
      </div>
    `;
  }
  if (!checks.length) {
    return `
      <div class="progress-empty-check">
        <span>仓库检查</span>
        <strong>仓库已填写，等待首次检查</strong>
        <p>点击“检查公开仓库”后，这里会显示每一项是否通过。</p>
      </div>
    `;
  }
  return `
    <div class="progress-check-grid">
      ${checks.map((item) => `
        <div class="${statusClass(item.passed)}">
          <span>${item.passed ? "通过" : "待补"}</span>
          <strong>${escapeHtml(item.label)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function progressFlowItems(registration, check, feishu, profile) {
  const passed = check?.checks?.filter((item) => item.passed).length || 0;
  const total = check?.checks?.length || 8;
  const hasRegistration = Boolean(registration.projectName || registration.githubRepo);
  const hasRepoCheck = Boolean(check?.checks?.length);
  return [
    {
      title: "GitHub 登录",
      body: profile?.oauth ? `已连接 @${profile.login}` : "建议先登录，后续用账号匹配进度。",
      done: Boolean(profile?.oauth),
      current: !profile?.oauth,
    },
    {
      title: "项目申报",
      body: hasRegistration ? "已填写项目或仓库信息，等待赛方审核。" : "提交报名信息、GitHub 仓库和 PDF 申报书。",
      done: hasRegistration || statusDone(feishu.proposal),
      current: Boolean(profile?.oauth && !hasRegistration),
    },
    {
      title: "仓库检查",
      body: hasRepoCheck ? `已通过 ${passed} / ${total} 项。` : "检查 commits、README、CI、测试、许可证和包配置。",
      done: hasRepoCheck && passed >= Math.max(6, total - 1),
      current: hasRegistration && !hasRepoCheck,
    },
    {
      title: "申报审核",
      body: feishu.proposal || "等待赛方审核结果。",
      done: statusDone(feishu.proposal),
      current: hasRegistration && !statusDone(feishu.proposal),
      warn: /拒绝|不通过|需调整|驳回/i.test(String(feishu.proposal || "")),
    },
    {
      title: "项目验收",
      body: feishu.acceptance || "完成后提交验收申请。",
      done: statusDone(feishu.acceptance),
      current: statusDone(feishu.proposal) && !statusDone(feishu.acceptance),
    },
    {
      title: "作品展示",
      body: feishu.showcase || "优秀项目有机会进入作品墙。",
      done: statusDone(feishu.showcase),
      current: statusDone(feishu.acceptance) && !statusDone(feishu.showcase),
    },
  ];
}

function renderProgressFlow(registration, check, feishu, profile) {
  return `
    <div class="progress-flow-strip">
      ${progressFlowItems(registration, check, feishu, profile).map((item, index) => `
        <div class="${item.done ? "is-done" : item.warn ? "is-warn" : item.current ? "is-current" : ""}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.body)}</p>
        </div>
      `).join("")}
    </div>
  `;
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
  const hasRepo = Boolean(repoUrl);
  const hasBackendRecord = registration.backendMode === "sqlite";
  const hasImportedFeishu = feishu.source && feishu.source !== "none";
  const hasShowcaseState = statusDone(feishu.acceptance) || statusDone(feishu.showcase) || /候选|已上墙|暂不展示/.test(String(feishu.showcase || ""));
  const percent = Math.max(12, Math.round(((profile ? 1 : 0) + (hasRegistration ? 1 : 0) + (hasFeishuMatch ? 1 : 0) + passed) / (total + 3) * 100));
  const checks = check?.checks || [];
  const title = registration.projectName || check?.repo || profile?.login || "比赛进度看板";
  const repoLine = repoUrl
    ? `<a href="${escapeHtml(repoUrl)}" target="_blank" rel="noreferrer">${escapeHtml(repoUrl)}</a>`
    : "先填写报名信息或 GitHub 仓库，系统再生成检查结果。";
  const sourceCards = [
    progressSourceCard(
      "GitHub 账号",
      profile ? `@${profile.login}` : "可选登录",
      profile?.oauth
        ? "已通过 GitHub OAuth 授权；只读取公开资料和邮箱。"
        : "可用 GitHub 一键登录自动带入账号；也可以只填写公开仓库地址。",
      profile ? "ok" : ""
    ),
    progressSourceCard(
      "报名信息",
      hasRegistration ? "已填写" : "待填写",
      hasRegistration
        ? (registration.email || "已保存项目名称或 GitHub 仓库，可继续检查仓库。")
        : "先完成项目申报，后续才能匹配审核、奖励和验收状态。",
      hasRegistration ? "ok" : "todo"
    ),
  ];

  if (hasBackendRecord || registration.backendMode === "local" || registration.backendError) {
    sourceCards.push(progressSourceCard(
      "报名记录",
      hasBackendRecord ? "已同步" : "待同步",
      hasBackendRecord
        ? "赛方可基于这条记录审核和更新流程；报名编号不作为查询凭证。"
        : "当前仅保留浏览器本地进度，后续请以正式提交结果为准。",
      hasBackendRecord ? "ok" : "todo"
    ));
  }
  if (hasImportedFeishu) {
    sourceCards.push(progressSourceCard(
      "赛方报名数据",
      hasFeishuMatch ? "已匹配" : feishu.proposal,
      hasFeishuMatch ? `通过${feishu.matchField}匹配，状态来自赛方数据。` : "赛方已同步报名数据，但还没有匹配到当前项目。",
      hasFeishuMatch ? "ok" : "todo"
    ));
  }
  if (hasShowcaseState) {
    sourceCards.push(progressSourceCard(
      "作品墙状态",
      feishu.showcase || "待上墙",
      "通过验收或表现突出的项目可进入展示墙。",
      statusDone(feishu.showcase) ? "ok" : ""
    ));
  }
  if (lastNotification) {
    sourceCards.push(progressSourceCard(
      "通知状态",
      lastNotification.status || "已记录",
      lastNotification.subject || lastNotification.error || "赛方已生成通知记录。",
      lastNotification.status === "sent" ? "ok" : ""
    ));
  }
  const avatarMarkup = renderAvatar(profile);

  dashboard.innerHTML = `
    <div class="progress-user-row">
      ${avatarMarkup ? `<div class="progress-avatar">${avatarMarkup}</div>` : ""}
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
    ${renderProgressFlow(registration, check, feishu, profile)}
    <div class="progress-data-source-grid">
      ${sourceCards.join("")}
    </div>
    ${renderCheckArea(checks, hasRepo)}
    <div class="progress-dashboard-actions">
      ${profile ? "" : `<a class="button primary" href="#progress-login">使用 GitHub 登录</a>`}
      <button class="button ${profile ? "primary" : "secondary"}" type="button" data-action="recheck-repo">${repoUrl ? "检查公开仓库" : "填写仓库后检查"}</button>
      <a class="button secondary" href="${PROPOSAL_FORM_URL}" target="_blank" rel="noreferrer">项目申报入口</a>
      <a class="button secondary" href="${hostedPage("register.html")}">${hasRegistration ? "更新报名信息" : "填写官网报名"}</a>
      ${hasRegistration || check ? `<a class="button secondary" href="${ACCEPTANCE_FORM_URL}" target="_blank" rel="noreferrer">提交验收</a>` : ""}
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
  const registration = getRegistration();
  const check = getCheck();
  const hasProject = Boolean(registration.projectName || registration.githubRepo || check?.repoUrl);

  plans.innerHTML = `
    <article class="path-card progress-plan-card">
      <span class="tag">项目申报</span>
      <h3>${hasProject ? "已开始，继续完善项目" : "先提交项目信息"}</h3>
      <p>提交 GitHub 仓库和一页 PDF 申报书，赛方会通过邮件反馈申报审核结果。</p>
      <div class="progress-compact-actions">
        <a class="button primary" href="${PROPOSAL_FORM_URL}" target="_blank" rel="noreferrer">项目申报入口</a>
        <a class="button secondary" href="${ACCEPTANCE_FORM_URL}" target="_blank" rel="noreferrer">提交验收</a>
      </div>
    </article>
    <article class="path-card progress-plan-card">
      <span class="tag">仓库检查</span>
      <h3>检查公开 GitHub 仓库</h3>
      <p>填写公开仓库地址后可检查 README、CI、测试、许可证和提交记录。这里只读取公开信息，不需要私有仓库权限。</p>
      <div class="progress-mini-list">
        <div><span>当前项目</span><strong>${registration.projectName ? escapeHtml(registration.projectName) : "待填写"}</strong></div>
        <div><span>GitHub 仓库</span><strong>${registration.githubRepo || check?.repoUrl ? "已填写" : "待填写"}</strong></div>
      </div>
    </article>
  `;
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
    not_configured: "Render 后端已连接，但还没有配置 GitHub OAuth App 的 Client ID / Secret。",
    denied: "你取消了 GitHub 授权。",
    state_error: "GitHub 授权状态已失效，请重新登录。",
    failed: "GitHub 授权失败，请稍后重试。",
  }[authStatus || ""];
  loginCard.innerHTML = `
    <h3>${profile?.oauth ? `已通过 GitHub 登录` : "使用 GitHub 一键登录"}</h3>
    <p>${profile?.oauth ? `当前账号 @${escapeHtml(profile.login)}，已通过 GitHub 授权读取公开资料和邮箱。` : "点击后会通过 Render 后端跳转到 GitHub 官方授权页，用户确认后返回比赛进度页；权限只申请读取公开资料和邮箱，不申请私有仓库权限。"}</p>
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
        <span>GitHub 仓库</span>
        <input name="repo" type="url" placeholder="https://github.com/owner/project" value="${escapeHtml(repo)}">
      </label>
      <label class="form-field">
        <span>联系邮箱（用于匹配报名信息）</span>
        <input name="email" type="email" placeholder="name@example.com" value="${escapeHtml(registration.email || "")}">
      </label>
      <div class="progress-page-actions">
        <button class="button primary" type="submit">检查公开仓库</button>
        <button class="button secondary" type="button" data-action="clear-progress">清除本地数据</button>
      </div>
      <p class="github-login-note">GitHub 登录只用于确认账号并同步个人进度；未登录时也可以检查公开 GitHub 仓库。</p>
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
      const saved = getRegistration().backendMode === "sqlite" ? "，并已同步到服务器" : "，当前保存到浏览器本地";
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

function fileToPayload(file) {
  if (!file) return Promise.resolve(null);
  if (file.size > MAX_UPLOAD_SIZE) {
    return Promise.reject(new Error(`${file.name} 超过 10MB，请压缩后重新上传。`));
  }
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
    <form class="registration-form" id="registration-form" action="javascript:void(0)">
      <div class="register-form-head">
        <img class="register-head-logo" src="site-assets/moonbit-logo.png?v=20260428-progress-system" alt="MoonBit Logo">
        <div>
          <h3>MoonBit 国产基础软件生态开源大赛报名</h3>
          <p>提交后进入赛方审核，并同步到比赛进度页；未连接服务器时只会本地保存非敏感信息。</p>
        </div>
      </div>
      <div class="register-github-card" id="register-github-status"></div>
      <div class="register-system-note register-prep-note">
        <strong>报名前请准备好这些材料</strong>
        <p>GitHub 公开仓库、一页 PDF 项目申报书、学生身份证明、身份证正反面水印版、银行卡号和开户支行。身份证水印建议写“仅用于 MoonBit 国产基础软件生态开源大赛奖金发放”。</p>
      </div>
      <div class="register-field-grid">
        <label class="form-field"><span>姓名</span><input name="name" required value="${escapeHtml(data.name || "")}" placeholder="请输入真实姓名"></label>
        <label class="form-field"><span>联系邮箱</span><input name="email" required type="email" value="${escapeHtml(data.email || "")}" placeholder="name@example.com"></label>
        <label class="form-field"><span>学校 / 组织</span><input name="school" required value="${escapeHtml(data.school || "")}" placeholder="用于确认学生身份"></label>
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
      <label class="form-field form-field--full"><span>项目简介</span><textarea name="summary" rows="5" required placeholder="说明项目做什么、为什么值得做、计划如何实现、最终交付什么。">${escapeHtml(data.summary || "")}</textarea></label>
      <div class="register-upload-grid">
        <label class="register-upload"><strong>项目申报书 PDF</strong><input name="proposalFile" type="file" accept=".pdf" ${requireProposal}><p>${data.proposalFileName ? `已选择：${escapeHtml(data.proposalFileName)}` : "建议一页，用于申报审核。"}</p></label>
        <label class="register-upload"><strong>学生身份证明</strong><input name="studentFile" type="file" accept=".pdf,.jpg,.jpeg,.png" ${requireStudent}><p>${data.studentFileName ? `已选择：${escapeHtml(data.studentFileName)}` : "仅用于学生身份确认，不在公开页面展示。"}</p></label>
        <label class="register-upload"><strong>身份证正面（水印版）</strong><input name="idFrontFile" type="file" accept=".pdf,.jpg,.jpeg,.png" ${requireIdFront}><p>${data.idFrontFileName ? `已选择：${escapeHtml(data.idFrontFileName)}` : "请先加水印：仅用于 MoonBit 国产基础软件生态开源大赛奖金发放。"}</p></label>
        <label class="register-upload"><strong>身份证反面（水印版）</strong><input name="idBackFile" type="file" accept=".pdf,.jpg,.jpeg,.png" ${requireIdBack}><p>${data.idBackFileName ? `已选择：${escapeHtml(data.idBackFileName)}` : "水印不要遮挡姓名、证件号、有效期等关键信息。"}</p></label>
      </div>
      <div class="register-system-note">
        <strong>敏感信息使用说明</strong>
        <p>身份证、银行卡和开户支行仅用于赛事启动支持、完成支持及优秀作品奖金发放，不会展示在公开比赛进度页或作品墙。</p>
        <p>上传身份证图片前，建议使用 AI 或图片工具添加水印，例如“仅用于 MoonBit 国产基础软件生态开源大赛奖金发放”。水印要清晰，但不要遮挡姓名、证件号、学校、有效期等核验信息。</p>
        <p>如果当前页面未连接服务器，只会在浏览器本地保存非敏感报名信息；敏感信息和证件文件需要在服务器可用时重新提交。</p>
      </div>
      <div class="progress-page-actions">
        <button class="button primary" type="submit">提交报名信息</button>
        <button class="button secondary" type="button" data-action="github-oauth">使用 GitHub 一键登录</button>
        <a class="button secondary" href="${hostedPage("progress.html")}">查看比赛进度</a>
        <a class="button secondary" href="${PROPOSAL_FORM_URL}">飞书正式报名</a>
        <button class="button secondary" type="button" data-action="export-registration">导出备份 JSON</button>
      </div>
      <div class="progress-alert" id="registration-message" hidden></div>
    </form>
  `;

  $("#registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    handleRegistrationSubmit(event.currentTarget);
  });
  renderRegisterGitHubStatus(getGitHubProfile());
  shell.querySelectorAll(".progress-page-actions [data-action='github-oauth']").forEach((button) => {
    button.addEventListener("click", () => {
      startGitHubOAuth($("#register-github-message") || $("#registration-message"));
    });
  });
  shell.querySelector("[data-action='export-registration']")?.addEventListener("click", exportRegistration);
  syncGitHubOAuthSession();
}

async function handleRegistrationSubmit(form) {
  if (form.dataset.submitting === "true") return;
  form.dataset.submitting = "true";
  const submitButton = form.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = true;
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
      msg.innerHTML = `报名成功，${escapeHtml(value.projectName || "项目")} 已写入服务器。请留在本页面查看提示；后续可使用 GitHub 登录进入 <a href="${hostedPage("progress.html")}">比赛进度页</a> 查看审核和仓库检查状态。`;
    } else {
      msg.className = "progress-alert progress-alert--error";
      msg.innerHTML = `报名没有写入服务器，只临时保存了 ${escapeHtml(value.projectName || "项目")} 的非敏感信息到当前浏览器。请不要关闭本页，稍后重新点击“提交报名信息”，或使用飞书正式报名。错误：${escapeHtml(result.error?.message || "服务器连接失败")}`;
    }
    msg.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    msg.className = "progress-alert progress-alert--error";
    msg.textContent = error.message || "保存失败，请稍后重试。";
    msg.scrollIntoView({ behavior: "smooth", block: "center" });
  } finally {
    form.dataset.submitting = "false";
    if (submitButton) submitButton.disabled = false;
  }
}

function boot() {
  if (!PUBLIC_SELF_SERVICE_ENABLED) return;
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
