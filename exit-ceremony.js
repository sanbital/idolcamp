(function () {
  "use strict";

  var CFG = window.MUNIVERSE_CONFIG || {};
  if (!CFG.supabaseUrl || !CFG.supabaseAnonKey) return;

  var SUPA = CFG.supabaseUrl.replace(/\/$/, "");
  var ANON = CFG.supabaseAnonKey;
  var EXIT_BUCKET = SUPA + "/storage/v1/object/public/idolcamp-exit/";
  var MEMBER_BUCKET = SUPA + "/storage/v1/object/public/idolcamp-members/";
  var state = { released: false, mounted: false, open: false, data: null, index: 0, friends: [], lang: "ko", hidden: [] };

  var UI = {
    ko: { remember: "이 순간을 기억하시나요?", friend: "친구", certificate: "온라인 퇴소증", made: "명과 친구가 되었습니다", you: "당신은", student: "수련생입니다.", desc: function(n){ return n + "명의 수련회 친구와 추억을 나누며 명예롭게 퇴소에 성공했습니다."; }, mates: "당신의 수련회 퇴소 메이트", album: "추억의 사진첩", kit: "수련회 수료키트 구경가기!", retry: "다시 도전하기", loading: "퇴소식을 준비하고 있습니다.", notReady: "퇴소식 준비가 아직 완료되지 않았습니다.", plus: "친구가 한 명 늘었습니다!", miss: "이번에는 아쉽게 친구가 되지 못했습니다." },
    en: { remember: "Do you remember this moment?", friend: "friends", certificate: "Online Camp Certificate", made: " friends made", you: "You are a", student: "camper.", desc: function(n){ return "You shared memories with " + n + " camp friends and successfully completed camp."; }, mates: "Your campmates", album: "My Camp Memories", kit: "See the Camp Completion Kit", retry: "Try Again", loading: "Preparing the exit ceremony.", notReady: "The exit ceremony is still being prepared.", plus: "You made a new friend!", miss: "Not this time." },
    ja: { remember: "この瞬間を覚えていますか？", friend: "友達", certificate: "オンライン退所証", made: "人と友達になりました", you: "あなたは", student: "研修生です。", desc: function(n){ return n + "人のキャンプ仲間と思い出を分かち合い、無事に退所しました。"; }, mates: "あなたのキャンプメイト", album: "思い出のアルバム", kit: "修了キットを見る", retry: "もう一度挑戦", loading: "退所式を準備しています。", notReady: "退所式はまだ準備中です。", plus: "友達が1人増えました！", miss: "今回は友達になれませんでした。" },
    "zh-CN": { remember: "还记得这一刻吗？", friend: "朋友", certificate: "在线结营证书", made: "位朋友", you: "你是", student: "学员。", desc: function(n){ return "你与" + n + "位夏令营朋友分享了回忆，顺利完成结营。"; }, mates: "你的夏令营伙伴", album: "回忆相册", kit: "查看结营纪念套装", retry: "再次挑战", loading: "正在准备结营仪式。", notReady: "结营仪式仍在准备中。", plus: "又多了一位朋友！", miss: "这次没能成为朋友。" },
    "zh-TW": { remember: "還記得這一刻嗎？", friend: "朋友", certificate: "線上結營證書", made: "位朋友", you: "你是", student: "學員。", desc: function(n){ return "你與" + n + "位夏令營朋友分享了回憶，順利完成結營。"; }, mates: "你的夏令營夥伴", album: "回憶相簿", kit: "查看結營紀念套組", retry: "再次挑戰", loading: "正在準備結營儀式。", notReady: "結營儀式仍在準備中。", plus: "又多了一位朋友！", miss: "這次沒能成為朋友。" }
  };

  function headers(extra) {
    var h = { apikey: ANON, Authorization: "Bearer " + ANON, Accept: "application/json" };
    Object.keys(extra || {}).forEach(function(k){ h[k] = extra[k]; });
    return h;
  }

  async function api(path, options) {
    var r = await fetch(SUPA + "/rest/v1/" + path, Object.assign({ cache: "no-store", headers: headers() }, options || {}));
    if (!r.ok) throw new Error("exit api " + r.status);
    return await r.json();
  }

  async function releaseState() {
    var rows = await api("rpc/camp_exit_release_state", { method: "POST", headers: headers({ "Content-Type": "application/json" }), body: "{}" });
    return rows && rows[0] ? rows[0] : { released: false, release_at: null };
  }

  function detectLang() {
    var pressed = document.querySelector(".langs button[aria-pressed='true']");
    var t = pressed ? pressed.textContent.trim() : "";
    if (/日本/.test(t)) return "ja";
    if (/简|簡體|简体/.test(t)) return "zh-CN";
    if (/繁/.test(t)) return "zh-TW";
    if (/EN|English/i.test(t)) return "en";
    return "ko";
  }

  function langKey(prefix) {
    var map = { ko: "ko", en: "en", ja: "ja", "zh-CN": "zh_cn", "zh-TW": "zh_tw" };
    return prefix + "_" + map[state.lang];
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function qText(q) { return q[langKey("question")] || q.question_ko || ""; }
  function titleFor(n) {
    if (n === 0) return state.lang === "ko" ? "아직 낯가림 중인" : "Still warming up";
    var row = state.data.titles.find(function(x){ return Number(x.friend_count) === n; });
    return row ? (row[langKey("title")] || row.title_ko) : String(n);
  }
  function photoFor(id) { return state.data.photos.find(function(x){ return x.id === id; }); }
  function nameFor(id) {
    var p = photoFor(id);
    if (p) return state.lang === "ko" ? (p.member_ko || p.member_en) : (p.member_en || p.member_ko);
    if (id === "mc_01") return "MC 1";
    if (id === "mc_02") return "MC 2";
    return id || "";
  }

  function injectStyle() {
    if (document.getElementById("exit-ceremony-style")) return;
    var st = document.createElement("style");
    st.id = "exit-ceremony-style";
    st.textContent = [
      "#exitCeremonyPanel{max-width:760px;margin:18px auto 42px;padding:0 12px;color:#123b2f}",
      ".exit-progress-row{display:flex;justify-content:space-between;font-size:12px;color:#718078;margin:0 2px 7px}",
      ".exit-track{height:7px;background:#e5e8de;border-radius:99px;overflow:hidden;margin-bottom:13px}.exit-fill{height:100%;background:#174d3a;transition:.2s}",
      ".exit-card,.exit-cert,.exit-album{background:#fffdf7;border:1px solid #dfe5d8;border-radius:25px;overflow:hidden;box-shadow:0 12px 32px rgba(20,55,42,.08)}",
      ".exit-visual{aspect-ratio:4/3;background:#e8eddd;display:grid;place-items:center;position:relative;overflow:hidden}.exit-visual img{width:100%;height:100%;object-fit:cover;display:block}",
      ".exit-photo-no{position:absolute;left:13px;top:13px;background:rgba(255,253,247,.94);border:1px solid #dfe5d8;border-radius:999px;padding:7px 10px;font-size:11px;font-weight:900}",
      ".exit-q{padding:23px 18px 19px;text-align:center}.exit-eyebrow{font-size:12px;color:#718078;margin-bottom:8px}.exit-question{font-size:21px;line-height:1.48;font-weight:900;letter-spacing:-.5px;white-space:pre-line;min-height:62px}",
      ".exit-buttons{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:21px}.exit-answer{border-radius:17px;padding:18px 10px;font-size:22px;font-weight:950;border:1px solid #dfe5d8;cursor:pointer}.exit-answer.yes{background:#174d3a;border-color:#174d3a;color:#fff}.exit-answer.no{background:#fff;color:#123b2f}.exit-answer:disabled{opacity:.4}",
      ".exit-feedback{min-height:22px;margin-top:10px;font-size:12px;color:#718078}.exit-loading{text-align:center;padding:70px 20px;background:#fffdf7;border:1px solid #dfe5d8;border-radius:25px}",
      ".exit-cert-head{background:#dcebb9;padding:18px;text-align:center}.exit-cert-visual{aspect-ratio:16/8;border-radius:18px;background:#fffdf7;border:1px solid rgba(18,59,47,.14);display:grid;place-items:center;overflow:hidden;margin-bottom:15px}.exit-cert-visual img{width:100%;height:100%;object-fit:cover}.exit-logo-img{max-width:54%!important;height:auto!important;object-fit:contain!important}.exit-logo-fallback{font-size:27px;font-weight:950}",
      ".exit-cert-body{text-align:center;padding:24px 18px}.exit-score{font-size:44px;font-weight:950}.exit-small{font-size:11px;color:#718078}.exit-title{margin-top:14px;font-size:21px;font-weight:950}.exit-desc{margin-top:10px;font-size:14px;line-height:1.65}.exit-mates{margin-top:19px;padding-top:17px;border-top:1px solid #dfe5d8}.exit-mates p{font-size:14px;line-height:1.75;margin:8px 0 0}",
      ".exit-album{margin-top:15px;padding:18px}.exit-album h2{font-size:21px;margin:2px 0 4px}.exit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:16px}.exit-polaroid{margin:0;background:#fff;border:1px solid #dfe5d8;padding:7px 7px 10px;border-radius:10px}.exit-polaroid:nth-child(3n+1){transform:rotate(-.7deg)}.exit-polaroid:nth-child(3n+2){transform:rotate(.7deg)}.exit-polaroid img,.exit-ph{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:7px;background:#e9ecdf;display:grid;place-items:center;color:#718078;font-size:11px}.exit-polaroid figcaption{text-align:center;font-size:12px;font-weight:850;margin-top:7px}",
      ".exit-kit{margin-top:15px;border:1px solid #d3dfb7;background:#dcebb9;border-radius:22px;padding:17px}.exit-kit b{display:block;font-size:18px;margin-bottom:10px}.exit-kit a{display:block;text-align:center;text-decoration:none;border-radius:14px;padding:14px;background:#174d3a;color:white;font-weight:900}.exit-retry{width:100%;margin-top:12px;border:1px solid #dfe5d8;background:#fffdf7;border-radius:14px;padding:13px;color:#123b2f;font-weight:850}",
      "@media(min-width:560px){.exit-grid{grid-template-columns:repeat(3,1fr)}}"
    ].join("");
    document.head.appendChild(st);
  }

  function ensurePanel() {
    if (state.mounted) return document.getElementById("exitCeremonyPanel");
    injectStyle();
    var nav = document.querySelector(".tabs");
    if (!nav) return null;
    var panel = document.createElement("section");
    panel.id = "exitCeremonyPanel";
    panel.hidden = true;
    nav.insertAdjacentElement("afterend", panel);
    state.mounted = true;
    return panel;
  }

  function hideFollowingContent() {
    var nav = document.querySelector(".tabs");
    var panel = document.getElementById("exitCeremonyPanel");
    if (!nav || !panel) return;
    state.hidden = [];
    var node = panel.nextElementSibling;
    while (node) {
      state.hidden.push({ el: node, hidden: node.hidden, display: node.style.display });
      node.hidden = true;
      node.style.display = "none";
      node = node.nextElementSibling;
    }
  }

  function restoreFollowingContent() {
    state.hidden.forEach(function(x){ x.el.hidden = x.hidden; x.el.style.display = x.display; });
    state.hidden = [];
  }

  async function loadData() {
    var results = await Promise.all([
      api("camp_exit_quiz?select=*&active=eq.true&order=photo_no.asc"),
      api("camp_exit_titles?select=*&order=friend_count.asc"),
      api("camp_exit_settings?select=*&id=eq.1"),
      api("camp_member_photos?select=id,team_id,member_ko,member_en,photo_path,sort_order,is_group,active&active=eq.true&is_group=eq.false")
    ]);
    return { quiz: results[0], titles: results[1], settings: results[2][0] || {}, photos: results[3] };
  }

  async function openCeremony() {
    var panel = ensurePanel();
    if (!panel || !state.released) return;
    if (!state.open) { hideFollowingContent(); state.open = true; }
    panel.hidden = false;
    panel.style.display = "block";
    state.lang = detectLang();
    var tabs = document.querySelectorAll(".tabs .tab");
    tabs.forEach(function(t){ t.classList.toggle("active", t.getAttribute("data-tab") === "farewell"); t.setAttribute("aria-selected", t.getAttribute("data-tab") === "farewell" ? "true" : "false"); });
    panel.innerHTML = '<div class="exit-loading">' + esc(UI[state.lang].loading) + '</div>';
    try {
      state.data = await loadData();
      if (!state.data.quiz || state.data.quiz.length !== 26 || state.data.quiz.some(function(q){ return !qText(q) || typeof q.answer !== "boolean"; })) {
        panel.innerHTML = '<div class="exit-loading">' + esc(UI[state.lang].notReady) + '</div>';
        return;
      }
      state.index = 0; state.friends = [];
      renderQuestion();
    } catch (e) {
      panel.innerHTML = '<div class="exit-loading">' + esc(UI[state.lang].notReady) + '</div>';
    }
  }

  function closeCeremony() {
    var panel = document.getElementById("exitCeremonyPanel");
    if (!state.open) return;
    if (panel) { panel.hidden = true; panel.style.display = "none"; }
    restoreFollowingContent();
    state.open = false;
  }

  function renderQuestion() {
    var panel = document.getElementById("exitCeremonyPanel");
    if (!panel || !state.data) return;
    state.lang = detectLang();
    if (state.index >= state.data.quiz.length) return renderResult();
    var q = state.data.quiz[state.index], u = UI[state.lang], pct = Math.round(state.index / 26 * 100);
    panel.innerHTML = '<div class="exit-progress-row"><span>' + (state.index + 1) + ' / 26</span><b>' + esc(u.friend) + ' ' + state.friends.length + '</b></div>' +
      '<div class="exit-track"><div class="exit-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="exit-card"><div class="exit-visual"><img id="exitQuizImage" src="' + EXIT_BUCKET + esc(q.image_path) + '" alt="PHOTO ' + q.photo_no + '"><span class="exit-photo-no">PHOTO ' + String(q.photo_no).padStart(2,"0") + '</span></div>' +
      '<div class="exit-q"><div class="exit-eyebrow">' + esc(u.remember) + '</div><div class="exit-question">' + esc(qText(q)) + '</div>' +
      '<div class="exit-buttons"><button class="exit-answer yes" id="exitYes">YES</button><button class="exit-answer no" id="exitNo">NO</button></div><div class="exit-feedback" id="exitFeedback"></div></div></div>';
    var img = document.getElementById("exitQuizImage");
    if (img) img.onerror = function(){ this.style.display="none"; this.parentElement.insertAdjacentHTML("afterbegin",'<div class="exit-ph">IMAGE</div>'); };
    document.getElementById("exitYes").onclick = function(){ choose(true); };
    document.getElementById("exitNo").onclick = function(){ choose(false); };
  }

  function choose(value) {
    var q = state.data.quiz[state.index], correct = value === q.answer, u = UI[state.lang];
    var yes = document.getElementById("exitYes"), no = document.getElementById("exitNo"), fb = document.getElementById("exitFeedback");
    if (!yes || yes.disabled) return;
    yes.disabled = true; no.disabled = true;
    if (correct && state.friends.indexOf(q.member_id) < 0) state.friends.push(q.member_id);
    fb.textContent = correct ? u.plus : u.miss;
    setTimeout(function(){ state.index += 1; renderQuestion(); }, 430);
  }

  function renderResult() {
    var panel = document.getElementById("exitCeremonyPanel"), u = UI[state.lang], n = state.friends.length, perfect = n === 26;
    var heroLogo = document.getElementById("heroLogo") || document.querySelector(".top-camp-logo-centered");
    var logoSrc = heroLogo && heroLogo.src ? heroLogo.src : "";
    var settings = state.data.settings || {};
    var visual = perfect ? '<div class="exit-cert-visual"><img id="exitGroupPhoto" src="' + EXIT_BUCKET + esc(settings.group_photo_path || "certificate/group_26.webp") + '" alt="26명 단체사진"></div>' : '<div class="exit-cert-visual">' + (logoSrc ? '<img class="exit-logo-img" src="' + esc(logoSrc) + '" alt="아이돌 수련회">' : '<div><div class="exit-logo-fallback">아이돌 수련회</div><div class="exit-small">IDOL SCHOOL CAMP</div></div>') + '</div>';
    var names = state.friends.map(nameFor).join(" · ") || "-";
    var album = state.friends.map(function(id){ var p = photoFor(id), nm = nameFor(id); return '<figure class="exit-polaroid">' + (p ? '<img src="' + MEMBER_BUCKET + esc(p.photo_path) + '" alt="' + esc(nm) + '">' : '<div class="exit-ph">' + esc(nm) + '</div>') + '<figcaption>' + esc(nm) + '</figcaption></figure>'; }).join("");
    panel.innerHTML = '<div class="exit-cert"><div class="exit-cert-head">' + visual + '<div class="exit-small">IDOL SCHOOL CAMP</div><h1 style="margin:4px 0 0;font-size:25px">' + esc(u.certificate) + '</h1></div>' +
      '<div class="exit-cert-body"><div class="exit-score">' + n + '</div><div class="exit-small">' + esc(u.made) + '</div><div class="exit-title">' + esc(u.you + " " + titleFor(n) + " " + u.student) + '</div><div class="exit-desc">' + esc(u.desc(n)) + '</div><div class="exit-mates"><div class="exit-small">' + esc(u.mates) + '</div><p>' + esc(names) + '</p></div><div class="exit-small" style="margin-top:18px">2026 · MBC M × Muniverse</div></div></div>' +
      '<div class="exit-album"><div class="exit-small">MY CAMP MEMORIES</div><h2>' + esc(u.album) + '</h2><div class="exit-grid">' + (album || '<div class="exit-small">-</div>') + '</div></div>' +
      '<div class="exit-kit"><b>수련회의 추억, 아직 끝나지 않았어요!</b>' + (settings.kit_url ? '<a href="' + esc(settings.kit_url) + '">' + esc(u.kit) + '</a>' : '<a href="#" onclick="return false" style="opacity:.55">' + esc(u.kit) + '</a>') + '</div>' +
      '<button class="exit-retry" id="exitRetry">' + esc(u.retry) + '</button>';
    var gp = document.getElementById("exitGroupPhoto");
    if (gp) gp.onerror = function(){ this.parentElement.innerHTML = logoSrc ? '<img class="exit-logo-img" src="' + esc(logoSrc) + '" alt="아이돌 수련회">' : '<div class="exit-logo-fallback">아이돌 수련회</div>'; };
    document.getElementById("exitRetry").onclick = function(){ state.index = 0; state.friends = []; renderQuestion(); window.scrollTo({ top: panel.getBoundingClientRect().top + window.scrollY - 12, behavior: "smooth" }); };
  }

  function unlockTab() {
    var tab = document.querySelector('.tabs .tab[data-tab="farewell"]');
    if (!tab) return;
    state.released = true;
    tab.disabled = false;
    tab.classList.remove("locked");
    tab.removeAttribute("aria-disabled");
    var soon = tab.querySelector(".soon-mini");
    if (soon) soon.style.display = "none";
  }

  function keepLocked() {
    var tab = document.querySelector('.tabs .tab[data-tab="farewell"]');
    if (!tab) return;
    state.released = false;
    tab.disabled = true;
    tab.classList.add("locked");
    tab.setAttribute("aria-disabled", "true");
  }

  async function checkRelease() {
    try {
      var rs = await releaseState();
      if (rs.released) {
        unlockTab();
        if ((new URLSearchParams(location.search).get("tab") || "").toLowerCase() === "farewell") setTimeout(openCeremony, 0);
        return true;
      }
      keepLocked();
      return false;
    } catch (e) {
      keepLocked();
      return false;
    }
  }

  function bindTabs() {
    var nav = document.querySelector(".tabs");
    var farewell = document.querySelector('.tabs .tab[data-tab="farewell"]');
    if (!nav || !farewell) return;
    nav.addEventListener("click", function(e){
      var t = e.target.closest && e.target.closest(".tab");
      if (!t) return;
      if (t === farewell) {
        if (!state.released) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        openCeremony();
      } else if (state.open) {
        closeCeremony();
      }
    }, true);
  }

  function bindLanguage() {
    var box = document.querySelector(".langs");
    if (!box) return;
    box.addEventListener("click", function(){ setTimeout(function(){ if(state.open){ state.lang=detectLang(); if(state.index>=26) renderResult(); else renderQuestion(); } }, 0); });
  }

  async function boot() {
    bindTabs();
    bindLanguage();
    var rs = await checkRelease();
    if (!rs) {
      var timer = setInterval(async function(){ if(await checkRelease()) clearInterval(timer); }, 10000);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
