// shared in-page helpers (stringified into page)
module.exports.PAGE = `
window.AN={};
AN.ang=(a,b,c)=>{const u=[a[0]-b[0],a[1]-b[1]],v=[c[0]-b[0],c[1]-b[1]];return Math.round(Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1])/(Math.hypot(...u)*Math.hypot(...v)||1))))/RD0);};
AN.dir=(a,b)=>Math.round(Math.atan2(b[1]-a[1],b[0]-a[0])/RD0);
AN.met=p=>{const J=joints(p),o={};if(p.front){o.front=1;return o;}
  const a=J.arms[J.arms.length-1],l=J.legs[J.legs.length-1];
  if(a){o.elb=AN.ang(a[3],a[0],a[1]);o.shf=AN.ang(J.P,J.T,a[0]);o.dxSH=+(J.S[0]-a[1][0]).toFixed(2);o.dySH=+(J.S[1]-a[1][1]).toFixed(2);}
  if(l){o.hip=AN.ang(J.T,J.P,l[0]);o.kn=AN.ang(l[4],l[0],l[1]);}
  o.tor=AN.dir(J.P,J.T);o.sh=p.sh||0;o.rb=p.rb||0;o.lb=p.lb||0;return o;};
AN.lv=k=>{const [c,n]=k.split(':');const L=LADDERS[c];const lv=L&&L.levels[+n-1];return lv?{tr:lv.tr,en:lv.en,how:lv.how,type:lv.type}:null;};
AN.bb=(d)=>{let xs=[],ys=[];const add=p=>{const J=joints(p);[J.S,J.P,J.T,J.head,...J.legs.flatMap(l=>[l[0],l[1],l[4]]),...J.arms.flatMap(l=>[l[0],l[1]])].forEach(q=>{xs.push(q[0]);ys.push(q[1]);});};
  d.k.forEach((p,i)=>{add(p);if(i<d.k.length-1)for(let s=1;s<4;s++)add(mix(p,d.k[i+1],s/4));});
  const pad=.22,x0=Math.min(...xs)-pad,x1=Math.max(...xs)+pad,y0=Math.min(...ys)-pad,y1=Math.max(...ys)+pad;let w=x1-x0,h=y1-y0;if(w<h)w=h;else h=w;
  return {x:(x0+x1)/2-w/2,y:-((y0+y1)/2+h/2),w,h};};
AN.frameT=(d,i)=>{const tl=d._tl||(d._tl=timeline(d));let t=0;for(const s of tl){if(s.a===i&&s.b===i)break;t+=s.d;}return t+.05;};
AN.zsvg=(d,i)=>{const s=svgFor(d,AN.frameT(d,i)).svg,b=AN.bb(d);return s.replace(/viewBox="[^"]*"/,'viewBox="'+[b.x,b.y,b.w,b.h].map(v=>v.toFixed(3)).join(' ')+'"');};
`;
