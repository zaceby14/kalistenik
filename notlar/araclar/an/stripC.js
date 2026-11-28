// node an/stripC.js file outdir N CODE...  -> one png per code: N frames across plain motion, with metrics
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [f,out,N,...ks]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1700,height:400},deviceScaleFactor:1});await p.goto('file://'+f);await p.waitForTimeout(400);await p.evaluate(PAGE);
for(const k of ks){const html=await p.evaluate(([k,N])=>{const d=DRAW[k];const {tot}=tlOf(d,1);const bb=AN.bb(d);let o='';
 for(let i=0;i<N;i++){const t=tot/2*i/(N-1);const r=poseAt0(d,t,1);const d2=Object.assign({},d,{k:[r.p],_su:null,_tl:null,_tlp:null,_tot:null,_totp:null,_b:bounds(d)});
  let s=svgFor(d2,0).svg.replace(/viewBox="[^"]*"/,'viewBox="'+[bb.x,bb.y,bb.w,bb.h].map(v=>v.toFixed(3)).join(' ')+'"').replace('<svg ','<svg style="width:100%;height:270px" ');
  const m=AN.met(r.p);o+='<div style="width:205px;display:inline-block;background:#eef1f3;margin:2px;vertical-align:top;font:11px sans-serif">'+s+'<div>'+(r.cap||'').slice(0,40)+'</div><div>'+JSON.stringify(m)+'</div></div>';}
 const lv=AN.lv(k);return '<div style="font:bold 14px sans-serif">'+k+' — '+(d.alt||'')+'</div><div style="font:11px sans-serif;max-width:1680px">'+(lv?lv.how.join(' | '):'')+'</div>'+o;},[k,+N]);
 const q=await b.newPage({viewport:{width:1700,height:400}});await q.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458;--line:#ccc;--surface:#fff}body{margin:0}</style>'+html);await q.screenshot({path:out+'/'+k.replace(':','_')+'.png',fullPage:true});await q.close();}
await b.close();})();
