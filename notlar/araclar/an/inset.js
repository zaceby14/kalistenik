const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [f,out]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+f);await p.waitForTimeout(300);await p.evaluate(PAGE);
const r=await p.evaluate(()=>{const B={x:0,y:0,w:100/0.44,h:200};const s=k=>'<svg viewBox="'+(B.w-100-B.w*.02-2)+' '+(B.y-2+0.075*2.3)+' 104 84" style="width:520px;height:420px">'+insetSvg(k,B,.075)+'</svg>';
 const d=DRAW['ST:scapular push ups'],SD=1.9;const bb=AN.bb(d);bb.y-=bb.h*.1;bb.h*=1.1;d._b=bb;
 const st=[2*SD+.05,2*SD+SD*.97].map(t=>'<div style="width:520px;height:400px;display:inline-block;background:#eef1f3">'+svgFor(d,t).svg.replace('<svg ','<svg style="width:100%;height:100%" ')+'</div>').join('');
 return s('hands-top')+s('arm-front')+'<br>'+st;});
await p.setViewportSize({width:1100,height:900});await p.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#e3e8ec;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--surface:#fff;--line:#d8dee4;--muted:#5b6876}body{margin:0}</style>'+r);await p.screenshot({path:out,fullPage:true});await b.close();})();
