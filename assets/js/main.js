/* ============================================================
   Portfolio renderer + interactions
   ============================================================ */

(function () {
  "use strict";

  /* ---------- renderers ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderTags(tags) {
    if (!tags || !tags.length) return "";
    return '<ul class="tags">' +
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
        const ext = l.external
          ? ' target="_blank" rel="noopener"'
          : ' target="_blank" rel="noopener"';
        return '<a href="' + esc(l.href) + '"' + ext + '>' +
          esc(l.label) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>';
      }).join("") +
      "</div>";
  }

  function renderCard(p) {
    const badge = p.status === "live"
      ? '<span class="badge badge-live"><span class="pulse" aria-hidden="true"></span> Live</span>'
      : "";
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
    const pending = d.state !== "up";
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

  function mount(sel, items, fn) {
    var el = document.querySelector(sel);
    if (!el) return;
    el.innerHTML = items.map(fn).join("");
  }

  /* ---------- boot ---------- */

  function init() {
    mount("#gridAiml", PROJECTS.aiml, renderCard);
    mount("#gridEng", PROJECTS.engineering, renderCard);
    mount("#gridDemos", PROJECTS.demos, renderDemo);

    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

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
