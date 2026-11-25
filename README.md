# Portfolio — Leye Ajibola

**Live:** [https://leyeajibola.com](https://leyeajibola.com)

A zero-framework AI Engineer portfolio deployed to **Cloudflare Pages** via GitHub Actions. Static HTML/CSS/JS — no build step, no runtime dependencies, dark/light themes, interactive project filtering, and a live Technical / Plain-English reading mode toggle.

## Structure

```
index.html              Main portfolio page (split hero, benchmark card, flagship architecture, project explorer)
resume.html             Printable résumé (synced with live URLs & print CSS)
404.html                Custom not-found page
_headers                Cloudflare Pages security & asset cache headers
_redirects              Shortlinks (/repo, /aso-oke, /resume, /cv)
robots.txt              SEO crawler config (leyeajibola.com)
sitemap.xml             XML sitemap (leyeajibola.com)
favicon.svg             LA monogram favicon
assets/
  og-card.png           1200×630 Open Graph / Twitter social preview card
  css/style.css         Design tokens (dark + light theme) and responsive layout
  css/resume.css        Résumé + print stylesheet
  js/projects.js        Single source of truth for flagship, projects, demos, stats & glossary
  js/main.js            Renderer, filters, search, mode toggle, theme toggle & copy-email UX
```

## Updating content

Edit `assets/js/projects.js` to add or update projects, metrics, or live apps. When changing CSS or JS, bump the `?v=YYYYMMDD` query parameter in `index.html` and `resume.html`.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) deploys automatically to Cloudflare Pages (`leye-ajibola` → `leyeajibola.com`).
