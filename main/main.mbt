///|
using @html {
  a,
  article,
  button,
  details,
  div,
  footer,
  h2,
  h3,
  header,
  img,
  li,
  main_,
  nav,
  nothing,
  p,
  section,
  span,
  strong,
  summary,
  table,
  tbody,
  td,
  th,
  thead,
  tr,
  ul,
}

///|
using @rabbita {type Cmd, type Dispatch, type Html}

///|
#cfg(target="js")
extern "js" fn get_initial_locale() -> Locale =
  #| () => new URLSearchParams(window.location.search).get("lang") === "en" ? 1 : 0

///|
#cfg(not(target="js"))
fn get_initial_locale() -> Locale {
  Zh
}

///|
#cfg(target="js")
extern "js" fn is_progress_page() -> Bool =
  #| () => window.location.pathname.endsWith("/progress.html")

///|
#cfg(not(target="js"))
fn is_progress_page() -> Bool {
  false
}

///|
#cfg(target="js")
extern "js" fn prefers_dark_mode() -> Bool =
  #| () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches

///|
#cfg(not(target="js"))
fn prefers_dark_mode() -> Bool {
  true
}

///|
enum Locale {
  Zh
  En
}

///|
enum Theme {
  Light
  Dark
}

///|
struct Model {
  locale : Locale
  theme : Theme
}

///|
fn initial_model() -> Model {
  {
    locale: get_initial_locale(),
    theme: if prefers_dark_mode() { Dark } else { Light },
  }
}

///|
enum Msg {
  ToggleTheme
}

///|
fn update(dispatch : Dispatch[Msg], msg : Msg, model : Model) -> (Cmd, Model) {
  ignore(dispatch)
  match msg {
    ToggleTheme =>
      (
        @rabbita.none,
        {
          ..model,
          theme: match model.theme {
            Light => Dark
            Dark => Light
          },
        },
      )
  }
}

///|
fn t(locale : Locale, zh~ : String, en~ : String) -> String {
  match locale {
    Zh => zh
    En => en
  }
}

///|
struct NavItem {
  label : String
  href : String
}

///|
struct InfoCard {
  badge : String
  title : String
  desc : String
}

///|
struct ListCard {
  title : String
  desc : String
  items : Array[String]
}

///|
struct ProcessItem {
  time : String
  title : String
  desc : String
}

///|
struct ProgressStep {
  class_name : String
  index : String
  title : String
  desc : String
  status : String
}

///|
struct PrizeItem {
  award : String
  prize : String
  count : String
}

///|
struct ShowcaseSignal {
  value : String
  label : String
}

///|
struct ShowcaseLink {
  label : String
  href : String
}

///|
struct ShowcaseProject {
  status : String
  category : String
  title : String
  subtitle : String
  desc : String
  highlights : Array[String]
  tags : Array[String]
  links : Array[ShowcaseLink]
}

///|
struct FaqItem {
  question : String
  answer : String
  opened : Bool
}

///|
fn site_class(theme : Theme) -> String {
  match theme {
    Light => "site site--light"
    Dark => "site site--dark"
  }
}

///|
fn theme_toggle_label(model : Model) -> String {
  match model.theme {
    Light => t(model.locale, zh="夜间", en="Dark")
    Dark => t(model.locale, zh="日间", en="Light")
  }
}

///|
fn registration_href() -> String {
  "https://bxup9uklfcb.feishu.cn/share/base/form/shrcn2duseEVtk3e4sTRA8z5Qyf"
}

///|
fn acceptance_href() -> String {
  "https://bxup9uklfcb.feishu.cn/share/base/form/shrcnlOdTfQUDNW5raWrQDqVTQg"
}

///|
fn page_href(anchor : String) -> String {
  if is_progress_page() {
    match anchor {
      "#top" => "index.html#top"
      "#about" => "index.html#about"
      "#process" => "index.html#process"
      "#directions" => "index.html#directions"
      "#awards" => "index.html#awards"
      "#showcase" => "index.html#showcase"
      "#requirements" => "index.html#requirements"
      "#faq" => "index.html#faq"
      _ => "index.html"
    }
  } else {
    anchor
  }
}

///|
fn nav_items(locale : Locale) -> Array[NavItem] {
  [
    { label: t(locale, zh="定位", en="About"), href: "#about" },
    { label: t(locale, zh="流程", en="Process"), href: "#process" },
    { label: t(locale, zh="方向", en="Directions"), href: "#directions" },
    { label: t(locale, zh="奖励", en="Awards"), href: "#awards" },
    { label: t(locale, zh="作品墙", en="Showcase"), href: "#showcase" },
    { label: t(locale, zh="验收", en="Acceptance"), href: "#requirements" },
    { label: "FAQ", href: "#faq" },
  ]
}

///|
fn hero_kv_alt(locale : Locale) -> String {
  t(
    locale,
    zh="MoonBit 开源大赛主视觉",
    en="MoonBit Open Source Competition key visual",
  )
}

