/* ===== koç kurulum ipuçları: veri (CUE_FAM/CUE_LAD/CUE_LVL) + motor ===== */
/*__CUEDATA__*/
function suDur(su){return su.length>5?1.5:1.9;}
function suLen(su){return su.length*suDur(su)+.4;}
/* bölgeye göre varsayılan poz sapması (kurulum başında hata → adımda düzelir) */
function defMod(fam,s){const l=(s.label||'')+' '+(s.short||'');
  switch(s.part){
   case 'hands':return /nötr tut|barı|tutuş|overhand|avuç|havlu|commando|karışık/i.test(l)?{er:1}:{hx:-.06};
   case 'arm':case 'arm2':case 'rot':return /kalça|okçu|dirsek geri|45°|90°|raf/i.test(l)?{pd:4,er:1}:{er:1};
   case 'scap':case 'scap2':return /kulağa|yukarı it|omuz it|it\)|aç, it/i.test(l)?{sh:-.06}:/aç|protrak|yuvarlak/i.test(l)?{pr:-.08}:/geri/i.test(l)?{sh:.05,pr:.05}:{sh:.06};
   case 'ribs':return {rb:-.05};
   case 'pelvis':case 'pelvis2':return /yukarı|üstte|omuz üstü|kalkar/i.test(l)?{pd:6}:{lb:-.1};
   case 'legs':case 'knees':case 'hipflex':case 'knee':case 'compress':return {kb:.1};
   case 'neck':case 'head':return {h:-18};
   case 'shoulder':return {sx:-.09};
   case 'torso':case 'spine':case 'depth':return {pd:5};
   case 'feet':return {fx:.05};
   default:return {};}}
function setupOf(d){if(d._su!==undefined)return d._su;const k=d._key||'',lad=k.split(':')[0],lv=CUE_LVL[k]||{},lg=CUE_LVL[lad]||{};
  let fam=lv.fam||lg.fam||CUE_LAD[lad];
  if(!fam&&lad==='ST')fam=/scapular pull|active hang/i.test(k)?'hang_pull':/band|dislocat/i.test(k)?'shoulder_prehab':/scapular push/i.test(k)?'plank':'stretch';
  if(!fam||!CUE_FAM[fam]){d._su=null;return null;}
  let st=CUE_FAM[fam].map(s=>Object.assign({},s));
  [lg,lv].forEach(o=>{if(o.override)Object.entries(o.override).forEach(([p,s])=>{const i=st.findIndex(x=>x.part===p);if(i>=0)st[i]=Object.assign({},st[i],s);else st.push(Object.assign({},s));});
    if(o.only)st=st.filter(x=>o.only.includes(x.part));if(o.drop)st=st.filter(x=>!o.drop.includes(x.part));
    if(o.add)o.add.forEach(s=>{const i=st.findIndex(x=>x.part===s.part);if(i>=0)st.splice(i+1,0,Object.assign({},s));else st.push(Object.assign({},s));});});
  const fr=!!d.k[0].front;
  st=st.filter(s=>!(fr&&(s.part==='pelvis'||s.part==='ribs')&&s.type==='rot'));
  st.forEach(s=>{if(!s.mod)s.mod=defMod(fam,s);if(fr){const m=Object.assign({},s.mod);delete m.pd;delete m.lb;delete m.rb;delete m.pr;delete m.hx;delete m.sx;s.mod=m;}});
  st=st.slice(0,8);d._fam=fam;d._su=st.length?st:null;return d._su;}
