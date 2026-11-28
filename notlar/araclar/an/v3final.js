const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
const [f1,f2,out,title,mode]=process.argv.slice(2);
const ROWS=mode==='ornek'?[['ST:scapular push ups',0,'Scapular şınav: kürek sık'],['ST:scapular push ups',1,'Scapular şınav: kürek aç']]:mode==='mock'?[['ST:scapular push ups',0,'Scapular şınav: sık'],['ST:scapular push ups',1,'Scapular şınav: aç'],['PL_LEAN:5',1,'Planche lean'],['HS_PARA:1',-1,'Push barda pike'],['PU_VERT:6',1,'Barfiks: kürek aşağı'],['PU_VERT:6',2,'Barfiks üstü'],['CORE_HOLLOW:7',1,'Hollow'],['LS_HOLD:6',1,'L-sit']]
:[['PL_LEAN:2',-1,'Planche lean'],['PPU_HSPU:3',-1,'Pike şınav'],['DIP:6',-1,'Dip altı'],['PL_PUSH:3',-1,'Pseudo planche şınav'],['LS_HOLD:6',-1,'L-sit'],['PU_VERT:6',-1,'Barfiks'],['LG_NORDIC:9',-1,'Nordic'],['HS_BAL:1',-1,'Tripod headstand'],['HS_LINE:6',-1,'Göğüs duvarda handstand'],['CORE_HOLLOW:7',-1,'Hollow']];
(async()=>{const b=await chromium.launch();
 const get=async(f,cue,R)=>{const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
  const r=await p.evaluate(([R,cue])=>R.map(([k,i])=>{const d=DRAW[k];if(i<0)i=Math.max(0,d.k.findIndex(p=>p.cue&&p.cue.length));if(i<0)i=d.k.length-1;
   const tl=d._tl||(d._tl=timeline(d));let t=0;for(const s of tl){if(s.a===i&&s.b===i){t+=cue?s.d*.6:.05;break;}t+=s.d;}
   const bb=AN.bb(d);d._b=bb;const sv=svgFor(d,t).svg;return [sv,(d.k[i].cue||[]).join(', ')];}),[R,cue]);await p.close();return r;};
 const R=ROWS.map(x=>[x[0],x[1]]);const B=await get(f2,1,R);const R2=R.map(([k,i],j)=>[k,i]);const A=await get(f1,0,R);
 const p=await b.newPage({viewport:{width:1640,height:900},deviceScaleFactor:2});
 const css=':root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458}';
 let h='<style>'+css+'body{margin:0;background:#fff;font-family:system-ui,sans-serif}.g{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:16px}.r{border:1px solid #dde;border-radius:12px;padding:8px}.t{font:600 17px system-ui;margin:2px 4px 6px}.c{display:grid;grid-template-columns:1fr 1fr;gap:8px}.c div{background:var(--stage);border-radius:8px;height:360px;position:relative}.c span{position:absolute;left:8px;top:6px;font:600 13px system-ui;color:#556}.c svg{width:100%;height:100%}</style><div style="font:700 24px system-ui;padding:16px 16px 0">'+title+'</div><div class="g">';
 ROWS.forEach(([k,i,l],j)=>{h+='<div class="r"><div class="t">'+l+'</div><div class="c"><div><span>Şimdi</span>'+A[j][0]+'</div><div><span>Yeni</span>'+B[j][0]+'</div></div></div>';});
 h+='</div>';
 if(mode==='mock'||mode==='ornek'){const SK=mode==='ornek'?'ST:scapular push ups':'PL_LEAN:5',SN=mode==='ornek'?'Scapular şınav':'Planche lean'; // kare dizisi: oynuyor -> durdu -> çizgiler belirdi -> kayboldu
  const p2=await b.newPage();await p2.goto('file://'+f2);await p2.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p2.reload();await p2.waitForTimeout(300);await p2.evaluate(PAGE);
  const seq=await p2.evaluate((SK)=>{const d=DRAW[SK],i=1,tl=d._tl||(d._tl=timeline(d));let t=0,hs=0,hd=0;for(const s of tl){if(s.a===0&&s.b===1){hs=t;}if(s.a===i&&s.b===i){hd=s.d;break;}t+=s.d;}
    const bb=AN.bb(d);d._b=bb;return [[hs+.5,'1 · hareket oynuyor'],[t+.15,'2 · kilit karede durdu'],[t+.62,'3 · çizgiler beliriyor'],[t+hd*.6,'4 · çizgiler tam'],[t+hd+.4,'5 · kayboldu, döngü sürer']].map(([tt,l])=>[svgFor(d,tt).svg,l]);},SK);
  await p2.close();
  h+='<div style="font:700 20px system-ui;padding:6px 16px">'+SN+' — animasyon akışı</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;padding:0 16px 16px">'+seq.map(([s,l])=>'<div style="background:var(--stage);border-radius:8px;height:260px;position:relative"><span style="position:absolute;left:8px;top:6px;font:600 13px system-ui;color:#556">'+l+'</span>'+s.replace('<svg ','<svg style="width:100%;height:100%" ')+'</div>').join('')+'</div>';}
 await p.setContent(h);await p.screenshot({path:out,fullPage:true});console.log(B.map((x,j)=>ROWS[j][2]+': '+x[1]).join('\n'));await b.close();})();
