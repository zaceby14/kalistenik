const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
const [f,out,K]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const fr=await p.evaluate(K=>{const d=DRAW[K],su=setupOf(d),SD=1.9,L=su.length*SD+.4,tl=d._tl||(d._tl=timeline(d));const bb=AN.bb(d);bb.y-=bb.h*.12;bb.h*=1.12;bb.x-=bb.w*.06;bb.w*=1.12;d._b=bb;
   const T=[];su.forEach((s,i)=>{if(s.part==='pelvis')T.push([i*SD+SD*.2,'Kurulum (önce)']);T.push([i*SD+SD*.7,'Kurulum']);});
   let t=0;const segT=[];for(const s of tl){segT.push([t,s]);t+=s.d;}
   const h0=segT.find(([,s])=>s.a===0&&s.b===0),tr=segT.find(([,s])=>s.a===0&&s.b===1),h1=segT.find(([,s])=>s.a===1&&s.b===1);
   T.push([L+h0[0]+h0[1].d*.5,'Hareket'],[L+tr[0]+tr[1].d*.5,'Hareket'],[L+h1[0]+h1[1].d*.65,'Kilit kare']);
   return T.map(([tt,g])=>{const r=poseAt(d,tt);return [svgFor(d,tt).svg,(r.cap||''),g];});},K);
 const p2=await b.newPage({viewport:{width:1700,height:900},deviceScaleFactor:2});
 const css=':root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458;--surface:#fff;--line:#d8dee4;--muted:#5b6876}';
 let h='<style>'+css+'body{margin:0;background:#fff;font-family:system-ui,sans-serif}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:16px}.c{background:var(--stage);border-radius:10px;height:390px;position:relative;overflow:hidden}.c b{position:absolute;right:10px;bottom:10px;font:700 13px system-ui;color:#fff;background:#14191f;border-radius:6px;padding:2px 7px}.c i{position:absolute;left:10px;bottom:8px;right:130px;font:600 14px system-ui;color:#334;font-style:normal}.c svg{width:100%;height:100%}</style><div style="font:700 24px system-ui;padding:16px 16px 0">Scapular şınav — kurulum adımları → hareket (döngü)</div><div class="g">';
 fr.forEach(([s,c,g],i)=>{h+='<div class="c"><b>'+(i+1)+' · '+g+'</b>'+s+'<i>'+c+'</i></div>';});
 await p2.setContent(h+'</div>');await p2.screenshot({path:out,fullPage:true});await b.close();})();
