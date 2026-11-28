const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const o=[];for(const c in LADDERS){if(!/^(LG|CORE)/.test(c))continue;LADDERS[c].levels.forEach((lv,i)=>{const k=c+':'+(i+1);const d=DRAW[lv.key]||DRAW[k];o.push({k,key:lv.key,tr:lv.tr,en:lv.en,dose:lv.dose,how:lv.how,draw:!!d,nk:d?d.k.length:0,front:d&&d.k.some(x=>x.front)});});}
 const st=Object.keys(DRAW).filter(k=>k.startsWith('ST:')).map(k=>({k,alt:DRAW[k].alt,nk:DRAW[k].k.length}));return {o,st};});
require('fs').writeFileSync('D_list.json',JSON.stringify(r,null,1));console.log(r.o.length,r.st.length);r.o.forEach(x=>console.log(x.k,x.key,'|',x.tr,'|',x.en,'|',x.nk,x.front?'F':''));r.st.forEach(x=>console.log(x.k,'|',x.alt,'|',x.nk));await b.close();})();
