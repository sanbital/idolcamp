#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""베타 빌드(beta-exit-8b41d9e7a5/app.html)로부터 공개용 exit/index.html 을 생성한다.
   두 파일이 따로 수정되며 어긋나는 일을 막기 위해, 공개판은 항상 이 스크립트로 만든다.

     python3 deploy/publish-exit.py
"""
import pathlib, re, shutil, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "beta-exit-8b41d9e7a5" / "app.html"
DST = ROOT / "exit" / "index.html"
SIDECARS = ["terminology-v5.js", "perfect-hq.js", "camp-top.js"]

s = SRC.read_text(encoding="utf-8")

# 1) 베타 접근 제한 제거
gate = """/* ---- PRIVATE BETA access control (do not remove) ---- */
const BETA_KEY='V8f2Qm7L4xP9cN6w';
if(new URLSearchParams(location.search).get('key')!==BETA_KEY){document.getElementById('denied').style.display='flex';return;}
document.getElementById('app').style.display='block';"""
if gate in s:
    s = s.replace(gate, "document.getElementById('app').style.display='block';")
s = s.replace('<div id="denied" class="denied" style="display:none">404</div>\n', "")

# 2) 공개 페이지용 메타
s = s.replace("<title>아이돌 수련회 1기 퇴소식 · PRIVATE BETA</title>",
              "<title>아이돌 수련회 1기 퇴소식 · Muniverse</title>")
s = s.replace('<meta name="robots" content="noindex,nofollow,noarchive,nosnippet">',
              '<meta name="robots" content="index,follow">')

# 3) CSS 구조 검사 — 중괄호가 맞지 않으면 배포하지 않는다
main = max(re.findall(r"<style[^>]*>(.*?)</style>", s, re.S), key=len)
if main.count("{") != main.count("}"):
    sys.exit("CSS 중괄호 불균형: %+d — 배포 중단" % (main.count("{") - main.count("}")))

DST.write_text(s, encoding="utf-8")
for name in SIDECARS:
    src = SRC.parent / name
    if src.exists():
        shutil.copyfile(src, DST.parent / name)

print("exit/index.html 생성 완료 (%d bytes)" % DST.stat().st_size)
print("함께 복사:", ", ".join(SIDECARS))
