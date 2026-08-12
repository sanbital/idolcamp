(function(){
'use strict';
/* Render the existing 1080x1350 certificate layout at 3x physical pixels
   without changing logical drawing coordinates. This is client-side only. */
const create=document.createElement.bind(document);
document.createElement=function(name,opts){
  const el=create(name,opts);
  if(String(name).toLowerCase()==='canvas'){
    const nativeGet=el.getContext.bind(el);
    el.getContext=function(type){
      const args=[].slice.call(arguments,1);
      if(type==='2d'&&this.width===1080&&this.height===1350&&!this.__idolcamp3x){
        this.__idolcamp3x=true;
        this.width=3240;this.height=4050;
        const ctx=nativeGet.apply(this,[type].concat(args));
        if(ctx){ctx.scale(3,3);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';}
        return ctx;
      }
      return nativeGet.apply(this,[type].concat(args));
    };
  }
  return el;
};
/* Only the 26/26 group photo bypasses the image-transform endpoint so the
   certificate receives the original Storage asset. Normal traffic stays optimized. */
const d=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
if(d&&d.get&&d.set){
  Object.defineProperty(HTMLImageElement.prototype,'src',{
    configurable:true,enumerable:d.enumerable,
    get:d.get,
    set:function(v){
      let s=String(v||'');
      if(s.includes('/storage/v1/render/image/public/idolcamp-exit/')&&/certificate%2Fall\.webp|certificate\/all\.webp/i.test(s)){
        s=s.replace('/storage/v1/render/image/public/','/storage/v1/object/public/').split('?')[0];
      }
      return d.set.call(this,s);
    }
  });
}
})();
