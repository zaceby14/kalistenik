const { chromium } = require('playwright');
(async()=>{for(const f of process.argv.slice(2)){const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+f);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));let t=Date.now();await p.reload();await p.waitForSelector('#profsw');const tl=Date.now()-t;
 await p.waitForTimeout(500);t=Date.now();await p.click('#profsw');await p.waitForSelector('.prof [data-prof="zeynel"]',{timeout:15000}).catch(e=>console.log('timeout'));console.log(f.split('/').pop(),'load',tl,'switch',Date.now()-t,errs);await b.close();}})();
