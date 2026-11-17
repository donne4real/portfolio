/* ============================================================
   Portfolio data — single source of truth for the site.
   Every link here is verified live; every metric is measured.

   Copy rule: descriptions and metric labels are written for someone
   with no AI engineering background. The `tags` array is where the
   technical detail lives, for people who want it.

   VERIFIED 17 Nov 2026 against the live apps and repos.
   ============================================================ */

/* ---- Section metadata: drives the group headings ---- */
const SECTIONS = {
  aiml: {
    kicker: "01 &mdash; Flagship",
    title: "Closing the AI gap for Yoruba",
    sub: "The best speech-recognition tool available gets Yoruba badly wrong &mdash; 92.6% of words. This project closes that gap on a $400 budget, with every number documented in public."
  },
  ai: {
    kicker: "02 &mdash; AI &amp; Machine Learning",
    title: "AI that does real work",
    sub: "Models that actually run: speech that listens, documents that get read and summarised, and study material written by a script instead of by hand."
  },
  faith: {
    kicker: "03 &mdash; Faith &amp; African Languages",
    title: "Built for the languages and churches I grew up in",
    sub: "Tools that work without a signal, in languages most software treats as an afterthought."
  },
  engineering: {
    kicker: "04 &mdash; Engineering",
    title: "Shipped products",
    sub: "Deployed, tested applications you can open right now &mdash; from a Bible reader that works with no internet connection, to study apps and stock trackers."
  },
  finance: {
    kicker: "05 &mdash; Finance &amp; Stock Screening",
    title: "Making sense of markets",
    sub: "Screeners, analysers and trackers for Nigerian and US markets &mdash; built on real data, with the reasoning shown rather than hidden."
  },
  productivity: {
    kicker: "06 &mdash; Productivity",
    title: "Tools for everyday work",
    sub: "Office suites, planners and mail cleaners that run offline and don't hold your data hostage."
  },
  learning: {
    kicker: "07 &mdash; Learning &amp; Media",
    title: "Teaching, and telling stories",
    sub: "Exam preparation, vocabulary training, documentaries and interactive narratives."
  },
  health: {
    kicker: "08 &mdash; Health &amp; Training",
    title: "Care, and professional development",
    sub: "Clinical triage over low-bandwidth networks, and hands-on agent-building workshops."
  }
};

