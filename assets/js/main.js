/* ============================================================
   Portfolio renderer + interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- helpers ---------- */

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function byId(id) {
    var el = document.getElementById(id);
    return el ? el.innerHTML : "";
  }

  function setHtml(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  /* ---------- renderers ---------- */

  function renderTags(tags, big) {
    if (!tags || !tags.length) return "";
    return '<ul class="tags' + (big ? " tags-lg" : "") + '">' +
      tags.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") +
      "</ul>";
  }

  function renderMetrics(metrics) {
    if (!metrics || !metrics.length) return "";
    return '<ul class="card-metrics">' +
      metrics.map(function (m) {
        return "<li><span>" + esc(m[0]) + "</span><span>" + esc(m[1]) + "</span></li>";
      }).join("") +
      "</ul>";
  }

  function renderLinks(links) {
    if (!links || !links.length) return "";
    return '<div class="card-actions">' +
      links.map(function (l) {
        return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' +
          esc(l.label) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>';
      }).join("") +
      "</div>";
  }

  function renderCard(p) {
    var badge = "";
    if (p.status === "live") {
      badge = '<span class="badge badge-live"><span class="pulse" aria-hidden="true"></span> Live</span>';
    } else if (p.statusLabel) {
      badge = '<span class="badge badge-soon">' + esc(p.statusLabel) + "</span>";
    }
    return '<article class="card">' +
      "<h3>" + esc(p.title) + badge + "</h3>" +
      '<p class="card-kind">' + esc(p.kind) + "</p>" +
      "<p>" + esc(p.desc) + "</p>" +
      renderMetrics(p.metrics) +
      renderTags(p.tags) +
      renderLinks(p.links) +
      "</article>";
  }

  function renderDemo(d) {
    var pending = d.state !== "up";
    return '<a class="demo" href="' + esc(d.url) + '" target="_blank" rel="noopener">' +
      '<div class="demo-top">' +
        '<span class="demo-name">' + esc(d.name) + "</span>" +
        '<span class="status' + (pending ? " pending" : "") + '">' +
          '<span class="pulse" aria-hidden="true"></span>' + (pending ? "deploying" : "live") +
        "</span>" +
      "</div>" +
      "<p>" + esc(d.desc) + "</p>" +
      '<span class="demo-url">' + esc(d.url.replace(/^https?:\/\//, "")) + "</span>" +
      "</a>";
  }

  function renderStat(s) {
    return '<div class="stat"><dt>' + esc(s.value) + "</dt><dd>" +
      '<span class="stat-label">' + esc(s.label) + "</span>" +
      '<span class="stat-note">' + esc(s.note) + "</span>" +
      "</dd></div>";
  }

  function renderWriting(w) {
    return '<article class="card">' +
      "<h3>" + esc(w.title) + "</h3>" +
      '<p class="card-kind">' + esc(w.kind) + "</p>" +
      "<p>" + esc(w.desc) + "</p>" +
      renderLinks(w.links) +
      "</article>";
  }

  function mount(sel, items, fn) {
    var el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = items.map(fn).join("");
  }

  /* ---------- boot ---------- */

  function init() {
    mount("#gridAI", PROJECTS.ai, renderCard);
    mount("#gridFaith", PROJECTS.faith, renderCard);
    mount("#gridEng", PROJECTS.engineering, renderCard);
    mount("#gridFinance", PROJECTS.finance, renderCard);
    mount("#gridProductivity", PROJECTS.productivity, renderCard);
    mount("#gridLearning", PROJECTS.learning, renderCard);
    mount("#gridHealth", PROJECTS.health, renderCard);
    mount("#gridDemos", PROJECTS.demos, renderDemo);
    mount("#gridWriting", WRITING, renderWriting);
    mount("#statsGrid", STATS, renderStat);

    /* Section headings driven from the data file so they never drift. */
    Object.keys(SECTIONS).forEach(function (key) {
      var s = SECTIONS[key];
      setHtml("kicker-" + key, s.kicker);
      setHtml("title-" + key, s.title);
      setHtml("sub-" + key, s.sub);
    });

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* Nav */
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
