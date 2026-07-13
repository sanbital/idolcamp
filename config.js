window.MUNIVERSE_CONFIG = {
  supabaseUrl: "https://kkaoerbblpuszptiibvo.supabase.co",
  supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrYW9lcmJibHB1c3pwdGlpYnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NDY5MTMsImV4cCI6MjA5ODEyMjkxM30.Xf549NzokL9zY7AT8Jd5NYFRj81r7z2hS6i7kZbpCMw",
  shareUrl: "https://sanbital.github.io/idolcamp/",
  gisu: 1, maxShown: 1000,

  // DB 부하 보호 설정
  // 점수판은 Postgres REST를 직접 조회하지 않고 Storage/CDN 캐시 JSON만 읽습니다.
  scoreboardCacheUrl: "https://kkaoerbblpuszptiibvo.supabase.co/storage/v1/object/public/idolcamp-cache/scoreboard.json",
  scoreboardRefreshMs: 600000, // 열린 화면에서도 최대 10분에 1회, 숨김 탭은 조회하지 않음
  boardCacheMs: 60000,         // 게시판 TOP/페이지 조회 결과 1분 메모리 캐시
  memberPhotoCacheMs: 21600000, // 멤버 사진 메타데이터 6시간 브라우저 캐시
  enableVisitorTracking: false, // 방문자 통계는 DB 대신 Cloudflare Web Analytics/GA4 사용
  allowDemoBoardFallback: false,

  // 입소번호·좋아요는 공개 DB/RPC가 아니라 rate limit이 적용된 Edge Function만 사용합니다.
  idolcampApiUrl: "https://kkaoerbblpuszptiibvo.supabase.co/functions/v1/idolcamp-api",

  // ▼▼▼ Cloudflare Turnstile "Site Key"(공개키)로 교체하세요. (Secret Key 는 여기 넣지 마세요!)
  turnstileSiteKey: "0x4AAAAAAD0Ey7nrVqGnKma-"
  // ▲▲▲ 비워두면("") 캡차 없이 동작하지만, 그러면 Edge Function 검증이 실패해 다짐 등록이 막힙니다.
};
