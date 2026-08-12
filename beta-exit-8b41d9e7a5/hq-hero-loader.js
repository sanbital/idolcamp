(function(){
'use strict';

const VERSION='20260812-hq2';
const PARTS=[1,2,3,4,5,6].map(function(n){
  return './hero-hq-v2.part'+String(n).padStart(2,'0')+'?v='+VERSION;
});
let blobUrl='';
let loading=null;

function decodeBase64ToUrl(source){
  const clean=String(source||'').replace(/\s+/g,'');
  const bin=atob(clean);
  const bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
}

async function getHeroUrl(){
  if(blobUrl)return blobUrl;
  if(loading)return loading;
  loading=Promise.all(PARTS.map(function(url){
    return fetch(url,{cache:'force-cache'}).then(function(r){
      if(!r.ok)throw new Error('HQ hero part '+r.status);
      return r.text();
    });
  })).then(function(parts){
    blobUrl=decodeBase64ToUrl(parts.join(''));
    return new Promise(function(resolve,reject){
      const img=new Image();
      img.onload=function(){resolve(blobUrl);};
      img.onerror=function(){reject(new Error('HQ hero decode failed'));};
      img.src=blobUrl;
    });
  }).catch(function(err){
    loading=null;
    console.error('[private beta] HQ hero load failed',err);
    throw err;
  });
  return loading;
}

async function apply(){
  if(!(document.documentElement.lang||'ko').toLowerCase().startsWith('ko'))return;
  const hero=document.querySelector('.hero');
  if(!hero||hero.classList.contains('hero-hq-ready'))return;
  try{
    const url=await getHeroUrl();
    hero.style.setProperty('--hero-hq-image','url("'+url+'")');
    hero.classList.add('hero-hq-ready');
  }catch(_){ }
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});
else apply();

new MutationObserver(function(){apply();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
window.addEventListener('pageshow',apply);
})();
