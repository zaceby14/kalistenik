// Kurulum testi: her çizim × her adım: NaN yok, etiket kadrajda, etiket-inset çakışmaz, inset kadrajda, inset figürü kapatmaz, poz gerçekten değişir (mod)
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const bad=[],warn=[];let n=0,steps=0,nomod=0;const ov=(a,c)=>a[0]<c[2]&&a[2]>c[0]&&a[1]<c[3]&&a[3]>c[1];
 Object.entries(DRAW).forEach(([k,d])=>{const su=setupOf(d);if(!su)return;n++;const SD=suDur(su);
  su.forEach((s,i)=>{steps++;window.SULOG=[];const t=i*SD+SD*.7,sv=svgFor(d,t).svg;const L=window.SULOG;window.SULOG=null;const id=k+' #'+(i+1)+' '+s.part;
   if(sv.includes('NaN'))bad.push(id+' NaN');if(!L.length){bad.push(id+' çizilmedi');return;}const o=L[0],B=o.b;
   if(o.lab[0]<B[0]-.02||o.lab[2]>B[2]+.02||o.lab[1]<B[1]-.02)bad.push(id+' etiket kadraj dışı');
   if(o.ins){if(ov(o.lab,o.ins))bad.push(id+' etiket-inset çakışma');if(o.ins[0]<B[0]-.01||o.ins[2]>B[2]+.01||o.ins[1]<B[1]-.01)bad.push(id+' inset kadraj dışı');if(o.cover>1)warn.push(id+' inset figür/prop üstünde ('+o.cover+')');}
   if(s.inset&&!o.ins)bad.push(id+' inset yok: '+s.inset);
   // poz değişimi: adım başı vs sonu
   const p0=poseAt(d,i*SD+SD*.2).p,p1=poseAt(d,i*SD+SD*.95).p,J0=joints(p0),J1=joints(p1);
   const dif=[J0.T,J0.P,J0.head,...J0.arms.map(a=>a[0]),...J0.legs.map(l=>l[0])].reduce((m,q,j)=>{const q1=[J1.T,J1.P,J1.head,...J1.arms.map(a=>a[0]),...J1.legs.map(l=>l[0])][j];return Math.max(m,Math.hypot(q[0]-q1[0],q[1]-q1[1]));},0);
   const vis=dif>.012||(p0.lb||0)!==(p1.lb||0)||(p0.rb||0)!==(p1.rb||0)||(p0.pr||0)!==(p1.pr||0)||(p0._er||0)!==(p1._er||0)||!!s.inset||p0.feet.some((f,j)=>f[4]!==(p1.feet[j]||[])[4])||(p0.h||0)!==(p1.h||0)||(p0.sh||0)!==(p1.sh||0)||(p0.tw||0)!==(p1.tw||0);
   if(!vis){nomod++;warn.push(id+' pozda görünür değişim yok');}
  });});return{n,steps,nomod,bad,warn};});
console.log('kurulumlu çizim:',r.n,'adım:',r.steps,'hata:',r.bad.length,'uyarı:',r.warn.length,'değişimsiz adım:',r.nomod);console.log(r.bad.slice(0,40).join('\n'));console.log('--uyarı örnek--\n'+r.warn.slice(0,25).join('\n'));console.log(er);await b.close();})();
