window.MUNIVERSE_CONFIG = {
  supabaseUrl: "https://kkaoerbblpuszptiibvo.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYW9lcmJibHB1c3pwdGlpYnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDY5MTMsImV4cCI6MjA5ODEyMjkxM30.Xf549NzokL9zY7AT8Jd5NYFRj81r7z2hS6i7kZbpCMw",
  shareUrl: "https://idolcamp.muniverse.io/",
  gisu: 1,
  maxShown: 1000,
  scoreboardCacheUrl: "https://kkaoerbblpuszptiibvo.supabase.co/storage/v1/object/public/idolcamp-cache/scoreboard.json",
  scoreboardRefreshMs: 600000,
  boardCacheMs: 60000,
  memberPhotoCacheMs: 21600000,
  enableVisitorTracking: false,
  allowDemoBoardFallback: false,
  idolcampApiUrl: "https://kkaoerbblpuszptiibvo.supabase.co/functions/v1/idolcamp-api",
  turnstileSiteKey: "0x4AAAAAAD0Ey7nrVqGnKma-",
  scoreDeadline: "2026-08-07T23:59:59+09:00",
  talent: {
    enabled: true,
    previewBeforeStart: false,
    testRegistrationOpen: false,
    pageSize: 30,
    maxEntriesPerAuthor: 3,
    maxFinalistsPerAuthor: 1,
    registrationScore: 10000,
    likeScore: 100,
    finalWinnerScore: 10000000,
    leaderboardRefreshMs: 600000,
    preliminaryStart: "2026-07-17T18:00:00+09:00",
    preliminaryEnd: "2026-08-07T23:59:59+09:00",
    preliminaryCountEnd: "2026-08-10T11:59:59+09:00",
    finalStart: "2026-08-11T10:00:00+09:00",
    finalEnd: "2026-08-17T17:00:00+09:00",
    submitFunction: "submit-meme",
    leaderboardRpc: "meme_leaderboard_public",
    requiredHashtags: ["#IDOLSCHOOLCAMP", "#Muniverse", "#아이돌수련회"]
  }
};

