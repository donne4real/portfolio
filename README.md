# Portfolio — Leye Ajibola

**Live:** https://leye-ajibola.netlify.app

A single-page portfolio for AI Engineer applications. Static HTML/CSS/JS — no build step, no framework, no dependencies to keep current.

---

## Why it looks like this

Every number on the site is **measured, not estimated**, and every claim links back to the repository that produced it. The flagship project's most interesting result is a *failure* — an 8-epoch LoRA fine-tune that missed its pre-registered gate, and a zero-shot baseline that beat it. That's the story, so the site leads with it.

## Structure

```
index.html              markup + inline content
resume.html             printable résumé (print CSS included)
404.html                not-found page
sitemap.xml             referenced by robots.txt
favicon.svg
robots.txt
netlify.toml            build config, cache headers, redirects
assets/
  css/style.css         all styles (design tokens in :root)
  css/resume.css        résumé styles + print rules
  js/projects.js        ← single source of truth for project data
  js/main.js            rendering + interactions
docs/
  PROJECT-INDEX.md      every project, with paths and status
  DEPLOYMENT-PLAN.md    deployment and hosting plan
```

## Updating the site

**To add or edit a project, edit `assets/js/projects.js` only.** The renderer picks up
every section automatically — `PROJECTS.aiml`, `PROJECTS.ai`, `PROJECTS.faith`,
`PROJECTS.engineering`, `PROJECTS.finance`, `PROJECTS.productivity`, `PROJECTS.learning`,
`PROJECTS.health` and `PROJECTS.demos`. No rebuild.

```js
{
  title: "Project name",
  kind: "One-line category",
  status: "live",                 // "live" | "soon" | anything else
  statusLabel: "Internal tool",   // badge text when status isn't "live"
  desc: "Plain-English description. Say what it does, not how it does it.",
  tags: ["Python", "React"],
  metrics: [["Label", "Value"]],
  links: [{ label: "Repository", href: "https://github.com/..." }]
}
```

Section headings (`SECTIONS`), the headline numbers (`STATS`) and the writing links
(`WRITING`) live in the same file, so content and headings can never drift apart.

Then commit and push — Netlify redeploys automatically.

### ⚠️ Bump the asset version when you change CSS or JS

`index.html` references assets with a version query string:

```html
<link rel="stylesheet" href="assets/css/style.css?v=20261117a">
<script src="assets/js/projects.js?v=20261117a"></script>
```

**Whenever you edit `style.css`, `main.js` or `projects.js`, bump `?v=` in all three
references.** The assets are hand-edited with no content hashing, so without a version
bump a returning visitor's browser can serve a stale copy. `netlify.toml` sets
`Cache-Control: max-age=0, must-revalidate` on `/assets/*` as a second line of defence,
but the version bump is the guarantee.

Changing only `projects.js` content (the data) does **not** need a version bump —
edit the data and push, and the page picks it up on the next load.

### Design tokens

All colour, radius and typography values live in the `:root` block of `assets/css/style.css`.
Dark theme, accent `#7C9CFF`, green `#4ADE80` for live status, amber for pending.

## Rules this site follows

1. **Every number is measured, not estimated.** Each figure was checked against the live
   application or the repository. If you add a metric, verify it the same way.
2. **One source of truth.** Content lives in `projects.js`. The HTML holds structure only.
3. **Write for a non-specialist.** The `desc` field is read by people who don't know what
   LoRA is. Technical detail belongs in `tags`.
4. **No dead links.** Every URL in `links` and `demos` was checked live.
5. **Say what didn't work.** The Aso Oke card deliberately reports the model that failed
   its pass mark, and the translation score that fell short.

## Deploy

Push to `main` → GitHub Actions → Netlify publishes automatically (build command is empty;
`publish = "."`).

To deploy manually:

```bash
netlify deploy --prod --dir .
```

## Verification record

All links and metrics re-verified **17 November 2026**:

- 10 live demo cards → HTTP 200 (NGX Tracker sits behind Cloudflare Access, so it returns
  a sign-in page rather than the app)
- Cert Mastery → **1,800 questions** across 6 certifications (300 each)
- Exam Prep NG → **12,675 questions** across 12 subjects / 23 board combinations
- Bible in African Languages → **22 translations**, 19 with offline bundles
- Powerball Predictor → **296 draws** in `python/data/powerball_history.csv`
- Google Play → **50+ downloads**, no data collected

## Accessibility & performance notes

- Semantic landmarks, skip link, `aria-expanded` on the mobile nav toggle
- `prefers-reduced-motion` disables animation and smooth scroll
- Responsive from 360px up; the mobile menu replaces desktop nav under 720px
- Static JSON, system-font fallbacks, one CSS file, two small JS files — no framework payload
- Security headers set in `netlify.toml` (frame options, nosniff, referrer, permissions)

## Related

- Flagship project: https://github.com/donne4real/aso-oke
- All work: https://github.com/donne4real
