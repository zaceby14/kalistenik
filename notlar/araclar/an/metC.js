// node an/metC.js file CODE... : dense metrics over plain motion
const { chromium } = require('playwright');
(async()=>{const [f,...ks]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+f);await p.waitForTimeout(400);
const r=await p.evaluate((ks)=>{const D=180/Math.PI,ang=(a,b,c)=>{const u=[a[0]-b[0],a[1]-b[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.round(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))))*D);};
 const dir=(a,b)=>Math.round(Math.atan2(b[1]-a[1],b[0]-a[0])*D);
 const M=p=>{const J=joints(p),a=J.arms[0],l=J.legs[J.legs.length-1];const o={};
  if(a){o.elb=ang(a[3],a[0],a[1]);o.fa=dir(a[1],a[0]);o.ua=dir(a[0],a[3]);o.SyE=+(a[3][1]-a[0][1]).toFixed(2);o.SxH=+(a[3][0]-a[1][0]).toFixed(2);}
  o.tor=dir(J.P,J.S);if(l){o.hip=ang(J.S,J.P,l[0]);o.kn=ang(J.P,l[0],l[1]);o.leg=dir(J.P,l[1]);}
  o.hy=+J.head[1].toFixed(2);o.sh=+(p.sh||0).toFixed(2);o.PxH=a?+(J.P[0]-a[1][0]).toFixed(2):null;return o;};
 const out={};for(const k of ks){const d=DRAW[k];if(!d){out[k]='YOK';continue;}const {tot}=tlOf(d,1);const fr=[];
  for(let i=0;i<=12;i++){const t=tot/2*i/12;const q=poseAt0(d,t,1);fr.push(M(q.p));}
  out[k]={alt:d.alt,front:d.k.some(p=>p.front),k:d.k.map(M),fr};}
 return out;},ks);
for(const [k,v] of Object.entries(r)){if(v==='YOK'){console.log(k,'YOK');continue;}console.log('##',k,v.alt,v.front?'FRONT':'');v.k.forEach((m,i)=>console.log(' k'+i,JSON.stringify(m)));
 const keys=['elb','fa','tor','hip','leg'];const ext={};keys.forEach(x=>{const vs=v.fr.map(m=>m[x]).filter(z=>z!=null);if(vs.length)ext[x]=[Math.min(...vs),Math.max(...vs)];});console.log(' range',JSON.stringify(ext));}
await b.close();})();