///|
fn summary_cards(locale : Locale) -> Array[InfoCard] {
  [
    {
      badge: t(locale, zh="参赛对象", en="Participants"),
      title: t(locale, zh="在校生开放", en="Students"),
      desc: t(locale, zh="面向所有对 MoonBit、AI 编程、开源生态和基础软件感兴趣的在校生。", en="Open to students interested in MoonBit, AI programming, open source, and infrastructure software."),
    },
    {
      badge: t(locale, zh="项目规模", en="Scope"),
      title: "4~10k LOC",
      desc: t(locale, zh="参考有效 MoonBit 代码行数，重质量、边界和可维护性。", en="A reference range for effective MoonBit code, with quality first."),
    },
    {
      badge: t(locale, zh="基础激励", en="Base support"),
      title: "150 + 350 元",
      desc: t(locale, zh="立项启动支持 + 验收完成支持，优秀作品奖励另计。", en="Kickoff support plus completion support; awards are separate."),
    },
  ]
}

///|
fn about_cards(locale : Locale) -> Array[InfoCard] {
  [
    {
      badge: t(locale, zh="AI 辅助", en="AI-assisted"),
      title: t(locale, zh="用 AI 提效，但成果要可解释", en="Use AI, keep accountability"),
      desc: t(locale, zh="AI 可用于代码生成、接口设计、测试补全和文档撰写；最终项目目标、技术路径、质量边界和开源合规由参赛者把控。", en="AI may help with code generation, API design, tests, and documentation. Participants remain responsible for goals, technical direction, quality boundaries, and open-source compliance."),
    },
    {
      badge: t(locale, zh="生态包", en="Packages"),
      title: t(locale, zh="聚焦开源生态库建设", en="Focus on ecosystem libraries"),
      desc: t(locale, zh="项目可以是原创库、成熟生态库的 MoonBit 移植，也可以是围绕实际需求的开发工具或示例项目。", en="Projects can be original libraries, MoonBit ports of mature ecosystem libraries, developer tools, or example projects."),
    },
    {
      badge: t(locale, zh="可验收", en="Acceptable"),
      title: t(locale, zh="真实可用、可测试、可维护", en="Usable, tested, maintainable"),
      desc: t(locale, zh="官网只保留关键规则：边界清晰、文档完整、测试可运行、后续可维护，细则以后续正式章程为准。", en="The site keeps the key rules: clear scope, complete docs, runnable tests, and maintainability. Details follow the official rules."),
    },
  ]
}

///|
fn process_items(locale : Locale) -> Array[ProcessItem] {
  [
    {
      time: t(locale, zh="即日起 - 7/1", en="Now - Jul 1"),
      title: t(locale, zh="项目申报", en="Project proposal"),
      desc: t(locale, zh="通过官方表单提交参赛信息、GitHub 仓库和一页 PDF 项目申报书；仓库需包含 10-20 个有效 commits。通过申报审核可获得 150 元启动支持。", en="Submit participant info, GitHub repository, and a one-page PDF proposal through the official form. The repository should contain 10-20 valid commits. Approved proposals may receive RMB 150 kickoff support."),
    },
    {
      time: t(locale, zh="即日起 - 7/1", en="Now - Jul 1"),
      title: t(locale, zh="项目开发与社区活动", en="Development and community"),
      desc: t(locale, zh="围绕公开仓库持续开发，保持提交记录、工单、合并请求和更新日志可追踪；赛事组提供指南、模板、答疑、宣讲和阶段展示。", en="Build in public with traceable commits, issues, pull requests, and changelogs. Organizers provide guides, templates, Q&A, talks, and stage showcases."),
    },
    {
      time: t(locale, zh="6/1 - 7/1", en="Jun 1 - Jul 1"),
      title: t(locale, zh="项目验收", en="Project acceptance"),
      desc: t(locale, zh="项目完成后通过验收表提交申请。通过验收可获得 350 元完成支持，启动支持与完成支持合计 500 元 / 项目。", en="After completion, submit the acceptance form. Accepted projects may receive RMB 350 completion support, for RMB 500 total base support per project."),
    },
    {
      time: t(locale, zh="7/5", en="Jul 5"),
      title: t(locale, zh="优秀项目评选与展示", en="Final selection and showcase"),
      desc: t(locale, zh="赛事组根据完成度、MoonBit 生态贡献、工程质量和展示表现综合评估，入选项目需要参加决赛答辩。", en="Organizers evaluate completion, MoonBit ecosystem contribution, engineering quality, and presentation. Selected projects join the final defense."),
    },
  ]
}

///|
fn progress_steps(locale : Locale) -> Array[ProgressStep] {
  [
    {
      class_name: "progress-step progress-step--done",
      index: "01",
      title: t(locale, zh="GitHub 账号", en="GitHub account"),
      desc: t(locale, zh="用于识别参赛者、关联项目仓库和同步公开提交记录。", en="Used to identify the participant, link the project repository, and sync public commits."),
      status: t(locale, zh="已连接", en="Connected"),
    },
    {
      class_name: "progress-step progress-step--active",
      index: "02",
      title: t(locale, zh="项目申报", en="Proposal"),
      desc: t(locale, zh="提交报名表后可显示申报审核状态、项目名称和联系邮箱。", en="After submission, this can show proposal review status, project name, and contact email."),
      status: t(locale, zh="待同步", en="Pending sync"),
    },
    {
      class_name: "progress-step progress-step--active",
      index: "03",
      title: t(locale, zh="仓库进度", en="Repository progress"),
      desc: t(locale, zh="计划展示 GitHub 仓库、有效提交数、README、CI、测试和许可证状态。", en="Planned to show repository, valid commits, README, CI, tests, and license status."),
      status: t(locale, zh="检查中", en="Checking"),
    },
    {
      class_name: "progress-step",
      index: "04",
      title: t(locale, zh="验收与展示", en="Acceptance and showcase"),
      desc: t(locale, zh="项目完成后可查看验收材料、审核反馈、奖励状态和作品墙展示状态。", en="After completion, this can show acceptance materials, feedback, reward status, and showcase status."),
      status: t(locale, zh="未开始", en="Not started"),
    },
  ]
}

