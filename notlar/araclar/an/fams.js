const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const parts={},types={},ins={};Object.entries(CUE_FAM).forEach(([f,a])=>a.forEach(s=>{parts[s.part]=(parts[s.part]||[]).concat(f);if(s.type)types[s.type]=1;if(s.inset)ins[s.inset]=1;}));
 return {fams:Object.keys(CUE_FAM),parts:Object.fromEntries(Object.entries(parts).map(([k,v])=>[k,v.length])),types:Object.keys(types),ins:Object.keys(ins),stretch:CUE_FAM.stretch,hinge:CUE_FAM.hinge,knee:CUE_FAM.knee_quad||null,single:CUE_FAM.single_leg,hollow:CUE_FAM.hollow,arch:CUE_FAM.arch,plank:CUE_FAM.plank,hang:CUE_FAM.hang_pull,sp:CUE_FAM.shoulder_prehab,nord:CUE_FAM.nordic};});
console.log(JSON.stringify(r,null,0));await b.close();})();