function setupPose(d,su,i,u){const p=Object.assign({},d.k[0]);delete p.cue;p.hands=p.hands.map(h=>h.slice());p.feet=p.feet.map(f=>f.slice());const fa=p.facing??1;
  su.forEach((s,j)=>{if(!s.mod)return;const w=j<i?0:j>i?1:1-ease(Math.min(1,u*1.6));if(!w)return;
    Object.entries(s.mod).forEach(([k,v])=>{
      if(k==='pd'){const a=-v*w*RD0*fa,c=Math.cos(a),sn=Math.sin(a),rot=q=>[p.S[0]+(q[0]-p.S[0])*c-(q[1]-p.S[1])*sn,p.S[1]+(q[0]-p.S[0])*sn+(q[1]-p.S[1])*c];
        const P2=rot(p.P),dP=[P2[0]-p.P[0],P2[1]-p.P[1]];p.P=P2;p.feet=p.feet.map(f=>{if(f[1]<.09){const q=onY(P2,f[1],-fa);return Math.abs(q[0]-f[0])<.25?[q[0],q[1],...f.slice(2)]:f;}const q=rot(f);return[q[0],q[1],...f.slice(2)];});}
      else if(k==='hx'){p.hands=p.hands.map(h=>h[1]<.06?[h[0]+v*w*fa,h[1],...h.slice(2)]:h);}
      else if(k==='sx'){p.S=[p.S[0]+v*w*fa,p.S[1]];p.P=[p.P[0]+v*w*fa,p.P[1]];p.feet=p.feet.map(f=>f[1]<.09?f:[f[0]+v*w*fa,f[1],...f.slice(2)]);}
      else if(k==='kb'){p.feet=p.feet.map(f=>{if(f[1]<.09)return f;const dx=f[0]-p.P[0],dy=f[1]-p.P[1],l=Math.hypot(dx,dy)||1,s_=Math.max(.5,1-v*w*2.2/l);return[p.P[0]+dx*s_,p.P[1]+dy*s_,...f.slice(2)];});}
      else if(k==='fx'){p.feet=p.feet.map(f=>f[1]<.09?[f[0]-v*w*fa,f[1],...f.slice(2)]:f);}
      else if(k==='er'){p._er=Math.max(p._er||0,w);}
      else p[k]=(p[k]||0)+v*w;});});return p;}
