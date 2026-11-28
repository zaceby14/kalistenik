// İnset bbox testi: yazılar kutu içinde mi, yazılar birbirine ve çizime biniyor mu, çizim kutudan taşıyor mu (taşan kısım kırpılır ama raporlanır)
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:600,height:600}});await p.goto('file://'+process.argv[2]);await p.waitForTimeout(300);
const ks=await p.evaluate(()=>Object.keys(INSET));const bad=[],warn=[];
await p.addStyleTag({content:':root{--ink:#14191f;--accent:#e4572e;--surface:#fff;--line:#d8dee4;--muted:#5b6876;--prop:#9aa4ad;--ok:#2a8150;--towel:#d9913a}'});
for(const k of ks){const r=await p.evaluate(k=>{document.body.innerHTML='<svg id="T" viewBox="0 0 100 80" style="width:500px;height:400px;position:absolute;left:0;top:0">'+insetSvg(k,{x:-2,y:0,w:100,h:80},0,true,100)+'</svg>';
  const sv=document.getElementById('T'),R=sv.getBoundingClientRect(),s=R.width/100,box=e=>{const q=e.getBoundingClientRect();return[(q.left-R.left)/s,(q.top-R.top)/s,(q.right-R.left)/s,(q.bottom-R.top)/s];};
  const texts=[...sv.querySelectorAll('text')].map(e=>({t:e.textContent,b:box(e)}));const shapes=[...sv.querySelectorAll('line,path,rect,circle,ellipse')].filter(e=>!e.closest('defs')).slice(1).map(e=>{const b=box(e);const cl=e.closest('[clip-path^="url(#icd"]');if(cl){b[3]=Math.min(b[3],k==='arm-front'?64.5:63.5);}return b;}).filter(b=>(b[2]-b[0]>0||b[3]-b[1]>0)&&b[1]<b[3]);
  return{texts,shapes};},k);
 const ov=(a,c,m=0)=>a[0]<c[2]-m&&a[2]>c[0]+m&&a[1]<c[3]-m&&a[3]>c[1]+m;
 r.texts.forEach((x,i)=>{const B=x.b;if(B[0]<-.5||B[2]>100.5||B[1]<-.5||B[3]>80.5)bad.push(k+': yazı kutu dışı "'+x.t+'"');
  r.texts.forEach((y,j)=>{if(j>i&&ov(B,y.b,.6))bad.push(k+': yazı-yazı çakışma "'+x.t+'" / "'+y.t+'"');});
  if(r.shapes.some(sh=>ov(B,sh,.2)))bad.push(k+': yazı çizime yakın/üstünde "'+x.t+'"');});
 r.shapes.forEach(sh=>{if(sh[0]<-1||sh[2]>101||sh[1]<-1||sh[3]>81)warn.push(k+': çizim kutudan taşıyor (kırpıldı) '+sh.map(v=>v.toFixed(0)).join(','));});}
console.log('inset:',ks.length,'hata:',bad.length,'uyarı:',warn.length);console.log(bad.join('\n'));console.log('--uyarı--\n'+warn.join('\n'));await b.close();})();
