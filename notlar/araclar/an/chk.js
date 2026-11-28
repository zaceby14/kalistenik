const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const file=process.argv[2];const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate(()=>{const out=[];const cr=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const surf=(d,h)=>{if(h[1]<.07)return 1;return (d.props||[]).some(q=>((q[0]==='box'||q[0]==='chair')&&h[0]>q[1]-.05&&h[0]<q[2]+.05&&Math.abs(h[1]-q[3])<.06)||(q[0]==='par'&&Math.abs(h[0]-q[1])<.08&&Math.abs(h[1]-q[2])<.06)||(q[0]==='dip'&&Math.abs(h[1]-q[2])<.08))?1:0;};
  Object.keys(DRAW).forEach(k=>{const d=DRAW[k];d.k.forEach((p,i)=>{if(p.front)return;const J=joints(p);const ch=J.bk?[-J.bk[0],-J.bk[1]]:null;
   J.arms.forEach(([e,h,far,o])=>{const el=AN.ang(o,e,h);if(el>165)return;
     if(surf(d,h)&&h[1]<o[1]){ // pushing support
       const s1=Math.sign(cr(o,h,e)),s2=Math.sign(cr(o,h,J.P));if(s1!==s2)out.push([k,i,'R1 el-forward(push)',el,(p.cap||'').slice(0,30)]);}
     else if(h[1]>o[1]+.15&&ch){const mid=[(o[0]+h[0])/2,(o[1]+h[1])/2];const v=[e[0]-mid[0],e[1]-mid[1]];if(v[0]*ch[0]+v[1]*ch[1]<0)out.push([k,i,'R3 el-back(pull)',el,(p.cap||'').slice(0,30)]);}
   });
   if(ch)J.legs.forEach(([kn,f,far,st,o])=>{const a=AN.ang(o,kn,f);if(a>170)return;const mid=[(o[0]+f[0])/2,(o[1]+f[1])/2];const v=[kn[0]-mid[0],kn[1]-mid[1]];if(v[0]*ch[0]+v[1]*ch[1]<-.01)out.push([k,i,'R4 knee-backward',a,(p.cap||'').slice(0,30)]);});
  });});return out;});
 r.forEach(x=>console.log(x.join(' | ')));console.log(r.length,errs);await b.close();})();
