const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{const o=[];const pre={};Object.keys(DRAW).forEach(k=>{const c=k.split(':')[0];pre[c]=(pre[c]||0)+1;});
 Object.entries(pre).forEach(([c,n])=>{const L=LADDERS[c];o.push(c+' ('+n+') '+(L?L.name+' :: '+L.levels.map((l,i)=>(i+1)+'.'+l.tr).join(' | '):''));});return o.join('\n');}));await b.close();})();
