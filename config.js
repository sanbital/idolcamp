window.MUNIVERSE_CONFIG = {
  supabaseUrl: "https://kkaoerbblpuszptiibvo.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInJlZiI6ImtrYW9lcmJibHB1c3pwdGlpYnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDY5MTMsImV4cCI6MjA5ODEyMjkxM30.Xf549NzokL9zY7AT8Jd5NYFRj81r7z2hS6i7kZbpCMw",
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
    previewBeforeStart: false,   // 오픈 전 탭 잠금(서버 상태가 최종 판단)
    testRegistrationOpen: false, // 운영: 서버 시간·설정으로만 개방
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

// 8/7 예선 등록·입소 신고 점수 마감 이후 안내 문구.
// index.html의 i18n 객체가 생성된 뒤 덮어써서 운영 문구를 한곳에서 관리합니다.
window.addEventListener("DOMContentLoaded", function(){
  try {
    if (typeof I18N !== "undefined") {
      Object.assign(I18N.ko, {
        scoreClosedNotice:"아이돌 수련회 입소 신고 이벤트가 종료되어|신고증 발급과 좋아요는 더 이상|점수에 반영되지 않습니다.|입소 신고는 자유롭게 신청하고|응원 메시지도 남길 수 있습니다.|8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!"
      });
      Object.assign(I18N.en, {
        scoreClosedNotice:"The Idol Training Camp check-in event has ended.|Enrollment pass issuance and likes no longer|count toward team scores.|You can still submit a check-in form|and leave a cheer message.|From Aug 11 at 10:00 AM KST, join the final vote|in the Muniverse app!"
      });
      Object.assign(I18N.ja, {
        scoreClosedNotice:"アイドル修練会の入所申告イベントは終了しました。|入所証の発行といいねは今後|チーム点数に反映されません。|入所申告は引き続き自由に申請でき、|応援メッセージも残せます。|8/11 午前10時からMuniverseアプリで|行われる決選投票にご参加ください！"
      });
      Object.assign(I18N["zh-CN"], {
        scoreClosedNotice:"偶像修炼会入营申报活动已结束。|入营证领取和点赞将不再|计入应援队分数。|入营申报仍可自由提交，|也可以继续留下应援留言。|8月11日上午10点起，请在Muniverse应用|参与决赛投票！"
      });
      Object.assign(I18N["zh-TW"], {
        scoreClosedNotice:"偶像修煉會入營申報活動已結束。|領取入營證與按讚將不再|計入應援隊分數。|入營申報仍可自由提交，|也可以繼續留下應援留言。|8月11日上午10點起，請在Muniverse應用程式|參與決賽投票！"
      });
    }

    if (typeof TALENT_I18N !== "undefined") {
      Object.assign(TALENT_I18N.ko, {
        closedFinalNotice:"짤기자랑 예선 등록이 마감되었습니다.|X 좋아요는 8/10 오전 11시 59분까지|집계됩니다.|8/11 오전 10시부터 Muniverse 앱에서|진행되는 결선 투표에 참여해 주세요!"
      });
      Object.assign(TALENT_I18N.en, {
        closedFinalNotice:"Meme Talent Show preliminary submissions are closed.|X likes will be counted through Aug 10|at 11:59 AM KST.|From Aug 11 at 10:00 AM KST, join the final vote|in the Muniverse app!"
      });
      Object.assign(TALENT_I18N.ja, {
        closedFinalNotice:"ミーム芸能大会の予選登録は締め切りました。|Xのいいねは8/10 午前11時59分まで|集計されます。|8/11 午前10時からMuniverseアプリで|行われる決選投票にご参加ください！"
      });
      Object.assign(TALENT_I18N["zh-CN"], {
        closedFinalNotice:"表情包才艺大赛预赛登记已截止。|X点赞将统计至8月10日上午11点59分。|8月11日上午10点起，请在Muniverse应用|参与决赛投票！"
      });
      Object.assign(TALENT_I18N["zh-TW"], {
        closedFinalNotice:"迷因才藝大賽預賽登記已截止。|X按讚將統計至8月10日上午11點59分。|8月11日上午10點起，請在Muniverse應用程式|參與決賽投票！"
      });
    }

    if (typeof applyI18n === "function") applyI18n();
    if (typeof applyTalentI18n === "function" && typeof talentInited !== "undefined" && talentInited) applyTalentI18n();
  } catch (e) {
    console.warn("Post-deadline copy override failed", e);
  }
});
