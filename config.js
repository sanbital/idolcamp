window.MUNIVERSE_CONFIG = {
  supabaseUrl: "https://kkaoerbblpuszptiibvo.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYW9lcmJibHB1c3pwdGlpYnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDY5MTMsImV4cCI6MjA5ODEyMjkxM30.Xf549NzokL9zY7AT8Jd5NYFRj81r7z2hS6i7kZbpCMw",
  shareUrl: "https://idolcamp.muniverse.io/",
  gisu: 1, maxShown: 1000,

  // DB 부하 보호 설정 (기존 운영 설정 유지)
  scoreboardCacheUrl: "https://kkaoerbblpuszptiibvo.supabase.co/storage/v1/object/public/idolcamp-cache/scoreboard.json",
  scoreboardRefreshMs: 600000,
  boardCacheMs: 60000,
  memberPhotoCacheMs: 21600000,
  enableVisitorTracking: false,
  allowDemoBoardFallback: false,
  idolcampApiUrl: "https://kkaoerbblpuszptiibvo.supabase.co/functions/v1/idolcamp-api",

  turnstileSiteKey: "0x4AAAAAAD0Ey7nrVqGnKma-",

  // 다짐(입소 신고)·좋아요 점수 마감. 서버 응답 실패 시에만 쓰는 폴백값이며,
  // 실제 판정은 항상 서버(meme_event_status.board_score_deadline)를 따릅니다.
  scoreDeadline: "2026-08-07T23:59:59+09:00",

  // ── 짤 장기자랑 (운영 모드) ─────────────────────────────
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

// 8/7 예선 등록·입소 신고 점수 마감 이후 운영 문구/UI 보정.
window.addEventListener("DOMContentLoaded", function(){
  try {
    if (typeof I18N !== "undefined") {
      Object.assign(I18N.ko, {
        scoreClosedNotice:"아이돌 수련회 입소 신고 이벤트가 종료되어|신고증 발급과 좋아요는 더 이상|점수에 반영되지 않습니다.||입소 신고는 자유롭게 신청하고|응원 메시지도 남길 수 있습니다.||8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!",
        playlistTitle:"아이돌 수련회, 지금 정주행!",
        playlistSubtitle:"전 편 몰아보기 딱 좋은 타이밍|8/14 확장판 공개 · 모든 장면이 담긴 확장판은 Muniverse 앱에서만",
        scoreDesc:"기존 다짐·좋아요·공유 점수는 8/7 23:59 기준으로 집계가 마감되었습니다.|8/11 오전 10시부터는 짤기자랑 결선 투표 점수가 합산됩니다.|짤기자랑 X 좋아요는 8/10 오전 11시 59분까지 반영됩니다.|점수판은 10분마다 업데이트됩니다.",
        scoreCtaTitle:"8/11 오전 10시 짤기자랑 결선투표 시작",
        scoreCtaBody:"투표 점수로 순위 역전하고|내 최애팀에 왕메달 선물하세요|8/14 퇴소식 이벤트 시작 · 마지막 이야기까지 기대해 주세요"
      });
      Object.assign(I18N.en, {
        scoreClosedNotice:"The Idol Training Camp check-in event has ended.|Enrollment pass issuance and likes no longer|count toward team scores.||You can still submit a check-in form|and leave a cheer message.||From Aug 11 at 10:00 AM KST, join the final vote|in the Muniverse app!",
        playlistTitle:"Idol School Camp — Binge It Now!",
        playlistSubtitle:"The perfect time to catch every episode|Expanded Edition Aug 14 · Every scene, only in the Muniverse app",
        scoreDesc:"Pledge, like, and share scores closed at Aug 7, 11:59 PM KST.|From Aug 11, 10:00 AM KST, Meme Talent Show final-vote points are added.|X likes for the Meme Talent Show count through Aug 10, 11:59 AM KST.|The scoreboard updates every 10 minutes.",
        scoreCtaTitle:"Aug 11, 10 AM — Meme Talent Show Final Vote Opens",
        scoreCtaBody:"Climb the rankings with your vote points|Gift the crown medal to your favorite team|Exit Ceremony event starts Aug 14 · Stay tuned for the final chapter"
      });
      Object.assign(I18N.ja, {
        scoreClosedNotice:"アイドル修練会の入所申告イベントは終了しました。|入所証の発行といいねは今後|チーム点数に反映されません。||入所申告は引き続き自由に申請でき、|応援メッセージも残せます。||8/11 午前10時からMuniverseアプリで|行われる決選投票にご参加ください！",
        playlistTitle:"『IDOL SCHOOL CAMP』を今こそ一気見！",
        playlistSubtitle:"全話をまとめて見る絶好のタイミング|8/14 拡張版公開 · すべてのシーンを収めた拡張版はMuniverseアプリ限定",
        scoreDesc:"決意・いいね・共有の既存スコアは8/7 23:59時点で集計終了しました。|8/11 午前10時から画像芸大会の決選投票スコアが加算されます。|画像芸大会のXいいねは8/10 午前11時59分まで反映されます。|点数表は10分ごとに更新されます。",
        scoreCtaTitle:"8/11 午前10時 画像芸大会 決選投票スタート",
        scoreCtaBody:"投票スコアで順位を逆転しよう|推しチームに王メダルをプレゼント|8/14 退所式イベント開始 · 最後の物語もお楽しみに"
      });
      Object.assign(I18N["zh-CN"], {
        scoreClosedNotice:"偶像修炼会入营申报活动已结束。|入营证领取和点赞将不再|计入应援队分数。||入营申报仍可自由提交，|也可以继续留下应援留言。||8月11日上午10点起，请在Muniverse应用|参与决赛投票！",
        playlistTitle:"《IDOL SCHOOL CAMP》现在就来追完！",
        playlistSubtitle:"正是一次看完全集的好时机|8月14日扩展版公开 · 收录全部精彩场面的扩展版仅限Muniverse应用",
        scoreDesc:"原有宣言、点赞与分享积分已于8月7日23:59截止统计。|8月11日上午10点起，将加入表情包才艺秀决赛投票积分。|表情包才艺秀X点赞统计至8月10日上午11点59分。|积分榜每10分钟更新一次。",
        scoreCtaTitle:"8月11日上午10点 表情包才艺秀决赛投票开始",
        scoreCtaBody:"用投票积分逆转排名|把王者奖牌送给你最爱的队伍|8月14日退营仪式活动开启 · 敬请期待最后的故事"
      });
      Object.assign(I18N["zh-TW"], {
        scoreClosedNotice:"偶像修煉會入營申報活動已結束。|領取入營證與按讚將不再|計入應援隊分數。||入營申報仍可自由提交，|也可以繼續留下應援留言。||8月11日上午10點起，請在Muniverse應用程式|參與決賽投票！",
        playlistTitle:"《IDOL SCHOOL CAMP》現在就來追完！",
        playlistSubtitle:"正是一次看完全集的好時機|8月14日擴展版公開 · 收錄所有精彩場面的擴展版僅限Muniverse App",
        scoreDesc:"原有宣言、按讚與分享積分已於8月7日23:59截止統計。|8月11日上午10點起，將加入迷因才藝秀決賽投票積分。|迷因才藝秀X按讚統計至8月10日上午11點59分。|積分榜每10分鐘更新一次。",
        scoreCtaTitle:"8月11日上午10點 迷因才藝秀決賽投票開始",
        scoreCtaBody:"用投票積分逆轉排名|把王者獎牌送給你最愛的隊伍|8月14日退營儀式活動開啟 · 敬請期待最後的故事"
      });
    }

    if (typeof TALENT_I18N !== "undefined") {
      Object.assign(TALENT_I18N.ko, {
        closedFinalNotice:"짤기자랑 예선 등록이 마감되었습니다.|X 좋아요는 8/10 오전 11시 59분까지|집계됩니다.||8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!"
      });
      Object.assign(TALENT_I18N.en, {
        closedFinalNotice:"Meme Talent Show preliminary submissions are closed.|X likes will be counted through Aug 10|at 11:59 AM KST.||From Aug 11 at 10:00 AM KST, join the final vote|in the Muniverse app!"
      });
      Object.assign(TALENT_I18N.ja, {
        closedFinalNotice:"ミーム芸能大会の予選登録は締め切りました。|Xのいいねは8/10 午前11時59分まで|集計されます。||8/11 午前10時からMuniverseアプリで|行われる決選投票にご参加ください！"
      });
      Object.assign(TALENT_I18N["zh-CN"], {
        closedFinalNotice:"表情包才艺大赛预赛登记已截止。|X点赞将统计至8月10日上午11点59分。||8月11日上午10点起，请在Muniverse应用|参与决赛投票！"
      });
      Object.assign(TALENT_I18N["zh-TW"], {
        closedFinalNotice:"迷因才藝大賽預賽登記已截止。|X按讚將統計至8月10日上午11點59分。||8月11日上午10點起，請在Muniverse應用程式|參與決賽投票！"
      });
    }

    var duplicateNotice = document.getElementById("scoreClosedNoticeForm");
    if (duplicateNotice) duplicateNotice.remove();

    var medalLabel = document.querySelector("#scoreCta .medal-kor");
    if (medalLabel) medalLabel.textContent = "왕메달";

    // 승인 시안의 비율·줄맞춤·자간을 직접 재현합니다.
    var style = document.createElement("style");
    style.id = "post-deadline-ui-fix";
    style.textContent = [
      "#scoreClosedNoticeBoard{margin:20px 0!important;padding:16px 18px!important;line-height:1.52!important;}",
      "#scoreClosedNoticeBoard + #board{margin-top:0!important;}",
      "#toast.toast-center.toast-alert{position:fixed!important;left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important;text-align:left!important;width:min(92vw,380px)!important;max-width:min(92vw,380px)!important;padding:22px 30px!important;line-height:1.55!important;transition:opacity .18s ease!important;will-change:opacity!important;}",
      "#toast.toast-center.toast-alert.show{left:50%!important;top:50%!important;right:auto!important;bottom:auto!important;transform:translate(-50%,-50%)!important;}",
      "#toast.toast-center.toast-alert:before{text-align:center!important;width:100%!important;margin:0 0 13px!important;}",

      ".score-desc{margin:10px 0 0!important;padding:18px 24px!important;background:#fff!important;border:2px solid rgba(18,77,50,.12)!important;border-radius:22px!important;box-shadow:0 2px 0 rgba(0,0,0,.03) inset!important;}",
      ".score-desc [data-i18n='scoreDesc']{display:flex!important;flex-direction:column!important;gap:0!important;}",
      ".score-desc .desktop-space,.score-desc .mo-br{display:none!important;}",
      ".score-desc .i18n-line{display:flex!important;align-items:flex-start!important;position:relative!important;padding:14px 0 14px 64px!important;margin:0!important;font-size:19px!important;line-height:1.35!important;font-weight:900!important;color:#0f2c25!important;word-break:keep-all!important;letter-spacing:-.35px!important;}",
      ".score-desc .i18n-line + .i18n-line{border-top:1px dashed rgba(33,88,58,.14)!important;}",
      ".score-desc .i18n-line:before{position:absolute!important;left:0!important;top:10px!important;width:42px!important;height:42px!important;display:grid!important;place-items:center!important;font-size:34px!important;line-height:1!important;color:#0d7a3f!important;font-weight:900!important;}",
      ".score-desc .line-1:before{content:'🗓';}",
      ".score-desc .line-2:before{content:'🕒';}",
      ".score-desc .line-3:before{content:'★';}",
      ".score-desc .line-4:before{content:'↻';}",

      "#scoreCta.score-cta{margin-top:18px!important;min-height:240px!important;padding:28px 310px 28px 34px!important;border-radius:28px!important;display:flex!important;align-items:center!important;overflow:hidden!important;border:3px solid rgba(7,63,37,.28)!important;box-shadow:0 8px 0 rgba(6,56,34,.18)!important;background:radial-gradient(circle at 82% 52%,rgba(255,233,100,.55) 0%,rgba(255,233,100,.12) 22%,rgba(255,233,100,0) 42%),linear-gradient(135deg,#0d6d3a 0%,#0b5c34 55%,#09492a 100%)!important;}",
      "#scoreCta.score-cta:before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(105deg,rgba(255,255,255,.06) 0 2px,transparent 2px 28px);pointer-events:none;}",
      "#scoreCta .score-cta-copy{position:relative;z-index:2;display:flex!important;flex-direction:column!important;gap:10px!important;}",
      "#scoreCta .score-cta-copy strong{display:block!important;font-size:58px!important;line-height:1.02!important;font-weight:950!important;letter-spacing:-1.4px!important;color:#ffe062!important;text-shadow:0 4px 0 rgba(0,0,0,.28),0 0 18px rgba(0,0,0,.08)!important;word-break:keep-all!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important;}",
      "#scoreCta .score-cta-copy>span{display:block!important;color:#fff!important;font-weight:900!important;line-height:1.18!important;overflow:visible!important;-webkit-line-clamp:unset!important;}",
      "#scoreCta .score-cta-copy>span .desktop-space,#scoreCta .score-cta-copy>span .mo-br{display:none!important;}",
      "#scoreCta .score-cta-copy>span .i18n-line{display:block!important;margin:0!important;word-break:keep-all!important;}",
      "#scoreCta .score-cta-copy>span .line-1{font-size:38px!important;color:#fff!important;text-shadow:0 3px 0 rgba(0,0,0,.22)!important;}",
      "#scoreCta .score-cta-copy>span .line-2{font-size:42px!important;color:#ffd84d!important;text-shadow:0 3px 0 rgba(0,0,0,.24)!important;}",
      "#scoreCta .score-cta-copy>span .line-3{margin-top:10px!important;padding-top:12px!important;border-top:2px solid rgba(255,223,108,.35)!important;font-size:22px!important;line-height:1.25!important;color:#ffe98b!important;}",
      "#scoreCta .score-cta-medal{right:28px!important;top:50%!important;transform:translateY(-50%)!important;width:232px!important;height:232px!important;z-index:2!important;}",
      "#scoreCta .medal-ribbon{display:block!important;top:-6px!important;width:108px!important;height:130px!important;}",
      "#scoreCta .medal-face{width:192px!important;height:192px!important;border:6px solid #ffe789!important;background:radial-gradient(circle at 35% 30%,#fff8cf 0%,#ffd84c 28%,#e3a400 72%,#b27b00 100%)!important;box-shadow:0 6px 0 rgba(89,60,0,.18),inset 0 -8px 0 rgba(128,84,0,.18),0 0 32px rgba(255,230,120,.36)!important;font-size:0!important;}",
      "#scoreCta .medal-kor{display:grid!important;place-items:center!important;width:100%!important;height:100%!important;font-size:42px!important;line-height:1!important;font-weight:950!important;color:#583500!important;text-shadow:0 1px 0 rgba(255,255,255,.5)!important;}",
      "#scoreCta .score-cta-spark.s1{display:block!important;right:10px!important;top:10px!important;font-size:28px!important;}",
      "#scoreCta .score-cta-spark.s2,#scoreCta .score-cta-flag{display:none!important;}",

      ".playlist-banner{padding:34px 34px!important;border-radius:36px!important;box-shadow:0 10px 24px rgba(84,70,32,.10)!important;background:linear-gradient(90deg,#fefbf3 0%,#fffdf7 100%)!important;}",
      ".playlist-banner-inner{grid-template-columns:320px minmax(0,1fr) 210px!important;gap:28px!important;align-items:center!important;}",
      ".playlist-banner-logo{width:290px!important;height:auto!important;}",
      ".playlist-banner-copy{display:flex!important;flex-direction:column!important;gap:20px!important;}",
      ".playlist-banner-title{font-size:98px!important;line-height:.95!important;font-weight:950!important;letter-spacing:-2.6px!important;color:#072e2b!important;text-shadow:0 4px 0 rgba(0,0,0,.06)!important;}",
      ".playlist-banner-subtitle{display:block!important;margin:0!important;}",
      ".playlist-banner-subtitle .desktop-space,.playlist-banner-subtitle .mo-br{display:none!important;}",
      ".playlist-banner-subtitle .i18n-line{display:block!important;position:relative!important;padding-left:58px!important;word-break:keep-all!important;}",
      ".playlist-banner-subtitle .line-1{font-size:42px!important;line-height:1.2!important;font-weight:900!important;color:#102c28!important;}",
      ".playlist-banner-subtitle .line-1:before{content:'☆';position:absolute;left:0;top:1px;font-size:42px;color:#0b7a3f;font-weight:900;}",
      ".playlist-banner-subtitle .line-2{margin-top:16px!important;padding-top:18px!important;border-top:2px solid rgba(93,119,59,.28)!important;font-size:30px!important;line-height:1.22!important;font-weight:900!important;color:#142926!important;}",
      ".playlist-banner-subtitle .line-2:before{content:'🗓';position:absolute;left:0;top:18px;font-size:38px;color:#0b7a3f;font-weight:900;}",
      ".playlist-banner-play{width:180px!important;height:180px!important;border-radius:38px!important;box-shadow:0 16px 28px rgba(255,80,80,.22)!important;}",

      "@media (max-width:1280px){",
      ".playlist-banner-inner{grid-template-columns:220px minmax(0,1fr) 140px!important;gap:20px!important;}",
      ".playlist-banner-logo{width:210px!important;}",
      ".playlist-banner-title{font-size:72px!important;}",
      ".playlist-banner-subtitle .line-1{font-size:30px!important;}",
      ".playlist-banner-subtitle .line-2{font-size:22px!important;}",
      ".playlist-banner-play{width:120px!important;height:120px!important;border-radius:28px!important;}",
      ".score-desc .i18n-line{font-size:16px!important;padding-left:54px!important;}",
      ".score-desc .i18n-line:before{width:36px!important;height:36px!important;font-size:28px!important;}",
      "#scoreCta.score-cta{min-height:190px!important;padding:22px 220px 22px 24px!important;}",
      "#scoreCta .score-cta-copy strong{font-size:42px!important;}",
      "#scoreCta .score-cta-copy>span .line-1{font-size:28px!important;}",
      "#scoreCta .score-cta-copy>span .line-2{font-size:31px!important;}",
      "#scoreCta .score-cta-copy>span .line-3{font-size:18px!important;}",
      "#scoreCta .score-cta-medal{width:170px!important;height:170px!important;}",
      "#scoreCta .medal-face{width:140px!important;height:140px!important;}",
      "#scoreCta .medal-kor{font-size:32px!important;}",
      "}",

      "@media (max-width:640px){",
      ".playlist-banner{padding:12px 14px!important;border-radius:22px!important;}",
      ".playlist-banner-inner{grid-template-columns:52px minmax(0,1fr) 50px!important;gap:10px!important;}",
      ".playlist-banner-logo{width:52px!important;height:40px!important;}",
      ".playlist-banner-copy{gap:4px!important;}",
      ".playlist-banner-title{font-size:16px!important;line-height:1.16!important;letter-spacing:-.4px!important;}",
      ".playlist-banner-subtitle .i18n-line{padding-left:0!important;}",
      ".playlist-banner-subtitle .i18n-line:before{display:none!important;content:none!important;}",
      ".playlist-banner-subtitle .line-1{font-size:11px!important;line-height:1.26!important;}",
      ".playlist-banner-subtitle .line-2{margin-top:4px!important;padding-top:4px!important;border-top:none!important;font-size:10px!important;line-height:1.26!important;}",
      ".playlist-banner-play{width:50px!important;height:36px!important;border-radius:12px!important;box-shadow:0 6px 14px rgba(255,80,80,.20)!important;}",
      ".score-desc{padding:8px 10px!important;border-radius:12px!important;}",
      ".score-desc .i18n-line{padding:8px 0 8px 24px!important;font-size:9.8px!important;line-height:1.3!important;letter-spacing:-.08px!important;}",
      ".score-desc .i18n-line:before{width:18px!important;height:18px!important;top:8px!important;font-size:14px!important;}",
      "#scoreCta.score-cta{min-height:96px!important;padding:10px 78px 10px 12px!important;border-radius:16px!important;}",
      "#scoreCta .score-cta-copy{gap:3px!important;}",
      "#scoreCta .score-cta-copy strong{font-size:14px!important;line-height:1.08!important;letter-spacing:-.35px!important;}",
      "#scoreCta .score-cta-copy>span .line-1{font-size:11px!important;}",
      "#scoreCta .score-cta-copy>span .line-2{font-size:12px!important;}",
      "#scoreCta .score-cta-copy>span .line-3{margin-top:4px!important;padding-top:5px!important;font-size:8.6px!important;line-height:1.2!important;}",
      "#scoreCta .score-cta-medal{right:8px!important;width:66px!important;height:66px!important;}",
      "#scoreCta .medal-ribbon{width:28px!important;height:36px!important;}",
      "#scoreCta .medal-face{width:56px!important;height:56px!important;border-width:2px!important;}",
      "#scoreCta .medal-kor{font-size:11px!important;}",
      "}",
      "@media (max-width:390px){#toast.toast-center.toast-alert{width:min(92vw,360px)!important;max-width:min(92vw,360px)!important;padding:20px 24px!important;}}",
      "@media (max-width:360px){#toast.toast-center.toast-alert{width:92vw!important;max-width:92vw!important;padding:20px 22px!important;font-size:13.5px!important;}}"
    ].join("\n");
    document.head.appendChild(style);

    if (typeof applyI18n === "function") applyI18n();
    if (typeof applyTalentI18n === "function" && typeof talentInited !== "undefined" && talentInited) applyTalentI18n();
  } catch (e) {
    console.warn("Post-deadline copy/UI override failed", e);
  }
});
