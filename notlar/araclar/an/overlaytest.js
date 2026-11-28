// Koç/kurulum katmanı testi: omuz okları gövde ekseninde doğru yönde mi, yazılar figürün üstüne biniyor mu, açı etiketleri altyazıyla tutarlı mı
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(800);
const r=await p.evaluate(()=>{const bad=[],warn=[];let nArr=0,nLab=0,nAng=0;
 for(const k of Object.keys(DRAW)){const d=DRAW[k];const P=tlOf(d,1).tot,M=tlOf(d,0).tot,su=setupOf(d),L=su?suLen(su):0;
  if(su){window.SULOG=[];suTimes(su).st.forEach(o=>svgFor(d,P+o.t0+o.d*.6));for(const e of window.SULOG){if(!/aşağı|kulaktan uzak|kulağa|depres|elevas/i.test(e.lt))continue;if(!e.arv){if(/^scap|shoulder/.test(e.part))warn.push(k+' ok yok: '+e.lt);continue;}nArr++;
     const dot=e.arv[0]*e.U[0]+e.arv[1]*e.U[1],wantUp=/kulağa|elevas/i.test(e.lt)&&!/aşağı|kulaktan uzak|depres/i.test(e.lt);
     if(wantUp?dot<.5:dot>-.5)bad.push(k+' ok yönü yanlış ('+dot.toFixed(2)+'): '+e.lt);}window.SULOG=null;}
  window.CUELOG=[];for(let t=P+L;t<P+L+M;t+=.25)svgFor(d,t);const seen=new Set();
  for(const e of window.CUELOG){const key=e.c+(e.s||e.lab||'');if(seen.has(key))continue;seen.add(key);
    if(e.c==='lab'){nLab++;if(e.fig>0)bad.push(k+' yazı figür üstünde: '+e.s+' ('+e.fig+')');}
    if(e.c==='ang'){nAng++;if(e.tg!=null&&!e.shown)warn.push(k+' açı altyazıdan uzak, sayı gizlendi: '+e.lab+' ölçülen '+e.deg+' hedef '+e.tg);}}
  window.CUELOG=null;}
 return {nArr,nLab,nAng,bad,warn};});
console.log('ok:',r.nArr,'yazı:',r.nLab,'açı:',r.nAng,'HATA:',r.bad.length,'uyarı:',r.warn.length);console.log(r.bad.slice(0,40).join('\n'));console.log('--uyarı--');console.log(r.warn.slice(0,60).join('\n'));console.log(er);await b.close();})();
