// node an/big.js FILE out.png CODE:i ...  -> big zoomed frames
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [file,out,...ks]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:700}});await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 await p.evaluate((ks)=>{let o='';ks.forEach(x=>{const [c,n,i]=x.split(':');const k=c+':'+n,d=DRAW[k];o+='<div style="width:420px;display:inline-block;margin:2px"><div style="height:420px;background:#eef1f3">'+AN.zsvg(d,+i)+'</div><div style="font:13px sans-serif">'+x+' '+(d.k[+i].cap||'')+'</div></div>';});document.body.innerHTML='<div style="background:#fff;width:1290px">'+o+'</div>';},ks);
 await p.screenshot({path:out,fullPage:true});await b.close();})();
