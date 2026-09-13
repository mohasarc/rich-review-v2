(()=>{function Xe(e,t){return e==null||t==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function dt(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function cn(e){let t,n,r;e.length!==2?(t=Xe,n=(s,c)=>Xe(e(s),c),r=(s,c)=>e(s)-c):(t=e===Xe||e===dt?e:Zx,n=e,r=e);function o(s,c,u=0,l=s.length){if(u<l){if(t(c,c)!==0)return l;do{let d=u+l>>>1;n(s[d],c)<0?u=d+1:l=d}while(u<l)}return u}function i(s,c,u=0,l=s.length){if(u<l){if(t(c,c)!==0)return l;do{let d=u+l>>>1;n(s[d],c)<=0?u=d+1:l=d}while(u<l)}return u}function a(s,c,u=0,l=s.length){let d=o(s,c,u,l-1);return d>u&&r(s[d-1],c)>-r(s[d],c)?d-1:d}return{left:o,center:a,right:i}}function Zx(){return 0}function ei(e){return e===null?NaN:+e}function*Dm(e,t){if(t===void 0)for(let n of e)n!=null&&(n=+n)>=n&&(yield n);else{let n=-1;for(let r of e)(r=t(r,++n,e))!=null&&(r=+r)>=r&&(yield r)}}var Mm=cn(Xe),Rm=Mm.right,Jx=Mm.left,ew=cn(ei).center,ir=Rm;function tw(e){return e.length|0}function nw(e){return!(e>0)}function rw(e){return typeof e!="object"||"length"in e?e:Array.from(e)}function ow(e){return t=>e(...t)}function ja(...e){let t=typeof e[e.length-1]=="function"&&ow(e.pop());e=e.map(rw);let n=e.map(tw),r=e.length-1,o=new Array(r+1).fill(0),i=[];if(r<0||n.some(nw))return i;for(;;){i.push(o.map((s,c)=>e[c][s]));let a=r;for(;++o[a]===n[a];){if(a===0)return t?i.map(t):i;o[a--]=0}}}function Wr(e,t){let n=0,r,o=0,i=0;if(t===void 0)for(let a of e)a!=null&&(a=+a)>=a&&(r=a-o,o+=r/++n,i+=r*(a-o));else{let a=-1;for(let s of e)(s=t(s,++a,e))!=null&&(s=+s)>=s&&(r=s-o,o+=r/++n,i+=r*(s-o))}if(n>1)return i/(n-1)}function $a(e,t){let n=Wr(e,t);return n&&Math.sqrt(n)}function et(e,t){let n,r;if(t===void 0)for(let o of e)o!=null&&(n===void 0?o>=o&&(n=r=o):(n>o&&(n=o),r<o&&(r=o)));else{let o=-1;for(let i of e)(i=t(i,++o,e))!=null&&(n===void 0?i>=i&&(n=r=i):(n>i&&(n=i),r<i&&(r=i)))}return[n,r]}var at=class{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){let n=this._partials,r=0;for(let o=0;o<this._n&&o<32;o++){let i=n[o],a=t+i,s=Math.abs(t)<Math.abs(i)?t-(a-i):i-(a-t);s&&(n[r++]=s),t=a}return n[r]=t,this._n=r+1,this}valueOf(){let t=this._partials,n=this._n,r,o,i,a=0;if(n>0){for(a=t[--n];n>0&&(r=a,o=t[--n],a=r+o,i=o-(a-r),!i););n>0&&(i<0&&t[n-1]<0||i>0&&t[n-1]>0)&&(o=i*2,r=a+o,o==r-a&&(a=r))}return a}};var pt=class extends Map{constructor(t,n=qm){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),t!=null)for(let[r,o]of t)this.set(r,o)}get(t){return super.get(bu(this,t))}has(t){return super.has(bu(this,t))}set(t,n){return super.set(Em(this,t),n)}delete(t){return super.delete(Im(this,t))}},Dt=class extends Set{constructor(t,n=qm){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),t!=null)for(let r of t)this.add(r)}has(t){return super.has(bu(this,t))}add(t){return super.add(Em(this,t))}delete(t){return super.delete(Im(this,t))}};function bu({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):n}function Em({_intern:e,_key:t},n){let r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function Im({_intern:e,_key:t},n){let r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function qm(e){return e!==null&&typeof e=="object"?e.valueOf():e}function ti(e){return e}function ni(e,...t){return wu(e,ti,ti,t)}function Ur(e,t,...n){return wu(e,ti,t,n)}function xu(e,t,...n){return wu(e,Array.from,t,n)}function wu(e,t,n,r){return(function o(i,a){if(a>=r.length)return n(i);let s=new pt,c=r[a++],u=-1;for(let l of i){let d=c(l,++u,i),f=s.get(d);f?f.push(l):s.set(d,[l])}for(let[l,d]of s)s.set(l,o(d,a));return t(s)})(e,0)}function ku(e,t){return Array.from(t,n=>e[n])}function oi(e,...t){if(typeof e[Symbol.iterator]!="function")throw new TypeError("values is not iterable");e=Array.from(e);let[n]=t;if(n&&n.length!==2||t.length>1){let r=Uint32Array.from(e,(o,i)=>i);return t.length>1?(t=t.map(o=>e.map(o)),r.sort((o,i)=>{for(let a of t){let s=ri(a[o],a[i]);if(s)return s}})):(n=e.map(n),r.sort((o,i)=>ri(n[o],n[i]))),ku(e,r)}return e.sort(Su(n))}function Su(e=Xe){if(e===Xe)return ri;if(typeof e!="function")throw new TypeError("compare is not a function");return(t,n)=>{let r=e(t,n);return r||r===0?r:(e(n,n)===0)-(e(t,t)===0)}}function ri(e,t){return(e==null||!(e>=e))-(t==null||!(t>=t))||(e<t?-1:e>t?1:0)}var iw=Math.sqrt(50),aw=Math.sqrt(10),sw=Math.sqrt(2);function za(e,t,n){let r=(t-e)/Math.max(0,n),o=Math.floor(Math.log10(r)),i=r/Math.pow(10,o),a=i>=iw?10:i>=aw?5:i>=sw?2:1,s,c,u;return o<0?(u=Math.pow(10,-o)/a,s=Math.round(e*u),c=Math.round(t*u),s/u<e&&++s,c/u>t&&--c,u=-u):(u=Math.pow(10,o)*a,s=Math.round(e/u),c=Math.round(t/u),s*u<e&&++s,c*u>t&&--c),c<s&&.5<=n&&n<2?za(e,t,n*2):[s,c,u]}function ln(e,t,n){if(t=+t,e=+e,n=+n,!(n>0))return[];if(e===t)return[e];let r=t<e,[o,i,a]=r?za(t,e,n):za(e,t,n);if(!(i>=o))return[];let s=i-o+1,c=new Array(s);if(r)if(a<0)for(let u=0;u<s;++u)c[u]=(i-u)/-a;else for(let u=0;u<s;++u)c[u]=(i-u)*a;else if(a<0)for(let u=0;u<s;++u)c[u]=(o+u)/-a;else for(let u=0;u<s;++u)c[u]=(o+u)*a;return c}function ii(e,t,n){return t=+t,e=+e,n=+n,za(e,t,n)[2]}function Vr(e,t,n){t=+t,e=+e,n=+n;let r=t<e,o=r?ii(t,e,n):ii(e,t,n);return(r?-1:1)*(o<0?1/-o:o)}function He(e,t){let n;if(t===void 0)for(let r of e)r!=null&&(n<r||n===void 0&&r>=r)&&(n=r);else{let r=-1;for(let o of e)(o=t(o,++r,e))!=null&&(n<o||n===void 0&&o>=o)&&(n=o)}return n}function Ya(e,t){let n,r=-1,o=-1;if(t===void 0)for(let i of e)++o,i!=null&&(n<i||n===void 0&&i>=i)&&(n=i,r=o);else for(let i of e)(i=t(i,++o,e))!=null&&(n<i||n===void 0&&i>=i)&&(n=i,r=o);return r}function At(e,t){let n;if(t===void 0)for(let r of e)r!=null&&(n>r||n===void 0&&r>=r)&&(n=r);else{let r=-1;for(let o of e)(o=t(o,++r,e))!=null&&(n>o||n===void 0&&o>=o)&&(n=o)}return n}function Ha(e,t){let n,r=-1,o=-1;if(t===void 0)for(let i of e)++o,i!=null&&(n>i||n===void 0&&i>=i)&&(n=i,r=o);else for(let i of e)(i=t(i,++o,e))!=null&&(n>i||n===void 0&&i>=i)&&(n=i,r=o);return r}function Wa(e,t,n=0,r=1/0,o){if(t=Math.floor(t),n=Math.floor(Math.max(0,n)),r=Math.floor(Math.min(e.length-1,r)),!(n<=t&&t<=r))return e;for(o=o===void 0?ri:Su(o);r>n;){if(r-n>600){let c=r-n+1,u=t-n+1,l=Math.log(c),d=.5*Math.exp(2*l/3),f=.5*Math.sqrt(l*d*(c-d)/c)*(u-c/2<0?-1:1),p=Math.max(n,Math.floor(t-u*d/c+f)),m=Math.min(r,Math.floor(t+(c-u)*d/c+f));Wa(e,t,p,m,o)}let i=e[t],a=n,s=r;for(ai(e,n,t),o(e[r],i)>0&&ai(e,n,r);a<s;){for(ai(e,a,s),++a,--s;o(e[a],i)<0;)++a;for(;o(e[s],i)>0;)--s}o(e[n],i)===0?ai(e,n,s):(++s,ai(e,s,r)),s<=t&&(n=s+1),t<=s&&(r=s-1)}return e}function ai(e,t,n){let r=e[t];e[t]=e[n],e[n]=r}function un(e,t,n){if(e=Float64Array.from(Dm(e,n)),!(!(r=e.length)||isNaN(t=+t))){if(t<=0||r<2)return At(e);if(t>=1)return He(e);var r,o=(r-1)*t,i=Math.floor(o),a=He(Wa(e,i).subarray(0,i+1)),s=At(e.subarray(i+1));return a+(s-a)*(o-i)}}function Tu(e,t,n=ei){if(!(!(r=e.length)||isNaN(t=+t))){if(t<=0||r<2)return+n(e[0],0,e);if(t>=1)return+n(e[r-1],r-1,e);var r,o=(r-1)*t,i=Math.floor(o),a=+n(e[i],i,e),s=+n(e[i+1],i+1,e);return a+(s-a)*(o-i)}}function Ua(e,t){let n=0,r=0;if(t===void 0)for(let o of e)o!=null&&(o=+o)>=o&&(++n,r+=o);else{let o=-1;for(let i of e)(i=t(i,++o,e))!=null&&(i=+i)>=i&&(++n,r+=i)}if(n)return r/n}function ar(e,t){return un(e,.5,t)}function*lw(e){for(let t of e)yield*t}function Gr(e){return Array.from(lw(e))}function Va(e,t){let n=new pt;if(t===void 0)for(let i of e)i!=null&&i>=i&&n.set(i,(n.get(i)||0)+1);else{let i=-1;for(let a of e)(a=t(a,++i,e))!=null&&a>=a&&n.set(a,(n.get(a)||0)+1)}let r,o=0;for(let[i,a]of n)a>o&&(o=a,r=i);return r}function Ga(e,t=uw){let n=[],r,o=!1;for(let i of e)o&&n.push(t(r,i)),r=i,o=!0;return n}function uw(e,t){return[e,t]}function sr(e,t,n){e=+e,t=+t,n=(o=arguments.length)<2?(t=e,e=0,1):o<3?1:+n;for(var r=-1,o=Math.max(0,Math.ceil((t-e)/n))|0,i=new Array(o);++r<o;)i[r]=e+r*n;return i}function cr(e,t){let n=0;if(t===void 0)for(let r of e)(r=+r)&&(n+=r);else{let r=-1;for(let o of e)(o=+t(o,++r,e))&&(n+=o)}return n}function An(e){if(typeof e[Symbol.iterator]!="function")throw new TypeError("values is not iterable");return Array.from(e).reverse()}function Pm(e){return e}var Cu=1,_u=2,Du=3,Ka=4,Bm=1e-6;function fw(e){return"translate("+e+",0)"}function dw(e){return"translate(0,"+e+")"}function pw(e){return t=>+e(t)}function mw(e,t){return t=Math.max(0,e.bandwidth()-t*2)/2,e.round()&&(t=Math.round(t)),n=>+e(n)+t}function hw(){return!this.__axis}function yw(e,t){var n=[],r=null,o=null,i=6,a=6,s=3,c=typeof window<"u"&&window.devicePixelRatio>1?0:.5,u=e===Cu||e===Ka?-1:1,l=e===Ka||e===_u?"x":"y",d=e===Cu||e===Du?fw:dw;function f(p){var m=r??(t.ticks?t.ticks.apply(t,n):t.domain()),h=o??(t.tickFormat?t.tickFormat.apply(t,n):Pm),y=Math.max(i,0)+s,b=t.range(),g=+b[0]+c,w=+b[b.length-1]+c,v=(t.bandwidth?mw:pw)(t.copy(),c),S=p.selection?p.selection():p,x=S.selectAll(".domain").data([null]),k=S.selectAll(".tick").data(m,t).order(),T=k.exit(),_=k.enter().append("g").attr("class","tick"),I=k.select("line"),D=k.select("text");x=x.merge(x.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),k=k.merge(_),I=I.merge(_.append("line").attr("stroke","currentColor").attr(l+"2",u*i)),D=D.merge(_.append("text").attr("fill","currentColor").attr(l,u*y).attr("dy",e===Cu?"0em":e===Du?"0.71em":"0.32em")),p!==S&&(x=x.transition(p),k=k.transition(p),I=I.transition(p),D=D.transition(p),T=T.transition(p).attr("opacity",Bm).attr("transform",function(R){return isFinite(R=v(R))?d(R+c):this.getAttribute("transform")}),_.attr("opacity",Bm).attr("transform",function(R){var O=this.parentNode.__axis;return d((O&&isFinite(O=O(R))?O:v(R))+c)})),T.remove(),x.attr("d",e===Ka||e===_u?a?"M"+u*a+","+g+"H"+c+"V"+w+"H"+u*a:"M"+c+","+g+"V"+w:a?"M"+g+","+u*a+"V"+c+"H"+w+"V"+u*a:"M"+g+","+c+"H"+w),k.attr("opacity",1).attr("transform",function(R){return d(v(R)+c)}),I.attr(l+"2",u*i),D.attr(l,u*y).text(h),S.filter(hw).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",e===_u?"start":e===Ka?"end":"middle"),S.each(function(){this.__axis=v})}return f.scale=function(p){return arguments.length?(t=p,f):t},f.ticks=function(){return n=Array.from(arguments),f},f.tickArguments=function(p){return arguments.length?(n=p==null?[]:Array.from(p),f):n.slice()},f.tickValues=function(p){return arguments.length?(r=p==null?null:Array.from(p),f):r&&r.slice()},f.tickFormat=function(p){return arguments.length?(o=p,f):o},f.tickSize=function(p){return arguments.length?(i=a=+p,f):i},f.tickSizeInner=function(p){return arguments.length?(i=+p,f):i},f.tickSizeOuter=function(p){return arguments.length?(a=+p,f):a},f.tickPadding=function(p){return arguments.length?(s=+p,f):s},f.offset=function(p){return arguments.length?(c=+p,f):c},f}function Mu(e){return yw(Du,e)}var gw={value:()=>{}};function Lm(){for(var e=0,t=arguments.length,n={},r;e<t;++e){if(!(r=arguments[e]+"")||r in n||/[\s.]/.test(r))throw new Error("illegal type: "+r);n[r]=[]}return new Xa(n)}function Xa(e){this._=e}function vw(e,t){return e.trim().split(/^|\s+/).map(function(n){var r="",o=n.indexOf(".");if(o>=0&&(r=n.slice(o+1),n=n.slice(0,o)),n&&!t.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:r}})}Xa.prototype=Lm.prototype={constructor:Xa,on:function(e,t){var n=this._,r=vw(e+"",n),o,i=-1,a=r.length;if(arguments.length<2){for(;++i<a;)if((o=(e=r[i]).type)&&(o=bw(n[o],e.name)))return o;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++i<a;)if(o=(e=r[i]).type)n[o]=Am(n[o],e.name,t);else if(t==null)for(o in n)n[o]=Am(n[o],e.name,null);return this},copy:function(){var e={},t=this._;for(var n in t)e[n]=t[n].slice();return new Xa(e)},call:function(e,t){if((o=arguments.length-2)>0)for(var n=new Array(o),r=0,o,i;r<o;++r)n[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=this._[e],r=0,o=i.length;r<o;++r)i[r].value.apply(t,n)},apply:function(e,t,n){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],o=0,i=r.length;o<i;++o)r[o].value.apply(t,n)}};function bw(e,t){for(var n=0,r=e.length,o;n<r;++n)if((o=e[n]).name===t)return o.value}function Am(e,t,n){for(var r=0,o=e.length;r<o;++r)if(e[r].name===t){e[r]=gw,e=e.slice(0,r).concat(e.slice(r+1));break}return n!=null&&e.push({name:t,value:n}),e}var Ru=Lm;var Qa="http://www.w3.org/1999/xhtml",Lt={svg:"http://www.w3.org/2000/svg",xhtml:Qa,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function fn(e){var t=e+="",n=t.indexOf(":");return n>=0&&(t=e.slice(0,n))!=="xmlns"&&(e=e.slice(n+1)),Lt.hasOwnProperty(t)?{space:Lt[t],local:e}:e}function xw(e){return function(){var t=this.ownerDocument,n=this.namespaceURI;return n===Qa&&t.documentElement.namespaceURI===Qa?t.createElement(e):t.createElementNS(n,e)}}function ww(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function dn(e){var t=fn(e);return(t.local?ww:xw)(t)}function kw(){}function lr(e){return e==null?kw:function(){return this.querySelector(e)}}function Fm(e){typeof e!="function"&&(e=lr(e));for(var t=this._groups,n=t.length,r=new Array(n),o=0;o<n;++o)for(var i=t[o],a=i.length,s=r[o]=new Array(a),c,u,l=0;l<a;++l)(c=i[l])&&(u=e.call(c,c.__data__,l,i))&&("__data__"in c&&(u.__data__=c.__data__),s[l]=u);return new be(r,this._parents)}function Eu(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Sw(){return[]}function si(e){return e==null?Sw:function(){return this.querySelectorAll(e)}}function Tw(e){return function(){return Eu(e.apply(this,arguments))}}function Om(e){typeof e=="function"?e=Tw(e):e=si(e);for(var t=this._groups,n=t.length,r=[],o=[],i=0;i<n;++i)for(var a=t[i],s=a.length,c,u=0;u<s;++u)(c=a[u])&&(r.push(e.call(c,c.__data__,u,a)),o.push(c));return new be(r,o)}function ci(e){return function(){return this.matches(e)}}function Za(e){return function(t){return t.matches(e)}}var Cw=Array.prototype.find;function _w(e){return function(){return Cw.call(this.children,e)}}function Dw(){return this.firstElementChild}function Nm(e){return this.select(e==null?Dw:_w(typeof e=="function"?e:Za(e)))}var Mw=Array.prototype.filter;function Rw(){return Array.from(this.children)}function Ew(e){return function(){return Mw.call(this.children,e)}}function jm(e){return this.selectAll(e==null?Rw:Ew(typeof e=="function"?e:Za(e)))}function $m(e){typeof e!="function"&&(e=ci(e));for(var t=this._groups,n=t.length,r=new Array(n),o=0;o<n;++o)for(var i=t[o],a=i.length,s=r[o]=[],c,u=0;u<a;++u)(c=i[u])&&e.call(c,c.__data__,u,i)&&s.push(c);return new be(r,this._parents)}function Ja(e){return new Array(e.length)}function zm(){return new be(this._enter||this._groups.map(Ja),this._parents)}function li(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}li.prototype={constructor:li,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Ym(e){return function(){return e}}function Iw(e,t,n,r,o,i){for(var a=0,s,c=t.length,u=i.length;a<u;++a)(s=t[a])?(s.__data__=i[a],r[a]=s):n[a]=new li(e,i[a]);for(;a<c;++a)(s=t[a])&&(o[a]=s)}function qw(e,t,n,r,o,i,a){var s,c,u=new Map,l=t.length,d=i.length,f=new Array(l),p;for(s=0;s<l;++s)(c=t[s])&&(f[s]=p=a.call(c,c.__data__,s,t)+"",u.has(p)?o[s]=c:u.set(p,c));for(s=0;s<d;++s)p=a.call(e,i[s],s,i)+"",(c=u.get(p))?(r[s]=c,c.__data__=i[s],u.delete(p)):n[s]=new li(e,i[s]);for(s=0;s<l;++s)(c=t[s])&&u.get(f[s])===c&&(o[s]=c)}function Pw(e){return e.__data__}function Hm(e,t){if(!arguments.length)return Array.from(this,Pw);var n=t?qw:Iw,r=this._parents,o=this._groups;typeof e!="function"&&(e=Ym(e));for(var i=o.length,a=new Array(i),s=new Array(i),c=new Array(i),u=0;u<i;++u){var l=r[u],d=o[u],f=d.length,p=Bw(e.call(l,l&&l.__data__,u,r)),m=p.length,h=s[u]=new Array(m),y=a[u]=new Array(m),b=c[u]=new Array(f);n(l,d,h,y,b,p,t);for(var g=0,w=0,v,S;g<m;++g)if(v=h[g]){for(g>=w&&(w=g+1);!(S=y[w])&&++w<m;);v._next=S||null}}return a=new be(a,r),a._enter=s,a._exit=c,a}function Bw(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Wm(){return new be(this._exit||this._groups.map(Ja),this._parents)}function Um(e,t,n){var r=this.enter(),o=this,i=this.exit();return typeof e=="function"?(r=e(r),r&&(r=r.selection())):r=r.append(e+""),t!=null&&(o=t(o),o&&(o=o.selection())),n==null?i.remove():n(i),r&&o?r.merge(o).order():o}function Vm(e){for(var t=e.selection?e.selection():e,n=this._groups,r=t._groups,o=n.length,i=r.length,a=Math.min(o,i),s=new Array(o),c=0;c<a;++c)for(var u=n[c],l=r[c],d=u.length,f=s[c]=new Array(d),p,m=0;m<d;++m)(p=u[m]||l[m])&&(f[m]=p);for(;c<o;++c)s[c]=n[c];return new be(s,this._parents)}function Gm(){for(var e=this._groups,t=-1,n=e.length;++t<n;)for(var r=e[t],o=r.length-1,i=r[o],a;--o>=0;)(a=r[o])&&(i&&a.compareDocumentPosition(i)^4&&i.parentNode.insertBefore(a,i),i=a);return this}function Km(e){e||(e=Aw);function t(d,f){return d&&f?e(d.__data__,f.__data__):!d-!f}for(var n=this._groups,r=n.length,o=new Array(r),i=0;i<r;++i){for(var a=n[i],s=a.length,c=o[i]=new Array(s),u,l=0;l<s;++l)(u=a[l])&&(c[l]=u);c.sort(t)}return new be(o,this._parents).order()}function Aw(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function Xm(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Qm(){return Array.from(this)}function Zm(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],o=0,i=r.length;o<i;++o){var a=r[o];if(a)return a}return null}function Jm(){let e=0;for(let t of this)++e;return e}function eh(){return!this.node()}function th(e){for(var t=this._groups,n=0,r=t.length;n<r;++n)for(var o=t[n],i=0,a=o.length,s;i<a;++i)(s=o[i])&&e.call(s,s.__data__,i,o);return this}function Lw(e){return function(){this.removeAttribute(e)}}function Fw(e){return function(){this.removeAttributeNS(e.space,e.local)}}function Ow(e,t){return function(){this.setAttribute(e,t)}}function Nw(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function jw(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttribute(e):this.setAttribute(e,n)}}function $w(e,t){return function(){var n=t.apply(this,arguments);n==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,n)}}function nh(e,t){var n=fn(e);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((t==null?n.local?Fw:Lw:typeof t=="function"?n.local?$w:jw:n.local?Nw:Ow)(n,t))}function es(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function zw(e){return function(){this.style.removeProperty(e)}}function Yw(e,t,n){return function(){this.style.setProperty(e,t,n)}}function Hw(e,t,n){return function(){var r=t.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,n)}}function rh(e,t,n){return arguments.length>1?this.each((t==null?zw:typeof t=="function"?Hw:Yw)(e,t,n??"")):Ln(this.node(),e)}function Ln(e,t){return e.style.getPropertyValue(t)||es(e).getComputedStyle(e,null).getPropertyValue(t)}function Ww(e){return function(){delete this[e]}}function Uw(e,t){return function(){this[e]=t}}function Vw(e,t){return function(){var n=t.apply(this,arguments);n==null?delete this[e]:this[e]=n}}function oh(e,t){return arguments.length>1?this.each((t==null?Ww:typeof t=="function"?Vw:Uw)(e,t)):this.node()[e]}function ih(e){return e.trim().split(/^|\s+/)}function Iu(e){return e.classList||new ah(e)}function ah(e){this._node=e,this._names=ih(e.getAttribute("class")||"")}ah.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function sh(e,t){for(var n=Iu(e),r=-1,o=t.length;++r<o;)n.add(t[r])}function ch(e,t){for(var n=Iu(e),r=-1,o=t.length;++r<o;)n.remove(t[r])}function Gw(e){return function(){sh(this,e)}}function Kw(e){return function(){ch(this,e)}}function Xw(e,t){return function(){(t.apply(this,arguments)?sh:ch)(this,e)}}function lh(e,t){var n=ih(e+"");if(arguments.length<2){for(var r=Iu(this.node()),o=-1,i=n.length;++o<i;)if(!r.contains(n[o]))return!1;return!0}return this.each((typeof t=="function"?Xw:t?Gw:Kw)(n,t))}function Qw(){this.textContent=""}function Zw(e){return function(){this.textContent=e}}function Jw(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function uh(e){return arguments.length?this.each(e==null?Qw:(typeof e=="function"?Jw:Zw)(e)):this.node().textContent}function e1(){this.innerHTML=""}function t1(e){return function(){this.innerHTML=e}}function n1(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function fh(e){return arguments.length?this.each(e==null?e1:(typeof e=="function"?n1:t1)(e)):this.node().innerHTML}function r1(){this.nextSibling&&this.parentNode.appendChild(this)}function dh(){return this.each(r1)}function o1(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ph(){return this.each(o1)}function mh(e){var t=typeof e=="function"?e:dn(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function i1(){return null}function hh(e,t){var n=typeof e=="function"?e:dn(e),r=t==null?i1:typeof t=="function"?t:lr(t);return this.select(function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)})}function a1(){var e=this.parentNode;e&&e.removeChild(this)}function yh(){return this.each(a1)}function s1(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function c1(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function gh(e){return this.select(e?c1:s1)}function vh(e){return arguments.length?this.property("__data__",e):this.node().__data__}function l1(e){return function(t){e.call(this,t,this.__data__)}}function u1(e){return e.trim().split(/^|\s+/).map(function(t){var n="",r=t.indexOf(".");return r>=0&&(n=t.slice(r+1),t=t.slice(0,r)),{type:t,name:n}})}function f1(e){return function(){var t=this.__on;if(t){for(var n=0,r=-1,o=t.length,i;n<o;++n)i=t[n],(!e.type||i.type===e.type)&&i.name===e.name?this.removeEventListener(i.type,i.listener,i.options):t[++r]=i;++r?t.length=r:delete this.__on}}}function d1(e,t,n){return function(){var r=this.__on,o,i=l1(t);if(r){for(var a=0,s=r.length;a<s;++a)if((o=r[a]).type===e.type&&o.name===e.name){this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=i,o.options=n),o.value=t;return}}this.addEventListener(e.type,i,n),o={type:e.type,name:e.name,value:t,listener:i,options:n},r?r.push(o):this.__on=[o]}}function bh(e,t,n){var r=u1(e+""),o,i=r.length,a;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,u=s.length,l;c<u;++c)for(o=0,l=s[c];o<i;++o)if((a=r[o]).type===l.type&&a.name===l.name)return l.value}return}for(s=t?d1:f1,o=0;o<i;++o)this.each(s(r[o],t,n));return this}function xh(e,t,n){var r=es(e),o=r.CustomEvent;typeof o=="function"?o=new o(t,n):(o=r.document.createEvent("Event"),n?(o.initEvent(t,n.bubbles,n.cancelable),o.detail=n.detail):o.initEvent(t,!1,!1)),e.dispatchEvent(o)}function p1(e,t){return function(){return xh(this,e,t)}}function m1(e,t){return function(){return xh(this,e,t.apply(this,arguments))}}function wh(e,t){return this.each((typeof t=="function"?m1:p1)(e,t))}function*kh(){for(var e=this._groups,t=0,n=e.length;t<n;++t)for(var r=e[t],o=0,i=r.length,a;o<i;++o)(a=r[o])&&(yield a)}var qu=[null];function be(e,t){this._groups=e,this._parents=t}function Sh(){return new be([[document.documentElement]],qu)}function h1(){return this}be.prototype=Sh.prototype={constructor:be,select:Fm,selectAll:Om,selectChild:Nm,selectChildren:jm,filter:$m,data:Hm,enter:zm,exit:Wm,join:Um,merge:Vm,selection:h1,order:Gm,sort:Km,call:Xm,nodes:Qm,node:Zm,size:Jm,empty:eh,each:th,attr:nh,style:rh,property:oh,classed:lh,text:uh,html:fh,raise:dh,lower:ph,append:mh,insert:hh,remove:yh,clone:gh,datum:vh,on:bh,dispatch:wh,[Symbol.iterator]:kh};var pn=Sh;function mt(e){return typeof e=="string"?new be([[document.querySelector(e)]],[document.documentElement]):new be([[e]],qu)}function Th(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Pu(e,t){if(e=Th(e),t===void 0&&(t=e.currentTarget),t){var n=t.ownerSVGElement||t;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}if(t.getBoundingClientRect){var o=t.getBoundingClientRect();return[e.clientX-o.left-t.clientLeft,e.clientY-o.top-t.clientTop]}}return[e.pageX,e.pageY]}function mn(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function Fn(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function Ot(){}var On=.7,dr=1/On,Kr="\\s*([+-]?\\d+)\\s*",ui="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",Ft="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",y1=/^#([0-9a-f]{3,8})$/,g1=new RegExp(`^rgb\\(${Kr},${Kr},${Kr}\\)$`),v1=new RegExp(`^rgb\\(${Ft},${Ft},${Ft}\\)$`),b1=new RegExp(`^rgba\\(${Kr},${Kr},${Kr},${ui}\\)$`),x1=new RegExp(`^rgba\\(${Ft},${Ft},${Ft},${ui}\\)$`),w1=new RegExp(`^hsl\\(${ui},${Ft},${Ft}\\)$`),k1=new RegExp(`^hsla\\(${ui},${Ft},${Ft},${ui}\\)$`),Ch={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};mn(Ot,Rt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:_h,formatHex:_h,formatHex8:S1,formatHsl:T1,formatRgb:Dh,toString:Dh});function _h(){return this.rgb().formatHex()}function S1(){return this.rgb().formatHex8()}function T1(){return Ph(this).formatHsl()}function Dh(){return this.rgb().formatRgb()}function Rt(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=y1.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Mh(t):n===3?new _e(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?ts(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?ts(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=g1.exec(e))?new _e(t[1],t[2],t[3],1):(t=v1.exec(e))?new _e(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=b1.exec(e))?ts(t[1],t[2],t[3],t[4]):(t=x1.exec(e))?ts(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=w1.exec(e))?Ih(t[1],t[2]/100,t[3]/100,1):(t=k1.exec(e))?Ih(t[1],t[2]/100,t[3]/100,t[4]):Ch.hasOwnProperty(e)?Mh(Ch[e]):e==="transparent"?new _e(NaN,NaN,NaN,0):null}function Mh(e){return new _e(e>>16&255,e>>8&255,e&255,1)}function ts(e,t,n,r){return r<=0&&(e=t=n=NaN),new _e(e,t,n,r)}function fi(e){return e instanceof Ot||(e=Rt(e)),e?(e=e.rgb(),new _e(e.r,e.g,e.b,e.opacity)):new _e}function ht(e,t,n,r){return arguments.length===1?fi(e):new _e(e,t,n,r??1)}function _e(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}mn(_e,ht,Fn(Ot,{brighter(e){return e=e==null?dr:Math.pow(dr,e),new _e(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?On:Math.pow(On,e),new _e(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new _e(fr(this.r),fr(this.g),fr(this.b),rs(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Rh,formatHex:Rh,formatHex8:C1,formatRgb:Eh,toString:Eh}));function Rh(){return`#${ur(this.r)}${ur(this.g)}${ur(this.b)}`}function C1(){return`#${ur(this.r)}${ur(this.g)}${ur(this.b)}${ur((isNaN(this.opacity)?1:this.opacity)*255)}`}function Eh(){let e=rs(this.opacity);return`${e===1?"rgb(":"rgba("}${fr(this.r)}, ${fr(this.g)}, ${fr(this.b)}${e===1?")":`, ${e})`}`}function rs(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function fr(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function ur(e){return e=fr(e),(e<16?"0":"")+e.toString(16)}function Ih(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new Mt(e,t,n,r)}function Ph(e){if(e instanceof Mt)return new Mt(e.h,e.s,e.l,e.opacity);if(e instanceof Ot||(e=Rt(e)),!e)return new Mt;if(e instanceof Mt)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,o=Math.min(t,n,r),i=Math.max(t,n,r),a=NaN,s=i-o,c=(i+o)/2;return s?(t===i?a=(n-r)/s+(n<r)*6:n===i?a=(r-t)/s+2:a=(t-n)/s+4,s/=c<.5?i+o:2-i-o,a*=60):s=c>0&&c<1?0:a,new Mt(a,s,c,e.opacity)}function di(e,t,n,r){return arguments.length===1?Ph(e):new Mt(e,t,n,r??1)}function Mt(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}mn(Mt,di,Fn(Ot,{brighter(e){return e=e==null?dr:Math.pow(dr,e),new Mt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?On:Math.pow(On,e),new Mt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,o=2*n-r;return new _e(Bu(e>=240?e-240:e+120,o,r),Bu(e,o,r),Bu(e<120?e+240:e-120,o,r),this.opacity)},clamp(){return new Mt(qh(this.h),ns(this.s),ns(this.l),rs(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=rs(this.opacity);return`${e===1?"hsl(":"hsla("}${qh(this.h)}, ${ns(this.s)*100}%, ${ns(this.l)*100}%${e===1?")":`, ${e})`}`}}));function qh(e){return e=(e||0)%360,e<0?e+360:e}function ns(e){return Math.max(0,Math.min(1,e||0))}function Bu(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}var os=Math.PI/180,is=180/Math.PI;var as=18,Bh=.96422,Ah=1,Lh=.82521,Fh=4/29,Xr=6/29,Oh=3*Xr*Xr,_1=Xr*Xr*Xr;function Nh(e){if(e instanceof Nt)return new Nt(e.l,e.a,e.b,e.opacity);if(e instanceof hn)return jh(e);e instanceof _e||(e=fi(e));var t=Ou(e.r),n=Ou(e.g),r=Ou(e.b),o=Au((.2225045*t+.7168786*n+.0606169*r)/Ah),i,a;return t===n&&n===r?i=a=o:(i=Au((.4360747*t+.3850649*n+.1430804*r)/Bh),a=Au((.0139322*t+.0971045*n+.7141733*r)/Lh)),new Nt(116*o-16,500*(i-o),200*(o-a),e.opacity)}function Qr(e,t,n,r){return arguments.length===1?Nh(e):new Nt(e,t,n,r??1)}function Nt(e,t,n,r){this.l=+e,this.a=+t,this.b=+n,this.opacity=+r}mn(Nt,Qr,Fn(Ot,{brighter(e){return new Nt(this.l+as*(e??1),this.a,this.b,this.opacity)},darker(e){return new Nt(this.l-as*(e??1),this.a,this.b,this.opacity)},rgb(){var e=(this.l+16)/116,t=isNaN(this.a)?e:e+this.a/500,n=isNaN(this.b)?e:e-this.b/200;return t=Bh*Lu(t),e=Ah*Lu(e),n=Lh*Lu(n),new _e(Fu(3.1338561*t-1.6168667*e-.4906146*n),Fu(-.9787684*t+1.9161415*e+.033454*n),Fu(.0719453*t-.2289914*e+1.4052427*n),this.opacity)}}));function Au(e){return e>_1?Math.pow(e,1/3):e/Oh+Fh}function Lu(e){return e>Xr?e*e*e:Oh*(e-Fh)}function Fu(e){return 255*(e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function Ou(e){return(e/=255)<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)}function D1(e){if(e instanceof hn)return new hn(e.h,e.c,e.l,e.opacity);if(e instanceof Nt||(e=Nh(e)),e.a===0&&e.b===0)return new hn(NaN,0<e.l&&e.l<100?0:NaN,e.l,e.opacity);var t=Math.atan2(e.b,e.a)*is;return new hn(t<0?t+360:t,Math.sqrt(e.a*e.a+e.b*e.b),e.l,e.opacity)}function pi(e,t,n,r){return arguments.length===1?D1(e):new hn(e,t,n,r??1)}function hn(e,t,n,r){this.h=+e,this.c=+t,this.l=+n,this.opacity=+r}function jh(e){if(isNaN(e.h))return new Nt(e.l,0,0,e.opacity);var t=e.h*os;return new Nt(e.l,Math.cos(t)*e.c,Math.sin(t)*e.c,e.opacity)}mn(hn,pi,Fn(Ot,{brighter(e){return new hn(this.h,this.c,this.l+as*(e??1),this.opacity)},darker(e){return new hn(this.h,this.c,this.l-as*(e??1),this.opacity)},rgb(){return jh(this).rgb()}}));var Hh=-.14861,Nu=1.78277,ju=-.29227,ss=-.90649,mi=1.97294,$h=mi*ss,zh=mi*Nu,Yh=Nu*ju-ss*Hh;function M1(e){if(e instanceof pr)return new pr(e.h,e.s,e.l,e.opacity);e instanceof _e||(e=fi(e));var t=e.r/255,n=e.g/255,r=e.b/255,o=(Yh*r+$h*t-zh*n)/(Yh+$h-zh),i=r-o,a=(mi*(n-o)-ju*i)/ss,s=Math.sqrt(a*a+i*i)/(mi*o*(1-o)),c=s?Math.atan2(a,i)*is-120:NaN;return new pr(c<0?c+360:c,s,o,e.opacity)}function Qe(e,t,n,r){return arguments.length===1?M1(e):new pr(e,t,n,r??1)}function pr(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}mn(pr,Qe,Fn(Ot,{brighter(e){return e=e==null?dr:Math.pow(dr,e),new pr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?On:Math.pow(On,e),new pr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=isNaN(this.h)?0:(this.h+120)*os,t=+this.l,n=isNaN(this.s)?0:this.s*t*(1-t),r=Math.cos(e),o=Math.sin(e);return new _e(255*(t+n*(Hh*r+Nu*o)),255*(t+n*(ju*r+ss*o)),255*(t+n*(mi*r)),this.opacity)}}));function $u(e,t,n,r,o){var i=e*e,a=i*e;return((1-3*e+3*i-a)*t+(4-6*i+3*a)*n+(1+3*e+3*i-3*a)*r+a*o)/6}function Wh(e){var t=e.length-1;return function(n){var r=n<=0?n=0:n>=1?(n=1,t-1):Math.floor(n*t),o=e[r],i=e[r+1],a=r>0?e[r-1]:2*o-i,s=r<t-1?e[r+2]:2*i-o;return $u((n-r/t)*t,a,o,i,s)}}function Uh(e){var t=e.length;return function(n){var r=Math.floor(((n%=1)<0?++n:n)*t),o=e[(r+t-1)%t],i=e[r%t],a=e[(r+1)%t],s=e[(r+2)%t];return $u((n-r/t)*t,o,i,a,s)}}var Zr=e=>()=>e;function Vh(e,t){return function(n){return e+n*t}}function R1(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(r){return Math.pow(e+r*t,n)}}function Jr(e,t){var n=t-e;return n?Vh(e,n>180||n<-180?n-360*Math.round(n/360):n):Zr(isNaN(e)?t:e)}function Gh(e){return(e=+e)==1?he:function(t,n){return n-t?R1(t,n,e):Zr(isNaN(t)?n:t)}}function he(e,t){var n=t-e;return n?Vh(e,n):Zr(isNaN(e)?t:e)}var yt=(function e(t){var n=Gh(t);function r(o,i){var a=n((o=ht(o)).r,(i=ht(i)).r),s=n(o.g,i.g),c=n(o.b,i.b),u=he(o.opacity,i.opacity);return function(l){return o.r=a(l),o.g=s(l),o.b=c(l),o.opacity=u(l),o+""}}return r.gamma=e,r})(1);function Kh(e){return function(t){var n=t.length,r=new Array(n),o=new Array(n),i=new Array(n),a,s;for(a=0;a<n;++a)s=ht(t[a]),r[a]=s.r||0,o[a]=s.g||0,i[a]=s.b||0;return r=e(r),o=e(o),i=e(i),s.opacity=1,function(c){return s.r=r(c),s.g=o(c),s.b=i(c),s+""}}}var zu=Kh(Wh),E1=Kh(Uh);function Xh(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,r=t.slice(),o;return function(i){for(o=0;o<n;++o)r[o]=e[o]*(1-i)+t[o]*i;return r}}function Qh(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Zh(e,t){var n=t?t.length:0,r=e?Math.min(n,e.length):0,o=new Array(r),i=new Array(n),a;for(a=0;a<r;++a)o[a]=Et(e[a],t[a]);for(;a<n;++a)i[a]=t[a];return function(s){for(a=0;a<r;++a)i[a]=o[a](s);return i}}function Jh(e,t){var n=new Date;return e=+e,t=+t,function(r){return n.setTime(e*(1-r)+t*r),n}}function me(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function ey(e,t){var n={},r={},o;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(o in t)o in e?n[o]=Et(e[o],t[o]):r[o]=t[o];return function(i){for(o in n)r[o]=n[o](i);return r}}var Hu=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Yu=new RegExp(Hu.source,"g");function I1(e){return function(){return e}}function q1(e){return function(t){return e(t)+""}}function hi(e,t){var n=Hu.lastIndex=Yu.lastIndex=0,r,o,i,a=-1,s=[],c=[];for(e=e+"",t=t+"";(r=Hu.exec(e))&&(o=Yu.exec(t));)(i=o.index)>n&&(i=t.slice(n,i),s[a]?s[a]+=i:s[++a]=i),(r=r[0])===(o=o[0])?s[a]?s[a]+=o:s[++a]=o:(s[++a]=null,c.push({i:a,x:me(r,o)})),n=Yu.lastIndex;return n<t.length&&(i=t.slice(n),s[a]?s[a]+=i:s[++a]=i),s.length<2?c[0]?q1(c[0].x):I1(t):(t=c.length,function(u){for(var l=0,d;l<t;++l)s[(d=c[l]).i]=d.x(u);return s.join("")})}function Et(e,t){var n=typeof t,r;return t==null||n==="boolean"?Zr(t):(n==="number"?me:n==="string"?(r=Rt(t))?(t=r,yt):hi:t instanceof Rt?yt:t instanceof Date?Jh:Qh(t)?Xh:Array.isArray(t)?Zh:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?ey:me)(e,t)}function mr(e,t){return e=+e,t=+t,function(n){return Math.round(e*(1-n)+t*n)}}var ty=180/Math.PI,cs={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Wu(e,t,n,r,o,i){var a,s,c;return(a=Math.sqrt(e*e+t*t))&&(e/=a,t/=a),(c=e*n+t*r)&&(n-=e*c,r-=t*c),(s=Math.sqrt(n*n+r*r))&&(n/=s,r/=s,c/=s),e*r<t*n&&(e=-e,t=-t,c=-c,a=-a),{translateX:o,translateY:i,rotate:Math.atan2(t,e)*ty,skewX:Math.atan(c)*ty,scaleX:a,scaleY:s}}var ls;function ny(e){let t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?cs:Wu(t.a,t.b,t.c,t.d,t.e,t.f)}function ry(e){return e==null?cs:(ls||(ls=document.createElementNS("http://www.w3.org/2000/svg","g")),ls.setAttribute("transform",e),(e=ls.transform.baseVal.consolidate())?(e=e.matrix,Wu(e.a,e.b,e.c,e.d,e.e,e.f)):cs)}function oy(e,t,n,r){function o(u){return u.length?u.pop()+" ":""}function i(u,l,d,f,p,m){if(u!==d||l!==f){var h=p.push("translate(",null,t,null,n);m.push({i:h-4,x:me(u,d)},{i:h-2,x:me(l,f)})}else(d||f)&&p.push("translate("+d+t+f+n)}function a(u,l,d,f){u!==l?(u-l>180?l+=360:l-u>180&&(u+=360),f.push({i:d.push(o(d)+"rotate(",null,r)-2,x:me(u,l)})):l&&d.push(o(d)+"rotate("+l+r)}function s(u,l,d,f){u!==l?f.push({i:d.push(o(d)+"skewX(",null,r)-2,x:me(u,l)}):l&&d.push(o(d)+"skewX("+l+r)}function c(u,l,d,f,p,m){if(u!==d||l!==f){var h=p.push(o(p)+"scale(",null,",",null,")");m.push({i:h-4,x:me(u,d)},{i:h-2,x:me(l,f)})}else(d!==1||f!==1)&&p.push(o(p)+"scale("+d+","+f+")")}return function(u,l){var d=[],f=[];return u=e(u),l=e(l),i(u.translateX,u.translateY,l.translateX,l.translateY,d,f),a(u.rotate,l.rotate,d,f),s(u.skewX,l.skewX,d,f),c(u.scaleX,u.scaleY,l.scaleX,l.scaleY,d,f),u=l=null,function(p){for(var m=-1,h=f.length,y;++m<h;)d[(y=f[m]).i]=y.x(p);return d.join("")}}}var Uu=oy(ny,"px, ","px)","deg)"),Vu=oy(ry,", ",")",")");function iy(e){return function(t,n){var r=e((t=di(t)).h,(n=di(n)).h),o=he(t.s,n.s),i=he(t.l,n.l),a=he(t.opacity,n.opacity);return function(s){return t.h=r(s),t.s=o(s),t.l=i(s),t.opacity=a(s),t+""}}}var Gu=iy(Jr),P1=iy(he);function us(e,t){var n=he((e=Qr(e)).l,(t=Qr(t)).l),r=he(e.a,t.a),o=he(e.b,t.b),i=he(e.opacity,t.opacity);return function(a){return e.l=n(a),e.a=r(a),e.b=o(a),e.opacity=i(a),e+""}}function ay(e){return function(t,n){var r=e((t=pi(t)).h,(n=pi(n)).h),o=he(t.c,n.c),i=he(t.l,n.l),a=he(t.opacity,n.opacity);return function(s){return t.h=r(s),t.c=o(s),t.l=i(s),t.opacity=a(s),t+""}}}var Ku=ay(Jr),B1=ay(he);function sy(e){return(function t(n){n=+n;function r(o,i){var a=e((o=Qe(o)).h,(i=Qe(i)).h),s=he(o.s,i.s),c=he(o.l,i.l),u=he(o.opacity,i.opacity);return function(l){return o.h=a(l),o.s=s(l),o.l=c(Math.pow(l,n)),o.opacity=u(l),o+""}}return r.gamma=t,r})(1)}var A1=sy(Jr),eo=sy(he);function jt(e,t){t===void 0&&(t=e,e=Et);for(var n=0,r=t.length-1,o=t[0],i=new Array(r<0?0:r);n<r;)i[n]=e(o,o=t[++n]);return function(a){var s=Math.max(0,Math.min(r-1,Math.floor(a*=r)));return i[s](a-s)}}function We(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e(r/(t-1));return n}var to=0,gi=0,yi=0,ly=1e3,fs,vi,ds=0,hr=0,ps=0,bi=typeof performance=="object"&&performance.now?performance:Date,uy=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function wi(){return hr||(uy(L1),hr=bi.now()+ps)}function L1(){hr=0}function xi(){this._call=this._time=this._next=null}xi.prototype=ms.prototype={constructor:xi,restart:function(e,t,n){if(typeof e!="function")throw new TypeError("callback is not a function");n=(n==null?wi():+n)+(t==null?0:+t),!this._next&&vi!==this&&(vi?vi._next=this:fs=this,vi=this),this._call=e,this._time=n,Xu()},stop:function(){this._call&&(this._call=null,this._time=1/0,Xu())}};function ms(e,t,n){var r=new xi;return r.restart(e,t,n),r}function fy(){wi(),++to;for(var e=fs,t;e;)(t=hr-e._time)>=0&&e._call.call(void 0,t),e=e._next;--to}function cy(){hr=(ds=bi.now())+ps,to=gi=0;try{fy()}finally{to=0,O1(),hr=0}}function F1(){var e=bi.now(),t=e-ds;t>ly&&(ps-=t,ds=e)}function O1(){for(var e,t=fs,n,r=1/0;t;)t._call?(r>t._time&&(r=t._time),e=t,t=t._next):(n=t._next,t._next=null,t=e?e._next=n:fs=n);vi=e,Xu(r)}function Xu(e){if(!to){gi&&(gi=clearTimeout(gi));var t=e-hr;t>24?(e<1/0&&(gi=setTimeout(cy,e-bi.now()-ps)),yi&&(yi=clearInterval(yi))):(yi||(ds=bi.now(),yi=setInterval(F1,ly)),to=1,uy(cy))}}function hs(e,t,n){var r=new xi;return t=t==null?0:+t,r.restart(o=>{r.stop(),e(o+t)},t,n),r}var N1=Ru("start","end","cancel","interrupt"),j1=[],my=0,dy=1,gs=2,ys=3,py=4,vs=5,ki=6;function Nn(e,t,n,r,o,i){var a=e.__transition;if(!a)e.__transition={};else if(n in a)return;$1(e,n,{name:t,index:r,group:o,on:N1,tween:j1,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:my})}function Si(e,t){var n=Me(e,t);if(n.state>my)throw new Error("too late; already scheduled");return n}function Oe(e,t){var n=Me(e,t);if(n.state>ys)throw new Error("too late; already running");return n}function Me(e,t){var n=e.__transition;if(!n||!(n=n[t]))throw new Error("transition not found");return n}function $1(e,t,n){var r=e.__transition,o;r[t]=n,n.timer=ms(i,0,n.time);function i(u){n.state=dy,n.timer.restart(a,n.delay,n.time),n.delay<=u&&a(u-n.delay)}function a(u){var l,d,f,p;if(n.state!==dy)return c();for(l in r)if(p=r[l],p.name===n.name){if(p.state===ys)return hs(a);p.state===py?(p.state=ki,p.timer.stop(),p.on.call("interrupt",e,e.__data__,p.index,p.group),delete r[l]):+l<t&&(p.state=ki,p.timer.stop(),p.on.call("cancel",e,e.__data__,p.index,p.group),delete r[l])}if(hs(function(){n.state===ys&&(n.state=py,n.timer.restart(s,n.delay,n.time),s(u))}),n.state=gs,n.on.call("start",e,e.__data__,n.index,n.group),n.state===gs){for(n.state=ys,o=new Array(f=n.tween.length),l=0,d=-1;l<f;++l)(p=n.tween[l].value.call(e,e.__data__,n.index,n.group))&&(o[++d]=p);o.length=d+1}}function s(u){for(var l=u<n.duration?n.ease.call(null,u/n.duration):(n.timer.restart(c),n.state=vs,1),d=-1,f=o.length;++d<f;)o[d].call(e,l);n.state===vs&&(n.on.call("end",e,e.__data__,n.index,n.group),c())}function c(){n.state=ki,n.timer.stop(),delete r[t];for(var u in r)return;delete e.__transition}}function bs(e,t){var n=e.__transition,r,o,i=!0,a;if(n){t=t==null?null:t+"";for(a in n){if((r=n[a]).name!==t){i=!1;continue}o=r.state>gs&&r.state<vs,r.state=ki,r.timer.stop(),r.on.call(o?"interrupt":"cancel",e,e.__data__,r.index,r.group),delete n[a]}i&&delete e.__transition}}function hy(e){return this.each(function(){bs(this,e)})}function z1(e,t){var n,r;return function(){var o=Oe(this,e),i=o.tween;if(i!==n){r=n=i;for(var a=0,s=r.length;a<s;++a)if(r[a].name===t){r=r.slice(),r.splice(a,1);break}}o.tween=r}}function Y1(e,t,n){var r,o;if(typeof n!="function")throw new Error;return function(){var i=Oe(this,e),a=i.tween;if(a!==r){o=(r=a).slice();for(var s={name:t,value:n},c=0,u=o.length;c<u;++c)if(o[c].name===t){o[c]=s;break}c===u&&o.push(s)}i.tween=o}}function yy(e,t){var n=this._id;if(e+="",arguments.length<2){for(var r=Me(this.node(),n).tween,o=0,i=r.length,a;o<i;++o)if((a=r[o]).name===e)return a.value;return null}return this.each((t==null?z1:Y1)(n,e,t))}function no(e,t,n){var r=e._id;return e.each(function(){var o=Oe(this,r);(o.value||(o.value={}))[t]=n.apply(this,arguments)}),function(o){return Me(o,r).value[t]}}function xs(e,t){var n;return(typeof t=="number"?me:t instanceof Rt?yt:(n=Rt(t))?(t=n,yt):hi)(e,t)}function H1(e){return function(){this.removeAttribute(e)}}function W1(e){return function(){this.removeAttributeNS(e.space,e.local)}}function U1(e,t,n){var r,o=n+"",i;return function(){var a=this.getAttribute(e);return a===o?null:a===r?i:i=t(r=a,n)}}function V1(e,t,n){var r,o=n+"",i;return function(){var a=this.getAttributeNS(e.space,e.local);return a===o?null:a===r?i:i=t(r=a,n)}}function G1(e,t,n){var r,o,i;return function(){var a,s=n(this),c;return s==null?void this.removeAttribute(e):(a=this.getAttribute(e),c=s+"",a===c?null:a===r&&c===o?i:(o=c,i=t(r=a,s)))}}function K1(e,t,n){var r,o,i;return function(){var a,s=n(this),c;return s==null?void this.removeAttributeNS(e.space,e.local):(a=this.getAttributeNS(e.space,e.local),c=s+"",a===c?null:a===r&&c===o?i:(o=c,i=t(r=a,s)))}}function gy(e,t){var n=fn(e),r=n==="transform"?Vu:xs;return this.attrTween(e,typeof t=="function"?(n.local?K1:G1)(n,r,no(this,"attr."+e,t)):t==null?(n.local?W1:H1)(n):(n.local?V1:U1)(n,r,t))}function X1(e,t){return function(n){this.setAttribute(e,t.call(this,n))}}function Q1(e,t){return function(n){this.setAttributeNS(e.space,e.local,t.call(this,n))}}function Z1(e,t){var n,r;function o(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&Q1(e,i)),n}return o._value=t,o}function J1(e,t){var n,r;function o(){var i=t.apply(this,arguments);return i!==r&&(n=(r=i)&&X1(e,i)),n}return o._value=t,o}function vy(e,t){var n="attr."+e;if(arguments.length<2)return(n=this.tween(n))&&n._value;if(t==null)return this.tween(n,null);if(typeof t!="function")throw new Error;var r=fn(e);return this.tween(n,(r.local?Z1:J1)(r,t))}function e2(e,t){return function(){Si(this,e).delay=+t.apply(this,arguments)}}function t2(e,t){return t=+t,function(){Si(this,e).delay=t}}function by(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?e2:t2)(t,e)):Me(this.node(),t).delay}function n2(e,t){return function(){Oe(this,e).duration=+t.apply(this,arguments)}}function r2(e,t){return t=+t,function(){Oe(this,e).duration=t}}function xy(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?n2:r2)(t,e)):Me(this.node(),t).duration}function o2(e,t){if(typeof t!="function")throw new Error;return function(){Oe(this,e).ease=t}}function wy(e){var t=this._id;return arguments.length?this.each(o2(t,e)):Me(this.node(),t).ease}function i2(e,t){return function(){var n=t.apply(this,arguments);if(typeof n!="function")throw new Error;Oe(this,e).ease=n}}function ky(e){if(typeof e!="function")throw new Error;return this.each(i2(this._id,e))}function Sy(e){typeof e!="function"&&(e=ci(e));for(var t=this._groups,n=t.length,r=new Array(n),o=0;o<n;++o)for(var i=t[o],a=i.length,s=r[o]=[],c,u=0;u<a;++u)(c=i[u])&&e.call(c,c.__data__,u,i)&&s.push(c);return new Ze(r,this._parents,this._name,this._id)}function Ty(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,n=e._groups,r=t.length,o=n.length,i=Math.min(r,o),a=new Array(r),s=0;s<i;++s)for(var c=t[s],u=n[s],l=c.length,d=a[s]=new Array(l),f,p=0;p<l;++p)(f=c[p]||u[p])&&(d[p]=f);for(;s<r;++s)a[s]=t[s];return new Ze(a,this._parents,this._name,this._id)}function a2(e){return(e+"").trim().split(/^|\s+/).every(function(t){var n=t.indexOf(".");return n>=0&&(t=t.slice(0,n)),!t||t==="start"})}function s2(e,t,n){var r,o,i=a2(t)?Si:Oe;return function(){var a=i(this,e),s=a.on;s!==r&&(o=(r=s).copy()).on(t,n),a.on=o}}function Cy(e,t){var n=this._id;return arguments.length<2?Me(this.node(),n).on.on(e):this.each(s2(n,e,t))}function c2(e){return function(){var t=this.parentNode;for(var n in this.__transition)if(+n!==e)return;t&&t.removeChild(this)}}function _y(){return this.on("end.remove",c2(this._id))}function Dy(e){var t=this._name,n=this._id;typeof e!="function"&&(e=lr(e));for(var r=this._groups,o=r.length,i=new Array(o),a=0;a<o;++a)for(var s=r[a],c=s.length,u=i[a]=new Array(c),l,d,f=0;f<c;++f)(l=s[f])&&(d=e.call(l,l.__data__,f,s))&&("__data__"in l&&(d.__data__=l.__data__),u[f]=d,Nn(u[f],t,n,f,u,Me(l,n)));return new Ze(i,this._parents,t,n)}function My(e){var t=this._name,n=this._id;typeof e!="function"&&(e=si(e));for(var r=this._groups,o=r.length,i=[],a=[],s=0;s<o;++s)for(var c=r[s],u=c.length,l,d=0;d<u;++d)if(l=c[d]){for(var f=e.call(l,l.__data__,d,c),p,m=Me(l,n),h=0,y=f.length;h<y;++h)(p=f[h])&&Nn(p,t,n,h,f,m);i.push(f),a.push(l)}return new Ze(i,a,t,n)}var l2=pn.prototype.constructor;function Ry(){return new l2(this._groups,this._parents)}function u2(e,t){var n,r,o;return function(){var i=Ln(this,e),a=(this.style.removeProperty(e),Ln(this,e));return i===a?null:i===n&&a===r?o:o=t(n=i,r=a)}}function Ey(e){return function(){this.style.removeProperty(e)}}function f2(e,t,n){var r,o=n+"",i;return function(){var a=Ln(this,e);return a===o?null:a===r?i:i=t(r=a,n)}}function d2(e,t,n){var r,o,i;return function(){var a=Ln(this,e),s=n(this),c=s+"";return s==null&&(c=s=(this.style.removeProperty(e),Ln(this,e))),a===c?null:a===r&&c===o?i:(o=c,i=t(r=a,s))}}function p2(e,t){var n,r,o,i="style."+t,a="end."+i,s;return function(){var c=Oe(this,e),u=c.on,l=c.value[i]==null?s||(s=Ey(t)):void 0;(u!==n||o!==l)&&(r=(n=u).copy()).on(a,o=l),c.on=r}}function Iy(e,t,n){var r=(e+="")=="transform"?Uu:xs;return t==null?this.styleTween(e,u2(e,r)).on("end.style."+e,Ey(e)):typeof t=="function"?this.styleTween(e,d2(e,r,no(this,"style."+e,t))).each(p2(this._id,e)):this.styleTween(e,f2(e,r,t),n).on("end.style."+e,null)}function m2(e,t,n){return function(r){this.style.setProperty(e,t.call(this,r),n)}}function h2(e,t,n){var r,o;function i(){var a=t.apply(this,arguments);return a!==o&&(r=(o=a)&&m2(e,a,n)),r}return i._value=t,i}function qy(e,t,n){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(t==null)return this.tween(r,null);if(typeof t!="function")throw new Error;return this.tween(r,h2(e,t,n??""))}function y2(e){return function(){this.textContent=e}}function g2(e){return function(){var t=e(this);this.textContent=t??""}}function Py(e){return this.tween("text",typeof e=="function"?g2(no(this,"text",e)):y2(e==null?"":e+""))}function v2(e){return function(t){this.textContent=e.call(this,t)}}function b2(e){var t,n;function r(){var o=e.apply(this,arguments);return o!==n&&(t=(n=o)&&v2(o)),t}return r._value=e,r}function By(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,b2(e))}function Ay(){for(var e=this._name,t=this._id,n=ws(),r=this._groups,o=r.length,i=0;i<o;++i)for(var a=r[i],s=a.length,c,u=0;u<s;++u)if(c=a[u]){var l=Me(c,t);Nn(c,e,n,u,a,{time:l.time+l.delay+l.duration,delay:0,duration:l.duration,ease:l.ease})}return new Ze(r,this._parents,e,n)}function Ly(){var e,t,n=this,r=n._id,o=n.size();return new Promise(function(i,a){var s={value:a},c={value:function(){--o===0&&i()}};n.each(function(){var u=Oe(this,r),l=u.on;l!==e&&(t=(e=l).copy(),t._.cancel.push(s),t._.interrupt.push(s),t._.end.push(c)),u.on=t}),o===0&&i()})}var x2=0;function Ze(e,t,n,r){this._groups=e,this._parents=t,this._name=n,this._id=r}function Fy(e){return pn().transition(e)}function ws(){return++x2}var yn=pn.prototype;Ze.prototype=Fy.prototype={constructor:Ze,select:Dy,selectAll:My,selectChild:yn.selectChild,selectChildren:yn.selectChildren,filter:Sy,merge:Ty,selection:Ry,transition:Ay,call:yn.call,nodes:yn.nodes,node:yn.node,size:yn.size,empty:yn.empty,each:yn.each,on:Cy,attr:gy,attrTween:vy,style:Iy,styleTween:qy,text:Py,textTween:By,remove:_y,tween:yy,delay:by,duration:xy,ease:wy,easeVarying:ky,end:Ly,[Symbol.iterator]:yn[Symbol.iterator]};function ks(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var w2={time:null,delay:0,duration:250,ease:ks};function k2(e,t){for(var n;!(n=e.__transition)||!(n=n[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return n}function Oy(e){var t,n;e instanceof Ze?(t=e._id,e=e._name):(t=ws(),(n=w2).time=wi(),e=e==null?null:e+"");for(var r=this._groups,o=r.length,i=0;i<o;++i)for(var a=r[i],s=a.length,c,u=0;u<s;++u)(c=a[u])&&Nn(c,e,t,u,a,n||k2(c,t));return new Ze(r,this._parents,e,t)}pn.prototype.interrupt=hy;pn.prototype.transition=Oy;var{abs:pR,max:mR,min:hR}=Math;function Ny(e){return[+e[0],+e[1]]}function S2(e){return[Ny(e[0]),Ny(e[1])]}var yR={name:"x",handles:["w","e"].map(Qu),input:function(e,t){return e==null?null:[[+e[0],t[0][1]],[+e[1],t[1][1]]]},output:function(e){return e&&[e[0][0],e[1][0]]}},gR={name:"y",handles:["n","s"].map(Qu),input:function(e,t){return e==null?null:[[t[0][0],+e[0]],[t[1][0],+e[1]]]},output:function(e){return e&&[e[0][1],e[1][1]]}},vR={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(Qu),input:function(e){return e==null?null:S2(e)},output:function(e){return e}};function Qu(e){return{type:e}}var Zu=Math.PI,Ju=2*Zu,yr=1e-6,T2=Ju-yr;function jy(e){this._+=e[0];for(let t=1,n=e.length;t<n;++t)this._+=arguments[t]+e[t]}function C2(e){let t=Math.floor(e);if(!(t>=0))throw new Error(`invalid digits: ${e}`);if(t>15)return jy;let n=10**t;return function(r){this._+=r[0];for(let o=1,i=r.length;o<i;++o)this._+=Math.round(arguments[o]*n)/n+r[o]}}var jn=class{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?jy:C2(t)}moveTo(t,n){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,n){this._append`L${this._x1=+t},${this._y1=+n}`}quadraticCurveTo(t,n,r,o){this._append`Q${+t},${+n},${this._x1=+r},${this._y1=+o}`}bezierCurveTo(t,n,r,o,i,a){this._append`C${+t},${+n},${+r},${+o},${this._x1=+i},${this._y1=+a}`}arcTo(t,n,r,o,i){if(t=+t,n=+n,r=+r,o=+o,i=+i,i<0)throw new Error(`negative radius: ${i}`);let a=this._x1,s=this._y1,c=r-t,u=o-n,l=a-t,d=s-n,f=l*l+d*d;if(this._x1===null)this._append`M${this._x1=t},${this._y1=n}`;else if(f>yr)if(!(Math.abs(d*c-u*l)>yr)||!i)this._append`L${this._x1=t},${this._y1=n}`;else{let p=r-a,m=o-s,h=c*c+u*u,y=p*p+m*m,b=Math.sqrt(h),g=Math.sqrt(f),w=i*Math.tan((Zu-Math.acos((h+f-y)/(2*b*g)))/2),v=w/g,S=w/b;Math.abs(v-1)>yr&&this._append`L${t+v*l},${n+v*d}`,this._append`A${i},${i},0,0,${+(d*p>l*m)},${this._x1=t+S*c},${this._y1=n+S*u}`}}arc(t,n,r,o,i,a){if(t=+t,n=+n,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let s=r*Math.cos(o),c=r*Math.sin(o),u=t+s,l=n+c,d=1^a,f=a?o-i:i-o;this._x1===null?this._append`M${u},${l}`:(Math.abs(this._x1-u)>yr||Math.abs(this._y1-l)>yr)&&this._append`L${u},${l}`,r&&(f<0&&(f=f%Ju+Ju),f>T2?this._append`A${r},${r},0,1,${d},${t-s},${n-c}A${r},${r},0,1,${d},${this._x1=u},${this._y1=l}`:f>yr&&this._append`A${r},${r},0,${+(f>=Zu)},${d},${this._x1=t+r*Math.cos(i)},${this._y1=n+r*Math.sin(i)}`)}rect(t,n,r,o){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}h${r=+r}v${+o}h${-r}Z`}toString(){return this._}};function $y(){return new jn}$y.prototype=jn.prototype;function It(e=3){return new jn(+e)}function zy(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)}function gr(e,t){if(!isFinite(e)||e===0)return null;var n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"),r=e.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+e.slice(n+1)]}function $t(e){return e=gr(Math.abs(e)),e?e[1]:NaN}function Yy(e,t){return function(n,r){for(var o=n.length,i=[],a=0,s=e[0],c=0;o>0&&s>0&&(c+s+1>r&&(s=Math.max(1,r-c)),i.push(n.substring(o-=s,o+s)),!((c+=s+1)>r));)s=e[a=(a+1)%e.length];return i.reverse().join(t)}}function Hy(e){return function(t){return t.replace(/[0-9]/g,function(n){return e[+n]})}}var _2=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function zt(e){if(!(t=_2.exec(e)))throw new Error("invalid format: "+e);var t;return new Ss({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}zt.prototype=Ss.prototype;function Ss(e){this.fill=e.fill===void 0?" ":e.fill+"",this.align=e.align===void 0?">":e.align+"",this.sign=e.sign===void 0?"-":e.sign+"",this.symbol=e.symbol===void 0?"":e.symbol+"",this.zero=!!e.zero,this.width=e.width===void 0?void 0:+e.width,this.comma=!!e.comma,this.precision=e.precision===void 0?void 0:+e.precision,this.trim=!!e.trim,this.type=e.type===void 0?"":e.type+""}Ss.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Wy(e){e:for(var t=e.length,n=1,r=-1,o;n<t;++n)switch(e[n]){case".":r=o=n;break;case"0":r===0&&(r=n),o=n;break;default:if(!+e[n])break e;r>0&&(r=0);break}return r>0?e.slice(0,r)+e.slice(o+1):e}var Ti;function Uy(e,t){var n=gr(e,t);if(!n)return Ti=void 0,e.toPrecision(t);var r=n[0],o=n[1],i=o-(Ti=Math.max(-8,Math.min(8,Math.floor(o/3)))*3)+1,a=r.length;return i===a?r:i>a?r+new Array(i-a+1).join("0"):i>0?r.slice(0,i)+"."+r.slice(i):"0."+new Array(1-i).join("0")+gr(e,Math.max(0,t+i-1))[0]}function ef(e,t){var n=gr(e,t);if(!n)return e+"";var r=n[0],o=n[1];return o<0?"0."+new Array(-o).join("0")+r:r.length>o+1?r.slice(0,o+1)+"."+r.slice(o+1):r+new Array(o-r.length+2).join("0")}var tf={"%":(e,t)=>(e*100).toFixed(t),b:e=>Math.round(e).toString(2),c:e=>e+"",d:zy,e:(e,t)=>e.toExponential(t),f:(e,t)=>e.toFixed(t),g:(e,t)=>e.toPrecision(t),o:e=>Math.round(e).toString(8),p:(e,t)=>ef(e*100,t),r:ef,s:Uy,X:e=>Math.round(e).toString(16).toUpperCase(),x:e=>Math.round(e).toString(16)};function nf(e){return e}var Vy=Array.prototype.map,Gy=["y","z","a","f","p","n","\xB5","m","","k","M","G","T","P","E","Z","Y"];function Ky(e){var t=e.grouping===void 0||e.thousands===void 0?nf:Yy(Vy.call(e.grouping,Number),e.thousands+""),n=e.currency===void 0?"":e.currency[0]+"",r=e.currency===void 0?"":e.currency[1]+"",o=e.decimal===void 0?".":e.decimal+"",i=e.numerals===void 0?nf:Hy(Vy.call(e.numerals,String)),a=e.percent===void 0?"%":e.percent+"",s=e.minus===void 0?"\u2212":e.minus+"",c=e.nan===void 0?"NaN":e.nan+"";function u(d,f){d=zt(d);var p=d.fill,m=d.align,h=d.sign,y=d.symbol,b=d.zero,g=d.width,w=d.comma,v=d.precision,S=d.trim,x=d.type;x==="n"?(w=!0,x="g"):tf[x]||(v===void 0&&(v=12),S=!0,x="g"),(b||p==="0"&&m==="=")&&(b=!0,p="0",m="=");var k=(f&&f.prefix!==void 0?f.prefix:"")+(y==="$"?n:y==="#"&&/[boxX]/.test(x)?"0"+x.toLowerCase():""),T=(y==="$"?r:/[%p]/.test(x)?a:"")+(f&&f.suffix!==void 0?f.suffix:""),_=tf[x],I=/[defgprs%]/.test(x);v=v===void 0?6:/[gprs]/.test(x)?Math.max(1,Math.min(21,v)):Math.max(0,Math.min(20,v));function D(R){var O=k,A=T,C,F,q;if(x==="c")A=_(R)+A,R="";else{R=+R;var K=R<0||1/R<0;if(R=isNaN(R)?c:_(Math.abs(R),v),S&&(R=Wy(R)),K&&+R==0&&h!=="+"&&(K=!1),O=(K?h==="("?h:s:h==="-"||h==="("?"":h)+O,A=(x==="s"&&!isNaN(R)&&Ti!==void 0?Gy[8+Ti/3]:"")+A+(K&&h==="("?")":""),I){for(C=-1,F=R.length;++C<F;)if(q=R.charCodeAt(C),48>q||q>57){A=(q===46?o+R.slice(C+1):R.slice(C))+A,R=R.slice(0,C);break}}}w&&!b&&(R=t(R,1/0));var P=O.length+R.length+A.length,L=P<g?new Array(g-P+1).join(p):"";switch(w&&b&&(R=t(L+R,L.length?g-A.length:1/0),L=""),m){case"<":R=O+R+A+L;break;case"=":R=O+L+R+A;break;case"^":R=L.slice(0,P=L.length>>1)+O+R+A+L.slice(P);break;default:R=L+O+R+A;break}return i(R)}return D.toString=function(){return d+""},D}function l(d,f){var p=Math.max(-8,Math.min(8,Math.floor($t(f)/3)))*3,m=Math.pow(10,-p),h=u((d=zt(d),d.type="f",d),{suffix:Gy[8+p/3]});return function(y){return h(m*y)}}return{format:u,formatPrefix:l}}var Ts,gt,Cs;rf({thousands:",",grouping:[3],currency:["$",""]});function rf(e){return Ts=Ky(e),gt=Ts.format,Cs=Ts.formatPrefix,Ts}function of(e){return Math.max(0,-$t(Math.abs(e)))}function af(e,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor($t(t)/3)))*3-$t(Math.abs(e)))}function sf(e,t){return e=Math.abs(e),t=Math.abs(t)-e,Math.max(0,$t(t)-$t(e))+1}var W=1e-6,_s=1e-12,X=Math.PI,se=X/2,cf=X/4,Ee=X*2,Re=180/X,ce=X/180,J=Math.abs,vt=Math.atan,Ne=Math.atan2,Y=Math.cos;var Ds=Math.exp;var vr=Math.log,Ms=Math.pow,$=Math.sin,Ue=Math.sign||function(e){return e>0?1:e<0?-1:0},de=Math.sqrt,ro=Math.tan;function Rs(e){return e>1?0:e<-1?X:Math.acos(e)}function xe(e){return e>1?se:e<-1?-se:Math.asin(e)}function Ie(){}function Es(e,t){e&&Qy.hasOwnProperty(e.type)&&Qy[e.type](e,t)}var Xy={Feature:function(e,t){Es(e.geometry,t)},FeatureCollection:function(e,t){for(var n=e.features,r=-1,o=n.length;++r<o;)Es(n[r].geometry,t)}},Qy={Sphere:function(e,t){t.sphere()},Point:function(e,t){e=e.coordinates,t.point(e[0],e[1],e[2])},MultiPoint:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)e=n[r],t.point(e[0],e[1],e[2])},LineString:function(e,t){lf(e.coordinates,t,0)},MultiLineString:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)lf(n[r],t,0)},Polygon:function(e,t){Zy(e.coordinates,t)},MultiPolygon:function(e,t){for(var n=e.coordinates,r=-1,o=n.length;++r<o;)Zy(n[r],t)},GeometryCollection:function(e,t){for(var n=e.geometries,r=-1,o=n.length;++r<o;)Es(n[r],t)}};function lf(e,t,n){var r=-1,o=e.length-n,i;for(t.lineStart();++r<o;)i=e[r],t.point(i[0],i[1],i[2]);t.lineEnd()}function Zy(e,t){var n=-1,r=e.length;for(t.polygonStart();++n<r;)lf(e[n],t,1);t.polygonEnd()}function qt(e,t){e&&Xy.hasOwnProperty(e.type)?Xy[e.type](e,t):Es(e,t)}function Ci(e){return[Ne(e[1],e[0]),xe(e[2])]}function Yt(e){var t=e[0],n=e[1],r=Y(n);return[r*Y(t),r*$(t),$(n)]}function _i(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function oo(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function Is(e,t){e[0]+=t[0],e[1]+=t[1],e[2]+=t[2]}function Di(e,t){return[e[0]*t,e[1]*t,e[2]*t]}function Mi(e){var t=de(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]/=t,e[1]/=t,e[2]/=t}function Ri(e,t){function n(r,o){return r=e(r,o),t(r[0],r[1])}return e.invert&&t.invert&&(n.invert=function(r,o){return r=t.invert(r,o),r&&e.invert(r[0],r[1])}),n}function uf(e,t){return J(e)>X&&(e-=Math.round(e/Ee)*Ee),[e,t]}uf.invert=uf;function ff(e,t,n){return(e%=Ee)?t||n?Ri(eg(e),tg(t,n)):eg(e):t||n?tg(t,n):uf}function Jy(e){return function(t,n){return t+=e,J(t)>X&&(t-=Math.round(t/Ee)*Ee),[t,n]}}function eg(e){var t=Jy(e);return t.invert=Jy(-e),t}function tg(e,t){var n=Y(e),r=$(e),o=Y(t),i=$(t);function a(s,c){var u=Y(c),l=Y(s)*u,d=$(s)*u,f=$(c),p=f*n+l*r;return[Ne(d*o-p*i,l*n-f*r),xe(p*o+d*i)]}return a.invert=function(s,c){var u=Y(c),l=Y(s)*u,d=$(s)*u,f=$(c),p=f*o-d*i;return[Ne(d*o+f*i,l*n+p*r),xe(p*n-l*r)]},a}function ng(e){e=ff(e[0]*ce,e[1]*ce,e.length>2?e[2]*ce:0);function t(n){return n=e(n[0]*ce,n[1]*ce),n[0]*=Re,n[1]*=Re,n}return t.invert=function(n){return n=e.invert(n[0]*ce,n[1]*ce),n[0]*=Re,n[1]*=Re,n},t}function og(e,t,n,r,o,i){if(n){var a=Y(t),s=$(t),c=r*n;o==null?(o=t+r*Ee,i=t-c/2):(o=rg(a,o),i=rg(a,i),(r>0?o<i:o>i)&&(o+=r*Ee));for(var u,l=o;r>0?l>i:l<i;l-=c)u=Ci([a,-s*Y(l),-s*$(l)]),e.point(u[0],u[1])}}function rg(e,t){t=Yt(t),t[0]-=e,Mi(t);var n=Rs(-t[1]);return((-t[2]<0?-n:n)+Ee-W)%Ee}function qs(){var e=[],t;return{point:function(n,r,o){t.push([n,r,o])},lineStart:function(){e.push(t=[])},lineEnd:Ie,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var n=e;return e=[],t=null,n}}}function io(e,t){return J(e[0]-t[0])<W&&J(e[1]-t[1])<W}function Ps(e,t,n,r){this.x=e,this.z=t,this.o=n,this.e=r,this.v=!1,this.n=this.p=null}function Bs(e,t,n,r,o){var i=[],a=[],s,c;if(e.forEach(function(m){if(!((h=m.length-1)<=0)){var h,y=m[0],b=m[h],g;if(io(y,b)){if(!y[2]&&!b[2]){for(o.lineStart(),s=0;s<h;++s)o.point((y=m[s])[0],y[1]);o.lineEnd();return}b[0]+=2*W}i.push(g=new Ps(y,m,null,!0)),a.push(g.o=new Ps(y,null,g,!1)),i.push(g=new Ps(b,m,null,!1)),a.push(g.o=new Ps(b,null,g,!0))}}),!!i.length){for(a.sort(t),ig(i),ig(a),s=0,c=a.length;s<c;++s)a[s].e=n=!n;for(var u=i[0],l,d;;){for(var f=u,p=!0;f.v;)if((f=f.n)===u)return;l=f.z,o.lineStart();do{if(f.v=f.o.v=!0,f.e){if(p)for(s=0,c=l.length;s<c;++s)o.point((d=l[s])[0],d[1]);else r(f.x,f.n.x,1,o);f=f.n}else{if(p)for(l=f.p.z,s=l.length-1;s>=0;--s)o.point((d=l[s])[0],d[1]);else r(f.x,f.p.x,-1,o);f=f.p}f=f.o,l=f.z,p=!p}while(!f.v);o.lineEnd()}}}function ig(e){if(t=e.length){for(var t,n=0,r=e[0],o;++n<t;)r.n=o=e[n],o.p=r,r=o;r.n=o=e[0],o.p=r}}function df(e){return J(e[0])<=X?e[0]:Ue(e[0])*((J(e[0])+X)%Ee-X)}function ag(e,t){var n=df(t),r=t[1],o=$(r),i=[$(n),-Y(n),0],a=0,s=0,c=new at;o===1?r=se+W:o===-1&&(r=-se-W);for(var u=0,l=e.length;u<l;++u)if(f=(d=e[u]).length)for(var d,f,p=d[f-1],m=df(p),h=p[1]/2+cf,y=$(h),b=Y(h),g=0;g<f;++g,m=v,y=x,b=k,p=w){var w=d[g],v=df(w),S=w[1]/2+cf,x=$(S),k=Y(S),T=v-m,_=T>=0?1:-1,I=_*T,D=I>X,R=y*x;if(c.add(Ne(R*_*$(I),b*k+R*Y(I))),a+=D?T+_*Ee:T,D^m>=n^v>=n){var O=oo(Yt(p),Yt(w));Mi(O);var A=oo(i,O);Mi(A);var C=(D^T>=0?-1:1)*xe(A[2]);(r>C||r===C&&(O[0]||O[1]))&&(s+=D^T>=0?1:-1)}}return(a<-W||a<W&&c<-_s)^s&1}function As(e,t,n,r){return function(o){var i=t(o),a=qs(),s=t(a),c=!1,u,l,d,f={point:p,lineStart:h,lineEnd:y,polygonStart:function(){f.point=b,f.lineStart=g,f.lineEnd=w,l=[],u=[]},polygonEnd:function(){f.point=p,f.lineStart=h,f.lineEnd=y,l=Gr(l);var v=ag(u,r);l.length?(c||(o.polygonStart(),c=!0),Bs(l,M2,v,n,o)):v&&(c||(o.polygonStart(),c=!0),o.lineStart(),n(null,null,1,o),o.lineEnd()),c&&(o.polygonEnd(),c=!1),l=u=null},sphere:function(){o.polygonStart(),o.lineStart(),n(null,null,1,o),o.lineEnd(),o.polygonEnd()}};function p(v,S){e(v,S)&&o.point(v,S)}function m(v,S){i.point(v,S)}function h(){f.point=m,i.lineStart()}function y(){f.point=p,i.lineEnd()}function b(v,S){d.push([v,S]),s.point(v,S)}function g(){s.lineStart(),d=[]}function w(){b(d[0][0],d[0][1]),s.lineEnd();var v=s.clean(),S=a.result(),x,k=S.length,T,_,I;if(d.pop(),u.push(d),d=null,!!k){if(v&1){if(_=S[0],(T=_.length-1)>0){for(c||(o.polygonStart(),c=!0),o.lineStart(),x=0;x<T;++x)o.point((I=_[x])[0],I[1]);o.lineEnd()}return}k>1&&v&2&&S.push(S.pop().concat(S.shift())),l.push(S.filter(D2))}}return f}}function D2(e){return e.length>1}function M2(e,t){return((e=e.x)[0]<0?e[1]-se-W:se-e[1])-((t=t.x)[0]<0?t[1]-se-W:se-t[1])}var pf=As(function(){return!0},R2,I2,[-X,-se]);function R2(e){var t=NaN,n=NaN,r=NaN,o;return{lineStart:function(){e.lineStart(),o=1},point:function(i,a){var s=i>0?X:-X,c=J(i-t);J(c-X)<W?(e.point(t,n=(n+a)/2>0?se:-se),e.point(r,n),e.lineEnd(),e.lineStart(),e.point(s,n),e.point(i,n),o=0):r!==s&&c>=X&&(J(t-r)<W&&(t-=r*W),J(i-s)<W&&(i-=s*W),n=E2(t,n,i,a),e.point(r,n),e.lineEnd(),e.lineStart(),e.point(s,n),o=0),e.point(t=i,n=a),r=s},lineEnd:function(){e.lineEnd(),t=n=NaN},clean:function(){return 2-o}}}function E2(e,t,n,r){var o,i,a=$(e-n);return J(a)>W?vt(($(t)*(i=Y(r))*$(n)-$(r)*(o=Y(t))*$(e))/(o*i*a)):(t+r)/2}function I2(e,t,n,r){var o;if(e==null)o=n*se,r.point(-X,o),r.point(0,o),r.point(X,o),r.point(X,0),r.point(X,-o),r.point(0,-o),r.point(-X,-o),r.point(-X,0),r.point(-X,o);else if(J(e[0]-t[0])>W){var i=e[0]<t[0]?X:-X;o=n*i/2,r.point(-i,o),r.point(0,o),r.point(i,o)}else r.point(t[0],t[1])}function sg(e){var t=Y(e),n=2*ce,r=t>0,o=J(t)>W;function i(l,d,f,p){og(p,e,n,f,l,d)}function a(l,d){return Y(l)*Y(d)>t}function s(l){var d,f,p,m,h;return{lineStart:function(){m=p=!1,h=1},point:function(y,b){var g=[y,b],w,v=a(y,b),S=r?v?0:u(y,b):v?u(y+(y<0?X:-X),b):0;if(!d&&(m=p=v)&&l.lineStart(),v!==p&&(w=c(d,g),(!w||io(d,w)||io(g,w))&&(g[2]=1)),v!==p)h=0,v?(l.lineStart(),w=c(g,d),l.point(w[0],w[1])):(w=c(d,g),l.point(w[0],w[1],2),l.lineEnd()),d=w;else if(o&&d&&r^v){var x;!(S&f)&&(x=c(g,d,!0))&&(h=0,r?(l.lineStart(),l.point(x[0][0],x[0][1]),l.point(x[1][0],x[1][1]),l.lineEnd()):(l.point(x[1][0],x[1][1]),l.lineEnd(),l.lineStart(),l.point(x[0][0],x[0][1],3)))}v&&(!d||!io(d,g))&&l.point(g[0],g[1]),d=g,p=v,f=S},lineEnd:function(){p&&l.lineEnd(),d=null},clean:function(){return h|(m&&p)<<1}}}function c(l,d,f){var p=Yt(l),m=Yt(d),h=[1,0,0],y=oo(p,m),b=_i(y,y),g=y[0],w=b-g*g;if(!w)return!f&&l;var v=t*b/w,S=-t*g/w,x=oo(h,y),k=Di(h,v),T=Di(y,S);Is(k,T);var _=x,I=_i(k,_),D=_i(_,_),R=I*I-D*(_i(k,k)-1);if(!(R<0)){var O=de(R),A=Di(_,(-I-O)/D);if(Is(A,k),A=Ci(A),!f)return A;var C=l[0],F=d[0],q=l[1],K=d[1],P;F<C&&(P=C,C=F,F=P);var L=F-C,H=J(L-X)<W,V=H||L<W;if(!H&&K<q&&(P=q,q=K,K=P),V?H?q+K>0^A[1]<(J(A[0]-C)<W?q:K):q<=A[1]&&A[1]<=K:L>X^(C<=A[0]&&A[0]<=F)){var z=Di(_,(-I+O)/D);return Is(z,k),[A,Ci(z)]}}}function u(l,d){var f=r?e:X-e,p=0;return l<-f?p|=1:l>f&&(p|=2),d<-f?p|=4:d>f&&(p|=8),p}return As(a,s,i,r?[0,-e]:[-X,e-X])}function cg(e,t,n,r,o,i){var a=e[0],s=e[1],c=t[0],u=t[1],l=0,d=1,f=c-a,p=u-s,m;if(m=n-a,!(!f&&m>0)){if(m/=f,f<0){if(m<l)return;m<d&&(d=m)}else if(f>0){if(m>d)return;m>l&&(l=m)}if(m=o-a,!(!f&&m<0)){if(m/=f,f<0){if(m>d)return;m>l&&(l=m)}else if(f>0){if(m<l)return;m<d&&(d=m)}if(m=r-s,!(!p&&m>0)){if(m/=p,p<0){if(m<l)return;m<d&&(d=m)}else if(p>0){if(m>d)return;m>l&&(l=m)}if(m=i-s,!(!p&&m<0)){if(m/=p,p<0){if(m>d)return;m>l&&(l=m)}else if(p>0){if(m<l)return;m<d&&(d=m)}return l>0&&(e[0]=a+l*f,e[1]=s+l*p),d<1&&(t[0]=a+d*f,t[1]=s+d*p),!0}}}}}var Ei=1e9,Ls=-Ei;function ao(e,t,n,r){function o(u,l){return e<=u&&u<=n&&t<=l&&l<=r}function i(u,l,d,f){var p=0,m=0;if(u==null||(p=a(u,d))!==(m=a(l,d))||c(u,l)<0^d>0)do f.point(p===0||p===3?e:n,p>1?r:t);while((p=(p+d+4)%4)!==m);else f.point(l[0],l[1])}function a(u,l){return J(u[0]-e)<W?l>0?0:3:J(u[0]-n)<W?l>0?2:1:J(u[1]-t)<W?l>0?1:0:l>0?3:2}function s(u,l){return c(u.x,l.x)}function c(u,l){var d=a(u,1),f=a(l,1);return d!==f?d-f:d===0?l[1]-u[1]:d===1?u[0]-l[0]:d===2?u[1]-l[1]:l[0]-u[0]}return function(u){var l=u,d=qs(),f,p,m,h,y,b,g,w,v,S,x,k={point:T,lineStart:R,lineEnd:O,polygonStart:I,polygonEnd:D};function T(C,F){o(C,F)&&l.point(C,F)}function _(){for(var C=0,F=0,q=p.length;F<q;++F)for(var K=p[F],P=1,L=K.length,H=K[0],V,z,ee=H[0],te=H[1];P<L;++P)V=ee,z=te,H=K[P],ee=H[0],te=H[1],z<=r?te>r&&(ee-V)*(r-z)>(te-z)*(e-V)&&++C:te<=r&&(ee-V)*(r-z)<(te-z)*(e-V)&&--C;return C}function I(){l=d,f=[],p=[],x=!0}function D(){var C=_(),F=x&&C,q=(f=Gr(f)).length;(F||q)&&(u.polygonStart(),F&&(u.lineStart(),i(null,null,1,u),u.lineEnd()),q&&Bs(f,s,C,i,u),u.polygonEnd()),l=u,f=p=m=null}function R(){k.point=A,p&&p.push(m=[]),S=!0,v=!1,g=w=NaN}function O(){f&&(A(h,y),b&&v&&d.rejoin(),f.push(d.result())),k.point=T,v&&l.lineEnd()}function A(C,F){var q=o(C,F);if(p&&m.push([C,F]),S)h=C,y=F,b=q,S=!1,q&&(l.lineStart(),l.point(C,F));else if(q&&v)l.point(C,F);else{var K=[g=Math.max(Ls,Math.min(Ei,g)),w=Math.max(Ls,Math.min(Ei,w))],P=[C=Math.max(Ls,Math.min(Ei,C)),F=Math.max(Ls,Math.min(Ei,F))];cg(K,P,e,t,n,r)?(v||(l.lineStart(),l.point(K[0],K[1])),l.point(P[0],P[1]),q||l.lineEnd(),x=!1):q&&(l.lineStart(),l.point(C,F),x=!1)}g=C,w=F,v=q}return k}}var Ii=e=>e;var mf=new at,hf=new at,lg,ug,yf,gf,$n={point:Ie,lineStart:Ie,lineEnd:Ie,polygonStart:function(){$n.lineStart=q2,$n.lineEnd=B2},polygonEnd:function(){$n.lineStart=$n.lineEnd=$n.point=Ie,mf.add(J(hf)),hf=new at},result:function(){var e=mf/2;return mf=new at,e}};function q2(){$n.point=P2}function P2(e,t){$n.point=fg,lg=yf=e,ug=gf=t}function fg(e,t){hf.add(gf*e-yf*t),yf=e,gf=t}function B2(){fg(lg,ug)}var vf=$n;var so=1/0,Fs=so,qi=-so,Os=qi,A2={point:L2,lineStart:Ie,lineEnd:Ie,polygonStart:Ie,polygonEnd:Ie,result:function(){var e=[[so,Fs],[qi,Os]];return qi=Os=-(Fs=so=1/0),e}};function L2(e,t){e<so&&(so=e),e>qi&&(qi=e),t<Fs&&(Fs=t),t>Os&&(Os=t)}var co=A2;var bf=0,xf=0,Pi=0,Ns=0,js=0,lo=0,wf=0,kf=0,Bi=0,mg,hg,Ht,Wt,Pt={point:br,lineStart:dg,lineEnd:pg,polygonStart:function(){Pt.lineStart=N2,Pt.lineEnd=j2},polygonEnd:function(){Pt.point=br,Pt.lineStart=dg,Pt.lineEnd=pg},result:function(){var e=Bi?[wf/Bi,kf/Bi]:lo?[Ns/lo,js/lo]:Pi?[bf/Pi,xf/Pi]:[NaN,NaN];return bf=xf=Pi=Ns=js=lo=wf=kf=Bi=0,e}};function br(e,t){bf+=e,xf+=t,++Pi}function dg(){Pt.point=F2}function F2(e,t){Pt.point=O2,br(Ht=e,Wt=t)}function O2(e,t){var n=e-Ht,r=t-Wt,o=de(n*n+r*r);Ns+=o*(Ht+e)/2,js+=o*(Wt+t)/2,lo+=o,br(Ht=e,Wt=t)}function pg(){Pt.point=br}function N2(){Pt.point=$2}function j2(){yg(mg,hg)}function $2(e,t){Pt.point=yg,br(mg=Ht=e,hg=Wt=t)}function yg(e,t){var n=e-Ht,r=t-Wt,o=de(n*n+r*r);Ns+=o*(Ht+e)/2,js+=o*(Wt+t)/2,lo+=o,o=Wt*e-Ht*t,wf+=o*(Ht+e),kf+=o*(Wt+t),Bi+=o*3,br(Ht=e,Wt=t)}var Sf=Pt;function $s(e){this._context=e}$s.prototype={_radius:4.5,pointRadius:function(e){return this._radius=e,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(e,t){switch(this._point){case 0:{this._context.moveTo(e,t),this._point=1;break}case 1:{this._context.lineTo(e,t);break}default:{this._context.moveTo(e+this._radius,t),this._context.arc(e,t,this._radius,0,Ee);break}}},result:Ie};var Cf=new at,Tf,gg,vg,Ai,Li,zs={point:Ie,lineStart:function(){zs.point=z2},lineEnd:function(){Tf&&bg(gg,vg),zs.point=Ie},polygonStart:function(){Tf=!0},polygonEnd:function(){Tf=null},result:function(){var e=+Cf;return Cf=new at,e}};function z2(e,t){zs.point=bg,gg=Ai=e,vg=Li=t}function bg(e,t){Ai-=e,Li-=t,Cf.add(de(Ai*Ai+Li*Li)),Ai=e,Li=t}var _f=zs;var xg,Ys,wg,kg,uo=class{constructor(t){this._append=t==null?Sg:Y2(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(t,n){switch(this._point){case 0:{this._append`M${t},${n}`,this._point=1;break}case 1:{this._append`L${t},${n}`;break}default:{if(this._append`M${t},${n}`,this._radius!==wg||this._append!==Ys){let r=this._radius,o=this._;this._="",this._append`m0,${r}a${r},${r} 0 1,1 0,${-2*r}a${r},${r} 0 1,1 0,${2*r}z`,wg=r,Ys=this._append,kg=this._,this._=o}this._+=kg;break}}}result(){let t=this._;return this._="",t.length?t:null}};function Sg(e){let t=1;this._+=e[0];for(let n=e.length;t<n;++t)this._+=arguments[t]+e[t]}function Y2(e){let t=Math.floor(e);if(!(t>=0))throw new RangeError(`invalid digits: ${e}`);if(t>15)return Sg;if(t!==xg){let n=10**t;xg=t,Ys=function(o){let i=1;this._+=o[0];for(let a=o.length;i<a;++i)this._+=Math.round(arguments[i]*n)/n+o[i]}}return Ys}function fo(e,t){let n=3,r=4.5,o,i;function a(s){return s&&(typeof r=="function"&&i.pointRadius(+r.apply(this,arguments)),qt(s,o(i))),i.result()}return a.area=function(s){return qt(s,o(vf)),vf.result()},a.measure=function(s){return qt(s,o(_f)),_f.result()},a.bounds=function(s){return qt(s,o(co)),co.result()},a.centroid=function(s){return qt(s,o(Sf)),Sf.result()},a.projection=function(s){return arguments.length?(o=s==null?(e=null,Ii):(e=s).stream,a):e},a.context=function(s){return arguments.length?(i=s==null?(t=null,new uo(n)):new $s(t=s),typeof r!="function"&&i.pointRadius(r),a):t},a.pointRadius=function(s){return arguments.length?(r=typeof s=="function"?s:(i.pointRadius(+s),+s),a):r},a.digits=function(s){if(!arguments.length)return n;if(s==null)n=null;else{let c=Math.floor(s);if(!(c>=0))throw new RangeError(`invalid digits: ${s}`);n=c}return t===null&&(i=new uo(n)),a},a.projection(e).digits(n).context(t)}function po(e){return{stream:mo(e)}}function mo(e){return function(t){var n=new Df;for(var r in e)n[r]=e[r];return n.stream=t,n}}function Df(){}Df.prototype={constructor:Df,point:function(e,t){this.stream.point(e,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Mf(e,t,n){var r=e.clipExtent&&e.clipExtent();return e.scale(150).translate([0,0]),r!=null&&e.clipExtent(null),qt(n,e.stream(co)),t(co.result()),r!=null&&e.clipExtent(r),e}function Fi(e,t,n){return Mf(e,function(r){var o=t[1][0]-t[0][0],i=t[1][1]-t[0][1],a=Math.min(o/(r[1][0]-r[0][0]),i/(r[1][1]-r[0][1])),s=+t[0][0]+(o-a*(r[1][0]+r[0][0]))/2,c=+t[0][1]+(i-a*(r[1][1]+r[0][1]))/2;e.scale(150*a).translate([s,c])},n)}function Hs(e,t,n){return Fi(e,[[0,0],t],n)}function Ws(e,t,n){return Mf(e,function(r){var o=+t,i=o/(r[1][0]-r[0][0]),a=(o-i*(r[1][0]+r[0][0]))/2,s=-i*r[0][1];e.scale(150*i).translate([a,s])},n)}function Us(e,t,n){return Mf(e,function(r){var o=+t,i=o/(r[1][1]-r[0][1]),a=-i*r[0][0],s=(o-i*(r[1][1]+r[0][1]))/2;e.scale(150*i).translate([a,s])},n)}var Tg=16,H2=Y(30*ce);function Rf(e,t){return+t?U2(e,t):W2(e)}function W2(e){return mo({point:function(t,n){t=e(t,n),this.stream.point(t[0],t[1])}})}function U2(e,t){function n(r,o,i,a,s,c,u,l,d,f,p,m,h,y){var b=u-r,g=l-o,w=b*b+g*g;if(w>4*t&&h--){var v=a+f,S=s+p,x=c+m,k=de(v*v+S*S+x*x),T=xe(x/=k),_=J(J(x)-1)<W||J(i-d)<W?(i+d)/2:Ne(S,v),I=e(_,T),D=I[0],R=I[1],O=D-r,A=R-o,C=g*O-b*A;(C*C/w>t||J((b*O+g*A)/w-.5)>.3||a*f+s*p+c*m<H2)&&(n(r,o,i,a,s,c,D,R,_,v/=k,S/=k,x,h,y),y.point(D,R),n(D,R,_,v,S,x,u,l,d,f,p,m,h,y))}}return function(r){var o,i,a,s,c,u,l,d,f,p,m,h,y={point:b,lineStart:g,lineEnd:v,polygonStart:function(){r.polygonStart(),y.lineStart=S},polygonEnd:function(){r.polygonEnd(),y.lineStart=g}};function b(T,_){T=e(T,_),r.point(T[0],T[1])}function g(){d=NaN,y.point=w,r.lineStart()}function w(T,_){var I=Yt([T,_]),D=e(T,_);n(d,f,l,p,m,h,d=D[0],f=D[1],l=T,p=I[0],m=I[1],h=I[2],Tg,r),r.point(d,f)}function v(){y.point=b,r.lineEnd()}function S(){g(),y.point=x,y.lineEnd=k}function x(T,_){w(o=T,_),i=d,a=f,s=p,c=m,u=h,y.point=w}function k(){n(d,f,l,p,m,h,i,a,o,s,c,u,Tg,r),y.lineEnd=v,v()}return y}}var V2=mo({point:function(e,t){this.stream.point(e*ce,t*ce)}});function G2(e){return mo({point:function(t,n){var r=e(t,n);return this.stream.point(r[0],r[1])}})}function K2(e,t,n,r,o){function i(a,s){return a*=r,s*=o,[t+e*a,n-e*s]}return i.invert=function(a,s){return[(a-t)/e*r,(n-s)/e*o]},i}function Cg(e,t,n,r,o,i){if(!i)return K2(e,t,n,r,o);var a=Y(i),s=$(i),c=a*e,u=s*e,l=a/e,d=s/e,f=(s*n-a*t)/e,p=(s*t+a*n)/e;function m(h,y){return h*=r,y*=o,[c*h-u*y+t,n-u*h-c*y]}return m.invert=function(h,y){return[r*(l*h-d*y+f),o*(p-d*h-l*y)]},m}function je(e){return Ef(function(){return e})()}function Ef(e){var t,n=150,r=480,o=250,i=0,a=0,s=0,c=0,u=0,l,d=0,f=1,p=1,m=null,h=pf,y=null,b,g,w,v=Ii,S=.5,x,k,T,_,I;function D(C){return T(C[0]*ce,C[1]*ce)}function R(C){return C=T.invert(C[0],C[1]),C&&[C[0]*Re,C[1]*Re]}D.stream=function(C){return _&&I===C?_:_=V2(G2(l)(h(x(v(I=C)))))},D.preclip=function(C){return arguments.length?(h=C,m=void 0,A()):h},D.postclip=function(C){return arguments.length?(v=C,y=b=g=w=null,A()):v},D.clipAngle=function(C){return arguments.length?(h=+C?sg(m=C*ce):(m=null,pf),A()):m*Re},D.clipExtent=function(C){return arguments.length?(v=C==null?(y=b=g=w=null,Ii):ao(y=+C[0][0],b=+C[0][1],g=+C[1][0],w=+C[1][1]),A()):y==null?null:[[y,b],[g,w]]},D.scale=function(C){return arguments.length?(n=+C,O()):n},D.translate=function(C){return arguments.length?(r=+C[0],o=+C[1],O()):[r,o]},D.center=function(C){return arguments.length?(i=C[0]%360*ce,a=C[1]%360*ce,O()):[i*Re,a*Re]},D.rotate=function(C){return arguments.length?(s=C[0]%360*ce,c=C[1]%360*ce,u=C.length>2?C[2]%360*ce:0,O()):[s*Re,c*Re,u*Re]},D.angle=function(C){return arguments.length?(d=C%360*ce,O()):d*Re},D.reflectX=function(C){return arguments.length?(f=C?-1:1,O()):f<0},D.reflectY=function(C){return arguments.length?(p=C?-1:1,O()):p<0},D.precision=function(C){return arguments.length?(x=Rf(k,S=C*C),A()):de(S)},D.fitExtent=function(C,F){return Fi(D,C,F)},D.fitSize=function(C,F){return Hs(D,C,F)},D.fitWidth=function(C,F){return Ws(D,C,F)},D.fitHeight=function(C,F){return Us(D,C,F)};function O(){var C=Cg(n,0,0,f,p,d).apply(null,t(i,a)),F=Cg(n,r-C[0],o-C[1],f,p,d);return l=ff(s,c,u),k=Ri(t,F),T=Ri(l,k),x=Rf(k,S),A()}function A(){return _=I=null,D}return function(){return t=e.apply(this,arguments),D.invert=t.invert&&R,O()}}function ho(e){var t=0,n=X/3,r=Ef(e),o=r(t,n);return o.parallels=function(i){return arguments.length?r(t=i[0]*ce,n=i[1]*ce):[t*Re,n*Re]},o}function _g(e){var t=Y(e);function n(r,o){return[r*t,$(o)/t]}return n.invert=function(r,o){return[r/t,xe(o*t)]},n}function Dg(e,t){var n=$(e),r=(n+$(t))/2;if(J(r)<W)return _g(e);var o=1+n*(2*r-n),i=de(o)/r;function a(s,c){var u=de(o-2*r*$(c))/r;return[u*$(s*=r),i-u*Y(s)]}return a.invert=function(s,c){var u=i-c,l=Ne(s,J(u))*Ue(u);return u*r<0&&(l-=X*Ue(s)*Ue(u)),[l/r,xe((o-(s*s+u*u)*r*r)/(2*r))]},a}function zn(){return ho(Dg).scale(155.424).center([0,33.6442])}function Oi(){return zn().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function X2(e){var t=e.length;return{point:function(n,r){for(var o=-1;++o<t;)e[o].point(n,r)},sphere:function(){for(var n=-1;++n<t;)e[n].sphere()},lineStart:function(){for(var n=-1;++n<t;)e[n].lineStart()},lineEnd:function(){for(var n=-1;++n<t;)e[n].lineEnd()},polygonStart:function(){for(var n=-1;++n<t;)e[n].polygonStart()},polygonEnd:function(){for(var n=-1;++n<t;)e[n].polygonEnd()}}}function If(){var e,t,n=Oi(),r,o=zn().rotate([154,0]).center([-2,58.5]).parallels([55,65]),i,a=zn().rotate([157,0]).center([-3,19.9]).parallels([8,18]),s,c,u={point:function(f,p){c=[f,p]}};function l(f){var p=f[0],m=f[1];return c=null,r.point(p,m),c||(i.point(p,m),c)||(s.point(p,m),c)}l.invert=function(f){var p=n.scale(),m=n.translate(),h=(f[0]-m[0])/p,y=(f[1]-m[1])/p;return(y>=.12&&y<.234&&h>=-.425&&h<-.214?o:y>=.166&&y<.234&&h>=-.214&&h<-.115?a:n).invert(f)},l.stream=function(f){return e&&t===f?e:e=X2([n.stream(t=f),o.stream(f),a.stream(f)])},l.precision=function(f){return arguments.length?(n.precision(f),o.precision(f),a.precision(f),d()):n.precision()},l.scale=function(f){return arguments.length?(n.scale(f),o.scale(f*.35),a.scale(f),l.translate(n.translate())):n.scale()},l.translate=function(f){if(!arguments.length)return n.translate();var p=n.scale(),m=+f[0],h=+f[1];return r=n.translate(f).clipExtent([[m-.455*p,h-.238*p],[m+.455*p,h+.238*p]]).stream(u),i=o.translate([m-.307*p,h+.201*p]).clipExtent([[m-.425*p+W,h+.12*p+W],[m-.214*p-W,h+.234*p-W]]).stream(u),s=a.translate([m-.205*p,h+.212*p]).clipExtent([[m-.214*p+W,h+.166*p+W],[m-.115*p-W,h+.234*p-W]]).stream(u),d()},l.fitExtent=function(f,p){return Fi(l,f,p)},l.fitSize=function(f,p){return Hs(l,f,p)},l.fitWidth=function(f,p){return Ws(l,f,p)},l.fitHeight=function(f,p){return Us(l,f,p)};function d(){return e=t=null,l}return l.scale(1070)}function Vs(e){return function(t,n){var r=Y(t),o=Y(n),i=e(r*o);return i===1/0?[2,0]:[i*o*$(t),i*$(n)]}}function Ut(e){return function(t,n){var r=de(t*t+n*n),o=e(r),i=$(o),a=Y(o);return[Ne(t*i,r*a),xe(r&&n*i/r)]}}var qf=Vs(function(e){return de(2/(1+e))});qf.invert=Ut(function(e){return 2*xe(e/2)});function Pf(){return je(qf).scale(124.75).clipAngle(180-.001)}var Bf=Vs(function(e){return(e=Rs(e))&&e/$(e)});Bf.invert=Ut(function(e){return e});function Af(){return je(Bf).scale(79.4188).clipAngle(180-.001)}function yo(e,t){return[e,vr(ro((se+t)/2))]}yo.invert=function(e,t){return[e,2*vt(Ds(t))-se]};function Lf(){return Ff(yo).scale(961/Ee)}function Ff(e){var t=je(e),n=t.center,r=t.scale,o=t.translate,i=t.clipExtent,a=null,s,c,u;t.scale=function(d){return arguments.length?(r(d),l()):r()},t.translate=function(d){return arguments.length?(o(d),l()):o()},t.center=function(d){return arguments.length?(n(d),l()):n()},t.clipExtent=function(d){return arguments.length?(d==null?a=s=c=u=null:(a=+d[0][0],s=+d[0][1],c=+d[1][0],u=+d[1][1]),l()):a==null?null:[[a,s],[c,u]]};function l(){var d=X*r(),f=t(ng(t.rotate()).invert([0,0]));return i(a==null?[[f[0]-d,f[1]-d],[f[0]+d,f[1]+d]]:e===yo?[[Math.max(f[0]-d,a),s],[Math.min(f[0]+d,c),u]]:[[a,Math.max(f[1]-d,s)],[c,Math.min(f[1]+d,u)]])}return l()}function Gs(e){return ro((se+e)/2)}function Mg(e,t){var n=Y(e),r=e===t?$(e):vr(n/Y(t))/vr(Gs(t)/Gs(e)),o=n*Ms(Gs(e),r)/r;if(!r)return yo;function i(a,s){o>0?s<-se+W&&(s=-se+W):s>se-W&&(s=se-W);var c=o/Ms(Gs(s),r);return[c*$(r*a),o-c*Y(r*a)]}return i.invert=function(a,s){var c=o-s,u=Ue(r)*de(a*a+c*c),l=Ne(a,J(c))*Ue(c);return c*r<0&&(l-=X*Ue(a)*Ue(c)),[l/r,2*vt(Ms(o/u,1/r))-se]},i}function Of(){return ho(Mg).scale(109.5).parallels([30,30])}function go(e,t){return[e,t]}go.invert=go;function Nf(){return je(go).scale(152.63)}function Rg(e,t){var n=Y(e),r=e===t?$(e):(n-Y(t))/(t-e),o=n/r+e;if(J(r)<W)return go;function i(a,s){var c=o-s,u=r*a;return[c*$(u),o-c*Y(u)]}return i.invert=function(a,s){var c=o-s,u=Ne(a,J(c))*Ue(c);return c*r<0&&(u-=X*Ue(a)*Ue(c)),[u/r,o-Ue(r)*de(a*a+c*c)]},i}function jf(){return ho(Rg).scale(131.154).center([0,13.9389])}var Ni=1.340264,ji=-.081106,$i=893e-6,zi=.003796,Ks=de(3)/2,Q2=12;function $f(e,t){var n=xe(Ks*$(t)),r=n*n,o=r*r*r;return[e*Y(n)/(Ks*(Ni+3*ji*r+o*(7*$i+9*zi*r))),n*(Ni+ji*r+o*($i+zi*r))]}$f.invert=function(e,t){for(var n=t,r=n*n,o=r*r*r,i=0,a,s,c;i<Q2&&(s=n*(Ni+ji*r+o*($i+zi*r))-t,c=Ni+3*ji*r+o*(7*$i+9*zi*r),n-=a=s/c,r=n*n,o=r*r*r,!(J(a)<_s));++i);return[Ks*e*(Ni+3*ji*r+o*(7*$i+9*zi*r))/Y(n),xe($(n)/Ks)]};function zf(){return je($f).scale(177.158)}function Yf(e,t){var n=Y(t),r=Y(e)*n;return[n*$(e)/r,$(t)/r]}Yf.invert=Ut(vt);function Hf(){return je(Yf).scale(144.049).clipAngle(60)}function Wf(e,t){return[Y(t)*$(e),$(t)]}Wf.invert=Ut(xe);function Uf(){return je(Wf).scale(249.5).clipAngle(90+W)}function Vf(e,t){var n=Y(t),r=1+Y(e)*n;return[n*$(e)/r,$(t)/r]}Vf.invert=Ut(function(e){return 2*vt(e)});function Gf(){return je(Vf).scale(250).clipAngle(142)}function Kf(e,t){return[vr(ro((se+t)/2)),-e]}Kf.invert=function(e,t){return[-t,2*vt(Ds(e))-se]};function Xf(){var e=Ff(Kf),t=e.center,n=e.rotate;return e.center=function(r){return arguments.length?t([-r[1],r[0]]):(r=t(),[r[1],-r[0]])},e.rotate=function(r){return arguments.length?n([r[0],r[1],r.length>2?r[2]+90:90]):(r=n(),[r[0],r[1],r[2]-90])},n([0,0,90]).scale(159.155)}function De(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e);break}return this}function Yi(e,t){switch(arguments.length){case 0:break;case 1:{typeof e=="function"?this.interpolator(e):this.range(e);break}default:{this.domain(e),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}var Hi=Symbol("implicit");function xr(){var e=new pt,t=[],n=[],r=Hi;function o(i){let a=e.get(i);if(a===void 0){if(r!==Hi)return r;e.set(i,a=t.push(i)-1)}return n[a%n.length]}return o.domain=function(i){if(!arguments.length)return t.slice();t=[],e=new pt;for(let a of i)e.has(a)||e.set(a,t.push(a)-1);return o},o.range=function(i){return arguments.length?(n=Array.from(i),o):n.slice()},o.unknown=function(i){return arguments.length?(r=i,o):r},o.copy=function(){return xr(t,n).unknown(r)},De.apply(o,arguments),o}function Yn(){var e=xr().unknown(void 0),t=e.domain,n=e.range,r=0,o=1,i,a,s=!1,c=0,u=0,l=.5;delete e.unknown;function d(){var f=t().length,p=o<r,m=p?o:r,h=p?r:o;i=(h-m)/Math.max(1,f-c+u*2),s&&(i=Math.floor(i)),m+=(h-m-i*(f-c))*l,a=i*(1-c),s&&(m=Math.round(m),a=Math.round(a));var y=sr(f).map(function(b){return m+i*b});return n(p?y.reverse():y)}return e.domain=function(f){return arguments.length?(t(f),d()):t()},e.range=function(f){return arguments.length?([r,o]=f,r=+r,o=+o,d()):[r,o]},e.rangeRound=function(f){return[r,o]=f,r=+r,o=+o,s=!0,d()},e.bandwidth=function(){return a},e.step=function(){return i},e.round=function(f){return arguments.length?(s=!!f,d()):s},e.padding=function(f){return arguments.length?(c=Math.min(1,u=+f),d()):c},e.paddingInner=function(f){return arguments.length?(c=Math.min(1,f),d()):c},e.paddingOuter=function(f){return arguments.length?(u=+f,d()):u},e.align=function(f){return arguments.length?(l=Math.max(0,Math.min(1,f)),d()):l},e.copy=function(){return Yn(t(),[r,o]).round(s).paddingInner(c).paddingOuter(u).align(l)},De.apply(d(),arguments)}function Eg(e){var t=e.copy;return e.padding=e.paddingOuter,delete e.paddingInner,delete e.paddingOuter,e.copy=function(){return Eg(t())},e}function Qf(){return Eg(Yn.apply(null,arguments).paddingInner(1))}function Zf(e){return function(){return e}}function vo(e){return+e}var Ig=[0,1];function tt(e){return e}function Jf(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:Zf(isNaN(t)?NaN:.5)}function Z2(e,t){var n;return e>t&&(n=e,e=t,t=n),function(r){return Math.max(e,Math.min(t,r))}}function J2(e,t,n){var r=e[0],o=e[1],i=t[0],a=t[1];return o<r?(r=Jf(o,r),i=n(a,i)):(r=Jf(r,o),i=n(i,a)),function(s){return i(r(s))}}function ek(e,t,n){var r=Math.min(e.length,t.length)-1,o=new Array(r),i=new Array(r),a=-1;for(e[r]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++a<r;)o[a]=Jf(e[a],e[a+1]),i[a]=n(t[a],t[a+1]);return function(s){var c=ir(e,s,1,r)-1;return i[c](o[c](s))}}function Vt(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())}function wr(){var e=Ig,t=Ig,n=Et,r,o,i,a=tt,s,c,u;function l(){var f=Math.min(e.length,t.length);return a!==tt&&(a=Z2(e[0],e[f-1])),s=f>2?ek:J2,c=u=null,d}function d(f){return f==null||isNaN(f=+f)?i:(c||(c=s(e.map(r),t,n)))(r(a(f)))}return d.invert=function(f){return a(o((u||(u=s(t,e.map(r),me)))(f)))},d.domain=function(f){return arguments.length?(e=Array.from(f,vo),l()):e.slice()},d.range=function(f){return arguments.length?(t=Array.from(f),l()):t.slice()},d.rangeRound=function(f){return t=Array.from(f),n=mr,l()},d.clamp=function(f){return arguments.length?(a=f?!0:tt,l()):a!==tt},d.interpolate=function(f){return arguments.length?(n=f,l()):n},d.unknown=function(f){return arguments.length?(i=f,d):i},function(f,p){return r=f,o=p,l()}}function Wi(){return wr()(tt,tt)}function ed(e,t,n,r){var o=Vr(e,t,n),i;switch(r=zt(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(e),Math.abs(t));return r.precision==null&&!isNaN(i=af(o,a))&&(r.precision=i),Cs(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(i=sf(o,Math.max(Math.abs(e),Math.abs(t))))&&(r.precision=i-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(i=of(o))&&(r.precision=i-(r.type==="%")*2);break}}return gt(r)}function gn(e){var t=e.domain;return e.ticks=function(n){var r=t();return ln(r[0],r[r.length-1],n??10)},e.tickFormat=function(n,r){var o=t();return ed(o[0],o[o.length-1],n??10,r)},e.nice=function(n){n==null&&(n=10);var r=t(),o=0,i=r.length-1,a=r[o],s=r[i],c,u,l=10;for(s<a&&(u=a,a=s,s=u,u=o,o=i,i=u);l-- >0;){if(u=ii(a,s,n),u===c)return r[o]=a,r[i]=s,t(r);if(u>0)a=Math.floor(a/u)*u,s=Math.ceil(s/u)*u;else if(u<0)a=Math.ceil(a*u)/u,s=Math.floor(s*u)/u;else break;c=u}return e},e}function kr(){var e=Wi();return e.copy=function(){return Vt(e,kr())},De.apply(e,arguments),gn(e)}function Ui(e){var t;function n(r){return r==null||isNaN(r=+r)?t:r}return n.invert=n,n.domain=n.range=function(r){return arguments.length?(e=Array.from(r,vo),n):e.slice()},n.unknown=function(r){return arguments.length?(t=r,n):t},n.copy=function(){return Ui(e).unknown(t)},e=arguments.length?Array.from(e,vo):[0,1],gn(n)}function Vi(e,t){e=e.slice();var n=0,r=e.length-1,o=e[n],i=e[r],a;return i<o&&(a=n,n=r,r=a,a=o,o=i,i=a),e[n]=t.floor(o),e[r]=t.ceil(i),e}function qg(e){return Math.log(e)}function Pg(e){return Math.exp(e)}function tk(e){return-Math.log(-e)}function nk(e){return-Math.exp(-e)}function rk(e){return isFinite(e)?+("1e"+e):e<0?0:e}function ok(e){return e===10?rk:e===Math.E?Math.exp:t=>Math.pow(e,t)}function ik(e){return e===Math.E?Math.log:e===10&&Math.log10||e===2&&Math.log2||(e=Math.log(e),t=>Math.log(t)/e)}function Bg(e){return(t,n)=>-e(-t,n)}function td(e){let t=e(qg,Pg),n=t.domain,r=10,o,i;function a(){return o=ik(r),i=ok(r),n()[0]<0?(o=Bg(o),i=Bg(i),e(tk,nk)):e(qg,Pg),t}return t.base=function(s){return arguments.length?(r=+s,a()):r},t.domain=function(s){return arguments.length?(n(s),a()):n()},t.ticks=s=>{let c=n(),u=c[0],l=c[c.length-1],d=l<u;d&&([u,l]=[l,u]);let f=o(u),p=o(l),m,h,y=s==null?10:+s,b=[];if(!(r%1)&&p-f<y){if(f=Math.floor(f),p=Math.ceil(p),u>0){for(;f<=p;++f)for(m=1;m<r;++m)if(h=f<0?m/i(-f):m*i(f),!(h<u)){if(h>l)break;b.push(h)}}else for(;f<=p;++f)for(m=r-1;m>=1;--m)if(h=f>0?m/i(-f):m*i(f),!(h<u)){if(h>l)break;b.push(h)}b.length*2<y&&(b=ln(u,l,y))}else b=ln(f,p,Math.min(p-f,y)).map(i);return d?b.reverse():b},t.tickFormat=(s,c)=>{if(s==null&&(s=10),c==null&&(c=r===10?"s":","),typeof c!="function"&&(!(r%1)&&(c=zt(c)).precision==null&&(c.trim=!0),c=gt(c)),s===1/0)return c;let u=Math.max(1,r*s/t.ticks().length);return l=>{let d=l/i(Math.round(o(l)));return d*r<r-.5&&(d*=r),d<=u?c(l):""}},t.nice=()=>n(Vi(n(),{floor:s=>i(Math.floor(o(s))),ceil:s=>i(Math.ceil(o(s)))})),t}function Gi(){let e=td(wr()).domain([1,10]);return e.copy=()=>Vt(e,Gi()).base(e.base()),De.apply(e,arguments),e}function Ag(e){return function(t){return Math.sign(t)*Math.log1p(Math.abs(t/e))}}function Lg(e){return function(t){return Math.sign(t)*Math.expm1(Math.abs(t))*e}}function nd(e){var t=1,n=e(Ag(t),Lg(t));return n.constant=function(r){return arguments.length?e(Ag(t=+r),Lg(t)):t},gn(n)}function Ki(){var e=nd(wr());return e.copy=function(){return Vt(e,Ki()).constant(e.constant())},De.apply(e,arguments)}function Fg(e){return function(t){return t<0?-Math.pow(-t,e):Math.pow(t,e)}}function ak(e){return e<0?-Math.sqrt(-e):Math.sqrt(e)}function sk(e){return e<0?-e*e:e*e}function rd(e){var t=e(tt,tt),n=1;function r(){return n===1?e(tt,tt):n===.5?e(ak,sk):e(Fg(n),Fg(1/n))}return t.exponent=function(o){return arguments.length?(n=+o,r()):n},gn(t)}function Xi(){var e=rd(wr());return e.copy=function(){return Vt(e,Xi()).exponent(e.exponent())},De.apply(e,arguments),e}function Qi(){var e=[],t=[],n=[],r;function o(){var a=0,s=Math.max(1,t.length);for(n=new Array(s-1);++a<s;)n[a-1]=Tu(e,a/s);return i}function i(a){return a==null||isNaN(a=+a)?r:t[ir(n,a)]}return i.invertExtent=function(a){var s=t.indexOf(a);return s<0?[NaN,NaN]:[s>0?n[s-1]:e[0],s<n.length?n[s]:e[e.length-1]]},i.domain=function(a){if(!arguments.length)return e.slice();e=[];for(let s of a)s!=null&&!isNaN(s=+s)&&e.push(s);return e.sort(Xe),o()},i.range=function(a){return arguments.length?(t=Array.from(a),o()):t.slice()},i.unknown=function(a){return arguments.length?(r=a,i):r},i.quantiles=function(){return n.slice()},i.copy=function(){return Qi().domain(e).range(t).unknown(r)},De.apply(i,arguments)}function Zi(){var e=[.5],t=[0,1],n,r=1;function o(i){return i!=null&&i<=i?t[ir(e,i,0,r)]:n}return o.domain=function(i){return arguments.length?(e=Array.from(i),r=Math.min(e.length,t.length-1),o):e.slice()},o.range=function(i){return arguments.length?(t=Array.from(i),r=Math.min(e.length,t.length-1),o):t.slice()},o.invertExtent=function(i){var a=t.indexOf(i);return[e[a-1],e[a]]},o.unknown=function(i){return arguments.length?(n=i,o):n},o.copy=function(){return Zi().domain(e).range(t).unknown(n)},De.apply(o,arguments)}var od=new Date,id=new Date;function fe(e,t,n,r){function o(i){return e(i=arguments.length===0?new Date:new Date(+i)),i}return o.floor=i=>(e(i=new Date(+i)),i),o.ceil=i=>(e(i=new Date(i-1)),t(i,1),e(i),i),o.round=i=>{let a=o(i),s=o.ceil(i);return i-a<s-i?a:s},o.offset=(i,a)=>(t(i=new Date(+i),a==null?1:Math.floor(a)),i),o.range=(i,a,s)=>{let c=[];if(i=o.ceil(i),s=s==null?1:Math.floor(s),!(i<a)||!(s>0))return c;let u;do c.push(u=new Date(+i)),t(i,s),e(i);while(u<i&&i<a);return c},o.filter=i=>fe(a=>{if(a>=a)for(;e(a),!i(a);)a.setTime(a-1)},(a,s)=>{if(a>=a)if(s<0)for(;++s<=0;)for(;t(a,-1),!i(a););else for(;--s>=0;)for(;t(a,1),!i(a););}),n&&(o.count=(i,a)=>(od.setTime(+i),id.setTime(+a),e(od),e(id),Math.floor(n(od,id))),o.every=i=>(i=Math.floor(i),!isFinite(i)||!(i>0)?null:i>1?o.filter(r?a=>r(a)%i===0:a=>o.count(0,a)%i===0):o)),o}var Ji=fe(()=>{},(e,t)=>{e.setTime(+e+t)},(e,t)=>t-e);Ji.every=e=>(e=Math.floor(e),!isFinite(e)||!(e>0)?null:e>1?fe(t=>{t.setTime(Math.floor(t/e)*e)},(t,n)=>{t.setTime(+t+n*e)},(t,n)=>(n-t)/e):Ji);var mq=Ji.range;var qe=fe(e=>{e.setTime(e-e.getMilliseconds())},(e,t)=>{e.setTime(+e+t*1e3)},(e,t)=>(t-e)/1e3,e=>e.getUTCSeconds()),Og=qe.range;var vn=fe(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*1e3)},(e,t)=>{e.setTime(+e+t*6e4)},(e,t)=>(t-e)/6e4,e=>e.getMinutes()),ck=vn.range,bn=fe(e=>{e.setUTCSeconds(0,0)},(e,t)=>{e.setTime(+e+t*6e4)},(e,t)=>(t-e)/6e4,e=>e.getUTCMinutes()),lk=bn.range;var xn=fe(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*1e3-e.getMinutes()*6e4)},(e,t)=>{e.setTime(+e+t*36e5)},(e,t)=>(t-e)/36e5,e=>e.getHours()),uk=xn.range,wn=fe(e=>{e.setUTCMinutes(0,0,0)},(e,t)=>{e.setTime(+e+t*36e5)},(e,t)=>(t-e)/36e5,e=>e.getUTCHours()),fk=wn.range;var bt=fe(e=>e.setHours(0,0,0,0),(e,t)=>e.setDate(e.getDate()+t),(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*6e4)/864e5,e=>e.getDate()-1),dk=bt.range,Cr=fe(e=>{e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t)},(e,t)=>(t-e)/864e5,e=>e.getUTCDate()-1),pk=Cr.range,_r=fe(e=>{e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t)},(e,t)=>(t-e)/864e5,e=>Math.floor(e/864e5)),mk=_r.range;function Dr(e){return fe(t=>{t.setDate(t.getDate()-(t.getDay()+7-e)%7),t.setHours(0,0,0,0)},(t,n)=>{t.setDate(t.getDate()+n*7)},(t,n)=>(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*6e4)/6048e5)}var st=Dr(0),Hn=Dr(1),Xs=Dr(2),Qs=Dr(3),Kt=Dr(4),Zs=Dr(5),Js=Dr(6),jg=st.range,hk=Hn.range,yk=Xs.range,gk=Qs.range,vk=Kt.range,bk=Zs.range,xk=Js.range;function Mr(e){return fe(t=>{t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7),t.setUTCHours(0,0,0,0)},(t,n)=>{t.setUTCDate(t.getUTCDate()+n*7)},(t,n)=>(n-t)/6048e5)}var ct=Mr(0),Wn=Mr(1),ec=Mr(2),tc=Mr(3),Xt=Mr(4),nc=Mr(5),rc=Mr(6),$g=ct.range,wk=Wn.range,kk=ec.range,Sk=tc.range,Tk=Xt.range,Ck=nc.range,_k=rc.range;var kn=fe(e=>{e.setDate(1),e.setHours(0,0,0,0)},(e,t)=>{e.setMonth(e.getMonth()+t)},(e,t)=>t.getMonth()-e.getMonth()+(t.getFullYear()-e.getFullYear())*12,e=>e.getMonth()),Dk=kn.range,Sn=fe(e=>{e.setUTCDate(1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCMonth(e.getUTCMonth()+t)},(e,t)=>t.getUTCMonth()-e.getUTCMonth()+(t.getUTCFullYear()-e.getUTCFullYear())*12,e=>e.getUTCMonth()),Mk=Sn.range;var Ve=fe(e=>{e.setMonth(0,1),e.setHours(0,0,0,0)},(e,t)=>{e.setFullYear(e.getFullYear()+t)},(e,t)=>t.getFullYear()-e.getFullYear(),e=>e.getFullYear());Ve.every=e=>!isFinite(e=Math.floor(e))||!(e>0)?null:fe(t=>{t.setFullYear(Math.floor(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)},(t,n)=>{t.setFullYear(t.getFullYear()+n*e)});var Rk=Ve.range,Ge=fe(e=>{e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t)},(e,t)=>t.getUTCFullYear()-e.getUTCFullYear(),e=>e.getUTCFullYear());Ge.every=e=>!isFinite(e=Math.floor(e))||!(e>0)?null:fe(t=>{t.setUTCFullYear(Math.floor(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,n)=>{t.setUTCFullYear(t.getUTCFullYear()+n*e)});var Ek=Ge.range;function Yg(e,t,n,r,o,i){let a=[[qe,1,1e3],[qe,5,5*1e3],[qe,15,15*1e3],[qe,30,30*1e3],[i,1,6e4],[i,5,5*6e4],[i,15,15*6e4],[i,30,30*6e4],[o,1,36e5],[o,3,3*36e5],[o,6,6*36e5],[o,12,12*36e5],[r,1,864e5],[r,2,2*864e5],[n,1,6048e5],[t,1,2592e6],[t,3,3*2592e6],[e,1,31536e6]];function s(u,l,d){let f=l<u;f&&([u,l]=[l,u]);let p=d&&typeof d.range=="function"?d:c(u,l,d),m=p?p.range(u,+l+1):[];return f?m.reverse():m}function c(u,l,d){let f=Math.abs(l-u)/d,p=cn(([,,y])=>y).right(a,f);if(p===a.length)return e.every(Vr(u/31536e6,l/31536e6,d));if(p===0)return Ji.every(Math.max(Vr(u,l,d),1));let[m,h]=a[f/a[p-1][2]<a[p][2]/f?p-1:p];return m.every(h)}return[s,c]}var[ad,sd]=Yg(Ge,Sn,ct,_r,wn,bn),[cd,ld]=Yg(Ve,kn,st,bt,xn,vn);function ud(e){if(0<=e.y&&e.y<100){var t=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return t.setFullYear(e.y),t}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function fd(e){if(0<=e.y&&e.y<100){var t=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return t.setUTCFullYear(e.y),t}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function ta(e,t,n){return{y:e,m:t,d:n,H:0,M:0,S:0,L:0}}function dd(e){var t=e.dateTime,n=e.date,r=e.time,o=e.periods,i=e.days,a=e.shortDays,s=e.months,c=e.shortMonths,u=na(o),l=ra(o),d=na(i),f=ra(i),p=na(a),m=ra(a),h=na(s),y=ra(s),b=na(c),g=ra(c),w={a:q,A:K,b:P,B:L,c:null,d:Kg,e:Kg,f:eS,g:uS,G:dS,H:Qk,I:Zk,j:Jk,L:e0,m:tS,M:nS,p:H,q:V,Q:Zg,s:Jg,S:rS,u:oS,U:iS,V:aS,w:sS,W:cS,x:null,X:null,y:lS,Y:fS,Z:pS,"%":Qg},v={a:z,A:ee,b:te,B:ne,c:null,d:Xg,e:Xg,f:gS,g:DS,G:RS,H:mS,I:hS,j:yS,L:n0,m:vS,M:bS,p:j,q:ie,Q:Zg,s:Jg,S:xS,u:wS,U:kS,V:SS,w:TS,W:CS,x:null,X:null,y:_S,Y:MS,Z:ES,"%":Qg},S={a:I,A:D,b:R,B:O,c:A,d:Vg,e:Vg,f:Vk,g:Ug,G:Wg,H:Gg,I:Gg,j:Yk,L:Uk,m:zk,M:Hk,p:_,q:$k,Q:Kk,s:Xk,S:Wk,u:Lk,U:Fk,V:Ok,w:Ak,W:Nk,x:C,X:F,y:Ug,Y:Wg,Z:jk,"%":Gk};w.x=x(n,w),w.X=x(r,w),w.c=x(t,w),v.x=x(n,v),v.X=x(r,v),v.c=x(t,v);function x(E,N){return function(G){var M=[],ue=-1,Z=0,pe=E.length,Se,ot,Hr;for(G instanceof Date||(G=new Date(+G));++ue<pe;)E.charCodeAt(ue)===37&&(M.push(E.slice(Z,ue)),(ot=Hg[Se=E.charAt(++ue)])!=null?Se=E.charAt(++ue):ot=Se==="e"?" ":"0",(Hr=N[Se])&&(Se=Hr(G,ot)),M.push(Se),Z=ue+1);return M.push(E.slice(Z,ue)),M.join("")}}function k(E,N){return function(G){var M=ta(1900,void 0,1),ue=T(M,E,G+="",0),Z,pe;if(ue!=G.length)return null;if("Q"in M)return new Date(M.Q);if("s"in M)return new Date(M.s*1e3+("L"in M?M.L:0));if(N&&!("Z"in M)&&(M.Z=0),"p"in M&&(M.H=M.H%12+M.p*12),M.m===void 0&&(M.m="q"in M?M.q:0),"V"in M){if(M.V<1||M.V>53)return null;"w"in M||(M.w=1),"Z"in M?(Z=fd(ta(M.y,0,1)),pe=Z.getUTCDay(),Z=pe>4||pe===0?Wn.ceil(Z):Wn(Z),Z=Cr.offset(Z,(M.V-1)*7),M.y=Z.getUTCFullYear(),M.m=Z.getUTCMonth(),M.d=Z.getUTCDate()+(M.w+6)%7):(Z=ud(ta(M.y,0,1)),pe=Z.getDay(),Z=pe>4||pe===0?Hn.ceil(Z):Hn(Z),Z=bt.offset(Z,(M.V-1)*7),M.y=Z.getFullYear(),M.m=Z.getMonth(),M.d=Z.getDate()+(M.w+6)%7)}else("W"in M||"U"in M)&&("w"in M||(M.w="u"in M?M.u%7:"W"in M?1:0),pe="Z"in M?fd(ta(M.y,0,1)).getUTCDay():ud(ta(M.y,0,1)).getDay(),M.m=0,M.d="W"in M?(M.w+6)%7+M.W*7-(pe+5)%7:M.w+M.U*7-(pe+6)%7);return"Z"in M?(M.H+=M.Z/100|0,M.M+=M.Z%100,fd(M)):ud(M)}}function T(E,N,G,M){for(var ue=0,Z=N.length,pe=G.length,Se,ot;ue<Z;){if(M>=pe)return-1;if(Se=N.charCodeAt(ue++),Se===37){if(Se=N.charAt(ue++),ot=S[Se in Hg?N.charAt(ue++):Se],!ot||(M=ot(E,G,M))<0)return-1}else if(Se!=G.charCodeAt(M++))return-1}return M}function _(E,N,G){var M=u.exec(N.slice(G));return M?(E.p=l.get(M[0].toLowerCase()),G+M[0].length):-1}function I(E,N,G){var M=p.exec(N.slice(G));return M?(E.w=m.get(M[0].toLowerCase()),G+M[0].length):-1}function D(E,N,G){var M=d.exec(N.slice(G));return M?(E.w=f.get(M[0].toLowerCase()),G+M[0].length):-1}function R(E,N,G){var M=b.exec(N.slice(G));return M?(E.m=g.get(M[0].toLowerCase()),G+M[0].length):-1}function O(E,N,G){var M=h.exec(N.slice(G));return M?(E.m=y.get(M[0].toLowerCase()),G+M[0].length):-1}function A(E,N,G){return T(E,t,N,G)}function C(E,N,G){return T(E,n,N,G)}function F(E,N,G){return T(E,r,N,G)}function q(E){return a[E.getDay()]}function K(E){return i[E.getDay()]}function P(E){return c[E.getMonth()]}function L(E){return s[E.getMonth()]}function H(E){return o[+(E.getHours()>=12)]}function V(E){return 1+~~(E.getMonth()/3)}function z(E){return a[E.getUTCDay()]}function ee(E){return i[E.getUTCDay()]}function te(E){return c[E.getUTCMonth()]}function ne(E){return s[E.getUTCMonth()]}function j(E){return o[+(E.getUTCHours()>=12)]}function ie(E){return 1+~~(E.getUTCMonth()/3)}return{format:function(E){var N=x(E+="",w);return N.toString=function(){return E},N},parse:function(E){var N=k(E+="",!1);return N.toString=function(){return E},N},utcFormat:function(E){var N=x(E+="",v);return N.toString=function(){return E},N},utcParse:function(E){var N=k(E+="",!0);return N.toString=function(){return E},N}}}var Hg={"-":"",_:" ",0:"0"},Pe=/^\s*\d+/,qk=/^%/,Pk=/[\\^$*+?|[\]().{}]/g;function re(e,t,n){var r=e<0?"-":"",o=(r?-e:e)+"",i=o.length;return r+(i<n?new Array(n-i+1).join(t)+o:o)}function Bk(e){return e.replace(Pk,"\\$&")}function na(e){return new RegExp("^(?:"+e.map(Bk).join("|")+")","i")}function ra(e){return new Map(e.map((t,n)=>[t.toLowerCase(),n]))}function Ak(e,t,n){var r=Pe.exec(t.slice(n,n+1));return r?(e.w=+r[0],n+r[0].length):-1}function Lk(e,t,n){var r=Pe.exec(t.slice(n,n+1));return r?(e.u=+r[0],n+r[0].length):-1}function Fk(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.U=+r[0],n+r[0].length):-1}function Ok(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.V=+r[0],n+r[0].length):-1}function Nk(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.W=+r[0],n+r[0].length):-1}function Wg(e,t,n){var r=Pe.exec(t.slice(n,n+4));return r?(e.y=+r[0],n+r[0].length):-1}function Ug(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function jk(e,t,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n,n+6));return r?(e.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function $k(e,t,n){var r=Pe.exec(t.slice(n,n+1));return r?(e.q=r[0]*3-3,n+r[0].length):-1}function zk(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.m=r[0]-1,n+r[0].length):-1}function Vg(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.d=+r[0],n+r[0].length):-1}function Yk(e,t,n){var r=Pe.exec(t.slice(n,n+3));return r?(e.m=0,e.d=+r[0],n+r[0].length):-1}function Gg(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.H=+r[0],n+r[0].length):-1}function Hk(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.M=+r[0],n+r[0].length):-1}function Wk(e,t,n){var r=Pe.exec(t.slice(n,n+2));return r?(e.S=+r[0],n+r[0].length):-1}function Uk(e,t,n){var r=Pe.exec(t.slice(n,n+3));return r?(e.L=+r[0],n+r[0].length):-1}function Vk(e,t,n){var r=Pe.exec(t.slice(n,n+6));return r?(e.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function Gk(e,t,n){var r=qk.exec(t.slice(n,n+1));return r?n+r[0].length:-1}function Kk(e,t,n){var r=Pe.exec(t.slice(n));return r?(e.Q=+r[0],n+r[0].length):-1}function Xk(e,t,n){var r=Pe.exec(t.slice(n));return r?(e.s=+r[0],n+r[0].length):-1}function Kg(e,t){return re(e.getDate(),t,2)}function Qk(e,t){return re(e.getHours(),t,2)}function Zk(e,t){return re(e.getHours()%12||12,t,2)}function Jk(e,t){return re(1+bt.count(Ve(e),e),t,3)}function e0(e,t){return re(e.getMilliseconds(),t,3)}function eS(e,t){return e0(e,t)+"000"}function tS(e,t){return re(e.getMonth()+1,t,2)}function nS(e,t){return re(e.getMinutes(),t,2)}function rS(e,t){return re(e.getSeconds(),t,2)}function oS(e){var t=e.getDay();return t===0?7:t}function iS(e,t){return re(st.count(Ve(e)-1,e),t,2)}function t0(e){var t=e.getDay();return t>=4||t===0?Kt(e):Kt.ceil(e)}function aS(e,t){return e=t0(e),re(Kt.count(Ve(e),e)+(Ve(e).getDay()===4),t,2)}function sS(e){return e.getDay()}function cS(e,t){return re(Hn.count(Ve(e)-1,e),t,2)}function lS(e,t){return re(e.getFullYear()%100,t,2)}function uS(e,t){return e=t0(e),re(e.getFullYear()%100,t,2)}function fS(e,t){return re(e.getFullYear()%1e4,t,4)}function dS(e,t){var n=e.getDay();return e=n>=4||n===0?Kt(e):Kt.ceil(e),re(e.getFullYear()%1e4,t,4)}function pS(e){var t=e.getTimezoneOffset();return(t>0?"-":(t*=-1,"+"))+re(t/60|0,"0",2)+re(t%60,"0",2)}function Xg(e,t){return re(e.getUTCDate(),t,2)}function mS(e,t){return re(e.getUTCHours(),t,2)}function hS(e,t){return re(e.getUTCHours()%12||12,t,2)}function yS(e,t){return re(1+Cr.count(Ge(e),e),t,3)}function n0(e,t){return re(e.getUTCMilliseconds(),t,3)}function gS(e,t){return n0(e,t)+"000"}function vS(e,t){return re(e.getUTCMonth()+1,t,2)}function bS(e,t){return re(e.getUTCMinutes(),t,2)}function xS(e,t){return re(e.getUTCSeconds(),t,2)}function wS(e){var t=e.getUTCDay();return t===0?7:t}function kS(e,t){return re(ct.count(Ge(e)-1,e),t,2)}function r0(e){var t=e.getUTCDay();return t>=4||t===0?Xt(e):Xt.ceil(e)}function SS(e,t){return e=r0(e),re(Xt.count(Ge(e),e)+(Ge(e).getUTCDay()===4),t,2)}function TS(e){return e.getUTCDay()}function CS(e,t){return re(Wn.count(Ge(e)-1,e),t,2)}function _S(e,t){return re(e.getUTCFullYear()%100,t,2)}function DS(e,t){return e=r0(e),re(e.getUTCFullYear()%100,t,2)}function MS(e,t){return re(e.getUTCFullYear()%1e4,t,4)}function RS(e,t){var n=e.getUTCDay();return e=n>=4||n===0?Xt(e):Xt.ceil(e),re(e.getUTCFullYear()%1e4,t,4)}function ES(){return"+0000"}function Qg(){return"%"}function Zg(e){return+e}function Jg(e){return Math.floor(+e/1e3)}var bo,xo,o0,Qt,i0;pd({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function pd(e){return bo=dd(e),xo=bo.format,o0=bo.parse,Qt=bo.utcFormat,i0=bo.utcParse,bo}function IS(e){return new Date(e)}function qS(e){return e instanceof Date?+e:+new Date(+e)}function oc(e,t,n,r,o,i,a,s,c,u){var l=Wi(),d=l.invert,f=l.domain,p=u(".%L"),m=u(":%S"),h=u("%I:%M"),y=u("%I %p"),b=u("%a %d"),g=u("%b %d"),w=u("%B"),v=u("%Y");function S(x){return(c(x)<x?p:s(x)<x?m:a(x)<x?h:i(x)<x?y:r(x)<x?o(x)<x?b:g:n(x)<x?w:v)(x)}return l.invert=function(x){return new Date(d(x))},l.domain=function(x){return arguments.length?f(Array.from(x,qS)):f().map(IS)},l.ticks=function(x){var k=f();return e(k[0],k[k.length-1],x??10)},l.tickFormat=function(x,k){return k==null?S:u(k)},l.nice=function(x){var k=f();return(!x||typeof x.range!="function")&&(x=t(k[0],k[k.length-1],x??10)),x?f(Vi(k,x)):l},l.copy=function(){return Vt(l,oc(e,t,n,r,o,i,a,s,c,u))},l}function ic(){return De.apply(oc(cd,ld,Ve,kn,st,bt,xn,vn,qe,xo).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}function ac(){return De.apply(oc(ad,sd,Ge,Sn,ct,Cr,wn,bn,qe,Qt).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)}function oa(e,t){return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())}function sc(){var e=0,t=.5,n=1,r=1,o,i,a,s,c,u=tt,l,d=!1,f;function p(h){return isNaN(h=+h)?f:(h=.5+((h=+l(h))-i)*(r*h<r*i?s:c),u(d?Math.max(0,Math.min(1,h)):h))}p.domain=function(h){return arguments.length?([e,t,n]=h,o=l(e=+e),i=l(t=+t),a=l(n=+n),s=o===i?0:.5/(i-o),c=i===a?0:.5/(a-i),r=i<o?-1:1,p):[e,t,n]},p.clamp=function(h){return arguments.length?(d=!!h,p):d},p.interpolator=function(h){return arguments.length?(u=h,p):u};function m(h){return function(y){var b,g,w;return arguments.length?([b,g,w]=y,u=jt(h,[b,g,w]),p):[u(0),u(.5),u(1)]}}return p.range=m(Et),p.rangeRound=m(mr),p.unknown=function(h){return arguments.length?(f=h,p):f},function(h){return l=h,o=h(e),i=h(t),a=h(n),s=o===i?0:.5/(i-o),c=i===a?0:.5/(a-i),r=i<o?-1:1,p}}function ia(){var e=gn(sc()(tt));return e.copy=function(){return oa(e,ia())},Yi.apply(e,arguments)}function cc(){var e=td(sc()).domain([.1,1,10]);return e.copy=function(){return oa(e,cc()).base(e.base())},Yi.apply(e,arguments)}function lc(){var e=nd(sc());return e.copy=function(){return oa(e,lc()).constant(e.constant())},Yi.apply(e,arguments)}function uc(){var e=rd(sc());return e.copy=function(){return oa(e,uc()).exponent(e.exponent())},Yi.apply(e,arguments)}function B(e){for(var t=e.length/6|0,n=new Array(t),r=0;r<t;)n[r]="#"+e.slice(r*6,++r*6);return n}var md=B("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");var hd=B("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");var yd=B("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");var gd=B("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0");var vd=B("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");var bd=B("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");var xd=B("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");var wd=B("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");var kd=B("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");var Sd=B("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");var Td=B("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");var U=e=>zu(e[e.length-1]);var fc=new Array(3).concat("d8b365f5f5f55ab4ac","a6611adfc27d80cdc1018571","a6611adfc27df5f5f580cdc1018571","8c510ad8b365f6e8c3c7eae55ab4ac01665e","8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e","8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e","8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e","5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30","5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(B),dc=U(fc);var pc=new Array(3).concat("af8dc3f7f7f77fbf7b","7b3294c2a5cfa6dba0008837","7b3294c2a5cff7f7f7a6dba0008837","762a83af8dc3e7d4e8d9f0d37fbf7b1b7837","762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837","762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837","762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837","40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b","40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(B),mc=U(pc);var hc=new Array(3).concat("e9a3c9f7f7f7a1d76a","d01c8bf1b6dab8e1864dac26","d01c8bf1b6daf7f7f7b8e1864dac26","c51b7de9a3c9fde0efe6f5d0a1d76a4d9221","c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221","c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221","c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221","8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419","8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(B),yc=U(hc);var gc=new Array(3).concat("998ec3f7f7f7f1a340","5e3c99b2abd2fdb863e66101","5e3c99b2abd2f7f7f7fdb863e66101","542788998ec3d8daebfee0b6f1a340b35806","542788998ec3d8daebf7f7f7fee0b6f1a340b35806","5427888073acb2abd2d8daebfee0b6fdb863e08214b35806","5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806","2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08","2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(B),vc=U(gc);var aa=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(B),wo=U(aa);var bc=new Array(3).concat("ef8a62ffffff999999","ca0020f4a582bababa404040","ca0020f4a582ffffffbababa404040","b2182bef8a62fddbc7e0e0e09999994d4d4d","b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d","b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d","b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d","67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a","67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(B),xc=U(bc);var sa=new Array(3).concat("fc8d59ffffbf91bfdb","d7191cfdae61abd9e92c7bb6","d7191cfdae61ffffbfabd9e92c7bb6","d73027fc8d59fee090e0f3f891bfdb4575b4","d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4","d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4","d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4","a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695","a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(B),ko=U(sa);var wc=new Array(3).concat("fc8d59ffffbf91cf60","d7191cfdae61a6d96a1a9641","d7191cfdae61ffffbfa6d96a1a9641","d73027fc8d59fee08bd9ef8b91cf601a9850","d73027fc8d59fee08bffffbfd9ef8b91cf601a9850","d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850","d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850","a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837","a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(B),kc=U(wc);var Sc=new Array(3).concat("fc8d59ffffbf99d594","d7191cfdae61abdda42b83ba","d7191cfdae61ffffbfabdda42b83ba","d53e4ffc8d59fee08be6f59899d5943288bd","d53e4ffc8d59fee08bffffbfe6f59899d5943288bd","d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd","d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd","9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2","9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(B),Tc=U(Sc);var Cc=new Array(3).concat("e5f5f999d8c92ca25f","edf8fbb2e2e266c2a4238b45","edf8fbb2e2e266c2a42ca25f006d2c","edf8fbccece699d8c966c2a42ca25f006d2c","edf8fbccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824","f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(B),_c=U(Cc);var Dc=new Array(3).concat("e0ecf49ebcda8856a7","edf8fbb3cde38c96c688419d","edf8fbb3cde38c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68856a7810f7c","edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b","f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(B),Mc=U(Dc);var Rc=new Array(3).concat("e0f3dba8ddb543a2ca","f0f9e8bae4bc7bccc42b8cbe","f0f9e8bae4bc7bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc443a2ca0868ac","f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e","f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(B),Ec=U(Rc);var Ic=new Array(3).concat("fee8c8fdbb84e34a33","fef0d9fdcc8afc8d59d7301f","fef0d9fdcc8afc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59e34a33b30000","fef0d9fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000","fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(B),qc=U(Ic);var Pc=new Array(3).concat("ece2f0a6bddb1c9099","f6eff7bdc9e167a9cf02818a","f6eff7bdc9e167a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf1c9099016c59","f6eff7d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450","fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(B),Bc=U(Pc);var Ac=new Array(3).concat("ece7f2a6bddb2b8cbe","f1eef6bdc9e174a9cf0570b0","f1eef6bdc9e174a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d","f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b","fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(B),Lc=U(Ac);var Fc=new Array(3).concat("e7e1efc994c7dd1c77","f1eef6d7b5d8df65b0ce1256","f1eef6d7b5d8df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0dd1c77980043","f1eef6d4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f","f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(B),Oc=U(Fc);var Nc=new Array(3).concat("fde0ddfa9fb5c51b8a","feebe2fbb4b9f768a1ae017e","feebe2fbb4b9f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1c51b8a7a0177","feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177","fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(B),jc=U(Nc);var $c=new Array(3).concat("edf8b17fcdbb2c7fb8","ffffcca1dab441b6c4225ea8","ffffcca1dab441b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c42c7fb8253494","ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84","ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(B),zc=U($c);var Yc=new Array(3).concat("f7fcb9addd8e31a354","ffffccc2e69978c679238443","ffffccc2e69978c67931a354006837","ffffccd9f0a3addd8e78c67931a354006837","ffffccd9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32","ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(B),Hc=U(Yc);var Wc=new Array(3).concat("fff7bcfec44fd95f0e","ffffd4fed98efe9929cc4c02","ffffd4fed98efe9929d95f0e993404","ffffd4fee391fec44ffe9929d95f0e993404","ffffd4fee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04","ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(B),Uc=U(Wc);var Vc=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(B),Gc=U(Vc);var Kc=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(B),Xc=U(Kc);var Qc=new Array(3).concat("e5f5e0a1d99b31a354","edf8e9bae4b374c476238b45","edf8e9bae4b374c47631a354006d2c","edf8e9c7e9c0a1d99b74c47631a354006d2c","edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32","f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(B),Zc=U(Qc);var Jc=new Array(3).concat("f0f0f0bdbdbd636363","f7f7f7cccccc969696525252","f7f7f7cccccc969696636363252525","f7f7f7d9d9d9bdbdbd969696636363252525","f7f7f7d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525","fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(B),el=U(Jc);var tl=new Array(3).concat("efedf5bcbddc756bb1","f2f0f7cbc9e29e9ac86a51a3","f2f0f7cbc9e29e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8756bb154278f","f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486","fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(B),nl=U(tl);var rl=new Array(3).concat("fee0d2fc9272de2d26","fee5d9fcae91fb6a4acb181d","fee5d9fcae91fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4ade2d26a50f15","fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d","fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(B),ol=U(rl);var il=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(B),al=U(il);function sl(e){return e=Math.max(0,Math.min(1,e)),"rgb("+Math.max(0,Math.min(255,Math.round(-4.54-e*(35.34-e*(2381.73-e*(6402.7-e*(7024.72-e*2710.57)))))))+", "+Math.max(0,Math.min(255,Math.round(32.49+e*(170.73+e*(52.82-e*(131.46-e*(176.58-e*67.37)))))))+", "+Math.max(0,Math.min(255,Math.round(81.24+e*(442.36-e*(2482.43-e*(6167.24-e*(6614.94-e*2475.67)))))))+")"}var cl=eo(Qe(300,.5,0),Qe(-240,.5,1));var ul=eo(Qe(-100,.75,.35),Qe(80,1.5,.8)),fl=eo(Qe(260,.75,.35),Qe(80,1.5,.8)),ll=Qe();function dl(e){(e<0||e>1)&&(e-=Math.floor(e));var t=Math.abs(e-.5);return ll.h=360*e-100,ll.s=1.5-1.5*t,ll.l=.8-.9*t,ll+""}var pl=ht(),PS=Math.PI/3,BS=Math.PI*2/3;function ml(e){var t;return e=(.5-e)*Math.PI,pl.r=255*(t=Math.sin(e))*t,pl.g=255*(t=Math.sin(e+PS))*t,pl.b=255*(t=Math.sin(e+BS))*t,pl+""}function hl(e){return e=Math.max(0,Math.min(1,e)),"rgb("+Math.max(0,Math.min(255,Math.round(34.61+e*(1172.33-e*(10793.56-e*(33300.12-e*(38394.49-e*14825.05)))))))+", "+Math.max(0,Math.min(255,Math.round(23.31+e*(557.33+e*(1225.33-e*(3574.96-e*(1073.77+e*707.56)))))))+", "+Math.max(0,Math.min(255,Math.round(27.2+e*(3211.1-e*(15327.97-e*(27814-e*(22569.18-e*6838.66)))))))+")"}function yl(e){var t=e.length;return function(n){return e[Math.max(0,Math.min(t-1,Math.floor(n*t)))]}}var gl=yl(B("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),vl=yl(B("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),bl=yl(B("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),xl=yl(B("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));function Rr(e){return function(){return e}}var Cd=Math.cos;var So=Math.min,ca=Math.sin,oe=Math.sqrt,_d=1e-12,Er=Math.PI,NL=Er/2,To=2*Er;function a0(e){let t=3;return e.digits=function(n){if(!arguments.length)return t;if(n==null)t=null;else{let r=Math.floor(n);if(!(r>=0))throw new RangeError(`invalid digits: ${n}`);t=r}return e},()=>new jn(t)}var YL=Array.prototype.slice;function s0(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function c0(e){this._context=e}c0.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:this._context.lineTo(e,t);break}}};function Ir(e){return new c0(e)}function l0(e){return e[0]}function u0(e){return e[1]}function Dd(e,t){var n=Rr(!0),r=null,o=Ir,i=null,a=a0(s);e=typeof e=="function"?e:e===void 0?l0:Rr(e),t=typeof t=="function"?t:t===void 0?u0:Rr(t);function s(c){var u,l=(c=s0(c)).length,d,f=!1,p;for(r==null&&(i=o(p=a())),u=0;u<=l;++u)!(u<l&&n(d=c[u],u,c))===f&&((f=!f)?i.lineStart():i.lineEnd()),f&&i.point(+e(d,u,c),+t(d,u,c));if(p)return i=null,p+""||null}return s.x=function(c){return arguments.length?(e=typeof c=="function"?c:Rr(+c),s):e},s.y=function(c){return arguments.length?(t=typeof c=="function"?c:Rr(+c),s):t},s.defined=function(c){return arguments.length?(n=typeof c=="function"?c:Rr(!!c),s):n},s.curve=function(c){return arguments.length?(o=c,r!=null&&(i=o(r)),s):o},s.context=function(c){return arguments.length?(c==null?r=i=null:i=o(r=c),s):r},s}var wl=class{constructor(t,n){this._context=t,this._x=n}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,n){switch(t=+t,n=+n,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,n,t,n):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+n)/2,t,this._y0,t,n);break}}this._x0=t,this._y0=n}};function Md(e){return new wl(e,!0)}function Rd(e){return new wl(e,!1)}var AS=oe(3),la={draw(e,t){let n=oe(t+So(t/28,.75))*.59436,r=n/2,o=r*AS;e.moveTo(0,n),e.lineTo(0,-n),e.moveTo(-o,-r),e.lineTo(o,r),e.moveTo(-o,r),e.lineTo(o,-r)}};var Tn={draw(e,t){let n=oe(t/Er);e.moveTo(n,0),e.arc(0,0,n,0,To)}};var ua={draw(e,t){let n=oe(t/5)/2;e.moveTo(-3*n,-n),e.lineTo(-n,-n),e.lineTo(-n,-3*n),e.lineTo(n,-3*n),e.lineTo(n,-n),e.lineTo(3*n,-n),e.lineTo(3*n,n),e.lineTo(n,n),e.lineTo(n,3*n),e.lineTo(-n,3*n),e.lineTo(-n,n),e.lineTo(-3*n,n),e.closePath()}};var f0=oe(1/3),LS=f0*2,fa={draw(e,t){let n=oe(t/LS),r=n*f0;e.moveTo(0,-n),e.lineTo(r,0),e.lineTo(0,n),e.lineTo(-r,0),e.closePath()}};var da={draw(e,t){let n=oe(t)*.62625;e.moveTo(0,-n),e.lineTo(n,0),e.lineTo(0,n),e.lineTo(-n,0),e.closePath()}};var pa={draw(e,t){let n=oe(t-So(t/7,2))*.87559;e.moveTo(-n,0),e.lineTo(n,0),e.moveTo(0,n),e.lineTo(0,-n)}};var ma={draw(e,t){let n=oe(t),r=-n/2;e.rect(r,r,n,n)}};var ha={draw(e,t){let n=oe(t)*.4431;e.moveTo(n,n),e.lineTo(n,-n),e.lineTo(-n,-n),e.lineTo(-n,n),e.closePath()}};var FS=.8908130915292852,d0=ca(Er/10)/ca(7*Er/10),OS=ca(To/10)*d0,NS=-Cd(To/10)*d0,ya={draw(e,t){let n=oe(t*FS),r=OS*n,o=NS*n;e.moveTo(0,-n),e.lineTo(r,o);for(let i=1;i<5;++i){let a=To*i/5,s=Cd(a),c=ca(a);e.lineTo(c*n,-s*n),e.lineTo(s*r-c*o,c*r+s*o)}e.closePath()}};var Ed=oe(3),ga={draw(e,t){let n=-oe(t/(Ed*3));e.moveTo(0,n*2),e.lineTo(-Ed*n,-n),e.lineTo(Ed*n,-n),e.closePath()}};var jS=oe(3),va={draw(e,t){let n=oe(t)*.6824,r=n/2,o=n*jS/2;e.moveTo(0,-n),e.lineTo(o,r),e.lineTo(-o,r),e.closePath()}};var xt=-.5,wt=oe(3)/2,Id=1/oe(12),$S=(Id/2+1)*3,ba={draw(e,t){let n=oe(t/$S),r=n/2,o=n*Id,i=r,a=n*Id+n,s=-i,c=a;e.moveTo(r,o),e.lineTo(i,a),e.lineTo(s,c),e.lineTo(xt*r-wt*o,wt*r+xt*o),e.lineTo(xt*i-wt*a,wt*i+xt*a),e.lineTo(xt*s-wt*c,wt*s+xt*c),e.lineTo(xt*r+wt*o,xt*o-wt*r),e.lineTo(xt*i+wt*a,xt*a-wt*i),e.lineTo(xt*s+wt*c,xt*c-wt*s),e.closePath()}};var Co={draw(e,t){let n=oe(t-So(t/6,1.7))*.6189;e.moveTo(-n,-n),e.lineTo(n,n),e.moveTo(-n,n),e.lineTo(n,-n)}};var kl=[Tn,ua,fa,ma,ya,ga,ba],qd=[Tn,pa,Co,va,la,ha,da];function kt(){}function _o(e,t,n){e._context.bezierCurveTo((2*e._x0+e._x1)/3,(2*e._y0+e._y1)/3,(e._x0+2*e._x1)/3,(e._y0+2*e._y1)/3,(e._x0+4*e._x1+t)/6,(e._y0+4*e._y1+n)/6)}function xa(e){this._context=e}xa.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:_o(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:_o(this,e,t);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}};function Pd(e){return new xa(e)}function p0(e){this._context=e}p0.prototype={areaStart:kt,areaEnd:kt,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x2,this._y2),this._context.closePath();break}case 2:{this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break}case 3:{this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4);break}}},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._x2=e,this._y2=t;break;case 1:this._point=2,this._x3=e,this._y3=t;break;case 2:this._point=3,this._x4=e,this._y4=t,this._context.moveTo((this._x0+4*this._x1+e)/6,(this._y0+4*this._y1+t)/6);break;default:_o(this,e,t);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}};function Bd(e){return new p0(e)}function m0(e){this._context=e}m0.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var n=(this._x0+4*this._x1+e)/6,r=(this._y0+4*this._y1+t)/6;this._line?this._context.lineTo(n,r):this._context.moveTo(n,r);break;case 3:this._point=4;default:_o(this,e,t);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}};function Ad(e){return new m0(e)}function h0(e,t){this._basis=new xa(e),this._beta=t}h0.prototype={lineStart:function(){this._x=[],this._y=[],this._basis.lineStart()},lineEnd:function(){var e=this._x,t=this._y,n=e.length-1;if(n>0)for(var r=e[0],o=t[0],i=e[n]-r,a=t[n]-o,s=-1,c;++s<=n;)c=s/n,this._basis.point(this._beta*e[s]+(1-this._beta)*(r+c*i),this._beta*t[s]+(1-this._beta)*(o+c*a));this._x=this._y=null,this._basis.lineEnd()},point:function(e,t){this._x.push(+e),this._y.push(+t)}};var Ld=(function e(t){function n(r){return t===1?new xa(r):new h0(r,t)}return n.beta=function(r){return e(+r)},n})(.85);function Do(e,t,n){e._context.bezierCurveTo(e._x1+e._k*(e._x2-e._x0),e._y1+e._k*(e._y2-e._y0),e._x2+e._k*(e._x1-t),e._y2+e._k*(e._y1-n),e._x2,e._y2)}function Sl(e,t){this._context=e,this._k=(1-t)/6}Sl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:Do(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2,this._x1=e,this._y1=t;break;case 2:this._point=3;default:Do(this,e,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};var Fd=(function e(t){function n(r){return new Sl(r,t)}return n.tension=function(r){return e(+r)},n})(0);function Tl(e,t){this._context=e,this._k=(1-t)/6}Tl.prototype={areaStart:kt,areaEnd:kt,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x3,this._y3),this._context.closePath();break}case 2:{this._context.lineTo(this._x3,this._y3),this._context.closePath();break}case 3:{this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5);break}}},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._x3=e,this._y3=t;break;case 1:this._point=2,this._context.moveTo(this._x4=e,this._y4=t);break;case 2:this._point=3,this._x5=e,this._y5=t;break;default:Do(this,e,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};var Od=(function e(t){function n(r){return new Tl(r,t)}return n.tension=function(r){return e(+r)},n})(0);function Cl(e,t){this._context=e,this._k=(1-t)/6}Cl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:Do(this,e,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};var Nd=(function e(t){function n(r){return new Cl(r,t)}return n.tension=function(r){return e(+r)},n})(0);function wa(e,t,n){var r=e._x1,o=e._y1,i=e._x2,a=e._y2;if(e._l01_a>_d){var s=2*e._l01_2a+3*e._l01_a*e._l12_a+e._l12_2a,c=3*e._l01_a*(e._l01_a+e._l12_a);r=(r*s-e._x0*e._l12_2a+e._x2*e._l01_2a)/c,o=(o*s-e._y0*e._l12_2a+e._y2*e._l01_2a)/c}if(e._l23_a>_d){var u=2*e._l23_2a+3*e._l23_a*e._l12_a+e._l12_2a,l=3*e._l23_a*(e._l23_a+e._l12_a);i=(i*u+e._x1*e._l23_2a-t*e._l12_2a)/l,a=(a*u+e._y1*e._l23_2a-n*e._l12_2a)/l}e._context.bezierCurveTo(r,o,i,a,e._x2,e._y2)}function y0(e,t){this._context=e,this._alpha=t}y0.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){if(e=+e,t=+t,this._point){var n=this._x2-e,r=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3;default:wa(this,e,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};var jd=(function e(t){function n(r){return t?new y0(r,t):new Sl(r,0)}return n.alpha=function(r){return e(+r)},n})(.5);function g0(e,t){this._context=e,this._alpha=t}g0.prototype={areaStart:kt,areaEnd:kt,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._x5=this._y0=this._y1=this._y2=this._y3=this._y4=this._y5=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x3,this._y3),this._context.closePath();break}case 2:{this._context.lineTo(this._x3,this._y3),this._context.closePath();break}case 3:{this.point(this._x3,this._y3),this.point(this._x4,this._y4),this.point(this._x5,this._y5);break}}},point:function(e,t){if(e=+e,t=+t,this._point){var n=this._x2-e,r=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._x3=e,this._y3=t;break;case 1:this._point=2,this._context.moveTo(this._x4=e,this._y4=t);break;case 2:this._point=3,this._x5=e,this._y5=t;break;default:wa(this,e,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};var $d=(function e(t){function n(r){return t?new g0(r,t):new Tl(r,0)}return n.alpha=function(r){return e(+r)},n})(.5);function v0(e,t){this._context=e,this._alpha=t}v0.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){if(e=+e,t=+t,this._point){var n=this._x2-e,r=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3,this._line?this._context.lineTo(this._x2,this._y2):this._context.moveTo(this._x2,this._y2);break;case 3:this._point=4;default:wa(this,e,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};var zd=(function e(t){function n(r){return t?new v0(r,t):new Cl(r,0)}return n.alpha=function(r){return e(+r)},n})(.5);function b0(e){this._context=e}b0.prototype={areaStart:kt,areaEnd:kt,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(e,t){e=+e,t=+t,this._point?this._context.lineTo(e,t):(this._point=1,this._context.moveTo(e,t))}};function Yd(e){return new b0(e)}function x0(e){return e<0?-1:1}function w0(e,t,n){var r=e._x1-e._x0,o=t-e._x1,i=(e._y1-e._y0)/(r||o<0&&-0),a=(n-e._y1)/(o||r<0&&-0),s=(i*o+a*r)/(r+o);return(x0(i)+x0(a))*Math.min(Math.abs(i),Math.abs(a),.5*Math.abs(s))||0}function k0(e,t){var n=e._x1-e._x0;return n?(3*(e._y1-e._y0)/n-t)/2:t}function Hd(e,t,n){var r=e._x0,o=e._y0,i=e._x1,a=e._y1,s=(i-r)/3;e._context.bezierCurveTo(r+s,o+s*t,i-s,a-s*n,i,a)}function _l(e){this._context=e}_l.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Hd(this,this._t0,k0(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){var n=NaN;if(e=+e,t=+t,!(e===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,Hd(this,k0(this,n=w0(this,e,t)),n);break;default:Hd(this,this._t0,n=w0(this,e,t));break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t,this._t0=n}}};function S0(e){this._context=new T0(e)}(S0.prototype=Object.create(_l.prototype)).point=function(e,t){_l.prototype.point.call(this,t,e)};function T0(e){this._context=e}T0.prototype={moveTo:function(e,t){this._context.moveTo(t,e)},closePath:function(){this._context.closePath()},lineTo:function(e,t){this._context.lineTo(t,e)},bezierCurveTo:function(e,t,n,r,o,i){this._context.bezierCurveTo(t,e,r,n,i,o)}};function Wd(e){return new _l(e)}function Ud(e){return new S0(e)}function _0(e){this._context=e}_0.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var e=this._x,t=this._y,n=e.length;if(n)if(this._line?this._context.lineTo(e[0],t[0]):this._context.moveTo(e[0],t[0]),n===2)this._context.lineTo(e[1],t[1]);else for(var r=C0(e),o=C0(t),i=0,a=1;a<n;++i,++a)this._context.bezierCurveTo(r[0][i],o[0][i],r[1][i],o[1][i],e[a],t[a]);(this._line||this._line!==0&&n===1)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(e,t){this._x.push(+e),this._y.push(+t)}};function C0(e){var t,n=e.length-1,r,o=new Array(n),i=new Array(n),a=new Array(n);for(o[0]=0,i[0]=2,a[0]=e[0]+2*e[1],t=1;t<n-1;++t)o[t]=1,i[t]=4,a[t]=4*e[t]+2*e[t+1];for(o[n-1]=2,i[n-1]=7,a[n-1]=8*e[n-1]+e[n],t=1;t<n;++t)r=o[t]/i[t-1],i[t]-=r,a[t]-=r*a[t-1];for(o[n-1]=a[n-1]/i[n-1],t=n-2;t>=0;--t)o[t]=(a[t]-o[t+1])/i[t];for(i[n-1]=(e[n]+o[n-1])/2,t=0;t<n-1;++t)i[t]=2*e[t+1]-o[t+1];return[o,i]}function Vd(e){return new _0(e)}function Dl(e,t){this._context=e,this._t=t}Dl.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&this._point===2&&this._context.lineTo(this._x,this._y),(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:{if(this._t<=0)this._context.lineTo(this._x,t),this._context.lineTo(e,t);else{var n=this._x*(1-this._t)+e*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,t)}break}}this._x=e,this._y=t}};function Gd(e){return new Dl(e,.5)}function Kd(e){return new Dl(e,0)}function Xd(e){return new Dl(e,1)}function Un(e,t,n){this.k=e,this.x=t,this.y=n}Un.prototype={constructor:Un,scale:function(e){return e===1?this:new Un(this.k*e,this.x,this.y)},translate:function(e,t){return e===0&t===0?this:new Un(this.k,this.x+this.k*e,this.y+this.k*t)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Qd=new Un(1,0,0);Zd.prototype=Un.prototype;function Zd(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Qd;return e.__zoom}function St(e){return e!=null&&!Number.isNaN(e)}function Cn(e,t){return+St(t)-+St(e)||Xe(e,t)}function ka(e,t){return+St(t)-+St(e)||dt(e,t)}function Sa(e){return e!=null&&`${e}`!=""}function Jd(e){return isFinite(e)?e:NaN}function qr(e){return e>0&&isFinite(e)?e:NaN}function Mo(e){return e<0&&isFinite(e)?e:NaN}function Ml(e,t){if(e instanceof Date||(e=new Date(+e)),isNaN(e))return typeof t=="function"?t(e):t;let n=e.getUTCHours(),r=e.getUTCMinutes(),o=e.getUTCSeconds(),i=e.getUTCMilliseconds();return`${zS(e.getUTCFullYear(),4)}-${_n(e.getUTCMonth()+1,2)}-${_n(e.getUTCDate(),2)}${n||r||o||i?`T${_n(n,2)}:${_n(r,2)}${o||i?`:${_n(o,2)}${i?`.${_n(i,3)}`:""}`:""}Z`:""}`}function zS(e){return e<0?`-${_n(-e,6)}`:e>9999?`+${_n(e,6)}`:_n(e,4)}function _n(e,t){return`${e}`.padStart(t,"0")}var YS=/^(?:[-+]\d{2})?\d{4}(?:-\d{2}(?:-\d{2})?)?(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{3})?)?(?:Z|[-+]\d{2}:?\d{2})?)?$/;function Ta(e,t){return YS.test(e+="")?new Date(e):typeof t=="function"?t(e):t}function Dn(e){if(e==null)return;let t=e[0],n=e[e.length-1];return dt(t,n)}var Eo=1e3,Gn=Eo*60,Kn=Gn*60,Jt=Kn*24,Zt=Jt*7,Pr=Jt*30,Vn=Jt*365,ep=[["millisecond",1],["2 milliseconds",2],["5 milliseconds",5],["10 milliseconds",10],["20 milliseconds",20],["50 milliseconds",50],["100 milliseconds",100],["200 milliseconds",200],["500 milliseconds",500],["second",Eo],["5 seconds",5*Eo],["15 seconds",15*Eo],["30 seconds",30*Eo],["minute",Gn],["5 minutes",5*Gn],["15 minutes",15*Gn],["30 minutes",30*Gn],["hour",Kn],["3 hours",3*Kn],["6 hours",6*Kn],["12 hours",12*Kn],["day",Jt],["2 days",2*Jt],["week",Zt],["2 weeks",2*Zt],["month",Pr],["3 months",3*Pr],["6 months",6*Pr],["year",Vn],["2 years",2*Vn],["5 years",5*Vn],["10 years",10*Vn],["20 years",20*Vn],["50 years",50*Vn],["100 years",100*Vn]],tp=new Map([["second",Eo],["minute",Gn],["hour",Kn],["day",Jt],["monday",Zt],["tuesday",Zt],["wednesday",Zt],["thursday",Zt],["friday",Zt],["saturday",Zt],["sunday",Zt],["week",Zt],["month",Pr],["year",Vn]]),M0=new Map([["second",qe],["minute",vn],["hour",xn],["day",bt],["monday",Hn],["tuesday",Xs],["wednesday",Qs],["thursday",Kt],["friday",Zs],["saturday",Js],["sunday",st],["week",st],["month",kn],["year",Ve]]),np=new Map([["second",qe],["minute",bn],["hour",wn],["day",_r],["monday",Wn],["tuesday",ec],["wednesday",tc],["thursday",Xt],["friday",nc],["saturday",rc],["sunday",ct],["week",ct],["month",Sn],["year",Ge]]),Io=Symbol("intervalDuration"),El=Symbol("intervalType");for(let[e,t]of M0)t[Io]=tp.get(e),t[El]="time";for(let[e,t]of np)t[Io]=tp.get(e),t[El]="utc";var Ca=[["year",Ge,"utc"],["month",Sn,"utc"],["day",_r,"utc",6*Pr],["hour",wn,"utc",3*Jt],["minute",bn,"utc",6*Kn],["second",qe,"utc",30*Gn]],Rl=[["year",Ve,"time"],["month",kn,"time"],["day",bt,"time",6*Pr],["hour",xn,"time",3*Jt],["minute",vn,"time",6*Kn],["second",qe,"time",30*Gn]],HS=[Ca[0],Rl[0],Ca[1],Rl[1],Ca[2],Rl[2],...Ca.slice(3)];function R0(e){let t=`${e}`.toLowerCase();t.endsWith("s")&&(t=t.slice(0,-1));let n=1,r=/^(?:(\d+)\s+)/.exec(t);switch(r&&(t=t.slice(r[0].length),n=+r[1]),t){case"quarter":t="month",n*=3;break;case"half":t="month",n*=6;break}let o=np.get(t);if(!o)throw new Error(`unknown interval: ${e}`);if(n>1&&!o.every)throw new Error(`non-periodic interval: ${t}`);return[t,n]}function rp(e){return E0(R0(e),"time")}function op(e){return E0(R0(e),"utc")}function E0([e,t],n){let r=(n==="time"?M0:np).get(e);return t>1&&(r=r.every(t),r[Io]=tp.get(e)*t,r[El]=n),r}function ip(e,t){if(!(t>1))return;let n=e[Io];if(!ep.some(([,o])=>o===n)||n%Jt===0&&Jt<n&&n<Pr)return;let[r]=ep[cn(([,o])=>Math.log(o)).center(ep,Math.log(n*t))];return(e[El]==="time"?rp:op)(r)}function D0(e,t,n){let r=t==="time"?xo:Qt;if(n==null)return r(e==="year"?"%Y":e==="month"?"%Y-%m":e==="day"?"%Y-%m-%d":e==="hour"||e==="minute"?"%Y-%m-%dT%H:%M":e==="second"?"%Y-%m-%dT%H:%M:%S":"%Y-%m-%dT%H:%M:%S.%L");let o=WS(n);switch(e){case"millisecond":return Ro(r(".%L"),r(":%M:%S"),o);case"second":return Ro(r(":%S"),r("%-I:%M"),o);case"minute":return Ro(r("%-I:%M"),r("%p"),o);case"hour":return Ro(r("%-I %p"),r("%b %-d"),o);case"day":return Ro(r("%-d"),r("%b"),o);case"month":return Ro(r("%b"),r("%Y"),o);case"year":return r("%Y")}throw new Error("unable to format time ticks")}function WS(e){return e==="left"||e==="right"?(t,n)=>`
${t}
${n}`:e==="top"?(t,n)=>`${n}
${t}`:(t,n)=>`${t}
${n}`}function US(e){return e==="time"?Rl:e==="utc"?Ca:HS}function I0(e,t,n){let r=He(Ga(t,(o,i)=>Math.abs(i-o)));if(r<1e3)return D0("millisecond","utc",n);for(let[o,i,a,s]of US(e)){if(r>s||o==="hour"&&!r)break;if(t.every(c=>i.floor(c)>=c))return D0(o,a,n)}}function Ro(e,t,n){return(r,o,i)=>{let a=e(r,o),s=t(r,o),c=o-Dn(i);return o!==c&&i[c]!==void 0&&s===t(i[c],c)?a:n(a,s)}}var sp=Object.getPrototypeOf(Uint8Array),VS=Object.prototype.toString;function Xn(e){return e instanceof Array||e instanceof sp}function B0(e){return e instanceof sp&&!GS(e)}function A0(e){return e?.prototype instanceof sp&&!KS(e)}function GS(e){return e instanceof BigInt64Array||e instanceof BigUint64Array}function KS(e){return e===BigInt64Array||e===BigUint64Array}var XS=Symbol("reindex");function lt(e,t,n){let r=typeof t;return r==="string"?Z0(e)?cp(e.getChild(t),n):q0(e,ZS(t),n):r==="function"?q0(e,t,n):r==="number"||t instanceof Date||r==="boolean"?ve(e,ut(t),n):typeof t?.transform=="function"?ap(t.transform(e),n):QS(ap(t,n),e?.[XS])}function QS(e,t){return e!=null&&t?Pl(e,t):e}function q0(e,t,n){return ve(e,A0(n)?(r,o)=>up(t(r,o)):t,n)}function ap(e,t){return t===void 0?tn(e):J0(e)?cp(e,t):e instanceof t?e:t.from(e,A0(t)&&!B0(e)?up:void 0)}function cp(e,t){return e==null?e:(t===void 0||t===Array)&&rT(e.type)?fp(P0(e)):ap(P0(e),t)}function P0(e){return e.nullCount?e.toJSON():e.toArray()}var qo=[null],ZS=e=>t=>{let n=t[e];return n===void 0&&t.type==="Feature"?t.properties?.[e]:n},Il={transform:rn},Be={transform:e=>e};var L0=()=>!0,Te=e=>e==null?e:`${e}`,Ce=e=>e==null?e:+e;var lp=e=>e?e[0]:void 0,F0=e=>e?e[1]:void 0;var ut=e=>()=>e;function O0(e){let t=+`${e}`.slice(1)/100;return(n,r)=>un(n,t,r)}function Br(e){return B0(e)?e:ve(e,up,Float64Array)}function up(e){return e==null?NaN:Number(e)}function fp(e){return ve(e,JS)}function JS(e){return e instanceof Date&&!isNaN(e)?e:typeof e=="string"?Ta(e):e==null||isNaN(e=Number(e))?void 0:new Date(e)}function en(e,t){return e===void 0&&(e=t),e===null?[void 0,"none"]:Ao(e)?[void 0,e]:[e,void 0]}function we(e,t){return e===void 0&&(e=t),e===null||typeof e=="number"?[void 0,e]:[e,void 0]}function dp(e,t,n){if(e!=null)return Je(e,t,n)}function Je(e,t,n){let r=`${e}`.toLowerCase();if(!n.includes(r))throw new Error(`invalid ${t}: ${e}`);return r}function Mn(e){return Z0(e)?e:tn(e)}function tn(e){if(e==null||Xn(e))return e;if(J0(e))return cp(e);if(N0(e))switch(e.type){case"FeatureCollection":return e.features;case"GeometryCollection":return e.geometries;default:return[e]}return Array.from(e)}function N0(e){switch(e?.type){case"FeatureCollection":case"GeometryCollection":case"Feature":case"LineString":case"MultiLineString":case"MultiPoint":case"MultiPolygon":case"Point":case"Polygon":case"Sphere":return!0;default:return!1}}function ve(e,t,n=Array){return e==null?e:e instanceof n?e.map(t):n.from(e,t)}function _a(e,t=Array){return e instanceof t?e.slice():t.from(e)}function nn(e){return e?.toString===VS}function Po(e){return nn(e)&&(e.type!==void 0||e.domain!==void 0)}function Bo(e){return nn(e)&&typeof e.transform!="function"}function Qn(e){return Bo(e)&&e.value===void 0&&e.channel===void 0}function Rn(e,t){return e===void 0&&t===void 0?[lp,F0]:[e,t]}function j0({z:e,fill:t,stroke:n}={}){return e===void 0&&([e]=en(t)),e===void 0&&([e]=en(n)),e}function ql(e){return Xn(e)?e.length:e?.numRows}function rn(e){let t=ql(e),n=new Uint32Array(t);for(let r=0;r<t;++r)n[r]=r;return n}function Pl(e,t){return Xn(e)?ve(t,n=>e[n],e.constructor):ve(t,n=>e.at(n))}function $0(e,t,n){return e.subarray?e.subarray(t,n):e.slice(t,n)}function Tt(e){return e!==null&&typeof e=="object"?e.valueOf():e}function Ar(e,t){return typeof e=="string"?e:e&&e.label!==void 0?e.label:t}function z0(e,t){let n=Bl(e,t);return n&&(r=>St(r)?n.floor(r):r)}function Bl(e,t){if(e!=null){if(typeof e=="number")return eT(e);if(typeof e=="string")return(t==="time"?rp:op)(e);if(typeof e.floor!="function")throw new Error("invalid interval; missing floor method");if(typeof e.offset!="function")throw new Error("invalid interval; missing offset method");return e}}function eT(e){e=+e,0<e&&e<1&&Number.isInteger(1/e)&&(e=-1/e);let t=Math.abs(e);return e<0?{floor:n=>Math.floor(n*t)/t,offset:(n,r=1)=>(n*t+Math.floor(r))/t,range:(n,r)=>sr(Math.ceil(n*t),r*t).map(o=>o/t)}:{floor:n=>Math.floor(n/t)*t,offset:(n,r=1)=>n+t*Math.floor(r),range:(n,r)=>sr(Math.ceil(n/t),r/t).map(o=>o*t)}}function Zn(e,t){if(e=Bl(e,t),e&&typeof e.range!="function")throw new Error("invalid interval: missing range method");return e}function Y0(e,t){if(e=Zn(e,t),e&&typeof e.ceil!="function")throw new Error("invalid interval: missing ceil method");return e}function H0(e){return typeof e?.range=="function"}function Jn(e){return e===void 0||Bo(e)?e:{value:e}}function W0(e){return e==null?null:{transform:t=>lt(t,e,Float64Array),label:Ar(e)}}function Ct(e){return e&&typeof e[Symbol.iterator]=="function"}function Al(e){for(let t of e)if(t!=null)return typeof t!="object"||t instanceof Date}function pp(e){for(let t of e){if(t==null)continue;let n=typeof t;return n==="string"||n==="boolean"}}function Ke(e){for(let t of e)if(t!=null)return t instanceof Date}function U0(e){for(let t of e)if(t!=null)return typeof t=="string"&&isNaN(t)&&Ta(t)}function V0(e){for(let t of e)if(t!=null){if(typeof t!="string")return!1;if(t.trim())return!isNaN(t)}}function G0(e){for(let t of e)if(t!=null)return typeof t=="number"}function Ll(e,t){let n;for(let r of e)if(r!=null){if(!t(r))return!1;n=!0}return n}var tT=new Set("none,currentcolor,transparent,aliceblue,antiquewhite,aqua,aquamarine,azure,beige,bisque,black,blanchedalmond,blue,blueviolet,brown,burlywood,cadetblue,chartreuse,chocolate,coral,cornflowerblue,cornsilk,crimson,cyan,darkblue,darkcyan,darkgoldenrod,darkgray,darkgreen,darkgrey,darkkhaki,darkmagenta,darkolivegreen,darkorange,darkorchid,darkred,darksalmon,darkseagreen,darkslateblue,darkslategray,darkslategrey,darkturquoise,darkviolet,deeppink,deepskyblue,dimgray,dimgrey,dodgerblue,firebrick,floralwhite,forestgreen,fuchsia,gainsboro,ghostwhite,gold,goldenrod,gray,green,greenyellow,grey,honeydew,hotpink,indianred,indigo,ivory,khaki,lavender,lavenderblush,lawngreen,lemonchiffon,lightblue,lightcoral,lightcyan,lightgoldenrodyellow,lightgray,lightgreen,lightgrey,lightpink,lightsalmon,lightseagreen,lightskyblue,lightslategray,lightslategrey,lightsteelblue,lightyellow,lime,limegreen,linen,magenta,maroon,mediumaquamarine,mediumblue,mediumorchid,mediumpurple,mediumseagreen,mediumslateblue,mediumspringgreen,mediumturquoise,mediumvioletred,midnightblue,mintcream,mistyrose,moccasin,navajowhite,navy,oldlace,olive,olivedrab,orange,orangered,orchid,palegoldenrod,palegreen,paleturquoise,palevioletred,papayawhip,peachpuff,peru,pink,plum,powderblue,purple,rebeccapurple,red,rosybrown,royalblue,saddlebrown,salmon,sandybrown,seagreen,seashell,sienna,silver,skyblue,slateblue,slategray,slategrey,snow,springgreen,steelblue,tan,teal,thistle,tomato,turquoise,violet,wheat,white,whitesmoke,yellow".split(","));function Ao(e){return typeof e!="string"?!1:(e=e.toLowerCase().trim(),/^#[0-9a-f]{3,8}$/.test(e)||/^(?:url|var|rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix)\(.*\)$/.test(e)||tT.has(e))}function K0(e){return typeof e=="number"&&(0<=e&&e<=1||isNaN(e))}function Ae(e){return e==null||Lr(e)}function Lr(e){return/^\s*none\s*$/i.test(e)}function X0(e){return/^\s*round\s*$/i.test(e)}function Fl(e,t){return dp(e,t,["middle","top-left","top","top-right","right","bottom-right","bottom","bottom-left","left"])}function er(e="middle"){return Fl(e,"frameAnchor")}function Q0(e={},...t){let n=e;for(let r of t)for(let o in r)if(n[o]===void 0){let i=r[o];n===e?n={...n,[o]:i}:n[o]=i}return n}function nT(e){console.warn("named iterables are deprecated; please use an object instead");let t=new Set;return Object.fromEntries(Array.from(e,n=>{let{name:r}=n;if(r==null)throw new Error("missing name");let o=`${r}`;if(o==="__proto__")throw new Error(`illegal name: ${o}`);if(t.has(o))throw new Error(`duplicate name: ${o}`);return t.add(o),[r,n]}))}function mp(e){return Ct(e)?nT(e):e}function Ol(e){return e===!0?e="frame":e===!1?e=null:!N0(e)&&e!=null&&(e=Je(e,"clip",["frame","sphere"]),e==="sphere"&&(e={type:"Sphere"})),e}function Z0(e){return e&&typeof e.getChild=="function"&&typeof e.toArray=="function"&&e.schema&&Array.isArray(e.schema.fields)}function J0(e){return e&&typeof e.toArray=="function"&&e.type}function rT(e){return e&&(e.typeId===8||e.typeId===10)&&e.unit===1}var _t=Symbol("position"),ft=Symbol("color"),Fr=Symbol("radius"),Or=Symbol("length"),Nr=Symbol("opacity"),Lo=Symbol("symbol"),ev=Symbol("projection"),le=new Map([["x",_t],["y",_t],["fx",_t],["fy",_t],["r",Fr],["color",ft],["opacity",Nr],["symbol",Lo],["length",Or],["projection",ev]]);function tv(e){return e===_t||e===ev}function nv(e){return e===_t||e===Fr||e===Or||e===Nr}var oT=Math.sqrt(3),iT=2/oT,aT={draw(e,t){let n=Math.sqrt(t/Math.PI),r=n*iT,o=r/2;e.moveTo(0,r),e.lineTo(n,o),e.lineTo(n,-o),e.lineTo(0,-r),e.lineTo(-n,-o),e.lineTo(-n,o),e.closePath()}},hp=new Map([["asterisk",la],["circle",Tn],["cross",ua],["diamond",fa],["diamond2",da],["hexagon",aT],["plus",pa],["square",ma],["square2",ha],["star",ya],["times",Co],["triangle",ga],["triangle2",va],["wye",ba]]);function yp(e){return e&&typeof e.draw=="function"}function rv(e){return yp(e)?!0:typeof e!="string"?!1:hp.has(e.toLowerCase())}function Fo(e){if(e==null||yp(e))return e;let t=hp.get(`${e}`.toLowerCase());if(t)return t;throw new Error(`invalid symbol: ${e}`)}function ov(e){if(e==null||yp(e))return[void 0,e];if(typeof e=="string"){let t=hp.get(`${e}`.toLowerCase());if(t)return[void 0,t]}return[e,void 0]}function bp({filter:e,sort:t,reverse:n,transform:r,initializer:o,...i}={},a){if(r===void 0&&(e!=null&&(r=iv(e)),t!=null&&!Qn(t)&&(r=gp(r,xp(t))),n&&(r=gp(r,av))),a!=null&&o!=null)throw new Error("transforms cannot be applied after initializers");return{...i,...(t===null||Qn(t))&&{sort:t},transform:gp(r,a)}}function En({filter:e,sort:t,reverse:n,initializer:r,...o}={},i){return r===void 0&&(e!=null&&(r=iv(e)),t!=null&&!Qn(t)&&(r=vp(r,xp(t))),n&&(r=vp(r,av))),{...o,...(t===null||Qn(t))&&{sort:t},initializer:vp(r,i)}}function gp(e,t){return e==null?t===null?void 0:t:t==null?e===null?void 0:e:function(n,r,o){return{data:n,facets:r}=e.call(this,n,r,o),t.call(this,Mn(n),r,o)}}function vp(e,t){return e==null?t===null?void 0:t:t==null?e===null?void 0:e:function(n,r,o,...i){let a,s,c,u,l,d;return{data:s=n,facets:c=r,channels:a}=e.call(this,n,r,o,...i),{data:l=s,facets:d=c,channels:u}=t.call(this,s,c,{...o,...a},...i),{data:l,facets:d,channels:{...a,...u}}}}function sT(e,t){return(e.initializer!=null?En:bp)(e,t)}function iv(e){return(t,n)=>{let r=lt(t,e);return{data:t,facets:n.map(o=>o.filter(i=>r[i]))}}}function av(e,t){return{data:e,facets:t.map(n=>n.slice().reverse())}}function sv(e,{sort:t,...n}={}){return{...(Bo(e)&&e.channel!==void 0?En:sT)(n,xp(e)),sort:Qn(t)?t:null}}function xp(e){return(typeof e=="function"&&e.length!==1?cT:lT)(e)}function cT(e){return(t,n)=>{let r=Xn(t)?(o,i)=>e(t[o],t[i]):(o,i)=>e(t.get(o),t.get(i));return{data:t,facets:n.map(o=>o.slice().sort(r))}}}function lT(e){let t,n;({channel:t,value:e,order:n}={...Jn(e)});let r=t?.startsWith("-");if(r&&(t=t.slice(1)),n===void 0&&(n=r?ka:Cn),typeof n!="function")switch(`${n}`.toLowerCase()){case"ascending":n=Cn;break;case"descending":n=ka;break;default:throw new Error(`invalid order: ${n}`)}return(o,i,a)=>{let s;if(t===void 0)s=lt(o,e);else{if(a===void 0)throw new Error("channel sort requires an initializer");if(s=a[t],!s)return{};s=s.value}let c=(u,l)=>n(s[u],s[l]);return{data:o,facets:i.map(u=>u.slice().sort(c))}}}function fv(e,t,n=uT){if(e==null)return n(e);if(typeof e.reduceIndex=="function")return e;if(typeof e.reduce=="function"&&nn(e))return fT(e);if(typeof e=="function")return dT(e);if(/^p\d{2}$/i.test(e))return In(O0(e));switch(`${e}`.toLowerCase()){case"first":return mT;case"last":return hT;case"identity":return pT;case"count":return lv;case"distinct":return yT;case"sum":return t==null?lv:gT;case"proportion":return uv(t,"data");case"proportion-facet":return uv(t,"facet");case"deviation":return In($a);case"min":return In(At);case"min-index":return In(Ha);case"max":return In(He);case"max-index":return In(Ya);case"mean":return cv(Ua);case"median":return cv(ar);case"variance":return In(Wr);case"mode":return In(Va)}return n(e)}function uT(e){throw new Error(`invalid reduce: ${e}`)}function fT(e){return console.warn("deprecated reduce interface; implement reduceIndex instead."),{...e,reduceIndex:e.reduce.bind(e)}}function dT(e){return{reduceIndex(t,n,r){return e(Pl(n,t),r)}}}function In(e){return{reduceIndex(t,n){return e(t,r=>n[r])}}}function cv(e){return{reduceIndex(t,n){let r=e(t,o=>n[o]);return Ke(n)?new Date(r):r}}}var pT={reduceIndex(e,t){return Pl(t,e)}},mT={reduceIndex(e,t){return t[e[0]]}};var hT={reduceIndex(e,t){return t[e[e.length-1]]}},lv={label:"Frequency",reduceIndex(e){return e.length}},yT={label:"Distinct",reduceIndex(e,t){let n=new Dt;for(let r of e)n.add(t[r]);return n.size}},gT=In(cr);function uv(e,t){return e==null?{scope:t,label:"Frequency",reduceIndex:(n,r,o=1)=>n.length/o}:{scope:t,reduceIndex:(n,r,o=1)=>cr(n,i=>r[i])/o}}function Oo(e,{scale:t,type:n,value:r,filter:o,hint:i,label:a=Ar(r)},s){return i===void 0&&typeof r?.transform=="function"&&(i=r.hint),kp(s,{scale:t,type:n,value:lt(e,r),label:a,filter:o,hint:i})}function pv(e,t){return Object.fromEntries(Object.entries(e).map(([n,r])=>[n,Oo(t,r,n)]))}function mv(e,t){let n=Object.fromEntries(Object.entries(e).map(([r,{scale:o,value:i}])=>{let a=o==null?null:t[o];return[r,a==null?i:ve(i,a)]}));return n.channels=e,n}function kp(e,t){let{scale:n,value:r}=t;if(n===!0||n==="auto")switch(e){case"fill":case"stroke":case"color":t.scale=n!==!0&&Ll(r,Ao)?null:"color",t.defaultScale="color";break;case"fillOpacity":case"strokeOpacity":case"opacity":t.scale=n!==!0&&Ll(r,K0)?null:"opacity",t.defaultScale="opacity";break;case"symbol":n!==!0&&Ll(r,rv)?(t.scale=null,t.value=ve(r,Fo)):t.scale="symbol",t.defaultScale="symbol";break;default:t.scale=le.has(e)?e:null;break}else if(n===!1)t.scale=null;else if(n!=null&&!le.has(n))throw new Error(`unknown scale: ${n}`);return t}function hv(e,t,n,r,o){let{order:i,reverse:a,reduce:s=!0,limit:c}=o;for(let u in o){if(!le.has(u))continue;let{value:l,order:d=i,reverse:f=a,reduce:p=s,limit:m=c}=Jn(o[u]),h=l?.startsWith("-");if(h&&(l=l.slice(1)),d=d===void 0?h!==(l==="width"||l==="height")?gv:yv:xT(d),p==null||p===!1)continue;let y=u==="fx"||u==="fy"?bT(t,r[u]):vT(n,u);if(!y)throw new Error(`missing channel for scale: ${u}`);let b=y.value,[g=0,w=1/0]=Ct(m)?m:m<0?[m]:[0,m];if(l==null)y.domain=()=>{let v=Array.from(new Dt(b));return f&&(v=v.reverse()),(g!==0||w!==1/0)&&(v=v.slice(g,w)),v};else{let v=l==="data"?e:l==="height"?dv(n,"y1","y2"):l==="width"?dv(n,"x1","x2"):wp(n,l,l==="y"?"y2":l==="x"?"x2":void 0),S=fv(p===!0?"max":p,v);y.domain=()=>{let x=xu(rn(b),k=>S.reduceIndex(k,v),k=>b[k]);return d&&x.sort(d),f&&x.reverse(),(g!==0||w!==1/0)&&(x=x.slice(g,w)),x.map(lp)}}}}function vT(e,t){for(let n in e){let r=e[n];if(r.scale===t)return r}}function bT(e,t){let n=e.original;if(n===e)return t;let r=t.value,o=t.value=[];for(let i=0;i<n.length;++i){let a=r[n[i][0]];for(let s of e[i])o[s]=a}return t}function dv(e,t,n){let r=wp(e,t),o=wp(e,n);return ve(o,(i,a)=>Math.abs(i-r[a]),Float64Array)}function wp(e,t,n){let r=e[t];if(!r&&n!==void 0&&(r=e[n]),r)return r.value;throw new Error(`missing channel: ${t}`)}function xT(e){if(e==null||typeof e=="function")return e;switch(`${e}`.toLowerCase()){case"ascending":return yv;case"descending":return gv}throw new Error(`invalid order: ${e}`)}function yv([e,t],[n,r]){return Cn(t,r)||Cn(e,n)}function gv([e,t],[n,r]){return ka(t,r)||Cn(e,n)}function Sp(e,t){let n=e[t];if(n){for(;n.source;)n=n.source;return n.source===null?null:n}}var kv=new Map([["accent",hd],["category10",md],["dark2",yd],["observable10",gd],["paired",vd],["pastel1",bd],["pastel2",xd],["set1",wd],["set2",kd],["set3",Sd],["tableau10",Td]]);function Sv(e){return e!=null&&kv.has(`${e}`.toLowerCase())}var vv=new Map([...kv,["brbg",qn(fc,dc)],["prgn",qn(pc,mc)],["piyg",qn(hc,yc)],["puor",qn(gc,vc)],["rdbu",qn(aa,wo)],["rdgy",qn(bc,xc)],["rdylbu",qn(sa,ko)],["rdylgn",qn(wc,kc)],["spectral",qn(Sc,Tc)],["burd",bv(aa,wo)],["buylrd",bv(sa,ko)],["blues",Le(Kc,Xc)],["greens",Le(Qc,Zc)],["greys",Le(Jc,el)],["oranges",Le(il,al)],["purples",Le(tl,nl)],["reds",Le(rl,ol)],["turbo",Pn(hl)],["viridis",Pn(gl)],["magma",Pn(vl)],["inferno",Pn(bl)],["plasma",Pn(xl)],["cividis",Pn(sl)],["cubehelix",Pn(cl)],["warm",Pn(ul)],["cool",Pn(fl)],["bugn",Le(Cc,_c)],["bupu",Le(Dc,Mc)],["gnbu",Le(Rc,Ec)],["orrd",Le(Ic,qc)],["pubu",Le(Ac,Lc)],["pubugn",Le(Pc,Bc)],["purd",Le(Fc,Oc)],["rdpu",Le(Nc,jc)],["ylgn",Le(Yc,Hc)],["ylgnbu",Le($c,zc)],["ylorbr",Le(Wc,Uc)],["ylorrd",Le(Vc,Gc)],["rainbow",xv(dl)],["sinebow",xv(ml)]]);function Le(e,t){return({length:n})=>n===1?[e[3][1]]:n===2?[e[3][1],e[3][2]]:(n=Math.max(3,Math.floor(n)),n>9?We(t,n):e[n])}function qn(e,t){return({length:n})=>n===2?[e[3][0],e[3][2]]:(n=Math.max(3,Math.floor(n)),n>11?We(t,n):e[n])}function bv(e,t){return({length:n})=>n===2?[e[3][2],e[3][0]]:(n=Math.max(3,Math.floor(n)),n>11?We(r=>t(1-r),n):e[n].slice().reverse())}function Pn(e){return({length:t})=>We(e,Math.max(2,Math.floor(t)))}function xv(e){return({length:t})=>We(e,Math.floor(t)+1).slice(0,-1)}function Tp(e){let t=`${e}`.toLowerCase();if(!vv.has(t))throw new Error(`unknown ordinal scheme: ${t}`);return vv.get(t)}function Da(e,t){let n=Tp(e),r=typeof n=="function"?n({length:t}):n;return r.length!==t?r.slice(0,t):r}function Tv(e,t="greys"){let n=new Set,[r,o]=Da(t,2);for(let i of e)if(i!=null)if(i===!0)n.add(o);else if(i===!1)n.add(r);else return;return[...n]}var wv=new Map([["brbg",dc],["prgn",mc],["piyg",yc],["puor",vc],["rdbu",wo],["rdgy",xc],["rdylbu",ko],["rdylgn",kc],["spectral",Tc],["burd",e=>wo(1-e)],["buylrd",e=>ko(1-e)],["blues",Xc],["greens",Zc],["greys",el],["purples",nl],["reds",ol],["oranges",al],["turbo",hl],["viridis",gl],["magma",vl],["inferno",bl],["plasma",xl],["cividis",sl],["cubehelix",cl],["warm",ul],["cool",fl],["bugn",_c],["bupu",Mc],["gnbu",Ec],["orrd",qc],["pubugn",Bc],["pubu",Lc],["purd",Oc],["rdpu",jc],["ylgnbu",zc],["ylgn",Hc],["ylorbr",Uc],["ylorrd",Gc],["rainbow",dl],["sinebow",ml]]);function No(e){let t=`${e}`.toLowerCase();if(!wv.has(t))throw new Error(`unknown quantitative scheme: ${t}`);return wv.get(t)}var wT=new Set(["brbg","prgn","piyg","puor","rdbu","rdgy","rdylbu","rdylgn","spectral","burd","buylrd"]);function Cv(e){return e!=null&&wT.has(`${e}`.toLowerCase())}var _p=e=>t=>e(1-t),Cp=[0,1],_v=new Map([["number",me],["rgb",yt],["hsl",Gu],["hcl",Ku],["lab",us]]);function Dp(e){let t=`${e}`.toLowerCase();if(!_v.has(t))throw new Error(`unknown interpolator: ${t}`);return _v.get(t)}function $o(e,t,n,{type:r,nice:o,clamp:i,zero:a,domain:s=Av(e,n),unknown:c,round:u,scheme:l,interval:d,range:f=le.get(e)===Fr?CT(n,s):le.get(e)===Or?_T(n,s):le.get(e)===Nr?Cp:void 0,interpolate:p=le.get(e)===ft?l==null&&f!==void 0?yt:No(l!==void 0?l:r==="cyclical"?"rainbow":"turbo"):u?mr:me,reverse:m}){if(s=Dv(s),d=Zn(d,r),(r==="cyclical"||r==="sequential")&&(r="linear"),typeof p!="function"&&(p=Dp(p)),m=!!m,f!==void 0){let h=s.length,y=(f=Dv(f)).length;if(h!==y){if(p.length===1)throw new Error("invalid piecewise interpolator");p=jt(p,f),f=void 0}}if(p.length===1?(m&&(p=_p(p),m=!1),f===void 0&&(f=Float64Array.from(s,(h,y)=>y/(s.length-1)),f.length===2&&(f=Cp)),t.interpolate((f===Cp?ut:Ma)(p))):t.interpolate(p),a){let[h,y]=et(s);(h>0||y<0)&&(s=_a(s),(Dn(s)||1)===Math.sign(h)?s[0]=0:s[s.length-1]=0)}return m&&(s=An(s)),t.domain(s).unknown(c),o&&(t.nice(kT(o,r)),s=t.domain()),f!==void 0&&t.range(f),i&&t.clamp(i),{type:r,domain:s,range:f,scale:t,interpolate:p,interval:d}}function Dv(e){return e=tn(e),e.length>=2?e:[e[0],e[0]]}function kT(e,t){return e===!0?void 0:typeof e=="number"?e:Y0(e,t)}function Mv(e,t,n){return $o(e,kr(),t,n)}function Rv(e,t,n){return Mp(e,t,{...n,exponent:.5})}function Mp(e,t,{exponent:n=1,...r}){return $o(e,Xi().exponent(n),t,{...r,type:"pow"})}function Ev(e,t,{base:n=10,domain:r=DT(t),...o}){return $o(e,Gi().base(n),t,{...o,domain:r})}function Iv(e,t,{constant:n=1,...r}){return $o(e,Ki().constant(n),t,r)}function qv(e,t,{range:n,quantiles:r=n===void 0?5:(n=[...n]).length,n:o=r,scheme:i="rdylbu",domain:a=MT(t),unknown:s,interpolate:c,reverse:u}){return n===void 0&&(n=c!==void 0?We(c,o):le.get(e)===ft?Da(i,o):void 0),a.length>0&&(a=Qi(a,n===void 0?{length:o}:n).quantiles()),Nl(e,t,{domain:a,range:n,reverse:u,unknown:s})}function Pv(e,t,{range:n,n:r=n===void 0?5:(n=[...n]).length,scheme:o="rdylbu",domain:i=Av(e,t),unknown:a,interpolate:s,reverse:c}){let[u,l]=et(i),d;return n===void 0?(d=ln(u,l,r),d[0]<=u&&d.splice(0,1),d[d.length-1]>=l&&d.pop(),r=d.length+1,n=s!==void 0?We(s,r):le.get(e)===ft?Da(o,r):void 0):(d=We(me(u,l),r+1).slice(1,-1),u instanceof Date&&(d=d.map(f=>new Date(f)))),Dn(tn(i))<0&&d.reverse(),Nl(e,t,{domain:d,range:n,reverse:c,unknown:a})}function Nl(e,t,{domain:n=[0],unknown:r,scheme:o="rdylbu",interpolate:i,range:a=i!==void 0?We(i,n.length+1):le.get(e)===ft?Da(o,n.length+1):void 0,reverse:s}){n=tn(n);let c=Dn(n);if(!isNaN(c)&&!ST(n,c))throw new Error(`the ${e} scale has a non-monotonic domain`);return s&&(a=An(a)),{type:"threshold",scale:Zi(c<0?An(n):n,a===void 0?[]:a).unknown(r),domain:n,range:a}}function ST(e,t){for(let n=1,r=e.length,o=e[0];n<r;++n){let i=dt(o,o=e[n]);if(i!==0&&i!==t)return!1}return!0}function Bv(e){return{type:"identity",scale:nv(le.get(e))?Ui():t=>t}}function jo(e,t=Jd){return e.length?[At(e,({value:n})=>n===void 0?n:At(n,t)),He(e,({value:n})=>n===void 0?n:He(n,t))]:[0,1]}function Av(e,t){let n=le.get(e);return(n===Fr||n===Nr||n===Or?TT:jo)(t)}function TT(e){return[0,e.length?He(e,({value:t})=>t===void 0?t:He(t,Jd)):1]}function CT(e,t){let n=e.find(({radius:a})=>a!==void 0);if(n!==void 0)return[0,n.radius];let r=un(e,.5,({value:a})=>a===void 0?NaN:un(a,.25,qr)),o=t.map(a=>3*Math.sqrt(a/r)),i=30/He(o);return i<1?o.map(a=>a*i):o}function _T(e,t){let n=ar(e,({value:i})=>i===void 0?NaN:ar(i,Math.abs)),r=t.map(i=>12*i/n),o=60/He(r);return o<1?r.map(i=>i*o):r}function DT(e){for(let{value:t}of e)if(t!==void 0)for(let n of t){if(n>0)return jo(e,qr);if(n<0)return jo(e,Mo)}return[1,10]}function MT(e){let t=[];for(let{value:n}of e)if(n!==void 0)for(let r of n)t.push(r);return t}function Ma(e){return(t,n)=>r=>e(t+r*(n-t))}var Rp=0,Ep;function Lv(){let e=Rp;return Rp=0,Ep=void 0,e}function nt(e){e!==Ep&&(Ep=e,console.warn(e),++Rp)}function jl(e,t,n,r,{type:o,nice:i,clamp:a,domain:s=jo(r),unknown:c,pivot:u=0,scheme:l,range:d,symmetric:f=!0,interpolate:p=le.get(e)===ft?l==null&&d!==void 0?yt:No(l!==void 0?l:"rdbu"):me,reverse:m}){u=+u,s=tn(s);let[h,y]=s;if(s.length>2&&nt(`Warning: the diverging ${e} scale domain contains extra elements.`),dt(h,y)<0&&([h,y]=[y,h],m=!m),h=Math.min(h,u),y=Math.max(y,u),typeof p!="function"&&(p=Dp(p)),d!==void 0&&(p=p.length===1?Ma(p)(...d):jt(p,d)),m&&(p=_p(p)),f){let b=n.apply(u),g=b-n.apply(h),w=n.apply(y)-b;g<w?h=n.invert(b-w):g>w&&(y=n.invert(b+g))}return t.domain([h,u,y]).unknown(c).interpolator(p),a&&t.clamp(a),i&&t.nice(i),{type:o,domain:[h,y],pivot:u,interpolate:p,scale:t}}function Fv(e,t,n){return jl(e,ia(),RT,t,n)}function Ov(e,t,n){return Ip(e,t,{...n,exponent:.5})}function Ip(e,t,{exponent:n=1,...r}){return jl(e,uc().exponent(n=+n),qT(n),t,{...r,type:"diverging-pow"})}function Nv(e,t,{base:n=10,pivot:r=1,domain:o=jo(t,r<0?Mo:qr),...i}){return jl(e,cc().base(n=+n),ET,t,{domain:o,pivot:r,...i})}function jv(e,t,{constant:n=1,...r}){return jl(e,lc().constant(n=+n),PT(n),t,r)}var RT={apply(e){return e},invert(e){return e}},ET={apply:Math.log,invert:Math.exp},IT={apply(e){return Math.sign(e)*Math.sqrt(Math.abs(e))},invert(e){return Math.sign(e)*(e*e)}};function qT(e){return e===.5?IT:{apply(t){return Math.sign(t)*Math.pow(Math.abs(t),e)},invert(t){return Math.sign(t)*Math.pow(Math.abs(t),1/e)}}}function PT(e){return{apply(t){return Math.sign(t)*Math.log1p(Math.abs(t/e))},invert(t){return Math.sign(t)*Math.expm1(Math.abs(t))*e}}}function $v(e,t,n,r){return $o(e,t,n,r)}function zv(e,t,n){return $v(e,ic(),t,n)}function Yv(e,t,n){return $v(e,ac(),t,n)}var zo=Symbol("ordinal");function Wv(e,t,n,{type:r,interval:o,domain:i,range:a,reverse:s,hint:c}){return o=Zn(o,r),i===void 0&&(i=Xv(n,o,e)),(r==="categorical"||r===zo)&&(r="ordinal"),s&&(i=An(i)),i=t.domain(i).domain(),a!==void 0&&(typeof a=="function"&&(a=a(i)),t.range(a)),{type:r,domain:i,range:a,scale:t,hint:c,interval:o}}function Uv(e,t,{type:n,interval:r,domain:o,range:i,scheme:a,unknown:s,...c}){r=Zn(r,n),o===void 0&&(o=Xv(t,r,e));let u;if(le.get(e)===Lo)u=BT(t),i=i===void 0?AT(u):ve(i,Fo);else if(le.get(e)===ft&&(i===void 0&&(n==="ordinal"||n===zo)&&(i=Tv(o,a),i!==void 0&&(a=void 0)),a===void 0&&i===void 0&&(a=n==="ordinal"?"turbo":"observable10"),a!==void 0))if(i!==void 0){let l=No(a),d=i[0],f=i[1]-i[0];i=({length:p})=>We(m=>l(d+f*m),p)}else i=Tp(a);if(s===Hi)throw new Error(`implicit unknown on ${e} scale is not supported`);return Wv(e,xr().unknown(s),t,{...c,type:n,domain:o,range:i,hint:u})}function Vv(e,t,{align:n=.5,padding:r=.5,...o}){return Kv(Qf().align(n).padding(r),t,o,e)}function Gv(e,t,{align:n=.5,padding:r=.1,paddingInner:o=r,paddingOuter:i=e==="fx"||e==="fy"?0:r,...a}){return Kv(Yn().align(n).paddingInner(o).paddingOuter(i),t,a,e)}function Kv(e,t,n,r){let{round:o}=n;return o!==void 0&&e.round(o=!!o),e=Wv(r,e,t,n),e.round=o,e}function Xv(e,t,n){let r=new Dt;for(let{value:o,domain:i}of e){if(i!==void 0)return i();if(o!==void 0)for(let a of o)r.add(a)}if(t!==void 0){let[o,i]=et(r).map(t.floor,t);return t.range(o,t.offset(i))}if(r.size>1e4&&le.get(n)===_t)throw new Error(`implicit ordinal domain of ${n} scale has more than 10,000 values`);return oi(r,Cn)}function Hv(e,t){let n;for(let{hint:r}of e){let o=r?.[t];if(o!==void 0){if(n===void 0)n=o;else if(n!==o)return}}return n}function BT(e){return{fill:Hv(e,"fill"),stroke:Hv(e,"stroke")}}function AT(e){return Ae(e.fill)?qd:kl}function Ra(e,{label:t,inset:n=0,insetTop:r=n,insetRight:o=n,insetBottom:i=n,insetLeft:a=n,round:s,nice:c,clamp:u,zero:l,align:d,padding:f,projection:p,facet:{label:m=t}={},...h}={}){let y={};for(let[b,g]of e){let w=h[b],v=OT(b,g,{round:le.get(b)===_t?s:void 0,nice:c,clamp:u,zero:l,align:d,padding:f,projection:p,...w});if(v){let{label:S=b==="fx"||b==="fy"?m:t,percent:x,transform:k,inset:T,insetTop:_=T!==void 0?T:b==="y"?r:0,insetRight:I=T!==void 0?T:b==="x"?o:0,insetBottom:D=T!==void 0?T:b==="y"?i:0,insetLeft:R=T!==void 0?T:b==="x"?a:0}=w||{};if(k==null)k=void 0;else if(typeof k!="function")throw new Error("invalid scale transform; not a function");v.percent=!!x,v.label=S===void 0?LT(g,v):S,v.transform=k,b==="x"||b==="fx"?(v.insetLeft=+R,v.insetRight=+I):(b==="y"||b==="fy")&&(v.insetTop=+_,v.insetBottom=+D),y[b]=v}}return y}function Pp(e){let t={},n={scales:t};for(let[r,o]of Object.entries(e)){let{scale:i,type:a,interval:s,label:c}=o;t[r]=zT(o),n[r]=i,i.type=a,s!=null&&(i.interval=s),c!=null&&(i.label=c)}return n}function tb(e,t){let{x:n,y:r,fx:o,fy:i}=e,a=o||i?zl(t):t;o&&Qv(o,a),i&&Zv(i,a);let s=o||i?Bp(e,t):t;n&&Qv(n,s),r&&Zv(r,s)}function LT(e=[],t){let n;for(let{label:r}of e)if(r!==void 0){if(n===void 0)n=r;else if(n!==r)return}if(n!==void 0)return!on(t)&&t.percent&&(n=`${n} (%)`),{inferred:!0,toString:()=>n}}function nb(e){return Math.sign(Dn(e.domain()))*Math.sign(Dn(e.range()))}function zl(e){let{marginTop:t,marginRight:n,marginBottom:r,marginLeft:o,width:i,height:a,facet:{marginTop:s,marginRight:c,marginBottom:u,marginLeft:l}}=e;return{marginTop:Math.max(t,s),marginRight:Math.max(n,c),marginBottom:Math.max(r,u),marginLeft:Math.max(o,l),width:i,height:a}}function Bp({fx:e,fy:t},n){let{marginTop:r,marginRight:o,marginBottom:i,marginLeft:a,width:s,height:c}=zl(n);return{marginTop:r,marginRight:o,marginBottom:i,marginLeft:a,width:e?e.scale.bandwidth()+a+o:s,height:t?t.scale.bandwidth()+r+i:c,facet:{width:s,height:c}}}function Qv(e,t){if(e.range===void 0){let{insetLeft:n,insetRight:r}=e,{width:o,marginLeft:i=0,marginRight:a=0}=t,s=i+n,c=o-a-r;e.range=[s,Math.max(s,c)],on(e)||(e.range=ob(e)),e.scale.range(e.range)}rb(e)}function Zv(e,t){if(e.range===void 0){let{insetTop:n,insetBottom:r}=e,{height:o,marginTop:i=0,marginBottom:a=0}=t,s=i+n,c=o-a-r;e.range=[Math.max(s,c),s],on(e)?e.range.reverse():e.range=ob(e),e.scale.range(e.range)}rb(e)}function rb(e){e.round===void 0&&jT(e)&&FT(e)<=30&&e.scale.round(!0)}function FT({scale:e}){let t=e.domain().length,[n,r]=e.range(),o=e.paddingInner?e.paddingInner():1,i=e.paddingOuter?e.paddingOuter():e.padding(),a=t-o,s=Math.abs(r-n)/Math.max(1,a+i*2);return(s-Math.floor(s))*a}function ob(e){let t=e.scale.domain().length+Ap(e);if(!(t>2))return e.range;let[n,r]=e.range;return Array.from({length:t},(o,i)=>n+i/(t-1)*(r-n))}function OT(e,t=[],n={}){let r=NT(e,t,n);if(n.type===void 0&&n.domain===void 0&&n.range===void 0&&n.interval==null&&e!=="fx"&&e!=="fy"&&on({type:r})){let o=t.map(({value:i})=>i).filter(i=>i!==void 0);o.some(Ke)?nt(`Warning: some data associated with the ${e} scale are dates. Dates are typically associated with a "utc" or "time" scale rather than a "${Yo(r)}" scale. If you are using a bar mark, you probably want a rect mark with the interval option instead; if you are using a group transform, you probably want a bin transform instead. If you want to treat this data as ordinal, you can specify the interval of the ${e} scale (e.g., d3.utcDay), or you can suppress this warning by setting the type of the ${e} scale to "${Yo(r)}".`):o.some(U0)?nt(`Warning: some data associated with the ${e} scale are strings that appear to be dates (e.g., YYYY-MM-DD). If these strings represent dates, you should parse them to Date objects. Dates are typically associated with a "utc" or "time" scale rather than a "${Yo(r)}" scale. If you are using a bar mark, you probably want a rect mark with the interval option instead; if you are using a group transform, you probably want a bin transform instead. If you want to treat this data as ordinal, you can suppress this warning by setting the type of the ${e} scale to "${Yo(r)}".`):o.some(V0)&&nt(`Warning: some data associated with the ${e} scale are strings that appear to be numbers. If these strings represent numbers, you should parse or coerce them to numbers. Numbers are typically associated with a "linear" scale rather than a "${Yo(r)}" scale. If you want to treat this data as ordinal, you can specify the interval of the ${e} scale (e.g., 1 for integers), or you can suppress this warning by setting the type of the ${e} scale to "${Yo(r)}".`)}switch(n.type=r,r){case"diverging":case"diverging-sqrt":case"diverging-pow":case"diverging-log":case"diverging-symlog":case"cyclical":case"sequential":case"linear":case"sqrt":case"threshold":case"quantile":case"pow":case"log":case"symlog":n=$l(t,n,Br);break;case"identity":switch(le.get(e)){case _t:n=$l(t,n,Br);break;case Lo:n=$l(t,n,$T);break}break;case"utc":case"time":n=$l(t,n,fp);break}switch(r){case"diverging":return Fv(e,t,n);case"diverging-sqrt":return Ov(e,t,n);case"diverging-pow":return Ip(e,t,n);case"diverging-log":return Nv(e,t,n);case"diverging-symlog":return jv(e,t,n);case"categorical":case"ordinal":case zo:return Uv(e,t,n);case"cyclical":case"sequential":case"linear":return Mv(e,t,n);case"sqrt":return Rv(e,t,n);case"threshold":return Nl(e,t,n);case"quantile":return qv(e,t,n);case"quantize":return Pv(e,t,n);case"pow":return Mp(e,t,n);case"log":return Ev(e,t,n);case"symlog":return Iv(e,t,n);case"utc":return Yv(e,t,n);case"time":return zv(e,t,n);case"point":return Vv(e,t,n);case"band":return Gv(e,t,n);case"identity":return Bv(e);case void 0:return;default:throw new Error(`unknown scale type: ${r}`)}}function Yo(e){return typeof e=="symbol"?e.description:e}function Jv(e){return typeof e=="string"?`${e}`.toLowerCase():e}var eb={toString:()=>"projection"};function NT(e,t,{type:n,domain:r,range:o,scheme:i,pivot:a,projection:s}){if(n=Jv(n),e==="fx"||e==="fy")return"band";(e==="x"||e==="y")&&s!=null&&(n=eb);for(let l of t){let d=Jv(l.type);if(d!==void 0){if(n===void 0)n=d;else if(n!==d)throw new Error(`scale incompatible with channel: ${n} !== ${d}`)}}if(n===eb)return;if(n!==void 0)return n;if(r===void 0&&!t.some(({value:l})=>l!==void 0))return;let c=le.get(e);if(c===Fr)return"sqrt";if(c===Nr||c===Or)return"linear";if(c===Lo)return"ordinal";let u=(r??o)?.length;if(u<2||u>2)return qp(c);if(r!==void 0){if(pp(r))return qp(c);if(Ke(r))return"utc"}else{let l=t.map(({value:d})=>d).filter(d=>d!==void 0);if(l.some(pp))return qp(c);if(l.some(Ke))return"utc"}if(c===ft){if(a!=null||Cv(i))return"diverging";if(Sv(i))return"categorical"}return"linear"}function qp(e){switch(e){case _t:return"point";case ft:return zo;default:return"ordinal"}}function on({type:e}){return e==="ordinal"||e==="point"||e==="band"||e===zo}function Ap({type:e}){return e==="threshold"}function jT({type:e}){return e==="point"||e==="band"}function tr(e){if(e===void 0)return!0;let t=e.domain(),n=e(t[0]);for(let r=1,o=t.length;r<o;++r)if(e(t[r])-n)return!1;return!0}function $l(e,{domain:t,...n},r){for(let o of e)o.value!==void 0&&(t===void 0&&(t=o.value?.domain),o.value=r(o.value));return{domain:t===void 0?t:r(t),...n}}function $T(e){return ve(e,Fo)}function ib(e){return t=>{if(!le.has(t=`${t}`))throw new Error(`unknown scale: ${t}`);return e[t]}}function zT({scale:e,type:t,domain:n,range:r,interpolate:o,interval:i,transform:a,percent:s,pivot:c}){if(t==="identity")return{type:"identity",apply:l=>l,invert:l=>l};let u=e.unknown?e.unknown():void 0;return{type:t,domain:_a(n),...r!==void 0&&{range:_a(r)},...a!==void 0&&{transform:a},...s&&{percent:s},...u!==void 0&&{unknown:u},...i!==void 0&&{interval:i},...o!==void 0&&{interpolate:o},...e.clamp&&{clamp:e.clamp()},...c!==void 0&&{pivot:c,symmetric:!1},...e.base&&{base:e.base()},...e.exponent&&{exponent:e.exponent()},...e.constant&&{constant:e.constant()},...e.align&&{align:e.align(),round:e.round()},...e.padding&&(e.paddingInner?{paddingInner:e.paddingInner(),paddingOuter:e.paddingOuter()}:{padding:e.padding()}),...e.bandwidth&&{bandwidth:e.bandwidth(),step:e.step()},apply:l=>e(l),...e.invert&&{invert:l=>e.invert(l)}}}function sb(e,t){let{fx:n,fy:r}=Ra(e,t),o=n?.scale.domain(),i=r?.scale.domain();return o&&i?ja(o,i).map(([a,s],c)=>({x:a,y:s,i:c})):o?o.map((a,s)=>({x:a,i:s})):i?i.map((a,s)=>({y:a,i:s})):void 0}function cb(e,{x:t,y:n}){return t&&(t=jp(t)),n&&(n=jp(n)),e.filter(t&&n?r=>t.has(r.x)&&n.has(r.y):t?r=>t.has(r.x):r=>n.has(r.y)).sort(t&&n?(r,o)=>t.get(r.x)-t.get(o.x)||n.get(r.y)-n.get(o.y):t?(r,o)=>t.get(r.x)-t.get(o.x):(r,o)=>n.get(r.y)-n.get(o.y))}function Hl(e,{fx:t,fy:n}){let r=rn(e),o=t?.value,i=n?.value;return t&&n?Ur(r,a=>(a.fx=o[a[0]],a.fy=i[a[0]],a),a=>o[a],a=>i[a]):t?Ur(r,a=>(a.fx=o[a[0]],a),a=>o[a]):Ur(r,a=>(a.fy=i[a[0]],a),a=>i[a])}function lb(e,t,{marginTop:n,marginLeft:r}){let o=e?({x:a})=>e(a)-r:()=>0,i=t?({y:a})=>t(a)-n:()=>0;return function(a){this.tagName==="svg"?(this.setAttribute("x",o(a)),this.setAttribute("y",i(a))):this.setAttribute("transform",`translate(${o(a)},${i(a)})`)}}function ub(e){let t=[],n=new Uint32Array(cr(e,r=>r.length));for(let r of e){let o=0;for(let i of e)r!==i&&(n.set(i,o),o+=i.length);t.push(n.slice(0,o))}return t}var YT=new Map([["top",Lp],["right",Np],["bottom",Fp],["left",Op],["top-left",Yl(Lp,Op)],["top-right",Yl(Lp,Np)],["bottom-left",Yl(Fp,Op)],["bottom-right",Yl(Fp,Np)],["top-empty",WT],["right-empty",GT],["bottom-empty",UT],["left-empty",VT],["empty",KT]]);function fb(e){if(e==null)return null;let t=YT.get(`${e}`.toLowerCase());if(t)return t;throw new Error(`invalid facet anchor: ${e}`)}var ab=new WeakMap;function jp(e){let t=ab.get(e);return t||ab.set(e,t=new pt(ve(e,(n,r)=>[n,r]))),t}function nr(e,t){return jp(e).get(t)}function HT(e,t,n){return t=Tt(t),n=Tt(n),e.find(r=>Object.is(Tt(r.x),t)&&Object.is(Tt(r.y),n))}function Wl(e,t,n){return HT(e,t,n)?.empty}function Lp(e,{y:t},{y:n}){return t?nr(t,n)===0:!0}function Fp(e,{y:t},{y:n}){return t?nr(t,n)===t.length-1:!0}function Op(e,{x:t},{x:n}){return t?nr(t,n)===0:!0}function Np(e,{x:t},{x:n}){return t?nr(t,n)===t.length-1:!0}function WT(e,{y:t},{x:n,y:r,empty:o}){if(o)return!1;if(!t)return;let i=nr(t,r);if(i>0)return Wl(e,n,t[i-1])}function UT(e,{y:t},{x:n,y:r,empty:o}){if(o)return!1;if(!t)return;let i=nr(t,r);if(i<t.length-1)return Wl(e,n,t[i+1])}function VT(e,{x:t},{x:n,y:r,empty:o}){if(o)return!1;if(!t)return;let i=nr(t,n);if(i>0)return Wl(e,t[i-1],r)}function GT(e,{x:t},{x:n,y:r,empty:o}){if(o)return!1;if(!t)return;let i=nr(t,n);if(i<t.length-1)return Wl(e,t[i+1],r)}function KT(e,t,{empty:n}){return n}function Yl(e,t){return function(){return e.apply(null,arguments)&&t.apply(null,arguments)}}function Ul(e,{channels:{fx:t,fy:n},groups:r}){return t&&n?e.map(({x:o,y:i})=>r.get(o)?.get(i)??[]):t?e.map(({x:o})=>r.get(o)??[]):e.map(({y:o})=>r.get(o)??[])}var db=Math.PI,Bn=2*db,$p=.618;function pb({projection:e,inset:t=0,insetTop:n=t,insetRight:r=t,insetBottom:o=t,insetLeft:i=t}={},a){if(e==null)return;if(typeof e.stream=="function")return e;let s,c,u="frame";if(nn(e)){let S;if({type:e,domain:c,inset:S,insetTop:n=S!==void 0?S:n,insetRight:r=S!==void 0?S:r,insetBottom:o=S!==void 0?S:o,insetLeft:i=S!==void 0?S:i,clip:u=u,...s}=e,e==null)return}typeof e!="function"&&({type:e}=zp(e));let{width:l,height:d,marginLeft:f,marginRight:p,marginTop:m,marginBottom:h}=a,y=l-f-p-i-r,b=d-m-h-n-o;if(e=e?.({width:y,height:b,clip:u,...s}),e==null)return;u=XT(u,f,m,l-p,d-h);let g=f+i,w=m+n,v;if(c!=null){let[[S,x],[k,T]]=fo(e).bounds(c),_=Math.min(y/(k-S),b/(T-x));_>0?(g-=(_*(S+k)-y)/2,w-=(_*(x+T)-b)/2,v=po({point(I,D){this.stream.point(I*_+g,D*_+w)}})):nt("Warning: the projection could not be fit to the specified domain; using the default scale.")}return v??(v=g===0&&w===0?mb():po({point(S,x){this.stream.point(S+g,x+w)}})),{stream:S=>e.stream(v.stream(u(S)))}}function zp(e){switch(`${e}`.toLowerCase()){case"albers-usa":return Bt(If,.7463,.4673);case"albers":return Vl(Oi,.7463,.4673);case"azimuthal-equal-area":return Bt(Pf,4,4);case"azimuthal-equidistant":return Bt(Af,Bn,Bn);case"conic-conformal":return Vl(Of,Bn,Bn);case"conic-equal-area":return Vl(zn,6.1702,2.9781);case"conic-equidistant":return Vl(jf,7.312,3.6282);case"equal-earth":return Bt(zf,5.4133,2.6347);case"equirectangular":return Bt(Nf,Bn,db);case"gnomonic":return Bt(Hf,3.4641,3.4641);case"identity":return{type:mb};case"reflect-y":return{type:QT};case"mercator":return Bt(Lf,Bn,Bn);case"orthographic":return Bt(Uf,2,2);case"stereographic":return Bt(Gf,2,2);case"transverse-mercator":return Bt(Xf,Bn,Bn);default:throw new Error(`unknown projection type: ${e}`)}}function XT(e,t,n,r,o){if(e===!1||e==null||typeof e=="number")return i=>i;switch(e===!0&&(e="frame"),`${e}`.toLowerCase()){case"frame":return ao(t,n,r,o);default:throw new Error(`unknown projection clip type: ${e}`)}}function Bt(e,t,n){return{type:({width:r,height:o,rotate:i,precision:a=.15,clip:s})=>{let c=e();return a!=null&&c.precision?.(a),i!=null&&c.rotate?.(i),typeof s=="number"&&c.clipAngle?.(s),r!=null&&(c.scale(Math.min(r/t,o/n)),c.translate([r/2,o/2])),c},aspectRatio:n/t}}function Vl(e,t,n){let{type:r,aspectRatio:o}=Bt(e,t,n);return{type:i=>{let{parallels:a,domain:s,width:c,height:u}=i,l=r(i);return a!=null&&(l.parallels(a),s===void 0&&c!=null&&l.fitSize([c,u],{type:"Sphere"})),l},aspectRatio:o}}var mb=ut({stream:e=>e}),QT=ut(po({point(e,t){this.stream.point(e,-t)}}));function hb(e,t,n,r){let o=n[e],i=n[t],a=o.length,s=n[e]=new Float64Array(a).fill(NaN),c=n[t]=new Float64Array(a).fill(NaN),u,l=r.stream({point(d,f){s[u]=d,c[u]=f}});for(u=0;u<a;++u)l.point(o[u],i[u])}function yb({projection:e}={}){return e==null?!1:typeof e.stream=="function"?!0:(nn(e)&&(e=e.type),e!=null)}function gb(e){if(typeof e?.stream=="function")return $p;if(nn(e)){let t,n;if({domain:t,type:e,...n}=e,t!=null&&e!=null){let r=typeof e=="string"?zp(e).type:e,[[o,i],[a,s]]=fo(r({...n,width:100,height:100})).bounds(t),c=(s-i)/(a-o);return c&&isFinite(c)?c<.2?.2:c>5?5:c:$p}}if(e!=null){if(typeof e!="function"){let{aspectRatio:t}=zp(e);if(t)return t}return $p}}function vb(e){let t=[],n=[],r={scale:"x",value:t},o={scale:"y",value:n},i={point(a,s){t.push(a),n.push(s)},lineStart(){},lineEnd(){},polygonStart(){},polygonEnd(){},sphere(){}};for(let a of e.value)qt(a,i);return[r,o]}function bb({x:e,y:t}){if(e||t)return e??(e=n=>n),t??(t=n=>n),po({point(n,r){this.stream.point(e(n),t(r))}})}function Ho(e={}){let{document:t=typeof window<"u"?window.document:void 0,clip:n}=e;return{document:t,clip:Ol(n)}}function ae(e,{document:t}){return mt(dn(e).call(t.documentElement))}var Gl=Symbol("unset");function Kl(e){return(e.length===1?ZT:JT)(e)}function ZT(e){let t,n=Gl;return r=>(Object.is(n,r)||(n=r,t=e(r)),t)}function JT(e){let t,n;return(...r)=>((n?.length!==r.length||n.some((o,i)=>!Object.is(o,r[i])))&&(n=r,t=e(...r)),t)}var eC=Kl(e=>new Intl.NumberFormat(e)),A$=Kl((e,t)=>new Intl.DateTimeFormat(e,{timeZone:"UTC",...t&&{month:t}})),L$=Kl((e,t)=>new Intl.DateTimeFormat(e,{timeZone:"UTC",...t&&{weekday:t}}));function tC(e="en-US"){let t=eC(e);return n=>n!=null&&!isNaN(n)?t.format(n):void 0}function nC(e){return Ml(e,"Invalid Date")}function rC(e="en-US"){let t=tC(e);return n=>(n instanceof Date?nC:typeof n=="number"?t:Te)(n)}var an=rC();var $e=(typeof window<"u"?window.devicePixelRatio>1:typeof it>"u")?0:.5,oC=0;function wb(){return`plot-clip-${++oC}`}function kb(e,{title:t,href:n,ariaLabel:r,ariaDescription:o,ariaHidden:i,target:a,fill:s,fillOpacity:c,stroke:u,strokeWidth:l,strokeOpacity:d,strokeLinejoin:f,strokeLinecap:p,strokeMiterlimit:m,strokeDasharray:h,strokeDashoffset:y,opacity:b,mixBlendMode:g,imageFilter:w,paintOrder:v,pointerEvents:S,shapeRendering:x,channels:k},{ariaLabel:T,fill:_="currentColor",fillOpacity:I,stroke:D="none",strokeOpacity:R,strokeWidth:O,strokeLinecap:A,strokeLinejoin:C,strokeMiterlimit:F,paintOrder:q}){_===null&&(s=null,c=null),D===null&&(u=null,d=null),Ae(_)?!Ae(D)&&(!Ae(s)||k?.fill)&&(D="none"):Ae(D)&&(!Ae(u)||k?.stroke)&&(_="none");let[K,P]=en(s,_),[L,H]=we(c,I),[V,z]=en(u,D),[ee,te]=we(d,R),[ne,j]=we(b);Lr(z)||(l===void 0&&(l=O),p===void 0&&(p=A),f===void 0&&(f=C),m===void 0&&!X0(f)&&(m=F),!Lr(P)&&v===void 0&&(v=q));let[ie,E]=we(l);return _!==null&&(e.fill=ke(P,"currentColor"),e.fillOpacity=Ea(H,1)),D!==null&&(e.stroke=ke(z,"none"),e.strokeWidth=Ea(E,1),e.strokeOpacity=Ea(te,1),e.strokeLinejoin=ke(f,"miter"),e.strokeLinecap=ke(p,"butt"),e.strokeMiterlimit=Ea(m,4),e.strokeDasharray=ke(h,"none"),e.strokeDashoffset=ke(y,"0")),e.target=Te(a),e.ariaLabel=Te(T),e.ariaDescription=Te(o),e.ariaHidden=Te(i),e.opacity=Ea(j,1),e.mixBlendMode=ke(g,"normal"),e.imageFilter=ke(w,"none"),e.paintOrder=ke(v,"normal"),e.pointerEvents=ke(S,"auto"),e.shapeRendering=ke(x,"auto"),{title:{value:t,optional:!0,filter:null},href:{value:n,optional:!0,filter:null},ariaLabel:{value:r,optional:!0,filter:null},fill:{value:K,scale:"auto",optional:!0},fillOpacity:{value:L,scale:"auto",optional:!0},stroke:{value:V,scale:"auto",optional:!0},strokeOpacity:{value:ee,scale:"auto",optional:!0},strokeWidth:{value:ie,optional:!0},opacity:{value:ne,scale:"auto",optional:!0}}}function iC(e,t){t&&e.filter(n=>Sa(t[n])).append("title").call(sC,t)}function aC(e,t){t&&e.filter(([n])=>Sa(t[n])).append("title").call(cC,t)}function sC(e,t){t&&e.text(n=>an(t[n]))}function cC(e,t){t&&e.text(([n])=>an(t[n]))}function rt(e,{target:t,tip:n},{ariaLabel:r,title:o,fill:i,fillOpacity:a,stroke:s,strokeOpacity:c,strokeWidth:u,opacity:l,href:d}){r&&Q(e,"aria-label",f=>r[f]),i&&Q(e,"fill",f=>i[f]),a&&Q(e,"fill-opacity",f=>a[f]),s&&Q(e,"stroke",f=>s[f]),c&&Q(e,"stroke-opacity",f=>c[f]),u&&Q(e,"stroke-width",f=>u[f]),l&&Q(e,"opacity",f=>l[f]),d&&Cb(e,f=>d[f],t),n||iC(e,o)}function Sb(e,{target:t,tip:n},{ariaLabel:r,title:o,fill:i,fillOpacity:a,stroke:s,strokeOpacity:c,strokeWidth:u,opacity:l,href:d}){r&&Q(e,"aria-label",([f])=>r[f]),i&&Q(e,"fill",([f])=>i[f]),a&&Q(e,"fill-opacity",([f])=>a[f]),s&&Q(e,"stroke",([f])=>s[f]),c&&Q(e,"stroke-opacity",([f])=>c[f]),u&&Q(e,"stroke-width",([f])=>u[f]),l&&Q(e,"opacity",([f])=>l[f]),d&&Cb(e,([f])=>d[f],t),n||aC(e,o)}function lC({ariaLabel:e,title:t,fill:n,fillOpacity:r,stroke:o,strokeOpacity:i,strokeWidth:a,opacity:s,href:c},{tip:u}){return[e,u?void 0:t,n,r,o,i,a,s,c].filter(l=>l!==void 0)}function uC(e,t,n){let r=ni(e,o=>t[o]);return n===void 0&&r.size>1+e.length>>1&&nt("Warning: the implicit z channel has high cardinality. This may occur when the fill or stroke channel is associated with quantitative data rather than ordinal or categorical data. You can suppress this warning by setting the z option explicitly; if this data represents a single series, set z to null."),r.values()}function*Tb(e,t,n,r){let{z:o}=n,{z:i}=r,a=lC(r,n),s=[...t,...a];for(let c of i?uC(e,i,o):[e]){let u,l;e:for(let d of c){for(let f of s)if(!St(f[d])){l&&l.push(-1);continue e}if(u===void 0){l&&(yield l),u=a.map(f=>Tt(f[d])),l=[d];continue}l.push(d);for(let f=0;f<a.length;++f)if(Tt(a[f][d])!==u[f]){yield l,u=a.map(m=>Tt(m[d])),l=[d];continue e}}l&&(yield l)}}function fC(e,t,n,r){let o,{clip:i=r.clip}=t;i==="frame"?(e=ae("svg:g",r).each(function(){this.appendChild(e.node()),e.node=()=>this}),o=pC(r,n)):i&&(o=hC(i,r)),Q(e,"aria-label",t.ariaLabel),Q(e,"aria-description",t.ariaDescription),Q(e,"aria-hidden",t.ariaHidden),Q(e,"clip-path",o)}function dC(e){let t=new WeakMap;return(n,r)=>{let o=t.get(n);if(!o){let i=wb();mt(n.ownerSVGElement).append("clipPath").attr("id",i).call(e,n,r),t.set(n,o=`url(#${i})`)}return o}}var pC=dC((e,t,n)=>{let{width:r,height:o,marginLeft:i,marginRight:a,marginTop:s,marginBottom:c}=n;e.append("rect").attr("x",i).attr("y",s).attr("width",r-a-i).attr("height",o-s-c)}),xb=new WeakMap,mC={type:"Sphere"};function hC(e,t){let n,r;if((n=xb.get(t))||xb.set(t,n=new WeakMap),e.type==="Sphere"&&(e=mC),!(r=n.get(e))){let o=wb();mt(t.ownerSVGElement).append("clipPath").attr("id",o).append("path").attr("d",t.path()(e)),n.set(e,r=`url(#${o})`)}return r}function ze(e,t,n,r){fC(e,t,n,r),Q(e,"class",t.className),Q(e,"fill",t.fill),Q(e,"fill-opacity",t.fillOpacity),Q(e,"stroke",t.stroke),Q(e,"stroke-width",t.strokeWidth),Q(e,"stroke-opacity",t.strokeOpacity),Q(e,"stroke-linejoin",t.strokeLinejoin),Q(e,"stroke-linecap",t.strokeLinecap),Q(e,"stroke-miterlimit",t.strokeMiterlimit),Q(e,"stroke-dasharray",t.strokeDasharray),Q(e,"stroke-dashoffset",t.strokeDashoffset),Q(e,"shape-rendering",t.shapeRendering),Q(e,"filter",t.imageFilter),Q(e,"paint-order",t.paintOrder);let{pointerEvents:o=r.pointerSticky===!1?"none":void 0}=t;Q(e,"pointer-events",o)}function Fe(e,t){yC(e,"mix-blend-mode",t.mixBlendMode),Q(e,"opacity",t.opacity)}function Cb(e,t,n){e.each(function(r){let o=t(r);if(o!=null){let i=this.ownerDocument.createElementNS(Lt.svg,"a");i.setAttribute("fill","inherit"),i.setAttributeNS(Lt.xlink,"href",o),n!=null&&i.setAttribute("target",n),this.parentNode.insertBefore(i,this).appendChild(this)}})}function Q(e,t,n){n!=null&&e.attr(t,n)}function yC(e,t,n){n!=null&&e.style(t,n)}function Ye(e,t,{x:n,y:r},o=$e,i=$e){o+=t.dx,i+=t.dy,n?.bandwidth&&(o+=n.bandwidth()/2),r?.bandwidth&&(i+=r.bandwidth()/2),(o||i)&&e.attr("transform",`translate(${o},${i})`)}function ke(e,t){if((e=Te(e))!==t)return e}function Ea(e,t){if((e=Ce(e))!==t)return e}var gC=/^-?([_a-z]|[\240-\377]|\\[0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|\\[^\r\n\f0-9a-f])([_a-z0-9-]|[\240-\377]|\\[0-9a-f]{1,6}(\r\n|[ \t\r\n\f])?|\\[^\r\n\f0-9a-f])*$/i;function Wo(e){if(e===void 0)return"plot-d6a7b5";if(e=`${e}`,!gC.test(e))throw new Error(`invalid class name: ${e}`);return e}function Uo(e,t){if(typeof t=="string")e.property("style",t);else if(t!=null)for(let n of e)Object.assign(n.style,t)}function sn({frameAnchor:e},{width:t,height:n,marginTop:r,marginRight:o,marginBottom:i,marginLeft:a}){return[/left$/.test(e)?a:/right$/.test(e)?t-o:(a+t-o)/2,/^top/.test(e)?r:/^bottom/.test(e)?n-i:(r+n-i)/2]}var ye=class{constructor(t,n={},r={},o){let{facet:i="auto",facetAnchor:a,fx:s,fy:c,sort:u,dx:l=0,dy:d=0,margin:f=0,marginTop:p=f,marginRight:m=f,marginBottom:h=f,marginLeft:y=f,className:b,clip:g=o?.clip,channels:w,tip:v,render:S}=r;if(this.data=t,this.sort=Qn(u)?u:null,this.initializer=En(r).initializer,this.transform=this.initializer?r.transform:bp(r).transform,i===null||i===!1?this.facet=null:(this.facet=Je(i===!0?"include":i,"facet",["auto","include","exclude","super"]),this.fx=t===qo&&typeof s=="string"?[s]:s,this.fy=t===qo&&typeof c=="string"?[c]:c),this.facetAnchor=fb(a),n=mp(n),w!==void 0&&(n={...vC(w),...n}),o!==void 0&&(n={...kb(this,r,o),...n}),this.channels=Object.fromEntries(Object.entries(n).map(([x,k])=>{if(Bo(k.value)){let{value:T,label:_=k.label,scale:I=k.scale}=k.value;k={...k,label:_,scale:I,value:T}}if(t===qo&&typeof k.value=="string"){let{value:T}=k;k={...k,value:[T]}}return[x,k]}).filter(([x,{value:k,optional:T}])=>{if(k!=null)return!0;if(T)return!1;throw new Error(`missing channel value: ${x}`)})),this.dx=+l,this.dy=+d,this.marginTop=+p,this.marginRight=+m,this.marginBottom=+h,this.marginLeft=+y,this.clip=Ol(g),this.tip=bC(v),this.className=Te(b),this.facet==="super"){if(s||c)throw new Error("super-faceting cannot use fx or fy");for(let x in this.channels){let{scale:k}=n[x];if(!(k!=="x"&&k!=="y"))throw new Error("super-faceting cannot use x or y")}}S!=null&&(this.render=Hp(S,this.render))}initialize(t,n,r){let o=Mn(this.data);t===void 0&&o!=null&&(t=[rn(o)]);let i=t;this.transform!=null&&({facets:t,data:o}=this.transform(o,t,r),o=Mn(o)),t!==void 0&&(t.original=i);let a=pv(this.channels,o);return this.sort!=null&&hv(o,t,a,n,this.sort),{data:o,facets:t,channels:a}}filter(t,n,r){for(let o in n){let{filter:i=St}=n[o];if(i!==null){let a=r[o];t=t.filter(s=>i(a[s]))}}return t}project(t,n,r){for(let o in t)if(t[o].scale==="x"&&/^x|x$/.test(o)){let i=o.replace(/^x|x$/,"y");i in t&&t[i].scale==="y"&&hb(o,i,n,r.projection)}}scale(t,n,r){let o=mv(t,n);return r.projection&&this.project(t,o,r),o}};function Yp(...e){return e.plot=ye.prototype.plot,e}function Hp(e,t){if(e==null)return t===null?void 0:t;if(t==null)return e===null?void 0:e;if(typeof e!="function")throw new TypeError(`invalid render transform: ${e}`);if(typeof t!="function")throw new TypeError(`invalid render transform: ${t}`);return function(n,r,o,i,a,s){return e.call(this,n,r,o,i,a,(c,u,l,d,f)=>t.call(this,c,u,l,d,f,s))}}function vC(e){return Object.fromEntries(Object.entries(mp(e)).map(([t,n])=>(n=typeof n=="string"?{value:n,label:t}:Jn(n),n.filter===void 0&&n.scale==null&&(n={...n,filter:null}),[t,n])))}function bC(e){return e===!0?"xy":e===!1||e==null?null:typeof e=="string"?Je(e,"tip",["x","y","xy"]):e}function Wp(e,t){return e?.tip===!0?{...e,tip:t}:nn(e?.tip)&&e.tip.pointer===void 0?{...e,tip:{...e.tip,pointer:t}}:e}function Db(e,t,n={}){let r=.5-$e,o=.5+$e,i=.5+$e,a=.5-$e;for(let{marginTop:h,marginRight:y,marginBottom:b,marginLeft:g}of t)h>r&&(r=h),y>o&&(o=y),b>i&&(i=b),g>a&&(a=g);let{margin:s,marginTop:c=s!==void 0?s:r,marginRight:u=s!==void 0?s:o,marginBottom:l=s!==void 0?s:i,marginLeft:d=s!==void 0?s:a}=n;c=+c,u=+u,l=+l,d=+d;let{width:f=640,height:p=xC(e,n,{width:f,marginTopDefault:r,marginRightDefault:o,marginBottomDefault:i,marginLeftDefault:a})+Math.max(0,c-r+l-i)}=n;f=+f,p=+p;let m={width:f,height:p,marginTop:c,marginRight:u,marginBottom:l,marginLeft:d};if(e.fx||e.fy){let{margin:h,marginTop:y=h!==void 0?h:c,marginRight:b=h!==void 0?h:u,marginBottom:g=h!==void 0?h:l,marginLeft:w=h!==void 0?h:d}=n.facet??{};y=+y,b=+b,g=+g,w=+w,m.facet={marginTop:y,marginRight:b,marginBottom:g,marginLeft:w}}return m}function xC({x:e,y:t,fy:n,fx:r},{projection:o,aspectRatio:i},{width:a,marginTopDefault:s,marginRightDefault:c,marginBottomDefault:u,marginLeftDefault:l}){let d=n&&n.scale.domain().length||1,f=gb(o);if(f){let m=r?r.scale.domain().length:1,h=(1.1*d-.1)/(1.1*m-.1)*f,y=Math.max(.1,Math.min(10,h));return Math.round((a-l-c)*y+s+u)}let p=t?on(t)?t.scale.domain().length||1:Math.max(7,17/d):1;if(i!=null){if(i=+i,!(isFinite(i)&&i>0))throw new Error(`invalid aspectRatio: ${i}`);let m=_b("y",t)/(_b("x",e)*i),h=r?r.scale.bandwidth():1,y=n?n.scale.bandwidth():1,b=h*(a-l-c)-e.insetLeft-e.insetRight;return(m*b+t.insetTop+t.insetBottom)/y+s+u}return!!(t||n)*Math.max(1,Math.min(60,p*d))*20+!!r*30+60}function _b(e,t){if(!t)throw new Error(`aspectRatio requires ${e} scale`);let{type:n,domain:r}=t,o;switch(n){case"linear":case"utc":case"time":o=Number;break;case"pow":{let s=t.scale.exponent();o=c=>Math.pow(c,s);break}case"log":o=Math.log;break;case"point":case"band":return r.length;default:throw new Error(`unsupported ${e} scale for aspectRatio: ${n}`)}let[i,a]=et(r);return Math.abs(o(a)-o(i))}var Mb=new WeakMap;function Up(e,t,{x:n,y:r,px:o,py:i,maxRadius:a=40,channels:s,render:c,...u}={}){return a=+a,o!=null&&(n??(n=null),s={...s,px:{value:o,scale:"x"}}),i!=null&&(r??(r=null),s={...s,py:{value:i,scale:"y"}}),{x:n,y:r,channels:s,...u,render:Hp(function(l,d,f,p,m,h){m={...m,pointerSticky:!1};let y=m.ownerSVGElement,{data:b}=m.getMarkState(this),g=Mb.get(y);g||Mb.set(y,g={sticky:!1,roots:[],renders:[]});let w=g.renders.push(z)-1,{x:v,y:S,fx:x,fy:k}=d,T=x?x(l.fx)-p.marginLeft:0,_=k?k(l.fy)-p.marginTop:0;v?.bandwidth&&(T+=v.bandwidth()/2),S?.bandwidth&&(_+=S.bandwidth()/2);let I=l.fi!=null,D;if(I){let j=g.facetStates;j||(g.facetStates=j=new Map),D=j.get(this),D||j.set(this,D=new Map)}let[R,O]=sn(this,p),{px:A,py:C}=f,F=A?j=>A[j]:Gp(f,R),q=C?j=>C[j]:Kp(f,O),K,P,L,H;function V(j,ie){if(I)if(H&&(H=cancelAnimationFrame(H)),j==null)D.delete(l.fi);else{D.set(l.fi,ie),H=requestAnimationFrame(()=>{H=null;for(let[E,N]of D)if(N<ie||N===ie&&E<l.fi){j=null;break}z(j)});return}z(j)}function z(j){if(K===j&&L===g.sticky)return;K=j,L=m.pointerSticky=g.sticky;let ie=K==null?[]:[K];I&&(ie.fx=l.fx,ie.fy=l.fy,ie.fi=l.fi);let E=h(ie,d,f,p,m);if(P){if(I){let N=P.parentNode,G=P.getAttribute("transform"),M=E.getAttribute("transform");G?E.setAttribute("transform",G):E.removeAttribute("transform"),M?N.setAttribute("transform",M):N.removeAttribute("transform"),E.removeAttribute("aria-label"),E.removeAttribute("aria-description"),E.removeAttribute("aria-hidden")}P.replaceWith(E)}if(g.roots[w]=P=E,!(K==null&&D?.size>1)){let N=K==null?null:Xn(b)?b[K]:b.get(K);m.dispatchValue(N)}return E}function ee(j){if(g.sticky||j.pointerType==="mouse"&&j.buttons===1)return;let[ie,E]=Pu(j);ie-=T,E-=_;let N=ie<p.marginLeft||ie>p.width-p.marginRight?1:e,G=E<p.marginTop||E>p.height-p.marginBottom?1:t,M=null,ue=a*a;for(let Z of l){let pe=N*(F(Z)-ie),Se=G*(q(Z)-E),ot=pe*pe+Se*Se;ot<=ue&&(M=Z,ue=ot)}if(M!=null&&(e!==1||t!==1)){let Z=F(M)-ie,pe=q(M)-E;ue=Z*Z+pe*pe}V(M,ue)}function te(j){j.pointerType==="mouse"&&K!=null&&(g.sticky&&g.roots.some(ie=>ie?.contains(j.target))||(g.sticky?(g.sticky=!1,g.renders.forEach(ie=>ie(null))):(g.sticky=!0,z(K)),j.stopImmediatePropagation()))}function ne(j){j.pointerType==="mouse"&&(g.sticky||V(null))}return y.addEventListener("pointerenter",ee),y.addEventListener("pointermove",ee),y.addEventListener("pointerdown",te),y.addEventListener("pointerleave",ne),z(null)},c)}}function Rb(e){return Up(1,1,e)}function Eb(e){return Up(1,.01,e)}function Vp(e){return Up(.01,1,e)}function Gp({x1:e,x2:t,x:n=e},r){return e&&t?o=>(e[o]+t[o])/2:n?o=>n[o]:()=>r}function Kp({y1:e,y2:t,y:n=e},r){return e&&t?o=>(e[o]+t[o])/2:n?o=>n[o]:()=>r}function Xl(e){return on(e)&&e.interval===void 0?void 0:"tabular-nums"}function Ib(e,t){let{label:n=e.label,tickSize:r=6,width:o=240,height:i=44+r,marginTop:a=18,marginRight:s=0,marginBottom:c=16+r,marginLeft:u=0,style:l,ticks:d=(o-u-s)/64,tickFormat:f,fontVariant:p=Xl(e),round:m=!0,opacity:h,className:y}=t,b=Ho(t);y=Wo(y),h=we(h)[1],f===null&&(f=()=>null);let g=ae("svg",b).attr("class",`${y}-ramp`).attr("font-family","system-ui, sans-serif").attr("font-size",10).attr("width",o).attr("height",i).attr("viewBox",`0 0 ${o} ${i}`).call(R=>R.append("style").text(`:where(.${y}-ramp) {
  display: block;
  height: auto;
  height: intrinsic;
  max-width: 100%;
  overflow: visible;
}
:where(.${y}-ramp text) {
  white-space: pre;
}`)).call(Uo,l),w=R=>R.selectAll(".tick line").attr("y1",a+c-i),v,S=m?(R,O)=>R.rangeRound(O):(R,O)=>R.range(O),{type:x,domain:k,range:T,interpolate:_,scale:I,pivot:D}=e;if(_){let R=T===void 0?_:jt(_.length===1?Ma(_):_,T);v=S(I.copy(),We(me(u,o-s),Math.min(k.length+(D!==void 0),T===void 0?1/0:T.length)));let O=256,A=b.document.createElement("canvas");A.width=O,A.height=1;let C=A.getContext("2d");for(let F=0,q=O-1;F<O;++F)C.fillStyle=R(F/q),C.fillRect(F,0,1,1);g.append("image").attr("opacity",h).attr("x",u).attr("y",a).attr("width",o-u-s).attr("height",i-a-c).attr("preserveAspectRatio","none").attr("xlink:href",A.toDataURL())}else if(x==="threshold"){let R=k,O=f===void 0?A=>A:typeof f=="string"?gt(f):f;v=S(kr().domain([-1,T.length-1]),[u,o-s]),g.append("g").attr("fill-opacity",h).selectAll().data(T).enter().append("rect").attr("x",(A,C)=>v(C-1)).attr("y",a).attr("width",(A,C)=>v(C)-v(C-1)).attr("height",i-a-c).attr("fill",A=>A),d=ve(R,(A,C)=>C),f=A=>O(R[A],A)}else v=S(Yn().domain(k),[u,o-s]),g.append("g").attr("fill-opacity",h).selectAll().data(k).enter().append("rect").attr("x",v).attr("y",a).attr("width",Math.max(0,v.bandwidth()-1)).attr("height",i-a-c).attr("fill",I),w=()=>{};return g.append("g").attr("transform",`translate(0,${i-c})`).call(Mu(v).ticks(Array.isArray(d)?null:d,typeof f=="string"?f:void 0).tickFormat(typeof f=="function"?f:void 0).tickSize(r).tickValues(Array.isArray(d)?d:null)).attr("font-size",null).attr("font-family",null).attr("font-variant",ke(p,"normal")).call(w).call(R=>R.select(".domain").remove()),n!==void 0&&g.append("text").attr("x",u).attr("y",a-6).attr("fill","currentColor").attr("font-weight","bold").text(n),g.node()}var Xp=Math.PI/180;function Ia(e,{marker:t,markerStart:n=t,markerMid:r=t,markerEnd:o=t}={}){e.markerStart=Qp(n),e.markerMid=Qp(r),e.markerEnd=Qp(o)}function Qp(e){if(e==null||e===!1)return null;if(e===!0)return Pb;if(typeof e=="function")return e;switch(`${e}`.toLowerCase()){case"none":return null;case"arrow":return qb("auto");case"arrow-reverse":return qb("auto-start-reverse");case"dot":return wC;case"circle":case"circle-fill":return Pb;case"circle-stroke":return kC;case"tick":return Zp("auto");case"tick-x":return Zp(90);case"tick-y":return Zp(0)}throw new Error(`invalid marker: ${e}`)}function qb(e){return(t,n)=>ae("svg:marker",n).attr("viewBox","-5 -5 10 10").attr("markerWidth",6.67).attr("markerHeight",6.67).attr("orient",e).attr("fill","none").attr("stroke",t).attr("stroke-width",1.5).attr("stroke-linecap","round").attr("stroke-linejoin","round").call(r=>r.append("path").attr("d","M-1.5,-3l3,3l-3,3")).node()}function wC(e,t){return ae("svg:marker",t).attr("viewBox","-5 -5 10 10").attr("markerWidth",6.67).attr("markerHeight",6.67).attr("fill",e).attr("stroke","none").call(n=>n.append("circle").attr("r",2.5)).node()}function Pb(e,t){return ae("svg:marker",t).attr("viewBox","-5 -5 10 10").attr("markerWidth",6.67).attr("markerHeight",6.67).attr("fill",e).attr("stroke","var(--plot-background)").attr("stroke-width",1.5).call(n=>n.append("circle").attr("r",3)).node()}function kC(e,t){return ae("svg:marker",t).attr("viewBox","-5 -5 10 10").attr("markerWidth",6.67).attr("markerHeight",6.67).attr("fill","var(--plot-background)").attr("stroke",e).attr("stroke-width",1.5).call(n=>n.append("circle").attr("r",3)).node()}function Zp(e){return(t,n)=>ae("svg:marker",n).attr("viewBox","-3 -3 6 6").attr("markerWidth",6).attr("markerHeight",6).attr("orient",e).attr("stroke",t).call(r=>r.append("path").attr("d","M0,-3v6")).node()}var SC=0;function em(e,t,{stroke:n},r){return Lb(e,t,n&&(o=>n[o]),null,r)}function Bb(e,t,{stroke:n,z:r},o){return Lb(e,t,n&&(([i])=>n[i]),r,o)}var Jp=1,Ab=2;function TC(e,t){let n=new Uint8Array(t.length),r=e.data().filter(i=>i.length>1),o=r.length;for(let i=0,a=Gl;i<o;++i){let s=r[i];if(s.length>1){let c=s[0];a!==(a=Tt(t[c]))&&(n[c]|=Jp)}}for(let i=o-1,a=Gl;i>=0;--i){let s=r[i];if(s.length>1){let c=s[0];a!==(a=Tt(t[c]))&&(n[c]|=Ab)}}return([i])=>n[i]}function Lb(e,{markerStart:t,markerMid:n,markerEnd:r,stroke:o},i=()=>o,a,s){if(!t&&!n&&!r)return;let c=new Map,u=a&&TC(e,a);function l(d,f,p){return function(m){if(p&&!p(m))return;let h=i(m),y=c.get(f);y||c.set(f,y=new Map);let b=y.get(h);if(!b){let g=this.parentNode.insertBefore(f(h,s),this),w=`plot-marker-${++SC}`;g.setAttribute("id",w),y.set(h,b=`url(#${w})`)}this.setAttribute(d,b)}}t&&e.each(l("marker-start",t,u&&(d=>u(d)&Jp))),n&&u&&e.each(l("marker-start",n,d=>!(u(d)&Jp))),n&&e.each(l("marker-mid",n)),r&&e.each(l("marker-end",r,u&&(d=>u(d)&Ab)))}function Ql({inset:e,insetLeft:t,insetRight:n,...r}={}){return[t,n]=Fb(e,t,n),{inset:e,insetLeft:t,insetRight:n,...r}}function Zl({inset:e,insetTop:t,insetBottom:n,...r}={}){return[t,n]=Fb(e,t,n),{inset:e,insetTop:t,insetBottom:n,...r}}function Fb(e,t,n){return e===void 0&&t===void 0&&n===void 0?$e?[1,0]:[.5,.5]:[t,n]}function Ob(e,{interval:t}){return e={...Jn(e)},e.interval=Bl(e.interval===void 0?t:e.interval),e}function Jl(e,t,n,r){let{[e]:o,[`${e}1`]:i,[`${e}2`]:a}=n,{value:s,interval:c}=Ob(o,n);if(s==null||c==null&&!r)return n;let u=Ar(o);if(c==null){let p,m={transform:h=>p||(p=lt(h,s)),label:u};return{...n,[e]:void 0,[`${e}1`]:i===void 0?m:i,[`${e}2`]:a===void 0&&!(i===a&&r)?m:a}}let l,d;function f(p){return d!==void 0&&p===l?d:d=ve(lt(l=p,s),m=>c.floor(m))}return t({...n,[e]:void 0,[`${e}1`]:i===void 0?{transform:f,label:u}:i,[`${e}2`]:a===void 0?{transform:p=>f(p).map(m=>c.offset(m)),label:u}:a})}function Nb(e,t,n){let{[e]:r}=n,{value:o,interval:i}=Ob(r,n);return o==null||i==null?n:t({...n,[e]:{label:Ar(r),transform:a=>{let s=ve(lt(a,o),u=>i.floor(u)),c=s.map(u=>i.offset(u));return s.map(Ke(s)?(u,l)=>u==null||isNaN(u=+u)||(l=c[l],l==null)||isNaN(l=+l)?void 0:new Date((u+l)/2):(u,l)=>u==null||(l=c[l],l==null)?NaN:(+u+ +l)/2)}}})}function jb(e={}){return Jl("x",Ql,e,!0)}function $b(e={}){return Jl("y",Zl,e,!0)}function zb(e={}){return Jl("x",Ql,e)}function Yb(e={}){return Jl("y",Zl,e)}function Hb(e={}){return Nb("x",Ql,e)}function Wb(e={}){return Nb("y",Zl,e)}var Ub={ariaLabel:"rule",fill:null,stroke:"currentColor"},eu=class extends ye{constructor(t,n={}){let{x:r,y1:o,y2:i,inset:a=0,insetTop:s=a,insetBottom:c=a}=n;super(t,{x:{value:r,scale:"x",optional:!0},y1:{value:o,scale:"y",optional:!0},y2:{value:i,scale:"y",optional:!0}},Wp(n,"x"),Ub),this.insetTop=Ce(s),this.insetBottom=Ce(c),Ia(this,n)}render(t,n,r,o,i){let{x:a,y:s}=n,{x:c,y1:u,y2:l}=r,{width:d,height:f,marginTop:p,marginRight:m,marginLeft:h,marginBottom:y}=o,{insetTop:b,insetBottom:g}=this;return ae("svg:g",i).call(ze,this,o,i).call(Ye,this,{x:c&&a},$e,0).call(w=>w.selectAll().data(t).enter().append("line").call(Fe,this).attr("x1",c?v=>c[v]:(h+d-m)/2).attr("x2",c?v=>c[v]:(h+d-m)/2).attr("y1",u&&!tr(s)?v=>u[v]+b:p+b).attr("y2",l&&!tr(s)?s.bandwidth?v=>l[v]+s.bandwidth()-g:v=>l[v]-g:f-y-g).call(rt,this,r).call(em,this,r,i)).node()}},tu=class extends ye{constructor(t,n={}){let{x1:r,x2:o,y:i,inset:a=0,insetRight:s=a,insetLeft:c=a}=n;super(t,{y:{value:i,scale:"y",optional:!0},x1:{value:r,scale:"x",optional:!0},x2:{value:o,scale:"x",optional:!0}},Wp(n,"y"),Ub),this.insetRight=Ce(s),this.insetLeft=Ce(c),Ia(this,n)}render(t,n,r,o,i){let{x:a,y:s}=n,{y:c,x1:u,x2:l}=r,{width:d,height:f,marginTop:p,marginRight:m,marginLeft:h,marginBottom:y}=o,{insetLeft:b,insetRight:g}=this;return ae("svg:g",i).call(ze,this,o,i).call(Ye,this,{y:c&&s},0,$e).call(w=>w.selectAll().data(t).enter().append("line").call(Fe,this).attr("x1",u&&!tr(a)?v=>u[v]+b:h+b).attr("x2",l&&!tr(a)?a.bandwidth?v=>l[v]+a.bandwidth()-g:v=>l[v]-g:d-m-g).attr("y1",c?v=>c[v]:(p+f-y)/2).attr("y2",c?v=>c[v]:(p+f-y)/2).call(rt,this,r).call(em,this,r,i)).node()}};function tm(e,t){let{x:n=Be,y:r,y1:o,y2:i,...a}=Yb(t);return[o,i]=Vb(r,o,i),new eu(e,{...a,x:n,y1:o,y2:i})}function qa(e,t){let{y:n=Be,x:r,x1:o,x2:i,...a}=zb(t);return[o,i]=Vb(r,o,i),new tu(e,{...a,y:n,x1:o,x2:i})}function Vb(e,t,n){if(e==null){if(t===void 0){if(n!==void 0)return[0,n]}else if(n===void 0)return[0,t]}else{if(t===void 0)return n===void 0?[0,e]:[e,n];if(n===void 0)return[e,t]}return[t,n]}function Vo(e,...t){let n=t.length;for(let r=0,o=!0;r<n;++r)typeof t[r]!="function"&&(o&&(e=e.slice(),o=!1),e.splice(r,2,e[r]+t[r]+e[r+1]),t.splice(r,1),--r,--n);return r=>{let o=e[0];for(let i=0;i<n;++i)o+=t[i](r)+e[i+1];return o}}var CC={ariaLabel:"text",strokeLinejoin:"round",strokeWidth:3,paintOrder:"stroke"},Zb="\xAD",Go=class extends ye{constructor(t,n={}){let{x:r,y:o,text:i=Ct(t)&&Al(t)?Be:Il,frameAnchor:a,textAnchor:s=/right$/i.test(a)?"end":/left$/i.test(a)?"start":"middle",lineAnchor:c=/^top/i.test(a)?"top":/^bottom/i.test(a)?"bottom":"middle",lineHeight:u=1,lineWidth:l=1/0,textOverflow:d,monospace:f,fontFamily:p=f?"ui-monospace, monospace":void 0,fontSize:m,fontStyle:h,fontVariant:y,fontWeight:b,rotate:g}=n,[w,v]=we(g,0),[S,x]=RC(m);if(super(t,{x:{value:r,scale:"x",optional:!0},y:{value:o,scale:"y",optional:!0},fontSize:{value:S,optional:!0},rotate:{value:W0(w),optional:!0},text:{value:i,filter:Sa,optional:!0}},n,CC),this.rotate=v,this.textAnchor=ke(s,"middle"),this.lineAnchor=Je(c,"lineAnchor",["top","middle","bottom"]),this.lineHeight=+u,this.lineWidth=+l,this.textOverflow=rm(d),this.monospace=!!f,this.fontFamily=Te(p),this.fontSize=x,this.fontStyle=Te(h),this.fontVariant=Te(y),this.fontWeight=Te(b),this.frameAnchor=er(a),!(this.lineWidth>=0))throw new Error(`invalid lineWidth: ${l}`);this.splitLines=sm(this),this.clipLine=cm(this)}render(t,n,r,o,i){let{x:a,y:s}=n,{x:c,y:u,rotate:l,text:d,title:f,fontSize:p}=r,{rotate:m}=this,[h,y]=sn(this,o);return ae("svg:g",i).call(ze,this,o,i).call(am,this,d,o).call(Ye,this,{x:c&&a,y:u&&s}).call(b=>b.selectAll().data(t).enter().append("text").call(Fe,this).call(_C,this,d,f).attr("transform",Vo`translate(${c?g=>c[g]:h},${u?g=>u[g]:y})${l?g=>` rotate(${l[g]})`:m?` rotate(${m})`:""}`).call(Q,"font-size",p&&(g=>p[g])).call(rt,this,r)).node()}};function rm(e){return e==null?null:Je(e,"textOverflow",["clip","ellipsis","clip-start","clip-end","ellipsis-start","ellipsis-middle","ellipsis-end"]).replace(/^(clip|ellipsis)$/,"$1-end")}function _C(e,t,n,r){if(!n)return;let{lineAnchor:o,lineHeight:i,textOverflow:a,splitLines:s,clipLine:c}=t;e.each(function(u){let l=s(an(n[u])??"").map(c),d=l.length,f=o==="top"?.71:o==="bottom"?1-d:(164-d*100)/200;if(d>1){let p=0;for(let m=0;m<d;++m){if(++p,!l[m])continue;let h=this.ownerDocument.createElementNS(Lt.svg,"tspan");h.setAttribute("x",0),m===p-1?h.setAttribute("y",`${(f+m)*i}em`):h.setAttribute("dy",`${p*i}em`),h.textContent=l[m],this.appendChild(h),p=0}}else f&&this.setAttribute("y",`${f*i}em`),this.textContent=l[0];if(a&&!r&&l[0]!==n[u]){let p=this.ownerDocument.createElementNS(Lt.svg,"title");p.textContent=n[u],this.appendChild(p)}})}function rr(e,{x:t,y:n,...r}={}){return r.frameAnchor===void 0&&([t,n]=Rn(t,n)),new Go(e,{...r,x:t,y:n})}function om(e,{x:t=Be,...n}={}){return new Go(e,Wb({...n,x:t}))}function im(e,{y:t=Be,...n}={}){return new Go(e,Hb({...n,y:t}))}function am(e,t,n){Q(e,"text-anchor",t.textAnchor),Q(e,"font-family",t.fontFamily),Q(e,"font-size",t.fontSize),Q(e,"font-style",t.fontStyle),Q(e,"font-variant",t.fontVariant===void 0?DC(n):t.fontVariant),Q(e,"font-weight",t.fontWeight)}function DC(e){return e&&(G0(e)||Ke(e))?"tabular-nums":void 0}var MC=new Set(["inherit","initial","revert","unset","xx-small","x-small","small","medium","large","x-large","xx-large","xxx-large","larger","smaller"]);function RC(e){return e==null||typeof e=="number"?[void 0,e]:typeof e!="string"?[e,void 0]:(e=e.trim().toLowerCase(),MC.has(e)||/^[+-]?\d*\.?\d+(e[+-]?\d+)?(\w*|%)$/.test(e)?[void 0,e]:[e,void 0])}function EC(e,t,n){let r=[],o,i=0;for(let[a,s,c]of IC(e)){if(o===void 0&&(o=a),i>o&&n(e,o,s)>t&&(r.push(e.slice(o,i)+(e[i-1]===Zb?"-":"")),o=a),c){r.push(e.slice(o,s)),o=void 0;continue}i=s}return r}function*IC(e){let t=0,n=0,r=e.length;for(;n<r;){let o=1;switch(e[n]){case Zb:case"-":++n,yield[t,n,!1],t=n;break;case" ":for(yield[t,n,!1];e[++n]===" ";);t=n;break;case"\r":e[n+1]===`
`&&++o;case`
`:yield[t,n,!0],n+=o,t=n;break;default:++n;break}}yield[t,n,!0]}var Gb={a:56,b:63,c:57,d:63,e:58,f:37,g:62,h:60,i:26,j:26,k:55,l:26,m:88,n:60,o:60,p:62,q:62,r:39,s:54,t:38,u:60,v:55,w:79,x:54,y:55,z:55,A:69,B:67,C:73,D:74,E:61,F:58,G:76,H:75,I:28,J:55,K:67,L:58,M:89,N:75,O:78,P:65,Q:78,R:67,S:65,T:65,U:75,V:69,W:98,X:69,Y:67,Z:67,0:64,1:48,2:62,3:64,4:66,5:63,6:65,7:58,8:65,9:65," ":29,"!":32,'"':49,"'":31,"(":39,")":39,",":31,"-":48,".":31,"/":32,":":31,";":31,"?":52,"\u2018":31,"\u2019":31,"\u201C":47,"\u201D":47,"\u2026":82};function nu(e,t=0,n=e.length){let r=0;for(let o=t;o<n;o=Ko(e,o))r+=Gb[e[o]]??(ex(e,o)?120:Gb.e);return r}function ru(e,t=0,n=e.length){let r=0;for(let o=t;o<n;o=Ko(e,o))r+=ex(e,o)?126:63;return r}function sm({monospace:e,lineWidth:t,textOverflow:n}){if(n!=null||t==1/0)return i=>i.split(/\r\n?|\n/g);let r=e?ru:nu,o=t*100;return i=>EC(i,o,r)}function cm({monospace:e,lineWidth:t,textOverflow:n}){if(n==null||t==1/0)return i=>i;let r=e?ru:nu,o=t*100;switch(n){case"clip-start":return i=>Xb(i,o,r,"");case"clip-end":return i=>Kb(i,o,r,"");case"ellipsis-start":return i=>Xb(i,o,r,jr);case"ellipsis-middle":return i=>qC(i,o,r,jr);case"ellipsis-end":return i=>Kb(i,o,r,jr)}}var jr="\u2026";function $r(e,t,n,r){let o=[],i=0;for(let a=0,s=0,c=e.length;a<c;a=s){s=Ko(e,a);let u=n(e,a,s);if(i+u>t){for(i+=r;i>t&&a>0;)s=a,a=o.pop(),i-=n(e,a,s);return[a,t-i]}i+=u,o.push(a)}return[-1,0]}function Kb(e,t,n,r){e=e.trim();let o=n(r),[i]=$r(e,t,n,o);return i<0?e:e.slice(0,i).trimEnd()+r}function qC(e,t,n,r){e=e.trim();let o=n(e);if(o<=t)return e;let i=n(r)/2,[a,s]=$r(e,t/2,n,i),[c]=$r(e,o-t/2-s+i,n,-i);return c<0?r:e.slice(0,a).trimEnd()+r+e.slice(Ko(e,c)).trimStart()}function Xb(e,t,n,r){e=e.trim();let o=n(e);if(o<=t)return e;let i=n(r),[a]=$r(e,o-t+i,n,-i);return a<0?r:r+e.slice(Ko(e,a)).trimStart()}var nm=/[\p{Combining_Mark}\p{Emoji_Modifier}]+/uy,Qb=/\p{Extended_Pictographic}/uy;function Ko(e,t){return t+=PC(e,t)?2:1,AC(e,t)&&(t=nm.lastIndex),BC(e,t)?Ko(e,t+1):t}function Jb(e,t){return e.charCodeAt(t)<128}function PC(e,t){let n=e.charCodeAt(t);if(n>=55296&&n<56320){let r=e.charCodeAt(t+1);return r>=56320&&r<57344}return!1}function BC(e,t){return e.charCodeAt(t)===8205}function AC(e,t){return Jb(e,t)?!1:(nm.lastIndex=t,nm.test(e))}function ex(e,t){return Jb(e,t)?!1:(Qb.lastIndex=t,Qb.test(e))}var LC={ariaLabel:"vector",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinejoin:"round",strokeLinecap:"round"},tx=3.5,FC=tx*5,nx={draw(e,t,n){let r=t*n/FC;e.moveTo(0,0),e.lineTo(0,-t),e.moveTo(-r,r-t),e.lineTo(0,-t),e.lineTo(r,r-t)}},OC={draw(e,t,n){e.moveTo(-n,0),e.lineTo(0,-t),e.lineTo(n,0)}},NC=new Map([["arrow",nx],["spike",OC]]);function jC(e){return e&&typeof e.draw=="function"}function $C(e){if(jC(e))return e;let t=NC.get(`${e}`.toLowerCase());if(t)return t;throw new Error(`invalid shape: ${e}`)}var ou=class extends ye{constructor(t,n={}){let{x:r,y:o,r:i=tx,length:a,rotate:s,shape:c=nx,anchor:u="middle",frameAnchor:l}=n,[d,f]=we(a,12),[p,m]=we(s,0);super(t,{x:{value:r,scale:"x",optional:!0},y:{value:o,scale:"y",optional:!0},length:{value:d,scale:"length",optional:!0},rotate:{value:p,optional:!0}},n,LC),this.r=+i,this.length=f,this.rotate=m,this.shape=$C(c),this.anchor=Je(u,"anchor",["start","middle","end"]),this.frameAnchor=er(l)}render(t,n,r,o,i){let{x:a,y:s}=n,{x:c,y:u,length:l,rotate:d}=r,{length:f,rotate:p,anchor:m,shape:h,r:y}=this,[b,g]=sn(this,o);return ae("svg:g",i).call(ze,this,o,i).call(Ye,this,{x:c&&a,y:u&&s}).call(w=>w.selectAll().data(t).enter().append("path").call(Fe,this).attr("transform",Vo`translate(${c?v=>c[v]:b},${u?v=>u[v]:g})${d?v=>` rotate(${d[v]})`:p?` rotate(${p})`:""}${m==="start"?"":m==="end"?l?v=>` translate(0,${l[v]})`:` translate(0,${f})`:l?v=>` translate(0,${l[v]/2})`:` translate(0,${f/2})`}`).attr("d",l?v=>{let S=It();return h.draw(S,l[v],y),S}:(()=>{let v=It();return h.draw(v,f,y),v})()).call(rt,this,r)).node()}};function rx(e,t={}){let{x:n=Be,...r}=t;return new ou(e,{...r,x:n})}function ox(e,t={}){let{y:n=Be,...r}=t;return new ou(e,{...r,y:n})}function or(e,t){return arguments.length<2&&!Ct(e)&&(t=e,e=null),t===void 0&&(t={}),[e,t]}function iu({anchor:e}={},t){return e===void 0?t[0]:Je(e,"anchor",t)}function ix(e){return iu(e,["left","right"])}function ax(e){return iu(e,["right","left"])}function sx(e){return iu(e,["bottom","top"])}function cx(e){return iu(e,["top","bottom"])}function um(){let[e,t]=or(...arguments);return fx("y",ix(t),e,t)}function lx(){let[e,t]=or(...arguments);return fx("fy",ax(t),e,t)}function fm(){let[e,t]=or(...arguments);return dx("x",sx(t),e,t)}function ux(){let[e,t]=or(...arguments);return dx("fx",cx(t),e,t)}function fx(e,t,n,{color:r="currentColor",opacity:o=1,stroke:i=r,strokeOpacity:a=o,strokeWidth:s=1,fill:c=r,fillOpacity:u=o,textAnchor:l,textStroke:d,textStrokeOpacity:f,textStrokeWidth:p,tickSize:m=e==="y"?6:0,tickPadding:h,tickRotate:y,x:b,margin:g,marginTop:w=g===void 0?20:g,marginRight:v=g===void 0?t==="right"?40:0:g,marginBottom:S=g===void 0?20:g,marginLeft:x=g===void 0?t==="left"?40:0:g,label:k,labelAnchor:T,labelArrow:_,labelOffset:I,ariaLabel:D=`${e}-axis`,...R}){return m=Ce(m),h=Ce(h),y=Ce(y),T!==void 0&&(T=Je(T,"labelAnchor",["center","top","bottom"])),_=Tx(_),Yp(m&&!Ae(i)?zC(e,t,n,{stroke:i,strokeOpacity:a,strokeWidth:s,tickSize:m,tickPadding:h,tickRotate:y,x:b,ariaLabel:D,...R}):null,Ae(c)?null:HC(e,t,n,{fill:c,fillOpacity:u,stroke:d,strokeOpacity:f,strokeWidth:p,textAnchor:l,tickSize:m,tickPadding:h,tickRotate:y,x:b,marginTop:w,marginRight:v,marginBottom:S,marginLeft:x,ariaLabel:D,...R}),!Ae(c)&&k!==null?rr([],xx({fill:c,fillOpacity:u,...R},function(O,A,C,F,q){let K=F[e],{marginTop:P,marginRight:L,marginBottom:H,marginLeft:V}=e==="y"&&q.inset||q,z=T??(K.bandwidth?"center":"top"),ee=I??(t==="right"?L:V)-3;return z==="center"?(this.textAnchor=void 0,this.lineAnchor=t==="right"?"bottom":"top",this.frameAnchor=t,this.rotate=-90):(this.textAnchor=t==="right"?"end":"start",this.lineAnchor=z,this.frameAnchor=`${z}-${t}`,this.rotate=0),this.dy=z==="top"?3-P:z==="bottom"?H-3:0,this.dx=t==="right"?ee:-ee,this.ariaLabel=`${D} label`,{facets:[[0]],channels:{text:{value:[Sx(e,K,{anchor:t,label:k,labelAnchor:z,labelArrow:_})]}}}})):null)}function dx(e,t,n,{color:r="currentColor",opacity:o=1,stroke:i=r,strokeOpacity:a=o,strokeWidth:s=1,fill:c=r,fillOpacity:u=o,textAnchor:l,textStroke:d,textStrokeOpacity:f,textStrokeWidth:p,tickSize:m=e==="x"?6:0,tickPadding:h,tickRotate:y,y:b,margin:g,marginTop:w=g===void 0?t==="top"?30:0:g,marginRight:v=g===void 0?20:g,marginBottom:S=g===void 0?t==="bottom"?30:0:g,marginLeft:x=g===void 0?20:g,label:k,labelAnchor:T,labelArrow:_,labelOffset:I,ariaLabel:D=`${e}-axis`,...R}){return m=Ce(m),h=Ce(h),y=Ce(y),T!==void 0&&(T=Je(T,"labelAnchor",["center","left","right"])),_=Tx(_),Yp(m&&!Ae(i)?YC(e,t,n,{stroke:i,strokeOpacity:a,strokeWidth:s,tickSize:m,tickPadding:h,tickRotate:y,y:b,ariaLabel:D,...R}):null,Ae(c)?null:WC(e,t,n,{fill:c,fillOpacity:u,stroke:d,strokeOpacity:f,strokeWidth:p,textAnchor:l,tickSize:m,tickPadding:h,tickRotate:y,y:b,marginTop:w,marginRight:v,marginBottom:S,marginLeft:x,ariaLabel:D,...R}),!Ae(c)&&k!==null?rr([],xx({fill:c,fillOpacity:u,...R},function(O,A,C,F,q){let K=F[e],{marginTop:P,marginRight:L,marginBottom:H,marginLeft:V}=e==="x"&&q.inset||q,z=T??(K.bandwidth?"center":"right"),ee=I??(t==="top"?P:H)-3;return z==="center"?(this.frameAnchor=t,this.textAnchor=void 0):(this.frameAnchor=`${t}-${z}`,this.textAnchor=z==="right"?"end":"start"),this.lineAnchor=t,this.dy=t==="top"?-ee:ee,this.dx=z==="right"?L-3:z==="left"?3-V:0,this.ariaLabel=`${D} label`,{facets:[[0]],channels:{text:{value:[Sx(e,K,{anchor:t,label:k,labelAnchor:z,labelArrow:_})]}}}})):null)}function zC(e,t,n,{strokeWidth:r=1,strokeLinecap:o=null,strokeLinejoin:i=null,facetAnchor:a=t+(e==="y"?"-empty":""),frameAnchor:s=t,tickSize:c,inset:u=0,insetLeft:l=u,insetRight:d=u,dx:f=0,y:p=e==="y"?void 0:null,ariaLabel:m,...h}){return Xo(ox,e,n,{ariaLabel:`${m} tick`,ariaHidden:!0},{strokeWidth:r,strokeLinecap:o,strokeLinejoin:i,facetAnchor:a,frameAnchor:s,y:p,...h,dx:t==="left"?+f-$e+ +l:+f+$e-d,anchor:"start",length:c,shape:t==="left"?KC:XC})}function YC(e,t,n,{strokeWidth:r=1,strokeLinecap:o=null,strokeLinejoin:i=null,facetAnchor:a=t+(e==="x"?"-empty":""),frameAnchor:s=t,tickSize:c,inset:u=0,insetTop:l=u,insetBottom:d=u,dy:f=0,x:p=e==="x"?void 0:null,ariaLabel:m,...h}){return Xo(rx,e,n,{ariaLabel:`${m} tick`,ariaHidden:!0},{strokeWidth:r,strokeLinejoin:i,strokeLinecap:o,facetAnchor:a,frameAnchor:s,x:p,...h,dy:t==="bottom"?+f-$e-d:+f+$e+ +l,anchor:"start",length:c,shape:t==="bottom"?VC:GC})}function HC(e,t,n,{facetAnchor:r=t+(e==="y"?"-empty":""),frameAnchor:o=t,tickSize:i,tickRotate:a=0,tickPadding:s=Math.max(3,9-i)+(Math.abs(a)>60?4*Math.cos(a*Xp):0),text:c,textAnchor:u=Math.abs(a)>60?"middle":t==="left"?"end":"start",lineAnchor:l=a>60?"top":a<-60?"bottom":"middle",fontVariant:d,inset:f=0,insetLeft:p=f,insetRight:m=f,dx:h=0,ariaLabel:y,y:b=e==="y"?void 0:null,...g}){return Xo(im,e,n,{ariaLabel:`${y} tick label`},{facetAnchor:r,frameAnchor:o,text:c,textAnchor:u,lineAnchor:l,fontVariant:d,rotate:a,y:b,...g,dx:t==="left"?+h-i-s+ +p:+h+ +i+ +s-m},function(w,v,S,x,k){d===void 0&&(this.fontVariant=kx(w)),c===void 0&&(k.text=wx(w,v,S,x,t))})}function WC(e,t,n,{facetAnchor:r=t+(e==="x"?"-empty":""),frameAnchor:o=t,tickSize:i,tickRotate:a=0,tickPadding:s=Math.max(3,9-i)+(Math.abs(a)>=10?4*Math.cos(a*Xp):0),text:c,textAnchor:u=Math.abs(a)>=10?a<0^t==="bottom"?"start":"end":"middle",lineAnchor:l=Math.abs(a)>=10?"middle":t==="bottom"?"top":"bottom",fontVariant:d,inset:f=0,insetTop:p=f,insetBottom:m=f,dy:h=0,x:y=e==="x"?void 0:null,ariaLabel:b,...g}){return Xo(om,e,n,{ariaLabel:`${b} tick label`},{facetAnchor:r,frameAnchor:o,text:c===void 0?null:c,textAnchor:u,lineAnchor:l,fontVariant:d,rotate:a,x:y,...g,dy:t==="bottom"?+h+ +i+ +s-m:+h-i-s+ +p},function(w,v,S,x,k){d===void 0&&(this.fontVariant=kx(w)),c===void 0&&(k.text=wx(w,v,S,x,t))})}function px(){let[e,t]=or(...arguments);return gx("y",ix(t),e,t)}function mx(){let[e,t]=or(...arguments);return gx("fy",ax(t),e,t)}function hx(){let[e,t]=or(...arguments);return vx("x",sx(t),e,t)}function yx(){let[e,t]=or(...arguments);return vx("fx",cx(t),e,t)}function gx(e,t,n,{y:r=e==="y"?void 0:null,x:o=null,x1:i=t==="left"?o:null,x2:a=t==="right"?o:null,ariaLabel:s=`${e}-grid`,ariaHidden:c=!0,...u}){return Xo(qa,e,n,{ariaLabel:s,ariaHidden:c},{y:r,x1:i,x2:a,...bx(u)})}function vx(e,t,n,{x:r=e==="x"?void 0:null,y:o=null,y1:i=t==="top"?o:null,y2:a=t==="bottom"?o:null,ariaLabel:s=`${e}-grid`,ariaHidden:c=!0,...u}){return Xo(tm,e,n,{ariaLabel:s,ariaHidden:c},{x:r,y1:i,y2:a,...bx(u)})}function bx({color:e="currentColor",opacity:t=.1,stroke:n=e,strokeOpacity:r=t,strokeWidth:o=1,...i}){return{stroke:n,strokeOpacity:r,strokeWidth:o,...i}}function xx({fill:e,fillOpacity:t,fontFamily:n,fontSize:r,fontStyle:o,fontVariant:i,fontWeight:a,monospace:s,pointerEvents:c,shapeRendering:u,clip:l=!1},d){return[,e]=en(e),[,t]=we(t),{facet:"super",x:null,y:null,fill:e,fillOpacity:t,fontFamily:n,fontSize:r,fontStyle:o,fontVariant:i,fontWeight:a,monospace:s,pointerEvents:c,shapeRendering:u,clip:l,initializer:d}}function Xo(e,t,n,r,o,i){let a;function s(l,d,f,p,m,h){let y=l==null&&(t==="fx"||t==="fy"),{[t]:b}=p;if(!b)throw new Error(`missing scale: ${t}`);let g=b.domain(),{interval:w,ticks:v,tickFormat:S,tickSpacing:x=t==="x"?80:35}=o;if(typeof v=="string"&&Cx(b)&&(w=v,v=void 0),v===void 0&&(v=Zn(w,b.type)??UC(b,x)),l==null){if(Ct(v))l=tn(v);else if(H0(v))l=lm(v,...et(g));else if(b.interval){let T=b.interval;if(b.ticks){let[_,I]=et(g),D=(I-_)/T[Io];T=ip(T,D/v)??T,l=lm(T,_,I)}else{l=g;let _=l.length;T=ip(T,_/v)??T,T!==b.interval&&(l=lm(T,...et(l)))}if(T===b.interval){let _=Math.round(l.length/v);_>1&&(l=l.filter((I,D)=>D%_===0))}}else b.ticks?l=b.ticks(v):l=g;if(!b.ticks&&l.length&&l!==g){let T=new Dt(g);l=l.filter(_=>T.has(_)),l.length||nt(`Warning: the ${t}-axis ticks appear to not align with the scale domain, resulting in no ticks. Try different ticks?`)}t==="y"||t==="x"?d=[rn(l)]:a[t]={scale:t,value:Be}}i?.call(this,b,l,v,S,a);let k=Object.fromEntries(Object.entries(a).map(([T,_])=>[T,{..._,value:lt(l,_.value)}]));return y&&(d=h.filterFacets(l,k)),{data:l,facets:d,channels:k}}let c=En(o).initializer,u=e(n,En({...o,initializer:s},c));return n==null?(a=u.channels,u.channels={}):a={},r!==void 0&&Object.assign(u,r),u.clip===void 0&&(u.clip=!1),u}function UC(e,t){let[n,r]=et(e.range());return(r-n)/t}function wx(e,t,n,r,o){return{value:Pa(e,t,n,r,o)}}function Pa(e,t,n,r,o){return typeof r=="function"&&!(e.type==="log"&&e.tickFormat)?r:r===void 0&&t&&Ke(t)?I0(e.type,t,o)??an:e.tickFormat?e.tickFormat(typeof n=="number"?n:null,r):typeof r=="string"&&e.domain().length>0?(Ke(e.domain())?Qt:gt)(r):r===void 0?an:ut(r)}function lm(e,t,n){return e.range(t,e.offset(e.floor(n)))}var VC={draw(e,t){e.moveTo(0,0),e.lineTo(0,t)}},GC={draw(e,t){e.moveTo(0,0),e.lineTo(0,-t)}},KC={draw(e,t){e.moveTo(0,0),e.lineTo(-t,0)}},XC={draw(e,t){e.moveTo(0,0),e.lineTo(t,0)}};function kx(e){return e.bandwidth&&!e.interval?void 0:"tabular-nums"}function Sx(e,t,{anchor:n,label:r=t.label,labelAnchor:o,labelArrow:i}={}){if(!(r==null||r.inferred&&Cx(t)&&/^(date|time|year)$/i.test(r))){if(r=String(r),i==="auto"&&(i=(!t.bandwidth||t.interval)&&!/[↑↓→←]/.test(r)),!i)return r;if(i===!0){let a=nb(t);a&&(i=/x$/.test(e)||o==="center"?/x$/.test(e)===a<0?"left":"right":a<0?"up":"down")}switch(i){case"left":return`\u2190 ${r}`;case"right":return`${r} \u2192`;case"up":return n==="right"?`${r} \u2191`:`\u2191 ${r}`;case"down":return n==="right"?`${r} \u2193`:`\u2193 ${r}`}return r}}function Tx(e="auto"){return Ae(e)?!1:typeof e=="boolean"?e:Je(e,"labelArrow",["auto","up","right","down","left"])}function Cx(e){return Ke(e.domain())}function _x(e,t){if(t==null)return t;let n=e(t);if(!n)throw new Error(`scale not found: ${t}`);return n}function Dx(e,{opacity:t,...n}={}){if(!on(e)&&!Ap(e))throw new Error(`swatches legend requires ordinal or threshold color scale (not ${e.type})`);return Rx(e,n,(r,o,i,a)=>r.append("svg").attr("width",i).attr("height",a).attr("fill",o.scale).attr("fill-opacity",we(t)[1]).append("rect").attr("width","100%").attr("height","100%"))}function Mx(e,{fill:t=e.hint?.fill!==void 0?e.hint.fill:"none",fillOpacity:n=1,stroke:r=e.hint?.stroke!==void 0?e.hint.stroke:Ae(t)?"currentColor":"none",strokeOpacity:o=1,strokeWidth:i=1.5,r:a=4.5,...s}={},c){let[u,l]=en(t),[d,f]=en(r),p=_x(c,u),m=_x(c,d),h=a*a*Math.PI;return n=we(n)[1],o=we(o)[1],i=we(i)[1],Rx(e,s,(y,b,g,w)=>y.append("svg").attr("viewBox","-8 -8 16 16").attr("width",g).attr("height",w).attr("fill",u==="color"?v=>p.scale(v):l).attr("fill-opacity",n).attr("stroke",d==="color"?v=>m.scale(v):f).attr("stroke-opacity",o).attr("stroke-width",i).append("path").attr("d",v=>{let S=It();return e.scale(v).draw(S,h),S}))}function Rx(e,t={},n){let{columns:r,tickFormat:o,fontVariant:i=Xl(e),swatchSize:a=15,swatchWidth:s=a,swatchHeight:c=a,marginLeft:u=0,className:l,style:d,width:f}=t,p=Ho(t);l=Wo(l),o=Pa(e.scale,e.domain,void 0,o);let m=ae("div",p).attr("class",`${l}-swatches ${l}-swatches-${r!=null?"columns":"wrap"}`),h;return r!=null?(h=`:where(.${l}-swatches-columns .${l}-swatch) {
  display: flex;
  align-items: center;
  break-inside: avoid;
  padding-bottom: 1px;
}
:where(.${l}-swatches-columns .${l}-swatch::before) {
  flex-shrink: 0;
}
:where(.${l}-swatches-columns .${l}-swatch-label) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`,m.style("columns",r).selectAll().data(e.domain).enter().append("div").attr("class",`${l}-swatch`).call(n,e,s,c).call(y=>y.append("div").attr("class",`${l}-swatch-label`).attr("title",o).text(o))):(h=`:where(.${l}-swatches-wrap) {
  display: flex;
  align-items: center;
  min-height: 33px;
  flex-wrap: wrap;
}
:where(.${l}-swatches-wrap .${l}-swatch) {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}`,m.selectAll().data(e.domain).enter().append("span").attr("class",`${l}-swatch`).call(n,e,s,c).append(function(){return this.ownerDocument.createTextNode(o.apply(this,arguments))})),m.call(y=>y.insert("style","*").text(`:where(.${l}-swatches) {
  font-family: system-ui, sans-serif;
  font-size: 10px;
  margin-bottom: 0.5em;
}
:where(.${l}-swatch > svg) {
  margin-right: 0.5em;
  overflow: visible;
}
${h}`)).style("margin-left",u?`${+u}px`:null).style("width",f===void 0?null:`${+f}px`).style("font-variant",ke(i,"normal")).call(Uo,d).node()}var dm=new Map([["symbol",Mx],["color",qx],["opacity",QC]]);function Ex(e,t,n={}){return(r,o)=>{if(!dm.has(r))throw new Error(`unknown legend type: ${r}`);if(r in e)return dm.get(r)(e[r],Ix(t,n[r],o),i=>e[i])}}function Ix({className:e,...t},{label:n,ticks:r,tickFormat:o}={},i){return Q0(i,{className:e,...t},{label:n,ticks:r,tickFormat:o})}function qx(e,{legend:t=!0,...n}){if(t===!0&&(t=e.type==="ordinal"?"swatches":"ramp"),e.domain!==void 0)switch(`${t}`.toLowerCase()){case"swatches":return Dx(e,n);case"ramp":return Ib(e,n);default:throw new Error(`unknown legend type: ${t}`)}}function QC({type:e,interpolate:t,...n},{legend:r=!0,color:o=ht(0,0,0),...i}){if(!t)throw new Error(`${e} opacity scales are not supported`);if(r===!0&&(r="ramp"),`${r}`.toLowerCase()!=="ramp")throw new Error(`${r} opacity legends are not supported`);return qx({type:e,...n,interpolate:ZC(o)},{legend:r,...i})}function ZC(e){let{r:t,g:n,b:r}=ht(e)||ht(0,0,0);return o=>`rgba(${t},${n},${r},${o})`}function Px(e,t,n){let r=[];for(let[o,i]of dm){let a=n[o];if(a?.legend&&o in e){let s=i(e[o],Ix(t,e[o],a),c=>e[c]);s!=null&&r.push(s)}}return r}var JC={ariaLabel:"rect"},cu=class extends ye{constructor(t,n={}){let{x1:r,y1:o,x2:i,y2:a}=n;super(t,{x1:{value:r,scale:"x",type:r!=null&&i==null?"band":void 0,optional:!0},y1:{value:o,scale:"y",type:o!=null&&a==null?"band":void 0,optional:!0},x2:{value:i,scale:"x",optional:!0},y2:{value:a,scale:"y",optional:!0}},n,JC),pm(this,n),mm(this,n)}render(t,n,r,o,i){let{x:a,y:s}=n,{x1:c,y1:u,x2:l,y2:d}=r,{marginTop:f,marginRight:p,marginBottom:m,marginLeft:h,width:y,height:b}=o,{projection:g}=i,{insetTop:w,insetRight:v,insetBottom:S,insetLeft:x}=this,{rx:k,ry:T,rx1y1:_,rx1y2:I,rx2y1:D,rx2y2:R}=this;(c||l)&&!g&&tr(a)&&(c=l=null),(u||d)&&!g&&tr(s)&&(u=d=null);let O=a?.bandwidth?a.bandwidth():0,A=s?.bandwidth?s.bandwidth():0;return ae("svg:g",i).call(ze,this,o,i).call(Ye,this,{},0,0).call(C=>C.selectAll().data(t).enter().call(_||I||D||R?F=>F.append("path").call(Fe,this).call(hm,c&&l?q=>c[q]+(l[q]<c[q]?-v:x):c?q=>c[q]+x:h+x,u&&d?q=>u[q]+(d[q]<u[q]?-S:w):u?q=>u[q]+w:f+w,c&&l?q=>l[q]-(l[q]<c[q]?-x:v):c?q=>c[q]+O-v:y-p-v,u&&d?q=>d[q]-(d[q]<u[q]?-w:S):u?q=>u[q]+A-S:b-m-S,this).call(rt,this,r):F=>F.append("rect").call(Fe,this).attr("x",c?l?q=>Math.min(c[q],l[q])+x:q=>c[q]+x:h+x).attr("y",u?d?q=>Math.min(u[q],d[q])+w:q=>u[q]+w:f+w).attr("width",c?l?q=>Math.max(0,Math.abs(l[q]-c[q])+O-x-v):O-x-v:y-p-h-v-x).attr("height",u?d?q=>Math.max(0,Math.abs(u[q]-d[q])+A-w-S):A-w-S:b-f-m-w-S).call(Q,"rx",k).call(Q,"ry",T).call(rt,this,r))).node()}};function pm(e,{inset:t=0,insetTop:n=t,insetRight:r=t,insetBottom:o=t,insetLeft:i=t}={}){e.insetTop=Ce(n),e.insetRight=Ce(r),e.insetBottom=Ce(o),e.insetLeft=Ce(i)}function mm(e,{r:t,rx:n,ry:r,rx1:o=t,ry1:i=t,rx2:a=t,ry2:s=t,rx1y1:c=o!==void 0?+o:i!==void 0?+i:0,rx1y2:u=o!==void 0?+o:s!==void 0?+s:0,rx2y1:l=a!==void 0?+a:i!==void 0?+i:0,rx2y2:d=a!==void 0?+a:s!==void 0?+s:0}={}){c||u||l||d?(e.rx1y1=c,e.rx1y2=u,e.rx2y1=l,e.rx2y2=d):(e.rx=ke(n,"auto"),e.ry=ke(r,"auto"))}function hm(e,t,n,r,o,i){let{rx1y1:a,rx1y2:s,rx2y1:c,rx2y2:u}=i;typeof t!="function"&&(t=ut(t)),typeof n!="function"&&(n=ut(n)),typeof r!="function"&&(r=ut(r)),typeof o!="function"&&(o=ut(o));let l=Math.max(Math.abs(a+c),Math.abs(s+u)),d=Math.max(Math.abs(a+s),Math.abs(c+u));e.attr("d",f=>{let p=t(f),m=n(f),h=r(f),y=o(f),b=p>h,g=m>y,w=b?h:p,v=b?p:h,S=g?y:m,x=g?m:y,k=Math.min(1,(v-w)/l,(x-S)/d),T=k*(b?g?u:c:g?s:a),_=k*(b?g?s:a:g?u:c),I=k*(b?g?a:s:g?c:u),D=k*(b?g?c:u:g?a:s);return`M${w},${S+su(T,D)}A${T},${T} 0 0 ${T<0?0:1} ${w+au(T,D)},${S}H${v-au(_,I)}A${_},${_} 0 0 ${_<0?0:1} ${v},${S+su(_,I)}V${x-su(I,_)}A${I},${I} 0 0 ${I<0?0:1} ${v-au(I,_)},${x}H${w+au(D,T)}A${D},${D} 0 0 ${D<0?0:1} ${w},${x-su(D,T)}Z`})}function au(e,t){return t<0?e:Math.abs(e)}function su(e,t){return t<0?Math.abs(e):e}function Ba(e,t){return new cu(e,jb($b(t)))}var e5={ariaLabel:"frame",fill:"none",stroke:"currentColor",clip:!1},t5={ariaLabel:"frame",fill:null,stroke:"currentColor",strokeLinecap:"square",clip:!1},ym=class extends ye{constructor(t={}){let{anchor:n=null}=t;super(qo,void 0,t,n==null?e5:t5),this.anchor=dp(n,"anchor",["top","right","bottom","left"]),pm(this,t),n||mm(this,t)}render(t,n,r,o,i){let{marginTop:a,marginRight:s,marginBottom:c,marginLeft:u,width:l,height:d}=o,{anchor:f,insetTop:p,insetRight:m,insetBottom:h,insetLeft:y}=this,{rx:b,ry:g,rx1y1:w,rx1y2:v,rx2y1:S,rx2y2:x}=this,k=u+y,T=l-s-m,_=a+p,I=d-c-h;return ae(f?"svg:line":w||v||S||x?"svg:path":"svg:rect",i).datum(0).call(ze,this,o,i).call(Fe,this).call(rt,this,r).call(Ye,this,{}).call(f==="left"?D=>D.attr("x1",k).attr("x2",k).attr("y1",_).attr("y2",I):f==="right"?D=>D.attr("x1",T).attr("x2",T).attr("y1",_).attr("y2",I):f==="top"?D=>D.attr("x1",k).attr("x2",T).attr("y1",_).attr("y2",_):f==="bottom"?D=>D.attr("x1",k).attr("x2",T).attr("y1",I).attr("y2",I):w||v||S||x?D=>D.call(hm,k,_,T,I,this):D=>D.attr("x",k).attr("y",_).attr("width",T-k).attr("height",I-_).attr("rx",b).attr("ry",g)).node()}};function Bx(e){return new ym(e)}var gm={ariaLabel:"tip",fill:"var(--plot-background)",stroke:"currentColor"},n5=new Set(["geometry","href","src","ariaLabel","scales"]),vm=class extends ye{constructor(t,n={}){n.tip&&(n={...n,tip:!1}),n.title===void 0&&Ct(t)&&Al(t)&&(n={...n,title:Be});let{x:r,y:o,x1:i,x2:a,y1:s,y2:c,anchor:u,preferredAnchor:l="bottom",monospace:d,fontFamily:f=d?"ui-monospace, monospace":void 0,fontSize:p,fontStyle:m,fontVariant:h,fontWeight:y,lineHeight:b=1,lineWidth:g=20,frameAnchor:w,format:v,textAnchor:S="start",textOverflow:x,textPadding:k=8,title:T,pointerSize:_=12,pathFilter:I="drop-shadow(0 3px 4px rgba(0,0,0,0.2))"}=n;super(t,{x:{value:i!=null&&a!=null?null:r,scale:"x",optional:!0},y:{value:s!=null&&c!=null?null:o,scale:"y",optional:!0},x1:{value:i,scale:"x",optional:a==null},y1:{value:s,scale:"y",optional:c==null},x2:{value:a,scale:"x",optional:i==null},y2:{value:c,scale:"y",optional:s==null},title:{value:T,optional:!0}},n,gm),this.anchor=Fl(u,"anchor"),this.preferredAnchor=Fl(l,"preferredAnchor"),this.frameAnchor=er(w),this.textAnchor=ke(S,"middle"),this.textPadding=+k,this.pointerSize=+_,this.pathFilter=Te(I),this.lineHeight=+b,this.lineWidth=+g,this.textOverflow=rm(x),this.monospace=!!d,this.fontFamily=Te(f),this.fontSize=Ce(p),this.fontStyle=Te(m),this.fontVariant=Te(h),this.fontWeight=Te(y);for(let D in gm)D in this.channels&&(this[D]=gm[D]);this.splitLines=sm(this),this.clipLine=cm(this),this.format=typeof v=="string"||typeof v=="function"?{title:v}:{...v}}render(t,n,r,o,i){let a=this,{x:s,y:c,fx:u,fy:l}=n,{ownerSVGElement:d,document:f}=i,{anchor:p,monospace:m,lineHeight:h,lineWidth:y}=this,{textPadding:b,pointerSize:g,pathFilter:w}=this,{marginTop:v,marginLeft:S}=o,{x1:x,y1:k,x2:T,y2:_,x:I=x??T,y:D=k??_}=r,R=u?u(t.fx)-S:0,O=l?l(t.fy)-v:0,[A,C]=sn(this,o),F=Gp(r,A),q=Kp(r,C),K=m?ru:nu,P=K(jr),L,H;"title"in r?(L=Ax.call(this,{title:r.channels.title},n),H=a5):(L=Ax.call(this,r.channels,n),H=s5);let V=ae("svg:g",i).call(ze,this,o,i).call(am,this).call(Ye,this,{x:I&&s,y:D&&c}).call(te=>te.selectAll().data(t).enter().append("g").attr("transform",ne=>`translate(${Math.round(F(ne))},${Math.round(q(ne))})`).call(Fe,this).call(ne=>ne.append("path").attr("filter",w)).call(ne=>ne.append("text").each(function(j){let ie=mt(this);this.setAttribute("fill","currentColor"),this.setAttribute("fill-opacity",1),this.setAttribute("stroke","none");let E=H.call(a,j,t,L,n,r);if(typeof E=="string")for(let N of a.splitLines(E))z(ie,{value:a.clipLine(N)});else{let N=new Set;for(let G of E){let{label:M=""}=G;M&&N.has(M)||(N.add(M),z(ie,G))}}})));function z(te,{label:ne,value:j,color:ie,opacity:E}){ne??(ne=""),j??(j="");let N=ie!=null||E!=null,G,M=y*100,[ue]=$r(ne,M,K,P);if(ue>=0)ne=ne.slice(0,ue).trimEnd()+jr,G=j.trim(),j="";else{(ne||!j&&!N)&&(j=" "+j);let[pe]=$r(j,M-K(ne),K,P);pe>=0&&(G=j.trim(),j=j.slice(0,pe).trimEnd()+jr)}let Z=te.append("tspan").attr("x",0).attr("dy",`${h}em`).text("\u200B");ne&&Z.append("tspan").attr("font-weight","bold").text(ne),j&&Z.append(()=>f.createTextNode(j)),N&&Z.append("tspan").text(" \u25A0").attr("fill",ie).attr("fill-opacity",E).style("user-select","none"),G&&Z.append("title").text(G)}function ee(){let{width:te,height:ne}=o.facet??o;V.selectChildren().each(function(j){let{x:ie,width:E,height:N}=this.getBBox();E=Math.round(E),N=Math.round(N);let G=p;if(G===void 0){let Z=F(j)+R,pe=q(j)+O,Se=Z+E+g+b*2<te,ot=Z-E-g-b*2>0,Hr=pe+N+g+b*2<ne,Jo=pe-N-g-b*2>0;G=Se&&ot?Hr&&Jo?a.preferredAnchor:Jo?"bottom":"top":Hr&&Jo?Se?"left":"right":(Se||ot)&&(Hr||Jo)?`${Jo?"bottom":"top"}-${Se?"left":"right"}`:a.preferredAnchor}let M=this.firstChild,ue=this.lastChild;if(M.setAttribute("d",i5(G,g,b,E,N)),ie)for(let Z of ue.childNodes)Z.setAttribute("x",-ie);ue.setAttribute("y",`${+r5(G,ue.childNodes.length,h).toFixed(6)}em`),ue.setAttribute("transform",`translate(${o5(G,g,b,E,N)})`)}),V.attr("visibility",null)}return t.length&&(V.attr("visibility","hidden"),d.isConnected?Promise.resolve().then(ee):typeof requestAnimationFrame<"u"&&requestAnimationFrame(ee)),V.node()}};function Nx(e,{x:t,y:n,...r}={}){return r.frameAnchor===void 0&&([t,n]=Rn(t,n)),new vm(e,{...r,x:t,y:n})}function r5(e,t,n){return/^top(?:-|$)/.test(e)?.94-n:-.29-t*n}function o5(e,t,n,r,o){switch(e){case"middle":return[-r/2,o/2];case"top-left":return[n,t+n];case"top":return[-r/2,t/2+n];case"top-right":return[-r-n,t+n];case"right":return[-t/2-r-n,o/2];case"bottom-left":return[n,-t-n];case"bottom":return[-r/2,-t/2-n];case"bottom-right":return[-r-n,-t-n];case"left":return[n+t/2,o/2]}}function i5(e,t,n,r,o){let i=r+n*2,a=o+n*2;switch(e){case"middle":return`M${-i/2},${-a/2}h${i}v${a}h${-i}z`;case"top-left":return`M0,0l${t},${t}h${i-t}v${a}h${-i}z`;case"top":return`M0,0l${t/2},${t/2}h${(i-t)/2}v${a}h${-i}v${-a}h${(i-t)/2}z`;case"top-right":return`M0,0l${-t},${t}h${t-i}v${a}h${i}z`;case"right":return`M0,0l${-t/2},${-t/2}v${t/2-a/2}h${-i}v${a}h${i}v${t/2-a/2}z`;case"bottom-left":return`M0,0l${t},${-t}h${i-t}v${-a}h${-i}z`;case"bottom":return`M0,0l${t/2},${-t/2}h${(i-t)/2}v${-a}h${-i}v${a}h${(i-t)/2}z`;case"bottom-right":return`M0,0l${-t},${-t}h${t-i}v${-a}h${i}z`;case"left":return`M0,0l${t/2},${-t/2}v${t/2-a/2}h${i}v${a}h${-i}v${t/2-a/2}z`}}function Ax(e,t){let n={},r=this.format;r=Lx(r,e,"x"),r=Lx(r,e,"y"),this.format=r;for(let o in r){let i=r[o];if(!(i===null||i===!1))if(o==="fx"||o==="fy")n[o]=!0;else{let a=Sp(e,o);a&&(n[o]=a)}}for(let o in e){if(o in n||o in r||n5.has(o)||(o==="x"||o==="y")&&e.geometry)continue;let i=Sp(e,o);if(i){if(i.scale==null&&i.defaultScale==="color")continue;n[o]=i}}this.facet&&(t.fx&&!("fx"in r)&&(n.fx=!0),t.fy&&!("fy"in r)&&(n.fy=!0));for(let o in n){let i=this.format[o];if(typeof i=="string"){let a=n[o]?.value??t[o]?.domain()??[];this.format[o]=(Ke(a)?Qt:gt)(i)}else if(i===void 0||i===!0){let a=t[o];this.format[o]=a?.bandwidth?Pa(a,a.domain()):an}}return n}function Lx(e,t,n){if(!(n in e))return e;let r=`${n}1`,o=`${n}2`;if((r in e||!(r in t))&&(o in e||!(o in t)))return e;let i=Object.entries(e),a=e[n];return i.splice(i.findIndex(([s])=>s===n)+1,0,[r,a],[o,a]),Object.fromEntries(i)}function a5(e,t,{title:n}){return this.format.title(n.value[e],e)}function*s5(e,t,n,r,o){for(let i in n){if(i==="fx"||i==="fy"){yield{label:lu(r,n,i),value:this.format[i](t[i],e)};continue}if(i==="x1"&&"x2"in n||i==="y1"&&"y2"in n)continue;let a=n[i];if(i==="x2"&&"x1"in n)yield{label:Ox(r,n,"x"),value:Fx(this.format.x2,n.x1,a,e)};else if(i==="y2"&&"y1"in n)yield{label:Ox(r,n,"y"),value:Fx(this.format.y2,n.y1,a,e)};else{let s=a.value[e],c=a.scale;if(!St(s)&&c==null)continue;yield{label:lu(r,n,i),value:this.format[i](s,e),color:c==="color"?o[i][e]:null,opacity:c==="opacity"?o[i][e]:null}}}}function Fx(e,t,n,r){return n.hint?.length?`${e(n.value[r]-t.value[r],r)}`:`${e(t.value[r],r)}\u2013${e(n.value[r],r)}`}function Ox(e,t,n){let r=lu(e,t,`${n}1`,n),o=lu(e,t,`${n}2`,n);return r===o?r:`${r}\u2013${o}`}function lu(e,t,n,r=n){let o=t[n],i=e[o?.scale??n];return String(i?.label??o?.label??r)}function zr(e={}){let{facet:t,style:n,title:r,subtitle:o,caption:i,ariaLabel:a,ariaDescription:s}=e,c=Wo(e.className),u=e.marks===void 0?[]:$x(e.marks);u.push(...p5(u));let l=f5(t,e),d=new Map;for(let P of u){let L=zx(P,l,e);L&&d.set(P,L)}let f=new Map;l&&Aa(f,[l],e),Aa(f,d,e);let p=$x(m5(u,f,e));for(let P of p){let L=zx(P,l,e);L&&d.set(P,L)}u.unshift(...p);let m=sb(f,e);if(m!==void 0){let P=l?Ul(m,l):void 0;for(let H of u){if(H.facet===null||H.facet==="super")continue;let V=d.get(H);V!==void 0&&(V.facetsIndex=H.fx!=null||H.fy!=null?Ul(m,V):P)}let L=new Set;for(let{facetsIndex:H}of d.values())H?.forEach((V,z)=>{V?.length>0&&L.add(z)});m.forEach(0<L.size&&L.size<m.length?(H,V)=>H.empty=!L.has(V):H=>H.empty=!1);for(let H of u)if(H.facet==="exclude"){let V=d.get(H);V!==void 0&&(V.facetsIndex=ub(V.facetsIndex))}}for(let P of le.keys())Po(e[P])&&P!=="fx"&&P!=="fy"&&f.set(P,[]);let h=new Map;for(let P of u){if(h.has(P))throw new Error("duplicate mark; each mark must be unique");let{facetsIndex:L,channels:H}=d.get(P)??{},{data:V,facets:z,channels:ee}=P.initialize(L,H,e);wm(ee,e),h.set(P,{data:V,facets:z,channels:ee})}let y=Ra(Aa(f,h,e),e),b=Db(y,u,e);tb(y,b);let g=Pp(y),{fx:w,fy:v}=g,S=w||v?Bp(y,b):b,x=w||v?w5(g,b):b,k=Ho(e),T=k.document,_=dn("svg").call(T.documentElement),I=_;k.ownerSVGElement=_,k.className=c,k.projection=pb(e,S),k.path=function(){return fo(this.projection??bb(g))},k.filterFacets=(P,L)=>Ul(m,{channels:L,groups:Hl(P,L)}),k.getMarkState=P=>{let L=h.get(P),H=d.get(P);return{...L,channels:{...L.channels,...H?.channels}}},k.dispatchValue=P=>{I.value!==P&&(I.value=P,I.dispatchEvent(new k.document.defaultView.Event("input",{bubbles:!0})))};let D=new Set;for(let[P,L]of h)if(P.initializer!=null){let H=P.facet==="super"?x:S,V=P.initializer(L.data,L.facets,L.channels,g,H,k);if(V.data!==void 0&&(L.data=V.data),V.facets!==void 0&&(L.facets=V.facets),V.channels!==void 0){let{fx:z,fy:ee,...te}=V.channels;u5(te),Object.assign(L.channels,te);for(let ne of Object.values(te)){let{scale:j}=ne;j!=null&&!tv(le.get(j))&&(Wx(ne,e),D.add(j))}(z!=null||ee!=null)&&d.set(P,!0)}}if(D.size){let P=new Map;Aa(P,h,e,z=>D.has(z)),Aa(f,h,e,z=>D.has(z));let L=x5(Ra(P,e),y),{scales:H,...V}=Pp(L);Object.assign(y,L),Object.assign(g,V),Object.assign(g.scales,H)}let R,O;m!==void 0&&(R={x:w?.domain(),y:v?.domain()},m=cb(m,R),O=lb(w,v,b));for(let[P,L]of h)L.values=P.scale(L.channels,g,k);let{width:A,height:C}=b;mt(_).attr("class",c).attr("fill","currentColor").attr("font-family","system-ui, sans-serif").attr("font-size",10).attr("text-anchor","middle").attr("width",A).attr("height",C).attr("viewBox",`0 0 ${A} ${C}`).attr("aria-label",a).attr("aria-description",s).call(P=>P.append("style").text(`:where(.${c}) {
  --plot-background: white;
  display: block;
  height: auto;
  height: intrinsic;
  max-width: 100%;
}
:where(.${c} text),
:where(.${c} tspan) {
  white-space: pre;
}`)).call(Uo,n);for(let P of u){let{channels:L,values:H,facets:V}=h.get(P);if(m===void 0||P.facet==="super"){let z=null;if(V&&(z=V[0],z=P.filter(z,L,H),z.length===0))continue;let ee=P.render(z,g,H,x,k);if(ee==null)continue;_.appendChild(ee)}else{let z;for(let ee of m){if(!(P.facetAnchor?.(m,R,ee)??!ee.empty))continue;let te=null;if(V){let j=d.has(P);if(te=V[j?ee.i:0],te=P.filter(te,L,H),te.length===0)continue;!j&&te===V[0]&&(te=$0(te)),te.fx=ee.x,te.fy=ee.y,te.fi=ee.i}let ne=P.render(te,g,H,S,k);if(ne!=null){(z??(z=mt(_).append("g"))).append(()=>ne).datum(ee);for(let j of["aria-label","aria-description","aria-hidden","transform"])ne.hasAttribute(j)&&(z.attr(j,ne.getAttribute(j)),ne.removeAttribute(j))}}z?.selectChildren().each(O)}}let F=Px(y,k,e),{figure:q=r!=null||o!=null||i!=null||F.length>0}=e;q&&(I=T.createElement("figure"),I.className=`${c}-figure`,I.style.maxWidth="initial",r!=null&&I.append(jx(T,r,"h2")),o!=null&&I.append(jx(T,o,"h3")),I.append(...F,_),i!=null&&I.append(c5(T,i)),"value"in _&&(I.value=_.value,delete _.value)),I.scale=ib(g.scales),I.legend=Ex(y,k,e);let K=Lv();return K>0&&mt(_).append("text").attr("x",A).attr("y",20).attr("dy","-1em").attr("text-anchor","end").attr("font-family","initial").text("\u26A0\uFE0F").append("title").text(`${K.toLocaleString("en-US")} warning${K===1?"":"s"}. Please check the console.`),I}function jx(e,t,n){if(t.ownerDocument)return t;let r=e.createElement(n);return r.append(t),r}function c5(e,t){let n=e.createElement("figcaption");return n.append(t),n}function $x(e){return e.flat(1/0).filter(t=>t!=null).map(l5)}function l5(e){return typeof e.render=="function"?e:new xm(e)}var xm=class extends ye{constructor(t){if(typeof t!="function")throw new TypeError("invalid mark; missing render function");super(),this.render=t}render(){}};function wm(e,t){for(let n in e)Wx(e[n],t);return e}function Wx(e,t){let{scale:n,transform:r=!0}=e;if(n==null||!r)return;let{type:o,percent:i,interval:a,transform:s=i?c=>c==null?NaN:c*100:z0(a,o)}=t[n]??{};s!=null&&(e.value=ve(e.value,s),e.transform=!1)}function u5(e){for(let t in e)kp(t,e[t])}function Aa(e,t,n,r=L0){for(let{channels:o}of t.values())for(let i in o){let a=o[i],{scale:s}=a;if(s!=null&&r(s))if(s==="projection"){if(!yb(n)){let c=n.x?.domain===void 0,u=n.y?.domain===void 0;if(c||u){let[l,d]=vb(a);c&&bm(e,"x",l),u&&bm(e,"y",d)}}}else bm(e,s,a)}return e}function bm(e,t,n){let r=e.get(t);r!==void 0?r.push(n):e.set(t,[n])}function f5(e,t){if(e==null)return;let{x:n,y:r}=e;if(n==null&&r==null)return;let o=Mn(e.data);if(o==null)throw new Error("missing facet data");let i={};n!=null&&(i.fx=Oo(o,{value:n,scale:"fx"})),r!=null&&(i.fy=Oo(o,{value:r,scale:"fy"})),wm(i,t);let a=Hl(o,i);return{channels:i,groups:a,data:e.data}}function zx(e,t,n){if(e.facet===null||e.facet==="super")return;let{fx:r,fy:o}=e;if(r!=null||o!=null){let c=Mn(e.data??r??o);if(c===void 0)throw new Error(`missing facet data in ${e.ariaLabel}`);if(c===null)return;let u={};return r!=null&&(u.fx=Oo(c,{value:r,scale:"fx"})),o!=null&&(u.fy=Oo(c,{value:o,scale:"fy"})),wm(u,n),{channels:u,groups:Hl(c,u)}}if(t===void 0)return;let{channels:i,groups:a,data:s}=t;if(e.facet!=="auto"||e.data===s)return{channels:i,groups:a};s.length>0&&(a.size>1||a.size===1&&i.fx&&i.fy&&[...a][0][1].size>1)&&ql(Mn(e.data))===ql(s)&&nt(`Warning: the ${e.ariaLabel} mark appears to use faceted data, but isn\u2019t faceted. The mark data has the same length as the facet data and the mark facet option is "auto", but the mark data and facet data are distinct. If this mark should be faceted, set the mark facet option to true; otherwise, suppress this warning by setting the mark facet option to false.`)}function d5(e,t={}){return En({...t,x:null,y:null},(n,r,o,i,a,s)=>s.getMarkState(e))}function p5(e){let t=[];for(let n of e){let r=n.tip;if(r){r===!0?r={}:typeof r=="string"&&(r={pointer:r});let{pointer:o,preferredAnchor:i}=r;o=/^x$/i.test(o)?Eb:/^y$/i.test(o)?Vp:Rb,r=o(d5(n,r)),r.title=null,i===void 0&&(r.preferredAnchor=o===Vp?"left":"bottom");let a=Nx(n.data,r);a.facet=n.facet,a.facetAnchor=n.facetAnchor,t.push(a)}}return t}function m5(e,t,n){let{projection:r,x:o={},y:i={},fx:a={},fy:s={},axis:c,grid:u,facet:l={},facet:{axis:d=c,grid:f}=l,x:{axis:p=c,grid:m=p===null?null:u}=o,y:{axis:h=c,grid:y=h===null?null:u}=i,fx:{axis:b=d,grid:g=b===null?null:f}=a,fy:{axis:w=d,grid:v=w===null?null:f}=s}=n;(r||!Po(o)&&!Yx("x",e))&&(p=m=null),(r||!Po(i)&&!Yx("y",e))&&(h=y=null),t.has("fx")||(b=g=null),t.has("fy")||(w=v=null),p===void 0&&(p=!du(e,"x")),h===void 0&&(h=!du(e,"y")),b===void 0&&(b=!du(e,"fx")),w===void 0&&(w=!du(e,"fy")),p===!0&&(p="bottom"),h===!0&&(h="left"),b===!0&&(b=p==="top"||p===null?"bottom":"top"),w===!0&&(w=h==="right"||h===null?"left":"right");let S=[];return fu(S,v,mx,s),uu(S,w,lx,"right","left",l,s),fu(S,g,yx,a),uu(S,b,ux,"top","bottom",l,a),fu(S,y,px,i),uu(S,h,um,"left","right",n,i),fu(S,m,hx,o),uu(S,p,fm,"bottom","top",n,o),S}function uu(e,t,n,r,o,i,a){if(!t)return;let s=h5(t);a=y5(s?r:t,i,a);let{line:c}=a;(n===um||n===fm)&&c&&!Lr(c)&&e.push(Bx(g5(a))),e.push(n(a)),s&&e.push(n({...a,anchor:o,label:null}))}function fu(e,t,n,r){!t||Lr(t)||e.push(n(v5(t,r)))}function h5(e){return/^\s*both\s*$/i.test(e)}function y5(e,t,{line:n=t.line,ticks:r,tickSize:o,tickSpacing:i,tickPadding:a,tickFormat:s,tickRotate:c,fontVariant:u,ariaLabel:l,ariaDescription:d,label:f=t.label,labelAnchor:p,labelArrow:m=t.labelArrow,labelOffset:h}){return{anchor:e,line:n,ticks:r,tickSize:o,tickSpacing:i,tickPadding:a,tickFormat:s,tickRotate:c,fontVariant:u,ariaLabel:l,ariaDescription:d,label:f,labelAnchor:p,labelArrow:m,labelOffset:h}}function g5(e){let{anchor:t,line:n}=e;return{anchor:t,facetAnchor:t+"-empty",stroke:n===!0?void 0:n}}function v5(e,{stroke:t=Ao(e)?e:void 0,ticks:n=b5(e)?e:void 0,tickSpacing:r,ariaLabel:o,ariaDescription:i}){return{stroke:t,ticks:n,tickSpacing:r,ariaLabel:o,ariaDescription:i}}function b5(e){switch(typeof e){case"number":return!0;case"string":return!Ao(e)}return Ct(e)||typeof e?.range=="function"}function du(e,t){let n=`${t}-axis `;return e.some(r=>r.ariaLabel?.startsWith(n))}function Yx(e,t){for(let n of t)for(let r in n.channels){let{scale:o}=n.channels[r];if(o===e||o==="projection")return!0}return!1}function x5(e,t){for(let n in e){let r=e[n],o=t[n];r.label===void 0&&o&&(r.label=o.label)}return e}function w5({fx:e,fy:t},n){let{marginTop:r,marginRight:o,marginBottom:i,marginLeft:a,width:s,height:c}=zl(n),u=e&&Hx(e),l=t&&Hx(t);return{marginTop:t?l[0]:r,marginRight:e?s-u[1]:o,marginBottom:t?c-l[1]:i,marginLeft:e?u[0]:a,inset:{marginTop:n.marginTop,marginRight:n.marginRight,marginBottom:n.marginBottom,marginLeft:n.marginLeft},width:s,height:c}}function Hx(e){let t=e.domain();if(t.length===0)return[0,e.bandwidth()];let n=e(t[0]),r=e(t[t.length-1]);return r<n&&([n,r]=[r,n]),[n,r+e.bandwidth()]}var k5=new Map([["basis",Pd],["basis-closed",Bd],["basis-open",Ad],["bundle",Ld],["bump-x",Md],["bump-y",Rd],["cardinal",Fd],["cardinal-closed",Od],["cardinal-open",Nd],["catmull-rom",jd],["catmull-rom-closed",$d],["catmull-rom-open",zd],["linear",Ir],["linear-closed",Yd],["monotone-x",Wd],["monotone-y",Ud],["natural",Vd],["step",Gd],["step-after",Xd],["step-before",Kd]]);function S5(e=Ir,t){if(typeof e=="function")return e;let n=k5.get(`${e}`.toLowerCase());if(!n)throw new Error(`unknown curve: ${e}`);if(t!==void 0){if("beta"in n)return n.beta(t);if("tension"in n)return n.tension(t);if("alpha"in n)return n.alpha(t)}return n}function Ux(e=La,t){return typeof e!="function"&&`${e}`.toLowerCase()==="auto"?La:S5(e,t)}function La(e){return Ir(e)}var T5={ariaLabel:"dot",fill:"none",stroke:"currentColor",strokeWidth:1.5};function C5(e){return e.sort===void 0&&e.reverse===void 0?sv({channel:"-r"},e):e}var pu=class extends ye{constructor(t,n={}){let{x:r,y:o,r:i,rotate:a,symbol:s=Tn,frameAnchor:c}=n,[u,l]=we(a,0),[d,f]=ov(s),[p,m]=we(i,d==null?3:4.5);super(t,{x:{value:r,scale:"x",optional:!0},y:{value:o,scale:"y",optional:!0},r:{value:p,scale:"r",filter:qr,optional:!0},rotate:{value:u,optional:!0},symbol:{value:d,scale:"auto",optional:!0}},C5(n),T5),this.r=m,this.rotate=l,this.symbol=f,this.frameAnchor=er(c);let{channels:h}=this,{symbol:y}=h;if(y){let{fill:b,stroke:g}=h;y.hint={fill:b?b.value===y.value?"color":"currentColor":this.fill??"currentColor",stroke:g?g.value===y.value?"color":"currentColor":this.stroke??"none"}}}render(t,n,r,o,i){let{x:a,y:s}=n,{x:c,y:u,r:l,rotate:d,symbol:f}=r,{r:p,rotate:m,symbol:h}=this,[y,b]=sn(this,o),g=h===Tn,w=l?void 0:p*p*Math.PI;return Mo(p)&&(t=[]),ae("svg:g",i).call(ze,this,o,i).call(Ye,this,{x:c&&a,y:u&&s}).call(v=>v.selectAll().data(t).enter().append(g?"circle":"path").call(Fe,this).call(g?S=>{S.attr("cx",c?x=>c[x]:y).attr("cy",u?x=>u[x]:b).attr("r",l?x=>l[x]:p)}:S=>{S.attr("transform",Vo`translate(${c?x=>c[x]:y},${u?x=>u[x]:b})${d?x=>` rotate(${d[x]})`:m?` rotate(${m})`:""}`).attr("d",l&&f?x=>{let k=It();return f[x].draw(k,l[x]*l[x]*Math.PI),k}:l?x=>{let k=It();return h.draw(k,l[x]*l[x]*Math.PI),k}:f?x=>{let k=It();return f[x].draw(k,w),k}:(()=>{let x=It();return h.draw(x,w),x})())}).call(rt,this,r)).node()}};function Fa(e,{x:t,y:n,...r}={}){return r.frameAnchor===void 0&&([t,n]=Rn(t,n)),new pu(e,{...r,x:t,y:n})}var _5={ariaLabel:"line",fill:"none",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:1},mu=class extends ye{constructor(t,n={}){let{x:r,y:o,z:i,curve:a,tension:s}=n;super(t,{x:{value:r,scale:"x"},y:{value:o,scale:"y"},z:{value:j0(n),optional:!0}},n,_5),this.z=i,this.curve=Ux(a,s),Ia(this,n)}filter(t){return t}project(t,n,r){this.curve!==La&&super.project(t,n,r)}render(t,n,r,o,i){let{x:a,y:s}=r,{curve:c}=this;return ae("svg:g",i).call(ze,this,o,i).call(Ye,this,n).call(u=>u.selectAll().data(Tb(t,[a,s],this,r)).enter().append("path").call(Fe,this).call(Sb,this,r).call(Bb,this,r,i).attr("d",c===La&&i.projection?D5(i.path(),a,s):Dd().curve(c).defined(l=>l>=0).x(l=>a[l]).y(l=>s[l]))).node()}};function D5(e,t,n){return t=Br(t),n=Br(n),r=>{let o=[],i=[o];for(let a of r)a===-1?(o=[],i.push(o)):o.push([t[a],n[a]]);return e({type:"MultiLineString",coordinates:i})}}function km(e,{x:t,y:n,...r}={}){return[t,n]=Rn(t,n),new mu(e,{...r,x:t,y:n})}ye.prototype.plot=function({marks:e=[],...t}={}){return zr({...t,marks:[...e,this]})};var Vx={pins:{"pr-127-base":"a1e325a5ff979bdfa25babc5554621c8c0f20497","pr-127-head":"64919bcbcf7fcc8202779b78c5f069b24662bb18","pr-131-base":"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e","pr-131-head":"b100221db48754656328391b878299c5a0bab443"},inventories:{"127":{changedFiles:6,additions:391,deletions:67,originalFiveTestsAndHelpersUnchanged:!0,newServiceCases:6,newCoreCases:4},"131":{changedFiles:60,additions:1298,deletions:544,scope:"Only delivery-counter and error-path tests are inventoried in the atlas; no PR-wide test audit is claimed."}},documents:[{subject:"pr-127-head",path:"packages/core/src/backend/turn-scoped-cache-scope.ts",revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",sha256:"a98c0e1f1410df8f0341a359c93ecb7d7ecf76410bcbd99ab419d96d9cc2ef04",text:`export interface TurnScopedCache<Key, Value> {
  getOrCreate(key: Key, createValue: () => Value): Value;
}

interface ClearableTurnScopedCache {
  clear(): void;
}

class TurnScopedCacheHandle<Key, Value>
  implements TurnScopedCache<Key, Value>, ClearableTurnScopedCache
{
  private readonly values = new Map<Key, Value>();

  getOrCreate(key: Key, createValue: () => Value): Value {
    if (this.values.has(key)) return this.values.get(key) as Value;
    const value = createValue();
    this.values.set(key, value);
    return value;
  }

  clear(): void {
    this.values.clear();
  }
}

export class TurnScopedCacheScope {
  private readonly caches: ClearableTurnScopedCache[] = [];

  createCache<Key, Value>(): TurnScopedCache<Key, Value> {
    const cache = new TurnScopedCacheHandle<Key, Value>();
    this.caches.push(cache);
    return cache;
  }

  beginTurn(): void {
    this.clear();
  }

  releaseTransientResources(): void {
    this.clear();
  }

  private clear(): void {
    for (const cache of this.caches) cache.clear();
  }
}
`},{subject:"pr-127-head",path:"packages/core/src/backend/turn-scoped-cache-scope.test.ts",revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",sha256:"8ef6f116ed52b6cb265454502bbab78f984196c0db2cf301266eeae3a3a09dc1",text:`import { describe, expect, it, vi } from "vitest";

import { TurnScopedCacheScope } from "./turn-scoped-cache-scope.js";

describe("TurnScopedCacheScope", () => {
  it("returns each exact factory value once per key and handle", () => {
    const scope = new TurnScopedCacheScope();
    const first = scope.createCache<string, readonly string[] | undefined>();
    const second = scope.createCache<string, readonly string[] | undefined>();
    const firstValue: readonly string[] = [];
    const secondValue: readonly string[] = [];
    const firstFactory = vi.fn(() => firstValue);
    const undefinedFactory = vi.fn(() => undefined);
    const secondFactory = vi.fn(() => secondValue);

    expect(first.getOrCreate("value", firstFactory)).toBe(firstValue);
    expect(first.getOrCreate("value", firstFactory)).toBe(firstValue);
    expect(first.getOrCreate("undefined", undefinedFactory)).toBeUndefined();
    expect(first.getOrCreate("undefined", undefinedFactory)).toBeUndefined();
    expect(second.getOrCreate("value", secondFactory)).toBe(secondValue);

    expect(firstFactory).toHaveBeenCalledOnce();
    expect(undefinedFactory).toHaveBeenCalledOnce();
    expect(secondFactory).toHaveBeenCalledOnce();
  });

  it("clears every handle at turn and release boundaries", () => {
    const scope = new TurnScopedCacheScope();
    const first = scope.createCache<string, object>();
    const second = scope.createCache<string, object>();
    const firstFactory = vi.fn(() => ({}));
    const secondFactory = vi.fn(() => ({}));
    const initialFirst = first.getOrCreate("shared", firstFactory);
    const initialSecond = second.getOrCreate("shared", secondFactory);

    scope.beginTurn();

    expect(first.getOrCreate("shared", firstFactory)).not.toBe(initialFirst);
    expect(second.getOrCreate("shared", secondFactory)).not.toBe(initialSecond);

    const nextFirst = first.getOrCreate("shared", firstFactory);
    const nextSecond = second.getOrCreate("shared", secondFactory);
    scope.releaseTransientResources();
    scope.releaseTransientResources();

    expect(first.getOrCreate("shared", firstFactory)).not.toBe(nextFirst);
    expect(second.getOrCreate("shared", secondFactory)).not.toBe(nextSecond);
    expect(firstFactory).toHaveBeenCalledTimes(3);
    expect(secondFactory).toHaveBeenCalledTimes(3);
  });

  it("retains promise settlement and retries synchronous factory failures", async () => {
    const scope = new TurnScopedCacheScope();
    const promises = scope.createCache<string, Promise<string>>();
    const values = scope.createCache<string, string>();
    const rejection = new Error("rejected");
    const rejected = Promise.reject(rejection);
    const rejectedFactory = vi.fn(() => rejected);
    const throwingFactory = vi.fn(() => {
      throw new Error("synchronous failure");
    });

    const first = promises.getOrCreate("key", rejectedFactory);
    const second = promises.getOrCreate("key", rejectedFactory);

    expect(second).toBe(first);
    await expect(first).rejects.toBe(rejection);
    expect(promises.getOrCreate("key", rejectedFactory)).toBe(first);
    expect(rejectedFactory).toHaveBeenCalledOnce();
    expect(() => values.getOrCreate("key", throwingFactory)).toThrow("synchronous failure");
    expect(() => values.getOrCreate("key", throwingFactory)).toThrow("synchronous failure");
    expect(throwingFactory).toHaveBeenCalledTimes(2);
  });

  it("does not let an old promise settlement replace a new turn entry", async () => {
    const scope = new TurnScopedCacheScope();
    const cache = scope.createCache<string, Promise<string>>();
    let settleOld: ((value: string) => void) | undefined;
    const oldPromise = new Promise<string>((resolve) => {
      settleOld = resolve;
    });
    const newPromise = Promise.resolve("new");
    expect(cache.getOrCreate("key", () => oldPromise)).toBe(oldPromise);

    scope.beginTurn();
    expect(cache.getOrCreate("key", () => newPromise)).toBe(newPromise);
    settleOld?.("old");

    await expect(oldPromise).resolves.toBe("old");
    await expect(cache.getOrCreate("key", () => Promise.resolve("other"))).resolves.toBe("new");
  });
});
`},{subject:"pr-127-head",path:"packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",sha256:"634726b911ba263cb8eb55c40bc1f20920efbf6fb476bd85ee1ac8cff5dad8fb",text:`import {
  SymbolNotFoundError,
  TurnScopedCacheScope,
  formatSymbolIdentity,
  type CallEdge,
  type CallTargetResolution,
  type SymbolIdentity,
  type SymbolOverviewNode,
  type SymbolReference,
  type WorkspaceFile,
} from "@symnav/core";
import { Node, type ReferencedSymbolEntry, type SourceFile } from "ts-morph";

import { CallerFinder } from "../call-graph/find-callers.js";
import { findCallees, type PositionDefinitionResolver } from "../call-graph/find-callees.js";
import { findDefinitions } from "../definition/find-definitions.js";
import { classifyReferenceKind } from "../references/classify-reference-kind.js";
import type { TypeScriptProjectGraph } from "./typescript-project-graph.js";
import type { TypeScriptSemanticQueryObserver } from "./typescript-semantic-query-observer.js";
import type { TypeScriptWorkspaceState } from "./typescript-workspace-state.js";

export interface SemanticReferenceLocation {
  readonly relativePath: string;
  readonly start: number;
  readonly length: number;
  readonly isDefinition: boolean;
}

export class TypeScriptSemanticQueryService implements PositionDefinitionResolver {
  private files: readonly WorkspaceFile[] = [];
  private readonly cacheScope = new TurnScopedCacheScope();
  private readonly definitionsByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly SymbolOverviewNode[]>
  >();
  private readonly referencesByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly SemanticReferenceLocation[]>
  >();
  private readonly callTargetsByIdentity = this.cacheScope.createCache<
    string,
    Promise<CallTargetResolution>
  >();
  private readonly callersByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly CallEdge[]>
  >();
  private readonly calleesByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly CallEdge[]>
  >();
  private readonly definitionsByPosition = this.cacheScope.createCache<
    string,
    readonly SemanticNodeLocation[]
  >();

  constructor(
    private readonly projects: TypeScriptProjectGraph | undefined,
    private readonly workspaceState: TypeScriptWorkspaceState,
    private readonly observer?: TypeScriptSemanticQueryObserver,
  ) {}

  beginTurn(files: readonly WorkspaceFile[]): void {
    this.files = files;
    this.cacheScope.beginTurn();
  }

  findDefinitions(identity: SymbolIdentity): Promise<readonly SymbolOverviewNode[]> {
    const key = formatSymbolIdentity(identity);
    return this.definitionsByIdentity.getOrCreate(key, () => {
      this.observer?.definitionSearch?.(identity);
      return findDefinitions({
        workspaceState: this.workspaceState,
        files: this.files,
        identity,
      });
    });
  }

  async findReferences(identity: SymbolIdentity): Promise<readonly SymbolReference[]> {
    const locations = await this.referenceLocations(identity);
    return locations.flatMap((location) => {
      if (location.isDefinition) return [];
      const node = this.workspaceState.nodeAt(location.relativePath, location.start);
      if (!node) return [];
      const sourceFile = node.getSourceFile();
      const { line, character } = sourceFile.compilerNode.getLineAndCharacterOfPosition(
        location.start,
      );
      return [
        {
          file: location.relativePath,
          line: line + 1,
          previewSource: TypeScriptSemanticQueryService.lineText(sourceFile, line),
          matchStart: character,
          matchEnd: character + location.length,
          kind: classifyReferenceKind(node),
        },
      ];
    });
  }

  findCallTarget(identity: SymbolIdentity): Promise<CallTargetResolution> {
    const key = formatSymbolIdentity(identity);
    return this.callTargetsByIdentity.getOrCreate(key, () => this.resolveCallTarget(identity));
  }

  findCallers(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    return this.callersByIdentity.getOrCreate(key, () =>
      this.referenceLocations(identity).then((locations) =>
        new CallerFinder(this.workspaceState).find(locations),
      ),
    );
  }

  findCallees(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    return this.calleesByIdentity.getOrCreate(key, () =>
      findCallees({
        workspaceState: this.workspaceState,
        files: this.files,
        identity,
        definitionResolver: this,
      }),
    );
  }

  async releaseTransientResources(): Promise<void> {
    this.cacheScope.releaseTransientResources();
    await this.projects?.releaseTransientResources();
  }

  definitionNodesOf(node: Node): readonly Node[] {
    if (!Node.isIdentifier(node) && !Node.isPrivateIdentifier(node)) return [];
    const relativePath = this.workspaceState.relativePathOf(node.getSourceFile());
    if (!relativePath) return [];
    const key = \`\${relativePath}:\${node.getStart()}\`;
    const locations = this.definitionsByPosition.getOrCreate(key, () => {
      this.observer?.callTargetResolution?.(relativePath, node.getStart());
      return node.getDefinitionNodes().flatMap((definition) => {
        const definitionRelativePath = this.workspaceState.relativePathOf(
          definition.getSourceFile(),
        );
        return definitionRelativePath
          ? [
              {
                relativePath: definitionRelativePath,
                start: definition.getStart(),
                kind: definition.getKind(),
              },
            ]
          : [];
      });
    });
    return locations.flatMap((location) => {
      const sourceFile = this.projects?.sourceFileFor(location.relativePath);
      const definition = this.nodeAtSemanticLocation(location, sourceFile);
      return definition ? [definition] : [];
    });
  }

  private referenceLocations(
    identity: SymbolIdentity,
  ): Promise<readonly SemanticReferenceLocation[]> {
    const key = formatSymbolIdentity(identity);
    return this.referencesByIdentity.getOrCreate(key, () => {
      this.observer?.referenceSearch?.(identity);
      return Promise.resolve(this.findReferenceLocations(identity));
    });
  }

  private findReferenceLocations(identity: SymbolIdentity): readonly SemanticReferenceLocation[] {
    const declarationNodes = this.workspaceState
      .locateSemanticCopies(identity)
      .map((located) => located.node);
    if (declarationNodes.length === 0) throw new SymbolNotFoundError(identity);
    const locations = declarationNodes.flatMap((declarationNode) =>
      TypeScriptSemanticQueryService.referenceEntriesOf(declarationNode).flatMap((entry) => {
        const node = entry.getNode();
        const relativePath = this.workspaceState.relativePathOf(node.getSourceFile());
        return relativePath
          ? [
              {
                relativePath,
                start: node.getStart(),
                length: node.getWidth(),
                isDefinition: entry.isDefinition() ?? false,
              },
            ]
          : [];
      }),
    );
    const byLocation = new Map<string, SemanticReferenceLocation>();
    for (const location of locations) {
      byLocation.set(
        \`\${location.relativePath}:\${location.start}:\${location.length}:\${location.isDefinition}\`,
        location,
      );
    }
    return [...byLocation.values()];
  }

  private async resolveCallTarget(identity: SymbolIdentity): Promise<CallTargetResolution> {
    const definitions = await this.findDefinitions(identity);
    if (definitions.length === 0) return { outcome: "not-found" };
    const implementations = definitions.filter((definition) =>
      definition.kind.nativeLabel.endsWith("-implementation"),
    );
    if (implementations.length > 1) {
      return { outcome: "ambiguous", candidates: implementations };
    }
    if (implementations.length === 1) {
      return { outcome: "resolved", target: implementations[0]! };
    }
    return { outcome: "resolved", target: definitions[0]! };
  }

  private nodeAtSemanticLocation(
    location: SemanticNodeLocation,
    sourceFile: SourceFile | undefined,
  ): Node | undefined {
    let node =
      sourceFile?.getDescendantAtPos(location.start) ??
      this.workspaceState.nodeAt(location.relativePath, location.start);
    while (node) {
      if (node.getStart() === location.start && node.getKind() === location.kind) return node;
      node = node.getParent();
    }
    return undefined;
  }

  private static referenceEntriesOf(declarationNode: Node): readonly ReferencedSymbolEntry[] {
    if (!Node.isReferenceFindable(declarationNode)) return [];
    return declarationNode
      .findReferences()
      .flatMap((referencedSymbol) => referencedSymbol.getReferences());
  }

  private static lineText(sourceFile: SourceFile, zeroBasedLine: number): string {
    const fullText = sourceFile.getFullText();
    const lineStarts = sourceFile.compilerNode.getLineStarts();
    const start = lineStarts[zeroBasedLine] ?? 0;
    const end =
      zeroBasedLine + 1 < lineStarts.length ? lineStarts[zeroBasedLine + 1]! : fullText.length;
    return fullText.slice(start, end).replace(/\\r?\\n$/, "");
  }
}

interface SemanticNodeLocation {
  readonly relativePath: string;
  readonly start: number;
  readonly kind: number;
}
`},{subject:"pr-127-base",path:"packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",revision:"a1e325a5ff979bdfa25babc5554621c8c0f20497",sha256:"09f0cc439b0d52b503bf826f2afe6027ee17d3508df92a840318b22280e7f8ed",text:`import {
  SymbolNotFoundError,
  formatSymbolIdentity,
  type CallEdge,
  type CallTargetResolution,
  type SymbolIdentity,
  type SymbolOverviewNode,
  type SymbolReference,
  type WorkspaceSnapshot,
} from "@symnav/core";
import { Node, type ReferencedSymbolEntry, type SourceFile } from "ts-morph";

import { CallerFinder } from "../call-graph/find-callers.js";
import { findCallees, type PositionDefinitionResolver } from "../call-graph/find-callees.js";
import { findDefinitions } from "../definition/find-definitions.js";
import { classifyReferenceKind } from "../references/classify-reference-kind.js";
import type { TypeScriptProjectGraph } from "./typescript-project-graph.js";
import type { TypeScriptSemanticQueryObserver } from "./typescript-semantic-query-observer.js";
import type { TypeScriptWorkspaceState } from "./typescript-workspace-state.js";

export interface SemanticReferenceLocation {
  readonly relativePath: string;
  readonly start: number;
  readonly length: number;
  readonly isDefinition: boolean;
}

export class TypeScriptSemanticQueryService implements PositionDefinitionResolver {
  private files: WorkspaceSnapshot["files"] = [];
  private readonly definitionsByIdentity = new Map<
    string,
    Promise<readonly SymbolOverviewNode[]>
  >();
  private readonly referencesByIdentity = new Map<
    string,
    Promise<readonly SemanticReferenceLocation[]>
  >();
  private readonly callTargetsByIdentity = new Map<string, Promise<CallTargetResolution>>();
  private readonly callersByIdentity = new Map<string, Promise<readonly CallEdge[]>>();
  private readonly calleesByIdentity = new Map<string, Promise<readonly CallEdge[]>>();
  private readonly definitionsByPosition = new Map<string, readonly SemanticNodeLocation[]>();

  constructor(
    private readonly projects: TypeScriptProjectGraph | undefined,
    private readonly workspaceState: TypeScriptWorkspaceState,
    private readonly observer?: TypeScriptSemanticQueryObserver,
  ) {}

  beginTurn(snapshot: WorkspaceSnapshot): void {
    this.files = snapshot.files;
    this.clearQueryCaches();
  }

  findDefinitions(identity: SymbolIdentity): Promise<readonly SymbolOverviewNode[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.definitionsByIdentity.get(key);
    if (existing) return existing;
    this.observer?.definitionSearch?.(identity);
    const definitions = findDefinitions({
      workspaceState: this.workspaceState,
      files: this.files,
      identity,
    });
    this.definitionsByIdentity.set(key, definitions);
    return definitions;
  }

  async findReferences(identity: SymbolIdentity): Promise<readonly SymbolReference[]> {
    const locations = await this.referenceLocations(identity);
    return locations.flatMap((location) => {
      if (location.isDefinition) return [];
      const node = this.workspaceState.nodeAt(location.relativePath, location.start);
      if (!node) return [];
      const sourceFile = node.getSourceFile();
      const { line, character } = sourceFile.compilerNode.getLineAndCharacterOfPosition(
        location.start,
      );
      return [
        {
          file: location.relativePath,
          line: line + 1,
          previewSource: TypeScriptSemanticQueryService.lineText(sourceFile, line),
          matchStart: character,
          matchEnd: character + location.length,
          kind: classifyReferenceKind(node),
        },
      ];
    });
  }

  findCallTarget(identity: SymbolIdentity): Promise<CallTargetResolution> {
    const key = formatSymbolIdentity(identity);
    const existing = this.callTargetsByIdentity.get(key);
    if (existing) return existing;
    const resolution = this.resolveCallTarget(identity);
    this.callTargetsByIdentity.set(key, resolution);
    return resolution;
  }

  findCallers(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.callersByIdentity.get(key);
    if (existing) return existing;
    const callers = this.referenceLocations(identity).then((locations) =>
      new CallerFinder(this.workspaceState).find(locations),
    );
    this.callersByIdentity.set(key, callers);
    return callers;
  }

  findCallees(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.calleesByIdentity.get(key);
    if (existing) return existing;
    const callees = findCallees({
      workspaceState: this.workspaceState,
      files: this.files,
      identity,
      definitionResolver: this,
    });
    this.calleesByIdentity.set(key, callees);
    return callees;
  }

  releaseTransientResources(): void {
    this.clearQueryCaches();
    this.projects?.releaseTransientResources();
  }

  definitionNodesOf(node: Node): readonly Node[] {
    if (!Node.isIdentifier(node) && !Node.isPrivateIdentifier(node)) return [];
    const relativePath = this.workspaceState.relativePathOf(node.getSourceFile());
    if (!relativePath) return [];
    const key = \`\${relativePath}:\${node.getStart()}\`;
    let locations = this.definitionsByPosition.get(key);
    if (!locations) {
      this.observer?.callTargetResolution?.(relativePath, node.getStart());
      locations = node.getDefinitionNodes().flatMap((definition) => {
        const definitionRelativePath = this.workspaceState.relativePathOf(
          definition.getSourceFile(),
        );
        return definitionRelativePath
          ? [
              {
                relativePath: definitionRelativePath,
                start: definition.getStart(),
                kind: definition.getKind(),
              },
            ]
          : [];
      });
      this.definitionsByPosition.set(key, locations);
    }
    return locations.flatMap((location) => {
      const sourceFile = this.projects?.sourceFileFor(location.relativePath);
      const definition = this.nodeAtSemanticLocation(location, sourceFile);
      return definition ? [definition] : [];
    });
  }

  private referenceLocations(
    identity: SymbolIdentity,
  ): Promise<readonly SemanticReferenceLocation[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.referencesByIdentity.get(key);
    if (existing) return existing;
    this.observer?.referenceSearch?.(identity);
    const locations = Promise.resolve(this.findReferenceLocations(identity));
    this.referencesByIdentity.set(key, locations);
    return locations;
  }

  private findReferenceLocations(identity: SymbolIdentity): readonly SemanticReferenceLocation[] {
    const declarationNodes = this.workspaceState
      .locateSemanticCopies(identity)
      .map((located) => located.node);
    if (declarationNodes.length === 0) throw new SymbolNotFoundError(identity);
    const locations = declarationNodes.flatMap((declarationNode) =>
      TypeScriptSemanticQueryService.referenceEntriesOf(declarationNode).flatMap((entry) => {
        const node = entry.getNode();
        const relativePath = this.workspaceState.relativePathOf(node.getSourceFile());
        return relativePath
          ? [
              {
                relativePath,
                start: node.getStart(),
                length: node.getWidth(),
                isDefinition: entry.isDefinition() ?? false,
              },
            ]
          : [];
      }),
    );
    const byLocation = new Map<string, SemanticReferenceLocation>();
    for (const location of locations) {
      byLocation.set(
        \`\${location.relativePath}:\${location.start}:\${location.length}:\${location.isDefinition}\`,
        location,
      );
    }
    return [...byLocation.values()];
  }

  private async resolveCallTarget(identity: SymbolIdentity): Promise<CallTargetResolution> {
    const definitions = await this.findDefinitions(identity);
    if (definitions.length === 0) return { outcome: "not-found" };
    const implementations = definitions.filter((definition) =>
      definition.kind.nativeLabel.endsWith("-implementation"),
    );
    if (implementations.length > 1) {
      return { outcome: "ambiguous", candidates: implementations };
    }
    if (implementations.length === 1) {
      return { outcome: "resolved", target: implementations[0]! };
    }
    return { outcome: "resolved", target: definitions[0]! };
  }

  private clearQueryCaches(): void {
    this.definitionsByIdentity.clear();
    this.referencesByIdentity.clear();
    this.callTargetsByIdentity.clear();
    this.callersByIdentity.clear();
    this.calleesByIdentity.clear();
    this.definitionsByPosition.clear();
  }

  private nodeAtSemanticLocation(
    location: SemanticNodeLocation,
    sourceFile: SourceFile | undefined,
  ): Node | undefined {
    let node =
      sourceFile?.getDescendantAtPos(location.start) ??
      this.workspaceState.nodeAt(location.relativePath, location.start);
    while (node) {
      if (node.getStart() === location.start && node.getKind() === location.kind) return node;
      node = node.getParent();
    }
    return undefined;
  }

  private static referenceEntriesOf(declarationNode: Node): readonly ReferencedSymbolEntry[] {
    if (!Node.isReferenceFindable(declarationNode)) return [];
    return declarationNode
      .findReferences()
      .flatMap((referencedSymbol) => referencedSymbol.getReferences());
  }

  private static lineText(sourceFile: SourceFile, zeroBasedLine: number): string {
    const fullText = sourceFile.getFullText();
    const lineStarts = sourceFile.compilerNode.getLineStarts();
    const start = lineStarts[zeroBasedLine] ?? 0;
    const end =
      zeroBasedLine + 1 < lineStarts.length ? lineStarts[zeroBasedLine + 1]! : fullText.length;
    return fullText.slice(start, end).replace(/\\r?\\n$/, "");
  }
}

interface SemanticNodeLocation {
  readonly relativePath: string;
  readonly start: number;
  readonly kind: number;
}
`},{subject:"pr-127-head",path:"packages/backend-typescript/src/typescript-backend/typescript-backend.ts",revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",sha256:"664a16cf34282306d3aa1b9617ddc4cecaadcc4e6d349f21308407257600a572",text:`import { basename } from "node:path";

import type {
  CallEdge,
  CallTargetResolution,
  BackendRefreshRequest,
  BackendRefreshSummary,
  FileSystem,
  LanguageBackend,
  OverviewFileEntries,
  SymbolReference,
  ResolveSymbolsOptions,
  ResolvedPath,
  SymbolOverviewNode,
  SymbolIdentity,
} from "@symnav/core";
import { FileNotFoundError, WorkspaceSourceCache } from "@symnav/core";

import { SymbolResolver } from "../resolve/resolve-symbols.js";
import { TypeScriptProjectGraph } from "./typescript-project-graph.js";
import type { TypeScriptSemanticQueryObserver } from "./typescript-semantic-query-observer.js";
import { TypeScriptSemanticQueryService } from "./typescript-semantic-query-service.js";
import {
  TypeScriptFileEntryExtractor,
  TypeScriptWorkspaceState,
  type TypeScriptFileExtractor,
} from "./typescript-workspace-state.js";

export class TypeScriptBackend implements LanguageBackend {
  static readonly extensions: readonly string[] = [".d.ts", ".ts", ".tsx", ".mts", ".cts"];

  static accepts(filePath: string): boolean {
    const name = basename(filePath);
    for (const ext of TypeScriptBackend.extensions) {
      if (name.endsWith(ext)) {
        return true;
      }
    }
    return false;
  }

  private readonly state: TypeScriptWorkspaceState;
  private readonly projectGraph: TypeScriptProjectGraph | undefined;
  private readonly sourceCache: WorkspaceSourceCache | undefined;
  private readonly semanticQueries: TypeScriptSemanticQueryService;

  constructor(
    private readonly fs: FileSystem,
    state?: TypeScriptWorkspaceState,
    projectGraph?: TypeScriptProjectGraph,
    observer?: TypeScriptSemanticQueryObserver,
    extractor: TypeScriptFileExtractor = new TypeScriptFileEntryExtractor(),
  ) {
    if (state) {
      this.state = state;
      this.projectGraph = projectGraph;
      this.sourceCache = undefined;
      this.semanticQueries = new TypeScriptSemanticQueryService(
        this.projectGraph,
        this.state,
        observer,
      );
      return;
    }
    this.sourceCache = new WorkspaceSourceCache(fs);
    this.projectGraph = projectGraph ?? new TypeScriptProjectGraph(this.sourceCache, observer);
    this.state = new TypeScriptWorkspaceState(this.sourceCache, extractor, this.projectGraph);
    this.semanticQueries = new TypeScriptSemanticQueryService(
      this.projectGraph,
      this.state,
      observer,
    );
  }

  accepts(filePath: string): boolean {
    return TypeScriptBackend.accepts(filePath);
  }

  async refresh(request: BackendRefreshRequest): Promise<BackendRefreshSummary> {
    this.sourceCache?.refresh(request.snapshot);
    if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
    const summary = await this.state.refresh(request.snapshot.files, request.coverage);
    this.semanticQueries.beginTurn(request.snapshot.files);
    return summary;
  }

  async releaseTransientResources(): Promise<void> {
    await this.semanticQueries.releaseTransientResources();
  }

  async fileEntries(file: ResolvedPath): Promise<OverviewFileEntries> {
    if (!this.fs.existsSync(file.absolute) || this.fs.isDirectorySync(file.absolute)) {
      throw new FileNotFoundError(file.relative);
    }
    return await this.state.fileEntries(file);
  }

  async resolveSymbols(
    files: readonly ResolvedPath[],
    query: string,
    options: ResolveSymbolsOptions,
  ): Promise<readonly SymbolOverviewNode[]> {
    return SymbolResolver.resolveSymbols({ state: this.state, files, query, options });
  }

  async declarations(files: readonly ResolvedPath[]): Promise<readonly SymbolOverviewNode[]> {
    return await this.state.declarations(files);
  }

  async findDefinitions(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly SymbolOverviewNode[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findDefinitions(identity);
  }

  async findReferences(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly SymbolReference[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findReferences(identity);
  }

  async findCallTarget(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<CallTargetResolution> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findCallTarget(identity);
  }

  async findCallees(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly CallEdge[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findCallees(identity);
  }

  async findCallers(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly CallEdge[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findCallers(identity);
  }
}
`},{subject:"pr-127-base",path:"packages/backend-typescript/src/typescript-backend/typescript-backend.ts",revision:"a1e325a5ff979bdfa25babc5554621c8c0f20497",sha256:"ed344d37274cba15cff8abea408162df66514a081bf15865299c30a4ed7d1f2a",text:`import { basename } from "node:path";

import type {
  CallEdge,
  CallTargetResolution,
  BackendRefreshRequest,
  BackendRefreshSummary,
  FileSystem,
  LanguageBackend,
  OverviewFileEntries,
  SymbolReference,
  ResolveSymbolsOptions,
  ResolvedPath,
  SymbolOverviewNode,
  SymbolIdentity,
} from "@symnav/core";
import { FileNotFoundError, WorkspaceSourceCache } from "@symnav/core";

import { SymbolResolver } from "../resolve/resolve-symbols.js";
import { TypeScriptProjectGraph } from "./typescript-project-graph.js";
import type { TypeScriptSemanticQueryObserver } from "./typescript-semantic-query-observer.js";
import { TypeScriptSemanticQueryService } from "./typescript-semantic-query-service.js";
import {
  TypeScriptFileEntryExtractor,
  TypeScriptWorkspaceState,
  type TypeScriptFileExtractor,
} from "./typescript-workspace-state.js";

export class TypeScriptBackend implements LanguageBackend {
  static readonly extensions: readonly string[] = [".d.ts", ".ts", ".tsx", ".mts", ".cts"];

  static accepts(filePath: string): boolean {
    const name = basename(filePath);
    for (const ext of TypeScriptBackend.extensions) {
      if (name.endsWith(ext)) {
        return true;
      }
    }
    return false;
  }

  private readonly state: TypeScriptWorkspaceState;
  private readonly projectGraph: TypeScriptProjectGraph | undefined;
  private readonly sourceCache: WorkspaceSourceCache | undefined;
  private readonly semanticQueries: TypeScriptSemanticQueryService;

  constructor(
    private readonly fs: FileSystem,
    state?: TypeScriptWorkspaceState,
    projectGraph?: TypeScriptProjectGraph,
    observer?: TypeScriptSemanticQueryObserver,
    extractor: TypeScriptFileExtractor = new TypeScriptFileEntryExtractor(),
  ) {
    if (state) {
      this.state = state;
      this.projectGraph = projectGraph;
      this.sourceCache = undefined;
      this.semanticQueries = new TypeScriptSemanticQueryService(
        this.projectGraph,
        this.state,
        observer,
      );
      return;
    }
    this.sourceCache = new WorkspaceSourceCache(fs);
    this.projectGraph = projectGraph ?? new TypeScriptProjectGraph(this.sourceCache, observer);
    this.state = new TypeScriptWorkspaceState(this.sourceCache, extractor, this.projectGraph);
    this.semanticQueries = new TypeScriptSemanticQueryService(
      this.projectGraph,
      this.state,
      observer,
    );
  }

  accepts(filePath: string): boolean {
    return TypeScriptBackend.accepts(filePath);
  }

  async refresh(request: BackendRefreshRequest): Promise<BackendRefreshSummary> {
    this.sourceCache?.refresh(request.snapshot);
    if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
    const summary = await this.state.refresh(request.snapshot.files, request.coverage);
    this.semanticQueries.beginTurn(request.snapshot);
    return summary;
  }

  async releaseTransientResources(): Promise<void> {
    this.semanticQueries.releaseTransientResources();
  }

  async fileEntries(file: ResolvedPath): Promise<OverviewFileEntries> {
    if (!this.fs.existsSync(file.absolute) || this.fs.isDirectorySync(file.absolute)) {
      throw new FileNotFoundError(file.relative);
    }
    return await this.state.fileEntries(file);
  }

  async resolveSymbols(
    files: readonly ResolvedPath[],
    query: string,
    options: ResolveSymbolsOptions,
  ): Promise<readonly SymbolOverviewNode[]> {
    return SymbolResolver.resolveSymbols({ state: this.state, files, query, options });
  }

  async declarations(files: readonly ResolvedPath[]): Promise<readonly SymbolOverviewNode[]> {
    return await this.state.declarations(files);
  }

  async findDefinitions(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly SymbolOverviewNode[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findDefinitions(identity);
  }

  async findReferences(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly SymbolReference[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findReferences(identity);
  }

  async findCallTarget(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<CallTargetResolution> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findCallTarget(identity);
  }

  async findCallees(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly CallEdge[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findCallees(identity);
  }

  async findCallers(
    files: readonly ResolvedPath[],
    identity: SymbolIdentity,
  ): Promise<readonly CallEdge[]> {
    await this.state.ensureFiles(files);
    return this.semanticQueries.findCallers(identity);
  }
}
`},{subject:"pr-127-head",path:"packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",sha256:"ad2a4257636c33ff77462a0447652ee1bc674ef68e6f45a86fcd18b69e18bb11",text:`import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";
import { SyntaxKind } from "ts-morph";

import {
  GraphTraverser,
  InMemoryFileSystem,
  NodeFileSystem,
  type SymbolIdentity,
  type WorkspaceFile,
  type WorkspaceSnapshot,
} from "@symnav/core";

import { TypeScriptBackend } from "./typescript-backend.js";
import type { TypeScriptProjectGraph } from "./typescript-project-graph.js";
import { TypeScriptSemanticQueryService } from "./typescript-semantic-query-service.js";
import { TypeScriptWorkspaceState } from "./typescript-workspace-state.js";

const mutableFixtures: MutableSemanticFixture[] = [];

afterEach(() => {
  for (const fixture of mutableFixtures.splice(0)) fixture.dispose();
});

describe("TypeScriptSemanticQueryService", () => {
  it("shares each identity query promise independently within one turn", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/app.ts": [
        "export function target(): void {}",
        "export function caller(): void { target(); }",
        "",
      ].join("\\n"),
    });
    const files = workspaceFiles(fileSystem, "src/app.ts");
    const snapshot: WorkspaceSnapshot = { root: "/repo", files };
    const state = new TypeScriptWorkspaceState(fileSystem);
    await state.refresh(files);
    const queries = new TypeScriptSemanticQueryService(undefined, state);
    const target = identity("src/app.ts", "target");
    const caller = identity("src/app.ts", "caller");
    queries.beginTurn(snapshot.files);

    const definitions = queries.findDefinitions(target);
    const callTarget = queries.findCallTarget(target);
    const callers = queries.findCallers(target);
    const callees = queries.findCallees(caller);

    expect(queries.findDefinitions(target)).toBe(definitions);
    expect(queries.findCallTarget(target)).toBe(callTarget);
    expect(queries.findCallers(target)).toBe(callers);
    expect(queries.findCallees(caller)).toBe(callees);
    await expect(definitions).resolves.toHaveLength(1);
    await expect(callTarget).resolves.toMatchObject({ outcome: "resolved" });
    await expect(callers).resolves.toHaveLength(1);
    await expect(callees).resolves.toHaveLength(1);
  });

  it("caches empty position results while rehydrating nodes for every access", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/app.ts": [
        "export function target(): void {}",
        "export function caller(): void { target(); missing(); }",
        "",
      ].join("\\n"),
    });
    const files = workspaceFiles(fileSystem, "src/app.ts");
    const state = new TypeScriptWorkspaceState(fileSystem);
    await state.refresh(files);
    const resolvedPositions: number[] = [];
    const queries = new TypeScriptSemanticQueryService(undefined, state, {
      callTargetResolution: (_relativePath, start) => resolvedPositions.push(start),
    });
    queries.beginTurn(files);
    const sourceFile = state.sourceFile("src/app.ts");
    const identifiers = sourceFile?.getDescendantsOfKind(SyntaxKind.Identifier) ?? [];
    const targetCall = [...identifiers].reverse().find((node) => node.getText() === "target");
    const missingCall = [...identifiers].reverse().find((node) => node.getText() === "missing");
    if (!targetCall || !missingCall) throw new Error("expected call identifiers");

    const firstDefinitions = queries.definitionNodesOf(targetCall);
    const secondDefinitions = queries.definitionNodesOf(targetCall);
    const firstMissing = queries.definitionNodesOf(missingCall);
    const secondMissing = queries.definitionNodesOf(missingCall);

    expect(firstDefinitions).not.toBe(secondDefinitions);
    expect(firstDefinitions[0]).toBe(secondDefinitions[0]);
    expect(firstMissing).toEqual([]);
    expect(secondMissing).toEqual([]);
    expect(resolvedPositions).toEqual([targetCall.getStart(), missingCall.getStart()]);
  });

  it("retains asynchronous definition and callee failures for the turn", async () => {
    const failure = new Error("semantic failure");
    const ensureFiles = vi.fn(() => Promise.reject(failure));
    const state = { ensureFiles } as unknown as TypeScriptWorkspaceState;
    const queries = new TypeScriptSemanticQueryService(undefined, state);
    const target = identity("src/app.ts", "target");
    queries.beginTurn([]);

    const definitions = queries.findDefinitions(target);
    const callees = queries.findCallees(target);

    expect(queries.findDefinitions(target)).toBe(definitions);
    expect(queries.findCallees(target)).toBe(callees);
    await expect(definitions).rejects.toBe(failure);
    await expect(callees).rejects.toBe(failure);
    expect(ensureFiles).toHaveBeenCalledTimes(2);
  });

  it("retries synchronous reference discovery failures", async () => {
    const failure = new Error("reference failure");
    const locateSemanticCopies = vi.fn(() => {
      throw failure;
    });
    const state = { locateSemanticCopies } as unknown as TypeScriptWorkspaceState;
    let referenceSearches = 0;
    const queries = new TypeScriptSemanticQueryService(undefined, state, {
      referenceSearch: () => {
        referenceSearches += 1;
      },
    });
    const target = identity("src/app.ts", "target");
    queries.beginTurn([]);

    await expect(queries.findReferences(target)).rejects.toBe(failure);
    await expect(queries.findReferences(target)).rejects.toBe(failure);

    expect(locateSemanticCopies).toHaveBeenCalledTimes(2);
    expect(referenceSearches).toBe(2);
  });

  it("preserves the current turn when backend refresh fails", async () => {
    const failure = new Error("refresh failure");
    let refreshFails = false;
    const state = {
      refresh: vi.fn(() => {
        if (refreshFails) return Promise.reject(failure);
        return Promise.resolve({ added: 0, changed: 0, removed: 0, unchanged: 0 });
      }),
      ensureFiles: vi.fn(() => Promise.resolve()),
      locate: vi.fn(() => []),
    } as unknown as TypeScriptWorkspaceState;
    let definitionSearches = 0;
    const backend = new TypeScriptBackend(new InMemoryFileSystem({}), state, undefined, {
      definitionSearch: () => {
        definitionSearches += 1;
      },
    });
    const snapshot: WorkspaceSnapshot = { root: "/repo", files: [] };
    const target = identity("src/app.ts", "target");
    await backend.refresh({ snapshot, coverage: "workspace" });
    const definitions = await backend.findDefinitions([], target);
    refreshFails = true;

    await expect(backend.refresh({ snapshot, coverage: "workspace" })).rejects.toBe(failure);

    await expect(backend.findDefinitions([], target)).resolves.toBe(definitions);
    expect(definitionSearches).toBe(1);
  });

  it("clears caches before awaiting project release and rejects at the backend boundary", async () => {
    const releaseFailure = new Error("project release failed");
    let rejectProjectRelease: ((reason: unknown) => void) | undefined;
    const projectRelease = new Promise<void>((_resolve, reject) => {
      rejectProjectRelease = reject;
    });
    void projectRelease.catch(() => undefined);
    const firstProjectRelease = vi.fn(() => projectRelease);
    const laterProjectRelease = vi.fn();
    const projectGraph = {
      releaseTransientResources: vi.fn(async () => {
        await firstProjectRelease();
        laterProjectRelease();
      }),
    } as unknown as TypeScriptProjectGraph;
    const state = {
      refresh: vi.fn(() => Promise.resolve({ added: 0, changed: 0, removed: 0, unchanged: 0 })),
      ensureFiles: vi.fn(() => Promise.resolve()),
      locate: vi.fn(() => []),
    } as unknown as TypeScriptWorkspaceState;
    let definitionSearches = 0;
    const backend = new TypeScriptBackend(new InMemoryFileSystem({}), state, projectGraph, {
      definitionSearch: () => {
        definitionSearches += 1;
      },
    });
    const snapshot: WorkspaceSnapshot = { root: "/repo", files: [] };
    const target = identity("src/app.ts", "target");
    await backend.refresh({ snapshot, coverage: "selection" });
    const beforeRelease = await backend.findDefinitions([], target);

    const release = backend.releaseTransientResources();
    let releaseSettled = false;
    void release.then(
      () => {
        releaseSettled = true;
      },
      () => {
        releaseSettled = true;
      },
    );
    const afterRelease = await backend.findDefinitions([], target);

    expect(afterRelease).not.toBe(beforeRelease);
    expect(definitionSearches).toBe(2);
    expect(projectGraph.releaseTransientResources).toHaveBeenCalledOnce();
    await Promise.resolve();
    expect(releaseSettled).toBe(false);

    rejectProjectRelease?.(releaseFailure);
    await expect(release).rejects.toBe(releaseFailure);
    expect(firstProjectRelease).toHaveBeenCalledOnce();
    expect(laterProjectRelease).not.toHaveBeenCalled();
  });

  it("shares one reference search across caller and reference projections", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/lib.ts": "export function target(): void {}\\n",
      "/repo/src/app.ts": [
        'import { target } from "./lib.js";',
        "export function caller(): void { target(); }",
        "",
      ].join("\\n"),
    });
    const referenceSearches: SymbolIdentity[] = [];
    const backend = new TypeScriptBackend(fileSystem, undefined, undefined, {
      referenceSearch: (identity) => referenceSearches.push(identity),
    });
    const files = workspaceFiles(fileSystem, "src/app.ts", "src/lib.ts");
    const target = identity("src/lib.ts", "target");
    await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });

    await expect(backend.findCallers(files, target)).resolves.toHaveLength(1);
    await expect(backend.findReferences(files, target)).resolves.toHaveLength(2);
    expect(referenceSearches).toEqual([target]);
  });

  it("shares caches within one turn and clears them for the next turn", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/lib.ts": "export function target(): void {}\\n",
      "/repo/src/app.ts": [
        'import { target } from "./lib.js";',
        "export function caller(): void { target(); }",
        "",
      ].join("\\n"),
    });
    let referenceSearches = 0;
    const backend = new TypeScriptBackend(fileSystem, undefined, undefined, {
      referenceSearch: () => {
        referenceSearches += 1;
      },
    });
    const files = workspaceFiles(fileSystem, "src/app.ts", "src/lib.ts");
    const snapshot: WorkspaceSnapshot = { root: "/repo", files };
    const target = identity("src/lib.ts", "target");
    await backend.refresh({ snapshot, coverage: "workspace" });

    await backend.findReferences(files, target);
    await backend.findReferences(files, target);
    expect(referenceSearches).toBe(1);

    await backend.refresh({ snapshot, coverage: "workspace" });
    await backend.findReferences(files, target);
    expect(referenceSearches).toBe(2);
  });

  it("resolves each call position once while grouping repeated targets", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/app.ts": [
        "export function target(value: string): string;",
        "export function target(value: number): string;",
        "export function target(value: string | number): string { return String(value); }",
        "export function caller(): string { return \`\${target(1)}:\${target('x')}\`; }",
        "",
      ].join("\\n"),
    });
    const resolvedPositions: string[] = [];
    const backend = new TypeScriptBackend(fileSystem, undefined, undefined, {
      callTargetResolution: (relativePath, start) =>
        resolvedPositions.push(\`\${relativePath}:\${start}\`),
    });
    const files = workspaceFiles(fileSystem, "src/app.ts");
    const caller = identity("src/app.ts", "caller");
    await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });

    const first = await backend.findCallees(files, caller);
    const second = await backend.findCallees(files, caller);

    expect(first).toBe(second);
    expect(first.map((edge) => edge.symbol.kind.nativeLabel)).toEqual([
      "function-overload-signature",
      "function-overload-signature",
    ]);
    expect(resolvedPositions).toHaveLength(2);
    expect(new Set(resolvedPositions).size).toBe(2);
  });

  it("queries each declaration position once across diamond graph paths", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/graph.ts": [
        "export function leaf(): void {}",
        "export function left(): void { leaf(); }",
        "export function right(): void { leaf(); }",
        "export function root(): void { left(); right(); }",
        "",
      ].join("\\n"),
    });
    const resolvedPositions: string[] = [];
    const backend = new TypeScriptBackend(fileSystem, undefined, undefined, {
      callTargetResolution: (relativePath, start) =>
        resolvedPositions.push(\`\${relativePath}:\${start}\`),
    });
    const files = workspaceFiles(fileSystem, "src/graph.ts");
    await backend.refresh({ snapshot: { root: "/repo", files }, coverage: "workspace" });
    const [root] = await backend.findDefinitions(files, identity("src/graph.ts", "root"));
    if (!root) throw new Error("expected root declaration");

    const paths = await new GraphTraverser({ backend, files, root, depth: 2 }).traverseOutgoing();

    expect(paths).toHaveLength(2);
    expect(paths.map((path) => path.steps.at(-1)?.symbol.identity)).toEqual([
      identity("src/graph.ts", "leaf"),
      identity("src/graph.ts", "leaf"),
    ]);
    expect(resolvedPositions).toHaveLength(4);
    expect(new Set(resolvedPositions).size).toBe(4);
  });

  it("rebuilds released fresh semantics once in an unchanged turn", async () => {
    const fixture = new MutableSemanticFixture();
    mutableFixtures.push(fixture);
    let referenceSearches = 0;
    let semanticReleases = 0;
    let semanticProjectLoads = 0;
    const backend = new TypeScriptBackend(fixture.fileSystem, undefined, undefined, {
      referenceSearch: () => {
        referenceSearches += 1;
      },
      semanticCacheReleased: () => {
        semanticReleases += 1;
      },
      semanticProjectLoaded: () => {
        semanticProjectLoads += 1;
      },
    });
    let snapshot = await fixture.snapshot();
    let files = snapshot.files;
    const stable = identity("src/stable.ts", "stableTarget");
    const original = identity("src/lib.ts", "originalTarget");
    await backend.refresh({ snapshot, coverage: "workspace" });
    const [preparedDeclaration] = await backend.findDefinitions(files, stable);
    const stableFile = files.find((file) => file.relative === "src/stable.ts");
    if (!stableFile) throw new Error("expected stable source");
    const preparedEntries = await backend.fileEntries(stableFile);
    await expect(backend.findReferences(files, original)).resolves.toHaveLength(2);
    expect(semanticProjectLoads).toBe(1);

    fixture.writeConfiguration("@fresh");
    fixture.write("src/lib.ts", "export function freshTarget(): void {}\\n");
    fixture.write(
      "src/app.ts",
      [
        'import { freshTarget } from "@fresh";',
        "export function caller(): void { freshTarget(); }",
        "",
      ].join("\\n"),
    );
    snapshot = await fixture.snapshot();
    files = snapshot.files;
    await backend.refresh({ snapshot, coverage: "workspace" });

    await expect(
      backend.resolveSymbols(files, "originalTarget", { mode: "exact" }),
    ).resolves.toEqual([]);
    await expect(backend.findDefinitions(files, stable)).resolves.toContain(preparedDeclaration);
    await expect(backend.fileEntries(stableFile)).resolves.toBe(preparedEntries);

    const fresh = identity("src/lib.ts", "freshTarget");
    const preparedReferences = await backend.findReferences(files, fresh);
    const preparedCallers = await backend.findCallers(files, fresh);
    const preparedCallees = await backend.findCallees(files, fresh);
    expect(semanticProjectLoads).toBe(2);
    expect(referenceSearches).toBe(2);

    await backend.releaseTransientResources();
    await backend.refresh({ snapshot, coverage: "workspace" });

    expect(semanticReleases).toBe(1);
    expect(semanticProjectLoads).toBe(2);
    await expect(backend.findDefinitions(files, stable)).resolves.toContain(preparedDeclaration);
    await expect(backend.fileEntries(stableFile)).resolves.toBe(preparedEntries);

    await expect(backend.findReferences(files, fresh)).resolves.toEqual(preparedReferences);
    expect(semanticProjectLoads).toBe(3);
    await expect(backend.findCallers(files, fresh)).resolves.toEqual(preparedCallers);
    await expect(backend.findCallees(files, fresh)).resolves.toEqual(preparedCallees);
    expect(semanticProjectLoads).toBe(3);
    expect(referenceSearches).toBe(3);
  });
});

class MutableSemanticFixture {
  readonly root = mkdtempSync(join(tmpdir(), "symnav-semantic-release-"));
  readonly fileSystem = new NodeFileSystem();

  constructor() {
    mkdirSync(join(this.root, "src"), { recursive: true });
    this.writeConfiguration("@original");
    this.write("src/lib.ts", "export function originalTarget(): void {}\\n");
    this.write(
      "src/app.ts",
      [
        'import { originalTarget } from "@original";',
        "export function caller(): void { originalTarget(); }",
        "",
      ].join("\\n"),
    );
    this.write("src/stable.ts", "export function stableTarget(): void {}\\n");
  }

  dispose(): void {
    rmSync(this.root, { recursive: true, force: true });
  }

  write(relativePath: string, content: string): void {
    writeFileSync(join(this.root, relativePath), content);
  }

  writeConfiguration(alias: string): void {
    this.write(
      "tsconfig.json",
      JSON.stringify({
        compilerOptions: { baseUrl: ".", paths: { [alias]: ["src/lib.ts"] } },
        include: ["src/**/*.ts"],
      }),
    );
  }

  async snapshot(): Promise<WorkspaceSnapshot> {
    const relativePaths = ["src/app.ts", "src/lib.ts", "src/stable.ts"];
    return {
      root: this.root.replaceAll("\\\\", "/"),
      files: await Promise.all(
        relativePaths.map(async (relativePath) => {
          const absolute = join(this.root, relativePath).replaceAll("\\\\", "/");
          return {
            relative: relative(this.root, absolute).replaceAll("\\\\", "/"),
            absolute,
            metadata: await this.fileSystem.metadata(absolute),
          };
        }),
      ),
    };
  }
}

function workspaceFiles(
  fileSystem: InMemoryFileSystem,
  ...relativePaths: readonly string[]
): readonly WorkspaceFile[] {
  return relativePaths.map((relative) => ({
    relative,
    absolute: \`/repo/\${relative}\`,
    metadata: fileSystem.metadataSync(\`/repo/\${relative}\`),
  }));
}

function identity(file: string, name: string): SymbolIdentity {
  return { file, segments: [{ name }] };
}
`},{subject:"pr-127-head",path:"plans/005/daemon-architecture-functional-spec.md",revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",sha256:"6055a00fc460ece848159e7e90e32c3f454425d4cb911425a9fef73f329c282b",text:`# Symnav Daemon Architecture Functional Spec

## Goal

Restructure the merged daemon work so each concern lives in the package that owns it: a self-contained daemon package that knows nothing about symbols, a core that knows nothing about daemons, a TypeScript backend that holds only TypeScript-specific logic, and a CLI app that only composes. The daemon's user-facing behavior is defined in \`daemon-functional-spec.md\` and does not change. This is refactor work: not a rewrite of the daemon, not a change to any command's output or timing, and not a new language backend. This spec defines product behavior for contributors and hosts of the packages; implementation choices live in the phased plans.

## Primary User

**Contributors** changing symnav. Their default experience: a package boundary tells them where a concern belongs, and the build refuses an import that crosses the locked dependency graph.

**Hosts** composing the packages into a runnable product. The CLI app is the first host. A future host (editor extension, MCP server, benchmark harness) composes the same packages the same way. No host reaches into another package's internals.

End users of the \`symnav\` binary observe no change from this work.

## Core Guarantees

### Behavior is unchanged

This is a refactor. Every command, daemon lifecycle action, diagnostic record, telemetry event, and failure path behaves as it does today.

\`\`\`text
Given the same workspace, arguments, environment, and daemon state, output bytes,
exit code, execution mode, and lifecycle outcome are identical before and after.
\`\`\`

Correct: a restructuring change passes the existing e2e parity and daemon suites without touching a single expectation. Incorrect: a restructuring change "fixes" a queue, eviction, timeout, or path while moving code.

There is no "it was obviously a bug" override. Behavior defects found during restructuring are recorded in \`daemon-follow-ups-functional-spec.md\` and changed separately.

### The daemon package depends on nothing internal

The daemon package imports no other symnav package. It moves bytes for an executor it is handed; it does not know what a symbol, workspace snapshot, or backend is.

\`\`\`text
@symnav/daemon may import: (nothing internal)
\`\`\`

Correct: the daemon logs a worker's refresh counters as an opaque diagnostics record supplied by the executor. Incorrect: the daemon's protocol names a core type to describe those counters.

There is no exception for "just a type".

### Core knows nothing about daemons or processes

Core answers questions about a workspace and its symbols. It has no concept of a background process, socket, registry, warm-up, or route. Retaining state across requests means keeping a core object alive; core does not ask its host how to persist anything.

\`\`\`text
Core has no persistence port, no daemon port, and no notion of warm vs cold.
Warm = the same session object answers again. Cold = a new session object.
\`\`\`

There is no persistence abstraction until a second consumer of one exists.

### A language backend holds only language-specific logic

A concept that another language could share lives in core as a base the backend extends. The backend supplies only what depends on the language's toolchain.

\`\`\`text
Shared in core: file revision tracking, prepared-file index, declarations-by-identity,
transactional index publication, project-membership graph with input invalidation,
turn-scoped query cache lifecycle.
TypeScript-only: extraction from TypeScript syntax trees, tsconfig parsing (extends,
references, path aliases, include/exclude), program and language-service creation,
semantic query bodies.
\`\`\`

### The CLI app is composition only

\`apps/cli\` parses command-line syntax, resolves environment (state directory, daemon enabled), creates concrete dependencies, wires packages together, and prints. It holds no daemon policy, no workspace policy, and no navigation logic.

\`\`\`text
A decision about routing, admission, ownership, delivery, memory, or lifetime that
lives in apps/cli is a defect.
\`\`\`

### Every threshold has one owner and a recorded reason

Numeric limits (memory caps, spool caps, deadlines, idle timeout, probe timeout, trace retention, replacement circuit, reattachment attempts) live in one policy object inside the daemon package, each with a stated reason in a policy record under \`plans/\`. Tests override the policy object; users cannot.

\`\`\`text
No CLI flag, environment variable, or config file tunes a daemon threshold.
\`\`\`

This restates the no-tuning rule from \`daemon-functional-spec.md\`; it is not relaxed here.

## Scope

### Included

- New \`@symnav/daemon\` package owning entry points, process launch, election, registry, transport, worker threads, admission, queueing, delivery, spooling, resource supervision, lifetime, diagnostics, and its own clock.
- Executor contract defined by the daemon package; CLI implements it.
- Executor reaches the daemon's worker as an injected module location, dynamically loaded.
- CLI keeps argv classification and hands the daemon client a workspace root plus argv.
- Core \`WorkspaceSession\` replacing the CLI's request-scope factory.
- Core revisioned-backend base, project-graph base, turn-scoped cache; TypeScript backend extends them. \`WorkspaceSourceCache\` moves to core.
- State-directory resolution moves from telemetry to the CLI; telemetry and daemon receive a path.
- Daemon lifecycle rendering moves to \`@symnav/renderer\`.
- Admission and client routing restructured as ordered guard lists with one closed rejection vocabulary.
- \`WorkspaceDaemon\` split into process coordinator, accepted-execution session, delivery session, worker-generation manager, activity projector.
- \`LocalDaemonTransport\` split into codec/validator, lifecycle client, execution client, result receiver, socket client, socket server.
- One owner each for command-name vocabulary, lock-ownership check, retry-safety decision, and \`DaemonExecutionFailureCode\` (worker variant renamed).
- Dependency table, ESLint boundaries, project references, meta-tests, \`CLAUDE.md\`, and \`symnav-stages.md\` updated together with the package introduction. Telemetry added to the table.

### Excluded

- Any change to navigation command output, exit codes, or \`daemon start|status|stop\` output.
- Renaming \`@symnav/renderer\`. Revisit when a second output family exists.
- A persistence port in core or an on-disk index for cold runs.
- New CLI flags or environment variables.
- A second language backend.
- Any restructuring that changes an e2e parity or daemon suite expectation.
- Behavior changes surfaced by the reviews. Specified in \`daemon-follow-ups-functional-spec.md\`; they land after this restructuring.

## Interaction Model

### What a host provides to the daemon package

- An executor: given argv, working directory, and telemetry flag, produces an ordered stream of stdout/stderr byte records and an exit code; can also release transient caches on request.
- The location of a module that constructs that executor, so the daemon's worker can load it in another thread or process.
- A state directory path.
- The product version, for compatibility checks.
- Per invocation: a workspace root and argv, or a control action (\`start\`, \`status\`, \`stop\`).

### What a host receives

- \`execute(workspaceRoot, argv)\`: a result identical in bytes to local execution, produced warm, cold, or by fallback. The host does not learn which route was taken except through the execution mode recorded for telemetry.
- \`control(action)\`: a lifecycle report the host renders.

### What a host must not do

- Read or write registry, socket, spool, or log files directly.
- Decide warm vs cold.
- Import from the daemon package's internal modules; only its public surface.

### Locked dependency graph

| Package                      | May depend on (internal)                                                          |
| ---------------------------- | --------------------------------------------------------------------------------- |
| \`@symnav/core\`               | (nothing)                                                                         |
| \`@symnav/daemon\`             | (nothing)                                                                         |
| \`@symnav/telemetry\`          | (nothing)                                                                         |
| \`@symnav/renderer\`           | \`@symnav/core\`, \`@symnav/daemon\`                                                  |
| \`@symnav/backend-typescript\` | \`@symnav/core\`                                                                    |
| \`symnav\` (apps/cli)          | \`@symnav/core\`, \`@symnav/daemon\`, \`@symnav/telemetry\`, \`@symnav/renderer\`, \`@symnav/backend-typescript\` |
| \`@symnav/testing\`            | (nothing)                                                                         |

A forbidden import fails both \`pnpm typecheck\` and \`pnpm lint\`.

## Output Format

### Package layout after restructuring

\`\`\`text
packages/core
  workspace, workspace session, revisioned backend base, project-graph base,
  turn-scoped cache, source cache, navigation IR, backend ports
packages/daemon
  entries, launcher, election, registry, transport (client, server, codec),
  admission, queue, ledger, execution session, delivery session, spool,
  resource supervisor, worker generations, lifetime, diagnostics, policy, clock
packages/backend-typescript
  TypeScript extraction, tsconfig graph, semantic queries
packages/renderer
  text and JSON formatters, including daemon lifecycle reports
packages/telemetry
  usage events, recorder, aggregation
apps/cli
  argv classification, environment resolution, dependency creation, entry
  module for the daemon executor, command registration, printing
\`\`\`

### Policy record

\`plans/005/daemon-policy.md\` lists every threshold with value and reason. A threshold absent from the record is a defect.

## Cross-cutting Concerns

### Verification baseline

The passing e2e parity and daemon suites on main are the baseline. The full-suite teardown flake and the unhandled daemon rejection are fixed before restructuring starts, so that baseline is green. Restructuring matches it exactly; a restructuring change that needs a test expectation changed is mis-scoped.

### Documentation

\`CLAUDE.md\` repo layout and dependency table, \`plans/000/symnav-stages.md\` package list update together with the introduction of \`@symnav/daemon\`.

## Daemon Package Extraction

**Purpose.** Give daemon policy and mechanism one home with an enforced boundary.

**Produces.** \`@symnav/daemon\` with a public surface of: client (execute, control), process entry, worker entry, executor contract, policy object, lifecycle report shapes.

**Does not produce.** Any navigation logic, any dependence on core, any knowledge of Commander syntax.

**Example.** A contributor adds a new admission check. They add one guard in the daemon package and one rejection code. Nothing in \`apps/cli\` changes.

**Edge cases.** Tests and benchmarks that imported daemon modules by deep relative path switch to the package's public surface or move into the package.

## Executor Contract and Module Injection

**Purpose.** Let the daemon run commands without knowing what they are.

**Produces.** The daemon defines the executor's shape. The CLI implements it by re-parsing argv through the normal command program with retained backends. The CLI passes the location of its executor module; the daemon forwards it to the spawned process and worker thread, which load it and verify the expected export exists.

**Does not produce.** A typed navigation request. A second execution path that bypasses the command program.

**Edge cases.** Module missing or export absent: the worker reports a startup failure with a closed failure code; the daemon publishes failed startup; ordinary commands keep executing locally.

## Client Routing Boundary

**Purpose.** Keep CLI syntax in the CLI and daemon routing in the daemon.

**Produces.** CLI classifies argv into local, control, or workspace; extracts \`--cwd\`; resolves the workspace root via core. Daemon client receives the root and argv and decides warm, cold, cold-plus-trigger, or fallback.

**Does not produce.** A daemon that parses argv for anything but forwarding. A CLI that reads registry records.

**Defaults.** Unchanged from \`daemon-functional-spec.md\` routing table.

## Workspace Session in Core

**Purpose.** Make retention a core object rather than CLI wiring.

**Produces.** A session owning the workspace catalog and backends; prepares a scope (workspace, snapshot, router, refresh summary) for a start directory, with optional file selection. Cold runs create one per process; the daemon's worker keeps one alive.

**Does not produce.** Any persistence beyond the process lifetime.

## Revisioned Backend Base

**Purpose.** Move language-agnostic retention out of the TypeScript backend.

**Produces.** A core base that diffs file revisions, asks the subclass to prepare only added or changed files, publishes the index transactionally, tracks declarations by identity, and scopes a query cache to one turn. A core project-graph base that discovers configuration units, invalidates on input change, maps files to projects, and holds an inferred fallback project. The TypeScript backend extends both.

**Does not produce.** Changes to what any command returns. A second backend.

**Edge cases.** A backend that cannot prepare partially implements prepare as full rebuild; the base does not require partial support.

## State Directory and Clock Ownership

**Purpose.** Stop telemetry acting as a shared utilities package.

**Produces.** CLI resolves \`SYMNAV_STATE_DIR\` or \`~/.symnav\` once and passes the path to telemetry and daemon. Daemon owns its wall and monotonic clock. Telemetry keeps only its own path helpers.

## Lifecycle Rendering

**Purpose.** Keep all formatting in the renderer package.

**Produces.** Text and JSON rendering of start, status, and stop reports in \`@symnav/renderer\`, byte-identical to current output.

## Guard-List Admission and Routing

**Purpose.** Make the check order readable and each check testable alone.

**Produces.** Admission: an ordered list (authenticated, worker ready, memory not paused, not draining, not a conflicting duplicate) where the first failing guard stops with a rejection code. Routing: an ordered list (record present, not starting, version compatible, responsive) producing warm, cold with reason, or fallback with reason. One closed rejection vocabulary owns "safe to retry locally".

**Does not produce.** Chains for startup election, result delivery, or wire framing; those stay state machines.

## Summary

| Item                          | One line                                                                  |
| ----------------------------- | ------------------------------------------------------------------------- |
| \`@symnav/daemon\`              | Zero-dependency package owning every daemon concern                      |
| Executor contract             | Daemon-defined; CLI implements; injected as a module location            |
| Routing boundary              | CLI classifies argv; daemon client routes                                |
| \`WorkspaceSession\`            | Core owns retention as an object; no persistence port                    |
| Revisioned backend base       | Core owns revision diff, index, project graph, turn cache                 |
| State dir and clock           | CLI resolves path; daemon owns its clock; telemetry is a leaf            |
| Lifecycle rendering           | Moves to renderer; renderer may depend on daemon                          |
| Guard lists                   | Admission and routing as ordered guards with one rejection vocabulary    |
| Policy record                 | All thresholds in one object, reasons in \`plans/005/daemon-policy.md\`    |
| Behavior                      | Unchanged; defects found while restructuring are tracked separately      |
`},{subject:"pr-131-head",path:"plans/005/daemon-architecture-functional-spec.md",revision:"b100221db48754656328391b878299c5a0bab443",sha256:"6055a00fc460ece848159e7e90e32c3f454425d4cb911425a9fef73f329c282b",text:`# Symnav Daemon Architecture Functional Spec

## Goal

Restructure the merged daemon work so each concern lives in the package that owns it: a self-contained daemon package that knows nothing about symbols, a core that knows nothing about daemons, a TypeScript backend that holds only TypeScript-specific logic, and a CLI app that only composes. The daemon's user-facing behavior is defined in \`daemon-functional-spec.md\` and does not change. This is refactor work: not a rewrite of the daemon, not a change to any command's output or timing, and not a new language backend. This spec defines product behavior for contributors and hosts of the packages; implementation choices live in the phased plans.

## Primary User

**Contributors** changing symnav. Their default experience: a package boundary tells them where a concern belongs, and the build refuses an import that crosses the locked dependency graph.

**Hosts** composing the packages into a runnable product. The CLI app is the first host. A future host (editor extension, MCP server, benchmark harness) composes the same packages the same way. No host reaches into another package's internals.

End users of the \`symnav\` binary observe no change from this work.

## Core Guarantees

### Behavior is unchanged

This is a refactor. Every command, daemon lifecycle action, diagnostic record, telemetry event, and failure path behaves as it does today.

\`\`\`text
Given the same workspace, arguments, environment, and daemon state, output bytes,
exit code, execution mode, and lifecycle outcome are identical before and after.
\`\`\`

Correct: a restructuring change passes the existing e2e parity and daemon suites without touching a single expectation. Incorrect: a restructuring change "fixes" a queue, eviction, timeout, or path while moving code.

There is no "it was obviously a bug" override. Behavior defects found during restructuring are recorded in \`daemon-follow-ups-functional-spec.md\` and changed separately.

### The daemon package depends on nothing internal

The daemon package imports no other symnav package. It moves bytes for an executor it is handed; it does not know what a symbol, workspace snapshot, or backend is.

\`\`\`text
@symnav/daemon may import: (nothing internal)
\`\`\`

Correct: the daemon logs a worker's refresh counters as an opaque diagnostics record supplied by the executor. Incorrect: the daemon's protocol names a core type to describe those counters.

There is no exception for "just a type".

### Core knows nothing about daemons or processes

Core answers questions about a workspace and its symbols. It has no concept of a background process, socket, registry, warm-up, or route. Retaining state across requests means keeping a core object alive; core does not ask its host how to persist anything.

\`\`\`text
Core has no persistence port, no daemon port, and no notion of warm vs cold.
Warm = the same session object answers again. Cold = a new session object.
\`\`\`

There is no persistence abstraction until a second consumer of one exists.

### A language backend holds only language-specific logic

A concept that another language could share lives in core as a base the backend extends. The backend supplies only what depends on the language's toolchain.

\`\`\`text
Shared in core: file revision tracking, prepared-file index, declarations-by-identity,
transactional index publication, project-membership graph with input invalidation,
turn-scoped query cache lifecycle.
TypeScript-only: extraction from TypeScript syntax trees, tsconfig parsing (extends,
references, path aliases, include/exclude), program and language-service creation,
semantic query bodies.
\`\`\`

### The CLI app is composition only

\`apps/cli\` parses command-line syntax, resolves environment (state directory, daemon enabled), creates concrete dependencies, wires packages together, and prints. It holds no daemon policy, no workspace policy, and no navigation logic.

\`\`\`text
A decision about routing, admission, ownership, delivery, memory, or lifetime that
lives in apps/cli is a defect.
\`\`\`

### Every threshold has one owner and a recorded reason

Numeric limits (memory caps, spool caps, deadlines, idle timeout, probe timeout, trace retention, replacement circuit, reattachment attempts) live in one policy object inside the daemon package, each with a stated reason in a policy record under \`plans/\`. Tests override the policy object; users cannot.

\`\`\`text
No CLI flag, environment variable, or config file tunes a daemon threshold.
\`\`\`

This restates the no-tuning rule from \`daemon-functional-spec.md\`; it is not relaxed here.

## Scope

### Included

- New \`@symnav/daemon\` package owning entry points, process launch, election, registry, transport, worker threads, admission, queueing, delivery, spooling, resource supervision, lifetime, diagnostics, and its own clock.
- Executor contract defined by the daemon package; CLI implements it.
- Executor reaches the daemon's worker as an injected module location, dynamically loaded.
- CLI keeps argv classification and hands the daemon client a workspace root plus argv.
- Core \`WorkspaceSession\` replacing the CLI's request-scope factory.
- Core revisioned-backend base, project-graph base, turn-scoped cache; TypeScript backend extends them. \`WorkspaceSourceCache\` moves to core.
- State-directory resolution moves from telemetry to the CLI; telemetry and daemon receive a path.
- Daemon lifecycle rendering moves to \`@symnav/renderer\`.
- Admission and client routing restructured as ordered guard lists with one closed rejection vocabulary.
- \`WorkspaceDaemon\` split into process coordinator, accepted-execution session, delivery session, worker-generation manager, activity projector.
- \`LocalDaemonTransport\` split into codec/validator, lifecycle client, execution client, result receiver, socket client, socket server.
- One owner each for command-name vocabulary, lock-ownership check, retry-safety decision, and \`DaemonExecutionFailureCode\` (worker variant renamed).
- Dependency table, ESLint boundaries, project references, meta-tests, \`CLAUDE.md\`, and \`symnav-stages.md\` updated together with the package introduction. Telemetry added to the table.

### Excluded

- Any change to navigation command output, exit codes, or \`daemon start|status|stop\` output.
- Renaming \`@symnav/renderer\`. Revisit when a second output family exists.
- A persistence port in core or an on-disk index for cold runs.
- New CLI flags or environment variables.
- A second language backend.
- Any restructuring that changes an e2e parity or daemon suite expectation.
- Behavior changes surfaced by the reviews. Specified in \`daemon-follow-ups-functional-spec.md\`; they land after this restructuring.

## Interaction Model

### What a host provides to the daemon package

- An executor: given argv, working directory, and telemetry flag, produces an ordered stream of stdout/stderr byte records and an exit code; can also release transient caches on request.
- The location of a module that constructs that executor, so the daemon's worker can load it in another thread or process.
- A state directory path.
- The product version, for compatibility checks.
- Per invocation: a workspace root and argv, or a control action (\`start\`, \`status\`, \`stop\`).

### What a host receives

- \`execute(workspaceRoot, argv)\`: a result identical in bytes to local execution, produced warm, cold, or by fallback. The host does not learn which route was taken except through the execution mode recorded for telemetry.
- \`control(action)\`: a lifecycle report the host renders.

### What a host must not do

- Read or write registry, socket, spool, or log files directly.
- Decide warm vs cold.
- Import from the daemon package's internal modules; only its public surface.

### Locked dependency graph

| Package                      | May depend on (internal)                                                          |
| ---------------------------- | --------------------------------------------------------------------------------- |
| \`@symnav/core\`               | (nothing)                                                                         |
| \`@symnav/daemon\`             | (nothing)                                                                         |
| \`@symnav/telemetry\`          | (nothing)                                                                         |
| \`@symnav/renderer\`           | \`@symnav/core\`, \`@symnav/daemon\`                                                  |
| \`@symnav/backend-typescript\` | \`@symnav/core\`                                                                    |
| \`symnav\` (apps/cli)          | \`@symnav/core\`, \`@symnav/daemon\`, \`@symnav/telemetry\`, \`@symnav/renderer\`, \`@symnav/backend-typescript\` |
| \`@symnav/testing\`            | (nothing)                                                                         |

A forbidden import fails both \`pnpm typecheck\` and \`pnpm lint\`.

## Output Format

### Package layout after restructuring

\`\`\`text
packages/core
  workspace, workspace session, revisioned backend base, project-graph base,
  turn-scoped cache, source cache, navigation IR, backend ports
packages/daemon
  entries, launcher, election, registry, transport (client, server, codec),
  admission, queue, ledger, execution session, delivery session, spool,
  resource supervisor, worker generations, lifetime, diagnostics, policy, clock
packages/backend-typescript
  TypeScript extraction, tsconfig graph, semantic queries
packages/renderer
  text and JSON formatters, including daemon lifecycle reports
packages/telemetry
  usage events, recorder, aggregation
apps/cli
  argv classification, environment resolution, dependency creation, entry
  module for the daemon executor, command registration, printing
\`\`\`

### Policy record

\`plans/005/daemon-policy.md\` lists every threshold with value and reason. A threshold absent from the record is a defect.

## Cross-cutting Concerns

### Verification baseline

The passing e2e parity and daemon suites on main are the baseline. The full-suite teardown flake and the unhandled daemon rejection are fixed before restructuring starts, so that baseline is green. Restructuring matches it exactly; a restructuring change that needs a test expectation changed is mis-scoped.

### Documentation

\`CLAUDE.md\` repo layout and dependency table, \`plans/000/symnav-stages.md\` package list update together with the introduction of \`@symnav/daemon\`.

## Daemon Package Extraction

**Purpose.** Give daemon policy and mechanism one home with an enforced boundary.

**Produces.** \`@symnav/daemon\` with a public surface of: client (execute, control), process entry, worker entry, executor contract, policy object, lifecycle report shapes.

**Does not produce.** Any navigation logic, any dependence on core, any knowledge of Commander syntax.

**Example.** A contributor adds a new admission check. They add one guard in the daemon package and one rejection code. Nothing in \`apps/cli\` changes.

**Edge cases.** Tests and benchmarks that imported daemon modules by deep relative path switch to the package's public surface or move into the package.

## Executor Contract and Module Injection

**Purpose.** Let the daemon run commands without knowing what they are.

**Produces.** The daemon defines the executor's shape. The CLI implements it by re-parsing argv through the normal command program with retained backends. The CLI passes the location of its executor module; the daemon forwards it to the spawned process and worker thread, which load it and verify the expected export exists.

**Does not produce.** A typed navigation request. A second execution path that bypasses the command program.

**Edge cases.** Module missing or export absent: the worker reports a startup failure with a closed failure code; the daemon publishes failed startup; ordinary commands keep executing locally.

## Client Routing Boundary

**Purpose.** Keep CLI syntax in the CLI and daemon routing in the daemon.

**Produces.** CLI classifies argv into local, control, or workspace; extracts \`--cwd\`; resolves the workspace root via core. Daemon client receives the root and argv and decides warm, cold, cold-plus-trigger, or fallback.

**Does not produce.** A daemon that parses argv for anything but forwarding. A CLI that reads registry records.

**Defaults.** Unchanged from \`daemon-functional-spec.md\` routing table.

## Workspace Session in Core

**Purpose.** Make retention a core object rather than CLI wiring.

**Produces.** A session owning the workspace catalog and backends; prepares a scope (workspace, snapshot, router, refresh summary) for a start directory, with optional file selection. Cold runs create one per process; the daemon's worker keeps one alive.

**Does not produce.** Any persistence beyond the process lifetime.

## Revisioned Backend Base

**Purpose.** Move language-agnostic retention out of the TypeScript backend.

**Produces.** A core base that diffs file revisions, asks the subclass to prepare only added or changed files, publishes the index transactionally, tracks declarations by identity, and scopes a query cache to one turn. A core project-graph base that discovers configuration units, invalidates on input change, maps files to projects, and holds an inferred fallback project. The TypeScript backend extends both.

**Does not produce.** Changes to what any command returns. A second backend.

**Edge cases.** A backend that cannot prepare partially implements prepare as full rebuild; the base does not require partial support.

## State Directory and Clock Ownership

**Purpose.** Stop telemetry acting as a shared utilities package.

**Produces.** CLI resolves \`SYMNAV_STATE_DIR\` or \`~/.symnav\` once and passes the path to telemetry and daemon. Daemon owns its wall and monotonic clock. Telemetry keeps only its own path helpers.

## Lifecycle Rendering

**Purpose.** Keep all formatting in the renderer package.

**Produces.** Text and JSON rendering of start, status, and stop reports in \`@symnav/renderer\`, byte-identical to current output.

## Guard-List Admission and Routing

**Purpose.** Make the check order readable and each check testable alone.

**Produces.** Admission: an ordered list (authenticated, worker ready, memory not paused, not draining, not a conflicting duplicate) where the first failing guard stops with a rejection code. Routing: an ordered list (record present, not starting, version compatible, responsive) producing warm, cold with reason, or fallback with reason. One closed rejection vocabulary owns "safe to retry locally".

**Does not produce.** Chains for startup election, result delivery, or wire framing; those stay state machines.

## Summary

| Item                          | One line                                                                  |
| ----------------------------- | ------------------------------------------------------------------------- |
| \`@symnav/daemon\`              | Zero-dependency package owning every daemon concern                      |
| Executor contract             | Daemon-defined; CLI implements; injected as a module location            |
| Routing boundary              | CLI classifies argv; daemon client routes                                |
| \`WorkspaceSession\`            | Core owns retention as an object; no persistence port                    |
| Revisioned backend base       | Core owns revision diff, index, project graph, turn cache                 |
| State dir and clock           | CLI resolves path; daemon owns its clock; telemetry is a leaf            |
| Lifecycle rendering           | Moves to renderer; renderer may depend on daemon                          |
| Guard lists                   | Admission and routing as ordered guards with one rejection vocabulary    |
| Policy record                 | All thresholds in one object, reasons in \`plans/005/daemon-policy.md\`    |
| Behavior                      | Unchanged; defects found while restructuring are tracked separately      |
`},{subject:"pr-131-head",path:"plans/005/daemon-policy.md",revision:"b100221db48754656328391b878299c5a0bab443",sha256:"4aded525f7ad50cba20985d358719472d231cb16a8b9e5e361bcf4a7a2718c08",text:"# Daemon policy\n\n`DaemonPolicy` is one immutable, complete snapshot. The CLI creates it from system memory and passes the same serialized values through daemon process and worker boundaries. Tests may replace individual values through `DaemonPolicyTestFactory`; users have no flag, environment variable, or configuration file for these values.\n\n| Policy path or recipe | Default or derivation | Applies to | Reason | Behavior oracle |\n| --- | --- | --- | --- | --- |\n| `transport.singleResponseTimeoutMs` | 250 ms | Ordinary lifecycle and execution-status exchanges | Bound one-response local socket waits | Transport timeout characterization |\n| `transport.statusResponseTimeoutMs` | 100 ms | Status observer lifecycle exchange | Keep status aggregation responsive independently of routing | Status timeout characterization |\n| `transport.executionAdmissionTimeoutMs` | 5 s | Execute submission until acceptance | Bound admission without timing accepted completion | Long-command transport characterization |\n| `transport.maximumJsonPayloadBytes` | 8 MiB | Ordinary JSON control frames | Bound decoded control input | Transport frame-cap tests |\n| `transport.maximumExecutionControlPayloadBytes` | 256 KiB | Execution transfer control frames | Keep binary-transfer control bounded separately | Transfer codec tests |\n| `startup.coordinationGraceMs` | 15 s | Startup ownership and missing-owner observation | Preserve election recovery grace | Registry/startup suites |\n| `startup.heartbeatIntervalMs` | 100 ms | Startup-owner heartbeat | Maintain live ownership while warming | Startup heartbeat tests |\n| `startup.authorizationPollIntervalMs` | 10 ms | Process authorization wait | Preserve the distinct fast authorization cadence | Authorization cadence characterization |\n| `startup.observationPollIntervalMs` | 20 ms | Launcher readiness observation | Preserve current readiness polling cadence | Startup observation tests |\n| `startup.previousInstanceTerminationTimeoutMs` | 5 min | Replacement of a previous instance | Allow controlled termination before new ownership proceeds | Startup replacement tests |\n| `startup.childFailureRetryLimit` | 1 retry | Explicit startup child failure | Preserve one fresh launch after a failed child | Startup retry tests |\n| `shutdown.idleTimeoutMs` | 30 min | Warm daemon idle lifetime | Release retained resources after inactivity | Lifetime tests |\n| `shutdown.stopTimeoutMs` | 5 s | User-requested stop | Bound graceful stop and forced escalation together | Controller stop tests |\n| `shutdown.forcedTerminationReserveMaximumMs` | 500 ms | Stop escalation reserve | Leave bounded time for authenticated force termination | Controller deadline tests |\n| `recipe.forcedTerminationReserve` | `min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2))` | Effective stop escalation reserve | Preserve small overridden stop windows | Controller deadline tests |\n| `shutdown.controllerPollIntervalMs` | 20 ms | Controller process/registry observation | Preserve control-plane polling cadence | Controller polling tests |\n| `shutdown.processSignalExitTimeoutMs` | 500 ms after SIGTERM and 500 ms after SIGKILL | Direct process termination | Give each signal a bounded exit interval | Process terminator tests |\n| `shutdown.processExitPollIntervalMs` | 20 ms | Direct process termination | Preserve process-exit polling cadence independently | Process terminator tests |\n| `shutdown.resourceDrainAcknowledgementGraceMs` | 250 ms | Completion acknowledgement during drain | Permit an attached client to acknowledge before cleanup | Shutdown acknowledgement tests |\n| `shutdown.resourceDrainAcknowledgementPollIntervalMs` | 5 ms | Completion acknowledgement during drain | Preserve the distinct fast acknowledgement cadence | Acknowledgement cadence characterization |\n| `delivery.postAcceptanceExecutionReattachmentLimit` | 1 reattachment | Authenticated close after acceptance | Recover the accepted request without local replay | Reattachment tests |\n| `delivery.resultTransferResumeLimitPerExecutionAttempt` | 1 fetch resume per execute attempt | Interrupted manifest transfer | Resume one transfer independently for each execute attempt | Two-scope resume tests |\n| `output.maximumChunkRawBytes` | 64 KiB | Worker and result chunks | Bound one raw output record | Chunk codec and spool tests |\n| `output.inlineRawBytes` | 256 KiB | Inline result storage | Avoid files for small results | Spool threshold tests |\n| `output.maximumResultRawBytes` | 256 MiB | One completed result | Bound retained output for one request | Result-cap tests |\n| `output.maximumAggregateSpoolRawBytes` | 512 MiB | All retained completions for one daemon | Bound aggregate spool pressure | Aggregate-cap tests |\n| `recipe.effectiveMemorySelection` | Use constrained bytes only when positive and smaller than total bytes; preserve selected raw bytes | Memory derivation input | Respect real lower constraints without rounding identity | Policy derivation table |\n| `resources.effectiveMemoryBytes` | Selected raw effective bytes | Resource reports and derived thresholds | Preserve non-MiB-aligned system information exactly | Policy derivation table |\n| `recipe.effectiveMemoryMiB` | `max(1, floor(effectiveMemoryBytes / MiB))` | Memory threshold derivation | Give sub-MiB inputs a stable minimum | Policy boundary tests |\n| `recipe.hardProcessRss` | `clamp(floor(effectiveMemoryMiB / 2), 256, 8192) * MiB` | Hard daemon RSS limit | Reserve memory for the host while bounding small and large systems | Policy boundary tests |\n| `resources.hardProcessRssBytes` | Hard-process-RSS recipe | Process replacement and worker launch | Trigger controlled replacement before OOM | Resource supervision tests |\n| `resources.softProcessRssBytes` | `floor(hardProcessRssMiB * 0.8) * MiB` | Transient resource shedding | Shed before hard replacement | Resource hysteresis tests |\n| `resources.resumeProcessRssBytes` | `floor(hardProcessRssMiB * 0.7) * MiB` | Admission resumption | Require lower RSS before resuming work | Resource hysteresis tests |\n| `recipe.workerOldGeneration` | `clamp(floor(effectiveMemoryMiB / 4), 128, 4096)` MiB | Worker V8 old generation | Bound worker heap within process budget | Worker launch tests |\n| `resources.workerMaxOldGenerationSizeMiB` | Worker-old-generation recipe | Worker resource limits | Pass the derived V8 limit unchanged | Process/worker snapshot test |\n| `resources.supervisionIntervalMs` | 250 ms | Process RSS and spool sampling | Detect sustained pressure without per-operation overhead | Resource cadence tests |\n| `resources.replacementWindowMs` | 10 min | Replacement circuit | Count only recent replacements | Replacement-window tests |\n| `resources.replacementLimit` | 2 replacements; third drains | Replacement circuit | Stop persistent replacement churn | Persistent-pressure tests |\n| `resources.workerHeapSampleIntervalMs` | 25 ms | Active worker heap high-water sampling | Observe short-lived heap peaks | Worker cadence characterization |\n| `diagnostics.logRotateBytes` | 10 MiB | Diagnostic log rotation | Bound active diagnostic file size | Logger rotation tests |\n| `diagnostics.logBackupCount` | 4 backups plus active log | Diagnostic log rotation | Retain a bounded diagnostic history | Logger backup tests |\n| `diagnostics.maximumQueuedEvents` | 1,024 | Pending diagnostic writes | Bound memory when storage is slow | Logger queue tests |\n| `diagnostics.disconnectedTraceRetentionMs` | 5 min | Disconnected operation traces | Retain reconnect evidence without changing result retention | Trace expiry tests |\n| `diagnostics.maximumDisconnectedTraces` | 1,024 with effective minimum 1 | Disconnected operation traces | Bound diagnostic-only retention | Trace capacity tests |\n\n## Intentional absences\n\n| Deadline | Value | Reason |\n| --- | --- | --- |\n| healthy startup | None | Progressing warm-up has no project-size deadline. |\n| startup silence | None | Silence handling is deferred to the daemon follow-up contract. |\n| post-accept completion | None | Accepted work is not replayed or failed because it runs long. |\n| worker output acknowledgement | None | Backpressure waits for durable consumption without a timer. |\n| unacknowledged result | None | Retention eviction is deferred to the daemon follow-up contract. |\n\n## Migration access\n\n`DaemonPolicy.fromSerialized` and `DaemonPolicy.toSerialized` are temporary public root methods while app-owned process and worker entries require a complete-snapshot bridge. Phase 29 removes them after those entries move into the daemon package.\n\nPhase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local. The subpath exports only `DaemonPolicyTestFactory` and production imports are rejected by lint and meta-tests.\n"},{subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport.ts",revision:"b100221db48754656328391b878299c5a0bab443",sha256:"bcfd94769970174510a26cd495bbbdf25fc527cf0a5643ca5c909c59be41f0e8",text:`import { existsSync, mkdirSync, rmSync } from "node:fs";
import { createConnection, createServer, type Server, type Socket } from "node:net";
import { dirname } from "node:path";
import type { DaemonPolicyValues } from "@symnav/daemon";
import { OrderedCommandOutput, type CommandExecutionResult } from "../command-execution-result.js";
import type {
  DaemonExecuteRequest,
  DaemonExecutionFailureCode,
  DaemonExecutionServerFrame,
  DaemonExecutionStatus,
  DaemonExecutionStatusRequest,
  DaemonExecutionStatusResponse,
  DaemonLifecycleRequest,
  DaemonLifecycleResponse,
  DaemonResultAcknowledgement,
  DaemonResultChunk,
  DaemonRequest,
  DaemonResponse,
  DaemonServerMessage,
  DaemonServer,
} from "./daemon-protocol.js";
import { DaemonResultChunkCodec, DaemonTransferFrameDecoder } from "./daemon-result-chunk-codec.js";
import { DaemonRuntimeValues } from "./daemon-runtime-values.js";
import type { CompletionSpoolManifest } from "./completion-spool.js";

interface LocalDaemonTransportOptions {
  readonly responseTimeoutPurpose?: "ordinary" | "status-observer";
  readonly writeChunkSize?: number;
  readonly outputDirectory?: string;
}

export type LocalDaemonTransportPolicy = Pick<
  DaemonPolicyValues,
  "transport" | "delivery" | "output"
>;

export interface DaemonServerSend {
  (response: DaemonServerMessage): Promise<void>;
  onClose(listener: () => void): () => void;
}

export type DaemonDeliveryState = "not-submitted" | "submitted-unconfirmed" | "accepted";

export type DaemonTransportFailureCode =
  | "unreachable"
  | "timeout"
  | "corrupt"
  | "incompatible"
  | "authentication"
  | "closed"
  | "rejected";

export interface DaemonExecutionAcceptance {
  readonly requestId: string;
  readonly instanceId: string;
  readonly acceptedAt: number;
  readonly queuePosition: number;
}

export interface DaemonExecutionReceipt {
  readonly acceptance: DaemonExecutionAcceptance;
  readonly completion: Promise<
    | { readonly status: "completed"; readonly result: CommandExecutionResult }
    | { readonly status: "failed"; readonly code: DaemonExecutionFailureCode }
  >;
}

export class DaemonTransportError extends Error {
  readonly authenticatedInstanceId?: string;
  readonly retrySafe: boolean;

  constructor(
    readonly code: DaemonTransportFailureCode,
    readonly delivery: DaemonDeliveryState,
    message: string,
    authenticatedInstanceId?: string,
    retrySafe = delivery === "not-submitted",
  ) {
    super(message);
    this.name = "DaemonTransportError";
    if (authenticatedInstanceId !== undefined) {
      this.authenticatedInstanceId = authenticatedInstanceId;
    }
    this.retrySafe = retrySafe;
  }
}

class DaemonResponseError extends Error {
  constructor(
    readonly code: Extract<
      DaemonTransportFailureCode,
      "authentication" | "corrupt" | "incompatible"
    >,
    message: string,
    readonly authenticatedInstanceId?: string,
  ) {
    super(message);
  }
}

class DaemonFrameDecoder {
  private buffered = Buffer.alloc(0);

  constructor(private readonly maximumFrameBytes: number) {}

  append(bytes: Buffer): readonly unknown[] {
    this.buffered = Buffer.concat([this.buffered, bytes]);
    const values: unknown[] = [];
    while (this.buffered.length >= 4) {
      const payloadLength = this.buffered.readUInt32BE(0);
      if (payloadLength > this.maximumFrameBytes) {
        throw new Error(\`Daemon frame exceeds \${this.maximumFrameBytes} bytes\`);
      }
      if (this.buffered.length < payloadLength + 4) break;
      const payload = this.buffered.subarray(4, payloadLength + 4);
      this.buffered = this.buffered.subarray(payloadLength + 4);
      try {
        values.push(JSON.parse(payload.toString("utf8")));
      } catch {
        throw new Error("Daemon frame contains malformed JSON");
      }
    }
    return values;
  }

  assertComplete(): void {
    if (this.buffered.length !== 0) {
      throw new Error("Daemon connection ended with a truncated frame");
    }
  }
}

class DaemonResultTransferReceiver {
  private expectedManifest: CompletionSpoolManifest | undefined;
  private nextRecordOffset: number;
  private manifestReceived = false;
  private terminalReceived = false;

  constructor(
    private readonly request: DaemonExecuteRequest,
    private readonly output: OrderedCommandOutput,
    manifest?: CompletionSpoolManifest,
    initialOffset = 0,
  ) {
    this.expectedManifest = manifest;
    this.nextRecordOffset = initialOffset;
  }

  get manifest(): CompletionSpoolManifest | undefined {
    return this.expectedManifest;
  }

  get nextOffset(): number {
    return this.nextRecordOffset;
  }

  get terminal(): boolean {
    return this.terminalReceived;
  }

  beginConnection(): void {
    this.manifestReceived = false;
    this.terminalReceived = false;
  }

  acceptManifest(
    frame: Extract<DaemonExecutionServerFrame, { readonly kind: "result-manifest" }>,
  ): void {
    if (this.manifestReceived || this.terminalReceived) {
      throw new Error("Duplicate result manifest");
    }
    if (
      this.expectedManifest !== undefined &&
      !DaemonResultTransferReceiver.manifestsMatch(this.expectedManifest, frame.manifest)
    ) {
      throw new Error("Daemon resumed with a different result manifest");
    }
    this.expectedManifest ??= frame.manifest;
    this.manifestReceived = true;
  }

  async acceptChunk(chunk: DaemonResultChunk): Promise<void> {
    const manifest = this.expectedManifest;
    if (
      !this.manifestReceived ||
      this.terminalReceived ||
      manifest === undefined ||
      chunk.requestId !== this.request.requestId ||
      chunk.transferId !== manifest.transferId ||
      chunk.offset !== this.nextRecordOffset ||
      chunk.sequence !== this.nextRecordOffset
    ) {
      throw new Error("Daemon returned an invalid result chunk");
    }
    await this.output.appendRecord({
      sequence: chunk.sequence,
      stream: chunk.stream,
      bytes: chunk.bytes,
    });
    this.nextRecordOffset += 1;
  }

  acceptEnd(frame: Extract<DaemonExecutionServerFrame, { readonly kind: "result-end" }>): void {
    const manifest = this.expectedManifest;
    if (
      !this.manifestReceived ||
      this.terminalReceived ||
      manifest === undefined ||
      frame.transferId !== manifest.transferId ||
      frame.rawBytes !== manifest.rawBytes ||
      frame.recordCount !== manifest.recordCount ||
      frame.sha256 !== manifest.sha256 ||
      this.nextRecordOffset !== manifest.recordCount
    ) {
      throw new Error("Daemon result transfer did not match its manifest");
    }
    this.terminalReceived = true;
  }

  async finish(): Promise<CommandExecutionResult> {
    const manifest = this.expectedManifest;
    if (!this.terminalReceived || manifest === undefined) {
      throw new Error("Daemon result transfer is incomplete");
    }
    const result = await this.output.finish(manifest.exitCode);
    if (!DaemonResultTransferReceiver.summariesMatch(result.output.summary, manifest)) {
      await result.output.dispose();
      throw new Error("Daemon result transfer failed digest validation");
    }
    return result;
  }

  private static manifestsMatch(
    expected: CompletionSpoolManifest,
    actual: CompletionSpoolManifest,
  ): boolean {
    return (
      actual.transferId === expected.transferId &&
      actual.requestId === expected.requestId &&
      actual.instanceId === expected.instanceId &&
      actual.exitCode === expected.exitCode &&
      DaemonResultTransferReceiver.summariesMatch(actual, expected)
    );
  }

  private static summariesMatch(
    actual: CompletionSpoolManifest | CommandExecutionResult["output"]["summary"],
    expected: CompletionSpoolManifest,
  ): boolean {
    return (
      actual.rawBytes === expected.rawBytes &&
      actual.recordCount === expected.recordCount &&
      actual.sha256 === expected.sha256
    );
  }
}

class ListeningDaemonServer implements DaemonServer {
  constructor(
    private readonly server: Server,
    private readonly sockets: ReadonlySet<Socket>,
  ) {}

  close(force = false): Promise<void> {
    if (force) {
      for (const socket of this.sockets) socket.destroy();
    }
    if (!this.server.listening) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this.server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

export class LocalDaemonTransport {
  private readonly maximumFrameBytes: number;
  private readonly requestTimeoutMs: number;
  private readonly executionRequestTimeoutMs: number;
  private readonly writeChunkSize: number | undefined;
  private readonly outputDirectory: string | undefined;
  private readonly maximumControlFrameBytes: number;
  private readonly maximumChunkRawBytes: number;
  private readonly outputPolicy: DaemonPolicyValues["output"];
  private readonly deliveryPolicy: DaemonPolicyValues["delivery"];

  constructor(policy: LocalDaemonTransportPolicy, options: LocalDaemonTransportOptions = {}) {
    this.maximumFrameBytes = policy.transport.maximumJsonPayloadBytes;
    this.requestTimeoutMs =
      options.responseTimeoutPurpose === "status-observer"
        ? policy.transport.statusResponseTimeoutMs
        : policy.transport.singleResponseTimeoutMs;
    this.executionRequestTimeoutMs = policy.transport.executionAdmissionTimeoutMs;
    this.maximumControlFrameBytes = policy.transport.maximumExecutionControlPayloadBytes;
    this.maximumChunkRawBytes = policy.output.maximumChunkRawBytes;
    this.outputPolicy = policy.output;
    this.deliveryPolicy = policy.delivery;
    this.writeChunkSize = options.writeChunkSize;
    this.outputDirectory = options.outputDirectory;
  }

  canFrame(value: unknown): boolean {
    try {
      this.encodeFrame(value);
      return true;
    } catch {
      return false;
    }
  }

  request(endpoint: string, request: DaemonLifecycleRequest): Promise<DaemonLifecycleResponse> {
    return this.singleResponse(endpoint, request);
  }

  private singleResponse(
    endpoint: string,
    request: DaemonLifecycleRequest,
  ): Promise<DaemonLifecycleResponse>;
  private singleResponse(
    endpoint: string,
    request: DaemonExecutionStatusRequest,
  ): Promise<DaemonExecutionStatusResponse>;
  private singleResponse(
    endpoint: string,
    request: DaemonLifecycleRequest | DaemonExecutionStatusRequest,
  ): Promise<DaemonLifecycleResponse | DaemonExecutionStatusResponse> {
    LocalDaemonTransport.assertRequest(request);
    return new Promise((resolve, reject) => {
      const decoder = new DaemonFrameDecoder(this.maximumFrameBytes);
      const socket = createConnection(endpoint);
      let settled = false;
      let delivery: DaemonDeliveryState = "not-submitted";
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(LocalDaemonTransport.transportError(error, delivery));
      };
      socket.setTimeout(this.requestTimeoutMs, () =>
        fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out")),
      );
      socket.once("error", (error) => {
        if (delivery === "not-submitted") {
          fail(new DaemonTransportError("unreachable", delivery, error.message));
          return;
        }
        fail(new DaemonTransportError("closed", delivery, error.message));
      });
      socket.once("connect", () => {
        try {
          this.writeFrame(socket, request);
          delivery = "submitted-unconfirmed";
        } catch (error) {
          fail(error);
        }
      });
      socket.on("data", (bytes) => {
        try {
          const values = decoder.append(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes));
          if (values.length > 1 || (values.length === 1 && settled)) {
            fail(new Error("Daemon returned multiple responses"));
            return;
          }
          const value = values[0];
          if (value === undefined) return;
          const response = LocalDaemonTransport.responseFor(request, value);
          delivery = "accepted";
          settled = true;
          socket.end();
          resolve(response);
        } catch (error) {
          fail(error);
        }
      });
      socket.once("end", () => {
        if (settled) return;
        try {
          decoder.assertComplete();
          fail(
            new DaemonTransportError(
              "closed",
              delivery,
              "Daemon connection ended before a response",
            ),
          );
        } catch (error) {
          fail(error);
        }
      });
    });
  }

  execute(endpoint: string, request: DaemonExecuteRequest): Promise<DaemonExecutionReceipt> {
    return this.executeOnce(endpoint, request).then((receipt) => ({
      acceptance: receipt.acceptance,
      completion: this.completeWithReattachments(endpoint, request, receipt.completion),
    }));
  }

  private async completeWithReattachments(
    endpoint: string,
    request: DaemonExecuteRequest,
    completion: DaemonExecutionReceipt["completion"],
  ): DaemonExecutionReceipt["completion"] {
    let currentCompletion = completion;
    let reattachmentCount = 0;
    while (true) {
      try {
        return await currentCompletion;
      } catch (firstError) {
        if (
          !LocalDaemonTransport.isAcceptedConnectionClose(firstError, request) ||
          reattachmentCount >= this.deliveryPolicy.postAcceptanceExecutionReattachmentLimit
        ) {
          throw firstError;
        }
        try {
          const reattached = await this.executeOnce(endpoint, request);
          currentCompletion = reattached.completion;
          reattachmentCount += 1;
        } catch {
          throw firstError;
        }
      }
    }
  }

  private executeOnce(
    endpoint: string,
    request: DaemonExecuteRequest,
  ): Promise<DaemonExecutionReceipt> {
    LocalDaemonTransport.assertRequest(request);
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(
        this.maximumControlFrameBytes,
        this.maximumChunkRawBytes,
      );
      const output = new OrderedCommandOutput({
        policy: this.outputPolicy,
        ...(this.outputDirectory === undefined ? {} : { directory: this.outputDirectory }),
      });
      const transfer = new DaemonResultTransferReceiver(request, output);
      const socket = createConnection(endpoint);
      let delivery: DaemonDeliveryState = "not-submitted";
      let acceptance: DaemonExecutionAcceptance | undefined;
      let terminal = false;
      let outerSettled = false;
      let completionSettled = false;
      let resumeCount = 0;
      let resolveCompletion!: (value: Awaited<DaemonExecutionReceipt["completion"]>) => void;
      let rejectCompletion!: (error: DaemonTransportError) => void;
      const completion = new Promise<Awaited<DaemonExecutionReceipt["completion"]>>(
        (completionResolve, completionReject) => {
          resolveCompletion = completionResolve;
          rejectCompletion = completionReject;
        },
      );
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        const transportError = LocalDaemonTransport.transportError(error, delivery);
        socket.destroy();
        if (!outerSettled) {
          outerSettled = true;
          void output.dispose().finally(() => reject(transportError));
          return;
        }
        if (!completionSettled) {
          completionSettled = true;
          void output.dispose().finally(() => rejectCompletion(transportError));
        }
      };
      const resume = (): boolean => {
        if (
          resumeCount >= this.deliveryPolicy.resultTransferResumeLimitPerExecutionAttempt ||
          completionSettled ||
          acceptance === undefined ||
          transfer.manifest === undefined ||
          terminal
        ) {
          return false;
        }
        resumeCount += 1;
        socket.destroy();
        transfer.beginConnection();
        void this.fetchCompletion(endpoint, request, output, transfer)
          .then((completionValue) => {
            if (completionSettled) return;
            completionSettled = true;
            resolveCompletion(completionValue);
          })
          .catch(fail);
        return true;
      };
      socket.setTimeout(this.executionRequestTimeoutMs, () =>
        fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out")),
      );
      socket.once("error", (error) => {
        void consumption
          .then(() => {
            if (resume()) return;
            fail(
              new DaemonTransportError(
                delivery === "not-submitted" ? "unreachable" : "closed",
                delivery,
                error.message,
                acceptance?.instanceId,
              ),
            );
          })
          .catch(fail);
      });
      socket.once("connect", () => {
        try {
          const encoded = this.encodeFrame(request);
          delivery = "submitted-unconfirmed";
          this.writeEncodedFrame(socket, encoded);
        } catch (error) {
          fail(error);
        }
      });
      const publishAcceptance = (): void => {
        if (acceptance === undefined || outerSettled) return;
        outerSettled = true;
        socket.setTimeout(0);
        resolve({ acceptance, completion });
      };
      const consume = async (bytes: Buffer): Promise<void> => {
        const values = decoder.append(bytes);
        let completedResult = false;
        let failedCode: DaemonExecutionFailureCode | undefined;
        for (const value of values) {
          if (LocalDaemonTransport.isResultChunk(value)) {
            if (acceptance === undefined)
              throw new Error("Daemon returned output before acceptance");
            await transfer.acceptChunk(value);
            continue;
          }
          const frame = LocalDaemonTransport.executionFrameFor(request, value);
          if (frame.kind === "rejected") {
            if (acceptance !== undefined || terminal) {
              throw new Error("Daemon rejected an already accepted request");
            }
            throw new DaemonTransportError(
              "rejected",
              "submitted-unconfirmed",
              \`Daemon rejected execution: \${frame.code}\`,
              frame.instanceId,
              frame.retrySafe,
            );
          }
          if (frame.kind === "accepted") {
            if (acceptance !== undefined || terminal) {
              throw new Error("Daemon returned duplicate acceptance");
            }
            delivery = "accepted";
            acceptance = {
              requestId: frame.requestId,
              instanceId: frame.instanceId,
              acceptedAt: frame.acceptedAt,
              queuePosition: frame.queuePosition,
            };
            publishAcceptance();
            continue;
          }
          if (acceptance === undefined) {
            throw new Error("Daemon returned completion before acceptance");
          }
          if (frame.kind === "result-manifest") {
            if (terminal) throw new Error("Daemon returned a manifest after completion");
            transfer.acceptManifest(frame);
            continue;
          }
          if (frame.kind === "result-end") {
            transfer.acceptEnd(frame);
            terminal = true;
            completedResult = true;
            continue;
          }
          if (terminal) throw new Error("Daemon returned duplicate terminal frame");
          terminal = true;
          failedCode = frame.code;
        }
        if (completedResult) {
          const result = await transfer.finish();
          const completedManifest = transfer.manifest;
          if (completedManifest === undefined) throw new Error("Completion manifest is missing");
          await this.acknowledgeResult(endpoint, request, completedManifest);
          if (!completionSettled) {
            completionSettled = true;
            socket.end();
            resolveCompletion({ status: "completed", result });
          }
        }
        if (failedCode !== undefined && !completionSettled) {
          completionSettled = true;
          socket.end();
          await output.dispose();
          resolveCompletion({ status: "failed", code: failedCode });
        }
      };
      socket.on("data", (bytes) => {
        socket.pause();
        consumption = consumption
          .then(() => consume(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)))
          .then(() => {
            if (!socket.destroyed && !terminal) socket.resume();
          });
        void consumption.catch(fail);
      });
      socket.once("end", () => {
        void consumption
          .then(() => {
            if (terminal && completionSettled) return;
            if (resume()) return;
            decoder.assertComplete();
            fail(
              new DaemonTransportError(
                "closed",
                delivery,
                acceptance === undefined
                  ? "Daemon connection ended before acceptance"
                  : "Daemon connection ended after acceptance before completion",
                acceptance?.instanceId,
              ),
            );
          })
          .catch(fail);
      });
    });
  }

  private static isAcceptedConnectionClose(
    error: unknown,
    request: DaemonExecuteRequest,
  ): error is DaemonTransportError {
    return (
      error instanceof DaemonTransportError &&
      error.code === "closed" &&
      error.delivery === "accepted" &&
      error.authenticatedInstanceId === request.instanceId
    );
  }

  private fetchCompletion(
    endpoint: string,
    request: DaemonExecuteRequest,
    output: OrderedCommandOutput,
    transfer: DaemonResultTransferReceiver,
  ): DaemonExecutionReceipt["completion"] {
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(
        this.maximumControlFrameBytes,
        this.maximumChunkRawBytes,
      );
      const socket = createConnection(endpoint);
      let ended = false;
      let settled = false;
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(LocalDaemonTransport.transportError(error, "accepted"));
      };
      socket.once("error", (error) => {
        void consumption
          .then(() =>
            fail(new DaemonTransportError("closed", "accepted", error.message, request.instanceId)),
          )
          .catch(fail);
      });
      socket.once("connect", () => {
        this.writeFrame(socket, {
          kind: "result-fetch",
          protocolVersion: request.protocolVersion,
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          offset: transfer.nextOffset,
        });
      });
      const consume = async (bytes: Buffer): Promise<void> => {
        let completedResult = false;
        let failedCode: DaemonExecutionFailureCode | undefined;
        for (const value of decoder.append(bytes)) {
          if (ended) throw new Error("Daemon resumed with a duplicate terminal frame");
          if (LocalDaemonTransport.isResultChunk(value)) {
            await transfer.acceptChunk(value);
            continue;
          }
          const frame = LocalDaemonTransport.executionFrameFor(request, value);
          if (frame.kind === "result-manifest") {
            transfer.acceptManifest(frame);
            continue;
          }
          if (frame.kind === "execution-failed") {
            ended = true;
            failedCode = frame.code;
            continue;
          }
          if (frame.kind !== "result-end") {
            throw new Error("Daemon resumed with an invalid terminal frame");
          }
          transfer.acceptEnd(frame);
          ended = true;
          completedResult = true;
        }
        if (completedResult) {
          const result = await transfer.finish();
          const manifest = transfer.manifest;
          if (manifest === undefined) throw new Error("Completion manifest is missing");
          await this.acknowledgeResult(endpoint, request, manifest);
          settled = true;
          socket.end();
          resolve({ status: "completed", result });
        }
        if (failedCode !== undefined) {
          settled = true;
          socket.end();
          await output.dispose();
          resolve({ status: "failed", code: failedCode });
        }
      };
      socket.on("data", (bytes) => {
        socket.pause();
        consumption = consumption
          .then(() => consume(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)))
          .then(() => {
            if (!socket.destroyed && !ended) socket.resume();
          });
        void consumption.catch(fail);
      });
      socket.once("end", () => {
        void consumption
          .then(() => {
            if (ended) return;
            decoder.assertComplete();
            fail(new Error("Daemon result resume ended before completion"));
          })
          .catch(fail);
      });
    });
  }

  private async acknowledgeResult(
    endpoint: string,
    request: DaemonExecuteRequest,
    manifest: Extract<DaemonExecutionServerFrame, { kind: "result-manifest" }>["manifest"],
  ): Promise<void> {
    const acknowledgement: DaemonResultAcknowledgement = {
      kind: "result-ack",
      protocolVersion: request.protocolVersion,
      instanceId: request.instanceId,
      processToken: request.processToken,
      requestId: request.requestId,
      transferId: manifest.transferId,
    };
    await new Promise<void>((resolve, reject) => {
      const decoder = new DaemonFrameDecoder(this.maximumFrameBytes);
      const socket = createConnection(endpoint);
      let responseReceived = false;
      let settled = false;
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(error);
      };
      const succeed = (): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        resolve();
      };
      const complete = (): void => {
        try {
          decoder.assertComplete();
          if (!responseReceived) throw new Error("Daemon acknowledgement response is missing");
          succeed();
        } catch (error) {
          fail(error);
        }
      };
      socket.setTimeout(this.requestTimeoutMs, () =>
        fail(new Error("Daemon result acknowledgement timed out")),
      );
      socket.once("error", fail);
      socket.once("connect", () => {
        try {
          this.writeFrame(socket, acknowledgement);
        } catch (error) {
          fail(error);
        }
      });
      socket.on("data", (bytes) => {
        try {
          const values = decoder.append(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes));
          for (const response of values) {
            if (responseReceived) throw new Error("Duplicate daemon result acknowledgement");
            LocalDaemonTransport.assertResponse(response);
            if (
              response.kind !== "result-acknowledged" ||
              response.instanceId !== request.instanceId ||
              response.processToken !== request.processToken ||
              response.requestId !== request.requestId ||
              response.transferId !== manifest.transferId
            ) {
              throw new Error("Invalid daemon result acknowledgement");
            }
            responseReceived = true;
          }
          if (responseReceived) socket.end();
        } catch (error) {
          fail(error);
        }
      });
      socket.once("end", complete);
      socket.once("close", () => {
        if (!settled) complete();
      });
    });
  }

  async executionStatus(
    endpoint: string,
    request: DaemonExecutionStatusRequest,
  ): Promise<DaemonExecutionStatus> {
    const response = await this.singleResponse(endpoint, request);
    if (response.kind !== "execution-status") {
      throw new DaemonTransportError(
        "corrupt",
        "accepted",
        "Daemon returned a non-status response",
      );
    }
    return response.status;
  }

  async listen(
    endpoint: string,
    handler: (request: DaemonRequest, send: DaemonServerSend) => Promise<DaemonResponse | void>,
  ): Promise<DaemonServer> {
    if (process.platform !== "win32") {
      mkdirSync(dirname(endpoint), { recursive: true, mode: 0o700 });
      if (existsSync(endpoint)) {
        if (await this.endpointIsReachable(endpoint)) {
          throw new Error(\`Daemon endpoint is already in use: \${endpoint}\`);
        }
        rmSync(endpoint, { force: true });
      }
    }
    const sockets = new Set<Socket>();
    const server = createServer((socket) => {
      sockets.add(socket);
      socket.once("close", () => sockets.delete(socket));
      this.serve(socket, handler);
    });
    return new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(endpoint, () => resolve(new ListeningDaemonServer(server, sockets)));
    });
  }

  async removeUnavailableEndpoint(endpoint: string): Promise<boolean> {
    if (await this.endpointIsReachable(endpoint)) return false;
    if (process.platform !== "win32") rmSync(endpoint, { force: true });
    return true;
  }

  private endpointIsReachable(endpoint: string): Promise<boolean> {
    return new Promise((resolve) => {
      const socket = createConnection(endpoint);
      const finish = (reachable: boolean): void => {
        socket.destroy();
        resolve(reachable);
      };
      socket.setTimeout(this.requestTimeoutMs, () => finish(false));
      socket.once("connect", () => finish(true));
      socket.once("error", () => finish(false));
    });
  }

  private serve(
    socket: Socket,
    handler: (request: DaemonRequest, send: DaemonServerSend) => Promise<DaemonResponse | void>,
  ): void {
    const decoder = new DaemonFrameDecoder(this.maximumFrameBytes);
    let responses = Promise.resolve();
    let writes = Promise.resolve();
    const closeListeners = new Set<() => void>();
    const send: DaemonServerSend = Object.assign(
      (message: DaemonServerMessage) => {
        const write = writes.then(() => this.writeServerMessage(socket, message));
        writes = write;
        return write;
      },
      {
        onClose: (listener: () => void): (() => void) => {
          closeListeners.add(listener);
          return () => closeListeners.delete(listener);
        },
      },
    );
    socket.on("data", (bytes) => {
      try {
        for (const value of decoder.append(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes))) {
          LocalDaemonTransport.assertRequest(value);
          responses = responses
            .then(async () => {
              const response = await handler(value, send);
              if (response !== undefined) await send(response);
            })
            .catch(() => {
              socket.destroy();
            });
        }
      } catch {
        socket.destroy();
      }
    });
    socket.once("end", () => {
      try {
        decoder.assertComplete();
      } catch {
        socket.destroy();
      }
    });
    socket.once("close", () => {
      for (const listener of closeListeners) {
        try {
          listener();
        } catch {}
      }
      closeListeners.clear();
    });
    socket.once("error", () => socket.destroy());
  }

  private writeFrame(socket: Socket, value: unknown): void {
    this.writeEncodedFrame(socket, this.encodeFrame(value));
  }

  private async writeServerMessage(socket: Socket, message: DaemonServerMessage): Promise<void> {
    if ("kind" in message) {
      await this.writeEncodedServerFrame(socket, this.encodeFrame(message));
      return;
    }
    await this.writeEncodedServerFrame(
      socket,
      DaemonResultChunkCodec.encode(message, this.maximumChunkRawBytes),
    );
  }

  private async writeEncodedServerFrame(socket: Socket, frame: Buffer): Promise<void> {
    const chunkSize = this.writeChunkSize ?? frame.length;
    for (let offset = 0; offset < frame.length; offset += chunkSize) {
      if (socket.destroyed) throw new Error("Daemon socket closed during response delivery");
      const accepted = socket.write(frame.subarray(offset, offset + chunkSize));
      if (!accepted) await LocalDaemonTransport.waitForDrain(socket);
    }
  }

  private static waitForDrain(socket: Socket): Promise<void> {
    return new Promise((resolve, reject) => {
      const cleanup = (): void => {
        socket.off("drain", drained);
        socket.off("error", failed);
        socket.off("close", closed);
      };
      const drained = (): void => {
        cleanup();
        resolve();
      };
      const failed = (error: Error): void => {
        cleanup();
        reject(error);
      };
      const closed = (): void => {
        cleanup();
        reject(new Error("Daemon socket closed during response delivery"));
      };
      socket.once("drain", drained);
      socket.once("error", failed);
      socket.once("close", closed);
    });
  }

  private encodeFrame(value: unknown): Buffer {
    const payload = Buffer.from(JSON.stringify(value), "utf8");
    if (payload.length > this.maximumFrameBytes) {
      throw new Error(\`Daemon frame exceeds \${this.maximumFrameBytes} bytes\`);
    }
    const prefix = Buffer.alloc(4);
    prefix.writeUInt32BE(payload.length);
    return Buffer.concat([prefix, payload]);
  }

  private writeEncodedFrame(socket: Pick<Socket, "write">, frame: Buffer): void {
    if (this.writeChunkSize === undefined) {
      socket.write(frame);
      return;
    }
    for (let offset = 0; offset < frame.length; offset += this.writeChunkSize) {
      socket.write(frame.subarray(offset, offset + this.writeChunkSize));
    }
  }

  private static responseFor(
    request: DaemonLifecycleRequest | DaemonExecutionStatusRequest,
    value: unknown,
  ): DaemonLifecycleResponse | DaemonExecutionStatusResponse {
    LocalDaemonTransport.assertResponse(value);
    if (request.kind === "identify") {
      if (value.kind !== "identity") {
        throw new DaemonResponseError("corrupt", "Daemon returned a non-identity response");
      }
      if (value.instanceId !== request.instanceId || value.processToken !== request.processToken) {
        throw new DaemonResponseError(
          "authentication",
          "Daemon identity does not match process instance",
          value.instanceId === request.instanceId ? value.instanceId : undefined,
        );
      }
      return value;
    }
    if (request.kind === "terminate" || request.kind === "kill") {
      const expectedKind = request.kind === "terminate" ? "terminating" : "killing";
      if (value.kind !== expectedKind) {
        throw new DaemonResponseError("corrupt", "Daemon returned a non-termination response");
      }
      if (value.instanceId !== request.instanceId || value.processToken !== request.processToken) {
        throw new DaemonResponseError(
          "authentication",
          "Daemon termination does not match process instance",
          value.instanceId === request.instanceId ? value.instanceId : undefined,
        );
      }
      return value;
    }
    if (request.kind === "ping") {
      if (value.kind !== "pong") {
        throw new DaemonResponseError(
          "corrupt",
          "Daemon pong does not match request protocol and instance",
        );
      }
      if (value.instanceId !== request.instanceId) {
        throw new DaemonResponseError(
          "authentication",
          "Daemon pong does not match request instance",
        );
      }
      if (value.protocolVersion !== request.protocolVersion) {
        throw new DaemonResponseError(
          "incompatible",
          "Daemon pong does not match request protocol",
          value.instanceId,
        );
      }
      return value;
    }
    if (request.kind === "execution-status") {
      if (value.kind !== "execution-status") {
        throw new DaemonResponseError("corrupt", "Daemon returned a non-status response");
      }
      LocalDaemonTransport.assertExecutionCoordinates(request, value);
      return value;
    }
    if (value.kind !== "stopped") {
      throw new DaemonResponseError("corrupt", "Daemon returned a non-stop response");
    }
    if (value.instanceId !== request.instanceId) {
      throw new DaemonResponseError(
        "authentication",
        "Daemon stop response does not match instance",
      );
    }
    return value;
  }

  private static assertRequest(value: unknown): asserts value is DaemonRequest {
    if (!LocalDaemonTransport.isRecord(value) || typeof value.kind !== "string") {
      throw new Error("Malformed daemon request");
    }
    if (value.kind === "identify" || value.kind === "terminate" || value.kind === "kill") {
      if (typeof value.instanceId !== "string" || typeof value.processToken !== "string") {
        throw new Error("Malformed daemon identity request");
      }
      return;
    }
    if (typeof value.protocolVersion !== "number" || typeof value.instanceId !== "string") {
      throw new Error("Malformed daemon request envelope");
    }
    if (value.kind === "ping" || value.kind === "stop") return;
    if (
      (value.kind !== "execute" &&
        value.kind !== "execution-status" &&
        value.kind !== "result-fetch" &&
        value.kind !== "result-ack") ||
      typeof value.processToken !== "string" ||
      !DaemonRuntimeValues.isRequestId(value.requestId) ||
      (value.kind === "execute" && !LocalDaemonTransport.isExecutionRequest(value.request)) ||
      (value.kind === "result-fetch" && !LocalDaemonTransport.isCount(value.offset)) ||
      (value.kind === "result-ack" && typeof value.transferId !== "string")
    ) {
      throw new Error("Malformed daemon execution request");
    }
  }

  private static assertResponse(value: unknown): asserts value is DaemonResponse {
    if (!LocalDaemonTransport.isRecord(value) || typeof value.kind !== "string") {
      throw new Error("Malformed daemon response");
    }
    if (value.kind === "pong") {
      if (
        typeof value.protocolVersion !== "number" ||
        typeof value.instanceId !== "string" ||
        typeof value.symnavVersion !== "string" ||
        (value.state !== undefined &&
          value.state !== "starting" &&
          value.state !== "ready" &&
          value.state !== "busy") ||
        (value.startedAt !== undefined && typeof value.startedAt !== "number") ||
        (value.fileCount !== undefined && typeof value.fileCount !== "number") ||
        (value.memoryBytes !== undefined && typeof value.memoryBytes !== "number") ||
        (value.lastNavigationAt !== undefined && typeof value.lastNavigationAt !== "number") ||
        (value.currentCommand !== undefined && typeof value.currentCommand !== "string") ||
        (value.currentCommandElapsedMs !== undefined &&
          typeof value.currentCommandElapsedMs !== "number") ||
        (value.queued !== undefined && typeof value.queued !== "number") ||
        (value.activity !== undefined && !LocalDaemonTransport.isActivitySnapshot(value.activity))
      ) {
        throw new Error("Malformed daemon pong");
      }
      return;
    }
    if (value.kind === "identity") {
      if (
        typeof value.instanceId !== "string" ||
        typeof value.processToken !== "string" ||
        !Number.isInteger(value.pid) ||
        typeof value.startedAt !== "number"
      ) {
        throw new Error("Malformed daemon identity");
      }
      return;
    }
    if (value.kind === "terminating" || value.kind === "killing") {
      if (typeof value.instanceId !== "string" || typeof value.processToken !== "string") {
        throw new Error("Malformed daemon termination response");
      }
      return;
    }
    if (value.kind === "stopped") {
      if (typeof value.instanceId !== "string") throw new Error("Malformed daemon stop response");
      return;
    }
    if (
      value.kind === "accepted" ||
      value.kind === "rejected" ||
      value.kind === "result-manifest" ||
      value.kind === "result-end" ||
      value.kind === "execution-failed"
    ) {
      LocalDaemonTransport.assertExecutionFrame(value);
      return;
    }
    if (value.kind === "execution-status") {
      if (
        typeof value.instanceId !== "string" ||
        typeof value.processToken !== "string" ||
        !DaemonRuntimeValues.isRequestId(value.requestId) ||
        !LocalDaemonTransport.isExecutionStatus(value.status)
      ) {
        throw new Error("Malformed daemon execution status");
      }
      return;
    }
    if (value.kind === "result-acknowledged") {
      if (
        typeof value.instanceId !== "string" ||
        typeof value.processToken !== "string" ||
        !DaemonRuntimeValues.isRequestId(value.requestId) ||
        typeof value.transferId !== "string"
      ) {
        throw new Error("Malformed daemon result acknowledgement");
      }
      return;
    }
    throw new Error("Malformed daemon response");
  }

  private static transportError(
    error: unknown,
    delivery: DaemonDeliveryState,
  ): DaemonTransportError {
    if (error instanceof DaemonTransportError) return error;
    if (error instanceof DaemonResponseError) {
      return new DaemonTransportError(
        error.code,
        "accepted",
        error.message,
        error.authenticatedInstanceId,
      );
    }
    const message = error instanceof Error ? error.message : String(error);
    return new DaemonTransportError("corrupt", delivery, message);
  }

  private static executionFrameFor(
    request: DaemonExecuteRequest,
    value: unknown,
  ): DaemonExecutionServerFrame {
    LocalDaemonTransport.assertResponse(value);
    if (
      value.kind !== "accepted" &&
      value.kind !== "rejected" &&
      value.kind !== "result-manifest" &&
      value.kind !== "result-end" &&
      value.kind !== "execution-failed"
    ) {
      throw new DaemonResponseError("corrupt", "Daemon returned a non-execution frame");
    }
    LocalDaemonTransport.assertExecutionCoordinates(request, value);
    return value;
  }

  private static assertExecutionCoordinates(
    request: Pick<DaemonExecuteRequest, "instanceId" | "processToken" | "requestId">,
    response: Pick<DaemonExecutionServerFrame, "instanceId" | "processToken" | "requestId">,
  ): void {
    if (response.instanceId !== request.instanceId) {
      throw new DaemonResponseError("authentication", "Daemon execution instance does not match");
    }
    if (response.processToken !== request.processToken) {
      throw new DaemonResponseError(
        "authentication",
        "Daemon execution process token does not match",
        response.instanceId,
      );
    }
    if (response.requestId !== request.requestId) {
      throw new DaemonResponseError(
        "corrupt",
        "Daemon execution request identifier does not match",
        response.instanceId,
      );
    }
  }

  private static assertExecutionFrame(
    value: Record<string, unknown>,
  ): asserts value is DaemonExecutionServerFrame {
    if (
      typeof value.instanceId !== "string" ||
      typeof value.processToken !== "string" ||
      !DaemonRuntimeValues.isRequestId(value.requestId)
    ) {
      throw new Error("Malformed daemon execution frame");
    }
    if (value.kind === "accepted") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "acceptedAt",
          "queuePosition",
        ]) ||
        !LocalDaemonTransport.isMetric(value.acceptedAt) ||
        !LocalDaemonTransport.isCount(value.queuePosition)
      ) {
        throw new Error("Malformed daemon acceptance");
      }
      return;
    }
    if (value.kind === "rejected") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "code",
          "retrySafe",
        ]) ||
        !LocalDaemonTransport.isExecuteRejectionCode(value.code) ||
        typeof value.retrySafe !== "boolean"
      ) {
        throw new Error("Malformed daemon execution rejection");
      }
      return;
    }
    if (value.kind === "result-manifest") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "manifest",
        ]) ||
        !LocalDaemonTransport.isCompletionManifest(value.manifest) ||
        value.manifest.instanceId !== value.instanceId ||
        value.manifest.requestId !== value.requestId
      ) {
        throw new Error("Malformed daemon result manifest");
      }
      return;
    }
    if (value.kind === "result-end") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "transferId",
          "rawBytes",
          "recordCount",
          "sha256",
        ]) ||
        typeof value.transferId !== "string" ||
        !LocalDaemonTransport.isCount(value.rawBytes) ||
        !LocalDaemonTransport.isCount(value.recordCount) ||
        !LocalDaemonTransport.isDigest(value.sha256)
      ) {
        throw new Error("Malformed daemon result end");
      }
      return;
    }
    if (
      !LocalDaemonTransport.hasExactKeys(value, [
        "kind",
        "instanceId",
        "processToken",
        "requestId",
        "code",
      ]) ||
      !LocalDaemonTransport.isExecutionFailureCode(value.code)
    ) {
      throw new Error("Malformed daemon execution failure");
    }
  }

  private static isCompletionManifest(value: unknown): value is CompletionSpoolManifest {
    return (
      LocalDaemonTransport.isRecord(value) &&
      LocalDaemonTransport.hasExactKeys(value, [
        "transferId",
        "requestId",
        "instanceId",
        "exitCode",
        "rawBytes",
        "recordCount",
        "sha256",
      ]) &&
      typeof value.transferId === "string" &&
      value.transferId.length > 0 &&
      DaemonRuntimeValues.isRequestId(value.requestId) &&
      typeof value.instanceId === "string" &&
      value.instanceId.length > 0 &&
      LocalDaemonTransport.isCount(value.exitCode) &&
      LocalDaemonTransport.isCount(value.rawBytes) &&
      LocalDaemonTransport.isCount(value.recordCount) &&
      LocalDaemonTransport.isDigest(value.sha256)
    );
  }

  private static isDigest(value: unknown): value is string {
    return typeof value === "string" && /^[a-f\\d]{64}$/.test(value);
  }

  private static isExecuteRejectionCode(value: unknown): boolean {
    return (
      value === "not-ready" ||
      value === "draining" ||
      value === "resource-pressure" ||
      value === "incompatible"
    );
  }

  private static isExecutionFailureCode(value: unknown): value is DaemonExecutionFailureCode {
    return (
      value === "worker-exit" ||
      value === "controlled-resource" ||
      value === "response-capacity" ||
      value === "stopping" ||
      value === "internal"
    );
  }

  private static isExecutionStatus(value: unknown): value is DaemonExecutionStatus {
    if (!LocalDaemonTransport.isRecord(value)) return false;
    if (value.state === "unknown" || value.state === "completed") return true;
    if (value.state === "queued") return LocalDaemonTransport.isCount(value.queuePosition);
    if (value.state === "running") return LocalDaemonTransport.isMetric(value.startedAt);
    return value.state === "failed" && LocalDaemonTransport.isExecutionFailureCode(value.code);
  }

  private static isActivitySnapshot(value: unknown): boolean {
    if (!LocalDaemonTransport.isRecord(value)) return false;
    const lifecycle = value.lifecycle;
    const current = value.current;
    const expectedKeys = [
      "lifecycle",
      "pid",
      "startedAt",
      "startupElapsedMs",
      "processRssBytes",
      "hardProcessRssBytes",
      "workerGeneration",
      "queued",
      "spoolBytes",
    ];
    if (value.workerHeapUsedBytes !== undefined) expectedKeys.push("workerHeapUsedBytes");
    if (value.lastCompletedAgoMs !== undefined) expectedKeys.push("lastCompletedAgoMs");
    if (
      lifecycle === "ready" ||
      lifecycle === "busy" ||
      ((lifecycle === "recovering" || lifecycle === "draining") && value.fileCount !== undefined)
    ) {
      expectedKeys.push("fileCount");
    }
    if (lifecycle === "busy") expectedKeys.push("current");
    if (lifecycle === "recovering") expectedKeys.push("recoveryDetail");
    return (
      (lifecycle === "starting" ||
        lifecycle === "ready" ||
        lifecycle === "busy" ||
        lifecycle === "recovering" ||
        lifecycle === "draining") &&
      LocalDaemonTransport.hasExactKeys(value, expectedKeys) &&
      (lifecycle !== "recovering" ||
        value.recoveryDetail === "resource-pressure" ||
        value.recoveryDetail === "worker-replacement") &&
      Number.isInteger(value.pid) &&
      (value.pid as number) > 0 &&
      LocalDaemonTransport.isMetric(value.startedAt) &&
      LocalDaemonTransport.isMetric(value.startupElapsedMs) &&
      (lifecycle === "ready" || lifecycle === "busy"
        ? LocalDaemonTransport.isCount(value.fileCount)
        : lifecycle === "starting"
          ? value.fileCount === undefined
          : value.fileCount === undefined || LocalDaemonTransport.isCount(value.fileCount)) &&
      LocalDaemonTransport.isCount(value.processRssBytes) &&
      LocalDaemonTransport.isCount(value.hardProcessRssBytes) &&
      (value.workerHeapUsedBytes === undefined ||
        LocalDaemonTransport.isCount(value.workerHeapUsedBytes)) &&
      LocalDaemonTransport.isCount(value.workerGeneration) &&
      (lifecycle !== "busy" ||
        (LocalDaemonTransport.isRecord(current) &&
          LocalDaemonTransport.hasExactKeys(current, ["requestId", "command", "elapsedMs"]) &&
          DaemonRuntimeValues.isRequestId(current.requestId) &&
          DaemonRuntimeValues.isCommandName(current.command) &&
          LocalDaemonTransport.isMetric(current.elapsedMs))) &&
      LocalDaemonTransport.isCount(value.queued) &&
      (value.lastCompletedAgoMs === undefined ||
        LocalDaemonTransport.isMetric(value.lastCompletedAgoMs)) &&
      LocalDaemonTransport.isCount(value.spoolBytes)
    );
  }

  private static isCount(value: unknown): boolean {
    return Number.isInteger(value) && (value as number) >= 0;
  }

  private static isMetric(value: unknown): boolean {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  }

  private static isExecutionRequest(value: unknown): boolean {
    if (!LocalDaemonTransport.isRecord(value)) return false;
    const expectedKeys = ["argv", "cwd", "telemetryEnabled"];
    if (value.executionMode !== undefined) expectedKeys.push("executionMode");
    return (
      LocalDaemonTransport.hasExactKeys(value, expectedKeys) &&
      Array.isArray(value.argv) &&
      value.argv.every((arg) => typeof arg === "string") &&
      typeof value.cwd === "string" &&
      typeof value.telemetryEnabled === "boolean" &&
      (value.executionMode === undefined ||
        value.executionMode === "cold" ||
        value.executionMode === "warm" ||
        value.executionMode === "fallback")
    );
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  private static isResultChunk(value: unknown): value is DaemonResultChunk {
    return (
      LocalDaemonTransport.isRecord(value) &&
      !("kind" in value) &&
      value.bytes instanceof Uint8Array
    );
  }

  private static hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    return (
      actual.length === expected.length && actual.every((key, index) => key === expected[index])
    );
  }
}
`},{subject:"pr-131-base",path:"apps/cli/src/daemon/local-daemon-transport.ts",revision:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"d3659cc57bee5c7fef70cd40b15c1764df5c5a815da4bf63a7f4090e1d611e02",text:`import { existsSync, mkdirSync, rmSync } from "node:fs";
import { createConnection, createServer, type Server, type Socket } from "node:net";
import { dirname } from "node:path";
import { OrderedCommandOutput, type CommandExecutionResult } from "../command-execution-result.js";
import type {
  DaemonExecuteRequest,
  DaemonExecutionFailureCode,
  DaemonExecutionServerFrame,
  DaemonExecutionStatus,
  DaemonExecutionStatusRequest,
  DaemonExecutionStatusResponse,
  DaemonLifecycleRequest,
  DaemonLifecycleResponse,
  DaemonResultAcknowledgement,
  DaemonResultChunk,
  DaemonRequest,
  DaemonResponse,
  DaemonServerMessage,
  DaemonServer,
} from "./daemon-protocol.js";
import { DaemonResultChunkCodec, DaemonTransferFrameDecoder } from "./daemon-result-chunk-codec.js";
import { DaemonRuntimeValues } from "./daemon-runtime-values.js";
import {
  DAEMON_MAXIMUM_CONTROL_FRAME_BYTES,
  type CompletionSpoolManifest,
} from "./completion-spool.js";

const DEFAULT_MAXIMUM_FRAME_BYTES = 8 * 1024 * 1024;
const DEFAULT_REQUEST_TIMEOUT_MS = 250;
const DEFAULT_EXECUTION_REQUEST_TIMEOUT_MS = 5_000;

interface LocalDaemonTransportOptions {
  readonly maximumFrameBytes?: number;
  readonly requestTimeoutMs?: number;
  readonly executionRequestTimeoutMs?: number;
  readonly writeChunkSize?: number;
  readonly outputDirectory?: string;
  readonly outputInlineBytes?: number;
}

export interface DaemonServerSend {
  (response: DaemonServerMessage): Promise<void>;
  onClose(listener: () => void): () => void;
}

export type DaemonDeliveryState = "not-submitted" | "submitted-unconfirmed" | "accepted";

export type DaemonTransportFailureCode =
  | "unreachable"
  | "timeout"
  | "corrupt"
  | "incompatible"
  | "authentication"
  | "closed"
  | "rejected";

export interface DaemonExecutionAcceptance {
  readonly requestId: string;
  readonly instanceId: string;
  readonly acceptedAt: number;
  readonly queuePosition: number;
}

export interface DaemonExecutionReceipt {
  readonly acceptance: DaemonExecutionAcceptance;
  readonly completion: Promise<
    | { readonly status: "completed"; readonly result: CommandExecutionResult }
    | { readonly status: "failed"; readonly code: DaemonExecutionFailureCode }
  >;
}

export class DaemonTransportError extends Error {
  readonly authenticatedInstanceId?: string;
  readonly retrySafe: boolean;

  constructor(
    readonly code: DaemonTransportFailureCode,
    readonly delivery: DaemonDeliveryState,
    message: string,
    authenticatedInstanceId?: string,
    retrySafe = delivery === "not-submitted",
  ) {
    super(message);
    this.name = "DaemonTransportError";
    if (authenticatedInstanceId !== undefined) {
      this.authenticatedInstanceId = authenticatedInstanceId;
    }
    this.retrySafe = retrySafe;
  }
}

class DaemonResponseError extends Error {
  constructor(
    readonly code: Extract<
      DaemonTransportFailureCode,
      "authentication" | "corrupt" | "incompatible"
    >,
    message: string,
    readonly authenticatedInstanceId?: string,
  ) {
    super(message);
  }
}

class DaemonFrameDecoder {
  private buffered = Buffer.alloc(0);

  constructor(private readonly maximumFrameBytes: number) {}

  append(bytes: Buffer): readonly unknown[] {
    this.buffered = Buffer.concat([this.buffered, bytes]);
    const values: unknown[] = [];
    while (this.buffered.length >= 4) {
      const payloadLength = this.buffered.readUInt32BE(0);
      if (payloadLength > this.maximumFrameBytes) {
        throw new Error(\`Daemon frame exceeds \${this.maximumFrameBytes} bytes\`);
      }
      if (this.buffered.length < payloadLength + 4) break;
      const payload = this.buffered.subarray(4, payloadLength + 4);
      this.buffered = this.buffered.subarray(payloadLength + 4);
      try {
        values.push(JSON.parse(payload.toString("utf8")));
      } catch {
        throw new Error("Daemon frame contains malformed JSON");
      }
    }
    return values;
  }

  assertComplete(): void {
    if (this.buffered.length !== 0) {
      throw new Error("Daemon connection ended with a truncated frame");
    }
  }
}

class DaemonResultTransferReceiver {
  private expectedManifest: CompletionSpoolManifest | undefined;
  private nextRecordOffset: number;
  private manifestReceived = false;
  private terminalReceived = false;

  constructor(
    private readonly request: DaemonExecuteRequest,
    private readonly output: OrderedCommandOutput,
    manifest?: CompletionSpoolManifest,
    initialOffset = 0,
  ) {
    this.expectedManifest = manifest;
    this.nextRecordOffset = initialOffset;
  }

  get manifest(): CompletionSpoolManifest | undefined {
    return this.expectedManifest;
  }

  get nextOffset(): number {
    return this.nextRecordOffset;
  }

  get terminal(): boolean {
    return this.terminalReceived;
  }

  beginConnection(): void {
    this.manifestReceived = false;
    this.terminalReceived = false;
  }

  acceptManifest(
    frame: Extract<DaemonExecutionServerFrame, { readonly kind: "result-manifest" }>,
  ): void {
    if (this.manifestReceived || this.terminalReceived) {
      throw new Error("Duplicate result manifest");
    }
    if (
      this.expectedManifest !== undefined &&
      !DaemonResultTransferReceiver.manifestsMatch(this.expectedManifest, frame.manifest)
    ) {
      throw new Error("Daemon resumed with a different result manifest");
    }
    this.expectedManifest ??= frame.manifest;
    this.manifestReceived = true;
  }

  async acceptChunk(chunk: DaemonResultChunk): Promise<void> {
    const manifest = this.expectedManifest;
    if (
      !this.manifestReceived ||
      this.terminalReceived ||
      manifest === undefined ||
      chunk.requestId !== this.request.requestId ||
      chunk.transferId !== manifest.transferId ||
      chunk.offset !== this.nextRecordOffset ||
      chunk.sequence !== this.nextRecordOffset
    ) {
      throw new Error("Daemon returned an invalid result chunk");
    }
    await this.output.appendRecord({
      sequence: chunk.sequence,
      stream: chunk.stream,
      bytes: chunk.bytes,
    });
    this.nextRecordOffset += 1;
  }

  acceptEnd(frame: Extract<DaemonExecutionServerFrame, { readonly kind: "result-end" }>): void {
    const manifest = this.expectedManifest;
    if (
      !this.manifestReceived ||
      this.terminalReceived ||
      manifest === undefined ||
      frame.transferId !== manifest.transferId ||
      frame.rawBytes !== manifest.rawBytes ||
      frame.recordCount !== manifest.recordCount ||
      frame.sha256 !== manifest.sha256 ||
      this.nextRecordOffset !== manifest.recordCount
    ) {
      throw new Error("Daemon result transfer did not match its manifest");
    }
    this.terminalReceived = true;
  }

  async finish(): Promise<CommandExecutionResult> {
    const manifest = this.expectedManifest;
    if (!this.terminalReceived || manifest === undefined) {
      throw new Error("Daemon result transfer is incomplete");
    }
    const result = await this.output.finish(manifest.exitCode);
    if (!DaemonResultTransferReceiver.summariesMatch(result.output.summary, manifest)) {
      await result.output.dispose();
      throw new Error("Daemon result transfer failed digest validation");
    }
    return result;
  }

  private static manifestsMatch(
    expected: CompletionSpoolManifest,
    actual: CompletionSpoolManifest,
  ): boolean {
    return (
      actual.transferId === expected.transferId &&
      actual.requestId === expected.requestId &&
      actual.instanceId === expected.instanceId &&
      actual.exitCode === expected.exitCode &&
      DaemonResultTransferReceiver.summariesMatch(actual, expected)
    );
  }

  private static summariesMatch(
    actual: CompletionSpoolManifest | CommandExecutionResult["output"]["summary"],
    expected: CompletionSpoolManifest,
  ): boolean {
    return (
      actual.rawBytes === expected.rawBytes &&
      actual.recordCount === expected.recordCount &&
      actual.sha256 === expected.sha256
    );
  }
}

class ListeningDaemonServer implements DaemonServer {
  constructor(
    private readonly server: Server,
    private readonly sockets: ReadonlySet<Socket>,
  ) {}

  close(force = false): Promise<void> {
    if (force) {
      for (const socket of this.sockets) socket.destroy();
    }
    if (!this.server.listening) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this.server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

export class LocalDaemonTransport {
  private readonly maximumFrameBytes: number;
  private readonly requestTimeoutMs: number;
  private readonly executionRequestTimeoutMs: number;
  private readonly writeChunkSize: number | undefined;
  private readonly outputDirectory: string | undefined;
  private readonly outputInlineBytes: number | undefined;

  constructor(options: LocalDaemonTransportOptions = {}) {
    this.maximumFrameBytes = options.maximumFrameBytes ?? DEFAULT_MAXIMUM_FRAME_BYTES;
    this.requestTimeoutMs = options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
    this.executionRequestTimeoutMs =
      options.executionRequestTimeoutMs ?? DEFAULT_EXECUTION_REQUEST_TIMEOUT_MS;
    this.writeChunkSize = options.writeChunkSize;
    this.outputDirectory = options.outputDirectory;
    this.outputInlineBytes = options.outputInlineBytes;
  }

  canFrame(value: unknown): boolean {
    try {
      this.encodeFrame(value);
      return true;
    } catch {
      return false;
    }
  }

  request(endpoint: string, request: DaemonLifecycleRequest): Promise<DaemonLifecycleResponse> {
    return this.singleResponse(endpoint, request);
  }

  private singleResponse(
    endpoint: string,
    request: DaemonLifecycleRequest,
  ): Promise<DaemonLifecycleResponse>;
  private singleResponse(
    endpoint: string,
    request: DaemonExecutionStatusRequest,
  ): Promise<DaemonExecutionStatusResponse>;
  private singleResponse(
    endpoint: string,
    request: DaemonLifecycleRequest | DaemonExecutionStatusRequest,
  ): Promise<DaemonLifecycleResponse | DaemonExecutionStatusResponse> {
    LocalDaemonTransport.assertRequest(request);
    return new Promise((resolve, reject) => {
      const decoder = new DaemonFrameDecoder(this.maximumFrameBytes);
      const socket = createConnection(endpoint);
      let settled = false;
      let delivery: DaemonDeliveryState = "not-submitted";
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(LocalDaemonTransport.transportError(error, delivery));
      };
      socket.setTimeout(this.requestTimeoutMs, () =>
        fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out")),
      );
      socket.once("error", (error) => {
        if (delivery === "not-submitted") {
          fail(new DaemonTransportError("unreachable", delivery, error.message));
          return;
        }
        fail(new DaemonTransportError("closed", delivery, error.message));
      });
      socket.once("connect", () => {
        try {
          this.writeFrame(socket, request);
          delivery = "submitted-unconfirmed";
        } catch (error) {
          fail(error);
        }
      });
      socket.on("data", (bytes) => {
        try {
          const values = decoder.append(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes));
          if (values.length > 1 || (values.length === 1 && settled)) {
            fail(new Error("Daemon returned multiple responses"));
            return;
          }
          const value = values[0];
          if (value === undefined) return;
          const response = LocalDaemonTransport.responseFor(request, value);
          delivery = "accepted";
          settled = true;
          socket.end();
          resolve(response);
        } catch (error) {
          fail(error);
        }
      });
      socket.once("end", () => {
        if (settled) return;
        try {
          decoder.assertComplete();
          fail(
            new DaemonTransportError(
              "closed",
              delivery,
              "Daemon connection ended before a response",
            ),
          );
        } catch (error) {
          fail(error);
        }
      });
    });
  }

  execute(endpoint: string, request: DaemonExecuteRequest): Promise<DaemonExecutionReceipt> {
    return this.executeOnce(endpoint, request).then((receipt) => ({
      acceptance: receipt.acceptance,
      completion: this.completeWithOneReattachment(endpoint, request, receipt.completion),
    }));
  }

  private async completeWithOneReattachment(
    endpoint: string,
    request: DaemonExecuteRequest,
    completion: DaemonExecutionReceipt["completion"],
  ): DaemonExecutionReceipt["completion"] {
    try {
      return await completion;
    } catch (firstError) {
      if (!LocalDaemonTransport.isAcceptedConnectionClose(firstError, request)) throw firstError;
      try {
        const reattached = await this.executeOnce(endpoint, request);
        return await reattached.completion;
      } catch {
        throw firstError;
      }
    }
  }

  private executeOnce(
    endpoint: string,
    request: DaemonExecuteRequest,
  ): Promise<DaemonExecutionReceipt> {
    LocalDaemonTransport.assertRequest(request);
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(DAEMON_MAXIMUM_CONTROL_FRAME_BYTES);
      const output = new OrderedCommandOutput({
        ...(this.outputDirectory === undefined ? {} : { directory: this.outputDirectory }),
        ...(this.outputInlineBytes === undefined ? {} : { inlineBytes: this.outputInlineBytes }),
      });
      const transfer = new DaemonResultTransferReceiver(request, output);
      const socket = createConnection(endpoint);
      let delivery: DaemonDeliveryState = "not-submitted";
      let acceptance: DaemonExecutionAcceptance | undefined;
      let terminal = false;
      let outerSettled = false;
      let completionSettled = false;
      let resumeStarted = false;
      let resolveCompletion!: (value: Awaited<DaemonExecutionReceipt["completion"]>) => void;
      let rejectCompletion!: (error: DaemonTransportError) => void;
      const completion = new Promise<Awaited<DaemonExecutionReceipt["completion"]>>(
        (completionResolve, completionReject) => {
          resolveCompletion = completionResolve;
          rejectCompletion = completionReject;
        },
      );
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        const transportError = LocalDaemonTransport.transportError(error, delivery);
        socket.destroy();
        if (!outerSettled) {
          outerSettled = true;
          void output.dispose().finally(() => reject(transportError));
          return;
        }
        if (!completionSettled) {
          completionSettled = true;
          void output.dispose().finally(() => rejectCompletion(transportError));
        }
      };
      const resume = (): boolean => {
        if (
          resumeStarted ||
          completionSettled ||
          acceptance === undefined ||
          transfer.manifest === undefined ||
          terminal
        ) {
          return false;
        }
        resumeStarted = true;
        socket.destroy();
        transfer.beginConnection();
        void this.fetchCompletion(endpoint, request, output, transfer)
          .then((completionValue) => {
            if (completionSettled) return;
            completionSettled = true;
            resolveCompletion(completionValue);
          })
          .catch(fail);
        return true;
      };
      socket.setTimeout(this.executionRequestTimeoutMs, () =>
        fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out")),
      );
      socket.once("error", (error) => {
        void consumption
          .then(() => {
            if (resume()) return;
            fail(
              new DaemonTransportError(
                delivery === "not-submitted" ? "unreachable" : "closed",
                delivery,
                error.message,
                acceptance?.instanceId,
              ),
            );
          })
          .catch(fail);
      });
      socket.once("connect", () => {
        try {
          const encoded = this.encodeFrame(request);
          delivery = "submitted-unconfirmed";
          this.writeEncodedFrame(socket, encoded);
        } catch (error) {
          fail(error);
        }
      });
      const publishAcceptance = (): void => {
        if (acceptance === undefined || outerSettled) return;
        outerSettled = true;
        socket.setTimeout(0);
        resolve({ acceptance, completion });
      };
      const consume = async (bytes: Buffer): Promise<void> => {
        const values = decoder.append(bytes);
        let completedResult = false;
        let failedCode: DaemonExecutionFailureCode | undefined;
        for (const value of values) {
          if (LocalDaemonTransport.isResultChunk(value)) {
            if (acceptance === undefined)
              throw new Error("Daemon returned output before acceptance");
            await transfer.acceptChunk(value);
            continue;
          }
          const frame = LocalDaemonTransport.executionFrameFor(request, value);
          if (frame.kind === "rejected") {
            if (acceptance !== undefined || terminal) {
              throw new Error("Daemon rejected an already accepted request");
            }
            throw new DaemonTransportError(
              "rejected",
              "submitted-unconfirmed",
              \`Daemon rejected execution: \${frame.code}\`,
              frame.instanceId,
              frame.retrySafe,
            );
          }
          if (frame.kind === "accepted") {
            if (acceptance !== undefined || terminal) {
              throw new Error("Daemon returned duplicate acceptance");
            }
            delivery = "accepted";
            acceptance = {
              requestId: frame.requestId,
              instanceId: frame.instanceId,
              acceptedAt: frame.acceptedAt,
              queuePosition: frame.queuePosition,
            };
            publishAcceptance();
            continue;
          }
          if (acceptance === undefined) {
            throw new Error("Daemon returned completion before acceptance");
          }
          if (frame.kind === "result-manifest") {
            if (terminal) throw new Error("Daemon returned a manifest after completion");
            transfer.acceptManifest(frame);
            continue;
          }
          if (frame.kind === "result-end") {
            transfer.acceptEnd(frame);
            terminal = true;
            completedResult = true;
            continue;
          }
          if (terminal) throw new Error("Daemon returned duplicate terminal frame");
          terminal = true;
          failedCode = frame.code;
        }
        if (completedResult) {
          const result = await transfer.finish();
          const completedManifest = transfer.manifest;
          if (completedManifest === undefined) throw new Error("Completion manifest is missing");
          await this.acknowledgeResult(endpoint, request, completedManifest);
          if (!completionSettled) {
            completionSettled = true;
            socket.end();
            resolveCompletion({ status: "completed", result });
          }
        }
        if (failedCode !== undefined && !completionSettled) {
          completionSettled = true;
          socket.end();
          await output.dispose();
          resolveCompletion({ status: "failed", code: failedCode });
        }
      };
      socket.on("data", (bytes) => {
        socket.pause();
        consumption = consumption
          .then(() => consume(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)))
          .then(() => {
            if (!socket.destroyed && !terminal) socket.resume();
          });
        void consumption.catch(fail);
      });
      socket.once("end", () => {
        void consumption
          .then(() => {
            if (terminal && completionSettled) return;
            if (resume()) return;
            decoder.assertComplete();
            fail(
              new DaemonTransportError(
                "closed",
                delivery,
                acceptance === undefined
                  ? "Daemon connection ended before acceptance"
                  : "Daemon connection ended after acceptance before completion",
                acceptance?.instanceId,
              ),
            );
          })
          .catch(fail);
      });
    });
  }

  private static isAcceptedConnectionClose(
    error: unknown,
    request: DaemonExecuteRequest,
  ): error is DaemonTransportError {
    return (
      error instanceof DaemonTransportError &&
      error.code === "closed" &&
      error.delivery === "accepted" &&
      error.authenticatedInstanceId === request.instanceId
    );
  }

  private fetchCompletion(
    endpoint: string,
    request: DaemonExecuteRequest,
    output: OrderedCommandOutput,
    transfer: DaemonResultTransferReceiver,
  ): DaemonExecutionReceipt["completion"] {
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(DAEMON_MAXIMUM_CONTROL_FRAME_BYTES);
      const socket = createConnection(endpoint);
      let ended = false;
      let settled = false;
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(LocalDaemonTransport.transportError(error, "accepted"));
      };
      socket.once("error", (error) => {
        void consumption
          .then(() =>
            fail(new DaemonTransportError("closed", "accepted", error.message, request.instanceId)),
          )
          .catch(fail);
      });
      socket.once("connect", () => {
        this.writeFrame(socket, {
          kind: "result-fetch",
          protocolVersion: request.protocolVersion,
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          offset: transfer.nextOffset,
        });
      });
      const consume = async (bytes: Buffer): Promise<void> => {
        let completedResult = false;
        let failedCode: DaemonExecutionFailureCode | undefined;
        for (const value of decoder.append(bytes)) {
          if (ended) throw new Error("Daemon resumed with a duplicate terminal frame");
          if (LocalDaemonTransport.isResultChunk(value)) {
            await transfer.acceptChunk(value);
            continue;
          }
          const frame = LocalDaemonTransport.executionFrameFor(request, value);
          if (frame.kind === "result-manifest") {
            transfer.acceptManifest(frame);
            continue;
          }
          if (frame.kind === "execution-failed") {
            ended = true;
            failedCode = frame.code;
            continue;
          }
          if (frame.kind !== "result-end") {
            throw new Error("Daemon resumed with an invalid terminal frame");
          }
          transfer.acceptEnd(frame);
          ended = true;
          completedResult = true;
        }
        if (completedResult) {
          const result = await transfer.finish();
          const manifest = transfer.manifest;
          if (manifest === undefined) throw new Error("Completion manifest is missing");
          await this.acknowledgeResult(endpoint, request, manifest);
          settled = true;
          socket.end();
          resolve({ status: "completed", result });
        }
        if (failedCode !== undefined) {
          settled = true;
          socket.end();
          await output.dispose();
          resolve({ status: "failed", code: failedCode });
        }
      };
      socket.on("data", (bytes) => {
        socket.pause();
        consumption = consumption
          .then(() => consume(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)))
          .then(() => {
            if (!socket.destroyed && !ended) socket.resume();
          });
        void consumption.catch(fail);
      });
      socket.once("end", () => {
        void consumption
          .then(() => {
            if (ended) return;
            decoder.assertComplete();
            fail(new Error("Daemon result resume ended before completion"));
          })
          .catch(fail);
      });
    });
  }

  private async acknowledgeResult(
    endpoint: string,
    request: DaemonExecuteRequest,
    manifest: Extract<DaemonExecutionServerFrame, { kind: "result-manifest" }>["manifest"],
  ): Promise<void> {
    const acknowledgement: DaemonResultAcknowledgement = {
      kind: "result-ack",
      protocolVersion: request.protocolVersion,
      instanceId: request.instanceId,
      processToken: request.processToken,
      requestId: request.requestId,
      transferId: manifest.transferId,
    };
    await new Promise<void>((resolve, reject) => {
      const decoder = new DaemonFrameDecoder(this.maximumFrameBytes);
      const socket = createConnection(endpoint);
      let responseReceived = false;
      let settled = false;
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(error);
      };
      const succeed = (): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        resolve();
      };
      const complete = (): void => {
        try {
          decoder.assertComplete();
          if (!responseReceived) throw new Error("Daemon acknowledgement response is missing");
          succeed();
        } catch (error) {
          fail(error);
        }
      };
      socket.setTimeout(this.requestTimeoutMs, () =>
        fail(new Error("Daemon result acknowledgement timed out")),
      );
      socket.once("error", fail);
      socket.once("connect", () => {
        try {
          this.writeFrame(socket, acknowledgement);
        } catch (error) {
          fail(error);
        }
      });
      socket.on("data", (bytes) => {
        try {
          const values = decoder.append(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes));
          for (const response of values) {
            if (responseReceived) throw new Error("Duplicate daemon result acknowledgement");
            LocalDaemonTransport.assertResponse(response);
            if (
              response.kind !== "result-acknowledged" ||
              response.instanceId !== request.instanceId ||
              response.processToken !== request.processToken ||
              response.requestId !== request.requestId ||
              response.transferId !== manifest.transferId
            ) {
              throw new Error("Invalid daemon result acknowledgement");
            }
            responseReceived = true;
          }
          if (responseReceived) socket.end();
        } catch (error) {
          fail(error);
        }
      });
      socket.once("end", complete);
      socket.once("close", () => {
        if (!settled) complete();
      });
    });
  }

  async executionStatus(
    endpoint: string,
    request: DaemonExecutionStatusRequest,
  ): Promise<DaemonExecutionStatus> {
    const response = await this.singleResponse(endpoint, request);
    if (response.kind !== "execution-status") {
      throw new DaemonTransportError(
        "corrupt",
        "accepted",
        "Daemon returned a non-status response",
      );
    }
    return response.status;
  }

  async listen(
    endpoint: string,
    handler: (request: DaemonRequest, send: DaemonServerSend) => Promise<DaemonResponse | void>,
  ): Promise<DaemonServer> {
    if (process.platform !== "win32") {
      mkdirSync(dirname(endpoint), { recursive: true, mode: 0o700 });
      if (existsSync(endpoint)) {
        if (await this.endpointIsReachable(endpoint)) {
          throw new Error(\`Daemon endpoint is already in use: \${endpoint}\`);
        }
        rmSync(endpoint, { force: true });
      }
    }
    const sockets = new Set<Socket>();
    const server = createServer((socket) => {
      sockets.add(socket);
      socket.once("close", () => sockets.delete(socket));
      this.serve(socket, handler);
    });
    return new Promise((resolve, reject) => {
      server.once("error", reject);
      server.listen(endpoint, () => resolve(new ListeningDaemonServer(server, sockets)));
    });
  }

  async removeUnavailableEndpoint(endpoint: string): Promise<boolean> {
    if (await this.endpointIsReachable(endpoint)) return false;
    if (process.platform !== "win32") rmSync(endpoint, { force: true });
    return true;
  }

  private endpointIsReachable(endpoint: string): Promise<boolean> {
    return new Promise((resolve) => {
      const socket = createConnection(endpoint);
      const finish = (reachable: boolean): void => {
        socket.destroy();
        resolve(reachable);
      };
      socket.setTimeout(this.requestTimeoutMs, () => finish(false));
      socket.once("connect", () => finish(true));
      socket.once("error", () => finish(false));
    });
  }

  private serve(
    socket: Socket,
    handler: (request: DaemonRequest, send: DaemonServerSend) => Promise<DaemonResponse | void>,
  ): void {
    const decoder = new DaemonFrameDecoder(this.maximumFrameBytes);
    let responses = Promise.resolve();
    let writes = Promise.resolve();
    const closeListeners = new Set<() => void>();
    const send: DaemonServerSend = Object.assign(
      (message: DaemonServerMessage) => {
        const write = writes.then(() => this.writeServerMessage(socket, message));
        writes = write;
        return write;
      },
      {
        onClose: (listener: () => void): (() => void) => {
          closeListeners.add(listener);
          return () => closeListeners.delete(listener);
        },
      },
    );
    socket.on("data", (bytes) => {
      try {
        for (const value of decoder.append(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes))) {
          LocalDaemonTransport.assertRequest(value);
          responses = responses
            .then(async () => {
              const response = await handler(value, send);
              if (response !== undefined) await send(response);
            })
            .catch(() => {
              socket.destroy();
            });
        }
      } catch {
        socket.destroy();
      }
    });
    socket.once("end", () => {
      try {
        decoder.assertComplete();
      } catch {
        socket.destroy();
      }
    });
    socket.once("close", () => {
      for (const listener of closeListeners) {
        try {
          listener();
        } catch {}
      }
      closeListeners.clear();
    });
    socket.once("error", () => socket.destroy());
  }

  private writeFrame(socket: Socket, value: unknown): void {
    this.writeEncodedFrame(socket, this.encodeFrame(value));
  }

  private async writeServerMessage(socket: Socket, message: DaemonServerMessage): Promise<void> {
    if ("kind" in message) {
      await this.writeEncodedServerFrame(socket, this.encodeFrame(message));
      return;
    }
    await this.writeEncodedServerFrame(socket, DaemonResultChunkCodec.encode(message));
  }

  private async writeEncodedServerFrame(socket: Socket, frame: Buffer): Promise<void> {
    const chunkSize = this.writeChunkSize ?? frame.length;
    for (let offset = 0; offset < frame.length; offset += chunkSize) {
      if (socket.destroyed) throw new Error("Daemon socket closed during response delivery");
      const accepted = socket.write(frame.subarray(offset, offset + chunkSize));
      if (!accepted) await LocalDaemonTransport.waitForDrain(socket);
    }
  }

  private static waitForDrain(socket: Socket): Promise<void> {
    return new Promise((resolve, reject) => {
      const cleanup = (): void => {
        socket.off("drain", drained);
        socket.off("error", failed);
        socket.off("close", closed);
      };
      const drained = (): void => {
        cleanup();
        resolve();
      };
      const failed = (error: Error): void => {
        cleanup();
        reject(error);
      };
      const closed = (): void => {
        cleanup();
        reject(new Error("Daemon socket closed during response delivery"));
      };
      socket.once("drain", drained);
      socket.once("error", failed);
      socket.once("close", closed);
    });
  }

  private encodeFrame(value: unknown): Buffer {
    const payload = Buffer.from(JSON.stringify(value), "utf8");
    if (payload.length > this.maximumFrameBytes) {
      throw new Error(\`Daemon frame exceeds \${this.maximumFrameBytes} bytes\`);
    }
    const prefix = Buffer.alloc(4);
    prefix.writeUInt32BE(payload.length);
    return Buffer.concat([prefix, payload]);
  }

  private writeEncodedFrame(socket: Pick<Socket, "write">, frame: Buffer): void {
    if (this.writeChunkSize === undefined) {
      socket.write(frame);
      return;
    }
    for (let offset = 0; offset < frame.length; offset += this.writeChunkSize) {
      socket.write(frame.subarray(offset, offset + this.writeChunkSize));
    }
  }

  private static responseFor(
    request: DaemonLifecycleRequest | DaemonExecutionStatusRequest,
    value: unknown,
  ): DaemonLifecycleResponse | DaemonExecutionStatusResponse {
    LocalDaemonTransport.assertResponse(value);
    if (request.kind === "identify") {
      if (value.kind !== "identity") {
        throw new DaemonResponseError("corrupt", "Daemon returned a non-identity response");
      }
      if (value.instanceId !== request.instanceId || value.processToken !== request.processToken) {
        throw new DaemonResponseError(
          "authentication",
          "Daemon identity does not match process instance",
          value.instanceId === request.instanceId ? value.instanceId : undefined,
        );
      }
      return value;
    }
    if (request.kind === "terminate" || request.kind === "kill") {
      const expectedKind = request.kind === "terminate" ? "terminating" : "killing";
      if (value.kind !== expectedKind) {
        throw new DaemonResponseError("corrupt", "Daemon returned a non-termination response");
      }
      if (value.instanceId !== request.instanceId || value.processToken !== request.processToken) {
        throw new DaemonResponseError(
          "authentication",
          "Daemon termination does not match process instance",
          value.instanceId === request.instanceId ? value.instanceId : undefined,
        );
      }
      return value;
    }
    if (request.kind === "ping") {
      if (value.kind !== "pong") {
        throw new DaemonResponseError(
          "corrupt",
          "Daemon pong does not match request protocol and instance",
        );
      }
      if (value.instanceId !== request.instanceId) {
        throw new DaemonResponseError(
          "authentication",
          "Daemon pong does not match request instance",
        );
      }
      if (value.protocolVersion !== request.protocolVersion) {
        throw new DaemonResponseError(
          "incompatible",
          "Daemon pong does not match request protocol",
          value.instanceId,
        );
      }
      return value;
    }
    if (request.kind === "execution-status") {
      if (value.kind !== "execution-status") {
        throw new DaemonResponseError("corrupt", "Daemon returned a non-status response");
      }
      LocalDaemonTransport.assertExecutionCoordinates(request, value);
      return value;
    }
    if (value.kind !== "stopped") {
      throw new DaemonResponseError("corrupt", "Daemon returned a non-stop response");
    }
    if (value.instanceId !== request.instanceId) {
      throw new DaemonResponseError(
        "authentication",
        "Daemon stop response does not match instance",
      );
    }
    return value;
  }

  private static assertRequest(value: unknown): asserts value is DaemonRequest {
    if (!LocalDaemonTransport.isRecord(value) || typeof value.kind !== "string") {
      throw new Error("Malformed daemon request");
    }
    if (value.kind === "identify" || value.kind === "terminate" || value.kind === "kill") {
      if (typeof value.instanceId !== "string" || typeof value.processToken !== "string") {
        throw new Error("Malformed daemon identity request");
      }
      return;
    }
    if (typeof value.protocolVersion !== "number" || typeof value.instanceId !== "string") {
      throw new Error("Malformed daemon request envelope");
    }
    if (value.kind === "ping" || value.kind === "stop") return;
    if (
      (value.kind !== "execute" &&
        value.kind !== "execution-status" &&
        value.kind !== "result-fetch" &&
        value.kind !== "result-ack") ||
      typeof value.processToken !== "string" ||
      !DaemonRuntimeValues.isRequestId(value.requestId) ||
      (value.kind === "execute" && !LocalDaemonTransport.isExecutionRequest(value.request)) ||
      (value.kind === "result-fetch" && !LocalDaemonTransport.isCount(value.offset)) ||
      (value.kind === "result-ack" && typeof value.transferId !== "string")
    ) {
      throw new Error("Malformed daemon execution request");
    }
  }

  private static assertResponse(value: unknown): asserts value is DaemonResponse {
    if (!LocalDaemonTransport.isRecord(value) || typeof value.kind !== "string") {
      throw new Error("Malformed daemon response");
    }
    if (value.kind === "pong") {
      if (
        typeof value.protocolVersion !== "number" ||
        typeof value.instanceId !== "string" ||
        typeof value.symnavVersion !== "string" ||
        (value.state !== undefined &&
          value.state !== "starting" &&
          value.state !== "ready" &&
          value.state !== "busy") ||
        (value.startedAt !== undefined && typeof value.startedAt !== "number") ||
        (value.fileCount !== undefined && typeof value.fileCount !== "number") ||
        (value.memoryBytes !== undefined && typeof value.memoryBytes !== "number") ||
        (value.lastNavigationAt !== undefined && typeof value.lastNavigationAt !== "number") ||
        (value.currentCommand !== undefined && typeof value.currentCommand !== "string") ||
        (value.currentCommandElapsedMs !== undefined &&
          typeof value.currentCommandElapsedMs !== "number") ||
        (value.queued !== undefined && typeof value.queued !== "number") ||
        (value.activity !== undefined && !LocalDaemonTransport.isActivitySnapshot(value.activity))
      ) {
        throw new Error("Malformed daemon pong");
      }
      return;
    }
    if (value.kind === "identity") {
      if (
        typeof value.instanceId !== "string" ||
        typeof value.processToken !== "string" ||
        !Number.isInteger(value.pid) ||
        typeof value.startedAt !== "number"
      ) {
        throw new Error("Malformed daemon identity");
      }
      return;
    }
    if (value.kind === "terminating" || value.kind === "killing") {
      if (typeof value.instanceId !== "string" || typeof value.processToken !== "string") {
        throw new Error("Malformed daemon termination response");
      }
      return;
    }
    if (value.kind === "stopped") {
      if (typeof value.instanceId !== "string") throw new Error("Malformed daemon stop response");
      return;
    }
    if (
      value.kind === "accepted" ||
      value.kind === "rejected" ||
      value.kind === "result-manifest" ||
      value.kind === "result-end" ||
      value.kind === "execution-failed"
    ) {
      LocalDaemonTransport.assertExecutionFrame(value);
      return;
    }
    if (value.kind === "execution-status") {
      if (
        typeof value.instanceId !== "string" ||
        typeof value.processToken !== "string" ||
        !DaemonRuntimeValues.isRequestId(value.requestId) ||
        !LocalDaemonTransport.isExecutionStatus(value.status)
      ) {
        throw new Error("Malformed daemon execution status");
      }
      return;
    }
    if (value.kind === "result-acknowledged") {
      if (
        typeof value.instanceId !== "string" ||
        typeof value.processToken !== "string" ||
        !DaemonRuntimeValues.isRequestId(value.requestId) ||
        typeof value.transferId !== "string"
      ) {
        throw new Error("Malformed daemon result acknowledgement");
      }
      return;
    }
    throw new Error("Malformed daemon response");
  }

  private static transportError(
    error: unknown,
    delivery: DaemonDeliveryState,
  ): DaemonTransportError {
    if (error instanceof DaemonTransportError) return error;
    if (error instanceof DaemonResponseError) {
      return new DaemonTransportError(
        error.code,
        "accepted",
        error.message,
        error.authenticatedInstanceId,
      );
    }
    const message = error instanceof Error ? error.message : String(error);
    return new DaemonTransportError("corrupt", delivery, message);
  }

  private static executionFrameFor(
    request: DaemonExecuteRequest,
    value: unknown,
  ): DaemonExecutionServerFrame {
    LocalDaemonTransport.assertResponse(value);
    if (
      value.kind !== "accepted" &&
      value.kind !== "rejected" &&
      value.kind !== "result-manifest" &&
      value.kind !== "result-end" &&
      value.kind !== "execution-failed"
    ) {
      throw new DaemonResponseError("corrupt", "Daemon returned a non-execution frame");
    }
    LocalDaemonTransport.assertExecutionCoordinates(request, value);
    return value;
  }

  private static assertExecutionCoordinates(
    request: Pick<DaemonExecuteRequest, "instanceId" | "processToken" | "requestId">,
    response: Pick<DaemonExecutionServerFrame, "instanceId" | "processToken" | "requestId">,
  ): void {
    if (response.instanceId !== request.instanceId) {
      throw new DaemonResponseError("authentication", "Daemon execution instance does not match");
    }
    if (response.processToken !== request.processToken) {
      throw new DaemonResponseError(
        "authentication",
        "Daemon execution process token does not match",
        response.instanceId,
      );
    }
    if (response.requestId !== request.requestId) {
      throw new DaemonResponseError(
        "corrupt",
        "Daemon execution request identifier does not match",
        response.instanceId,
      );
    }
  }

  private static assertExecutionFrame(
    value: Record<string, unknown>,
  ): asserts value is DaemonExecutionServerFrame {
    if (
      typeof value.instanceId !== "string" ||
      typeof value.processToken !== "string" ||
      !DaemonRuntimeValues.isRequestId(value.requestId)
    ) {
      throw new Error("Malformed daemon execution frame");
    }
    if (value.kind === "accepted") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "acceptedAt",
          "queuePosition",
        ]) ||
        !LocalDaemonTransport.isMetric(value.acceptedAt) ||
        !LocalDaemonTransport.isCount(value.queuePosition)
      ) {
        throw new Error("Malformed daemon acceptance");
      }
      return;
    }
    if (value.kind === "rejected") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "code",
          "retrySafe",
        ]) ||
        !LocalDaemonTransport.isExecuteRejectionCode(value.code) ||
        typeof value.retrySafe !== "boolean"
      ) {
        throw new Error("Malformed daemon execution rejection");
      }
      return;
    }
    if (value.kind === "result-manifest") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "manifest",
        ]) ||
        !LocalDaemonTransport.isCompletionManifest(value.manifest) ||
        value.manifest.instanceId !== value.instanceId ||
        value.manifest.requestId !== value.requestId
      ) {
        throw new Error("Malformed daemon result manifest");
      }
      return;
    }
    if (value.kind === "result-end") {
      if (
        !LocalDaemonTransport.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "transferId",
          "rawBytes",
          "recordCount",
          "sha256",
        ]) ||
        typeof value.transferId !== "string" ||
        !LocalDaemonTransport.isCount(value.rawBytes) ||
        !LocalDaemonTransport.isCount(value.recordCount) ||
        !LocalDaemonTransport.isDigest(value.sha256)
      ) {
        throw new Error("Malformed daemon result end");
      }
      return;
    }
    if (
      !LocalDaemonTransport.hasExactKeys(value, [
        "kind",
        "instanceId",
        "processToken",
        "requestId",
        "code",
      ]) ||
      !LocalDaemonTransport.isExecutionFailureCode(value.code)
    ) {
      throw new Error("Malformed daemon execution failure");
    }
  }

  private static isCompletionManifest(value: unknown): value is CompletionSpoolManifest {
    return (
      LocalDaemonTransport.isRecord(value) &&
      LocalDaemonTransport.hasExactKeys(value, [
        "transferId",
        "requestId",
        "instanceId",
        "exitCode",
        "rawBytes",
        "recordCount",
        "sha256",
      ]) &&
      typeof value.transferId === "string" &&
      value.transferId.length > 0 &&
      DaemonRuntimeValues.isRequestId(value.requestId) &&
      typeof value.instanceId === "string" &&
      value.instanceId.length > 0 &&
      LocalDaemonTransport.isCount(value.exitCode) &&
      LocalDaemonTransport.isCount(value.rawBytes) &&
      LocalDaemonTransport.isCount(value.recordCount) &&
      LocalDaemonTransport.isDigest(value.sha256)
    );
  }

  private static isDigest(value: unknown): value is string {
    return typeof value === "string" && /^[a-f\\d]{64}$/.test(value);
  }

  private static isExecuteRejectionCode(value: unknown): boolean {
    return (
      value === "not-ready" ||
      value === "draining" ||
      value === "resource-pressure" ||
      value === "incompatible"
    );
  }

  private static isExecutionFailureCode(value: unknown): value is DaemonExecutionFailureCode {
    return (
      value === "worker-exit" ||
      value === "controlled-resource" ||
      value === "response-capacity" ||
      value === "stopping" ||
      value === "internal"
    );
  }

  private static isExecutionStatus(value: unknown): value is DaemonExecutionStatus {
    if (!LocalDaemonTransport.isRecord(value)) return false;
    if (value.state === "unknown" || value.state === "completed") return true;
    if (value.state === "queued") return LocalDaemonTransport.isCount(value.queuePosition);
    if (value.state === "running") return LocalDaemonTransport.isMetric(value.startedAt);
    return value.state === "failed" && LocalDaemonTransport.isExecutionFailureCode(value.code);
  }

  private static isActivitySnapshot(value: unknown): boolean {
    if (!LocalDaemonTransport.isRecord(value)) return false;
    const lifecycle = value.lifecycle;
    const current = value.current;
    const expectedKeys = [
      "lifecycle",
      "pid",
      "startedAt",
      "startupElapsedMs",
      "processRssBytes",
      "hardProcessRssBytes",
      "workerGeneration",
      "queued",
      "spoolBytes",
    ];
    if (value.workerHeapUsedBytes !== undefined) expectedKeys.push("workerHeapUsedBytes");
    if (value.lastCompletedAgoMs !== undefined) expectedKeys.push("lastCompletedAgoMs");
    if (
      lifecycle === "ready" ||
      lifecycle === "busy" ||
      ((lifecycle === "recovering" || lifecycle === "draining") && value.fileCount !== undefined)
    ) {
      expectedKeys.push("fileCount");
    }
    if (lifecycle === "busy") expectedKeys.push("current");
    if (lifecycle === "recovering") expectedKeys.push("recoveryDetail");
    return (
      (lifecycle === "starting" ||
        lifecycle === "ready" ||
        lifecycle === "busy" ||
        lifecycle === "recovering" ||
        lifecycle === "draining") &&
      LocalDaemonTransport.hasExactKeys(value, expectedKeys) &&
      (lifecycle !== "recovering" ||
        value.recoveryDetail === "resource-pressure" ||
        value.recoveryDetail === "worker-replacement") &&
      Number.isInteger(value.pid) &&
      (value.pid as number) > 0 &&
      LocalDaemonTransport.isMetric(value.startedAt) &&
      LocalDaemonTransport.isMetric(value.startupElapsedMs) &&
      (lifecycle === "ready" || lifecycle === "busy"
        ? LocalDaemonTransport.isCount(value.fileCount)
        : lifecycle === "starting"
          ? value.fileCount === undefined
          : value.fileCount === undefined || LocalDaemonTransport.isCount(value.fileCount)) &&
      LocalDaemonTransport.isCount(value.processRssBytes) &&
      LocalDaemonTransport.isCount(value.hardProcessRssBytes) &&
      (value.workerHeapUsedBytes === undefined ||
        LocalDaemonTransport.isCount(value.workerHeapUsedBytes)) &&
      LocalDaemonTransport.isCount(value.workerGeneration) &&
      (lifecycle !== "busy" ||
        (LocalDaemonTransport.isRecord(current) &&
          LocalDaemonTransport.hasExactKeys(current, ["requestId", "command", "elapsedMs"]) &&
          DaemonRuntimeValues.isRequestId(current.requestId) &&
          DaemonRuntimeValues.isCommandName(current.command) &&
          LocalDaemonTransport.isMetric(current.elapsedMs))) &&
      LocalDaemonTransport.isCount(value.queued) &&
      (value.lastCompletedAgoMs === undefined ||
        LocalDaemonTransport.isMetric(value.lastCompletedAgoMs)) &&
      LocalDaemonTransport.isCount(value.spoolBytes)
    );
  }

  private static isCount(value: unknown): boolean {
    return Number.isInteger(value) && (value as number) >= 0;
  }

  private static isMetric(value: unknown): boolean {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  }

  private static isExecutionRequest(value: unknown): boolean {
    if (!LocalDaemonTransport.isRecord(value)) return false;
    const expectedKeys = ["argv", "cwd", "telemetryEnabled"];
    if (value.executionMode !== undefined) expectedKeys.push("executionMode");
    return (
      LocalDaemonTransport.hasExactKeys(value, expectedKeys) &&
      Array.isArray(value.argv) &&
      value.argv.every((arg) => typeof arg === "string") &&
      typeof value.cwd === "string" &&
      typeof value.telemetryEnabled === "boolean" &&
      (value.executionMode === undefined ||
        value.executionMode === "cold" ||
        value.executionMode === "warm" ||
        value.executionMode === "fallback")
    );
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  private static isResultChunk(value: unknown): value is DaemonResultChunk {
    return (
      LocalDaemonTransport.isRecord(value) &&
      !("kind" in value) &&
      value.bytes instanceof Uint8Array
    );
  }

  private static hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    return (
      actual.length === expected.length && actual.every((key, index) => key === expected[index])
    );
  }
}
`},{subject:"pr-131-head",path:"packages/daemon/src/daemon-policy.ts",revision:"b100221db48754656328391b878299c5a0bab443",sha256:"7a3656def315dd18b43ec5a7db365e9896f2fe9518d49e89ecce707ee3c8d161",text:`const MEBIBYTE = 1024 * 1024;

interface DaemonRuntimeProcess {
  constrainedMemory?: () => number | undefined;
  binding(name: "os"): { getTotalMem(): number };
}

export interface DaemonSystemMemory {
  readonly totalBytes: number;
  readonly constrainedBytes?: number;
}

export interface DaemonPolicyValues {
  readonly transport: {
    readonly singleResponseTimeoutMs: number;
    readonly statusResponseTimeoutMs: number;
    readonly executionAdmissionTimeoutMs: number;
    readonly maximumJsonPayloadBytes: number;
    readonly maximumExecutionControlPayloadBytes: number;
  };
  readonly startup: {
    readonly coordinationGraceMs: number;
    readonly heartbeatIntervalMs: number;
    readonly authorizationPollIntervalMs: number;
    readonly observationPollIntervalMs: number;
    readonly previousInstanceTerminationTimeoutMs: number;
    readonly childFailureRetryLimit: number;
  };
  readonly shutdown: {
    readonly idleTimeoutMs: number;
    readonly stopTimeoutMs: number;
    readonly forcedTerminationReserveMaximumMs: number;
    readonly controllerPollIntervalMs: number;
    readonly processSignalExitTimeoutMs: number;
    readonly processExitPollIntervalMs: number;
    readonly resourceDrainAcknowledgementGraceMs: number;
    readonly resourceDrainAcknowledgementPollIntervalMs: number;
  };
  readonly delivery: {
    readonly postAcceptanceExecutionReattachmentLimit: number;
    readonly resultTransferResumeLimitPerExecutionAttempt: number;
  };
  readonly output: {
    readonly maximumChunkRawBytes: number;
    readonly inlineRawBytes: number;
    readonly maximumResultRawBytes: number;
    readonly maximumAggregateSpoolRawBytes: number;
  };
  readonly resources: {
    readonly effectiveMemoryBytes: number;
    readonly hardProcessRssBytes: number;
    readonly softProcessRssBytes: number;
    readonly resumeProcessRssBytes: number;
    readonly workerMaxOldGenerationSizeMiB: number;
    readonly supervisionIntervalMs: number;
    readonly replacementWindowMs: number;
    readonly replacementLimit: number;
    readonly workerHeapSampleIntervalMs: number;
  };
  readonly diagnostics: {
    readonly logRotateBytes: number;
    readonly logBackupCount: number;
    readonly maximumQueuedEvents: number;
    readonly disconnectedTraceRetentionMs: number;
    readonly maximumDisconnectedTraces: number;
  };
}

interface SerializedDaemonPolicy {
  readonly schemaVersion: 1;
  readonly values: DaemonPolicyValues;
}

export class DaemonPolicy {
  readonly values: DaemonPolicyValues;

  private constructor(values: DaemonPolicyValues) {
    this.values = DaemonPolicy.freeze(values);
    Object.freeze(this);
  }

  static currentSystem(): DaemonPolicy {
    const runtimeProcess = (globalThis as unknown as { process: DaemonRuntimeProcess }).process;
    const constrainedBytes = runtimeProcess.constrainedMemory?.();
    return DaemonPolicy.fromSystemMemory({
      totalBytes: runtimeProcess.binding("os").getTotalMem(),
      ...(constrainedBytes === undefined ? {} : { constrainedBytes }),
    });
  }

  static fromSystemMemory(memory: DaemonSystemMemory): DaemonPolicy {
    const effectiveMemoryBytes =
      memory.constrainedBytes !== undefined &&
      memory.constrainedBytes > 0 &&
      memory.constrainedBytes < memory.totalBytes
        ? memory.constrainedBytes
        : memory.totalBytes;
    const effectiveMemoryMiB = Math.max(1, Math.floor(effectiveMemoryBytes / MEBIBYTE));
    const hardProcessRssMiB = DaemonPolicy.clamp(Math.floor(effectiveMemoryMiB / 2), 256, 8_192);
    const workerMaxOldGenerationSizeMiB = DaemonPolicy.clamp(
      Math.floor(effectiveMemoryMiB / 4),
      128,
      4_096,
    );
    return new DaemonPolicy({
      transport: {
        singleResponseTimeoutMs: 250,
        statusResponseTimeoutMs: 100,
        executionAdmissionTimeoutMs: 5_000,
        maximumJsonPayloadBytes: 8 * MEBIBYTE,
        maximumExecutionControlPayloadBytes: 256 * 1024,
      },
      startup: {
        coordinationGraceMs: 15_000,
        heartbeatIntervalMs: 100,
        authorizationPollIntervalMs: 10,
        observationPollIntervalMs: 20,
        previousInstanceTerminationTimeoutMs: 5 * 60_000,
        childFailureRetryLimit: 1,
      },
      shutdown: {
        idleTimeoutMs: 30 * 60_000,
        stopTimeoutMs: 5_000,
        forcedTerminationReserveMaximumMs: 500,
        controllerPollIntervalMs: 20,
        processSignalExitTimeoutMs: 500,
        processExitPollIntervalMs: 20,
        resourceDrainAcknowledgementGraceMs: 250,
        resourceDrainAcknowledgementPollIntervalMs: 5,
      },
      delivery: {
        postAcceptanceExecutionReattachmentLimit: 1,
        resultTransferResumeLimitPerExecutionAttempt: 1,
      },
      output: {
        maximumChunkRawBytes: 64 * 1024,
        inlineRawBytes: 256 * 1024,
        maximumResultRawBytes: 256 * MEBIBYTE,
        maximumAggregateSpoolRawBytes: 512 * MEBIBYTE,
      },
      resources: {
        effectiveMemoryBytes,
        hardProcessRssBytes: hardProcessRssMiB * MEBIBYTE,
        softProcessRssBytes: Math.floor(hardProcessRssMiB * 0.8) * MEBIBYTE,
        resumeProcessRssBytes: Math.floor(hardProcessRssMiB * 0.7) * MEBIBYTE,
        workerMaxOldGenerationSizeMiB,
        supervisionIntervalMs: 250,
        replacementWindowMs: 10 * 60_000,
        replacementLimit: 2,
        workerHeapSampleIntervalMs: 25,
      },
      diagnostics: {
        logRotateBytes: 10 * MEBIBYTE,
        logBackupCount: 4,
        maximumQueuedEvents: 1_024,
        disconnectedTraceRetentionMs: 5 * 60_000,
        maximumDisconnectedTraces: 1_024,
      },
    });
  }

  static fromSerialized(value: unknown): DaemonPolicy {
    return new DaemonPolicy(DaemonPolicyCodec.parse(value));
  }

  toSerialized(): Readonly<SerializedDaemonPolicy> {
    return DaemonPolicyCodec.serialize(this);
  }

  private static clamp(value: number, minimum: number, maximum: number): number {
    return Math.max(minimum, Math.min(maximum, value));
  }

  private static freeze(values: DaemonPolicyValues): DaemonPolicyValues {
    for (const section of Object.values(values)) Object.freeze(section);
    return Object.freeze(values);
  }
}

class DaemonPolicyCodec {
  static serialize(policy: DaemonPolicy): SerializedDaemonPolicy {
    return Object.freeze({ schemaVersion: 1, values: policy.values });
  }

  static parse(value: unknown): DaemonPolicyValues {
    if (!DaemonPolicyCodec.isRecord(value)) throw new Error("Invalid daemon policy");
    DaemonPolicyCodec.exactKeys(value, ["schemaVersion", "values"]);
    if (value.schemaVersion !== 1 || !DaemonPolicyCodec.isRecord(value.values)) {
      throw new Error("Invalid daemon policy");
    }
    const values = value.values;
    DaemonPolicyCodec.validateValues(values);
    return JSON.parse(JSON.stringify(values)) as DaemonPolicyValues;
  }

  private static validateValues(values: Record<string, unknown>): void {
    DaemonPolicyCodec.exactKeys(values, [
      "transport",
      "startup",
      "shutdown",
      "delivery",
      "output",
      "resources",
      "diagnostics",
    ]);
    const transport = DaemonPolicyCodec.section(values, "transport", [
      "singleResponseTimeoutMs",
      "statusResponseTimeoutMs",
      "executionAdmissionTimeoutMs",
      "maximumJsonPayloadBytes",
      "maximumExecutionControlPayloadBytes",
    ]);
    const startup = DaemonPolicyCodec.section(values, "startup", [
      "coordinationGraceMs",
      "heartbeatIntervalMs",
      "authorizationPollIntervalMs",
      "observationPollIntervalMs",
      "previousInstanceTerminationTimeoutMs",
      "childFailureRetryLimit",
    ]);
    const shutdown = DaemonPolicyCodec.section(values, "shutdown", [
      "idleTimeoutMs",
      "stopTimeoutMs",
      "forcedTerminationReserveMaximumMs",
      "controllerPollIntervalMs",
      "processSignalExitTimeoutMs",
      "processExitPollIntervalMs",
      "resourceDrainAcknowledgementGraceMs",
      "resourceDrainAcknowledgementPollIntervalMs",
    ]);
    const delivery = DaemonPolicyCodec.section(values, "delivery", [
      "postAcceptanceExecutionReattachmentLimit",
      "resultTransferResumeLimitPerExecutionAttempt",
    ]);
    const output = DaemonPolicyCodec.section(values, "output", [
      "maximumChunkRawBytes",
      "inlineRawBytes",
      "maximumResultRawBytes",
      "maximumAggregateSpoolRawBytes",
    ]);
    const resources = DaemonPolicyCodec.section(values, "resources", [
      "effectiveMemoryBytes",
      "hardProcessRssBytes",
      "softProcessRssBytes",
      "resumeProcessRssBytes",
      "workerMaxOldGenerationSizeMiB",
      "supervisionIntervalMs",
      "replacementWindowMs",
      "replacementLimit",
      "workerHeapSampleIntervalMs",
    ]);
    const diagnostics = DaemonPolicyCodec.section(values, "diagnostics", [
      "logRotateBytes",
      "logBackupCount",
      "maximumQueuedEvents",
      "disconnectedTraceRetentionMs",
      "maximumDisconnectedTraces",
    ]);
    for (const section of [
      transport,
      startup,
      shutdown,
      delivery,
      output,
      resources,
      diagnostics,
    ]) {
      for (const value of Object.values(section)) DaemonPolicyCodec.nonnegativeInteger(value);
    }
    for (const [section, key] of [
      [startup, "heartbeatIntervalMs"],
      [startup, "authorizationPollIntervalMs"],
      [startup, "observationPollIntervalMs"],
      [shutdown, "controllerPollIntervalMs"],
      [shutdown, "processExitPollIntervalMs"],
      [shutdown, "resourceDrainAcknowledgementPollIntervalMs"],
      [resources, "supervisionIntervalMs"],
      [resources, "workerHeapSampleIntervalMs"],
    ] as const) {
      if (DaemonPolicyCodec.integer(section, key) <= 0) throw new Error("Invalid daemon policy");
    }
    const hardProcessRssBytes = DaemonPolicyCodec.integer(resources, "hardProcessRssBytes");
    const softProcessRssBytes = DaemonPolicyCodec.integer(resources, "softProcessRssBytes");
    const resumeProcessRssBytes = DaemonPolicyCodec.integer(resources, "resumeProcessRssBytes");
    if (
      hardProcessRssBytes <= softProcessRssBytes ||
      softProcessRssBytes <= resumeProcessRssBytes
    ) {
      throw new Error("Invalid daemon policy");
    }
    const maximumChunkRawBytes = DaemonPolicyCodec.integer(output, "maximumChunkRawBytes");
    const inlineRawBytes = DaemonPolicyCodec.integer(output, "inlineRawBytes");
    const maximumResultRawBytes = DaemonPolicyCodec.integer(output, "maximumResultRawBytes");
    const maximumAggregateSpoolRawBytes = DaemonPolicyCodec.integer(
      output,
      "maximumAggregateSpoolRawBytes",
    );
    if (
      maximumChunkRawBytes === 0 ||
      maximumChunkRawBytes > inlineRawBytes ||
      inlineRawBytes > maximumResultRawBytes ||
      maximumResultRawBytes > maximumAggregateSpoolRawBytes
    ) {
      throw new Error("Invalid daemon policy");
    }
  }

  private static section(
    values: Record<string, unknown>,
    name: string,
    keys: readonly string[],
  ): Record<string, unknown> {
    const section = values[name];
    if (!DaemonPolicyCodec.isRecord(section)) throw new Error("Invalid daemon policy");
    DaemonPolicyCodec.exactKeys(section, keys);
    return section;
  }

  private static exactKeys(value: Record<string, unknown>, keys: readonly string[]): void {
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
      throw new Error("Invalid daemon policy");
    }
  }

  private static nonnegativeInteger(value: unknown): asserts value is number {
    if (!Number.isSafeInteger(value) || (value as number) < 0) {
      throw new Error("Invalid daemon policy");
    }
  }

  private static integer(section: Record<string, unknown>, key: string): number {
    const value = section[key];
    DaemonPolicyCodec.nonnegativeInteger(value);
    return value;
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
`},{subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts",revision:"b100221db48754656328391b878299c5a0bab443",sha256:"59d2ea628dbe0a9307b336bc35baa564c886cbf42b49501315104ca2ba35f87f",text:`import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { createServer, type Server, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import { OrderedCommandOutput } from "../command-execution-result.js";
import {
  DAEMON_PROTOCOL_VERSION,
  type DaemonExecuteRequest,
  type DaemonExecutionServerFrame,
  type DaemonServerMessage,
} from "./daemon-protocol.js";
import { DaemonTransportError } from "./local-daemon-transport.js";
import { TestLocalDaemonTransport as LocalDaemonTransport } from "../../test/helpers/local-daemon-transport.js";
import {
  DaemonCompletionSpoolStore as RuntimeDaemonCompletionSpoolStore,
  type DaemonCompletionSpoolStoreOptions,
} from "./completion-spool.js";
import { DaemonResultChunkCodec } from "./daemon-result-chunk-codec.js";

const TEST_CHUNK_BYTES = 64 * 1024;

class DaemonCompletionSpoolStore extends RuntimeDaemonCompletionSpoolStore {
  constructor(options: Omit<DaemonCompletionSpoolStoreOptions, "policy">) {
    super({ ...options, policy: DaemonPolicy.currentSystem().values.output });
  }
}

const request: DaemonExecuteRequest = {
  kind: "execute",
  protocolVersion: DAEMON_PROTOCOL_VERSION,
  instanceId: "instance",
  processToken: "token",
  requestId: "request",
  request: { argv: ["overview", "src/a.ts"], cwd: "/repo", telemetryEnabled: false },
};

describe("LocalDaemonTransport execution delivery", () => {
  const servers: Server[] = [];
  const sockets: Socket[] = [];
  const directories: string[] = [];

  afterEach(async () => {
    vi.restoreAllMocks();
    for (const socket of sockets) socket.destroy();
    sockets.length = 0;
    await Promise.all(
      servers.map((server) => new Promise<void>((resolve) => server.close(() => resolve()))),
    );
    servers.length = 0;
    for (const directory of directories) rmSync(directory, { recursive: true, force: true });
    directories.length = 0;
  });

  it("uses the accepted-request protocol generation", () => {
    expect(DAEMON_PROTOCOL_VERSION).toBe(4);
  });

  it("classifies connection refusal before any write as retry-safe", async () => {
    const endpoint = executionEndpoint(directories);

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 25 }).execute(endpoint, request),
    ).rejects.toMatchObject({
      code: "unreachable",
      delivery: "not-submitted",
      retrySafe: true,
    } satisfies Partial<DaemonTransportError>);
  });

  it("classifies a close after submission but before acceptance as non-retryable", async () => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => socket.end());
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request),
    ).rejects.toMatchObject({
      code: "closed",
      delivery: "submitted-unconfirmed",
      retrySafe: false,
    } satisfies Partial<DaemonTransportError>);
  });

  it("preserves authenticated rejection retry safety", async () => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () =>
        socket.end(
          frame({
            kind: "rejected",
            instanceId: request.instanceId,
            processToken: request.processToken,
            requestId: request.requestId,
            code: "not-ready",
            retrySafe: true,
          } satisfies DaemonExecutionServerFrame),
        ),
      );
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request),
    ).rejects.toMatchObject({
      code: "rejected",
      delivery: "submitted-unconfirmed",
      retrySafe: true,
      authenticatedInstanceId: request.instanceId,
    } satisfies Partial<DaemonTransportError>);
  });

  it("allows execution admission beyond the lifecycle request timeout", async () => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => {
        setTimeout(
          () =>
            socket.end(
              Buffer.concat([
                frame(accepted()),
                frame({
                  kind: "execution-failed",
                  instanceId: request.instanceId,
                  processToken: request.processToken,
                  requestId: request.requestId,
                  code: "internal",
                } satisfies DaemonExecutionServerFrame),
              ]),
            ),
          40,
        );
      });
    });

    const receipt = await new LocalDaemonTransport({ requestTimeoutMs: 10 }).execute(
      endpoint,
      request,
    );

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
  });

  it("has no completion deadline after acceptance", async () => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => {
        socket.write(frame(accepted()));
        setTimeout(
          () =>
            socket.end(
              frame({
                kind: "execution-failed",
                instanceId: request.instanceId,
                processToken: request.processToken,
                requestId: request.requestId,
                code: "internal",
              } satisfies DaemonExecutionServerFrame),
            ),
          40,
        );
      });
    });

    const receipt = await new LocalDaemonTransport({ requestTimeoutMs: 10 }).execute(
      endpoint,
      request,
    );

    await expect(receipt.completion).resolves.toEqual({
      status: "failed",
      code: "internal",
    });
  });

  it("transfers and acknowledges a generated twelve MiB mixed-stream result", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-streamed-result-"));
    directories.push(directory);
    const endpoint = executionEndpoint(directories);
    const store = new DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    const chunkCount = (12 * 1024 * 1024) / TEST_CHUNK_BYTES;
    for (let sequence = 0; sequence < chunkCount; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.alloc(TEST_CHUNK_BYTES, sequence),
      });
    }
    const manifest = await spool.finish(0);
    const serverTransport = new LocalDaemonTransport();
    const server = await serverTransport.listen(endpoint, async (message, send) => {
      if (message.kind === "result-ack") {
        await spool.acknowledge();
        return {
          kind: "result-acknowledged",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          transferId: manifest.transferId,
        };
      }
      if (message.kind !== "execute") throw new Error("Unexpected request");
      send(accepted());
      send({
        kind: "result-manifest",
        instanceId: request.instanceId,
        processToken: request.processToken,
        requestId: request.requestId,
        manifest,
      });
      for await (const record of spool.read(0)) {
        const chunk: DaemonServerMessage = {
          transferId: manifest.transferId,
          requestId: request.requestId,
          offset: record.sequence,
          sequence: record.sequence,
          stream: record.stream,
          bytes: record.bytes,
        };
        send(chunk);
      }
      send({
        kind: "result-end",
        instanceId: request.instanceId,
        processToken: request.processToken,
        requestId: request.requestId,
        transferId: manifest.transferId,
        rawBytes: manifest.rawBytes,
        recordCount: manifest.recordCount,
        sha256: manifest.sha256,
      });
    });
    const receipt = await new LocalDaemonTransport().execute(endpoint, request);
    const completion = await receipt.completion;

    expect(completion.status).toBe("completed");
    if (completion.status !== "completed" || completion.result.output === undefined) return;
    expect(completion.result.output.summary).toEqual({
      rawBytes: manifest.rawBytes,
      recordCount: manifest.recordCount,
      sha256: manifest.sha256,
    });
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    await completion.result.output.dispose();
    await server.close();
  }, 20_000);

  it("advances one client record only after its spool append completes", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-stalled-client-spool-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    for (let sequence = 0; sequence < 3; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.alloc(TEST_CHUNK_BYTES, sequence),
      });
    }
    const manifest = await spool.finish(0);
    let appendCalls = 0;
    let activeAppends = 0;
    let maximumActiveAppends = 0;
    let markAppendStarted!: () => void;
    let releaseAppend!: () => void;
    const appendStarted = new Promise<void>((resolve) => {
      markAppendStarted = resolve;
    });
    const appendGate = new Promise<void>((resolve) => {
      releaseAppend = resolve;
    });
    const appendRecord = OrderedCommandOutput.prototype.appendRecord;
    vi.spyOn(OrderedCommandOutput.prototype, "appendRecord").mockImplementation(async function (
      this: OrderedCommandOutput,
      record,
    ) {
      appendCalls += 1;
      activeAppends += 1;
      maximumActiveAppends = Math.max(maximumActiveAppends, activeAppends);
      markAppendStarted();
      if (appendCalls === 1) await appendGate;
      try {
        await appendRecord.call(this, record);
      } finally {
        activeAppends -= 1;
      }
    });
    let acknowledgementCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
        if (message.kind === "execute") {
          void encodedResult(spool, manifest).then((resultBytes) => socket.write(resultBytes));
          return;
        }
        if (message.kind === "result-ack") {
          acknowledgementCount += 1;
          socket.end(
            frame({
              kind: "result-acknowledged",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              transferId: manifest.transferId,
            }),
          );
        }
      });
    });
    const receipt = await new LocalDaemonTransport({
      outputDirectory: join(directory, "client"),
      outputInlineBytes: 0,
    }).execute(endpoint, request);

    await appendStarted;
    expect(appendCalls).toBe(1);
    expect(maximumActiveAppends).toBe(1);
    expect(acknowledgementCount).toBe(0);
    releaseAppend();
    const completion = await receipt.completion;

    expect(appendCalls).toBe(3);
    expect(maximumActiveAppends).toBe(1);
    expect(acknowledgementCount).toBe(1);
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it("resumes after a stalled append at the first durably missing record", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-stalled-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    for (let sequence = 0; sequence < 3; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.from(\`record-\${sequence}\`),
      });
    }
    const manifest = await spool.finish(0);
    let markAppendStarted!: () => void;
    let releaseAppend!: () => void;
    const appendStarted = new Promise<void>((resolve) => {
      markAppendStarted = resolve;
    });
    const appendGate = new Promise<void>((resolve) => {
      releaseAppend = resolve;
    });
    const appendRecord = OrderedCommandOutput.prototype.appendRecord;
    let appendCalls = 0;
    vi.spyOn(OrderedCommandOutput.prototype, "appendRecord").mockImplementation(async function (
      this: OrderedCommandOutput,
      record,
    ) {
      appendCalls += 1;
      markAppendStarted();
      if (appendCalls === 1) await appendGate;
      await appendRecord.call(this, record);
    });
    const fetchOffsets: number[] = [];
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as {
          kind: string;
          offset?: number;
        };
        if (message.kind === "execute") {
          void firstEncodedRecord(spool, manifest).then((record) =>
            socket.end(Buffer.concat([frame(accepted()), frame(resultManifest(manifest)), record])),
          );
          return;
        }
        if (message.kind === "result-fetch") {
          fetchOffsets.push(message.offset ?? -1);
          socket.write(frame(resultManifest(manifest)));
          void sendRecords(socket, spool, manifest.transferId, message.offset ?? 0).then(() =>
            socket.write(frame(resultEnd(manifest))),
          );
          return;
        }
        if (message.kind === "result-ack") {
          socket.end(
            frame({
              kind: "result-acknowledged",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              transferId: manifest.transferId,
            }),
          );
        }
      });
    });
    const receipt = await new LocalDaemonTransport().execute(endpoint, request);

    await appendStarted;
    expect(fetchOffsets).toEqual([]);
    releaseAppend();
    const completion = await receipt.completion;

    expect(fetchOffsets).toEqual([1]);
    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it("resumes a disconnected result transfer at the contiguous record offset", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-resumed-result-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    for (let sequence = 0; sequence < 5; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.from(\`record-\${sequence}\\n\`),
      });
    }
    const manifest = await spool.finish(0);
    const fetchOffsets: number[] = [];
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as {
          kind: string;
          offset?: number;
        };
        if (message.kind === "execute") {
          socket.write(frame(accepted()));
          socket.write(frame(resultManifest(manifest)));
          void sendRecords(socket, spool, manifest.transferId, 0, 2).then(() => socket.end());
          return;
        }
        if (message.kind === "result-fetch") {
          fetchOffsets.push(message.offset ?? -1);
          socket.write(frame(resultManifest(manifest)));
          void sendRecords(socket, spool, manifest.transferId, message.offset ?? 0).then(() =>
            socket.write(frame(resultEnd(manifest))),
          );
          return;
        }
        if (message.kind === "result-ack") {
          void spool.acknowledge().then(() =>
            socket.end(
              frame({
                kind: "result-acknowledged",
                instanceId: request.instanceId,
                processToken: request.processToken,
                requestId: request.requestId,
                transferId: manifest.transferId,
              }),
            ),
          );
        }
      });
    });

    const receipt = await new LocalDaemonTransport().execute(endpoint, request);
    const completion = await receipt.completion;

    expect(fetchOffsets).toEqual([2]);
    expect(completion).toMatchObject({
      status: "completed",
      result: {
        exitCode: 0,
        output: {
          summary: {
            rawBytes: manifest.rawBytes,
            recordCount: manifest.recordCount,
            sha256: manifest.sha256,
          },
        },
      },
    });
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    if (completion.status === "completed") await completion.result.output?.dispose();
  });

  it.each([
    "duplicate-manifest",
    "missing-manifest",
    "wrong-transfer",
    "wrong-raw-bytes",
    "wrong-record-count",
    "wrong-digest",
    "duplicate-end",
    "chunk-after-end",
  ] as const)("rejects corrupt resumed transfer control: %s", async (corruption) => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-corrupt-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    for (let sequence = 0; sequence < 4; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.from(\`record-\${sequence}\\n\`),
      });
    }
    const manifest = await spool.finish(0);
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
        if (message.kind === "execute") {
          socket.write(frame(accepted()));
          socket.write(frame(resultManifest(manifest)));
          void sendRecords(socket, spool, manifest.transferId, 0, 2).then(() => socket.end());
          return;
        }
        if (message.kind === "result-ack") {
          socket.end(
            frame({
              kind: "result-acknowledged",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              transferId: manifest.transferId,
            }),
          );
          return;
        }
        if (message.kind !== "result-fetch") return;
        if (corruption !== "missing-manifest") socket.write(frame(resultManifest(manifest)));
        if (corruption === "duplicate-manifest") socket.write(frame(resultManifest(manifest)));
        void sendRecords(socket, spool, manifest.transferId, 2).then(() => {
          const end = {
            ...resultEnd(manifest),
            ...(corruption === "wrong-transfer" ? { transferId: "other-transfer" } : {}),
            ...(corruption === "wrong-raw-bytes" ? { rawBytes: manifest.rawBytes + 1 } : {}),
            ...(corruption === "wrong-record-count"
              ? { recordCount: manifest.recordCount + 1 }
              : {}),
            ...(corruption === "wrong-digest" ? { sha256: "0".repeat(64) } : {}),
          } satisfies Extract<DaemonExecutionServerFrame, { kind: "result-end" }>;
          const encodedEnd = frame(end);
          if (corruption === "duplicate-end") {
            socket.write(Buffer.concat([encodedEnd, encodedEnd]));
          } else if (corruption === "chunk-after-end") {
            socket.write(
              Buffer.concat([
                encodedEnd,
                DaemonResultChunkCodec.encode(
                  {
                    transferId: manifest.transferId,
                    requestId: request.requestId,
                    offset: manifest.recordCount,
                    sequence: manifest.recordCount,
                    stream: "stdout",
                    bytes: Buffer.from("late"),
                  },
                  TEST_CHUNK_BYTES,
                ),
              ]),
            );
          } else {
            socket.write(encodedEnd);
          }
        });
      });
    });
    const clientDirectory = join(directory, "client");
    const receipt = await new LocalDaemonTransport({
      outputDirectory: clientDirectory,
      outputInlineBytes: 0,
    }).execute(endpoint, request);

    await expect(receipt.completion).rejects.toMatchObject({
      code: "corrupt",
      delivery: "accepted",
      retrySafe: false,
    } satisfies Partial<DaemonTransportError>);
    expect(store.usage()).toEqual({
      rawBytes: manifest.rawBytes,
      completionCount: 1,
    });
    expect(
      await import("node:fs/promises").then(({ readdir }) => readdir(clientDirectory)),
    ).toEqual([]);
  });

  it.each(["eof", "close", "malformed", "multiple", "multiple-separated"] as const)(
    "settles an accepted completion when the acknowledgement response is %s",
    async (acknowledgementFailure) => {
      const directory = mkdtempSync(join(tmpdir(), "symnav-result-acknowledgement-"));
      directories.push(directory);
      const store = new DaemonCompletionSpoolStore({
        directory: join(directory, "daemon"),
        workspaceKey: "workspace",
        instanceId: request.instanceId,
      });
      const spool = await store.create(request.requestId);
      await spool.append({
        sequence: 0,
        stream: "stdout",
        bytes: Buffer.alloc(TEST_CHUNK_BYTES, 7),
      });
      const manifest = await spool.finish(0);
      const acknowledgement = frame({
        kind: "result-acknowledged",
        instanceId: request.instanceId,
        processToken: request.processToken,
        requestId: request.requestId,
        transferId: manifest.transferId,
      });
      const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
        socket.once("data", (encoded) => {
          const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
          const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
          if (message.kind === "execute") {
            socket.write(frame(accepted()));
            socket.write(frame(resultManifest(manifest)));
            void sendRecords(socket, spool, manifest.transferId, 0).then(() =>
              socket.write(frame(resultEnd(manifest))),
            );
            return;
          }
          if (message.kind !== "result-ack") return;
          void spool.acknowledge().then(() => {
            if (acknowledgementFailure === "eof") socket.end();
            else if (acknowledgementFailure === "close") socket.destroy();
            else if (acknowledgementFailure === "malformed") {
              socket.end(Buffer.from([0, 0, 0, 4, 0x7b]));
            } else if (acknowledgementFailure === "multiple") {
              socket.end(Buffer.concat([acknowledgement, acknowledgement]));
            } else {
              socket.write(acknowledgement);
              setImmediate(() => socket.end(acknowledgement));
            }
          });
        });
      });
      const clientDirectory = join(directory, "client");
      const receipt = await new LocalDaemonTransport({
        requestTimeoutMs: 100,
        outputDirectory: clientDirectory,
        outputInlineBytes: 0,
      }).execute(endpoint, request);

      await expect(settleWithin(receipt.completion, 500)).rejects.toMatchObject({
        delivery: "accepted",
        retrySafe: false,
      } satisfies Partial<DaemonTransportError>);
      expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
      expect(
        await import("node:fs/promises").then(({ readdir }) => readdir(clientDirectory)),
      ).toEqual([]);
    },
  );

  it("cleans client output and fails without replay when the daemon dies before resume", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-dead-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    for (let sequence = 0; sequence < 4; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.alloc(TEST_CHUNK_BYTES, sequence),
      });
    }
    const manifest = await spool.finish(0);
    const endpoint = executionEndpoint(directories);
    const server = createServer((socket) => {
      sockets.push(socket);
      socket.once("data", () => {
        socket.write(frame(accepted()));
        socket.write(frame(resultManifest(manifest)));
        void sendRecords(socket, spool, manifest.transferId, 0, 2).then(() => {
          server.close();
          socket.end();
        });
      });
    });
    servers.push(server);
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(endpoint, resolve);
    });
    const clientDirectory = join(directory, "client");
    const receipt = await new LocalDaemonTransport({
      requestTimeoutMs: 100,
      outputDirectory: clientDirectory,
      outputInlineBytes: 0,
    }).execute(endpoint, request);

    await expect(receipt.completion).rejects.toMatchObject({
      code: "closed",
      delivery: "accepted",
      retrySafe: false,
    });
    expect(
      await import("node:fs/promises").then(({ readdir }) => readdir(clientDirectory)),
    ).toEqual([]);
  });

  it("disposes partial client output when daemon delivery fails after its manifest", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-failed-delivery-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    await spool.append({
      sequence: 0,
      stream: "stdout",
      bytes: Buffer.alloc(TEST_CHUNK_BYTES, 3),
    });
    const manifest = await spool.finish(0);
    let acknowledgementCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
        if (message.kind === "result-ack") {
          acknowledgementCount += 1;
          return;
        }
        socket.write(frame(accepted()));
        socket.write(frame(resultManifest(manifest)));
        void sendRecords(socket, spool, manifest.transferId, 0).then(() =>
          socket.write(
            frame({
              kind: "execution-failed",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              code: "internal",
            }),
          ),
        );
      });
    });
    const clientDirectory = join(directory, "client");
    const receipt = await new LocalDaemonTransport({
      outputDirectory: clientDirectory,
      outputInlineBytes: 0,
    }).execute(endpoint, request);

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
    expect(acknowledgementCount).toBe(0);
    expect(
      await import("node:fs/promises").then(({ readdir }) => readdir(clientDirectory)),
    ).toEqual([]);
  });

  it("reports EOF after acceptance as a typed post-accept failure", async () => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => socket.end(frame(accepted())));
    });

    const receipt = await new LocalDaemonTransport({ requestTimeoutMs: 100 }).execute(
      endpoint,
      request,
    );

    await expect(receipt.completion).rejects.toMatchObject({
      code: "closed",
      delivery: "accepted",
      retrySafe: false,
      authenticatedInstanceId: request.instanceId,
    } satisfies Partial<DaemonTransportError>);
  });

  it("reattaches once with the same request after accepted delivery closes", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-accepted-reattach-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    const manifest = await spool.finish(0);
    let executeCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
        if (message.kind === "result-ack") {
          socket.end(
            frame({
              kind: "result-acknowledged",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              transferId: manifest.transferId,
            }),
          );
          return;
        }
        executeCount += 1;
        if (executeCount === 1) {
          socket.end(frame(accepted()));
          return;
        }
        socket.end(
          Buffer.concat([
            frame(accepted()),
            frame(resultManifest(manifest)),
            frame(resultEnd(manifest)),
          ]),
        );
      });
    });

    const receipt = await new LocalDaemonTransport({ requestTimeoutMs: 100 }).execute(
      endpoint,
      request,
    );

    const completion = await receipt.completion;

    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    expect(executeCount).toBe(2);
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it("gives the reattached execute attempt its own fetch resume", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-reattach-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    const manifest = await spool.finish(0);
    let executeCount = 0;
    let fetchCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
        if (message.kind === "result-ack") {
          socket.end(
            frame({
              kind: "result-acknowledged",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              transferId: manifest.transferId,
            }),
          );
          return;
        }
        if (message.kind === "result-fetch") {
          fetchCount += 1;
          socket.end(Buffer.concat([frame(resultManifest(manifest)), frame(resultEnd(manifest))]));
          return;
        }
        executeCount += 1;
        socket.end(
          executeCount === 1
            ? frame(accepted())
            : Buffer.concat([frame(accepted()), frame(resultManifest(manifest))]),
        );
      });
    });

    const receipt = await new LocalDaemonTransport().execute(endpoint, request);
    const completion = await receipt.completion;

    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    expect({ executeCount, fetchCount }).toEqual({ executeCount: 2, fetchCount: 1 });
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it.each([
    ["instance", { ...accepted(), instanceId: "other" }],
    ["token", { ...accepted(), processToken: "other" }],
    ["request identifier", { ...accepted(), requestId: "other" }],
    [
      "completion before acceptance",
      {
        kind: "execution-failed",
        instanceId: request.instanceId,
        processToken: request.processToken,
        requestId: request.requestId,
        code: "internal",
      },
    ],
    ["duplicate acceptance", [accepted(), accepted()]],
    [
      "duplicate terminal frame",
      [
        accepted(),
        {
          kind: "execution-failed",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          code: "internal",
        },
        {
          kind: "execution-failed",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          code: "internal",
        },
      ],
    ],
    [
      "unknown failure code",
      [
        accepted(),
        {
          kind: "execution-failed",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          code: "unknown",
        },
      ],
    ],
  ])("rejects invalid execution frame sequence: %s", async (_name, response) => {
    const frames = Array.isArray(response) ? response : [response];
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => socket.end(Buffer.concat(frames.map(frame))));
    });
    const transport = new LocalDaemonTransport({ requestTimeoutMs: 100 });

    const execution = transport.execute(endpoint, request);
    await expect(execution.then((receipt) => receipt.completion)).rejects.toMatchObject({
      code: expect.stringMatching(/authentication|corrupt/),
      retrySafe: false,
    });
  });
});

function accepted(): DaemonExecutionServerFrame {
  return {
    kind: "accepted",
    instanceId: request.instanceId,
    processToken: request.processToken,
    requestId: request.requestId,
    acceptedAt: 10,
    queuePosition: 0,
  };
}

function resultManifest(
  manifest: import("./completion-spool.js").CompletionSpoolManifest,
): DaemonExecutionServerFrame {
  return {
    kind: "result-manifest",
    instanceId: request.instanceId,
    processToken: request.processToken,
    requestId: request.requestId,
    manifest,
  };
}

function resultEnd(
  manifest: import("./completion-spool.js").CompletionSpoolManifest,
): Extract<DaemonExecutionServerFrame, { kind: "result-end" }> {
  return {
    kind: "result-end",
    instanceId: request.instanceId,
    processToken: request.processToken,
    requestId: request.requestId,
    transferId: manifest.transferId,
    rawBytes: manifest.rawBytes,
    recordCount: manifest.recordCount,
    sha256: manifest.sha256,
  };
}

async function sendRecords(
  socket: Socket,
  spool: import("./completion-spool.js").CompletionSpool,
  transferId: string,
  offset: number,
  stopBefore = Number.POSITIVE_INFINITY,
): Promise<void> {
  for await (const record of spool.read(offset)) {
    if (record.sequence >= stopBefore || socket.destroyed || !socket.writable) return;
    socket.write(
      DaemonResultChunkCodec.encode(
        {
          transferId,
          requestId: request.requestId,
          offset: record.sequence,
          sequence: record.sequence,
          stream: record.stream,
          bytes: record.bytes,
        },
        TEST_CHUNK_BYTES,
      ),
    );
  }
}

async function encodedResult(
  spool: import("./completion-spool.js").CompletionSpool,
  manifest: import("./completion-spool.js").CompletionSpoolManifest,
): Promise<Buffer> {
  const chunks = [frame(accepted()), frame(resultManifest(manifest))];
  for await (const record of spool.read(0)) {
    chunks.push(
      DaemonResultChunkCodec.encode(
        {
          transferId: manifest.transferId,
          requestId: request.requestId,
          offset: record.sequence,
          sequence: record.sequence,
          stream: record.stream,
          bytes: record.bytes,
        },
        TEST_CHUNK_BYTES,
      ),
    );
  }
  chunks.push(frame(resultEnd(manifest)));
  return Buffer.concat(chunks);
}

async function firstEncodedRecord(
  spool: import("./completion-spool.js").CompletionSpool,
  manifest: import("./completion-spool.js").CompletionSpoolManifest,
): Promise<Buffer> {
  for await (const record of spool.read(0)) {
    return DaemonResultChunkCodec.encode(
      {
        transferId: manifest.transferId,
        requestId: request.requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      },
      TEST_CHUNK_BYTES,
    );
  }
  throw new Error("Expected one completion record");
}

async function rawExecutionServer(
  servers: Server[],
  sockets: Socket[],
  directories: string[],
  connected: (socket: Socket) => void,
): Promise<string> {
  const endpoint = executionEndpoint(directories);
  const server = createServer((socket) => {
    sockets.push(socket);
    socket.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EPIPE" || error.code === "ECONNRESET") return;
      throw error;
    });
    connected(socket);
  });
  servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(endpoint, resolve);
  });
  return endpoint;
}

function executionEndpoint(directories: string[]): string {
  if (process.platform === "win32") {
    return \`\\\\\\\\.\\\\pipe\\\\symnav-execution-\${randomUUID()}\`;
  }
  const directory = mkdtempSync(join(tmpdir(), "symnav-execution-"));
  directories.push(directory);
  return join(directory, "daemon.sock");
}

function frame(value: unknown): Buffer {
  const payload = Buffer.from(JSON.stringify(value), "utf8");
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
}

async function settleWithin<T>(operation: Promise<T>, milliseconds: number): Promise<T> {
  let timeout: NodeJS.Timeout | undefined;
  const expired = new Promise<never>((_resolve, reject) => {
    timeout = setTimeout(() => reject(new Error("Operation did not settle")), milliseconds);
  });
  try {
    return await Promise.race([operation, expired]);
  } finally {
    if (timeout !== undefined) clearTimeout(timeout);
  }
}
`},{subject:"pr-131-head",path:"apps/cli/test/helpers/local-daemon-transport.ts",revision:"b100221db48754656328391b878299c5a0bab443",sha256:"e54b39498fcc16fb37712a077ce9659812cdcf5f3994fa007fb36ca170bd6d35",text:`import { mkdirSync } from "node:fs";
import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import {
  LocalDaemonTransport as RuntimeLocalDaemonTransport,
  type LocalDaemonTransportPolicy,
} from "../../src/daemon/local-daemon-transport.js";

interface TestLocalDaemonTransportOptions {
  readonly maximumFrameBytes?: number;
  readonly requestTimeoutMs?: number;
  readonly executionRequestTimeoutMs?: number;
  readonly writeChunkSize?: number;
  readonly outputDirectory?: string;
  readonly outputInlineBytes?: number;
}

export class TestLocalDaemonTransport extends RuntimeLocalDaemonTransport {
  constructor(
    policyOrOptions:
      | DaemonPolicyValues
      | LocalDaemonTransportPolicy
      | TestLocalDaemonTransportOptions = {},
  ) {
    if ("transport" in policyOrOptions) {
      super(policyOrOptions);
      return;
    }
    const options = policyOrOptions;
    const base = DaemonPolicy.currentSystem();
    const policy = DaemonPolicyTestFactory.withOverrides(base, {
      transport: {
        ...(options.maximumFrameBytes === undefined
          ? {}
          : { maximumJsonPayloadBytes: options.maximumFrameBytes }),
        ...(options.requestTimeoutMs === undefined
          ? {}
          : { singleResponseTimeoutMs: options.requestTimeoutMs }),
        ...(options.executionRequestTimeoutMs === undefined
          ? {}
          : { executionAdmissionTimeoutMs: options.executionRequestTimeoutMs }),
      },
      output: {
        ...(options.outputInlineBytes === undefined
          ? {}
          : {
              inlineRawBytes: Math.max(
                base.values.output.maximumChunkRawBytes,
                options.outputInlineBytes,
              ),
            }),
      },
    });
    if (options.outputDirectory !== undefined) {
      mkdirSync(options.outputDirectory, { recursive: true });
    }
    super(policy.values, {
      ...(options.writeChunkSize === undefined ? {} : { writeChunkSize: options.writeChunkSize }),
      ...(options.outputDirectory === undefined
        ? {}
        : { outputDirectory: options.outputDirectory }),
    });
  }
}
`}],receipts:[{id:"cache",subject:"pr-127-head",path:"packages/core/src/backend/turn-scoped-cache-scope.ts",start:1,end:46,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`export interface TurnScopedCache<Key, Value> {
  getOrCreate(key: Key, createValue: () => Value): Value;
}

interface ClearableTurnScopedCache {
  clear(): void;
}

class TurnScopedCacheHandle<Key, Value>
  implements TurnScopedCache<Key, Value>, ClearableTurnScopedCache
{
  private readonly values = new Map<Key, Value>();

  getOrCreate(key: Key, createValue: () => Value): Value {
    if (this.values.has(key)) return this.values.get(key) as Value;
    const value = createValue();
    this.values.set(key, value);
    return value;
  }

  clear(): void {
    this.values.clear();
  }
}

export class TurnScopedCacheScope {
  private readonly caches: ClearableTurnScopedCache[] = [];

  createCache<Key, Value>(): TurnScopedCache<Key, Value> {
    const cache = new TurnScopedCacheHandle<Key, Value>();
    this.caches.push(cache);
    return cache;
  }

  beginTurn(): void {
    this.clear();
  }

  releaseTransientResources(): void {
    this.clear();
  }

  private clear(): void {
    for (const cache of this.caches) cache.clear();
  }
}`},{id:"cache-tests",subject:"pr-127-head",path:"packages/core/src/backend/turn-scoped-cache-scope.test.ts",start:1,end:92,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`import { describe, expect, it, vi } from "vitest";

import { TurnScopedCacheScope } from "./turn-scoped-cache-scope.js";

describe("TurnScopedCacheScope", () => {
  it("returns each exact factory value once per key and handle", () => {
    const scope = new TurnScopedCacheScope();
    const first = scope.createCache<string, readonly string[] | undefined>();
    const second = scope.createCache<string, readonly string[] | undefined>();
    const firstValue: readonly string[] = [];
    const secondValue: readonly string[] = [];
    const firstFactory = vi.fn(() => firstValue);
    const undefinedFactory = vi.fn(() => undefined);
    const secondFactory = vi.fn(() => secondValue);

    expect(first.getOrCreate("value", firstFactory)).toBe(firstValue);
    expect(first.getOrCreate("value", firstFactory)).toBe(firstValue);
    expect(first.getOrCreate("undefined", undefinedFactory)).toBeUndefined();
    expect(first.getOrCreate("undefined", undefinedFactory)).toBeUndefined();
    expect(second.getOrCreate("value", secondFactory)).toBe(secondValue);

    expect(firstFactory).toHaveBeenCalledOnce();
    expect(undefinedFactory).toHaveBeenCalledOnce();
    expect(secondFactory).toHaveBeenCalledOnce();
  });

  it("clears every handle at turn and release boundaries", () => {
    const scope = new TurnScopedCacheScope();
    const first = scope.createCache<string, object>();
    const second = scope.createCache<string, object>();
    const firstFactory = vi.fn(() => ({}));
    const secondFactory = vi.fn(() => ({}));
    const initialFirst = first.getOrCreate("shared", firstFactory);
    const initialSecond = second.getOrCreate("shared", secondFactory);

    scope.beginTurn();

    expect(first.getOrCreate("shared", firstFactory)).not.toBe(initialFirst);
    expect(second.getOrCreate("shared", secondFactory)).not.toBe(initialSecond);

    const nextFirst = first.getOrCreate("shared", firstFactory);
    const nextSecond = second.getOrCreate("shared", secondFactory);
    scope.releaseTransientResources();
    scope.releaseTransientResources();

    expect(first.getOrCreate("shared", firstFactory)).not.toBe(nextFirst);
    expect(second.getOrCreate("shared", secondFactory)).not.toBe(nextSecond);
    expect(firstFactory).toHaveBeenCalledTimes(3);
    expect(secondFactory).toHaveBeenCalledTimes(3);
  });

  it("retains promise settlement and retries synchronous factory failures", async () => {
    const scope = new TurnScopedCacheScope();
    const promises = scope.createCache<string, Promise<string>>();
    const values = scope.createCache<string, string>();
    const rejection = new Error("rejected");
    const rejected = Promise.reject(rejection);
    const rejectedFactory = vi.fn(() => rejected);
    const throwingFactory = vi.fn(() => {
      throw new Error("synchronous failure");
    });

    const first = promises.getOrCreate("key", rejectedFactory);
    const second = promises.getOrCreate("key", rejectedFactory);

    expect(second).toBe(first);
    await expect(first).rejects.toBe(rejection);
    expect(promises.getOrCreate("key", rejectedFactory)).toBe(first);
    expect(rejectedFactory).toHaveBeenCalledOnce();
    expect(() => values.getOrCreate("key", throwingFactory)).toThrow("synchronous failure");
    expect(() => values.getOrCreate("key", throwingFactory)).toThrow("synchronous failure");
    expect(throwingFactory).toHaveBeenCalledTimes(2);
  });

  it("does not let an old promise settlement replace a new turn entry", async () => {
    const scope = new TurnScopedCacheScope();
    const cache = scope.createCache<string, Promise<string>>();
    let settleOld: ((value: string) => void) | undefined;
    const oldPromise = new Promise<string>((resolve) => {
      settleOld = resolve;
    });
    const newPromise = Promise.resolve("new");
    expect(cache.getOrCreate("key", () => oldPromise)).toBe(oldPromise);

    scope.beginTurn();
    expect(cache.getOrCreate("key", () => newPromise)).toBe(newPromise);
    settleOld?.("old");

    await expect(oldPromise).resolves.toBe("old");
    await expect(cache.getOrCreate("key", () => Promise.resolve("other"))).resolves.toBe("new");
  });
});`},{id:"service-head",subject:"pr-127-head",path:"packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",start:28,end:174,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`
export class TypeScriptSemanticQueryService implements PositionDefinitionResolver {
  private files: readonly WorkspaceFile[] = [];
  private readonly cacheScope = new TurnScopedCacheScope();
  private readonly definitionsByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly SymbolOverviewNode[]>
  >();
  private readonly referencesByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly SemanticReferenceLocation[]>
  >();
  private readonly callTargetsByIdentity = this.cacheScope.createCache<
    string,
    Promise<CallTargetResolution>
  >();
  private readonly callersByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly CallEdge[]>
  >();
  private readonly calleesByIdentity = this.cacheScope.createCache<
    string,
    Promise<readonly CallEdge[]>
  >();
  private readonly definitionsByPosition = this.cacheScope.createCache<
    string,
    readonly SemanticNodeLocation[]
  >();

  constructor(
    private readonly projects: TypeScriptProjectGraph | undefined,
    private readonly workspaceState: TypeScriptWorkspaceState,
    private readonly observer?: TypeScriptSemanticQueryObserver,
  ) {}

  beginTurn(files: readonly WorkspaceFile[]): void {
    this.files = files;
    this.cacheScope.beginTurn();
  }

  findDefinitions(identity: SymbolIdentity): Promise<readonly SymbolOverviewNode[]> {
    const key = formatSymbolIdentity(identity);
    return this.definitionsByIdentity.getOrCreate(key, () => {
      this.observer?.definitionSearch?.(identity);
      return findDefinitions({
        workspaceState: this.workspaceState,
        files: this.files,
        identity,
      });
    });
  }

  async findReferences(identity: SymbolIdentity): Promise<readonly SymbolReference[]> {
    const locations = await this.referenceLocations(identity);
    return locations.flatMap((location) => {
      if (location.isDefinition) return [];
      const node = this.workspaceState.nodeAt(location.relativePath, location.start);
      if (!node) return [];
      const sourceFile = node.getSourceFile();
      const { line, character } = sourceFile.compilerNode.getLineAndCharacterOfPosition(
        location.start,
      );
      return [
        {
          file: location.relativePath,
          line: line + 1,
          previewSource: TypeScriptSemanticQueryService.lineText(sourceFile, line),
          matchStart: character,
          matchEnd: character + location.length,
          kind: classifyReferenceKind(node),
        },
      ];
    });
  }

  findCallTarget(identity: SymbolIdentity): Promise<CallTargetResolution> {
    const key = formatSymbolIdentity(identity);
    return this.callTargetsByIdentity.getOrCreate(key, () => this.resolveCallTarget(identity));
  }

  findCallers(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    return this.callersByIdentity.getOrCreate(key, () =>
      this.referenceLocations(identity).then((locations) =>
        new CallerFinder(this.workspaceState).find(locations),
      ),
    );
  }

  findCallees(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    return this.calleesByIdentity.getOrCreate(key, () =>
      findCallees({
        workspaceState: this.workspaceState,
        files: this.files,
        identity,
        definitionResolver: this,
      }),
    );
  }

  async releaseTransientResources(): Promise<void> {
    this.cacheScope.releaseTransientResources();
    await this.projects?.releaseTransientResources();
  }

  definitionNodesOf(node: Node): readonly Node[] {
    if (!Node.isIdentifier(node) && !Node.isPrivateIdentifier(node)) return [];
    const relativePath = this.workspaceState.relativePathOf(node.getSourceFile());
    if (!relativePath) return [];
    const key = \`\${relativePath}:\${node.getStart()}\`;
    const locations = this.definitionsByPosition.getOrCreate(key, () => {
      this.observer?.callTargetResolution?.(relativePath, node.getStart());
      return node.getDefinitionNodes().flatMap((definition) => {
        const definitionRelativePath = this.workspaceState.relativePathOf(
          definition.getSourceFile(),
        );
        return definitionRelativePath
          ? [
              {
                relativePath: definitionRelativePath,
                start: definition.getStart(),
                kind: definition.getKind(),
              },
            ]
          : [];
      });
    });
    return locations.flatMap((location) => {
      const sourceFile = this.projects?.sourceFileFor(location.relativePath);
      const definition = this.nodeAtSemanticLocation(location, sourceFile);
      return definition ? [definition] : [];
    });
  }

  private referenceLocations(
    identity: SymbolIdentity,
  ): Promise<readonly SemanticReferenceLocation[]> {
    const key = formatSymbolIdentity(identity);
    return this.referencesByIdentity.getOrCreate(key, () => {
      this.observer?.referenceSearch?.(identity);
      return Promise.resolve(this.findReferenceLocations(identity));
    });
  }

  private findReferenceLocations(identity: SymbolIdentity): readonly SemanticReferenceLocation[] {
    const declarationNodes = this.workspaceState`},{id:"service-base",subject:"pr-127-base",path:"packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts",start:28,end:172,revision:"a1e325a5ff979bdfa25babc5554621c8c0f20497",text:`export class TypeScriptSemanticQueryService implements PositionDefinitionResolver {
  private files: WorkspaceSnapshot["files"] = [];
  private readonly definitionsByIdentity = new Map<
    string,
    Promise<readonly SymbolOverviewNode[]>
  >();
  private readonly referencesByIdentity = new Map<
    string,
    Promise<readonly SemanticReferenceLocation[]>
  >();
  private readonly callTargetsByIdentity = new Map<string, Promise<CallTargetResolution>>();
  private readonly callersByIdentity = new Map<string, Promise<readonly CallEdge[]>>();
  private readonly calleesByIdentity = new Map<string, Promise<readonly CallEdge[]>>();
  private readonly definitionsByPosition = new Map<string, readonly SemanticNodeLocation[]>();

  constructor(
    private readonly projects: TypeScriptProjectGraph | undefined,
    private readonly workspaceState: TypeScriptWorkspaceState,
    private readonly observer?: TypeScriptSemanticQueryObserver,
  ) {}

  beginTurn(snapshot: WorkspaceSnapshot): void {
    this.files = snapshot.files;
    this.clearQueryCaches();
  }

  findDefinitions(identity: SymbolIdentity): Promise<readonly SymbolOverviewNode[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.definitionsByIdentity.get(key);
    if (existing) return existing;
    this.observer?.definitionSearch?.(identity);
    const definitions = findDefinitions({
      workspaceState: this.workspaceState,
      files: this.files,
      identity,
    });
    this.definitionsByIdentity.set(key, definitions);
    return definitions;
  }

  async findReferences(identity: SymbolIdentity): Promise<readonly SymbolReference[]> {
    const locations = await this.referenceLocations(identity);
    return locations.flatMap((location) => {
      if (location.isDefinition) return [];
      const node = this.workspaceState.nodeAt(location.relativePath, location.start);
      if (!node) return [];
      const sourceFile = node.getSourceFile();
      const { line, character } = sourceFile.compilerNode.getLineAndCharacterOfPosition(
        location.start,
      );
      return [
        {
          file: location.relativePath,
          line: line + 1,
          previewSource: TypeScriptSemanticQueryService.lineText(sourceFile, line),
          matchStart: character,
          matchEnd: character + location.length,
          kind: classifyReferenceKind(node),
        },
      ];
    });
  }

  findCallTarget(identity: SymbolIdentity): Promise<CallTargetResolution> {
    const key = formatSymbolIdentity(identity);
    const existing = this.callTargetsByIdentity.get(key);
    if (existing) return existing;
    const resolution = this.resolveCallTarget(identity);
    this.callTargetsByIdentity.set(key, resolution);
    return resolution;
  }

  findCallers(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.callersByIdentity.get(key);
    if (existing) return existing;
    const callers = this.referenceLocations(identity).then((locations) =>
      new CallerFinder(this.workspaceState).find(locations),
    );
    this.callersByIdentity.set(key, callers);
    return callers;
  }

  findCallees(identity: SymbolIdentity): Promise<readonly CallEdge[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.calleesByIdentity.get(key);
    if (existing) return existing;
    const callees = findCallees({
      workspaceState: this.workspaceState,
      files: this.files,
      identity,
      definitionResolver: this,
    });
    this.calleesByIdentity.set(key, callees);
    return callees;
  }

  releaseTransientResources(): void {
    this.clearQueryCaches();
    this.projects?.releaseTransientResources();
  }

  definitionNodesOf(node: Node): readonly Node[] {
    if (!Node.isIdentifier(node) && !Node.isPrivateIdentifier(node)) return [];
    const relativePath = this.workspaceState.relativePathOf(node.getSourceFile());
    if (!relativePath) return [];
    const key = \`\${relativePath}:\${node.getStart()}\`;
    let locations = this.definitionsByPosition.get(key);
    if (!locations) {
      this.observer?.callTargetResolution?.(relativePath, node.getStart());
      locations = node.getDefinitionNodes().flatMap((definition) => {
        const definitionRelativePath = this.workspaceState.relativePathOf(
          definition.getSourceFile(),
        );
        return definitionRelativePath
          ? [
              {
                relativePath: definitionRelativePath,
                start: definition.getStart(),
                kind: definition.getKind(),
              },
            ]
          : [];
      });
      this.definitionsByPosition.set(key, locations);
    }
    return locations.flatMap((location) => {
      const sourceFile = this.projects?.sourceFileFor(location.relativePath);
      const definition = this.nodeAtSemanticLocation(location, sourceFile);
      return definition ? [definition] : [];
    });
  }

  private referenceLocations(
    identity: SymbolIdentity,
  ): Promise<readonly SemanticReferenceLocation[]> {
    const key = formatSymbolIdentity(identity);
    const existing = this.referencesByIdentity.get(key);
    if (existing) return existing;
    this.observer?.referenceSearch?.(identity);
    const locations = Promise.resolve(this.findReferenceLocations(identity));
    this.referencesByIdentity.set(key, locations);
    return locations;
  }
`},{id:"backend-head",subject:"pr-127-head",path:"packages/backend-typescript/src/typescript-backend/typescript-backend.ts",start:79,end:90,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`  async refresh(request: BackendRefreshRequest): Promise<BackendRefreshSummary> {
    this.sourceCache?.refresh(request.snapshot);
    if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
    const summary = await this.state.refresh(request.snapshot.files, request.coverage);
    this.semanticQueries.beginTurn(request.snapshot.files);
    return summary;
  }

  async releaseTransientResources(): Promise<void> {
    await this.semanticQueries.releaseTransientResources();
  }
`},{id:"backend-base",subject:"pr-127-base",path:"packages/backend-typescript/src/typescript-backend/typescript-backend.ts",start:79,end:90,revision:"a1e325a5ff979bdfa25babc5554621c8c0f20497",text:`  async refresh(request: BackendRefreshRequest): Promise<BackendRefreshSummary> {
    this.sourceCache?.refresh(request.snapshot);
    if (request.coverage === "workspace") await this.projectGraph?.refresh(request.snapshot);
    const summary = await this.state.refresh(request.snapshot.files, request.coverage);
    this.semanticQueries.beginTurn(request.snapshot);
    return summary;
  }

  async releaseTransientResources(): Promise<void> {
    this.semanticQueries.releaseTransientResources();
  }
`},{id:"service-tests",subject:"pr-127-head",path:"packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.test.ts",start:28,end:218,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`describe("TypeScriptSemanticQueryService", () => {
  it("shares each identity query promise independently within one turn", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/app.ts": [
        "export function target(): void {}",
        "export function caller(): void { target(); }",
        "",
      ].join("\\n"),
    });
    const files = workspaceFiles(fileSystem, "src/app.ts");
    const snapshot: WorkspaceSnapshot = { root: "/repo", files };
    const state = new TypeScriptWorkspaceState(fileSystem);
    await state.refresh(files);
    const queries = new TypeScriptSemanticQueryService(undefined, state);
    const target = identity("src/app.ts", "target");
    const caller = identity("src/app.ts", "caller");
    queries.beginTurn(snapshot.files);

    const definitions = queries.findDefinitions(target);
    const callTarget = queries.findCallTarget(target);
    const callers = queries.findCallers(target);
    const callees = queries.findCallees(caller);

    expect(queries.findDefinitions(target)).toBe(definitions);
    expect(queries.findCallTarget(target)).toBe(callTarget);
    expect(queries.findCallers(target)).toBe(callers);
    expect(queries.findCallees(caller)).toBe(callees);
    await expect(definitions).resolves.toHaveLength(1);
    await expect(callTarget).resolves.toMatchObject({ outcome: "resolved" });
    await expect(callers).resolves.toHaveLength(1);
    await expect(callees).resolves.toHaveLength(1);
  });

  it("caches empty position results while rehydrating nodes for every access", async () => {
    const fileSystem = new InMemoryFileSystem({
      "/repo/src/app.ts": [
        "export function target(): void {}",
        "export function caller(): void { target(); missing(); }",
        "",
      ].join("\\n"),
    });
    const files = workspaceFiles(fileSystem, "src/app.ts");
    const state = new TypeScriptWorkspaceState(fileSystem);
    await state.refresh(files);
    const resolvedPositions: number[] = [];
    const queries = new TypeScriptSemanticQueryService(undefined, state, {
      callTargetResolution: (_relativePath, start) => resolvedPositions.push(start),
    });
    queries.beginTurn(files);
    const sourceFile = state.sourceFile("src/app.ts");
    const identifiers = sourceFile?.getDescendantsOfKind(SyntaxKind.Identifier) ?? [];
    const targetCall = [...identifiers].reverse().find((node) => node.getText() === "target");
    const missingCall = [...identifiers].reverse().find((node) => node.getText() === "missing");
    if (!targetCall || !missingCall) throw new Error("expected call identifiers");

    const firstDefinitions = queries.definitionNodesOf(targetCall);
    const secondDefinitions = queries.definitionNodesOf(targetCall);
    const firstMissing = queries.definitionNodesOf(missingCall);
    const secondMissing = queries.definitionNodesOf(missingCall);

    expect(firstDefinitions).not.toBe(secondDefinitions);
    expect(firstDefinitions[0]).toBe(secondDefinitions[0]);
    expect(firstMissing).toEqual([]);
    expect(secondMissing).toEqual([]);
    expect(resolvedPositions).toEqual([targetCall.getStart(), missingCall.getStart()]);
  });

  it("retains asynchronous definition and callee failures for the turn", async () => {
    const failure = new Error("semantic failure");
    const ensureFiles = vi.fn(() => Promise.reject(failure));
    const state = { ensureFiles } as unknown as TypeScriptWorkspaceState;
    const queries = new TypeScriptSemanticQueryService(undefined, state);
    const target = identity("src/app.ts", "target");
    queries.beginTurn([]);

    const definitions = queries.findDefinitions(target);
    const callees = queries.findCallees(target);

    expect(queries.findDefinitions(target)).toBe(definitions);
    expect(queries.findCallees(target)).toBe(callees);
    await expect(definitions).rejects.toBe(failure);
    await expect(callees).rejects.toBe(failure);
    expect(ensureFiles).toHaveBeenCalledTimes(2);
  });

  it("retries synchronous reference discovery failures", async () => {
    const failure = new Error("reference failure");
    const locateSemanticCopies = vi.fn(() => {
      throw failure;
    });
    const state = { locateSemanticCopies } as unknown as TypeScriptWorkspaceState;
    let referenceSearches = 0;
    const queries = new TypeScriptSemanticQueryService(undefined, state, {
      referenceSearch: () => {
        referenceSearches += 1;
      },
    });
    const target = identity("src/app.ts", "target");
    queries.beginTurn([]);

    await expect(queries.findReferences(target)).rejects.toBe(failure);
    await expect(queries.findReferences(target)).rejects.toBe(failure);

    expect(locateSemanticCopies).toHaveBeenCalledTimes(2);
    expect(referenceSearches).toBe(2);
  });

  it("preserves the current turn when backend refresh fails", async () => {
    const failure = new Error("refresh failure");
    let refreshFails = false;
    const state = {
      refresh: vi.fn(() => {
        if (refreshFails) return Promise.reject(failure);
        return Promise.resolve({ added: 0, changed: 0, removed: 0, unchanged: 0 });
      }),
      ensureFiles: vi.fn(() => Promise.resolve()),
      locate: vi.fn(() => []),
    } as unknown as TypeScriptWorkspaceState;
    let definitionSearches = 0;
    const backend = new TypeScriptBackend(new InMemoryFileSystem({}), state, undefined, {
      definitionSearch: () => {
        definitionSearches += 1;
      },
    });
    const snapshot: WorkspaceSnapshot = { root: "/repo", files: [] };
    const target = identity("src/app.ts", "target");
    await backend.refresh({ snapshot, coverage: "workspace" });
    const definitions = await backend.findDefinitions([], target);
    refreshFails = true;

    await expect(backend.refresh({ snapshot, coverage: "workspace" })).rejects.toBe(failure);

    await expect(backend.findDefinitions([], target)).resolves.toBe(definitions);
    expect(definitionSearches).toBe(1);
  });

  it("clears caches before awaiting project release and rejects at the backend boundary", async () => {
    const releaseFailure = new Error("project release failed");
    let rejectProjectRelease: ((reason: unknown) => void) | undefined;
    const projectRelease = new Promise<void>((_resolve, reject) => {
      rejectProjectRelease = reject;
    });
    void projectRelease.catch(() => undefined);
    const firstProjectRelease = vi.fn(() => projectRelease);
    const laterProjectRelease = vi.fn();
    const projectGraph = {
      releaseTransientResources: vi.fn(async () => {
        await firstProjectRelease();
        laterProjectRelease();
      }),
    } as unknown as TypeScriptProjectGraph;
    const state = {
      refresh: vi.fn(() => Promise.resolve({ added: 0, changed: 0, removed: 0, unchanged: 0 })),
      ensureFiles: vi.fn(() => Promise.resolve()),
      locate: vi.fn(() => []),
    } as unknown as TypeScriptWorkspaceState;
    let definitionSearches = 0;
    const backend = new TypeScriptBackend(new InMemoryFileSystem({}), state, projectGraph, {
      definitionSearch: () => {
        definitionSearches += 1;
      },
    });
    const snapshot: WorkspaceSnapshot = { root: "/repo", files: [] };
    const target = identity("src/app.ts", "target");
    await backend.refresh({ snapshot, coverage: "selection" });
    const beforeRelease = await backend.findDefinitions([], target);

    const release = backend.releaseTransientResources();
    let releaseSettled = false;
    void release.then(
      () => {
        releaseSettled = true;
      },
      () => {
        releaseSettled = true;
      },
    );
    const afterRelease = await backend.findDefinitions([], target);

    expect(afterRelease).not.toBe(beforeRelease);
    expect(definitionSearches).toBe(2);
    expect(projectGraph.releaseTransientResources).toHaveBeenCalledOnce();
    await Promise.resolve();
    expect(releaseSettled).toBe(false);

    rejectProjectRelease?.(releaseFailure);
    await expect(release).rejects.toBe(releaseFailure);
    expect(firstProjectRelease).toHaveBeenCalledOnce();
    expect(laterProjectRelease).not.toHaveBeenCalled();
  });
`},{id:"spec",subject:"pr-127-head",path:"plans/005/daemon-architecture-functional-spec.md",start:1,end:29,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`# Symnav Daemon Architecture Functional Spec

## Goal

Restructure the merged daemon work so each concern lives in the package that owns it: a self-contained daemon package that knows nothing about symbols, a core that knows nothing about daemons, a TypeScript backend that holds only TypeScript-specific logic, and a CLI app that only composes. The daemon's user-facing behavior is defined in \`daemon-functional-spec.md\` and does not change. This is refactor work: not a rewrite of the daemon, not a change to any command's output or timing, and not a new language backend. This spec defines product behavior for contributors and hosts of the packages; implementation choices live in the phased plans.

## Primary User

**Contributors** changing symnav. Their default experience: a package boundary tells them where a concern belongs, and the build refuses an import that crosses the locked dependency graph.

**Hosts** composing the packages into a runnable product. The CLI app is the first host. A future host (editor extension, MCP server, benchmark harness) composes the same packages the same way. No host reaches into another package's internals.

End users of the \`symnav\` binary observe no change from this work.

## Core Guarantees

### Behavior is unchanged

This is a refactor. Every command, daemon lifecycle action, diagnostic record, telemetry event, and failure path behaves as it does today.

\`\`\`text
Given the same workspace, arguments, environment, and daemon state, output bytes,
exit code, execution mode, and lifecycle outcome are identical before and after.
\`\`\`

Correct: a restructuring change passes the existing e2e parity and daemon suites without touching a single expectation. Incorrect: a restructuring change "fixes" a queue, eviction, timeout, or path while moving code.

There is no "it was obviously a bug" override. Behavior defects found during restructuring are recorded in \`daemon-follow-ups-functional-spec.md\` and changed separately.
`},{id:"spec-131",subject:"pr-131-head",path:"plans/005/daemon-architecture-functional-spec.md",start:1,end:29,revision:"b100221db48754656328391b878299c5a0bab443",text:`# Symnav Daemon Architecture Functional Spec

## Goal

Restructure the merged daemon work so each concern lives in the package that owns it: a self-contained daemon package that knows nothing about symbols, a core that knows nothing about daemons, a TypeScript backend that holds only TypeScript-specific logic, and a CLI app that only composes. The daemon's user-facing behavior is defined in \`daemon-functional-spec.md\` and does not change. This is refactor work: not a rewrite of the daemon, not a change to any command's output or timing, and not a new language backend. This spec defines product behavior for contributors and hosts of the packages; implementation choices live in the phased plans.

## Primary User

**Contributors** changing symnav. Their default experience: a package boundary tells them where a concern belongs, and the build refuses an import that crosses the locked dependency graph.

**Hosts** composing the packages into a runnable product. The CLI app is the first host. A future host (editor extension, MCP server, benchmark harness) composes the same packages the same way. No host reaches into another package's internals.

End users of the \`symnav\` binary observe no change from this work.

## Core Guarantees

### Behavior is unchanged

This is a refactor. Every command, daemon lifecycle action, diagnostic record, telemetry event, and failure path behaves as it does today.

\`\`\`text
Given the same workspace, arguments, environment, and daemon state, output bytes,
exit code, execution mode, and lifecycle outcome are identical before and after.
\`\`\`

Correct: a restructuring change passes the existing e2e parity and daemon suites without touching a single expectation. Incorrect: a restructuring change "fixes" a queue, eviction, timeout, or path while moving code.

There is no "it was obviously a bug" override. Behavior defects found during restructuring are recorded in \`daemon-follow-ups-functional-spec.md\` and changed separately.
`},{id:"policy-reasons",subject:"pr-131-head",path:"plans/005/daemon-policy.md",start:27,end:28,revision:"b100221db48754656328391b878299c5a0bab443",text:"| `delivery.postAcceptanceExecutionReattachmentLimit` | 1 reattachment | Authenticated close after acceptance | Recover the accepted request without local replay | Reattachment tests |\n| `delivery.resultTransferResumeLimitPerExecutionAttempt` | 1 fetch resume per execute attempt | Interrupted manifest transfer | Resume one transfer independently for each execute attempt | Two-scope resume tests |"},{id:"transport-head",subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport.ts",start:391,end:499,revision:"b100221db48754656328391b878299c5a0bab443",text:`      });
    });
  }

  execute(endpoint: string, request: DaemonExecuteRequest): Promise<DaemonExecutionReceipt> {
    return this.executeOnce(endpoint, request).then((receipt) => ({
      acceptance: receipt.acceptance,
      completion: this.completeWithReattachments(endpoint, request, receipt.completion),
    }));
  }

  private async completeWithReattachments(
    endpoint: string,
    request: DaemonExecuteRequest,
    completion: DaemonExecutionReceipt["completion"],
  ): DaemonExecutionReceipt["completion"] {
    let currentCompletion = completion;
    let reattachmentCount = 0;
    while (true) {
      try {
        return await currentCompletion;
      } catch (firstError) {
        if (
          !LocalDaemonTransport.isAcceptedConnectionClose(firstError, request) ||
          reattachmentCount >= this.deliveryPolicy.postAcceptanceExecutionReattachmentLimit
        ) {
          throw firstError;
        }
        try {
          const reattached = await this.executeOnce(endpoint, request);
          currentCompletion = reattached.completion;
          reattachmentCount += 1;
        } catch {
          throw firstError;
        }
      }
    }
  }

  private executeOnce(
    endpoint: string,
    request: DaemonExecuteRequest,
  ): Promise<DaemonExecutionReceipt> {
    LocalDaemonTransport.assertRequest(request);
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(
        this.maximumControlFrameBytes,
        this.maximumChunkRawBytes,
      );
      const output = new OrderedCommandOutput({
        policy: this.outputPolicy,
        ...(this.outputDirectory === undefined ? {} : { directory: this.outputDirectory }),
      });
      const transfer = new DaemonResultTransferReceiver(request, output);
      const socket = createConnection(endpoint);
      let delivery: DaemonDeliveryState = "not-submitted";
      let acceptance: DaemonExecutionAcceptance | undefined;
      let terminal = false;
      let outerSettled = false;
      let completionSettled = false;
      let resumeCount = 0;
      let resolveCompletion!: (value: Awaited<DaemonExecutionReceipt["completion"]>) => void;
      let rejectCompletion!: (error: DaemonTransportError) => void;
      const completion = new Promise<Awaited<DaemonExecutionReceipt["completion"]>>(
        (completionResolve, completionReject) => {
          resolveCompletion = completionResolve;
          rejectCompletion = completionReject;
        },
      );
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        const transportError = LocalDaemonTransport.transportError(error, delivery);
        socket.destroy();
        if (!outerSettled) {
          outerSettled = true;
          void output.dispose().finally(() => reject(transportError));
          return;
        }
        if (!completionSettled) {
          completionSettled = true;
          void output.dispose().finally(() => rejectCompletion(transportError));
        }
      };
      const resume = (): boolean => {
        if (
          resumeCount >= this.deliveryPolicy.resultTransferResumeLimitPerExecutionAttempt ||
          completionSettled ||
          acceptance === undefined ||
          transfer.manifest === undefined ||
          terminal
        ) {
          return false;
        }
        resumeCount += 1;
        socket.destroy();
        transfer.beginConnection();
        void this.fetchCompletion(endpoint, request, output, transfer)
          .then((completionValue) => {
            if (completionSettled) return;
            completionSettled = true;
            resolveCompletion(completionValue);
          })
          .catch(fail);
        return true;
      };
      socket.setTimeout(this.executionRequestTimeoutMs, () =>
        fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out")),
      );
      socket.once("error", (error) => {`},{id:"transport-base",subject:"pr-131-base",path:"apps/cli/src/daemon/local-daemon-transport.ts",start:386,end:485,revision:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",text:`        }
      });
    });
  }

  execute(endpoint: string, request: DaemonExecuteRequest): Promise<DaemonExecutionReceipt> {
    return this.executeOnce(endpoint, request).then((receipt) => ({
      acceptance: receipt.acceptance,
      completion: this.completeWithOneReattachment(endpoint, request, receipt.completion),
    }));
  }

  private async completeWithOneReattachment(
    endpoint: string,
    request: DaemonExecuteRequest,
    completion: DaemonExecutionReceipt["completion"],
  ): DaemonExecutionReceipt["completion"] {
    try {
      return await completion;
    } catch (firstError) {
      if (!LocalDaemonTransport.isAcceptedConnectionClose(firstError, request)) throw firstError;
      try {
        const reattached = await this.executeOnce(endpoint, request);
        return await reattached.completion;
      } catch {
        throw firstError;
      }
    }
  }

  private executeOnce(
    endpoint: string,
    request: DaemonExecuteRequest,
  ): Promise<DaemonExecutionReceipt> {
    LocalDaemonTransport.assertRequest(request);
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(DAEMON_MAXIMUM_CONTROL_FRAME_BYTES);
      const output = new OrderedCommandOutput({
        ...(this.outputDirectory === undefined ? {} : { directory: this.outputDirectory }),
        ...(this.outputInlineBytes === undefined ? {} : { inlineBytes: this.outputInlineBytes }),
      });
      const transfer = new DaemonResultTransferReceiver(request, output);
      const socket = createConnection(endpoint);
      let delivery: DaemonDeliveryState = "not-submitted";
      let acceptance: DaemonExecutionAcceptance | undefined;
      let terminal = false;
      let outerSettled = false;
      let completionSettled = false;
      let resumeStarted = false;
      let resolveCompletion!: (value: Awaited<DaemonExecutionReceipt["completion"]>) => void;
      let rejectCompletion!: (error: DaemonTransportError) => void;
      const completion = new Promise<Awaited<DaemonExecutionReceipt["completion"]>>(
        (completionResolve, completionReject) => {
          resolveCompletion = completionResolve;
          rejectCompletion = completionReject;
        },
      );
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        const transportError = LocalDaemonTransport.transportError(error, delivery);
        socket.destroy();
        if (!outerSettled) {
          outerSettled = true;
          void output.dispose().finally(() => reject(transportError));
          return;
        }
        if (!completionSettled) {
          completionSettled = true;
          void output.dispose().finally(() => rejectCompletion(transportError));
        }
      };
      const resume = (): boolean => {
        if (
          resumeStarted ||
          completionSettled ||
          acceptance === undefined ||
          transfer.manifest === undefined ||
          terminal
        ) {
          return false;
        }
        resumeStarted = true;
        socket.destroy();
        transfer.beginConnection();
        void this.fetchCompletion(endpoint, request, output, transfer)
          .then((completionValue) => {
            if (completionSettled) return;
            completionSettled = true;
            resolveCompletion(completionValue);
          })
          .catch(fail);
        return true;
      };
      socket.setTimeout(this.executionRequestTimeoutMs, () =>
        fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out")),
      );
      socket.once("error", (error) => {
        void consumption
          .then(() => {
            if (resume()) return;`},{id:"fetch-head",subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport.ts",start:634,end:754,revision:"b100221db48754656328391b878299c5a0bab443",text:`  private static isAcceptedConnectionClose(
    error: unknown,
    request: DaemonExecuteRequest,
  ): error is DaemonTransportError {
    return (
      error instanceof DaemonTransportError &&
      error.code === "closed" &&
      error.delivery === "accepted" &&
      error.authenticatedInstanceId === request.instanceId
    );
  }

  private fetchCompletion(
    endpoint: string,
    request: DaemonExecuteRequest,
    output: OrderedCommandOutput,
    transfer: DaemonResultTransferReceiver,
  ): DaemonExecutionReceipt["completion"] {
    return new Promise((resolve, reject) => {
      const decoder = new DaemonTransferFrameDecoder(
        this.maximumControlFrameBytes,
        this.maximumChunkRawBytes,
      );
      const socket = createConnection(endpoint);
      let ended = false;
      let settled = false;
      let consumption = Promise.resolve();
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(LocalDaemonTransport.transportError(error, "accepted"));
      };
      socket.once("error", (error) => {
        void consumption
          .then(() =>
            fail(new DaemonTransportError("closed", "accepted", error.message, request.instanceId)),
          )
          .catch(fail);
      });
      socket.once("connect", () => {
        this.writeFrame(socket, {
          kind: "result-fetch",
          protocolVersion: request.protocolVersion,
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          offset: transfer.nextOffset,
        });
      });
      const consume = async (bytes: Buffer): Promise<void> => {
        let completedResult = false;
        let failedCode: DaemonExecutionFailureCode | undefined;
        for (const value of decoder.append(bytes)) {
          if (ended) throw new Error("Daemon resumed with a duplicate terminal frame");
          if (LocalDaemonTransport.isResultChunk(value)) {
            await transfer.acceptChunk(value);
            continue;
          }
          const frame = LocalDaemonTransport.executionFrameFor(request, value);
          if (frame.kind === "result-manifest") {
            transfer.acceptManifest(frame);
            continue;
          }
          if (frame.kind === "execution-failed") {
            ended = true;
            failedCode = frame.code;
            continue;
          }
          if (frame.kind !== "result-end") {
            throw new Error("Daemon resumed with an invalid terminal frame");
          }
          transfer.acceptEnd(frame);
          ended = true;
          completedResult = true;
        }
        if (completedResult) {
          const result = await transfer.finish();
          const manifest = transfer.manifest;
          if (manifest === undefined) throw new Error("Completion manifest is missing");
          await this.acknowledgeResult(endpoint, request, manifest);
          settled = true;
          socket.end();
          resolve({ status: "completed", result });
        }
        if (failedCode !== undefined) {
          settled = true;
          socket.end();
          await output.dispose();
          resolve({ status: "failed", code: failedCode });
        }
      };
      socket.on("data", (bytes) => {
        socket.pause();
        consumption = consumption
          .then(() => consume(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)))
          .then(() => {
            if (!socket.destroyed && !ended) socket.resume();
          });
        void consumption.catch(fail);
      });
      socket.once("end", () => {
        void consumption
          .then(() => {
            if (ended) return;
            decoder.assertComplete();
            fail(new Error("Daemon result resume ended before completion"));
          })
          .catch(fail);
      });
    });
  }

  private async acknowledgeResult(
    endpoint: string,
    request: DaemonExecuteRequest,
    manifest: Extract<DaemonExecutionServerFrame, { kind: "result-manifest" }>["manifest"],
  ): Promise<void> {
    const acknowledgement: DaemonResultAcknowledgement = {
      kind: "result-ack",
      protocolVersion: request.protocolVersion,`},{id:"composition",subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport.ts",start:20,end:45,revision:"b100221db48754656328391b878299c5a0bab443",text:`  DaemonServer,
} from "./daemon-protocol.js";
import { DaemonResultChunkCodec, DaemonTransferFrameDecoder } from "./daemon-result-chunk-codec.js";
import { DaemonRuntimeValues } from "./daemon-runtime-values.js";
import type { CompletionSpoolManifest } from "./completion-spool.js";

interface LocalDaemonTransportOptions {
  readonly responseTimeoutPurpose?: "ordinary" | "status-observer";
  readonly writeChunkSize?: number;
  readonly outputDirectory?: string;
}

export type LocalDaemonTransportPolicy = Pick<
  DaemonPolicyValues,
  "transport" | "delivery" | "output"
>;

export interface DaemonServerSend {
  (response: DaemonServerMessage): Promise<void>;
  onClose(listener: () => void): () => void;
}

export type DaemonDeliveryState = "not-submitted" | "submitted-unconfirmed" | "accepted";

export type DaemonTransportFailureCode =
  | "unreachable"`},{id:"constructor",subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport.ts",start:280,end:303,revision:"b100221db48754656328391b878299c5a0bab443",text:`  private readonly requestTimeoutMs: number;
  private readonly executionRequestTimeoutMs: number;
  private readonly writeChunkSize: number | undefined;
  private readonly outputDirectory: string | undefined;
  private readonly maximumControlFrameBytes: number;
  private readonly maximumChunkRawBytes: number;
  private readonly outputPolicy: DaemonPolicyValues["output"];
  private readonly deliveryPolicy: DaemonPolicyValues["delivery"];

  constructor(policy: LocalDaemonTransportPolicy, options: LocalDaemonTransportOptions = {}) {
    this.maximumFrameBytes = policy.transport.maximumJsonPayloadBytes;
    this.requestTimeoutMs =
      options.responseTimeoutPurpose === "status-observer"
        ? policy.transport.statusResponseTimeoutMs
        : policy.transport.singleResponseTimeoutMs;
    this.executionRequestTimeoutMs = policy.transport.executionAdmissionTimeoutMs;
    this.maximumControlFrameBytes = policy.transport.maximumExecutionControlPayloadBytes;
    this.maximumChunkRawBytes = policy.output.maximumChunkRawBytes;
    this.outputPolicy = policy.output;
    this.deliveryPolicy = policy.delivery;
    this.writeChunkSize = options.writeChunkSize;
    this.outputDirectory = options.outputDirectory;
  }
`},{id:"policy",subject:"pr-131-head",path:"packages/daemon/src/daemon-policy.ts",start:131,end:150,revision:"b100221db48754656328391b878299c5a0bab443",text:`      delivery: {
        postAcceptanceExecutionReattachmentLimit: 1,
        resultTransferResumeLimitPerExecutionAttempt: 1,
      },
      output: {
        maximumChunkRawBytes: 64 * 1024,
        inlineRawBytes: 256 * 1024,
        maximumResultRawBytes: 256 * MEBIBYTE,
        maximumAggregateSpoolRawBytes: 512 * MEBIBYTE,
      },
      resources: {
        effectiveMemoryBytes,
        hardProcessRssBytes: hardProcessRssMiB * MEBIBYTE,
        softProcessRssBytes: Math.floor(hardProcessRssMiB * 0.8) * MEBIBYTE,
        resumeProcessRssBytes: Math.floor(hardProcessRssMiB * 0.7) * MEBIBYTE,
        workerMaxOldGenerationSizeMiB,
        supervisionIntervalMs: 250,
        replacementWindowMs: 10 * 60_000,
        replacementLimit: 2,
        workerHeapSampleIntervalMs: 25,`},{id:"transport-tests",subject:"pr-131-head",path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts",start:843,end:898,revision:"b100221db48754656328391b878299c5a0bab443",text:`    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it("gives the reattached execute attempt its own fetch resume", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-reattach-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory: join(directory, "daemon"),
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    const manifest = await spool.finish(0);
    let executeCount = 0;
    let fetchCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as { kind: string };
        if (message.kind === "result-ack") {
          socket.end(
            frame({
              kind: "result-acknowledged",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              transferId: manifest.transferId,
            }),
          );
          return;
        }
        if (message.kind === "result-fetch") {
          fetchCount += 1;
          socket.end(Buffer.concat([frame(resultManifest(manifest)), frame(resultEnd(manifest))]));
          return;
        }
        executeCount += 1;
        socket.end(
          executeCount === 1
            ? frame(accepted())
            : Buffer.concat([frame(accepted()), frame(resultManifest(manifest))]),
        );
      });
    });

    const receipt = await new LocalDaemonTransport().execute(endpoint, request);
    const completion = await receipt.completion;

    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    expect({ executeCount, fetchCount }).toEqual({ executeCount: 2, fetchCount: 1 });
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it.each([
    ["instance", { ...accepted(), instanceId: "other" }],
    ["token", { ...accepted(), processToken: "other" }],`},{id:"test-adapter",subject:"pr-131-head",path:"apps/cli/test/helpers/local-daemon-transport.ts",start:1,end:64,revision:"b100221db48754656328391b878299c5a0bab443",text:`import { mkdirSync } from "node:fs";
import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import {
  LocalDaemonTransport as RuntimeLocalDaemonTransport,
  type LocalDaemonTransportPolicy,
} from "../../src/daemon/local-daemon-transport.js";

interface TestLocalDaemonTransportOptions {
  readonly maximumFrameBytes?: number;
  readonly requestTimeoutMs?: number;
  readonly executionRequestTimeoutMs?: number;
  readonly writeChunkSize?: number;
  readonly outputDirectory?: string;
  readonly outputInlineBytes?: number;
}

export class TestLocalDaemonTransport extends RuntimeLocalDaemonTransport {
  constructor(
    policyOrOptions:
      | DaemonPolicyValues
      | LocalDaemonTransportPolicy
      | TestLocalDaemonTransportOptions = {},
  ) {
    if ("transport" in policyOrOptions) {
      super(policyOrOptions);
      return;
    }
    const options = policyOrOptions;
    const base = DaemonPolicy.currentSystem();
    const policy = DaemonPolicyTestFactory.withOverrides(base, {
      transport: {
        ...(options.maximumFrameBytes === undefined
          ? {}
          : { maximumJsonPayloadBytes: options.maximumFrameBytes }),
        ...(options.requestTimeoutMs === undefined
          ? {}
          : { singleResponseTimeoutMs: options.requestTimeoutMs }),
        ...(options.executionRequestTimeoutMs === undefined
          ? {}
          : { executionAdmissionTimeoutMs: options.executionRequestTimeoutMs }),
      },
      output: {
        ...(options.outputInlineBytes === undefined
          ? {}
          : {
              inlineRawBytes: Math.max(
                base.values.output.maximumChunkRawBytes,
                options.outputInlineBytes,
              ),
            }),
      },
    });
    if (options.outputDirectory !== undefined) {
      mkdirSync(options.outputDirectory, { recursive: true });
    }
    super(policy.values, {
      ...(options.writeChunkSize === undefined ? {} : { writeChunkSize: options.writeChunkSize }),
      ...(options.outputDirectory === undefined
        ? {}
        : { outputDirectory: options.outputDirectory }),
    });
  }
}`},{id:"pr127",subject:"pr-127",path:"Supplied PR body and commit messages",start:1,end:101,revision:"64919bcbcf7fcc8202779b78c5f069b24662bb18",text:`## Context

The [daemon architecture spec](https://github.com/mohasarc/symnav/blob/main/plans/005/daemon-architecture-functional-spec.md) assigns turn-scoped semantic-cache lifetime to core. Building on #126, this layer moves only cache lifetime out of TypeScript while preserving all six algorithms, key spaces, promise/value identities, and failure behavior.

## Shape

Before \u2014 TypeScript owned each cache and its clearing sequence:

\`\`\`mermaid
flowchart LR
    Backend["TypeScriptBackend"] -->|calls refresh/release| Service["TypeScriptSemanticQueryService<br/>query algorithms + manual clearing"]
    Service -->|owns| Maps["six independent Maps"]
    Service -->|starts release| Graph["TypeScriptProjectGraph"]
    style Service fill:#fff2cc,stroke:#bf9000
    style Maps fill:#ffdddd,stroke:#cc0000
\`\`\`

After \u2014 core owns cache lifetime and the backend is the release barrier:

\`\`\`mermaid
flowchart LR
    Backend["TypeScriptBackend<br/>awaited release boundary"] -->|calls refresh/release| Service["TypeScriptSemanticQueryService<br/>query algorithms"]
    Service -->|owns| Scope["TurnScopedCacheScope<br/>synchronous lifecycle"]
    Scope -->|owns| Handles["six isolated typed handles"]
    Service -->|awaits release| Graph["TypeScriptProjectGraph"]
    style Backend fill:#fff2cc,stroke:#bf9000
    style Service fill:#fff2cc,stroke:#bf9000
    style Scope fill:#ddffdd,stroke:#008800
    style Handles fill:#ddffdd,stroke:#008800
\`\`\`

Legend: green = added ownership; red = removed ownership; yellow = changed responsibility.

## Where it lives

\`\`\`text
.
\u2514\u2500\u2500 packages/
    \u251C\u2500\u2500 core/src/
    \u2502   \u251C\u2500\u2500 ** index.ts
    \u2502   \u2514\u2500\u2500 backend/
    \u2502       \u251C\u2500\u2500 ++ turn-scoped-cache-scope.ts       # owns generic cache lifetime
    \u2502       \u2514\u2500\u2500 ++ turn-scoped-cache-scope.test.ts  # locks identity, error, and clearing contracts
    \u2514\u2500\u2500 backend-typescript/src/typescript-backend/
        \u251C\u2500\u2500 ** typescript-semantic-query-service.ts       # adopts six isolated cache handles
        \u251C\u2500\u2500 ** typescript-semantic-query-service.test.ts  # characterizes TypeScript cache behavior
        \u2514\u2500\u2500 ** typescript-backend.ts                      # owns successful-turn and release barriers
\`\`\`

## Public surface

Added to \`@symnav/core\`:

\`\`\`ts
export interface TurnScopedCache<Key, Value> {
  getOrCreate(key: Key, createValue: () => Value): Value;
}

export class TurnScopedCacheScope {
  createCache<Key, Value>(): TurnScopedCache<Key, Value>;
  beginTurn(): void;
  releaseTransientResources(): void;
}
\`\`\`

Changed on exported \`TypeScriptSemanticQueryService\`:

\`\`\`ts
// before: beginTurn(snapshot: WorkspaceSnapshot): void
beginTurn(files: readonly WorkspaceFile[]): void;

// before: releaseTransientResources(): void
releaseTransientResources(): Promise<void>;
\`\`\`

## Decisions

- Chose one scope with six handles over one shared map, because the existing queries have independent key and value spaces.
- Chose \`Map.has\` before \`Map.get\` over truthiness checks, because \`undefined\` is a valid cached value.
- Chose synchronous cache clearing before project release over clearing after the await, because released semantics must be unavailable while release is pending or rejecting.
- Chose to begin the next turn only after refresh succeeds over clearing at refresh entry, because failed refresh must preserve the current successful turn.

## Look here

- \`packages/core/src/backend/turn-scoped-cache-scope.ts:14\`
- \`packages/backend-typescript/src/typescript-backend/typescript-semantic-query-service.ts:129\`
- \`packages/backend-typescript/src/typescript-backend/typescript-backend.ts:79\`


Commits:
Characterize TypeScript semantic cache identities

Define turn-scoped cache handles

Specify turn-scoped cache lifecycle

Implement turn-scoped cache lifecycle

Specify awaited semantic resource release

Adopt turn-scoped TypeScript query caches
`},{id:"pr131",subject:"pr-131",path:"Supplied PR body and commit messages",start:1,end:92,revision:"b100221db48754656328391b878299c5a0bab443",text:`## Context

The preceding stack layer defines \`DaemonPolicy\` and carries one complete snapshot across process and worker boundaries. CLI daemon mechanisms still owned local defaults, optional numeric overrides, and hard-coded timeout/retry behavior, so runtime consumers could bypass that snapshot.

## Shape

Before \u2014 operational consumers retained their own threshold inputs:

\`\`\`mermaid
flowchart LR
    Policy["DaemonPolicy snapshot<br/>from preceding layer"]
    Defaults["CLI constants +<br/>optional numeric inputs"]
    Consumers["resource/output, lifecycle/diagnostic,<br/>deadline/attempt consumers"]

    Policy -.->|"crosses process and worker boundaries"| Consumers
    Defaults -->|"configures"| Consumers

    style Defaults fill:#ffdddd,stroke:#cc0000
    style Consumers fill:#fff2cc,stroke:#bf9000
\`\`\`

After \u2014 each consumer receives its required policy section:

\`\`\`mermaid
flowchart LR
    Policy["DaemonPolicy snapshot<br/>from preceding layer"]
    Slices["required resource, output, startup,<br/>shutdown, diagnostics, delivery slices"]
    Consumers["CLI daemon mechanisms"]

    Policy -->|"projects values"| Slices
    Slices -->|"configures"| Consumers

    style Slices fill:#ddffdd,stroke:#008800
    style Consumers fill:#fff2cc,stroke:#bf9000
\`\`\`

Legend: green = added policy input; red = removed local ownership; yellow = changed consumer.

- Output capture, completion spooling, framing, worker chunk validation, and resource supervision use required output/resource slices.
- Startup, shutdown, idle lifetime, process termination, acknowledgement polling, logging, and trace retention use required lifecycle/diagnostic slices.
- Status observation selects its 100 ms timeout by composition purpose; ordinary lifecycle and execution-status exchanges retain 250 ms.
- Result fetch resumes and post-accept execution reattachments consume independent numeric budgets.

## Where it lives

\`\`\`text
.
\u251C\u2500\u2500 apps/cli/
\u2502   \u251C\u2500\u2500 src/
\u2502   \u2502   \u251C\u2500\u2500 ** cli-program-executor.ts              # supplies output policy to command capture
\u2502   \u2502   \u251C\u2500\u2500 ** command-execution-result.ts           # applies chunk, inline, and result capacities
\u2502   \u2502   \u251C\u2500\u2500 ** commands/daemon/                      # composes lifecycle policy and status timeout purpose
\u2502   \u2502   \u2514\u2500\u2500 ** daemon/
\u2502   \u2502       \u251C\u2500\u2500 ** ... 16 implementation files      # consume required operational policy slices
\u2502   \u2502       \u2514\u2500\u2500 ** ... 15 test files                # preserve threshold and retry behavior
\u2502   \u2514\u2500\u2500 test/
\u2502       \u251C\u2500\u2500 ** ... 7 e2e/benchmark files            # retain process and output parity
\u2502       \u2514\u2500\u2500 helpers/
\u2502           \u251C\u2500\u2500 ++ ... 7 files                      # adapt legacy test knobs to validated policies
\u2502           \u2514\u2500\u2500 ** ... 10 files                     # use policy-backed helpers
\u2514\u2500\u2500 meta-tests/src/
    \u2514\u2500\u2500 ** daemon-package.test.ts                    # rejects retired defaults and bypasses
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Decisions

- Chose required policy slices over optional per-consumer numbers, because omitted composition must not recreate local defaults.
- Chose composition-purpose timeout selection over request-kind selection, because status observation and ordinary execution-status requests have distinct deadlines.
- Chose independent numeric resume and reattachment counters over one shared boolean, because each reattached execute attempt has its own fetch-resume allowance.
- Chose test-only adapters over production compatibility overloads, because tests need small thresholds without restoring runtime tuning seams.

## Look here

- \`apps/cli/src/daemon/local-daemon-transport.ts:289\`
- \`apps/cli/src/daemon/local-daemon-transport.ts:402\`
- \`apps/cli/src/daemon/workspace-daemon.ts:113\`


Commits:
Specify resource and output policy slices

Route resource and output policy

Specify lifecycle and diagnostic policy slices

Route lifecycle and diagnostic policy

Specify distinct daemon deadlines and attempts

Preserve distinct daemon attempt limits
`}]};var Sm={recordedAt:"2026-09-13T11:25:47.435Z",pins:{"pr-127-base":"a1e325a5ff979bdfa25babc5554621c8c0f20497","pr-127-head":"64919bcbcf7fcc8202779b78c5f069b24662bb18","pr-131-base":"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e","pr-131-head":"b100221db48754656328391b878299c5a0bab443"},limits:"Actual compiled methods; injected empty workspace, deferred project cleanup, and scripted local sockets. No full daemon or end-to-end output parity claim.",cache:[{build:"base",condition:"turn",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"New turn",sameHandle:!0,sameEntry:!1,searches:2,release:"not applicable",oldCaller:"held"}]},{build:"base",condition:"failed-refresh",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"Refresh rejected",sameHandle:!0,sameEntry:!0,searches:1,release:"not applicable",oldCaller:"held"}]},{build:"base",condition:"release-ok",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"Cleanup held",sameHandle:!0,sameEntry:!1,entryState:"empty",searches:1,release:"resolved",oldCaller:"held"},{label:"Query during cleanup",sameHandle:!0,sameEntry:!1,searches:2,release:"resolved",oldCaller:"held"},{label:"Cleanup settled",sameHandle:!0,sameEntry:!1,searches:2,release:"resolved",oldCaller:"held"}]},{build:"base",condition:"release-error",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"Cleanup held",sameHandle:!0,sameEntry:!1,entryState:"empty",searches:1,release:"resolved",oldCaller:"held"},{label:"Query during cleanup",sameHandle:!0,sameEntry:!1,searches:2,release:"resolved",oldCaller:"held"},{label:"Cleanup settled",sameHandle:!0,sameEntry:!1,searches:2,release:"resolved",oldCaller:"held"}]},{build:"base",condition:"old-promise",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"pending"},{label:"New turn",sameHandle:!0,sameEntry:!1,searches:2,release:"not applicable",oldCaller:"pending"},{label:"Old promise settled",sameHandle:!0,sameEntry:!1,searches:2,release:"not applicable",oldCaller:"resolved; current entry unchanged"}]},{build:"head",condition:"turn",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"New turn",sameHandle:!0,sameEntry:!1,searches:2,release:"not applicable",oldCaller:"held"}]},{build:"head",condition:"failed-refresh",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"Refresh rejected",sameHandle:!0,sameEntry:!0,searches:1,release:"not applicable",oldCaller:"held"}]},{build:"head",condition:"release-ok",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"Cleanup held",sameHandle:!0,sameEntry:!1,entryState:"empty",searches:1,release:"pending",oldCaller:"held"},{label:"Query during cleanup",sameHandle:!0,sameEntry:!1,searches:2,release:"pending",oldCaller:"held"},{label:"Cleanup settled",sameHandle:!0,sameEntry:!1,searches:2,release:"resolved",oldCaller:"held"}]},{build:"head",condition:"release-error",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"held"},{label:"Cleanup held",sameHandle:!0,sameEntry:!1,entryState:"empty",searches:1,release:"pending",oldCaller:"held"},{label:"Query during cleanup",sameHandle:!0,sameEntry:!1,searches:2,release:"pending",oldCaller:"held"},{label:"Cleanup settled",sameHandle:!0,sameEntry:!1,searches:2,release:"rejected",oldCaller:"held"}]},{build:"head",condition:"old-promise",steps:[{label:"Prepared",sameHandle:!0,sameEntry:!0,searches:1,release:"not called",oldCaller:"pending"},{label:"New turn",sameHandle:!0,sameEntry:!1,searches:2,release:"not applicable",oldCaller:"pending"},{label:"Old promise settled",sameHandle:!0,sameEntry:!1,searches:2,release:"not applicable",oldCaller:"resolved; current entry unchanged"}]}],delivery:[{build:"base",condition:"fresh-fetch",limits:{reattach:1,fetch:1},executeCount:2,fetchCount:1,outcome:"completed",events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:2,offset:null,requestId:"atlas-request"},{kind:"result-fetch",attempt:2,offset:0,requestId:"atlas-request"},{kind:"result-ack",attempt:2,offset:null,requestId:"atlas-request"}]},{build:"base",condition:"two-reattachments",limits:{reattach:1,fetch:1},executeCount:2,fetchCount:0,outcome:"rejected",error:{code:"closed",delivery:"accepted",message:"Daemon connection ended after acceptance before completion",authenticatedInstanceId:"specimen"},events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:2,offset:null,requestId:"atlas-request"}]},{build:"base",condition:"later-error",limits:{reattach:1,fetch:1},executeCount:2,fetchCount:0,outcome:"rejected",error:{code:"closed",delivery:"accepted",message:"Daemon connection ended after acceptance before completion",authenticatedInstanceId:"specimen"},events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:2,offset:null,requestId:"atlas-request"}]},{build:"head",condition:"fresh-fetch",limits:{reattach:1,fetch:1},executeCount:2,fetchCount:1,outcome:"completed",events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:2,offset:null,requestId:"atlas-request"},{kind:"result-fetch",attempt:2,offset:0,requestId:"atlas-request"},{kind:"result-ack",attempt:2,offset:null,requestId:"atlas-request"}]},{build:"head",condition:"two-reattachments",limits:{reattach:2,fetch:1},executeCount:3,fetchCount:0,outcome:"completed",events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:2,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:3,offset:null,requestId:"atlas-request"},{kind:"result-ack",attempt:3,offset:null,requestId:"atlas-request"}]},{build:"head",condition:"no-fetch",limits:{reattach:0,fetch:0},executeCount:1,fetchCount:0,outcome:"rejected",error:{code:"closed",delivery:"accepted",message:"Daemon connection ended after acceptance before completion",authenticatedInstanceId:"specimen"},events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"}]},{build:"head",condition:"fetch-three",limits:{reattach:0,fetch:3},executeCount:1,fetchCount:1,outcome:"rejected",error:{code:"corrupt",delivery:"accepted",message:"Daemon result resume ended before completion",authenticatedInstanceId:null},events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"result-fetch",attempt:1,offset:0,requestId:"atlas-request"}]},{build:"head",condition:"later-error",limits:{reattach:1,fetch:1},executeCount:2,fetchCount:0,outcome:"rejected",error:{code:"corrupt",delivery:"accepted",message:"Malformed daemon result manifest",authenticatedInstanceId:null},events:[{kind:"execute",attempt:1,offset:null,requestId:"atlas-request"},{kind:"execute",attempt:2,offset:null,requestId:"atlas-request"}]}],outer:[{build:"base",condition:"completion-reject",error:"first close"},{build:"base",condition:"setup-reject",error:"first close"},{build:"head",condition:"completion-reject",error:"later corruption"},{build:"head",condition:"setup-reject",error:"first close"}],factory:{undefinedCalls:1,throwCalls:2,rejectionCalls:1}};var Gx=[["old-promise","Settle an old promise after a new turn","The old caller resolves; the current entry stays new.","The first ensureFiles call is held. A successful refresh starts another turn; then the old call is released."],["turn","Complete a refresh","Both builds start a second search and retain the handle.","The same empty workspace is refreshed successfully between two identical queries."],["failed-refresh","Make the refresh reject","Both builds retain the original entry: one search.","The second state.refresh rejects before beginTurn can run."],["release-ok","Hold cleanup, then finish it","Both clear first; only head waits for cleanup.","The project graph returns an injected deferred promise. Query while it is held, then resolve it."],["release-error","Hold cleanup, then reject it","Both clear first; only head exposes cleanup rejection.","The same deferred cleanup rejects. The probe observes the graph promise so base has no unhandled rejection."]],Kx=[["fresh-fetch","Close, reattach, then fetch","Both builds: 2 execute attempts, 1 fetch, completed.","Attempt 1 returns acceptance only. Attempt 2 returns acceptance and a manifest, then closes. Its fetch supplies the empty result and the server acknowledges receipt."],["two-reattachments","Allow two outer reattachments","Head: 3 attempts and completion. Base: 2 attempts and rejection.","Two accepted attempts close without a manifest; the third would complete. Head uses a custom outer limit of 2; base has a fixed limit of 1."],["no-fetch","Set both allowances to zero","Head: 1 attempt, 0 fetches, rejected.","Head-only custom policy: both delivery allowances are zero. The accepted attempt closes after a manifest."],["fetch-three","Give an incomplete fetch allowance three","Head: 1 attempt, 1 fetch, corrupt\u2014not three fetches.","Head-only custom policy: outer limit 0, fetch limit 3. The server gracefully ends the resumed stream after its manifest, without result-end."],["later-error","Corrupt the reattached completion","Base exposes closed; head exposes corrupt.","Attempt 1 closes after acceptance. Attempt 2 accepts, then sends a manifest with the wrong instance identity."]];var Yr="#287a79",Na="#bc5936",Oa="#243b3c",yu="#f6f3e9",I5="#c9cec0",gu="all",ge=e=>document.getElementById(e),hu=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),Qo=e=>gu==="all"||e.cls===gu?1:.16,Cm=e=>Math.max(260,Math.floor(ge(e).getBoundingClientRect().width)),q5=e=>e.cls==="fresh"?Na:Yr;function Zo(e){let t=e==="cache",n=t?"cache-plate":"delivery-plate",r=Cm(n),o=r<480,i=t?["01 / TURN 0","02 / TURN 1","03 / OLD SETTLES"]:["01 / ATTEMPT 1","02 / ATTEMPT 2","03 / FETCH"],a=[],s=[],c=[],u=[],l=[];for(let p=0;p<3;p++){let m=i[p],h=(y,b)=>y.push({section:m,...b});o&&h(u,{x:50,y:3,text:m,size:11,cls:"retained"}),t?(h(a,{x1:1,x2:99,y1:12,y2:79,cls:"retained",stroke:Oa,dash:null}),h(a,{x1:5,x2:95,y1:26,y2:74,cls:"retained",stroke:Yr,dash:"3,3"}),h(u,{x:50,y:18,text:"TypeScript service",size:12,cls:"retained"}),h(u,{x:50,y:31,text:"core scope \xB7 6 handles",size:11,cls:"retained"}),["D","R","T","C","E","P"].forEach((y,b)=>{let g=13+b*14.8;h(s,{x1:g-5.5,x2:g+5.5,y1:40,y2:66,cls:"retained"}),h(u,{x:g,y:46,text:y,size:12,cls:"retained"})}),h(c,{x:13,y:59,symbol:"circle",r:o?4:7,cls:p===0?"retained":"fresh",label:p===0?"p\u2080":"p\u2081"}),h(u,{x:50,y:70,text:p===0?"one cached promise":"new entry; same handles",size:11,cls:p===0?"retained":"fresh"}),h(c,{x:19,y:89,symbol:"circle",r:o?4:7,cls:"outside",label:"p\u2080"}),h(u,{x:57,y:89,text:p===2?"p\u2080 resolved":"caller holds p\u2080",size:12,cls:"outside"}),p===2&&h(u,{x:50,y:98,text:"p\u2081 is still current",size:11,cls:"fresh"})):(h(a,{x1:1,x2:99,y1:12,y2:94,cls:"retained",stroke:Oa,dash:null}),h(u,{x:50,y:18,text:"CLI completion loop",size:12,cls:"retained"}),h(c,{x:17,y:31,symbol:"diamond",r:o?5:8,cls:"retained",label:p===0?"R = 0":"R = 1"}),h(u,{x:63,y:31,text:p===0?"R = 0 / 1":"R = 1 / 1",size:13,cls:"retained"}),h(a,{x1:8,x2:92,y1:42,y2:78,cls:p===0?"retained":"fresh",stroke:p===0?Yr:Na,dash:"3,3"}),h(u,{x:50,y:48,text:p===0?"executeOnce \u2081":"executeOnce \u2082",size:12,cls:p===0?"retained":"fresh"}),h(c,{x:25,y:61,symbol:"square",r:o?5:8,cls:p===0?"retained":"fresh",label:"receiver + output"}),h(c,{x:65,y:61,symbol:"diamond",r:o?5:8,cls:p===0?"retained":"fresh",label:p===2?"F = 1":"F = 0"}),h(u,{x:27,y:72,text:p===0?"output \u2081":"output \u2082",size:12,cls:p===0?"retained":"fresh"}),h(u,{x:69,y:72,text:p===2?"F = 1 / 1":"F = 0 / 1",size:12,cls:p===0?"retained":"fresh"}),h(u,{x:50,y:86,text:"same request identity",size:12,cls:"retained"}),p===2&&h(u,{x:50,y:99,text:"fetch resumes result",size:11,cls:"fresh"}))}let d=o?{fy:"section"}:{fx:"section"},f=zr({width:r,height:o?700:300,marginTop:o?0:30,marginBottom:9,marginLeft:0,marginRight:0,x:{domain:[0,100],axis:null},y:{domain:[0,102],reverse:!0,axis:null},...o?{fy:{domain:i,axis:null,padding:.08}}:{fx:{domain:i,axis:"top",label:null,tickSize:0,padding:.12}},style:{fontSize:"11px",fontFamily:"Arial, sans-serif"},marks:[Ba(a.filter(p=>!p.dash),{...d,x1:"x1",x2:"x2",y1:"y1",y2:"y2",rx:18,fill:"none",stroke:"stroke",strokeWidth:1.15,strokeOpacity:Qo}),Ba(a.filter(p=>p.dash),{...d,x1:"x1",x2:"x2",y1:"y1",y2:"y2",rx:7,fill:"none",stroke:"stroke",strokeWidth:1.15,strokeDasharray:"4,3",strokeOpacity:Qo}),Ba(s,{...d,x1:"x1",x2:"x2",y1:"y1",y2:"y2",fill:yu,stroke:Yr,strokeOpacity:Qo,fillOpacity:Qo}),Fa(c,{...d,x:"x",y:"y",symbol:"symbol",r:7,fill:q5,fillOpacity:Qo,stroke:yu,strokeWidth:1,title:p=>p.label}),rr(u,{...d,x:"x",y:"y",text:"text",fontSize:"size",fill:p=>p.cls==="fresh"?Na:Oa,fillOpacity:Qo})]});f.setAttribute("role","img"),f.setAttribute("aria-label",t?"Cache sections: same service and six handles; current promise changes from p0 to p1; caller p0 later resolves without replacing p1.":"Delivery sections: outer reattachment counter goes from zero to one and stays one; attempt two has its own fetch count starting at zero."),ge(n).replaceChildren(f)}function vu(){let e=ge("cache-condition").value,t=Gx.find(l=>l[0]===e);ge("cache-protocol").textContent=t[3],ge("cache-outcome").textContent=t[2];let n=Sm.cache.filter(l=>l.condition===e),r=n.flatMap(l=>l.steps.map((d,f)=>({...d,build:l.build==="base"?"BASE":"HEAD",i:f}))),o=n[0].steps.map(l=>l.label),i=Cm("cache-observation"),a=i<470,s=zr({width:i,height:a?290:220,marginLeft:33,marginRight:a?36:55,marginBottom:a?62:43,marginTop:12,fy:{domain:["BASE","HEAD"],label:null,tickSize:0},x:{domain:o,label:null,tickSize:0,tickFormat:a?l=>l.replace("Cleanup settled","Settled").replace("Query during cleanup","Query").replace("Old promise settled","Old settled").replace("Refresh rejected","Rejected").replace("Cleanup held","Held"):void 0},y:{domain:[0,2.5],ticks:[0,1,2],grid:!0,label:null},style:{fontSize:a?"9px":"10px"},marks:[km(r,{fy:"build",x:"label",y:"searches",stroke:I5,strokeWidth:1.5}),Fa(r,{fy:"build",x:"label",y:"searches",r:6,fill:l=>l.entryState==="empty"?yu:l.sameEntry?Yr:Na,stroke:l=>l.entryState==="empty"?Oa:yu,strokeWidth:1.5,title:l=>`${l.build} \xB7 ${l.label}
Searches: ${l.searches}
Current entry: ${l.entryState==="empty"?"empty":l.sameEntry?"original":"new"}
Same handle: ${l.sameHandle}
Release: ${l.release}`}),rr(r,{fy:"build",x:"label",y:"searches",text:l=>String(l.searches),dy:-14,fontSize:11,fill:Oa})]});s.setAttribute("role","img"),s.setAttribute("aria-label",`Search counts at checkpoints for ${t[1]}. ${t[2]}`),ge("cache-observation").replaceChildren(s);let c=e.startsWith("release"),u=e==="old-promise";ge("cache-results").innerHTML=`<table class="result-table"><caption class="eyebrow">Final observations / same fixture</caption><thead><tr><th>Build</th><th>Searches</th><th>Handle</th><th>Current entry</th>${c?"<th>Release: held \u2192 settled</th>":u?"<th>Caller p\u2080</th>":""}</tr></thead><tbody>${n.map(l=>{let d=l.steps.at(-1);return`<tr><td>${l.build.toUpperCase()}</td><td>${d.searches}</td><td>${d.sameHandle?"same":"replaced"}</td><td>${d.sameEntry?"same":"new"}</td>${c?`<td>${l.steps.find(f=>f.label==="Cleanup held").release} \u2192 ${d.release}</td>`:u?`<td>${d.oldCaller}</td>`:""}</tr>`}).join("")}</tbody></table>`}function _m(){let e=ge("delivery-condition").value,t=Kx.find(a=>a[0]===e);ge("delivery-protocol").textContent=t[3],ge("delivery-outcome").textContent=t[2];let n=Sm.delivery.filter(a=>a.condition===e),r=n.flatMap(a=>[{build:a.build.toUpperCase(),kind:"execute",count:a.executeCount},{build:a.build.toUpperCase(),kind:"fetch",count:a.fetchCount}]),o=Cm("delivery-observation"),i=zr({width:o,height:210,marginLeft:48,marginRight:42,marginTop:18,marginBottom:35,fx:{domain:n.map(a=>a.build.toUpperCase()),axis:"top",label:null,tickSize:0},x:{domain:[0,3.4],ticks:[0,1,2,3],grid:!0,label:null},y:{domain:["execute","fetch"],label:null,tickSize:0},marks:[qa(r,{fx:"build",y:"kind",x1:0,x2:"count",stroke:Yr,strokeOpacity:.3,strokeWidth:3}),Fa(r,{fx:"build",x:"count",y:"kind",symbol:a=>a.kind==="execute"?"square":"diamond",r:7,fill:a=>a.build==="HEAD"?Na:Yr}),rr(r,{fx:"build",x:"count",y:"kind",text:a=>String(a.count),dx:17,fontSize:12})]});i.setAttribute("role","img"),i.setAttribute("aria-label",`${t[1]}. ${t[2]}`),ge("delivery-observation").replaceChildren(i),ge("delivery-results").innerHTML=`<table class="result-table"><caption class="eyebrow">Recorded wire sequence / E = execute, F = fetch</caption><thead><tr><th>Build</th><th>Limits R / F</th><th>Sequence</th><th>Caller result</th></tr></thead><tbody>${n.map(a=>`<tr><td>${a.build.toUpperCase()}</td><td>${a.limits.reattach} / ${a.limits.fetch}</td><td>${a.events.map(s=>s.kind==="execute"?"E":s.kind==="result-fetch"?"F":"ACK").join(" \u2192 ")}</td><td>${a.outcome}${a.error?` \xB7 <span class="fresh-result">${hu(a.error.code)}</span>`:""}</td></tr>`).join("")}</tbody></table>`}for(let e of document.querySelectorAll("[data-stain]"))e.addEventListener("click",()=>{gu=e.dataset.stain,document.querySelectorAll("[data-stain]").forEach(t=>t.setAttribute("aria-pressed",String(t===e))),ge("stain-caption").textContent={all:"Compare the same structures across each section.",retained:"Same handles; the outer reattachment budget remains in force.",fresh:"New entries or a new per-attempt receiver, output and counter.",outside:"The caller\u2019s old promise survives the cache clear."}[gu],Zo("cache"),Zo("delivery")});function Xx(e,t=!1){for(let n of document.querySelectorAll("[data-lab]")){let r=n.dataset.lab===e;n.setAttribute("aria-selected",String(r)),n.tabIndex=r?0:-1,r&&t&&n.focus()}ge("cache-lab").hidden=e!=="cache",ge("delivery-lab").hidden=e!=="delivery",e==="cache"?vu():_m()}document.querySelectorAll("[data-lab]").forEach(e=>{e.addEventListener("click",()=>Xx(e.dataset.lab)),e.addEventListener("keydown",t=>{["ArrowLeft","ArrowRight","Home","End"].includes(t.key)&&(t.preventDefault(),Xx(t.key==="Home"?"cache":t.key==="End"||e.dataset.lab==="cache"?"delivery":"cache",!0))})});ge("cache-condition").addEventListener("change",vu);ge("delivery-condition").addEventListener("change",_m);document.querySelectorAll("[data-receipt]").forEach(e=>e.addEventListener("click",t=>{let n=Vx.receipts.find(r=>r.id===e.dataset.receipt);n&&(t.preventDefault(),ge("source-content").innerHTML=`<article class="receipt"><p class="eyebrow">${hu(n.subject)} \xB7 ${n.revision.slice(0,12)}</p><h2>${hu(n.path)}</h2><p class="source-loc">Lines ${n.start}\u2013${n.end} \xB7 <a href="evidence.html#${n.id}">Open in the source book \u2197</a></p><pre>${n.text.split(`
`).map((r,o)=>`<span class="code-line"><span class="line-number">${n.start+o}</span>${hu(r)||" "}</span>`).join("")}</pre></article>`,ge("source-dialog").showModal(),ge("source-dialog").scrollTop=0)}));var Tm=!1,Qx=new ResizeObserver(()=>{Tm||(Tm=!0,requestAnimationFrame(()=>{Tm=!1,Zo("cache"),Zo("delivery"),ge("cache-lab").hidden||vu(),ge("delivery-lab").hidden||_m()}))});Qx.observe(ge("cache-plate"));Qx.observe(ge("delivery-plate"));Zo("cache");Zo("delivery");vu();document.documentElement.dataset.ready="true";})();
