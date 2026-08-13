#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""exit/camp-top.js 를 생성한다.

  · deploy/camp-top.css            index.html 에서 뽑아낸 배너·점수판 스타일
  · deploy/camp-top-snapshots.json 언어별로 렌더된 배너·점수판 마크업
  · deploy/camp-top.tpl.js         동작(점수 로딩·렌더·언어 전환) 템플릿

본 페이지의 배너/점수판 디자인이 바뀌면 위 두 파일을 다시 뽑고 이 스크립트를 돌린다.

    python3 deploy/build-camp-top.py
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
D = ROOT / "deploy"

STR = json.loads((D / "camp-top-strings.json").read_text(encoding="utf-8"))
TEAMS = json.loads((D / "camp-top-teams.json").read_text(encoding="utf-8"))
css = ":root{--yellow:#F2C230;--mint-2:#6EE7A8;--paper:#FBF6E9}\n" + (D / "camp-top.css").read_text(encoding="utf-8")
snaps = json.loads((D / "camp-top-snapshots.json").read_text(encoding="utf-8"))
tpl = (D / "camp-top.tpl.js").read_text(encoding="utf-8")

js = (tpl.replace("__CSS__", json.dumps(css, ensure_ascii=False))
         .replace("__SNAP__", json.dumps(snaps, ensure_ascii=False))
         .replace("__STR__", json.dumps(STR, ensure_ascii=False))
         .replace("__TEAMS__", json.dumps(TEAMS, ensure_ascii=False)))

for p in [ROOT / "exit" / "camp-top.js", ROOT / "beta-exit-8b41d9e7a5" / "camp-top.js"]:
    p.write_text(js, encoding="utf-8")
print("camp-top.js 생성 완료 (%d bytes)" % len(js))
