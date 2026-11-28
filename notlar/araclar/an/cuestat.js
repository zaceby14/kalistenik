const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(400);
console.log(await p.evaluate(()=>{let n=0,w=0,none=[];const cnt={};Object.entries(DRAW).forEach(([k,d])=>{n++;const c=d.k.flatMap(p=>p.cue||[]);if(c.length)w++;else none.push(k);c.forEach(x=>cnt[x]=(cnt[x]||0)+1);});return JSON.stringify({n,w,cnt,none})}),er);await b.close();})();
