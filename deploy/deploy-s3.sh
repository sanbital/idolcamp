#!/usr/bin/env bash
# 아이돌 수련회 정적 사이트 배포 (S3 + 선택적 CloudFront 무효화)
#
#   BUCKET=<버킷명> [DISTRIBUTION_ID=<CF 배포ID>] bash deploy/deploy-s3.sh
#
# 리포 루트에서 실행하세요. 버킷 루트가 사이트 루트입니다.
set -euo pipefail
cd "$(dirname "$0")/.."

: "${BUCKET:?BUCKET=<버킷명> 을 지정하세요}"
S3="s3://${BUCKET}"
HTML='text/html; charset=utf-8'
JS='application/javascript; charset=utf-8'
NOCACHE='public, max-age=60'
LONG='public, max-age=604800'

say(){ printf '\n\033[1m%s\033[0m\n' "$*"; }

say "1/5  퇴소식 · 수료키트 페이지"
aws s3 cp exit/index.html          "$S3/exit/index.html"          --content-type "$HTML" --cache-control "$NOCACHE"
for f in exit/*.js; do
  aws s3 cp "$f" "$S3/exit/$(basename "$f")" --content-type "$JS" --cache-control "$NOCACHE"
done

say "2/5  캠프 본 페이지 · 설정"
aws s3 cp index.html "$S3/index.html" --content-type "$HTML" --cache-control "$NOCACHE"
aws s3 cp config.js  "$S3/config.js"  --content-type "$JS"   --cache-control "$NOCACHE"

say "3/5  사진첩 앵글 점검 도구 (비공개 · 키 필요)"
aws s3 cp beta-exit-8b41d9e7a5/album-tune.html "$S3/beta-exit-8b41d9e7a5/album-tune.html" \
  --content-type "$HTML" --cache-control "$NOCACHE"

say "4/5  이미지"
aws s3 sync assets/kit/opt/ "$S3/assets/kit/opt/" --content-type "image/webp" --cache-control "$LONG" --delete
aws s3 cp assets/camp-logo.png "$S3/assets/camp-logo.png" --content-type "image/png" --cache-control "$LONG"

if [ -n "${DISTRIBUTION_ID:-}" ]; then
  say "5/5  CloudFront 무효화"
  aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" \
    --paths '/index.html' '/config.js' '/exit/*' '/assets/kit/opt/*' \
            '/beta-exit-8b41d9e7a5/album-tune.html' >/dev/null
  echo "무효화 요청 완료"
else
  say "5/5  CloudFront 무효화 건너뜀 (DISTRIBUTION_ID 미지정)"
fi

say "확인용 주소"
cat <<URLS
  퇴소식        https://${BUCKET}/exit/index.html
  수료키트      https://${BUCKET}/exit/index.html?tab=kit
  사진첩 점검   https://${BUCKET}/beta-exit-8b41d9e7a5/album-tune.html?key=V8f2Qm7L4xP9cN6w
  오픈 미리보기  https://${BUCKET}/?open=preview
URLS
