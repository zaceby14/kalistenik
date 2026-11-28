const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);
console.log(await p.evaluate(K=>K.map(k=>k+' | '+(DRAW[k]?DRAW[k].k.map((x,i)=>i+':'+x.cap+(x.sc?' sc':'')+(x.pr?' pr'+x.pr:'')+(x.sh?' sh'+x.sh:'')+(x.rb?' rb'+x.rb:'')+(x.lb?' lb'+x.lb:'')).join(' / '):'YOK')).join('\n'),process.argv.slice(3)));await b.close();})();
