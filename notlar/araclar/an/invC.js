const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const out=[];for(const [c,L] of Object.entries(LADDERS)){if(!/^(PU|DIP|LS|FL)/.test(c))continue;L.levels.forEach((lv,i)=>{const dk=Object.keys(DRAW).find(k=>DRAW[k]===(lv.draw?DRAW[lv.draw]:null));out.push([c+':'+(i+1),lv.key,lv.tr,lv.type,!!DRAW[lv.key],DRAW[lv.key]?DRAW[lv.key].k.length:0]);});}return out;});
console.log(r.map(x=>x.join(' | ')).join('\n'));await b.close();})();
