const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(500);
const r=await p.evaluate(()=>{const out=[];const keysOf=d=>Object.keys(DRAW).filter(k=>DRAW[k]===d);for(const [c,L] of Object.entries(LADDERS)){if(!/^(PU|DIP|LS)/.test(c))continue;L.levels.forEach((lv,i)=>{const d=DRAW[c+':'+(i+1)];out.push([c+':'+(i+1),lv.tr,d?d.alt:'-',d?d.k.length:0,d?keysOf(d).filter(k=>k!==c+':'+(i+1)).join(','):'',d&&d.k.some(p=>p.front)?'front':'']);});}return out;});
console.log(r.map(x=>x.join(' | ')).join('\n'));await b.close();})();
