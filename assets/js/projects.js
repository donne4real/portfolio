/* ============================================================
   Portfolio data — single source of truth for leyeajibola.com
   Every link is verified live; every metric is measured.
   Supports dual reading modes:
     - Technical (default, optimized for AI/ML hiring managers)
     - Plain English (accessible non-technical descriptions)

   VERIFIED 25 Nov 2026 against live Cloudflare apps and repos.
   ============================================================ */

const CATEGORIES = [
  { id: "all",          label: "All projects" },
  { id: "ai",           label: "AI & ML" },
  { id: "faith",        label: "African Languages & Faith" },
  { id: "finance",      label: "Finance & Markets" },
  { id: "learning",     label: "Education & Media" },
  { id: "productivity", label: "Productivity & Tools" },
  { id: "health",       label: "Healthcare" }
];

const FLAGSHIP = {
  title: "Aso Oke",
  status: "Ships 13 Dec 2026",
  subtitleTech: "Yorùbá ASR & NMT · Solo, built in public on a $400 budget",
  subtitlePlain: "Yorùbá speech-to-text & translation · Solo, built in public on a $400 budget",
  summaryTech: [
    "Built end-to-end against pre-registered evaluation gates: a Unicode NFD diacritic normalizer (preserving tonal orthography like <code>ẹ</code> vs <code>e</code>, validated on 200 sentences), a licence-audited dataset pipeline, and documented kill criteria written <em>before</em> training began.",
    "The decisive engineering result was a disciplined reversal. An 8-epoch LoRA fine-tune of Whisper large-v3 reached <strong>61.4% WER</strong> — improving over Whisper's <strong>92.6%</strong> zero-shot baseline, yet still missing the pre-registered pass gate. Meta's Apache-2.0 <code>omniASR_LLM_1B</code> hit <strong>32.0% WER</strong> zero-shot on FLEURS test (817 clips) and <strong>27.7% WER</strong> on unseen community speakers, so I shipped it over my own fine-tune and logged the full tradeoff.",
    "For translation, <code>madlad400-3b-mt</code> + a MAFAND LoRA adapter (merged <code>fp16</code> on Hugging Face ZeroGPU) cut inference to <strong>1.99s p95</strong> (<code>yo→en</code>) and <strong>2.51s p95</strong> (<code>en→yo</code>) with a 52-entry proper-noun glossary. Because BLEU (<strong>11.7 / 8.0</strong>) still trails its 25-point quality gate, translation ships transparently with a visible quality disclaimer rather than hiding the gap."
  ],
  summaryPlain: [
    "I measured the starting point first, then built against it: a text-cleaning tool that keeps Yorùbá tone marks intact (where <code>ẹ</code> and <code>e</code> are different letters, checked on 200 real sentences), a data pipeline where every source was checked for commercial licence rights before use, and a pass mark written down <em>before</em> any result existed.",
    "The most important outcome is the one that didn't go to plan. I trained the industry-standard speech model myself across eight rounds, and it still got <strong>61.4% of words wrong</strong> — missing the pass mark I'd set. A different open-licence model, used out of the box, reached <strong>32.0%</strong> (and <strong>27.7%</strong> on voices it had never heard). I shipped it instead of my own fine-tuned model and documented why.",
    "For translation, an optimization pass brought response times down to <strong>1.99–2.51 seconds</strong> for 95% of requests. Accuracy (<strong>11.7 / 8.0 out of 100</strong> against a pass mark of 25) still falls short of the bar I set, so the translator launches with an honest, visible disclaimer instead of pretending to be finished."
  ],
  factsTech: [
    ["32.0% WER", "FLEURS Yorùbá test (817 clips) vs 92.6% Whisper large-v3 baseline (−60.6 pts)"],
    ["27.7% WER", "Unseen holdout speakers on 20-speaker community eval set"],
    ["32.8% WER", "Women's voices (measured separately after finding FLEURS val/test are 100% male)"],
    ["1.99s / 2.51s", "p95 ZeroGPU fp16 merged inference latency (yo→en / en→yo)"],
    ["11.7 / 8.0 BLEU", "Translation quality vs 25-point gate — shipped with visible disclaimer"]
  ],
  factsPlain: [
    ["32.0%", "Words wrong on an 817-clip test set — down 60.6 points from 92.6% for the best prior tool"],
    ["27.7%", "Words wrong on speakers the model had never heard before"],
    ["32.8%", "Words wrong on women's voices — measured separately because the standard benchmark is 100% male"],
    ["1.99s / 2.51s", "Response time for 95% of translation requests (Yorùbá→English / English→Yorùbá)"],
    ["11.7 / 8.0", "Translation quality score (out of 100, pass mark 25) — launched with an honest disclaimer"]
  ],
  benchmarks: [
    { label: "Whisper large-v3 (zero-shot baseline)", value: 92.6, tone: "bad",  note: "Baseline" },
    { label: "Whisper large-v3 + 8-epoch LoRA",       value: 61.4, tone: "warn", note: "Missed gate" },
    { label: "omniASR_LLM_1B (women's voices)",       value: 32.8, tone: "good", note: "Community eval" },
    { label: "omniASR_LLM_1B (FLEURS test, 817)",     value: 32.0, tone: "ship", note: "Shipped" },
    { label: "omniASR_LLM_1B (unseen speakers)",      value: 27.7, tone: "ship", note: "Holdout" }
  ],
  stack: [
    "Python", "PyTorch", "LoRA / PEFT", "omniASR_LLM_1B", "MADLAD-400",
    "Whisper large-v3", "Gradio 5", "HF ZeroGPU", "W&B", "Unicode NFD"
  ],
  discipline: [
    "Pre-registered pass gates & kill criteria written before training",
    "Commercial licence audit on every model & dataset in Week 1",
    "Gender-balanced & unseen-speaker community validation",
    "Public decision log & honest model cards"
  ],
  links: [
    { label: "View repository", href: "https://github.com/donne4real/aso-oke", primary: true },
    { label: "Hugging Face adapter", href: "https://huggingface.co/donne4real/aso-oke-madlad-lora", external: true }
  ]
};

