const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const file=process.argv[2];const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate(()=>{const out=[];Object.keys(DRAW).forEach(k=>{const d=DRAW[k];if(!(d.props||[]).some(q=>q[0]==='floor'||q===FL))return;d.k.forEach((x,i)=>{if(x.front)return;const s=svgFor(d,AN.frameT(d,i)).svg;let mx=-9;
   (s.match(/<path d="M[^"]*Q[^"]*"/g)||[]).forEach(pth=>{const nums=pth.match(/-?\d+\.\d+/g).map(Number);for(let j=1;j<nums.length;j+=2)mx=Math.max(mx,nums[j]);});
   const J=joints(x);const hy=-(J.head[1]-.1);
   if(mx>.015||hy>.015)out.push(k+':'+i+' torsoBelow='+mx.toFixed(3)+' headBelow='+hy.toFixed(3)+' '+(x.cap||'').slice(0,30));});});return out;});
 console.log(r.join('\n'));console.log(r.length);await b.close();})();
