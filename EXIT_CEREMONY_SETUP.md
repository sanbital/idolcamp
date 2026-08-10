# 아이돌 수련회 온라인 퇴소식 — Beta Setup

## Release
- Production release: **2026-08-14 18:00 KST**
- The production quiz rows are protected by Supabase RLS until the release time.
- The existing `퇴소식` tab must remain locked until the server-side `camp_exit_release_state()` RPC returns `released=true`.

## Quiz images
Upload 26 scene images to the public Supabase Storage bucket `idolcamp-exit`.

```text
quiz/01.webp
quiz/02.webp
...
quiz/26.webp
```

The number is the stable join key between Storage and the Google Sheet.

## Google Sheet columns
Recommended columns:

```text
photo_no | answer | question_ko | question_en | question_ja | question_zh_cn | question_zh_tw | source_type | source_ref | active
```

- `photo_no`: 1–26
- `answer`: YES or NO
- `active`: TRUE only after the row has been checked
- translations may temporarily fall back to Korean during beta

## Member mapping
`camp_exit_quiz.member_id` is already mapped for rows 01–24 to the 24 idol members. Rows 25–26 are reserved as `mc_01` and `mc_02`.

## Result photos
The 24 idol result photos reuse `idolcamp-members` + `camp_member_photos`.
Add two MC profile photos and `camp_member_photos` rows for `mc_01`, `mc_02` before release.

## Perfect certificate image
Only 26/26 uses the full group photo:

```text
idolcamp-exit/certificate/group_26.webp
```

All other scores use the Idol School Camp logo in the certificate header.

## Final result order
1. 온라인 퇴소증
2. 추억의 사진첩 (correct members only)
3. `수련회 수료키트 구경가기!` CTA

## Production module
`exit-ceremony.js` contains the production release gate and the complete YES/NO → friend list → certificate → album flow. It must only be loaded by the production page after beta approval; do not merge this branch into `main` before approval.
