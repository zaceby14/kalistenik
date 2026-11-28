const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('file:///home/claude/kalistenik/index.html');await p.evaluate(()=>{localStorage.clear();localStorage.setItem('kal-profil','misafir')});await p.reload();await p.waitForTimeout(1500);
const info=await p.evaluate(()=>{let s=null;DAYS.forEach(d=>d.slots.forEach(x=>{if(!s&&x.lad==='PL_PUSH')s=x;}));if(!s)return null;openSlot(s.id);return s.id+' lvl '+lvlOf(s);});
await p.waitForTimeout(50);const t0=Date.now();const shots=[];
for(const ts of [0,1,3,6]){const w=t0+ts*1000-Date.now();if(w>0)await p.waitForTimeout(w);const el=await p.$('.stage .anim,[data-draw]');await el.scrollIntoViewIfNeeded();const box=await el.boundingBox();
 const cap=await p.evaluate(()=>{const c=document.querySelector('[data-cap]');return c?c.textContent:'';});shots.push([ts,await el.screenshot({type:'png'}),cap]);}
const p2=await b.newPage({viewport:{width:1400,height:500}});
await p2.setContent('<body style="margin:0;font-family:system-ui;display:flex;gap:10px;padding:10px;background:#fff">'+shots.map(([ts,buf,cap])=>'<div style="width:330px"><b>'+ts+' sn</b><br><img style="width:330px" src="data:image/png;base64,'+buf.toString('base64')+'"><div style="font:13px system-ui">'+cap+'</div></div>').join('')+'</body>');
await p2.screenshot({path:'pppu_acilis.png',fullPage:true});console.log(info,er);await b.close();})();
