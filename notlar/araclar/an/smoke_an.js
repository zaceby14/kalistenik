// Duman testi: tüm günler, her hareket sayfası, tam antrenman, kayıt sekmesi, profil değiştirme, PIN pad
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const A=(c,m)=>{(c?ok:errs).push(m);};
for(const scheme of ['light','dark']){try{
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,colorScheme:scheme});const p=await ctx.newPage();
p.on('pageerror',e=>errs.push(scheme+' PAGEERROR '+e.message));
p.on('console',m=>{if(m.type()==='error'&&!/net::|Failed to load|ERR_|fonts|youtube|firestore|firebase/i.test(m.text()))errs.push(scheme+' CONSOLE '+m.text());});
await p.addInitScript(()=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();localStorage.setItem('kal-profil','misafir');}});
await p.goto('file:///tmp/claude-0/-home-claude/4e0afc3b-f6da-5540-b1d6-a07bf749f5e8/scratchpad/index_anatomi.html');await p.waitForTimeout(600);
// her gün + her hareket sayfası
for(const g of ['g1','g2','g3']){await p.click(`[data-tab="${g}"]`);await p.waitForTimeout(250);
  const ids=await p.$$eval('#view [data-slot]',x=>x.map(e=>e.dataset.slot));A(ids.length===7,`${scheme} ${g}: 7 kart (${ids.length})`);
  A(await p.$('#view .hero [data-run]')!==null,`${scheme} ${g}: hero başlat düğmesi`);
  for(const id of ids){await p.click(`#view [data-slot="${id}"]`);await p.waitForTimeout(120);
    const vis=await p.evaluate(()=>!document.getElementById('sheet').hidden&&!!document.querySelector('#sheet .lvname'));A(vis,`${scheme} sayfa ${id}`);
    const alt=await p.$('#sheet .altc:not(.on)');if(alt){await alt.click();await p.waitForTimeout(80);A(!!(await p.$('#sheet [data-altuse]')),`${scheme} ${id} alternatif önizleme`);}
    const lv=await p.$('#sheet .lv.lock');if(lv){await lv.click();await p.waitForTimeout(80);A(!!(await p.$('#pick')),`${scheme} ${id} seviye incele`);}
    await p.click('#back');await p.waitForTimeout(450);}}
// ısınma sekmesi işaretleme
await p.click('[data-tab="isinma"]');await p.waitForTimeout(200);await p.click('[data-wchk]');A((await p.textContent('[data-wcount="WARM"]')).startsWith('1/'),`${scheme} ısınma işaret sayacı`);
// tam antrenman
await p.click('[data-tab="g1"]');await p.waitForTimeout(200);await p.click('[data-run="g1"]');await p.waitForTimeout(400);
A((await p.textContent('[data-wcount="WARM"]')).startsWith('1/'),`${scheme} işaret antrenmanda da görünüyor`);
let guard=0;
while(guard++<20){const k=await p.evaluate(()=>run.steps[run.i].k);if(k==='fin')break;
  if(k==='ex'){const isHold=await p.$('[data-rhold]');
    if(isHold){await p.click('[data-rhold]');await p.evaluate(()=>{run.hw.t-=40000;});await p.waitForTimeout(300);await p.click('[data-rhold]');await p.waitForTimeout(200);}
    const n=await p.$$eval('#run [data-rset]',x=>x.length);for(let j=0;j<n;j++){if(!(await p.$eval(`#run [data-rset="${j}"]`,e=>e.classList.contains('done'))))await p.click(`#run [data-rset="${j}"]`);await p.waitForTimeout(60);}
    A(await p.evaluate(()=>run.done[run.steps[run.i].s.id].every(Boolean)),`${scheme} adım ${await p.evaluate(()=>run.i)} setler tamam`);
    await p.click('[data-rfb="k"]');await p.waitForTimeout(60);}
  await p.click('[data-rnext]');await p.waitForTimeout(250);}
A(await p.evaluate(()=>run.steps[run.i].k==='fin'),`${scheme} bitiş ekranı`);
await p.waitForTimeout(1200);const setTxt=await p.$eval('.sum .stat:nth-child(2) .big',e=>e.textContent);A(/^24\s*\/\s*24$/.test(setTxt.replace(/\s+/g,' ').trim()),`${scheme} set özeti ${setTxt}`);
await p.fill('#runnote','duman testi');await p.click('[data-rsave]');await p.waitForTimeout(400);
A(await p.evaluate(()=>run===null&&state.log[0].note.includes('duman testi')),`${scheme} antrenman kaydedildi`);
A(!!(await p.$('.toast')),`${scheme} toast görünür`);
// kayıt sekmesi
await p.click('[data-tab="kayit"]');await p.waitForTimeout(300);A(await p.$$eval('.tl .logi',x=>x.length)>=7,`${scheme} kayıt zaman çizelgesi`);
await p.click('.tnew summary');await p.fill('#t-ctw','35');await p.click('#tsave');await p.waitForTimeout(200);A(await p.evaluate(()=>state.tests.length===1),`${scheme} test kaydı`);
const n0=await p.evaluate(()=>state.log.length);await p.click('[data-del="0"]');await p.waitForTimeout(100);A(await p.evaluate(n=>state.log.length===n,n0),`${scheme} sil: ilk dokunuş silmez`);
await p.click('[data-del="0"]');await p.waitForTimeout(150);A(await p.evaluate(n=>state.log.length===n-1,n0),`${scheme} sil: ikinci dokunuş siler`);
await p.click('#bkout');await p.waitForTimeout(150);A((await p.inputValue('#bktxt')).includes('"kal":2'),`${scheme} yedek kopyala`);
// profil değiştir + PIN
await p.click('#profsw');await p.waitForSelector('.prof [data-prof="zeynel"]',{timeout:8000}).catch(()=>{});A(!!(await p.$('.prof [data-prof="zeynel"]')),`${scheme} profil seçici`);
await p.click('[data-prof="zeynel"]');await p.waitForTimeout(300);for(const k of ['1','2','3','4'])await p.click(`[data-k="${k}"]`);
A((await p.$$('.pw-dots i.on')).length===4,`${scheme} PIN noktaları`);await p.click('[data-k="del"]');A((await p.$$('.pw-dots i.on')).length===3,`${scheme} PIN sil`);
await p.click('[data-k="ok"]');await p.waitForTimeout(400);A((await p.textContent('#pwm'))==='Şifre yanlış',`${scheme} yanlış şifre mesajı`);
await p.click('#pwb');await p.waitForTimeout(200);await p.click('[data-prof="misafir"]');await p.waitForSelector('#hello .hi',{timeout:8000}).catch(()=>{});A((await p.textContent('#hello')).includes('Misafir')&&!(await p.$('.prof')),`${scheme} misafir geri döndü`);
}catch(e){errs.push(scheme+' İSTİSNA '+e.message.split('\n')[0]);}}
console.log('GEÇEN:',ok.length);console.log(errs.length?'HATALAR:\n'+errs.join('\n'):'HATA YOK');await b.close();})();