///|
fn direction_cards(locale : Locale) -> Array[ListCard] {
  [
    {
      title: t(locale, zh="入门友好型", en="Starter"),
      desc: t(locale, zh="适合第一次参与 MoonBit 开源生态。", en="Good first MoonBit ecosystem projects."),
      items: [
        t(locale, zh="日志库 / tracing 工具（可基于 moonbitlang/async）", en="Logging / tracing, optionally based on moonbitlang/async"),
        t(locale, zh="indexmap、bitmask、Stopwatch / benchmark 小工具", en="indexmap, bitmask, Stopwatch / benchmark helpers"),
        t(locale, zh="模板渲染器、deterministic simulation 框架", en="Template renderer or deterministic simulation framework"),
      ],
    },
    {
      title: t(locale, zh="标准生态包", en="Ecosystem packages"),
      desc: t(locale, zh="补齐 MoonBit 常用开发能力。", en="Fill common MoonBit development gaps."),
      items: [
        t(locale, zh="Graph 相关算法库、Pathfinding 工具库", en="Graph algorithms and pathfinding libraries"),
        t(locale, zh="通用算法库，可结合 moon prove 验证", en="General algorithm libraries, optionally verified with moon prove"),
        t(locale, zh="编译器底层基础设施，例如寄存器分配库", en="Compiler infrastructure such as register allocation libraries"),
      ],
    },
    {
      title: t(locale, zh="工具与格式", en="Tools and formats"),
      desc: t(locale, zh="适合官网展示和社区传播。", en="Good for demos and community sharing."),
      items: [
        t(locale, zh="Markdown to HTML", en="Markdown to HTML"),
        t(locale, zh="构建工具，类似 n2 / ninja", en="Build tools similar to n2 / ninja"),
        t(locale, zh="特定格式的序列化 / 反序列化工具，类似 protobuf", en="Format-specific serialization / deserialization tools similar to protobuf"),
      ],
    },
    {
      title: t(locale, zh="绑定与应用", en="Bindings and applications"),
      desc: t(locale, zh="适合做可演示、可复用的生态项目。", en="Good for demonstrable and reusable ecosystem projects."),
      items: [
        t(locale, zh="小型 2D 游戏工具库或流行游戏引擎绑定", en="Small 2D game toolkits or popular game-engine bindings"),
        t(locale, zh="流行数据库的 MoonBit 绑定", en="MoonBit bindings for popular databases"),
        t(locale, zh="基于 moonbitlang/async 的并发框架，例如 actor 框架", en="Concurrency frameworks based on moonbitlang/async, such as actor frameworks"),
      ],
    },
  ]
}

///|
fn showcase_signals(locale : Locale) -> Array[ShowcaseSignal] {
  [
    {
      value: t(locale, zh="待收录", en="Coming soon"),
      label: t(locale, zh="通过申报、公开开发并达到展示标准后上墙。", en="Projects are listed after proposal review, public development, and showcase readiness."),
    },
    {
      value: t(locale, zh="公开仓库", en="Public repo"),
      label: t(locale, zh="卡片会直接展示 GitHub、Mooncakes 和 Demo 入口。", en="Cards will expose GitHub, Mooncakes, and demo links."),
    },
    {
      value: t(locale, zh="持续更新", en="Updated"),
      label: t(locale, zh="项目介绍、亮点、文档和演示可随开发进展补充。", en="Profiles, highlights, docs, and demos can be added as projects evolve."),
    },
    {
      value: t(locale, zh="展示推荐", en="Promotion"),
      label: t(locale, zh="优秀项目可获得官网、社区和后续生态维护推荐。", en="Standout projects may receive site, community, and ecosystem-maintenance promotion."),
    },
  ]
}

