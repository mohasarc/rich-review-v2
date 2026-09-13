(()=>{function Bt(e,n){let t=0;if(n===void 0)for(let r of e)r!=null&&(r=+r)>=r&&++t;else{let r=-1;for(let o of e)(o=n(o,++r,e))!=null&&(o=+o)>=o&&++t}return t}function _n(e,n){let t,r;if(n===void 0)for(let o of e)o!=null&&(t===void 0?o>=o&&(t=r=o):(t>o&&(t=o),r<o&&(r=o)));else{let o=-1;for(let s of e)(s=n(s,++o,e))!=null&&(t===void 0?s>=s&&(t=r=s):(t>s&&(t=s),r<s&&(r=s)))}return[t,r]}var re=class{constructor(){this._partials=new Float64Array(32),this._n=0}add(n){let t=this._partials,r=0;for(let o=0;o<this._n&&o<32;o++){let s=t[o],a=n+s,i=Math.abs(n)<Math.abs(s)?n-(a-s):s-(a-n);i&&(t[r++]=i),n=a}return t[r]=n,this._n=r+1,this}valueOf(){let n=this._partials,t=this._n,r,o,s,a=0;if(t>0){for(a=n[--t];t>0&&(r=a,o=n[--t],a=r+o,s=o-(a-r),!s););t>0&&(s<0&&n[t-1]<0||s>0&&n[t-1]>0)&&(o=s*2,r=a+o,o==r-a&&(a=r))}return a}};var Na=Math.sqrt(50),Fa=Math.sqrt(10),ja=Math.sqrt(2);function Mn(e,n,t){let r=(n-e)/Math.max(0,t),o=Math.floor(Math.log10(r)),s=r/Math.pow(10,o),a=s>=Na?10:s>=Fa?5:s>=ja?2:1,i,l,c;return o<0?(c=Math.pow(10,-o)/a,i=Math.round(e*c),l=Math.round(n*c),i/c<e&&++i,l/c>n&&--l,c=-c):(c=Math.pow(10,o)*a,i=Math.round(e/c),l=Math.round(n/c),i*c<e&&++i,l*c>n&&--l),l<i&&.5<=t&&t<2?Mn(e,n,t*2):[i,l,c]}function Bn(e,n,t){if(n=+n,e=+e,t=+t,!(t>0))return[];if(e===n)return[e];let r=n<e,[o,s,a]=r?Mn(n,e,t):Mn(e,n,t);if(!(s>=o))return[];let i=s-o+1,l=new Array(i);if(r)if(a<0)for(let c=0;c<i;++c)l[c]=(s-c)/-a;else for(let c=0;c<i;++c)l[c]=(s-c)*a;else if(a<0)for(let c=0;c<i;++c)l[c]=(o+c)/-a;else for(let c=0;c<i;++c)l[c]=(o+c)*a;return l}function Pt(e,n,t){return n=+n,e=+e,t=+t,Mn(e,n,t)[2]}function Pn(e,n,t){let r;for(;;){let o=Pt(e,n,t);if(o===r||o===0||!isFinite(o))return[e,n];o>0?(e=Math.floor(e/o)*o,n=Math.ceil(n/o)*o):o<0&&(e=Math.ceil(e*o)/o,n=Math.floor(n*o)/o),r=o}}function On(e){return Math.max(1,Math.ceil(Math.log(Bt(e))/Math.LN2)+1)}function An(e,n){let t;if(n===void 0)for(let r of e)r!=null&&(t<r||t===void 0&&r>=r)&&(t=r);else{let r=-1;for(let o of e)(o=n(o,++r,e))!=null&&(t<o||t===void 0&&o>=o)&&(t=o)}return t}function*za(e){for(let n of e)yield*n}function Ln(e){return Array.from(za(e))}function ke(e,n,t){e=+e,n=+n,t=(o=arguments.length)<2?(n=e,e=0,1):o<3?1:+t;for(var r=-1,o=Math.max(0,Math.ceil((n-e)/t))|0,s=new Array(o);++r<o;)s[r]=e+r*t;return s}var $a={value:()=>{}};function Fr(){for(var e=0,n=arguments.length,t={},r;e<n;++e){if(!(r=arguments[e]+"")||r in t||/[\s.]/.test(r))throw new Error("illegal type: "+r);t[r]=[]}return new Nn(t)}function Nn(e){this._=e}function Ua(e,n){return e.trim().split(/^|\s+/).map(function(t){var r="",o=t.indexOf(".");if(o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:r}})}Nn.prototype=Fr.prototype={constructor:Nn,on:function(e,n){var t=this._,r=Ua(e+"",t),o,s=-1,a=r.length;if(arguments.length<2){for(;++s<a;)if((o=(e=r[s]).type)&&(o=Ha(t[o],e.name)))return o;return}if(n!=null&&typeof n!="function")throw new Error("invalid callback: "+n);for(;++s<a;)if(o=(e=r[s]).type)t[o]=Nr(t[o],e.name,n);else if(n==null)for(o in t)t[o]=Nr(t[o],e.name,null);return this},copy:function(){var e={},n=this._;for(var t in n)e[t]=n[t].slice();return new Nn(e)},call:function(e,n){if((o=arguments.length-2)>0)for(var t=new Array(o),r=0,o,s;r<o;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(s=this._[e],r=0,o=s.length;r<o;++r)s[r].value.apply(n,t)},apply:function(e,n,t){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],o=0,s=r.length;o<s;++o)r[o].value.apply(n,t)}};function Ha(e,n){for(var t=0,r=e.length,o;t<r;++t)if((o=e[t]).name===n)return o.value}function Nr(e,n,t){for(var r=0,o=e.length;r<o;++r)if(e[r].name===n){e[r]=$a,e=e.slice(0,r).concat(e.slice(r+1));break}return t!=null&&e.push({name:n,value:t}),e}var nn=Fr;var Fn="http://www.w3.org/1999/xhtml",Ot={svg:"http://www.w3.org/2000/svg",xhtml:Fn,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function fe(e){var n=e+="",t=n.indexOf(":");return t>=0&&(n=e.slice(0,t))!=="xmlns"&&(e=e.slice(t+1)),Ot.hasOwnProperty(n)?{space:Ot[n],local:e}:e}function Wa(e){return function(){var n=this.ownerDocument,t=this.namespaceURI;return t===Fn&&n.documentElement.namespaceURI===Fn?n.createElement(e):n.createElementNS(t,e)}}function Va(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function jn(e){var n=fe(e);return(n.local?Va:Wa)(n)}function Ya(){}function Ie(e){return e==null?Ya:function(){return this.querySelector(e)}}function jr(e){typeof e!="function"&&(e=Ie(e));for(var n=this._groups,t=n.length,r=new Array(t),o=0;o<t;++o)for(var s=n[o],a=s.length,i=r[o]=new Array(a),l,c,u=0;u<a;++u)(l=s[u])&&(c=e.call(l,l.__data__,u,s))&&("__data__"in l&&(c.__data__=l.__data__),i[u]=c);return new F(r,this._parents)}function At(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Ka(){return[]}function tn(e){return e==null?Ka:function(){return this.querySelectorAll(e)}}function Xa(e){return function(){return At(e.apply(this,arguments))}}function zr(e){typeof e=="function"?e=Xa(e):e=tn(e);for(var n=this._groups,t=n.length,r=[],o=[],s=0;s<t;++s)for(var a=n[s],i=a.length,l,c=0;c<i;++c)(l=a[c])&&(r.push(e.call(l,l.__data__,c,a)),o.push(l));return new F(r,o)}function rn(e){return function(){return this.matches(e)}}function zn(e){return function(n){return n.matches(e)}}var Ga=Array.prototype.find;function Ja(e){return function(){return Ga.call(this.children,e)}}function Qa(){return this.firstElementChild}function $r(e){return this.select(e==null?Qa:Ja(typeof e=="function"?e:zn(e)))}var Za=Array.prototype.filter;function ei(){return Array.from(this.children)}function ni(e){return function(){return Za.call(this.children,e)}}function Ur(e){return this.selectAll(e==null?ei:ni(typeof e=="function"?e:zn(e)))}function Hr(e){typeof e!="function"&&(e=rn(e));for(var n=this._groups,t=n.length,r=new Array(t),o=0;o<t;++o)for(var s=n[o],a=s.length,i=r[o]=[],l,c=0;c<a;++c)(l=s[c])&&e.call(l,l.__data__,c,s)&&i.push(l);return new F(r,this._parents)}function $n(e){return new Array(e.length)}function Wr(){return new F(this._enter||this._groups.map($n),this._parents)}function on(e,n){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=n}on.prototype={constructor:on,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,n){return this._parent.insertBefore(e,n)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Vr(e){return function(){return e}}function ti(e,n,t,r,o,s){for(var a=0,i,l=n.length,c=s.length;a<c;++a)(i=n[a])?(i.__data__=s[a],r[a]=i):t[a]=new on(e,s[a]);for(;a<l;++a)(i=n[a])&&(o[a]=i)}function ri(e,n,t,r,o,s,a){var i,l,c=new Map,u=n.length,p=s.length,d=new Array(u),f;for(i=0;i<u;++i)(l=n[i])&&(d[i]=f=a.call(l,l.__data__,i,n)+"",c.has(f)?o[i]=l:c.set(f,l));for(i=0;i<p;++i)f=a.call(e,s[i],i,s)+"",(l=c.get(f))?(r[i]=l,l.__data__=s[i],c.delete(f)):t[i]=new on(e,s[i]);for(i=0;i<u;++i)(l=n[i])&&c.get(d[i])===l&&(o[i]=l)}function oi(e){return e.__data__}function Yr(e,n){if(!arguments.length)return Array.from(this,oi);var t=n?ri:ti,r=this._parents,o=this._groups;typeof e!="function"&&(e=Vr(e));for(var s=o.length,a=new Array(s),i=new Array(s),l=new Array(s),c=0;c<s;++c){var u=r[c],p=o[c],d=p.length,f=si(e.call(u,u&&u.__data__,c,r)),h=f.length,k=i[c]=new Array(h),q=a[c]=new Array(h),v=l[c]=new Array(d);t(u,p,k,q,v,f,n);for(var E=0,C=0,w,S;E<h;++E)if(w=k[E]){for(E>=C&&(C=E+1);!(S=q[C])&&++C<h;);w._next=S||null}}return a=new F(a,r),a._enter=i,a._exit=l,a}function si(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Kr(){return new F(this._exit||this._groups.map($n),this._parents)}function Xr(e,n,t){var r=this.enter(),o=this,s=this.exit();return typeof e=="function"?(r=e(r),r&&(r=r.selection())):r=r.append(e+""),n!=null&&(o=n(o),o&&(o=o.selection())),t==null?s.remove():t(s),r&&o?r.merge(o).order():o}function Gr(e){for(var n=e.selection?e.selection():e,t=this._groups,r=n._groups,o=t.length,s=r.length,a=Math.min(o,s),i=new Array(o),l=0;l<a;++l)for(var c=t[l],u=r[l],p=c.length,d=i[l]=new Array(p),f,h=0;h<p;++h)(f=c[h]||u[h])&&(d[h]=f);for(;l<o;++l)i[l]=t[l];return new F(i,this._parents)}function Jr(){for(var e=this._groups,n=-1,t=e.length;++n<t;)for(var r=e[n],o=r.length-1,s=r[o],a;--o>=0;)(a=r[o])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function Qr(e){e||(e=ai);function n(p,d){return p&&d?e(p.__data__,d.__data__):!p-!d}for(var t=this._groups,r=t.length,o=new Array(r),s=0;s<r;++s){for(var a=t[s],i=a.length,l=o[s]=new Array(i),c,u=0;u<i;++u)(c=a[u])&&(l[u]=c);l.sort(n)}return new F(o,this._parents).order()}function ai(e,n){return e<n?-1:e>n?1:e>=n?0:NaN}function Zr(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function eo(){return Array.from(this)}function no(){for(var e=this._groups,n=0,t=e.length;n<t;++n)for(var r=e[n],o=0,s=r.length;o<s;++o){var a=r[o];if(a)return a}return null}function to(){let e=0;for(let n of this)++e;return e}function ro(){return!this.node()}function oo(e){for(var n=this._groups,t=0,r=n.length;t<r;++t)for(var o=n[t],s=0,a=o.length,i;s<a;++s)(i=o[s])&&e.call(i,i.__data__,s,o);return this}function ii(e){return function(){this.removeAttribute(e)}}function ci(e){return function(){this.removeAttributeNS(e.space,e.local)}}function ui(e,n){return function(){this.setAttribute(e,n)}}function li(e,n){return function(){this.setAttributeNS(e.space,e.local,n)}}function di(e,n){return function(){var t=n.apply(this,arguments);t==null?this.removeAttribute(e):this.setAttribute(e,t)}}function pi(e,n){return function(){var t=n.apply(this,arguments);t==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,t)}}function so(e,n){var t=fe(e);if(arguments.length<2){var r=this.node();return t.local?r.getAttributeNS(t.space,t.local):r.getAttribute(t)}return this.each((n==null?t.local?ci:ii:typeof n=="function"?t.local?pi:di:t.local?li:ui)(t,n))}function Un(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function mi(e){return function(){this.style.removeProperty(e)}}function fi(e,n,t){return function(){this.style.setProperty(e,n,t)}}function hi(e,n,t){return function(){var r=n.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,t)}}function ao(e,n,t){return arguments.length>1?this.each((n==null?mi:typeof n=="function"?hi:fi)(e,n,t??"")):be(this.node(),e)}function be(e,n){return e.style.getPropertyValue(n)||Un(e).getComputedStyle(e,null).getPropertyValue(n)}function yi(e){return function(){delete this[e]}}function vi(e,n){return function(){this[e]=n}}function xi(e,n){return function(){var t=n.apply(this,arguments);t==null?delete this[e]:this[e]=t}}function io(e,n){return arguments.length>1?this.each((n==null?yi:typeof n=="function"?xi:vi)(e,n)):this.node()[e]}function co(e){return e.trim().split(/^|\s+/)}function Lt(e){return e.classList||new uo(e)}function uo(e){this._node=e,this._names=co(e.getAttribute("class")||"")}uo.prototype={add:function(e){var n=this._names.indexOf(e);n<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var n=this._names.indexOf(e);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function lo(e,n){for(var t=Lt(e),r=-1,o=n.length;++r<o;)t.add(n[r])}function po(e,n){for(var t=Lt(e),r=-1,o=n.length;++r<o;)t.remove(n[r])}function wi(e){return function(){lo(this,e)}}function gi(e){return function(){po(this,e)}}function ki(e,n){return function(){(n.apply(this,arguments)?lo:po)(this,e)}}function mo(e,n){var t=co(e+"");if(arguments.length<2){for(var r=Lt(this.node()),o=-1,s=t.length;++o<s;)if(!r.contains(t[o]))return!1;return!0}return this.each((typeof n=="function"?ki:n?wi:gi)(t,n))}function bi(){this.textContent=""}function Ei(e){return function(){this.textContent=e}}function Ci(e){return function(){var n=e.apply(this,arguments);this.textContent=n??""}}function fo(e){return arguments.length?this.each(e==null?bi:(typeof e=="function"?Ci:Ei)(e)):this.node().textContent}function Di(){this.innerHTML=""}function qi(e){return function(){this.innerHTML=e}}function Ri(e){return function(){var n=e.apply(this,arguments);this.innerHTML=n??""}}function ho(e){return arguments.length?this.each(e==null?Di:(typeof e=="function"?Ri:qi)(e)):this.node().innerHTML}function Si(){this.nextSibling&&this.parentNode.appendChild(this)}function yo(){return this.each(Si)}function Ii(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function vo(){return this.each(Ii)}function xo(e){var n=typeof e=="function"?e:jn(e);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function Ti(){return null}function wo(e,n){var t=typeof e=="function"?e:jn(e),r=n==null?Ti:typeof n=="function"?n:Ie(n);return this.select(function(){return this.insertBefore(t.apply(this,arguments),r.apply(this,arguments)||null)})}function _i(){var e=this.parentNode;e&&e.removeChild(this)}function go(){return this.each(_i)}function Mi(){var e=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(e,this.nextSibling):e}function Bi(){var e=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(e,this.nextSibling):e}function ko(e){return this.select(e?Bi:Mi)}function bo(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Pi(e){return function(n){e.call(this,n,this.__data__)}}function Oi(e){return e.trim().split(/^|\s+/).map(function(n){var t="",r=n.indexOf(".");return r>=0&&(t=n.slice(r+1),n=n.slice(0,r)),{type:n,name:t}})}function Ai(e){return function(){var n=this.__on;if(n){for(var t=0,r=-1,o=n.length,s;t<o;++t)s=n[t],(!e.type||s.type===e.type)&&s.name===e.name?this.removeEventListener(s.type,s.listener,s.options):n[++r]=s;++r?n.length=r:delete this.__on}}}function Li(e,n,t){return function(){var r=this.__on,o,s=Pi(n);if(r){for(var a=0,i=r.length;a<i;++a)if((o=r[a]).type===e.type&&o.name===e.name){this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=s,o.options=t),o.value=n;return}}this.addEventListener(e.type,s,t),o={type:e.type,name:e.name,value:n,listener:s,options:t},r?r.push(o):this.__on=[o]}}function Eo(e,n,t){var r=Oi(e+""),o,s=r.length,a;if(arguments.length<2){var i=this.node().__on;if(i){for(var l=0,c=i.length,u;l<c;++l)for(o=0,u=i[l];o<s;++o)if((a=r[o]).type===u.type&&a.name===u.name)return u.value}return}for(i=n?Li:Ai,o=0;o<s;++o)this.each(i(r[o],n,t));return this}function Co(e,n,t){var r=Un(e),o=r.CustomEvent;typeof o=="function"?o=new o(n,t):(o=r.document.createEvent("Event"),t?(o.initEvent(n,t.bubbles,t.cancelable),o.detail=t.detail):o.initEvent(n,!1,!1)),e.dispatchEvent(o)}function Ni(e,n){return function(){return Co(this,e,n)}}function Fi(e,n){return function(){return Co(this,e,n.apply(this,arguments))}}function Do(e,n){return this.each((typeof n=="function"?Fi:Ni)(e,n))}function*qo(){for(var e=this._groups,n=0,t=e.length;n<t;++n)for(var r=e[n],o=0,s=r.length,a;o<s;++o)(a=r[o])&&(yield a)}var Nt=[null];function F(e,n){this._groups=e,this._parents=n}function Ro(){return new F([[document.documentElement]],Nt)}function ji(){return this}F.prototype=Ro.prototype={constructor:F,select:jr,selectAll:zr,selectChild:$r,selectChildren:Ur,filter:Hr,data:Yr,enter:Wr,exit:Kr,join:Xr,merge:Gr,selection:ji,order:Jr,sort:Qr,call:Zr,nodes:eo,node:no,size:to,empty:ro,each:oo,attr:so,style:ao,property:io,classed:mo,text:fo,html:ho,raise:yo,lower:vo,append:xo,insert:wo,remove:go,clone:ko,datum:bo,on:Eo,dispatch:Do,[Symbol.iterator]:qo};var he=Ro;function V(e){return typeof e=="string"?new F([[document.querySelector(e)]],[document.documentElement]):new F([[e]],Nt)}function So(e){let n;for(;n=e.sourceEvent;)e=n;return e}function ye(e,n){if(e=So(e),n===void 0&&(n=e.currentTarget),n){var t=n.ownerSVGElement||n;if(t.createSVGPoint){var r=t.createSVGPoint();return r.x=e.clientX,r.y=e.clientY,r=r.matrixTransform(n.getScreenCTM().inverse()),[r.x,r.y]}if(n.getBoundingClientRect){var o=n.getBoundingClientRect();return[e.clientX-o.left-n.clientLeft,e.clientY-o.top-n.clientTop]}}return[e.pageX,e.pageY]}var Hn={capture:!0,passive:!1};function Wn(e){e.preventDefault(),e.stopImmediatePropagation()}function Ft(e){var n=e.document.documentElement,t=V(e).on("dragstart.drag",Wn,Hn);"onselectstart"in n?t.on("selectstart.drag",Wn,Hn):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")}function jt(e,n){var t=e.document.documentElement,r=V(e).on("dragstart.drag",null);n&&(r.on("click.drag",Wn,Hn),setTimeout(function(){r.on("click.drag",null)},0)),"onselectstart"in t?r.on("selectstart.drag",null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}function Vn(e,n,t){e.prototype=n.prototype=t,t.constructor=e}function zt(e,n){var t=Object.create(e.prototype);for(var r in n)t[r]=n[r];return t}function cn(){}var sn=.7,Xn=1/sn,Ue="\\s*([+-]?\\d+)\\s*",an="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",ie="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",zi=/^#([0-9a-f]{3,8})$/,$i=new RegExp(`^rgb\\(${Ue},${Ue},${Ue}\\)$`),Ui=new RegExp(`^rgb\\(${ie},${ie},${ie}\\)$`),Hi=new RegExp(`^rgba\\(${Ue},${Ue},${Ue},${an}\\)$`),Wi=new RegExp(`^rgba\\(${ie},${ie},${ie},${an}\\)$`),Vi=new RegExp(`^hsl\\(${an},${ie},${ie}\\)$`),Yi=new RegExp(`^hsla\\(${an},${ie},${ie},${an}\\)$`),Io={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Vn(cn,Ee,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:To,formatHex:To,formatHex8:Ki,formatHsl:Xi,formatRgb:_o,toString:_o});function To(){return this.rgb().formatHex()}function Ki(){return this.rgb().formatHex8()}function Xi(){return Lo(this).formatHsl()}function _o(){return this.rgb().formatRgb()}function Ee(e){var n,t;return e=(e+"").trim().toLowerCase(),(n=zi.exec(e))?(t=n[1].length,n=parseInt(n[1],16),t===6?Mo(n):t===3?new X(n>>8&15|n>>4&240,n>>4&15|n&240,(n&15)<<4|n&15,1):t===8?Yn(n>>24&255,n>>16&255,n>>8&255,(n&255)/255):t===4?Yn(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|n&240,((n&15)<<4|n&15)/255):null):(n=$i.exec(e))?new X(n[1],n[2],n[3],1):(n=Ui.exec(e))?new X(n[1]*255/100,n[2]*255/100,n[3]*255/100,1):(n=Hi.exec(e))?Yn(n[1],n[2],n[3],n[4]):(n=Wi.exec(e))?Yn(n[1]*255/100,n[2]*255/100,n[3]*255/100,n[4]):(n=Vi.exec(e))?Oo(n[1],n[2]/100,n[3]/100,1):(n=Yi.exec(e))?Oo(n[1],n[2]/100,n[3]/100,n[4]):Io.hasOwnProperty(e)?Mo(Io[e]):e==="transparent"?new X(NaN,NaN,NaN,0):null}function Mo(e){return new X(e>>16&255,e>>8&255,e&255,1)}function Yn(e,n,t,r){return r<=0&&(e=n=t=NaN),new X(e,n,t,r)}function Gi(e){return e instanceof cn||(e=Ee(e)),e?(e=e.rgb(),new X(e.r,e.g,e.b,e.opacity)):new X}function He(e,n,t,r){return arguments.length===1?Gi(e):new X(e,n,t,r??1)}function X(e,n,t,r){this.r=+e,this.g=+n,this.b=+t,this.opacity=+r}Vn(X,He,zt(cn,{brighter(e){return e=e==null?Xn:Math.pow(Xn,e),new X(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?sn:Math.pow(sn,e),new X(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new X(_e(this.r),_e(this.g),_e(this.b),Gn(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Bo,formatHex:Bo,formatHex8:Ji,formatRgb:Po,toString:Po}));function Bo(){return`#${Te(this.r)}${Te(this.g)}${Te(this.b)}`}function Ji(){return`#${Te(this.r)}${Te(this.g)}${Te(this.b)}${Te((isNaN(this.opacity)?1:this.opacity)*255)}`}function Po(){let e=Gn(this.opacity);return`${e===1?"rgb(":"rgba("}${_e(this.r)}, ${_e(this.g)}, ${_e(this.b)}${e===1?")":`, ${e})`}`}function Gn(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function _e(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Te(e){return e=_e(e),(e<16?"0":"")+e.toString(16)}function Oo(e,n,t,r){return r<=0?e=n=t=NaN:t<=0||t>=1?e=n=NaN:n<=0&&(e=NaN),new oe(e,n,t,r)}function Lo(e){if(e instanceof oe)return new oe(e.h,e.s,e.l,e.opacity);if(e instanceof cn||(e=Ee(e)),!e)return new oe;if(e instanceof oe)return e;e=e.rgb();var n=e.r/255,t=e.g/255,r=e.b/255,o=Math.min(n,t,r),s=Math.max(n,t,r),a=NaN,i=s-o,l=(s+o)/2;return i?(n===s?a=(t-r)/i+(t<r)*6:t===s?a=(r-n)/i+2:a=(n-t)/i+4,i/=l<.5?s+o:2-s-o,a*=60):i=l>0&&l<1?0:a,new oe(a,i,l,e.opacity)}function No(e,n,t,r){return arguments.length===1?Lo(e):new oe(e,n,t,r??1)}function oe(e,n,t,r){this.h=+e,this.s=+n,this.l=+t,this.opacity=+r}Vn(oe,No,zt(cn,{brighter(e){return e=e==null?Xn:Math.pow(Xn,e),new oe(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?sn:Math.pow(sn,e),new oe(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,n=isNaN(e)||isNaN(this.s)?0:this.s,t=this.l,r=t+(t<.5?t:1-t)*n,o=2*t-r;return new X($t(e>=240?e-240:e+120,o,r),$t(e,o,r),$t(e<120?e+240:e-120,o,r),this.opacity)},clamp(){return new oe(Ao(this.h),Kn(this.s),Kn(this.l),Gn(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=Gn(this.opacity);return`${e===1?"hsl(":"hsla("}${Ao(this.h)}, ${Kn(this.s)*100}%, ${Kn(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Ao(e){return e=(e||0)%360,e<0?e+360:e}function Kn(e){return Math.max(0,Math.min(1,e||0))}function $t(e,n,t){return(e<60?n+(t-n)*e/60:e<180?t:e<240?n+(t-n)*(240-e)/60:n)*255}function Ut(e,n,t,r,o){var s=e*e,a=s*e;return((1-3*e+3*s-a)*n+(4-6*s+3*a)*t+(1+3*e+3*s-3*a)*r+a*o)/6}function Fo(e){var n=e.length-1;return function(t){var r=t<=0?t=0:t>=1?(t=1,n-1):Math.floor(t*n),o=e[r],s=e[r+1],a=r>0?e[r-1]:2*o-s,i=r<n-1?e[r+2]:2*s-o;return Ut((t-r/n)*n,a,o,s,i)}}function jo(e){var n=e.length;return function(t){var r=Math.floor(((t%=1)<0?++t:t)*n),o=e[(r+n-1)%n],s=e[r%n],a=e[(r+1)%n],i=e[(r+2)%n];return Ut((t-r/n)*n,o,s,a,i)}}var Ht=e=>()=>e;function Qi(e,n){return function(t){return e+t*n}}function Zi(e,n,t){return e=Math.pow(e,t),n=Math.pow(n,t)-e,t=1/t,function(r){return Math.pow(e+r*n,t)}}function zo(e){return(e=+e)==1?Jn:function(n,t){return t-n?Zi(n,t,e):Ht(isNaN(n)?t:n)}}function Jn(e,n){var t=n-e;return t?Qi(e,t):Ht(isNaN(e)?n:e)}var Qn=(function e(n){var t=zo(n);function r(o,s){var a=t((o=He(o)).r,(s=He(s)).r),i=t(o.g,s.g),l=t(o.b,s.b),c=Jn(o.opacity,s.opacity);return function(u){return o.r=a(u),o.g=i(u),o.b=l(u),o.opacity=c(u),o+""}}return r.gamma=e,r})(1);function $o(e){return function(n){var t=n.length,r=new Array(t),o=new Array(t),s=new Array(t),a,i;for(a=0;a<t;++a)i=He(n[a]),r[a]=i.r||0,o[a]=i.g||0,s[a]=i.b||0;return r=e(r),o=e(o),s=e(s),i.opacity=1,function(l){return i.r=r(l),i.g=o(l),i.b=s(l),i+""}}}var ec=$o(Fo),nc=$o(jo);function ee(e,n){return e=+e,n=+n,function(t){return e*(1-t)+n*t}}var Vt=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Wt=new RegExp(Vt.source,"g");function tc(e){return function(){return e}}function rc(e){return function(n){return e(n)+""}}function Yt(e,n){var t=Vt.lastIndex=Wt.lastIndex=0,r,o,s,a=-1,i=[],l=[];for(e=e+"",n=n+"";(r=Vt.exec(e))&&(o=Wt.exec(n));)(s=o.index)>t&&(s=n.slice(t,s),i[a]?i[a]+=s:i[++a]=s),(r=r[0])===(o=o[0])?i[a]?i[a]+=o:i[++a]=o:(i[++a]=null,l.push({i:a,x:ee(r,o)})),t=Wt.lastIndex;return t<n.length&&(s=n.slice(t),i[a]?i[a]+=s:i[++a]=s),i.length<2?l[0]?rc(l[0].x):tc(n):(n=l.length,function(c){for(var u=0,p;u<n;++u)i[(p=l[u]).i]=p.x(c);return i.join("")})}var Uo=180/Math.PI,Zn={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Kt(e,n,t,r,o,s){var a,i,l;return(a=Math.sqrt(e*e+n*n))&&(e/=a,n/=a),(l=e*t+n*r)&&(t-=e*l,r-=n*l),(i=Math.sqrt(t*t+r*r))&&(t/=i,r/=i,l/=i),e*r<n*t&&(e=-e,n=-n,l=-l,a=-a),{translateX:o,translateY:s,rotate:Math.atan2(n,e)*Uo,skewX:Math.atan(l)*Uo,scaleX:a,scaleY:i}}var et;function Ho(e){let n=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return n.isIdentity?Zn:Kt(n.a,n.b,n.c,n.d,n.e,n.f)}function Wo(e){return e==null?Zn:(et||(et=document.createElementNS("http://www.w3.org/2000/svg","g")),et.setAttribute("transform",e),(e=et.transform.baseVal.consolidate())?(e=e.matrix,Kt(e.a,e.b,e.c,e.d,e.e,e.f)):Zn)}function Vo(e,n,t,r){function o(c){return c.length?c.pop()+" ":""}function s(c,u,p,d,f,h){if(c!==p||u!==d){var k=f.push("translate(",null,n,null,t);h.push({i:k-4,x:ee(c,p)},{i:k-2,x:ee(u,d)})}else(p||d)&&f.push("translate("+p+n+d+t)}function a(c,u,p,d){c!==u?(c-u>180?u+=360:u-c>180&&(c+=360),d.push({i:p.push(o(p)+"rotate(",null,r)-2,x:ee(c,u)})):u&&p.push(o(p)+"rotate("+u+r)}function i(c,u,p,d){c!==u?d.push({i:p.push(o(p)+"skewX(",null,r)-2,x:ee(c,u)}):u&&p.push(o(p)+"skewX("+u+r)}function l(c,u,p,d,f,h){if(c!==p||u!==d){var k=f.push(o(f)+"scale(",null,",",null,")");h.push({i:k-4,x:ee(c,p)},{i:k-2,x:ee(u,d)})}else(p!==1||d!==1)&&f.push(o(f)+"scale("+p+","+d+")")}return function(c,u){var p=[],d=[];return c=e(c),u=e(u),s(c.translateX,c.translateY,u.translateX,u.translateY,p,d),a(c.rotate,u.rotate,p,d),i(c.skewX,u.skewX,p,d),l(c.scaleX,c.scaleY,u.scaleX,u.scaleY,p,d),c=u=null,function(f){for(var h=-1,k=d.length,q;++h<k;)p[(q=d[h]).i]=q.x(f);return p.join("")}}}var Xt=Vo(Ho,"px, ","px)","deg)"),Gt=Vo(Wo,", ",")",")");var oc=1e-12;function Yo(e){return((e=Math.exp(e))+1/e)/2}function sc(e){return((e=Math.exp(e))-1/e)/2}function ac(e){return((e=Math.exp(2*e))-1)/(e+1)}var Jt=(function e(n,t,r){function o(s,a){var i=s[0],l=s[1],c=s[2],u=a[0],p=a[1],d=a[2],f=u-i,h=p-l,k=f*f+h*h,q,v;if(k<oc)v=Math.log(d/c)/n,q=function(L){return[i+L*f,l+L*h,c*Math.exp(n*L*v)]};else{var E=Math.sqrt(k),C=(d*d-c*c+r*k)/(2*c*t*E),w=(d*d-c*c-r*k)/(2*d*t*E),S=Math.log(Math.sqrt(C*C+1)-C),_=Math.log(Math.sqrt(w*w+1)-w);v=(_-S)/n,q=function(L){var G=L*v,Z=Yo(S),P=c/(t*E)*(Z*ac(n*G+S)-sc(S));return[i+P*f,l+P*h,c*Z/Yo(n*G+S)]}}return q.duration=v*1e3*n/Math.SQRT2,q}return o.rho=function(s){var a=Math.max(.001,+s),i=a*a,l=i*i;return e(a,i,l)},o})(Math.SQRT2,2,4);var We=0,ln=0,un=0,Xo=1e3,nt,dn,tt=0,Me=0,rt=0,pn=typeof performance=="object"&&performance.now?performance:Date,Go=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function fn(){return Me||(Go(ic),Me=pn.now()+rt)}function ic(){Me=0}function mn(){this._call=this._time=this._next=null}mn.prototype=ot.prototype={constructor:mn,restart:function(e,n,t){if(typeof e!="function")throw new TypeError("callback is not a function");t=(t==null?fn():+t)+(n==null?0:+n),!this._next&&dn!==this&&(dn?dn._next=this:nt=this,dn=this),this._call=e,this._time=t,Qt()},stop:function(){this._call&&(this._call=null,this._time=1/0,Qt())}};function ot(e,n,t){var r=new mn;return r.restart(e,n,t),r}function Jo(){fn(),++We;for(var e=nt,n;e;)(n=Me-e._time)>=0&&e._call.call(void 0,n),e=e._next;--We}function Ko(){Me=(tt=pn.now())+rt,We=ln=0;try{Jo()}finally{We=0,uc(),Me=0}}function cc(){var e=pn.now(),n=e-tt;n>Xo&&(rt-=n,tt=e)}function uc(){for(var e,n=nt,t,r=1/0;n;)n._call?(r>n._time&&(r=n._time),e=n,n=n._next):(t=n._next,n._next=null,n=e?e._next=t:nt=t);dn=e,Qt(r)}function Qt(e){if(!We){ln&&(ln=clearTimeout(ln));var n=e-Me;n>24?(e<1/0&&(ln=setTimeout(Ko,e-pn.now()-rt)),un&&(un=clearInterval(un))):(un||(tt=pn.now(),un=setInterval(cc,Xo)),We=1,Go(Ko))}}function st(e,n,t){var r=new mn;return n=n==null?0:+n,r.restart(o=>{r.stop(),e(o+n)},n,t),r}var lc=nn("start","end","cancel","interrupt"),dc=[],es=0,Qo=1,it=2,at=3,Zo=4,ct=5,hn=6;function Ce(e,n,t,r,o,s){var a=e.__transition;if(!a)e.__transition={};else if(t in a)return;pc(e,t,{name:n,index:r,group:o,on:lc,tween:dc,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:es})}function yn(e,n){var t=j(e,n);if(t.state>es)throw new Error("too late; already scheduled");return t}function H(e,n){var t=j(e,n);if(t.state>at)throw new Error("too late; already running");return t}function j(e,n){var t=e.__transition;if(!t||!(t=t[n]))throw new Error("transition not found");return t}function pc(e,n,t){var r=e.__transition,o;r[n]=t,t.timer=ot(s,0,t.time);function s(c){t.state=Qo,t.timer.restart(a,t.delay,t.time),t.delay<=c&&a(c-t.delay)}function a(c){var u,p,d,f;if(t.state!==Qo)return l();for(u in r)if(f=r[u],f.name===t.name){if(f.state===at)return st(a);f.state===Zo?(f.state=hn,f.timer.stop(),f.on.call("interrupt",e,e.__data__,f.index,f.group),delete r[u]):+u<n&&(f.state=hn,f.timer.stop(),f.on.call("cancel",e,e.__data__,f.index,f.group),delete r[u])}if(st(function(){t.state===at&&(t.state=Zo,t.timer.restart(i,t.delay,t.time),i(c))}),t.state=it,t.on.call("start",e,e.__data__,t.index,t.group),t.state===it){for(t.state=at,o=new Array(d=t.tween.length),u=0,p=-1;u<d;++u)(f=t.tween[u].value.call(e,e.__data__,t.index,t.group))&&(o[++p]=f);o.length=p+1}}function i(c){for(var u=c<t.duration?t.ease.call(null,c/t.duration):(t.timer.restart(l),t.state=ct,1),p=-1,d=o.length;++p<d;)o[p].call(e,u);t.state===ct&&(t.on.call("end",e,e.__data__,t.index,t.group),l())}function l(){t.state=hn,t.timer.stop(),delete r[n];for(var c in r)return;delete e.__transition}}function De(e,n){var t=e.__transition,r,o,s=!0,a;if(t){n=n==null?null:n+"";for(a in t){if((r=t[a]).name!==n){s=!1;continue}o=r.state>it&&r.state<ct,r.state=hn,r.timer.stop(),r.on.call(o?"interrupt":"cancel",e,e.__data__,r.index,r.group),delete t[a]}s&&delete e.__transition}}function ns(e){return this.each(function(){De(this,e)})}function mc(e,n){var t,r;return function(){var o=H(this,e),s=o.tween;if(s!==t){r=t=s;for(var a=0,i=r.length;a<i;++a)if(r[a].name===n){r=r.slice(),r.splice(a,1);break}}o.tween=r}}function fc(e,n,t){var r,o;if(typeof t!="function")throw new Error;return function(){var s=H(this,e),a=s.tween;if(a!==r){o=(r=a).slice();for(var i={name:n,value:t},l=0,c=o.length;l<c;++l)if(o[l].name===n){o[l]=i;break}l===c&&o.push(i)}s.tween=o}}function ts(e,n){var t=this._id;if(e+="",arguments.length<2){for(var r=j(this.node(),t).tween,o=0,s=r.length,a;o<s;++o)if((a=r[o]).name===e)return a.value;return null}return this.each((n==null?mc:fc)(t,e,n))}function Ve(e,n,t){var r=e._id;return e.each(function(){var o=H(this,r);(o.value||(o.value={}))[n]=t.apply(this,arguments)}),function(o){return j(o,r).value[n]}}function ut(e,n){var t;return(typeof n=="number"?ee:n instanceof Ee?Qn:(t=Ee(n))?(n=t,Qn):Yt)(e,n)}function hc(e){return function(){this.removeAttribute(e)}}function yc(e){return function(){this.removeAttributeNS(e.space,e.local)}}function vc(e,n,t){var r,o=t+"",s;return function(){var a=this.getAttribute(e);return a===o?null:a===r?s:s=n(r=a,t)}}function xc(e,n,t){var r,o=t+"",s;return function(){var a=this.getAttributeNS(e.space,e.local);return a===o?null:a===r?s:s=n(r=a,t)}}function wc(e,n,t){var r,o,s;return function(){var a,i=t(this),l;return i==null?void this.removeAttribute(e):(a=this.getAttribute(e),l=i+"",a===l?null:a===r&&l===o?s:(o=l,s=n(r=a,i)))}}function gc(e,n,t){var r,o,s;return function(){var a,i=t(this),l;return i==null?void this.removeAttributeNS(e.space,e.local):(a=this.getAttributeNS(e.space,e.local),l=i+"",a===l?null:a===r&&l===o?s:(o=l,s=n(r=a,i)))}}function rs(e,n){var t=fe(e),r=t==="transform"?Gt:ut;return this.attrTween(e,typeof n=="function"?(t.local?gc:wc)(t,r,Ve(this,"attr."+e,n)):n==null?(t.local?yc:hc)(t):(t.local?xc:vc)(t,r,n))}function kc(e,n){return function(t){this.setAttribute(e,n.call(this,t))}}function bc(e,n){return function(t){this.setAttributeNS(e.space,e.local,n.call(this,t))}}function Ec(e,n){var t,r;function o(){var s=n.apply(this,arguments);return s!==r&&(t=(r=s)&&bc(e,s)),t}return o._value=n,o}function Cc(e,n){var t,r;function o(){var s=n.apply(this,arguments);return s!==r&&(t=(r=s)&&kc(e,s)),t}return o._value=n,o}function os(e,n){var t="attr."+e;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;var r=fe(e);return this.tween(t,(r.local?Ec:Cc)(r,n))}function Dc(e,n){return function(){yn(this,e).delay=+n.apply(this,arguments)}}function qc(e,n){return n=+n,function(){yn(this,e).delay=n}}function ss(e){var n=this._id;return arguments.length?this.each((typeof e=="function"?Dc:qc)(n,e)):j(this.node(),n).delay}function Rc(e,n){return function(){H(this,e).duration=+n.apply(this,arguments)}}function Sc(e,n){return n=+n,function(){H(this,e).duration=n}}function as(e){var n=this._id;return arguments.length?this.each((typeof e=="function"?Rc:Sc)(n,e)):j(this.node(),n).duration}function Ic(e,n){if(typeof n!="function")throw new Error;return function(){H(this,e).ease=n}}function is(e){var n=this._id;return arguments.length?this.each(Ic(n,e)):j(this.node(),n).ease}function Tc(e,n){return function(){var t=n.apply(this,arguments);if(typeof t!="function")throw new Error;H(this,e).ease=t}}function cs(e){if(typeof e!="function")throw new Error;return this.each(Tc(this._id,e))}function us(e){typeof e!="function"&&(e=rn(e));for(var n=this._groups,t=n.length,r=new Array(t),o=0;o<t;++o)for(var s=n[o],a=s.length,i=r[o]=[],l,c=0;c<a;++c)(l=s[c])&&e.call(l,l.__data__,c,s)&&i.push(l);return new Y(r,this._parents,this._name,this._id)}function ls(e){if(e._id!==this._id)throw new Error;for(var n=this._groups,t=e._groups,r=n.length,o=t.length,s=Math.min(r,o),a=new Array(r),i=0;i<s;++i)for(var l=n[i],c=t[i],u=l.length,p=a[i]=new Array(u),d,f=0;f<u;++f)(d=l[f]||c[f])&&(p[f]=d);for(;i<r;++i)a[i]=n[i];return new Y(a,this._parents,this._name,this._id)}function _c(e){return(e+"").trim().split(/^|\s+/).every(function(n){var t=n.indexOf(".");return t>=0&&(n=n.slice(0,t)),!n||n==="start"})}function Mc(e,n,t){var r,o,s=_c(n)?yn:H;return function(){var a=s(this,e),i=a.on;i!==r&&(o=(r=i).copy()).on(n,t),a.on=o}}function ds(e,n){var t=this._id;return arguments.length<2?j(this.node(),t).on.on(e):this.each(Mc(t,e,n))}function Bc(e){return function(){var n=this.parentNode;for(var t in this.__transition)if(+t!==e)return;n&&n.removeChild(this)}}function ps(){return this.on("end.remove",Bc(this._id))}function ms(e){var n=this._name,t=this._id;typeof e!="function"&&(e=Ie(e));for(var r=this._groups,o=r.length,s=new Array(o),a=0;a<o;++a)for(var i=r[a],l=i.length,c=s[a]=new Array(l),u,p,d=0;d<l;++d)(u=i[d])&&(p=e.call(u,u.__data__,d,i))&&("__data__"in u&&(p.__data__=u.__data__),c[d]=p,Ce(c[d],n,t,d,c,j(u,t)));return new Y(s,this._parents,n,t)}function fs(e){var n=this._name,t=this._id;typeof e!="function"&&(e=tn(e));for(var r=this._groups,o=r.length,s=[],a=[],i=0;i<o;++i)for(var l=r[i],c=l.length,u,p=0;p<c;++p)if(u=l[p]){for(var d=e.call(u,u.__data__,p,l),f,h=j(u,t),k=0,q=d.length;k<q;++k)(f=d[k])&&Ce(f,n,t,k,d,h);s.push(d),a.push(u)}return new Y(s,a,n,t)}var Pc=he.prototype.constructor;function hs(){return new Pc(this._groups,this._parents)}function Oc(e,n){var t,r,o;return function(){var s=be(this,e),a=(this.style.removeProperty(e),be(this,e));return s===a?null:s===t&&a===r?o:o=n(t=s,r=a)}}function ys(e){return function(){this.style.removeProperty(e)}}function Ac(e,n,t){var r,o=t+"",s;return function(){var a=be(this,e);return a===o?null:a===r?s:s=n(r=a,t)}}function Lc(e,n,t){var r,o,s;return function(){var a=be(this,e),i=t(this),l=i+"";return i==null&&(l=i=(this.style.removeProperty(e),be(this,e))),a===l?null:a===r&&l===o?s:(o=l,s=n(r=a,i))}}function Nc(e,n){var t,r,o,s="style."+n,a="end."+s,i;return function(){var l=H(this,e),c=l.on,u=l.value[s]==null?i||(i=ys(n)):void 0;(c!==t||o!==u)&&(r=(t=c).copy()).on(a,o=u),l.on=r}}function vs(e,n,t){var r=(e+="")=="transform"?Xt:ut;return n==null?this.styleTween(e,Oc(e,r)).on("end.style."+e,ys(e)):typeof n=="function"?this.styleTween(e,Lc(e,r,Ve(this,"style."+e,n))).each(Nc(this._id,e)):this.styleTween(e,Ac(e,r,n),t).on("end.style."+e,null)}function Fc(e,n,t){return function(r){this.style.setProperty(e,n.call(this,r),t)}}function jc(e,n,t){var r,o;function s(){var a=n.apply(this,arguments);return a!==o&&(r=(o=a)&&Fc(e,a,t)),r}return s._value=n,s}function xs(e,n,t){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(n==null)return this.tween(r,null);if(typeof n!="function")throw new Error;return this.tween(r,jc(e,n,t??""))}function zc(e){return function(){this.textContent=e}}function $c(e){return function(){var n=e(this);this.textContent=n??""}}function ws(e){return this.tween("text",typeof e=="function"?$c(Ve(this,"text",e)):zc(e==null?"":e+""))}function Uc(e){return function(n){this.textContent=e.call(this,n)}}function Hc(e){var n,t;function r(){var o=e.apply(this,arguments);return o!==t&&(n=(t=o)&&Uc(o)),n}return r._value=e,r}function gs(e){var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;return this.tween(n,Hc(e))}function ks(){for(var e=this._name,n=this._id,t=lt(),r=this._groups,o=r.length,s=0;s<o;++s)for(var a=r[s],i=a.length,l,c=0;c<i;++c)if(l=a[c]){var u=j(l,n);Ce(l,e,t,c,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new Y(r,this._parents,e,t)}function bs(){var e,n,t=this,r=t._id,o=t.size();return new Promise(function(s,a){var i={value:a},l={value:function(){--o===0&&s()}};t.each(function(){var c=H(this,r),u=c.on;u!==e&&(n=(e=u).copy(),n._.cancel.push(i),n._.interrupt.push(i),n._.end.push(l)),c.on=n}),o===0&&s()})}var Wc=0;function Y(e,n,t,r){this._groups=e,this._parents=n,this._name=t,this._id=r}function Es(e){return he().transition(e)}function lt(){return++Wc}var ve=he.prototype;Y.prototype=Es.prototype={constructor:Y,select:ms,selectAll:fs,selectChild:ve.selectChild,selectChildren:ve.selectChildren,filter:us,merge:ls,selection:hs,transition:ks,call:ve.call,nodes:ve.nodes,node:ve.node,size:ve.size,empty:ve.empty,each:ve.each,on:ds,attr:rs,attrTween:os,style:vs,styleTween:xs,text:ws,textTween:gs,remove:ps,tween:ts,delay:ss,duration:as,ease:is,easeVarying:cs,end:bs,[Symbol.iterator]:ve[Symbol.iterator]};var Zt=e=>+e;function Ye(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var Cs=Math.PI,jf=Cs/2;function dt(e){return(1-Math.cos(Cs*e))/2}var Vc={time:null,delay:0,duration:250,ease:Ye};function Yc(e,n){for(var t;!(t=e.__transition)||!(t=t[n]);)if(!(e=e.parentNode))throw new Error(`transition ${n} not found`);return t}function Ds(e){var n,t;e instanceof Y?(n=e._id,e=e._name):(n=lt(),(t=Vc).time=fn(),e=e==null?null:e+"");for(var r=this._groups,o=r.length,s=0;s<o;++s)for(var a=r[s],i=a.length,l,c=0;c<i;++c)(l=a[c])&&Ce(l,e,n,c,a,t||Yc(l,n));return new Y(r,this._parents,e,n)}he.prototype.interrupt=ns;he.prototype.transition=Ds;var{abs:xh,max:wh,min:gh}=Math;function qs(e){return[+e[0],+e[1]]}function Kc(e){return[qs(e[0]),qs(e[1])]}var kh={name:"x",handles:["w","e"].map(er),input:function(e,n){return e==null?null:[[+e[0],n[0][1]],[+e[1],n[1][1]]]},output:function(e){return e&&[e[0][0],e[1][0]]}},bh={name:"y",handles:["n","s"].map(er),input:function(e,n){return e==null?null:[[n[0][0],+e[0]],[n[1][0],+e[1]]]},output:function(e){return e&&[e[0][1],e[1][1]]}},Eh={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(er),input:function(e){return e==null?null:Kc(e)},output:function(e){return e}};function er(e){return{type:e}}var nr=Math.PI,tr=2*nr,Be=1e-6,Xc=tr-Be;function Rs(e){this._+=e[0];for(let n=1,t=e.length;n<t;++n)this._+=arguments[n]+e[n]}function Gc(e){let n=Math.floor(e);if(!(n>=0))throw new Error(`invalid digits: ${e}`);if(n>15)return Rs;let t=10**n;return function(r){this._+=r[0];for(let o=1,s=r.length;o<s;++o)this._+=Math.round(arguments[o]*t)/t+r[o]}}var Pe=class{constructor(n){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=n==null?Rs:Gc(n)}moveTo(n,t){this._append`M${this._x0=this._x1=+n},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(n,t){this._append`L${this._x1=+n},${this._y1=+t}`}quadraticCurveTo(n,t,r,o){this._append`Q${+n},${+t},${this._x1=+r},${this._y1=+o}`}bezierCurveTo(n,t,r,o,s,a){this._append`C${+n},${+t},${+r},${+o},${this._x1=+s},${this._y1=+a}`}arcTo(n,t,r,o,s){if(n=+n,t=+t,r=+r,o=+o,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,i=this._y1,l=r-n,c=o-t,u=a-n,p=i-t,d=u*u+p*p;if(this._x1===null)this._append`M${this._x1=n},${this._y1=t}`;else if(d>Be)if(!(Math.abs(p*l-c*u)>Be)||!s)this._append`L${this._x1=n},${this._y1=t}`;else{let f=r-a,h=o-i,k=l*l+c*c,q=f*f+h*h,v=Math.sqrt(k),E=Math.sqrt(d),C=s*Math.tan((nr-Math.acos((k+d-q)/(2*v*E)))/2),w=C/E,S=C/v;Math.abs(w-1)>Be&&this._append`L${n+w*u},${t+w*p}`,this._append`A${s},${s},0,0,${+(p*f>u*h)},${this._x1=n+S*l},${this._y1=t+S*c}`}}arc(n,t,r,o,s,a){if(n=+n,t=+t,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let i=r*Math.cos(o),l=r*Math.sin(o),c=n+i,u=t+l,p=1^a,d=a?o-s:s-o;this._x1===null?this._append`M${c},${u}`:(Math.abs(this._x1-c)>Be||Math.abs(this._y1-u)>Be)&&this._append`L${c},${u}`,r&&(d<0&&(d=d%tr+tr),d>Xc?this._append`A${r},${r},0,1,${p},${n-i},${t-l}A${r},${r},0,1,${p},${this._x1=c},${this._y1=u}`:d>Be&&this._append`A${r},${r},0,${+(d>=nr)},${p},${this._x1=n+r*Math.cos(s)},${this._y1=t+r*Math.sin(s)}`)}rect(n,t,r,o){this._append`M${this._x0=this._x1=+n},${this._y0=this._y1=+t}h${r=+r}v${+o}h${-r}Z`}toString(){return this._}};function Ss(){return new Pe}Ss.prototype=Pe.prototype;var Jc=Array.prototype,Is=Jc.slice;function Ts(e,n){return e-n}function _s(e){for(var n=0,t=e.length,r=e[t-1][1]*e[0][0]-e[t-1][0]*e[0][1];++n<t;)r+=e[n-1][1]*e[n][0]-e[n-1][0]*e[n][1];return r}var rr=e=>()=>e;function Ms(e,n){for(var t=-1,r=n.length,o;++t<r;)if(o=Qc(e,n[t]))return o;return 0}function Qc(e,n){for(var t=n[0],r=n[1],o=-1,s=0,a=e.length,i=a-1;s<a;i=s++){var l=e[s],c=l[0],u=l[1],p=e[i],d=p[0],f=p[1];if(Zc(l,p,n))return 0;u>r!=f>r&&t<(d-c)*(r-u)/(f-u)+c&&(o=-o)}return o}function Zc(e,n,t){var r;return eu(e,n,t)&&nu(e[r=+(e[0]===n[0])],t[r],n[r])}function eu(e,n,t){return(n[0]-e[0])*(t[1]-e[1])===(t[0]-e[0])*(n[1]-e[1])}function nu(e,n,t){return e<=n&&n<=t||t<=n&&n<=e}function Bs(){}var xe=[[],[[[1,1.5],[.5,1]]],[[[1.5,1],[1,1.5]]],[[[1.5,1],[.5,1]]],[[[1,.5],[1.5,1]]],[[[1,1.5],[.5,1]],[[1,.5],[1.5,1]]],[[[1,.5],[1,1.5]]],[[[1,.5],[.5,1]]],[[[.5,1],[1,.5]]],[[[1,1.5],[1,.5]]],[[[.5,1],[1,.5]],[[1.5,1],[1,1.5]]],[[[1.5,1],[1,.5]]],[[[.5,1],[1.5,1]]],[[[1,1.5],[1.5,1]]],[[[.5,1],[1,1.5]]],[]];function sr(){var e=1,n=1,t=On,r=l;function o(c){var u=t(c);if(Array.isArray(u))u=u.slice().sort(Ts);else{let p=_n(c,tu);for(u=Bn(...Pn(p[0],p[1],u),u);u[u.length-1]>=p[1];)u.pop();for(;u[1]<p[0];)u.shift()}return u.map(p=>s(c,p))}function s(c,u){let p=u==null?NaN:+u;if(isNaN(p))throw new Error(`invalid value: ${u}`);var d=[],f=[];return a(c,p,function(h){r(h,c,p),_s(h)>0?d.push([h]):f.push(h)}),f.forEach(function(h){for(var k=0,q=d.length,v;k<q;++k)if(Ms((v=d[k])[0],h)!==-1){v.push(h);return}}),{type:"MultiPolygon",value:u,coordinates:d}}function a(c,u,p){var d=new Array,f=new Array,h,k,q,v,E,C;for(h=k=-1,v=Oe(c[0],u),xe[v<<1].forEach(w);++h<e-1;)q=v,v=Oe(c[h+1],u),xe[q|v<<1].forEach(w);for(xe[v<<0].forEach(w);++k<n-1;){for(h=-1,v=Oe(c[k*e+e],u),E=Oe(c[k*e],u),xe[v<<1|E<<2].forEach(w);++h<e-1;)q=v,v=Oe(c[k*e+e+h+1],u),C=E,E=Oe(c[k*e+h+1],u),xe[q|v<<1|E<<2|C<<3].forEach(w);xe[v|E<<3].forEach(w)}for(h=-1,E=c[k*e]>=u,xe[E<<2].forEach(w);++h<e-1;)C=E,E=Oe(c[k*e+h+1],u),xe[E<<2|C<<3].forEach(w);xe[E<<3].forEach(w);function w(S){var _=[S[0][0]+h,S[0][1]+k],L=[S[1][0]+h,S[1][1]+k],G=i(_),Z=i(L),P,W;(P=f[G])?(W=d[Z])?(delete f[P.end],delete d[W.start],P===W?(P.ring.push(L),p(P.ring)):d[P.start]=f[W.end]={start:P.start,end:W.end,ring:P.ring.concat(W.ring)}):(delete f[P.end],P.ring.push(L),f[P.end=Z]=P):(P=d[Z])?(W=f[G])?(delete d[P.start],delete f[W.end],P===W?(P.ring.push(L),p(P.ring)):d[W.start]=f[P.end]={start:W.start,end:P.end,ring:W.ring.concat(P.ring)}):(delete d[P.start],P.ring.unshift(_),d[P.start=G]=P):d[G]=f[Z]={start:G,end:Z,ring:[_,L]}}}function i(c){return c[0]*2+c[1]*(e+1)*4}function l(c,u,p){c.forEach(function(d){var f=d[0],h=d[1],k=f|0,q=h|0,v=or(u[q*e+k]);f>0&&f<e&&k===f&&(d[0]=Ps(f,or(u[q*e+k-1]),v,p)),h>0&&h<n&&q===h&&(d[1]=Ps(h,or(u[(q-1)*e+k]),v,p))})}return o.contour=s,o.size=function(c){if(!arguments.length)return[e,n];var u=Math.floor(c[0]),p=Math.floor(c[1]);if(!(u>=0&&p>=0))throw new Error("invalid size");return e=u,n=p,o},o.thresholds=function(c){return arguments.length?(t=typeof c=="function"?c:Array.isArray(c)?rr(Is.call(c)):rr(c),o):t},o.smooth=function(c){return arguments.length?(r=c?l:Bs,o):r===l},o}function tu(e){return isFinite(e)?e:NaN}function Oe(e,n){return e==null?!1:+e>=n}function or(e){return e==null||isNaN(e=+e)?-1/0:e}function Ps(e,n,t,r){let o=r-n,s=t-n,a=isFinite(o)||isFinite(s)?o/s:Math.sign(o)/Math.sign(s);return isNaN(a)?e:e+a-.5}var we=1e-6;var vn=Math.PI,Jh=vn/2,Qh=vn/4,Os=vn*2,As=180/vn,Ls=vn/180,ge=Math.abs;var Ns=Math.cos;var Fs=Math.sin;var xn=Math.sqrt;function $(){}function pt(e,n){e&&zs.hasOwnProperty(e.type)&&zs[e.type](e,n)}var js={Feature:function(e,n){pt(e.geometry,n)},FeatureCollection:function(e,n){for(var t=e.features,r=-1,o=t.length;++r<o;)pt(t[r].geometry,n)}},zs={Sphere:function(e,n){n.sphere()},Point:function(e,n){e=e.coordinates,n.point(e[0],e[1],e[2])},MultiPoint:function(e,n){for(var t=e.coordinates,r=-1,o=t.length;++r<o;)e=t[r],n.point(e[0],e[1],e[2])},LineString:function(e,n){ar(e.coordinates,n,0)},MultiLineString:function(e,n){for(var t=e.coordinates,r=-1,o=t.length;++r<o;)ar(t[r],n,0)},Polygon:function(e,n){$s(e.coordinates,n)},MultiPolygon:function(e,n){for(var t=e.coordinates,r=-1,o=t.length;++r<o;)$s(t[r],n)},GeometryCollection:function(e,n){for(var t=e.geometries,r=-1,o=t.length;++r<o;)pt(t[r],n)}};function ar(e,n,t){var r=-1,o=e.length-t,s;for(n.lineStart();++r<o;)s=e[r],n.point(s[0],s[1],s[2]);n.lineEnd()}function $s(e,n){var t=-1,r=e.length;for(n.polygonStart();++t<r;)ar(e[t],n,1);n.polygonEnd()}function qe(e,n){e&&js.hasOwnProperty(e.type)?js[e.type](e,n):pt(e,n)}function Us(){var e=[],n;return{point:function(t,r,o){n.push([t,r,o])},lineStart:function(){e.push(n=[])},lineEnd:$,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var t=e;return e=[],n=null,t}}}function Hs(e,n){return ge(e[0]-n[0])<we&&ge(e[1]-n[1])<we}function mt(e,n,t,r){this.x=e,this.z=n,this.o=t,this.e=r,this.v=!1,this.n=this.p=null}function Vs(e,n,t,r,o){var s=[],a=[],i,l;if(e.forEach(function(h){if(!((k=h.length-1)<=0)){var k,q=h[0],v=h[k],E;if(Hs(q,v)){if(!q[2]&&!v[2]){for(o.lineStart(),i=0;i<k;++i)o.point((q=h[i])[0],q[1]);o.lineEnd();return}v[0]+=2*we}s.push(E=new mt(q,h,null,!0)),a.push(E.o=new mt(q,null,E,!1)),s.push(E=new mt(v,h,null,!1)),a.push(E.o=new mt(v,null,E,!0))}}),!!s.length){for(a.sort(n),Ws(s),Ws(a),i=0,l=a.length;i<l;++i)a[i].e=t=!t;for(var c=s[0],u,p;;){for(var d=c,f=!0;d.v;)if((d=d.n)===c)return;u=d.z,o.lineStart();do{if(d.v=d.o.v=!0,d.e){if(f)for(i=0,l=u.length;i<l;++i)o.point((p=u[i])[0],p[1]);else r(d.x,d.n.x,1,o);d=d.n}else{if(f)for(u=d.p.z,i=u.length-1;i>=0;--i)o.point((p=u[i])[0],p[1]);else r(d.x,d.p.x,-1,o);d=d.p}d=d.o,u=d.z,f=!f}while(!d.v);o.lineEnd()}}}function Ws(e){if(n=e.length){for(var n,t=0,r=e[0],o;++t<n;)r.n=o=e[t],o.p=r,r=o;r.n=o=e[0],o.p=r}}function Ys(e,n,t,r,o,s){var a=e[0],i=e[1],l=n[0],c=n[1],u=0,p=1,d=l-a,f=c-i,h;if(h=t-a,!(!d&&h>0)){if(h/=d,d<0){if(h<u)return;h<p&&(p=h)}else if(d>0){if(h>p)return;h>u&&(u=h)}if(h=o-a,!(!d&&h<0)){if(h/=d,d<0){if(h>p)return;h>u&&(u=h)}else if(d>0){if(h<u)return;h<p&&(p=h)}if(h=r-i,!(!f&&h>0)){if(h/=f,f<0){if(h<u)return;h<p&&(p=h)}else if(f>0){if(h>p)return;h>u&&(u=h)}if(h=s-i,!(!f&&h<0)){if(h/=f,f<0){if(h>p)return;h>u&&(u=h)}else if(f>0){if(h<u)return;h<p&&(p=h)}return u>0&&(e[0]=a+u*d,e[1]=i+u*f),p<1&&(n[0]=a+p*d,n[1]=i+p*f),!0}}}}}var wn=1e9,ft=-wn;function ir(e,n,t,r){function o(c,u){return e<=c&&c<=t&&n<=u&&u<=r}function s(c,u,p,d){var f=0,h=0;if(c==null||(f=a(c,p))!==(h=a(u,p))||l(c,u)<0^p>0)do d.point(f===0||f===3?e:t,f>1?r:n);while((f=(f+p+4)%4)!==h);else d.point(u[0],u[1])}function a(c,u){return ge(c[0]-e)<we?u>0?0:3:ge(c[0]-t)<we?u>0?2:1:ge(c[1]-n)<we?u>0?1:0:u>0?3:2}function i(c,u){return l(c.x,u.x)}function l(c,u){var p=a(c,1),d=a(u,1);return p!==d?p-d:p===0?u[1]-c[1]:p===1?c[0]-u[0]:p===2?c[1]-u[1]:u[0]-c[0]}return function(c){var u=c,p=Us(),d,f,h,k,q,v,E,C,w,S,_,L={point:G,lineStart:Tt,lineEnd:_t,polygonStart:P,polygonEnd:W};function G(x,y){o(x,y)&&u.point(x,y)}function Z(){for(var x=0,y=0,g=f.length;y<g;++y)for(var D=f[y],R=1,I=D.length,B=D[0],A,U,N=B[0],z=B[1];R<I;++R)A=N,U=z,B=D[R],N=B[0],z=B[1],U<=r?z>r&&(N-A)*(r-U)>(z-U)*(e-A)&&++x:z<=r&&(N-A)*(r-U)<(z-U)*(e-A)&&--x;return x}function P(){u=p,d=[],f=[],_=!0}function W(){var x=Z(),y=_&&x,g=(d=Ln(d)).length;(y||g)&&(c.polygonStart(),y&&(c.lineStart(),s(null,null,1,c),c.lineEnd()),g&&Vs(d,i,x,s,c),c.polygonEnd()),u=c,d=f=h=null}function Tt(){L.point=m,f&&f.push(h=[]),S=!0,w=!1,E=C=NaN}function _t(){d&&(m(k,q),v&&w&&p.rejoin(),d.push(p.result())),L.point=G,w&&u.lineEnd()}function m(x,y){var g=o(x,y);if(f&&h.push([x,y]),S)k=x,q=y,v=g,S=!1,g&&(u.lineStart(),u.point(x,y));else if(g&&w)u.point(x,y);else{var D=[E=Math.max(ft,Math.min(wn,E)),C=Math.max(ft,Math.min(wn,C))],R=[x=Math.max(ft,Math.min(wn,x)),y=Math.max(ft,Math.min(wn,y))];Ys(D,R,e,n,t,r)?(w||(u.lineStart(),u.point(D[0],D[1])),u.point(R[0],R[1]),g||u.lineEnd(),_=!1):g&&(u.lineStart(),u.point(x,y),_=!1)}E=x,C=y,w=g}return L}}var gn=e=>e;var cr=new re,ur=new re,Ks,Xs,lr,dr,Re={point:$,lineStart:$,lineEnd:$,polygonStart:function(){Re.lineStart=ru,Re.lineEnd=su},polygonEnd:function(){Re.lineStart=Re.lineEnd=Re.point=$,cr.add(ge(ur)),ur=new re},result:function(){var e=cr/2;return cr=new re,e}};function ru(){Re.point=ou}function ou(e,n){Re.point=Gs,Ks=lr=e,Xs=dr=n}function Gs(e,n){ur.add(dr*e-lr*n),lr=e,dr=n}function su(){Gs(Ks,Xs)}var pr=Re;var Ke=1/0,ht=Ke,kn=-Ke,yt=kn,au={point:iu,lineStart:$,lineEnd:$,polygonStart:$,polygonEnd:$,result:function(){var e=[[Ke,ht],[kn,yt]];return kn=yt=-(ht=Ke=1/0),e}};function iu(e,n){e<Ke&&(Ke=e),e>kn&&(kn=e),n<ht&&(ht=n),n>yt&&(yt=n)}var Xe=au;var mr=0,fr=0,bn=0,vt=0,xt=0,Ge=0,hr=0,yr=0,En=0,Zs,ea,ce,ue,se={point:Ae,lineStart:Js,lineEnd:Qs,polygonStart:function(){se.lineStart=lu,se.lineEnd=du},polygonEnd:function(){se.point=Ae,se.lineStart=Js,se.lineEnd=Qs},result:function(){var e=En?[hr/En,yr/En]:Ge?[vt/Ge,xt/Ge]:bn?[mr/bn,fr/bn]:[NaN,NaN];return mr=fr=bn=vt=xt=Ge=hr=yr=En=0,e}};function Ae(e,n){mr+=e,fr+=n,++bn}function Js(){se.point=cu}function cu(e,n){se.point=uu,Ae(ce=e,ue=n)}function uu(e,n){var t=e-ce,r=n-ue,o=xn(t*t+r*r);vt+=o*(ce+e)/2,xt+=o*(ue+n)/2,Ge+=o,Ae(ce=e,ue=n)}function Qs(){se.point=Ae}function lu(){se.point=pu}function du(){na(Zs,ea)}function pu(e,n){se.point=na,Ae(Zs=ce=e,ea=ue=n)}function na(e,n){var t=e-ce,r=n-ue,o=xn(t*t+r*r);vt+=o*(ce+e)/2,xt+=o*(ue+n)/2,Ge+=o,o=ue*e-ce*n,hr+=o*(ce+e),yr+=o*(ue+n),En+=o*3,Ae(ce=e,ue=n)}var vr=se;function wt(e){this._context=e}wt.prototype={_radius:4.5,pointRadius:function(e){return this._radius=e,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(e,n){switch(this._point){case 0:{this._context.moveTo(e,n),this._point=1;break}case 1:{this._context.lineTo(e,n);break}default:{this._context.moveTo(e+this._radius,n),this._context.arc(e,n,this._radius,0,Os);break}}},result:$};var wr=new re,xr,ta,ra,Cn,Dn,gt={point:$,lineStart:function(){gt.point=mu},lineEnd:function(){xr&&oa(ta,ra),gt.point=$},polygonStart:function(){xr=!0},polygonEnd:function(){xr=null},result:function(){var e=+wr;return wr=new re,e}};function mu(e,n){gt.point=oa,ta=Cn=e,ra=Dn=n}function oa(e,n){Cn-=e,Dn-=n,wr.add(xn(Cn*Cn+Dn*Dn)),Cn=e,Dn=n}var gr=gt;var sa,kt,aa,ia,Je=class{constructor(n){this._append=n==null?ca:fu(n),this._radius=4.5,this._=""}pointRadius(n){return this._radius=+n,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(n,t){switch(this._point){case 0:{this._append`M${n},${t}`,this._point=1;break}case 1:{this._append`L${n},${t}`;break}default:{if(this._append`M${n},${t}`,this._radius!==aa||this._append!==kt){let r=this._radius,o=this._;this._="",this._append`m0,${r}a${r},${r} 0 1,1 0,${-2*r}a${r},${r} 0 1,1 0,${2*r}z`,aa=r,kt=this._append,ia=this._,this._=o}this._+=ia;break}}}result(){let n=this._;return this._="",n.length?n:null}};function ca(e){let n=1;this._+=e[0];for(let t=e.length;n<t;++n)this._+=arguments[n]+e[n]}function fu(e){let n=Math.floor(e);if(!(n>=0))throw new RangeError(`invalid digits: ${e}`);if(n>15)return ca;if(n!==sa){let t=10**n;sa=n,kt=function(o){let s=1;this._+=o[0];for(let a=o.length;s<a;++s)this._+=Math.round(arguments[s]*t)/t+o[s]}}return kt}function kr(e,n){let t=3,r=4.5,o,s;function a(i){return i&&(typeof r=="function"&&s.pointRadius(+r.apply(this,arguments)),qe(i,o(s))),s.result()}return a.area=function(i){return qe(i,o(pr)),pr.result()},a.measure=function(i){return qe(i,o(gr)),gr.result()},a.bounds=function(i){return qe(i,o(Xe)),Xe.result()},a.centroid=function(i){return qe(i,o(vr)),vr.result()},a.projection=function(i){return arguments.length?(o=i==null?(e=null,gn):(e=i).stream,a):e},a.context=function(i){return arguments.length?(s=i==null?(n=null,new Je(t)):new wt(n=i),typeof r!="function"&&s.pointRadius(r),a):n},a.pointRadius=function(i){return arguments.length?(r=typeof i=="function"?i:(s.pointRadius(+i),+i),a):r},a.digits=function(i){if(!arguments.length)return t;if(i==null)t=null;else{let l=Math.floor(i);if(!(l>=0))throw new RangeError(`invalid digits: ${i}`);t=l}return n===null&&(s=new Je(t)),a},a.projection(e).digits(t).context(n)}function ua(e){return function(n){var t=new br;for(var r in e)t[r]=e[r];return t.stream=n,t}}function br(){}br.prototype={constructor:br,point:function(e,n){this.stream.point(e,n)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Er(e,n,t){var r=e.clipExtent&&e.clipExtent();return e.scale(150).translate([0,0]),r!=null&&e.clipExtent(null),qe(t,e.stream(Xe)),n(Xe.result()),r!=null&&e.clipExtent(r),e}function Cr(e,n,t){return Er(e,function(r){var o=n[1][0]-n[0][0],s=n[1][1]-n[0][1],a=Math.min(o/(r[1][0]-r[0][0]),s/(r[1][1]-r[0][1])),i=+n[0][0]+(o-a*(r[1][0]+r[0][0]))/2,l=+n[0][1]+(s-a*(r[1][1]+r[0][1]))/2;e.scale(150*a).translate([i,l])},t)}function la(e,n,t){return Cr(e,[[0,0],n],t)}function da(e,n,t){return Er(e,function(r){var o=+n,s=o/(r[1][0]-r[0][0]),a=(o-s*(r[1][0]+r[0][0]))/2,i=-s*r[0][1];e.scale(150*s).translate([a,i])},t)}function pa(e,n,t){return Er(e,function(r){var o=+n,s=o/(r[1][1]-r[0][1]),a=-s*r[0][0],i=(o-s*(r[1][1]+r[0][1]))/2;e.scale(150*s).translate([a,i])},t)}function Dr(){var e=1,n=0,t=0,r=1,o=1,s=0,a,i,l=null,c,u,p,d=1,f=1,h=ua({point:function(w,S){var _=C([w,S]);this.stream.point(_[0],_[1])}}),k=gn,q,v;function E(){return d=e*r,f=e*o,q=v=null,C}function C(w){var S=w[0]*d,_=w[1]*f;if(s){var L=_*a-S*i;S=S*a+_*i,_=L}return[S+n,_+t]}return C.invert=function(w){var S=w[0]-n,_=w[1]-t;if(s){var L=_*a+S*i;S=S*a-_*i,_=L}return[S/d,_/f]},C.stream=function(w){return q&&v===w?q:q=h(k(v=w))},C.postclip=function(w){return arguments.length?(k=w,l=c=u=p=null,E()):k},C.clipExtent=function(w){return arguments.length?(k=w==null?(l=c=u=p=null,gn):ir(l=+w[0][0],c=+w[0][1],u=+w[1][0],p=+w[1][1]),E()):l==null?null:[[l,c],[u,p]]},C.scale=function(w){return arguments.length?(e=+w,E()):e},C.translate=function(w){return arguments.length?(n=+w[0],t=+w[1],E()):[n,t]},C.angle=function(w){return arguments.length?(s=w%360*Ls,i=Fs(s),a=Ns(s),E()):s*As},C.reflectX=function(w){return arguments.length?(r=w?-1:1,E()):r<0},C.reflectY=function(w){return arguments.length?(o=w?-1:1,E()):o<0},C.fitExtent=function(w,S){return Cr(C,w,S)},C.fitSize=function(w,S){return la(C,w,S)},C.fitWidth=function(w,S){return da(C,w,S)},C.fitHeight=function(w,S){return pa(C,w,S)},C}function Le(e){return function(){return e}}var qr=1e-12,ma=Math.PI,tv=ma/2,rv=2*ma;function fa(e){let n=3;return e.digits=function(t){if(!arguments.length)return n;if(t==null)n=null;else{let r=Math.floor(t);if(!(r>=0))throw new RangeError(`invalid digits: ${t}`);n=r}return e},()=>new Pe(n)}var iv=Array.prototype.slice;function ha(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function ya(e){this._context=e}ya.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,n){switch(e=+e,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,n):this._context.moveTo(e,n);break;case 1:this._point=2;default:this._context.lineTo(e,n);break}}};function va(e){return new ya(e)}function xa(e){return e[0]}function wa(e){return e[1]}function bt(e,n){var t=Le(!0),r=null,o=va,s=null,a=fa(i);e=typeof e=="function"?e:e===void 0?xa:Le(e),n=typeof n=="function"?n:n===void 0?wa:Le(n);function i(l){var c,u=(l=ha(l)).length,p,d=!1,f;for(r==null&&(s=o(f=a())),c=0;c<=u;++c)!(c<u&&t(p=l[c],c,l))===d&&((d=!d)?s.lineStart():s.lineEnd()),d&&s.point(+e(p,c,l),+n(p,c,l));if(f)return s=null,f+""||null}return i.x=function(l){return arguments.length?(e=typeof l=="function"?l:Le(+l),i):e},i.y=function(l){return arguments.length?(n=typeof l=="function"?l:Le(+l),i):n},i.defined=function(l){return arguments.length?(t=typeof l=="function"?l:Le(!!l),i):t},i.curve=function(l){return arguments.length?(o=l,r!=null&&(s=o(r)),i):o},i.context=function(l){return arguments.length?(l==null?r=s=null:s=o(r=l),i):r},i}function ga(e,n,t){e._context.bezierCurveTo((2*e._x0+e._x1)/3,(2*e._y0+e._y1)/3,(e._x0+2*e._x1)/3,(e._y0+2*e._y1)/3,(e._x0+4*e._x1+n)/6,(e._y0+4*e._y1+t)/6)}function ka(e){this._context=e}ka.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:ga(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,n){switch(e=+e,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,n):this._context.moveTo(e,n);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:ga(this,e,n);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=n}};function Rr(e){return new ka(e)}function ba(e,n,t){e._context.bezierCurveTo(e._x1+e._k*(e._x2-e._x0),e._y1+e._k*(e._y2-e._y0),e._x2+e._k*(e._x1-n),e._y2+e._k*(e._y1-t),e._x2,e._y2)}function Et(e,n){this._context=e,this._k=(1-n)/6}Et.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:ba(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,n){switch(e=+e,n=+n,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,n):this._context.moveTo(e,n);break;case 1:this._point=2,this._x1=e,this._y1=n;break;case 2:this._point=3;default:ba(this,e,n);break}this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var xv=(function e(n){function t(r){return new Et(r,n)}return t.tension=function(r){return e(+r)},t})(0);function hu(e,n,t){var r=e._x1,o=e._y1,s=e._x2,a=e._y2;if(e._l01_a>qr){var i=2*e._l01_2a+3*e._l01_a*e._l12_a+e._l12_2a,l=3*e._l01_a*(e._l01_a+e._l12_a);r=(r*i-e._x0*e._l12_2a+e._x2*e._l01_2a)/l,o=(o*i-e._y0*e._l12_2a+e._y2*e._l01_2a)/l}if(e._l23_a>qr){var c=2*e._l23_2a+3*e._l23_a*e._l12_a+e._l12_2a,u=3*e._l23_a*(e._l23_a+e._l12_a);s=(s*c+e._x1*e._l23_2a-n*e._l12_2a)/u,a=(a*c+e._y1*e._l23_2a-t*e._l12_2a)/u}e._context.bezierCurveTo(r,o,s,a,e._x2,e._y2)}function Ea(e,n){this._context=e,this._alpha=n}Ea.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,n){if(e=+e,n=+n,this._point){var t=this._x2-e,r=this._y2-n;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(t*t+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,n):this._context.moveTo(e,n);break;case 1:this._point=2;break;case 2:this._point=3;default:hu(this,e,n);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=n}};var Sr=(function e(n){function t(r){return n?new Ea(r,n):new Et(r,0)}return t.alpha=function(r){return e(+r)},t})(.5);var qn=e=>()=>e;function Ir(e,{sourceEvent:n,target:t,transform:r,dispatch:o}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},target:{value:t,enumerable:!0,configurable:!0},transform:{value:r,enumerable:!0,configurable:!0},_:{value:o}})}function ae(e,n,t){this.k=e,this.x=n,this.y=t}ae.prototype={constructor:ae,scale:function(e){return e===1?this:new ae(this.k*e,this.x,this.y)},translate:function(e,n){return e===0&n===0?this:new ae(this.k,this.x+this.k*e,this.y+this.k*n)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Se=new ae(1,0,0);Tr.prototype=ae.prototype;function Tr(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Se;return e.__zoom}function Ct(e){e.stopImmediatePropagation()}function Qe(e){e.preventDefault(),e.stopImmediatePropagation()}function yu(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function vu(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function Ca(){return this.__zoom||Se}function xu(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function wu(){return navigator.maxTouchPoints||"ontouchstart"in this}function gu(e,n,t){var r=e.invertX(n[0][0])-t[0][0],o=e.invertX(n[1][0])-t[1][0],s=e.invertY(n[0][1])-t[0][1],a=e.invertY(n[1][1])-t[1][1];return e.translate(o>r?(r+o)/2:Math.min(0,r)||Math.max(0,o),a>s?(s+a)/2:Math.min(0,s)||Math.max(0,a))}function _r(){var e=yu,n=vu,t=gu,r=xu,o=wu,s=[0,1/0],a=[[-1/0,-1/0],[1/0,1/0]],i=250,l=Jt,c=nn("start","zoom","end"),u,p,d,f=500,h=150,k=0,q=10;function v(m){m.property("__zoom",Ca).on("wheel.zoom",G,{passive:!1}).on("mousedown.zoom",Z).on("dblclick.zoom",P).filter(o).on("touchstart.zoom",W).on("touchmove.zoom",Tt).on("touchend.zoom touchcancel.zoom",_t).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}v.transform=function(m,x,y,g){var D=m.selection?m.selection():m;D.property("__zoom",Ca),m!==D?S(m,x,y,g):D.interrupt().each(function(){_(this,arguments).event(g).start().zoom(null,typeof x=="function"?x.apply(this,arguments):x).end()})},v.scaleBy=function(m,x,y,g){v.scaleTo(m,function(){var D=this.__zoom.k,R=typeof x=="function"?x.apply(this,arguments):x;return D*R},y,g)},v.scaleTo=function(m,x,y,g){v.transform(m,function(){var D=n.apply(this,arguments),R=this.__zoom,I=y==null?w(D):typeof y=="function"?y.apply(this,arguments):y,B=R.invert(I),A=typeof x=="function"?x.apply(this,arguments):x;return t(C(E(R,A),I,B),D,a)},y,g)},v.translateBy=function(m,x,y,g){v.transform(m,function(){return t(this.__zoom.translate(typeof x=="function"?x.apply(this,arguments):x,typeof y=="function"?y.apply(this,arguments):y),n.apply(this,arguments),a)},null,g)},v.translateTo=function(m,x,y,g,D){v.transform(m,function(){var R=n.apply(this,arguments),I=this.__zoom,B=g==null?w(R):typeof g=="function"?g.apply(this,arguments):g;return t(Se.translate(B[0],B[1]).scale(I.k).translate(typeof x=="function"?-x.apply(this,arguments):-x,typeof y=="function"?-y.apply(this,arguments):-y),R,a)},g,D)};function E(m,x){return x=Math.max(s[0],Math.min(s[1],x)),x===m.k?m:new ae(x,m.x,m.y)}function C(m,x,y){var g=x[0]-y[0]*m.k,D=x[1]-y[1]*m.k;return g===m.x&&D===m.y?m:new ae(m.k,g,D)}function w(m){return[(+m[0][0]+ +m[1][0])/2,(+m[0][1]+ +m[1][1])/2]}function S(m,x,y,g){m.on("start.zoom",function(){_(this,arguments).event(g).start()}).on("interrupt.zoom end.zoom",function(){_(this,arguments).event(g).end()}).tween("zoom",function(){var D=this,R=arguments,I=_(D,R).event(g),B=n.apply(D,R),A=y==null?w(B):typeof y=="function"?y.apply(D,R):y,U=Math.max(B[1][0]-B[0][0],B[1][1]-B[0][1]),N=D.__zoom,z=typeof x=="function"?x.apply(D,R):x,pe=l(N.invert(A).concat(U/N.k),z.invert(A).concat(U/z.k));return function(te){if(te===1)te=z;else{var me=pe(te),Mt=U/me[2];te=new ae(Mt,A[0]-me[0]*Mt,A[1]-me[1]*Mt)}I.zoom(null,te)}})}function _(m,x,y){return!y&&m.__zooming||new L(m,x)}function L(m,x){this.that=m,this.args=x,this.active=0,this.sourceEvent=null,this.extent=n.apply(m,x),this.taps=0}L.prototype={event:function(m){return m&&(this.sourceEvent=m),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(m,x){return this.mouse&&m!=="mouse"&&(this.mouse[1]=x.invert(this.mouse[0])),this.touch0&&m!=="touch"&&(this.touch0[1]=x.invert(this.touch0[0])),this.touch1&&m!=="touch"&&(this.touch1[1]=x.invert(this.touch1[0])),this.that.__zoom=x,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(m){var x=V(this.that).datum();c.call(m,this.that,new Ir(m,{sourceEvent:this.sourceEvent,target:v,type:m,transform:this.that.__zoom,dispatch:c}),x)}};function G(m,...x){if(!e.apply(this,arguments))return;var y=_(this,x).event(m),g=this.__zoom,D=Math.max(s[0],Math.min(s[1],g.k*Math.pow(2,r.apply(this,arguments)))),R=ye(m);if(y.wheel)(y.mouse[0][0]!==R[0]||y.mouse[0][1]!==R[1])&&(y.mouse[1]=g.invert(y.mouse[0]=R)),clearTimeout(y.wheel);else{if(g.k===D)return;y.mouse=[R,g.invert(R)],De(this),y.start()}Qe(m),y.wheel=setTimeout(I,h),y.zoom("mouse",t(C(E(g,D),y.mouse[0],y.mouse[1]),y.extent,a));function I(){y.wheel=null,y.end()}}function Z(m,...x){if(d||!e.apply(this,arguments))return;var y=m.currentTarget,g=_(this,x,!0).event(m),D=V(m.view).on("mousemove.zoom",A,!0).on("mouseup.zoom",U,!0),R=ye(m,y),I=m.clientX,B=m.clientY;Ft(m.view),Ct(m),g.mouse=[R,this.__zoom.invert(R)],De(this),g.start();function A(N){if(Qe(N),!g.moved){var z=N.clientX-I,pe=N.clientY-B;g.moved=z*z+pe*pe>k}g.event(N).zoom("mouse",t(C(g.that.__zoom,g.mouse[0]=ye(N,y),g.mouse[1]),g.extent,a))}function U(N){D.on("mousemove.zoom mouseup.zoom",null),jt(N.view,g.moved),Qe(N),g.event(N).end()}}function P(m,...x){if(e.apply(this,arguments)){var y=this.__zoom,g=ye(m.changedTouches?m.changedTouches[0]:m,this),D=y.invert(g),R=y.k*(m.shiftKey?.5:2),I=t(C(E(y,R),g,D),n.apply(this,x),a);Qe(m),i>0?V(this).transition().duration(i).call(S,I,g,m):V(this).call(v.transform,I,g,m)}}function W(m,...x){if(e.apply(this,arguments)){var y=m.touches,g=y.length,D=_(this,x,m.changedTouches.length===g).event(m),R,I,B,A;for(Ct(m),I=0;I<g;++I)B=y[I],A=ye(B,this),A=[A,this.__zoom.invert(A),B.identifier],D.touch0?!D.touch1&&D.touch0[2]!==A[2]&&(D.touch1=A,D.taps=0):(D.touch0=A,R=!0,D.taps=1+!!u);u&&(u=clearTimeout(u)),R&&(D.taps<2&&(p=A[0],u=setTimeout(function(){u=null},f)),De(this),D.start())}}function Tt(m,...x){if(this.__zooming){var y=_(this,x).event(m),g=m.changedTouches,D=g.length,R,I,B,A;for(Qe(m),R=0;R<D;++R)I=g[R],B=ye(I,this),y.touch0&&y.touch0[2]===I.identifier?y.touch0[0]=B:y.touch1&&y.touch1[2]===I.identifier&&(y.touch1[0]=B);if(I=y.that.__zoom,y.touch1){var U=y.touch0[0],N=y.touch0[1],z=y.touch1[0],pe=y.touch1[1],te=(te=z[0]-U[0])*te+(te=z[1]-U[1])*te,me=(me=pe[0]-N[0])*me+(me=pe[1]-N[1])*me;I=E(I,Math.sqrt(te/me)),B=[(U[0]+z[0])/2,(U[1]+z[1])/2],A=[(N[0]+pe[0])/2,(N[1]+pe[1])/2]}else if(y.touch0)B=y.touch0[0],A=y.touch0[1];else return;y.zoom("touch",t(C(I,B,A),y.extent,a))}}function _t(m,...x){if(this.__zooming){var y=_(this,x).event(m),g=m.changedTouches,D=g.length,R,I;for(Ct(m),d&&clearTimeout(d),d=setTimeout(function(){d=null},f),R=0;R<D;++R)I=g[R],y.touch0&&y.touch0[2]===I.identifier?delete y.touch0:y.touch1&&y.touch1[2]===I.identifier&&delete y.touch1;if(y.touch1&&!y.touch0&&(y.touch0=y.touch1,delete y.touch1),y.touch0)y.touch0[1]=this.__zoom.invert(y.touch0[0]);else if(y.end(),y.taps===2&&(I=ye(I,this),Math.hypot(p[0]-I[0],p[1]-I[1])<q)){var B=V(this).on("dblclick.zoom");B&&B.apply(this,arguments)}}}return v.wheelDelta=function(m){return arguments.length?(r=typeof m=="function"?m:qn(+m),v):r},v.filter=function(m){return arguments.length?(e=typeof m=="function"?m:qn(!!m),v):e},v.touchable=function(m){return arguments.length?(o=typeof m=="function"?m:qn(!!m),v):o},v.extent=function(m){return arguments.length?(n=typeof m=="function"?m:qn([[+m[0][0],+m[0][1]],[+m[1][0],+m[1][1]]]),v):n},v.scaleExtent=function(m){return arguments.length?(s[0]=+m[0],s[1]=+m[1],v):[s[0],s[1]]},v.translateExtent=function(m){return arguments.length?(a[0][0]=+m[0][0],a[1][0]=+m[1][0],a[0][1]=+m[0][1],a[1][1]=+m[1][1],v):[[a[0][0],a[0][1]],[a[1][0],a[1][1]]]},v.constrain=function(m){return arguments.length?(t=m,v):t},v.duration=function(m){return arguments.length?(i=+m,v):i},v.interpolate=function(m){return arguments.length?(l=m,v):l},v.on=function(){var m=c.on.apply(c,arguments);return m===c?v:m},v.clickDistance=function(m){return arguments.length?(k=(m=+m)*m,v):Math.sqrt(k)},v.tapDistance=function(m){return arguments.length?(q=+m,v):q},v}var J={pins:{main:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",head:"d07002357d3e9596bfaae910a1ac63b77981620b"},sources:{"main-transport":{key:"main-transport",revision:"main",commit:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",path:"apps/cli/src/daemon/local-daemon-transport.ts",sha256:"d3659cc57bee5c7fef70cd40b15c1764df5c5a815da4bf63a7f4090e1d611e02",text:`import { existsSync, mkdirSync, rmSync } from "node:fs";
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
`},"main-output":{key:"main-output",revision:"main",commit:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",path:"apps/cli/src/command-execution-result.ts",sha256:"8f3f09dc5ec1a1c9fdf5db2f0fb15ff50488f2ec71e2e8bf488b997cd2d2e20b",text:`import { createHash, randomUUID } from "node:crypto";
import { constants } from "node:fs";
import { mkdir, open, unlink, type FileHandle } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Writable } from "node:stream";
import { finished as streamFinished } from "node:stream/promises";
import type { ProgramContext } from "./program-context.js";

export type CommandOutputStream = "stdout" | "stderr";

export interface CommandOutputRecord {
  readonly sequence: number;
  readonly stream: CommandOutputStream;
  readonly bytes: Uint8Array;
}

export interface CommandOutputSummary {
  readonly rawBytes: number;
  readonly recordCount: number;
  readonly sha256: string;
}

export interface CommandOutput {
  readonly summary: CommandOutputSummary;
  records(offset?: number): AsyncIterable<CommandOutputRecord>;
  dispose(): Promise<void>;
}

export interface CommandExecutionResult {
  readonly output: CommandOutput;
  readonly exitCode: number;
}

export type CommandExecutionMode = "cold" | "warm" | "fallback";

export interface DispatchedCommandResult {
  readonly mode: CommandExecutionMode;
  readonly result: CommandExecutionResult;
}

export interface CliExecutionRequest {
  readonly argv: readonly string[];
  readonly cwd: string;
  readonly telemetryEnabled: boolean;
  readonly executionMode?: CommandExecutionMode;
}

export interface OrderedCommandOutputOptions {
  readonly inlineBytes?: number;
  readonly directory?: string;
  readonly maximumBytes?: number;
}

const DEFAULT_INLINE_BYTES = 256 * 1024;
const MAXIMUM_RECORD_BYTES = 64 * 1024;
const DEFAULT_MAXIMUM_BYTES = 256 * 1024 * 1024;
const RECORD_HEADER_BYTES = 9;

class CommandOutputWritable extends Writable {
  constructor(
    private readonly stream: CommandOutputStream,
    private readonly append: (stream: CommandOutputStream, bytes: Uint8Array) => Promise<void>,
  ) {
    super();
  }

  override _write(
    chunk: unknown,
    encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), encoding);
    void this.append(this.stream, bytes).then(() => callback(), callback);
  }
}

class StoredCommandOutput implements CommandOutput {
  constructor(
    readonly summary: CommandOutputSummary,
    private readonly inlineRecords: readonly CommandOutputRecord[],
    private readonly filePath?: string,
  ) {}

  async *records(offset = 0): AsyncIterable<CommandOutputRecord> {
    const records =
      this.filePath === undefined
        ? this.inlineRecords
        : OrderedCommandOutput.decodeFileRecords(this.filePath);
    for await (const record of records) {
      if (record.sequence >= offset) yield record;
    }
  }

  async dispose(): Promise<void> {
    if (this.filePath === undefined) return;
    await unlink(this.filePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}

export class CommandOutputSnapshot implements CommandOutput {
  readonly summary: CommandOutputSummary;
  private readonly captured: readonly CommandOutputRecord[];

  constructor(records: readonly Omit<CommandOutputRecord, "sequence">[]) {
    this.captured = records.map((record, sequence) => ({
      sequence,
      stream: record.stream,
      bytes: Uint8Array.from(record.bytes),
    }));
    const hash = createHash("sha256");
    let rawBytes = 0;
    for (const record of this.captured) {
      const encoded = OrderedCommandOutput.encodeRecord(record);
      hash.update(encoded.subarray(4));
      rawBytes += record.bytes.byteLength;
    }
    this.summary = { rawBytes, recordCount: this.captured.length, sha256: hash.digest("hex") };
  }

  async *records(offset = 0): AsyncIterable<CommandOutputRecord> {
    for (const record of this.captured) if (record.sequence >= offset) yield record;
  }

  dispose(): Promise<void> {
    return Promise.resolve();
  }
}

export class OrderedCommandOutput {
  readonly stdout: NodeJS.WritableStream;
  readonly stderr: NodeJS.WritableStream;
  private readonly inlineBytes: number;
  private readonly directory: string;
  private readonly maximumBytes: number;
  private readonly hash = createHash("sha256");
  private readonly inlineRecords: CommandOutputRecord[] = [];
  private pending: { stream: CommandOutputStream; bytes: Buffer } | undefined;
  private file: FileHandle | undefined;
  private filePath: string | undefined;
  private rawBytes = 0;
  private recordCount = 0;
  private finished = false;
  private tail: Promise<void> = Promise.resolve();
  private capturedBytes = 0;
  private failure: Error | undefined;

  constructor(options: OrderedCommandOutputOptions = {}) {
    this.inlineBytes = options.inlineBytes ?? DEFAULT_INLINE_BYTES;
    this.directory = options.directory ?? tmpdir();
    this.maximumBytes = options.maximumBytes ?? DEFAULT_MAXIMUM_BYTES;
    this.stdout = new CommandOutputWritable("stdout", (stream, bytes) =>
      this.enqueue(stream, bytes),
    );
    this.stderr = new CommandOutputWritable("stderr", (stream, bytes) =>
      this.enqueue(stream, bytes),
    );
  }

  appendRecord(record: CommandOutputRecord): Promise<void> {
    const operation = this.tail.then(async () => {
      if (this.finished) throw new Error("Command output is already finished");
      await this.flushPending();
      if (record.sequence !== this.recordCount)
        throw new Error("Unexpected command output sequence");
      if (record.bytes.byteLength > MAXIMUM_RECORD_BYTES) {
        throw new Error("Command output record exceeds chunk capacity");
      }
      if (this.capturedBytes + record.bytes.byteLength > this.maximumBytes) {
        throw new CommandOutputCapacityError();
      }
      this.capturedBytes += record.bytes.byteLength;
      await this.storeRecord({ ...record, bytes: Buffer.from(record.bytes) });
    });
    this.tail = operation.catch((error: unknown) => {
      this.failure = error instanceof Error ? error : new Error(String(error));
    });
    return operation;
  }

  async finish(exitCode: number): Promise<CommandExecutionResult> {
    if (this.finished) throw new Error("Command output is already finished");
    this.stdout.end();
    this.stderr.end();
    await Promise.all([streamFinished(this.stdout), streamFinished(this.stderr)]);
    if (this.failure !== undefined) throw this.failure;
    this.finished = true;
    await this.flushPending();
    await this.file?.close();
    this.file = undefined;
    const storedOutput = new StoredCommandOutput(
      {
        rawBytes: this.rawBytes,
        recordCount: this.recordCount,
        sha256: this.hash.digest("hex"),
      },
      [...this.inlineRecords],
      this.filePath,
    );
    return {
      output: storedOutput,
      exitCode,
    };
  }

  async replaceWith(result: CommandExecutionResult): Promise<CommandExecutionResult> {
    await this.dispose();
    return result;
  }

  async dispose(): Promise<void> {
    await this.file?.close();
    this.file = undefined;
    if (this.filePath === undefined) return;
    await unlink(this.filePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
    this.filePath = undefined;
  }

  private async append(stream: CommandOutputStream, bytes: Uint8Array): Promise<void> {
    if (this.finished) throw new Error("Command output is already finished");
    for (let offset = 0; offset < bytes.byteLength; offset += MAXIMUM_RECORD_BYTES) {
      const chunk = Buffer.from(
        bytes.buffer,
        bytes.byteOffset + offset,
        Math.min(MAXIMUM_RECORD_BYTES, bytes.byteLength - offset),
      );
      if (this.capturedBytes + chunk.byteLength > this.maximumBytes) {
        throw new CommandOutputCapacityError();
      }
      this.capturedBytes += chunk.byteLength;
      if (
        this.pending?.stream === stream &&
        this.pending.bytes.byteLength + chunk.byteLength <= MAXIMUM_RECORD_BYTES
      ) {
        this.pending = { stream, bytes: Buffer.concat([this.pending.bytes, chunk]) };
        continue;
      }
      await this.flushPending();
      this.pending = { stream, bytes: Buffer.from(chunk) };
    }
  }

  private enqueue(stream: CommandOutputStream, bytes: Uint8Array): Promise<void> {
    const operation = this.tail
      .then(() => this.append(stream, bytes))
      .catch((error: unknown) => {
        this.failure = error instanceof Error ? error : new Error(String(error));
      });
    this.tail = operation;
    return operation;
  }

  private async flushPending(): Promise<void> {
    if (this.pending === undefined) return;
    const record: CommandOutputRecord = {
      sequence: this.recordCount,
      stream: this.pending.stream,
      bytes: this.pending.bytes,
    };
    this.pending = undefined;
    await this.storeRecord(record);
  }

  private async storeRecord(record: CommandOutputRecord): Promise<void> {
    const encoded = OrderedCommandOutput.encodeRecord(record);
    if (this.file === undefined && this.rawBytes + record.bytes.byteLength > this.inlineBytes) {
      await this.spillInlineRecords();
    }
    if (this.file === undefined) this.inlineRecords.push(record);
    else await this.file.write(encoded);
    this.hash.update(encoded.subarray(4));
    this.rawBytes += record.bytes.byteLength;
    this.recordCount += 1;
  }

  private async spillInlineRecords(): Promise<void> {
    await mkdir(this.directory, { recursive: true, mode: 0o700 });
    this.filePath = join(this.directory, \`command-output-\${randomUUID()}.spool\`);
    this.file = await open(this.filePath, "wx", 0o600);
    for (const record of this.inlineRecords) {
      await this.file.write(OrderedCommandOutput.encodeRecord(record));
    }
    this.inlineRecords.length = 0;
  }

  static encodeRecord(record: CommandOutputRecord): Buffer {
    const header = Buffer.alloc(RECORD_HEADER_BYTES);
    header.writeUInt32BE(record.sequence, 0);
    header.writeUInt8(record.stream === "stdout" ? 0 : 1, 4);
    header.writeUInt32BE(record.bytes.byteLength, 5);
    return Buffer.concat([header, Buffer.from(record.bytes)]);
  }

  static decodeRecords(encoded: Uint8Array): CommandOutputRecord[] {
    const records: CommandOutputRecord[] = [];
    const bytes = Buffer.from(encoded);
    let offset = 0;
    while (offset < bytes.byteLength) {
      if (bytes.byteLength - offset < RECORD_HEADER_BYTES)
        throw new Error("Truncated command output");
      const sequence = bytes.readUInt32BE(offset);
      const streamByte = bytes.readUInt8(offset + 4);
      const length = bytes.readUInt32BE(offset + 5);
      const nextOffset = offset + RECORD_HEADER_BYTES + length;
      if (streamByte > 1 || nextOffset > bytes.byteLength)
        throw new Error("Corrupt command output");
      records.push({
        sequence,
        stream: streamByte === 0 ? "stdout" : "stderr",
        bytes: bytes.subarray(offset + RECORD_HEADER_BYTES, nextOffset),
      });
      offset = nextOffset;
    }
    return records;
  }

  static async *decodeFileRecords(filePath: string): AsyncIterable<CommandOutputRecord> {
    const noFollow = "O_NOFOLLOW" in constants ? constants.O_NOFOLLOW : 0;
    const handle = await open(filePath, constants.O_RDONLY | noFollow);
    try {
      const metadata = await handle.stat();
      if (!metadata.isFile()) throw new Error("Command output spool is not a regular file");
      let position = 0;
      let expectedSequence = 0;
      while (position < metadata.size) {
        const header = Buffer.alloc(RECORD_HEADER_BYTES);
        await OrderedCommandOutput.readExact(handle, header, position);
        position += RECORD_HEADER_BYTES;
        const sequence = header.readUInt32BE(0);
        const streamByte = header.readUInt8(4);
        const length = header.readUInt32BE(5);
        if (sequence !== expectedSequence || streamByte > 1 || length > MAXIMUM_RECORD_BYTES) {
          throw new Error("Corrupt command output");
        }
        const bytes = Buffer.alloc(length);
        await OrderedCommandOutput.readExact(handle, bytes, position);
        position += length;
        expectedSequence += 1;
        yield { sequence, stream: streamByte === 0 ? "stdout" : "stderr", bytes };
      }
    } finally {
      await handle.close();
    }
  }

  private static async readExact(
    handle: FileHandle,
    target: Buffer,
    position: number,
  ): Promise<void> {
    let readBytes = 0;
    while (readBytes < target.byteLength) {
      const result = await handle.read(
        target,
        readBytes,
        target.byteLength - readBytes,
        position + readBytes,
      );
      if (result.bytesRead === 0) throw new Error("Truncated command output");
      readBytes += result.bytesRead;
    }
  }
}

export class CommandOutputCapacityError extends Error {
  constructor() {
    super("Command output exceeds response capacity");
    this.name = "CommandOutputCapacityError";
  }
}

export class CommandResultReplayer {
  static async replay(
    result: CommandExecutionResult,
    context: ProgramContext,
  ): Promise<never | void> {
    try {
      for await (const record of result.output.records()) {
        await CommandResultReplayer.write(context[record.stream], record.bytes);
      }
    } finally {
      await result.output.dispose();
    }
    if (result.exitCode !== 0) context.exit(result.exitCode);
  }

  private static write(stream: NodeJS.WritableStream, bytes: Uint8Array): Promise<void> {
    return new Promise((resolve, reject) => {
      let callbackCompleted = false;
      let drainCompleted = false;
      let settled = false;
      const cleanup = () => {
        stream.removeListener("drain", onDrain);
        stream.removeListener("error", onError);
        stream.removeListener("close", onClose);
      };
      const fail = (error: Error) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(error);
      };
      const complete = () => {
        if (settled || !callbackCompleted || !drainCompleted) return;
        settled = true;
        cleanup();
        resolve();
      };
      const onDrain = () => {
        drainCompleted = true;
        complete();
      };
      const onError = (error: Error) => fail(error);
      const onClose = () => fail(new Error("Command output stream closed during replay"));
      stream.once("error", onError);
      stream.once("close", onClose);
      try {
        const accepted = stream.write(bytes, (error?: Error | null) => {
          if (error) {
            fail(error);
            return;
          }
          callbackCompleted = true;
          complete();
        });
        drainCompleted = accepted;
        if (!accepted) stream.once("drain", onDrain);
        complete();
      } catch (error) {
        fail(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }
}

export class ControlledCommandResult {
  static acceptedRequestDidNotComplete(): CommandExecutionResult {
    return ControlledCommandResult.failure(
      "Cannot answer: accepted daemon request did not complete.\\n",
    );
  }

  static workspaceCapacityExceeded(): CommandExecutionResult {
    return ControlledCommandResult.failure("Cannot answer: daemon workspace capacity exceeded.\\n");
  }

  static responseCapacityExceeded(): CommandExecutionResult {
    return ControlledCommandResult.failure("Cannot answer: daemon response capacity exceeded.\\n");
  }

  private static failure(message: string): CommandExecutionResult {
    const bytes = Buffer.from(message);
    return {
      output: new CommandOutputSnapshot([{ stream: "stderr", bytes }]),
      exitCode: 1,
    };
  }
}
`},"main-tests":{key:"main-tests",revision:"main",commit:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts",sha256:"ba3d633e79f911307ad1eb0347b74e107a60243c7cd18fed397f158c8014749a",text:`import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { createServer, type Server, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OrderedCommandOutput } from "../command-execution-result.js";
import {
  DAEMON_PROTOCOL_VERSION,
  type DaemonExecuteRequest,
  type DaemonExecutionServerFrame,
  type DaemonServerMessage,
} from "./daemon-protocol.js";
import { DaemonTransportError, LocalDaemonTransport } from "./local-daemon-transport.js";
import { COMMAND_OUTPUT_CHUNK_BYTES, DaemonCompletionSpoolStore } from "./completion-spool.js";
import { DaemonResultChunkCodec } from "./daemon-result-chunk-codec.js";

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
    const chunkCount = (12 * 1024 * 1024) / COMMAND_OUTPUT_CHUNK_BYTES;
    for (let sequence = 0; sequence < chunkCount; sequence += 1) {
      await spool.append({
        sequence,
        stream: sequence % 2 === 0 ? "stdout" : "stderr",
        bytes: Buffer.alloc(COMMAND_OUTPUT_CHUNK_BYTES, sequence),
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
        bytes: Buffer.alloc(COMMAND_OUTPUT_CHUNK_BYTES, sequence),
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
                DaemonResultChunkCodec.encode({
                  transferId: manifest.transferId,
                  requestId: request.requestId,
                  offset: manifest.recordCount,
                  sequence: manifest.recordCount,
                  stream: "stdout",
                  bytes: Buffer.from("late"),
                }),
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
        bytes: Buffer.alloc(COMMAND_OUTPUT_CHUNK_BYTES, 7),
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
        bytes: Buffer.alloc(COMMAND_OUTPUT_CHUNK_BYTES, sequence),
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
      bytes: Buffer.alloc(COMMAND_OUTPUT_CHUNK_BYTES, 3),
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
      DaemonResultChunkCodec.encode({
        transferId,
        requestId: request.requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      }),
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
      DaemonResultChunkCodec.encode({
        transferId: manifest.transferId,
        requestId: request.requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      }),
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
    return DaemonResultChunkCodec.encode({
      transferId: manifest.transferId,
      requestId: request.requestId,
      offset: record.sequence,
      sequence: record.sequence,
      stream: record.stream,
      bytes: record.bytes,
    });
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
`},execution:{key:"execution",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/execution-client.ts",sha256:"39b580e9cd60fe8138082d069b53831befa8ea0f8e203dea1ddf440e5ad09eae",text:`import type { DaemonPolicyValues } from "@symnav/daemon";
import type { DaemonExecutionFailureCode } from "../daemon-execution-failure.js";
import type { DaemonOutputCapture } from "./client-result-capture.js";
import type { DaemonLifecycleClient } from "./lifecycle-client.js";
import type {
  DaemonExecuteRequest,
  DaemonExecutionServerFrame,
  DaemonResultChunk,
} from "./protocol.js";
import { DaemonProtocolError, type DaemonProtocolValidator } from "./protocol-validator.js";
import { DaemonResultTransferReceiver } from "./result-transfer-receiver.js";
import type {
  DaemonExecutionAcceptance,
  DaemonExecutionReceipt,
  DaemonExecutionRequester,
  DaemonSocketClient,
} from "./contracts.js";
import { DaemonTransportError, type DaemonDeliveryState } from "./transport-error.js";
import type { DaemonWireCodec } from "./wire-codec.js";

class DaemonResultFetchEndedError extends DaemonTransportError {
  constructor(instanceId: string) {
    super("closed", "accepted", "Daemon result resume ended before completion", instanceId);
  }
}

interface DaemonExecutionClientOptions {
  readonly sockets: DaemonSocketClient;
  readonly lifecycle: Pick<DaemonLifecycleClient, "acknowledgeResult">;
  readonly codec: DaemonWireCodec;
  readonly validator: DaemonProtocolValidator;
  readonly createOutput: () => DaemonOutputCapture;
  readonly transportPolicy: DaemonPolicyValues["transport"];
  readonly deliveryPolicy: DaemonPolicyValues["delivery"];
}

export class DaemonExecutionClient implements DaemonExecutionRequester {
  constructor(private readonly options: DaemonExecutionClientOptions) {}

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
    let originalAcceptedClose: DaemonTransportError | undefined;
    let reattachmentCount = 0;
    while (true) {
      try {
        return await currentCompletion;
      } catch (error) {
        if (!DaemonExecutionClient.isAcceptedConnectionClose(error, request)) throw error;
        originalAcceptedClose ??= error;
        if (
          reattachmentCount >= this.options.deliveryPolicy.postAcceptanceExecutionReattachmentLimit
        )
          throw originalAcceptedClose;
        try {
          const reattached = await this.executeOnce(endpoint, request);
          currentCompletion = reattached.completion;
          reattachmentCount += 1;
        } catch {
          throw originalAcceptedClose;
        }
      }
    }
  }

  private executeOnce(
    endpoint: string,
    request: DaemonExecuteRequest,
  ): Promise<DaemonExecutionReceipt> {
    this.options.validator.request(request);
    return new Promise((resolve, reject) => {
      const decoder = this.options.codec.transferDecoder();
      const transfer = new DaemonResultTransferReceiver(
        request.requestId,
        this.options.createOutput(),
      );
      let connection: Awaited<ReturnType<DaemonSocketClient["connect"]>> | undefined;
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
      const fail = (error: unknown): void => {
        const transportError = DaemonExecutionClient.transportError(error, delivery);
        connection?.destroy();
        if (!outerSettled) {
          outerSettled = true;
          void transfer.dispose().finally(() => reject(transportError));
          return;
        }
        if (!completionSettled) {
          completionSettled = true;
          void transfer.dispose().finally(() => rejectCompletion(transportError));
        }
      };
      const resume = (): boolean => {
        if (
          resumeCount >= this.options.deliveryPolicy.resultTransferResumeLimitPerExecutionAttempt ||
          completionSettled ||
          acceptance === undefined ||
          transfer.manifest === undefined ||
          terminal
        ) {
          return false;
        }
        resumeCount += 1;
        connection?.destroy();
        transfer.beginConnection();
        void this.fetchCompletion(endpoint, request, transfer)
          .then((completionValue) => {
            if (completionSettled) return;
            completionSettled = true;
            resolveCompletion(completionValue);
          })
          .catch((error: unknown) => {
            if (DaemonExecutionClient.isAcceptedConnectionClose(error, request) && resume()) {
              return;
            }
            fail(
              error instanceof DaemonResultFetchEndedError
                ? new DaemonTransportError("corrupt", "accepted", error.message)
                : error,
            );
          });
        return true;
      };
      const publishAcceptance = (): void => {
        if (acceptance === undefined || outerSettled) return;
        outerSettled = true;
        connection?.disableTimeout();
        resolve({ acceptance, completion });
      };
      const consume = async (bytes: Uint8Array): Promise<void> => {
        const values = decoder.append(bytes);
        let completedResult = false;
        let failedCode: DaemonExecutionFailureCode | undefined;
        for (const value of values) {
          if (DaemonExecutionClient.isResultChunk(value)) {
            if (acceptance === undefined)
              throw new Error("Daemon returned output before acceptance");
            await transfer.acceptChunk(value);
            continue;
          }
          const frame = this.options.validator.executionFrame(request, value);
          if (frame.kind === "rejected") {
            if (acceptance !== undefined || terminal) {
              throw new Error("Daemon rejected an already accepted request");
            }
            throw new DaemonTransportError(
              "rejected",
              "submitted-unconfirmed",
              \`Daemon rejected execution: \${frame.code}\`,
              frame.instanceId,
              frame.code,
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
          try {
            await this.options.lifecycle.acknowledgeResult(
              endpoint,
              request,
              completedManifest.transferId,
            );
          } catch (error) {
            await result.output.dispose();
            throw error;
          }
          if (!completionSettled) {
            completionSettled = true;
            connection?.end();
            resolveCompletion({ status: "completed", result });
          }
        }
        if (failedCode !== undefined && !completionSettled) {
          completionSettled = true;
          connection?.end();
          await transfer.dispose();
          resolveCompletion({ status: "failed", code: failedCode });
        }
      };
      const receive = async (): Promise<void> => {
        try {
          connection = await this.options.sockets.connect(
            endpoint,
            this.options.transportPolicy.executionAdmissionTimeoutMs,
          );
        } catch (error) {
          if (DaemonExecutionClient.isSocketTimeout(error)) {
            fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out"));
            return;
          }
          const message = error instanceof Error ? error.message : String(error);
          fail(new DaemonTransportError("unreachable", delivery, message));
          return;
        }
        try {
          connection.write(this.options.codec.encodeControl(request));
          delivery = "submitted-unconfirmed";
        } catch (error) {
          fail(error);
          return;
        }
        try {
          for await (const bytes of connection.incoming) {
            try {
              await consume(bytes);
            } catch (error) {
              throw DaemonExecutionClient.transportError(error, delivery);
            }
          }
          if (terminal && completionSettled) return;
          if (resume()) return;
          try {
            decoder.assertComplete();
          } catch (error) {
            fail(error);
            return;
          }
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
        } catch (error) {
          if (error instanceof DaemonTransportError || error instanceof DaemonProtocolError) {
            fail(error);
            return;
          }
          if (DaemonExecutionClient.isSocketTimeout(error)) {
            fail(new DaemonTransportError("timeout", delivery, "Daemon request timed out"));
            return;
          }
          if (resume()) return;
          const message = error instanceof Error ? error.message : String(error);
          fail(new DaemonTransportError("closed", delivery, message, acceptance?.instanceId));
        }
      };
      void receive();
    });
  }

  private async fetchCompletion(
    endpoint: string,
    request: DaemonExecuteRequest,
    transfer: DaemonResultTransferReceiver,
  ): DaemonExecutionReceipt["completion"] {
    const decoder = this.options.codec.transferDecoder();
    let connection: Awaited<ReturnType<DaemonSocketClient["connect"]>>;
    try {
      connection = await this.options.sockets.connect(endpoint);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new DaemonTransportError("closed", "accepted", message, request.instanceId);
    }
    try {
      connection.write(
        this.options.codec.encodeControl({
          kind: "result-fetch",
          protocolVersion: request.protocolVersion,
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          offset: transfer.nextOffset,
        }),
      );
    } catch (error) {
      connection.destroy();
      throw DaemonExecutionClient.transportError(error, "accepted");
    }
    let ended = false;
    try {
      for await (const bytes of connection.incoming) {
        try {
          let completedResult = false;
          let failedCode: DaemonExecutionFailureCode | undefined;
          for (const value of decoder.append(bytes)) {
            if (ended) throw new Error("Daemon resumed with a duplicate terminal frame");
            if (DaemonExecutionClient.isResultChunk(value)) {
              await transfer.acceptChunk(value);
              continue;
            }
            const frame = this.options.validator.executionFrame(request, value);
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
            try {
              await this.options.lifecycle.acknowledgeResult(
                endpoint,
                request,
                manifest.transferId,
              );
            } catch (error) {
              await result.output.dispose();
              throw error;
            }
            connection.end();
            return { status: "completed", result };
          }
          if (failedCode !== undefined) {
            connection.end();
            await transfer.dispose();
            return { status: "failed", code: failedCode };
          }
        } catch (error) {
          throw DaemonExecutionClient.transportError(error, "accepted");
        }
      }
      try {
        decoder.assertComplete();
      } catch (error) {
        throw DaemonExecutionClient.transportError(error, "accepted");
      }
      throw new DaemonResultFetchEndedError(request.instanceId);
    } catch (error) {
      connection.destroy();
      if (error instanceof DaemonTransportError || error instanceof DaemonProtocolError) {
        throw DaemonExecutionClient.transportError(error, "accepted");
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new DaemonTransportError("closed", "accepted", message, request.instanceId);
    }
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

  private static transportError(
    error: unknown,
    delivery: DaemonDeliveryState,
  ): DaemonTransportError {
    if (error instanceof DaemonTransportError) return error;
    if (error instanceof DaemonProtocolError) {
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

  private static isSocketTimeout(error: unknown): boolean {
    return (
      error instanceof Error &&
      "code" in error &&
      (error as Error & { readonly code?: unknown }).code === "ETIMEDOUT"
    );
  }

  private static isResultChunk(value: unknown): value is DaemonResultChunk {
    return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !("kind" in value) &&
      "bytes" in value &&
      value.bytes instanceof Uint8Array
    );
  }
}
`},receiver:{key:"receiver",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/result-transfer-receiver.ts",sha256:"bc22ca7fc6a83b22cefec0550346f281ed04f99d3cc4c4334716836981cabdd5",text:`import type { DaemonExecutorExecutionResult } from "@symnav/daemon";
import type { CompletionSpoolManifest } from "../delivery/completion-spool.js";
import type { DaemonExecutionServerFrame, DaemonResultChunk } from "./protocol.js";
import type { DaemonCapturedOutputSummary, DaemonOutputCapture } from "./client-result-capture.js";

type ResultManifestFrame = Extract<
  DaemonExecutionServerFrame,
  { readonly kind: "result-manifest" }
>;

type ResultEndFrame = Extract<DaemonExecutionServerFrame, { readonly kind: "result-end" }>;

export class DaemonResultTransferReceiver {
  private expectedManifest: CompletionSpoolManifest | undefined;
  private nextRecordOffset = 0;
  private manifestReceived = false;
  private terminalReceived = false;
  private completed = false;
  private disposal: Promise<void> | undefined;

  constructor(
    private readonly requestId: string,
    private readonly output: DaemonOutputCapture,
  ) {}

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

  acceptManifest(frame: ResultManifestFrame): void {
    if (this.manifestReceived || this.terminalReceived) {
      throw new Error("Duplicate result manifest");
    }
    if (
      this.expectedManifest !== undefined &&
      !DaemonResultTransferReceiver.manifestsMatch(this.expectedManifest, frame.manifest)
    ) {
      throw new Error("Daemon resumed with a different result manifest");
    }
    if (
      frame.requestId !== this.requestId ||
      frame.manifest.requestId !== this.requestId ||
      frame.manifest.instanceId !== frame.instanceId
    ) {
      throw new Error("Daemon result manifest has invalid coordinates");
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
      chunk.requestId !== this.requestId ||
      chunk.transferId !== manifest.transferId ||
      chunk.offset !== this.nextRecordOffset ||
      chunk.sequence !== this.nextRecordOffset
    ) {
      throw new Error("Daemon returned an invalid result chunk");
    }
    await this.output.append({
      sequence: chunk.sequence,
      stream: chunk.stream,
      bytes: chunk.bytes,
    });
    this.nextRecordOffset += 1;
  }

  acceptEnd(frame: ResultEndFrame): void {
    const manifest = this.expectedManifest;
    if (
      !this.manifestReceived ||
      this.terminalReceived ||
      manifest === undefined ||
      frame.instanceId !== manifest.instanceId ||
      frame.requestId !== this.requestId ||
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

  async finish(): Promise<DaemonExecutorExecutionResult> {
    const manifest = this.expectedManifest;
    if (!this.terminalReceived || manifest === undefined) {
      throw new Error("Daemon result transfer is incomplete");
    }
    try {
      const captured = await this.output.finish(manifest.exitCode);
      if (!DaemonResultTransferReceiver.summariesMatch(captured.summary, manifest)) {
        this.disposal = captured.result.output.dispose();
        await this.disposal;
        throw new Error("Daemon result transfer failed digest validation");
      }
      this.completed = true;
      return captured.result;
    } catch (error) {
      await this.dispose();
      throw error;
    }
  }

  dispose(): Promise<void> {
    if (this.completed) return Promise.resolve();
    this.disposal ??= this.output.dispose();
    return this.disposal;
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
    actual: CompletionSpoolManifest | DaemonCapturedOutputSummary,
    expected: CompletionSpoolManifest,
  ): boolean {
    return (
      actual.rawBytes === expected.rawBytes &&
      actual.recordCount === expected.recordCount &&
      actual.sha256 === expected.sha256
    );
  }
}
`},capture:{key:"capture",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/client-result-capture.ts",sha256:"c2d0c591025bba515dde9264d6f7e83886086d5240b2293785bbf0ef21dea182",text:`import { createHash, randomUUID } from "node:crypto";
import { constants } from "node:fs";
import { mkdir, open, unlink, type FileHandle } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type {
  DaemonExecutorExecutionResult,
  DaemonExecutorOutput,
  DaemonOutputRecord,
  DaemonPolicyValues,
} from "@symnav/daemon";
import type { DaemonSequencedOutputRecord } from "../daemon-executor.js";

const RECORD_HEADER_BYTES = 9;

export interface DaemonOutputCapture {
  append(record: DaemonSequencedOutputRecord): Promise<void>;
  finish(exitCode: number): Promise<DaemonCapturedOutput>;
  dispose(): Promise<void>;
}

export interface DaemonCapturedOutputSummary {
  readonly rawBytes: number;
  readonly recordCount: number;
  readonly sha256: string;
}

export interface DaemonCapturedOutput {
  readonly result: DaemonExecutorExecutionResult;
  readonly summary: DaemonCapturedOutputSummary;
}

export interface DaemonClientResultCaptureOptions {
  readonly directory?: string;
  readonly policy: Pick<
    DaemonPolicyValues["output"],
    "maximumChunkRawBytes" | "inlineRawBytes" | "maximumResultRawBytes"
  >;
}

export class DaemonClientResultCapture implements DaemonOutputCapture {
  private readonly directory: string;
  private readonly inlineRawBytes: number;
  private readonly maximumResultRawBytes: number;
  private readonly maximumChunkRawBytes: number;
  private readonly hash = createHash("sha256");
  private readonly inlineRecords: DaemonSequencedOutputRecord[] = [];
  private file: FileHandle | undefined;
  private filePath: string | undefined;
  private rawBytes = 0;
  private recordCount = 0;
  private finished = false;
  private tail: Promise<void> = Promise.resolve();
  private failure: Error | undefined;

  constructor(options: DaemonClientResultCaptureOptions) {
    this.directory = options.directory ?? tmpdir();
    this.inlineRawBytes = options.policy.inlineRawBytes;
    this.maximumResultRawBytes = options.policy.maximumResultRawBytes;
    this.maximumChunkRawBytes = options.policy.maximumChunkRawBytes;
  }

  append(record: DaemonSequencedOutputRecord): Promise<void> {
    const operation = this.tail.then(async () => {
      if (this.finished) throw new Error("Command output is already finished");
      if (record.sequence !== this.recordCount) {
        throw new Error("Unexpected command output sequence");
      }
      if (record.bytes.byteLength > this.maximumChunkRawBytes) {
        throw new Error("Command output record exceeds chunk capacity");
      }
      if (this.rawBytes + record.bytes.byteLength > this.maximumResultRawBytes) {
        throw new DaemonClientResultCapacityError();
      }
      await this.storeRecord({ ...record, bytes: Buffer.from(record.bytes) });
    });
    this.tail = operation.catch((error: unknown) => {
      this.failure = error instanceof Error ? error : new Error(String(error));
    });
    return operation;
  }

  async finish(exitCode: number): Promise<DaemonCapturedOutput> {
    if (this.finished) throw new Error("Command output is already finished");
    await this.tail;
    if (this.failure !== undefined) throw this.failure;
    this.finished = true;
    await this.file?.close();
    this.file = undefined;
    const summary: DaemonCapturedOutputSummary = {
      rawBytes: this.rawBytes,
      recordCount: this.recordCount,
      sha256: this.hash.digest("hex"),
    };
    return {
      result: {
        exitCode,
        output: new DaemonStoredExecutorOutput(
          [...this.inlineRecords],
          this.filePath,
          this.maximumChunkRawBytes,
        ),
      },
      summary,
    };
  }

  async dispose(): Promise<void> {
    await this.file?.close();
    this.file = undefined;
    if (this.filePath === undefined) return;
    await DaemonClientResultCapture.remove(this.filePath);
    this.filePath = undefined;
  }

  private async storeRecord(record: DaemonSequencedOutputRecord): Promise<void> {
    const encoded = DaemonClientResultCapture.encodeRecord(record);
    if (this.file === undefined && this.rawBytes + record.bytes.byteLength > this.inlineRawBytes) {
      await this.spillInlineRecords();
    }
    if (this.file === undefined) this.inlineRecords.push(record);
    else await this.file.write(encoded);
    this.hash.update(encoded.subarray(4));
    this.rawBytes += record.bytes.byteLength;
    this.recordCount += 1;
  }

  private async spillInlineRecords(): Promise<void> {
    await mkdir(this.directory, { recursive: true, mode: 0o700 });
    this.filePath = join(this.directory, \`command-output-\${randomUUID()}.spool\`);
    this.file = await open(this.filePath, "wx", 0o600);
    for (const record of this.inlineRecords) {
      await this.file.write(DaemonClientResultCapture.encodeRecord(record));
    }
    this.inlineRecords.length = 0;
  }

  private static encodeRecord(record: DaemonSequencedOutputRecord): Buffer {
    const header = Buffer.alloc(RECORD_HEADER_BYTES);
    header.writeUInt32BE(record.sequence, 0);
    header.writeUInt8(record.stream === "stdout" ? 0 : 1, 4);
    header.writeUInt32BE(record.bytes.byteLength, 5);
    return Buffer.concat([header, Buffer.from(record.bytes)]);
  }

  private static async remove(filePath: string): Promise<void> {
    await unlink(filePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}

class DaemonClientResultCapacityError extends Error {
  constructor() {
    super("Command output exceeds response capacity");
    this.name = "CommandOutputCapacityError";
  }
}

export class DaemonStoredExecutorOutput implements DaemonExecutorOutput {
  constructor(
    private readonly inlineRecords: readonly DaemonSequencedOutputRecord[],
    private readonly filePath?: string,
    private readonly maximumRecordBytes?: number,
  ) {}

  async *records(): AsyncIterable<DaemonOutputRecord> {
    const records =
      this.filePath === undefined
        ? this.inlineRecords
        : DaemonStoredExecutorOutput.decodeFileRecords(this.filePath, this.maximumRecordBytes!);
    for await (const record of records) yield { stream: record.stream, bytes: record.bytes };
  }

  async dispose(): Promise<void> {
    if (this.filePath === undefined) return;
    await unlink(this.filePath).catch((error: NodeJS.ErrnoException) => {
      if (error.code !== "ENOENT") throw error;
    });
  }

  private static async *decodeFileRecords(
    filePath: string,
    maximumRecordBytes: number,
  ): AsyncIterable<DaemonSequencedOutputRecord> {
    const noFollow = "O_NOFOLLOW" in constants ? constants.O_NOFOLLOW : 0;
    const handle = await open(filePath, constants.O_RDONLY | noFollow);
    try {
      const metadata = await handle.stat();
      if (!metadata.isFile()) throw new Error("Command output spool is not a regular file");
      let position = 0;
      let expectedSequence = 0;
      while (position < metadata.size) {
        const header = Buffer.alloc(RECORD_HEADER_BYTES);
        await DaemonStoredExecutorOutput.readExact(handle, header, position);
        position += RECORD_HEADER_BYTES;
        const sequence = header.readUInt32BE(0);
        const streamByte = header.readUInt8(4);
        const length = header.readUInt32BE(5);
        if (sequence !== expectedSequence || streamByte > 1 || length > maximumRecordBytes) {
          throw new Error("Corrupt command output");
        }
        const bytes = Buffer.alloc(length);
        await DaemonStoredExecutorOutput.readExact(handle, bytes, position);
        position += length;
        expectedSequence += 1;
        yield { sequence, stream: streamByte === 0 ? "stdout" : "stderr", bytes };
      }
    } finally {
      await handle.close();
    }
  }

  private static async readExact(
    handle: FileHandle,
    target: Buffer,
    position: number,
  ): Promise<void> {
    let readBytes = 0;
    while (readBytes < target.byteLength) {
      const result = await handle.read(
        target,
        readBytes,
        target.byteLength - readBytes,
        position + readBytes,
      );
      if (result.bytesRead === 0) throw new Error("Truncated command output");
      readBytes += result.bytesRead;
    }
  }
}
`},socket:{key:"socket",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/socket-client.ts",sha256:"55bc0c042bdd34c75701478e57efff55620a40dd80563b3b3a8b6f5ee6ba86cf",text:`import { createConnection, type Socket } from "node:net";
import type { DaemonSocketClient, DaemonSocketConnection } from "./contracts.js";

interface LocalDaemonSocketClientOptions {
  readonly writeChunkSize?: number;
}

class LocalDaemonSocketConnection implements DaemonSocketConnection, AsyncIterable<Uint8Array> {
  readonly incoming: AsyncIterable<Uint8Array> = this;
  private readonly queuedBytes: Uint8Array[] = [];
  private pendingRead:
    | {
        readonly resolve: (result: IteratorResult<Uint8Array>) => void;
        readonly reject: (error: unknown) => void;
      }
    | undefined;
  private ended = false;
  private error: unknown;
  private readonly queuedWrites: Uint8Array[] = [];
  private waitingForDrain = false;
  private timeoutDisabled = false;
  private endRequested = false;
  private destroyRequested = false;

  constructor(
    private readonly socket: Socket,
    private readonly writeChunkSize: number | undefined,
  ) {
    socket.pause();
    socket.on("data", (bytes) => this.receive(Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes)));
    socket.once("end", () => this.finish());
    socket.once("close", () => this.finish());
    socket.once("error", (error) => this.fail(error));
  }

  [Symbol.asyncIterator](): AsyncIterator<Uint8Array> {
    return this;
  }

  next(): Promise<IteratorResult<Uint8Array>> {
    const bytes = this.queuedBytes.shift();
    if (bytes !== undefined) return Promise.resolve({ done: false, value: bytes });
    if (this.error !== undefined) return Promise.reject(this.error);
    if (this.ended) return Promise.resolve({ done: true, value: undefined });
    return new Promise((resolve, reject) => {
      this.pendingRead = { resolve, reject };
      this.socket.resume();
    });
  }

  write(frame: Uint8Array): void {
    const chunkSize = this.writeChunkSize ?? frame.length;
    for (let offset = 0; offset < frame.length; offset += chunkSize) {
      this.queuedWrites.push(frame.subarray(offset, offset + chunkSize));
    }
    try {
      this.flushWrites();
    } catch (error) {
      this.fail(error);
      throw error;
    }
  }

  disableTimeout(): void {
    if (this.timeoutDisabled) return;
    this.timeoutDisabled = true;
    this.socket.setTimeout(0);
  }

  end(): void {
    if (this.endRequested) return;
    this.endRequested = true;
    this.socket.end();
  }

  destroy(): void {
    if (this.destroyRequested) return;
    this.destroyRequested = true;
    this.socket.destroy();
  }

  timeout(error: Error): void {
    this.fail(error);
    this.destroy();
  }

  private receive(bytes: Uint8Array): void {
    this.socket.pause();
    const pendingRead = this.pendingRead;
    if (pendingRead === undefined) {
      this.queuedBytes.push(bytes);
      return;
    }
    this.pendingRead = undefined;
    pendingRead.resolve({ done: false, value: bytes });
  }

  private finish(): void {
    if (this.ended || this.error !== undefined) return;
    this.ended = true;
    const pendingRead = this.pendingRead;
    this.pendingRead = undefined;
    pendingRead?.resolve({ done: true, value: undefined });
  }

  private fail(error: unknown): void {
    if (this.ended || this.error !== undefined) return;
    this.error = error;
    const pendingRead = this.pendingRead;
    this.pendingRead = undefined;
    pendingRead?.reject(error);
  }

  private flushWrites(): void {
    if (this.waitingForDrain || this.ended || this.error !== undefined) return;
    while (this.queuedWrites.length > 0) {
      const frame = this.queuedWrites.shift();
      if (frame === undefined) return;
      if (this.socket.write(frame)) continue;
      this.waitingForDrain = true;
      this.socket.once("drain", () => {
        this.waitingForDrain = false;
        try {
          this.flushWrites();
        } catch (error) {
          this.fail(error);
          this.socket.destroy();
        }
      });
      return;
    }
  }
}

export class LocalDaemonSocketClient implements DaemonSocketClient {
  constructor(private readonly options: LocalDaemonSocketClientOptions = {}) {}

  connect(endpoint: string, timeoutMs?: number): Promise<DaemonSocketConnection> {
    return new Promise((resolve, reject) => {
      const socket = createConnection(endpoint);
      let connection: LocalDaemonSocketConnection | undefined;
      let settled = false;
      const fail = (error: Error): void => {
        if (settled) return;
        settled = true;
        socket.destroy();
        reject(error);
      };
      if (timeoutMs !== undefined) {
        socket.setTimeout(timeoutMs, () => {
          const error = Object.assign(new Error("Daemon socket timed out"), {
            code: "ETIMEDOUT" as const,
          });
          if (connection === undefined) {
            fail(error);
            return;
          }
          connection.timeout(error);
        });
      }
      socket.once("error", fail);
      socket.once("connect", () => {
        if (settled) return;
        settled = true;
        socket.off("error", fail);
        connection = new LocalDaemonSocketConnection(socket, this.options.writeChunkSize);
        resolve(connection);
      });
    });
  }
}
`},factory:{key:"factory",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/daemon-transport.ts",sha256:"cfc99a3098357731d2c4a5e5f6364c9f2d74384d6bce21668fcd094af761d27f",text:`import type { DaemonPolicy } from "../daemon-policy.js";
import { DaemonClientResultCapture, type DaemonOutputCapture } from "./client-result-capture.js";
import { DaemonExecutionClient } from "./execution-client.js";
import { DaemonLifecycleClient } from "./lifecycle-client.js";
import { DaemonProtocolValidator } from "./protocol-validator.js";
import type { DaemonRequestServer, DaemonSocketClient } from "./contracts.js";
import { DaemonWireCodec } from "./wire-codec.js";
import { LocalDaemonSocketClient } from "./socket-client.js";
import { LocalDaemonSocketServer } from "./socket-server.js";

export interface DaemonTransportOptions {
  readonly policy: DaemonPolicy;
  readonly lifecycleResponseTimeoutMs?: number;
  readonly writeChunkSize?: number;
  readonly captureDirectory?: string;
  readonly codec?: DaemonWireCodec;
  readonly validator?: DaemonProtocolValidator;
  readonly sockets?: DaemonSocketClient;
  readonly lifecycle?: DaemonLifecycleClient;
  readonly execution?: DaemonExecutionClient;
  readonly server?: DaemonRequestServer;
  readonly createOutput?: () => DaemonOutputCapture;
}

export interface DaemonTransportComponents {
  readonly lifecycle: DaemonLifecycleClient;
  readonly execution: DaemonExecutionClient;
  readonly server: DaemonRequestServer;
}

export class DaemonTransportFactory {
  static create(options: DaemonTransportOptions): DaemonTransportComponents {
    const policy = options.policy;
    const codec =
      options.codec ??
      new DaemonWireCodec({
        maximumJsonPayloadBytes: policy.values.transport.maximumJsonPayloadBytes,
        maximumExecutionControlPayloadBytes:
          policy.values.transport.maximumExecutionControlPayloadBytes,
        maximumChunkRawBytes: policy.values.output.maximumChunkRawBytes,
      });
    const validator = options.validator ?? new DaemonProtocolValidator();
    const sockets =
      options.sockets ??
      new LocalDaemonSocketClient(
        options.writeChunkSize === undefined ? {} : { writeChunkSize: options.writeChunkSize },
      );
    const lifecycle =
      options.lifecycle ??
      new DaemonLifecycleClient({
        sockets,
        codec,
        validator,
        responseTimeoutMs:
          options.lifecycleResponseTimeoutMs ?? policy.values.transport.singleResponseTimeoutMs,
      });
    const execution =
      options.execution ??
      new DaemonExecutionClient({
        sockets,
        lifecycle,
        codec,
        validator,
        createOutput:
          options.createOutput ??
          (() =>
            new DaemonClientResultCapture({
              policy: policy.values.output,
              ...(options.captureDirectory === undefined
                ? {}
                : { directory: options.captureDirectory }),
            })),
        transportPolicy: policy.values.transport,
        deliveryPolicy: policy.values.delivery,
      });
    const server =
      options.server ??
      new LocalDaemonSocketServer({
        sockets,
        codec,
        validator,
        policy: policy.values.transport,
        ...(options.writeChunkSize === undefined ? {} : { writeChunkSize: options.writeChunkSize }),
      });
    return { lifecycle, execution, server };
  }
}
`},"head-tests":{key:"head-tests",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/daemon-transport-execution.test.ts",sha256:"64f2f21cbabfc73ac1d66edb348971a682e7a125542793c4dec2270774fdeccf",text:`import { randomUUID } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { createServer, type Server, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import type { DaemonExecutionFailureCode } from "../daemon-execution-failure.js";
import { DaemonPolicyTestFactory } from "../../test/helpers/daemon-policy.js";
import {
  DAEMON_PROTOCOL_VERSION,
  type DaemonExecuteRequest,
  type DaemonExecutionServerFrame,
  type DaemonServerMessage,
} from "./protocol.js";
import { DaemonTransportError } from "./transport-error.js";
import { TestDaemonTransport as DaemonTransport } from "../../test/helpers/daemon-transport.js";
import {
  DaemonCompletionSpoolStore as RuntimeDaemonCompletionSpoolStore,
  type DaemonCompletionSpoolStoreOptions,
} from "../delivery/completion-spool.js";
import { DaemonWireCodec } from "./wire-codec.js";
import { DaemonClientResultCapture } from "./client-result-capture.js";

const TEST_CHUNK_BYTES = 64 * 1024;
const wireCodec = new DaemonWireCodec({
  maximumJsonPayloadBytes: 8 * 1024 * 1024,
  maximumExecutionControlPayloadBytes: 256 * 1024,
  maximumChunkRawBytes: TEST_CHUNK_BYTES,
});

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
  commandName: "overview",
  request: {
    argv: ["overview", "src/a.ts"],
    cwd: "/repo",
    telemetryEnabled: false,
    executionMode: "warm",
  },
};

describe("DaemonTransport execution delivery", () => {
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
    expect(DAEMON_PROTOCOL_VERSION).toBe(5);
  });

  it("classifies connection refusal before any write as retry-safe", async () => {
    const endpoint = executionEndpoint(directories);

    await expect(
      new DaemonTransport({ requestTimeoutMs: 25 }).execute(endpoint, request),
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
      new DaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request),
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
      new DaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request),
    ).rejects.toMatchObject({
      code: "rejected",
      delivery: "submitted-unconfirmed",
      retrySafe: true,
      authenticatedInstanceId: request.instanceId,
    } satisfies Partial<DaemonTransportError>);
  });

  it.each([
    ["not-ready", false],
    ["resource-pressure", false],
    ["draining", false],
    ["incompatible", true],
  ] as const)("rejects contradictory %s retry safety", async (code, retrySafe) => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () =>
        socket.end(
          frame({
            kind: "rejected",
            instanceId: request.instanceId,
            processToken: request.processToken,
            requestId: request.requestId,
            code,
            retrySafe,
          } satisfies DaemonExecutionServerFrame),
        ),
      );
    });

    await expect(
      new DaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request),
    ).rejects.toMatchObject({
      code: "corrupt",
      delivery: "submitted-unconfirmed",
      retrySafe: false,
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

    const receipt = await new DaemonTransport({ requestTimeoutMs: 10 }).execute(endpoint, request);

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
  });

  it("applies the execution admission deadline until acceptance", async () => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => undefined);
    });

    await expect(
      new DaemonTransport(policyWith({ executionAdmissionTimeoutMs: 25 })).execute(
        endpoint,
        request,
      ),
    ).rejects.toMatchObject({
      code: "timeout",
      delivery: "submitted-unconfirmed",
      retrySafe: false,
    } satisfies Partial<DaemonTransportError>);
  });

  it.each<DaemonExecutionFailureCode>([
    "worker-exit",
    "controlled-resource",
    "response-capacity",
    "stopping",
    "internal",
  ])("preserves accepted terminal failure %s without replay", async (code) => {
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () =>
        socket.end(
          Buffer.concat([
            frame(accepted()),
            frame({
              kind: "execution-failed",
              instanceId: request.instanceId,
              processToken: request.processToken,
              requestId: request.requestId,
              code,
            } satisfies DaemonExecutionServerFrame),
          ]),
        ),
      );
    });

    const receipt = await new DaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request);

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code });
  });

  it.each([
    ["socket close before acceptance", []],
    ["protocol failure after acceptance", [accepted(), accepted()]],
    [
      "terminal daemon failure",
      [
        accepted(),
        {
          kind: "execution-failed",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          code: "internal",
        } satisfies DaemonExecutionServerFrame,
      ],
    ],
  ] as const)("disposes output exactly once after %s", async (scenario, responses) => {
    const dispose = vi.spyOn(DaemonClientResultCapture.prototype, "dispose");
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => socket.end(Buffer.concat(responses.map(frame))));
    });
    const execution = new DaemonTransport().execute(endpoint, request);

    if (scenario === "socket close before acceptance") {
      await expect(execution).rejects.toMatchObject({
        code: "closed",
        delivery: "submitted-unconfirmed",
      });
    } else {
      const receipt = await execution;
      if (scenario === "terminal daemon failure") {
        await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
      } else {
        await expect(receipt.completion).rejects.toMatchObject({
          code: "corrupt",
          delivery: "accepted",
        });
      }
    }

    expect(dispose).toHaveBeenCalledTimes(1);
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

    const receipt = await new DaemonTransport(
      policyWith({ executionAdmissionTimeoutMs: 10 }),
    ).execute(endpoint, request);

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
    const serverTransport = new DaemonTransport();
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
    const receipt = await new DaemonTransport().execute(endpoint, request);
    const completion = await receipt.completion;

    expect(completion.status).toBe("completed");
    if (completion.status !== "completed" || completion.result.output === undefined) return;
    expect(completion.result.output).not.toHaveProperty("summary");
    let receivedRecords = 0;
    for await (const record of completion.result.output.records()) {
      expect(record.stream).toBe(receivedRecords % 2 === 0 ? "stdout" : "stderr");
      expect(Buffer.from(record.bytes)).toEqual(Buffer.alloc(TEST_CHUNK_BYTES, receivedRecords));
      receivedRecords += 1;
    }
    expect(receivedRecords).toBe(chunkCount);
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    await completion.result.output.dispose();
    await server.close();
  }, 60_000);

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
    const append = DaemonClientResultCapture.prototype.append;
    vi.spyOn(DaemonClientResultCapture.prototype, "append").mockImplementation(async function (
      this: DaemonClientResultCapture,
      record,
    ) {
      appendCalls += 1;
      activeAppends += 1;
      maximumActiveAppends = Math.max(maximumActiveAppends, activeAppends);
      markAppendStarted();
      if (appendCalls === 1) await appendGate;
      try {
        await append.call(this, record);
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
    const receipt = await new DaemonTransport({
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
    const append = DaemonClientResultCapture.prototype.append;
    let appendCalls = 0;
    vi.spyOn(DaemonClientResultCapture.prototype, "append").mockImplementation(async function (
      this: DaemonClientResultCapture,
      record,
    ) {
      appendCalls += 1;
      markAppendStarted();
      if (appendCalls === 1) await appendGate;
      await append.call(this, record);
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
    const receipt = await new DaemonTransport().execute(endpoint, request);

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

    const receipt = await new DaemonTransport().execute(endpoint, request);
    const completion = await receipt.completion;

    expect(fetchOffsets).toEqual([2]);
    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    if (completion.status === "completed") {
      expect(completion.result.output).not.toHaveProperty("summary");
      const records = [];
      for await (const record of completion.result.output.records()) {
        records.push({ stream: record.stream, bytes: Buffer.from(record.bytes).toString() });
      }
      expect(records).toEqual(
        Array.from({ length: 5 }, (_, sequence) => ({
          stream: sequence % 2 === 0 ? "stdout" : "stderr",
          bytes: \`record-\${sequence}\\n\`,
        })),
      );
    }
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    if (completion.status === "completed") await completion.result.output?.dispose();
  });

  it("disables result fetch resume without disabling execution reattachment", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-zero-result-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory,
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
        if (message.kind === "result-fetch") {
          fetchCount += 1;
          return;
        }
        executeCount += 1;
        if (executeCount === 1) {
          socket.end(Buffer.concat([frame(accepted()), frame(resultManifest(manifest))]));
          return;
        }
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
        );
      });
    });

    const receipt = await new DaemonTransport(
      policyWith({}, { resultTransferResumeLimitPerExecutionAttempt: 0 }),
    ).execute(endpoint, request);

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
    expect({ executeCount, fetchCount }).toEqual({ executeCount: 2, fetchCount: 0 });
  });

  it("honors result fetch resume limits greater than one within one execute attempt", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-multiple-result-resumes-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace",
      instanceId: request.instanceId,
    });
    const spool = await store.create(request.requestId);
    const manifest = await spool.finish(0);
    let executeCount = 0;
    const fetchOffsets: number[] = [];
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", (encoded) => {
        const bytes = Buffer.isBuffer(encoded) ? encoded : Buffer.from(encoded);
        const message = JSON.parse(bytes.subarray(4).toString()) as {
          kind: string;
          offset?: number;
        };
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
          fetchOffsets.push(message.offset ?? -1);
          if (fetchOffsets.length === 1) {
            socket.end(frame(resultManifest(manifest)));
            return;
          }
          socket.end(Buffer.concat([frame(resultManifest(manifest)), frame(resultEnd(manifest))]));
          return;
        }
        executeCount += 1;
        socket.end(Buffer.concat([frame(accepted()), frame(resultManifest(manifest))]));
      });
    });

    const receipt = await new DaemonTransport(
      policyWith(
        {},
        {
          postAcceptanceExecutionReattachmentLimit: 0,
          resultTransferResumeLimitPerExecutionAttempt: 2,
        },
      ),
    ).execute(endpoint, request);
    const completion = await receipt.completion;

    expect({ executeCount, fetchOffsets }).toEqual({ executeCount: 1, fetchOffsets: [0, 0] });
    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it("surfaces an exhausted clean fetch as accepted corruption without execution replay", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-exhausted-result-resume-"));
    directories.push(directory);
    const store = new DaemonCompletionSpoolStore({
      directory,
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
        if (message.kind === "result-fetch") {
          fetchCount += 1;
          socket.end(frame(resultManifest(manifest)));
          return;
        }
        executeCount += 1;
        socket.end(
          executeCount === 1
            ? Buffer.concat([frame(accepted()), frame(resultManifest(manifest))])
            : Buffer.concat([
                frame(accepted()),
                frame({
                  kind: "execution-failed",
                  instanceId: request.instanceId,
                  processToken: request.processToken,
                  requestId: request.requestId,
                  code: "internal",
                } satisfies DaemonExecutionServerFrame),
              ]),
        );
      });
    });

    const receipt = await new DaemonTransport().execute(endpoint, request);

    await expect(receipt.completion).rejects.toMatchObject({
      code: "corrupt",
      delivery: "accepted",
      retrySafe: false,
    } satisfies Partial<DaemonTransportError>);
    expect({ executeCount, fetchCount }).toEqual({ executeCount: 1, fetchCount: 1 });
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
        bytes: Buffer.alloc(TEST_CHUNK_BYTES, sequence),
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
                wireCodec.encodeServerMessage({
                  transferId: manifest.transferId,
                  requestId: request.requestId,
                  offset: manifest.recordCount,
                  sequence: manifest.recordCount,
                  stream: "stdout",
                  bytes: Buffer.from("late"),
                }),
              ]),
            );
          } else {
            socket.write(encodedEnd);
          }
        });
      });
    });
    const clientDirectory = join(directory, "client");
    const receipt = await new DaemonTransport({
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
      await spool.append({
        sequence: 1,
        stream: "stderr",
        bytes: Buffer.from("spill"),
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
      const receipt = await new DaemonTransport({
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
    const receipt = await new DaemonTransport({
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
    await spool.append({
      sequence: 1,
      stream: "stderr",
      bytes: Buffer.from("spill"),
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
    const receipt = await new DaemonTransport({
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

    const receipt = await new DaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request);

    await expect(receipt.completion).rejects.toMatchObject({
      code: "closed",
      delivery: "accepted",
      retrySafe: false,
      authenticatedInstanceId: request.instanceId,
    } satisfies Partial<DaemonTransportError>);
  });

  it("disables accepted execution reattachment without disabling fetch policy", async () => {
    let executeCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => {
        executeCount += 1;
        socket.end(frame(accepted()));
      });
    });

    const receipt = await new DaemonTransport(
      policyWith({}, { postAcceptanceExecutionReattachmentLimit: 0 }),
    ).execute(endpoint, request);

    await expect(receipt.completion).rejects.toMatchObject({
      code: "closed",
      delivery: "accepted",
      authenticatedInstanceId: request.instanceId,
    } satisfies Partial<DaemonTransportError>);
    expect(executeCount).toBe(1);
  });

  it("honors accepted execution reattachment limits greater than one", async () => {
    let executeCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => {
        executeCount += 1;
        if (executeCount < 3) {
          socket.end(frame(accepted()));
          return;
        }
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
        );
      });
    });

    const receipt = await new DaemonTransport(
      policyWith({}, { postAcceptanceExecutionReattachmentLimit: 2 }),
    ).execute(endpoint, request);

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
    expect(executeCount).toBe(3);
  });

  it("rethrows the first accepted close when reattachment fails before acceptance", async () => {
    let executeCount = 0;
    const endpoint = await rawExecutionServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => {
        executeCount += 1;
        if (executeCount === 1) socket.end(frame(accepted()));
        else socket.end();
      });
    });

    const receipt = await new DaemonTransport(
      policyWith({}, { postAcceptanceExecutionReattachmentLimit: 1 }),
    ).execute(endpoint, request);

    await expect(receipt.completion).rejects.toMatchObject({
      code: "closed",
      delivery: "accepted",
      message: "Daemon connection ended after acceptance before completion",
      authenticatedInstanceId: request.instanceId,
    } satisfies Partial<DaemonTransportError>);
    expect(executeCount).toBe(2);
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

    const receipt = await new DaemonTransport({ requestTimeoutMs: 100 }).execute(endpoint, request);

    const completion = await receipt.completion;

    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
    expect(executeCount).toBe(2);
    if (completion.status === "completed") await completion.result.output.dispose();
  });

  it("reattaches the same request with fresh output and disposes the interrupted capture once", async () => {
    const directory = mkdtempSync(join(tmpdir(), "symnav-isolated-reattach-"));
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
      bytes: Buffer.from("partial"),
    });
    const manifest = await spool.finish(0);
    const executeRequests: unknown[] = [];
    const dispose = vi.spyOn(DaemonClientResultCapture.prototype, "dispose");
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
        executeRequests.push(message);
        if (executeRequests.length === 1) {
          void firstEncodedRecord(spool, manifest).then((record) =>
            socket.end(Buffer.concat([frame(accepted()), frame(resultManifest(manifest)), record])),
          );
          return;
        }
        void encodedResult(spool, manifest).then((result) => socket.end(result));
      });
    });

    const receipt = await new DaemonTransport(
      policyWith({}, { resultTransferResumeLimitPerExecutionAttempt: 0 }),
    ).execute(endpoint, request);
    const completion = await receipt.completion;

    expect(executeRequests).toEqual([request, request]);
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(completion).toMatchObject({ status: "completed", result: { exitCode: 0 } });
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

    const receipt = await new DaemonTransport().execute(endpoint, request);
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
    const transport = new DaemonTransport({ requestTimeoutMs: 100 });

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
  manifest: import("../delivery/completion-spool.js").CompletionSpoolManifest,
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
  manifest: import("../delivery/completion-spool.js").CompletionSpoolManifest,
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
  spool: import("../delivery/completion-spool.js").CompletionSpool,
  transferId: string,
  offset: number,
  stopBefore = Number.POSITIVE_INFINITY,
): Promise<void> {
  for await (const record of spool.read(offset)) {
    if (record.sequence >= stopBefore || socket.destroyed || !socket.writable) return;
    socket.write(
      wireCodec.encodeServerMessage({
        transferId,
        requestId: request.requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      }),
    );
  }
}

async function encodedResult(
  spool: import("../delivery/completion-spool.js").CompletionSpool,
  manifest: import("../delivery/completion-spool.js").CompletionSpoolManifest,
): Promise<Buffer> {
  const chunks = [frame(accepted()), frame(resultManifest(manifest))];
  for await (const record of spool.read(0)) {
    chunks.push(
      Buffer.from(
        wireCodec.encodeServerMessage({
          transferId: manifest.transferId,
          requestId: request.requestId,
          offset: record.sequence,
          sequence: record.sequence,
          stream: record.stream,
          bytes: record.bytes,
        }),
      ),
    );
  }
  chunks.push(frame(resultEnd(manifest)));
  return Buffer.concat(chunks);
}

async function firstEncodedRecord(
  spool: import("../delivery/completion-spool.js").CompletionSpool,
  manifest: import("../delivery/completion-spool.js").CompletionSpoolManifest,
): Promise<Buffer> {
  for await (const record of spool.read(0)) {
    return Buffer.from(
      wireCodec.encodeServerMessage({
        transferId: manifest.transferId,
        requestId: request.requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      }),
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

function policyWith(
  transport: { readonly executionAdmissionTimeoutMs?: number } = {},
  delivery: {
    readonly postAcceptanceExecutionReattachmentLimit?: number;
    readonly resultTransferResumeLimitPerExecutionAttempt?: number;
  } = {},
) {
  return DaemonPolicyTestFactory.withOverrides(DaemonPolicy.currentSystem(), {
    transport,
    delivery,
  }).values;
}
`},"receiver-tests":{key:"receiver-tests",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/result-transfer-receiver.test.ts",sha256:"2abf86050f5d32c3a5320e6a14524590e86b8d5061fb6f2aa52753b8d5edafcf",text:`import { createHash } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import type { DaemonExecutorExecutionResult, DaemonOutputRecord } from "@symnav/daemon";
import type { DaemonSequencedOutputRecord } from "../daemon-executor.js";
import type { CompletionSpoolManifest } from "../delivery/completion-spool.js";
import type { DaemonExecutionServerFrame, DaemonResultChunk } from "./protocol.js";
import type {
  DaemonCapturedOutput,
  DaemonCapturedOutputSummary,
  DaemonOutputCapture,
} from "./client-result-capture.js";
import { DaemonResultTransferReceiver } from "./result-transfer-receiver.js";

describe("DaemonResultTransferReceiver", () => {
  it("requires one matching manifest at the start of every connection", async () => {
    const output = new FakeCapture(summary([]));
    const receiver = new DaemonResultTransferReceiver("request", output);

    await expect(receiver.acceptChunk(chunk(0))).rejects.toThrow(
      "Daemon returned an invalid result chunk",
    );
    expect(() => receiver.acceptEnd(resultEnd(manifest()))).toThrow(
      "Daemon result transfer did not match its manifest",
    );
    expect(() =>
      receiver.acceptManifest(resultManifest(manifest(), { requestId: "other" })),
    ).toThrow("Daemon result manifest has invalid coordinates");
    receiver.acceptManifest(resultManifest(manifest()));
    expect(() => receiver.acceptManifest(resultManifest(manifest()))).toThrow(
      "Duplicate result manifest",
    );

    receiver.beginConnection();
    expect(receiver.manifest).toEqual(manifest());
    expect(receiver.nextOffset).toBe(0);
    expect(receiver.terminal).toBe(false);
    receiver.acceptManifest(resultManifest(manifest()));

    receiver.beginConnection();
    expect(() =>
      receiver.acceptManifest(resultManifest({ ...manifest(), transferId: "different" })),
    ).toThrow("Daemon resumed with a different result manifest");
  });

  it.each([
    { requestId: "other" },
    { instanceId: "other" },
    { exitCode: 1 },
    { rawBytes: 1 },
    { recordCount: 1 },
    { sha256: "f".repeat(64) },
  ] as const)("rejects a changed resumed manifest: %j", (change) => {
    const receiver = new DaemonResultTransferReceiver("request", new FakeCapture(summary([])));
    receiver.acceptManifest(resultManifest(manifest()));
    receiver.beginConnection();

    expect(() => receiver.acceptManifest(resultManifest({ ...manifest(), ...change }))).toThrow(
      "Daemon resumed with a different result manifest",
    );
  });

  it("advances its offset only after the matching record is durably appended", async () => {
    let releaseAppend!: () => void;
    const appendGate = new Promise<void>((resolve) => {
      releaseAppend = resolve;
    });
    const output = new FakeCapture(summary([]), async () => appendGate);
    const receiver = new DaemonResultTransferReceiver("request", output);
    receiver.acceptManifest(resultManifest(manifest({ recordCount: 1, rawBytes: 1 })));

    const accepting = receiver.acceptChunk(chunk(0));
    expect(receiver.nextOffset).toBe(0);
    releaseAppend();
    await accepting;

    expect(receiver.nextOffset).toBe(1);
    expect(output.appended).toEqual([{ sequence: 0, stream: "stdout", bytes: Buffer.from("a") }]);
    receiver.beginConnection();
    expect(receiver.manifest).toEqual(manifest({ recordCount: 1, rawBytes: 1 }));
    expect(receiver.nextOffset).toBe(1);
    expect(receiver.terminal).toBe(false);
    receiver.acceptManifest(resultManifest(manifest({ recordCount: 1, rawBytes: 1 })));
  });

  it.each([
    { transferId: "other" },
    { requestId: "other" },
    { offset: 1 },
    { sequence: 1 },
  ] as const)("rejects invalid chunk coordinates: %j", async (change) => {
    const receiver = new DaemonResultTransferReceiver("request", new FakeCapture(summary([])));
    receiver.acceptManifest(resultManifest(manifest({ recordCount: 1, rawBytes: 1 })));

    await expect(receiver.acceptChunk({ ...chunk(0), ...change })).rejects.toThrow(
      "Daemon returned an invalid result chunk",
    );
  });

  it("requires one matching end after every manifest record", async () => {
    const records = [chunk(0), chunk(1, "stderr")];
    const expectedSummary = summary(records);
    const expectedManifest = manifest(expectedSummary);
    const receiver = new DaemonResultTransferReceiver("request", new FakeCapture(expectedSummary));
    receiver.acceptManifest(resultManifest(expectedManifest));
    expect(() => receiver.acceptEnd(resultEnd(expectedManifest))).toThrow(
      "Daemon result transfer did not match its manifest",
    );
    for (const record of records) await receiver.acceptChunk(record);
    receiver.acceptEnd(resultEnd(expectedManifest));

    expect(receiver.terminal).toBe(true);
    await expect(receiver.acceptChunk(chunk(2))).rejects.toThrow(
      "Daemon returned an invalid result chunk",
    );
    expect(() => receiver.acceptEnd(resultEnd(expectedManifest))).toThrow(
      "Daemon result transfer did not match its manifest",
    );
  });

  it.each([
    { instanceId: "other" },
    { transferId: "other" },
    { requestId: "other" },
    { rawBytes: 2 },
    { recordCount: 2 },
    { sha256: "f".repeat(64) },
  ] as const)("rejects invalid end coordinates: %j", (change) => {
    const receiver = new DaemonResultTransferReceiver("request", new FakeCapture(summary([])));
    receiver.acceptManifest(resultManifest(manifest()));

    expect(() => receiver.acceptEnd({ ...resultEnd(manifest()), ...change })).toThrow(
      "Daemon result transfer did not match its manifest",
    );
  });

  it("returns the captured result only after terminal summary validation", async () => {
    const expectedSummary = summary([]);
    const output = new FakeCapture(expectedSummary);
    const receiver = new DaemonResultTransferReceiver("request", output);

    await expect(receiver.finish()).rejects.toThrow("Daemon result transfer is incomplete");
    receiver.acceptManifest(resultManifest(manifest(expectedSummary)));
    receiver.acceptEnd(resultEnd(manifest(expectedSummary)));

    await expect(receiver.finish()).resolves.toBe(output.result);
    expect(output.finishExitCodes).toEqual([0]);
  });

  it("disposes a captured result that fails digest validation", async () => {
    const output = new FakeCapture({ ...summary([]), sha256: "f".repeat(64) });
    const receiver = new DaemonResultTransferReceiver("request", output);
    receiver.acceptManifest(resultManifest(manifest()));
    receiver.acceptEnd(resultEnd(manifest()));

    await expect(receiver.finish()).rejects.toThrow(
      "Daemon result transfer failed digest validation",
    );
    expect(output.resultOutput.dispose).toHaveBeenCalledOnce();
  });

  it("disposes abandoned partial capture once but leaves completed output caller-owned", async () => {
    const partial = new FakeCapture(summary([]));
    const partialReceiver = new DaemonResultTransferReceiver("request", partial);
    partialReceiver.acceptManifest(resultManifest(manifest()));
    await partialReceiver.dispose();
    await partialReceiver.dispose();
    expect(partial.disposeCalls).toBe(1);

    const completed = new FakeCapture(summary([]));
    const completedReceiver = new DaemonResultTransferReceiver("request", completed);
    completedReceiver.acceptManifest(resultManifest(manifest()));
    completedReceiver.acceptEnd(resultEnd(manifest()));
    await completedReceiver.finish();
    await completedReceiver.dispose();
    expect(completed.disposeCalls).toBe(0);
    expect(completed.resultOutput.dispose).not.toHaveBeenCalled();
  });
});

class FakeCapture implements DaemonOutputCapture {
  readonly appended: DaemonSequencedOutputRecord[] = [];
  readonly finishExitCodes: number[] = [];
  readonly resultOutput = new FakeOutput();
  readonly result: DaemonExecutorExecutionResult = { exitCode: 0, output: this.resultOutput };
  disposeCalls = 0;

  constructor(
    private readonly capturedSummary: DaemonCapturedOutputSummary,
    private readonly appendOperation: () => Promise<void> = () => Promise.resolve(),
  ) {}

  async append(record: DaemonSequencedOutputRecord): Promise<void> {
    await this.appendOperation();
    this.appended.push({ ...record, bytes: Buffer.from(record.bytes) });
  }

  finish(exitCode: number): Promise<DaemonCapturedOutput> {
    this.finishExitCodes.push(exitCode);
    return Promise.resolve({
      result: this.result,
      summary: this.capturedSummary,
    });
  }

  dispose(): Promise<void> {
    this.disposeCalls += 1;
    return Promise.resolve();
  }
}

class FakeOutput {
  readonly dispose = vi.fn(() => Promise.resolve());

  async *records(): AsyncIterable<DaemonOutputRecord> {}
}

function manifest(overrides: Partial<CompletionSpoolManifest> = {}): CompletionSpoolManifest {
  return {
    transferId: "transfer",
    requestId: "request",
    instanceId: "instance",
    exitCode: 0,
    rawBytes: 0,
    recordCount: 0,
    sha256: createHash("sha256").digest("hex"),
    ...overrides,
  };
}

function resultManifest(
  value: CompletionSpoolManifest,
  overrides: Partial<ResultManifestFrame> = {},
): ResultManifestFrame {
  return {
    kind: "result-manifest",
    instanceId: value.instanceId,
    processToken: "token",
    requestId: value.requestId,
    manifest: value,
    ...overrides,
  };
}

function resultEnd(
  value: CompletionSpoolManifest,
): Extract<DaemonExecutionServerFrame, { readonly kind: "result-end" }> {
  return {
    kind: "result-end",
    instanceId: value.instanceId,
    processToken: "token",
    requestId: value.requestId,
    transferId: value.transferId,
    rawBytes: value.rawBytes,
    recordCount: value.recordCount,
    sha256: value.sha256,
  };
}

type ResultManifestFrame = Extract<
  DaemonExecutionServerFrame,
  { readonly kind: "result-manifest" }
>;

function chunk(sequence: number, stream: "stdout" | "stderr" = "stdout"): DaemonResultChunk {
  return {
    transferId: "transfer",
    requestId: "request",
    offset: sequence,
    sequence,
    stream,
    bytes: Buffer.from(String.fromCharCode(97 + sequence)),
  };
}

function summary(records: readonly DaemonResultChunk[]): DaemonCapturedOutputSummary {
  const hash = createHash("sha256");
  let rawBytes = 0;
  for (const record of records) {
    const encoded = Buffer.alloc(5 + record.bytes.byteLength);
    encoded.writeUInt8(record.stream === "stdout" ? 0 : 1, 0);
    encoded.writeUInt32BE(record.bytes.byteLength, 1);
    Buffer.from(record.bytes).copy(encoded, 5);
    hash.update(encoded);
    rawBytes += record.bytes.byteLength;
  }
  return { rawBytes, recordCount: records.length, sha256: hash.digest("hex") };
}
`},"execution-tests":{key:"execution-tests",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/transport/execution-client.test.ts",sha256:"dd8dfd53e41987b1bf4e1b110d561870fbb02ed7075a2a2999e4f9e1662f1b52",text:`import { describe, expect, it } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import { DaemonExecutionClient } from "./execution-client.js";
import type { DaemonOutputCapture } from "./client-result-capture.js";
import {
  DAEMON_PROTOCOL_VERSION,
  type DaemonExecuteRequest,
  type DaemonExecutionServerFrame,
} from "./protocol.js";
import { DaemonProtocolValidator } from "./protocol-validator.js";
import type { DaemonSocketClient, DaemonSocketConnection } from "./contracts.js";
import { DaemonTransportError } from "./transport-error.js";
import { DaemonWireCodec } from "./wire-codec.js";

describe("DaemonExecutionClient", () => {
  it("owns one accepted execution attempt through terminal failure", async () => {
    const policy = DaemonPolicy.currentSystem();
    const codec = executionCodec();
    const request = executionRequest();
    const connection = new ScriptedDaemonSocketConnection([
      Buffer.concat([
        codec.encodeControl({
          kind: "accepted",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          acceptedAt: 10,
          queuePosition: 0,
        } satisfies DaemonExecutionServerFrame),
        codec.encodeControl({
          kind: "execution-failed",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          code: "internal",
        } satisfies DaemonExecutionServerFrame),
      ]),
    ]);
    const sockets = new RecordingDaemonSocketClient([connection]);
    const output = new RecordingDaemonOutputCapture();
    const acknowledgements = new RecordingResultAcknowledger();
    const client = new DaemonExecutionClient({
      sockets,
      lifecycle: acknowledgements,
      codec,
      validator: new DaemonProtocolValidator(),
      createOutput: () => output,
      transportPolicy: policy.values.transport,
      deliveryPolicy: policy.values.delivery,
    });

    const receipt = await client.execute("daemon-endpoint", request);

    expect(receipt.acceptance).toEqual({
      requestId: request.requestId,
      instanceId: request.instanceId,
      acceptedAt: 10,
      queuePosition: 0,
    });
    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
    expect(sockets.calls).toEqual([
      {
        endpoint: "daemon-endpoint",
        timeoutMs: policy.values.transport.executionAdmissionTimeoutMs,
      },
    ]);
    expect(connection.writes).toEqual([codec.encodeControl(request)]);
    expect(connection.disableTimeoutCount).toBe(1);
    expect(connection.endCount).toBe(1);
    expect(output.disposeCount).toBe(1);
    expect(acknowledgements.count).toBe(0);
  });

  it("reattaches an accepted close with the identical execute request", async () => {
    const policy = DaemonPolicy.currentSystem();
    const codec = executionCodec();
    const request = executionRequest();
    const first = new ScriptedDaemonSocketConnection([
      codec.encodeControl({
        kind: "accepted",
        instanceId: request.instanceId,
        processToken: request.processToken,
        requestId: request.requestId,
        acceptedAt: 10,
        queuePosition: 0,
      } satisfies DaemonExecutionServerFrame),
    ]);
    const second = new ScriptedDaemonSocketConnection([
      Buffer.concat([
        codec.encodeControl({
          kind: "accepted",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          acceptedAt: 10,
          queuePosition: 0,
        } satisfies DaemonExecutionServerFrame),
        codec.encodeControl({
          kind: "execution-failed",
          instanceId: request.instanceId,
          processToken: request.processToken,
          requestId: request.requestId,
          code: "internal",
        } satisfies DaemonExecutionServerFrame),
      ]),
    ]);
    const sockets = new RecordingDaemonSocketClient([first, second]);
    const outputs: RecordingDaemonOutputCapture[] = [];
    const client = new DaemonExecutionClient({
      sockets,
      lifecycle: new RecordingResultAcknowledger(),
      codec,
      validator: new DaemonProtocolValidator(),
      createOutput: () => {
        const output = new RecordingDaemonOutputCapture();
        outputs.push(output);
        return output;
      },
      transportPolicy: policy.values.transport,
      deliveryPolicy: policy.values.delivery,
    });

    const receipt = await client.execute("daemon-endpoint", request);

    await expect(receipt.completion).resolves.toEqual({ status: "failed", code: "internal" });
    expect(sockets.calls).toHaveLength(2);
    expect(first.writes).toEqual([codec.encodeControl(request)]);
    expect(second.writes).toEqual([codec.encodeControl(request)]);
    expect(outputs.map((output) => output.disposeCount)).toEqual([1, 1]);
  });

  it("retains the first accepted close after exhausting accepted reattachments", async () => {
    const policy = DaemonPolicy.currentSystem();
    const codec = executionCodec();
    const request = executionRequest();
    const firstClose = new DaemonTransportError(
      "closed",
      "accepted",
      "Initial accepted connection closed",
      request.instanceId,
    );
    const finalClose = new DaemonTransportError(
      "closed",
      "accepted",
      "Final accepted reattachment closed",
      request.instanceId,
    );
    const acceptance = codec.encodeControl({
      kind: "accepted",
      instanceId: request.instanceId,
      processToken: request.processToken,
      requestId: request.requestId,
      acceptedAt: 10,
      queuePosition: 0,
    } satisfies DaemonExecutionServerFrame);
    const first = new ScriptedDaemonSocketConnection([acceptance], firstClose);
    const final = new ScriptedDaemonSocketConnection([acceptance], finalClose);
    const sockets = new RecordingDaemonSocketClient([first, final]);
    const outputs: RecordingDaemonOutputCapture[] = [];
    const client = new DaemonExecutionClient({
      sockets,
      lifecycle: new RecordingResultAcknowledger(),
      codec,
      validator: new DaemonProtocolValidator(),
      createOutput: () => {
        const output = new RecordingDaemonOutputCapture();
        outputs.push(output);
        return output;
      },
      transportPolicy: policy.values.transport,
      deliveryPolicy: {
        ...policy.values.delivery,
        postAcceptanceExecutionReattachmentLimit: 1,
      },
    });

    const receipt = await client.execute("daemon-endpoint", request);
    const completionError = await receipt.completion.catch((error: unknown) => error);

    expect(completionError).toBe(firstClose);
    expect(completionError).toMatchObject({
      code: "closed",
      delivery: "accepted",
      message: "Initial accepted connection closed",
      authenticatedInstanceId: request.instanceId,
      retrySafe: false,
    } satisfies Partial<DaemonTransportError>);
    expect(completionError).not.toBe(finalClose);
    expect(sockets.calls).toHaveLength(2);
    expect(first.writes).toEqual([codec.encodeControl(request)]);
    expect(final.writes).toEqual([codec.encodeControl(request)]);
    expect(outputs.map((output) => output.disposeCount)).toEqual([1, 1]);
  });
});

class RecordingDaemonSocketClient implements DaemonSocketClient {
  readonly calls: { readonly endpoint: string; readonly timeoutMs?: number }[] = [];
  private nextConnection = 0;

  constructor(private readonly connections: readonly DaemonSocketConnection[]) {}

  connect(endpoint: string, timeoutMs?: number): Promise<DaemonSocketConnection> {
    this.calls.push({ endpoint, ...(timeoutMs === undefined ? {} : { timeoutMs }) });
    const connection = this.connections[this.nextConnection];
    this.nextConnection += 1;
    if (connection === undefined) return Promise.reject(new Error("Unexpected daemon connection"));
    return Promise.resolve(connection);
  }
}

class ScriptedDaemonSocketConnection implements DaemonSocketConnection {
  readonly writes: Uint8Array[] = [];
  disableTimeoutCount = 0;
  endCount = 0;
  destroyCount = 0;
  readonly incoming: AsyncIterable<Uint8Array>;

  constructor(bytes: readonly Uint8Array[], terminalError?: Error) {
    this.incoming = ScriptedDaemonSocketConnection.stream(bytes, terminalError);
  }

  write(frame: Uint8Array): void {
    this.writes.push(frame);
  }

  disableTimeout(): void {
    this.disableTimeoutCount += 1;
  }

  end(): void {
    this.endCount += 1;
  }

  destroy(): void {
    this.destroyCount += 1;
  }

  private static async *stream(
    bytes: readonly Uint8Array[],
    terminalError?: Error,
  ): AsyncIterable<Uint8Array> {
    yield* bytes;
    if (terminalError !== undefined) throw terminalError;
  }
}

class RecordingDaemonOutputCapture implements DaemonOutputCapture {
  disposeCount = 0;

  append(): Promise<void> {
    return Promise.resolve();
  }

  finish(): Promise<never> {
    return Promise.reject(new Error("Unexpected output completion"));
  }

  dispose(): Promise<void> {
    this.disposeCount += 1;
    return Promise.resolve();
  }
}

class RecordingResultAcknowledger {
  count = 0;

  acknowledgeResult(): Promise<void> {
    this.count += 1;
    return Promise.resolve();
  }
}

function executionCodec(): DaemonWireCodec {
  const policy = DaemonPolicy.currentSystem();
  return new DaemonWireCodec({
    maximumJsonPayloadBytes: policy.values.transport.maximumJsonPayloadBytes,
    maximumExecutionControlPayloadBytes:
      policy.values.transport.maximumExecutionControlPayloadBytes,
    maximumChunkRawBytes: policy.values.output.maximumChunkRawBytes,
  });
}

function executionRequest(): DaemonExecuteRequest {
  return {
    kind: "execute",
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    instanceId: "instance",
    processToken: "token",
    requestId: "request",
    commandName: "overview",
    request: {
      argv: ["overview", "src/a.ts"],
      cwd: "/repo",
      telemetryEnabled: false,
      executionMode: "warm",
    },
  };
}
`},session:{key:"session",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/execution/accepted-execution-session.ts",sha256:"a2dc1fda886eaca80cacd24c6e02580431a5797c4080a6106e725608ea51b860",text:`import { DaemonExecutionFailures } from "../daemon-execution-failure.js";
import type { AcceptedRequestCompatibility } from "../daemon-admission.js";
import type {
  AcceptedExecutionAdmission,
  AcceptedExecutionSessionOptions,
  AcceptedExecutionSnapshot,
  AuthenticatedDaemonExecuteRequest,
} from "./accepted-execution-session-contracts.js";
import { CompletionSpoolCapacityError } from "../delivery/completion-spool.js";
import type { DaemonCompletionWriter } from "../delivery/delivery-session.js";
import { DaemonLogger } from "../diagnostics/logger.js";
import { DaemonNavigationWorkerExitedError } from "../worker/navigation-worker.js";
import type { DaemonOperationTrace } from "../diagnostics/operation-observer.js";
import type {
  DaemonExecuteRequest,
  DaemonExecutionStatus,
  DaemonWorkerReplacementCause,
} from "../transport/protocol.js";

export class AcceptedExecutionSession {
  private lastNavigationAt: number | undefined;
  private lastCompletedMonotonicAt: number | undefined;
  private readonly resourceInterruptedRequests = new Set<string>();

  constructor(private readonly options: AcceptedExecutionSessionOptions) {}

  get snapshot(): AcceptedExecutionSnapshot {
    return Object.freeze({
      queue: this.options.queue.snapshot,
      ...(this.lastNavigationAt === undefined ? {} : { lastNavigationAt: this.lastNavigationAt }),
      ...(this.lastCompletedMonotonicAt === undefined
        ? {}
        : { lastCompletedMonotonicAt: this.lastCompletedMonotonicAt }),
    });
  }

  compatibilityFor(request: DaemonExecuteRequest): AcceptedRequestCompatibility {
    return this.options.ledger.compatibilityFor(
      request.requestId,
      request.commandName,
      request.request,
    );
  }

  accept(request: AuthenticatedDaemonExecuteRequest): AcceptedExecutionAdmission {
    const existing = this.options.ledger.entryFor(request.requestId);
    const entry = this.options.ledger.accept(
      request.requestId,
      request.commandName,
      request.request,
    );
    const acceptance = Object.freeze({
      requestId: request.requestId,
      acceptedAt: entry.acceptedAt,
      queuePosition: entry.queuePosition,
    });
    if (existing !== undefined) {
      return Object.freeze({ newlyAccepted: false, entry, acceptance });
    }
    this.lastNavigationAt = this.options.clock.wallNowMs();
    this.options.lifetime.navigationAccepted();
    const trace = this.options.delivery.beginAcceptedTrace(
      request.requestId,
      request.commandName,
      entry.queuePosition,
      this.options.resourceSupervisor.snapshot.generation,
    );
    void this.executeAccepted(request, trace);
    return Object.freeze({ newlyAccepted: true, entry, acceptance });
  }

  status(requestId: string): DaemonExecutionStatus {
    return this.options.ledger.status(requestId);
  }

  markActiveResourceInterrupted(cause: DaemonWorkerReplacementCause): void {
    if (cause === "worker-exit") return;
    const activeRequest = this.options.queue.snapshot.active;
    if (activeRequest !== undefined) this.resourceInterruptedRequests.add(activeRequest.requestId);
  }

  scheduleAtTurnBoundary(operation: () => Promise<void>): Promise<void> {
    return this.options.queue.scheduleAtTurnBoundary(operation);
  }

  drain(): Promise<void> {
    return this.options.queue.drain();
  }

  close(): void {
    this.options.queue.close();
  }

  private async executeAccepted(
    request: AuthenticatedDaemonExecuteRequest,
    trace: DaemonOperationTrace,
  ): Promise<void> {
    let completion: DaemonCompletionWriter | undefined;
    try {
      await this.options.queue.enqueue(
        {
          requestId: request.requestId,
          command: request.commandName,
          acceptedAt: this.options.clock.monotonicNowMs(),
        },
        async () => {
          trace.turnStarted(this.options.resourceSupervisor.snapshot.generation);
          try {
            completion = await this.options.delivery.createCompletion(request.requestId);
            this.options.ledger.markRunning(request.requestId, this.options.clock.wallNowMs());
            const response = await this.options.worker.execute(
              request.requestId,
              { commandName: request.commandName, request: request.request },
              completion,
            );
            this.options.resourceSupervisor.workerHeapReported(
              response.generation,
              response.resources.workerHeapUsedBytes,
              response.resources.workerHeapLimitBytes,
              response.resources.peakWorkerHeapUsedBytes,
            );
            trace.workerCompleted(
              {
                freshnessMs: response.durations.freshnessMs,
                navigationMs: response.durations.navigationMs,
                renderMs: response.durations.renderMs,
                workerOutputMs: response.durations.outputMs,
              },
              response.refresh,
            );
            await completion.finish(response.result.exitCode);
            this.lastCompletedMonotonicAt = this.options.clock.monotonicNowMs();
            const workspaceExists = await this.options.processLifecycle.workspaceExists();
            trace.executionTerminated("completed");
            this.options.ledger.complete(
              request.requestId,
              request.requestId,
              this.options.clock.wallNowMs(),
            );
            await this.options.delivery.trackedCompletion(request.requestId);
            if (!workspaceExists) {
              await this.options.processLifecycle.workspaceDeletedAfterDelivery();
            }
          } finally {
            this.scheduleTurnCompleteResourceSample();
          }
        },
      );
    } catch (error) {
      trace.executionTerminated("failed");
      this.recordFailure("request", "internal", error);
      const shutdown = this.options.processLifecycle.shutdownSnapshot();
      const code = DaemonExecutionFailures.classify({
        resourceInterrupted: this.resourceInterruptedRequests.delete(request.requestId),
        responseCapacityExceeded: error instanceof CompletionSpoolCapacityError,
        workerExited: error instanceof DaemonNavigationWorkerExitedError,
        ...(shutdown.failureCode === undefined
          ? {}
          : { shutdownFailureCode: shutdown.failureCode }),
        shutdownStarted: shutdown.started,
      });
      await completion?.dispose().catch((cleanupError) => {
        this.recordFailure("completion-cleanup", "internal", cleanupError);
      });
      this.options.ledger.fail(request.requestId, code, this.options.clock.wallNowMs());
    } finally {
      if (this.options.queue.isIdle) this.options.lifetime.queueBecameIdle();
    }
  }

  private scheduleTurnCompleteResourceSample(): void {
    void this.options.queue
      .scheduleAtTurnBoundary(() => this.options.resourceSupervisor.sampleAtTurnBoundary())
      .catch((error) => {
        this.recordFailure("resource-sample", "operation-failed", error);
      })
      .finally(() => {
        if (this.options.queue.isIdle) this.options.lifetime.queueBecameIdle();
      });
  }

  private recordFailure(
    operation: "request" | "completion-cleanup" | "resource-sample",
    failureCode: "internal" | "operation-failed",
    error: unknown,
  ): void {
    this.options.diagnostics.record({
      kind: "failure",
      operation,
      failureCode,
      errorName: DaemonLogger.errorName(error),
    });
  }
}
`},policy:{key:"policy",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/daemon-policy.ts",sha256:"449354742f82a5bd535aebb1f41919b5424929856acff468375ecac204e285d3",text:`const MEBIBYTE = 1024 * 1024;

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

export interface SerializedDaemonPolicy {
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

  private static clamp(value: number, minimum: number, maximum: number): number {
    return Math.max(minimum, Math.min(maximum, value));
  }

  private static freeze(values: DaemonPolicyValues): DaemonPolicyValues {
    for (const section of Object.values(values)) Object.freeze(section);
    return Object.freeze(values);
  }
}

export class DaemonPolicyCodec {
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

  static deserialize(value: unknown): DaemonPolicy {
    const PolicyConstructor = DaemonPolicy as unknown as new (
      values: DaemonPolicyValues,
    ) => DaemonPolicy;
    return new PolicyConstructor(DaemonPolicyCodec.parse(value));
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
`},"policy-record":{key:"policy-record",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"plans/005/daemon-policy.md",sha256:"99407e4b40068e01e53cf4baa6a20f17791eb0062508817ec5f6e8151071c728",text:"# Daemon policy\n\n`DaemonPolicy` is one immutable, complete snapshot. The CLI creates it from system memory and passes the same serialized values through daemon process and worker boundaries. Tests may replace individual values through `DaemonPolicyTestFactory`; users have no flag, environment variable, or configuration file for these values.\n\n| Policy path or recipe | Default or derivation | Applies to | Reason | Behavior oracle |\n| --- | --- | --- | --- | --- |\n| `transport.singleResponseTimeoutMs` | 250 ms | Ordinary lifecycle and execution-status exchanges | Bound one-response local socket waits | Transport timeout characterization |\n| `transport.statusResponseTimeoutMs` | 100 ms | Status observer lifecycle exchange | Keep status aggregation responsive independently of routing | Status timeout characterization |\n| `transport.executionAdmissionTimeoutMs` | 5 s | Execute submission until acceptance | Bound admission without timing accepted completion | Long-command transport characterization |\n| `transport.maximumJsonPayloadBytes` | 8 MiB | Ordinary JSON control frames | Bound decoded control input | Transport frame-cap tests |\n| `transport.maximumExecutionControlPayloadBytes` | 256 KiB | Execution transfer control frames | Keep binary-transfer control bounded separately | Transfer codec tests |\n| `startup.coordinationGraceMs` | 15 s | Startup ownership and missing-owner observation | Preserve election recovery grace | Registry/startup suites |\n| `startup.heartbeatIntervalMs` | 100 ms | Startup-owner heartbeat | Maintain live ownership while warming | Startup heartbeat tests |\n| `startup.authorizationPollIntervalMs` | 10 ms | Process authorization wait | Preserve the distinct fast authorization cadence | Authorization cadence characterization |\n| `startup.observationPollIntervalMs` | 20 ms | Launcher readiness observation | Preserve current readiness polling cadence | Startup observation tests |\n| `startup.previousInstanceTerminationTimeoutMs` | 5 min | Replacement of a previous instance | Allow controlled termination before new ownership proceeds | Startup replacement tests |\n| `startup.childFailureRetryLimit` | 1 retry | Explicit startup child failure | Preserve one fresh launch after a failed child | Startup retry tests |\n| `shutdown.idleTimeoutMs` | 30 min | Warm daemon idle lifetime | Release retained resources after inactivity | Lifetime tests |\n| `shutdown.stopTimeoutMs` | 5 s | User-requested stop | Bound graceful stop and forced escalation together | Controller stop tests |\n| `shutdown.forcedTerminationReserveMaximumMs` | 500 ms | Stop escalation reserve | Leave bounded time for authenticated force termination | Controller deadline tests |\n| `recipe.forcedTerminationReserve` | `min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2))` | Effective stop escalation reserve | Preserve small overridden stop windows | Controller deadline tests |\n| `shutdown.controllerPollIntervalMs` | 20 ms | Controller process/registry observation | Preserve control-plane polling cadence | Controller polling tests |\n| `shutdown.processSignalExitTimeoutMs` | 500 ms after SIGTERM and 500 ms after SIGKILL | Direct process termination | Give each signal a bounded exit interval | Process terminator tests |\n| `shutdown.processExitPollIntervalMs` | 20 ms | Direct process termination | Preserve process-exit polling cadence independently | Process terminator tests |\n| `shutdown.resourceDrainAcknowledgementGraceMs` | 250 ms | Completion acknowledgement during drain | Permit an attached client to acknowledge before cleanup | Shutdown acknowledgement tests |\n| `shutdown.resourceDrainAcknowledgementPollIntervalMs` | 5 ms | Completion acknowledgement during drain | Preserve the distinct fast acknowledgement cadence | Acknowledgement cadence characterization |\n| `delivery.postAcceptanceExecutionReattachmentLimit` | 1 reattachment | Authenticated close after acceptance | Recover the accepted request without local replay | Reattachment tests |\n| `delivery.resultTransferResumeLimitPerExecutionAttempt` | 1 fetch resume per execute attempt | Interrupted manifest transfer | Resume one transfer independently for each execute attempt | Two-scope resume tests |\n| `output.maximumChunkRawBytes` | 64 KiB | Worker and result chunks | Bound one raw output record | Chunk codec and spool tests |\n| `output.inlineRawBytes` | 256 KiB | Inline result storage | Avoid files for small results | Spool threshold tests |\n| `output.maximumResultRawBytes` | 256 MiB | One completed result | Bound retained output for one request | Result-cap tests |\n| `output.maximumAggregateSpoolRawBytes` | 512 MiB | All retained completions for one daemon | Bound aggregate spool pressure | Aggregate-cap tests |\n| `recipe.effectiveMemorySelection` | Use constrained bytes only when positive and smaller than total bytes; preserve selected raw bytes | Memory derivation input | Respect real lower constraints without rounding identity | Policy derivation table |\n| `resources.effectiveMemoryBytes` | Selected raw effective bytes | Resource reports and derived thresholds | Preserve non-MiB-aligned system information exactly | Policy derivation table |\n| `recipe.effectiveMemoryMiB` | `max(1, floor(effectiveMemoryBytes / MiB))` | Memory threshold derivation | Give sub-MiB inputs a stable minimum | Policy boundary tests |\n| `recipe.hardProcessRss` | `clamp(floor(effectiveMemoryMiB / 2), 256, 8192) * MiB` | Hard daemon RSS limit | Reserve memory for the host while bounding small and large systems | Policy boundary tests |\n| `resources.hardProcessRssBytes` | Hard-process-RSS recipe | Process replacement and worker launch | Trigger controlled replacement before OOM | Resource supervision tests |\n| `resources.softProcessRssBytes` | `floor(hardProcessRssMiB * 0.8) * MiB` | Transient resource shedding | Shed before hard replacement | Resource hysteresis tests |\n| `resources.resumeProcessRssBytes` | `floor(hardProcessRssMiB * 0.7) * MiB` | Admission resumption | Require lower RSS before resuming work | Resource hysteresis tests |\n| `recipe.workerOldGeneration` | `clamp(floor(effectiveMemoryMiB / 4), 128, 4096)` MiB | Worker V8 old generation | Bound worker heap within process budget | Worker launch tests |\n| `resources.workerMaxOldGenerationSizeMiB` | Worker-old-generation recipe | Worker resource limits | Pass the derived V8 limit unchanged | Process/worker snapshot test |\n| `resources.supervisionIntervalMs` | 250 ms | Process RSS and spool sampling | Detect sustained pressure without per-operation overhead | Resource cadence tests |\n| `resources.replacementWindowMs` | 10 min | Replacement circuit | Count only recent replacements | Replacement-window tests |\n| `resources.replacementLimit` | 2 replacements; third drains | Replacement circuit | Stop persistent replacement churn | Persistent-pressure tests |\n| `resources.workerHeapSampleIntervalMs` | 25 ms | Active worker heap high-water sampling | Observe short-lived heap peaks | Worker cadence characterization |\n| `diagnostics.logRotateBytes` | 10 MiB | Diagnostic log rotation | Bound active diagnostic file size | Logger rotation tests |\n| `diagnostics.logBackupCount` | 4 backups plus active log | Diagnostic log rotation | Retain a bounded diagnostic history | Logger backup tests |\n| `diagnostics.maximumQueuedEvents` | 1,024 | Pending diagnostic writes | Bound memory when storage is slow | Logger queue tests |\n| `diagnostics.disconnectedTraceRetentionMs` | 5 min | Disconnected operation traces | Retain reconnect evidence without changing result retention | Trace expiry tests |\n| `diagnostics.maximumDisconnectedTraces` | 1,024 with effective minimum 1 | Disconnected operation traces | Bound diagnostic-only retention | Trace capacity tests |\n\n## Intentional absences\n\n| Deadline | Value | Reason |\n| --- | --- | --- |\n| healthy startup | None | Progressing warm-up has no project-size deadline. |\n| startup silence | None | Silence handling is deferred to the daemon follow-up contract. |\n| post-accept completion | None | Accepted work is not replayed or failed because it runs long. |\n| worker output acknowledgement | None | Backpressure waits for durable consumption without a timer. |\n| unacknowledged result | None | Retention eviction is deferred to the daemon follow-up contract. |\n\n## Migration access\n\nPolicy serialization is package-internal. Process and worker entries exchange complete snapshots through the internal codec without widening the host-facing `DaemonPolicy` surface.\n\nPolicy test factories remain package-local test helpers and are not exported.\n"},coordinator:{key:"coordinator",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"apps/cli/src/cli-invocation-coordinator.ts",sha256:"9cd33904bc38a7337531d56c16361cce116c5d12ed1cf4c503bf76e333f5ddfa",text:`import type { DaemonClient, DaemonClientExecuteResult } from "@symnav/daemon";
import type { CliProgramExecutor } from "./cli-program-executor.js";
import type { CliExecutionRequest } from "./command-execution-result.js";
import { InvocationWorkspaceSelector } from "./invocation-workspace-selector.js";

export interface CliInvocationCoordinatorOptions {
  readonly daemonClient: DaemonClient;
  readonly createLocalExecutor: () => CliProgramExecutor;
  readonly resolveWorkspaceRoot: (startDirectory: string) => Promise<string>;
}

export class CliInvocationCoordinator {
  private readonly selector = new InvocationWorkspaceSelector();

  constructor(private readonly options: CliInvocationCoordinatorOptions) {}

  async execute(request: CliExecutionRequest): Promise<DaemonClientExecuteResult> {
    const selected = this.selector.select(request.argv, request.cwd);
    if (selected.route.kind !== "workspace") {
      return this.executeLocally(request);
    }
    const workspaceRequest: CliExecutionRequest = { ...request, argv: selected.argv };
    let workspaceRoot: string;
    try {
      workspaceRoot = await this.options.resolveWorkspaceRoot(selected.route.startDirectory);
    } catch {
      return this.executeLocally(workspaceRequest);
    }
    return this.options.daemonClient.execute({
      workspaceRoot,
      commandName: selected.route.commandName,
      argv: selected.argv,
      cwd: request.cwd,
      telemetryEnabled: request.telemetryEnabled,
    });
  }

  private async executeLocally(request: CliExecutionRequest): Promise<DaemonClientExecuteResult> {
    const result = await this.options
      .createLocalExecutor()
      .execute({ ...request, executionMode: "cold" });
    return { mode: "cold", result };
  }
}
`},runtime:{key:"runtime",revision:"head",commit:"d07002357d3e9596bfaae910a1ac63b77981620b",path:"packages/daemon/src/client/daemon-client-runtime.ts",sha256:"74b605887e1080b2a0a8e07b0b6c66730323f410550c611907d152712054bc3c",text:`import { randomUUID } from "node:crypto";
import type { DaemonExecutionFailureCode } from "../daemon-execution-failure.js";
import type {
  DaemonExecutorExecutionResult,
  DaemonExecutorOutput,
  DaemonExecutorRequest,
  DaemonOutputRecord,
} from "../daemon-executor.js";
import { DaemonPolicy } from "../daemon-policy.js";
import type {
  DaemonStartResult,
  DaemonStopResult,
  RunningDaemonStatus,
} from "../daemon-lifecycle-report.js";
import { DaemonController } from "../process/controller.js";
import {
  NodeDaemonProcessLauncher,
  NodeDaemonProcessTerminator,
} from "../process/process-launcher.js";
import { DaemonRecordObserver } from "../registry/record-observer.js";
import { DaemonRegistry } from "../registry/registry.js";
import { DaemonStartupCoordinator } from "../registry/startup-coordinator.js";
import { DaemonWorkspaceIdentity } from "../registry/workspace-identity.js";
import { DaemonClientResultCapture } from "../transport/client-result-capture.js";
import { DaemonTransportFactory } from "../transport/daemon-transport.js";
import type {
  DaemonExecutionRequester,
  DaemonLifecycleRequestSender,
} from "../transport/contracts.js";
import type { DaemonExecuteRequest, DaemonLifecycleRequest } from "../transport/protocol.js";
import { DAEMON_PROTOCOL_VERSION, type DaemonRecord } from "../transport/protocol.js";
import { DaemonTransportError } from "../transport/transport-error.js";
import type {
  DaemonClientExecuteRequest,
  DaemonClientExecuteResult,
  DaemonClientOptions,
  DaemonControlRequest,
} from "./daemon-client-contracts.js";
import {
  DaemonRoutingContextState,
  DaemonRoutingPolicy,
  type DaemonRouteSnapshot,
} from "./daemon-routing-policy.js";

class DaemonControlledOutput implements DaemonExecutorOutput {
  private readonly bytes: Uint8Array;

  constructor(message: string) {
    this.bytes = Buffer.from(message);
  }

  async *records(): AsyncIterable<DaemonOutputRecord> {
    yield { stream: "stderr", bytes: this.bytes };
  }

  dispose(): Promise<void> {
    return Promise.resolve();
  }
}

class DaemonClientTransport implements DaemonLifecycleRequestSender, DaemonExecutionRequester {
  constructor(
    private readonly lifecycle: ReturnType<typeof DaemonTransportFactory.create>["lifecycle"],
    private readonly execution: ReturnType<typeof DaemonTransportFactory.create>["execution"],
  ) {}

  request(endpoint: string, request: DaemonLifecycleRequest) {
    return this.lifecycle.request(endpoint, request);
  }

  execute(endpoint: string, request: DaemonExecuteRequest) {
    return this.execution.execute(endpoint, request);
  }
}

class DaemonControlledResult {
  static acceptedRequestDidNotComplete(): DaemonExecutorExecutionResult {
    return this.failure("Cannot answer: accepted daemon request did not complete.\\n");
  }

  static workspaceCapacityExceeded(): DaemonExecutorExecutionResult {
    return this.failure("Cannot answer: daemon workspace capacity exceeded.\\n");
  }

  static responseCapacityExceeded(): DaemonExecutorExecutionResult {
    return this.failure("Cannot answer: daemon response capacity exceeded.\\n");
  }

  private static failure(message: string): DaemonExecutorExecutionResult {
    return { exitCode: 1, output: new DaemonControlledOutput(message) };
  }
}

export class DaemonClientRuntime {
  private readonly policy: DaemonPolicy;
  private readonly registry: DaemonRegistry;
  private readonly routingTransport: DaemonClientTransport;
  private readonly statusTransport: DaemonClientTransport;
  private readonly observer: DaemonRecordObserver;
  private readonly coordinator: DaemonStartupCoordinator;
  private readonly controlController: DaemonController;
  private readonly statusController: DaemonController;
  private readonly routing = new DaemonRoutingPolicy();

  constructor(private readonly options: DaemonClientOptions) {
    this.policy = options.policy ?? DaemonPolicy.currentSystem();
    this.registry = new DaemonRegistry(
      DaemonWorkspaceIdentity.registryDirectory(options.stateDirectory),
      this.policy.values.startup,
    );
    const routingComponents = DaemonTransportFactory.create({
      policy: this.policy,
      createOutput: () => new DaemonClientResultCapture({ policy: this.policy.values.output }),
    });
    const statusComponents = DaemonTransportFactory.create({
      policy: this.policy,
      lifecycleResponseTimeoutMs: this.policy.values.transport.statusResponseTimeoutMs,
    });
    this.routingTransport = new DaemonClientTransport(
      routingComponents.lifecycle,
      routingComponents.execution,
    );
    this.statusTransport = new DaemonClientTransport(
      statusComponents.lifecycle,
      routingComponents.execution,
    );
    const processTerminator = new NodeDaemonProcessTerminator(this.policy.values.shutdown);
    const launcher = new NodeDaemonProcessLauncher(
      options.productVersion,
      options.executorModuleUrl,
      this.policy,
      processTerminator,
    );
    this.observer = new DaemonRecordObserver(this.routingTransport, processTerminator);
    this.coordinator = new DaemonStartupCoordinator(
      this.registry,
      launcher,
      this.routingTransport,
      {
        policy: this.policy.values,
        processTerminator,
        readinessProbe: options.readinessProbe,
      },
    );
    this.controlController = new DaemonController(
      this.registry,
      this.routingTransport,
      options.stateDirectory,
      {
        policy: this.policy.values,
        processTerminator,
        launcher,
        startupCoordinator: this.coordinator,
      },
    );
    this.statusController = new DaemonController(
      this.registry,
      this.statusTransport,
      options.stateDirectory,
      {
        policy: this.policy.values,
        processTerminator,
      },
    );
  }

  async execute(request: DaemonClientExecuteRequest): Promise<DaemonClientExecuteResult> {
    if (!this.options.daemonEnabled) return this.executeLocally(request, "cold");
    const identity = DaemonWorkspaceIdentity.from(
      request.workspaceRoot,
      this.options.stateDirectory,
    );
    const route = await this.routing.decide(
      new DaemonRoutingContextState(
        identity,
        this.options.productVersion,
        () => this.registry.read(identity),
        (record) => this.observer.observe(record),
        (record) => this.registry.removeIfProcess(identity, record.instanceId, record.processToken),
      ),
    );
    if (route.kind === "warm") return this.executeWarm(route.record, request);
    if ((route.kind === "cold" && route.reason === "absent") || route.kind === "fallback") {
      DaemonClientRuntime.triggerIndependently(this.coordinator, identity);
    }
    return this.executeLocally(request, route.kind === "fallback" ? "fallback" : "cold");
  }

  control(
    request: Extract<DaemonControlRequest, { readonly action: "start" }>,
  ): Promise<DaemonStartResult>;
  control(
    request: Extract<DaemonControlRequest, { readonly action: "status" }>,
  ): Promise<readonly RunningDaemonStatus[]>;
  control(
    request: Extract<DaemonControlRequest, { readonly action: "stop" }>,
  ): Promise<DaemonStopResult>;
  control(
    request: DaemonControlRequest,
  ): Promise<DaemonStartResult | readonly RunningDaemonStatus[] | DaemonStopResult> {
    if (request.action === "start") {
      if (!this.options.daemonEnabled) return Promise.resolve({ status: "disabled" });
      return this.controlController.start(request.workspaceRoot);
    }
    if (request.action === "status") return this.statusController.status();
    return this.controlController.stop(request.workspaceRoot);
  }

  private async executeWarm(
    record: DaemonRecord,
    request: DaemonClientExecuteRequest,
  ): Promise<DaemonClientExecuteResult> {
    let receipt: Awaited<ReturnType<DaemonClientTransport["execute"]>>;
    try {
      receipt = await this.routingTransport.execute(record.endpoint, {
        kind: "execute",
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        instanceId: record.instanceId,
        processToken: record.processToken,
        requestId: randomUUID(),
        commandName: request.commandName,
        request: DaemonClientRuntime.executorRequest(request, "warm"),
      });
    } catch (error) {
      if (error instanceof DaemonTransportError && error.retrySafe) {
        return this.executeLocally(request, "fallback");
      }
      return { mode: "warm", result: DaemonControlledResult.acceptedRequestDidNotComplete() };
    }
    try {
      const completion = await receipt.completion;
      if (completion.status === "failed") {
        return { mode: "warm", result: DaemonClientRuntime.controlledFailure(completion.code) };
      }
      if (!DaemonClientRuntime.isCompleteResult(completion.result)) {
        await DaemonClientRuntime.disposeMalformedOutput(completion.result);
        return { mode: "warm", result: DaemonControlledResult.acceptedRequestDidNotComplete() };
      }
      return { mode: "warm", result: completion.result };
    } catch {
      return { mode: "warm", result: DaemonControlledResult.acceptedRequestDidNotComplete() };
    }
  }

  private async executeLocally(
    request: DaemonClientExecuteRequest,
    mode: "cold" | "fallback",
  ): Promise<DaemonClientExecuteResult> {
    const executor = await this.options.executorFactory({
      stateDirectory: this.options.stateDirectory,
      productVersion: this.options.productVersion,
      sampleResources: () => undefined,
    });
    const result = await executor.execute(DaemonClientRuntime.executorRequest(request, mode));
    return { mode, result };
  }

  private static executorRequest(
    request: DaemonClientExecuteRequest,
    executionMode: DaemonExecutorRequest["executionMode"],
  ): DaemonExecutorRequest {
    return {
      argv: request.argv,
      cwd: request.cwd,
      telemetryEnabled: request.telemetryEnabled,
      executionMode,
    };
  }

  private static triggerIndependently(
    coordinator: DaemonStartupCoordinator,
    identity: DaemonWorkspaceIdentity,
  ): void {
    try {
      void coordinator.trigger(identity).catch(() => undefined);
    } catch {}
  }

  private static isCompleteResult(result: DaemonExecutorExecutionResult): boolean {
    return Number.isInteger(result.exitCode) && result.output !== undefined;
  }

  private static async disposeMalformedOutput(
    result: DaemonExecutorExecutionResult,
  ): Promise<void> {
    try {
      await result.output?.dispose();
    } catch {}
  }

  private static controlledFailure(
    code: DaemonExecutionFailureCode,
  ): DaemonExecutorExecutionResult {
    if (code === "controlled-resource") return DaemonControlledResult.workspaceCapacityExceeded();
    if (code === "response-capacity") return DaemonControlledResult.responseCapacityExceeded();
    return DaemonControlledResult.acceptedRequestDidNotComplete();
  }
}
`},"pr-137":{key:"pr-137",revision:"PR body",commit:"supplied bundle",path:"PR #137 \u2014 Isolate daemon transport framing and validation",text:`## Context

The [daemon architecture contract](plans/005/daemon-architecture-functional-spec.md#included) calls for \`LocalDaemonTransport\` to split into codec, validator, client, and server responsibilities. One socket facade still owned wire framing, protocol validation, correlation, and every consumer-facing transport method.

## Shape

Before \u2014 consumers and protocol mechanics converged on one concrete transport:

\`\`\`mermaid
flowchart LR
    Consumers["Daemon consumers"]
    Transport["LocalDaemonTransport"]
    Protocol["Framing + validation<br/>&lt;&lt;embedded&gt;&gt;"]
    Sockets["Node sockets"]

    Consumers -->|"uses"| Transport
    Transport -->|"uses"| Protocol
    Transport -->|"uses"| Sockets

    classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Consumers,Transport changed
    class Protocol removed
\`\`\`

After \u2014 consumers use operation-shaped ports while the facade delegates protocol concerns:

\`\`\`mermaid
flowchart LR
    Consumers["Daemon consumers"]
    Lifecycle["Lifecycle ports<br/>&lt;&lt;internal&gt;&gt;"]
    Execution["Execution port<br/>&lt;&lt;internal&gt;&gt;"]
    Server["Request-server port<br/>&lt;&lt;internal&gt;&gt;"]
    Transport["LocalDaemonTransport<br/>Node socket facade"]
    Codec["DaemonWireCodec"]
    Validator["DaemonProtocolValidator"]
    Sockets["Node sockets"]

    Consumers -->|"uses"| Lifecycle
    Consumers -->|"uses"| Execution
    Consumers -->|"uses"| Server
    Transport -->|"implements"| Lifecycle
    Transport -->|"implements"| Execution
    Transport -->|"implements"| Server
    Transport -->|"uses"| Codec
    Transport -->|"uses"| Validator
    Transport -->|"uses"| Sockets

    classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Lifecycle,Execution,Server,Codec,Validator added
    class Consumers,Transport changed
\`\`\`

Legend: green = added boundary; red = removed embedded ownership; yellow = changed dependency or owner; default = unchanged.

## Where it lives

\`\`\`text
.
\u2514\u2500\u2500 apps/cli/src/daemon/
    \u251C\u2500\u2500 ++ daemon-transport.ts              # operation-shaped lifecycle, execution, socket, and server ports
    \u251C\u2500\u2500 ++ daemon-wire-codec.ts             # JSON and binary framing with independent capacity limits
    \u251C\u2500\u2500 ++ daemon-protocol-validator.ts      # exact schemas, response correlation, and retry consistency
    \u251C\u2500\u2500 ** local-daemon-transport.ts         # Node socket facade delegates framing and validation
    \u251C\u2500\u2500 -- daemon-result-chunk-codec.ts      # binary chunk framing moved into wire codec ownership
    \u2514\u2500\u2500 ** ... 5 daemon consumers            # depend on the narrow ports they use
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Decisions

- Chose operation-shaped transport interfaces over \`LocalDaemonTransport\` and consumer-local transport shapes, because lifecycle observation, execution, and request serving require different capabilities.
- Chose separate control and transfer decoders over one binary-aware decoder, because only execution transfer connections may interpret high-bit frames as result chunks.
- Chose response-kind-specific JSON limits over one control limit, because lifecycle responses retain ordinary JSON capacity while execution frames use the smaller execution-control cap.
- Chose to map \`DaemonProtocolError\` at the facade boundary over changing \`DaemonTransportError\`, because delivery, authentication, compatibility, and retry classifications must remain stable.
- Chose to absorb result-chunk header and digest validation into \`DaemonWireCodec\` over retaining a standalone chunk codec, because chunk integrity belongs to the binary frame format.

## Look here

- \`apps/cli/src/daemon/daemon-transport.ts:15\`
- \`apps/cli/src/daemon/daemon-wire-codec.ts:30\`
- \`apps/cli/src/daemon/daemon-protocol-validator.ts:30\`
`,sha256:"dc9c03d8470cffe0b847bd23c79ac13676019d615f5106067f34484c58eae17d"},"pr-138":{key:"pr-138",revision:"PR body",commit:"supplied bundle",path:"PR #138 \u2014 Receive resumable daemon result transfers",text:`## Context

Phase 14 isolated daemon wire framing and validation, but \`LocalDaemonTransport\` still owned result manifests, durable resume offsets, digest checks, and client output storage. This PR separates those stateful responsibilities without changing wire bytes, retry classification, output bytes, or lifecycle behavior.

## Shape

Before \u2014 the socket facade retained every result-transfer concern:

\`\`\`mermaid
flowchart LR
    Caller["Execution caller"] -->|"uses"| Transport["LocalDaemonTransport"]
    Transport -->|"uses"| Codec["DaemonWireCodec<br/>+ validator"]
    Transport -->|"owns"| Receipt["Manifest, offset,<br/>digest, storage"]
    Receipt -->|"returns"| Output["LocalDaemonOutput"]

    classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Transport changed
    class Receipt,Output removed
\`\`\`

After \u2014 one receiver survives reconnection while capture owns durable output:

\`\`\`mermaid
flowchart LR
    Caller["Execution caller"] -->|"uses"| Transport["LocalDaemonTransport"]
    Transport -->|"uses"| Codec["DaemonWireCodec<br/>+ validator"]
    Transport -->|"uses"| Receiver["DaemonResultTransferReceiver"]
    Receiver -->|"uses"| Capture["DaemonClientResultCapture"]
    Capture -->|"returns"| Output["DaemonExecutorOutput"]

    classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Receiver,Capture added
    class Transport,Output changed
\`\`\`

Legend: green = added owner; red = removed embedded owner; yellow = changed responsibility or contract; default = unchanged.

## Where it lives

\`\`\`text
.
\u2514\u2500\u2500 apps/cli/
    \u251C\u2500\u2500 src/
    \u2502   \u251C\u2500\u2500 ** command-execution-result.ts                 # replays the daemon executor output contract
    \u2502   \u2514\u2500\u2500 daemon/
    \u2502       \u251C\u2500\u2500 ++ daemon-client-result-capture.ts         # durable inline/file capture and replay
    \u2502       \u251C\u2500\u2500 ++ daemon-result-transfer-receiver.ts      # resumable manifest/chunk/end state
    \u2502       \u251C\u2500\u2500 ** local-daemon-transport.ts               # delegates receipt and capture ownership
    \u2502       \u251C\u2500\u2500 -- local-daemon-output.ts                  # replaced by daemon-scoped capture
    \u2502       \u2514\u2500\u2500 ** ... 2 dispatch contracts                # carry daemon executor results
    \u2514\u2500\u2500 test/e2e/daemon/
        \u2514\u2500\u2500 ** ... 2 parity suites                         # consume the opaque output contract
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Decisions

- Chose daemon-scoped capture over extending CLI \`OrderedCommandOutput\`, because warm result storage must not depend on cold-command output internals.
- Chose to advance resume offsets after awaited append over advancing on frame receipt, because fetch must restart at the first record not durably stored.
- Chose one receiver across initial and fetch connections over rebuilding receipt state, because manifest identity, digest progress, and offsets must survive reconnection.
- Chose fresh wire decoders per connection over retaining decoder state, because framing state ends at the socket boundary while transfer state continues.
- Chose caller ownership after successful finish over receiver-owned cleanup, because replay and acknowledgement failures need one explicit disposal path.

## Look here

- \`apps/cli/src/daemon/daemon-client-result-capture.ts:63\`
- \`apps/cli/src/daemon/daemon-result-transfer-receiver.ts:41\`
- \`apps/cli/src/daemon/local-daemon-transport.ts:263\`
`,sha256:"4b36d5b249132835e927b3e9f0ddb26515d264d8149eccb463c092aeea27a267"},"pr-139":{key:"pr-139",revision:"PR body",commit:"supplied bundle",path:"PR #139 \u2014 Route outbound daemon sockets through one client",text:`## Context

\`LocalDaemonTransport\` repeated Node socket connection, timeout, read-flow, write-backpressure, and closure mechanics across five outbound paths. One low-level client now owns those mechanics while protocol and delivery decisions remain in the transport fa\xE7ade.

## Shape

Before \u2014 each outbound exchange managed a raw socket:

\`\`\`mermaid
flowchart LR
    Transport["LocalDaemonTransport"] -->|"opens"| Lifecycle["Lifecycle socket"]
    Transport -->|"opens"| Execution["Execution socket"]
    Transport -->|"opens"| Results["Result and acknowledgement sockets"]
    Transport -->|"opens"| Probe["Endpoint probe"]

    classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
    class Lifecycle,Execution,Results,Probe removed
\`\`\`

After \u2014 all outbound paths consume one byte-connection port:

\`\`\`mermaid
flowchart LR
    Transport["LocalDaemonTransport"] -->|"uses"| Port["DaemonSocketClient"]
    Client["LocalDaemonSocketClient"] -->|"implements"| Port
    Client -->|"owns"| Socket["node:net Socket"]
    Transport -->|"retains"| Protocol["Codec, validation, delivery state"]

    classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Client added
    class Transport changed
\`\`\`

Legend: green = added; yellow = changed; red = removed; default = unchanged.

## Where it lives

\`\`\`text
.
\u2514\u2500\u2500 apps/cli/src/daemon/
    \u251C\u2500\u2500 ++ local-daemon-socket-client.ts                 # sole outbound Node socket owner
    \u251C\u2500\u2500 ++ local-daemon-socket-client.test.ts            # byte flow, timeout, backpressure, and closure
    \u251C\u2500\u2500 ++ local-daemon-transport-socket-client.test.ts  # delegation across five outbound paths
    \u251C\u2500\u2500 ** local-daemon-transport.ts                     # retains protocol and delivery semantics
    \u2514\u2500\u2500 ** ... 2 transport test files                    # remove superseded private helper coverage
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Public surface

\`\`\`ts
export class LocalDaemonSocketClient implements DaemonSocketClient {
  connect(endpoint: string, timeoutMs?: number): Promise<DaemonSocketConnection>;
}
\`\`\`

## Decisions

- Chose a pull-driven async iterator over forwarded \`data\` events, because consumer demand now controls socket resume and each delivered chunk pauses reads again.
- Chose a connection-owned FIFO over fa\xE7ade-owned drain handling, because frames must preserve write-call order across backpressure.
- Kept protocol decoding and delivery-state translation in \`LocalDaemonTransport\` over moving them into the socket client, because raw EOF and errors cannot classify request correlation or retry safety.
- Kept inbound server sockets in \`LocalDaemonTransport\` over extracting both directions together, because server binding and shutdown form the separate Phase 18 boundary.

## Look here

- \`apps/cli/src/daemon/local-daemon-socket-client.ts:25\`
- \`apps/cli/src/daemon/local-daemon-socket-client.ts:51\`
- \`apps/cli/src/daemon/local-daemon-transport.ts:270\`
`,sha256:"ff1408a14aa5552ff1b5cbcc9db0c5c049e5f84c5714831be9df25ecd877df70"},"pr-142":{key:"pr-142",revision:"PR body",commit:"supplied bundle",path:"PR #142 \u2014 Preserve accepted execution recovery in one client",text:`## Context

Outbound execution still lived in \`LocalDaemonTransport\` after lifecycle and socket mechanics gained dedicated owners. Accepted work requires independent recovery budgets for result fetches within an attempt and identical-request reattachments across attempts.

## Shape

Before \u2014 the transport fa\xE7ade embedded the execution state machine:

\`\`\`mermaid
flowchart LR
    Callers["Daemon command callers"] -->|"execute"| Facade["LocalDaemonTransport"]
    Facade -->|"owns"| Embedded["Embedded admission, transfer, acknowledgement, and recovery"]
    Embedded -->|"uses"| Socket["DaemonSocketClient"]
    Embedded -->|"uses"| Lifecycle["DaemonLifecycleClient"]
    Embedded -->|"creates"| Output["Result capture"]

    classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Embedded removed
    class Facade changed
\`\`\`

After \u2014 the fa\xE7ade delegates the complete state machine to one execution client:

\`\`\`mermaid
flowchart LR
    Callers["Daemon command callers"] -->|"execute"| Facade["LocalDaemonTransport"]
    Facade -->|"delegates"| Client["DaemonExecutionClient"]
    Client -->|"uses"| Socket["DaemonSocketClient"]
    Client -->|"acknowledges through"| Lifecycle["DaemonLifecycleClient"]
    Client -->|"creates per attempt"| Output["Result capture"]

    classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Client added
    class Facade changed
\`\`\`

Legend: green = added; yellow = changed; red = removed; default = unchanged.

## Where it lives

\`\`\`text
.
\u2514\u2500\u2500 apps/cli/src/daemon/
    \u251C\u2500\u2500 ++ daemon-execution-client.ts               # owns outbound execution and accepted recovery
    \u251C\u2500\u2500 ++ daemon-execution-client.test.ts          # locks direct ownership and identical-request recovery
    \u251C\u2500\u2500 ** local-daemon-transport.ts                # composes and delegates to execution client
    \u2514\u2500\u2500 ** local-daemon-transport-execution.test.ts # retains transport-level delivery oracles
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Public surface

\`\`\`ts
export class DaemonExecutionClient implements DaemonExecutionRequester {
  constructor(options: DaemonExecutionClientOptions);
  execute(endpoint: string, request: DaemonExecuteRequest): Promise<DaemonExecutionReceipt>;
}
\`\`\`

## Decisions

- Chose a dedicated execution client over a generic response chain, because admission, accepted completion, transfer, acknowledgement, and recovery share one state machine.
- Chose a fresh output capture per execute attempt over reusing interrupted capture state, because duplicate-request reattachment starts a new delivery while result fetch resumes the current delivery.
- Chose independent numeric policy counters over boolean recovery flags, because fetch resumes and accepted reattachments have separate configurable budgets.
- Chose the lifecycle client's acknowledgement-only surface over widening \`DaemonLifecycleRequester\`, because only result completion needs acknowledgement.
- Chose an internal fetch-ended error over changing the public exhausted-fetch failure, because final exhaustion must retain accepted-corruption behavior without replaying execution.

## Look here

- \`apps/cli/src/daemon/daemon-execution-client.ts:46\`
- \`apps/cli/src/daemon/daemon-execution-client.ts:75\`
- \`apps/cli/src/daemon/daemon-execution-client.ts:300\`
`,sha256:"2eac54e96bc6861bcf9fc9c59c326a06f284ecdbdbef497196dd6ab2e8464a3f"},"pr-148":{key:"pr-148",revision:"PR body",commit:"supplied bundle",path:"PR #148 \u2014 Own daemon mechanisms behind DaemonClient",text:`## Context

Daemon process ownership still lived in CLI-local mechanisms, and hosts needed registry, transport, startup, and lifecycle knowledge to compose daemon execution. This group establishes the package-owned process and client boundary while leaving the active CLI consumer switch to the next PR.

## Shape

Before \u2014 CLI-local mechanisms own process coordination and expose their composition burden to the host:

\`\`\`mermaid
flowchart LR
  H[CLI host] --> W[WorkspaceDaemon]
  W --> M[CLI-local daemon mechanisms]
  P[daemon package] --> C[Contracts and policy]
  classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
  class W removed
\`\`\`

After \u2014 package entries and a public client compose package-local mechanisms; the shipped CLI still follows its frozen compatibility graph:

\`\`\`mermaid
flowchart LR
  H[CLI host] --> F[Frozen compatibility graph]
  P[daemon package] --> D[DaemonClient public facade]
  D --> M[Private routing and lifecycle mechanisms]
  E[Process and worker entries] --> M
  classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
  classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
  class D,M,E added
  class F changed
\`\`\`

Legend: green = added; red = removed; yellow = changed; unfilled = pre-existing and unchanged.

## Where it lives

\`\`\`text
.
\u251C\u2500\u2500 apps/cli/src/daemon/
\u2502   \u251C\u2500\u2500 ~~ daemon-process-coordinator.ts # renamed from workspace-daemon.ts; owns process lifecycle
\u2502   \u251C\u2500\u2500 ** daemon-clock.ts               # owns wall and monotonic time sources
\u2502   \u251C\u2500\u2500 ** daemon-registry.ts            # owns startup-lock equality
\u2502   \u2514\u2500\u2500 ** ... 9 files                   # coordinated compatibility mechanisms, then frozen
\u251C\u2500\u2500 packages/daemon/
\u2502   \u251C\u2500\u2500 ** package.json                  # exposes real process and worker entry subpaths
\u2502   \u251C\u2500\u2500 src/
\u2502   \u2502   \u251C\u2500\u2500 ++ client/ ... 8 files       # public facade and private routing/runtime composition
\u2502   \u2502   \u251C\u2500\u2500 ++ delivery/, diagnostics/, execution/, lifecycle/
\u2502   \u2502   \u251C\u2500\u2500 ++ process/, registry/, resources/, transport/, worker/ # package mechanism owners
\u2502   \u2502   \u251C\u2500\u2500 ~~ ... 37 test files         # moved from apps/cli/src/daemon/
\u2502   \u2502   \u251C\u2500\u2500 ++ process-entry.ts
\u2502   \u2502   \u251C\u2500\u2500 ++ worker-entry.ts
\u2502   \u2502   \u2514\u2500\u2500 ** index.ts                  # exports the host-facing client surface
\u2502   \u2514\u2500\u2500 ++ test/ ... 24 files            # generic executor and built-entry integration fixtures
\u251C\u2500\u2500 meta-tests/src/
\u2502   \u2514\u2500\u2500 ++ daemon-compatibility-copy.test.ts # freezes 38 app-local production copies
\u2514\u2500\u2500 plans/005/
    \u2514\u2500\u2500 ** daemon-follow-ups-functional-spec.md # records deferred idle-accounting changes
\`\`\`

## Public surface

\`\`\`ts
export type {
  DaemonClientExecuteRequest,
  DaemonClientExecuteResult,
  DaemonClientOptions,
  DaemonControlRequest,
} from "./client/daemon-client-contracts.js";
export { DaemonClient } from "./client/daemon-client.js";

export class DaemonClient {
  constructor(options: DaemonClientOptions);
  execute(request: DaemonClientExecuteRequest): Promise<DaemonClientExecuteResult>;
  control(
    request: Extract<DaemonControlRequest, { readonly action: "start" }>,
  ): Promise<DaemonStartResult>;
  control(
    request: Extract<DaemonControlRequest, { readonly action: "status" }>,
  ): Promise<readonly RunningDaemonStatus[]>;
  control(
    request: Extract<DaemonControlRequest, { readonly action: "stop" }>,
  ): Promise<DaemonStopResult>;
}
\`\`\`

## Decisions

- Chose a Node-free public fa\xE7ade with a dynamically loaded internal runtime over exposing Node-backed mechanisms, because host declarations must not acquire Node ambient dependencies.
- Chose ordered lazy routing guards over eager registry and transport observation, because the first routing decision must prevent every later side effect.
- Chose package staging with a frozen CLI compatibility graph over switching production consumers during relocation, because mechanism ownership and host invocation coordination need separate review boundaries.
- Chose package-owned result capture and controlled failure outputs over host-provided storage or output factories, because warm transfer cleanup and replay safety belong to the daemon client.
- Chose to preserve acceptance-based idle timing over correcting it during extraction, because readiness- and completion-based lifetime changes are explicitly deferred behavior.

## Look here

- \`packages/daemon/src/process/process-coordinator.ts:84\`
- \`packages/daemon/src/client/daemon-client-runtime.ts:139\`
- \`packages/daemon/src/client/daemon-client.ts:20\`
`,sha256:"cce863c870678c3750057ee3f49c81c635d03bbf5a8614158dada4b60c7f7a6b"},"pr-149":{key:"pr-149",revision:"PR body",commit:"supplied bundle",path:"PR #149 \u2014 Enforce physical daemon package ownership",text:`## Context

[PR #148](https://github.com/mohasarc/symnav/pull/148) establishes the package \`DaemonClient\` and stages daemon mechanisms, but the shipped CLI and external test consumers still retain app-local ownership paths. This PR makes \`@symnav/daemon\` the sole mechanism owner while preserving command output, telemetry, execution modes, and lifecycle behavior.

## Shape

Before \u2014 CLI runtime and external tests still cross the app-local daemon boundary:

\`\`\`mermaid
flowchart LR
  E[CLI entry] -->|calls| D[CLI daemon dispatcher]
  D -->|calls| A[App-local daemon copies]
  T[CLI tests and benchmark] -->|calls| A
  P[DaemonClient package root] -->|calls| M[Staged package mechanisms]
  classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
  classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
  class D,A removed
  class E,T changed
\`\`\`

After \u2014 CLI coordinates invocations through the package root, and tests observe package state through a read-only subpath:

\`\`\`mermaid
flowchart LR
  E[CLI entry] -->|calls| C[CLI invocation coordinator]
  C -->|calls| P[DaemonClient package root]
  P -->|calls| M[Package-owned mechanisms]
  T[CLI tests and benchmark] -->|calls| I[Read-only testing inspector]
  I -->|calls| M
  classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
  classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
  class C,I added
  class E,T,M changed
\`\`\`

Legend: green = added; red = removed; yellow = changed; unfilled = pre-existing and unchanged.

- Atomic frozen install, build, 2,696 tests with 8 expected skips, lint, and typecheck pass at the exact head.
- Explicit cold and warm suites each pass 355 tests with 8 expected skips.
- Scale-1 daemon benchmark passes parity, freshness, responsiveness, continuity, telemetry, resource, and spool-cleanup gates.

## Where it lives

\`\`\`text
.
\u251C\u2500\u2500 apps/cli/
\u2502   \u251C\u2500\u2500 src/
\u2502   \u2502   \u251C\u2500\u2500 ++ cli-invocation-coordinator.ts       # owns local/control/workspace routing
\u2502   \u2502   \u251C\u2500\u2500 ~~ invocation-workspace-selector.ts   # moved from src/daemon/
\u2502   \u2502   \u251C\u2500\u2500 ** cli.ts                              # composes one public daemon client
\u2502   \u2502   \u251C\u2500\u2500 ** commands/daemon/register-daemon-command.ts # calls public lifecycle controls
\u2502   \u2502   \u2514\u2500\u2500 -- daemon/ ... 45 files                # removes app-owned mechanism copies
\u2502   \u2514\u2500\u2500 ** test/ ... 34 files                      # uses public behavior or testing inspector
\u251C\u2500\u2500 packages/daemon/
\u2502   \u251C\u2500\u2500 ** package.json                            # exposes exactly four package paths
\u2502   \u251C\u2500\u2500 ++ src/testing/ ... 3 files                # read-only state inspection boundary
\u2502   \u251C\u2500\u2500 ** src/transport/ ... 16 files             # replaces compatibility facade
\u2502   \u251C\u2500\u2500 ++ test/actors/daemon-accepted-caller.ts   # package-owned accepted caller
\u2502   \u2514\u2500\u2500 ~~ test/actors/ ... 6 files                # moved from apps/cli/test/helpers/
\u251C\u2500\u2500 meta-tests/src/
\u2502   \u251C\u2500\u2500 ++ cli-daemon-reachability.test.ts         # locks production import graph
\u2502   \u251C\u2500\u2500 ++ daemon-storage-boundary.test.ts         # locks testing storage boundary
\u2502   \u2514\u2500\u2500 ** ... 3 files                             # locks exports, deletion, and lint rules
\u251C\u2500\u2500 ** AGENTS.md                                   # records final package ownership
\u2514\u2500\u2500 ** plans/000/symnav-stages.md                  # records completed architecture milestone
\`\`\`

## Public surface

\`\`\`ts
export class DaemonTestingInspector {
  constructor(canonicalStateDirectory: string);
  listInstances(): readonly DaemonTestingInstance[];
  hasStateArtifacts(): boolean;
  readDiagnostics(canonicalWorkspaceRoot: string, cursor?: number): DaemonTestingDiagnosticPage;
  completionSpoolUsage(canonicalWorkspaceRoot: string): DaemonTestingSpoolUsage;
}

// Removed from DaemonPolicy:
static fromSerialized(value: unknown): DaemonPolicy;
toSerialized(): Readonly<SerializedDaemonPolicy>;
\`\`\`

## Decisions

- Chose a CLI invocation coordinator over the app-local daemon dispatcher, because argv classification and workspace discovery remain host responsibilities while execution belongs behind \`DaemonClient\`.
- Chose a read-only testing inspector over exposing registry, diagnostic, or spool paths, because external assertions need observability without storage or mutation authority.
- Chose package-owned actors with an injected executor URL over package tests naming CLI build artifacts, because daemon tests must not depend on app layout.
- Chose focused package transport composition over retaining \`LocalDaemonTransport\`, because lifecycle, execution, result transfer, and socket owners now have one package boundary.
- Chose exact compiler-backed import, export, clock, and storage inventories over regex or compatibility aliases, because ordinary TypeScript syntax must not bypass final ownership rules.

## Look here

- \`apps/cli/src/cli-invocation-coordinator.ts:17\`
- \`packages/daemon/src/testing/daemon-testing-inspector.ts:35\`
- \`meta-tests/src/daemon-storage-boundary.test.ts:215\`
`,sha256:"0d2968db58185c4d79dd79628e0638f3d0f81d245730cc441b01859cd5d90d6b"},"pr-147":{key:"pr-147",revision:"PR body",commit:"supplied bundle",path:"PR #147 \u2014 Serialize accepted daemon execution in one session",text:`## Context

Implements Phase 24 of the daemon architecture plan. This stack layer follows delivery-session PR #146 and isolates accepted execution before Phase 25 replaces the residual process coordinator. Exact local CI parity passed 2,414 tests with eight expected skips; focused session, transport, parity, scale, stop, commit-replay, and mutation checks preserve protocol, timing, and lifecycle behavior.

## Shape

Before \u2014 \`WorkspaceDaemon\` coordinates accepted execution directly:

\`\`\`mermaid
flowchart LR
    Process["WorkspaceDaemon<br/>&lt;&lt;process and execution owner&gt;&gt;"] -->|uses| Ledger["AcceptedRequestLedger<br/>&lt;&lt;request state&gt;&gt;"]
    Process -->|uses| Queue["WorkspaceRequestQueue<br/>&lt;&lt;FIFO turns&gt;&gt;"]
    Process -->|uses| Delivery["DaemonDeliverySession<br/>&lt;&lt;completion delivery&gt;&gt;"]

    classDef removed fill:#ffebe9,stroke:#cf222e,color:#24292f
    class Process removed
\`\`\`

After \u2014 one session coordinates accepted turns over existing owners:

\`\`\`mermaid
flowchart LR
    Process["WorkspaceDaemon<br/>&lt;&lt;process shell&gt;&gt;"] -->|uses| Session["AcceptedExecutionSession<br/>&lt;&lt;turn coordinator&gt;&gt;"]
    Session -->|uses| Ledger["AcceptedRequestLedger<br/>&lt;&lt;request state&gt;&gt;"]
    Session -->|uses| Queue["WorkspaceRequestQueue<br/>&lt;&lt;FIFO turns&gt;&gt;"]
    Session -->|uses| Delivery["DaemonDeliverySession<br/>&lt;&lt;completion delivery&gt;&gt;"]

    classDef added fill:#dafbe1,stroke:#1a7f37,color:#24292f
    classDef changed fill:#fff8c5,stroke:#9a6700,color:#24292f
    class Session added
    class Process changed
\`\`\`

Legend: green = added; red = removed; yellow = changed; unfilled = pre-existing and unchanged.

## Where it lives

\`\`\`text
.
\u2514\u2500\u2500 apps/cli/src/daemon/
    \u251C\u2500\u2500 ++ accepted-execution-session-contracts.ts # defines injected session ports and snapshots
    \u251C\u2500\u2500 ++ accepted-execution-session.ts           # owns admission-to-turn serialization
    \u251C\u2500\u2500 ++ accepted-execution-session.test.ts      # locks timing, barriers, failures, and duplicates
    \u251C\u2500\u2500 ** accepted-request-ledger.ts               # retains immutable acceptance metadata
    \u2514\u2500\u2500 ** workspace-daemon.ts                      # composes and delegates to the session
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Public surface

Added internal coordination surface:

\`\`\`ts
export class AcceptedExecutionSession {
  constructor(options: AcceptedExecutionSessionOptions);
  get snapshot(): AcceptedExecutionSnapshot;
  compatibilityFor(request: DaemonExecuteRequest): AcceptedRequestCompatibility;
  accept(request: AuthenticatedDaemonExecuteRequest): AcceptedExecutionAdmission;
  status(requestId: string): DaemonExecutionStatus;
  markActiveResourceInterrupted(cause: DaemonWorkerReplacementCause): void;
  scheduleAtTurnBoundary(operation: () => Promise<void>): Promise<void>;
  drain(): Promise<void>;
  close(): void;
}
\`\`\`

Changed ledger entry surface:

\`\`\`ts
export interface AcceptedRequestEntry {
  readonly acceptedAt: number;
  readonly queuePosition: number;
  readonly state: AcceptedRequestState;
}
\`\`\`

No package export, CLI command, protocol shape, option, or environment surface changes.

## Decisions

- Chose immutable acceptance metadata on each ledger entry over a parallel process map, because queued, running, terminal, and acknowledged states share one original acceptance identity.
- Chose an injected session over moving ledger, queue, delivery, worker, resource, lifetime, or shutdown state, because each dependency remains authoritative for its own mechanism.
- Chose a narrow process-lifecycle port over exposing the process shell, because execution needs only shutdown classification, workspace presence, and post-delivery deletion transition.
- Chose turn-boundary sampling inside each queued operation over post-hoc process scheduling, because sampling must gate the next FIFO turn after success or failure.
- Chose duplicate attachment over acceptance replay, because request identity remains daemon-lifetime idempotent without another trace, queue turn, clock read, or lifetime reset.

## Look here

- \`apps/cli/src/daemon/accepted-execution-session.ts:44\`
- \`apps/cli/src/daemon/accepted-execution-session.ts:93\`
- \`apps/cli/src/daemon/workspace-daemon.ts:193\`
`,sha256:"6d09546e2265948dad143374e40cb4f8a00a1d0cd8813a9da88887933bf38002"}},readings:[{id:"ownership",number:"01",title:"The pressure separates. The process does not.",status:"stated",summary:"Four selected roles: socket I/O, accepted recovery, transfer continuity, and output capture. On main, three share one CLI source file. At #149, each has a package file; all four still run client-side on this path. #148 stages the package; #149 switches the CLI.",reason:"PRs #138, #139, #142 and #149 give separate coordination and package boundaries as the reasons; #148 explicitly separates staging from the consumer switch.",mechanism:"The pressure count groups roles by their source file, not by class or process. LocalDaemonTransport contains the socket and recovery code plus an embedded DaemonResultTransferReceiver. OrderedCommandOutput is in a second CLI file. At the tip, socket-client.ts, execution-client.ts, result-transfer-receiver.ts and client-result-capture.ts each own one selected role. DaemonTransportFactory composes them; the CLI invocation coordinator enters through DaemonClient.",detail:"Warm output capture becomes daemon-scoped so it no longer depends on cold-command output internals. The chart omits other responsibilities in these files, other packages, and the worker. Its pressure values are a four-role census, never a complexity or risk score.",receipts:[{source:"main-transport",start:137,end:167,label:"Embedded receiver"},{source:"main-transport",start:391,end:430,label:"Recovery and output creation"},{source:"main-output",start:132,end:165,label:"Separate CLI output owner"},{source:"factory",start:31,end:84,label:"Four package owners composed"},{source:"coordinator",start:17,end:36,label:"CLI calls DaemonClient"},{source:"pr-138",start:61,end:61,label:"Stated: storage ownership"},{source:"pr-148",start:90,end:90,label:"Stated: staged switch"},{source:"pr-149",start:89,end:89,label:"Stated: final package composition"}]},{id:"fetch",number:"02",title:"A fetch keeps the weather already recorded.",status:"stated",summary:"After acceptance and a manifest, interrupted delivery can fetch from the first record not yet appended. The connection and decoder are fresh; the receiver, manifest, digest progress and capture survive. Offsets advance only after append resolves, and completion must match its manifest.",reason:"PR #138 says durable receipt must determine the resume offset, while manifest identity and transfer state must survive reconnection. This continuity already exists on main.",mechanism:"executeOnce creates one receiver and capture. When its accepted, nonterminal transfer closes, resume calls beginConnection on that same receiver, then fetchCompletion sends result-fetch with offset: transfer.nextOffset. beginConnection clears per-connection flags but retains the manifest and offset. A new decoder starts at the new socket boundary.",detail:"The example on the map assumes record 0 was appended, so the next offset is 1. This is an authored example, not a recorded network event. A record currently waiting on append is not counted. Repeated manifests must match; offsets must be contiguous; terminal counts and the captured digest are checked before finish succeeds.",receipts:[{source:"execution",start:116,end:146,label:"Same receiver enters fetch"},{source:"execution",start:300,end:333,label:"Fresh decoder; request carries durable offset"},{source:"receiver",start:30,end:82,label:"Connection reset and awaited append"},{source:"receiver",start:85,end:131,label:"Manifest and final digest validation"},{source:"main-transport",start:157,end:209,label:"Continuity already present on main"},{source:"receiver-tests",start:62,end:87,label:"Held-append witness"},{source:"pr-138",start:62,end:64,label:"Stated: continuity versus connection"}]},{id:"reattach",number:"03",title:"A new delivery can belong to the same request.",status:"stated",summary:"A qualifying accepted close can reattach the identical execute request. It gets a fresh receiver and output capture; the interrupted capture is disposed. The daemon\u2019s duplicate identity path avoids a new execution turn. Reattachment requires closed + accepted + the same authenticated instance.",reason:"PR #142 distinguishes new delivery from resumed delivery; PR #147 says duplicate attachment must retain daemon-lifetime idempotency. Recovery loops already exist on main.",mechanism:"completeWithReattachments accepts only a DaemonTransportError whose code is closed, delivery is accepted, and authenticatedInstanceId matches the request. It calls executeOnce again with the same endpoint and request. executeOnce allocates fresh output and receiver state, and its failure path disposes the interrupted transfer.",detail:"On the daemon side, AcceptedExecutionSession returns the existing acceptance before starting another execution. The amber return path therefore means delivery of the accepted work. It does not assert exactly-once execution across daemon restarts or invent a new request ID.",receipts:[{source:"execution",start:40,end:91,label:"Same request; new capture each attempt"},{source:"execution",start:104,end:114,label:"Dispose interrupted transfer"},{source:"execution",start:400,end:410,label:"Exact reattachment predicate"},{source:"session",start:45,end:70,label:"Existing identity skips execution"},{source:"main-transport",start:391,end:414,label:"Main already reattaches once"},{source:"execution-tests",start:112,end:129,label:"Identical request test assertions"},{source:"pr-142",start:66,end:66,label:"Stated: new delivery versus fetch"},{source:"pr-147",start:86,end:86,label:"Stated: preserve request identity"}]},{id:"failure",number:"04",title:"Some rain ends the journey.",status:"stated",summary:"A clean fetch EOF after its budget is exhausted becomes accepted corruption, with no execution reattachment. Exhausted qualifying reattachments return the first accepted close. Corrupt transfer data is terminal. Acceptance removes the completion deadline; successful delivery waits for acknowledgement, and acknowledgement failure disposes output.",reason:"PR #142 explicitly preserves accepted-corruption behavior on exhausted fetches. The policy record says accepted work is not failed or replayed merely for running long; PR #138 requires an explicit output-disposal path.",mechanism:"An incomplete clean fetch throws DaemonResultFetchEndedError. When fetch recovery is exhausted, the execution client translates that internal close to code: corrupt, delivery: accepted. That fails the closed-only reattachment predicate. Other qualifying accepted closes use the outer reattachment budget and preserve the first close on final failure.",detail:"The output is returned only after transfer validation and result acknowledgement. If acknowledgement fails, the finished output is disposed. The map\u2019s rain marks the selected failure condition; drop count, fall speed and storm area carry no likelihood, elapsed time or severity.",receipts:[{source:"execution",start:20,end:24,label:"Internal clean-fetch EOF"},{source:"execution",start:135,end:144,label:"Exhausted EOF maps to corruption"},{source:"execution",start:47,end:74,label:"First accepted close retained"},{source:"execution",start:146,end:151,label:"Timeout removed at acceptance"},{source:"execution",start:211,end:230,label:"Acknowledgement before returning output"},{source:"head-tests",start:736,end:790,label:"No replay on exhausted clean fetch"},{source:"policy-record",start:58,end:58,label:"Stated: no completion deadline"}]},{id:"forecast",number:"05",title:"Two budgets; one unexplained calibration.",status:"mixed",summary:"The defaults remain 1 reattachment per request and 1 fetch resume per execute attempt. The stack replaces fixed one-shot recovery with independent numeric policy counters; zero and larger limits are tested. Preserving the defaults is stated. Why precisely one of each was chosen is unexplained in the inspected record.",reason:"PR #142 explains independent configurable budgets. The policy record explains their purpose, but supplies no comparison or calibration for the exact value 1. The forecast haze marks that bounded rationale gap, not uncertainty about the code.",mechanism:"The reattachment counter lives outside executeOnce. The fetch counter lives inside it, so a reattached attempt starts with its own fetch allowance. At default settings this allows at most two execute attempts and one fetch within each attempt, subject to the actual error path. It does not promise that every close consumes all allowances.",detail:"Search scope: the supplied stack PR bodies and commit messages, the current daemon policy record, architecture specification, and selected source/tests. No implementing conversation or production incident measurements were available. These are internal policy values, not user-facing weather controls.",receipts:[{source:"policy",start:131,end:134,label:"Exact default values"},{source:"execution",start:47,end:74,label:"Request-level reattachment counter"},{source:"execution",start:91,end:135,label:"Attempt-level fetch counter"},{source:"main-transport",start:397,end:414,label:"Main: one reattachment"},{source:"main-transport",start:434,end:474,label:"Main: one-shot resume flag"},{source:"pr-142",start:67,end:67,label:"Stated: separate configurable scopes"},{source:"policy-record",start:27,end:28,label:"Purpose given; exact calibration absent"}]},{id:"tests",number:"06",title:"The observations have moved with the owners.",status:"stated",summary:"Fourteen literal transport test titles survive in the package suite. Added witnesses separate zero/multiple recovery limits, fresh-capture disposal and exhausted-fetch corruption. This artifact runs focused transport/receiver/client suites; it makes no whole-stack parity claim and does not equate matching test names with matching assertions.",reason:"PR #142 calls for direct ownership and identical-request recovery tests; #149 moves the physical ownership boundary. The evidence includes a complete before/tip diff of this one transport test file, so changed assertions remain inspectable.",mechanism:"Use the source witnesses to separate a behavioral assertion from a reason. The receiver test holds append pending and checks that offset stays zero, then releases it and checks offset one. The execution tests compare identical execute bytes and fresh captures. The transport suite uses real local Unix sockets to exercise fetch and reattachment paths.",detail:"The run logs and test-title census concern only this recovery slice. Other stack test changes are outside the map. Title retention is an inventory check, not proof of unchanged assertions or correctness. See the full scoped test diff for the migration and added assertions.",receipts:[{source:"receiver-tests",start:62,end:87,label:"Pending append observation"},{source:"execution-tests",start:112,end:129,label:"Fresh captures and identical execute bytes"},{source:"head-tests",start:1257,end:1266,label:"Fresh output and one disposal"},{source:"head-tests",start:780,end:790,label:"Accepted-corrupt and request counts"},{source:"pr-142",start:47,end:47,label:"Direct ownership test intent"}]}],roles:[{id:"recovery",name:"Accepted recovery",main:"main-transport",head:"execution",mainOwner:"LocalDaemonTransport",headOwner:"DaemonExecutionClient"},{id:"socket",name:"Socket I/O",main:"main-transport",head:"socket",mainOwner:"LocalDaemonTransport",headOwner:"LocalDaemonSocketClient"},{id:"receiver",name:"Transfer continuity",main:"main-transport",head:"receiver",mainOwner:"embedded DaemonResultTransferReceiver",headOwner:"DaemonResultTransferReceiver"},{id:"capture",name:"Output capture",main:"main-output",head:"capture",mainOwner:"OrderedCommandOutput",headOwner:"DaemonClientResultCapture"}],census:{main:["uses the accepted-request protocol generation","classifies connection refusal before any write as retry-safe","classifies a close after submission but before acceptance as non-retryable","preserves authenticated rejection retry safety","allows execution admission beyond the lifecycle request timeout","has no completion deadline after acceptance","transfers and acknowledges a generated twelve MiB mixed-stream result","advances one client record only after its spool append completes","resumes after a stalled append at the first durably missing record","resumes a disconnected result transfer at the contiguous record offset","cleans client output and fails without replay when the daemon dies before resume","disposes partial client output when daemon delivery fails after its manifest","reports EOF after acceptance as a typed post-accept failure","reattaches once with the same request after accepted delivery closes"],head:["uses the accepted-request protocol generation","classifies connection refusal before any write as retry-safe","classifies a close after submission but before acceptance as non-retryable","preserves authenticated rejection retry safety","allows execution admission beyond the lifecycle request timeout","applies the execution admission deadline until acceptance","has no completion deadline after acceptance","transfers and acknowledges a generated twelve MiB mixed-stream result","advances one client record only after its spool append completes","resumes after a stalled append at the first durably missing record","resumes a disconnected result transfer at the contiguous record offset","disables result fetch resume without disabling execution reattachment","honors result fetch resume limits greater than one within one execute attempt","surfaces an exhausted clean fetch as accepted corruption without execution replay","cleans client output and fails without replay when the daemon dies before resume","disposes partial client output when daemon delivery fails after its manifest","reports EOF after acceptance as a typed post-accept failure","disables accepted execution reattachment without disabling fetch policy","honors accepted execution reattachment limits greater than one","rethrows the first accepted close when reattachment fails before acceptance","reattaches once with the same request after accepted delivery closes","reattaches the same request with fresh output and disposes the interrupted capture once","gives the reattached execute attempt its own fetch resume"],missing:[],added:["applies the execution admission deadline until acceptance","disables result fetch resume without disabling execution reattachment","honors result fetch resume limits greater than one within one execute attempt","surfaces an exhausted clean fetch as accepted corruption without execution replay","disables accepted execution reattachment without disabling fetch policy","honors accepted execution reattachment limits greater than one","rethrows the first accepted close when reattachment fails before acceptance","reattaches the same request with fresh output and disposes the interrupted capture once","gives the reattached execute attempt its own fetch resume"],limit:"Literal it(...) titles only; parameterized cases are excluded. This is not an assertion-parity check."}};var M=e=>document.querySelector(e),ne=e=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;"),qa=window.matchMedia("(prefers-reduced-motion: reduce)"),b={revision:"head",condition:"fetch",paused:qa.matches,reading:0,role:null,full:!1},T={ink:"#214047",blue:"#257390",orange:"#af623b",teal:"#4a8275",grid:"#9bb2a0",paper:"#e8eee5"},Mr={fetch:{kicker:"RAIN OVER THE CONNECTION",title:"Fetch the missing records.",description:"Acceptance and a manifest arrived. Record 0 was appended before the link broke. Fetch begins at offset 1, keeping this receiver and capture.",values:[["Execute identity","unchanged"],["Receiver / capture","retained"],["Next record","1"]],wire:"result-fetch \xB7 offset 1",result:"remaining records \u2192 same capture",rain:"LINK CLOSE",reading:"fetch"},reattach:{kicker:"CLOSE BEFORE THE MANIFEST",title:"Reattach the same request.",description:"The authenticated connection closes after acceptance, before a manifest. A qualifying close starts a new delivery attempt for the identical execute request.",values:[["Execute identity","identical"],["Receiver / capture","fresh"],["Next record","0"]],wire:"execute \xB7 identical request",result:"new delivery \u2192 fresh capture",rain:"ACCEPTED CLOSE",reading:"reattach"},exhausted:{kicker:"RAIN AT THE RECOVERY LIMIT",title:"Corruption ends recovery.",description:"The allowed fetch ends cleanly without completing the result. It becomes accepted corruption. There is no execution reattachment on this error path.",values:[["Execute attempts","1"],["Fetch attempts","1"],["Outcome","accepted / corrupt"]],wire:"result-fetch \xB7 incomplete",result:"partial capture disposed",rain:"FETCH EOF",reading:"failure"},clear:{kicker:"TERMINAL RESULT + ACKNOWLEDGEMENT",title:"Return the captured result.",description:"Records and the end frame agree with the manifest. Captured counts and digest validate; acknowledgement succeeds before the result is returned.",values:[["Execute attempts","1"],["Fetch attempts","0"],["Outcome","completed"]],wire:"execute",result:"validated result \xB7 acknowledged",rain:"",reading:"failure"}},ze=V("#weather"),Ra=ze.append("defs"),K=ze.append("g").attr("class","weather-scene");Ra.append("pattern").attr("id","haze-pattern").attr("width",7).attr("height",7).attr("patternUnits","userSpaceOnUse").append("path").attr("d","M-2,7L7,-2M5,9L9,5").attr("stroke","#7c8976").attr("stroke-width",.7).attr("opacity",.6);for(let[e,n]of[["request",T.blue],["result",T.orange]])Ra.append("marker").attr("id",`arrow-${e}`).attr("viewBox","0 -4 9 8").attr("refX",8).attr("refY",0).attr("markerWidth",7).attr("markerHeight",7).attr("orient","auto").append("path").attr("d","M0,-4L8,0L0,4Z").attr("fill",n);var qt=K.append("g").attr("aria-hidden",!0);qt.append("rect").attr("width",1120).attr("height",570).attr("fill",T.paper);qt.selectAll(".meridian").data(ke(40,1120,80)).join("line").attr("x1",e=>e).attr("x2",e=>e).attr("y1",50).attr("y2",526).attr("stroke",T.grid).attr("opacity",.23).attr("stroke-dasharray","2 4");qt.selectAll(".parallel").data(ke(70,560,70)).join("line").attr("x1",20).attr("x2",1100).attr("y1",e=>e).attr("y2",e=>e).attr("stroke",T.grid).attr("opacity",.23).attr("stroke-dasharray","2 4");qt.append("path").attr("d","M20,47H1100M20,525H1100").attr("stroke","#93a997").attr("fill","none").attr("opacity",.5);var Eu={main:[{x:495,y:237,q:3},{x:341,y:445,q:1}],head:[{x:363,y:181,q:1},{x:729,y:184,q:1},{x:712,y:447,q:1},{x:342,y:449,q:1}]},Sa=K.append("g").attr("aria-hidden",!0),Cu=kr(Dr().scale(5)),Dt={};for(let e of["main","head"]){let n=Array.from({length:25536},(o,s)=>{let a=s%224*5,i=Math.floor(s/224)*5;return An(Eu[e],l=>l.q*Math.exp(-.5*(((a-l.x)/110)**2+((i-l.y)/66)**2)))}),t=sr().size([224,114]).thresholds([.12,.22,.36,.53,.74,.94,1.25,1.7,2.25,2.75])(n),r=Sa.append("g").attr("opacity",e===b.revision?1:0);r.selectAll("path").data(t).join("path").attr("d",Cu).attr("fill",o=>o.value<1?"#729781":"#517e68").attr("fill-opacity",.038).attr("stroke",o=>o.value<1?"#7c9d87":"#557d67").attr("stroke-opacity",o=>o.value>.9?.7:.53).attr("stroke-width",o=>o.value>.9?1.4:1),Dt[e]=r}var $e=K.append("g");function O(e,n,t,r,o=12,s=T.ink,a="start",i="svg-mono"){return e.append("text").attr("x",n).attr("y",t).attr("font-size",o).attr("fill",s).attr("text-anchor",a).attr("class",i).text(r)}O($e,432,28,"CLIENT PROCESS",10,T.ink,"middle").attr("letter-spacing",2);O($e,1009,28,"DAEMON PROCESS",10,T.ink,"middle").attr("letter-spacing",1);$e.append("line").attr("x1",906).attr("x2",906).attr("y1",48).attr("y2",525).attr("stroke","#617774").attr("stroke-width",1.3).attr("stroke-dasharray","5 5");O($e,918,502,"fixed runtime",9,"#526e68");O($e,918,515,"boundary",9,"#526e68");var Du=O($e,227,73,"packages/daemon",12,T.teal).attr("letter-spacing",1),qu=O($e,33,73,"apps/cli",12,T.teal).attr("letter-spacing",1),je=K.append("g").attr("class","clickable-zone").attr("role","button").attr("tabindex",0).attr("aria-label","Read 01: Moving source package boundary");je.append("path").attr("fill","none").attr("stroke",T.orange).attr("stroke-width",2);je.selectAll("polygon").data(ke(123,495,53)).join("polygon").attr("points","0,0 11,-6 11,6").attr("fill",T.orange);var Ru=O(je,0,0,"PACKAGE FRONT",9,T.orange,"middle").attr("transform","rotate(-90)"),Da=e=>b.revision==="head"?183+Math.sin(e/86)*9:1098;function Su(e=!0){let n=e&&!b.paused?1e3:0,t=ke(92,507,20).map(o=>[Da(o),o]),r=o=>(o.interrupt(),n?o.transition().duration(n).ease(Ye):o);r(je.select("path")).attr("d",bt().curve(Rr)(t)),r(je.selectAll("polygon")).attr("transform",o=>`translate(${Da(o)},${o})`),r(Ru.attr("x",-429)).attr("y",b.revision==="head"?169:1084)}je.on("click",()=>Q("ownership")).on("keydown",e=>It(e,()=>Q("ownership")));var In=K.append("g").attr("class","clickable-zone").attr("tabindex",0).attr("role","button").attr("aria-label","Read 05: Why exactly one fetch and one reattachment?");In.append("ellipse").attr("cx",559).attr("cy",103).attr("rx",149).attr("ry",34).attr("fill","#e5e8d9").attr("stroke","#8c9a85").attr("stroke-dasharray","3 5");In.append("ellipse").attr("cx",559).attr("cy",103).attr("rx",149).attr("ry",34).attr("fill","url(#haze-pattern)").attr("opacity",.6);O(In,559,101,"U / why exactly 1 + 1?",13,T.ink,"middle").attr("class","svg-mono svg-label");O(In,559,117,"default calibration unexplained",9,T.ink,"middle").attr("class","svg-mono svg-label");In.on("click",()=>Q("forecast")).on("keydown",e=>It(e,()=>Q("forecast")));var Fe=K.append("g").attr("aria-hidden",!0),Br=bt().curve(Sr.alpha(.5)),Iu=Br([[105,285],[336,279],[552,259],[796,272],[1020,287]]),Ia=Br([[1020,318],[839,340],[644,365],[420,382],[107,332]]);for(let[e,n,t]of[["request",Iu,T.blue],["result",Ia,T.orange]])Fe.append("path").attr("data-flow-background",e).attr("d",n).attr("fill","none").attr("stroke",t).attr("stroke-width",12).attr("stroke-opacity",.055),Fe.append("path").attr("data-flow-background",e).attr("d",n).attr("fill","none").attr("stroke",t).attr("stroke-width",1.1).attr("opacity",.5),Fe.append("path").attr("id",`wind-${e}`).attr("d",n).attr("fill","none").attr("stroke",t).attr("stroke-width",2.2).attr("stroke-dasharray","10 15").attr("marker-end",`url(#arrow-${e})`);var Ta=O(Fe,567,247,"",11,T.blue,"middle","svg-mono svg-label"),Tu=O(Fe,550,404,"",11,T.orange,"middle","svg-mono svg-label"),de=K.append("g").attr("aria-hidden",!0);de.append("circle").attr("cx",85).attr("cy",308).attr("r",16).attr("fill",T.ink);O(de,85,313,"C",15,"#f5f1e4","middle","svg-serif");O(de,85,244,"CLI",14,T.ink,"middle","svg-serif");O(de,85,262,"caller",14,T.ink,"middle","svg-serif");de.append("circle").attr("cx",1037).attr("cy",302).attr("r",18).attr("fill",T.ink);O(de,1037,308,"A",17,"#f5f1e4","middle","svg-serif");O(de,1006,227,"Accepted work",18,T.ink,"middle","svg-serif");O(de,1006,249,"same request identity",9,T.ink,"middle");O(de,1006,376,"server context",9,T.ink,"middle");O(de,1006,391,"outside the role census",8,T.ink,"middle");var _a=K.append("g"),le={};function en(e,{x:n,y:t,q:r,title:o,lines:s,reading:a,role:i}){let l=e.append("g").attr("class","station").attr("transform",`translate(${n},${t})`).attr("tabindex",0).attr("role","button").attr("aria-label",`${o}, ${r} selected ${r===1?"role":"roles"}; inspect owner`).attr("data-owner",i||"combined");l.append("rect").attr("class","halo").attr("x",-135).attr("y",-40).attr("width",270).attr("height",95).attr("rx",30);let c=O(l,0,-5,"H",35,T.ink,"middle","svg-serif svg-label");return O(l,19,1,String(r),15,T.teal,"start","svg-mono svg-label"),O(l,0,18,o,14,T.ink,"middle","svg-serif svg-label"),s.forEach((u,p)=>O(l,0,35+p*13,u,9,T.ink,"middle","svg-mono svg-label").attr("data-role-detail",p===1?i||"combined":null)),l.on("click",()=>Q(a,i)).on("keydown",u=>It(u,()=>Q(a,i))),l}le.main=_a.append("g").attr("data-owner-revision","main");en(le.main,{x:495,y:201,q:3,title:"LocalDaemonTransport file",lines:["socket I/O \xB7 accepted recovery","embedded transfer receiver"],reading:"ownership"});en(le.main,{x:341,y:455,q:1,title:"OrderedCommandOutput",lines:["command-execution-result.ts","capture retained"],reading:"ownership",role:"capture"});le.head=_a.append("g").attr("data-owner-revision","head");en(le.head,{x:363,y:183,q:1,title:"Execution client",lines:["execution-client.ts","accepted recovery"],reading:"reattach",role:"recovery"});en(le.head,{x:746,y:186,q:1,title:"Socket client",lines:["socket-client.ts","raw I/O"],reading:"ownership",role:"socket"});en(le.head,{x:712,y:464,q:1,title:"Transfer receiver",lines:["result-transfer-receiver.ts","manifest + next offset"],reading:"fetch",role:"receiver"});en(le.head,{x:342,y:458,q:1,title:"Output capture",lines:["client-result-capture.ts","appended records + digest"],reading:"fetch",role:"capture"});var Ze=K.append("g").attr("aria-hidden",!0);Ze.append("ellipse").attr("cx",853).attr("cy",307).attr("rx",37).attr("ry",64).attr("fill","#bc7442").attr("opacity",.075);Ze.selectAll("line").data(ke(28)).join("line").attr("x1",e=>829+e%4*15).attr("x2",e=>823+e%4*15).attr("y1",e=>255+Math.floor(e/4)*15).attr("y2",e=>267+Math.floor(e/4)*15).attr("stroke",T.orange).attr("stroke-width",1.2).attr("opacity",.6);var _u=O(Ze,849,401,"LINK CLOSE",9,T.orange,"middle","svg-mono svg-label"),Rt=K.append("g").attr("class","clickable-zone").attr("role","button").attr("tabindex",0).attr("aria-label","Read 04: Exhausted fetch corruption is terminal");Rt.append("circle").attr("cx",605).attr("cy",365).attr("r",18).attr("fill","#f0e2cf").attr("stroke",T.orange);Rt.append("path").attr("d","M598,358L612,372M612,358L598,372").attr("stroke",T.orange).attr("stroke-width",2);Rt.on("click",()=>Q("failure")).on("keydown",e=>It(e,()=>Q("failure")));var St=K.append("g").attr("aria-hidden",!0);O(St,26,545,"H = SELECTED ROLES / SOURCE FILE",9,"#4c695f");O(St,26,558,"CONTOURS & GEOGRAPHY ARE ILLUSTRATIVE",8,"#657b6f");var Mu=O(St,882,546,"1 + 1 + 1 + 1 = 4 roles",10,T.ink,"end");O(St,882,559,"local calls simplified \xB7 socket hop at dashed line",8,"#657b6f","end");var Tn=_r().extent([[0,0],[1120,570]]).translateExtent([[0,0],[1120,570]]).scaleExtent([1,3.5]).clickDistance(5).on("zoom",e=>K.attr("transform",e.transform));ze.call(Tn).on("dblclick.zoom",null);M("#zoom-in").addEventListener("click",()=>ze.transition().duration(b.paused?0:300).call(Tn.scaleBy,1.45));M("#zoom-out").addEventListener("click",()=>ze.transition().duration(b.paused?0:300).call(Tn.scaleBy,1/1.45));M("#zoom-fit").addEventListener("click",()=>ze.transition().duration(b.paused?0:300).call(Tn.transform,Se));function It(e,n){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),n())}function Pr(){if(Fe.selectAll("path").interrupt("wind"),Ze.interrupt("rain"),b.paused||document.hidden)return;let e=(t,r)=>{b.paused||document.hidden||t.attr("stroke-dashoffset",0).transition("wind").duration(r).ease(Zt).attr("stroke-dashoffset",-25).on("end",()=>e(t,r))};e(V("#wind-request"),1350),b.condition!=="exhausted"&&e(V("#wind-result"),1650);function n(){b.paused||document.hidden||b.condition==="clear"||Ze.attr("opacity",.9).transition("rain").duration(1250).ease(dt).attr("opacity",.45).transition("rain").duration(1250).attr("opacity",.9).on("end",n)}n()}function Or(e=!0){document.querySelectorAll("[data-revision]").forEach(n=>n.setAttribute("aria-pressed",String(n.dataset.revision===b.revision))),M("#revision-note").textContent=b.revision==="head"?"Four roles. Four package files. Still client-side.":"Four roles. Three share the transport file in apps/cli.";for(let n of["main","head"]){let t=n===b.revision;Dt[n].interrupt(),(e&&!b.paused?Dt[n].transition().duration(900):Dt[n]).attr("opacity",t?1:0),le[n].attr("display",t?null:"none").attr("aria-hidden",!t),le[n].selectAll("[tabindex]").attr("tabindex",t?0:-1)}Du.text(b.revision==="head"?"packages/daemon":"apps/cli owns all four roles").attr("x",b.revision==="head"?227:237),qu.attr("opacity",b.revision==="head"?1:0),Mu.text(b.revision==="head"?"1 + 1 + 1 + 1 = 4 roles":"3 + 1 = 4 roles"),Ta.attr("x",b.revision==="head"?567:760),Su(e)}function Ma(){let e=Mr[b.condition];M("#condition").value=b.condition,M("#report-kicker").textContent=e.kicker,M("#report-title").textContent=e.title,M("#report-description").textContent=e.description,M("#report-values").innerHTML=e.values.map(([o,s])=>`<div><dt>${ne(o)}</dt><dd>${ne(s)}</dd></div>`).join(""),Ta.text(e.wire),Tu.text(e.result),_u.text(e.rain);let n={fetch:"kept \xB7 next offset 1",reattach:"fresh \xB7 next offset 0",exhausted:"incomplete \xB7 terminal",clear:"validated \xB7 complete"}[b.condition],t={fetch:"kept \xB7 record 0 appended",reattach:"fresh \xB7 starts empty",exhausted:"partial output disposed",clear:"returned after acknowledgement"}[b.condition];K.selectAll('[data-role-detail="receiver"]').text(n),K.selectAll('[data-role-detail="combined"]').text("receiver "+n),K.selectAll('[data-role-detail="capture"]').text(t);let r=b.condition==="exhausted"?Br([[1020,318],[839,340],[625,363]]):Ia;Fe.selectAll('[data-flow-background="result"]').attr("d",r),V("#wind-result").attr("d",r).attr("marker-end",b.condition==="exhausted"?null:"url(#arrow-result)"),Ze.attr("display",b.condition==="clear"?"none":null),Rt.attr("display",b.condition==="exhausted"?null:"none").attr("tabindex",b.condition==="exhausted"?0:-1),V("#wind-result").attr("opacity",b.condition==="exhausted"?.28:1),Pr()}function Ar(){let e=M("#motion-toggle");e.setAttribute("aria-pressed",String(b.paused)),e.innerHTML=b.paused?"\u25B7 Resume motion":"\u2161 Pause motion",b.paused&&(Sa.selectAll("*").interrupt(),je.selectAll("*").interrupt(),Or(!1)),Pr()}document.querySelectorAll("[data-revision]").forEach(e=>e.addEventListener("click",()=>{b.revision=e.dataset.revision,Or()}));M("#condition").addEventListener("change",e=>{b.condition=e.target.value,Ma()});M("#motion-toggle").addEventListener("click",()=>{b.paused=!b.paused,Ar()});M("#trace-condition").addEventListener("click",()=>Q(Mr[b.condition].reading));qa.addEventListener("change",e=>{b.paused=e.matches,Ar()});document.addEventListener("visibilitychange",Pr);var Ne=M("#reading-dialog"),Sn=M("#source-dialog"),Rn,Ba,Pa;function Q(e,n=null,t=!0){let r=J.readings.findIndex(o=>o.id===e);r<0||(Ne.open||(Rn=document.activeElement),b.reading=r,b.role=n,Bu(),Ne.open||Ne.showModal(),Ne.scrollTop=0,t&&window.history.pushState({reading:e},"",`#reading/${e}`))}function Bu(){let e=J.readings[b.reading];M("#reading-label").textContent=`READING ${e.number} / ${J.readings.length.toString().padStart(2,"0")} \xB7 ${b.revision==="head"?"#149":"MAIN"} MAP`;let n="";if(b.role){let t=J.roles.find(r=>r.id===b.role);if(t){let r=t[b.revision];n=`<div class="dialog-owner"><b>${ne(t.name)} / ${ne(t[b.revision+"Owner"])}</b><br>${ne(J.sources[r].path)}<br>${b.revision==="head"?"Daemon package, client process":"CLI source, client process"}</div>`}}M("#reading-content").innerHTML=`<h2 id="reading-title">${ne(e.title)}</h2>${n}<p class="reading-summary">${ne(e.summary)}</p><p><span class="status ${e.status}">${e.status==="mixed"?"STATED + UNEXPLAINED":"STATED"}</span> ${ne(e.reason)}</p><hr><p>${ne(e.mechanism)}</p><p>${ne(e.detail)}</p><p class="eyebrow">CHECK THE SOURCE</p><div class="receipts">${e.receipts.map((t,r)=>`<button class="receipt-button" data-receipt="${e.id}:${r}">${ne(t.label)} <span>${t.start}\u2013${t.end} \u2197</span></button>`).join("")}</div>${e.id==="tests"?'<p><a href="main-tests.log">34 main tests</a> \xB7 <a href="head-tests.log">80 tip tests</a> \xB7 <a href="evidence/transport-test.diff">full scoped test diff</a></p>':""}`,M("#previous-reading").disabled=b.reading===0,M("#next-reading").disabled=b.reading===J.readings.length-1}function Lr(e=!0){Sn.open&&Sn.close(),Ne.close(),e&&window.history.replaceState({},"",Rn?.closest(".bulletin")?"#"+Rn.closest(".bulletin").id:"#map"),Rn?.isConnected&&Rn.focus({preventScroll:!0})}document.querySelectorAll(".close-dialog").forEach(e=>e.addEventListener("click",()=>Lr()));Ne.addEventListener("cancel",e=>{e.preventDefault(),Lr()});M("#previous-reading").addEventListener("click",()=>Q(J.readings[b.reading-1].id));M("#next-reading").addEventListener("click",()=>Q(J.readings[b.reading+1].id));document.addEventListener("click",e=>{let n=e.target.closest("[data-reading]");if(n){e.preventDefault(),Q(n.dataset.reading);return}let t=e.target.closest("[data-receipt]");if(t){e.preventDefault();let[r,o]=t.dataset.receipt.split(":");Pu(J.readings.find(s=>s.id===r).receipts[+o])}});function Pu(e){Ba=document.activeElement,Pa=e,b.full=!1;let n=J.sources[e.source];M("#source-title").textContent=n.path,M("#source-meta").textContent=`${n.revision} \xB7 ${n.commit} \xB7 SHA-256 ${n.sha256}`,M("#standalone-source").href=`evidence/sources/${n.key}.${n.key.startsWith("pr-")?"txt":"html#L"+e.start}`,Oa(),Sn.showModal(),M("#source-code").scrollTop=0}function Oa(){let e=Pa,n=J.sources[e.source],t=n.text.split(`
`);M("#full-source").textContent=b.full?"Show excerpt":"Show full source",M("#source-code").innerHTML=t.map((r,o)=>({line:r,n:o+1})).filter(r=>b.full||r.n>=e.start&&r.n<=e.end).map(r=>`<span class="source-line${r.n>=e.start&&r.n<=e.end?" marked":""}" data-line="${r.n}"><b>${r.n}</b>${ne(r.line)||" "}</span>`).join("")}M("#full-source").addEventListener("click",()=>{b.full=!b.full,Oa();let e=M("#source-code .marked");e&&(M("#source-code").scrollTop=e.offsetTop-M("#source-code").offsetTop-16)});function Aa(){Sn.close(),Ba?.focus({preventScroll:!0})}M("#close-source").addEventListener("click",Aa);Sn.addEventListener("cancel",e=>{e.preventDefault(),Aa()});function La(){let e=location.hash.match(/^#reading\/([a-z]+)$/);e?Q(e[1],null,!1):Ne.open&&Lr(!1)}window.addEventListener("popstate",La);window.addEventListener("beforeprint",()=>{M(".source-book").open=!0,ze.call(Tn.transform,Se)});Or(!1);Ma();Ar();La();window.weatherMap={state:b,data:J,conditions:Mr};})();
