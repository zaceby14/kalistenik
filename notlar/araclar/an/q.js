// node an/q.js FILE 'js expr'  (AN helpers available)
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const [file,expr]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate(expr);console.log(typeof r==='string'?r:JSON.stringify(r));if(errs.length)console.log(errs);await b.close();})();
