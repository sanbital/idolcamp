# 배포 대상 (버킷 루트 = 사이트 루트)

| 키 | 파일 | 내용 |
|---|---|---|
| `exit/index.html` | `exit/index.html` | 퇴소식 + 수료키트 페이지 |
| `exit/terminology-v5.js` | 〃 | 용어 치환 |
| `exit/perfect-hq.js` | 〃 | 만점 수료증 고해상도 |
| `exit/camp-top.js` | 〃 | 상단 고정 영역(배너 3종 + 점수판) |
| `index.html` | `index.html` | 캠프 본 페이지 |
| `config.js` | `config.js` | 오픈 게이트 · 아이보리 전환 · 탭 아이콘 · 대표주소 이동 |
| `assets/kit/opt/*.webp` | 14개 | 수료키트 이미지 |
| `assets/camp-logo.png` | 1개 | 로고 |
| `beta-exit-8b41d9e7a5/album-tune.html` | 〃 | 사진첩 앵글 점검 도구 (비공개 · 키 필요 · noindex) |

`assets/kit/*.png`(원본 1~9)은 사이트에서 참조하지 않으므로 올리지 않아도 됩니다.
`beta-exit-8b41d9e7a5/` 중에서는 `album-tune.html` 한 장만 올립니다. 나머지 베타 빌드는 올리지 않습니다.

## 오픈 동작
- 해제 시각: `camp_exit_settings.release_at` = **2026-08-14 18:00 KST** (확인 완료)
- 그 시각에 퇴소식·수료 키트 메뉴 해제, 배경 아이보리 전환, 탭 아이콘 적용, 대표주소 접속 시 퇴소식으로 이동
- 미리보기: 주소 뒤에 `?open=preview`

## 공개판 생성
`exit/index.html` 은 직접 수정하지 말고 베타 빌드에서 생성합니다.

    python3 deploy/publish-exit.py

베타 접근 제한 제거 · 제목/robots 교체 · 사이드카 JS 복사까지 한 번에 처리하고,
CSS 중괄호가 맞지 않으면 배포를 중단합니다.
