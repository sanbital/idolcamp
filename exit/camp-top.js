/* 캠프 공통 상단 영역 — 배너 3종 + 수련회 점수판.
   본 페이지(index.html)에서는 탭 위에 항상 떠 있는 구역이라,
   퇴소식·수료키트에서도 같은 자리에 같은 내용이 보이도록 여기서 다시 그린다.
   본 페이지의 CSS와 클래스가 겹치지 않게 ctop- 접두사로 격리한다. */
(function () {
  "use strict";
  var CFG = window.MUNIVERSE_CONFIG || {};
  var CACHE_URL = CFG.scoreboardCacheUrl ||
    "https://kkaoerbblpuszptiibvo.supabase.co/storage/v1/object/public/idolcamp-cache/scoreboard.json";
  var REFRESH_MS = Math.max(600000, Number(CFG.scoreboardRefreshMs) || 600000);
  var LOGO = "../assets/camp-logo.png";
  var PLAYLIST = "https://www.youtube.com/playlist?list=PLBoB3JxHEl3SaaZXFh_Yg8zVQhU4GTWsw";
  var VOTE = "https://www.muniverse.io/votes/4254d040-384f-404a-a47e-404c713cf366";
  var VOD = (CFG.exitCeremony && CFG.exitCeremony.vodUrl) ||
    "https://www.muniverse.io/titles/bb4d517b-7770-4695-957c-0e44056217fb?defaultTab=details";

  var TEAMS = {
    idntt:        { name: "idntt",           color: "#111111" },
    flareu:       { name: "FLARE U",         color: "#8FD4CB" },
    closeyoureyes:{ name: "CLOSE YOUR EYES", color: "#B9C6BE" },
    ahof:         { name: "AHOF",            color: "#C9CBD8" }
  };

  var STR = {
    ko: { yt:"아이돌 수련회, 지금 정주행!", ytSub:"전 편 공개 완료 · Muniverse 유튜브에서 몰아보기",
          exLead:"더 길고 더 재밌게, 숨겨진 장면과 구매자 한정 특전까지!", exTitle:"〈아이돌 수련회〉 확장판 대공개",
          vote:"짤기자랑 결선투표 진행 중!", voteGo:"투표하기",
          board:"수련회 점수판", pledge:"다짐", like:"좋아요", share:"공유", meme:"짤 장기자랑",
          unit:"점", rank:function(n){return n+"위";}, updated:"마지막 업데이트", refresh:"10분마다 새로고침",
          loading:"점수판을 불러오는 중입니다.", empty:"아직 집계된 점수가 없습니다." },
    en: { yt:"Idol School Camp — binge it now!", ytSub:"All episodes out · watch on Muniverse YouTube",
          exLead:"Longer, funnier, with hidden scenes and a buyer-only gift!", exTitle:"Idol School Camp — Extended Edition",
          vote:"Meme talent final vote is open!", voteGo:"Vote",
          board:"Camp Scoreboard", pledge:"Pledge", like:"Likes", share:"Shares", meme:"Meme show",
          unit:" pts", rank:function(n){return "#"+n;}, updated:"Last updated", refresh:"refreshes every 10 minutes",
          loading:"Loading scoreboard.", empty:"No scores yet." },
    ja: { yt:"『アイドル修練会』一気見！", ytSub:"全話公開 · MuniverseのYouTubeで",
          exLead:"もっと長く、もっと面白く。未公開シーンと購入者限定特典まで！", exTitle:"『アイドル修練会』拡張版 公開",
          vote:"画像芸大会 決勝投票 実施中！", voteGo:"投票する",
          board:"キャンプ点数表", pledge:"誓い", like:"いいね", share:"共有", meme:"画像芸大会",
          unit:"点", rank:function(n){return n+"位";}, updated:"最終更新", refresh:"10分ごとに更新",
          loading:"点数表を読み込み中です。", empty:"まだ集計されたスコアがありません。" },
    zh: { yt:"《偶像修炼会》一次看完！", ytSub:"全集公开 · 在 Muniverse YouTube 观看",
          exLead:"更长更有趣，还有未公开画面与购买者限定特典！", exTitle:"《偶像修炼会》扩展版 公开",
          vote:"表情包才艺秀 决赛投票进行中！", voteGo:"去投票",
          board:"营地积分榜", pledge:"誓言", like:"点赞", share:"分享", meme:"才艺秀",
          unit:"分", rank:function(n){return "第"+n+"名";}, updated:"最后更新", refresh:"每10分钟刷新",
          loading:"正在加载积分榜。", empty:"暂无积分。" },
    "zh-Hant": { yt:"《偶像修煉會》一次看完！", ytSub:"全集公開 · 在 Muniverse YouTube 觀看",
          exLead:"更長更有趣，還有未公開畫面與購買者限定特典！", exTitle:"《偶像修煉會》擴充版 公開",
          vote:"迷因才藝秀 決賽投票進行中！", voteGo:"前往投票",
          board:"營地積分榜", pledge:"誓言", like:"按讚", share:"分享", meme:"才藝秀",
          unit:"分", rank:function(n){return "第"+n+"名";}, updated:"最後更新", refresh:"每10分鐘更新",
          loading:"正在載入積分榜。", empty:"暫無積分。" }
  };
  function T() {
    var l = document.documentElement.lang || "ko";
    return STR[l] || STR[l.split("-")[0]] || STR.ko;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function num(n) {
    var l = document.documentElement.lang || "ko";
    return Number(n || 0).toLocaleString(l === "ko" ? "ko-KR" : "en-US");
  }
  function val(n) { return num(n) + T().unit; }

  var CSS = [
    '.ctop{display:grid;gap:10px;margin:0 0 14px}',
    '.ctop a{text-decoration:none;color:inherit}',
    '.ctop-bar{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:12px;',
    '  padding:13px 15px;border-radius:18px;background:#FFFDF6;border:1px solid rgba(20,48,61,.10);',
    '  box-shadow:0 6px 16px rgba(20,48,61,.07)}',
    '.ctop-bar img.ctop-logo{width:54px;height:auto;flex:none}',
    '.ctop-bar b{display:block;font-size:15px;font-weight:900;letter-spacing:-.03em;color:#123243}',
    '.ctop-bar span{display:block;margin-top:3px;font-size:11.5px;font-weight:600;color:rgba(20,48,61,.6)}',
    '.ctop-play{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#FF0033}',
    '.ctop-play svg{display:block;width:16px;height:16px;flex:none}',
    '.ctop-ex{background:linear-gradient(150deg,#12402F,#0C2C22);border-color:rgba(255,217,106,.3)}',
    '.ctop-ex b{color:#FFF8EA}.ctop-ex>span>span{color:rgba(255,248,234,.72)}',
    '.ctop-ex .ctop-gift{font-size:26px}',
    '.ctop-vote{background:linear-gradient(150deg,#FFD96A,#F2AE1F);border-color:rgba(160,120,20,.35)}',
    '.ctop-vote b{color:#3A2A06}.ctop-vote>span>span{color:rgba(58,42,6,.7)}',
    '.ctop-bar .ctop-go{padding:10px 16px;border-radius:999px;background:#12402F;color:#FFF8EA;font-size:13px;font-weight:900;white-space:nowrap}',
    '.ctop-board{padding:15px;border-radius:18px;background:#FFFDF6;border:1px solid rgba(20,48,61,.10);box-shadow:0 6px 16px rgba(20,48,61,.07)}',
    '.ctop-bhead{display:flex;align-items:center;gap:9px;margin-bottom:11px}',
    '.ctop-bhead img{width:40px;height:auto}',
    '.ctop-bhead b{font-size:17px;font-weight:900;letter-spacing:-.03em;color:#123243}',
    '.ctop-bhead em{margin-left:auto;font-style:normal;font-size:11px;font-weight:800;color:rgba(20,48,61,.5)}',
    '.ctop-row{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:10px;',
    '  padding:11px 12px;border-radius:13px;background:#FBF8EF;border:1px solid rgba(20,48,61,.09)}',
    '.ctop-row+.ctop-row{margin-top:7px}',
    '.ctop-row.is-first{border-color:rgba(242,194,48,.7);background:#FFFBEC}',
    '.ctop-rank{display:grid;place-items:center;min-width:38px;padding:5px 8px;border-radius:9px;background:#FFE9A8;',
    '  border:1px solid rgba(160,120,20,.35);color:#5E4508;font-size:11.5px;font-weight:900}',
    '.ctop-name{font-size:15px;font-weight:900;letter-spacing:-.02em;color:#123243;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ctop-sub{margin-top:2px;font-size:10.5px;font-weight:600;color:rgba(20,48,61,.55);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ctop-total{font-size:16px;font-weight:900;letter-spacing:-.02em;color:#1F6B44;white-space:nowrap}',
    '.ctop-upd{margin-top:10px;text-align:right;font-size:10.5px;font-weight:600;color:rgba(20,48,61,.5)}',
    '.ctop-msg{padding:16px 4px;text-align:center;font-size:12.5px;font-weight:600;color:rgba(20,48,61,.5)}',
    '@media(min-width:760px){',
    '  .ctop{gap:12px;margin-bottom:18px}',
    '  .ctop-bar{padding:15px 20px}.ctop-bar img.ctop-logo{width:64px}',
    '  .ctop-bar b{font-size:17px}.ctop-bar span{font-size:12.5px}',
    '  .ctop-board{padding:20px}.ctop-name{font-size:16px}.ctop-total{font-size:18px}',
    '}'
  ].join("\n");

  function markup() {
    var s = T();
    return '' +
    '<a class="ctop-bar" href="' + PLAYLIST + '" target="_blank" rel="noopener">' +
      '<img class="ctop-logo" src="' + LOGO + '" alt="">' +
      '<span><b>' + esc(s.yt) + '</b><span>' + esc(s.ytSub) + '</span></span>' +
      '<span class="ctop-play" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 6.2 L9 17.8 L18.2 12 Z" fill="#fff"/></svg></span>' +
    '</a>' +
    '<a class="ctop-bar ctop-ex" href="' + VOD + '" target="_blank" rel="noopener">' +
      '<img class="ctop-logo" src="' + LOGO + '" alt="">' +
      '<span><span>' + esc(s.exLead) + '</span><b>' + esc(s.exTitle) + '</b></span>' +
      '<span class="ctop-gift" aria-hidden="true">🎁</span>' +
    '</a>' +
    '<a class="ctop-bar ctop-vote" href="' + VOTE + '" target="_blank" rel="noopener">' +
      '<img class="ctop-logo" src="' + LOGO + '" alt="">' +
      '<span><b>' + esc(s.vote) + '</b></span>' +
      '<span class="ctop-go">' + esc(s.voteGo) + ' →</span>' +
    '</a>' +
    '<section class="ctop-board">' +
      '<div class="ctop-bhead"><img src="' + LOGO + '" alt=""><b>' + esc(s.board) + '</b><em>10' +
        (/^(ko|ja|zh)/.test(document.documentElement.lang || "ko") ? "분" : " min") + '</em></div>' +
      '<div id="ctopList"><div class="ctop-msg">' + esc(s.loading) + '</div></div>' +
      '<div class="ctop-upd" id="ctopUpd"></div>' +
    '</section>';
  }

  var rowsCache = null;

  function paintRows() {
    var box = document.getElementById("ctopList"), upd = document.getElementById("ctopUpd");
    if (!box) return;
    var s = T();
    if (!rowsCache) return;
    if (!rowsCache.length) { box.innerHTML = '<div class="ctop-msg">' + esc(s.empty) + "</div>"; return; }
    box.innerHTML = rowsCache.slice(0, 4).map(function (r, i) {
      var rank = Number(r.rank || i + 1);
      var team = TEAMS[r.team_id] || { name: r.team_name || r.team_id };
      var first = rank === 1 && Number(r.total_score || 0) > 0;
      return '<article class="ctop-row' + (first ? " is-first" : "") + '">' +
        '<span class="ctop-rank">' + esc(s.rank(rank)) + "</span>" +
        '<div><div class="ctop-name">' + esc(team.name) + "</div>" +
        '<div class="ctop-sub">' + esc(s.pledge) + " " + val(r.pledge_score) + " · " +
          esc(s.like) + " " + val(r.like_score) + " · " + esc(s.share) + " " + val(r.share_score) + " · " +
          esc(s.meme) + " " + val(r.meme_score) + "</div></div>" +
        '<div class="ctop-total">' + val(r.total_score) + "</div></article>";
    }).join("");
    var last = rowsCache.map(function (r) { return r.updated_at; }).filter(Boolean).sort().pop();
    if (upd && last) {
      var d = new Date(last), l = document.documentElement.lang || "ko";
      var loc = l === "ko" ? "ko-KR" : (l === "ja" ? "ja-JP" : (/^zh/.test(l) ? "zh-CN" : "en-US"));
      upd.textContent = s.updated + " " +
        d.toLocaleDateString(loc, { month: "numeric", day: "numeric" }) + " " +
        d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" }) + " · " + s.refresh;
    }
  }

  function load() {
    var url = CACHE_URL + (CACHE_URL.indexOf("?") >= 0 ? "&" : "?") + "v=" + Math.floor(Date.now() / REFRESH_MS);
    fetch(url, { cache: "default" })
      .then(function (r) { if (!r.ok) throw new Error("scoreboard " + r.status); return r.json(); })
      .then(function (p) {
        rowsCache = Array.isArray(p) ? p : (p && p.rows) || [];
        try { localStorage.setItem("idolcamp_scoreboard_cache_v2", JSON.stringify({ savedAt: Date.now(), rows: rowsCache })); } catch (e) {}
        paintRows();
      })
      .catch(function () {
        try {
          var saved = JSON.parse(localStorage.getItem("idolcamp_scoreboard_cache_v2") || "null");
          if (saved && Array.isArray(saved.rows) && Date.now() - Number(saved.savedAt || 0) < 86400000) {
            rowsCache = saved.rows; paintRows(); return;
          }
        } catch (e) {}
        var box = document.getElementById("ctopList");
        if (box) box.innerHTML = '<div class="ctop-msg">' + esc(T().loading) + "</div>";
      });
  }

  function mount() {
    var tabs = document.querySelector(".tabs");
    if (!tabs || document.querySelector(".ctop")) return;
    var st = document.createElement("style");
    st.id = "ctop-style"; st.textContent = CSS;
    document.head.appendChild(st);
    var box = document.createElement("div");
    box.className = "ctop";
    box.innerHTML = markup();
    tabs.parentNode.insertBefore(box, tabs);   /* 본 페이지와 같이 탭 바 위에 둔다 */
    load();
    setInterval(function () { if (!document.hidden) load(); }, REFRESH_MS);
    /* 언어를 바꾸면 같이 다시 그린다 */
    new MutationObserver(function () {
      var b = document.querySelector(".ctop");
      if (b) { b.innerHTML = markup(); paintRows(); }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
