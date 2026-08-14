/* 캠프 공통 상단 영역 — 배너 3종 + 수련회 점수판.
   본 페이지(index.html)에서 렌더된 마크업과 스타일을 그대로 가져와,
   퇴소식·수료키트에서도 같은 자리에 같은 모습으로 보이게 한다.
   생성 스크립트: deploy/build-camp-top.py */
(function () {
  "use strict";
  var CFG = window.MUNIVERSE_CONFIG || {};
  var CACHE_URL = CFG.scoreboardCacheUrl ||
    "https://kkaoerbblpuszptiibvo.supabase.co/storage/v1/object/public/idolcamp-cache/scoreboard.json";
  var REFRESH_MS = Math.max(600000, Number(CFG.scoreboardRefreshMs) || 600000);

  var CSS = __CSS__;
  var SNAP = __SNAP__;
  var STR = __STR__;
  var TEAMS = __TEAMS__;

  function code() {
    var l = document.documentElement.lang || "ko";
    if (SNAP[l]) return l;
    if (l === "zh" || l === "zh-Hans") return "zh-CN";
    if (l === "zh-Hant") return "zh-TW";
    return SNAP[l.split("-")[0]] ? l.split("-")[0] : "ko";
  }
  function S() { return STR[code()]; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function num(n) {
    var c = code();
    return Number(n || 0).toLocaleString(c === "ko" ? "ko-KR" : (c === "ja" ? "ja-JP" : (c.indexOf("zh") === 0 ? "zh-CN" : "en-US")));
  }
  function val(n) { return num(n) + S().unit; }
  function teamStyle(id) {
    var t = TEAMS[id] || {};
    var light = /^#(f|e|d)/i.test(t.color || "");
    var color = light ? (t.border || "#123A2E") : (t.color || "#123A2E");
    return "--team:" + color + ";--teamText:" + (light ? "#123A2E" : "#fff") + ";--teamSoft:" + (t.bg || "#EEF5E7");
  }

  var rows = null;

  function paint() {
    var list = document.getElementById("scoreList"), upd = document.getElementById("scoreUpdated");
    if (!list) return;
    var s = S();
    if (!rows) { list.innerHTML = '<div class="sb-empty">' + esc(s.loading) + "</div>"; return; }
    if (!rows.length) { list.innerHTML = '<div class="sb-empty">' + esc(s.empty) + "</div>"; return; }
    list.innerHTML = rows.slice(0, 4).map(function (r, i) {
      var rank = Number(r.rank || i + 1);
      var t = TEAMS[r.team_id] || { name: r.team_name || r.team_id };
      var first = rank === 1 && Number(r.total_score || 0) > 0;
      return '<article class="sb-card' + (first ? " is-first" : "") + '" style="' + teamStyle(r.team_id) + '">' +
        '<span class="sb-rank">' + esc(s.rank.replace("{n}", rank)) + "</span>" +
        '<div class="sb-info"><div class="sb-name">' + esc(t.name) + "</div>" +
        '<div class="sb-sub">' + esc(s.pledge) + " " + val(r.pledge_score) + " · " + esc(s.like) + " " + val(r.like_score) +
          " · " + esc(s.share) + " " + val(r.share_score) + " · " + esc(s.meme) + " " + val(r.meme_score) + "</div></div>" +
        '<div class="sb-score">' + val(r.total_score) + "</div></article>";
    }).join("");
    var last = rows.map(function (r) { return r.updated_at; }).filter(Boolean).sort().pop();
    if (upd && last) {
      var d = new Date(last), c = code();
      var loc = c === "ko" ? "ko-KR" : (c === "ja" ? "ja-JP" : (c.indexOf("zh") === 0 ? "zh-CN" : "en-US"));
      upd.innerHTML = '<svg class="sb-updated-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.4 11.2a8.4 8.4 0 0 0-14.3-4.6L3.4 9.2"/><path d="M3.6 12.8a8.4 8.4 0 0 0 14.3 4.6l2.7-2.6"/><path d="M3.2 4.6v4.6h4.6M20.8 19.4v-4.6h-4.6"/></svg><span>' +
        esc(s.updated + " " + d.toLocaleDateString(loc, { month: "numeric", day: "numeric" }) + " " +
            d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }) + " · " + s.refresh) + "</span>";
    }
  }

  function load() {
    if (window.__scoreFinal) return;   /* 마감 후에는 점수를 다시 불러오지 않는다 */
    var url = CACHE_URL + (CACHE_URL.indexOf("?") >= 0 ? "&" : "?") + "v=" + Math.floor(Date.now() / REFRESH_MS);
    fetch(url, { cache: "default" })
      .then(function (r) { if (!r.ok) throw new Error("scoreboard " + r.status); return r.json(); })
      .then(function (p) {
        rows = Array.isArray(p) ? p : (p && p.rows) || [];
        try { localStorage.setItem("idolcamp_scoreboard_cache_v2", JSON.stringify({ savedAt: Date.now(), rows: rows })); } catch (e) {}
        paint();
      })
      .catch(function () {
        try {
          var saved = JSON.parse(localStorage.getItem("idolcamp_scoreboard_cache_v2") || "null");
          if (saved && Array.isArray(saved.rows) && Date.now() - Number(saved.savedAt || 0) < 86400000) { rows = saved.rows; paint(); return; }
        } catch (e) {}
        paint();
      });
  }

  /* 다시 그리는 동안 배너 이미지가 새로 받아지면서 이 칸이 잠깐 납작해지면,
     아래에 있던 내용이 통째로 위로 딸려 올라간다.
     원래 높이를 붙잡아 두었다가 새 배너가 자리를 잡은 뒤에 놓아준다. */
  function render(box) {
    var snap = SNAP[code()] || SNAP.ko;
    var held = box.offsetHeight;
    if (held) box.style.minHeight = held + "px";
    box.innerHTML = snap.banners + snap.board;
    paint();
    if (!held) return;
    var release = function () { box.style.minHeight = ""; };
    var imgs = box.querySelectorAll("img"), left = imgs.length;
    if (!left) { requestAnimationFrame(release); return; }
    var done = function () { if (--left <= 0) requestAnimationFrame(release); };
    Array.prototype.forEach.call(imgs, function (im) {
      if (im.complete) return done();
      im.addEventListener("load", done, { once: true });
      im.addEventListener("error", done, { once: true });
    });
    setTimeout(release, 3000);
  }

  function mount() {
    var tabs = document.querySelector(".tabs");
    if (!tabs || document.getElementById("campTop")) return;
    var st = document.createElement("style");
    st.id = "camp-top-style"; st.textContent = CSS;
    document.head.appendChild(st);
    var box = document.createElement("div");
    box.id = "campTop";
    tabs.parentNode.insertBefore(box, tabs);
    render(box);
    load();
    setInterval(function () { if (!document.hidden) load(); }, REFRESH_MS);
    new MutationObserver(function () { render(box); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
