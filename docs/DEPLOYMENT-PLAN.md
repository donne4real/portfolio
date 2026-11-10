# Deployment Plan — Leye Ajibola Portfolio

**Created:** 23 Oct 2026 · **Updated:** 9 Nov 2026 · **Status:** live and operational

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

## The fleet — live URLs (all verified 200 on 9 Nov 2026)

| # | Project | Host | URL | Repo |
|---|---|---|---|---|
| 1 | Portfolio hub | Netlify | https://leye-ajibola.netlify.app | `donne4real/portfolio` |
| 2 | Bible in African Languages (primary) | Cloudflare Workers | https://bible-app.leyesapps.workers.dev | `donne4real/bible-app` |
| 3 | Bible in African Languages — Google Play | Google Play | https://play.google.com/store/apps/details?id=com.wordupafrica.biblereader | `donne4real/bible-app` |
| 4 | Bible in African Languages — store page | Cloudflare Pages | https://wordupbibleapp.pages.dev | *(landing page)* |
| 5 | Bible Verse Detector | Netlify | https://bible-verse-detector.netlify.app | `donne4real/bible-verse-detector` |
| 6 | NGX Tracker | Cloudflare Pages | https://ngx-tracker.pages.dev | `donne4real/ngx-tracker` |
| 7 | Cert Mastery | Netlify | https://cert-mastery.netlify.app | `donne4real/cert-mastery` |
| 8 | Cert Mastery (mirror) | Netlify | https://certification-mastery.netlify.app | `donne4real/cert-mastery` |
| 9 | Powerball Predictor | Netlify | https://powerball-predictor.netlify.app | `donne4real/powerball-predictor` |
| 10 | Exam Prep NG | GitHub Pages | https://donne4real.github.io/exam-prep-ng/ | `donne4real/exam-prep-ng` |
| 11 | PocketOffice | GitHub Pages | https://donne4real.github.io/PocketOffice/ | `donne4real/PocketOffice` |
| 12 | Vocabulary App | Netlify | https://build-my-vocab.netlify.app | `donne4real/vocabulary_app` |
| 13 | Nia The Investigator | Netlify | https://niatheinvestigator.netlify.app | *(no repo)* |
| 14 | Bible in African Languages (legacy mirror) | Netlify | https://bibleinafricanlanguages.netlify.app | `donne4real/bible-app` — *retiring, not featured* |
| 15 | Bible in African Languages — store page (legacy) | Netlify | https://wordupbibleapp.netlify.app | *(landing page)* — *stays live: the Play listing links here* |

**All 15 verified HTTP 200 on 9 Nov 2026.**

**Excluded from public portfolio (deliberate):** custody schedule app, household budget analysis,
religious/media material, personal/financial artifacts. These are not hiring signals.

**Dropped on request 23 Oct 2026:** Palmwine Tappers (`tappers-apprentice`) and Daily Plan
(`daily-plan`) — removed from the hub and the profile README. Both repos stay public on GitHub;
they are simply not featured.

**Dropped on request 9 Nov 2026:** DocSummarization — removed from the hub and the profile README.
The repo stays public; it is just no longer a featured project.

---

## What is public vs private

| Visibility | Repos |
|---|---|
| **Public, featured** | portfolio, donne4real (profile), aso-oke, bible-app, bible-verse-detector, bible-verse-detector-web, cert-mastery, datainsight, exam-prep-ng, MarketSage-Analyzer, CombinedMarketAnalyzer, ETFAnalyzer, MutualFundAnalyzer, 100BaggerScreener, stock-market-analyzer, wagner_stock_screener, stock_screener, ngx-tracker, PocketOffice, vocabulary_app, sermon-listener, ds4a_work, Amazon-Bedrock-Summarization-Long-Document-POC |
| **Public, not featured** | daily-plan, tappers-apprentice, DocSummarization — dropped from the hub and profile README on request; repos stay public |
| **Private (kept)** | stage_local_llm, qwen2.5-1.5b-model, data_insights |
| **Deleted 23 Oct 2026** | ars, report_analyzer *(audit-report workstream — deleted after `delete_repo` scope was granted; local backup kept)* |

---

## Netlify → Cloudflare migration (in progress)

**The situation:** "Word Up Bible Reader" and "Bible in African Languages" are the *same app*,
deployed twice — the Cloudflare Worker at `bible-app.leyesapps.workers.dev` and a Netlify mirror at
`bibleinafricanlanguages.netlify.app`. Cloudflare is the destination; the Netlify mirror is retired
and is no longer featured in the portfolio.

**What has already moved:**

| Asset | From | To |
|---|---|---|
| The app itself | Netlify mirror | **already primary on Cloudflare Workers** (worker `bible-app`, D1 `bible-app-db`, edge function `bible-proxy`) |
| Store landing page | `wordupbibleapp.netlify.app` | **`https://wordupbibleapp.pages.dev`** (Cloudflare Pages project `wordupbibleapp`) |

**The Netlify store page stays live on purpose.** The Google Play listing's *website* field still
points at `https://wordupbibleapp.netlify.app/`, so that deployment is what keeps the listing's link
alive. Repoint the Play listing at `https://wordupbibleapp.pages.dev/`, then the Netlify copy can be
deleted with no broken link.

### Deploying the store page to Cloudflare Pages

```powershell
$WR  = 'C:\Users\leyea\OneDrive\Documents\Vibe Coding\Claude\bible-app\node_modules\wrangler\bin\wrangler.js'
node $WR pages deploy <dir> --project-name=wordupbibleapp --branch=main --commit-dirty=true
```

Two wrangler traps on this machine:

