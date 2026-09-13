(()=>{var Q=class extends Map{constructor(n,t=Or){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:t}}),n!=null)for(let[r,o]of n)this.set(r,o)}get(n){return super.get(Mn(this,n))}has(n){return super.has(Mn(this,n))}set(n,t){return super.set(Mr(this,n),t)}delete(n){return super.delete(qr(this,n))}};function Mn({_intern:e,_key:n},t){let r=n(t);return e.has(r)?e.get(r):t}function Mr({_intern:e,_key:n},t){let r=n(t);return e.has(r)?e.get(r):(e.set(r,t),t)}function qr({_intern:e,_key:n},t){let r=n(t);return e.has(r)&&(t=e.get(r),e.delete(r)),t}function Or(e){return e!==null&&typeof e=="object"?e.valueOf():e}function Se(e,n,t){e=+e,n=+n,t=(o=arguments.length)<2?(n=e,e=0,1):o<3?1:+t;for(var r=-1,o=Math.max(0,Math.ceil((n-e)/t))|0,s=new Array(o);++r<o;)s[r]=e+r*t;return s}var Ar={value:()=>{}};function On(){for(var e=0,n=arguments.length,t={},r;e<n;++e){if(!(r=arguments[e]+"")||r in t||/[\s.]/.test(r))throw new Error("illegal type: "+r);t[r]=[]}return new Ce(t)}function Ce(e){this._=e}function _r(e,n){return e.trim().split(/^|\s+/).map(function(t){var r="",o=t.indexOf(".");if(o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:r}})}Ce.prototype=On.prototype={constructor:Ce,on:function(e,n){var t=this._,r=_r(e+"",t),o,s=-1,a=r.length;if(arguments.length<2){for(;++s<a;)if((o=(e=r[s]).type)&&(o=Nr(t[o],e.name)))return o;return}if(n!=null&&typeof n!="function")throw new Error("invalid callback: "+n);for(;++s<a;)if(o=(e=r[s]).type)t[o]=qn(t[o],e.name,n);else if(n==null)for(o in t)t[o]=qn(t[o],e.name,null);return this},copy:function(){var e={},n=this._;for(var t in n)e[t]=n[t].slice();return new Ce(e)},call:function(e,n){if((o=arguments.length-2)>0)for(var t=new Array(o),r=0,o,s;r<o;++r)t[r]=arguments[r+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(s=this._[e],r=0,o=s.length;r<o;++r)s[r].value.apply(n,t)},apply:function(e,n,t){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var r=this._[e],o=0,s=r.length;o<s;++o)r[o].value.apply(n,t)}};function Nr(e,n){for(var t=0,r=e.length,o;t<r;++t)if((o=e[t]).name===n)return o.value}function qn(e,n,t){for(var r=0,o=e.length;r<o;++r)if(e[r].name===n){e[r]=Ar,e=e.slice(0,r).concat(e.slice(r+1));break}return t!=null&&e.push({name:n,value:t}),e}var an=On;var Ee="http://www.w3.org/1999/xhtml",cn={svg:"http://www.w3.org/2000/svg",xhtml:Ee,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function M(e){var n=e+="",t=n.indexOf(":");return t>=0&&(n=e.slice(0,t))!=="xmlns"&&(e=e.slice(t+1)),cn.hasOwnProperty(n)?{space:cn[n],local:e}:e}function Lr(e){return function(){var n=this.ownerDocument,t=this.namespaceURI;return t===Ee&&n.documentElement.namespaceURI===Ee?n.createElement(e):n.createElementNS(t,e)}}function jr(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function Te(e){var n=M(e);return(n.local?jr:Lr)(n)}function Wr(){}function U(e){return e==null?Wr:function(){return this.querySelector(e)}}function An(e){typeof e!="function"&&(e=U(e));for(var n=this._groups,t=n.length,r=new Array(t),o=0;o<t;++o)for(var s=n[o],a=s.length,i=r[o]=new Array(a),d,u,c=0;c<a;++c)(d=s[c])&&(u=e.call(d,d.__data__,c,s))&&("__data__"in d&&(u.__data__=d.__data__),i[c]=u);return new k(r,this._parents)}function dn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Fr(){return[]}function ae(e){return e==null?Fr:function(){return this.querySelectorAll(e)}}function Ur(e){return function(){return dn(e.apply(this,arguments))}}function _n(e){typeof e=="function"?e=Ur(e):e=ae(e);for(var n=this._groups,t=n.length,r=[],o=[],s=0;s<t;++s)for(var a=n[s],i=a.length,d,u=0;u<i;++u)(d=a[u])&&(r.push(e.call(d,d.__data__,u,a)),o.push(d));return new k(r,o)}function ie(e){return function(){return this.matches(e)}}function Pe(e){return function(n){return n.matches(e)}}var Hr=Array.prototype.find;function Vr(e){return function(){return Hr.call(this.children,e)}}function Gr(){return this.firstElementChild}function Nn(e){return this.select(e==null?Gr:Vr(typeof e=="function"?e:Pe(e)))}var $r=Array.prototype.filter;function Kr(){return Array.from(this.children)}function zr(e){return function(){return $r.call(this.children,e)}}function Ln(e){return this.selectAll(e==null?Kr:zr(typeof e=="function"?e:Pe(e)))}function jn(e){typeof e!="function"&&(e=ie(e));for(var n=this._groups,t=n.length,r=new Array(t),o=0;o<t;++o)for(var s=n[o],a=s.length,i=r[o]=[],d,u=0;u<a;++u)(d=s[u])&&e.call(d,d.__data__,u,s)&&i.push(d);return new k(r,this._parents)}function Be(e){return new Array(e.length)}function Wn(){return new k(this._enter||this._groups.map(Be),this._parents)}function ce(e,n){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=n}ce.prototype={constructor:ce,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,n){return this._parent.insertBefore(e,n)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function Fn(e){return function(){return e}}function Yr(e,n,t,r,o,s){for(var a=0,i,d=n.length,u=s.length;a<u;++a)(i=n[a])?(i.__data__=s[a],r[a]=i):t[a]=new ce(e,s[a]);for(;a<d;++a)(i=n[a])&&(o[a]=i)}function Jr(e,n,t,r,o,s,a){var i,d,u=new Map,c=n.length,l=s.length,p=new Array(c),m;for(i=0;i<c;++i)(d=n[i])&&(p[i]=m=a.call(d,d.__data__,i,n)+"",u.has(m)?o[i]=d:u.set(m,d));for(i=0;i<l;++i)m=a.call(e,s[i],i,s)+"",(d=u.get(m))?(r[i]=d,d.__data__=s[i],u.delete(m)):t[i]=new ce(e,s[i]);for(i=0;i<c;++i)(d=n[i])&&u.get(p[i])===d&&(o[i]=d)}function Qr(e){return e.__data__}function Un(e,n){if(!arguments.length)return Array.from(this,Qr);var t=n?Jr:Yr,r=this._parents,o=this._groups;typeof e!="function"&&(e=Fn(e));for(var s=o.length,a=new Array(s),i=new Array(s),d=new Array(s),u=0;u<s;++u){var c=r[u],l=o[u],p=l.length,m=Xr(e.call(c,c&&c.__data__,u,r)),w=m.length,g=i[u]=new Array(w),f=a[u]=new Array(w),A=d[u]=new Array(p);t(c,l,g,f,A,m,n);for(var _=0,F=0,J,se;_<w;++_)if(J=g[_]){for(_>=F&&(F=_+1);!(se=f[F])&&++F<w;);J._next=se||null}}return a=new k(a,r),a._enter=i,a._exit=d,a}function Xr(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function Hn(){return new k(this._exit||this._groups.map(Be),this._parents)}function Vn(e,n,t){var r=this.enter(),o=this,s=this.exit();return typeof e=="function"?(r=e(r),r&&(r=r.selection())):r=r.append(e+""),n!=null&&(o=n(o),o&&(o=o.selection())),t==null?s.remove():t(s),r&&o?r.merge(o).order():o}function Gn(e){for(var n=e.selection?e.selection():e,t=this._groups,r=n._groups,o=t.length,s=r.length,a=Math.min(o,s),i=new Array(o),d=0;d<a;++d)for(var u=t[d],c=r[d],l=u.length,p=i[d]=new Array(l),m,w=0;w<l;++w)(m=u[w]||c[w])&&(p[w]=m);for(;d<o;++d)i[d]=t[d];return new k(i,this._parents)}function $n(){for(var e=this._groups,n=-1,t=e.length;++n<t;)for(var r=e[n],o=r.length-1,s=r[o],a;--o>=0;)(a=r[o])&&(s&&a.compareDocumentPosition(s)^4&&s.parentNode.insertBefore(a,s),s=a);return this}function Kn(e){e||(e=Zr);function n(l,p){return l&&p?e(l.__data__,p.__data__):!l-!p}for(var t=this._groups,r=t.length,o=new Array(r),s=0;s<r;++s){for(var a=t[s],i=a.length,d=o[s]=new Array(i),u,c=0;c<i;++c)(u=a[c])&&(d[c]=u);d.sort(n)}return new k(o,this._parents).order()}function Zr(e,n){return e<n?-1:e>n?1:e>=n?0:NaN}function zn(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function Yn(){return Array.from(this)}function Jn(){for(var e=this._groups,n=0,t=e.length;n<t;++n)for(var r=e[n],o=0,s=r.length;o<s;++o){var a=r[o];if(a)return a}return null}function Qn(){let e=0;for(let n of this)++e;return e}function Xn(){return!this.node()}function Zn(e){for(var n=this._groups,t=0,r=n.length;t<r;++t)for(var o=n[t],s=0,a=o.length,i;s<a;++s)(i=o[s])&&e.call(i,i.__data__,s,o);return this}function eo(e){return function(){this.removeAttribute(e)}}function no(e){return function(){this.removeAttributeNS(e.space,e.local)}}function to(e,n){return function(){this.setAttribute(e,n)}}function ro(e,n){return function(){this.setAttributeNS(e.space,e.local,n)}}function oo(e,n){return function(){var t=n.apply(this,arguments);t==null?this.removeAttribute(e):this.setAttribute(e,t)}}function so(e,n){return function(){var t=n.apply(this,arguments);t==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,t)}}function et(e,n){var t=M(e);if(arguments.length<2){var r=this.node();return t.local?r.getAttributeNS(t.space,t.local):r.getAttribute(t)}return this.each((n==null?t.local?no:eo:typeof n=="function"?t.local?so:oo:t.local?ro:to)(t,n))}function Me(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function ao(e){return function(){this.style.removeProperty(e)}}function io(e,n,t){return function(){this.style.setProperty(e,n,t)}}function co(e,n,t){return function(){var r=n.apply(this,arguments);r==null?this.style.removeProperty(e):this.style.setProperty(e,r,t)}}function nt(e,n,t){return arguments.length>1?this.each((n==null?ao:typeof n=="function"?co:io)(e,n,t??"")):N(this.node(),e)}function N(e,n){return e.style.getPropertyValue(n)||Me(e).getComputedStyle(e,null).getPropertyValue(n)}function uo(e){return function(){delete this[e]}}function lo(e,n){return function(){this[e]=n}}function po(e,n){return function(){var t=n.apply(this,arguments);t==null?delete this[e]:this[e]=t}}function tt(e,n){return arguments.length>1?this.each((n==null?uo:typeof n=="function"?po:lo)(e,n)):this.node()[e]}function rt(e){return e.trim().split(/^|\s+/)}function un(e){return e.classList||new ot(e)}function ot(e){this._node=e,this._names=rt(e.getAttribute("class")||"")}ot.prototype={add:function(e){var n=this._names.indexOf(e);n<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var n=this._names.indexOf(e);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function st(e,n){for(var t=un(e),r=-1,o=n.length;++r<o;)t.add(n[r])}function at(e,n){for(var t=un(e),r=-1,o=n.length;++r<o;)t.remove(n[r])}function mo(e){return function(){st(this,e)}}function ho(e){return function(){at(this,e)}}function yo(e,n){return function(){(n.apply(this,arguments)?st:at)(this,e)}}function it(e,n){var t=rt(e+"");if(arguments.length<2){for(var r=un(this.node()),o=-1,s=t.length;++o<s;)if(!r.contains(t[o]))return!1;return!0}return this.each((typeof n=="function"?yo:n?mo:ho)(t,n))}function fo(){this.textContent=""}function wo(e){return function(){this.textContent=e}}function vo(e){return function(){var n=e.apply(this,arguments);this.textContent=n??""}}function ct(e){return arguments.length?this.each(e==null?fo:(typeof e=="function"?vo:wo)(e)):this.node().textContent}function go(){this.innerHTML=""}function ko(e){return function(){this.innerHTML=e}}function xo(e){return function(){var n=e.apply(this,arguments);this.innerHTML=n??""}}function dt(e){return arguments.length?this.each(e==null?go:(typeof e=="function"?xo:ko)(e)):this.node().innerHTML}function bo(){this.nextSibling&&this.parentNode.appendChild(this)}function ut(){return this.each(bo)}function Do(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function lt(){return this.each(Do)}function pt(e){var n=typeof e=="function"?e:Te(e);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function Ro(){return null}function mt(e,n){var t=typeof e=="function"?e:Te(e),r=n==null?Ro:typeof n=="function"?n:U(n);return this.select(function(){return this.insertBefore(t.apply(this,arguments),r.apply(this,arguments)||null)})}function Io(){var e=this.parentNode;e&&e.removeChild(this)}function ht(){return this.each(Io)}function So(){var e=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(e,this.nextSibling):e}function Co(){var e=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(e,this.nextSibling):e}function yt(e){return this.select(e?Co:So)}function ft(e){return arguments.length?this.property("__data__",e):this.node().__data__}function Eo(e){return function(n){e.call(this,n,this.__data__)}}function To(e){return e.trim().split(/^|\s+/).map(function(n){var t="",r=n.indexOf(".");return r>=0&&(t=n.slice(r+1),n=n.slice(0,r)),{type:n,name:t}})}function Po(e){return function(){var n=this.__on;if(n){for(var t=0,r=-1,o=n.length,s;t<o;++t)s=n[t],(!e.type||s.type===e.type)&&s.name===e.name?this.removeEventListener(s.type,s.listener,s.options):n[++r]=s;++r?n.length=r:delete this.__on}}}function Bo(e,n,t){return function(){var r=this.__on,o,s=Eo(n);if(r){for(var a=0,i=r.length;a<i;++a)if((o=r[a]).type===e.type&&o.name===e.name){this.removeEventListener(o.type,o.listener,o.options),this.addEventListener(o.type,o.listener=s,o.options=t),o.value=n;return}}this.addEventListener(e.type,s,t),o={type:e.type,name:e.name,value:n,listener:s,options:t},r?r.push(o):this.__on=[o]}}function wt(e,n,t){var r=To(e+""),o,s=r.length,a;if(arguments.length<2){var i=this.node().__on;if(i){for(var d=0,u=i.length,c;d<u;++d)for(o=0,c=i[d];o<s;++o)if((a=r[o]).type===c.type&&a.name===c.name)return c.value}return}for(i=n?Bo:Po,o=0;o<s;++o)this.each(i(r[o],n,t));return this}function vt(e,n,t){var r=Me(e),o=r.CustomEvent;typeof o=="function"?o=new o(n,t):(o=r.document.createEvent("Event"),t?(o.initEvent(n,t.bubbles,t.cancelable),o.detail=t.detail):o.initEvent(n,!1,!1)),e.dispatchEvent(o)}function Mo(e,n){return function(){return vt(this,e,n)}}function qo(e,n){return function(){return vt(this,e,n.apply(this,arguments))}}function gt(e,n){return this.each((typeof n=="function"?qo:Mo)(e,n))}function*kt(){for(var e=this._groups,n=0,t=e.length;n<t;++n)for(var r=e[n],o=0,s=r.length,a;o<s;++o)(a=r[o])&&(yield a)}var ln=[null];function k(e,n){this._groups=e,this._parents=n}function xt(){return new k([[document.documentElement]],ln)}function Oo(){return this}k.prototype=xt.prototype={constructor:k,select:An,selectAll:_n,selectChild:Nn,selectChildren:Ln,filter:jn,data:Un,enter:Wn,exit:Hn,join:Vn,merge:Gn,selection:Oo,order:$n,sort:Kn,call:zn,nodes:Yn,node:Jn,size:Qn,empty:Xn,each:Zn,attr:et,style:nt,property:tt,classed:it,text:ct,html:dt,raise:ut,lower:lt,append:pt,insert:mt,remove:ht,clone:yt,datum:ft,on:wt,dispatch:gt,[Symbol.iterator]:kt};var q=xt;function X(e){return typeof e=="string"?new k([[document.querySelector(e)]],[document.documentElement]):new k([[e]],ln)}function qe(e,n,t){e.prototype=n.prototype=t,t.constructor=e}function pn(e,n){var t=Object.create(e.prototype);for(var r in n)t[r]=n[r];return t}function le(){}var de=.7,_e=1/de,Z="\\s*([+-]?\\d+)\\s*",ue="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",B="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",Ao=/^#([0-9a-f]{3,8})$/,_o=new RegExp(`^rgb\\(${Z},${Z},${Z}\\)$`),No=new RegExp(`^rgb\\(${B},${B},${B}\\)$`),Lo=new RegExp(`^rgba\\(${Z},${Z},${Z},${ue}\\)$`),jo=new RegExp(`^rgba\\(${B},${B},${B},${ue}\\)$`),Wo=new RegExp(`^hsl\\(${ue},${B},${B}\\)$`),Fo=new RegExp(`^hsla\\(${ue},${B},${B},${ue}\\)$`),bt={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};qe(le,L,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Dt,formatHex:Dt,formatHex8:Uo,formatHsl:Ho,formatRgb:Rt,toString:Rt});function Dt(){return this.rgb().formatHex()}function Uo(){return this.rgb().formatHex8()}function Ho(){return Pt(this).formatHsl()}function Rt(){return this.rgb().formatRgb()}function L(e){var n,t;return e=(e+"").trim().toLowerCase(),(n=Ao.exec(e))?(t=n[1].length,n=parseInt(n[1],16),t===6?It(n):t===3?new C(n>>8&15|n>>4&240,n>>4&15|n&240,(n&15)<<4|n&15,1):t===8?Oe(n>>24&255,n>>16&255,n>>8&255,(n&255)/255):t===4?Oe(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|n&240,((n&15)<<4|n&15)/255):null):(n=_o.exec(e))?new C(n[1],n[2],n[3],1):(n=No.exec(e))?new C(n[1]*255/100,n[2]*255/100,n[3]*255/100,1):(n=Lo.exec(e))?Oe(n[1],n[2],n[3],n[4]):(n=jo.exec(e))?Oe(n[1]*255/100,n[2]*255/100,n[3]*255/100,n[4]):(n=Wo.exec(e))?Et(n[1],n[2]/100,n[3]/100,1):(n=Fo.exec(e))?Et(n[1],n[2]/100,n[3]/100,n[4]):bt.hasOwnProperty(e)?It(bt[e]):e==="transparent"?new C(NaN,NaN,NaN,0):null}function It(e){return new C(e>>16&255,e>>8&255,e&255,1)}function Oe(e,n,t,r){return r<=0&&(e=n=t=NaN),new C(e,n,t,r)}function Vo(e){return e instanceof le||(e=L(e)),e?(e=e.rgb(),new C(e.r,e.g,e.b,e.opacity)):new C}function ee(e,n,t,r){return arguments.length===1?Vo(e):new C(e,n,t,r??1)}function C(e,n,t,r){this.r=+e,this.g=+n,this.b=+t,this.opacity=+r}qe(C,ee,pn(le,{brighter(e){return e=e==null?_e:Math.pow(_e,e),new C(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?de:Math.pow(de,e),new C(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new C(V(this.r),V(this.g),V(this.b),Ne(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:St,formatHex:St,formatHex8:Go,formatRgb:Ct,toString:Ct}));function St(){return`#${H(this.r)}${H(this.g)}${H(this.b)}`}function Go(){return`#${H(this.r)}${H(this.g)}${H(this.b)}${H((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ct(){let e=Ne(this.opacity);return`${e===1?"rgb(":"rgba("}${V(this.r)}, ${V(this.g)}, ${V(this.b)}${e===1?")":`, ${e})`}`}function Ne(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function V(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function H(e){return e=V(e),(e<16?"0":"")+e.toString(16)}function Et(e,n,t,r){return r<=0?e=n=t=NaN:t<=0||t>=1?e=n=NaN:n<=0&&(e=NaN),new P(e,n,t,r)}function Pt(e){if(e instanceof P)return new P(e.h,e.s,e.l,e.opacity);if(e instanceof le||(e=L(e)),!e)return new P;if(e instanceof P)return e;e=e.rgb();var n=e.r/255,t=e.g/255,r=e.b/255,o=Math.min(n,t,r),s=Math.max(n,t,r),a=NaN,i=s-o,d=(s+o)/2;return i?(n===s?a=(t-r)/i+(t<r)*6:t===s?a=(r-n)/i+2:a=(n-t)/i+4,i/=d<.5?s+o:2-s-o,a*=60):i=d>0&&d<1?0:a,new P(a,i,d,e.opacity)}function Bt(e,n,t,r){return arguments.length===1?Pt(e):new P(e,n,t,r??1)}function P(e,n,t,r){this.h=+e,this.s=+n,this.l=+t,this.opacity=+r}qe(P,Bt,pn(le,{brighter(e){return e=e==null?_e:Math.pow(_e,e),new P(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?de:Math.pow(de,e),new P(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,n=isNaN(e)||isNaN(this.s)?0:this.s,t=this.l,r=t+(t<.5?t:1-t)*n,o=2*t-r;return new C(mn(e>=240?e-240:e+120,o,r),mn(e,o,r),mn(e<120?e+240:e-120,o,r),this.opacity)},clamp(){return new P(Tt(this.h),Ae(this.s),Ae(this.l),Ne(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=Ne(this.opacity);return`${e===1?"hsl(":"hsla("}${Tt(this.h)}, ${Ae(this.s)*100}%, ${Ae(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Tt(e){return e=(e||0)%360,e<0?e+360:e}function Ae(e){return Math.max(0,Math.min(1,e||0))}function mn(e,n,t){return(e<60?n+(t-n)*e/60:e<180?t:e<240?n+(t-n)*(240-e)/60:n)*255}function hn(e,n,t,r,o){var s=e*e,a=s*e;return((1-3*e+3*s-a)*n+(4-6*s+3*a)*t+(1+3*e+3*s-3*a)*r+a*o)/6}function Mt(e){var n=e.length-1;return function(t){var r=t<=0?t=0:t>=1?(t=1,n-1):Math.floor(t*n),o=e[r],s=e[r+1],a=r>0?e[r-1]:2*o-s,i=r<n-1?e[r+2]:2*s-o;return hn((t-r/n)*n,a,o,s,i)}}function qt(e){var n=e.length;return function(t){var r=Math.floor(((t%=1)<0?++t:t)*n),o=e[(r+n-1)%n],s=e[r%n],a=e[(r+1)%n],i=e[(r+2)%n];return hn((t-r/n)*n,o,s,a,i)}}var yn=e=>()=>e;function $o(e,n){return function(t){return e+t*n}}function Ko(e,n,t){return e=Math.pow(e,t),n=Math.pow(n,t)-e,t=1/t,function(r){return Math.pow(e+r*n,t)}}function Ot(e){return(e=+e)==1?Le:function(n,t){return t-n?Ko(n,t,e):yn(isNaN(n)?t:n)}}function Le(e,n){var t=n-e;return t?$o(e,t):yn(isNaN(e)?n:e)}var je=(function e(n){var t=Ot(n);function r(o,s){var a=t((o=ee(o)).r,(s=ee(s)).r),i=t(o.g,s.g),d=t(o.b,s.b),u=Le(o.opacity,s.opacity);return function(c){return o.r=a(c),o.g=i(c),o.b=d(c),o.opacity=u(c),o+""}}return r.gamma=e,r})(1);function At(e){return function(n){var t=n.length,r=new Array(t),o=new Array(t),s=new Array(t),a,i;for(a=0;a<t;++a)i=ee(n[a]),r[a]=i.r||0,o[a]=i.g||0,s[a]=i.b||0;return r=e(r),o=e(o),s=e(s),i.opacity=1,function(d){return i.r=r(d),i.g=o(d),i.b=s(d),i+""}}}var zo=At(Mt),Yo=At(qt);function E(e,n){return e=+e,n=+n,function(t){return e*(1-t)+n*t}}var wn=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,fn=new RegExp(wn.source,"g");function Jo(e){return function(){return e}}function Qo(e){return function(n){return e(n)+""}}function vn(e,n){var t=wn.lastIndex=fn.lastIndex=0,r,o,s,a=-1,i=[],d=[];for(e=e+"",n=n+"";(r=wn.exec(e))&&(o=fn.exec(n));)(s=o.index)>t&&(s=n.slice(t,s),i[a]?i[a]+=s:i[++a]=s),(r=r[0])===(o=o[0])?i[a]?i[a]+=o:i[++a]=o:(i[++a]=null,d.push({i:a,x:E(r,o)})),t=fn.lastIndex;return t<n.length&&(s=n.slice(t),i[a]?i[a]+=s:i[++a]=s),i.length<2?d[0]?Qo(d[0].x):Jo(n):(n=d.length,function(u){for(var c=0,l;c<n;++c)i[(l=d[c]).i]=l.x(u);return i.join("")})}var _t=180/Math.PI,We={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function gn(e,n,t,r,o,s){var a,i,d;return(a=Math.sqrt(e*e+n*n))&&(e/=a,n/=a),(d=e*t+n*r)&&(t-=e*d,r-=n*d),(i=Math.sqrt(t*t+r*r))&&(t/=i,r/=i,d/=i),e*r<n*t&&(e=-e,n=-n,d=-d,a=-a),{translateX:o,translateY:s,rotate:Math.atan2(n,e)*_t,skewX:Math.atan(d)*_t,scaleX:a,scaleY:i}}var Fe;function Nt(e){let n=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return n.isIdentity?We:gn(n.a,n.b,n.c,n.d,n.e,n.f)}function Lt(e){return e==null?We:(Fe||(Fe=document.createElementNS("http://www.w3.org/2000/svg","g")),Fe.setAttribute("transform",e),(e=Fe.transform.baseVal.consolidate())?(e=e.matrix,gn(e.a,e.b,e.c,e.d,e.e,e.f)):We)}function jt(e,n,t,r){function o(u){return u.length?u.pop()+" ":""}function s(u,c,l,p,m,w){if(u!==l||c!==p){var g=m.push("translate(",null,n,null,t);w.push({i:g-4,x:E(u,l)},{i:g-2,x:E(c,p)})}else(l||p)&&m.push("translate("+l+n+p+t)}function a(u,c,l,p){u!==c?(u-c>180?c+=360:c-u>180&&(u+=360),p.push({i:l.push(o(l)+"rotate(",null,r)-2,x:E(u,c)})):c&&l.push(o(l)+"rotate("+c+r)}function i(u,c,l,p){u!==c?p.push({i:l.push(o(l)+"skewX(",null,r)-2,x:E(u,c)}):c&&l.push(o(l)+"skewX("+c+r)}function d(u,c,l,p,m,w){if(u!==l||c!==p){var g=m.push(o(m)+"scale(",null,",",null,")");w.push({i:g-4,x:E(u,l)},{i:g-2,x:E(c,p)})}else(l!==1||p!==1)&&m.push(o(m)+"scale("+l+","+p+")")}return function(u,c){var l=[],p=[];return u=e(u),c=e(c),s(u.translateX,u.translateY,c.translateX,c.translateY,l,p),a(u.rotate,c.rotate,l,p),i(u.skewX,c.skewX,l,p),d(u.scaleX,u.scaleY,c.scaleX,c.scaleY,l,p),u=c=null,function(m){for(var w=-1,g=p.length,f;++w<g;)l[(f=p[w]).i]=f.x(m);return l.join("")}}}var kn=jt(Nt,"px, ","px)","deg)"),xn=jt(Lt,", ",")",")");var ne=0,me=0,pe=0,Ft=1e3,Ue,he,He=0,G=0,Ve=0,ye=typeof performance=="object"&&performance.now?performance:Date,Ut=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function we(){return G||(Ut(Xo),G=ye.now()+Ve)}function Xo(){G=0}function fe(){this._call=this._time=this._next=null}fe.prototype=Ge.prototype={constructor:fe,restart:function(e,n,t){if(typeof e!="function")throw new TypeError("callback is not a function");t=(t==null?we():+t)+(n==null?0:+n),!this._next&&he!==this&&(he?he._next=this:Ue=this,he=this),this._call=e,this._time=t,bn()},stop:function(){this._call&&(this._call=null,this._time=1/0,bn())}};function Ge(e,n,t){var r=new fe;return r.restart(e,n,t),r}function Ht(){we(),++ne;for(var e=Ue,n;e;)(n=G-e._time)>=0&&e._call.call(void 0,n),e=e._next;--ne}function Wt(){G=(He=ye.now())+Ve,ne=me=0;try{Ht()}finally{ne=0,es(),G=0}}function Zo(){var e=ye.now(),n=e-He;n>Ft&&(Ve-=n,He=e)}function es(){for(var e,n=Ue,t,r=1/0;n;)n._call?(r>n._time&&(r=n._time),e=n,n=n._next):(t=n._next,n._next=null,n=e?e._next=t:Ue=t);he=e,bn(r)}function bn(e){if(!ne){me&&(me=clearTimeout(me));var n=e-G;n>24?(e<1/0&&(me=setTimeout(Wt,e-ye.now()-Ve)),pe&&(pe=clearInterval(pe))):(pe||(He=ye.now(),pe=setInterval(Zo,Ft)),ne=1,Ut(Wt))}}function $e(e,n,t){var r=new fe;return n=n==null?0:+n,r.restart(o=>{r.stop(),e(o+n)},n,t),r}var ns=an("start","end","cancel","interrupt"),ts=[],$t=0,Vt=1,ze=2,Ke=3,Gt=4,Ye=5,ve=6;function j(e,n,t,r,o,s){var a=e.__transition;if(!a)e.__transition={};else if(t in a)return;rs(e,t,{name:n,index:r,group:o,on:ns,tween:ts,time:s.time,delay:s.delay,duration:s.duration,ease:s.ease,timer:null,state:$t})}function ge(e,n){var t=x(e,n);if(t.state>$t)throw new Error("too late; already scheduled");return t}function b(e,n){var t=x(e,n);if(t.state>Ke)throw new Error("too late; already running");return t}function x(e,n){var t=e.__transition;if(!t||!(t=t[n]))throw new Error("transition not found");return t}function rs(e,n,t){var r=e.__transition,o;r[n]=t,t.timer=Ge(s,0,t.time);function s(u){t.state=Vt,t.timer.restart(a,t.delay,t.time),t.delay<=u&&a(u-t.delay)}function a(u){var c,l,p,m;if(t.state!==Vt)return d();for(c in r)if(m=r[c],m.name===t.name){if(m.state===Ke)return $e(a);m.state===Gt?(m.state=ve,m.timer.stop(),m.on.call("interrupt",e,e.__data__,m.index,m.group),delete r[c]):+c<n&&(m.state=ve,m.timer.stop(),m.on.call("cancel",e,e.__data__,m.index,m.group),delete r[c])}if($e(function(){t.state===Ke&&(t.state=Gt,t.timer.restart(i,t.delay,t.time),i(u))}),t.state=ze,t.on.call("start",e,e.__data__,t.index,t.group),t.state===ze){for(t.state=Ke,o=new Array(p=t.tween.length),c=0,l=-1;c<p;++c)(m=t.tween[c].value.call(e,e.__data__,t.index,t.group))&&(o[++l]=m);o.length=l+1}}function i(u){for(var c=u<t.duration?t.ease.call(null,u/t.duration):(t.timer.restart(d),t.state=Ye,1),l=-1,p=o.length;++l<p;)o[l].call(e,c);t.state===Ye&&(t.on.call("end",e,e.__data__,t.index,t.group),d())}function d(){t.state=ve,t.timer.stop(),delete r[n];for(var u in r)return;delete e.__transition}}function Je(e,n){var t=e.__transition,r,o,s=!0,a;if(t){n=n==null?null:n+"";for(a in t){if((r=t[a]).name!==n){s=!1;continue}o=r.state>ze&&r.state<Ye,r.state=ve,r.timer.stop(),r.on.call(o?"interrupt":"cancel",e,e.__data__,r.index,r.group),delete t[a]}s&&delete e.__transition}}function Kt(e){return this.each(function(){Je(this,e)})}function os(e,n){var t,r;return function(){var o=b(this,e),s=o.tween;if(s!==t){r=t=s;for(var a=0,i=r.length;a<i;++a)if(r[a].name===n){r=r.slice(),r.splice(a,1);break}}o.tween=r}}function ss(e,n,t){var r,o;if(typeof t!="function")throw new Error;return function(){var s=b(this,e),a=s.tween;if(a!==r){o=(r=a).slice();for(var i={name:n,value:t},d=0,u=o.length;d<u;++d)if(o[d].name===n){o[d]=i;break}d===u&&o.push(i)}s.tween=o}}function zt(e,n){var t=this._id;if(e+="",arguments.length<2){for(var r=x(this.node(),t).tween,o=0,s=r.length,a;o<s;++o)if((a=r[o]).name===e)return a.value;return null}return this.each((n==null?os:ss)(t,e,n))}function te(e,n,t){var r=e._id;return e.each(function(){var o=b(this,r);(o.value||(o.value={}))[n]=t.apply(this,arguments)}),function(o){return x(o,r).value[n]}}function Qe(e,n){var t;return(typeof n=="number"?E:n instanceof L?je:(t=L(n))?(n=t,je):vn)(e,n)}function as(e){return function(){this.removeAttribute(e)}}function is(e){return function(){this.removeAttributeNS(e.space,e.local)}}function cs(e,n,t){var r,o=t+"",s;return function(){var a=this.getAttribute(e);return a===o?null:a===r?s:s=n(r=a,t)}}function ds(e,n,t){var r,o=t+"",s;return function(){var a=this.getAttributeNS(e.space,e.local);return a===o?null:a===r?s:s=n(r=a,t)}}function us(e,n,t){var r,o,s;return function(){var a,i=t(this),d;return i==null?void this.removeAttribute(e):(a=this.getAttribute(e),d=i+"",a===d?null:a===r&&d===o?s:(o=d,s=n(r=a,i)))}}function ls(e,n,t){var r,o,s;return function(){var a,i=t(this),d;return i==null?void this.removeAttributeNS(e.space,e.local):(a=this.getAttributeNS(e.space,e.local),d=i+"",a===d?null:a===r&&d===o?s:(o=d,s=n(r=a,i)))}}function Yt(e,n){var t=M(e),r=t==="transform"?xn:Qe;return this.attrTween(e,typeof n=="function"?(t.local?ls:us)(t,r,te(this,"attr."+e,n)):n==null?(t.local?is:as)(t):(t.local?ds:cs)(t,r,n))}function ps(e,n){return function(t){this.setAttribute(e,n.call(this,t))}}function ms(e,n){return function(t){this.setAttributeNS(e.space,e.local,n.call(this,t))}}function hs(e,n){var t,r;function o(){var s=n.apply(this,arguments);return s!==r&&(t=(r=s)&&ms(e,s)),t}return o._value=n,o}function ys(e,n){var t,r;function o(){var s=n.apply(this,arguments);return s!==r&&(t=(r=s)&&ps(e,s)),t}return o._value=n,o}function Jt(e,n){var t="attr."+e;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;var r=M(e);return this.tween(t,(r.local?hs:ys)(r,n))}function fs(e,n){return function(){ge(this,e).delay=+n.apply(this,arguments)}}function ws(e,n){return n=+n,function(){ge(this,e).delay=n}}function Qt(e){var n=this._id;return arguments.length?this.each((typeof e=="function"?fs:ws)(n,e)):x(this.node(),n).delay}function vs(e,n){return function(){b(this,e).duration=+n.apply(this,arguments)}}function gs(e,n){return n=+n,function(){b(this,e).duration=n}}function Xt(e){var n=this._id;return arguments.length?this.each((typeof e=="function"?vs:gs)(n,e)):x(this.node(),n).duration}function ks(e,n){if(typeof n!="function")throw new Error;return function(){b(this,e).ease=n}}function Zt(e){var n=this._id;return arguments.length?this.each(ks(n,e)):x(this.node(),n).ease}function xs(e,n){return function(){var t=n.apply(this,arguments);if(typeof t!="function")throw new Error;b(this,e).ease=t}}function er(e){if(typeof e!="function")throw new Error;return this.each(xs(this._id,e))}function nr(e){typeof e!="function"&&(e=ie(e));for(var n=this._groups,t=n.length,r=new Array(t),o=0;o<t;++o)for(var s=n[o],a=s.length,i=r[o]=[],d,u=0;u<a;++u)(d=s[u])&&e.call(d,d.__data__,u,s)&&i.push(d);return new S(r,this._parents,this._name,this._id)}function tr(e){if(e._id!==this._id)throw new Error;for(var n=this._groups,t=e._groups,r=n.length,o=t.length,s=Math.min(r,o),a=new Array(r),i=0;i<s;++i)for(var d=n[i],u=t[i],c=d.length,l=a[i]=new Array(c),p,m=0;m<c;++m)(p=d[m]||u[m])&&(l[m]=p);for(;i<r;++i)a[i]=n[i];return new S(a,this._parents,this._name,this._id)}function bs(e){return(e+"").trim().split(/^|\s+/).every(function(n){var t=n.indexOf(".");return t>=0&&(n=n.slice(0,t)),!n||n==="start"})}function Ds(e,n,t){var r,o,s=bs(n)?ge:b;return function(){var a=s(this,e),i=a.on;i!==r&&(o=(r=i).copy()).on(n,t),a.on=o}}function rr(e,n){var t=this._id;return arguments.length<2?x(this.node(),t).on.on(e):this.each(Ds(t,e,n))}function Rs(e){return function(){var n=this.parentNode;for(var t in this.__transition)if(+t!==e)return;n&&n.removeChild(this)}}function or(){return this.on("end.remove",Rs(this._id))}function sr(e){var n=this._name,t=this._id;typeof e!="function"&&(e=U(e));for(var r=this._groups,o=r.length,s=new Array(o),a=0;a<o;++a)for(var i=r[a],d=i.length,u=s[a]=new Array(d),c,l,p=0;p<d;++p)(c=i[p])&&(l=e.call(c,c.__data__,p,i))&&("__data__"in c&&(l.__data__=c.__data__),u[p]=l,j(u[p],n,t,p,u,x(c,t)));return new S(s,this._parents,n,t)}function ar(e){var n=this._name,t=this._id;typeof e!="function"&&(e=ae(e));for(var r=this._groups,o=r.length,s=[],a=[],i=0;i<o;++i)for(var d=r[i],u=d.length,c,l=0;l<u;++l)if(c=d[l]){for(var p=e.call(c,c.__data__,l,d),m,w=x(c,t),g=0,f=p.length;g<f;++g)(m=p[g])&&j(m,n,t,g,p,w);s.push(p),a.push(c)}return new S(s,a,n,t)}var Is=q.prototype.constructor;function ir(){return new Is(this._groups,this._parents)}function Ss(e,n){var t,r,o;return function(){var s=N(this,e),a=(this.style.removeProperty(e),N(this,e));return s===a?null:s===t&&a===r?o:o=n(t=s,r=a)}}function cr(e){return function(){this.style.removeProperty(e)}}function Cs(e,n,t){var r,o=t+"",s;return function(){var a=N(this,e);return a===o?null:a===r?s:s=n(r=a,t)}}function Es(e,n,t){var r,o,s;return function(){var a=N(this,e),i=t(this),d=i+"";return i==null&&(d=i=(this.style.removeProperty(e),N(this,e))),a===d?null:a===r&&d===o?s:(o=d,s=n(r=a,i))}}function Ts(e,n){var t,r,o,s="style."+n,a="end."+s,i;return function(){var d=b(this,e),u=d.on,c=d.value[s]==null?i||(i=cr(n)):void 0;(u!==t||o!==c)&&(r=(t=u).copy()).on(a,o=c),d.on=r}}function dr(e,n,t){var r=(e+="")=="transform"?kn:Qe;return n==null?this.styleTween(e,Ss(e,r)).on("end.style."+e,cr(e)):typeof n=="function"?this.styleTween(e,Es(e,r,te(this,"style."+e,n))).each(Ts(this._id,e)):this.styleTween(e,Cs(e,r,n),t).on("end.style."+e,null)}function Ps(e,n,t){return function(r){this.style.setProperty(e,n.call(this,r),t)}}function Bs(e,n,t){var r,o;function s(){var a=n.apply(this,arguments);return a!==o&&(r=(o=a)&&Ps(e,a,t)),r}return s._value=n,s}function ur(e,n,t){var r="style."+(e+="");if(arguments.length<2)return(r=this.tween(r))&&r._value;if(n==null)return this.tween(r,null);if(typeof n!="function")throw new Error;return this.tween(r,Bs(e,n,t??""))}function Ms(e){return function(){this.textContent=e}}function qs(e){return function(){var n=e(this);this.textContent=n??""}}function lr(e){return this.tween("text",typeof e=="function"?qs(te(this,"text",e)):Ms(e==null?"":e+""))}function Os(e){return function(n){this.textContent=e.call(this,n)}}function As(e){var n,t;function r(){var o=e.apply(this,arguments);return o!==t&&(n=(t=o)&&Os(o)),n}return r._value=e,r}function pr(e){var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;return this.tween(n,As(e))}function mr(){for(var e=this._name,n=this._id,t=Xe(),r=this._groups,o=r.length,s=0;s<o;++s)for(var a=r[s],i=a.length,d,u=0;u<i;++u)if(d=a[u]){var c=x(d,n);j(d,e,t,u,a,{time:c.time+c.delay+c.duration,delay:0,duration:c.duration,ease:c.ease})}return new S(r,this._parents,e,t)}function hr(){var e,n,t=this,r=t._id,o=t.size();return new Promise(function(s,a){var i={value:a},d={value:function(){--o===0&&s()}};t.each(function(){var u=b(this,r),c=u.on;c!==e&&(n=(e=c).copy(),n._.cancel.push(i),n._.interrupt.push(i),n._.end.push(d)),u.on=n}),o===0&&s()})}var _s=0;function S(e,n,t,r){this._groups=e,this._parents=n,this._name=t,this._id=r}function yr(e){return q().transition(e)}function Xe(){return++_s}var O=q.prototype;S.prototype=yr.prototype={constructor:S,select:sr,selectAll:ar,selectChild:O.selectChild,selectChildren:O.selectChildren,filter:nr,merge:tr,selection:ir,transition:mr,call:O.call,nodes:O.nodes,node:O.node,size:O.size,empty:O.empty,each:O.each,on:rr,attr:Yt,attrTween:Jt,style:dr,styleTween:ur,text:lr,textTween:pr,remove:or,tween:zt,delay:Qt,duration:Xt,ease:Zt,easeVarying:er,end:hr,[Symbol.iterator]:O[Symbol.iterator]};function Ze(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var Ns={time:null,delay:0,duration:250,ease:Ze};function Ls(e,n){for(var t;!(t=e.__transition)||!(t=t[n]);)if(!(e=e.parentNode))throw new Error(`transition ${n} not found`);return t}function fr(e){var n,t;e instanceof S?(n=e._id,e=e._name):(n=Xe(),(t=Ns).time=we(),e=e==null?null:e+"");for(var r=this._groups,o=r.length,s=0;s<o;++s)for(var a=r[s],i=a.length,d,u=0;u<i;++u)(d=a[u])&&j(d,e,n,u,a,t||Ls(d,n));return new S(r,this._parents,e,n)}q.prototype.interrupt=Kt;q.prototype.transition=fr;var{abs:Xu,max:Zu,min:el}=Math;function wr(e){return[+e[0],+e[1]]}function js(e){return[wr(e[0]),wr(e[1])]}var nl={name:"x",handles:["w","e"].map(Dn),input:function(e,n){return e==null?null:[[+e[0],n[0][1]],[+e[1],n[1][1]]]},output:function(e){return e&&[e[0][0],e[1][0]]}},tl={name:"y",handles:["n","s"].map(Dn),input:function(e,n){return e==null?null:[[n[0][0],+e[0]],[n[1][0],+e[1]]]},output:function(e){return e&&[e[0][1],e[1][1]]}},rl={name:"xy",handles:["n","w","e","s","nw","ne","sw","se"].map(Dn),input:function(e){return e==null?null:js(e)},output:function(e){return e}};function Dn(e){return{type:e}}var Rn=Math.PI,In=2*Rn,$=1e-6,Ws=In-$;function vr(e){this._+=e[0];for(let n=1,t=e.length;n<t;++n)this._+=arguments[n]+e[n]}function Fs(e){let n=Math.floor(e);if(!(n>=0))throw new Error(`invalid digits: ${e}`);if(n>15)return vr;let t=10**n;return function(r){this._+=r[0];for(let o=1,s=r.length;o<s;++o)this._+=Math.round(arguments[o]*t)/t+r[o]}}var K=class{constructor(n){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=n==null?vr:Fs(n)}moveTo(n,t){this._append`M${this._x0=this._x1=+n},${this._y0=this._y1=+t}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(n,t){this._append`L${this._x1=+n},${this._y1=+t}`}quadraticCurveTo(n,t,r,o){this._append`Q${+n},${+t},${this._x1=+r},${this._y1=+o}`}bezierCurveTo(n,t,r,o,s,a){this._append`C${+n},${+t},${+r},${+o},${this._x1=+s},${this._y1=+a}`}arcTo(n,t,r,o,s){if(n=+n,t=+t,r=+r,o=+o,s=+s,s<0)throw new Error(`negative radius: ${s}`);let a=this._x1,i=this._y1,d=r-n,u=o-t,c=a-n,l=i-t,p=c*c+l*l;if(this._x1===null)this._append`M${this._x1=n},${this._y1=t}`;else if(p>$)if(!(Math.abs(l*d-u*c)>$)||!s)this._append`L${this._x1=n},${this._y1=t}`;else{let m=r-a,w=o-i,g=d*d+u*u,f=m*m+w*w,A=Math.sqrt(g),_=Math.sqrt(p),F=s*Math.tan((Rn-Math.acos((g+p-f)/(2*A*_)))/2),J=F/_,se=F/A;Math.abs(J-1)>$&&this._append`L${n+J*c},${t+J*l}`,this._append`A${s},${s},0,0,${+(l*m>c*w)},${this._x1=n+se*d},${this._y1=t+se*u}`}}arc(n,t,r,o,s,a){if(n=+n,t=+t,r=+r,a=!!a,r<0)throw new Error(`negative radius: ${r}`);let i=r*Math.cos(o),d=r*Math.sin(o),u=n+i,c=t+d,l=1^a,p=a?o-s:s-o;this._x1===null?this._append`M${u},${c}`:(Math.abs(this._x1-u)>$||Math.abs(this._y1-c)>$)&&this._append`L${u},${c}`,r&&(p<0&&(p=p%In+In),p>Ws?this._append`A${r},${r},0,1,${l},${n-i},${t-d}A${r},${r},0,1,${l},${this._x1=u},${this._y1=c}`:p>$&&this._append`A${r},${r},0,${+(p>=Rn)},${l},${this._x1=n+r*Math.cos(s)},${this._y1=t+r*Math.sin(s)}`)}rect(n,t,r,o){this._append`M${this._x0=this._x1=+n},${this._y0=this._y1=+t}h${r=+r}v${+o}h${-r}Z`}toString(){return this._}};function gr(){return new K}gr.prototype=K.prototype;function en(e,n){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(n).domain(e);break}return this}var kr=Symbol("implicit");function nn(){var e=new Q,n=[],t=[],r=kr;function o(s){let a=e.get(s);if(a===void 0){if(r!==kr)return r;e.set(s,a=n.push(s)-1)}return t[a%t.length]}return o.domain=function(s){if(!arguments.length)return n.slice();n=[],e=new Q;for(let a of s)e.has(a)||e.set(a,n.push(a)-1);return o},o.range=function(s){return arguments.length?(t=Array.from(s),o):t.slice()},o.unknown=function(s){return arguments.length?(r=s,o):r},o.copy=function(){return nn(n,t).unknown(r)},en.apply(o,arguments),o}function z(){var e=nn().unknown(void 0),n=e.domain,t=e.range,r=0,o=1,s,a,i=!1,d=0,u=0,c=.5;delete e.unknown;function l(){var p=n().length,m=o<r,w=m?o:r,g=m?r:o;s=(g-w)/Math.max(1,p-d+u*2),i&&(s=Math.floor(s)),w+=(g-w-s*(p-d))*c,a=s*(1-d),i&&(w=Math.round(w),a=Math.round(a));var f=Se(p).map(function(A){return w+s*A});return t(m?f.reverse():f)}return e.domain=function(p){return arguments.length?(n(p),l()):n()},e.range=function(p){return arguments.length?([r,o]=p,r=+r,o=+o,l()):[r,o]},e.rangeRound=function(p){return[r,o]=p,r=+r,o=+o,i=!0,l()},e.bandwidth=function(){return a},e.step=function(){return s},e.round=function(p){return arguments.length?(i=!!p,l()):i},e.padding=function(p){return arguments.length?(d=Math.min(1,u=+p),l()):d},e.paddingInner=function(p){return arguments.length?(d=Math.min(1,p),l()):d},e.paddingOuter=function(p){return arguments.length?(u=+p,l()):u},e.align=function(p){return arguments.length?(c=Math.max(0,Math.min(1,p)),l()):c},e.copy=function(){return z(n(),[r,o]).round(i).paddingInner(d).paddingOuter(u).align(c)},en.apply(l(),arguments)}function ke(e){return function(){return e}}var xe=Math.sqrt;var tn=Math.PI,Cl=tn/2,xr=2*tn;function br(e){let n=3;return e.digits=function(t){if(!arguments.length)return n;if(t==null)n=null;else{let r=Math.floor(t);if(!(r>=0))throw new RangeError(`invalid digits: ${t}`);n=r}return e},()=>new K(n)}var be={draw(e,n){let t=xe(n/tn);e.moveTo(t,0),e.arc(0,0,t,0,xr)}};var Dr=xe(1/3),Us=Dr*2,Sn={draw(e,n){let t=xe(n/Us),r=t*Dr;e.moveTo(0,-t),e.lineTo(r,0),e.lineTo(0,t),e.lineTo(-r,0),e.closePath()}};function rn(e,n){let t=null,r=br(o);e=typeof e=="function"?e:ke(e||be),n=typeof n=="function"?n:ke(n===void 0?64:+n);function o(){let s;if(t||(t=s=r()),e.apply(this,arguments).draw(t,+n.apply(this,arguments)),s)return t=null,s+""||null}return o.type=function(s){return arguments.length?(e=typeof s=="function"?s:ke(s),o):e},o.size=function(s){return arguments.length?(n=typeof s=="function"?s:ke(+s),o):n},o.context=function(s){return arguments.length?(t=s??null,o):t},o}function W(e,n,t){this.k=e,this.x=n,this.y=t}W.prototype={constructor:W,scale:function(e){return e===1?this:new W(this.k*e,this.x,this.y)},translate:function(e,n){return e===0&n===0?this:new W(this.k,this.x+this.k*e,this.y+this.k*n)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Cn=new W(1,0,0);En.prototype=W.prototype;function En(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Cn;return e.__zoom}var y={pins:{base:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",head:"b100221db48754656328391b878299c5a0bab443"},rows:[{id:"capture",name:"Command capture",sub:"OrderedCommandOutput"},{id:"spool",name:"Completion storage",sub:"Spool store \xB7 disk records"},{id:"socket",name:"Socket exchanges",sub:"LocalDaemonTransport \xB7 codec"},{id:"worker",name:"Worker boundary",sub:"Parent + worker entry"},{id:"control",name:"Process control",sub:"Registry \xB7 startup \xB7 controller"},{id:"host",name:"Daemon host",sub:"Workspace \xB7 lifetime \xB7 supervisor"},{id:"logs",name:"Diagnostic log",sub:"DaemonLogger"}],slices:[{id:"output",name:"Output"},{id:"transport",name:"Transport"},{id:"delivery",name:"Delivery"},{id:"startup",name:"Startup"},{id:"shutdown",name:"Shutdown"},{id:"resources",name:"Resources"},{id:"diagnostics",name:"Diagnostics"}],fields:[{id:"output.maximumChunkRawBytes",slice:"output",leaf:"maximumChunkRawBytes",label:"Chunk ceiling",value:"64 KiB",purpose:"capacity",rows:["capture","spool","socket","worker","host"],forward:["host"]},{id:"output.inlineRawBytes",slice:"output",leaf:"inlineRawBytes",label:"Inline storage",value:"256 KiB",purpose:"capacity",rows:["capture","spool","socket","host"],forward:["socket","host"]},{id:"output.maximumResultRawBytes",slice:"output",leaf:"maximumResultRawBytes",label:"One result",value:"256 MiB",purpose:"capacity",rows:["capture","spool","socket","host"],forward:["socket","host"]},{id:"output.maximumAggregateSpoolRawBytes",slice:"output",leaf:"maximumAggregateSpoolRawBytes",label:"All spools",value:"512 MiB",purpose:"capacity",rows:["spool","host"],forward:["host"]},{id:"transport.singleResponseTimeoutMs",slice:"transport",leaf:"singleResponseTimeoutMs",label:"Ordinary exchange",value:"250 ms",purpose:"time",rows:["socket"],forward:[]},{id:"transport.statusResponseTimeoutMs",slice:"transport",leaf:"statusResponseTimeoutMs",label:"Status observer",value:"100 ms",purpose:"time",rows:["socket"],forward:[]},{id:"transport.executionAdmissionTimeoutMs",slice:"transport",leaf:"executionAdmissionTimeoutMs",label:"Admission only",value:"5 s",purpose:"time",rows:["socket"],forward:[]},{id:"transport.maximumJsonPayloadBytes",slice:"transport",leaf:"maximumJsonPayloadBytes",label:"JSON frame",value:"8 MiB",purpose:"capacity",rows:["socket"],forward:[]},{id:"transport.maximumExecutionControlPayloadBytes",slice:"transport",leaf:"maximumExecutionControlPayloadBytes",label:"Transfer control",value:"256 KiB",purpose:"capacity",rows:["socket"],forward:[]},{id:"delivery.postAcceptanceExecutionReattachmentLimit",slice:"delivery",leaf:"postAcceptanceExecutionReattachmentLimit",label:"Reattach execution",value:"1",purpose:"recovery",rows:["socket"],forward:[]},{id:"delivery.resultTransferResumeLimitPerExecutionAttempt",slice:"delivery",leaf:"resultTransferResumeLimitPerExecutionAttempt",label:"Resume per attempt",value:"1",purpose:"recovery",rows:["socket"],forward:[]},{id:"startup.coordinationGraceMs",slice:"startup",leaf:"coordinationGraceMs",label:"Ownership grace",value:"15 s",purpose:"time",rows:["control","host"],forward:[]},{id:"startup.heartbeatIntervalMs",slice:"startup",leaf:"heartbeatIntervalMs",label:"Owner heartbeat",value:"100 ms",purpose:"time",rows:["host"],forward:[]},{id:"startup.authorizationPollIntervalMs",slice:"startup",leaf:"authorizationPollIntervalMs",label:"Authorization poll",value:"10 ms",purpose:"time",rows:["host"],forward:[]},{id:"startup.observationPollIntervalMs",slice:"startup",leaf:"observationPollIntervalMs",label:"Readiness poll",value:"20 ms",purpose:"time",rows:["control"],forward:[]},{id:"startup.previousInstanceTerminationTimeoutMs",slice:"startup",leaf:"previousInstanceTerminationTimeoutMs",label:"Replace old instance",value:"5 min",purpose:"time",rows:["control"],forward:[]},{id:"startup.childFailureRetryLimit",slice:"startup",leaf:"childFailureRetryLimit",label:"Child failure retries",value:"1",purpose:"recovery",rows:["control"],forward:[]},{id:"shutdown.idleTimeoutMs",slice:"shutdown",leaf:"idleTimeoutMs",label:"Idle lifetime",value:"30 min",purpose:"time",rows:["host"],forward:[]},{id:"shutdown.stopTimeoutMs",slice:"shutdown",leaf:"stopTimeoutMs",label:"Stop total",value:"5 s",purpose:"time",rows:["control"],forward:[]},{id:"shutdown.forcedTerminationReserveMaximumMs",slice:"shutdown",leaf:"forcedTerminationReserveMaximumMs",label:"Force reserve cap",value:"500 ms",purpose:"time",rows:["control"],forward:[]},{id:"shutdown.controllerPollIntervalMs",slice:"shutdown",leaf:"controllerPollIntervalMs",label:"Controller poll",value:"20 ms",purpose:"time",rows:["control"],forward:[]},{id:"shutdown.processSignalExitTimeoutMs",slice:"shutdown",leaf:"processSignalExitTimeoutMs",label:"Signal exit wait",value:"500 ms",purpose:"time",rows:["control"],forward:[]},{id:"shutdown.processExitPollIntervalMs",slice:"shutdown",leaf:"processExitPollIntervalMs",label:"Process exit poll",value:"20 ms",purpose:"time",rows:["control"],forward:[]},{id:"shutdown.resourceDrainAcknowledgementGraceMs",slice:"shutdown",leaf:"resourceDrainAcknowledgementGraceMs",label:"Drain ACK grace",value:"250 ms",purpose:"time",rows:["host"],forward:[]},{id:"shutdown.resourceDrainAcknowledgementPollIntervalMs",slice:"shutdown",leaf:"resourceDrainAcknowledgementPollIntervalMs",label:"Drain ACK poll",value:"5 ms",purpose:"time",rows:["host"],forward:[]},{id:"resources.hardProcessRssBytes",slice:"resources",leaf:"hardProcessRssBytes",label:"Hard RSS",value:"derived",purpose:"memory",rows:["host"],forward:[]},{id:"resources.softProcessRssBytes",slice:"resources",leaf:"softProcessRssBytes",label:"Soft RSS",value:"derived",purpose:"memory",rows:["host"],forward:[]},{id:"resources.resumeProcessRssBytes",slice:"resources",leaf:"resumeProcessRssBytes",label:"Resume RSS",value:"derived",purpose:"memory",rows:["host"],forward:[]},{id:"resources.workerMaxOldGenerationSizeMiB",slice:"resources",leaf:"workerMaxOldGenerationSizeMiB",label:"Worker V8 limit",value:"derived",purpose:"memory",rows:["host"],forward:[]},{id:"resources.supervisionIntervalMs",slice:"resources",leaf:"supervisionIntervalMs",label:"RSS sampling",value:"250 ms",purpose:"time",rows:["host"],forward:[]},{id:"resources.replacementWindowMs",slice:"resources",leaf:"replacementWindowMs",label:"Replacement window",value:"10 min",purpose:"time",rows:["host"],forward:[]},{id:"resources.replacementLimit",slice:"resources",leaf:"replacementLimit",label:"Replacement limit",value:"2",purpose:"recovery",rows:["host"],forward:[]},{id:"resources.workerHeapSampleIntervalMs",slice:"resources",leaf:"workerHeapSampleIntervalMs",label:"Worker heap sampling",value:"25 ms",purpose:"time",rows:["worker"],forward:[]},{id:"diagnostics.logRotateBytes",slice:"diagnostics",leaf:"logRotateBytes",label:"Rotate log",value:"10 MiB",purpose:"capacity",rows:["logs","host"],forward:["host"]},{id:"diagnostics.logBackupCount",slice:"diagnostics",leaf:"logBackupCount",label:"Log backups",value:"4",purpose:"capacity",rows:["logs","host"],forward:["host"]},{id:"diagnostics.maximumQueuedEvents",slice:"diagnostics",leaf:"maximumQueuedEvents",label:"Queued events",value:"1,024",purpose:"capacity",rows:["logs","host"],forward:["host"]},{id:"diagnostics.disconnectedTraceRetentionMs",slice:"diagnostics",leaf:"disconnectedTraceRetentionMs",label:"Trace retention",value:"5 min",purpose:"time",rows:["host"],forward:[]},{id:"diagnostics.maximumDisconnectedTraces",slice:"diagnostics",leaf:"maximumDisconnectedTraces",label:"Retained traces",value:"1,024",purpose:"capacity",rows:["host"],forward:[]}],cells:[{id:"capture:output",row:"capture",slice:"output",label:"split \xB7 store \xB7 cap",summary:"Capture reads chunk, inline and per-result limits from the required output slice.",mechanism:["Writes split at maximumChunkRawBytes. Adjacent records from one stream may coalesce up to that same ceiling.","The inline threshold chooses memory versus file storage; maximumResultRawBytes bounds the whole capture. File decoding receives the same chunk ceiling."],refs:["capture","capture-loop","capture-base","test-output"],notes:["01","02"],fields:["output.maximumChunkRawBytes","output.inlineRawBytes","output.maximumResultRawBytes"],gap:!1},{id:"spool:output",row:"spool",slice:"output",label:"chunk \u2192 aggregate",summary:"A spool has a per-result cap; its store also has an aggregate cap. Chunk validation uses the shared output field.",mechanism:["The store projects the required output slice into each spool, including the chunk ceiling.","Append validates chunk size and result size; the store reserves aggregate bytes. File reads receive the projected chunk ceiling."],refs:["spool","spool-read","spool-base","test-spool"],notes:["01","02"],fields:["output.maximumChunkRawBytes","output.inlineRawBytes","output.maximumResultRawBytes","output.maximumAggregateSpoolRawBytes"],gap:!1},{id:"socket:output",row:"socket",slice:"output",label:"decode \xB7 capture",summary:"The transport reads the chunk ceiling and forwards output policy to received-output storage.",mechanism:["Binary frames permit control-header capacity plus one raw chunk. Decoding checks the projected chunk ceiling.","Received output is stored by OrderedCommandOutput with the transport's required output slice."],refs:["transport","codec","codec-decode","capture"],notes:["01","02"],fields:["output.maximumChunkRawBytes","output.inlineRawBytes","output.maximumResultRawBytes"],gap:!1},{id:"socket:transport",row:"socket",slice:"transport",label:"100 \u2260 250 \xB7 5 s",summary:"Composition purpose selects 100 ms for status observation or 250 ms for ordinary exchanges; admission has its own 5 s deadline. JSON and transfer-control caps also remain distinct.",mechanism:["The constructor selects the deadline using responseTimeoutPurpose, before it sees any request kind.","The daemon status action composes status-observer. Ordinary execution-status exchanges retain the ordinary deadline. Admission timing does not impose an accepted-completion deadline."],refs:["transport","transport-type","transport-base","status","status-base","test-deadline"],notes:["01","03"],fields:["transport.singleResponseTimeoutMs","transport.statusResponseTimeoutMs","transport.executionAdmissionTimeoutMs","transport.maximumJsonPayloadBytes","transport.maximumExecutionControlPayloadBytes"],gap:!1},{id:"socket:delivery",row:"socket",slice:"delivery",label:"1 / request \xB7 1 / try",summary:"Execution reattachment and per-attempt fetch resumption have separate numeric budgets. The base already gave each execute attempt its own resume allowance.",mechanism:["completeWithReattachments counts reattachments outside executeOnce; executeOnce starts a fresh resumeCount.","A fetch failure goes to fail, not another fetch loop. Raising the resume limit does not add a retry loop around a failed fetch.","A rejection from a reattached completion now leaves through the next outer catch; base caught it inside the first error's recovery block. See the visible rationale gap."],refs:["reattach","reattach-base","resume","resume-scope","resume-base","fetch-failure","test-reattach"],notes:["01","04","05"],fields:["delivery.postAcceptanceExecutionReattachmentLimit","delivery.resultTransferResumeLimitPerExecutionAttempt"],gap:!0},{id:"worker:output",row:"worker",slice:"output",label:"validate both ends",summary:"Parent and worker validators receive the shared chunk ceiling. The parent now parses serialized policy before constructing its Worker.",mechanism:["The worker entry validates outgoing chunks with policy.output.maximumChunkRawBytes.","The parent parses the complete serialized policy to obtain that leaf, then passes it to response validation. Invalid policy can therefore throw before Worker construction."],refs:["worker","worker-base","worker-send","worker-protocol"],notes:["01","02","06"],fields:["output.maximumChunkRawBytes"],gap:!0},{id:"worker:resources",row:"worker",slice:"resources",label:"heap sample \xB7 25 ms",summary:"The worker's heap high-water sampler takes its 25 ms cadence from resources.",mechanism:["The execution method constructs WorkerHeapHighWater with workerHeapSampleIntervalMs.","The sampler still takes an immediate sample and then uses setInterval. The cadence, rather than the timer algorithm, becomes policy input."],refs:["worker-sample","defaults"],notes:["01","09"],fields:["resources.workerHeapSampleIntervalMs"],gap:!1},{id:"control:startup",row:"control",slice:"startup",label:"grace \xB7 poll \xB7 retry",summary:"Registry grace, readiness observation, previous-instance termination and child retries use startup policy. Healthy live startup keeps waiting; 15 s is ownership grace.",mechanism:["The coordinator takes startup and shutdown slices, and the registry takes startup.","The child-failure retry loop counts failures without resetting the allowance while waiting for ownership.","The live child branch keeps waiting. The removed startupTimeoutMs property was assigned in base but never read."],refs:["registry","startup","startup-loop","startup-live","startup-base","test-retry","test-startup","test-startup-base"],notes:["01","07","12"],fields:["startup.coordinationGraceMs","startup.observationPollIntervalMs","startup.previousInstanceTerminationTimeoutMs","startup.childFailureRetryLimit"],gap:!1},{id:"control:shutdown",row:"control",slice:"shutdown",label:"stop \xB7 reserve \xB7 signal",summary:"Stop, signal-exit waits and polling use shutdown policy. Forced termination still reserves min(cap, half the stop window).",mechanism:["The controller computes min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2)).","The process terminator reads a signal-exit timeout and its own polling interval. Equal 20 ms defaults are separate policy fields."],refs:["control","stop","terminator","record"],notes:["01","08"],fields:["shutdown.stopTimeoutMs","shutdown.forcedTerminationReserveMaximumMs","shutdown.controllerPollIntervalMs","shutdown.processSignalExitTimeoutMs","shutdown.processExitPollIntervalMs"],gap:!1},{id:"host:output",row:"host",slice:"output",label:"forward to spool",summary:"WorkspaceDaemon forwards the output slice to its completion store.",mechanism:["The host carries a full DaemonPolicy. Its composition selects policy.values.output for the store.","Light ties mean forwarding here. Chunk/result enforcement happens inside the storage and capture families."],refs:["host","host-type","spool"],notes:["01","02"],fields:["output.maximumChunkRawBytes","output.inlineRawBytes","output.maximumResultRawBytes","output.maximumAggregateSpoolRawBytes"],gap:!0},{id:"host:startup",row:"host",slice:"startup",label:"grace \xB7 beat \xB7 auth",summary:"The host uses startup grace for authorization, 100 ms heartbeats and a distinct 10 ms authorization poll.",mechanism:["Startup authorization's deadline and the registry's ownership grace read the same coordinationGraceMs leaf.","Heartbeat and authorization polling remain separate fields. A shared slice does not combine these clocks."],refs:["host-startup","authorization","authorization-poll","registry"],notes:["01","07"],fields:["startup.coordinationGraceMs","startup.heartbeatIntervalMs","startup.authorizationPollIntervalMs"],gap:!1},{id:"host:shutdown",row:"host",slice:"shutdown",label:"idle \xB7 drain ACK",summary:"Idle lifetime and drain acknowledgement read shutdown policy. Drain ACK grace is 250 ms with 5 ms polling; it is unrelated to the transport's 250 ms field.",mechanism:["DaemonLifetime receives a required idleTimeoutMs projection.","The host's drain path waits for acknowledgements until its own deadline, pausing at resourceDrainAcknowledgementPollIntervalMs."],refs:["lifetime","ack","record"],notes:["01","08"],fields:["shutdown.idleTimeoutMs","shutdown.resourceDrainAcknowledgementGraceMs","shutdown.resourceDrainAcknowledgementPollIntervalMs"],gap:!1},{id:"host:resources",row:"host",slice:"resources",label:"RSS \xB7 V8 \xB7 replace",summary:"The host and supervisor consume existing derived resource values; the local resource-policy class is retired. Hard RSS supplies memory reporting, as production already did.",mechanism:["WorkspaceDaemon keeps policy.values.resources and passes it to the supervisor; the V8 launch limit comes from workerMaxOldGenerationSizeMiB.","The supervisor reads separate hard, soft and resume levels, a sampling interval, a replacement window and a replacement limit.","The central memory derivation is unchanged. effectiveMemoryBytes is a derivation input, not a directly consumed leaf in this drawn family inventory."],refs:["host","host-base","resources","resource-thresholds","resource-loop","resource-base","defaults"],notes:["01","09","12"],fields:["resources.hardProcessRssBytes","resources.softProcessRssBytes","resources.resumeProcessRssBytes","resources.workerMaxOldGenerationSizeMiB","resources.supervisionIntervalMs","resources.replacementWindowMs","resources.replacementLimit"],gap:!0},{id:"host:diagnostics",row:"host",slice:"diagnostics",label:"traces + log handoff",summary:"Trace expiry/capacity are host decisions; log rotation/queue limits are forwarded to the logger. The inherited trace-capacity floor is still one.",mechanism:["Disconnected traces expire using disconnectedTraceRetentionMs. Capacity is Math.max(1, maximumDisconnectedTraces).","The host passes the diagnostics slice to DaemonLogger. It does not become the logger's storage implementation."],refs:["trace","trace-floor","host","logger"],notes:["01","10"],fields:["diagnostics.logRotateBytes","diagnostics.logBackupCount","diagnostics.maximumQueuedEvents","diagnostics.disconnectedTraceRetentionMs","diagnostics.maximumDisconnectedTraces"],gap:!1},{id:"logs:diagnostics",row:"logs",slice:"diagnostics",label:"rotate \xB7 retain \xB7 queue",summary:"The logger reads rotation bytes, backup count and queued-event capacity from the required diagnostics slice.",mechanism:["The constructor stores the three policy leaves.","Rotation walks backupCount files; queue capacity and rotation size are distinct controls even though they share a slice."],refs:["logger","rotation","record"],notes:["01","10"],fields:["diagnostics.logRotateBytes","diagnostics.logBackupCount","diagnostics.maximumQueuedEvents"],gap:!1}],notes:[{id:"01",title:"Authority crosses; mechanisms stay.",state:"stated",cell:"capture:output",text:"The snapshot and its validation already exist unchanged in @symnav/daemon. This PR replaces CLI defaults and optional threshold knobs with required slices or explicit projected numbers. Mechanisms remain in apps/cli; clocks, storage and other collaborator seams remain injectable. The spelling-based meta-test bans named retired seams, not every possible bypass.",reason:"PR: omitted composition must not recreate local defaults.",refs:["policy","transport-type","host-type","ratchet"]},{id:"02",title:"One chunk ceiling, several jobs.",state:"stated",cell:"capture:output",text:"The same 64 KiB output leaf reaches capture, spool append/read, wire codecs and both worker validators. Inline, one-result and aggregate limits remain separate. A controlled 4-byte head-policy probe records 4 + 4 + 2 bytes from ten output bytes; base's local chunk constant records 10. Five-byte codec/worker messages pass base and exceed that head fixture's ceiling.",reason:"Policy record: bound one raw output record. PR: route required output slices.",refs:["record","capture-loop","spool-read","codec","worker-protocol"]},{id:"03",title:"The number does not name the purpose.",state:"stated",cell:"socket:transport",text:"Status-observer composition selects 100 ms; ordinary lifecycle and execution-status exchanges use 250 ms; admission uses 5 s without timing accepted completion. The host's 250 ms ACK grace and 250 ms RSS sampling are two other fields. Equal values make no shared thread.",reason:"PR: observation and ordinary execution-status have different deadlines.",refs:["transport","status","ack","resources","test-deadline"]},{id:"04",title:"Two allowances, two scopes.",state:"stated",cell:"socket:delivery",text:"One default reattachment belongs to accepted execution recovery; one default fetch resume belongs to each execute attempt. Numeric counters expose these scopes; base already renewed fetch allowance on reattachment. The new source test reaches two execute calls and one fetch, not a fetch in each attempt.",reason:"PR: each reattached execute attempt needs its own fetch allowance.",refs:["reattach","resume-scope","resume-base","test-reattach"]},{id:"05",title:"A numeric budget is not a fetch loop.",state:"unexplained",cell:"socket:delivery",text:"Fetch failure terminates that attempt; raising the resume limit does not add a loop that retries a failed fetch. The outer loop also changes error provenance: a rejected reattached completion can now expose its later error, where base preserved the original close. A reattachment submission failure still preserves the prior error.",reason:"No specific reason found for the fetch ceiling or changed error provenance; the general counter rationale does not explain either.",refs:["resume","fetch-failure","reattach","reattach-base"]},{id:"06",title:"A leaf now requires an earlier parse.",state:"unexplained",cell:"worker:output",text:"To select the chunk leaf, the parent validates the complete serialized policy before constructing a Worker. Base passed that snapshot into the worker without this parent-side parse. This is an earlier failure boundary, beyond removing a local constant.",reason:"Required chunk validation is stated; why validate the whole snapshot at this earlier parent boundary is unexplained.",refs:["worker","worker-base","worker-send"]},{id:"07",title:"Startup grace is not a warmup deadline.",state:"stated",cell:"control:startup",text:"Registry/coordinator/host share ownership grace, while heartbeat, authorization and observation keep separate cadences. Healthy live startup still waits. Child-failure retries become a numeric loop, default one, with zero/two override cases added. The unused startupTimeoutMs property disappears.",reason:"Policy record: preserve election recovery grace, distinct cadences and one fresh launch after a failed child.",refs:["record","registry","startup-live","startup-loop","test-retry","startup-base"]},{id:"08",title:"Shutdown contains several clocks.",state:"stated",cell:"host:shutdown",text:"Idle, user stop, force reserve, direct signal waits and drain ACKs remain separate fields. The force reserve remains min(cap, half the stop timeout); the ACK poll remains 5 ms. Equal 20 ms control/process polls do not share a field.",reason:"Policy record: preserve bounded escalation and allow attached clients to acknowledge before cleanup.",refs:["record","stop","terminator","lifetime","ack"]},{id:"09",title:"Use the resource snapshot directly.",state:"stated",cell:"host:resources",text:"The CLI resource-policy class and redundant memory-cap option disappear. The host/supervisor read existing RSS, V8, sampling and replacement fields; worker heap sampling becomes a policy input. Production already reported the hard RSS cap. Central derivation is unchanged; its raw effective-memory input is outside the drawn consumer leaves.",reason:"PR/spec: one policy owner. Policy record supplies the reasons for resource thresholds.",refs:["host","host-base","entry-base","resource-base","resources","resource-loop","defaults"]},{id:"10",title:"Retaining traces is not rotating logs.",state:"stated",cell:"host:diagnostics",text:"The host retains disconnected traces; the logger rotates files, keeps backups and bounds queued events. They share diagnostics policy, not storage ownership. The inherited trace floor still makes an override of zero act as a capacity of one.",reason:"Policy record: bounded disconnected history and bounded diagnostic storage/queue.",refs:["record","trace","trace-floor","logger","rotation"]},{id:"11",title:"Test adapters translate, rather than mirror.",state:"unexplained",cell:"host:output",text:"Test-only adapters keep production threshold overloads retired. They normalize coupled output limits, ignore the old workspace memoryCapBytes knob, and give explicit controller/startup policy precedence over numeric knobs. The resource adapter adds replacement window/limit fields to the benchmark's serialized policy record.",reason:"PR states why adapters exist. These normalization, precedence, ignored-option and report-shape details have no specific stated reason.",refs:["adapter-output","adapter-transport","adapter-control","adapter-startup","adapter-resource","benchmark","benchmark-report"]},{id:"12",title:"The evidence changes with the inputs.",state:"unexplained",cell:"host:resources",text:"The old CLI resource-derivation table, constrained-memory case and constant assertion are deleted; central derivation tests already existed. New cases exercise policy capacities, cadence, deadlines and retry scopes. Startup tests drop a 5 ms knob that base never read. Some expectations now read policy values, replacing shared constants. This is a changed test premise, not a parity result.",reason:"The PR describes preservation intent; the specific test removals and changed premises are unexplained. No Symnav test suite was run for this artifact.",refs:["test-resource-removed","test-policy-existing","test-resource","test-startup","test-startup-base","test-spool","test-deadline","test-reattach"]}],receipts:{policy:{source:"head:packages/daemon/src/daemon-policy.ts",start:13,end:69,anchor:13,needle:"export interface DaemonPolicyValues"},defaults:{source:"head:packages/daemon/src/daemon-policy.ts",start:105,end:160,anchor:107,needle:"singleResponseTimeoutMs: 250"},validation:{source:"head:packages/daemon/src/daemon-policy.ts",start:291,end:307,anchor:291,needle:"const maximumChunkRawBytes = DaemonPolicyCodec.integer"},record:{source:"head:plans/005/daemon-policy.md",start:5,end:50,anchor:7,needle:"| `transport.singleResponseTimeoutMs`"},spec:{source:"head:plans/005/daemon-architecture-functional-spec.md",start:75,end:84,anchor:75,needle:"Every threshold has one owner"},capture:{source:"head:apps/cli/src/command-execution-result.ts",start:149,end:165,anchor:149,needle:"constructor(options: OrderedCommandOutputOptions)"},"capture-loop":{source:"head:apps/cli/src/command-execution-result.ts",start:225,end:247,anchor:227,needle:"offset += this.maximumRecordBytes"},"capture-base":{source:"base:apps/cli/src/command-execution-result.ts",start:55,end:60,anchor:55,needle:"const DEFAULT_INLINE_BYTES"},spool:{source:"head:apps/cli/src/daemon/completion-spool.ts",start:302,end:316,anchor:302,needle:"constructor(private readonly options: DaemonCompletionSpoolStoreOptions)"},"spool-read":{source:"head:apps/cli/src/daemon/completion-spool.ts",start:191,end:205,anchor:196,needle:"this.options.storage.records(this.filePath, this.options.maximumChunkBytes)"},"spool-base":{source:"base:apps/cli/src/daemon/completion-spool.ts",start:10,end:15,anchor:10,needle:"export const COMMAND_OUTPUT_CHUNK_BYTES"},transport:{source:"head:apps/cli/src/daemon/local-daemon-transport.ts",start:289,end:306,anchor:289,needle:"constructor(policy: LocalDaemonTransportPolicy"},"transport-type":{source:"head:apps/cli/src/daemon/local-daemon-transport.ts",start:26,end:40,anchor:26,needle:"interface LocalDaemonTransportOptions"},"transport-base":{source:"base:apps/cli/src/daemon/local-daemon-transport.ts",start:290,end:302,anchor:290,needle:"constructor(options: LocalDaemonTransportOptions"},status:{source:"head:apps/cli/src/commands/daemon/register-daemon-command.ts",start:100,end:116,anchor:111,needle:'responseTimeoutPurpose: "status-observer"'},"status-base":{source:"base:apps/cli/src/commands/daemon/register-daemon-command.ts",start:97,end:108,anchor:103,needle:"requestTimeoutMs: 100"},reattach:{source:"head:apps/cli/src/daemon/local-daemon-transport.ts",start:407,end:435,anchor:407,needle:"let currentCompletion = completion"},"reattach-base":{source:"base:apps/cli/src/daemon/local-daemon-transport.ts",start:398,end:418,anchor:398,needle:"private async completeWithOneReattachment"},resume:{source:"head:apps/cli/src/daemon/local-daemon-transport.ts",start:474,end:500,anchor:474,needle:"const resume = (): boolean"},"resume-scope":{source:"head:apps/cli/src/daemon/local-daemon-transport.ts",start:447,end:455,anchor:451,needle:"let resumeCount = 0"},"resume-base":{source:"base:apps/cli/src/daemon/local-daemon-transport.ts",start:430,end:440,anchor:434,needle:"let resumeStarted = false"},"fetch-failure":{source:"head:apps/cli/src/daemon/local-daemon-transport.ts",start:735,end:746,anchor:740,needle:"Daemon result resume ended before completion"},codec:{source:"head:apps/cli/src/daemon/daemon-result-chunk-codec.ts",start:19,end:40,anchor:19,needle:"static encode(chunk: DaemonResultChunk"},"codec-decode":{source:"head:apps/cli/src/daemon/daemon-result-chunk-codec.ts",start:142,end:155,anchor:145,needle:"const maximum = binary"},worker:{source:"head:apps/cli/src/daemon/daemon-navigation-worker.ts",start:77,end:98,anchor:80,needle:"this.maximumChunkRawBytes = DaemonPolicy.fromSerialized"},"worker-base":{source:"base:apps/cli/src/daemon/daemon-navigation-worker.ts",start:77,end:94,anchor:77,needle:"constructor(options: NodeDaemonNavigationWorkerOptions)"},"worker-protocol":{source:"head:apps/cli/src/daemon/daemon-navigation-worker-protocol.ts",start:140,end:153,anchor:141,needle:'value.kind === "output-chunk"'},"worker-send":{source:"head:apps/cli/src/daemon/daemon-navigation-worker-entry.ts",start:196,end:207,anchor:196,needle:"private send(response"},"worker-sample":{source:"head:apps/cli/src/daemon/daemon-navigation-worker-entry.ts",start:120,end:127,anchor:120,needle:"const heapMonitor = new WorkerHeapHighWater"},control:{source:"head:apps/cli/src/daemon/daemon-controller.ts",start:20,end:33,anchor:20,needle:"interface DaemonControllerOptions"},stop:{source:"head:apps/cli/src/daemon/daemon-controller.ts",start:70,end:81,anchor:73,needle:"const forceWaitMs = Math.min"},terminator:{source:"head:apps/cli/src/daemon/daemon-process-launcher.ts",start:59,end:67,anchor:62,needle:'constructor(policy: DaemonPolicyValues["shutdown"])'},registry:{source:"head:apps/cli/src/daemon/daemon-registry.ts",start:385,end:393,anchor:385,needle:"startupOwnerIsWithinGrace("},startup:{source:"head:apps/cli/src/daemon/daemon-startup-coordinator.ts",start:64,end:78,anchor:64,needle:"const policy = options.policy"},"startup-loop":{source:"head:apps/cli/src/daemon/daemon-startup-coordinator.ts",start:76,end:95,anchor:77,needle:"let failureCount = 0"},"startup-live":{source:"head:apps/cli/src/daemon/daemon-startup-coordinator.ts",start:182,end:210,anchor:182,needle:"const daemonProcess = this.launchedProcesses.get(storedRecord.instanceId)"},"startup-base":{source:"base:apps/cli/src/daemon/daemon-startup-coordinator.ts",start:69,end:77,anchor:69,needle:"this.startupTimeoutMs = options.startupTimeoutMs"},"host-type":{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:46,end:68,anchor:46,needle:"export interface WorkspaceDaemonOptions"},host:{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:126,end:171,anchor:138,needle:"const resourcePolicy = policy.values.resources"},"host-base":{source:"base:apps/cli/src/daemon/workspace-daemon.ts",start:149,end:181,anchor:155,needle:"const resourcePolicy ="},"entry-base":{source:"base:apps/cli/src/daemon/daemon-entry.ts",start:39,end:49,anchor:43,needle:"memoryCapBytes: policy.values.resources.hardProcessRssBytes"},"host-startup":{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:185,end:194,anchor:189,needle:"this.policy.values.startup.heartbeatIntervalMs"},authorization:{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:252,end:263,anchor:255,needle:"this.now() + this.policy.values.startup.coordinationGraceMs"},"authorization-poll":{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:998,end:1004,anchor:1001,needle:"this.policy.values.startup.authorizationPollIntervalMs"},ack:{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:925,end:938,anchor:925,needle:"private async waitForCompletionAcknowledgements"},trace:{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:841,end:851,anchor:845,needle:"this.policy.values.diagnostics.disconnectedTraceRetentionMs"},"trace-floor":{source:"head:apps/cli/src/daemon/workspace-daemon.ts",start:890,end:902,anchor:891,needle:"const capacity = Math.max(1, this.policy.values.diagnostics.maximumDisconnectedTraces)"},lifetime:{source:"head:apps/cli/src/daemon/daemon-lifetime.ts",start:11,end:25,anchor:13,needle:'policy: Pick<DaemonPolicyValues["shutdown"], "idleTimeoutMs">'},resources:{source:"head:apps/cli/src/daemon/daemon-resource-monitor.ts",start:86,end:96,anchor:90,needle:"this.options.policy.supervisionIntervalMs"},"resource-thresholds":{source:"head:apps/cli/src/daemon/daemon-resource-monitor.ts",start:108,end:141,anchor:108,needle:"const policy = this.options.policy"},"resource-loop":{source:"head:apps/cli/src/daemon/daemon-resource-monitor.ts",start:155,end:171,anchor:157,needle:"const cutoff = this.now() - this.options.policy.replacementWindowMs"},"resource-base":{source:"base:apps/cli/src/daemon/daemon-resource-monitor.ts",start:21,end:62,anchor:21,needle:"export class DaemonResourcePolicy"},logger:{source:"head:apps/cli/src/daemon/daemon-logger.ts",start:263,end:272,anchor:265,needle:"const policy = options.policy"},rotation:{source:"head:apps/cli/src/daemon/daemon-logger.ts",start:415,end:425,anchor:415,needle:"private async rotate()"},ratchet:{source:"head:meta-tests/src/daemon-package.test.ts",start:192,end:235,anchor:192,needle:'it("retires scattered operational defaults and policy bypasses"'},"test-output":{source:"head:apps/cli/src/cli-program-executor.test.ts",start:134,end:157,anchor:134,needle:'it("advances nonempty output at the smallest valid chunk capacity"'},"test-spool":{source:"head:apps/cli/src/daemon/completion-spool.test.ts",start:17,end:46,anchor:17,needle:'it("uses the required output-policy capacities"'},"test-resource":{source:"head:apps/cli/src/daemon/daemon-resource-monitor.test.ts",start:37,end:77,anchor:37,needle:'it("uses the required resource-policy cadence and thresholds"'},"test-resource-removed":{source:"base:apps/cli/src/daemon/daemon-resource-monitor.test.ts",start:11,end:82,anchor:11,needle:'describe("DaemonResourcePolicy"'},"test-policy-existing":{source:"head:packages/daemon/src/daemon-policy.test.ts",start:65,end:152,anchor:65,needle:'describe("DaemonPolicy"'},"test-startup":{source:"head:apps/cli/src/daemon/daemon-startup-coordinator.test.ts",start:91,end:121,anchor:91,needle:'it("shares one readiness record without a healthy startup deadline"'},"test-startup-base":{source:"base:apps/cli/src/daemon/daemon-startup-coordinator.test.ts",start:85,end:117,anchor:85,needle:'it("shares one readiness record without a healthy startup deadline"'},"test-retry":{source:"head:apps/cli/src/daemon/daemon-startup-coordinator.test.ts",start:515,end:535,anchor:515,needle:'it("does not retry a child failure when policy permits zero retries"'},"test-deadline":{source:"head:apps/cli/src/daemon/local-daemon-transport-validation.test.ts",start:54,end:103,anchor:59,needle:'"uses the status-observer timeout for $kind lifecycle exchanges"'},"test-reattach":{source:"head:apps/cli/src/daemon/local-daemon-transport-execution.test.ts",start:846,end:894,anchor:846,needle:'it("gives the reattached execute attempt its own fetch resume"'},"adapter-output":{source:"head:apps/cli/test/helpers/workspace-daemon.ts",start:30,end:94,anchor:30,needle:"const base = options.policy"},"adapter-transport":{source:"head:apps/cli/test/helpers/local-daemon-transport.ts",start:25,end:64,anchor:25,needle:'if ("transport" in policyOrOptions)'},"adapter-control":{source:"head:apps/cli/test/helpers/daemon-controller.ts",start:27,end:40,anchor:27,needle:"const policy ="},"adapter-startup":{source:"head:apps/cli/test/helpers/daemon-startup-coordinator.ts",start:27,end:40,anchor:27,needle:"const policy ="},"adapter-resource":{source:"head:apps/cli/test/helpers/daemon-resource-policy.ts",start:3,end:33,anchor:3,needle:"export interface TestDaemonResourcePolicyRecord"},benchmark:{source:"head:apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts",start:131,end:139,anchor:135,needle:"DaemonResourcePolicy.fromSystemMemory"},"benchmark-report":{source:"head:apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts",start:190,end:201,anchor:196,needle:"        resourcePolicy,"}},sources:{"head:packages/daemon/src/daemon-policy.ts":{path:"packages/daemon/src/daemon-policy.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"7a3656def315dd18b43ec5a7db365e9896f2fe9518d49e89ecce707ee3c8d161",text:`const MEBIBYTE = 1024 * 1024;

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
`},"head:plans/005/daemon-policy.md":{path:"plans/005/daemon-policy.md",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"4aded525f7ad50cba20985d358719472d231cb16a8b9e5e361bcf4a7a2718c08",text:"# Daemon policy\n\n`DaemonPolicy` is one immutable, complete snapshot. The CLI creates it from system memory and passes the same serialized values through daemon process and worker boundaries. Tests may replace individual values through `DaemonPolicyTestFactory`; users have no flag, environment variable, or configuration file for these values.\n\n| Policy path or recipe | Default or derivation | Applies to | Reason | Behavior oracle |\n| --- | --- | --- | --- | --- |\n| `transport.singleResponseTimeoutMs` | 250 ms | Ordinary lifecycle and execution-status exchanges | Bound one-response local socket waits | Transport timeout characterization |\n| `transport.statusResponseTimeoutMs` | 100 ms | Status observer lifecycle exchange | Keep status aggregation responsive independently of routing | Status timeout characterization |\n| `transport.executionAdmissionTimeoutMs` | 5 s | Execute submission until acceptance | Bound admission without timing accepted completion | Long-command transport characterization |\n| `transport.maximumJsonPayloadBytes` | 8 MiB | Ordinary JSON control frames | Bound decoded control input | Transport frame-cap tests |\n| `transport.maximumExecutionControlPayloadBytes` | 256 KiB | Execution transfer control frames | Keep binary-transfer control bounded separately | Transfer codec tests |\n| `startup.coordinationGraceMs` | 15 s | Startup ownership and missing-owner observation | Preserve election recovery grace | Registry/startup suites |\n| `startup.heartbeatIntervalMs` | 100 ms | Startup-owner heartbeat | Maintain live ownership while warming | Startup heartbeat tests |\n| `startup.authorizationPollIntervalMs` | 10 ms | Process authorization wait | Preserve the distinct fast authorization cadence | Authorization cadence characterization |\n| `startup.observationPollIntervalMs` | 20 ms | Launcher readiness observation | Preserve current readiness polling cadence | Startup observation tests |\n| `startup.previousInstanceTerminationTimeoutMs` | 5 min | Replacement of a previous instance | Allow controlled termination before new ownership proceeds | Startup replacement tests |\n| `startup.childFailureRetryLimit` | 1 retry | Explicit startup child failure | Preserve one fresh launch after a failed child | Startup retry tests |\n| `shutdown.idleTimeoutMs` | 30 min | Warm daemon idle lifetime | Release retained resources after inactivity | Lifetime tests |\n| `shutdown.stopTimeoutMs` | 5 s | User-requested stop | Bound graceful stop and forced escalation together | Controller stop tests |\n| `shutdown.forcedTerminationReserveMaximumMs` | 500 ms | Stop escalation reserve | Leave bounded time for authenticated force termination | Controller deadline tests |\n| `recipe.forcedTerminationReserve` | `min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2))` | Effective stop escalation reserve | Preserve small overridden stop windows | Controller deadline tests |\n| `shutdown.controllerPollIntervalMs` | 20 ms | Controller process/registry observation | Preserve control-plane polling cadence | Controller polling tests |\n| `shutdown.processSignalExitTimeoutMs` | 500 ms after SIGTERM and 500 ms after SIGKILL | Direct process termination | Give each signal a bounded exit interval | Process terminator tests |\n| `shutdown.processExitPollIntervalMs` | 20 ms | Direct process termination | Preserve process-exit polling cadence independently | Process terminator tests |\n| `shutdown.resourceDrainAcknowledgementGraceMs` | 250 ms | Completion acknowledgement during drain | Permit an attached client to acknowledge before cleanup | Shutdown acknowledgement tests |\n| `shutdown.resourceDrainAcknowledgementPollIntervalMs` | 5 ms | Completion acknowledgement during drain | Preserve the distinct fast acknowledgement cadence | Acknowledgement cadence characterization |\n| `delivery.postAcceptanceExecutionReattachmentLimit` | 1 reattachment | Authenticated close after acceptance | Recover the accepted request without local replay | Reattachment tests |\n| `delivery.resultTransferResumeLimitPerExecutionAttempt` | 1 fetch resume per execute attempt | Interrupted manifest transfer | Resume one transfer independently for each execute attempt | Two-scope resume tests |\n| `output.maximumChunkRawBytes` | 64 KiB | Worker and result chunks | Bound one raw output record | Chunk codec and spool tests |\n| `output.inlineRawBytes` | 256 KiB | Inline result storage | Avoid files for small results | Spool threshold tests |\n| `output.maximumResultRawBytes` | 256 MiB | One completed result | Bound retained output for one request | Result-cap tests |\n| `output.maximumAggregateSpoolRawBytes` | 512 MiB | All retained completions for one daemon | Bound aggregate spool pressure | Aggregate-cap tests |\n| `recipe.effectiveMemorySelection` | Use constrained bytes only when positive and smaller than total bytes; preserve selected raw bytes | Memory derivation input | Respect real lower constraints without rounding identity | Policy derivation table |\n| `resources.effectiveMemoryBytes` | Selected raw effective bytes | Resource reports and derived thresholds | Preserve non-MiB-aligned system information exactly | Policy derivation table |\n| `recipe.effectiveMemoryMiB` | `max(1, floor(effectiveMemoryBytes / MiB))` | Memory threshold derivation | Give sub-MiB inputs a stable minimum | Policy boundary tests |\n| `recipe.hardProcessRss` | `clamp(floor(effectiveMemoryMiB / 2), 256, 8192) * MiB` | Hard daemon RSS limit | Reserve memory for the host while bounding small and large systems | Policy boundary tests |\n| `resources.hardProcessRssBytes` | Hard-process-RSS recipe | Process replacement and worker launch | Trigger controlled replacement before OOM | Resource supervision tests |\n| `resources.softProcessRssBytes` | `floor(hardProcessRssMiB * 0.8) * MiB` | Transient resource shedding | Shed before hard replacement | Resource hysteresis tests |\n| `resources.resumeProcessRssBytes` | `floor(hardProcessRssMiB * 0.7) * MiB` | Admission resumption | Require lower RSS before resuming work | Resource hysteresis tests |\n| `recipe.workerOldGeneration` | `clamp(floor(effectiveMemoryMiB / 4), 128, 4096)` MiB | Worker V8 old generation | Bound worker heap within process budget | Worker launch tests |\n| `resources.workerMaxOldGenerationSizeMiB` | Worker-old-generation recipe | Worker resource limits | Pass the derived V8 limit unchanged | Process/worker snapshot test |\n| `resources.supervisionIntervalMs` | 250 ms | Process RSS and spool sampling | Detect sustained pressure without per-operation overhead | Resource cadence tests |\n| `resources.replacementWindowMs` | 10 min | Replacement circuit | Count only recent replacements | Replacement-window tests |\n| `resources.replacementLimit` | 2 replacements; third drains | Replacement circuit | Stop persistent replacement churn | Persistent-pressure tests |\n| `resources.workerHeapSampleIntervalMs` | 25 ms | Active worker heap high-water sampling | Observe short-lived heap peaks | Worker cadence characterization |\n| `diagnostics.logRotateBytes` | 10 MiB | Diagnostic log rotation | Bound active diagnostic file size | Logger rotation tests |\n| `diagnostics.logBackupCount` | 4 backups plus active log | Diagnostic log rotation | Retain a bounded diagnostic history | Logger backup tests |\n| `diagnostics.maximumQueuedEvents` | 1,024 | Pending diagnostic writes | Bound memory when storage is slow | Logger queue tests |\n| `diagnostics.disconnectedTraceRetentionMs` | 5 min | Disconnected operation traces | Retain reconnect evidence without changing result retention | Trace expiry tests |\n| `diagnostics.maximumDisconnectedTraces` | 1,024 with effective minimum 1 | Disconnected operation traces | Bound diagnostic-only retention | Trace capacity tests |\n\n## Intentional absences\n\n| Deadline | Value | Reason |\n| --- | --- | --- |\n| healthy startup | None | Progressing warm-up has no project-size deadline. |\n| startup silence | None | Silence handling is deferred to the daemon follow-up contract. |\n| post-accept completion | None | Accepted work is not replayed or failed because it runs long. |\n| worker output acknowledgement | None | Backpressure waits for durable consumption without a timer. |\n| unacknowledged result | None | Retention eviction is deferred to the daemon follow-up contract. |\n\n## Migration access\n\n`DaemonPolicy.fromSerialized` and `DaemonPolicy.toSerialized` are temporary public root methods while app-owned process and worker entries require a complete-snapshot bridge. Phase 29 removes them after those entries move into the daemon package.\n\nPhase 26 removes `@symnav/daemon/policy-testing` after app-owned mechanism tests move package-local. The subpath exports only `DaemonPolicyTestFactory` and production imports are rejected by lint and meta-tests.\n"},"head:plans/005/daemon-architecture-functional-spec.md":{path:"plans/005/daemon-architecture-functional-spec.md",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"6055a00fc460ece848159e7e90e32c3f454425d4cb911425a9fef73f329c282b",text:`# Symnav Daemon Architecture Functional Spec

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
`},"head:apps/cli/src/command-execution-result.ts":{path:"apps/cli/src/command-execution-result.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"f282b4f36b87b50907bb99ab3580412e27bfeb39b9c4a3d8c3d9df92ef78a59c",text:`import { createHash, randomUUID } from "node:crypto";
import { constants } from "node:fs";
import { mkdir, open, unlink, type FileHandle } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Writable } from "node:stream";
import { finished as streamFinished } from "node:stream/promises";
import type { DaemonPolicyValues } from "@symnav/daemon";
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
  readonly policy: DaemonPolicyValues["output"];
  readonly directory?: string;
}

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
    private readonly maximumRecordBytes?: number,
  ) {}

  async *records(offset = 0): AsyncIterable<CommandOutputRecord> {
    const records =
      this.filePath === undefined
        ? this.inlineRecords
        : OrderedCommandOutput.decodeFileRecords(this.filePath, this.maximumRecordBytes!);
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
  private readonly maximumRecordBytes: number;
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

  constructor(options: OrderedCommandOutputOptions) {
    const policy = options.policy;
    this.inlineBytes = policy.inlineRawBytes;
    this.directory = options.directory ?? tmpdir();
    this.maximumBytes = policy.maximumResultRawBytes;
    this.maximumRecordBytes = policy.maximumChunkRawBytes;
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
      if (record.bytes.byteLength > this.maximumRecordBytes) {
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
      this.maximumRecordBytes,
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
    for (let offset = 0; offset < bytes.byteLength; offset += this.maximumRecordBytes) {
      const chunk = Buffer.from(
        bytes.buffer,
        bytes.byteOffset + offset,
        Math.min(this.maximumRecordBytes, bytes.byteLength - offset),
      );
      if (this.capturedBytes + chunk.byteLength > this.maximumBytes) {
        throw new CommandOutputCapacityError();
      }
      this.capturedBytes += chunk.byteLength;
      if (
        this.pending?.stream === stream &&
        this.pending.bytes.byteLength + chunk.byteLength <= this.maximumRecordBytes
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

  static async *decodeFileRecords(
    filePath: string,
    maximumRecordBytes: number,
  ): AsyncIterable<CommandOutputRecord> {
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
        if (sequence !== expectedSequence || streamByte > 1 || length > maximumRecordBytes) {
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
`},"base:apps/cli/src/command-execution-result.ts":{path:"apps/cli/src/command-execution-result.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"8f3f09dc5ec1a1c9fdf5db2f0fb15ff50488f2ec71e2e8bf488b997cd2d2e20b",text:`import { createHash, randomUUID } from "node:crypto";
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
`},"head:apps/cli/src/daemon/completion-spool.ts":{path:"apps/cli/src/daemon/completion-spool.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"0a7f93429efee5072953e234699535f9973b2a84740d80097cfb83b6a275894f",text:`import { createHash, randomUUID } from "node:crypto";
import { chmod, lstat, mkdir, open, rm, unlink } from "node:fs/promises";
import { join } from "node:path";
import type { DaemonPolicyValues } from "@symnav/daemon";
import {
  OrderedCommandOutput,
  type CommandOutputRecord,
  type CommandOutputSummary,
} from "../command-execution-result.js";

export interface CompletionSpoolIdentity {
  readonly workspaceKey: string;
  readonly instanceId: string;
  readonly transferId: string;
}

export interface CompletionSpoolManifest extends CommandOutputSummary {
  readonly transferId: string;
  readonly requestId: string;
  readonly instanceId: string;
  readonly exitCode: number;
}

export interface CompletionSpoolUsage {
  readonly rawBytes: number;
  readonly completionCount: number;
}

export interface DaemonCompletionSpoolStoreOptions {
  readonly directory: string;
  readonly workspaceKey: string;
  readonly instanceId: string;
  readonly policy: DaemonPolicyValues["output"];
  readonly storage?: CompletionSpoolStorage;
}

export interface CompletionSpoolFile {
  write(bytes: Uint8Array): Promise<unknown>;
  sync(): Promise<void>;
  close(): Promise<void>;
}

export interface CompletionSpoolStorage {
  ensureDirectory(path: string): Promise<void>;
  createFile(path: string): Promise<CompletionSpoolFile>;
  records(path: string, maximumChunkBytes: number): AsyncIterable<CommandOutputRecord>;
  unlink(path: string): Promise<void>;
  removeInstance(path: string): Promise<void>;
}

export class NodeCompletionSpoolStorage implements CompletionSpoolStorage {
  async ensureDirectory(path: string): Promise<void> {
    await mkdir(path, { recursive: true, mode: 0o700 });
    const metadata = await lstat(path);
    if (metadata.isSymbolicLink() || !metadata.isDirectory()) {
      throw new Error("Completion spool directory is unsafe");
    }
    await chmod(path, 0o700);
  }

  createFile(path: string): Promise<CompletionSpoolFile> {
    return open(path, "wx", 0o600);
  }

  records(path: string, maximumChunkBytes: number): AsyncIterable<CommandOutputRecord> {
    return OrderedCommandOutput.decodeFileRecords(path, maximumChunkBytes);
  }

  async unlink(path: string): Promise<void> {
    await unlink(path);
  }

  async removeInstance(path: string): Promise<void> {
    await rm(path, { recursive: true, force: true });
  }
}

interface CompletionSpoolOptions {
  readonly directory: string;
  readonly identity: CompletionSpoolIdentity;
  readonly requestId: string;
  readonly inlineBytes: number;
  readonly maximumResultBytes: number;
  readonly maximumChunkBytes: number;
  readonly reserve: (bytes: number) => void;
  readonly release: (bytes: number) => void;
  readonly complete: () => void;
  readonly remove: () => void;
  readonly releaseCompletion: () => void;
  readonly cleanupComplete: () => void;
  readonly storage: CompletionSpoolStorage;
}

export class CompletionSpoolCapacityError extends Error {
  constructor() {
    super("Daemon completion spool capacity exceeded");
    this.name = "CompletionSpoolCapacityError";
  }
}

export class CompletionSpoolReadError extends Error {
  constructor(cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause), { cause });
    this.name = "CompletionSpoolReadError";
  }
}

export class CompletionSpool {
  private readonly hash = createHash("sha256");
  private readonly inlineRecords: CommandOutputRecord[] = [];
  private file: CompletionSpoolFile | undefined;
  private filePath: string | undefined;
  private rawBytes = 0;
  private recordCount = 0;
  private terminal = false;
  private ownershipReleased = false;
  private cleanupFinished = false;
  private disposal: Promise<void> | undefined;
  private manifest: CompletionSpoolManifest | undefined;

  constructor(private readonly options: CompletionSpoolOptions) {}

  get completedManifest(): CompletionSpoolManifest | undefined {
    return this.manifest;
  }

  async append(record: CommandOutputRecord): Promise<void> {
    if (this.terminal) throw new Error("Completion spool is already terminal");
    if (record.sequence !== this.recordCount) throw new Error("Unexpected command output sequence");
    if (record.bytes.byteLength > this.options.maximumChunkBytes) {
      throw new Error("Command output record exceeds chunk capacity");
    }
    if (this.rawBytes + record.bytes.byteLength > this.options.maximumResultBytes) {
      await this.failCapacity();
    }
    let currentRecordReserved = false;
    try {
      this.options.reserve(record.bytes.byteLength);
      currentRecordReserved = true;
      const stored: CommandOutputRecord = { ...record, bytes: Buffer.from(record.bytes) };
      if (
        this.file === undefined &&
        this.rawBytes + stored.bytes.byteLength > this.options.inlineBytes
      ) {
        await this.spillInlineRecords();
      }
      const encoded = OrderedCommandOutput.encodeRecord(stored);
      if (this.file === undefined) this.inlineRecords.push(stored);
      else await this.file.write(encoded);
      this.hash.update(encoded.subarray(4));
      this.rawBytes += stored.bytes.byteLength;
      this.recordCount += 1;
    } catch (error) {
      if (currentRecordReserved) this.options.release(record.bytes.byteLength);
      await this.dispose();
      throw error;
    }
  }

  async finish(exitCode: number): Promise<CompletionSpoolManifest> {
    if (this.terminal) throw new Error("Completion spool is already terminal");
    if (!Number.isSafeInteger(exitCode) || exitCode < 0)
      throw new Error("Invalid command exit code");
    try {
      await this.file?.sync();
      await this.closeFile();
      this.terminal = true;
      this.manifest = {
        transferId: this.options.identity.transferId,
        requestId: this.options.requestId,
        instanceId: this.options.identity.instanceId,
        exitCode,
        rawBytes: this.rawBytes,
        recordCount: this.recordCount,
        sha256: this.hash.digest("hex"),
      };
      this.options.complete();
      return this.manifest;
    } catch (error) {
      this.terminal = true;
      return this.disposeAfterFailure(error);
    }
  }

  async *read(offset: number): AsyncIterable<CommandOutputRecord> {
    if (!this.terminal || this.manifest === undefined) {
      throw new Error("Completion spool is not complete");
    }
    if (!Number.isSafeInteger(offset) || offset < 0 || offset > this.recordCount) {
      throw new Error("Invalid completion spool offset");
    }
    try {
      const records =
        this.filePath === undefined
          ? this.inlineRecords
          : this.options.storage.records(this.filePath, this.options.maximumChunkBytes);
      for await (const record of records) {
        if (record.sequence >= offset) yield record;
      }
    } catch (error) {
      throw new CompletionSpoolReadError(error);
    }
  }

  async acknowledge(): Promise<void> {
    if (!this.terminal) throw new Error("Completion spool is not complete");
    await this.dispose();
  }

  async dispose(): Promise<void> {
    if (this.cleanupFinished) return;
    if (this.disposal !== undefined) return this.disposal;
    this.disposal = this.performDispose();
    try {
      await this.disposal;
    } finally {
      this.disposal = undefined;
    }
  }

  private async failCapacity(): Promise<never> {
    await this.dispose();
    throw new CompletionSpoolCapacityError();
  }

  private async spillInlineRecords(): Promise<void> {
    const instanceDirectory = join(this.options.directory, this.options.identity.instanceId);
    await this.options.storage.ensureDirectory(this.options.directory);
    await this.options.storage.ensureDirectory(instanceDirectory);
    this.filePath = join(instanceDirectory, \`\${this.options.identity.transferId}.spool\`);
    this.file = await this.options.storage.createFile(this.filePath);
    for (const record of this.inlineRecords) {
      await this.file.write(OrderedCommandOutput.encodeRecord(record));
    }
    this.inlineRecords.length = 0;
  }

  private async closeFile(): Promise<void> {
    if (this.file === undefined) return;
    await this.file.close();
    this.file = undefined;
  }

  private async performDispose(): Promise<void> {
    this.terminal = true;
    let cleanupError: unknown;
    try {
      await this.closeFile();
    } catch (error) {
      cleanupError = error;
    }
    if (this.filePath !== undefined) {
      try {
        await this.options.storage.unlink(this.filePath);
        this.filePath = undefined;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") this.filePath = undefined;
        else cleanupError ??= error;
      }
    }
    this.releaseOwnership();
    if (this.file === undefined && this.filePath === undefined) {
      this.cleanupFinished = true;
      this.options.cleanupComplete();
    }
    if (cleanupError !== undefined) throw cleanupError;
  }

  private releaseOwnership(): void {
    if (this.ownershipReleased) return;
    this.ownershipReleased = true;
    this.inlineRecords.length = 0;
    this.options.release(this.rawBytes);
    this.options.releaseCompletion();
    this.options.remove();
  }

  private async disposeAfterFailure(error: unknown): Promise<never> {
    try {
      await this.dispose();
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        "Completion spool operation and cleanup failed",
      );
    }
    throw error;
  }
}

export class DaemonCompletionSpoolStore {
  private readonly spools = new Map<string, CompletionSpool>();
  private readonly inlineBytes: number;
  private readonly maximumResultBytes: number;
  private readonly maximumAggregateBytes: number;
  private readonly maximumChunkBytes: number;
  private readonly storage: CompletionSpoolStorage;
  private rawBytes = 0;
  private completionCount = 0;
  private readonly pendingCleanup = new Set<CompletionSpool>();

  constructor(private readonly options: DaemonCompletionSpoolStoreOptions) {
    DaemonCompletionSpoolStore.validateIdentity(options.instanceId);
    const policy = options.policy;
    this.maximumChunkBytes = policy.maximumChunkRawBytes;
    this.inlineBytes = policy.inlineRawBytes;
    this.maximumResultBytes = policy.maximumResultRawBytes;
    this.maximumAggregateBytes = policy.maximumAggregateSpoolRawBytes;
    this.storage = options.storage ?? new NodeCompletionSpoolStorage();
  }

  async create(requestId: string): Promise<CompletionSpool> {
    if (this.spools.has(requestId))
      throw new Error(\`Completion spool already exists: \${requestId}\`);
    let completionCounted = false;
    const spool = new CompletionSpool({
      directory: this.options.directory,
      identity: {
        workspaceKey: this.options.workspaceKey,
        instanceId: this.options.instanceId,
        transferId: randomUUID(),
      },
      requestId,
      inlineBytes: this.inlineBytes,
      maximumResultBytes: this.maximumResultBytes,
      maximumChunkBytes: this.maximumChunkBytes,
      reserve: (bytes) => this.reserve(bytes),
      release: (bytes) => {
        this.rawBytes -= bytes;
      },
      complete: () => {
        completionCounted = true;
        this.completionCount += 1;
      },
      remove: () => {
        if (this.spools.get(requestId) !== spool) return;
        this.spools.delete(requestId);
      },
      releaseCompletion: () => {
        if (completionCounted) this.completionCount -= 1;
        completionCounted = false;
      },
      cleanupComplete: () => {
        this.pendingCleanup.delete(spool);
      },
      storage: this.storage,
    });
    this.spools.set(requestId, spool);
    this.pendingCleanup.add(spool);
    return spool;
  }

  async open(requestId: string): Promise<CompletionSpool | undefined> {
    return this.spools.get(requestId);
  }

  usage(): CompletionSpoolUsage {
    return { rawBytes: this.rawBytes, completionCount: this.completionCount };
  }

  async cleanupInstance(instanceId: string): Promise<void> {
    if (instanceId !== this.options.instanceId) return;
    const failures: unknown[] = [];
    for (const spool of [...this.pendingCleanup]) {
      await spool.dispose().catch((error) => failures.push(error));
    }
    await this.storage
      .removeInstance(join(this.options.directory, instanceId))
      .catch((error) => failures.push(error));
    if (failures.length > 0) throw new AggregateError(failures, "Completion spool cleanup failed");
  }

  async cleanupConfirmedDeadInstance(instanceId: string): Promise<void> {
    await this.cleanupInstance(instanceId);
  }

  private reserve(bytes: number): void {
    if (this.rawBytes + bytes > this.maximumAggregateBytes) {
      throw new CompletionSpoolCapacityError();
    }
    this.rawBytes += bytes;
  }

  private static validateIdentity(instanceId: string): void {
    if (!/^[A-Za-z\\d_-]+$/.test(instanceId)) throw new Error("Invalid completion spool instance");
  }
}
`},"base:apps/cli/src/daemon/completion-spool.ts":{path:"apps/cli/src/daemon/completion-spool.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"8fe39bf4e1448daaa9f3c1e95eca4adfa968bded1cc70a3ae79ff995d687ab4b",text:`import { createHash, randomUUID } from "node:crypto";
import { chmod, lstat, mkdir, open, rm, unlink } from "node:fs/promises";
import { join } from "node:path";
import {
  OrderedCommandOutput,
  type CommandOutputRecord,
  type CommandOutputSummary,
} from "../command-execution-result.js";

export const COMMAND_OUTPUT_CHUNK_BYTES = 64 * 1024;
export const DAEMON_MAXIMUM_CONTROL_FRAME_BYTES = 256 * 1024;
export const COMMAND_OUTPUT_LIMIT_BYTES = 256 * 1024 * 1024;
export const DAEMON_COMPLETION_SPOOL_LIMIT_BYTES = 512 * 1024 * 1024;
export const COMPLETION_SPOOL_INLINE_BYTES = 256 * 1024;

export interface CompletionSpoolIdentity {
  readonly workspaceKey: string;
  readonly instanceId: string;
  readonly transferId: string;
}

export interface CompletionSpoolManifest extends CommandOutputSummary {
  readonly transferId: string;
  readonly requestId: string;
  readonly instanceId: string;
  readonly exitCode: number;
}

export interface CompletionSpoolUsage {
  readonly rawBytes: number;
  readonly completionCount: number;
}

export interface DaemonCompletionSpoolStoreOptions {
  readonly directory: string;
  readonly workspaceKey: string;
  readonly instanceId: string;
  readonly inlineBytes?: number;
  readonly maximumResultBytes?: number;
  readonly maximumAggregateBytes?: number;
  readonly storage?: CompletionSpoolStorage;
}

export interface CompletionSpoolFile {
  write(bytes: Uint8Array): Promise<unknown>;
  sync(): Promise<void>;
  close(): Promise<void>;
}

export interface CompletionSpoolStorage {
  ensureDirectory(path: string): Promise<void>;
  createFile(path: string): Promise<CompletionSpoolFile>;
  records(path: string): AsyncIterable<CommandOutputRecord>;
  unlink(path: string): Promise<void>;
  removeInstance(path: string): Promise<void>;
}

export class NodeCompletionSpoolStorage implements CompletionSpoolStorage {
  async ensureDirectory(path: string): Promise<void> {
    await mkdir(path, { recursive: true, mode: 0o700 });
    const metadata = await lstat(path);
    if (metadata.isSymbolicLink() || !metadata.isDirectory()) {
      throw new Error("Completion spool directory is unsafe");
    }
    await chmod(path, 0o700);
  }

  createFile(path: string): Promise<CompletionSpoolFile> {
    return open(path, "wx", 0o600);
  }

  records(path: string): AsyncIterable<CommandOutputRecord> {
    return OrderedCommandOutput.decodeFileRecords(path);
  }

  async unlink(path: string): Promise<void> {
    await unlink(path);
  }

  async removeInstance(path: string): Promise<void> {
    await rm(path, { recursive: true, force: true });
  }
}

interface CompletionSpoolOptions {
  readonly directory: string;
  readonly identity: CompletionSpoolIdentity;
  readonly requestId: string;
  readonly inlineBytes: number;
  readonly maximumResultBytes: number;
  readonly reserve: (bytes: number) => void;
  readonly release: (bytes: number) => void;
  readonly complete: () => void;
  readonly remove: () => void;
  readonly releaseCompletion: () => void;
  readonly cleanupComplete: () => void;
  readonly storage: CompletionSpoolStorage;
}

export class CompletionSpoolCapacityError extends Error {
  constructor() {
    super("Daemon completion spool capacity exceeded");
    this.name = "CompletionSpoolCapacityError";
  }
}

export class CompletionSpoolReadError extends Error {
  constructor(cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause), { cause });
    this.name = "CompletionSpoolReadError";
  }
}

export class CompletionSpool {
  private readonly hash = createHash("sha256");
  private readonly inlineRecords: CommandOutputRecord[] = [];
  private file: CompletionSpoolFile | undefined;
  private filePath: string | undefined;
  private rawBytes = 0;
  private recordCount = 0;
  private terminal = false;
  private ownershipReleased = false;
  private cleanupFinished = false;
  private disposal: Promise<void> | undefined;
  private manifest: CompletionSpoolManifest | undefined;

  constructor(private readonly options: CompletionSpoolOptions) {}

  get completedManifest(): CompletionSpoolManifest | undefined {
    return this.manifest;
  }

  async append(record: CommandOutputRecord): Promise<void> {
    if (this.terminal) throw new Error("Completion spool is already terminal");
    if (record.sequence !== this.recordCount) throw new Error("Unexpected command output sequence");
    if (record.bytes.byteLength > COMMAND_OUTPUT_CHUNK_BYTES) {
      throw new Error("Command output record exceeds chunk capacity");
    }
    if (this.rawBytes + record.bytes.byteLength > this.options.maximumResultBytes) {
      await this.failCapacity();
    }
    let currentRecordReserved = false;
    try {
      this.options.reserve(record.bytes.byteLength);
      currentRecordReserved = true;
      const stored: CommandOutputRecord = { ...record, bytes: Buffer.from(record.bytes) };
      if (
        this.file === undefined &&
        this.rawBytes + stored.bytes.byteLength > this.options.inlineBytes
      ) {
        await this.spillInlineRecords();
      }
      const encoded = OrderedCommandOutput.encodeRecord(stored);
      if (this.file === undefined) this.inlineRecords.push(stored);
      else await this.file.write(encoded);
      this.hash.update(encoded.subarray(4));
      this.rawBytes += stored.bytes.byteLength;
      this.recordCount += 1;
    } catch (error) {
      if (currentRecordReserved) this.options.release(record.bytes.byteLength);
      await this.dispose();
      throw error;
    }
  }

  async finish(exitCode: number): Promise<CompletionSpoolManifest> {
    if (this.terminal) throw new Error("Completion spool is already terminal");
    if (!Number.isSafeInteger(exitCode) || exitCode < 0)
      throw new Error("Invalid command exit code");
    try {
      await this.file?.sync();
      await this.closeFile();
      this.terminal = true;
      this.manifest = {
        transferId: this.options.identity.transferId,
        requestId: this.options.requestId,
        instanceId: this.options.identity.instanceId,
        exitCode,
        rawBytes: this.rawBytes,
        recordCount: this.recordCount,
        sha256: this.hash.digest("hex"),
      };
      this.options.complete();
      return this.manifest;
    } catch (error) {
      this.terminal = true;
      return this.disposeAfterFailure(error);
    }
  }

  async *read(offset: number): AsyncIterable<CommandOutputRecord> {
    if (!this.terminal || this.manifest === undefined) {
      throw new Error("Completion spool is not complete");
    }
    if (!Number.isSafeInteger(offset) || offset < 0 || offset > this.recordCount) {
      throw new Error("Invalid completion spool offset");
    }
    try {
      const records =
        this.filePath === undefined
          ? this.inlineRecords
          : this.options.storage.records(this.filePath);
      for await (const record of records) {
        if (record.sequence >= offset) yield record;
      }
    } catch (error) {
      throw new CompletionSpoolReadError(error);
    }
  }

  async acknowledge(): Promise<void> {
    if (!this.terminal) throw new Error("Completion spool is not complete");
    await this.dispose();
  }

  async dispose(): Promise<void> {
    if (this.cleanupFinished) return;
    if (this.disposal !== undefined) return this.disposal;
    this.disposal = this.performDispose();
    try {
      await this.disposal;
    } finally {
      this.disposal = undefined;
    }
  }

  private async failCapacity(): Promise<never> {
    await this.dispose();
    throw new CompletionSpoolCapacityError();
  }

  private async spillInlineRecords(): Promise<void> {
    const instanceDirectory = join(this.options.directory, this.options.identity.instanceId);
    await this.options.storage.ensureDirectory(this.options.directory);
    await this.options.storage.ensureDirectory(instanceDirectory);
    this.filePath = join(instanceDirectory, \`\${this.options.identity.transferId}.spool\`);
    this.file = await this.options.storage.createFile(this.filePath);
    for (const record of this.inlineRecords) {
      await this.file.write(OrderedCommandOutput.encodeRecord(record));
    }
    this.inlineRecords.length = 0;
  }

  private async closeFile(): Promise<void> {
    if (this.file === undefined) return;
    await this.file.close();
    this.file = undefined;
  }

  private async performDispose(): Promise<void> {
    this.terminal = true;
    let cleanupError: unknown;
    try {
      await this.closeFile();
    } catch (error) {
      cleanupError = error;
    }
    if (this.filePath !== undefined) {
      try {
        await this.options.storage.unlink(this.filePath);
        this.filePath = undefined;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") this.filePath = undefined;
        else cleanupError ??= error;
      }
    }
    this.releaseOwnership();
    if (this.file === undefined && this.filePath === undefined) {
      this.cleanupFinished = true;
      this.options.cleanupComplete();
    }
    if (cleanupError !== undefined) throw cleanupError;
  }

  private releaseOwnership(): void {
    if (this.ownershipReleased) return;
    this.ownershipReleased = true;
    this.inlineRecords.length = 0;
    this.options.release(this.rawBytes);
    this.options.releaseCompletion();
    this.options.remove();
  }

  private async disposeAfterFailure(error: unknown): Promise<never> {
    try {
      await this.dispose();
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        "Completion spool operation and cleanup failed",
      );
    }
    throw error;
  }
}

export class DaemonCompletionSpoolStore {
  private readonly spools = new Map<string, CompletionSpool>();
  private readonly inlineBytes: number;
  private readonly maximumResultBytes: number;
  private readonly maximumAggregateBytes: number;
  private readonly storage: CompletionSpoolStorage;
  private rawBytes = 0;
  private completionCount = 0;
  private readonly pendingCleanup = new Set<CompletionSpool>();

  constructor(private readonly options: DaemonCompletionSpoolStoreOptions) {
    DaemonCompletionSpoolStore.validateIdentity(options.instanceId);
    this.inlineBytes = options.inlineBytes ?? COMPLETION_SPOOL_INLINE_BYTES;
    this.maximumResultBytes = options.maximumResultBytes ?? COMMAND_OUTPUT_LIMIT_BYTES;
    this.maximumAggregateBytes =
      options.maximumAggregateBytes ?? DAEMON_COMPLETION_SPOOL_LIMIT_BYTES;
    this.storage = options.storage ?? new NodeCompletionSpoolStorage();
  }

  async create(requestId: string): Promise<CompletionSpool> {
    if (this.spools.has(requestId))
      throw new Error(\`Completion spool already exists: \${requestId}\`);
    let completionCounted = false;
    const spool = new CompletionSpool({
      directory: this.options.directory,
      identity: {
        workspaceKey: this.options.workspaceKey,
        instanceId: this.options.instanceId,
        transferId: randomUUID(),
      },
      requestId,
      inlineBytes: this.inlineBytes,
      maximumResultBytes: this.maximumResultBytes,
      reserve: (bytes) => this.reserve(bytes),
      release: (bytes) => {
        this.rawBytes -= bytes;
      },
      complete: () => {
        completionCounted = true;
        this.completionCount += 1;
      },
      remove: () => {
        if (this.spools.get(requestId) !== spool) return;
        this.spools.delete(requestId);
      },
      releaseCompletion: () => {
        if (completionCounted) this.completionCount -= 1;
        completionCounted = false;
      },
      cleanupComplete: () => {
        this.pendingCleanup.delete(spool);
      },
      storage: this.storage,
    });
    this.spools.set(requestId, spool);
    this.pendingCleanup.add(spool);
    return spool;
  }

  async open(requestId: string): Promise<CompletionSpool | undefined> {
    return this.spools.get(requestId);
  }

  usage(): CompletionSpoolUsage {
    return { rawBytes: this.rawBytes, completionCount: this.completionCount };
  }

  async cleanupInstance(instanceId: string): Promise<void> {
    if (instanceId !== this.options.instanceId) return;
    const failures: unknown[] = [];
    for (const spool of [...this.pendingCleanup]) {
      await spool.dispose().catch((error) => failures.push(error));
    }
    await this.storage
      .removeInstance(join(this.options.directory, instanceId))
      .catch((error) => failures.push(error));
    if (failures.length > 0) throw new AggregateError(failures, "Completion spool cleanup failed");
  }

  async cleanupConfirmedDeadInstance(instanceId: string): Promise<void> {
    await this.cleanupInstance(instanceId);
  }

  private reserve(bytes: number): void {
    if (this.rawBytes + bytes > this.maximumAggregateBytes) {
      throw new CompletionSpoolCapacityError();
    }
    this.rawBytes += bytes;
  }

  private static validateIdentity(instanceId: string): void {
    if (!/^[A-Za-z\\d_-]+$/.test(instanceId)) throw new Error("Invalid completion spool instance");
  }
}
`},"head:apps/cli/src/daemon/local-daemon-transport.ts":{path:"apps/cli/src/daemon/local-daemon-transport.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"bcfd94769970174510a26cd495bbbdf25fc527cf0a5643ca5c909c59be41f0e8",text:`import { existsSync, mkdirSync, rmSync } from "node:fs";
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
`},"base:apps/cli/src/daemon/local-daemon-transport.ts":{path:"apps/cli/src/daemon/local-daemon-transport.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"d3659cc57bee5c7fef70cd40b15c1764df5c5a815da4bf63a7f4090e1d611e02",text:`import { existsSync, mkdirSync, rmSync } from "node:fs";
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
`},"head:apps/cli/src/commands/daemon/register-daemon-command.ts":{path:"apps/cli/src/commands/daemon/register-daemon-command.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"958b75982ee895d980b947078afee42d2e2e6499358a3cfd88be3c43116a6d56",text:`import type { Command as CommanderCommand } from "commander";
import { createWorkspace, UserFacingError } from "@symnav/core";
import { DaemonController } from "../../daemon/daemon-controller.js";
import { DaemonLifecycleRenderer } from "../../daemon/daemon-lifecycle-renderer.js";
import { DaemonRegistry } from "../../daemon/daemon-registry.js";
import { NodeDaemonProcessLauncher } from "../../daemon/daemon-process-launcher.js";
import { DaemonWorkspaceIdentity } from "../../daemon/daemon-workspace-identity.js";
import { LocalDaemonTransport } from "../../daemon/local-daemon-transport.js";
import type { ProgramContext } from "../../program-context.js";
import type { ProgramDependencies } from "../../program-dependencies.js";

interface DaemonStartOptions {
  readonly json: boolean;
}

type DaemonOutputOptions = DaemonStartOptions;

export function registerDaemonCommand(
  program: CommanderCommand,
  context: ProgramContext,
  dependencies: ProgramDependencies,
): void {
  const daemon = program.command("daemon").description("Manage the workspace daemon");
  daemon
    .command("start")
    .description("Start and warm the workspace daemon")
    .option("--json", "emit JSON instead of text", false)
    .action(async (options: DaemonStartOptions) => {
      await DaemonStartAction.run(program, context, dependencies, options);
    });
  daemon
    .command("status")
    .description("List running workspace daemons")
    .option("--json", "emit JSON instead of text", false)
    .action(async (options: DaemonOutputOptions) => {
      await DaemonStatusAction.run(context, dependencies, options);
    });
  daemon
    .command("stop")
    .description("Stop the workspace daemon")
    .option("--json", "emit JSON instead of text", false)
    .action(async (options: DaemonOutputOptions) => {
      await DaemonStopAction.run(program, context, dependencies, options);
    });
}

class DaemonStartAction {
  static async run(
    program: CommanderCommand,
    context: ProgramContext,
    dependencies: ProgramDependencies,
    options: DaemonStartOptions,
  ): Promise<void> {
    if (process.env.SYMNAV_DAEMON === "0") {
      context.stderr.write("Daemon disabled by SYMNAV_DAEMON=0\\n");
      context.exit(1);
    }
    const cwd = program.opts<{ cwd?: string }>().cwd ?? context.cwd;
    try {
      const workspace = await createWorkspace({ startDir: cwd, fs: dependencies.fs });
      const stateDirectory = dependencies.stateDirectory;
      const identity = DaemonWorkspaceIdentity.from(workspace.root, stateDirectory);
      const registry = new DaemonRegistry(
        identity.registryDirectory,
        dependencies.daemonPolicy.values.startup,
      );
      const controller = new DaemonController(
        registry,
        new LocalDaemonTransport(dependencies.daemonPolicy.values),
        stateDirectory,
        {
          policy: dependencies.daemonPolicy.values,
          launcher: new NodeDaemonProcessLauncher(
            dependencies.symnavVersion,
            dependencies.daemonPolicy,
          ),
        },
      );
      const result = await controller.start(workspace.root);
      context.stdout.write(
        options.json
          ? DaemonLifecycleRenderer.renderStartJson(result)
          : DaemonLifecycleRenderer.renderStartText(result),
      );
    } catch (error) {
      if (error instanceof UserFacingError) {
        context.stderr.write(error.render());
        context.exit(1);
      }
      const message = error instanceof Error ? error.message : String(error);
      context.stderr.write(\`Cannot start daemon: \${message}\\n\`);
      context.exit(2);
    }
  }
}

class DaemonStatusAction {
  static async run(
    context: ProgramContext,
    dependencies: ProgramDependencies,
    options: DaemonOutputOptions,
  ): Promise<void> {
    const stateDirectory = dependencies.stateDirectory;
    const registry = new DaemonRegistry(
      DaemonWorkspaceIdentity.registryDirectory(stateDirectory),
      dependencies.daemonPolicy.values.startup,
    );
    const controller = new DaemonController(
      registry,
      new LocalDaemonTransport(dependencies.daemonPolicy.values, {
        responseTimeoutPurpose: "status-observer",
      }),
      stateDirectory,
      { policy: dependencies.daemonPolicy.values },
    );
    const results = await controller.status();
    context.stdout.write(
      options.json
        ? DaemonLifecycleRenderer.renderStatusJson(results)
        : DaemonLifecycleRenderer.renderStatusText(results),
    );
  }
}

class DaemonStopAction {
  static async run(
    program: CommanderCommand,
    context: ProgramContext,
    dependencies: ProgramDependencies,
    options: DaemonOutputOptions,
  ): Promise<void> {
    const cwd = program.opts<{ cwd?: string }>().cwd ?? context.cwd;
    try {
      const workspace = await createWorkspace({ startDir: cwd, fs: dependencies.fs });
      const stateDirectory = dependencies.stateDirectory;
      const registry = new DaemonRegistry(
        DaemonWorkspaceIdentity.registryDirectory(stateDirectory),
        dependencies.daemonPolicy.values.startup,
      );
      const controller = new DaemonController(
        registry,
        new LocalDaemonTransport(dependencies.daemonPolicy.values),
        stateDirectory,
        { policy: dependencies.daemonPolicy.values },
      );
      const result = await controller.stop(workspace.root);
      context.stdout.write(
        options.json
          ? DaemonLifecycleRenderer.renderStopJson(result)
          : DaemonLifecycleRenderer.renderStopText(result),
      );
    } catch (error) {
      if (error instanceof UserFacingError) {
        context.stderr.write(error.render());
        context.exit(1);
      }
      const message = error instanceof Error ? error.message : String(error);
      context.stderr.write(\`Cannot stop daemon: \${message}\\n\`);
      context.exit(2);
    }
  }
}
`},"base:apps/cli/src/commands/daemon/register-daemon-command.ts":{path:"apps/cli/src/commands/daemon/register-daemon-command.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"53c76ddd750ae8817797bd6862ec81df67399726863d07de48a715033cc83c8d",text:`import type { Command as CommanderCommand } from "commander";
import { createWorkspace, UserFacingError } from "@symnav/core";
import { DaemonController } from "../../daemon/daemon-controller.js";
import { DaemonLifecycleRenderer } from "../../daemon/daemon-lifecycle-renderer.js";
import { DaemonRegistry } from "../../daemon/daemon-registry.js";
import { NodeDaemonProcessLauncher } from "../../daemon/daemon-process-launcher.js";
import { DaemonWorkspaceIdentity } from "../../daemon/daemon-workspace-identity.js";
import { LocalDaemonTransport } from "../../daemon/local-daemon-transport.js";
import type { ProgramContext } from "../../program-context.js";
import type { ProgramDependencies } from "../../program-dependencies.js";

interface DaemonStartOptions {
  readonly json: boolean;
}

type DaemonOutputOptions = DaemonStartOptions;

export function registerDaemonCommand(
  program: CommanderCommand,
  context: ProgramContext,
  dependencies: ProgramDependencies,
): void {
  const daemon = program.command("daemon").description("Manage the workspace daemon");
  daemon
    .command("start")
    .description("Start and warm the workspace daemon")
    .option("--json", "emit JSON instead of text", false)
    .action(async (options: DaemonStartOptions) => {
      await DaemonStartAction.run(program, context, dependencies, options);
    });
  daemon
    .command("status")
    .description("List running workspace daemons")
    .option("--json", "emit JSON instead of text", false)
    .action(async (options: DaemonOutputOptions) => {
      await DaemonStatusAction.run(context, dependencies, options);
    });
  daemon
    .command("stop")
    .description("Stop the workspace daemon")
    .option("--json", "emit JSON instead of text", false)
    .action(async (options: DaemonOutputOptions) => {
      await DaemonStopAction.run(program, context, dependencies, options);
    });
}

class DaemonStartAction {
  static async run(
    program: CommanderCommand,
    context: ProgramContext,
    dependencies: ProgramDependencies,
    options: DaemonStartOptions,
  ): Promise<void> {
    if (process.env.SYMNAV_DAEMON === "0") {
      context.stderr.write("Daemon disabled by SYMNAV_DAEMON=0\\n");
      context.exit(1);
    }
    const cwd = program.opts<{ cwd?: string }>().cwd ?? context.cwd;
    try {
      const workspace = await createWorkspace({ startDir: cwd, fs: dependencies.fs });
      const stateDirectory = dependencies.stateDirectory;
      const identity = DaemonWorkspaceIdentity.from(workspace.root, stateDirectory);
      const registry = new DaemonRegistry(identity.registryDirectory);
      const controller = new DaemonController(
        registry,
        new LocalDaemonTransport(),
        stateDirectory,
        {
          launcher: new NodeDaemonProcessLauncher(
            dependencies.symnavVersion,
            dependencies.daemonPolicy,
          ),
        },
      );
      const result = await controller.start(workspace.root);
      context.stdout.write(
        options.json
          ? DaemonLifecycleRenderer.renderStartJson(result)
          : DaemonLifecycleRenderer.renderStartText(result),
      );
    } catch (error) {
      if (error instanceof UserFacingError) {
        context.stderr.write(error.render());
        context.exit(1);
      }
      const message = error instanceof Error ? error.message : String(error);
      context.stderr.write(\`Cannot start daemon: \${message}\\n\`);
      context.exit(2);
    }
  }
}

class DaemonStatusAction {
  static async run(
    context: ProgramContext,
    dependencies: ProgramDependencies,
    options: DaemonOutputOptions,
  ): Promise<void> {
    const stateDirectory = dependencies.stateDirectory;
    const registry = new DaemonRegistry(DaemonWorkspaceIdentity.registryDirectory(stateDirectory));
    const controller = new DaemonController(
      registry,
      new LocalDaemonTransport({ requestTimeoutMs: 100 }),
      stateDirectory,
    );
    const results = await controller.status();
    context.stdout.write(
      options.json
        ? DaemonLifecycleRenderer.renderStatusJson(results)
        : DaemonLifecycleRenderer.renderStatusText(results),
    );
  }
}

class DaemonStopAction {
  static async run(
    program: CommanderCommand,
    context: ProgramContext,
    dependencies: ProgramDependencies,
    options: DaemonOutputOptions,
  ): Promise<void> {
    const cwd = program.opts<{ cwd?: string }>().cwd ?? context.cwd;
    try {
      const workspace = await createWorkspace({ startDir: cwd, fs: dependencies.fs });
      const stateDirectory = dependencies.stateDirectory;
      const registry = new DaemonRegistry(
        DaemonWorkspaceIdentity.registryDirectory(stateDirectory),
      );
      const controller = new DaemonController(registry, new LocalDaemonTransport(), stateDirectory);
      const result = await controller.stop(workspace.root);
      context.stdout.write(
        options.json
          ? DaemonLifecycleRenderer.renderStopJson(result)
          : DaemonLifecycleRenderer.renderStopText(result),
      );
    } catch (error) {
      if (error instanceof UserFacingError) {
        context.stderr.write(error.render());
        context.exit(1);
      }
      const message = error instanceof Error ? error.message : String(error);
      context.stderr.write(\`Cannot stop daemon: \${message}\\n\`);
      context.exit(2);
    }
  }
}
`},"head:apps/cli/src/daemon/daemon-result-chunk-codec.ts":{path:"apps/cli/src/daemon/daemon-result-chunk-codec.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"ad5a2a30e11aa30159a7611a6dce4af594f97a468f042dfe42880ac92996eb5d",text:`import { createHash } from "node:crypto";
import type { DaemonResultChunk } from "./daemon-protocol.js";

const BINARY_FRAME_FLAG = 0x80000000;
const FRAME_LENGTH_MASK = 0x7fffffff;
const BINARY_HEADER_LENGTH_BYTES = 4;

interface DaemonResultChunkHeader {
  readonly transferId: string;
  readonly requestId: string;
  readonly offset: number;
  readonly sequence: number;
  readonly stream: "stdout" | "stderr";
  readonly payloadLength: number;
  readonly sha256: string;
}

export class DaemonResultChunkCodec {
  static encode(chunk: DaemonResultChunk, maximumChunkRawBytes: number): Buffer {
    DaemonResultChunkCodec.assertChunk(chunk, maximumChunkRawBytes);
    const header: DaemonResultChunkHeader = {
      transferId: chunk.transferId,
      requestId: chunk.requestId,
      offset: chunk.offset,
      sequence: chunk.sequence,
      stream: chunk.stream,
      payloadLength: chunk.bytes.byteLength,
      sha256: createHash("sha256").update(chunk.bytes).digest("hex"),
    };
    const headerBytes = Buffer.from(JSON.stringify(header));
    const payloadLength =
      BINARY_HEADER_LENGTH_BYTES + headerBytes.byteLength + chunk.bytes.byteLength;
    const encoded = Buffer.alloc(4 + payloadLength);
    encoded.writeUInt32BE((BINARY_FRAME_FLAG | payloadLength) >>> 0, 0);
    encoded.writeUInt32BE(headerBytes.byteLength, 4);
    headerBytes.copy(encoded, 8);
    Buffer.from(chunk.bytes).copy(encoded, 8 + headerBytes.byteLength);
    return encoded;
  }

  static decode(payload: Buffer, maximumChunkRawBytes: number): DaemonResultChunk {
    if (payload.byteLength < BINARY_HEADER_LENGTH_BYTES) {
      throw new Error("Truncated daemon result chunk header");
    }
    const headerLength = payload.readUInt32BE(0);
    if (headerLength === 0 || headerLength > payload.byteLength - BINARY_HEADER_LENGTH_BYTES) {
      throw new Error("Invalid daemon result chunk header length");
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload.subarray(4, 4 + headerLength).toString("utf8"));
    } catch {
      throw new Error("Malformed daemon result chunk header");
    }
    const bytes = payload.subarray(4 + headerLength);
    if (
      !DaemonResultChunkCodec.isHeader(parsed, maximumChunkRawBytes) ||
      parsed.payloadLength !== bytes.byteLength
    ) {
      throw new Error("Invalid daemon result chunk header");
    }
    if (createHash("sha256").update(bytes).digest("hex") !== parsed.sha256) {
      throw new Error("Corrupt daemon result chunk payload");
    }
    const chunk: DaemonResultChunk = {
      transferId: parsed.transferId,
      requestId: parsed.requestId,
      offset: parsed.offset,
      sequence: parsed.sequence,
      stream: parsed.stream,
      bytes: Uint8Array.from(bytes),
    };
    DaemonResultChunkCodec.assertChunk(chunk, maximumChunkRawBytes);
    return chunk;
  }

  private static assertChunk(chunk: DaemonResultChunk, maximumChunkRawBytes: number): void {
    if (
      chunk.transferId.length === 0 ||
      chunk.requestId.length === 0 ||
      !Number.isSafeInteger(chunk.offset) ||
      chunk.offset < 0 ||
      !Number.isSafeInteger(chunk.sequence) ||
      chunk.sequence < 0 ||
      (chunk.stream !== "stdout" && chunk.stream !== "stderr") ||
      !(chunk.bytes instanceof Uint8Array) ||
      chunk.bytes.byteLength > maximumChunkRawBytes
    ) {
      throw new Error("Invalid daemon result chunk");
    }
  }

  private static isHeader(
    value: unknown,
    maximumChunkRawBytes: number,
  ): value is DaemonResultChunkHeader {
    if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
    const header = value as Record<string, unknown>;
    const keys = Object.keys(header).sort();
    const expected = [
      "offset",
      "payloadLength",
      "requestId",
      "sequence",
      "sha256",
      "stream",
      "transferId",
    ].sort();
    return (
      keys.length === expected.length &&
      keys.every((key, index) => key === expected[index]) &&
      typeof header.transferId === "string" &&
      header.transferId.length > 0 &&
      typeof header.requestId === "string" &&
      header.requestId.length > 0 &&
      Number.isSafeInteger(header.offset) &&
      Number(header.offset) >= 0 &&
      Number.isSafeInteger(header.sequence) &&
      Number(header.sequence) >= 0 &&
      (header.stream === "stdout" || header.stream === "stderr") &&
      Number.isSafeInteger(header.payloadLength) &&
      Number(header.payloadLength) >= 0 &&
      Number(header.payloadLength) <= maximumChunkRawBytes &&
      typeof header.sha256 === "string" &&
      /^[a-f\\d]{64}$/.test(header.sha256)
    );
  }
}

export class DaemonTransferFrameDecoder {
  private buffered = Buffer.alloc(0);

  constructor(
    private readonly maximumControlFrameBytes: number,
    private readonly maximumChunkRawBytes: number,
  ) {}

  append(bytes: Buffer): readonly (unknown | DaemonResultChunk)[] {
    this.buffered = Buffer.concat([this.buffered, bytes]);
    const values: (unknown | DaemonResultChunk)[] = [];
    while (this.buffered.byteLength >= 4) {
      const encodedLength = this.buffered.readUInt32BE(0);
      const binary = (encodedLength & BINARY_FRAME_FLAG) !== 0;
      const payloadLength = encodedLength & FRAME_LENGTH_MASK;
      const maximum = binary
        ? this.maximumControlFrameBytes + this.maximumChunkRawBytes
        : this.maximumControlFrameBytes;
      if (payloadLength > maximum) throw new Error("Daemon result frame exceeds capacity");
      if (this.buffered.byteLength < payloadLength + 4) break;
      const payload = this.buffered.subarray(4, payloadLength + 4);
      this.buffered = this.buffered.subarray(payloadLength + 4);
      if (binary) {
        values.push(DaemonResultChunkCodec.decode(payload, this.maximumChunkRawBytes));
        continue;
      }
      try {
        values.push(JSON.parse(payload.toString("utf8")));
      } catch {
        throw new Error("Daemon control frame contains malformed JSON");
      }
    }
    return values;
  }

  assertComplete(): void {
    if (this.buffered.byteLength !== 0) {
      throw new Error("Daemon result transfer ended with a truncated frame");
    }
  }
}
`},"head:apps/cli/src/daemon/daemon-navigation-worker.ts":{path:"apps/cli/src/daemon/daemon-navigation-worker.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"3d48e19349b546ad8dde3e373379a4d5a2a16172065e7790783ff33b8839f8e9",text:`import { Worker } from "node:worker_threads";
import { DaemonPolicy } from "@symnav/daemon";
import type { CliExecutionRequest, CommandOutputRecord } from "../command-execution-result.js";
import {
  DaemonNavigationWorkerProtocol,
  type DaemonNavigationWorkerRequest,
  type DaemonNavigationWorkerResponse,
} from "./daemon-navigation-worker-protocol.js";

export interface DaemonNavigationWorkerExit {
  readonly generation: number;
  readonly cause: "closed" | "terminated" | "out-of-memory" | "error";
  readonly errorName?: string;
}

export class DaemonNavigationWorkerExitedError extends Error {
  constructor(
    readonly exit: DaemonNavigationWorkerExit,
    message = \`Daemon navigation worker exited (\${exit.cause})\`,
  ) {
    super(message);
    this.name = "DaemonNavigationWorkerExitedError";
  }
}

export interface DaemonNavigationWorker {
  readonly generation: number;
  readonly exited: Promise<DaemonNavigationWorkerExit>;
  start(workspaceRoot: string): Promise<DaemonNavigationWorkerResponse>;
  execute(
    requestId: string,
    request: CliExecutionRequest,
    output: { append(record: CommandOutputRecord): Promise<void> },
  ): Promise<DaemonNavigationWorkerResponse>;
  releaseTransientResources(): Promise<DaemonNavigationWorkerResponse>;
  drainAndClose(): Promise<void>;
  terminate(): Promise<void>;
}

export interface DaemonNavigationWorkerConfiguration {
  readonly stateDirectory: string;
  readonly policy: ReturnType<DaemonPolicy["toSerialized"]>;
}

export interface NodeDaemonNavigationWorkerOptions {
  readonly generation: number;
  readonly configuration: DaemonNavigationWorkerConfiguration;
  readonly resourceLimits: {
    readonly maxOldGenerationSizeMb: number;
  };
  readonly entryUrl?: URL;
  readonly workerData?: Readonly<Record<string, unknown>>;
}

interface PendingWorkerResponse {
  readonly resolve: (response: DaemonNavigationWorkerResponse) => void;
  readonly reject: (error: Error) => void;
  readonly appendOutput: (record: CommandOutputRecord) => Promise<void>;
  nextSequence: number;
  chunkInFlight: boolean;
}

export class NodeDaemonNavigationWorker implements DaemonNavigationWorker {
  readonly generation: number;
  readonly exited: Promise<DaemonNavigationWorkerExit>;
  private readonly worker: Worker;
  private readonly pending = new Map<string, PendingWorkerResponse>();
  private readonly completed = new Set<string>();
  private resolveExited!: (exit: DaemonNavigationWorkerExit) => void;
  private exit: DaemonNavigationWorkerExit | undefined;
  private terminating = false;
  private closeAcknowledged = false;
  private communicationFailure: Error | undefined;
  private communicationFailureCode: string | undefined;
  private releaseSequence = 0;
  private readonly maximumChunkRawBytes: number;

  constructor(options: NodeDaemonNavigationWorkerOptions) {
    this.generation = options.generation;
    this.maximumChunkRawBytes = DaemonPolicy.fromSerialized(
      options.configuration.policy,
    ).values.output.maximumChunkRawBytes;
    this.exited = new Promise((resolve) => {
      this.resolveExited = resolve;
    });
    this.worker = new Worker(
      options.entryUrl ?? new URL("./daemon-navigation-worker-entry.js", import.meta.url),
      {
        workerData: {
          stateDirectory: options.configuration.stateDirectory,
          generation: options.generation,
          policy: options.configuration.policy,
          ...options.workerData,
        },
        resourceLimits: options.resourceLimits,
      },
    );
    this.worker.on("message", (value: unknown) => void this.receive(value));
    this.worker.once("error", (error) => this.failCommunication(error));
    this.worker.once("exit", () => this.finishExit());
  }

  start(workspaceRoot: string): Promise<DaemonNavigationWorkerResponse> {
    return this.send("initialize", {
      kind: "initialize",
      generation: this.generation,
      workspaceRoot,
    });
  }

  execute(
    requestId: string,
    request: CliExecutionRequest,
    output: { append(record: CommandOutputRecord): Promise<void> },
  ): Promise<DaemonNavigationWorkerResponse> {
    return this.send(
      \`execute:\${requestId}\`,
      {
        kind: "execute",
        generation: this.generation,
        requestId,
        request,
      },
      output.append.bind(output),
    );
  }

  releaseTransientResources(): Promise<DaemonNavigationWorkerResponse> {
    const operationId = \`\${this.generation}:\${this.releaseSequence}\`;
    this.releaseSequence += 1;
    return this.send(\`release-transient:\${operationId}\`, {
      kind: "release-transient",
      generation: this.generation,
      operationId,
    });
  }

  async drainAndClose(): Promise<void> {
    if (this.exit !== undefined) return;
    await this.send("close", { kind: "close", generation: this.generation });
    await this.exited;
  }

  async terminate(): Promise<void> {
    if (this.exit !== undefined) return;
    this.terminating = true;
    await this.worker.terminate();
    await this.exited;
  }

  private send(
    key: string,
    request: DaemonNavigationWorkerRequest,
    appendOutput: ((record: CommandOutputRecord) => Promise<void>) | undefined = undefined,
  ): Promise<DaemonNavigationWorkerResponse> {
    if (this.exit !== undefined)
      return Promise.reject(new Error("Daemon navigation worker exited"));
    if (this.pending.has(key) || this.completed.has(key)) {
      return Promise.reject(new Error(\`Duplicate daemon navigation worker request: \${key}\`));
    }
    const response = new Promise<DaemonNavigationWorkerResponse>((resolve, reject) => {
      this.pending.set(key, {
        resolve,
        reject,
        appendOutput:
          appendOutput ?? (() => Promise.reject(new Error("Worker output sink is unavailable"))),
        nextSequence: 0,
        chunkInFlight: false,
      });
    });
    this.worker.postMessage(DaemonNavigationWorkerProtocol.request(request));
    return response;
  }

  private async receive(value: unknown): Promise<void> {
    let response: DaemonNavigationWorkerResponse;
    try {
      response = DaemonNavigationWorkerProtocol.response(value, this.maximumChunkRawBytes);
    } catch (error) {
      this.failCommunication(error);
      return;
    }
    if (response.generation !== this.generation) return;
    if (response.kind === "output-chunk") {
      await this.receiveOutputChunk(response);
      return;
    }
    const key = NodeDaemonNavigationWorker.responseKey(response);
    if (this.completed.has(key)) {
      this.failCommunication(new Error(\`Duplicate daemon navigation worker response: \${key}\`));
      return;
    }
    const pending = this.pending.get(key);
    if (pending === undefined) {
      this.failCommunication(new Error(\`Uncorrelated daemon navigation worker response: \${key}\`));
      return;
    }
    this.pending.delete(key);
    this.completed.add(key);
    if (response.kind === "failed") {
      pending.reject(new Error(\`Daemon navigation worker \${response.failureCode} failure\`));
      return;
    }
    if (response.kind === "closed") this.closeAcknowledged = true;
    pending.resolve(response);
  }

  private async receiveOutputChunk(
    response: Extract<DaemonNavigationWorkerResponse, { kind: "output-chunk" }>,
  ): Promise<void> {
    const key = \`execute:\${response.requestId}\`;
    const pending = this.pending.get(key);
    if (
      pending === undefined ||
      pending.chunkInFlight ||
      response.sequence !== pending.nextSequence
    ) {
      this.failCommunication(new Error(\`Unexpected daemon navigation worker output: \${key}\`));
      return;
    }
    pending.chunkInFlight = true;
    try {
      const record: CommandOutputRecord = {
        sequence: response.sequence,
        stream: response.stream,
        bytes: response.bytes,
      };
      await pending.appendOutput(record);
      pending.nextSequence += 1;
      pending.chunkInFlight = false;
      const acknowledgement: DaemonNavigationWorkerRequest = {
        kind: "output-ack",
        generation: this.generation,
        requestId: response.requestId,
        sequence: response.sequence,
      };
      this.worker.postMessage(DaemonNavigationWorkerProtocol.request(acknowledgement));
    } catch (error) {
      this.failCommunication(error);
    }
  }

  private failCommunication(error: unknown): void {
    if (this.exit !== undefined) return;
    const failure = error instanceof Error ? error : new Error(String(error));
    this.communicationFailure = failure;
    this.communicationFailureCode =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined;
    void this.worker.terminate();
  }

  private finishExit(): void {
    if (this.exit !== undefined) return;
    const communicationErrorName = this.communicationFailure?.name;
    const communicationFailureIdentity = this.communicationFailureCode ?? communicationErrorName;
    const cause = communicationFailureIdentity
      ? communicationFailureIdentity === "ERR_WORKER_OUT_OF_MEMORY"
        ? "out-of-memory"
        : "error"
      : this.terminating
        ? "terminated"
        : this.closeAcknowledged
          ? "closed"
          : "error";
    this.exit = {
      generation: this.generation,
      cause,
      ...(communicationFailureIdentity === undefined
        ? {}
        : { errorName: communicationFailureIdentity }),
    };
    const failure = new DaemonNavigationWorkerExitedError(
      this.exit,
      this.communicationFailure?.message,
    );
    for (const pending of this.pending.values()) pending.reject(failure);
    this.pending.clear();
    this.resolveExited(this.exit);
  }

  private static responseKey(response: DaemonNavigationWorkerResponse): string {
    if (response.kind === "ready") return "initialize";
    if (response.kind === "result") return \`execute:\${response.requestId}\`;
    if (response.kind === "heap") return \`release-transient:\${response.operationId}\`;
    if (response.kind === "closed") return "close";
    if (response.kind === "failed" && response.operationId !== undefined) {
      return \`release-transient:\${response.operationId}\`;
    }
    return response.requestId === undefined ? "initialize" : \`execute:\${response.requestId}\`;
  }
}
`},"base:apps/cli/src/daemon/daemon-navigation-worker.ts":{path:"apps/cli/src/daemon/daemon-navigation-worker.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"a6a9f318fa458c93974963d2645a8746363f667397cc3c0f5f1708f4ea73ce1c",text:`import { Worker } from "node:worker_threads";
import type { DaemonPolicy } from "@symnav/daemon";
import type { CliExecutionRequest, CommandOutputRecord } from "../command-execution-result.js";
import {
  DaemonNavigationWorkerProtocol,
  type DaemonNavigationWorkerRequest,
  type DaemonNavigationWorkerResponse,
} from "./daemon-navigation-worker-protocol.js";

export interface DaemonNavigationWorkerExit {
  readonly generation: number;
  readonly cause: "closed" | "terminated" | "out-of-memory" | "error";
  readonly errorName?: string;
}

export class DaemonNavigationWorkerExitedError extends Error {
  constructor(
    readonly exit: DaemonNavigationWorkerExit,
    message = \`Daemon navigation worker exited (\${exit.cause})\`,
  ) {
    super(message);
    this.name = "DaemonNavigationWorkerExitedError";
  }
}

export interface DaemonNavigationWorker {
  readonly generation: number;
  readonly exited: Promise<DaemonNavigationWorkerExit>;
  start(workspaceRoot: string): Promise<DaemonNavigationWorkerResponse>;
  execute(
    requestId: string,
    request: CliExecutionRequest,
    output: { append(record: CommandOutputRecord): Promise<void> },
  ): Promise<DaemonNavigationWorkerResponse>;
  releaseTransientResources(): Promise<DaemonNavigationWorkerResponse>;
  drainAndClose(): Promise<void>;
  terminate(): Promise<void>;
}

export interface DaemonNavigationWorkerConfiguration {
  readonly stateDirectory: string;
  readonly policy: ReturnType<DaemonPolicy["toSerialized"]>;
}

export interface NodeDaemonNavigationWorkerOptions {
  readonly generation: number;
  readonly configuration: DaemonNavigationWorkerConfiguration;
  readonly resourceLimits: {
    readonly maxOldGenerationSizeMb: number;
  };
  readonly entryUrl?: URL;
  readonly workerData?: Readonly<Record<string, unknown>>;
}

interface PendingWorkerResponse {
  readonly resolve: (response: DaemonNavigationWorkerResponse) => void;
  readonly reject: (error: Error) => void;
  readonly appendOutput: (record: CommandOutputRecord) => Promise<void>;
  nextSequence: number;
  chunkInFlight: boolean;
}

export class NodeDaemonNavigationWorker implements DaemonNavigationWorker {
  readonly generation: number;
  readonly exited: Promise<DaemonNavigationWorkerExit>;
  private readonly worker: Worker;
  private readonly pending = new Map<string, PendingWorkerResponse>();
  private readonly completed = new Set<string>();
  private resolveExited!: (exit: DaemonNavigationWorkerExit) => void;
  private exit: DaemonNavigationWorkerExit | undefined;
  private terminating = false;
  private closeAcknowledged = false;
  private communicationFailure: Error | undefined;
  private communicationFailureCode: string | undefined;
  private releaseSequence = 0;

  constructor(options: NodeDaemonNavigationWorkerOptions) {
    this.generation = options.generation;
    this.exited = new Promise((resolve) => {
      this.resolveExited = resolve;
    });
    this.worker = new Worker(
      options.entryUrl ?? new URL("./daemon-navigation-worker-entry.js", import.meta.url),
      {
        workerData: {
          stateDirectory: options.configuration.stateDirectory,
          generation: options.generation,
          policy: options.configuration.policy,
          ...options.workerData,
        },
        resourceLimits: options.resourceLimits,
      },
    );
    this.worker.on("message", (value: unknown) => void this.receive(value));
    this.worker.once("error", (error) => this.failCommunication(error));
    this.worker.once("exit", () => this.finishExit());
  }

  start(workspaceRoot: string): Promise<DaemonNavigationWorkerResponse> {
    return this.send("initialize", {
      kind: "initialize",
      generation: this.generation,
      workspaceRoot,
    });
  }

  execute(
    requestId: string,
    request: CliExecutionRequest,
    output: { append(record: CommandOutputRecord): Promise<void> },
  ): Promise<DaemonNavigationWorkerResponse> {
    return this.send(
      \`execute:\${requestId}\`,
      {
        kind: "execute",
        generation: this.generation,
        requestId,
        request,
      },
      output.append.bind(output),
    );
  }

  releaseTransientResources(): Promise<DaemonNavigationWorkerResponse> {
    const operationId = \`\${this.generation}:\${this.releaseSequence}\`;
    this.releaseSequence += 1;
    return this.send(\`release-transient:\${operationId}\`, {
      kind: "release-transient",
      generation: this.generation,
      operationId,
    });
  }

  async drainAndClose(): Promise<void> {
    if (this.exit !== undefined) return;
    await this.send("close", { kind: "close", generation: this.generation });
    await this.exited;
  }

  async terminate(): Promise<void> {
    if (this.exit !== undefined) return;
    this.terminating = true;
    await this.worker.terminate();
    await this.exited;
  }

  private send(
    key: string,
    request: DaemonNavigationWorkerRequest,
    appendOutput: ((record: CommandOutputRecord) => Promise<void>) | undefined = undefined,
  ): Promise<DaemonNavigationWorkerResponse> {
    if (this.exit !== undefined)
      return Promise.reject(new Error("Daemon navigation worker exited"));
    if (this.pending.has(key) || this.completed.has(key)) {
      return Promise.reject(new Error(\`Duplicate daemon navigation worker request: \${key}\`));
    }
    const response = new Promise<DaemonNavigationWorkerResponse>((resolve, reject) => {
      this.pending.set(key, {
        resolve,
        reject,
        appendOutput:
          appendOutput ?? (() => Promise.reject(new Error("Worker output sink is unavailable"))),
        nextSequence: 0,
        chunkInFlight: false,
      });
    });
    this.worker.postMessage(DaemonNavigationWorkerProtocol.request(request));
    return response;
  }

  private async receive(value: unknown): Promise<void> {
    let response: DaemonNavigationWorkerResponse;
    try {
      response = DaemonNavigationWorkerProtocol.response(value);
    } catch (error) {
      this.failCommunication(error);
      return;
    }
    if (response.generation !== this.generation) return;
    if (response.kind === "output-chunk") {
      await this.receiveOutputChunk(response);
      return;
    }
    const key = NodeDaemonNavigationWorker.responseKey(response);
    if (this.completed.has(key)) {
      this.failCommunication(new Error(\`Duplicate daemon navigation worker response: \${key}\`));
      return;
    }
    const pending = this.pending.get(key);
    if (pending === undefined) {
      this.failCommunication(new Error(\`Uncorrelated daemon navigation worker response: \${key}\`));
      return;
    }
    this.pending.delete(key);
    this.completed.add(key);
    if (response.kind === "failed") {
      pending.reject(new Error(\`Daemon navigation worker \${response.failureCode} failure\`));
      return;
    }
    if (response.kind === "closed") this.closeAcknowledged = true;
    pending.resolve(response);
  }

  private async receiveOutputChunk(
    response: Extract<DaemonNavigationWorkerResponse, { kind: "output-chunk" }>,
  ): Promise<void> {
    const key = \`execute:\${response.requestId}\`;
    const pending = this.pending.get(key);
    if (
      pending === undefined ||
      pending.chunkInFlight ||
      response.sequence !== pending.nextSequence
    ) {
      this.failCommunication(new Error(\`Unexpected daemon navigation worker output: \${key}\`));
      return;
    }
    pending.chunkInFlight = true;
    try {
      const record: CommandOutputRecord = {
        sequence: response.sequence,
        stream: response.stream,
        bytes: response.bytes,
      };
      await pending.appendOutput(record);
      pending.nextSequence += 1;
      pending.chunkInFlight = false;
      const acknowledgement: DaemonNavigationWorkerRequest = {
        kind: "output-ack",
        generation: this.generation,
        requestId: response.requestId,
        sequence: response.sequence,
      };
      this.worker.postMessage(DaemonNavigationWorkerProtocol.request(acknowledgement));
    } catch (error) {
      this.failCommunication(error);
    }
  }

  private failCommunication(error: unknown): void {
    if (this.exit !== undefined) return;
    const failure = error instanceof Error ? error : new Error(String(error));
    this.communicationFailure = failure;
    this.communicationFailureCode =
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      typeof error.code === "string"
        ? error.code
        : undefined;
    void this.worker.terminate();
  }

  private finishExit(): void {
    if (this.exit !== undefined) return;
    const communicationErrorName = this.communicationFailure?.name;
    const communicationFailureIdentity = this.communicationFailureCode ?? communicationErrorName;
    const cause = communicationFailureIdentity
      ? communicationFailureIdentity === "ERR_WORKER_OUT_OF_MEMORY"
        ? "out-of-memory"
        : "error"
      : this.terminating
        ? "terminated"
        : this.closeAcknowledged
          ? "closed"
          : "error";
    this.exit = {
      generation: this.generation,
      cause,
      ...(communicationFailureIdentity === undefined
        ? {}
        : { errorName: communicationFailureIdentity }),
    };
    const failure = new DaemonNavigationWorkerExitedError(
      this.exit,
      this.communicationFailure?.message,
    );
    for (const pending of this.pending.values()) pending.reject(failure);
    this.pending.clear();
    this.resolveExited(this.exit);
  }

  private static responseKey(response: DaemonNavigationWorkerResponse): string {
    if (response.kind === "ready") return "initialize";
    if (response.kind === "result") return \`execute:\${response.requestId}\`;
    if (response.kind === "heap") return \`release-transient:\${response.operationId}\`;
    if (response.kind === "closed") return "close";
    if (response.kind === "failed" && response.operationId !== undefined) {
      return \`release-transient:\${response.operationId}\`;
    }
    return response.requestId === undefined ? "initialize" : \`execute:\${response.requestId}\`;
  }
}
`},"head:apps/cli/src/daemon/daemon-navigation-worker-protocol.ts":{path:"apps/cli/src/daemon/daemon-navigation-worker-protocol.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"bea233131c248e348b2383b6e8c650ed617b962922846f2bdfbcc3779f55c67a",text:`import type { BackendRefreshSummary } from "@symnav/core";
import type { CliExecutionRequest, CommandOutputStream } from "../command-execution-result.js";

export type DaemonExecutionFailureCode = "initialization" | "execution" | "protocol" | "resource";

export interface WorkerStartupDurations {
  readonly discoveryMs: number;
  readonly indexingMs: number;
  readonly totalMs: number;
}

export interface WorkerCommandDurations {
  readonly freshnessMs: number;
  readonly navigationMs: number;
  readonly renderMs: number;
  readonly outputMs: number;
}

export type DaemonNavigationWorkerRequest =
  | { readonly kind: "initialize"; readonly generation: number; readonly workspaceRoot: string }
  | {
      readonly kind: "execute";
      readonly generation: number;
      readonly requestId: string;
      readonly request: CliExecutionRequest;
    }
  | {
      readonly kind: "output-ack";
      readonly generation: number;
      readonly requestId: string;
      readonly sequence: number;
    }
  | {
      readonly kind: "release-transient";
      readonly generation: number;
      readonly operationId: string;
    }
  | { readonly kind: "close"; readonly generation: number };

export type DaemonNavigationWorkerResponse =
  | {
      readonly kind: "output-chunk";
      readonly generation: number;
      readonly requestId: string;
      readonly sequence: number;
      readonly stream: CommandOutputStream;
      readonly bytes: Uint8Array;
    }
  | {
      readonly kind: "ready";
      readonly generation: number;
      readonly fileCount: number;
      readonly refresh: BackendRefreshSummary;
      readonly startupDurations: WorkerStartupDurations;
    }
  | {
      readonly kind: "result";
      readonly generation: number;
      readonly requestId: string;
      readonly result: { readonly exitCode: number };
      readonly refresh: BackendRefreshSummary;
      readonly durations: WorkerCommandDurations;
      readonly resources: {
        readonly workerHeapUsedBytes: number;
        readonly peakWorkerHeapUsedBytes: number;
        readonly workerHeapLimitBytes: number;
      };
    }
  | {
      readonly kind: "failed";
      readonly generation: number;
      readonly requestId?: string;
      readonly failureCode: DaemonExecutionFailureCode;
      readonly errorName?: string;
      readonly operationId?: string;
    }
  | {
      readonly kind: "heap";
      readonly generation: number;
      readonly operationId: string;
      readonly usedHeapBytes: number;
      readonly heapLimitBytes: number;
    }
  | { readonly kind: "closed"; readonly generation: number };

export class DaemonNavigationWorkerProtocol {
  static request(value: unknown): DaemonNavigationWorkerRequest {
    if (!this.isRecord(value) || !this.isGeneration(value.generation)) {
      throw new Error("Invalid daemon navigation worker request");
    }
    if (
      value.kind === "initialize" &&
      this.hasKeys(value, ["kind", "generation", "workspaceRoot"]) &&
      this.isNonEmptyString(value.workspaceRoot)
    ) {
      return value as unknown as DaemonNavigationWorkerRequest;
    }
    if (
      value.kind === "execute" &&
      this.hasKeys(value, ["kind", "generation", "requestId", "request"]) &&
      this.isNonEmptyString(value.requestId) &&
      this.isExecutionRequest(value.request)
    ) {
      return value as unknown as DaemonNavigationWorkerRequest;
    }
    if (
      value.kind === "output-ack" &&
      this.hasKeys(value, ["kind", "generation", "requestId", "sequence"]) &&
      this.isNonEmptyString(value.requestId) &&
      this.isCount(value.sequence)
    ) {
      return value as unknown as DaemonNavigationWorkerRequest;
    }
    if (
      value.kind === "release-transient" &&
      this.hasKeys(value, ["kind", "generation", "operationId"]) &&
      this.isNonEmptyString(value.operationId)
    ) {
      return value as unknown as DaemonNavigationWorkerRequest;
    }
    if (value.kind === "close" && this.hasKeys(value, ["kind", "generation"])) {
      return value as unknown as DaemonNavigationWorkerRequest;
    }
    throw new Error("Invalid daemon navigation worker request");
  }

  static response(value: unknown, maximumChunkRawBytes: number): DaemonNavigationWorkerResponse {
    if (!this.isRecord(value) || !this.isGeneration(value.generation)) {
      throw new Error("Invalid daemon navigation worker response");
    }
    if (
      value.kind === "ready" &&
      this.hasKeys(value, ["kind", "generation", "fileCount", "refresh", "startupDurations"]) &&
      this.isCount(value.fileCount) &&
      this.isRefresh(value.refresh) &&
      this.isDurations(value.startupDurations, ["discoveryMs", "indexingMs", "totalMs"])
    ) {
      return value as unknown as DaemonNavigationWorkerResponse;
    }
    if (
      value.kind === "output-chunk" &&
      this.hasKeys(value, ["kind", "generation", "requestId", "sequence", "stream", "bytes"]) &&
      this.isNonEmptyString(value.requestId) &&
      this.isCount(value.sequence) &&
      (value.stream === "stdout" || value.stream === "stderr") &&
      value.bytes instanceof Uint8Array &&
      value.bytes.byteLength <= maximumChunkRawBytes
    ) {
      return value as unknown as DaemonNavigationWorkerResponse;
    }
    if (
      value.kind === "result" &&
      this.hasKeys(value, [
        "kind",
        "generation",
        "requestId",
        "result",
        "refresh",
        "durations",
        "resources",
      ]) &&
      this.isNonEmptyString(value.requestId) &&
      this.isExecutionResult(value.result) &&
      this.isRefresh(value.refresh) &&
      this.isDurations(value.durations, ["freshnessMs", "navigationMs", "renderMs", "outputMs"]) &&
      this.isWorkerResources(value.resources)
    ) {
      return value as unknown as DaemonNavigationWorkerResponse;
    }
    if (value.kind === "failed" && this.isFailed(value)) {
      return value as unknown as DaemonNavigationWorkerResponse;
    }
    if (
      value.kind === "heap" &&
      this.hasKeys(value, [
        "kind",
        "generation",
        "operationId",
        "usedHeapBytes",
        "heapLimitBytes",
      ]) &&
      this.isNonEmptyString(value.operationId) &&
      this.isCount(value.usedHeapBytes) &&
      this.isCount(value.heapLimitBytes)
    ) {
      return value as unknown as DaemonNavigationWorkerResponse;
    }
    if (value.kind === "closed" && this.hasKeys(value, ["kind", "generation"])) {
      return value as unknown as DaemonNavigationWorkerResponse;
    }
    throw new Error("Invalid daemon navigation worker response");
  }

  private static isWorkerResources(value: unknown): boolean {
    return (
      this.isRecord(value) &&
      this.hasKeys(value, [
        "workerHeapUsedBytes",
        "peakWorkerHeapUsedBytes",
        "workerHeapLimitBytes",
      ]) &&
      this.isCount(value.workerHeapUsedBytes) &&
      this.isCount(value.peakWorkerHeapUsedBytes) &&
      this.isCount(value.workerHeapLimitBytes) &&
      value.peakWorkerHeapUsedBytes >= value.workerHeapUsedBytes
    );
  }

  private static isExecutionRequest(value: unknown): value is CliExecutionRequest {
    if (!this.isRecord(value)) return false;
    const keys = ["argv", "cwd", "telemetryEnabled"];
    if (value.executionMode !== undefined) keys.push("executionMode");
    return (
      this.hasKeys(value, keys) &&
      Array.isArray(value.argv) &&
      value.argv.every((argument) => typeof argument === "string") &&
      typeof value.cwd === "string" &&
      typeof value.telemetryEnabled === "boolean" &&
      (value.executionMode === undefined ||
        value.executionMode === "cold" ||
        value.executionMode === "warm" ||
        value.executionMode === "fallback")
    );
  }

  private static isExecutionResult(value: unknown): value is { readonly exitCode: number } {
    return (
      this.isRecord(value) && this.hasKeys(value, ["exitCode"]) && this.isCount(value.exitCode)
    );
  }

  private static isRefresh(value: unknown): value is BackendRefreshSummary {
    return (
      this.isRecord(value) &&
      this.hasKeys(value, ["added", "changed", "removed", "unchanged"]) &&
      this.isCount(value.added) &&
      this.isCount(value.changed) &&
      this.isCount(value.removed) &&
      this.isCount(value.unchanged)
    );
  }

  private static isFailed(value: Record<string, unknown>): boolean {
    const keys = ["kind", "generation", "failureCode"];
    if (value.requestId !== undefined) keys.push("requestId");
    if (value.operationId !== undefined) keys.push("operationId");
    if (value.errorName !== undefined) keys.push("errorName");
    return (
      this.hasKeys(value, keys) &&
      (value.requestId === undefined || this.isNonEmptyString(value.requestId)) &&
      (value.operationId === undefined || this.isNonEmptyString(value.operationId)) &&
      !(value.requestId !== undefined && value.operationId !== undefined) &&
      (value.failureCode === "initialization" ||
        value.failureCode === "execution" ||
        value.failureCode === "protocol" ||
        value.failureCode === "resource") &&
      (value.errorName === undefined || this.isNonEmptyString(value.errorName))
    );
  }

  private static isDurations(value: unknown, keys: readonly string[]): boolean {
    return (
      this.isRecord(value) &&
      this.hasKeys(value, keys) &&
      keys.every((key) => this.isMetric(value[key]))
    );
  }

  private static hasKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
    const actual = Object.keys(value).sort();
    return (
      actual.length === keys.length && actual.every((key, index) => key === [...keys].sort()[index])
    );
  }

  private static isGeneration(value: unknown): value is number {
    return Number.isSafeInteger(value) && Number(value) >= 0;
  }

  private static isCount(value: unknown): value is number {
    return Number.isSafeInteger(value) && Number(value) >= 0;
  }

  private static isMetric(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  }

  private static isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.length > 0;
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}
`},"head:apps/cli/src/daemon/daemon-navigation-worker-entry.ts":{path:"apps/cli/src/daemon/daemon-navigation-worker-entry.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"adb42baad23f2c536364315d2c2e95039c06d91235820469b95829ad4a577e4e",text:`import { performance } from "node:perf_hooks";
import { parentPort, workerData } from "node:worker_threads";
import { getHeapStatistics } from "node:v8";
import type { BackendRefreshSummary } from "@symnav/core";
import { DaemonPolicy } from "@symnav/daemon";
import type { CommandPhaseDurations } from "../program-dependencies.js";
import { createDefaultDependencies } from "../program.js";
import { RetainedWorkspaceProgram } from "./retained-workspace-program.js";
import {
  DaemonNavigationWorkerProtocol,
  type DaemonExecutionFailureCode,
  type DaemonNavigationWorkerRequest,
  type DaemonNavigationWorkerResponse,
} from "./daemon-navigation-worker-protocol.js";

interface NavigationWorkerData {
  readonly stateDirectory: string;
  readonly generation: number;
  readonly policy: ReturnType<DaemonPolicy["toSerialized"]>;
}

class DaemonNavigationWorkerEntry {
  private retainedProgram: RetainedWorkspaceProgram | undefined;
  private latestRefresh: BackendRefreshSummary = {
    added: 0,
    changed: 0,
    removed: 0,
    unchanged: 0,
  };
  private tail: Promise<void> = Promise.resolve();
  private readonly outputAcknowledgements = new Map<string, () => void>();
  private activeHeapMonitor: WorkerHeapHighWater | undefined;
  private readonly policy: DaemonPolicy;
  private commandDurations: CommandPhaseDurations = {
    freshnessMs: 0,
    navigationMs: 0,
    renderMs: 0,
  };

  constructor(
    private readonly port: NonNullable<typeof parentPort>,
    private readonly data: NavigationWorkerData,
  ) {
    this.policy = DaemonPolicy.fromSerialized(data.policy);
  }

  run(): void {
    this.port.on("message", (value: unknown) => {
      if (
        typeof value === "object" &&
        value !== null &&
        "kind" in value &&
        value.kind === "output-ack"
      ) {
        try {
          const request = DaemonNavigationWorkerProtocol.request(value);
          if (request.kind !== "output-ack") throw new Error("Invalid output acknowledgement");
          this.acknowledgeOutput(request.requestId, request.sequence);
          return;
        } catch (error) {
          this.fail("protocol", error);
          return;
        }
      }
      this.tail = this.tail.then(() => this.handle(value));
    });
  }

  private async handle(value: unknown): Promise<void> {
    let request: DaemonNavigationWorkerRequest;
    try {
      request = DaemonNavigationWorkerProtocol.request(value);
    } catch (error) {
      this.fail("protocol", error);
      return;
    }
    if (request.generation !== this.data.generation) return;
    if (request.kind === "initialize") {
      await this.initialize(request.workspaceRoot);
      return;
    }
    if (request.kind === "execute") {
      await this.execute(request);
      return;
    }
    if (request.kind === "release-transient") {
      await this.releaseTransientResources(request.operationId);
      return;
    }
    await this.close();
  }

  private async initialize(workspaceRoot: string): Promise<void> {
    const startedAt = performance.now();
    try {
      const dependencies = createDefaultDependencies(this.data.stateDirectory, this.policy);
      dependencies.commandPhasesObserved = (durations) => {
        this.commandDurations = durations;
        this.activeHeapMonitor?.sample();
      };
      this.retainedProgram = new RetainedWorkspaceProgram(dependencies, (refresh) => {
        this.latestRefresh = refresh;
      });
      const prepared = await this.retainedProgram.workspaceSession.prepare(workspaceRoot);
      this.latestRefresh = prepared.refresh;
      const totalMs = performance.now() - startedAt;
      this.send({
        kind: "ready",
        generation: this.data.generation,
        fileCount: prepared.refresh.added + prepared.refresh.unchanged,
        refresh: prepared.refresh,
        startupDurations: { discoveryMs: 0, indexingMs: totalMs, totalMs },
      });
    } catch (error) {
      this.fail("initialization", error);
    }
  }

  private async execute(request: Extract<DaemonNavigationWorkerRequest, { kind: "execute" }>) {
    const heapMonitor = new WorkerHeapHighWater(
      this.policy.values.resources.workerHeapSampleIntervalMs,
    );
    this.activeHeapMonitor = heapMonitor;
    this.commandDurations = { freshnessMs: 0, navigationMs: 0, renderMs: 0 };
    try {
      if (this.retainedProgram === undefined) throw new Error("Navigation worker is not ready");
      const result = await this.retainedProgram.execute(request.request);
      heapMonitor.sample();
      const outputStartedAt = performance.now();
      for await (const record of result.output?.records() ?? []) {
        await this.sendOutput(request.requestId, record);
        heapMonitor.sample();
      }
      await result.output?.dispose();
      const outputMs = performance.now() - outputStartedAt;
      const resources = heapMonitor.finish();
      this.send({
        kind: "result",
        generation: this.data.generation,
        requestId: request.requestId,
        result: { exitCode: result.exitCode },
        refresh: this.latestRefresh,
        durations: {
          ...this.commandDurations,
          outputMs,
        },
        resources,
      });
    } catch (error) {
      this.fail("execution", error, { requestId: request.requestId });
    } finally {
      heapMonitor.close();
      this.activeHeapMonitor = undefined;
    }
  }

  private async releaseTransientResources(operationId: string): Promise<void> {
    try {
      await this.retainedProgram?.workspaceSession.releaseTransientResources();
      const heap = getHeapStatistics();
      this.send({
        kind: "heap",
        generation: this.data.generation,
        operationId,
        usedHeapBytes: heap.used_heap_size,
        heapLimitBytes: heap.heap_size_limit,
      });
    } catch (error) {
      this.fail("resource", error, { operationId });
    }
  }

  private async close(): Promise<void> {
    await this.retainedProgram?.workspaceSession.releaseTransientResources();
    this.send({ kind: "closed", generation: this.data.generation });
    this.port.close();
  }

  private fail(
    failureCode: DaemonExecutionFailureCode,
    error: unknown,
    correlation:
      | { readonly requestId: string }
      | { readonly operationId: string }
      | undefined = undefined,
  ): void {
    this.send({
      kind: "failed",
      generation: this.data.generation,
      ...correlation,
      failureCode,
      ...(error instanceof Error ? { errorName: error.name } : {}),
    });
  }

  private send(response: DaemonNavigationWorkerResponse): void {
    const validated = DaemonNavigationWorkerProtocol.response(
      response,
      this.policy.values.output.maximumChunkRawBytes,
    );
    if (validated.kind === "output-chunk") {
      this.port.postMessage(validated, [validated.bytes.buffer as ArrayBuffer]);
      return;
    }
    this.port.postMessage(validated);
  }

  private sendOutput(
    requestId: string,
    record: import("../command-execution-result.js").CommandOutputRecord,
  ): Promise<void> {
    const key = \`\${requestId}:\${record.sequence}\`;
    if (this.outputAcknowledgements.has(key)) {
      return Promise.reject(new Error("Duplicate worker output sequence"));
    }
    const acknowledgement = new Promise<void>((resolve) => {
      this.outputAcknowledgements.set(key, resolve);
    });
    const bytes = Uint8Array.from(record.bytes);
    this.send({
      kind: "output-chunk",
      generation: this.data.generation,
      requestId,
      sequence: record.sequence,
      stream: record.stream,
      bytes,
    });
    return acknowledgement;
  }

  private acknowledgeOutput(requestId: string, sequence: number): void {
    const key = \`\${requestId}:\${sequence}\`;
    const resolve = this.outputAcknowledgements.get(key);
    if (resolve === undefined) throw new Error("Unexpected worker output acknowledgement");
    this.outputAcknowledgements.delete(key);
    resolve();
  }
}

class WorkerHeapHighWater {
  private currentUsedBytes = 0;
  private peakUsedBytes = 0;
  private heapLimitBytes = 0;
  private readonly timer: ReturnType<typeof setInterval>;

  constructor(sampleIntervalMs: number) {
    this.sample();
    this.timer = setInterval(() => this.sample(), sampleIntervalMs);
    this.timer.unref?.();
  }

  sample(): void {
    const heap = getHeapStatistics();
    this.currentUsedBytes = heap.used_heap_size;
    this.peakUsedBytes = Math.max(this.peakUsedBytes, this.currentUsedBytes);
    this.heapLimitBytes = heap.heap_size_limit;
  }

  finish(): {
    readonly workerHeapUsedBytes: number;
    readonly peakWorkerHeapUsedBytes: number;
    readonly workerHeapLimitBytes: number;
  } {
    this.sample();
    this.close();
    return {
      workerHeapUsedBytes: this.currentUsedBytes,
      peakWorkerHeapUsedBytes: this.peakUsedBytes,
      workerHeapLimitBytes: this.heapLimitBytes,
    };
  }

  close(): void {
    clearInterval(this.timer);
  }
}

if (parentPort === null) throw new Error("Daemon navigation worker requires a parent port");
const data = workerData as NavigationWorkerData;
new DaemonNavigationWorkerEntry(parentPort, data).run();
`},"head:apps/cli/src/daemon/daemon-controller.ts":{path:"apps/cli/src/daemon/daemon-controller.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"e040540328ca2cf9c00144bf80857fea340fcd5692a3cde36c6221e68806e65c",text:`import type { DaemonPolicyValues } from "@symnav/daemon";
import type {
  DaemonRecord,
  DaemonStartResult,
  DaemonStopResult,
  RunningDaemonStatus,
} from "./daemon-protocol.js";
import { DAEMON_PROTOCOL_VERSION } from "./daemon-protocol.js";
import {
  NodeDaemonProcessTerminator,
  type DaemonProcessTerminator,
  type DaemonProcessLauncher,
} from "./daemon-process-launcher.js";
import type { DaemonRegistry } from "./daemon-registry.js";
import { DaemonRecordObserver, type DaemonObservation } from "./daemon-record-observer.js";
import { DaemonStartupCoordinator } from "./daemon-startup-coordinator.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { LocalDaemonTransport } from "./local-daemon-transport.js";

interface DaemonControllerOptions {
  readonly policy: Pick<DaemonPolicyValues, "startup" | "shutdown">;
  readonly now?: () => number;
  readonly processTerminator?: DaemonProcessTerminator;
  readonly launcher?: DaemonProcessLauncher;
}

export class DaemonController {
  private readonly now: () => number;
  private readonly stopTimeoutMs: number;
  private readonly pollIntervalMs: number;
  private readonly processTerminator: DaemonProcessTerminator;
  private readonly launcher: DaemonProcessLauncher | undefined;
  private readonly observer: DaemonRecordObserver;
  private readonly policy: Pick<DaemonPolicyValues, "startup" | "shutdown">;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly transport: LocalDaemonTransport,
    private readonly stateDirectory: string,
    options: DaemonControllerOptions,
  ) {
    this.policy = options.policy;
    this.now = options.now ?? Date.now;
    this.stopTimeoutMs = this.policy.shutdown.stopTimeoutMs;
    this.pollIntervalMs = this.policy.shutdown.controllerPollIntervalMs;
    this.processTerminator =
      options.processTerminator ?? new NodeDaemonProcessTerminator(this.policy.shutdown);
    this.launcher = options.launcher;
    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator, this.now);
  }

  async start(workspaceRoot: string): Promise<DaemonStartResult> {
    if (this.launcher === undefined) throw new Error("Daemon controller has no process launcher");
    const identity = DaemonWorkspaceIdentity.from(workspaceRoot, this.stateDirectory);
    const coordinator = new DaemonStartupCoordinator(this.registry, this.launcher, this.transport, {
      policy: this.policy,
    });
    return coordinator.ensureRunning(identity);
  }

  async status(): Promise<readonly RunningDaemonStatus[]> {
    const statuses = await Promise.all(
      this.registry.list().map((record) => this.statusForRecord(record)),
    );
    return statuses
      .filter((status): status is RunningDaemonStatus => status !== undefined)
      .sort((left, right) => left.workspaceRoot.localeCompare(right.workspaceRoot));
  }

  async stop(workspaceRoot: string): Promise<DaemonStopResult> {
    const stopStartedAt = this.now();
    const deadline = stopStartedAt + this.stopTimeoutMs;
    const forceWaitMs = Math.min(
      this.policy.shutdown.forcedTerminationReserveMaximumMs,
      Math.floor(this.stopTimeoutMs / 2),
    );
    const gracefulDeadline = deadline - forceWaitMs;
    const identity = DaemonWorkspaceIdentity.from(workspaceRoot, this.stateDirectory);
    const record = this.registry.read(identity);
    if (record === undefined) {
      return { status: "not-running", workspaceRoot };
    }
    if (record.state === "starting") return this.stopStarting(identity, record, deadline);
    const observation = await this.observer.observeIdentity(record);
    if (observation.kind === "exited") {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return { status: "not-running", workspaceRoot };
    }
    if (observation.kind === "unresponsive" || observation.kind === "starting") {
      throw new Error(\`Daemon process \${record.pid} is live but unresponsive\`);
    }

    const stopRequest = this.transport
      .request(record.endpoint, {
        kind: "stop",
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        instanceId: record.instanceId,
      })
      .then(() => true)
      .catch(() => false);
    const acknowledged = await Promise.race([
      stopRequest,
      this.pause(Math.max(0, gracefulDeadline - this.now())).then(() => false),
    ]);
    if (acknowledged && (await this.waitForExit(record.pid, gracefulDeadline))) {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return { status: "stopped", workspaceRoot, pid: record.pid };
    }

    const killed = await this.killIdentified(record, deadline);
    if (!killed || !(await this.waitForIdentifiedExit(record, deadline))) {
      throw new Error(\`Daemon process \${record.pid} did not exit after authenticated kill\`);
    }
    this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
    return { status: "killed", workspaceRoot, pid: record.pid };
  }

  private async statusForRecord(record: DaemonRecord): Promise<RunningDaemonStatus | undefined> {
    const identity = DaemonWorkspaceIdentity.from(record.workspaceRoot, this.stateDirectory);
    if (record.state === "starting") {
      if (record.pid > 0) {
        const observation = await this.observer.observe(record);
        if (observation.kind === "exited") {
          this.removeStartingOwnership(identity, record);
          return undefined;
        }
        if (observation.kind === "starting") return this.startingStatus(record);
        if (observation.kind === "responsive" && observation.pong.activity === undefined) {
          return this.startingStatus(record);
        }
        return this.statusForObservation(observation);
      }
      const owner = this.registry.startupOwner(identity);
      const armedLaunchIsWithinGrace =
        owner?.instanceId === record.instanceId &&
        owner.processToken === record.processToken &&
        this.registry.startupOwnerIsWithinGrace(owner);
      if (
        armedLaunchIsWithinGrace ||
        (owner?.instanceId === record.instanceId &&
          this.processTerminator.isAlive(owner.ownerPid) &&
          this.registry.startupOwnerIsWithinGrace(owner))
      ) {
        return this.startingStatus(record);
      }
      if (owner?.instanceId === record.instanceId) {
        if (!this.registry.removeStartupLockIfOwner(identity, owner)) {
          const renewedOwner = this.registry.startupOwner(identity);
          if (
            renewedOwner?.instanceId === record.instanceId &&
            this.processTerminator.isAlive(renewedOwner.ownerPid) &&
            this.registry.startupOwnerIsWithinGrace(renewedOwner)
          ) {
            return this.startingStatus(record);
          }
          return undefined;
        }
      }
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return undefined;
    }

    return this.statusForObservation(await this.observer.observe(record));
  }

  private async stopStarting(
    identity: DaemonWorkspaceIdentity,
    record: DaemonRecord,
    deadline: number,
  ): Promise<DaemonStopResult> {
    const owner = this.registry.startupOwner(identity);
    if (record.pid <= 0) {
      if (owner?.processToken === record.processToken) {
        return this.waitForClaimedProcessAndStop(identity, record, deadline);
      }
      if (owner?.instanceId === record.instanceId)
        this.registry.removeStartupLockIfOwner(identity, owner);
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return { status: "not-running", workspaceRoot: record.workspaceRoot };
    }

    if (!this.processTerminator.isAlive(record.pid)) {
      this.removeStartingOwnership(identity, record);
      return { status: "not-running", workspaceRoot: record.workspaceRoot };
    }
    if (!this.registry.startupOwnerMatchesProcess(identity, record)) {
      throw new Error(\`Daemon process \${record.pid} has no authenticated startup ownership\`);
    }
    const terminated = await this.terminateStartingProcess(record.pid, deadline);
    if (!terminated || this.processTerminator.isAlive(record.pid)) {
      throw new Error(\`Daemon process \${record.pid} did not exit after authenticated stop\`);
    }
    this.registry.removeStartupLockIfProcess(identity, record);
    this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
    return { status: "stopped", workspaceRoot: record.workspaceRoot, pid: record.pid };
  }

  private async waitForClaimedProcessAndStop(
    identity: DaemonWorkspaceIdentity,
    claimedRecord: DaemonRecord,
    deadline: number,
  ): Promise<DaemonStopResult> {
    while (this.now() <= deadline) {
      const record = this.registry.readStoredInstance(identity, claimedRecord.instanceId);
      if (record === undefined || record.processToken !== claimedRecord.processToken) {
        return { status: "not-running", workspaceRoot: claimedRecord.workspaceRoot };
      }
      if (record.pid > 0) return this.stopStarting(identity, record, deadline);
      const owner = this.registry.startupOwner(identity);
      if (
        owner?.instanceId !== claimedRecord.instanceId ||
        owner.processToken !== claimedRecord.processToken
      ) {
        return { status: "not-running", workspaceRoot: claimedRecord.workspaceRoot };
      }
      await this.pause(this.pollIntervalMs);
    }
    throw new Error("Daemon launch did not publish its process before authenticated stop");
  }

  private async terminateStartingProcess(pid: number, deadline: number): Promise<boolean> {
    let timeout: NodeJS.Timeout | undefined;
    const deadlineReached = new Promise<false>((resolve) => {
      timeout = setTimeout(() => resolve(false), Math.max(0, deadline - this.now()));
    });
    try {
      return await Promise.race([
        this.processTerminator.terminate(pid).then(() => true),
        deadlineReached,
      ]);
    } finally {
      if (timeout !== undefined) clearTimeout(timeout);
    }
  }

  private removeStartingOwnership(identity: DaemonWorkspaceIdentity, record: DaemonRecord): void {
    const storedRecord = this.registry.readStoredInstance(identity, record.instanceId);
    if (
      storedRecord?.processToken !== record.processToken ||
      storedRecord.pid !== record.pid ||
      storedRecord.startedAt !== record.startedAt
    ) {
      return;
    }
    const owner = this.registry.startupOwner(identity);
    if (this.registry.startupOwnerMatchesProcess(identity, record)) {
      this.registry.removeStartupLockIfProcess(identity, record);
    } else if (owner?.instanceId === record.instanceId && owner.processToken === undefined) {
      this.registry.removeStartupLockIfOwner(identity, owner);
    }
    this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
  }

  private startingStatus(record: DaemonRecord): RunningDaemonStatus {
    return {
      workspaceRoot: record.workspaceRoot,
      state: "starting",
      pid: record.pid,
      startupElapsedMs: Math.max(0, this.now() - record.startedAt),
      ...(record.memoryBytes === undefined ? {} : { memoryBytes: record.memoryBytes }),
    };
  }

  private statusForObservation(observation: DaemonObservation): RunningDaemonStatus | undefined {
    const record = observation.record;
    if (observation.kind === "exited") {
      const identity = DaemonWorkspaceIdentity.from(record.workspaceRoot, this.stateDirectory);
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return undefined;
    }
    if (observation.kind !== "responsive") return this.unresponsiveStatus(record);
    if (observation.pong.activity !== undefined) {
      return this.statusFromActivity(record, observation.pong.activity);
    }
    const lastNavigationAt = observation.pong.lastNavigationAt ?? record.lastNavigationAt;
    const fileCount = observation.pong.fileCount ?? record.fileCount;
    const memoryBytes = observation.pong.memoryBytes ?? record.memoryBytes;
    if (observation.pong.state === "busy") {
      if (
        observation.pong.currentCommand === undefined ||
        observation.pong.currentCommandElapsedMs === undefined ||
        observation.pong.queued === undefined ||
        memoryBytes === undefined
      ) {
        return this.unresponsiveStatus(record);
      }
      return {
        workspaceRoot: record.workspaceRoot,
        state: "busy",
        pid: record.pid,
        uptimeMs: Math.max(0, this.now() - record.startedAt),
        command: DaemonController.commandName(observation.pong.currentCommand),
        elapsedMs: observation.pong.currentCommandElapsedMs,
        queued: observation.pong.queued,
        memoryBytes,
      };
    }
    if (fileCount === undefined || memoryBytes === undefined) {
      return this.unresponsiveStatus(record);
    }
    return {
      workspaceRoot: record.workspaceRoot,
      state: "ready",
      pid: record.pid,
      uptimeMs: Math.max(0, this.now() - record.startedAt),
      fileCount,
      memoryBytes,
      ...(lastNavigationAt === undefined
        ? {}
        : { lastRequestAgoMs: Math.max(0, this.now() - lastNavigationAt) }),
    };
  }

  private unresponsiveStatus(record: DaemonRecord): RunningDaemonStatus {
    return {
      workspaceRoot: record.workspaceRoot,
      state: "unresponsive",
      pid: record.pid,
      uptimeMs: Math.max(0, this.now() - record.startedAt),
    };
  }

  private statusFromActivity(
    record: DaemonRecord,
    activity: import("./daemon-protocol.js").DaemonActivitySnapshot,
  ): RunningDaemonStatus {
    if (activity.lifecycle === "starting") {
      return {
        state: "starting",
        workspaceRoot: record.workspaceRoot,
        pid: record.pid,
        startupElapsedMs: activity.startupElapsedMs,
        memoryBytes: activity.processRssBytes,
      };
    }
    const uptimeMs = activity.startupElapsedMs;
    if (activity.lifecycle === "busy" && activity.current !== undefined) {
      return {
        state: "busy",
        workspaceRoot: record.workspaceRoot,
        pid: record.pid,
        uptimeMs,
        command: activity.current.command,
        elapsedMs: activity.current.elapsedMs,
        queued: activity.queued,
        memoryBytes: activity.processRssBytes,
      };
    }
    if (activity.lifecycle === "recovering" || activity.lifecycle === "draining") {
      const detail = activity.lifecycle === "draining" ? "draining" : activity.recoveryDetail;
      if (detail === undefined) return this.unresponsiveStatus(record);
      return {
        state: "recovering",
        workspaceRoot: record.workspaceRoot,
        pid: record.pid,
        uptimeMs,
        detail,
        queued: activity.queued,
        memoryBytes: activity.processRssBytes,
      };
    }
    if (activity.fileCount === undefined) return this.unresponsiveStatus(record);
    return {
      state: "ready",
      workspaceRoot: record.workspaceRoot,
      pid: record.pid,
      uptimeMs,
      fileCount: activity.fileCount,
      memoryBytes: activity.processRssBytes,
      ...(activity.lastCompletedAgoMs === undefined
        ? {}
        : { lastRequestAgoMs: activity.lastCompletedAgoMs }),
    };
  }

  private static commandName(command: string): import("./daemon-protocol.js").DaemonCommandName {
    const names: readonly import("./daemon-protocol.js").DaemonCommandName[] = [
      "overview",
      "resolve",
      "def",
      "refs",
      "context",
      "graph",
      "stats",
      "help",
      "version",
      "unknown",
    ];
    return names.includes(command as import("./daemon-protocol.js").DaemonCommandName)
      ? (command as import("./daemon-protocol.js").DaemonCommandName)
      : "unknown";
  }

  private async killIdentified(record: DaemonRecord, deadline: number): Promise<boolean> {
    try {
      const response = await Promise.race([
        this.transport.request(record.endpoint, {
          kind: "kill",
          instanceId: record.instanceId,
          processToken: record.processToken,
        }),
        this.pause(Math.max(0, deadline - this.now())).then(() => undefined),
      ]);
      return response?.kind === "killing";
    } catch {
      return false;
    }
  }

  private async waitForIdentifiedExit(record: DaemonRecord, deadline: number): Promise<boolean> {
    while (this.now() <= deadline) {
      if (!(await this.identifies(record)) && !this.processTerminator.isAlive(record.pid)) {
        return true;
      }
      await this.pause(this.pollIntervalMs);
    }
    return !(await this.identifies(record)) && !this.processTerminator.isAlive(record.pid);
  }

  private async identifies(record: DaemonRecord): Promise<boolean> {
    try {
      const response = await this.transport.request(record.endpoint, {
        kind: "identify",
        instanceId: record.instanceId,
        processToken: record.processToken,
      });
      return (
        response.kind === "identity" &&
        response.pid === record.pid &&
        response.startedAt === record.startedAt
      );
    } catch {
      return false;
    }
  }

  private async waitForExit(pid: number, deadline: number): Promise<boolean> {
    while (this.now() <= deadline) {
      if (!this.processTerminator.isAlive(pid)) return true;
      await this.pause(this.pollIntervalMs);
    }
    return !this.processTerminator.isAlive(pid);
  }

  private pause(durationMs: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, durationMs));
  }
}
`},"head:apps/cli/src/daemon/daemon-process-launcher.ts":{path:"apps/cli/src/daemon/daemon-process-launcher.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"6ca7c07e1c9819b5d35bc87953bd4a0a0eea727db80afb4d2e392adbce339448",text:`import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
import type { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { DaemonIdentityCoordinates } from "./daemon-protocol.js";

interface DaemonProcessConfiguration extends DaemonIdentityCoordinates {
  readonly stateDirectory: string;
  readonly symnavVersion: string;
  readonly policy: ReturnType<DaemonPolicy["toSerialized"]>;
  readonly startupOwnerKind: "daemon";
}

export interface DaemonProcessExit {
  readonly code: number | null;
  readonly signal: NodeJS.Signals | null;
  readonly cause: "exit" | "spawn-error";
  readonly errorName?: string;
}

export interface DaemonProcess {
  readonly pid: number;
  readonly exited: Promise<DaemonProcessExit>;
  terminate(): Promise<void>;
}

export interface DaemonProcessTerminator {
  isAlive(pid: number): boolean;
  terminate(pid: number): Promise<void>;
}

export interface DaemonProcessLauncher {
  readonly symnavVersion: string;
  readonly memoryCapBytes: number;
  launch(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): Promise<DaemonProcess>;
}

export class DaemonProcessTerminationError extends Error {}

class SpawnedDaemonProcess implements DaemonProcess {
  constructor(
    readonly pid: number,
    readonly exited: Promise<DaemonProcessExit>,
    private readonly terminator: DaemonProcessTerminator,
  ) {}

  terminate(): Promise<void> {
    return this.terminator.terminate(this.pid);
  }
}

export class NodeDaemonProcessTerminator implements DaemonProcessTerminator {
  private readonly gracefulTimeoutMs: number;
  private readonly pollIntervalMs: number;

  constructor(policy: DaemonPolicyValues["shutdown"]) {
    this.gracefulTimeoutMs = policy.processSignalExitTimeoutMs;
    this.pollIntervalMs = policy.processExitPollIntervalMs;
  }

  isAlive(pid: number): boolean {
    if (!Number.isInteger(pid) || pid <= 0) return false;
    try {
      process.kill(pid, 0);
      return true;
    } catch (error) {
      return NodeDaemonProcessTerminator.errorCode(error) === "EPERM";
    }
  }

  async terminate(pid: number): Promise<void> {
    if (!this.isAlive(pid)) return;
    if (pid === process.pid) throw new Error("Refusing to terminate current process");
    this.signal(pid, "SIGTERM");
    if (await this.waitForExit(pid)) return;
    this.signal(pid, "SIGKILL");
    if (await this.waitForExit(pid)) return;
    throw new DaemonProcessTerminationError(\`Daemon process \${pid} did not terminate\`);
  }

  private signal(pid: number, signal: NodeJS.Signals): void {
    try {
      process.kill(pid, signal);
    } catch (error) {
      if (NodeDaemonProcessTerminator.errorCode(error) !== "ESRCH") throw error;
    }
  }

  private async waitForExit(pid: number): Promise<boolean> {
    const deadline = Date.now() + this.gracefulTimeoutMs;
    while (Date.now() <= deadline) {
      if (!this.isAlive(pid)) return true;
      await new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));
    }
    return !this.isAlive(pid);
  }

  private static errorCode(error: unknown): string | undefined {
    if (typeof error !== "object" || error === null) return undefined;
    return (error as { readonly code?: string }).code;
  }
}

export class NodeDaemonProcessLauncher implements DaemonProcessLauncher {
  private readonly terminator: DaemonProcessTerminator;

  constructor(
    readonly symnavVersion: string,
    readonly policy: DaemonPolicy,
    terminator: DaemonProcessTerminator = new NodeDaemonProcessTerminator(policy.values.shutdown),
  ) {
    this.terminator = terminator;
  }

  get memoryCapBytes(): number {
    return this.policy.values.resources.hardProcessRssBytes;
  }

  launch(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): Promise<DaemonProcess> {
    const stateDirectory = identity.stateDirectory;
    const configuration: DaemonProcessConfiguration = {
      workspaceRoot: identity.workspaceRoot,
      stateDirectory,
      workspaceKey: identity.workspaceKey,
      stateKey: identity.stateKey,
      identityKey: identity.identityKey,
      instanceId,
      processToken,
      endpoint: identity.endpoint(instanceId),
      symnavVersion: this.symnavVersion,
      policy: this.policy.toSerialized(),
      startupOwnerKind: "daemon",
    };
    const encodedConfiguration = Buffer.from(JSON.stringify(configuration)).toString("base64url");
    const daemonEntryPath = fileURLToPath(new URL("./daemon-entry.js", import.meta.url));
    mkdirSync(identity.identityDirectory, { recursive: true, mode: 0o700 });

    return new Promise((resolve, reject) => {
      let processSpawned = false;
      let exitResolved = false;
      let resolveExit: (exit: DaemonProcessExit) => void = () => undefined;
      const exited = new Promise<DaemonProcessExit>((exitResolve) => {
        resolveExit = exitResolve;
      });
      const settleExit = (exit: DaemonProcessExit): void => {
        if (exitResolved) return;
        exitResolved = true;
        resolveExit(exit);
      };
      const child = spawn(process.execPath, [daemonEntryPath, encodedConfiguration], {
        cwd: tmpdir(),
        detached: true,
        stdio: ["ignore", "ignore", "ignore"],
        env: { ...process.env, SYMNAV_STATE_DIR: stateDirectory },
      });
      child.once("error", (error) => {
        settleExit({
          code: null,
          signal: null,
          cause: "spawn-error",
          errorName: error.name,
        });
        if (!processSpawned) reject(error);
      });
      child.once("spawn", () => {
        processSpawned = true;
        child.unref();
        resolve(new SpawnedDaemonProcess(child.pid!, exited, this.terminator));
      });
      child.once("exit", (code, signal) => {
        settleExit({ code, signal, cause: "exit" });
      });
    });
  }
}

export class DaemonProcessConfigurationParser {
  static parse(encoded: string | undefined): DaemonProcessConfiguration {
    if (encoded === undefined) throw new Error("Missing daemon process configuration");
    const value: unknown = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (!DaemonProcessConfigurationParser.isConfiguration(value)) {
      throw new Error("Invalid daemon process configuration");
    }
    return value;
  }

  private static isConfiguration(value: unknown): value is DaemonProcessConfiguration {
    if (typeof value !== "object" || value === null) return false;
    const configuration = value as Record<string, unknown>;
    return (
      typeof configuration.workspaceRoot === "string" &&
      typeof configuration.stateDirectory === "string" &&
      typeof configuration.workspaceKey === "string" &&
      typeof configuration.stateKey === "string" &&
      typeof configuration.identityKey === "string" &&
      typeof configuration.instanceId === "string" &&
      typeof configuration.processToken === "string" &&
      typeof configuration.endpoint === "string" &&
      typeof configuration.symnavVersion === "string" &&
      DaemonProcessConfigurationParser.isPolicy(configuration.policy) &&
      configuration.startupOwnerKind === "daemon"
    );
  }

  private static isPolicy(value: unknown): value is ReturnType<DaemonPolicy["toSerialized"]> {
    try {
      DaemonPolicy.fromSerialized(value);
      return true;
    } catch {
      return false;
    }
  }
}
`},"head:apps/cli/src/daemon/daemon-registry.ts":{path:"apps/cli/src/daemon/daemon-registry.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"dc0570710cab972de07f348d2c2766064f30c23b9b85079e5e1669b9319cf2da",text:`import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import type { DaemonPolicyValues } from "@symnav/daemon";
import {
  DAEMON_PROTOCOL_VERSION,
  DAEMON_RECORD_SCHEMA_VERSION,
  type DaemonRecord,
} from "./daemon-protocol.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";

export interface DaemonStartupOwner {
  readonly identityKey: string;
  readonly instanceId: string;
  readonly processToken: string;
  readonly ownerPid: number;
  readonly ownerKind: "launcher" | "daemon";
  readonly heartbeatAt: number;
  readonly acquiredAt: number;
  readonly revision: string;
}

export type StartupOwner = DaemonStartupOwner;

export interface DaemonStartupLease {
  readonly owner: DaemonStartupOwner;
  readonly instanceId: string;
  transferToDaemon(pid: number, processToken: string): boolean;
  heartbeat(): boolean;
  release(): boolean;
}

export type StartupLease = DaemonStartupLease;

interface StartupMutationOwner {
  readonly ownerPid: number;
  readonly acquiredAt: number;
  readonly token: string;
}

class RegistryStartupMutationLease {
  private released = false;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly identity: DaemonWorkspaceIdentity,
    private readonly owner: StartupMutationOwner,
  ) {}

  isOwned(): boolean {
    return this.registry.isStartupMutationOwner(this.identity, this.owner);
  }

  release(): void {
    if (this.released) return;
    this.released = true;
    this.registry.releaseStartupMutation(this.identity, this.owner);
  }
}

class RegistryStartupLease implements StartupLease {
  private released = false;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly identity: DaemonWorkspaceIdentity,
    private currentOwner: StartupOwner,
  ) {}

  get owner(): StartupOwner {
    return this.currentOwner;
  }

  get instanceId(): string {
    return this.currentOwner.instanceId;
  }

  transferToDaemon(pid: number, processToken: string): boolean {
    if (this.released) return false;
    return this.registry.transferStartupToDaemon(
      this.identity,
      this.currentOwner,
      pid,
      processToken,
    );
  }

  heartbeat(): boolean {
    if (this.released) return false;
    const renewedOwner = this.registry.heartbeatStartupOwner(this.identity, this.currentOwner);
    if (renewedOwner === undefined) return false;
    this.currentOwner = renewedOwner;
    return true;
  }

  release(): boolean {
    if (this.released) return false;
    this.released = true;
    return this.registry.removeStartupLockIfOwner(this.identity, this.currentOwner);
  }
}

export class DaemonRegistry {
  private readonly platform: NodeJS.Platform;
  private readonly renamePath: typeof renameSync;
  private readonly startupPolicy: DaemonPolicyValues["startup"];

  constructor(
    private readonly registryDirectory: string,
    startupPolicy: DaemonPolicyValues["startup"],
    platform: NodeJS.Platform = process.platform,
    renamePath: typeof renameSync = renameSync,
  ) {
    this.platform = platform;
    this.renamePath = renamePath;
    this.startupPolicy = startupPolicy;
  }

  read(identity: DaemonWorkspaceIdentity): DaemonRecord | undefined {
    return this.records(identity).find((record) => DaemonRegistry.isCurrentRecord(record));
  }

  readInstance(identity: DaemonWorkspaceIdentity, instanceId: string): DaemonRecord | undefined {
    const record = this.readStoredPath(identity.recordPath(instanceId));
    return record !== undefined &&
      DaemonRegistry.isCurrentRecord(record) &&
      DaemonRegistry.matchesIdentity(record, identity)
      ? record
      : undefined;
  }

  readStored(identity: DaemonWorkspaceIdentity): DaemonRecord | undefined {
    return this.records(identity)[0];
  }

  readStoredInstance(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
  ): DaemonRecord | undefined {
    const record = this.readStoredPath(identity.recordPath(instanceId));
    return record !== undefined && DaemonRegistry.matchesIdentity(record, identity)
      ? record
      : undefined;
  }

  write(record: DaemonRecord): void {
    const identity = DaemonWorkspaceIdentity.from(
      record.workspaceRoot,
      dirname(this.registryDirectory),
    );
    mkdirSync(identity.identityDirectory, { recursive: true, mode: 0o700 });
    const recordPath = identity.recordPath(record.instanceId);
    const temporaryPath = \`\${recordPath}.\${process.pid}.\${randomUUID()}.tmp\`;
    writeFileSync(temporaryPath, JSON.stringify(record), { encoding: "utf8", mode: 0o600 });
    renameSync(temporaryPath, recordPath);
  }

  writeIfStartupOwner(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {
    const owner = this.startupOwner(identity);
    if (
      owner?.identityKey !== identity.identityKey ||
      owner.instanceId !== record.instanceId ||
      owner.processToken !== record.processToken ||
      owner.ownerKind !== "daemon" ||
      owner.ownerPid !== record.pid
    ) {
      return false;
    }
    const current = this.readInstance(identity, record.instanceId);
    if (current?.state !== "starting") return false;
    this.write(record);
    if (DaemonRegistry.sameStartupOwner(this.startupOwner(identity), owner)) return true;
    this.removeIfProcess(identity, record.instanceId, record.processToken);
    return false;
  }

  writeStartingIfStartupOwner(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {
    if (record.state !== "starting" || !this.isStartupOwner(identity, record.instanceId)) {
      return false;
    }
    const owner = this.startupOwner(identity);
    if (
      record.pid > 0 &&
      owner?.identityKey === identity.identityKey &&
      owner.instanceId === record.instanceId &&
      owner.processToken === record.processToken &&
      owner.ownerKind === "daemon" &&
      owner.ownerPid === record.pid
    ) {
      this.write(record);
      return DaemonRegistry.sameStartupOwner(this.startupOwner(identity), owner);
    }
    if (record.pid > 0) return this.writeClaimedStartingRecord(identity, record);
    this.write(record);
    if (this.isStartupOwner(identity, record.instanceId)) return true;
    this.removeIfProcess(identity, record.instanceId, record.processToken);
    return false;
  }

  armStartingProcessLaunch(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {
    if (record.state !== "starting" || record.pid !== 0) return false;
    return this.writeClaimedStartingRecord(identity, record);
  }

  private writeClaimedStartingRecord(
    identity: DaemonWorkspaceIdentity,
    record: DaemonRecord,
  ): boolean {
    const mutation = this.beginStartupMutation(identity);
    if (mutation === undefined) return false;
    try {
      const owner = this.startupOwner(identity);
      if (owner?.instanceId !== record.instanceId) return false;
      const adoptedOwner: StartupOwner = {
        ...owner,
        identityKey: identity.identityKey,
        ownerPid: record.pid > 0 ? record.pid : owner.ownerPid,
        processToken: record.processToken,
        ownerKind: record.pid > 0 ? "daemon" : "launcher",
        heartbeatAt: Date.now(),
        revision: randomUUID(),
      };
      const ownerPath = identity.startupOwnerPath(identity.lockPath);
      const temporaryPath = \`\${identity.lockPath}.\${process.pid}.\${randomUUID()}.owner.tmp\`;
      writeFileSync(temporaryPath, JSON.stringify(adoptedOwner), {
        encoding: "utf8",
        mode: 0o600,
      });
      if (
        !mutation.isOwned() ||
        !DaemonRegistry.sameStartupOwner(this.startupOwner(identity), owner)
      ) {
        rmSync(temporaryPath, { force: true });
        return false;
      }
      this.write(record);
      try {
        this.replaceStartupOwner(temporaryPath, ownerPath);
      } catch (error) {
        rmSync(temporaryPath, { force: true });
        if (DaemonRegistry.errorCode(error) === "ENOENT") return false;
        throw error;
      }
      const currentOwner = this.startupOwner(identity);
      return (
        currentOwner?.instanceId === record.instanceId &&
        currentOwner.ownerPid === adoptedOwner.ownerPid &&
        currentOwner.processToken === record.processToken
      );
    } finally {
      mutation.release();
    }
  }

  acquireStartup(
    identity: DaemonWorkspaceIdentity,
    candidate: Omit<DaemonStartupOwner, "acquiredAt" | "revision">,
  ): StartupLease | undefined;
  acquireStartup(identity: DaemonWorkspaceIdentity, instanceId: string): StartupLease | undefined;
  acquireStartup(
    identity: DaemonWorkspaceIdentity,
    candidate: Omit<DaemonStartupOwner, "acquiredAt" | "revision"> | string,
  ): StartupLease | undefined {
    mkdirSync(identity.identityDirectory, { recursive: true, mode: 0o700 });
    const acquiredAt = Date.now();
    const suppliedOwner =
      typeof candidate === "string"
        ? {
            identityKey: identity.identityKey,
            instanceId: candidate,
            processToken: "",
            ownerPid: process.pid,
            ownerKind: "launcher" as const,
            heartbeatAt: acquiredAt,
          }
        : candidate;
    if (
      suppliedOwner.identityKey !== identity.identityKey ||
      suppliedOwner.ownerKind !== "launcher"
    ) {
      return undefined;
    }
    const owner: StartupOwner = {
      ...suppliedOwner,
      acquiredAt,
      revision: randomUUID(),
    };
    const claimPath = identity.startupClaimPath(owner.instanceId);
    mkdirSync(claimPath, { mode: 0o700 });
    writeFileSync(identity.startupOwnerPath(claimPath), JSON.stringify(owner), {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    try {
      renameSync(claimPath, identity.lockPath);
      return new RegistryStartupLease(this, identity, owner);
    } catch (error) {
      rmSync(claimPath, { recursive: true, force: true });
      if (existsSync(identity.lockPath)) return undefined;
      throw error;
    }
  }

  claimStartupForDaemon(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
    pid: number,
  ): DaemonStartupLease | undefined {
    if (!Number.isInteger(pid) || pid <= 0) return undefined;
    const owner = this.startupOwner(identity);
    if (
      owner?.identityKey !== identity.identityKey ||
      owner.instanceId !== instanceId ||
      owner.processToken !== processToken
    ) {
      return undefined;
    }
    if (owner.ownerKind === "daemon") {
      return owner.ownerPid === pid ? new RegistryStartupLease(this, identity, owner) : undefined;
    }
    const daemonOwner = this.replaceStartupOwnerIfOwner(identity, owner, {
      ...owner,
      ownerPid: pid,
      ownerKind: "daemon",
      heartbeatAt: Date.now(),
      revision: randomUUID(),
    });
    return daemonOwner === undefined
      ? undefined
      : new RegistryStartupLease(this, identity, daemonOwner);
  }

  transferStartupToDaemon(
    identity: DaemonWorkspaceIdentity,
    launcherOwner: StartupOwner,
    pid: number,
    processToken: string,
  ): boolean {
    if (
      launcherOwner.ownerKind !== "launcher" ||
      launcherOwner.processToken !== processToken ||
      !Number.isInteger(pid) ||
      pid <= 0
    ) {
      return false;
    }
    return (
      this.replaceStartupOwnerIfOwner(identity, launcherOwner, {
        ...launcherOwner,
        ownerPid: pid,
        ownerKind: "daemon",
        heartbeatAt: Date.now(),
        revision: randomUUID(),
      }) !== undefined
    );
  }

  heartbeatStartupOwner(
    identity: DaemonWorkspaceIdentity,
    owner: StartupOwner,
  ): StartupOwner | undefined {
    return this.replaceStartupOwnerIfOwner(identity, owner, {
      ...owner,
      heartbeatAt: Date.now(),
      revision: randomUUID(),
    });
  }

  refreshStartupOwner(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {
    const owner = this.startupOwner(identity);
    if (owner?.instanceId !== instanceId) return false;
    return this.heartbeatStartupOwner(identity, owner) !== undefined;
  }

  startupOwnerIsWithinGrace(
    owner: StartupOwner,
    graceMs = this.startupPolicy.coordinationGraceMs,
    now = Date.now(),
  ): boolean {
    return now - owner.heartbeatAt <= graceMs;
  }

  startupOwner(identity: DaemonWorkspaceIdentity): StartupOwner | undefined {
    try {
      const value: unknown = JSON.parse(
        readFileSync(identity.startupOwnerPath(identity.lockPath), "utf8"),
      );
      return DaemonRegistry.isStartupOwner(value) ? value : undefined;
    } catch (error) {
      if (DaemonRegistry.errorCode(error) === "ENOENT" || error instanceof SyntaxError) {
        return undefined;
      }
      throw error;
    }
  }

  isStartupOwner(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {
    return this.startupOwner(identity)?.instanceId === instanceId;
  }

  startupOwnerMatchesProcess(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {
    if (record.pid <= 0) return false;
    const owner = this.startupOwner(identity);
    const stored = this.readStoredInstance(identity, record.instanceId);
    return (
      owner?.instanceId === record.instanceId &&
      owner.identityKey === identity.identityKey &&
      owner.ownerKind === "daemon" &&
      owner.ownerPid === record.pid &&
      owner.processToken === record.processToken &&
      stored?.pid === record.pid &&
      stored.processToken === record.processToken &&
      stored.startedAt === record.startedAt
    );
  }

  removeStartupLockIfProcess(identity: DaemonWorkspaceIdentity, record: DaemonRecord): boolean {
    const owner = this.startupOwner(identity);
    if (owner === undefined || !this.startupOwnerMatchesProcess(identity, record)) return false;
    return this.removeStartupLockIfOwner(identity, owner);
  }

  removeStartupLockIfInstance(identity: DaemonWorkspaceIdentity, instanceId: string): boolean {
    const releasedPath = identity.releasedStartupLockPath(instanceId);
    const owner = this.startupOwner(identity);
    if (owner?.instanceId !== instanceId) {
      return DaemonRegistry.readStartupOwner(identity, releasedPath)?.instanceId === instanceId;
    }
    try {
      renameSync(identity.lockPath, releasedPath);
      return true;
    } catch (error) {
      if (DaemonRegistry.readStartupOwner(identity, releasedPath)?.instanceId === instanceId) {
        return true;
      }
      throw error;
    }
  }

  removeStartupLockIfOwner(
    identity: DaemonWorkspaceIdentity,
    observedOwner: StartupOwner,
  ): boolean {
    const mutation = this.beginStartupMutation(identity);
    if (mutation === undefined) return false;
    try {
      if (
        !mutation.isOwned() ||
        !DaemonRegistry.sameStartupOwner(this.startupOwner(identity), observedOwner)
      ) {
        return false;
      }
      return this.removeStartupLockIfInstance(identity, observedOwner.instanceId);
    } finally {
      mutation.release();
    }
  }

  removeIfInstance(identity: DaemonWorkspaceIdentity, instanceId: string): void {
    rmSync(identity.recordPath(instanceId), { force: true });
  }

  removeIfProcess(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): boolean {
    const record = this.readStoredInstance(identity, instanceId);
    if (record?.processToken !== processToken) return false;
    this.removeIfInstance(identity, instanceId);
    return true;
  }

  list(): readonly DaemonRecord[] {
    return this.recordPaths()
      .map((path) => ({ path, record: this.readStoredPath(path) }))
      .filter(
        (entry): entry is { readonly path: string; readonly record: DaemonRecord } =>
          entry.record !== undefined &&
          DaemonRegistry.isCurrentRecord(entry.record) &&
          this.recordMatchesFile(entry.path, entry.record),
      )
      .map(({ record }) => record);
  }

  private records(identity: DaemonWorkspaceIdentity): readonly DaemonRecord[] {
    return this.recordPathsIn(identity.identityDirectory)
      .map((path) => this.readStoredPath(path))
      .filter(
        (record): record is DaemonRecord =>
          record !== undefined && DaemonRegistry.matchesIdentity(record, identity),
      )
      .sort(
        (left, right) =>
          right.startedAt - left.startedAt || right.instanceId.localeCompare(left.instanceId),
      );
  }

  isStartupMutationOwner(identity: DaemonWorkspaceIdentity, owner: StartupMutationOwner): boolean {
    return DaemonRegistry.sameStartupMutationOwner(
      DaemonRegistry.readStartupMutationOwner(identity, identity.startupMutationPath),
      owner,
    );
  }

  releaseStartupMutation(identity: DaemonWorkspaceIdentity, owner: StartupMutationOwner): void {
    if (!this.isStartupMutationOwner(identity, owner)) return;
    const releasedPath = identity.releasedStartupMutationPath(owner.token);
    try {
      renameSync(identity.startupMutationPath, releasedPath);
      if (
        DaemonRegistry.sameStartupMutationOwner(
          DaemonRegistry.readStartupMutationOwner(identity, releasedPath),
          owner,
        )
      ) {
        rmSync(releasedPath, { recursive: true, force: true });
      }
    } catch (error) {
      if (DaemonRegistry.errorCode(error) === "ENOENT") return;
      throw error;
    }
  }

  private beginStartupMutation(
    identity: DaemonWorkspaceIdentity,
  ): RegistryStartupMutationLease | undefined {
    const claimed = this.claimStartupMutation(identity);
    if (claimed !== undefined) return claimed;
    const observedOwner = DaemonRegistry.readStartupMutationOwner(
      identity,
      identity.startupMutationPath,
    );
    if (
      observedOwner !== undefined &&
      DaemonRegistry.processIsAlive(observedOwner.ownerPid) &&
      Date.now() - observedOwner.acquiredAt <= this.startupPolicy.coordinationGraceMs
    ) {
      return undefined;
    }
    if (!this.recoverStartupMutation(identity, observedOwner)) return undefined;
    return this.claimStartupMutation(identity);
  }

  private claimStartupMutation(
    identity: DaemonWorkspaceIdentity,
  ): RegistryStartupMutationLease | undefined {
    mkdirSync(identity.identityDirectory, { recursive: true, mode: 0o700 });
    const token = randomUUID();
    const owner: StartupMutationOwner = {
      ownerPid: process.pid,
      acquiredAt: Date.now(),
      token,
    };
    const claimPath = identity.startupMutationClaimPath(token);
    mkdirSync(claimPath, { mode: 0o700 });
    writeFileSync(identity.startupOwnerPath(claimPath), JSON.stringify(owner), {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    try {
      renameSync(claimPath, identity.startupMutationPath);
      return new RegistryStartupMutationLease(this, identity, owner);
    } catch (error) {
      rmSync(claimPath, { recursive: true, force: true });
      if (DaemonRegistry.startupMutationClaimWasContended(error)) return undefined;
      if (existsSync(identity.startupMutationPath)) return undefined;
      throw error;
    }
  }

  private static startupMutationClaimWasContended(error: unknown): boolean {
    const code = DaemonRegistry.errorCode(error);
    return code === "EEXIST" || code === "ENOTEMPTY";
  }

  private recoverStartupMutation(
    identity: DaemonWorkspaceIdentity,
    observedOwner: StartupMutationOwner | undefined,
  ): boolean {
    const currentOwner = DaemonRegistry.readStartupMutationOwner(
      identity,
      identity.startupMutationPath,
    );
    if (!DaemonRegistry.sameOptionalStartupMutationOwner(currentOwner, observedOwner)) return false;
    const recoveryToken = observedOwner?.token ?? "ownerless";
    const releasedPath = identity.releasedStartupMutationPath(recoveryToken);
    try {
      renameSync(identity.startupMutationPath, releasedPath);
      return true;
    } catch (error) {
      if (existsSync(releasedPath)) return true;
      if (DaemonRegistry.errorCode(error) === "ENOENT") return false;
      throw error;
    }
  }

  private recordPaths(): readonly string[] {
    try {
      return readdirSync(this.registryDirectory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? this.recordPathsIn(join(this.registryDirectory, entry.name)) : [],
      );
    } catch (error) {
      if (DaemonRegistry.errorCode(error) === "ENOENT") return [];
      throw error;
    }
  }

  private recordPathsIn(identityDirectory: string): readonly string[] {
    try {
      return readdirSync(identityDirectory, { withFileTypes: true }).flatMap((entry) =>
        entry.isFile() && entry.name.endsWith(".json") ? [join(identityDirectory, entry.name)] : [],
      );
    } catch (error) {
      if (DaemonRegistry.errorCode(error) === "ENOENT") return [];
      throw error;
    }
  }

  private readStoredPath(recordPath: string): DaemonRecord | undefined {
    try {
      const value: unknown = JSON.parse(readFileSync(recordPath, "utf8"));
      return DaemonRegistry.isStoredRecord(value) ? value : undefined;
    } catch (error) {
      if (DaemonRegistry.errorCode(error) === "ENOENT" || error instanceof SyntaxError) {
        return undefined;
      }
      throw error;
    }
  }

  private recordMatchesFile(path: string, record: DaemonRecord): boolean {
    const expectedIdentity = DaemonWorkspaceIdentity.from(
      record.workspaceRoot,
      dirname(this.registryDirectory),
    );
    return (
      expectedIdentity.registryDirectory === this.registryDirectory &&
      DaemonRegistry.matchesIdentity(record, expectedIdentity) &&
      path === expectedIdentity.recordPath(record.instanceId)
    );
  }

  private static matchesIdentity(record: DaemonRecord, identity: DaemonWorkspaceIdentity): boolean {
    return (
      record.workspaceRoot === identity.workspaceRoot &&
      record.workspaceKey === identity.workspaceKey &&
      record.stateKey === identity.stateKey &&
      record.identityKey === identity.identityKey &&
      record.endpoint === identity.endpoint(record.instanceId)
    );
  }

  private static isCurrentRecord(record: DaemonRecord): boolean {
    if (
      record.schemaVersion !== DAEMON_RECORD_SCHEMA_VERSION ||
      record.protocolVersion !== DAEMON_PROTOCOL_VERSION
    )
      return false;
    if (record.state === "starting") {
      return record.readyAt === undefined && record.fileCount === undefined;
    }
    return typeof record.readyAt === "number" && typeof record.fileCount === "number";
  }

  private static isStoredRecord(value: unknown): value is DaemonRecord {
    if (typeof value !== "object" || value === null) return false;
    const record = value as Record<string, unknown>;
    return (
      Number.isInteger(record.schemaVersion) &&
      Number.isInteger(record.protocolVersion) &&
      typeof record.symnavVersion === "string" &&
      typeof record.workspaceRoot === "string" &&
      typeof record.workspaceKey === "string" &&
      typeof record.stateKey === "string" &&
      typeof record.identityKey === "string" &&
      typeof record.instanceId === "string" &&
      typeof record.processToken === "string" &&
      typeof record.endpoint === "string" &&
      Number.isInteger(record.pid) &&
      (record.state === "starting" || record.state === "ready") &&
      typeof record.startedAt === "number" &&
      typeof record.memoryCapBytes === "number" &&
      (record.readyAt === undefined || typeof record.readyAt === "number") &&
      (record.fileCount === undefined || typeof record.fileCount === "number") &&
      (record.memoryBytes === undefined || typeof record.memoryBytes === "number") &&
      (record.lastNavigationAt === undefined || typeof record.lastNavigationAt === "number")
    );
  }

  private static isStartupOwner(value: unknown): value is StartupOwner {
    if (typeof value !== "object" || value === null) return false;
    const owner = value as Record<string, unknown>;
    return (
      typeof owner.identityKey === "string" &&
      typeof owner.instanceId === "string" &&
      Number.isInteger(owner.ownerPid) &&
      typeof owner.processToken === "string" &&
      (owner.ownerKind === "launcher" || owner.ownerKind === "daemon") &&
      typeof owner.acquiredAt === "number" &&
      typeof owner.heartbeatAt === "number" &&
      typeof owner.revision === "string"
    );
  }

  private static sameStartupOwner(
    current: StartupOwner | undefined,
    observed: StartupOwner,
  ): boolean {
    return (
      current?.instanceId === observed.instanceId &&
      current.identityKey === observed.identityKey &&
      current.ownerPid === observed.ownerPid &&
      current.processToken === observed.processToken &&
      current.ownerKind === observed.ownerKind &&
      current.acquiredAt === observed.acquiredAt &&
      current.heartbeatAt === observed.heartbeatAt &&
      current.revision === observed.revision
    );
  }

  private static sameStartupMutationOwner(
    current: StartupMutationOwner | undefined,
    observed: StartupMutationOwner,
  ): boolean {
    return (
      current?.ownerPid === observed.ownerPid &&
      current.acquiredAt === observed.acquiredAt &&
      current.token === observed.token
    );
  }

  private static sameOptionalStartupMutationOwner(
    current: StartupMutationOwner | undefined,
    observed: StartupMutationOwner | undefined,
  ): boolean {
    if (current === undefined || observed === undefined) return current === observed;
    return DaemonRegistry.sameStartupMutationOwner(current, observed);
  }

  private static readStartupOwner(
    identity: DaemonWorkspaceIdentity,
    path: string,
  ): StartupOwner | undefined {
    try {
      const value: unknown = JSON.parse(readFileSync(identity.startupOwnerPath(path), "utf8"));
      return DaemonRegistry.isStartupOwner(value) ? value : undefined;
    } catch {
      return undefined;
    }
  }

  private static readStartupMutationOwner(
    identity: DaemonWorkspaceIdentity,
    path: string,
  ): StartupMutationOwner | undefined {
    try {
      const value: unknown = JSON.parse(readFileSync(identity.startupOwnerPath(path), "utf8"));
      return DaemonRegistry.isStartupMutationOwner(value) ? value : undefined;
    } catch {
      return undefined;
    }
  }

  private static isStartupMutationOwner(value: unknown): value is StartupMutationOwner {
    if (typeof value !== "object" || value === null) return false;
    const owner = value as Record<string, unknown>;
    return (
      Number.isInteger(owner.ownerPid) &&
      typeof owner.acquiredAt === "number" &&
      typeof owner.token === "string"
    );
  }

  private static processIsAlive(pid: number): boolean {
    if (!Number.isInteger(pid) || pid <= 0) return false;
    try {
      process.kill(pid, 0);
      return true;
    } catch (error) {
      return DaemonRegistry.errorCode(error) === "EPERM";
    }
  }

  private replaceStartupOwner(temporaryPath: string, ownerPath: string): void {
    if (this.platform !== "win32") {
      this.renamePath(temporaryPath, ownerPath);
      return;
    }
    const previousPath = \`\${ownerPath}.\${process.pid}.\${randomUUID()}.previous\`;
    this.renamePath(ownerPath, previousPath);
    try {
      this.renamePath(temporaryPath, ownerPath);
    } catch (error) {
      try {
        this.renamePath(previousPath, ownerPath);
      } catch {}
      throw error;
    }
    try {
      rmSync(previousPath, { force: true });
    } catch {}
  }

  private replaceStartupOwnerIfOwner(
    identity: DaemonWorkspaceIdentity,
    observedOwner: StartupOwner,
    replacementOwner: StartupOwner,
  ): StartupOwner | undefined {
    const mutation = this.beginStartupMutation(identity);
    if (mutation === undefined) return undefined;
    const ownerPath = identity.startupOwnerPath(identity.lockPath);
    const temporaryPath = \`\${identity.lockPath}.\${process.pid}.\${randomUUID()}.owner.tmp\`;
    try {
      writeFileSync(temporaryPath, JSON.stringify(replacementOwner), {
        encoding: "utf8",
        mode: 0o600,
      });
      if (
        !mutation.isOwned() ||
        !DaemonRegistry.sameStartupOwner(this.startupOwner(identity), observedOwner)
      ) {
        rmSync(temporaryPath, { force: true });
        return undefined;
      }
      try {
        this.replaceStartupOwner(temporaryPath, ownerPath);
      } catch (error) {
        rmSync(temporaryPath, { force: true });
        if (DaemonRegistry.errorCode(error) === "ENOENT") return undefined;
        throw error;
      }
      return DaemonRegistry.sameStartupOwner(this.startupOwner(identity), replacementOwner)
        ? replacementOwner
        : undefined;
    } finally {
      mutation.release();
    }
  }

  private static errorCode(error: unknown): string | undefined {
    if (typeof error !== "object" || error === null) return undefined;
    return (error as { readonly code?: string }).code;
  }
}
`},"head:apps/cli/src/daemon/daemon-startup-coordinator.ts":{path:"apps/cli/src/daemon/daemon-startup-coordinator.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"75925d07aa7b28f8b24fe3be0d05473eacc67cc366026ca6b1c391cd5dd61073",text:`import { randomUUID } from "node:crypto";
import type { DaemonPolicyValues } from "@symnav/daemon";
import {
  DaemonProcessTerminationError,
  NodeDaemonProcessTerminator,
  type DaemonProcess,
  type DaemonProcessExit,
  type DaemonProcessLauncher,
  type DaemonProcessTerminator,
} from "./daemon-process-launcher.js";
import type { DaemonRecord, DaemonStartResult } from "./daemon-protocol.js";
import { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } from "./daemon-protocol.js";
import type { DaemonRegistry, StartupOwner } from "./daemon-registry.js";
import { DaemonRecordObserver } from "./daemon-record-observer.js";
import type { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { LocalDaemonTransport } from "./local-daemon-transport.js";

export type DaemonWarmupTriggerResult =
  | { readonly status: "launched"; readonly instanceId: string; readonly pid: number }
  | { readonly status: "starting"; readonly instanceId: string; readonly pid: number }
  | { readonly status: "ready"; readonly instanceId: string; readonly pid: number };

interface DaemonStartupCoordinatorOptions {
  readonly policy: Pick<DaemonPolicyValues, "startup" | "shutdown">;
  readonly now?: () => number;
  readonly instanceId?: () => string;
  readonly processTerminator?: DaemonProcessTerminator;
}

class DaemonChildExitError extends Error {
  constructor(readonly exit: DaemonProcessExit) {
    super(
      exit.cause === "spawn-error"
        ? \`Daemon child failed after spawn (\${exit.errorName ?? "Error"})\`
        : \`Daemon child exited before readiness (code \${String(exit.code)}, signal \${String(exit.signal)})\`,
    );
  }
}

class DaemonWarmupLostError extends Error {}

class DaemonOwnedButUnresponsiveError extends Error {}

export class DaemonStartupCoordinator {
  private readonly coordinationGraceMs: number;
  private readonly childFailureRetryLimit: number;
  private readonly terminationTimeoutMs: number;
  private readonly pollIntervalMs: number;
  private readonly now: () => number;
  private readonly nextInstanceId: () => string;
  private readonly processTerminator: DaemonProcessTerminator;
  private readonly observer: DaemonRecordObserver;
  private readonly launchedInstances = new Set<string>();
  private readonly launchedProcesses = new Map<string, DaemonProcess>();
  private readonly launchedExits = new Map<string, DaemonProcessExit>();
  private readonly launchedInstanceIdsByIdentity = new Map<string, string>();

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly launcher: DaemonProcessLauncher,
    private readonly transport: LocalDaemonTransport,
    options: DaemonStartupCoordinatorOptions,
  ) {
    const policy = options.policy;
    this.coordinationGraceMs = policy.startup.coordinationGraceMs;
    this.childFailureRetryLimit = policy.startup.childFailureRetryLimit;
    this.terminationTimeoutMs = policy.startup.previousInstanceTerminationTimeoutMs;
    this.pollIntervalMs = policy.startup.observationPollIntervalMs;
    this.now = options.now ?? Date.now;
    this.nextInstanceId = options.instanceId ?? randomUUID;
    this.processTerminator =
      options.processTerminator ?? new NodeDaemonProcessTerminator(policy.shutdown);
    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator, this.now);
  }

  async ensureRunning(identity: DaemonWorkspaceIdentity): Promise<DaemonStartResult> {
    let failureCount = 0;
    while (true) {
      try {
        return await this.triggerAndWait(identity);
      } catch (error) {
        if (
          !(error instanceof DaemonChildExitError || error instanceof DaemonWarmupLostError) ||
          failureCount >= this.childFailureRetryLimit
        ) {
          throw error;
        }
        failureCount += 1;
      }
    }
  }

  private async triggerAndWait(identity: DaemonWorkspaceIdentity): Promise<DaemonStartResult> {
    const trigger = await this.trigger(identity);
    return this.waitUntilReady(identity, trigger.instanceId);
  }

  async trigger(identity: DaemonWorkspaceIdentity): Promise<DaemonWarmupTriggerResult> {
    const readyRecord = await this.validatedReadyRecord(identity);
    if (readyRecord?.symnavVersion === this.launcher.symnavVersion) {
      return {
        status: "ready",
        instanceId: readyRecord.instanceId,
        pid: readyRecord.pid,
      };
    }

    const instanceId = this.nextInstanceId();
    const processToken = randomUUID();
    const lease = this.registry.acquireStartup(identity, {
      identityKey: identity.identityKey,
      instanceId,
      processToken,
      ownerPid: process.pid,
      ownerKind: "launcher",
      heartbeatAt: this.now(),
    });
    if (lease === undefined) return this.observeElectedWarmup(identity);
    try {
      const currentRecord = await this.validatedReadyRecord(identity);
      if (currentRecord?.symnavVersion === this.launcher.symnavVersion) {
        lease.release();
        return {
          status: "ready",
          instanceId: currentRecord.instanceId,
          pid: currentRecord.pid,
        };
      }
      const storedRecord = this.registry.readStored(identity);
      if (storedRecord !== undefined) await this.replaceStoredRecord(identity, storedRecord);
      return await this.launch(identity, instanceId, processToken, lease);
    } catch (error) {
      lease.release();
      throw error;
    }
  }

  async waitUntilReady(
    identity: DaemonWorkspaceIdentity,
    expectedInstanceId?: string,
  ): Promise<DaemonStartResult> {
    let missingOwner: { readonly instanceId: string; readonly firstObservedAt: number } | undefined;
    while (true) {
      const record = this.registry.read(identity);
      if (record?.state === "ready" && record.symnavVersion === this.launcher.symnavVersion) {
        const validated = await this.validatedChildRecord(identity);
        if (validated?.instanceId === record.instanceId) {
          await this.probeExecution(validated);
          return this.launchedInstances.has(record.instanceId)
            ? {
                status: "ready",
                workspaceRoot: record.workspaceRoot,
                fileCount: record.fileCount ?? 0,
                loadDurationMs: (record.readyAt ?? this.now()) - record.startedAt,
              }
            : this.alreadyRunning(record);
        }
      }
      const storedRecord = this.registry.readStored(identity);
      const observedInstanceId =
        storedRecord?.instanceId ?? this.launchedInstanceIdsByIdentity.get(identity.identityKey);
      const launchedExit =
        observedInstanceId === undefined ? undefined : this.launchedExits.get(observedInstanceId);
      if (launchedExit !== undefined) throw new DaemonChildExitError(launchedExit);
      const owner = this.registry.startupOwner(identity);
      if (owner !== undefined) missingOwner = undefined;
      if (
        storedRecord?.state === "ready" &&
        storedRecord.symnavVersion === this.launcher.symnavVersion
      ) {
        await this.pause();
        continue;
      }
      if (storedRecord?.state === "starting") {
        if (owner !== undefined && this.startupOwnerIsAbandoned(identity, owner)) {
          if (this.cleanupAbandonedStartup(identity, owner)) {
            throw new DaemonWarmupLostError("Daemon child exited before readiness");
          }
          await this.pause();
          continue;
        }
        const daemonProcess = this.launchedProcesses.get(storedRecord.instanceId);
        if (daemonProcess !== undefined) {
          const childExit = await Promise.race([
            this.pause().then(() => undefined),
            daemonProcess.exited,
          ]);
          if (childExit !== undefined) throw new DaemonChildExitError(childExit);
          continue;
        }
        if (owner !== undefined) {
          await this.pause();
          continue;
        }
        if (missingOwner?.instanceId !== storedRecord.instanceId) {
          missingOwner = {
            instanceId: storedRecord.instanceId,
            firstObservedAt: this.now(),
          };
          await this.pause();
          continue;
        }
        if (this.now() - missingOwner.firstObservedAt <= this.coordinationGraceMs) {
          await this.pause();
          continue;
        }
      }
      if (owner !== undefined) {
        await this.pause();
        continue;
      }
      if (expectedInstanceId !== undefined) {
        throw new DaemonWarmupLostError(
          \`Daemon startup \${expectedInstanceId} ended before readiness\`,
        );
      }
      throw new Error("Daemon startup failed before readiness");
    }
  }

  private async launch(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
    lease: NonNullable<ReturnType<DaemonRegistry["acquireStartup"]>>,
  ): Promise<DaemonWarmupTriggerResult> {
    const startedAt = this.now();
    const startingRecord: DaemonRecord = {
      schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      symnavVersion: this.launcher.symnavVersion,
      workspaceRoot: identity.workspaceRoot,
      workspaceKey: identity.workspaceKey,
      stateKey: identity.stateKey,
      identityKey: identity.identityKey,
      instanceId,
      processToken,
      endpoint: identity.endpoint(instanceId),
      pid: 0,
      state: "starting",
      startedAt,
      memoryCapBytes: this.launcher.memoryCapBytes,
    };
    if (!this.registry.writeStartingIfStartupOwner(identity, startingRecord)) {
      throw new Error("Daemon startup ownership changed before process launch");
    }
    let daemonProcess: DaemonProcess | undefined;
    try {
      daemonProcess = await this.launcher.launch(identity, instanceId, processToken);
      const transferred = lease.transferToDaemon(daemonProcess.pid, processToken);
      const daemonOwner = this.registry.startupOwner(identity);
      if (
        !transferred &&
        !(
          daemonOwner?.identityKey === identity.identityKey &&
          daemonOwner.instanceId === instanceId &&
          daemonOwner.processToken === processToken &&
          daemonOwner.ownerKind === "daemon" &&
          daemonOwner.ownerPid === daemonProcess.pid
        )
      ) {
        throw new Error("Daemon startup ownership changed after process launch");
      }
      if (
        !this.registry.writeStartingIfStartupOwner(identity, {
          ...startingRecord,
          pid: daemonProcess.pid,
        })
      ) {
        throw new Error("Daemon startup ownership changed after process launch");
      }
      this.launchedInstances.add(instanceId);
      this.launchedProcesses.set(instanceId, daemonProcess);
      this.launchedInstanceIdsByIdentity.set(identity.identityKey, instanceId);
      this.observeLaunchedProcess(identity, instanceId, processToken, daemonProcess);
      return {
        status: "launched",
        instanceId,
        pid: daemonProcess.pid,
      };
    } catch (error) {
      if (error instanceof DaemonChildExitError) {
        this.cleanupLaunchedProcess(identity, instanceId, processToken);
        throw error;
      }
      if (daemonProcess !== undefined) {
        try {
          await daemonProcess.terminate();
        } catch (terminationError) {
          if (terminationError instanceof DaemonProcessTerminationError) throw terminationError;
          throw new DaemonProcessTerminationError(String(terminationError));
        }
      }
      this.cleanupLaunchedProcess(identity, instanceId, processToken);
      throw error;
    }
  }

  private observeLaunchedProcess(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
    daemonProcess: DaemonProcess,
  ): void {
    void daemonProcess.exited.then((exit) => {
      this.launchedExits.set(instanceId, exit);
      const record = this.registry.readStoredInstance(identity, instanceId);
      if (record?.state === "starting" && record.processToken === processToken) {
        this.cleanupLaunchedProcess(identity, instanceId, processToken);
      }
    });
  }

  private cleanupLaunchedProcess(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): void {
    const record = this.registry.readStoredInstance(identity, instanceId);
    if (record?.processToken === processToken) {
      if (record.pid > 0) {
        this.registry.removeStartupLockIfProcess(identity, record);
      } else {
        const owner = this.registry.startupOwner(identity);
        if (owner?.instanceId === instanceId && owner.processToken === processToken) {
          this.registry.removeStartupLockIfOwner(identity, owner);
        }
      }
    }
    this.registry.removeIfProcess(identity, instanceId, processToken);
  }

  private async observeElectedWarmup(
    identity: DaemonWorkspaceIdentity,
  ): Promise<DaemonWarmupTriggerResult> {
    while (true) {
      const record = await this.validatedReadyRecord(identity);
      if (record?.symnavVersion === this.launcher.symnavVersion) {
        return { status: "ready", instanceId: record.instanceId, pid: record.pid };
      }
      const owner = this.registry.startupOwner(identity);
      if (owner === undefined) return this.trigger(identity);
      if (this.startupOwnerIsAbandoned(identity, owner)) {
        if (this.cleanupAbandonedStartup(identity, owner)) return this.trigger(identity);
      }
      const startingRecord = this.registry.readStoredInstance(identity, owner.instanceId);
      if (
        startingRecord?.state === "starting" &&
        startingRecord.pid > 0 &&
        owner.ownerKind === "daemon"
      ) {
        return {
          status: "starting",
          instanceId: owner.instanceId,
          pid: startingRecord.pid,
        };
      }
      await this.pause();
    }
  }

  private cleanupAbandonedStartup(identity: DaemonWorkspaceIdentity, owner: StartupOwner): boolean {
    const record = this.registry.readStoredInstance(identity, owner.instanceId);
    if (
      record !== undefined &&
      ((owner.processToken.length > 0 && record.processToken !== owner.processToken) ||
        (owner.ownerKind === "daemon" && record.pid !== owner.ownerPid))
    ) {
      return false;
    }
    if (!this.registry.removeStartupLockIfOwner(identity, owner)) return false;
    if (record !== undefined) {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
    }
    return true;
  }

  private startupOwnerIsAbandoned(identity: DaemonWorkspaceIdentity, owner: StartupOwner): boolean {
    const record = this.registry.readStoredInstance(identity, owner.instanceId);
    if (record !== undefined && record.pid > 0) {
      return !this.processTerminator.isAlive(record.pid);
    }
    if (owner.ownerKind === "daemon") return !this.processTerminator.isAlive(owner.ownerPid);
    return (
      !this.processTerminator.isAlive(owner.ownerPid) ||
      !this.registry.startupOwnerIsWithinGrace(owner)
    );
  }

  private async validatedChildRecord(
    identity: DaemonWorkspaceIdentity,
  ): Promise<DaemonRecord | undefined> {
    try {
      return await this.validatedReadyRecord(identity);
    } catch (error) {
      if (error instanceof DaemonOwnedButUnresponsiveError) return undefined;
      throw error;
    }
  }

  private async validatedReadyRecord(
    identity: DaemonWorkspaceIdentity,
  ): Promise<DaemonRecord | undefined> {
    const record = this.registry.read(identity);
    if (record?.state !== "ready") return undefined;
    const observation = await this.observer.observe(record);
    if (observation.kind === "responsive") {
      this.registry.removeStartupLockIfProcess(identity, record);
      return record;
    }
    if (observation.kind === "exited") {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return undefined;
    }
    if (observation.kind === "incompatible" || observation.kind === "corrupt") return undefined;
    throw new DaemonOwnedButUnresponsiveError(
      \`Daemon process \${record.pid} is live but unresponsive; ownership was retained\`,
    );
  }

  private async replaceStoredRecord(
    identity: DaemonWorkspaceIdentity,
    record: DaemonRecord,
  ): Promise<void> {
    const observation = await this.observer.observe(record);
    if (observation.kind === "exited") {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return;
    }
    if (observation.kind === "starting" || observation.kind === "unresponsive") {
      throw new DaemonOwnedButUnresponsiveError(
        \`Daemon process \${record.pid} is live but unresponsive; ownership was retained\`,
      );
    }
    await this.transport.request(record.endpoint, {
      kind: "terminate",
      instanceId: record.instanceId,
      processToken: record.processToken,
    });
    await this.waitForProcessExitAndEndpointRelease(record);
    this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
  }

  private async waitForProcessExitAndEndpointRelease(record: DaemonRecord): Promise<void> {
    const waitStartedAt = this.now();
    while (this.now() - waitStartedAt <= this.terminationTimeoutMs) {
      const endpointReleased = !(await this.identifiesRecordedProcess(record));
      const processExited = !this.processTerminator.isAlive(record.pid);
      if (endpointReleased && processExited) return;
      await this.pause();
    }
    throw new DaemonProcessTerminationError(
      \`Daemon process \${record.pid} did not exit and release its endpoint\`,
    );
  }

  private async identifiesRecordedProcess(record: DaemonRecord): Promise<boolean> {
    try {
      const response = await this.transport.request(record.endpoint, {
        kind: "identify",
        instanceId: record.instanceId,
        processToken: record.processToken,
      });
      return (
        response.kind === "identity" &&
        response.pid === record.pid &&
        response.startedAt === record.startedAt
      );
    } catch {
      return false;
    }
  }

  private async probeExecution(record: DaemonRecord): Promise<void> {
    const receipt = await this.transport.execute(record.endpoint, {
      kind: "execute",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: record.instanceId,
      processToken: record.processToken,
      requestId: randomUUID(),
      request: {
        argv: ["--version"],
        cwd: record.workspaceRoot,
        telemetryEnabled: false,
      },
    });
    const completion = await receipt.completion;
    if (completion.status !== "completed" || completion.result.exitCode !== 0) {
      throw new Error("Daemon execution readiness probe failed");
    }
  }

  private alreadyRunning(record: DaemonRecord): DaemonStartResult {
    return {
      status: "already-running",
      workspaceRoot: record.workspaceRoot,
      pid: record.pid,
      uptimeMs: Math.max(0, this.now() - record.startedAt),
    };
  }

  private pause(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));
  }
}
`},"base:apps/cli/src/daemon/daemon-startup-coordinator.ts":{path:"apps/cli/src/daemon/daemon-startup-coordinator.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"c45166f80715dababcd13db6a266281c4f628053c07bb80116c059a7e26d2e11",text:`import { randomUUID } from "node:crypto";
import {
  DaemonProcessTerminationError,
  NodeDaemonProcessTerminator,
  type DaemonProcess,
  type DaemonProcessExit,
  type DaemonProcessLauncher,
  type DaemonProcessTerminator,
} from "./daemon-process-launcher.js";
import type { DaemonRecord, DaemonStartResult } from "./daemon-protocol.js";
import { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } from "./daemon-protocol.js";
import {
  DAEMON_STARTUP_TIMEOUT_MS,
  type DaemonRegistry,
  type StartupOwner,
} from "./daemon-registry.js";
import { DaemonRecordObserver } from "./daemon-record-observer.js";
import type { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { LocalDaemonTransport } from "./local-daemon-transport.js";

export type DaemonWarmupTriggerResult =
  | { readonly status: "launched"; readonly instanceId: string; readonly pid: number }
  | { readonly status: "starting"; readonly instanceId: string; readonly pid: number }
  | { readonly status: "ready"; readonly instanceId: string; readonly pid: number };

interface DaemonStartupCoordinatorOptions {
  readonly startupTimeoutMs?: number;
  readonly terminationTimeoutMs?: number;
  readonly pollIntervalMs?: number;
  readonly now?: () => number;
  readonly instanceId?: () => string;
  readonly processTerminator?: DaemonProcessTerminator;
}

const DAEMON_TERMINATION_TIMEOUT_MS = 5 * 60_000;
class DaemonChildExitError extends Error {
  constructor(readonly exit: DaemonProcessExit) {
    super(
      exit.cause === "spawn-error"
        ? \`Daemon child failed after spawn (\${exit.errorName ?? "Error"})\`
        : \`Daemon child exited before readiness (code \${String(exit.code)}, signal \${String(exit.signal)})\`,
    );
  }
}

class DaemonWarmupLostError extends Error {}

class DaemonOwnedButUnresponsiveError extends Error {}

export class DaemonStartupCoordinator {
  private readonly startupTimeoutMs: number;
  private readonly terminationTimeoutMs: number;
  private readonly pollIntervalMs: number;
  private readonly now: () => number;
  private readonly nextInstanceId: () => string;
  private readonly processTerminator: DaemonProcessTerminator;
  private readonly observer: DaemonRecordObserver;
  private readonly launchedInstances = new Set<string>();
  private readonly launchedProcesses = new Map<string, DaemonProcess>();
  private readonly launchedExits = new Map<string, DaemonProcessExit>();
  private readonly launchedInstanceIdsByIdentity = new Map<string, string>();

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly launcher: DaemonProcessLauncher,
    private readonly transport: LocalDaemonTransport,
    options: DaemonStartupCoordinatorOptions = {},
  ) {
    this.startupTimeoutMs = options.startupTimeoutMs ?? Number.POSITIVE_INFINITY;
    this.terminationTimeoutMs = options.terminationTimeoutMs ?? DAEMON_TERMINATION_TIMEOUT_MS;
    this.pollIntervalMs = options.pollIntervalMs ?? 20;
    this.now = options.now ?? Date.now;
    this.nextInstanceId = options.instanceId ?? randomUUID;
    this.processTerminator = options.processTerminator ?? new NodeDaemonProcessTerminator();
    this.observer = new DaemonRecordObserver(this.transport, this.processTerminator, this.now);
  }

  async ensureRunning(identity: DaemonWorkspaceIdentity): Promise<DaemonStartResult> {
    try {
      return await this.triggerAndWait(identity);
    } catch (error) {
      if (!(error instanceof DaemonChildExitError || error instanceof DaemonWarmupLostError)) {
        throw error;
      }
      return this.triggerAndWait(identity);
    }
  }

  private async triggerAndWait(identity: DaemonWorkspaceIdentity): Promise<DaemonStartResult> {
    const trigger = await this.trigger(identity);
    return this.waitUntilReady(identity, trigger.instanceId);
  }

  async trigger(identity: DaemonWorkspaceIdentity): Promise<DaemonWarmupTriggerResult> {
    const readyRecord = await this.validatedReadyRecord(identity);
    if (readyRecord?.symnavVersion === this.launcher.symnavVersion) {
      return {
        status: "ready",
        instanceId: readyRecord.instanceId,
        pid: readyRecord.pid,
      };
    }

    const instanceId = this.nextInstanceId();
    const processToken = randomUUID();
    const lease = this.registry.acquireStartup(identity, {
      identityKey: identity.identityKey,
      instanceId,
      processToken,
      ownerPid: process.pid,
      ownerKind: "launcher",
      heartbeatAt: this.now(),
    });
    if (lease === undefined) return this.observeElectedWarmup(identity);
    try {
      const currentRecord = await this.validatedReadyRecord(identity);
      if (currentRecord?.symnavVersion === this.launcher.symnavVersion) {
        lease.release();
        return {
          status: "ready",
          instanceId: currentRecord.instanceId,
          pid: currentRecord.pid,
        };
      }
      const storedRecord = this.registry.readStored(identity);
      if (storedRecord !== undefined) await this.replaceStoredRecord(identity, storedRecord);
      return await this.launch(identity, instanceId, processToken, lease);
    } catch (error) {
      lease.release();
      throw error;
    }
  }

  async waitUntilReady(
    identity: DaemonWorkspaceIdentity,
    expectedInstanceId?: string,
  ): Promise<DaemonStartResult> {
    let missingOwner: { readonly instanceId: string; readonly firstObservedAt: number } | undefined;
    while (true) {
      const record = this.registry.read(identity);
      if (record?.state === "ready" && record.symnavVersion === this.launcher.symnavVersion) {
        const validated = await this.validatedChildRecord(identity);
        if (validated?.instanceId === record.instanceId) {
          await this.probeExecution(validated);
          return this.launchedInstances.has(record.instanceId)
            ? {
                status: "ready",
                workspaceRoot: record.workspaceRoot,
                fileCount: record.fileCount ?? 0,
                loadDurationMs: (record.readyAt ?? this.now()) - record.startedAt,
              }
            : this.alreadyRunning(record);
        }
      }
      const storedRecord = this.registry.readStored(identity);
      const observedInstanceId =
        storedRecord?.instanceId ?? this.launchedInstanceIdsByIdentity.get(identity.identityKey);
      const launchedExit =
        observedInstanceId === undefined ? undefined : this.launchedExits.get(observedInstanceId);
      if (launchedExit !== undefined) throw new DaemonChildExitError(launchedExit);
      const owner = this.registry.startupOwner(identity);
      if (owner !== undefined) missingOwner = undefined;
      if (
        storedRecord?.state === "ready" &&
        storedRecord.symnavVersion === this.launcher.symnavVersion
      ) {
        await this.pause();
        continue;
      }
      if (storedRecord?.state === "starting") {
        if (owner !== undefined && this.startupOwnerIsAbandoned(identity, owner)) {
          if (this.cleanupAbandonedStartup(identity, owner)) {
            throw new DaemonWarmupLostError("Daemon child exited before readiness");
          }
          await this.pause();
          continue;
        }
        const daemonProcess = this.launchedProcesses.get(storedRecord.instanceId);
        if (daemonProcess !== undefined) {
          const childExit = await Promise.race([
            this.pause().then(() => undefined),
            daemonProcess.exited,
          ]);
          if (childExit !== undefined) throw new DaemonChildExitError(childExit);
          continue;
        }
        if (owner !== undefined) {
          await this.pause();
          continue;
        }
        if (missingOwner?.instanceId !== storedRecord.instanceId) {
          missingOwner = {
            instanceId: storedRecord.instanceId,
            firstObservedAt: this.now(),
          };
          await this.pause();
          continue;
        }
        if (this.now() - missingOwner.firstObservedAt <= DAEMON_STARTUP_TIMEOUT_MS) {
          await this.pause();
          continue;
        }
      }
      if (owner !== undefined) {
        await this.pause();
        continue;
      }
      if (expectedInstanceId !== undefined) {
        throw new DaemonWarmupLostError(
          \`Daemon startup \${expectedInstanceId} ended before readiness\`,
        );
      }
      throw new Error("Daemon startup failed before readiness");
    }
  }

  private async launch(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
    lease: NonNullable<ReturnType<DaemonRegistry["acquireStartup"]>>,
  ): Promise<DaemonWarmupTriggerResult> {
    const startedAt = this.now();
    const startingRecord: DaemonRecord = {
      schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      symnavVersion: this.launcher.symnavVersion,
      workspaceRoot: identity.workspaceRoot,
      workspaceKey: identity.workspaceKey,
      stateKey: identity.stateKey,
      identityKey: identity.identityKey,
      instanceId,
      processToken,
      endpoint: identity.endpoint(instanceId),
      pid: 0,
      state: "starting",
      startedAt,
      memoryCapBytes: this.launcher.memoryCapBytes,
    };
    if (!this.registry.writeStartingIfStartupOwner(identity, startingRecord)) {
      throw new Error("Daemon startup ownership changed before process launch");
    }
    let daemonProcess: DaemonProcess | undefined;
    try {
      daemonProcess = await this.launcher.launch(identity, instanceId, processToken);
      const transferred = lease.transferToDaemon(daemonProcess.pid, processToken);
      const daemonOwner = this.registry.startupOwner(identity);
      if (
        !transferred &&
        !(
          daemonOwner?.identityKey === identity.identityKey &&
          daemonOwner.instanceId === instanceId &&
          daemonOwner.processToken === processToken &&
          daemonOwner.ownerKind === "daemon" &&
          daemonOwner.ownerPid === daemonProcess.pid
        )
      ) {
        throw new Error("Daemon startup ownership changed after process launch");
      }
      if (
        !this.registry.writeStartingIfStartupOwner(identity, {
          ...startingRecord,
          pid: daemonProcess.pid,
        })
      ) {
        throw new Error("Daemon startup ownership changed after process launch");
      }
      this.launchedInstances.add(instanceId);
      this.launchedProcesses.set(instanceId, daemonProcess);
      this.launchedInstanceIdsByIdentity.set(identity.identityKey, instanceId);
      this.observeLaunchedProcess(identity, instanceId, processToken, daemonProcess);
      return {
        status: "launched",
        instanceId,
        pid: daemonProcess.pid,
      };
    } catch (error) {
      if (error instanceof DaemonChildExitError) {
        this.cleanupLaunchedProcess(identity, instanceId, processToken);
        throw error;
      }
      if (daemonProcess !== undefined) {
        try {
          await daemonProcess.terminate();
        } catch (terminationError) {
          if (terminationError instanceof DaemonProcessTerminationError) throw terminationError;
          throw new DaemonProcessTerminationError(String(terminationError));
        }
      }
      this.cleanupLaunchedProcess(identity, instanceId, processToken);
      throw error;
    }
  }

  private observeLaunchedProcess(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
    daemonProcess: DaemonProcess,
  ): void {
    void daemonProcess.exited.then((exit) => {
      this.launchedExits.set(instanceId, exit);
      const record = this.registry.readStoredInstance(identity, instanceId);
      if (record?.state === "starting" && record.processToken === processToken) {
        this.cleanupLaunchedProcess(identity, instanceId, processToken);
      }
    });
  }

  private cleanupLaunchedProcess(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): void {
    const record = this.registry.readStoredInstance(identity, instanceId);
    if (record?.processToken === processToken) {
      if (record.pid > 0) {
        this.registry.removeStartupLockIfProcess(identity, record);
      } else {
        const owner = this.registry.startupOwner(identity);
        if (owner?.instanceId === instanceId && owner.processToken === processToken) {
          this.registry.removeStartupLockIfOwner(identity, owner);
        }
      }
    }
    this.registry.removeIfProcess(identity, instanceId, processToken);
  }

  private async observeElectedWarmup(
    identity: DaemonWorkspaceIdentity,
  ): Promise<DaemonWarmupTriggerResult> {
    while (true) {
      const record = await this.validatedReadyRecord(identity);
      if (record?.symnavVersion === this.launcher.symnavVersion) {
        return { status: "ready", instanceId: record.instanceId, pid: record.pid };
      }
      const owner = this.registry.startupOwner(identity);
      if (owner === undefined) return this.trigger(identity);
      if (this.startupOwnerIsAbandoned(identity, owner)) {
        if (this.cleanupAbandonedStartup(identity, owner)) return this.trigger(identity);
      }
      const startingRecord = this.registry.readStoredInstance(identity, owner.instanceId);
      if (
        startingRecord?.state === "starting" &&
        startingRecord.pid > 0 &&
        owner.ownerKind === "daemon"
      ) {
        return {
          status: "starting",
          instanceId: owner.instanceId,
          pid: startingRecord.pid,
        };
      }
      await this.pause();
    }
  }

  private cleanupAbandonedStartup(identity: DaemonWorkspaceIdentity, owner: StartupOwner): boolean {
    const record = this.registry.readStoredInstance(identity, owner.instanceId);
    if (
      record !== undefined &&
      ((owner.processToken.length > 0 && record.processToken !== owner.processToken) ||
        (owner.ownerKind === "daemon" && record.pid !== owner.ownerPid))
    ) {
      return false;
    }
    if (!this.registry.removeStartupLockIfOwner(identity, owner)) return false;
    if (record !== undefined) {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
    }
    return true;
  }

  private startupOwnerIsAbandoned(identity: DaemonWorkspaceIdentity, owner: StartupOwner): boolean {
    const record = this.registry.readStoredInstance(identity, owner.instanceId);
    if (record !== undefined && record.pid > 0) {
      return !this.processTerminator.isAlive(record.pid);
    }
    if (owner.ownerKind === "daemon") return !this.processTerminator.isAlive(owner.ownerPid);
    return (
      !this.processTerminator.isAlive(owner.ownerPid) ||
      !this.registry.startupOwnerIsWithinGrace(owner)
    );
  }

  private async validatedChildRecord(
    identity: DaemonWorkspaceIdentity,
  ): Promise<DaemonRecord | undefined> {
    try {
      return await this.validatedReadyRecord(identity);
    } catch (error) {
      if (error instanceof DaemonOwnedButUnresponsiveError) return undefined;
      throw error;
    }
  }

  private async validatedReadyRecord(
    identity: DaemonWorkspaceIdentity,
  ): Promise<DaemonRecord | undefined> {
    const record = this.registry.read(identity);
    if (record?.state !== "ready") return undefined;
    const observation = await this.observer.observe(record);
    if (observation.kind === "responsive") {
      this.registry.removeStartupLockIfProcess(identity, record);
      return record;
    }
    if (observation.kind === "exited") {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return undefined;
    }
    if (observation.kind === "incompatible" || observation.kind === "corrupt") return undefined;
    throw new DaemonOwnedButUnresponsiveError(
      \`Daemon process \${record.pid} is live but unresponsive; ownership was retained\`,
    );
  }

  private async replaceStoredRecord(
    identity: DaemonWorkspaceIdentity,
    record: DaemonRecord,
  ): Promise<void> {
    const observation = await this.observer.observe(record);
    if (observation.kind === "exited") {
      this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      return;
    }
    if (observation.kind === "starting" || observation.kind === "unresponsive") {
      throw new DaemonOwnedButUnresponsiveError(
        \`Daemon process \${record.pid} is live but unresponsive; ownership was retained\`,
      );
    }
    await this.transport.request(record.endpoint, {
      kind: "terminate",
      instanceId: record.instanceId,
      processToken: record.processToken,
    });
    await this.waitForProcessExitAndEndpointRelease(record);
    this.registry.removeIfProcess(identity, record.instanceId, record.processToken);
  }

  private async waitForProcessExitAndEndpointRelease(record: DaemonRecord): Promise<void> {
    const waitStartedAt = this.now();
    while (this.now() - waitStartedAt <= this.terminationTimeoutMs) {
      const endpointReleased = !(await this.identifiesRecordedProcess(record));
      const processExited = !this.processTerminator.isAlive(record.pid);
      if (endpointReleased && processExited) return;
      await this.pause();
    }
    throw new DaemonProcessTerminationError(
      \`Daemon process \${record.pid} did not exit and release its endpoint\`,
    );
  }

  private async identifiesRecordedProcess(record: DaemonRecord): Promise<boolean> {
    try {
      const response = await this.transport.request(record.endpoint, {
        kind: "identify",
        instanceId: record.instanceId,
        processToken: record.processToken,
      });
      return (
        response.kind === "identity" &&
        response.pid === record.pid &&
        response.startedAt === record.startedAt
      );
    } catch {
      return false;
    }
  }

  private async probeExecution(record: DaemonRecord): Promise<void> {
    const receipt = await this.transport.execute(record.endpoint, {
      kind: "execute",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: record.instanceId,
      processToken: record.processToken,
      requestId: randomUUID(),
      request: {
        argv: ["--version"],
        cwd: record.workspaceRoot,
        telemetryEnabled: false,
      },
    });
    const completion = await receipt.completion;
    if (completion.status !== "completed" || completion.result.exitCode !== 0) {
      throw new Error("Daemon execution readiness probe failed");
    }
  }

  private alreadyRunning(record: DaemonRecord): DaemonStartResult {
    return {
      status: "already-running",
      workspaceRoot: record.workspaceRoot,
      pid: record.pid,
      uptimeMs: Math.max(0, this.now() - record.startedAt),
    };
  }

  private pause(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));
  }
}
`},"head:apps/cli/src/daemon/workspace-daemon.ts":{path:"apps/cli/src/daemon/workspace-daemon.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"4741a2030188e094962af5145b799313da5a3b25e61675deeac3dd847e8f227f",text:`import type { ProgramDependencies } from "../program-dependencies.js";
import type { DaemonPolicy, DaemonPolicyValues } from "@symnav/daemon";
import type { CommandExecutionResult, CommandOutputRecord } from "../command-execution-result.js";
import {
  AcceptedRequestCorruptionError,
  AcceptedRequestLedger,
} from "./accepted-request-ledger.js";
import type {
  DaemonActivitySnapshot,
  DaemonDeliveryOutcome,
  DaemonExecutionFailureCode,
  DaemonExecutionServerFrame,
  DaemonRecord,
  DaemonRequest,
  DaemonResponse,
  DaemonServerMessage,
  DaemonServer,
} from "./daemon-protocol.js";
import {
  CompletionSpoolCapacityError,
  CompletionSpoolReadError,
  DaemonCompletionSpoolStore,
  type CompletionSpool,
  type CompletionSpoolStorage,
} from "./completion-spool.js";
import { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } from "./daemon-protocol.js";
import { DaemonLifetime } from "./daemon-lifetime.js";
import { DaemonLogger } from "./daemon-logger.js";
import { NodeDaemonClock, type DaemonClock } from "./daemon-clock.js";
import { DaemonOperationObserver, type DaemonOperationTrace } from "./daemon-operation-observer.js";
import {
  DaemonNavigationWorkerExitedError,
  type DaemonNavigationWorker,
  NodeDaemonNavigationWorker,
} from "./daemon-navigation-worker.js";
import {
  DaemonResourceSupervisor,
  type DaemonWorkerReplacementCause,
} from "./daemon-resource-monitor.js";
import type { DaemonNavigationWorkerResponse } from "./daemon-navigation-worker-protocol.js";
import type { DaemonRegistry, DaemonStartupLease } from "./daemon-registry.js";
import type { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { DaemonServerSend, LocalDaemonTransport } from "./local-daemon-transport.js";
import { WorkspaceRequestQueue, type DaemonCommandName } from "./workspace-request-queue.js";

export interface WorkspaceDaemonOptions {
  readonly identity: DaemonWorkspaceIdentity;
  readonly instanceId: string;
  readonly processToken: string;
  readonly symnavVersion: string;
  readonly policy: DaemonPolicy;
  readonly dependencies: ProgramDependencies;
  readonly registry: DaemonRegistry;
  readonly transport: LocalDaemonTransport;
  readonly navigationWorker?: DaemonNavigationWorker;
  readonly navigationWorkerFactory?: (generation: number) => DaemonNavigationWorker;
  readonly now?: () => number;
  readonly clock?: DaemonClock;
  readonly exit?: (code: number) => void;
  readonly residentMemoryBytes?: () => number;
  readonly completionSpoolStorage?: CompletionSpoolStorage;
  readonly logger?: DaemonLogger;
}

export interface DaemonWorkerGeneration {
  readonly id: number;
  readonly worker: DaemonNavigationWorker;
  readonly ready: Promise<DaemonNavigationWorkerResponse>;
}

export class WorkspaceDaemon {
  private readonly now: () => number;
  private readonly clock: DaemonClock;
  private readonly exit: (code: number) => void;
  private readonly initialNavigationWorker: DaemonNavigationWorker;
  private readonly navigationWorkerFactory:
    | ((generation: number) => DaemonNavigationWorker)
    | undefined;
  private workerGeneration: DaemonWorkerGeneration | undefined;
  private readonly requestQueue: WorkspaceRequestQueue;
  private readonly logger: DaemonLogger;
  private readonly lifetime: DaemonLifetime;
  private readonly resourceSupervisor: DaemonResourceSupervisor;
  private readonly resourcePolicy: DaemonPolicyValues["resources"];
  private readonly policy: DaemonPolicy;
  private readonly operationObserver: DaemonOperationObserver;
  private readonly acceptedRequests: AcceptedRequestLedger;
  private readonly completionSpools: DaemonCompletionSpoolStore;
  private readonly acceptances = new Map<
    string,
    { readonly acceptedAt: number; readonly queuePosition: number }
  >();
  private server: DaemonServer | undefined;
  private startedAt = 0;
  private readonly startedMonotonicAt: number;
  private fileCount = 0;
  private lastNavigationAt: number | undefined;
  private lastCompletedMonotonicAt: number | undefined;
  private workerReady = false;
  private shutdownStarted = false;
  private shutdownFailureCode: DaemonExecutionFailureCode | undefined;
  private shutdownOperation: Promise<void> | undefined;
  private forcedWorkerShutdown: Promise<void> | undefined;
  private readonly forceEscalated: Promise<void>;
  private resolveForceEscalated!: () => void;
  private readonly resourceInterruptedRequests = new Set<string>();
  private readonly completionDeliveries = new Map<string, Promise<void>>();
  private readonly operationTraces = new Map<string, DaemonOperationTrace>();
  private readonly operationTraceExpirations = new Map<string, NodeJS.Timeout>();
  private readonly operationTraceConnections = new Map<string, number>();
  private workerRecoveryOperation: Promise<void> | undefined;

  constructor(private readonly options: WorkspaceDaemonOptions) {
    const policy = options.policy;
    this.policy = policy;
    this.forceEscalated = new Promise((resolve) => {
      this.resolveForceEscalated = resolve;
    });
    this.now = options.now ?? Date.now;
    this.clock = options.clock ?? new NodeDaemonClock();
    this.startedMonotonicAt = this.clock.monotonicNowMs();
    this.requestQueue = new WorkspaceRequestQueue(() => this.clock.monotonicNowMs());
    this.acceptedRequests = new AcceptedRequestLedger(this.now);
    this.completionSpools = new DaemonCompletionSpoolStore({
      directory: options.identity.spoolDirectory,
      workspaceKey: options.identity.workspaceKey,
      instanceId: options.instanceId,
      policy: policy.values.output,
      ...(options.completionSpoolStorage === undefined
        ? {}
        : { storage: options.completionSpoolStorage }),
    });
    this.logger =
      options.logger ??
      new DaemonLogger(options.identity, options.instanceId, this.clock, {
        policy: policy.values.diagnostics,
      });
    const resourcePolicy = policy.values.resources;
    this.resourcePolicy = resourcePolicy;
    this.navigationWorkerFactory =
      options.navigationWorkerFactory ??
      (options.navigationWorker === undefined
        ? (generation) =>
            new NodeDaemonNavigationWorker({
              generation,
              configuration: {
                stateDirectory: options.identity.stateDirectory,
                policy: policy.toSerialized(),
              },
              resourceLimits: {
                maxOldGenerationSizeMb: resourcePolicy.workerMaxOldGenerationSizeMiB,
              },
            })
        : undefined);
    this.initialNavigationWorker = options.navigationWorker ?? this.createNavigationWorker(1);
    this.exit = options.exit ?? ((code) => process.exit(code));
    this.lifetime = new DaemonLifetime({ now: this.now }, policy.values.shutdown, () =>
      this.drainAndShutdown("idle"),
    );
    this.resourceSupervisor = new DaemonResourceSupervisor({
      policy: resourcePolicy,
      generation: this.initialNavigationWorker.generation,
      ...(options.residentMemoryBytes === undefined
        ? {}
        : { residentMemoryBytes: options.residentMemoryBytes }),
      spoolBytes: () => this.completionSpools.usage().rawBytes,
      scheduleAtTurnBoundary: (operation) => this.requestQueue.scheduleAtTurnBoundary(operation),
      releaseTransientResources: () => this.releaseTransientResources(),
      replaceWorker: (cause) => this.replaceNavigationWorker(cause),
      drain: () => this.initiateResourceDrain(),
    });
    this.operationObserver = new DaemonOperationObserver(
      this.logger,
      this.clock,
      this.resourceSupervisor,
    );
  }

  async start(): Promise<void> {
    this.logger.record({ kind: "start" });
    let startupLease: DaemonStartupLease | undefined;
    let startupHeartbeat: NodeJS.Timeout | undefined;
    try {
      const authorization = await this.waitForStartupAuthorization();
      startupLease = authorization.lease;
      const startingRecord = authorization.record;
      startupHeartbeat = setInterval(
        () => startupLease?.heartbeat(),
        this.policy.values.startup.heartbeatIntervalMs,
      );
      startupHeartbeat.unref();
      this.startedAt = startingRecord.startedAt;
      this.server = await this.options.transport.listen(
        this.options.identity.endpoint(this.options.instanceId),
        (request, send) => this.handle(request, send),
      );
      const generation = this.startWorkerGeneration(this.initialNavigationWorker);
      const response = await this.waitForReadyGeneration(generation);
      if (response.kind !== "ready") throw new Error("Navigation worker did not become ready");
      this.fileCount = response.fileCount;
      this.operationObserver.startup({
        kind: "startup-completed",
        workerGeneration: response.generation,
        fileCount: response.fileCount,
        ...response.startupDurations,
      });
      this.logger.record({ kind: "freshness", ...response.refresh });
      await this.resourceSupervisor.sample("warmup");
      this.workerReady = true;
      const readyRecord: DaemonRecord = {
        schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        symnavVersion: this.options.symnavVersion,
        workspaceRoot: this.options.identity.workspaceRoot,
        workspaceKey: this.options.identity.workspaceKey,
        stateKey: this.options.identity.stateKey,
        identityKey: this.options.identity.identityKey,
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        endpoint: this.options.identity.endpoint(this.options.instanceId),
        pid: process.pid,
        state: "ready",
        startedAt: startingRecord.startedAt,
        readyAt: this.now(),
        fileCount: response.fileCount,
        memoryCapBytes: this.resourcePolicy.hardProcessRssBytes,
      };
      if (!this.options.registry.writeIfStartupOwner(this.options.identity, readyRecord)) {
        throw new Error("Daemon startup ownership changed before readiness publication");
      }
      if (startupHeartbeat !== undefined) clearInterval(startupHeartbeat);
      startupHeartbeat = undefined;
      startupLease.release();
      this.logger.record({ kind: "ready", fileCount: response.fileCount });
      this.resourceSupervisor.start();
      await this.logger.flush();
    } catch (error) {
      if (startupHeartbeat !== undefined) clearInterval(startupHeartbeat);
      await this.cleanupFailedStartup(startupLease);
      this.logger.record({
        kind: "failure",
        operation: "start",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
      await this.logger.flush();
      throw error;
    }
  }

  private async waitForStartupAuthorization(): Promise<{
    readonly lease: DaemonStartupLease;
    readonly record: DaemonRecord;
  }> {
    const deadline = this.now() + this.policy.values.startup.coordinationGraceMs;
    while (this.now() <= deadline) {
      const record = this.options.registry.readInstance(
        this.options.identity,
        this.options.instanceId,
      );
      if (
        record?.state === "starting" &&
        (record.pid === 0 || record.pid === process.pid) &&
        record.processToken === this.options.processToken
      ) {
        const lease = this.options.registry.claimStartupForDaemon(
          this.options.identity,
          this.options.instanceId,
          this.options.processToken,
          process.pid,
        );
        if (lease === undefined) {
          await this.pause();
          continue;
        }
        this.options.registry.writeStartingIfStartupOwner(this.options.identity, {
          ...record,
          pid: process.pid,
        });
        const adoptedRecord = this.options.registry.readInstance(
          this.options.identity,
          this.options.instanceId,
        );
        if (adoptedRecord?.pid !== process.pid) {
          lease.release();
          await this.pause();
          continue;
        }
        if (
          this.options.registry.startupOwnerMatchesProcess(this.options.identity, adoptedRecord)
        ) {
          return { lease, record: adoptedRecord };
        }
        lease.release();
      }
      await this.pause();
    }
    throw new Error("Daemon process did not receive startup authorization");
  }

  private async cleanupFailedStartup(startupLease: DaemonStartupLease | undefined): Promise<void> {
    this.shutdownStarted = true;
    try {
      await (this.workerGeneration?.worker ?? this.initialNavigationWorker).terminate();
    } catch {}
    try {
      await this.server?.close();
    } catch {}
    startupLease?.release();
    this.options.registry.removeIfProcess(
      this.options.identity,
      this.options.instanceId,
      this.options.processToken,
    );
  }

  private async handle(
    request: DaemonRequest,
    send: DaemonServerSend,
  ): Promise<DaemonResponse | void> {
    if (request.kind === "identify") return this.identify(request);
    if (request.kind === "terminate" || request.kind === "kill") {
      return this.terminate(request);
    }
    if (
      request.protocolVersion !== DAEMON_PROTOCOL_VERSION ||
      request.instanceId !== this.options.instanceId
    ) {
      throw new Error("Daemon request does not match protocol or instance");
    }
    if (request.kind === "ping") return this.pong();
    if (
      request.kind === "execute" ||
      request.kind === "execution-status" ||
      request.kind === "result-fetch" ||
      request.kind === "result-ack"
    ) {
      if (request.processToken !== this.options.processToken) {
        throw new Error("Daemon execution request does not match process instance");
      }
    }
    if (request.kind === "execute") return this.acceptExecution(request, send);
    if (request.kind === "result-fetch") {
      let disconnectTraceConnection: (() => void) | undefined;
      if (this.acceptedRequests.entryFor(request.requestId)?.state.state === "completed") {
        const traceWasDisconnected = !this.operationTraceConnections.has(request.requestId);
        disconnectTraceConnection = this.attachOperationTraceConnection(request.requestId, send);
        if (traceWasDisconnected) this.reattachOperationTrace(request.requestId);
      }
      try {
        await this.deliverStoredCompletion(request.requestId, send, request.offset);
      } catch (error) {
        disconnectTraceConnection?.();
        throw error;
      }
      return;
    }
    if (request.kind === "result-ack") {
      const spool = await this.completionSpools.open(request.requestId);
      if (spool === undefined) throw new Error("Accepted request completion is unavailable");
      if (spool.completedManifest?.transferId !== request.transferId) {
        throw new Error("Result acknowledgement does not match completion transfer");
      }
      await spool.acknowledge().catch((error) => {
        this.logger.record({
          kind: "failure",
          operation: "completion-cleanup",
          failureCode: "internal",
          errorName: DaemonLogger.errorName(error),
        });
      });
      this.acceptedRequests.acknowledge(request.requestId);
      this.completeOperationTrace(request.requestId, "delivered");
      return {
        kind: "result-acknowledged",
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        requestId: request.requestId,
        transferId: request.transferId,
      };
    }
    if (request.kind === "execution-status") {
      return {
        kind: "execution-status",
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        requestId: request.requestId,
        status: this.acceptedRequests.status(request.requestId),
      };
    }
    this.beginGracefulShutdown();
    await this.requestQueue.drain();
    await this.waitForCompletionAcknowledgements();
    setTimeout(() => void this.shutdown("graceful"), 0);
    return { kind: "stopped", instanceId: this.options.instanceId };
  }

  private identify(request: Extract<DaemonRequest, { kind: "identify" }>): DaemonResponse {
    if (
      request.instanceId !== this.options.instanceId ||
      request.processToken !== this.options.processToken
    ) {
      throw new Error("Daemon identity request does not match process instance");
    }
    return {
      kind: "identity",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      pid: process.pid,
      startedAt: this.startedAt,
    };
  }

  private async terminate(
    request: Extract<DaemonRequest, { kind: "terminate" | "kill" }>,
  ): Promise<DaemonResponse> {
    if (
      request.instanceId !== this.options.instanceId ||
      request.processToken !== this.options.processToken
    ) {
      throw new Error("Daemon termination does not match process instance");
    }
    this.beginGracefulShutdown();
    if (request.kind === "terminate") {
      await this.requestQueue.drain();
      await this.waitForCompletionAcknowledgements();
      setTimeout(() => void this.shutdown("graceful"), 0);
    } else {
      setTimeout(() => void this.shutdown("graceful", true), 0);
    }
    return {
      kind: request.kind === "terminate" ? "terminating" : "killing",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
    };
  }

  private pong(): DaemonResponse {
    const activity = this.activitySnapshot();
    const active = activity.current;
    return {
      kind: "pong",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: this.options.instanceId,
      symnavVersion: this.options.symnavVersion,
      state:
        activity.lifecycle === "busy"
          ? "busy"
          : activity.lifecycle === "starting"
            ? "starting"
            : "ready",
      startedAt: this.startedAt,
      fileCount: this.fileCount,
      memoryBytes: activity.processRssBytes,
      queued: activity.queued,
      activity,
      ...(active === undefined
        ? {}
        : {
            currentCommand: active.command,
            currentCommandElapsedMs: active.elapsedMs,
          }),
      ...(this.lastNavigationAt === undefined ? {} : { lastNavigationAt: this.lastNavigationAt }),
    };
  }

  private async acceptExecution(
    request: Extract<DaemonRequest, { kind: "execute" }>,
    send: DaemonServerSend,
  ): Promise<DaemonResponse | void> {
    void this.resourceSupervisor.sample("admission").catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "resource-sample",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
    });
    if (!this.workerReady) return this.rejection(request, "not-ready", true);
    if (this.resourceSupervisor.snapshot.admissionPaused) {
      return this.rejection(request, "resource-pressure", true);
    }
    if (this.requestQueue.state !== "accepting") {
      return this.rejection(request, "draining", true);
    }
    const existing = this.acceptedRequests.entryFor(request.requestId);
    let entry;
    try {
      entry = this.acceptedRequests.accept(request.requestId, request.request);
    } catch (error) {
      if (error instanceof AcceptedRequestCorruptionError) {
        return this.rejection(request, "incompatible", false);
      }
      throw error;
    }
    if (entry.state.state === "queued") {
      this.acceptances.set(request.requestId, {
        acceptedAt: entry.state.acceptedAt,
        queuePosition: entry.state.queuePosition,
      });
      if (existing === undefined) {
        const trace = this.operationObserver.start(
          request.requestId,
          WorkspaceDaemon.commandName(request.request.argv),
        );
        this.operationTraces.set(request.requestId, trace);
        trace.accepted(entry.state.queuePosition, this.resourceSupervisor.snapshot.generation);
      }
    }
    const acceptance = this.acceptances.get(request.requestId);
    if (acceptance === undefined) throw new Error("Accepted request is missing admission metadata");
    const traceWasDisconnected = !this.operationTraceConnections.has(request.requestId);
    const disconnectTraceConnection = this.attachOperationTraceConnection(request.requestId, send);
    if (existing === undefined) {
      this.lastNavigationAt = this.now();
      this.lifetime.navigationAccepted();
      void this.executeAccepted(request);
    } else if (traceWasDisconnected) {
      this.reattachOperationTrace(request.requestId);
    }
    try {
      await this.deliver(send, {
        kind: "accepted",
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        requestId: request.requestId,
        ...acceptance,
      });
    } catch (error) {
      disconnectTraceConnection();
      throw error;
    }
    if (entry.state.state === "completed") {
      try {
        await this.deliverStoredCompletion(request.requestId, send);
      } catch (error) {
        disconnectTraceConnection();
        throw error;
      }
      return;
    }
    if (entry.state.state === "failed") {
      try {
        await this.deliver(send, this.failedFrame(request.requestId, entry.state.code));
      } catch (error) {
        disconnectTraceConnection();
        throw error;
      }
      this.completeOperationTrace(request.requestId, "delivered");
      return;
    }
    let unsubscribe: (() => void) | undefined;
    unsubscribe = this.acceptedRequests.subscribe(request.requestId, (updated) => {
      if (updated.state.state === "completed") {
        this.trackCompletionDelivery(request.requestId, send, disconnectTraceConnection);
        unsubscribe?.();
      } else if (updated.state.state === "failed") {
        void this.deliver(send, this.failedFrame(request.requestId, updated.state.code))
          .then(() => this.completeOperationTrace(request.requestId, "delivered"))
          .catch((error) =>
            this.recordDeliveryFailure(request.requestId, error, disconnectTraceConnection),
          );
        unsubscribe?.();
      }
    });
  }

  private async executeAccepted(
    request: Extract<DaemonRequest, { kind: "execute" }>,
  ): Promise<void> {
    let spool: CompletionSpool | undefined;
    try {
      await this.requestQueue.enqueue(
        {
          requestId: request.requestId,
          command: WorkspaceDaemon.commandName(request.request.argv),
          acceptedAt: this.clock.monotonicNowMs(),
        },
        async () => {
          this.operationTraces
            .get(request.requestId)
            ?.turnStarted(this.resourceSupervisor.snapshot.generation);
          try {
            spool = await this.completionSpools.create(request.requestId);
            this.acceptedRequests.markRunning(request.requestId, this.now());
            const generation = this.workerGeneration;
            if (generation === undefined) throw new Error("Navigation worker is unavailable");
            const ready = await generation.ready;
            if (ready.kind !== "ready") throw new Error("Navigation worker did not become ready");
            const response = await generation.worker.execute(
              request.requestId,
              request.request,
              spool,
            );
            if (response.kind !== "result" || response.requestId !== request.requestId) {
              throw new Error("Navigation worker returned an uncorrelated result");
            }
            this.resourceSupervisor.workerHeapReported(
              response.generation,
              response.resources.workerHeapUsedBytes,
              response.resources.workerHeapLimitBytes,
              response.resources.peakWorkerHeapUsedBytes,
            );
            this.operationTraces.get(request.requestId)?.workerCompleted(
              {
                freshnessMs: response.durations.freshnessMs,
                navigationMs: response.durations.navigationMs,
                renderMs: response.durations.renderMs,
                workerOutputMs: response.durations.outputMs,
              },
              response.refresh,
            );
            const spoolStartedAt = this.clock.monotonicNowMs();
            const manifest = await spool.finish(response.result.exitCode);
            this.operationTraces
              .get(request.requestId)
              ?.spooled(manifest, Math.max(0, this.clock.monotonicNowMs() - spoolStartedAt));
            const workspaceDeleted = await this.recordCompletion();
            this.operationTraces.get(request.requestId)?.executionTerminated("completed");
            this.acceptedRequests.complete(request.requestId, request.requestId, this.now());
            await this.completionDeliveries.get(request.requestId);
            if (workspaceDeleted) {
              await this.waitForCompletionAcknowledgements();
              setTimeout(() => void this.shutdown("workspace-deleted", true), 0);
            }
          } finally {
            this.scheduleTurnCompleteResourceSample();
          }
        },
      );
    } catch (error) {
      this.operationTraces.get(request.requestId)?.executionTerminated("failed");
      this.logger.record({
        kind: "failure",
        operation: "request",
        failureCode: "internal",
        errorName: DaemonLogger.errorName(error),
      });
      const code =
        (this.resourceInterruptedRequests.delete(request.requestId)
          ? "controlled-resource"
          : undefined) ??
        (error instanceof CompletionSpoolCapacityError
          ? "response-capacity"
          : error instanceof DaemonNavigationWorkerExitedError
            ? this.shutdownFailureCode === "stopping"
              ? "stopping"
              : "worker-exit"
            : (this.shutdownFailureCode ?? (this.shutdownStarted ? "stopping" : "internal")));
      await spool?.dispose().catch((cleanupError) => {
        this.logger.record({
          kind: "failure",
          operation: "completion-cleanup",
          failureCode: "internal",
          errorName: DaemonLogger.errorName(cleanupError),
        });
      });
      this.acceptedRequests.fail(request.requestId, code, this.now());
    } finally {
      if (this.requestQueue.isIdle) this.lifetime.queueBecameIdle();
    }
  }

  private scheduleTurnCompleteResourceSample(): void {
    void this.requestQueue
      .scheduleAtTurnBoundary(() => this.resourceSupervisor.sampleAtTurnBoundary())
      .catch((error) => {
        this.logger.record({
          kind: "failure",
          operation: "resource-sample",
          failureCode: "operation-failed",
          errorName: DaemonLogger.errorName(error),
        });
      })
      .finally(() => {
        if (this.requestQueue.isIdle) this.lifetime.queueBecameIdle();
      });
  }

  private async recordCompletion(): Promise<boolean> {
    this.lastCompletedMonotonicAt = this.clock.monotonicNowMs();
    return !(await this.options.dependencies.fs.exists(this.options.identity.workspaceRoot));
  }

  private rejection(
    request: Extract<DaemonRequest, { kind: "execute" }>,
    code: "not-ready" | "draining" | "resource-pressure" | "incompatible",
    retrySafe: boolean,
  ): DaemonExecutionServerFrame {
    return {
      kind: "rejected",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId: request.requestId,
      code,
      retrySafe,
    };
  }

  private failedFrame(
    requestId: string,
    code: DaemonExecutionFailureCode,
  ): DaemonExecutionServerFrame {
    return {
      kind: "execution-failed",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId,
      code,
    };
  }

  private deliver(send: DaemonServerSend, frame: DaemonServerMessage): Promise<void> {
    return send(frame);
  }

  private async deliverStoredCompletion(
    requestId: string,
    send: DaemonServerSend,
    offset = 0,
  ): Promise<void> {
    const spool = await this.completionSpools.open(requestId);
    if (spool === undefined) throw new Error("Accepted request result is missing");
    try {
      await this.deliverCompletion(requestId, spool, offset, send);
    } catch (error) {
      if (!(error instanceof CompletionSpoolReadError)) throw error;
      this.logger.record({
        kind: "failure",
        operation: "completion-delivery",
        failureCode: "internal",
        errorName: DaemonLogger.errorName(error),
      });
      await spool.dispose().catch((cleanupError) => {
        this.logger.record({
          kind: "failure",
          operation: "completion-cleanup",
          failureCode: "internal",
          errorName: DaemonLogger.errorName(cleanupError),
        });
      });
      this.acceptedRequests.invalidateCompletion(requestId, "internal", this.now());
      await this.deliver(send, this.failedFrame(requestId, "internal"));
      this.completeOperationTrace(requestId, "failed");
    }
  }

  private trackCompletionDelivery(
    requestId: string,
    send: DaemonServerSend,
    disconnectTraceConnection: () => void,
  ): void {
    const delivery = this.deliverStoredCompletion(requestId, send).catch((error) =>
      this.recordDeliveryFailure(requestId, error, disconnectTraceConnection),
    );
    this.completionDeliveries.set(requestId, delivery);
    void delivery.finally(() => {
      if (this.completionDeliveries.get(requestId) === delivery) {
        this.completionDeliveries.delete(requestId);
      }
    });
  }

  private async deliverCompletion(
    requestId: string,
    spool: CompletionSpool,
    offset: number,
    send: DaemonServerSend,
  ): Promise<void> {
    const completedManifest = spool.completedManifest;
    if (completedManifest === undefined) throw new Error("Completion manifest is missing");
    await this.deliver(send, {
      kind: "result-manifest",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId,
      manifest: completedManifest,
    });
    for await (const record of spool.read(offset)) {
      await this.deliver(send, {
        transferId: completedManifest.transferId,
        requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      });
    }
    await this.deliver(send, {
      kind: "result-end",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId,
      transferId: completedManifest.transferId,
      rawBytes: completedManifest.rawBytes,
      recordCount: completedManifest.recordCount,
      sha256: completedManifest.sha256,
    });
    this.terminateOperationDelivery(requestId, "delivered");
  }

  private recordDeliveryFailure(
    requestId: string,
    error: unknown,
    disconnectTraceConnection: () => void,
  ): void {
    disconnectTraceConnection();
    this.logger.record({
      kind: "failure",
      operation: "completion-delivery",
      failureCode: "internal",
      errorName: DaemonLogger.errorName(error),
    });
  }

  private completeOperationTrace(requestId: string, outcome: DaemonDeliveryOutcome): void {
    const expiration = this.operationTraceExpirations.get(requestId);
    if (expiration !== undefined) clearTimeout(expiration);
    this.operationTraceExpirations.delete(requestId);
    this.operationTraceConnections.delete(requestId);
    this.terminateOperationDelivery(requestId, outcome);
    this.operationTraces.delete(requestId);
  }

  private terminateOperationDelivery(requestId: string, outcome: DaemonDeliveryOutcome): void {
    if (!this.acceptedRequests.terminateDelivery(requestId)) return;
    const trace = this.operationTraces.get(requestId);
    if (trace === undefined) this.operationObserver.deliveryTerminated(requestId, outcome, 0);
    else trace.deliveryTerminated(outcome);
  }

  private completeRetainedOperationTraces(): void {
    for (const requestId of this.operationTraces.keys()) {
      this.completeOperationTrace(requestId, "disconnected");
    }
  }

  private disconnectOperationTrace(requestId: string): void {
    if (this.operationTraceExpirations.has(requestId)) return;
    const trace = this.operationTraces.get(requestId);
    if (trace === undefined) return;
    trace.clientDisconnected();
    const expiration = setTimeout(
      () => this.expireOperationTrace(requestId),
      this.policy.values.diagnostics.disconnectedTraceRetentionMs,
    );
    expiration.unref();
    this.operationTraceExpirations.set(requestId, expiration);
    this.enforceOperationTraceCapacity();
  }

  private attachOperationTraceConnection(requestId: string, send: DaemonServerSend): () => void {
    const connectionCount = this.operationTraceConnections.get(requestId) ?? 0;
    if (connectionCount === 0) {
      const expiration = this.operationTraceExpirations.get(requestId);
      if (expiration !== undefined) clearTimeout(expiration);
      this.operationTraceExpirations.delete(requestId);
    }
    this.operationTraceConnections.set(requestId, connectionCount + 1);
    let connectionClosed = false;
    const disconnect = (): void => {
      if (connectionClosed) return;
      connectionClosed = true;
      const remainingConnections = (this.operationTraceConnections.get(requestId) ?? 1) - 1;
      if (remainingConnections > 0) {
        this.operationTraceConnections.set(requestId, remainingConnections);
        return;
      }
      this.operationTraceConnections.delete(requestId);
      this.disconnectOperationTrace(requestId);
    };
    send.onClose(disconnect);
    return disconnect;
  }

  private reattachOperationTrace(requestId: string): void {
    if (this.acceptedRequests.isDeliveryTerminated(requestId)) return;
    const trace = this.operationTraces.get(requestId);
    if (trace === undefined) this.operationObserver.reattached(requestId);
    else trace.reattached();
  }

  private expireOperationTrace(requestId: string): void {
    this.operationTraceExpirations.delete(requestId);
    this.operationTraceConnections.delete(requestId);
    if (!this.operationTraces.delete(requestId)) return;
    this.operationObserver.traceExpired(requestId);
  }

  private enforceOperationTraceCapacity(): void {
    const capacity = Math.max(1, this.policy.values.diagnostics.maximumDisconnectedTraces);
    while (this.operationTraceExpirations.size > capacity) {
      const oldestRequestId = this.operationTraceExpirations.keys().next().value as
        | string
        | undefined;
      if (oldestRequestId === undefined) return;
      const expiration = this.operationTraceExpirations.get(oldestRequestId);
      if (expiration !== undefined) clearTimeout(expiration);
      this.expireOperationTrace(oldestRequestId);
    }
  }

  private async drainAndShutdown(reason: "idle"): Promise<void> {
    await this.requestQueue.drain();
    await this.shutdown(reason);
  }

  private beginGracefulShutdown(): void {
    this.shutdownFailureCode ??= "stopping";
    this.resourceSupervisor.stop();
  }

  private async initiateResourceDrain(): Promise<void> {
    await this.waitForCompletionAcknowledgements();
    void this.shutdown("resource", true).catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "resource-drain",
        failureCode: "controlled-resource",
        errorName: DaemonLogger.errorName(error),
      });
    });
  }

  private async waitForCompletionAcknowledgements(): Promise<void> {
    const acknowledgementDeadline =
      Date.now() + this.policy.values.shutdown.resourceDrainAcknowledgementGraceMs;
    while (
      this.acceptedRequests.hasUnacknowledgedCompletions &&
      Date.now() < acknowledgementDeadline
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, this.policy.values.shutdown.resourceDrainAcknowledgementPollIntervalMs),
      );
    }
  }

  private async shutdown(
    reason: "graceful" | "idle" | "resource" | "workspace-deleted",
    force = false,
  ): Promise<void> {
    this.shutdownFailureCode ??= reason === "resource" ? "controlled-resource" : "stopping";
    if (force) this.forceWorkerShutdown();
    if (this.shutdownOperation !== undefined) return this.shutdownOperation;
    this.shutdownStarted = true;
    this.shutdownOperation = this.completeShutdown(reason, force);
    return this.shutdownOperation;
  }

  private async completeShutdown(
    reason: "graceful" | "idle" | "resource" | "workspace-deleted",
    force: boolean,
  ): Promise<void> {
    this.lifetime.stop();
    this.resourceSupervisor.stop();
    if (force) await this.forceWorkerShutdown();
    else await this.gracefullyShutdownWorker();
    this.operationObserver.shutdown({ kind: "shutdown", reason, force });
    this.logger.record({ kind: "stop", reason });
    try {
      await this.server?.close();
    } catch (error) {
      this.logger.record({
        kind: "failure",
        operation: "transport-close",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
    }
    await this.completionSpools.cleanupInstance(this.options.instanceId).catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "completion-cleanup",
        failureCode: "internal",
        errorName: DaemonLogger.errorName(error),
      });
    });
    this.completeRetainedOperationTraces();
    await this.logger.close();
    this.exit(0);
  }

  private async gracefullyShutdownWorker(): Promise<void> {
    await this.requestQueue.drain();
    const gracefulClose = this.currentNavigationWorker().drainAndClose();
    await Promise.race([gracefulClose, this.forceEscalated.then(() => this.forceWorkerShutdown())]);
  }

  private forceWorkerShutdown(): Promise<void> {
    if (this.forcedWorkerShutdown !== undefined) return this.forcedWorkerShutdown;
    this.requestQueue.close();
    this.forcedWorkerShutdown = this.currentNavigationWorker()
      .terminate()
      .then(() => this.requestQueue.drain());
    this.resolveForceEscalated();
    return this.forcedWorkerShutdown;
  }

  private pause(): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, this.policy.values.startup.authorizationPollIntervalMs),
    );
  }

  private createNavigationWorker(generation: number): DaemonNavigationWorker {
    const worker = this.navigationWorkerFactory?.(generation);
    if (worker === undefined) throw new Error("Navigation worker replacement is unavailable");
    if (worker.generation !== generation) {
      throw new Error("Navigation worker factory returned the wrong generation");
    }
    return worker;
  }

  private startWorkerGeneration(worker: DaemonNavigationWorker): DaemonWorkerGeneration {
    const generation: DaemonWorkerGeneration = {
      id: worker.generation,
      worker,
      ready: worker.start(this.options.identity.workspaceRoot),
    };
    this.workerGeneration = generation;
    void worker.exited.then((exit) => this.observeWorkerExit(exit));
    return generation;
  }

  private observeWorkerExit(
    exit: import("./daemon-navigation-worker.js").DaemonNavigationWorkerExit,
  ): void {
    if (this.shutdownStarted) return;
    this.logger.record({
      kind: "failure",
      operation: "worker-exit",
      failureCode: "worker-exit",
      errorName: DaemonLogger.errorName(
        exit.errorName === undefined ? undefined : { name: exit.errorName },
      ),
    });
    const recovery = this.resourceSupervisor.workerExited(exit);
    this.workerRecoveryOperation = recovery;
    void recovery.catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "worker-replacement",
        failureCode: "controlled-resource",
        errorName: DaemonLogger.errorName(error),
      });
    });
  }

  private async waitForReadyGeneration(
    generation: DaemonWorkerGeneration,
  ): Promise<DaemonNavigationWorkerResponse> {
    try {
      return await generation.ready;
    } catch (error) {
      if (!(error instanceof DaemonNavigationWorkerExitedError)) throw error;
      await generation.worker.exited;
      const recovery = this.workerRecoveryOperation;
      if (recovery === undefined) throw error;
      await recovery;
      const replacement = this.workerGeneration;
      if (replacement === undefined || replacement.id === generation.id) throw error;
      return replacement.ready;
    }
  }

  private async replaceNavigationWorker(cause: DaemonWorkerReplacementCause): Promise<number> {
    const current = this.workerGeneration;
    if (current === undefined) throw new Error("Navigation worker generation is unavailable");
    const activeRequest = this.requestQueue.snapshot.active;
    if (activeRequest !== undefined && cause !== "worker-exit") {
      this.resourceInterruptedRequests.add(activeRequest.requestId);
    }
    const nextWorker = this.createNavigationWorker(current.id + 1);
    this.workerReady = false;
    const next = this.startWorkerGeneration(nextWorker);
    await current.worker.terminate().catch(() => undefined);
    const response = await next.ready;
    if (response.kind !== "ready") throw new Error("Replacement navigation worker did not start");
    this.fileCount = response.fileCount;
    this.workerReady = true;
    this.operationObserver.worker({
      kind: "worker-replaced",
      cause,
      previousWorkerGeneration: current.id,
      workerGeneration: next.id,
      fileCount: response.fileCount,
      ...response.startupDurations,
    });
    this.logger.record({ kind: "freshness", ...response.refresh });
    return next.id;
  }

  private async releaseTransientResources(): Promise<void> {
    const generation = this.workerGeneration;
    if (generation === undefined) return;
    const response = await generation.worker.releaseTransientResources();
    if (response.kind !== "heap") throw new Error("Navigation worker did not report heap usage");
    this.resourceSupervisor.workerHeapReported(
      response.generation,
      response.usedHeapBytes,
      response.heapLimitBytes,
    );
    this.operationObserver.worker({
      kind: "resources-released",
      workerGeneration: response.generation,
      workerHeapUsedBytes: response.usedHeapBytes,
      workerHeapLimitBytes: response.heapLimitBytes,
    });
  }

  private currentNavigationWorker(): DaemonNavigationWorker {
    return this.workerGeneration?.worker ?? this.initialNavigationWorker;
  }

  private activitySnapshot(): DaemonActivitySnapshot {
    const queue = this.requestQueue.snapshot;
    const resources = this.resourceSupervisor.snapshot;
    const now = this.clock.monotonicNowMs();
    const lifecycle: DaemonActivitySnapshot["lifecycle"] =
      queue.state !== "accepting" || resources.state === "draining" || resources.state === "stopped"
        ? "draining"
        : resources.state === "replacing" || resources.state === "shedding"
          ? "recovering"
          : !this.workerReady
            ? "starting"
            : queue.active === undefined
              ? "ready"
              : "busy";
    const current =
      lifecycle !== "busy" || queue.active === undefined
        ? undefined
        : Object.freeze({
            requestId: queue.active.requestId,
            command: queue.active.command,
            elapsedMs: Math.max(0, now - queue.active.startedAt),
          });
    const recoveryDetail: DaemonActivitySnapshot["recoveryDetail"] =
      resources.state === "replacing"
        ? "worker-replacement"
        : resources.state === "shedding"
          ? "resource-pressure"
          : undefined;
    return Object.freeze({
      lifecycle,
      ...(recoveryDetail === undefined ? {} : { recoveryDetail }),
      pid: process.pid,
      startedAt: this.startedAt,
      startupElapsedMs: Math.max(0, now - this.startedMonotonicAt),
      ...(this.workerReady ? { fileCount: this.fileCount } : {}),
      processRssBytes: process.memoryUsage().rss,
      hardProcessRssBytes: this.resourcePolicy.hardProcessRssBytes,
      ...(resources.workerHeapUsedBytes === undefined
        ? {}
        : { workerHeapUsedBytes: resources.workerHeapUsedBytes }),
      workerGeneration: this.workerGeneration?.id ?? resources.generation,
      ...(current === undefined ? {} : { current }),
      queued: queue.queued,
      ...(this.lastCompletedMonotonicAt === undefined
        ? {}
        : { lastCompletedAgoMs: Math.max(0, now - this.lastCompletedMonotonicAt) }),
      spoolBytes: resources.spoolBytes,
    });
  }

  private static commandName(argv: readonly string[]): DaemonCommandName {
    const commands: readonly DaemonCommandName[] = [
      "overview",
      "resolve",
      "def",
      "refs",
      "context",
      "graph",
      "stats",
    ];
    const command = argv.find((argument): argument is DaemonCommandName =>
      commands.includes(argument as DaemonCommandName),
    );
    if (command !== undefined) return command;
    if (argv.includes("--version") || argv.includes("-v")) return "version";
    if (argv.includes("--help") || argv.includes("-h")) return "help";
    return "unknown";
  }
}
`},"base:apps/cli/src/daemon/workspace-daemon.ts":{path:"apps/cli/src/daemon/workspace-daemon.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"d6e2b30c54875249136b59bb101e7e1d9b7c461ced3b9c93683c84c6b6c825ba",text:`import type { ProgramDependencies } from "../program-dependencies.js";
import type { DaemonPolicy } from "@symnav/daemon";
import type { CommandExecutionResult, CommandOutputRecord } from "../command-execution-result.js";
import {
  AcceptedRequestCorruptionError,
  AcceptedRequestLedger,
} from "./accepted-request-ledger.js";
import type {
  DaemonActivitySnapshot,
  DaemonDeliveryOutcome,
  DaemonExecutionFailureCode,
  DaemonExecutionServerFrame,
  DaemonRecord,
  DaemonRequest,
  DaemonResponse,
  DaemonServerMessage,
  DaemonServer,
} from "./daemon-protocol.js";
import {
  CompletionSpoolCapacityError,
  CompletionSpoolReadError,
  DaemonCompletionSpoolStore,
  type CompletionSpool,
  type CompletionSpoolStorage,
} from "./completion-spool.js";
import { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } from "./daemon-protocol.js";
import { DAEMON_IDLE_TIMEOUT_MS, DaemonLifetime } from "./daemon-lifetime.js";
import { DaemonLogger } from "./daemon-logger.js";
import { NodeDaemonClock, type DaemonClock } from "./daemon-clock.js";
import { DaemonOperationObserver, type DaemonOperationTrace } from "./daemon-operation-observer.js";
import {
  DaemonNavigationWorkerExitedError,
  type DaemonNavigationWorker,
  NodeDaemonNavigationWorker,
} from "./daemon-navigation-worker.js";
import {
  DaemonResourcePolicy,
  DaemonResourceSupervisor,
  type DaemonWorkerReplacementCause,
} from "./daemon-resource-monitor.js";
import type { DaemonNavigationWorkerResponse } from "./daemon-navigation-worker-protocol.js";
import {
  DAEMON_STARTUP_TIMEOUT_MS,
  type DaemonRegistry,
  type DaemonStartupLease,
} from "./daemon-registry.js";
import type { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { DaemonServerSend, LocalDaemonTransport } from "./local-daemon-transport.js";
import { WorkspaceRequestQueue, type DaemonCommandName } from "./workspace-request-queue.js";

export interface WorkspaceDaemonOptions {
  readonly identity: DaemonWorkspaceIdentity;
  readonly instanceId: string;
  readonly processToken: string;
  readonly symnavVersion: string;
  readonly memoryCapBytes: number;
  readonly policy: DaemonPolicy;
  readonly dependencies: ProgramDependencies;
  readonly registry: DaemonRegistry;
  readonly transport: LocalDaemonTransport;
  readonly navigationWorker?: DaemonNavigationWorker;
  readonly navigationWorkerFactory?: (generation: number) => DaemonNavigationWorker;
  readonly resourcePolicy?: DaemonResourcePolicy;
  readonly now?: () => number;
  readonly clock?: DaemonClock;
  readonly exit?: (code: number) => void;
  readonly idleTimeoutMs?: number;
  readonly resourceCheckIntervalMs?: number;
  readonly residentMemoryBytes?: () => number;
  readonly startupHeartbeatIntervalMs?: number;
  readonly completionSpoolLimits?: {
    readonly inlineBytes?: number;
    readonly maximumResultBytes?: number;
    readonly maximumAggregateBytes?: number;
  };
  readonly completionSpoolStorage?: CompletionSpoolStorage;
  readonly operationTraceRetentionMs?: number;
  readonly maximumRetainedOperationTraces?: number;
  readonly logger?: DaemonLogger;
}

const DEFAULT_OPERATION_TRACE_RETENTION_MS = 5 * 60 * 1000;
const DEFAULT_MAXIMUM_RETAINED_OPERATION_TRACES = 1_024;

export interface DaemonWorkerGeneration {
  readonly id: number;
  readonly worker: DaemonNavigationWorker;
  readonly ready: Promise<DaemonNavigationWorkerResponse>;
}

export class WorkspaceDaemon {
  private readonly now: () => number;
  private readonly clock: DaemonClock;
  private readonly exit: (code: number) => void;
  private readonly initialNavigationWorker: DaemonNavigationWorker;
  private readonly navigationWorkerFactory:
    | ((generation: number) => DaemonNavigationWorker)
    | undefined;
  private workerGeneration: DaemonWorkerGeneration | undefined;
  private readonly requestQueue: WorkspaceRequestQueue;
  private readonly logger: DaemonLogger;
  private readonly lifetime: DaemonLifetime;
  private readonly resourceSupervisor: DaemonResourceSupervisor;
  private readonly resourcePolicy: DaemonResourcePolicy;
  private readonly policy: DaemonPolicy;
  private readonly operationObserver: DaemonOperationObserver;
  private readonly acceptedRequests: AcceptedRequestLedger;
  private readonly completionSpools: DaemonCompletionSpoolStore;
  private readonly acceptances = new Map<
    string,
    { readonly acceptedAt: number; readonly queuePosition: number }
  >();
  private server: DaemonServer | undefined;
  private startedAt = 0;
  private readonly startedMonotonicAt: number;
  private fileCount = 0;
  private lastNavigationAt: number | undefined;
  private lastCompletedMonotonicAt: number | undefined;
  private workerReady = false;
  private shutdownStarted = false;
  private shutdownFailureCode: DaemonExecutionFailureCode | undefined;
  private shutdownOperation: Promise<void> | undefined;
  private forcedWorkerShutdown: Promise<void> | undefined;
  private readonly forceEscalated: Promise<void>;
  private resolveForceEscalated!: () => void;
  private readonly resourceInterruptedRequests = new Set<string>();
  private readonly completionDeliveries = new Map<string, Promise<void>>();
  private readonly operationTraces = new Map<string, DaemonOperationTrace>();
  private readonly operationTraceExpirations = new Map<string, NodeJS.Timeout>();
  private readonly operationTraceConnections = new Map<string, number>();
  private workerRecoveryOperation: Promise<void> | undefined;

  constructor(private readonly options: WorkspaceDaemonOptions) {
    const policy = options.policy;
    this.policy = policy;
    this.forceEscalated = new Promise((resolve) => {
      this.resolveForceEscalated = resolve;
    });
    this.now = options.now ?? Date.now;
    this.clock = options.clock ?? new NodeDaemonClock();
    this.startedMonotonicAt = this.clock.monotonicNowMs();
    this.requestQueue = new WorkspaceRequestQueue(() => this.clock.monotonicNowMs());
    this.acceptedRequests = new AcceptedRequestLedger(this.now);
    this.completionSpools = new DaemonCompletionSpoolStore({
      directory: options.identity.spoolDirectory,
      workspaceKey: options.identity.workspaceKey,
      instanceId: options.instanceId,
      ...options.completionSpoolLimits,
      ...(options.completionSpoolStorage === undefined
        ? {}
        : { storage: options.completionSpoolStorage }),
    });
    this.logger =
      options.logger ?? new DaemonLogger(options.identity, options.instanceId, this.clock);
    const resourcePolicy =
      options.resourcePolicy ??
      DaemonResourcePolicy.fromSystemMemory(
        Math.max(options.memoryCapBytes * 2, 512 * 1024 * 1024),
      );
    this.resourcePolicy = resourcePolicy;
    this.navigationWorkerFactory =
      options.navigationWorkerFactory ??
      (options.navigationWorker === undefined
        ? (generation) =>
            new NodeDaemonNavigationWorker({
              generation,
              configuration: {
                stateDirectory: options.identity.stateDirectory,
                policy: policy.toSerialized(),
              },
              resourceLimits: {
                maxOldGenerationSizeMb: resourcePolicy.record.workerMaxOldGenerationSizeMb,
              },
            })
        : undefined);
    this.initialNavigationWorker = options.navigationWorker ?? this.createNavigationWorker(1);
    this.exit = options.exit ?? ((code) => process.exit(code));
    this.lifetime = new DaemonLifetime(
      { now: this.now },
      options.idleTimeoutMs ?? DAEMON_IDLE_TIMEOUT_MS,
      () => this.drainAndShutdown("idle"),
    );
    this.resourceSupervisor = new DaemonResourceSupervisor({
      policy: resourcePolicy,
      generation: this.initialNavigationWorker.generation,
      ...(options.resourceCheckIntervalMs === undefined
        ? {}
        : { intervalMs: options.resourceCheckIntervalMs }),
      ...(options.residentMemoryBytes === undefined
        ? {}
        : { residentMemoryBytes: options.residentMemoryBytes }),
      spoolBytes: () => this.completionSpools.usage().rawBytes,
      scheduleAtTurnBoundary: (operation) => this.requestQueue.scheduleAtTurnBoundary(operation),
      releaseTransientResources: () => this.releaseTransientResources(),
      replaceWorker: (cause) => this.replaceNavigationWorker(cause),
      drain: () => this.initiateResourceDrain(),
    });
    this.operationObserver = new DaemonOperationObserver(
      this.logger,
      this.clock,
      this.resourceSupervisor,
    );
  }

  async start(): Promise<void> {
    this.logger.record({ kind: "start" });
    let startupLease: DaemonStartupLease | undefined;
    let startupHeartbeat: NodeJS.Timeout | undefined;
    try {
      const authorization = await this.waitForStartupAuthorization();
      startupLease = authorization.lease;
      const startingRecord = authorization.record;
      startupHeartbeat = setInterval(
        () => startupLease?.heartbeat(),
        this.options.startupHeartbeatIntervalMs ?? 100,
      );
      startupHeartbeat.unref();
      this.startedAt = startingRecord.startedAt;
      this.server = await this.options.transport.listen(
        this.options.identity.endpoint(this.options.instanceId),
        (request, send) => this.handle(request, send),
      );
      const generation = this.startWorkerGeneration(this.initialNavigationWorker);
      const response = await this.waitForReadyGeneration(generation);
      if (response.kind !== "ready") throw new Error("Navigation worker did not become ready");
      this.fileCount = response.fileCount;
      this.operationObserver.startup({
        kind: "startup-completed",
        workerGeneration: response.generation,
        fileCount: response.fileCount,
        ...response.startupDurations,
      });
      this.logger.record({ kind: "freshness", ...response.refresh });
      await this.resourceSupervisor.sample("warmup");
      this.workerReady = true;
      const readyRecord: DaemonRecord = {
        schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        symnavVersion: this.options.symnavVersion,
        workspaceRoot: this.options.identity.workspaceRoot,
        workspaceKey: this.options.identity.workspaceKey,
        stateKey: this.options.identity.stateKey,
        identityKey: this.options.identity.identityKey,
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        endpoint: this.options.identity.endpoint(this.options.instanceId),
        pid: process.pid,
        state: "ready",
        startedAt: startingRecord.startedAt,
        readyAt: this.now(),
        fileCount: response.fileCount,
        memoryCapBytes: this.options.memoryCapBytes,
      };
      if (!this.options.registry.writeIfStartupOwner(this.options.identity, readyRecord)) {
        throw new Error("Daemon startup ownership changed before readiness publication");
      }
      if (startupHeartbeat !== undefined) clearInterval(startupHeartbeat);
      startupHeartbeat = undefined;
      startupLease.release();
      this.logger.record({ kind: "ready", fileCount: response.fileCount });
      this.resourceSupervisor.start();
      await this.logger.flush();
    } catch (error) {
      if (startupHeartbeat !== undefined) clearInterval(startupHeartbeat);
      await this.cleanupFailedStartup(startupLease);
      this.logger.record({
        kind: "failure",
        operation: "start",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
      await this.logger.flush();
      throw error;
    }
  }

  private async waitForStartupAuthorization(): Promise<{
    readonly lease: DaemonStartupLease;
    readonly record: DaemonRecord;
  }> {
    const deadline = this.now() + DAEMON_STARTUP_TIMEOUT_MS;
    while (this.now() <= deadline) {
      const record = this.options.registry.readInstance(
        this.options.identity,
        this.options.instanceId,
      );
      if (
        record?.state === "starting" &&
        (record.pid === 0 || record.pid === process.pid) &&
        record.processToken === this.options.processToken
      ) {
        const lease = this.options.registry.claimStartupForDaemon(
          this.options.identity,
          this.options.instanceId,
          this.options.processToken,
          process.pid,
        );
        if (lease === undefined) {
          await this.pause();
          continue;
        }
        this.options.registry.writeStartingIfStartupOwner(this.options.identity, {
          ...record,
          pid: process.pid,
        });
        const adoptedRecord = this.options.registry.readInstance(
          this.options.identity,
          this.options.instanceId,
        );
        if (adoptedRecord?.pid !== process.pid) {
          lease.release();
          await this.pause();
          continue;
        }
        if (
          this.options.registry.startupOwnerMatchesProcess(this.options.identity, adoptedRecord)
        ) {
          return { lease, record: adoptedRecord };
        }
        lease.release();
      }
      await this.pause();
    }
    throw new Error("Daemon process did not receive startup authorization");
  }

  private async cleanupFailedStartup(startupLease: DaemonStartupLease | undefined): Promise<void> {
    this.shutdownStarted = true;
    try {
      await (this.workerGeneration?.worker ?? this.initialNavigationWorker).terminate();
    } catch {}
    try {
      await this.server?.close();
    } catch {}
    startupLease?.release();
    this.options.registry.removeIfProcess(
      this.options.identity,
      this.options.instanceId,
      this.options.processToken,
    );
  }

  private async handle(
    request: DaemonRequest,
    send: DaemonServerSend,
  ): Promise<DaemonResponse | void> {
    if (request.kind === "identify") return this.identify(request);
    if (request.kind === "terminate" || request.kind === "kill") {
      return this.terminate(request);
    }
    if (
      request.protocolVersion !== DAEMON_PROTOCOL_VERSION ||
      request.instanceId !== this.options.instanceId
    ) {
      throw new Error("Daemon request does not match protocol or instance");
    }
    if (request.kind === "ping") return this.pong();
    if (
      request.kind === "execute" ||
      request.kind === "execution-status" ||
      request.kind === "result-fetch" ||
      request.kind === "result-ack"
    ) {
      if (request.processToken !== this.options.processToken) {
        throw new Error("Daemon execution request does not match process instance");
      }
    }
    if (request.kind === "execute") return this.acceptExecution(request, send);
    if (request.kind === "result-fetch") {
      let disconnectTraceConnection: (() => void) | undefined;
      if (this.acceptedRequests.entryFor(request.requestId)?.state.state === "completed") {
        const traceWasDisconnected = !this.operationTraceConnections.has(request.requestId);
        disconnectTraceConnection = this.attachOperationTraceConnection(request.requestId, send);
        if (traceWasDisconnected) this.reattachOperationTrace(request.requestId);
      }
      try {
        await this.deliverStoredCompletion(request.requestId, send, request.offset);
      } catch (error) {
        disconnectTraceConnection?.();
        throw error;
      }
      return;
    }
    if (request.kind === "result-ack") {
      const spool = await this.completionSpools.open(request.requestId);
      if (spool === undefined) throw new Error("Accepted request completion is unavailable");
      if (spool.completedManifest?.transferId !== request.transferId) {
        throw new Error("Result acknowledgement does not match completion transfer");
      }
      await spool.acknowledge().catch((error) => {
        this.logger.record({
          kind: "failure",
          operation: "completion-cleanup",
          failureCode: "internal",
          errorName: DaemonLogger.errorName(error),
        });
      });
      this.acceptedRequests.acknowledge(request.requestId);
      this.completeOperationTrace(request.requestId, "delivered");
      return {
        kind: "result-acknowledged",
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        requestId: request.requestId,
        transferId: request.transferId,
      };
    }
    if (request.kind === "execution-status") {
      return {
        kind: "execution-status",
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        requestId: request.requestId,
        status: this.acceptedRequests.status(request.requestId),
      };
    }
    this.beginGracefulShutdown();
    await this.requestQueue.drain();
    await this.waitForCompletionAcknowledgements();
    setTimeout(() => void this.shutdown("graceful"), 0);
    return { kind: "stopped", instanceId: this.options.instanceId };
  }

  private identify(request: Extract<DaemonRequest, { kind: "identify" }>): DaemonResponse {
    if (
      request.instanceId !== this.options.instanceId ||
      request.processToken !== this.options.processToken
    ) {
      throw new Error("Daemon identity request does not match process instance");
    }
    return {
      kind: "identity",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      pid: process.pid,
      startedAt: this.startedAt,
    };
  }

  private async terminate(
    request: Extract<DaemonRequest, { kind: "terminate" | "kill" }>,
  ): Promise<DaemonResponse> {
    if (
      request.instanceId !== this.options.instanceId ||
      request.processToken !== this.options.processToken
    ) {
      throw new Error("Daemon termination does not match process instance");
    }
    this.beginGracefulShutdown();
    if (request.kind === "terminate") {
      await this.requestQueue.drain();
      await this.waitForCompletionAcknowledgements();
      setTimeout(() => void this.shutdown("graceful"), 0);
    } else {
      setTimeout(() => void this.shutdown("graceful", true), 0);
    }
    return {
      kind: request.kind === "terminate" ? "terminating" : "killing",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
    };
  }

  private pong(): DaemonResponse {
    const activity = this.activitySnapshot();
    const active = activity.current;
    return {
      kind: "pong",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: this.options.instanceId,
      symnavVersion: this.options.symnavVersion,
      state:
        activity.lifecycle === "busy"
          ? "busy"
          : activity.lifecycle === "starting"
            ? "starting"
            : "ready",
      startedAt: this.startedAt,
      fileCount: this.fileCount,
      memoryBytes: activity.processRssBytes,
      queued: activity.queued,
      activity,
      ...(active === undefined
        ? {}
        : {
            currentCommand: active.command,
            currentCommandElapsedMs: active.elapsedMs,
          }),
      ...(this.lastNavigationAt === undefined ? {} : { lastNavigationAt: this.lastNavigationAt }),
    };
  }

  private async acceptExecution(
    request: Extract<DaemonRequest, { kind: "execute" }>,
    send: DaemonServerSend,
  ): Promise<DaemonResponse | void> {
    void this.resourceSupervisor.sample("admission").catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "resource-sample",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
    });
    if (!this.workerReady) return this.rejection(request, "not-ready", true);
    if (this.resourceSupervisor.snapshot.admissionPaused) {
      return this.rejection(request, "resource-pressure", true);
    }
    if (this.requestQueue.state !== "accepting") {
      return this.rejection(request, "draining", true);
    }
    const existing = this.acceptedRequests.entryFor(request.requestId);
    let entry;
    try {
      entry = this.acceptedRequests.accept(request.requestId, request.request);
    } catch (error) {
      if (error instanceof AcceptedRequestCorruptionError) {
        return this.rejection(request, "incompatible", false);
      }
      throw error;
    }
    if (entry.state.state === "queued") {
      this.acceptances.set(request.requestId, {
        acceptedAt: entry.state.acceptedAt,
        queuePosition: entry.state.queuePosition,
      });
      if (existing === undefined) {
        const trace = this.operationObserver.start(
          request.requestId,
          WorkspaceDaemon.commandName(request.request.argv),
        );
        this.operationTraces.set(request.requestId, trace);
        trace.accepted(entry.state.queuePosition, this.resourceSupervisor.snapshot.generation);
      }
    }
    const acceptance = this.acceptances.get(request.requestId);
    if (acceptance === undefined) throw new Error("Accepted request is missing admission metadata");
    const traceWasDisconnected = !this.operationTraceConnections.has(request.requestId);
    const disconnectTraceConnection = this.attachOperationTraceConnection(request.requestId, send);
    if (existing === undefined) {
      this.lastNavigationAt = this.now();
      this.lifetime.navigationAccepted();
      void this.executeAccepted(request);
    } else if (traceWasDisconnected) {
      this.reattachOperationTrace(request.requestId);
    }
    try {
      await this.deliver(send, {
        kind: "accepted",
        instanceId: this.options.instanceId,
        processToken: this.options.processToken,
        requestId: request.requestId,
        ...acceptance,
      });
    } catch (error) {
      disconnectTraceConnection();
      throw error;
    }
    if (entry.state.state === "completed") {
      try {
        await this.deliverStoredCompletion(request.requestId, send);
      } catch (error) {
        disconnectTraceConnection();
        throw error;
      }
      return;
    }
    if (entry.state.state === "failed") {
      try {
        await this.deliver(send, this.failedFrame(request.requestId, entry.state.code));
      } catch (error) {
        disconnectTraceConnection();
        throw error;
      }
      this.completeOperationTrace(request.requestId, "delivered");
      return;
    }
    let unsubscribe: (() => void) | undefined;
    unsubscribe = this.acceptedRequests.subscribe(request.requestId, (updated) => {
      if (updated.state.state === "completed") {
        this.trackCompletionDelivery(request.requestId, send, disconnectTraceConnection);
        unsubscribe?.();
      } else if (updated.state.state === "failed") {
        void this.deliver(send, this.failedFrame(request.requestId, updated.state.code))
          .then(() => this.completeOperationTrace(request.requestId, "delivered"))
          .catch((error) =>
            this.recordDeliveryFailure(request.requestId, error, disconnectTraceConnection),
          );
        unsubscribe?.();
      }
    });
  }

  private async executeAccepted(
    request: Extract<DaemonRequest, { kind: "execute" }>,
  ): Promise<void> {
    let spool: CompletionSpool | undefined;
    try {
      await this.requestQueue.enqueue(
        {
          requestId: request.requestId,
          command: WorkspaceDaemon.commandName(request.request.argv),
          acceptedAt: this.clock.monotonicNowMs(),
        },
        async () => {
          this.operationTraces
            .get(request.requestId)
            ?.turnStarted(this.resourceSupervisor.snapshot.generation);
          try {
            spool = await this.completionSpools.create(request.requestId);
            this.acceptedRequests.markRunning(request.requestId, this.now());
            const generation = this.workerGeneration;
            if (generation === undefined) throw new Error("Navigation worker is unavailable");
            const ready = await generation.ready;
            if (ready.kind !== "ready") throw new Error("Navigation worker did not become ready");
            const response = await generation.worker.execute(
              request.requestId,
              request.request,
              spool,
            );
            if (response.kind !== "result" || response.requestId !== request.requestId) {
              throw new Error("Navigation worker returned an uncorrelated result");
            }
            this.resourceSupervisor.workerHeapReported(
              response.generation,
              response.resources.workerHeapUsedBytes,
              response.resources.workerHeapLimitBytes,
              response.resources.peakWorkerHeapUsedBytes,
            );
            this.operationTraces.get(request.requestId)?.workerCompleted(
              {
                freshnessMs: response.durations.freshnessMs,
                navigationMs: response.durations.navigationMs,
                renderMs: response.durations.renderMs,
                workerOutputMs: response.durations.outputMs,
              },
              response.refresh,
            );
            const spoolStartedAt = this.clock.monotonicNowMs();
            const manifest = await spool.finish(response.result.exitCode);
            this.operationTraces
              .get(request.requestId)
              ?.spooled(manifest, Math.max(0, this.clock.monotonicNowMs() - spoolStartedAt));
            const workspaceDeleted = await this.recordCompletion();
            this.operationTraces.get(request.requestId)?.executionTerminated("completed");
            this.acceptedRequests.complete(request.requestId, request.requestId, this.now());
            await this.completionDeliveries.get(request.requestId);
            if (workspaceDeleted) {
              await this.waitForCompletionAcknowledgements();
              setTimeout(() => void this.shutdown("workspace-deleted", true), 0);
            }
          } finally {
            this.scheduleTurnCompleteResourceSample();
          }
        },
      );
    } catch (error) {
      this.operationTraces.get(request.requestId)?.executionTerminated("failed");
      this.logger.record({
        kind: "failure",
        operation: "request",
        failureCode: "internal",
        errorName: DaemonLogger.errorName(error),
      });
      const code =
        (this.resourceInterruptedRequests.delete(request.requestId)
          ? "controlled-resource"
          : undefined) ??
        (error instanceof CompletionSpoolCapacityError
          ? "response-capacity"
          : error instanceof DaemonNavigationWorkerExitedError
            ? this.shutdownFailureCode === "stopping"
              ? "stopping"
              : "worker-exit"
            : (this.shutdownFailureCode ?? (this.shutdownStarted ? "stopping" : "internal")));
      await spool?.dispose().catch((cleanupError) => {
        this.logger.record({
          kind: "failure",
          operation: "completion-cleanup",
          failureCode: "internal",
          errorName: DaemonLogger.errorName(cleanupError),
        });
      });
      this.acceptedRequests.fail(request.requestId, code, this.now());
    } finally {
      if (this.requestQueue.isIdle) this.lifetime.queueBecameIdle();
    }
  }

  private scheduleTurnCompleteResourceSample(): void {
    void this.requestQueue
      .scheduleAtTurnBoundary(() => this.resourceSupervisor.sampleAtTurnBoundary())
      .catch((error) => {
        this.logger.record({
          kind: "failure",
          operation: "resource-sample",
          failureCode: "operation-failed",
          errorName: DaemonLogger.errorName(error),
        });
      })
      .finally(() => {
        if (this.requestQueue.isIdle) this.lifetime.queueBecameIdle();
      });
  }

  private async recordCompletion(): Promise<boolean> {
    this.lastCompletedMonotonicAt = this.clock.monotonicNowMs();
    return !(await this.options.dependencies.fs.exists(this.options.identity.workspaceRoot));
  }

  private rejection(
    request: Extract<DaemonRequest, { kind: "execute" }>,
    code: "not-ready" | "draining" | "resource-pressure" | "incompatible",
    retrySafe: boolean,
  ): DaemonExecutionServerFrame {
    return {
      kind: "rejected",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId: request.requestId,
      code,
      retrySafe,
    };
  }

  private failedFrame(
    requestId: string,
    code: DaemonExecutionFailureCode,
  ): DaemonExecutionServerFrame {
    return {
      kind: "execution-failed",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId,
      code,
    };
  }

  private deliver(send: DaemonServerSend, frame: DaemonServerMessage): Promise<void> {
    return send(frame);
  }

  private async deliverStoredCompletion(
    requestId: string,
    send: DaemonServerSend,
    offset = 0,
  ): Promise<void> {
    const spool = await this.completionSpools.open(requestId);
    if (spool === undefined) throw new Error("Accepted request result is missing");
    try {
      await this.deliverCompletion(requestId, spool, offset, send);
    } catch (error) {
      if (!(error instanceof CompletionSpoolReadError)) throw error;
      this.logger.record({
        kind: "failure",
        operation: "completion-delivery",
        failureCode: "internal",
        errorName: DaemonLogger.errorName(error),
      });
      await spool.dispose().catch((cleanupError) => {
        this.logger.record({
          kind: "failure",
          operation: "completion-cleanup",
          failureCode: "internal",
          errorName: DaemonLogger.errorName(cleanupError),
        });
      });
      this.acceptedRequests.invalidateCompletion(requestId, "internal", this.now());
      await this.deliver(send, this.failedFrame(requestId, "internal"));
      this.completeOperationTrace(requestId, "failed");
    }
  }

  private trackCompletionDelivery(
    requestId: string,
    send: DaemonServerSend,
    disconnectTraceConnection: () => void,
  ): void {
    const delivery = this.deliverStoredCompletion(requestId, send).catch((error) =>
      this.recordDeliveryFailure(requestId, error, disconnectTraceConnection),
    );
    this.completionDeliveries.set(requestId, delivery);
    void delivery.finally(() => {
      if (this.completionDeliveries.get(requestId) === delivery) {
        this.completionDeliveries.delete(requestId);
      }
    });
  }

  private async deliverCompletion(
    requestId: string,
    spool: CompletionSpool,
    offset: number,
    send: DaemonServerSend,
  ): Promise<void> {
    const completedManifest = spool.completedManifest;
    if (completedManifest === undefined) throw new Error("Completion manifest is missing");
    await this.deliver(send, {
      kind: "result-manifest",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId,
      manifest: completedManifest,
    });
    for await (const record of spool.read(offset)) {
      await this.deliver(send, {
        transferId: completedManifest.transferId,
        requestId,
        offset: record.sequence,
        sequence: record.sequence,
        stream: record.stream,
        bytes: record.bytes,
      });
    }
    await this.deliver(send, {
      kind: "result-end",
      instanceId: this.options.instanceId,
      processToken: this.options.processToken,
      requestId,
      transferId: completedManifest.transferId,
      rawBytes: completedManifest.rawBytes,
      recordCount: completedManifest.recordCount,
      sha256: completedManifest.sha256,
    });
    this.terminateOperationDelivery(requestId, "delivered");
  }

  private recordDeliveryFailure(
    requestId: string,
    error: unknown,
    disconnectTraceConnection: () => void,
  ): void {
    disconnectTraceConnection();
    this.logger.record({
      kind: "failure",
      operation: "completion-delivery",
      failureCode: "internal",
      errorName: DaemonLogger.errorName(error),
    });
  }

  private completeOperationTrace(requestId: string, outcome: DaemonDeliveryOutcome): void {
    const expiration = this.operationTraceExpirations.get(requestId);
    if (expiration !== undefined) clearTimeout(expiration);
    this.operationTraceExpirations.delete(requestId);
    this.operationTraceConnections.delete(requestId);
    this.terminateOperationDelivery(requestId, outcome);
    this.operationTraces.delete(requestId);
  }

  private terminateOperationDelivery(requestId: string, outcome: DaemonDeliveryOutcome): void {
    if (!this.acceptedRequests.terminateDelivery(requestId)) return;
    const trace = this.operationTraces.get(requestId);
    if (trace === undefined) this.operationObserver.deliveryTerminated(requestId, outcome, 0);
    else trace.deliveryTerminated(outcome);
  }

  private completeRetainedOperationTraces(): void {
    for (const requestId of this.operationTraces.keys()) {
      this.completeOperationTrace(requestId, "disconnected");
    }
  }

  private disconnectOperationTrace(requestId: string): void {
    if (this.operationTraceExpirations.has(requestId)) return;
    const trace = this.operationTraces.get(requestId);
    if (trace === undefined) return;
    trace.clientDisconnected();
    const expiration = setTimeout(
      () => this.expireOperationTrace(requestId),
      this.options.operationTraceRetentionMs ?? DEFAULT_OPERATION_TRACE_RETENTION_MS,
    );
    expiration.unref();
    this.operationTraceExpirations.set(requestId, expiration);
    this.enforceOperationTraceCapacity();
  }

  private attachOperationTraceConnection(requestId: string, send: DaemonServerSend): () => void {
    const connectionCount = this.operationTraceConnections.get(requestId) ?? 0;
    if (connectionCount === 0) {
      const expiration = this.operationTraceExpirations.get(requestId);
      if (expiration !== undefined) clearTimeout(expiration);
      this.operationTraceExpirations.delete(requestId);
    }
    this.operationTraceConnections.set(requestId, connectionCount + 1);
    let connectionClosed = false;
    const disconnect = (): void => {
      if (connectionClosed) return;
      connectionClosed = true;
      const remainingConnections = (this.operationTraceConnections.get(requestId) ?? 1) - 1;
      if (remainingConnections > 0) {
        this.operationTraceConnections.set(requestId, remainingConnections);
        return;
      }
      this.operationTraceConnections.delete(requestId);
      this.disconnectOperationTrace(requestId);
    };
    send.onClose(disconnect);
    return disconnect;
  }

  private reattachOperationTrace(requestId: string): void {
    if (this.acceptedRequests.isDeliveryTerminated(requestId)) return;
    const trace = this.operationTraces.get(requestId);
    if (trace === undefined) this.operationObserver.reattached(requestId);
    else trace.reattached();
  }

  private expireOperationTrace(requestId: string): void {
    this.operationTraceExpirations.delete(requestId);
    this.operationTraceConnections.delete(requestId);
    if (!this.operationTraces.delete(requestId)) return;
    this.operationObserver.traceExpired(requestId);
  }

  private enforceOperationTraceCapacity(): void {
    const capacity = Math.max(
      1,
      this.options.maximumRetainedOperationTraces ?? DEFAULT_MAXIMUM_RETAINED_OPERATION_TRACES,
    );
    while (this.operationTraceExpirations.size > capacity) {
      const oldestRequestId = this.operationTraceExpirations.keys().next().value as
        | string
        | undefined;
      if (oldestRequestId === undefined) return;
      const expiration = this.operationTraceExpirations.get(oldestRequestId);
      if (expiration !== undefined) clearTimeout(expiration);
      this.expireOperationTrace(oldestRequestId);
    }
  }

  private async drainAndShutdown(reason: "idle"): Promise<void> {
    await this.requestQueue.drain();
    await this.shutdown(reason);
  }

  private beginGracefulShutdown(): void {
    this.shutdownFailureCode ??= "stopping";
    this.resourceSupervisor.stop();
  }

  private async initiateResourceDrain(): Promise<void> {
    await this.waitForCompletionAcknowledgements();
    void this.shutdown("resource", true).catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "resource-drain",
        failureCode: "controlled-resource",
        errorName: DaemonLogger.errorName(error),
      });
    });
  }

  private async waitForCompletionAcknowledgements(): Promise<void> {
    const acknowledgementDeadline = Date.now() + 250;
    while (
      this.acceptedRequests.hasUnacknowledgedCompletions &&
      Date.now() < acknowledgementDeadline
    ) {
      await new Promise((resolve) => setTimeout(resolve, 5));
    }
  }

  private async shutdown(
    reason: "graceful" | "idle" | "resource" | "workspace-deleted",
    force = false,
  ): Promise<void> {
    this.shutdownFailureCode ??= reason === "resource" ? "controlled-resource" : "stopping";
    if (force) this.forceWorkerShutdown();
    if (this.shutdownOperation !== undefined) return this.shutdownOperation;
    this.shutdownStarted = true;
    this.shutdownOperation = this.completeShutdown(reason, force);
    return this.shutdownOperation;
  }

  private async completeShutdown(
    reason: "graceful" | "idle" | "resource" | "workspace-deleted",
    force: boolean,
  ): Promise<void> {
    this.lifetime.stop();
    this.resourceSupervisor.stop();
    if (force) await this.forceWorkerShutdown();
    else await this.gracefullyShutdownWorker();
    this.operationObserver.shutdown({ kind: "shutdown", reason, force });
    this.logger.record({ kind: "stop", reason });
    try {
      await this.server?.close();
    } catch (error) {
      this.logger.record({
        kind: "failure",
        operation: "transport-close",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
    }
    await this.completionSpools.cleanupInstance(this.options.instanceId).catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "completion-cleanup",
        failureCode: "internal",
        errorName: DaemonLogger.errorName(error),
      });
    });
    this.completeRetainedOperationTraces();
    await this.logger.close();
    this.exit(0);
  }

  private async gracefullyShutdownWorker(): Promise<void> {
    await this.requestQueue.drain();
    const gracefulClose = this.currentNavigationWorker().drainAndClose();
    await Promise.race([gracefulClose, this.forceEscalated.then(() => this.forceWorkerShutdown())]);
  }

  private forceWorkerShutdown(): Promise<void> {
    if (this.forcedWorkerShutdown !== undefined) return this.forcedWorkerShutdown;
    this.requestQueue.close();
    this.forcedWorkerShutdown = this.currentNavigationWorker()
      .terminate()
      .then(() => this.requestQueue.drain());
    this.resolveForceEscalated();
    return this.forcedWorkerShutdown;
  }

  private pause(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 10));
  }

  private createNavigationWorker(generation: number): DaemonNavigationWorker {
    const worker = this.navigationWorkerFactory?.(generation);
    if (worker === undefined) throw new Error("Navigation worker replacement is unavailable");
    if (worker.generation !== generation) {
      throw new Error("Navigation worker factory returned the wrong generation");
    }
    return worker;
  }

  private startWorkerGeneration(worker: DaemonNavigationWorker): DaemonWorkerGeneration {
    const generation: DaemonWorkerGeneration = {
      id: worker.generation,
      worker,
      ready: worker.start(this.options.identity.workspaceRoot),
    };
    this.workerGeneration = generation;
    void worker.exited.then((exit) => this.observeWorkerExit(exit));
    return generation;
  }

  private observeWorkerExit(
    exit: import("./daemon-navigation-worker.js").DaemonNavigationWorkerExit,
  ): void {
    if (this.shutdownStarted) return;
    this.logger.record({
      kind: "failure",
      operation: "worker-exit",
      failureCode: "worker-exit",
      errorName: DaemonLogger.errorName(
        exit.errorName === undefined ? undefined : { name: exit.errorName },
      ),
    });
    const recovery = this.resourceSupervisor.workerExited(exit);
    this.workerRecoveryOperation = recovery;
    void recovery.catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "worker-replacement",
        failureCode: "controlled-resource",
        errorName: DaemonLogger.errorName(error),
      });
    });
  }

  private async waitForReadyGeneration(
    generation: DaemonWorkerGeneration,
  ): Promise<DaemonNavigationWorkerResponse> {
    try {
      return await generation.ready;
    } catch (error) {
      if (!(error instanceof DaemonNavigationWorkerExitedError)) throw error;
      await generation.worker.exited;
      const recovery = this.workerRecoveryOperation;
      if (recovery === undefined) throw error;
      await recovery;
      const replacement = this.workerGeneration;
      if (replacement === undefined || replacement.id === generation.id) throw error;
      return replacement.ready;
    }
  }

  private async replaceNavigationWorker(cause: DaemonWorkerReplacementCause): Promise<number> {
    const current = this.workerGeneration;
    if (current === undefined) throw new Error("Navigation worker generation is unavailable");
    const activeRequest = this.requestQueue.snapshot.active;
    if (activeRequest !== undefined && cause !== "worker-exit") {
      this.resourceInterruptedRequests.add(activeRequest.requestId);
    }
    const nextWorker = this.createNavigationWorker(current.id + 1);
    this.workerReady = false;
    const next = this.startWorkerGeneration(nextWorker);
    await current.worker.terminate().catch(() => undefined);
    const response = await next.ready;
    if (response.kind !== "ready") throw new Error("Replacement navigation worker did not start");
    this.fileCount = response.fileCount;
    this.workerReady = true;
    this.operationObserver.worker({
      kind: "worker-replaced",
      cause,
      previousWorkerGeneration: current.id,
      workerGeneration: next.id,
      fileCount: response.fileCount,
      ...response.startupDurations,
    });
    this.logger.record({ kind: "freshness", ...response.refresh });
    return next.id;
  }

  private async releaseTransientResources(): Promise<void> {
    const generation = this.workerGeneration;
    if (generation === undefined) return;
    const response = await generation.worker.releaseTransientResources();
    if (response.kind !== "heap") throw new Error("Navigation worker did not report heap usage");
    this.resourceSupervisor.workerHeapReported(
      response.generation,
      response.usedHeapBytes,
      response.heapLimitBytes,
    );
    this.operationObserver.worker({
      kind: "resources-released",
      workerGeneration: response.generation,
      workerHeapUsedBytes: response.usedHeapBytes,
      workerHeapLimitBytes: response.heapLimitBytes,
    });
  }

  private currentNavigationWorker(): DaemonNavigationWorker {
    return this.workerGeneration?.worker ?? this.initialNavigationWorker;
  }

  private activitySnapshot(): DaemonActivitySnapshot {
    const queue = this.requestQueue.snapshot;
    const resources = this.resourceSupervisor.snapshot;
    const now = this.clock.monotonicNowMs();
    const lifecycle: DaemonActivitySnapshot["lifecycle"] =
      queue.state !== "accepting" || resources.state === "draining" || resources.state === "stopped"
        ? "draining"
        : resources.state === "replacing" || resources.state === "shedding"
          ? "recovering"
          : !this.workerReady
            ? "starting"
            : queue.active === undefined
              ? "ready"
              : "busy";
    const current =
      lifecycle !== "busy" || queue.active === undefined
        ? undefined
        : Object.freeze({
            requestId: queue.active.requestId,
            command: queue.active.command,
            elapsedMs: Math.max(0, now - queue.active.startedAt),
          });
    const recoveryDetail: DaemonActivitySnapshot["recoveryDetail"] =
      resources.state === "replacing"
        ? "worker-replacement"
        : resources.state === "shedding"
          ? "resource-pressure"
          : undefined;
    return Object.freeze({
      lifecycle,
      ...(recoveryDetail === undefined ? {} : { recoveryDetail }),
      pid: process.pid,
      startedAt: this.startedAt,
      startupElapsedMs: Math.max(0, now - this.startedMonotonicAt),
      ...(this.workerReady ? { fileCount: this.fileCount } : {}),
      processRssBytes: process.memoryUsage().rss,
      hardProcessRssBytes: this.resourcePolicy.record.hardProcessRssBytes,
      ...(resources.workerHeapUsedBytes === undefined
        ? {}
        : { workerHeapUsedBytes: resources.workerHeapUsedBytes }),
      workerGeneration: this.workerGeneration?.id ?? resources.generation,
      ...(current === undefined ? {} : { current }),
      queued: queue.queued,
      ...(this.lastCompletedMonotonicAt === undefined
        ? {}
        : { lastCompletedAgoMs: Math.max(0, now - this.lastCompletedMonotonicAt) }),
      spoolBytes: resources.spoolBytes,
    });
  }

  private static commandName(argv: readonly string[]): DaemonCommandName {
    const commands: readonly DaemonCommandName[] = [
      "overview",
      "resolve",
      "def",
      "refs",
      "context",
      "graph",
      "stats",
    ];
    const command = argv.find((argument): argument is DaemonCommandName =>
      commands.includes(argument as DaemonCommandName),
    );
    if (command !== undefined) return command;
    if (argv.includes("--version") || argv.includes("-v")) return "version";
    if (argv.includes("--help") || argv.includes("-h")) return "help";
    return "unknown";
  }
}
`},"base:apps/cli/src/daemon/daemon-entry.ts":{path:"apps/cli/src/daemon/daemon-entry.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"fbe17700d6a2d75541d526da8347b08348ba5cf24426ee2e12c165747271a1f9",text:`import { createDefaultDependencies } from "../program.js";
import { DaemonPolicy } from "@symnav/daemon";
import { NodeDaemonClock } from "./daemon-clock.js";
import { DaemonLogger } from "./daemon-logger.js";
import { DaemonProcessConfigurationParser } from "./daemon-process-launcher.js";
import { DaemonProcessTerminationObserver } from "./daemon-process-termination-observer.js";
import { DaemonRegistry } from "./daemon-registry.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import { LocalDaemonTransport } from "./local-daemon-transport.js";
import { DaemonResourcePolicy } from "./daemon-resource-monitor.js";
import { WorkspaceDaemon } from "./workspace-daemon.js";

class DaemonEntry {
  static async run(encodedConfiguration: string | undefined): Promise<void> {
    const configuration = DaemonProcessConfigurationParser.parse(encodedConfiguration);
    const identity = DaemonWorkspaceIdentity.from(
      configuration.workspaceRoot,
      configuration.stateDirectory,
    );
    if (
      identity.workspaceKey !== configuration.workspaceKey ||
      identity.stateKey !== configuration.stateKey ||
      identity.identityKey !== configuration.identityKey ||
      identity.endpoint(configuration.instanceId) !== configuration.endpoint
    )
      throw new Error("Daemon process identity does not match configuration");
    const policy = DaemonPolicy.fromSerialized(configuration.policy);
    const dependencies = createDefaultDependencies(configuration.stateDirectory, policy);
    if (dependencies.symnavVersion !== configuration.symnavVersion) {
      throw new Error("Daemon process version does not match launcher");
    }
    const registry = new DaemonRegistry(identity.registryDirectory);
    const clock = new NodeDaemonClock();
    const logger = new DaemonLogger(identity, configuration.instanceId, clock);
    new DaemonProcessTerminationObserver(logger, () => {
      registry.removeIfProcess(identity, configuration.instanceId, configuration.processToken);
    }).install();
    await new WorkspaceDaemon({
      identity,
      instanceId: configuration.instanceId,
      processToken: configuration.processToken,
      symnavVersion: configuration.symnavVersion,
      memoryCapBytes: policy.values.resources.hardProcessRssBytes,
      resourcePolicy: DaemonResourcePolicy.fromSystemMemory(
        policy.values.resources.effectiveMemoryBytes,
      ),
      policy,
      dependencies,
      registry,
      transport: new LocalDaemonTransport(),
      clock,
      logger,
    }).start();
  }
}

await DaemonEntry.run(process.argv[2]);
`},"head:apps/cli/src/daemon/daemon-lifetime.ts":{path:"apps/cli/src/daemon/daemon-lifetime.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"b6b195e5015d9a18e2065d2a2b8b6a3886dcaf6adb95229d33f915c45972e697",text:`import type { Clock } from "@symnav/telemetry";
import type { DaemonPolicyValues } from "@symnav/daemon";

export class DaemonLifetime {
  private timer: ReturnType<typeof setTimeout> | undefined;
  private deadline: number;
  private navigationActive = false;
  private stopped = false;
  private idleTriggered = false;

  constructor(
    private readonly clock: Clock,
    policy: Pick<DaemonPolicyValues["shutdown"], "idleTimeoutMs">,
    private readonly onIdle: () => Promise<void>,
  ) {
    this.idleTimeoutMs = policy.idleTimeoutMs;
    this.deadline = this.clock.now() + this.idleTimeoutMs;
    this.schedule();
  }

  private readonly idleTimeoutMs: number;

  navigationAccepted(): void {
    if (this.stopped) return;
    this.navigationActive = true;
    this.deadline = this.clock.now() + this.idleTimeoutMs;
    this.schedule();
  }

  queueBecameIdle(): void {
    if (this.stopped) return;
    this.navigationActive = false;
    if (this.clock.now() >= this.deadline) this.triggerIdle();
  }

  stop(): void {
    this.stopped = true;
    if (this.timer !== undefined) clearTimeout(this.timer);
    this.timer = undefined;
  }

  private schedule(): void {
    if (this.timer !== undefined) clearTimeout(this.timer);
    const remainingMs = Math.max(0, this.deadline - this.clock.now());
    this.timer = setTimeout(() => this.deadlineReached(), remainingMs);
    this.timer.unref?.();
  }

  private deadlineReached(): void {
    this.timer = undefined;
    if (this.stopped || this.navigationActive) return;
    this.triggerIdle();
  }

  private triggerIdle(): void {
    if (this.idleTriggered) return;
    this.idleTriggered = true;
    void this.onIdle();
  }
}
`},"head:apps/cli/src/daemon/daemon-resource-monitor.ts":{path:"apps/cli/src/daemon/daemon-resource-monitor.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"f841a7a9abc9f20fc08027caa7eaa082d581c371a2d4c70e5bc94d195c2f8177",text:`import type { DaemonPolicyValues } from "@symnav/daemon";
import type { DaemonWorkerReplacementCause } from "./daemon-protocol.js";

export type DaemonResourceState =
  | "warming"
  | "ready"
  | "active"
  | "shedding"
  | "replacing"
  | "draining"
  | "stopped";

export interface DaemonResourceSnapshot {
  readonly state: DaemonResourceState;
  readonly generation: number;
  readonly processRssBytes: number;
  readonly peakProcessRssBytes: number;
  readonly workerHeapUsedBytes?: number;
  readonly peakWorkerHeapUsedBytes?: number;
  readonly workerHeapLimitBytes?: number;
  readonly spoolBytes: number;
  readonly admissionPaused: boolean;
  readonly replacementCount: number;
}

export interface DaemonResourceSupervisorOptions {
  readonly policy: DaemonPolicyValues["resources"];
  readonly generation: number;
  readonly now?: () => number;
  readonly residentMemoryBytes?: () => number;
  readonly spoolBytes: () => number;
  readonly scheduleAtTurnBoundary: (operation: () => Promise<void>) => Promise<void>;
  readonly releaseTransientResources: () => Promise<void>;
  readonly replaceWorker: (cause: DaemonWorkerReplacementCause) => Promise<number>;
  readonly drain: () => Promise<void>;
}

export type { DaemonWorkerReplacementCause } from "./daemon-protocol.js";

export class DaemonResourceSupervisor {
  private readonly residentMemoryBytes: () => number;
  private readonly now: () => number;
  private timer: ReturnType<typeof setInterval> | undefined;
  private currentState: DaemonResourceState = "ready";
  private currentGeneration: number;
  private currentProcessRssBytes = 0;
  private peakProcessRssBytes = 0;
  private currentSpoolBytes = 0;
  private admissionPaused = false;
  private shedCompleted = false;
  private shedOperation: Promise<void> | undefined;
  private workerHeapUsedBytes: number | undefined;
  private peakWorkerHeapUsedBytes: number | undefined;
  private workerHeapLimitBytes: number | undefined;
  private replacementCount = 0;
  private replacementTimes: number[] = [];
  private replacementOperation: Promise<void> | undefined;

  constructor(private readonly options: DaemonResourceSupervisorOptions) {
    this.currentGeneration = options.generation;
    this.now = options.now ?? Date.now;
    this.residentMemoryBytes = options.residentMemoryBytes ?? (() => process.memoryUsage().rss);
  }

  get snapshot(): DaemonResourceSnapshot {
    return Object.freeze({
      state: this.currentState,
      generation: this.currentGeneration,
      processRssBytes: this.currentProcessRssBytes,
      peakProcessRssBytes: this.peakProcessRssBytes,
      ...(this.workerHeapUsedBytes === undefined
        ? {}
        : { workerHeapUsedBytes: this.workerHeapUsedBytes }),
      ...(this.peakWorkerHeapUsedBytes === undefined
        ? {}
        : { peakWorkerHeapUsedBytes: this.peakWorkerHeapUsedBytes }),
      ...(this.workerHeapLimitBytes === undefined
        ? {}
        : { workerHeapLimitBytes: this.workerHeapLimitBytes }),
      spoolBytes: this.currentSpoolBytes,
      admissionPaused: this.admissionPaused,
      replacementCount: this.replacementCount,
    });
  }

  start(): void {
    if (this.timer !== undefined || this.currentState === "stopped") return;
    this.timer = setInterval(
      () => void this.sample("interval").catch(() => undefined),
      this.options.policy.supervisionIntervalMs,
    );
    this.timer.unref?.();
  }

  async sample(reason: "warmup" | "interval" | "admission" | "turn-complete"): Promise<void> {
    await this.sampleWithinBoundary(this.options.scheduleAtTurnBoundary);
  }

  async sampleAtTurnBoundary(): Promise<void> {
    await this.sampleWithinBoundary((operation) => operation());
  }

  private async sampleWithinBoundary(
    runAtBoundary: (operation: () => Promise<void>) => Promise<void>,
  ): Promise<void> {
    if (this.currentState === "draining" || this.currentState === "stopped") return;
    this.captureUsage();
    const policy = this.options.policy;
    if (this.currentProcessRssBytes >= policy.hardProcessRssBytes) {
      await this.replace("hard-pressure");
      return;
    }
    if (this.currentProcessRssBytes <= policy.resumeProcessRssBytes) {
      this.admissionPaused = false;
      this.shedCompleted = false;
      this.currentState = "ready";
      return;
    }
    if (this.currentProcessRssBytes < policy.softProcessRssBytes) return;
    this.admissionPaused = true;
    this.currentState = "shedding";
    if (this.shedCompleted) return;
    await this.shed(runAtBoundary);
  }

  workerHeapReported(
    generation: number,
    usedBytes: number,
    limitBytes: number,
    peakUsedBytes = usedBytes,
  ): void {
    if (generation !== this.currentGeneration) return;
    this.workerHeapUsedBytes = usedBytes;
    this.workerHeapLimitBytes = limitBytes;
    this.peakWorkerHeapUsedBytes = Math.max(this.peakWorkerHeapUsedBytes ?? 0, peakUsedBytes);
  }

  async workerExited(exit: import("./daemon-navigation-worker.js").DaemonNavigationWorkerExit) {
    if (exit.generation !== this.currentGeneration || this.currentState === "stopped") return;
    await this.replace(exit.cause === "out-of-memory" ? "out-of-memory" : "worker-exit");
  }

  stop(): void {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    this.currentState = "stopped";
  }

  private captureUsage(): void {
    this.currentProcessRssBytes = this.residentMemoryBytes();
    this.peakProcessRssBytes = Math.max(this.peakProcessRssBytes, this.currentProcessRssBytes);
    this.currentSpoolBytes = this.options.spoolBytes();
  }

  private replace(cause: DaemonWorkerReplacementCause): Promise<void> {
    if (this.replacementOperation !== undefined) return this.replacementOperation;
    const cutoff = this.now() - this.options.policy.replacementWindowMs;
    this.replacementTimes = this.replacementTimes.filter((replacedAt) => replacedAt > cutoff);
    if (this.replacementTimes.length >= this.options.policy.replacementLimit) {
      this.currentState = "draining";
      this.admissionPaused = true;
      this.replacementOperation = this.options.drain().finally(() => {
        this.replacementOperation = undefined;
      });
      return this.replacementOperation;
    }
    this.currentState = "replacing";
    this.admissionPaused = true;
    this.replacementOperation = this.options
      .replaceWorker(cause)
      .then((generation) => {
        this.currentGeneration = generation;
        this.workerHeapUsedBytes = undefined;
        this.workerHeapLimitBytes = undefined;
        this.replacementCount += 1;
        this.replacementTimes.push(this.now());
        this.shedCompleted = false;
        this.admissionPaused = false;
        this.currentState = "ready";
      })
      .catch(async (error: unknown) => {
        this.currentState = "draining";
        await this.options.drain();
        throw error;
      })
      .finally(() => {
        this.replacementOperation = undefined;
      });
    return this.replacementOperation;
  }

  private async shed(
    runAtBoundary: (operation: () => Promise<void>) => Promise<void>,
  ): Promise<void> {
    if (this.shedOperation !== undefined) return this.shedOperation;
    const operation = runAtBoundary(async () => {
      try {
        await this.options.releaseTransientResources();
        this.shedCompleted = true;
      } catch (error) {
        await this.replace("shed-failure");
        throw error;
      }
    });
    this.shedOperation = operation;
    try {
      await operation;
    } finally {
      if (this.shedOperation === operation) this.shedOperation = undefined;
    }
  }
}
`},"base:apps/cli/src/daemon/daemon-resource-monitor.ts":{path:"apps/cli/src/daemon/daemon-resource-monitor.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"7ea7ba1227115eb9fedf680ef33dc4fe67959441c5ad758074176677dc31e773",text:`import type { DaemonWorkerReplacementCause } from "./daemon-protocol.js";

const MEBIBYTE = 1024 * 1024;
const MINIMUM_PROCESS_MEMORY_MIB = 256;
const MAXIMUM_PROCESS_MEMORY_MIB = 8 * 1024;
const MINIMUM_WORKER_OLD_GENERATION_MIB = 128;
const MAXIMUM_WORKER_OLD_GENERATION_MIB = 4 * 1024;

export const DAEMON_RESOURCE_SAMPLE_INTERVAL_MS = 250;
export const DAEMON_RESOURCE_RESTART_WINDOW_MS = 10 * 60 * 1000;
export const DAEMON_RESOURCE_RESTART_LIMIT = 2;

export interface DaemonResourcePolicyRecord {
  readonly effectiveMemoryBytes: number;
  readonly hardProcessRssBytes: number;
  readonly softProcessRssBytes: number;
  readonly resumeProcessRssBytes: number;
  readonly workerMaxOldGenerationSizeMb: number;
}

export class DaemonResourcePolicy {
  private constructor(readonly record: DaemonResourcePolicyRecord) {}

  static fromSystemMemory(
    totalMemoryBytes: number,
    constrainedMemoryBytes?: number,
  ): DaemonResourcePolicy {
    const effectiveMemoryBytes =
      constrainedMemoryBytes !== undefined &&
      constrainedMemoryBytes > 0 &&
      constrainedMemoryBytes < totalMemoryBytes
        ? constrainedMemoryBytes
        : totalMemoryBytes;
    const effectiveMemoryMib = Math.max(1, Math.floor(effectiveMemoryBytes / MEBIBYTE));
    const hardProcessRssMib = DaemonResourcePolicy.clamp(
      Math.floor(effectiveMemoryMib / 2),
      MINIMUM_PROCESS_MEMORY_MIB,
      MAXIMUM_PROCESS_MEMORY_MIB,
    );
    const workerMaxOldGenerationSizeMb = DaemonResourcePolicy.clamp(
      Math.floor(effectiveMemoryMib / 4),
      MINIMUM_WORKER_OLD_GENERATION_MIB,
      MAXIMUM_WORKER_OLD_GENERATION_MIB,
    );
    return new DaemonResourcePolicy({
      effectiveMemoryBytes,
      hardProcessRssBytes: hardProcessRssMib * MEBIBYTE,
      softProcessRssBytes: Math.floor(hardProcessRssMib * 0.8) * MEBIBYTE,
      resumeProcessRssBytes: Math.floor(hardProcessRssMib * 0.7) * MEBIBYTE,
      workerMaxOldGenerationSizeMb,
    });
  }

  private static clamp(value: number, minimum: number, maximum: number): number {
    return Math.max(minimum, Math.min(maximum, value));
  }
}

export type DaemonResourceState =
  | "warming"
  | "ready"
  | "active"
  | "shedding"
  | "replacing"
  | "draining"
  | "stopped";

export interface DaemonResourceSnapshot {
  readonly state: DaemonResourceState;
  readonly generation: number;
  readonly processRssBytes: number;
  readonly peakProcessRssBytes: number;
  readonly workerHeapUsedBytes?: number;
  readonly peakWorkerHeapUsedBytes?: number;
  readonly workerHeapLimitBytes?: number;
  readonly spoolBytes: number;
  readonly admissionPaused: boolean;
  readonly replacementCount: number;
}

export interface DaemonResourceSupervisorOptions {
  readonly policy: DaemonResourcePolicy;
  readonly generation: number;
  readonly now?: () => number;
  readonly intervalMs?: number;
  readonly residentMemoryBytes?: () => number;
  readonly spoolBytes: () => number;
  readonly scheduleAtTurnBoundary: (operation: () => Promise<void>) => Promise<void>;
  readonly releaseTransientResources: () => Promise<void>;
  readonly replaceWorker: (cause: DaemonWorkerReplacementCause) => Promise<number>;
  readonly drain: () => Promise<void>;
}

export type { DaemonWorkerReplacementCause } from "./daemon-protocol.js";

export class DaemonResourceSupervisor {
  private readonly residentMemoryBytes: () => number;
  private readonly now: () => number;
  private timer: ReturnType<typeof setInterval> | undefined;
  private currentState: DaemonResourceState = "ready";
  private currentGeneration: number;
  private currentProcessRssBytes = 0;
  private peakProcessRssBytes = 0;
  private currentSpoolBytes = 0;
  private admissionPaused = false;
  private shedCompleted = false;
  private shedOperation: Promise<void> | undefined;
  private workerHeapUsedBytes: number | undefined;
  private peakWorkerHeapUsedBytes: number | undefined;
  private workerHeapLimitBytes: number | undefined;
  private replacementCount = 0;
  private replacementTimes: number[] = [];
  private replacementOperation: Promise<void> | undefined;

  constructor(private readonly options: DaemonResourceSupervisorOptions) {
    this.currentGeneration = options.generation;
    this.now = options.now ?? Date.now;
    this.residentMemoryBytes = options.residentMemoryBytes ?? (() => process.memoryUsage().rss);
  }

  get snapshot(): DaemonResourceSnapshot {
    return Object.freeze({
      state: this.currentState,
      generation: this.currentGeneration,
      processRssBytes: this.currentProcessRssBytes,
      peakProcessRssBytes: this.peakProcessRssBytes,
      ...(this.workerHeapUsedBytes === undefined
        ? {}
        : { workerHeapUsedBytes: this.workerHeapUsedBytes }),
      ...(this.peakWorkerHeapUsedBytes === undefined
        ? {}
        : { peakWorkerHeapUsedBytes: this.peakWorkerHeapUsedBytes }),
      ...(this.workerHeapLimitBytes === undefined
        ? {}
        : { workerHeapLimitBytes: this.workerHeapLimitBytes }),
      spoolBytes: this.currentSpoolBytes,
      admissionPaused: this.admissionPaused,
      replacementCount: this.replacementCount,
    });
  }

  start(): void {
    if (this.timer !== undefined || this.currentState === "stopped") return;
    this.timer = setInterval(
      () => void this.sample("interval").catch(() => undefined),
      this.options.intervalMs ?? DAEMON_RESOURCE_SAMPLE_INTERVAL_MS,
    );
    this.timer.unref?.();
  }

  async sample(reason: "warmup" | "interval" | "admission" | "turn-complete"): Promise<void> {
    await this.sampleWithinBoundary(this.options.scheduleAtTurnBoundary);
  }

  async sampleAtTurnBoundary(): Promise<void> {
    await this.sampleWithinBoundary((operation) => operation());
  }

  private async sampleWithinBoundary(
    runAtBoundary: (operation: () => Promise<void>) => Promise<void>,
  ): Promise<void> {
    if (this.currentState === "draining" || this.currentState === "stopped") return;
    this.captureUsage();
    const policy = this.options.policy.record;
    if (this.currentProcessRssBytes >= policy.hardProcessRssBytes) {
      await this.replace("hard-pressure");
      return;
    }
    if (this.currentProcessRssBytes <= policy.resumeProcessRssBytes) {
      this.admissionPaused = false;
      this.shedCompleted = false;
      this.currentState = "ready";
      return;
    }
    if (this.currentProcessRssBytes < policy.softProcessRssBytes) return;
    this.admissionPaused = true;
    this.currentState = "shedding";
    if (this.shedCompleted) return;
    await this.shed(runAtBoundary);
  }

  workerHeapReported(
    generation: number,
    usedBytes: number,
    limitBytes: number,
    peakUsedBytes = usedBytes,
  ): void {
    if (generation !== this.currentGeneration) return;
    this.workerHeapUsedBytes = usedBytes;
    this.workerHeapLimitBytes = limitBytes;
    this.peakWorkerHeapUsedBytes = Math.max(this.peakWorkerHeapUsedBytes ?? 0, peakUsedBytes);
  }

  async workerExited(exit: import("./daemon-navigation-worker.js").DaemonNavigationWorkerExit) {
    if (exit.generation !== this.currentGeneration || this.currentState === "stopped") return;
    await this.replace(exit.cause === "out-of-memory" ? "out-of-memory" : "worker-exit");
  }

  stop(): void {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    this.currentState = "stopped";
  }

  private captureUsage(): void {
    this.currentProcessRssBytes = this.residentMemoryBytes();
    this.peakProcessRssBytes = Math.max(this.peakProcessRssBytes, this.currentProcessRssBytes);
    this.currentSpoolBytes = this.options.spoolBytes();
  }

  private replace(cause: DaemonWorkerReplacementCause): Promise<void> {
    if (this.replacementOperation !== undefined) return this.replacementOperation;
    const cutoff = this.now() - DAEMON_RESOURCE_RESTART_WINDOW_MS;
    this.replacementTimes = this.replacementTimes.filter((replacedAt) => replacedAt > cutoff);
    if (this.replacementTimes.length >= DAEMON_RESOURCE_RESTART_LIMIT) {
      this.currentState = "draining";
      this.admissionPaused = true;
      this.replacementOperation = this.options.drain().finally(() => {
        this.replacementOperation = undefined;
      });
      return this.replacementOperation;
    }
    this.currentState = "replacing";
    this.admissionPaused = true;
    this.replacementOperation = this.options
      .replaceWorker(cause)
      .then((generation) => {
        this.currentGeneration = generation;
        this.workerHeapUsedBytes = undefined;
        this.workerHeapLimitBytes = undefined;
        this.replacementCount += 1;
        this.replacementTimes.push(this.now());
        this.shedCompleted = false;
        this.admissionPaused = false;
        this.currentState = "ready";
      })
      .catch(async (error: unknown) => {
        this.currentState = "draining";
        await this.options.drain();
        throw error;
      })
      .finally(() => {
        this.replacementOperation = undefined;
      });
    return this.replacementOperation;
  }

  private async shed(
    runAtBoundary: (operation: () => Promise<void>) => Promise<void>,
  ): Promise<void> {
    if (this.shedOperation !== undefined) return this.shedOperation;
    const operation = runAtBoundary(async () => {
      try {
        await this.options.releaseTransientResources();
        this.shedCompleted = true;
      } catch (error) {
        await this.replace("shed-failure");
        throw error;
      }
    });
    this.shedOperation = operation;
    try {
      await operation;
    } finally {
      if (this.shedOperation === operation) this.shedOperation = undefined;
    }
  }
}
`},"head:apps/cli/src/daemon/daemon-logger.ts":{path:"apps/cli/src/daemon/daemon-logger.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"e8df7f090ed0b1aef01f0c9c94e00e619f4f73901c0fb5e10fa2af6b195d33c1",text:`import { chmod, mkdir, open, rename, rm, stat, appendFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname } from "node:path";
import type { DaemonPolicyValues } from "@symnav/daemon";
import type { DaemonClock } from "./daemon-clock.js";
import {
  DAEMON_DIAGNOSTIC_SCHEMA_VERSION,
  type DaemonCommandName,
  type DaemonDiagnosticErrorName,
  type DaemonDiagnosticEvent,
} from "./daemon-protocol.js";
import type { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";

const DIAGNOSTIC_FIELDS = [
  "schemaVersion",
  "timestamp",
  "instanceId",
  "workspaceKey",
  "kind",
  "requestId",
  "command",
  "queueDepth",
  "queuePosition",
  "workerGeneration",
  "previousWorkerGeneration",
  "queueWaitMs",
  "freshnessMs",
  "navigationMs",
  "renderMs",
  "workerOutputMs",
  "added",
  "changed",
  "removed",
  "unchanged",
  "rawBytes",
  "recordCount",
  "spoolMs",
  "outcome",
  "serviceMs",
  "deliveryMs",
  "processRssBytes",
  "peakProcessRssBytes",
  "peakWorkerHeapUsedBytes",
  "workerHeapUsedBytes",
  "workerHeapLimitBytes",
  "spoolBytes",
  "fileCount",
  "discoveryMs",
  "indexingMs",
  "totalMs",
  "durationMs",
  "exitCode",
  "reason",
  "cause",
  "force",
  "operation",
  "failureCode",
  "errorName",
  "terminationReason",
  "signal",
  "droppedCount",
] as const;

const DIAGNOSTIC_KINDS = new Set([
  "start",
  "ready",
  "acceptance",
  "request",
  "freshness",
  "stop",
  "failure",
  "request-accepted",
  "turn-started",
  "worker-completed",
  "response-spooled",
  "execution-terminal",
  "client-disconnected",
  "client-reattached",
  "operation-trace-expired",
  "delivery-terminal",
  "diagnostics-dropped",
  "startup-completed",
  "resources-released",
  "worker-replaced",
  "shutdown",
  "process-termination",
]);

const COMMAND_NAMES = new Set<DaemonCommandName>([
  "overview",
  "resolve",
  "def",
  "refs",
  "context",
  "graph",
  "stats",
  "help",
  "version",
  "unknown",
]);

const ERROR_NAMES = new Set<DaemonDiagnosticErrorName>([
  "Error",
  "TypeError",
  "RangeError",
  "SyntaxError",
  "ReferenceError",
  "DaemonNavigationWorkerExitedError",
  "CompletionSpoolCapacityError",
  "CompletionSpoolReadError",
  "UnknownError",
]);

const CLOSED_DIAGNOSTIC_VALUES = new Map<string, ReadonlySet<string>>([
  [
    "operation",
    new Set([
      "start",
      "request",
      "resource-sample",
      "resource-drain",
      "worker-exit",
      "worker-replacement",
      "completion-delivery",
      "completion-cleanup",
      "transport-close",
      "diagnostics-write",
      "diagnostics-rotation",
    ]),
  ],
  [
    "failureCode",
    new Set([
      "worker-exit",
      "controlled-resource",
      "response-capacity",
      "stopping",
      "internal",
      "operation-failed",
    ]),
  ],
  ["outcome", new Set(["completed", "failed", "delivered", "disconnected"])],
  ["reason", new Set(["graceful", "idle", "resource", "workspace-deleted"])],
  ["cause", new Set(["hard-pressure", "out-of-memory", "shed-failure", "worker-exit"])],
  ["terminationReason", new Set(["uncaught-exception", "unhandled-rejection", "signal"])],
  ["signal", new Set(["SIGTERM", "SIGINT", "SIGHUP"])],
]);

const NUMERIC_DIAGNOSTIC_FIELDS = new Set([
  "queueDepth",
  "queuePosition",
  "workerGeneration",
  "previousWorkerGeneration",
  "queueWaitMs",
  "freshnessMs",
  "navigationMs",
  "renderMs",
  "workerOutputMs",
  "added",
  "changed",
  "removed",
  "unchanged",
  "rawBytes",
  "recordCount",
  "spoolMs",
  "serviceMs",
  "deliveryMs",
  "processRssBytes",
  "peakProcessRssBytes",
  "peakWorkerHeapUsedBytes",
  "workerHeapUsedBytes",
  "workerHeapLimitBytes",
  "spoolBytes",
  "fileCount",
  "discoveryMs",
  "indexingMs",
  "totalMs",
  "durationMs",
  "exitCode",
  "droppedCount",
]);

export interface DaemonLogStorage {
  prepare(directory: string, logPath: string): Promise<void>;
  size(path: string): Promise<number>;
  append(path: string, line: string): Promise<void>;
  move(source: string, destination: string): Promise<void>;
  remove(path: string): Promise<void>;
  sync(path: string): Promise<void>;
}

interface DaemonLoggerOptions {
  readonly policy: DaemonPolicyValues["diagnostics"];
  readonly storage?: DaemonLogStorage;
}

class NodeDaemonLogStorage implements DaemonLogStorage {
  async prepare(directory: string, logPath: string): Promise<void> {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    await chmod(directory, 0o700);
    await appendFile(logPath, "", { encoding: "utf8", flag: "a", mode: 0o600 });
    await chmod(logPath, 0o600);
  }

  async size(path: string): Promise<number> {
    try {
      return (await stat(path)).size;
    } catch (error) {
      if (NodeDaemonLogStorage.errorCode(error) === "ENOENT") return 0;
      throw error;
    }
  }

  append(path: string, line: string): Promise<void> {
    return appendFile(path, line, { encoding: "utf8", flag: "a", mode: 0o600 });
  }

  async move(source: string, destination: string): Promise<void> {
    try {
      await rename(source, destination);
    } catch (error) {
      if (NodeDaemonLogStorage.errorCode(error) !== "ENOENT") throw error;
    }
  }

  remove(path: string): Promise<void> {
    return rm(path, { force: true });
  }

  async sync(path: string): Promise<void> {
    let file;
    try {
      file = await open(path, "r");
      await file.sync();
    } catch (error) {
      if (NodeDaemonLogStorage.errorCode(error) !== "ENOENT") throw error;
    } finally {
      await file?.close();
    }
  }

  private static errorCode(error: unknown): string | undefined {
    return typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : undefined;
  }
}

export class DaemonLogger {
  private readonly rotateBytes: number;
  private readonly maximumQueuedEvents: number;
  private readonly backupCount: number;
  private readonly storage: DaemonLogStorage;
  private readonly pendingLines: string[] = [];
  private droppedCount = 0;
  private drainOperation: Promise<void> | undefined;
  private closed = false;

  constructor(
    private readonly identity: DaemonWorkspaceIdentity,
    private readonly instanceId: string,
    private readonly clock: DaemonClock,
    options: DaemonLoggerOptions,
  ) {
    const policy = options.policy;
    this.rotateBytes = policy.logRotateBytes;
    this.maximumQueuedEvents = policy.maximumQueuedEvents;
    this.backupCount = policy.logBackupCount;
    this.storage = options.storage ?? new NodeDaemonLogStorage();
  }

  record(event: DaemonDiagnosticEvent): void {
    try {
      if (this.closed) return;
      const line = this.serialize(event);
      if (line === undefined) return;
      if (this.pendingLines.length >= this.maximumQueuedEvents) {
        this.droppedCount += 1;
        return;
      }
      this.pendingLines.push(line);
      this.startDrain();
    } catch {
      return;
    }
  }

  async flush(): Promise<void> {
    while (
      this.drainOperation !== undefined ||
      this.pendingLines.length > 0 ||
      this.droppedCount > 0
    ) {
      this.startDrain();
      await this.drainOperation;
    }
    await this.storage.sync(this.identity.logPath).catch(() => undefined);
  }

  async close(): Promise<void> {
    this.closed = true;
    await this.flush();
  }

  static errorName(error: unknown): DaemonDiagnosticErrorName {
    const name =
      error instanceof Error
        ? error.name
        : typeof error === "object" && error !== null && "name" in error
          ? error.name
          : undefined;
    return ERROR_NAMES.has(name as DaemonDiagnosticErrorName)
      ? (name as DaemonDiagnosticErrorName)
      : "UnknownError";
  }

  private static closedEvent(event: DaemonDiagnosticEvent): Record<string, unknown> | undefined {
    const diagnostic = event as unknown as Record<string, unknown>;
    if (!DIAGNOSTIC_KINDS.has(String(diagnostic.kind))) return undefined;
    const closed: Record<string, unknown> = { ...diagnostic };
    if ("command" in closed && !COMMAND_NAMES.has(closed.command as DaemonCommandName)) {
      closed.command = "unknown";
    }
    if ("errorName" in closed && !ERROR_NAMES.has(closed.errorName as DaemonDiagnosticErrorName)) {
      closed.errorName = "UnknownError";
    }
    for (const [field, values] of CLOSED_DIAGNOSTIC_VALUES) {
      if (field in closed && !values.has(String(closed[field]))) return undefined;
    }
    for (const field of NUMERIC_DIAGNOSTIC_FIELDS) {
      if (!(field in closed)) continue;
      const value = closed[field];
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return undefined;
    }
    if ("force" in closed && typeof closed.force !== "boolean") return undefined;
    if (closed.kind === "process-termination") {
      const isSignal = closed.terminationReason === "signal";
      if (isSignal !== (closed.signal !== undefined)) return undefined;
      if (isSignal === (closed.errorName !== undefined)) return undefined;
    }
    return closed;
  }

  private serialize(event: DaemonDiagnosticEvent): string | undefined {
    const diagnostic = DaemonLogger.closedEvent(event);
    if (diagnostic === undefined) return undefined;
    if ("requestId" in diagnostic) {
      if (typeof diagnostic.requestId !== "string") return undefined;
      diagnostic.requestId = this.requestCorrelation(diagnostic.requestId);
    }
    return \`\${JSON.stringify(
      {
        ...diagnostic,
        schemaVersion: DAEMON_DIAGNOSTIC_SCHEMA_VERSION,
        timestamp: this.clock.wallNowMs(),
        instanceId: this.instanceId,
        workspaceKey: this.identity.workspaceKey,
      },
      [...DIAGNOSTIC_FIELDS],
    )}\\n\`;
  }

  private requestCorrelation(requestId: string): string {
    return createHash("sha256")
      .update(this.identity.workspaceKey)
      .update("\\0")
      .update(requestId)
      .digest("hex");
  }

  private startDrain(): void {
    if (this.drainOperation !== undefined) return;
    const operation = this.drain();
    this.drainOperation = operation.finally(() => {
      this.drainOperation = undefined;
      if (this.pendingLines.length > 0 || this.droppedCount > 0) this.startDrain();
    });
  }

  private async drain(): Promise<void> {
    const logDirectory = dirname(this.identity.logPath);
    let currentBytes: number;
    try {
      await this.storage.prepare(logDirectory, this.identity.logPath);
      currentBytes = await this.storage.size(this.identity.logPath);
    } catch {
      this.pendingLines.length = 0;
      this.droppedCount = 0;
      return;
    }
    while (this.pendingLines.length > 0 || this.droppedCount > 0) {
      if (this.pendingLines.length === 0) {
        const droppedCount = this.droppedCount;
        this.droppedCount = 0;
        const dropped = this.serialize({ kind: "diagnostics-dropped", droppedCount });
        if (dropped !== undefined) this.pendingLines.push(dropped);
      }
      const line = this.pendingLines.shift();
      if (line === undefined) continue;
      const lineBytes = Buffer.byteLength(line);
      try {
        if (currentBytes + lineBytes > this.rotateBytes) {
          await this.rotate();
          await this.storage.prepare(logDirectory, this.identity.logPath);
          currentBytes = 0;
        }
        await this.storage.append(this.identity.logPath, line);
        currentBytes += lineBytes;
      } catch {
        continue;
      }
    }
  }

  private async rotate(): Promise<void> {
    await this.storage.remove(\`\${this.identity.logPath}.\${this.backupCount}\`);
    for (let index = this.backupCount - 1; index >= 1; index -= 1) {
      await this.storage.move(
        \`\${this.identity.logPath}.\${index}\`,
        \`\${this.identity.logPath}.\${index + 1}\`,
      );
    }
    await this.storage.move(this.identity.logPath, \`\${this.identity.logPath}.1\`);
  }
}
`},"head:meta-tests/src/daemon-package.test.ts":{path:"meta-tests/src/daemon-package.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"d07d05f63613bd0fa52d3b7789a0ce07d50967a4c13ff9b8935ac5baa732dbed",text:`import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

interface DaemonPackageManifest {
  readonly name: string;
  readonly private: boolean;
  readonly type: string;
  readonly main: string;
  readonly types: string;
  readonly exports: Readonly<Record<string, unknown>>;
  readonly dependencies?: Readonly<Record<string, string>>;
  readonly optionalDependencies?: Readonly<Record<string, string>>;
  readonly peerDependencies?: Readonly<Record<string, string>>;
  readonly peerDependenciesMeta?: Readonly<Record<string, unknown>>;
  readonly bundledDependencies?: readonly string[];
  readonly bundleDependencies?: readonly string[];
}

class DaemonPackageMetadata {
  public static readonly repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
  public static readonly packageRoot = join(DaemonPackageMetadata.repoRoot, "packages/daemon");

  public static manifest(): DaemonPackageManifest {
    return JSON.parse(
      readFileSync(join(DaemonPackageMetadata.packageRoot, "package.json"), "utf8"),
    ) as DaemonPackageManifest;
  }

  public static productionDependencyNames(manifest: DaemonPackageManifest): readonly string[] {
    return [
      ...Object.keys(manifest.dependencies ?? {}),
      ...Object.keys(manifest.optionalDependencies ?? {}),
      ...Object.keys(manifest.peerDependencies ?? {}),
      ...Object.keys(manifest.peerDependenciesMeta ?? {}),
      ...(manifest.bundledDependencies ?? []),
      ...(manifest.bundleDependencies ?? []),
    ].sort();
  }

  public static policyDocument(): string {
    return readFileSync(join(DaemonPackageMetadata.repoRoot, "plans/005/daemon-policy.md"), "utf8");
  }

  public static appProductionSources(): string {
    const sourceRoot = join(DaemonPackageMetadata.repoRoot, "apps/cli/src");
    return DaemonPackageMetadata.files(sourceRoot)
      .filter((path) => path.endsWith(".ts") && !path.endsWith(".test.ts"))
      .map((path) => readFileSync(path, "utf8"))
      .join("\\n");
  }

  private static files(directory: string): readonly string[] {
    return readdirSync(directory).flatMap((name) => {
      const path = join(directory, name);
      return statSync(path).isDirectory() ? DaemonPackageMetadata.files(path) : [path];
    });
  }
}

describe("@symnav/daemon package boundary", () => {
  it("has the exact private ESM root and temporary policy-testing exports", () => {
    const manifest = DaemonPackageMetadata.manifest();
    expect({
      name: manifest.name,
      private: manifest.private,
      type: manifest.type,
      main: manifest.main,
      types: manifest.types,
      exports: manifest.exports,
    }).toEqual({
      name: "@symnav/daemon",
      private: true,
      type: "module",
      main: "./dist/index.js",
      types: "./dist/index.d.ts",
      exports: {
        ".": {
          types: "./dist/index.d.ts",
          default: "./dist/index.js",
        },
        "./policy-testing": {
          types: "./dist/policy-testing.d.ts",
          default: "./dist/policy-testing.js",
        },
      },
    });
    expect(Object.keys(manifest.exports)).toEqual([".", "./policy-testing"]);
  });

  it("has zero internal packages in every production dependency field", () => {
    const names = DaemonPackageMetadata.productionDependencyNames(DaemonPackageMetadata.manifest());
    expect(names.filter((name) => name.startsWith("@symnav/"))).toEqual([]);
  });

  it("proves every supported production dependency field is inspected", () => {
    const manifest: DaemonPackageManifest = {
      name: "fixture",
      private: true,
      type: "module",
      main: "index.js",
      types: "index.d.ts",
      exports: {},
      dependencies: { "@symnav/dependency": "workspace:*" },
      optionalDependencies: { "@symnav/optional": "workspace:*" },
      peerDependencies: { "@symnav/peer": "workspace:*" },
      peerDependenciesMeta: { "@symnav/peer-meta": {} },
      bundledDependencies: ["@symnav/bundled"],
      bundleDependencies: ["@symnav/bundle"],
    };
    expect(DaemonPackageMetadata.productionDependencyNames(manifest)).toEqual([
      "@symnav/bundle",
      "@symnav/bundled",
      "@symnav/dependency",
      "@symnav/optional",
      "@symnav/peer",
      "@symnav/peer-meta",
    ]);
  });

  it("documents every policy leaf and derivation exactly once", () => {
    const expectedRows = [
      "delivery.postAcceptanceExecutionReattachmentLimit",
      "delivery.resultTransferResumeLimitPerExecutionAttempt",
      "diagnostics.disconnectedTraceRetentionMs",
      "diagnostics.logBackupCount",
      "diagnostics.logRotateBytes",
      "diagnostics.maximumDisconnectedTraces",
      "diagnostics.maximumQueuedEvents",
      "output.inlineRawBytes",
      "output.maximumAggregateSpoolRawBytes",
      "output.maximumChunkRawBytes",
      "output.maximumResultRawBytes",
      "recipe.effectiveMemoryMiB",
      "recipe.effectiveMemorySelection",
      "recipe.forcedTerminationReserve",
      "recipe.hardProcessRss",
      "recipe.workerOldGeneration",
      "resources.effectiveMemoryBytes",
      "resources.hardProcessRssBytes",
      "resources.replacementLimit",
      "resources.replacementWindowMs",
      "resources.resumeProcessRssBytes",
      "resources.softProcessRssBytes",
      "resources.supervisionIntervalMs",
      "resources.workerHeapSampleIntervalMs",
      "resources.workerMaxOldGenerationSizeMiB",
      "shutdown.controllerPollIntervalMs",
      "shutdown.forcedTerminationReserveMaximumMs",
      "shutdown.idleTimeoutMs",
      "shutdown.processExitPollIntervalMs",
      "shutdown.processSignalExitTimeoutMs",
      "shutdown.resourceDrainAcknowledgementGraceMs",
      "shutdown.resourceDrainAcknowledgementPollIntervalMs",
      "shutdown.stopTimeoutMs",
      "startup.authorizationPollIntervalMs",
      "startup.childFailureRetryLimit",
      "startup.coordinationGraceMs",
      "startup.heartbeatIntervalMs",
      "startup.observationPollIntervalMs",
      "startup.previousInstanceTerminationTimeoutMs",
      "transport.executionAdmissionTimeoutMs",
      "transport.maximumExecutionControlPayloadBytes",
      "transport.maximumJsonPayloadBytes",
      "transport.singleResponseTimeoutMs",
      "transport.statusResponseTimeoutMs",
    ];
    const document = DaemonPackageMetadata.policyDocument();
    const rows = [...document.matchAll(/^\\| \`([^\`]+)\` \\|/gm)].map((match) => match[1]);
    expect(rows.sort()).toEqual(expectedRows);
    expect(document).toContain(
      "| Policy path or recipe | Default or derivation | Applies to | Reason | Behavior oracle |",
    );
    expect(document).toContain("Phase 26 removes \`@symnav/daemon/policy-testing\`");
  });

  it("documents intentional deadline absences", () => {
    const document = DaemonPackageMetadata.policyDocument();
    for (const absence of [
      "healthy startup",
      "startup silence",
      "post-accept completion",
      "worker output acknowledgement",
      "unacknowledged result",
    ]) {
      expect(document).toContain(\`| \${absence} | None |\`);
    }
  });

  it("retires scattered operational defaults and policy bypasses", () => {
    const sources = DaemonPackageMetadata.appProductionSources();
    for (const retiredSeam of [
      "daemonPolicy: DaemonPolicy =",
      "readonly policy?: DaemonPolicy",
      "readonly policy: DaemonPolicy =",
      "COMMAND_OUTPUT_CHUNK_BYTES",
      "COMMAND_OUTPUT_LIMIT_BYTES",
      "COMPLETION_SPOOL_INLINE_BYTES",
      "DAEMON_COMPLETION_SPOOL_LIMIT_BYTES",
      "DAEMON_MAXIMUM_CONTROL_FRAME_BYTES",
      "DAEMON_IDLE_TIMEOUT_MS",
      "DAEMON_LOG_BACKUP_COUNT",
      "DAEMON_LOG_ROTATE_BYTES",
      "DAEMON_RESOURCE_RESTART_LIMIT",
      "DAEMON_RESOURCE_RESTART_WINDOW_MS",
      "DAEMON_RESOURCE_SAMPLE_INTERVAL_MS",
      "DAEMON_STARTUP_TIMEOUT_MS",
      "DAEMON_TERMINATION_TIMEOUT_MS",
      "DEFAULT_EXECUTION_REQUEST_TIMEOUT_MS",
      "DEFAULT_MAXIMUM_FRAME_BYTES",
      "DEFAULT_REQUEST_TIMEOUT_MS",
      "completionSpoolLimits",
      "executionRequestTimeoutMs?:",
      "maximumAggregateBytes?:",
      "maximumFrameBytes?:",
      "maximumResultBytes?:",
      "maximumRetainedOperationTraces",
      "operationTraceRetentionMs",
      "outputInlineBytes",
      "requestTimeoutMs?:",
      "resourceCheckIntervalMs",
      "resourcePolicy?:",
      "startupHeartbeatIntervalMs",
      "stopTimeoutMs?:",
      "terminationTimeoutMs?:",
      "startupTimeoutMs",
      "DaemonPolicyCodec",
      "DaemonResourcePolicy",
    ]) {
      expect(sources).not.toContain(retiredSeam);
    }
  });
});
`},"head:apps/cli/src/cli-program-executor.test.ts":{path:"apps/cli/src/cli-program-executor.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"32438cc3e1441f5ac4c51fde4ab9b3e662e3f3960cd11dc5e3ad5e49aa25f822",text:`import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Writable } from "node:stream";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InMemoryFileSystem, type OverviewFileEntries, WorkspaceSession } from "@symnav/core";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import * as commandExecutionResult from "./command-execution-result.js";
import { CliProgramExecutor, CommandResultReplayer } from "./cli-program-executor.js";
import { fakeDependencies } from "../test/integration/commands/helpers/fake-program-dependencies.js";
import { createCapturingRecorder } from "../test/integration/commands/helpers/fake-program-dependencies.js";
import { createFakeProgramContext } from "../test/integration/commands/helpers/fake-program-context.js";
import { FakeLanguageBackend } from "../test/integration/commands/helpers/fake-language-backend.js";

describe("CliProgramExecutor", () => {
  const temporaryRoots: string[] = [];

  afterEach(() => {
    delete process.env.SYMNAV_STATE_DIR;
    for (const root of temporaryRoots) rmSync(root, { recursive: true, force: true });
    temporaryRoots.length = 0;
  });

  it("captures successful command frames in write order and replays exact bytes", async () => {
    const entries: OverviewFileEntries = {
      file: "src/a.ts",
      entries: [],
      diagnostics: [{ severity: "warning", dedupeKey: "warning", message: "unicode \u2713\\nnext" }],
    };
    const executor = new CliProgramExecutor(
      fakeDependencies({ backends: () => [new FakeLanguageBackend({ entries: () => entries })] }),
    );

    const result = await executor.execute({
      argv: ["overview", "src/a.ts"],
      cwd: "/repo",
      telemetryEnabled: false,
    });

    expect(result.exitCode).toBe(0);
    expect((await records(result)).map((record) => record.stream)).toEqual(["stderr", "stdout"]);
    const context = createFakeProgramContext({ cwd: "/repo" });
    await CommandResultReplayer.replay(result, context);
    expect(context.stderr.text()).toBe("Warning: unicode \u2713\\nnext\\n");
    expect(context.stdout.text()).toBe("Overview: src/a.ts\\n(no symbols)\\n");
    expect(context.exitCodes).toEqual([]);
  });

  it("replays identical ordered bytes from inline and spilled command output", async () => {
    const spillDirectory = mkdtempSync(join(tmpdir(), "symnav-ordered-output-"));
    temporaryRoots.push(spillDirectory);
    const OrderedCommandOutput = (
      commandExecutionResult as unknown as {
        OrderedCommandOutput: new (options: {
          readonly policy: ReturnType<typeof fakeDependencies>["daemonPolicy"]["values"]["output"];
          readonly directory?: string;
        }) => {
          readonly stdout: Writable;
          readonly stderr: Writable;
          finish(exitCode: number): Promise<{
            readonly exitCode: number;
            readonly output: {
              readonly summary: { readonly rawBytes: number; readonly recordCount: number };
              records(): AsyncIterable<{
                readonly sequence: number;
                readonly stream: "stdout" | "stderr";
                readonly bytes: Uint8Array;
              }>;
              dispose(): Promise<void>;
            };
          }>;
        };
      }
    ).OrderedCommandOutput;
    const writes = Array.from({ length: 128 }, (_, index) => ({
      stream: index % 3 === 0 ? ("stderr" as const) : ("stdout" as const),
      bytes: Buffer.from(\`\${index}:unicode-\u2713\\n\`),
    }));
    const expectedStreams = writes.reduce<Array<"stdout" | "stderr">>((streams, write) => {
      if (streams.at(-1) !== write.stream) streams.push(write.stream);
      return streams;
    }, []);
    const basePolicy = fakeDependencies().daemonPolicy;
    const capture = async (inlineBytes: number) => {
      const policy = DaemonPolicyTestFactory.withOverrides(basePolicy, {
        output: {
          maximumChunkRawBytes: Math.min(
            basePolicy.values.output.maximumChunkRawBytes,
            inlineBytes,
          ),
          inlineRawBytes: inlineBytes,
          maximumResultRawBytes: Math.max(
            basePolicy.values.output.maximumResultRawBytes,
            inlineBytes,
          ),
          maximumAggregateSpoolRawBytes: Math.max(
            basePolicy.values.output.maximumAggregateSpoolRawBytes,
            inlineBytes,
          ),
        },
      });
      const output = new OrderedCommandOutput({
        directory: spillDirectory,
        policy: policy.values.output,
      });
      for (const write of writes) {
        await new Promise<void>((resolve, reject) => {
          output[write.stream].write(write.bytes, (error) => (error ? reject(error) : resolve()));
        });
      }
      const result = await output.finish(7);
      const records = [];
      for await (const record of result.output.records()) {
        records.push({ ...record, bytes: Buffer.from(record.bytes).toString("hex") });
      }
      await result.output.dispose();
      return { result, records };
    };

    const inline = await capture(Number.MAX_SAFE_INTEGER);
    const spilled = await capture(32);

    expect(spilled.records).toEqual(inline.records);
    expect(inline.result.exitCode).toBe(7);
    expect(inline.result.output.summary.rawBytes).toBe(
      writes.reduce((total, write) => total + write.bytes.byteLength, 0),
    );
    expect(inline.result.output.summary.recordCount).toBe(expectedStreams.length);
    expect(inline.records.map(({ sequence, stream }) => ({ sequence, stream }))).toEqual(
      expectedStreams.map((stream, sequence) => ({ sequence, stream })),
    );
  });

  it("advances nonempty output at the smallest valid chunk capacity", async () => {
    const dependencies = fakeDependencies();
    const policy = DaemonPolicyTestFactory.withOverrides(dependencies.daemonPolicy, {
      output: { maximumChunkRawBytes: 1 },
    });
    const output = new commandExecutionResult.OrderedCommandOutput({
      policy: policy.values.output,
    });

    await new Promise<void>((resolve, reject) => {
      output.stdout.write(Buffer.from("ab"), (error) => (error ? reject(error) : resolve()));
    });
    const result = await output.finish(0);

    expect(await decode(result)).toBe("ab");
    expect(result.output.summary.rawBytes).toBe(2);
    await result.output.dispose();
  });

  it("serializes replay through terminal backpressure and disposes after completion", async () => {
    const output = new commandExecutionResult.CommandOutputSnapshot([
      { stream: "stdout", bytes: Buffer.from("one") },
      { stream: "stderr", bytes: Buffer.from("two") },
      { stream: "stdout", bytes: Buffer.from("three") },
    ]);
    const dispose = vi.spyOn(output, "dispose");
    const writes: string[] = [];
    const stdout = new GatedWritable(writes, "stdout");
    const stderr = new GatedWritable(writes, "stderr");
    const replay = CommandResultReplayer.replay(
      { output, exitCode: 0 },
      { cwd: "/repo", stdout, stderr, exit: () => undefined as never },
    );

    await vi.waitFor(() => expect(stdout.pendingCount).toBe(1));
    expect(stderr.pendingCount).toBe(0);
    expect(writes).toEqual(["stdout:one"]);
    stdout.release();
    await vi.waitFor(() => expect(stderr.pendingCount).toBe(1));
    expect(writes).toEqual(["stdout:one", "stderr:two"]);
    stderr.release();
    await vi.waitFor(() => expect(stdout.pendingCount).toBe(1));
    expect(writes).toEqual(["stdout:one", "stderr:two", "stdout:three"]);
    stdout.release();

    await replay;
    expect(dispose).toHaveBeenCalledOnce();
  });

  it("disposes retained output when terminal replay fails", async () => {
    const output = new commandExecutionResult.CommandOutputSnapshot([
      { stream: "stdout", bytes: Buffer.from("one") },
      { stream: "stderr", bytes: Buffer.from("two") },
    ]);
    const dispose = vi.spyOn(output, "dispose");
    const stdout = new GatedWritable([], "stdout");
    const stderr = new GatedWritable([], "stderr");
    const replay = CommandResultReplayer.replay(
      { output, exitCode: 0 },
      { cwd: "/repo", stdout, stderr, exit: () => undefined as never },
    );

    await vi.waitFor(() => expect(stdout.pendingCount).toBe(1));
    stdout.fail(new Error("terminal disappeared"));

    await expect(replay).rejects.toThrow("terminal disappeared");
    expect(stderr.pendingCount).toBe(0);
    expect(dispose).toHaveBeenCalledOnce();
  });

  it.each([
    { argv: ["--version"], code: 0, stream: "stdout" },
    { argv: ["--help"], code: 0, stream: "stdout" },
    { argv: ["overview", "--help"], code: 0, stream: "stdout" },
    { argv: [], code: 1, stream: "stderr" },
    { argv: ["def"], code: 1, stream: "stderr" },
    { argv: ["wat"], code: 1, stream: "stderr" },
  ] as const)("captures Commander execution for $argv", async ({ argv, code, stream }) => {
    const result = await new CliProgramExecutor(fakeDependencies()).execute({
      argv,
      cwd: "/repo",
      telemetryEnabled: false,
    });

    expect(result.exitCode).toBe(code);
    const captured = await records(result);
    expect(captured.length).toBeGreaterThan(0);
    expect(captured.every((record) => record.stream === stream)).toBe(true);
    await result.output.dispose();
  });

  it.each([["--version"], ["--help"], ["overview", "--help"]])(
    "does not construct backends for help invocation %j",
    async (...argv) => {
      const backends = vi.fn(() => {
        throw new Error("help must not construct backends");
      });

      const result = await new CliProgramExecutor(fakeDependencies({ backends })).execute({
        argv,
        cwd: "/repo",
        telemetryEnabled: false,
      });

      expect(result.exitCode).toBe(0);
      expect(backends).not.toHaveBeenCalled();
      await result.output.dispose();
    },
  );

  it("captures user errors, crashes, JSON, and hidden stats", async () => {
    const stateDir = mkdtempSync(join(tmpdir(), "symnav-executor-"));
    temporaryRoots.push(stateDir);
    process.env.SYMNAV_STATE_DIR = stateDir;
    const userError = await new CliProgramExecutor(fakeDependencies()).execute({
      argv: ["overview", "missing.ts"],
      cwd: "/repo",
      telemetryEnabled: false,
    });
    const crash = await new CliProgramExecutor(
      fakeDependencies({
        backends: () => [
          new FakeLanguageBackend({
            entries: () => {
              throw new Error("boom");
            },
          }),
        ],
      }),
    ).execute({ argv: ["overview", "src/a.ts"], cwd: "/repo", telemetryEnabled: false });
    const json = await new CliProgramExecutor(fakeDependencies()).execute({
      argv: ["overview", "src/a.ts", "--json"],
      cwd: "/repo",
      telemetryEnabled: false,
    });
    const stats = await new CliProgramExecutor(fakeDependencies()).execute({
      argv: ["stats", "--json"],
      cwd: "/repo",
      telemetryEnabled: false,
    });

    expect(userError.exitCode).toBe(1);
    expect(await decode(userError)).toContain("Cannot answer: file not found");
    expect(crash.exitCode).toBe(2);
    expect(await decode(crash)).toBe("boom\\n");
    expect(JSON.parse(await decode(json))).toMatchObject({ file: "src/a.ts" });
    expect(JSON.parse(await decode(stats))).toMatchObject({ totalEvents: 0 });
  });

  it("records one warm telemetry event at the executing process", async () => {
    const recorder = createCapturingRecorder();
    const result = await new CliProgramExecutor(
      fakeDependencies({ recorder, telemetryEnabled: true }),
    ).execute({
      argv: ["overview", "src/a.ts"],
      cwd: "/repo",
      telemetryEnabled: true,
      executionMode: "warm",
    });

    expect(recorder.events).toEqual([
      expect.objectContaining({
        command: "overview",
        executionMode: "warm",
        outcome: "success",
      }),
    ]);
    expect(result).not.toHaveProperty("telemetry");
  });

  it("replaces local output over the result limit without partial bytes", async () => {
    const dependencies = fakeDependencies();
    const daemonPolicy = DaemonPolicyTestFactory.withOverrides(dependencies.daemonPolicy, {
      output: {
        maximumChunkRawBytes: 1,
        inlineRawBytes: 1,
        maximumResultRawBytes: 1,
      },
    });
    const result = await new CliProgramExecutor({ ...dependencies, daemonPolicy }).execute({
      argv: ["--version"],
      cwd: "/repo",
      telemetryEnabled: false,
    });

    expect(result.exitCode).toBe(1);
    expect(await decode(result)).toBe("Cannot answer: daemon response capacity exceeded.\\n");
  });

  it("creates a fresh request session for each non-injected navigation", async () => {
    const fs = new ListingCountingFileSystem({
      "/repo/.git/HEAD": "ref: refs/heads/main\\n",
      "/repo/src/a.ts": "export const a = 1;\\n",
    });
    const createdBackends: FakeLanguageBackend[] = [];
    const backends = vi.fn(() => {
      const backend = new FakeLanguageBackend({ accept: (path) => path.endsWith(".ts") });
      createdBackends.push(backend);
      return [backend];
    });
    const executor = new CliProgramExecutor(fakeDependencies({ fs, backends }));

    await executor.execute({ argv: ["resolve", "a"], cwd: "/repo", telemetryEnabled: false });
    fs.directoryReads.length = 0;
    await executor.execute({ argv: ["resolve", "a"], cwd: "/repo", telemetryEnabled: false });

    expect(backends).toHaveBeenCalledTimes(2);
    expect(createdBackends).toHaveLength(2);
    expect(fs.directoryReads).not.toEqual([]);
  });

  it("reuses an injected workspace session across executions", async () => {
    const fs = new ListingCountingFileSystem({
      "/repo/.git/HEAD": "ref: refs/heads/main\\n",
      "/repo/src/a.ts": "export const a = 1;\\n",
    });
    const backend = new FakeLanguageBackend({ accept: (path) => path.endsWith(".ts") });
    const workspaceSession = new WorkspaceSession({
      fileSystem: fs,
      backends: [backend],
      discoveryRetention: "session",
    });
    const executor = new CliProgramExecutor(
      fakeDependencies({ fs, backends: () => [backend] }),
      workspaceSession,
    );

    await executor.execute({
      argv: ["resolve", "a"],
      cwd: "/repo",
      telemetryEnabled: false,
    });
    fs.directoryReads.length = 0;
    await executor.execute({
      argv: ["resolve", "a"],
      cwd: "/repo",
      telemetryEnabled: false,
    });

    expect(fs.directoryReads).toEqual([]);
  });
});

class GatedWritable extends Writable {
  private readonly callbacks: Array<(error?: Error | null) => void> = [];

  constructor(
    private readonly writes: string[],
    private readonly name: string,
  ) {
    super({ highWaterMark: 1 });
  }

  get pendingCount(): number {
    return this.callbacks.length;
  }

  release(): void {
    this.callbacks.shift()?.();
  }

  fail(error: Error): void {
    this.destroy(error);
  }

  override _write(
    chunk: Buffer,
    _encoding: BufferEncoding,
    callback: (error?: Error | null) => void,
  ): void {
    this.writes.push(\`\${this.name}:\${chunk.toString()}\`);
    this.callbacks.push(callback);
  }
}

class ListingCountingFileSystem extends InMemoryFileSystem {
  readonly directoryReads: string[] = [];

  override async listDir(absPath: string): Promise<readonly string[]> {
    this.directoryReads.push(absPath);
    return super.listDir(absPath);
  }

  override listDirSync(absPath: string): readonly string[] {
    this.directoryReads.push(absPath);
    return super.listDirSync(absPath);
  }

  override metadataSync(absPath: string) {
    if (!this.isDirectorySync(absPath)) return super.metadataSync(absPath);
    const entries = super.listDirSync(absPath);
    return {
      size: entries.length,
      modifiedAtMs: 0,
      changeToken: entries.join("\\0"),
      fileIdentity: absPath,
    };
  }
}

async function records(result: commandExecutionResult.CommandExecutionResult) {
  const captured = [];
  for await (const record of result.output.records()) captured.push(record);
  return captured;
}

async function decode(result: commandExecutionResult.CommandExecutionResult): Promise<string> {
  return Buffer.concat(
    (await records(result)).map((record) => Buffer.from(record.bytes)),
  ).toString();
}
`},"head:apps/cli/src/daemon/completion-spool.test.ts":{path:"apps/cli/src/daemon/completion-spool.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"938f97d30e38507109b2ae48aab04e348e15dc1c9e9fc473fb4440cd24962b1b",text:`import { access, chmod, mkdir, mkdtemp, readdir, stat, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import * as completionSpoolModule from "./completion-spool.js";

describe("DaemonCompletionSpoolStore", () => {
  const roots: string[] = [];

  afterEach(async () => {
    const { rm } = await import("node:fs/promises");
    await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  it("uses the required output-policy capacities", async () => {
    const directory = await mkdtemp(join(tmpdir(), "symnav-completion-policy-"));
    roots.push(directory);
    const policy = DaemonPolicyTestFactory.withOverrides(
      DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }),
      {
        output: {
          maximumChunkRawBytes: 2,
          inlineRawBytes: 3,
          maximumResultRawBytes: 6,
          maximumAggregateSpoolRawBytes: 9,
        },
      },
    );
    const store = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-a",
      policy: policy.values.output,
    } as unknown as ConstructorParameters<
      typeof completionSpoolModule.DaemonCompletionSpoolStore
    >[0]);
    const spool = await store.create("request-a");

    await expect(
      spool.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("123") }),
    ).rejects.toThrow(/chunk capacity/i);
  });

  it("spills threshold-plus-one output securely and acknowledges exact completion cleanup", async () => {
    const directory = await mkdtemp(join(tmpdir(), "symnav-completion-spool-"));
    roots.push(directory);
    const store = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-a",
      policy: outputPolicy({
        maximumChunkRawBytes: 8,
        inlineRawBytes: 8,
        maximumResultRawBytes: 64,
        maximumAggregateSpoolRawBytes: 128,
      }),
    });
    const spool = await store.create("request-a");
    await spool.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("12345678") });
    await spool.append({ sequence: 1, stream: "stderr", bytes: Buffer.from("x") });
    const manifest = await spool.finish(3);

    expect(manifest).toMatchObject({
      requestId: "request-a",
      instanceId: "instance-a",
      exitCode: 3,
      rawBytes: 9,
      recordCount: 2,
    });
    expect(manifest.sha256).toMatch(/^[a-f\\d]{64}$/);
    expect(store.usage()).toEqual({ rawBytes: 9, completionCount: 1 });
    const instanceEntries = await readdir(join(directory, "instance-a"));
    expect(instanceEntries).toHaveLength(1);
    if (process.platform !== "win32") {
      expect((await stat(directory)).mode & 0o777).toBe(0o700);
      expect((await stat(join(directory, "instance-a", instanceEntries[0]!))).mode & 0o777).toBe(
        0o600,
      );
    }
    const records = [];
    for await (const record of spool.read(1)) records.push(record);
    expect(records).toEqual([{ sequence: 1, stream: "stderr", bytes: Buffer.from("x") }]);

    await spool.acknowledge();
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    await expect(access(join(directory, "instance-a", instanceEntries[0]!))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("fails closed on aggregate capacity and never evicts an earlier completion", async () => {
    const directory = await mkdtemp(join(tmpdir(), "symnav-completion-capacity-"));
    roots.push(directory);
    const store = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-a",
      policy: outputPolicy({
        maximumChunkRawBytes: 6,
        inlineRawBytes: 6,
        maximumResultRawBytes: 8,
        maximumAggregateSpoolRawBytes: 8,
      }),
    });
    const first = await store.create("first");
    await first.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("123456") });
    await first.finish(0);
    const second = await store.create("second");

    await expect(
      second.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("789") }),
    ).rejects.toMatchObject({ name: "CompletionSpoolCapacityError" });
    expect(await store.open("first")).toBe(first);
    expect(await store.open("second")).toBeUndefined();
    expect(store.usage()).toEqual({ rawBytes: 6, completionCount: 1 });
  });

  it("accepts exactly 256 MiB and deletes the partial spool one byte over", async () => {
    const directory = await mkdtemp(join(tmpdir(), "symnav-completion-exact-capacity-"));
    roots.push(directory);
    const store = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-a",
      policy: outputPolicy(),
    });
    const spool = await store.create("request-a");
    const fullChunk = Buffer.alloc(outputPolicy().maximumChunkRawBytes);
    const fullChunkCount =
      outputPolicy().maximumResultRawBytes / outputPolicy().maximumChunkRawBytes;
    for (let sequence = 0; sequence < fullChunkCount; sequence += 1) {
      await spool.append({ sequence, stream: "stdout", bytes: fullChunk });
    }

    expect(store.usage().rawBytes).toBe(outputPolicy().maximumResultRawBytes);
    await expect(
      spool.append({ sequence: fullChunkCount, stream: "stdout", bytes: Buffer.from("x") }),
    ).rejects.toMatchObject({ name: "CompletionSpoolCapacityError" });
    expect(await store.open("request-a")).toBeUndefined();
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    expect(await readdir(join(directory, "instance-a"))).toEqual([]);
  }, 30_000);

  it("cleans only the confirmed dead instance and rejects unsafe existing storage", async () => {
    const directory = await mkdtemp(join(tmpdir(), "symnav-completion-cleanup-"));
    roots.push(directory);
    const firstStore = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-a",
      policy: outputPolicy(),
    });
    const secondStore = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-b",
      policy: outputPolicy(),
    });
    const first = await firstStore.create("first");
    await first.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("a") });
    await first.finish(0);
    const second = await secondStore.create("second");
    await second.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("b") });
    await second.finish(0);

    await firstStore.cleanupConfirmedDeadInstance("instance-a");
    expect(await firstStore.open("first")).toBeUndefined();
    expect(await secondStore.open("second")).toBe(second);

    const blocked = join(directory, "blocked");
    await writeFile(blocked, "not a directory");
    await chmod(blocked, 0o600);
    const blockedStore = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory: blocked,
      workspaceKey: "workspace-a",
      instanceId: "instance-c",
      policy: outputPolicy({ maximumChunkRawBytes: 1, inlineRawBytes: 1 }),
    });
    const blockedSpool = await blockedStore.create("blocked-request");
    await blockedSpool.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("x") });
    await expect(
      blockedSpool.append({ sequence: 1, stream: "stdout", bytes: Buffer.from("x") }),
    ).rejects.toBeInstanceOf(Error);
    expect(blockedStore.usage()).toEqual({ rawBytes: 0, completionCount: 0 });

    if (process.platform !== "win32") {
      const external = join(directory, "external");
      await mkdir(external);
      await symlink(external, join(directory, "instance-link"));
      const linkedStore = new completionSpoolModule.DaemonCompletionSpoolStore({
        directory,
        workspaceKey: "workspace-a",
        instanceId: "instance-link",
        policy: outputPolicy({ maximumChunkRawBytes: 1, inlineRawBytes: 1 }),
      });
      const linkedSpool = await linkedStore.create("linked-request");
      await linkedSpool.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("x") });
      await expect(
        linkedSpool.append({ sequence: 1, stream: "stdout", bytes: Buffer.from("x") }),
      ).rejects.toThrow("Completion spool directory is unsafe");
      expect(await readdir(external)).toEqual([]);
      expect(linkedStore.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    }
  });

  it.each(["sync", "close"] as const)(
    "releases ownership and retries physical cleanup after a %s failure",
    async (operation) => {
      const directory = await mkdtemp(join(tmpdir(), "symnav-completion-finish-failure-"));
      roots.push(directory);
      const storage = new FailingCompletionSpoolStorage(operation);
      const store = new completionSpoolModule.DaemonCompletionSpoolStore({
        directory,
        workspaceKey: "workspace-a",
        instanceId: "instance-a",
        policy: outputPolicy({ maximumChunkRawBytes: 6, inlineRawBytes: 6 }),
        storage,
      });
      const spool = await store.create("request-a");
      await spool.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("stored") });
      await spool.append({ sequence: 1, stream: "stdout", bytes: Buffer.from("x") });

      await expect(spool.finish(0)).rejects.toThrow(\`\${operation} failed\`);
      expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
      expect(await store.open("request-a")).toBeUndefined();

      await expect(spool.dispose()).resolves.toBeUndefined();
      expect(await readdir(join(directory, "instance-a"))).toEqual([]);
      expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    },
  );

  it("releases acknowledged quota and retries failed unlink during instance cleanup", async () => {
    const directory = await mkdtemp(join(tmpdir(), "symnav-completion-unlink-failure-"));
    roots.push(directory);
    const store = new completionSpoolModule.DaemonCompletionSpoolStore({
      directory,
      workspaceKey: "workspace-a",
      instanceId: "instance-a",
      policy: outputPolicy({ maximumChunkRawBytes: 6, inlineRawBytes: 6 }),
      storage: new FailingCompletionSpoolStorage("unlink"),
    });
    const spool = await store.create("request-a");
    await spool.append({ sequence: 0, stream: "stdout", bytes: Buffer.from("stored") });
    await spool.append({ sequence: 1, stream: "stdout", bytes: Buffer.from("x") });
    await spool.finish(0);

    await expect(spool.acknowledge()).rejects.toThrow("unlink failed");
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
    expect(await store.open("request-a")).toBeUndefined();
    expect(await readdir(join(directory, "instance-a"))).toHaveLength(1);

    await expect(store.cleanupInstance("instance-a")).resolves.toBeUndefined();
    await expect(access(join(directory, "instance-a"))).rejects.toMatchObject({ code: "ENOENT" });
    expect(store.usage()).toEqual({ rawBytes: 0, completionCount: 0 });
  });
});

function outputPolicy(
  overrides: Partial<ReturnType<typeof defaultOutputPolicy>> = {},
): ReturnType<typeof defaultOutputPolicy> {
  return DaemonPolicyTestFactory.withOverrides(
    DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }),
    { output: overrides },
  ).values.output;
}

function defaultOutputPolicy() {
  return DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }).values.output;
}

class FailingCompletionSpoolStorage extends completionSpoolModule.NodeCompletionSpoolStorage {
  private failed = false;

  constructor(private readonly operation: "sync" | "close" | "unlink") {
    super();
  }

  override async createFile(path: string): Promise<completionSpoolModule.CompletionSpoolFile> {
    const file = await super.createFile(path);
    return {
      write: (bytes) => file.write(bytes),
      sync: async () => {
        if (this.fail("sync")) throw new Error("sync failed");
        await file.sync();
      },
      close: async () => {
        if (this.fail("close")) throw new Error("close failed");
        await file.close();
      },
    };
  }

  override async unlink(path: string): Promise<void> {
    if (this.fail("unlink")) throw new Error("unlink failed");
    await super.unlink(path);
  }

  private fail(operation: "sync" | "close" | "unlink"): boolean {
    if (this.failed || this.operation !== operation) return false;
    this.failed = true;
    return true;
  }
}
`},"head:apps/cli/src/daemon/daemon-resource-monitor.test.ts":{path:"apps/cli/src/daemon/daemon-resource-monitor.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"e11f44184b8ead72c16229b9f45d9452bd90f072adaf8052934fa7870fefe200",text:`import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import { DaemonResourceSupervisor } from "./daemon-resource-monitor.js";

const MEBIBYTE = 1024 * 1024;
const GIBIBYTE = 1024 * MEBIBYTE;

describe("DaemonResourceSupervisor", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("samples every 250 milliseconds without blocking the timer owner", async () => {
    const policy = resourcePolicy();
    const residentMemoryBytes = vi.fn(() => 0);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    supervisor.start();
    await vi.advanceTimersByTimeAsync(249);
    expect(residentMemoryBytes).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(residentMemoryBytes).toHaveBeenCalledOnce();
    supervisor.stop();
    await vi.advanceTimersByTimeAsync(500);
    expect(residentMemoryBytes).toHaveBeenCalledOnce();
  });

  it("uses the required resource-policy cadence and thresholds", async () => {
    const policy = DaemonPolicyTestFactory.withOverrides(
      DaemonPolicy.fromSystemMemory({ totalBytes: GIBIBYTE }),
      {
        resources: {
          supervisionIntervalMs: 17,
          hardProcessRssBytes: 103,
          softProcessRssBytes: 102,
          resumeProcessRssBytes: 101,
        },
      },
    );
    let residentMemoryBytes = 102;
    const releaseTransientResources = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy: policy.values.resources,
      generation: 1,
      residentMemoryBytes: () => residentMemoryBytes,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    } as unknown as ConstructorParameters<typeof DaemonResourceSupervisor>[0]);

    supervisor.start();
    await vi.advanceTimersByTimeAsync(16);
    expect(releaseTransientResources).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(releaseTransientResources).toHaveBeenCalledOnce();
    residentMemoryBytes = 100;
    await supervisor.sample("interval");
    expect(supervisor.snapshot.admissionPaused).toBe(false);
    supervisor.stop();
  });

  it("pauses admission and sheds once per soft-pressure hysteresis cycle", async () => {
    const policy = resourcePolicy();
    let residentMemoryBytes = policy.softProcessRssBytes + 1;
    const releaseTransientResources = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => residentMemoryBytes,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    await supervisor.sample("admission");
    await supervisor.sample("interval");
    expect(supervisor.snapshot.admissionPaused).toBe(true);
    expect(releaseTransientResources).toHaveBeenCalledOnce();

    await supervisor.sample("turn-complete");
    await supervisor.sample("turn-complete");
    expect(releaseTransientResources).toHaveBeenCalledOnce();
    expect(supervisor.snapshot.state).toBe("shedding");

    residentMemoryBytes = policy.resumeProcessRssBytes - 1;
    await supervisor.sample("interval");
    expect(supervisor.snapshot.admissionPaused).toBe(false);
    expect(supervisor.snapshot.state).toBe("ready");

    residentMemoryBytes = policy.softProcessRssBytes + 1;
    await supervisor.sample("admission");
    await supervisor.sample("turn-complete");
    expect(releaseTransientResources).toHaveBeenCalledTimes(2);
  });

  it("schedules one shed when idle pressure is observed by interval or admission samples", async () => {
    const policy = resourcePolicy();
    const releaseTransientResources = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.softProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    await supervisor.sample("interval");
    await supervisor.sample("admission");

    expect(releaseTransientResources).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({ state: "shedding", admissionPaused: true });
  });

  it("coalesces concurrent soft-pressure samples behind one shed operation", async () => {
    const policy = resourcePolicy();
    let releaseShed!: () => void;
    const shedGate = new Promise<void>((resolve) => {
      releaseShed = resolve;
    });
    const releaseTransientResources = vi.fn(() => shedGate);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.softProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    const samples = Promise.all([
      supervisor.sample("turn-complete"),
      supervisor.sample("turn-complete"),
      supervisor.sample("interval"),
    ]);
    await Promise.resolve();

    expect(releaseTransientResources).toHaveBeenCalledOnce();
    releaseShed();
    await samples;
  });

  it("returns a failed shed to a retryable state", async () => {
    const policy = resourcePolicy();
    const replaceWorker = vi.fn(async () => 2);
    const releaseTransientResources = vi
      .fn<() => Promise<void>>()
      .mockRejectedValueOnce(new Error("release failed"))
      .mockResolvedValueOnce(undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.softProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker,
      drain: async () => undefined,
    });

    await expect(supervisor.sample("interval")).rejects.toThrow("release failed");
    expect(replaceWorker).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({
      state: "ready",
      generation: 2,
      admissionPaused: false,
    });
    await expect(supervisor.sample("interval")).resolves.toBeUndefined();

    expect(releaseTransientResources).toHaveBeenCalledTimes(2);
    expect(supervisor.snapshot).toMatchObject({ state: "shedding", admissionPaused: true });
  });

  it("replaces once at hard pressure and fences heap reports by generation", async () => {
    const policy = resourcePolicy();
    const replaceWorker = vi.fn(async () => 2);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.hardProcessRssBytes + 1,
      spoolBytes: () => 4096,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain: async () => undefined,
    });
    supervisor.workerHeapReported(1, 100, 200, 400);

    await Promise.all([supervisor.sample("admission"), supervisor.sample("interval")]);

    expect(replaceWorker).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({
      state: "ready",
      generation: 2,
      processRssBytes: policy.hardProcessRssBytes + 1,
      peakProcessRssBytes: policy.hardProcessRssBytes + 1,
      spoolBytes: 4096,
      admissionPaused: false,
      replacementCount: 1,
      peakWorkerHeapUsedBytes: 400,
    });
    expect(supervisor.snapshot.workerHeapUsedBytes).toBeUndefined();
    supervisor.workerHeapReported(1, 300, 400, 600);
    expect(supervisor.snapshot.workerHeapUsedBytes).toBeUndefined();
    supervisor.workerHeapReported(2, 200, 600, 300);
    expect(supervisor.snapshot.workerHeapUsedBytes).toBe(200);
    expect(supervisor.snapshot.peakWorkerHeapUsedBytes).toBe(400);
    expect(supervisor.snapshot.processRssBytes).toBe(policy.hardProcessRssBytes + 1);
  });

  it("reports large disk spools without treating them as process RSS", async () => {
    const policy = resourcePolicy();
    const replaceWorker = vi.fn(async () => 2);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.resumeProcessRssBytes - 1,
      spoolBytes: () => 12 * MEBIBYTE,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain: async () => undefined,
    });

    await supervisor.sample("admission");

    expect(supervisor.snapshot).toMatchObject({
      state: "ready",
      processRssBytes: policy.resumeProcessRssBytes - 1,
      spoolBytes: 12 * MEBIBYTE,
      admissionPaused: false,
    });
    expect(replaceWorker).not.toHaveBeenCalled();
  });

  it("drains on a third pressure replacement inside ten minutes", async () => {
    const policy = resourcePolicy();
    let generation = 1;
    let now = 0;
    const replaceWorker = vi.fn(async () => (generation += 1));
    const drain = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation,
      now: () => now,
      residentMemoryBytes: () => policy.hardProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain,
    });

    await supervisor.sample("interval");
    now += 60_000;
    await supervisor.sample("interval");
    now += 60_000;
    await supervisor.sample("interval");

    expect(replaceWorker).toHaveBeenCalledTimes(2);
    expect(drain).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({ state: "draining", replacementCount: 2 });
  });

  it("does not open the replacement circuit outside the ten minute window", async () => {
    const policy = resourcePolicy();
    let generation = 1;
    let now = 0;
    const replaceWorker = vi.fn(async () => (generation += 1));
    const drain = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation,
      now: () => now,
      residentMemoryBytes: () => policy.hardProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain,
    });

    await supervisor.sample("interval");
    now += 10 * 60 * 1_000 + 1;
    await supervisor.sample("interval");
    now += 10 * 60 * 1_000 + 1;
    await supervisor.sample("interval");

    expect(replaceWorker).toHaveBeenCalledTimes(3);
    expect(drain).not.toHaveBeenCalled();
    expect(supervisor.snapshot).toMatchObject({ state: "ready", replacementCount: 3 });
  });
});

function runImmediately(operation: () => Promise<void>): Promise<void> {
  return operation();
}

function resourcePolicy() {
  return DaemonPolicy.fromSystemMemory({ totalBytes: GIBIBYTE }).values.resources;
}
`},"base:apps/cli/src/daemon/daemon-resource-monitor.test.ts":{path:"apps/cli/src/daemon/daemon-resource-monitor.test.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"895816b5fc6b05ff38884865941a615d7cc12e96985c6de75d139fa132185d2c",text:`import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  DAEMON_RESOURCE_SAMPLE_INTERVAL_MS,
  DaemonResourcePolicy,
  DaemonResourceSupervisor,
} from "./daemon-resource-monitor.js";

const MEBIBYTE = 1024 * 1024;
const GIBIBYTE = 1024 * MEBIBYTE;

describe("DaemonResourcePolicy", () => {
  it.each([
    {
      memory: 256 * MEBIBYTE,
      hard: 256 * MEBIBYTE,
      soft: 204 * MEBIBYTE,
      resume: 179 * MEBIBYTE,
      worker: 128,
    },
    {
      memory: 512 * MEBIBYTE,
      hard: 256 * MEBIBYTE,
      soft: 204 * MEBIBYTE,
      resume: 179 * MEBIBYTE,
      worker: 128,
    },
    {
      memory: GIBIBYTE,
      hard: 512 * MEBIBYTE,
      soft: 409 * MEBIBYTE,
      resume: 358 * MEBIBYTE,
      worker: 256,
    },
    {
      memory: 16 * GIBIBYTE,
      hard: 8 * GIBIBYTE,
      soft: 6553 * MEBIBYTE,
      resume: 5734 * MEBIBYTE,
      worker: 4096,
    },
    {
      memory: 64 * GIBIBYTE,
      hard: 8 * GIBIBYTE,
      soft: 6553 * MEBIBYTE,
      resume: 5734 * MEBIBYTE,
      worker: 4096,
    },
  ])("derives bounded thresholds from $memory bytes", ({ memory, hard, soft, resume, worker }) => {
    const record = DaemonResourcePolicy.fromSystemMemory(memory).record;

    expect(record).toEqual({
      effectiveMemoryBytes: memory,
      hardProcessRssBytes: hard,
      softProcessRssBytes: soft,
      resumeProcessRssBytes: resume,
      workerMaxOldGenerationSizeMb: worker,
    });
  });

  it("prefers a smaller positive constrained-memory limit", () => {
    expect(DaemonResourcePolicy.fromSystemMemory(64 * GIBIBYTE, GIBIBYTE).record).toEqual(
      DaemonResourcePolicy.fromSystemMemory(GIBIBYTE).record,
    );
    expect(DaemonResourcePolicy.fromSystemMemory(GIBIBYTE, 16 * GIBIBYTE).record).toEqual(
      DaemonResourcePolicy.fromSystemMemory(GIBIBYTE).record,
    );
  });

  it("uses a 250 millisecond supervision interval", () => {
    expect(DAEMON_RESOURCE_SAMPLE_INTERVAL_MS).toBe(250);
  });
});

describe("DaemonResourceSupervisor", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("samples every 250 milliseconds without blocking the timer owner", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    const residentMemoryBytes = vi.fn(() => 0);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    supervisor.start();
    await vi.advanceTimersByTimeAsync(249);
    expect(residentMemoryBytes).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(residentMemoryBytes).toHaveBeenCalledOnce();
    supervisor.stop();
    await vi.advanceTimersByTimeAsync(500);
    expect(residentMemoryBytes).toHaveBeenCalledOnce();
  });

  it("pauses admission and sheds once per soft-pressure hysteresis cycle", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    let residentMemoryBytes = policy.record.softProcessRssBytes + 1;
    const releaseTransientResources = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => residentMemoryBytes,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    await supervisor.sample("admission");
    await supervisor.sample("interval");
    expect(supervisor.snapshot.admissionPaused).toBe(true);
    expect(releaseTransientResources).toHaveBeenCalledOnce();

    await supervisor.sample("turn-complete");
    await supervisor.sample("turn-complete");
    expect(releaseTransientResources).toHaveBeenCalledOnce();
    expect(supervisor.snapshot.state).toBe("shedding");

    residentMemoryBytes = policy.record.resumeProcessRssBytes - 1;
    await supervisor.sample("interval");
    expect(supervisor.snapshot.admissionPaused).toBe(false);
    expect(supervisor.snapshot.state).toBe("ready");

    residentMemoryBytes = policy.record.softProcessRssBytes + 1;
    await supervisor.sample("admission");
    await supervisor.sample("turn-complete");
    expect(releaseTransientResources).toHaveBeenCalledTimes(2);
  });

  it("schedules one shed when idle pressure is observed by interval or admission samples", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    const releaseTransientResources = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.record.softProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    await supervisor.sample("interval");
    await supervisor.sample("admission");

    expect(releaseTransientResources).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({ state: "shedding", admissionPaused: true });
  });

  it("coalesces concurrent soft-pressure samples behind one shed operation", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    let releaseShed!: () => void;
    const shedGate = new Promise<void>((resolve) => {
      releaseShed = resolve;
    });
    const releaseTransientResources = vi.fn(() => shedGate);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.record.softProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker: async () => 2,
      drain: async () => undefined,
    });

    const samples = Promise.all([
      supervisor.sample("turn-complete"),
      supervisor.sample("turn-complete"),
      supervisor.sample("interval"),
    ]);
    await Promise.resolve();

    expect(releaseTransientResources).toHaveBeenCalledOnce();
    releaseShed();
    await samples;
  });

  it("returns a failed shed to a retryable state", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    const replaceWorker = vi.fn(async () => 2);
    const releaseTransientResources = vi
      .fn<() => Promise<void>>()
      .mockRejectedValueOnce(new Error("release failed"))
      .mockResolvedValueOnce(undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.record.softProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources,
      replaceWorker,
      drain: async () => undefined,
    });

    await expect(supervisor.sample("interval")).rejects.toThrow("release failed");
    expect(replaceWorker).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({
      state: "ready",
      generation: 2,
      admissionPaused: false,
    });
    await expect(supervisor.sample("interval")).resolves.toBeUndefined();

    expect(releaseTransientResources).toHaveBeenCalledTimes(2);
    expect(supervisor.snapshot).toMatchObject({ state: "shedding", admissionPaused: true });
  });

  it("replaces once at hard pressure and fences heap reports by generation", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    const replaceWorker = vi.fn(async () => 2);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.record.hardProcessRssBytes + 1,
      spoolBytes: () => 4096,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain: async () => undefined,
    });
    supervisor.workerHeapReported(1, 100, 200, 400);

    await Promise.all([supervisor.sample("admission"), supervisor.sample("interval")]);

    expect(replaceWorker).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({
      state: "ready",
      generation: 2,
      processRssBytes: policy.record.hardProcessRssBytes + 1,
      peakProcessRssBytes: policy.record.hardProcessRssBytes + 1,
      spoolBytes: 4096,
      admissionPaused: false,
      replacementCount: 1,
      peakWorkerHeapUsedBytes: 400,
    });
    expect(supervisor.snapshot.workerHeapUsedBytes).toBeUndefined();
    supervisor.workerHeapReported(1, 300, 400, 600);
    expect(supervisor.snapshot.workerHeapUsedBytes).toBeUndefined();
    supervisor.workerHeapReported(2, 200, 600, 300);
    expect(supervisor.snapshot.workerHeapUsedBytes).toBe(200);
    expect(supervisor.snapshot.peakWorkerHeapUsedBytes).toBe(400);
    expect(supervisor.snapshot.processRssBytes).toBe(policy.record.hardProcessRssBytes + 1);
  });

  it("reports large disk spools without treating them as process RSS", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    const replaceWorker = vi.fn(async () => 2);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation: 1,
      residentMemoryBytes: () => policy.record.resumeProcessRssBytes - 1,
      spoolBytes: () => 12 * MEBIBYTE,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain: async () => undefined,
    });

    await supervisor.sample("admission");

    expect(supervisor.snapshot).toMatchObject({
      state: "ready",
      processRssBytes: policy.record.resumeProcessRssBytes - 1,
      spoolBytes: 12 * MEBIBYTE,
      admissionPaused: false,
    });
    expect(replaceWorker).not.toHaveBeenCalled();
  });

  it("drains on a third pressure replacement inside ten minutes", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    let generation = 1;
    let now = 0;
    const replaceWorker = vi.fn(async () => (generation += 1));
    const drain = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation,
      now: () => now,
      residentMemoryBytes: () => policy.record.hardProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain,
    });

    await supervisor.sample("interval");
    now += 60_000;
    await supervisor.sample("interval");
    now += 60_000;
    await supervisor.sample("interval");

    expect(replaceWorker).toHaveBeenCalledTimes(2);
    expect(drain).toHaveBeenCalledOnce();
    expect(supervisor.snapshot).toMatchObject({ state: "draining", replacementCount: 2 });
  });

  it("does not open the replacement circuit outside the ten minute window", async () => {
    const policy = DaemonResourcePolicy.fromSystemMemory(GIBIBYTE);
    let generation = 1;
    let now = 0;
    const replaceWorker = vi.fn(async () => (generation += 1));
    const drain = vi.fn(async () => undefined);
    const supervisor = new DaemonResourceSupervisor({
      policy,
      generation,
      now: () => now,
      residentMemoryBytes: () => policy.record.hardProcessRssBytes + 1,
      spoolBytes: () => 0,
      scheduleAtTurnBoundary: runImmediately,
      releaseTransientResources: async () => undefined,
      replaceWorker,
      drain,
    });

    await supervisor.sample("interval");
    now += 10 * 60 * 1_000 + 1;
    await supervisor.sample("interval");
    now += 10 * 60 * 1_000 + 1;
    await supervisor.sample("interval");

    expect(replaceWorker).toHaveBeenCalledTimes(3);
    expect(drain).not.toHaveBeenCalled();
    expect(supervisor.snapshot).toMatchObject({ state: "ready", replacementCount: 3 });
  });
});

function runImmediately(operation: () => Promise<void>): Promise<void> {
  return operation();
}
`},"head:packages/daemon/src/daemon-policy.test.ts":{path:"packages/daemon/src/daemon-policy.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"5a5c841682cda21a9bff6c698d90374931f0dee5815796bab0b4147d0febfcce",text:`import { describe, expect, it } from "vitest";

import { DaemonPolicy, type DaemonPolicyValues } from "./index.js";
import { DaemonPolicyTestFactory } from "./policy-testing.js";

const MEBIBYTE = 1024 * 1024;
const GIBIBYTE = 1024 * MEBIBYTE;

const expectedDefaults: DaemonPolicyValues = {
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
    effectiveMemoryBytes: GIBIBYTE,
    hardProcessRssBytes: 512 * MEBIBYTE,
    softProcessRssBytes: 409 * MEBIBYTE,
    resumeProcessRssBytes: 358 * MEBIBYTE,
    workerMaxOldGenerationSizeMiB: 256,
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
};

describe("DaemonPolicy", () => {
  it("defines every default leaf in one complete snapshot", () => {
    expect(DaemonPolicy.fromSystemMemory({ totalBytes: GIBIBYTE }).values).toEqual(
      expectedDefaults,
    );
  });

  it.each([
    ["positive lower constraint", 64 * GIBIBYTE, GIBIBYTE, GIBIBYTE],
    ["zero constraint", GIBIBYTE, 0, GIBIBYTE],
    ["negative constraint", GIBIBYTE, -1, GIBIBYTE],
    ["larger constraint", GIBIBYTE, 16 * GIBIBYTE, GIBIBYTE],
    ["equal constraint", GIBIBYTE, GIBIBYTE, GIBIBYTE],
    ["raw bytes", GIBIBYTE + 123, undefined, GIBIBYTE + 123],
  ])("selects effective memory for %s", (_, totalBytes, constrainedBytes, expected) => {
    const systemMemory =
      constrainedBytes === undefined ? { totalBytes } : { totalBytes, constrainedBytes };
    expect(DaemonPolicy.fromSystemMemory(systemMemory).values.resources).toMatchObject({
      effectiveMemoryBytes: expected,
    });
  });

  it.each([
    [1, 256, 204, 179, 128],
    [512 * MEBIBYTE, 256, 204, 179, 128],
    [GIBIBYTE, 512, 409, 358, 256],
    [16 * GIBIBYTE, 8_192, 6_553, 5_734, 4_096],
    [64 * GIBIBYTE, 8_192, 6_553, 5_734, 4_096],
  ])(
    "derives memory thresholds from %i raw bytes",
    (totalBytes, hardMiB, softMiB, resumeMiB, workerMiB) => {
      const resources = DaemonPolicy.fromSystemMemory({ totalBytes }).values.resources;
      expect(resources).toMatchObject({
        hardProcessRssBytes: hardMiB * MEBIBYTE,
        softProcessRssBytes: softMiB * MEBIBYTE,
        resumeProcessRssBytes: resumeMiB * MEBIBYTE,
        workerMaxOldGenerationSizeMiB: workerMiB,
      });
    },
  );

  it("freezes every snapshot level and keeps equal timings independently overrideable", () => {
    const policy = DaemonPolicyTestFactory.withOverrides(
      DaemonPolicy.fromSystemMemory({ totalBytes: GIBIBYTE }),
      {
        startup: { observationPollIntervalMs: 21 },
        shutdown: { controllerPollIntervalMs: 22, processExitPollIntervalMs: 23 },
      },
    );
    expect(policy.values.startup.observationPollIntervalMs).toBe(21);
    expect(policy.values.shutdown.controllerPollIntervalMs).toBe(22);
    expect(policy.values.shutdown.processExitPollIntervalMs).toBe(23);
    expect(Object.isFrozen(policy.values)).toBe(true);
    for (const section of Object.values(policy.values)) expect(Object.isFrozen(section)).toBe(true);
  });

  it("round-trips only one complete exact versioned snapshot", () => {
    const policy = DaemonPolicyTestFactory.withOverrides(
      DaemonPolicy.fromSystemMemory({ totalBytes: GIBIBYTE }),
      { transport: { singleResponseTimeoutMs: 991 } },
    );
    const serialized = policy.toSerialized();
    expect(DaemonPolicy.fromSerialized(serialized).values).toEqual(policy.values);
    expect(Object.isFrozen(serialized)).toBe(true);
    expect(Object.isFrozen(serialized.values)).toBe(true);
  });

  it.each([
    ["missing key", (value: any) => delete value.values.transport.singleResponseTimeoutMs],
    ["extra key", (value: any) => (value.values.transport.extra = 1)],
    ["wrong schema", (value: any) => (value.schemaVersion = 2)],
    ["NaN", (value: any) => (value.values.output.inlineRawBytes = Number.NaN)],
    ["Infinity", (value: any) => (value.values.shutdown.stopTimeoutMs = Number.POSITIVE_INFINITY)],
    ["unsafe count", (value: any) => (value.values.diagnostics.logBackupCount = 2 ** 53)],
    [
      "negative count",
      (value: any) => (value.values.delivery.postAcceptanceExecutionReattachmentLimit = -1),
    ],
    ["zero poll interval", (value: any) => (value.values.resources.workerHeapSampleIntervalMs = 0)],
    ["zero chunk capacity", (value: any) => (value.values.output.maximumChunkRawBytes = 0)],
    [
      "invalid hysteresis",
      (value: any) =>
        (value.values.resources.resumeProcessRssBytes = value.values.resources.softProcessRssBytes),
    ],
    [
      "invalid output ordering",
      (value: any) =>
        (value.values.output.inlineRawBytes = value.values.output.maximumResultRawBytes + 1),
    ],
  ])("rejects %s", (_, mutate) => {
    const value = structuredClone(
      DaemonPolicy.fromSystemMemory({ totalBytes: GIBIBYTE }).toSerialized(),
    );
    mutate(value);
    expect(() => DaemonPolicy.fromSerialized(value)).toThrow("Invalid daemon policy");
  });
});
`},"head:apps/cli/src/daemon/daemon-startup-coordinator.test.ts":{path:"apps/cli/src/daemon/daemon-startup-coordinator.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"d4fd03f5b740660e58a1ed78b51d93d3b62e2998bab19076c1ec95e0b8c35bf8",text:`import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import { CommandOutputSnapshot } from "../command-execution-result.js";
import { StateDirectoryResolver } from "../state-directory-resolver.js";
import { TestDaemonController as DaemonController } from "../../test/helpers/daemon-controller.js";
import { TestDaemonStartupCoordinator as DaemonStartupCoordinator } from "../../test/helpers/daemon-startup-coordinator.js";
import {
  DaemonProcessTerminationError,
  type DaemonProcess,
  type DaemonProcessExit,
  type DaemonProcessLauncher,
  type DaemonProcessTerminator,
} from "./daemon-process-launcher.js";
import { TestNodeDaemonProcessTerminator as NodeDaemonProcessTerminator } from "../../test/helpers/daemon-process-terminator.js";
import {
  DAEMON_PROTOCOL_VERSION,
  DAEMON_RECORD_SCHEMA_VERSION,
  type DaemonLifecycleRequest,
  type DaemonLifecycleResponse,
  type DaemonRecord,
  type DaemonRequest,
  type DaemonResponse,
} from "./daemon-protocol.js";
import { TestDaemonRegistry as DaemonRegistry } from "../../test/helpers/daemon-registry.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import type { DaemonExecutionReceipt } from "./local-daemon-transport.js";
import { TestLocalDaemonTransport as LocalDaemonTransport } from "../../test/helpers/local-daemon-transport.js";

const STARTUP_COORDINATION_GRACE_MS =
  DaemonPolicy.currentSystem().values.startup.coordinationGraceMs;

describe("DaemonStartupCoordinator", () => {
  const roots: string[] = [];
  const realProcessIds: number[] = [];

  afterEach(async () => {
    const terminator = new NodeDaemonProcessTerminator(100, 5);
    for (const pid of realProcessIds) {
      if (terminator.isAlive(pid)) await terminator.terminate(pid);
    }
    realProcessIds.length = 0;
    for (const root of roots) rmSync(root, { recursive: true, force: true });
    roots.length = 0;
  });

  it("returns concurrent warm-up triggers after electing one detached child", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const firstCoordinator = harness.coordinator();
    const secondCoordinator = harness.coordinator();

    const [first, second] = await Promise.all([
      firstCoordinator.trigger(harness.identity),
      secondCoordinator.trigger(harness.identity),
    ]);

    expect(harness.launcher.launchCount).toBe(1);
    expect([first.status, second.status].sort()).toEqual(["launched", "starting"]);
    expect(first.instanceId).toBe(second.instanceId);
    expect(first.pid).toBe(second.pid);
    expect(harness.registry.startupOwner(harness.identity)).toMatchObject({
      ownerKind: "daemon",
      ownerPid: first.pid,
    });
    readinessGate.release();
  });

  it("retries for a caller already waiting on another coordinator's failed child", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 1 });
    const initiatingCoordinator = harness.coordinator();
    const waitingCoordinator = harness.coordinator();

    await expect(initiatingCoordinator.trigger(harness.identity)).resolves.toMatchObject({
      status: "launched",
    });

    await expect(waitingCoordinator.ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "ready",
    });

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("shares one readiness record without a healthy startup deadline", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const coordinator = harness.coordinator();
    const trigger = await coordinator.trigger(harness.identity);
    const firstWait = coordinator.waitUntilReady(harness.identity);
    const secondWait = harness.coordinator().waitUntilReady(harness.identity);
    let settled = false;
    void Promise.all([firstWait, secondWait]).then(() => {
      settled = true;
    });

    await new Promise((resolve) => setTimeout(resolve, 25));

    expect(settled).toBe(false);
    expect(harness.registry.read(harness.identity)).toMatchObject({
      instanceId: trigger.instanceId,
      pid: trigger.pid,
      state: "starting",
    });

    readinessGate.release();
    await expect(Promise.all([firstWait, secondWait])).resolves.toEqual([
      expect.objectContaining({ status: "ready" }),
      expect.objectContaining({ status: "already-running" }),
    ]);
  });

  it("concurrent starts launch one daemon and report ready then already running", async () => {
    const harness = new CoordinatorHarness(roots);

    const [first, second] = await Promise.all([
      harness.coordinator().ensureRunning(harness.identity),
      harness.coordinator().ensureRunning(harness.identity),
    ]);

    expect(harness.launcher.launchCount).toBe(1);
    expect([first.status, second.status].sort()).toEqual(["already-running", "ready"]);
    expect(harness.registry.list()).toHaveLength(1);
  });

  it("keeps waiting for its live child after a transient ready-record probe failure", async () => {
    const harness = new CoordinatorHarness(roots, { readyAuthenticationFailures: 1 });

    await expect(harness.coordinator().ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "ready",
      workspaceRoot: "/repo",
    });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)).toMatchObject({
      pid: harness.launcher.lastPid,
      state: "ready",
    });
  });

  it("keeps a later caller waiting through a transient missing startup owner", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const trigger = await harness.coordinator().trigger(harness.identity);
    const laterCoordinator = harness.coordinator();
    const startupOwner = harness.registry.startupOwner.bind(harness.registry);
    let missingOwnerReads = 0;
    vi.spyOn(harness.registry, "startupOwner").mockImplementation((identity) => {
      missingOwnerReads += 1;
      if (missingOwnerReads <= 3) {
        if (missingOwnerReads === 3) readinessGate.release();
        return undefined;
      }
      return startupOwner(identity);
    });

    const ready = laterCoordinator.waitUntilReady(harness.identity);

    await expect(ready).resolves.toMatchObject({
      status: "already-running",
      workspaceRoot: "/repo",
      pid: trigger.pid,
    });
    expect(harness.launcher.launchCount).toBe(1);
    expect(missingOwnerReads).toBeGreaterThanOrEqual(3);
  });

  it("bounds a persistent missing startup owner by the registry mutation grace", async () => {
    const harness = new CoordinatorHarness(roots);
    const startingRecord: DaemonRecord = {
      ...harness.readyRecord("missing-owner", harness.launcher.symnavVersion, 6001),
      state: "starting" as const,
    };
    harness.registry.write(startingRecord);
    let now = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            now += STARTUP_COORDINATION_GRACE_MS;
            return now;
          },
        })
        .waitUntilReady(harness.identity),
    ).rejects.toThrow("Daemon startup failed before readiness");

    expect(now).toBeGreaterThan(STARTUP_COORDINATION_GRACE_MS);
    expect(harness.launcher.launchCount).toBe(0);
  });

  it("rechecks readiness when publication releases startup ownership between reads", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const coordinator = harness.coordinator();
    await coordinator.trigger(harness.identity);
    const startingRecord = harness.registry.readStored(harness.identity)!;
    const originalReadStored = harness.registry.readStored.bind(harness.registry);
    vi.spyOn(harness.registry, "read").mockReturnValueOnce(startingRecord);
    vi.spyOn(harness.registry, "readStored").mockImplementationOnce((identity) => {
      const readyRecord: DaemonRecord = {
        ...startingRecord,
        state: "ready",
        readyAt: Date.now(),
        fileCount: 2,
      };
      expect(harness.registry.writeIfStartupOwner(identity, readyRecord)).toBe(true);
      harness.registry.removeStartupLockIfProcess(identity, readyRecord);
      return originalReadStored(identity);
    });

    await expect(coordinator.waitUntilReady(harness.identity)).resolves.toMatchObject({
      status: "ready",
      workspaceRoot: "/repo",
    });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
    expect(harness.registry.readStored(harness.identity)?.state).toBe("ready");
    readinessGate.release();
  });

  it("does not report an earlier child exit against a replacement startup", async () => {
    const harness = new CoordinatorHarness(roots, {
      neverReady: true,
      childExit: { code: 17, signal: null, cause: "exit" },
      childExitDelayMs: 5,
    });
    const coordinator = harness.coordinator();
    await coordinator.trigger(harness.identity);
    await waitUntil(() => harness.registry.readStored(harness.identity) === undefined);
    const replacement = harness.readyRecord(
      "replacement",
      harness.launcher.symnavVersion,
      process.pid,
    );
    const lease = harness.registry.acquireStartup(harness.identity, replacement.instanceId)!;
    harness.registry.write({ ...replacement, state: "starting" });

    const ready = coordinator.waitUntilReady(harness.identity);
    setTimeout(() => {
      harness.registry.write(replacement);
      lease.release();
    }, 5);

    await expect(ready).resolves.toMatchObject({
      status: "already-running",
      pid: process.pid,
    });
  });

  it("reuses a validated daemon running the same version", async () => {
    const harness = new CoordinatorHarness(roots);
    harness.seedReady("existing", "0.1.0", 4001);

    const result = await harness.coordinator().ensureRunning(harness.identity);

    expect(result.status).toBe("already-running");
    expect(harness.launcher.launchCount).toBe(0);
  });

  it("drains a validated daemon running a different version", async () => {
    const harness = new CoordinatorHarness(roots);
    harness.seedReady("existing", "0.0.9", 4002);

    const result = await harness.coordinator().ensureRunning(harness.identity);

    expect(harness.transport.terminationCount).toBe(1);
    expect(harness.terminator.terminated).not.toContain(4002);
    expect(harness.launcher.launchCount).toBe(1);
    expect(result.status).toBe("ready");
    expect(harness.registry.list()).toHaveLength(1);
  });

  it("retains ownership when a stale record references an unrelated live process", async () => {
    const oldPid = await spawnIdleProcess(realProcessIds);
    const runtime = socketBackedCoordinator(roots);
    runtime.registry.write(readyRecord(runtime.identity, "old", "old-process", oldPid));

    await expect(runtime.coordinator.ensureRunning(runtime.identity)).rejects.toThrow(
      /live but unresponsive/i,
    );

    expect(runtime.terminator.isAlive(oldPid)).toBe(true);
    expect(runtime.registry.list()).toHaveLength(1);
    expect(runtime.registry.readStored(runtime.identity)?.instanceId).toBe("old");
  });

  it.each(["schema", "protocol", "symnav"] as const)(
    "proves and replaces a real daemon for $mismatch mismatch",
    async (mismatch) => {
      const runtime = socketBackedCoordinator(roots);
      const oldPid = await spawnIdentifiableDaemon(
        runtime.identity,
        "old",
        "old-process",
        10,
        realProcessIds,
      );
      const oldRecord = readyRecord(runtime.identity, "old", "old-process", oldPid);
      const incompatibleRecord: DaemonRecord = {
        ...oldRecord,
        schemaVersion:
          mismatch === "schema" ? DAEMON_RECORD_SCHEMA_VERSION + 1 : oldRecord.schemaVersion,
        protocolVersion:
          mismatch === "protocol" ? DAEMON_PROTOCOL_VERSION + 1 : oldRecord.protocolVersion,
        symnavVersion: mismatch === "symnav" ? "0.0.9" : "0.1.0",
      };
      runtime.registry.write(incompatibleRecord);

      const result = await runtime.coordinator.ensureRunning(runtime.identity);

      expect(result.status).toBe("ready");
      await waitUntil(() => !runtime.terminator.isAlive(oldPid));
      expect(runtime.registry.list()).toHaveLength(1);
      expect(runtime.registry.read(runtime.identity)?.instanceId).not.toBe("old");
      await runtime.launcher.close();
    },
    10_000,
  );

  it("cleans startup state when process launch fails", async () => {
    const harness = new CoordinatorHarness(roots, { launchFailure: new Error("spawn failed") });

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "spawn failed",
    );

    expect(harness.registry.readStored(harness.identity)).toBeUndefined();
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("does not launch a replacement until the authenticated daemon process exits", async () => {
    const harness = new CoordinatorHarness(roots, { oldDaemonExitsAfterTerminate: false });
    harness.seedReady("existing", "0.0.9", 4003);

    const starting = harness.coordinator().ensureRunning(harness.identity);
    await waitUntil(() => harness.transport.terminationCount === 1);
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(harness.launcher.launchCount).toBe(0);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe("existing");

    harness.terminator.alive.delete(4003);
    await expect(starting).resolves.toMatchObject({ status: "ready" });
    expect(harness.launcher.launchCount).toBe(1);
  });

  it("preserves termination failure precedence and startup ownership when the process stays alive", async () => {
    const harness = new CoordinatorHarness(roots, {
      launchFailure: new Error("replacement launch must remain blocked"),
      oldDaemonExitsAfterTerminate: false,
    });
    harness.seedReady("existing", "0.0.9", 4004);

    await expect(
      harness.coordinator({ terminationTimeoutMs: 5 }).ensureRunning(harness.identity),
    ).rejects.toBeInstanceOf(DaemonProcessTerminationError);

    expect(harness.launcher.launchCount).toBe(0);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe("existing");
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("keeps replacement termination bounded when readiness has no default deadline", async () => {
    const harness = new CoordinatorHarness(roots, { oldDaemonExitsAfterTerminate: false });
    harness.seedReady("existing", "0.0.9", 4005);
    let elapsedMs = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            elapsedMs += 300_001;
            return elapsedMs;
          },
        })
        .ensureRunning(harness.identity),
    ).rejects.toBeInstanceOf(DaemonProcessTerminationError);

    expect(harness.launcher.launchCount).toBe(0);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe("existing");
  }, 1_000);

  it("returns after launching a healthy daemon that is still warming", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });

    await expect(harness.coordinator().trigger(harness.identity)).resolves.toMatchObject({
      status: "launched",
    });

    expect(harness.terminator.terminated).not.toContain(harness.launcher.lastPid);
    expect(harness.registry.readStored(harness.identity)?.pid).toBe(harness.launcher.lastPid);
    expect(harness.registry.startupOwner(harness.identity)).toMatchObject({ ownerKind: "daemon" });
  });

  it("retains one live daemon warm-up after the launcher heartbeat expires", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });

    await harness.coordinator().trigger(harness.identity);
    const originalRecord = harness.registry.readStored(harness.identity);
    const originalOwner = harness.registry.startupOwner(harness.identity);
    expect(originalRecord?.pid).toBe(harness.launcher.lastPid);
    expect(originalOwner).toBeDefined();
    writeFileSync(
      harness.identity.startupOwnerPath(harness.identity.lockPath),
      JSON.stringify({ ...originalOwner, heartbeatAt: Date.now() - 60_000 }),
    );
    harness.terminator.currentProcessIsAlive = false;

    await expect(harness.coordinator().trigger(harness.identity)).resolves.toMatchObject({
      status: "starting",
      instanceId: originalRecord?.instanceId,
    });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)).toEqual(originalRecord);
  });

  it("lets a later caller use the original warm-up after the initiating caller exits", async () => {
    const readinessPublicationGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate });

    await harness.coordinator().trigger(harness.identity);
    const originalRecord = harness.registry.readStored(harness.identity);
    expect(originalRecord?.pid).toBe(harness.launcher.lastPid);
    harness.terminator.currentProcessIsAlive = false;

    const laterCaller = harness.coordinator().ensureRunning(harness.identity);
    readinessPublicationGate.release();

    await expect(laterCaller).resolves.toMatchObject({
      status: "already-running",
      workspaceRoot: "/repo",
      pid: originalRecord?.pid,
    });
    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe(
      originalRecord?.instanceId,
    );
  });

  it("reports its launched child's exit after startup cleanup removes the record", async () => {
    const harness = new CoordinatorHarness(roots, {
      neverReady: true,
      childExit: { code: 17, signal: null, cause: "exit" },
      childExitDelayMs: 5,
    });
    const coordinator = harness.coordinator();
    const startedAt = Date.now();

    await coordinator.trigger(harness.identity);
    await waitUntil(
      () =>
        harness.registry.readStored(harness.identity) === undefined &&
        harness.registry.startupOwner(harness.identity) === undefined,
    );

    await expect(coordinator.waitUntilReady(harness.identity)).rejects.toThrow(
      "Daemon child exited before readiness (code 17, signal null)",
    );

    expect(Date.now() - startedAt).toBeLessThan(500);
    expect(harness.registry.readStored(harness.identity)).toBeUndefined();
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("has no default readiness deadline while the launched child stays live", async () => {
    const harness = new CoordinatorHarness(roots, { readyDelayMs: 5 });
    let elapsedMs = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            elapsedMs += 300_001;
            return elapsedMs;
          },
        })
        .ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready" });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.terminator.terminated).toEqual([]);
  });

  it("retries one child exit before readiness without waiting for a deadline", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 1 });

    await expect(harness.coordinator().ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "ready",
    });

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("surfaces a second child exit instead of retrying indefinitely", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 2 });

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "Daemon child exited before readiness (code 1, signal null)",
    );

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("does not retry a child failure when policy permits zero retries", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 1 });

    await expect(
      harness.coordinator({ policy: startupRetryPolicy(0) }).ensureRunning(harness.identity),
    ).rejects.toThrow("Daemon child exited before readiness (code 1, signal null)");

    expect(harness.launcher.launchCount).toBe(1);
  });

  it("allows each child-failure retry granted by policy", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 2 });

    await expect(
      harness.coordinator({ policy: startupRetryPolicy(2) }).ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready" });

    expect(harness.launcher.launchCount).toBe(3);
  });

  it("does not reset the retry budget after waiting for startup ownership", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 2 });
    const earlierLease = harness.registry.acquireStartup(harness.identity, "earlier-owner");
    setTimeout(() => earlierLease?.release(), 5);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "Daemon child exited before readiness (code 1, signal null)",
    );

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("recovers a confirmed dead child from legacy caller-owned startup state", async () => {
    const harness = new CoordinatorHarness(roots);
    expect(harness.registry.acquireStartup(harness.identity, "legacy-starting")).toBeDefined();
    harness.registry.write({
      ...harness.readyRecord("legacy-starting", harness.launcher.symnavVersion, 999_999_999),
      state: "starting",
    });

    await expect(harness.coordinator().ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "ready",
      workspaceRoot: "/repo",
    });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)?.instanceId).not.toBe("legacy-starting");
  });

  it("retains startup ownership when a previous daemon cannot terminate", async () => {
    const harness = new CoordinatorHarness(roots);
    const existing = harness.readyRecord("existing", "0.0.9", 4002);
    harness.seedReady(existing.instanceId, existing.symnavVersion, existing.pid);
    vi.spyOn(harness.transport, "request").mockImplementation(
      async (_endpoint, request): Promise<DaemonLifecycleResponse> => {
        if (request.kind === "ping") {
          return {
            kind: "pong",
            protocolVersion: DAEMON_PROTOCOL_VERSION,
            instanceId: existing.instanceId,
            symnavVersion: existing.symnavVersion,
          };
        }
        if (request.kind === "identify") {
          return {
            kind: "identity",
            instanceId: existing.instanceId,
            processToken: existing.processToken,
            pid: existing.pid,
            startedAt: existing.startedAt,
          };
        }
        if (request.kind === "terminate") {
          return {
            kind: "terminating",
            instanceId: existing.instanceId,
            processToken: existing.processToken,
          };
        }
        throw new Error(\`Unexpected \${request.kind} request\`);
      },
    );

    await expect(
      harness.coordinator({ terminationTimeoutMs: 5 }).ensureRunning(harness.identity),
    ).rejects.toBeInstanceOf(DaemonProcessTerminationError);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("waits beyond startup-owner grace for a live daemon to finish warming", async () => {
    const harness = new CoordinatorHarness(roots);
    let elapsedMs = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            elapsedMs += 45_000;
            return elapsedMs;
          },
        })
        .ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready", workspaceRoot: "/repo" });
  });

  it("recovers a durable startup lock when its owner published no record", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });
    expect(harness.registry.acquireStartup(harness.identity, "orphan")).toBeDefined();

    await expect(
      harness
        .coordinator({ processTerminator: new TestProcessTerminator(false) })
        .trigger(harness.identity),
    ).resolves.toMatchObject({ status: "launched" });

    expect(harness.registry.startupOwner(harness.identity)?.instanceId).not.toBe("orphan");
    expect(harness.registry.acquireStartup(harness.identity, "recovered")).toBeUndefined();
  });

  it("does not launch after startup ownership changes before publication", async () => {
    const harness = new CoordinatorHarness(roots);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner").mockReturnValue(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "ownership changed before process launch",
    );
    expect(harness.launcher.launchCount).toBe(0);
  });

  it("terminates a child after startup ownership changes during launch", async () => {
    const harness = new CoordinatorHarness(roots);
    const publishStarting = harness.registry.writeStartingIfStartupOwner.bind(harness.registry);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner")
      .mockImplementationOnce(publishStarting)
      .mockReturnValueOnce(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "ownership changed after process launch",
    );
    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.terminator.terminated).toContain(harness.launcher.lastPid);
  });

  it("keeps a live daemon-owned startup authoritative through a slow warm", async () => {
    const readinessPublicationGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate });
    const starting = harness.coordinator().ensureRunning(harness.identity);
    const startingOutcome = starting.then(
      (result) => ({ status: "fulfilled" as const, result }),
      (error: unknown) => ({ status: "rejected" as const, error }),
    );
    let assertionFailure: unknown;
    try {
      await waitUntil(() => harness.registry.read(harness.identity)?.state === "starting");
      const ownerBeforeStatus = harness.registry.startupOwner(harness.identity);
      const controller = new DaemonController(
        harness.registry,
        harness.transport as unknown as LocalDaemonTransport,
        dirname(harness.identity.registryDirectory),
        { processTerminator: harness.terminator },
      );

      await expect(controller.status()).resolves.toEqual([
        expect.objectContaining({ workspaceRoot: "/repo", state: "starting" }),
      ]);
      await expect(harness.coordinator().trigger(harness.identity)).resolves.toMatchObject({
        status: "starting",
      });
      expect(harness.registry.startupOwner(harness.identity)).toEqual(ownerBeforeStatus);
    } catch (error) {
      assertionFailure = error;
    } finally {
      readinessPublicationGate.release();
    }
    const settledStarting = await startingOutcome;
    if (assertionFailure !== undefined) throw assertionFailure;
    if (settledStarting.status === "rejected") throw settledStarting.error;
    expect(settledStarting.result).toMatchObject({ status: "ready", workspaceRoot: "/repo" });
    expect(harness.launcher.launchCount).toBe(1);
  }, 5_000);

  it("recovers after a slow startup mutation owner is killed and elects one fresh daemon", async () => {
    const harness = new CoordinatorHarness(roots);
    const stateDirectory = dirname(harness.identity.registryDirectory);
    const mutationOwner = await spawnStartupMutationOwner(
      harness.identity.workspaceRoot,
      stateDirectory,
      1_100,
      realProcessIds,
    );
    const mutationOwnerPid = mutationOwner.ownerPid;
    await new NodeDaemonProcessTerminator(100, 5).terminate(mutationOwnerPid);
    mutationOwner.process.kill("SIGKILL");
    expect(harness.registry.list()).toHaveLength(1);
    expect(harness.registry.startupOwner(harness.identity)).toMatchObject({
      instanceId: "orphaned-mutation",
    });
    expect(() => process.kill(mutationOwnerPid, 0)).toThrow();
    const controller = new DaemonController(
      harness.registry,
      harness.transport as unknown as LocalDaemonTransport,
      stateDirectory,
      { processTerminator: harness.terminator },
    );

    await expect(controller.status()).resolves.toEqual([]);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
    expect(
      harness.registry.readStoredInstance(harness.identity, "orphaned-mutation"),
    ).toBeUndefined();
    const [first, second] = await Promise.all([
      harness.coordinator().ensureRunning(harness.identity),
      harness.coordinator().ensureRunning(harness.identity),
    ]);
    expect([first.status, second.status].sort()).toEqual(["already-running", "ready"]);
    expect(harness.launcher.launchCount).toBe(1);
    await expect(harness.coordinator().ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "already-running",
    });
    expect(harness.launcher.launchCount).toBe(1);
  }, 10_000);

  it("observes a real child exit before releasing startup ownership", async () => {
    const root = temporaryDirectory(roots);
    const identity = DaemonWorkspaceIdentity.from("/repo", root);
    const registry = new DaemonRegistry(identity.registryDirectory);
    const markerPath = join(root, "late-publication");
    const launcher = new DelayedMarkerLauncher(markerPath, realProcessIds);
    const transport = new RegistryTransport(registry, identity);
    const coordinator = new DaemonStartupCoordinator(
      registry,
      launcher,
      transport as unknown as LocalDaemonTransport,
      { pollIntervalMs: 2 },
    );

    await expect(coordinator.ensureRunning(identity)).rejects.toThrow(/exited before readiness/i);

    expect(existsSync(markerPath)).toBe(true);
    expect(registry.startupOwner(identity)).toBeUndefined();
    expect(registry.readStored(identity)).toBeUndefined();
  });

  it("recovers a durable startup lock when its owner published no record", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });
    expect(harness.registry.acquireStartup(harness.identity, "orphan")).toBeDefined();
    const owner = harness.registry.startupOwner(harness.identity)!;
    writeFileSync(
      harness.identity.startupOwnerPath(harness.identity.lockPath),
      JSON.stringify({ ...owner, heartbeatAt: Date.now() - 20_000 }),
    );

    await expect(
      harness
        .coordinator({ processTerminator: new TestProcessTerminator(false) })
        .trigger(harness.identity),
    ).resolves.toMatchObject({ status: "launched" });

    expect(harness.registry.startupOwner(harness.identity)?.instanceId).not.toBe("orphan");
    expect(harness.registry.acquireStartup(harness.identity, "recovered")).toBeUndefined();
  });

  it("does not launch after startup ownership changes before publication", async () => {
    const harness = new CoordinatorHarness(roots);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner").mockReturnValue(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      /ownership changed/i,
    );

    expect(harness.launcher.launchCount).toBe(0);
  });

  it("terminates a child after startup ownership changes during launch", async () => {
    const harness = new CoordinatorHarness(roots);
    const publishStarting = harness.registry.writeStartingIfStartupOwner.bind(harness.registry);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner")
      .mockImplementationOnce(publishStarting)
      .mockReturnValueOnce(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "ownership changed after process launch",
    );
    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.terminator.terminated).toContain(harness.launcher.lastPid);
  });

  it("does not let the coordinator renew daemon ownership while readiness is pending", async () => {
    const harness = new CoordinatorHarness(roots, { readyDelayMs: 80 });
    const coordinator = harness.coordinator();
    await coordinator.trigger(harness.identity);
    await waitUntil(() => harness.registry.read(harness.identity)?.state === "starting");
    const initialRevision = harness.registry.startupOwner(harness.identity)?.revision;

    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(harness.registry.startupOwner(harness.identity)?.revision).toBe(initialRevision);
    await expect(coordinator.waitUntilReady(harness.identity)).resolves.toMatchObject({
      status: "ready",
    });
  });

  it("elects one fresh daemon after a mutation owner is killed", async () => {
    const harness = new CoordinatorHarness(roots);
    const stateDirectory = dirname(harness.identity.registryDirectory);
    const mutationOwner = await spawnStartupMutationOwner(
      harness.identity.workspaceRoot,
      stateDirectory,
      10,
      realProcessIds,
    );
    const mutationOwnerPid = mutationOwner.ownerPid;
    await new NodeDaemonProcessTerminator(100, 5).terminate(mutationOwnerPid);
    mutationOwner.process.kill("SIGKILL");
    const controller = new DaemonController(
      harness.registry,
      harness.transport as unknown as LocalDaemonTransport,
      stateDirectory,
      { processTerminator: harness.terminator },
    );

    await expect(controller.status()).resolves.toEqual([]);
    const [first, second] = await Promise.all([
      harness.coordinator().ensureRunning(harness.identity),
      harness.coordinator().ensureRunning(harness.identity),
    ]);

    expect([first.status, second.status].sort()).toEqual(["already-running", "ready"]);
    expect(harness.launcher.launchCount).toBe(1);
  }, 10_000);
});

interface CoordinatorHarnessOptions {
  readonly launchFailure?: Error;
  readonly neverReady?: boolean;
  readonly newDaemonPid?: number;
  readonly readyDelayMs?: number;
  readonly readinessPublicationGate?: ReadinessPublicationGate;
  readonly oldDaemonExitsAfterTerminate?: boolean;
  readonly exitingLaunches?: number;
  readonly childExit?: DaemonProcessExit;
  readonly childExitDelayMs?: number;
  readonly readyAuthenticationFailures?: number;
}

class ReadinessPublicationGate {
  private readonly publicationAllowed: Promise<void>;
  private releasePublication!: () => void;

  constructor() {
    this.publicationAllowed = new Promise((resolve) => {
      this.releasePublication = resolve;
    });
  }

  wait(): Promise<void> {
    return this.publicationAllowed;
  }

  release(): void {
    this.releasePublication();
  }
}

class CoordinatorHarness {
  readonly identity: DaemonWorkspaceIdentity;
  readonly registry: DaemonRegistry;
  readonly terminator = new TestProcessTerminator();
  readonly launcher: ReadyTestLauncher;
  readonly transport: RegistryTransport;

  constructor(roots: string[], options: CoordinatorHarnessOptions = {}) {
    const stateDir = temporaryDirectory(roots);
    this.identity = DaemonWorkspaceIdentity.from("/repo", stateDir);
    this.registry = new DaemonRegistry(this.identity.registryDirectory);
    this.launcher = new ReadyTestLauncher(this.registry, this.identity, this.terminator, options);
    this.transport = new RegistryTransport(
      this.registry,
      this.identity,
      (pid) => {
        if (options.oldDaemonExitsAfterTerminate !== false) this.terminator.alive.delete(pid);
      },
      options.readyAuthenticationFailures,
    );
  }

  coordinator(
    options: {
      readonly terminationTimeoutMs?: number;
      readonly policy?: Pick<DaemonPolicyValues, "startup" | "shutdown">;
      readonly processTerminator?: DaemonProcessTerminator;
      readonly now?: () => number;
    } = {},
  ): DaemonStartupCoordinator {
    return new DaemonStartupCoordinator(
      this.registry,
      this.launcher,
      this.transport as unknown as LocalDaemonTransport,
      {
        ...(options.terminationTimeoutMs === undefined
          ? {}
          : { terminationTimeoutMs: options.terminationTimeoutMs }),
        ...(options.policy === undefined ? {} : { policy: options.policy }),
        pollIntervalMs: 1,
        processTerminator: options.processTerminator ?? this.terminator,
        ...(options.now === undefined ? {} : { now: options.now }),
      },
    );
  }

  seedReady(instanceId: string, symnavVersion: string, pid: number): void {
    this.terminator.alive.add(pid);
    this.registry.write(this.readyRecord(instanceId, symnavVersion, pid));
  }

  readyRecord(instanceId: string, symnavVersion: string, pid: number): DaemonRecord {
    return {
      schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      symnavVersion,
      workspaceRoot: this.identity.workspaceRoot,
      workspaceKey: this.identity.workspaceKey,
      stateKey: this.identity.stateKey,
      identityKey: this.identity.identityKey,
      instanceId,
      processToken: \`\${instanceId}-process\`,
      endpoint: this.identity.endpoint(instanceId),
      pid,
      state: "ready",
      startedAt: 10,
      readyAt: 20,
      fileCount: 2,
      memoryCapBytes: 256 * 1024 * 1024,
    };
  }
}

function startupRetryPolicy(
  childFailureRetryLimit: number,
): Pick<DaemonPolicyValues, "startup" | "shutdown"> {
  return DaemonPolicyTestFactory.withOverrides(DaemonPolicy.currentSystem(), {
    startup: { childFailureRetryLimit },
  }).values;
}

class ReadyTestLauncher implements DaemonProcessLauncher {
  readonly symnavVersion = "0.1.0";
  readonly memoryCapBytes = 256 * 1024 * 1024;
  launchCount = 0;
  lastPid = 0;
  private nextPid = 5000;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly identity: DaemonWorkspaceIdentity,
    private readonly terminator: TestProcessTerminator,
    private readonly options: CoordinatorHarnessOptions,
  ) {}

  async launch(_identity: DaemonWorkspaceIdentity, instanceId: string): Promise<DaemonProcess> {
    this.launchCount += 1;
    if (this.options.launchFailure) throw this.options.launchFailure;
    const pid = this.options.newDaemonPid ?? this.nextPid++;
    this.lastPid = pid;
    this.terminator.alive.add(pid);
    const exitsBeforeReadiness = this.launchCount <= (this.options.exitingLaunches ?? 0);
    const childExit = exitsBeforeReadiness
      ? { code: 1, signal: null, cause: "exit" as const }
      : this.options.childExit;
    if (!this.options.neverReady && childExit === undefined) {
      const readinessPublicationGate = this.options.readinessPublicationGate;
      if (readinessPublicationGate === undefined) {
        setTimeout(() => this.publishReady(instanceId), this.options.readyDelayMs ?? 0);
      } else {
        void readinessPublicationGate.wait().then(() => this.publishReady(instanceId));
      }
    }
    const exited: Promise<DaemonProcessExit> =
      childExit === undefined
        ? new Promise(() => undefined)
        : new Promise((resolve) =>
            setTimeout(
              () => {
                this.terminator.alive.delete(pid);
                resolve(childExit);
              },
              exitsBeforeReadiness ? 5 : (this.options.childExitDelayMs ?? 0),
            ),
          );
    return {
      pid,
      exited,
      terminate: () => this.terminator.terminate(pid),
    };
  }

  private publishReady(instanceId: string): void {
    const starting = this.registry.readInstance(this.identity, instanceId);
    if (starting?.state !== "starting") return;
    this.registry.writeIfStartupOwner(this.identity, {
      ...starting,
      state: "ready",
      readyAt: Date.now(),
      fileCount: 2,
    });
  }
}

class RegistryTransport {
  terminationCount = 0;
  private readonly terminatedInstances = new Set<string>();
  private remainingReadyAuthenticationFailures: number;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly identity: DaemonWorkspaceIdentity,
    private readonly daemonTerminated: (pid: number) => void = () => undefined,
    readyAuthenticationFailures = 0,
  ) {
    this.remainingReadyAuthenticationFailures = readyAuthenticationFailures;
  }

  async request(
    _endpoint: string,
    request: DaemonLifecycleRequest,
  ): Promise<DaemonLifecycleResponse> {
    if (request.kind === "stop") {
      return { kind: "stopped", instanceId: request.instanceId };
    }
    if (request.kind === "terminate") {
      this.terminationCount += 1;
      this.terminatedInstances.add(request.instanceId);
      const record = this.registry.readStoredInstance(this.identity, request.instanceId);
      if (record !== undefined) this.daemonTerminated(record.pid);
      return {
        kind: "terminating",
        instanceId: request.instanceId,
        processToken: request.processToken,
      };
    }
    if (request.kind === "identify") {
      if (this.terminatedInstances.has(request.instanceId)) throw new Error("daemon terminated");
      const record = this.registry.readStoredInstance(this.identity, request.instanceId);
      if (record === undefined) throw new Error("missing daemon");
      if (record.state === "ready" && this.remainingReadyAuthenticationFailures > 0) {
        this.remainingReadyAuthenticationFailures -= 1;
        throw new Error("transient authentication failure");
      }
      return {
        kind: "identity",
        instanceId: record.instanceId,
        processToken: record.processToken,
        pid: record.pid,
        startedAt: record.startedAt,
      };
    }
    const record = this.registry.readStoredInstance(this.identity, request.instanceId);
    if (record === undefined) throw new Error("missing daemon");
    return {
      kind: "pong",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: request.instanceId,
      symnavVersion: record.symnavVersion,
    };
  }

  async execute(
    _endpoint: string,
    request: Extract<DaemonRequest, { kind: "execute" }>,
  ): Promise<DaemonExecutionReceipt> {
    return {
      acceptance: {
        requestId: request.requestId,
        instanceId: request.instanceId,
        acceptedAt: 1,
        queuePosition: 0,
      },
      completion: Promise.resolve({
        status: "completed",
        result: { output: new CommandOutputSnapshot([]), exitCode: 0 },
      }),
    };
  }

  async removeUnavailableEndpoint(_endpoint: string): Promise<boolean> {
    return true;
  }
}

class TestProcessTerminator implements DaemonProcessTerminator {
  readonly alive = new Set<number>();
  readonly terminated: number[] = [];

  constructor(public currentProcessIsAlive = true) {}

  isAlive(pid: number): boolean {
    return (this.currentProcessIsAlive && pid === process.pid) || this.alive.has(pid);
  }

  async terminate(pid: number): Promise<void> {
    this.terminated.push(pid);
    this.alive.delete(pid);
  }
}

class DelayedMarkerLauncher implements DaemonProcessLauncher {
  readonly symnavVersion = "0.1.0";
  readonly memoryCapBytes = 256 * 1024 * 1024;

  constructor(
    private readonly markerPath: string,
    private readonly processIds: number[],
  ) {}

  launch(): Promise<DaemonProcess> {
    return new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [
          "-e",
          'setTimeout(() => require("node:fs").writeFileSync(process.argv[1], "late"), 200)',
          this.markerPath,
        ],
        { stdio: "ignore" },
      );
      child.once("error", reject);
      child.once("spawn", () => {
        this.processIds.push(child.pid!);
        const terminator = new NodeDaemonProcessTerminator(100, 5);
        const exited = new Promise<DaemonProcessExit>((exitResolve) => {
          child.once("exit", (code, signal) => exitResolve({ code, signal, cause: "exit" }));
        });
        resolve({
          pid: child.pid!,
          exited,
          terminate: () => terminator.terminate(child.pid!),
        });
      });
    });
  }
}

function temporaryDirectory(roots: string[]): string {
  const root = StateDirectoryResolver.canonicalize(mkdtempSync(join(tmpdir(), "symnav-startup-")));
  roots.push(root);
  return root;
}
function spawnIdleProcess(processIds: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
      stdio: "ignore",
    });
    child.once("error", reject);
    child.once("spawn", () => {
      processIds.push(child.pid!);
      resolve(child.pid!);
    });
  });
}

interface StartupMutationOwner {
  readonly process: ChildProcess;
  readonly ownerPid: number;
}

function spawnStartupMutationOwner(
  workspaceRoot: string,
  stateDirectory: string,
  startupDelayMs: number,
  processIds: number[],
): Promise<StartupMutationOwner> {
  const mutationOwner = spawn(
    process.execPath,
    [
      fileURLToPath(new URL("../../node_modules/tsx/dist/cli.mjs", import.meta.url)),
      fileURLToPath(
        new URL("../../test/helpers/daemon-startup-mutation-owner.ts", import.meta.url),
      ),
      workspaceRoot,
      stateDirectory,
      String(startupDelayMs),
    ],
    { stdio: ["ignore", "ignore", "ignore", "ipc"] },
  );
  return new Promise((resolve, reject) => {
    mutationOwner.once("error", reject);
    mutationOwner.once("spawn", () => processIds.push(mutationOwner.pid!));
    mutationOwner.once("exit", (code, signal) => {
      reject(new Error(\`Mutation owner exited before readiness: code=\${code} signal=\${signal}\`));
    });
    mutationOwner.once("message", (message) => {
      if (typeof message !== "number" || !Number.isSafeInteger(message) || message <= 0) {
        reject(new Error(\`Mutation owner published invalid pid: \${String(message)}\`));
        return;
      }
      if (!processIds.includes(message)) processIds.push(message);
      resolve({ process: mutationOwner, ownerPid: message });
    });
  });
}

async function waitUntil(predicate: () => boolean): Promise<void> {
  const deadline = Date.now() + 1_000;
  while (Date.now() <= deadline) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error("Timed out waiting for daemon process exit");
}

interface SocketBackedCoordinator {
  readonly identity: DaemonWorkspaceIdentity;
  readonly registry: DaemonRegistry;
  readonly terminator: NodeDaemonProcessTerminator;
  readonly launcher: InProcessReadyLauncher;
  readonly coordinator: DaemonStartupCoordinator;
}

function socketBackedCoordinator(roots: string[]): SocketBackedCoordinator {
  const stateDirectory = temporaryDirectory(roots);
  const identity = DaemonWorkspaceIdentity.from(join(stateDirectory, "workspace"), stateDirectory);
  const registry = new DaemonRegistry(identity.registryDirectory);
  const transport = new LocalDaemonTransport({ requestTimeoutMs: 1_000 });
  const terminator = new NodeDaemonProcessTerminator(100, 5);
  const launcher = new InProcessReadyLauncher(registry, transport);
  return {
    identity,
    registry,
    terminator,
    launcher,
    coordinator: new DaemonStartupCoordinator(registry, launcher, transport, {
      pollIntervalMs: 2,
      processTerminator: terminator,
    }),
  };
}

class InProcessReadyLauncher implements DaemonProcessLauncher {
  readonly symnavVersion = "0.1.0";
  readonly memoryCapBytes = 256 * 1024 * 1024;
  private server: Awaited<ReturnType<LocalDaemonTransport["listen"]>> | undefined;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly transport: LocalDaemonTransport,
  ) {}

  async launch(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): Promise<DaemonProcess> {
    const startingRecord = this.registry.readInstance(identity, instanceId);
    if (startingRecord?.state !== "starting") throw new Error("missing starting record");
    this.server = await this.transport.listen(
      identity.endpoint(instanceId),
      async (request, send) => {
        if (request.kind === "identify") {
          return {
            kind: "identity",
            instanceId,
            processToken,
            pid: process.pid,
            startedAt: startingRecord.startedAt,
          };
        }
        if (request.kind === "terminate") {
          setTimeout(() => void this.close(), 0);
          return { kind: "terminating", instanceId, processToken };
        }
        if (request.kind === "ping") {
          return {
            kind: "pong",
            protocolVersion: DAEMON_PROTOCOL_VERSION,
            instanceId,
            symnavVersion: this.symnavVersion,
          };
        }
        if (request.kind === "execute") {
          const transferId = \`\${request.requestId}-transfer\`;
          const sha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
          send({
            kind: "accepted",
            instanceId,
            processToken,
            requestId: request.requestId,
            acceptedAt: 1,
            queuePosition: 0,
          });
          send({
            kind: "result-manifest",
            instanceId,
            processToken,
            requestId: request.requestId,
            manifest: {
              transferId,
              requestId: request.requestId,
              instanceId,
              exitCode: 0,
              rawBytes: 0,
              recordCount: 0,
              sha256,
            },
          });
          send({
            kind: "result-end",
            instanceId,
            processToken,
            requestId: request.requestId,
            transferId,
            rawBytes: 0,
            recordCount: 0,
            sha256,
          });
          return;
        }
        if (request.kind === "result-ack") {
          return {
            kind: "result-acknowledged",
            instanceId,
            processToken,
            requestId: request.requestId,
            transferId: request.transferId,
          };
        }
        return { kind: "stopped", instanceId };
      },
    );
    setTimeout(() => {
      const record = this.registry.readInstance(identity, instanceId);
      if (record?.state !== "starting") return;
      this.registry.writeIfStartupOwner(identity, {
        ...record,
        state: "ready",
        readyAt: Date.now(),
        fileCount: 2,
      });
    }, 0);
    return {
      pid: process.pid,
      exited: new Promise(() => undefined),
      terminate: () => this.close(),
    };
  }

  async close(): Promise<void> {
    const server = this.server;
    this.server = undefined;
    await server?.close();
  }
}

function readyRecord(
  identity: DaemonWorkspaceIdentity,
  instanceId: string,
  processToken: string,
  pid: number,
): DaemonRecord {
  return {
    schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    symnavVersion: "0.1.0",
    workspaceRoot: identity.workspaceRoot,
    workspaceKey: identity.workspaceKey,
    stateKey: identity.stateKey,
    identityKey: identity.identityKey,
    instanceId,
    processToken,
    endpoint: identity.endpoint(instanceId),
    pid,
    state: "ready",
    startedAt: 10,
    readyAt: 20,
    fileCount: 2,
    memoryCapBytes: 256 * 1024 * 1024,
  };
}

function spawnIdentifiableDaemon(
  identity: DaemonWorkspaceIdentity,
  instanceId: string,
  processToken: string,
  startedAt: number,
  processIds: number[],
): Promise<number> {
  if (process.platform !== "win32") {
    mkdirSync(dirname(identity.endpoint(instanceId)), { recursive: true, mode: 0o700 });
  }
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        "-e",
        identifiableDaemonSource,
        identity.endpoint(instanceId),
        instanceId,
        processToken,
        String(startedAt),
      ],
      { stdio: ["ignore", "pipe", "ignore"] },
    );
    child.once("error", reject);
    child.stdout?.once("data", () => {
      processIds.push(child.pid!);
      resolve(child.pid!);
    });
  });
}

const identifiableDaemonSource = \`
const { createServer } = require("node:net");
const [endpoint, instanceId, processToken, startedAtText] = process.argv.slice(1);
const startedAt = Number(startedAtText);
const frame = (value) => {
  const payload = Buffer.from(JSON.stringify(value));
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
};
const server = createServer((socket) => {
  let bytes = Buffer.alloc(0);
  socket.on("data", (chunk) => {
    bytes = Buffer.concat([bytes, chunk]);
    if (bytes.length < 4) return;
    const length = bytes.readUInt32BE(0);
    if (bytes.length < length + 4) return;
    const request = JSON.parse(bytes.subarray(4, length + 4).toString("utf8"));
    if (request.kind === "identify") {
      socket.end(frame({ kind: "identity", instanceId, processToken, pid: process.pid, startedAt }));
      return;
    }
    if (request.kind === "ping") {
      socket.end(frame({ kind: "pong", protocolVersion: \${String(
        DAEMON_PROTOCOL_VERSION,
      )}, instanceId, symnavVersion: "0.1.0", startedAt }));
      return;
    }
    if (request.kind === "terminate") {
      socket.end(frame({ kind: "terminating", instanceId, processToken }), () => server.close(() => process.exit(0)));
    }
  });
});
server.listen(endpoint, () => process.stdout.write("ready"));
\`;
`},"base:apps/cli/src/daemon/daemon-startup-coordinator.test.ts":{path:"apps/cli/src/daemon/daemon-startup-coordinator.test.ts",revision:"base",sha:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",sha256:"2f5bd3929867c88c59fdedd562fda82cdd9b6dfbb83bcfa47784f660eb242563",text:`import { spawn, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CommandOutputSnapshot } from "../command-execution-result.js";
import { StateDirectoryResolver } from "../state-directory-resolver.js";
import { DaemonController } from "./daemon-controller.js";
import { DaemonStartupCoordinator } from "./daemon-startup-coordinator.js";
import {
  DaemonProcessTerminationError,
  NodeDaemonProcessTerminator,
  type DaemonProcess,
  type DaemonProcessExit,
  type DaemonProcessLauncher,
  type DaemonProcessTerminator,
} from "./daemon-process-launcher.js";
import {
  DAEMON_PROTOCOL_VERSION,
  DAEMON_RECORD_SCHEMA_VERSION,
  type DaemonLifecycleRequest,
  type DaemonLifecycleResponse,
  type DaemonRecord,
  type DaemonRequest,
  type DaemonResponse,
} from "./daemon-protocol.js";
import { DAEMON_STARTUP_TIMEOUT_MS, DaemonRegistry } from "./daemon-registry.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import { type DaemonExecutionReceipt, LocalDaemonTransport } from "./local-daemon-transport.js";

describe("DaemonStartupCoordinator", () => {
  const roots: string[] = [];
  const realProcessIds: number[] = [];

  afterEach(async () => {
    const terminator = new NodeDaemonProcessTerminator(100, 5);
    for (const pid of realProcessIds) {
      if (terminator.isAlive(pid)) await terminator.terminate(pid);
    }
    realProcessIds.length = 0;
    for (const root of roots) rmSync(root, { recursive: true, force: true });
    roots.length = 0;
  });

  it("returns concurrent warm-up triggers after electing one detached child", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const firstCoordinator = harness.coordinator();
    const secondCoordinator = harness.coordinator();

    const [first, second] = await Promise.all([
      firstCoordinator.trigger(harness.identity),
      secondCoordinator.trigger(harness.identity),
    ]);

    expect(harness.launcher.launchCount).toBe(1);
    expect([first.status, second.status].sort()).toEqual(["launched", "starting"]);
    expect(first.instanceId).toBe(second.instanceId);
    expect(first.pid).toBe(second.pid);
    expect(harness.registry.startupOwner(harness.identity)).toMatchObject({
      ownerKind: "daemon",
      ownerPid: first.pid,
    });
    readinessGate.release();
  });

  it("retries for a caller already waiting on another coordinator's failed child", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 1 });
    const initiatingCoordinator = harness.coordinator();
    const waitingCoordinator = harness.coordinator();

    await expect(initiatingCoordinator.trigger(harness.identity)).resolves.toMatchObject({
      status: "launched",
    });

    await expect(waitingCoordinator.ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "ready",
    });

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("shares one readiness record without a healthy startup deadline", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const coordinator = harness.coordinator({ startupTimeoutMs: 5 });
    const trigger = await coordinator.trigger(harness.identity);
    const firstWait = coordinator.waitUntilReady(harness.identity);
    const secondWait = harness
      .coordinator({ startupTimeoutMs: 5 })
      .waitUntilReady(harness.identity);
    let settled = false;
    void Promise.all([firstWait, secondWait]).then(() => {
      settled = true;
    });

    await new Promise((resolve) => setTimeout(resolve, 25));

    expect(settled).toBe(false);
    expect(harness.registry.read(harness.identity)).toMatchObject({
      instanceId: trigger.instanceId,
      pid: trigger.pid,
      state: "starting",
    });

    readinessGate.release();
    await expect(Promise.all([firstWait, secondWait])).resolves.toEqual([
      expect.objectContaining({ status: "ready" }),
      expect.objectContaining({ status: "already-running" }),
    ]);
  });

  it("concurrent starts launch one daemon and report ready then already running", async () => {
    const harness = new CoordinatorHarness(roots);

    const [first, second] = await Promise.all([
      harness.coordinator().ensureRunning(harness.identity),
      harness.coordinator().ensureRunning(harness.identity),
    ]);

    expect(harness.launcher.launchCount).toBe(1);
    expect([first.status, second.status].sort()).toEqual(["already-running", "ready"]);
    expect(harness.registry.list()).toHaveLength(1);
  });

  it("keeps waiting for its live child after a transient ready-record probe failure", async () => {
    const harness = new CoordinatorHarness(roots, { readyAuthenticationFailures: 1 });

    await expect(
      harness.coordinator({ startupTimeoutMs: 1_000 }).ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready", workspaceRoot: "/repo" });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)).toMatchObject({
      pid: harness.launcher.lastPid,
      state: "ready",
    });
  });

  it("keeps a later caller waiting through a transient missing startup owner", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const trigger = await harness.coordinator().trigger(harness.identity);
    const laterCoordinator = harness.coordinator();
    const startupOwner = harness.registry.startupOwner.bind(harness.registry);
    let missingOwnerReads = 0;
    vi.spyOn(harness.registry, "startupOwner").mockImplementation((identity) => {
      missingOwnerReads += 1;
      if (missingOwnerReads <= 3) {
        if (missingOwnerReads === 3) readinessGate.release();
        return undefined;
      }
      return startupOwner(identity);
    });

    const ready = laterCoordinator.waitUntilReady(harness.identity);

    await expect(ready).resolves.toMatchObject({
      status: "already-running",
      workspaceRoot: "/repo",
      pid: trigger.pid,
    });
    expect(harness.launcher.launchCount).toBe(1);
    expect(missingOwnerReads).toBeGreaterThanOrEqual(3);
  });

  it("bounds a persistent missing startup owner by the registry mutation grace", async () => {
    const harness = new CoordinatorHarness(roots);
    const startingRecord: DaemonRecord = {
      ...harness.readyRecord("missing-owner", harness.launcher.symnavVersion, 6001),
      state: "starting" as const,
    };
    harness.registry.write(startingRecord);
    let now = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            now += DAEMON_STARTUP_TIMEOUT_MS;
            return now;
          },
        })
        .waitUntilReady(harness.identity),
    ).rejects.toThrow("Daemon startup failed before readiness");

    expect(now).toBeGreaterThan(DAEMON_STARTUP_TIMEOUT_MS);
    expect(harness.launcher.launchCount).toBe(0);
  });

  it("rechecks readiness when publication releases startup ownership between reads", async () => {
    const readinessGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate: readinessGate });
    const coordinator = harness.coordinator();
    await coordinator.trigger(harness.identity);
    const startingRecord = harness.registry.readStored(harness.identity)!;
    const originalReadStored = harness.registry.readStored.bind(harness.registry);
    vi.spyOn(harness.registry, "read").mockReturnValueOnce(startingRecord);
    vi.spyOn(harness.registry, "readStored").mockImplementationOnce((identity) => {
      const readyRecord: DaemonRecord = {
        ...startingRecord,
        state: "ready",
        readyAt: Date.now(),
        fileCount: 2,
      };
      expect(harness.registry.writeIfStartupOwner(identity, readyRecord)).toBe(true);
      harness.registry.removeStartupLockIfProcess(identity, readyRecord);
      return originalReadStored(identity);
    });

    await expect(coordinator.waitUntilReady(harness.identity)).resolves.toMatchObject({
      status: "ready",
      workspaceRoot: "/repo",
    });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
    expect(harness.registry.readStored(harness.identity)?.state).toBe("ready");
    readinessGate.release();
  });

  it("does not report an earlier child exit against a replacement startup", async () => {
    const harness = new CoordinatorHarness(roots, {
      neverReady: true,
      childExit: { code: 17, signal: null, cause: "exit" },
      childExitDelayMs: 5,
    });
    const coordinator = harness.coordinator();
    await coordinator.trigger(harness.identity);
    await waitUntil(() => harness.registry.readStored(harness.identity) === undefined);
    const replacement = harness.readyRecord(
      "replacement",
      harness.launcher.symnavVersion,
      process.pid,
    );
    const lease = harness.registry.acquireStartup(harness.identity, replacement.instanceId)!;
    harness.registry.write({ ...replacement, state: "starting" });

    const ready = coordinator.waitUntilReady(harness.identity);
    setTimeout(() => {
      harness.registry.write(replacement);
      lease.release();
    }, 5);

    await expect(ready).resolves.toMatchObject({
      status: "already-running",
      pid: process.pid,
    });
  });

  it("reuses a validated daemon running the same version", async () => {
    const harness = new CoordinatorHarness(roots);
    harness.seedReady("existing", "0.1.0", 4001);

    const result = await harness.coordinator().ensureRunning(harness.identity);

    expect(result.status).toBe("already-running");
    expect(harness.launcher.launchCount).toBe(0);
  });

  it("drains a validated daemon running a different version", async () => {
    const harness = new CoordinatorHarness(roots);
    harness.seedReady("existing", "0.0.9", 4002);

    const result = await harness.coordinator().ensureRunning(harness.identity);

    expect(harness.transport.terminationCount).toBe(1);
    expect(harness.terminator.terminated).not.toContain(4002);
    expect(harness.launcher.launchCount).toBe(1);
    expect(result.status).toBe("ready");
    expect(harness.registry.list()).toHaveLength(1);
  });

  it("retains ownership when a stale record references an unrelated live process", async () => {
    const oldPid = await spawnIdleProcess(realProcessIds);
    const runtime = socketBackedCoordinator(roots);
    runtime.registry.write(readyRecord(runtime.identity, "old", "old-process", oldPid));

    await expect(runtime.coordinator.ensureRunning(runtime.identity)).rejects.toThrow(
      /live but unresponsive/i,
    );

    expect(runtime.terminator.isAlive(oldPid)).toBe(true);
    expect(runtime.registry.list()).toHaveLength(1);
    expect(runtime.registry.readStored(runtime.identity)?.instanceId).toBe("old");
  });

  it.each(["schema", "protocol", "symnav"] as const)(
    "proves and replaces a real daemon for $mismatch mismatch",
    async (mismatch) => {
      const runtime = socketBackedCoordinator(roots);
      const oldPid = await spawnIdentifiableDaemon(
        runtime.identity,
        "old",
        "old-process",
        10,
        realProcessIds,
      );
      const oldRecord = readyRecord(runtime.identity, "old", "old-process", oldPid);
      const incompatibleRecord: DaemonRecord = {
        ...oldRecord,
        schemaVersion:
          mismatch === "schema" ? DAEMON_RECORD_SCHEMA_VERSION + 1 : oldRecord.schemaVersion,
        protocolVersion:
          mismatch === "protocol" ? DAEMON_PROTOCOL_VERSION + 1 : oldRecord.protocolVersion,
        symnavVersion: mismatch === "symnav" ? "0.0.9" : "0.1.0",
      };
      runtime.registry.write(incompatibleRecord);

      const result = await runtime.coordinator.ensureRunning(runtime.identity);

      expect(result.status).toBe("ready");
      await waitUntil(() => !runtime.terminator.isAlive(oldPid));
      expect(runtime.registry.list()).toHaveLength(1);
      expect(runtime.registry.read(runtime.identity)?.instanceId).not.toBe("old");
      await runtime.launcher.close();
    },
    10_000,
  );

  it("cleans startup state when process launch fails", async () => {
    const harness = new CoordinatorHarness(roots, { launchFailure: new Error("spawn failed") });

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "spawn failed",
    );

    expect(harness.registry.readStored(harness.identity)).toBeUndefined();
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("does not launch a replacement until the authenticated daemon process exits", async () => {
    const harness = new CoordinatorHarness(roots, { oldDaemonExitsAfterTerminate: false });
    harness.seedReady("existing", "0.0.9", 4003);

    const starting = harness
      .coordinator({ startupTimeoutMs: 1_000 })
      .ensureRunning(harness.identity);
    await waitUntil(() => harness.transport.terminationCount === 1);
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(harness.launcher.launchCount).toBe(0);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe("existing");

    harness.terminator.alive.delete(4003);
    await expect(starting).resolves.toMatchObject({ status: "ready" });
    expect(harness.launcher.launchCount).toBe(1);
  });

  it("preserves termination failure precedence and startup ownership when the process stays alive", async () => {
    const harness = new CoordinatorHarness(roots, {
      launchFailure: new Error("replacement launch must remain blocked"),
      oldDaemonExitsAfterTerminate: false,
    });
    harness.seedReady("existing", "0.0.9", 4004);

    await expect(
      harness.coordinator({ terminationTimeoutMs: 5 }).ensureRunning(harness.identity),
    ).rejects.toBeInstanceOf(DaemonProcessTerminationError);

    expect(harness.launcher.launchCount).toBe(0);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe("existing");
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("keeps replacement termination bounded when readiness has no default deadline", async () => {
    const harness = new CoordinatorHarness(roots, { oldDaemonExitsAfterTerminate: false });
    harness.seedReady("existing", "0.0.9", 4005);
    let elapsedMs = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            elapsedMs += 300_001;
            return elapsedMs;
          },
        })
        .ensureRunning(harness.identity),
    ).rejects.toBeInstanceOf(DaemonProcessTerminationError);

    expect(harness.launcher.launchCount).toBe(0);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe("existing");
  }, 1_000);

  it("returns after launching a healthy daemon that is still warming", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });

    await expect(harness.coordinator().trigger(harness.identity)).resolves.toMatchObject({
      status: "launched",
    });

    expect(harness.terminator.terminated).not.toContain(harness.launcher.lastPid);
    expect(harness.registry.readStored(harness.identity)?.pid).toBe(harness.launcher.lastPid);
    expect(harness.registry.startupOwner(harness.identity)).toMatchObject({ ownerKind: "daemon" });
  });

  it("retains one live daemon warm-up after the launcher heartbeat expires", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });

    await harness.coordinator().trigger(harness.identity);
    const originalRecord = harness.registry.readStored(harness.identity);
    const originalOwner = harness.registry.startupOwner(harness.identity);
    expect(originalRecord?.pid).toBe(harness.launcher.lastPid);
    expect(originalOwner).toBeDefined();
    writeFileSync(
      harness.identity.startupOwnerPath(harness.identity.lockPath),
      JSON.stringify({ ...originalOwner, heartbeatAt: Date.now() - 60_000 }),
    );
    harness.terminator.currentProcessIsAlive = false;

    await expect(harness.coordinator().trigger(harness.identity)).resolves.toMatchObject({
      status: "starting",
      instanceId: originalRecord?.instanceId,
    });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)).toEqual(originalRecord);
  });

  it("lets a later caller use the original warm-up after the initiating caller exits", async () => {
    const readinessPublicationGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate });

    await harness.coordinator().trigger(harness.identity);
    const originalRecord = harness.registry.readStored(harness.identity);
    expect(originalRecord?.pid).toBe(harness.launcher.lastPid);
    harness.terminator.currentProcessIsAlive = false;

    const laterCaller = harness
      .coordinator({ startupTimeoutMs: 1_000 })
      .ensureRunning(harness.identity);
    readinessPublicationGate.release();

    await expect(laterCaller).resolves.toMatchObject({
      status: "already-running",
      workspaceRoot: "/repo",
      pid: originalRecord?.pid,
    });
    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)?.instanceId).toBe(
      originalRecord?.instanceId,
    );
  });

  it("reports its launched child's exit after startup cleanup removes the record", async () => {
    const harness = new CoordinatorHarness(roots, {
      neverReady: true,
      childExit: { code: 17, signal: null, cause: "exit" },
      childExitDelayMs: 5,
    });
    const coordinator = harness.coordinator({ startupTimeoutMs: 1_000 });
    const startedAt = Date.now();

    await coordinator.trigger(harness.identity);
    await waitUntil(
      () =>
        harness.registry.readStored(harness.identity) === undefined &&
        harness.registry.startupOwner(harness.identity) === undefined,
    );

    await expect(coordinator.waitUntilReady(harness.identity)).rejects.toThrow(
      "Daemon child exited before readiness (code 17, signal null)",
    );

    expect(Date.now() - startedAt).toBeLessThan(500);
    expect(harness.registry.readStored(harness.identity)).toBeUndefined();
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("has no default readiness deadline while the launched child stays live", async () => {
    const harness = new CoordinatorHarness(roots, { readyDelayMs: 5 });
    let elapsedMs = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            elapsedMs += 300_001;
            return elapsedMs;
          },
        })
        .ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready" });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.terminator.terminated).toEqual([]);
  });

  it("retries one child exit before readiness without waiting for a deadline", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 1 });

    await expect(harness.coordinator().ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "ready",
    });

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("surfaces a second child exit instead of retrying indefinitely", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 2 });

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "Daemon child exited before readiness (code 1, signal null)",
    );

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("does not reset the retry budget after waiting for startup ownership", async () => {
    const harness = new CoordinatorHarness(roots, { exitingLaunches: 2 });
    const earlierLease = harness.registry.acquireStartup(harness.identity, "earlier-owner");
    setTimeout(() => earlierLease?.release(), 5);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "Daemon child exited before readiness (code 1, signal null)",
    );

    expect(harness.launcher.launchCount).toBe(2);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("recovers a confirmed dead child from legacy caller-owned startup state", async () => {
    const harness = new CoordinatorHarness(roots);
    expect(harness.registry.acquireStartup(harness.identity, "legacy-starting")).toBeDefined();
    harness.registry.write({
      ...harness.readyRecord("legacy-starting", harness.launcher.symnavVersion, 999_999_999),
      state: "starting",
    });

    await expect(
      harness.coordinator({ startupTimeoutMs: 100 }).ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready", workspaceRoot: "/repo" });

    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.registry.readStored(harness.identity)?.instanceId).not.toBe("legacy-starting");
  });

  it("retains startup ownership when a previous daemon cannot terminate", async () => {
    const harness = new CoordinatorHarness(roots);
    const existing = harness.readyRecord("existing", "0.0.9", 4002);
    harness.seedReady(existing.instanceId, existing.symnavVersion, existing.pid);
    vi.spyOn(harness.transport, "request").mockImplementation(
      async (_endpoint, request): Promise<DaemonLifecycleResponse> => {
        if (request.kind === "ping") {
          return {
            kind: "pong",
            protocolVersion: DAEMON_PROTOCOL_VERSION,
            instanceId: existing.instanceId,
            symnavVersion: existing.symnavVersion,
          };
        }
        if (request.kind === "identify") {
          return {
            kind: "identity",
            instanceId: existing.instanceId,
            processToken: existing.processToken,
            pid: existing.pid,
            startedAt: existing.startedAt,
          };
        }
        if (request.kind === "terminate") {
          return {
            kind: "terminating",
            instanceId: existing.instanceId,
            processToken: existing.processToken,
          };
        }
        throw new Error(\`Unexpected \${request.kind} request\`);
      },
    );

    await expect(
      harness.coordinator({ terminationTimeoutMs: 5 }).ensureRunning(harness.identity),
    ).rejects.toBeInstanceOf(DaemonProcessTerminationError);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
  });

  it("waits beyond startup-owner grace for a live daemon to finish warming", async () => {
    const harness = new CoordinatorHarness(roots);
    let elapsedMs = 0;

    await expect(
      harness
        .coordinator({
          now: () => {
            elapsedMs += 45_000;
            return elapsedMs;
          },
        })
        .ensureRunning(harness.identity),
    ).resolves.toMatchObject({ status: "ready", workspaceRoot: "/repo" });
  });

  it("recovers a durable startup lock when its owner published no record", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });
    expect(harness.registry.acquireStartup(harness.identity, "orphan")).toBeDefined();

    await expect(
      harness
        .coordinator({ processTerminator: new TestProcessTerminator(false) })
        .trigger(harness.identity),
    ).resolves.toMatchObject({ status: "launched" });

    expect(harness.registry.startupOwner(harness.identity)?.instanceId).not.toBe("orphan");
    expect(harness.registry.acquireStartup(harness.identity, "recovered")).toBeUndefined();
  });

  it("does not launch after startup ownership changes before publication", async () => {
    const harness = new CoordinatorHarness(roots);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner").mockReturnValue(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "ownership changed before process launch",
    );
    expect(harness.launcher.launchCount).toBe(0);
  });

  it("terminates a child after startup ownership changes during launch", async () => {
    const harness = new CoordinatorHarness(roots);
    const publishStarting = harness.registry.writeStartingIfStartupOwner.bind(harness.registry);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner")
      .mockImplementationOnce(publishStarting)
      .mockReturnValueOnce(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "ownership changed after process launch",
    );
    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.terminator.terminated).toContain(harness.launcher.lastPid);
  });

  it("keeps a live daemon-owned startup authoritative through a slow warm", async () => {
    const readinessPublicationGate = new ReadinessPublicationGate();
    const harness = new CoordinatorHarness(roots, { readinessPublicationGate });
    const starting = harness.coordinator().ensureRunning(harness.identity);
    const startingOutcome = starting.then(
      (result) => ({ status: "fulfilled" as const, result }),
      (error: unknown) => ({ status: "rejected" as const, error }),
    );
    let assertionFailure: unknown;
    try {
      await waitUntil(() => harness.registry.read(harness.identity)?.state === "starting");
      const ownerBeforeStatus = harness.registry.startupOwner(harness.identity);
      const controller = new DaemonController(
        harness.registry,
        harness.transport as unknown as LocalDaemonTransport,
        dirname(harness.identity.registryDirectory),
        { processTerminator: harness.terminator },
      );

      await expect(controller.status()).resolves.toEqual([
        expect.objectContaining({ workspaceRoot: "/repo", state: "starting" }),
      ]);
      await expect(harness.coordinator().trigger(harness.identity)).resolves.toMatchObject({
        status: "starting",
      });
      expect(harness.registry.startupOwner(harness.identity)).toEqual(ownerBeforeStatus);
    } catch (error) {
      assertionFailure = error;
    } finally {
      readinessPublicationGate.release();
    }
    const settledStarting = await startingOutcome;
    if (assertionFailure !== undefined) throw assertionFailure;
    if (settledStarting.status === "rejected") throw settledStarting.error;
    expect(settledStarting.result).toMatchObject({ status: "ready", workspaceRoot: "/repo" });
    expect(harness.launcher.launchCount).toBe(1);
  }, 5_000);

  it("recovers after a slow startup mutation owner is killed and elects one fresh daemon", async () => {
    const harness = new CoordinatorHarness(roots);
    const stateDirectory = dirname(harness.identity.registryDirectory);
    const mutationOwner = await spawnStartupMutationOwner(
      harness.identity.workspaceRoot,
      stateDirectory,
      1_100,
      realProcessIds,
    );
    const mutationOwnerPid = mutationOwner.ownerPid;
    await new NodeDaemonProcessTerminator(100, 5).terminate(mutationOwnerPid);
    mutationOwner.process.kill("SIGKILL");
    expect(harness.registry.list()).toHaveLength(1);
    expect(harness.registry.startupOwner(harness.identity)).toMatchObject({
      instanceId: "orphaned-mutation",
    });
    expect(() => process.kill(mutationOwnerPid, 0)).toThrow();
    const controller = new DaemonController(
      harness.registry,
      harness.transport as unknown as LocalDaemonTransport,
      stateDirectory,
      { processTerminator: harness.terminator },
    );

    await expect(controller.status()).resolves.toEqual([]);
    expect(harness.registry.startupOwner(harness.identity)).toBeUndefined();
    expect(
      harness.registry.readStoredInstance(harness.identity, "orphaned-mutation"),
    ).toBeUndefined();
    const [first, second] = await Promise.all([
      harness.coordinator().ensureRunning(harness.identity),
      harness.coordinator().ensureRunning(harness.identity),
    ]);
    expect([first.status, second.status].sort()).toEqual(["already-running", "ready"]);
    expect(harness.launcher.launchCount).toBe(1);
    await expect(harness.coordinator().ensureRunning(harness.identity)).resolves.toMatchObject({
      status: "already-running",
    });
    expect(harness.launcher.launchCount).toBe(1);
  }, 10_000);

  it("observes a real child exit before releasing startup ownership", async () => {
    const root = temporaryDirectory(roots);
    const identity = DaemonWorkspaceIdentity.from("/repo", root);
    const registry = new DaemonRegistry(identity.registryDirectory);
    const markerPath = join(root, "late-publication");
    const launcher = new DelayedMarkerLauncher(markerPath, realProcessIds);
    const transport = new RegistryTransport(registry, identity);
    const coordinator = new DaemonStartupCoordinator(
      registry,
      launcher,
      transport as unknown as LocalDaemonTransport,
      { startupTimeoutMs: 1_000, pollIntervalMs: 2 },
    );

    await expect(coordinator.ensureRunning(identity)).rejects.toThrow(/exited before readiness/i);

    expect(existsSync(markerPath)).toBe(true);
    expect(registry.startupOwner(identity)).toBeUndefined();
    expect(registry.readStored(identity)).toBeUndefined();
  });

  it("recovers a durable startup lock when its owner published no record", async () => {
    const harness = new CoordinatorHarness(roots, { neverReady: true });
    expect(harness.registry.acquireStartup(harness.identity, "orphan")).toBeDefined();
    const owner = harness.registry.startupOwner(harness.identity)!;
    writeFileSync(
      harness.identity.startupOwnerPath(harness.identity.lockPath),
      JSON.stringify({ ...owner, heartbeatAt: Date.now() - 20_000 }),
    );

    await expect(
      harness
        .coordinator({ processTerminator: new TestProcessTerminator(false) })
        .trigger(harness.identity),
    ).resolves.toMatchObject({ status: "launched" });

    expect(harness.registry.startupOwner(harness.identity)?.instanceId).not.toBe("orphan");
    expect(harness.registry.acquireStartup(harness.identity, "recovered")).toBeUndefined();
  });

  it("does not launch after startup ownership changes before publication", async () => {
    const harness = new CoordinatorHarness(roots);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner").mockReturnValue(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      /ownership changed/i,
    );

    expect(harness.launcher.launchCount).toBe(0);
  });

  it("terminates a child after startup ownership changes during launch", async () => {
    const harness = new CoordinatorHarness(roots);
    const publishStarting = harness.registry.writeStartingIfStartupOwner.bind(harness.registry);
    vi.spyOn(harness.registry, "writeStartingIfStartupOwner")
      .mockImplementationOnce(publishStarting)
      .mockReturnValueOnce(false);

    await expect(harness.coordinator().ensureRunning(harness.identity)).rejects.toThrow(
      "ownership changed after process launch",
    );
    expect(harness.launcher.launchCount).toBe(1);
    expect(harness.terminator.terminated).toContain(harness.launcher.lastPid);
  });

  it("does not let the coordinator renew daemon ownership while readiness is pending", async () => {
    const harness = new CoordinatorHarness(roots, { readyDelayMs: 80 });
    const coordinator = harness.coordinator();
    await coordinator.trigger(harness.identity);
    await waitUntil(() => harness.registry.read(harness.identity)?.state === "starting");
    const initialRevision = harness.registry.startupOwner(harness.identity)?.revision;

    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(harness.registry.startupOwner(harness.identity)?.revision).toBe(initialRevision);
    await expect(coordinator.waitUntilReady(harness.identity)).resolves.toMatchObject({
      status: "ready",
    });
  });

  it("elects one fresh daemon after a mutation owner is killed", async () => {
    const harness = new CoordinatorHarness(roots);
    const stateDirectory = dirname(harness.identity.registryDirectory);
    const mutationOwner = await spawnStartupMutationOwner(
      harness.identity.workspaceRoot,
      stateDirectory,
      10,
      realProcessIds,
    );
    const mutationOwnerPid = mutationOwner.ownerPid;
    await new NodeDaemonProcessTerminator(100, 5).terminate(mutationOwnerPid);
    mutationOwner.process.kill("SIGKILL");
    const controller = new DaemonController(
      harness.registry,
      harness.transport as unknown as LocalDaemonTransport,
      stateDirectory,
      { processTerminator: harness.terminator },
    );

    await expect(controller.status()).resolves.toEqual([]);
    const [first, second] = await Promise.all([
      harness.coordinator().ensureRunning(harness.identity),
      harness.coordinator().ensureRunning(harness.identity),
    ]);

    expect([first.status, second.status].sort()).toEqual(["already-running", "ready"]);
    expect(harness.launcher.launchCount).toBe(1);
  }, 10_000);
});

interface CoordinatorHarnessOptions {
  readonly launchFailure?: Error;
  readonly neverReady?: boolean;
  readonly newDaemonPid?: number;
  readonly readyDelayMs?: number;
  readonly readinessPublicationGate?: ReadinessPublicationGate;
  readonly oldDaemonExitsAfterTerminate?: boolean;
  readonly exitingLaunches?: number;
  readonly childExit?: DaemonProcessExit;
  readonly childExitDelayMs?: number;
  readonly readyAuthenticationFailures?: number;
}

class ReadinessPublicationGate {
  private readonly publicationAllowed: Promise<void>;
  private releasePublication!: () => void;

  constructor() {
    this.publicationAllowed = new Promise((resolve) => {
      this.releasePublication = resolve;
    });
  }

  wait(): Promise<void> {
    return this.publicationAllowed;
  }

  release(): void {
    this.releasePublication();
  }
}

class CoordinatorHarness {
  readonly identity: DaemonWorkspaceIdentity;
  readonly registry: DaemonRegistry;
  readonly terminator = new TestProcessTerminator();
  readonly launcher: ReadyTestLauncher;
  readonly transport: RegistryTransport;

  constructor(roots: string[], options: CoordinatorHarnessOptions = {}) {
    const stateDir = temporaryDirectory(roots);
    this.identity = DaemonWorkspaceIdentity.from("/repo", stateDir);
    this.registry = new DaemonRegistry(this.identity.registryDirectory);
    this.launcher = new ReadyTestLauncher(this.registry, this.identity, this.terminator, options);
    this.transport = new RegistryTransport(
      this.registry,
      this.identity,
      (pid) => {
        if (options.oldDaemonExitsAfterTerminate !== false) this.terminator.alive.delete(pid);
      },
      options.readyAuthenticationFailures,
    );
  }

  coordinator(
    options: {
      readonly startupTimeoutMs?: number;
      readonly terminationTimeoutMs?: number;
      readonly processTerminator?: DaemonProcessTerminator;
      readonly now?: () => number;
    } = {},
  ): DaemonStartupCoordinator {
    return new DaemonStartupCoordinator(
      this.registry,
      this.launcher,
      this.transport as unknown as LocalDaemonTransport,
      {
        ...(options.startupTimeoutMs === undefined
          ? {}
          : { startupTimeoutMs: options.startupTimeoutMs }),
        ...(options.terminationTimeoutMs === undefined
          ? {}
          : { terminationTimeoutMs: options.terminationTimeoutMs }),
        pollIntervalMs: 1,
        processTerminator: options.processTerminator ?? this.terminator,
        ...(options.now === undefined ? {} : { now: options.now }),
      },
    );
  }

  seedReady(instanceId: string, symnavVersion: string, pid: number): void {
    this.terminator.alive.add(pid);
    this.registry.write(this.readyRecord(instanceId, symnavVersion, pid));
  }

  readyRecord(instanceId: string, symnavVersion: string, pid: number): DaemonRecord {
    return {
      schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      symnavVersion,
      workspaceRoot: this.identity.workspaceRoot,
      workspaceKey: this.identity.workspaceKey,
      stateKey: this.identity.stateKey,
      identityKey: this.identity.identityKey,
      instanceId,
      processToken: \`\${instanceId}-process\`,
      endpoint: this.identity.endpoint(instanceId),
      pid,
      state: "ready",
      startedAt: 10,
      readyAt: 20,
      fileCount: 2,
      memoryCapBytes: 256 * 1024 * 1024,
    };
  }
}

class ReadyTestLauncher implements DaemonProcessLauncher {
  readonly symnavVersion = "0.1.0";
  readonly memoryCapBytes = 256 * 1024 * 1024;
  launchCount = 0;
  lastPid = 0;
  private nextPid = 5000;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly identity: DaemonWorkspaceIdentity,
    private readonly terminator: TestProcessTerminator,
    private readonly options: CoordinatorHarnessOptions,
  ) {}

  async launch(_identity: DaemonWorkspaceIdentity, instanceId: string): Promise<DaemonProcess> {
    this.launchCount += 1;
    if (this.options.launchFailure) throw this.options.launchFailure;
    const pid = this.options.newDaemonPid ?? this.nextPid++;
    this.lastPid = pid;
    this.terminator.alive.add(pid);
    const exitsBeforeReadiness = this.launchCount <= (this.options.exitingLaunches ?? 0);
    const childExit = exitsBeforeReadiness
      ? { code: 1, signal: null, cause: "exit" as const }
      : this.options.childExit;
    if (!this.options.neverReady && childExit === undefined) {
      const readinessPublicationGate = this.options.readinessPublicationGate;
      if (readinessPublicationGate === undefined) {
        setTimeout(() => this.publishReady(instanceId), this.options.readyDelayMs ?? 0);
      } else {
        void readinessPublicationGate.wait().then(() => this.publishReady(instanceId));
      }
    }
    const exited: Promise<DaemonProcessExit> =
      childExit === undefined
        ? new Promise(() => undefined)
        : new Promise((resolve) =>
            setTimeout(
              () => {
                this.terminator.alive.delete(pid);
                resolve(childExit);
              },
              exitsBeforeReadiness ? 5 : (this.options.childExitDelayMs ?? 0),
            ),
          );
    return {
      pid,
      exited,
      terminate: () => this.terminator.terminate(pid),
    };
  }

  private publishReady(instanceId: string): void {
    const starting = this.registry.readInstance(this.identity, instanceId);
    if (starting?.state !== "starting") return;
    this.registry.writeIfStartupOwner(this.identity, {
      ...starting,
      state: "ready",
      readyAt: Date.now(),
      fileCount: 2,
    });
  }
}

class RegistryTransport {
  terminationCount = 0;
  private readonly terminatedInstances = new Set<string>();
  private remainingReadyAuthenticationFailures: number;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly identity: DaemonWorkspaceIdentity,
    private readonly daemonTerminated: (pid: number) => void = () => undefined,
    readyAuthenticationFailures = 0,
  ) {
    this.remainingReadyAuthenticationFailures = readyAuthenticationFailures;
  }

  async request(
    _endpoint: string,
    request: DaemonLifecycleRequest,
  ): Promise<DaemonLifecycleResponse> {
    if (request.kind === "stop") {
      return { kind: "stopped", instanceId: request.instanceId };
    }
    if (request.kind === "terminate") {
      this.terminationCount += 1;
      this.terminatedInstances.add(request.instanceId);
      const record = this.registry.readStoredInstance(this.identity, request.instanceId);
      if (record !== undefined) this.daemonTerminated(record.pid);
      return {
        kind: "terminating",
        instanceId: request.instanceId,
        processToken: request.processToken,
      };
    }
    if (request.kind === "identify") {
      if (this.terminatedInstances.has(request.instanceId)) throw new Error("daemon terminated");
      const record = this.registry.readStoredInstance(this.identity, request.instanceId);
      if (record === undefined) throw new Error("missing daemon");
      if (record.state === "ready" && this.remainingReadyAuthenticationFailures > 0) {
        this.remainingReadyAuthenticationFailures -= 1;
        throw new Error("transient authentication failure");
      }
      return {
        kind: "identity",
        instanceId: record.instanceId,
        processToken: record.processToken,
        pid: record.pid,
        startedAt: record.startedAt,
      };
    }
    const record = this.registry.readStoredInstance(this.identity, request.instanceId);
    if (record === undefined) throw new Error("missing daemon");
    return {
      kind: "pong",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: request.instanceId,
      symnavVersion: record.symnavVersion,
    };
  }

  async execute(
    _endpoint: string,
    request: Extract<DaemonRequest, { kind: "execute" }>,
  ): Promise<DaemonExecutionReceipt> {
    return {
      acceptance: {
        requestId: request.requestId,
        instanceId: request.instanceId,
        acceptedAt: 1,
        queuePosition: 0,
      },
      completion: Promise.resolve({
        status: "completed",
        result: { output: new CommandOutputSnapshot([]), exitCode: 0 },
      }),
    };
  }

  async removeUnavailableEndpoint(_endpoint: string): Promise<boolean> {
    return true;
  }
}

class TestProcessTerminator implements DaemonProcessTerminator {
  readonly alive = new Set<number>();
  readonly terminated: number[] = [];

  constructor(public currentProcessIsAlive = true) {}

  isAlive(pid: number): boolean {
    return (this.currentProcessIsAlive && pid === process.pid) || this.alive.has(pid);
  }

  async terminate(pid: number): Promise<void> {
    this.terminated.push(pid);
    this.alive.delete(pid);
  }
}

class DelayedMarkerLauncher implements DaemonProcessLauncher {
  readonly symnavVersion = "0.1.0";
  readonly memoryCapBytes = 256 * 1024 * 1024;

  constructor(
    private readonly markerPath: string,
    private readonly processIds: number[],
  ) {}

  launch(): Promise<DaemonProcess> {
    return new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        [
          "-e",
          'setTimeout(() => require("node:fs").writeFileSync(process.argv[1], "late"), 200)',
          this.markerPath,
        ],
        { stdio: "ignore" },
      );
      child.once("error", reject);
      child.once("spawn", () => {
        this.processIds.push(child.pid!);
        const terminator = new NodeDaemonProcessTerminator(100, 5);
        const exited = new Promise<DaemonProcessExit>((exitResolve) => {
          child.once("exit", (code, signal) => exitResolve({ code, signal, cause: "exit" }));
        });
        resolve({
          pid: child.pid!,
          exited,
          terminate: () => terminator.terminate(child.pid!),
        });
      });
    });
  }
}

function temporaryDirectory(roots: string[]): string {
  const root = StateDirectoryResolver.canonicalize(mkdtempSync(join(tmpdir(), "symnav-startup-")));
  roots.push(root);
  return root;
}
function spawnIdleProcess(processIds: number[]): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["-e", "setInterval(() => {}, 1000)"], {
      stdio: "ignore",
    });
    child.once("error", reject);
    child.once("spawn", () => {
      processIds.push(child.pid!);
      resolve(child.pid!);
    });
  });
}

interface StartupMutationOwner {
  readonly process: ChildProcess;
  readonly ownerPid: number;
}

function spawnStartupMutationOwner(
  workspaceRoot: string,
  stateDirectory: string,
  startupDelayMs: number,
  processIds: number[],
): Promise<StartupMutationOwner> {
  const mutationOwner = spawn(
    process.execPath,
    [
      fileURLToPath(new URL("../../node_modules/tsx/dist/cli.mjs", import.meta.url)),
      fileURLToPath(
        new URL("../../test/helpers/daemon-startup-mutation-owner.ts", import.meta.url),
      ),
      workspaceRoot,
      stateDirectory,
      String(startupDelayMs),
    ],
    { stdio: ["ignore", "ignore", "ignore", "ipc"] },
  );
  return new Promise((resolve, reject) => {
    mutationOwner.once("error", reject);
    mutationOwner.once("spawn", () => processIds.push(mutationOwner.pid!));
    mutationOwner.once("exit", (code, signal) => {
      reject(new Error(\`Mutation owner exited before readiness: code=\${code} signal=\${signal}\`));
    });
    mutationOwner.once("message", (message) => {
      if (typeof message !== "number" || !Number.isSafeInteger(message) || message <= 0) {
        reject(new Error(\`Mutation owner published invalid pid: \${String(message)}\`));
        return;
      }
      if (!processIds.includes(message)) processIds.push(message);
      resolve({ process: mutationOwner, ownerPid: message });
    });
  });
}

async function waitUntil(predicate: () => boolean): Promise<void> {
  const deadline = Date.now() + 1_000;
  while (Date.now() <= deadline) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error("Timed out waiting for daemon process exit");
}

interface SocketBackedCoordinator {
  readonly identity: DaemonWorkspaceIdentity;
  readonly registry: DaemonRegistry;
  readonly terminator: NodeDaemonProcessTerminator;
  readonly launcher: InProcessReadyLauncher;
  readonly coordinator: DaemonStartupCoordinator;
}

function socketBackedCoordinator(roots: string[]): SocketBackedCoordinator {
  const stateDirectory = temporaryDirectory(roots);
  const identity = DaemonWorkspaceIdentity.from(join(stateDirectory, "workspace"), stateDirectory);
  const registry = new DaemonRegistry(identity.registryDirectory);
  const transport = new LocalDaemonTransport({ requestTimeoutMs: 1_000 });
  const terminator = new NodeDaemonProcessTerminator(100, 5);
  const launcher = new InProcessReadyLauncher(registry, transport);
  return {
    identity,
    registry,
    terminator,
    launcher,
    coordinator: new DaemonStartupCoordinator(registry, launcher, transport, {
      startupTimeoutMs: 5_000,
      pollIntervalMs: 2,
      processTerminator: terminator,
    }),
  };
}

class InProcessReadyLauncher implements DaemonProcessLauncher {
  readonly symnavVersion = "0.1.0";
  readonly memoryCapBytes = 256 * 1024 * 1024;
  private server: Awaited<ReturnType<LocalDaemonTransport["listen"]>> | undefined;

  constructor(
    private readonly registry: DaemonRegistry,
    private readonly transport: LocalDaemonTransport,
  ) {}

  async launch(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): Promise<DaemonProcess> {
    const startingRecord = this.registry.readInstance(identity, instanceId);
    if (startingRecord?.state !== "starting") throw new Error("missing starting record");
    this.server = await this.transport.listen(
      identity.endpoint(instanceId),
      async (request, send) => {
        if (request.kind === "identify") {
          return {
            kind: "identity",
            instanceId,
            processToken,
            pid: process.pid,
            startedAt: startingRecord.startedAt,
          };
        }
        if (request.kind === "terminate") {
          setTimeout(() => void this.close(), 0);
          return { kind: "terminating", instanceId, processToken };
        }
        if (request.kind === "ping") {
          return {
            kind: "pong",
            protocolVersion: DAEMON_PROTOCOL_VERSION,
            instanceId,
            symnavVersion: this.symnavVersion,
          };
        }
        if (request.kind === "execute") {
          const transferId = \`\${request.requestId}-transfer\`;
          const sha256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
          send({
            kind: "accepted",
            instanceId,
            processToken,
            requestId: request.requestId,
            acceptedAt: 1,
            queuePosition: 0,
          });
          send({
            kind: "result-manifest",
            instanceId,
            processToken,
            requestId: request.requestId,
            manifest: {
              transferId,
              requestId: request.requestId,
              instanceId,
              exitCode: 0,
              rawBytes: 0,
              recordCount: 0,
              sha256,
            },
          });
          send({
            kind: "result-end",
            instanceId,
            processToken,
            requestId: request.requestId,
            transferId,
            rawBytes: 0,
            recordCount: 0,
            sha256,
          });
          return;
        }
        if (request.kind === "result-ack") {
          return {
            kind: "result-acknowledged",
            instanceId,
            processToken,
            requestId: request.requestId,
            transferId: request.transferId,
          };
        }
        return { kind: "stopped", instanceId };
      },
    );
    setTimeout(() => {
      const record = this.registry.readInstance(identity, instanceId);
      if (record?.state !== "starting") return;
      this.registry.writeIfStartupOwner(identity, {
        ...record,
        state: "ready",
        readyAt: Date.now(),
        fileCount: 2,
      });
    }, 0);
    return {
      pid: process.pid,
      exited: new Promise(() => undefined),
      terminate: () => this.close(),
    };
  }

  async close(): Promise<void> {
    const server = this.server;
    this.server = undefined;
    await server?.close();
  }
}

function readyRecord(
  identity: DaemonWorkspaceIdentity,
  instanceId: string,
  processToken: string,
  pid: number,
): DaemonRecord {
  return {
    schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    symnavVersion: "0.1.0",
    workspaceRoot: identity.workspaceRoot,
    workspaceKey: identity.workspaceKey,
    stateKey: identity.stateKey,
    identityKey: identity.identityKey,
    instanceId,
    processToken,
    endpoint: identity.endpoint(instanceId),
    pid,
    state: "ready",
    startedAt: 10,
    readyAt: 20,
    fileCount: 2,
    memoryCapBytes: 256 * 1024 * 1024,
  };
}

function spawnIdentifiableDaemon(
  identity: DaemonWorkspaceIdentity,
  instanceId: string,
  processToken: string,
  startedAt: number,
  processIds: number[],
): Promise<number> {
  if (process.platform !== "win32") {
    mkdirSync(dirname(identity.endpoint(instanceId)), { recursive: true, mode: 0o700 });
  }
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        "-e",
        identifiableDaemonSource,
        identity.endpoint(instanceId),
        instanceId,
        processToken,
        String(startedAt),
      ],
      { stdio: ["ignore", "pipe", "ignore"] },
    );
    child.once("error", reject);
    child.stdout?.once("data", () => {
      processIds.push(child.pid!);
      resolve(child.pid!);
    });
  });
}

const identifiableDaemonSource = \`
const { createServer } = require("node:net");
const [endpoint, instanceId, processToken, startedAtText] = process.argv.slice(1);
const startedAt = Number(startedAtText);
const frame = (value) => {
  const payload = Buffer.from(JSON.stringify(value));
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
};
const server = createServer((socket) => {
  let bytes = Buffer.alloc(0);
  socket.on("data", (chunk) => {
    bytes = Buffer.concat([bytes, chunk]);
    if (bytes.length < 4) return;
    const length = bytes.readUInt32BE(0);
    if (bytes.length < length + 4) return;
    const request = JSON.parse(bytes.subarray(4, length + 4).toString("utf8"));
    if (request.kind === "identify") {
      socket.end(frame({ kind: "identity", instanceId, processToken, pid: process.pid, startedAt }));
      return;
    }
    if (request.kind === "ping") {
      socket.end(frame({ kind: "pong", protocolVersion: \${String(
        DAEMON_PROTOCOL_VERSION,
      )}, instanceId, symnavVersion: "0.1.0", startedAt }));
      return;
    }
    if (request.kind === "terminate") {
      socket.end(frame({ kind: "terminating", instanceId, processToken }), () => server.close(() => process.exit(0)));
    }
  });
});
server.listen(endpoint, () => process.stdout.write("ready"));
\`;
`},"head:apps/cli/src/daemon/local-daemon-transport-validation.test.ts":{path:"apps/cli/src/daemon/local-daemon-transport-validation.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"543a3f1f77496d5a520f8b58fb4da20923b4ff4c3998595afdc5892a6f498929",text:`import { randomUUID } from "node:crypto";
import { createConnection, createServer, type Server, type Socket } from "node:net";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DaemonPolicy } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import type {
  DaemonActivitySnapshot,
  DaemonExecuteRequest,
  DaemonExecutionServerFrame,
  DaemonLifecycleRequest,
} from "./daemon-protocol.js";
import { DAEMON_PROTOCOL_VERSION } from "./daemon-protocol.js";
import {
  DaemonTransportError,
  LocalDaemonTransport as RuntimeLocalDaemonTransport,
} from "./local-daemon-transport.js";
import { TestLocalDaemonTransport as LocalDaemonTransport } from "../../test/helpers/local-daemon-transport.js";

describe("LocalDaemonTransport validation", () => {
  it("uses the required transport-policy JSON capacity", () => {
    const policy = DaemonPolicyTestFactory.withOverrides(
      DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }),
      { transport: { maximumJsonPayloadBytes: 32 } },
    );
    const transport = new LocalDaemonTransport({
      transport: policy.values.transport,
      delivery: policy.values.delivery,
      output: policy.values.output,
    });

    expect(transport.canFrame({ payload: "x".repeat(64) })).toBe(false);
  });
  const servers: Server[] = [];
  const sockets: Socket[] = [];
  const directories: string[] = [];

  afterEach(async () => {
    for (const socket of sockets) socket.destroy();
    sockets.length = 0;
    await Promise.all(
      servers.map((server) => new Promise<void>((resolve) => server.close(() => resolve()))),
    );
    servers.length = 0;
    for (const directory of directories) rmSync(directory, { recursive: true, force: true });
    directories.length = 0;
  });

  it.each([
    {
      kind: "identify",
      instanceId: "instance",
      processToken: "token",
    },
    pingRequest(),
  ] satisfies readonly DaemonLifecycleRequest[])(
    "uses the status-observer timeout for $kind lifecycle exchanges",
    async (request) => {
      const policy = DaemonPolicyTestFactory.withOverrides(
        DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }),
        {
          transport: {
            singleResponseTimeoutMs: 1_000,
            statusResponseTimeoutMs: 10,
          },
        },
      );
      const endpoint = await rawServer(servers, sockets, directories, (socket) => {
        socket.once("data", () => {
          setTimeout(
            () =>
              socket.end(
                frame(
                  request.kind === "identify"
                    ? {
                        kind: "identity",
                        instanceId: request.instanceId,
                        processToken: request.processToken,
                        pid: 123,
                        startedAt: 10,
                      }
                    : {
                        kind: "pong",
                        protocolVersion: DAEMON_PROTOCOL_VERSION,
                        instanceId: request.instanceId,
                        symnavVersion: "test",
                      },
                ),
              ),
            50,
          );
        });
      });
      const transport = new RuntimeLocalDaemonTransport(policy.values, {
        responseTimeoutPurpose: "status-observer",
      });

      await expect(transport.request(endpoint, request)).rejects.toMatchObject({
        code: "timeout",
      });
    },
  );

  it("uses the ordinary timeout for execution-status exchanges", async () => {
    const policy = DaemonPolicyTestFactory.withOverrides(
      DaemonPolicy.fromSystemMemory({ totalBytes: 1024 ** 3 }),
      {
        transport: {
          singleResponseTimeoutMs: 10,
          statusResponseTimeoutMs: 1_000,
        },
      },
    );
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.once("data", () => {
        setTimeout(
          () =>
            socket.end(
              frame({
                kind: "execution-status",
                instanceId: "instance",
                processToken: "token",
                requestId: "request",
                status: { kind: "unknown" },
              }),
            ),
          50,
        );
      });
    });
    const transport = new LocalDaemonTransport(policy.values);

    await expect(
      transport.executionStatus(endpoint, {
        kind: "execution-status",
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        instanceId: "instance",
        processToken: "token",
        requestId: "request",
      }),
    ).rejects.toMatchObject({ code: "timeout" });
  });

  it("classifies connection refusal before request submission", async () => {
    const endpoint = validationEndpoint(directories);

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toMatchObject({
      name: "DaemonTransportError",
      code: "unreachable",
      delivery: "not-submitted",
    } satisfies Partial<DaemonTransportError>);
  });

  it("classifies lifecycle timeout after request submission", async () => {
    const endpoint = await rawServer(servers, sockets, directories, () => undefined);

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 10 }).request(endpoint, pingRequest()),
    ).rejects.toMatchObject({
      code: "timeout",
      delivery: "submitted-unconfirmed",
    } satisfies Partial<DaemonTransportError>);
  });

  it("classifies admission timeout after request submission", async () => {
    const endpoint = await rawServer(servers, sockets, directories, () => undefined);

    await expect(
      new LocalDaemonTransport({ executionRequestTimeoutMs: 10 }).execute(
        endpoint,
        executionRequest(),
      ),
    ).rejects.toMatchObject({
      code: "timeout",
      delivery: "submitted-unconfirmed",
    } satisfies Partial<DaemonTransportError>);
  });

  it.each([
    ["malformed", invalidResponse("malformed")],
    ["truncated", invalidResponse("truncated")],
  ] as const)("classifies %s response framing as corrupt", async (_kind, response) => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.end(response);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toMatchObject({
      code: "corrupt",
      delivery: "submitted-unconfirmed",
    } satisfies Partial<DaemonTransportError>);
  });

  it.each([
    [
      "instance",
      pingRequest(),
      {
        kind: "pong",
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        instanceId: "other",
        symnavVersion: "test",
      },
    ],
    [
      "token",
      {
        kind: "identify",
        instanceId: "instance",
        processToken: "expected",
      } satisfies DaemonLifecycleRequest,
      {
        kind: "identity",
        instanceId: "instance",
        processToken: "other",
        pid: 123,
        startedAt: 10,
      },
    ],
  ] as const)("classifies wrong %s as authentication failure", async (_kind, request, response) => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.end(frame(response));
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, request),
    ).rejects.toMatchObject({
      code: "authentication",
      delivery: "accepted",
    } satisfies Partial<DaemonTransportError>);
  });

  it("classifies a correlated protocol mismatch as authenticated incompatibility", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.end(
        frame({
          kind: "pong",
          protocolVersion: DAEMON_PROTOCOL_VERSION + 1,
          instanceId: "instance",
          symnavVersion: "test",
        }),
      );
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toMatchObject({
      code: "incompatible",
      delivery: "accepted",
      authenticatedInstanceId: "instance",
    } satisfies Partial<DaemonTransportError>);
  });

  it("classifies a clean close without a response", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => socket.end());

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toMatchObject({
      code: "closed",
      delivery: "submitted-unconfirmed",
    } satisfies Partial<DaemonTransportError>);
  });

  it("times out a daemon request that never receives a response", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      setTimeout(() => socket.destroy(), 50);
    });
    const transport = new LocalDaemonTransport({ requestTimeoutMs: 10 });

    await expect(transport.request(endpoint, pingRequest())).rejects.toThrow(
      "Daemon request timed out",
    );
  });

  it("rejects malformed daemon frame JSON", async () => {
    const prefix = Buffer.alloc(4);
    prefix.writeUInt32BE(1);
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(Buffer.concat([prefix, Buffer.from("{")]));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("malformed JSON");
  });

  it("rejects oversized inbound daemon frames", async () => {
    const prefix = Buffer.alloc(4);
    prefix.writeUInt32BE(129);
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(prefix);
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ maximumFrameBytes: 128, requestTimeoutMs: 100 }).request(
        endpoint,
        pingRequest(),
      ),
    ).rejects.toThrow("exceeds 128 bytes");
  });

  it("rejects truncated daemon frames", async () => {
    const prefix = Buffer.alloc(4);
    prefix.writeUInt32BE(10);
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.end(Buffer.concat([prefix, Buffer.from("{}")]));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("truncated frame");
  });

  it("rejects oversized outbound daemon frames", () => {
    const write = vi.fn();
    const transport = new LocalDaemonTransport({ maximumFrameBytes: 8 });
    const frameWriter = transport as unknown as {
      writeFrame(socket: { write: typeof write }, value: unknown): void;
    };

    expect(() => frameWriter.writeFrame({ write }, { value: "long daemon payload" })).toThrow(
      "exceeds 8 bytes",
    );
    expect(write).not.toHaveBeenCalled();
  });

  it("rejects unknown daemon response envelopes", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(frame({ kind: "unknown" }));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("Malformed daemon response");
  });

  it.each([
    { transferId: "transfer", requestId: "request", instanceId: "instance", exitCode: 0 },
    {
      transferId: "transfer",
      requestId: "request",
      instanceId: "instance",
      exitCode: 0,
      rawBytes: -1,
      recordCount: 0,
      sha256: "0".repeat(64),
    },
    {
      transferId: "transfer",
      requestId: "other",
      instanceId: "instance",
      exitCode: 0,
      rawBytes: 0,
      recordCount: 0,
      sha256: "invalid",
    },
  ])("rejects malformed daemon result manifests %#", async (manifest) => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(
        Buffer.concat([
          frame(acceptedFrame()),
          frame({
            kind: "result-manifest",
            instanceId: "instance",
            processToken: "token",
            requestId: "request",
            manifest,
          }),
        ]),
      );
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 })
        .execute(endpoint, executionRequest())
        .then((receipt) => receipt.completion),
    ).rejects.toThrow("Malformed daemon result manifest");
  });

  it("rejects a response kind for a different request", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(
        frame({
          kind: "stopped",
          instanceId: "instance",
        }),
      );
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("Daemon pong does not match request protocol and instance");
  });

  it("rejects multiple daemon responses for one request", async () => {
    const response = frame({
      kind: "pong",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: "instance",
      symnavVersion: "test",
    });
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(Buffer.concat([response, response]));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("multiple responses");
  });

  it("rejects invalid server requests before invoking the handler", async () => {
    const endpoint = validationEndpoint(directories);
    let handled = false;
    const transport = new LocalDaemonTransport({ requestTimeoutMs: 100 });
    const listening = await transport.listen(endpoint, async () => {
      handled = true;
      return { kind: "pong", protocolVersion: 1, instanceId: "instance", symnavVersion: "test" };
    });
    const socket = createConnection(endpoint);
    await new Promise<void>((resolve, reject) => {
      socket.once("error", reject);
      socket.once("connect", () => socket.write(frame({ kind: "ping", protocolVersion: "bad" })));
      socket.once("close", () => resolve());
    });

    expect(handled).toBe(false);
    await listening.close();
  });

  it.each([
    {
      kind: "execute",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: "instance",
      processToken: "token",
      requestId: "/private/source/PaymentProcessor::charge",
      request: { argv: ["refs", "symbol"], cwd: "/repo", telemetryEnabled: false },
    },
    {
      kind: "execution-status",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: "instance",
      processToken: "token",
      requestId: "/private/source/PaymentProcessor::charge",
    },
    {
      kind: "result-fetch",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: "instance",
      processToken: "token",
      requestId: "/private/source/PaymentProcessor::charge",
      offset: 0,
    },
    {
      kind: "result-ack",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: "instance",
      processToken: "token",
      requestId: "/private/source/PaymentProcessor::charge",
      transferId: "transfer",
    },
  ] as const)(
    "rejects source-shaped $kind request correlation before dispatch",
    async (request) => {
      const endpoint = validationEndpoint(directories);
      let handled = false;
      const transport = new LocalDaemonTransport({ requestTimeoutMs: 100 });
      const listening = await transport.listen(endpoint, async () => {
        handled = true;
        return { kind: "stopped", instanceId: "instance" };
      });
      const socket = createConnection(endpoint);
      await new Promise<void>((resolve, reject) => {
        socket.once("error", reject);
        socket.once("connect", () => {
          socket.write(frame(request));
          setTimeout(() => {
            socket.destroy();
            resolve();
          }, 20);
        });
      });

      expect(handled).toBe(false);
      await listening.close();
    },
  );

  it("uses native Windows named pipe endpoints", () => {
    expect(validationEndpoint(directories, "win32", "endpoint")).toBe(
      "\\\\\\\\.\\\\pipe\\\\symnav-transport-validation-endpoint",
    );
    expect(directories).toEqual([]);
  });

  it("rejects malformed daemon pong responses", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(
        frame({
          kind: "pong",
          protocolVersion: "invalid",
          instanceId: "instance",
          symnavVersion: "test",
        }),
      );
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("Malformed daemon pong");
  });

  it.each([
    ["busy without current", { lifecycle: "busy" }],
    [
      "ready with current",
      {
        lifecycle: "ready",
        current: { requestId: "request", command: "refs", elapsedMs: 1 },
      },
    ],
    ["recovering without detail", { lifecycle: "recovering" }],
    ["ready with recovery detail", { lifecycle: "ready", recoveryDetail: "resource-pressure" }],
    [
      "path-shaped current command",
      {
        lifecycle: "busy",
        current: { requestId: "request", command: "/private/source.ts", elapsedMs: 1 },
      },
    ],
    [
      "source-shaped current request",
      {
        lifecycle: "busy",
        current: {
          requestId: "/private/source/PaymentProcessor::charge",
          command: "refs",
          elapsedMs: 1,
        },
      },
    ],
    ["starting with indexed files", { lifecycle: "starting", fileCount: 7 }],
  ] as const)("rejects %s activity snapshots", async (_label, contradiction) => {
    const baselineActivity = {
      lifecycle: "ready" as const,
      pid: 123,
      startedAt: 10,
      startupElapsedMs: 20,
      fileCount: 2,
      processRssBytes: 100,
      hardProcessRssBytes: 200,
      workerGeneration: 1,
      queued: 0,
      spoolBytes: 0,
    } satisfies DaemonActivitySnapshot;
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.end(
        frame({
          kind: "pong",
          protocolVersion: DAEMON_PROTOCOL_VERSION,
          instanceId: "instance",
          symnavVersion: "test",
          activity: {
            ...baselineActivity,
            ...contradiction,
          },
        }),
      );
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, pingRequest()),
    ).rejects.toThrow("Malformed daemon pong");
  });

  it("rejects malformed daemon stop responses", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(frame({ kind: "stopped" }));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, {
        kind: "stop",
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        instanceId: "instance",
      }),
    ).rejects.toThrow("Malformed daemon stop response");
  });

  it("rejects malformed daemon identity responses", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(frame({ kind: "identity", instanceId: "instance", processToken: "process" }));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, {
        kind: "identify",
        instanceId: "instance",
        processToken: "process",
      }),
    ).rejects.toThrow("Malformed daemon identity");
  });

  it("rejects malformed daemon termination responses", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.write(frame({ kind: "terminating", instanceId: "instance" }));
      setTimeout(() => socket.destroy(), 50);
    });

    await expect(
      new LocalDaemonTransport({ requestTimeoutMs: 100 }).request(endpoint, {
        kind: "terminate",
        instanceId: "instance",
        processToken: "process",
      }),
    ).rejects.toThrow("Malformed daemon termination response");
  });

  it.each(["startedAt", "fileCount", "memoryBytes", "lastNavigationAt"] as const)(
    "rejects invalid %s pong metadata",
    async (field) => {
      const endpoint = await rawServer(servers, sockets, directories, (socket) => {
        socket.end(
          frame({
            kind: "pong",
            protocolVersion: DAEMON_PROTOCOL_VERSION,
            instanceId: "instance",
            symnavVersion: "test",
            [field]: "invalid",
          }),
        );
      });
      const transport = new LocalDaemonTransport({ requestTimeoutMs: 100 });

      await expect(transport.request(endpoint, pingRequest())).rejects.toThrow(
        "Malformed daemon pong",
      );
    },
  );

  it("rejects nonboolean deferred telemetry requests", async () => {
    const transport = new LocalDaemonTransport({ requestTimeoutMs: 100 });
    const request = {
      kind: "execute",
      protocolVersion: DAEMON_PROTOCOL_VERSION,
      instanceId: "instance",
      processToken: "token",
      requestId: "request",
      request: {
        argv: ["--version"],
        cwd: "/workspace",
        telemetryEnabled: false,
        deferTelemetry: "invalid",
      },
    } as unknown as DaemonExecuteRequest;

    expect(() => transport.execute("/missing-daemon-endpoint", request)).toThrow(
      "Malformed daemon execution request",
    );
  });

  it("rejects legacy embedded completion results", async () => {
    const endpoint = await rawServer(servers, sockets, directories, (socket) => {
      socket.end(
        Buffer.concat([
          frame(acceptedFrame()),
          frame({
            kind: "completed",
            instanceId: "instance",
            processToken: "token",
            requestId: "request",
            result: { exitCode: 0 },
          }),
        ]),
      );
    });
    const transport = new LocalDaemonTransport({ requestTimeoutMs: 100 });

    await expect(
      transport.execute(endpoint, executionRequest()).then((receipt) => receipt.completion),
    ).rejects.toThrow("Malformed daemon response");
  });
});

function pingRequest(): DaemonLifecycleRequest {
  return {
    kind: "ping",
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    instanceId: "instance",
  };
}

function executionRequest(): DaemonExecuteRequest {
  return {
    kind: "execute",
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    instanceId: "instance",
    processToken: "token",
    requestId: "request",
    request: { argv: ["--version"], cwd: "/repo", telemetryEnabled: false },
  };
}

function acceptedFrame(): DaemonExecutionServerFrame {
  return {
    kind: "accepted",
    instanceId: "instance",
    processToken: "token",
    requestId: "request",
    acceptedAt: 1,
    queuePosition: 0,
  };
}

function frame(value: unknown): Buffer {
  const payload = Buffer.from(JSON.stringify(value), "utf8");
  const prefix = Buffer.alloc(4);
  prefix.writeUInt32BE(payload.length);
  return Buffer.concat([prefix, payload]);
}

function invalidResponse(scenario: "malformed" | "truncated"): Buffer {
  const prefix = Buffer.alloc(4);
  if (scenario === "truncated") {
    prefix.writeUInt32BE(10);
    return Buffer.concat([prefix, Buffer.from("{}")]);
  }
  prefix.writeUInt32BE(1);
  return Buffer.concat([prefix, Buffer.from("{")]);
}

async function rawServer(
  servers: Server[],
  sockets: Socket[],
  directories: string[],
  connected: (socket: Socket) => void,
): Promise<string> {
  const endpoint = validationEndpoint(directories);
  const server = createServer((socket) => {
    sockets.push(socket);
    connected(socket);
  });
  servers.push(server);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(endpoint, resolve);
  });
  return endpoint;
}

function validationEndpoint(
  directories: string[],
  platform = process.platform,
  uniqueId: string = randomUUID(),
): string {
  if (platform === "win32") {
    return \`\\\\\\\\.\\\\pipe\\\\symnav-transport-validation-\${uniqueId}\`;
  }
  const directory = mkdtempSync(join(tmpdir(), "symnav-transport-validation-"));
  directories.push(directory);
  return join(directory, "daemon.sock");
}
`},"head:apps/cli/src/daemon/local-daemon-transport-execution.test.ts":{path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"59d2ea628dbe0a9307b336bc35baa564c886cbf42b49501315104ca2ba35f87f",text:`import { randomUUID } from "node:crypto";
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
`},"head:apps/cli/test/helpers/workspace-daemon.ts":{path:"apps/cli/test/helpers/workspace-daemon.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"5e1309299e90606f0a8ae8505da44a9a85051ac809f1376e5648af8a4413a0d9",text:`import { DaemonPolicy } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import type { TestDaemonResourcePolicy as DaemonResourcePolicy } from "./daemon-resource-policy.js";
import {
  WorkspaceDaemon as RuntimeWorkspaceDaemon,
  type WorkspaceDaemonOptions,
} from "../../src/daemon/workspace-daemon.js";

interface TestWorkspaceDaemonPolicyOptions {
  readonly policy?: DaemonPolicy;
  readonly memoryCapBytes?: number;
  readonly resourcePolicy?: DaemonResourcePolicy;
  readonly idleTimeoutMs?: number;
  readonly resourceCheckIntervalMs?: number;
  readonly startupHeartbeatIntervalMs?: number;
  readonly completionSpoolLimits?: {
    readonly inlineBytes?: number;
    readonly maximumResultBytes?: number;
    readonly maximumAggregateBytes?: number;
  };
  readonly operationTraceRetentionMs?: number;
  readonly maximumRetainedOperationTraces?: number;
}

export type TestWorkspaceDaemonOptions = Omit<WorkspaceDaemonOptions, "policy"> &
  TestWorkspaceDaemonPolicyOptions;

export class TestWorkspaceDaemon extends RuntimeWorkspaceDaemon {
  constructor(options: TestWorkspaceDaemonOptions) {
    const base = options.policy ?? options.dependencies.daemonPolicy;
    const resourceRecord = options.resourcePolicy?.record;
    const hardProcessRssBytes = resourceRecord?.hardProcessRssBytes;
    const softProcessRssBytes = resourceRecord?.softProcessRssBytes;
    const resumeProcessRssBytes = resourceRecord?.resumeProcessRssBytes;
    const aggregateBytes = options.completionSpoolLimits?.maximumAggregateBytes;
    const resultBytes =
      options.completionSpoolLimits?.maximumResultBytes ??
      (aggregateBytes === undefined
        ? undefined
        : Math.min(base.values.output.maximumResultRawBytes, aggregateBytes));
    const requestedInlineBytes = options.completionSpoolLimits?.inlineBytes;
    const inlineBytes =
      requestedInlineBytes === 0 && resultBytes !== undefined
        ? Math.max(1, Math.floor(resultBytes / 2))
        : requestedInlineBytes;
    const chunkBytes = Math.min(
      base.values.output.maximumChunkRawBytes,
      inlineBytes ?? base.values.output.inlineRawBytes,
      resultBytes ?? base.values.output.maximumResultRawBytes,
    );
    const policy = DaemonPolicyTestFactory.withOverrides(base, {
      startup: {
        ...(options.startupHeartbeatIntervalMs === undefined
          ? {}
          : { heartbeatIntervalMs: options.startupHeartbeatIntervalMs }),
      },
      shutdown: {
        ...(options.idleTimeoutMs === undefined ? {} : { idleTimeoutMs: options.idleTimeoutMs }),
      },
      output: {
        maximumChunkRawBytes: chunkBytes,
        ...(inlineBytes === undefined ? {} : { inlineRawBytes: inlineBytes }),
        ...(resultBytes === undefined ? {} : { maximumResultRawBytes: resultBytes }),
        ...(aggregateBytes === undefined ? {} : { maximumAggregateSpoolRawBytes: aggregateBytes }),
      },
      resources: {
        ...(resourceRecord === undefined
          ? {}
          : {
              effectiveMemoryBytes: resourceRecord.effectiveMemoryBytes,
              hardProcessRssBytes: resourceRecord.hardProcessRssBytes,
              softProcessRssBytes: resourceRecord.softProcessRssBytes,
              resumeProcessRssBytes: resourceRecord.resumeProcessRssBytes,
              workerMaxOldGenerationSizeMiB: resourceRecord.workerMaxOldGenerationSizeMb,
              replacementWindowMs: resourceRecord.replacementWindowMs,
              replacementLimit: resourceRecord.replacementLimit,
            }),
        ...(hardProcessRssBytes === undefined ? {} : { hardProcessRssBytes }),
        ...(softProcessRssBytes === undefined ? {} : { softProcessRssBytes }),
        ...(resumeProcessRssBytes === undefined ? {} : { resumeProcessRssBytes }),
        ...(options.resourceCheckIntervalMs === undefined
          ? {}
          : { supervisionIntervalMs: options.resourceCheckIntervalMs }),
      },
      diagnostics: {
        ...(options.operationTraceRetentionMs === undefined
          ? {}
          : { disconnectedTraceRetentionMs: options.operationTraceRetentionMs }),
        ...(options.maximumRetainedOperationTraces === undefined
          ? {}
          : { maximumDisconnectedTraces: options.maximumRetainedOperationTraces }),
      },
    });
    super({
      ...options,
      policy,
    });
  }
}
`},"head:apps/cli/test/helpers/local-daemon-transport.ts":{path:"apps/cli/test/helpers/local-daemon-transport.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"e54b39498fcc16fb37712a077ce9659812cdcf5f3994fa007fb36ca170bd6d35",text:`import { mkdirSync } from "node:fs";
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
`},"head:apps/cli/test/helpers/daemon-controller.ts":{path:"apps/cli/test/helpers/daemon-controller.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"0d8edf696751f8eeb23ec4d7d58a9d80e5831cb1ee3ee5b1b86fc1068890fc0e",text:`import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import { DaemonController as RuntimeDaemonController } from "../../src/daemon/daemon-controller.js";
import type {
  DaemonProcessLauncher,
  DaemonProcessTerminator,
} from "../../src/daemon/daemon-process-launcher.js";
import type { DaemonRegistry } from "../../src/daemon/daemon-registry.js";
import type { LocalDaemonTransport } from "../../src/daemon/local-daemon-transport.js";

interface TestDaemonControllerOptions {
  readonly policy?: Pick<DaemonPolicyValues, "startup" | "shutdown">;
  readonly now?: () => number;
  readonly stopTimeoutMs?: number;
  readonly pollIntervalMs?: number;
  readonly processTerminator?: DaemonProcessTerminator;
  readonly launcher?: DaemonProcessLauncher;
}

export class TestDaemonController extends RuntimeDaemonController {
  constructor(
    registry: DaemonRegistry,
    transport: LocalDaemonTransport,
    stateDirectory: string,
    options: TestDaemonControllerOptions = {},
  ) {
    const policy =
      options.policy ??
      DaemonPolicyTestFactory.withOverrides(DaemonPolicy.currentSystem(), {
        shutdown: {
          ...(options.stopTimeoutMs === undefined ? {} : { stopTimeoutMs: options.stopTimeoutMs }),
          ...(options.pollIntervalMs === undefined
            ? {}
            : { controllerPollIntervalMs: options.pollIntervalMs }),
        },
      }).values;
    super(registry, transport, stateDirectory, {
      policy,
      ...(options.now === undefined ? {} : { now: options.now }),
      ...(options.processTerminator === undefined
        ? {}
        : { processTerminator: options.processTerminator }),
      ...(options.launcher === undefined ? {} : { launcher: options.launcher }),
    });
  }
}
`},"head:apps/cli/test/helpers/daemon-startup-coordinator.ts":{path:"apps/cli/test/helpers/daemon-startup-coordinator.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"d90dfdae1d13c181c16c1916db35ffe3bd2a26be798c125af98eda39b0c285f9",text:`import { DaemonPolicy, type DaemonPolicyValues } from "@symnav/daemon";
import { DaemonPolicyTestFactory } from "@symnav/daemon/policy-testing";
import type {
  DaemonProcessLauncher,
  DaemonProcessTerminator,
} from "../../src/daemon/daemon-process-launcher.js";
import type { DaemonRegistry } from "../../src/daemon/daemon-registry.js";
import { DaemonStartupCoordinator as RuntimeDaemonStartupCoordinator } from "../../src/daemon/daemon-startup-coordinator.js";
import type { LocalDaemonTransport } from "../../src/daemon/local-daemon-transport.js";

interface TestDaemonStartupCoordinatorOptions {
  readonly policy?: Pick<DaemonPolicyValues, "startup" | "shutdown">;
  readonly terminationTimeoutMs?: number;
  readonly pollIntervalMs?: number;
  readonly now?: () => number;
  readonly instanceId?: () => string;
  readonly processTerminator?: DaemonProcessTerminator;
}

export class TestDaemonStartupCoordinator extends RuntimeDaemonStartupCoordinator {
  constructor(
    registry: DaemonRegistry,
    launcher: DaemonProcessLauncher,
    transport: LocalDaemonTransport,
    options: TestDaemonStartupCoordinatorOptions = {},
  ) {
    const policy =
      options.policy ??
      DaemonPolicyTestFactory.withOverrides(DaemonPolicy.currentSystem(), {
        startup: {
          ...(options.terminationTimeoutMs === undefined
            ? {}
            : { previousInstanceTerminationTimeoutMs: options.terminationTimeoutMs }),
          ...(options.pollIntervalMs === undefined
            ? {}
            : { observationPollIntervalMs: options.pollIntervalMs }),
        },
      }).values;
    super(registry, launcher, transport, {
      policy,
      ...(options.now === undefined ? {} : { now: options.now }),
      ...(options.instanceId === undefined ? {} : { instanceId: options.instanceId }),
      ...(options.processTerminator === undefined
        ? {}
        : { processTerminator: options.processTerminator }),
    });
  }
}
`},"head:apps/cli/test/helpers/daemon-resource-policy.ts":{path:"apps/cli/test/helpers/daemon-resource-policy.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"133cfad1a49db4de8a3e9ca258815e148861e0d8d811d62c821aacbaa57e6870",text:`import { DaemonPolicy } from "@symnav/daemon";

export interface TestDaemonResourcePolicyRecord {
  readonly effectiveMemoryBytes: number;
  readonly hardProcessRssBytes: number;
  readonly softProcessRssBytes: number;
  readonly resumeProcessRssBytes: number;
  readonly workerMaxOldGenerationSizeMb: number;
  readonly replacementWindowMs: number;
  readonly replacementLimit: number;
}

export class TestDaemonResourcePolicy {
  private constructor(readonly record: TestDaemonResourcePolicyRecord) {}

  static fromSystemMemory(
    totalMemoryBytes: number,
    constrainedMemoryBytes?: number,
  ): TestDaemonResourcePolicy {
    const resources = DaemonPolicy.fromSystemMemory({
      totalBytes: totalMemoryBytes,
      ...(constrainedMemoryBytes === undefined ? {} : { constrainedBytes: constrainedMemoryBytes }),
    }).values.resources;
    return new TestDaemonResourcePolicy({
      effectiveMemoryBytes: resources.effectiveMemoryBytes,
      hardProcessRssBytes: resources.hardProcessRssBytes,
      softProcessRssBytes: resources.softProcessRssBytes,
      resumeProcessRssBytes: resources.resumeProcessRssBytes,
      workerMaxOldGenerationSizeMb: resources.workerMaxOldGenerationSizeMiB,
      replacementWindowMs: resources.replacementWindowMs,
      replacementLimit: resources.replacementLimit,
    });
  }
}
`},"head:apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts":{path:"apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts",revision:"head",sha:"b100221db48754656328391b878299c5a0bab443",sha256:"a1f743fc324293498ac6687f280ca05da852c5a18948292fa0ec774ce5a5088d",text:`import type { TestDaemonResourcePolicyRecord as DaemonResourcePolicyRecord } from "../helpers/daemon-resource-policy.js";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  appendFileSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { rm as remove } from "node:fs/promises";
import { cpus, tmpdir, totalmem } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { runSymnavBinary, type RunSymnavBinaryResult } from "@symnav/testing";
import { TestDaemonRegistry as DaemonRegistry } from "../helpers/daemon-registry.js";
import type { DaemonCommandName } from "../../src/daemon/daemon-protocol.js";
import { TestDaemonResourcePolicy as DaemonResourcePolicy } from "../helpers/daemon-resource-policy.js";
import { DaemonWorkspaceIdentity } from "../../src/daemon/daemon-workspace-identity.js";
import { StateDirectoryResolver } from "../../src/state-directory-resolver.js";
import { canonicalWorkspaceRoot } from "../helpers/canonical-workspace-root.js";
import type {
  DaemonBenchmarkGateResult,
  DaemonBenchmarkSample,
  DaemonBenchmarkStatistics,
} from "./daemon-benchmark-gate.js";
import { DAEMON_BENCHMARK_WARM_REPETITIONS, DaemonBenchmarkGate } from "./daemon-benchmark-gate.js";
import {
  DaemonWorkspaceGenerator,
  type DaemonBenchmarkCommand,
  type DaemonBenchmarkResultExpectation,
  type GeneratedDaemonWorkspace,
} from "./daemon-workspace-generator.js";
import type { DaemonBenchmarkScale } from "./daemon-workspace-generator.js";
import { DaemonWorkspaceProfiler } from "./daemon-workspace-profile.js";
import type { DaemonWorkspaceProfile } from "./daemon-workspace-profile.js";

export interface DaemonBenchmarkHarnessOptions {
  readonly profile: DaemonWorkspaceProfile;
  readonly scale: DaemonBenchmarkScale;
  readonly generatorVersion: string;
  readonly seed: string;
  readonly workspaceRoot?: string;
  readonly stateDirectory?: string;
}

export interface DaemonBenchmarkArtifact {
  readonly schemaVersion: 1;
  readonly profileVersion: string;
  readonly generatorVersion: string;
  readonly seed: string;
  readonly scale: DaemonBenchmarkScale;
  readonly platform: NodeJS.Platform;
  readonly architecture: string;
  readonly nodeVersion: string;
  readonly cpuCount: number;
  readonly resourcePolicy: DaemonResourcePolicyRecord;
  readonly startupMs: number;
  readonly startupPhaseStatistics: Readonly<Record<string, DaemonBenchmarkDurationStatistics>>;
  readonly commandStatistics: Readonly<Record<string, DaemonBenchmarkStatistics>>;
  readonly commandPhaseStatistics: Readonly<Record<string, DaemonBenchmarkCommandPhaseStatistics>>;
  readonly processRssPeakBytes: number;
  readonly workerHeapPeakBytes?: number;
  readonly spoolPeakBytes: number;
  readonly responsePeakBytes: number;
  readonly largeResponseBytes: number;
  readonly busyStatusObserved: boolean;
  readonly statusMaximumMs: number;
  readonly parity: boolean;
  readonly freshness: boolean;
  readonly statusResponsive: boolean;
  readonly continuity: boolean;
  readonly exactlyOnceTelemetry: boolean;
  readonly resourcesWithinPolicy: boolean;
  readonly spoolsCleaned: boolean;
  readonly failures: DaemonBenchmarkGateResult["failures"];
  readonly samples: readonly DaemonBenchmarkSample[];
}

export class DaemonScaleBenchmarkHarness {
  constructor(private readonly options: DaemonBenchmarkHarnessOptions) {}

  async run(): Promise<DaemonBenchmarkArtifact> {
    const ownsWorkspace = this.options.workspaceRoot === undefined;
    const ownsState = this.options.stateDirectory === undefined;
    const workspaceRoot =
      this.options.workspaceRoot ?? mkdtempSync(join(tmpdir(), "symnav-daemon-scale-workspace-"));
    const stateDirectory =
      this.options.stateDirectory ?? mkdtempSync(join(tmpdir(), "symnav-daemon-scale-state-"));
    let daemonStarted = false;
    try {
      const generated = await new DaemonWorkspaceGenerator(this.options).generate(workspaceRoot);
      const generatedProfile = await new DaemonWorkspaceProfiler().profile(workspaceRoot);
      const identity = DaemonWorkspaceIdentity.from(
        canonicalWorkspaceRoot(realpathSync(workspaceRoot)),
        StateDirectoryResolver.canonicalize(stateDirectory),
      );
      const startupStartedAt = performance.now();
      const started = this.runCommand(workspaceRoot, stateDirectory, ["daemon", "start"], false);
      const startupMs = performance.now() - startupStartedAt;
      if (started.status !== 0)
        throw new Error(\`Daemon benchmark startup failed: \${started.stderr}\`);
      daemonStarted = true;
      const registry = new DaemonRegistry(identity.registryDirectory);
      const initialRecord = registry.read(identity);
      if (initialRecord === undefined)
        throw new Error("Daemon benchmark startup record is missing");

      const fixedDiagnosticCursor = await this.waitForStartupDiagnostics(identity.logPath);
      const samples = await this.runFixedSuite(generated, stateDirectory);
      const fixedDiagnostics = await this.waitForFixedDiagnostics(
        identity.logPath,
        fixedDiagnosticCursor,
        samples.length,
      );
      const enrichedSamples = fixedDiagnostics.enrich(samples);
      const fixedArtifactComplete = fixedDiagnostics.complete(enrichedSamples);
      const mutations = this.runMutations(generated, stateDirectory);
      const largeResponse = await this.runLargeResponseAndBusyStatus(generated, stateDirectory);
      const finalRecord = registry.read(identity);
      if (finalRecord === undefined) throw new Error("Daemon benchmark final record is missing");
      const stopped = this.runCommand(workspaceRoot, stateDirectory, ["daemon", "stop"], false);
      daemonStarted = false;
      if (stopped.status !== 0) throw new Error("Daemon benchmark shutdown failed");

      const diagnostics = DaemonBenchmarkDiagnostics.read(identity.logPath);
      const telemetryCommands = this.warmTelemetryCommands(stateDirectory);
      const resourcePolicy = DaemonResourcePolicy.fromSystemMemory(
        totalmem(),
        process.constrainedMemory?.(),
      ).record;
      const expectedTelemetryCount = enrichedSamples.length + 7;
      const gate = new DaemonBenchmarkGate().evaluate({
        scale: this.options.scale,
        samples: enrichedSamples,
        expectedCommands: Object.keys(generated.commands) as (keyof typeof generated.commands)[],
        stdoutParity: samples.every((sample) => sample.stdoutParity) && largeResponse.stdoutParity,
        stderrParity: samples.every((sample) => sample.stderrParity) && largeResponse.stderrParity,
        exitParity: samples.every((sample) => sample.exitParity) && largeResponse.exitParity,
        semanticResultsValid: BenchmarkSampleEvidence.semanticResultsValid(samples),
        freshness: mutations.current,
        statusMaximumMs: largeResponse.statusMaximumMs,
        busyStatusObserved: largeResponse.busyStatusObserved,
        initialPid: initialRecord.pid,
        finalPid: finalRecord.pid,
        initialInstanceId: initialRecord.instanceId,
        finalInstanceId: finalRecord.instanceId,
        fallbackCount: this.fallbackTelemetryCount(stateDirectory),
        restartCount: diagnostics.restartCount,
        capacityResultCount: diagnostics.capacityResultCount,
        rawRuntimeFailureCount: diagnostics.rawRuntimeFailureCount,
        largeResponseBytes: largeResponse.responseBytes,
        processRssPeakBytes: diagnostics.processRssPeakBytes,
        hardProcessRssBytes: resourcePolicy.hardProcessRssBytes,
        expectedTelemetryCount,
        actualTelemetryCount: telemetryCommands.length,
        expectedTelemetryCommands: [
          ...enrichedSamples.map((sample) => sample.command),
          "overview",
          "resolve",
          "resolve",
          "overview",
          "overview",
          "overview",
          "overview",
        ],
        actualTelemetryCommands: telemetryCommands,
        invocationTelemetryComplete:
          enrichedSamples.every((sample) => sample.telemetryMatched) &&
          mutations.telemetryComplete &&
          largeResponse.telemetryMatched,
        artifactComplete: fixedArtifactComplete,
        spoolBytesAfterCleanup: DaemonScaleBenchmarkHarness.directoryBytes(identity.spoolDirectory),
        diagnosticPhasesComplete: diagnostics.phasesComplete,
        generatedVisibleFiles: generatedProfile.visibleTypeScriptFiles,
        expectedVisibleFiles: generated.expectedProfile.visibleTypeScriptFiles,
        mutationsCurrent: mutations.current,
      });
      return {
        schemaVersion: 1,
        profileVersion: this.options.profile.profileVersion,
        generatorVersion: this.options.generatorVersion,
        seed: this.options.seed,
        scale: this.options.scale,
        platform: process.platform,
        architecture: process.arch,
        nodeVersion: process.version,
        cpuCount: cpus().length,
        resourcePolicy,
        startupMs,
        startupPhaseStatistics: DaemonBenchmarkPhaseStatistics.startup(
          diagnostics.startupDurations,
        ),
        commandStatistics: gate.commandStatistics,
        commandPhaseStatistics: DaemonBenchmarkPhaseStatistics.from(enrichedSamples),
        processRssPeakBytes: diagnostics.processRssPeakBytes,
        ...(diagnostics.workerHeapPeakBytes === undefined
          ? {}
          : { workerHeapPeakBytes: diagnostics.workerHeapPeakBytes }),
        spoolPeakBytes: diagnostics.spoolPeakBytes,
        responsePeakBytes: Math.max(
          largeResponse.responseBytes,
          ...enrichedSamples.map((sample) => sample.responseBytes),
        ),
        largeResponseBytes: largeResponse.responseBytes,
        busyStatusObserved: largeResponse.busyStatusObserved,
        statusMaximumMs: largeResponse.statusMaximumMs,
        parity: gate.parity,
        freshness: gate.freshness,
        statusResponsive: gate.statusResponsive,
        continuity: gate.continuity,
        exactlyOnceTelemetry: gate.exactlyOnceTelemetry,
        resourcesWithinPolicy: gate.resourcesWithinPolicy,
        spoolsCleaned: gate.spoolsCleaned,
        failures: gate.failures,
        samples: enrichedSamples,
      };
    } finally {
      if (daemonStarted) {
        this.runCommand(workspaceRoot, stateDirectory, ["daemon", "stop"], false);
      }
      if (ownsWorkspace) await DaemonScaleBenchmarkHarness.removeOwnedDirectory(workspaceRoot);
      if (ownsState) await DaemonScaleBenchmarkHarness.removeOwnedDirectory(stateDirectory);
    }
  }

  private async runFixedSuite(
    generated: GeneratedDaemonWorkspace,
    stateDirectory: string,
  ): Promise<BenchmarkSampleEvidence[]> {
    const samples: BenchmarkSampleEvidence[] = [];
    for (const [command, benchmark] of Object.entries(generated.commands)) {
      const cold = await this.runCommandAsync(
        generated.workspaceRoot,
        stateDirectory,
        benchmark.argv,
        false,
        false,
      );
      for (let repetition = 0; repetition < DAEMON_BENCHMARK_WARM_REPETITIONS; repetition += 1) {
        const telemetryBefore = this.telemetryEvents(stateDirectory);
        const startedAt = performance.now();
        const warm = await this.runCommandAsync(
          generated.workspaceRoot,
          stateDirectory,
          benchmark.argv,
          true,
          true,
        );
        const wallMs = performance.now() - startedAt;
        const telemetryAfter = this.telemetryEvents(stateDirectory);
        samples.push(
          BenchmarkSampleEvidence.from(
            command as keyof typeof generated.commands,
            repetition,
            cold,
            warm,
            wallMs,
            benchmark,
            BenchmarkSampleEvidence.telemetryMatched(
              telemetryBefore,
              telemetryAfter,
              command as keyof typeof generated.commands,
            ),
          ),
        );
      }
    }
    return samples;
  }

  private async waitForFixedDiagnostics(
    logPath: string,
    cursor: number,
    expectedOperations: number,
  ): Promise<DaemonBenchmarkDiagnostics> {
    const deadline = performance.now() + 10_000;
    let diagnostics = DaemonBenchmarkDiagnostics.read(logPath, cursor);
    while (!diagnostics.ready(expectedOperations) && performance.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      diagnostics = DaemonBenchmarkDiagnostics.read(logPath, cursor);
    }
    return diagnostics;
  }

  private async waitForStartupDiagnostics(logPath: string): Promise<number> {
    const deadline = performance.now() + 10_000;
    while (
      !DaemonBenchmarkDiagnostics.startupProbeComplete(logPath) &&
      performance.now() < deadline
    ) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return DaemonBenchmarkDiagnostics.eventCount(logPath);
  }

  private runMutations(
    generated: GeneratedDaemonWorkspace,
    stateDirectory: string,
  ): MutationEvidence {
    const root = generated.workspaceRoot;
    let current = true;
    const telemetryMatches: boolean[] = [];
    const editedPath = join(root, generated.mutations.sameSizeEdit);
    const original = readFileSync(editedPath, "utf8");
    const originalTimes = statSync(editedPath);
    const beforeEdit = this.runCommand(
      root,
      stateDirectory,
      generated.commands.overview.argv,
      false,
    );
    const edited = original.replace(/generatorSeed = "[0-9a-f]/, (prefix) =>
      prefix.endsWith("0") ? \`\${prefix.slice(0, -1)}1\` : \`\${prefix.slice(0, -1)}0\`,
    );
    writeFileSync(editedPath, edited, "utf8");
    utimesSync(editedPath, originalTimes.atime, originalTimes.mtime);
    const editedEvidence = this.changedParity(
      root,
      stateDirectory,
      generated.commands.overview.argv,
      beforeEdit,
    );
    current = editedEvidence.current && current;
    telemetryMatches.push(editedEvidence.telemetryMatched);

    const addedPath = join(root, generated.mutations.add);
    writeFileSync(addedPath, "export const AddedBenchmarkSymbol = 1;\\n", "utf8");
    const addedEvidence = this.nonEmptyParity(root, stateDirectory, [
      "resolve",
      "AddedBenchmarkSymbol",
    ]);
    current = addedEvidence.current && current;
    telemetryMatches.push(addedEvidence.telemetryMatched);

    const beforeRemove = this.runCommand(
      root,
      stateDirectory,
      ["resolve", generated.mutations.removeSymbol],
      false,
    );
    unlinkSync(join(root, generated.mutations.remove));
    const removedEvidence = this.changedParity(
      root,
      stateDirectory,
      ["resolve", generated.mutations.removeSymbol],
      beforeRemove,
    );
    current = removedEvidence.current && current;
    telemetryMatches.push(removedEvidence.telemetryMatched);

    const beforeRename = this.runCommand(
      root,
      stateDirectory,
      ["overview", generated.mutations.renameFrom],
      false,
    );
    renameSync(
      join(root, generated.mutations.renameFrom),
      join(root, generated.mutations.renameTo),
    );
    const renamedEvidence = this.nonEmptyParity(root, stateDirectory, [
      "overview",
      generated.mutations.renameTo,
    ]);
    current = renamedEvidence.current && beforeRename.status === 0 && current;
    telemetryMatches.push(renamedEvidence.telemetryMatched);

    const beforeIgnore = this.runCommand(
      root,
      stateDirectory,
      ["overview", generated.mutations.add],
      false,
    );
    appendFileSync(join(root, generated.mutations.ignoreRule), \`\${generated.mutations.add}\\n\`);
    const ignoredEvidence = this.changedParity(
      root,
      stateDirectory,
      ["overview", generated.mutations.add],
      beforeIgnore,
    );
    current = ignoredEvidence.current && current;
    telemetryMatches.push(ignoredEvidence.telemetryMatched);
    const nestedEvidence = this.errorParity(root, stateDirectory, [
      "overview",
      generated.mutations.nestedWorkspaceFile,
    ]);
    current = nestedEvidence.current && current;
    telemetryMatches.push(nestedEvidence.telemetryMatched);
    return { current, telemetryComplete: telemetryMatches.every(Boolean) };
  }

  private changedParity(
    root: string,
    stateDirectory: string,
    argv: readonly string[],
    before: RunSymnavBinaryResult,
  ): MutationInvocationEvidence {
    const result = this.parity(root, stateDirectory, argv);
    return {
      current: result.parity && result.cold.stdout !== before.stdout,
      telemetryMatched: result.telemetryMatched,
    };
  }

  private nonEmptyParity(
    root: string,
    stateDirectory: string,
    argv: readonly string[],
  ): MutationInvocationEvidence {
    const result = this.parity(root, stateDirectory, argv);
    return {
      current: result.parity && result.warm.status === 0 && result.warm.stdout.trim().length > 0,
      telemetryMatched: result.telemetryMatched,
    };
  }

  private errorParity(
    root: string,
    stateDirectory: string,
    argv: readonly string[],
  ): MutationInvocationEvidence {
    const result = this.parity(root, stateDirectory, argv);
    return {
      current: result.parity && result.warm.status !== 0,
      telemetryMatched: result.telemetryMatched,
    };
  }

  private parity(
    root: string,
    stateDirectory: string,
    argv: readonly string[],
  ): {
    readonly cold: RunSymnavBinaryResult;
    readonly warm: RunSymnavBinaryResult;
    readonly parity: boolean;
    readonly telemetryMatched: boolean;
  } {
    const cold = this.runCommand(root, stateDirectory, argv, false);
    const telemetryBefore = this.telemetryEvents(stateDirectory);
    const warm = this.runCommand(root, stateDirectory, argv, true);
    const telemetryAfter = this.telemetryEvents(stateDirectory);
    return {
      cold,
      warm,
      parity:
        cold.status === warm.status && cold.stdout === warm.stdout && cold.stderr === warm.stderr,
      telemetryMatched: BenchmarkInvocationTelemetry.matches({
        before: telemetryBefore,
        after: telemetryAfter,
        command: argv[0] as DaemonCommandName,
      }),
    };
  }

  private async runLargeResponseAndBusyStatus(
    generated: GeneratedDaemonWorkspace,
    stateDirectory: string,
  ): Promise<LargeResponseEvidence> {
    const relativePath = "large-response.ts";
    const sourcePath = join(generated.workspaceRoot, relativePath);
    const longType = \`"\${"x".repeat(90_000)}"\`;
    const declarations = Array.from(
      { length: 100 },
      (_, index) =>
        \`export function largeSymbol\${String(index).padStart(5, "0")}(value: \${longType}): string { return value; }\\n\`,
    );
    writeFileSync(sourcePath, declarations.join(""), "utf8");
    const argv = ["overview", relativePath] as const;
    const cold = await this.runCommandAsync(
      generated.workspaceRoot,
      stateDirectory,
      argv,
      false,
      false,
    );
    const telemetryBefore = this.telemetryEvents(stateDirectory);
    let warmSettled = false;
    const warmPromise = this.runCommandAsync(
      generated.workspaceRoot,
      stateDirectory,
      argv,
      true,
      true,
    ).finally(() => {
      warmSettled = true;
    });
    let busyStatusObserved = false;
    let statusMaximumMs = 0;
    while (!busyStatusObserved && !warmSettled) {
      const statusStartedAt = performance.now();
      const status = this.runCommand(
        generated.workspaceRoot,
        stateDirectory,
        ["daemon", "status", "--json"],
        false,
      );
      statusMaximumMs = Math.max(statusMaximumMs, performance.now() - statusStartedAt);
      if (status.status !== 0) throw new Error("Daemon benchmark busy status failed");
      busyStatusObserved = DaemonScaleBenchmarkHarness.hasBusyDaemon(status.stdout);
      if (!busyStatusObserved) await DaemonScaleBenchmarkHarness.yieldToChild();
    }
    const warm = await warmPromise;
    const telemetryAfter = this.telemetryEvents(stateDirectory);
    unlinkSync(sourcePath);
    return {
      responseBytes: Buffer.byteLength(warm.stdout) + Buffer.byteLength(warm.stderr),
      stdoutParity: cold.stdout === warm.stdout,
      stderrParity: cold.stderr === warm.stderr,
      exitParity: cold.status === warm.status,
      busyStatusObserved,
      statusMaximumMs,
      telemetryMatched: BenchmarkInvocationTelemetry.matches({
        before: telemetryBefore,
        after: telemetryAfter,
        command: "overview",
      }),
    };
  }

  private runCommandAsync(
    workspaceRoot: string,
    stateDirectory: string,
    argv: readonly string[],
    daemon: boolean,
    telemetry: boolean,
  ): Promise<RunSymnavBinaryResult> {
    return new Promise((resolveResult, reject) => {
      const child = spawn(process.execPath, [DaemonScaleBenchmarkHarness.cliPath, ...argv], {
        cwd: workspaceRoot,
        env: {
          ...process.env,
          SYMNAV_STATE_DIR: stateDirectory,
          SYMNAV_DAEMON: daemon ? "1" : "0",
          SYMNAV_TELEMETRY: telemetry ? "1" : "0",
        },
      });
      let stdout = "";
      let stderr = "";
      child.stdout.setEncoding("utf8").on("data", (chunk: string) => (stdout += chunk));
      child.stderr.setEncoding("utf8").on("data", (chunk: string) => (stderr += chunk));
      child.once("error", reject);
      child.once("close", (status) => resolveResult({ status, stdout, stderr }));
    });
  }

  private static get cliPath(): string {
    return fileURLToPath(new URL("../../dist/cli.js", import.meta.url));
  }

  private static hasBusyDaemon(stdout: string): boolean {
    const value = JSON.parse(stdout) as { daemons?: readonly { state?: unknown }[] };
    return value.daemons?.some((daemon) => daemon.state === "busy") ?? false;
  }

  private static yieldToChild(): Promise<void> {
    return new Promise((resolveYield) => setTimeout(resolveYield, 10));
  }

  private static async removeOwnedDirectory(path: string): Promise<void> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        await remove(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
        return;
      } catch (error) {
        if (attempt === 4) throw error;
        await new Promise((resolveRetry) => setTimeout(resolveRetry, 250));
      }
    }
  }

  private runCommand(
    workspaceRoot: string,
    stateDirectory: string,
    argv: readonly string[],
    telemetry: boolean,
  ): RunSymnavBinaryResult {
    return runSymnavBinary(argv, {
      cwd: workspaceRoot,
      env: {
        SYMNAV_STATE_DIR: stateDirectory,
        SYMNAV_DAEMON: argv[0] === "daemon" ? undefined : telemetry ? "1" : "0",
        SYMNAV_TELEMETRY: telemetry ? "1" : "0",
      },
    });
  }

  private warmTelemetryCommands(stateDirectory: string): DaemonCommandName[] {
    return this.telemetryEvents(stateDirectory)
      .filter((event) => event.executionMode === "warm")
      .map((event) => event.command as DaemonCommandName);
  }

  private fallbackTelemetryCount(stateDirectory: string): number {
    return this.telemetryEvents(stateDirectory).filter(
      (event) => event.executionMode === "fallback",
    ).length;
  }

  private telemetryEvents(stateDirectory: string): readonly Record<string, unknown>[] {
    const path = join(stateDirectory, "usage.jsonl");
    if (!existsSync(path)) return [];
    return readFileSync(path, "utf8")
      .split("\\n")
      .filter((line) => line.length > 0)
      .map((line) => JSON.parse(line) as Record<string, unknown>);
  }

  private static directoryBytes(path: string): number {
    if (!existsSync(path)) return 0;
    let bytes = 0;
    for (const name of readdirSync(path)) {
      const child = join(path, name);
      const metadata = statSync(child);
      bytes += metadata.isDirectory() ? this.directoryBytes(child) : metadata.size;
    }
    return bytes;
  }
}

export interface BenchmarkSampleEvidence extends DaemonBenchmarkSample {
  readonly stdoutParity: boolean;
  readonly stderrParity: boolean;
  readonly exitParity: boolean;
  readonly nonEmpty: boolean;
  readonly diagnosticMatched: boolean;
  readonly telemetryMatched: boolean;
}

interface LargeResponseEvidence {
  readonly responseBytes: number;
  readonly stdoutParity: boolean;
  readonly stderrParity: boolean;
  readonly exitParity: boolean;
  readonly busyStatusObserved: boolean;
  readonly statusMaximumMs: number;
  readonly telemetryMatched: boolean;
}

interface MutationEvidence {
  readonly current: boolean;
  readonly telemetryComplete: boolean;
}

interface MutationInvocationEvidence {
  readonly current: boolean;
  readonly telemetryMatched: boolean;
}

interface BenchmarkTelemetryWindow {
  readonly before: readonly Record<string, unknown>[];
  readonly after: readonly Record<string, unknown>[];
  readonly command: DaemonCommandName;
}

export class BenchmarkInvocationTelemetry {
  static complete(windows: readonly BenchmarkTelemetryWindow[]): boolean {
    return windows.every((window) => this.matches(window));
  }

  static matches(window: BenchmarkTelemetryWindow): boolean {
    const appended = window.after.slice(window.before.length);
    return (
      window.after.length === window.before.length + 1 &&
      appended[0]?.command === window.command &&
      appended[0]?.executionMode === "warm"
    );
  }
}

export class BenchmarkSampleEvidence {
  static semanticResultsValid(samples: readonly BenchmarkSampleEvidence[]): boolean {
    return samples.every((sample) => sample.nonEmpty);
  }

  static telemetryMatched(
    before: readonly Record<string, unknown>[],
    after: readonly Record<string, unknown>[],
    command: DaemonCommandName,
  ): boolean {
    return BenchmarkInvocationTelemetry.matches({ before, after, command });
  }

  static from(
    command: keyof GeneratedDaemonWorkspace["commands"],
    repetition: number,
    cold: RunSymnavBinaryResult,
    warm: RunSymnavBinaryResult,
    wallMs: number,
    benchmark: DaemonBenchmarkCommand,
    telemetryMatched = true,
  ): BenchmarkSampleEvidence {
    return {
      command,
      repetition,
      serviceMsExcludingQueue: wallMs,
      queueWaitMs: 0,
      stdoutDigest: this.digest(warm.stdout),
      stderrDigest: this.digest(warm.stderr),
      exitCode: warm.status ?? 1,
      responseBytes: Buffer.byteLength(warm.stdout) + Buffer.byteLength(warm.stderr),
      processRssPeakBytes: 0,
      spoolPeakBytes: 0,
      freshnessMs: 0,
      navigationMs: 0,
      renderMs: 0,
      workerOutputMs: 0,
      spoolMs: 0,
      stdoutParity: cold.stdout === warm.stdout,
      stderrParity: cold.stderr === warm.stderr,
      exitParity: cold.status === warm.status,
      nonEmpty:
        !benchmark.expectNonEmpty ||
        (warm.status === 0 &&
          warm.stdout.trim().length > 0 &&
          DaemonBenchmarkSemanticResult.matches(benchmark.expectation, warm.stdout)),
      diagnosticMatched: false,
      telemetryMatched,
    };
  }

  private static digest(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }
}

export class DaemonBenchmarkSemanticResult {
  static matches(
    expectation: DaemonBenchmarkResultExpectation | undefined,
    stdout: string,
  ): boolean {
    if (expectation === undefined) return stdout.trim().length > 0;
    let result: Record<string, unknown>;
    try {
      const parsed = JSON.parse(stdout) as unknown;
      if (!this.isRecord(parsed)) return false;
      result = parsed;
    } catch {
      return false;
    }
    if (expectation.kind === "overview") {
      return this.arrayLength(result.entries) === expectation.symbols;
    }
    if (expectation.kind === "resolve" || expectation.kind === "definition") {
      return this.arrayLength(result.symbols) === expectation.symbols;
    }
    if (expectation.kind === "references") return result.total === expectation.total;
    if (expectation.kind === "context") {
      return (
        this.edgeCount(result.callers) === expectation.callers &&
        this.edgeCount(result.callees) === expectation.callees &&
        this.arrayLength(result.history) === expectation.history
      );
    }
    if (expectation.kind === "graph") {
      return (
        this.pathCount(result.incoming) === expectation.incomingPaths &&
        this.pathCount(result.outgoing) === expectation.outgoingPaths
      );
    }
    return (
      typeof result.totalEvents === "number" &&
      Array.isArray(result.perCommand) &&
      Array.isArray(result.outcomes) &&
      this.isRecord(result.duration)
    );
  }

  private static edgeCount(value: unknown): number {
    if (!this.isRecord(value)) return -1;
    const visible = this.arrayLength(value.sortedEdges);
    const omitted = value.omittedCertainEdgeCount;
    return visible < 0 || typeof omitted !== "number" ? -1 : visible + omitted;
  }

  private static pathCount(value: unknown): number {
    if (!this.isRecord(value) || typeof value.totalPathCount !== "number") return -1;
    return value.totalPathCount;
  }

  private static arrayLength(value: unknown): number {
    return Array.isArray(value) ? value.length : -1;
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
}

interface OperationMetrics {
  readonly requestId: string;
  readonly command: string;
  readonly queueWaitMs: number;
  readonly serviceMs: number;
  readonly processRssPeakBytes: number;
  readonly workerHeapPeakBytes?: number;
  readonly spoolBytes: number;
  readonly freshnessMs: number;
  readonly navigationMs: number;
  readonly renderMs: number;
  readonly workerOutputMs: number;
  readonly spoolMs: number;
  readonly complete: boolean;
}

export class DaemonBenchmarkDiagnostics {
  private constructor(
    private readonly operationMetrics: readonly OperationMetrics[],
    readonly restartCount: number,
    readonly capacityResultCount: number,
    readonly rawRuntimeFailureCount: number,
    readonly processRssPeakBytes: number,
    readonly workerHeapPeakBytes: number | undefined,
    readonly spoolPeakBytes: number,
    readonly phasesComplete: boolean,
    readonly startupDurations: {
      readonly discoveryMs: number;
      readonly indexingMs: number;
      readonly totalMs: number;
    },
    private readonly uncorrelatedOperationEventCount: number,
  ) {}

  static read(logPath: string, cursor = 0): DaemonBenchmarkDiagnostics {
    const allEvents = existsSync(logPath)
      ? readFileSync(logPath, "utf8")
          .split("\\n")
          .filter((line) => line.length > 0)
          .map((line) => JSON.parse(line) as Record<string, unknown>)
      : [];
    const events = allEvents.slice(cursor);
    const accepted = events.filter((event) => event.kind === "request-accepted");
    const acceptedRequestIds = new Set(accepted.map((event) => String(event.requestId)));
    const operationKinds = new Set([
      "turn-started",
      "worker-completed",
      "response-spooled",
      "execution-terminal",
      "delivery-terminal",
    ]);
    const uncorrelatedOperationEventCount = events.filter(
      (event) =>
        operationKinds.has(String(event.kind)) && !acceptedRequestIds.has(String(event.requestId)),
    ).length;
    const operationMetrics = accepted.map((acceptedEvent) => {
      const requestId = String(acceptedEvent.requestId);
      const requestEvents = events.filter((event) => String(event.requestId) === requestId);
      const acceptedEvents = requestEvents.filter((event) => event.kind === "request-accepted");
      const turns = requestEvents.filter((event) => event.kind === "turn-started");
      const workers = requestEvents.filter((event) => event.kind === "worker-completed");
      const spools = requestEvents.filter((event) => event.kind === "response-spooled");
      const terminals = requestEvents.filter((event) => event.kind === "execution-terminal");
      const deliveries = requestEvents.filter((event) => event.kind === "delivery-terminal");
      const turn = turns[0];
      const spool = spools[0];
      const terminal = terminals[0];
      const worker = workers[0];
      return {
        requestId,
        command: String(acceptedEvent.command),
        queueWaitMs: Number(turn?.queueWaitMs ?? 0),
        serviceMs: Number(terminal?.serviceMs ?? 0),
        processRssPeakBytes: Number(
          terminal?.peakProcessRssBytes ?? terminal?.processRssBytes ?? 0,
        ),
        ...(terminal?.peakWorkerHeapUsedBytes === undefined
          ? {}
          : { workerHeapPeakBytes: Number(terminal.peakWorkerHeapUsedBytes) }),
        spoolBytes: Math.max(Number(terminal?.spoolBytes ?? 0), Number(spool?.rawBytes ?? 0)),
        freshnessMs: Number(worker?.freshnessMs ?? 0),
        navigationMs: Number(worker?.navigationMs ?? 0),
        renderMs: Number(worker?.renderMs ?? 0),
        workerOutputMs: Number(worker?.workerOutputMs ?? 0),
        spoolMs: Number(spool?.spoolMs ?? 0),
        complete:
          acceptedEvents.length === 1 &&
          turns.length === 1 &&
          workers.length === 1 &&
          spools.length === 1 &&
          terminals.length === 1 &&
          deliveries.length === 1 &&
          terminals[0]?.outcome === "completed" &&
          deliveries[0]?.outcome === "delivered",
      };
    });
    const phases = new Set(events.map((event) => String(event.kind)));
    const startup = allEvents.filter((event) => event.kind === "startup-completed");
    const startupEvent = startup[0];
    return new DaemonBenchmarkDiagnostics(
      operationMetrics,
      events.filter((event) => event.kind === "worker-replaced").length,
      events.filter((event) => event.failureCode === "response-capacity").length,
      events.filter((event) => event.kind === "process-termination").length,
      Math.max(0, ...operationMetrics.map((metric) => metric.processRssPeakBytes)),
      DaemonBenchmarkDiagnostics.maximumOptional(
        operationMetrics.map((metric) => metric.workerHeapPeakBytes),
      ),
      Math.max(0, ...operationMetrics.map((metric) => metric.spoolBytes)),
      [
        "startup-completed",
        "request-accepted",
        "turn-started",
        "worker-completed",
        "response-spooled",
        "execution-terminal",
        "delivery-terminal",
      ].every((phase) => phases.has(phase)) && startup.length === 1,
      {
        discoveryMs: Number(startupEvent?.discoveryMs ?? 0),
        indexingMs: Number(startupEvent?.indexingMs ?? 0),
        totalMs: Number(startupEvent?.totalMs ?? 0),
      },
      uncorrelatedOperationEventCount,
    );
  }

  static startupProbeComplete(logPath: string): boolean {
    if (!existsSync(logPath)) return false;
    const events = readFileSync(logPath, "utf8")
      .split("\\n")
      .filter((line) => line.length > 0)
      .map((line) => JSON.parse(line) as Record<string, unknown>);
    const versionRequests = new Set(
      events
        .filter((event) => event.kind === "request-accepted" && event.command === "version")
        .map((event) => String(event.requestId)),
    );
    return (
      events.some((event) => event.kind === "startup-completed") &&
      events.some(
        (event) =>
          event.kind === "delivery-terminal" &&
          event.outcome === "delivered" &&
          versionRequests.has(String(event.requestId)),
      )
    );
  }

  static eventCount(logPath: string): number {
    if (!existsSync(logPath)) return 0;
    return readFileSync(logPath, "utf8")
      .split("\\n")
      .filter((line) => line.length > 0).length;
  }

  enrich(samples: readonly BenchmarkSampleEvidence[]): BenchmarkSampleEvidence[] {
    return samples.map((sample, index) => {
      const metric = this.operationMetrics[index];
      if (metric === undefined || metric.command !== sample.command || !metric.complete)
        return sample;
      return {
        ...sample,
        serviceMsExcludingQueue: metric!.serviceMs,
        queueWaitMs: metric!.queueWaitMs,
        processRssPeakBytes: metric!.processRssPeakBytes,
        ...(metric!.workerHeapPeakBytes === undefined
          ? {}
          : { workerHeapPeakBytes: metric!.workerHeapPeakBytes }),
        spoolPeakBytes: metric!.spoolBytes,
        freshnessMs: metric!.freshnessMs,
        navigationMs: metric!.navigationMs,
        renderMs: metric!.renderMs,
        workerOutputMs: metric!.workerOutputMs,
        spoolMs: metric!.spoolMs,
        diagnosticMatched: true,
      };
    });
  }

  complete(samples: readonly BenchmarkSampleEvidence[]): boolean {
    return (
      this.uncorrelatedOperationEventCount === 0 &&
      this.operationMetrics.length === samples.length &&
      this.operationMetrics.every((metric) => metric.complete) &&
      samples.every((sample) => sample.diagnosticMatched)
    );
  }

  ready(expectedOperations: number): boolean {
    return (
      this.uncorrelatedOperationEventCount === 0 &&
      this.operationMetrics.length === expectedOperations &&
      this.operationMetrics.every((metric) => metric.complete)
    );
  }

  private static maximumOptional(values: readonly (number | undefined)[]): number | undefined {
    const present = values.filter((value): value is number => value !== undefined);
    return present.length === 0 ? undefined : Math.max(...present);
  }
}

export interface DaemonBenchmarkDurationStatistics {
  readonly minimumMs: number;
  readonly p50Ms: number;
  readonly p95Ms: number;
  readonly maximumMs: number;
}

export interface DaemonBenchmarkCommandPhaseStatistics {
  readonly freshness: DaemonBenchmarkDurationStatistics;
  readonly navigation: DaemonBenchmarkDurationStatistics;
  readonly render: DaemonBenchmarkDurationStatistics;
  readonly workerOutput: DaemonBenchmarkDurationStatistics;
  readonly spool: DaemonBenchmarkDurationStatistics;
}

export class DaemonBenchmarkPhaseStatistics {
  static from(
    samples: readonly BenchmarkSampleEvidence[],
  ): Readonly<Record<string, DaemonBenchmarkCommandPhaseStatistics>> {
    const statistics: Record<string, DaemonBenchmarkCommandPhaseStatistics> = {};
    for (const command of new Set(samples.map((sample) => sample.command))) {
      const commandSamples = samples.filter((sample) => sample.command === command);
      statistics[command] = {
        freshness: this.distribution(commandSamples.map((sample) => sample.freshnessMs)),
        navigation: this.distribution(commandSamples.map((sample) => sample.navigationMs)),
        render: this.distribution(commandSamples.map((sample) => sample.renderMs)),
        workerOutput: this.distribution(commandSamples.map((sample) => sample.workerOutputMs)),
        spool: this.distribution(commandSamples.map((sample) => sample.spoolMs)),
      };
    }
    return statistics;
  }

  static startup(durations: {
    readonly discoveryMs: number;
    readonly indexingMs: number;
    readonly totalMs: number;
  }): Readonly<Record<string, DaemonBenchmarkDurationStatistics>> {
    return {
      discovery: this.distribution([durations.discoveryMs]),
      indexing: this.distribution([durations.indexingMs]),
      total: this.distribution([durations.totalMs]),
    };
  }

  private static distribution(values: readonly number[]): DaemonBenchmarkDurationStatistics {
    const ordered = [...values].sort((left, right) => left - right);
    return {
      minimumMs: ordered[0]!,
      p50Ms: ordered[Math.ceil(ordered.length * 0.5) - 1]!,
      p95Ms: ordered[Math.ceil(ordered.length * 0.95) - 1]!,
      maximumMs: ordered.at(-1)!,
    };
  }
}
`}},pr:{body:`## Context

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
`,commits:[{sha:"d7c3ceef736d99e7999854918bf838ea96dadb4c",subject:"Specify resource and output policy slices",body:""},{sha:"8dca047390daa99cfca5eea55fe109189503f085",subject:"Route resource and output policy",body:""},{sha:"5830598f2c751ad58f3ab0fe591f9542772c837a",subject:"Specify lifecycle and diagnostic policy slices",body:""},{sha:"bb0205972fe1b7c85ab1fe039fc28a1dfc159211",subject:"Route lifecycle and diagnostic policy",body:""},{sha:"3f673305d9096cc847bdedda44d0de67e8c6727c",subject:"Specify distinct daemon deadlines and attempts",body:""},{sha:"b100221db48754656328391b878299c5a0bab443",subject:"Preserve distinct daemon attempt limits",body:""}],number:131,title:"Route daemon thresholds through centralized policy",base:"agent/daemon-architecture-refactor-part-07-daemon-package-policy-snapshot",head:"agent/daemon-architecture-refactor-part-08-daemon-policy-consumers"},inventory:[{added:57,deleted:6,path:"apps/cli/src/cli-program-executor.test.ts"},{added:3,deleted:2,path:"apps/cli/src/cli-program-executor.ts"},{added:20,deleted:15,path:"apps/cli/src/command-execution-result.ts"},{added:21,deleted:5,path:"apps/cli/src/commands/daemon/register-daemon-command.ts"},{added:72,deleted:17,path:"apps/cli/src/daemon/completion-spool.test.ts"},{added:15,deleted:18,path:"apps/cli/src/daemon/completion-spool.ts"},{added:2,deleted:2,path:"apps/cli/src/daemon/daemon-command-dispatcher.integration.test.ts"},{added:4,deleted:3,path:"apps/cli/src/daemon/daemon-command-dispatcher.ts"},{added:2,deleted:3,path:"apps/cli/src/daemon/daemon-controller.test.ts"},{added:16,deleted:8,path:"apps/cli/src/daemon/daemon-controller.ts"},{added:5,deleted:8,path:"apps/cli/src/daemon/daemon-entry.ts"},{added:18,deleted:8,path:"apps/cli/src/daemon/daemon-lifetime.test.ts"},{added:5,deleted:3,path:"apps/cli/src/daemon/daemon-lifetime.ts"},{added:66,deleted:3,path:"apps/cli/src/daemon/daemon-logger.test.ts"},{added:10,deleted:10,path:"apps/cli/src/daemon/daemon-logger.ts"},{added:9,deleted:4,path:"apps/cli/src/daemon/daemon-navigation-worker-entry.ts"},{added:7,deleted:3,path:"apps/cli/src/daemon/daemon-navigation-worker-protocol.test.ts"},{added:2,deleted:3,path:"apps/cli/src/daemon/daemon-navigation-worker-protocol.ts"},{added:6,deleted:2,path:"apps/cli/src/daemon/daemon-navigation-worker.ts"},{added:9,deleted:6,path:"apps/cli/src/daemon/daemon-process-launcher.ts"},{added:2,deleted:2,path:"apps/cli/src/daemon/daemon-registry.test.ts"},{added:15,deleted:7,path:"apps/cli/src/daemon/daemon-registry.ts"},{added:66,deleted:91,path:"apps/cli/src/daemon/daemon-resource-monitor.test.ts"},{added:6,deleted:62,path:"apps/cli/src/daemon/daemon-resource-monitor.ts"},{added:4,deleted:4,path:"apps/cli/src/daemon/daemon-result-chunk-codec.test.ts"},{added:21,deleted:13,path:"apps/cli/src/daemon/daemon-result-chunk-codec.ts"},{added:57,deleted:30,path:"apps/cli/src/daemon/daemon-startup-coordinator.test.ts"},{added:26,deleted:22,path:"apps/cli/src/daemon/daemon-startup-coordinator.ts"},{added:115,deleted:40,path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts"},{added:115,deleted:1,path:"apps/cli/src/daemon/local-daemon-transport-validation.test.ts"},{added:1,deleted:1,path:"apps/cli/src/daemon/local-daemon-transport.test.ts"},{added:60,deleted:37,path:"apps/cli/src/daemon/local-daemon-transport.ts"},{added:17,deleted:6,path:"apps/cli/src/daemon/workspace-daemon-requests.test.ts"},{added:6,deleted:5,path:"apps/cli/src/daemon/workspace-daemon.test.ts"},{added:27,deleted:51,path:"apps/cli/src/daemon/workspace-daemon.ts"},{added:3,deleted:3,path:"apps/cli/test/benchmark/daemon-scale-benchmark-harness.ts"},{added:7,deleted:8,path:"apps/cli/test/e2e/daemon/diagnostic-output.test.ts"},{added:2,deleted:2,path:"apps/cli/test/e2e/daemon/parity.test.ts"},{added:2,deleted:2,path:"apps/cli/test/e2e/daemon/persistent-pressure.test.ts"},{added:1,deleted:1,path:"apps/cli/test/e2e/daemon/state-isolation.test.ts"},{added:3,deleted:2,path:"apps/cli/test/e2e/daemon/status.test.ts"},{added:2,deleted:2,path:"apps/cli/test/e2e/daemon/stop.test.ts"},{added:1,deleted:1,path:"apps/cli/test/helpers/daemon-accepted-caller.ts"},{added:46,deleted:0,path:"apps/cli/test/helpers/daemon-controller.ts"},{added:1,deleted:1,path:"apps/cli/test/helpers/daemon-live-silent.ts"},{added:1,deleted:1,path:"apps/cli/test/helpers/daemon-malformed-activity.ts"},{added:24,deleted:0,path:"apps/cli/test/helpers/daemon-process-terminator.ts"},{added:1,deleted:1,path:"apps/cli/test/helpers/daemon-registry-cleaner.ts"},{added:22,deleted:0,path:"apps/cli/test/helpers/daemon-registry.ts"},{added:34,deleted:0,path:"apps/cli/test/helpers/daemon-resource-policy.ts"},{added:3,deleted:3,path:"apps/cli/test/helpers/daemon-startup-caller-exit.ts"},{added:48,deleted:0,path:"apps/cli/test/helpers/daemon-startup-coordinator.ts"},{added:1,deleted:1,path:"apps/cli/test/helpers/daemon-startup-mutation-owner.ts"},{added:1,deleted:1,path:"apps/cli/test/helpers/daemon-startup-publisher.ts"},{added:3,deleted:5,path:"apps/cli/test/helpers/e2e-process-cleanup.ts"},{added:64,deleted:0,path:"apps/cli/test/helpers/local-daemon-transport.ts"},{added:4,deleted:4,path:"apps/cli/test/helpers/workspace-daemon-persistent-pressure.ts"},{added:4,deleted:4,path:"apps/cli/test/helpers/workspace-daemon-stuck.ts"},{added:99,deleted:0,path:"apps/cli/test/helpers/workspace-daemon.ts"},{added:34,deleted:1,path:"meta-tests/src/daemon-package.test.ts"}]};var Rr={fixture:"Ten ASCII bytes; head output policy chunk=4, inline=8, result=12, aggregate=24. Base has local defaults. Actual source methods bundled with esbuild; no daemon or socket run.",pins:{base:"b3a6c4fa5dcf96223765aa147a9e094cd4a51b0e",head:"b100221db48754656328391b878299c5a0bab443"},builds:{base:{recordBytes:[10],decoded:"abcdefghij",messages:[{size:4,codec:"accepted",worker:"accepted"},{size:5,codec:"accepted",worker:"accepted"}]},head:{recordBytes:[4,4,2],decoded:"abcdefghij",messages:[{size:4,codec:"accepted",worker:"accepted"},{size:5,codec:"Invalid daemon result chunk",worker:"Invalid daemon navigation worker response"}]}}};var v=e=>document.querySelector(e),on=e=>[...document.querySelectorAll(e)],D=e=>String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),De={capacity:"#a57521",time:"#257c80",memory:"#756297",recovery:"#b25a43"},Pn=["surface","wiring","source"],Re=y.rows.map(e=>e.id),oe=y.slices.map(e=>e.id),Ie=new Map(y.fields.map(e=>[e.id,e])),Er=new Map(y.cells.map(e=>[e.id,e])),T=z(oe,[194,1062]).paddingInner(.035),re=z(Re,[95,663]).paddingInner(.065),Ir=new Map(y.slices.map(e=>[e.id,z(y.fields.filter(n=>n.slice===e.id).map(n=>n.id),[T(e.id)+13,T(e.id)+T.bandwidth()-13]).paddingInner(.17)])),Sr=y.rows.flatMap(e=>y.slices.map(n=>Er.get(e.id+":"+n.id)||{id:e.id+":"+n.id,row:e.id,slice:n.id,empty:!0,fields:[]})),h={row:"capture",slice:"output",depth:"surface",thread:"all",note:""},Tr,R=X("#loom"),Tn=e=>re(e)+re.bandwidth()*.42,Y=e=>Ir.get(e.slice)(e.id)+Ir.get(e.slice).bandwidth()/2;function Pr(){return h.thread==="all"?new Set(y.fields.map(e=>e.id)):h.thread==="chunk"?new Set(["output.maximumChunkRawBytes"]):h.thread==="equal"?new Set(y.fields.filter(e=>e.value==="250 ms").map(e=>e.id)):h.thread==="budgets"?new Set(y.fields.filter(e=>e.slice==="delivery").map(e=>e.id)):new Set([h.thread])}function $s(){return new URLSearchParams({...h}).toString()}function I(e,n=!1){h={...h,...e},!("note"in e)&&(e.row||e.slice)&&(h.note=""),history.pushState(null,"","#"+$s()),sn(),n&&Br()}function Bn(){let e=new URLSearchParams(location.hash.slice(1));h={row:Re.includes(e.get("row"))?e.get("row"):"capture",slice:oe.includes(e.get("slice"))?e.get("slice"):"output",depth:Pn.includes(e.get("depth"))?e.get("depth"):"surface",thread:["all","chunk","equal","budgets"].includes(e.get("thread"))||Ie.has(e.get("thread"))?e.get("thread"):"all",note:y.notes.some(n=>n.id===e.get("note"))?e.get("note"):""}}function Br(){let e=document.getElementById("cell-"+h.row+"-"+h.slice);e.focus({preventScroll:!0});let n=v(".cloth-scroll"),t=e.getBoundingClientRect(),r=n.getBoundingClientRect();t.left<r.left+8&&(n.scrollLeft-=r.left+8-t.left),t.right>r.right-8&&(n.scrollLeft+=t.right-r.right+8)}function Ks(e,n){I({row:Re[Math.max(0,Math.min(6,Re.indexOf(h.row)+n))],slice:oe[Math.max(0,Math.min(6,oe.indexOf(h.slice)+e))]},!0)}function zs(){R.append("title").text("The policy reading loom"),R.append("desc").text("Rows are seven consumer families; columns are seven policy slices. Individual vertical strands represent traced policy leaves. Circles repeat across families; diamonds occur in one family. Heavy ties read required values; light ties forward policy. Dashed cell rims link to visible rationale gaps.");let e=R.append("g").attr("role","row");e.append("text").attr("x",13).attr("y",31).attr("class","source-label").text("MECHANISMS / apps/cli"),e.selectAll("g.column").data(y.slices).join("g").attr("class","column").attr("role","columnheader").each(function(o,s){let a=X(this),i=T(o.id)+T.bandwidth()/2;a.append("text").attr("x",i).attr("y",26).attr("class","column-number").text(String(s+1).padStart(2,"0")),a.append("text").attr("x",i).attr("y",49).attr("class","column-label").text(o.name),a.append("line").attr("x1",T(o.id)+8).attr("x2",T(o.id)+T.bandwidth()-8).attr("y1",66).attr("y2",66).attr("class","column-cap")}),R.append("g").attr("class","selection-bands").selectAll("rect").data(Sr).join("rect").attr("class","cell-bg").attr("data-id",o=>o.id).attr("x",o=>T(o.slice)+2).attr("y",o=>re(o.row)).attr("width",T.bandwidth()-4).attr("height",re.bandwidth()).attr("rx",5),R.append("g").attr("aria-hidden","true").selectAll("line.warp").data(y.fields).join("line").attr("class","warp").attr("x1",Y).attr("x2",Y).attr("y1",78).attr("y2",674).attr("stroke",o=>De[o.purpose]),R.append("g").attr("aria-hidden","true").selectAll("line.field-thread").data(y.fields).join("line").attr("class","field-thread").attr("x1",Y).attr("x2",Y).attr("y1",o=>Math.min(...o.rows.map(Tn))-17).attr("y2",o=>Math.max(...o.rows.map(Tn))+17).attr("stroke",o=>De[o.purpose]),R.append("g").selectAll("g.consumer").data(y.rows).join("g").attr("class","consumer").attr("role","row").attr("aria-rowindex",(o,s)=>s+2).each(function(o,s){let a=X(this),i=Tn(o.id);a.append("line").attr("x1",185).attr("x2",1063).attr("y1",i).attr("y2",i).attr("class","weft"),a.append("line").attr("x1",185).attr("x2",1063).attr("y1",i+5).attr("y2",i+5).attr("class","weft-fine");let d=a.append("g").attr("role","rowheader");d.append("text").attr("x",12).attr("y",i-10).attr("class","row-number").text(String(s+1).padStart(2,"0")),d.append("text").attr("x",37).attr("y",i-10).attr("class","row-label").text(o.name),d.append("text").attr("x",37).attr("y",i+10).attr("class","row-sub").text(o.sub);let u=a.selectAll("g.crossing").data(Sr.filter(c=>c.row===o.id)).join("g").attr("class","crossing").attr("id",c=>"cell-"+c.row+"-"+c.slice).attr("role","gridcell").attr("aria-colindex",c=>oe.indexOf(c.slice)+2);u.each(function(c){let l=X(this),p=T(c.slice),m=T.bandwidth(),w=re.bandwidth();if(l.append("title").text(c.empty?`${o.name} \xD7 ${c.slice}: no traced route`:`${o.name} \xD7 ${c.slice}: ${c.summary}`),l.append("rect").attr("class","cell-target").attr("x",p+2).attr("y",re(c.row)).attr("width",m-4).attr("height",w).attr("rx",5).attr("fill","transparent"),c.empty){l.append("text").attr("x",p+m/2).attr("y",i+27).attr("class","empty-label").text("\u2014");return}l.append("rect").attr("class","contract-rim"+(c.gap?" has-gap":"")).attr("x",p+6).attr("y",i-20).attr("width",m-12).attr("height",39).attr("rx",3),l.append("text").attr("class","cell-label").attr("x",p+m/2).attr("y",i+34).text(c.label),c.gap&&l.append("text").attr("x",p+m-7).attr("y",i-22).attr("class","gap-label").text("U");let g=l.selectAll("g.knot").data(c.fields.map(f=>Ie.get(f))).join("g").attr("class","knot");g.append("line").attr("x1",Y).attr("x2",Y).attr("y1",i-13).attr("y2",i+13).attr("stroke",f=>De[f.purpose]).attr("stroke-width",f=>f.forward.includes(c.row)?2:6).attr("stroke-linecap","round"),g.append("path").attr("d",f=>rn(f.rows.length>1?be:Sn,f.rows.length>1?49:47)()).attr("transform",f=>`translate(${Y(f)},${i})`).attr("fill","#fbf8ee").attr("stroke",f=>De[f.purpose]).attr("stroke-width",1.8),g.append("title").text(f=>`${f.id} \xB7 ${f.value} \xB7 ${f.forward.includes(c.row)?"forwarded":"read here"} \xB7 ${f.rows.length>1?"shared across "+f.rows.length+" drawn families":"one drawn family"}`),g.on("click",(f,A)=>{f.stopPropagation(),I({row:c.row,slice:c.slice,thread:A.id},!0)})}),u.on("click",(c,l)=>I({row:l.row,slice:l.slice},!0)).on("keydown",(c,l)=>{if(c.key==="Enter"||c.key===" "){c.preventDefault(),I({row:l.row,slice:l.slice}),v("#inspector").focus({preventScroll:!0});return}let p={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};p[c.key]&&(c.preventDefault(),Ks(...p[c.key])),(c.key==="PageDown"||c.key==="PageUp")&&(c.preventDefault(),I({depth:Pn[Math.max(0,Math.min(2,Pn.indexOf(h.depth)+(c.key==="PageDown"?1:-1)))]},!0)),c.key==="Escape"&&(c.preventDefault(),I({depth:"surface",thread:"all",note:""},!0))})})}function Ys(e){return`<div class="receipt-list">${e.map(n=>{let t=y.receipts[n],r=y.sources[t.source];return`<a href="evidence.html#${n}" data-receipt="${n}"><span>${D(n.replaceAll("-"," "))}</span><small>${D(r.revision)} \xB7 ${D(r.path.split("/").at(-1))}:${t.start}</small><b>\u2197</b></a>`}).join("")}</div>`}function Cr(e){return`<div class="leaf-list">${e.fields.map(n=>{let t=Ie.get(n);return`<button class="leaf ${Pr().has(n)&&h.thread!=="all"?"chosen":""}" data-leaf="${n}"><span class="leaf-symbol" style="color:${De[t.purpose]}">${t.rows.length>1?"\u25CB":"\u25C7"}</span><span>${D(t.label)}<small>${t.forward.includes(e.row)?"forwarded \xB7 ":""}${D(t.leaf)}</small></span><b>${D(t.value)}</b></button>`}).join("")}</div>`}function Js(){return`<div class="probe"><p class="eyebrow">RECORDED / ACTUAL SOURCE METHODS</p><h4>Ten bytes through a 4-byte policy.</h4><p class="probe-limit">Controlled fixture: head chunk 4, inline 8, result 12, aggregate 24 bytes. Base uses its local defaults. No daemon run.</p>${["base","head"].map(e=>`<div class="probe-build"><span>${e}</span><div class="probe-records">${Rr.builds[e].recordBytes.map(n=>`<i style="flex:${n}">${n}</i>`).join("")}</div><b>10 B</b></div>`).join("")}<p>Five-byte message \xB7 codec / worker validator</p><div class="probe-verdict"><span>BASE <b>accepted / accepted</b></span><span>HEAD <b>capacity error / invalid response</b></span></div><p class="probe-limit">Record widths encode byte counts. The page replays saved observations; it does not change runtime policy.</p><a href="evidence/probe.json">Raw observations \u2197</a></div>`}function Qs(){let e=y.rows.find(r=>r.id===h.row),n=Er.get(h.row+":"+h.slice),t=`<p class="coordinate">${String(Re.indexOf(h.row)+1).padStart(2,"0")} \xD7 ${String(oe.indexOf(h.slice)+1).padStart(2,"0")} <span>/ ${D(h.depth)}</span></p><h3>${D(e.name)}<span>\xD7 ${D(h.slice)}</span></h3>`;if(!n)t+='<div class="empty-state"><span>\xD7</span><h4>No route drawn here.</h4><p>This family has no traced use of this slice in the curated inventory. Empty space is not proof of an absent transitive dependency.</p></div>';else{t+=`<p class="cell-summary">${D(n.summary)}</p>`;let r=h.note?y.notes.find(o=>o.id===h.note):null;r&&(t+=`<div class="selected-note"><span class="state ${r.state}">${r.state==="stated"?"S \xB7 Stated":"U \xB7 Unexplained"} / ${r.id}</span><h4>${D(r.title)}</h4><p>${D(r.text)}</p><p class="reason">${D(r.reason)}</p><a href="#reading-${r.id}">Return to open reading ${r.id} \u2191</a></div>`),h.depth==="surface"&&(t+=Cr(n)),h.depth==="wiring"&&(t+=`<ol class="steps">${n.mechanism.map(o=>`<li>${D(o)}</li>`).join("")}</ol>`,n.slice==="output"&&["capture","spool","socket","worker"].includes(n.row)&&(t+=Js()),t+=Cr(n)),h.depth==="source"&&(t+='<p class="evidence-limit">Pinned source, with exact line ranges. Test files are evidence of test content; these suites were not run here.</p>'+Ys([...new Set([...r?r.refs:[],...n.refs,"record","policy","defaults","validation","spec"])])),t+=`<div class="related-readings"><span class="eyebrow">SURFACE READINGS</span>${[...new Set([...n.notes,...y.notes.filter(o=>o.cell===n.id).map(o=>o.id)])].map(o=>{let s=y.notes.find(a=>a.id===o);return`<a href="#reading-${o}"><span>${o}</span>${D(s.title)} ${s.state==="unexplained"?"<b>U</b>":""}</a>`}).join("")}</div>`}v("#selection-content").innerHTML=t}function sn(){let e=Pr(),n=h.thread!=="all";R.selectAll(".cell-bg").classed("selected",o=>o.row===h.row&&o.slice===h.slice),R.selectAll(".crossing").attr("tabindex",o=>o.row===h.row&&o.slice===h.slice?0:-1).attr("aria-selected",o=>String(o.row===h.row&&o.slice===h.slice)).attr("aria-label",o=>`${y.rows.find(s=>s.id===o.row).name}, ${o.slice}. ${o.empty?"No traced route.":o.summary}`),R.selectAll(".column").classed("chosen-axis",o=>o.id===h.slice),R.selectAll(".consumer").classed("chosen-axis",o=>o.id===h.row),R.selectAll(".knot").style("opacity",o=>e.has(o.id)?1:.12),R.selectAll(".field-thread").style("stroke-width",o=>n&&e.has(o.id)?3:1.3).style("opacity",o=>n?e.has(o.id)?.85:.035:.18),R.selectAll(".warp").style("opacity",o=>n?e.has(o.id)?.23:.025:.075),R.selectAll(".contract-rim").style("opacity",o=>n&&!o.fields.some(s=>e.has(s))?.16:.9),R.selectAll(".cell-label,.gap-label").style("opacity",o=>n&&!o.fields.some(s=>e.has(s))?.34:1),on(".depths button").forEach(o=>o.setAttribute("aria-pressed",String(o.dataset.depth===h.depth))),on("[data-mode]").forEach(o=>o.setAttribute("aria-pressed",String(o.dataset.mode===h.thread))),v("#row-select").value=h.row,v("#slice-select").value=h.slice,v("#thread-select").value=Ie.has(h.thread)?h.thread:h.thread==="chunk"?"output.maximumChunkRawBytes":"all";let t={all:"Every vertical strand names a field. Read down for sharing; read across for a consumer\u2019s responsibilities.",chunk:"ONE FIELD / maximumChunkRawBytes \xB7 64 KiB \xB7 four reading families + one host handoff.",equal:"SAME NUMBER / Ordinary response \xB7 drain ACK grace \xB7 RSS sampling. Three 250 ms fields. Three separate strands.",budgets:"TWO SCOPES / 1 execution reattachment \xB7 1 fetch resume per execute attempt. Equal allowances do not combine their counters."},r=Ie.get(h.thread);v("#comparison-readout").textContent=r?`${r.id} / ${r.value} / ${r.rows.length} drawn ${r.rows.length===1?"family":"families"} \xB7 ${r.rows.map(o=>y.rows.find(s=>s.id===o).name).join(" \xB7 ")}`:t[h.thread],Qs()}function Xs(e,n){let t=y.receipts[e],r=y.sources[t.source],o=r.text.split(`
`);Tr=n,v("#source-revision").textContent=`${r.revision.toUpperCase()} / ${r.sha}`,v("#source-title").textContent=e.replaceAll("-"," "),v("#source-path").textContent=r.path+":"+t.start+"\u2013"+t.end;let s=(a,i)=>a.map((d,u)=>`<span${i+u===t.anchor?' class="source-anchor"':""}><b>${i+u}</b>${D(d)}</span>`).join("");v("#source-code").innerHTML=s(o.slice(t.start-1,t.end),t.start),v("#full-source-code").innerHTML=s(o,1),v("#full-source-details").open=!1,v("#source-links").innerHTML=`<a href="evidence.html#${e}">Standalone receipt</a> \xB7 <a href="https://github.com/mohasarc/symnav/blob/${r.sha}/${r.path}#L${t.start}" target="_blank" rel="noreferrer">Pinned GitHub source \u2197</a><small>SHA-256 ${r.sha256}</small>`,v("#source-dialog").showModal(),v("#source-dialog").scrollTop=0}zs();v("#row-select").innerHTML=y.rows.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");v("#slice-select").innerHTML=y.slices.map(e=>`<option value="${e.id}">${e.name}</option>`).join("");v("#thread-select").innerHTML+=[...y.slices].map(e=>`<optgroup label="${e.name}">${y.fields.filter(n=>n.slice===e.id).map(n=>`<option value="${n.id}">${n.label} \xB7 ${n.value}</option>`).join("")}</optgroup>`).join("");v("#row-select").onchange=e=>I({row:e.target.value});v("#slice-select").onchange=e=>I({slice:e.target.value});v("#thread-select").onchange=e=>I({thread:e.target.value});v("#clear-thread").onclick=()=>I({thread:"all"});on("[data-mode]").forEach(e=>e.onclick=()=>{let n=e.dataset.mode;I({thread:n,...n==="chunk"?{row:"capture",slice:"output"}:n==="equal"?{row:"socket",slice:"transport"}:n==="budgets"?{row:"socket",slice:"delivery"}:{}})});on("[data-depth]").forEach(e=>e.onclick=()=>I({depth:e.dataset.depth}));v("#surface-button").onclick=()=>I({depth:"surface",note:""});v("#locate-button").onclick=()=>{v("#loom-section").scrollIntoView(),Br()};for(let[e,n]of[["previous-cell",-1],["next-cell",1]])v("#"+e).onclick=()=>{let t=y.cells.findIndex(o=>o.id===h.row+":"+h.slice),r=y.cells[(t+n+y.cells.length)%y.cells.length];I({row:r.row,slice:r.slice})};document.addEventListener("click",e=>{let n=e.target.closest("[data-receipt]");if(n){e.preventDefault(),Xs(n.dataset.receipt,n);return}let t=e.target.closest("[data-leaf]");if(t){I({thread:t.dataset.leaf});return}let r=e.target.closest("[data-note]");if(r){e.preventDefault();let o=y.notes.find(i=>i.id===r.dataset.note),[s,a]=o.cell.split(":");I({row:s,slice:a,depth:"wiring",note:o.id}),v("#inspector").scrollIntoView({block:"start"}),v("#inspector").focus({preventScroll:!0})}});v("#close-source").onclick=()=>v("#source-dialog").close();v("#source-dialog").addEventListener("close",()=>Tr?.focus({preventScroll:!0}));window.addEventListener("popstate",()=>{location.hash.startsWith("#row=")&&(Bn(),sn())});window.addEventListener("hashchange",()=>{location.hash.startsWith("#row=")&&(Bn(),sn())});Bn();sn();})();