///|
fn showcase_projects(locale : Locale) -> Array[ShowcaseProject] {
  [
    {
      status: t(locale, zh="待上墙", en="Pending"),
      category: t(locale, zh="生态库", en="Library"),
      title: t(locale, zh="项目名称待公布", en="Project name TBD"),
      subtitle: t(locale, zh="通过验收后展示公开仓库、Mooncakes 包和 Demo", en="Public repo, Mooncakes package, and demo after acceptance"),
      desc: t(locale, zh="用于展示真实可用的 MoonBit 开源库：项目目标、核心 API、使用示例、测试和文档都会在卡片中清楚呈现。", en="For usable MoonBit open-source libraries. Goals, core APIs, examples, tests, and documentation will be shown clearly in the card."),
      highlights: [
        t(locale, zh="公开 README、源码、提交记录和许可证", en="Public README, source, commits, and license"),
        t(locale, zh="突出核心功能、适用场景和生态价值", en="Highlight core features, use cases, and ecosystem value"),
        t(locale, zh="保留 GitHub / Mooncakes / Demo 入口", en="Reserve GitHub / Mooncakes / Demo entry points"),
      ],
      tags: ["MoonBit", "GitHub", "Mooncakes"],
      links: [
        { label: t(locale, zh="项目申报", en="Submit project"), href: registration_href() },
      ],
    },
    {
      status: t(locale, zh="待上墙", en="Pending"),
      category: t(locale, zh="开发工具", en="Tooling"),
      title: t(locale, zh="工具项目待公布", en="Tooling project TBD"),
      subtitle: t(locale, zh="适合展示 CLI、解析器、构建工具或 AI 辅助开发工具", en="For CLI, parsers, build tools, or AI-assisted development tools"),
      desc: t(locale, zh="工具类项目会重点展示使用方式、最小示例、工程结构和可复现流程，让其他 MoonBit 开发者能直接参考。", en="Tooling projects will emphasize usage, minimal examples, engineering structure, and reproducible workflows for MoonBit developers."),
      highlights: [
        t(locale, zh="展示安装、运行和最小使用样例", en="Show installation, running, and minimal examples"),
        t(locale, zh="展示 CI、测试和文档完成度", en="Show CI, tests, and documentation completeness"),
        t(locale, zh="可补充技术文章或演示视频链接", en="Can include technical articles or demo videos"),
      ],
      tags: ["MoonBit", t(locale, zh="工具链", en="Tooling"), t(locale, zh="示例", en="Examples")],
      links: [
        { label: t(locale, zh="验收入口", en="Acceptance form"), href: acceptance_href() },
      ],
    },
    {
      status: t(locale, zh="待上墙", en="Pending"),
      category: t(locale, zh="高校实践", en="Campus"),
      title: t(locale, zh="高校项目待公布", en="Campus project TBD"),
      subtitle: t(locale, zh="适合展示课程、社团、训练营或实验室产出的代表项目", en="For representative projects from courses, clubs, bootcamps, or labs"),
      desc: t(locale, zh="高校实践项目会突出共建场景、学习材料、可复用成果和后续维护计划，便于更多学生继续参与 MoonBit 生态。", en="Campus projects will highlight collaboration context, learning material, reusable output, and maintenance plans so more students can join the MoonBit ecosystem."),
      highlights: [
        t(locale, zh="展示作者、学校 / 社团和项目方向", en="Show author, campus/community, and project direction"),
        t(locale, zh="展示课程实践或开源训练成果", en="Show course practice or open-source training output"),
        t(locale, zh="优秀内容可进入社区传播和访谈", en="Strong projects may enter community promotion and interviews"),
      ],
      tags: ["MoonBit", t(locale, zh="高校", en="Campus"), t(locale, zh="开源实践", en="Open Source")],
      links: [
        { label: t(locale, zh="报名争取上墙", en="Register to be featured"), href: registration_href() },
      ],
    },
  ]
}

///|
fn prize_items(locale : Locale) -> Array[PrizeItem] {
  [
    { award: t(locale, zh="特等奖", en="Grand Prize"), prize: "15,000 元", count: "1 名" },
    { award: t(locale, zh="一等奖", en="First Prize"), prize: "10,000 元", count: "1 名" },
    { award: t(locale, zh="二等奖", en="Second Prize"), prize: "8,000 元", count: "2 名" },
    { award: t(locale, zh="三等奖", en="Third Prize"), prize: "6,000 元", count: "3 名" },
  ]
}

///|
fn bonus_prize_items(locale : Locale) -> Array[PrizeItem] {
  [
    { award: t(locale, zh="生态优异奖", en="Ecosystem Excellence"), prize: "4,000 元", count: t(locale, zh="若干名", en="Several") },
    { award: t(locale, zh="专项鼓励奖", en="Special Encouragement"), prize: t(locale, zh="金额及数量视实际情况确定", en="Amount and count TBD"), count: t(locale, zh="若干名", en="Several") },
  ]
}

///|
fn acceptance_items(locale : Locale) -> Array[String] {
  [
    t(locale, zh="MoonBit 为主要实现语言，仓库公开可访问。", en="MoonBit is the primary language and the repository is public."),
    t(locale, zh="README 写清目标、安装、使用方法、示例和可复现方式。", en="README covers goals, installation, usage, examples, and reproducibility."),
    t(locale, zh="源代码结构清晰，能够完成声明的核心功能。", en="Source structure is clear and implements the declared core functionality."),
    t(locale, zh="CI 覆盖检查、构建、测试流程，并提供覆盖核心功能路径的测试。", en="CI covers checks, build, tests, and tests for core functionality paths."),
    t(locale, zh="至少一个可运行示例，并发布到 mooncakes.io。", en="At least one runnable example and publication to mooncakes.io."),
    t(locale, zh="采用 OSI 认可的开源许可证；移植项目需符合原项目许可证要求。", en="Use an OSI-approved open-source license; ports must comply with upstream license requirements."),
  ]
}

