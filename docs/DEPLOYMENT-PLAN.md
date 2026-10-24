# Deployment Plan — Leye Ajibola Portfolio

**Created:** 23 Oct 2026 · **Status:** live and operational

---

## What this is

A single public entry point for every project, built to support an **AI Engineer** application.
Two layers:

1. **The portfolio hub** — one static site that tells the story and links to everything.
2. **The project fleet** — each project independently hosted, independently deployable, with live URLs.

The rule: the hub is a *signpost*, never a dependency. Every project must remain reachable on its
own URL even if the hub goes down.

---

## Architecture

```
                      ┌──────────────────────────┐
                      │  github.com/donne4real   │  ← 27 repos
                      │  (profile README)        │
                      └────────────┬─────────────┘
                                   │ links
                      ┌────────────▼─────────────┐
                      │  leye-ajibola.netlify.app│  ← portfolio hub
                      │  (donne4real/portfolio)  │
                      └────────────┬─────────────┘
                                   │ links to live demos
     ┌──────────────┬──────────────┼──────────────┬──────────────┐
     ▼              ▼              ▼              ▼              ▼
 Cloudflare       Netlify       GitHub Pages   Netlify        Netlify
 Workers/Pages    (static)      (static)       (static)       (static)
```

### Host selection rule

| Project type | Host | Why |
|---|---|---|
| Static site / PWA | **Netlify** | Already authenticated, 1-command deploy, `_headers` support |
| Static site / PWA | **GitHub Pages** | Lives with the repo, no third-party dashboard |
| React / TS edge app | **Cloudflare Workers / Pages** | Free edge runtime, great for offline-first PWAs |
| Streamlit / Python app | **Streamlit Community Cloud** | Free, purpose-built, handles the Python runtime |
| Flask app | **Render / Railway** | Free tier with a real Python runtime |
| Model / notebook artifact | **Hugging Face Spaces** | Ships with the model, where people look for it |

---

## The hub

**Repo:** `donne4real/portfolio` (public)
**Live:** https://leye-ajibola.netlify.app
**Deploy:** push to `main` → GitHub Actions → Netlify production deploy

### Why no build step

Static HTML/CSS/JS. No framework, no bundler, no `node_modules` to rot, no build to break. The
whole site is 9 files. Edit `assets/js/projects.js` to change the content; push; it is live in
about 40 seconds.

### Why that matters for the job hunt

A hiring manager who clones the portfolio repo sees readable HTML with no framework indirection.
A static site that has never broken also means the link in your resume works on the day of the
interview — which is the only thing the link is for.

### Files

```
index.html            markup + inline content
404.html              not-found page
favicon.svg
robots.txt
netlify.toml          build config, cache headers, security headers, redirects
assets/css/style.css  all styles; design tokens in :root
assets/js/projects.js ← single source of truth for project data
assets/js/main.js     rendering + interactions
.github/workflows/    deploy to Netlify on push to main
```

---

## The fleet — live URLs (all verified 200 on 23 Oct 2026)

| # | Project | Host | URL | Repo |
|---|---|---|---|---|
| 1 | Portfolio hub | Netlify | https://leye-ajibola.netlify.app | `donne4real/portfolio` |
| 2 | Word Up (edge) | Cloudflare Workers | https://bible-app.leyesapps.workers.dev | `donne4real/bible-app` |
| 3 | Word Up (netlify) | Netlify | https://bibleinafricanlanguages.netlify.app | `donne4real/bible-app` |
| 4 | NGX Tracker | Cloudflare Pages | https://ngx-tracker.pages.dev | `donne4real/ngx-tracker` |
| 5 | Cert Mastery | Netlify | https://cert-mastery.netlify.app | `donne4real/cert-mastery` |
| 6 | Powerball Predictor | Netlify | https://powerball-predictor.netlify.app | `donne4real/powerball-predictor` |
| 7 | Exam Prep NG | GitHub Pages | https://donne4real.github.io/exam-prep-ng/ | `donne4real/exam-prep-ng` |
| 8 | PocketOffice | GitHub Pages | https://donne4real.github.io/PocketOffice/ | `donne4real/PocketOffice` |
| 9 | Vocabulary App | Netlify | https://build-my-vocab.netlify.app | `donne4real/vocabulary_app` |
| 10 | Nia The Investigator | Netlify | https://niatheinvestigator.netlify.app | *(no repo)* |

**All 10 verified HTTP 200 on 23 Oct 2026.**

**Excluded from public portfolio (deliberate):** custody schedule app, household budget analysis,
religious/media material, personal/financial artifacts. These are not hiring signals.

**Dropped on request 23 Oct 2026:** Palmwine Tappers (`tappers-apprentice`) and Daily Plan
(`daily-plan`) — removed from the hub and the profile README. Both repos stay public on GitHub;
they are simply not featured.

---

## What is public vs private

| Visibility | Repos |
|---|---|
| **Public, featured** | portfolio, donne4real (profile), aso-oke, bible-app, bible-verse-detector, bible-verse-detector-web, cert-mastery, datainsight, daily-plan, DocSummarization, exam-prep-ng, MarketSage-Analyzer, CombinedMarketAnalyzer, ETFAnalyzer, MutualFundAnalyzer, 100BaggerScreener, stock-market-analyzer, wagner_stock_screener, stock_screener, ngx-tracker, PocketOffice, tappers-apprentice, vocabulary_app, sermon-listener, ds4a_work, Amazon-Bedrock-Summarization-Long-Document-POC |
| **Private (kept)** | stage_local_llm, qwen2.5-1.5b-model, data_insights, report_analyzer |
| **Deleted 23 Oct 2026** | ars, report_analyzer *(audit-report workstream — local backup kept)* |

