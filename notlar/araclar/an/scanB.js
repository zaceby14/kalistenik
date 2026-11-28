// dense scan of plain round: per level min/max of metrics
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [f,re]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
const r=await p.evaluate(re=>{const out=[];Object.keys(LADDERS).filter(c=>new RegExp(re).test(c)).forEach(c=>LADDERS[c].levels.forEach((l,i)=>{const k=c+':'+(i+1),d=DRAW[k];if(!d)return;
 const M=tlOf(d,1).tot,N=60;const acc={};const add=(n,v)=>{if(v==null||isNaN(v))return;acc[n]=acc[n]||[1e9,-1e9];acc[n][0]=Math.min(acc[n][0],v);acc[n][1]=Math.max(acc[n][1],v);};
 let toes=new Set();
 for(let j=0;j<N;j++){const t=M*j/N+.001;const pp=poseAt(d,t).p;if(pp.front)continue;const J=joints(pp),m=AN.met(pp);add('elb',m.elb);add('dx',m.dxSH);add('hip',m.hip);add('kn',m.kn);
  const a=J.arms[J.arms.length-1];if(a){const fa=Math.atan2(a[0][0]-a[1][0],a[0][1]-a[1][1])*180/Math.PI;add('fore',Math.round(fa));}
  add('Py-Sy',+(J.P[1]-J.S[1]).toFixed(2));(pp.feet||[]).forEach(ff=>{const o=ff.find(x=>typeof x==='string');const onfl=ff[1]<.2;toes.add((o||'-')+(onfl?'':'^'));});}
 out.push(k+' '+Object.entries(acc).map(([n,v])=>n+'['+v.map(x=>typeof x==='number'?+x.toFixed?.(2)??x:x).join(',')+']').join(' ')+' st:'+[...toes].join(''));}));return out.join('\n');},re);
console.log(r);await b.close();})();