///|
fn faq_items(locale : Locale) -> Array[FaqItem] {
  [
    {
      question: t(locale, zh="报名后如何获得反馈？", en="What happens after registration?"),
      answer: t(locale, zh="提交项目申报表后，赛方会通过邮件通知是否通过申报审核。通过项目可获得启动支持，并进入开发与验收流程；未通过时邮件会说明原因，参赛者可以调整项目内容后继续申报。", en="After submitting the proposal form, organizers will notify participants by email about review results. Approved projects may receive kickoff support and continue into development and acceptance. If not approved, the email will explain why, and participants may revise and resubmit."),
      opened: true,
    },
    {
      question: t(locale, zh="之前已经发布或维护过的库还能参赛吗？", en="Can existing or previously published libraries join?"),
      answer: t(locale, zh="可以。2026 年 4 月 29 日前已经存在、已经发布或已经有一定代码基础的库，可以按“继续维护”的方式参与；本次赛事只计算 2026 年 4 月 29 日之后产生的有效新增 commits、新功能、测试、文档和发布改进。申报时请说明项目已有基础、本次计划新增内容和新增贡献范围，避免把旧工作量重复计入本次成果。", en="Yes. Libraries that existed, were published, or already had code before April 29, 2026 can join as continued maintenance projects. The contest only counts effective new commits, features, tests, documentation, and release improvements made after April 29, 2026. Please describe the existing baseline, planned new work, and contribution scope in the proposal, so previous work is not counted again as contest output."),
      opened: false,
    },
    {
      question: t(locale, zh="可以移植其他语言生态里的库吗？", en="Can I port libraries from other ecosystems?"),
      answer: t(locale, zh="可以。鼓励参考 Rust、Go、TypeScript、Python、OCaml、Scala、Java 等生态中的成熟库，但必须注明原项目、链接、许可证和移植范围。", en="Yes. Mature libraries from Rust, Go, TypeScript, Python, OCaml, Scala, Java, and other ecosystems are welcome, with upstream project, link, license, and scope documented."),
      opened: false,
    },
    {
      question: t(locale, zh="AI 生成代码是否允许？", en="Is AI-generated code allowed?"),
      answer: t(locale, zh="允许合理使用 AI 辅助代码、测试、文档和移植分析，但不得提交未经授权的私有代码、闭源代码或商业代码。", en="Responsible AI assistance is allowed for code, tests, docs, and porting analysis, but unauthorized private, closed-source, or commercial code must not be submitted."),
      opened: false,
    },
    {
      question: t(locale, zh="项目规模一定要到 4~10k 行吗？", en="Must the project reach 4-10k LOC?"),
      answer: t(locale, zh="这是参考范围。验收更看重项目真实可用、边界清晰、文档完整、测试可运行和后续可维护。", en="It is a reference range. Acceptance focuses more on usability, clear scope, complete docs, runnable tests, and maintainability."),
      opened: false,
    },
    {
      question: t(locale, zh="验收什么时候开放？", en="When does acceptance open?"),
      answer: t(locale, zh="验收申请计划于 6 月 1 日至 7 月 1 日开放。项目完成后可通过验收表提交申请，通过验收的项目可获得 350 元 / 项目的完成支持，并继续参与优秀项目评选。", en="Acceptance is planned from June 1 to July 1. Completed projects can submit the acceptance form. Accepted projects may receive RMB 350 completion support and continue into the final selection."),
      opened: false,
    },
  ]
}

///|
fn section_intro(eyebrow : String, title : String, desc : String) -> Html {
  div(class="section-head", [
    p(class="eyebrow", eyebrow),
    h2(title),
    if desc == "" { nothing } else { p(desc) },
  ])
}

///|
fn view_header(dispatch : Dispatch[Msg], model : Model) -> Html {
  header(class="site-header", [
    div(class="container nav-shell", [
      a(class="brand", href=page_href("#top"), [
        img(
          class="brand-logo",
          src="site-assets/moonbit-logo.png?v=20260428-progress-page",
          alt=t(model.locale, zh="MoonBit Logo", en="MoonBit logo"),
          nothing,
        ),
        div(class="brand-copy", [
          strong(t(model.locale, zh="MoonBit 开源大赛", en="MoonBit Open Source Contest")),
          p(
            class="brand-subtitle",
            t(model.locale, zh="2026 国产开源生态大赛", en="2026 Open Source Ecosystem Competition"),
          ),
        ]),
      ]),
      nav(class="nav-links", nav_items(model.locale).map(fn(item) {
        a(href=page_href(item.href), item.label)
      })),
      div(class="toolbar", [
        a(
          class="nav-action nav-action--signup",
          href=registration_href(),
          t(model.locale, zh="项目申报", en="Submit"),
        ),
        a(
          class="nav-action nav-action--progress",
          href="progress.html",
          t(model.locale, zh="个人进度（开发中）", en="Progress (in development)"),
        ),
        button(class="toolbar-btn", on_click=dispatch(ToggleTheme), theme_toggle_label(model)),
      ]),
    ]),
  ])
}

///|
fn view_hero(model : Model) -> Html {
  section(id="top", class="hero hero--clean", [
    div(class="container", [
      div(class="hero-banner hero-banner--kv", [
        img(
          class="hero-kv-image",
          src="site-assets/main-kv.png?v=20260428-progress-page",
          alt=hero_kv_alt(model.locale),
          nothing,
        ),
      ]),
    ]),
  ])
}

///|
fn view_info_card(card : InfoCard) -> Html {
  article(class="info-card", [
    span(class="tag", card.badge),
    h3(card.title),
    p(card.desc),
  ])
}

///|
fn view_list_card(card : ListCard) -> Html {
  article(class="showcase-card direction-card", [
    h3(card.title),
    p(card.desc),
    ul(class="path-points", card.items.map(fn(item) { li(item) })),
  ])
}

