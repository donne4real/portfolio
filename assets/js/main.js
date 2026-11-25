/* ============================================================
   Portfolio renderer & interactive controls — leyeajibola.com
   ============================================================ */

(function () {
  "use strict";

  var state = {
    mode: "tech",        // "tech" | "plain"
    proofTab: "wer",
    category: "all",
    liveOnly: false,
    search: "",
    tag: ""
  };

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function showToast(msg) {
    var el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("show");
    }, 2200);
  }

  /* ---------- theme ---------- */

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("la-theme"); } catch (_) {}
    var preferred = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    applyTheme(saved || preferred);

    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
        try { localStorage.setItem("la-theme", next); } catch (_) {}
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#FAFAF8" : "#080A0F");
    var sun = document.getElementById("iconSun");
    var moon = document.getElementById("iconMoon");
    if (sun && moon) {
      sun.style.display = theme === "light" ? "none" : "block";
      moon.style.display = theme === "light" ? "block" : "none";
    }
  }

  /* ---------- audience mode (Technical vs Plain English) ---------- */

  function setMode(mode) {
    state.mode = mode === "plain" ? "plain" : "tech";
    try { localStorage.setItem("la-mode", state.mode); } catch (_) {}

    document.querySelectorAll("[data-mode-btn]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-mode-btn") === state.mode));
    });

    var heroTech = document.getElementById("heroLedeTech");
    var heroPlain = document.getElementById("heroLedePlain");
    if (heroTech && heroPlain) {
      heroTech.hidden = state.mode !== "tech";
      heroPlain.hidden = state.mode !== "plain";
    }

    var glossaryPanel = document.getElementById("glossaryPanel");
    if (glossaryPanel) {
      glossaryPanel.hidden = state.mode !== "plain";
    }

    renderFlagship();
    renderProjects();
  }

  /* ---------- renderers ---------- */

  function renderBenchmarks() {
    var el = document.getElementById("benchBars");
    if (!el) return;
    el.innerHTML = FLAGSHIP.benchmarks.map(function (b) {
      return '<div class="bench-row">' +
        '<div class="bench-row-top">' +
          '<span class="bench-label">' + esc(b.label) + '</span>' +
          '<span class="bench-val ' + esc(b.tone) + '">' + b.value.toFixed(1) + '% WER · ' + esc(b.note) + '</span>' +
        '</div>' +
        '<div class="bench-track">' +
          '<div class="bench-fill ' + esc(b.tone) + '" style="width:' + Math.min(100, b.value) + '%"></div>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  function renderStats() {
    var el = document.getElementById("statsGrid");
    if (!el) return;
    el.innerHTML = STATS.map(function (s) {
      return '<div class="stat"><dt>' + esc(s.value) + '</dt><dd>' +
        '<span class="stat-label">' + esc(s.label) + '</span>' +
        '<span class="stat-note">' + esc(s.note) + '</span>' +
      '</dd></div>';
    }).join("");
  }

  function renderGlossary() {
    var el = document.getElementById("glossaryList");
    if (!el) return;
    el.innerHTML = GLOSSARY.map(function (item) {
      return '<div><dt>' + esc(item[0]) + '</dt><dd>' + esc(item[1]) + '</dd></div>';
    }).join("");
  }

  function renderFlagship() {
    var isPlain = state.mode === "plain";
    var sub = document.getElementById("flagshipSub");
    if (sub) sub.textContent = isPlain ? FLAGSHIP.subtitlePlain : FLAGSHIP.subtitleTech;

    var copy = document.getElementById("flagshipCopy");
    if (copy) {
      var paras = isPlain ? FLAGSHIP.summaryPlain : FLAGSHIP.summaryTech;
      copy.innerHTML = paras.map(function (p) { return "<p>" + p + "</p>"; }).join("");
    }

    var facts = document.getElementById("flagshipFacts");
    if (facts) {
      var list = isPlain ? FLAGSHIP.factsPlain : FLAGSHIP.factsTech;
      facts.innerHTML = list.map(function (f) {
        return '<li><strong>' + esc(f[0]) + '</strong><span>' + esc(f[1]) + '</span></li>';
      }).join("");
    }

    var stack = document.getElementById("flagshipStack");
    if (stack) {
      stack.innerHTML = FLAGSHIP.stack.map(function (t) {
        return '<li><span>' + esc(t) + '</span></li>';
      }).join("");
    }

    var disc = document.getElementById("flagshipDiscipline");
    if (disc) {
      disc.innerHTML = FLAGSHIP.discipline.map(function (d) {
        return '<li>' + esc(d) + '</li>';
      }).join("");
    }

    renderProofWidget();
  }

  function renderProofWidget() {
    var box = document.getElementById("flagshipProof");
    if (!box || !FLAGSHIP.proofTabs) return;
    var active = FLAGSHIP.proofTabs.find(function (t) { return t.id === state.proofTab; }) || FLAGSHIP.proofTabs[0];

    var tabsHtml = '<div class="proof-tabs" role="tablist" aria-label="Aso Oke measured evidence">' +
      FLAGSHIP.proofTabs.map(function (t) {
        var sel = t.id === active.id;
        return '<button type="button" class="proof-tab" role="tab" data-proof-tab="' + esc(t.id) + '" aria-selected="' + sel + '">' + esc(t.label) + '</button>';
      }).join("") + '</div>';

    var bodyHtml = '<p class="proof-kicker">' + esc(active.kicker) + '</p>' +
      '<p class="proof-summary">' + esc(active.summary) + '</p>';

    if (active.cards) {
      bodyHtml += '<div class="proof-compare">' + active.cards.map(function (c) {
        return '<div class="proof-item ' + esc(c.tone) + '">' +
          '<span class="proof-item-tag">' + esc(c.tag) + '</span>' +
          '<span class="proof-item-title">' + esc(c.title) + '</span>' +
          '<span class="proof-item-metric">' + esc(c.metric) + '</span>' +
          '<span class="proof-item-note">' + esc(c.note) + '</span>' +
        '</div>';
      }).join("") + '</div>';
    } else if (active.sample) {
      var sm = active.sample;
      bodyHtml += '<div class="tone-sample">' +
        '<div class="tone-grid">' +
          '<div class="tone-col">' +
            '<span class="tone-col-lbl good">Unicode NFD tonal Yorùbá (preserved)</span>' +
            '<p class="tone-quote">' + esc(sm.yoruba) + '</p>' +
            '<p class="tone-trans">' + esc(sm.english) + '</p>' +
          '</div>' +
          '<div class="tone-col">' +
            '<span class="tone-col-lbl bad">Tone-stripped ASCII (corrupted)</span>' +
            '<p class="tone-quote">' + esc(sm.stripped) + '</p>' +
            '<p class="tone-trans">Ambiguous lexical tone &amp; vowel subdots lost</p>' +
          '</div>' +
        '</div>' +
        '<p class="tone-why">' + esc(sm.why) + '</p>' +
        '<span class="tone-src">' + esc(sm.source) + '</span>' +
      '</div>';
    }

    box.innerHTML = tabsHtml + '<div class="proof-panel" role="tabpanel">' + bodyHtml + '</div>';
  }

  function matchesProject(p) {
    if (state.category !== "all" && p.category !== state.category) return false;
    if (state.liveOnly && p.status !== "live" && p.status !== "private") return false;
    if (state.tag) {
      var tLower = state.tag.toLowerCase();
      var hasTag = (p.tags || []).some(function (t) { return t.toLowerCase().indexOf(tLower) !== -1; });
      if (!hasTag) return false;
    }
    if (state.search) {
      var q = state.search.toLowerCase();
      var hay = [p.title, p.kind, p.descTech, p.descPlain, (p.tags || []).join(" ")].join(" ").toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function renderFilterPills() {
    var el = document.getElementById("filterPills");
    if (!el) return;
    el.innerHTML = CATEGORIES.map(function (cat) {
      var count = cat.id === "all"
        ? PROJECTS.length
        : PROJECTS.filter(function (p) { return p.category === cat.id; }).length;
      var active = state.category === cat.id;
      return '<button type="button" class="pill" data-cat="' + esc(cat.id) + '" aria-pressed="' + active + '">' +
        esc(cat.label) + ' <span class="pill-count">' + count + '</span></button>';
    }).join("");
  }

  function renderCard(p) {
    var badge = "";
    if (p.status === "live") {
      badge = '<span class="badge badge-live"><span class="pulse" aria-hidden="true"></span>Live</span>';
    } else if (p.status === "private") {
      badge = '<span class="badge badge-private">' + esc(p.statusLabel || "Private") + '</span>';
    } else if (p.statusLabel) {
      badge = '<span class="badge">' + esc(p.statusLabel) + '</span>';
    }

    var desc = state.mode === "plain" ? p.descPlain : p.descTech;

    var metricsHtml = p.metrics && p.metrics.length
      ? '<ul class="card-metrics">' + p.metrics.map(function (m) {
          return '<li><span>' + esc(m[0]) + '</span><span>' + esc(m[1]) + '</span></li>';
        }).join("") + '</ul>'
      : "";

    var tagsHtml = p.tags && p.tags.length
      ? '<ul class="tags">' + p.tags.map(function (t) {
          var isAct = state.tag && state.tag.toLowerCase() === t.toLowerCase();
          return '<li><button type="button" data-filter-tag="' + esc(t) + '" class="' + (isAct ? "active" : "") + '" title="Filter by ' + esc(t) + '">' + esc(t) + '</button></li>';
        }).join("") + '</ul>'
      : "";

    var linksHtml = p.links && p.links.length
      ? '<div class="card-actions">' + p.links.map(function (l) {
          return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' +
            esc(l.label) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>';
        }).join("") + '</div>'
      : "";

    var previewHtml = p.preview
      ? '<button type="button" class="card-preview" data-preview-src="' + esc(p.preview) + '" data-preview-title="' + esc(p.title) + '" aria-label="Enlarge screenshot of ' + esc(p.title) + '">' +
          '<img src="' + esc(p.preview) + '" alt="' + esc(p.title) + ' live interface preview" loading="lazy" decoding="async" width="800" height="475">' +
          '<span class="card-preview-badge">Preview</span>' +
        '</button>'
      : "";

    var archHtml = p.architecture
      ? '<details class="arch-drawer">' +
          '<summary>Architecture &amp; tradeoffs</summary>' +
          '<dl class="arch-drawer-list">' +
            '<dt>Problem</dt><dd>' + esc(p.architecture.problem) + '</dd>' +
            '<dt>Constraints</dt><dd>' + esc(p.architecture.constraints) + '</dd>' +
            '<dt>Key tradeoff</dt><dd>' + esc(p.architecture.tradeoff) + '</dd>' +
            '<dt>Outcome</dt><dd>' + esc(p.architecture.outcome) + '</dd>' +
          '</dl>' +
        '</details>'
      : "";

    return '<article class="card">' +
      previewHtml +
      '<div class="card-top"><h3>' + esc(p.title) + '</h3>' + badge + '</div>' +
      '<p class="card-kind">' + esc(p.kind) + '</p>' +
      '<p class="card-desc">' + esc(desc) + '</p>' +
      archHtml +
      metricsHtml +
      tagsHtml +
      linksHtml +
    '</article>';
  }

  function renderProjects() {
    var grid = document.getElementById("projectGrid");
    if (!grid) return;

    var filtered = PROJECTS.filter(matchesProject);
    if (!filtered.length) {
      grid.innerHTML = '<div class="empty-state"><p>No projects match that filter.</p>' +
        '<button type="button" class="btn btn-sm btn-ghost" id="emptyReset">Reset filters</button></div>';
      var resetBtn = document.getElementById("emptyReset");
      if (resetBtn) resetBtn.addEventListener("click", resetFilters);
    } else {
      grid.innerHTML = filtered.map(renderCard).join("");
    }

    var bar = document.getElementById("activeFilterBar");
    var summary = document.getElementById("filterSummary");
    var hasFilter = state.category !== "all" || state.liveOnly || state.search || state.tag;
    if (bar && summary) {
      bar.hidden = !hasFilter;
      var parts = ["Showing " + filtered.length + " of " + PROJECTS.length + " projects"];
      if (state.tag) parts.push("tag: " + state.tag);
      if (state.liveOnly) parts.push("live only");
      if (state.search) parts.push('search: "' + state.search + '"');
      summary.textContent = parts.join(" · ");
    }
  }

  function resetFilters() {
    state.category = "all";
    state.liveOnly = false;
    state.search = "";
    state.tag = "";
    var inp = document.getElementById("projectSearch");
    if (inp) inp.value = "";
    var lt = document.getElementById("liveOnlyToggle");
    if (lt) lt.setAttribute("aria-pressed", "false");
    renderFilterPills();
    renderProjects();
  }

  function renderDemos() {
    var el = document.getElementById("gridDemos");
    if (!el) return;
    el.innerHTML = DEMOS.map(function (d) {
      var links = d.links && d.links.length ? d.links : [{ label: "", href: d.url }];
      var primary = links[0] || { href: "#" };
      var others = links.slice(1);
      var isPriv = d.state === "private";

      var extra = others.length
        ? '<div class="demo-extra">' + others.map(function (l) {
            return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' +
              esc(l.label) + ' <span aria-hidden="true">&rarr;</span></a>';
          }).join("") + '</div>'
        : "";

      return '<article class="demo">' +
        '<a class="demo-main" href="' + esc(primary.href) + '" target="_blank" rel="noopener">' +
          '<div class="demo-top">' +
            '<span class="demo-name">' + esc(d.name) + '</span>' +
            '<span class="status' + (isPriv ? " private" : "") + '">' +
              '<span class="pulse" aria-hidden="true"></span>' + (isPriv ? "access" : "live") +
            '</span>' +
          '</div>' +
          '<p>' + esc(d.desc) + '</p>' +
          '<span class="demo-url">' + esc(primary.href.replace(/^https?:\/\//, "")) + '</span>' +
        '</a>' +
        extra +
      '</article>';
    }).join("");
  }

  function renderWriting() {
    var el = document.getElementById("gridWriting");
    if (!el) return;
    el.innerHTML = WRITING.map(function (w) {
      var links = (w.links || []).map(function (l) {
        var ext = l.external || /^https?:\/\//.test(l.href);
        return '<a href="' + esc(l.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' +
          esc(l.label) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>';
      }).join("");
      return '<article class="card">' +
        '<h3>' + esc(w.title) + '</h3>' +
        '<p class="card-kind">' + esc(w.kind) + '</p>' +
        '<p class="card-desc">' + esc(w.desc) + '</p>' +
        '<div class="card-actions">' + links + '</div>' +
      '</article>';
    }).join("");
  }

  function renderToolkit() {
    var el = document.getElementById("toolkitGroups");
    if (!el) return;
    el.innerHTML = TOOLKIT.map(function (g) {
      return '<div class="toolkit-group">' +
        '<h4>' + esc(g.group) + '</h4>' +
        '<ul class="tags">' + g.items.map(function (item) {
          return '<li><button type="button" data-toolkit-tag="' + esc(item) + '" title="Show projects using ' + esc(item) + '">' + esc(item) + '</button></li>';
        }).join("") + '</ul>' +
      '</div>';
    }).join("");
  }

  /* ---------- interactions ---------- */

  function bindEvents() {
    // Audience mode switches (desktop + mobile)
    document.querySelectorAll("[data-mode-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setMode(btn.getAttribute("data-mode-btn"));
      });
    });

    // Category filter pills
    var pills = document.getElementById("filterPills");
    if (pills) {
      pills.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-cat]");
        if (!btn) return;
        state.category = btn.getAttribute("data-cat");
        renderFilterPills();
        renderProjects();
      });
    }

    // Live-only toggle
    var liveBtn = document.getElementById("liveOnlyToggle");
    if (liveBtn) {
      liveBtn.addEventListener("click", function () {
        state.liveOnly = !state.liveOnly;
        liveBtn.setAttribute("aria-pressed", String(state.liveOnly));
        renderProjects();
      });
    }

    // Search input + "/" shortcut
    var searchInput = document.getElementById("projectSearch");
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.search = searchInput.value.trim();
        renderProjects();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "/" && document.activeElement !== searchInput && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
          e.preventDefault();
          searchInput.focus();
        }
      });
    }

    // Tag filtering, proof tabs & preview lightbox
    document.addEventListener("click", function (e) {
      var proofBtn = e.target.closest("[data-proof-tab]");
      if (proofBtn) {
        state.proofTab = proofBtn.getAttribute("data-proof-tab");
        renderProofWidget();
        return;
      }
      var prevBtn = e.target.closest("[data-preview-src]");
      if (prevBtn) {
        openLightbox(prevBtn.getAttribute("data-preview-src"), prevBtn.getAttribute("data-preview-title"));
        return;
      }
      var tagBtn = e.target.closest("[data-filter-tag]");
      if (tagBtn) {
        var clicked = tagBtn.getAttribute("data-filter-tag");
        state.tag = state.tag === clicked ? "" : clicked;
        renderProjects();
        return;
      }
      var tkBtn = e.target.closest("[data-toolkit-tag]");
      if (tkBtn) {
        state.category = "all";
        state.liveOnly = false;
        state.tag = tkBtn.getAttribute("data-toolkit-tag");
        renderFilterPills();
        renderProjects();
        var explorer = document.getElementById("projects");
        if (explorer) explorer.scrollIntoView({ behavior: "smooth" });
        showToast("Filtered projects by " + state.tag);
      }
    });

    // Lightbox close handlers
    var lb = document.getElementById("lightbox");
    var lbClose = document.getElementById("lightboxClose");
    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lb) {
      lb.addEventListener("click", function (e) {
        if (e.target === lb) closeLightbox();
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });

    // Clear filters button
    var clearBtn = document.getElementById("clearFilters");
    if (clearBtn) clearBtn.addEventListener("click", resetFilters);

    // Copy email buttons
    document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var email = "leyeajibola@gmail.com";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(function () {
            showToast("Copied " + email);
          }).catch(function () {
            showToast(email);
          });
        } else {
          showToast(email);
        }
      });
    });

    // Mobile nav toggle
    var toggle = document.getElementById("navToggle");
    var mobile = document.getElementById("navMobile");
    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        mobile.classList.toggle("open", !open);
      });
      mobile.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          toggle.setAttribute("aria-expanded", "false");
          mobile.classList.remove("open");
        }
      });
    }
  }

  function openLightbox(src, title) {
    var lb = document.getElementById("lightbox");
    var img = document.getElementById("lightboxImg");
    var t = document.getElementById("lightboxTitle");
    if (!lb || !img || !t) return;
    img.src = src;
    img.alt = (title || "Project") + " live interface preview";
    t.textContent = title || "Live preview";
    lb.hidden = false;
  }

  function closeLightbox() {
    var lb = document.getElementById("lightbox");
    if (lb) lb.hidden = true;
  }

  /* ---------- boot ---------- */

  function init() {
    initTheme();
    renderBenchmarks();
    renderStats();
    renderGlossary();
    renderFilterPills();
    renderDemos();
    renderWriting();
    renderToolkit();

    var savedMode = null;
    try { savedMode = localStorage.getItem("la-mode"); } catch (_) {}
    setMode(savedMode || "tech");

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
