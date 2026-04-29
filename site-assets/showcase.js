const DEFAULT_RENDER_API_BASE = "https://mgpic2026.onrender.com";

const $ = (selector, root = document) => root.querySelector(selector);

const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#039;",
}[char]));

function apiBase() {
  if (/github\.io$/i.test(window.location.hostname)) return DEFAULT_RENDER_API_BASE;
  return "";
}

function projectText(project) {
  return [
    project.projectName,
    project.projectType,
    project.summary,
    project.githubRepo,
    project.author,
    project.school,
    ...(project.tags || []),
  ].join(" ").toLowerCase();
}

function highlights(summary) {
  const parts = String(summary || "")
    .split(/[。；;.!?\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return (parts.length ? parts : ["公开仓库、项目简介和相关链接会在这里集中展示。"]).slice(0, 3);
}

function projectCard(project) {
  const repo = project.githubRepo || "";
  const tags = project.tags?.length ? project.tags : [project.projectType || "MoonBit 生态"];
  return `
    <article class="showcase-project-card" data-showcase-project>
      <div class="showcase-project-body">
        <div class="showcase-project-meta">
          <span>${escapeHtml(project.projectType || "MoonBit 生态")}</span>
          <span>${escapeHtml(project.showcaseStatus || "已上墙")}</span>
        </div>
        <h3 class="showcase-project-title">${escapeHtml(project.projectName || "未命名项目")}</h3>
        <p class="showcase-project-subtitle">${escapeHtml(project.author || "MoonBit 参赛者")}${project.school ? ` · ${escapeHtml(project.school)}` : ""}</p>
        <p class="showcase-project-desc">${escapeHtml(project.summary || "项目说明待补充。")}</p>
        <div class="showcase-project-highlights">
          ${highlights(project.summary).map((item) => `<div class="showcase-project-highlight">${escapeHtml(item)}</div>`).join("")}
        </div>
        <div class="showcase-project-tags">
          ${tags.slice(0, 5).map((tag) => `<span class="showcase-project-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="showcase-project-links">
          ${repo ? `<a class="showcase-project-link" href="${escapeHtml(repo)}" target="_blank" rel="noreferrer">GitHub 仓库</a>` : ""}
        </div>
      </div>
    </article>
  `;
}

function emptyState(message) {
  return `
    <article class="showcase-empty-state">
      <strong>作品墙等待更新</strong>
      <p>${escapeHtml(message)}</p>
      <div class="showcase-project-links">
        <a class="showcase-project-link" href="register.html">提交项目申报</a>
      </div>
    </article>
  `;
}

function renderProjects(grid, projects, query = "") {
  const normalized = query.trim().toLowerCase();
  const rows = normalized
    ? projects.filter((project) => projectText(project).includes(normalized))
    : projects;
  if (!projects.length) {
    grid.innerHTML = emptyState("通过验收并由官方标记为“已上墙”的项目会自动展示在这里。");
    return;
  }
  grid.innerHTML = rows.map(projectCard).join("") || emptyState("没有匹配当前搜索条件的项目。");
}

async function loadShowcaseProjects(panel, grid) {
  const status = $("#showcase-live-status", panel);
  const input = $("#showcase-search", panel);
  try {
    const response = await fetch(`${apiBase()}/api/showcase`);
    if (!response.ok) throw new Error(`接口 ${response.status}`);
    const payload = await response.json();
    const projects = payload.projects || [];
    if (status) {
      status.textContent = projects.length
        ? `已同步 ${projects.length} 个官方上墙项目`
        : "暂无正式上墙项目，当前保留展示位";
    }
    renderProjects(grid, projects);
    input?.addEventListener("input", () => renderProjects(grid, projects, input.value));
  } catch {
    if (status) status.textContent = "暂时无法连接后端，当前显示静态展示位";
  }
}

function enhanceShowcase() {
  const panel = $(".showcase-wall-panel");
  const grid = $(".showcase-wall-grid");
  if (!panel || !grid || panel.dataset.enhanced === "true") return;
  panel.dataset.enhanced = "true";
  const head = $(".showcase-wall-list-head", panel);
  const toolbar = document.createElement("div");
  toolbar.className = "showcase-live-toolbar";
  toolbar.innerHTML = `
    <label>
      <span>搜索作品</span>
      <input id="showcase-search" type="search" placeholder="项目名 / 作者 / 方向 / 标签">
    </label>
    <p id="showcase-live-status">正在同步官方作品墙数据...</p>
  `;
  head?.insertAdjacentElement("afterend", toolbar);
  loadShowcaseProjects(panel, grid);
}

window.addEventListener("DOMContentLoaded", enhanceShowcase);
window.addEventListener("load", enhanceShowcase);
