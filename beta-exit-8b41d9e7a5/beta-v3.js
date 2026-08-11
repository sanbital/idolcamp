(function(){
'use strict';

const $=(s,r=document)=>r.querySelector(s);
const lang=()=>document.documentElement.lang||'ko';

const HERO={
  ko:{title:'아이돌 수련회 퇴소식',desc:['수련회가 끝나도, 우리의 추억은 계속됩니다.','26명의 친구들과 함께한 순간을 떠올리며','마지막 퇴소식을 완성해 보세요.']},
  en:{title:'Idol School Camp Exit Ceremony',desc:['Camp may be over, but our memories continue.','Remember the moments shared with 26 friends','and complete the final exit ceremony together.']},
  ja:{title:'アイドル修練会 退所式',desc:['修練会が終わっても、思い出は続きます。','26人の仲間と過ごした瞬間を振り返りながら','最後の退所式を完成させましょう。']},
  'zh-CN':{title:'偶像修炼会 退所式',desc:['修炼会结束了，但回忆还在继续。','回想与26位朋友一起度过的时光','完成最后的退所式吧。']},
  'zh-TW':{title:'偶像修煉會 退所式',desc:['修煉會結束了，但回憶還在繼續。','回想與26位好友一起度過的時光','完成最後的退所式吧。']}
};

const PERFECT={
  ko:{eyebrow:'PERFECT EXIT · 26 / 26',top:'축하합니다!',name:'아이돌 수련회 특별 수료증',sub:'26명의 친구들과 모두 퇴소 완료',message:'당신은 26명의 친구들과 함께 수련회의 모든 여정을 완벽히 마쳤습니다. 모든 추억을 완성한 특별한 아이돌 수련회 마스터에게 이 수료증을 수여합니다.',save:'특별 수료증 저장하기',share:'특별 수료증 자랑하기'},
  en:{eyebrow:'PERFECT EXIT · 26 / 26',top:'Congratulations!',name:'Idol School Camp Special Certificate',sub:'Completed the exit with all 26 friends',message:'You completed every camp memory together with all 26 friends. This special certificate is awarded to a true Idol School Camp Master.',save:'Save special certificate',share:'Share special certificate'},
  ja:{eyebrow:'PERFECT EXIT · 26 / 26',top:'おめでとうございます！',name:'アイドル修練会 特別修了証',sub:'26人全員と退所完了',message:'26人の仲間とともに修練会のすべての思い出を完成させました。アイドル修練会マスターにこの特別修了証を授与します。',save:'特別修了証を保存',share:'特別修了証をシェア'},
  'zh-CN':{eyebrow:'PERFECT EXIT · 26 / 26',top:'恭喜！',name:'偶像修炼会 特别结业证书',sub:'与26位朋友全部完成退所',message:'你与26位朋友一起完成了修炼会的全部回忆。特此向真正的偶像修炼会大师颁发这份特别结业证书。',save:'保存特别证书',share:'分享特别证书'},
  'zh-TW':{eyebrow:'PERFECT EXIT · 26 / 26',top:'恭喜！',name:'偶像修煉會 特別結業證書',sub:'與26位好友全部完成退所',message:'你與26位好友一起完成了修煉會的全部回憶。特此向真正的偶像修煉會大師頒發這份特別結業證書。',save:'儲存特別證書',share:'分享特別證書'}
};

const NORMAL={
  ko:{eyebrow:'EXIT COMPLETE',top:'명예로운 퇴소에 성공했어요!',name:'온라인 퇴소증',save:'이미지 저장',share:'퇴소증 자랑하기'},
  en:{eyebrow:'EXIT COMPLETE',top:'Congratulations on your honourable exit!',name:'Exit Certificate',save:'Save image',share:'Share your certificate'},
  ja:{eyebrow:'EXIT COMPLETE',top:'名誉ある退所に成功しました！',name:'オンライン退所証',save:'画像を保存',share:'退所証をシェアする'},
  'zh-CN':{eyebrow:'EXIT COMPLETE',top:'恭喜成功完成退所！',name:'线上退所证书',save:'保存图片',share:'分享退所结果'},
  'zh-TW':{eyebrow:'EXIT COMPLETE',top:'恭喜成功完成退所！',name:'線上退所證書',save:'儲存圖片',share:'分享退所結果'}
};

function copyFor(map){return map[lang()]||map.ko;}

function applyHero(){
  const hero=$('.hero');
  const inner=$('.heroInner');
  if(!hero||!inner)return;
  let logo=$('.heroCampLogo',inner);
  if(!logo){
    logo=document.createElement('img');
    logo.className='heroCampLogo';
    logo.src='../assets/camp-logo.png';
    logo.alt='아이돌 수련회';
    inner.insertBefore(logo,inner.firstChild);
  }
  const c=copyFor(HERO);
  const title=$('.heroTitle',inner);
  const desc=$('.heroDesc',inner);
  if(title&&title.textContent!==c.title)title.textContent=c.title;
  if(desc){
    const html=c.desc.join('<br>');
    if(desc.innerHTML!==html)desc.innerHTML=html;
  }
}

function ensurePerfectParts(cert){
  let sub=$('.perfectSubline',cert);
  if(!sub){
    sub=document.createElement('div');
    sub.className='perfectSubline';
    const rule=$('.certRule',cert);
    if(rule)rule.insertAdjacentElement('afterend',sub);
  }

  const visual=$('#certVisual',cert);
  let medal=$('.perfectMedallion',cert);
  if(!medal&&visual){
    medal=document.createElement('div');
    medal.className='perfectMedallion';
    medal.innerHTML='<strong>26/26</strong><span>PERFECT</span>';
    visual.appendChild(medal);
  }

  let msg=$('.perfectMessage',cert);
  if(!msg){
    msg=document.createElement('p');
    msg.className='perfectMessage';
    const title=$('#resultTitle',cert);
    if(title)title.insertAdjacentElement('afterend',msg);
  }

  let stats=$('.perfectStats',cert);
  if(!stats){
    stats=document.createElement('div');
    stats.className='perfectStats';
    stats.innerHTML='<div><span>매칭 완료 친구</span><b>26명</b></div><div><span>정답 개수</span><b>26/26</b></div><div><span>정확도</span><b>100%</b></div>';
    const count=$('.countBlock',cert);
    if(count)count.insertAdjacentElement('afterend',stats);
  }

  let seal=$('.perfectGoldSeal',cert);
  if(!seal){
    seal=document.createElement('div');
    seal.className='perfectGoldSeal';
    seal.innerHTML='<span>아이돌<br>수련회</span>';
    cert.appendChild(seal);
  }
  return {sub,msg,stats};
}

function localizeStats(stats){
  if(!stats)return;
  const l=lang();
  const labels={
    ko:['매칭 완료 친구','정답 개수','정확도'],en:['Friends matched','Correct','Accuracy'],ja:['一緒に退所','正解数','正解率'],'zh-CN':['匹配朋友','答对','正确率'],'zh-TW':['配對好友','答對','正確率']
  }[l]||['매칭 완료 친구','정답 개수','정확도'];
  [...stats.children].forEach((el,i)=>{const s=$('span',el);if(s)s.textContent=labels[i];});
}

function applyResult(){
  const result=$('#result');
  const cert=$('#cert');
  if(!result||!cert)return;
  const perfect=cert.classList.contains('perfect');
  result.classList.toggle('perfect-mode',perfect);
  const map=copyFor(perfect?PERFECT:NORMAL);
  const eyebrow=$('.resultTop .eyebrow');
  const top=$('.resultTop h2');
  const name=$('.certName');
  const save=$('#saveImg span');
  const share=$('#result .panel .eyebrow + h2');
  if(eyebrow&&eyebrow.textContent!==map.eyebrow)eyebrow.textContent=map.eyebrow;
  if(top&&top.textContent!==map.top)top.textContent=map.top;
  if(name&&name.textContent!==map.name)name.textContent=map.name;
  if(save&&save.textContent!==map.save)save.textContent=map.save;
  if(share&&share.textContent!==map.share)share.textContent=map.share;

  if(perfect){
    const p=ensurePerfectParts(cert);
    if(p.sub.textContent!==map.sub)p.sub.textContent=map.sub;
    if(p.msg.textContent!==map.message)p.msg.textContent=map.message;
    localizeStats(p.stats);
    const badge=$('#perfectBadge');
    if(badge)badge.textContent='PERFECT · 26 / 26';
  }else{
    cert.querySelectorAll('.perfectSubline,.perfectMedallion,.perfectMessage,.perfectStats,.perfectGoldSeal').forEach(e=>e.remove());
  }
}

let applying=false;
function applyAll(){
  if(applying)return;
  applying=true;
  try{applyHero();applyResult();}finally{applying=false;}
}

const obs=new MutationObserver(()=>queueMicrotask(applyAll));
obs.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','lang','aria-pressed']});
window.addEventListener('load',applyAll);
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.langs'))setTimeout(applyAll,0);});
applyAll();
})();
