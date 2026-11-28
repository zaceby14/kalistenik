// Anatomi denetleyicisi: node an/rules.js FILE  -> her kural ihlalini listeler, çıkış kodu = ihlal sayısı>0
const { chromium } = require('playwright');const {PAGE}=require('./lib.js');
(async()=>{const file=process.argv[2];const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+file);await p.evaluate(()=>localStorage.setItem('kal-profil','misafir'));await p.reload();await p.waitForTimeout(300);await p.evaluate(PAGE);
 const r=await p.evaluate(()=>{const out=[];const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],cr=(a,b)=>a[0]*b[1]-a[1]*b[0],dt=(a,b)=>a[0]*b[0]+a[1]*b[1];
  const surf=(d,h)=>{if(h[1]<.07)return 1;return (d.props||[]).some(q=>((q[0]==='box'||q[0]==='chair')&&h[0]>q[1]-.05&&h[0]<q[2]+.05&&Math.abs(h[1]-q[3])<.06)||(q[0]==='par'&&Math.abs(h[0]-q[1])<.08&&Math.abs(h[1]-q[2])<.06)||(q[0]==='dip'&&Math.abs(h[1]-q[2])<.08))?1:0;};
  const HINGE_EX=/doorway chest/;const HIPX_OK=/LG_QUAD:(7|8|9|11)|leg swings|hip flexor|LG_NORDIC:[123]|PL_BENT:4/;
  const bad=(k,i,rule,msg)=>out.push(k+':'+i+' ['+rule+'] '+msg);
  Object.keys(DRAW).forEach(k=>{const d=DRAW[k];const lv=AN.lv(k)||{};
   const frames=[];d.k.forEach((p,i)=>{frames.push([p,String(i),p.cap||'']);if(i<d.k.length-1)[.25,.5,.75].forEach(t=>frames.push([mix(p,d.k[i+1],t),i+'>'+(i+1)+'@'+t,'']));});
   frames.forEach(([p,tag,c])=>{let J;try{J=joints(p);}catch(e){bad(k,tag,'ERR',e.message);return;}
    const s=svgFor(d,0).svg;if(tag==='0'&&s.includes('NaN'))bad(k,tag,'NaN','');
    if(p.front||!J.bk)return;const ch=[-J.bk[0],-J.bk[1]],dn=sub(J.P,J.T),sg=Math.sign(cr(dn,ch));
    // 1 menteşe yönü
    if(!HINGE_EX.test(k)){J.arms.forEach(([e,h,f,o])=>{const a=AN.ang(o,e,h);if(a<=172&&Math.sign(cr(sub(e,o),sub(h,e)))!==sg)bad(k,tag,'DIRSEK-TERS',a+'°');});
     J.legs.forEach(([kn,f,fr,st,o])=>{const a=AN.ang(o,kn,f);if(a<=172&&Math.sign(cr(sub(kn,o),sub(f,kn)))!==-sg)bad(k,tag,'DİZ-TERS',a+'°');});}
    // 2 kalça aşırı ekstansiyon
    if(!HIPX_OK.test(k))J.legs.forEach(([kn,f,fr,st,o])=>{const u=sub(kn,o),a=Math.sign(cr(dn,ch))*Math.atan2(cr(dn,u),dt(dn,u))/RD0;if(a<-40)bad(k,tag,'KALÇA-AŞIRI-EKST',Math.round(-a)+'°');});
    if(!c)return;
    const arm=J.arms[J.arms.length-1];
    // 3 omuz-bilek ilişkisi (destekte)
    if(arm&&surf(d,arm[1])&&arm[1][1]<J.S[1]){const h=arm[1];const fx=J.legs.length?J.legs.reduce((s,l)=>s+l[1][0],0)/J.legs.length:J.P[0];const fw=Math.sign(J.head[0]-fx)||1,f=(J.S[0]-h[0])*fw;
     if(/omuz(lar[ıi]?|u)? (bile[ğg]in|elin|ellerin|barların|tutamakların) önün|omuz öne|omuzu öne|omuzları öne|öne yaslan|öne eğil/i.test(c)&&!/önkol|üstüne gel/i.test(c+' '+(lv.tr||''))&&f<.1)bad(k,tag,'OMUZ-GERİDE','öne='+f.toFixed(2)+' | '+c);
     if(/omuz(lar)? (bile[ğk]|el) üstünde/i.test(c)&&Math.abs(f)>.06)bad(k,tag,'OMUZ-BİLEK-ÜSTÜ-DEĞİL','öne='+f.toFixed(2)+' | '+c);
     if(/handstand|amut/i.test(c+' '+(lv.tr||''))&&Math.abs(AN.dir(J.P,J.T)+90)<10&&Math.abs(AN.dir(J.T,J.head)+90)<25&&J.S[1]>h[1]+.4&&Math.abs(f)>.06&&!/duvar|wall|CTW|sırt|göğüs/i.test(c+' '+(lv.tr||'')))bad(k,tag,'AMUT-HİZA',f.toFixed(2)+' | '+c);}
    // 4 açı-yazı tutarlılığı
    const el=J.arms.map(a=>AN.ang(a[3],a[0],a[1])),kn=J.legs.map(l=>AN.ang(l[4],l[0],l[1]));
    if(/kilitli|kollar? düz|düz kol|kolla bitir/i.test(c)&&!/bükük|dirsek bük|dizler? kilitli|diz kilitli/i.test(c)&&el.some(e=>e<160))bad(k,tag,'KOL-KİLİTLİ-DEĞİL',el+' | '+c);
    if(/dirsek 90/i.test(c)&&el.every(e=>e<70||e>112))bad(k,tag,'DİRSEK-90-DEĞİL',el+' | '+c);
    if(/(diz|kalça-diz) ~?90/i.test(c)&&kn.every(e=>e<70||e>115))bad(k,tag,'DİZ-90-DEĞİL',kn+' | '+c);
    if((/RDL|(^| )T:/.test(c+' '+(lv.tr||''))||/good morning/i.test(c+(lv.tr||'')))&&tag.length<3&&AN.dir(J.P,J.T)>-30&&AN.dir(J.P,J.T)<40){const st=J.legs.filter(l=>l[1][1]<.1).map(l=>AN.ang(l[4],l[0],l[1]));if(st.some(a=>a<148))bad(k,tag,'RDL-DİZ-ÇOK-BÜKÜK',st+' | '+c);}
    // 5 kürek
    if(/kürekleri (sık|birleştir)|göğüs çöker/i.test(c)&&!((p.pr||0)<0||(p.rb||0)<0))bad(k,tag,'RETRAKSİYON-GÖRÜNMÜYOR',c);
    if(/kürek(leri)? açıl|kürekleri aç|sırt kabar|üst sırt yüksel/i.test(c)&&!((p.pr||0)>0))bad(k,tag,'PROTRAKSİYON-GÖRÜNMÜYOR',c);
   });
   // 6 zemin
   if((d.props||[]).some(q=>q===FL||q[0]==='floor'))d.k.forEach((x,i)=>{if(x.front)return;const J=joints(x);if(J.head[1]-.1<-.02)bad(k,i,'BAŞ-ZEMİNDE',(J.head[1]-.1).toFixed(2));
     J.legs.forEach(l=>{if(l[0][1]<-.02)bad(k,i,'DİZ-ZEMİNDE','');});J.arms.forEach(a=>{if(a[0][1]<-.02)bad(k,i,'DİRSEK-ZEMİNDE','');});});
  });return out;});
 const seen=new Set();const u=r.filter(x=>{const key=x.replace(/:\d+>\d+@[\d.]+/,':*');if(seen.has(key))return 0;seen.add(key);return 1;});
 u.forEach(x=>console.log(x));console.log('İHLAL:',u.length,'(ham',r.length+')',errs);await b.close();process.exitCode=u.length?1:0;})();
