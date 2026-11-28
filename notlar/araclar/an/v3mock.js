const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
// ROWS: code:frame, label, cues
const ROWS=[['ST:scapular push ups:0','Scapular şınav: sık',['scap']],['ST:scapular push ups:1','Scapular şınav: aç',['scap']],
 ['PL_LEAN:5:1','Planche lean',['plumb','scap']],['HS_PARA:1:2','Push barda pike',['plumb','ang:hip']],
 ['PU_VERT:6:1','Barfiks: kürek aşağı',['dep']],['PU_VERT:6:2','Barfiks üstü',['ang:elb']],
 ['CORE_HOLLOW:7:1','Hollow',['bel']],['LS_HOLD:6:1','L-sit',['ang:hip','dep']]];
(async()=>{const [f1,f2,out]=process.argv.slice(2);const b=await chromium.launch();
 const get=async(f,cue)=>{const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
  const r=await p.evaluate(([R,cue])=>R.map(([x,,c])=>{const j=x.lastIndexOf(':'),k=x.slice(0,j),i=+x.slice(j+1);const d=DRAW[k];if(cue){d.k[i].cue=c;d._tl=null;d._tot=null;}
   const tl=d._tl||(d._tl=timeline(d));let t=0;for(const s of tl){if(s.a===i&&s.b===i){t+=s.d*.6;break;}t+=s.d;}
   const bb=AN.bb(d);d._b=bb;const sv=svgFor(d,t).svg;return sv.replace(/viewBox="[^"]*"/,'viewBox="'+[bb.x,bb.y,bb.w,bb.h].map(v=>v.toFixed(3)).join(' ')+'"');}),[ROWS,cue]);await p.close();return r;};
 const A=await get(f1,0),B=await get(f2,1);const p=await b.newPage({viewport:{width:1640,height:900},deviceScaleFactor:2});
 const css=':root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458}';
 let h='<style>'+css+'body{margin:0;background:#fff;font-family:system-ui,sans-serif}.g{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:16px}.r{border:1px solid #dde;border-radius:12px;padding:8px}.t{font:600 17px system-ui;margin:2px 4px 6px}.c{display:grid;grid-template-columns:1fr 1fr;gap:8px}.c div{background:var(--stage);border-radius:8px;height:360px;position:relative}.c span{position:absolute;left:8px;top:6px;font:600 13px system-ui;color:#556}.c svg{width:100%;height:100%}</style><div style="font:700 24px system-ui;padding:16px 16px 0">Çöp adam: şimdiki → yeni (anatomi + koç çizgileri)</div><div class="g">';
 ROWS.forEach(([x,l],i)=>{h+='<div class="r"><div class="t">'+l+'</div><div class="c"><div><span>Şimdi</span>'+A[i]+'</div><div><span>Yeni</span>'+B[i]+'</div></div></div>';});
 await p.setContent(h+'</div>');await p.screenshot({path:out,fullPage:true});await b.close();})();
