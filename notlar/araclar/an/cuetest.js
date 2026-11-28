// Koç çizgisi testi: her işaret doğru eklemde mi, doğru tarafta mı, etiket hareketin kilit kuralına uyuyor mu, yazı kadrajda mı
const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const bad=[],warn=[];let n=0;const near=(a,c)=>Math.hypot(a[0]-c[0],a[1]-c[1])<1e-6;
 const A3=(a,b,c)=>{const u=[a[0]-b[0],a[1]-b[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.round(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))))/RD0);};
 Object.entries(DRAW).forEach(([k,d])=>{const tl=d._tl||(d._tl=timeline(d));const c0=k.split(':')[0];
  d.k.forEach((p,i)=>{if(!p.cue)return;const su_=setupOf(d);let t=su_?suLen(su_):0;for(const s of tl){if(s.a===i&&s.b===i){t+=s.d*.6;break;}t+=s.d;}
   window.CUELOG=[];const sv=svgFor(d,t).svg;const L=window.CUELOG;window.CUELOG=null;n++;const id=k+'#'+i;
   if(sv.includes('NaN'))bad.push(id+' NaN');
   if(!/<g opacity="(0\.[5-9]|1\.00)/.test(sv))bad.push(id+' çizgi görünmüyor');
   const J=joints(p),bb=bounds(d);
   let arm=J.arms[J.arms.length-1],leg=J.legs[J.legs.length-1];if(p.front&&J.arms.length>1)arm=J.arms.reduce((m,a)=>A3(a[3],a[0],a[1])<A3(m[3],m[0],m[1])?a:m);
   if(L.length!==p.cue.length)bad.push(id+' çizilen '+L.length+'/'+p.cue.length+' '+p.cue);
   L.forEach(o=>{
    if(o.c==='ang'){const exp={dirsek:arm&&arm[0],kalça:J.P,diz:leg&&leg[0],omuz:arm&&arm[3],bacak:J.P}[o.lab];if(!exp||!near(o.v,exp))bad.push(id+' açı yanlış eklemde: '+o.lab);
      if(o.lab==='kalça'&&/^(LS_HOLD|LSIT)$/.test(c0)&&/L-sit|L tut/i.test(d.alt||'')&&(o.deg<65||o.deg>115))warn.push(id+' L-sit kalça '+o.deg+'°');}
    if(o.c==='plumb'){if(!near(o.H,arm[1])||!near(o.S,arm[3]))bad.push(id+' çekül yanlış eklem');
      if(/^(PL_LEAN|PL_TUCK|PL)$/.test(c0)&&o.w!=='omuz önde')bad.push(id+' planche: '+o.w);}
    if(o.c==='scap'||o.c==='dep'){const side=(o.cc[0]-J.T[0])*o.b[0]+(o.cc[1]-J.T[1])*o.b[1];if(side<-.06)bad.push(id+' kürek göğüs tarafında');
      if(o.c==='scap'&&((p.pr<0)!==(o.lab==='kürek sık')))bad.push(id+' kürek etiketi ters');}
    if(o.c==='bel'){if(/CORE_HOLLOW/.test(c0)&&o.lab!=='bel yerde'&&o.lab!=='bel düz')warn.push(id+' hollow bel: '+o.lab);}
    if(o.c==='stack'&&o.off>=.07&&/HS_LINE|HS_BAL|HS_PARA/.test(c0))warn.push(id+' hat kaydı '+o.off.toFixed(2));
    if(o.c==='kline'&&o.dev>=.06)warn.push(id+' kalça kırık '+o.dev.toFixed(2));
   });
   // yazılar kadrajda mı
   const fs=+((sv.match(/<text[^>]*font-size="([\d.]+)"/)||[0,.08])[1]);
   [...sv.matchAll(/<text x="([-\d.]+)" y="([-\d.]+)"[^>]*>([^<]*)<\/text>/g)].forEach(m=>{const x=+m[1],y=+m[2],w=m[3].length*fs*.56;
     if(x-w/2<bb.x-.01||x+w/2>bb.x+bb.w+.01||y-fs<bb.y-.01||y>bb.y+bb.h+.01)bad.push(id+' yazı kadraj dışı: '+m[3]);});
  });});return{n,bad,warn};});
console.log('işaretli kare:',r.n,'hata:',r.bad.length,'uyarı:',r.warn.length);console.log(r.bad.slice(0,60).join('\n'));console.log('--uyarı--\n'+r.warn.slice(0,60).join('\n'));console.log(er);await b.close();})();
