const { chromium } = require('playwright');
(async()=>{const [f,re]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);
console.log(await p.evaluate(re=>{const o=[];Object.keys(LADDERS).filter(c=>new RegExp(re).test(c)).forEach(c=>LADDERS[c].levels.forEach((l,i)=>{const k=c+':'+(i+1),d=DRAW[k];if(!d)return;const su=setupOf(d)||[];
 o.push(k+' '+l.tr+' || '+su.map((s,j)=>(j+1)+'.'+(s.label||s.short)+(s.inset?' ['+s.inset+']':'')).join(' | '));
 const cues=d.k.map((x,j)=>x.cue?j+':'+JSON.stringify(x.cue).slice(0,60):'').filter(Boolean);if(cues.length)o.push('   cue '+cues.join(' '));}));return o.join('\n');},re));await b.close();})();
