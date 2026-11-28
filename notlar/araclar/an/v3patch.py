import sys
f=sys.argv[1];t=open(f).read()
def R(a,b):
    global t
    assert t.count(a)==1,(t.count(a),a[:80]);t=t.replace(a,b)
# 1) mix passes cue
R("sc:a.sc||b.sc,sup:a.sup||b.sup,","sc:a.sc||b.sc,sup:a.sup||b.sup,cue:t<.5?a.cue:b.cue,")
# 2) anatomy inside torso
old_start="    o+=jd(M,.022)+jd(J.T,.024)+jd(J.P,.026);"
i=t.index(old_start); j=t.index("    return o;};",i)
new=r"""    /* ---- anatomi katmanı: omurga, kaburga, leğen, köprücük, kürek ---- */
    const L2=(a,c,w,op,ex='')=>`<line x1="${F(a[0])}" y1="${F(Y(a[1]))}" x2="${F(c[0])}" y2="${F(Y(c[1]))}" stroke="${OL}" stroke-width="${w}" stroke-linecap="round" stroke-opacity="${op}" ${ex}/>`;
    const ux_=dx/L,uy_=dy/L,LP=(U,B,o0=J.P)=>[o0[0]+ux_*U+bx*B,o0[1]+uy_*U+by*B];
    const mid=(a,c)=>[(a[0]+c[0])/2,(a[1]+c[1])/2];
    /* omurga: boyun → göğüs → bel → sakrum, gerçek eğriyi izler */
    const sp=[at(.02,ws*.5),at(.22,ws*.72+rb*.9),at(.42,ws*.62+rb*.5+lb*.25),[M[0]+bx*wp*.62,M[1]+by*wp*.62],
      (()=>{const q=mid(M,J.P);return[q[0]+bx*(wp*.62+lb*.45),q[1]+by*(wp*.62+lb*.45)];})(),LP(-.01,wp*.5)];
    const cr=(pts,n)=>{const out=[];for(let k=0;k<pts.length-1;k++){const p0=pts[k-1]||pts[k],p1=pts[k],p2=pts[k+1],p3=pts[k+2]||p2;
      for(let s=0;s<n;s++){const u=s/n,u2=u*u,u3=u2*u;out.push([0,1].map(c=>.5*((2*p1[c])+(-p0[c]+p2[c])*u+(2*p0[c]-5*p1[c]+4*p2[c]-p3[c])*u2+(-p0[c]+3*p1[c]-3*p2[c]+p3[c])*u3)));}}out.push(pts[pts.length-1]);return out;};
    const sc_=cr(sp,6);
    o+=`<polyline points="${sc_.map(q=>F(q[0])+','+F(Y(q[1]))).join(' ')}" fill="none" stroke="${OL}" stroke-width=".014" stroke-opacity=".55" stroke-linecap="round"/>`;
    sc_.forEach((q,k)=>{if(k%2===0)o+=`<circle cx="${F(q[0])}" cy="${F(Y(q[1]))}" r="${k<14?.016:.019}" fill="${OL}" fill-opacity=".9"/>`;});
    /* kaburgalar: omurgadan göğüse inen ince yaylar */
    [[.12,.3],[.24,.42],[.36,.52]].forEach(([f0,f1])=>{const a=at(f0,ws*.6+rb*.7),c=at(f1,-ws*.75),m=at((f0+f1)/2-.04,-ws*.05+rb*.3);
      o+=`<path d="M${F(a[0])} ${F(Y(a[1]))} Q${F(m[0])} ${F(Y(m[1]))} ${F(c[0])} ${F(Y(c[1]))}" fill="none" stroke="${OL}" stroke-width=".011" stroke-opacity=".38" stroke-linecap="round"/>`;});
    /* leğen: lb>0 arka tilt (ön kemik yukarı), lb<0 ön tilt */
    {const th=(-8+(lb||0)*260)*RD0,rot=(U,B)=>[U*Math.cos(th)-B*Math.sin(th),B*Math.cos(th)+U*Math.sin(th)],Q=(U,B)=>{const r=rot(U,B);return LP(r[0],r[1]);};
     const asis=Q(.1,-wp*.85),psis=Q(.13,wp*.62),sac=Q(-.06,wp*.5),pub=Q(-.07,-wp*.7);
     o+=`<path d="M${F(asis[0])} ${F(Y(asis[1]))} Q${F(Q(.17,0)[0])} ${F(Y(Q(.17,0)[1]))} ${F(psis[0])} ${F(Y(psis[1]))} L${F(sac[0])} ${F(Y(sac[1]))} Q${F(Q(-.11,0)[0])} ${F(Y(Q(-.11,0)[1]))} ${F(pub[0])} ${F(Y(pub[1]))} Z" fill="${OL}" fill-opacity=".14" stroke="${OL}" stroke-width=".014" stroke-opacity=".75" stroke-linejoin="round"/>`;
     o+=`<circle cx="${F(asis[0])}" cy="${F(Y(asis[1]))}" r=".018" fill="${OL}"/>`;J.pel={asis,psis};}
    /* köprücük: göğüs ucundan omuz eklemine (omuz kalkınca açısı değişir) */
    {const st=at(.08,-ws*.72);o+=L2(st,p.S,.016,.8);J.clav=[st,p.S];}
    /* kürek kemiği: sh yukarı/aşağı kaydırır, pr omurgadan uzaklaştırır (protraksiyon) ya da yaklaştırır */
    {const sh=p.sh||0,pr=p.pr||0,f0=.1-sh*2.4,u0=ws*.98+rb*.55-pr*1.6+Math.max(0,-pr)*.2;
     const sup=at(f0,u0),inf=at(f0+.36,u0-.03),acr=[p.S[0]*.55+sup[0]*.45,p.S[1]*.55+sup[1]*.45],spn=at(f0+.08,u0-.02);
     const col=p.sc?'var(--accent)':OL,op=p.sc?'.95':'.5';
     o+=`<path d="M${F(sup[0])} ${F(Y(sup[1]))} L${F(inf[0])} ${F(Y(inf[1]))} Q${F(at(f0+.2,u0-.12)[0])} ${F(Y(at(f0+.2,u0-.12)[1]))} ${F(acr[0])} ${F(Y(acr[1]))} Z" fill="${col}" fill-opacity="${op}" stroke="${col}" stroke-width=".02" stroke-linejoin="round" stroke-opacity="${op}"/>`;
     o+=`<line x1="${F(spn[0])}" y1="${F(Y(spn[1]))}" x2="${F(acr[0])}" y2="${F(Y(acr[1]))}" stroke="${OL}" stroke-width=".013" stroke-opacity=".7"/>`;
     J.scap={sup,inf,c:mid(sup,inf),u0,f0};J.bkv=[bx,by];J.ax=[ux_,uy_];}
    o+=jd(M,.018)+jd(J.P,.022);
"""
t=t[:i]+new+t[j:]
# 3) deltoid + shoulder ring over near arm, and coaching cues at end
R("  s+=limb(false,1)+front()+limb(false,2);",
r"""  s+=limb(false,1)+front()+limb(false,2);
  if(!p.front&&J.arms.length){const a=J.arms[J.arms.length-1],o0=a[3],e=a[0],ex=e[0]-o0[0],ey=e[1]-o0[1],el=Math.hypot(ex,ey)||1;
    const dc=[o0[0]+ex/el*.03,o0[1]+ey/el*.03];
    s+=`<ellipse cx="${F(dc[0])}" cy="${F(Y(dc[1]))}" rx=".075" ry=".062" transform="rotate(${F(-Math.atan2(ey,ex)/RD0)} ${F(dc[0])} ${F(Y(dc[1]))})" fill="var(--ink)" stroke="${OL}" stroke-width=".018"/>`;
    s+=`<circle cx="${F(o0[0])}" cy="${F(Y(o0[1]))}" r=".034" fill="none" stroke="${OL}" stroke-width=".014"/><circle cx="${F(o0[0])}" cy="${F(Y(o0[1]))}" r=".013" fill="${OL}"/>`;}
  if(p.cue&&!p.front&&(typeof CUEON==='undefined'||CUEON))s+=cueSvg(p,J);""")