window.addEventListener("DOMContentLoaded", function () {
  try {
    if (typeof I18N !== "undefined") {
      Object.assign(I18N.ko, {
        scoreClosedNotice: "아이돌 수련회 입소 신고 이벤트가 종료되어|신고증 발급과 좋아요는 더 이상|점수에 반영되지 않습니다.||입소 신고는 자유롭게 신청하고|응원 메시지도 남길 수 있습니다.||8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!",
        playlistTitle: "아이돌 수련회, 지금 정주행!",
        playlistSubtitle: "전 편 공개 완료 · Muniverse 유튜브에서 몰아보기",
        scoreDesc: "기존 다짐·좋아요·공유 점수는|8/7 23:59 기준으로 집계가 마감되었습니다.|8/11 오전 10시부터는|짤기자랑 결선 투표 점수가 합산됩니다.|짤기자랑 X 좋아요는 8/10 오전 11시 59분까지 반영됩니다.|점수판은 10분마다 업데이트됩니다.",
        scoreCtaTitle: "8/11 오전 10시 짤기자랑 결선투표 시작",
        scoreCtaBody: "투표 점수로 순위 역전하고|내 최애팀에 왕메달 선물하세요|8/14 퇴소식 이벤트 시작 · 마지막 이야기까지 기대해 주세요"
      });
      Object.assign(I18N.en, {
        playlistTitle: "Idol School Camp — Binge It Now!",
        playlistSubtitle: "All episodes are out · Binge on Muniverse YouTube",
        scoreDesc: "Pledge, like and share scores closed at Aug 7, 11:59 PM KST.|From Aug 11, 10:00 AM KST, Meme Talent Show final-vote points are added.|X likes count through Aug 10, 11:59 AM KST.|The scoreboard updates every 10 minutes.",
        scoreCtaTitle: "Aug 11, 10 AM — Meme Talent Show Final Vote",
        scoreCtaBody: "Climb the rankings with vote points|Gift the crown medal to your favorite team|Exit Ceremony event starts Aug 14 · Stay tuned"
      });
      Object.assign(I18N.ja, {
        playlistTitle: "『IDOL SCHOOL CAMP』を今こそ一気見！",
        playlistSubtitle: "全話公開済み · Muniverse YouTubeで一気見",
        scoreDesc: "既存の決意・いいね・共有スコアは8/7 23:59時点で集計終了しました。|8/11 午前10時から画像芸大会の決選投票スコアが加算されます。|Xいいねは8/10 午前11時59分まで反映されます。|点数表は10分ごとに更新されます。",
        scoreCtaTitle: "8/11 午前10時 画像芸大会 決選投票スタート",
        scoreCtaBody: "投票スコアで順位を逆転しよう|推しチームに王メダルをプレゼント|8/14 退所式イベント開始 · 最後の物語もお楽しみに"
      });
      Object.assign(I18N["zh-CN"], {
        playlistTitle: "《IDOL SCHOOL CAMP》现在就来追完！",
        playlistSubtitle: "全集已公开 · 在 Muniverse YouTube 一次看完",
        scoreDesc: "原有宣言、点赞与分享积分已于8月7日23:59截止统计。|8月11日上午10点起，将加入表情包才艺秀决赛投票积分。|X点赞统计至8月10日上午11点59分。|积分榜每10分钟更新一次。",
        scoreCtaTitle: "8月11日上午10点 表情包才艺秀决赛投票开始",
        scoreCtaBody: "用投票积分逆转排名|把王者奖牌送给你最爱的队伍|8月14日退营仪式活动开启 · 敬请期待最后的故事"
      });
      Object.assign(I18N["zh-TW"], {
        playlistTitle: "《IDOL SCHOOL CAMP》現在就來追完！",
        playlistSubtitle: "全集已公開 · 在 Muniverse YouTube 一次看完",
        scoreDesc: "原有宣言、按讚與分享積分已於8月7日23:59截止統計。|8月11日上午10點起，將加入迷因才藝秀決賽投票積分。|X按讚統計至8月10日上午11點59分。|積分榜每10分鐘更新一次。",
        scoreCtaTitle: "8月11日上午10點 迷因才藝秀決賽投票開始",
        scoreCtaBody: "用投票積分逆轉排名|把王者獎牌送給你最愛的隊伍|8月14日退營儀式活動開啟 · 敬請期待最後的故事"
      });
    }

    if (typeof TALENT_I18N !== "undefined") {
      Object.assign(TALENT_I18N.ko, {
        closedFinalNotice: "짤기자랑 예선 등록이 마감되었습니다.|X 좋아요는 8/10 오전 11시 59분까지|집계됩니다.||8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!"
      });
    }

    var duplicateNotice = document.getElementById("scoreClosedNoticeForm");
    if (duplicateNotice) duplicateNotice.remove();

    var oldFix = document.getElementById("post-deadline-ui-fix");
    if (oldFix) oldFix.remove();

    var style = document.createElement("style");
    style.id = "approved-mockup-ui";
    style.textContent = [
      "#toast.toast-center.toast-alert{position:fixed!important;left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important;text-align:center!important;width:min(92vw,380px)!important;max-width:min(92vw,380px)!important;padding:22px 30px!important;line-height:1.55!important;transition:opacity .18s ease!important}",
      "#toast.toast-center.toast-alert.show{left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important}",
      "#toast.toast-center.toast-alert:before{text-align:center!important;width:100%!important;margin:0 0 13px!important}",
      "#toast.toast-center.toast-alert .toast-msg{display:inline-block!important;text-align:left!important;max-width:100%!important}",
      ".approved-svg-mode{padding:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important;min-height:0!important;height:auto!important;transform:none!important}",
      ".approved-svg-mode:hover,.approved-svg-mode:active{transform:none!important;box-shadow:none!important}",
      ".approved-svg-mode:before,.approved-svg-mode:after{display:none!important;content:none!important}",
      ".approved-svg{display:block!important;width:100%!important;height:auto!important;max-width:none!important;margin:0!important;padding:0!important}",
      ".score-head.approved-svg-mode{display:block!important;grid-template-columns:none!important;margin:0 0 10px!important;gap:0!important}",
      "#scoreCta.approved-svg-mode{display:block!important;margin:10px 0 0!important}",
      ".playlist-banner.approved-svg-mode{display:block!important;margin:10px 0 16px!important;border-radius:0!important}",
      "@media(max-width:640px){.score-head.approved-svg-mode{margin-bottom:7px!important}.playlist-banner.approved-svg-mode{margin:8px 0 12px!important}#scoreCta.approved-svg-mode{margin-top:8px!important}}"
    ].join("\n");
    document.head.appendChild(style);

    function escAttr(s) {
      return String(s || "").replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function koreanActive() {
      var pressed = document.querySelector(".langs button[aria-pressed='true']");
      if (!pressed) return true;
      return pressed.textContent.trim() === "한국어";
    }

    function youtubeSvg(logo) {
      logo = escAttr(logo);
      return '<svg class="approved-svg" viewBox="0 0 1414 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="아이돌 수련회 지금 정주행">' +
        '<defs><filter id="ytShadow" x="-10%" y="-20%" width="120%" height="150%"><feDropShadow dx="0" dy="11" stdDeviation="10" flood-color="#526830" flood-opacity=".20"/></filter><filter id="playGlow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="14" stdDeviation="15" flood-color="#ff5454" flood-opacity=".30"/></filter><linearGradient id="playRed" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7878"/><stop offset="1" stop-color="#f32f37"/></linearGradient></defs>' +
        '<rect x="24" y="64" width="1366" height="350" rx="72" fill="#fffaf1" stroke="#eef0df" stroke-width="5" filter="url(#ytShadow)"/>' +
        '<image href="' + logo + '" x="66" y="136" width="255" height="190" preserveAspectRatio="xMidYMid meet"/>' +
        '<text x="350" y="205" fill="#092e2d" font-family="Pretendard, sans-serif" font-size="76" font-weight="900" letter-spacing="-3">아이돌 수련회, 지금 정주행!</text>' +
        '<text x="355" y="292" fill="#102f2c" font-family="Pretendard, sans-serif" font-size="37" font-weight="650" letter-spacing="-1.2">전 편 공개 완료 · Muniverse 유튜브에서 몰아보기</text>' +
        '<rect x="1191" y="137" width="151" height="151" rx="42" fill="url(#playRed)" filter="url(#playGlow)"/>' +
        '<path d="M1252 179 L1252 247 L1307 213 Z" fill="#fff"/>' +
        '</svg>';
    }

    function scoreHeadSvg(logo) {
      logo = escAttr(logo);
      return '<svg class="approved-svg" viewBox="0 0 1200 355" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="수련회 점수판 안내">' +
        '<defs><filter id="headShadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#113a2f" flood-opacity=".10"/></filter></defs>' +
        '<image href="' + logo + '" x="20" y="52" width="286" height="178" preserveAspectRatio="xMidYMid meet"/>' +
        '<text x="337" y="72" fill="#0c3c2f" font-family="Pretendard, sans-serif" font-size="62" font-weight="900" letter-spacing="-2">수련회 점수판</text>' +
        '<rect x="1045" y="18" width="125" height="52" rx="27" fill="#e6f0ce"/><text x="1108" y="52" text-anchor="middle" fill="#123b2f" font-family="Pretendard, sans-serif" font-size="25" font-weight="900">↻ 10분</text>' +
        '<rect x="335" y="92" width="835" height="244" rx="22" fill="#fffefa" fill-opacity=".92" stroke="#e6e3da" stroke-width="2" filter="url(#headShadow)"/>' +
        '<line x1="365" y1="167" x2="1140" y2="167" stroke="#e9e5da" stroke-width="1" stroke-dasharray="5 5"/><line x1="365" y1="235" x2="1140" y2="235" stroke="#e9e5da" stroke-width="1" stroke-dasharray="5 5"/><line x1="365" y1="288" x2="1140" y2="288" stroke="#e9e5da" stroke-width="1" stroke-dasharray="5 5"/>' +
        '<g fill="#08773d" stroke="#08773d" font-family="Pretendard, sans-serif" font-weight="900"><text x="373" y="132" font-size="31">▣</text><text x="371" y="210" font-size="38">◷</text><text x="369" y="270" font-size="42">★</text><text x="369" y="326" font-size="40">↻</text></g>' +
        '<g fill="#101d19" font-family="Pretendard, sans-serif" font-size="24" font-weight="800" letter-spacing="-.7"><text x="430" y="126">기존 다짐·좋아요·공유 점수는</text><text x="430" y="157">8/7 23:59 기준으로 집계가 마감되었습니다.</text><text x="430" y="202">8/11 오전 10시부터는</text><text x="430" y="232">장기자랑 결선 투표 점수가 합산됩니다.</text><text x="430" y="274">짤기자랑 X 좋아요는 8/10 오전 11시 59분까지 반영됩니다.</text><text x="430" y="326">점수판은 10분마다 업데이트됩니다.</text></g>' +
        '</svg>';
    }

    function ctaSvg() {
      return '<svg class="approved-svg" viewBox="0 0 1200 245" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="짤기자랑 결선투표 안내">' +
        '<defs><linearGradient id="ctaBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#075b34"/><stop offset=".62" stop-color="#06552f"/><stop offset="1" stop-color="#043f28"/></linearGradient><radialGradient id="gold" cx="34%" cy="26%" r="76%"><stop offset="0" stop-color="#fff8c6"/><stop offset=".25" stop-color="#ffe26a"/><stop offset=".62" stop-color="#f2bd25"/><stop offset="1" stop-color="#c98a08"/></radialGradient><filter id="medalGlow" x="-60%" y="-60%" width="220%" height="220%"><feDropShadow dx="0" dy="5" stdDeviation="10" flood-color="#ffd94d" flood-opacity=".48"/></filter></defs>' +
        '<rect x="3" y="3" width="1194" height="239" rx="28" fill="url(#ctaBg)" stroke="#063f28" stroke-width="5"/>' +
        '<path d="M955 0 L1014 0 L1034 95 L985 87 Z" fill="#2d64c8"/><path d="M1016 0 L1075 0 L1052 91 L1000 88 Z" fill="#ec4944"/>' +
        '<text x="38" y="67" fill="#ffe168" font-family="Pretendard, sans-serif" font-size="48" font-weight="900" letter-spacing="-1.8">8/11 오전 10시 짤기자랑 결선투표 시작</text>' +
        '<text x="158" y="128" fill="#ffffff" font-family="Pretendard, sans-serif" font-size="34" font-weight="900" letter-spacing="-1">투표 점수로 순위 역전하고</text>' +
        '<text x="113" y="176" fill="#ffffff" font-family="Pretendard, sans-serif" font-size="38" font-weight="900" letter-spacing="-1.2">내 <tspan fill="#ffe04e">최애팀</tspan>에 <tspan fill="#ffe04e">왕메달 선물</tspan>하세요</text>' +
        '<line x1="80" y1="192" x2="800" y2="192" stroke="#d8bc42" stroke-opacity=".55" stroke-width="2"/>' +
        '<text x="80" y="225" fill="#ffe58a" font-family="Pretendard, sans-serif" font-size="22" font-weight="850">✦ 8/14 퇴소식 이벤트 시작 · 마지막 이야기까지 기대해 주세요 ✦</text>' +
        '<g filter="url(#medalGlow)"><circle cx="1015" cy="140" r="96" fill="#e1a90c" stroke="#ffeb8a" stroke-width="5"/><circle cx="1015" cy="140" r="82" fill="url(#gold)" stroke="#d9990c" stroke-width="4"/><circle cx="1015" cy="140" r="67" fill="none" stroke="#b47a09" stroke-width="3" opacity=".62"/><text x="1015" y="119" text-anchor="middle" fill="#6a4706" font-family="serif" font-size="35" font-weight="700">♛</text><text x="1015" y="166" text-anchor="middle" fill="#5d3b04" font-family="Pretendard, sans-serif" font-size="30" font-weight="900">왕메달</text></g>' +
        '</svg>';
    }

    function saveOriginal(el) {
      if (el && !el.__approvedOriginalHtml) el.__approvedOriginalHtml = el.innerHTML;
    }

    function restoreOriginal(el) {
      if (!el || !el.__approvedOriginalHtml) return;
      el.innerHTML = el.__approvedOriginalHtml;
      el.classList.remove("approved-svg-mode");
    }

    function applyApprovedMockup() {
      var yt = document.querySelector(".playlist-banner");
      var head = document.querySelector(".score-head");
      var cta = document.getElementById("scoreCta");
      saveOriginal(yt); saveOriginal(head); saveOriginal(cta);

      if (!koreanActive()) {
        restoreOriginal(yt); restoreOriginal(head); restoreOriginal(cta);
        if (typeof applyI18n === "function") applyI18n();
        return;
      }

      var ytLogoEl = yt && yt.querySelector(".playlist-banner-logo");
      var scoreLogoEl = head && head.querySelector(".score-logo");
      var fallbackLogo = document.querySelector(".score-logo, .playlist-banner-logo, .hero-logo");
      var ytLogo = ytLogoEl && ytLogoEl.src ? ytLogoEl.src : (fallbackLogo && fallbackLogo.src ? fallbackLogo.src : "");
      var scoreLogo = scoreLogoEl && scoreLogoEl.src ? scoreLogoEl.src : ytLogo;

      if (yt && !yt.classList.contains("approved-svg-mode")) {
        yt.innerHTML = youtubeSvg(ytLogo);
        yt.classList.add("approved-svg-mode");
      }
      if (head && !head.classList.contains("approved-svg-mode")) {
        head.innerHTML = scoreHeadSvg(scoreLogo);
        head.classList.add("approved-svg-mode");
      }
      if (cta && !cta.classList.contains("approved-svg-mode")) {
        cta.innerHTML = ctaSvg();
        cta.classList.add("approved-svg-mode");
      }
    }

    if (typeof applyI18n === "function") applyI18n();
    if (typeof applyTalentI18n === "function" && typeof talentInited !== "undefined" && talentInited) applyTalentI18n();
    applyApprovedMockup();

    var langs = document.querySelector(".langs");
    if (langs) {
      langs.addEventListener("click", function () {
        setTimeout(function () {
          if (typeof applyI18n === "function") applyI18n();
          applyApprovedMockup();
        }, 40);
      });
      var langObserver = new MutationObserver(function () {
        setTimeout(applyApprovedMockup, 0);
      });
      langObserver.observe(langs, { subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
    }
  } catch (e) {
    console.warn("Approved mockup UI override failed", e);
  }
});
