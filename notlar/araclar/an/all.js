// render one sheet per ladder in a single browser session: node an/all.js FILE OUTDIR [LADDER...]
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [file,dir,...only]=process.argv.slice(2);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const groups=await p.evaluate(()=>{const g={};Object.entries(LADDERS).forEach(([c,L])=>{g[c]=L.levels.map((l,i)=>c+':'+(i+1));});const st=Object.keys(DRAW).filter(k=>k.startsWith('ST:'));for(let i=0;i<st.length;i+=8)g['ST'+(i/8)]=st.slice(i,i+8);return g;});
 for(const [g,codes] of Object.entries(groups)){if(only.length&&!only.includes(g))continue;
  const bad=await p.evaluate((codes)=>{let o='',bad=[];
  for(const k of codes){const d=DRAW[k];if(!d){bad.push(k);continue;}const lv=AN.lv(k)||{};
   o+='<div style="display:flex;gap:6px;align-items:flex-start;border-top:2px solid #888;padding:4px 0"><div style="width:230px;font:13px sans-serif"><b>'+k+'</b><br>'+(lv.tr||d.alt||'')+'<br><span style="color:#555;font-size:11px">'+(lv.how||[]).join(' | ')+'</span></div>';
   d.k.forEach((x,i)=>{const s=AN.zsvg(d,i);if(s.includes('NaN'))bad.push(k+':'+i);const m=AN.met(x);
    o+='<div style="width:245px"><div style="height:220px;background:#eef1f3">'+s+'</div><div style="font:11px monospace">'+i+' '+(x.cap||'').slice(0,38)+'<br>'+(m.front?'front':'elb'+m.elb+' shf'+m.shf+' hip'+m.hip+' kn'+m.kn+' tor'+m.tor+' dSH'+m.dxSH+','+m.dySH)+'</div></div>';});o+='</div>';}
  document.body.innerHTML='<div style="background:#fff;padding:6px;width:1480px">'+o+'</div>';return bad;},codes);
  await p.screenshot({path:dir+'/'+g+'.png',fullPage:true});if(bad.length)console.log(g,'bad',bad);}
 console.log('errs',errs);await b.close();})();
