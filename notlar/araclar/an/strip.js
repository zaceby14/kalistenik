// node an/strip.js FILE OUTDIR CODE... -> OUTDIR/CODE.png : 10 frames of plain round, zoomed, with metrics
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');const fs=require('fs');
(async()=>{const [f,od,...ks]=process.argv.slice(2);const N=+(process.env.N||10);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:400},deviceScaleFactor:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+f);await p.waitForTimeout(400);await p.evaluate(PAGE);
for(const k of ks){const r=await p.evaluate(([k,N])=>{const d=DRAW[k];if(!d)return null;const P=tlOf(d,1).tot;const b=AN.bb(d);let o='';const mets=[];
 for(let i=0;i<N;i++){const t=i*P/N;const s=svgFor(d,t).svg.replace(/viewBox="[^"]*"/,'viewBox="'+[b.x,b.y,b.w,b.h].map(v=>v.toFixed(3)).join(' ')+'"');const pp=poseAt(d,t);const m=AN.met(pp.p||pp);mets.push(m);
  o+='<div style="width:145px;display:inline-block;vertical-align:top;margin:1px"><div style="width:145px;height:145px;background:#eef1f3">'+s+'</div><div style="font:9px monospace;white-space:pre">'+(m.front?'front':`elb${m.elb} hip${m.hip} kn${m.kn}\ntor${m.tor} dxSH${m.dxSH}`)+'</div></div>';}
 const lv=AN.lv(k);return {o,mets,alt:d.alt,how:lv?lv.how.join(' / '):''};},[k,N]);
 if(!r){console.log('YOK',k);continue;}
 await p.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#c9d1d8;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458;--muted:#666;--line:#ccc;--surface:#fff;--ok:#2a8}body{margin:4px;font-family:sans-serif}svg{width:100%;height:100%}</style><div style="font:bold 13px sans-serif">'+k+' — '+r.alt+'</div><div style="font:11px sans-serif;max-width:1480px">'+r.how+'</div>'+r.o);
 await p.screenshot({path:od+'/'+k.replace(/[^A-Za-z0-9_:-]/g,'_').replace(/:/g,'_')+'.png',fullPage:true});}
console.log('errs',errs.length?errs.slice(0,3):0);await b.close();})();
