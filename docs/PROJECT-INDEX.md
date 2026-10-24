# Project Index — Everything We've Built Together

*Reconstructed 23 Oct 2026 from session history, the filesystem, git remotes, and project docs.*
*All paths are absolute on this machine (Windows).*

---

## TL;DR — the big eight

| # | Project | Domain | Where it lives | Status |
|---|---|---|---|---|
| 1 | **Portfolio hub** | Public presence | `leye-ajibola.netlify.app` | Live — 9 demos, auto-deploy |
| 2 | **Project Aso Oke** | ML/AI (flagship) | `OneDrive\Documents\aso-oke-project\` | Active — target ship **13 Dec 2026** |
| 3 | **Master Development Plan** | Career governance | `OneDrive\Documents\Development PLan\` | Live: `Q4-2026-MASTER-PLAN.md` (v9) |
| 4 | **Powerball Predictor** | Lottery / Python+Flask+JS | `donne4real/powerball-predictor` | Live: powerball-predictor.netlify.app |
| 5 | **MarketSage** | Finance / Streamlit | `Documents\VibeCoding\MiniMax\MarketSage\` | Complete |
| 6 | **NGX Tracker** | Finance / web | `ZCodeProject\gx-tracker\` | Live: ngx-tracker.pages.dev |
| 7 | **Exam Prep NG** | EdTech | `Vibe Coding\Minimax\exam-prep-ng\` | Built, large data pipeline |
| 8 | **Bible App** | Consumer / React | `Vibe Coding\Claude\bible-app\` | Live: bible-app.leyesapps.workers.dev |

---

## 0. Portfolio & public presence (built 23 Oct 2026)

**Hub:** https://leye-ajibola.netlify.app · **Repo:** `donne4real/portfolio` (public)
**Profile:** `donne4real/donne4real` (public, profile README) · **Plan:** `DEPLOYMENT-PLAN.md`

Static HTML/CSS/JS, no build step, no framework. Content lives in one file (`assets/js/projects.js`); edit it, push, live in ~45s via GitHub Actions → Netlify.

**Live demos featured (9):** Word Up (Workers + Netlify) · NGX Tracker · Cert Mastery · Powerball Predictor · Exam Prep NG · PocketOffice · Vocabulary App · Nia The Investigator

**Deliberately excluded:** Palmwine Tappers, Daily Plan (dropped by request 23 Oct), custody schedule, household budget, religious/personal material.

**New in this build:** `cert-mastery.netlify.app` and `powerball-predictor.netlify.app` both deployed; `DocSummarization`, `ngx-tracker`, `daily-plan` made public; 27 repos given descriptions, topics and homepage URLs.

**Powerball Predictor** — the Python Flask app at `C:\Users\Public\powerball-predictor\` is now published as `donne4real/powerball-predictor` with two implementations: `python/` (original Flask + CLI) and `web/` (a faithful JavaScript port of the same engine, browser-only, no backend). The port was **verified by running both engines against the same 296-draw dataset and diffing every output** — frequency maps, hot/cold rankings, due-number ordering, pair counts, averages and the date span all match exactly.

**Caching note:** assets are hand-edited with no content hashing, so `index.html` references them with a `?v=` version string that must be bumped on CSS/JS edits. `netlify.toml` also sets `max-age=0, must-revalidate` as a second line of defence.

---

## 1. Project Aso Oke — Yoruba AI tool (flagship)

**Path:** `C:\Users\leyea\OneDrive\Documents\aso-oke-project\`
**GitHub:** `github.com/donne4real/aso-oke`
**Goal:** production Yoruba AI tool (translation + speech-to-text). Ship by **13 Dec 2026**
(*moved from 22 Nov on 1 Oct 2026 — 3-week extension for a pre-registered model comparison*).
**Plan window:** 4 Sep 2026 → 31 Dec 2026 (~19 weeks).

### Key documents
| File | Size | Purpose |
|---|---|---|
| `ASO-OKE-EXECUTION-PLAN.md` | — | Week-by-week delivery plan |
| `ASO-OKE-REFERENCE.md` | — | Reference + License Audit Checklist |
| `EXPLAIN-LIKE-IM-NEW.md` | — | "Explain like I'm new" walkthrough |
| `AI-ENGINEER-CURRICULUM.md` | 62 KB | Learning plan mapped to real Aso Oke tasks |
| `WEEKLY-SPRINT.md` | — | Single home for sprint planning + Weekly Review Log |
| `ML-AI-ENGINEER-ROADMAP.md` | — | **Retired** → `superseded/` (Sep 17; merged into curriculum) |

### Directories
- `deck/` — `ASO-OKE-Deck.pptx`, `ASO-OKE-Deck-Dark.pptx`, `ASO-OKE-Overview.pptx`, `build_deck.py` (32 KB), `build_slide.py`, `png/`, `preview.png` *(all 16 Oct 2026)*
- `day57-test-set/` — `sheet-1-ayodele.csv`, `build_sheet1.py`, `TRANSLATOR-BRIEF.md` *(3 Oct 2026)*
- `superseded/` — retired docs, incl. `ASO-OKE-MASTER-INDEX.md`, `YORUBA-AI-MASTER-INDEX-v9.md`
- `.claude/`, `.mimocode/` — agent config

### Audio-data pipeline (Day 28 → Day 57)
- **FLEURS license audit** — `google/fleurs` (config `yo_ng`) confirmed **CC-BY-4.0**, cleared for use (checkpoint **PASS, 10 Sep 2026**)
- **3 consented speakers** logged with metadata (name, age, gender, region, date, consent, file durations) — SPK01 Veronica Ajibola, Lagos, etc. All converted to **16 kHz mono WAV** with correct naming
- **LoRA fine-tuning** prepared — `final_lora_cell.txt`, `insert_lora_cell.py`, `cells_dump.txt` (in `Downloads\`); target modules `q/k/v/o_proj`, `gate/up/down_proj`, r=16, alpha=32

### Notebooks
- `Downloads\aso-oke-baselines.ipynb`
- `Downloads\aso-oke-baselines-cleaned.ipynb`

### ✅ Resolved: the "50 users" criterion is signed

The **superseded** copy (`superseded/50-USERS-DEFINITION.md`, 30 Aug 2026) has a blank sign-off line and an unresolved flag — but that file is stale. The **live** definition lives in `OPERATIONS-REFERENCE.md` and **was signed**:

> **Signed:** Leye Ajibola, **Date:** September 5, 2026

Definition: "50 users" = **≥50 unique users who completed at least one translation or speech-to-text request in the first 4 weeks post-launch** (Weeks 15–18, 22 Nov – 19 Dec 2026). "25 users" is the sunset bar.

*(Note: the ship date itself moved to 13 Dec 2026 on 1 Oct, so the post-launch window shifts with it.)*

### Data-licence status (per-dataset, audited)

| Dataset | Licence | Consequence |
|---|---|---|
| FLEURS (`google/fleurs`, `yo_ng`) | **CC-BY-4.0** | Cleared for commercial use — checkpoint PASS, 10 Sep 2026 |
| MAFAND | **CC-BY-NC-4.0** | Non-commercial only — safe for a free launch, blocks monetising on this corpus |
| Tatoeba | **CC-BY 4.0** (Sentence Pairs) | Attribution required; Yo↔En subset only |
| FLORES-200 | **CC-BY-SA-4.0** | Evaluation only, not training — share-alike on the evaluation set |
| NLLB-200 | MIT (code) / non-commercial (CC-BY-NC 4.0, models) | **Blocked as a translation backbone** — replaced by MADLAD-400 (Apache-2.0) |

---

## 2. Master Development Plan — career governance (the operating system)

**Path:** `C:\Users\leyea\OneDrive\Documents\Development PLan\`

### Current
| File | Size | Date |
|---|---|---|
| `Q4-2026-MASTER-PLAN.md` | 23.5 KB | 1 Oct 2026 — **v9, live** |
| `CRITICAL_REVIEW_2026-09-09.md` | 10.4 KB | 9 Sep 2026 |
| `CRITICAL_REVIEW_2026-08-30.md` | 10.3 KB | 30 Aug 2026 |

### Superseded lineage (in `superseded\`)
- `Master_Development_Plan_2026_REVISED_Aug19_v2-SUPERSEDED-OCT01.md` (71.6 KB) — **v8, the whole-life plan**
- `Master_Development_Plan_2026_REVISED_Aug19.md` / `.pdf` / `.html`
- `SEPTEMBER_2026_PLAN-SUPERSEDED-OCT01.md` (12.9 KB)
- `Q4-2026-LEARNING-PLAN-SUPERSEDED-OCT01.md` (6.4 KB)
- `CRITICAL_REVIEW_Development_Plan_2026.md` / `.pdf` / `.html`
- `WEEKLY_TASKS_2026-08-23_Aug23-29.md`, `WEEKLY_TASKS_2026-08-30_Aug30-Sep5.md`

### Original (June)
`C:\Users\Public\powerball-predictor\Master_Development_Plan_2026.md` (5.5 KB) + `.html` (620.9 KB) — **6 Jun 2026, the original 7-month Jun–Dec edition** that the whole plan lineage descends from.

### Priority hierarchy (user-confirmed 9 Sep 2026, unchanged since)
1. **Project Aso Oke** — ships first, always
2. **AWS AI/ML Scholars Nanodegree** — sole technical-learning priority through ~22 Nov
3. **Everything else** — subscriptions as servants, ≤3 leftover hrs/wk, zero in high-intensity weeks

### Hard rules
- Sunday = FREE DAY, no exceptions
- Sleep 10 PM–4 AM; evening activity ends 9:30 PM
- **Cut rule** — a module that misses its window slides; never crammed, never displaces priorities 1–2
- High-intensity weeks (Nov 15–21): Saturday block moves to 3–6 PM, home projects suspended, zero curriculum
- Curriculum hours yield to any project gate, always

### 5 pillars (from the June original)
1. **Technical Mastery** (project-led) — Python track for Audit, R track for Analysis
2. **Career Impact** — the 10-App Sprint (5 public R/Shiny apps + 5 audit Python apps, May→Dec)
3. **Growth & Lifestyle** — weight 192→178 lbs, $1,600/mo savings by Dec, $2,400 bonus by Dec
4. **Spiritual Life** — WOFBEC 2026, Derek Prince series, 2 Timothy 2
5. **Home & Family** — Wayfair sales, room declutter, daughter, kitchen flooring

### Position as of 1 Oct 2026
Project Day 54 / Week 7. STT gate outcome: Whisper model = do-not-ship; re-gate **22 Oct** on the Omnilingual ASR comparison.

---

## 3. Powerball Predictor — lottery prediction engine (Python + Flask)

**Path:** `C:\Users\Public\powerball-predictor\` ← *note: `C:\Users\Public\`, not OneDrive*
**Built:** 6 Jun 2026 · **Status: complete, still on disk and runnable**

### Structure
```
powerball-predictor/
├── data/
│   └── powerball_history.csv    # 296 draws, 15 Mar 2025 → 3 Jun 2026
├── powerball/
│   ├── __init__.py
│   ├── data_loader.py           # CSV loading, adding draws, starter data
│   ├── engine.py                # frequency analysis, predictions, stats
│   ├── fetcher.py               # live draw fetching
│   ├── cli.py                   # command-line interface
│   └── web.py                   # Flask web server with REST API
├── templates/
│   └── index.html               # web dashboard with Chart.js
├── requirements.txt             # numpy>=1.24, flask>=3.0, requests>=2.31
├── run.py                       # entry point
├── GEMINI.md                    # architecture + strategy spec
├── test_core.py
├── my_predictions.json
├── Master_Development_Plan_2026.md / .html
├── append_fetcher.py, debug_fetch.py, debug_fetch2.py
├── fix_cli.py, fix_cli2.py, fix_cli3.py
└── debug.html
```

### Prediction strategies (weight = `(count + 0.1) ** exponent`)
| Strategy | Exponent | Behaviour |
|---|---|---|
| `balanced` (default) | 1.2 | weighted random — favours hot slightly, keeps variety |
| `hot` | 2.5 | heavily favours most-frequent numbers |
| `cold` | −1.5 | favours least-frequent / due numbers |
| `random` | — | pure random, no historical bias |

### CLI commands
```bash
python run.py predict              # 5 balanced predictions
python run.py predict -s hot -n 10 # 10 hot-strategy predictions
python run.py analyze               # frequency analysis
python run.py stats                 # summary statistics
python run.py history -n 10         # recent draws
python run.py add 2025-06-04 5 12 28 44 69 10 -m 2
python run.py web                   # dashboard at http://127.0.0.1:5000
```

### Web dashboard features
Overview stats · Hot/Cold numbers · Predictions panel (balanced/hot/cold/random) · Frequency chart (Chart.js, switchable white balls ↔ powerballs) · Recent history table (last 20 draws)

### API conventions (from `GEMINI.md`)
- Backend returns `white` → frontend expects `white_balls`
- `api/history` returns `{ "draws": [...] }`
- UI labels "Frequency"/"Due" map to backend `hot`/`cold`

### Spec document
`C:\Users\leyea\OneDrive\Documents\Power Predictor App.docx` — 3 pages, authored **Leye Ajibola**, 7 Jun 2026. Body text is 3 embedded PNG screenshots of the CLI output, strategy table, and web-dashboard usage.

---

## 4. Mega Millions Predictions — lottery analysis notebook (Tkinter GUI)

**Path:** `C:\Users\leyea\OneDrive\Documents\Vibe Coding\MegaMillionsPredictions.ipynb` (48.2 KB, 11 Apr 2026)
**This is the earlier sibling** to the Powerball Predictor — built ~2 months before it.

Single-cell notebook (37.6 KB of code) implementing a **Mega Millions** analysis + prediction tool:
- **Data source:** NY Government open API — `https://data.ny.gov/api/views/5xaw-6ayf/rows.csv?accessType=DOWNLOAD`, with defensive column-name detection
- **Config:** main balls 1–70, mega ball 1–25
- **Optional ML:** `sklearn` RandomForestClassifier + StandardScaler (graceful fallback if unavailable)
- **Analysis:** `MegaMillionsAnalyzer` → `analyze_frequencies()`, `analyze_number_pairs()`
- **Prediction:** `PredictionEngine` → `predict_by_frequency`, `predict_by_cold_numbers`, `predict_by_pair_patterns`, `predict_by_balanced_distribution`
- **GUI:** `MegaMillionsGUI` (tkinter/ttk) — menu, main layout, status bar, threaded data fetch, statistics/history/analysis tabs, predictions panel, CSV/JSON/TXT export, analysis report export
- Fallback `generate_sample_data()` when the network is unavailable