///|
fn view_process_row(item : ProcessItem) -> Html {
  tr([
    td(class="process-table-time", item.time),
    td(class="process-table-title", item.title),
    td(class="process-table-desc", item.desc),
  ])
}

///|
fn view_prize_row(item : PrizeItem) -> Html {
  tr([
    td(class="prize-table-award", item.award),
    td(class="prize-table-money", item.prize),
    td(class="prize-table-count", item.count),
  ])
}

///|
fn view_prize_table(title : String, locale : Locale, items : Array[PrizeItem]) -> Html {
  article(class="prize-table-card", [
    h3(title),
    table(class="prize-table", [
      thead([
        tr([
          th(t(locale, zh="奖项", en="Award")),
          th(t(locale, zh="奖金", en="Prize")),
          th(t(locale, zh="数量", en="Count")),
        ]),
      ]),
      tbody(items.map(fn(item) { view_prize_row(item) })),
    ]),
  ])
}

///|
fn view_showcase_signal(signal : ShowcaseSignal) -> Html {
  article(class="showcase-signal-card", [
    strong(signal.value),
    span(signal.label),
  ])
}

///|
fn view_showcase_link(link : ShowcaseLink) -> Html {
  a(class="showcase-project-link", href=link.href, link.label)
}

///|
fn view_showcase_project(card : ShowcaseProject) -> Html {
  article(class="showcase-project-card", [
    div(class="showcase-project-body", [
      div(class="showcase-project-meta", [
        span(card.status),
        span(card.category),
      ]),
      h3(class="showcase-project-title", card.title),
      p(class="showcase-project-subtitle", card.subtitle),
      p(class="showcase-project-desc", card.desc),
      div(class="showcase-project-highlights", card.highlights.map(fn(item) {
        div(class="showcase-project-highlight", item)
      })),
      div(class="showcase-project-tags", card.tags.map(fn(tag) {
        span(class="showcase-project-tag", tag)
      })),
      div(class="showcase-project-links", card.links.map(fn(link) {
        view_showcase_link(link)
      })),
    ]),
  ])
}

///|
fn view_faq_item(item : FaqItem) -> Html {
  details(class="faq-item", open=item.opened, [
    summary(item.question),
    p(item.answer),
  ])
}

///|
fn view_progress_step(step : ProgressStep) -> Html {
  article(class=step.class_name, [
    span(class="progress-step-index", step.index),
    div([
      div(class="progress-step-top", [
        h3(step.title),
        span(class="progress-status", step.status),
      ]),
      p(step.desc),
    ]),
  ])
}

///|
fn view_progress_page(model : Model) -> Html {
  section(id="progress", class="section section--progress progress-page-section", [
    div(class="container", [
      div(class="progress-portal progress-page-portal", [
        div(class="progress-copy", [
          p(class="eyebrow", t(model.locale, zh="个人进度", en="Personal progress")),
          h2(t(model.locale, zh="GitHub 登录查看比赛进程", en="Track contest progress with GitHub")),
          p(
            t(
              model.locale,
              zh="用于展示参赛者从报名、仓库建设、验收到作品展示的个人状态。当前为试验版，只验证页面结构和交互入口。",
              en="Shows a participant's status from registration and repository work to acceptance and showcase. This is an experimental page for layout and interaction validation.",
            ),
          ),
          div(class="progress-page-actions", [
            a(class="button primary", href=registration_href(), t(model.locale, zh="提交项目申报", en="Submit proposal")),
            a(class="button secondary", href="index.html#top", t(model.locale, zh="返回赛事首页", en="Back to home")),
          ]),
        ]),
        article(class="progress-dashboard", [
          div(class="progress-user-row", [
            div(class="progress-avatar", "M"),
            div([
              strong("@moonbit-builder"),
              p(t(model.locale, zh="GitHub 已连接 · 试验数据", en="GitHub connected · test data")),
            ]),
            span(class="toolbar-btn progress-logout", t(model.locale, zh="退出测试登录", en="Exit test login")),
          ]),
          div(class="progress-meter", [
            div(class="progress-meter-fill", nothing),
          ]),
          div(class="progress-summary-grid", [
            div(class="progress-summary-item", [
              span(t(model.locale, zh="当前阶段", en="Current stage")),
              strong(t(model.locale, zh="申报审核", en="Proposal review")),
            ]),
            div(class="progress-summary-item", [
              span(t(model.locale, zh="仓库检查", en="Repo check")),
              strong("2 / 6"),
            ]),
            div(class="progress-summary-item", [
              span(t(model.locale, zh="下一步", en="Next")),
              strong(t(model.locale, zh="补充 README / CI", en="Add README / CI")),
            ]),
          ]),
          div(class="progress-step-list", progress_steps(model.locale).map(fn(step) {
            view_progress_step(step)
          })),
        ]),
      ]),
    ]),
  ])
}

///|
fn view_about(model : Model) -> Html {
  section(id="about", class="section", [
    div(class="container", [
      section_intro(
        t(model.locale, zh="赛事定位", en="Positioning"),
        t(model.locale, zh="用 MoonBit，一起建设国产开源生态", en="Build an open-source ecosystem with MoonBit"),
        t(model.locale, zh="以 MoonBit 编程语言及其工具链为基础，面向在校生群体，鼓励参赛者利用 AI 工具完成开源生态库、开发工具和示例工程的设计、移植、实现与完善。", en="Based on MoonBit and its toolchain, the contest is open to students and encourages AI-assisted design, porting, implementation, and improvement of ecosystem libraries, developer tools, and example projects."),
      ),
      div(class="summary-grid position-summary-grid", summary_cards(model.locale).map(fn(card) {
        view_info_card(card)
      })),
      div(class="card-grid", about_cards(model.locale).map(fn(card) { view_info_card(card) })),
    ]),
  ])
}

