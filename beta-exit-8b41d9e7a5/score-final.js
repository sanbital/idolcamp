/* 수련회 점수판 — 투표 마감 후 '최종 점수 집계 중' 화면.
   · 적용 시각은 config.js 의 scoreFinal.finalizeAt 이 정한다
   · 현재 설정: 2026-08-17T08:00:00Z = 2026-08-17 17:00 KST
   · 판정은 서버 시각 기준. 사용자의 기기 시계·타임존에 영향받지 않는다.
   · 마감 시점의 순위/점수를 스냅샷으로 고정하고, 이후 데이터는 반영하지 않는다.
   · 본 페이지와 퇴소식·수료키트(상단 고정 점수판) 양쪽에서 함께 동작한다. */
(function () {
  "use strict";
  var CFG = window.MUNIVERSE_CONFIG || {};
  var SC = CFG.scoreFinal || {};
  var FINAL_AT = Date.parse(SC.finalizeAt || "2026-08-17T08:00:00Z");   /* = 8/17 17:00 KST */
  var REVEALED = SC.resultsRevealed === true;   /* 결과 공개 단계로 넘어갈 때 true */
  var PROOF_KEY = SC.proofKey || "sf-7f4a2c-2026";
  var isAdmin = new URLSearchParams(location.search).get("scoreproof") === PROOF_KEY;
  var FLAG_KEY = "idolcamp_score_final_v1";
  var CACHE_KEY = "idolcamp_scoreboard_cache_v2";
  var serverOffset = 0, applied = false, watching = false;

  /* 설정된 마감 시각을 KST 로 표기 (M/D HH:mm) */
  function kstLabel() {
    var d = new Date(FINAL_AT + 9 * 3600 * 1000);
    var p = function (n) { return (n < 10 ? "0" : "") + n; };
    return (d.getUTCMonth() + 1) + "/" + d.getUTCDate() + " " + p(d.getUTCHours()) + ":" + p(d.getUTCMinutes());
  }
  var STR = {
    ko: { head: "최종 점수 집계 중", sub: "정확한 결과 확인을 위해 점수를 검수하고 있어요",
          when: "투표 종료 · {t} KST", s1: "투표 종료", s2: "점수 검수", s3: "결과 공개" },
    en: { head: "Final tally in progress", sub: "We are reviewing the scores so the result is exact",
          when: "Voting closed · {t} KST", s1: "Voting closed", s2: "Score review", s3: "Result" },
    ja: { head: "最終集計中", sub: "正確な結果のためにスコアを検収しています",
          when: "投票終了 · {t} KST", s1: "投票終了", s2: "スコア検収", s3: "結果発表" },
    "zh-CN": { head: "最终计分中", sub: "为确认准确结果，正在核对分数",
          when: "投票结束 · {t} KST", s1: "投票结束", s2: "分数核对", s3: "结果公开" },
    "zh-TW": { head: "最終計分中", sub: "為確認準確結果，正在核對分數",
          when: "投票結束 · {t} KST", s1: "投票結束", s2: "分數核對", s3: "結果公開" }
  };
  function S() {
    var l = document.documentElement.lang || "ko";
    return STR[l] || STR[{ zh: "zh-CN", "zh-Hant": "zh-TW", "zh-Hans": "zh-CN" }[l]] || STR[l.split("-")[0]] || STR.ko;
  }

  var CSS = [
    "#scoreboard.is-final .sb-reload,",
    "#scoreboard.is-final .sb-notice,",
    "#scoreboard.is-final #scoreList,",
    "#scoreboard.is-final #scoreUpdated,",
    "#scoreboard.is-final #scoreCta,",
    "#scoreboard.is-final .sb-vote-go{display:none!important}",
    "#voteBanner.is-final-hidden,.votebar.is-final-hidden{display:none!important}",
    ".sf{position:relative;overflow:hidden;margin:6px 0 2px;padding:34px 20px 30px;border-radius:22px;",
    "  background:linear-gradient(180deg,#FCF8EC,#F7F1DF);border:1px solid rgba(20,48,61,.08);text-align:center}",
    ".sf-art{position:absolute;inset:0;pointer-events:none}",
    ".sf-art span{position:absolute;display:block;color:#2E8A5A;opacity:.11}",
    ".sf-art svg{display:block;width:100%;height:auto}",
    ".sf-art .a1{left:5%;bottom:7%;width:58px}.sf-art .a2{right:6%;bottom:9%;width:56px}",
    ".sf-art .a3{left:11%;top:11%;width:26px;opacity:.09}.sf-art .a4{right:12%;top:9%;width:22px;opacity:.09}",
    ".sf-art .a5{right:24%;top:24%;width:13px;opacity:.10}.sf-art .a6{left:22%;top:30%;width:12px;opacity:.10}",
    ".sf-badge{position:relative;width:132px;height:132px;margin:0 auto;display:grid;place-items:center}",
    ".sf-ring{position:absolute;inset:0}",
    ".sf-disc{position:relative;display:grid;place-items:center;width:96px;height:96px;border-radius:50%;",
    "  background:radial-gradient(circle at 50% 42%,#FFF7DC,#FBEFC6);box-shadow:inset 0 0 0 1px rgba(214,178,74,.28)}",
    ".sf-disc svg{width:56px;height:56px;color:#1F6B44}",
    ".sf-head{margin:20px 0 0;font-family:var(--font-display,inherit);font-size:clamp(25px,6.4vw,34px);font-weight:900;",
    "  letter-spacing:-.035em;color:#1B5E3F;word-break:keep-all}",
    ".sf-sub{margin:10px auto 0;max-width:26em;font-size:clamp(12.5px,3.4vw,15px);font-weight:600;line-height:1.6;color:rgba(20,48,61,.62);word-break:keep-all}",
    ".sf-when{display:inline-block;margin:16px 0 0;padding:9px 18px;border-radius:999px;background:#FDF0C4;",
    "  border:1px solid rgba(214,178,74,.45);color:#6E5312;font-size:clamp(12.5px,3.4vw,14px);font-weight:800;white-space:nowrap}",
    ".sf-steps{display:grid;grid-template-columns:repeat(3,1fr);align-items:start;gap:0;margin:26px auto 0;max-width:420px}",
    ".sf-step{position:relative;display:grid;justify-items:center;gap:9px}",
    ".sf-dot{position:relative;z-index:1;display:grid;place-items:center;width:26px;height:26px;border-radius:50%;",
    "  background:#F7F1DF;border:2px solid rgba(20,48,61,.16)}",
    ".sf-step.done .sf-dot{background:#1F6B44;border-color:#1F6B44;color:#fff}",
    ".sf-step.now .sf-dot{background:#FFF;border-color:#1F6B44}",
    ".sf-step.now .sf-dot:after{content:'';width:11px;height:11px;border-radius:50%;background:#F2C230}",
    ".sf-dot svg{width:14px;height:14px}",
    ".sf-step:before{content:'';position:absolute;top:12px;left:-50%;width:100%;height:2px;background:rgba(20,48,61,.16)}",
    ".sf-step:first-child:before{display:none}",
    ".sf-step.done:before,.sf-step.now:before{background:#1F6B44}",
    ".sf-step.wait:before{background:none;border-top:2px dashed rgba(20,48,61,.22)}",
    ".sf-label{font-size:clamp(11.5px,3.2vw,13px);font-weight:800;color:rgba(20,48,61,.62);white-space:nowrap}",
    ".sf-step.done .sf-label,.sf-step.now .sf-label{color:#1B5E3F}",
    "@media(min-width:760px){.sf{padding:44px 30px 38px}.sf-badge{width:150px;height:150px}",
    "  .sf-disc{width:110px;height:110px}.sf-disc svg{width:64px;height:64px}.sf-steps{margin-top:30px;max-width:470px}}"
  ].join("\n");

  var TENT = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M32 12 L46 40 H18 Z"/><path d="M32 24 L38 40 H26 Z" stroke-width="2.2"/>' +
    '<path d="M10 34 l3-6 3 6 z" stroke-width="2"/><path d="M54 34 l3-6 3 6 z" stroke-width="2"/>' +
    '<path d="M13 28 v8M57 28 v8" stroke-width="2"/>' +
    '<path d="M24 52 l16-6M40 52 l-16-6" stroke-width="2.4"/>' +
    '<path d="M32 50 c-4-3-2.5-7-.5-9.5 .5 3 2.5 3.5 3 1 2.5 3 2 6-2.5 8.5z" fill="currentColor" stroke="none"/>' +
    '<path d="M28 8 l1 2.6 2.6 1 -2.6 1 -1 2.6 -1 -2.6 -2.6 -1 2.6 -1z" fill="currentColor" stroke="none"/>' +
    '<path d="M44 16 l.8 2 2 .8 -2 .8 -.8 2 -.8 -2 -2 -.8 2 -.8z" fill="currentColor" stroke="none"/></svg>';
  var PINE = '<svg viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 L31 26 H9 Z"/><path d="M20 20 L34 44 H6 Z"/><path d="M20 44 v10"/></svg>';
  var FIRE = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 8c5 8 9 10 9 17a9 9 0 1 1-18 0c0-7 4-9 9-17z"/><path d="M8 40l32-6M8 34l32 6"/></svg>';
  var STAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.5 5.6 5.9.6-4.4 4 1.3 5.8L12 15.6 6.7 18.6 8 12.8 3.6 8.8l5.9-.6z"/></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5 10 17.5 19 7"/></svg>';

  function panelInner() {
    var s = S();
    return '' +
      '<div class="sf-art" aria-hidden="true">' +
        '<span class="a1">' + PINE + "</span><span class=\"a2\">" + FIRE + "</span>" +
        '<span class="a3">' + PINE + "</span><span class=\"a4\">" + PINE + "</span>" +
        '<span class="a5">' + STAR + "</span><span class=\"a6\">" + STAR + "</span>" +
      "</div>" +
      '<div class="sf-badge">' +
        '<svg class="sf-ring" viewBox="0 0 132 132" fill="none" aria-hidden="true">' +
          '<circle cx="66" cy="66" r="58" stroke="rgba(31,107,68,.16)" stroke-width="5"/>' +
          '<circle cx="66" cy="66" r="58" stroke="#4CA96F" stroke-width="5" stroke-linecap="round"' +
          ' stroke-dasharray="240 124" transform="rotate(-90 66 66)"/>' +
          '<circle cx="8" cy="66" r="6" fill="#F2C230"/><circle cx="124" cy="66" r="6" fill="#F2C230"/>' +
        "</svg>" +
        '<span class="sf-disc">' + TENT + "</span>" +
      "</div>" +
      '<h3 class="sf-head">' + s.head + "</h3>" +
      '<p class="sf-sub">' + s.sub + "</p>" +
      '<span class="sf-when">' + s.when.replace("{t}", kstLabel()) + "</span>" +
      '<div class="sf-steps">' +
        '<div class="sf-step done"><span class="sf-dot">' + CHECK + '</span><span class="sf-label">' + s.s1 + "</span></div>" +
        '<div class="sf-step now"><span class="sf-dot"></span><span class="sf-label">' + s.s2 + "</span></div>" +
        '<div class="sf-step wait"><span class="sf-dot"></span><span class="sf-label">' + s.s3 + "</span></div>" +
      "</div>";
  }

  /* 마감 시점의 순위·점수를 한 번만 고정한다.
     캐시가 아직 비어 있으면 마지막으로 게시된 점수 파일을 한 번 받아 채운다.
     한 번 채워진 뒤에는 이후 데이터가 들어와도 덮어쓰지 않는다. */
  /* 일반 사용자의 브라우저에는 마감 사실만 남기고 순위·점수는 저장하지 않는다.
     스냅샷 데이터는 관리자(증빙 키 보유)에게만 보관·표시된다. */
  function store(rows, savedAt) {
    var snap = { at: new Date(Date.now() + serverOffset).toISOString(),
                 rows: isAdmin ? (rows || []) : [], savedAt: savedAt || null };
    try { localStorage.setItem(FLAG_KEY, JSON.stringify(snap)); } catch (e) {}
    return snap;
  }
  function freeze() {
    var saved = frozen();
    if (saved && saved.rows && saved.rows.length) return Promise.resolve(saved);
    if (!isAdmin) { return Promise.resolve(saved || store([], null)); }
    var cache = null;
    try { cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); } catch (e) {}
    if (cache && cache.rows && cache.rows.length) return Promise.resolve(store(cache.rows, cache.savedAt));
    var url = CFG.scoreboardCacheUrl;
    if (!url) return Promise.resolve(saved || store([], null));
    return fetch(url + (url.indexOf("?") >= 0 ? "&" : "?") + "v=final", { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (p) {
        var rows = Array.isArray(p) ? p : (p && p.rows) || [];
        return rows.length ? store(rows, Date.now()) : (saved || store([], null));
      })
      .catch(function () { return saved || store([], null); });
  }
  function frozen() {
    try { return JSON.parse(localStorage.getItem(FLAG_KEY) || "null"); } catch (e) { return null; }
  }

  function apply() {
    var board = document.getElementById("scoreboard");
    if (!board) return;
    board.classList.add("is-final");
    ["voteBanner"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.classList.add("is-final-hidden"); el.setAttribute("hidden", "hidden"); }
    });
    var old = document.getElementById("scoreFinal");
    var lang = document.documentElement.lang || "ko";
    if (old) {
      if (old.dataset.lang !== lang) { old.dataset.lang = lang; old.innerHTML = panelInner(); }
      return;
    }
    var box = document.createElement("div");
    box.className = "sf"; box.id = "scoreFinal"; box.dataset.lang = lang;
    box.innerHTML = panelInner();
    var list = document.getElementById("scoreList");
    if (list) list.parentNode.insertBefore(box, list); else board.appendChild(box);
  }

  function activate() {
    if (REVEALED) return;
    window.__scoreFinal = true;            /* 점수 재조회를 멈추게 하는 신호 */
    freeze();
    if (!document.getElementById("camp-score-final-style")) {
      var st = document.createElement("style");
      st.id = "camp-score-final-style"; st.textContent = CSS;
      document.head.appendChild(st);
    }
    apply();
    if (!watching) {
      watching = true;
      /* 점수판이 다시 그려지거나(10분 갱신·언어 전환) 늦게 삽입돼도 계속 유지 */
      new MutationObserver(function () { apply(); }).observe(document.body, { childList: true, subtree: true });
      new MutationObserver(function () { apply(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    }
    applied = true;
  }

  function isFinal() {
    if (REVEALED) return false;
    if (frozen()) return true;                       /* 한 번 마감되면 되돌아가지 않는다 */
    return Date.now() + serverOffset >= FINAL_AT;
  }

  function check() { if (!applied && isFinal()) activate(); }

  /* 서버 시각 확보: meme_event_status 응답 → 없으면 REST 응답 헤더 */
  function syncClock() {
    var st = window.__memeStatus;
    if (st && st.now) {
      var ms = Date.parse(st.now);
      if (isFinite(ms)) { serverOffset = ms - Date.now(); check(); return Promise.resolve(); }
    }
    if (!CFG.supabaseUrl || !CFG.supabaseAnonKey) { check(); return Promise.resolve(); }
    return fetch(CFG.supabaseUrl + "/rest/v1/camp_exit_settings?select=id&id=eq.1&limit=1", {
      headers: { apikey: CFG.supabaseAnonKey, Authorization: "Bearer " + CFG.supabaseAnonKey }
    }).then(function (r) {
      var dh = r.headers.get("date");
      if (dh) { var ms = Date.parse(dh); if (isFinite(ms)) serverOffset = ms - Date.now(); }
    }).catch(function () {}).then(check);
  }

  function boot() {
    check();                       /* 저장된 마감 상태면 네트워크 없이 즉시 적용 */
    syncClock();
    setInterval(function () { if (!applied && !document.hidden) syncClock(); }, 60000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* 운영 증빙: 관리자 키가 있는 주소로 열었을 때만 최종 점수판을 PNG 한 장으로 내려받는다.
     키가 없으면 아무 것도 하지 않는다(안내도 노출하지 않는다). */
  if (isAdmin) {
    window.addEventListener("load", function () { setTimeout(drawProof, 600); });
  }
  function drawProof() {
    freeze().then(function (snap) { paintProof(snap || { at: new Date().toISOString(), rows: [] }); });
  }
  function paintProof(snap) {
    var rows = (snap.rows || []).slice(0, 8);
    var W = 1080, PAD = 56, ROW = 96, H = 300 + Math.max(1, rows.length) * ROW;
    var cv = document.createElement("canvas");
    cv.width = W * 2; cv.height = H * 2;
    var c = cv.getContext("2d"); c.scale(2, 2);
    c.fillStyle = "#F7F3E7"; c.fillRect(0, 0, W, H);
    c.fillStyle = "#FFFDF6"; rr(c, PAD - 16, 96, W - (PAD - 16) * 2, H - 150, 22); c.fill();
    c.fillStyle = "#123243"; c.font = "900 40px Pretendard, sans-serif";
    c.fillText("수련회 점수판 · 최종 스냅샷", PAD, 62);
    c.fillStyle = "rgba(20,48,61,.6)"; c.font = "600 22px Pretendard, sans-serif";
    c.fillText("투표 종료 " + kstFull() + " KST · 고정 시각 " + snap.at, PAD, 152);
    rows.forEach(function (r, i) {
      var y = 200 + i * ROW;
      c.fillStyle = i === 0 ? "#FFFBEC" : "#FBF8EF";
      rr(c, PAD, y, W - PAD * 2, ROW - 14, 14); c.fill();
      c.fillStyle = "#6E5312"; c.font = "900 24px Pretendard, sans-serif";
      c.fillText((r.rank || i + 1) + "위", PAD + 22, y + 50);
      c.fillStyle = "#123243"; c.font = "900 30px Pretendard, sans-serif";
      c.fillText(String(r.team_name || r.team_id || ""), PAD + 110, y + 44);
      c.fillStyle = "rgba(20,48,61,.55)"; c.font = "600 18px Pretendard, sans-serif";
      c.fillText("다짐 " + n(r.pledge_score) + " · 좋아요 " + n(r.like_score) +
                 " · 공유 " + n(r.share_score) + " · 짤 장기자랑 " + n(r.meme_score), PAD + 110, y + 70);
      c.fillStyle = "#1F6B44"; c.font = "900 32px Pretendard, sans-serif"; c.textAlign = "right";
      c.fillText(n(r.total_score) + "점", W - PAD - 22, y + 52); c.textAlign = "left";
    });
    if (!rows.length) {
      c.fillStyle = "rgba(20,48,61,.5)"; c.font = "700 24px Pretendard, sans-serif";
      c.fillText("고정된 점수 데이터가 없습니다.", PAD + 20, 240);
    }
    cv.toBlob(function (b) {
      if (!b) return;
      var a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = "idolcamp-scoreboard-final-" + kstStamp() + "KST.png";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 3000);
    }, "image/png");
    function n(v) { return Number(v || 0).toLocaleString("ko-KR"); }
    function kstFull() {
      var d = new Date(FINAL_AT + 9 * 3600 * 1000), p = function (x) { return (x < 10 ? "0" : "") + x; };
      return d.getUTCFullYear() + "-" + p(d.getUTCMonth() + 1) + "-" + p(d.getUTCDate()) +
             " " + p(d.getUTCHours()) + ":" + p(d.getUTCMinutes());
    }
    function kstStamp() { return kstFull().replace(/[-: ]/g, "").slice(0, 13); }
    function rr(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
  }
})();
