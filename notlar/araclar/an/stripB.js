// node an/stripB.js file outdir REGEX [N]
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');const fs=require('fs');
(async()=>{const [f,out,re,Nn]=process.argv.slice(2);const N=+Nn||10;fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1800,height:800}});await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
const lads=await p.evaluate(re=>Object.keys(LADDERS).filter(c=>new RegExp(re).test(c)),re);
for(const c of lads){const html=await p.evaluate(([c,N])=>{const L=LADDERS[c];let o='';L.levels.forEach((l,i)=>{const k=c+':'+(i+1),d=DRAW[k];if(!d)return;const P=tlOf(d,1).tot,b=AN.bb(d);
  o+=`<div style="font:bold 15px sans-serif;margin:8px 0 2px">${k} · ${l.tr}</div><div style="display:flex;gap:3px">`;
  for(let j=0;j<N;j++){const t=P*j/N+.01,r=poseAt(d,t),pp=r.p||r,m=AN.met(pp);let s=svgFor(d,t).svg.replace(/viewBox="[^"]*"/,'viewBox="'+[b.x,b.y,b.w,b.h].map(v=>v.toFixed(3)).join(' ')+'"');
   o+=`<div style="width:172px"><div style="height:160px;background:#eef1f3">${s.replace('<svg ','<svg style="width:100%;height:100%" ')}</div><div style="font:10px monospace">e${m.elb} h${m.hip} k${m.kn} dx${m.dxSH} sh${m.sh} rb${m.rb}</div></div>`;}
  o+='</div>';});return o;},[c,N]);
 await p.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#c9d1d8;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458;--bg:#fff}body{margin:4px;background:#fff}</style>'+html);
 await p.screenshot({path:out+'/'+c+'.png',fullPage:true});console.log(c);}
await b.close();})();
