const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const ks=JSON.parse(fs.readFileSync('D_list.json','utf8'));const codes=[...ks.o.map(x=>x.k),...ks.st.map(x=>x.k)];
const r=await p.evaluate(codes=>codes.map(k=>{const d=DRAW[k];if(!d)return k+' YOK';const su=setupOf(d)||[];const lv=(()=>{const [c,n]=k.split(':');const L=LADDERS[c];return L&&L.levels[+n-1];})();
 const caps=d.k.map(x=>x.cap||'').join(' | ');const cues=d.k.map((x,i)=>x.cue?i+':'+JSON.stringify(x.cue).slice(0,80):'').filter(Boolean).join(' ');
 return '### '+k+' — '+(d.alt||'')+(lv?'\nDOZ: '+lv.dose+'\nHOW: '+lv.how.join(' / '):'')+'\nKARELER: '+caps+'\nKURULUM: '+su.map((s,i)=>(i+1)+') '+(s.label||s.short||s.part)+(s.inset?' ['+s.inset+']':'')).join(' ; ');}),codes);
fs.writeFileSync('D_cues.txt',r.join('\n\n'));await b.close();})();
