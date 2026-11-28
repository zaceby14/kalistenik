// node an/famsheet.js file fam out.png : her çizim için [en büyük sapmalı kurulum karesi | son kilit kare]
const { chromium } = require('playwright');
(async()=>{const [f,fam,out]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+f);await p.waitForTimeout(400);
const r=await p.evaluate(fam=>{const pts=J=>[J.T,J.P,J.head,...J.arms.flatMap(a=>[a[0],a[1]]),...J.legs.flatMap(l=>[l[0],l[1]])];const o=[];
 Object.entries(DRAW).forEach(([k,d])=>{const su=setupOf(d);if(!su||d._fam!==fam)return;const P0=pts(joints(d.k[0]));let best=[0,0];
  for(let t=0;t<suLen(su);t+=.1){const P=pts(joints(poseAt(d,t).p));const dv=Math.max(...P.map((q,n)=>Math.hypot(q[0]-P0[n][0],q[1]-P0[n][1])));if(dv>best[0])best=[dv,t];}
  const tl=d._tl||(d._tl=timeline(d));let t=0,tl2=0;const last=d.k.length-1;for(const s of tl){if(s.a===last&&s.b===last){tl2=t+s.d*.6;break;}t+=s.d;}
  const r1=poseAt(d,best[1]);o.push([k,d.alt||'',svgFor(d,best[1]).svg,(r1.su?r1.su.st.short:'')+' · '+(best[0]*100).toFixed(1)+' cm',svgFor(d,suLen(su)+tl2).svg]);});return o;},fam);
const p2=await b.newPage({viewport:{width:1800,height:900},deviceScaleFactor:1.2});
let h='<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#d9913a;--surface:#fff;--line:#d8dee4;--muted:#5b6876;--ok:#2a8150}body{margin:0;font-family:system-ui;background:#fff}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px}.c{border:1px solid #dde;border-radius:8px;padding:4px}.c .t{font:600 12px system-ui}.c .r{display:grid;grid-template-columns:1fr 1fr;gap:4px}.c .r div{background:var(--stage);height:190px;position:relative}.c svg{width:100%;height:100%}.c i{position:absolute;left:4px;bottom:2px;font:600 11px system-ui;color:#c33;font-style:normal}</style><div class="g">';
r.forEach(([k,a,s1,l,s2])=>{h+='<div class="c"><div class="t">'+k+' · '+a+'</div><div class="r"><div>'+s1+'<i>'+l+'</i></div><div>'+s2+'</div></div></div>';});
await p2.setContent(h+'</div>');await p2.screenshot({path:out,fullPage:true});console.log(r.length);await b.close();})();
