# -*- coding: utf-8 -*-
import random, base64

LOGO = "data:image/png;base64," + open('/tmp/claude-0/-home-user-idolcamp/97c3bb07-6953-53a0-923a-f966643f234f/scratchpad/logo.b64').read()

# ---------- generated star fields ----------
random.seed(7)
def stars_galaxy():
    out=[]
    for i in range(120):
        x=round(random.uniform(0,500),1); y=round(random.uniform(0,215),1)
        # denser near the milky way band
        band=abs((y-108)-(x-250)*-0.20)
        r=round(random.choice([.7,.8,1.0,1.1,1.3,1.6]),1)
        o=round(random.uniform(.28,.95),2)
        if band<48: o=min(.98,o+.22)
        elif random.random()<.42: continue
        out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#FFF7DE" opacity="{o}"/>')
    return "".join(out)

def sparkles(pts):
    return "".join(f'<use href="#lstar" x="{x}" y="{y}" width="{s}" height="{s}"/>' for x,y,s in pts)

def trails():
    out=[]
    cx,cy=250,-250
    for i,r in enumerate(range(300,570,26)):
        a0=-36 - i*1.1; a1=-144 + i*1.0
        import math
        x0=cx+r*math.cos(math.radians(a0)); y0=cy-r*math.sin(math.radians(a0))
        x1=cx+r*math.cos(math.radians(a1)); y1=cy-r*math.sin(math.radians(a1))
        o=round(.20+ (i%3)*.10,2)
        w=round(.9+(i%2)*.5,1)
        out.append(f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 0 1 {x1:.1f} {y1:.1f}" fill="none" stroke="#FFF3C8" stroke-width="{w}" opacity="{o}" stroke-linecap="round"/>')
    return "".join(out)

def fireflies(pts):
    out=[]
    for x,y,r in pts:
        out.append(f'<circle cx="{x}" cy="{y}" r="{r*4.6:.1f}" fill="url(#ffGlow)"/><circle cx="{x}" cy="{y}" r="{r}" fill="#FFF0A8"/>')
    return "".join(out)

def pine_row(y, count, w, color, jitter=0):
    random.seed(3+count)
    out=[]
    for i in range(count):
        x=i*(500/count)+random.uniform(-6,6)
        h=w*1.7+random.uniform(-6,10)
        out.append(f'<path d="M{x:.0f} {y-h:.0f} L{x+w/2:.0f} {y:.0f} L{x-w/2:.0f} {y:.0f} Z" fill="{color}"/>')
    return "".join(out)

SCENE_GALAXY = f'''
<symbol id="scene-galaxy" viewBox="0 0 500 420">
  <rect width="500" height="420" fill="url(#skyDeep)"/>
  <g transform="rotate(-13 250 112)"><ellipse cx="250" cy="112" rx="300" ry="54" fill="url(#mw)"/></g>
  <g transform="rotate(-13 250 112)"><ellipse cx="250" cy="112" rx="250" ry="26" fill="url(#mw)" opacity=".7"/></g>
  {stars_galaxy()}
  {sparkles([(64,44,15),(196,26,11),(146,120,10),(300,58,9)])}
  <g opacity=".9"><path d="M92 62 L150 34" stroke="url(#shoot)" stroke-width="2.4" stroke-linecap="round"/><circle cx="151" cy="33" r="2.6" fill="#FFF8DC"/></g>
  <circle cx="400" cy="64" r="76" fill="url(#moonGlow)"/>
  <circle cx="400" cy="64" r="27" fill="#FFF6D8"/>
  <circle cx="411" cy="54" r="25" fill="#0A2036"/>
  <path d="M0 214 L58 176 L104 200 L162 160 L226 206 L286 172 L344 208 L404 178 L462 210 L500 192 L500 268 L0 268 Z" fill="#16344C" opacity=".95"/>
  <path d="M0 236 L54 212 L112 238 L168 208 L238 246 L296 218 L362 250 L430 220 L500 248 L500 300 L0 300 Z" fill="#102A3E"/>
  {pine_row(258, 16, 26, '#0C2233')}
  <rect x="0" y="258" width="500" height="56" fill="url(#lake)"/>
  <g fill="#FFF3C4">
    <ellipse cx="400" cy="266" rx="19" ry="2.4" opacity=".5"/><ellipse cx="400" cy="274" rx="13" ry="1.8" opacity=".42"/>
    <ellipse cx="400" cy="282" rx="22" ry="1.7" opacity=".34"/><ellipse cx="400" cy="290" rx="10" ry="1.3" opacity=".26"/>
    <ellipse cx="400" cy="298" rx="16" ry="1.2" opacity=".2"/>
  </g>
  <g fill="#8FB9C9" opacity=".22"><ellipse cx="120" cy="278" rx="46" ry="1.4"/><ellipse cx="228" cy="294" rx="34" ry="1.2"/><ellipse cx="66" cy="300" rx="28" ry="1.1"/></g>
  <path d="M0 312 Q250 298 500 312 L500 420 L0 420 Z" fill="#17452E"/>
  <path d="M0 312 Q250 298 500 312" fill="none" stroke="#0B2018" stroke-width="2.6" opacity=".45"/>
  <path d="M-6 318 Q250 366 506 314" fill="none" stroke="#C9B98E" stroke-width="2" opacity=".85"/>
  <use href="#lbulb" x="46" y="330" width="17" height="24"/><use href="#lbulb" x="122" y="346" width="17" height="24"/>
  <use href="#lbulb" x="200" y="354" width="17" height="24"/><use href="#lbulb" x="286" y="354" width="17" height="24"/>
  <use href="#lbulb" x="364" y="346" width="17" height="24"/><use href="#lbulb" x="440" y="328" width="17" height="24"/>
  <use href="#lpine" x="6" y="256" width="54" height="90"/><use href="#lpine" x="442" y="250" width="56" height="94"/>
  <g opacity=".92"><use href="#ltent2" x="36" y="296" width="86" height="66"/></g>
  <ellipse cx="152" cy="366" rx="62" ry="14" fill="#0B2018" opacity=".28"/>
  <use href="#ltent" x="96" y="284" width="118" height="92"/>
  <ellipse cx="352" cy="352" rx="118" ry="56" fill="url(#fireGlow)"/>
  <g fill="#0A1C14" opacity=".92">
    <g transform="translate(292 346)"><circle cx="0" cy="-16" r="9"/><path d="M-13 6 q13 -22 26 0 z"/><path d="M-13 6 h26 v5 h-26 z"/></g>
    <g transform="translate(414 344)"><circle cx="0" cy="-16" r="9"/><path d="M-13 6 q13 -22 26 0 z"/><path d="M-13 6 h26 v5 h-26 z"/></g>
    <g transform="translate(352 372)"><circle cx="0" cy="-18" r="10"/><path d="M-15 6 q15 -24 30 0 z"/></g>
  </g>
  <g transform="translate(352 342) scale(.78)" stroke="#0C2018" stroke-width="3.4" stroke-linejoin="round">
    <ellipse cx="-42" cy="30" rx="12" ry="7" fill="#4E5C52"/><ellipse cx="-14" cy="36" rx="12" ry="7" fill="#5E6C62"/>
    <ellipse cx="16" cy="36" rx="12" ry="7" fill="#4E5C52"/><ellipse cx="43" cy="29" rx="12" ry="7" fill="#5E6C62"/>
    <rect x="-46" y="18" width="92" height="13" rx="6.5" fill="#8A5A2E" transform="rotate(12)"/>
    <rect x="-46" y="18" width="92" height="13" rx="6.5" fill="#A06B36" transform="rotate(-12)"/>
  </g>
  <g transform="translate(352 342) scale(.78)">
    <path d="M0 22 C-38 2 -25 -24 -7 -46 C-8 -18 5 -11 9 -33 C33 -6 36 8 0 22Z" fill="#E8792B" stroke="#0C2018" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M0 18 C-19 8 -13 -7 -2 -21 C1 -3 9 1 11 -9 C23 5 16 13 0 18Z" fill="#F2C230"/>
    <path d="M0 15 C-7 10 -5 1 -1 -8 C1 2 5 4 5 -1 C10 5 7 11 0 15Z" fill="#FFF3C4"/>
  </g>
  <g fill="#FFD98A"><circle cx="340" cy="300" r="2" opacity=".85"/><circle cx="366" cy="286" r="1.6" opacity=".7"/><circle cx="352" cy="268" r="1.3" opacity=".55"/><circle cx="376" cy="312" r="1.5" opacity=".6"/></g>
  {fireflies([(96,352,2.0),(214,330,1.7),(250,382,2.2),(456,356,1.8),(160,398,1.6),(288,318,1.5)])}
  <path d="M0 396 q30 -16 58 -2 q26 -18 54 -2 q30 -16 60 0 q28 -18 58 -2 q30 -14 58 0 q28 -16 56 -2 q30 -14 60 2 L500 420 L0 420 Z" fill="#0D2F1F"/>
</symbol>'''

MEMBERS = ["차웅기","켄신","남지운","이청명","장여준","김희주","김성준","전민욱","송승호","강우진",
 "박주원","붐","최립우","서경배","스티븐","박한","다이스케","마징시앙","조나단","김도훈",
 "박누리","서정우","즈언","제이엘","김성민","장슈아이보"]
MISSED = {4, 9, 13, 18, 21, 24, 25}   # 0-based, 19 / 26 sample

def namesize(n):
    return {1:15,2:14.5,3:13,4:11,5:9.4,6:8.2}.get(len(n), 8)

def stampcell(i, on):
    name = MEMBERS[i]; fs = namesize(name)
    if on:
        return ('<i class="on"><svg viewBox="0 0 64 64" aria-hidden="true">'
                '<circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="2.6"/>'
                '<circle cx="32" cy="32" r="25.4" fill="none" stroke="currentColor" stroke-width=".9"/>'
                '<path d="M32 10.5 l2.5 5.2 5.7 .8 -4.1 4 1 5.6 -5.1 -2.7 -5.1 2.7 1 -5.6 -4.1 -4 5.7 -.8 z" fill="currentColor"/>'
                f'<text x="32" y="39.5" text-anchor="middle" font-size="{fs}" font-weight="900" fill="currentColor">{name}</text>'
                '<text x="32" y="49.5" text-anchor="middle" font-size="6.6" font-weight="800" letter-spacing=".15" fill="currentColor">참 잘했어요</text>'
                '</svg></i>')
    return ('<i><svg viewBox="0 0 64 64" aria-hidden="true">'
            '<circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="4 4"/>'
            f'<text x="32" y="36" text-anchor="middle" font-size="{fs}" font-weight="800" fill="currentColor">{name}</text>'
            f'<text x="32" y="47" text-anchor="middle" font-size="7" font-weight="700" letter-spacing=".3" fill="currentColor">SCENE {i+1:02d}</text>'
            '</svg></i>')

def stampgrid(count=None, missed=None):
    missed = set() if missed is None else missed
    return "".join(stampcell(i, i not in missed) for i in range(26))

def polaroids(idx):
    out=[]
    for i in idx:
        out.append(f'<figure class="pol"><span class="pph"></span><figcaption><b>{MEMBERS[i]}</b><em>SCENE {i+1:02d}</em></figcaption></figure>')
    return "".join(out)

HTML = f'''<title>퇴소식 시안 v8</title>
<style>
:root{{
  --night-0:#050F16; --cream:#FFF5DE; --kraft:#F3E7CA;
  --gold:#E9BB43; --gold-2:#F6DC90; --gold-deep:#A67C1D;
  --wax:#B4453A; --stamp:#C2453A;
  --ink:#0E211A; --mute:#8FA39B;
  --ko:"Pretendard","Apple SD Gothic Neo","Noto Sans KR","Malgun Gothic",system-ui,sans-serif;
  --lat:ui-serif,"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
  --mono:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--night-0);color:var(--cream);font-family:var(--ko);line-height:1.6;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(circle at 50% -6%,rgba(233,187,67,.10),transparent 44%),
    radial-gradient(circle at 12% 8%,rgba(255,243,196,.26) 0 1px,transparent 1.5px),
    radial-gradient(circle at 84% 15%,rgba(255,243,196,.18) 0 .9px,transparent 1.4px);
  background-size:auto,300px 340px,390px 430px}}
.sheet{{max-width:1180px;margin:0 auto;padding:0 20px 96px}}

.head{{padding:56px 0 32px;border-bottom:1px solid rgba(233,187,67,.22)}}
.kicker{{display:inline-flex;align-items:center;gap:9px;font-family:var(--lat);font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:var(--gold)}}
.kicker:before{{content:"";width:26px;height:1px;background:var(--gold)}}
.head h1{{margin:16px 0 0;font-size:clamp(29px,5.2vw,44px);line-height:1.18;font-weight:900;letter-spacing:-.035em;text-wrap:balance}}
.head p{{margin:14px 0 0;max-width:58ch;color:#CFE0D6;font-size:15px;word-break:keep-all}}
.chips{{margin-top:22px;display:flex;flex-wrap:wrap;gap:8px}}
.chip{{padding:6px 13px;border-radius:999px;border:1px solid rgba(233,187,67,.4);background:rgba(233,187,67,.08);font-size:12.5px;font-weight:700;color:#F1DFA8}}

.sec{{padding:58px 0 0}}
.sec-head{{display:flex;flex-wrap:wrap;align-items:baseline;gap:14px;padding-bottom:6px}}
.sec-head h2{{margin:0;font-size:clamp(22px,3.3vw,29px);font-weight:900;letter-spacing:-.03em}}
.sec-head .note{{color:var(--mute);font-size:13.5px;word-break:keep-all}}
.rail{{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:32px;margin-top:26px;align-items:start}}
.opt{{display:flex;flex-direction:column;gap:15px}}
.opt-tag{{display:flex;align-items:center;gap:10px}}
.opt-tag b{{display:grid;place-items:center;min-width:26px;height:26px;padding:0 8px;border-radius:999px;background:var(--gold);color:#3B2A05;font-family:var(--lat);font-size:12.5px;font-weight:700}}
.opt-tag span{{font-size:15px;font-weight:800;letter-spacing:-.02em}}
.why{{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:7px}}
.why li{{position:relative;padding-left:15px;color:#C3D5CB;font-size:13.4px;line-height:1.65;word-break:keep-all}}
.why li:before{{content:"";position:absolute;left:0;top:9px;width:5px;height:5px;border-radius:50%;background:var(--gold-deep)}}
.phone{{width:100%;max-width:376px;padding:9px;border-radius:26px;background:#16241E;border:1px solid rgba(255,255,255,.10);box-shadow:0 22px 48px rgba(0,0,0,.55)}}
.phone-in{{border-radius:18px;overflow:hidden;background:#0B1D14}}

/* ---------- banner (minimal poster) ---------- */
.bnr{{position:relative;aspect-ratio:5/7.5;overflow:hidden;background:linear-gradient(180deg,#17452E 0 52%,#123722 66%,#08210F 84%,#06170C 100%)}}
.scene{{position:absolute;top:0;left:0;display:block;width:100%;height:auto}}
.scrim{{position:absolute;inset:0;background:linear-gradient(180deg,transparent 0 36%,rgba(5,20,12,.34) 47%,rgba(5,20,12,.86) 58%,#05140C 68%)}}
.in{{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:0 20px 20px}}
.bnrLogo{{position:absolute;top:16px;left:50%;transform:translateX(-50%);width:132px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5))}}
.rule{{display:flex;align-items:center;gap:10px;font-family:var(--lat);font-size:9.5px;letter-spacing:.26em;color:var(--gold)}}
.rule:after{{content:"";flex:1;height:1px;background:linear-gradient(90deg,rgba(233,187,67,.7),transparent)}}
.t1{{margin:12px 0 0;font-size:13.5px;font-weight:700;color:#CFE0D6}}
.t2{{margin:3px 0 0;font-size:34px;font-weight:900;letter-spacing:-.055em;line-height:1.04;color:#FFF7E4}}
.t2 b{{display:block;font-size:20px;font-weight:800;letter-spacing:-.03em;color:var(--gold)}}
.lead{{margin:12px 0 0;font-size:12px;line-height:1.7;color:#B9CCC1;word-break:keep-all}}
.cta{{display:block;width:100%;margin-top:15px;padding:15px 10px;border:1.5px solid var(--gold);border-radius:14px;background:transparent;
  color:var(--gold-2);font-family:var(--ko);font-size:16px;font-weight:900;cursor:default}}
.meta{{display:flex;justify-content:space-between;margin-top:9px;font-family:var(--lat);font-size:9px;letter-spacing:.18em;color:rgba(255,244,220,.45)}}

/* ---------- certificate shared ---------- */
.certpad{{padding:15px;background:#0C2418}}
.certLogo{{display:block;width:118px;margin:0 auto}}
.eyeb{{display:block;font-family:var(--lat);font-size:9.5px;letter-spacing:.28em}}
.stampgrid{{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:12px}}
.stampgrid i{{position:relative;aspect-ratio:1;display:block;font-style:normal}}
.stampgrid i svg{{width:100%;height:100%}}
.stampgrid i.on:nth-child(4n+1){{transform:rotate(-6deg)}}
.stampgrid i.on:nth-child(4n+2){{transform:rotate(4deg)}}
.stampgrid i.on:nth-child(4n+3){{transform:rotate(-3deg)}}
.stampgrid i.on:nth-child(4n){{transform:rotate(6deg)}}


.stampgrid i.on{{opacity:.94}}
.stampgrid i.on:nth-child(4n){{opacity:.86}}
.gridLabel{{display:flex;align-items:baseline;justify-content:space-between;margin-top:16px}}
.gridLabel span{{font-size:11.5px;font-weight:700}}
.gridLabel b{{font-size:20px;font-weight:900;font-variant-numeric:tabular-nums}}

/* ---------- G: standard certificate (< 26) ---------- */
.g-frame{{padding:6px;border-radius:10px;background:linear-gradient(150deg,#DCC084,#A88434 45%,#E7D0A0 78%,#A67C1D);box-shadow:0 14px 30px rgba(0,0,0,.45)}}
.g{{position:relative;padding:22px 18px 18px;border-radius:6px;text-align:center;color:var(--ink);
  background:repeating-linear-gradient(0deg,rgba(112,79,31,.028) 0 1px,transparent 1px 4px),#FCF5E4;
  box-shadow:inset 0 0 0 1px rgba(166,124,29,.45)}}
.g:before{{content:"";position:absolute;inset:9px;border:1px solid rgba(166,124,29,.34);border-radius:3px;pointer-events:none}}
.g .eyeb{{margin-top:14px;color:#9A7731}}
.g h3{{margin:7px 0 0;font-size:26px;font-weight:900;letter-spacing:-.05em;line-height:1.14;color:#6E4918;word-break:keep-all}}
.g h3 small{{display:block;margin-bottom:2px;font-size:13px;font-weight:800;letter-spacing:-.02em;color:#2F6A4A}}
.g .divider{{display:flex;align-items:center;gap:9px;margin:13px 4px 0;color:#C9AC62}}
.g .plate{{margin:14px auto 0;padding:10px 8px 11px;max-width:250px;border-top:1.5px solid #D8C285;border-bottom:1.5px solid #D8C285}}
.g .plate small{{display:block;font-size:10.5px;font-weight:700;color:#8E7A45}}
.g .plate strong{{display:block;margin-top:4px;font-size:19px;font-weight:900;letter-spacing:-.03em;color:#1F5E44}}
.g .stampgrid i:not(.on){{color:#BFA870}}
.g .stampgrid i.on{{color:var(--stamp)}}
.g .gridLabel span{{color:#6C7A6E}}
.g .gridLabel b{{color:#1F5E44}}
.g .foot{{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid #E2D2A6;
  font-size:10px;font-weight:700;color:#8E7A45;text-align:left}}
.g .seal{{flex:none;display:grid;place-items:center;width:50px;height:50px;border-radius:50%;border:1.5px dashed var(--wax);color:var(--wax);
  transform:rotate(-8deg);font-size:9px;font-weight:900;line-height:1.15;text-align:center}}

/* ---------- H: perfect certificate (26/26) ---------- */
.h-frame{{position:relative;padding:8px;border-radius:14px;background:linear-gradient(145deg,#F3DC96,#A87D22 38%,#F7E5AE 62%,#8E6A1D);
  box-shadow:0 16px 34px rgba(0,0,0,.55)}}
.h{{position:relative;padding:22px 17px 18px;border-radius:8px;text-align:center;color:#F7ECCF;overflow:hidden;
  background:radial-gradient(circle at 50% 0%,#1C4A34,#0F3123 52%,#0A2419 100%)}}
.h:before{{content:"";position:absolute;left:50%;top:-18%;width:130%;height:70%;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(ellipse at 50% 50%,rgba(246,220,144,.16),transparent 62%)}}
.h:after{{content:"";position:absolute;inset:9px;border:1px solid rgba(246,220,144,.42);border-radius:5px;pointer-events:none}}
.h>*{{position:relative;z-index:1}}
.h .badge{{display:inline-block;padding:6px 15px;border-radius:999px;background:linear-gradient(180deg,#F8E7A8,#D9AE43);border:1px solid #A2791F;
  color:#4A3406;font-size:10.5px;font-weight:900;letter-spacing:.16em;box-shadow:0 2px 0 #8E661A}}
.h .certLogo{{width:112px;margin:12px auto 0;filter:drop-shadow(0 3px 8px rgba(0,0,0,.5))}}
.h .eyeb{{margin-top:12px;color:#DCC077}}
.h h3{{margin:6px 0 0;font-size:29px;font-weight:900;letter-spacing:-.05em;line-height:1.12;color:#FFF3CE;word-break:keep-all;text-shadow:0 2px 10px rgba(0,0,0,.4)}}
.h h3 small{{display:block;margin-bottom:3px;font-size:13px;font-weight:800;letter-spacing:-.02em;color:#F0D48A}}
.h .photo{{position:relative;margin:16px auto 0;padding:7px;max-width:280px;border-radius:12px;border:2px solid #C39B34;
  background:linear-gradient(180deg,#F6E8C2,#E2CE9A);box-shadow:0 8px 18px rgba(0,0,0,.4)}}
.h .photo .ph{{aspect-ratio:5/3.4;border-radius:7px;background:linear-gradient(160deg,#20513C,#0C2A1E);display:grid;place-items:center;
  color:rgba(255,244,220,.5);font-family:var(--lat);font-size:10px;letter-spacing:.22em}}
.h .medal{{position:absolute;left:50%;bottom:-30px;transform:translateX(-50%);display:grid;place-items:center;width:86px;height:86px;border-radius:50%;
  border:4px solid #C5932E;background:radial-gradient(circle at 36% 26%,#FFF3A4,#E9C65C 38%,#C79126 74%,#9A6715);
  color:#5B3A08;box-shadow:0 0 0 3px #F5D878,0 6px 14px rgba(0,0,0,.45);text-align:center;line-height:1.05}}
.h .medal b{{font-size:20px;font-weight:900;letter-spacing:-.03em}}
.h .medal span{{font-size:8.5px;font-weight:900;letter-spacing:.06em}}
.h .plate{{margin:44px auto 0;padding:11px 8px 12px;max-width:270px;border-top:1.5px solid rgba(246,220,144,.5);border-bottom:1.5px solid rgba(246,220,144,.5)}}
.h .plate small{{display:block;font-size:10.5px;font-weight:700;color:#D7BE83}}
.h .plate strong{{display:block;margin-top:4px;font-size:20px;font-weight:900;letter-spacing:-.03em;color:#FFF3CE}}
.h .stampPlate{{margin-top:16px;padding:11px 11px 13px;border-radius:12px;border:1.5px solid #C39B34;
  background:linear-gradient(180deg,#F8EED6,#EDDFBB);box-shadow:inset 0 0 0 1px rgba(255,255,255,.5)}}
.h .stampPlate .cap{{display:block;font-family:var(--lat);font-size:8.5px;letter-spacing:.22em;color:#9A7731}}
.h .stampgrid{{margin-top:9px}}
.h .stampgrid i{{color:var(--stamp)}}
.h .gridLabel span{{color:#CBDCCF}}
.h .gridLabel b{{color:#FFEFC0}}
.h .foot{{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:15px;padding-top:12px;
  border-top:1px solid rgba(246,220,144,.28);font-size:10px;font-weight:700;color:#C6B588;text-align:left}}
.h .footTxt{{color:#C6B588}}
.h .wax{{flex:none;display:grid;place-items:center;width:52px;height:52px;border-radius:50%;transform:rotate(-9deg);
  background:radial-gradient(circle at 34% 28%,#D06B57,#A63C31 60%,#7E2A22);color:#FFE6C9;font-size:9px;font-weight:900;line-height:1.15;
  text-align:center;box-shadow:0 3px 8px rgba(70,14,10,.5),inset 0 0 0 1.5px rgba(255,220,190,.35)}}

/* ---------- album panel ---------- */
.album{{margin-top:13px;padding:15px 14px 16px;border-radius:16px;background:#F7EEDA;border:1px solid #E0CEA4}}
.albumHead{{display:flex;align-items:baseline;justify-content:space-between;gap:10px}}
.albumHead .lab{{font-family:var(--lat);font-size:9px;letter-spacing:.22em;color:#9A7731}}
.albumHead h4{{margin:4px 0 0;font-size:15px;font-weight:900;letter-spacing:-.03em;color:#1F5E44}}
.albumHead .cnt{{font-size:11.5px;font-weight:800;color:#8E7A45;font-variant-numeric:tabular-nums}}
.polgrid{{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:12px}}
.albumMore{{margin:11px 0 0;text-align:center;font-size:11px;font-weight:700;color:#8E7A45}}
.pol{{margin:0;padding:4px 4px 6px;background:#fff;border-radius:3px;box-shadow:0 3px 9px rgba(60,45,20,.18)}}
.pol:nth-child(3n+1){{transform:rotate(-1deg)}}
.pol:nth-child(3n){{transform:rotate(1deg)}}
.pol .pph{{position:relative;display:block;aspect-ratio:4/5;border-radius:2px;overflow:hidden;
  background:linear-gradient(170deg,#2C6A4E,#123726)}}
.pol .pph:before{{content:"";position:absolute;left:50%;top:34%;width:38%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:rgba(255,244,220,.30)}}
.pol .pph:after{{content:"";position:absolute;left:50%;bottom:-6%;width:66%;height:44%;transform:translateX(-50%);border-radius:50% 50% 0 0;background:rgba(255,244,220,.24)}}
.pol figcaption{{margin-top:5px;text-align:center;line-height:1.2}}
.pol figcaption b{{display:block;font-size:10px;font-weight:800;color:#1F5E44}}
.pol figcaption em{{display:block;font-style:normal;font-size:7.5px;font-weight:700;letter-spacing:.08em;color:#A08C57}}
.pol.empty .pph{{background:repeating-linear-gradient(45deg,#EDE3CB 0 6px,#E5D9BC 6px 12px)}}
.pol.empty .pph:before,.pol.empty .pph:after{{display:none}}
.pol.empty figcaption b{{color:#BCAA7C}}

.callout{{margin-top:26px;display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center;padding:18px 20px;border-radius:16px;
  background:rgba(255,255,255,.05);border:1px solid rgba(233,187,67,.24)}}
.callout .demo{{display:grid;grid-template-columns:repeat(3,52px);gap:8px;padding:11px;border-radius:12px;
  border:1.5px solid #C39B34;background:linear-gradient(180deg,#F8EED6,#EDDFBB)}}
.callout .demo i{{aspect-ratio:1;display:grid;place-items:center;border-radius:50%;font-style:normal;font-size:12px;font-weight:800;
  border:1.2px dashed #D4BE8C;background:#FFFCF3;color:#C3AE7C}}
.callout .demo i.on{{border:0;background:none;color:var(--stamp);transform:rotate(-6deg)}}
.callout .demo i.on+i.on{{transform:rotate(5deg)}}
.callout .demo i svg{{width:100%;height:100%}}
.callout h3{{margin:0;font-size:16px;font-weight:900;letter-spacing:-.02em}}
.callout p{{margin:7px 0 0;color:#C3D5CB;font-size:13.5px;word-break:keep-all}}

.closing{{margin-top:52px;padding:22px 20px;border-radius:16px;background:rgba(255,255,255,.05);border:1px solid rgba(233,187,67,.24)}}
.closing h2{{margin:0;font-size:17px;font-weight:900;letter-spacing:-.02em}}
.closing ol{{margin:11px 0 0;padding-left:20px;color:#C3D5CB;font-size:14px}}
.closing li{{margin-top:5px;word-break:keep-all}}
@media(max-width:620px){{.sheet{{padding:0 14px 72px}}.head{{padding:40px 0 26px}}.callout{{grid-template-columns:1fr}}}}
</style>

<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <linearGradient id="skyDeep" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#030B18"/><stop offset="42%" stop-color="#0A2138"/><stop offset="72%" stop-color="#123246"/><stop offset="100%" stop-color="#16404A"/>
  </linearGradient>
  <linearGradient id="skyTrail" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#04101F"/><stop offset="50%" stop-color="#0A2438"/><stop offset="100%" stop-color="#14384A"/>
  </linearGradient>
  <radialGradient id="mw"><stop offset="0" stop-color="#CFE2FF" stop-opacity=".22"/><stop offset="60%" stop-color="#9FC0E8" stop-opacity=".08"/><stop offset="1" stop-color="#9FC0E8" stop-opacity="0"/></radialGradient>
  <radialGradient id="moonGlow"><stop offset="0" stop-color="#FFF3C4" stop-opacity=".42"/><stop offset="1" stop-color="#FFF3C4" stop-opacity="0"/></radialGradient>
  <radialGradient id="fireGlow"><stop offset="0" stop-color="#F5AE43" stop-opacity=".55"/><stop offset="1" stop-color="#F5AE43" stop-opacity="0"/></radialGradient>
  <radialGradient id="fireGlowBig"><stop offset="0" stop-color="#F5AE43" stop-opacity=".48"/><stop offset="55%" stop-color="#E8792B" stop-opacity=".14"/><stop offset="1" stop-color="#E8792B" stop-opacity="0"/></radialGradient>
  <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0A2436"/><stop offset="55%" stop-color="#0C2C3F"/><stop offset="100%" stop-color="#123443"/>
  </linearGradient>
  <radialGradient id="ffGlow"><stop offset="0" stop-color="#FFE68A" stop-opacity=".55"/><stop offset="1" stop-color="#FFE68A" stop-opacity="0"/></radialGradient>
  <linearGradient id="shoot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF8DC" stop-opacity="0"/><stop offset="1" stop-color="#FFF8DC" stop-opacity=".95"/></linearGradient>
  <symbol id="lpine" viewBox="0 0 60 100">
    <g stroke="#0C2018" stroke-width="3" stroke-linejoin="round">
      <path d="M30 6 L48 42 H12 Z" fill="#1E5B3C"/><path d="M30 26 L52 66 H8 Z" fill="#246944"/>
      <rect x="26" y="64" width="8" height="26" rx="3" fill="#5C3A1C"/>
    </g>
  </symbol>
  <symbol id="ltent" viewBox="0 0 128 100">
    <g stroke="#0C2018" stroke-width="3.6" stroke-linejoin="round">
      <path d="M64 16 C61 16 26 78 20 90 q44 8 88 0 C102 78 67 16 64 16Z" fill="#E8792B"/>
      <path d="M64 16 C61 16 26 78 20 90 q22 4 44 4 Z" fill="#F5983F" stroke="none"/>
      <path d="M64 42 C62 42 50 80 48 90 q16 2.6 32 0 C78 80 66 42 64 42Z" fill="#FFD97A"/>
      <path d="M64 16 L64 5" stroke-linecap="round"/><path d="M64 4 L84 9 L64 14 Z" fill="#F2C230"/>
    </g>
  </symbol>
  <symbol id="ltent2" viewBox="0 0 128 100">
    <g stroke="#0A1A22" stroke-width="3.2" stroke-linejoin="round">
      <path d="M64 18 C61 18 26 78 20 90 q44 8 88 0 C102 78 67 18 64 18Z" fill="#1C4457"/>
      <path d="M64 44 C62 44 52 80 50 90 q14 2.4 28 0 C76 80 66 44 64 44Z" fill="#FFCE6E"/>
      <path d="M64 18 L64 7" stroke-linecap="round"/>
    </g>
  </symbol>
  <symbol id="lbulb" viewBox="0 0 22 30">
    <g stroke="#0C2018" stroke-width="2.2" stroke-linejoin="round">
      <path d="M11 2 L11 7" stroke-linecap="round"/><rect x="6.5" y="6" width="9" height="4.4" rx="1.4" fill="#8A6A2A"/>
      <circle cx="11" cy="17.5" r="7" fill="#FFD96A"/>
    </g>
  </symbol>
  <symbol id="lstar" viewBox="0 0 22 22">
    <path d="M11 1 L13.4 8.6 L21 11 L13.4 13.4 L11 21 L8.6 13.4 L1 11 L8.6 8.6 Z" fill="#FFF3C4" stroke="#0C2018" stroke-width="1.6" stroke-linejoin="round"/>
  </symbol>
  {SCENE_GALAXY}
</defs></svg>

<div class="sheet">
  <header class="head">
    <span class="kicker">Private beta · 시안 v8</span>
    <h1>아이돌 수련회 1기 퇴소식<br>확정 배너 · 수료증 2종</h1>
    <p>배너는 은하수 호숫가 안으로 확정했습니다. 수료증에서 퍼지는 빛살 무늬는 걷어냈고, 스탬프는 26개 장면이 곧 출연자 26명이라는 점을 살려 도장마다 출연자 이름이 찍히도록 바꿨습니다. 이름은 실제 퇴소식 데이터의 26명 순서를 그대로 썼습니다.</p>
    <div class="chips">
      <span class="chip">배너 확정 · 은하수 호숫가</span>
      <span class="chip">빛살 무늬 제거</span>
      <span class="chip">출연자 이름 스탬프 26개</span>
      <span class="chip">26/26 특별 수료증 · 단체사진</span>
      <span class="chip">26 미만 기본 수료증 · 로고 상단</span>
    </div>
  </header>

  <section class="sec">
    <div class="sec-head">
      <h2>1. 배너 · 확정안</h2>
      <span class="note">미니멀 포스터형 + 은하수 호숫가 일러스트. 별궤적안은 보류합니다.</span>
    </div>
    <div class="rail">
      <article class="opt">
        <div class="opt-tag"><b>확정</b><span>은하수 호숫가</span></div>
        <div class="phone"><div class="phone-in">
          <div class="bnr">
            <svg class="scene" viewBox="0 0 500 420" aria-hidden="true"><use href="#scene-galaxy" width="500" height="420"/></svg>
            <div class="scrim"></div>
            <div class="in">
              <img class="bnrLogo" src="{LOGO}" alt="아이돌 수련회">
              <span class="rule">IDOL SCHOOL CAMP · 1ST</span>
              <p class="t1">수련회의 마지막 밤</p>
              <p class="t2"><b>아이돌 수련회 1기</b>퇴소식</p>
              <p class="lead">26개의 순간을 떠올리며 친구들과 함께 퇴소식을 완성해 보세요.</p>
              <button class="cta" type="button">퇴소식 시작하기 →</button>
              <div class="meta"><span>SCENES 26</span><span>ABOUT 3 MIN</span></div>
            </div>
          </div>
        </div></div>
        <ul class="why">
          <li>은하수와 별똥별, 호수에 비친 달빛으로 위아래 깊이를 만들었습니다.</li>
          <li>모닥불에 둘러앉은 친구 셋의 실루엣이 「함께한 마지막 밤」을 그림으로 설명합니다.</li>
          <li>반딧불과 불티가 흩어져 있어 정지 화면인데도 공기가 도는 느낌이 납니다.</li>
          <li>제목·버튼 영역은 아래 3분의 1에만 어둡게 깔아 일러스트를 가리지 않습니다.</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="sec">
    <div class="sec-head">
      <h2>2. 수료증 · 두 가지 상태</h2>
      <span class="note">26개를 다 맞히면 특별한 물건이 되고, 못 맞히면 담백한 상장이 됩니다. 단체사진은 만점일 때만 들어가고, 스탬프에는 출연자 이름이 찍힙니다.</span>
    </div>
    <div class="rail">

      <article class="opt">
        <div class="opt-tag"><b>26/26</b><span>화려한 특별 수료증</span></div>
        <div class="phone"><div class="phone-in"><div class="certpad">
          <div class="h-frame"><div class="h">
            <span class="badge">PERFECT 26 / 26</span>
            <img class="certLogo" src="{LOGO}" alt="아이돌 수련회">
            <span class="eyeb">SPECIAL CERTIFICATE</span>
            <h3><small>아이돌 수련회 1기</small>특별 수료증</h3>
            <div class="photo">
              <div class="ph">GROUP PHOTO</div>
              <div class="medal"><b>26</b><span>ALL CLEAR</span></div>
            </div>
            <div class="plate"><small>수료 등급</small><strong>추억을 다 기억하는 사람</strong></div>
            <div class="stampPlate">
              <span class="cap">26 MEMBERS · ALL STAMPED</span>
              <div class="stampgrid">{stampgrid()}</div>
            </div>
            <div class="gridLabel"><span>함께 퇴소한 친구</span><b>26 / 26</b></div>
            <div class="foot">
              <span class="footTxt">발급일 2026.08.12 · No.0001<br>주최 · 아이돌 수련회 사무국</span>
              <span class="wax">수련회<br>수료</span>
            </div>
          </div></div>

          <div class="album">
            <div class="albumHead">
              <div><span class="lab">MEMORY ALBUM</span><h4>추억의 사진첩</h4></div>
              <span class="cnt">26 / 26</span>
            </div>
            <div class="polgrid">{polaroids(range(9))}</div>
            <p class="albumMore">그 외 17명 · 아래로 계속</p>
          </div>
        </div></div></div>
        <ul class="why">
          <li>퍼지는 빛살 무늬는 걷어내고, 금박 프레임과 PERFECT 배지·메달·왁스 실링만으로 만점 전용 물건이라는 게 드러나게 했습니다.</li>
          <li>단체사진은 이 버전에만 들어가고, 메달이 사진 아래에 겹쳐 앉아 트로피처럼 보입니다.</li>
          <li>출연자 26명 이름 위에 도장이 전부 찍혀 있어, 저장·공유했을 때 완주가 한눈에 보입니다.</li>
        </ul>
      </article>

      <article class="opt">
        <div class="opt-tag"><b>26 미만</b><span>기본 수료증</span></div>
        <div class="phone"><div class="phone-in"><div class="certpad">
          <div class="g-frame"><div class="g">
            <img class="certLogo" src="{LOGO}" alt="아이돌 수련회">
            <span class="eyeb">CERTIFICATE OF COMPLETION</span>
            <h3><small>아이돌 수련회 1기</small>수료증</h3>
            <div class="plate"><small>수료 등급</small><strong>추억을 거의 다 아는 사람</strong></div>
            <div class="stampgrid">{stampgrid(missed=MISSED)}</div>
            <div class="gridLabel"><span>함께 퇴소한 친구</span><b>19 / 26</b></div>
            <div class="foot">
              <span>발급일 2026.08.12 · No.0142<br>주최 · 아이돌 수련회 사무국</span>
              <span class="seal">수련회<br>수료</span>
            </div>
          </div></div>

          <div class="album">
            <div class="albumHead">
              <div><span class="lab">MEMORY ALBUM</span><h4>추억의 사진첩</h4></div>
              <span class="cnt">19 / 26</span>
            </div>
            <div class="polgrid">{polaroids([i for i in range(11) if i not in MISSED][:9])}</div>
            <p class="albumMore">맞힌 19명만 사진첩에 들어갑니다</p>
          </div>
        </div></div></div>
        <ul class="why">
          <li>사진 없이 로고를 가운데 상단에 놓아, 일반적인 상장 형태로 담백하게 정리했습니다.</li>
          <li>맞힌 출연자에게만 도장이 찍히고, 놓친 사람은 점선 칸에 이름이 남아 다시 도전할 이유가 보입니다.</li>
          <li>등급명·발급번호·직인은 만점 버전과 같은 자리에 있어 두 장이 한 시리즈로 보입니다.</li>
        </ul>
      </article>

    </div>

    <div class="callout">
      <div class="demo">
        {stampcell(0,True)}{stampcell(11,True)}{stampcell(4,False)}
      </div>
      <div>
        <h3>스탬프 한 칸 = 출연자 한 명</h3>
        <p>26개 질문이 곧 출연자 26명이라, 맞힌 사람의 이름 위에 「참 잘했어요」 도장이 비스듬히 찍힙니다. 못 맞힌 사람은 점선 칸에 이름과 장면 번호만 남아, 누구를 놓쳤는지 바로 보입니다.</p>
      </div>
    </div>
  </section>

  <div class="closing">
    <h2>다음 단계</h2>
    <ol>
      <li>배너는 은하수안으로 적용합니다. 달 위치·텐트 수·반딧불 양 같은 세부는 말씀 주시면 조정합니다.</li>
      <li>수료증은 두 상태를 한 세트로 적용합니다. 등급명 문구는 지금 쓰는 것을 그대로 쓰거나 새로 주셔도 됩니다.</li>
      <li>스탬프와 사진첩의 이름·순서는 실제 퇴소식 데이터(출연자 26명)를 그대로 씁니다.</li>
      <li>이미지 저장·X·인스타 공유용 렌더링도 두 상태 각각에 맞춰 새로 그립니다.</li>
    </ol>
  </div>
</div>
'''

open('/home/user/idolcamp/beta-exit-8b41d9e7a5/design-v6.html','w',encoding='utf-8').write(HTML)
print("written", len(HTML))
