const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
const ROWS=[['ST:scapular push ups:0','Scapular şınav: kürek sık'],['ST:scapular push ups:1','Scapular şınav: kürek aç'],['PL_LEAN:5:1','Planche lean: kürek açık'],['HS_PARA:1:2','Push barda pike: omuz öne'],
 ['HS_ENTRY:3:0','Kick-up girişi: omuz bilekte'],['HS_BAL:1:0','Tripod: diz dirsekte'],['LG_NORDIC:2:1','Kayarak leg curl: kol düz'],['LG_HINGE:7:1','Tek bacak RDL: diz yumuşak'],
 ['CORE_HOLLOW:1:0','Dead bug: bel yerde'],['DIP:6:1','Dip altı'],['LS_HOLD:6:1','L-sit'],['PU_VERT:6:2','Barfiks üstü']];
(async()=>{const [f1,f2,out]=process.argv.slice(2);const b=await chromium.launch();
 const get=async f=>{const p=await b.newPage();await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
  const r=await p.evaluate(R=>R.map(([x])=>{const j=x.lastIndexOf(':'),k=x.slice(0,j),i=+x.slice(j+1);return AN.zsvg(DRAW[k],i);}),ROWS);await p.close();return r;};
 const A=await get(f1),B=await get(f2);const p=await b.newPage({viewport:{width:1640,height:900},deviceScaleFactor:2});
 const css=':root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458}';
 let h='<style>'+css+'body{margin:0;background:#fff;font-family:system-ui,sans-serif}.g{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;padding:16px}.r{border:1px solid #dde;border-radius:12px;padding:8px}.t{font:600 17px system-ui;margin:2px 4px 6px}.c{display:grid;grid-template-columns:1fr 1fr;gap:8px}.c div{background:var(--stage);border-radius:8px;height:330px;position:relative}.c span{position:absolute;left:8px;top:6px;font:600 13px system-ui;color:#556}.c svg{width:100%;height:100%}</style><div style="font:700 24px system-ui;padding:16px 16px 0">Çöp adam: önceki (v1) → yeni (v2)</div><div class="g">';
 ROWS.forEach(([x,l],i)=>{h+='<div class="r"><div class="t">'+l+'</div><div class="c"><div><span>Önce</span>'+A[i]+'</div><div><span>Sonra</span>'+B[i]+'</div></div></div>';});
 await p.setContent(h+'</div>');await p.screenshot({path:out,fullPage:true});await b.close();})();
