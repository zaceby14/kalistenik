const { chromium } = require('playwright');
(async()=>{const file=process.argv[2];const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);
 const r=await p.evaluate(()=>{const used=[],miss=[];Object.entries(LADDERS).forEach(([c,L])=>L.levels.forEach((l,i)=>{const k=c+':'+(i+1);(DRAW[k]?used:miss).push(k);}));
  const extra=Object.keys(DRAW).filter(k=>!k.startsWith('ST:')&&!used.includes(k));return {n:used.length,miss,extra,lads:Object.keys(LADDERS)};});
 console.log(JSON.stringify(r));await b.close();})();