---

## Auto-deploy

Both repos that deploy to Netlify run the same workflow (`.github/workflows/deploy.yml`):

```yaml
on: push -> main
jobs.deploy:
  - checkout
  - setup-node 20
  - npm i -g netlify-cli
  - netlify deploy --prod --dir . --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN
```

Secrets per repo: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.

**Why Actions rather than the Netlify GitHub App:** the App needs a browser authorisation step.
Actions need two repo secrets, which can be set entirely from the CLI. Same outcome, no manual
step, and the workflow file is visible in the repo — which is itself a portfolio signal.

**Netlify build hooks** also exist as a manual redeploy trigger:
- portfolio → `https://api.netlify.com/build_hooks/6adbf5f07e28a72e0cf2e8c3`
- cert-mastery → `https://api.netlify.com/build_hooks/6adbf5f16939f1614774163e`

`curl -X POST <hook>` redeploys from the linked source.

---

## Still to do

| # | Item | Why | Effort |
|---|---|---|---|
| 1 | **Custom domain** | `leyeajibola.dev` (~€10/yr) is stronger on a resume than a platform subdomain | 10 min + DNS |
| 2 | **Streamlit Community Cloud deploys** | MarketSage, ETF/MutualFund/100Bagger, UnifiedInvestmentPlatform, DocSummarization, DataInsight — 6 more live demos | ~15 min each (OAuth once) |
| 3 | **Hugging Face Spaces** | Aso Oke demo ships there on 13 Dec 2026; the site already links it | built into the project |
| 4 | **`Nia The Investigator`** | Live but has no GitHub repo — push it so the demo has a source link | 20 min |
| 5 | **Repo READMEs** | Several public repos have no README (tappers-apprentice, ds4a_work) | 30 min |
| 6 | **`sermon-listener`** | Public but not featured — decide if it belongs | 5 min |
| 7 | **Open Graph image** | Portfolio has no `og:image` — add a screenshot for link previews | 15 min |
| 8 | **Resume PDF** | Aso Oke ships a whitepaper + field reports; assemble a 1-page PDF resume from `CAREER-ASSETS.md` | 1 hr |
| 9 | **Delete `ars` + `report_analyzer`** | Audit-report workstream; the `gh` token lacks the `delete_repo` scope. Local backup exists in the session workspace | 2 min once authorised |

---

## Caching rule for the hub (important)

The hub has **no build step**, so assets are hand-edited and have no content hash. Two rules keep
visitors off stale content:

1. `index.html` references assets with a version string — `assets/js/projects.js?v=20261024`.
   **Bump `?v=` in all three references whenever you edit `style.css`, `main.js` or `projects.js`.**
2. `netlify.toml` sets `Cache-Control: public, max-age=0, must-revalidate` on `/assets/*` as a
   second line of defence.

*What went wrong once:* the first build served `/assets/*` with `max-age=31536000, immutable`.
A returning browser kept the old `projects.js` indefinitely, so an edit to the project list did
not appear even though the deploy was correct. Fixed by both rules above.

Editing only the **data** in `projects.js` needs no version bump — the file is fetched fresh.

---

## Maintenance rules

1. **A new project gets three things**: a GitHub repo, a live URL, and an entry in `projects.js`. Two out of three is not finished.
2. **Never link a repo that is private.** The hub is public; a private link is a dead end for a recruiter.
3. **Every claim on the hub must link to its source.** Numbers come from the project's own reference docs, never from memory.
4. **Health-check the fleet before any interview.** A dead link in a live interview costs more than a missing project.
5. **Keep the hub dependency-free.** If the portfolio is down, every project is still reachable.

### Health check

```powershell
$urls = @(
 'https://leye-ajibola.netlify.app',
 'https://bible-app.leyesapps.workers.dev',
 'https://ngx-tracker.pages.dev',
 'https://cert-mastery.netlify.app',
 'https://donne4real.github.io/exam-prep-ng/',
 'https://donne4real.github.io/PocketOffice/',
 'https://donne4real.github.io/tappers-apprentice/',
 'https://leyes-daily-plan.netlify.app',
 'https://build-my-vocab.netlify.app',
 'https://bibleinafricanlanguages.netlify.app',
 'https://niatheinvestigator.netlify.app'
)
foreach ($u in $urls) {
  try { $r = Invoke-WebRequest $u -TimeoutSec 20 -UseBasicParsing
        "{0,-48} {1}" -f $u, $r.StatusCode }
  catch { "{0,-48} DEAD" -f $u }
}
```

---

## Related documents

- `PROJECT-INDEX.md` — the full project inventory (23 projects, paths, live URLs, git remotes)
- `CAREER-ASSETS.md` (in `aso-oke-project\`) — résumé bullets, talk outline, interview Q&A
- `RESUME-AND-PRESENTATION.md` (in `aso-oke-project\superseded\`) — the Aso Oke résumé kit