///|
fn view_awards(model : Model) -> Html {
  section(id="awards", class="section section--prize", [
    div(class="container", [
      div(class="prize-spotlight", [
        div(class="prize-copy", [
          p(class="eyebrow", t(model.locale, zh="奖金激励", en="Awards")),
          h2(t(model.locale, zh="优秀项目奖金池 15 万元", en="RMB 150,000 award pool")),
          p(
            t(
              model.locale,
              zh="通过验收的项目可继续参与优秀项目评选。基础共建激励不计入优秀项目奖金，完成一个可用 MoonBit 包也能获得基础支持。",
              en="Accepted projects can continue into the outstanding-project selection. Base support is separate from the award pool, so usable MoonBit packages can receive support too.",
            ),
          ),
          div(class="prize-pills", [
            span(t(model.locale, zh="基础激励 500 元 / 项目", en="RMB 500 base support / project")),
            span(t(model.locale, zh="特等奖 15,000 元", en="Grand Prize RMB 15,000")),
            span(t(model.locale, zh="生态优异奖 4,000 元", en="Ecosystem Excellence RMB 4,000")),
          ]),
        ]),
        div(class="prize-total-card", [
          span(t(model.locale, zh="总奖金池", en="Award Pool")),
          strong("150,000"),
          p(t(model.locale, zh="元人民币", en="RMB")),
          a(class="button primary", href=registration_href(), t(model.locale, zh="立即报名", en="Register now")),
        ]),
      ]),
      div(class="prize-table-grid", [
        view_prize_table(t(model.locale, zh="优秀项目奖励", en="Outstanding Project Awards"), model.locale, prize_items(model.locale)),
        view_prize_table(t(model.locale, zh="生态与专项奖励", en="Ecosystem and Special Awards"), model.locale, bonus_prize_items(model.locale)),
      ]),
    ]),
  ])
}

///|
fn view_showcase_wall(model : Model) -> Html {
  section(id="showcase", class="section section--showcase-wall", [
    div(class="container", [
      div(class="showcase-wall-panel", [
        div(class="showcase-wall-head", [
          section_intro(
            t(model.locale, zh="优秀作品展示墙", en="Showcase Wall"),
            t(model.locale, zh="项目通过申报、公开开发和验收后，会按作品卡片集中展示", en="Projects are featured as cards after proposal review, public development, and acceptance"),
            t(model.locale, zh="参考 MoonBit 展示墙的信息结构：公开仓库、项目简介、核心亮点、标签和后续演示入口都放在同一张卡片里。", en="Following the MoonBit showcase pattern, each card groups the public repository, project summary, highlights, tags, and demo links together."),
          ),
          a(class="button secondary", href=registration_href(), t(model.locale, zh="报名争取上墙", en="Register to be featured")),
        ]),
        div(class="showcase-signal-grid", showcase_signals(model.locale).map(fn(signal) {
          view_showcase_signal(signal)
        })),
      ]),
      div(class="showcase-wall-list-head", [
        p(t(model.locale, zh="展示位预留", en="Reserved slots")),
        h3(t(model.locale, zh="后续收录的优秀项目会按下面格式更新", en="Accepted projects will be updated in this format")),
      ]),
      div(class="showcase-wall-grid", showcase_projects(model.locale).map(fn(card) {
        view_showcase_project(card)
      })),
    ]),
  ])
}

fn view_process(model : Model) -> Html {
  section(id="process", class="section section--alt", [
    div(class="container", [
      section_intro(
        t(model.locale, zh="比赛流程", en="Process"),
        t(model.locale, zh="项目申报、开发、验收、评选展示", en="Proposal, development, acceptance, final showcase"),
        "",
      ),
      div(class="process-table-wrap", [
        table(class="process-table", [
          thead([
            tr([
              th(t(model.locale, zh="时间", en="Time")),
              th(t(model.locale, zh="流程", en="Stage")),
              th(t(model.locale, zh="说明", en="Details")),
            ]),
          ]),
          tbody(process_items(model.locale).map(fn(item) { view_process_row(item) })),
        ]),
      ]),
    ]),
  ])
}

///|
fn view_directions(model : Model) -> Html {
  section(id="directions", class="section", [
    div(class="container", [
      section_intro(
        t(model.locale, zh="项目方向", en="Directions"),
        t(model.locale, zh="从一个可发布的 MoonBit 包开始", en="Start with one publishable MoonBit package"),
        t(model.locale, zh="项目可以原创，也可以移植成熟生态里的开源库；避免直接重复 MoonBit 生态中已有且功能高度重合的成熟项目。", en="Projects can be original or ports of mature open-source libraries, while avoiding mature MoonBit projects with highly overlapping functionality."),
      ),
      div(class="showcase-grid direction-grid", direction_cards(model.locale).map(fn(card) {
        view_list_card(card)
      })),
    ]),
  ])
}