const PROJECTS = {

  /* ---------- 01 · FLAGSHIP ---------- */
  aiml: [
    {
      title: "Aso Oke",
      kind: "AI that listens and translates",
      status: "soon",
      statusLabel: "Ships 13 Dec 2026",
      desc: "The best speech tool available gets Yoruba badly wrong — 92.6% of words. I set the pass mark first, then trained the industry-standard model myself; it still failed at 61.4%. So a different model that reached 32.0% was the one selected to ship. The translator failed its own gates too, and launches with a visible disclaimer.",
      tags: ["Python", "LoRA/PEFT", "Omnilingual ASR", "MADLAD-400", "FLORES-200", "Hugging Face", "W&B"],
      metrics: [
        ["Words wrong in a test (817 clips)", "32.0%"],
        ["Best tool before mine", "92.6%"],
        ["Words wrong, women's voices", "32.8%"],
        ["Translation score (pass mark 25)", "11.7 / 8.0"],
        ["Answer time, 95% of requests", "4.12s"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/aso-oke" },
        { label: "Trained model", href: "https://huggingface.co/donne4real/aso-oke-madlad-lora", external: true }
      ]
    }
  ],

  /* ---------- 02 · AI & ML ---------- */
  ai: [
    {
      title: "DataInsight",
      kind: "Spreadsheet analyst that runs offline",
      status: "live",
      desc: "Ask questions about your spreadsheets in plain English. The AI runs on your own computer, so your data never leaves it — no API key, no subscription, no cloud bill.",
      tags: ["Python", "Flask", "GPT4All", "Phi-3", "Offline"],
      metrics: [
        ["Runs on", "Your own computer"],
        ["Data sent elsewhere", "None"],
        ["Download size", "~2.2 GB"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/datainsight" }
      ]
    },
    {
      title: "Sermon Listener",
      kind: "Live sermon transcription",
      status: "live",
      desc: "Press start and it transcribes the sermon in the browser as it happens, spots Bible references while they are spoken, then sends the transcript to Claude for a summary, the main points, and the full list of passages referenced. The audio never leaves the device during listening.",
      tags: ["JavaScript", "SpeechRecognition", "Claude API", "Netlify Functions", "Cloudflare Workers"],
      metrics: [
        ["Transcribes", "Live, in the browser"],
        ["Audio uploaded", "Never"],
        ["Also finds", "Bible references"],
        ["History stored", "On your device"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/sermon-listener" }
      ]
    }
  ],

  /* ---------- 03 · FAITH & AFRICAN LANGUAGES ---------- */
  faith: [
    {
      title: "Bible in African Languages",
      kind: "Bible reader that works offline",
      status: "live",
      desc: "Read the Bible in 22 languages — 19 of them work with no internet connection at all. Study tools, four reading plans, side-by-side comparison and sharing straight to WhatsApp. On Google Play as an Android app, and it collects no data about you.",
      tags: ["React", "TypeScript", "Tailwind", "Cloudflare Workers", "Cloudflare D1", "Capacitor", "Jest"],
      metrics: [
        ["Translations", "22"],
        ["Work with no signal", "19"],
        ["Downloads on Google Play", "50+"],
        ["Automated tests", "45"],
        ["Reading plans", "4"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/bible-app" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader", external: true },
        { label: "Web app", href: "https://bible-app.leyesapps.workers.dev", external: true },
        { label: "Store page", href: "https://wordupbibleapp.pages.dev", external: true }
      ]
    },
    {
      title: "Bible Verse Detector",
      kind: "Finds Bible verses in text and images",
      status: "live",
      desc: "Paste a passage or a photograph of a page and it identifies which Bible verse you are looking at — book, chapter and verse. Built as a web app with an Android companion.",
      tags: ["React", "TypeScript", "React Native", "Web", "Android"],
      metrics: [
        ["Reads", "Text and images"],
        ["Also runs as", "An Android app"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/bible-verse-detector" },
        { label: "Live", href: "https://bible-verse-detector.netlify.app", external: true }
      ]
    }
  ],

  /* ---------- 04 · ENGINEERING ---------- */
  engineering: [
    {
      title: "Cert Mastery",
      kind: "Exam practice app",
      status: "live",
      desc: "Practise for six professional certifications on your phone — 300 questions each with explanations, study notes and timed tests. Three of them (CISSP, Security+ and AWS) are the ones I am working towards myself. It installs to your home screen and works with no signal.",
      tags: ["JavaScript", "PWA", "AWS", "CISSP"],
      metrics: [
        ["Certifications", "6"],
        ["Questions each", "300"],
        ["Total questions", "1,800"],
        ["Installs like", "An app"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/cert-mastery" },
        { label: "Live", href: "https://cert-mastery.netlify.app", external: true }
      ]
    },
    {
      title: "NGX Tracker",
      kind: "Nigerian stock tracker",
      status: "live",
      desc: "Live prices for around 146 stocks on the Nigerian Exchange. Built test-first — every change has to pass automated checks before it goes live.",
      tags: ["TypeScript", "React", "Cloudflare Pages", "GitHub Actions", "TDD"],
      metrics: [
        ["Stocks tracked", "~146"],
        ["Every change", "Automatically tested"],
        ["Where it runs", "The web"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/ngx-tracker" },
        { label: "Live", href: "https://ngx-tracker.pages.dev", external: true }
      ]
    },
    {
      title: "PocketOffice",
      kind: "Office suite in a browser",
      status: "live",
      desc: "A word processor, spreadsheet app, slides app, text editor and PDF tools — all inside your browser. Nothing to install, no admin rights needed, and it works with no internet connection.",
      tags: ["JavaScript", "PDF", "Offline", "Office"],
      metrics: [
        ["Apps included", "5"],
        ["Install required", "None"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/PocketOffice" },
        { label: "Live", href: "https://donne4real.github.io/PocketOffice/", external: true }
      ]
    },
    {
      title: "Powerball Predictor",
      kind: "Lottery analysis engine",
      status: "live",
      desc: "Looks through 296 past lottery draws for numbers that keep turning up, numbers that look 'due', and patterns in pairs. The browser version was checked against the original code line by line — every result matched.",
      tags: ["Python", "Flask", "JavaScript", "Chart.js", "Statistics"],
      metrics: [
        ["Past draws analysed", "296"],
        ["Ways it picks numbers", "4"],
        ["Both versions", "Match exactly"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/powerball-predictor" },
        { label: "Live", href: "https://powerball-predictor.netlify.app", external: true }
      ]
    },
    {
      title: "Vocabulary App",
      kind: "Vocabulary builder",
      status: "live",
      desc: "Learn vocabulary on a schedule that spaces your reviews out — the method research shows makes words stick — and watch your progress build over time.",
      tags: ["React", "TypeScript", "Netlify"],
      metrics: [
        ["Method", "Reviews spaced out"],
        ["Where it runs", "The web"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/vocabulary_app" },
        { label: "Live", href: "https://build-my-vocab.netlify.app", external: true }
      ]
    }
  ],

  /* ---------- 05 · FINANCE ---------- */
  finance: [
    {
      title: "MarketSage Analyzer",
      kind: "Stock screener",
      status: "live",
      desc: "Put in a stock and see how it scores against ten investing styles — value, growth, quality, income and more. It shows which philosophies would have liked it, and which would not.",
      tags: ["Python", "Streamlit", "yfinance", "Value investing"],
      metrics: [
        ["Ways to judge a stock", "10"],
        ["Named after", "Graham, Buffett, Lynch and more"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/MarketSage-Analyzer" }
      ]
    },
    {
      title: "NGX Screener & Dashboard",
      kind: "Nigerian Exchange screener",
      status: "built",
      statusLabel: "Internal tool",
      desc: "A local screener over a SQLite database of Nigerian Exchange equities, paired with a plain HTML dashboard so the results can be read without running anything.",
      tags: ["Python", "SQLite", "HTML"],
      metrics: [
        ["Market", "Nigerian Exchange"],
        ["Storage", "SQLite, local"]
      ],
      links: []
    },
    {
      title: "Mega Millions Analyzer",
      kind: "Lottery analysis with a desktop app",
      status: "built",
      statusLabel: "Desktop tool",
      desc: "A Tkinter desktop app that pulls New York Open Data lottery results and turns them into hot, cold, pair and balanced ticket suggestions you can generate and check at a glance.",
      tags: ["Python", "Tkinter", "NY Open Data API"],
      metrics: [
        ["Interface", "Tkinter desktop app"],
        ["Data source", "NY Open Data API"]
      ],
      links: []
    },
    {
      title: "Unified Investment Platform",
      kind: "Four analysers, one place",
      status: "built",
      statusLabel: "Multi-page platform",
      desc: "A multi-page Streamlit platform that brings together the 100-Bagger screener, the ETF analyser, the mutual fund analyser and the stock market analysis — so you stop switching between four separate apps to answer one question.",
      tags: ["Python", "Streamlit", "Plotly"],
      metrics: [
        ["Analysers combined", "4"],
        ["Interface", "Streamlit, multi-page"]
      ],
      links: []
    },
    {
      title: "Multi-Source Investment Platform",
      kind: "Stock and ETF analyser with fallbacks",
      status: "built",
      statusLabel: "Internal tool",
      desc: "A four-source fallback analyser for stocks, ETFs and SEC EDGAR filings, with a 24-hour SQLite cache so it stays usable when a data provider goes down.",
      tags: ["Python", "SQLite", "SEC EDGAR"],
      metrics: [
        ["Data sources", "4, with fallback"],
        ["Cache", "24 hours, SQLite"]
      ],
      links: []
    },
    {
      title: "Stock Market Analysis",
      kind: "Screener notebooks and Excel reports",
      status: "built",
      statusLabel: "Notebooks",
      desc: "Quantitative screener notebooks that output Excel workbooks, so a screen is not just a screen — it is something you can hand to someone else and check.",
      tags: ["Python", "Jupyter", "Excel"],
      metrics: [
        ["Output", "Excel workbooks"],
        ["Format", "Notebooks"]
      ],
      links: []
    }
  ],

  /* ---------- 06 · PRODUCTIVITY ---------- */
  productivity: [
    {
      title: "Daily Plan Cockpit",
      kind: "Daily and weekly task tracker",
      status: "live",
      desc: "A clean cockpit for the week — deadlines, decisions waiting on you, the day's tasks and the standing daily routines, all in one view. The week is generated from a single data file, and checkmarks persist on your device.",
      tags: ["JavaScript", "JSON", "Netlify", "localStorage"],
      metrics: [
        ["Views", "Today and Week"],
        ["Checkmarks", "Saved on your device"],
        ["Build step", "None"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/daily-plan" },
        { label: "Live", href: "https://leyes-daily-plan.netlify.app", external: true }
      ]
    },
    {
      title: "Junk Sweep",
      kind: "Inbox junk-mail agent",
      status: "built",
      statusLabel: "Mail add-on",
      desc: "A Python analyser for IMAP mailboxes plus a Thunderbird add-on, so junk mail can be reviewed and cleared from six accounts without opening each one by hand.",
      tags: ["Python", "IMAP", "Thunderbird add-on"],
      metrics: [
        ["Accounts handled", "6"],
        ["Runs inside", "Thunderbird"]
      ],
      links: []
    },
    {
      title: "Custody Calendar",
      kind: "Co-parenting schedule calculator",
      status: "built",
      statusLabel: "Planning tool",
      desc: "Calculates a co-parenting schedule across 2024–2030, including the holiday and birthday rules that otherwise get reworked by hand every year.",
      tags: ["JavaScript", "Calendar logic"],
      metrics: [
        ["Years covered", "2024–2030"],
        ["Handles", "Holidays and birthdays"]
      ],
      links: []
    }
  ],

  /* ---------- 07 · LEARNING & MEDIA ---------- */
  learning: [
    {
      title: "Exam Prep NG",
      kind: "Practice question banks",
      status: "live",
      desc: "Practice questions for WAEC, NECO and JAMB across 12 subjects, written by a repeatable script rather than by hand. A test runs before every publish, so a broken question never reaches a student.",
      tags: ["Python", "GitHub Actions", "Node 20", "Data pipeline"],
      metrics: [
        ["Exam boards", "WAEC, NECO, JAMB"],
        ["Subjects", "12"],
        ["Questions written", "12,675"],
        ["Checked before every publish", "Automatic"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/exam-prep-ng" },
        { label: "Live", href: "https://donne4real.github.io/exam-prep-ng/", external: true }
      ]
    },
    {
      title: "Nia The Investigator",
      kind: "Interactive story",
      status: "live",
      desc: "An interactive story you work through by investigating things yourself. Published automatically from the code, so it is always up to date.",
      tags: ["Web", "Interactive"],
      metrics: [
        ["Published", "Automatically"],
        ["Where it runs", "The web"]
      ],
      links: [
        { label: "Live", href: "https://niatheinvestigator.netlify.app", external: true }
      ]
    },
    {
      title: "Nigeria: Giant of Africa",
      kind: "15-minute history documentary",
      status: "built",
      statusLabel: "Video pipeline",
      desc: "An automated MoviePy pipeline that turns a written script and a shot-by-shot storyboard into a narrated documentary — so the video is built from source, not by hand in an editor.",
      tags: ["Python", "MoviePy", "Ken Burns", "Automation"],
      metrics: [
        ["Length", "15 minutes"],
        ["Storyboard", "66 shots"],
        ["Script", "2,100 words"]
      ],
      links: []
    }
  ],

  /* ---------- 08 · HEALTH & TRAINING ---------- */
  health: [
    {
      title: "TeleTriage",
      kind: "Clinical triage over WhatsApp and USSD",
      status: "built",
      statusLabel: "Social-impact tool",
      desc: "A low-bandwidth clinical triage bot for use over WhatsApp and Africa's Talking USSD. Built for the reality of the connection it runs on, not the ideal one.",
      tags: ["Python", "FastAPI", "SQLite", "USSD", "WhatsApp"],
      metrics: [
        ["Channels", "WhatsApp and USSD"],
        ["Built for", "Low bandwidth"],
        ["Storage", "SQLite"]
      ],
      links: []
    },
    {
      title: "Databricks Agentic & GenAI Workshops",
      kind: "Hands-on agent-building labs",
      status: "built",
      statusLabel: "Training material",
      desc: "Four practical workspaces on building, evaluating and monitoring agents — the material is written so someone can follow it end to end and get a working result.",
      tags: ["Databricks", "GenAI", "Agents", "Evaluation"],
      metrics: [
        ["Workshops", "4"],
        ["Covers", "Build, evaluate, monitor"]
      ],
      links: []
    }
  ],

  /* ---------- LIVE DEMOS ---------- */
  demos: [
    {
      name: "Bible in African Languages",
      url: "https://bible-app.leyesapps.workers.dev",
      desc: "22 translations, 19 of them working with no internet connection, plus study tools and reading plans.",
      state: "up"
    },
    {
      name: "Bible in African Languages — Google Play",
      url: "https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader",
      desc: "Published Android app, 50+ downloads. No data collected, nothing shared.",
      state: "up"
    },
    {
      name: "Bible in African Languages — Store page",
      url: "https://wordupbibleapp.pages.dev",
      desc: "The store landing page, hosted on Cloudflare Pages.",
      state: "up"
    },
    {
      name: "Bible Verse Detector",
      url: "https://bible-verse-detector.netlify.app",
      desc: "Finds and identifies Bible verses inside any block of text or image.",
      state: "up"
    },
    {
      name: "Cert Mastery",
      url: "https://cert-mastery.netlify.app",
      desc: "1,800 practice questions across AWS, Security+, CISSP, PMP, NCE and NCMHCE.",
      state: "up"
    },
    {
      name: "Exam Prep NG",
      url: "https://donne4real.github.io/exam-prep-ng/",
      desc: "WAEC, NECO and JAMB practice questions across 12 subjects.",
      state: "up"
    },
    {
      name: "Powerball Predictor",
      url: "https://powerball-predictor.netlify.app",
      desc: "Looks through 296 past draws for patterns — hot numbers, 'due' numbers and pairs.",
      state: "up"
    },
    {
      name: "PocketOffice",
      url: "https://donne4real.github.io/PocketOffice/",
      desc: "Word processor, spreadsheet, slides, text editor and PDF tools in a browser.",
      state: "up"
    },
    {
      name: "Vocabulary App",
      url: "https://build-my-vocab.netlify.app",
      desc: "Vocabulary practice on a schedule that makes words stick.",
      state: "up"
    },
    {
      name: "Nia The Investigator",
      url: "https://niatheinvestigator.netlify.app",
      desc: "An interactive story you work through by investigating.",
      state: "up"
    },
    {
      name: "Daily Plan Cockpit",
      url: "https://leyes-daily-plan.netlify.app",
      desc: "A daily and weekly task cockpit that keeps your checkmarks on your own device.",
      state: "up"
    },
    {
      name: "NGX Tracker",
      url: "https://ngx-tracker.pages.dev",
      desc: "Around 146 Nigerian Exchange stocks, tracked live. Sign-in required.",
      state: "up"
    }
  ]
};

/* ---- Headline numbers: computed from the lists above, not typed by hand ---- */
const STATS = [
  { value: "25", label: "Projects built and shipped", note: "Every one is a working application, not a mock-up" },
  { value: "12", label: "Apps live on the web today", note: "Open any of them from the demos section" },
  { value: "18,475", label: "Practice questions written", note: "1,800 certification + 12,675 Nigerian exam questions" },
  { value: "22", label: "Bible translations", note: "19 of them work with no internet connection" }
];

/* ---- Writing & field notes ---- */
const WRITING = [
  {
    title: "Aso Oke — public decision log",
    kind: "Field notes",
    desc: "Every architectural decision on the Yoruba speech-to-text project, including the ones that went wrong and the ones that were reversed.",
    links: [{ label: "Repository", href: "https://github.com/donne4real/aso-oke" }]
  },
  {
    title: "Aso Oke — trained model card",
    kind: "Model card",
    desc: "The published card for the fine-tuned translation model, written to be explicit about what it does well and where it falls short.",
    links: [{ label: "Model card", href: "https://huggingface.co/donne4real/aso-oke-madlad-lora", external: true }]
  },
  {
    title: "Nia The Investigator — session log",
    kind: "Build log",
    desc: "The running log of how the interactive story was built and what changed along the way.",
    links: [{ label: "Repository", href: "https://github.com/donne4real" }]
  }
];
