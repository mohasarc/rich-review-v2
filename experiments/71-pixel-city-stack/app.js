(()=>{var e_=Object.create;var ld=Object.defineProperty;var n_=Object.getOwnPropertyDescriptor;var i_=Object.getOwnPropertyNames;var s_=Object.getPrototypeOf,r_=Object.prototype.hasOwnProperty;var he=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var a_=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of i_(t))!r_.call(i,s)&&s!==e&&ld(i,s,{get:()=>t[s],enumerable:!(n=n_(t,s))||n.enumerable});return i};var o_=(i,t,e)=>(e=i!=null?e_(s_(i)):{},a_(t||!i||!i.__esModule?ld(e,"default",{value:i,enumerable:!0}):e,i));var Pm=he((Rm,ka)=>{(function(){var i,t,e,n,s,r,a,o,c,l,h,u,d,g,_;e=Math.floor,l=Math.min,t=function(p,m){return p<m?-1:p>m?1:0},c=function(p,m,f,y,M){var x;if(f==null&&(f=0),M==null&&(M=t),f<0)throw new Error("lo must be non-negative");for(y==null&&(y=p.length);f<y;)x=e((f+y)/2),M(m,p[x])<0?y=x:f=x+1;return[].splice.apply(p,[f,f-f].concat(m)),m},r=function(p,m,f){return f==null&&(f=t),p.push(m),g(p,0,p.length-1,f)},s=function(p,m){var f,y;return m==null&&(m=t),f=p.pop(),p.length?(y=p[0],p[0]=f,_(p,0,m)):y=f,y},o=function(p,m,f){var y;return f==null&&(f=t),y=p[0],p[0]=m,_(p,0,f),y},a=function(p,m,f){var y;return f==null&&(f=t),p.length&&f(p[0],m)<0&&(y=[p[0],m],m=y[0],p[0]=y[1],_(p,0,f)),m},n=function(p,m){var f,y,M,x,S,w,A,R;for(m==null&&(m=t),w=(function(){R=[];for(var v=0,T=e(p.length/2);0<=T?v<T:v>T;0<=T?v++:v--)R.push(v);return R}).apply(this).reverse(),A=[],y=0,x=w.length;y<x;y++)f=w[y],A.push(_(p,f,m));return A},d=function(p,m,f){var y;if(f==null&&(f=t),y=p.indexOf(m),y!==-1)return g(p,0,y,f),_(p,y,f)},h=function(p,m,f){var y,M,x,S,w;if(f==null&&(f=t),M=p.slice(0,m),!M.length)return M;for(n(M,f),w=p.slice(m),x=0,S=w.length;x<S;x++)y=w[x],a(M,y,f);return M.sort(f).reverse()},u=function(p,m,f){var y,M,x,S,w,A,R,v,T,I;if(f==null&&(f=t),m*10<=p.length){if(S=p.slice(0,m).sort(f),!S.length)return S;for(x=S[S.length-1],v=p.slice(m),w=0,R=v.length;w<R;w++)y=v[w],f(y,x)<0&&(c(S,y,0,null,f),S.pop(),x=S[S.length-1]);return S}for(n(p,f),I=[],M=A=0,T=l(m,p.length);0<=T?A<T:A>T;M=0<=T?++A:--A)I.push(s(p,f));return I},g=function(p,m,f,y){var M,x,S;for(y==null&&(y=t),M=p[f];f>m;){if(S=f-1>>1,x=p[S],y(M,x)<0){p[f]=x,f=S;continue}break}return p[f]=M},_=function(p,m,f){var y,M,x,S,w;for(f==null&&(f=t),M=p.length,w=m,x=p[m],y=2*m+1;y<M;)S=y+1,S<M&&!(f(p[y],p[S])<0)&&(y=S),p[m]=p[y],m=y,y=2*m+1;return p[m]=x,g(p,w,m,f)},i=(function(){p.push=r,p.pop=s,p.replace=o,p.pushpop=a,p.heapify=n,p.updateItem=d,p.nlargest=h,p.nsmallest=u;function p(m){this.cmp=m??t,this.nodes=[]}return p.prototype.push=function(m){return r(this.nodes,m,this.cmp)},p.prototype.pop=function(){return s(this.nodes,this.cmp)},p.prototype.peek=function(){return this.nodes[0]},p.prototype.contains=function(m){return this.nodes.indexOf(m)!==-1},p.prototype.replace=function(m){return o(this.nodes,m,this.cmp)},p.prototype.pushpop=function(m){return a(this.nodes,m,this.cmp)},p.prototype.heapify=function(){return n(this.nodes,this.cmp)},p.prototype.updateItem=function(m){return d(this.nodes,m,this.cmp)},p.prototype.clear=function(){return this.nodes=[]},p.prototype.empty=function(){return this.nodes.length===0},p.prototype.size=function(){return this.nodes.length},p.prototype.clone=function(){var m;return m=new p,m.nodes=this.nodes.slice(0),m},p.prototype.toArray=function(){return this.nodes.slice(0)},p.prototype.insert=p.prototype.push,p.prototype.top=p.prototype.peek,p.prototype.front=p.prototype.peek,p.prototype.has=p.prototype.contains,p.prototype.copy=p.prototype.clone,p})(),typeof ka<"u"&&ka!==null&&ka.exports?ka.exports=i:window.Heap=i}).call(Rm)});var za=he((UA,Im)=>{Im.exports=Pm()});var lc=he((OA,Dm)=>{function DS(i,t,e){this.x=i,this.y=t,this.walkable=e===void 0?!0:e}Dm.exports=DS});var cn=he((FA,Lm)=>{var LS={Always:1,Never:2,IfAtMostOneObstacle:3,OnlyWhenNoObstacles:4};Lm.exports=LS});var Om=he((BA,Um)=>{var Nm=lc(),cc=cn();function Pi(i,t,e){var n;typeof i!="object"?n=i:(t=i.length,n=i[0].length,e=i),this.width=n,this.height=t,this.nodes=this._buildNodes(n,t,e)}Pi.prototype._buildNodes=function(i,t,e){var n,s,r=new Array(t);for(n=0;n<t;++n)for(r[n]=new Array(i),s=0;s<i;++s)r[n][s]=new Nm(s,n);if(e===void 0)return r;if(e.length!==t||e[0].length!==i)throw new Error("Matrix size does not fit");for(n=0;n<t;++n)for(s=0;s<i;++s)e[n][s]&&(r[n][s].walkable=!1);return r};Pi.prototype.getNodeAt=function(i,t){return this.nodes[t][i]};Pi.prototype.isWalkableAt=function(i,t){return this.isInside(i,t)&&this.nodes[t][i].walkable};Pi.prototype.isInside=function(i,t){return i>=0&&i<this.width&&t>=0&&t<this.height};Pi.prototype.setWalkableAt=function(i,t,e){this.nodes[t][i].walkable=e};Pi.prototype.getNeighbors=function(i,t){var e=i.x,n=i.y,s=[],r=!1,a=!1,o=!1,c=!1,l=!1,h=!1,u=!1,d=!1,g=this.nodes;if(this.isWalkableAt(e,n-1)&&(s.push(g[n-1][e]),r=!0),this.isWalkableAt(e+1,n)&&(s.push(g[n][e+1]),o=!0),this.isWalkableAt(e,n+1)&&(s.push(g[n+1][e]),l=!0),this.isWalkableAt(e-1,n)&&(s.push(g[n][e-1]),u=!0),t===cc.Never)return s;if(t===cc.OnlyWhenNoObstacles)a=u&&r,c=r&&o,h=o&&l,d=l&&u;else if(t===cc.IfAtMostOneObstacle)a=u||r,c=r||o,h=o||l,d=l||u;else if(t===cc.Always)a=!0,c=!0,h=!0,d=!0;else throw new Error("Incorrect value of diagonalMovement");return a&&this.isWalkableAt(e-1,n-1)&&s.push(g[n-1][e-1]),c&&this.isWalkableAt(e+1,n-1)&&s.push(g[n-1][e+1]),h&&this.isWalkableAt(e+1,n+1)&&s.push(g[n+1][e+1]),d&&this.isWalkableAt(e-1,n+1)&&s.push(g[n+1][e-1]),s};Pi.prototype.clone=function(){var i,t,e=this.width,n=this.height,s=this.nodes,r=new Pi(e,n),a=new Array(n);for(i=0;i<n;++i)for(a[i]=new Array(e),t=0;t<e;++t)a[i][t]=new Nm(t,i,s[i][t].walkable);return r.nodes=a,r};Um.exports=Pi});var ns=he(es=>{function Fu(i){for(var t=[[i.x,i.y]];i.parent;)i=i.parent,t.push([i.x,i.y]);return t.reverse()}es.backtrace=Fu;function NS(i,t){var e=Fu(i),n=Fu(t);return e.concat(n.reverse())}es.biBacktrace=NS;function US(i){var t,e=0,n,s,r,a;for(t=1;t<i.length;++t)n=i[t-1],s=i[t],r=n[0]-s[0],a=n[1]-s[1],e+=Math.sqrt(r*r+a*a);return e}es.pathLength=US;function Bu(i,t,e,n){var s=Math.abs,r=[],a,o,c,l,h,u;for(c=s(e-i),l=s(n-t),a=i<e?1:-1,o=t<n?1:-1,h=c-l;r.push([i,t]),!(i===e&&t===n);)u=2*h,u>-l&&(h=h-l,i=i+a),u<c&&(h=h+c,t=t+o);return r}es.interpolate=Bu;function OS(i){var t=[],e=i.length,n,s,r,a,o,c;if(e<2)return t;for(o=0;o<e-1;++o)for(n=i[o],s=i[o+1],r=Bu(n[0],n[1],s[0],s[1]),a=r.length,c=0;c<a-1;++c)t.push(r[c]);return t.push(i[e-1]),t}es.expandPath=OS;function FS(i,t){var e=t.length,n=t[0][0],s=t[0][1],r=t[e-1][0],a=t[e-1][1],o,c,l,h,u,d,g,_,p,m,f;for(o=n,c=s,u=[[o,c]],d=2;d<e;++d){for(_=t[d],l=_[0],h=_[1],p=Bu(o,c,l,h),f=!1,g=1;g<p.length;++g)if(m=p[g],!i.isWalkableAt(m[0],m[1])){f=!0;break}f&&(lastValidCoord=t[d-1],u.push(lastValidCoord),o=lastValidCoord[0],c=lastValidCoord[1])}return u.push([r,a]),u}es.smoothenPath=FS;function BS(i){if(i.length<3)return i;var t=[],e=i[0][0],n=i[0][1],s=i[1][0],r=i[1][1],a=s-e,o=r-n,c,l,h,u,d,g;for(d=Math.sqrt(a*a+o*o),a/=d,o/=d,t.push([e,n]),g=2;g<i.length;g++)c=s,l=r,h=a,u=o,s=i[g][0],r=i[g][1],a=s-c,o=r-l,d=Math.sqrt(a*a+o*o),a/=d,o/=d,(a!==h||o!==u)&&t.push([c,l]);return t.push([s,r]),t}es.compressPath=BS});var Ur=he((zA,Fm)=>{Fm.exports={manhattan:function(i,t){return i+t},euclidean:function(i,t){return Math.sqrt(i*i+t*t)},octile:function(i,t){var e=Math.SQRT2-1;return i<t?e*i+t:e*t+i},chebyshev:function(i,t){return Math.max(i,t)}}});var uc=he((VA,km)=>{var kS=za(),zS=ns(),ku=Ur(),hc=cn();function Bm(i){i=i||{},this.allowDiagonal=i.allowDiagonal,this.dontCrossCorners=i.dontCrossCorners,this.heuristic=i.heuristic||ku.manhattan,this.weight=i.weight||1,this.diagonalMovement=i.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=hc.OnlyWhenNoObstacles:this.diagonalMovement=hc.IfAtMostOneObstacle:this.diagonalMovement=hc.Never),this.diagonalMovement===hc.Never?this.heuristic=i.heuristic||ku.manhattan:this.heuristic=i.heuristic||ku.octile}Bm.prototype.findPath=function(i,t,e,n,s){var r=new kS(function(S,w){return S.f-w.f}),a=s.getNodeAt(i,t),o=s.getNodeAt(e,n),c=this.heuristic,l=this.diagonalMovement,h=this.weight,u=Math.abs,d=Math.SQRT2,g,_,p,m,f,y,M,x;for(a.g=0,a.f=0,r.push(a),a.opened=!0;!r.empty();){if(g=r.pop(),g.closed=!0,g===o)return zS.backtrace(o);for(_=s.getNeighbors(g,l),m=0,f=_.length;m<f;++m)p=_[m],!p.closed&&(y=p.x,M=p.y,x=g.g+(y-g.x===0||M-g.y===0?1:d),(!p.opened||x<p.g)&&(p.g=x,p.h=p.h||h*c(u(y-e),u(M-n)),p.f=p.g+p.h,p.parent=g,p.opened?r.updateItem(p):(r.push(p),p.opened=!0)))}return[]};km.exports=Bm});var Hm=he((HA,Vm)=>{var zm=uc();function dc(i){zm.call(this,i);var t=this.heuristic;this.heuristic=function(e,n){return t(e,n)*1e6}}dc.prototype=new zm;dc.prototype.constructor=dc;Vm.exports=dc});var Xm=he((GA,Wm)=>{var VS=ns(),zu=cn();function Gm(i){i=i||{},this.allowDiagonal=i.allowDiagonal,this.dontCrossCorners=i.dontCrossCorners,this.diagonalMovement=i.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=zu.OnlyWhenNoObstacles:this.diagonalMovement=zu.IfAtMostOneObstacle:this.diagonalMovement=zu.Never)}Gm.prototype.findPath=function(i,t,e,n,s){var r=[],a=this.diagonalMovement,o=s.getNodeAt(i,t),c=s.getNodeAt(e,n),l,h,u,d,g;for(r.push(o),o.opened=!0;r.length;){if(u=r.shift(),u.closed=!0,u===c)return VS.backtrace(c);for(l=s.getNeighbors(u,a),d=0,g=l.length;d<g;++d)h=l[d],!(h.closed||h.opened)&&(r.push(h),h.opened=!0,h.parent=u)}return[]};Wm.exports=Gm});var Zm=he((WA,Ym)=>{var qm=uc();function fc(i){qm.call(this,i),this.heuristic=function(t,e){return 0}}fc.prototype=new qm;fc.prototype.constructor=fc;Ym.exports=fc});var mc=he((XA,jm)=>{var $m=za(),Jm=ns(),Vu=Ur(),pc=cn();function Km(i){i=i||{},this.allowDiagonal=i.allowDiagonal,this.dontCrossCorners=i.dontCrossCorners,this.diagonalMovement=i.diagonalMovement,this.heuristic=i.heuristic||Vu.manhattan,this.weight=i.weight||1,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=pc.OnlyWhenNoObstacles:this.diagonalMovement=pc.IfAtMostOneObstacle:this.diagonalMovement=pc.Never),this.diagonalMovement===pc.Never?this.heuristic=i.heuristic||Vu.manhattan:this.heuristic=i.heuristic||Vu.octile}Km.prototype.findPath=function(i,t,e,n,s){var r=function(v,T){return v.f-T.f},a=new $m(r),o=new $m(r),c=s.getNodeAt(i,t),l=s.getNodeAt(e,n),h=this.heuristic,u=this.diagonalMovement,d=this.weight,g=Math.abs,_=Math.SQRT2,p,m,f,y,M,x,S,w,A=1,R=2;for(c.g=0,c.f=0,a.push(c),c.opened=A,l.g=0,l.f=0,o.push(l),l.opened=R;!a.empty()&&!o.empty();){for(p=a.pop(),p.closed=!0,m=s.getNeighbors(p,u),y=0,M=m.length;y<M;++y)if(f=m[y],!f.closed){if(f.opened===R)return Jm.biBacktrace(p,f);x=f.x,S=f.y,w=p.g+(x-p.x===0||S-p.y===0?1:_),(!f.opened||w<f.g)&&(f.g=w,f.h=f.h||d*h(g(x-e),g(S-n)),f.f=f.g+f.h,f.parent=p,f.opened?a.updateItem(f):(a.push(f),f.opened=A))}for(p=o.pop(),p.closed=!0,m=s.getNeighbors(p,u),y=0,M=m.length;y<M;++y)if(f=m[y],!f.closed){if(f.opened===A)return Jm.biBacktrace(f,p);x=f.x,S=f.y,w=p.g+(x-p.x===0||S-p.y===0?1:_),(!f.opened||w<f.g)&&(f.g=w,f.h=f.h||d*h(g(x-i),g(S-t)),f.f=f.g+f.h,f.parent=p,f.opened?o.updateItem(f):(o.push(f),f.opened=R))}}return[]};jm.exports=Km});var eg=he((qA,tg)=>{var Qm=mc();function gc(i){Qm.call(this,i);var t=this.heuristic;this.heuristic=function(e,n){return t(e,n)*1e6}}gc.prototype=new Qm;gc.prototype.constructor=gc;tg.exports=gc});var rg=he((YA,sg)=>{var ng=ns(),Hu=cn();function ig(i){i=i||{},this.allowDiagonal=i.allowDiagonal,this.dontCrossCorners=i.dontCrossCorners,this.diagonalMovement=i.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=Hu.OnlyWhenNoObstacles:this.diagonalMovement=Hu.IfAtMostOneObstacle:this.diagonalMovement=Hu.Never)}ig.prototype.findPath=function(i,t,e,n,s){var r=s.getNodeAt(i,t),a=s.getNodeAt(e,n),o=[],c=[],l,h,u,d=this.diagonalMovement,g=0,_=1,p,m;for(o.push(r),r.opened=!0,r.by=g,c.push(a),a.opened=!0,a.by=_;o.length&&c.length;){for(u=o.shift(),u.closed=!0,l=s.getNeighbors(u,d),p=0,m=l.length;p<m;++p)if(h=l[p],!h.closed){if(h.opened){if(h.by===_)return ng.biBacktrace(u,h);continue}o.push(h),h.parent=u,h.opened=!0,h.by=g}for(u=c.shift(),u.closed=!0,l=s.getNeighbors(u,d),p=0,m=l.length;p<m;++p)if(h=l[p],!h.closed){if(h.opened){if(h.by===g)return ng.biBacktrace(h,u);continue}c.push(h),h.parent=u,h.opened=!0,h.by=_}}return[]};sg.exports=ig});var lg=he((ZA,og)=>{var ag=mc();function _c(i){ag.call(this,i),this.heuristic=function(t,e){return 0}}_c.prototype=new ag;_c.prototype.constructor=_c;og.exports=_c});var dg=he((JA,ug)=>{var $A=ns(),Gu=Ur(),cg=lc(),xc=cn();function hg(i){i=i||{},this.allowDiagonal=i.allowDiagonal,this.dontCrossCorners=i.dontCrossCorners,this.diagonalMovement=i.diagonalMovement,this.heuristic=i.heuristic||Gu.manhattan,this.weight=i.weight||1,this.trackRecursion=i.trackRecursion||!1,this.timeLimit=i.timeLimit||1/0,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=xc.OnlyWhenNoObstacles:this.diagonalMovement=xc.IfAtMostOneObstacle:this.diagonalMovement=xc.Never),this.diagonalMovement===xc.Never?this.heuristic=i.heuristic||Gu.manhattan:this.heuristic=i.heuristic||Gu.octile}hg.prototype.findPath=function(i,t,e,n,s){var r=0,a=new Date().getTime(),o=(function(m,f){return this.heuristic(Math.abs(f.x-m.x),Math.abs(f.y-m.y))}).bind(this),c=function(m,f){return m.x===f.x||m.y===f.y?1:Math.SQRT2},l=(function(m,f,y,M,x){if(r++,this.timeLimit>0&&new Date().getTime()-a>this.timeLimit*1e3)return 1/0;var S=f+o(m,u)*this.weight;if(S>y)return S;if(m==u)return M[x]=[m.x,m.y],m;var w,A,R,v,T=s.getNeighbors(m,this.diagonalMovement);for(R=0,w=1/0;v=T[R];++R){if(this.trackRecursion&&(v.retainCount=v.retainCount+1||1,v.tested!==!0&&(v.tested=!0)),A=l(v,f+c(m,v),y,M,x+1),A instanceof cg)return M[x]=[m.x,m.y],A;this.trackRecursion&&--v.retainCount===0&&(v.tested=!1),A<w&&(w=A)}return w}).bind(this),h=s.getNodeAt(i,t),u=s.getNodeAt(e,n),d=o(h,u),g,_,p;for(g=0;;++g){if(_=[],p=l(h,0,d,_,0),p===1/0)return[];if(p instanceof cg)return _;d=p}return[]};ug.exports=hg});var Va=he((jA,mg)=>{var HS=za(),fg=ns(),pg=Ur(),KA=cn();function Wu(i){i=i||{},this.heuristic=i.heuristic||pg.manhattan,this.trackJumpRecursion=i.trackJumpRecursion||!1}Wu.prototype.findPath=function(i,t,e,n,s){var r=this.openList=new HS(function(l,h){return l.f-h.f}),a=this.startNode=s.getNodeAt(i,t),o=this.endNode=s.getNodeAt(e,n),c;for(this.grid=s,a.g=0,a.f=0,r.push(a),a.opened=!0;!r.empty();){if(c=r.pop(),c.closed=!0,c===o)return fg.expandPath(fg.backtrace(o));this._identifySuccessors(c)}return[]};Wu.prototype._identifySuccessors=function(i){var t=this.grid,e=this.heuristic,n=this.openList,s=this.endNode.x,r=this.endNode.y,a,o,c,l,h,u=i.x,d=i.y,g,_,p,m,f,y,M,x=Math.abs,S=Math.max;for(a=this._findNeighbors(i),l=0,h=a.length;l<h;++l)if(o=a[l],c=this._jump(o[0],o[1],u,d),c){if(g=c[0],_=c[1],M=t.getNodeAt(g,_),M.closed)continue;f=pg.octile(x(g-u),x(_-d)),y=i.g+f,(!M.opened||y<M.g)&&(M.g=y,M.h=M.h||e(x(g-s),x(_-r)),M.f=M.g+M.h,M.parent=i,M.opened?n.updateItem(M):(n.push(M),M.opened=!0))}};mg.exports=Wu});var xg=he((QA,_g)=>{var gg=Va(),GS=cn();function Or(i){gg.call(this,i)}Or.prototype=new gg;Or.prototype.constructor=Or;Or.prototype._jump=function(i,t,e,n){var s=this.grid,r=i-e,a=t-n;if(!s.isWalkableAt(i,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(i,t).tested=!0),s.getNodeAt(i,t)===this.endNode)return[i,t];if(r!==0){if(s.isWalkableAt(i,t-1)&&!s.isWalkableAt(i-r,t-1)||s.isWalkableAt(i,t+1)&&!s.isWalkableAt(i-r,t+1))return[i,t]}else if(a!==0){if(s.isWalkableAt(i-1,t)&&!s.isWalkableAt(i-1,t-a)||s.isWalkableAt(i+1,t)&&!s.isWalkableAt(i+1,t-a))return[i,t];if(this._jump(i+1,t,i,t)||this._jump(i-1,t,i,t))return[i,t]}else throw new Error("Only horizontal and vertical movements are allowed");return this._jump(i+r,t+a,i,t)};Or.prototype._findNeighbors=function(i){var t=i.parent,e=i.x,n=i.y,s=this.grid,r,a,o,c,l,h,u=[],d,g,_,p;if(t)r=t.x,a=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(n-a)/Math.max(Math.abs(n-a),1),l!==0?(s.isWalkableAt(e,n-1)&&u.push([e,n-1]),s.isWalkableAt(e,n+1)&&u.push([e,n+1]),s.isWalkableAt(e+l,n)&&u.push([e+l,n])):h!==0&&(s.isWalkableAt(e-1,n)&&u.push([e-1,n]),s.isWalkableAt(e+1,n)&&u.push([e+1,n]),s.isWalkableAt(e,n+h)&&u.push([e,n+h]));else for(d=s.getNeighbors(i,GS.Never),_=0,p=d.length;_<p;++_)g=d[_],u.push([g.x,g.y]);return u};_g.exports=Or});var Mg=he((tC,vg)=>{var yg=Va(),WS=cn();function Fr(i){yg.call(this,i)}Fr.prototype=new yg;Fr.prototype.constructor=Fr;Fr.prototype._jump=function(i,t,e,n){var s=this.grid,r=i-e,a=t-n;if(!s.isWalkableAt(i,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(i,t).tested=!0),s.getNodeAt(i,t)===this.endNode)return[i,t];if(r!==0&&a!==0){if(s.isWalkableAt(i-r,t+a)&&!s.isWalkableAt(i-r,t)||s.isWalkableAt(i+r,t-a)&&!s.isWalkableAt(i,t-a))return[i,t];if(this._jump(i+r,t,i,t)||this._jump(i,t+a,i,t))return[i,t]}else if(r!==0){if(s.isWalkableAt(i+r,t+1)&&!s.isWalkableAt(i,t+1)||s.isWalkableAt(i+r,t-1)&&!s.isWalkableAt(i,t-1))return[i,t]}else if(s.isWalkableAt(i+1,t+a)&&!s.isWalkableAt(i+1,t)||s.isWalkableAt(i-1,t+a)&&!s.isWalkableAt(i-1,t))return[i,t];return this._jump(i+r,t+a,i,t)};Fr.prototype._findNeighbors=function(i){var t=i.parent,e=i.x,n=i.y,s=this.grid,r,a,o,c,l,h,u=[],d,g,_,p;if(t)r=t.x,a=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(n-a)/Math.max(Math.abs(n-a),1),l!==0&&h!==0?(s.isWalkableAt(e,n+h)&&u.push([e,n+h]),s.isWalkableAt(e+l,n)&&u.push([e+l,n]),s.isWalkableAt(e+l,n+h)&&u.push([e+l,n+h]),s.isWalkableAt(e-l,n)||u.push([e-l,n+h]),s.isWalkableAt(e,n-h)||u.push([e+l,n-h])):l===0?(s.isWalkableAt(e,n+h)&&u.push([e,n+h]),s.isWalkableAt(e+1,n)||u.push([e+1,n+h]),s.isWalkableAt(e-1,n)||u.push([e-1,n+h])):(s.isWalkableAt(e+l,n)&&u.push([e+l,n]),s.isWalkableAt(e,n+1)||u.push([e+l,n+1]),s.isWalkableAt(e,n-1)||u.push([e+l,n-1]));else for(d=s.getNeighbors(i,WS.Always),_=0,p=d.length;_<p;++_)g=d[_],u.push([g.x,g.y]);return u};vg.exports=Fr});var Tg=he((eC,Sg)=>{var bg=Va(),XS=cn();function Br(i){bg.call(this,i)}Br.prototype=new bg;Br.prototype.constructor=Br;Br.prototype._jump=function(i,t,e,n){var s=this.grid,r=i-e,a=t-n;if(!s.isWalkableAt(i,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(i,t).tested=!0),s.getNodeAt(i,t)===this.endNode)return[i,t];if(r!==0&&a!==0){if(this._jump(i+r,t,i,t)||this._jump(i,t+a,i,t))return[i,t]}else if(r!==0){if(s.isWalkableAt(i,t-1)&&!s.isWalkableAt(i-r,t-1)||s.isWalkableAt(i,t+1)&&!s.isWalkableAt(i-r,t+1))return[i,t]}else if(a!==0&&(s.isWalkableAt(i-1,t)&&!s.isWalkableAt(i-1,t-a)||s.isWalkableAt(i+1,t)&&!s.isWalkableAt(i+1,t-a)))return[i,t];return s.isWalkableAt(i+r,t)&&s.isWalkableAt(i,t+a)?this._jump(i+r,t+a,i,t):null};Br.prototype._findNeighbors=function(i){var t=i.parent,e=i.x,n=i.y,s=this.grid,r,a,o,c,l,h,u=[],d,g,_,p;if(t)if(r=t.x,a=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(n-a)/Math.max(Math.abs(n-a),1),l!==0&&h!==0)s.isWalkableAt(e,n+h)&&u.push([e,n+h]),s.isWalkableAt(e+l,n)&&u.push([e+l,n]),s.isWalkableAt(e,n+h)&&s.isWalkableAt(e+l,n)&&u.push([e+l,n+h]);else{var m;if(l!==0){m=s.isWalkableAt(e+l,n);var f=s.isWalkableAt(e,n+1),y=s.isWalkableAt(e,n-1);m&&(u.push([e+l,n]),f&&u.push([e+l,n+1]),y&&u.push([e+l,n-1])),f&&u.push([e,n+1]),y&&u.push([e,n-1])}else if(h!==0){m=s.isWalkableAt(e,n+h);var M=s.isWalkableAt(e+1,n),x=s.isWalkableAt(e-1,n);m&&(u.push([e,n+h]),M&&u.push([e+1,n+h]),x&&u.push([e-1,n+h])),M&&u.push([e+1,n]),x&&u.push([e-1,n])}}else for(d=s.getNeighbors(i,XS.OnlyWhenNoObstacles),_=0,p=d.length;_<p;++_)g=d[_],u.push([g.x,g.y]);return u};Sg.exports=Br});var Ag=he((nC,wg)=>{var Eg=Va(),qS=cn();function kr(i){Eg.call(this,i)}kr.prototype=new Eg;kr.prototype.constructor=kr;kr.prototype._jump=function(i,t,e,n){var s=this.grid,r=i-e,a=t-n;if(!s.isWalkableAt(i,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(i,t).tested=!0),s.getNodeAt(i,t)===this.endNode)return[i,t];if(r!==0&&a!==0){if(s.isWalkableAt(i-r,t+a)&&!s.isWalkableAt(i-r,t)||s.isWalkableAt(i+r,t-a)&&!s.isWalkableAt(i,t-a))return[i,t];if(this._jump(i+r,t,i,t)||this._jump(i,t+a,i,t))return[i,t]}else if(r!==0){if(s.isWalkableAt(i+r,t+1)&&!s.isWalkableAt(i,t+1)||s.isWalkableAt(i+r,t-1)&&!s.isWalkableAt(i,t-1))return[i,t]}else if(s.isWalkableAt(i+1,t+a)&&!s.isWalkableAt(i+1,t)||s.isWalkableAt(i-1,t+a)&&!s.isWalkableAt(i-1,t))return[i,t];return s.isWalkableAt(i+r,t)||s.isWalkableAt(i,t+a)?this._jump(i+r,t+a,i,t):null};kr.prototype._findNeighbors=function(i){var t=i.parent,e=i.x,n=i.y,s=this.grid,r,a,o,c,l,h,u=[],d,g,_,p;if(t)r=t.x,a=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(n-a)/Math.max(Math.abs(n-a),1),l!==0&&h!==0?(s.isWalkableAt(e,n+h)&&u.push([e,n+h]),s.isWalkableAt(e+l,n)&&u.push([e+l,n]),(s.isWalkableAt(e,n+h)||s.isWalkableAt(e+l,n))&&u.push([e+l,n+h]),!s.isWalkableAt(e-l,n)&&s.isWalkableAt(e,n+h)&&u.push([e-l,n+h]),!s.isWalkableAt(e,n-h)&&s.isWalkableAt(e+l,n)&&u.push([e+l,n-h])):l===0?s.isWalkableAt(e,n+h)&&(u.push([e,n+h]),s.isWalkableAt(e+1,n)||u.push([e+1,n+h]),s.isWalkableAt(e-1,n)||u.push([e-1,n+h])):s.isWalkableAt(e+l,n)&&(u.push([e+l,n]),s.isWalkableAt(e,n+1)||u.push([e+l,n+1]),s.isWalkableAt(e,n-1)||u.push([e+l,n-1]));else for(d=s.getNeighbors(i,qS.IfAtMostOneObstacle),_=0,p=d.length;_<p;++_)g=d[_],u.push([g.x,g.y]);return u};wg.exports=kr});var Rg=he((iC,Cg)=>{var Xu=cn(),YS=xg(),ZS=Mg(),$S=Tg(),JS=Ag();function KS(i){return i=i||{},i.diagonalMovement===Xu.Never?new YS(i):i.diagonalMovement===Xu.Always?new ZS(i):i.diagonalMovement===Xu.OnlyWhenNoObstacles?new $S(i):new JS(i)}Cg.exports=KS});var Ig=he((sC,Pg)=>{Pg.exports={Heap:za(),Node:lc(),Grid:Om(),Util:ns(),DiagonalMovement:cn(),Heuristic:Ur(),AStarFinder:uc(),BestFirstFinder:Hm(),BreadthFirstFinder:Xm(),DijkstraFinder:Zm(),BiAStarFinder:mc(),BiBestFirstFinder:eg(),BiBreadthFirstFinder:rg(),BiDijkstraFinder:lg(),IDAStarFinder:dg(),JumpPointFinder:Rg()}});var Lg=he((rC,Dg)=>{Dg.exports=Ig()});var Vn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Hn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ud=0,nh=1,Od=2;var ih=1,Fd=2,Jn=3,xi=0,Je=1,Kn=2,bi=0,fs=1,sh=2,rh=3,ah=4,Bd=5,ki=100,kd=101,zd=102,Vd=103,Hd=104,Gd=200,Wd=201,Xd=202,qd=203,bo=204,So=205,Yd=206,Zd=207,$d=208,Jd=209,Kd=210,jd=211,Qd=212,tf=213,ef=214,qo=0,Yo=1,Zo=2,ps=3,$o=4,Jo=5,Ko=6,jo=7,Qo=0,nf=1,sf=2,Si=0,rf=1,af=2,of=3,lf=4,cf=5,hf=6,uf=7;var oh=300,ys=301,vs=302,tl=303,el=304,_a=306,nr=1e3,Bi=1001,To=1002,$e=1003,df=1004;var xa=1005;var Fn=1006,nl=1007;var Xi=1008;var Gn=1009,lh=1010,ch=1011,dr=1012,il=1013,qi=1014,jn=1015,fr=1016,sl=1017,rl=1018,pr=1020,hh=35902,uh=35899,dh=1021,fh=1022,An=1023,ir=1026,mr=1027,ph=1028,al=1029,mh=1030,ol=1031;var ll=1033,ya=33776,va=33777,Ma=33778,ba=33779,cl=35840,hl=35841,ul=35842,dl=35843,fl=36196,pl=37492,ml=37496,gl=37808,_l=37809,xl=37810,yl=37811,vl=37812,Ml=37813,bl=37814,Sl=37815,Tl=37816,El=37817,wl=37818,Al=37819,Cl=37820,Rl=37821,Pl=36492,Il=36494,Dl=36495,Ll=36283,Nl=36284,Ul=36285,Ol=36286;var Jr=2300,Eo=2301,Mo=2302,Yc=2400,Zc=2401,$c=2402;var ff=3200,pf=3201;var gh=0,mf=1,Ti="",ke="srgb",ms="srgb-linear",Kr="linear",Qt="srgb";var ds=7680;var Jc=519,gf=512,_f=513,xf=514,_h=515,yf=516,vf=517,Mf=518,bf=519,Kc=35044;var xh="300 es",On=2e3,jr=2001;var Zn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cd=1234567,tr=Math.PI/180,sr=180/Math.PI;function gr(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Vt(i,t,e){return Math.max(t,Math.min(e,i))}function yh(i,t){return(i%t+t)%t}function l_(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function c_(i,t,e){return i!==t?(e-i)/(t-i):0}function $r(i,t,e){return(1-e)*i+e*t}function h_(i,t,e,n){return $r(i,t,1-Math.exp(-e*n))}function u_(i,t=1){return t-Math.abs(yh(i,t*2)-t)}function d_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function f_(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function p_(i,t){return i+Math.floor(Math.random()*(t-i+1))}function m_(i,t){return i+Math.random()*(t-i)}function g_(i){return i*(.5-Math.random())}function __(i){i!==void 0&&(cd=i);let t=cd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function x_(i){return i*tr}function y_(i){return i*sr}function v_(i){return(i&i-1)===0&&i!==0}function M_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function b_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function S_(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),g=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*_,c*g,o*l);break;case"YXY":i.set(c*g,o*h,c*_,o*l);break;case"ZYZ":i.set(c*_,c*g,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Qs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ye(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var vh={DEG2RAD:tr,RAD2DEG:sr,generateUUID:gr,clamp:Vt,euclideanModulo:yh,mapLinear:l_,inverseLerp:c_,lerp:$r,damp:h_,pingpong:u_,smoothstep:d_,smootherstep:f_,randInt:p_,randFloat:m_,randFloatSpread:g_,seededRandom:__,degToRad:x_,radToDeg:y_,isPowerOfTwo:v_,ceilPowerOfTwo:M_,floorPowerOfTwo:b_,setQuaternionFromProperEuler:S_,normalize:Ye,denormalize:Qs},It=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},wn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],g=r[a+1],_=r[a+2],p=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=g,t[e+2]=_,t[e+3]=p;return}if(u!==p||c!==d||l!==g||h!==_){let m=1-o,f=c*d+l*g+h*_+u*p,y=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){let S=Math.sqrt(M),w=Math.atan2(S,f*y);m=Math.sin(m*w)/S,o=Math.sin(o*w)/S}let x=o*y;if(c=c*m+d*x,l=l*m+g*x,h=h*m+_*x,u=u*m+p*x,m===1-o){let S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],g=r[a+2],_=r[a+3];return t[e]=o*_+h*u+c*g-l*d,t[e+1]=c*_+h*d+l*u-o*g,t[e+2]=l*_+h*g+o*d-c*u,t[e+3]=h*_-o*u-c*d-l*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),g=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*g*_,this._y=l*g*u-d*h*_,this._z=l*h*_+d*g*u,this._w=l*h*u-d*g*_;break;case"YXZ":this._x=d*h*u+l*g*_,this._y=l*g*u-d*h*_,this._z=l*h*_-d*g*u,this._w=l*h*u+d*g*_;break;case"ZXY":this._x=d*h*u-l*g*_,this._y=l*g*u+d*h*_,this._z=l*h*_+d*g*u,this._w=l*h*u-d*g*_;break;case"ZYX":this._x=d*h*u-l*g*_,this._y=l*g*u+d*h*_,this._z=l*h*_-d*g*u,this._w=l*h*u+d*g*_;break;case"YZX":this._x=d*h*u+l*g*_,this._y=l*g*u+d*h*_,this._z=l*h*_-d*g*u,this._w=l*h*u-d*g*_;break;case"XZY":this._x=d*h*u-l*g*_,this._y=l*g*u-d*h*_,this._z=l*h*_+d*g*u,this._w=l*h*u+d*g*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){let g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(n>o&&n>u){let g=2*Math.sqrt(1+n-o-u);this._w=(h-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>u){let g=2*Math.sqrt(1+o-n-u);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+h)/g}else{let g=2*Math.sqrt(1+u-n-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let g=1-e;return this._w=g*a+e*this._w,this._x=g*n+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Sc.copy(this).projectOnVector(t),this.sub(Sc)}reflect(t){return this.sub(Sc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Vt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sc=new U,hd=new wn,Ot=class i{constructor(t,e,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],g=n[5],_=n[8],p=s[0],m=s[3],f=s[6],y=s[1],M=s[4],x=s[7],S=s[2],w=s[5],A=s[8];return r[0]=a*p+o*y+c*S,r[3]=a*m+o*M+c*w,r[6]=a*f+o*x+c*A,r[1]=l*p+h*y+u*S,r[4]=l*m+h*M+u*w,r[7]=l*f+h*x+u*A,r[2]=d*p+g*y+_*S,r[5]=d*m+g*M+_*w,r[8]=d*f+g*x+_*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*r,g=l*r-a*c,_=e*u+n*d+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let p=1/_;return t[0]=u*p,t[1]=(s*l-h*n)*p,t[2]=(o*n-s*a)*p,t[3]=d*p,t[4]=(h*e-s*c)*p,t[5]=(s*r-o*e)*p,t[6]=g*p,t[7]=(n*c-l*e)*p,t[8]=(a*e-n*r)*p,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Tc.makeScale(t,e)),this}rotate(t){return this.premultiply(Tc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Tc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Tc=new Ot;function Mh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sf(){let i=Qr("canvas");return i.style.display="block",i}var ud={};function rr(i){i in ud||(ud[i]=!0,console.warn(i))}function Tf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var dd=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fd=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function T_(){let i={enabled:!0,workingColorSpace:ms,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Qt&&(s.r=_i(s.r),s.g=_i(s.g),s.b=_i(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Qt&&(s.r=er(s.r),s.g=er(s.g),s.b=er(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ti?Kr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return rr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return rr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ms]:{primaries:t,whitePoint:n,transfer:Kr,toXYZ:dd,fromXYZ:fd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ke},outputColorSpaceConfig:{drawingBufferColorSpace:ke}},[ke]:{primaries:t,whitePoint:n,transfer:Qt,toXYZ:dd,fromXYZ:fd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ke}}}),i}var Zt=T_();function _i(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function er(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Vs,wo=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Vs===void 0&&(Vs=Qr("canvas")),Vs.width=t.width,Vs.height=t.height;let s=Vs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Vs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Qr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=_i(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(_i(e[n]/255)*255):e[n]=_i(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},E_=0,ar=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=gr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ec(s[a].image)):r.push(Ec(s[a]))}else r=Ec(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ec(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var w_=0,wc=new U,en=class i extends Zn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Bi,s=Bi,r=Fn,a=Xi,o=An,c=Gn,l=i.DEFAULT_ANISOTROPY,h=Ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=gr(),this.name="",this.source=new ar(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(wc).x}get height(){return this.source.getSize(wc).y}get depth(){return this.source.getSize(wc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==oh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case nr:t.x=t.x-Math.floor(t.x);break;case Bi:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case nr:t.y=t.y-Math.floor(t.y);break;case Bi:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=oh;en.DEFAULT_ANISOTROPY=1;var me=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],g=c[5],_=c[9],p=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-p)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+p)<.1&&Math.abs(_+m)<.1&&Math.abs(l+g+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(l+1)/2,x=(g+1)/2,S=(f+1)/2,w=(h+d)/4,A=(u+p)/4,R=(_+m)/4;return M>x&&M>S?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=A/n):x>S?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=R/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=A/r,s=R/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-_)*(m-_)+(u-p)*(u-p)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(u-p)/y,this.z=(d-h)/y,this.w=Math.acos((l+g+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Vt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ao=class extends Zn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new en(s);this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ar(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},$n=class extends Ao{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},ta=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Co=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=Bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yi=class{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ln):Ln.fromBufferAttribute(r,a),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ja.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ja.copy(n.boundingBox)),Ja.applyMatrix4(t.matrixWorld),this.union(Ja)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Wr),Ka.subVectors(this.max,Wr),Hs.subVectors(t.a,Wr),Gs.subVectors(t.b,Wr),Ws.subVectors(t.c,Wr),Di.subVectors(Gs,Hs),Li.subVectors(Ws,Gs),ls.subVectors(Hs,Ws);let e=[0,-Di.z,Di.y,0,-Li.z,Li.y,0,-ls.z,ls.y,Di.z,0,-Di.x,Li.z,0,-Li.x,ls.z,0,-ls.x,-Di.y,Di.x,0,-Li.y,Li.x,0,-ls.y,ls.x,0];return!Ac(e,Hs,Gs,Ws,Ka)||(e=[1,0,0,0,1,0,0,0,1],!Ac(e,Hs,Gs,Ws,Ka))?!1:(ja.crossVectors(Di,Li),e=[ja.x,ja.y,ja.z],Ac(e,Hs,Gs,Ws,Ka))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(hi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},hi=[new U,new U,new U,new U,new U,new U,new U,new U],Ln=new U,Ja=new yi,Hs=new U,Gs=new U,Ws=new U,Di=new U,Li=new U,ls=new U,Wr=new U,Ka=new U,ja=new U,cs=new U;function Ac(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){cs.fromArray(i,r);let o=s.x*Math.abs(cs.x)+s.y*Math.abs(cs.y)+s.z*Math.abs(cs.z),c=t.dot(cs),l=e.dot(cs),h=n.dot(cs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var A_=new yi,Xr=new U,Cc=new U,gs=class{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):A_.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xr.subVectors(t,this.center);let e=Xr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Xr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Cc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xr.copy(t.center).add(Cc)),this.expandByPoint(Xr.copy(t.center).sub(Cc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},ui=new U,Rc=new U,Qa=new U,Ni=new U,Pc=new U,to=new U,Ic=new U,zi=class{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ui.copy(this.origin).addScaledVector(this.direction,e),ui.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Rc.copy(t).add(e).multiplyScalar(.5),Qa.copy(e).sub(t).normalize(),Ni.copy(this.origin).sub(Rc);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Qa),o=Ni.dot(this.direction),c=-Ni.dot(Qa),l=Ni.lengthSq(),h=Math.abs(1-a*a),u,d,g,_;if(h>0)if(u=a*c-o,d=a*o-c,_=r*h,u>=0)if(d>=-_)if(d<=_){let p=1/h;u*=p,d*=p,g=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*c)+l;else d<=-_?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),g=-u*u+d*(d+2*c)+l):d<=_?(u=0,d=Math.min(Math.max(-r,-c),r),g=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),g=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),g=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Rc).addScaledVector(Qa,d),g}intersectSphere(t,e){ui.subVectors(t.center,this.origin);let n=ui.dot(this.direction),s=ui.dot(ui)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ui)!==null}intersectTriangle(t,e,n,s,r){Pc.subVectors(e,t),to.subVectors(n,t),Ic.crossVectors(Pc,to);let a=this.direction.dot(Ic),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ni.subVectors(this.origin,t);let c=o*this.direction.dot(to.crossVectors(Ni,to));if(c<0)return null;let l=o*this.direction.dot(Pc.cross(Ni));if(l<0||c+l>a)return null;let h=-o*Ni.dot(Ic);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pe=class i{constructor(t,e,n,s,r,a,o,c,l,h,u,d,g,_,p,m){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,d,g,_,p,m)}set(t,e,n,s,r,a,o,c,l,h,u,d,g,_,p,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=g,f[7]=_,f[11]=p,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Xs.setFromMatrixColumn(t,0).length(),r=1/Xs.setFromMatrixColumn(t,1).length(),a=1/Xs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,g=a*u,_=o*h,p=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=g+_*l,e[5]=d-p*l,e[9]=-o*c,e[2]=p-d*l,e[6]=_+g*l,e[10]=a*c}else if(t.order==="YXZ"){let d=c*h,g=c*u,_=l*h,p=l*u;e[0]=d+p*o,e[4]=_*o-g,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=g*o-_,e[6]=p+d*o,e[10]=a*c}else if(t.order==="ZXY"){let d=c*h,g=c*u,_=l*h,p=l*u;e[0]=d-p*o,e[4]=-a*u,e[8]=_+g*o,e[1]=g+_*o,e[5]=a*h,e[9]=p-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let d=a*h,g=a*u,_=o*h,p=o*u;e[0]=c*h,e[4]=_*l-g,e[8]=d*l+p,e[1]=c*u,e[5]=p*l+d,e[9]=g*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let d=a*c,g=a*l,_=o*c,p=o*l;e[0]=c*h,e[4]=p-d*u,e[8]=_*u+g,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=g*u+_,e[10]=d-p*u}else if(t.order==="XZY"){let d=a*c,g=a*l,_=o*c,p=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+p,e[5]=a*h,e[9]=g*u-_,e[2]=_*u-g,e[6]=o*h,e[10]=p*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(C_,t,R_)}lookAt(t,e,n){let s=this.elements;return pn.subVectors(t,e),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Ui.crossVectors(n,pn),Ui.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Ui.crossVectors(n,pn)),Ui.normalize(),eo.crossVectors(pn,Ui),s[0]=Ui.x,s[4]=eo.x,s[8]=pn.x,s[1]=Ui.y,s[5]=eo.y,s[9]=pn.y,s[2]=Ui.z,s[6]=eo.z,s[10]=pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],g=n[13],_=n[2],p=n[6],m=n[10],f=n[14],y=n[3],M=n[7],x=n[11],S=n[15],w=s[0],A=s[4],R=s[8],v=s[12],T=s[1],I=s[5],O=s[9],B=s[13],G=s[2],W=s[6],H=s[10],$=s[14],z=s[3],rt=s[7],ct=s[11],gt=s[15];return r[0]=a*w+o*T+c*G+l*z,r[4]=a*A+o*I+c*W+l*rt,r[8]=a*R+o*O+c*H+l*ct,r[12]=a*v+o*B+c*$+l*gt,r[1]=h*w+u*T+d*G+g*z,r[5]=h*A+u*I+d*W+g*rt,r[9]=h*R+u*O+d*H+g*ct,r[13]=h*v+u*B+d*$+g*gt,r[2]=_*w+p*T+m*G+f*z,r[6]=_*A+p*I+m*W+f*rt,r[10]=_*R+p*O+m*H+f*ct,r[14]=_*v+p*B+m*$+f*gt,r[3]=y*w+M*T+x*G+S*z,r[7]=y*A+M*I+x*W+S*rt,r[11]=y*R+M*O+x*H+S*ct,r[15]=y*v+M*B+x*$+S*gt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],g=t[14],_=t[3],p=t[7],m=t[11],f=t[15];return _*(+r*c*u-s*l*u-r*o*d+n*l*d+s*o*g-n*c*g)+p*(+e*c*g-e*l*d+r*a*d-s*a*g+s*l*h-r*c*h)+m*(+e*l*u-e*o*g-r*a*u+n*a*g+r*o*h-n*l*h)+f*(-s*o*h-e*c*u+e*o*d+s*a*u-n*a*d+n*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],g=t[11],_=t[12],p=t[13],m=t[14],f=t[15],y=u*m*l-p*d*l+p*c*g-o*m*g-u*c*f+o*d*f,M=_*d*l-h*m*l-_*c*g+a*m*g+h*c*f-a*d*f,x=h*p*l-_*u*l+_*o*g-a*p*g-h*o*f+a*u*f,S=_*u*c-h*p*c-_*o*d+a*p*d+h*o*m-a*u*m,w=e*y+n*M+s*x+r*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/w;return t[0]=y*A,t[1]=(p*d*r-u*m*r-p*s*g+n*m*g+u*s*f-n*d*f)*A,t[2]=(o*m*r-p*c*r+p*s*l-n*m*l-o*s*f+n*c*f)*A,t[3]=(u*c*r-o*d*r-u*s*l+n*d*l+o*s*g-n*c*g)*A,t[4]=M*A,t[5]=(h*m*r-_*d*r+_*s*g-e*m*g-h*s*f+e*d*f)*A,t[6]=(_*c*r-a*m*r-_*s*l+e*m*l+a*s*f-e*c*f)*A,t[7]=(a*d*r-h*c*r+h*s*l-e*d*l-a*s*g+e*c*g)*A,t[8]=x*A,t[9]=(_*u*r-h*p*r-_*n*g+e*p*g+h*n*f-e*u*f)*A,t[10]=(a*p*r-_*o*r+_*n*l-e*p*l-a*n*f+e*o*f)*A,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*g-e*o*g)*A,t[12]=S*A,t[13]=(h*p*s-_*u*s+_*n*d-e*p*d-h*n*m+e*u*m)*A,t[14]=(_*o*s-a*p*s-_*n*c+e*p*c+a*n*m-e*o*m)*A,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*d+e*o*d)*A,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,d=r*l,g=r*h,_=r*u,p=a*h,m=a*u,f=o*u,y=c*l,M=c*h,x=c*u,S=n.x,w=n.y,A=n.z;return s[0]=(1-(p+f))*S,s[1]=(g+x)*S,s[2]=(_-M)*S,s[3]=0,s[4]=(g-x)*w,s[5]=(1-(d+f))*w,s[6]=(m+y)*w,s[7]=0,s[8]=(_+M)*A,s[9]=(m-y)*A,s[10]=(1-(d+p))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Xs.set(s[0],s[1],s[2]).length(),a=Xs.set(s[4],s[5],s[6]).length(),o=Xs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Nn.copy(this);let l=1/r,h=1/a,u=1/o;return Nn.elements[0]*=l,Nn.elements[1]*=l,Nn.elements[2]*=l,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=u,Nn.elements[9]*=u,Nn.elements[10]*=u,e.setFromRotationMatrix(Nn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=On,c=!1){let l=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),g=(n+s)/(n-s),_,p;if(c)_=r/(a-r),p=a*r/(a-r);else if(o===On)_=-(a+r)/(a-r),p=-2*a*r/(a-r);else if(o===jr)_=-a/(a-r),p=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=On,c=!1){let l=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),g=-(n+s)/(n-s),_,p;if(c)_=1/(a-r),p=a/(a-r);else if(o===On)_=-2/(a-r),p=-(a+r)/(a-r);else if(o===jr)_=-1/(a-r),p=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=_,l[14]=p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Xs=new U,Nn=new pe,C_=new U(0,0,0),R_=new U(1,1,1),Ui=new U,eo=new U,pn=new U,pd=new pe,md=new wn,Bn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Vt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return pd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(pd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return md.setFromEuler(this),this.setFromQuaternion(md,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Bn.DEFAULT_ORDER="XYZ";var or=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},P_=0,gd=new U,qs=new wn,di=new pe,no=new U,qr=new U,I_=new U,D_=new wn,_d=new U(1,0,0),xd=new U(0,1,0),yd=new U(0,0,1),vd={type:"added"},L_={type:"removed"},Ys={type:"childadded",child:null},Dc={type:"childremoved",child:null},ze=class i extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:P_++}),this.uuid=gr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new U,e=new Bn,n=new wn,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pe},normalMatrix:{value:new Ot}}),this.matrix=new pe,this.matrixWorld=new pe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new or,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.multiply(qs),this}rotateOnWorldAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.premultiply(qs),this}rotateX(t){return this.rotateOnAxis(_d,t)}rotateY(t){return this.rotateOnAxis(xd,t)}rotateZ(t){return this.rotateOnAxis(yd,t)}translateOnAxis(t,e){return gd.copy(t).applyQuaternion(this.quaternion),this.position.add(gd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(_d,t)}translateY(t){return this.translateOnAxis(xd,t)}translateZ(t){return this.translateOnAxis(yd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?no.copy(t):no.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(qr,no,this.up):di.lookAt(no,qr,this.up),this.quaternion.setFromRotationMatrix(di),s&&(di.extractRotation(s.matrixWorld),qs.setFromRotationMatrix(di),this.quaternion.premultiply(qs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vd),Ys.child=t,this.dispatchEvent(Ys),Ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(L_),Dc.child=t,this.dispatchEvent(Dc),Dc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),di.multiply(t.parent.matrixWorld)),t.applyMatrix4(di),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vd),Ys.child=t,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,t,I_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,D_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),g=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),g.length>0&&(n.animations=g),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};ze.DEFAULT_UP=new U(0,1,0);ze.DEFAULT_MATRIX_AUTO_UPDATE=!0;ze.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Un=new U,fi=new U,Lc=new U,pi=new U,Zs=new U,$s=new U,Md=new U,Nc=new U,Uc=new U,Oc=new U,Fc=new me,Bc=new me,kc=new me,mi=class i{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Un.subVectors(t,e),s.cross(Un);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Un.subVectors(s,e),fi.subVectors(n,e),Lc.subVectors(t,e);let a=Un.dot(Un),o=Un.dot(fi),c=Un.dot(Lc),l=fi.dot(fi),h=fi.dot(Lc),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,g=(l*c-o*h)*d,_=(a*h-o*c)*d;return r.set(1-g-_,_,g)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,pi)===null?!1:pi.x>=0&&pi.y>=0&&pi.x+pi.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,pi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,pi.x),c.addScaledVector(a,pi.y),c.addScaledVector(o,pi.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Fc.setScalar(0),Bc.setScalar(0),kc.setScalar(0),Fc.fromBufferAttribute(t,e),Bc.fromBufferAttribute(t,n),kc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Fc,r.x),a.addScaledVector(Bc,r.y),a.addScaledVector(kc,r.z),a}static isFrontFacing(t,e,n,s){return Un.subVectors(n,e),fi.subVectors(t,e),Un.cross(fi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Un.subVectors(this.c,this.b),fi.subVectors(this.a,this.b),Un.cross(fi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Zs.subVectors(s,n),$s.subVectors(r,n),Nc.subVectors(t,n);let c=Zs.dot(Nc),l=$s.dot(Nc);if(c<=0&&l<=0)return e.copy(n);Uc.subVectors(t,s);let h=Zs.dot(Uc),u=$s.dot(Uc);if(h>=0&&u<=h)return e.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Zs,a);Oc.subVectors(t,r);let g=Zs.dot(Oc),_=$s.dot(Oc);if(_>=0&&g<=_)return e.copy(r);let p=g*l-c*_;if(p<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector($s,o);let m=h*_-g*u;if(m<=0&&u-h>=0&&g-_>=0)return Md.subVectors(r,s),o=(u-h)/(u-h+(g-_)),e.copy(s).addScaledVector(Md,o);let f=1/(m+p+d);return a=p*f,o=d*f,e.copy(n).addScaledVector(Zs,a).addScaledVector($s,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ef={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Oi={h:0,s:0,l:0},io={h:0,s:0,l:0};function zc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Gt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Zt.workingColorSpace){if(t=yh(t,1),e=Vt(e,0,1),n=Vt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=zc(a,r,t+1/3),this.g=zc(a,r,t),this.b=zc(a,r,t-1/3)}return Zt.colorSpaceToWorking(this,s),this}setStyle(t,e=ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){let n=Ef[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=_i(t.r),this.g=_i(t.g),this.b=_i(t.b),this}copyLinearToSRGB(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return Zt.workingToColorSpace(Be.copy(this),t),Math.round(Vt(Be.r*255,0,255))*65536+Math.round(Vt(Be.g*255,0,255))*256+Math.round(Vt(Be.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.workingToColorSpace(Be.copy(this),e);let n=Be.r,s=Be.g,r=Be.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Zt.workingColorSpace){return Zt.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=ke){Zt.workingToColorSpace(Be.copy(this),t);let e=Be.r,n=Be.g,s=Be.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Oi),this.setHSL(Oi.h+t,Oi.s+e,Oi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Oi),t.getHSL(io);let n=$r(Oi.h,io.h,e),s=$r(Oi.s,io.s,e),r=$r(Oi.l,io.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Be=new Gt;Gt.NAMES=Ef;var N_=0,vi=class extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:N_++}),this.uuid=gr(),this.name="",this.type="Material",this.blending=fs,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=So,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ds,this.stencilZFail=ds,this.stencilZPass=ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==xi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ds&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ds&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ds&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},kn=class extends vi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Te=new U,so=new It,U_=0,Ze=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:U_++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Kc,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)so.fromBufferAttribute(this,e),so.applyMatrix3(t),this.setXY(e,so.x,so.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Qs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ye(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Qs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Qs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Qs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Qs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array),s=Ye(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array),s=Ye(s,this.array),r=Ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Kc&&(t.usage=this.usage),t}};var ea=class extends Ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var na=class extends Ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var gn=class extends Ze{constructor(t,e,n){super(new Float32Array(t),e,n)}},O_=0,Tn=new pe,Vc=new ze,Js=new U,mn=new yi,Yr=new yi,De=new U,_n=class i extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=gr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Mh(t)?na:ea)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,n){return Tn.makeTranslation(t,e,n),this.applyMatrix4(Tn),this}scale(t,e,n){return Tn.makeScale(t,e,n),this.applyMatrix4(Tn),this}lookAt(t){return Vc.lookAt(t),Vc.updateMatrix(),this.applyMatrix4(Vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Js).negate(),this.translate(Js.x,Js.y,Js.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new gn(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){let n=this.boundingSphere.center;if(mn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Yr.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(mn.min,Yr.min),mn.expandByPoint(De),De.addVectors(mn.max,Yr.max),mn.expandByPoint(De)):(mn.expandByPoint(Yr.min),mn.expandByPoint(Yr.max))}mn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)De.fromBufferAttribute(o,l),c&&(Js.fromBufferAttribute(t,l),De.add(Js)),s=Math.max(s,n.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ze(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<n.count;R++)o[R]=new U,c[R]=new U;let l=new U,h=new U,u=new U,d=new It,g=new It,_=new It,p=new U,m=new U;function f(R,v,T){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,v),u.fromBufferAttribute(n,T),d.fromBufferAttribute(r,R),g.fromBufferAttribute(r,v),_.fromBufferAttribute(r,T),h.sub(l),u.sub(l),g.sub(d),_.sub(d);let I=1/(g.x*_.y-_.x*g.y);isFinite(I)&&(p.copy(h).multiplyScalar(_.y).addScaledVector(u,-g.y).multiplyScalar(I),m.copy(u).multiplyScalar(g.x).addScaledVector(h,-_.x).multiplyScalar(I),o[R].add(p),o[v].add(p),o[T].add(p),c[R].add(m),c[v].add(m),c[T].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,v=y.length;R<v;++R){let T=y[R],I=T.start,O=T.count;for(let B=I,G=I+O;B<G;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let M=new U,x=new U,S=new U,w=new U;function A(R){S.fromBufferAttribute(s,R),w.copy(S);let v=o[R];M.copy(v),M.sub(S.multiplyScalar(S.dot(v))).normalize(),x.crossVectors(w,v);let I=x.dot(c[R])<0?-1:1;a.setXYZW(R,M.x,M.y,M.z,I)}for(let R=0,v=y.length;R<v;++R){let T=y[R],I=T.start,O=T.count;for(let B=I,G=I+O;B<G;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,g=n.count;d<g;d++)n.setXYZ(d,0,0,0);let s=new U,r=new U,a=new U,o=new U,c=new U,l=new U,h=new U,u=new U;if(t)for(let d=0,g=t.count;d<g;d+=3){let _=t.getX(d+0),p=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,p),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(p,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,g=e.count;d<g;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),g=0,_=0;for(let p=0,m=c.length;p<m;p++){o.isInterleavedBufferAttribute?g=c[p]*o.data.stride+o.offset:g=c[p]*h;for(let f=0;f<h;f++)d[_++]=l[g++]}return new Ze(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let d=l[h],g=t(d,n);c.push(g)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let g=l[u];h.push(g.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,g=u.length;d<g;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},bd=new pe,hs=new zi,ro=new gs,Sd=new U,ao=new U,oo=new U,lo=new U,Hc=new U,co=new U,Td=new U,ho=new U,be=class extends ze{constructor(t=new _n,e=new kn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){co.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(Hc.fromBufferAttribute(u,t),a?co.addScaledVector(Hc,h):co.addScaledVector(Hc.sub(e),h))}e.add(co)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(r),hs.copy(t.ray).recast(t.near),!(ro.containsPoint(hs.origin)===!1&&(hs.intersectSphere(ro,Sd)===null||hs.origin.distanceToSquared(Sd)>(t.far-t.near)**2))&&(bd.copy(r).invert(),hs.copy(t.ray).applyMatrix4(bd),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hs)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,p=d.length;_<p;_++){let m=d[_],f=a[m.materialIndex],y=Math.max(m.start,g.start),M=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let x=y,S=M;x<S;x+=3){let w=o.getX(x),A=o.getX(x+1),R=o.getX(x+2);s=uo(this,f,t,n,l,h,u,w,A,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,g.start),p=Math.min(o.count,g.start+g.count);for(let m=_,f=p;m<f;m+=3){let y=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);s=uo(this,a,t,n,l,h,u,y,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,p=d.length;_<p;_++){let m=d[_],f=a[m.materialIndex],y=Math.max(m.start,g.start),M=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let x=y,S=M;x<S;x+=3){let w=x,A=x+1,R=x+2;s=uo(this,f,t,n,l,h,u,w,A,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let _=Math.max(0,g.start),p=Math.min(c.count,g.start+g.count);for(let m=_,f=p;m<f;m+=3){let y=m,M=m+1,x=m+2;s=uo(this,a,t,n,l,h,u,y,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function F_(i,t,e,n,s,r,a,o){let c;if(t.side===Je?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===xi,o),c===null)return null;ho.copy(o),ho.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ho);return l<e.near||l>e.far?null:{distance:l,point:ho.clone(),object:i}}function uo(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,ao),i.getVertexPosition(c,oo),i.getVertexPosition(l,lo);let h=F_(i,t,e,n,ao,oo,lo,Td);if(h){let u=new U;mi.getBarycoord(Td,ao,oo,lo,u),s&&(h.uv=mi.getInterpolatedAttribute(s,o,c,l,u,new It)),r&&(h.uv1=mi.getInterpolatedAttribute(r,o,c,l,u,new It)),a&&(h.normal=mi.getInterpolatedAttribute(a,o,c,l,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new U,materialIndex:0};mi.getNormal(ao,oo,lo,d.normal),h.face=d,h.barycoord=u}return h}var Ve=class i extends _n{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,g=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new gn(l,3)),this.setAttribute("normal",new gn(h,3)),this.setAttribute("uv",new gn(u,2));function _(p,m,f,y,M,x,S,w,A,R,v){let T=x/A,I=S/R,O=x/2,B=S/2,G=w/2,W=A+1,H=R+1,$=0,z=0,rt=new U;for(let ct=0;ct<H;ct++){let gt=ct*I-B;for(let Dt=0;Dt<W;Dt++){let jt=Dt*T-O;rt[p]=jt*y,rt[m]=gt*M,rt[f]=G,l.push(rt.x,rt.y,rt.z),rt[p]=0,rt[m]=0,rt[f]=w>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Dt/A),u.push(1-ct/R),$+=1}}for(let ct=0;ct<R;ct++)for(let gt=0;gt<A;gt++){let Dt=d+gt+W*ct,jt=d+gt+W*(ct+1),qt=d+(gt+1)+W*(ct+1),zt=d+(gt+1)+W*ct;c.push(Dt,jt,zt),c.push(jt,qt,zt),z+=6}o.addGroup(g,z,v),g+=z,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ms(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function He(i){let t={};for(let e=0;e<i.length;e++){let n=Ms(i[e]);for(let s in n)t[s]=n[s]}return t}function B_(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function bh(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}var wf={clone:Ms,merge:He},k_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,z_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,zn=class extends vi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=k_,this.fragmentShader=z_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=B_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ia=class extends ze{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pe,this.projectionMatrix=new pe,this.projectionMatrixInverse=new pe,this.coordinateSystem=On,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Fi=new U,Ed=new It,wd=new It,tn=class extends ia{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=sr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fi.x,Fi.y).multiplyScalar(-t/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fi.x,Fi.y).multiplyScalar(-t/Fi.z)}getViewSize(t,e){return this.getViewBounds(t,Ed,wd),e.subVectors(wd,Ed)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(tr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ks=-90,js=1,Ro=class extends ze{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new tn(Ks,js,t,e);s.layers=this.layers,this.add(s);let r=new tn(Ks,js,t,e);r.layers=this.layers,this.add(r);let a=new tn(Ks,js,t,e);a.layers=this.layers,this.add(a);let o=new tn(Ks,js,t,e);o.layers=this.layers,this.add(o);let c=new tn(Ks,js,t,e);c.layers=this.layers,this.add(c);let l=new tn(Ks,js,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=p,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,g),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},sa=class extends en{constructor(t=[],e=ys,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Po=class extends $n{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new sa(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ve(5,5,5),r=new zn({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:bi});r.uniforms.tEquirect.value=e;let a=new be(s,r),o=e.minFilter;return e.minFilter===Xi&&(e.minFilter=Fn),new Ro(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},gi=class extends ze{constructor(){super(),this.isGroup=!0,this.type="Group"}},V_={type:"move"},lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let p of t.hand.values()){let m=e.getJointPose(p,n),f=this._getHandJoint(l,p);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),g=.02,_=.005;l.inputState.pinching&&d>g+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=g-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(V_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new gi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var ra=class extends ze{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bn,this.environmentIntensity=1,this.environmentRotation=new Bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Gc=new U,H_=new U,G_=new Ot,En=class{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Gc.subVectors(n,e).cross(H_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Gc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||G_.getNormalMatrix(t),s=this.coplanarPoint(Gc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},us=new gs,W_=new It(.5,.5),fo=new U,cr=class{constructor(t=new En,e=new En,n=new En,s=new En,r=new En,a=new En){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],g=r[7],_=r[8],p=r[9],m=r[10],f=r[11],y=r[12],M=r[13],x=r[14],S=r[15];if(s[0].setComponents(l-a,g-h,f-_,S-y).normalize(),s[1].setComponents(l+a,g+h,f+_,S+y).normalize(),s[2].setComponents(l+o,g+u,f+p,S+M).normalize(),s[3].setComponents(l-o,g-u,f-p,S-M).normalize(),n)s[4].setComponents(c,d,m,x).normalize(),s[5].setComponents(l-c,g-d,f-m,S-x).normalize();else if(s[4].setComponents(l-c,g-d,f-m,S-x).normalize(),e===On)s[5].setComponents(l+c,g+d,f+m,S+x).normalize();else if(e===jr)s[5].setComponents(c,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),us.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),us.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(us)}intersectsSprite(t){us.center.set(0,0,0);let e=W_.distanceTo(t.center);return us.radius=.7071067811865476+e,us.applyMatrix4(t.matrixWorld),this.intersectsSphere(us)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(fo.x=s.normal.x>0?t.max.x:t.min.x,fo.y=s.normal.y>0?t.max.y:t.min.y,fo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Mi=class extends vi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Io=new U,Do=new U,Ad=new pe,Zr=new zi,po=new gs,Wc=new U,Cd=new U,Lo=class extends ze{constructor(t=new _n,e=new Mi){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Io.fromBufferAttribute(e,s-1),Do.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Io.distanceTo(Do);t.setAttribute("lineDistance",new gn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(s),po.radius+=r,t.ray.intersectsSphere(po)===!1)return;Ad.copy(s).invert(),Zr.copy(t.ray).applyMatrix4(Ad);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let g=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let p=g,m=_-1;p<m;p+=l){let f=h.getX(p),y=h.getX(p+1),M=mo(this,t,Zr,c,f,y,p);M&&e.push(M)}if(this.isLineLoop){let p=h.getX(_-1),m=h.getX(g),f=mo(this,t,Zr,c,p,m,_-1);f&&e.push(f)}}else{let g=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let p=g,m=_-1;p<m;p+=l){let f=mo(this,t,Zr,c,p,p+1,p);f&&e.push(f)}if(this.isLineLoop){let p=mo(this,t,Zr,c,_-1,g,_-1);p&&e.push(p)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function mo(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(Io.fromBufferAttribute(o,s),Do.fromBufferAttribute(o,r),e.distanceSqToSegment(Io,Do,Wc,Cd)>n)return;Wc.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Wc);if(!(l<t.near||l>t.far))return{distance:l,point:Cd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Rd=new U,Pd=new U,Vi=class extends Lo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Rd.fromBufferAttribute(e,s),Pd.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Rd.distanceTo(Pd);t.setAttribute("lineDistance",new gn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var aa=class extends en{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},oa=class extends en{constructor(t,e,n=qi,s,r,a,o=$e,c=$e,l,h=ir,u=1){if(h!==ir&&h!==mr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ar(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},la=class extends en{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};var go=new U,_o=new U,Xc=new U,xo=new mi,hr=class extends _n{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(tr*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},g=[];for(let _=0;_<c;_+=3){a?(l[0]=a.getX(_),l[1]=a.getX(_+1),l[2]=a.getX(_+2)):(l[0]=_,l[1]=_+1,l[2]=_+2);let{a:p,b:m,c:f}=xo;if(p.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),f.fromBufferAttribute(o,l[2]),xo.getNormal(Xc),u[0]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){let M=(y+1)%3,x=u[y],S=u[M],w=xo[h[y]],A=xo[h[M]],R=`${x}_${S}`,v=`${S}_${x}`;v in d&&d[v]?(Xc.dot(d[v].normal)<=r&&(g.push(w.x,w.y,w.z),g.push(A.x,A.y,A.z)),d[v]=null):R in d||(d[R]={index0:l[y],index1:l[M],normal:Xc.clone()})}}for(let _ in d)if(d[_]){let{index0:p,index1:m}=d[_];go.fromBufferAttribute(o,p),_o.fromBufferAttribute(o,m),g.push(go.x,go.y,go.z),g.push(_o.x,_o.y,_o.z)}this.setAttribute("position",new gn(g,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};var ca=class i extends _n{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,d=e/c,g=[],_=[],p=[],m=[];for(let f=0;f<h;f++){let y=f*d-a;for(let M=0;M<l;M++){let x=M*u-r;_.push(x,-y,0),p.push(0,0,1),m.push(M/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<o;y++){let M=y+l*f,x=y+l*(f+1),S=y+1+l*(f+1),w=y+1+l*f;g.push(M,x,w),g.push(x,S,w)}this.setIndex(g),this.setAttribute("position",new gn(_,3)),this.setAttribute("normal",new gn(p,3)),this.setAttribute("uv",new gn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var Hi=class extends vi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gh,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bn,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},No=class extends vi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Uo=class extends vi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function yo(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function X_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var _s=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Oo=class extends _s{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Yc,endingEnd:Yc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zc:r=t,o=2*e-n;break;case $c:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Zc:a=t,c=2*n-e;break;case $c:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,g=this._weightNext,_=(n-e)/(s-e),p=_*_,m=p*_,f=-d*m+2*d*p-d*_,y=(1+d)*m+(-1.5-2*d)*p+(-.5+d)*_+1,M=(-1-g)*m+(1.5+g)*p+.5*_,x=g*m-g*p;for(let S=0;S!==o;++S)r[S]=f*a[h+S]+y*a[l+S]+M*a[c+S]+x*a[u+S];return r}},Fo=class extends _s{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}},Bo=class extends _s{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},xn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yo(e,this.TimeBufferType),this.values=yo(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yo(t.times,Array),values:yo(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Bo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Fo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Oo(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Jr:e=this.InterpolantFactoryMethodDiscrete;break;case Eo:e=this.InterpolantFactoryMethodLinear;break;case Mo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return Eo;case this.InterpolantFactoryMethodSmooth:return Mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&X_(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Mo,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(s)c=!0;else{let u=o*n,d=u-n,g=u+n;for(let _=0;_!==n;++_){let p=e[u+_];if(p!==e[d+_]||p!==e[g+_]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let u=o*n,d=a*n;for(let g=0;g!==n;++g)e[d+g]=e[u+g]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};xn.prototype.ValueTypeName="";xn.prototype.TimeBufferType=Float32Array;xn.prototype.ValueBufferType=Float32Array;xn.prototype.DefaultInterpolation=Eo;var Gi=class extends xn{constructor(t,e,n){super(t,e,n)}};Gi.prototype.ValueTypeName="bool";Gi.prototype.ValueBufferType=Array;Gi.prototype.DefaultInterpolation=Jr;Gi.prototype.InterpolantFactoryMethodLinear=void 0;Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};ko.prototype.ValueTypeName="color";var zo=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};zo.prototype.ValueTypeName="number";var Vo=class extends _s{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let h=l+o;l!==h;l+=4)wn.slerpFlat(r,0,a,l-o,a,l,c);return r}},ha=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Vo(this.times,this.values,this.getValueSize(),t)}};ha.prototype.ValueTypeName="quaternion";ha.prototype.InterpolantFactoryMethodSmooth=void 0;var Wi=class extends xn{constructor(t,e,n){super(t,e,n)}};Wi.prototype.ValueTypeName="string";Wi.prototype.ValueBufferType=Array;Wi.prototype.DefaultInterpolation=Jr;Wi.prototype.InterpolantFactoryMethodLinear=void 0;Wi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends xn{constructor(t,e,n,s){super(t,e,n,s)}};Ho.prototype.ValueTypeName="vector";var Go=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let g=l[u],_=l[u+1];if(g.global&&(g.lastIndex=0),g.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Af=new Go,Wo=class{constructor(t){this.manager=t!==void 0?t:Af,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Wo.DEFAULT_MATERIAL_NAME="__DEFAULT";var ua=class extends ze{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var qc=new pe,Id=new U,Dd=new U,jc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cr,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Id.setFromMatrixPosition(t.matrixWorld),e.position.copy(Id),Dd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Dd),e.updateMatrixWorld(),qc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var xs=class extends ia{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Qc=class extends jc{constructor(){super(new xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},da=class extends ua{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ze.DEFAULT_UP),this.updateMatrix(),this.target=new ze,this.shadow=new Qc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},fa=class extends ua{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Xo=class extends tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Sh="\\[\\]\\.:\\/",q_=new RegExp("["+Sh+"]","g"),Th="[^"+Sh+"]",Y_="[^"+Sh.replace("\\.","")+"]",Z_=/((?:WC+[\/:])*)/.source.replace("WC",Th),$_=/(WCOD+)?/.source.replace("WCOD",Y_),J_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Th),K_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Th),j_=new RegExp("^"+Z_+$_+J_+K_+"$"),Q_=["material","materials","bones","map"],th=class{constructor(t,e,n){let s=n||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},oe=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(q_,"")}static parseTrackName(t){let e=j_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Q_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=th;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pT=new Float32Array(1);var Ld=new pe,pa=class{constructor(t,e,n=0,s=1/0){this.ray=new zi(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new or,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ld.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ld),this}intersectObject(t,e=!0,n=[]){return eh(t,this,n,e),n.sort(Nd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)eh(t[s],this,n,e);return n.sort(Nd),n}};function Nd(i,t){return i.distance-t.distance}function eh(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)eh(r[a],t,e,!0)}}var ur=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Vt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Vt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var vo=new yi,ma=class extends Vi{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new _n;r.setIndex(new Ze(n,1)),r.setAttribute("position",new Ze(s,3)),super(r,new Mi({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&vo.setFromObject(this.object),vo.isEmpty())return;let t=vo.min,e=vo.max,n=this.geometry.attributes.position,s=n.array;s[0]=e.x,s[1]=e.y,s[2]=e.z,s[3]=t.x,s[4]=e.y,s[5]=e.z,s[6]=t.x,s[7]=t.y,s[8]=e.z,s[9]=e.x,s[10]=t.y,s[11]=e.z,s[12]=e.x,s[13]=e.y,s[14]=t.z,s[15]=t.x,s[16]=e.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=e.x,s[22]=t.y,s[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}};var ga=class extends Zn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function Eh(i,t,e,n){let s=t0(n);switch(e){case dh:return i*t;case ph:return i*t/s.components*s.byteLength;case al:return i*t/s.components*s.byteLength;case mh:return i*t*2/s.components*s.byteLength;case ol:return i*t*2/s.components*s.byteLength;case fh:return i*t*3/s.components*s.byteLength;case An:return i*t*4/s.components*s.byteLength;case ll:return i*t*4/s.components*s.byteLength;case ya:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ma:case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case hl:case dl:return Math.max(i,16)*Math.max(t,8)/4;case cl:case ul:return Math.max(i,8)*Math.max(t,8)/2;case fl:case pl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ml:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case gl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case vl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case bl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case El:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Cl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Pl:case Il:case Dl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ll:case Nl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ul:case Ol:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function t0(i){switch(i){case Gn:case lh:return{byteLength:1,components:1};case dr:case ch:case fr:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case qi:case il:case jn:return{byteLength:4,components:1};case hh:case uh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Kf(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function n0(i){let t=new WeakMap;function e(o,c){let l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let g;if(l instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=i.SHORT;else if(l instanceof Uint32Array)g=i.UNSIGNED_INT;else if(l instanceof Int32Array)g=i.INT;else if(l instanceof Int8Array)g=i.BYTE;else if(l instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((g,_)=>g.start-_.start);let d=0;for(let g=1;g<u.length;g++){let _=u[d],p=u[g];p.start<=_.start+_.count+1?_.count=Math.max(_.count,p.start+p.count-_.start):(++d,u[d]=p)}u.length=d+1;for(let g=0,_=u.length;g<_;g++){let p=u[g];i.bufferSubData(l,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var i0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,s0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,r0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,c0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,h0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,u0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,d0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,p0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,m0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,g0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,T0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,E0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,w0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,A0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,C0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,R0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,D0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,L0="gl_FragColor = linearToOutputTexel( gl_FragColor );",N0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,U0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,O0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,F0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,B0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,V0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,W0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,X0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,q0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Y0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Z0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,J0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,K0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,j0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ex=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ix=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ax=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ox=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ux=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,px=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_x=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,yx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Mx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ex=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ax=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ix=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Dx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ux=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ox=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Vx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$x=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ty=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ey=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ny=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,iy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ry=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ly=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,py=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,my=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_y=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,My=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ty=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wy=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ay=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ry=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Py=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Iy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ly=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ny=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:i0,alphahash_pars_fragment:s0,alphamap_fragment:r0,alphamap_pars_fragment:a0,alphatest_fragment:o0,alphatest_pars_fragment:l0,aomap_fragment:c0,aomap_pars_fragment:h0,batching_pars_vertex:u0,batching_vertex:d0,begin_vertex:f0,beginnormal_vertex:p0,bsdfs:m0,iridescence_fragment:g0,bumpmap_pars_fragment:_0,clipping_planes_fragment:x0,clipping_planes_pars_fragment:y0,clipping_planes_pars_vertex:v0,clipping_planes_vertex:M0,color_fragment:b0,color_pars_fragment:S0,color_pars_vertex:T0,color_vertex:E0,common:w0,cube_uv_reflection_fragment:A0,defaultnormal_vertex:C0,displacementmap_pars_vertex:R0,displacementmap_vertex:P0,emissivemap_fragment:I0,emissivemap_pars_fragment:D0,colorspace_fragment:L0,colorspace_pars_fragment:N0,envmap_fragment:U0,envmap_common_pars_fragment:O0,envmap_pars_fragment:F0,envmap_pars_vertex:B0,envmap_physical_pars_fragment:$0,envmap_vertex:k0,fog_vertex:z0,fog_pars_vertex:V0,fog_fragment:H0,fog_pars_fragment:G0,gradientmap_pars_fragment:W0,lightmap_pars_fragment:X0,lights_lambert_fragment:q0,lights_lambert_pars_fragment:Y0,lights_pars_begin:Z0,lights_toon_fragment:J0,lights_toon_pars_fragment:K0,lights_phong_fragment:j0,lights_phong_pars_fragment:Q0,lights_physical_fragment:tx,lights_physical_pars_fragment:ex,lights_fragment_begin:nx,lights_fragment_maps:ix,lights_fragment_end:sx,logdepthbuf_fragment:rx,logdepthbuf_pars_fragment:ax,logdepthbuf_pars_vertex:ox,logdepthbuf_vertex:lx,map_fragment:cx,map_pars_fragment:hx,map_particle_fragment:ux,map_particle_pars_fragment:dx,metalnessmap_fragment:fx,metalnessmap_pars_fragment:px,morphinstance_vertex:mx,morphcolor_vertex:gx,morphnormal_vertex:_x,morphtarget_pars_vertex:xx,morphtarget_vertex:yx,normal_fragment_begin:vx,normal_fragment_maps:Mx,normal_pars_fragment:bx,normal_pars_vertex:Sx,normal_vertex:Tx,normalmap_pars_fragment:Ex,clearcoat_normal_fragment_begin:wx,clearcoat_normal_fragment_maps:Ax,clearcoat_pars_fragment:Cx,iridescence_pars_fragment:Rx,opaque_fragment:Px,packing:Ix,premultiplied_alpha_fragment:Dx,project_vertex:Lx,dithering_fragment:Nx,dithering_pars_fragment:Ux,roughnessmap_fragment:Ox,roughnessmap_pars_fragment:Fx,shadowmap_pars_fragment:Bx,shadowmap_pars_vertex:kx,shadowmap_vertex:zx,shadowmask_pars_fragment:Vx,skinbase_vertex:Hx,skinning_pars_vertex:Gx,skinning_vertex:Wx,skinnormal_vertex:Xx,specularmap_fragment:qx,specularmap_pars_fragment:Yx,tonemapping_fragment:Zx,tonemapping_pars_fragment:$x,transmission_fragment:Jx,transmission_pars_fragment:Kx,uv_pars_fragment:jx,uv_pars_vertex:Qx,uv_vertex:ty,worldpos_vertex:ey,background_vert:ny,background_frag:iy,backgroundCube_vert:sy,backgroundCube_frag:ry,cube_vert:ay,cube_frag:oy,depth_vert:ly,depth_frag:cy,distanceRGBA_vert:hy,distanceRGBA_frag:uy,equirect_vert:dy,equirect_frag:fy,linedashed_vert:py,linedashed_frag:my,meshbasic_vert:gy,meshbasic_frag:_y,meshlambert_vert:xy,meshlambert_frag:yy,meshmatcap_vert:vy,meshmatcap_frag:My,meshnormal_vert:by,meshnormal_frag:Sy,meshphong_vert:Ty,meshphong_frag:Ey,meshphysical_vert:wy,meshphysical_frag:Ay,meshtoon_vert:Cy,meshtoon_frag:Ry,points_vert:Py,points_frag:Iy,shadow_vert:Dy,shadow_frag:Ly,sprite_vert:Ny,sprite_frag:Uy},ot={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Qn={basic:{uniforms:He([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:He([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Gt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:He([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:He([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:He([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new Gt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:He([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:He([ot.points,ot.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:He([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:He([ot.common,ot.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:He([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:He([ot.sprite,ot.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:He([ot.common,ot.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:He([ot.lights,ot.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Qn.physical={uniforms:He([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};var Fl={r:0,b:0,g:0},bs=new Bn,Oy=new pe;function Fy(i,t,e,n,s,r,a){let o=new Gt(0),c=r===!0?0:1,l,h,u=null,d=0,g=null;function _(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function p(M){let x=!1,S=_(M);S===null?f(o,c):S&&S.isColor&&(f(S,1),x=!0);let w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,x){let S=_(x);S&&(S.isCubeTexture||S.mapping===_a)?(h===void 0&&(h=new be(new Ve(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:Ms(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bs.copy(x.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Oy.makeRotationFromEuler(bs)),h.material.toneMapped=Zt.getTransfer(S.colorSpace)!==Qt,(u!==S||d!==S.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,g=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new be(new ca(2,2),new zn({name:"BackgroundMaterial",uniforms:Ms(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Zt.getTransfer(S.colorSpace)!==Qt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||g!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,g=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,x){M.getRGB(Fl,bh(i)),n.buffers.color.setClear(Fl.r,Fl.g,Fl.b,x,a)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),c=x,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,f(o,c)},render:p,addToRenderList:m,dispose:y}}function By(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(T,I,O,B,G){let W=!1,H=u(B,O,I);r!==H&&(r=H,l(r.object)),W=g(T,B,O,G),W&&_(T,B,O,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,x(T,I,O,B),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function h(T){return i.deleteVertexArray(T)}function u(T,I,O){let B=O.wireframe===!0,G=n[T.id];G===void 0&&(G={},n[T.id]=G);let W=G[I.id];W===void 0&&(W={},G[I.id]=W);let H=W[B];return H===void 0&&(H=d(c()),W[B]=H),H}function d(T){let I=[],O=[],B=[];for(let G=0;G<e;G++)I[G]=0,O[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:O,attributeDivisors:B,object:T,attributes:{},index:null}}function g(T,I,O,B){let G=r.attributes,W=I.attributes,H=0,$=O.getAttributes();for(let z in $)if($[z].location>=0){let ct=G[z],gt=W[z];if(gt===void 0&&(z==="instanceMatrix"&&T.instanceMatrix&&(gt=T.instanceMatrix),z==="instanceColor"&&T.instanceColor&&(gt=T.instanceColor)),ct===void 0||ct.attribute!==gt||gt&&ct.data!==gt.data)return!0;H++}return r.attributesNum!==H||r.index!==B}function _(T,I,O,B){let G={},W=I.attributes,H=0,$=O.getAttributes();for(let z in $)if($[z].location>=0){let ct=W[z];ct===void 0&&(z==="instanceMatrix"&&T.instanceMatrix&&(ct=T.instanceMatrix),z==="instanceColor"&&T.instanceColor&&(ct=T.instanceColor));let gt={};gt.attribute=ct,ct&&ct.data&&(gt.data=ct.data),G[z]=gt,H++}r.attributes=G,r.attributesNum=H,r.index=B}function p(){let T=r.newAttributes;for(let I=0,O=T.length;I<O;I++)T[I]=0}function m(T){f(T,0)}function f(T,I){let O=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;O[T]=1,B[T]===0&&(i.enableVertexAttribArray(T),B[T]=1),G[T]!==I&&(i.vertexAttribDivisor(T,I),G[T]=I)}function y(){let T=r.newAttributes,I=r.enabledAttributes;for(let O=0,B=I.length;O<B;O++)I[O]!==T[O]&&(i.disableVertexAttribArray(O),I[O]=0)}function M(T,I,O,B,G,W,H){H===!0?i.vertexAttribIPointer(T,I,O,G,W):i.vertexAttribPointer(T,I,O,B,G,W)}function x(T,I,O,B){p();let G=B.attributes,W=O.getAttributes(),H=I.defaultAttributeValues;for(let $ in W){let z=W[$];if(z.location>=0){let rt=G[$];if(rt===void 0&&($==="instanceMatrix"&&T.instanceMatrix&&(rt=T.instanceMatrix),$==="instanceColor"&&T.instanceColor&&(rt=T.instanceColor)),rt!==void 0){let ct=rt.normalized,gt=rt.itemSize,Dt=t.get(rt);if(Dt===void 0)continue;let jt=Dt.buffer,qt=Dt.type,zt=Dt.bytesPerElement,Y=qt===i.INT||qt===i.UNSIGNED_INT||rt.gpuType===il;if(rt.isInterleavedBufferAttribute){let K=rt.data,pt=K.stride,Lt=rt.offset;if(K.isInstancedInterleavedBuffer){for(let Tt=0;Tt<z.locationSize;Tt++)f(z.location+Tt,K.meshPerAttribute);T.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Tt=0;Tt<z.locationSize;Tt++)m(z.location+Tt);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let Tt=0;Tt<z.locationSize;Tt++)M(z.location+Tt,gt/z.locationSize,qt,ct,pt*zt,(Lt+gt/z.locationSize*Tt)*zt,Y)}else{if(rt.isInstancedBufferAttribute){for(let K=0;K<z.locationSize;K++)f(z.location+K,rt.meshPerAttribute);T.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let K=0;K<z.locationSize;K++)m(z.location+K);i.bindBuffer(i.ARRAY_BUFFER,jt);for(let K=0;K<z.locationSize;K++)M(z.location+K,gt/z.locationSize,qt,ct,gt*zt,gt/z.locationSize*K*zt,Y)}}else if(H!==void 0){let ct=H[$];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(z.location,ct);break;case 3:i.vertexAttrib3fv(z.location,ct);break;case 4:i.vertexAttrib4fv(z.location,ct);break;default:i.vertexAttrib1fv(z.location,ct)}}}}y()}function S(){R();for(let T in n){let I=n[T];for(let O in I){let B=I[O];for(let G in B)h(B[G].object),delete B[G];delete I[O]}delete n[T]}}function w(T){if(n[T.id]===void 0)return;let I=n[T.id];for(let O in I){let B=I[O];for(let G in B)h(B[G].object),delete B[G];delete I[O]}delete n[T.id]}function A(T){for(let I in n){let O=n[I];if(O[T.id]===void 0)continue;let B=O[T.id];for(let G in B)h(B[G].object),delete B[G];delete O[T.id]}}function R(){v(),a=!0,r!==s&&(r=s,l(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:v,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:p,enableAttribute:m,disableUnusedAttributes:y}}function ky(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];e.update(g,n,1)}function c(l,h,u,d){if(u===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let _=0;_<l.length;_++)a(l[_],h[_],d[_]);else{g.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let _=0;for(let p=0;p<u;p++)_+=h[p]*d[p];e.update(_,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function zy(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==An&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let R=A===fr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Gn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==jn&&!R)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=_>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:g,maxVertexTextures:_,maxTextureSize:p,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:S,maxSamples:w}}function Vy(i){let t=this,e=null,n=0,s=!1,r=!1,a=new En,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let g=u.length!==0||d||n!==0||s;return s=d,n=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,g){let _=u.clippingPlanes,p=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):l();else{let y=r?0:n,M=y*4,x=f.clippingState||null;c.value=x,x=h(_,d,M,g);for(let S=0;S!==M;++S)x[S]=e[S];f.clippingState=x,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,g,_){let p=u!==null?u.length:0,m=null;if(p!==0){if(m=c.value,_!==!0||m===null){let f=g+p*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,x=g;M!==p;++M,x+=4)a.copy(u[M]).applyMatrix4(y,o),a.normal.toArray(m,x),m[x+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=p,t.numIntersection=0,m}}function Hy(i){let t=new WeakMap;function e(a,o){return o===tl?a.mapping=ys:o===el&&(a.mapping=vs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===tl||o===el)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new Po(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var xr=4,Cf=[.125,.215,.35,.446,.526,.582],Es=20,wh=new xs,Rf=new Gt,Ah=null,Ch=0,Rh=0,Ph=!1,Ts=(1+Math.sqrt(5))/2,_r=1/Ts,Pf=[new U(-Ts,_r,0),new U(Ts,_r,0),new U(-_r,0,Ts),new U(_r,0,Ts),new U(0,Ts,-_r),new U(0,Ts,_r),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)],Gy=new U,zl=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Gy}=r;Ah=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),Rh=this._renderer.getActiveMipmapLevel(),Ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ah,Ch,Rh),this._renderer.xr.enabled=Ph,t.scissorTest=!1,Bl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ys||t.mapping===vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ah=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),Rh=this._renderer.getActiveMipmapLevel(),Ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:fr,format:An,colorSpace:ms,depthBuffer:!1},s=If(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=If(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wy(r)),this._blurMaterial=Xy(r,t,e)}return s}_compileMaterial(t){let e=new be(this._lodPlanes[0],t);this._renderer.compile(e,wh)}_sceneToCubeUV(t,e,n,s,r){let c=new tn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,g=u.toneMapping;u.getClearColor(Rf),u.toneMapping=Si,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let p=new kn({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),m=new be(new Ve,p),f=!1,y=t.background;y?y.isColor&&(p.color.copy(y),t.background=null,f=!0):(p.color.copy(Rf),f=!0);for(let M=0;M<6;M++){let x=M%3;x===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[M],r.y,r.z)):x===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[M]));let S=this._cubeSize;Bl(s,x*S,M>2?S:0,S,S),u.setRenderTarget(s),f&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=g,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ys||t.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Df());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new be(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;Bl(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,wh)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Pf[(s-r-1)%Pf.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new be(this._lodPlanes[s],l),d=l.uniforms,g=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Es-1),p=r/_,m=isFinite(r)?1+Math.floor(h*p):Es;m>Es&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Es}`);let f=[],y=0;for(let A=0;A<Es;++A){let R=A/p,v=Math.exp(-R*R/2);f.push(v),A===0?y+=v:A<m&&(y+=2*v)}for(let A=0;A<f.length;A++)f[A]=f[A]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:M}=this;d.dTheta.value=_,d.mipInt.value=M-n;let x=this._sizeLods[s],S=3*x*(s>M-xr?s-M+xr:0),w=4*(this._cubeSize-x);Bl(e,S,w,3*x,2*x),c.setRenderTarget(e),c.render(u,wh)}};function Wy(i){let t=[],e=[],n=[],s=i,r=i-xr+1+Cf.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-xr?c=Cf[a-i+xr-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],g=6,_=6,p=3,m=2,f=1,y=new Float32Array(p*_*g),M=new Float32Array(m*_*g),x=new Float32Array(f*_*g);for(let w=0;w<g;w++){let A=w%3*2/3-1,R=w>2?0:-1,v=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];y.set(v,p*_*w),M.set(d,m*_*w);let T=[w,w,w,w,w,w];x.set(T,f*_*w)}let S=new _n;S.setAttribute("position",new Ze(y,p)),S.setAttribute("uv",new Ze(M,m)),S.setAttribute("faceIndex",new Ze(x,f)),t.push(S),s>xr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function If(i,t,e){let n=new $n(i,t,e);return n.texture.mapping=_a,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Bl(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Xy(i,t,e){let n=new Float32Array(Es),s=new U(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:Es,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Df(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Lf(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function zh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qy(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===tl||c===el,h=c===ys||c===vs;if(l||h){let u=t.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new zl(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let g=o.image;return l&&g&&g.height>0||h&&g&&s(g)?(e===null&&(e=new zl(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0,l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Yy(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&rr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Zy(i,t,e,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let _ in d.attributes)t.remove(d.attributes[_]);d.removeEventListener("dispose",a),delete s[d.id];let g=r.get(d);g&&(t.remove(g),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let g in d)t.update(d[g],i.ARRAY_BUFFER)}function l(u){let d=[],g=u.index,_=u.attributes.position,p=0;if(g!==null){let y=g.array;p=g.version;for(let M=0,x=y.length;M<x;M+=3){let S=y[M+0],w=y[M+1],A=y[M+2];d.push(S,w,w,A,A,S)}}else if(_!==void 0){let y=_.array;p=_.version;for(let M=0,x=y.length/3-1;M<x;M+=3){let S=M+0,w=M+1,A=M+2;d.push(S,w,w,A,A,S)}}else return;let m=new(Mh(d)?na:ea)(d,1);m.version=p;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let g=u.index;g!==null&&d.version<g.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function $y(i,t,e){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,g){i.drawElements(n,g,r,d*a),e.update(g,n,1)}function l(d,g,_){_!==0&&(i.drawElementsInstanced(n,g,r,d*a,_),e.update(g,n,_))}function h(d,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,r,d,0,_);let m=0;for(let f=0;f<_;f++)m+=g[f];e.update(m,n,1)}function u(d,g,_,p){if(_===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/a,g[f],p[f]);else{m.multiDrawElementsInstancedWEBGL(n,g,0,r,d,0,p,0,_);let f=0;for(let y=0;y<_;y++)f+=g[y]*p[y];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jy(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ky(i,t,e){let n=new WeakMap,s=new me;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let v=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",v)};d!==void 0&&d.texture.dispose();let g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],M=0;g===!0&&(M=1),_===!0&&(M=2),p===!0&&(M=3);let x=o.attributes.position.count*M,S=1;x>t.maxTextureSize&&(S=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let w=new Float32Array(x*S*4*u),A=new ta(w,x,S,u);A.type=jn,A.needsUpdate=!0;let R=M*4;for(let T=0;T<u;T++){let I=m[T],O=f[T],B=y[T],G=x*S*4*T;for(let W=0;W<I.count;W++){let H=W*R;g===!0&&(s.fromBufferAttribute(I,W),w[G+H+0]=s.x,w[G+H+1]=s.y,w[G+H+2]=s.z,w[G+H+3]=0),_===!0&&(s.fromBufferAttribute(O,W),w[G+H+4]=s.x,w[G+H+5]=s.y,w[G+H+6]=s.z,w[G+H+7]=0),p===!0&&(s.fromBufferAttribute(B,W),w[G+H+8]=s.x,w[G+H+9]=s.y,w[G+H+10]=s.z,w[G+H+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new It(x,S)},n.set(o,d),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];let _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function jy(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}var jf=new en,Nf=new oa(1,1),Qf=new ta,tp=new Co,ep=new sa,Uf=[],Of=[],Ff=new Float32Array(16),Bf=new Float32Array(9),kf=new Float32Array(4);function vr(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Uf[s];if(r===void 0&&(r=new Float32Array(s),Uf[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ae(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Hl(i,t){let e=Of[t];e===void 0&&(e=new Int32Array(t),Of[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Qy(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function tv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function ev(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function nv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function iv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;kf.set(n),i.uniformMatrix2fv(this.addr,!1,kf),Ce(e,n)}}function sv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;Bf.set(n),i.uniformMatrix3fv(this.addr,!1,Bf),Ce(e,n)}}function rv(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ae(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,n))return;Ff.set(n),i.uniformMatrix4fv(this.addr,!1,Ff),Ce(e,n)}}function av(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ov(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function lv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function cv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function hv(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function uv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function dv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function fv(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function pv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nf.compareFunction=_h,r=Nf):r=jf,e.setTexture2D(t||r,s)}function mv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||tp,s)}function gv(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ep,s)}function _v(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Qf,s)}function xv(i){switch(i){case 5126:return Qy;case 35664:return tv;case 35665:return ev;case 35666:return nv;case 35674:return iv;case 35675:return sv;case 35676:return rv;case 5124:case 35670:return av;case 35667:case 35671:return ov;case 35668:case 35672:return lv;case 35669:case 35673:return cv;case 5125:return hv;case 36294:return uv;case 36295:return dv;case 36296:return fv;case 35678:case 36198:case 36298:case 36306:case 35682:return pv;case 35679:case 36299:case 36307:return mv;case 35680:case 36300:case 36308:case 36293:return gv;case 36289:case 36303:case 36311:case 36292:return _v}}function yv(i,t){i.uniform1fv(this.addr,t)}function vv(i,t){let e=vr(t,this.size,2);i.uniform2fv(this.addr,e)}function Mv(i,t){let e=vr(t,this.size,3);i.uniform3fv(this.addr,e)}function bv(i,t){let e=vr(t,this.size,4);i.uniform4fv(this.addr,e)}function Sv(i,t){let e=vr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Tv(i,t){let e=vr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Ev(i,t){let e=vr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function wv(i,t){i.uniform1iv(this.addr,t)}function Av(i,t){i.uniform2iv(this.addr,t)}function Cv(i,t){i.uniform3iv(this.addr,t)}function Rv(i,t){i.uniform4iv(this.addr,t)}function Pv(i,t){i.uniform1uiv(this.addr,t)}function Iv(i,t){i.uniform2uiv(this.addr,t)}function Dv(i,t){i.uniform3uiv(this.addr,t)}function Lv(i,t){i.uniform4uiv(this.addr,t)}function Nv(i,t,e){let n=this.cache,s=t.length,r=Hl(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||jf,r[a])}function Uv(i,t,e){let n=this.cache,s=t.length,r=Hl(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||tp,r[a])}function Ov(i,t,e){let n=this.cache,s=t.length,r=Hl(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ep,r[a])}function Fv(i,t,e){let n=this.cache,s=t.length,r=Hl(e,s);Ae(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Qf,r[a])}function Bv(i){switch(i){case 5126:return yv;case 35664:return vv;case 35665:return Mv;case 35666:return bv;case 35674:return Sv;case 35675:return Tv;case 35676:return Ev;case 5124:case 35670:return wv;case 35667:case 35671:return Av;case 35668:case 35672:return Cv;case 35669:case 35673:return Rv;case 5125:return Pv;case 36294:return Iv;case 36295:return Dv;case 36296:return Lv;case 35678:case 36198:case 36298:case 36306:case 35682:return Nv;case 35679:case 36299:case 36307:return Uv;case 35680:case 36300:case 36308:case 36293:return Ov;case 36289:case 36303:case 36311:case 36292:return Fv}}var Dh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=xv(e.type)}},Lh=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bv(e.type)}},Nh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Ih=/(\w+)(\])?(\[|\.)?/g;function zf(i,t){i.seq.push(t),i.map[t.id]=t}function kv(i,t,e){let n=i.name,s=n.length;for(Ih.lastIndex=0;;){let r=Ih.exec(n),a=Ih.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){zf(e,l===void 0?new Dh(o,i,t):new Lh(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Nh(o),zf(e,u)),e=u}}}var yr=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);kv(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Vf(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var zv=37297,Vv=0;function Hv(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Hf=new Ot;function Gv(i){Zt._getMatrix(Hf,Zt.workingColorSpace,i);let t=`mat3( ${Hf.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(i)){case Kr:return[t,"LinearTransferOETF"];case Qt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Gf(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Hv(i.getShaderSource(t),o)}else return r}function Wv(i,t){let e=Gv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xv(i,t){let e;switch(t){case rf:e="Linear";break;case af:e="Reinhard";break;case of:e="Cineon";break;case lf:e="ACESFilmic";break;case hf:e="AgX";break;case uf:e="Neutral";break;case cf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var kl=new U;function qv(){Zt.getLuminanceCoefficients(kl);let i=kl.x.toFixed(4),t=kl.y.toFixed(4),e=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sa).join(`
`)}function Zv(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function $v(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Sa(i){return i!==""}function Wf(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uh(i){return i.replace(Jv,jv)}var Kv=new Map;function jv(i,t){let e=kt[t];if(e===void 0){let n=Kv.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Uh(e)}var Qv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qf(i){return i.replace(Qv,tM)}function tM(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yf(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function eM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ih?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function nM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ys:case vs:t="ENVMAP_TYPE_CUBE";break;case _a:t="ENVMAP_TYPE_CUBE_UV";break}return t}function iM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vs:t="ENVMAP_MODE_REFRACTION";break}return t}function sM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qo:t="ENVMAP_BLENDING_MULTIPLY";break;case nf:t="ENVMAP_BLENDING_MIX";break;case sf:t="ENVMAP_BLENDING_ADD";break}return t}function rM(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function aM(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=eM(e),l=nM(e),h=iM(e),u=sM(e),d=rM(e),g=Yv(e),_=Zv(r),p=s.createProgram(),m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Sa).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Sa).join(`
`),f.length>0&&(f+=`
`)):(m=[Yf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sa).join(`
`),f=[Yf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?kt.tonemapping_pars_fragment:"",e.toneMapping!==Si?Xv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Wv("linearToOutputTexel",e.outputColorSpace),qv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Sa).join(`
`)),a=Uh(a),a=Wf(a,e),a=Xf(a,e),o=Uh(o),o=Wf(o,e),o=Xf(o,e),a=qf(a),o=qf(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===xh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=y+m+a,x=y+f+o,S=Vf(s,s.VERTEX_SHADER,M),w=Vf(s,s.FRAGMENT_SHADER,x);s.attachShader(p,S),s.attachShader(p,w),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function A(I){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(p)||"",B=s.getShaderInfoLog(S)||"",G=s.getShaderInfoLog(w)||"",W=O.trim(),H=B.trim(),$=G.trim(),z=!0,rt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,S,w);else{let ct=Gf(s,S,"vertex"),gt=Gf(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+ct+`
`+gt)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(H===""||$==="")&&(rt=!1);rt&&(I.diagnostics={runnable:z,programLog:W,vertexShader:{log:H,prefix:m},fragmentShader:{log:$,prefix:f}})}s.deleteShader(S),s.deleteShader(w),R=new yr(s,p),v=$v(s,p)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let v;this.getAttributes=function(){return v===void 0&&A(this),v};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(p,zv)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vv++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=w,this}var oM=0,Oh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Fh(t),e.set(t,n)),n}},Fh=class{constructor(t){this.id=oM++,this.code=t,this.usedTimes=0}};function lM(i,t,e,n,s,r,a){let o=new or,c=new Oh,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,g=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,T,I,O,B){let G=O.fog,W=B.geometry,H=v.isMeshStandardMaterial?O.environment:null,$=(v.isMeshStandardMaterial?e:t).get(v.envMap||H),z=$&&$.mapping===_a?$.image.height:null,rt=_[v.type];v.precision!==null&&(g=s.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));let ct=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,gt=ct!==void 0?ct.length:0,Dt=0;W.morphAttributes.position!==void 0&&(Dt=1),W.morphAttributes.normal!==void 0&&(Dt=2),W.morphAttributes.color!==void 0&&(Dt=3);let jt,qt,zt,Y;if(rt){let Kt=Qn[rt];jt=Kt.vertexShader,qt=Kt.fragmentShader}else jt=v.vertexShader,qt=v.fragmentShader,c.update(v),zt=c.getVertexShaderID(v),Y=c.getFragmentShaderID(v);let K=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Lt=B.isInstancedMesh===!0,Tt=B.isBatchedMesh===!0,Yt=!!v.map,Oe=!!v.matcap,P=!!$,le=!!v.aoMap,Ut=!!v.lightMap,Rt=!!v.bumpMap,xt=!!v.normalMap,ce=!!v.displacementMap,yt=!!v.emissiveMap,Bt=!!v.metalnessMap,Ie=!!v.roughnessMap,Me=v.anisotropy>0,C=v.clearcoat>0,b=v.dispersion>0,F=v.iridescence>0,q=v.sheen>0,J=v.transmission>0,X=Me&&!!v.anisotropyMap,St=C&&!!v.clearcoatMap,st=C&&!!v.clearcoatNormalMap,vt=C&&!!v.clearcoatRoughnessMap,Mt=F&&!!v.iridescenceMap,et=F&&!!v.iridescenceThicknessMap,ut=q&&!!v.sheenColorMap,Ct=q&&!!v.sheenRoughnessMap,bt=!!v.specularMap,lt=!!v.specularColorMap,Ft=!!v.specularIntensityMap,D=J&&!!v.transmissionMap,nt=J&&!!v.thicknessMap,at=!!v.gradientMap,ft=!!v.alphaMap,Q=v.alphaTest>0,Z=!!v.alphaHash,_t=!!v.extensions,Nt=Si;v.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Nt=i.toneMapping);let re={shaderID:rt,shaderType:v.type,shaderName:v.name,vertexShader:jt,fragmentShader:qt,defines:v.defines,customVertexShaderID:zt,customFragmentShaderID:Y,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:Tt,batchingColor:Tt&&B._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&B.instanceColor!==null,instancingMorph:Lt&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ms,alphaToCoverage:!!v.alphaToCoverage,map:Yt,matcap:Oe,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:z,aoMap:le,lightMap:Ut,bumpMap:Rt,normalMap:xt,displacementMap:d&&ce,emissiveMap:yt,normalMapObjectSpace:xt&&v.normalMapType===mf,normalMapTangentSpace:xt&&v.normalMapType===gh,metalnessMap:Bt,roughnessMap:Ie,anisotropy:Me,anisotropyMap:X,clearcoat:C,clearcoatMap:St,clearcoatNormalMap:st,clearcoatRoughnessMap:vt,dispersion:b,iridescence:F,iridescenceMap:Mt,iridescenceThicknessMap:et,sheen:q,sheenColorMap:ut,sheenRoughnessMap:Ct,specularMap:bt,specularColorMap:lt,specularIntensityMap:Ft,transmission:J,transmissionMap:D,thicknessMap:nt,gradientMap:at,opaque:v.transparent===!1&&v.blending===fs&&v.alphaToCoverage===!1,alphaMap:ft,alphaTest:Q,alphaHash:Z,combine:v.combine,mapUv:Yt&&p(v.map.channel),aoMapUv:le&&p(v.aoMap.channel),lightMapUv:Ut&&p(v.lightMap.channel),bumpMapUv:Rt&&p(v.bumpMap.channel),normalMapUv:xt&&p(v.normalMap.channel),displacementMapUv:ce&&p(v.displacementMap.channel),emissiveMapUv:yt&&p(v.emissiveMap.channel),metalnessMapUv:Bt&&p(v.metalnessMap.channel),roughnessMapUv:Ie&&p(v.roughnessMap.channel),anisotropyMapUv:X&&p(v.anisotropyMap.channel),clearcoatMapUv:St&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:st&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:et&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&p(v.sheenRoughnessMap.channel),specularMapUv:bt&&p(v.specularMap.channel),specularColorMapUv:lt&&p(v.specularColorMap.channel),specularIntensityMapUv:Ft&&p(v.specularIntensityMap.channel),transmissionMapUv:D&&p(v.transmissionMap.channel),thicknessMapUv:nt&&p(v.thicknessMap.channel),alphaMapUv:ft&&p(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(xt||Me),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(Yt||ft),fog:!!G,useFog:v.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:pt,skinning:B.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:Dt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Yt&&v.map.isVideoTexture===!0&&Zt.getTransfer(v.map.colorSpace)===Qt,decodeVideoTextureEmissive:yt&&v.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(v.emissiveMap.colorSpace)===Qt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Kn,flipSided:v.side===Je,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_t&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_t&&v.extensions.multiDraw===!0||Tt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return re.vertexUv1s=l.has(1),re.vertexUv2s=l.has(2),re.vertexUv3s=l.has(3),l.clear(),re}function f(v){let T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)T.push(I),T.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(y(T,v),M(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function y(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function M(v,T){o.disableAll(),T.supportsVertexTextures&&o.enable(0),T.instancing&&o.enable(1),T.instancingColor&&o.enable(2),T.instancingMorph&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),T.dispersion&&o.enable(20),T.batchingColor&&o.enable(21),T.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),v.push(o.mask)}function x(v){let T=_[v.type],I;if(T){let O=Qn[T];I=wf.clone(O.uniforms)}else I=v.uniforms;return I}function S(v,T){let I;for(let O=0,B=h.length;O<B;O++){let G=h[O];if(G.cacheKey===T){I=G,++I.usedTimes;break}}return I===void 0&&(I=new aM(i,T,v,r),h.push(I)),I}function w(v){if(--v.usedTimes===0){let T=h.indexOf(v);h[T]=h[h.length-1],h.pop(),v.destroy()}}function A(v){c.remove(v)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:S,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:R}}function cM(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function hM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Zf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function $f(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,g,_,p,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:g,groupOrder:_,renderOrder:u.renderOrder,z:p,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=g,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=p,f.group=m),t++,f}function o(u,d,g,_,p,m){let f=a(u,d,g,_,p,m);g.transmission>0?n.push(f):g.transparent===!0?s.push(f):e.push(f)}function c(u,d,g,_,p,m){let f=a(u,d,g,_,p,m);g.transmission>0?n.unshift(f):g.transparent===!0?s.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||hM),n.length>1&&n.sort(d||Zf),s.length>1&&s.sort(d||Zf)}function h(){for(let u=t,d=i.length;u<d;u++){let g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function uM(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new $f,i.set(n,[a])):s>=r.length?(a=new $f,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function dM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new Gt};break;case"SpotLight":e={position:new U,direction:new U,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function fM(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var pM=0;function mM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function gM(i){let t=new dM,e=fM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);let s=new U,r=new pe,a=new pe;function o(l){let h=0,u=0,d=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let g=0,_=0,p=0,m=0,f=0,y=0,M=0,x=0,S=0,w=0,A=0;l.sort(mM);for(let v=0,T=l.length;v<T;v++){let I=l[v],O=I.color,B=I.intensity,G=I.distance,W=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=O.r*B,u+=O.g*B,d+=O.b*B;else if(I.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(I.sh.coefficients[H],B);A++}else if(I.isDirectionalLight){let H=t.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let $=I.shadow,z=e.get(I);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,n.directionalShadow[g]=z,n.directionalShadowMap[g]=W,n.directionalShadowMatrix[g]=I.shadow.matrix,y++}n.directional[g]=H,g++}else if(I.isSpotLight){let H=t.get(I);H.position.setFromMatrixPosition(I.matrixWorld),H.color.copy(O).multiplyScalar(B),H.distance=G,H.coneCos=Math.cos(I.angle),H.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),H.decay=I.decay,n.spot[p]=H;let $=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,$.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[p]=$.matrix,I.castShadow){let z=e.get(I);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,n.spotShadow[p]=z,n.spotShadowMap[p]=W,x++}p++}else if(I.isRectAreaLight){let H=t.get(I);H.color.copy(O).multiplyScalar(B),H.halfWidth.set(I.width*.5,0,0),H.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=H,m++}else if(I.isPointLight){let H=t.get(I);if(H.color.copy(I.color).multiplyScalar(I.intensity),H.distance=I.distance,H.decay=I.decay,I.castShadow){let $=I.shadow,z=e.get(I);z.shadowIntensity=$.intensity,z.shadowBias=$.bias,z.shadowNormalBias=$.normalBias,z.shadowRadius=$.radius,z.shadowMapSize=$.mapSize,z.shadowCameraNear=$.camera.near,z.shadowCameraFar=$.camera.far,n.pointShadow[_]=z,n.pointShadowMap[_]=W,n.pointShadowMatrix[_]=I.shadow.matrix,M++}n.point[_]=H,_++}else if(I.isHemisphereLight){let H=t.get(I);H.skyColor.copy(I.color).multiplyScalar(B),H.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[f]=H,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==g||R.pointLength!==_||R.spotLength!==p||R.rectAreaLength!==m||R.hemiLength!==f||R.numDirectionalShadows!==y||R.numPointShadows!==M||R.numSpotShadows!==x||R.numSpotMaps!==S||R.numLightProbes!==A)&&(n.directional.length=g,n.spot.length=p,n.rectArea.length=m,n.point.length=_,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+S-w,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,R.directionalLength=g,R.pointLength=_,R.spotLength=p,R.rectAreaLength=m,R.hemiLength=f,R.numDirectionalShadows=y,R.numPointShadows=M,R.numSpotShadows=x,R.numSpotMaps=S,R.numLightProbes=A,n.version=pM++)}function c(l,h){let u=0,d=0,g=0,_=0,p=0,m=h.matrixWorldInverse;for(let f=0,y=l.length;f<y;f++){let M=l[f];if(M.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(M.isSpotLight){let x=n.spot[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),g++}else if(M.isRectAreaLight){let x=n.rectArea[_];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){let x=n.hemi[p];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),p++}}}return{setup:o,setupView:c,state:n}}function Jf(i){let t=new gM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function _M(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Jf(i),t.set(s,[o])):r>=a.length?(o=new Jf(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var xM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vM(i,t,e){let n=new cr,s=new It,r=new It,a=new me,o=new No({depthPacking:pf}),c=new Uo,l={},h=e.maxTextureSize,u={[xi]:Je,[Je]:xi,[Kn]:Kn},d=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:xM,fragmentShader:yM}),g=d.clone();g.defines.HORIZONTAL_PASS=1;let _=new _n;_.setAttribute("position",new Ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let p=new be(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ih;let f=this.type;this.render=function(w,A,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;let v=i.getRenderTarget(),T=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),O=i.state;O.setBlending(bi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let B=f!==Jn&&this.type===Jn,G=f===Jn&&this.type!==Jn;for(let W=0,H=w.length;W<H;W++){let $=w[W],z=$.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let rt=z.getFrameExtents();if(s.multiply(rt),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,z.mapSize.y=r.y)),z.map===null||B===!0||G===!0){let gt=this.type!==Jn?{minFilter:$e,magFilter:$e}:{};z.map!==null&&z.map.dispose(),z.map=new $n(s.x,s.y,gt),z.map.texture.name=$.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();let ct=z.getViewportCount();for(let gt=0;gt<ct;gt++){let Dt=z.getViewport(gt);a.set(r.x*Dt.x,r.y*Dt.y,r.x*Dt.z,r.y*Dt.w),O.viewport(a),z.updateMatrices($,gt),n=z.getFrustum(),x(A,R,z.camera,$,this.type)}z.isPointLightShadow!==!0&&this.type===Jn&&y(z,R),z.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(v,T,I)};function y(w,A){let R=t.update(p);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,g.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new $n(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,R,d,p,null),g.uniforms.shadow_pass.value=w.mapPass.texture,g.uniforms.resolution.value=w.mapSize,g.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,R,g,p,null)}function M(w,A,R,v){let T=null,I=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)T=I;else if(T=R.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let O=T.uuid,B=A.uuid,G=l[O];G===void 0&&(G={},l[O]=G);let W=G[B];W===void 0&&(W=T.clone(),G[B]=W,A.addEventListener("dispose",S)),T=W}if(T.visible=A.visible,T.wireframe=A.wireframe,v===Jn?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:u[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,R.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let O=i.properties.get(T);O.light=R}return T}function x(w,A,R,v,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===Jn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let B=t.update(w),G=w.material;if(Array.isArray(G)){let W=B.groups;for(let H=0,$=W.length;H<$;H++){let z=W[H],rt=G[z.materialIndex];if(rt&&rt.visible){let ct=M(w,rt,v,T);w.onBeforeShadow(i,w,A,R,B,ct,z),i.renderBufferDirect(R,null,B,ct,w,z),w.onAfterShadow(i,w,A,R,B,ct,z)}}}else if(G.visible){let W=M(w,G,v,T);w.onBeforeShadow(i,w,A,R,B,W,null),i.renderBufferDirect(R,null,B,W,w,null),w.onAfterShadow(i,w,A,R,B,W,null)}}let O=w.children;for(let B=0,G=O.length;B<G;B++)x(O[B],A,R,v,T)}function S(w){w.target.removeEventListener("dispose",S);for(let R in l){let v=l[R],T=w.target.uuid;T in v&&(v[T].dispose(),delete v[T])}}}var MM={[qo]:Yo,[Zo]:Ko,[$o]:jo,[ps]:Jo,[Yo]:qo,[Ko]:Zo,[jo]:$o,[Jo]:ps};function bM(i,t){function e(){let D=!1,nt=new me,at=null,ft=new me(0,0,0,0);return{setMask:function(Q){at!==Q&&!D&&(i.colorMask(Q,Q,Q,Q),at=Q)},setLocked:function(Q){D=Q},setClear:function(Q,Z,_t,Nt,re){re===!0&&(Q*=Nt,Z*=Nt,_t*=Nt),nt.set(Q,Z,_t,Nt),ft.equals(nt)===!1&&(i.clearColor(Q,Z,_t,Nt),ft.copy(nt))},reset:function(){D=!1,at=null,ft.set(-1,0,0,0)}}}function n(){let D=!1,nt=!1,at=null,ft=null,Q=null;return{setReversed:function(Z){if(nt!==Z){let _t=t.get("EXT_clip_control");Z?_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.ZERO_TO_ONE_EXT):_t.clipControlEXT(_t.LOWER_LEFT_EXT,_t.NEGATIVE_ONE_TO_ONE_EXT),nt=Z;let Nt=Q;Q=null,this.setClear(Nt)}},getReversed:function(){return nt},setTest:function(Z){Z?K(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(Z){at!==Z&&!D&&(i.depthMask(Z),at=Z)},setFunc:function(Z){if(nt&&(Z=MM[Z]),ft!==Z){switch(Z){case qo:i.depthFunc(i.NEVER);break;case Yo:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case ps:i.depthFunc(i.LEQUAL);break;case $o:i.depthFunc(i.EQUAL);break;case Jo:i.depthFunc(i.GEQUAL);break;case Ko:i.depthFunc(i.GREATER);break;case jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ft=Z}},setLocked:function(Z){D=Z},setClear:function(Z){Q!==Z&&(nt&&(Z=1-Z),i.clearDepth(Z),Q=Z)},reset:function(){D=!1,at=null,ft=null,Q=null,nt=!1}}}function s(){let D=!1,nt=null,at=null,ft=null,Q=null,Z=null,_t=null,Nt=null,re=null;return{setTest:function(Kt){D||(Kt?K(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(Kt){nt!==Kt&&!D&&(i.stencilMask(Kt),nt=Kt)},setFunc:function(Kt,ci,Yn){(at!==Kt||ft!==ci||Q!==Yn)&&(i.stencilFunc(Kt,ci,Yn),at=Kt,ft=ci,Q=Yn)},setOp:function(Kt,ci,Yn){(Z!==Kt||_t!==ci||Nt!==Yn)&&(i.stencilOp(Kt,ci,Yn),Z=Kt,_t=ci,Nt=Yn)},setLocked:function(Kt){D=Kt},setClear:function(Kt){re!==Kt&&(i.clearStencil(Kt),re=Kt)},reset:function(){D=!1,nt=null,at=null,ft=null,Q=null,Z=null,_t=null,Nt=null,re=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,g=[],_=null,p=!1,m=null,f=null,y=null,M=null,x=null,S=null,w=null,A=new Gt(0,0,0),R=0,v=!1,T=null,I=null,O=null,B=null,G=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,$=0,z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(z)[1]),H=$>=1):z.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),H=$>=2);let rt=null,ct={},gt=i.getParameter(i.SCISSOR_BOX),Dt=i.getParameter(i.VIEWPORT),jt=new me().fromArray(gt),qt=new me().fromArray(Dt);function zt(D,nt,at,ft){let Q=new Uint8Array(4),Z=i.createTexture();i.bindTexture(D,Z),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _t=0;_t<at;_t++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(nt,0,i.RGBA,1,1,ft,0,i.RGBA,i.UNSIGNED_BYTE,Q):i.texImage2D(nt+_t,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Q);return Z}let Y={};Y[i.TEXTURE_2D]=zt(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=zt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=zt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=zt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(i.DEPTH_TEST),a.setFunc(ps),Rt(!1),xt(nh),K(i.CULL_FACE),le(bi);function K(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function pt(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Lt(D,nt){return u[D]!==nt?(i.bindFramebuffer(D,nt),u[D]=nt,D===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=nt),D===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=nt),!0):!1}function Tt(D,nt){let at=g,ft=!1;if(D){at=d.get(nt),at===void 0&&(at=[],d.set(nt,at));let Q=D.textures;if(at.length!==Q.length||at[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,_t=Q.length;Z<_t;Z++)at[Z]=i.COLOR_ATTACHMENT0+Z;at.length=Q.length,ft=!0}}else at[0]!==i.BACK&&(at[0]=i.BACK,ft=!0);ft&&i.drawBuffers(at)}function Yt(D){return _!==D?(i.useProgram(D),_=D,!0):!1}let Oe={[ki]:i.FUNC_ADD,[kd]:i.FUNC_SUBTRACT,[zd]:i.FUNC_REVERSE_SUBTRACT};Oe[Vd]=i.MIN,Oe[Hd]=i.MAX;let P={[Gd]:i.ZERO,[Wd]:i.ONE,[Xd]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[Kd]:i.SRC_ALPHA_SATURATE,[$d]:i.DST_COLOR,[Yd]:i.DST_ALPHA,[qd]:i.ONE_MINUS_SRC_COLOR,[So]:i.ONE_MINUS_SRC_ALPHA,[Jd]:i.ONE_MINUS_DST_COLOR,[Zd]:i.ONE_MINUS_DST_ALPHA,[jd]:i.CONSTANT_COLOR,[Qd]:i.ONE_MINUS_CONSTANT_COLOR,[tf]:i.CONSTANT_ALPHA,[ef]:i.ONE_MINUS_CONSTANT_ALPHA};function le(D,nt,at,ft,Q,Z,_t,Nt,re,Kt){if(D===bi){p===!0&&(pt(i.BLEND),p=!1);return}if(p===!1&&(K(i.BLEND),p=!0),D!==Bd){if(D!==m||Kt!==v){if((f!==ki||x!==ki)&&(i.blendEquation(i.FUNC_ADD),f=ki,x=ki),Kt)switch(D){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sh:i.blendFunc(i.ONE,i.ONE);break;case rh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ah:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case sh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case rh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ah:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,M=null,S=null,w=null,A.set(0,0,0),R=0,m=D,v=Kt}return}Q=Q||nt,Z=Z||at,_t=_t||ft,(nt!==f||Q!==x)&&(i.blendEquationSeparate(Oe[nt],Oe[Q]),f=nt,x=Q),(at!==y||ft!==M||Z!==S||_t!==w)&&(i.blendFuncSeparate(P[at],P[ft],P[Z],P[_t]),y=at,M=ft,S=Z,w=_t),(Nt.equals(A)===!1||re!==R)&&(i.blendColor(Nt.r,Nt.g,Nt.b,re),A.copy(Nt),R=re),m=D,v=!1}function Ut(D,nt){D.side===Kn?pt(i.CULL_FACE):K(i.CULL_FACE);let at=D.side===Je;nt&&(at=!at),Rt(at),D.blending===fs&&D.transparent===!1?le(bi):le(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let ft=D.stencilWrite;o.setTest(ft),ft&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),yt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(D){T!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),T=D)}function xt(D){D!==Ud?(K(i.CULL_FACE),D!==I&&(D===nh?i.cullFace(i.BACK):D===Od?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),I=D}function ce(D){D!==O&&(H&&i.lineWidth(D),O=D)}function yt(D,nt,at){D?(K(i.POLYGON_OFFSET_FILL),(B!==nt||G!==at)&&(i.polygonOffset(nt,at),B=nt,G=at)):pt(i.POLYGON_OFFSET_FILL)}function Bt(D){D?K(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function Ie(D){D===void 0&&(D=i.TEXTURE0+W-1),rt!==D&&(i.activeTexture(D),rt=D)}function Me(D,nt,at){at===void 0&&(rt===null?at=i.TEXTURE0+W-1:at=rt);let ft=ct[at];ft===void 0&&(ft={type:void 0,texture:void 0},ct[at]=ft),(ft.type!==D||ft.texture!==nt)&&(rt!==at&&(i.activeTexture(at),rt=at),i.bindTexture(D,nt||Y[D]),ft.type=D,ft.texture=nt)}function C(){let D=ct[rt];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function F(){try{i.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{i.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{i.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{i.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(){try{i.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{i.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{i.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(D){jt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),jt.copy(D))}function Ct(D){qt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),qt.copy(D))}function bt(D,nt){let at=l.get(nt);at===void 0&&(at=new WeakMap,l.set(nt,at));let ft=at.get(D);ft===void 0&&(ft=i.getUniformBlockIndex(nt,D.name),at.set(D,ft))}function lt(D,nt){let ft=l.get(nt).get(D);c.get(nt)!==ft&&(i.uniformBlockBinding(nt,ft,D.__bindingPointIndex),c.set(nt,ft))}function Ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},rt=null,ct={},u={},d=new WeakMap,g=[],_=null,p=!1,m=null,f=null,y=null,M=null,x=null,S=null,w=null,A=new Gt(0,0,0),R=0,v=!1,T=null,I=null,O=null,B=null,G=null,jt.set(0,0,i.canvas.width,i.canvas.height),qt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:pt,bindFramebuffer:Lt,drawBuffers:Tt,useProgram:Yt,setBlending:le,setMaterial:Ut,setFlipSided:Rt,setCullFace:xt,setLineWidth:ce,setPolygonOffset:yt,setScissorTest:Bt,activeTexture:Ie,bindTexture:Me,unbindTexture:C,compressedTexImage2D:b,compressedTexImage3D:F,texImage2D:Mt,texImage3D:et,updateUBOMapping:bt,uniformBlockBinding:lt,texStorage2D:st,texStorage3D:vt,texSubImage2D:q,texSubImage3D:J,compressedTexSubImage2D:X,compressedTexSubImage3D:St,scissor:ut,viewport:Ct,reset:Ft}}function SM(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new It,h=new WeakMap,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,b){return g?new OffscreenCanvas(C,b):Qr("canvas")}function p(C,b,F){let q=1,J=Me(C);if((J.width>F||J.height>F)&&(q=F/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let X=Math.floor(q*J.width),St=Math.floor(q*J.height);u===void 0&&(u=_(X,St));let st=b?_(X,St):u;return st.width=X,st.height=St,st.getContext("2d").drawImage(C,0,0,X,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+X+"x"+St+")."),st}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function m(C){return C.generateMipmaps}function f(C){i.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(C,b,F,q,J=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=b;if(b===i.RED&&(F===i.FLOAT&&(X=i.R32F),F===i.HALF_FLOAT&&(X=i.R16F),F===i.UNSIGNED_BYTE&&(X=i.R8)),b===i.RED_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.R8UI),F===i.UNSIGNED_SHORT&&(X=i.R16UI),F===i.UNSIGNED_INT&&(X=i.R32UI),F===i.BYTE&&(X=i.R8I),F===i.SHORT&&(X=i.R16I),F===i.INT&&(X=i.R32I)),b===i.RG&&(F===i.FLOAT&&(X=i.RG32F),F===i.HALF_FLOAT&&(X=i.RG16F),F===i.UNSIGNED_BYTE&&(X=i.RG8)),b===i.RG_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RG8UI),F===i.UNSIGNED_SHORT&&(X=i.RG16UI),F===i.UNSIGNED_INT&&(X=i.RG32UI),F===i.BYTE&&(X=i.RG8I),F===i.SHORT&&(X=i.RG16I),F===i.INT&&(X=i.RG32I)),b===i.RGB_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGB8UI),F===i.UNSIGNED_SHORT&&(X=i.RGB16UI),F===i.UNSIGNED_INT&&(X=i.RGB32UI),F===i.BYTE&&(X=i.RGB8I),F===i.SHORT&&(X=i.RGB16I),F===i.INT&&(X=i.RGB32I)),b===i.RGBA_INTEGER&&(F===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),F===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),F===i.UNSIGNED_INT&&(X=i.RGBA32UI),F===i.BYTE&&(X=i.RGBA8I),F===i.SHORT&&(X=i.RGBA16I),F===i.INT&&(X=i.RGBA32I)),b===i.RGB&&(F===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),F===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),b===i.RGBA){let St=J?Kr:Zt.getTransfer(q);F===i.FLOAT&&(X=i.RGBA32F),F===i.HALF_FLOAT&&(X=i.RGBA16F),F===i.UNSIGNED_BYTE&&(X=St===Qt?i.SRGB8_ALPHA8:i.RGBA8),F===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),F===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function x(C,b){let F;return C?b===null||b===qi||b===pr?F=i.DEPTH24_STENCIL8:b===jn?F=i.DEPTH32F_STENCIL8:b===dr&&(F=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===qi||b===pr?F=i.DEPTH_COMPONENT24:b===jn?F=i.DEPTH_COMPONENT32F:b===dr&&(F=i.DEPTH_COMPONENT16),F}function S(C,b){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==$e&&C.minFilter!==Fn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function w(C){let b=C.target;b.removeEventListener("dispose",w),R(b),b.isVideoTexture&&h.delete(b)}function A(C){let b=C.target;b.removeEventListener("dispose",A),T(b)}function R(C){let b=n.get(C);if(b.__webglInit===void 0)return;let F=C.source,q=d.get(F);if(q){let J=q[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&v(C),Object.keys(q).length===0&&d.delete(F)}n.remove(C)}function v(C){let b=n.get(C);i.deleteTexture(b.__webglTexture);let F=C.source,q=d.get(F);delete q[b.__cacheKey],a.memory.textures--}function T(C){let b=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(b.__webglFramebuffer[q]))for(let J=0;J<b.__webglFramebuffer[q].length;J++)i.deleteFramebuffer(b.__webglFramebuffer[q][J]);else i.deleteFramebuffer(b.__webglFramebuffer[q]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[q])}else{if(Array.isArray(b.__webglFramebuffer))for(let q=0;q<b.__webglFramebuffer.length;q++)i.deleteFramebuffer(b.__webglFramebuffer[q]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let q=0;q<b.__webglColorRenderbuffer.length;q++)b.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[q]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let F=C.textures;for(let q=0,J=F.length;q<J;q++){let X=n.get(F[q]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(C)}let I=0;function O(){I=0}function B(){let C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function G(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function W(C,b){let F=n.get(C);if(C.isVideoTexture&&Bt(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&F.__version!==C.version){let q=C.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,C,b);return}}else C.isExternalTexture&&(F.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,F.__webglTexture,i.TEXTURE0+b)}function H(C,b){let F=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){Y(F,C,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,F.__webglTexture,i.TEXTURE0+b)}function $(C,b){let F=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&F.__version!==C.version){Y(F,C,b);return}e.bindTexture(i.TEXTURE_3D,F.__webglTexture,i.TEXTURE0+b)}function z(C,b){let F=n.get(C);if(C.version>0&&F.__version!==C.version){K(F,C,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture,i.TEXTURE0+b)}let rt={[nr]:i.REPEAT,[Bi]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},ct={[$e]:i.NEAREST,[df]:i.NEAREST_MIPMAP_NEAREST,[xa]:i.NEAREST_MIPMAP_LINEAR,[Fn]:i.LINEAR,[nl]:i.LINEAR_MIPMAP_NEAREST,[Xi]:i.LINEAR_MIPMAP_LINEAR},gt={[gf]:i.NEVER,[bf]:i.ALWAYS,[_f]:i.LESS,[_h]:i.LEQUAL,[xf]:i.EQUAL,[Mf]:i.GEQUAL,[yf]:i.GREATER,[vf]:i.NOTEQUAL};function Dt(C,b){if(b.type===jn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Fn||b.magFilter===nl||b.magFilter===xa||b.magFilter===Xi||b.minFilter===Fn||b.minFilter===nl||b.minFilter===xa||b.minFilter===Xi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,rt[b.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,rt[b.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,rt[b.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ct[b.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ct[b.minFilter]),b.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,gt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===$e||b.minFilter!==xa&&b.minFilter!==Xi||b.type===jn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let F=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function jt(C,b){let F=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",w));let q=b.source,J=d.get(q);J===void 0&&(J={},d.set(q,J));let X=G(b);if(X!==C.__cacheKey){J[X]===void 0&&(J[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,F=!0),J[X].usedTimes++;let St=J[C.__cacheKey];St!==void 0&&(J[C.__cacheKey].usedTimes--,St.usedTimes===0&&v(b)),C.__cacheKey=X,C.__webglTexture=J[X].texture}return F}function qt(C,b,F){return Math.floor(Math.floor(C/F)/b)}function zt(C,b,F,q){let X=C.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,F,q,b.data);else{X.sort((et,ut)=>et.start-ut.start);let St=0;for(let et=1;et<X.length;et++){let ut=X[St],Ct=X[et],bt=ut.start+ut.count,lt=qt(Ct.start,b.width,4),Ft=qt(ut.start,b.width,4);Ct.start<=bt+1&&lt===Ft&&qt(Ct.start+Ct.count-1,b.width,4)===lt?ut.count=Math.max(ut.count,Ct.start+Ct.count-ut.start):(++St,X[St]=Ct)}X.length=St+1;let st=i.getParameter(i.UNPACK_ROW_LENGTH),vt=i.getParameter(i.UNPACK_SKIP_PIXELS),Mt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let et=0,ut=X.length;et<ut;et++){let Ct=X[et],bt=Math.floor(Ct.start/4),lt=Math.ceil(Ct.count/4),Ft=bt%b.width,D=Math.floor(bt/b.width),nt=lt,at=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ft),i.pixelStorei(i.UNPACK_SKIP_ROWS,D),e.texSubImage2D(i.TEXTURE_2D,0,Ft,D,nt,at,F,q,b.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,st),i.pixelStorei(i.UNPACK_SKIP_PIXELS,vt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Mt)}}function Y(C,b,F){let q=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(q=i.TEXTURE_3D);let J=jt(C,b),X=b.source;e.bindTexture(q,C.__webglTexture,i.TEXTURE0+F);let St=n.get(X);if(X.version!==St.__version||J===!0){e.activeTexture(i.TEXTURE0+F);let st=Zt.getPrimaries(Zt.workingColorSpace),vt=b.colorSpace===Ti?null:Zt.getPrimaries(b.colorSpace),Mt=b.colorSpace===Ti||st===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let et=p(b.image,!1,s.maxTextureSize);et=Ie(b,et);let ut=r.convert(b.format,b.colorSpace),Ct=r.convert(b.type),bt=M(b.internalFormat,ut,Ct,b.colorSpace,b.isVideoTexture);Dt(q,b);let lt,Ft=b.mipmaps,D=b.isVideoTexture!==!0,nt=St.__version===void 0||J===!0,at=X.dataReady,ft=S(b,et);if(b.isDepthTexture)bt=x(b.format===mr,b.type),nt&&(D?e.texStorage2D(i.TEXTURE_2D,1,bt,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,bt,et.width,et.height,0,ut,Ct,null));else if(b.isDataTexture)if(Ft.length>0){D&&nt&&e.texStorage2D(i.TEXTURE_2D,ft,bt,Ft[0].width,Ft[0].height);for(let Q=0,Z=Ft.length;Q<Z;Q++)lt=Ft[Q],D?at&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,Ct,lt.data):e.texImage2D(i.TEXTURE_2D,Q,bt,lt.width,lt.height,0,ut,Ct,lt.data);b.generateMipmaps=!1}else D?(nt&&e.texStorage2D(i.TEXTURE_2D,ft,bt,et.width,et.height),at&&zt(b,et,ut,Ct)):e.texImage2D(i.TEXTURE_2D,0,bt,et.width,et.height,0,ut,Ct,et.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){D&&nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,bt,Ft[0].width,Ft[0].height,et.depth);for(let Q=0,Z=Ft.length;Q<Z;Q++)if(lt=Ft[Q],b.format!==An)if(ut!==null)if(D){if(at)if(b.layerUpdates.size>0){let _t=Eh(lt.width,lt.height,b.format,b.type);for(let Nt of b.layerUpdates){let re=lt.data.subarray(Nt*_t/lt.data.BYTES_PER_ELEMENT,(Nt+1)*_t/lt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,Nt,lt.width,lt.height,1,ut,re)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,lt.width,lt.height,et.depth,ut,lt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Q,bt,lt.width,lt.height,et.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?at&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Q,0,0,0,lt.width,lt.height,et.depth,ut,Ct,lt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Q,bt,lt.width,lt.height,et.depth,0,ut,Ct,lt.data)}else{D&&nt&&e.texStorage2D(i.TEXTURE_2D,ft,bt,Ft[0].width,Ft[0].height);for(let Q=0,Z=Ft.length;Q<Z;Q++)lt=Ft[Q],b.format!==An?ut!==null?D?at&&e.compressedTexSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,lt.data):e.compressedTexImage2D(i.TEXTURE_2D,Q,bt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?at&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,lt.width,lt.height,ut,Ct,lt.data):e.texImage2D(i.TEXTURE_2D,Q,bt,lt.width,lt.height,0,ut,Ct,lt.data)}else if(b.isDataArrayTexture)if(D){if(nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,bt,et.width,et.height,et.depth),at)if(b.layerUpdates.size>0){let Q=Eh(et.width,et.height,b.format,b.type);for(let Z of b.layerUpdates){let _t=et.data.subarray(Z*Q/et.data.BYTES_PER_ELEMENT,(Z+1)*Q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,et.width,et.height,1,ut,Ct,_t)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ut,Ct,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,bt,et.width,et.height,et.depth,0,ut,Ct,et.data);else if(b.isData3DTexture)D?(nt&&e.texStorage3D(i.TEXTURE_3D,ft,bt,et.width,et.height,et.depth),at&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ut,Ct,et.data)):e.texImage3D(i.TEXTURE_3D,0,bt,et.width,et.height,et.depth,0,ut,Ct,et.data);else if(b.isFramebufferTexture){if(nt)if(D)e.texStorage2D(i.TEXTURE_2D,ft,bt,et.width,et.height);else{let Q=et.width,Z=et.height;for(let _t=0;_t<ft;_t++)e.texImage2D(i.TEXTURE_2D,_t,bt,Q,Z,0,ut,Ct,null),Q>>=1,Z>>=1}}else if(Ft.length>0){if(D&&nt){let Q=Me(Ft[0]);e.texStorage2D(i.TEXTURE_2D,ft,bt,Q.width,Q.height)}for(let Q=0,Z=Ft.length;Q<Z;Q++)lt=Ft[Q],D?at&&e.texSubImage2D(i.TEXTURE_2D,Q,0,0,ut,Ct,lt):e.texImage2D(i.TEXTURE_2D,Q,bt,ut,Ct,lt);b.generateMipmaps=!1}else if(D){if(nt){let Q=Me(et);e.texStorage2D(i.TEXTURE_2D,ft,bt,Q.width,Q.height)}at&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut,Ct,et)}else e.texImage2D(i.TEXTURE_2D,0,bt,ut,Ct,et);m(b)&&f(q),St.__version=X.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function K(C,b,F){if(b.image.length!==6)return;let q=jt(C,b),J=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+F);let X=n.get(J);if(J.version!==X.__version||q===!0){e.activeTexture(i.TEXTURE0+F);let St=Zt.getPrimaries(Zt.workingColorSpace),st=b.colorSpace===Ti?null:Zt.getPrimaries(b.colorSpace),vt=b.colorSpace===Ti||St===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let Mt=b.isCompressedTexture||b.image[0].isCompressedTexture,et=b.image[0]&&b.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!Mt&&!et?ut[Z]=p(b.image[Z],!0,s.maxCubemapSize):ut[Z]=et?b.image[Z].image:b.image[Z],ut[Z]=Ie(b,ut[Z]);let Ct=ut[0],bt=r.convert(b.format,b.colorSpace),lt=r.convert(b.type),Ft=M(b.internalFormat,bt,lt,b.colorSpace),D=b.isVideoTexture!==!0,nt=X.__version===void 0||q===!0,at=J.dataReady,ft=S(b,Ct);Dt(i.TEXTURE_CUBE_MAP,b);let Q;if(Mt){D&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Ft,Ct.width,Ct.height);for(let Z=0;Z<6;Z++){Q=ut[Z].mipmaps;for(let _t=0;_t<Q.length;_t++){let Nt=Q[_t];b.format!==An?bt!==null?D?at&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,0,0,Nt.width,Nt.height,bt,Nt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,Ft,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,0,0,Nt.width,Nt.height,bt,lt,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t,Ft,Nt.width,Nt.height,0,bt,lt,Nt.data)}}}else{if(Q=b.mipmaps,D&&nt){Q.length>0&&ft++;let Z=Me(ut[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Ft,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(et){D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,bt,lt,ut[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ft,ut[Z].width,ut[Z].height,0,bt,lt,ut[Z].data);for(let _t=0;_t<Q.length;_t++){let re=Q[_t].image[Z].image;D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,0,0,re.width,re.height,bt,lt,re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,Ft,re.width,re.height,0,bt,lt,re.data)}}else{D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,bt,lt,ut[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ft,bt,lt,ut[Z]);for(let _t=0;_t<Q.length;_t++){let Nt=Q[_t];D?at&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,0,0,bt,lt,Nt.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,_t+1,Ft,bt,lt,Nt.image[Z])}}}m(b)&&f(i.TEXTURE_CUBE_MAP),X.__version=J.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function pt(C,b,F,q,J,X){let St=r.convert(F.format,F.colorSpace),st=r.convert(F.type),vt=M(F.internalFormat,St,st,F.colorSpace),Mt=n.get(b),et=n.get(F);if(et.__renderTarget=b,!Mt.__hasExternalTextures){let ut=Math.max(1,b.width>>X),Ct=Math.max(1,b.height>>X);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,X,vt,ut,Ct,b.depth,0,St,st,null):e.texImage2D(J,X,vt,ut,Ct,0,St,st,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,J,et.__webglTexture,0,ce(b)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,J,et.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(C,b,F){if(i.bindRenderbuffer(i.RENDERBUFFER,C),b.depthBuffer){let q=b.depthTexture,J=q&&q.isDepthTexture?q.type:null,X=x(b.stencilBuffer,J),St=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=ce(b);yt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,X,b.width,b.height):F?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,X,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,X,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,C)}else{let q=b.textures;for(let J=0;J<q.length;J++){let X=q[J],St=r.convert(X.format,X.colorSpace),st=r.convert(X.type),vt=M(X.internalFormat,St,st,X.colorSpace),Mt=ce(b);F&&yt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,vt,b.width,b.height):yt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,vt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,vt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Tt(C,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=n.get(b.depthTexture);q.__renderTarget=b,(!q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);let J=q.__webglTexture,X=ce(b);if(b.depthTexture.format===ir)yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(b.depthTexture.format===mr)yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Yt(C){let b=n.get(C),F=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let q=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),q){let J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=q}if(C.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");let q=C.texture.mipmaps;q&&q.length>0?Tt(b.__webglFramebuffer[0],C):Tt(b.__webglFramebuffer,C)}else if(F){b.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[q]),b.__webglDepthbuffer[q]===void 0)b.__webglDepthbuffer[q]=i.createRenderbuffer(),Lt(b.__webglDepthbuffer[q],C,!1);else{let J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=b.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}else{let q=C.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Lt(b.__webglDepthbuffer,C,!1);else{let J=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(C,b,F){let q=n.get(C);b!==void 0&&pt(q.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),F!==void 0&&Yt(C)}function P(C){let b=C.texture,F=n.get(C),q=n.get(b);C.addEventListener("dispose",A);let J=C.textures,X=C.isWebGLCubeRenderTarget===!0,St=J.length>1;if(St||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=b.version,a.memory.textures++),X){F.__webglFramebuffer=[];for(let st=0;st<6;st++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[st]=[];for(let vt=0;vt<b.mipmaps.length;vt++)F.__webglFramebuffer[st][vt]=i.createFramebuffer()}else F.__webglFramebuffer[st]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let st=0;st<b.mipmaps.length;st++)F.__webglFramebuffer[st]=i.createFramebuffer()}else F.__webglFramebuffer=i.createFramebuffer();if(St)for(let st=0,vt=J.length;st<vt;st++){let Mt=n.get(J[st]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=i.createTexture(),a.memory.textures++)}if(C.samples>0&&yt(C)===!1){F.__webglMultisampledFramebuffer=i.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let st=0;st<J.length;st++){let vt=J[st];F.__webglColorRenderbuffer[st]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,F.__webglColorRenderbuffer[st]);let Mt=r.convert(vt.format,vt.colorSpace),et=r.convert(vt.type),ut=M(vt.internalFormat,Mt,et,vt.colorSpace,C.isXRRenderTarget===!0),Ct=ce(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,ut,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,F.__webglColorRenderbuffer[st])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(F.__webglDepthRenderbuffer=i.createRenderbuffer(),Lt(F.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Dt(i.TEXTURE_CUBE_MAP,b);for(let st=0;st<6;st++)if(b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)pt(F.__webglFramebuffer[st][vt],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,vt);else pt(F.__webglFramebuffer[st],C,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);m(b)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let st=0,vt=J.length;st<vt;st++){let Mt=J[st],et=n.get(Mt),ut=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,et.__webglTexture),Dt(ut,Mt),pt(F.__webglFramebuffer,C,Mt,i.COLOR_ATTACHMENT0+st,ut,0),m(Mt)&&f(ut)}e.unbindTexture()}else{let st=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(st=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,q.__webglTexture),Dt(st,b),b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)pt(F.__webglFramebuffer[vt],C,b,i.COLOR_ATTACHMENT0,st,vt);else pt(F.__webglFramebuffer,C,b,i.COLOR_ATTACHMENT0,st,0);m(b)&&f(st),e.unbindTexture()}C.depthBuffer&&Yt(C)}function le(C){let b=C.textures;for(let F=0,q=b.length;F<q;F++){let J=b[F];if(m(J)){let X=y(C),St=n.get(J).__webglTexture;e.bindTexture(X,St),f(X),e.unbindTexture()}}}let Ut=[],Rt=[];function xt(C){if(C.samples>0){if(yt(C)===!1){let b=C.textures,F=C.width,q=C.height,J=i.COLOR_BUFFER_BIT,X=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(C),st=b.length>1;if(st)for(let Mt=0;Mt<b.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let vt=C.texture.mipmaps;vt&&vt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Mt=0;Mt<b.length;Mt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),st){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[Mt]);let et=n.get(b[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,et,0)}i.blitFramebuffer(0,0,F,q,0,0,F,q,J,i.NEAREST),c===!0&&(Ut.length=0,Rt.length=0,Ut.push(i.COLOR_ATTACHMENT0+Mt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ut.push(X),Rt.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),st)for(let Mt=0;Mt<b.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,St.__webglColorRenderbuffer[Mt]);let et=n.get(b[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){let b=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ce(C){return Math.min(s.maxSamples,C.samples)}function yt(C){let b=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Bt(C){let b=a.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function Ie(C,b){let F=C.colorSpace,q=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||F!==ms&&F!==Ti&&(Zt.getTransfer(F)===Qt?(q!==An||J!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function Me(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=H,this.setTexture3D=$,this.setTextureCube=z,this.rebindTextures=Oe,this.setupRenderTarget=P,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=yt}function TM(i,t){function e(n,s=Ti){let r,a=Zt.getTransfer(s);if(n===Gn)return i.UNSIGNED_BYTE;if(n===sl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===uh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===lh)return i.BYTE;if(n===ch)return i.SHORT;if(n===dr)return i.UNSIGNED_SHORT;if(n===il)return i.INT;if(n===qi)return i.UNSIGNED_INT;if(n===jn)return i.FLOAT;if(n===fr)return i.HALF_FLOAT;if(n===dh)return i.ALPHA;if(n===fh)return i.RGB;if(n===An)return i.RGBA;if(n===ir)return i.DEPTH_COMPONENT;if(n===mr)return i.DEPTH_STENCIL;if(n===ph)return i.RED;if(n===al)return i.RED_INTEGER;if(n===mh)return i.RG;if(n===ol)return i.RG_INTEGER;if(n===ll)return i.RGBA_INTEGER;if(n===ya||n===va||n===Ma||n===ba)if(a===Qt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ya)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cl||n===hl||n===ul||n===dl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===cl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===hl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===dl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fl||n===pl||n===ml)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fl||n===pl)return a===Qt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ml)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===gl||n===_l||n===xl||n===yl||n===vl||n===Ml||n===bl||n===Sl||n===Tl||n===El||n===wl||n===Al||n===Cl||n===Rl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===gl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_l)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===xl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===yl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ml)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===bl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Tl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===El)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rl)return a===Qt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pl||n===Il||n===Dl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Pl)return a===Qt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Dl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ll||n===Nl||n===Ul||n===Ol)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ll)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Nl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ol)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var EM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Bh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new la(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new zn({vertexShader:EM,fragmentShader:wM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new ca(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kh=class extends Zn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,g=null,_=null,p=typeof XRWebGLBinding<"u",m=new Bh,f={},y=e.getContextAttributes(),M=null,x=null,S=[],w=[],A=new It,R=null,v=new tn;v.viewport=new me;let T=new tn;T.viewport=new me;let I=[v,T],O=new Xo,B=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let K=S[Y];return K===void 0&&(K=new lr,S[Y]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Y){let K=S[Y];return K===void 0&&(K=new lr,S[Y]=K),K.getGripSpace()},this.getHand=function(Y){let K=S[Y];return K===void 0&&(K=new lr,S[Y]=K),K.getHandSpace()};function W(Y){let K=w.indexOf(Y.inputSource);if(K===-1)return;let pt=S[K];pt!==void 0&&(pt.update(Y.inputSource,Y.frame,l||a),pt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function H(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",$);for(let Y=0;Y<S.length;Y++){let K=w[Y];K!==null&&(w[Y]=null,S[Y].disconnect(K))}B=null,G=null,m.reset();for(let Y in f)delete f[Y];t.setRenderTarget(M),g=null,d=null,u=null,s=null,x=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return u===null&&p&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",H),s.addEventListener("inputsourceschange",$),y.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(A),p&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Lt=null,Tt=null;y.depth&&(Tt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=y.stencil?mr:ir,Lt=y.stencil?pr:qi);let Yt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Yt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new $n(d.textureWidth,d.textureHeight,{format:An,type:Gn,depthTexture:new oa(d.textureWidth,d.textureHeight,Lt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let pt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),x=new $n(g.framebufferWidth,g.framebufferHeight,{format:An,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),zt.setContext(s),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function $(Y){for(let K=0;K<Y.removed.length;K++){let pt=Y.removed[K],Lt=w.indexOf(pt);Lt>=0&&(w[Lt]=null,S[Lt].disconnect(pt))}for(let K=0;K<Y.added.length;K++){let pt=Y.added[K],Lt=w.indexOf(pt);if(Lt===-1){for(let Yt=0;Yt<S.length;Yt++)if(Yt>=w.length){w.push(pt),Lt=Yt;break}else if(w[Yt]===null){w[Yt]=pt,Lt=Yt;break}if(Lt===-1)break}let Tt=S[Lt];Tt&&Tt.connect(pt)}}let z=new U,rt=new U;function ct(Y,K,pt){z.setFromMatrixPosition(K.matrixWorld),rt.setFromMatrixPosition(pt.matrixWorld);let Lt=z.distanceTo(rt),Tt=K.projectionMatrix.elements,Yt=pt.projectionMatrix.elements,Oe=Tt[14]/(Tt[10]-1),P=Tt[14]/(Tt[10]+1),le=(Tt[9]+1)/Tt[5],Ut=(Tt[9]-1)/Tt[5],Rt=(Tt[8]-1)/Tt[0],xt=(Yt[8]+1)/Yt[0],ce=Oe*Rt,yt=Oe*xt,Bt=Lt/(-Rt+xt),Ie=Bt*-Rt;if(K.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ie),Y.translateZ(Bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Tt[10]===-1)Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{let Me=Oe+Bt,C=P+Bt,b=ce-Ie,F=yt+(Lt-Ie),q=le*P/C*Me,J=Ut*P/C*Me;Y.projectionMatrix.makePerspective(b,F,q,J,Me,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function gt(Y,K){K===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(K.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let K=Y.near,pt=Y.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),O.near=T.near=v.near=K,O.far=T.far=v.far=pt,(B!==O.near||G!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),B=O.near,G=O.far),O.layers.mask=Y.layers.mask|6,v.layers.mask=O.layers.mask&3,T.layers.mask=O.layers.mask&5;let Lt=Y.parent,Tt=O.cameras;gt(O,Lt);for(let Yt=0;Yt<Tt.length;Yt++)gt(Tt[Yt],Lt);Tt.length===2?ct(O,v,T):O.projectionMatrix.copy(v.projectionMatrix),Dt(Y,O,Lt)};function Dt(Y,K,pt){pt===null?Y.matrix.copy(K.matrixWorld):(Y.matrix.copy(pt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(K.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=sr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&g===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(Y){return f[Y]};let jt=null;function qt(Y,K){if(h=K.getViewerPose(l||a),_=K,h!==null){let pt=h.views;g!==null&&(t.setRenderTargetFramebuffer(x,g.framebuffer),t.setRenderTarget(x));let Lt=!1;pt.length!==O.cameras.length&&(O.cameras.length=0,Lt=!0);for(let P=0;P<pt.length;P++){let le=pt[P],Ut=null;if(g!==null)Ut=g.getViewport(le);else{let xt=u.getViewSubImage(d,le);Ut=xt.viewport,P===0&&(t.setRenderTargetTextures(x,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(x))}let Rt=I[P];Rt===void 0&&(Rt=new tn,Rt.layers.enable(P),Rt.viewport=new me,I[P]=Rt),Rt.matrix.fromArray(le.transform.matrix),Rt.matrix.decompose(Rt.position,Rt.quaternion,Rt.scale),Rt.projectionMatrix.fromArray(le.projectionMatrix),Rt.projectionMatrixInverse.copy(Rt.projectionMatrix).invert(),Rt.viewport.set(Ut.x,Ut.y,Ut.width,Ut.height),P===0&&(O.matrix.copy(Rt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Lt===!0&&O.cameras.push(Rt)}let Tt=s.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&p){u=n.getBinding();let P=u.getDepthInformation(pt[0]);P&&P.isValid&&P.texture&&m.init(P,s.renderState)}if(Tt&&Tt.includes("camera-access")&&p){t.state.unbindTexture(),u=n.getBinding();for(let P=0;P<pt.length;P++){let le=pt[P].camera;if(le){let Ut=f[le];Ut||(Ut=new la,f[le]=Ut);let Rt=u.getCameraImage(le);Ut.sourceTexture=Rt}}}}for(let pt=0;pt<S.length;pt++){let Lt=w[pt],Tt=S[pt];Lt!==null&&Tt!==void 0&&Tt.update(Lt,K,l||a)}jt&&jt(Y,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),_=null}let zt=new Kf;zt.setAnimationLoop(qt),this.setAnimationLoop=function(Y){jt=Y},this.dispose=function(){}}},Ss=new Bn,AM=new pe;function CM(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,bh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,M,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&g(m,f,x)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),p(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,y,M):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Je&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Je&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let y=t.get(f),M=y.envMap,x=y.envMapRotation;M&&(m.envMap.value=M,Ss.copy(x),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),m.envMapRotation.value.setFromMatrix4(AM.makeRotationFromEuler(Ss)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=M*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function g(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Je&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function p(m,f){let y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function RM(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,M){let x=M.program;n.uniformBlockBinding(y,x)}function l(y,M){let x=s[y.id];x===void 0&&(_(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",m));let S=M.program;n.updateUBOMapping(y,S);let w=t.render.frame;r[y.id]!==w&&(d(y),r[y.id]=w)}function h(y){let M=u();y.__bindingPointIndex=M;let x=i.createBuffer(),S=y.__size,w=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,S,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let M=s[y.id],x=y.uniforms,S=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,A=x.length;w<A;w++){let R=Array.isArray(x[w])?x[w]:[x[w]];for(let v=0,T=R.length;v<T;v++){let I=R[v];if(g(I,w,v,S)===!0){let O=I.__offset,B=Array.isArray(I.value)?I.value:[I.value],G=0;for(let W=0;W<B.length;W++){let H=B[W],$=p(H);typeof H=="number"||typeof H=="boolean"?(I.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,O+G,I.__data)):H.isMatrix3?(I.__data[0]=H.elements[0],I.__data[1]=H.elements[1],I.__data[2]=H.elements[2],I.__data[3]=0,I.__data[4]=H.elements[3],I.__data[5]=H.elements[4],I.__data[6]=H.elements[5],I.__data[7]=0,I.__data[8]=H.elements[6],I.__data[9]=H.elements[7],I.__data[10]=H.elements[8],I.__data[11]=0):(H.toArray(I.__data,G),G+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(y,M,x,S){let w=y.value,A=M+"_"+x;if(S[A]===void 0)return typeof w=="number"||typeof w=="boolean"?S[A]=w:S[A]=w.clone(),!0;{let R=S[A];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return S[A]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function _(y){let M=y.uniforms,x=0,S=16;for(let A=0,R=M.length;A<R;A++){let v=Array.isArray(M[A])?M[A]:[M[A]];for(let T=0,I=v.length;T<I;T++){let O=v[T],B=Array.isArray(O.value)?O.value:[O.value];for(let G=0,W=B.length;G<W;G++){let H=B[G],$=p(H),z=x%S,rt=z%$.boundary,ct=z+rt;x+=rt,ct!==0&&S-ct<$.storage&&(x+=S-ct),O.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=$.storage}}}let w=x%S;return w>0&&(x+=S-w),y.__size=x,y.__cache={},this}function p(y){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){let M=y.target;M.removeEventListener("dispose",m);let x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(let y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}var Vl=class{constructor(t={}){let{canvas:e=Sf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=new Uint32Array(4),p=new Int32Array(4),m=null,f=null,y=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,S=!1;this._outputColorSpace=ke;let w=0,A=0,R=null,v=-1,T=null,I=new me,O=new me,B=null,G=new Gt(0),W=0,H=e.width,$=e.height,z=1,rt=null,ct=null,gt=new me(0,0,H,$),Dt=new me(0,0,H,$),jt=!1,qt=new cr,zt=!1,Y=!1,K=new pe,pt=new U,Lt=new me,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Yt=!1;function Oe(){return R===null?z:1}let P=n;function le(E,L){return e.getContext(E,L)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",Q,!1),P===null){let L="webgl2";if(P=le(L,E),P===null)throw le(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ut,Rt,xt,ce,yt,Bt,Ie,Me,C,b,F,q,J,X,St,st,vt,Mt,et,ut,Ct,bt,lt,Ft;function D(){Ut=new Yy(P),Ut.init(),bt=new TM(P,Ut),Rt=new zy(P,Ut,t,bt),xt=new bM(P,Ut),Rt.reversedDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),ce=new Jy(P),yt=new cM,Bt=new SM(P,Ut,xt,yt,Rt,bt,ce),Ie=new Hy(x),Me=new qy(x),C=new n0(P),lt=new By(P,C),b=new Zy(P,C,ce,lt),F=new jy(P,b,C,ce),et=new Ky(P,Rt,Bt),st=new Vy(yt),q=new lM(x,Ie,Me,Ut,Rt,lt,st),J=new CM(x,yt),X=new uM,St=new _M(Ut),Mt=new Fy(x,Ie,Me,xt,F,g,c),vt=new vM(x,F,Rt),Ft=new RM(P,ce,Rt,xt),ut=new ky(P,Ut,ce),Ct=new $y(P,Ut,ce),ce.programs=q.programs,x.capabilities=Rt,x.extensions=Ut,x.properties=yt,x.renderLists=X,x.shadowMap=vt,x.state=xt,x.info=ce}D();let nt=new kh(x,P);this.xr=nt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let E=Ut.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Ut.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(E){E!==void 0&&(z=E,this.setSize(H,$,!1))},this.getSize=function(E){return E.set(H,$)},this.setSize=function(E,L,k=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=E,$=L,e.width=Math.floor(E*z),e.height=Math.floor(L*z),k===!0&&(e.style.width=E+"px",e.style.height=L+"px"),this.setViewport(0,0,E,L)},this.getDrawingBufferSize=function(E){return E.set(H*z,$*z).floor()},this.setDrawingBufferSize=function(E,L,k){H=E,$=L,z=k,e.width=Math.floor(E*k),e.height=Math.floor(L*k),this.setViewport(0,0,E,L)},this.getCurrentViewport=function(E){return E.copy(I)},this.getViewport=function(E){return E.copy(gt)},this.setViewport=function(E,L,k,V){E.isVector4?gt.set(E.x,E.y,E.z,E.w):gt.set(E,L,k,V),xt.viewport(I.copy(gt).multiplyScalar(z).round())},this.getScissor=function(E){return E.copy(Dt)},this.setScissor=function(E,L,k,V){E.isVector4?Dt.set(E.x,E.y,E.z,E.w):Dt.set(E,L,k,V),xt.scissor(O.copy(Dt).multiplyScalar(z).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(E){xt.setScissorTest(jt=E)},this.setOpaqueSort=function(E){rt=E},this.setTransparentSort=function(E){ct=E},this.getClearColor=function(E){return E.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(E=!0,L=!0,k=!0){let V=0;if(E){let N=!1;if(R!==null){let tt=R.texture.format;N=tt===ll||tt===ol||tt===al}if(N){let tt=R.texture.type,ht=tt===Gn||tt===qi||tt===dr||tt===pr||tt===sl||tt===rl,mt=Mt.getClearColor(),dt=Mt.getClearAlpha(),At=mt.r,Pt=mt.g,Et=mt.b;ht?(_[0]=At,_[1]=Pt,_[2]=Et,_[3]=dt,P.clearBufferuiv(P.COLOR,0,_)):(p[0]=At,p[1]=Pt,p[2]=Et,p[3]=dt,P.clearBufferiv(P.COLOR,0,p))}else V|=P.COLOR_BUFFER_BIT}L&&(V|=P.DEPTH_BUFFER_BIT),k&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",Q,!1),Mt.dispose(),X.dispose(),St.dispose(),yt.dispose(),Ie.dispose(),Me.dispose(),F.dispose(),lt.dispose(),Ft.dispose(),q.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Yn),nt.removeEventListener("sessionend",nd),as.stop()};function at(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let E=ce.autoReset,L=vt.enabled,k=vt.autoUpdate,V=vt.needsUpdate,N=vt.type;D(),ce.autoReset=E,vt.enabled=L,vt.autoUpdate=k,vt.needsUpdate=V,vt.type=N}function Q(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Z(E){let L=E.target;L.removeEventListener("dispose",Z),_t(L)}function _t(E){Nt(E),yt.remove(E)}function Nt(E){let L=yt.get(E).programs;L!==void 0&&(L.forEach(function(k){q.releaseProgram(k)}),E.isShaderMaterial&&q.releaseShaderCache(E))}this.renderBufferDirect=function(E,L,k,V,N,tt){L===null&&(L=Tt);let ht=N.isMesh&&N.matrixWorld.determinant()<0,mt=$g(E,L,k,V,N);xt.setMaterial(V,ht);let dt=k.index,At=1;if(V.wireframe===!0){if(dt=b.getWireframeAttribute(k),dt===void 0)return;At=2}let Pt=k.drawRange,Et=k.attributes.position,Wt=Pt.start*At,te=(Pt.start+Pt.count)*At;tt!==null&&(Wt=Math.max(Wt,tt.start*At),te=Math.min(te,(tt.start+tt.count)*At)),dt!==null?(Wt=Math.max(Wt,0),te=Math.min(te,dt.count)):Et!=null&&(Wt=Math.max(Wt,0),te=Math.min(te,Et.count));let xe=te-Wt;if(xe<0||xe===1/0)return;lt.setup(N,V,mt,k,dt);let ae,ne=ut;if(dt!==null&&(ae=C.get(dt),ne=Ct,ne.setIndex(ae)),N.isMesh)V.wireframe===!0?(xt.setLineWidth(V.wireframeLinewidth*Oe()),ne.setMode(P.LINES)):ne.setMode(P.TRIANGLES);else if(N.isLine){let wt=V.linewidth;wt===void 0&&(wt=1),xt.setLineWidth(wt*Oe()),N.isLineSegments?ne.setMode(P.LINES):N.isLineLoop?ne.setMode(P.LINE_LOOP):ne.setMode(P.LINE_STRIP)}else N.isPoints?ne.setMode(P.POINTS):N.isSprite&&ne.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)rr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ne.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ut.get("WEBGL_multi_draw"))ne.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{let wt=N._multiDrawStarts,de=N._multiDrawCounts,$t=N._multiDrawCount,dn=dt?C.get(dt).bytesPerElement:1,zs=yt.get(V).currentProgram.getUniforms();for(let fn=0;fn<$t;fn++)zs.setValue(P,"_gl_DrawID",fn),ne.render(wt[fn]/dn,de[fn])}else if(N.isInstancedMesh)ne.renderInstances(Wt,xe,N.count);else if(k.isInstancedBufferGeometry){let wt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,de=Math.min(k.instanceCount,wt);ne.renderInstances(Wt,xe,de)}else ne.render(Wt,xe)};function re(E,L,k){E.transparent===!0&&E.side===Kn&&E.forceSinglePass===!1?(E.side=Je,E.needsUpdate=!0,$a(E,L,k),E.side=xi,E.needsUpdate=!0,$a(E,L,k),E.side=Kn):$a(E,L,k)}this.compile=function(E,L,k=null){k===null&&(k=E),f=St.get(k),f.init(L),M.push(f),k.traverseVisible(function(N){N.isLight&&N.layers.test(L.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),E!==k&&E.traverseVisible(function(N){N.isLight&&N.layers.test(L.layers)&&(f.pushLight(N),N.castShadow&&f.pushShadow(N))}),f.setupLights();let V=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;let tt=N.material;if(tt)if(Array.isArray(tt))for(let ht=0;ht<tt.length;ht++){let mt=tt[ht];re(mt,k,N),V.add(mt)}else re(tt,k,N),V.add(tt)}),f=M.pop(),V},this.compileAsync=function(E,L,k=null){let V=this.compile(E,L,k);return new Promise(N=>{function tt(){if(V.forEach(function(ht){yt.get(ht).currentProgram.isReady()&&V.delete(ht)}),V.size===0){N(E);return}setTimeout(tt,10)}Ut.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let Kt=null;function ci(E){Kt&&Kt(E)}function Yn(){as.stop()}function nd(){as.start()}let as=new Kf;as.setAnimationLoop(ci),typeof self<"u"&&as.setContext(self),this.setAnimationLoop=function(E){Kt=E,nt.setAnimationLoop(E),E===null?as.stop():as.start()},nt.addEventListener("sessionstart",Yn),nt.addEventListener("sessionend",nd),this.render=function(E,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(L),L=nt.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,L,R),f=St.get(E,M.length),f.init(L),M.push(f),K.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),qt.setFromProjectionMatrix(K,On,L.reversedDepth),Y=this.localClippingEnabled,zt=st.init(this.clippingPlanes,Y),m=X.get(E,y.length),m.init(),y.push(m),nt.enabled===!0&&nt.isPresenting===!0){let tt=x.xr.getDepthSensingMesh();tt!==null&&Mc(tt,L,-1/0,x.sortObjects)}Mc(E,L,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(rt,ct),Yt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Yt&&Mt.addToRenderList(m,E),this.info.render.frame++,zt===!0&&st.beginShadows();let k=f.state.shadowsArray;vt.render(k,E,L),zt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let V=m.opaque,N=m.transmissive;if(f.setupLights(),L.isArrayCamera){let tt=L.cameras;if(N.length>0)for(let ht=0,mt=tt.length;ht<mt;ht++){let dt=tt[ht];sd(V,N,E,dt)}Yt&&Mt.render(E);for(let ht=0,mt=tt.length;ht<mt;ht++){let dt=tt[ht];id(m,E,dt,dt.viewport)}}else N.length>0&&sd(V,N,E,L),Yt&&Mt.render(E),id(m,E,L);R!==null&&A===0&&(Bt.updateMultisampleRenderTarget(R),Bt.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(x,E,L),lt.resetDefaultState(),v=-1,T=null,M.pop(),M.length>0?(f=M[M.length-1],zt===!0&&st.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Mc(E,L,k,V){if(E.visible===!1)return;if(E.layers.test(L.layers)){if(E.isGroup)k=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(L);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||qt.intersectsSprite(E)){V&&Lt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(K);let ht=F.update(E),mt=E.material;mt.visible&&m.push(E,ht,mt,k,Lt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||qt.intersectsObject(E))){let ht=F.update(E),mt=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Lt.copy(E.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Lt.copy(ht.boundingSphere.center)),Lt.applyMatrix4(E.matrixWorld).applyMatrix4(K)),Array.isArray(mt)){let dt=ht.groups;for(let At=0,Pt=dt.length;At<Pt;At++){let Et=dt[At],Wt=mt[Et.materialIndex];Wt&&Wt.visible&&m.push(E,ht,Wt,k,Lt.z,Et)}}else mt.visible&&m.push(E,ht,mt,k,Lt.z,null)}}let tt=E.children;for(let ht=0,mt=tt.length;ht<mt;ht++)Mc(tt[ht],L,k,V)}function id(E,L,k,V){let N=E.opaque,tt=E.transmissive,ht=E.transparent;f.setupLightsView(k),zt===!0&&st.setGlobalState(x.clippingPlanes,k),V&&xt.viewport(I.copy(V)),N.length>0&&Za(N,L,k),tt.length>0&&Za(tt,L,k),ht.length>0&&Za(ht,L,k),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function sd(E,L,k,V){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[V.id]===void 0&&(f.state.transmissionRenderTarget[V.id]=new $n(1,1,{generateMipmaps:!0,type:Ut.has("EXT_color_buffer_half_float")||Ut.has("EXT_color_buffer_float")?fr:Gn,minFilter:Xi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));let tt=f.state.transmissionRenderTarget[V.id],ht=V.viewport||I;tt.setSize(ht.z*x.transmissionResolutionScale,ht.w*x.transmissionResolutionScale);let mt=x.getRenderTarget(),dt=x.getActiveCubeFace(),At=x.getActiveMipmapLevel();x.setRenderTarget(tt),x.getClearColor(G),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear(),Yt&&Mt.render(k);let Pt=x.toneMapping;x.toneMapping=Si;let Et=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),f.setupLightsView(V),zt===!0&&st.setGlobalState(x.clippingPlanes,V),Za(E,k,V),Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt),Ut.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let te=0,xe=L.length;te<xe;te++){let ae=L[te],ne=ae.object,wt=ae.geometry,de=ae.material,$t=ae.group;if(de.side===Kn&&ne.layers.test(V.layers)){let dn=de.side;de.side=Je,de.needsUpdate=!0,rd(ne,k,V,wt,de,$t),de.side=dn,de.needsUpdate=!0,Wt=!0}}Wt===!0&&(Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt))}x.setRenderTarget(mt,dt,At),x.setClearColor(G,W),Et!==void 0&&(V.viewport=Et),x.toneMapping=Pt}function Za(E,L,k){let V=L.isScene===!0?L.overrideMaterial:null;for(let N=0,tt=E.length;N<tt;N++){let ht=E[N],mt=ht.object,dt=ht.geometry,At=ht.group,Pt=ht.material;Pt.allowOverride===!0&&V!==null&&(Pt=V),mt.layers.test(k.layers)&&rd(mt,L,k,dt,Pt,At)}}function rd(E,L,k,V,N,tt){E.onBeforeRender(x,L,k,V,N,tt),E.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(x,L,k,V,E,tt),N.transparent===!0&&N.side===Kn&&N.forceSinglePass===!1?(N.side=Je,N.needsUpdate=!0,x.renderBufferDirect(k,L,V,N,E,tt),N.side=xi,N.needsUpdate=!0,x.renderBufferDirect(k,L,V,N,E,tt),N.side=Kn):x.renderBufferDirect(k,L,V,N,E,tt),E.onAfterRender(x,L,k,V,N,tt)}function $a(E,L,k){L.isScene!==!0&&(L=Tt);let V=yt.get(E),N=f.state.lights,tt=f.state.shadowsArray,ht=N.state.version,mt=q.getParameters(E,N.state,tt,L,k),dt=q.getProgramCacheKey(mt),At=V.programs;V.environment=E.isMeshStandardMaterial?L.environment:null,V.fog=L.fog,V.envMap=(E.isMeshStandardMaterial?Me:Ie).get(E.envMap||V.environment),V.envMapRotation=V.environment!==null&&E.envMap===null?L.environmentRotation:E.envMapRotation,At===void 0&&(E.addEventListener("dispose",Z),At=new Map,V.programs=At);let Pt=At.get(dt);if(Pt!==void 0){if(V.currentProgram===Pt&&V.lightsStateVersion===ht)return od(E,mt),Pt}else mt.uniforms=q.getUniforms(E),E.onBeforeCompile(mt,x),Pt=q.acquireProgram(mt,dt),At.set(dt,Pt),V.uniforms=mt.uniforms;let Et=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Et.clippingPlanes=st.uniform),od(E,mt),V.needsLights=Kg(E),V.lightsStateVersion=ht,V.needsLights&&(Et.ambientLightColor.value=N.state.ambient,Et.lightProbe.value=N.state.probe,Et.directionalLights.value=N.state.directional,Et.directionalLightShadows.value=N.state.directionalShadow,Et.spotLights.value=N.state.spot,Et.spotLightShadows.value=N.state.spotShadow,Et.rectAreaLights.value=N.state.rectArea,Et.ltc_1.value=N.state.rectAreaLTC1,Et.ltc_2.value=N.state.rectAreaLTC2,Et.pointLights.value=N.state.point,Et.pointLightShadows.value=N.state.pointShadow,Et.hemisphereLights.value=N.state.hemi,Et.directionalShadowMap.value=N.state.directionalShadowMap,Et.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Et.spotShadowMap.value=N.state.spotShadowMap,Et.spotLightMatrix.value=N.state.spotLightMatrix,Et.spotLightMap.value=N.state.spotLightMap,Et.pointShadowMap.value=N.state.pointShadowMap,Et.pointShadowMatrix.value=N.state.pointShadowMatrix),V.currentProgram=Pt,V.uniformsList=null,Pt}function ad(E){if(E.uniformsList===null){let L=E.currentProgram.getUniforms();E.uniformsList=yr.seqWithValue(L.seq,E.uniforms)}return E.uniformsList}function od(E,L){let k=yt.get(E);k.outputColorSpace=L.outputColorSpace,k.batching=L.batching,k.batchingColor=L.batchingColor,k.instancing=L.instancing,k.instancingColor=L.instancingColor,k.instancingMorph=L.instancingMorph,k.skinning=L.skinning,k.morphTargets=L.morphTargets,k.morphNormals=L.morphNormals,k.morphColors=L.morphColors,k.morphTargetsCount=L.morphTargetsCount,k.numClippingPlanes=L.numClippingPlanes,k.numIntersection=L.numClipIntersection,k.vertexAlphas=L.vertexAlphas,k.vertexTangents=L.vertexTangents,k.toneMapping=L.toneMapping}function $g(E,L,k,V,N){L.isScene!==!0&&(L=Tt),Bt.resetTextureUnits();let tt=L.fog,ht=V.isMeshStandardMaterial?L.environment:null,mt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ms,dt=(V.isMeshStandardMaterial?Me:Ie).get(V.envMap||ht),At=V.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Pt=!!k.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Et=!!k.morphAttributes.position,Wt=!!k.morphAttributes.normal,te=!!k.morphAttributes.color,xe=Si;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(xe=x.toneMapping);let ae=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ne=ae!==void 0?ae.length:0,wt=yt.get(V),de=f.state.lights;if(zt===!0&&(Y===!0||E!==T)){let qe=E===T&&V.id===v;st.setState(V,E,qe)}let $t=!1;V.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==de.state.version||wt.outputColorSpace!==mt||N.isBatchedMesh&&wt.batching===!1||!N.isBatchedMesh&&wt.batching===!0||N.isBatchedMesh&&wt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&wt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&wt.instancing===!1||!N.isInstancedMesh&&wt.instancing===!0||N.isSkinnedMesh&&wt.skinning===!1||!N.isSkinnedMesh&&wt.skinning===!0||N.isInstancedMesh&&wt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&wt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&wt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&wt.instancingMorph===!1&&N.morphTexture!==null||wt.envMap!==dt||V.fog===!0&&wt.fog!==tt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==st.numPlanes||wt.numIntersection!==st.numIntersection)||wt.vertexAlphas!==At||wt.vertexTangents!==Pt||wt.morphTargets!==Et||wt.morphNormals!==Wt||wt.morphColors!==te||wt.toneMapping!==xe||wt.morphTargetsCount!==ne)&&($t=!0):($t=!0,wt.__version=V.version);let dn=wt.currentProgram;$t===!0&&(dn=$a(V,L,N));let zs=!1,fn=!1,Gr=!1,fe=dn.getUniforms(),bn=wt.uniforms;if(xt.useProgram(dn.program)&&(zs=!0,fn=!0,Gr=!0),V.id!==v&&(v=V.id,fn=!0),zs||T!==E){xt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),fe.setValue(P,"projectionMatrix",E.projectionMatrix),fe.setValue(P,"viewMatrix",E.matrixWorldInverse);let Qe=fe.map.cameraPosition;Qe!==void 0&&Qe.setValue(P,pt.setFromMatrixPosition(E.matrixWorld)),Rt.logarithmicDepthBuffer&&fe.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&fe.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),T!==E&&(T=E,fn=!0,Gr=!0)}if(N.isSkinnedMesh){fe.setOptional(P,N,"bindMatrix"),fe.setOptional(P,N,"bindMatrixInverse");let qe=N.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),fe.setValue(P,"boneTexture",qe.boneTexture,Bt))}N.isBatchedMesh&&(fe.setOptional(P,N,"batchingTexture"),fe.setValue(P,"batchingTexture",N._matricesTexture,Bt),fe.setOptional(P,N,"batchingIdTexture"),fe.setValue(P,"batchingIdTexture",N._indirectTexture,Bt),fe.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&fe.setValue(P,"batchingColorTexture",N._colorsTexture,Bt));let Sn=k.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&et.update(N,k,dn),(fn||wt.receiveShadow!==N.receiveShadow)&&(wt.receiveShadow=N.receiveShadow,fe.setValue(P,"receiveShadow",N.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(bn.envMap.value=dt,bn.flipEnvMap.value=dt.isCubeTexture&&dt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&L.environment!==null&&(bn.envMapIntensity.value=L.environmentIntensity),fn&&(fe.setValue(P,"toneMappingExposure",x.toneMappingExposure),wt.needsLights&&Jg(bn,Gr),tt&&V.fog===!0&&J.refreshFogUniforms(bn,tt),J.refreshMaterialUniforms(bn,V,z,$,f.state.transmissionRenderTarget[E.id]),yr.upload(P,ad(wt),bn,Bt)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(yr.upload(P,ad(wt),bn,Bt),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&fe.setValue(P,"center",N.center),fe.setValue(P,"modelViewMatrix",N.modelViewMatrix),fe.setValue(P,"normalMatrix",N.normalMatrix),fe.setValue(P,"modelMatrix",N.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){let qe=V.uniformsGroups;for(let Qe=0,bc=qe.length;Qe<bc;Qe++){let os=qe[Qe];Ft.update(os,dn),Ft.bind(os,dn)}}return dn}function Jg(E,L){E.ambientLightColor.needsUpdate=L,E.lightProbe.needsUpdate=L,E.directionalLights.needsUpdate=L,E.directionalLightShadows.needsUpdate=L,E.pointLights.needsUpdate=L,E.pointLightShadows.needsUpdate=L,E.spotLights.needsUpdate=L,E.spotLightShadows.needsUpdate=L,E.rectAreaLights.needsUpdate=L,E.hemisphereLights.needsUpdate=L}function Kg(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,L,k){let V=yt.get(E);V.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),yt.get(E.texture).__webglTexture=L,yt.get(E.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:k,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,L){let k=yt.get(E);k.__webglFramebuffer=L,k.__useDefaultFramebuffer=L===void 0};let jg=P.createFramebuffer();this.setRenderTarget=function(E,L=0,k=0){R=E,w=L,A=k;let V=!0,N=null,tt=!1,ht=!1;if(E){let dt=yt.get(E);if(dt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),V=!1;else if(dt.__webglFramebuffer===void 0)Bt.setupRenderTarget(E);else if(dt.__hasExternalTextures)Bt.rebindTextures(E,yt.get(E.texture).__webglTexture,yt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Et=E.depthTexture;if(dt.__boundDepthTexture!==Et){if(Et!==null&&yt.has(Et)&&(E.width!==Et.image.width||E.height!==Et.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(E)}}let At=E.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(ht=!0);let Pt=yt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pt[L])?N=Pt[L][k]:N=Pt[L],tt=!0):E.samples>0&&Bt.useMultisampledRTT(E)===!1?N=yt.get(E).__webglMultisampledFramebuffer:Array.isArray(Pt)?N=Pt[k]:N=Pt,I.copy(E.viewport),O.copy(E.scissor),B=E.scissorTest}else I.copy(gt).multiplyScalar(z).floor(),O.copy(Dt).multiplyScalar(z).floor(),B=jt;if(k!==0&&(N=jg),xt.bindFramebuffer(P.FRAMEBUFFER,N)&&V&&xt.drawBuffers(E,N),xt.viewport(I),xt.scissor(O),xt.setScissorTest(B),tt){let dt=yt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+L,dt.__webglTexture,k)}else if(ht){let dt=L;for(let At=0;At<E.textures.length;At++){let Pt=yt.get(E.textures[At]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+At,Pt.__webglTexture,k,dt)}}else if(E!==null&&k!==0){let dt=yt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,dt.__webglTexture,k)}v=-1},this.readRenderTargetPixels=function(E,L,k,V,N,tt,ht,mt=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let dt=yt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt){xt.bindFramebuffer(P.FRAMEBUFFER,dt);try{let At=E.textures[mt],Pt=At.format,Et=At.type;if(!Rt.textureFormatReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Rt.textureTypeReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=E.width-V&&k>=0&&k<=E.height-N&&(E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+mt),P.readPixels(L,k,V,N,bt.convert(Pt),bt.convert(Et),tt))}finally{let At=R!==null?yt.get(R).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(E,L,k,V,N,tt,ht,mt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let dt=yt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(dt=dt[ht]),dt)if(L>=0&&L<=E.width-V&&k>=0&&k<=E.height-N){xt.bindFramebuffer(P.FRAMEBUFFER,dt);let At=E.textures[mt],Pt=At.format,Et=At.type;if(!Rt.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Rt.textureTypeReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Wt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Wt),P.bufferData(P.PIXEL_PACK_BUFFER,tt.byteLength,P.STREAM_READ),E.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+mt),P.readPixels(L,k,V,N,bt.convert(Pt),bt.convert(Et),0);let te=R!==null?yt.get(R).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,te);let xe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Tf(P,xe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Wt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,tt),P.deleteBuffer(Wt),P.deleteSync(xe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,L=null,k=0){let V=Math.pow(2,-k),N=Math.floor(E.image.width*V),tt=Math.floor(E.image.height*V),ht=L!==null?L.x:0,mt=L!==null?L.y:0;Bt.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,ht,mt,N,tt),xt.unbindTexture()};let Qg=P.createFramebuffer(),t_=P.createFramebuffer();this.copyTextureToTexture=function(E,L,k=null,V=null,N=0,tt=null){tt===null&&(N!==0?(rr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=N,N=0):tt=0);let ht,mt,dt,At,Pt,Et,Wt,te,xe,ae=E.isCompressedTexture?E.mipmaps[tt]:E.image;if(k!==null)ht=k.max.x-k.min.x,mt=k.max.y-k.min.y,dt=k.isBox3?k.max.z-k.min.z:1,At=k.min.x,Pt=k.min.y,Et=k.isBox3?k.min.z:0;else{let Sn=Math.pow(2,-N);ht=Math.floor(ae.width*Sn),mt=Math.floor(ae.height*Sn),E.isDataArrayTexture?dt=ae.depth:E.isData3DTexture?dt=Math.floor(ae.depth*Sn):dt=1,At=0,Pt=0,Et=0}V!==null?(Wt=V.x,te=V.y,xe=V.z):(Wt=0,te=0,xe=0);let ne=bt.convert(L.format),wt=bt.convert(L.type),de;L.isData3DTexture?(Bt.setTexture3D(L,0),de=P.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(Bt.setTexture2DArray(L,0),de=P.TEXTURE_2D_ARRAY):(Bt.setTexture2D(L,0),de=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,L.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,L.unpackAlignment);let $t=P.getParameter(P.UNPACK_ROW_LENGTH),dn=P.getParameter(P.UNPACK_IMAGE_HEIGHT),zs=P.getParameter(P.UNPACK_SKIP_PIXELS),fn=P.getParameter(P.UNPACK_SKIP_ROWS),Gr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ae.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ae.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,At),P.pixelStorei(P.UNPACK_SKIP_ROWS,Pt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Et);let fe=E.isDataArrayTexture||E.isData3DTexture,bn=L.isDataArrayTexture||L.isData3DTexture;if(E.isDepthTexture){let Sn=yt.get(E),qe=yt.get(L),Qe=yt.get(Sn.__renderTarget),bc=yt.get(qe.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Qe.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,bc.__webglFramebuffer);for(let os=0;os<dt;os++)fe&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.get(E).__webglTexture,N,Et+os),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,yt.get(L).__webglTexture,tt,xe+os)),P.blitFramebuffer(At,Pt,ht,mt,Wt,te,ht,mt,P.DEPTH_BUFFER_BIT,P.NEAREST);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(N!==0||E.isRenderTargetTexture||yt.has(E)){let Sn=yt.get(E),qe=yt.get(L);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Qg),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,t_);for(let Qe=0;Qe<dt;Qe++)fe?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Sn.__webglTexture,N,Et+Qe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Sn.__webglTexture,N),bn?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,qe.__webglTexture,tt,xe+Qe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,qe.__webglTexture,tt),N!==0?P.blitFramebuffer(At,Pt,ht,mt,Wt,te,ht,mt,P.COLOR_BUFFER_BIT,P.NEAREST):bn?P.copyTexSubImage3D(de,tt,Wt,te,xe+Qe,At,Pt,ht,mt):P.copyTexSubImage2D(de,tt,Wt,te,At,Pt,ht,mt);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else bn?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(de,tt,Wt,te,xe,ht,mt,dt,ne,wt,ae.data):L.isCompressedArrayTexture?P.compressedTexSubImage3D(de,tt,Wt,te,xe,ht,mt,dt,ne,ae.data):P.texSubImage3D(de,tt,Wt,te,xe,ht,mt,dt,ne,wt,ae):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,tt,Wt,te,ht,mt,ne,wt,ae.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,tt,Wt,te,ae.width,ae.height,ne,ae.data):P.texSubImage2D(P.TEXTURE_2D,tt,Wt,te,ht,mt,ne,wt,ae);P.pixelStorei(P.UNPACK_ROW_LENGTH,$t),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dn),P.pixelStorei(P.UNPACK_SKIP_PIXELS,zs),P.pixelStorei(P.UNPACK_SKIP_ROWS,fn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Gr),tt===0&&L.generateMipmaps&&P.generateMipmap(de),xt.unbindTexture()},this.initRenderTarget=function(E){yt.get(E).__webglFramebuffer===void 0&&Bt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Bt.setTextureCube(E,0):E.isData3DTexture?Bt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Bt.setTexture2DArray(E,0):Bt.setTexture2D(E,0),xt.unbindTexture()},this.resetState=function(){w=0,A=0,R=null,xt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}};var np={type:"change"},Hh={type:"start"},sp={type:"end"},Gl=new zi,ip=new En,IM=Math.cos(70*vh.DEG2RAD),Re=new U,nn=2*Math.PI,ee={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Vh=1e-6,Wl=class extends ga{constructor(t,e=null){super(t,e),this.state=ee.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Vn.ROTATE,MIDDLE:Vn.DOLLY,RIGHT:Vn.PAN},this.touches={ONE:Hn.ROTATE,TWO:Hn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new wn,this._lastTargetPosition=new U,this._quat=new wn().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ur,this._sphericalDelta=new ur,this._scale=1,this._panOffset=new U,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new U,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=LM.bind(this),this._onPointerDown=DM.bind(this),this._onPointerUp=NM.bind(this),this._onContextMenu=VM.bind(this),this._onMouseWheel=FM.bind(this),this._onKeyDown=BM.bind(this),this._onTouchStart=kM.bind(this),this._onTouchMove=zM.bind(this),this._onMouseDown=UM.bind(this),this._onMouseMove=OM.bind(this),this._interceptControlDown=HM.bind(this),this._interceptControlUp=GM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(np),this.update(),this.state=ee.NONE}update(t=null){let e=this.object.position;Re.copy(e).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===ee.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=nn:n>Math.PI&&(n-=nn),s<-Math.PI?s+=nn:s>Math.PI&&(s-=nn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),e.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Re.length();a=this._clampDistance(o*this._scale);let c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let o=new U(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new U(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Gl.origin.copy(this.object.position),Gl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Gl.direction))<IM?this.object.lookAt(this.target):(ip.setFromNormalAndCoplanarPoint(this.object.up,this.target),Gl.intersectPlane(ip,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Vh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Vh||this._lastTargetPosition.distanceToSquared(this.target)>Vh?(this.dispatchEvent(np),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?nn/60*this.autoRotateSpeed*t:nn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Re.setFromMatrixColumn(e,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,e){this.screenSpacePanning===!0?Re.setFromMatrixColumn(e,1):(Re.setFromMatrixColumn(e,0),Re.crossVectors(this.object.up,Re)),Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Re.copy(s).sub(this.target);let r=Re.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/e.clientHeight),this._rotateUp(nn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function DM(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function LM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function NM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(sp),this.state=ee.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function UM(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Vn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ee.DOLLY;break;case Vn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ee.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ee.ROTATE}break;case Vn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ee.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ee.PAN}break;default:this.state=ee.NONE}this.state!==ee.NONE&&this.dispatchEvent(Hh)}function OM(i){switch(this.state){case ee.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ee.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ee.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function FM(i){this.enabled===!1||this.enableZoom===!1||this.state!==ee.NONE||(i.preventDefault(),this.dispatchEvent(Hh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(sp))}function BM(i){this.enabled!==!1&&this._handleKeyDown(i)}function kM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Hn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ee.TOUCH_ROTATE;break;case Hn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ee.TOUCH_PAN;break;default:this.state=ee.NONE}break;case 2:switch(this.touches.TWO){case Hn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ee.TOUCH_DOLLY_PAN;break;case Hn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ee.TOUCH_DOLLY_ROTATE;break;default:this.state=ee.NONE}break;default:this.state=ee.NONE}this.state!==ee.NONE&&this.dispatchEvent(Hh)}function zM(i){switch(this._trackPointer(i),this.state){case ee.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ee.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ee.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ee.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ee.NONE}}function VM(i){this.enabled!==!1&&i.preventDefault()}function HM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function GM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function WM(i){var t=0,e=i.children,n=e&&e.length;if(!n)t=1;else for(;--n>=0;)t+=e[n].value;i.value=t}function rp(){return this.eachAfter(WM)}function ap(i,t){let e=-1;for(let n of this)i.call(t,n,++e,this);return this}function op(i,t){for(var e=this,n=[e],s,r,a=-1;e=n.pop();)if(i.call(t,e,++a,this),s=e.children)for(r=s.length-1;r>=0;--r)n.push(s[r]);return this}function lp(i,t){for(var e=this,n=[e],s=[],r,a,o,c=-1;e=n.pop();)if(s.push(e),r=e.children)for(a=0,o=r.length;a<o;++a)n.push(r[a]);for(;e=s.pop();)i.call(t,e,++c,this);return this}function cp(i,t){let e=-1;for(let n of this)if(i.call(t,n,++e,this))return n}function hp(i){return this.eachAfter(function(t){for(var e=+i(t.data)||0,n=t.children,s=n&&n.length;--s>=0;)e+=n[s].value;t.value=e})}function up(i){return this.eachBefore(function(t){t.children&&t.children.sort(i)})}function dp(i){for(var t=this,e=XM(t,i),n=[t];t!==e;)t=t.parent,n.push(t);for(var s=n.length;i!==e;)n.splice(s,0,i),i=i.parent;return n}function XM(i,t){if(i===t)return i;var e=i.ancestors(),n=t.ancestors(),s=null;for(i=e.pop(),t=n.pop();i===t;)s=i,i=e.pop(),t=n.pop();return s}function fp(){for(var i=this,t=[i];i=i.parent;)t.push(i);return t}function pp(){return Array.from(this)}function mp(){var i=[];return this.eachBefore(function(t){t.children||i.push(t)}),i}function gp(){var i=this,t=[];return i.each(function(e){e!==i&&t.push({source:e.parent,target:e})}),t}function*_p(){var i=this,t,e=[i],n,s,r;do for(t=e.reverse(),e=[];i=t.pop();)if(yield i,n=i.children)for(s=0,r=n.length;s<r;++s)e.push(n[s]);while(e.length)}function Mr(i,t){i instanceof Map?(i=[void 0,i],t===void 0&&(t=ZM)):t===void 0&&(t=YM);for(var e=new Ta(i),n,s=[e],r,a,o,c;n=s.pop();)if((a=t(n.data))&&(c=(a=Array.from(a)).length))for(n.children=a,o=c-1;o>=0;--o)s.push(r=a[o]=new Ta(a[o])),r.parent=n,r.depth=n.depth+1;return e.eachBefore(JM)}function qM(){return Mr(this).eachBefore($M)}function YM(i){return i.children}function ZM(i){return Array.isArray(i)?i[1]:null}function $M(i){i.data.value!==void 0&&(i.value=i.data.value),i.data=i.data.data}function JM(i){var t=0;do i.height=t;while((i=i.parent)&&i.height<++t)}function Ta(i){this.data=i,this.depth=this.height=0,this.parent=null}Ta.prototype=Mr.prototype={constructor:Ta,count:rp,each:ap,eachAfter:lp,eachBefore:op,find:cp,sum:hp,sort:up,path:dp,ancestors:fp,descendants:pp,leaves:mp,links:gp,copy:qM,[Symbol.iterator]:_p};function xp(i){if(typeof i!="function")throw new Error;return i}function br(){return 0}function Sr(i){return function(){return i}}function yp(i){i.x0=Math.round(i.x0),i.y0=Math.round(i.y0),i.x1=Math.round(i.x1),i.y1=Math.round(i.y1)}function vp(i,t,e,n,s){for(var r=i.children,a,o=-1,c=r.length,l=i.value&&(n-t)/i.value;++o<c;)a=r[o],a.y0=e,a.y1=s,a.x0=t,a.x1=t+=a.value*l}function Mp(i,t,e,n,s){for(var r=i.children,a,o=-1,c=r.length,l=i.value&&(s-e)/i.value;++o<c;)a=r[o],a.x0=t,a.x1=n,a.y0=e,a.y1=e+=a.value*l}var KM=(1+Math.sqrt(5))/2;function jM(i,t,e,n,s,r){for(var a=[],o=t.children,c,l,h=0,u=0,d=o.length,g,_,p=t.value,m,f,y,M,x,S,w;h<d;){g=s-e,_=r-n;do m=o[u++].value;while(!m&&u<d);for(f=y=m,S=Math.max(_/g,g/_)/(p*i),w=m*m*S,x=Math.max(y/w,w/f);u<d;++u){if(m+=l=o[u].value,l<f&&(f=l),l>y&&(y=l),w=m*m*S,M=Math.max(y/w,w/f),M>x){m-=l;break}x=M}a.push(c={value:m,dice:g<_,children:o.slice(h,u)}),c.dice?vp(c,e,n,s,p?n+=_*m/p:r):Mp(c,e,n,p?e+=g*m/p:s,r),p-=m,h=u}return a}var Ea=(function i(t){function e(n,s,r,a,o){jM(t,n,s,r,a,o)}return e.ratio=function(n){return i((n=+n)>1?n:1)},e})(KM);function Gh(){var i=Ea,t=!1,e=1,n=1,s=[0],r=br,a=br,o=br,c=br,l=br;function h(d){return d.x0=d.y0=0,d.x1=e,d.y1=n,d.eachBefore(u),s=[0],t&&d.eachBefore(yp),d}function u(d){var g=s[d.depth],_=d.x0+g,p=d.y0+g,m=d.x1-g,f=d.y1-g;m<_&&(_=m=(_+m)/2),f<p&&(p=f=(p+f)/2),d.x0=_,d.y0=p,d.x1=m,d.y1=f,d.children&&(g=s[d.depth+1]=r(d)/2,_+=l(d)-g,p+=a(d)-g,m-=o(d)-g,f-=c(d)-g,m<_&&(_=m=(_+m)/2),f<p&&(p=f=(p+f)/2),i(d,_,p,m,f))}return h.round=function(d){return arguments.length?(t=!!d,h):t},h.size=function(d){return arguments.length?(e=+d[0],n=+d[1],h):[e,n]},h.tile=function(d){return arguments.length?(i=xp(d),h):i},h.padding=function(d){return arguments.length?h.paddingInner(d).paddingOuter(d):h.paddingInner()},h.paddingInner=function(d){return arguments.length?(r=typeof d=="function"?d:Sr(+d),h):r},h.paddingOuter=function(d){return arguments.length?h.paddingTop(d).paddingRight(d).paddingBottom(d).paddingLeft(d):h.paddingTop()},h.paddingTop=function(d){return arguments.length?(a=typeof d=="function"?d:Sr(+d),h):a},h.paddingRight=function(d){return arguments.length?(o=typeof d=="function"?d:Sr(+d),h):o},h.paddingBottom=function(d){return arguments.length?(c=typeof d=="function"?d:Sr(+d),h):c},h.paddingLeft=function(d){return arguments.length?(l=typeof d=="function"?d:Sr(+d),h):l},h}function Ei(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function Rp(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}var on={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Er={duration:.5,overwrite:!1,delay:0},lu,Ne,ue,Rn=1e8,se=1/Rn,Kh=Math.PI*2,QM=Kh/4,tb=0,Pp=Math.sqrt,eb=Math.cos,nb=Math.sin,Pe=function(t){return typeof t=="string"},ye=function(t){return typeof t=="function"},Ai=function(t){return typeof t=="number"},tc=function(t){return typeof t>"u"},ni=function(t){return typeof t=="object"},an=function(t){return t!==!1},cu=function(){return typeof window<"u"},Xl=function(t){return ye(t)||Pe(t)},Ip=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ge=Array.isArray,jh=/(?:-?\.?\d|\.)+/gi,hu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Rs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Wh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,uu=/[+-]=-?[.\d]+/,Dp=/[^,'"\[\]\s]+/gi,ib=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ge,ti,Qh,du,vn={},$l={},Lp,Np=function(t){return($l=wr(t,vn))&&We},ec=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Ia=function(t,e){return!e&&console.warn(t)},Up=function(t,e){return t&&(vn[t]=e)&&$l&&($l[t]=e)||vn},Da=function(){return 0},sb={suppressEvents:!0,isStart:!0,kill:!1},ql={suppressEvents:!0,kill:!1},rb={suppressEvents:!0},fu={},Zi=[],tu={},Op,sn={},Xh={},bp=30,Yl=[],pu="",mu=function(t){var e=t[0],n,s;if(ni(e)||ye(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(s=Yl.length;s--&&!Yl[s].targetTest(e););n=Yl[s]}for(s=t.length;s--;)t[s]&&(t[s]._gsap||(t[s]._gsap=new yu(t[s],n)))||t.splice(s,1);return t},$i=function(t){return t._gsap||mu(Pn(t))[0]._gsap},gu=function(t,e,n){return(n=t[e])&&ye(n)?t[e]():tc(n)&&t.getAttribute&&t.getAttribute(e)||n},Ke=function(t,e){return(t=t.split(",")).forEach(e)||t},ve=function(t){return Math.round(t*1e5)/1e5||0},Ee=function(t){return Math.round(t*1e7)/1e7||0},Ps=function(t,e){var n=e.charAt(0),s=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+s:n==="-"?t-s:n==="*"?t*s:t/s},ab=function(t,e){for(var n=e.length,s=0;t.indexOf(e[s])<0&&++s<n;);return s<n},Jl=function(){var t=Zi.length,e=Zi.slice(0),n,s;for(tu={},Zi.length=0,n=0;n<t;n++)s=e[n],s&&s._lazy&&(s.render(s._lazy[0],s._lazy[1],!0)._lazy=0)},_u=function(t){return!!(t._initted||t._startAt||t.add)},Fp=function(t,e,n,s){Zi.length&&!Ne&&Jl(),t.render(e,n,s||!!(Ne&&e<0&&_u(t))),Zi.length&&!Ne&&Jl()},Bp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Dp).length<2?e:Pe(t)?t.trim():t},kp=function(t){return t},Mn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},ob=function(t){return function(e,n){for(var s in n)s in e||s==="duration"&&t||s==="ease"||(e[s]=n[s])}},wr=function(t,e){for(var n in e)t[n]=e[n];return t},Sp=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=ni(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},Kl=function(t,e){var n={},s;for(s in t)s in e||(n[s]=t[s]);return n},Ca=function(t){var e=t.parent||ge,n=t.keyframes?ob(Ge(t.keyframes)):Mn;if(an(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},lb=function(t,e){for(var n=t.length,s=n===e.length;s&&n--&&t[n]===e[n];);return n<0},zp=function(t,e,n,s,r){n===void 0&&(n="_first"),s===void 0&&(s="_last");var a=t[s],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[s]=e,e._prev=a,e.parent=e._dp=t,e},nc=function(t,e,n,s){n===void 0&&(n="_first"),s===void 0&&(s="_last");var r=e._prev,a=e._next;r?r._next=a:t[n]===e&&(t[n]=a),a?a._prev=r:t[s]===e&&(t[s]=r),e._next=e._prev=e.parent=null},Ji=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},ws=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},cb=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},eu=function(t,e,n,s){return t._startAt&&(Ne?t._startAt.revert(ql):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,s))},hb=function i(t){return!t||t._ts&&i(t.parent)},Tp=function(t){return t._repeat?Ar(t._tTime,t=t.duration()+t._rDelay)*t:0},Ar=function(t,e){var n=Math.floor(t=Ee(t/e));return t&&n===t?n-1:n},jl=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},ic=function(t){return t._end=Ee(t._start+(t._tDur/Math.abs(t._ts||t._rts||se)||0))},sc=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Ee(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),ic(t),n._dirty||ws(n,t)),t},Vp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=jl(t.rawTime(),e),(!e._dur||Ua(0,e.totalDuration(),n)-e._tTime>se)&&e.render(n,!0)),ws(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-se}},ei=function(t,e,n,s){return e.parent&&Ji(e),e._start=Ee((Ai(n)?n:n||t!==ge?Cn(t,n,e):t._time)+e._delay),e._end=Ee(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),zp(t,e,"_first","_last",t._sort?"_start":0),nu(e)||(t._recent=e),s||Vp(t,e),t._ts<0&&sc(t,t._tTime),t},Hp=function(t,e){return(vn.ScrollTrigger||ec("scrollTrigger",e))&&vn.ScrollTrigger.create(e,t)},Gp=function(t,e,n,s,r){if(bu(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!Ne&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Op!==rn.frame)return Zi.push(t),t._lazy=[r,s],1},ub=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},nu=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},db=function(t,e,n,s){var r=t.ratio,a=e<0||!e&&(!t._start&&ub(t)&&!(!t._initted&&nu(t))||(t._ts<0||t._dp._ts<0)&&!nu(t))?0:1,o=t._rDelay,c=0,l,h,u;if(o&&t._repeat&&(c=Ua(0,t._tDur,e),h=Ar(c,o),t._yoyo&&h&1&&(a=1-a),h!==Ar(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||Ne||s||t._zTime===se||!e&&t._zTime){if(!t._initted&&Gp(t,e,s,n,c))return;for(u=t._zTime,t._zTime=e||(n?se:0),n||(n=e&&!u),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=c,l=t._pt;l;)l.r(a,l.d),l=l._next;e<0&&eu(t,e,n,!0),t._onUpdate&&!n&&yn(t,"onUpdate"),c&&t._repeat&&!n&&t.parent&&yn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Ji(t,1),!n&&!Ne&&(yn(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},fb=function(t,e,n){var s;if(n>e)for(s=t._first;s&&s._start<=n;){if(s.data==="isPause"&&s._start>e)return s;s=s._next}else for(s=t._last;s&&s._start>=n;){if(s.data==="isPause"&&s._start<e)return s;s=s._prev}},Cr=function(t,e,n,s){var r=t._repeat,a=Ee(e)||0,o=t._tTime/t._tDur;return o&&!s&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Ee(a*(r+1)+t._rDelay*r):a,o>0&&!s&&sc(t,t._tTime=t._tDur*o),t.parent&&ic(t),n||ws(t.parent,t),t},Ep=function(t){return t instanceof Le?ws(t):Cr(t,t._dur)},pb={_start:0,endTime:Da,totalDuration:Da},Cn=function i(t,e,n){var s=t.labels,r=t._recent||pb,a=t.duration()>=Rn?r.endTime(!1):t._dur,o,c,l;return Pe(e)&&(isNaN(e)||e in s)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?r:n).totalDuration()/100:1)):o<0?(e in s||(s[e]=a),s[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&n&&(c=c/100*(Ge(n)?n[0]:n).totalDuration()),o>1?i(t,e.substr(0,o-1),n)+c:a+c)):e==null?a:+e},Ra=function(t,e,n){var s=Ai(e[1]),r=(s?2:1)+(t<2?0:1),a=e[r],o,c;if(s&&(a.duration=e[1]),a.parent=n,t){for(o=a,c=n;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=an(c.vars.inherit)&&c.parent;a.immediateRender=an(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new Se(e[0],a,e[r+1])},Ki=function(t,e){return t||t===0?e(t):e},Ua=function(t,e,n){return n<t?t:n>e?e:n},Ue=function(t,e){return!Pe(t)||!(e=ib.exec(t))?"":e[1]},mb=function(t,e,n){return Ki(n,function(s){return Ua(t,e,s)})},iu=[].slice,Wp=function(t,e){return t&&ni(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&ni(t[0]))&&!t.nodeType&&t!==ti},gb=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(s){var r;return Pe(s)&&!e||Wp(s,1)?(r=n).push.apply(r,Pn(s)):n.push(s)})||n},Pn=function(t,e,n){return ue&&!e&&ue.selector?ue.selector(t):Pe(t)&&!n&&(Qh||!Rr())?iu.call((e||du).querySelectorAll(t),0):Ge(t)?gb(t,n):Wp(t)?iu.call(t,0):t?[t]:[]},su=function(t){return t=Pn(t)[0]||Ia("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Pn(e,n.querySelectorAll?n:n===t?Ia("Invalid scope")||du.createElement("div"):t)}},Xp=function(t){return t.sort(function(){return .5-Math.random()})},qp=function(t){if(ye(t))return t;var e=ni(t)?t:{each:t},n=As(e.ease),s=e.from||0,r=parseFloat(e.base)||0,a={},o=s>0&&s<1,c=isNaN(s)||o,l=e.axis,h=s,u=s;return Pe(s)?h=u={center:.5,edges:.5,end:1}[s]||0:!o&&c&&(h=s[0],u=s[1]),function(d,g,_){var p=(_||e).length,m=a[p],f,y,M,x,S,w,A,R,v;if(!m){if(v=e.grid==="auto"?0:(e.grid||[1,Rn])[1],!v){for(A=-Rn;A<(A=_[v++].getBoundingClientRect().left)&&v<p;);v<p&&v--}for(m=a[p]=[],f=c?Math.min(v,p)*h-.5:s%v,y=v===Rn?0:c?p*u/v-.5:s/v|0,A=0,R=Rn,w=0;w<p;w++)M=w%v-f,x=y-(w/v|0),m[w]=S=l?Math.abs(l==="y"?x:M):Pp(M*M+x*x),S>A&&(A=S),S<R&&(R=S);s==="random"&&Xp(m),m.max=A-R,m.min=R,m.v=p=(parseFloat(e.amount)||parseFloat(e.each)*(v>p?p-1:l?l==="y"?p/v:v:Math.max(v,p/v))||0)*(s==="edges"?-1:1),m.b=p<0?r-p:r,m.u=Ue(e.amount||e.each)||0,n=n&&p<0?em(n):n}return p=(m[d]-m.min)/m.max||0,Ee(m.b+(n?n(p):p)*m.v)+m.u}},ru=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var s=Ee(Math.round(parseFloat(n)/t)*t*e);return(s-s%1)/e+(Ai(n)?0:Ue(n))}},Yp=function(t,e){var n=Ge(t),s,r;return!n&&ni(t)&&(s=n=t.radius||Rn,t.values?(t=Pn(t.values),(r=!Ai(t[0]))&&(s*=s)):t=ru(t.increment)),Ki(e,n?ye(t)?function(a){return r=t(a),Math.abs(r-a)<=s?r:a}:function(a){for(var o=parseFloat(r?a.x:a),c=parseFloat(r?a.y:0),l=Rn,h=0,u=t.length,d,g;u--;)r?(d=t[u].x-o,g=t[u].y-c,d=d*d+g*g):d=Math.abs(t[u]-o),d<l&&(l=d,h=u);return h=!s||l<=s?t[h]:a,r||h===a||Ai(a)?h:h+Ue(a)}:ru(t))},Zp=function(t,e,n,s){return Ki(Ge(t)?!e:n===!0?!!(n=0):!s,function(){return Ge(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(s=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*s)/s})},_b=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(s){return e.reduce(function(r,a){return a(r)},s)}},xb=function(t,e){return function(n){return t(parseFloat(n))+(e||Ue(n))}},yb=function(t,e,n){return Jp(t,e,0,1,n)},$p=function(t,e,n){return Ki(n,function(s){return t[~~e(s)]})},vb=function i(t,e,n){var s=e-t;return Ge(t)?$p(t,i(0,t.length),e):Ki(n,function(r){return(s+(r-t)%s)%s+t})},Mb=function i(t,e,n){var s=e-t,r=s*2;return Ge(t)?$p(t,i(0,t.length-1),e):Ki(n,function(a){return a=(r+(a-t)%r)%r||0,t+(a>s?r-a:a)})},Pr=function(t){for(var e=0,n="",s,r,a,o;~(s=t.indexOf("random(",e));)a=t.indexOf(")",s),o=t.charAt(s+7)==="[",r=t.substr(s+7,a-s-7).match(o?Dp:jh),n+=t.substr(e,s-e)+Zp(o?r:+r[0],o?0:+r[1],+r[2]||1e-5),e=a+1;return n+t.substr(e,t.length-e)},Jp=function(t,e,n,s,r){var a=e-t,o=s-n;return Ki(r,function(c){return n+((c-t)/a*o||0)})},bb=function i(t,e,n,s){var r=isNaN(t+e)?0:function(g){return(1-g)*t+g*e};if(!r){var a=Pe(t),o={},c,l,h,u,d;if(n===!0&&(s=1)&&(n=null),a)t={p:t},e={p:e};else if(Ge(t)&&!Ge(e)){for(h=[],u=t.length,d=u-2,l=1;l<u;l++)h.push(i(t[l-1],t[l]));u--,r=function(_){_*=u;var p=Math.min(d,~~_);return h[p](_-p)},n=e}else s||(t=wr(Ge(t)?[]:{},t));if(!h){for(c in e)vu.call(o,t,c,"get",e[c]);r=function(_){return Eu(_,o)||(a?t.p:t)}}}return Ki(n,r)},wp=function(t,e,n){var s=t.labels,r=Rn,a,o,c;for(a in s)o=s[a]-e,o<0==!!n&&o&&r>(o=Math.abs(o))&&(c=a,r=o);return c},yn=function(t,e,n){var s=t.vars,r=s[e],a=ue,o=t._ctx,c,l,h;if(r)return c=s[e+"Params"],l=s.callbackScope||t,n&&Zi.length&&Jl(),o&&(ue=o),h=c?r.apply(l,c):r.call(l),ue=a,h},wa=function(t){return Ji(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ne),t.progress()<1&&yn(t,"onInterrupt"),t},Tr,Kp=[],jp=function(t){if(t)if(t=!t.name&&t.default||t,cu()||t.headless){var e=t.name,n=ye(t),s=e&&!n&&t.init?function(){this._props=[]}:t,r={init:Da,render:Eu,add:vu,kill:Bb,modifier:Fb,rawVars:0},a={targetTest:0,get:0,getSetter:rc,aliases:{},register:0};if(Rr(),t!==s){if(sn[e])return;Mn(s,Mn(Kl(t,r),a)),wr(s.prototype,wr(r,Kl(t,a))),sn[s.prop=e]=s,t.targetTest&&(Yl.push(s),fu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}Up(e,s),t.register&&t.register(We,s,je)}else Kp.push(t)},ie=255,Aa={aqua:[0,ie,ie],lime:[0,ie,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ie],navy:[0,0,128],white:[ie,ie,ie],olive:[128,128,0],yellow:[ie,ie,0],orange:[ie,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ie,0,0],pink:[ie,192,203],cyan:[0,ie,ie],transparent:[ie,ie,ie,0]},qh=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*ie+.5|0},Qp=function(t,e,n){var s=t?Ai(t)?[t>>16,t>>8&ie,t&ie]:0:Aa.black,r,a,o,c,l,h,u,d,g,_;if(!s){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Aa[t])s=Aa[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return s=parseInt(t.substr(1,6),16),[s>>16,s>>8&ie,s&ie,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),s=[t>>16,t>>8&ie,t&ie]}else if(t.substr(0,3)==="hsl"){if(s=_=t.match(jh),!e)c=+s[0]%360/360,l=+s[1]/100,h=+s[2]/100,a=h<=.5?h*(l+1):h+l-h*l,r=h*2-a,s.length>3&&(s[3]*=1),s[0]=qh(c+1/3,r,a),s[1]=qh(c,r,a),s[2]=qh(c-1/3,r,a);else if(~t.indexOf("="))return s=t.match(hu),n&&s.length<4&&(s[3]=1),s}else s=t.match(jh)||Aa.transparent;s=s.map(Number)}return e&&!_&&(r=s[0]/ie,a=s[1]/ie,o=s[2]/ie,u=Math.max(r,a,o),d=Math.min(r,a,o),h=(u+d)/2,u===d?c=l=0:(g=u-d,l=h>.5?g/(2-u-d):g/(u+d),c=u===r?(a-o)/g+(a<o?6:0):u===a?(o-r)/g+2:(r-a)/g+4,c*=60),s[0]=~~(c+.5),s[1]=~~(l*100+.5),s[2]=~~(h*100+.5)),n&&s.length<4&&(s[3]=1),s},tm=function(t){var e=[],n=[],s=-1;return t.split(wi).forEach(function(r){var a=r.match(Rs)||[];e.push.apply(e,a),n.push(s+=a.length+1)}),e.c=n,e},Ap=function(t,e,n){var s="",r=(t+s).match(wi),a=e?"hsla(":"rgba(",o=0,c,l,h,u;if(!r)return t;if(r=r.map(function(d){return(d=Qp(d,e,1))&&a+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=tm(t),c=n.c,c.join(s)!==h.c.join(s)))for(l=t.replace(wi,"1").split(Rs),u=l.length-1;o<u;o++)s+=l[o]+(~c.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!l)for(l=t.split(wi),u=l.length-1;o<u;o++)s+=l[o]+r[o];return s+l[u]},wi=(function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Aa)i+="|"+t+"\\b";return new RegExp(i+")","gi")})(),Sb=/hsl[a]?\(/,xu=function(t){var e=t.join(" "),n;if(wi.lastIndex=0,wi.test(e))return n=Sb.test(e),t[1]=Ap(t[1],n),t[0]=Ap(t[0],n,tm(t[1])),!0},La,rn=(function(){var i=Date.now,t=500,e=33,n=i(),s=n,r=1e3/240,a=r,o=[],c,l,h,u,d,g,_=function p(m){var f=i()-s,y=m===!0,M,x,S,w;if((f>t||f<0)&&(n+=f-e),s+=f,S=s-n,M=S-a,(M>0||y)&&(w=++u.frame,d=S-u.time*1e3,u.time=S=S/1e3,a+=M+(M>=r?4:r-M),x=1),y||(c=l(p)),x)for(g=0;g<o.length;g++)o[g](S,d,w,m)};return u={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){Lp&&(!Qh&&cu()&&(ti=Qh=window,du=ti.document||{},vn.gsap=We,(ti.gsapVersions||(ti.gsapVersions=[])).push(We.version),Np($l||ti.GreenSockGlobals||!ti.gsap&&ti||{}),Kp.forEach(jp)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&u.sleep(),l=h||function(m){return setTimeout(m,a-u.time*1e3+1|0)},La=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(c),La=0,l=Da},lagSmoothing:function(m,f){t=m||1/0,e=Math.min(f||33,t)},fps:function(m){r=1e3/(m||240),a=u.time*1e3+r},add:function(m,f,y){var M=f?function(x,S,w,A){m(x,S,w,A),u.remove(M)}:m;return u.remove(m),o[y?"unshift":"push"](M),Rr(),M},remove:function(m,f){~(f=o.indexOf(m))&&o.splice(f,1)&&g>=f&&g--},_listeners:o},u})(),Rr=function(){return!La&&rn.wake()},Xt={},Tb=/^[\d.\-M][\d.\-,\s]/,Eb=/["']/g,wb=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),s=n[0],r=1,a=n.length,o,c,l;r<a;r++)c=n[r],o=r!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[s]=isNaN(l)?l.replace(Eb,"").trim():+l,s=c.substr(o+1).trim();return e},Ab=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),s=t.indexOf("(",e);return t.substring(e,~s&&s<n?t.indexOf(")",n+1):n)},Cb=function(t){var e=(t+"").split("("),n=Xt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[wb(e[1])]:Ab(t).split(",").map(Bp)):Xt._CE&&Tb.test(t)?Xt._CE("",t):n},em=function(t){return function(e){return 1-t(1-e)}},nm=function i(t,e){for(var n=t._first,s;n;)n instanceof Le?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(s=n._ease,n._ease=n._yEase,n._yEase=s,n._yoyo=e)),n=n._next},As=function(t,e){return t&&(ye(t)?t:Xt[t]||Cb(t))||e},Is=function(t,e,n,s){n===void 0&&(n=function(c){return 1-e(1-c)}),s===void 0&&(s=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:s},a;return Ke(t,function(o){Xt[o]=vn[o]=r,Xt[a=o.toLowerCase()]=n;for(var c in r)Xt[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=Xt[o+"."+c]=r[c]}),r},im=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Yh=function i(t,e,n){var s=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),a=r/Kh*(Math.asin(1/s)||0),o=function(h){return h===1?1:s*Math.pow(2,-10*h)*nb((h-a)*r)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:im(o);return r=Kh/r,c.config=function(l,h){return i(t,l,h)},c},Zh=function i(t,e){e===void 0&&(e=1.70158);var n=function(a){return a?--a*a*((e+1)*a+e)+1:0},s=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:im(n);return s.config=function(r){return i(t,r)},s};Ke("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;Is(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});Xt.Linear.easeNone=Xt.none=Xt.Linear.easeIn;Is("Elastic",Yh("in"),Yh("out"),Yh());(function(i,t){var e=1/t,n=2*e,s=2.5*e,r=function(o){return o<e?i*o*o:o<n?i*Math.pow(o-1.5/t,2)+.75:o<s?i*(o-=2.25/t)*o+.9375:i*Math.pow(o-2.625/t,2)+.984375};Is("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Is("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Is("Circ",function(i){return-(Pp(1-i*i)-1)});Is("Sine",function(i){return i===1?1:-eb(i*QM)+1});Is("Back",Zh("in"),Zh("out"),Zh());Xt.SteppedEase=Xt.steps=vn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,s=t+(e?0:1),r=e?1:0,a=1-se;return function(o){return((s*Ua(0,a,o)|0)+r)*n}}};Er.ease=Xt["quad.out"];Ke("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return pu+=i+","+i+"Params,"});var yu=function(t,e){this.id=tb++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:gu,this.set=e?e.getSetter:rc},Na=(function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Cr(this,+e.duration,1,1),this.data=e.data,ue&&(this._ctx=ue,ue.data.push(this)),La||rn.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Cr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,s){if(Rr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(sc(this,n),!r._dp||r.parent||Vp(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&ei(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!s||this._initted&&Math.abs(this._zTime)===se||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Fp(this,n,s)),this},t.time=function(n,s){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Tp(this))%(this._dur+this._rDelay)||(n?this._dur:0),s):this._time},t.totalProgress=function(n,s){return arguments.length?this.totalTime(this.totalDuration()*n,s):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,s){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Tp(this),s):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,s){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,s):this._repeat?Ar(this._tTime,r)+1:1},t.timeScale=function(n,s){if(!arguments.length)return this._rts===-se?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?jl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-se?0:this._rts,this.totalTime(Ua(-Math.abs(this._delay),this.totalDuration(),r),s!==!1),ic(this),cb(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Rr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==se&&(this._tTime-=se)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var s=this.parent||this._dp;return s&&(s._sort||!this.parent)&&ei(s,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(an(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var s=this.parent||this._dp;return s?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?jl(s.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=rb);var s=Ne;return Ne=n,_u(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ne=s,this},t.globalTime=function(n){for(var s=this,r=arguments.length?n:s.rawTime();s;)r=s._start+r/(Math.abs(s._ts)||1),s=s._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Ep(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var s=this._time;return this._rDelay=n,Ep(this),s?this.time(s):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,s){return this.totalTime(Cn(this,n),an(s))},t.restart=function(n,s){return this.play().totalTime(n?-this._delay:0,an(s)),this._dur||(this._zTime=-se),this},t.play=function(n,s){return n!=null&&this.seek(n,s),this.reversed(!1).paused(!1)},t.reverse=function(n,s){return n!=null&&this.seek(n||this.totalDuration(),s),this.reversed(!0).paused(!1)},t.pause=function(n,s){return n!=null&&this.seek(n,s),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-se:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-se,this},t.isActive=function(){var n=this.parent||this._dp,s=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=s&&r<this.endTime(!0)-se)},t.eventCallback=function(n,s,r){var a=this.vars;return arguments.length>1?(s?(a[n]=s,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=s)):delete a[n],this):a[n]},t.then=function(n){var s=this;return new Promise(function(r){var a=ye(n)?n:kp,o=function(){var l=s.then;s.then=null,ye(a)&&(a=a(s))&&(a.then||a===s)&&(s.then=l),r(a),s.then=l};s._initted&&s.totalProgress()===1&&s._ts>=0||!s._tTime&&s._ts<0?o():s._prom=o})},t.kill=function(){wa(this)},i})();Mn(Na.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-se,_prom:0,_ps:!1,_rts:1});var Le=(function(i){Rp(t,i);function t(n,s){var r;return n===void 0&&(n={}),r=i.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=an(n.sortChildren),ge&&ei(n.parent||ge,Ei(r),s),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&Hp(Ei(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(s,r,a){return Ra(0,arguments,this),this},e.from=function(s,r,a){return Ra(1,arguments,this),this},e.fromTo=function(s,r,a,o){return Ra(2,arguments,this),this},e.set=function(s,r,a){return r.duration=0,r.parent=this,Ca(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Se(s,r,Cn(this,a),1),this},e.call=function(s,r,a){return ei(this,Se.delayedCall(0,s,r),a)},e.staggerTo=function(s,r,a,o,c,l,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=h,a.parent=this,new Se(s,a,Cn(this,c)),this},e.staggerFrom=function(s,r,a,o,c,l,h){return a.runBackwards=1,Ca(a).immediateRender=an(a.immediateRender),this.staggerTo(s,r,a,o,c,l,h)},e.staggerFromTo=function(s,r,a,o,c,l,h,u){return o.startAt=a,Ca(o).immediateRender=an(o.immediateRender),this.staggerTo(s,r,o,c,l,h,u)},e.render=function(s,r,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,h=s<=0?0:Ee(s),u=this._zTime<0!=s<0&&(this._initted||!l),d,g,_,p,m,f,y,M,x,S,w,A;if(this!==ge&&h>c&&s>=0&&(h=c),h!==this._tTime||a||u){if(o!==this._time&&l&&(h+=this._time-o,s+=this._time-o),d=h,x=this._start,M=this._ts,f=!M,u&&(l||(o=this._zTime),(s||!r)&&(this._zTime=s)),this._repeat){if(w=this._yoyo,m=l+this._rDelay,this._repeat<-1&&s<0)return this.totalTime(m*100+s,r,a);if(d=Ee(h%m),h===c?(p=this._repeat,d=l):(S=Ee(h/m),p=~~S,p&&p===S&&(d=l,p--),d>l&&(d=l)),S=Ar(this._tTime,m),!o&&this._tTime&&S!==p&&this._tTime-S*m-this._dur<=0&&(S=p),w&&p&1&&(d=l-d,A=1),p!==S&&!this._lock){var R=w&&S&1,v=R===(w&&p&1);if(p<S&&(R=!R),o=R?0:h%l?l:h,this._lock=1,this.render(o||(A?0:Ee(p*m)),r,!l)._lock=0,this._tTime=h,!r&&this.parent&&yn(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),o&&o!==this._time||f!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,v&&(this._lock=2,o=R?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!f)return this;nm(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=fb(this,Ee(o),Ee(d)),y&&(h-=d-(d=y._start))),this._tTime=h,this._time=d,this._act=!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=s,o=0),!o&&h&&!r&&!S&&(yn(this,"onStart"),this._tTime!==h))return this;if(d>=o&&s>=0)for(g=this._first;g;){if(_=g._next,(g._act||d>=g._start)&&g._ts&&y!==g){if(g.parent!==this)return this.render(s,r,a);if(g.render(g._ts>0?(d-g._start)*g._ts:(g._dirty?g.totalDuration():g._tDur)+(d-g._start)*g._ts,r,a),d!==this._time||!this._ts&&!f){y=0,_&&(h+=this._zTime=-se);break}}g=_}else{g=this._last;for(var T=s<0?s:d;g;){if(_=g._prev,(g._act||T<=g._end)&&g._ts&&y!==g){if(g.parent!==this)return this.render(s,r,a);if(g.render(g._ts>0?(T-g._start)*g._ts:(g._dirty?g.totalDuration():g._tDur)+(T-g._start)*g._ts,r,a||Ne&&_u(g)),d!==this._time||!this._ts&&!f){y=0,_&&(h+=this._zTime=T?-se:se);break}}g=_}}if(y&&!r&&(this.pause(),y.render(d>=o?0:-se)._zTime=d>=o?1:-1,this._ts))return this._start=x,ic(this),this.render(s,r,a);this._onUpdate&&!r&&yn(this,"onUpdate",!0),(h===c&&this._tTime>=this.totalDuration()||!h&&o)&&(x===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((s||!l)&&(h===c&&this._ts>0||!h&&this._ts<0)&&Ji(this,1),!r&&!(s<0&&!o)&&(h||o||!c)&&(yn(this,h===c&&s>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(s,r){var a=this;if(Ai(r)||(r=Cn(this,r,s)),!(s instanceof Na)){if(Ge(s))return s.forEach(function(o){return a.add(o,r)}),this;if(Pe(s))return this.addLabel(s,r);if(ye(s))s=Se.delayedCall(0,s);else return this}return this!==s?ei(this,s,r):this},e.getChildren=function(s,r,a,o){s===void 0&&(s=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Rn);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof Se?r&&c.push(l):(a&&c.push(l),s&&c.push.apply(c,l.getChildren(!0,r,a)))),l=l._next;return c},e.getById=function(s){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===s)return r[a]},e.remove=function(s){return Pe(s)?this.removeLabel(s):ye(s)?this.killTweensOf(s):(s.parent===this&&nc(this,s),s===this._recent&&(this._recent=this._last),ws(this))},e.totalTime=function(s,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ee(rn.time-(this._ts>0?s/this._ts:(this.totalDuration()-s)/-this._ts))),i.prototype.totalTime.call(this,s,r),this._forcing=0,this):this._tTime},e.addLabel=function(s,r){return this.labels[s]=Cn(this,r),this},e.removeLabel=function(s){return delete this.labels[s],this},e.addPause=function(s,r,a){var o=Se.delayedCall(0,r||Da,a);return o.data="isPause",this._hasPause=1,ei(this,o,Cn(this,s))},e.removePause=function(s){var r=this._first;for(s=Cn(this,s);r;)r._start===s&&r.data==="isPause"&&Ji(r),r=r._next},e.killTweensOf=function(s,r,a){for(var o=this.getTweensOf(s,a),c=o.length;c--;)Yi!==o[c]&&o[c].kill(s,r);return this},e.getTweensOf=function(s,r){for(var a=[],o=Pn(s),c=this._first,l=Ai(r),h;c;)c instanceof Se?ab(c._targets,o)&&(l?(!Yi||c._initted&&c._ts)&&c.globalTime(0)<=r&&c.globalTime(c.totalDuration())>r:!r||c.isActive())&&a.push(c):(h=c.getTweensOf(o,r)).length&&a.push.apply(a,h),c=c._next;return a},e.tweenTo=function(s,r){r=r||{};var a=this,o=Cn(a,s),c=r,l=c.startAt,h=c.onStart,u=c.onStartParams,d=c.immediateRender,g,_=Se.to(a,Mn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||se,onStart:function(){if(a.pause(),!g){var m=r.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());_._dur!==m&&Cr(_,m,0,1).render(_._time,!0,!0),g=1}h&&h.apply(_,u||[])}},r));return d?_.render(0):_},e.tweenFromTo=function(s,r,a){return this.tweenTo(r,Mn({startAt:{time:Cn(this,s)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(s){return s===void 0&&(s=this._time),wp(this,Cn(this,s))},e.previousLabel=function(s){return s===void 0&&(s=this._time),wp(this,Cn(this,s),1)},e.currentLabel=function(s){return arguments.length?this.seek(s,!0):this.previousLabel(this._time+se)},e.shiftChildren=function(s,r,a){a===void 0&&(a=0);for(var o=this._first,c=this.labels,l;o;)o._start>=a&&(o._start+=s,o._end+=s),o=o._next;if(r)for(l in c)c[l]>=a&&(c[l]+=s);return ws(this)},e.invalidate=function(s){var r=this._first;for(this._lock=0;r;)r.invalidate(s),r=r._next;return i.prototype.invalidate.call(this,s)},e.clear=function(s){s===void 0&&(s=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),s&&(this.labels={}),ws(this)},e.totalDuration=function(s){var r=0,a=this,o=a._last,c=Rn,l,h,u;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-s:s));if(a._dirty){for(u=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,ei(a,o,h-o._delay,1)._lock=0):c=h,h<0&&o._ts&&(r-=h,(!u&&!a._dp||u&&u.smoothChildTiming)&&(a._start+=h/a._ts,a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),c=0),o._end>r&&o._ts&&(r=o._end),o=l;Cr(a,a===ge&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(s){if(ge._ts&&(Fp(ge,jl(s,ge)),Op=rn.frame),rn.frame>=bp){bp+=on.autoSleep||120;var r=ge._first;if((!r||!r._ts)&&on.autoSleep&&rn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||rn.sleep()}}},t})(Na);Mn(Le.prototype,{_lock:0,_hasPause:0,_forcing:0});var Rb=function(t,e,n,s,r,a,o){var c=new je(this._pt,t,e,0,1,Tu,null,r),l=0,h=0,u,d,g,_,p,m,f,y;for(c.b=n,c.e=s,n+="",s+="",(f=~s.indexOf("random("))&&(s=Pr(s)),a&&(y=[n,s],a(y,t,e),n=y[0],s=y[1]),d=n.match(Wh)||[];u=Wh.exec(s);)_=u[0],p=s.substring(l,u.index),g?g=(g+1)%5:p.substr(-5)==="rgba("&&(g=1),_!==d[h++]&&(m=parseFloat(d[h-1])||0,c._pt={_next:c._pt,p:p||h===1?p:",",s:m,c:_.charAt(1)==="="?Ps(m,_)-m:parseFloat(_)-m,m:g&&g<4?Math.round:0},l=Wh.lastIndex);return c.c=l<s.length?s.substring(l,s.length):"",c.fp=o,(uu.test(s)||f)&&(c.e=0),this._pt=c,c},vu=function(t,e,n,s,r,a,o,c,l,h){ye(s)&&(s=s(r||0,t,a));var u=t[e],d=n!=="get"?n:ye(u)?l?t[e.indexOf("set")||!ye(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():u,g=ye(u)?l?Nb:am:Su,_;if(Pe(s)&&(~s.indexOf("random(")&&(s=Pr(s)),s.charAt(1)==="="&&(_=Ps(d,s)+(Ue(d)||0),(_||_===0)&&(s=_))),!h||d!==s||au)return!isNaN(d*s)&&s!==""?(_=new je(this._pt,t,e,+d||0,s-(d||0),typeof u=="boolean"?Ob:om,0,g),l&&(_.fp=l),o&&_.modifier(o,this,t),this._pt=_):(!u&&!(e in t)&&ec(e,s),Rb.call(this,t,e,d,s,g,c||on.stringFilter,l))},Pb=function(t,e,n,s,r){if(ye(t)&&(t=Pa(t,r,e,n,s)),!ni(t)||t.style&&t.nodeType||Ge(t)||Ip(t))return Pe(t)?Pa(t,r,e,n,s):t;var a={},o;for(o in t)a[o]=Pa(t[o],r,e,n,s);return a},Mu=function(t,e,n,s,r,a){var o,c,l,h;if(sn[t]&&(o=new sn[t]).init(r,o.rawVars?e[t]:Pb(e[t],s,r,a,n),n,s,a)!==!1&&(n._pt=c=new je(n._pt,r,t,0,1,o.render,o,0,o.priority),n!==Tr))for(l=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)l[o._props[h]]=c;return o},Yi,au,bu=function i(t,e,n){var s=t.vars,r=s.ease,a=s.startAt,o=s.immediateRender,c=s.lazy,l=s.onUpdate,h=s.runBackwards,u=s.yoyoEase,d=s.keyframes,g=s.autoRevert,_=t._dur,p=t._startAt,m=t._targets,f=t.parent,y=f&&f.data==="nested"?f.vars.targets:m,M=t._overwrite==="auto"&&!lu,x=t.timeline,S,w,A,R,v,T,I,O,B,G,W,H,$;if(x&&(!d||!r)&&(r="none"),t._ease=As(r,Er.ease),t._yEase=u?em(As(u===!0?r:u,Er.ease)):0,u&&t._yoyo&&!t._repeat&&(u=t._yEase,t._yEase=t._ease,t._ease=u),t._from=!x&&!!s.runBackwards,!x||d&&!s.stagger){if(O=m[0]?$i(m[0]).harness:0,H=O&&s[O.prop],S=Kl(s,fu),p&&(p._zTime<0&&p.progress(1),e<0&&h&&o&&!g?p.render(-1,!0):p.revert(h&&_?ql:sb),p._lazy=0),a){if(Ji(t._startAt=Se.set(m,Mn({data:"isStart",overwrite:!1,parent:f,immediateRender:!0,lazy:!p&&an(c),startAt:null,delay:0,onUpdate:l&&function(){return yn(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ne||!o&&!g)&&t._startAt.revert(ql),o&&_&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&_&&!p){if(e&&(o=!1),A=Mn({overwrite:!1,data:"isFromStart",lazy:o&&!p&&an(c),immediateRender:o,stagger:0,parent:f},S),H&&(A[O.prop]=H),Ji(t._startAt=Se.set(m,A)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ne?t._startAt.revert(ql):t._startAt.render(-1,!0)),t._zTime=e,!o)i(t._startAt,se,se);else if(!e)return}for(t._pt=t._ptCache=0,c=_&&an(c)||c&&!_,w=0;w<m.length;w++){if(v=m[w],I=v._gsap||mu(m)[w]._gsap,t._ptLookup[w]=G={},tu[I.id]&&Zi.length&&Jl(),W=y===m?w:y.indexOf(v),O&&(B=new O).init(v,H||S,t,W,y)!==!1&&(t._pt=R=new je(t._pt,v,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(z){G[z]=R}),B.priority&&(T=1)),!O||H)for(A in S)sn[A]&&(B=Mu(A,S,t,W,v,y))?B.priority&&(T=1):G[A]=R=vu.call(t,v,A,"get",S[A],W,y,0,s.stringFilter);t._op&&t._op[w]&&t.kill(v,t._op[w]),M&&t._pt&&(Yi=t,ge.killTweensOf(v,G,t.globalTime(e)),$=!t.parent,Yi=0),t._pt&&c&&(tu[I.id]=1)}T&&wu(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!$,d&&e<=0&&x.render(Rn,!0,!0)},Ib=function(t,e,n,s,r,a,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,d,g;if(!l)for(l=t._ptCache[e]=[],d=t._ptLookup,g=t._targets.length;g--;){if(h=d[g][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return au=1,t.vars[e]="+=0",bu(t,o),au=0,c?Ia(e+" not eligible for reset"):1;l.push(h)}for(g=l.length;g--;)u=l[g],h=u._pt||u,h.s=(s||s===0)&&!r?s:h.s+(s||0)+a*h.c,h.c=n-h.s,u.e&&(u.e=ve(n)+Ue(u.e)),u.b&&(u.b=h.s+Ue(u.b))},Db=function(t,e){var n=t[0]?$i(t[0]).harness:0,s=n&&n.aliases,r,a,o,c;if(!s)return e;r=wr({},e);for(a in s)if(a in r)for(c=s[a].split(","),o=c.length;o--;)r[c[o]]=r[a];return r},Lb=function(t,e,n,s){var r=e.ease||s||"power1.inOut",a,o;if(Ge(e))o=n[t]||(n[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:r})});else for(a in e)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},Pa=function(t,e,n,s,r){return ye(t)?t.call(e,n,s,r):Pe(t)&&~t.indexOf("random(")?Pr(t):t},sm=pu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",rm={};Ke(sm+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return rm[i]=1});var Se=(function(i){Rp(t,i);function t(n,s,r,a){var o;typeof s=="number"&&(r.duration=s,s=r,r=null),o=i.call(this,a?s:Ca(s))||this;var c=o.vars,l=c.duration,h=c.delay,u=c.immediateRender,d=c.stagger,g=c.overwrite,_=c.keyframes,p=c.defaults,m=c.scrollTrigger,f=c.yoyoEase,y=s.parent||ge,M=(Ge(n)||Ip(n)?Ai(n[0]):"length"in s)?[n]:Pn(n),x,S,w,A,R,v,T,I;if(o._targets=M.length?mu(M):Ia("GSAP target "+n+" not found. https://gsap.com",!on.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=g,_||d||Xl(l)||Xl(h)){if(s=o.vars,x=o.timeline=new Le({data:"nested",defaults:p||{},targets:y&&y.data==="nested"?y.vars.targets:M}),x.kill(),x.parent=x._dp=Ei(o),x._start=0,d||Xl(l)||Xl(h)){if(A=M.length,T=d&&qp(d),ni(d))for(R in d)~sm.indexOf(R)&&(I||(I={}),I[R]=d[R]);for(S=0;S<A;S++)w=Kl(s,rm),w.stagger=0,f&&(w.yoyoEase=f),I&&wr(w,I),v=M[S],w.duration=+Pa(l,Ei(o),S,v,M),w.delay=(+Pa(h,Ei(o),S,v,M)||0)-o._delay,!d&&A===1&&w.delay&&(o._delay=h=w.delay,o._start+=h,w.delay=0),x.to(v,w,T?T(S,v,M):0),x._ease=Xt.none;x.duration()?l=h=0:o.timeline=0}else if(_){Ca(Mn(x.vars.defaults,{ease:"none"})),x._ease=As(_.ease||s.ease||"none");var O=0,B,G,W;if(Ge(_))_.forEach(function(H){return x.to(M,H,">")}),x.duration();else{w={};for(R in _)R==="ease"||R==="easeEach"||Lb(R,_[R],w,_.easeEach);for(R in w)for(B=w[R].sort(function(H,$){return H.t-$.t}),O=0,S=0;S<B.length;S++)G=B[S],W={ease:G.e,duration:(G.t-(S?B[S-1].t:0))/100*l},W[R]=G.v,x.to(M,W,O),O+=W.duration;x.duration()<l&&x.to({},{duration:l-x.duration()})}}l||o.duration(l=x.duration())}else o.timeline=0;return g===!0&&!lu&&(Yi=Ei(o),ge.killTweensOf(M),Yi=0),ei(y,Ei(o),r),s.reversed&&o.reverse(),s.paused&&o.paused(!0),(u||!l&&!_&&o._start===Ee(y._time)&&an(u)&&hb(Ei(o))&&y.data!=="nested")&&(o._tTime=-se,o.render(Math.max(0,-h)||0)),m&&Hp(Ei(o),m),o}var e=t.prototype;return e.render=function(s,r,a){var o=this._time,c=this._tDur,l=this._dur,h=s<0,u=s>c-se&&!h?c:s<se?0:s,d,g,_,p,m,f,y,M,x;if(!l)db(this,s,r,a);else if(u!==this._tTime||!s||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=u,M=this.timeline,this._repeat){if(p=l+this._rDelay,this._repeat<-1&&h)return this.totalTime(p*100+s,r,a);if(d=Ee(u%p),u===c?(_=this._repeat,d=l):(m=Ee(u/p),_=~~m,_&&_===m?(d=l,_--):d>l&&(d=l)),f=this._yoyo&&_&1,f&&(x=this._yEase,d=l-d),m=Ar(this._tTime,p),d===o&&!a&&this._initted&&_===m)return this._tTime=u,this;_!==m&&(M&&this._yEase&&nm(M,f),this.vars.repeatRefresh&&!f&&!this._lock&&d!==p&&this._initted&&(this._lock=a=1,this.render(Ee(p*_),!0).invalidate()._lock=0))}if(!this._initted){if(Gp(this,h?s:d,a,r,u))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==m))return this;if(l!==this._dur)return this.render(s,r,a)}if(this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(x||this._ease)(d/l),this._from&&(this.ratio=y=1-y),!o&&u&&!r&&!m&&(yn(this,"onStart"),this._tTime!==u))return this;for(g=this._pt;g;)g.r(y,g.d),g=g._next;M&&M.render(s<0?s:M._dur*M._ease(d/this._dur),r,a)||this._startAt&&(this._zTime=s),this._onUpdate&&!r&&(h&&eu(this,s,r,a),yn(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!r&&this.parent&&yn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&eu(this,s,!0,!0),(s||!l)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Ji(this,1),!r&&!(h&&!o)&&(u||o||f)&&(yn(this,u===c?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(s){return(!s||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(s),i.prototype.invalidate.call(this,s)},e.resetTo=function(s,r,a,o,c){La||rn.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||bu(this,l),h=this._ease(l/this._dur),Ib(this,s,r,a,o,h,l,c)?this.resetTo(s,r,a,o,1):(sc(this,0),this.parent||zp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(s,r){if(r===void 0&&(r="all"),!s&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?wa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ne),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(s,r,Yi&&Yi.vars.overwrite!==!0)._first||wa(this),this.parent&&a!==this.timeline.totalDuration()&&Cr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=s?Pn(s):o,l=this._ptLookup,h=this._pt,u,d,g,_,p,m,f;if((!r||r==="all")&&lb(o,c))return r==="all"&&(this._pt=0),wa(this);for(u=this._op=this._op||[],r!=="all"&&(Pe(r)&&(p={},Ke(r,function(y){return p[y]=1}),r=p),r=Db(o,r)),f=o.length;f--;)if(~c.indexOf(o[f])){d=l[f],r==="all"?(u[f]=r,_=d,g={}):(g=u[f]=u[f]||{},_=r);for(p in _)m=d&&d[p],m&&((!("kill"in m.d)||m.d.kill(p)===!0)&&nc(this,m,"_pt"),delete d[p]),g!=="all"&&(g[p]=1)}return this._initted&&!this._pt&&h&&wa(this),this},t.to=function(s,r){return new t(s,r,arguments[2])},t.from=function(s,r){return Ra(1,arguments)},t.delayedCall=function(s,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:s,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(s,r,a){return Ra(2,arguments)},t.set=function(s,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(s,r)},t.killTweensOf=function(s,r,a){return ge.killTweensOf(s,r,a)},t})(Na);Mn(Se.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ke("staggerTo,staggerFrom,staggerFromTo",function(i){Se[i]=function(){var t=new Le,e=iu.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var Su=function(t,e,n){return t[e]=n},am=function(t,e,n){return t[e](n)},Nb=function(t,e,n,s){return t[e](s.fp,n)},Ub=function(t,e,n){return t.setAttribute(e,n)},rc=function(t,e){return ye(t[e])?am:tc(t[e])&&t.setAttribute?Ub:Su},om=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Ob=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Tu=function(t,e){var n=e._pt,s="";if(!t&&e.b)s=e.b;else if(t===1&&e.e)s=e.e;else{for(;n;)s=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+s,n=n._next;s+=e.c}e.set(e.t,e.p,s,e)},Eu=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Fb=function(t,e,n,s){for(var r=this._pt,a;r;)a=r._next,r.p===s&&r.modifier(t,e,n),r=a},Bb=function(t){for(var e=this._pt,n,s;e;)s=e._next,e.p===t&&!e.op||e.op===t?nc(this,e,"_pt"):e.dep||(n=1),e=s;return!n},kb=function(t,e,n,s){s.mSet(t,e,s.m.call(s.tween,n,s.mt),s)},wu=function(t){for(var e=t._pt,n,s,r,a;e;){for(n=e._next,s=r;s&&s.pr>e.pr;)s=s._next;(e._prev=s?s._prev:a)?e._prev._next=e:r=e,(e._next=s)?s._prev=e:a=e,e=n}t._pt=r},je=(function(){function i(e,n,s,r,a,o,c,l,h){this.t=n,this.s=r,this.c=a,this.p=s,this.r=o||om,this.d=c||this,this.set=l||Su,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,s,r){this.mSet=this.mSet||this.set,this.set=kb,this.m=n,this.mt=r,this.tween=s},i})();Ke(pu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return fu[i]=1});vn.TweenMax=vn.TweenLite=Se;vn.TimelineLite=vn.TimelineMax=Le;ge=new Le({sortChildren:!1,defaults:Er,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});on.stringFilter=xu;var Cs=[],Zl={},zb=[],Cp=0,Vb=0,$h=function(t){return(Zl[t]||zb).map(function(e){return e()})},ou=function(){var t=Date.now(),e=[];t-Cp>2&&($h("matchMediaInit"),Cs.forEach(function(n){var s=n.queries,r=n.conditions,a,o,c,l;for(o in s)a=ti.matchMedia(s[o]).matches,a&&(c=1),a!==r[o]&&(r[o]=a,l=1);l&&(n.revert(),c&&e.push(n))}),$h("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(s){return n.add(null,s)})}),Cp=t,$h("matchMedia"))},lm=(function(){function i(e,n){this.selector=n&&su(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Vb++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,s,r){ye(n)&&(r=s,s=n,n=ye);var a=this,o=function(){var l=ue,h=a.selector,u;return l&&l!==a&&l.data.push(a),r&&(a.selector=su(r)),ue=a,u=s.apply(a,arguments),ye(u)&&a._r.push(u),ue=l,a.selector=h,a.isReverted=!1,u};return a.last=o,n===ye?o(a,function(c){return a.add(null,c)}):n?a[n]=o:o},t.ignore=function(n){var s=ue;ue=null,n(this),ue=s},t.getTweens=function(){var n=[];return this.data.forEach(function(s){return s instanceof i?n.push.apply(n,s.getTweens()):s instanceof Se&&!(s.parent&&s.parent.data==="nested")&&n.push(s)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,s){var r=this;if(n?(function(){for(var o=r.getTweens(),c=r.data.length,l;c--;)l=r.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),c=r.data.length;c--;)l=r.data[c],l instanceof Le?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Se)&&l.revert&&l.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),s)for(var a=Cs.length;a--;)Cs[a].id===this.id&&Cs.splice(a,1)},t.revert=function(n){this.kill(n||{})},i})(),Hb=(function(){function i(e){this.contexts=[],this.scope=e,ue&&ue.data.push(this)}var t=i.prototype;return t.add=function(n,s,r){ni(n)||(n={matches:n});var a=new lm(0,r||this.scope),o=a.conditions={},c,l,h;ue&&!a.selector&&(a.selector=ue.selector),this.contexts.push(a),s=a.add("onMatch",s),a.queries=n;for(l in n)l==="all"?h=1:(c=ti.matchMedia(n[l]),c&&(Cs.indexOf(a)<0&&Cs.push(a),(o[l]=c.matches)&&(h=1),c.addListener?c.addListener(ou):c.addEventListener("change",ou)));return h&&s(a,function(u){return a.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(s){return s.kill(n,!0)})},i})(),Ql={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(s){return jp(s)})},timeline:function(t){return new Le(t)},getTweensOf:function(t,e){return ge.getTweensOf(t,e)},getProperty:function(t,e,n,s){Pe(t)&&(t=Pn(t)[0]);var r=$i(t||{}).get,a=n?kp:Bp;return n==="native"&&(n=""),t&&(e?a((sn[e]&&sn[e].get||r)(t,e,n,s)):function(o,c,l){return a((sn[o]&&sn[o].get||r)(t,o,c,l))})},quickSetter:function(t,e,n){if(t=Pn(t),t.length>1){var s=t.map(function(h){return We.quickSetter(h,e,n)}),r=s.length;return function(h){for(var u=r;u--;)s[u](h)}}t=t[0]||{};var a=sn[e],o=$i(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=a?function(h){var u=new a;Tr._pt=0,u.init(t,n?h+n:h,Tr,0,[t]),u.render(1,u),Tr._pt&&Eu(1,Tr)}:o.set(t,c);return a?l:function(h){return l(t,c,n?h+n:h,o,1)}},quickTo:function(t,e,n){var s,r=We.to(t,Mn((s={},s[e]="+=0.1",s.paused=!0,s.stagger=0,s),n||{})),a=function(c,l,h){return r.resetTo(e,c,l,h)};return a.tween=r,a},isTweening:function(t){return ge.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=As(t.ease,Er.ease)),Sp(Er,t||{})},config:function(t){return Sp(on,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,s=t.plugins,r=t.defaults,a=t.extendTimeline;(s||"").split(",").forEach(function(o){return o&&!sn[o]&&!vn[o]&&Ia(e+" effect requires "+o+" plugin.")}),Xh[e]=function(o,c,l){return n(Pn(o),Mn(c||{},r),l)},a&&(Le.prototype[e]=function(o,c,l){return this.add(Xh[e](o,ni(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){Xt[t]=As(e)},parseEase:function(t,e){return arguments.length?As(t,e):Xt},getById:function(t){return ge.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Le(t),s,r;for(n.smoothChildTiming=an(t.smoothChildTiming),ge.remove(n),n._dp=0,n._time=n._tTime=ge._time,s=ge._first;s;)r=s._next,(e||!(!s._dur&&s instanceof Se&&s.vars.onComplete===s._targets[0]))&&ei(n,s,s._start-s._delay),s=r;return ei(ge,n,0),n},context:function(t,e){return t?new lm(t,e):ue},matchMedia:function(t){return new Hb(t)},matchMediaRefresh:function(){return Cs.forEach(function(t){var e=t.conditions,n,s;for(s in e)e[s]&&(e[s]=!1,n=1);n&&t.revert()})||ou()},addEventListener:function(t,e){var n=Zl[t]||(Zl[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Zl[t],s=n&&n.indexOf(e);s>=0&&n.splice(s,1)},utils:{wrap:vb,wrapYoyo:Mb,distribute:qp,random:Zp,snap:Yp,normalize:yb,getUnit:Ue,clamp:mb,splitColor:Qp,toArray:Pn,selector:su,mapRange:Jp,pipe:_b,unitize:xb,interpolate:bb,shuffle:Xp},install:Np,effects:Xh,ticker:rn,updateRoot:Le.updateRoot,plugins:sn,globalTimeline:ge,core:{PropTween:je,globals:Up,Tween:Se,Timeline:Le,Animation:Na,getCache:$i,_removeLinkedListItem:nc,reverting:function(){return Ne},context:function(t){return t&&ue&&(ue.data.push(t),t._ctx=ue),ue},suppressOverwrites:function(t){return lu=t}}};Ke("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Ql[i]=Se[i]});rn.add(Le.updateRoot);Tr=Ql.to({},{duration:0});var Gb=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Wb=function(t,e){var n=t._targets,s,r,a;for(s in e)for(r=n.length;r--;)a=t._ptLookup[r][s],a&&(a=a.d)&&(a._pt&&(a=Gb(a,s)),a&&a.modifier&&a.modifier(e[s],t,n[r],s))},Jh=function(t,e){return{name:t,headless:1,rawVars:1,init:function(s,r,a){a._onInit=function(o){var c,l;if(Pe(r)&&(c={},Ke(r,function(h){return c[h]=1}),r=c),e){c={};for(l in r)c[l]=e(r[l]);r=c}Wb(o,r)}}}},We=Ql.registerPlugin({name:"attr",init:function(t,e,n,s,r){var a,o,c;this.tween=n;for(a in e)c=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(c||0)+"",e[a],s,r,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(t,e){for(var n=e._pt;n;)Ne?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Jh("roundProps",ru),Jh("modifiers"),Jh("snap",Yp))||Ql;Se.version=Le.version=We.version="3.13.0";Lp=1;cu()&&Rr();var Xb=Xt.Power0,qb=Xt.Power1,Yb=Xt.Power2,Zb=Xt.Power3,$b=Xt.Power4,Jb=Xt.Linear,Kb=Xt.Quad,jb=Xt.Cubic,Qb=Xt.Quart,tS=Xt.Quint,eS=Xt.Strong,nS=Xt.Elastic,iS=Xt.Back,sS=Xt.SteppedEase,rS=Xt.Bounce,aS=Xt.Sine,oS=Xt.Expo,lS=Xt.Circ;var cm,ji,Dr,Du,Us,cS,hm,Lu,hS=function(){return typeof window<"u"},Ri={},Ns=180/Math.PI,Lr=Math.PI/180,Ir=Math.atan2,um=1e8,Nu=/([A-Z])/g,uS=/(left|right|width|margin|padding|x)/i,dS=/[\s,\(]\S/,ii={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Cu=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},fS=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},pS=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},mS=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},ym=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},vm=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},gS=function(t,e,n){return t.style[e]=n},_S=function(t,e,n){return t.style.setProperty(e,n)},xS=function(t,e,n){return t._gsap[e]=n},yS=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},vS=function(t,e,n,s,r){var a=t._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},MS=function(t,e,n,s,r){var a=t._gsap;a[e]=n,a.renderTransform(r,a)},_e="transform",ln=_e+"Origin",bS=function i(t,e){var n=this,s=this.target,r=s.style,a=s._gsap;if(t in Ri&&r){if(this.tfm=this.tfm||{},t!=="transform")t=ii[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return n.tfm[o]=Ci(s,o)}):this.tfm[t]=a.x?a[t]:Ci(s,t),t===ln&&(this.tfm.zOrigin=a.zOrigin);else return ii.transform.split(",").forEach(function(o){return i.call(n,o,e)});if(this.props.indexOf(_e)>=0)return;a.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(ln,e,"")),t=_e}(r||e)&&this.props.push(t,e,r[t])},Mm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},SS=function(){var t=this.props,e=this.target,n=e.style,s=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Nu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)s[a]=this.tfm[a];s.svg&&(s.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Lu(),(!r||!r.isStart)&&!n[_e]&&(Mm(n),s.zOrigin&&n[ln]&&(n[ln]+=" "+s.zOrigin+"px",s.zOrigin=0,s.renderTransform()),s.uncache=1)}},bm=function(t,e){var n={target:t,props:[],revert:SS,save:bS};return t._gsap||We.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(s){return n.save(s)}),n},Sm,Ru=function(t,e){var n=ji.createElementNS?ji.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ji.createElement(t);return n&&n.style?n:ji.createElement(t)},In=function i(t,e,n){var s=getComputedStyle(t);return s[e]||s.getPropertyValue(e.replace(Nu,"-$1").toLowerCase())||s.getPropertyValue(e)||!n&&i(t,Nr(e)||e,1)||""},dm="O,Moz,ms,Ms,Webkit".split(","),Nr=function(t,e,n){var s=e||Us,r=s.style,a=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(dm[a]+t in r););return a<0?null:(a===3?"ms":a>=0?dm[a]:"")+t},Pu=function(){hS()&&window.document&&(cm=window,ji=cm.document,Dr=ji.documentElement,Us=Ru("div")||{style:{}},cS=Ru("div"),_e=Nr(_e),ln=_e+"Origin",Us.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Sm=!!Nr("perspective"),Lu=We.core.reverting,Du=1)},fm=function(t){var e=t.ownerSVGElement,n=Ru("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),s=t.cloneNode(!0),r;s.style.display="block",n.appendChild(s),Dr.appendChild(n);try{r=s.getBBox()}catch{}return n.removeChild(s),Dr.removeChild(n),r},pm=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Tm=function(t){var e,n;try{e=t.getBBox()}catch{e=fm(t),n=1}return e&&(e.width||e.height)||n||(e=fm(t)),e&&!e.width&&!e.x&&!e.y?{x:+pm(t,["x","cx","x1"])||0,y:+pm(t,["y","cy","y1"])||0,width:0,height:0}:e},Em=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Tm(t))},Os=function(t,e){if(e){var n=t.style,s;e in Ri&&e!==ln&&(e=_e),n.removeProperty?(s=e.substr(0,2),(s==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(s==="--"?e:e.replace(Nu,"-$1").toLowerCase())):n.removeAttribute(e)}},Qi=function(t,e,n,s,r,a){var o=new je(t._pt,e,n,0,1,a?vm:ym);return t._pt=o,o.b=s,o.e=r,t._props.push(n),o},mm={deg:1,rad:1,turn:1},TS={grid:1,flex:1},ts=function i(t,e,n,s){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=Us.style,c=uS.test(e),l=t.tagName.toLowerCase()==="svg",h=(l?"client":"offset")+(c?"Width":"Height"),u=100,d=s==="px",g=s==="%",_,p,m,f;if(s===a||!r||mm[s]||mm[a])return r;if(a!=="px"&&!d&&(r=i(t,e,n,"px")),f=t.getCTM&&Em(t),(g||a==="%")&&(Ri[e]||~e.indexOf("adius")))return _=f?t.getBBox()[c?"width":"height"]:t[h],ve(g?r/_*u:r/100*_);if(o[c?"width":"height"]=u+(d?a:s),p=s!=="rem"&&~e.indexOf("adius")||s==="em"&&t.appendChild&&!l?t:t.parentNode,f&&(p=(t.ownerSVGElement||{}).parentNode),(!p||p===ji||!p.appendChild)&&(p=ji.body),m=p._gsap,m&&g&&m.width&&c&&m.time===rn.time&&!m.uncache)return ve(r/m.width*u);if(g&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=u+s,_=t[h],y?t.style[e]=y:Os(t,e)}else(g||a==="%")&&!TS[In(p,"display")]&&(o.position=In(t,"position")),p===t&&(o.position="static"),p.appendChild(Us),_=Us[h],p.removeChild(Us),o.position="absolute";return c&&g&&(m=$i(p),m.time=rn.time,m.width=p[h]),ve(d?_*r/u:_&&r?u/_*r:0)},Ci=function(t,e,n,s){var r;return Du||Pu(),e in ii&&e!=="transform"&&(e=ii[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ri[e]&&e!=="transform"?(r=Ba(t,s),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:oc(In(t,ln))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||s||~(r+"").indexOf("calc("))&&(r=ac[e]&&ac[e](t,e,n)||In(t,e)||gu(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?ts(t,e,r,n)+n:r},ES=function(t,e,n,s){if(!n||n==="none"){var r=Nr(e,t,1),a=r&&In(t,r,1);a&&a!==n?(e=r,n=a):e==="borderColor"&&(n=In(t,"borderTopColor"))}var o=new je(this._pt,t.style,e,0,1,Tu),c=0,l=0,h,u,d,g,_,p,m,f,y,M,x,S;if(o.b=n,o.e=s,n+="",s+="",s.substring(0,6)==="var(--"&&(s=In(t,s.substring(4,s.indexOf(")")))),s==="auto"&&(p=t.style[e],t.style[e]=s,s=In(t,e)||s,p?t.style[e]=p:Os(t,e)),h=[n,s],xu(h),n=h[0],s=h[1],d=n.match(Rs)||[],S=s.match(Rs)||[],S.length){for(;u=Rs.exec(s);)m=u[0],y=s.substring(c,u.index),_?_=(_+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(_=1),m!==(p=d[l++]||"")&&(g=parseFloat(p)||0,x=p.substr((g+"").length),m.charAt(1)==="="&&(m=Ps(g,m)+x),f=parseFloat(m),M=m.substr((f+"").length),c=Rs.lastIndex-M.length,M||(M=M||on.units[e]||x,c===s.length&&(s+=M,o.e+=M)),x!==M&&(g=ts(t,e,p,M)||0),o._pt={_next:o._pt,p:y||l===1?y:",",s:g,c:f-g,m:_&&_<4||e==="zIndex"?Math.round:0});o.c=c<s.length?s.substring(c,s.length):""}else o.r=e==="display"&&s==="none"?vm:ym;return uu.test(s)&&(o.e=0),this._pt=o,o},gm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wS=function(t){var e=t.split(" "),n=e[0],s=e[1]||"50%";return(n==="top"||n==="bottom"||s==="left"||s==="right")&&(t=n,n=s,s=t),e[0]=gm[n]||n,e[1]=gm[s]||s,e.join(" ")},AS=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,s=n.style,r=e.u,a=n._gsap,o,c,l;if(r==="all"||r===!0)s.cssText="",c=1;else for(r=r.split(","),l=r.length;--l>-1;)o=r[l],Ri[o]&&(c=1,o=o==="transformOrigin"?ln:_e),Os(n,o);c&&(Os(n,_e),a&&(a.svg&&n.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",Ba(n,1),a.uncache=1,Mm(s)))}},ac={clearProps:function(t,e,n,s,r){if(r.data!=="isFromStart"){var a=t._pt=new je(t._pt,e,n,0,0,AS);return a.u=s,a.pr=-10,a.tween=r,t._props.push(n),1}}},Fa=[1,0,0,1,0,0],wm={},Am=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},_m=function(t){var e=In(t,_e);return Am(e)?Fa:e.substr(7).match(hu).map(ve)},Uu=function(t,e){var n=t._gsap||$i(t),s=t.style,r=_m(t),a,o,c,l;return n.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,r=[c.a,c.b,c.c,c.d,c.e,c.f],r.join(",")==="1,0,0,1,0,0"?Fa:r):(r===Fa&&!t.offsetParent&&t!==Dr&&!n.svg&&(c=s.display,s.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,Dr.appendChild(t)),r=_m(t),c?s.display=c:Os(t,"display"),l&&(o?a.insertBefore(t,o):a?a.appendChild(t):Dr.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Iu=function(t,e,n,s,r,a){var o=t._gsap,c=r||Uu(t,!0),l=o.xOrigin||0,h=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,g=c[0],_=c[1],p=c[2],m=c[3],f=c[4],y=c[5],M=e.split(" "),x=parseFloat(M[0])||0,S=parseFloat(M[1])||0,w,A,R,v;n?c!==Fa&&(A=g*m-_*p)&&(R=x*(m/A)+S*(-p/A)+(p*y-m*f)/A,v=x*(-_/A)+S*(g/A)-(g*y-_*f)/A,x=R,S=v):(w=Tm(t),x=w.x+(~M[0].indexOf("%")?x/100*w.width:x),S=w.y+(~(M[1]||M[0]).indexOf("%")?S/100*w.height:S)),s||s!==!1&&o.smooth?(f=x-l,y=S-h,o.xOffset=u+(f*g+y*p)-f,o.yOffset=d+(f*_+y*m)-y):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=S,o.smooth=!!s,o.origin=e,o.originIsAbsolute=!!n,t.style[ln]="0px 0px",a&&(Qi(a,o,"xOrigin",l,x),Qi(a,o,"yOrigin",h,S),Qi(a,o,"xOffset",u,o.xOffset),Qi(a,o,"yOffset",d,o.yOffset)),t.setAttribute("data-svg-origin",x+" "+S)},Ba=function(t,e){var n=t._gsap||new yu(t);if("x"in n&&!e&&!n.uncache)return n;var s=t.style,r=n.scaleX<0,a="px",o="deg",c=getComputedStyle(t),l=In(t,ln)||"0",h,u,d,g,_,p,m,f,y,M,x,S,w,A,R,v,T,I,O,B,G,W,H,$,z,rt,ct,gt,Dt,jt,qt,zt;return h=u=d=p=m=f=y=M=x=0,g=_=1,n.svg=!!(t.getCTM&&Em(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(s[_e]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[_e]!=="none"?c[_e]:"")),s.scale=s.rotate=s.translate="none"),A=Uu(t,n.svg),n.svg&&(n.uncache?(z=t.getBBox(),l=n.xOrigin-z.x+"px "+(n.yOrigin-z.y)+"px",$=""):$=!e&&t.getAttribute("data-svg-origin"),Iu(t,$||l,!!$||n.originIsAbsolute,n.smooth!==!1,A)),S=n.xOrigin||0,w=n.yOrigin||0,A!==Fa&&(I=A[0],O=A[1],B=A[2],G=A[3],h=W=A[4],u=H=A[5],A.length===6?(g=Math.sqrt(I*I+O*O),_=Math.sqrt(G*G+B*B),p=I||O?Ir(O,I)*Ns:0,y=B||G?Ir(B,G)*Ns+p:0,y&&(_*=Math.abs(Math.cos(y*Lr))),n.svg&&(h-=S-(S*I+w*B),u-=w-(S*O+w*G))):(zt=A[6],jt=A[7],ct=A[8],gt=A[9],Dt=A[10],qt=A[11],h=A[12],u=A[13],d=A[14],R=Ir(zt,Dt),m=R*Ns,R&&(v=Math.cos(-R),T=Math.sin(-R),$=W*v+ct*T,z=H*v+gt*T,rt=zt*v+Dt*T,ct=W*-T+ct*v,gt=H*-T+gt*v,Dt=zt*-T+Dt*v,qt=jt*-T+qt*v,W=$,H=z,zt=rt),R=Ir(-B,Dt),f=R*Ns,R&&(v=Math.cos(-R),T=Math.sin(-R),$=I*v-ct*T,z=O*v-gt*T,rt=B*v-Dt*T,qt=G*T+qt*v,I=$,O=z,B=rt),R=Ir(O,I),p=R*Ns,R&&(v=Math.cos(R),T=Math.sin(R),$=I*v+O*T,z=W*v+H*T,O=O*v-I*T,H=H*v-W*T,I=$,W=z),m&&Math.abs(m)+Math.abs(p)>359.9&&(m=p=0,f=180-f),g=ve(Math.sqrt(I*I+O*O+B*B)),_=ve(Math.sqrt(H*H+zt*zt)),R=Ir(W,H),y=Math.abs(R)>2e-4?R*Ns:0,x=qt?1/(qt<0?-qt:qt):0),n.svg&&($=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Am(In(t,_e)),$&&t.setAttribute("transform",$))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(g*=-1,y+=p<=0?180:-180,p+=p<=0?180:-180):(_*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=ve(g),n.scaleY=ve(_),n.rotation=ve(p)+o,n.rotationX=ve(m)+o,n.rotationY=ve(f)+o,n.skewX=y+o,n.skewY=M+o,n.transformPerspective=x+a,(n.zOrigin=parseFloat(l.split(" ")[2])||!e&&n.zOrigin||0)&&(s[ln]=oc(l)),n.xOffset=n.yOffset=0,n.force3D=on.force3D,n.renderTransform=n.svg?RS:Sm?Cm:CS,n.uncache=0,n},oc=function(t){return(t=t.split(" "))[0]+" "+t[1]},Au=function(t,e,n){var s=Ue(e);return ve(parseFloat(e)+parseFloat(ts(t,"x",n+"px",s)))+s},CS=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Cm(t,e)},Ds="0deg",Oa="0px",Ls=") ",Cm=function(t,e){var n=e||this,s=n.xPercent,r=n.yPercent,a=n.x,o=n.y,c=n.z,l=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,g=n.skewY,_=n.scaleX,p=n.scaleY,m=n.transformPerspective,f=n.force3D,y=n.target,M=n.zOrigin,x="",S=f==="auto"&&t&&t!==1||f===!0;if(M&&(u!==Ds||h!==Ds)){var w=parseFloat(h)*Lr,A=Math.sin(w),R=Math.cos(w),v;w=parseFloat(u)*Lr,v=Math.cos(w),a=Au(y,a,A*v*-M),o=Au(y,o,-Math.sin(w)*-M),c=Au(y,c,R*v*-M+M)}m!==Oa&&(x+="perspective("+m+Ls),(s||r)&&(x+="translate("+s+"%, "+r+"%) "),(S||a!==Oa||o!==Oa||c!==Oa)&&(x+=c!==Oa||S?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+Ls),l!==Ds&&(x+="rotate("+l+Ls),h!==Ds&&(x+="rotateY("+h+Ls),u!==Ds&&(x+="rotateX("+u+Ls),(d!==Ds||g!==Ds)&&(x+="skew("+d+", "+g+Ls),(_!==1||p!==1)&&(x+="scale("+_+", "+p+Ls),y.style[_e]=x||"translate(0, 0)"},RS=function(t,e){var n=e||this,s=n.xPercent,r=n.yPercent,a=n.x,o=n.y,c=n.rotation,l=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,g=n.target,_=n.xOrigin,p=n.yOrigin,m=n.xOffset,f=n.yOffset,y=n.forceCSS,M=parseFloat(a),x=parseFloat(o),S,w,A,R,v;c=parseFloat(c),l=parseFloat(l),h=parseFloat(h),h&&(h=parseFloat(h),l+=h,c+=h),c||l?(c*=Lr,l*=Lr,S=Math.cos(c)*u,w=Math.sin(c)*u,A=Math.sin(c-l)*-d,R=Math.cos(c-l)*d,l&&(h*=Lr,v=Math.tan(l-h),v=Math.sqrt(1+v*v),A*=v,R*=v,h&&(v=Math.tan(h),v=Math.sqrt(1+v*v),S*=v,w*=v)),S=ve(S),w=ve(w),A=ve(A),R=ve(R)):(S=u,R=d,w=A=0),(M&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(M=ts(g,"x",a,"px"),x=ts(g,"y",o,"px")),(_||p||m||f)&&(M=ve(M+_-(_*S+p*A)+m),x=ve(x+p-(_*w+p*R)+f)),(s||r)&&(v=g.getBBox(),M=ve(M+s/100*v.width),x=ve(x+r/100*v.height)),v="matrix("+S+","+w+","+A+","+R+","+M+","+x+")",g.setAttribute("transform",v),y&&(g.style[_e]=v)},PS=function(t,e,n,s,r){var a=360,o=Pe(r),c=parseFloat(r)*(o&&~r.indexOf("rad")?Ns:1),l=c-s,h=s+l+"deg",u,d;return o&&(u=r.split("_")[1],u==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),u==="cw"&&l<0?l=(l+a*um)%a-~~(l/a)*a:u==="ccw"&&l>0&&(l=(l-a*um)%a-~~(l/a)*a)),t._pt=d=new je(t._pt,e,n,s,l,fS),d.e=h,d.u="deg",t._props.push(n),d},xm=function(t,e){for(var n in e)t[n]=e[n];return t},IS=function(t,e,n){var s=xm({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,c,l,h,u,d,g,_;s.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),a[_e]=e,o=Ba(n,1),Os(n,_e),n.setAttribute("transform",l)):(l=getComputedStyle(n)[_e],a[_e]=e,o=Ba(n,1),a[_e]=l);for(c in Ri)l=s[c],h=o[c],l!==h&&r.indexOf(c)<0&&(g=Ue(l),_=Ue(h),u=g!==_?ts(n,c,l,_):parseFloat(l),d=parseFloat(h),t._pt=new je(t._pt,o,c,u,d-u,Cu),t._pt.u=_||0,t._props.push(c));xm(o,s)};Ke("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",s="Bottom",r="Left",a=(t<3?[e,n,s,r]:[e+r,e+n,s+n,s+r]).map(function(o){return t<2?i+o:"border"+o+i});ac[t>1?"border"+i:i]=function(o,c,l,h,u){var d,g;if(arguments.length<4)return d=a.map(function(_){return Ci(o,_,l)}),g=d.join(" "),g.split(d[0]).length===5?d[0]:g;d=(h+"").split(" "),g={},a.forEach(function(_,p){return g[_]=d[p]=d[p]||d[(p-1)/2|0]}),o.init(c,g,u)}});var Ou={name:"css",register:Pu,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,s,r){var a=this._props,o=t.style,c=n.vars.startAt,l,h,u,d,g,_,p,m,f,y,M,x,S,w,A,R;Du||Pu(),this.styles=this.styles||bm(t),R=this.styles.props,this.tween=n;for(p in e)if(p!=="autoRound"&&(h=e[p],!(sn[p]&&Mu(p,e,n,s,t,r)))){if(g=typeof h,_=ac[p],g==="function"&&(h=h.call(n,s,t,r),g=typeof h),g==="string"&&~h.indexOf("random(")&&(h=Pr(h)),_)_(this,t,p,h,n)&&(A=1);else if(p.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(p)+"").trim(),h+="",wi.lastIndex=0,wi.test(l)||(m=Ue(l),f=Ue(h)),f?m!==f&&(l=ts(t,p,l,f)+f):m&&(h+=m),this.add(o,"setProperty",l,h,s,r,0,0,p),a.push(p),R.push(p,0,o[p]);else if(g!=="undefined"){if(c&&p in c?(l=typeof c[p]=="function"?c[p].call(n,s,t,r):c[p],Pe(l)&&~l.indexOf("random(")&&(l=Pr(l)),Ue(l+"")||l==="auto"||(l+=on.units[p]||Ue(Ci(t,p))||""),(l+"").charAt(1)==="="&&(l=Ci(t,p))):l=Ci(t,p),d=parseFloat(l),y=g==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),u=parseFloat(h),p in ii&&(p==="autoAlpha"&&(d===1&&Ci(t,"visibility")==="hidden"&&u&&(d=0),R.push("visibility",0,o.visibility),Qi(this,o,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),p!=="scale"&&p!=="transform"&&(p=ii[p],~p.indexOf(",")&&(p=p.split(",")[0]))),M=p in Ri,M){if(this.styles.save(p),g==="string"&&h.substring(0,6)==="var(--"&&(h=In(t,h.substring(4,h.indexOf(")"))),u=parseFloat(h)),x||(S=t._gsap,S.renderTransform&&!e.parseTransform||Ba(t,e.parseTransform),w=e.smoothOrigin!==!1&&S.smooth,x=this._pt=new je(this._pt,o,_e,0,1,S.renderTransform,S,0,-1),x.dep=1),p==="scale")this._pt=new je(this._pt,S,"scaleY",S.scaleY,(y?Ps(S.scaleY,y+u):u)-S.scaleY||0,Cu),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){R.push(ln,0,o[ln]),h=wS(h),S.svg?Iu(t,h,0,w,0,this):(f=parseFloat(h.split(" ")[2])||0,f!==S.zOrigin&&Qi(this,S,"zOrigin",S.zOrigin,f),Qi(this,o,p,oc(l),oc(h)));continue}else if(p==="svgOrigin"){Iu(t,h,1,w,0,this);continue}else if(p in wm){PS(this,S,p,d,y?Ps(d,y+h):h);continue}else if(p==="smoothOrigin"){Qi(this,S,"smooth",S.smooth,h);continue}else if(p==="force3D"){S[p]=h;continue}else if(p==="transform"){IS(this,h,t);continue}}else p in o||(p=Nr(p)||p);if(M||(u||u===0)&&(d||d===0)&&!dS.test(h)&&p in o)m=(l+"").substr((d+"").length),u||(u=0),f=Ue(h)||(p in on.units?on.units[p]:m),m!==f&&(d=ts(t,p,l,f)),this._pt=new je(this._pt,M?S:o,p,d,(y?Ps(d,y+u):u)-d,!M&&(f==="px"||p==="zIndex")&&e.autoRound!==!1?mS:Cu),this._pt.u=f||0,m!==f&&f!=="%"&&(this._pt.b=l,this._pt.r=pS);else if(p in o)ES.call(this,t,p,l,y?y+h:h);else if(p in t)this.add(t,p,l||t[p],y?y+h:h,s,r);else if(p!=="parseTransform"){ec(p,h);continue}M||(p in o?R.push(p,0,o[p]):typeof t[p]=="function"?R.push(p,2,t[p]()):R.push(p,1,l||t[p])),a.push(p)}}A&&wu(this)},render:function(t,e){if(e.tween._time||!Lu())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ci,aliases:ii,getSetter:function(t,e,n){var s=ii[e];return s&&s.indexOf(",")<0&&(e=s),e in Ri&&e!==ln&&(t._gsap.x||Ci(t,"x"))?n&&hm===n?e==="scale"?yS:xS:(hm=n||{})&&(e==="scale"?vS:MS):t.style&&!tc(t.style[e])?gS:~e.indexOf("-")?_S:rc(t,e)},core:{_removeProperty:Os,_getMatrix:Uu}};We.utils.checkPrefix=Nr;We.core.getStyleSaver=bm;(function(i,t,e,n){var s=Ke(i+","+t+","+e,function(r){Ri[r]=1});Ke(t,function(r){on.units[r]="deg",wm[r]=1}),ii[s[13]]=i+","+t,Ke(n,function(r){var a=r.split(":");ii[a[1]]=s[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ke("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){on.units[i]="px"});We.registerPlugin(Ou);var Wn=We.registerPlugin(Ou)||We,LA=Wn.core.Tween;var yc=o_(Lg(),1);var Fs=[{id:"portable",number:"01",title:"Reusable work moves to core",range:"#123\u2013128",step:5,summary:"Source caching, revision publication, project membership, semantic-cache lifetime and workspace sessions gain a core home. TypeScript keeps language-specific work; CLI keeps hosting.",reason:"Stated: other backends and future hosts need the reusable mechanisms without importing TypeScript or CLI.",detail:"The same green concern can leave a purple TypeScript district or a coral CLI district and appear inside core. A moved source-cache file is a change of home; revision, graph and session extraction also change the surrounding files. Height counts the edited text, so it cannot tell a pure move from a redesigned API.",files:["packages/core/src/workspace/workspace-source-cache.ts","packages/core/src/workspace/workspace-session.ts"],prs:[123,124,126,127,128]},{id:"leaf",number:"02",title:"A new address starts with contracts",range:"#129\u2013134",step:7,summary:"CLI takes state-directory resolution from telemetry. Daemon becomes a leaf package for policy, command/failure vocabulary and admission authority; CLI mechanisms consume those contracts.",reason:"Stated: CLI composes environment values; the daemon needs an enforceable owner with no internal production dependencies.",detail:"At #130 the daemon district exists before its process mechanisms move there. #131 wires consumers to required policy slices; #132\u2013134 give vocabulary and admission decisions a single authority. A contract-patterned building is still a source file: the pattern is a path-based grouping, not a claim that its contents contain only types.",files:["apps/cli/src/state-directory-resolver.ts","packages/daemon/src/daemon-policy.ts","packages/daemon/package.json"],prs:[129,130,131,132,133,134]},{id:"host",number:"03",title:"The host plugs in; formatting moves out",range:"#135\u2013136",step:13,summary:"An injected executor module keeps CLI execution behind a daemon-owned contract. Lifecycle report formatting moves into renderer; format selection and writing stay in CLI.",reason:"Stated: the daemon must stay free of CLI/core imports, while renderer owns the output bytes.",detail:"The executor module URL is a host-supplied seam, not an import from the daemon package back into CLI. The renderer relocation is another crossing: the formatting building changes district without moving output selection and writes with it. The cyan road marks a selected source relocation, not a network socket or elapsed trip.",files:["packages/daemon/src/daemon-executor.ts","apps/cli/src/daemon-executor.ts","packages/renderer/src/lifecycle/daemon-lifecycle-renderer.ts"],prs:[135,136]},{id:"split",number:"04",title:"Smaller owners can share the old district",range:"#137\u2013147",step:24,summary:"Codec, transfer receiver, socket clients/server, activity projector, worker generations, delivery and accepted execution get separate owners while their mechanisms still live in CLI.",reason:"Stated: isolate framing, connection, recovery and lifecycle responsibilities before the package move.",detail:"New blue buildings inside CLI are evidence of decomposition without physical package separation. The white invocation road still enters the CLI dispatcher and local transport. The intervening eleven skylines change the internal surface; they do not show a package cutover.",files:["apps/cli/src/daemon/local-daemon-transport.ts","apps/cli/src/daemon/accepted-execution-session.ts","apps/cli/src/daemon/daemon-delivery-session.ts"],prs:[137,138,139,140,141,142,143,144,145,146,147]},{id:"stage",number:"05",title:"Two blue neighborhoods, one active path",range:"#148",step:25,summary:"DaemonClient and package mechanisms arrive. The public fa\xE7ade loads its private runtime dynamically. The active CLI graph remains in place: 38 compatibility files are frozen while the package is staged.",reason:"Stated: separate mechanism ownership from the host-invocation switch, and keep Node-backed mechanisms out of host declarations.",detail:"Both districts contain daemon concerns at this skyline. The white road stays inside CLI, whose dispatcher still constructs its local registry, transport and startup coordinator. The new package has a real implementation, but its presence alone does not establish the shipped CLI route. The source inventory hashes the 38 files; the city independently recomputes that digest.",files:["apps/cli/src/daemon/daemon-command-dispatcher.ts","packages/daemon/src/client/daemon-client.ts","meta-tests/src/daemon-compatibility-copy.test.ts"],prs:[148]},{id:"cutover",number:"06",title:"The road crosses; the old block clears",range:"#149",step:26,summary:"CLI invocation now reaches DaemonClient. The 38 frozen files disappear; blue test buildings remain in CLI. Daemon owns mechanisms, entry points and transport composition; external tests use a read-only inspector, with compiler-based ownership checks.",reason:"Stated: make the package the sole mechanism owner, while CLI retains argv/workspace coordination and tests receive observation without storage authority.",detail:"The road starts at CLI entry, passes through CliInvocationCoordinator and crosses into the daemon fa\xE7ade. Empty outlined lots are removed physical paths, not proof that their behavior disappeared. The old compatibility directory is required to be absent, and the daemon package exports explicit entry/testing surfaces rather than compatibility aliases.",files:["apps/cli/src/cli-invocation-coordinator.ts","packages/daemon/src/client/daemon-client.ts","packages/daemon/src/testing/daemon-testing-inspector.ts","meta-tests/src/daemon-compatibility-copy.test.ts","packages/daemon/package.json"],prs:[149]},{id:"tests",number:"07",title:"Lit windows are not a coverage claim",range:"#148 \xB7 test relocation",step:25,summary:"37 CLI test files move into daemon source. A worker test switches to a generic fixture and drops startup/result timing checks. Its CLI-version mismatch case leaves the worker test; a host executor test checks version rejection instead.",reason:"Stated: package independence motivates generic executors; a commit explicitly restores the host version oracle. Unexplained: no specific reason found for removing the timing observations.",detail:"The checker pattern identifies test paths, not assertions or passing tests. Rename detection links old test parcels to new homes. In the selected worker patch, fileCount and output checks remain while duration fields leave. Commit 0f31a619 adds direct CLI executor version-rejection coverage, which does not reproduce the original worker initialization-failure observation. No claim is made about timing coverage in other suites. No symnav test suite or production daemon was run for this city.",files:["packages/daemon/src/worker/navigation-worker.test.ts","apps/cli/src/daemon/daemon-navigation-worker.test.ts","apps/cli/src/daemon-executor.test.ts"],prs:[148],patch:!0}];var Ht=window.CITY_DATA,Ng=window.CITY_FACTS,it=i=>document.querySelector(i),is=i=>[...document.querySelectorAll(i)],Bs=i=>i.toLocaleString("en-US"),oi=i=>String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Wa=new Map(Ht.files.map(i=>[i.path,i])),Xa={daemon:["#69c4c7","Daemon"],host:["#e59b76","CLI host"],core:["#afce90","Core"],typescript:["#a99cdc","TypeScript"],renderer:["#e7cc87","Renderer"],telemetry:["#cf9cb8","Telemetry"],infrastructure:["#8fa0a6","Infrastructure"]},j={step:25,file:null,role:"all",roads:!1,trace:!1,playing:!1,district:null,reading:"stage"},Bg=matchMedia("(prefers-reduced-motion: reduce)"),QS=it("#canvas-host"),qn=it("#city"),Xe,hn,Jt,we,Xn,si,Ju,kg,Ga,ss="source",Yu=0,Ku=[],Vr=new Map,Hr=[],zg=[],rs=new Map,tT=[],ri=144,ai=100,Ug,Vg=0,Zu=!1;function ju(i){return Fs.find(t=>t.step===i&&t.id!=="tests")||Fs.find(t=>i<=t.step)||Fs[5]}function Ii(i){return Ht.snapshots[j.step][i.id]}function qa(i=!1){let t=new URLSearchParams({skyline:String(j.step)});j.file!==null&&t.set("file",j.file),j.reading&&t.set("reading",j.reading),history[i?"replaceState":"pushState"]({},"",`#${t}`)}function Hg(){let i=new URLSearchParams(location.hash.slice(1));if(!i.has("skyline"))return;let t=Number(i.get("skyline"));Number.isInteger(t)&&t>=0&&t<=26&&(j.step=t);let e=Number(i.get("file"));j.file=i.has("file")&&Ht.files[e]?e:null,j.reading=Fs.some(n=>n.id===i.get("reading"))?i.get("reading"):ju(j.step).id}function Dn(i,{history:t=!0,animate:e=!0}={}){j.step=Math.max(0,Math.min(26,i)),j.reading=ju(j.step).id,zr(e),td(),t&&qa()}function ks(i,{history:t=!0}={}){j.file=i===null?null:Number(i),Xg(),Ya(),qg(),j.roads&&Qu(),t&&qa(),li()}function eT(){let i=Object.keys(Ht.districts).map(e=>{let n=Ht.files.filter(s=>s.district===e).sort((s,r)=>s.owner.localeCompare(r.owner)||s.role.localeCompare(r.role)||s.path.localeCompare(r.path));return{id:e,children:n.map(s=>({file:s,weight:Math.max(3.7,Math.sqrt(n.length))/n.length}))}}),t=Mr({children:i}).sum(e=>e.weight||0);Gh().tile(Ea).size([ri,ai]).paddingOuter(3).paddingInner(2).paddingTop(e=>e.depth===1?6:0).round(!0)(t);for(let e of t.children)Hr.push({id:e.data.id,x:e.x0-ri/2,z:e.y0-ai/2,w:e.x1-e.x0,h:e.y1-e.y0,cx:(e.x0+e.x1-ri)/2,cz:(e.y0+e.y1-ai)/2});for(let e of t.leaves()){let n=e.data.file;rs.set(n.id,{x:(e.x0+e.x1-ri)/2,z:(e.y0+e.y1-ai)/2,w:Math.max(.65,e.x1-e.x0-.45),d:Math.max(.65,e.y1-e.y0-.45)})}}eT();function nT(i){let t=document.createElement("canvas");t.width=16,t.height=16;let e=t.getContext("2d");if(e.fillStyle="#4c6a6e",e.fillRect(0,0,16,16),e.fillStyle="#c9e6db",i==="test")for(let s=2;s<16;s+=6)for(let r=2;r<16;r+=6)(s+r)%12===4&&e.fillRect(s,r,3,3);if(i==="mechanism")for(let s=2;s<16;s+=5)e.fillRect(s,3,2,9);i==="contract"&&(e.fillRect(2,3,12,2),e.fillRect(2,10,12,2)),i==="support"&&(e.fillStyle="#6f8988",e.fillRect(0,14,16,2));let n=new aa(t);return n.magFilter=$e,n.minFilter=$e,n.wrapS=n.wrapT=nr,n.colorSpace=ke,n}function iT(){try{Xe=new Vl({antialias:!1,alpha:!0,powerPreference:"high-performance"}),Xe.setPixelRatio(Math.min(devicePixelRatio,1)*.9),Xe.outputColorSpace=ke,Xe.setClearColor(1055266,0),QS.appendChild(Xe.domElement),hn=new ra,Jt=new xs(-100,100,70,-70,.1,600),Jt.position.set(145,172,182),Jt.lookAt(0,0,0),we=new Wl(Jt,Xe.domElement),we.enableRotate=!1,we.enableDamping=!1,we.screenSpacePanning=!0,we.mouseButtons.LEFT=Vn.PAN,we.mouseButtons.RIGHT=Vn.PAN,we.touches.ONE=Hn.PAN,we.touches.TWO=Hn.DOLLY_PAN,we.minZoom=.65,we.maxZoom=5,we.addEventListener("change",li),hn.add(new fa(13231337,1.8));let i=new da(16770491,2.2);i.position.set(-70,140,20),hn.add(i);let t=new be(new Ve(ri+7,.8,ai+7),new Hi({color:1913145}));t.position.y=-.5,hn.add(t),Ug=new Ve(1,1,1);for(let e of Hr){let n=new be(new Ve(e.w,.28,e.h),new Hi({color:e.id==="daemon"?2376521:e.id==="cli"?3423552:2767938}));n.position.set(e.cx,-.01,e.cz),hn.add(n);let s=new Vi(new hr(n.geometry),new Mi({color:5401453,transparent:!0,opacity:.6}));s.position.copy(n.position),hn.add(s);let r=document.createElement("button");r.className="district-label",r.dataset.district=e.id,r.innerHTML=`${Ht.districts[e.id].label}<small></small>`,r.title=Ht.districts[e.id].name+" \u2014 locate district",r.addEventListener("click",()=>rT(e.id)),it("#district-labels").appendChild(r),e.label=r}for(let e of Ht.files){let n=rs.get(e.id),s=new Gt(Xa[e.owner][0]),r=nT(e.role),a=new Hi({color:s,map:r,transparent:!0}),o=new Hi({color:s.clone().multiplyScalar(1.12),transparent:!0});tT.push(a,o);let c=new be(Ug,[a,a,o,o,a,a]);c.position.set(n.x,.4,n.z),c.scale.set(n.w,.8,n.d),c.userData={file:e.id,side:a,roof:o,tex:r},hn.add(c),Vr.set(e.id,c),zg.push(c);let l=new Vi(new hr(new Ve(n.w,.04,n.d)),new Mi({color:7245969,transparent:!0,opacity:.4}));l.position.set(n.x,.18,n.z),hn.add(l),c.userData.rim=l;let h=new _n().setFromPoints([new U(-n.w/2,0,-n.d/2),new U(n.w/2,0,n.d/2),new U(-n.w/2,0,n.d/2),new U(n.w/2,0,-n.d/2)]),u=new Vi(h,new Mi({color:13078905,transparent:!0,opacity:.8}));u.position.set(n.x,.23,n.z),u.visible=!1,hn.add(u),c.userData.cross=u}Xn=new gi,hn.add(Xn),si=new ma(void 0,16771997),hn.add(si),si.visible=!1,new ResizeObserver(Og).observe(qn),Og(),oT()}catch(i){it("#webgl-error").hidden=!1,console.warn("Pixel city renderer unavailable:",i.message)}it("#loading").hidden=!0}function Og(){if(!Xe)return;let i=qn.clientWidth,t=qn.clientHeight;Xe.setSize(i,t,!1);let e=i/t,n=Math.max(107,180/e);Jt.left=-n*e/2,Jt.right=n*e/2,Jt.top=n/2,Jt.bottom=-n/2,Jt.updateProjectionMatrix(),li()}function li(){Zu=!0}function sT(){if(Zu&&(Zu=!1,!(!Xe||!hn))){Vg++,si&&j.file!==null&&(si.setFromObject(Vr.get(j.file)),si.visible=!0),Xe.render(hn,Jt);for(let i of Hr){let t=new U(i.cx,.7,i.z+2.2).project(Jt);i.label.style.left=`${(t.x*.5+.5)*qn.clientWidth}px`,i.label.style.top=`${(-t.y*.5+.5)*qn.clientHeight}px`,i.label.style.display=t.z>1||t.x<-1.1||t.x>1.1||t.y<-1.1||t.y>1.1?"none":""}}}Wn.ticker.add(sT);function qu(){we&&(Wn.killTweensOf(Jt),Wn.killTweensOf(we.target),we.target.set(0,0,0),Jt.position.set(145,172,182),Jt.zoom=1,Jt.updateProjectionMatrix(),we.update(),j.district=null,Ya(),li())}function Gg(i,t,e=2){if(!we)return;let n=i-we.target.x,s=t-we.target.z;Jt.position.x+=n,Jt.position.z+=s,we.target.set(i,0,t),Jt.zoom=e,Jt.updateProjectionMatrix(),we.update(),li()}function rT(i){let t=Hr.find(e=>e.id===i);j.district=i,Gg(t.cx,t.cz,1.8),Ya()}function Wg(i){return i[0]?i[1]+i[2]?.55+.4*Math.sqrt(i[1]+i[2]):.55:.13}function zr(i=!0){if(!hn)return;let t=j.step===26?["apps/cli/src/cli.ts","apps/cli/src/cli-invocation-coordinator.ts","packages/daemon/src/client/daemon-client.ts"]:["apps/cli/src/cli.ts","apps/cli/src/daemon/daemon-command-dispatcher.ts","apps/cli/src/daemon/local-daemon-transport.ts"];for(let e of Ht.files){let n=Ii(e),s=Vr.get(e.id),r=rs.get(e.id),a=Wg(n),o=n[0]||n[5]>0,c=!n[0]&&n[5]>0,l=j.role!=="all"&&j.role!==e.role,h=n[1]+n[2]===0;s.visible=!!o,s.userData.rim.visible=!!o,s.userData.cross.visible=!!c;let u=c?"#72594c":Xa[e.owner][0];s.userData.side.color.set(u),s.userData.roof.color.set(u);let d=j.trace&&!t.includes(e.path);s.userData.side.opacity=s.userData.roof.opacity=d?.1:l?.13:j.trace?1:h?.24:c?.35:1,s.userData.side.depthWrite=s.userData.roof.depthWrite=!d,s.userData.rim.material.opacity=c?.9:l?.1:.35,s.userData.tex.repeat.set(Math.max(.5,r.w/2),Math.max(.35,a/3)),Wn.killTweensOf(s.scale),Wn.killTweensOf(s.position);let g=i&&!Bg.matches?.55:0;Wn.to(s.scale,{y:a,duration:g,ease:"power2.out",onUpdate:li}),Wn.to(s.position,{y:a/2+.18,duration:g,ease:"power2.out"})}for(let e of Hr){let s=Ht.files.filter(r=>r.district===e.id).filter(r=>Ii(r)[0]).length;e.label.querySelector("small").textContent=s?`${s} standing paths`:"future addresses"}Qu(),Xg(),li()}function Xg(){if(si&&(si.visible=j.file!==null,j.file!==null)){let i=Vr.get(j.file);si.setFromObject(i),si.material.color.set(16769953)}}function aT(){let i=new yc.default.Grid(ri+9,ai+9);for(let[t,e]of rs)if(Ht.snapshots[j.step][t][0])for(let n=Math.ceil(e.x+ri/2+4-e.w/2);n<=Math.floor(e.x+ri/2+4+e.w/2);n++)for(let s=Math.ceil(e.z+ai/2+4-e.d/2);s<=Math.floor(e.z+ai/2+4+e.d/2);s++)i.isInside(n,s)&&i.setWalkableAt(n,s,!1);return i}function Ha(i,t,e,n=!1){if(!i||!t)return;let s=rs.get(i.id),r=rs.get(t.id),a=aT();function o(g){let _=Math.round(g.x+ri/2+4),p=Math.round(g.z+ai/2+4);for(let m=p;m<=Math.ceil(p+g.d/2+1)&&a.isInside(_,m);m++)a.setWalkableAt(_,m,!0);return[_,p]}let c=o(s),l=o(r),u=new yc.default.AStarFinder({allowDiagonal:!1}).findPath(...c,...l,a);if(Ku.push({from:i.id,to:t.id,points:u.length}),u.length<2)return;let d=yc.default.Util.compressPath(u).map(([g,_])=>new U(g-ri/2-4,.3,_-ai/2-4));for(let g=1;g<d.length;g++){let _=d[g-1],p=d[g],m=p.clone().sub(_),f=m.length(),y=_.clone().add(p).multiplyScalar(.5),M=new be(new Ve(m.x?f+.6:1,.04,m.z?f+.6:1),new kn({color:1319722}));if(M.position.copy(y),Xn.add(M),n)for(let x=0;x<f;x+=1.5){let S=_.clone().addScaledVector(m.clone().normalize(),Math.min(f,x+.4)),w=new be(new Ve(m.x?.8:.25,.06,m.z?.8:.25),new kn({color:e}));w.position.copy(S),w.position.y=.36,Xn.add(w)}else{let x=new be(new Ve(m.x?f+.25:.3,.06,m.z?f+.25:.3),new kn({color:e}));x.position.copy(y),x.position.y=.36,Xn.add(x)}}for(let g of[i,t]){let _=rs.get(g.id),p=Wg(Ii(g)),m=new be(new Ve(.17,p+2,.17),new kn({color:e}));m.position.set(_.x,(p+2)/2+.2,_.z),Xn.add(m);let f=new be(new Ve(1.3,.75,.2),new kn({color:e}));f.position.set(_.x+.55,p+2.1,_.z),Xn.add(f)}}function Qu(){if(!Xn)return;for(;Xn.children.length;){let t=Xn.children[0];t.geometry.dispose(),t.material.dispose(),Xn.remove(t)}let i=t=>Wa.get(t);if(Yu=0,Ku=[],j.roads&&j.step>0){let t=Ht.prs[j.step-1].renames.filter(s=>i(s.from)&&i(s.to)&&i(s.from).district!==i(s.to).district),e=j.file!==null?t.filter(s=>i(s.from).id===j.file||i(s.to).id===j.file):[],n=e.length?e:t.slice(0,5);for(let s of n)Ha(i(s.from),i(s.to),7985619,!0),Yu++;it("#road-caption").textContent=t.length?`${n.length} of ${t.length} cross-district renames at this PR \xB7 schematic`:"No cross-district Git renames at this PR \xB7 other boundary changes may exist",it(".road-caption i").style.background="#79d9d3"}else j.step<26?(Ha(i("apps/cli/src/cli.ts"),i("apps/cli/src/daemon/daemon-command-dispatcher.ts"),16110486),Ha(i("apps/cli/src/daemon/daemon-command-dispatcher.ts"),i("apps/cli/src/daemon/local-daemon-transport.ts"),16110486)):(Ha(i("apps/cli/src/cli.ts"),i("apps/cli/src/cli-invocation-coordinator.ts"),16110486),Ha(i("apps/cli/src/cli-invocation-coordinator.ts"),i("packages/daemon/src/client/daemon-client.ts"),16110486)),it("#road-caption").textContent=j.step===26?"CLI entry \u2192 invocation coordinator \u2192 DaemonClient":"CLI entry \u2192 CLI dispatcher \u2192 local transport",it(".road-caption i").style.background="#f5d396"}function oT(){let i=new pa,t=new It,e=null;function n(s){let r=Xe.domElement.getBoundingClientRect();return t.set((s.clientX-r.left)/r.width*2-1,-(s.clientY-r.top)/r.height*2+1),i.setFromCamera(t,Jt),i.intersectObjects(zg.filter(a=>a.visible&&a.userData.side.opacity>.2),!1)[0]}Xe.domElement.addEventListener("pointerdown",s=>{e=[s.clientX,s.clientY]}),Xe.domElement.addEventListener("pointerup",s=>{if(e&&Math.hypot(s.clientX-e[0],s.clientY-e[1])<6){let r=n(s);r&&(ks(r.object.userData.file),j.roads&&(Qu(),li()))}e=null}),Xe.domElement.addEventListener("pointermove",s=>{let r=n(s),a=it("#tooltip");if(!r||e){a.hidden=!0;return}let o=Ht.files[r.object.userData.file],c=Ii(o),l=qn.getBoundingClientRect();a.innerHTML=`<b>${oi(o.path.split("/").at(-1))}</b>${oi(Ht.districts[o.district].label)} / ${oi(o.role)}<br>${c[0]?Bs(c[1]+c[2])+" changed lines vs main":"Removed path \xB7 foundation"}<br>Click to inspect`,a.hidden=!1,a.style.left=`${Math.max(8,Math.min(qn.clientWidth-270,s.clientX-l.left+13))}px`,a.style.top=`${Math.min(qn.clientHeight-95,s.clientY-l.top+13)}px`}),Xe.domElement.addEventListener("pointerleave",()=>it("#tooltip").hidden=!0)}function Ya(){let i=it("#search").value.trim().toLowerCase(),t=j.file,e=Ht.files.filter(s=>(!j.district||s.district===j.district)&&s.path.toLowerCase().includes(i)),n=[`<option value="">${e.length} surveyed paths${j.district?" in "+Ht.districts[j.district].label:""}</option>`];for(let s of e){let r=Ii(s);n.push(`<option value="${s.id}">${r[0]?"\u25B0":r[5]?"\xD7":"\xB7"} ${oi(s.path)}</option>`)}it("#file-picker").innerHTML=n.join(""),it("#file-picker").value=t===null?"":String(t)}function qg(){let i=j.file===null?null:Ht.files[j.file];if(it("#focus-block").disabled=!i,it("#file-receipt").disabled=!i,!i){it("#block-details").innerHTML='<p class="block-limits">Choose a building in the city or a path above. Selection stays put when you move through PRs.</p>';return}let t=Ii(i),e=!!t[0],n=t[5],s=e?t[1]+t[2]?"Standing \xB7 changed":"Standing \xB7 unchanged vs main":n?"Removed \xB7 foundation":"Not yet present",r=j.step>0?Ht.prs[j.step-1].renames.find(a=>a.from===i.path||a.to===i.path):null;it("#block-details").innerHTML=`<h3 class="block-name">${oi(i.path.split("/").at(-1))}</h3><p class="block-path">${oi(i.path)}</p><dl class="block-facts"><dt>District</dt><dd>${oi(Ht.districts[i.district].name)}</dd><dt>Concern</dt><dd style="color:${Xa[i.owner][0]}">${Xa[i.owner][1]}</dd><dt>Windows</dt><dd>${i.role} <span style="color:#8da5a9">(path rule)</span></dd><dt>State</dt><dd class="state-chip ${e?"":"removed"}">${s}</dd><dt>vs main</dt><dd>+${Bs(t[1])} / \u2212${Bs(t[2])} lines</dd><dt>This PR</dt><dd>+${Bs(t[3])} / \u2212${Bs(t[4])} lines</dd><dt>Last edit</dt><dd>${n?"#"+Ht.prs[n-1].number:"main baseline"}</dd></dl>${r?`<button class="text-button" id="counterpart">Find ${r.from===i.path?"new":"old"} address \u2192</button>`:""}<p class="block-limits">${e?"Height uses the square root of the total changed lines above.":"An empty lot has no height encoding; the deleted text remains in the receipt."}</p>`,r&&it("#counterpart").addEventListener("click",()=>ks(Wa.get(r.from===i.path?r.to:r.from).id))}function td(){let i=j.step?Ht.prs[j.step-1]:null,t=ju(j.step);it("#scene-label").textContent=`${String(j.step).padStart(2,"0")} / 26 \xB7 ${i?"#"+i.number:"MAIN"}`,it("#revision-number").textContent=`SKYLINE ${j.step} / 26${i?" \xB7 #"+i.number:""}`,it("#revision-title").textContent=i?i.title:"Before the stack",it("#revision-counts").innerHTML=i?`+${Bs(i.surface.add)} <span class="minus">/ \u2212${Bs(i.surface.delete)}</span><small>${i.surface.paths} physical text paths \xB7 this PR, moves counted at both addresses</small>`:"0 changed lines<small>Only paths touched later in this stack are surveyed.</small>",it("#revision-reading").textContent=j.step===0?"The surveyed baseline has daemon concerns inside CLI. Future addresses are empty.":t.summary,it("#step-reason").disabled=!i,it("#map-phase").textContent=j.step===26?"CUTOVER / DAEMON OWNS THE MECHANISMS":j.step===25?"STAGED / CLI STILL ACTIVE":j.step>=7?"DAEMON DISTRICT EXISTS / CLI PATH STILL LOCAL":j.step===0?"MAIN / THE SURVEYED BASELINE":"REUSABLE WORK FINDS ITS OWNER",it("#scrub").value=j.step,it("#scrub").setAttribute("aria-valuetext",i?`PR ${i.number}: ${i.title}`:"main baseline"),is("#milestones button").forEach((e,n)=>{e.classList.toggle("active",n===j.step),e.classList.toggle("passed",n<=j.step),e.setAttribute("aria-current",n===j.step?"step":"false")}),it("#previous").disabled=j.step===0,it("#next").disabled=j.step===26,Ya(),qg()}function un(){j.playing=!1,Ju?.kill(),it("#play").innerHTML="\u25B6 <span>Grow the city</span>",it("#play").setAttribute("aria-label","Play through skylines")}function Yg(){if(j.playing){if(j.step===26){un();return}Dn(j.step+1,{history:!1}),qa(!0),Ju=Wn.delayedCall(1.45,Yg)}}function lT(){if(j.playing){un();return}j.step===26&&Dn(0),j.playing=!0,it("#play").innerHTML="\u2161 <span>Pause skyline</span>",it("#play").setAttribute("aria-label","Pause skyline playback"),Ju=Wn.delayedCall(1.45,Yg)}function ed(i,t){un(),kg=document.activeElement,it("#receipt-kind").textContent=i,it("#receipt-title").textContent=t,it("#receipt-meta").textContent="",it("#receipt-content").textContent="Loading local receipt\u2026",it(".receipt-tabs").hidden=i!=="PHYSICAL PATH RECEIPT",it("#receipt").showModal(),it("#close-receipt").focus()}function vc(i,t=!1){return"<pre>"+i.split(`
`).map((e,n)=>`<span class="source-line ${t&&e.startsWith("+")?"add":t&&e.startsWith("-")?"del":""}"><span class="ln">${n+1}</span>${oi(e)}</span>`).join("")+"</pre>"}async function cT(i){return window.CITY_SOURCES[i]?window.CITY_SOURCES[i]:new Promise((t,e)=>{let n=document.createElement("script");n.src=`evidence/files/${i}.js`,n.onload=()=>t(window.CITY_SOURCES[i]),n.onerror=()=>e(new Error("Local receipt could not be loaded.")),document.head.append(n)})}async function Fg(i,t=j.step){Ga={id:i,step:t},ss="source",ed("PHYSICAL PATH RECEIPT",Ht.files[i].path),await $u()}async function $u(){if(!Ga)return;let{id:i,step:t}=Ga,e=Ht.files[i],n=Ht.snapshots[t][i];it("#show-source").classList.toggle("active",ss==="source"),it("#show-diff").classList.toggle("active",ss==="diff");try{let s=await cT(i);if(Ga.id!==i||Ga.step!==t)return;let r=!!n[0],a=n[5],o=Ht.revisions[t];it("#receipt-meta").textContent=ss==="source"?`${r?"Source exists at":"Path absent at"} ${t?"#"+Ht.prs[t-1].number:"main"} \xB7 ${o}${r?" \xB7 blob "+n[6]:""}`:a?`Last edit to this physical path: #${Ht.prs[a-1].number} \xB7 ${Ht.revisions[a-1]} \u2192 ${Ht.revisions[a]} \xB7 no rename folding`:"No edit before this skyline; baseline source only.";let c=ss==="source"?r?s.sources[n[6]]:"This physical path does not exist at the selected skyline. Open \u201CLast change to this path\u201D for its deletion, or choose an earlier skyline.":a?s.diffs[a]:"No change from the main baseline at this skyline.";it("#receipt-content").innerHTML=vc(c,ss==="diff"),it("#github-source").href=`https://github.com/mohasarc/symnav/blob/${o}/${e.path}`,it("#github-source").hidden=!r}catch(s){it("#receipt-content").textContent=s.message}}function Zg(i){ed("STATED REASONS / FROZEN PR BODIES",i.title),it("#receipt-meta").textContent=i.reason,it("#receipt-content").innerHTML=i.prs.map(t=>{let e=Ht.prs.find(n=>n.number===t);return`<h3>#${t} \xB7 ${oi(e.title)}</h3><p class="block-limits">head ${e.sha} \xB7 supplied bundle, not a live PR</p>${vc(e.body)}`}).join("")}function hT(){let i=Ht.prs[j.step-1];i&&Zg({title:"#"+i.number+" \xB7 "+i.title,reason:"The supplied PR body is the author\u2019s evidence. It is not a correctness or parity result.",prs:[i.number]})}function uT(){ed("RENAME-AWARE TEST RECEIPT","A moved test changes what it observes"),it("#receipt-meta").textContent=`#147 \u2192 #148 \xB7 ${Ht.revisions[24]} \u2192 ${Ht.revisions[25]} \xB7 removed worker observations and the direct host replacement`,it("#receipt-content").innerHTML="<h3>Worker test: generic fixture, removed duration fields and mismatch case</h3>"+vc(Ng.selectedWorkerPatch,!0)+"<h3>Host executor: direct version rejection restored</h3>"+vc(Ng.hostVersionPatch,!0)}function dT(){it("#milestones").innerHTML=["main",...Ht.prs.map(i=>i.number)].map((i,t)=>`<button data-index="${t}" class="${[5,7,13,24,25,26].includes(t)?"milestone":""}" title="${t?"#"+i+" \u2014 "+oi(Ht.prs[t-1].title):"main baseline"}" aria-label="${t?"Skyline "+t+", PR "+i:"Main baseline"}">${i}</button>`).join(""),is("#milestones button").forEach(i=>i.addEventListener("click",()=>{un(),Dn(Number(i.dataset.index))})),is("[data-step]").forEach(i=>i.addEventListener("click",()=>{un(),Dn(Number(i.dataset.step))})),it("#scrub").addEventListener("input",()=>{un(),Dn(Number(it("#scrub").value),{history:!1})}),it("#scrub").addEventListener("change",()=>qa()),it("#previous").addEventListener("click",()=>{un(),Dn(j.step-1)}),it("#next").addEventListener("click",()=>{un(),Dn(j.step+1)}),it("#play").addEventListener("click",lT),it("#fit").addEventListener("click",qu),it("#zoom-in").addEventListener("click",()=>{Jt&&(Jt.zoom=Math.min(5,Jt.zoom*1.3),Jt.updateProjectionMatrix(),li())}),it("#zoom-out").addEventListener("click",()=>{Jt&&(Jt.zoom=Math.max(.65,Jt.zoom/1.3),Jt.updateProjectionMatrix(),li())}),it("#trace-road").addEventListener("click",()=>{j.trace=!j.trace,j.roads=!1,it("#trace-road").setAttribute("aria-pressed",j.trace),it("#road-toggle").setAttribute("aria-pressed","false"),zr(!1)}),it("#road-toggle").addEventListener("click",()=>{j.roads=!j.roads,j.trace=!1,it("#trace-road").setAttribute("aria-pressed","false"),it("#road-toggle").setAttribute("aria-pressed",j.roads),zr(!1)}),is("[data-role]").forEach(i=>i.addEventListener("click",()=>{j.role=i.dataset.role,is("[data-role]").forEach(t=>t.classList.toggle("active",t===i)),zr(!1)})),it("#search").addEventListener("input",()=>{j.district=null,Ya()}),it("#file-picker").addEventListener("change",()=>ks(it("#file-picker").value===""?null:Number(it("#file-picker").value))),it("#clear-block").addEventListener("click",()=>ks(null)),it("#focus-block").addEventListener("click",()=>{if(j.file!==null){let i=rs.get(j.file);Gg(i.x,i.z,2.2)}}),it("#file-receipt").addEventListener("click",()=>{j.file!==null&&Fg(j.file)}),it("#step-reason").addEventListener("click",hT),is("[data-reading-step]").forEach(i=>i.addEventListener("click",()=>{let t=Fs.find(n=>n.id===i.dataset.readingStep);un(),Dn(t.step,{history:!1}),j.reading=t.id;let e=t.files.map(n=>Wa.get(n)).find(Boolean);e&&ks(e.id,{history:!1}),qa(),qu(),qn.scrollIntoView({behavior:Bg.matches?"instant":"smooth",block:"center"})})),is("[data-reading-receipt]").forEach(i=>i.addEventListener("click",()=>Zg(Fs.find(t=>t.id===i.dataset.readingReceipt)))),is("[data-source-path]").forEach(i=>i.addEventListener("click",()=>{let t=Wa.get(i.dataset.sourcePath);t&&Fg(t.id,Number(i.dataset.sourceStep))})),it("#worker-patch").addEventListener("click",uT),it("#close-receipt").addEventListener("click",()=>it("#receipt").close()),it("#receipt").addEventListener("close",()=>{kg?.focus()}),it("#show-source").addEventListener("click",()=>{ss="source",$u()}),it("#show-diff").addEventListener("click",()=>{ss="diff",$u()}),qn.addEventListener("keydown",i=>{i.key==="ArrowRight"&&(i.preventDefault(),un(),Dn(j.step+1)),i.key==="ArrowLeft"&&(i.preventDefault(),un(),Dn(j.step-1)),i.key==="Home"&&(i.preventDefault(),un(),Dn(0)),i.key==="End"&&(i.preventDefault(),un(),Dn(26)),i.key==="Escape"&&(ks(null),qu())}),window.addEventListener("popstate",()=>{un(),Hg(),zr(!1),td()}),it("#owner-swatches").innerHTML=Object.entries(Xa).map(([i,[t,e]])=>`<span><i style="background:${t}"></i>${e}</span>`).join(""),it("#census").textContent=`${Ht.files.length} touched text paths surveyed. District = package/app; repository is an infrastructure annex.`}Hg();dT();iT();zr(!1);td();j.file===null&&j.step===25&&ks(Wa.get("packages/daemon/src/client/daemon-client.ts").id,{history:!1});window.CITY_APP={get state(){return{...j}},get renderInfo(){return{ready:!!Xe,frameNo:Vg,standing:Ht.files.filter(i=>Ii(i)[0]).length,removed:Ht.files.filter(i=>!Ii(i)[0]&&Ii(i)[5]).length,meshVisible:[...Vr.values()].filter(i=>i.visible).length,movedRoadCount:Yu,roadRoutes:Ku,zoom:Jt?.zoom}},project(i){if(!Jt)return null;let t=Vr.get(i),e=t.position.clone();e.y+=t.scale.y/2,e.project(Jt);let n=qn.getBoundingClientRect();return{x:(e.x*.5+.5)*n.width+n.left,y:(-e.y*.5+.5)*n.height+n.top}},districts:Hr.map(({id:i,x:t,z:e,w:n,h:s})=>({id:i,x:t,z:e,w:n,h:s}))};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.13.0
   * https://gsap.com
   *
   * @license Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.13.0
   * https://gsap.com
   *
   * Copyright 2008-2025, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
