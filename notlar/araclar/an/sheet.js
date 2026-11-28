// node an/sheet.js FILE out.png CODE... | --re REGEX --from i --n N
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const a=process.argv.slice(2);const file=a[0],out=a[1];let codes=a.slice(2);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate((codes)=>{let o='',bad=[];
  for(const k of codes){const d=DRAW[k];if(!d){bad.push(k);continue;}const lv=AN.lv(k)||{};
   o+='<div style="display:flex;gap:6px;align-items:flex-start;border-top:2px solid #888;padding:4px 0"><div style="width:230px;font:13px sans-serif"><b>'+k+'</b><br>'+(lv.tr||d.alt||'')+'<br><span style="color:#555;font-size:11px">'+(lv.how||[]).join(' | ')+'</span></div>';
   d.k.forEach((x,i)=>{const s=AN.zsvg(d,i);if(s.includes('NaN'))bad.push(k+':'+i);const m=AN.met(x);
    o+='<div style="width:250px"><div style="height:250px;background:#eef1f3">'+s+'</div><div style="font:11px monospace">'+i+' '+(x.cap||'').slice(0,40)+'<br>'+(m.front?'front':'elb'+m.elb+' shf'+m.shf+' hip'+m.hip+' kn'+m.kn+' tor'+m.tor+' dSH'+m.dxSH+','+m.dySH)+'</div></div>';});o+='</div>';}
  document.body.innerHTML='<div style="background:#fff;padding:6px;width:1480px">'+o+'</div>';return bad;},codes);
 await p.screenshot({path:out,fullPage:true});console.log('bad',r,errs);await b.close();})();