# 4) cue renderer
R("const F=n=>n.toFixed(3);\nfunction svgFor(d,time){",
r"""const F=n=>n.toFixed(3);
/* koç işaretleri: p.cue=['plumb','ang:elb','line','scap','dep','bel'] — değerler pozdan hesaplanır */
function cueSvg(p,J){const Y=y=>-y,A='var(--accent)',fa=p.facing??1;let o='';
  const tx=(q,s,anc='middle')=>`<text x="${F(q[0])}" y="${F(Y(q[1]))}" font-size=".085" font-weight="800" font-family="system-ui,sans-serif" text-anchor="${anc}" fill="${A}" stroke="var(--stage)" stroke-width=".035" paint-order="stroke" stroke-linejoin="round">${s}</text>`;
  const dl=(a,c,w=.016)=>`<line x1="${F(a[0])}" y1="${F(Y(a[1]))}" x2="${F(c[0])}" y2="${F(Y(c[1]))}" stroke="${A}" stroke-width="${w}" stroke-dasharray=".045 .035" stroke-linecap="round"/>`;
  const arw=(a,c)=>{const dx=c[0]-a[0],dy=c[1]-a[1],l=Math.hypot(dx,dy)||1,ux=dx/l,uy=dy/l,h=.045,w=.03;
    return `<line x1="${F(a[0])}" y1="${F(Y(a[1]))}" x2="${F(c[0]-ux*h*.6)}" y2="${F(Y(c[1]-uy*h*.6))}" stroke="${A}" stroke-width=".022" stroke-linecap="round"/><path d="M${F(c[0])} ${F(Y(c[1]))} L${F(c[0]-ux*h-uy*w)} ${F(Y(c[1]-uy*h+ux*w))} L${F(c[0]-ux*h+uy*w)} ${F(Y(c[1]-uy*h-ux*w))} Z" fill="${A}"/>`;};
  const ang=(a,b,c)=>{const u=[a[0]-b[0],a[1]-b[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.round(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))))/RD0);};
  const arc=(a,b,c,lab)=>{const r=.11,a1=Math.atan2(a[1]-b[1],a[0]-b[0]),a2=Math.atan2(c[1]-b[1],c[0]-b[0]);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
    const P1=[b[0]+r*Math.cos(a1),b[1]+r*Math.sin(a1)],P2=[b[0]+r*Math.cos(a1+d),b[1]+r*Math.sin(a1+d)],mid=a1+d/2,T=[b[0]+(r+.1)*Math.cos(mid),b[1]+(r+.1)*Math.sin(mid)-.03];
    return `<path d="M${F(b[0])} ${F(Y(b[1]))} L${F(P1[0])} ${F(Y(P1[1]))} A${r} ${r} 0 0 ${d>0?0:1} ${F(P2[0])} ${F(Y(P2[1]))} Z" fill="${A}" fill-opacity=".22" stroke="${A}" stroke-width=".016"/>`+tx(T,lab+' '+ang(a,b,c)+'°');};
  const arm=J.arms[J.arms.length-1],leg=J.legs[J.legs.length-1];
  (p.cue||[]).forEach(c=>{
    if(c==='plumb'&&arm){const H=arm[1],S=arm[3],top=Math.max(S[1],H[1])+.2,dxs=(S[0]-H[0])*fa,cm=Math.round(Math.abs(dxs)*100);
      const w=dxs>.04?'omuz önde':dxs<-.04?'omuz geride':'omuz üstte';
      o+=dl(H,[H[0],top])+`<line x1="${F(H[0])}" y1="${F(Y(S[1]))}" x2="${F(S[0])}" y2="${F(Y(S[1]))}" stroke="${A}" stroke-width=".02"/>`+`<circle cx="${F(S[0])}" cy="${F(Y(S[1]))}" r=".02" fill="${A}"/>`+tx([H[0]+fa*.02,top+.03],w,fa>0?'start':'end');}
    if(c==='ang:elb'&&arm)o+=arc(arm[3],arm[0],arm[1],'dirsek');
    if(c==='ang:hip'&&leg)o+=arc(J.T,J.P,leg[0],'kalça');
    if(c==='ang:knee'&&leg)o+=arc(leg[4],leg[0],leg[1],'diz');
    if(c==='ang:sh'&&arm)o+=arc(J.P,arm[3],arm[0],'omuz');
    if(c==='line'&&leg){const a=J.head,z=leg[1],dx=z[0]-a[0],dy=z[1]-a[1],l=Math.hypot(dx,dy)||1,dev=Math.abs(((J.P[0]-a[0])*dy-(J.P[1]-a[1])*dx)/l);
      o+=dl([a[0]-dx/l*.08,a[1]-dy/l*.08],[z[0]+dx/l*.08,z[1]+dy/l*.08],.014)+tx([J.P[0],J.P[1]+.2],dev<.05?'düz çizgi':'çizgi bozuk');}
    if(c==='scap'&&J.scap){const pr=p.pr||0,cc=J.scap.c,b=J.bkv,ins=[-b[0],-b[1]];const lab=pr<-.02?'kürek sık':pr>.02?'kürek aç':'kürek nötr';
      const from=[cc[0]+b[0]*.17,cc[1]+b[1]*.17];
      o+=pr<0?arw([from[0]+ins[0]*.13,from[1]+ins[1]*.13],[from[0]-ins[0]*.02,from[1]-ins[1]*.02]):arw(from,[from[0]+b[0]*.13,from[1]+b[1]*.13]);
      o+=tx([from[0]+b[0]*.2,from[1]+b[1]*.2+.03],lab);}
    if(c==='dep'&&J.scap){const sh=p.sh||0,cc=J.scap.c,u=J.ax,b=J.bkv,base=[cc[0]+b[0]*.16,cc[1]+b[1]*.16],dn=sh<0?-1:1,lab=sh<-.02?'omuz aşağı':sh>.02?'omuz kulağa':'omuz nötr';
      o+=arw([base[0]-u[0]*dn*.07,base[1]-u[1]*dn*.07],[base[0]+u[0]*dn*.07,base[1]+u[1]*dn*.07])+tx([base[0]+b[0]*.12,base[1]+b[1]*.12-.02],lab,b[0]*fa>=0?'start':'end');}
    if(c==='bel'&&J.pel){const lb=p.lb||0,q=[J.P[0]*.6+J.T[0]*.4,J.P[1]*.6+J.T[1]*.4],b=J.bkv,lab=lb>.02?'bel düz':lb<-.02?'bel çukur':'bel nötr',k=[q[0]+b[0]*.17,q[1]+b[1]*.17];
      o+=`<circle cx="${F(k[0])}" cy="${F(Y(k[1]))}" r=".02" fill="${A}"/>`+tx([k[0]+b[0]*.06,k[1]+b[1]*.06-.1],lab);}
  });return o;}
function svgFor(d,time){""")
# remove old jd(J.T) duplicate dot line is gone; also remove old sc triangle block if present
open(f,'w').write(t)
