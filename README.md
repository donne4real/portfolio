# Portfolio — Leye Ajibola

**Live:** https://leye-ajibola.netlify.app

A single-page portfolio for AI Engineer applications. Static HTML/CSS/JS — no build step, no framework, no dependencies to keep current.

---

## Why it looks like this

Every number on the site is **measured, not estimated**, and every claim links back to the repository that produced it. The flagship project's most interesting result is a *failure* — an 8-epoch LoRA fine-tune that missed its pre-registered gate, and a zero-shot baseline that beat it. That's the story, so the site leads with it.

## Structure

```
index.html              markup + inline content
404.html                not-found page
favicon.svg
robots.txt
netlify.toml            build config, cache headers, redirects
assets/
  css/style.css         all styles (design tokens in :root)
  js/projects.js        ← single source of truth for project data
  js/main.js            rendering + interactions
```

## Updating the site

**To add or edit a project, edit `assets/js/projects.js` only.** The renderer picks up
`PROJECTS.aiml`, `PROJECTS.engineering` and `PROJECTS.demos` automatically. No rebuild.

```js
{
  title: "Project name",
  kind: "One-line category",
  status: "live",
  desc: "What it does and what's interesting about it.",
  tags: ["Python", "React"],
  metrics: [["Label", "Value"]],
  links: [{ label: "Repository", href: "https://github.com/..." }]
}
```

Then commit and push — Netlify redeploys automatically.

### ⚠️ Bump the asset version when you change CSS or JS

`index.html` references assets with a version query string:

```html
<link rel="stylesheet" href="assets/css/style.css?v=20261024">
<script src="assets/js/projects.js?v=20261024"></script>
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

## Deploy

Push to `main` → Netlify publishes automatically (build command is empty; `publish = "."`).

To deploy manually:

```bash
netlify deploy --prod --dir .
```

## Accessibility & performance notes

- Semantic landmarks, skip link, `aria-expanded` on the mobile nav toggle
- `prefers-reduced-motion` disables animation and smooth scroll
- Responsive from 360px up; the mobile menu replaces desktop nav under 720px
- Static JSON, system-font fallbacks, one CSS file, two small JS files — no framework payload
- Security headers set in `netlify.toml` (frame options, nosniff, referrer, permissions)

## Related

- Flagship project: https://github.com/donne4real/aso-oke
- All work: https://github.com/donne4real