---

## 5. MarketSage — investment-philosophy screener (Streamlit)

**Path:** `C:\Users\leyea\Documents\VibeCoding\MiniMax\MarketSage\`
**GitHub:** `donne4real/MarketSage-Analyzer`

| File | Size |
|---|---|
| `app.py` | 20.8 KB |
| `strategies.py` | 14.1 KB |
| `data_fetcher.py` | 9.9 KB |
| `requirements.txt` | — |

**10 investment philosophies** implemented as strategy classes:
Benjamin Graham · Warren Buffett · Peter Lynch · Joel Greenblatt · William O'Neil · Joseph Piotroski · James O'Shaughnessy · David Dreman · Philip Fisher · Dividend Aristocrats

Also: `Documents\VibeCoding\Untitled.ipynb` (48.8 KB, 17 Apr 2026)

---

## 6. NGX Tracker — Nigerian Exchange stock tracker

**Live:** https://ngx-tracker.pages.dev  ·  **GitHub:** `donne4real/ngx-tracker`
Tracks ~146 NGX stocks. Cloudflare Pages + GitHub Actions, TDD, Kobo Terminal API + EODHD data.
**Path:** `ZCodeProject\gx-tracker\` (also `gx-dashboard\`, `gx-screener\`) — *local copies are OneDrive cloud placeholders, not downloaded.*

---

## 7. ZCodeProject — daily-plan + PocketOffice

**Path:** `C:\Users\leyea\OneDrive\Documents\ZCodeProject\`
**GitHub:** `donne4real/daily-plan`, `donne4real/PocketOffice`

- `daily-plan/` — Vite app, **Netlify-deployed** (`netlify.toml` + `.netlify/state.json`)
- `PocketOffice/` + `PocketOffice-archive/`
- `2nd Grade LLL Weekly Planner/` — xlsx planner
- `build_teaching_slides.py` — teaching slide generator
- `SESSION_SUMMARY_20260712.md`, `SESSION_SUMMARY_20260924.md`, `SESSION_SUMMARY_20260925.md` — session logs

---

## 8. Custody Calendar — co-parenting schedule

**Path:** `C:\Users\leyea\OneDrive\Documents\Vibe Coding\Minimax\custody-calendar\`
Vite + vanilla JS, Netlify Identity widget, Netlify + Cloudflare Workers configs.

**Schedule rules** (`src/schedule.js`):
- Sun–Tue → **Leye** (Dad) · Wed–Fri → **Shermaine** (Mum)
- Saturdays **alternate** by week parity; anchor **4 Jan 2024** (Thursday)
- Shift of one week after 15 Aug 2026 due to a one-off swap
- Birthdays → that parent gets the full day
- Daughter's birthday → **split**: Mum AM / Dad PM
- Range: **Jan 2024 → Dec 2030**; user overrides persist in `localStorage`
- Git: single commit `fa6cd19 "Initial commit: custody calendar"`

---

## 9. Exam Prep NG — Nigerian exam prep app

**Path:** `Vibe Coding\Minimax\exam-prep-ng\` (+ `Claude\exam-prep-ng\`)  ·  **GitHub:** `donne4real/exam-prep-ng`

**Curriculum build pipeline** (`data/raw/`): `build_massive_curriculum.py` (89 KB), `build_more_curriculum.py` (37 KB), `build_curriculum_qs.py` (29 KB), `build_mega_curriculum.py` (19 KB), `build_extra_curriculum.py` (15 KB)

**Extracted curricula** (`data/extracted/`) — WAEC, NECO and JAMB subject sets:
Mathematics · English Language · Physics · Chemistry · Biology · Economics · Government · Civic Education · Computer Studies · History · Social Studies · Basic Science

Also has an Android/Capacitor build.

### CI/CD
`.github/workflows/deploy.yml` (6 Sep 2026) — push to `main` / manual dispatch → GitHub Pages via `peaceiris/actions-gh-pages@v3`:
1. Checkout (`lfs: false`) → Node 20 setup with npm cache
2. **`python3 scripts/validate_questions.py`** — question bank validation gate *before* build
3. `npm install` → `npm run build` → publish `./dist` to GitHub Pages

---

## 10. Bible App — offline African-languages Bible reader

**Path:** `Vibe Coding\Claude\bible-app\`  ·  **GitHub:** `donne4real/bible-app`
**Live:** https://bible-app.leyesapps.workers.dev  (Cloudflare Workers; also Netlify + Capacitor Android)

React + TypeScript + Tailwind. **22 translations** (Yoruba, Igbo, Hausa, Twi, Pidgin, Swahili, Amharic, Afrikaans, Shona, Ndebele, Ewe, Haitian Creole, Arabic RTL, French, KJV, WEB, ASV, BBE, YLT, NLT, AMP, NIV) · 19 bundled offline as static JSON · 6 reading fonts · 4 themes (Sepia/Light/Dark/OLED) · Zen mode · verse highlights, notes, bookmarks, cross-references · JSON export/import · 4 reading plans (NT-30, Psalms-30, Proverbs-30, Chronological-365) · whole-Bible + reference search with fuzzy suggestions · side-by-side/interlinear comparison · WhatsApp + Web Share API.

**Related:** `bible-verse-detector-web\` · `donne4real/bible-verse-detector-web`

### Bible App engineering (`ROADMAP.md`, 4.9 KB, 9 Oct 2026)
- **Architecture (25 Sep 2026):** `App.tsx` refactored into custom hooks — `useBibleNavigation`, `useStudyData`, `useSearch`, `usePersistedState`; components extracted — `BookPicker`, `VerseLine`, `ReadingPlanPanel`, `ErrorBoundary`; centralised constants, translations, storage keys
- **Testing:** Jest + Testing Library — **45 tests**
- **A11y:** aria-labels on all interactive buttons; 15 s fetch timeout on remote Bible loads; JSDoc on all source files
- **Engagement:** Verse of the Day (52 curated KJV verses, rotating), reading streaks (current/longest/total), verse card generator (`ShareCardModal`)
- **Cross-references:** ~150 popular verses, 3–6 connections each

---

## 11. ExcelAI — local LLM for Excel

**Path:** `Vibe Coding\Claude\ExcelAI\`
`app.py` (15.6 KB) · `download_model.py` · `launcher.py` · `run.bat` · `setup_home.bat` · `models/` · `vendor/` (openpyxl, PIL) · `src/`

---

## 12. Vocab App

**Live:** https://build-my-vocab.netlify.app  ·  **GitHub:** `donne4real/vocabulary_app`

---

## 13. Sermon Listener

**Path:** `Vibe Coding\Claude\sermon-listener\`  ·  **GitHub:** `donne4real/sermon-listener`

---

## 14. Nigeria History Documentary

**Path:** `Vibe Coding\Claude\nigeria-history-documentary\`

---

## 15. Qwen financial-analysis suite (6 repos)

**Path:** `Vibe Coding\Qwen\`

| Folder | GitHub |
|---|---|
| `ETFAnalyzer` | `donne4real/ETFAnalyzer` |
| `MutualFundAnalyzer` | `donne4real/MutualFundAnalyzer` |
| `QwenStockMarketAnalysis` | `donne4real/stock-market-analyzer` |
| `CombinedMarketAnalyzer` | `donne4real/CombinedMarketAnalyzer` |
| `100BaggerScreener` | `donne4real/100BaggerScreener` |
| `UnifiedInvestmentPlatform` | — (no remote yet) |

### Deployment guides (all Streamlit-based)
| File | Date | Targets |
|---|---|---|
| `UnifiedInvestmentPlatform/docs/DEPLOYMENT.md` | **2 Oct 2026** (most recent work in the suite) | local (`:8501`), Streamlit Cloud *(recommended)*, + others |
| `CombinedMarketAnalyzer/DEPLOYMENT.md` | 15 Mar 2026 | GitHub → Streamlit Cloud |
| `QwenStockMarketAnalysis/DEPLOYMENT.md` | 7 Mar 2026 | Streamlit Cloud, HuggingFace Spaces, Railway, Render |

> These guides still contain `YOUR_USERNAME` placeholders and an unfilled `streamlit.app` URL — **none of the Qwen suite is deployed yet.**

---

## 16. Nia The Investigator

**Path:** `Vibe Coding\Qwen\NiaTheInvestigator\`
**Live:** https://niatheinvestigator.netlify.app  ·  `SESSION_LOG.md`

---

## 17. StockMarketAnalysis (notebooks + reports)

**Path:** `Vibe Coding\StockMarketAnalysis\`
Screener notebooks + xlsx report exports (incl. `Master_Quantitative_Screener.xlsx`).

---

## 18. POSIT Conf 2024 learning repos (the R / Python "Analysis Track")

**Path:** `C:\Users\leyea\OneDrive\Documents\GitHub\` — 29 repos, mostly `posit-conf-2024/*`

R / Shiny / Quarto / ML: `arrow` · `causal` · `dashboard-snippets-py` · `databases` · `databricks` · `dev-ops` · `ds-workflows-python` · `ds-workflows-r` · `ds4a` · `intro-ds-r` · `intro-to-shiny-for-python` · `level-up-shiny` · `ml-python` · `olympicdash` · `pharmaverse` · `pkg-dev` · `programming-r` · `programming-r-exercises` · `quarto-dashboards` · `quarto-intro` · `quarto-websites` · `r-in-production` · `shiny-r-intro` · `tables` · `tidymodels-intro` · `vetiver` · `workshops` · `wtf` · plus `hglanz/rworkshop` + `rworkshop_Jan2021`

These map directly onto the Master Development Plan's 4-phase R/Quarto track (Tidyverse → Tidymodels → Shiny → Executive Report).

---

## 19. Household Budget — financial review

**Path:** `C:\Users\leyea\Downloads\`
- `budget_review_session_summary.md`
- `financial-analysis-2026-07.md`
- `household_budget_dashboard.html` — dark-theme "Household Budget — Ledger" dashboard (IBM Plex Sans/Mono, amber/teal/rose palette, category breakdown)
- Transaction CSVs

---

## 20. AI Engineer Curriculum & learning system (meta-project)

**Path:** `OneDrive\Documents\aso-oke-project\AI-ENGINEER-CURRICULUM.md` (62 KB)
Also: `Development PLan\Q4-2026-MASTER-PLAN.md`, `POSIT\`, `Financial Planning\`

**Priority hierarchy (decided 9 Sep 2026):**
1. **Project Aso Oke** — the vehicle, ships first
2. **AWS AI & ML Scholars Nanodegree** (Udacity) — primary structured track, ~4 hrs/week lunch slots through ~22 Nov
3. Everything else (DataCamp paused as a track; Coursera/EdX/O'Reilly = gap-fill only, ~3 hrs/week leftover)

**Hard rules:** never delay a deliverable or Nanodegree deadline · "the cut rule" — unstarted modules move to Phase C, never cram · one primary resource per module.

**Also tracked:** Databricks training days · POSIT conference · COSO work deadline · WOFBEC.

---

## 21. Vocareum / Databricks + Lightning AI study

**Path:** `Vibe Coding\vocareum-training\` (Databricks agent courses) · `Downloads\lightning-ai-labs\` (nvidia/DLitOpen, LLM101n, etc.)
Sessions: Databricks Customer Academy passkey (14 Oct), restart VS Code kernel in Lightning AI Studio (9 Oct).

---

## 22. Creative writing

- Story of Lee and Kemi's visit (23 Oct 2026)
- Erotic stories (23 Oct 2026)

---

## 23. One-off household / utility tasks (not projects)

- Wayfair review (12 Oct 2026)
- ecobee thermostat recommended settings (5 Oct 2026)
- Casual check-in message to neighbour (18 Sep 2026)
- Use MiniMax desktop without coding plan (16 Oct 2026)
- Use Qwen tokens in Qwen Chat (16 Oct 2026)
- Identify computer type (16 Sep 2026)
- Minimax Code context window (17 Sep 2026)
- Edit images (31 Jul 2026)

---

## Session ledger (Jun → Oct 2026)

| Date | Topic |
|---|---|
| 6 Jun | **Powerball Predictor** built; **Master Development Plan 2026** original written |
| 11 Apr | **Mega Millions Predictions** notebook (Tkinter GUI) |
| 17 Apr | `Untitled.ipynb` in VibeCoding |
| 3 Jul | Create project; MarketSage + MarketSage-Analyzer repo begins |
| 31 Jul | Edit images |
| 9 Sep | Aso Oke sprint 3 opens; curriculum priority hierarchy set |
| 16 Sep | Identify computer type |
| 17 Sep | Context window; curriculum consolidation; Day 57 test set |
| 18 Sep | Neighbour check-in message |
| 5 Oct | ecobee thermostat settings |
| 9 Oct | Lightning AI Studio kernel restart |
| 12 Oct | Wayfair review |
| 14 Oct | Databricks Customer Academy passkey |
| 15–16 Oct | Custody calendar folder; Aso Oke decks; Qwen tokens; desktop plan |
| 1 Oct | `Q4-2026-MASTER-PLAN.md` v9 becomes the live plan |
| 23 Oct | Story of Lee & Kemi; erotic stories; this index |

---

## Master git remote index (all under user `donne4real`)

```
bible-app                    bible-app.leyesapps.workers.dev
bible-verse-detector-web     —
exam-prep-ng                 —
sermon-listener              —
vocab-app (vocabulary_app)   build-my-vocab.netlify.app
daily-plan                   Netlify
ngx-tracker                  ngx-tracker.pages.dev
PocketOffice                 —
MarketSage-Analyzer          —
100BaggerScreener            —
CombinedMarketAnalyzer       —
ETFAnalyzer                  —
MutualFundAnalyzer           —
stock-market-analyzer        —
aso-oke                      Target: 22 Nov 2026
```

---

## Gaps / unverified

- `gx-dashboard`, `gx-screener`, `gx-tracker` local folders are OneDrive placeholders — contents read via `SESSION_SUMMARY_20260924.md`, not directly.
- `custody-calendar` and `ExcelAI` show no git remote (local repos only).
- `C:\Users\Public\powerball-predictor\` has no git repo — version history not available.
- `Power Predictor App.docx` body text is 3 embedded PNG screenshots; no LibreOffice/Word available to render, so the screenshots were read directly as images.
- Transcripts for the earliest (3 Jul) sessions could not be read; those entries come from filesystem artifacts only.

---

## ⚠️ Security note (found 23 Oct 2026)

`C:\Users\leyea\OneDrive\Documents\Vibe Coding\keys.txt` and `keys_.txt` contain **plaintext API credentials** in an OneDrive-synced folder:
- a Databricks token (`dapi…`)
- a DeepSeek API key (`sk-…`) with `setx` persistence commands

**Recommended:** rotate both keys, move them to environment variables or a secrets manager, and delete the plaintext files. Anything in OneDrive is synced to cloud storage and should be treated as exposed.
