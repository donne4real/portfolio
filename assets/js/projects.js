/* ============================================================
   Portfolio data — single source of truth for the site.
   Every link here is verified live; every metric is measured.
   Edit this file to update the site (no rebuild required).

   Copy rule: descriptions and metric labels are written for someone
   with no AI engineering background. The `tags` array is where the
   technical detail lives, for people who want it.
   ============================================================ */

const PROJECTS = {
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
    },
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
      title: "Exam Prep NG",
      kind: "Practice question banks",
      status: "live",
      desc: "Practice questions for WAEC, NECO and JAMB across 12 subjects, written by a repeatable script rather than by hand. A test runs before every publish, so a broken question never reaches a student.",
      tags: ["Python", "GitHub Actions", "Node 20", "Data pipeline"],
      metrics: [
        ["Exam boards", "WAEC, NECO, JAMB"],
        ["Subjects", "12"],
        ["Checked before every publish", "Automatic"]
      ],
      links: [
        { label: "Repository", href: "https://github.com/donne4real/exam-prep-ng" },
        { label: "Live", href: "https://donne4real.github.io/exam-prep-ng/", external: true }
      ]
    },
    {
      title: "MarketSage",
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
    }
  ],

  engineering: [
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
      title: "Cert Mastery",
      kind: "Exam practice app",
      status: "live",
      desc: "Practise for six professional certifications on your phone — 300 questions each with explanations, study notes and timed tests. It installs to your home screen and works with no signal.",
      tags: ["JavaScript", "PWA", "AWS", "CISSP"],
      metrics: [
        ["Certifications", "6"],
        ["Questions each", "300"],
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
    }
  ],

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
      name: "NGX Tracker",
      url: "https://ngx-tracker.pages.dev",
      desc: "Around 146 Nigerian Exchange stocks, tracked live.",
      state: "up"
    },
    {
      name: "Cert Mastery",
      url: "https://cert-mastery.netlify.app",
      desc: "300 questions each for AWS, Security+, CISSP, PMP, NCE and NCMHCE.",
      state: "up"
    },
    {
      name: "Powerball Predictor",
      url: "https://powerball-predictor.netlify.app",
      desc: "Looks through 296 past draws for patterns — hot numbers, 'due' numbers and pairs.",
      state: "up"
    },
    {
      name: "Exam Prep NG",
      url: "https://donne4real.github.io/exam-prep-ng/",
      desc: "WAEC, NECO and JAMB practice questions across 12 subjects.",
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
      name: "Bible in African Languages — Store page",
      url: "https://wordupbibleapp.pages.dev",
      desc: "The store landing page, hosted on Cloudflare Pages.",
      state: "up"
    },
    {
      name: "Bible Verse Detector",
      url: "https://bible-verse-detector.netlify.app",
      desc: "Finds and identifies Bible verses inside any block of text.",
      state: "up"
    },
    {
      name: "Nia The Investigator",
      url: "https://niatheinvestigator.netlify.app",
      desc: "An interactive story you work through by investigating.",
      state: "up"
    }
  ]
};
