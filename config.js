window.MUNIVERSE_CONFIG = {
  supabaseUrl: "https://kkaoerbblpuszptiibvo.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYW9lcmJibHB1c3pwdGlpYnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDY5MTMsImV4cCI6MjA5ODEyMjkxM30.Xf549NzokL9zY7AT8Jd5NYFRj81r7z2hS6i7kZbpCMw",
  shareUrl: "https://idolcamp.muniverse.io/",
  gisu: 1, maxShown: 1000,
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
    preliminaryEnd:   "2026-08-07T23:59:59+09:00",
    preliminaryCountEnd: "2026-08-10T11:59:59+09:00",
    finalStart:       "2026-08-11T10:00:00+09:00",
    finalEnd:         "2026-08-17T17:00:00+09:00",
    submitFunction: "submit-meme",
    leaderboardRpc: "meme_leaderboard_public",
    requiredHashtags: ["#IDOLSCHOOLCAMP", "#Muniverse", "#아이돌수련회"]
  }
};

window.addEventListener("DOMContentLoaded", function(){
  try {
    if (typeof I18N !== "undefined") {
      Object.assign(I18N.ko, {
        scoreClosedNotice:"아이돌 수련회 입소 신고 이벤트가 종료되어|신고증 발급과 좋아요는 더 이상|점수에 반영되지 않습니다.||입소 신고는 자유롭게 신청하고|응원 메시지도 남길 수 있습니다.||8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!",
        playlistTitle:"아이돌 수련회, 지금 정주행!",
        playlistSubtitle:"전 편 공개 완료 · Muniverse 유튜브에서 몰아보기",
        scoreDesc:"기존 다짐·좋아요·공유 점수는|8/7 23:59 기준으로 집계가 마감되었습니다.|8/11 오전 10시부터는|짤기자랑 결선 투표 점수가 합산됩니다.|짤기자랑 X 좋아요는 8/10 오전 11시 59분까지 반영됩니다.|점수판은 10분마다 업데이트됩니다.",
        scoreCtaTitle:"8/11 오전 10시 짤기자랑 결선투표 시작",
        scoreCtaBody:"투표 점수로 순위 역전하고|내 최애팀에 왕메달 선물하세요|8/14 퇴소식 이벤트 시작 · 마지막 이야기까지 기대해 주세요"
      });
      Object.assign(I18N.en, {
        scoreClosedNotice:"The Idol Training Camp check-in event has ended.|Enrollment pass issuance and likes no longer count toward team scores.||You can still submit a check-in form and leave a cheer message.||From Aug 11 at 10:00 AM KST, join the final vote in the Muniverse app!",
        playlistTitle:"Idol School Camp — Binge It Now!",
        playlistSubtitle:"All episodes are out · Binge on Muniverse YouTube",
        scoreDesc:"Pledge, like and share scores|closed at Aug 7, 11:59 PM KST.|From Aug 11, 10:00 AM KST,|Meme Talent Show final-vote points are added.|X likes count through Aug 10, 11:59 AM KST.|The scoreboard updates every 10 minutes.",
        scoreCtaTitle:"Aug 11, 10 AM — Meme Talent Show Final Vote",
        scoreCtaBody:"Climb the rankings with vote points|Gift the crown medal to your favorite team|Exit Ceremony event starts Aug 14 · Stay tuned"
      });
      Object.assign(I18N.ja, {
        scoreClosedNotice:"アイドル修練会の入所申告イベントは終了しました。|入所証の発行といいねは今後チーム点数に反映されません。||入所申告は引き続き自由に申請でき、応援メッセージも残せます。||8/11 午前10時からMuniverseアプリで行われる決選投票にご参加ください！",
        playlistTitle:"『IDOL SCHOOL CAMP』を今こそ一気見！",
        playlistSubtitle:"全話公開済み · Muniverse YouTubeで一気見",
        scoreDesc:"既存の決意・いいね・共有スコアは|8/7 23:59時点で集計終了しました。|8/11 午前10時からは|画像芸大会の決選投票スコアが加算されます。|Xいいねは8/10 午前11時59分まで反映されます。|点数表は10分ごとに更新されます。",
        scoreCtaTitle:"8/11 午前10時 画像芸大会 決選投票スタート",
        scoreCtaBody:"投票スコアで順位を逆転しよう|推しチームに王メダルをプレゼント|8/14 退所式イベント開始 · 最後の物語もお楽しみに"
      });
      Object.assign(I18N["zh-CN"], {
        scoreClosedNotice:"偶像修炼会入营申报活动已结束。|入营证领取和点赞将不再计入应援队分数。||入营申报仍可自由提交，也可以继续留下应援留言。||8月11日上午10点起，请在Muniverse应用参与决赛投票！",
        playlistTitle:"《IDOL SCHOOL CAMP》现在就来追完！",
        playlistSubtitle:"全集已公开 · 在 Muniverse YouTube 一次看完",
        scoreDesc:"原有宣言、点赞与分享积分已于|8月7日23:59截止统计。|8月11日上午10点起|将加入表情包才艺秀决赛投票积分。|X点赞统计至8月10日上午11点59分。|积分榜每10分钟更新一次。",
        scoreCtaTitle:"8月11日上午10点 表情包才艺秀决赛投票开始",
        scoreCtaBody:"用投票积分逆转排名|把王者奖牌送给你最爱的队伍|8月14日退营仪式活动开启 · 敬请期待最后的故事"
      });
      Object.assign(I18N["zh-TW"], {
        scoreClosedNotice:"偶像修煉會入營申報活動已結束。|領取入營證與按讚將不再計入應援隊分數。||入營申報仍可自由提交，也可以繼續留下應援留言。||8月11日上午10點起，請在Muniverse應用程式參與決賽投票！",
        playlistTitle:"《IDOL SCHOOL CAMP》現在就來追完！",
        playlistSubtitle:"全集已公開 · 在 Muniverse YouTube 一次看完",
        scoreDesc:"原有宣言、按讚與分享積分已於|8月7日23:59截止統計。|8月11日上午10點起|將加入迷因才藝秀決賽投票積分。|X按讚統計至8月10日上午11點59分。|積分榜每10分鐘更新一次。",
        scoreCtaTitle:"8月11日上午10點 迷因才藝秀決賽投票開始",
        scoreCtaBody:"用投票積分逆轉排名|把王者獎牌送給你最愛的隊伍|8月14日退營儀式活動開啟 · 敬請期待最後的故事"
      });
    }

    if (typeof TALENT_I18N !== "undefined") {
      Object.assign(TALENT_I18N.ko, {
        closedFinalNotice:"짤기자랑 예선 등록이 마감되었습니다.|X 좋아요는 8/10 오전 11시 59분까지|집계됩니다.||8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!"
      });
    }

    var duplicateNotice = document.getElementById("scoreClosedNoticeForm");
    if (duplicateNotice) duplicateNotice.remove();
    var medalLabel = document.querySelector("#scoreCta .medal-kor");
    if (medalLabel) medalLabel.textContent = "왕메달";

    var style = document.createElement("style");
    style.id = "post-deadline-ui-fix";
    style.textContent = [
      "#scoreClosedNoticeBoard{margin:20px 0!important;padding:16px 18px!important;line-height:1.52!important;}",
      "#scoreClosedNoticeBoard + #board{margin-top:0!important;}",
      "#toast.toast-center.toast-alert{position:fixed!important;left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important;text-align:left!important;width:min(92vw,380px)!important;max-width:min(92vw,380px)!important;padding:22px 30px!important;line-height:1.55!important;transition:opacity .18s ease!important;will-change:opacity!important;}",
      "#toast.toast-center.toast-alert.show{left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important;}",
      "#toast.toast-center.toast-alert:before{text-align:center!important;width:100%!important;margin:0 0 13px!important;}",

      ".playlist-banner{position:relative!important;margin:14px 0 18px!important;padding:22px 24px!important;border-radius:30px!important;background:#fffdf6!important;border:2px solid rgba(21,71,47,.13)!important;box-shadow:0 8px 0 rgba(60,94,39,.12),0 16px 28px rgba(48,74,35,.12)!important;overflow:hidden!important;}",
      ".playlist-banner:before{display:none!important;}",
      ".playlist-banner-inner{display:grid!important;grid-template-columns:185px minmax(0,1fr) 116px!important;gap:24px!important;align-items:center!important;min-height:142px!important;}",
      ".playlist-banner-logo{width:180px!important;height:auto!important;margin:0!important;object-fit:contain!important;filter:none!important;}",
      ".playlist-banner-copy{display:flex!important;flex-direction:column!important;justify-content:center!important;gap:16px!important;min-width:0!important;}",
      ".playlist-banner-title{margin:0!important;font-size:51px!important;line-height:1.02!important;font-weight:950!important;letter-spacing:-1.8px!important;color:#082e2d!important;white-space:nowrap!important;word-break:keep-all!important;text-wrap:nowrap!important;}",
      ".playlist-banner-subtitle{margin:0!important;font-size:25px!important;line-height:1.12!important;font-weight:500!important;letter-spacing:-.65px!important;color:#102d2b!important;white-space:nowrap!important;word-break:keep-all!important;}",
      ".playlist-banner-subtitle .i18n-line{display:inline!important;}",
      ".playlist-banner-play{justify-self:end!important;width:108px!important;height:88px!important;border-radius:24px!important;box-shadow:0 14px 22px rgba(247,76,76,.28)!important;}",
      ".playlist-banner-play svg{width:54%!important;height:54%!important;}",
      ".playlist-banner-kicker,.playlist-banner-body,.playlist-banner-cta{display:none!important;}",

      ".scoreboard{padding:18px 18px 16px!important;border-radius:28px!important;overflow:hidden!important;}",
      ".score-head{display:grid!important;grid-template-columns:260px minmax(0,1fr)!important;gap:20px!important;align-items:start!important;margin:0 0 14px!important;}",
      ".score-logo{width:245px!important;height:auto!important;aspect-ratio:auto!important;object-fit:contain!important;margin:18px 0 0!important;filter:none!important;transform:none!important;}",
      ".score-headtext{min-width:0!important;display:block!important;}",
      ".score-titlerow{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:14px!important;margin:0 0 12px!important;}",
      ".score-head h2{margin:0!important;font-size:52px!important;line-height:1!important;font-weight:950!important;letter-spacing:-1.6px!important;color:#073329!important;white-space:nowrap!important;}",
      ".score-reload{flex:0 0 auto!important;background:#e5f1ce!important;color:#13342a!important;border-radius:999px!important;padding:10px 18px!important;font-size:23px!important;font-weight:900!important;line-height:1!important;white-space:nowrap!important;}",
      ".score-desc{margin:0!important;padding:10px 20px 10px 72px!important;background:#fff!important;border:2px solid rgba(79,98,74,.10)!important;border-radius:18px!important;box-shadow:none!important;}",
      ".score-desc [data-i18n='scoreDesc']{display:block!important;}",
      ".score-desc .desktop-space,.score-desc .mo-br{display:none!important;}",
      ".score-desc .i18n-line{display:block!important;position:relative!important;margin:0!important;padding:9px 0!important;font-size:24px!important;line-height:1.22!important;font-weight:850!important;letter-spacing:-.55px!important;color:#111!important;word-break:keep-all!important;}",
      ".score-desc .line-1{padding-bottom:0!important;}",
      ".score-desc .line-2{padding-top:2px!important;padding-bottom:12px!important;}",
      ".score-desc .line-3{border-top:1px dashed rgba(45,76,55,.14)!important;padding-top:13px!important;padding-bottom:0!important;}",
      ".score-desc .line-4{padding-top:2px!important;padding-bottom:12px!important;}",
      ".score-desc .line-5,.score-desc .line-6{border-top:1px dashed rgba(45,76,55,.14)!important;padding-top:13px!important;padding-bottom:12px!important;}",
      ".score-desc .line-1:before,.score-desc .line-3:before,.score-desc .line-5:before,.score-desc .line-6:before{position:absolute!important;left:-54px!important;top:7px!important;width:38px!important;height:38px!important;display:grid!important;place-items:center!important;color:#08723d!important;font-size:34px!important;line-height:1!important;font-weight:950!important;}",
      ".score-desc .line-1:before{content:'▣'!important;}",
      ".score-desc .line-3:before{content:'◷'!important;}",
      ".score-desc .line-5:before{content:'★'!important;}",
      ".score-desc .line-6:before{content:'↻'!important;}",

      "#scoreCta.score-cta{position:relative!important;margin-top:18px!important;min-height:248px!important;padding:22px 300px 20px 54px!important;border-radius:26px!important;border:3px solid #0b4a2f!important;box-shadow:0 7px 0 rgba(11,61,42,.18)!important;overflow:hidden!important;background:radial-gradient(circle at 82% 51%,rgba(255,232,79,.50) 0%,rgba(255,232,79,.10) 20%,transparent 38%),linear-gradient(135deg,#07552f 0%,#065130 62%,#0a5a33 100%)!important;display:flex!important;align-items:center!important;}",
      "#scoreCta.score-cta:before{content:''!important;position:absolute!important;inset:0!important;background:repeating-linear-gradient(105deg,rgba(255,255,255,.045) 0 2px,transparent 2px 27px)!important;pointer-events:none!important;}",
      "#scoreCta .score-cta-copy{position:relative!important;z-index:2!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:6px!important;min-width:0!important;}",
      "#scoreCta .score-cta-copy strong{margin:0!important;font-size:48px!important;line-height:1.04!important;font-weight:950!important;letter-spacing:-1.35px!important;color:#ffe360!important;text-shadow:0 4px 0 rgba(0,0,0,.30)!important;white-space:nowrap!important;word-break:keep-all!important;}",
      "#scoreCta .score-cta-copy>span{display:block!important;width:100%!important;color:#fff!important;font-weight:950!important;line-height:1.12!important;overflow:visible!important;-webkit-line-clamp:unset!important;}",
      "#scoreCta .score-cta-copy>span .desktop-space,#scoreCta .score-cta-copy>span .mo-br{display:none!important;}",
      "#scoreCta .score-cta-copy>span .i18n-line{display:block!important;margin:0!important;white-space:nowrap!important;word-break:keep-all!important;}",
      "#scoreCta .score-cta-copy>span .line-1{margin-top:8px!important;font-size:33px!important;color:#fff!important;text-align:center!important;text-shadow:0 3px 0 rgba(0,0,0,.25)!important;}",
      "#scoreCta .score-cta-copy>span .line-2{font-size:37px!important;color:#fff!important;text-align:center!important;text-shadow:0 3px 0 rgba(0,0,0,.25)!important;}",
      "#scoreCta .score-cta-copy>span .line-2::first-letter{color:#ffd43e!important;}",
      "#scoreCta .score-cta-copy>span .line-3{margin-top:12px!important;padding:10px 0 0 24px!important;border-top:2px solid rgba(245,216,77,.35)!important;font-size:20px!important;color:#ffe47f!important;text-align:left!important;}",
      "#scoreCta .score-cta-copy>span .line-3:before{content:'✦'!important;margin-right:8px!important;color:#ffe45f!important;}",
      "#scoreCta .score-cta-medal{position:absolute!important;right:28px!important;top:50%!important;transform:translateY(-50%)!important;width:230px!important;height:230px!important;z-index:3!important;display:grid!important;place-items:center!important;}",
      "#scoreCta .medal-ribbon{display:block!important;position:absolute!important;top:-18px!important;width:116px!important;height:112px!important;background:linear-gradient(90deg,#1f4bb3 0 46%,#e43c3c 46% 100%)!important;clip-path:polygon(0 0,100% 0,84% 100%,50% 78%,16% 100%)!important;filter:drop-shadow(0 4px 4px rgba(0,0,0,.22))!important;}",
      "#scoreCta .medal-face{position:absolute!important;bottom:0!important;width:190px!important;height:190px!important;border-radius:50%!important;border:7px solid #f9d353!important;background:radial-gradient(circle at 38% 28%,#fff5ae 0%,#ffd54f 21%,#f0b90e 62%,#c98d00 100%)!important;box-shadow:0 5px 0 #b17b00,0 0 0 5px rgba(255,237,143,.85) inset,0 0 30px rgba(255,228,84,.45)!important;font-size:0!important;}",
      "#scoreCta .medal-face:before{content:'♛'!important;position:absolute!important;left:0!important;right:0!important;top:30px!important;text-align:center!important;font-size:46px!important;line-height:1!important;color:#8b5b00!important;text-shadow:0 1px 0 rgba(255,255,255,.5)!important;}",
      "#scoreCta .medal-face:after{content:'❧            ❧'!important;position:absolute!important;left:0!important;right:0!important;top:80px!important;text-align:center!important;font-size:31px!important;color:#8b5b00!important;letter-spacing:5px!important;}",
      "#scoreCta .medal-kor{position:absolute!important;left:0!important;right:0!important;bottom:39px!important;text-align:center!important;font-size:36px!important;line-height:1!important;font-weight:950!important;color:#5a3800!important;text-shadow:0 1px 0 rgba(255,255,255,.5)!important;}",
      "#scoreCta .score-cta-spark.s1{display:block!important;right:10px!important;top:10px!important;font-size:22px!important;}",
      "#scoreCta .score-cta-spark.s2,#scoreCta .score-cta-flag{display:none!important;}",

      "@media (max-width:640px){",
      ".playlist-banner{margin:10px 0 14px!important;padding:10px 12px!important;border-radius:22px!important;}",
      ".playlist-banner-inner{grid-template-columns:104px minmax(0,1fr) 62px!important;gap:10px!important;min-height:108px!important;}",
      ".playlist-banner-logo{width:100px!important;}",
      ".playlist-banner-copy{gap:8px!important;}",
      ".playlist-banner-title{font-size:27px!important;line-height:1.02!important;letter-spacing:-.9px!important;}",
      ".playlist-banner-subtitle{font-size:13.5px!important;line-height:1.1!important;letter-spacing:-.25px!important;}",
      ".playlist-banner-play{width:60px!important;height:50px!important;border-radius:14px!important;}",

      ".scoreboard{padding:12px 11px 11px!important;border-radius:22px!important;}",
      ".score-head{grid-template-columns:128px minmax(0,1fr)!important;gap:10px!important;margin-bottom:9px!important;}",
      ".score-logo{width:122px!important;margin-top:8px!important;}",
      ".score-titlerow{margin-bottom:7px!important;gap:8px!important;}",
      ".score-head h2{font-size:30px!important;letter-spacing:-.9px!important;}",
      ".score-reload{padding:7px 11px!important;font-size:12px!important;}",
      ".score-desc{padding:5px 10px 5px 34px!important;border-radius:12px!important;}",
      ".score-desc .i18n-line{padding:4px 0!important;font-size:12px!important;line-height:1.18!important;letter-spacing:-.24px!important;}",
      ".score-desc .line-1{padding-bottom:0!important;}",
      ".score-desc .line-2{padding-top:1px!important;padding-bottom:6px!important;}",
      ".score-desc .line-3{padding-top:7px!important;padding-bottom:0!important;}",
      ".score-desc .line-4{padding-top:1px!important;padding-bottom:6px!important;}",
      ".score-desc .line-5,.score-desc .line-6{padding-top:7px!important;padding-bottom:6px!important;}",
      ".score-desc .line-1:before,.score-desc .line-3:before,.score-desc .line-5:before,.score-desc .line-6:before{left:-27px!important;top:3px!important;width:20px!important;height:20px!important;font-size:18px!important;}",

      "#scoreCta.score-cta{margin-top:10px!important;min-height:126px!important;padding:10px 132px 10px 15px!important;border-radius:17px!important;border-width:2px!important;}",
      "#scoreCta .score-cta-copy{gap:2px!important;}",
      "#scoreCta .score-cta-copy strong{font-size:25px!important;line-height:1.03!important;letter-spacing:-.75px!important;}",
      "#scoreCta .score-cta-copy>span .line-1{margin-top:5px!important;font-size:17px!important;}",
      "#scoreCta .score-cta-copy>span .line-2{font-size:19px!important;}",
      "#scoreCta .score-cta-copy>span .line-3{margin-top:6px!important;padding:6px 0 0 10px!important;font-size:10.8px!important;}",
      "#scoreCta .score-cta-medal{right:10px!important;width:112px!important;height:112px!important;}",
      "#scoreCta .medal-ribbon{top:-10px!important;width:58px!important;height:58px!important;}",
      "#scoreCta .medal-face{width:96px!important;height:96px!important;border-width:4px!important;}",
      "#scoreCta .medal-face:before{top:15px!important;font-size:25px!important;}",
      "#scoreCta .medal-face:after{top:40px!important;font-size:15px!important;letter-spacing:1px!important;}",
      "#scoreCta .medal-kor{bottom:20px!important;font-size:18px!important;}",
      "}",
      "@media (max-width:390px){",
      ".playlist-banner-inner{grid-template-columns:92px minmax(0,1fr) 54px!important;gap:8px!important;}",
      ".playlist-banner-logo{width:90px!important;}",
      ".playlist-banner-title{font-size:23px!important;}",
      ".playlist-banner-subtitle{font-size:12px!important;}",
      ".playlist-banner-play{width:52px!important;height:44px!important;}",
      ".score-head{grid-template-columns:112px minmax(0,1fr)!important;gap:8px!important;}",
      ".score-logo{width:106px!important;}",
      ".score-head h2{font-size:26px!important;}",
      ".score-reload{font-size:10.5px!important;padding:6px 9px!important;}",
      ".score-desc .i18n-line{font-size:10.8px!important;}",
      "#scoreCta.score-cta{padding-right:116px!important;min-height:116px!important;}",
      "#scoreCta .score-cta-copy strong{font-size:21px!important;}",
      "#scoreCta .score-cta-copy>span .line-1{font-size:15px!important;}",
      "#scoreCta .score-cta-copy>span .line-2{font-size:16.5px!important;}",
      "#scoreCta .score-cta-copy>span .line-3{font-size:9.5px!important;}",
      "#scoreCta .score-cta-medal{width:98px!important;height:98px!important;}",
      "#scoreCta .medal-face{width:84px!important;height:84px!important;}",
      "#scoreCta .medal-kor{font-size:16px!important;bottom:18px!important;}",
      "}",
      "@media (max-width:360px){#toast.toast-center.toast-alert{width:92vw!important;max-width:92vw!important;padding:20px 22px!important;font-size:13.5px!important;}}"
    ].join("\n");
    document.head.appendChild(style);

    if (typeof applyI18n === "function") applyI18n();
    if (typeof applyTalentI18n === "function" && typeof talentInited !== "undefined" && talentInited) applyTalentI18n();
  } catch (e) {
    console.warn("Post-deadline copy/UI override failed", e);
  }
});
