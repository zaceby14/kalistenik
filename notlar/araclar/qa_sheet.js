// Kullanıcı gözüyle: her çizimin tam döngüsü (sade tur → kurulum adımları → koç çizgili tur) kare kare tek sayfada
const { chromium } = require('playwright');const fs=require('fs');
const OUT=process.argv[3]||'qa';const ONLY=(process.argv[4]||'').split(',').filter(Boolean);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:900}});const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('file://'+process.argv[2]);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(800);
const VARS=await p.evaluate(()=>{const o=[];const cs=getComputedStyle(document.documentElement);for(const sh of document.styleSheets){try{for(const r of sh.cssRules){if(r.selectorText&&/:root/.test(r.selectorText))for(const pr of r.style)if(pr.startsWith('--'))o.push(pr+':'+cs.getPropertyValue(pr).trim());}}catch(e){}}return [...new Set(o)].join(';');});
const keys=await p.evaluate(ONLY=>{const lvmap={};Object.entries(LADDERS).forEach(([c,L])=>L.levels.forEach((lv,i)=>{const o={code:c+':'+(i+1),name:lv.tr,how:(lv.how||[]).join(' | ')};lvmap[c+':'+(i+1)]=o;if(lv.key)lvmap[lv.key]=o;}));
  return Object.keys(DRAW).filter(k=>(k.startsWith('ST:')||lvmap[k]))
    .filter(k=>!ONLY.length||ONLY.some(o=>k===o||(lvmap[k]&&lvmap[k].code===o))).map(k=>[k,lvmap[k]||{code:k,name:(DRAW[k].t||k),how:''}]);},ONLY);
fs.mkdirSync(OUT,{recursive:true});let n=0;
for(const [k,info] of keys){
  const html=await p.evaluate(([k,info])=>{const d=DRAW[k];const P=tlOf(d,1).tot,M=tlOf(d,0).tot,su=setupOf(d),L=su?suLen(su):0;const T=[];
    for(let i=0;i<6;i++)T.push([i*P/6,'sade']);
    if(su){suTimes(su).st.forEach((o,i)=>{T.push([P+o.t0+.1,'kur '+(i+1)]);T.push([P+o.t0+o.d*.4,'kur '+(i+1)]);T.push([P+o.t0+o.d-.1,'kur '+(i+1)]);});}
    for(let i=0;i<12;i++)T.push([P+L+i*M/12,'hareket']);
    const cells=T.map(([t,ph])=>{let r;try{r=svgFor(d,t);}catch(e){return `<div class=c><b>HATA ${e.message}</b></div>`;}const cap=(r.cap||'').replace(/</g,'&lt;');return `<div class=c><div class=s>${r.svg}</div><i>${t.toFixed(1)}s · ${ph}</i><u>${cap}</u></div>`;}).join('');
    return `<h3>${info.code} — ${info.name} <small>[${k}] döngü ${(P+L+M).toFixed(1)}s</small></h3><p>${info.how}</p><div class=g>${cells}</div>`;},[k,info]);
  await p.setContent(`<html><head><style></style><style>:root{${VARS}}body{font:12px system-ui;margin:8px;background:#fff}h3{margin:0}p{margin:2px 0 6px;color:#444}.g{display:grid;grid-template-columns:repeat(8,1fr);gap:4px}.c{border:1px solid #ddd;background:#eef0f3}.s svg{width:100%;height:150px;display:block}i,u{display:block;font-size:10px;text-decoration:none;padding:0 3px}u{color:#c33;min-height:13px}</style></head><body>${html}</body></html>`);
  await p.waitForTimeout(50);await p.screenshot({path:`${OUT}/${(info.code||k).replace(/[:\/]/g,'_')}.png`,fullPage:true});n++;}
console.log('sayfa',n,'hata',er.slice(0,3));await b.close();})();
