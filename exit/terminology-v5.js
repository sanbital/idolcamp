(function(){
'use strict';
function swap(s){
  if(typeof s!=='string')return s;
  return s
    .replace(/온라인 퇴소식/g,'아이돌 수련회 1기 퇴소식')
    .replace(/포토카드/g,'카드')
    .replace(/아이돌 수련회 (1기 )?특별 수료증/g,'아이돌 수련회 1기 수석 수료증')
    .replace(/특별 수료증/g,'수석 수료증')
    .replace(/온라인 퇴소증/g,'아이돌 수련회 1기 수료증')
    .replace(/퇴소증/g,'수료증')
    .replace(/명예로운 퇴소에 성공했어요!/g,'수료를 축하합니다!')
    .replace(/26명의 친구들과 모두 퇴소 완료/g,'26명의 친구들과 모두 수료 완료');
}
function patchText(root){
  if(!root)return;
  if(root.nodeType===3){const v=swap(root.nodeValue);if(v!==root.nodeValue)root.nodeValue=v;return;}
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const list=[];while(w.nextNode())list.push(w.currentNode);
  list.forEach(n=>{const v=swap(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;});
  if(root.nodeType===1){
    ['title','aria-label'].forEach(a=>{if(root.hasAttribute&&root.hasAttribute(a)){const v=swap(root.getAttribute(a));root.setAttribute(a,v);}});
  }
}
function apply(){patchText(document.body);}
const mo=new MutationObserver(ms=>{ms.forEach(m=>{
  m.addedNodes.forEach(n=>patchText(n));
  /* only write when the text actually changes, or the write feeds the observer again */
  if(m.type==='characterData'&&m.target){const v=swap(m.target.nodeValue);if(v!==m.target.nodeValue)m.target.nodeValue=v;}
});});
if(document.body)mo.observe(document.body,{subtree:true,childList:true,characterData:true});
else document.addEventListener('DOMContentLoaded',()=>{apply();mo.observe(document.body,{subtree:true,childList:true,characterData:true});},{once:true});
apply();
/* Keep exported certificate wording consistent with the visible UI. */
if(window.CanvasRenderingContext2D){
  const p=CanvasRenderingContext2D.prototype;
  const fill=p.fillText,stroke=p.strokeText;
  p.fillText=function(text,x,y,maxWidth){const t=swap(String(text));return arguments.length>3?fill.call(this,t,x,y,maxWidth):fill.call(this,t,x,y);};
  p.strokeText=function(text,x,y,maxWidth){const t=swap(String(text));return arguments.length>3?stroke.call(this,t,x,y,maxWidth):stroke.call(this,t,x,y);};
}

/* Season 1 close: replace the old section tabs with one localized Season 2 banner.
   Keep only the completion-kit content below the banner. */
(function seasonClose(){
  const MESSAGES={
    ko:'아이돌 수련회는 시즌2에서 다시 만나요!',
    en:'See you again in Idol School Camp Season 2!',
    ja:'アイドル修練会はシーズン2でまた会いましょう！',
    'zh-Hant':'《偶像修練會》第二季再見！',
    'zh-TW':'《偶像修練會》第二季再見！',
    'zh-CN':'《偶像修炼会》第二季再见！',
    zh:'《偶像修炼会》第二季再见！'
  };
  function currentLang(){
    const raw=(document.documentElement.lang||'ko').trim();
    if(/^zh-(Hant|TW)/i.test(raw))return 'zh-Hant';
    if(/^zh-(Hans|CN)/i.test(raw))return 'zh-CN';
    if(/^ja/i.test(raw))return 'ja';
    if(/^en/i.test(raw))return 'en';
    return raw==='ko'?'ko':'ko';
  }
  function renderBanner(){
    const bar=document.getElementById('tabbar');
    if(!bar)return;
    if(!bar.classList.contains('season2Banner')){
      bar.className='season2Banner';
      bar.removeAttribute('aria-label');
      bar.innerHTML='<span class="season2Tent" aria-hidden="true">△</span><strong id="season2Message"></strong><span class="season2Trees" aria-hidden="true">♢</span>';
    }
    const msg=document.getElementById('season2Message');
    if(msg)msg.textContent=MESSAGES[currentLang()]||MESSAGES.ko;
  }
  function closeOldSections(){
    ['home','question','result'].forEach(id=>{
      const el=document.getElementById(id);
      if(el){el.classList.remove('on');el.style.setProperty('display','none','important');}
    });
    const kit=document.getElementById('kit');
    if(kit){kit.classList.add('on');kit.style.setProperty('display','block','important');}
    ['kitBack2'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.setProperty('display','none','important');});
  }
  function installStyle(){
    if(document.getElementById('season2-close-style'))return;
    const st=document.createElement('style');
    st.id='season2-close-style';
    st.textContent='\
      .season2Banner{display:flex;align-items:center;justify-content:center;gap:12px;margin:14px 0 18px;padding:18px 22px;border-radius:18px;background:linear-gradient(180deg,#FFFDF6 0%,#F8F2DF 100%);border:1.5px solid rgba(31,107,68,.22);box-shadow:0 8px 22px rgba(20,48,61,.08);color:#123A2E;text-align:center;}\
      .season2Banner strong{font-family:var(--sans,"Pretendard",sans-serif);font-size:clamp(18px,2.8vw,28px);font-weight:900;line-height:1.3;letter-spacing:-.035em;word-break:keep-all;}\
      .season2Tent,.season2Trees{display:grid;place-items:center;width:32px;height:32px;flex:0 0 32px;border-radius:50%;background:#FFF3C4;border:1.5px solid rgba(31,107,68,.22);color:#1F6B44;font-size:16px;font-weight:900;}\
      #kit{margin-top:0!important;}\
      @media(max-width:640px){.season2Banner{gap:8px;padding:15px 12px;border-radius:15px}.season2Banner strong{font-size:17px}.season2Tent,.season2Trees{width:27px;height:27px;flex-basis:27px;font-size:13px}}';
    document.head.appendChild(st);
  }
  function applySeasonClose(){installStyle();renderBanner();closeOldSections();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applySeasonClose,{once:true});
  else applySeasonClose();
  new MutationObserver(()=>{renderBanner();closeOldSections();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('popstate',closeOldSections);
})();
})();