const PROJECTS = [
  /* ---------- AI & ML ---------- */
  {
    id: "naija-news",
    category: "ai",
    title: "Naija News Digest",
    kind: "Automated multi-LLM RSS pipeline",
    status: "live",
    featured: true,
    descTech: "Daily automated Nigerian news aggregator: ingests multi-outlet RSS feeds, deduplicates and ranks stories, summarizes via Claude Haiku with Gemini + 8-provider fallback, and deploys static HTML, JSON, search index, archive and RSS via GitHub Actions to Cloudflare Pages.",
    descPlain: "An automated daily Nigerian news briefing. It gathers stories from major outlets, removes duplicates, writes concise AI summaries with automatic backup models, and publishes a fast searchable archive every morning.",
    tags: ["Python", "Claude API", "Gemini", "GitHub Actions", "Cloudflare Pages", "pytest"],
    metrics: [
      ["LLM pipeline", "Claude + Gemini fallback"],
      ["Outputs", "HTML, JSON, search & RSS"],
      ["Publishing", "Automated daily CI"]
    ],
    links: [
      { label: "Live", href: "https://news.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/naija-news" }
    ]
  },
  {
    id: "sermon-listener",
    category: "ai",
    title: "Sermon Listener",
    kind: "Real-time browser ASR + Claude synthesis",
    status: "live",
    featured: true,
    descTech: "Streams live browser Web Speech API transcription with real-time regex scripture extraction, then sends text to Claude via Cloudflare Workers to generate structured summaries, main points and passage indices. Raw audio never leaves the device.",
    descPlain: "Press start and it transcribes a live sermon right in your browser, spots Bible verses as they are spoken, and uses AI to generate a clean summary and passage list — without ever uploading your audio.",
    tags: ["React", "Vite", "SpeechRecognition", "Claude API", "Cloudflare Workers"],
    metrics: [
      ["Audio upload", "Zero (in-browser ASR)"],
      ["Verse detection", "Live regex extraction"],
      ["Backend", "Cloudflare Workers"]
    ],
    links: [
      { label: "Live", href: "https://sermons.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/sermon-listener" }
    ]
  },
  {
    id: "datainsight",
    category: "ai",
    title: "DataInsight (ExcelAI)",
    kind: "100% local-LLM spreadsheet analyst",
    status: "built",
    statusLabel: "Local app",
    descTech: "On-device Streamlit/Plotly + local-LLM workbench for multi-sheet Excel & CSV analysis: automated profiling, interactive charts, and natural-language Q&A with zero external API calls or cloud data egress.",
    descPlain: "Ask questions about your spreadsheets in plain English. The AI runs entirely on your own computer, so your files never leave your machine — no API key, no subscription, no cloud bill.",
    tags: ["Python", "Streamlit", "Plotly", "Local LLM", "Offline"],
    metrics: [
      ["Execution", "100% on-device"],
      ["Cloud egress", "None"],
      ["Inputs", "Multi-sheet Excel & CSV"]
    ],
    links: [
      { label: "Repository", href: "https://github.com/donne4real/datainsight" }
    ]
  },
  {
    id: "databricks-workshops",
    category: "ai",
    title: "Databricks Agentic & GenAI Labs",
    kind: "RAG, Mosaic AI & MLflow evaluation",
    status: "built",
    statusLabel: "4 workshops",
    descTech: "Four reproducible Databricks notebooks covering RAG with Agent Bricks, Mosaic AI Agent Framework orchestration, quantitative GenAI evaluation harnesses, and MLflow production monitoring.",
    descPlain: "Four hands-on workspaces covering how to build, test and monitor AI agents end to end — written so an engineer can follow them step by step and leave with a working system.",
    tags: ["Databricks", "Mosaic AI", "RAG", "MLflow", "Evaluation"],
    metrics: [
      ["Lab modules", "4 end-to-end"],
      ["Lifecycle", "Build, evaluate, monitor"]
    ],
    links: []
  },

  /* ---------- AFRICAN LANGUAGES & FAITH ---------- */
  {
    id: "bible-app",
    category: "faith",
    title: "Bible in African Languages",
    kind: "Offline-first PWA & Android app",
    status: "live",
    featured: true,
    descTech: "React 19 + TypeScript + Capacitor Android/web reader bundling 19 of 22 translations offline (Yorùbá, Igbo, Hausa, Twi, Pidgin, Swahili, Amharic, Arabic RTL & more), side-by-side interlinear view, Cloudflare Workers + D1 sync, and 45 automated Jest tests.",
    descPlain: "Read the Bible in 22 African and world languages — 19 of them with no internet connection at all. Includes side-by-side comparison, 4 reading plans, WhatsApp share cards, and a Google Play Android app that collects zero user data.",
    tags: ["React", "TypeScript", "Tailwind", "Cloudflare Workers", "Cloudflare D1", "Capacitor", "Jest"],
    metrics: [
      ["Translations", "22 (19 offline)"],
      ["Google Play", "50+ downloads"],
      ["Automated tests", "45 passing"]
    ],
    links: [
      { label: "Web app", href: "https://bible.leyesapps.com", external: true },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader", external: true },
      { label: "Store page", href: "https://wordup.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/bible-app" }
    ]
  },
  {
    id: "bible-verse-detector",
    category: "faith",
    title: "Bible Verse Detector",
    kind: "OCR & text scripture recognizer",
    status: "live",
    descTech: "React + TypeScript web app (Cloudflare Pages CI) with Android companion that extracts and resolves book, chapter and verse references from pasted text or photographed pages.",
    descPlain: "Paste a passage or photograph a page and it identifies the exact Bible verse — book, chapter and verse. Runs on the web and as an Android companion app.",
    tags: ["React", "TypeScript", "Vite", "OCR", "Cloudflare Pages"],
    metrics: [
      ["Inputs", "Text & images"],
      ["Platforms", "Web & Android"]
    ],
    links: [
      { label: "Live", href: "https://verses.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/bible-verse-detector-web" }
    ]
  },
  {
    id: "sermon-gate",
    category: "faith",
    title: "Sermon Gate",
    kind: "Edge-authenticated private podcast feed",
    status: "built",
    statusLabel: "Private · 48 tests",
    descTech: "Zero-dependency Cloudflare Workers + KV + R2 access gate turning a church sermon archive into a Pocket Casts-compatible members-only RSS podcast feed with URL-key auth and 48 automated Node & Playwright CI tests.",
    descPlain: "Turns a church sermon archive into a private, members-only podcast feed that works in Pocket Casts — with no external database and 48 automated checks protecting every release.",
    tags: ["Cloudflare Workers", "KV", "R2", "Playwright", "CI/CD"],
    metrics: [
      ["Automated tests", "48 (Node + Playwright)"],
      ["External DB deps", "Zero (KV + R2)"]
    ],
    links: []
  },

  /* ---------- FINANCE & MARKETS ---------- */
  {
    id: "marketsage-unified",
    category: "finance",
    title: "MarketSage Unified",
    kind: "Consolidated quant finance & AI platform",
    status: "live",
    featured: true,
    descTech: "Consolidated 11 legacy finance tools into one modular Python/Streamlit platform: 45 scoring models across stocks, ETFs, mutual funds & 100-baggers, multi-source API fallback with 24h SQLite cache, SEC EDGAR 10-K/10-Q parsing, DCF/DRIP, VaR/CVaR risk analytics, multi-LLM synthesis (with offline quant fallback) and 33 pytest tests.",
    descPlain: "One unified investing workbench replacing 11 older prototypes. Combines 45 scoring models, interactive technical charts, valuation calculators, portfolio risk stress tests, SEC filings and AI research briefs — backed by 33 automated tests.",
    tags: ["Python", "Streamlit", "Plotly", "SQLite", "SEC EDGAR", "Multi-LLM", "pytest"],
    metrics: [
      ["Investment models", "45 across 4 asset classes"],
      ["Consolidation", "11 legacy apps → 1"],
      ["Automated tests", "33 pytest passing"]
    ],
    links: [
      { label: "Live", href: "https://marketsage.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/MarketSage-Unified" }
    ]
  },
  {
    id: "ngx-tracker",
    category: "finance",
    title: "NGX Tracker",
    kind: "Automated Nigerian Exchange data pipeline",
    status: "private",
    statusLabel: "Live · Access-gated",
    descTech: "Tracks ~146 Nigerian Exchange (NGX) equities via scheduled weekday/weekend GitHub Actions pipelines (Kobo Terminal + EODHD APIs), computing trailing-12m dividend yields, movers and historical series — deployed TDD-first to Cloudflare Pages behind Cloudflare Access.",
    descPlain: "Automatically tracks daily prices and dividend yields for ~146 stocks on the Nigerian Exchange, updating on a schedule and running automated checks before every deploy.",
    tags: ["TypeScript", "React", "GitHub Actions", "Cloudflare Pages", "Cloudflare Access", "TDD"],
    metrics: [
      ["Equities tracked", "~146 NGX stocks"],
      ["Pipeline", "Weekday + weekend CI"],
      ["Security", "Cloudflare Access"]
    ],
    links: [
      { label: "Live (Access)", href: "https://ngx.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/ngx-tracker" }
    ]
  },
  {
    id: "powerball-predictor",
    category: "finance",
    title: "Powerball Predictor",
    kind: "Parity-verified statistical engine",
    status: "live",
    descTech: "Weighted frequency, hot/cold, due-number and pair analysis over 296 historical draws. Shipped as Python/Flask and a browser JS port validated for 100% numerical parity against the Python engine.",
    descPlain: "Analyses 296 past Powerball draws for hot, cold, due and pair patterns across four strategies. The browser version was tested line-by-line against the original Python engine so every output matches.",
    tags: ["Python", "Flask", "JavaScript", "Chart.js", "Statistics"],
    metrics: [
      ["Historical draws", "296"],
      ["Strategies", "4 weighted modes"],
      ["Py↔JS parity", "100% verified"]
    ],
    links: [
      { label: "Live", href: "https://powerball.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/powerball-predictor" }
    ]
  },
  {
    id: "mega-millions",
    category: "finance",
    title: "Mega Millions Analyzer",
    kind: "Desktop statistical analyzer",
    status: "built",
    statusLabel: "Desktop app",
    descTech: "Python/Tkinter desktop application fetching live draw histories from the NY Government Open Data API, computing frequency/pair distributions and exporting CSV/JSON/TXT analytical reports.",
    descPlain: "A desktop app that pulls live Mega Millions draw history from New York Open Data and generates frequency reports and balanced ticket exports.",
    tags: ["Python", "Pandas", "scikit-learn", "Tkinter", "Open Data API"],
    metrics: [
      ["Data source", "NY Open Data API"],
      ["Exports", "CSV, JSON & TXT"]
    ],
    links: []
  },

  /* ---------- EDUCATION & MEDIA ---------- */
  {
    id: "exam-prep-ng",
    category: "learning",
    title: "Exam Prep NG",
    kind: "CI-gated curriculum pipeline & PWA",
    status: "live",
    featured: true,
    descTech: "Offline-first React + TypeScript + Workbox PWA for WAEC, BECE, NECO & JAMB across 12 subjects. 12,675 questions generated by repeatable Python pipelines with a pre-deploy validation gate in GitHub Actions so malformed items never ship.",
    descPlain: "Helps Nigerian students practise WAEC, NECO and JAMB past questions across 12 subjects on low-end phones with no internet. All 12,675 questions pass automated quality checks before publishing.",
    tags: ["React", "TypeScript", "Python", "Workbox PWA", "GitHub Actions"],
    metrics: [
      ["Exam questions", "12,675 validated"],
      ["Coverage", "12 subjects · 4 boards"],
      ["Quality gate", "Automated pre-deploy"]
    ],
    links: [
      { label: "Live", href: "https://donne4real.github.io/exam-prep-ng/", external: true },
      { label: "Repository", href: "https://github.com/donne4real/exam-prep-ng" }
    ]
  },
  {
    id: "cert-mastery",
    category: "learning",
    title: "Cert Mastery",
    kind: "Offline certification exam PWA",
    status: "live",
    descTech: "Offline-first installable PWA hosting 1,800 practice questions (300 each with rationales and timed exam modes) across AWS Cloud Practitioner, Security+, CISSP, PMP, NCE and NCMHCE.",
    descPlain: "Practise for six professional certifications on your phone — 300 questions each with explanations, study notes and timed tests. Installs to your home screen and works offline.",
    tags: ["JavaScript", "PWA", "Offline", "AWS", "CISSP"],
    metrics: [
      ["Certifications", "6 tracks"],
      ["Question bank", "1,800 (300 each)"],
      ["Offline mode", "Full PWA"]
    ],
    links: [
      { label: "Live", href: "https://certs.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/cert-mastery" }
    ]
  },
  {
    id: "lingoloom",
    category: "learning",
    title: "LingoLoom (Vocabulary App)",
    kind: "SM-2 spaced repetition trainer",
    status: "live",
    descTech: "React 19 + TypeScript + Vite 6 + Tailwind v4 vocabulary trainer implementing the SM-2 spaced repetition algorithm over 600+ GRE, SAT, Common and Business terms, deployed via Cloudflare Pages CI.",
    descPlain: "A mobile-friendly vocabulary builder with 600+ words that schedules reviews right before you're about to forget them — with flashcards, streak tracking and 10-question quizzes.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "SM-2", "Cloudflare Pages"],
    metrics: [
      ["Curated words", "600+ (4 decks)"],
      ["Algorithm", "SM-2 spaced repetition"]
    ],
    links: [
      { label: "Live", href: "https://vocab.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/vocabulary_app" }
    ]
  },
  {
    id: "nia-investigator",
    category: "learning",
    title: "Nia The Investigator",
    kind: "Interactive kids' web experience",
    status: "live",
    descTech: "Zero-dependency HTML5/CSS3/JS interactive detective site featuring 4 solved case files, 6 interactive detective tools, a 10-question quiz and a Junior Detective Oath modal on Cloudflare Pages.",
    descPlain: "An animated kids' detective website with interactive case files, detective gadgets, a 10-question quiz and an official Junior Detective Oath.",
    tags: ["HTML5", "CSS3", "JavaScript", "Cloudflare Pages"],
    metrics: [
      ["Interactive tools", "6 gadgets + 4 cases"],
      ["Dependencies", "Zero frameworks"]
    ],
    links: [
      { label: "Live", href: "https://nia.leyesapps.com", external: true }
    ]
  },
  {
    id: "nigeria-documentary",
    category: "learning",
    title: "Nigeria: Giant of Africa",
    kind: "Code-driven documentary pipeline",
    status: "built",
    statusLabel: "Video pipeline",
    descTech: "Declarative Python + MoviePy + Pillow video assembler turning a 2,100-word timed script and 66-shot JSON storyboard into a 15-minute narrated documentary with Ken Burns motion, lower-thirds and crossfades.",
    descPlain: "An automated video pipeline that builds a full 15-minute narrated history documentary straight from a script and 66-shot storyboard — no manual video editing required.",
    tags: ["Python", "MoviePy", "Pillow", "Automation"],
    metrics: [
      ["Runtime", "15 minutes"],
      ["Storyboard", "66 shots · 2,100 words"]
    ],
    links: []
  },

  /* ---------- PRODUCTIVITY & TOOLS ---------- */
  {
    id: "pocketoffice",
    category: "productivity",
    title: "PocketOffice",
    kind: "Zero-dependency offline browser office suite",
    status: "live",
    featured: true,
    descTech: "Complete offline PWA + 6.5 MB single-file standalone HTML office suite built for locked-down machines: Writer (.docx/.pdf), Calc (1000×100 grid, 70+ formulas, .xlsx), Impress (16:9 .pptx), Text, PDF tools (merge/split/sign) and GFM Markdown.",
    descPlain: "Six office apps — Writer, Spreadsheets, Slides, Text, PDF tools and Markdown — running completely offline in a single browser tab with nothing to install and no admin rights needed.",
    tags: ["JavaScript", "PWA", "Offline", "PDF", "XLSX/DOCX"],
    metrics: [
      ["Tools included", "6 full apps"],
      ["Calc formulas", "70+ functions"],
      ["Standalone file", "6.5 MB offline HTML"]
    ],
    links: [
      { label: "Live", href: "https://donne4real.github.io/PocketOffice/", external: true },
      { label: "Repository", href: "https://github.com/donne4real/PocketOffice" }
    ]
  },
  {
    id: "daily-plan",
    category: "productivity",
    title: "Daily Plan Cockpit",
    kind: "Schema-validated static task cockpit",
    status: "live",
    descTech: "Zero-framework Today & Week execution cockpit driven by a single JSON data file, guarded by a Node build-time schema validator in GitHub Actions and deployed to Cloudflare Pages with localStorage persistence.",
    descPlain: "A clean daily and weekly cockpit for deadlines, standing routines and priorities — driven by one file with checkmarks saved locally on your device.",
    tags: ["JavaScript", "JSON Schema", "GitHub Actions", "Cloudflare Pages"],
    metrics: [
      ["Validation", "CI JSON schema gate"],
      ["Persistence", "On-device localStorage"]
    ],
    links: [
      { label: "Live", href: "https://plan.leyesapps.com", external: true },
      { label: "Repository", href: "https://github.com/donne4real/daily-plan" }
    ]
  },
  {
    id: "custody-calendar",
    category: "productivity",
    title: "Custody Calendar",
    kind: "Deterministic schedule engine + Zero Trust",
    status: "private",
    statusLabel: "Live · Access-gated",
    descTech: "Vite + Vanilla JS deterministic co-parenting calendar (2024–2030) encoding weekday, alternating Saturday, birthday and holiday split rules with local override persistence, protected via Cloudflare Access One-time PIN.",
    descPlain: "Calculates a multi-year co-parenting schedule across 2024–2030 with custom holiday, birthday and override rules — kept private behind email One-time PIN login.",
    tags: ["JavaScript", "Vite", "Cloudflare Pages", "Cloudflare Access"],
    metrics: [
      ["Schedule span", "2024–2030"],
      ["Access control", "Cloudflare Zero Trust OTP"]
    ],
    links: [
      { label: "Live (Access)", href: "https://calendar.leyesapps.com", external: true }
    ]
  },
  {
    id: "junk-sweep",
    category: "productivity",
    title: "Junk Sweep",
    kind: "Offline IMAP classifier & Thunderbird add-on",
    status: "built",
    statusLabel: "Add-on v1.1.1",
    descTech: "Offline Python IMAP analyzer paired with a Thunderbird WebExtension (v1.1.1) that sweeps newsletters, marketing blasts and bot alerts across 6 email accounts into recoverable Junk-Review folders on startup.",
    descPlain: "Automatically tidies newsletters and marketing mail across 6 email accounts into recoverable review folders inside Thunderbird without permanently deleting anything.",
    tags: ["Python", "IMAP", "WebExtension", "Automation"],
    metrics: [
      ["Accounts managed", "6 mailboxes"],
      ["Safety", "Recoverable folders only"]
    ],
    links: []
  },

  /* ---------- HEALTHCARE ---------- */
  {
    id: "teletriage",
    category: "health",
    title: "TeleTriage",
    kind: "Low-bandwidth clinical triage (WhatsApp & USSD)",
    status: "built",
    statusLabel: "Social impact",
    descTech: "FastAPI + SQLite telemedicine triage backend accepting symptoms via WhatsApp Cloud API and Africa's Talking USSD, applying deterministic emergency red-flag rules (Red/Yellow/Green) and routing cases to a live clinician web dashboard.",
    descPlain: "A low-bandwidth clinical triage assistant built for WhatsApp and basic USSD mobile menus — flagging emergency symptoms deterministically and routing cases to a live clinician dashboard.",
    tags: ["Python", "FastAPI", "SQLite", "WhatsApp API", "USSD"],
    metrics: [
      ["Channels", "WhatsApp & USSD"],
      ["Safety logic", "Deterministic red-flag rules"],
      ["Clinician view", "Live /clinic dashboard"]
    ],
    links: []
  }
];

