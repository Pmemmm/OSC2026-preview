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
extern "js" fn is_showcase_page() -> Bool =
  #| () => window.location.pathname.endsWith("/showcase.html")

///|
#cfg(not(target="js"))
fn is_showcase_page() -> Bool {
  false
}

///|
#cfg(target="js")
extern "js" fn is_register_page() -> Bool =
  #| () => window.location.pathname.endsWith("/register.html")

///|
#cfg(not(target="js"))
fn is_register_page() -> Bool {
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
    theme: if prefers_dark_mode() {
      Dark
    } else {
      Light
    },
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
struct PrizeItem {
  award : String
  prize : String
  count : String
}

///|
struct JudgeItem {
  name : String
  title : String
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
fn site_class(theme : Theme, has_qr_float : Bool) -> String {
  if has_qr_float {
    match theme {
      Light => "site site--light site--with-qr"
      Dark => "site site--dark site--with-qr"
    }
  } else {
    match theme {
      Light => "site site--light"
      Dark => "site site--dark"
    }
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
  "https://www.gitlink.org.cn/competitions/track1_2026MoonBit"
}

///|
fn github_oauth_href() -> String {
  "https://mgpic2026.onrender.com/api/auth/github/start?return_to=%2Fprogress.html"
}

///|
fn charter_href() -> String {
  "https://bxup9uklfcb.feishu.cn/wiki/Cv5owfd9xiT9Z5k6d8scJlV0n1a"
}

///|
fn is_standalone_page() -> Bool {
  if is_progress_page() {
    true
  } else if is_showcase_page() {
    true
  } else {
    is_register_page()
  }
}

///|
fn page_href(anchor : String) -> String {
  if anchor == "showcase.html" {
    "showcase.html"
  } else if is_standalone_page() {
    match anchor {
      "#top" => "index.html#top"
      "#about" => "index.html#about"
      "#process" => "index.html#process"
      "#directions" => "index.html#directions"
      "#awards" => "index.html#awards"
      "#showcase" => "showcase.html"
      "#judges" => "index.html#judges"
      "#requirements" => "index.html#requirements"
      "#faq" => "index.html#faq"
      _ => anchor
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
    { label: t(locale, zh="作品墙", en="Showcase"), href: "showcase.html" },
    { label: t(locale, zh="评委", en="Judges"), href: "#judges" },
    { label: t(locale, zh="注意事项", en="Notes"), href: "#requirements" },
    { label: "FAQ", href: "#faq" },
  ]
}

///|
fn hero_kv_alt(locale : Locale) -> String {
  t(
    locale,
    zh="MoonBit 国产基础软件生态开源大赛主视觉",
    en="MoonBit Open Source Competition key visual",
  )
}

///|
fn summary_cards(locale : Locale) -> Array[InfoCard] {
  [
    {
      badge: t(locale, zh="参赛对象", en="Participants"),
      title: t(locale, zh="全体开发者", en="All developers"),
      desc: t(
        locale,
        zh="面向所有对 MoonBit、AI 编程、开源生态和基础软件感兴趣的开发者（不限学生或社会人士）。",
        en="Open to all developers interested in MoonBit, AI programming, open source, and infrastructure software, including students and professionals.",
      ),
    },
    {
      badge: t(locale, zh="项目规模", en="Scope"),
      title: "4~10k LOC",
      desc: t(
        locale,
        zh="参考有效 MoonBit 代码行数，重质量、边界和可维护性。",
        en="A reference range for effective MoonBit code, with quality first.",
      ),
    },
    {
      badge: t(locale, zh="基础激励", en="Base support"),
      title: "150 + 350 元",
      desc: t(
        locale,
        zh="立项启动支持 + 验收完成支持，优秀作品奖励另计。",
        en="Kickoff support plus completion support; awards are separate.",
      ),
    },
  ]
}

///|
fn about_cards(locale : Locale) -> Array[InfoCard] {
  [
    {
      badge: t(locale, zh="AI 辅助", en="AI-assisted"),
      title: t(
        locale,
        zh="用 AI 提效，但成果要可解释",
        en="Use AI, keep accountability",
      ),
      desc: t(
        locale,
        zh="AI 可用于代码生成、接口设计、测试补全和文档撰写；最终项目目标、技术路径、质量边界和开源合规由参赛者把控。",
        en="AI may help with code generation, API design, tests, and documentation. Participants remain responsible for goals, technical direction, quality boundaries, and open-source compliance.",
      ),
    },
    {
      badge: t(locale, zh="生态包", en="Packages"),
      title: t(
        locale,
        zh="聚焦开源生态库建设",
        en="Focus on ecosystem libraries",
      ),
      desc: t(
        locale,
        zh="项目可以是原创库、成熟生态库的 MoonBit 移植，也可以是围绕实际需求的开发工具或示例项目。",
        en="Projects can be original libraries, MoonBit ports of mature ecosystem libraries, developer tools, or example projects.",
      ),
    },
    {
      badge: t(locale, zh="可验收", en="Acceptable"),
      title: t(
        locale,
        zh="真实可用、可测试、可维护",
        en="Usable, tested, maintainable",
      ),
      desc: t(
        locale,
        zh="关键规则：边界清晰、文档完整、测试可运行、长期可维护，细则以赛事公告和最终章程为准。",
        en="Key rules: clear scope, complete docs, runnable tests, and long-term maintainability. Details follow official announcements and final rules.",
      ),
    },
  ]
}

///|
fn process_items(locale : Locale) -> Array[ProcessItem] {
  [
    {
      time: t(locale, zh="4 月 29 日 - 7 月 10 日", en="Apr 29 - Jul 10"),
      title: t(locale, zh="项目申报", en="Project proposal"),
      desc: t(
        locale,
        zh="通过官方表单提交参赛信息、在线仓库链接和一页 PDF 项目申报书。通过申报审核可获得 150 元启动支持。",
        en="Submit participant info, an online repository link, and a one-page PDF proposal through the official form. Approved proposals may receive RMB 150 kickoff support.",
      ),
    },
    {
      time: t(locale, zh="4 月 29 日 - 7 月 10 日", en="Apr 29 - Jul 10"),
      title: t(
        locale,
        zh="项目开发与社区活动",
        en="Development and community",
      ),
      desc: t(
        locale,
        zh="围绕公开仓库持续开发，保持提交记录、工单、合并请求和更新日志可追踪；赛事组提供指南、模板、答疑、宣讲和阶段展示。",
        en="Build in public with traceable commits, issues, pull requests, and changelogs. Organizers provide guides, templates, Q&A, talks, and stage showcases.",
      ),
    },
    {
      time: t(locale, zh="7 月 11 日 - 7 月 17 日", en="Jul 11 - Jul 17"),
      title: t(locale, zh="项目验收", en="Project acceptance"),
      desc: t(
        locale,
        zh="项目完成后按官方通知准备验收材料。通过验收可获得 350 元完成支持，启动支持与完成支持合计 500 元 / 项目。",
        en="After completion, prepare acceptance materials according to official notices. Accepted projects may receive RMB 350 completion support, for RMB 500 total base support per project.",
      ),
    },
    {
      time: t(locale, zh="8 月 4 日 - 8 月 14 日", en="Aug 4 - Aug 14"),
      title: t(locale, zh="优秀项目评选", en="Final selection"),
      desc: t(
        locale,
        zh="赛事组根据完成度、MoonBit 生态贡献、工程质量和展示表现综合评估。",
        en="Organizers evaluate completion, MoonBit ecosystem contribution, engineering quality, and presentation.",
      ),
    },
    {
      time: t(locale, zh="8 月 16 日", en="Aug 16"),
      title: t(
        locale,
        zh="线下作品展示与颁奖",
        en="Offline showcase and awards ceremony",
      ),
      desc: t(
        locale,
        zh="入选优秀项目参加线下作品展示与颁奖，具体地点和流程后续公布。",
        en="Selected outstanding projects join the offline showcase and awards ceremony. The exact venue and process will be announced later.",
      ),
    },
  ]
}

///|
fn direction_cards(locale : Locale) -> Array[ListCard] {
  [
    {
      title: t(
        locale,
        zh="基础数据结构与算法",
        en="Data structures and algorithms",
      ),
      desc: t(
        locale,
        zh="适合沉淀可复用的基础算法能力。",
        en="Reusable foundations for common algorithmic needs.",
      ),
      items: [
        t(
          locale,
          zh="常用数据结构，例如 indexmap、bitmask",
          en="Common data structures such as indexmap and bitmask",
        ),
        t(locale, zh="Graph 相关算法库", en="Graph algorithm libraries"),
        t(locale, zh="Pathfinding 工具库", en="Pathfinding libraries"),
        t(
          locale,
          zh="moon prove 验证的通用算法库",
          en="General algorithm libraries verified with moon prove",
        ),
      ],
    },
    {
      title: t(
        locale,
        zh="工程基础设施与工具链",
        en="Engineering infrastructure",
      ),
      desc: t(
        locale,
        zh="补齐 MoonBit 工程化开发常用工具。",
        en="Common tools for MoonBit engineering workflows.",
      ),
      items: [
        t(
          locale,
          zh="日志库 + tracing 工具（基于 moonbitlang/async）",
          en="Logging + tracing tools based on moonbitlang/async",
        ),
        t(
          locale,
          zh="构建工具，类似 n2 / ninja",
          en="Build tools similar to n2 / ninja",
        ),
        t(locale, zh="模板渲染器", en="Template renderer"),
        t(
          locale,
          zh="Stopwatch / benchmark 小工具",
          en="Stopwatch / benchmark helpers",
        ),
      ],
    },
    {
      title: t(
        locale,
        zh="系统能力与运行时框架",
        en="Runtime and systems",
      ),
      desc: t(
        locale,
        zh="面向更底层的运行时、并发和格式处理能力。",
        en="Lower-level runtime, concurrency, and format-processing capabilities.",
      ),
      items: [
        t(
          locale,
          zh="Deterministic simulation 框架",
          en="Deterministic simulation framework",
        ),
        t(
          locale,
          zh="编译器底层基础设施，例如寄存器分配库",
          en="Compiler infrastructure such as register allocation libraries",
        ),
        t(
          locale,
          zh="面向特定格式的（反）序列化工具，类似 protobuf",
          en="Format-specific serialization / deserialization tools similar to protobuf",
        ),
        t(
          locale,
          zh="基于 moonbitlang/async 做的并发框架，比如 actor 框架",
          en="Concurrency frameworks based on moonbitlang/async, such as actor frameworks",
        ),
      ],
    },
    {
      title: t(locale, zh="应用生态", en="Application ecosystem"),
      desc: t(
        locale,
        zh="适合做可展示、可复用的生态项目。",
        en="Presentable and reusable ecosystem projects.",
      ),
      items: [
        t(locale, zh="Markdown to HTML 工具", en="Markdown to HTML tools"),
        t(
          locale,
          zh="简易图表数据生成和预览",
          en="Simple chart data generation and preview",
        ),
        t(
          locale,
          zh="流行游戏引擎的 MoonBit 绑定",
          en="MoonBit bindings for popular game engines",
        ),
        t(
          locale,
          zh="流行数据库的 MoonBit 绑定",
          en="MoonBit bindings for popular databases",
        ),
      ],
    },
  ]
}

///|
fn showcase_signals(locale : Locale) -> Array[ShowcaseSignal] {
  [
    {
      value: t(locale, zh="待收录", en="Coming soon"),
      label: t(
        locale,
        zh="通过申报、公开开发并达到展示标准后上墙。",
        en="Projects are listed after proposal review, public development, and showcase readiness.",
      ),
    },
    {
      value: t(locale, zh="公开仓库", en="Public repo"),
      label: t(
        locale,
        zh="卡片会直接展示 GitHub、Mooncakes 和相关链接。",
        en="Cards will expose GitHub, Mooncakes, and related links.",
      ),
    },
    {
      value: t(locale, zh="持续更新", en="Updated"),
      label: t(
        locale,
        zh="项目介绍、亮点、文档和相关链接可随开发进展补充。",
        en="Profiles, highlights, docs, and related links can be added as projects evolve.",
      ),
    },
    {
      value: t(locale, zh="展示推荐", en="Promotion"),
      label: t(
        locale,
        zh="优秀项目可获得官网、社区和持续生态维护推荐。",
        en="Standout projects may receive site, community, and ecosystem-maintenance promotion.",
      ),
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
      subtitle: t(
        locale,
        zh="通过验收后展示公开仓库、Mooncakes 包和相关链接",
        en="Public repo, Mooncakes package, and related links after acceptance",
      ),
      desc: t(
        locale,
        zh="用于展示真实可用的 MoonBit 开源库：项目目标、核心 API、使用示例、测试和文档都会在卡片中清楚呈现。",
        en="For usable MoonBit open-source libraries. Goals, core APIs, examples, tests, and documentation will be shown clearly in the card.",
      ),
      highlights: [
        t(
          locale,
          zh="公开 README、源码、提交记录和许可证",
          en="Public README, source, commits, and license",
        ),
        t(
          locale,
          zh="突出核心功能、适用场景和生态价值",
          en="Highlight core features, use cases, and ecosystem value",
        ),
        t(
          locale,
          zh="保留 GitHub / Mooncakes / 项目链接入口",
          en="Reserve GitHub / Mooncakes / project entry points",
        ),
      ],
      tags: ["MoonBit", "GitHub", "Mooncakes"],
      links: [
        {
          label: t(locale, zh="项目申报", en="Submit project"),
          href: registration_href(),
        },
      ],
    },
    {
      status: t(locale, zh="待上墙", en="Pending"),
      category: t(locale, zh="开发工具", en="Tooling"),
      title: t(locale, zh="工具项目待公布", en="Tooling project TBD"),
      subtitle: t(
        locale,
        zh="适合展示 CLI、解析器、构建工具或 AI 辅助开发工具",
        en="For CLI, parsers, build tools, or AI-assisted development tools",
      ),
      desc: t(
        locale,
        zh="工具类项目会重点展示使用方式、最小示例、工程结构和可复现流程，让其他 MoonBit 开发者能直接参考。",
        en="Tooling projects will emphasize usage, minimal examples, engineering structure, and reproducible workflows for MoonBit developers.",
      ),
      highlights: [
        t(
          locale,
          zh="展示安装、运行和最小使用样例",
          en="Show installation, running, and minimal examples",
        ),
        t(
          locale,
          zh="展示 CI、测试和文档完成度",
          en="Show CI, tests, and documentation completeness",
        ),
        t(
          locale,
          zh="可补充技术文章或使用视频链接",
          en="Can include technical articles or usage videos",
        ),
      ],
      tags: [
        "MoonBit",
        t(locale, zh="工具链", en="Tooling"),
        t(locale, zh="示例", en="Examples"),
      ],
      links: [],
    },
    {
      status: t(locale, zh="待上墙", en="Pending"),
      category: t(locale, zh="高校实践", en="Campus"),
      title: t(locale, zh="高校项目待公布", en="Campus project TBD"),
      subtitle: t(
        locale,
        zh="适合展示课程、社团、训练营或实验室产出的代表项目",
        en="For representative projects from courses, clubs, bootcamps, or labs",
      ),
      desc: t(
        locale,
        zh="高校实践项目会突出共建场景、学习材料、可复用成果和持续维护计划，便于更多学生继续参与 MoonBit 生态。",
        en="Campus projects will highlight collaboration context, learning material, reusable output, and maintenance plans so more students can join the MoonBit ecosystem.",
      ),
      highlights: [
        t(
          locale,
          zh="展示作者、学校 / 社团和项目方向",
          en="Show author, campus/community, and project direction",
        ),
        t(
          locale,
          zh="展示课程实践或开源训练成果",
          en="Show course practice or open-source training output",
        ),
        t(
          locale,
          zh="优秀内容可进入社区传播和访谈",
          en="Strong projects may enter community promotion and interviews",
        ),
      ],
      tags: [
        "MoonBit",
        t(locale, zh="高校", en="Campus"),
        t(locale, zh="开源实践", en="Open Source"),
      ],
      links: [
        {
          label: t(
            locale,
            zh="报名争取上墙",
            en="Register to be featured",
          ),
          href: registration_href(),
        },
      ],
    },
  ]
}

///|
fn prize_items(locale : Locale) -> Array[PrizeItem] {
  [
    {
      award: t(locale, zh="一等奖", en="First Prize"),
      prize: t(
        locale,
        zh="18,000 元 + 获奖证书",
        en="RMB 18,000 + certificate",
      ),
      count: t(locale, zh="1 名", en="1 winner"),
    },
    {
      award: t(locale, zh="二等奖", en="Second Prize"),
      prize: t(
        locale,
        zh="10,000 元 + 获奖证书",
        en="RMB 10,000 + certificate",
      ),
      count: t(locale, zh="3 名", en="3 winners"),
    },
    {
      award: t(locale, zh="三等奖", en="Third Prize"),
      prize: t(
        locale,
        zh="5,000 元 + 获奖证书",
        en="RMB 5,000 + certificate",
      ),
      count: t(locale, zh="9 名", en="9 winners"),
    },
  ]
}

///|
fn bonus_prize_items(locale : Locale) -> Array[PrizeItem] {
  [
    {
      award: t(locale, zh="专项鼓励奖", en="Special Encouragement"),
      prize: t(
        locale,
        zh="金额及数量视实际情况确定",
        en="Amount and count TBD",
      ),
      count: t(locale, zh="若干名", en="Several"),
    },
  ]
}

///|
fn attention_items(locale : Locale) -> Array[String] {
  [
    t(
      locale,
      zh="项目申报截止到 7 月 10 日，需提交在线仓库链接和一页左右 PDF 申报书。",
      en="Proposal submission closes on July 10. Submit an online repository link and a roughly one-page PDF proposal.",
    ),
    t(
      locale,
      zh="4 月 29 日前已存在或已发布的库可以继续维护参赛，但有效工作量只统计 4 月 29 日后新增的 commits、功能、测试、文档和发布改进。",
      en="Existing or previously published libraries can join as continued-maintenance projects, but only commits, features, tests, docs, and release improvements after April 29 count.",
    ),
    t(
      locale,
      zh="验收项目需以 MoonBit 为主要实现语言，仓库公开可访问，并提供清晰 README、可运行示例、CI、测试和 mooncakes.io 发布。",
      en="For acceptance, MoonBit should be the primary language, the repository must be public, and the project should provide a clear README, runnable example, CI, tests, and mooncakes.io publication.",
    ),
    t(
      locale,
      zh="原创、移植或参考已有开源项目都可以；移植项目必须说明原项目、链接、许可证和本次移植范围。",
      en="Original projects, ports, or projects referencing existing open source are all allowed; ports must document the upstream project, link, license, and porting scope.",
    ),
    t(
      locale,
      zh="项目必须采用 OSI 认可的开源许可证，不得提交未经授权的私有代码、闭源代码、商业代码或来源不明的生成内容。",
      en="Projects must use an OSI-approved open-source license and must not include unauthorized private, closed-source, commercial, or unclear-origin generated content.",
    ),
    t(
      locale,
      zh="基础激励为 150 元启动支持 + 350 元完成支持；优秀项目奖金池单独评选，不与基础激励冲突。",
      en="Base support is RMB 150 kickoff plus RMB 350 completion support; outstanding-project awards are selected separately and do not conflict with base support.",
    ),
  ]
}

///|
fn judge_items(locale : Locale) -> Array[JudgeItem] {
  [
    {
      name: t(locale, zh="沈向洋", en="Harry Shum"),
      title: t(
        locale,
        zh="美国国家工程院外籍院士、香港科技大学校董会主席、MGPIC 赛事荣誉评委",
        en="Foreign member of the U.S. National Academy of Engineering, Council Chairman of The Hong Kong University of Science and Technology, MGPIC honorary judge",
      ),
    },
    {
      name: t(locale, zh="赵　琛", en="Chen Zhao"),
      title: t(
        locale,
        zh="中国科学院软件研究所所长、MGPIC 赛事荣誉评委",
        en="Director of the Institute of Software, Chinese Academy of Sciences, MGPIC honorary judge",
      ),
    },
    {
      name: t(locale, zh="倪明选", en="Lionel Ni"),
      title: t(
        locale,
        zh="IEEE 终身会士、香港工程科学院院士、香港科技大学（广州）创校校长、MGPIC 赛事荣誉评委",
        en="IEEE Life Fellow, Fellow of the Hong Kong Academy of Engineering Sciences, founding president of HKUST (Guangzhou), MGPIC honorary judge",
      ),
    },
  ]
}

///|
fn faq_items(locale : Locale) -> Array[FaqItem] {
  [
    {
      question: t(
        locale,
        zh="报名后如何获得反馈？",
        en="What happens after registration?",
      ),
      answer: t(
        locale,
        zh="提交项目申报表后，赛方会通过邮件通知是否通过申报审核。通过项目可获得启动支持，并进入开发与验收流程；未通过时邮件会说明原因，参赛者可以调整项目内容后继续申报。",
        en="After submitting the proposal form, organizers will notify participants by email about review results. Approved projects may receive kickoff support and continue into development and acceptance. If not approved, the email will explain why, and participants may revise and resubmit.",
      ),
      opened: true,
    },
    {
      question: t(
        locale,
        zh="之前已经发布或维护过的库还能参赛吗？",
        en="Can existing or previously published libraries join?",
      ),
      answer: t(
        locale,
        zh="可以。2026 年 4 月 29 日前已经存在、已经发布或已经有一定代码基础的库，可以按“继续维护”的方式参与；本次赛事只计算 2026 年 4 月 29 日之后产生的有效新增 commits、新功能、测试、文档和发布改进。申报时请说明项目已有基础、本次计划新增内容和新增贡献范围，避免把旧工作量重复计入本次成果。",
        en="Yes. Libraries that existed, were published, or already had code before April 29, 2026 can join as continued maintenance projects. The contest only counts effective new commits, features, tests, documentation, and release improvements made after April 29, 2026. Please describe the existing baseline, planned new work, and contribution scope in the proposal, so previous work is not counted again as contest output.",
      ),
      opened: false,
    },
    {
      question: t(
        locale,
        zh="可以移植其他语言生态里的库吗？",
        en="Can I port libraries from other ecosystems?",
      ),
      answer: t(
        locale,
        zh="可以。鼓励参考 Rust、Go、TypeScript、Python、OCaml、Scala、Java 等生态中的成熟库，但必须注明原项目、链接、许可证和移植范围。",
        en="Yes. Mature libraries from Rust, Go, TypeScript, Python, OCaml, Scala, Java, and other ecosystems are welcome, with upstream project, link, license, and scope documented.",
      ),
      opened: false,
    },
    {
      question: t(
        locale,
        zh="AI 生成代码是否允许？",
        en="Is AI-generated code allowed?",
      ),
      answer: t(
        locale,
        zh="允许合理使用 AI 辅助代码、测试、文档和移植分析，但不得提交未经授权的私有代码、闭源代码或商业代码。",
        en="Responsible AI assistance is allowed for code, tests, docs, and porting analysis, but unauthorized private, closed-source, or commercial code must not be submitted.",
      ),
      opened: false,
    },
    {
      question: t(
        locale,
        zh="项目规模一定要到 4~10k 行吗？",
        en="Must the project reach 4-10k LOC?",
      ),
      answer: t(
        locale,
        zh="这是参考范围。验收更看重项目真实可用、边界清晰、文档完整、测试可运行和后续可维护。",
        en="It is a reference range. Acceptance focuses more on usability, clear scope, complete docs, runnable tests, and maintainability.",
      ),
      opened: false,
    },
  ]
}

///|
fn section_intro(eyebrow : String, title : String, desc : String) -> Html {
  div(class="section-head", [
    p(class="eyebrow", eyebrow),
    h2(title),
    if desc == "" {
      nothing
    } else {
      p(desc)
    },
  ])
}

///|
fn section_intro_wide(eyebrow : String, title : String, desc : String) -> Html {
  div(class="section-head section-head--wide", [
    p(class="eyebrow", eyebrow),
    h2(title),
    if desc == "" {
      nothing
    } else {
      p(desc)
    },
  ])
}

///|
fn view_header(dispatch : Dispatch[Msg], model : Model) -> Html {
  header(class="site-header", [
    div(class="container nav-shell", [
      a(class="brand", href=page_href("#top"), [
        img(
          class="brand-logo",
          src="site-assets/moonbit-logo.png?v=20260428-progress-system",
          alt=t(model.locale, zh="MoonBit Logo", en="MoonBit logo"),
          nothing,
        ),
        div(class="brand-copy", [
          strong(
            t(
              model.locale,
              zh="MoonBit 国产基础软件生态开源大赛",
              en="MoonBit Open Source Contest",
            ),
          ),
          p(
            class="brand-subtitle",
            t(model.locale, zh="2026 官方网站", en="2026 Official Website"),
          ),
        ]),
      ]),
      nav(
        class="nav-links",
        nav_items(model.locale).map(fn(item) {
          a(href=page_href(item.href), item.label)
        }),
      ),
      div(class="toolbar", [
        a(
          class="nav-action nav-action--signup",
          href=registration_href(),
          t(model.locale, zh="项目申报", en="Submit"),
        ),
        button(
          class="toolbar-btn",
          on_click=dispatch(ToggleTheme),
          theme_toggle_label(model),
        ),
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
          src="site-assets/main-kv.webp?v=20260428-progress-system",
          alt=hero_kv_alt(model.locale),
          nothing,
        ),
      ]),
      div(class="hero-cta-row", [
        div(class="hero-cta-copy", [
          strong(
            t(
              model.locale,
              zh="项目申报已开放",
              en="Proposal submission is open",
            ),
          ),
          p(
            t(
              model.locale,
              zh="4 月 29 日至 7 月 10 日，提交在线仓库链接和一页 PDF 申报书。",
              en="Submit your online repository link and one-page PDF proposal from Apr 29 to Jul 10.",
            ),
          ),
        ]),
        div(class="hero-cta-actions", [
          a(
            class="button primary hero-cta-button",
            href=registration_href(),
            t(model.locale, zh="立即报名", en="Register now"),
          ),
          a(
            class="button secondary hero-cta-button",
            href="#process",
            t(model.locale, zh="查看流程", en="View process"),
          ),
          a(
            class="button secondary hero-cta-button",
            href="#requirements",
            t(model.locale, zh="注意事项", en="Notes"),
          ),
          a(
            class="button secondary hero-cta-button",
            href=charter_href(),
            target=Blank,
            rel="noreferrer",
            t(model.locale, zh="完整章程", en="Full rules"),
          ),
          a(
            class="button secondary hero-cta-button",
            href="showcase.html",
            t(model.locale, zh="作品墙", en="Showcase"),
          ),
        ]),
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
fn view_judge_row(item : JudgeItem) -> Html {
  li(class="judge-row", [
    strong(class="judge-name", item.name),
    span(class="judge-divider", "|"),
    span(class="judge-title", item.title),
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
fn view_prize_table(
  title : String,
  locale : Locale,
  items : Array[PrizeItem],
) -> Html {
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
fn view_referral_prize_card(locale : Locale) -> Html {
  article(class="prize-table-card referral-prize-card", [
    div(class="referral-prize-head", [
      h3(t(locale, zh="转推荐奖励", en="Referral Reward")),
      span(
        class="referral-prize-amount",
        t(locale, zh="50 元 / 人", en="RMB 50 / person"),
      ),
    ]),
    div(class="referral-prize-note-head", t(locale, zh="说明", en="Notes")),
    ul(class="referral-prize-list", [
      li(
        t(
          locale,
          zh="已成功报名的参赛者（推荐人），可邀请新参赛者（被推荐人）报名参赛；",
          en="Successfully registered participants (referrers) may invite new participants (referees) to register;",
        ),
      ),
      li(
        t(
          locale,
          zh="被推荐人在提交项目申报问卷时，需在“推荐人”字段准确填写推荐人的手机号码；",
          en="When submitting the project proposal form, the referee must accurately fill in the referrer's phone number in the Referrer field;",
        ),
      ),
      li(
        t(
          locale,
          zh="推荐关系认定规则：一位被推荐人只能绑定一位推荐人。若被推荐人由多人先后邀请，以报名问卷中首次有效提交的推荐人信息为准。",
          en="Referral recognition: one referee can only be linked to one referrer. If multiple people invited the same referee, the first valid referrer information submitted in the registration form prevails.",
        ),
      ),
      li(
        t(
          locale,
          zh="推荐关系一经赛事组审核确认，不予变更。推荐人与被推荐人不得相互推荐、重复推荐或通过虚假账号套取奖励，一经发现，取消比赛双方比赛资格。",
          en="Once confirmed by the organizers, the referral relationship cannot be changed. Referrers and referees may not refer each other, duplicate referrals, or claim rewards through fake accounts; violations will disqualify both parties.",
        ),
      ),
      li(
        t(
          locale,
          zh="赛事组审核确认被推荐人报名成功后，推荐人可获得 50 元 / 人的现金奖励，上限 30 人。",
          en="After organizers confirm that the referee has registered successfully, the referrer may receive RMB 50 per person in cash rewards, up to 30 people.",
        ),
      ),
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
      div(
        class="showcase-project-highlights",
        card.highlights.map(fn(item) {
          div(class="showcase-project-highlight", item)
        }),
      ),
      div(
        class="showcase-project-tags",
        card.tags.map(fn(tag) { span(class="showcase-project-tag", tag) }),
      ),
      div(
        class="showcase-project-links",
        card.links.map(fn(link) { view_showcase_link(link) }),
      ),
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
fn view_progress_page(model : Model) -> Html {
  section(
    id="progress",
    class="section section--progress progress-page-section",
    [
      div(class="container", [
        div(class="progress-portal progress-page-portal", [
          div(class="progress-copy", [
            p(
              class="eyebrow",
              t(model.locale, zh="比赛进度", en="Contest progress"),
            ),
            h2(
              t(
                model.locale,
                zh="查看比赛进度与仓库状态",
                en="Track contest progress and repository status",
              ),
            ),
            p(
              t(
                model.locale,
                zh="这里用于查看项目申报、GitHub 仓库检查、验收状态和作品展示状态。正式申报请通过官方渠道提交，并以官方表单记录为准。",
                en="Use this page to track project submission, GitHub repository checks, acceptance status, and showcase status. Official submissions must go through the official form and follow its records.",
              ),
            ),
            div(class="progress-page-actions", [
              a(
                class="button primary",
                href="#progress-login",
                t(
                  model.locale,
                  zh="使用 GitHub 登录",
                  en="Sign in with GitHub",
                ),
              ),
              a(
                class="button secondary",
                href="register.html",
                t(
                  model.locale,
                  zh="官方渠道申报",
                  en="Official submission",
                ),
              ),
              a(
                class="button secondary",
                href="index.html#top",
                t(model.locale, zh="返回赛事首页", en="Back to home"),
              ),
            ]),
          ]),
          article(
            id="progress-login",
            class="github-login-card progress-login-card",
            [
              h3(
                t(
                  model.locale,
                  zh="使用 GitHub 一键登录",
                  en="One-click GitHub sign-in",
                ),
              ),
              p(
                t(
                  model.locale,
                  zh="点击后通过 Render 后端跳转到 GitHub 官方授权页；权限只申请公开资料和邮箱，不申请私有仓库权限。",
                  en="Click to start GitHub OAuth through the Render backend. Only public profile and email scopes are requested, not private repository access.",
                ),
              ),
              a(
                class="button primary github-login-button",
                href=github_oauth_href(),
                t(
                  model.locale,
                  zh="使用 GitHub 登录",
                  en="Sign in with GitHub",
                ),
              ),
            ],
          ),
        ]),
        div(id="progress-plans", class="progress-plan-grid", [
          article(class="path-card progress-plan-card", [
            span(
              class="tag",
              t(model.locale, zh="官方渠道申报", en="Official submission"),
            ),
            h3(
              t(
                model.locale,
                zh="先通过官方渠道提交",
                en="Submit through the official channel first",
              ),
            ),
            p(
              t(
                model.locale,
                zh="通过官方渠道提交在线仓库链接和一页 PDF 申报书，赛方会通过邮件反馈申报审核结果。",
                en="Submit your online repository link and one-page PDF proposal through the official channel. The organizers will send review results by email.",
              ),
            ),
          ]),
          article(class="path-card progress-plan-card", [
            span(
              class="tag",
              t(model.locale, zh="仓库检查", en="Repository check"),
            ),
            h3(
              t(
                model.locale,
                zh="检查公开 GitHub 仓库",
                en="Check public GitHub repository",
              ),
            ),
            p(
              t(
                model.locale,
                zh="系统会检查公开仓库、README、CI、测试、许可证和提交记录，不需要私有仓库权限。",
                en="The system checks public repository data, README, CI, tests, license, and commit history without private repository permissions.",
              ),
            ),
          ]),
        ]),
        article(class="progress-dashboard progress-dashboard--preview", [
          div(
            class="progress-alert",
            t(
              model.locale,
              zh="正在加载比赛进度看板预览...",
              en="Loading progress dashboard preview...",
            ),
          ),
        ]),
      ]),
    ],
  )
}

///|
fn view_register_page(model : Model) -> Html {
  section(
    id="register-system",
    class="section section--progress progress-page-section",
    [
      div(class="container", [
        div(class="register-shell register-shell--stacked", [
          div(class="register-copy register-copy--top", [
            p(
              class="eyebrow",
              t(model.locale, zh="比赛介绍", en="Contest intro"),
            ),
            h2(
              t(
                model.locale,
                zh="MoonBit 国产基础软件生态开源大赛",
                en="MoonBit open-source contest",
              ),
            ),
            p(
              t(
                model.locale,
                zh="这是官网报名页面，用于提交项目信息、申报书和必要的身份材料。提交后进入赛方审核流程。",
                en="This website registration page is used to submit project information, proposal documents, and required identity materials. Submitted projects enter organizer review.",
              ),
            ),
            div(class="progress-page-actions", [
              a(
                class="button primary",
                href="#register-form",
                t(
                  model.locale,
                  zh="填写报名表单",
                  en="Fill registration form",
                ),
              ),
              a(
                class="button secondary",
                href="progress.html",
                t(model.locale, zh="返回比赛进度", en="Back to progress"),
              ),
              a(
                class="button secondary",
                href=registration_href(),
                t(model.locale, zh="GitLink 报名", en="GitLink registration"),
              ),
            ]),
          ]),
          article(id="register-form", class="register-form-card", [
            div(
              class="progress-alert",
              t(
                model.locale,
                zh="正在加载官网报名预览...",
                en="Loading website registration preview...",
              ),
            ),
          ]),
        ]),
      ]),
    ],
  )
}

///|
fn view_about(model : Model) -> Html {
  section(id="about", class="section", [
    div(class="container", [
      section_intro_wide(
        t(model.locale, zh="赛事定位", en="Positioning"),
        t(
          model.locale,
          zh="用 MoonBit，一起建设国产开源生态",
          en="Build an open-source ecosystem with MoonBit",
        ),
        t(
          model.locale,
          zh="以 MoonBit 编程语言及其工具链为基础，面向全体开发者（不限学生或社会人士），鼓励参赛者利用 AI 工具完成开源生态库、开发工具和示例工程的设计、移植、实现与完善。",
          en="Based on MoonBit and its toolchain, the contest is open to all developers, including students and professionals, and encourages AI-assisted design, porting, implementation, and improvement of ecosystem libraries, developer tools, and example projects.",
        ),
      ),
      div(
        class="summary-grid position-summary-grid",
        summary_cards(model.locale).map(fn(card) { view_info_card(card) }),
      ),
      div(
        class="card-grid",
        about_cards(model.locale).map(fn(card) { view_info_card(card) }),
      ),
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
          h2(
            t(
              model.locale,
              zh="优秀项目奖金池 15 万元",
              en="RMB 150,000 award pool",
            ),
          ),
          p(
            t(
              model.locale,
              zh="通过验收的项目可继续参与优秀项目评选。基础共建激励不计入优秀项目奖金，完成一个可用 MoonBit 包也能获得基础支持。",
              en="Accepted projects can continue into the outstanding-project selection. Base support is separate from the award pool, so usable MoonBit packages can receive support too.",
            ),
          ),
          div(class="prize-pills", [
            span(
              t(
                model.locale,
                zh="基础激励 500 元 / 项目",
                en="RMB 500 base support / project",
              ),
            ),
            span(
              t(
                model.locale,
                zh="一等奖 18,000 元 + 获奖证书",
                en="First Prize RMB 18,000 + certificate",
              ),
            ),
            span(
              t(
                model.locale,
                zh="专项鼓励奖视实际情况确定",
                en="Special Encouragement TBD",
              ),
            ),
            span(
              t(
                model.locale,
                zh="推荐他人成功参赛 50 元 / 人",
                en="Referral reward RMB 50 / person",
              ),
            ),
          ]),
        ]),
        div(class="prize-total-card", [
          span(t(model.locale, zh="总奖金池", en="Award Pool")),
          strong("150,000"),
          p(t(model.locale, zh="元人民币", en="RMB")),
          a(
            class="button primary",
            href=registration_href(),
            t(model.locale, zh="立即报名", en="Register now"),
          ),
        ]),
      ]),
      div(class="prize-table-grid", [
        view_prize_table(
          t(
            model.locale,
            zh="优秀项目奖励",
            en="Outstanding Project Awards",
          ),
          model.locale,
          prize_items(model.locale),
        ),
        view_prize_table(
          t(model.locale, zh="专项奖励", en="Special Awards"),
          model.locale,
          bonus_prize_items(model.locale),
        ),
        view_referral_prize_card(model.locale),
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
            t(
              model.locale,
              zh="项目通过申报、公开开发和验收后，会按作品卡片集中展示",
              en="Projects are featured as cards after proposal review, public development, and acceptance",
            ),
            t(
              model.locale,
              zh="参考 MoonBit 展示墙的信息结构：公开仓库、项目简介、核心亮点、标签和相关链接都放在同一张卡片里。",
              en="Following the MoonBit showcase pattern, each card groups the public repository, project summary, highlights, tags, and related links together.",
            ),
          ),
          a(
            class="button secondary",
            href=registration_href(),
            t(
              model.locale,
              zh="报名争取上墙",
              en="Register to be featured",
            ),
          ),
        ]),
        div(
          class="showcase-signal-grid",
          showcase_signals(model.locale).map(fn(signal) {
            view_showcase_signal(signal)
          }),
        ),
      ]),
      div(class="showcase-wall-list-head", [
        p(t(model.locale, zh="展示位预留", en="Reserved slots")),
        h3(
          t(
            model.locale,
            zh="通过验收的优秀项目会按下面格式更新",
            en="Accepted projects will be updated in this format",
          ),
        ),
      ]),
      div(
        class="showcase-wall-grid",
        showcase_projects(model.locale).map(fn(card) {
          view_showcase_project(card)
        }),
      ),
    ]),
  ])
}

///|
fn view_process(model : Model) -> Html {
  section(id="process", class="section section--alt", [
    div(class="container", [
      section_intro(
        t(model.locale, zh="比赛流程", en="Process"),
        t(
          model.locale,
          zh="项目申报、开发、验收、评选展示",
          en="Proposal, development, acceptance, final showcase",
        ),
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
          tbody(
            process_items(model.locale).map(fn(item) { view_process_row(item) }),
          ),
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
        t(
          model.locale,
          zh="从一个可发布的 MoonBit 包开始",
          en="Start with one publishable MoonBit package",
        ),
        t(
          model.locale,
          zh="项目可以原创，也可以移植成熟生态里的开源库；避免直接重复 MoonBit 生态中已有且功能高度重合的成熟项目。",
          en="Projects can be original or ports of mature open-source libraries, while avoiding mature MoonBit projects with highly overlapping functionality.",
        ),
      ),
      div(
        class="showcase-grid direction-grid",
        direction_cards(model.locale).map(fn(card) { view_list_card(card) }),
      ),
    ]),
  ])
}

///|
fn view_judges(model : Model) -> Html {
  section(id="judges", class="section section--alt", [
    div(class="container", [
      section_intro_wide(
        t(model.locale, zh="赛事荣誉评委", en="Honorary Judges"),
        t(model.locale, zh="由学术界与工程界专家共同见证优秀项目", en="Recognizing outstanding projects with academic and engineering leadership"),
        t(
          model.locale,
          zh="赛事荣誉评委将为优秀项目评选提供权威支持，帮助更多 MoonBit 生态项目被看见。",
          en="Honorary judges provide authoritative support for the final selection and help outstanding MoonBit ecosystem projects gain visibility.",
        ),
      ),
      article(class="judge-panel", [
        ul(
          class="judge-list",
          judge_items(model.locale).map(fn(item) { view_judge_row(item) }),
        ),
      ]),
    ]),
  ])
}

///|
fn view_requirements(model : Model) -> Html {
  section(id="requirements", class="section", [
    div(class="container", [
      section_intro(
        t(model.locale, zh="注意事项", en="Notes"),
        t(
          model.locale,
          zh="报名、开发、验收前先确认这些关键信息",
          en="Confirm these key points before registration, development, and acceptance",
        ),
        t(
          model.locale,
          zh="这里合并放置参赛过程中最容易漏掉的信息，包含报名材料、有效工作量、验收底线、开源合规和奖励说明。",
          en="This section collects the most commonly missed information, including proposal materials, valid work scope, acceptance baseline, open-source compliance, and rewards.",
        ),
      ),
      div(class="requirements-layout", [
        article(class="path-card checklist-card", [
          span(class="tag", t(model.locale, zh="参赛必读", en="Must read")),
          h3(
            t(
              model.locale,
              zh="重要信息清单",
              en="Key information checklist",
            ),
          ),
          ul(
            class="path-points",
            attention_items(model.locale).map(fn(item) { li(item) }),
          ),
          div(class="checklist-actions", [
            a(
              class="button primary",
              href=registration_href(),
              t(model.locale, zh="项目申报", en="Submit proposal"),
            ),
          ]),
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
      div(
        class="faq-list",
        faq_items(model.locale).map(fn(item) { view_faq_item(item) }),
      ),
    ]),
  ])
}

///|
fn view_footer(model : Model) -> Html {
  footer(class="site-footer", [
    div(class="container footer-inner", [
      div(class="footer-copy", [
        strong(
          t(
            model.locale,
            zh="MoonBit 国产基础软件生态开源大赛",
            en="MoonBit Open Source Contest",
          ),
        ),
        p(
          t(
            model.locale,
            zh="2026 官方网站",
            en="2026 MoonBit Open Source Ecosystem Competition",
          ),
        ),
      ]),
      div(class="footer-links", [
        a(
          href="https://www.moonbitlang.cn/",
          target=Blank,
          rel="noreferrer",
          t(model.locale, zh="MoonBit 中文官网", en="MoonBit website"),
        ),
        a(
          href="https://mooncakes.io/",
          target=Blank,
          rel="noreferrer",
          "Mooncakes",
        ),
        a(
          href="https://github.com/zongen01/MGPIC2026",
          target=Blank,
          rel="noreferrer",
          "GitHub",
        ),
      ]),
    ]),
  ])
}

///|
fn view(dispatch : Dispatch[Msg], model : Model) -> Html {
  div(class=site_class(model.theme, false), [
    view_header(dispatch, model),
    if is_progress_page() {
      main_(class="page-main", [view_progress_page(model)])
    } else if is_showcase_page() {
      main_(class="page-main", [view_showcase_wall(model)])
    } else if is_register_page() {
      main_(class="page-main", [view_register_page(model)])
    } else {
      main_(class="page-main", [
        view_hero(model),
        view_about(model),
        view_awards(model),
        view_process(model),
        view_directions(model),
        view_judges(model),
        view_requirements(model),
        view_faq(model),
      ])
    },
    view_footer(model),
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
