(function(){
'use strict';

const VERSION='20260812-exact-v9';
const PARTS=[1,2,3,4,5,6].map(function(n){
  return './hero-hq-v2.part'+String(n).padStart(2,'0')+'?v='+VERSION;
});
let blobUrl='';
let loading=null;

function decodeBase64ToUrl(source){
  const clean=String(source||'').replace(/\s+/g,'');
  const bin=atob(clean);
  const bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
}

function getHeroUrl(){
  if(blobUrl) return Promise.resolve(blobUrl);
  if(loading) return loading;
  loading=Promise.all(PARTS.map(function(url){
    return fetch(url,{cache:'force-cache'}).then(function(r){
      if(!r.ok) throw new Error('HQ hero part '+r.status);
      return r.text();
    });
  })).then(function(parts){
    blobUrl=decodeBase64ToUrl(parts.join(''));
    return blobUrl;
  }).catch(function(err){
    loading=null;
    console.error('[private beta] exact HQ hero load failed; keeping exact low-res fallback',err);
    throw err;
  });
  return loading;
}

function mount(url){
  const hero=document.querySelector('.hero');
  if(!hero) return;
  let img=hero.querySelector('.heroApprovedRaster');
  if(!img){
    img=document.createElement('img');
    img.className='heroApprovedRaster';
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.decoding='async';
    hero.insertBefore(img,hero.firstChild);
  }
  if(img.dataset.hqReady==='1') return;
  img.onload=function(){
    img.dataset.hqReady='1';
    hero.classList.add('hero-hq-ready');
  };
  img.onerror=function(){
    img.remove();
    hero.classList.remove('hero-hq-ready');
  };
  img.src=url;
}

function apply(){
  if(!(document.documentElement.lang||'ko').toLowerCase().startsWith('ko')) return;
  getHeroUrl().then(mount).catch(function(){
    /* The CSS background is the same approved artwork, so never replace it with a vector/black panel. */
  });
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true});
else apply();
window.addEventListener('pageshow',apply);
new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