///|
fn view_requirements(model : Model) -> Html {
  section(id="requirements", class="section", [
    div(class="container", [
      section_intro(
        t(model.locale, zh="验收要求", en="Acceptance"),
        t(model.locale, zh="提交前至少满足这些条件", en="Meet these basics before submission"),
        "",
      ),
      div(class="requirements-layout", [
        article(class="path-card checklist-card", [
          span(class="tag", t(model.locale, zh="验收底线", en="Acceptance")),
          h3(t(model.locale, zh="验收清单", en="Acceptance checklist")),
          ul(class="path-points", acceptance_items(model.locale).map(fn(item) { li(item) })),
          a(class="button secondary", href=acceptance_href(), t(model.locale, zh="验收入口", en="Acceptance form")),
        ]),
      ]),
    ]),
  ])
}

///|
fn view_join(model : Model) -> Html {
  section(id="join", class="section", [
    div(class="container", [
      div(class="join-card join-card--clean", [
        div(class="join-copy", [
          p(class="eyebrow", t(model.locale, zh="下一步", en="Next")),
          h2(
            t(
              model.locale,
              zh="项目申报入口已开放，\n先提交一页 PDF 申报书",
              en="Registration is open. Submit your proposal first.",
            ),
          ),
          p(
            t(
              model.locale,
              zh="请通过项目申报表提交个人信息、项目 GitHub 链接和一页左右 PDF 申报书。赛方会通过邮件反馈审核结果。",
              en="Use the form to submit your information, project GitHub link, and concise proposal. Organizers will follow up by email.",
            ),
          ),
        ]),
        div(class="join-actions", [
          a(
            class="button primary",
            href=registration_href(),
            t(model.locale, zh="提交项目申报", en="Submit proposal"),
          ),
          a(
            class="button secondary",
            href="#process",
            t(model.locale, zh="查看流程", en="View process"),
          ),
          a(
            class="button secondary",
            href="#requirements",
            t(model.locale, zh="查看验收", en="View acceptance"),
          ),
        ]),
      ]),
    ]),
  ])
}

///|
fn view_faq(model : Model) -> Html {
  section(id="faq", class="section section--alt", [
    div(class="container", [
      section_intro(
        "FAQ",
        t(model.locale, zh="常见问题", en="Frequently asked questions"),
        "",
      ),
      div(class="faq-list", faq_items(model.locale).map(fn(item) { view_faq_item(item) })),
    ]),
  ])
}

///|
fn view_qq_float(model : Model) -> Html {
  div(class="qq-float", [
    a(class="qr-float-card qr-float-card--primary", href=registration_href(), [
      div(class="qq-float-copy", [
        strong(t(model.locale, zh="项目申报", en="Proposal")),
        p(t(model.locale, zh="扫码提交申报表", en="Scan to submit")),
      ]),
      div(class="qq-qr-box", [
        img(
          class="qq-qr-img",
          src="site-assets/registration-qr.png?v=20260428-progress-page",
          alt=t(model.locale, zh="赛事报名二维码", en="Event registration QR code"),
          nothing,
        ),
      ]),
    ]),
    div(class="qr-float-card", [
      div(class="qq-float-copy", [
        strong(t(model.locale, zh="赛事交流群", en="QQ Group")),
        p(t(model.locale, zh="扫码加入 QQ 群", en="Scan to join")),
      ]),
      div(class="qq-qr-box", [
        img(
          class="qq-qr-img",
          src="site-assets/qq-group-qr.png?v=20260428-progress-page",
          alt=t(model.locale, zh="赛事 QQ 群二维码", en="Event QQ group QR code"),
          nothing,
        ),
      ]),
    ]),
  ])
}

///|
fn view_footer(model : Model) -> Html {
  footer(class="site-footer", [
    div(class="container footer-inner", [
      div(class="footer-copy", [
        strong(t(model.locale, zh="MoonBit 开源大赛", en="MoonBit Open Source Contest")),
        p(t(model.locale, zh="2026 MoonBit 国产开源生态大赛", en="2026 MoonBit Open Source Ecosystem Competition")),
      ]),
      div(class="footer-links", [
        a(href="https://www.moonbitlang.cn/", target=Blank, rel="noreferrer", t(model.locale, zh="MoonBit 中文官网", en="MoonBit website")),
        a(href="https://mooncakes.io/", target=Blank, rel="noreferrer", "Mooncakes"),
        a(href="https://github.com/zongen01/MGPIC2026", target=Blank, rel="noreferrer", "GitHub"),
      ]),
    ]),
  ])
}

///|
fn view(dispatch : Dispatch[Msg], model : Model) -> Html {
  div(class=site_class(model.theme), [
    view_header(dispatch, model),
    if is_progress_page() {
      main_(class="page-main", [
        view_progress_page(model),
      ])
    } else {
      main_(class="page-main", [
        view_hero(model),
        view_about(model),
        view_awards(model),
        view_showcase_wall(model),
        view_process(model),
        view_directions(model),
        view_requirements(model),
        view_join(model),
        view_faq(model),
      ])
    },
    view_footer(model),
    if is_progress_page() { nothing } else { view_qq_float(model) },
  ])
}

///|
#warnings("-alert_unstable")
fn main {
  let (_, app) = @rabbita.cell_with_dispatch(
    model=initial_model(),
    update~,
    view~,
  )
  @rabbita.new(app).mount("mgpic-app")
}
