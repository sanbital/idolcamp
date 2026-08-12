(function(){
'use strict';
function swap(s){
  if(typeof s!=='string')return s;
  return s
    .replace(/아이돌 수련회 특별 수료증/g,'아이돌 수련회 1기 특별 수료증')
    .replace(/온라인 퇴소증/g,'아이돌 수련회 1기 수료증')
    .replace(/퇴소증/g,'수료증')
    .replace(/명예로운 퇴소에 성공했어요!/g,'수료를 축하합니다!')
    .replace(/26명의 친구들과 모두 퇴소 완료/g,'26명의 친구들과 모두 수료 완료');
}
function patchText(root){
  if(!root)return;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const list=[];while(w.nextNode())list.push(w.currentNode);
  list.forEach(n=>{const v=swap(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;});
  if(root.nodeType===1){
    ['title','aria-label'].forEach(a=>{if(root.hasAttribute&&root.hasAttribute(a)){const v=swap(root.getAttribute(a));root.setAttribute(a,v);}});
  }
}
function apply(){patchText(document.body);}
const mo=new MutationObserver(ms=>{ms.forEach(m=>{m.addedNodes.forEach(n=>patchText(n));if(m.type==='characterData'&&m.target)m.target.nodeValue=swap(m.target.nodeValue);});});
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
})();