/* kurulum katmanı: vurgu + kısa etiket (çizgiyle bölgeye bağlı) + köşe inseti */
function setupSvg(su,p,J,b){const st=su.st,A='var(--accent)',Y=y=>-y,fi=ease(Math.min(1,su.u*3)),fo=su.u>.9?ease((1-su.u)*10):1,op=Math.min(fi,fo);let o='';
  const FS=Math.max(.075,Math.min(.16,b.h*.05)),arm=J.arms[J.arms.length-1],leg=J.legs[J.legs.length-1],FR=!!p.front;
  const L=(a,c,w,ex='')=>`<line x1="${F(a[0])}" y1="${F(Y(a[1]))}" x2="${F(c[0])}" y2="${F(Y(c[1]))}" stroke="${A}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
  const ring=(q,r)=>`<circle cx="${F(q[0])}" cy="${F(Y(q[1]))}" r="${r}" fill="${A}" fill-opacity=".16" stroke="${A}" stroke-width=".018"/>`;
  const head=(c,u_,h=.05)=>{const n=[-u_[1],u_[0]];return `<path d="M${F(c[0])} ${F(Y(c[1]))} L${F(c[0]-u_[0]*h+n[0]*h*.6)} ${F(Y(c[1]-u_[1]*h+n[1]*h*.6))} L${F(c[0]-u_[0]*h-n[0]*h*.6)} ${F(Y(c[1]-u_[1]*h-n[1]*h*.6))} Z" fill="${A}"/>`;};
  const arw=(a,c)=>{const dx=c[0]-a[0],dy=c[1]-a[1],l=Math.hypot(dx,dy)||1;return L(a,[c[0]-dx/l*.03,c[1]-dy/l*.03],.022)+head(c,[dx/l,dy/l]);};
  const ax=J.ax||[J.T[0]-J.P[0],J.T[1]-J.P[1]],al=Math.hypot(ax[0],ax[1])||1,U=[ax[0]/al,ax[1]/al],BK=J.bkv||[-U[1],U[0]];
  const part=st.part,m=st.mod||{};let an=J.T;
  const elbowPit=a=>{const e=a[0],s0=a[3],dx=e[0]-s0[0],dy=e[1]-s0[1],l=Math.hypot(dx,dy)||1,fa=p.facing??1,n=[-dy/l*fa,dx/l*fa];return `<ellipse cx="${F(e[0]+n[0]*.03)}" cy="${F(Y(e[1]+n[1]*.03))}" rx=".024" ry=".016" fill="${A}"/>`;};
  if(part==='hands'||part==='fingers'||part==='wrist'||part==='thumb'){J.arms.forEach(a=>{o+=ring(a[1],.07);});if(!FR&&arm&&arm[1][1]<.1&&m.hx)o+=L(arm[3],[arm[3][0],arm[1][1]+.03],.014,'stroke-dasharray=".04 .03"');if(arm)an=arm[1];}
  else if(part==='arm'||part==='arm2'||part==='rot'){if(arm){const s0=arm[3],e=arm[0],mm=[(s0[0]+e[0])/2,(s0[1]+e[1])/2],ang=Math.atan2(e[1]-s0[1],e[0]-s0[0])/RD0;o+=L(s0,e,.035,'stroke-opacity=".55"')+L(e,arm[1],.03,'stroke-opacity=".4"');
      if(m.er||st.type==='rot')o+=`<g transform="translate(${F(mm[0])} ${F(Y(mm[1]))}) rotate(${F(-ang+90)})"><path d="M-.085 0 A.085 .035 0 1 0 .07 .02" fill="none" stroke="${A}" stroke-width=".02"/><path d="M.085 .005 L.05 .03 L.06 -.012 Z" fill="${A}"/></g>`;
      o+=elbowPit(arm);an=mm;}}
  else if(part==='scap'||part==='scap2'){const c=J.scap?J.scap.c:J.T;o+=ring(c,.09);an=c;
      if(!FR){if(m.sh){const dn=m.sh>0?-1:1;o+=arw([c[0]+BK[0]*.16-U[0]*dn*.07,c[1]+BK[1]*.16-U[1]*dn*.07],[c[0]+BK[0]*.16+U[0]*dn*.07,c[1]+BK[1]*.16+U[1]*dn*.07]);}
        if(m.pr){const out=m.pr<0;const a=[c[0]+BK[0]*(out?.1:.3),c[1]+BK[1]*(out?.1:.3)],z=[c[0]+BK[0]*(out?.3:.1),c[1]+BK[1]*(out?.3:.1)];o+=arw(a,z);}}
      else J.arms.forEach(a=>{const q=[a[3][0],a[3][1]+.16],dn=(m.sh||0)>0?-1:1;o+=arw([q[0],q[1]-dn*.06],[q[0],q[1]+dn*.06]);});}
  else if(part==='ribs'){const c=FR?[(J.T[0]+J.P[0])/2,J.T[1]*.75+J.P[1]*.25]:[J.T[0]*.7+J.P[0]*.3-BK[0]*.09,J.T[1]*.7+J.P[1]*.3-BK[1]*.09];o+=ring(c,.08);if(!FR)o+=arw([c[0]-BK[0]*.2,c[1]-BK[1]*.2],[c[0]-BK[0]*.07,c[1]-BK[1]*.07]);an=c;}
  else if(part==='pelvis'||part==='pelvis2'){const P=J.P;an=P;
      if(!FR&&J.pelD)o+=`<path d="${J.pelD}" fill="${A}" fill-opacity=".55" stroke="${A}" stroke-width=".02" stroke-linejoin="round"/>`;else o+=ring(P,.1);
      if(!FR&&(m.lb||st.type==='rot')){const fr_=[-BK[0],-BK[1]],r=.15,a1=Math.atan2(fr_[1]-U[1]*.7,fr_[0]-U[0]*.7),a2=Math.atan2(fr_[1]+U[1]*.7,fr_[0]+U[0]*.7),p1=[P[0]+r*Math.cos(a1),P[1]+r*Math.sin(a1)],p2=[P[0]+r*Math.cos(a2),P[1]+r*Math.sin(a2)],sw=((a2-a1+3*Math.PI)%(2*Math.PI)-Math.PI)>0?0:1;
        o+=`<path d="M${F(p1[0])} ${F(Y(p1[1]))} A${r} ${r} 0 0 ${sw} ${F(p2[0])} ${F(Y(p2[1]))}" fill="none" stroke="${A}" stroke-width=".022" stroke-linecap="round"/>`;const tg=[-(p2[1]-P[1]),p2[0]-P[0]],tl_=Math.hypot(...tg)||1,dir=(tg[0]*U[0]+tg[1]*U[1])>0?1:-1;o+=head(p2,[tg[0]/tl_*dir,tg[1]/tl_*dir]);}
      else if(!FR&&m.pd){const q=[P[0]+U[0]*.0,P[1]+U[1]*.0];o+=arw([q[0]-BK[0]*.0,q[1]-.05],[q[0],q[1]+.12]);}}
  else if(['legs','knees','hipflex','knee','compress','depth','feet'].includes(part)){J.legs.forEach(l=>{o+=L(l[4],l[0],.035,'stroke-opacity=".5"')+L(l[0],l[1],.03,'stroke-opacity=".5"');});if(leg){o+=ring(part==='feet'?leg[1]:leg[0],.06);an=part==='feet'?leg[1]:leg[0];}}
  else if(part==='neck'||part==='head'){const h=J.head;o+=L(J.T,h,.03,'stroke-opacity=".7"')+ring(h,.11);if(!FR)o+=L(J.P,[h[0]+U[0]*.16,h[1]+U[1]*.16],.012,'stroke-dasharray=".04 .03" stroke-opacity=".9"');an=h;}
  else if(part==='shoulder'){if(arm){const H=arm[1],S0=arm[3];o+=L(H,[H[0],Math.max(S0[1],H[1])+.22],.014,'stroke-dasharray=".04 .03"')+ring(S0,.06)+arw([H[0],S0[1]],[S0[0]+(p.facing??1)*.06,S0[1]]);an=S0;}}
  else if(part==='torso'||part==='spine'){o+=L(J.P,J.T,.03,'stroke-opacity=".6"');an=[(J.P[0]+J.T[0])/2,(J.P[1]+J.T[1])/2];}
  if(st.line&&J.legs.length&&!FR){const z=J.legs[J.legs.length-1][1],s0=arm?arm[3]:J.S,dx=z[0]-s0[0],dy=z[1]-s0[1],l=Math.hypot(dx,dy)||1;o+=L([s0[0]-dx/l*.05,s0[1]-dy/l*.05],[z[0]+dx/l*.05,z[1]+dy/l*.05],.013,'stroke-dasharray=".05 .035"');}
  /* inset köşesi: figürün en az kapladığı üst köşe */
  const pts_=[J.head,J.T,J.P,...J.arms.flatMap(a=>[a[0],a[1],a[3]]),...J.legs.flatMap(l=>[l[0],l[1]])];
  const iw=b.w*.4,ih=iw*.8,itop=-b.y-FS*.3,box=lf=>{const x0=lf?b.x+b.w*.02:b.x+b.w*.98-iw;return[x0,itop-ih,x0+iw,itop];},cnt=bx=>pts_.filter(q=>q[0]>bx[0]-.05&&q[0]<bx[2]+.05&&q[1]>bx[1]-.05&&q[1]<bx[3]+.05).length;
  const insL=cnt(box(true))<=cnt(box(false));
  const lab=(su.i+1)+'/'+su.n+' · '+(st.short||st.label),wl=lab.length*FS*.56;let lx=insL?b.x+b.w*.97-wl:b.x+b.w*.03,ly=b.y+FS*1.4;
  if(st.inset&&wl>b.w-iw-b.w*.08){ly=b.y+FS*1.4+ih/1+FS*.4;lx=insL?b.x+b.w*.97-wl:b.x+b.w*.03;}
  const ex_=[Math.min(Math.max(lx+wl*.5,b.x),b.x+b.w),-(ly+FS*.45)],dx_=an[0]-ex_[0],dy_=an[1]-ex_[1],dl_=Math.hypot(dx_,dy_)||1,end=[an[0]-dx_/dl_*.09,an[1]-dy_/dl_*.09];
  if(dl_>.2)o+=L(ex_,end,.012,'stroke-dasharray=".035 .025"')+`<circle cx="${F(end[0])}" cy="${F(Y(end[1]))}" r=".016" fill="${A}"/>`;
  o+=`<text x="${F(lx)}" y="${F(ly)}" font-size="${F(FS)}" font-weight="800" font-family="system-ui,sans-serif" text-anchor="start" fill="${A}" stroke="var(--stage)" stroke-width="${F(FS*.4)}" paint-order="stroke">${lab}</text>`;
  let ib=null;if(st.inset&&INSET[st.inset]){const bx=box(insL);ib=bx;o+=insetSvg(st.inset,b,FS,insL,iw);}
  if(window.SULOG)window.SULOG.push({lab:[lx,ly-FS*.85,lx+wl,ly+FS*.25],ins:ib?[ib[0],-ib[3],ib[2],-ib[1]]:null,b:[b.x,b.y,b.x+b.w,b.y+b.h],part,an,inset:st.inset||null,cover:ib?cnt(ib):0});
  return `<g opacity="${op.toFixed(2)}">${o}</g>`;}
/* ===== köşe insetleri (100x80 birim) ===== */
const INSET={};
{const A='var(--accent)',I='var(--ink)',M='var(--muted,#5b6876)',PR='var(--prop,#9aa4ad)';
 const t_=(x,y,s,c=M,fs=7)=>`<text x="${x}" y="${y}" font-size="${fs}" font-weight="700" font-family="system-ui,sans-serif" text-anchor="middle" fill="${c}">${s}</text>`;
 const ln=(a,b,c,d,col,w,ex='')=>`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
 const ar=(x1,y1,x2,y2,col=A,w=2)=>{const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,ux=dx/l,uy=dy/l;return ln(x1,y1,x2-ux*4,y2-uy*4,col,w)+`<path d="M${x2} ${y2} L${(x2-ux*6-uy*3.5).toFixed(1)} ${(y2-uy*6+ux*3.5).toFixed(1)} L${(x2-ux*6+uy*3.5).toFixed(1)} ${(y2-uy*6-ux*3.5).toFixed(1)} Z" fill="${col}"/>`;};
 const X=(x,y)=>ln(x-4,y-4,x+4,y+4,'#c0392b',2)+ln(x-4,y+4,x+4,y-4,'#c0392b',2),OK=(x,y)=>`<path d="M${x-4} ${y} L${x-1} ${y+3} L${x+4} ${y-4}" fill="none" stroke="var(--ok,#2a8150)" stroke-width="2.2" stroke-linecap="round"/>`;
 /* üstten el (sırtı görünür): side -1 sol, +1 sağ; parmaklar yukarı, başparmak içe */
 const hand=(cx,cy,side,rot=0,sc=1)=>{let s=`<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${sc})"><path d="M-8 6 Q-9 -6 -7 -8 L7 -8 Q9 -6 8 6 Q7 13 0 14 Q-7 13 -8 6 Z" fill="${I}"/>`;
   [[-5.6,-8,-6,13],[-1.9,-8,-2,15],[1.9,-8,2,14.5],[5.6,-8,6,11.5]].forEach(([x0,y0,ang,len])=>{const fx=side>0?x0:-x0,fa=(side>0?ang:-ang)*RD0;s+=ln(fx,y0,(fx+Math.sin(fa)*len).toFixed(1),(y0-Math.cos(fa)*len).toFixed(1),I,3.3);});
   const tx=-side*7.5;return s+ln(tx,5,(tx-side*7).toFixed(1),-3,I,3.6)+`</g>`;};
 const handsTop=(rot,cap)=>{let g=`<circle cx="50" cy="11" r="6" fill="${I}" opacity=".9"/>`+t_(50,24,'baş',M,6.5);
   g+=hand(34,50,-1,-rot)+hand(66,50,1,rot);if(rot>5)[[34,-1],[66,1]].forEach(([cx,s])=>{const r=21,P_=a=>[cx+r*Math.cos(a*RD0),50+r*Math.sin(a*RD0)],p1=P_(-90),p2=P_(-90+s*rot);
     g+=ln(cx,50,p1[0].toFixed(1),p1[1].toFixed(1),M,1,'stroke-dasharray="2 2"')+`<path d="M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A${r} ${r} 0 0 ${s>0?1:0} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}" fill="none" stroke="${A}" stroke-width="1.6"/>`;});
   return g+ar(96,62,96,22)+t_(93,17,'ileri',A,6.5)+t_(50,71,cap[0],A,7)+t_(50,79,cap[1],M,6.5);};
 INSET['hands-top']=()=>handsTop(62,['parmaklar 45–90° dışa','üstten · başparmak ileri']);
 INSET['hands-planche']=()=>handsTop(95,['parmaklar yana-geri','üstten · el kalça yanına yakın']);
 INSET['hands-fwd']=()=>handsTop(8,['parmaklar ileri, açık','üstten · omuz genişliği']);
 INSET['hands-lsit']=()=>{let g=`<ellipse cx="50" cy="40" rx="15" ry="11" fill="${I}" opacity=".25"/>`+t_(50,43,'kalça',M,6.5)+hand(26,42,-1,-15)+hand(74,42,1,15);return g+ar(94,62,94,22)+t_(91,17,'ileri',A,6.5)+t_(50,71,'eller kalça yanında',A,7)+t_(50,79,'üstten',M,6.5);};
 INSET['hands-pressure']=()=>{let g=`<path d="M14 52 L58 52 Q66 52 72 46 L86 46" fill="none" stroke="${I}" stroke-width="9" stroke-linecap="round"/>`+ln(6,58,94,58,PR,1.5);
   g+=ar(22,28,22,47)+t_(22,22,'avuç tabanı',A,6.5)+ar(84,28,84,41)+t_(80,22,'parmak ucu',A,6.5);return g+t_(50,72,'öne düşerken parmakla bastır',A,6.8)+t_(50,79,'yandan el',M,6.5);};
 INSET['arm-front']=()=>{const arms=(ox,after)=>{let s='';[-1,1].forEach(sd=>{const x=ox+sd*11;s+=ln(x,12,x,40,I,7)+ln(x,42,x,64,I,6)+`<circle cx="${x}" cy="11" r="5" fill="${I}"/>`;
     s+=after?`<ellipse cx="${x}" cy="41" rx="3.2" ry="2.3" fill="${A}"/>`:`<ellipse cx="${x-sd*3.2}" cy="41" rx="1.2" ry="2.3" fill="${A}"/>`;
     if(after)s+=`<path d="M${x+sd*4} 22 Q${x} 31 ${x+sd*6} 23" fill="none" stroke="${A}" stroke-width="1.8"/><path d="M${x+sd*8.5} 20.5 L${x+sd*3.6} 21.5 L${x+sd*6.6} 26.5 Z" fill="${A}"/>`;});return s+ln(ox-20,66,ox+20,66,PR,1.2);};
   return arms(26,0)+arms(74,1)+ar(45,38,58,38)+t_(26,74,'önce',M,7)+t_(74,74,'sonra',A,7)+t_(50,80,'dirsek içi: içe → öne',M,5.8);};
 INSET['elbow-tuck']=()=>{const fig=(ox,ok)=>{let s=`<circle cx="${ox}" cy="16" r="5" fill="${I}"/>`+ln(ox-12,30,ox+12,30,I,5)+ln(ox,30,ox,58,I,9);const a=ok?40:88;
     [-1,1].forEach(sd=>{const ex=ox+sd*12+sd*14*Math.sin(a*RD0)*.0,ey=30;const e=[ox+sd*(12+16*Math.sin(a*RD0)),30+16*Math.cos(a*RD0)];s+=ln(ox+sd*12,30,e[0].toFixed(1),e[1].toFixed(1),I,4.5);});
     return s+(ok?OK(ox,68):X(ox,68));};return fig(28,true)+fig(72,false)+t_(28,79,'dirsek ~45° geri',A,6.5)+t_(72,79,'90° yana',M,6.5);};
 INSET['er-front']=()=>{let g=ln(50,14,50,40,I,7)+`<circle cx="50" cy="12" r="5" fill="${I}"/>`+ln(50,40,24,40,I,6)+ln(50,40,76,40,I,6,'stroke-opacity=".3" stroke-dasharray="4 3"');
   g+=`<path d="M30 28 A22 22 0 0 1 70 28" fill="none" stroke="${A}" stroke-width="1.8"/><path d="M72 31 L66 26 L72 24 Z" fill="${A}"/>`;return g+t_(50,62,'dirsek 90°, gövdede sabit',A,7)+t_(50,72,'ön kol dışa döner',M,6.5)+t_(50,80,'önden',M,6);};
 INSET['wrist-lean']=()=>{let g=ln(10,64,90,64,PR,1.5)+ln(40,64,58,24,I,7)+`<circle cx="58" cy="22" r="6" fill="${I}"/>`+ln(40,64,40,16,A,1.3,'stroke-dasharray="3 2.5"')+ar(40,24,56,24);
   return g+t_(76,30,'omuz önde',A,7)+t_(40,12,'bilek',M,6)+t_(50,76,'yandan · omuz bileğin önünde',M,6.3);};
 const bar=(y=18)=>ln(6,y,94,y,PR,4);
 const grip=(x,under,thumbAround=true)=>{let s=`<rect x="${x-7}" y="12" width="14" height="22" rx="5" fill="${I}"/>`+ln(x,34,x,64,I,7);
   s+=under?`<ellipse cx="${x}" cy="23" rx="4.5" ry="6" fill="var(--surface,#fff)" opacity=".35"/>`:'';s+=thumbAround?ln(x+(under?-6:6),26,x+(under?-6:6),17,I,3):'';return s;};
 INSET['grip-overhand']=()=>bar()+grip(30,false)+grip(70,false)+t_(50,74,'avuç dışa (overhand)',A,7)+t_(50,80,'önden · başparmak sarar',M,6);
 INSET['grip-underhand']=()=>bar()+grip(36,true)+grip(64,true)+t_(50,74,'avuç sana dönük (chin-up)',A,7)+t_(50,80,'önden',M,6);
 INSET['grip-mixed']=()=>bar()+grip(32,false)+grip(68,true)+t_(32,72,'dışa',M,6.5)+t_(68,72,'içe',A,6.5)+t_(50,80,'karışık tutuş',A,6.5);
 INSET['grip-wide']=()=>bar()+grip(14,false)+grip(86,false)+`<circle cx="50" cy="40" r="6" fill="${I}"/>`+ln(38,52,62,52,I,6)+ar(40,44,18,44)+ar(60,44,82,44)+t_(50,74,'omzun ~1,5 katı',A,7)+t_(50,80,'önden',M,6);
 INSET['grip-commando']=()=>ln(50,6,50,74,PR,4)+`<rect x="41" y="18" width="18" height="14" rx="5" fill="${I}"/><rect x="41" y="38" width="18" height="14" rx="5" fill="${I}"/>`+t_(78,30,'eller art arda',A,6.5)+t_(50,80,'üstten · bar boyunca',M,6);
 INSET['grip-thumb']=()=>`<circle cx="50" cy="40" r="10" fill="${PR}"/><path d="M34 26 Q30 40 36 54 Q50 62 64 54" fill="none" stroke="${I}" stroke-width="9" stroke-linecap="round"/>`+ln(64,54,70,40,I,6)+t_(50,72,'başparmak barı sarar',A,7)+t_(50,80,'yandan · bar avuç tabanında',M,6);
 INSET['grip-towel']=()=>bar(10)+ln(36,10,36,40,'var(--towel,#d9913a)',6)+ln(64,10,64,40,'var(--towel,#d9913a)',6)+`<rect x="29" y="26" width="14" height="16" rx="5" fill="${I}"/><rect x="57" y="26" width="14" height="16" rx="5" fill="${I}"/>`+ln(36,42,36,64,I,6)+ln(64,42,64,64,I,6)+t_(50,74,'havlu: çekiç tutuş',A,7)+t_(50,80,'önden · avuçlar karşılıklı',M,6);
 INSET['grip-parallette']=()=>`<path d="M20 64 L32 30 L68 30 L80 64" fill="none" stroke="${PR}" stroke-width="4"/>`+`<rect x="38" y="22" width="24" height="14" rx="6" fill="${I}"/>`+ln(50,36,50,10,I,7,'stroke-opacity=".9"')+ln(44,22,44,12,I,3)+t_(50,74,'nötr tutuş, bilek düz',A,7)+t_(50,80,'yandan · avuç içe bakar',M,6);
 INSET['grip-dip']=()=>ln(10,30,90,30,PR,4)+`<rect x="40" y="22" width="20" height="14" rx="6" fill="${I}"/>`+ln(50,36,50,64,I,7)+t_(50,74,'nötr tutuş, el gövde yanında',A,7)+t_(50,80,'yandan',M,6);
 INSET['hang-active']=()=>{const fig=(ox,act)=>{const sy=act?30:22;return ln(ox-16,8,ox+16,8,PR,3)+ln(ox-9,8,ox-9,sy,I,4)+ln(ox+9,8,ox+9,sy,I,4)+`<circle cx="${ox}" cy="${act?24:28}" r="5" fill="${I}"/>`+ln(ox-9,sy,ox+9,sy,I,5)+ln(ox,sy,ox,62,I,8)+(act?ar(ox+14,24,ox+14,36):'');};
   return fig(28,false)+fig(72,true)+t_(28,72,'pasif: omuz kulakta',M,6)+t_(72,72,'aktif: omuz aşağı',A,6.3)+t_(50,80,'önden',M,6);};
 INSET['tripod-top']=()=>`<path d="M50 14 L26 58 L74 58 Z" fill="${A}" fill-opacity=".14" stroke="${A}" stroke-width="1.6" stroke-dasharray="3 2"/><circle cx="50" cy="14" r="7" fill="${I}"/>`+hand(26,58,-1,0,.7)+hand(74,58,1,0,.7)+t_(50,8,'baş',M,6)+t_(50,72,'baş + iki el = üçgen',A,7)+t_(50,80,'üstten',M,6);
 const foot=(x,y,r=0)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-6 10 Q-8 -6 -3 -14 Q0 -17 4 -14 Q8 -6 6 10 Q0 14 -6 10 Z" fill="${I}"/></g>`;
 INSET['feet-top']=()=>foot(38,42,-4)+foot(62,42,4)+ln(30,24,70,24,M,1,'stroke-dasharray="2 2"')+ar(90,60,90,22)+t_(88,17,'ileri',A,6.5)+t_(50,72,'kalça genişliği, ayak ucu ileri',A,6.8)+t_(50,80,'üstten',M,6);
 INSET['knee-track']=()=>{const lg_=(ox,ok)=>ln(ox,8,ok?ox:ox+7,36,I,7)+ln(ok?ox:ox+7,36,ox,62,I,6)+`<circle cx="${ok?ox:ox+7}" cy="36" r="4" fill="${ok?A:'#c0392b'}"/>`+ln(ox-6,64,ox+8,64,I,4)+(ok?OK(ox,72):X(ox,72));return lg_(30,true)+lg_(70,false)+t_(30,80,'diz ayak ucu yönünde',A,5.8)+t_(70,80,'içe düşmesin',M,5.8);};
 INSET['straddle-top']=()=>`<circle cx="50" cy="12" r="5" fill="${I}"/>`+ln(50,16,50,40,I,8)+ln(50,40,16,62,I,6)+ln(50,40,84,62,I,6)+`<path d="M38 50 A14 14 0 0 0 62 50" fill="none" stroke="${A}" stroke-width="1.6"/>`+t_(50,74,'bacaklar geniş, dizler tavana',A,6.8)+t_(50,80,'önden',M,6);
}
function insetSvg(k,b,FS,left,w){w=w||b.w*.4;const x=left?b.x+b.w*.02:b.x+b.w*.98-w,y=b.y+FS*.3,sc=w/100,f=INSET[k];if(!f)return '';
  return `<g transform="translate(${F(x)} ${F(y)}) scale(${F(sc)})"><rect x="0" y="0" width="100" height="80" rx="8" fill="var(--surface,#fff)" stroke="var(--line,#d8dee4)" stroke-width="1.5"/>${f()}</g>`;}
