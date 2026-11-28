// node an/sheetC.js file out.png N CODE... : rows of N frames + how + setup labels
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [f,out,N,...ks]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+f);await p.waitForTimeout(400);await p.evaluate(PAGE);
const html=await p.evaluate(([ks,N])=>ks.map(k=>{const d=DRAW[k];if(!d)return '<div>'+k+' YOK</div>';const {tot}=tlOf(d,1);const bb=AN.bb(d);let o='';
 for(let i=0;i<N;i++){const t=tot/2*i/(N-1);const r=poseAt(d,t);
  let s=svgFor(d,t).svg;if(!d.k.some(q=>q.front)&&!d.d13&&!d.d11)s=s.replace(/viewBox="[^"]*"/,'viewBox="'+[bb.x,bb.y,bb.w,bb.h].map(v=>v.toFixed(3)).join(' ')+'"');s=s.replace('<svg ','<svg style="width:100%;height:230px" ');
  o+='<div style="width:'+Math.floor(1690/N-4)+'px;display:inline-block;background:#eef1f3;margin:2px;vertical-align:top;font:10px sans-serif">'+s+'<div>'+(r.cap||'').slice(0,46)+'</div></div>';}
 const lv=AN.lv(k);const su=setupOf(d);return '<div style="border-top:3px solid #333;margin-top:4px"><div style="font:bold 14px sans-serif">'+k+' — '+(lv?lv.tr:'')+' ['+(d.alt||'')+']</div><div style="font:11px sans-serif">NASIL: '+(lv?lv.how.join(' | '):'')+'</div><div style="font:11px sans-serif;color:#a33">KURULUM: '+(su?su.map(x=>x.label).join(' | '):'-')+'</div>'+o+'</div>';}).join(''),[ks,+N]);
const q=await b.newPage({viewport:{width:1700,height:400}});await q.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458;--line:#ccc;--surface:#fff;--muted:#666}body{margin:0}</style>'+html);await q.screenshot({path:out,fullPage:true});await b.close();})();
