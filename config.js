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
    requiredHashtags: ["#아이돌수련회", "#짤장기자랑"]
  }
};