/* ---------- LIVE APPS LAUNCHPAD ---------- */
const DEMOS = [
  {
    name: "MarketSage Unified",
    url: "https://marketsage.leyesapps.com",
    desc: "45 investing models across stocks, ETFs, mutual funds & 100-baggers, DCF/DRIP valuation, VaR/CVaR risk & SEC 10-K AI briefs.",
    state: "up"
  },
  {
    name: "Bible in African Languages",
    desc: "22 translations (19 offline), side-by-side comparison, reading plans & Google Play Android app (50+ downloads, zero tracking).",
    links: [
      { label: "Web app", href: "https://bible.leyesapps.com" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader" },
      { label: "Store page", href: "https://wordup.leyesapps.com" }
    ],
    state: "up"
  },
  {
    name: "Sermon Listener",
    url: "https://sermons.leyesapps.com",
    desc: "Live in-browser sermon transcription, automatic Bible verse detection and Claude API summaries.",
    state: "up"
  },
  {
    name: "Naija News Digest",
    url: "https://news.leyesapps.com",
    desc: "Automated daily Nigerian news digest with deduplication, multi-LLM summaries, search and RSS.",
    state: "up"
  },
  {
    name: "Bible Verse Detector",
    url: "https://verses.leyesapps.com",
    desc: "Identifies Bible verses from pasted text or photographed pages.",
    state: "up"
  },
  {
    name: "Cert Mastery",
    url: "https://certs.leyesapps.com",
    desc: "1,800 offline practice questions across AWS, Security+, CISSP, PMP, NCE & NCMHCE.",
    state: "up"
  },
  {
    name: "Exam Prep NG",
    url: "https://donne4real.github.io/exam-prep-ng/",
    desc: "12,675 CI-validated WAEC, NECO & JAMB practice questions across 12 subjects.",
    state: "up"
  },
  {
    name: "PocketOffice",
    url: "https://donne4real.github.io/PocketOffice/",
    desc: "Offline browser office suite: Writer, Calc (70+ formulas), Impress, Text, PDF tools & Markdown.",
    state: "up"
  },
  {
    name: "Powerball Predictor",
    url: "https://powerball.leyesapps.com",
    desc: "Statistical frequency, hot/cold, due-number and pair analysis over 296 draws (Python↔JS parity).",
    state: "up"
  },
  {
    name: "LingoLoom (Vocab)",
    url: "https://vocab.leyesapps.com",
    desc: "600+ GRE, SAT & Business words powered by SM-2 spaced repetition.",
    state: "up"
  },
  {
    name: "Daily Plan Cockpit",
    url: "https://plan.leyesapps.com",
    desc: "Schema-validated daily & weekly execution cockpit with on-device persistence.",
    state: "up"
  },
  {
    name: "Nia The Investigator",
    url: "https://nia.leyesapps.com",
    desc: "Interactive kids' detective site with solved case files, tools and quiz.",
    state: "up"
  },
  {
    name: "NGX Tracker",
    url: "https://ngx.leyesapps.com",
    desc: "~146 Nigerian Exchange stocks updated daily via GitHub Actions. Private — behind Cloudflare Access.",
    state: "private"
  },
  {
    name: "Custody Calendar",
    url: "https://calendar.leyesapps.com",
    desc: "2024–2030 co-parenting schedule calculator with holiday/birthday splits. Private — behind Cloudflare Access OTP.",
    state: "private"
  }
];

/* ---------- HEADLINE STATS (all verified) ---------- */
const STATS = [
  { value: "−60.6 pts", label: "Yorùbá WER reduction",        note: "32.0% omniASR vs 92.6% Whisper v3 baseline" },
  { value: "14",        label: "Live web & Play apps",        note: "12 public + 2 Cloudflare Zero Trust apps" },
  { value: "14,475",    label: "CI-gated exam questions",     note: "1,800 pro certs + 12,675 WAEC/NECO/JAMB" },
  { value: "22",        label: "Active shipped systems",      note: "Plus 11 legacy finance tools consolidated into 1" }
];

/* ---------- WRITING & FIELD NOTES ---------- */
const WRITING = [
  {
    title: "Aso Oke — Public Decision Log & Execution Plan",
    kind: "Architecture & eval log",
    desc: "Every architectural and model-selection call on Aso Oke — including why an 8-epoch Whisper LoRA fine-tune was rejected in favour of zero-shot omniASR_LLM_1B, and how Week-1 licence audits prevented a launch blocker.",
    links: [{ label: "Read on GitHub", href: "https://github.com/donne4real/aso-oke" }]
  },
  {
    title: "Aso Oke — MADLAD-400 LoRA Model Card",
    kind: "Model card",
    desc: "Published weights and transparent evaluation card for the MAFAND Yorùbá↔English translation adapter, documenting ZeroGPU fp16 latency (1.99s/2.51s p95) alongside the honest BLEU quality gap.",
    links: [{ label: "View on Hugging Face", href: "https://huggingface.co/donne4real/aso-oke-madlad-lora", external: true }]
  },
  {
    title: "All-Projects Engineering Index",
    kind: "Systems inventory",
    desc: "Repositories, live Cloudflare edge deployments, test suites and CI pipelines across AI/ML, African languages, quant finance, EdTech and low-bandwidth healthcare.",
    links: [{ label: "Explore GitHub", href: "https://github.com/donne4real" }]
  }
];

/* ---------- PLAIN-ENGLISH GLOSSARY (shown cleanly on demand) ---------- */
const GLOSSARY = [
  ["Word error rate (WER)", "How many words a speech-to-text model gets wrong. 0% is a perfect transcript."],
  ["Fine-tuning / LoRA", "Teaching an existing AI model extra lessons on targeted data instead of training from scratch."],
  ["Pre-registered gate", "A pass mark written down before experiments start, so the result — not opinion — decides what ships."],
  ["Latency (p95)", "How long the slowest 1-in-20 requests take. Lower is faster; 95% of requests beat this time."],
  ["BLEU score", "Standard 0–100 benchmark measuring how closely machine translation matches human reference text."],
  ["Local / on-device AI", "Running a model directly on your computer so private files never leave your machine."],
  ["Offline-first (PWA)", "Web apps that install like native apps and keep working with zero internet connection."],
  ["CI/CD & TDD", "Automated test suites that run on every code change so broken releases cannot go live."],
  ["Retrieval (RAG)", "Searching your own documents first, then grounding the AI's answer in what it found."],
  ["Licence audit", "Verifying commercial usage rights on models and datasets before building — not after launch."]
];

/* ---------- TOOLKIT (clicking filters projects) ---------- */
const TOOLKIT = [
  { group: "AI / ML", items: ["Python", "PyTorch", "LoRA / PEFT", "Hugging Face", "Claude API", "Gemini", "Local LLM", "RAG", "Databricks", "W&B"] },
  { group: "Web & Edge", items: ["React", "TypeScript", "JavaScript", "Tailwind", "Vite", "Cloudflare Workers", "Cloudflare Pages", "Cloudflare D1", "Cloudflare Access", "PWA", "Capacitor"] },
  { group: "Data & Backend", items: ["FastAPI", "Flask", "Streamlit", "SQLite", "Plotly", "Pandas", "SEC EDGAR", "GitHub Actions", "pytest", "Playwright"] }
];
