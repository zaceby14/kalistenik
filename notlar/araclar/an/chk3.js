// hip/shoulder signed angles: flex(+) toward chest, ext(-) toward back
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [file,thr]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate((thr)=>{const out=[];const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],cr=(a,b)=>a[0]*b[1]-a[1]*b[0],dt=(a,b)=>a[0]*b[0]+a[1]*b[1];
  const sang=(dn,ch,u)=>{const a=Math.atan2(cr(dn,u),dt(dn,u))/RD0;return Math.sign(cr(dn,ch))*a;};
  Object.keys(DRAW).forEach(k=>{const d=DRAW[k];d.k.forEach((p,i)=>{if(p.front)return;const J=joints(p);if(!J.bk)return;const ch=[-J.bk[0],-J.bk[1]],dn=sub(J.P,J.T);
    J.legs.forEach(([kn,f,far,st,o],li)=>{const h=sang(dn,ch,sub(kn,o));if(h<-thr)out.push(k+':'+i+' leg'+li+' hipExt='+Math.round(-h)+' | '+(p.cap||'').slice(0,40));});
  });});return out;},+thr);
 console.log(r.join('\n'));console.log(r.length);await b.close();})();
