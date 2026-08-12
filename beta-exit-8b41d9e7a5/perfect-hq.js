(function(){
'use strict';

function toOriginal(src){
  if(!src)return '';
  const marker='/storage/v1/render/image/public/';
  if(!src.includes(marker))return src;
  return src.replace(marker,'/storage/v1/object/public/').split('?')[0];
}

function sharpenPerfectPhoto(){
  const cert=document.getElementById('cert');
  const photo=document.getElementById('groupPhoto');
  if(!cert||!photo||!cert.classList.contains('perfect')||!photo.src)return;
  const original=toOriginal(photo.src);
  if(!original||original===photo.src||photo.dataset.hqOriginal===original)return;
  photo.dataset.hqOriginal=original;
  const pre=new Image();
  pre.decoding='async';
  pre.onload=function(){
    if(document.getElementById('cert')?.classList.contains('perfect')){
      photo.src=original;
      photo.style.imageRendering='auto';
    }
  };
  pre.src=original;
}

function apply(){
  const cert=document.getElementById('cert');
  if(cert&&cert.classList.contains('perfect')){
    cert.classList.add('perfect-hq');
    sharpenPerfectPhoto();
  }
}

const observer=new MutationObserver(function(){queueMicrotask(apply);});
observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','src']});
window.addEventListener('load',apply);
window.addEventListener('pageshow',apply);
apply();
})();
