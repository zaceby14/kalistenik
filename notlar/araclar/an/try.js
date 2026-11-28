// node an/try.js FILE OUT.png CODEFILE.js KEY#frame ...   (frame 'pN' = plain-round sample N/8)
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');const fs=require('fs');
(async()=>{const [f,out,code,...ks]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:300*Math.min(5,ks.length),height:330},deviceScaleFactor:1.5});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+f);await p.waitForTimeout(300);await p.evaluate(PAGE);if(code&&code!=='-')await p.evaluate(fs.readFileSync(code,'utf8'));
const sv=await p.evaluate(K=>K.map(x=>{const [k,i]=x.split('#');const d=DRAW[k];if(!d)return 'YOK '+k;let t;if(i[0]==='p'){t=+i.slice(1)/8*tlOf(d,1).tot;}else{const tl=tlOf(d,1).segs||d._tlp||timeline(d);t=AN.frameT(d,+i);}
 const m=AN.met((poseAt(d,t).p)||poseAt(d,t));const b=AN.bb(d);
 return '<div style="width:290px;height:320px;display:inline-block;background:#eef1f3;margin:2px;vertical-align:top"><div style="font:11px sans-serif">'+x+' '+JSON.stringify(m)+'</div>'+svgFor(d,t).svg.replace(/viewBox="[^"]*"/,'viewBox="'+[b.x,b.y,b.w,b.h].map(v=>v.toFixed(3)).join(' ')+'"').replace('<svg ','<svg width="290" height="290" ')+'</div>';}).join(''),ks);
await p.setContent('<style>:root{--ink:#14191f;--far:#9aa5b1;--stage:#eef1f3;--floor:#c9d1d8;--prop:#9aa5b1;--boxc:#dde2e8;--accent:#e4572e;--towel:#e0a458}body{margin:0}</style>'+sv);await p.screenshot({path:out,fullPage:true});console.log(errs.slice(0,3));await b.close();})();
