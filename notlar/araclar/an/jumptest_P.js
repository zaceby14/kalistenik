// Kurulum sıçrama testi: her adımda eklemlerin doğru kurulum pozundan sapması (> 8 cm ya da segment açısı > 20°) ve kare-kare süreklilik
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const out=[];const pts=J=>[J.T,J.P,J.head,...J.arms.flatMap(a=>[a[0],a[1]]),...J.legs.flatMap(l=>[l[0],l[1]])];
 const segs=J=>[[J.P,J.T],...J.arms.flatMap(a=>[[a[3],a[0]],[a[0],a[1]]]),...J.legs.flatMap(l=>[[l[4],l[0]],[l[0],l[1]]])];
 const ang=(s)=>Math.atan2(s[1][1]-s[0][1],s[1][0]-s[0][0]);
 Object.entries(DRAW).forEach(([k,d])=>{const su=setupOf(d);if(!su)return;const SD=suDur(su),J0=joints(d.k[0]),P0=pts(J0),S0=segs(J0);let worst={d:0,a:0,step:''},prev=null,cont=0;
  for(let t=0;t<suLen(su);t+=.05){const r=poseAt(d,tlOf(d,1).tot+t),J=joints(r.p),P=pts(J),S=segs(J);
   P.forEach((q,j)=>{const dd=Math.hypot(q[0]-P0[j][0],q[1]-P0[j][1]);if(dd>worst.d){worst.d=dd;worst.step=r.su?r.su.st.part:'-';}});
   S.forEach((s,j)=>{let da=Math.abs(ang(s)-ang(S0[j]))*180/Math.PI;if(da>180)da=360-da;if(da>worst.a){worst.a=da;worst.astep=r.su?r.su.st.part:'-';}});
   if(prev)P.forEach((q,j)=>{const dd=Math.hypot(q[0]-prev[j][0],q[1]-prev[j][1]);if(dd>cont)cont=dd;});prev=P;}
  out.push([k,+worst.d.toFixed(3),worst.step,+worst.a.toFixed(1),worst.astep,+cont.toFixed(3)]);});
 return out;});
const bad=r.filter(x=>x[1]>.08||x[3]>20);console.log('çizim:',r.length,'sınır aşan:',bad.length,'en büyük kare-kare adım:',Math.max(...r.map(x=>x[5])).toFixed(3));
bad.sort((a,b)=>b[1]-a[1]).slice(0,40).forEach(x=>console.log(x.join(' | ')));await b.close();})();
