// node an/aile.js file outdir [fam=KEY ...]  -> aile_<fam>.png
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
const [f,out,...pick]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(400);await p.evaluate(PAGE);
 const res=await p.evaluate(pick=>{const fams={};Object.entries(DRAW).forEach(([k,d])=>{const su=setupOf(d);if(!su)return;(fams[d._fam]=fams[d._fam]||[]).push(k);});
  const want={};pick.forEach(x=>{const [a,c]=x.split('=');want[a]=c;});
  const out={};Object.entries(fams).forEach(([fam,keys])=>{if(pick.length&&!want[fam])return;const k=want[fam]&&want[fam]!=='*'?want[fam]:keys[0],d=DRAW[k],su=setupOf(d),SD=suDur(su),L=suLen(su),tl=d._tl||(d._tl=timeline(d));
   d._b=null;const T=[];su.forEach((s,i)=>T.push([i*SD+SD*.72,(i+1)+'. kurulum']));
   let t=0;const segs=[];for(const s of tl){segs.push([t,s]);t+=s.d;}const last=d.k.length-1,hl=segs.find(([,s])=>s.a===last&&s.b===last)||segs[0],tr=segs.find(([,s])=>s.a!==s.b);
   if(tr)T.push([L+tr[0]+tr[1].d*.5,'hareket']);T.push([L+hl[0]+hl[1].d*.65,'kilit kare']);
   out[fam]={k,alt:d.alt||'',n:keys.length,fr:T.map(([tt,g])=>{const r=poseAt(d,tt);return[svgFor(d,tt).svg,r.cap||'',g];})};});return out;},pick);
 const css=':root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#d9913a;--surface:#fff;--line:#d8dee4;--muted:#5b6876;--ok:#2a8150}';
 const p2=await b.newPage({viewport:{width:1700,height:900},deviceScaleFactor:1.6});
 for(const [fam,r] of Object.entries(res)){let h='<style>'+css+'body{margin:0;background:#fff;font-family:system-ui,sans-serif}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:16px}.c{background:var(--stage);border-radius:10px;height:420px;position:relative;overflow:hidden}.c b{position:absolute;right:10px;bottom:10px;font:700 13px system-ui;color:#fff;background:#14191f;border-radius:6px;padding:2px 7px}.c i{position:absolute;left:10px;bottom:8px;right:120px;font:600 14px system-ui;color:#334;font-style:normal}.c svg{width:100%;height:360px}</style><div style="font:700 22px system-ui;padding:16px 16px 0">Aile: '+fam+' — örnek: '+r.alt+' ('+r.k+') · bu ailede '+r.n+' çizim</div><div class="g">';
  r.fr.forEach(([s,c,g])=>{h+='<div class="c"><b>'+g+'</b>'+s+'<i>'+c+'</i></div>';});
  await p2.setContent(h+'</div>');await p2.screenshot({path:out+'/aile_'+fam+'.png',fullPage:true});}
 console.log(Object.entries(res).map(([f,r])=>f+':'+r.k+'('+r.n+')').join('  '),er);await b.close();})();
