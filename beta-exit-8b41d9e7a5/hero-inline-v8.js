(function(){
'use strict';
function mountHero(){
  var hero=document.querySelector('.hero');
  if(!hero||hero.querySelector('.heroApprovedInline')) return;
  var wrap=document.createElement('div');
  wrap.className='heroApprovedInline';
  wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 960" preserveAspectRatio="xMidYMid slice" role="img">
  <defs>
    <linearGradient id="v8sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071629"/><stop offset="0.58" stop-color="#0b2940"/><stop offset="1" stop-color="#071d20"/></linearGradient>
    <linearGradient id="v8ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#174a38"/><stop offset="1" stop-color="#071914"/></linearGradient>
    <linearGradient id="v8btn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#367854"/><stop offset="1" stop-color="#174b35"/></linearGradient>
    <linearGradient id="v8fire" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff59b"/><stop offset="0.5" stop-color="#f6b52e"/><stop offset="1" stop-color="#d75a1f"/></linearGradient>
  </defs>
  <rect width="1280" height="960" fill="url(#v8sky)"/>
  <g fill="#ffd76a"><circle cx="86" cy="112" r="4"/><circle cx="220" cy="82" r="3"/><circle cx="365" cy="138" r="3"/><circle cx="904" cy="104" r="4"/><circle cx="1090" cy="153" r="3"/><circle cx="1185" cy="82" r="3"/></g>
  <g stroke="#ffd76a" stroke-width="3" stroke-linecap="round"><path d="M148 188v24M136 200h24"/><path d="M1014 205v22M1003 216h22"/><path d="M1160 302v20M1150 312h20"/></g>
  <circle cx="1090" cy="137" r="62" fill="#fff0a4" opacity=".15"/><path d="M1108 94c42 16 45 74 5 96-30 16-67 1-78-30 45 15 85-26 73-66z" fill="#fff0a4"/>
  <path d="M0 68 Q310 132 640 68 Q960 6 1280 75" fill="none" stroke="#b99a66" stroke-width="6"/>
  <g fill="#ffd568" stroke="#6d4a21" stroke-width="4"><circle cx="85" cy="87" r="13"/><circle cx="238" cy="102" r="13"/><circle cx="395" cy="105" r="13"/><circle cx="565" cy="82" r="13"/><circle cx="735" cy="52" r="13"/><circle cx="905" cy="42" r="13"/><circle cx="1060" cy="53" r="13"/><circle cx="1208" cy="75" r="13"/></g>
  <path d="M0 510L160 372l140 120 165-174 180 190 155-139 170 144 140-175 170 176v180H0z" fill="#17364a" opacity=".9"/>
  <path d="M0 565l210-123 145 105 210-128 196 118 210-118 309 146v142H0z" fill="#102b35"/>
  <path d="M0 604 Q260 560 515 610 Q780 660 1280 574V960H0z" fill="url(#v8ground)"/>
  <g fill="#08251d"><path d="M62 540l46-116 46 116h-28l37 78H53l37-78z"/><path d="M1212 520l35-95 35 95h-22l30 68h-86l30-68z"/><path d="M178 574l28-78 28 78h-18l24 54h-68l24-54z"/></g>
  <g><path d="M1000 565L1127 364l128 201z" fill="#8a572d" stroke="#c48745" stroke-width="6"/><path d="M1127 364v201" stroke="#3a2419" stroke-width="8"/><path d="M1067 565l60-128 61 128z" fill="#2f241d"/><path d="M1127 438v127" stroke="#bb7436" stroke-width="4"/></g>
  <g transform="translate(135 620)"><ellipse cx="85" cy="95" rx="95" ry="35" fill="#f7a22d" opacity=".2"/><g stroke="#633d27" stroke-width="22" stroke-linecap="round"><path d="M24 112l125-51"/><path d="M29 61l117 56"/></g><path d="M82 91C24 55 64 11 80-19c3 35 28 34 33 4 35 43 29 86-31 106z" fill="url(#v8fire)"/><path d="M84 78c-28-21-5-47 5-65 3 17 17 18 21 6 13 25 5 48-26 59z" fill="#fff59a"/></g>
  <g text-anchor="middle" font-family="Pretendard,Apple SD Gothic Neo,Noto Sans KR,sans-serif"><text x="640" y="260" fill="#efb52d" font-size="31" font-weight="800" letter-spacing="3">수련회의 마지막 밤</text><text x="640" y="354" fill="#fff3d5" font-size="77" font-weight="900" letter-spacing="-5">아이돌 수련회</text><text x="640" y="463" fill="#f5bd2f" font-size="107" font-weight="900" letter-spacing="-6">퇴소식</text></g>
  <g><rect x="304" y="493" width="672" height="82" rx="15" fill="#4b321e" stroke="#8a6138" stroke-width="6"/><path d="M325 515h630M325 550h630" stroke="#7b5638" stroke-width="2" opacity=".65"/><text x="640" y="548" text-anchor="middle" fill="#fff1d6" font-family="Pretendard,Apple SD Gothic Neo,Noto Sans KR,sans-serif" font-size="34" font-weight="800">26개의 순간 = 26명의 친구들</text></g>
  <g text-anchor="middle" fill="#fff6e3" font-family="Pretendard,Apple SD Gothic Neo,Noto Sans KR,sans-serif" font-size="27" font-weight="700"><text x="640" y="665">수련회가 끝나도, 우리의 추억은 계속됩니다.</text><text x="640" y="707">26명의 친구들과 함께한 순간을 떠올리며</text><text x="640" y="749">마지막 퇴소식을 완성해 보세요.</text></g>
  <g><rect x="276" y="790" width="728" height="112" rx="24" fill="url(#v8btn)" stroke="#6b916e" stroke-width="5"/><rect x="291" y="804" width="698" height="82" rx="17" fill="none" stroke="#96ad79" stroke-width="2" stroke-dasharray="10 8" opacity=".75"/><text x="640" y="860" text-anchor="middle" fill="#fff7e5" font-family="Pretendard,Apple SD Gothic Neo,Noto Sans KR,sans-serif" font-size="42" font-weight="900">퇴소식 시작하기  →</text></g>
  <g transform="translate(1015 690) rotate(5)"><rect width="205" height="84" rx="7" fill="#75502e" stroke="#3f2a1d" stroke-width="5"/><text x="103" y="38" text-anchor="middle" fill="#17120c" font-family="Georgia,serif" font-size="27" font-weight="700">See you</text><text x="103" y="68" text-anchor="middle" fill="#17120c" font-family="Georgia,serif" font-size="27" font-weight="700">again!</text></g>
  </svg>`;
  hero.insertBefore(wrap,hero.firstChild);
  hero.classList.add('hero-inline-ready');
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountHero,{once:true}); else mountHero();
setTimeout(mountHero,100);
setTimeout(mountHero,500);
})();