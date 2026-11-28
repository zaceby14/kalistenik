const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const file=process.argv[2];const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate(()=>Object.keys(DRAW).map(k=>[k,DRAW[k].k.length,(AN.lv(k)||{}).tr||DRAW[k].alt]));
 console.log(JSON.stringify(r));await b.close();})();