1. **The credential file lives at `%APPDATA%\xdg.config\.wrangler\config\default.toml`**, not at
   `~\.wrangler`. A plain `wrangler` invocation resolves the *other* path and reports
   "Not logged in … set CLOUDFLARE_API_TOKEN". Either export
   `XDG_CONFIG_HOME=$env:APPDATA\xdg.config`, or read the `oauth_token` out of that file and pass it
   as `CLOUDFLARE_API_TOKEN`. The OAuth token is valid for about an hour from login.
2. **`wrangler` is not on PATH.** Use the binary inside the bible-app repo's `node_modules`.

---

## Auto-deploy

Three repos that deploy to Netlify run the same workflow (`.github/workflows/deploy.yml`):

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
| 9 | ~~Delete `ars` + `report_analyzer`~~ | **Done 23 Oct 2026** — both permanently deleted from GitHub once the `delete_repo` scope was granted; local backups retained in the session workspace | — |
| 10 | ~~Stale "Word Up" names in `bible-app`~~ | **Done 9 Nov 2026** — `public/privacy.html` title and body, and `public/sw.js` `CACHE_NAME` → `bible-in-african-languages-v12`. `package.json` and `capacitor.config.ts` were already correct | — |
| 11 | **Store landing page has no repo** | `wordupbibleapp` is deployed but the source is not version-controlled — push it so the Play listing's website link has a source | 20 min |
| 12 | **Repoint the Play listing's website field** | Still `https://wordupbibleapp.netlify.app/`; the migration target is `https://wordupbibleapp.pages.dev/`. After that, the Netlify store page can be deleted | 5 min |
| 13 | **Delete the Netlify Bible mirror** | `bibleinafricanlanguages.netlify.app` is retired — delete the Netlify site once nothing links to it | 5 min |
| 14 | **Version the store landing page** | Same as #11 — source should live in a repo, not only in the session workspace | 20 min |
| 15 | ⚠️ **`ngx-tracker` is behind Cloudflare Access** | The hub and the profile README link to `https://ngx-tracker.pages.dev`, but anonymous visitors get a **"Sign in — Cloudflare Access"** wall instead of the app. It still returns HTTP 200, so a plain link check will not catch it. Left as-is on 9 Nov 2026 because the app is a private work in progress — **before you apply, either remove the link from the hub and profile or open the app up** | 5 min |

---

## Deploying a directory to an existing Netlify site

The Netlify CLI is the only deploy path on this machine. One trap:

```powershell
netlify deploy --prod --no-build --dir=. --site <site-id>
```

**`--no-build` is required.** Without it the CLI tries to auto-detect the build command, finds
several candidates (it even suggested `remix vite:build` for a static folder), and opens an
interactive `inquirer` prompt. A non-interactive session cannot answer it, and the CLI dies with
`Error: Netlify CLI has terminated unexpectedly` / `ERR_USE_AFTER_CLOSE: readline was closed`.

The CLI must also not be pointed at a folder whose parent contains a `package.json` — framework
detection walks upward from the working directory. Deploy from a self-contained directory.

Deploying to a site created through the API (`wordupbibleapp`) works with `--site <uuid>` — the
UUID, not the site name.

---

## Caching rule for the hub (important)

The hub has **no build step**, so assets are hand-edited and have no content hash. Two rules keep
visitors off stale content:

1. `index.html` references assets with a version string — `assets/js/projects.js?v=20261109`.
   **Bump `?v=` in all three references whenever you edit `style.css`, `main.js` or `projects.js`.**
   Current value: `20261109b` (bumped 9 Nov 2026 for the Bible rename, the corrected Play Store
   figures, the DocSummarization removal and the Cloudflare Pages store page).
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
6. **Read the metric on the page that publishes it — do not scrape it.** The Play listing was once published as "4.6★" because a regex picked the first `aria-label="Rated N stars…"` out of the page — and that star belonged to a *similar app* in the carousel. The listing has no reviews, so it shows no rating at all. The fix was to open the listing and read the header: **50+ Downloads**, **Everyone**, no stars. A wrong number on a portfolio is worse than a missing one.

### Health check

```powershell
$urls = @(
 'https://leye-ajibola.netlify.app',
 'https://bible-app.leyesapps.workers.dev',
 'https://bibleinafricanlanguages.netlify.app',
 'https://wordupbibleapp.pages.dev',
 'https://wordupbibleapp.netlify.app',
 'https://bible-verse-detector.netlify.app',
 'https://ngx-tracker.pages.dev',
 'https://cert-mastery.netlify.app',
 'https://certification-mastery.netlify.app',
 'https://powerball-predictor.netlify.app',
 'https://donne4real.github.io/exam-prep-ng/',
 'https://donne4real.github.io/PocketOffice/',
 'https://build-my-vocab.netlify.app',
 'https://niatheinvestigator.netlify.app'
)
foreach ($u in $urls) {
  try { $r = Invoke-WebRequest $u -TimeoutSec 20 -UseBasicParsing
        $wall = if ($r.Content -match 'Cloudflare Access') { 'LOGIN WALL' } else { '' }
        "{0,-48} {1} {2}" -f $u, $r.StatusCode, $wall }
  catch { "{0,-48} DEAD" -f $u }
}
```

**Check the body, not just the status code.** A site behind Cloudflare Access returns `200` with a
sign-in page, so a status-only health check calls it healthy. The `LOGIN WALL` marker above is what
catches that — it is the check that would have flagged `ngx-tracker` on 9 Nov 2026.

---

## Related documents

- `PROJECT-INDEX.md` — the full project inventory (23 projects, paths, live URLs, git remotes)
- `CAREER-ASSETS.md` (in `aso-oke-project\`) — résumé bullets, talk outline, interview Q&A
- `RESUME-AND-PRESENTATION.md` (in `aso-oke-project\superseded\`) — the Aso Oke résumé kit
