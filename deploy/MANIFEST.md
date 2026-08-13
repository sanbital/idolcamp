# 배포 대상 (버킷 루트 = 사이트 루트)

| 키 | 파일 | 내용 |
|---|---|---|
| `exit/index.html` | `exit/index.html` | 퇴소식 + 수료키트 페이지 |
| `exit/terminology-v5.js` | 〃 | 용어 치환 |
| `exit/perfect-hq.js` | 〃 | 만점 수료증 고해상도 |
| `index.html` | `index.html` | 캠프 본 페이지 |
| `config.js` | `config.js` | 오픈 게이트 · 아이보리 전환 · 탭 아이콘 · 대표주소 이동 |
| `assets/kit/opt/*.webp` | 14개 | 수료키트 이미지 |
| `assets/camp-logo.png` | 1개 | 로고 |

`assets/kit/*.png`(원본 1~9)과 `beta-exit-8b41d9e7a5/`는 사이트에서 참조하지 않으므로 올리지 않아도 됩니다.

## 오픈 동작
- 해제 시각: `camp_exit_settings.release_at` = **2026-08-14 18:00 KST** (확인 완료)
- 그 시각에 퇴소식·수료 키트 메뉴 해제, 배경 아이보리 전환, 탭 아이콘 적용, 대표주소 접속 시 퇴소식으로 이동
- 미리보기: 주소 뒤에 `?open=preview`
