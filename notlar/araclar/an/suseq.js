// node an/suseq.js FILE OUTDIR CODE... -> each code: setup steps (t at 60%) + key cue frames, zoomed
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [f,od,...ks]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:300}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+f);await p.waitForTimeout(400);await p.evaluate(PAGE);
for(const k of ks){const html=await p.evaluate(k=>{const d=DRAW[k];if(!d)return null;const su=setupOf(d)||[];const P=tlOf(d,1).tot,SD=su.length?suDur(su):0,L=su.length?suLen(su):0;
  let o='';const cell=(t,lab)=>{const s=svgFor(d,t).svg.replace('<svg ','<svg width="190" height="190" ');return '<div style="width:192px;display:inline-block;vertical-align:top;margin:1px"><div style="background:#eef1f3">'+s+'</div><div style="font:10px sans-serif;height:26px;overflow:hidden">'+lab+'</div></div>';};
  su.forEach((st,i)=>{o+=cell(P+i*SD+SD*.65,(i+1)+') '+(st.label||''));});
  const tl=tlOf(d,0);let t=P+L;const segs=tl.segs||d._tl||[];
  d.k.forEach((x,i)=>{if(!x.cue)return;let tt=P+L;for(const s of (d._tl||timeline(d))){if(s.a===i&&s.b===i){tt+=s.d*.6;break;}tt+=s.d;}o+=cell(tt,'kilit '+i+': '+(x.cap||''));});
  return '<div style="font:bold 13px sans-serif">'+k+' — '+(d.alt||'')+'</div>'+o;},k);
 if(!html){console.log('YOK',k);continue;}
 await p.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#c9d1d8;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458;--muted:#555;--line:#ccc;--surface:#fff;--ok:#2a8}body{margin:3px;font-family:sans-serif}</style>'+html);
 await p.screenshot({path:od+'/'+k.replace(/[^A-Za-z0-9]/g,'_')+'.png',fullPage:true});}
console.log('errs',errs.slice(0,3));await b.close();})();
