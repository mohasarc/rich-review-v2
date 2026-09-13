(()=>{var vC=Object.create;var i0=Object.defineProperty;var xC=Object.getOwnPropertyDescriptor;var wC=Object.getOwnPropertyNames;var bC=Object.getPrototypeOf,kC=Object.prototype.hasOwnProperty;var On=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);var SC=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of wC(n))!kC.call(e,r)&&r!==t&&i0(e,r,{get:()=>n[r],enumerable:!(o=xC(n,r))||o.enumerable});return e};var Fr=(e,n,t)=>(t=e!=null?vC(bC(e)):{},SC(n||!e||!e.__esModule?i0(t,"default",{value:e,enumerable:!0}):t,e));var v0=On(ee=>{"use strict";var Vf=Symbol.for("react.transitional.element"),_C=Symbol.for("react.portal"),DC=Symbol.for("react.fragment"),EC=Symbol.for("react.strict_mode"),CC=Symbol.for("react.profiler"),TC=Symbol.for("react.consumer"),qC=Symbol.for("react.context"),RC=Symbol.for("react.forward_ref"),MC=Symbol.for("react.suspense"),AC=Symbol.for("react.memo"),u0=Symbol.for("react.lazy"),NC=Symbol.for("react.activity"),IC=Symbol.for("react.view_transition"),a0=Symbol.iterator;function OC(e){return e===null||typeof e!="object"?null:(e=a0&&e[a0]||e["@@iterator"],typeof e=="function"?e:null)}var d0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},f0=Object.assign,p0={};function Xi(e,n,t){this.props=e,this.context=n,this.refs=p0,this.updater=t||d0}Xi.prototype.isReactComponent={};Xi.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Xi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function m0(){}m0.prototype=Xi.prototype;function Uf(e,n,t){this.props=e,this.context=n,this.refs=p0,this.updater=t||d0}var Ff=Uf.prototype=new m0;Ff.constructor=Uf;f0(Ff,Xi.prototype);Ff.isPureReactComponent=!0;var s0=Array.isArray;function Hf(){}var Ce={H:null,A:null,T:null,S:null},h0=Object.prototype.hasOwnProperty;function Yf(e,n,t){var o=t.ref;return{$$typeof:Vf,type:e,key:n,ref:o!==void 0?o:null,props:t}}function zC(e,n){return Yf(e.type,n,e.props)}function Gf(e){return typeof e=="object"&&e!==null&&e.$$typeof===Vf}function BC(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var c0=/\/+/g;function jf(e,n){return typeof e=="object"&&e!==null&&e.key!=null?BC(""+e.key):n.toString(36)}function PC(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Hf,Hf):(e.status="pending",e.then(function(n){e.status==="pending"&&(e.status="fulfilled",e.value=n)},function(n){e.status==="pending"&&(e.status="rejected",e.reason=n)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Gi(e,n,t,o,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"bigint":case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case Vf:case _C:a=!0;break;case u0:return a=e._init,Gi(a(e._payload),n,t,o,r)}}if(a)return r=r(e),a=o===""?"."+jf(e,0):o,s0(r)?(t="",a!=null&&(t=a.replace(c0,"$&/")+"/"),Gi(r,n,t,"",function(l){return l})):r!=null&&(Gf(r)&&(r=zC(r,t+(r.key==null||e&&e.key===r.key?"":(""+r.key).replace(c0,"$&/")+"/")+a)),n.push(r)),1;a=0;var s=o===""?".":o+":";if(s0(e))for(var c=0;c<e.length;c++)o=e[c],i=s+jf(o,c),a+=Gi(o,n,t,i,r);else if(c=OC(e),typeof c=="function")for(e=c.call(e),c=0;!(o=e.next()).done;)o=o.value,i=s+jf(o,c++),a+=Gi(o,n,t,i,r);else if(i==="object"){if(typeof e.then=="function")return Gi(PC(e),n,t,o,r);throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}return a}function bl(e,n,t){if(e==null)return e;var o=[],r=0;return Gi(e,o,"","",function(i){return n.call(t,i,r++)}),o}function LC(e){if(e._status===-1){var n=e._result,t=n();t.then(function(o){(e._status===0||e._status===-1)&&(e._status=1,e._result=o,t.status===void 0&&(t.status="fulfilled",t.value=o))},function(o){(e._status===0||e._status===-1)&&(e._status=2,e._result=o,t.status===void 0&&(t.status="rejected",t.reason=o))}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var l0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function y0(e){var n=Ce.T,t={};t.types=n!==null?n.types:null,Ce.T=t;try{var o=e(),r=Ce.S;r!==null&&r(t,o),typeof o=="object"&&o!==null&&typeof o.then=="function"&&o.then(Hf,l0)}catch(i){l0(i)}finally{n!==null&&t.types!==null&&(n.types=t.types),Ce.T=n}}function g0(e){var n=Ce.T;if(n!==null){var t=n.types;t===null?n.types=[e]:t.indexOf(e)===-1&&t.push(e)}else y0(g0.bind(null,e))}var jC={map:bl,forEach:function(e,n,t){bl(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return bl(e,function(){n++}),n},toArray:function(e){return bl(e,function(n){return n})||[]},only:function(e){if(!Gf(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};ee.Activity=NC;ee.Children=jC;ee.Component=Xi;ee.Fragment=DC;ee.Profiler=CC;ee.PureComponent=Uf;ee.StrictMode=EC;ee.Suspense=MC;ee.ViewTransition=IC;ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ce;ee.__COMPILER_RUNTIME={__proto__:null,c:function(e){return Ce.H.useMemoCache(e)}};ee.addTransitionType=g0;ee.cache=function(e){return function(){return e.apply(null,arguments)}};ee.cacheSignal=function(){return null};ee.cloneElement=function(e,n,t){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var o=f0({},e.props),r=e.key;if(n!=null)for(i in n.key!==void 0&&(r=""+n.key),n)!h0.call(n,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&n.ref===void 0||(o[i]=n[i]);var i=arguments.length-2;if(i===1)o.children=t;else if(1<i){for(var a=Array(i),s=0;s<i;s++)a[s]=arguments[s+2];o.children=a}return Yf(e.type,r,o)};ee.createContext=function(e){return e={$$typeof:qC,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:TC,_context:e},e};ee.createElement=function(e,n,t){var o,r={},i=null;if(n!=null)for(o in n.key!==void 0&&(i=""+n.key),n)h0.call(n,o)&&o!=="key"&&o!=="__self"&&o!=="__source"&&(r[o]=n[o]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var s=Array(a),c=0;c<a;c++)s[c]=arguments[c+2];r.children=s}if(e&&e.defaultProps)for(o in a=e.defaultProps,a)r[o]===void 0&&(r[o]=a[o]);return Yf(e,i,r)};ee.createRef=function(){return{current:null}};ee.forwardRef=function(e){return{$$typeof:RC,render:e}};ee.isValidElement=Gf;ee.lazy=function(e){return{$$typeof:u0,_payload:{_status:-1,_result:e},_init:LC}};ee.memo=function(e,n){return{$$typeof:AC,type:e,compare:n===void 0?null:n}};ee.startTransition=y0;ee.unstable_useCacheRefresh=function(){return Ce.H.useCacheRefresh()};ee.use=function(e){return Ce.H.use(e)};ee.useActionState=function(e,n,t){return Ce.H.useActionState(e,n,t)};ee.useCallback=function(e,n){return Ce.H.useCallback(e,n)};ee.useContext=function(e){return Ce.H.useContext(e)};ee.useDebugValue=function(){};ee.useDeferredValue=function(e,n){return Ce.H.useDeferredValue(e,n)};ee.useEffect=function(e,n){return Ce.H.useEffect(e,n)};ee.useEffectEvent=function(e){return Ce.H.useEffectEvent(e)};ee.useId=function(){return Ce.H.useId()};ee.useImperativeHandle=function(e,n,t){return Ce.H.useImperativeHandle(e,n,t)};ee.useInsertionEffect=function(e,n){return Ce.H.useInsertionEffect(e,n)};ee.useLayoutEffect=function(e,n){return Ce.H.useLayoutEffect(e,n)};ee.useMemo=function(e,n){return Ce.H.useMemo(e,n)};ee.useOptimistic=function(e,n){return Ce.H.useOptimistic(e,n)};ee.useReducer=function(e,n,t){return Ce.H.useReducer(e,n,t)};ee.useRef=function(e){return Ce.H.useRef(e)};ee.useState=function(e){return Ce.H.useState(e)};ee.useSyncExternalStore=function(e,n,t){return Ce.H.useSyncExternalStore(e,n,t)};ee.useTransition=function(){return Ce.H.useTransition()};ee.version="19.3.0"});var Vo=On((r6,x0)=>{"use strict";x0.exports=v0()});var q0=On(Ae=>{"use strict";function Qf(e,n){var t=e.length;e.push(n);e:for(;0<t;){var o=t-1>>>1,r=e[o];if(0<kl(r,n))e[o]=n,e[t]=r,t=o;else break e}}function Vt(e){return e.length===0?null:e[0]}function _l(e){if(e.length===0)return null;var n=e[0],t=e.pop();if(t!==n){e[0]=t;e:for(var o=0,r=e.length,i=r>>>1;o<i;){var a=2*(o+1)-1,s=e[a],c=a+1,l=e[c];if(0>kl(s,t))c<r&&0>kl(l,s)?(e[o]=l,e[c]=t,o=c):(e[o]=s,e[a]=t,o=a);else if(c<r&&0>kl(l,t))e[o]=l,e[c]=t,o=c;else break e}}return n}function kl(e,n){var t=e.sortIndex-n.sortIndex;return t!==0?t:e.id-n.id}Ae.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(w0=performance,Ae.unstable_now=function(){return w0.now()}):(Xf=Date,b0=Xf.now(),Ae.unstable_now=function(){return Xf.now()-b0});var w0,Xf,b0,mo=[],Uo=[],HC=1,dt=null,xn=3,Wf=!1,ks=!1,Ss=!1,$f=!1,_0=typeof setTimeout=="function"?setTimeout:null,D0=typeof clearTimeout=="function"?clearTimeout:null,k0=typeof setImmediate<"u"?setImmediate:null;function Sl(e){for(var n=Vt(Uo);n!==null;){if(n.callback===null)_l(Uo);else if(n.startTime<=e)_l(Uo),n.sortIndex=n.expirationTime,Qf(mo,n);else break;n=Vt(Uo)}}function Jf(e){if(Ss=!1,Sl(e),!ks)if(Vt(mo)!==null)ks=!0,Zi||(Zi=!0,Ki());else{var n=Vt(Uo);n!==null&&ep(Jf,n.startTime-e)}}var Zi=!1,_s=-1,E0=5,C0=-1;function T0(){return $f?!0:!(Ae.unstable_now()-C0<E0)}function Kf(){if($f=!1,Zi){var e=Ae.unstable_now();C0=e;var n=!0;try{e:{ks=!1,Ss&&(Ss=!1,D0(_s),_s=-1),Wf=!0;var t=xn;try{n:{for(Sl(e),dt=Vt(mo);dt!==null&&!(dt.expirationTime>e&&T0());){var o=dt.callback;if(typeof o=="function"){dt.callback=null,xn=dt.priorityLevel;var r=o(dt.expirationTime<=e);if(e=Ae.unstable_now(),typeof r=="function"){dt.callback=r,Sl(e),n=!0;break n}dt===Vt(mo)&&_l(mo),Sl(e)}else _l(mo);dt=Vt(mo)}if(dt!==null)n=!0;else{var i=Vt(Uo);i!==null&&ep(Jf,i.startTime-e),n=!1}}break e}finally{dt=null,xn=t,Wf=!1}n=void 0}}finally{n?Ki():Zi=!1}}}var Ki;typeof k0=="function"?Ki=function(){k0(Kf)}:typeof MessageChannel<"u"?(Zf=new MessageChannel,S0=Zf.port2,Zf.port1.onmessage=Kf,Ki=function(){S0.postMessage(null)}):Ki=function(){_0(Kf,0)};var Zf,S0;function ep(e,n){_s=_0(function(){e(Ae.unstable_now())},n)}Ae.unstable_IdlePriority=5;Ae.unstable_ImmediatePriority=1;Ae.unstable_LowPriority=4;Ae.unstable_NormalPriority=3;Ae.unstable_Profiling=null;Ae.unstable_UserBlockingPriority=2;Ae.unstable_cancelCallback=function(e){e.callback=null};Ae.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E0=0<e?Math.floor(1e3/e):5};Ae.unstable_getCurrentPriorityLevel=function(){return xn};Ae.unstable_next=function(e){switch(xn){case 1:case 2:case 3:var n=3;break;default:n=xn}var t=xn;xn=n;try{return e()}finally{xn=t}};Ae.unstable_requestPaint=function(){$f=!0};Ae.unstable_runWithPriority=function(e,n){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var t=xn;xn=e;try{return n()}finally{xn=t}};Ae.unstable_scheduleCallback=function(e,n,t){var o=Ae.unstable_now();switch(typeof t=="object"&&t!==null?(t=t.delay,t=typeof t=="number"&&0<t?o+t:o):t=o,e){case 1:var r=-1;break;case 2:r=250;break;case 5:r=1073741823;break;case 4:r=1e4;break;default:r=5e3}return r=t+r,e={id:HC++,callback:n,priorityLevel:e,startTime:t,expirationTime:r,sortIndex:-1},t>o?(e.sortIndex=t,Qf(Uo,e),Vt(mo)===null&&e===Vt(Uo)&&(Ss?(D0(_s),_s=-1):Ss=!0,ep(Jf,t-o))):(e.sortIndex=r,Qf(mo,e),ks||Wf||(ks=!0,Zi||(Zi=!0,Ki()))),e};Ae.unstable_shouldYield=T0;Ae.unstable_wrapCallback=function(e){var n=xn;return function(){var t=xn;xn=n;try{return e.apply(this,arguments)}finally{xn=t}}}});var M0=On((a6,R0)=>{"use strict";R0.exports=q0()});var I0=On(wn=>{"use strict";var VC=Vo();function N0(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Fo(){}var Dn={d:{f:Fo,r:function(){throw Error(N0(522))},D:Fo,C:Fo,L:Fo,m:Fo,X:Fo,S:Fo,M:Fo},p:0,findDOMNode:null},UC=Symbol.for("react.portal"),FC=Symbol.for("react.recoverable"),A0=Symbol.for("react.optimistic_key");function YC(e,n,t){var o=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:UC,key:o==null?null:o===A0?A0:""+o,children:e,containerInfo:n,implementation:t}}var Ds=VC.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Dl(e,n){if(e==="font")return"";if(typeof n=="string")return n==="use-credentials"?n:""}wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Dn;wn.browser=function(e){return{$$typeof:FC,_reason:e}};wn.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)throw Error(N0(299));return YC(e,n,null,t)};wn.flushSync=function(e){var n=Ds.T,t=Dn.p;try{if(Ds.T=null,Dn.p=2,e)return e()}finally{Ds.T=n,Dn.p=t,Dn.d.f()}};wn.preconnect=function(e,n){typeof e=="string"&&(n?(n=n.crossOrigin,n=typeof n=="string"?n==="use-credentials"?n:"":void 0):n=null,Dn.d.C(e,n))};wn.prefetchDNS=function(e){typeof e=="string"&&Dn.d.D(e)};wn.preinit=function(e,n){if(typeof e=="string"&&n&&typeof n.as=="string"){var t=n.as,o=Dl(t,n.crossOrigin),r=typeof n.integrity=="string"?n.integrity:void 0,i=typeof n.fetchPriority=="string"?n.fetchPriority:void 0;t==="style"?Dn.d.S(e,typeof n.precedence=="string"?n.precedence:void 0,{crossOrigin:o,integrity:r,fetchPriority:i}):t==="script"&&Dn.d.X(e,{crossOrigin:o,integrity:r,fetchPriority:i,nonce:typeof n.nonce=="string"?n.nonce:void 0})}};wn.preinitModule=function(e,n){if(typeof e=="string")if(typeof n=="object"&&n!==null){if(n.as==null||n.as==="script"){var t=Dl(n.as,n.crossOrigin);Dn.d.M(e,{crossOrigin:t,integrity:typeof n.integrity=="string"?n.integrity:void 0,nonce:typeof n.nonce=="string"?n.nonce:void 0,fetchPriority:typeof n.fetchPriority=="string"?n.fetchPriority:void 0})}}else n==null&&Dn.d.M(e)};wn.preload=function(e,n){if(typeof e=="string"&&typeof n=="object"&&n!==null&&typeof n.as=="string"){var t=n.as,o=Dl(t,n.crossOrigin);Dn.d.L(e,t,{crossOrigin:o,integrity:typeof n.integrity=="string"?n.integrity:void 0,nonce:typeof n.nonce=="string"?n.nonce:void 0,type:typeof n.type=="string"?n.type:void 0,fetchPriority:typeof n.fetchPriority=="string"?n.fetchPriority:void 0,referrerPolicy:typeof n.referrerPolicy=="string"?n.referrerPolicy:void 0,imageSrcSet:typeof n.imageSrcSet=="string"?n.imageSrcSet:void 0,imageSizes:typeof n.imageSizes=="string"?n.imageSizes:void 0,media:typeof n.media=="string"?n.media:void 0})}};wn.preloadModule=function(e,n){if(typeof e=="string")if(n){var t=Dl(n.as,n.crossOrigin);Dn.d.m(e,{as:typeof n.as=="string"&&n.as!=="script"?n.as:void 0,crossOrigin:t,integrity:typeof n.integrity=="string"?n.integrity:void 0,nonce:typeof n.nonce=="string"?n.nonce:void 0,fetchPriority:typeof n.fetchPriority=="string"?n.fetchPriority:void 0})}else Dn.d.m(e)};wn.requestFormReset=function(e){Dn.d.r(e)};wn.unstable_batchedUpdates=function(e,n){return e(n)};wn.useFormState=function(e,n,t){return Ds.H.useFormState(e,n,t)};wn.useFormStatus=function(){return Ds.H.useHostTransitionStatus()};wn.version="19.3.0"});var np=On((c6,z0)=>{"use strict";function O0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(O0)}catch(e){console.error(e)}}O0(),z0.exports=I0()});var k1=On(ad=>{"use strict";var Je=M0(),bx=Vo(),GC=np();function L(e){var n="https://react.dev/errors/"+e;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var t=2;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t])}return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function kx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function fc(e){for(var n=e,t=n;t&&!t.alternate;)n=t,(n.flags&4098)!==0&&(e=n.return),t=n.return;for(;n.return;)n=n.return;return n.tag===3?e:null}function Sx(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function _x(e){if(e.tag===31){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function B0(e){if(fc(e)!==e)throw Error(L(188))}function XC(e){var n=e.alternate;if(!n){if(n=fc(e),n===null)throw Error(L(188));return n!==e?null:e}for(var t=e,o=n;;){var r=t.return;if(r===null)break;var i=r.alternate;if(i===null){if(o=r.return,o!==null){t=o;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===t)return B0(r),e;if(i===o)return B0(r),n;i=i.sibling}throw Error(L(188))}if(t.return!==o.return)t=r,o=i;else{for(var a=!1,s=r.child;s;){if(s===t){a=!0,t=r,o=i;break}if(s===o){a=!0,o=r,t=i;break}s=s.sibling}if(!a){for(s=i.child;s;){if(s===t){a=!0,t=i,o=r;break}if(s===o){a=!0,o=i,t=r;break}s=s.sibling}if(!a)throw Error(L(189))}}if(t.alternate!==o)throw Error(L(190))}if(t.tag!==3)throw Error(L(188));return t.stateNode.current===t?e:n}function Dx(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e;for(e=e.child;e!==null;){if(n=Dx(e),n!==null)return n;e=e.sibling}return null}function Hn(e,n,t,o,r,i){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&t(e,o,r,i)||(e.tag!==22||e.memoizedState===null)&&(n||e.tag!==5&&e.tag!==27)&&Hn(e.child,n,t,o,r,i))return!0;e=e.sibling}return!1}function di(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function P0(e){var n=!1;for(e=e.return;e!==null&&(e.tag===4&&(n=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return n}function Ex(e){var n=[null,null],t=di(e);return t===null||Cx(n,e,t.child,{foundSelf:!1}),n}function Cx(e,n,t,o){for(;t!==null;){if(t===n)o.foundSelf=!0;else if(t.tag===5||t.tag===27||t.tag===6){if(o.foundSelf)return e[1]=t,!0;e[0]=t}else if((t.tag!==22||t.memoizedState===null)&&Cx(e,n,t.child,o))return!0;t=t.sibling}return!1}function $e(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(L(559))}}var ta=null,Np=null;function KC(e,n,t){return e===t?!0:e===n?(ta=e,!0):!1}function ZC(e,n,t){return e===t?(Np=e,!1):e===n?(Np!==null&&(ta=e),!0):!1}function L0(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function Ip(e,n,t){for(var o=0,r=e;r;r=t(r))o++;r=0;for(var i=n;i;i=t(i))r++;for(;0<o-r;)e=t(e),o--;for(;0<r-o;)n=t(n),r--;for(;o--;){if(e===n||n!==null&&e===n.alternate)return e;e=t(e),n=t(n)}return null}var _e=Object.assign,QC=Symbol.for("react.element"),El=Symbol.for("react.transitional.element"),As=Symbol.for("react.portal"),oa=Symbol.for("react.fragment"),Tx=Symbol.for("react.strict_mode"),Op=Symbol.for("react.profiler"),qx=Symbol.for("react.consumer"),Kt=Symbol.for("react.context"),Fm=Symbol.for("react.forward_ref"),zp=Symbol.for("react.suspense"),Bp=Symbol.for("react.suspense_list"),Ym=Symbol.for("react.memo"),Ko=Symbol.for("react.lazy");Symbol.for("react.scope");var Pp=Symbol.for("react.activity"),WC=Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var $C=Symbol.for("react.memo_cache_sentinel"),Lp=Symbol.for("react.view_transition"),JC=Symbol.for("react.recoverable"),j0=Symbol.iterator;function Es(e){return e===null||typeof e!="object"?null:(e=j0&&e[j0]||e["@@iterator"],typeof e=="function"?e:null)}var eT=Symbol.for("react.client.reference");function jp(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===eT?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case oa:return"Fragment";case Op:return"Profiler";case Tx:return"StrictMode";case zp:return"Suspense";case Bp:return"SuspenseList";case Pp:return"Activity";case Lp:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case As:return"Portal";case Kt:return e.displayName||"Context";case qx:return(e._context.displayName||"Context")+".Consumer";case Fm:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ym:return n=e.displayName||null,n!==null?n:jp(e.type)||"Memo";case Ko:n=e._payload,e=e._init;try{return jp(e(n))}catch{}}return null}var Ns=Array.isArray,$=bx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,me=GC.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,$r={pending:!1,data:null,method:null,action:null},Hp=[],ra=-1;function no(e){return{current:e}}function fn(e){0>ra||(e.current=Hp[ra],Hp[ra]=null,ra--)}function Re(e,n){ra++,Hp[ra]=e.current,e.current=n}var $t=no(null),Qs=no(null),or=no(null),fu=no(null);function pu(e,n){switch(Re(or,n),Re(Qs,e),Re($t,null),n.nodeType){case 9:case 11:e=(e=n.documentElement)&&(e=e.namespaceURI)?ex(e):0;break;default:if(e=n.tagName,n=n.namespaceURI)n=ex(n),e=Wb(n,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}fn($t),Re($t,e)}function _a(){fn($t),fn(Qs),fn(or)}function Vp(e){var n=e.memoizedState;n!==null&&(Ia._currentValue=n.memoizedState,Re(fu,e)),n=$t.current;var t=Wb(n,e.type);n!==t&&(Re(Qs,e),Re($t,t))}function mu(e){Qs.current===e&&(fn($t),fn(Qs)),fu.current===e&&(fn(fu),Ia._currentValue=$r)}var tp,H0;function Go(e){if(tp===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);tp=n&&n[1]||"",H0=-1<t.stack.indexOf(`
    at`)?" (<anonymous>)":-1<t.stack.indexOf("@")?"@unknown:0:0":""}return`
`+tp+e+H0}var op=!1;function rp(e,n){if(!e||op)return"";op=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(m){var d=m}Reflect.construct(e,[],f)}else{try{f.call()}catch(m){d=m}f=!1;try{var p=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),f=!0,new e}finally{f&&(p!==void 0?Object.defineProperty(e.prototype,"props",p):delete e.prototype.props)}}}else{try{throw Error()}catch(m){d=m}(f=e())&&typeof f.catch=="function"&&f.catch(function(){})}}catch(m){if(m&&d&&typeof m.stack=="string")return[m.stack,d.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=o.DetermineComponentFrameRoot(),a=i[0],s=i[1];if(a&&s){var c=a.split(`
`),l=s.split(`
`);for(r=o=0;o<c.length&&!c[o].includes("DetermineComponentFrameRoot");)o++;for(;r<l.length&&!l[r].includes("DetermineComponentFrameRoot");)r++;if(o===c.length||r===l.length)for(o=c.length-1,r=l.length-1;1<=o&&0<=r&&c[o]!==l[r];)r--;for(;1<=o&&0<=r;o--,r--)if(c[o]!==l[r]){if(o!==1||r!==1)do if(o--,r--,0>r||c[o]!==l[r]){var u=`
`+c[o].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=o&&0<=r);break}}}finally{op=!1,Error.prepareStackTrace=t}return(t=e?e.displayName||e.name:"")?Go(t):""}function nT(e,n){switch(e.tag){case 26:case 27:case 5:return Go(e.type);case 16:return Go("Lazy");case 13:return e.child!==n&&n!==null?Go("Suspense Fallback"):Go("Suspense");case 19:return Go("SuspenseList");case 0:case 15:return rp(e.type,!1);case 11:return rp(e.type.render,!1);case 1:return rp(e.type,!0);case 31:return Go("Activity");case 30:return Go("ViewTransition");default:return""}}function V0(e){try{var n="",t=null;do n+=nT(e,t),t=e,e=e.return;while(e);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Up=Object.prototype.hasOwnProperty,Gm=Je.unstable_scheduleCallback,ip=Je.unstable_cancelCallback,tT=Je.unstable_shouldYield,oT=Je.unstable_requestPaint,et=Je.unstable_now,rT=Je.unstable_getCurrentPriorityLevel,Rx=Je.unstable_ImmediatePriority,Mx=Je.unstable_UserBlockingPriority,hu=Je.unstable_NormalPriority,iT=Je.unstable_LowPriority,Ax=Je.unstable_IdlePriority,aT=Je.log,sT=Je.unstable_setDisableYieldValue,pc=null,nt=null;function Wo(e){if(typeof aT=="function"&&sT(e),nt&&typeof nt.setStrictMode=="function")try{nt.setStrictMode(pc,e)}catch{}}var tt=Math.clz32?Math.clz32:uT,cT=Math.log,lT=Math.LN2;function uT(e){return e>>>=0,e===0?32:31-(cT(e)/lT|0)|0}var Cl=256,Tl=262144,ql=4194304;function Xr(e){var n=e&42;if(n!==0)return n;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Hu(e,n,t){var o=e.pendingLanes;if(o===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes;e=e.warmLanes;var s=o&134217727;return s!==0?(o=s&~i,o!==0?r=Xr(o):(a&=s,a!==0?r=Xr(a):t||(t=s&~e,t!==0&&(r=Xr(t))))):(s=o&~i,s!==0?r=Xr(s):a!==0?r=Xr(a):t||(t=o&~e,t!==0&&(r=Xr(t)))),r===0?0:n!==0&&n!==r&&(n&i)===0&&(i=r&-r,t=n&-n,i>=t||i===32&&(t&4194048)!==0)?n:r}function mc(e,n){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&n)===0}function Nx(e,n){(n&8)!==0&&(n|=n&32);var t=e.entangledLanes;if(t!==0)for(e=e.entanglements,t&=n;0<t;){var o=31-tt(t),r=1<<o;n|=e[o],t&=~r}return n}function dT(e,n){switch(e){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ix(){var e=ql;return ql<<=1,(ql&62914560)===0&&(ql=4194304),e}function ap(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function hc(e,n){e.pendingLanes|=n,n!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function fT(e,n,t,o,r,i){var a=e.pendingLanes;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=t,e.entangledLanes&=t,e.errorRecoveryDisabledLanes&=t,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(t=a&~t;0<t;){var u=31-tt(t),f=1<<u;s[u]=0,c[u]=-1;var d=l[u];if(d!==null)for(l[u]=null,u=0;u<d.length;u++){var p=d[u];p!==null&&(p.lane&=-536870913)}t&=~f}o!==0&&Ox(e,o,0),i!==0&&r===0&&e.tag!==0&&(e.suspendedLanes|=i&~(a&~n))}function Ox(e,n,t){e.pendingLanes|=n,e.suspendedLanes&=~n;var o=31-tt(n);e.entangledLanes|=n,e.entanglements[o]=e.entanglements[o]|1073741824|t&261930}function zx(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var o=31-tt(t),r=1<<o;r&n|e[o]&n&&(e[o]|=n),t&=~r}}function Bx(e,n){var t=n&-n;return t=(t&42)!==0?1:Xm(t),(t&(e.suspendedLanes|n))!==0?0:t}function Xm(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Km(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Px(){var e=me.p;return e!==0?e:(e=window.event,e===void 0?32:x1(e.type))}function U0(e,n){var t=me.p;try{return me.p=e,n()}finally{me.p=t}}var Co=Math.random().toString(36).slice(2),un="__reactFiber$"+Co,Vn="__reactProps$"+Co,Ba="__reactContainer$"+Co,F0="__reactEvents$"+Co,pT="__reactListeners$"+Co,mT="__reactHandles$"+Co,Y0="__reactResources$"+Co,yc="__reactMarker$"+Co,yu="__reactLoad$"+Co;function Vu(e){delete e[un],delete e[Vn],delete e[pT],delete e[mT]}function Qr(e){var n;if(n=e[un])return n;for(var t=e.parentNode;t;){if(n=t[Ba]||t[un]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=cx(e);e!==null;){if(t=e[un])return t;e=cx(e)}return n}e=t,t=e.parentNode}return null}function Pa(e){if(e=e[un]||e[Ba]){var n=e.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return e}return null}function Is(e){var n=e.tag;if(n===5||n===26||n===27||n===6)return e.stateNode;throw Error(L(33))}function ma(e){var n=e[Y0];return n||(n=e[Y0]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function rn(e){e[yc]=!0}function Lx(e){e[yu]=void 0}var jx=new Set,Hx={};function fi(e,n){Da(e,n),Da(e+"Capture",n)}function Da(e,n){for(Hx[e]=n,e=0;e<n.length;e++)jx.add(n[e])}var hT=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),G0={},X0={};function yT(e){return Up.call(X0,e)?!0:Up.call(G0,e)?!1:hT.test(e)?X0[e]=!0:(G0[e]=!0,!1)}var de=!1;function K0(){var e=de;return de=!1,e}function Xl(e,n,t){if(yT(n))if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":e.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(n);return}}e.setAttribute(n,t)}}function Rl(e,n,t){if(t===null)e.removeAttribute(n);else{switch(typeof t){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttribute(n,t)}}function ho(e,n,t,o){if(o===null)e.removeAttribute(t);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttributeNS(n,t,o)}}function Qn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Vx(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function gT(e,n,t){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,n);if(!e.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var r=o.get,i=o.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return r.call(this)},set:function(a){t=""+a,i.call(this,a)}}),Object.defineProperty(e,n,{enumerable:o.enumerable}),{getValue:function(){return t},setValue:function(a){t=""+a},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Fp(e){if(!e._valueTracker){var n=Vx(e)?"checked":"value";e._valueTracker=gT(e,n,""+e[n])}}function Ux(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),o="";return e&&(o=Vx(e)?e.checked?"true":"false":e.value),e=o,e!==t?(n.setValue(e),!0):!1}var vT=/[\n"\\]/g;function yt(e){return e.replace(vT,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Yp(e,n,t,o,r,i,a,s){e.name="",a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?e.type=a:e.removeAttribute("type"),n!=null?a==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+Qn(n)):e.value!==""+Qn(n)&&(e.value=""+Qn(n)):a!=="submit"&&a!=="reset"||e.removeAttribute("value"),n!=null?a==="number"&&e.value==n?sp(e,Qn(e.value)):sp(e,Qn(n)):t!=null?sp(e,Qn(t)):o!=null&&e.removeAttribute("value"),r==null&&i!=null&&(e.defaultChecked=!!i),r!=null&&(e.checked=r&&typeof r!="function"&&typeof r!="symbol"),s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.name=""+Qn(s):e.removeAttribute("name")}function Fx(e,n,t,o,r,i,a,s){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),n!=null||t!=null){if(!(i!=="submit"&&i!=="reset"||n!=null)){Fp(e);return}t=t!=null?""+Qn(t):"",n=n!=null?""+Qn(n):t,s||n===e.value||(e.value=n),e.defaultValue=n}o=o??r,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=s?e.checked:!!o,e.defaultChecked=!!o,a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.name=a),Fp(e)}function sp(e,n){e.defaultValue!==""+n&&(e.defaultValue=""+n)}function ha(e,n,t,o){if(e=e.options,n){n={};for(var r=0;r<t.length;r++)n["$"+t[r]]=!0;for(t=0;t<e.length;t++)r=n.hasOwnProperty("$"+e[t].value),e[t].selected!==r&&(e[t].selected=r),r&&o&&(e[t].defaultSelected=!0)}else{for(t=""+Qn(t),n=null,r=0;r<e.length;r++){if(e[r].value===t){e[r].selected=!0,o&&(e[r].defaultSelected=!0);return}n!==null||e[r].disabled||(n=e[r])}n!==null&&(n.selected=!0)}}function Yx(e,n,t){if(n!=null&&(n=""+Qn(n),n!==e.value&&(e.value=n),t==null)){e.defaultValue!==n&&(e.defaultValue=n);return}e.defaultValue=t!=null?""+Qn(t):""}function Gx(e,n,t,o){if(n==null){if(o!=null){if(t!=null)throw Error(L(92));if(Ns(o)){if(1<o.length)throw Error(L(93));o=o[0]}t=o}t==null&&(t=""),n=t}t=Qn(n),e.defaultValue=t,o=e.textContent,o===t&&o!==""&&o!==null&&(e.value=o),Fp(e)}function Ea(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var xT=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Z0(e,n,t){var o=n.indexOf("--")===0;t==null||typeof t=="boolean"||t===""?o?e.setProperty(n,""):n==="float"?e.cssFloat="":e[n]="":o?e.setProperty(n,t):typeof t!="number"||t===0||xT.has(n)?n==="float"?e.cssFloat=t:e[n]=(""+t).trim():e[n]=t+"px"}function Xx(e,n,t){if(n!=null&&typeof n!="object")throw Error(L(62));if(e=e.style,t!=null){for(var o in t)!t.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="",de=!0);for(var r in n)o=n[r],n.hasOwnProperty(r)&&t[r]!==o&&(Z0(e,r,o),de=!0)}else for(var i in n)n.hasOwnProperty(i)&&Z0(e,i,n[i])}function Zm(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wT=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),bT=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Kl(e){return bT.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Zt(){}var Gp=null;function Qm(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ia=null,ya=null;function Q0(e){var n=Pa(e);if(n&&(e=n.stateNode)){var t=e[Vn]||null;e:switch(e=n.stateNode,n.type){case"input":if(Yp(e,t.value,t.defaultValue,t.defaultValue,t.checked,t.defaultChecked,t.type,t.name),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll('input[name="'+yt(""+n)+'"][type="radio"]'),n=0;n<t.length;n++){var o=t[n];if(o!==e&&o.form===e.form){var r=o[Vn]||null;if(!r)throw Error(L(90));Yp(o,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(n=0;n<t.length;n++)o=t[n],o.form===e.form&&Ux(o)}break e;case"textarea":Yx(e,t.value,t.defaultValue);break e;case"select":n=t.value,n!=null&&ha(e,!!t.multiple,n,!1)}}}var cp=!1;function Kx(e,n,t){if(cp)return e(n,t);cp=!0;try{var o=e(n);return o}finally{if(cp=!1,(ia!==null||ya!==null)&&(td(),ia&&(n=ia,e=ya,ya=ia=null,Q0(n),e)))for(n=0;n<e.length;n++)Q0(e[n])}}function Ws(e,n){var t=e.stateNode;if(t===null)return null;var o=t[Vn]||null;if(o===null)return null;t=o[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(L(231,n,typeof t));return t}var bo=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Xp=!1;if(bo)try{Qi={},Object.defineProperty(Qi,"passive",{get:function(){Xp=!0}}),window.addEventListener("test",Qi,Qi),window.removeEventListener("test",Qi,Qi)}catch{Xp=!1}var Qi,$o=null,Wm=null,Zl=null;function Zx(){if(Zl)return Zl;var e,n=Wm,t=n.length,o,r="value"in $o?$o.value:$o.textContent,i=r.length;for(e=0;e<t&&n[e]===r[e];e++);var a=t-e;for(o=1;o<=a&&n[t-o]===r[i-o];o++);return Zl=r.slice(e,1<o?1-o:void 0)}function Ql(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ml(){return!0}function W0(){return!1}function qn(e){function n(t,o,r,i,a){this._reactName=t,this._targetInst=r,this.type=o,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ml:W0,this.isPropagationStopped=W0,this}return _e(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ml)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ml)},persist:function(){},isPersistent:Ml}),n}var vr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Uu=qn(vr),gc=_e({},vr,{view:0,detail:0}),kT=qn(gc),lp,up,Cs,Fu=_e({},gc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$m,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Cs&&(Cs&&e.type==="mousemove"?(lp=e.screenX-Cs.screenX,up=e.screenY-Cs.screenY):up=lp=0,Cs=e),lp)},movementY:function(e){return"movementY"in e?e.movementY:up}}),$0=qn(Fu),ST=_e({},Fu,{dataTransfer:0}),_T=qn(ST),DT=_e({},gc,{relatedTarget:0}),dp=qn(DT),ET=_e({},vr,{animationName:0,elapsedTime:0,pseudoElement:0}),CT=qn(ET),TT=_e({},vr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),qT=qn(TT),RT=_e({},vr,{data:0}),J0=qn(RT),MT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},AT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},NT={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function IT(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=NT[e])?!!n[e]:!1}function $m(){return IT}var OT=_e({},gc,{key:function(e){if(e.key){var n=MT[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Ql(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?AT[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$m,charCode:function(e){return e.type==="keypress"?Ql(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ql(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),zT=qn(OT),BT=_e({},Fu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ev=qn(BT),PT=_e({},vr,{submitter:0}),LT=qn(PT),jT=_e({},gc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$m}),HT=qn(jT),VT=_e({},vr,{propertyName:0,elapsedTime:0,pseudoElement:0}),UT=qn(VT),FT=_e({},Fu,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),YT=qn(FT),GT=_e({},vr,{newState:0,oldState:0,source:0}),XT=qn(GT),KT=[9,13,27,32],Jm=bo&&"CompositionEvent"in window,Bs=null;bo&&"documentMode"in document&&(Bs=document.documentMode);var ZT=bo&&"TextEvent"in window&&!Bs,Qx=bo&&(!Jm||Bs&&8<Bs&&11>=Bs),nv=" ",tv=!1;function Wx(e,n){switch(e){case"keyup":return KT.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $x(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var aa=!1;function QT(e,n){switch(e){case"compositionend":return $x(n);case"keypress":return n.which!==32?null:(tv=!0,nv);case"textInput":return e=n.data,e===nv&&tv?null:e;default:return null}}function WT(e,n){if(aa)return e==="compositionend"||!Jm&&Wx(e,n)?(e=Zx(),Zl=Wm=$o=null,aa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Qx&&n.locale!=="ko"?null:n.data;default:return null}}var $T={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ov(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!$T[e.type]:n==="textarea"}function Jx(e,n,t,o){ia?ya?ya.push(o):ya=[o]:ia=o,n=Pu(n,"onChange"),0<n.length&&(t=new Uu("onChange","change",null,t,o),e.push({event:t,listeners:n}))}var Ps=null,$s=null;function JT(e){Kb(e,0)}function Yu(e){var n=Is(e);if(Ux(n))return e}function rv(e,n){if(e==="change")return n}var ew=!1;bo&&(bo?(Nl="oninput"in document,Nl||(fp=document.createElement("div"),fp.setAttribute("oninput","return;"),Nl=typeof fp.oninput=="function"),Al=Nl):Al=!1,ew=Al&&(!document.documentMode||9<document.documentMode));var Al,Nl,fp;function iv(){Ps&&(Ps.detachEvent("onpropertychange",nw),$s=Ps=null)}function nw(e){if(e.propertyName==="value"&&Yu($s)){var n=[];Jx(n,$s,e,Qm(e)),Kx(JT,n)}}function eq(e,n,t){e==="focusin"?(iv(),Ps=n,$s=t,Ps.attachEvent("onpropertychange",nw)):e==="focusout"&&iv()}function nq(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Yu($s)}function tq(e,n){if(e==="click")return Yu(n)}function oq(e,n){if(e==="input"||e==="change")return Yu(n)}function rq(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var rt=typeof Object.is=="function"?Object.is:rq;function Js(e,n){if(rt(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),o=Object.keys(n);if(t.length!==o.length)return!1;for(o=0;o<t.length;o++){var r=t[o];if(!Up.call(n,r)||!rt(e[r],n[r]))return!1}return!0}function Kp(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function av(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function sv(e,n){var t=av(e);e=0;for(var o;t;){if(t.nodeType===3){if(o=e+t.textContent.length,e<=n&&o>=n)return{node:t,offset:n-e};e=o}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=av(t)}}function tw(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?tw(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function ow(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var n=Kp(e.document);n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=Kp(e.document)}return n}function eh(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}var iq=bo&&"documentMode"in document&&11>=document.documentMode,sa=null,Zp=null,Ls=null,Qp=!1;function cv(e,n,t){var o=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;Qp||sa==null||sa!==Kp(o)||(o=sa,"selectionStart"in o&&eh(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),Ls&&Js(Ls,o)||(Ls=o,o=Pu(Zp,"onSelect"),0<o.length&&(n=new Uu("onSelect","select",null,n,t),e.push({event:n,listeners:o}),n.target=sa)))}function Yr(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var ca={animationend:Yr("Animation","AnimationEnd"),animationiteration:Yr("Animation","AnimationIteration"),animationstart:Yr("Animation","AnimationStart"),transitionrun:Yr("Transition","TransitionRun"),transitionstart:Yr("Transition","TransitionStart"),transitioncancel:Yr("Transition","TransitionCancel"),transitionend:Yr("Transition","TransitionEnd")},pp={},rw={};bo&&(rw=document.createElement("div").style,"AnimationEvent"in window||(delete ca.animationend.animation,delete ca.animationiteration.animation,delete ca.animationstart.animation),"TransitionEvent"in window||delete ca.transitionend.transition);function pi(e){if(pp[e])return pp[e];if(!ca[e])return e;var n=ca[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in rw)return pp[e]=n[t];return e}var iw=pi("animationend"),aw=pi("animationiteration"),sw=pi("animationstart"),aq=pi("transitionrun"),sq=pi("transitionstart"),cq=pi("transitioncancel"),cw=pi("transitionend"),lw=new Map,Wp="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Wp.push("scrollEnd");function Ot(e,n){lw.set(e,n),fi(n,[e])}var lq=0;function ko(e,n){if(e.name!=null&&e.name!=="auto")return e.name;if(n.autoName!==null)return n.autoName;e=It.identifierPrefix;var t=lq++;return e="_"+e+"t_"+t.toString(32)+"_",n.autoName=e}function lv(e){if(e==null||typeof e=="string")return e;var n=null,t=Sa;if(t!==null)for(var o=0;o<t.length;o++){var r=e[t[o]];if(r!=null){if(r==="none")return"none";n=n==null?r:n+(" "+r)}}return n??e.default}function To(e,n){return e=lv(e),n=lv(n),n==null?e==="auto"?null:e:n==="auto"?null:n}var gu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},pt=[],la=0,nh=0;function Gu(){for(var e=la,n=nh=la=0;n<e;){var t=pt[n];pt[n++]=null;var o=pt[n];pt[n++]=null;var r=pt[n];pt[n++]=null;var i=pt[n];if(pt[n++]=null,o!==null&&r!==null){var a=o.pending;a===null?r.next=r:(r.next=a.next,a.next=r),o.pending=r}i!==0&&uw(t,r,i)}}function Xu(e,n,t,o){pt[la++]=e,pt[la++]=n,pt[la++]=t,pt[la++]=o,nh|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function th(e,n,t,o){return Xu(e,n,t,o),vu(e)}function mi(e,n){return Xu(e,null,null,n),vu(e)}function uw(e,n,t){e.lanes|=t;var o=e.alternate;o!==null&&(o.lanes|=t);for(var r=!1,i=e.return;i!==null;)i.childLanes|=t,o=i.alternate,o!==null&&(o.childLanes|=t),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(r=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,r&&n!==null&&(r=31-tt(t),e=i.hiddenUpdates,o=e[r],o===null?e[r]=[n]:o.push(n),n.lane=t|536870912),i):null}function vu(e){if(50<Zs)throw Zs=0,au=null,Error(L(185));for(var n=e.return;n!==null;)e=n,n=e.return;return e.tag===3?e.stateNode:null}var ua={};function uq(e,n,t,o){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ln(e,n,t,o){return new uq(e,n,t,o)}function oh(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xo(e,n){var t=e.alternate;return t===null?(t=Ln(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&1206910976,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t.refCleanup=e.refCleanup,t}function dw(e,n){e.flags&=1206910978;var t=e.alternate;return t===null?(e.childLanes=0,e.lanes=n,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=t.childLanes,e.lanes=t.lanes,e.child=t.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=t.memoizedProps,e.memoizedState=t.memoizedState,e.updateQueue=t.updateQueue,e.type=t.type,n=t.dependencies,e.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),e}function Wl(e,n,t,o,r,i){var a=0;if(o=e,typeof o=="function")oh(o)&&(a=1);else if(typeof o=="string")a=zR(e,t,$t.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(o){case Pp:return e=Ln(31,t,n,r),e.elementType=Pp,e.lanes=i,e;case oa:return Jr(t.children,r,i,n);case Tx:a=8,r|=24;break;case Op:return e=Ln(12,t,n,r|2),e.elementType=Op,e.lanes=i,e;case zp:return e=Ln(13,t,n,r),e.elementType=zp,e.lanes=i,e;case Bp:return e=Ln(19,t,n,r),e.elementType=Bp,e.lanes=i,e;case WC:case Lp:return e=r|32,e=Ln(30,t,n,e),e.elementType=Lp,e.lanes=i,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof o=="object"&&o!==null)switch(o.$$typeof){case Kt:a=10;break e;case qx:a=9;break e;case Fm:a=11;break e;case Ym:a=14;break e;case Ko:a=16,o=null;break e}a=29,t=Error(L(130,e===null?"null":typeof e,"")),o=null}return n=Ln(a,t,n,r),n.elementType=e,n.type=o,n.lanes=i,n}function Jr(e,n,t,o){return e=Ln(7,e,o,n),e.lanes=t,e}function mp(e,n,t){return e=Ln(6,e,null,n),e.lanes=t,e}function fw(e){var n=Ln(18,null,null,0);return n.stateNode=e,n}function hp(e,n,t){return n=Ln(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}var uv=new WeakMap;function gt(e,n){if(typeof e=="object"&&e!==null){var t=uv.get(e);return t!==void 0?t:(n={value:e,source:n,stack:V0(n)},uv.set(e,n),n)}return{value:e,source:n,stack:V0(n)}}var da=[],fa=0,xu=null,ec=0,mt=[],ht=0,pr=null,Qt=1,Wt="";function go(e,n){da[fa++]=ec,da[fa++]=xu,xu=e,ec=n}function pw(e,n,t){mt[ht++]=Qt,mt[ht++]=Wt,mt[ht++]=pr,pr=e;var o=Qt;e=Wt;var r=32-tt(o)-1;o&=~(1<<r),t+=1;var i=32-tt(n)+r;if(30<i){var a=r-r%5;i=(o&(1<<a)-1).toString(32),o>>=a,r-=a,Qt=1<<32-tt(n)+r|t<<r|o,Wt=i+e}else Qt=1<<i|t<<r|o,Wt=e}function Ku(e){e.return!==null&&(go(e,1),pw(e,1,0))}function rh(e){for(;e===xu;)xu=da[--fa],da[fa]=null,ec=da[--fa],da[fa]=null;for(;e===pr;)pr=mt[--ht],mt[ht]=null,Wt=mt[--ht],mt[ht]=null,Qt=mt[--ht],mt[ht]=null}function mw(e,n){mt[ht++]=Qt,mt[ht++]=Wt,mt[ht++]=pr,Qt=n.id,Wt=n.overflow,pr=e}var an=null,qe=null,re=!1,rr=null,vt=!1,$p=Error(L(519));function mr(e){var n=Error(L(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw nc(gt(n,e)),$p}function dv(e){var n=e.stateNode,t=e.type,o=e.memoizedProps;switch(n[un]=e,n[Vn]=o,t){case"dialog":ae("cancel",n),ae("close",n);break;case"iframe":case"object":case"embed":ae("load",n);break;case"video":case"audio":for(t=0;t<ic.length;t++)ae(ic[t],n);break;case"source":ae("error",n);break;case"img":case"image":case"link":ae("error",n),ae("load",n);break;case"details":ae("toggle",n);break;case"input":ae("invalid",n),Fx(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":ae("invalid",n);break;case"textarea":ae("invalid",n),Gx(n,o.value,o.defaultValue,o.children)}t=o.children,typeof t!="string"&&typeof t!="number"&&typeof t!="bigint"||n.textContent===""+t||o.suppressHydrationWarning===!0||Qb(n.textContent,t)?(o.popover!=null&&(ae("beforetoggle",n),ae("toggle",n)),o.onScroll!=null&&ae("scroll",n),o.onScrollEnd!=null&&ae("scrollend",n),o.onClick!=null&&(n.onclick=Zt),n=!0):n=!1,n||mr(e,!0)}function wu(e){for(an=e.return;an;)switch(an.tag){case 5:case 31:case 13:vt=!1;return;case 27:case 3:vt=!0;return;default:an=an.return}}function Wi(e){if(e!==an)return!1;if(!re)return wu(e),re=!0,!1;var n=e.tag,t;if((t=n!==3&&n!==27)&&((t=n===5)&&(t=e.type,t=!(t!=="form"&&t!=="button")||zm(e.type,e.memoizedProps)),t=!t),t&&qe&&mr(e),wu(e),n===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));qe=sx(e)}else if(n===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(317));qe=sx(e)}else n===27?(n=qe,xr(e.type)?(e=jm,jm=null,qe=e):qe=n):qe=an?xt(e.stateNode.nextSibling):null;return!0}function oi(){qe=an=null,re=!1}function yp(){var e=rr;return e!==null&&(Bn===null?Bn=e:Bn.push.apply(Bn,e),rr=null),e}function nc(e){rr===null?rr=[e]:rr.push(e)}var Jp=no(null),hi=null,vo=null;function Jo(e,n,t){Re(Jp,n._currentValue),n._currentValue=t}function wo(e){e._currentValue=Jp.current,fn(Jp)}function $l(e,n,t){for(;e!==null;){var o=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),e===t)break;e=e.return}}function em(e,n,t,o){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var i=r.dependencies;if(i!==null){var a=r.child;i=i.firstContext;e:for(;i!==null;){var s=i;i=r;for(var c=0;c<n.length;c++)if(s.context===n[c]){i.lanes|=t,s=i.alternate,s!==null&&(s.lanes|=t),$l(i.return,t,e),o||(a=null);break e}i=s.next}}else if(r.tag===18){if(a=r.return,a===null)throw Error(L(341));a.lanes|=t,i=a.alternate,i!==null&&(i.lanes|=t),$l(a,t,e),a=null}else r.tag===13&&r.memoizedState!==null&&r.memoizedState.dehydrated===null?(r.lanes|=t,a=r.alternate,a!==null&&(a.lanes|=t),$l(r.return,t,e),a=r.child,a=a!==null?a.sibling:null):a=r.child;if(a!==null)a.return=r;else for(a=r;a!==null;){if(a===e){a=null;break}if(r=a.sibling,r!==null){r.return=a.return,a=r;break}a=a.return}r=a}}function ri(e,n,t,o){e=null;for(var r=n,i=!1;r!==null;){if(!i){if((r.flags&524288)!==0)i=!0;else if((r.flags&262144)!==0)break}if(r.tag===10){var a=r.alternate;if(a===null)throw Error(L(387));if(a=a.memoizedProps,a!==null){var s=r.type;rt(r.pendingProps.value,a.value)||(e!==null?e.push(s):e=[s])}}else if(r===fu.current){if(a=r.alternate,a===null)throw Error(L(387));a.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(e!==null?e.push(Ia):e=[Ia])}r=r.return}return e!==null&&em(n,e,t,o),n.flags|=262144,e!==null}function bu(e){for(e=e.firstContext;e!==null;){if(!rt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ii(e){hi=e,vo=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function dn(e){return hw(hi,e)}function Il(e,n){return hi===null&&ii(e),hw(e,n)}function hw(e,n){var t=n._currentValue;if(n={context:n,memoizedValue:t,next:null},vo===null){if(e===null)throw Error(L(308));vo=n,e.dependencies={lanes:0,firstContext:n},e.flags|=524288}else vo=vo.next=n;return t}var dq=typeof AbortController<"u"?AbortController:function(){var e=[],n=this.signal={aborted:!1,addEventListener:function(t,o){e.push(o)}};this.abort=function(){n.aborted=!0,e.forEach(function(t){return t()})}},fq=Je.unstable_scheduleCallback,pq=Je.unstable_NormalPriority,Ze={$$typeof:Kt,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ih(){return{controller:new dq,data:new Map,refCount:0}}function vc(e){e.refCount--,e.refCount===0&&fq(pq,function(){e.controller.abort()})}function fv(e,n){if((e.pendingLanes&4194048)!==0){var t=e.transitionTypes;for(t===null&&(t=e.transitionTypes=[]),e=0;e<n.length;e++){var o=n[e];t.indexOf(o)===-1&&t.push(o)}}}var Os=null;function mq(e){var n=e.transitionTypes;return e.transitionTypes=null,n}var js=null,nm=0,ai=0,ga=null;function hq(e,n){if(js===null){var t=js=[];nm=0,ai=Nh(),ga={status:"pending",value:void 0,then:function(o){t.push(o)}}}return nm++,n.then(pv,pv),n}function pv(){if(--nm===0&&(Os=null,js!==null)){ga!==null&&(ga.status="fulfilled");var e=js;js=null,ai=0,ga=null;for(var n=0;n<e.length;n++)(0,e[n])()}}function yq(e,n){var t=[],o={status:"pending",value:null,reason:null,then:function(r){t.push(r)}};return e.then(function(){o.status="fulfilled",o.value=n;for(var r=0;r<t.length;r++)(0,t[r])(n)},function(r){for(o.status="rejected",o.reason=r,r=0;r<t.length;r++)(0,t[r])(void 0)}),o}var mv=$.S;$.S=function(e,n){if(Nb=et(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&hq(e,n),Os!==null)for(var t=Ma;t!==null;)fv(t,Os),t=t.next;if(t=e.types,t!==null){for(var o=Ma;o!==null;)fv(o,t),o=o.next;if(ai!==0){o=Os,o===null&&(o=Os=[]);for(var r=0;r<t.length;r++){var i=t[r];o.indexOf(i)===-1&&o.push(i)}}}mv!==null&&mv(e,n)};var ei=no(null);function ah(){var e=ei.current;return e!==null?e:Se.pooledCache}function Jl(e,n){n===null?Re(ei,ei.current):Re(ei,n.pool)}function yw(){var e=ah();return e===null?null:{parent:Ze._currentValue,pool:e}}var La=Error(L(460)),sh=Error(L(474)),Zu=Error(L(542)),ku={then:function(){}};function hv(e){return e=e.status,e==="fulfilled"||e==="rejected"}function gw(e,n,t){switch(t=e[t],t===void 0?e.push(n):t!==n&&(n.then(Zt,Zt),n=t),n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,gv(e),e===void 0&&!("reason"in n)?Error(L(600)):e;default:if(typeof n.status=="string")n.then(Zt,Zt);else{if(e=Se,e!==null&&100<e.shellSuspendCounter)throw Error(L(482));e=n,e.status="pending",e.then(function(o){if(n.status==="pending"){var r=n;r.status="fulfilled",r.value=o}},function(o){if(n.status==="pending"){var r=n;r.status="rejected",r.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw e=n.reason,gv(e),e}throw ni=n,La}}function Kr(e){try{var n=e._init;return n(e._payload)}catch(t){throw t!==null&&typeof t=="object"&&typeof t.then=="function"?(ni=t,La):t}}var ni=null;function yv(){if(ni===null)throw Error(L(459));var e=ni;return ni=null,e}function gv(e){if(e===La||e===Zu)throw Error(L(483))}var va=null,tc=0;function Ol(e){var n=tc;return tc+=1,va===null&&(va=[]),gw(va,e,n)}function Yo(e,n){n=n.props.ref,e.ref=n!==void 0?n:null}function zl(e,n){throw n.$$typeof===QC?Error(L(525)):(e=Object.prototype.toString.call(n),Error(L(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)))}function vw(e){function n(h,v){if(e){var y=h.deletions;y===null?(h.deletions=[v],h.flags|=16):y.push(v)}}function t(h,v){if(!e)return null;for(;v!==null;)n(h,v),v=v.sibling;return null}function o(h){for(var v=new Map;h!==null;)h.key===null?v.set(h.index,h):v.set(h.key,h),h=h.sibling;return v}function r(h,v){return h=xo(h,v),h.index=0,h.sibling=null,h}function i(h,v,y){return h.index=y,e?(y=h.alternate,y!==null?(y=y.index,y<v?(h.flags|=2,v):y):(h.flags|=134217730,v)):(h.flags|=1048576,v)}function a(h){return e&&h.alternate===null&&(h.flags|=134217730),h}function s(h,v,y,w){return v===null||v.tag!==6?(v=mp(y,h.mode,w),v.return=h,v):(v=r(v,y),v.return=h,v)}function c(h,v,y,w){var b=y.type;return b===oa?(h=u(h,v,y.props.children,w,y.key),Yo(h,y),h):v!==null&&(v.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ko&&Kr(b)===v.type)?(v=r(v,y.props),Yo(v,y),v.return=h,v):(v=Wl(y.type,y.key,y.props,null,h.mode,w),Yo(v,y),v.return=h,v)}function l(h,v,y,w){return v===null||v.tag!==4||v.stateNode.containerInfo!==y.containerInfo||v.stateNode.implementation!==y.implementation?(v=hp(y,h.mode,w),v.return=h,v):(v=r(v,y.children||[]),v.return=h,v)}function u(h,v,y,w,b){return v===null||v.tag!==7?(v=Jr(y,h.mode,w,b),v.return=h,v):(v=r(v,y),v.return=h,v)}function f(h,v,y){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=mp(""+v,h.mode,y),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case El:return y=Wl(v.type,v.key,v.props,null,h.mode,y),Yo(y,v),y.return=h,y;case As:return v=hp(v,h.mode,y),v.return=h,v;case Ko:return v=Kr(v),f(h,v,y)}if(Ns(v)||Es(v))return v=Jr(v,h.mode,y,null),v.return=h,v;if(typeof v.then=="function")return f(h,Ol(v),y);if(v.$$typeof===Kt)return f(h,Il(h,v),y);zl(h,v)}return null}function d(h,v,y,w){var b=v!==null?v.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return b!==null?null:s(h,v,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case El:return y.key===b?c(h,v,y,w):null;case As:return y.key===b?l(h,v,y,w):null;case Ko:return y=Kr(y),d(h,v,y,w)}if(Ns(y)||Es(y))return b!==null?null:u(h,v,y,w,null);if(typeof y.then=="function")return d(h,v,Ol(y),w);if(y.$$typeof===Kt)return d(h,v,Il(h,y),w);zl(h,y)}return null}function p(h,v,y,w,b){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return h=h.get(y)||null,s(v,h,""+w,b);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case El:return h=h.get(w.key===null?y:w.key)||null,c(v,h,w,b);case As:return h=h.get(w.key===null?y:w.key)||null,l(v,h,w,b);case Ko:return w=Kr(w),p(h,v,y,w,b)}if(Ns(w)||Es(w))return h=h.get(y)||null,u(v,h,w,b,null);if(typeof w.then=="function")return p(h,v,y,Ol(w),b);if(w.$$typeof===Kt)return p(h,v,y,Il(v,w),b);zl(v,w)}return null}function m(h,v,y,w){for(var b=null,_=null,k=v,D=v=0,E=null;k!==null&&D<y.length;D++){k.index>D?(E=k,k=null):E=k.sibling;var R=d(h,k,y[D],w);if(R===null){k===null&&(k=E);break}e&&k&&R.alternate===null&&n(h,k),v=i(R,v,D),_===null?b=R:_.sibling=R,_=R,k=E}if(D===y.length)return t(h,k),re&&go(h,D),b;if(k===null){for(;D<y.length;D++)k=f(h,y[D],w),k!==null&&(v=i(k,v,D),_===null?b=k:_.sibling=k,_=k);return re&&go(h,D),b}for(k=o(k);D<y.length;D++)E=p(k,h,D,y[D],w),E!==null&&(e&&(R=E.alternate,R!==null&&k.delete(R.key===null?D:R.key)),v=i(E,v,D),_===null?b=E:_.sibling=E,_=E);return e&&k.forEach(function(A){return n(h,A)}),re&&go(h,D),b}function g(h,v,y,w){if(y==null)throw Error(L(151));for(var b=null,_=null,k=v,D=v=0,E=null,R=y.next();k!==null&&!R.done;D++,R=y.next()){k.index>D?(E=k,k=null):E=k.sibling;var A=d(h,k,R.value,w);if(A===null){k===null&&(k=E);break}e&&k&&A.alternate===null&&n(h,k),v=i(A,v,D),_===null?b=A:_.sibling=A,_=A,k=E}if(R.done)return t(h,k),re&&go(h,D),b;if(k===null){for(;!R.done;D++,R=y.next())R=f(h,R.value,w),R!==null&&(v=i(R,v,D),_===null?b=R:_.sibling=R,_=R);return re&&go(h,D),b}for(k=o(k);!R.done;D++,R=y.next())R=p(k,h,D,R.value,w),R!==null&&(e&&(E=R.alternate,E!==null&&k.delete(E.key===null?D:E.key)),v=i(R,v,D),_===null?b=R:_.sibling=R,_=R);return e&&k.forEach(function(P){return n(h,P)}),re&&go(h,D),b}function x(h,v,y,w){if(typeof y=="object"&&y!==null&&y.type===oa&&y.key===null&&y.props.ref===void 0&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case El:e:{for(var b=y.key;v!==null;){if(v.key===b){if(b=y.type,b===oa){if(v.tag===7){t(h,v.sibling),w=r(v,y.props.children),Yo(w,y),w.return=h,h=w;break e}}else if(v.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===Ko&&Kr(b)===v.type){t(h,v.sibling),w=r(v,y.props),Yo(w,y),w.return=h,h=w;break e}t(h,v);break}else n(h,v);v=v.sibling}y.type===oa?(w=Jr(y.props.children,h.mode,w,y.key),Yo(w,y),w.return=h,h=w):(w=Wl(y.type,y.key,y.props,null,h.mode,w),Yo(w,y),w.return=h,h=w)}return a(h);case As:e:{for(b=y.key;v!==null;){if(v.key===b)if(v.tag===4&&v.stateNode.containerInfo===y.containerInfo&&v.stateNode.implementation===y.implementation){t(h,v.sibling),w=r(v,y.children||[]),w.return=h,h=w;break e}else{t(h,v);break}else n(h,v);v=v.sibling}w=hp(y,h.mode,w),w.return=h,h=w}return a(h);case Ko:return y=Kr(y),x(h,v,y,w)}if(Ns(y))return m(h,v,y,w);if(Es(y)){if(b=Es(y),typeof b!="function")throw Error(L(150));return y=b.call(y),g(h,v,y,w)}if(typeof y.then=="function")return x(h,v,Ol(y),w);if(y.$$typeof===Kt)return x(h,v,Il(h,y),w);zl(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,v!==null&&v.tag===6?(t(h,v.sibling),w=r(v,y),w.return=h,h=w):(t(h,v),w=mp(y,h.mode,w),w.return=h,h=w),a(h)):t(h,v)}return function(h,v,y,w){try{tc=0;var b=x(h,v,y,w);return va=null,b}catch(k){if(k===La||k===Zu)throw k;var _=Ln(29,k,null,h.mode);return _.lanes=w,_.return=h,_}finally{}}}var si=vw(!0),xw=vw(!1),Zo=!1;function ch(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function tm(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ir(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ar(e,n,t){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(pe&2)!==0){var r=o.pending;return r===null?n.next=n:(n.next=r.next,r.next=n),o.pending=n,n=vu(e),uw(e,null,t),n}return Xu(e,o,n,t),vu(e)}function Hs(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194048)!==0)){var o=n.lanes;o&=e.pendingLanes,t|=o,n.lanes=t,zx(e,t)}}function gp(e,n){var t=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,t===o)){var r=null,i=null;if(t=t.firstBaseUpdate,t!==null){do{var a={lane:t.lane,tag:t.tag,payload:t.payload,callback:null,next:null};i===null?r=i=a:i=i.next=a,t=t.next}while(t!==null);i===null?r=i=n:i=i.next=n}else r=i=n;t={baseState:o.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:o.shared,callbacks:o.callbacks},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}var om=!1;function Vs(){if(om){var e=ga;if(e!==null)throw e}}function Us(e,n,t,o){om=!1;var r=e.updateQueue;Zo=!1;var i=r.firstBaseUpdate,a=r.lastBaseUpdate,s=r.shared.pending;if(s!==null){r.shared.pending=null;var c=s,l=c.next;c.next=null,a===null?i=l:a.next=l,a=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==a&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(i!==null){var f=r.baseState;a=0,u=l=c=null,s=i;do{var d=s.lane&-536870913,p=d!==s.lane;if(p?(ce&d)===d:(o&d)===d){d!==0&&d===ai&&(om=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});e:{var m=e,g=s;d=n;var x=t;switch(g.tag){case 1:if(m=g.payload,typeof m=="function"){f=m.call(x,f,d);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=g.payload,d=typeof m=="function"?m.call(x,f,d):m,d==null)break e;f=_e({},f,d);break e;case 2:Zo=!0}}d=s.callback,d!==null&&(e.flags|=64,p&&(e.flags|=8192),p=r.callbacks,p===null?r.callbacks=[d]:p.push(d))}else p={lane:d,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=f):u=u.next=p,a|=d;if(s=s.next,s===null){if(s=r.shared.pending,s===null)break;p=s,s=p.next,p.next=null,r.lastBaseUpdate=p,r.shared.pending=null}}while(!0);u===null&&(c=f),r.baseState=c,r.firstBaseUpdate=l,r.lastBaseUpdate=u,i===null&&(r.shared.lanes=0),gr|=a,e.lanes=a,e.memoizedState=f}}function ww(e,n){if(typeof e!="function")throw Error(L(191,e));e.call(n)}function bw(e,n){var t=e.callbacks;if(t!==null)for(e.callbacks=null,e=0;e<t.length;e++)ww(t[e],n)}var hr=no(null),Su=no(0);function vv(e,n){e=Eo,Re(Su,e),Re(hr,n),Eo=e|n.baseLanes}function rm(){Re(Su,Eo),Re(hr,hr.current)}function lh(){Eo=Su.current,fn(hr),fn(Su)}var hn=no(null),bn=null;function sr(e){var n=e.alternate;Re(pn,pn.current&1),Re(hn,e),bn===null&&(n===null||hr.current!==null||n.memoizedState!==null)&&(bn=e)}function im(e){Re(pn,pn.current),Re(hn,e),bn===null&&(bn=e)}function kw(e){e.tag===22?(Re(pn,pn.current),Re(hn,e),bn===null&&(bn=e)):cr()}function cr(){Re(pn,pn.current),Re(hn,hn.current)}function Wn(e){fn(hn),bn===e&&(bn=null),fn(pn)}var pn=no(0);function oc(e,n){Re(hn,hn.current),Re(pn,n)}function uh(e){fn(pn),fn(hn),bn===e&&(bn=null)}function _u(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||Lm(t)||Bh(t)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var So=0,te=null,be=null,Ke=null,Du=!1,xa=!1,ci=!1,Eu=0,rc=0,wa=null,gq=0;function je(){throw Error(L(321))}function dh(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!rt(e[t],n[t]))return!1;return!0}function fh(e,n,t,o,r,i){return So=i,te=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,$.H=e===null||e.memoizedState===null?Jw:eb,ci=!1,i=t(o,r),ci=!1,xa&&(i=_w(n,t,o,r)),Sw(e),i}function Sw(e){$.H=Cu;var n=be!==null&&be.next!==null;if(So=0,Ke=be=te=null,Du=!1,rc=0,wa=null,n)throw Error(L(300));e===null||Qe||(e=e.dependencies,e!==null&&bu(e)&&(Qe=!0))}function _w(e,n,t,o){te=e;var r=0;do{if(xa&&(wa=null),rc=0,xa=!1,25<=r)throw Error(L(301));if(r+=1,Ke=be=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}$.H=Dq,i=n(t,o)}while(xa);return i}function vq(){var e=$.H,n=e.useState()[0];return n=typeof n.then=="function"?xc(n):n,e=e.useState()[0],(be!==null?be.memoizedState:null)!==e&&(te.flags|=1024),n}function ph(){var e=Eu!==0;return Eu=0,e}function mh(e,n,t){n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~t}function hh(e){if(Du){for(e=e.memoizedState;e!==null;){var n=e.queue;n!==null&&(n.pending=null),e=e.next}Du=!1}So=0,Ke=be=te=null,xa=!1,rc=Eu=0,wa=null}function Tn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ke===null?te.memoizedState=Ke=e:Ke=Ke.next=e,Ke}function Ge(){if(be===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=be.next;var n=Ke===null?te.memoizedState:Ke.next;if(n!==null)Ke=n,be=e;else{if(e===null)throw te.alternate===null?Error(L(467)):Error(L(310));be=e,e={memoizedState:be.memoizedState,baseState:be.baseState,baseQueue:be.baseQueue,queue:be.queue,next:null},Ke===null?te.memoizedState=Ke=e:Ke=Ke.next=e}return Ke}function Qu(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function xc(e){var n=rc;return rc+=1,wa===null&&(wa=[]),e=gw(wa,e,n),n=te,(Ke===null?n.memoizedState:Ke.next)===null&&(n=n.alternate,$.H=n===null||n.memoizedState===null?Jw:eb),e}function Wu(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return xc(e);if(e.$$typeof===JC)return;if(e.$$typeof===Kt)return dn(e)}throw Error(L(438,String(e)))}function yh(e){var n=null,t=te.updateQueue;if(t!==null&&(n=t.memoCache),n==null){var o=te.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(r){return r.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),t===null&&(t=Qu(),te.updateQueue=t),t.memoCache=n,t=n.data[n.index],t===void 0)for(t=n.data[n.index]=Array(e),o=0;o<e;o++)t[o]=$C;return n.index++,t}function _o(e,n){return typeof n=="function"?n(e):n}function eu(e){var n=Ge();return gh(n,be,e)}function gh(e,n,t){var o=e.queue;if(o===null)throw Error(L(311));o.lastRenderedReducer=t;var r=e.baseQueue,i=o.pending;if(i!==null){if(r!==null){var a=r.next;r.next=i.next,i.next=a}n.baseQueue=r=i,o.pending=null}if(i=e.baseState,r===null)e.memoizedState=i;else{n=r.next;var s=a=null,c=null,l=n,u=!1;do{var f=l.lane&-536870913;if(f!==l.lane?(ce&f)===f:(So&f)===f){var d=l.revertLane;if(d===0)c!==null&&(c=c.next={lane:0,revertLane:0,gesture:null,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),f===ai&&(u=!0);else if((So&d)===d){l=l.next,d===ai&&(u=!0);continue}else f={lane:0,revertLane:l.revertLane,gesture:null,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null},c===null?(s=c=f,a=i):c=c.next=f,te.lanes|=d,gr|=d;f=l.action,ci&&t(i,f),i=l.hasEagerState?l.eagerState:t(i,f)}else d={lane:f,revertLane:l.revertLane,gesture:l.gesture,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null},c===null?(s=c=d,a=i):c=c.next=d,te.lanes|=f,gr|=f;l=l.next}while(l!==null&&l!==n);if(c===null?a=i:c.next=s,!rt(i,e.memoizedState)&&(Qe=!0,u&&(t=ga,t!==null)))throw t;e.memoizedState=i,e.baseState=a,e.baseQueue=c,o.lastRenderedState=i}return r===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function vp(e){var n=Ge(),t=n.queue;if(t===null)throw Error(L(311));t.lastRenderedReducer=e;var o=t.dispatch,r=t.pending,i=n.memoizedState;if(r!==null){t.pending=null;var a=r=r.next;do i=e(i,a.action),a=a.next;while(a!==r);rt(i,n.memoizedState)||(Qe=!0),n.memoizedState=i,n.baseQueue===null&&(n.baseState=i),t.lastRenderedState=i}return[i,o]}function Dw(e,n,t){var o=te,r=Ge(),i=re;if(i){if(t===void 0)throw Error(L(407));t=t()}else t=n();var a=!rt((be||r).memoizedState,t);if(a&&(r.memoizedState=t,Qe=!0),r=r.queue,vh(Tw.bind(null,o,r,e),[e]),e=r.getSnapshot!==n||a||Ke!==null&&(Ke.memoizedState.tag&1)!==0,Ca(e?9:8,{destroy:void 0},Cw.bind(null,o,r,t,n),null),e){if(o.flags|=2048,Se===null)throw Error(L(349));i||(So&127)!==0||Ew(o,n,t)}return t}function Ew(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=te.updateQueue,n===null?(n=Qu(),te.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Cw(e,n,t,o){n.value=t,n.getSnapshot=o,qw(n)&&Rw(e)}function Tw(e,n,t){return t(function(){qw(n)&&Rw(e)})}function qw(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!rt(e,t)}catch{return!0}}function Rw(e){var n=mi(e,2);n!==null&&jn(n,e,2)}function am(e){var n=Tn();if(typeof e=="function"){var t=e;if(e=t(),ci){Wo(!0);try{t()}finally{Wo(!1)}}}return n.memoizedState=n.baseState=e,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_o,lastRenderedState:e},n}function Mw(e,n,t,o){return e.baseState=t,gh(e,be,typeof o=="function"?o:_o)}function xq(e,n,t,o,r){if(Ju(e))throw Error(L(485));if(e=n.action,e!==null){var i={payload:r,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(a){i.listeners.push(a)}};$.T!==null?t(!0):i.isTransition=!1,o(i),t=n.pending,t===null?(i.next=n.pending=i,Aw(n,i)):(i.next=t.next,n.pending=t.next=i)}}function Aw(e,n){var t=n.action,o=n.payload,r=e.state;if(n.isTransition){var i=$.T,a={};a.types=i!==null?i.types:null,$.T=a;try{var s=t(r,o),c=$.S;c!==null&&c(a,s),xv(e,n,s)}catch(l){sm(e,n,l)}finally{i!==null&&a.types!==null&&(i.types=a.types),$.T=i}}else try{i=t(r,o),xv(e,n,i)}catch(l){sm(e,n,l)}}function xv(e,n,t){t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(function(o){wv(e,n,o)},function(o){return sm(e,n,o)}):wv(e,n,t)}function wv(e,n,t){n.status="fulfilled",n.value=t,Nw(n),e.state=t,n=e.pending,n!==null&&(t=n.next,t===n?e.pending=null:(t=t.next,n.next=t,Aw(e,t)))}function sm(e,n,t){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=t,Nw(n),n=n.next;while(n!==o)}e.action=null}function Nw(e){e=e.listeners;for(var n=0;n<e.length;n++)(0,e[n])()}function Iw(e,n){return n}function bv(e,n){if(re){var t=Se.formState;if(t!==null){e:{var o=te;if(re){if(qe){n:{for(var r=qe,i=vt;r.nodeType!==8;){if(!i){r=null;break n}if(r=xt(r.nextSibling),r===null){r=null;break n}}i=r.data,r=i==="F!"||i==="F"?r:null}if(r){qe=xt(r.nextSibling),o=r.data==="F!";break e}}mr(o)}o=!1}o&&(n=t[0])}}return t=Tn(),t.memoizedState=t.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Iw,lastRenderedState:n},t.queue=o,t=Qw.bind(null,te,o),o.dispatch=t,o=am(!1),i=kh.bind(null,te,!1,o.queue),o=Tn(),r={state:n,dispatch:null,action:e,pending:null},o.queue=r,t=xq.bind(null,te,r,i,t),r.dispatch=t,o.memoizedState=e,[n,t,!1]}function kv(e){var n=Ge();return Ow(n,be,e)}function Ow(e,n,t){if(n=gh(e,n,Iw)[0],e=eu(_o)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=xc(n)}catch(a){throw a===La?Zu:a}else o=n;n=Ge();var r=n.queue,i=r.dispatch;return t!==n.memoizedState&&(te.flags|=2048,Ca(9,{destroy:void 0},wq.bind(null,r,t),null)),[o,i,e]}function wq(e,n){e.action=n}function Sv(e){var n=Ge(),t=be;if(t!==null)return Ow(n,t,e);Ge(),n=n.memoizedState,t=Ge();var o=t.queue.dispatch;return t.memoizedState=e,[n,o,!1]}function Ca(e,n,t,o){return e={tag:e,create:t,deps:o,inst:n,next:null},n=te.updateQueue,n===null&&(n=Qu(),te.updateQueue=n),t=n.lastEffect,t===null?n.lastEffect=e.next=e:(o=t.next,t.next=e,e.next=o,n.lastEffect=e),e}function zw(){return Ge().memoizedState}function nu(e,n,t,o){var r=Tn();te.flags|=e,r.memoizedState=Ca(1|n,{destroy:void 0},t,o===void 0?null:o)}function $u(e,n,t,o){var r=Ge();o=o===void 0?null:o;var i=r.memoizedState.inst;be!==null&&o!==null&&dh(o,be.memoizedState.deps)?r.memoizedState=Ca(n,i,t,o):(te.flags|=e,r.memoizedState=Ca(1|n,i,t,o))}function _v(e,n){nu(8390656,8,e,n)}function vh(e,n){$u(2048,8,e,n)}function bq(e){te.flags|=4;var n=te.updateQueue;if(n===null)n=Qu(),te.updateQueue=n,n.events=[e];else{var t=n.events;t===null?n.events=[e]:t.push(e)}}function Bw(e){var n=Ge().memoizedState;return bq({ref:n,nextImpl:e}),function(){if((pe&2)!==0)throw Error(L(440));return n.impl.apply(void 0,arguments)}}function Pw(e,n){return $u(4,2,e,n)}function Lw(e,n){return $u(4,4,e,n)}function jw(e,n){if(typeof n=="function"){e=e();var t=n(e);return function(){typeof t=="function"?t():n(null)}}if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Hw(e,n,t){t=t!=null?t.concat([e]):null,$u(4,4,jw.bind(null,n,e),t)}function xh(){}function Vw(e,n){var t=Ge();n=n===void 0?null:n;var o=t.memoizedState;return n!==null&&dh(n,o[1])?o[0]:(t.memoizedState=[e,n],e)}function Uw(e,n){var t=Ge();n=n===void 0?null:n;var o=t.memoizedState;if(n!==null&&dh(n,o[1]))return o[0];if(o=e(),ci){Wo(!0);try{e()}finally{Wo(!1)}}return t.memoizedState=[o,n],o}function wh(e,n,t){return t===void 0||(So&1073741824)!==0&&(ce&261930)===0?e.memoizedState=n:(e.memoizedState=t,e=Ob(),te.lanes|=e,gr|=e,t)}function Fw(e,n,t,o){return rt(t,n)?t:hr.current!==null?(e=wh(e,t,o),rt(e,n)||(Qe=!0),e):(So&106)===0||(So&1073741824)!==0&&(ce&261930)===0?(Qe=!0,e.memoizedState=t):(e=Ob(),te.lanes|=e,gr|=e,n)}function Yw(e,n,t,o,r){var i=me.p;me.p=i!==0&&8>i?i:8;var a=$.T,s={};s.types=a!==null?a.types:null,$.T=s,kh(e,!1,n,t);try{var c=r(),l=$.S;if(l!==null&&l(s,c),c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=yq(c,o);Fs(e,n,u,ot(e))}else Fs(e,n,o,ot(e))}catch(f){Fs(e,n,{then:function(){},status:"rejected",reason:f},ot())}finally{me.p=i,a!==null&&s.types!==null&&(a.types=s.types),$.T=a}}function kq(){}function cm(e,n,t,o){if(e.tag!==5)throw Error(L(476));var r=Gw(e).queue;Yw(e,r,n,$r,t===null?kq:function(){return Xw(e),t(o)})}function Gw(e){var n=e.memoizedState;if(n!==null)return n;n={memoizedState:$r,baseState:$r,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:_o,lastRenderedState:$r},next:null};var t={};return n.next={memoizedState:t,baseState:t,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:_o,lastRenderedState:t},next:null},e.memoizedState=n,e=e.alternate,e!==null&&(e.memoizedState=n),n}function Xw(e){var n=Gw(e);n.next===null&&(n=e.alternate.memoizedState),Fs(e,n.next.queue,{},ot())}function bh(){return dn(Ia)}function Kw(){return Ge().memoizedState}function Zw(){return Ge().memoizedState}function Sq(e){for(var n=e.return;n!==null;){switch(n.tag){case 24:case 3:var t=ot();e=ir(t);var o=ar(n,e,t);o!==null&&(jn(o,n,t),Hs(o,n,t)),n={cache:ih()},e.payload=n;return}n=n.return}}function _q(e,n,t){var o=ot();t={lane:o,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null},Ju(e)?Ww(n,t):(t=th(e,n,t,o),t!==null&&(jn(t,e,o),$w(t,n,o)))}function Qw(e,n,t){var o=ot();Fs(e,n,t,o)}function Fs(e,n,t,o){var r={lane:o,revertLane:0,gesture:null,action:t,hasEagerState:!1,eagerState:null,next:null};if(Ju(e))Ww(n,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=n.lastRenderedReducer,i!==null))try{var a=n.lastRenderedState,s=i(a,t);if(r.hasEagerState=!0,r.eagerState=s,rt(s,a))return Xu(e,n,r,0),Se===null&&Gu(),!1}catch{}finally{}if(t=th(e,n,r,o),t!==null)return jn(t,e,o),$w(t,n,o),!0}return!1}function kh(e,n,t,o){if(o={lane:2,revertLane:Nh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Ju(e)){if(n)throw Error(L(479))}else n=th(e,t,o,2),n!==null&&jn(n,e,2)}function Ju(e){var n=e.alternate;return e===te||n!==null&&n===te}function Ww(e,n){xa=Du=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function $w(e,n,t){if((t&4194048)!==0){var o=n.lanes;o&=e.pendingLanes,t|=o,n.lanes=t,zx(e,t)}}var Cu={readContext:dn,use:Wu,useCallback:je,useContext:je,useEffect:je,useImperativeHandle:je,useLayoutEffect:je,useInsertionEffect:je,useMemo:je,useReducer:je,useRef:je,useState:je,useDebugValue:je,useDeferredValue:je,useTransition:je,useSyncExternalStore:je,useId:je,useHostTransitionStatus:je,useFormState:je,useActionState:je,useOptimistic:je,useMemoCache:je,useCacheRefresh:je,useEffectEvent:je},Jw={readContext:dn,use:Wu,useCallback:function(e,n){return Tn().memoizedState=[e,n===void 0?null:n],e},useContext:dn,useEffect:_v,useImperativeHandle:function(e,n,t){t=t!=null?t.concat([e]):null,nu(4194308,4,jw.bind(null,n,e),t)},useLayoutEffect:function(e,n){return nu(4194308,4,e,n)},useInsertionEffect:function(e,n){nu(4,2,e,n)},useMemo:function(e,n){var t=Tn();n=n===void 0?null:n;var o=e();if(ci){Wo(!0);try{e()}finally{Wo(!1)}}return t.memoizedState=[o,n],o},useReducer:function(e,n,t){var o=Tn();if(t!==void 0){var r=t(n);if(ci){Wo(!0);try{t(n)}finally{Wo(!1)}}}else r=n;return o.memoizedState=o.baseState=r,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},o.queue=e,e=e.dispatch=_q.bind(null,te,e),[o.memoizedState,e]},useRef:function(e){var n=Tn();return e={current:e},n.memoizedState=e},useState:function(e){e=am(e);var n=e.queue,t=Qw.bind(null,te,n);return n.dispatch=t,[e.memoizedState,t]},useDebugValue:xh,useDeferredValue:function(e,n){var t=Tn();return wh(t,e,n)},useTransition:function(){var e=am(!1);return e=Yw.bind(null,te,e.queue,!0,!1),Tn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,n,t){var o=te,r=Tn();if(re){if(t===void 0)throw Error(L(407));t=t()}else{if(t=n(),Se===null)throw Error(L(349));(ce&127)!==0||Ew(o,n,t)}r.memoizedState=t;var i={value:t,getSnapshot:n};return r.queue=i,_v(Tw.bind(null,o,i,e),[e]),o.flags|=2048,Ca(9,{destroy:void 0},Cw.bind(null,o,i,t,n),null),t},useId:function(){var e=Tn(),n=Se.identifierPrefix;if(re){var t=Wt,o=Qt;t=(o&~(1<<32-tt(o)-1)).toString(32)+t,n="_"+n+"R_"+t,t=Eu++,0<t&&(n+="H"+t.toString(32)),n+="_"}else t=gq++,n="_"+n+"r_"+t.toString(32)+"_";return e.memoizedState=n},useHostTransitionStatus:bh,useFormState:bv,useActionState:bv,useOptimistic:function(e){var n=Tn();n.memoizedState=n.baseState=e;var t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=t,n=kh.bind(null,te,!0,t),t.dispatch=n,[e,n]},useMemoCache:yh,useCacheRefresh:function(){return Tn().memoizedState=Sq.bind(null,te)},useEffectEvent:function(e){var n=Tn(),t={impl:e};return n.memoizedState=t,function(){if((pe&2)!==0)throw Error(L(440));return t.impl.apply(void 0,arguments)}}},eb={readContext:dn,use:Wu,useCallback:Vw,useContext:dn,useEffect:vh,useImperativeHandle:Hw,useInsertionEffect:Pw,useLayoutEffect:Lw,useMemo:Uw,useReducer:eu,useRef:zw,useState:function(){return eu(_o)},useDebugValue:xh,useDeferredValue:function(e,n){var t=Ge();return Fw(t,be.memoizedState,e,n)},useTransition:function(){var e=eu(_o)[0],n=Ge().memoizedState;return[typeof e=="boolean"?e:xc(e),n]},useSyncExternalStore:Dw,useId:Kw,useHostTransitionStatus:bh,useFormState:kv,useActionState:kv,useOptimistic:function(e,n){var t=Ge();return Mw(t,be,e,n)},useMemoCache:yh,useCacheRefresh:Zw,useEffectEvent:Bw},Dq={readContext:dn,use:Wu,useCallback:Vw,useContext:dn,useEffect:vh,useImperativeHandle:Hw,useInsertionEffect:Pw,useLayoutEffect:Lw,useMemo:Uw,useReducer:vp,useRef:zw,useState:function(){return vp(_o)},useDebugValue:xh,useDeferredValue:function(e,n){var t=Ge();return be===null?wh(t,e,n):Fw(t,be.memoizedState,e,n)},useTransition:function(){var e=vp(_o)[0],n=Ge().memoizedState;return[typeof e=="boolean"?e:xc(e),n]},useSyncExternalStore:Dw,useId:Kw,useHostTransitionStatus:bh,useFormState:Sv,useActionState:Sv,useOptimistic:function(e,n){var t=Ge();return be!==null?Mw(t,be,e,n):(t.baseState=e,[e,t.queue.dispatch])},useMemoCache:yh,useCacheRefresh:Zw,useEffectEvent:Bw};function xp(e,n,t,o){n=e.memoizedState,t=t(o,n),t=t==null?n:_e({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var lm={enqueueSetState:function(e,n,t){e=e._reactInternals;var o=ot(),r=ir(o);r.payload=n,t!=null&&(r.callback=t),n=ar(e,r,o),n!==null&&(jn(n,e,o),Hs(n,e,o))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var o=ot(),r=ir(o);r.tag=1,r.payload=n,t!=null&&(r.callback=t),n=ar(e,r,o),n!==null&&(jn(n,e,o),Hs(n,e,o))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ot(),o=ir(t);o.tag=2,n!=null&&(o.callback=n),n=ar(e,o,t),n!==null&&(jn(n,e,t),Hs(n,e,t))}};function Dv(e,n,t,o,r,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,i,a):n.prototype&&n.prototype.isPureReactComponent?!Js(t,o)||!Js(r,i):!0}function Ev(e,n,t,o){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,o),n.state!==e&&lm.enqueueReplaceState(n,n.state,null)}function li(e,n){var t=n;if("ref"in n){t={};for(var o in n)o!=="ref"&&(t[o]=n[o])}if(e=e.defaultProps){t===n&&(t=_e({},t));for(var r in e)t[r]===void 0&&(t[r]=e[r])}return t}function nb(e){gu(e)}function tb(e){console.error(e)}function ob(e){gu(e)}function Tu(e,n){try{var t=e.onUncaughtError;t(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Cv(e,n,t){try{var o=e.onCaughtError;o(t.value,{componentStack:t.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function um(e,n,t){return t=ir(t),t.tag=3,t.payload={element:null},t.callback=function(){Tu(e,n)},t}function rb(e){return e=ir(e),e.tag=3,e}function ib(e,n,t,o){var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=o.value;e.payload=function(){return r(i)},e.callback=function(){Cv(n,t,o)}}var a=t.stateNode;a!==null&&typeof a.componentDidCatch=="function"&&(e.callback=function(){Cv(n,t,o),typeof r!="function"&&(lr===null?lr=new Set([this]):lr.add(this));var s=o.stack;this.componentDidCatch(o.value,{componentStack:s!==null?s:""})})}function Eq(e,n,t,o,r){if(t.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=t.alternate,n!==null&&ri(n,t,r,!0),t=hn.current,t!==null){switch(t.tag){case 31:case 13:case 19:return bn===null?zu():t.alternate===null&&He===0&&(He=3),t.flags&=-257,t.flags|=65536,t.lanes=r,o===ku?t.flags|=16384:(n=t.updateQueue,n===null?t.updateQueue=new Set([o]):n.add(o),Ep(e,o,r)),!1;case 22:return t.flags|=65536,o===ku?t.flags|=16384:(n=t.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},t.updateQueue=n):(t=n.retryQueue,t===null?n.retryQueue=new Set([o]):t.add(o)),Ep(e,o,r)),!1}throw Error(L(435,t.tag))}return Ep(e,o,r),zu(),!1}if(re)return n=hn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=r,o!==$p&&(e=Error(L(422),{cause:o}),nc(gt(e,t)))):(o!==$p&&(n=Error(L(423),{cause:o}),nc(gt(n,t))),e=e.current.alternate,e.flags|=65536,r&=-r,e.lanes|=r,o=gt(o,t),r=um(e.stateNode,o,r),gp(e,r),He!==4&&(He=2)),!1;var i=Error(L(520),{cause:o});if(i=gt(i,t),Ks===null?Ks=[i]:Ks.push(i),He!==4&&(He=2),n===null)return!0;o=gt(o,t),t=n;do{switch(t.tag){case 3:return t.flags|=65536,e=r&-r,t.lanes|=e,e=um(t.stateNode,o,e),gp(t,e),!1;case 1:if(n=t.type,i=t.stateNode,(t.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(lr===null||!lr.has(i))))return t.flags|=65536,r&=-r,t.lanes|=r,r=rb(r),ib(r,e,t,o),gp(t,r),!1;break;case 22:if(t.memoizedState!==null)return t.flags|=65536,!1}t=t.return}while(t!==null);return!1}var Sh=Error(L(461)),Qe=!1;function We(e,n,t,o){n.child=e===null?xw(n,null,t,o):si(n,e.child,t,o)}function Tv(e,n,t,o,r){t=t.render;var i=n.ref;if("ref"in o){var a={};for(var s in o)s!=="ref"&&(a[s]=o[s])}else a=o;return ii(n),o=fh(e,n,t,a,i,r),s=ph(),e!==null&&!Qe?(mh(e,n,r),Do(e,n,r)):(re&&s&&Ku(n),n.flags|=1,We(e,n,o,r),n.child)}function qv(e,n,t,o,r){if(e===null){var i=t.type;return typeof i=="function"&&!oh(i)&&i.defaultProps===void 0&&t.compare===null?(n.tag=15,n.type=i,ab(e,n,i,o,r)):(e=Wl(t.type,null,o,n,n.mode,r),e.ref=n.ref,e.return=n,n.child=e)}if(i=e.child,!Dh(e,r)){var a=i.memoizedProps;if(t=t.compare,t=t!==null?t:Js,t(a,o)&&e.ref===n.ref)return Do(e,n,r)}return n.flags|=1,e=xo(i,o),e.ref=n.ref,e.return=n,n.child=e}function ab(e,n,t,o,r){if(e!==null){var i=e.memoizedProps;if(Js(i,o)&&e.ref===n.ref)if(Qe=!1,n.pendingProps=o=i,Dh(e,r))(e.flags&131072)!==0&&(Qe=!0);else return n.lanes=e.lanes,Do(e,n,r)}return dm(e,n,t,o,r)}function sb(e,n,t,o){var r=o.children,i=e!==null?e.memoizedState:null;if(e===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(i=i!==null?i.baseLanes|t:t,e!==null){for(o=n.child=e.child,r=0;o!==null;)r=r|o.lanes|o.childLanes,o=o.sibling;o=r&~i}else o=0,n.child=null;return Rv(e,n,i,t,o)}if((t&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},e!==null&&Jl(n,i!==null?i.cachePool:null),i!==null?vv(n,i):rm(),kw(n);else return o=n.lanes=536870912,Rv(e,n,i!==null?i.baseLanes|t:t,t,o)}else i!==null?(Jl(n,i.cachePool),vv(n,i),cr(),n.memoizedState=null):(e!==null&&Jl(n,null),rm(),cr());return We(e,n,r,t),n.child}function Ys(e,n){return e!==null&&e.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Rv(e,n,t,o,r){var i=ah();return i=i===null?null:{parent:Ze._currentValue,pool:i},n.memoizedState={baseLanes:t,cachePool:i},e!==null&&Jl(n,null),rm(),kw(n),e!==null&&ri(e,n,o,!0),n.childLanes=r,null}function tu(e,n){return n=ed({mode:n.mode,children:n.children},e.mode),n.ref=e.ref,e.child=n,n.return=e,n}function Mv(e,n,t){return si(n,e.child,null,t),e=tu(n,n.pendingProps),e.flags|=2,Wn(n),n.memoizedState=null,e}function Cq(e,n,t){var o=n.pendingProps,r=(n.flags&128)!==0;if(n.flags&=-129,e===null){if(re){if(o.mode==="hidden")return e=tu(n,o),n.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Ys(null,e);if(im(n),(e=qe)?(e=s1(e,vt),e=e!==null&&e.data==="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:pr!==null?{id:Qt,overflow:Wt}:null,retryLane:536870912,hydrationErrors:null},t=fw(e),t.return=n,n.child=t,an=n,qe=null)):e=null,e===null)throw mr(n);return n.lanes=536870912,null}return tu(n,o)}var i=e.memoizedState;if(i!==null){var a=i.dehydrated;if(im(n),r)if(n.flags&256)n.flags&=-257,n=Mv(e,n,t);else if(n.memoizedState!==null)n.child=e.child,n.flags|=128,n=null;else throw Error(L(558));else if(Qe||ri(e,n,t,!1),r=(t&e.childLanes)!==0,Qe||r){if(hr.current===null){if(o=Se,o!==null&&(a=Bx(o,t),a!==0&&a!==i.retryLane))throw i.retryLane=a,mi(e,a),jn(o,e,a),Sh;zu()}n=Mv(e,n,t)}else e=i.treeContext,qe=xt(a.nextSibling),an=n,re=!0,rr=null,vt=!1,e!==null&&mw(n,e),n=tu(n,o),n.flags|=134221824;return n}return e=xo(e.child,{mode:o.mode,children:o.children}),e.ref=n.ref,n.child=e,e.return=n,e}function Ji(e,n){var t=n.ref;if(t===null)e!==null&&e.ref!==null&&(n.flags|=4194816);else{if(typeof t!="function"&&typeof t!="object")throw Error(L(284));(e===null||e.ref!==t)&&(n.flags|=4194816)}}function dm(e,n,t,o,r){return ii(n),t=fh(e,n,t,o,void 0,r),o=ph(),e!==null&&!Qe?(mh(e,n,r),Do(e,n,r)):(re&&o&&Ku(n),n.flags|=1,We(e,n,t,r),n.child)}function Av(e,n,t,o,r,i){return ii(n),n.updateQueue=null,t=_w(n,o,t,r),Sw(e),o=ph(),e!==null&&!Qe?(mh(e,n,i),Do(e,n,i)):(re&&o&&Ku(n),n.flags|=1,We(e,n,t,i),n.child)}function Nv(e,n,t,o,r){if(ii(n),n.stateNode===null){var i=ua,a=t.contextType;typeof a=="object"&&a!==null&&(i=dn(a)),i=new t(o,i),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=lm,n.stateNode=i,i._reactInternals=n,i=n.stateNode,i.props=o,i.state=n.memoizedState,i.refs={},ch(n),a=t.contextType,i.context=typeof a=="object"&&a!==null?dn(a):ua,i.state=n.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(xp(n,t,a,o),i.state=n.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(a=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),a!==i.state&&lm.enqueueReplaceState(i,i.state,null),Us(n,o,i,r),Vs(),i.state=n.memoizedState),typeof i.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(e===null){i=n.stateNode;var s=n.memoizedProps,c=li(t,s);i.props=c;var l=i.context,u=t.contextType;a=ua,typeof u=="object"&&u!==null&&(a=dn(u));var f=t.getDerivedStateFromProps;u=typeof f=="function"||typeof i.getSnapshotBeforeUpdate=="function",s=n.pendingProps!==s,u||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s||l!==a)&&Ev(n,i,o,a),Zo=!1;var d=n.memoizedState;i.state=d,Us(n,o,i,r),Vs(),l=n.memoizedState,s||d!==l||Zo?(typeof f=="function"&&(xp(n,t,f,o),l=n.memoizedState),(c=Zo||Dv(n,t,c,o,d,l,a))?(u||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(n.flags|=4194308)):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=l),i.props=o,i.state=l,i.context=a,o=c):(typeof i.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{i=n.stateNode,tm(e,n),a=n.memoizedProps,u=li(t,a),i.props=u,f=n.pendingProps,d=i.context,l=t.contextType,c=ua,typeof l=="object"&&l!==null&&(c=dn(l)),s=t.getDerivedStateFromProps,(l=typeof s=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(a!==f||d!==c)&&Ev(n,i,o,c),Zo=!1,d=n.memoizedState,i.state=d,Us(n,o,i,r),Vs();var p=n.memoizedState;a!==f||d!==p||Zo||e!==null&&e.dependencies!==null&&bu(e.dependencies)?(typeof s=="function"&&(xp(n,t,s,o),p=n.memoizedState),(u=Zo||Dv(n,t,u,o,d,p,c)||e!==null&&e.dependencies!==null&&bu(e.dependencies))?(l||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(o,p,c),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(o,p,c)),typeof i.componentDidUpdate=="function"&&(n.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=p),i.props=o,i.state=p,i.context=c,o=u):(typeof i.componentDidUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&d===e.memoizedState||(n.flags|=1024),o=!1)}return i=o,Ji(e,n),o=(n.flags&128)!==0,i||o?(i=n.stateNode,t=o&&typeof t.getDerivedStateFromError!="function"?null:i.render(),n.flags|=1,e!==null&&o?(n.child=si(n,e.child,null,r),n.child=si(n,null,t,r)):We(e,n,t,r),n.memoizedState=i.state,e=n.child):e=Do(e,n,r),e}function Iv(e,n,t,o){return oi(),n.flags|=256,We(e,n,t,o),n.child}var fm={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function pm(e){return{baseLanes:e,cachePool:yw()}}function mm(e,n,t){return e=e!==null?e.childLanes&~t:0,n&&(e|=Jn),e}function cb(e,n,t){var o=n.pendingProps,r=!1,i=(n.flags&128)!==0,a;if((a=i)||(a=e!==null&&e.memoizedState===null?!1:(pn.current&2)!==0),a&&(r=!0,n.flags&=-129),a=(n.flags&32)!==0,n.flags&=-33,e===null){if(re){if(r?sr(n):cr(),(e=qe)?(e=s1(e,vt),e=e!==null&&e.data!=="&"?e:null,e!==null&&(n.memoizedState={dehydrated:e,treeContext:pr!==null?{id:Qt,overflow:Wt}:null,retryLane:536870912,hydrationErrors:null},t=fw(e),t.return=n,n.child=t,an=n,qe=null)):e=null,e===null)throw mr(n);return Bh(e)?n.lanes=32:n.lanes=536870912,null}return i=o.children,o=o.fallback,r?(cr(),r=n.mode,i=ed({mode:"hidden",children:i},r),o=Jr(o,r,t,null),i.return=n,o.return=n,i.sibling=o,n.child=i,o=n.child,o.memoizedState=pm(t),o.childLanes=mm(e,a,t),n.memoizedState=fm,Ys(null,o)):(sr(n),_h(n,i))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return Tq(e,n,i,a,o,c,s,t)}return r?(cr(),r=o.fallback,i=n.mode,s=e.child,c=s.sibling,o=xo(s,{mode:"hidden",children:o.children}),o.subtreeFlags=s.subtreeFlags&1206910976,c!==null?r=xo(c,r):(r=Jr(r,i,t,null),r.flags|=2),r.return=n,o.return=n,o.sibling=r,n.child=o,Ys(null,o),o=n.child,r=e.child.memoizedState,r===null?r=pm(t):(i=r.cachePool,i!==null?(s=Ze._currentValue,i=i.parent!==s?{parent:s,pool:s}:i):i=yw(),r={baseLanes:r.baseLanes|t,cachePool:i}),o.memoizedState=r,o.childLanes=mm(e,a,t),n.memoizedState=fm,Ys(e.child,o)):(sr(n),t=e.child,e=t.sibling,t=xo(t,{mode:"visible",children:o.children}),t.return=n,t.sibling=null,e!==null&&(a=n.deletions,a===null?(n.deletions=[e],n.flags|=16):a.push(e)),n.child=t,n.memoizedState=null,t)}function _h(e,n){return n=ed({mode:"visible",children:n},e.mode),n.return=e,e.child=n}function ed(e,n){return e=Ln(22,e,null,n),e.lanes=0,e}function Bl(e,n,t){return si(n,e.child,null,t),e=_h(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Tq(e,n,t,o,r,i,a,s){if(t)return n.flags&256?(sr(n),n.flags&=-257,Bl(e,n,s)):n.memoizedState!==null?(cr(),n.child=e.child,n.flags|=128,null):(cr(),i=r.fallback,a=n.mode,r=ed({mode:"visible",children:r.children},a),i=Jr(i,a,s,null),i.flags|=2,r.return=n,i.return=n,r.sibling=i,n.child=r,si(n,e.child,null,s),r=n.child,r.memoizedState=pm(s),r.childLanes=mm(e,o,s),n.memoizedState=fm,Ys(null,r));if(sr(n),Bh(i)){if(o=i.nextSibling&&i.nextSibling.dataset,o)var c=o.dgst;return o=c,o!==""&&(r=Error(L(419)),r.stack="",r.digest=o,nc({value:r,source:null,stack:null})),Bl(e,n,s)}if(Qe||ri(e,n,s,!1),o=(s&e.childLanes)!==0,Qe||o){if(hr.current!==null)return Bl(e,n,s);if(o=Se,o!==null&&(r=Bx(o,s),r!==0&&r!==a.retryLane))throw a.retryLane=r,mi(e,r),jn(o,e,r),Sh;return Lm(i)||zu(),Bl(e,n,s)}return Lm(i)?(n.flags|=192,n.child=e.child,null):(e=a.treeContext,qe=xt(i.nextSibling),an=n,re=!0,rr=null,vt=!1,e!==null&&mw(n,e),n=_h(n,r.children),n.flags|=134221824,n)}function Ov(e,n,t){e.lanes|=n;var o=e.alternate;o!==null&&(o.lanes|=n),$l(e.return,n,t)}function zv(e){for(var n=null;e!==null;){var t=e.alternate;t!==null&&_u(t)===null&&(n=e),e=e.sibling}return n}function Pl(e,n,t,o,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:t,tailMode:r,treeForkCount:i}:(a.isBackwards=n,a.rendering=null,a.renderingStartTime=0,a.last=o,a.tail=t,a.tailMode=r,a.treeForkCount=i)}function wp(e){var n=e.child;for(e.child=null;n!==null;){var t=n.sibling;n.sibling=e.child,e.child=n,n=t}}function hm(e,n,t){var o=n.pendingProps,r=o.revealOrder,i=o.tail;o=o.children;var a=pn.current;if(n.flags&128)return oc(n,a),null;var s=(a&2)!==0;if(s?(a=a&1|2,n.flags|=128):a&=1,oc(n,a),r==="backwards"&&e!==null?(wp(e),We(e,n,o,t),wp(e)):We(e,n,o,t),o=re?ec:0,!s&&e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ov(e,t,n);else if(e.tag===19)Ov(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(r){case"backwards":t=zv(n.child),t===null?(r=n.child,n.child=null):(r=t.sibling,t.sibling=null,wp(n)),Pl(n,!0,r,null,i,o);break;case"unstable_legacy-backwards":for(t=null,r=n.child,n.child=null;r!==null;){if(e=r.alternate,e!==null&&_u(e)===null){n.child=r;break}e=r.sibling,r.sibling=t,t=r,r=e}Pl(n,!0,t,null,i,o);break;case"together":Pl(n,!1,null,null,void 0,o);break;case"independent":n.memoizedState=null;break;default:t=zv(n.child),t===null?(r=n.child,n.child=null):(r=t.sibling,t.sibling=null),Pl(n,!1,r,t,i,o)}return n.child}function Bv(e,n,t){var o=n.pendingProps;return Jo(n,n.type,o.value),We(e,n,o.children,t),n.child}function Do(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),gr|=n.lanes,(t&n.childLanes)===0)if(e!==null){if(ri(e,n,t,!1),(t&n.childLanes)===0)return null}else return null;if(e!==null&&n.child!==e.child)throw Error(L(153));if(n.child!==null){for(e=n.child,t=xo(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=xo(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Dh(e,n){return(e.lanes&n)!==0?!0:(e=e.dependencies,!!(e!==null&&bu(e)))}function qq(e,n,t){switch(n.tag){case 3:pu(n,n.stateNode.containerInfo),Jo(n,Ze,e.memoizedState.cache),oi();break;case 27:case 5:Vp(n);break;case 4:pu(n,n.stateNode.containerInfo);break;case 10:Jo(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,im(n),null;break;case 13:var o=n.memoizedState;if(o!==null){if(o.dehydrated!==null)return sr(n),n.flags|=128,null;o=ri(e,n,t,!1);var r=n.child.childLanes;return o||(t&r)!==0?cb(e,n,t):(sr(n),e=Do(e,n,t),e!==null?e.sibling:null)}sr(n);break;case 19:if(n.flags&128)return hm(e,n,t);if(r=(e.flags&128)!==0,o=(t&n.childLanes)!==0,o||(ri(e,n,t,!1),o=(t&n.childLanes)!==0),r){if(o)return hm(e,n,t);n.flags|=128}if(r=n.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),oc(n,pn.current),o)break;return null;case 22:return n.lanes=0,sb(e,n,t,n.pendingProps);case 24:Jo(n,Ze,e.memoizedState.cache)}return Do(e,n,t)}function lb(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps)Qe=!0;else{if(!Dh(e,t)&&(n.flags&128)===0)return Qe=!1,qq(e,n,t);Qe=(e.flags&131072)!==0}else Qe=!1,re&&(n.flags&1048576)!==0&&pw(n,ec,n.index);switch(n.lanes=0,n.tag){case 16:e:{var o=n.pendingProps;if(e=Kr(n.elementType),n.type=e,typeof e=="function")oh(e)?(o=li(e,o),n.tag=1,n=Nv(null,n,e,o,t)):(n.tag=0,n=dm(null,n,e,o,t));else{if(e!=null){var r=e.$$typeof;if(r===Fm){n.tag=11,n=Tv(null,n,e,o,t);break e}else if(r===Ym){n.tag=14,n=qv(null,n,e,o,t);break e}else if(r===Kt){n.tag=10,n.type=e,n=Bv(null,n,t);break e}}throw n=jp(e)||e,Error(L(306,n,""))}}return n;case 0:return dm(e,n,n.type,n.pendingProps,t);case 1:return o=n.type,r=li(o,n.pendingProps),Nv(e,n,o,r,t);case 3:e:{if(pu(n,n.stateNode.containerInfo),e===null)throw Error(L(387));o=n.pendingProps;var i=n.memoizedState;r=i.element,tm(e,n),Us(n,o,null,t);var a=n.memoizedState;if(o=a.cache,Jo(n,Ze,o),o!==i.cache&&em(n,[Ze],t,!0),Vs(),o=a.element,i.isDehydrated)if(i={element:o,isDehydrated:!1,cache:a.cache},n.updateQueue.baseState=i,n.memoizedState=i,n.flags&256){n=Iv(e,n,o,t);break e}else if(o!==r){r=gt(Error(L(424)),n),nc(r),n=Iv(e,n,o,t);break e}else{switch(e=n.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(qe=xt(e.firstChild),an=n,re=!0,rr=null,vt=!0,t=xw(n,null,o,t),n.child=t;t;)t.flags=t.flags&-3|134221824,t=t.sibling}else{if(oi(),o===r){n=Do(e,n,t);break e}We(e,n,o,t)}n=n.child}return n;case 26:return Ji(e,n),e===null?(t=ux(n.type,null,n.pendingProps,null))?n.memoizedState=t:re||(n.stateNode=$b(n.type,n.pendingProps,or.current,n)):n.memoizedState=ux(n.type,e.memoizedProps,n.pendingProps,e.memoizedState),null;case 27:return Vp(n),e===null&&re&&(o=n.stateNode=c1(n.type,n.pendingProps,or.current),an=n,vt=!0,r=qe,xr(n.type)?(jm=r,qe=xt(o.firstChild)):qe=r),We(e,n,n.pendingProps.children,t),Ji(e,n),e===null&&(n.flags|=4194304),n.child;case 5:return e===null&&re&&((r=o=qe)&&(o=bR(o,n.type,n.pendingProps,vt),o!==null?(n.stateNode=o,an=n,qe=xt(o.firstChild),vt=!1,r=!0):r=!1),r||mr(n)),Vp(n),r=n.type,i=n.pendingProps,a=e!==null?e.memoizedProps:null,o=i.children,zm(r,i)?o=null:a!==null&&zm(r,a)&&(n.flags|=32),n.memoizedState!==null&&(r=fh(e,n,vq,null,null,t),Ia._currentValue=r),Ji(e,n),We(e,n,o,t),n.child;case 6:return e===null&&re&&((e=t=qe)&&(t=kR(t,n.pendingProps,vt),t!==null?(n.stateNode=t,an=n,qe=null,e=!0):e=!1),e||mr(n)),null;case 13:return cb(e,n,t);case 4:return pu(n,n.stateNode.containerInfo),o=n.pendingProps,e===null?n.child=si(n,null,o,t):We(e,n,o,t),n.child;case 11:return Tv(e,n,n.type,n.pendingProps,t);case 7:return o=n.pendingProps,Ji(e,n),We(e,n,o,t),n.child;case 8:return We(e,n,n.pendingProps.children,t),n.child;case 12:return We(e,n,n.pendingProps.children,t),n.child;case 10:return Bv(e,n,t);case 9:return r=n.type._context,o=n.pendingProps.children,ii(n),r=dn(r),o=o(r),n.flags|=1,We(e,n,o,t),n.child;case 14:return qv(e,n,n.type,n.pendingProps,t);case 15:return ab(e,n,n.type,n.pendingProps,t);case 19:return hm(e,n,t);case 31:return Cq(e,n,t);case 22:return sb(e,n,t,n.pendingProps);case 24:return ii(n),o=dn(Ze),e===null?(r=ah(),r===null&&(r=Se,i=ih(),r.pooledCache=i,i.refCount++,i!==null&&(r.pooledCacheLanes|=t),r=i),n.memoizedState={parent:o,cache:r},ch(n),Jo(n,Ze,r)):((e.lanes&t)!==0&&(tm(e,n),Us(n,null,null,t),Vs()),r=e.memoizedState,i=n.memoizedState,r.parent!==o?(r={parent:o,cache:o},n.memoizedState=r,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=r),Jo(n,Ze,o)):(o=i.cache,Jo(n,Ze,o),o!==r.cache&&em(n,[Ze],t,!0))),We(e,n,n.pendingProps.children,t),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),o=n.pendingProps,o.name!=null&&o.name!=="auto"?n.flags|=e===null?18882560:18874368:re&&Ku(n),e!==null&&e.memoizedProps.name!==o.name?n.flags|=4194816:Ji(e,n),We(e,n,o.children,t),n.child;case 29:throw n.pendingProps}throw Error(L(156,n.tag))}function yo(e){e.flags|=4}function bp(e,n,t,o,r){var i;if((i=(e.mode&32)!==0)&&(i=t===null?px(n,o):px(n,o)&&(o.src!==t.src||o.srcSet!==t.srcSet)),i){if(e.flags|=16777216,(r&335544128)===r)if(e.stateNode.complete)e.flags|=8192;else if(Pb())e.flags|=8192;else throw ni=ku,sh}else e.flags&=-16777217}function Pv(e,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!f1(n))if(Pb())e.flags|=8192;else throw ni=ku,sh}function Ll(e,n){n!==null&&(e.flags|=4),e.flags&16384&&(n=e.tag!==22?Ix():536870912,e.lanes|=n,Ta|=n)}function Ts(e,n){if(!re)switch(e.tailMode){case"visible":break;case"collapsed":for(var t=e.tail,o=null;t!==null;)t.alternate!==null&&(o=t),t=t.sibling;o===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null;break;default:for(n=e.tail,t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null}}function Te(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,o=0;if(n)for(var r=e.child;r!==null;)t|=r.lanes|r.childLanes,o|=r.subtreeFlags&1206910976,o|=r.flags&1206910976,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)t|=r.lanes|r.childLanes,o|=r.subtreeFlags,o|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=o,e.childLanes=t,n}function Rq(e,n,t){var o=n.pendingProps;switch(rh(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Te(n),null;case 1:return Te(n),null;case 3:return t=n.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),wo(Ze),_a(),t.pendingContext&&(t.context=t.pendingContext,t.pendingContext=null),(e===null||e.child===null)&&(Wi(n)?yo(n):e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,yp())),Te(n),null;case 26:var r=n.type,i=n.memoizedState;return e===null?(yo(n),i!==null?(Te(n),Pv(n,i)):(Te(n),bp(n,r,null,o,t))):i?i!==e.memoizedState?(yo(n),Te(n),Pv(n,i)):(Te(n),n.flags&=-16777217):(e=e.memoizedProps,e!==o&&yo(n),Te(n),bp(n,r,e,o,t)),null;case 27:if(mu(n),t=or.current,r=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&yo(n);else{if(!o){if(n.stateNode===null)throw Error(L(166));return Te(n),n.subtreeFlags&=-33554433,null}e=$t.current,Wi(n)?dv(n,e):(e=c1(r,o,t),n.stateNode=e,yo(n))}return Te(n),n.subtreeFlags&=-33554433,null;case 5:if(mu(n),r=n.type,e!==null&&n.stateNode!=null)e.memoizedProps!==o&&yo(n);else{if(!o){if(n.stateNode===null)throw Error(L(166));return Te(n),n.subtreeFlags&=-33554433,null}if(i=$t.current,Wi(n))dv(n,i);else{var a=sc(or.current);switch(i){case 1:i=a.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:i=a.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":i=a.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":i=a.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":i=a.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof o.is=="string"?a.createElement("select",{is:o.is}):a.createElement("select"),o.multiple?i.multiple=!0:o.size&&(i.size=o.size);break;default:i=typeof o.is=="string"?a.createElement(r,{is:o.is}):a.createElement(r)}}i[un]=n,i[Vn]=o;e:for(a=n.child;a!==null;){if(a.tag===5||a.tag===6)i.appendChild(a.stateNode);else if(a.tag!==4&&a.tag!==27&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===n)break e;for(;a.sibling===null;){if(a.return===null||a.return===n)break e;a=a.return}a.sibling.return=a.return,a=a.sibling}n.stateNode=i;e:switch(mn(i,r,o),r){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break e;case"img":o=!0;break e;default:o=!1}o&&yo(n)}}return Te(n),n.subtreeFlags&=-33554433,bp(n,n.type,e===null?null:e.memoizedProps,n.pendingProps,t),null;case 6:if(e&&n.stateNode!=null)e.memoizedProps!==o&&yo(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(L(166));if(e=or.current,Wi(n)){if(e=n.stateNode,t=n.memoizedProps,o=null,r=an,r!==null)switch(r.tag){case 27:case 5:o=r.memoizedProps}e[un]=n,e=!!(e.nodeValue===t||o!==null&&o.suppressHydrationWarning===!0||Qb(e.nodeValue,t)),e||mr(n,!0)}else e=sc(e).createTextNode(o),e[un]=n,n.stateNode=e}return Te(n),null;case 31:if(t=n.memoizedState,e===null||e.memoizedState!==null){if(o=Wi(n),t!==null){if(e===null){if(!o)throw Error(L(318));if(e=n.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(L(557));e[un]=n}else oi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Te(n),e=!1}else t=yp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=t),e=!0;if(!e)return n.flags&256?(Wn(n),n):(Wn(n),null);if((n.flags&128)!==0)throw Error(L(558))}return Te(n),null;case 13:if(o=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(r=Wi(n),o!==null&&o.dehydrated!==null){if(e===null){if(!r)throw Error(L(318));if(r=n.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(L(317));r[un]=n}else oi(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Te(n),r=!1}else r=yp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),r=!0;if(!r)return n.flags&256?(Wn(n),n):(Wn(n),null)}return Wn(n),(n.flags&128)!==0?(n.lanes=t,n):(t=o!==null,e=e!==null&&e.memoizedState!==null,t&&(o=n.child,r=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(r=o.alternate.memoizedState.cachePool.pool),i=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(i=o.memoizedState.cachePool.pool),i!==r&&(o.flags|=2048)),t!==e&&t&&(n.child.flags|=8192),Ll(n,n.updateQueue),Te(n),null);case 4:return _a(),e===null&&Ih(n.stateNode.containerInfo),n.flags|=67108864,Te(n),null;case 10:return wo(n.type),Te(n),null;case 19:if(uh(n),o=n.memoizedState,o===null)return Te(n),null;if(r=(n.flags&128)!==0,i=o.rendering,i===null)if(r)Ts(o,!1);else{if(He!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(i=_u(e),i!==null){for(n.flags|=128,Ts(o,!1),e=i.updateQueue,n.updateQueue=e,Ll(n,e),n.subtreeFlags=0,e=t,t=n.child;t!==null;)dw(t,e),t=t.sibling;return oc(n,pn.current&1|2),re&&go(n,o.treeForkCount),n.child}e=e.sibling}o.tail!==null&&et()>Iu&&(n.flags|=128,r=!0,Ts(o,!1),n.lanes=4194304)}else{if(!r)if(e=_u(i),e!==null){if(n.flags|=128,r=!0,e=e.updateQueue,n.updateQueue=e,Ll(n,e),Ts(o,!0),o.tail===null&&o.tailMode!=="collapsed"&&o.tailMode!=="visible"&&!i.alternate&&!re)return Te(n),null}else 2*et()-o.renderingStartTime>Iu&&t!==536870912&&(n.flags|=128,r=!0,Ts(o,!1),n.lanes=4194304);o.isBackwards?(i.sibling=n.child,n.child=i):(e=o.last,e!==null?e.sibling=i:n.child=i,o.last=i)}if(o.tail!==null){e=o.tail;e:{for(t=e;t!==null;){if(t.alternate!==null){t=!1;break e}t=t.sibling}t=!0}return o.rendering=e,o.tail=e.sibling,o.renderingStartTime=et(),e.sibling=null,i=pn.current,i=r?i&1|2:i&1,o.tailMode==="visible"||o.tailMode==="collapsed"||!t||re?oc(n,i):(t=i,Re(hn,n),Re(pn,t),bn===null&&(bn=n)),re&&go(n,o.treeForkCount),e}return Te(n),null;case 22:case 23:return Wn(n),lh(),o=n.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(t&536870912)!==0&&(n.flags&128)===0&&(Te(n),n.subtreeFlags&6&&(n.flags|=8192)):Te(n),t=n.updateQueue,t!==null&&Ll(n,t.retryQueue),t=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==t&&(n.flags|=2048),e!==null&&fn(ei),null;case 24:return t=null,e!==null&&(t=e.memoizedState.cache),n.memoizedState.cache!==t&&(n.flags|=2048),wo(Ze),Te(n),null;case 25:return null;case 30:return n.flags|=33554432,Te(n),null}throw Error(L(156,n.tag))}function Mq(e,n){switch(rh(n),n.tag){case 1:return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return wo(Ze),_a(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 26:case 27:case 5:return mu(n),null;case 31:if(n.memoizedState!==null){if(Wn(n),n.alternate===null)throw Error(L(340));oi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 13:if(Wn(n),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(L(340));oi()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return uh(n),e=n.flags,e&65536?(n.flags=e&-65537|128,e=n.memoizedState,e!==null&&(e.rendering=null,e.tail=null),n.flags|=4,n):null;case 4:return _a(),null;case 10:return wo(n.type),null;case 22:case 23:return Wn(n),lh(),e!==null&&fn(ei),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 24:return wo(Ze),null;case 25:return null;default:return null}}function ub(e,n){switch(rh(n),n.tag){case 3:wo(Ze),_a();break;case 26:case 27:case 5:mu(n);break;case 4:_a();break;case 31:n.memoizedState!==null&&Wn(n);break;case 13:Wn(n);break;case 19:uh(n);break;case 10:wo(n.type);break;case 22:case 23:Wn(n),lh(),e!==null&&fn(ei);break;case 24:wo(Ze)}}function wc(e,n){try{var t=n.updateQueue,o=t!==null?t.lastEffect:null;if(o!==null){var r=o.next;t=r;do{if((t.tag&e)===e){o=void 0;var i=t.create,a=t.inst;o=i(),a.destroy=o}t=t.next}while(t!==r)}}catch(s){xe(n,n.return,s)}}function yr(e,n,t){try{var o=n.updateQueue,r=o!==null?o.lastEffect:null;if(r!==null){var i=r.next;o=i;do{if((o.tag&e)===e){var a=o.inst,s=a.destroy;if(s!==void 0){a.destroy=void 0,r=n;var c=t,l=s;try{l()}catch(u){xe(r,c,u)}}}o=o.next}while(o!==i)}}catch(u){xe(n,n.return,u)}}function db(e){var n=e.updateQueue;if(n!==null){var t=e.stateNode;try{bw(n,t)}catch(o){xe(e,e.return,o)}}}function fb(e,n,t){t.props=li(e.type,e.memoizedProps),t.state=e.memoizedState;try{t.componentWillUnmount()}catch(o){xe(e,n,o)}}function Gt(e,n){try{var t=e.ref;if(t!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:var r=e.stateNode,i=ko(e.memoizedProps,r);(r.ref===null||r.ref.name!==i)&&(r.ref=t1(i)),o=r.ref;break;case 7:if(e.stateNode===null){var a=new it(e);Hn(e.child,!1,xR,a,void 0,void 0),e.stateNode=a}o=e.stateNode;break;default:o=e.stateNode}typeof t=="function"?e.refCleanup=t(o):t.current=o}}catch(s){xe(e,n,s)}}function ln(e,n){var t=e.ref,o=e.refCleanup;if(t!==null)if(typeof o=="function")try{o()}catch(r){xe(e,n,r)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof t=="function")try{t(null)}catch(r){xe(e,n,r)}else t.current=null}function qu(e,n){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&n!==null)for(var t=0;t<n.length;t++)a1(e.stateNode,n[t])}function Lv(e){for(var n=e.return;n!==null&&(Ch(n)&&a1(e.stateNode,n.stateNode),!Eh(n));)n=n.return}function Gs(e){for(var n=e.return;n!==null&&(Ch(n)&&wR(e.stateNode,n.stateNode),!Eh(n));)n=n.return}function Eh(e){return e.tag===5||e.tag===3||e.tag===27}function Ch(e){return e&&e.tag===7&&e.stateNode!==null}function ym(e){var n=e.type,t=e.memoizedProps,o=e.stateNode;try{e:switch(n){case"button":case"input":case"select":case"textarea":t.autoFocus&&o.focus();break e;case"img":t.src?o.src=t.src:t.srcSet&&(o.srcset=t.srcSet)}}catch(r){xe(e,e.return,r)}}function kp(e,n,t){try{var o=e.stateNode;nR(o,e.type,t,n),o[Vn]=n}catch(r){xe(e,e.return,r)}}function pb(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&xr(e.type)||e.tag===4}function Sp(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||pb(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&xr(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function gm(e,n,t,o){var r=e.tag;if(r===5||r===6)r=e.stateNode,n?(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t).insertBefore(r,n):(n=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.appendChild(r),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=Zt)),qu(e,o),de=!0;else if(r!==4&&(r===27&&(qu(e,o),o=null,xr(e.type)&&(t=e.stateNode,n=null)),e=e.child,e!==null))for(gm(e,n,t,o),e=e.sibling;e!==null;)gm(e,n,t,o),e=e.sibling}function Ru(e,n,t,o){var r=e.tag;if(r===5||r===6)r=e.stateNode,n?t.insertBefore(r,n):t.appendChild(r),qu(e,o),de=!0;else if(r!==4&&(r===27&&(qu(e,o),o=null,xr(e.type)&&(t=e.stateNode)),e=e.child,e!==null))for(Ru(e,n,t,o),e=e.sibling;e!==null;)Ru(e,n,t,o),e=e.sibling}function mb(e){var n=e.stateNode,t=e.memoizedProps;try{for(var o=e.type,r=n.attributes;r.length;)n.removeAttributeNode(r[0]);mn(n,o,t),n[un]=e,n[Vn]=t}catch(i){xe(e,e.return,i)}}var Mu=!1,$n=null;function jv(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(Mu=!0)}var Xt=null;function Hv(){var e=Xt;return Xt=null,e}var Pn=0;function ja(e,n,t,o,r){return Pn=0,hb(e.child,n,t,o,r)}function hb(e,n,t,o,r){for(var i=!1;e!==null;){if(e.tag===5){var a=e.stateNode;if(o!==null){var s=Bm(a);o.push(s),s.view&&(i=!0)}else i||Bm(a).view&&(i=!0);Mu=!0,Jb(a,Pn===0?n:n+"_"+Pn,t),Pn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&r||hb(e.child,n,t,o,r)&&(i=!0));e=e.sibling}return i}function eo(e,n){for(;e!==null;)e.tag===5?e1(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&n||eo(e.child,n)),e=e.sibling}function ou(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(ou(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var n=e.memoizedProps;if(n.name==null||n.name==="auto")throw Error(L(544));var t=n.name;n=To(n.default,n.share),n!=="none"&&(ja(e,t,n,null,!1)||eo(e.child,!1))}e=e.sibling}}function vm(e,n){if(e.tag===30){var t=e.stateNode,o=e.memoizedProps,r=ko(o,t),i=To(o.default,t.paired?o.share:o.enter);i!=="none"?ja(e,r,i,null,!1)?(ou(e),t.paired||n||qa(e,o.onEnter)):eo(e.child,!1):ou(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)vm(e,n),e=e.sibling;else ou(e)}function xm(e){if($n!==null&&$n.size!==0){var n=$n;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.memoizedProps,o=t.name;if(o!=null&&o!=="auto"){var r=n.get(o);if(r!==void 0){var i=To(t.default,t.share);if(i!=="none"&&(ja(e,o,i,null,!1)?(i=e.stateNode,r.paired=i,i.paired=r,qa(e,t.onShare)):eo(e.child,!1)),n.delete(o),n.size===0)break}}}xm(e)}e=e.sibling}}}function wm(e){if(e.tag===30){var n=e.memoizedProps,t=ko(n,e.stateNode),o=$n!==null?$n.get(t):void 0,r=To(n.default,o!==void 0?n.share:n.exit);r!=="none"&&(ja(e,t,r,null,!1)?o!==void 0?(r=e.stateNode,o.paired=r,r.paired=o,$n.delete(t),qa(e,n.onShare)):qa(e,n.onExit):eo(e.child,!1)),$n!==null&&xm(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)wm(e),e=e.sibling;else $n!==null&&xm(e)}function yb(e){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,t=ko(n,e.stateNode);n=To(n.default,n.update),e.flags&=-5,n!=="none"&&ja(e,t,n,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&yb(e);e=e.sibling}}function bm(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.stateNode;n.paired!==null&&(n.paired=null,eo(e.child,!1))}bm(e)}e=e.sibling}}function ru(e){if(e.tag===30)e.stateNode.paired=null,eo(e.child,!1),bm(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)ru(e),e=e.sibling;else bm(e)}function gb(e){for(e=e.child;e!==null;)e.tag===30?eo(e.child,!1):(e.subtreeFlags&33554432)!==0&&gb(e),e=e.sibling}function Th(e,n,t,o,r,i,a){for(var s=!1;n!==null;){if(n.tag===5){var c=n.stateNode;if(i!==null&&Pn<i.length){var l=i[Pn],u=Bm(c);(l.view||u.view)&&(s=!0);var f;if(f=(e.flags&4)===0)if(u.clip)f=!0;else{f=l.rect;var d=u.rect;f=f.y!==d.y||f.x!==d.x||f.height!==d.height||f.width!==d.width}f&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&Jb(c,Pn===0?t:t+"_"+Pn,r),s&&(e.flags&4)!==0||(Xt===null&&(Xt=[]),Xt.push(c,Pn===0?o:o+"_"+Pn,n.memoizedProps)),Pn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&a?e.flags|=n.flags&32:Th(e,n.child,t,o,r,i,a)&&(s=!0));n=n.sibling}return s}function vb(e,n){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,o=e.stateNode,r=ko(t,o),i=To(t.default,t.update);if(n){o=o.clones;var a=o===null?null:o.map(sR)}else a=e.memoizedState,e.memoizedState=null;o=e;var s=e.child;Pn=0,r=Th(o,s,r,r,i,a,!1),(e.flags&4)!==0&&r&&(n||qa(e,t.onUpdate))}else(e.subtreeFlags&33554432)!==0&&vb(e,n);e=e.sibling}}var tn=!1,ye=!1,Ut=!1,_p=!1,Vv=typeof WeakSet=="function"?WeakSet:Set,on=null,Ft=!1,zs=!1,Au=!1,km=!1;function Aq(e,n,t){if(e=e.containerInfo,Im=Oa,e=ow(e),eh(e)){if("selectionStart"in e)var o={start:e.selectionStart,end:e.selectionEnd};else e:{o=(o=e.ownerDocument)&&o.defaultView||window;var r=o.getSelection&&o.getSelection();if(r&&r.rangeCount!==0){o=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{o.nodeType,a.nodeType}catch{o=null;break e}var s=0,c=-1,l=-1,u=0,f=0,d=e,p=null;n:for(;;){for(var m;d!==o||i!==0&&d.nodeType!==3||(c=s+i),d!==a||r!==0&&d.nodeType!==3||(l=s+r),d.nodeType===3&&(s+=d.nodeValue.length),(m=d.firstChild)!==null;)p=d,d=m;for(;;){if(d===e)break n;if(p===o&&++u===i&&(c=s),p===a&&++f===r&&(l=s),(m=d.nextSibling)!==null)break;d=p,p=d.parentNode}d=m}o=c===-1||l===-1?null:{start:c,end:l}}else o=null}o=o||{start:0,end:0}}else o=null;for(Om={focusedElem:e,selectionRange:o},Oa=!1,t=(t&335544064)===t,on=n,n=t?9270:1024;on!==null;){if(e=on,t&&(o=e.deletions,o!==null))for(i=0;i<o.length;i++)t&&wm(o[i]);if(e.alternate===null&&(e.flags&2)!==0)t&&jv(e),jl(t);else{if(e.tag===22){if(o=e.alternate,e.memoizedState!==null){o!==null&&o.memoizedState===null&&t&&wm(o),jl(t);continue}else if(o!==null&&o.memoizedState!==null){t&&jv(e),jl(t);continue}}o=e.child,(e.subtreeFlags&n)!==0&&o!==null?(o.return=e,on=o):(t&&yb(e),jl(t))}}$n=null}function jl(e){for(;on!==null;){var n=on,t=e,o=n.alternate,r=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((r&1024)!==0&&o!==null){t=void 0,r=o.memoizedProps,o=o.memoizedState;var i=n.stateNode;try{var a=li(n.type,r);t=i.getSnapshotBeforeUpdate(a,o),i.__reactInternalSnapshotBeforeUpdate=t}catch(s){xe(n,n.return,s)}}break;case 3:if((r&1024)!==0){if(o=n.stateNode.containerInfo,t=o.nodeType,t===9)Pm(o);else if(t===1)switch(o.nodeName){case"HEAD":case"HTML":case"BODY":Pm(o);break;default:o.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:t&&o!==null&&(t=ko(o.memoizedProps,o.stateNode),r=n.memoizedProps,r=To(r.default,r.update),r!=="none"&&ja(o,t,r,o.memoizedState=[],!0));break;default:if((r&1024)!==0)throw Error(L(163))}if(o=n.sibling,o!==null){o.return=n.return,on=o;break}on=n.return}}function xb(e,n,t){var o=t.flags;switch(t.tag){case 0:case 11:case 15:Yt(e,t),o&4&&wc(5,t);break;case 1:if(Yt(e,t),o&4)if(e=t.stateNode,n===null)try{e.componentDidMount()}catch(a){xe(t,t.return,a)}else{var r=li(t.type,n.memoizedProps);n=n.memoizedState;try{e.componentDidUpdate(r,n,e.__reactInternalSnapshotBeforeUpdate)}catch(a){xe(t,t.return,a)}}o&64&&db(t),o&512&&Gt(t,t.return);break;case 3:if(Yt(e,t),o&64&&(e=t.updateQueue,e!==null)){if(n=null,t.child!==null)switch(t.child.tag){case 27:case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}try{bw(e,n)}catch(a){xe(t,t.return,a)}}break;case 27:n===null&&o&4&&mb(t);case 26:case 5:Yt(e,t),n===null&&o&4&&ym(t),o&512&&Gt(t,t.return);break;case 12:Yt(e,t);break;case 31:Yt(e,t),o&4&&Sb(e,t);break;case 13:Yt(e,t),o&4&&_b(e,t),o&64&&(e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(t=Fq.bind(null,t),SR(e,t))));break;case 22:if(o=t.memoizedState!==null||tn,!o){var i=n!==null&&n.memoizedState!==null||ye;n=tn,r=ye,tn=o,(ye=i)&&!r?(o=2,(t.subtreeFlags&8772)!==0&&(o|=1),Mt(e,t,o)):Yt(e,t),tn=n,ye=r}break;case 30:Yt(e,t),o&512&&Gt(t,t.return);break;case 7:o&512&&Gt(t,t.return);default:Yt(e,t)}}function Sm(e,n){for(e=e.child;e!==null;)wb(e,n),e=e.sibling}function wb(e,n){switch(e.tag){case 5:case 26:try{var t=e.stateNode;if(n){var o=t.style;typeof o.setProperty=="function"?o.setProperty("display","none","important"):o.display="none"}else{var r=e.stateNode,i=e.memoizedProps.style,a=i!=null&&i.hasOwnProperty("display")?i.display:null;r.style.display=a==null||typeof a=="boolean"?"":(""+a).trim()}}catch(c){xe(e,e.return,c)}_m(e,n);break;case 6:try{e.stateNode.nodeValue=n?"":e.memoizedProps,de=!0}catch(c){xe(e,e.return,c)}break;case 18:try{var s=e.stateNode;n?rx(s,!0):rx(e.stateNode,!1)}catch(c){xe(e,e.return,c)}break;case 22:case 23:e.memoizedState===null&&Sm(e,n);break;default:Sm(e,n)}}function _m(e,n){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){e:{var t=e,o=n;switch(t.tag){case 4:wb(t,o);break e;case 22:t.memoizedState===null&&_m(t,o);break e;default:_m(t,o)}}e=e.sibling}}function bb(e){var n=e.alternate;n!==null&&(e.alternate=null,bb(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&Vu(n)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ne=null,zn=!1;function Rt(e,n,t){for(t=t.child;t!==null;)kb(e,n,t),t=t.sibling}function kb(e,n,t){if(nt&&typeof nt.onCommitFiberUnmount=="function")try{nt.onCommitFiberUnmount(pc,t)}catch{}switch(t.tag){case 26:ye||ln(t,n),Rt(e,n,t),t.memoizedState?t.memoizedState.count--:t.stateNode&&!ye&&(t=t.stateNode,t.parentNode.removeChild(t));break;case 27:ye||ln(t,n),Gs(t);var o=Ne,r=zn;xr(t.type)&&(Ne=t.stateNode,zn=!1),Rt(e,n,t),l1(t.stateNode,t.type,t.memoizedProps),Ne=o,zn=r;break;case 5:ye||ln(t,n),Gs(t);case 6:if(t.tag===6&&Gs(t),o=Ne,r=zn,Ne=null,Rt(e,n,t),Ne=o,zn=r,Ne!==null)if(zn)try{(Ne.nodeType===9?Ne.body:Ne.nodeName==="HTML"?Ne.ownerDocument.body:Ne).removeChild(t.stateNode),de=!0}catch(i){xe(t,n,i)}else try{Ne.removeChild(t.stateNode),de=!0}catch(i){xe(t,n,i)}break;case 18:Ne!==null&&(zn?(e=Ne,ox(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,t.stateNode),za(e)):ox(Ne,t.stateNode));break;case 4:o=Ne,r=zn,Ne=t.stateNode.containerInfo,zn=!0,Rt(e,n,t),Ne=o,zn=r;break;case 0:case 11:case 14:case 15:yr(2,t,n),ye||yr(4,t,n),Rt(e,n,t);break;case 1:ye||(ln(t,n),o=t.stateNode,typeof o.componentWillUnmount=="function"&&fb(t,n,o)),Rt(e,n,t);break;case 21:Rt(e,n,t);break;case 22:ye=(o=ye)||t.memoizedState!==null,Rt(e,n,t),ye=o;break;case 30:ln(t,n),Rt(e,n,t);break;case 7:ye||ln(t,n),Rt(e,n,t);break;default:Rt(e,n,t)}}function Sb(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{za(e)}catch(t){xe(n,n.return,t)}}}function _b(e,n){if(n.memoizedState===null&&(e=n.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{za(e)}catch(t){xe(n,n.return,t)}}function Nq(e){switch(e.tag){case 31:case 13:case 19:var n=e.stateNode;return n===null&&(n=e.stateNode=new Vv),n;case 22:return e=e.stateNode,n=e._retryCache,n===null&&(n=e._retryCache=new Vv),n;default:throw Error(L(435,e.tag))}}function Hl(e,n){var t=Nq(e);n.forEach(function(o){if(!t.has(o)){t.add(o);var r=Yq.bind(null,e,o);o.then(r,r)}})}function En(e,n,t){var o=n.deletions;if(o!==null)for(var r=0;r<o.length;r++){var i=o[r],a=e,s=n,c=s;e:for(;c!==null;){switch(c.tag){case 27:if(xr(c.type)){Ne=c.stateNode,zn=!1;break e}break;case 5:Ne=c.stateNode,zn=!1;break e;case 3:case 4:Ne=c.stateNode.containerInfo,zn=!0;break e}c=c.return}if(Ne===null)throw Error(L(160));kb(a,s,i),Ne=null,zn=!1,a=i.alternate,a!==null&&(a.return=null),i.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Db(n,e,t),n=n.sibling}var At=null;function Db(e,n,t){var o=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(r&4&&(o=e.updateQueue,o=o!==null?o.events:null,o!==null))for(var i=0;i<o.length;i++){var a=o[i];a.ref.impl=a.nextImpl}En(n,e,t),Cn(e),r&4&&(yr(3,e,e.return),wc(3,e),yr(5,e,e.return));break;case 1:En(n,e,t),Cn(e),r&512&&(ye||o===null||ln(o,o.return)),r&64&&tn&&(e=e.updateQueue,e!==null&&(n=e.callbacks,n!==null&&(t=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=t===null?n:t.concat(n))));break;case 26:if(i=At,En(n,e,t),Cn(e),r&512&&(ye||o===null||ln(o,o.return)),r&4)if(r=o!==null?o.memoizedState:null,t=e.memoizedState,o===null)if(t===null)if(e.stateNode===null)if(tn)e.stateNode=$b(e.type,e.memoizedProps,n.containerInfo,e);else{e:{n=e.type,t=e.memoizedProps,r=i.ownerDocument||i;n:switch(n){case"title":o=r.getElementsByTagName("title")[0],(!o||o[yc]||o[un]||o.namespaceURI==="http://www.w3.org/2000/svg"||o.hasAttribute("itemprop"))&&(o=r.createElement(n),r.head.insertBefore(o,r.querySelector("head > title"))),mn(o,n,t),o[un]=e,rn(o),n=o;break e;case"link":if(i=fx("link","href",r).get(n+(t.href||""))){for(a=0;a<i.length;a++)if(o=i[a],o.getAttribute("href")===(t.href==null||t.href===""?null:t.href)&&o.getAttribute("rel")===(t.rel==null?null:t.rel)&&o.getAttribute("title")===(t.title==null?null:t.title)&&o.getAttribute("crossorigin")===(t.crossOrigin==null?null:t.crossOrigin)){i.splice(a,1);break n}}o=r.createElement(n),mn(o,n,t),r.head.appendChild(o);break;case"meta":if(i=fx("meta","content",r).get(n+(t.content||""))){for(a=0;a<i.length;a++)if(o=i[a],o.getAttribute("content")===(t.content==null?null:""+t.content)&&o.getAttribute("name")===(t.name==null?null:t.name)&&o.getAttribute("property")===(t.property==null?null:t.property)&&o.getAttribute("http-equiv")===(t.httpEquiv==null?null:t.httpEquiv)&&o.getAttribute("charset")===(t.charSet==null?null:t.charSet)){i.splice(a,1);break n}}o=r.createElement(n),mn(o,n,t),r.head.appendChild(o);break;default:throw Error(L(468,n))}o[un]=e,rn(o),n=o}e.stateNode=n}else tn||Hm(i,e.type,e.stateNode);else e.stateNode=dx(i,t,e.memoizedProps);else r!==t?(r===null?(n=o.stateNode,n===null||ye||n.parentNode.removeChild(n)):r.count--,t===null?tn||Hm(i,e.type,e.stateNode):dx(i,t,e.memoizedProps)):t===null&&e.stateNode!==null&&kp(e,e.memoizedProps,o.memoizedProps);break;case 27:En(n,e,t),Cn(e),r&512&&(ye||o===null||ln(o,o.return)),o!==null&&r&4&&kp(e,e.memoizedProps,o.memoizedProps);break;case 5:if(i=Ut,Ut=!1,En(n,e,t),Ut=i,Cn(e),r&512&&(ye||o===null||ln(o,o.return)),e.flags&32){n=e.stateNode;try{Ea(n,""),de=!0}catch(u){xe(e,e.return,u)}}r&4&&e.stateNode!=null&&(n=e.memoizedProps,kp(e,n,o!==null?o.memoizedProps:n)),r&1024&&(_p=!0);break;case 6:if(En(n,e,t),Cn(e),r&4){if(e.stateNode===null)throw Error(L(162));n=e.memoizedProps,t=e.stateNode;try{t.nodeValue=n,de=!0}catch(u){xe(e,e.return,u)}}break;case 3:if(de=!1,cu=null,i=At,At=cc(n.containerInfo),En(n,e,t),At=i,Cn(e),r&4&&o!==null&&o.memoizedState.isDehydrated)try{za(n.containerInfo)}catch(u){xe(e,e.return,u)}_p&&(_p=!1,Eb(e)),de=!1;break;case 4:r=Ut,Ut=tn,o=K0(),i=At,At=cc(e.stateNode.containerInfo),En(n,e,t),Cn(e),At=i,de&&zs&&(Au=!0),de=o,Ut=r;break;case 12:En(n,e,t),Cn(e);break;case 31:En(n,e,t),Cn(e),r&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Hl(e,n)));break;case 13:En(n,e,t),Cn(e),e.child.flags&8192&&e.memoizedState!==null!=(o!==null&&o.memoizedState!==null)&&(nd=et()),r&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Hl(e,n)));break;case 22:i=e.memoizedState!==null,a=o!==null&&o.memoizedState!==null;var s=tn,c=ye,l=Ut;tn=s||i,Ut=l||i,ye=c||a,En(n,e,t),ye=c,Ut=l,tn=s,Cn(e),r&8192&&(n=e.stateNode,n._visibility=i?n._visibility&-2:n._visibility|1,!i||o===null||a||tn||ye||(n=a||ye,t=tn,o=ye,tn=i||tn,ye=n,Xo(e,2),tn=t,ye=o),!i&&Ut||Sm(e,i)),r&4&&(n=e.updateQueue,n!==null&&(t=n.retryQueue,t!==null&&(n.retryQueue=null,Hl(e,t))));break;case 19:En(n,e,t),Cn(e),r&4&&(n=e.updateQueue,n!==null&&(e.updateQueue=null,Hl(e,n)));break;case 30:r&512&&(ye||o===null||ln(o,o.return)),r=K0(),i=zs,a=(t&335544064)===t,s=e.memoizedProps,zs=a&&To(s.default,s.update)!=="none",En(n,e,t),Cn(e),a&&o!==null&&de&&(e.flags|=4),zs=i,de=r;break;case 21:break;case 7:r&512&&(ye||o===null||ln(o,o.return)),o&&o.stateNode!==null&&(o.stateNode._fragmentFiber=e);default:En(n,e,t),Cn(e)}}function Cn(e){var n=e.flags;if(n&2){try{for(var t,o=e.return;o!==null;){if(pb(o)){t=o;break}o=o.return}o=null;for(var r=e.return;r!==null;){if(Ch(r)){var i=r.stateNode;o===null?o=[i]:o.push(i)}if(Eh(r))break;r=r.return}var a=o;if(t==null)throw Error(L(160));switch(t.tag){case 27:var s=t.stateNode,c=Sp(e);Ru(e,c,s,a);break;case 5:var l=t.stateNode;t.flags&32&&(Ea(l,""),t.flags&=-33);var u=Sp(e);Ru(e,u,l,a);break;case 3:case 4:var f=t.stateNode.containerInfo,d=Sp(e);gm(e,d,f,a);break;default:throw Error(L(161))}}catch(p){xe(e,e.return,p)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Eb(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var n=e;Eb(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Oa=!0,n.reset(),Oa=!1),e=e.sibling}}function $i(e,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)Cb(n,e),n=n.sibling;else vb(n,!1)}function Cb(e,n){var t=e.alternate;if(t===null)vm(e,!1);else switch(e.tag){case 3:if(km=Ft=!1,Hv(),$i(n,e),!Ft&&!Au){if(e=Xt,e!==null)for(var o=0;o<e.length;o+=3){t=e[o];var r=e[o+1];e1(t,e[o+2]),t=t.ownerDocument.documentElement,t!==null&&t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+r+")"})}e=n.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),km=!0}Xt=null;break;case 5:$i(n,e);break;case 4:o=Ft,Ft=!1,$i(n,e),Ft&&(Au=!0),Ft=o;break;case 22:e.memoizedState===null&&(t.memoizedState!==null?vm(e,!1):$i(n,e));break;case 30:o=Ft,r=Hv(),Ft=!1,$i(n,e),Ft&&(e.flags|=4);var i=e.memoizedProps,a=e.stateNode;n=ko(i,a),a=ko(t.memoizedProps,a);var s=To(i.default,i.update);s==="none"?n=!1:(i=t.memoizedState,t.memoizedState=null,t=e.child,Pn=0,n=Th(e,t,n,a,s,i,!0),Pn!==(i===null?0:i.length)&&(e.flags|=32)),(e.flags&4)!==0&&n?(qa(e,e.memoizedProps.onUpdate),Xt=r):r!==null&&(r.push.apply(r,Xt),Xt=r),Ft=(e.flags&32)!==0?!0:o;break;default:$i(n,e)}}function Yt(e,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)xb(e,n.alternate,n),n=n.sibling}function Xo(e,n){for(e=e.child;e!==null;){var t=e,o=n;switch(t.tag){case 0:case 11:case 14:case 15:yr(4,t,t.return),Xo(t,o);break;case 1:ln(t,t.return);var r=t.stateNode;typeof r.componentWillUnmount=="function"&&fb(t,t.return,r),Xo(t,o);break;case 27:(o&2)!==0&&l1(t.stateNode,t.type,t.memoizedProps);case 5:ln(t,t.return),t.tag!==5&&t.tag!==27||Gs(t),Xo(t,o);break;case 6:Gs(t);break;case 26:ln(t,t.return),r=t.stateNode,t.memoizedState!==null||r===null||ye||r.parentNode.removeChild(r),Xo(t,o);break;case 22:t.memoizedState===null&&Xo(t,o);break;case 30:ln(t,t.return),Xo(t,o);break;case 7:ln(t,t.return);default:Xo(t,o)}e=e.sibling}}function Mt(e,n,t){for(t=(n.subtreeFlags&8772)!==0?t:t&-2,n=n.child;n!==null;){var o=n.alternate,r=e,i=n,a=i.flags,s=(t&1)!==0;switch(i.tag){case 0:case 11:case 15:Mt(r,i,t),wc(4,i);break;case 1:if(Mt(r,i,t),o=i,r=o.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(u){xe(o,o.return,u)}if(o=i,r=o.updateQueue,r!==null){var c=o.stateNode;try{var l=r.shared.hiddenCallbacks;if(l!==null)for(r.shared.hiddenCallbacks=null,r=0;r<l.length;r++)ww(l[r],c)}catch(u){xe(o,o.return,u)}}s&&a&64&&db(i),Gt(i,i.return);break;case 27:(t&2)!==0&&mb(i);case 5:i.tag!==5&&i.tag!==27||Lv(i),Mt(r,i,t),s&&o===null&&a&4&&ym(i),Gt(i,i.return);break;case 6:Lv(i);break;case 26:c=i.stateNode,i.memoizedState!==null||c===null||tn||Hm(cc(c.ownerDocument),i.type,c),Mt(r,i,t),s&&o===null&&a&4&&ym(i),Gt(i,i.return);break;case 12:Mt(r,i,t);break;case 31:Mt(r,i,t),s&&a&4&&Sb(r,i);break;case 13:Mt(r,i,t),s&&a&4&&_b(r,i);break;case 22:i.memoizedState===null&&Mt(r,i,t),Gt(i,i.return);break;case 30:Mt(r,i,t),Gt(i,i.return);break;case 7:Gt(i,i.return);default:Mt(r,i,t)}n=n.sibling}}function qh(e,n){var t=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),e=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),e!==t&&(e!=null&&e.refCount++,t!=null&&vc(t))}function Rh(e,n){e=null,n.alternate!==null&&(e=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==e&&(n.refCount++,e!=null&&vc(e))}function ft(e,n,t,o){var r=(t&335544064)===t;if(n.subtreeFlags&(r?10262:10256))for(n=n.child;n!==null;)Tb(e,n,t,o),n=n.sibling;else r&&gb(n)}function Tb(e,n,t,o){var r=(t&335544064)===t;r&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&ru(n);var i=n.flags;switch(n.tag){case 0:case 11:case 15:ft(e,n,t,o),i&2048&&wc(9,n);break;case 1:ft(e,n,t,o);break;case 3:ft(e,n,t,o),r&&km&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),i&2048&&(i=null,n.alternate!==null&&(i=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==i&&(n.refCount++,i!=null&&vc(i)));break;case 12:if(i&2048){ft(e,n,t,o),i=n.stateNode;try{var a=n.memoizedProps,s=a.id,c=a.onPostCommit;typeof c=="function"&&c(s,n.alternate===null?"mount":"update",i.passiveEffectDuration,-0)}catch(l){xe(n,n.return,l)}}else ft(e,n,t,o);break;case 31:ft(e,n,t,o);break;case 13:ft(e,n,t,o);break;case 23:break;case 22:a=n.stateNode,s=n.alternate,n.memoizedState!==null?(r&&s!==null&&s.memoizedState===null&&ru(s),a._visibility&2?ft(e,n,t,o):Xs(e,n)):(r&&s!==null&&s.memoizedState!==null&&ru(n),a._visibility&2?ft(e,n,t,o):(a._visibility|=2,ea(e,n,t,o,(n.subtreeFlags&10256)!==0||!1))),i&2048&&qh(s,n);break;case 24:ft(e,n,t,o),i&2048&&Rh(n.alternate,n);break;case 30:r&&(i=n.alternate,i!==null&&(eo(i.child,!0),eo(n.child,!0))),ft(e,n,t,o);break;default:ft(e,n,t,o)}}function ea(e,n,t,o,r){for(r=r&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var i=e,a=n,s=t,c=o,l=a.flags;switch(a.tag){case 0:case 11:case 15:ea(i,a,s,c,r),wc(8,a);break;case 23:break;case 22:var u=a.stateNode;a.memoizedState!==null?u._visibility&2?ea(i,a,s,c,r):Xs(i,a):(u._visibility|=2,ea(i,a,s,c,r)),r&&l&2048&&qh(a.alternate,a);break;case 24:ea(i,a,s,c,r),r&&l&2048&&Rh(a.alternate,a);break;default:ea(i,a,s,c,r)}n=n.sibling}}function Xs(e,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var t=e,o=n,r=o.flags;switch(o.tag){case 22:Xs(t,o),r&2048&&qh(o.alternate,o);break;case 24:Xs(t,o),r&2048&&Rh(o.alternate,o);break;default:Xs(t,o)}n=n.sibling}}var Zr=8192;function Gr(e,n,t){if(e.subtreeFlags&Zr)for(e=e.child;e!==null;)qb(e,n,t),e=e.sibling}function qb(e,n,t){switch(e.tag){case 26:Gr(e,n,t),e.flags&Zr&&(e.memoizedState!==null?BR(t,At,e.memoizedState,e.memoizedProps):(e=e.stateNode,(n&335544128)===n&&mx(t,e)));break;case 5:Gr(e,n,t),e.flags&Zr&&(e=e.stateNode,(n&335544128)===n&&mx(t,e));break;case 3:case 4:var o=At;At=cc(e.stateNode.containerInfo),Gr(e,n,t),At=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Zr,Zr=16777216,Gr(e,n,t),Zr=o):Gr(e,n,t));break;case 30:if((e.flags&Zr)!==0&&(o=e.memoizedProps.name,o!=null&&o!=="auto")){var r=e.stateNode;r.paired=null,$n===null&&($n=new Map),$n.set(o,r)}Gr(e,n,t);break;default:Gr(e,n,t)}}function Rb(e){var n=e.alternate;if(n!==null&&(e=n.child,e!==null)){n.child=null;do n=e.sibling,e.sibling=null,e=n;while(e!==null)}}function qs(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var o=n[t];on=o,Ab(o,e)}Rb(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Mb(e),e=e.sibling}function Mb(e){switch(e.tag){case 0:case 11:case 15:qs(e),e.flags&2048&&yr(9,e,e.return);break;case 3:qs(e);break;case 12:qs(e);break;case 22:var n=e.stateNode;e.memoizedState!==null&&n._visibility&2&&(e.return===null||e.return.tag!==13)?(n._visibility&=-3,iu(e)):qs(e);break;default:qs(e)}}function iu(e){var n=e.deletions;if((e.flags&16)!==0){if(n!==null)for(var t=0;t<n.length;t++){var o=n[t];on=o,Ab(o,e)}Rb(e)}for(e=e.child;e!==null;){switch(n=e,n.tag){case 0:case 11:case 15:yr(8,n,n.return),iu(n);break;case 22:t=n.stateNode,t._visibility&2&&(t._visibility&=-3,iu(n));break;default:iu(n)}e=e.sibling}}function Ab(e,n){for(;on!==null;){var t=on;switch(t.tag){case 0:case 11:case 15:yr(8,t,n);break;case 23:case 22:if(t.memoizedState!==null&&t.memoizedState.cachePool!==null){var o=t.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:vc(t.memoizedState.cache)}if(o=t.child,o!==null)o.return=t,on=o;else e:for(t=e;on!==null;){o=on;var r=o.sibling,i=o.return;if(bb(o),o===t){on=null;break e}if(r!==null){r.return=i,on=r;break e}on=i}}}var Iq={getCacheForType:function(e){var n=dn(Ze),t=n.data.get(e);return t===void 0&&(t=e(),n.data.set(e,t)),t},cacheSignal:function(){return dn(Ze).controller.signal}},Oq=typeof WeakMap=="function"?WeakMap:Map,pe=0,Se=null,se=null,ce=0,ge=0,Zn=null,er=!1,Ha=!1,Mh=!1,Eo=0,He=0,gr=0,ti=0,Nu=0,Jn=0,Ta=0,Ks=null,Bn=null,Dm=!1,nd=0,Nb=0,Iu=1/0,Ou=null,lr=null,ze=0,It=null,ui=null,Jt=0,Em=0,Cm=null,Ib=null,ba=null,ka=null,Sa=null,Zs=0,au=null;function ot(){return(pe&2)!==0&&ce!==0?ce&-ce:$.T!==null?Nh():Px()}function Ob(){if(Jn===0)if((ce&536870912)===0||re){var e=Tl;Tl<<=1,(Tl&3932160)===0&&(Tl=262144),Jn=e}else Jn=536870912;return e=hn.current,e!==null&&(e.flags|=32),Jn}function qa(e,n){if(n!=null){var t=e.stateNode,o=t.ref;o===null&&(o=t.ref=t1(ko(e.memoizedProps,t))),ka===null&&(ka=[]),ka.push(n.bind(null,o))}}function jn(e,n,t){(e===Se&&(ge===2||ge===9)||e.cancelPendingCommit!==null)&&(Ra(e,0),nr(e,ce,Jn,!1)),hc(e,t),((pe&2)===0||e!==Se)&&(e===Se&&((pe&2)===0&&(ti|=t),He===4&&nr(e,ce,Jn,!1)),to(e))}function zb(e,n,t){if((pe&6)!==0)throw Error(L(327));var o=!t&&(n&127)===0&&(n&e.expiredLanes)===0||mc(e,n),r=o?Pq(e,n):Dp(e,n,!0),i=o;do{if(r===0){Ha&&!o&&nr(e,n,0,!1);break}else{if(t=e.current.alternate,i&&!zq(t)){r=Dp(e,n,!1),i=!1;continue}if(r===2){if(i=n,e.errorRecoveryDisabledLanes&i)var a=0;else a=e.pendingLanes&-536870913,a=a!==0?a:a&536870912?536870912:0;if(a!==0){n=a;e:{var s=e;r=Ks;var c=s.current.memoizedState.isDehydrated;if(c&&(Ra(s,a).flags|=256),a=Dp(s,a,!1),a!==2&&a!==6){if(Mh&&!c){s.errorRecoveryDisabledLanes|=i,ti|=i,r=4;break e}i=Bn,Bn=r,i!==null&&(Bn===null?Bn=i:Bn.push.apply(Bn,i))}r=a}if(i=!1,r!==2)continue}}if(r===1){Ra(e,0),nr(e,n,0,!0);break}e:{switch(o=e,i=r,i){case 0:case 1:throw Error(L(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:nr(o,n,Jn,!er);break e;case 2:Bn=null;break;case 3:case 5:break;default:throw Error(L(329))}if((n&62914560)===n&&(r=nd+300-et(),10<r)){if(nr(o,n,Jn,!er),Hu(o,0,!0)!==0)break e;Jt=n,o.timeoutHandle=Oh(Uv.bind(null,o,t,Bn,Ou,Dm,n,Jn,ti,Ta,er,i,"Throttled",-0,0),r);break e}Uv(o,t,Bn,Ou,Dm,n,Jn,ti,Ta,er,i,null,-0,0)}}break}while(!0);to(e)}function Uv(e,n,t,o,r,i,a,s,c,l,u,f,d,p){e.timeoutHandle=-1;var m=n.subtreeFlags,g=(i&335544064)===i;if(f=null,(g||m&8192||(m&16785408)===16785408)&&(f={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Zt},$n=null,qb(n,i,f),g&&(m=f,g=e.containerInfo,g=(g.nodeType===9?g:g.ownerDocument).__reactViewTransition,g!=null&&(m.count++,m.waitingForViewTransition=!0,m=lc.bind(m),g.finished.then(m,m))),m=(i&62914560)===i?nd-et():(i&4194048)===i?Nb-et():0,m=PR(f,m),m!==null)){Jt=i,e.cancelPendingCommit=m(Yv.bind(null,e,n,i,t,o,r,a,s,c,l,u,f,null,d,p)),nr(e,i,a,!l);return}Yv(e,n,i,t,o,r,a,s,c,l,u,f)}function zq(e){for(var n=e;;){var t=n.tag;if((t===0||t===11||t===15)&&n.flags&16384&&(t=n.updateQueue,t!==null&&(t=t.stores,t!==null)))for(var o=0;o<t.length;o++){var r=t[o],i=r.getSnapshot;r=r.value;try{if(!rt(i(),r))return!1}catch{return!1}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function nr(e,n,t,o){n=Nx(e,n),n&=~Nu,n&=~ti,e.suspendedLanes|=n,e.pingedLanes&=~n,o&&(e.warmLanes|=n),o=e.expirationTimes;for(var r=n;0<r;){var i=31-tt(r),a=1<<i;o[i]=-1,r&=~a}t!==0&&Ox(e,t,n)}function td(){return(pe&6)===0?(bc(0,!1),!1):!0}function Ah(){if(se!==null){if(ge===0)var e=se.return;else e=se,vo=hi=null,hh(e),va=null,tc=0,e=se;for(;e!==null;)ub(e.alternate,e),e=e.return;se=null}}function Ra(e,n){var t=e.timeoutHandle;return t!==-1&&(e.timeoutHandle=-1,rR(t)),t=e.cancelPendingCommit,t!==null&&(e.cancelPendingCommit=null,t()),Jt=0,Ah(),Se=e,se=t=xo(e.current,null),ce=n,ge=0,Zn=null,er=!1,Ha=mc(e,n),Mh=!1,Ta=Jn=Nu=ti=gr=He=0,Bn=Ks=null,Dm=!1,Eo=Nx(e,n),Gu(),t}function Bb(e,n){te=null,$.H=Cu,n===La||n===Zu?(n=yv(),ge=3):n===sh?(n=yv(),ge=4):ge=n===Sh?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Zn=n,se===null&&(He=1,Tu(e,gt(n,e.current)))}function Pb(){var e=hn.current;return e===null?!0:(ce&4194048)===ce?bn===null:(ce&62914560)===ce||(ce&536870912)!==0?e===bn:!1}function Lb(){var e=$.H;return $.H=Cu,e===null?Cu:e}function jb(){var e=$.A;return $.A=Iq,e}function zu(){He=4,er||(ce&4194048)!==ce&&hn.current!==null||(Ha=!0),(gr&134217727)===0&&(ti&134217727)===0||Se===null||nr(Se,ce,Jn,!1)}function Dp(e,n,t){var o=pe;pe|=2;var r=Lb(),i=jb();(Se!==e||ce!==n)&&(Ou=null,Ra(e,n)),n=!1;var a=He;e:do try{if(ge!==0&&se!==null){var s=se,c=Zn;switch(ge){case 8:Ah(),a=6;break e;case 3:case 2:case 9:case 6:hn.current===null&&(n=!0);var l=ge;if(ge=0,Zn=null,pa(e,s,c,l),t&&Ha){a=0;break e}break;default:l=ge,ge=0,Zn=null,pa(e,s,c,l)}}Bq(),a=He;break}catch(u){Bb(e,u)}while(!0);return n&&e.shellSuspendCounter++,vo=hi=null,pe=o,$.H=r,$.A=i,se===null&&(Se=null,ce=0,Gu()),a}function Bq(){for(;se!==null;)Hb(se)}function Pq(e,n){var t=pe;pe|=2;var o=Lb(),r=jb();Se!==e||ce!==n?(Ou=null,Iu=et()+500,Ra(e,n)):Ha=mc(e,n);e:do try{if(ge!==0&&se!==null){n=se;var i=Zn;n:switch(ge){case 1:ge=0,Zn=null,pa(e,n,i,1);break;case 2:case 9:if(hv(i)){ge=0,Zn=null,Fv(n);break}n=function(){ge!==2&&ge!==9||Se!==e||(ge=7),to(e)},i.then(n,n);break e;case 3:ge=7;break e;case 4:ge=5;break e;case 7:hv(i)?(ge=0,Zn=null,Fv(n)):(ge=0,Zn=null,pa(e,n,i,7));break;case 5:var a=null;switch(se.tag){case 26:a=se.memoizedState;case 5:case 27:var s=se;if(a?f1(a):s.stateNode.complete){ge=0,Zn=null;var c=s.sibling;if(c!==null)se=c;else{var l=s.return;l!==null?(se=l,od(l)):se=null}break n}}ge=0,Zn=null,pa(e,n,i,5);break;case 6:ge=0,Zn=null,pa(e,n,i,6);break;case 8:Ah(),He=6;break e;default:throw Error(L(462))}}Lq();break}catch(u){Bb(e,u)}while(!0);return vo=hi=null,$.H=o,$.A=r,pe=t,se!==null?0:(Se=null,ce=0,Gu(),He)}function Lq(){for(;se!==null&&!tT();)Hb(se)}function Hb(e){var n=lb(e.alternate,e,Eo);e.memoizedProps=e.pendingProps,n===null?od(e):se=n}function Fv(e){var n=e,t=n.alternate;switch(n.tag){case 15:case 0:n=Av(t,n,n.pendingProps,n.type,void 0,ce);break;case 11:n=Av(t,n,n.pendingProps,n.type.render,n.ref,ce);break;case 5:hh(n);var o=n;o===an&&(re?(wu(o),o.tag===5&&o.stateNode!=null&&(qe=o.stateNode)):(wu(o),re=!0));default:ub(t,n),n=se=dw(n,Eo),n=lb(t,n,Eo)}e.memoizedProps=e.pendingProps,n===null?od(e):se=n}function pa(e,n,t,o){vo=hi=null,hh(n),va=null,tc=0;var r=n.return;try{if(Eq(e,r,n,t,ce)){He=1,Tu(e,gt(t,e.current)),se=null;return}}catch(i){if(r!==null)throw se=r,i;He=1,Tu(e,gt(t,e.current)),se=null;return}n.flags&32768?(re||o===1?e=!0:Ha||(ce&536870912)!==0?e=!1:(er=e=!0,(o===2||o===9||o===3||o===6)&&(o=hn.current,o!==null&&o.tag===13&&(o.flags|=16384))),Vb(n,e)):od(n)}function od(e){var n=e;do{if((n.flags&32768)!==0){Vb(n,er);return}e=n.return;var t=Rq(n.alternate,n,Eo);if(t!==null){se=t;return}if(n=n.sibling,n!==null){se=n;return}se=n=e}while(n!==null);He===0&&(He=5)}function Vb(e,n){do{var t=Mq(e.alternate,e);if(t!==null){t.flags&=32767,se=t;return}if(t=e.return,t!==null&&(t.flags|=32768,t.subtreeFlags=0,t.deletions=null),!n&&(e=e.sibling,e!==null)){se=e;return}se=e=t}while(e!==null);He=6,se=null}function Yv(e,n,t,o,r,i,a,s,c,l,u,f){e.cancelPendingCommit=null;do rd();while(ze!==0);if((pe&6)!==0)throw Error(L(327));if(n!==null){if(n===e.current)throw Error(L(177));e===Se&&(se=Se=null,ce=0),ui=n,It=e,Jt=t,Cm=r,Ib=o,jq(e,n,t,a,s,c,f)}}function jq(e,n,t,o,r,i,a){var s=n.lanes|n.childLanes;if(Em=s,s|=nh,fT(e,t,s,o,r,i),ka=null,(t&335544064)===t?(Sa=mq(e),o=10262):(Sa=null,o=10256),(n.subtreeFlags&o)!==0||(n.flags&o)!==0?(e.callbackNode=null,e.callbackPriority=0,Gq(hu,function(){return Mm(),null})):(e.callbackNode=null,e.callbackPriority=0),Mu=!1,o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=$.T,$.T=null,r=me.p,me.p=2,i=pe,pe|=4;try{Aq(e,n,t)}finally{pe=i,me.p=r,$.T=o}}ze=1,Mu?ba=uR(a,e.containerInfo,Sa,Tm,qm,Vq,Rm,Mm,Hq,null,null):(Tm(),qm(),Rm())}function Hq(e){if(ze!==0){var n=It.onRecoverableError;n(e,{componentStack:null})}}function Vq(){ze===3&&(ze=0,Cb(ui,It),ze=4)}function Tm(){if(ze===1){ze=0;var e=It,n=ui,t=Jt,o=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||o){o=$.T,$.T=null;var r=me.p;me.p=2;var i=pe;pe|=4;try{zs=Au=!1,Db(n,e,t),t=Om;var a=ow(e.containerInfo),s=t.focusedElem,c=t.selectionRange;if(a!==s&&s&&s.ownerDocument&&tw(s.ownerDocument.documentElement,s)){if(c!==null&&eh(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),"selectionStart"in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var f=s.ownerDocument||document,d=f&&f.defaultView||window;if(d.getSelection){var p=d.getSelection(),m=s.textContent.length,g=Math.min(c.start,m),x=c.end===void 0?g:Math.min(c.end,m);!p.extend&&g>x&&(a=x,x=g,g=a);var h=sv(s,g),v=sv(s,x);if(h&&v&&(p.rangeCount!==1||p.anchorNode!==h.node||p.anchorOffset!==h.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=f.createRange();y.setStart(h.node,h.offset),p.removeAllRanges(),g>x?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(f=[],p=s;p=p.parentNode;)p.nodeType===1&&f.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus=="function"&&s.focus(),s=0;s<f.length;s++){var w=f[s];w.element.scrollLeft=w.left,w.element.scrollTop=w.top}}Oa=!!Im,Om=Im=null}finally{pe=i,me.p=r,$.T=o}}e.current=n,ze=2}}function qm(){if(ze===2){ze=0;var e=It,n=ui,t=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||t){t=$.T,$.T=null;var o=me.p;me.p=2;var r=pe;pe|=4;try{xb(e,n.alternate,n)}finally{pe=r,me.p=o,$.T=t}}ze=3}}function Rm(){if(ze===4||ze===3){ze=0;var e=ba;ba=null,oT();var n=It,t=ui,o=Jt,r=Ib,i=(o&335544064)===o?10262:10256;if((t.subtreeFlags&i)!==0||(t.flags&i)!==0?ze=5:(ze=0,ui=It=null,Ub(n,n.pendingLanes)),i=n.pendingLanes,i===0&&(lr=null),Km(o),t=t.stateNode,nt&&typeof nt.onCommitFiberRoot=="function")try{nt.onCommitFiberRoot(pc,t,void 0,(t.current.flags&128)===128)}catch{}if(r!==null){t=$.T,i=me.p,me.p=2,$.T=null;try{for(var a=n.onRecoverableError,s=0;s<r.length;s++){var c=r[s];a(c.value,{componentStack:c.stack})}}finally{$.T=t,me.p=i}}if(r=ka,a=Sa,Sa=null,r!==null&&(ka=null,a===null&&(a=[]),e!==null))for(c=0;c<r.length;c++)t=(0,r[c])(a),t!==void 0&&e.finished.finally(t);(Jt&3)!==0&&rd(),to(n),i=n.pendingLanes,(o&261930)!==0&&(i&42)!==0?n===au?Zs++:(Zs=0,au=n):(Zs=0,au=null),bc(0,!1)}}function Ub(e,n){(e.pooledCacheLanes&=n)===0&&(n=e.pooledCache,n!=null&&(e.pooledCache=null,vc(n)))}function rd(){return ba!==null&&(ba.skipTransition(),ba=null),Tm(),qm(),Rm(),Mm()}function Mm(){if(ze!==5)return!1;var e=It,n=Em;Em=0;var t=Km(Jt),o=$.T,r=me.p;try{me.p=32>t?32:t,$.T=null,t=Cm,Cm=null;var i=It,a=Jt;if(ze=0,ui=It=null,Jt=0,(pe&6)!==0)throw Error(L(331));var s=pe;if(pe|=4,Mb(i.current),Tb(i,i.current,a,t),pe=s,bc(0,!1),nt&&typeof nt.onPostCommitFiberRoot=="function")try{nt.onPostCommitFiberRoot(pc,i)}catch{}return!0}finally{me.p=r,$.T=o,Ub(e,n)}}function Gv(e,n,t){n=gt(t,n),n=um(e.stateNode,n,2),e=ar(e,n,2),e!==null&&(hc(e,2),to(e))}function xe(e,n,t){if(e.tag===3)Gv(e,e,t);else for(;n!==null;){if(n.tag===3){Gv(n,e,t);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(lr===null||!lr.has(o))){e=gt(t,e),t=rb(2),o=ar(n,t,2),o!==null&&(ib(t,o,n,e),hc(o,2),to(o));break}}n=n.return}}function Ep(e,n,t){var o=e.pingCache;if(o===null){o=e.pingCache=new Oq;var r=new Set;o.set(n,r)}else r=o.get(n),r===void 0&&(r=new Set,o.set(n,r));r.has(t)||(Mh=!0,r.add(t),e=Uq.bind(null,e,n,t),n.then(e,e))}function Uq(e,n,t){var o=e.pingCache;o!==null&&o.delete(n),e.pingedLanes|=e.suspendedLanes&t,e.warmLanes&=~t,Se===e&&(ce&t)===t&&((He===4||He===3&&(ce&62914560)===ce&&300>et()-nd)&&(pe&2)===0?Ra(e,0):Nu|=t,Ta===ce&&(Ta=0)),to(e)}function Fb(e,n){n===0&&(n=Ix()),e=mi(e,n),e!==null&&(hc(e,n),to(e))}function Fq(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Fb(e,t)}function Yq(e,n){var t=0;switch(e.tag){case 31:case 13:var o=e.stateNode,r=e.memoizedState;r!==null&&(t=r.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(L(314))}o!==null&&o.delete(n),Fb(e,t)}function Gq(e,n){return Gm(e,n)}var Ma=null,na=null,Am=!1,Bu=!1,Cp=!1,tr=0;function to(e){e!==na&&e.next===null&&(na===null?Ma=na=e:na=na.next=e),Bu=!0,Am||(Am=!0,Kq())}function bc(e,n){if(!Cp&&Bu){Cp=!0;do for(var t=!1,o=Ma;o!==null;){if(!n)if(e!==0){var r=o.pendingLanes;if(r===0)var i=0;else{var a=o.suspendedLanes,s=o.pingedLanes;i=(1<<31-tt(42|e)+1)-1,i&=r&~(a&~s),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(t=!0,Xv(o,i))}else i=ce,i=Hu(o,o===Se?i:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(i&3)===0||mc(o,i)||(t=!0,Xv(o,i));o=o.next}while(t);Cp=!1}}function Xq(){Yb()}function Yb(){Bu=Am=!1;var e=0;tr!==0&&oR()&&(e=tr);for(var n=et(),t=null,o=Ma;o!==null;){var r=o.next,i=Gb(o,n);i===0?(o.next=null,t===null?Ma=r:t.next=r,r===null&&(na=t)):(t=o,(e!==0||(i&3)!==0)&&(Bu=!0)),o=r}ze!==0&&ze!==5||bc(e,!1),tr!==0&&(tr=0)}function Gb(e,n){for(var t=e.suspendedLanes,o=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var a=31-tt(i),s=1<<a,c=r[a];c===-1?((s&t)===0||(s&o)!==0)&&(r[a]=dT(s,n)):c<=n&&(e.expiredLanes|=s),i&=~s}if(n=Se,t=ce,t=Hu(e,e===n?t:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,t===0||e===n&&(ge===2||ge===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&ip(o),e.callbackNode=null,e.callbackPriority=0;if((t&3)===0||mc(e,t)){if(n=t&-t,n===e.callbackPriority)return n;switch(o!==null&&ip(o),Km(t)){case 2:case 8:t=Mx;break;case 32:t=hu;break;case 268435456:t=Ax;break;default:t=hu}return o=Xb.bind(null,e),t=Gm(t,o),e.callbackPriority=n,e.callbackNode=t,n}return o!==null&&o!==null&&ip(o),e.callbackPriority=2,e.callbackNode=null,2}function Xb(e,n){if(ze!==0&&ze!==5)return e.callbackNode=null,e.callbackPriority=0,null;var t=e.callbackNode;if(rd()&&e.callbackNode!==t)return null;var o=ce;return o=Hu(e,e===Se?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(zb(e,o,n),Gb(e,et()),e.callbackNode!=null&&e.callbackNode===t?Xb.bind(null,e):null)}function Xv(e,n){if(rd())return null;zb(e,n,!0)}function Kq(){iR(function(){(pe&6)!==0?Gm(Rx,Xq):Yb()})}function Nh(){if(tr===0){var e=ai;e===0&&(e=Cl,Cl<<=1,(Cl&261888)===0&&(Cl=256)),tr=e}return tr}function Kv(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Kl(e)}function Zq(e,n,t,o,r){if(n==="submit"&&t&&t.stateNode===r){var i=Kv((r[Vn]||null).action),a=o.submitter;a&&(n=(n=a[Vn]||null)?Kv(n.formAction):a.getAttribute("formAction"),n!==null&&(i=n,a=null));var s=new Uu("action","action",null,o,r);e.push({event:s,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(tr!==0){var c=new FormData(r,a);cm(t,{pending:!0,data:c,method:r.method,action:i},null,c)}}else typeof i=="function"&&(s.preventDefault(),c=new FormData(r,a),cm(t,{pending:!0,data:c,method:r.method,action:i},i,c))},currentTarget:r}]})}}for(Vl=0;Vl<Wp.length;Vl++)Ul=Wp[Vl],Zv=Ul.toLowerCase(),Qv=Ul[0].toUpperCase()+Ul.slice(1),Ot(Zv,"on"+Qv);var Ul,Zv,Qv,Vl;Ot(iw,"onAnimationEnd");Ot(aw,"onAnimationIteration");Ot(sw,"onAnimationStart");Ot("dblclick","onDoubleClick");Ot("focusin","onFocus");Ot("focusout","onBlur");Ot(aq,"onTransitionRun");Ot(sq,"onTransitionStart");Ot(cq,"onTransitionCancel");Ot(cw,"onTransitionEnd");Da("onMouseEnter",["mouseout","mouseover"]);Da("onMouseLeave",["mouseout","mouseover"]);Da("onPointerEnter",["pointerout","pointerover"]);Da("onPointerLeave",["pointerout","pointerover"]);fi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fi("onBeforeInput",["compositionend","keypress","textInput","paste"]);fi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ic="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Qq=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ic));function Kb(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var o=e[t],r=o.event;o=o.listeners;e:{var i=void 0;if(n)for(var a=o.length-1;0<=a;a--){var s=o[a],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==i&&r.isPropagationStopped())break e;i=s,r.currentTarget=l;try{i(r)}catch(u){gu(u)}r.currentTarget=null,i=c}else for(a=0;a<o.length;a++){if(s=o[a],c=s.instance,l=s.currentTarget,s=s.listener,c!==i&&r.isPropagationStopped())break e;i=s,r.currentTarget=l;try{i(r)}catch(u){gu(u)}r.currentTarget=null,i=c}}}}function ae(e,n){var t=n[F0];t===void 0&&(t=n[F0]=new Set);var o=e+"__bubble";t.has(o)||(Zb(n,e,2,!1),t.add(o))}function Tp(e,n,t){var o=0;n&&(o|=4),Zb(t,e,o,n)}var Fl="_reactListening"+Math.random().toString(36).slice(2);function Ih(e){if(!e[Fl]){e[Fl]=!0,jx.forEach(function(t){t!=="selectionchange"&&(Qq.has(t)||Tp(t,!1,e),Tp(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Fl]||(n[Fl]=!0,Tp("selectionchange",!1,n))}}function Zb(e,n,t,o){switch(x1(n)){case 2:var r=VR;break;case 8:r=UR;break;default:r=Hh}t=r.bind(null,n,t,e),r=void 0,!Xp||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(r=!0),o?r!==void 0?e.addEventListener(n,t,{capture:!0,passive:r}):e.addEventListener(n,t,!0):r!==void 0?e.addEventListener(n,t,{passive:r}):e.addEventListener(n,t,!1)}function qp(e,n,t,o,r){var i=o;if((n&1)===0&&(n&2)===0&&o!==null)e:for(;;){if(o===null)return;var a=o.tag;if(a===3||a===4){var s=o.stateNode.containerInfo;if(s===r)break;if(a===4)for(a=o.return;a!==null;){var c=a.tag;if((c===3||c===4)&&a.stateNode.containerInfo===r)return;a=a.return}for(;s!==null;){if(a=Qr(s),a===null)return;if(c=a.tag,c===5||c===6||c===26||c===27){o=i=a;continue e}s=s.parentNode}}o=o.return}Kx(function(){var l=i,u=Qm(t),f=[];e:{var d=lw.get(e);if(d!==void 0){var p=Uu,m=e;switch(e){case"keypress":if(Ql(t)===0)break e;case"keydown":case"keyup":p=zT;break;case"focusin":m="focus",p=dp;break;case"focusout":m="blur",p=dp;break;case"beforeblur":case"afterblur":p=dp;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=$0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=_T;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=HT;break;case iw:case aw:case sw:p=CT;break;case cw:p=UT;break;case"scroll":case"scrollend":p=kT;break;case"wheel":p=YT;break;case"copy":case"cut":case"paste":p=qT;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=ev;break;case"submit":p=LT;break;case"toggle":case"beforetoggle":p=XT}var g=(n&4)!==0,x=!g&&(e==="scroll"||e==="scrollend"),h=g?d!==null?d+"Capture":null:d;g=[];for(var v=l,y;v!==null;){var w=v;if(y=w.stateNode,w=w.tag,w!==5&&w!==26&&w!==27||y===null||h===null||(w=Ws(v,h),w!=null&&g.push(ac(v,w,y))),x)break;v=v.return}0<g.length&&(d=new p(d,m,null,t,u),f.push({event:d,listeners:g}))}}if((n&7)===0){e:{if(p=e==="mouseover"||e==="pointerover",d=e==="mouseout"||e==="pointerout",p&&t!==Gp&&(m=t.relatedTarget||t.fromElement)&&(Qr(m)||m[Ba]))break e;(d||p)&&(m=u.window===u?u:(p=u.ownerDocument)?p.defaultView||p.parentWindow:window,d?(p=t.relatedTarget||t.toElement,d=l,p=p?Qr(p):null,p!==null&&(x=fc(p),g=p.tag,p!==x||g!==5&&g!==27&&g!==6)&&(p=null)):(d=null,p=l),d!==p&&(g=$0,w="onMouseLeave",h="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(g=ev,w="onPointerLeave",h="onPointerEnter",v="pointer"),x=d==null?m:Is(d),y=p==null?m:Is(p),m=new g(w,v+"leave",d,t,u),m.target=x,m.relatedTarget=y,w=null,Qr(u)===l&&(g=new g(h,v+"enter",p,t,u),g.target=y,g.relatedTarget=x,w=g),x=w,g=d&&p?Ip(d,p,Wq):null,d!==null&&Wv(f,m,d,g,!1),p!==null&&x!==null&&Wv(f,x,p,g,!0)))}e:{if(d=l?Is(l):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var b=rv;else if(ov(d))if(ew)b=oq;else{b=nq;var _=eq}else p=d.nodeName,!p||p.toLowerCase()!=="input"||d.type!=="checkbox"&&d.type!=="radio"?l&&Zm(l.elementType)&&(b=rv):b=tq;if(b&&(b=b(e,l))){Jx(f,b,t,u);break e}_&&_(e,d,l)}switch(_=l?Is(l):window,e){case"focusin":(ov(_)||_.contentEditable==="true")&&(sa=_,Zp=l,Ls=null);break;case"focusout":Ls=Zp=sa=null;break;case"mousedown":Qp=!0;break;case"contextmenu":case"mouseup":case"dragend":Qp=!1,cv(f,t,u);break;case"selectionchange":if(iq)break;case"keydown":case"keyup":cv(f,t,u)}var k;if(Jm)e:{switch(e){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else aa?Wx(e,t)&&(D="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(D="onCompositionStart");D&&(Qx&&t.locale!=="ko"&&(aa||D!=="onCompositionStart"?D==="onCompositionEnd"&&aa&&(k=Zx()):($o=u,Wm="value"in $o?$o.value:$o.textContent,aa=!0)),_=Pu(l,D),0<_.length&&(D=new J0(D,e,null,t,u),f.push({event:D,listeners:_}),k?D.data=k:(k=$x(t),k!==null&&(D.data=k)))),(k=ZT?QT(e,t):WT(e,t))&&(D=Pu(l,"onBeforeInput"),0<D.length&&(_=new J0("onBeforeInput","beforeinput",null,t,u),f.push({event:_,listeners:D}),_.data=k)),Zq(f,e,l,t,u)}Kb(f,n)})}function ac(e,n,t){return{instance:e,listener:n,currentTarget:t}}function Pu(e,n){for(var t=n+"Capture",o=[];e!==null;){var r=e,i=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||i===null||(r=Ws(e,t),r!=null&&o.unshift(ac(e,r,i)),r=Ws(e,n),r!=null&&o.push(ac(e,r,i))),e.tag===3)return o;e=e.return}return[]}function Wq(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Wv(e,n,t,o,r){for(var i=n._reactName,a=[];t!==null&&t!==o;){var s=t,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===o)break;s!==5&&s!==26&&s!==27||l===null||(c=l,r?(l=Ws(t,i),l!=null&&a.unshift(ac(t,l,c))):r||(l=Ws(t,i),l!=null&&a.push(ac(t,l,c)))),t=t.return}a.length!==0&&e.push({event:n,listeners:a})}var $q=/\r\n?/g,Jq=/\u0000|\uFFFD/g;function $v(e){return(typeof e=="string"?e:""+e).replace($q,`
`).replace(Jq,"")}function Qb(e,n){return n=$v(n),$v(e)===n}function ve(e,n,t,o,r,i){switch(t){case"children":if(typeof o=="string")n==="body"||n==="textarea"&&o===""||Ea(e,o);else if(typeof o=="number"||typeof o=="bigint")n!=="body"&&Ea(e,""+o);else return;break;case"className":Rl(e,"class",o);break;case"tabIndex":Rl(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Rl(e,t,o);break;case"style":Xx(e,o,i);return;case"data":if(n!=="object"){Rl(e,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||t!=="href")){e.removeAttribute(t);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(t);break}o=Kl(o),e.setAttribute(t,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(t,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(t==="formAction"?(n!=="input"&&ve(e,n,"name",r.name,r,null),ve(e,n,"formEncType",r.formEncType,r,null),ve(e,n,"formMethod",r.formMethod,r,null),ve(e,n,"formTarget",r.formTarget,r,null)):(ve(e,n,"encType",r.encType,r,null),ve(e,n,"method",r.method,r,null),ve(e,n,"target",r.target,r,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(t);break}o=Kl(o),e.setAttribute(t,o);break;case"onClick":o!=null&&(e.onclick=Zt);return;case"onScroll":o!=null&&ae("scroll",e);return;case"onScrollEnd":o!=null&&ae("scrollend",e);return;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(L(61));if(t=o.__html,t!=null){if(r.children!=null)throw Error(L(60));i?.__html!==t&&(e.innerHTML=t)}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}t=Kl(o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",t);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(t,o):e.removeAttribute(t);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(t,""):e.removeAttribute(t);break;case"capture":case"download":o===!0?e.setAttribute(t,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(t,o):e.removeAttribute(t);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(t,o):e.removeAttribute(t);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(t):e.setAttribute(t,o);break;case"popover":ae("beforetoggle",e),ae("toggle",e),Xl(e,"popover",o);break;case"xlinkActuate":ho(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":ho(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":ho(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":ho(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":ho(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":ho(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":ho(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":ho(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":ho(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":Xl(e,"is",o);break;case"innerText":case"textContent":return;default:if(!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")t=wT.get(t)||t,Xl(e,t,o);else return}de=!0}function Nm(e,n,t,o,r,i){switch(t){case"style":Xx(e,o,i);return;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(L(61));if(t=o.__html,t!=null){if(r.children!=null)throw Error(L(60));i?.__html!==t&&(e.innerHTML=t)}}break;case"children":if(typeof o=="string")Ea(e,o);else if(typeof o=="number"||typeof o=="bigint")Ea(e,""+o);else return;break;case"onScroll":o!=null&&ae("scroll",e);return;case"onScrollEnd":o!=null&&ae("scrollend",e);return;case"onClick":o!=null&&(e.onclick=Zt);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Hx.hasOwnProperty(t))e:{if(t[0]==="o"&&t[1]==="n"&&(r=t.endsWith("Capture"),i=t.slice(2,r?t.length-7:void 0),n=e[Vn]||null,n=n!=null?n[t]:null,typeof n=="function"&&e.removeEventListener(i,n,r),typeof o=="function")){typeof n!="function"&&n!==null&&(t in e?e[t]=null:e.hasAttribute(t)&&e.removeAttribute(t)),e.addEventListener(i,o,r);break e}de=!0,t in e?e[t]=o:o===!0?e.setAttribute(t,""):Xl(e,t,o)}return}de=!0}function mn(e,n,t){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ae("error",e),ae("load",e);var o=!1,r=!1,i;for(i in t)if(t.hasOwnProperty(i)){var a=t[i];if(a!=null)switch(i){case"src":o=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(L(137,n));default:ve(e,n,i,a,t,null)}}r&&ve(e,n,"srcSet",t.srcSet,t,null),o&&ve(e,n,"src",t.src,t,null);return;case"input":ae("invalid",e);var s=i=a=r=null,c=null,l=null;for(o in t)if(t.hasOwnProperty(o)){var u=t[o];if(u!=null)switch(o){case"name":r=u;break;case"type":a=u;break;case"checked":c=u;break;case"defaultChecked":l=u;break;case"value":i=u;break;case"defaultValue":s=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(L(137,n));break;default:ve(e,n,o,u,t,null)}}Fx(e,i,s,c,l,a,r,!1);return;case"select":ae("invalid",e),o=a=i=null;for(r in t)if(t.hasOwnProperty(r)&&(s=t[r],s!=null))switch(r){case"value":i=s;break;case"defaultValue":a=s;break;case"multiple":o=s;default:ve(e,n,r,s,t,null)}n=i,t=a,e.multiple=!!o,n!=null?ha(e,!!o,n,!1):t!=null&&ha(e,!!o,t,!0);return;case"textarea":ae("invalid",e),i=r=o=null;for(a in t)if(t.hasOwnProperty(a)&&(s=t[a],s!=null))switch(a){case"value":o=s;break;case"defaultValue":r=s;break;case"children":i=s;break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(L(91));break;default:ve(e,n,a,s,t,null)}Gx(e,o,r,i);return;case"option":for(c in t)if(t.hasOwnProperty(c)&&(o=t[c],o!=null))switch(c){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:ve(e,n,c,o,t,null)}return;case"dialog":ae("beforetoggle",e),ae("toggle",e),ae("cancel",e),ae("close",e);break;case"iframe":case"object":ae("load",e);break;case"video":case"audio":for(o=0;o<ic.length;o++)ae(ic[o],e);break;case"image":ae("error",e),ae("load",e);break;case"details":ae("toggle",e);break;case"embed":case"source":case"link":ae("error",e),ae("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(l in t)if(t.hasOwnProperty(l)&&(o=t[l],o!=null))switch(l){case"children":case"dangerouslySetInnerHTML":throw Error(L(137,n));default:ve(e,n,l,o,t,null)}return;default:if(Zm(n)){for(u in t)t.hasOwnProperty(u)&&(o=t[u],o!==void 0&&Nm(e,n,u,o,t,void 0));return}}for(s in t)t.hasOwnProperty(s)&&(o=t[s],o!=null&&ve(e,n,s,o,t,null))}var eR={};function nR(e,n,t,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,i=null,a=null,s=null,c=null,l=null,u=null;for(p in t){var f=t[p];if(t.hasOwnProperty(p)&&f!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":c=f;default:o.hasOwnProperty(p)||ve(e,n,p,null,o,f)}}for(var d in o){var p=o[d];if(f=t[d],o.hasOwnProperty(d)&&(p!=null||f!=null))switch(d){case"type":p!==f&&(de=!0),i=p;break;case"name":p!==f&&(de=!0),r=p;break;case"checked":p!==f&&(de=!0),l=p;break;case"defaultChecked":p!==f&&(de=!0),u=p;break;case"value":p!==f&&(de=!0),a=p;break;case"defaultValue":p!==f&&(de=!0),s=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(L(137,n));break;default:p!==f&&ve(e,n,d,p,o,f)}}Yp(e,a,s,c,l,u,i,r);return;case"select":p=a=s=d=null;for(i in t)if(c=t[i],t.hasOwnProperty(i)&&c!=null)switch(i){case"value":break;case"multiple":p=c;default:o.hasOwnProperty(i)||ve(e,n,i,null,o,c)}for(r in o)if(i=o[r],c=t[r],o.hasOwnProperty(r)&&(i!=null||c!=null))switch(r){case"value":i!==c&&(de=!0),d=i;break;case"defaultValue":i!==c&&(de=!0),s=i;break;case"multiple":i!==c&&(de=!0),a=i;default:i!==c&&ve(e,n,r,i,o,c)}n=s,t=a,o=p,d!=null?ha(e,!!t,d,!1):!!o!=!!t&&(n!=null?ha(e,!!t,n,!0):ha(e,!!t,t?[]:"",!1));return;case"textarea":p=d=null;for(s in t)if(r=t[s],t.hasOwnProperty(s)&&r!=null&&!o.hasOwnProperty(s))switch(s){case"value":break;case"children":break;default:ve(e,n,s,null,o,r)}for(a in o)if(r=o[a],i=t[a],o.hasOwnProperty(a)&&(r!=null||i!=null))switch(a){case"value":r!==i&&(de=!0),d=r;break;case"defaultValue":r!==i&&(de=!0),p=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(L(91));break;default:r!==i&&ve(e,n,a,r,o,i)}Yx(e,d,p);return;case"option":for(var m in t)if(d=t[m],t.hasOwnProperty(m)&&d!=null&&!o.hasOwnProperty(m))switch(m){case"selected":e.selected=!1;break;default:ve(e,n,m,null,o,d)}for(c in o)if(d=o[c],p=t[c],o.hasOwnProperty(c)&&d!==p&&(d!=null||p!=null))switch(c){case"selected":d!==p&&(de=!0),e.selected=d&&typeof d!="function"&&typeof d!="symbol";break;default:ve(e,n,c,d,o,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var g in t)d=t[g],t.hasOwnProperty(g)&&d!=null&&!o.hasOwnProperty(g)&&ve(e,n,g,null,o,d);for(l in o)if(d=o[l],p=t[l],o.hasOwnProperty(l)&&d!==p&&(d!=null||p!=null))switch(l){case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(L(137,n));break;default:ve(e,n,l,d,o,p)}return;default:if(Zm(n)){for(var x in t)d=t[x],t.hasOwnProperty(x)&&d!==void 0&&!o.hasOwnProperty(x)&&Nm(e,n,x,void 0,o,d);for(u in o)d=o[u],p=t[u],!o.hasOwnProperty(u)||d===p||d===void 0&&p===void 0||Nm(e,n,u,d,o,p);return}}for(var h in t)d=t[h],t.hasOwnProperty(h)&&d!=null&&!o.hasOwnProperty(h)&&ve(e,n,h,null,o,d);for(f in o)d=o[f],p=t[f],!o.hasOwnProperty(f)||d===p||d==null&&p==null||ve(e,n,f,d,o,p)}function Jv(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function tR(){if(typeof performance.getEntriesByType=="function"){for(var e=0,n=0,t=performance.getEntriesByType("resource"),o=0;o<t.length;o++){var r=t[o],i=r.transferSize,a=r.initiatorType,s=r.duration;if(i&&s&&Jv(a)){for(a=0,s=r.responseEnd,o+=1;o<t.length;o++){var c=t[o],l=c.startTime;if(l>s)break;var u=c.transferSize,f=c.initiatorType;u&&Jv(f)&&(c=c.responseEnd,a+=u*(c<s?1:(s-l)/(c-l)))}if(--o,n+=8*(i+a)/(r.duration/1e3),e++,10<e)break}}if(0<e)return n/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Im=null,Om=null;function sc(e){return e.nodeType===9?e:e.ownerDocument}function ex(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Wb(e,n){if(e===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&n==="foreignObject"?0:e}function $b(e,n,t,o){return t=sc(t).createElement(e),t[un]=o,t[Vn]=n,mn(t,e,n),rn(t),t}function zm(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Rp=null;function oR(){var e=window.event;return e&&e.type==="popstate"?e===Rp?!1:(Rp=e,!0):(Rp=null,!1)}var Oh=typeof setTimeout=="function"?setTimeout:void 0,rR=typeof clearTimeout=="function"?clearTimeout:void 0,nx=typeof Promise=="function"?Promise:void 0,tx=typeof requestAnimationFrame=="function"?requestAnimationFrame:Oh,iR=typeof queueMicrotask=="function"?queueMicrotask:typeof nx<"u"?function(e){return nx.resolve(null).then(e).catch(aR)}:Oh;function aR(e){setTimeout(function(){throw e})}function xr(e){return e==="head"}function ox(e,n){var t=n,o=0;do{var r=t.nextSibling;if(e.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"||t==="/&"){if(o===0){e.removeChild(r),za(n);return}o--}else if(t==="$"||t==="$?"||t==="$~"||t==="$!"||t==="&")o++;else if(t==="html")Ap(e.ownerDocument.documentElement);else if(t==="head"){t=e.ownerDocument.head,Ap(t);for(var i=t.firstChild;i;){var a=i.nextSibling,s=i.nodeName;i[yc]||s==="SCRIPT"||s==="STYLE"||s==="LINK"&&i.rel.toLowerCase()==="stylesheet"||t.removeChild(i),i=a}}else t==="body"&&Ap(e.ownerDocument.body);t=r}while(t);za(n)}function rx(e,n){var t=e;e=0;do{var o=t.nextSibling;if(t.nodeType===1?n?(t._stashedDisplay=t.style.display,t.style.display="none"):(t.style.display=t._stashedDisplay||"",t.getAttribute("style")===""&&t.removeAttribute("style")):t.nodeType===3&&(n?(t._stashedText=t.nodeValue,t.nodeValue=""):t.nodeValue=t._stashedText||""),o&&o.nodeType===8)if(t=o.data,t==="/$"){if(e===0)break;e--}else t!=="$"&&t!=="$?"&&t!=="$~"&&t!=="$!"||e++;t=o}while(t)}function Jb(e,n,t){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,e.style.viewTransitionName=n,t!=null&&(e.style.viewTransitionClass=t),t=getComputedStyle(e),t.display==="inline"){if(n=e.getClientRects(),n.length===1)var o=1;else for(var r=o=0;r<n.length;r++){var i=n[r];0<i.width&&0<i.height&&o++}o===1&&(e=e.style,e.display=n.length===1?"inline-block":"block",e.marginTop="-"+t.paddingTop,e.marginBottom="-"+t.paddingBottom)}}function e1(e,n){e=e.style,n=n.style;var t=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;e.viewTransitionName=t==null||typeof t=="boolean"?"":(""+t).trim(),t=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,e.viewTransitionClass=t==null||typeof t=="boolean"?"":(""+t).trim(),e.display==="inline-block"&&(n==null?e.display=e.margin="":(t=n.display,e.display=t==null||typeof t=="boolean"?"":t,t=n.margin,t!=null?e.margin=t:(t=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],e.marginTop=t==null||typeof t=="boolean"?"":t,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],e.marginBottom=n==null||typeof n=="boolean"?"":n)))}function n1(e,n,t){return t=t.ownerDocument.defaultView,{rect:e,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=t.innerHeight&&e.left<=t.innerWidth}}function Bm(e){var n=e.getBoundingClientRect(),t=getComputedStyle(e);return n1(n,t,e)}function sR(e){var n=e.getBoundingClientRect();n=new DOMRect(n.x+2e4,n.y+2e4,n.width,n.height);var t=getComputedStyle(e);return n1(n,t,e)}function cR(e){return e.documentElement.clientHeight}function lR(e){this.addEventListener("load",e),this.addEventListener("error",e)}function uR(e,n,t,o,r,i,a,s,c){var l=n.nodeType===9?n:n.ownerDocument;try{var u=l.startViewTransition({update:function(){var d=l.defaultView,p=d.navigation&&d.navigation.transition,m=l.fonts.status;o();var g=[];if(m==="loaded"&&(cR(l),l.fonts.status==="loading"&&g.push(l.fonts.ready)),m=g.length,e!==null)for(var x=e.suspenseyImages,h=0,v=0;v<x.length;v++){var y=x[v];if(!y.complete){var w=y.getBoundingClientRect();if(0<w.bottom&&0<w.right&&w.top<d.innerHeight&&w.left<d.innerWidth){if(h+=p1(y),h>lu){g.length=m;break}y=new Promise(lR.bind(y)),g.push(y)}}}if(0<g.length)return d=Promise.race([Promise.all(g),new Promise(function(b){return setTimeout(b,500)})]).then(r,r),(p?Promise.allSettled([p.finished,d]):d).then(i,i);if(r(),p)return p.finished.then(i,i);i()},types:t});l.__reactViewTransition=u;var f=[];return u.ready.then(function(){for(var d=l.documentElement.getAnimations({subtree:!0}),p=0;p<d.length;p++){var m=d[p],g=m.effect,x=g.pseudoElement;if(x!=null&&x.startsWith("::view-transition")){f.push(m),m=g.getKeyframes();for(var h=x=void 0,v=!0,y=0;y<m.length;y++){var w=m[y],b=w.width;if(x===void 0)x=b;else if(x!==b){v=!1;break}if(b=w.height,h===void 0)h=b;else if(h!==b){v=!1;break}delete w.width,delete w.height,w.transform==="none"&&delete w.transform}v&&x!==void 0&&h!==void 0&&(g.setKeyframes(m),v=getComputedStyle(g.target,g.pseudoElement),v.width!==x||v.height!==h)&&(v=m[0],v.width=x,v.height=h,v=m[m.length-1],v.width=x,v.height=h,g.setKeyframes(m))}}a()},function(d){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof d=="object"&&d!==null)switch(d.name){case"InvalidStateError":(d.message==="View transition was skipped because document visibility state is hidden."||d.message==="Skipping view transition because document visibility state has become hidden."||d.message==="Skipping view transition because viewport size changed."||d.message==="Transition was aborted because of invalid state")&&(d=null)}d!==null&&c(d)}finally{o(),r(),a()}}),u.finished.finally(function(){for(var d=0;d<f.length;d++)f[d].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return o(),r(),a(),null}}function Wr(e,n){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+n+")"}Wr.prototype.animate=function(e,n){return n=typeof n=="number"?{duration:n}:_e({},n),n.pseudoElement=this._selector,this._scope.animate(e,n)};Wr.prototype.getAnimations=function(){for(var e=this._scope,n=this._selector,t=e.getAnimations({subtree:!0}),o=[],r=0;r<t.length;r++){var i=t[r].effect;i!==null&&i.target===e&&i.pseudoElement===n&&o.push(t[r])}return o};Wr.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function t1(e){return{name:e,group:new Wr("group",e),imagePair:new Wr("image-pair",e),old:new Wr("old",e),new:new Wr("new",e)}}function it(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}it.prototype.addEventListener=function(e,n,t){var o=null,r=null;if(!(t!=null&&typeof t!="boolean"&&(o=t.signal||null,o!==null&&o.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var i=this._eventListeners;if(o1(i,e,n,t)===-1){var a=this,s=n;t!=null&&typeof t!="boolean"&&t.once===!0&&(s=function(c){a.removeEventListener(e,n,t),typeof n=="function"?n.call(this,c):n.handleEvent(c)}),o!==null&&(r=a.removeEventListener.bind(a,e,n,t),o.addEventListener("abort",r,{once:!0}),r=o.removeEventListener.bind(o,"abort",r)),o=Aa(t),i.push({type:e,listener:n,optionsOrUseCapture:t,attachedListener:s,cleanup:r}),Hn(this._fragmentFiber.child,!1,dR,e,s,o)}this._eventListeners=i}};function dR(e,n,t,o){return $e(e).addEventListener(n,t,o),!1}it.prototype.removeEventListener=function(e,n,t){var o=this._eventListeners;if(o!==null&&(n=o1(o,e,n,t),n!==-1)){var r=o[n];t=r.attachedListener;var i=r.cleanup;r=Aa(r.optionsOrUseCapture),Hn(this._fragmentFiber.child,!1,fR,e,t,r),o.splice(n,1),i!==null&&i()}};function fR(e,n,t,o){return $e(e).removeEventListener(n,t,o),!1}function Aa(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function ix(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function o1(e,n,t,o){if(e.length===0)return-1;o=ix(o);for(var r=0;r<e.length;r++){var i=e[r];if(i.type===n&&i.listener===t&&ix(i.optionsOrUseCapture)===o)return r}return-1}it.prototype.dispatchEvent=function(e){var n=di(this._fragmentFiber);if(n===null)return!0;n=$e(n);var t=this._eventListeners;if(t!==null&&0<t.length||!e.bubbles){var o=n.nodeType===9?n.createComment(""):document.createTextNode("");if(t)for(var r=0;r<t.length;r++){var i=t[r];o.addEventListener(i.type,i.attachedListener,Aa(i.optionsOrUseCapture))}if(n.appendChild(o),e=o.dispatchEvent(e),t)for(r=0;r<t.length;r++)i=t[r],o.removeEventListener(i.type,i.attachedListener,Aa(i.optionsOrUseCapture));return n.removeChild(o),e}return n.dispatchEvent(e)};it.prototype.focus=function(e){Hn(this._fragmentFiber.child,!0,r1,e,void 0,void 0)};function r1(e,n){return e.tag===6?!1:(e=$e(e),_R(e,n))}it.prototype.focusLast=function(e){var n=[];Hn(this._fragmentFiber.child,!0,zh,n,void 0,void 0);for(var t=n.length-1;0<=t&&!r1(n[t],e);t--);};function zh(e,n){return n.push(e),!1}it.prototype.blur=function(){var e=di(this._fragmentFiber);e!==null&&(e=$e(e),e=sc(e).activeElement,e!==null&&Hn(this._fragmentFiber.child,!1,pR,e,void 0,void 0))};function pR(e,n){return e.tag===6?!1:(e=$e(e),e===n||e.contains(n)?(n.blur(),!0):!1)}it.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),Hn(this._fragmentFiber.child,!1,mR,e,void 0,void 0)};function mR(e,n){return e.tag===6||(e=$e(e),n.observe(e)),!1}it.prototype.unobserveUsing=function(e){var n=this._observers;if(n!==null&&n.has(e)){n.delete(e),Hn(this._fragmentFiber.child,!1,hR,e,void 0,void 0);for(var t=n=0;t<Nt.length;t++){var o=Nt[t];o.fragmentInstance===this&&o.observer===e?e.unobserve(o.instance):Nt[n++]=o}Nt.length=n}};function hR(e,n){return e.tag===6||(e=$e(e),n.unobserve(e)),!1}var Nt=[],Mp=!1;function yR(e,n,t){Nt.push({fragmentInstance:e,observer:n,instance:t}),Mp||(Mp=!0,DR(function(){Mp=!1;var o=Nt;Nt=[];for(var r=0;r<o.length;r++){var i=o[r];i.observer.unobserve(i.instance)}}))}it.prototype.getClientRects=function(){var e=[];return Hn(this._fragmentFiber.child,!1,gR,e,void 0,void 0),e};function gR(e,n){if(e.tag===6){e=e.stateNode;var t=e.ownerDocument.createRange();t.selectNodeContents(e),n.push.apply(n,t.getClientRects())}else e=$e(e),n.push.apply(n,e.getClientRects());return!1}it.prototype.getRootNode=function(e){var n=di(this._fragmentFiber);return n===null?this:$e(n).getRootNode(e)};it.prototype.compareDocumentPosition=function(e){var n=di(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var t=[];Hn(this._fragmentFiber.child,!1,zh,t,void 0,void 0);var o=$e(n);if(t.length===0){if(t=o,P0(this._fragmentFiber)){e:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break e}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(t=n)}n=this._fragmentFiber;var r=o=t.compareDocumentPosition(e);return t===e?r=Node.DOCUMENT_POSITION_CONTAINS:o&Node.DOCUMENT_POSITION_CONTAINED_BY&&(t=Ex(n)[1],t===null?r=Node.DOCUMENT_POSITION_PRECEDING:(e=$e(t).compareDocumentPosition(e),r=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),r|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=$e(t[0]),r=$e(t[t.length-1]);var i=P0(this._fragmentFiber)?n.parentElement:o;if(i==null)return Node.DOCUMENT_POSITION_DISCONNECTED;o=i.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,i=i.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_CONTAINED_BY;var a=n.compareDocumentPosition(e),s=r.compareDocumentPosition(e),c=a&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=o&&i&&a&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,n=o&&n===e||i&&r===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!o&&n===e||!i&&r===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:a,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||vR(n,this._fragmentFiber,t[0],t[t.length-1],e)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function vR(e,n,t,o,r){var i=Qr(r);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(t=!!i)e:{for(;i!==null;){if(i.tag===7&&(i===n||i.alternate===n)){t=!0;break e}i=i.return}t=!1}return t}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(i===null)return i=r.ownerDocument,r===i||r===i.documentElement||r===i.body;e:{for(i=n,n=di(n);i!==null;){if(!(i.tag!==5&&i.tag!==3&&i.tag!==27||i!==n&&i.alternate!==n)){i=!0;break e}i=i.return}i=!1}return i}return e&Node.DOCUMENT_POSITION_PRECEDING?((n=!!i)&&!(n=i===t)&&(n=Ip(t,i,L0),n===null?n=!1:(Hn(n,!0,KC,i,t),i=ta,ta=null,n=i!==null)),n):e&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!i)&&!(n=i===o)&&(n=Ip(o,i,L0),n===null?n=!1:(Hn(n,!0,ZC,i,o),i=ta,Np=ta=null,n=i!==null)),n):!1}function ax(e,n){var t=e.ownerDocument.createRange();t.selectNodeContents(e),e=t.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,n?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}it.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(L(566));var n=[];Hn(this._fragmentFiber.child,!1,zh,n,void 0,void 0);var t=e!==!1;if(n.length===0){var o=Ex(this._fragmentFiber);if(o=t?o[1]||o[0]||di(this._fragmentFiber):o[0]||o[1],o===null)return;if(o.tag===6){e=$e(o),ax(e,t);return}if(o=$e(o),o.nodeType!==9){if(o.nodeType===11){t="host"in o?o.host:null,t!==null&&t.scrollIntoView(e);return}o.scrollIntoView(e)}}for(o=t?n.length-1:0;o!==(t?-1:n.length);){var r=n[o];r.tag===6?(r=$e(r),ax(r,t)):$e(r).scrollIntoView(e),o+=t?-1:1}};function xR(e,n){return e=$e(e),i1(e,n),!1}function i1(e,n){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(n)}function a1(e,n){var t=n._eventListeners;if(t!==null)for(var o=0;o<t.length;o++){var r=t[o];e.addEventListener(r.type,r.attachedListener,Aa(r.optionsOrUseCapture))}e.nodeType!==3&&(t=n._observers,t!==null&&t.forEach(function(i){for(var a=0,s=0;s<Nt.length;s++){var c=Nt[s];(c.fragmentInstance!==n||c.observer!==i||c.instance!==e)&&(Nt[a++]=c)}Nt.length=a,i.observe(e)}),i1(e,n))}function wR(e,n){var t=n._eventListeners;if(t!==null)for(var o=0;o<t.length;o++){var r=t[o];e.removeEventListener(r.type,r.attachedListener,Aa(r.optionsOrUseCapture))}e.nodeType!==3&&(t=n._observers,t!==null&&t.forEach(function(i){typeof i.rootMargin=="string"?yR(n,i,e):i.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(n))}function Pm(e){var n=e.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var t=n;switch(n=n.nextSibling,t.nodeName){case"HTML":case"HEAD":case"BODY":Pm(t),Vu(t);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(t.rel.toLowerCase()==="stylesheet")continue}e.removeChild(t)}}function bR(e,n,t,o){for(;e.nodeType===1;){var r=t;if(e.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[yc])switch(n){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==r.rel||e.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||e.getAttribute("title")!==(r.title==null?null:r.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(r.src==null?null:r.src)||e.getAttribute("type")!==(r.type==null?null:r.type)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(n==="input"&&e.type==="hidden"){var i=r.name==null?null:""+r.name;if(r.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=xt(e.nextSibling),e===null)break}return null}function kR(e,n,t){if(n==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=xt(e.nextSibling),e===null))return null;return e}function s1(e,n){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=xt(e.nextSibling),e===null))return null;return e}function Lm(e){return e.data==="$?"||e.data==="$~"}function Bh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function SR(e,n){var t=e.ownerDocument;if(e.data==="$~")e._reactRetry=n;else if(e.data!=="$?"||t.readyState!=="loading")n();else{var o=function(){n(),t.removeEventListener("DOMContentLoaded",o)};t.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function xt(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return e}var jm=null;function sx(e){e=e.nextSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"||t==="/&"){if(n===0)return xt(e.nextSibling);n--}else t!=="$"&&t!=="$!"&&t!=="$?"&&t!=="$~"&&t!=="&"||n++}e=e.nextSibling}return null}function cx(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"){if(n===0)return e;n--}else t!=="/$"&&t!=="/&"||n++}e=e.previousSibling}return null}function _R(e,n){function t(){o=!0}if(e.ownerDocument.activeElement===e)return!0;var o=!1;try{e.ownerDocument.addEventListener("focus",t,!0),(e.focus||HTMLElement.prototype.focus).call(e,n)}finally{e.ownerDocument.removeEventListener("focus",t,!0)}return o}function DR(e){tx(function(){tx(function(n){return e(n)})})}function c1(e,n,t){switch(n=sc(t),e){case"html":if(e=n.documentElement,!e)throw Error(L(452));return e;case"head":if(e=n.head,!e)throw Error(L(453));return e;case"body":if(e=n.body,!e)throw Error(L(454));return e;default:throw Error(L(451))}}function l1(e,n,t){for(var o in t){var r=t[o];t.hasOwnProperty(o)&&r!=null&&ve(e,n,o,null,eR,r)}t.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Zt&&(e.onclick=null),Vu(e)}function Ap(e){for(var n=e.attributes;n.length;)e.removeAttributeNode(n[0]);Vu(e)}var wt=new Map,lx=new Set;function cc(e){if(typeof e.getRootNode=="function"){var n=e.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return e.nodeType===9?e:e.ownerDocument}var qo=me.d;me.d={f:ER,r:CR,D:TR,C:qR,L:RR,m:MR,X:NR,S:AR,M:IR};function ER(){var e=qo.f(),n=td();return e||n}function CR(e){var n=Pa(e);n!==null&&n.tag===5&&n.type==="form"?Xw(n):qo.r(e)}var Va=typeof document>"u"?null:document;function u1(e,n,t){var o=Va;if(o&&typeof n=="string"&&n){var r=yt(n);r='link[rel="'+e+'"][href="'+r+'"]',typeof t=="string"&&(r+='[crossorigin="'+t+'"]'),lx.has(r)||(lx.add(r),e={rel:e,crossOrigin:t,href:n},o.querySelector(r)===null&&(n=o.createElement("link"),mn(n,"link",e),rn(n),o.head.appendChild(n)))}}function TR(e){qo.D(e),u1("dns-prefetch",e,null)}function qR(e,n){qo.C(e,n),u1("preconnect",e,n)}function RR(e,n,t){qo.L(e,n,t);var o=Va;if(o&&e&&n){var r='link[rel="preload"][as="'+yt(n)+'"]';n==="image"&&t&&t.imageSrcSet?(r+='[imagesrcset="'+yt(t.imageSrcSet)+'"]',typeof t.imageSizes=="string"&&(r+='[imagesizes="'+yt(t.imageSizes)+'"]')):r+='[href="'+yt(e)+'"]';var i=r;switch(n){case"style":i=Na(e);break;case"script":i=Ua(e)}if(!(wt.has(i)||(e=_e({rel:"preload",href:n==="image"&&t&&t.imageSrcSet?void 0:e,as:n},t),wt.set(i,e),o.querySelector(r)!==null||n==="style"&&o.querySelector(kc(i))||n==="script"&&o.querySelector(Sc(i))))){var a=o.createElement("link");mn(a,"link",e),n==="style"&&(a[yu]=!0,a.onload=a.onerror=function(){Lx(a)}),rn(a),o.head.appendChild(a)}}}function MR(e,n){qo.m(e,n);var t=Va;if(t&&e){var o=n&&typeof n.as=="string"?n.as:"script",r='link[rel="modulepreload"][as="'+yt(o)+'"][href="'+yt(e)+'"]',i=r;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Ua(e)}if(!wt.has(i)&&(e=_e({rel:"modulepreload",href:e},n),wt.set(i,e),t.querySelector(r)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(t.querySelector(Sc(i)))return}o=t.createElement("link"),mn(o,"link",e),rn(o),t.head.appendChild(o)}}}function AR(e,n,t){qo.S(e,n,t);var o=Va;if(o&&e){var r=ma(o).hoistableStyles,i=Na(e);n=n||"default";var a=r.get(i);if(!a){var s={loading:0,preload:null};if(a=o.querySelector(kc(i)))s.loading=5;else{e=_e({rel:"stylesheet",href:e,"data-precedence":n},t),(t=wt.get(i))&&Ph(e,t);var c=a=o.createElement("link");rn(c),mn(c,"link",e),c._p=new Promise(function(l,u){c.onload=l,c.onerror=u}),c.addEventListener("load",function(){s.loading|=1}),c.addEventListener("error",function(){s.loading|=2}),s.loading|=4,su(a,n,o)}a={type:"stylesheet",instance:a,count:1,state:s},r.set(i,a)}}}function NR(e,n){qo.X(e,n);var t=Va;if(t&&e){var o=ma(t).hoistableScripts,r=Ua(e),i=o.get(r);i||(i=t.querySelector(Sc(r)),i||(e=_e({src:e,async:!0},n),(n=wt.get(r))&&Lh(e,n),i=t.createElement("script"),rn(i),mn(i,"link",e),t.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},o.set(r,i))}}function IR(e,n){qo.M(e,n);var t=Va;if(t&&e){var o=ma(t).hoistableScripts,r=Ua(e),i=o.get(r);i||(i=t.querySelector(Sc(r)),i||(e=_e({src:e,async:!0,type:"module"},n),(n=wt.get(r))&&Lh(e,n),i=t.createElement("script"),rn(i),mn(i,"link",e),t.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},o.set(r,i))}}function ux(e,n,t,o){var r=(r=or.current)?cc(r):null;if(!r)throw Error(L(446));switch(e){case"meta":case"title":return null;case"style":return typeof t.precedence=="string"&&typeof t.href=="string"?(t=Na(t.href),n=ma(r).hoistableStyles,o=n.get(t),o||(o={type:"style",instance:null,count:0,state:null},n.set(t,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(t.rel==="stylesheet"&&typeof t.href=="string"&&typeof t.precedence=="string"){e=Na(t.href);var i=ma(r).hoistableStyles,a=i.get(e);if(a||(r=r.ownerDocument||r,a={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,a),(i=r.querySelector(kc(e)))?i._p||(a.instance=i,a.state.loading=5):(i=wt.get(e),i||(i={rel:"preload",as:"style",href:t.href,crossOrigin:t.crossOrigin,integrity:t.integrity,media:t.media,hrefLang:t.hrefLang,referrerPolicy:t.referrerPolicy},wt.set(e,i)),OR(r,e,i,a.state))),n&&o===null)throw Error(L(528,""));return a}if(n&&o!==null)throw Error(L(529,""));return null;case"script":return n=t.async,t=t.src,typeof t=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(t=Ua(t),n=ma(r).hoistableScripts,o=n.get(t),o||(o={type:"script",instance:null,count:0,state:null},n.set(t,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(L(444,e))}}function Na(e){return'href="'+yt(e)+'"'}function kc(e){return'link[rel="stylesheet"]['+e+"]"}function d1(e){return _e({},e,{"data-precedence":e.precedence,precedence:null})}function OR(e,n,t,o){if(n=e.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[yu]!==!0){o.loading=1;return}}else n=e.createElement("link"),n[yu]=!0,n.onload=n.onerror=Lx.bind(null,n),mn(n,"link",t),rn(n),e.head.appendChild(n);o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2})}function Ua(e){return'[src="'+yt(e)+'"]'}function Sc(e){return"script[async]"+e}function dx(e,n,t){if(n.count++,n.instance===null)switch(n.type){case"style":var o=e.querySelector('style[data-href~="'+yt(t.href)+'"]');if(o)return n.instance=o,rn(o),o;var r=_e({},t,{"data-href":t.href,"data-precedence":t.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),rn(o),mn(o,"style",r),su(o,t.precedence,e),n.instance=o;case"stylesheet":r=Na(t.href);var i=e.querySelector(kc(r));if(i)return n.state.loading|=4,n.instance=i,rn(i),i;o=d1(t),(r=wt.get(r))&&Ph(o,r),i=(e.ownerDocument||e).createElement("link"),rn(i);var a=i;return a._p=new Promise(function(s,c){a.onload=s,a.onerror=c}),mn(i,"link",o),n.state.loading|=4,su(i,t.precedence,e),n.instance=i;case"script":return i=Ua(t.src),(r=e.querySelector(Sc(i)))?(n.instance=r,rn(r),r):(o=t,(r=wt.get(i))&&(o=_e({},t),Lh(o,r)),e=e.ownerDocument||e,r=e.createElement("script"),rn(r),mn(r,"link",o),e.head.appendChild(r),n.instance=r);case"void":return null;default:throw Error(L(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,su(o,t.precedence,e));return n.instance}function su(e,n,t){for(var o=t.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=o.length?o[o.length-1]:null,i=r,a=0;a<o.length;a++){var s=o[a];if(s.dataset.precedence===n)i=s;else if(i!==r)break}i?i.parentNode.insertBefore(e,i.nextSibling):(n=t.nodeType===9?t.head:t,n.insertBefore(e,n.firstChild))}function Ph(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.title==null&&(e.title=n.title)}function Lh(e,n){e.crossOrigin==null&&(e.crossOrigin=n.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=n.referrerPolicy),e.integrity==null&&(e.integrity=n.integrity)}var cu=null;function fx(e,n,t){if(cu===null){var o=new Map,r=cu=new Map;r.set(t,o)}else r=cu,o=r.get(t),o||(o=new Map,r.set(t,o));if(o.has(e))return o;for(o.set(e,null),t=t.getElementsByTagName(e),r=0;r<t.length;r++){var i=t[r];if(!(i[yc]||i[un]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var a=i.getAttribute(n)||"";a=e+a;var s=o.get(a);s?s.push(i):o.set(a,[i])}}return o}function Hm(e,n,t){e=e.ownerDocument||e,e.head.insertBefore(t,n==="title"?e.querySelector("head > title"):null)}function zR(e,n,t){if(t===1||n.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return e=n.disabled,typeof n.precedence=="string"&&e==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function px(e,n){return e==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function f1(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function p1(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function mx(e,n){typeof n.decode=="function"&&(e.imgCount++,n.complete||(e.imgBytes+=p1(n),e.suspenseyImages.push(n)),e=LR.bind(e),n.decode().then(e,e))}function BR(e,n,t,o){if(t.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var r=Na(o.href),i=n.querySelector(kc(r));if(i){n=i._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(e.count++,e=lc.bind(e),n.then(e,e)),t.state.loading|=4,t.instance=i,rn(i);return}i=n.ownerDocument||n,o=d1(o),(r=wt.get(r))&&Ph(o,r),i=i.createElement("link"),rn(i);var a=i;a._p=new Promise(function(s,c){a.onload=s,a.onerror=c}),mn(i,"link",o),t.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(e.count++,t=lc.bind(e),n.addEventListener("load",t),n.addEventListener("error",t))}}var lu=0;function PR(e,n){return e.stylesheets&&e.count===0&&uu(e,e.stylesheets),0<e.count||0<e.imgCount?function(t){var o=setTimeout(function(){if(e.stylesheets&&uu(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+n);0<e.imgBytes&&lu===0&&(lu=62500*tR());var r=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&uu(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>lu?50:800)+n);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(r)}}:null}function m1(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)uu(e,e.stylesheets);else if(e.unsuspend){var n=e.unsuspend;e.unsuspend=null,n()}}}function lc(){this.count--,m1(this)}function LR(){this.imgCount--,m1(this)}var Lu=null;function uu(e,n){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Lu=new Map,n.forEach(jR,e),Lu=null,lc.call(e))}function jR(e,n){if(!(n.state.loading&4)){var t=Lu.get(e);if(t)var o=t.get(null);else{t=new Map,Lu.set(e,t);for(var r=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<r.length;i++){var a=r[i];(a.nodeName==="LINK"||a.getAttribute("media")!=="not all")&&(t.set(a.dataset.precedence,a),o=a)}o&&t.set(null,o)}r=n.instance,a=r.getAttribute("data-precedence"),i=t.get(a)||o,i===o&&t.set(null,r),t.set(a,r),this.count++,o=lc.bind(this),r.addEventListener("load",o),r.addEventListener("error",o),i?i.parentNode.insertBefore(r,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(r,e.firstChild)),n.state.loading|=4}}var Ia={$$typeof:Kt,Provider:null,Consumer:null,_currentValue:$r,_currentValue2:$r,_threadCount:0};function HR(e,n,t,o,r,i,a,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ap(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ap(0),this.hiddenUpdates=ap(null),this.identifierPrefix=o,this.onUncaughtError=r,this.onCaughtError=i,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function h1(e,n,t,o,r,i,a,s,c,l,u,f){return e=new HR(e,n,t,a,c,l,u,f,s),n=1,i===!0&&(n|=24),i=Ln(3,null,null,n),e.current=i,i.stateNode=e,n=ih(),n.refCount++,e.pooledCache=n,n.refCount++,i.memoizedState={element:o,isDehydrated:t,cache:n},ch(i),e}function y1(e){return e?(e=ua,e):ua}function g1(e,n,t,o,r,i){r=y1(r),o.context===null?o.context=r:o.pendingContext=r,o=ir(n),o.payload={element:t},i=i===void 0?null:i,i!==null&&(o.callback=i),t=ar(e,o,n),t!==null&&(jn(t,e,n),Hs(t,e,n))}function hx(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function jh(e,n){hx(e,n),(e=e.alternate)&&hx(e,n)}function v1(e){if(e.tag===13||e.tag===31){var n=mi(e,67108864);n!==null&&jn(n,e,67108864),jh(e,67108864)}}function yx(e){if(e.tag===13||e.tag===31){var n=ot();n=Xm(n);var t=mi(e,n);t!==null&&jn(t,e,n),jh(e,n)}}var Oa=!0;function VR(e,n,t,o){var r=$.T;$.T=null;var i=me.p;try{me.p=2,Hh(e,n,t,o)}finally{me.p=i,$.T=r}}function UR(e,n,t,o){var r=$.T;$.T=null;var i=me.p;try{me.p=8,Hh(e,n,t,o)}finally{me.p=i,$.T=r}}function Hh(e,n,t,o){if(Oa){var r=Vm(o);if(r===null)qp(e,n,o,ju,t),gx(e,o);else if(YR(r,e,n,t,o))o.stopPropagation();else if(gx(e,o),n&4&&-1<FR.indexOf(e)){for(;r!==null;){var i=Pa(r);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var a=Xr(i.pendingLanes);if(a!==0){var s=i;for(s.pendingLanes|=2,s.entangledLanes|=2;a;){var c=1<<31-tt(a);s.entanglements[1]|=c,a&=~c}to(i),(pe&6)===0&&(Iu=et()+500,bc(0,!1))}}break;case 31:case 13:s=mi(i,2),s!==null&&jn(s,i,2),td(),jh(i,2)}if(i=Vm(o),i===null&&qp(e,n,o,ju,t),i===r)break;r=i}r!==null&&o.stopPropagation()}else qp(e,n,o,null,t)}}function Vm(e){return e=Qm(e),Vh(e)}var ju=null;function Vh(e){if(ju=null,e=Qr(e),e!==null){var n=fc(e);if(n===null)e=null;else{var t=n.tag;if(t===13){if(e=Sx(n),e!==null)return e;e=null}else if(t===31){if(e=_x(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null)}}return ju=e,null}function x1(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(rT()){case Rx:return 2;case Mx:return 8;case hu:case iT:return 32;case Ax:return 268435456;default:return 32}default:return 32}}var Um=!1,ur=null,dr=null,fr=null,uc=new Map,dc=new Map,Qo=[],FR="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function gx(e,n){switch(e){case"focusin":case"focusout":ur=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":fr=null;break;case"pointerover":case"pointerout":uc.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":dc.delete(n.pointerId)}}function Rs(e,n,t,o,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:n,domEventName:t,eventSystemFlags:o,nativeEvent:i,targetContainers:[r]},n!==null&&(n=Pa(n),n!==null&&v1(n)),e):(e.eventSystemFlags|=o,n=e.targetContainers,r!==null&&n.indexOf(r)===-1&&n.push(r),e)}function YR(e,n,t,o,r){switch(n){case"focusin":return ur=Rs(ur,e,n,t,o,r),!0;case"dragenter":return dr=Rs(dr,e,n,t,o,r),!0;case"mouseover":return fr=Rs(fr,e,n,t,o,r),!0;case"pointerover":var i=r.pointerId;return uc.set(i,Rs(uc.get(i)||null,e,n,t,o,r)),!0;case"gotpointercapture":return i=r.pointerId,dc.set(i,Rs(dc.get(i)||null,e,n,t,o,r)),!0}return!1}function w1(e){var n=Qr(e.target);if(n!==null){var t=fc(n);if(t!==null){if(n=t.tag,n===13){if(n=Sx(t),n!==null){e.blockedOn=n,U0(e.priority,function(){yx(t)});return}}else if(n===31){if(n=_x(t),n!==null){e.blockedOn=n,U0(e.priority,function(){yx(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function du(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Vm(e.nativeEvent);if(t===null){t=e.nativeEvent;var o=new t.constructor(t.type,t);Gp=o,t.target.dispatchEvent(o),Gp=null}else return n=Pa(t),n!==null&&v1(n),e.blockedOn=t,!1;n.shift()}return!0}function vx(e,n,t){du(e)&&t.delete(n)}function GR(){Um=!1,ur!==null&&du(ur)&&(ur=null),dr!==null&&du(dr)&&(dr=null),fr!==null&&du(fr)&&(fr=null),uc.forEach(vx),dc.forEach(vx)}function Yl(e,n){e.blockedOn===n&&(e.blockedOn=null,Um||(Um=!0,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,GR)))}var Gl=null;function xx(e){Gl!==e&&(Gl=e,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,function(){Gl===e&&(Gl=null);for(var n=0;n<e.length;n+=3){var t=e[n],o=e[n+1],r=e[n+2];if(typeof o!="function"){if(Vh(o||t)===null)continue;break}var i=Pa(t);i!==null&&(e.splice(n,3),n-=3,cm(i,{pending:!0,data:r,method:t.method,action:o},o,r))}}))}function za(e){function n(c){return Yl(c,e)}ur!==null&&Yl(ur,e),dr!==null&&Yl(dr,e),fr!==null&&Yl(fr,e),uc.forEach(n),dc.forEach(n);for(var t=0;t<Qo.length;t++){var o=Qo[t];o.blockedOn===e&&(o.blockedOn=null)}for(;0<Qo.length&&(t=Qo[0],t.blockedOn===null);)w1(t),t.blockedOn===null&&Qo.shift();if(t=(e.ownerDocument||e).$$reactFormReplay,t!=null)for(o=0;o<t.length;o+=3){var r=t[o],i=t[o+1],a=r[Vn]||null;if(typeof i=="function")a||xx(t);else if(a){var s=null;if(i&&i.hasAttribute("formAction")){if(r=i,a=i[Vn]||null)s=a.formAction;else if(Vh(r)!==null)continue}else s=a.action;typeof s=="function"?t[o+1]=s:(t.splice(o,3),o-=3),xx(t)}}}function b1(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(a){return r=a})},focusReset:"manual",scroll:"manual"})}function n(){r!==null&&(r(),r=null),o||setTimeout(t,20)}function t(){if(!o&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,r=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(t,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),r!==null&&(r(),r=null)}}}function Uh(e){this._internalRoot=e}id.prototype.render=Uh.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(L(409));var t=n.current,o=ot();g1(t,o,e,n,null,null)};id.prototype.unmount=Uh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;g1(e.current,2,null,e,null,null),td(),n[Ba]=null}};function id(e){this._internalRoot=e}id.prototype.unstable_scheduleHydration=function(e){if(e){var n=Px();e={blockedOn:null,target:e,priority:n};for(var t=0;t<Qo.length&&n!==0&&n<Qo[t].priority;t++);Qo.splice(t,0,e),t===0&&w1(e)}};var wx=bx.version;if(wx!=="19.3.0")throw Error(L(527,wx,"19.3.0"));me.findDOMNode=function(e){var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(L(188)):(e=Object.keys(e).join(","),Error(L(268,e)));return e=XC(n),e=e!==null?Dx(e):null,e=e===null?null:e.stateNode,e};var XR={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:$,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Ms=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Ms.isDisabled&&Ms.supportsFiber))try{pc=Ms.inject(XR),nt=Ms}catch{}var Ms;ad.createRoot=function(e,n){if(!kx(e))throw Error(L(299));var t=!1,o="",r=nb,i=tb,a=ob;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(r=n.onUncaughtError),n.onCaughtError!==void 0&&(i=n.onCaughtError),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),n=h1(e,1,!1,null,null,t,o,null,r,i,a,b1),e[Ba]=n.current,Ih(e),new Uh(n)};ad.hydrateRoot=function(e,n,t){if(!kx(e))throw Error(L(299));var o=!1,r="",i=nb,a=tb,s=ob,c=null;return t!=null&&(t.unstable_strictMode===!0&&(o=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError),t.formState!==void 0&&(c=t.formState)),n=h1(e,1,!0,n,t??null,o,r,c,i,a,s,b1),n.context=y1(null),t=n.current,o=ot(),o=Xm(o),r=ir(o),r.callback=null,ar(t,r,o),t=o,n.current.lanes=t,hc(n,t),to(n),e[Ba]=n.current,Ih(e),new id(n)};ad.version="19.3.0"});var D1=On((u6,_1)=>{"use strict";function S1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(S1)}catch(e){console.error(e)}}S1(),_1.exports=k1()});var C1=On(sd=>{"use strict";var KR=Symbol.for("react.transitional.element"),ZR=Symbol.for("react.fragment");function E1(e,n,t){var o=null;if(t!==void 0&&(o=""+t),n.key!==void 0&&(o=""+n.key),"key"in n){t={};for(var r in n)r!=="key"&&(t[r]=n[r])}else t=n;return n=t.ref,{$$typeof:KR,type:e,key:o,ref:n!==void 0?n:null,props:t}}sd.Fragment=ZR;sd.jsx=E1;sd.jsxs=E1});var q1=On((f6,T1)=>{"use strict";T1.exports=C1()});var p_=On(f_=>{"use strict";var rs=Vo();function UA(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var FA=typeof Object.is=="function"?Object.is:UA,YA=rs.useState,GA=rs.useEffect,XA=rs.useLayoutEffect,KA=rs.useDebugValue;function ZA(e,n){var t=n(),o=YA({inst:{value:t,getSnapshot:n}}),r=o[0].inst,i=o[1];return XA(function(){r.value=t,r.getSnapshot=n,My(r)&&i({inst:r})},[e,t,n]),GA(function(){return My(r)&&i({inst:r}),e(function(){My(r)&&i({inst:r})})},[e]),KA(t),t}function My(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!FA(e,t)}catch{return!0}}function QA(e,n){return n()}var WA=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?QA:ZA;f_.useSyncExternalStore=rs.useSyncExternalStore!==void 0?rs.useSyncExternalStore:WA});var h_=On((i9,m_)=>{"use strict";m_.exports=p_()});var g_=On(y_=>{"use strict";var Jd=Vo(),$A=h_();function JA(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var eN=typeof Object.is=="function"?Object.is:JA,nN=$A.useSyncExternalStore,tN=Jd.useRef,oN=Jd.useEffect,rN=Jd.useMemo,iN=Jd.useDebugValue;y_.useSyncExternalStoreWithSelector=function(e,n,t,o,r){var i=tN(null);if(i.current===null){var a={hasValue:!1,value:null};i.current=a}else a=i.current;i=rN(function(){function c(p){if(!l){if(l=!0,u=p,p=o(p),r!==void 0&&a.hasValue){var m=a.value;if(r(m,p))return f=m}return f=p}if(m=f,eN(u,p))return m;var g=o(p);return r!==void 0&&r(m,g)?(u=p,m):(u=p,f=g)}var l=!1,u,f,d=t===void 0?null:t;return[function(){return c(n())},d===null?void 0:function(){return c(d())}]},[n,t,o,r]);var s=nN(e,i[0],i[1]);return oN(function(){a.hasValue=!0,a.value=s},[s]),iN(s),s}});var x_=On((s9,v_)=>{"use strict";v_.exports=g_()});var S=Fr(Vo(),1),m2=Fr(D1(),1);var z=Fr(q1()),B=Fr(Vo());function Ve(e){if(typeof e=="string"||typeof e=="number")return""+e;let n="";if(Array.isArray(e))for(let t=0,o;t<e.length;t++)(o=Ve(e[t]))!==""&&(n+=(n&&" ")+o);else for(let t in e)e[t]&&(n+=(n&&" ")+t);return n}var QR={value:()=>{}};function M1(){for(var e=0,n=arguments.length,t={},o;e<n;++e){if(!(o=arguments[e]+"")||o in t||/[\s.]/.test(o))throw new Error("illegal type: "+o);t[o]=[]}return new cd(t)}function cd(e){this._=e}function WR(e,n){return e.trim().split(/^|\s+/).map(function(t){var o="",r=t.indexOf(".");if(r>=0&&(o=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:o}})}cd.prototype=M1.prototype={constructor:cd,on:function(e,n){var t=this._,o=WR(e+"",t),r,i=-1,a=o.length;if(arguments.length<2){for(;++i<a;)if((r=(e=o[i]).type)&&(r=$R(t[r],e.name)))return r;return}if(n!=null&&typeof n!="function")throw new Error("invalid callback: "+n);for(;++i<a;)if(r=(e=o[i]).type)t[r]=R1(t[r],e.name,n);else if(n==null)for(r in t)t[r]=R1(t[r],e.name,null);return this},copy:function(){var e={},n=this._;for(var t in n)e[t]=n[t].slice();return new cd(e)},call:function(e,n){if((r=arguments.length-2)>0)for(var t=new Array(r),o=0,r,i;o<r;++o)t[o]=arguments[o+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(i=this._[e],o=0,r=i.length;o<r;++o)i[o].value.apply(n,t)},apply:function(e,n,t){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var o=this._[e],r=0,i=o.length;r<i;++r)o[r].value.apply(n,t)}};function $R(e,n){for(var t=0,o=e.length,r;t<o;++t)if((r=e[t]).name===n)return r.value}function R1(e,n,t){for(var o=0,r=e.length;o<r;++o)if(e[o].name===n){e[o]=QR,e=e.slice(0,o).concat(e.slice(o+1));break}return t!=null&&e.push({name:n,value:t}),e}var yi=M1;var ld="http://www.w3.org/1999/xhtml",Fh={svg:"http://www.w3.org/2000/svg",xhtml:ld,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Ro(e){var n=e+="",t=n.indexOf(":");return t>=0&&(n=e.slice(0,t))!=="xmlns"&&(e=e.slice(t+1)),Fh.hasOwnProperty(n)?{space:Fh[n],local:e}:e}function JR(e){return function(){var n=this.ownerDocument,t=this.namespaceURI;return t===ld&&n.documentElement.namespaceURI===ld?n.createElement(e):n.createElementNS(t,e)}}function eM(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function ud(e){var n=Ro(e);return(n.local?eM:JR)(n)}function nM(){}function gi(e){return e==null?nM:function(){return this.querySelector(e)}}function A1(e){typeof e!="function"&&(e=gi(e));for(var n=this._groups,t=n.length,o=new Array(t),r=0;r<t;++r)for(var i=n[r],a=i.length,s=o[r]=new Array(a),c,l,u=0;u<a;++u)(c=i[u])&&(l=e.call(c,c.__data__,u,i))&&("__data__"in c&&(l.__data__=c.__data__),s[u]=l);return new Ue(o,this._parents)}function Yh(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function tM(){return[]}function _c(e){return e==null?tM:function(){return this.querySelectorAll(e)}}function oM(e){return function(){return Yh(e.apply(this,arguments))}}function N1(e){typeof e=="function"?e=oM(e):e=_c(e);for(var n=this._groups,t=n.length,o=[],r=[],i=0;i<t;++i)for(var a=n[i],s=a.length,c,l=0;l<s;++l)(c=a[l])&&(o.push(e.call(c,c.__data__,l,a)),r.push(c));return new Ue(o,r)}function Dc(e){return function(){return this.matches(e)}}function dd(e){return function(n){return n.matches(e)}}var rM=Array.prototype.find;function iM(e){return function(){return rM.call(this.children,e)}}function aM(){return this.firstElementChild}function I1(e){return this.select(e==null?aM:iM(typeof e=="function"?e:dd(e)))}var sM=Array.prototype.filter;function cM(){return Array.from(this.children)}function lM(e){return function(){return sM.call(this.children,e)}}function O1(e){return this.selectAll(e==null?cM:lM(typeof e=="function"?e:dd(e)))}function z1(e){typeof e!="function"&&(e=Dc(e));for(var n=this._groups,t=n.length,o=new Array(t),r=0;r<t;++r)for(var i=n[r],a=i.length,s=o[r]=[],c,l=0;l<a;++l)(c=i[l])&&e.call(c,c.__data__,l,i)&&s.push(c);return new Ue(o,this._parents)}function fd(e){return new Array(e.length)}function B1(){return new Ue(this._enter||this._groups.map(fd),this._parents)}function Ec(e,n){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=n}Ec.prototype={constructor:Ec,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,n){return this._parent.insertBefore(e,n)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function P1(e){return function(){return e}}function uM(e,n,t,o,r,i){for(var a=0,s,c=n.length,l=i.length;a<l;++a)(s=n[a])?(s.__data__=i[a],o[a]=s):t[a]=new Ec(e,i[a]);for(;a<c;++a)(s=n[a])&&(r[a]=s)}function dM(e,n,t,o,r,i,a){var s,c,l=new Map,u=n.length,f=i.length,d=new Array(u),p;for(s=0;s<u;++s)(c=n[s])&&(d[s]=p=a.call(c,c.__data__,s,n)+"",l.has(p)?r[s]=c:l.set(p,c));for(s=0;s<f;++s)p=a.call(e,i[s],s,i)+"",(c=l.get(p))?(o[s]=c,c.__data__=i[s],l.delete(p)):t[s]=new Ec(e,i[s]);for(s=0;s<u;++s)(c=n[s])&&l.get(d[s])===c&&(r[s]=c)}function fM(e){return e.__data__}function L1(e,n){if(!arguments.length)return Array.from(this,fM);var t=n?dM:uM,o=this._parents,r=this._groups;typeof e!="function"&&(e=P1(e));for(var i=r.length,a=new Array(i),s=new Array(i),c=new Array(i),l=0;l<i;++l){var u=o[l],f=r[l],d=f.length,p=pM(e.call(u,u&&u.__data__,l,o)),m=p.length,g=s[l]=new Array(m),x=a[l]=new Array(m),h=c[l]=new Array(d);t(u,f,g,x,h,p,n);for(var v=0,y=0,w,b;v<m;++v)if(w=g[v]){for(v>=y&&(y=v+1);!(b=x[y])&&++y<m;);w._next=b||null}}return a=new Ue(a,o),a._enter=s,a._exit=c,a}function pM(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function j1(){return new Ue(this._exit||this._groups.map(fd),this._parents)}function H1(e,n,t){var o=this.enter(),r=this,i=this.exit();return typeof e=="function"?(o=e(o),o&&(o=o.selection())):o=o.append(e+""),n!=null&&(r=n(r),r&&(r=r.selection())),t==null?i.remove():t(i),o&&r?o.merge(r).order():r}function V1(e){for(var n=e.selection?e.selection():e,t=this._groups,o=n._groups,r=t.length,i=o.length,a=Math.min(r,i),s=new Array(r),c=0;c<a;++c)for(var l=t[c],u=o[c],f=l.length,d=s[c]=new Array(f),p,m=0;m<f;++m)(p=l[m]||u[m])&&(d[m]=p);for(;c<r;++c)s[c]=t[c];return new Ue(s,this._parents)}function U1(){for(var e=this._groups,n=-1,t=e.length;++n<t;)for(var o=e[n],r=o.length-1,i=o[r],a;--r>=0;)(a=o[r])&&(i&&a.compareDocumentPosition(i)^4&&i.parentNode.insertBefore(a,i),i=a);return this}function F1(e){e||(e=mM);function n(f,d){return f&&d?e(f.__data__,d.__data__):!f-!d}for(var t=this._groups,o=t.length,r=new Array(o),i=0;i<o;++i){for(var a=t[i],s=a.length,c=r[i]=new Array(s),l,u=0;u<s;++u)(l=a[u])&&(c[u]=l);c.sort(n)}return new Ue(r,this._parents).order()}function mM(e,n){return e<n?-1:e>n?1:e>=n?0:NaN}function Y1(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function G1(){return Array.from(this)}function X1(){for(var e=this._groups,n=0,t=e.length;n<t;++n)for(var o=e[n],r=0,i=o.length;r<i;++r){var a=o[r];if(a)return a}return null}function K1(){let e=0;for(let n of this)++e;return e}function Z1(){return!this.node()}function Q1(e){for(var n=this._groups,t=0,o=n.length;t<o;++t)for(var r=n[t],i=0,a=r.length,s;i<a;++i)(s=r[i])&&e.call(s,s.__data__,i,r);return this}function hM(e){return function(){this.removeAttribute(e)}}function yM(e){return function(){this.removeAttributeNS(e.space,e.local)}}function gM(e,n){return function(){this.setAttribute(e,n)}}function vM(e,n){return function(){this.setAttributeNS(e.space,e.local,n)}}function xM(e,n){return function(){var t=n.apply(this,arguments);t==null?this.removeAttribute(e):this.setAttribute(e,t)}}function wM(e,n){return function(){var t=n.apply(this,arguments);t==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,t)}}function W1(e,n){var t=Ro(e);if(arguments.length<2){var o=this.node();return t.local?o.getAttributeNS(t.space,t.local):o.getAttribute(t)}return this.each((n==null?t.local?yM:hM:typeof n=="function"?t.local?wM:xM:t.local?vM:gM)(t,n))}function pd(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function bM(e){return function(){this.style.removeProperty(e)}}function kM(e,n,t){return function(){this.style.setProperty(e,n,t)}}function SM(e,n,t){return function(){var o=n.apply(this,arguments);o==null?this.style.removeProperty(e):this.style.setProperty(e,o,t)}}function $1(e,n,t){return arguments.length>1?this.each((n==null?bM:typeof n=="function"?SM:kM)(e,n,t??"")):wr(this.node(),e)}function wr(e,n){return e.style.getPropertyValue(n)||pd(e).getComputedStyle(e,null).getPropertyValue(n)}function _M(e){return function(){delete this[e]}}function DM(e,n){return function(){this[e]=n}}function EM(e,n){return function(){var t=n.apply(this,arguments);t==null?delete this[e]:this[e]=t}}function J1(e,n){return arguments.length>1?this.each((n==null?_M:typeof n=="function"?EM:DM)(e,n)):this.node()[e]}function ek(e){return e.trim().split(/^|\s+/)}function Gh(e){return e.classList||new nk(e)}function nk(e){this._node=e,this._names=ek(e.getAttribute("class")||"")}nk.prototype={add:function(e){var n=this._names.indexOf(e);n<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var n=this._names.indexOf(e);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function tk(e,n){for(var t=Gh(e),o=-1,r=n.length;++o<r;)t.add(n[o])}function ok(e,n){for(var t=Gh(e),o=-1,r=n.length;++o<r;)t.remove(n[o])}function CM(e){return function(){tk(this,e)}}function TM(e){return function(){ok(this,e)}}function qM(e,n){return function(){(n.apply(this,arguments)?tk:ok)(this,e)}}function rk(e,n){var t=ek(e+"");if(arguments.length<2){for(var o=Gh(this.node()),r=-1,i=t.length;++r<i;)if(!o.contains(t[r]))return!1;return!0}return this.each((typeof n=="function"?qM:n?CM:TM)(t,n))}function RM(){this.textContent=""}function MM(e){return function(){this.textContent=e}}function AM(e){return function(){var n=e.apply(this,arguments);this.textContent=n??""}}function ik(e){return arguments.length?this.each(e==null?RM:(typeof e=="function"?AM:MM)(e)):this.node().textContent}function NM(){this.innerHTML=""}function IM(e){return function(){this.innerHTML=e}}function OM(e){return function(){var n=e.apply(this,arguments);this.innerHTML=n??""}}function ak(e){return arguments.length?this.each(e==null?NM:(typeof e=="function"?OM:IM)(e)):this.node().innerHTML}function zM(){this.nextSibling&&this.parentNode.appendChild(this)}function sk(){return this.each(zM)}function BM(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function ck(){return this.each(BM)}function lk(e){var n=typeof e=="function"?e:ud(e);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function PM(){return null}function uk(e,n){var t=typeof e=="function"?e:ud(e),o=n==null?PM:typeof n=="function"?n:gi(n);return this.select(function(){return this.insertBefore(t.apply(this,arguments),o.apply(this,arguments)||null)})}function LM(){var e=this.parentNode;e&&e.removeChild(this)}function dk(){return this.each(LM)}function jM(){var e=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(e,this.nextSibling):e}function HM(){var e=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(e,this.nextSibling):e}function fk(e){return this.select(e?HM:jM)}function pk(e){return arguments.length?this.property("__data__",e):this.node().__data__}function VM(e){return function(n){e.call(this,n,this.__data__)}}function UM(e){return e.trim().split(/^|\s+/).map(function(n){var t="",o=n.indexOf(".");return o>=0&&(t=n.slice(o+1),n=n.slice(0,o)),{type:n,name:t}})}function FM(e){return function(){var n=this.__on;if(n){for(var t=0,o=-1,r=n.length,i;t<r;++t)i=n[t],(!e.type||i.type===e.type)&&i.name===e.name?this.removeEventListener(i.type,i.listener,i.options):n[++o]=i;++o?n.length=o:delete this.__on}}}function YM(e,n,t){return function(){var o=this.__on,r,i=VM(n);if(o){for(var a=0,s=o.length;a<s;++a)if((r=o[a]).type===e.type&&r.name===e.name){this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=i,r.options=t),r.value=n;return}}this.addEventListener(e.type,i,t),r={type:e.type,name:e.name,value:n,listener:i,options:t},o?o.push(r):this.__on=[r]}}function mk(e,n,t){var o=UM(e+""),r,i=o.length,a;if(arguments.length<2){var s=this.node().__on;if(s){for(var c=0,l=s.length,u;c<l;++c)for(r=0,u=s[c];r<i;++r)if((a=o[r]).type===u.type&&a.name===u.name)return u.value}return}for(s=n?YM:FM,r=0;r<i;++r)this.each(s(o[r],n,t));return this}function hk(e,n,t){var o=pd(e),r=o.CustomEvent;typeof r=="function"?r=new r(n,t):(r=o.document.createEvent("Event"),t?(r.initEvent(n,t.bubbles,t.cancelable),r.detail=t.detail):r.initEvent(n,!1,!1)),e.dispatchEvent(r)}function GM(e,n){return function(){return hk(this,e,n)}}function XM(e,n){return function(){return hk(this,e,n.apply(this,arguments))}}function yk(e,n){return this.each((typeof n=="function"?XM:GM)(e,n))}function*gk(){for(var e=this._groups,n=0,t=e.length;n<t;++n)for(var o=e[n],r=0,i=o.length,a;r<i;++r)(a=o[r])&&(yield a)}var Xh=[null];function Ue(e,n){this._groups=e,this._parents=n}function vk(){return new Ue([[document.documentElement]],Xh)}function KM(){return this}Ue.prototype=vk.prototype={constructor:Ue,select:A1,selectAll:N1,selectChild:I1,selectChildren:O1,filter:z1,data:L1,enter:B1,exit:j1,join:H1,merge:V1,selection:KM,order:U1,sort:F1,call:Y1,nodes:G1,node:X1,size:K1,empty:Z1,each:Q1,attr:W1,style:$1,property:J1,classed:rk,text:ik,html:ak,raise:sk,lower:ck,append:lk,insert:uk,remove:dk,clone:fk,datum:pk,on:mk,dispatch:yk,[Symbol.iterator]:gk};var Mo=vk;function sn(e){return typeof e=="string"?new Ue([[document.querySelector(e)]],[document.documentElement]):new Ue([[e]],Xh)}function xk(e){let n;for(;n=e.sourceEvent;)e=n;return e}function Rn(e,n){if(e=xk(e),n===void 0&&(n=e.currentTarget),n){var t=n.ownerSVGElement||n;if(t.createSVGPoint){var o=t.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,o=o.matrixTransform(n.getScreenCTM().inverse()),[o.x,o.y]}if(n.getBoundingClientRect){var r=n.getBoundingClientRect();return[e.clientX-r.left-n.clientLeft,e.clientY-r.top-n.clientTop]}}return[e.pageX,e.pageY]}var wk={passive:!1},vi={capture:!0,passive:!1};function md(e){e.stopImmediatePropagation()}function br(e){e.preventDefault(),e.stopImmediatePropagation()}function Cc(e){var n=e.document.documentElement,t=sn(e).on("dragstart.drag",br,vi);"onselectstart"in n?t.on("selectstart.drag",br,vi):(n.__noselect=n.style.MozUserSelect,n.style.MozUserSelect="none")}function Tc(e,n){var t=e.document.documentElement,o=sn(e).on("dragstart.drag",null);n&&(o.on("click.drag",br,vi),setTimeout(function(){o.on("click.drag",null)},0)),"onselectstart"in t?o.on("selectstart.drag",null):(t.style.MozUserSelect=t.__noselect,delete t.__noselect)}var qc=e=>()=>e;function Rc(e,{sourceEvent:n,subject:t,target:o,identifier:r,active:i,x:a,y:s,dx:c,dy:l,dispatch:u}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},subject:{value:t,enumerable:!0,configurable:!0},target:{value:o,enumerable:!0,configurable:!0},identifier:{value:r,enumerable:!0,configurable:!0},active:{value:i,enumerable:!0,configurable:!0},x:{value:a,enumerable:!0,configurable:!0},y:{value:s,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:u}})}Rc.prototype.on=function(){var e=this._.on.apply(this._,arguments);return e===this._?this:e};function ZM(e){return!e.ctrlKey&&!e.button}function QM(){return this.parentNode}function WM(e,n){return n??{x:e.x,y:e.y}}function $M(){return navigator.maxTouchPoints||"ontouchstart"in this}function hd(){var e=ZM,n=QM,t=WM,o=$M,r={},i=yi("start","drag","end"),a=0,s,c,l,u,f=0;function d(w){w.on("mousedown.drag",p).filter(o).on("touchstart.drag",x).on("touchmove.drag",h,wk).on("touchend.drag touchcancel.drag",v).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function p(w,b){if(!(u||!e.call(this,w,b))){var _=y(this,n.call(this,w,b),w,b,"mouse");_&&(sn(w.view).on("mousemove.drag",m,vi).on("mouseup.drag",g,vi),Cc(w.view),md(w),l=!1,s=w.clientX,c=w.clientY,_("start",w))}}function m(w){if(br(w),!l){var b=w.clientX-s,_=w.clientY-c;l=b*b+_*_>f}r.mouse("drag",w)}function g(w){sn(w.view).on("mousemove.drag mouseup.drag",null),Tc(w.view,l),br(w),r.mouse("end",w)}function x(w,b){if(e.call(this,w,b)){var _=w.changedTouches,k=n.call(this,w,b),D=_.length,E,R;for(E=0;E<D;++E)(R=y(this,k,w,b,_[E].identifier,_[E]))&&(md(w),R("start",w,_[E]))}}function h(w){var b=w.changedTouches,_=b.length,k,D;for(k=0;k<_;++k)(D=r[b[k].identifier])&&(br(w),D("drag",w,b[k]))}function v(w){var b=w.changedTouches,_=b.length,k,D;for(u&&clearTimeout(u),u=setTimeout(function(){u=null},500),k=0;k<_;++k)(D=r[b[k].identifier])&&(md(w),D("end",w,b[k]))}function y(w,b,_,k,D,E){var R=i.copy(),A=Rn(E||_,b),P,I,C;if((C=t.call(w,new Rc("beforestart",{sourceEvent:_,target:d,identifier:D,active:a,x:A[0],y:A[1],dx:0,dy:0,dispatch:R}),k))!=null)return P=C.x-A[0]||0,I=C.y-A[1]||0,function T(q,M,N){var O=A,V;switch(q){case"start":r[D]=T,V=a++;break;case"end":delete r[D],--a;case"drag":A=Rn(N||M,b),V=a;break}R.call(q,w,new Rc(q,{sourceEvent:M,subject:C,target:d,identifier:D,active:V,x:A[0]+P,y:A[1]+I,dx:A[0]-O[0],dy:A[1]-O[1],dispatch:R}),k)}}return d.filter=function(w){return arguments.length?(e=typeof w=="function"?w:qc(!!w),d):e},d.container=function(w){return arguments.length?(n=typeof w=="function"?w:qc(w),d):n},d.subject=function(w){return arguments.length?(t=typeof w=="function"?w:qc(w),d):t},d.touchable=function(w){return arguments.length?(o=typeof w=="function"?w:qc(!!w),d):o},d.on=function(){var w=i.on.apply(i,arguments);return w===i?d:w},d.clickDistance=function(w){return arguments.length?(f=(w=+w)*w,d):Math.sqrt(f)},d}function yd(e,n,t){e.prototype=n.prototype=t,t.constructor=e}function Kh(e,n){var t=Object.create(e.prototype);for(var o in n)t[o]=n[o];return t}function Nc(){}var Mc=.7,xd=1/Mc,Fa="\\s*([+-]?\\d+)\\s*",Ac="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",oo="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",JM=/^#([0-9a-f]{3,8})$/,e5=new RegExp(`^rgb\\(${Fa},${Fa},${Fa}\\)$`),n5=new RegExp(`^rgb\\(${oo},${oo},${oo}\\)$`),t5=new RegExp(`^rgba\\(${Fa},${Fa},${Fa},${Ac}\\)$`),o5=new RegExp(`^rgba\\(${oo},${oo},${oo},${Ac}\\)$`),r5=new RegExp(`^hsl\\(${Ac},${oo},${oo}\\)$`),i5=new RegExp(`^hsla\\(${Ac},${oo},${oo},${Ac}\\)$`),bk={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};yd(Nc,Bt,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:kk,formatHex:kk,formatHex8:a5,formatHsl:s5,formatRgb:Sk,toString:Sk});function kk(){return this.rgb().formatHex()}function a5(){return this.rgb().formatHex8()}function s5(){return qk(this).formatHsl()}function Sk(){return this.rgb().formatRgb()}function Bt(e){var n,t;return e=(e+"").trim().toLowerCase(),(n=JM.exec(e))?(t=n[1].length,n=parseInt(n[1],16),t===6?_k(n):t===3?new Un(n>>8&15|n>>4&240,n>>4&15|n&240,(n&15)<<4|n&15,1):t===8?gd(n>>24&255,n>>16&255,n>>8&255,(n&255)/255):t===4?gd(n>>12&15|n>>8&240,n>>8&15|n>>4&240,n>>4&15|n&240,((n&15)<<4|n&15)/255):null):(n=e5.exec(e))?new Un(n[1],n[2],n[3],1):(n=n5.exec(e))?new Un(n[1]*255/100,n[2]*255/100,n[3]*255/100,1):(n=t5.exec(e))?gd(n[1],n[2],n[3],n[4]):(n=o5.exec(e))?gd(n[1]*255/100,n[2]*255/100,n[3]*255/100,n[4]):(n=r5.exec(e))?Ck(n[1],n[2]/100,n[3]/100,1):(n=i5.exec(e))?Ck(n[1],n[2]/100,n[3]/100,n[4]):bk.hasOwnProperty(e)?_k(bk[e]):e==="transparent"?new Un(NaN,NaN,NaN,0):null}function _k(e){return new Un(e>>16&255,e>>8&255,e&255,1)}function gd(e,n,t,o){return o<=0&&(e=n=t=NaN),new Un(e,n,t,o)}function c5(e){return e instanceof Nc||(e=Bt(e)),e?(e=e.rgb(),new Un(e.r,e.g,e.b,e.opacity)):new Un}function Ya(e,n,t,o){return arguments.length===1?c5(e):new Un(e,n,t,o??1)}function Un(e,n,t,o){this.r=+e,this.g=+n,this.b=+t,this.opacity=+o}yd(Un,Ya,Kh(Nc,{brighter(e){return e=e==null?xd:Math.pow(xd,e),new Un(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Mc:Math.pow(Mc,e),new Un(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Un(wi(this.r),wi(this.g),wi(this.b),wd(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Dk,formatHex:Dk,formatHex8:l5,formatRgb:Ek,toString:Ek}));function Dk(){return`#${xi(this.r)}${xi(this.g)}${xi(this.b)}`}function l5(){return`#${xi(this.r)}${xi(this.g)}${xi(this.b)}${xi((isNaN(this.opacity)?1:this.opacity)*255)}`}function Ek(){let e=wd(this.opacity);return`${e===1?"rgb(":"rgba("}${wi(this.r)}, ${wi(this.g)}, ${wi(this.b)}${e===1?")":`, ${e})`}`}function wd(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function wi(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function xi(e){return e=wi(e),(e<16?"0":"")+e.toString(16)}function Ck(e,n,t,o){return o<=0?e=n=t=NaN:t<=0||t>=1?e=n=NaN:n<=0&&(e=NaN),new zt(e,n,t,o)}function qk(e){if(e instanceof zt)return new zt(e.h,e.s,e.l,e.opacity);if(e instanceof Nc||(e=Bt(e)),!e)return new zt;if(e instanceof zt)return e;e=e.rgb();var n=e.r/255,t=e.g/255,o=e.b/255,r=Math.min(n,t,o),i=Math.max(n,t,o),a=NaN,s=i-r,c=(i+r)/2;return s?(n===i?a=(t-o)/s+(t<o)*6:t===i?a=(o-n)/s+2:a=(n-t)/s+4,s/=c<.5?i+r:2-i-r,a*=60):s=c>0&&c<1?0:a,new zt(a,s,c,e.opacity)}function Rk(e,n,t,o){return arguments.length===1?qk(e):new zt(e,n,t,o??1)}function zt(e,n,t,o){this.h=+e,this.s=+n,this.l=+t,this.opacity=+o}yd(zt,Rk,Kh(Nc,{brighter(e){return e=e==null?xd:Math.pow(xd,e),new zt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Mc:Math.pow(Mc,e),new zt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,n=isNaN(e)||isNaN(this.s)?0:this.s,t=this.l,o=t+(t<.5?t:1-t)*n,r=2*t-o;return new Un(Zh(e>=240?e-240:e+120,r,o),Zh(e,r,o),Zh(e<120?e+240:e-120,r,o),this.opacity)},clamp(){return new zt(Tk(this.h),vd(this.s),vd(this.l),wd(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){let e=wd(this.opacity);return`${e===1?"hsl(":"hsla("}${Tk(this.h)}, ${vd(this.s)*100}%, ${vd(this.l)*100}%${e===1?")":`, ${e})`}`}}));function Tk(e){return e=(e||0)%360,e<0?e+360:e}function vd(e){return Math.max(0,Math.min(1,e||0))}function Zh(e,n,t){return(e<60?n+(t-n)*e/60:e<180?t:e<240?n+(t-n)*(240-e)/60:n)*255}function Qh(e,n,t,o,r){var i=e*e,a=i*e;return((1-3*e+3*i-a)*n+(4-6*i+3*a)*t+(1+3*e+3*i-3*a)*o+a*r)/6}function Mk(e){var n=e.length-1;return function(t){var o=t<=0?t=0:t>=1?(t=1,n-1):Math.floor(t*n),r=e[o],i=e[o+1],a=o>0?e[o-1]:2*r-i,s=o<n-1?e[o+2]:2*i-r;return Qh((t-o/n)*n,a,r,i,s)}}function Ak(e){var n=e.length;return function(t){var o=Math.floor(((t%=1)<0?++t:t)*n),r=e[(o+n-1)%n],i=e[o%n],a=e[(o+1)%n],s=e[(o+2)%n];return Qh((t-o/n)*n,r,i,a,s)}}var Ic=e=>()=>e;function u5(e,n){return function(t){return e+t*n}}function d5(e,n,t){return e=Math.pow(e,t),n=Math.pow(n,t)-e,t=1/t,function(o){return Math.pow(e+o*n,t)}}function Nk(e){return(e=+e)==1?bd:function(n,t){return t-n?d5(n,t,e):Ic(isNaN(n)?t:n)}}function bd(e,n){var t=n-e;return t?u5(e,t):Ic(isNaN(e)?n:e)}var bi=(function e(n){var t=Nk(n);function o(r,i){var a=t((r=Ya(r)).r,(i=Ya(i)).r),s=t(r.g,i.g),c=t(r.b,i.b),l=bd(r.opacity,i.opacity);return function(u){return r.r=a(u),r.g=s(u),r.b=c(u),r.opacity=l(u),r+""}}return o.gamma=e,o})(1);function Ik(e){return function(n){var t=n.length,o=new Array(t),r=new Array(t),i=new Array(t),a,s;for(a=0;a<t;++a)s=Ya(n[a]),o[a]=s.r||0,r[a]=s.g||0,i[a]=s.b||0;return o=e(o),r=e(r),i=e(i),s.opacity=1,function(c){return s.r=o(c),s.g=r(c),s.b=i(c),s+""}}}var f5=Ik(Mk),p5=Ik(Ak);function Ok(e,n){n||(n=[]);var t=e?Math.min(n.length,e.length):0,o=n.slice(),r;return function(i){for(r=0;r<t;++r)o[r]=e[r]*(1-i)+n[r]*i;return o}}function zk(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Bk(e,n){var t=n?n.length:0,o=e?Math.min(t,e.length):0,r=new Array(o),i=new Array(t),a;for(a=0;a<o;++a)r[a]=Ao(e[a],n[a]);for(;a<t;++a)i[a]=n[a];return function(s){for(a=0;a<o;++a)i[a]=r[a](s);return i}}function Pk(e,n){var t=new Date;return e=+e,n=+n,function(o){return t.setTime(e*(1-o)+n*o),t}}function Mn(e,n){return e=+e,n=+n,function(t){return e*(1-t)+n*t}}function Lk(e,n){var t={},o={},r;(e===null||typeof e!="object")&&(e={}),(n===null||typeof n!="object")&&(n={});for(r in n)r in e?t[r]=Ao(e[r],n[r]):o[r]=n[r];return function(i){for(r in t)o[r]=t[r](i);return o}}var $h=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Wh=new RegExp($h.source,"g");function m5(e){return function(){return e}}function h5(e){return function(n){return e(n)+""}}function Oc(e,n){var t=$h.lastIndex=Wh.lastIndex=0,o,r,i,a=-1,s=[],c=[];for(e=e+"",n=n+"";(o=$h.exec(e))&&(r=Wh.exec(n));)(i=r.index)>t&&(i=n.slice(t,i),s[a]?s[a]+=i:s[++a]=i),(o=o[0])===(r=r[0])?s[a]?s[a]+=r:s[++a]=r:(s[++a]=null,c.push({i:a,x:Mn(o,r)})),t=Wh.lastIndex;return t<n.length&&(i=n.slice(t),s[a]?s[a]+=i:s[++a]=i),s.length<2?c[0]?h5(c[0].x):m5(n):(n=c.length,function(l){for(var u=0,f;u<n;++u)s[(f=c[u]).i]=f.x(l);return s.join("")})}function Ao(e,n){var t=typeof n,o;return n==null||t==="boolean"?Ic(n):(t==="number"?Mn:t==="string"?(o=Bt(n))?(n=o,bi):Oc:n instanceof Bt?bi:n instanceof Date?Pk:zk(n)?Ok:Array.isArray(n)?Bk:typeof n.valueOf!="function"&&typeof n.toString!="function"||isNaN(n)?Lk:Mn)(e,n)}var jk=180/Math.PI,kd={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function Jh(e,n,t,o,r,i){var a,s,c;return(a=Math.sqrt(e*e+n*n))&&(e/=a,n/=a),(c=e*t+n*o)&&(t-=e*c,o-=n*c),(s=Math.sqrt(t*t+o*o))&&(t/=s,o/=s,c/=s),e*o<n*t&&(e=-e,n=-n,c=-c,a=-a),{translateX:r,translateY:i,rotate:Math.atan2(n,e)*jk,skewX:Math.atan(c)*jk,scaleX:a,scaleY:s}}var Sd;function Hk(e){let n=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return n.isIdentity?kd:Jh(n.a,n.b,n.c,n.d,n.e,n.f)}function Vk(e){return e==null?kd:(Sd||(Sd=document.createElementNS("http://www.w3.org/2000/svg","g")),Sd.setAttribute("transform",e),(e=Sd.transform.baseVal.consolidate())?(e=e.matrix,Jh(e.a,e.b,e.c,e.d,e.e,e.f)):kd)}function Uk(e,n,t,o){function r(l){return l.length?l.pop()+" ":""}function i(l,u,f,d,p,m){if(l!==f||u!==d){var g=p.push("translate(",null,n,null,t);m.push({i:g-4,x:Mn(l,f)},{i:g-2,x:Mn(u,d)})}else(f||d)&&p.push("translate("+f+n+d+t)}function a(l,u,f,d){l!==u?(l-u>180?u+=360:u-l>180&&(l+=360),d.push({i:f.push(r(f)+"rotate(",null,o)-2,x:Mn(l,u)})):u&&f.push(r(f)+"rotate("+u+o)}function s(l,u,f,d){l!==u?d.push({i:f.push(r(f)+"skewX(",null,o)-2,x:Mn(l,u)}):u&&f.push(r(f)+"skewX("+u+o)}function c(l,u,f,d,p,m){if(l!==f||u!==d){var g=p.push(r(p)+"scale(",null,",",null,")");m.push({i:g-4,x:Mn(l,f)},{i:g-2,x:Mn(u,d)})}else(f!==1||d!==1)&&p.push(r(p)+"scale("+f+","+d+")")}return function(l,u){var f=[],d=[];return l=e(l),u=e(u),i(l.translateX,l.translateY,u.translateX,u.translateY,f,d),a(l.rotate,u.rotate,f,d),s(l.skewX,u.skewX,f,d),c(l.scaleX,l.scaleY,u.scaleX,u.scaleY,f,d),l=u=null,function(p){for(var m=-1,g=d.length,x;++m<g;)f[(x=d[m]).i]=x.x(p);return f.join("")}}}var ey=Uk(Hk,"px, ","px)","deg)"),ny=Uk(Vk,", ",")",")");var y5=1e-12;function Fk(e){return((e=Math.exp(e))+1/e)/2}function g5(e){return((e=Math.exp(e))-1/e)/2}function v5(e){return((e=Math.exp(2*e))-1)/(e+1)}var ki=(function e(n,t,o){function r(i,a){var s=i[0],c=i[1],l=i[2],u=a[0],f=a[1],d=a[2],p=u-s,m=f-c,g=p*p+m*m,x,h;if(g<y5)h=Math.log(d/l)/n,x=function(k){return[s+k*p,c+k*m,l*Math.exp(n*k*h)]};else{var v=Math.sqrt(g),y=(d*d-l*l+o*g)/(2*l*t*v),w=(d*d-l*l-o*g)/(2*d*t*v),b=Math.log(Math.sqrt(y*y+1)-y),_=Math.log(Math.sqrt(w*w+1)-w);h=(_-b)/n,x=function(k){var D=k*h,E=Fk(b),R=l/(t*v)*(E*v5(n*D+b)-g5(b));return[s+R*p,c+R*m,l*E/Fk(n*D+b)]}}return x.duration=h*1e3*n/Math.SQRT2,x}return r.rho=function(i){var a=Math.max(.001,+i),s=a*a,c=s*s;return e(a,s,c)},r})(Math.SQRT2,2,4);var Ga=0,Bc=0,zc=0,Gk=1e3,_d,Pc,Dd=0,Si=0,Ed=0,Lc=typeof performance=="object"&&performance.now?performance:Date,Xk=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function Hc(){return Si||(Xk(x5),Si=Lc.now()+Ed)}function x5(){Si=0}function jc(){this._call=this._time=this._next=null}jc.prototype=Cd.prototype={constructor:jc,restart:function(e,n,t){if(typeof e!="function")throw new TypeError("callback is not a function");t=(t==null?Hc():+t)+(n==null?0:+n),!this._next&&Pc!==this&&(Pc?Pc._next=this:_d=this,Pc=this),this._call=e,this._time=t,ty()},stop:function(){this._call&&(this._call=null,this._time=1/0,ty())}};function Cd(e,n,t){var o=new jc;return o.restart(e,n,t),o}function Kk(){Hc(),++Ga;for(var e=_d,n;e;)(n=Si-e._time)>=0&&e._call.call(void 0,n),e=e._next;--Ga}function Yk(){Si=(Dd=Lc.now())+Ed,Ga=Bc=0;try{Kk()}finally{Ga=0,b5(),Si=0}}function w5(){var e=Lc.now(),n=e-Dd;n>Gk&&(Ed-=n,Dd=e)}function b5(){for(var e,n=_d,t,o=1/0;n;)n._call?(o>n._time&&(o=n._time),e=n,n=n._next):(t=n._next,n._next=null,n=e?e._next=t:_d=t);Pc=e,ty(o)}function ty(e){if(!Ga){Bc&&(Bc=clearTimeout(Bc));var n=e-Si;n>24?(e<1/0&&(Bc=setTimeout(Yk,e-Lc.now()-Ed)),zc&&(zc=clearInterval(zc))):(zc||(Dd=Lc.now(),zc=setInterval(w5,Gk)),Ga=1,Xk(Yk))}}function Td(e,n,t){var o=new jc;return n=n==null?0:+n,o.restart(r=>{o.stop(),e(r+n)},n,t),o}var k5=yi("start","end","cancel","interrupt"),S5=[],Wk=0,Zk=1,Rd=2,qd=3,Qk=4,Md=5,Vc=6;function kr(e,n,t,o,r,i){var a=e.__transition;if(!a)e.__transition={};else if(t in a)return;_5(e,t,{name:n,index:o,group:r,on:k5,tween:S5,time:i.time,delay:i.delay,duration:i.duration,ease:i.ease,timer:null,state:Wk})}function Uc(e,n){var t=en(e,n);if(t.state>Wk)throw new Error("too late; already scheduled");return t}function yn(e,n){var t=en(e,n);if(t.state>qd)throw new Error("too late; already running");return t}function en(e,n){var t=e.__transition;if(!t||!(t=t[n]))throw new Error("transition not found");return t}function _5(e,n,t){var o=e.__transition,r;o[n]=t,t.timer=Cd(i,0,t.time);function i(l){t.state=Zk,t.timer.restart(a,t.delay,t.time),t.delay<=l&&a(l-t.delay)}function a(l){var u,f,d,p;if(t.state!==Zk)return c();for(u in o)if(p=o[u],p.name===t.name){if(p.state===qd)return Td(a);p.state===Qk?(p.state=Vc,p.timer.stop(),p.on.call("interrupt",e,e.__data__,p.index,p.group),delete o[u]):+u<n&&(p.state=Vc,p.timer.stop(),p.on.call("cancel",e,e.__data__,p.index,p.group),delete o[u])}if(Td(function(){t.state===qd&&(t.state=Qk,t.timer.restart(s,t.delay,t.time),s(l))}),t.state=Rd,t.on.call("start",e,e.__data__,t.index,t.group),t.state===Rd){for(t.state=qd,r=new Array(d=t.tween.length),u=0,f=-1;u<d;++u)(p=t.tween[u].value.call(e,e.__data__,t.index,t.group))&&(r[++f]=p);r.length=f+1}}function s(l){for(var u=l<t.duration?t.ease.call(null,l/t.duration):(t.timer.restart(c),t.state=Md,1),f=-1,d=r.length;++f<d;)r[f].call(e,u);t.state===Md&&(t.on.call("end",e,e.__data__,t.index,t.group),c())}function c(){t.state=Vc,t.timer.stop(),delete o[n];for(var l in o)return;delete e.__transition}}function _i(e,n){var t=e.__transition,o,r,i=!0,a;if(t){n=n==null?null:n+"";for(a in t){if((o=t[a]).name!==n){i=!1;continue}r=o.state>Rd&&o.state<Md,o.state=Vc,o.timer.stop(),o.on.call(r?"interrupt":"cancel",e,e.__data__,o.index,o.group),delete t[a]}i&&delete e.__transition}}function $k(e){return this.each(function(){_i(this,e)})}function D5(e,n){var t,o;return function(){var r=yn(this,e),i=r.tween;if(i!==t){o=t=i;for(var a=0,s=o.length;a<s;++a)if(o[a].name===n){o=o.slice(),o.splice(a,1);break}}r.tween=o}}function E5(e,n,t){var o,r;if(typeof t!="function")throw new Error;return function(){var i=yn(this,e),a=i.tween;if(a!==o){r=(o=a).slice();for(var s={name:n,value:t},c=0,l=r.length;c<l;++c)if(r[c].name===n){r[c]=s;break}c===l&&r.push(s)}i.tween=r}}function Jk(e,n){var t=this._id;if(e+="",arguments.length<2){for(var o=en(this.node(),t).tween,r=0,i=o.length,a;r<i;++r)if((a=o[r]).name===e)return a.value;return null}return this.each((n==null?D5:E5)(t,e,n))}function Xa(e,n,t){var o=e._id;return e.each(function(){var r=yn(this,o);(r.value||(r.value={}))[n]=t.apply(this,arguments)}),function(r){return en(r,o).value[n]}}function Ad(e,n){var t;return(typeof n=="number"?Mn:n instanceof Bt?bi:(t=Bt(n))?(n=t,bi):Oc)(e,n)}function C5(e){return function(){this.removeAttribute(e)}}function T5(e){return function(){this.removeAttributeNS(e.space,e.local)}}function q5(e,n,t){var o,r=t+"",i;return function(){var a=this.getAttribute(e);return a===r?null:a===o?i:i=n(o=a,t)}}function R5(e,n,t){var o,r=t+"",i;return function(){var a=this.getAttributeNS(e.space,e.local);return a===r?null:a===o?i:i=n(o=a,t)}}function M5(e,n,t){var o,r,i;return function(){var a,s=t(this),c;return s==null?void this.removeAttribute(e):(a=this.getAttribute(e),c=s+"",a===c?null:a===o&&c===r?i:(r=c,i=n(o=a,s)))}}function A5(e,n,t){var o,r,i;return function(){var a,s=t(this),c;return s==null?void this.removeAttributeNS(e.space,e.local):(a=this.getAttributeNS(e.space,e.local),c=s+"",a===c?null:a===o&&c===r?i:(r=c,i=n(o=a,s)))}}function eS(e,n){var t=Ro(e),o=t==="transform"?ny:Ad;return this.attrTween(e,typeof n=="function"?(t.local?A5:M5)(t,o,Xa(this,"attr."+e,n)):n==null?(t.local?T5:C5)(t):(t.local?R5:q5)(t,o,n))}function N5(e,n){return function(t){this.setAttribute(e,n.call(this,t))}}function I5(e,n){return function(t){this.setAttributeNS(e.space,e.local,n.call(this,t))}}function O5(e,n){var t,o;function r(){var i=n.apply(this,arguments);return i!==o&&(t=(o=i)&&I5(e,i)),t}return r._value=n,r}function z5(e,n){var t,o;function r(){var i=n.apply(this,arguments);return i!==o&&(t=(o=i)&&N5(e,i)),t}return r._value=n,r}function nS(e,n){var t="attr."+e;if(arguments.length<2)return(t=this.tween(t))&&t._value;if(n==null)return this.tween(t,null);if(typeof n!="function")throw new Error;var o=Ro(e);return this.tween(t,(o.local?O5:z5)(o,n))}function B5(e,n){return function(){Uc(this,e).delay=+n.apply(this,arguments)}}function P5(e,n){return n=+n,function(){Uc(this,e).delay=n}}function tS(e){var n=this._id;return arguments.length?this.each((typeof e=="function"?B5:P5)(n,e)):en(this.node(),n).delay}function L5(e,n){return function(){yn(this,e).duration=+n.apply(this,arguments)}}function j5(e,n){return n=+n,function(){yn(this,e).duration=n}}function oS(e){var n=this._id;return arguments.length?this.each((typeof e=="function"?L5:j5)(n,e)):en(this.node(),n).duration}function H5(e,n){if(typeof n!="function")throw new Error;return function(){yn(this,e).ease=n}}function rS(e){var n=this._id;return arguments.length?this.each(H5(n,e)):en(this.node(),n).ease}function V5(e,n){return function(){var t=n.apply(this,arguments);if(typeof t!="function")throw new Error;yn(this,e).ease=t}}function iS(e){if(typeof e!="function")throw new Error;return this.each(V5(this._id,e))}function aS(e){typeof e!="function"&&(e=Dc(e));for(var n=this._groups,t=n.length,o=new Array(t),r=0;r<t;++r)for(var i=n[r],a=i.length,s=o[r]=[],c,l=0;l<a;++l)(c=i[l])&&e.call(c,c.__data__,l,i)&&s.push(c);return new An(o,this._parents,this._name,this._id)}function sS(e){if(e._id!==this._id)throw new Error;for(var n=this._groups,t=e._groups,o=n.length,r=t.length,i=Math.min(o,r),a=new Array(o),s=0;s<i;++s)for(var c=n[s],l=t[s],u=c.length,f=a[s]=new Array(u),d,p=0;p<u;++p)(d=c[p]||l[p])&&(f[p]=d);for(;s<o;++s)a[s]=n[s];return new An(a,this._parents,this._name,this._id)}function U5(e){return(e+"").trim().split(/^|\s+/).every(function(n){var t=n.indexOf(".");return t>=0&&(n=n.slice(0,t)),!n||n==="start"})}function F5(e,n,t){var o,r,i=U5(n)?Uc:yn;return function(){var a=i(this,e),s=a.on;s!==o&&(r=(o=s).copy()).on(n,t),a.on=r}}function cS(e,n){var t=this._id;return arguments.length<2?en(this.node(),t).on.on(e):this.each(F5(t,e,n))}function Y5(e){return function(){var n=this.parentNode;for(var t in this.__transition)if(+t!==e)return;n&&n.removeChild(this)}}function lS(){return this.on("end.remove",Y5(this._id))}function uS(e){var n=this._name,t=this._id;typeof e!="function"&&(e=gi(e));for(var o=this._groups,r=o.length,i=new Array(r),a=0;a<r;++a)for(var s=o[a],c=s.length,l=i[a]=new Array(c),u,f,d=0;d<c;++d)(u=s[d])&&(f=e.call(u,u.__data__,d,s))&&("__data__"in u&&(f.__data__=u.__data__),l[d]=f,kr(l[d],n,t,d,l,en(u,t)));return new An(i,this._parents,n,t)}function dS(e){var n=this._name,t=this._id;typeof e!="function"&&(e=_c(e));for(var o=this._groups,r=o.length,i=[],a=[],s=0;s<r;++s)for(var c=o[s],l=c.length,u,f=0;f<l;++f)if(u=c[f]){for(var d=e.call(u,u.__data__,f,c),p,m=en(u,t),g=0,x=d.length;g<x;++g)(p=d[g])&&kr(p,n,t,g,d,m);i.push(d),a.push(u)}return new An(i,a,n,t)}var G5=Mo.prototype.constructor;function fS(){return new G5(this._groups,this._parents)}function X5(e,n){var t,o,r;return function(){var i=wr(this,e),a=(this.style.removeProperty(e),wr(this,e));return i===a?null:i===t&&a===o?r:r=n(t=i,o=a)}}function pS(e){return function(){this.style.removeProperty(e)}}function K5(e,n,t){var o,r=t+"",i;return function(){var a=wr(this,e);return a===r?null:a===o?i:i=n(o=a,t)}}function Z5(e,n,t){var o,r,i;return function(){var a=wr(this,e),s=t(this),c=s+"";return s==null&&(c=s=(this.style.removeProperty(e),wr(this,e))),a===c?null:a===o&&c===r?i:(r=c,i=n(o=a,s))}}function Q5(e,n){var t,o,r,i="style."+n,a="end."+i,s;return function(){var c=yn(this,e),l=c.on,u=c.value[i]==null?s||(s=pS(n)):void 0;(l!==t||r!==u)&&(o=(t=l).copy()).on(a,r=u),c.on=o}}function mS(e,n,t){var o=(e+="")=="transform"?ey:Ad;return n==null?this.styleTween(e,X5(e,o)).on("end.style."+e,pS(e)):typeof n=="function"?this.styleTween(e,Z5(e,o,Xa(this,"style."+e,n))).each(Q5(this._id,e)):this.styleTween(e,K5(e,o,n),t).on("end.style."+e,null)}function W5(e,n,t){return function(o){this.style.setProperty(e,n.call(this,o),t)}}function $5(e,n,t){var o,r;function i(){var a=n.apply(this,arguments);return a!==r&&(o=(r=a)&&W5(e,a,t)),o}return i._value=n,i}function hS(e,n,t){var o="style."+(e+="");if(arguments.length<2)return(o=this.tween(o))&&o._value;if(n==null)return this.tween(o,null);if(typeof n!="function")throw new Error;return this.tween(o,$5(e,n,t??""))}function J5(e){return function(){this.textContent=e}}function eA(e){return function(){var n=e(this);this.textContent=n??""}}function yS(e){return this.tween("text",typeof e=="function"?eA(Xa(this,"text",e)):J5(e==null?"":e+""))}function nA(e){return function(n){this.textContent=e.call(this,n)}}function tA(e){var n,t;function o(){var r=e.apply(this,arguments);return r!==t&&(n=(t=r)&&nA(r)),n}return o._value=e,o}function gS(e){var n="text";if(arguments.length<1)return(n=this.tween(n))&&n._value;if(e==null)return this.tween(n,null);if(typeof e!="function")throw new Error;return this.tween(n,tA(e))}function vS(){for(var e=this._name,n=this._id,t=Nd(),o=this._groups,r=o.length,i=0;i<r;++i)for(var a=o[i],s=a.length,c,l=0;l<s;++l)if(c=a[l]){var u=en(c,n);kr(c,e,t,l,a,{time:u.time+u.delay+u.duration,delay:0,duration:u.duration,ease:u.ease})}return new An(o,this._parents,e,t)}function xS(){var e,n,t=this,o=t._id,r=t.size();return new Promise(function(i,a){var s={value:a},c={value:function(){--r===0&&i()}};t.each(function(){var l=yn(this,o),u=l.on;u!==e&&(n=(e=u).copy(),n._.cancel.push(s),n._.interrupt.push(s),n._.end.push(c)),l.on=n}),r===0&&i()})}var oA=0;function An(e,n,t,o){this._groups=e,this._parents=n,this._name=t,this._id=o}function wS(e){return Mo().transition(e)}function Nd(){return++oA}var No=Mo.prototype;An.prototype=wS.prototype={constructor:An,select:uS,selectAll:dS,selectChild:No.selectChild,selectChildren:No.selectChildren,filter:aS,merge:sS,selection:fS,transition:vS,call:No.call,nodes:No.nodes,node:No.node,size:No.size,empty:No.empty,each:No.each,on:cS,attr:eS,attrTween:nS,style:mS,styleTween:hS,text:yS,textTween:gS,remove:lS,tween:Jk,delay:tS,duration:oS,ease:rS,easeVarying:iS,end:xS,[Symbol.iterator]:No[Symbol.iterator]};function Id(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var rA={time:null,delay:0,duration:250,ease:Id};function iA(e,n){for(var t;!(t=e.__transition)||!(t=t[n]);)if(!(e=e.parentNode))throw new Error(`transition ${n} not found`);return t}function bS(e){var n,t;e instanceof An?(n=e._id,e=e._name):(n=Nd(),(t=rA).time=Hc(),e=e==null?null:e+"");for(var o=this._groups,r=o.length,i=0;i<r;++i)for(var a=o[i],s=a.length,c,l=0;l<s;++l)(c=a[l])&&kr(c,e,n,l,a,t||iA(c,n));return new An(o,this._parents,e,n)}Mo.prototype.interrupt=$k;Mo.prototype.transition=bS;var Fc=e=>()=>e;function oy(e,{sourceEvent:n,target:t,transform:o,dispatch:r}){Object.defineProperties(this,{type:{value:e,enumerable:!0,configurable:!0},sourceEvent:{value:n,enumerable:!0,configurable:!0},target:{value:t,enumerable:!0,configurable:!0},transform:{value:o,enumerable:!0,configurable:!0},_:{value:r}})}function Pt(e,n,t){this.k=e,this.x=n,this.y=t}Pt.prototype={constructor:Pt,scale:function(e){return e===1?this:new Pt(this.k*e,this.x,this.y)},translate:function(e,n){return e===0&n===0?this:new Pt(this.k,this.x+this.k*e,this.y+this.k*n)},apply:function(e){return[e[0]*this.k+this.x,e[1]*this.k+this.y]},applyX:function(e){return e*this.k+this.x},applyY:function(e){return e*this.k+this.y},invert:function(e){return[(e[0]-this.x)/this.k,(e[1]-this.y)/this.k]},invertX:function(e){return(e-this.x)/this.k},invertY:function(e){return(e-this.y)/this.k},rescaleX:function(e){return e.copy().domain(e.range().map(this.invertX,this).map(e.invert,e))},rescaleY:function(e){return e.copy().domain(e.range().map(this.invertY,this).map(e.invert,e))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};var Di=new Pt(1,0,0);Yc.prototype=Pt.prototype;function Yc(e){for(;!e.__zoom;)if(!(e=e.parentNode))return Di;return e.__zoom}function Od(e){e.stopImmediatePropagation()}function Ka(e){e.preventDefault(),e.stopImmediatePropagation()}function aA(e){return(!e.ctrlKey||e.type==="wheel")&&!e.button}function sA(){var e=this;return e instanceof SVGElement?(e=e.ownerSVGElement||e,e.hasAttribute("viewBox")?(e=e.viewBox.baseVal,[[e.x,e.y],[e.x+e.width,e.y+e.height]]):[[0,0],[e.width.baseVal.value,e.height.baseVal.value]]):[[0,0],[e.clientWidth,e.clientHeight]]}function kS(){return this.__zoom||Di}function cA(e){return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*(e.ctrlKey?10:1)}function lA(){return navigator.maxTouchPoints||"ontouchstart"in this}function uA(e,n,t){var o=e.invertX(n[0][0])-t[0][0],r=e.invertX(n[1][0])-t[1][0],i=e.invertY(n[0][1])-t[0][1],a=e.invertY(n[1][1])-t[1][1];return e.translate(r>o?(o+r)/2:Math.min(0,o)||Math.max(0,r),a>i?(i+a)/2:Math.min(0,i)||Math.max(0,a))}function zd(){var e=aA,n=sA,t=uA,o=cA,r=lA,i=[0,1/0],a=[[-1/0,-1/0],[1/0,1/0]],s=250,c=ki,l=yi("start","zoom","end"),u,f,d,p=500,m=150,g=0,x=10;function h(C){C.property("__zoom",kS).on("wheel.zoom",D,{passive:!1}).on("mousedown.zoom",E).on("dblclick.zoom",R).filter(r).on("touchstart.zoom",A).on("touchmove.zoom",P).on("touchend.zoom touchcancel.zoom",I).style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}h.transform=function(C,T,q,M){var N=C.selection?C.selection():C;N.property("__zoom",kS),C!==N?b(C,T,q,M):N.interrupt().each(function(){_(this,arguments).event(M).start().zoom(null,typeof T=="function"?T.apply(this,arguments):T).end()})},h.scaleBy=function(C,T,q,M){h.scaleTo(C,function(){var N=this.__zoom.k,O=typeof T=="function"?T.apply(this,arguments):T;return N*O},q,M)},h.scaleTo=function(C,T,q,M){h.transform(C,function(){var N=n.apply(this,arguments),O=this.__zoom,V=q==null?w(N):typeof q=="function"?q.apply(this,arguments):q,H=O.invert(V),U=typeof T=="function"?T.apply(this,arguments):T;return t(y(v(O,U),V,H),N,a)},q,M)},h.translateBy=function(C,T,q,M){h.transform(C,function(){return t(this.__zoom.translate(typeof T=="function"?T.apply(this,arguments):T,typeof q=="function"?q.apply(this,arguments):q),n.apply(this,arguments),a)},null,M)},h.translateTo=function(C,T,q,M,N){h.transform(C,function(){var O=n.apply(this,arguments),V=this.__zoom,H=M==null?w(O):typeof M=="function"?M.apply(this,arguments):M;return t(Di.translate(H[0],H[1]).scale(V.k).translate(typeof T=="function"?-T.apply(this,arguments):-T,typeof q=="function"?-q.apply(this,arguments):-q),O,a)},M,N)};function v(C,T){return T=Math.max(i[0],Math.min(i[1],T)),T===C.k?C:new Pt(T,C.x,C.y)}function y(C,T,q){var M=T[0]-q[0]*C.k,N=T[1]-q[1]*C.k;return M===C.x&&N===C.y?C:new Pt(C.k,M,N)}function w(C){return[(+C[0][0]+ +C[1][0])/2,(+C[0][1]+ +C[1][1])/2]}function b(C,T,q,M){C.on("start.zoom",function(){_(this,arguments).event(M).start()}).on("interrupt.zoom end.zoom",function(){_(this,arguments).event(M).end()}).tween("zoom",function(){var N=this,O=arguments,V=_(N,O).event(M),H=n.apply(N,O),U=q==null?w(H):typeof q=="function"?q.apply(N,O):q,Y=Math.max(H[1][0]-H[0][0],H[1][1]-H[0][1]),F=N.__zoom,G=typeof T=="function"?T.apply(N,O):T,oe=c(F.invert(U).concat(Y/F.k),G.invert(U).concat(Y/G.k));return function(W){if(W===1)W=G;else{var j=oe(W),X=Y/j[2];W=new Pt(X,U[0]-j[0]*X,U[1]-j[1]*X)}V.zoom(null,W)}})}function _(C,T,q){return!q&&C.__zooming||new k(C,T)}function k(C,T){this.that=C,this.args=T,this.active=0,this.sourceEvent=null,this.extent=n.apply(C,T),this.taps=0}k.prototype={event:function(C){return C&&(this.sourceEvent=C),this},start:function(){return++this.active===1&&(this.that.__zooming=this,this.emit("start")),this},zoom:function(C,T){return this.mouse&&C!=="mouse"&&(this.mouse[1]=T.invert(this.mouse[0])),this.touch0&&C!=="touch"&&(this.touch0[1]=T.invert(this.touch0[0])),this.touch1&&C!=="touch"&&(this.touch1[1]=T.invert(this.touch1[0])),this.that.__zoom=T,this.emit("zoom"),this},end:function(){return--this.active===0&&(delete this.that.__zooming,this.emit("end")),this},emit:function(C){var T=sn(this.that).datum();l.call(C,this.that,new oy(C,{sourceEvent:this.sourceEvent,target:h,type:C,transform:this.that.__zoom,dispatch:l}),T)}};function D(C,...T){if(!e.apply(this,arguments))return;var q=_(this,T).event(C),M=this.__zoom,N=Math.max(i[0],Math.min(i[1],M.k*Math.pow(2,o.apply(this,arguments)))),O=Rn(C);if(q.wheel)(q.mouse[0][0]!==O[0]||q.mouse[0][1]!==O[1])&&(q.mouse[1]=M.invert(q.mouse[0]=O)),clearTimeout(q.wheel);else{if(M.k===N)return;q.mouse=[O,M.invert(O)],_i(this),q.start()}Ka(C),q.wheel=setTimeout(V,m),q.zoom("mouse",t(y(v(M,N),q.mouse[0],q.mouse[1]),q.extent,a));function V(){q.wheel=null,q.end()}}function E(C,...T){if(d||!e.apply(this,arguments))return;var q=C.currentTarget,M=_(this,T,!0).event(C),N=sn(C.view).on("mousemove.zoom",U,!0).on("mouseup.zoom",Y,!0),O=Rn(C,q),V=C.clientX,H=C.clientY;Cc(C.view),Od(C),M.mouse=[O,this.__zoom.invert(O)],_i(this),M.start();function U(F){if(Ka(F),!M.moved){var G=F.clientX-V,oe=F.clientY-H;M.moved=G*G+oe*oe>g}M.event(F).zoom("mouse",t(y(M.that.__zoom,M.mouse[0]=Rn(F,q),M.mouse[1]),M.extent,a))}function Y(F){N.on("mousemove.zoom mouseup.zoom",null),Tc(F.view,M.moved),Ka(F),M.event(F).end()}}function R(C,...T){if(e.apply(this,arguments)){var q=this.__zoom,M=Rn(C.changedTouches?C.changedTouches[0]:C,this),N=q.invert(M),O=q.k*(C.shiftKey?.5:2),V=t(y(v(q,O),M,N),n.apply(this,T),a);Ka(C),s>0?sn(this).transition().duration(s).call(b,V,M,C):sn(this).call(h.transform,V,M,C)}}function A(C,...T){if(e.apply(this,arguments)){var q=C.touches,M=q.length,N=_(this,T,C.changedTouches.length===M).event(C),O,V,H,U;for(Od(C),V=0;V<M;++V)H=q[V],U=Rn(H,this),U=[U,this.__zoom.invert(U),H.identifier],N.touch0?!N.touch1&&N.touch0[2]!==U[2]&&(N.touch1=U,N.taps=0):(N.touch0=U,O=!0,N.taps=1+!!u);u&&(u=clearTimeout(u)),O&&(N.taps<2&&(f=U[0],u=setTimeout(function(){u=null},p)),_i(this),N.start())}}function P(C,...T){if(this.__zooming){var q=_(this,T).event(C),M=C.changedTouches,N=M.length,O,V,H,U;for(Ka(C),O=0;O<N;++O)V=M[O],H=Rn(V,this),q.touch0&&q.touch0[2]===V.identifier?q.touch0[0]=H:q.touch1&&q.touch1[2]===V.identifier&&(q.touch1[0]=H);if(V=q.that.__zoom,q.touch1){var Y=q.touch0[0],F=q.touch0[1],G=q.touch1[0],oe=q.touch1[1],W=(W=G[0]-Y[0])*W+(W=G[1]-Y[1])*W,j=(j=oe[0]-F[0])*j+(j=oe[1]-F[1])*j;V=v(V,Math.sqrt(W/j)),H=[(Y[0]+G[0])/2,(Y[1]+G[1])/2],U=[(F[0]+oe[0])/2,(F[1]+oe[1])/2]}else if(q.touch0)H=q.touch0[0],U=q.touch0[1];else return;q.zoom("touch",t(y(V,H,U),q.extent,a))}}function I(C,...T){if(this.__zooming){var q=_(this,T).event(C),M=C.changedTouches,N=M.length,O,V;for(Od(C),d&&clearTimeout(d),d=setTimeout(function(){d=null},p),O=0;O<N;++O)V=M[O],q.touch0&&q.touch0[2]===V.identifier?delete q.touch0:q.touch1&&q.touch1[2]===V.identifier&&delete q.touch1;if(q.touch1&&!q.touch0&&(q.touch0=q.touch1,delete q.touch1),q.touch0)q.touch0[1]=this.__zoom.invert(q.touch0[0]);else if(q.end(),q.taps===2&&(V=Rn(V,this),Math.hypot(f[0]-V[0],f[1]-V[1])<x)){var H=sn(this).on("dblclick.zoom");H&&H.apply(this,arguments)}}}return h.wheelDelta=function(C){return arguments.length?(o=typeof C=="function"?C:Fc(+C),h):o},h.filter=function(C){return arguments.length?(e=typeof C=="function"?C:Fc(!!C),h):e},h.touchable=function(C){return arguments.length?(r=typeof C=="function"?C:Fc(!!C),h):r},h.extent=function(C){return arguments.length?(n=typeof C=="function"?C:Fc([[+C[0][0],+C[0][1]],[+C[1][0],+C[1][1]]]),h):n},h.scaleExtent=function(C){return arguments.length?(i[0]=+C[0],i[1]=+C[1],h):[i[0],i[1]]},h.translateExtent=function(C){return arguments.length?(a[0][0]=+C[0][0],a[1][0]=+C[1][0],a[0][1]=+C[0][1],a[1][1]=+C[1][1],h):[[a[0][0],a[0][1]],[a[1][0],a[1][1]]]},h.constrain=function(C){return arguments.length?(t=C,h):t},h.duration=function(C){return arguments.length?(s=+C,h):s},h.interpolate=function(C){return arguments.length?(c=C,h):c},h.on=function(){var C=l.on.apply(l,arguments);return C===l?h:C},h.clickDistance=function(C){return arguments.length?(g=(C=+C)*C,h):Math.sqrt(g)},h.tapDistance=function(C){return arguments.length?(x=+C,h):x},h}var at={error001:(e="react")=>`Seems like you have not used ${e==="svelte"?"SvelteFlowProvider":"ReactFlowProvider"} as an ancestor. Help: https://${e}flow.dev/error#001`,error002:()=>"It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.",error003:e=>`Node type "${e}" not found. Using fallback type "default".`,error004:()=>"The parent container needs a width and a height to render the graph.",error005:()=>"Only child nodes can use a parent extent.",error006:()=>"Can't create edge. An edge needs a source and a target.",error007:e=>`The old edge with id=${e} does not exist.`,error009:e=>`Marker type "${e}" doesn't exist.`,error008:(e,{id:n,sourceHandle:t,targetHandle:o})=>`Couldn't create edge for ${e} handle id: "${e==="source"?t:o}", edge id: ${n}.`,error010:()=>"Handle: No node id found. Make sure to only use a Handle inside a custom Node.",error011:e=>`Edge type "${e}" not found. Using fallback type "default".`,error012:e=>`Node with id "${e}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`,error013:(e="react")=>`It seems that you haven't loaded the styles. Please import '@xyflow/${e}/dist/style.css' or base.css to make sure everything is working properly.`,error014:()=>"useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.",error015:()=>"It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.",error016:e=>`Edge with id "${e}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.`},$a=[[Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY],[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY]],cy=["Enter"," ","Escape"],ly={"node.a11yDescription.default":"Press enter or space to select a node. Press delete to remove it and escape to cancel.","node.a11yDescription.keyboardDisabled":"Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.","node.a11yDescription.ariaLiveMessage":({direction:e,x:n,y:t})=>`Moved selected node ${e}. New position, x: ${n}, y: ${t}`,"edge.a11yDescription.default":"Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.","controls.ariaLabel":"Control Panel","controls.zoomIn.ariaLabel":"Zoom In","controls.zoomOut.ariaLabel":"Zoom Out","controls.fitView.ariaLabel":"Fit View","controls.interactive.ariaLabel":"Toggle Interactivity","minimap.ariaLabel":"Mini Map","handle.ariaLabel":"Handle"},Er;(function(e){e.Strict="strict",e.Loose="loose"})(Er||(Er={}));var Io;(function(e){e.Free="free",e.Vertical="vertical",e.Horizontal="horizontal"})(Io||(Io={}));var Ei;(function(e){e.Partial="partial",e.Full="full"})(Ei||(Ei={}));var uy={inProgress:!1,isValid:null,from:null,fromHandle:null,fromPosition:null,fromNode:null,to:null,toHandle:null,toPosition:null,toNode:null,pointer:null},ro;(function(e){e.Bezier="default",e.Straight="straight",e.Step="step",e.SmoothStep="smoothstep",e.SimpleBezier="simplebezier"})(ro||(ro={}));var Qa;(function(e){e.Arrow="arrow",e.ArrowClosed="arrowclosed"})(Qa||(Qa={}));var K;(function(e){e.Left="left",e.Top="top",e.Right="right",e.Bottom="bottom"})(K||(K={}));var SS={[K.Left]:K.Right,[K.Right]:K.Left,[K.Top]:K.Bottom,[K.Bottom]:K.Top},dy=e=>!!e&&typeof e=="object"&&"id"in e&&"source"in e&&"target"in e,zS=e=>!!e&&typeof e=="object"&&"id"in e&&"position"in e&&!("source"in e)&&!("target"in e),fy=e=>!!e&&typeof e=="object"&&"id"in e&&"internals"in e&&!("source"in e)&&!("target"in e);var Xc=(e,n=[0,0])=>{let{width:t,height:o}=St(e),r=e.origin??n,i=t*r[0],a=o*r[1];return{x:e.position.x-i,y:e.position.y-a}},py=(e,n={nodeOrigin:[0,0]})=>{if(e.length===0)return{x:0,y:0,width:0,height:0};let t=!1,o=e.reduce((r,i)=>{let a=typeof i=="string",s=!n.nodeLookup&&!a?i:void 0;return n.nodeLookup&&(s=a?n.nodeLookup.get(i):fy(i)?i:n.nodeLookup.get(i.id)),s?(t=!0,Vd(r,Ld(s,n.nodeOrigin))):r},{x:1/0,y:1/0,x2:-1/0,y2:-1/0});return t?Ud(o):{x:0,y:0,width:0,height:0}},Ja=(e,n={})=>{let t={x:1/0,y:1/0,x2:-1/0,y2:-1/0},o=!1;return e.forEach(r=>{(n.filter===void 0||n.filter(r))&&(t=Vd(t,Ld(r)),o=!0)}),o?Ud(t):{x:0,y:0,width:0,height:0}},jd=(e,n,[t,o,r]=[0,0,1],i=!1,a=!1)=>{let s=(n.x-t)/r,c=(n.y-o)/r,l=n.width/r,u=n.height/r,f=[];for(let d of e.values()){let{measured:p,selectable:m=!0,hidden:g=!1}=d;if(a&&!m||g)continue;let x=p.width??d.width??d.initialWidth??0,h=p.height??d.height??d.initialHeight??0,{x:v,y}=d.internals.positionAbsolute,w=HS(s,c,l,u,v,y,x,h),b=x*h,_=i&&w>0;(!d.internals.handleBounds||_||w>=b||d.dragging)&&f.push(d)}return f},BS=(e,n)=>{let t=new Set;return e.forEach(o=>{t.add(o.id)}),n.filter(o=>t.has(o.source)||t.has(o.target))};function dA(e,n){let t=new Map,o=n?.nodes?new Set(n.nodes.map(r=>r.id)):null;return e.forEach(r=>{let i;if(n?.includeHiddenNodes){let{width:a,height:s}=St(r);i=a>0&&s>0}else i=!!(r.measured.width&&r.measured.height&&!r.hidden);i&&(!o||o.has(r.id))&&t.set(r.id,r)}),t}async function PS({nodes:e,width:n,height:t,panZoom:o,minZoom:r,maxZoom:i},a){if(e.size===0)return!0;let s=dA(e,a),c=Ja(s),l=Zc(c,n,t,a?.minZoom??r,a?.maxZoom??i,a?.padding??.1);return await o.setViewport(l,{duration:a?.duration,ease:a?.ease,interpolate:a?.interpolate}),!0}function my({nodeId:e,nextPosition:n,nodeLookup:t,nodeOrigin:o=[0,0],nodeExtent:r,onError:i}){let a=t.get(e),s=a.parentId?t.get(a.parentId):void 0,{x:c,y:l}=s?s.internals.positionAbsolute:{x:0,y:0},u=a.origin??o,f=a.extent||r;if(a.extent==="parent"&&!a.expandParent)if(!s)i?.("005",at.error005());else{let{width:p,height:m}=St(s);p&&m&&(f=[[c,l],[c+p,l+m]])}else s&&qi(a.extent)&&(f=[[a.extent[0][0]+c,a.extent[0][1]+l],[a.extent[1][0]+c,a.extent[1][1]+l]]);let d=qi(f)?Ci(n,f,a.measured):n;return(a.measured.width===void 0||a.measured.height===void 0)&&i?.("015",at.error015()),{position:{x:d.x-c+(a.measured.width??0)*u[0],y:d.y-l+(a.measured.height??0)*u[1]},positionAbsolute:d}}async function LS({nodesToRemove:e=[],edgesToRemove:n=[],nodes:t,edges:o,onBeforeDelete:r}){let i=new Set(e.map(d=>d.id)),a=[];for(let d of t){if(d.deletable===!1)continue;let p=i.has(d.id),m=!p&&d.parentId&&a.find(g=>g.id===d.parentId);(p||m)&&a.push(d)}let s=new Set(n.map(d=>d.id)),c=o.filter(d=>d.deletable!==!1),u=BS(a,c);for(let d of c)s.has(d.id)&&!u.find(m=>m.id===d.id)&&u.push(d);if(!r)return{edges:u,nodes:a};let f=await r({nodes:a,edges:u});return typeof f=="boolean"?f?{edges:u,nodes:a}:{edges:[],nodes:[]}:f}var Wa=(e,n=0,t=1)=>Math.min(Math.max(e,n),t),Ci=(e={x:0,y:0},n,t)=>({x:Wa(e.x,n[0][0],n[1][0]-(t?.width??0)),y:Wa(e.y,n[0][1],n[1][1]-(t?.height??0))});function jS(e,n,t){let{width:o,height:r}=St(t),{x:i,y:a}=t.internals.positionAbsolute;return Ci(e,[[i,a],[i+o,a+r]],n)}var _S=(e,n,t)=>e<n?Wa(Math.abs(e-n),1,n)/n:e>t?-Wa(Math.abs(e-t),1,n)/n:0,Hd=(e,n,t=15,o=40)=>{let r=_S(e.x,o,n.width-o)*t,i=_S(e.y,o,n.height-o)*t;return[r,i]},Vd=(e,n)=>({x:Math.min(e.x,n.x),y:Math.min(e.y,n.y),x2:Math.max(e.x2,n.x2),y2:Math.max(e.y2,n.y2)}),sy=({x:e,y:n,width:t,height:o})=>({x:e,y:n,x2:e+t,y2:n+o}),Ud=({x:e,y:n,x2:t,y2:o})=>({x:e,y:n,width:t-e,height:o-n}),es=(e,n=[0,0])=>{let{x:t,y:o}=fy(e)?e.internals.positionAbsolute:Xc(e,n);return{x:t,y:o,width:e.measured?.width??e.width??e.initialWidth??0,height:e.measured?.height??e.height??e.initialHeight??0}},Ld=(e,n=[0,0])=>{let{x:t,y:o}=fy(e)?e.internals.positionAbsolute:Xc(e,n);return{x:t,y:o,x2:t+(e.measured?.width??e.width??e.initialWidth??0),y2:o+(e.measured?.height??e.height??e.initialHeight??0)}},hy=(e,n)=>Ud(Vd(sy(e),sy(n))),HS=(e,n,t,o,r,i,a,s)=>{let c=Math.max(0,Math.min(e+t,r+a)-Math.max(e,r)),l=Math.max(0,Math.min(n+o,i+s)-Math.max(n,i));return Math.ceil(c*l)},Kc=(e,n)=>HS(e.x,e.y,e.width,e.height,n.x,n.y,n.width,n.height),yy=e=>bt(e.width)&&bt(e.height)&&bt(e.x)&&bt(e.y),bt=e=>!isNaN(e)&&isFinite(e),gy=(e,n)=>(t,o)=>{},ns=(e,n=[1,1])=>({x:n[0]*Math.round(e.x/n[0]),y:n[1]*Math.round(e.y/n[1])}),ts=({x:e,y:n},[t,o,r],i=!1,a=[1,1])=>{let s={x:(e-t)/r,y:(n-o)/r};return i?ns(s,a):s},Ti=({x:e,y:n},[t,o,r])=>({x:e*r+t,y:n*r+o});function Za(e,n){if(typeof e=="number")return Math.floor((n-n/(1+e))*.5);if(typeof e=="string"&&e.endsWith("px")){let t=parseFloat(e);if(!Number.isNaN(t))return Math.floor(t)}if(typeof e=="string"&&e.endsWith("%")){let t=parseFloat(e);if(!Number.isNaN(t))return Math.floor(n*t*.01)}return console.error(`The padding value "${e}" is invalid. Please provide a number or a string with a valid unit (px or %).`),0}function fA(e,n,t){if(typeof e=="string"||typeof e=="number"){let o=Za(e,t),r=Za(e,n);return{top:o,right:r,bottom:o,left:r,x:r*2,y:o*2}}if(typeof e=="object"){let o=Za(e.top??e.y??0,t),r=Za(e.bottom??e.y??0,t),i=Za(e.left??e.x??0,n),a=Za(e.right??e.x??0,n);return{top:o,right:a,bottom:r,left:i,x:i+a,y:o+r}}return{top:0,right:0,bottom:0,left:0,x:0,y:0}}function pA(e,n,t,o,r,i){let{x:a,y:s}=Ti(e,[n,t,o]),{x:c,y:l}=Ti({x:e.x+e.width,y:e.y+e.height},[n,t,o]),u=r-c,f=i-l;return{left:Math.floor(a),top:Math.floor(s),right:Math.floor(u),bottom:Math.floor(f)}}var Zc=(e,n,t,o,r,i)=>{let a=fA(i,n,t),s=(n-a.x)/e.width,c=(t-a.y)/e.height,l=Math.min(s,c),u=Wa(l,o,r),f=e.x+e.width/2,d=e.y+e.height/2,p=n/2-f*u,m=t/2-d*u,g=pA(e,p,m,u,n,t),x={left:Math.min(g.left-a.left,0),top:Math.min(g.top-a.top,0),right:Math.min(g.right-a.right,0),bottom:Math.min(g.bottom-a.bottom,0)};return{x:p-x.left+x.right,y:m-x.top+x.bottom,zoom:u}},os=()=>typeof navigator<"u"&&navigator?.userAgent?.indexOf("Mac")>=0;function qi(e){return e!=null&&e!=="parent"}function St(e){return{width:e.measured?.width??e.width??e.initialWidth??0,height:e.measured?.height??e.height??e.initialHeight??0}}function vy(e){return(e.measured?.width??e.width??e.initialWidth)!==void 0&&(e.measured?.height??e.height??e.initialHeight)!==void 0}function xy(e,n={width:0,height:0},t,o,r){let i={...e},a=o.get(t);if(a){let s=a.origin||r;i.x+=a.internals.positionAbsolute.x-(n.width??0)*s[0],i.y+=a.internals.positionAbsolute.y-(n.height??0)*s[1]}return i}function wy(e,n){if(e.size!==n.size)return!1;for(let t of e)if(!n.has(t))return!1;return!0}function VS(){let e,n;return{promise:new Promise((o,r)=>{e=o,n=r}),resolve:e,reject:n}}function US(e){return{...ly,...e||{}}}function by(e){return e===null?null:e?"valid":"invalid"}function Gc(e,{snapGrid:n=[0,0],snapToGrid:t=!1,transform:o,containerBounds:r}){let{x:i,y:a}=kt(e),s=ts({x:i-(r?.left??0),y:a-(r?.top??0)},o),{x:c,y:l}=t?ns(s,n):s;return{xSnapped:c,ySnapped:l,...s}}var Fd=e=>({width:e.offsetWidth,height:e.offsetHeight}),ky=e=>e?.getRootNode?.()||window?.document,mA=["INPUT","SELECT","TEXTAREA"];function Sy(e){let n=e.composedPath?.()?.[0]||e.target;return n?.nodeType!==1?!1:mA.includes(n.nodeName)||n.hasAttribute("contenteditable")||!!n.closest(".nokey")}var _y=e=>"clientX"in e,kt=(e,n)=>{let t=_y(e),o=t?e.clientX:e.touches?.[0].clientX,r=t?e.clientY:e.touches?.[0].clientY;return{x:o-(n?.left??0),y:r-(n?.top??0)}},DS=(e,n,t,o,r)=>{let i=n.querySelectorAll(`.${e}`);return!i||!i.length?null:Array.from(i).map(a=>{let s=a.getBoundingClientRect();return{id:a.getAttribute("data-handleid"),type:e,nodeId:r,position:a.getAttribute("data-handlepos"),x:(s.left-t.left)/o,y:(s.top-t.top)/o,...Fd(a)}})};function Yd({sourceX:e,sourceY:n,targetX:t,targetY:o,sourceControlX:r,sourceControlY:i,targetControlX:a,targetControlY:s}){let c=e*.125+r*.375+a*.375+t*.125,l=n*.125+i*.375+s*.375+o*.125,u=Math.abs(c-e),f=Math.abs(l-n);return[c,l,u,f]}function Bd(e,n){return e>=0?.5*e:n*25*Math.sqrt(-e)}function ES({pos:e,x1:n,y1:t,x2:o,y2:r,c:i}){switch(e){case K.Left:return[n-Bd(n-o,i),t];case K.Right:return[n+Bd(o-n,i),t];case K.Top:return[n,t-Bd(t-r,i)];case K.Bottom:return[n,t+Bd(r-t,i)]}}function Gd({sourceX:e,sourceY:n,sourcePosition:t=K.Bottom,targetX:o,targetY:r,targetPosition:i=K.Top,curvature:a=.25}){let[s,c]=ES({pos:t,x1:e,y1:n,x2:o,y2:r,c:a}),[l,u]=ES({pos:i,x1:o,y1:r,x2:e,y2:n,c:a}),[f,d,p,m]=Yd({sourceX:e,sourceY:n,targetX:o,targetY:r,sourceControlX:s,sourceControlY:c,targetControlX:l,targetControlY:u});return[`M${e},${n} C${s},${c} ${l},${u} ${o},${r}`,f,d,p,m]}function Dy({sourceX:e,sourceY:n,targetX:t,targetY:o}){let r=Math.abs(t-e)/2,i=t<e?t+r:t-r,a=Math.abs(o-n)/2,s=o<n?o+a:o-a;return[i,s,r,a]}function FS({sourceNode:e,targetNode:n,selected:t=!1,zIndex:o=0,elevateOnSelect:r=!1,zIndexMode:i="basic"}){if(i==="manual")return o;let a=r&&t?o+1e3:o,s=Math.max(e.parentId||r&&e.selected?e.internals.z:0,n.parentId||r&&n.selected?n.internals.z:0);return a+s}function YS({sourceNode:e,targetNode:n,width:t,height:o,transform:r}){let i=Vd(Ld(e),Ld(n));i.x===i.x2&&(i.x2+=1),i.y===i.y2&&(i.y2+=1);let a={x:-r[0]/r[2],y:-r[1]/r[2],width:t/r[2],height:o/r[2]};return Kc(a,Ud(i))>0}var hA=({source:e,sourceHandle:n,target:t,targetHandle:o})=>`xy-edge__${e}${n||""}-${t}${o||""}`,yA=(e,n)=>n.some(t=>t.source===e.source&&t.target===e.target&&(t.sourceHandle===e.sourceHandle||!t.sourceHandle&&!e.sourceHandle)&&(t.targetHandle===e.targetHandle||!t.targetHandle&&!e.targetHandle)),GS=(e,n,t={})=>{if(!e.source||!e.target)return t.onError?.("006",at.error006()),n;let o=t.getEdgeId||hA,r;return dy(e)?r={...e}:r={...e,id:o(e)},yA(r,n)?n:(r.sourceHandle===null&&delete r.sourceHandle,r.targetHandle===null&&delete r.targetHandle,n.concat(r))};function Xd({sourceX:e,sourceY:n,targetX:t,targetY:o}){let[r,i,a,s]=Dy({sourceX:e,sourceY:n,targetX:t,targetY:o});return[`M ${e},${n}L ${t},${o}`,r,i,a,s]}var CS={[K.Left]:{x:-1,y:0},[K.Right]:{x:1,y:0},[K.Top]:{x:0,y:-1},[K.Bottom]:{x:0,y:1}},gA=({source:e,sourcePosition:n=K.Bottom,target:t})=>n===K.Left||n===K.Right?e.x<t.x?{x:1,y:0}:{x:-1,y:0}:e.y<t.y?{x:0,y:1}:{x:0,y:-1},TS=(e,n)=>Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2));function vA({source:e,sourcePosition:n=K.Bottom,target:t,targetPosition:o=K.Top,center:r,offset:i,stepPosition:a}){let s=CS[n],c=CS[o],l={x:e.x+s.x*i,y:e.y+s.y*i},u={x:t.x+c.x*i,y:t.y+c.y*i},f=gA({source:l,sourcePosition:n,target:u}),d=f.x!==0?"x":"y",p=f[d],m=[],g,x,h={x:0,y:0},v={x:0,y:0},[,,y,w]=Dy({sourceX:e.x,sourceY:e.y,targetX:t.x,targetY:t.y});if(s[d]*c[d]===-1){d==="x"?(g=r.x??l.x+(u.x-l.x)*a,x=r.y??(l.y+u.y)/2):(g=r.x??(l.x+u.x)/2,x=r.y??l.y+(u.y-l.y)*a);let D=[{x:g,y:l.y},{x:g,y:u.y}],E=[{x:l.x,y:x},{x:u.x,y:x}];s[d]===p?m=d==="x"?D:E:m=d==="x"?E:D}else{let D=[{x:l.x,y:u.y}],E=[{x:u.x,y:l.y}];if(d==="x"?m=s.x===p?E:D:m=s.y===p?D:E,n===o){let C=Math.abs(e[d]-t[d]);if(C<=i){let T=Math.min(i-1,i-C);s[d]===p?h[d]=(l[d]>e[d]?-1:1)*T:v[d]=(u[d]>t[d]?-1:1)*T}}if(n!==o){let C=d==="x"?"y":"x",T=s[d]===c[C],q=l[C]>u[C],M=l[C]<u[C];(s[d]===1&&(!T&&q||T&&M)||s[d]!==1&&(!T&&M||T&&q))&&(m=d==="x"?D:E)}let R={x:l.x+h.x,y:l.y+h.y},A={x:u.x+v.x,y:u.y+v.y},P=Math.max(Math.abs(R.x-m[0].x),Math.abs(A.x-m[0].x)),I=Math.max(Math.abs(R.y-m[0].y),Math.abs(A.y-m[0].y));P>=I?(g=(R.x+A.x)/2,x=m[0].y):(g=m[0].x,x=(R.y+A.y)/2)}let b={x:l.x+h.x,y:l.y+h.y},_={x:u.x+v.x,y:u.y+v.y};return[[e,...b.x!==m[0].x||b.y!==m[0].y?[b]:[],...m,..._.x!==m[m.length-1].x||_.y!==m[m.length-1].y?[_]:[],t],g,x,y,w]}function xA(e,n,t,o){let r=Math.min(TS(e,n)/2,TS(n,t)/2,o),{x:i,y:a}=n;if(e.x===i&&i===t.x||e.y===a&&a===t.y)return`L${i} ${a}`;if(e.y===a){let l=e.x<t.x?-1:1,u=e.y<t.y?1:-1;return`L ${i+r*l},${a}Q ${i},${a} ${i},${a+r*u}`}let s=e.x<t.x?1:-1,c=e.y<t.y?-1:1;return`L ${i},${a+r*c}Q ${i},${a} ${i+r*s},${a}`}function Qc({sourceX:e,sourceY:n,sourcePosition:t=K.Bottom,targetX:o,targetY:r,targetPosition:i=K.Top,borderRadius:a=5,centerX:s,centerY:c,offset:l=20,stepPosition:u=.5}){let[f,d,p,m,g]=vA({source:{x:e,y:n},sourcePosition:t,target:{x:o,y:r},targetPosition:i,center:{x:s,y:c},offset:l,stepPosition:u}),x=`M${f[0].x} ${f[0].y}`;for(let h=1;h<f.length-1;h++)x+=xA(f[h-1],f[h],f[h+1],a);return x+=`L${f[f.length-1].x} ${f[f.length-1].y}`,[x,d,p,m,g]}function qS(e){return e&&!!(e.internals.handleBounds||e.handles?.length)&&!!(e.measured.width||e.width||e.initialWidth)}function XS(e){let{sourceNode:n,targetNode:t}=e;if(!qS(n)||!qS(t))return null;let o=n.internals.handleBounds||RS(n.handles),r=t.internals.handleBounds||RS(t.handles),i=MS(o?.source??[],e.sourceHandle),a=MS(e.connectionMode===Er.Strict?r?.target??[]:(r?.target??[]).concat(r?.source??[]),e.targetHandle);if(!i||!a)return e.onError?.("008",at.error008(i?"target":"source",{id:e.id,sourceHandle:e.sourceHandle,targetHandle:e.targetHandle})),null;let s=i?.position||K.Bottom,c=a?.position||K.Top,l=Cr(n,i,s),u=Cr(t,a,c);return{sourceX:l.x,sourceY:l.y,targetX:u.x,targetY:u.y,sourcePosition:s,targetPosition:c}}function RS(e){if(!e)return null;let n=[],t=[];for(let o of e)o.width=o.width??1,o.height=o.height??1,o.type==="source"?n.push(o):o.type==="target"&&t.push(o);return{source:n,target:t}}function Cr(e,n,t=K.Left,o=!1){let r=(n?.x??0)+e.internals.positionAbsolute.x,i=(n?.y??0)+e.internals.positionAbsolute.y,{width:a,height:s}=n??St(e);if(o)return{x:r+a/2,y:i+s/2};switch(n?.position??t){case K.Top:return{x:r+a/2,y:i};case K.Right:return{x:r+a,y:i+s/2};case K.Bottom:return{x:r+a/2,y:i+s};case K.Left:return{x:r,y:i+s/2}}}function MS(e,n){return e&&(n?e.find(t=>t.id===n):e[0])||null}function Kd(e,n){return e?typeof e=="string"?e:`${n?`${n}__`:""}${Object.keys(e).sort().map(o=>`${o}=${e[o]}`).join("&")}`:""}function KS(e,{id:n,defaultColor:t,defaultMarkerStart:o,defaultMarkerEnd:r}){let i=new Set;return e.reduce((a,s)=>([s.markerStart||o,s.markerEnd||r].forEach(c=>{if(c&&typeof c=="object"){let l=Kd(c,n);i.has(l)||(a.push({id:l,color:c.color||t,...c}),i.add(l))}}),a),[]).sort((a,s)=>a.id.localeCompare(s.id))}var ZS=1e3,wA=10,Ey={nodeOrigin:[0,0],nodeExtent:$a,elevateNodesOnSelect:!0,zIndexMode:"basic",defaults:{}},bA={...Ey,checkEquality:!0};function Cy(e,n){let t={...e};for(let o in n)n[o]!==void 0&&(t[o]=n[o]);return t}function QS(e,n,t){let o=Cy(Ey,t);for(let r of e.values())if(r.parentId)qy(r,e,n,o);else{let i=Xc(r,o.nodeOrigin),a=qi(r.extent)?r.extent:o.nodeExtent,s=Ci(i,a,St(r));r.internals.positionAbsolute=s}}function kA(e,n){if(!e.handles)return e.measured?n?.internals.handleBounds:void 0;let t=[],o=[];for(let r of e.handles){let i={id:r.id,width:r.width??1,height:r.height??1,nodeId:e.id,x:r.x,y:r.y,position:r.position,type:r.type};r.type==="source"?t.push(i):r.type==="target"&&o.push(i)}return{source:t,target:o}}function Ty(e){return e==="manual"}function Zd(e,n,t,o={}){let r=Cy(bA,o),i={i:0},a=new Map(n),s=r?.elevateNodesOnSelect&&!Ty(r.zIndexMode)?ZS:0,c=e.length>0,l=!1;n.clear(),t.clear();for(let u of e){let f=a.get(u.id);if(r.checkEquality&&u===f?.internals.userNode)n.set(u.id,f);else{let d=Xc(u,r.nodeOrigin),p=qi(u.extent)?u.extent:r.nodeExtent,m=Ci(d,p,St(u));f={...r.defaults,...u,measured:{width:u.measured?.width,height:u.measured?.height},internals:{positionAbsolute:m,handleBounds:kA(u,f),z:WS(u,s,r.zIndexMode),userNode:u}},n.set(u.id,f)}(f.measured===void 0||f.measured.width===void 0||f.measured.height===void 0)&&!f.hidden&&(c=!1),u.parentId&&qy(f,n,t,o,i),l||=u.selected??!1}return{nodesInitialized:c,hasSelectedNodes:l}}function SA(e,n){if(!e.parentId)return;let t=n.get(e.parentId);t?t.set(e.id,e):n.set(e.parentId,new Map([[e.id,e]]))}function qy(e,n,t,o,r){let{elevateNodesOnSelect:i,nodeOrigin:a,nodeExtent:s,zIndexMode:c}=Cy(Ey,o),l=e.parentId,u=n.get(l);if(!u){console.warn(`Parent node ${l} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);return}SA(e,t),r&&!u.parentId&&u.internals.rootParentIndex===void 0&&c==="auto"&&(u.internals.rootParentIndex=++r.i,u.internals.z=u.internals.z+r.i*wA),r&&u.internals.rootParentIndex!==void 0&&(r.i=u.internals.rootParentIndex);let f=i&&!Ty(c)?ZS:0,{x:d,y:p,z:m}=_A(e,u,a,s,f,c),{positionAbsolute:g}=e.internals,x=d!==g.x||p!==g.y;(x||m!==e.internals.z)&&n.set(e.id,{...e,internals:{...e.internals,positionAbsolute:x?{x:d,y:p}:g,z:m}})}function WS(e,n,t){let o=bt(e.zIndex)?e.zIndex:0;return Ty(t)?o:o+(e.selected?n:0)}function _A(e,n,t,o,r,i){let{x:a,y:s}=n.internals.positionAbsolute,c=St(e),l=Xc(e,t),u=qi(e.extent)?Ci(l,e.extent,c):l,f=Ci({x:a+u.x,y:s+u.y},o,c);e.extent==="parent"&&(f=jS(f,c,n));let d=WS(e,r,i),p=n.internals.z??0;return{x:f.x,y:f.y,z:p>=d?p+1:d}}function Qd(e,n,t,o=[0,0]){let r=[],i=new Map;for(let a of e){let s=n.get(a.parentId);if(!s)continue;let c=i.get(a.parentId)?.expandedRect??es(s),l=hy(c,a.rect);i.set(a.parentId,{expandedRect:l,parent:s})}return i.size>0&&i.forEach(({expandedRect:a,parent:s},c)=>{let l=s.internals.positionAbsolute,u=St(s),f=s.origin??o,d=a.x<l.x?Math.round(Math.abs(l.x-a.x)):0,p=a.y<l.y?Math.round(Math.abs(l.y-a.y)):0,m=Math.max(u.width,Math.round(a.width)),g=Math.max(u.height,Math.round(a.height)),x=(m-u.width)*f[0],h=(g-u.height)*f[1];(d>0||p>0||x||h)&&(r.push({id:c,type:"position",position:{x:s.position.x-d+x,y:s.position.y-p+h}}),t.get(c)?.forEach(v=>{e.some(y=>y.id===v.id)||r.push({id:v.id,type:"position",position:{x:v.position.x+d,y:v.position.y+p}})})),(u.width<a.width||u.height<a.height||d||p)&&r.push({id:c,type:"dimensions",setAttributes:!0,dimensions:{width:m+(d?f[0]*d-x:0),height:g+(p?f[1]*p-h:0)}})}),r}function $S(e,n,t,o,r,i,a){let s=o?.querySelector(".xyflow__viewport"),c=!1;if(!s)return{changes:[],updatedInternals:c};let l=[],u=window.getComputedStyle(s),{m22:f}=new window.DOMMatrixReadOnly(u.transform),d=[];for(let p of e.values()){let m=n.get(p.id);if(!m)continue;if(m.hidden){n.set(m.id,{...m,internals:{...m.internals,handleBounds:void 0}}),c=!0;continue}let g=Fd(p.nodeElement),x=m.measured.width!==g.width||m.measured.height!==g.height;if(!!(g.width&&g.height&&(x||!m.internals.handleBounds||p.force))){let v=p.nodeElement.getBoundingClientRect(),y=qi(m.extent)?m.extent:i,{positionAbsolute:w}=m.internals;if(m.parentId&&m.extent==="parent"){let _=n.get(m.parentId);_&&(w=jS(w,g,_))}else y&&(w=Ci(w,y,g));let b={...m,measured:g,internals:{...m.internals,positionAbsolute:w,handleBounds:{source:DS("source",p.nodeElement,v,f,m.id),target:DS("target",p.nodeElement,v,f,m.id)}}};n.set(m.id,b),m.parentId&&qy(b,n,t,{nodeOrigin:r,zIndexMode:a}),c=!0,x&&(l.push({id:m.id,type:"dimensions",dimensions:g}),m.expandParent&&m.parentId&&d.push({id:m.id,parentId:m.parentId,rect:es(b,r)}))}}if(d.length>0){let p=Qd(d,n,t,r);l.push(...p)}return{changes:l,updatedInternals:c}}async function JS({delta:e,panZoom:n,transform:t,translateExtent:o,width:r,height:i}){if(!n||!e.x&&!e.y)return!1;let a=await n.setViewportConstrained({x:t[0]+e.x,y:t[1]+e.y,zoom:t[2]},[[0,0],[r,i]],o);return!!a&&(a.x!==t[0]||a.y!==t[1]||a.k!==t[2])}function AS(e,n,t,o,r,i){let a=r,s=o.get(a)||new Map;o.set(a,s.set(t,n)),a=`${r}-${e}`;let c=o.get(a)||new Map;if(o.set(a,c.set(t,n)),i){a=`${r}-${e}-${i}`;let l=o.get(a)||new Map;o.set(a,l.set(t,n))}}function Ry(e,n,t){e.clear(),n.clear();for(let o of t){let{source:r,target:i,sourceHandle:a=null,targetHandle:s=null}=o,c={edgeId:o.id,source:r,target:i,sourceHandle:a,targetHandle:s},l=`${r}-${a}--${i}-${s}`,u=`${i}-${s}--${r}-${a}`;AS("source",c,u,e,r,a),AS("target",c,l,e,i,s),n.set(o.id,o)}}function e_(e,n){if(!e.parentId)return!1;let t=n.get(e.parentId);return t?t.selected?!0:e_(t,n):!1}function NS(e,n,t){let o=e;do{if(o?.matches?.(n))return!0;if(o===t)return!1;o=o?.parentElement}while(o);return!1}function DA(e,n,t,o){let r=new Map;for(let[i,a]of e)if((a.selected||a.id===o)&&(!a.parentId||!e_(a,e))&&(a.draggable||n&&typeof a.draggable>"u")){let s=e.get(i);s&&r.set(i,{id:i,position:s.position||{x:0,y:0},distance:{x:t.x-s.internals.positionAbsolute.x,y:t.y-s.internals.positionAbsolute.y},extent:s.extent,parentId:s.parentId,origin:s.origin,expandParent:s.expandParent,internals:{positionAbsolute:s.internals.positionAbsolute||{x:0,y:0}},measured:{width:s.measured.width??0,height:s.measured.height??0}})}return r}function ry({nodeId:e,dragItems:n,nodeLookup:t,dragging:o=!0}){let r=[];for(let[a,s]of n){let c=t.get(a)?.internals.userNode;c&&r.push({...c,position:s.position,dragging:o})}if(!e)return[r[0],r];let i=t.get(e)?.internals.userNode;return[i?{...i,position:n.get(e)?.position||i.position,dragging:o}:r[0],r]}function EA({dragItems:e,snapGrid:n,x:t,y:o}){let r=e.values().next().value;if(!r)return null;let i={x:t-r.distance.x,y:o-r.distance.y},a=ns(i,n);return{x:a.x-i.x,y:a.y-i.y}}function n_({onNodeMouseDown:e,getStoreItems:n,onDragStart:t,onDrag:o,onDragStop:r}){let i={x:null,y:null},a=0,s=new Map,c=!1,l={x:0,y:0},u=null,f=!1,d=null,p=!1,m=!1,g=null;function x({noDragClassName:v,handleSelector:y,domNode:w,isSelectable:b,nodeId:_,nodeClickDistance:k=0}){d=sn(w);function D({x:P,y:I}){let{nodeLookup:C,nodeExtent:T,snapGrid:q,snapToGrid:M,nodeOrigin:N,onNodeDrag:O,onSelectionDrag:V,onError:H,updateNodePositions:U}=n();i={x:P,y:I};let Y=!1,F=s.size>1,G=F&&T?sy(Ja(s)):null,oe=F&&M?EA({dragItems:s,snapGrid:q,x:P,y:I}):null;for(let[W,j]of s){if(!C.has(W))continue;let X={x:P-j.distance.x,y:I-j.distance.y};M&&(X=oe?{x:Math.round(X.x+oe.x),y:Math.round(X.y+oe.y)}:ns(X,q));let Z=null;if(F&&T&&!j.extent&&G){let{positionAbsolute:J}=j.internals,ie=J.x-G.x+T[0][0],fe=J.x+j.measured.width-G.x2+T[1][0],we=J.y-G.y+T[0][1],cn=J.y+j.measured.height-G.y2+T[1][1];Z=[[ie,we],[fe,cn]]}let{position:ne,positionAbsolute:Q}=my({nodeId:W,nextPosition:X,nodeLookup:C,nodeExtent:Z||T,nodeOrigin:N,onError:H});Y=Y||j.position.x!==ne.x||j.position.y!==ne.y,j.position=ne,j.internals.positionAbsolute=Q}if(m=m||Y,!!Y&&(U(s,!0),g&&(o||O||!_&&V))){let[W,j]=ry({nodeId:_,dragItems:s,nodeLookup:C});o?.(g,s,W,j),O?.(g,W,j),_||V?.(g,j)}}async function E(){if(!u)return;let{transform:P,panBy:I,autoPanSpeed:C,autoPanOnNodeDrag:T}=n();if(!T){c=!1,cancelAnimationFrame(a);return}let[q,M]=Hd(l,u,C);(q!==0||M!==0)&&(i.x=(i.x??0)-q/P[2],i.y=(i.y??0)-M/P[2],await I({x:q,y:M})&&D(i)),a=requestAnimationFrame(E)}function R(P){let{nodeLookup:I,multiSelectionActive:C,nodesDraggable:T,transform:q,snapGrid:M,snapToGrid:N,selectNodesOnDrag:O,onNodeDragStart:V,onSelectionDragStart:H,unselectNodesAndEdges:U}=n();f=!0,(!O||!b)&&!C&&_&&(I.get(_)?.selected||U()),b&&O&&_&&e?.(_);let Y=Gc(P.sourceEvent,{transform:q,snapGrid:M,snapToGrid:N,containerBounds:u});if(i=Y,s=DA(I,T,Y,_),s.size>0&&(t||V||!_&&H)){let[F,G]=ry({nodeId:_,dragItems:s,nodeLookup:I});t?.(P.sourceEvent,s,F,G),V?.(P.sourceEvent,F,G),_||H?.(P.sourceEvent,G)}}let A=hd().clickDistance(k).on("start",P=>{let{domNode:I,nodeDragThreshold:C,transform:T,snapGrid:q,snapToGrid:M}=n();u=I?.getBoundingClientRect()||null,p=!1,m=!1,g=P.sourceEvent,C===0&&R(P),i=Gc(P.sourceEvent,{transform:T,snapGrid:q,snapToGrid:M,containerBounds:u}),l=kt(P.sourceEvent,u)}).on("drag",P=>{let{autoPanOnNodeDrag:I,transform:C,snapGrid:T,snapToGrid:q,nodeDragThreshold:M,nodeLookup:N}=n(),O=Gc(P.sourceEvent,{transform:C,snapGrid:T,snapToGrid:q,containerBounds:u});if(g=P.sourceEvent,(P.sourceEvent.type==="touchmove"&&P.sourceEvent.touches.length>1||_&&!N.has(_))&&(p=!0),!p){if(!c&&I&&f&&(c=!0,E()),!f){let V=kt(P.sourceEvent,u),H=V.x-l.x,U=V.y-l.y;Math.sqrt(H*H+U*U)>M&&R(P)}(i.x!==O.xSnapped||i.y!==O.ySnapped)&&s&&f&&(l=kt(P.sourceEvent,u),D(O))}}).on("end",P=>{if(!f||p){p&&s.size>0&&n().updateNodePositions(s,!1);return}if(c=!1,f=!1,cancelAnimationFrame(a),s.size>0){let{nodeLookup:I,updateNodePositions:C,onNodeDragStop:T,onSelectionDragStop:q}=n();if(m&&(C(s,!1),m=!1),r||T||!_&&q){let[M,N]=ry({nodeId:_,dragItems:s,nodeLookup:I,dragging:!1});r?.(P.sourceEvent,s,M,N),T?.(P.sourceEvent,M,N),_||q?.(P.sourceEvent,N)}}}).filter(P=>{let I=P.target;return!P.button&&(!v||!NS(I,`.${v}`,w))&&(!y||NS(I,y,w))});d.call(A)}function h(){d?.on(".drag",null)}return{update:x,destroy:h}}function CA(e,n,t){let o=[],r={x:e.x-t,y:e.y-t,width:t*2,height:t*2};for(let i of n.values())Kc(r,es(i))>0&&o.push(i);return o}var TA=250;function qA(e,n,t,o){let r=[],i=1/0,a=CA(e,t,n+TA);for(let s of a){let c=[...s.internals.handleBounds?.source??[],...s.internals.handleBounds?.target??[]];for(let l of c){if(o.nodeId===l.nodeId&&o.type===l.type&&o.id===l.id)continue;let{x:u,y:f}=Cr(s,l,l.position,!0),d=Math.sqrt(Math.pow(u-e.x,2)+Math.pow(f-e.y,2));d>n||(d<i?(r=[{...l,x:u,y:f}],i=d):d===i&&r.push({...l,x:u,y:f}))}}if(!r.length)return null;if(r.length>1){let s=o.type==="source"?"target":"source";return r.find(c=>c.type===s)??r[0]}return r[0]}function t_(e,n,t,o,r,i=!1){let a=o.get(e);if(!a)return null;let s=r==="strict"?a.internals.handleBounds?.[n]:[...a.internals.handleBounds?.source??[],...a.internals.handleBounds?.target??[]],c=(t?s?.find(l=>l.id===t):s?.[0])??null;return c&&i?{...c,...Cr(a,c,c.position,!0)}:c}function o_(e,n){return e||(n?.classList.contains("target")?"target":n?.classList.contains("source")?"source":null)}function RA(e,n){let t=null;return n?t=!0:e&&!n&&(t=!1),t}var r_=()=>!0;function MA(e,{connectionMode:n,connectionRadius:t,handleId:o,nodeId:r,edgeUpdaterType:i,isTarget:a,domNode:s,nodeLookup:c,lib:l,autoPanOnConnect:u,flowId:f,panBy:d,cancelConnection:p,onConnectStart:m,onConnect:g,onConnectEnd:x,isValidConnection:h=r_,onReconnectEnd:v,updateConnection:y,getTransform:w,getFromHandle:b,autoPanSpeed:_,dragThreshold:k=1,handleDomNode:D}){let E=ky(e.target),R=0,A,{x:P,y:I}=kt(e),C=o_(i,D),T=s?.getBoundingClientRect(),q=!1;if(!T||!C)return;let M=t_(r,C,o,c,n);if(!M)return;let N=kt(e,T),O=!1,V=null,H=!1,U=null;function Y(){if(!u||!T)return;let[ne,Q]=Hd(N,T,_);d({x:ne,y:Q}),R=requestAnimationFrame(Y)}let F={...M,nodeId:r,type:C,position:M.position},G=c.get(r),W={inProgress:!0,isValid:null,from:Cr(G,F,K.Left,!0),fromHandle:F,fromPosition:F.position,fromNode:G,to:N,toHandle:null,toPosition:SS[F.position],toNode:null,pointer:N};function j(){q=!0,y(W),m?.(e,{nodeId:r,handleId:o,handleType:C})}k===0&&j();function X(ne){if(!q){let{x:cn,y:lo}=kt(ne),jt=cn-P,Ht=lo-I;if(!(jt*jt+Ht*Ht>k*k))return;j()}if(!b()||!F){Z(ne);return}let Q=w();N=kt(ne,T),A=qA(ts(N,Q,!1,[1,1]),t,c,F),O||(Y(),O=!0);let J=i_(ne,{handle:A,connectionMode:n,fromNodeId:r,fromHandleId:o,fromType:a?"target":"source",isValidConnection:h,doc:E,lib:l,flowId:f,nodeLookup:c});U=J.handleDomNode,V=J.connection,H=RA(!!A,J.isValid);let ie=c.get(r),fe=ie?Cr(ie,F,K.Left,!0):W.from,we={...W,from:fe,isValid:H,to:J.toHandle&&H?Ti({x:J.toHandle.x,y:J.toHandle.y},Q):N,toHandle:J.toHandle,toPosition:H&&J.toHandle?J.toHandle.position:SS[F.position],toNode:J.toHandle?c.get(J.toHandle.nodeId):null,pointer:N};y(we),W=we}function Z(ne){if(!("touches"in ne&&ne.touches.length>0)){if(q){(A||U)&&V&&H&&g?.(V);let{inProgress:Q,...J}=W,ie={...J,toPosition:W.toHandle?W.toPosition:null};x?.(ne,ie),i&&v?.(ne,ie)}p(),cancelAnimationFrame(R),O=!1,H=!1,V=null,U=null,E.removeEventListener("mousemove",X),E.removeEventListener("mouseup",Z),E.removeEventListener("touchmove",X),E.removeEventListener("touchend",Z)}}E.addEventListener("mousemove",X),E.addEventListener("mouseup",Z),E.addEventListener("touchmove",X),E.addEventListener("touchend",Z)}function i_(e,{handle:n,connectionMode:t,fromNodeId:o,fromHandleId:r,fromType:i,doc:a,lib:s,flowId:c,isValidConnection:l=r_,nodeLookup:u}){let f=i==="target",d=n?a.querySelector(`.${s}-flow__handle[data-id="${c}-${n?.nodeId}-${n?.id}-${n?.type}"]`):null,{x:p,y:m}=kt(e),g=a.elementFromPoint(p,m),x=g?.classList.contains(`${s}-flow__handle`)?g:d,h={handleDomNode:x,isValid:!1,connection:null,toHandle:null};if(x){let v=o_(void 0,x),y=x.getAttribute("data-nodeid"),w=x.getAttribute("data-handleid"),b=x.classList.contains("connectable"),_=x.classList.contains("connectableend");if(!y||!v)return h;let k={source:f?y:o,sourceHandle:f?w:r,target:f?o:y,targetHandle:f?r:w};h.connection=k;let E=b&&_&&(t===Er.Strict?f&&v==="source"||!f&&v==="target":y!==o||w!==r);h.isValid=E&&l(k),h.toHandle=t_(y,v,w,u,t,!0)}return h}var Wd={onPointerDown:MA,isValid:i_};function a_({domNode:e,panZoom:n,getTransform:t,getViewScale:o}){let r=sn(e);function i({translateExtent:s,width:c,height:l,zoomStep:u=1,pannable:f=!0,zoomable:d=!0,inversePan:p=!1}){let m=y=>{if(y.sourceEvent.type!=="wheel"||!n)return;let w=t(),b=y.sourceEvent.ctrlKey&&os()?10:1,_=-y.sourceEvent.deltaY*(y.sourceEvent.deltaMode===1?.05:y.sourceEvent.deltaMode?1:.002)*u,k=w[2]*Math.pow(2,_*b);n.scaleTo(k)},g=[0,0],x=y=>{(y.sourceEvent.type==="mousedown"||y.sourceEvent.type==="touchstart")&&(g=[y.sourceEvent.clientX??y.sourceEvent.touches[0].clientX,y.sourceEvent.clientY??y.sourceEvent.touches[0].clientY])},h=y=>{let w=t();if(y.sourceEvent.type!=="mousemove"&&y.sourceEvent.type!=="touchmove"||!n)return;let b=[y.sourceEvent.clientX??y.sourceEvent.touches[0].clientX,y.sourceEvent.clientY??y.sourceEvent.touches[0].clientY],_=[b[0]-g[0],b[1]-g[1]];g=b;let k=o()*Math.max(w[2],Math.log(w[2]))*(p?-1:1),D={x:w[0]-_[0]*k,y:w[1]-_[1]*k},E=[[0,0],[c,l]];n.setViewportConstrained({x:D.x,y:D.y,zoom:w[2]},E,s)},v=zd().on("start",x).on("zoom",f?h:null).on("zoom.wheel",d?m:null);r.call(v,{})}function a(){r.on("zoom",null)}return{update:i,destroy:a,pointer:Rn}}var $d=e=>({x:e.x,y:e.y,zoom:e.k}),iy=({x:e,y:n,zoom:t})=>Di.translate(e,n).scale(t),Dr=(e,n)=>e.target.closest(`.${n}`),s_=(e,n)=>n===2&&Array.isArray(e)&&e.includes(2),AA=e=>((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2,ay=(e,n=0,t=AA,o=()=>{})=>{let r=typeof n=="number"&&n>0;return r||o(),r?e.transition().duration(n).ease(t).on("end",o):e},c_=e=>{let n=e.ctrlKey&&os()?10:1;return-e.deltaY*(e.deltaMode===1?.05:e.deltaMode?1:.002)*n};function NA({zoomPanValues:e,noWheelClassName:n,d3Selection:t,d3Zoom:o,panOnScrollMode:r,panOnScrollSpeed:i,zoomOnPinch:a,onPanZoomStart:s,onPanZoom:c,onPanZoomEnd:l}){return u=>{if(Dr(u,n))return u.ctrlKey&&u.preventDefault(),!1;u.preventDefault(),u.stopImmediatePropagation();let f=t.property("__zoom").k||1;if(u.ctrlKey&&a){let x=Rn(u),h=c_(u),v=f*Math.pow(2,h);o.scaleTo(t,v,x,u);return}let d=u.deltaMode===1?20:1,p=r===Io.Vertical?0:u.deltaX*d,m=r===Io.Horizontal?0:u.deltaY*d;!os()&&u.shiftKey&&r!==Io.Vertical&&(p=u.deltaY*d,m=0),o.translateBy(t,-(p/f)*i,-(m/f)*i,{internal:!0});let g=$d(t.property("__zoom"));clearTimeout(e.panScrollTimeout),e.isPanScrolling?c?.(u,g):(e.isPanScrolling=!0,s?.(u,g)),e.panScrollTimeout=setTimeout(()=>{l?.(u,g),e.isPanScrolling=!1},150)}}function IA({noWheelClassName:e,preventScrolling:n,d3ZoomHandler:t}){return function(o,r){let i=o.type==="wheel",a=!n&&i&&!o.ctrlKey,s=Dr(o,e);if(o.ctrlKey&&i&&s&&o.preventDefault(),a||s)return null;o.preventDefault(),t.call(this,o,r)}}function OA({zoomPanValues:e,onDraggingChange:n,onPanZoomStart:t}){return o=>{if(o.sourceEvent?.internal)return;let r=$d(o.transform);e.mouseButton=o.sourceEvent?.button||0,e.isZoomingOrPanning=!0,e.prevViewport=r,o.sourceEvent?.type==="mousedown"&&n(!0),t&&t?.(o.sourceEvent,r)}}function zA({zoomPanValues:e,panOnDrag:n,onPaneContextMenu:t,onTransformChange:o,onPanZoom:r}){return i=>{e.usedRightMouseButton=!!(t&&s_(n,e.mouseButton??0)),i.sourceEvent?.sync||o([i.transform.x,i.transform.y,i.transform.k]),r&&!i.sourceEvent?.internal&&r?.(i.sourceEvent,$d(i.transform))}}function BA({zoomPanValues:e,panOnDrag:n,panOnScroll:t,onDraggingChange:o,onPanZoomEnd:r,onPaneContextMenu:i}){return a=>{if(!a.sourceEvent?.internal&&(e.isZoomingOrPanning=!1,i&&s_(n,e.mouseButton??0)&&!e.usedRightMouseButton&&a.sourceEvent&&i(a.sourceEvent),e.usedRightMouseButton=!1,o(!1),r)){let s=$d(a.transform);e.prevViewport=s,clearTimeout(e.timerId),e.timerId=setTimeout(()=>{r?.(a.sourceEvent,s)},t?150:0)}}}function PA({panActivationKeyPressed:e,zoomActivationKeyPressed:n,zoomOnScroll:t,zoomOnPinch:o,panOnDrag:r,panOnScroll:i,zoomOnDoubleClick:a,userSelectionActive:s,noWheelClassName:c,noPanClassName:l,lib:u,connectionInProgress:f}){return d=>{let p=n||t,m=o&&d.ctrlKey,g=d.type==="wheel";if(d.button===1&&d.type==="mousedown"&&(Dr(d,`${u}-flow__node`)||Dr(d,`${u}-flow__edge`)||Dr(d,`${u}-flow__selection`)||Dr(d,`${u}-flow__nodesselection`)))return!0;if(!r&&!p&&!i&&!a&&!o||s||f&&!g||Dr(d,c)&&g||Dr(d,l)&&(!g||i&&g&&!n)||!o&&d.ctrlKey&&g)return!1;if(!o&&d.type==="touchstart"&&d.touches?.length>1)return d.preventDefault(),!1;if(!p&&!i&&!m&&g||!r&&(d.type==="mousedown"||d.type==="touchstart")||Array.isArray(r)&&!r.includes(d.button)&&d.type==="mousedown")return!1;let x=Array.isArray(r)&&r.includes(d.button)||!d.button||d.button<=1;return(!d.ctrlKey||g||e)&&x}}function l_({domNode:e,minZoom:n,maxZoom:t,translateExtent:o,viewport:r,onPanZoom:i,onPanZoomStart:a,onPanZoomEnd:s,onDraggingChange:c}){let l={isZoomingOrPanning:!1,usedRightMouseButton:!1,prevViewport:{},mouseButton:0,timerId:void 0,panScrollTimeout:void 0,isPanScrolling:!1},u=e.getBoundingClientRect(),f=[[0,0],[u.width,u.height]];(typeof ResizeObserver<"u"?new ResizeObserver(I=>{let C=I[0];C&&(f=[[0,0],[C.contentRect.width,C.contentRect.height]])}):null)?.observe(e);let p=zd().extent(()=>f).scaleExtent([n,t]).translateExtent(o),m=sn(e).call(p);w({x:r.x,y:r.y,zoom:Wa(r.zoom,n,t)},[[0,0],[u.width,u.height]],o);let g=m.on("wheel.zoom"),x=m.on("dblclick.zoom");p.wheelDelta(c_);async function h(I,C){return m?new Promise(T=>{p?.interpolate(C?.interpolate==="linear"?Ao:ki).transform(ay(m,C?.duration,C?.ease,()=>T(!0)),I)}):!1}function v({noWheelClassName:I,noPanClassName:C,onPaneContextMenu:T,userSelectionActive:q,panOnScroll:M,panOnDrag:N,panOnScrollMode:O,panOnScrollSpeed:V,preventScrolling:H,zoomOnPinch:U,zoomOnScroll:Y,zoomOnDoubleClick:F,panActivationKeyPressed:G=!1,zoomActivationKeyPressed:oe,lib:W,onTransformChange:j,connectionInProgress:X,paneClickDistance:Z,selectionOnDrag:ne}){q&&!l.isZoomingOrPanning&&y();let Q=M&&!oe&&!q;p.clickDistance(ne?1/0:!bt(Z)||Z<0?0:Z);let J=Q?NA({zoomPanValues:l,noWheelClassName:I,d3Selection:m,d3Zoom:p,panOnScrollMode:O,panOnScrollSpeed:V,zoomOnPinch:U,onPanZoomStart:a,onPanZoom:i,onPanZoomEnd:s}):IA({noWheelClassName:I,preventScrolling:H,d3ZoomHandler:g});m.on("wheel.zoom",J,{passive:!1});let ie=OA({zoomPanValues:l,onDraggingChange:c,onPanZoomStart:a});p.on("start",ie);let fe=zA({zoomPanValues:l,panOnDrag:N,onPaneContextMenu:!!T,onPanZoom:i,onTransformChange:j});p.on("zoom",fe);let we=BA({zoomPanValues:l,panOnDrag:N,panOnScroll:M,onPaneContextMenu:T,onPanZoomEnd:s,onDraggingChange:c});p.on("end",we);let cn=PA({panActivationKeyPressed:G,zoomActivationKeyPressed:oe,panOnDrag:N,zoomOnScroll:Y,panOnScroll:M,zoomOnDoubleClick:F,zoomOnPinch:U,userSelectionActive:q,noPanClassName:C,noWheelClassName:I,lib:W,connectionInProgress:X});p.filter(cn),F?m.on("dblclick.zoom",x):m.on("dblclick.zoom",null)}function y(){p.on("zoom",null)}async function w(I,C,T){let q=iy(I),M=p?.constrain()(q,C,T);return M&&await h(M),M}async function b(I,C){let T=iy(I);return await h(T,C),T}function _(I){if(m){let C=iy(I),T=m.property("__zoom");(T.k!==I.zoom||T.x!==I.x||T.y!==I.y)&&p?.transform(m,C,null,{sync:!0})}}function k(){let I=m?Yc(m.node()):{x:0,y:0,k:1};return{x:I.x,y:I.y,zoom:I.k}}async function D(I,C){return m?new Promise(T=>{p?.interpolate(C?.interpolate==="linear"?Ao:ki).scaleTo(ay(m,C?.duration,C?.ease,()=>T(!0)),I)}):!1}async function E(I,C){return m?new Promise(T=>{p?.interpolate(C?.interpolate==="linear"?Ao:ki).scaleBy(ay(m,C?.duration,C?.ease,()=>T(!0)),I)}):!1}function R(I){p?.scaleExtent(I)}function A(I){p?.translateExtent(I)}function P(I){let C=!bt(I)||I<0?0:I;p?.clickDistance(C)}return{update:v,destroy:y,setViewport:b,setViewportConstrained:w,getViewport:k,scaleTo:D,scaleBy:E,setScaleExtent:R,setTranslateExtent:A,syncViewport:_,setClickDistance:P}}var Tr;(function(e){e.Line="line",e.Handle="handle"})(Tr||(Tr={}));function LA({width:e,prevWidth:n,height:t,prevHeight:o,affectsX:r,affectsY:i}){let a=e-n,s=t-o,c=[a>0?1:a<0?-1:0,s>0?1:s<0?-1:0];return a&&r&&(c[0]=c[0]*-1),s&&i&&(c[1]=c[1]*-1),c}function IS(e){let n=e.includes("right")||e.includes("left"),t=e.includes("bottom")||e.includes("top"),o=e.includes("left"),r=e.includes("top");return{isHorizontal:n,isVertical:t,affectsX:o,affectsY:r}}function Sr(e,n){return Math.max(0,n-e)}function _r(e,n){return Math.max(0,e-n)}function Pd(e,n,t){return Math.max(0,n-e,e-t)}function OS(e,n){return e?!n:n}function jA(e,n,t,o,r,i,a,s){let{affectsX:c,affectsY:l}=n,{isHorizontal:u,isVertical:f}=n,d=u&&f,{xSnapped:p,ySnapped:m}=t,{minWidth:g,maxWidth:x,minHeight:h,maxHeight:v}=o,{x:y,y:w,width:b,height:_,aspectRatio:k}=e,D=Math.floor(u?p-e.pointerX:0),E=Math.floor(f?m-e.pointerY:0),R=b+(c?-D:D),A=_+(l?-E:E),P=-i[0]*b,I=-i[1]*_,C=Pd(R,g,x),T=Pd(A,h,v);if(a){let N=0,O=0;c&&D<0?N=Sr(y+D+P,a[0][0]):!c&&D>0&&(N=_r(y+R+P,a[1][0])),l&&E<0?O=Sr(w+E+I,a[0][1]):!l&&E>0&&(O=_r(w+A+I,a[1][1])),C=Math.max(C,N),T=Math.max(T,O)}if(s){let N=0,O=0;c&&D>0?N=_r(y+D,s[0][0]):!c&&D<0&&(N=Sr(y+R,s[1][0])),l&&E>0?O=_r(w+E,s[0][1]):!l&&E<0&&(O=Sr(w+A,s[1][1])),C=Math.max(C,N),T=Math.max(T,O)}if(r){if(u){let N=Pd(R/k,h,v)*k;if(C=Math.max(C,N),a){let O=0;!c&&!l||c&&!l&&d?O=_r(w+I+R/k,a[1][1])*k:O=Sr(w+I+(c?D:-D)/k,a[0][1])*k,C=Math.max(C,O)}if(s){let O=0;!c&&!l||c&&!l&&d?O=Sr(w+R/k,s[1][1])*k:O=_r(w+(c?D:-D)/k,s[0][1])*k,C=Math.max(C,O)}}if(f){let N=Pd(A*k,g,x)/k;if(T=Math.max(T,N),a){let O=0;!c&&!l||l&&!c&&d?O=_r(y+A*k+P,a[1][0])/k:O=Sr(y+(l?E:-E)*k+P,a[0][0])/k,T=Math.max(T,O)}if(s){let O=0;!c&&!l||l&&!c&&d?O=Sr(y+A*k,s[1][0])/k:O=_r(y+(l?E:-E)*k,s[0][0])/k,T=Math.max(T,O)}}}E=E+(E<0?T:-T),D=D+(D<0?C:-C),r&&(d?R>A*k?E=(OS(c,l)?-D:D)/k:D=(OS(c,l)?-E:E)*k:u?(E=D/k,l=c):(D=E*k,c=l));let q=c?y+D:y,M=l?w+E:w;return{width:b+(c?-D:D),height:_+(l?-E:E),x:i[0]*D*(c?-1:1)+q,y:i[1]*E*(l?-1:1)+M}}var u_={width:0,height:0,x:0,y:0},HA={...u_,pointerX:0,pointerY:0,aspectRatio:1};function VA(e,n,t){let o=n.position.x+e.position.x,r=n.position.y+e.position.y,i=e.measured.width??0,a=e.measured.height??0,s=t[0]*i,c=t[1]*a;return[[o-s,r-c],[o+i-s,r+a-c]]}function d_({domNode:e,nodeId:n,getStoreItems:t,onChange:o,onEnd:r}){let i=sn(e),a={controlDirection:IS("bottom-right"),boundaries:{minWidth:0,minHeight:0,maxWidth:Number.MAX_VALUE,maxHeight:Number.MAX_VALUE},resizeDirection:void 0,keepAspectRatio:!1};function s({controlPosition:l,boundaries:u,keepAspectRatio:f,resizeDirection:d,onResizeStart:p,onResize:m,onResizeEnd:g,shouldResize:x}){let h={...u_},v={...HA};a={boundaries:u,resizeDirection:d,keepAspectRatio:f,controlDirection:IS(l)};let y,w=null,b=[],_,k,D,E=!1,R=hd().on("start",A=>{let{nodeLookup:P,transform:I,snapGrid:C,snapToGrid:T,nodeOrigin:q,paneDomNode:M}=t();if(y=P.get(n),!y)return;w=M?.getBoundingClientRect()??null;let{xSnapped:N,ySnapped:O}=Gc(A.sourceEvent,{transform:I,snapGrid:C,snapToGrid:T,containerBounds:w});h={width:y.measured.width??0,height:y.measured.height??0,x:y.position.x??0,y:y.position.y??0},v={...h,pointerX:N,pointerY:O,aspectRatio:h.width/h.height},_=void 0,k=qi(y.extent)?y.extent:void 0,y.parentId&&(y.extent==="parent"||y.expandParent)&&(_=P.get(y.parentId)),_&&y.extent==="parent"&&(k=[[0,0],[_.measured.width,_.measured.height]]),b=[],D=void 0;for(let[V,H]of P)if(H.parentId===n&&(b.push({id:V,position:{...H.position},extent:H.extent}),H.extent==="parent"||H.expandParent)){let U=VA(H,y,H.origin??q);D?D=[[Math.min(U[0][0],D[0][0]),Math.min(U[0][1],D[0][1])],[Math.max(U[1][0],D[1][0]),Math.max(U[1][1],D[1][1])]]:D=U}p?.(A,{...h})}).on("drag",A=>{let{transform:P,snapGrid:I,snapToGrid:C,nodeOrigin:T}=t(),q=Gc(A.sourceEvent,{transform:P,snapGrid:I,snapToGrid:C,containerBounds:w}),M=[];if(!y)return;let{x:N,y:O,width:V,height:H}=h,U={},Y=y.origin??T,{width:F,height:G,x:oe,y:W}=jA(v,a.controlDirection,q,a.boundaries,a.keepAspectRatio,Y,k,D),j=F!==V,X=G!==H,Z=oe!==N&&j,ne=W!==O&&X;if(!Z&&!ne&&!j&&!X)return;if((Z||ne||Y[0]===1||Y[1]===1)&&(U.x=Z?oe:h.x,U.y=ne?W:h.y,h.x=U.x,h.y=U.y,b.length>0)){let fe=oe-N,we=W-O;for(let cn of b)cn.position={x:cn.position.x-fe+Y[0]*(F-V),y:cn.position.y-we+Y[1]*(G-H)},M.push(cn)}if((j||X)&&(U.width=j&&(!a.resizeDirection||a.resizeDirection==="horizontal")?F:h.width,U.height=X&&(!a.resizeDirection||a.resizeDirection==="vertical")?G:h.height,h.width=U.width,h.height=U.height),_&&y.expandParent){let fe=Y[0]*(U.width??0);U.x&&U.x<fe&&(h.x=fe,v.x=v.x-(U.x-fe));let we=Y[1]*(U.height??0);U.y&&U.y<we&&(h.y=we,v.y=v.y-(U.y-we))}let Q=LA({width:h.width,prevWidth:V,height:h.height,prevHeight:H,affectsX:a.controlDirection.affectsX,affectsY:a.controlDirection.affectsY}),J={...h,direction:Q};x?.(A,J)!==!1&&(E=!0,m?.(A,J),o(U,M))}).on("end",A=>{E&&(g?.(A,{...h}),r?.({...h}),E=!1)});i.call(R)}function c(){i.on(".drag",null)}return{update:s,destroy:c}}var __=Fr(Vo(),1),D_=Fr(x_(),1);var b_={},w_=e=>{let n,t=new Set,o=(u,f)=>{let d=typeof u=="function"?u(n):u;if(!Object.is(d,n)){let p=n;n=f??(typeof d!="object"||d===null)?d:Object.assign({},n,d),t.forEach(m=>m(n,p))}},r=()=>n,c={setState:o,getState:r,getInitialState:()=>l,subscribe:u=>(t.add(u),()=>t.delete(u)),destroy:()=>{(b_.env?b_.env.MODE:void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),t.clear()}},l=n=e(o,r,c);return c},k_=e=>e?w_(e):w_;var{useDebugValue:aN}=__.default,{useSyncExternalStoreWithSelector:sN}=D_.default,cN=e=>e;function Ay(e,n=cN,t){let o=sN(e.subscribe,e.getState,e.getServerState||e.getInitialState,n,t);return aN(o),o}var S_=(e,n)=>{let t=k_(e),o=(r,i=n)=>Ay(t,r,i);return Object.assign(o,t),o},E_=(e,n)=>e?S_(e,n):S_;function Ie(e,n){if(Object.is(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;if(e instanceof Map&&n instanceof Map){if(e.size!==n.size)return!1;for(let[o,r]of e)if(!Object.is(r,n.get(o)))return!1;return!0}if(e instanceof Set&&n instanceof Set){if(e.size!==n.size)return!1;for(let o of e)if(!n.has(o))return!1;return!0}let t=Object.keys(e);if(t.length!==Object.keys(n).length)return!1;for(let o of t)if(!Object.prototype.hasOwnProperty.call(n,o)||!Object.is(e[o],n[o]))return!1;return!0}var lN=Fr(np()),of=(0,B.createContext)(null),uN=of.Provider,J_=at.error001("react");function ue(e,n){let t=(0,B.useContext)(of);if(t===null)throw new Error(J_);return Ay(t,e,n)}function Me(){let e=(0,B.useContext)(of);if(e===null)throw new Error(J_);return(0,B.useMemo)(()=>({getState:e.getState,setState:e.setState,subscribe:e.subscribe}),[e])}var C_={display:"none"},dN={position:"absolute",width:1,height:1,margin:-1,border:0,padding:0,overflow:"hidden",clip:"rect(0px, 0px, 0px, 0px)",clipPath:"inset(100%)"},eD="react-flow__node-desc",nD="react-flow__edge-desc",fN="react-flow__aria-live",pN=e=>e.ariaLiveMessage,mN=e=>e.ariaLabelConfig;function hN({rfId:e}){let n=ue(pN);return(0,z.jsx)("div",{id:`${fN}-${e}`,"aria-live":"assertive","aria-atomic":"true",style:dN,children:n})}function yN({rfId:e,disableKeyboardA11y:n}){let t=ue(mN);return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("div",{id:`${eD}-${e}`,style:C_,children:n?t["node.a11yDescription.default"]:t["node.a11yDescription.keyboardDisabled"]}),(0,z.jsx)("div",{id:`${nD}-${e}`,style:C_,children:t["edge.a11yDescription.default"]}),!n&&(0,z.jsx)(hN,{rfId:e})]})}var rf=(0,B.forwardRef)(({position:e="top-left",children:n,className:t,style:o,...r},i)=>{let a=`${e}`.split("-");return(0,z.jsx)("div",{className:Ve(["react-flow__panel",t,...a]),style:o,ref:i,...r,children:n})});rf.displayName="Panel";var T_="https://reactflow.dev?utm_source=attribution";function gN({proOptions:e,position:n="bottom-right"}){return(0,B.useEffect)(()=>{},[]),e?.hideAttribution?null:(0,z.jsx)(rf,{position:n,className:"react-flow__attribution","data-message":`Please only hide this attribution when you are subscribed to React Flow Pro: ${T_}`,children:(0,z.jsx)("a",{href:T_,target:"_blank",rel:"noopener noreferrer","aria-label":"React Flow attribution",children:"React Flow"})})}var vN=e=>{let n=[],t=[];for(let[,o]of e.nodeLookup)o.selected&&n.push(o.internals.userNode);for(let[,o]of e.edgeLookup)o.selected&&t.push(o);return{selectedNodes:n,selectedEdges:t}},ef=e=>e.id;function xN(e,n){return Ie(e.selectedNodes.map(ef),n.selectedNodes.map(ef))&&Ie(e.selectedEdges.map(ef),n.selectedEdges.map(ef))}function wN({onSelectionChange:e}){let n=Me(),{selectedNodes:t,selectedEdges:o}=ue(vN,xN);return(0,B.useEffect)(()=>{let r={nodes:t,edges:o};e?.(r),n.getState().onSelectionChangeHandlers.forEach(i=>i(r))},[t,o,e]),null}var bN=e=>!!e.onSelectionChangeHandlers;function kN({onSelectionChange:e}){let n=ue(bN);return e||n?(0,z.jsx)(wN,{onSelectionChange:e}):null}var tD=[0,0],SN={x:0,y:0,zoom:1},_N=["nodes","edges","defaultNodes","defaultEdges","onConnect","onConnectStart","onConnectEnd","onClickConnectStart","onClickConnectEnd","nodesDraggable","autoPanOnNodeFocus","nodesConnectable","nodesFocusable","edgesFocusable","edgesReconnectable","elevateNodesOnSelect","elevateEdgesOnSelect","minZoom","maxZoom","nodeExtent","onNodesChange","onEdgesChange","elementsSelectable","connectionMode","snapGrid","snapToGrid","translateExtent","connectOnClick","defaultEdgeOptions","fitView","fitViewOptions","onNodesDelete","onEdgesDelete","onDelete","onNodeDrag","onNodeDragStart","onNodeDragStop","onSelectionDrag","onSelectionDragStart","onSelectionDragStop","onMoveStart","onMove","onMoveEnd","noPanClassName","nodeOrigin","autoPanOnConnect","autoPanOnNodeDrag","onError","connectionRadius","isValidConnection","selectNodesOnDrag","nodeDragThreshold","connectionDragThreshold","onBeforeDelete","debug","autoPanSpeed","ariaLabelConfig","zIndexMode"],q_=[..._N,"rfId"],DN=e=>({setNodes:e.setNodes,setEdges:e.setEdges,setMinZoom:e.setMinZoom,setMaxZoom:e.setMaxZoom,setTranslateExtent:e.setTranslateExtent,setNodeExtent:e.setNodeExtent,reset:e.reset,setDefaultNodesAndEdges:e.setDefaultNodesAndEdges}),R_={translateExtent:$a,nodeOrigin:tD,minZoom:.5,maxZoom:2,elementsSelectable:!0,noPanClassName:"nopan",rfId:"1"};function EN(e){let{setNodes:n,setEdges:t,setMinZoom:o,setMaxZoom:r,setTranslateExtent:i,setNodeExtent:a,reset:s,setDefaultNodesAndEdges:c}=ue(DN,Ie),l=Me();(0,B.useEffect)(()=>(c(e.defaultNodes,e.defaultEdges),()=>{u.current=R_,s()}),[]);let u=(0,B.useRef)(R_);return(0,B.useEffect)(()=>{for(let f of q_){let d=e[f],p=u.current[f];d!==p&&(typeof e[f]>"u"||(f==="nodes"?n(d):f==="edges"?t(d):f==="minZoom"?o(d):f==="maxZoom"?r(d):f==="translateExtent"?i(d):f==="nodeExtent"?a(d):f==="ariaLabelConfig"?l.setState({ariaLabelConfig:US(d)}):f==="fitView"?l.setState({fitViewQueued:d}):f==="fitViewOptions"?l.setState({fitViewOptions:d}):l.setState({[f]:d})))}u.current=e},q_.map(f=>e[f])),null}function M_(){return typeof window>"u"||!window.matchMedia?null:window.matchMedia("(prefers-color-scheme: dark)")}function CN(e){let[n,t]=(0,B.useState)(e==="system"?null:e);return(0,B.useEffect)(()=>{if(e!=="system"){t(e);return}let o=M_(),r=()=>t(o?.matches?"dark":"light");return r(),o?.addEventListener("change",r),()=>{o?.removeEventListener("change",r)}},[e]),n!==null?n:M_()?.matches?"dark":"light"}var A_=typeof document<"u"?document:null;function Wc(e=null,n={target:A_,actInsideInputWithModifier:!0}){let[t,o]=(0,B.useState)(!1),r=(0,B.useRef)(!1),i=(0,B.useRef)(new Set([])),[a,s]=(0,B.useMemo)(()=>{if(e!==null){let l=(Array.isArray(e)?e:[e]).filter(f=>typeof f=="string").map(f=>f.replace(/\+/g,`
`).replace(`

`,`
+`).split(`
`)),u=l.reduce((f,d)=>f.concat(...d),[]);return[l,u]}return[[],[]]},[e]);return(0,B.useEffect)(()=>{let c=n?.target??A_,l=n?.actInsideInputWithModifier??!0;if(e!==null){let u=p=>{if(r.current=p.ctrlKey||p.metaKey||p.shiftKey||p.altKey,(!r.current||r.current&&!l)&&Sy(p))return!1;let g=I_(p.code,s);if(i.current.add(p[g]),N_(a,i.current,!1)){let x=p.composedPath?.()?.[0]||p.target,h=x?.nodeName==="BUTTON"||x?.nodeName==="A";n.preventDefault!==!1&&(r.current||!h)&&p.preventDefault(),o(!0)}},f=p=>{let m=I_(p.code,s);N_(a,i.current,!0)?(o(!1),i.current.clear()):i.current.delete(p[m]),p.key==="Meta"&&i.current.clear(),r.current=!1},d=()=>{i.current.clear(),o(!1)};return c?.addEventListener("keydown",u),c?.addEventListener("keyup",f),window.addEventListener("blur",d),window.addEventListener("contextmenu",d),()=>{c?.removeEventListener("keydown",u),c?.removeEventListener("keyup",f),window.removeEventListener("blur",d),window.removeEventListener("contextmenu",d)}}},[e,o]),t}function N_(e,n,t){return e.filter(o=>t||o.length===n.size).some(o=>o.every(r=>n.has(r)))}function I_(e,n){return n.includes(e)?"code":"key"}var TN=()=>{let e=Me();return(0,B.useMemo)(()=>({zoomIn:async n=>{let{panZoom:t}=e.getState();return t?t.scaleBy(1.2,n):!1},zoomOut:async n=>{let{panZoom:t}=e.getState();return t?t.scaleBy(1/1.2,n):!1},zoomTo:async(n,t)=>{let{panZoom:o}=e.getState();return o?o.scaleTo(n,t):!1},getZoom:()=>e.getState().transform[2],setViewport:async(n,t)=>{let{transform:[o,r,i],panZoom:a}=e.getState();return a?(await a.setViewport({x:n.x??o,y:n.y??r,zoom:n.zoom??i},t),!0):!1},getViewport:()=>{let[n,t,o]=e.getState().transform;return{x:n,y:t,zoom:o}},setCenter:async(n,t,o)=>e.getState().setCenter(n,t,o),fitBounds:async(n,t)=>{let{width:o,height:r,minZoom:i,maxZoom:a,panZoom:s}=e.getState(),c=Zc(n,o,r,i,a,t?.padding??.1);return s?(await s.setViewport(c,{duration:t?.duration,ease:t?.ease,interpolate:t?.interpolate}),!0):!1},screenToFlowPosition:(n,t={})=>{let{transform:o,snapGrid:r,snapToGrid:i,domNode:a}=e.getState();if(!a)return n;let{x:s,y:c}=a.getBoundingClientRect(),l={x:n.x-s,y:n.y-c},u=t.snapGrid??r,f=t.snapToGrid??i;return ts(l,o,f,u)},flowToScreenPosition:n=>{let{transform:t,domNode:o}=e.getState();if(!o)return n;let{x:r,y:i}=o.getBoundingClientRect(),a=Ti(n,t);return{x:a.x+r,y:a.y+i}}}),[])};function oD(e,n){let t=[],o=new Map,r=[];for(let i of e)if(i.type==="add"){r.push(i);continue}else if(i.type==="remove"||i.type==="replace")o.set(i.id,[i]);else{let a=o.get(i.id);a?a.push(i):o.set(i.id,[i])}for(let i of n){let a=o.get(i.id);if(!a){t.push(i);continue}if(a[0].type==="remove")continue;if(a[0].type==="replace"){t.push({...a[0].item});continue}let s={...i};for(let c of a)qN(c,s);t.push(s)}return r.length&&r.forEach(i=>{i.index!==void 0?t.splice(i.index,0,{...i.item}):t.push({...i.item})}),t}function qN(e,n){switch(e.type){case"select":{n.selected=e.selected;break}case"position":{typeof e.position<"u"&&(n.position=e.position),typeof e.dragging<"u"&&(n.dragging=e.dragging);break}case"dimensions":{typeof e.dimensions<"u"&&(n.measured={...e.dimensions},e.setAttributes&&((e.setAttributes===!0||e.setAttributes==="width")&&(n.width=e.dimensions.width),(e.setAttributes===!0||e.setAttributes==="height")&&(n.height=e.dimensions.height))),typeof e.resizing=="boolean"&&(n.resizing=e.resizing);break}}}function RN(e,n){return oD(e,n)}function MN(e,n){return oD(e,n)}function Ri(e,n){return{id:e,type:"select",selected:n}}function is(e,n=new Set,t=!1){let o=[];for(let[r,i]of e){let a=n.has(r);!(i.selected===void 0&&!a)&&i.selected!==a&&(t&&(i.selected=a),o.push(Ri(i.id,a)))}return o}function O_({items:e=[],lookup:n}){let t=[],o=new Map(e.map(r=>[r.id,r]));for(let[r,i]of e.entries()){let a=n.get(i.id),s=a?.internals?.userNode??a;s!==void 0&&s!==i&&t.push({id:i.id,item:i,type:"replace"}),s===void 0&&t.push({item:i,type:"add",index:r})}for(let[r]of n)o.get(r)===void 0&&t.push({id:r,type:"remove"});return t}function z_(e){return{id:e.id,type:"remove"}}var AN=gy("React Flow","https://reactflow.dev/");function NN(e,n,t={}){return GS(e,n,{...t,onError:t.onError??AN})}var B_=e=>zS(e),IN=e=>dy(e);function rD(e){return(0,B.forwardRef)(e)}var iD=typeof window<"u"?B.useLayoutEffect:B.useEffect;function P_(e){let[n,t]=(0,B.useState)(BigInt(0)),[o]=(0,B.useState)(()=>ON(()=>t(r=>r+BigInt(1))));return iD(()=>{let r=o.get();r.length&&(e(r),o.reset())},[n]),o}function ON(e){let n=[];return{get:()=>n,reset:()=>{n=[]},push:t=>{n.push(t),e()}}}var aD=(0,B.createContext)(null);function zN({children:e}){let n=Me(),t=(0,B.useCallback)(s=>{let{nodes:c=[],setNodes:l,hasDefaultNodes:u,onNodesChange:f,nodeLookup:d,fitViewQueued:p,onNodesChangeMiddlewareMap:m}=n.getState(),g=c;for(let h of s)g=typeof h=="function"?h(g):h;let x=O_({items:g,lookup:d});for(let h of m.values())x=h(x);u&&l(g),x.length>0?f?.(x):p&&window.requestAnimationFrame(()=>{let{fitViewQueued:h,nodes:v,setNodes:y}=n.getState();h&&y(v)})},[]),o=P_(t),r=(0,B.useCallback)(s=>{let{edges:c=[],setEdges:l,hasDefaultEdges:u,onEdgesChange:f,edgeLookup:d}=n.getState(),p=c;for(let m of s)p=typeof m=="function"?m(p):m;u?l(p):f&&f(O_({items:p,lookup:d}))},[]),i=P_(r),a=(0,B.useMemo)(()=>({nodeQueue:o,edgeQueue:i}),[]);return(0,z.jsx)(aD.Provider,{value:a,children:e})}function BN(){let e=(0,B.useContext)(aD);if(!e)throw new Error("useBatchContext must be used within a BatchProvider");return e}var PN=e=>!!e.panZoom;function $c(){let e=TN(),n=Me(),t=BN(),o=ue(PN),r=(0,B.useMemo)(()=>{let i=f=>n.getState().nodeLookup.get(f),a=f=>{t.nodeQueue.push(f)},s=f=>{t.edgeQueue.push(f)},c=f=>{let{nodeLookup:d,nodeOrigin:p}=n.getState(),m=B_(f)?f:d.get(f.id),g=m.parentId?xy(m.position,m.measured,m.parentId,d,p):m.position,x={...m,position:g,width:m.measured?.width??m.width,height:m.measured?.height??m.height};return es(x)},l=(f,d,p={replace:!1})=>{a(m=>m.map(g=>{if(g.id===f){let x=typeof d=="function"?d(g):d;return p.replace&&B_(x)?x:{...g,...x}}return g}))},u=(f,d,p={replace:!1})=>{s(m=>m.map(g=>{if(g.id===f){let x=typeof d=="function"?d(g):d;return p.replace&&IN(x)?x:{...g,...x}}return g}))};return{getNodes:()=>n.getState().nodes.map(f=>({...f})),getNode:f=>i(f)?.internals.userNode,getInternalNode:i,getEdges:()=>{let{edges:f=[]}=n.getState();return f.map(d=>({...d}))},getEdge:f=>n.getState().edgeLookup.get(f),setNodes:a,setEdges:s,addNodes:f=>{let d=Array.isArray(f)?f:[f];t.nodeQueue.push(p=>[...p,...d])},addEdges:f=>{let d=Array.isArray(f)?f:[f];t.edgeQueue.push(p=>[...p,...d])},toObject:()=>{let{nodes:f=[],edges:d=[],transform:p}=n.getState(),[m,g,x]=p;return{nodes:f.map(h=>({...h})),edges:d.map(h=>({...h})),viewport:{x:m,y:g,zoom:x}}},deleteElements:async({nodes:f=[],edges:d=[]})=>{let{nodes:p,edges:m,onNodesDelete:g,onEdgesDelete:x,triggerNodeChanges:h,triggerEdgeChanges:v,onDelete:y,onBeforeDelete:w}=n.getState(),{nodes:b,edges:_}=await LS({nodesToRemove:f,edgesToRemove:d,nodes:p,edges:m,onBeforeDelete:w}),k=_.length>0,D=b.length>0;if(k){let E=_.map(z_);x?.(_),v(E)}if(D){let E=b.map(z_);g?.(b),h(E)}return(D||k)&&y?.({nodes:b,edges:_}),{deletedNodes:b,deletedEdges:_}},getIntersectingNodes:(f,d=!0,p)=>{let m=yy(f),g=m?f:c(f),x=p!==void 0;return g?(p||n.getState().nodes).filter(h=>{let v=n.getState().nodeLookup.get(h.id);if(v&&!m&&(h.id===f.id||!v.internals.positionAbsolute))return!1;let y=es(x?h:v),w=Kc(y,g);return d&&w>0||w>=y.width*y.height||w>=g.width*g.height}):[]},isNodeIntersecting:(f,d,p=!0)=>{let g=yy(f)?f:c(f);if(!g)return!1;let x=Kc(g,d);return p&&x>0||x>=d.width*d.height||x>=g.width*g.height},updateNode:l,updateNodeData:(f,d,p={replace:!1})=>{l(f,m=>{let g=typeof d=="function"?d(m):d;return p.replace?{...m,data:g}:{...m,data:{...m.data,...g}}},p)},updateEdge:u,updateEdgeData:(f,d,p={replace:!1})=>{u(f,m=>{let g=typeof d=="function"?d(m):d;return p.replace?{...m,data:g}:{...m,data:{...m.data,...g}}},p)},getNodesBounds:f=>{let{nodeLookup:d,nodeOrigin:p}=n.getState();return py(f,{nodeLookup:d,nodeOrigin:p})},getHandleConnections:({type:f,id:d,nodeId:p})=>Array.from(n.getState().connectionLookup.get(`${p}-${f}${d?`-${d}`:""}`)?.values()??[]),getNodeConnections:({type:f,handleId:d,nodeId:p})=>Array.from(n.getState().connectionLookup.get(`${p}${f?d?`-${f}-${d}`:`-${f}`:""}`)?.values()??[]),fitView:async f=>{let d=n.getState().fitViewResolver??VS();return n.setState({fitViewQueued:!0,fitViewOptions:f,fitViewResolver:d}),t.nodeQueue.push(p=>[...p]),d.promise}}},[]);return(0,B.useMemo)(()=>({...r,...e,viewportInitialized:o}),[o])}var L_=e=>e.selected,LN=typeof window<"u"?window:void 0;function jN({deleteKeyCode:e,multiSelectionKeyCode:n}){let t=Me(),{deleteElements:o}=$c(),r=Wc(e,{actInsideInputWithModifier:!1}),i=Wc(n,{target:LN});(0,B.useEffect)(()=>{if(r){let{edges:a,nodes:s}=t.getState();o({nodes:s.filter(L_),edges:a.filter(L_)}),t.setState({nodesSelectionActive:!1})}},[r]),(0,B.useEffect)(()=>{t.setState({multiSelectionActive:i})},[i])}function HN(e){let n=Me();(0,B.useEffect)(()=>{let t=()=>{if(!e.current||!(e.current.checkVisibility?.()??!0))return!1;let o=Fd(e.current);(o.height===0||o.width===0)&&n.getState().onError?.("004",at.error004()),n.setState({width:o.width||500,height:o.height||500})};if(e.current){t(),window.addEventListener("resize",t);let o=new ResizeObserver(()=>t());return o.observe(e.current),()=>{window.removeEventListener("resize",t),o&&e.current&&o.unobserve(e.current)}}},[])}var af={position:"absolute",width:"100%",height:"100%",top:0,left:0},VN=e=>({userSelectionActive:e.userSelectionActive,lib:e.lib,connectionInProgress:e.connection.inProgress});function UN({onPaneContextMenu:e,zoomOnScroll:n=!0,zoomOnPinch:t=!0,panOnScroll:o=!1,panActivationKeyPressed:r,panOnScrollSpeed:i=.5,panOnScrollMode:a=Io.Free,zoomOnDoubleClick:s=!0,panOnDrag:c=!0,defaultViewport:l,translateExtent:u,minZoom:f,maxZoom:d,zoomActivationKeyCode:p,preventScrolling:m=!0,children:g,noWheelClassName:x,noPanClassName:h,onViewportChange:v,isControlledViewport:y,paneClickDistance:w,selectionOnDrag:b}){let _=Me(),k=(0,B.useRef)(null),{userSelectionActive:D,lib:E,connectionInProgress:R}=ue(VN,Ie),A=Wc(p),P=(0,B.useRef)();HN(k);let I=(0,B.useCallback)(C=>{v?.({x:C[0],y:C[1],zoom:C[2]}),y||_.setState({transform:C})},[v,y]);return(0,B.useEffect)(()=>{if(k.current){P.current=l_({domNode:k.current,minZoom:f,maxZoom:d,translateExtent:u,viewport:l,onDraggingChange:M=>_.setState(N=>N.paneDragging===M?N:{paneDragging:M}),onPanZoomStart:(M,N)=>{let{onViewportChangeStart:O,onMoveStart:V}=_.getState();V?.(M,N),O?.(N)},onPanZoom:(M,N)=>{let{onViewportChange:O,onMove:V}=_.getState();V?.(M,N),O?.(N)},onPanZoomEnd:(M,N)=>{let{onViewportChangeEnd:O,onMoveEnd:V}=_.getState();V?.(M,N),O?.(N)}});let{x:C,y:T,zoom:q}=P.current.getViewport();return _.setState({panZoom:P.current,transform:[C,T,q],domNode:k.current.closest(".react-flow")}),()=>{P.current?.destroy()}}},[]),(0,B.useEffect)(()=>{P.current?.update({onPaneContextMenu:e,zoomOnScroll:n,zoomOnPinch:t,panOnScroll:o,panActivationKeyPressed:r,panOnScrollSpeed:i,panOnScrollMode:a,zoomOnDoubleClick:s,panOnDrag:c,zoomActivationKeyPressed:A,preventScrolling:m,noPanClassName:h,userSelectionActive:D,noWheelClassName:x,lib:E,onTransformChange:I,connectionInProgress:R,selectionOnDrag:b,paneClickDistance:w})},[e,n,t,o,r,i,a,s,c,A,m,h,D,x,E,I,R,b,w]),(0,z.jsx)("div",{className:"react-flow__renderer",ref:k,style:af,children:g})}var FN=e=>({userSelectionActive:e.userSelectionActive,userSelectionRect:e.userSelectionRect});function YN(){let{userSelectionActive:e,userSelectionRect:n}=ue(FN,Ie);return e&&n?(0,z.jsx)("div",{className:"react-flow__selection react-flow__container",style:{width:n.width,height:n.height,transform:`translate(${n.x}px, ${n.y}px)`}}):null}var Ny=(e,n)=>t=>{t.target===n.current&&e?.(t)},GN=e=>({userSelectionActive:e.userSelectionActive,elementsSelectable:e.elementsSelectable,dragging:e.paneDragging,panBy:e.panBy,autoPanSpeed:e.autoPanSpeed});function XN({isSelecting:e,selectionKeyPressed:n,selectionMode:t=Ei.Full,panOnDrag:o,autoPanOnSelection:r,paneClickDistance:i,selectionOnDrag:a,onSelectionStart:s,onSelectionEnd:c,onPaneClick:l,onPaneContextMenu:u,onPaneScroll:f,onPaneMouseEnter:d,onPaneMouseMove:p,onPaneMouseLeave:m,children:g}){let x=(0,B.useRef)(0),h=Me(),{userSelectionActive:v,elementsSelectable:y,dragging:w,panBy:b,autoPanSpeed:_}=ue(GN,Ie),k=y&&(e||v),D=(0,B.useRef)(null),E=(0,B.useRef)(),R=(0,B.useRef)(new Set),A=(0,B.useRef)(new Set),P=(0,B.useRef)(!1),I=(0,B.useRef)(!1),C=(0,B.useRef)({x:0,y:0}),T=(0,B.useRef)(!1),q=j=>{if(I.current||P.current||h.getState().connection.inProgress){I.current=!1,P.current=!1;return}l?.(j),h.getState().resetSelectedElements(),h.setState({nodesSelectionActive:!1})},M=j=>{if(Array.isArray(o)&&o?.includes(2)){j.preventDefault();return}u?.(j)},N=f?j=>f(j):void 0,O=j=>{I.current&&(j.stopPropagation(),I.current=!1)},V=j=>{if(j.pointerType==="touch"&&o!==!1&&!n)return;let{domNode:X,transform:Z}=h.getState();if(E.current=X?.getBoundingClientRect(),!E.current)return;let ne=j.target===D.current;if(!ne&&!!j.target.closest(".nokey")||!e||!(a&&ne||n)||j.button!==0||!j.isPrimary)return;j.target?.setPointerCapture?.(j.pointerId),I.current=!1;let{x:ie,y:fe}=kt(j.nativeEvent,E.current),we=ts({x:ie,y:fe},Z);h.setState({userSelectionRect:{width:0,height:0,startX:we.x,startY:we.y,x:ie,y:fe}}),ne||(j.stopPropagation(),j.preventDefault())};function H(j,X){let{userSelectionRect:Z}=h.getState();if(!Z)return;let{transform:ne,nodeLookup:Q,edgeLookup:J,connectionLookup:ie,triggerNodeChanges:fe,triggerEdgeChanges:we,defaultEdgeOptions:cn}=h.getState(),lo={x:Z.startX,y:Z.startY},{x:jt,y:Ht}=Ti(lo,ne),uo={startX:lo.x,startY:lo.y,x:j<jt?j:jt,y:X<Ht?X:Ht,width:Math.abs(j-jt),height:Math.abs(X-Ht)},bs=R.current,Hr=A.current;R.current=new Set(jd(Q,uo,ne,t===Ei.Partial,!0).map(qt=>qt.id)),A.current=new Set;let Vr=cn?.selectable??!0;for(let qt of R.current){let fo=ie.get(qt);if(fo)for(let{edgeId:po}of fo.values()){let Ur=J.get(po);Ur&&(Ur.selectable??Vr)&&A.current.add(po)}}if(!wy(bs,R.current)){let qt=is(Q,R.current,!0);fe(qt)}if(!wy(Hr,A.current)){let qt=is(J,A.current);we(qt)}h.setState({userSelectionRect:uo,userSelectionActive:!0,nodesSelectionActive:!1})}function U(){if(!r||!E.current)return;let[j,X]=Hd(C.current,E.current,_);b({x:j,y:X}).then(Z=>{if(!I.current||!Z){x.current=requestAnimationFrame(U);return}let{x:ne,y:Q}=C.current;H(ne,Q),x.current=requestAnimationFrame(U)})}let Y=()=>{cancelAnimationFrame(x.current),x.current=0,T.current=!1};(0,B.useEffect)(()=>()=>Y(),[]);let F=j=>{let{userSelectionRect:X,transform:Z,resetSelectedElements:ne}=h.getState();if(!E.current||!X)return;let{x:Q,y:J}=kt(j.nativeEvent,E.current);C.current={x:Q,y:J};let ie=Ti({x:X.startX,y:X.startY},Z);if(!I.current){let fe=n?0:i;if(Math.hypot(Q-ie.x,J-ie.y)<=fe)return;ne(),s?.(j)}I.current=!0,T.current||(U(),T.current=!0),H(Q,J)},G=j=>{if(!k){j.target===D.current&&h.getState().connection.inProgress&&(P.current=!0);return}j.button===0&&(j.target?.releasePointerCapture?.(j.pointerId),!v&&j.target===D.current&&h.getState().userSelectionRect&&q?.(j),h.setState({userSelectionActive:!1,userSelectionRect:null}),I.current&&(c?.(j),h.setState({nodesSelectionActive:R.current.size>0})),Y())},oe=j=>{j.target?.releasePointerCapture?.(j.pointerId),Y()},W=o===!0||Array.isArray(o)&&o.includes(0);return(0,z.jsxs)("div",{className:Ve(["react-flow__pane",{draggable:W,dragging:w,selection:e}]),onClick:k?void 0:Ny(q,D),onContextMenu:Ny(M,D),onWheel:Ny(N,D),onPointerEnter:k?void 0:d,onPointerMove:k?F:p,onPointerUp:G,onPointerCancel:k?oe:void 0,onPointerDownCapture:k?V:void 0,onClickCapture:k?O:void 0,onPointerLeave:m,ref:D,style:af,children:[g,(0,z.jsx)(YN,{})]})}function Oy({id:e,store:n,unselect:t=!1,nodeRef:o}){let{addSelectedNodes:r,unselectNodesAndEdges:i,multiSelectionActive:a,nodeLookup:s,onError:c}=n.getState(),l=s.get(e);if(!l){c?.("012",at.error012(e));return}n.setState({nodesSelectionActive:!1}),l.selected?(t||l.selected&&a)&&(i({nodes:[l],edges:[]}),requestAnimationFrame(()=>o?.current?.blur())):r([e])}function sD({nodeRef:e,disabled:n=!1,noDragClassName:t,handleSelector:o,nodeId:r,isSelectable:i,nodeClickDistance:a}){let s=Me(),[c,l]=(0,B.useState)(!1),u=(0,B.useRef)();return(0,B.useEffect)(()=>{if(!n)return u.current=n_({getStoreItems:()=>s.getState(),onNodeMouseDown:f=>{Oy({id:f,store:s,nodeRef:e})},onDragStart:()=>{l(!0)},onDragStop:()=>{l(!1)}}),()=>{u.current?.destroy(),u.current=void 0}},[n,s,e]),(0,B.useEffect)(()=>{n||!e.current||!u.current||u.current.update({noDragClassName:t,handleSelector:o,domNode:e.current,isSelectable:i,nodeId:r,nodeClickDistance:a})},[t,o,n,i,e,r,a]),c}var KN=e=>n=>n.selected&&(n.draggable||e&&typeof n.draggable>"u");function cD(){let e=Me();return(0,B.useCallback)(t=>{let{nodeExtent:o,snapToGrid:r,snapGrid:i,nodesDraggable:a,onError:s,updateNodePositions:c,nodeLookup:l,nodeOrigin:u}=e.getState(),f=new Map,d=KN(a),p=r?i[0]:5,m=r?i[1]:5,g=t.direction.x*p*t.factor,x=t.direction.y*m*t.factor;for(let[,h]of l){if(!d(h))continue;let v={x:h.internals.positionAbsolute.x+g,y:h.internals.positionAbsolute.y+x};r&&(v=ns(v,i));let{position:y,positionAbsolute:w}=my({nodeId:h.id,nextPosition:v,nodeLookup:l,nodeExtent:o,nodeOrigin:u,onError:s});h.position=y,h.internals.positionAbsolute=w,f.set(h.id,h)}c(f)},[])}var zy=(0,B.createContext)(null),ZN=zy.Provider;zy.Consumer;var lD=()=>(0,B.useContext)(zy),QN=e=>({connectOnClick:e.connectOnClick,noPanClassName:e.noPanClassName,rfId:e.rfId}),uD=(0,B.createContext)(null);function WN({children:e}){let n=ue(QN,Ie);return(0,z.jsx)(uD.Provider,{value:n,children:e})}function $N(){let e=(0,B.useContext)(uD);if(!e)throw new Error("useHandleConfig must be used within a HandleConfigProvider");return e}var JN={connectingFrom:!1,connectingTo:!1,clickConnecting:!1,isPossibleEndHandle:!0,connectionInProcess:!1,clickConnectionInProcess:!1,valid:!1},eI=(e,n,t)=>o=>{let{connectionClickStartHandle:r,connectionMode:i,connection:a}=o,{fromHandle:s,toHandle:c,isValid:l}=a;if(!s&&!r)return JN;let u=c?.nodeId===e&&c?.id===n&&c?.type===t;return{connectingFrom:s?.nodeId===e&&s?.id===n&&s?.type===t,connectingTo:u,clickConnecting:r?.nodeId===e&&r?.id===n&&r?.type===t,isPossibleEndHandle:i===Er.Strict?s?.type!==t:e!==s?.nodeId||n!==s?.id,connectionInProcess:!!s,clickConnectionInProcess:!!r,valid:u&&l}};function nI({type:e="source",position:n=K.Top,isValidConnection:t,isConnectable:o=!0,isConnectableStart:r=!0,isConnectableEnd:i=!0,id:a,onConnect:s,children:c,className:l,onMouseDown:u,onTouchStart:f,...d},p){let m=a||null,g=e==="target",x=Me(),h=lD(),{connectOnClick:v,noPanClassName:y,rfId:w}=$N(),{connectingFrom:b,connectingTo:_,clickConnecting:k,isPossibleEndHandle:D,connectionInProcess:E,clickConnectionInProcess:R,valid:A}=ue(eI(h,m,e),Ie);h||x.getState().onError?.("010",at.error010());let P=T=>{let{defaultEdgeOptions:q,onConnect:M,hasDefaultEdges:N}=x.getState(),O={...q,...T};if(N){let{edges:V,setEdges:H,onError:U}=x.getState();H(NN(O,V,{onError:U}))}M?.(O),s?.(O)},I=T=>{if(!h)return;let q=_y(T.nativeEvent);if(r&&(q&&T.button===0||!q)){let M=x.getState();Wd.onPointerDown(T.nativeEvent,{handleDomNode:T.currentTarget,autoPanOnConnect:M.autoPanOnConnect,connectionMode:M.connectionMode,connectionRadius:M.connectionRadius,domNode:M.domNode,nodeLookup:M.nodeLookup,lib:M.lib,isTarget:g,handleId:m,nodeId:h,flowId:M.rfId,panBy:M.panBy,cancelConnection:M.cancelConnection,onConnectStart:M.onConnectStart,onConnectEnd:(...N)=>x.getState().onConnectEnd?.(...N),updateConnection:M.updateConnection,onConnect:P,isValidConnection:t||((...N)=>x.getState().isValidConnection?.(...N)??!0),getTransform:()=>x.getState().transform,getFromHandle:()=>x.getState().connection.fromHandle,autoPanSpeed:M.autoPanSpeed,dragThreshold:M.connectionDragThreshold})}q?u?.(T):f?.(T)},C=T=>{let{onClickConnectStart:q,onClickConnectEnd:M,connectionClickStartHandle:N,connectionMode:O,isValidConnection:V,lib:H,rfId:U,nodeLookup:Y,connection:F}=x.getState();if(!h||!N&&!r)return;if(!N){q?.(T.nativeEvent,{nodeId:h,handleId:m,handleType:e}),x.setState({connectionClickStartHandle:{nodeId:h,type:e,id:m}});return}let G=ky(T.target),oe=t||V,{connection:W,isValid:j}=Wd.isValid(T.nativeEvent,{handle:{nodeId:h,id:m,type:e},connectionMode:O,fromNodeId:N.nodeId,fromHandleId:N.id||null,fromType:N.type,isValidConnection:oe,flowId:U,doc:G,lib:H,nodeLookup:Y});j&&W&&P(W);let X=structuredClone(F);delete X.inProgress,X.toPosition=X.toHandle?X.toHandle.position:null,M?.(T,X),x.setState({connectionClickStartHandle:null})};return(0,z.jsx)("div",{"data-handleid":m,"data-nodeid":h,"data-handlepos":n,"data-id":`${w}-${h}-${m}-${e}`,className:Ve(["react-flow__handle",`react-flow__handle-${n}`,"nodrag",y,l,{source:!g,target:g,connectable:o,connectablestart:r,connectableend:i,clickconnecting:k,connectingfrom:b,connectingto:_,valid:A,connectionindicator:o&&(!E||D)&&(E||R?i:r)}]),onMouseDown:I,onTouchStart:I,onClick:v?C:void 0,ref:p,...d,children:c})}var Mi=(0,B.memo)(rD(nI));function tI({data:e,isConnectable:n,sourcePosition:t=K.Bottom}){return(0,z.jsxs)(z.Fragment,{children:[e?.label,(0,z.jsx)(Mi,{type:"source",position:t,isConnectable:n})]})}function oI({data:e,isConnectable:n,targetPosition:t=K.Top,sourcePosition:o=K.Bottom}){return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Mi,{type:"target",position:t,isConnectable:n}),e?.label,(0,z.jsx)(Mi,{type:"source",position:o,isConnectable:n})]})}function rI(){return null}function iI({data:e,isConnectable:n,targetPosition:t=K.Top}){return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Mi,{type:"target",position:t,isConnectable:n}),e?.label]})}var tf={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}},j_={input:tI,default:oI,output:iI,group:rI};function aI(e){return e.internals.handleBounds===void 0?{width:e.width??e.initialWidth??e.style?.width,height:e.height??e.initialHeight??e.style?.height}:{width:e.width??e.style?.width,height:e.height??e.style?.height}}var sI=e=>{let{width:n,height:t,x:o,y:r}=Ja(e.nodeLookup,{filter:i=>!!i.selected});return{width:bt(n)?n:null,height:bt(t)?t:null,userSelectionActive:e.userSelectionActive,transformString:`translate(${e.transform[0]}px,${e.transform[1]}px) scale(${e.transform[2]}) translate(${o}px,${r}px)`}};function cI({onSelectionContextMenu:e,noPanClassName:n,disableKeyboardA11y:t}){let o=Me(),{width:r,height:i,transformString:a,userSelectionActive:s}=ue(sI,Ie),c=cD(),l=(0,B.useRef)(null);(0,B.useEffect)(()=>{t||l.current?.focus({preventScroll:!0})},[t]);let u=!s&&r!==null&&i!==null;if(sD({nodeRef:l,disabled:!u}),!u)return null;let f=e?p=>{let m=o.getState().nodes.filter(g=>g.selected);e(p,m)}:void 0,d=p=>{Object.prototype.hasOwnProperty.call(tf,p.key)&&(p.preventDefault(),c({direction:tf[p.key],factor:p.shiftKey?4:1}))};return(0,z.jsx)("div",{className:Ve(["react-flow__nodesselection","react-flow__container",n]),style:{transform:a},children:(0,z.jsx)("div",{ref:l,className:"react-flow__nodesselection-rect",onContextMenu:f,tabIndex:t?void 0:-1,onKeyDown:t?void 0:d,style:{width:r,height:i}})})}var H_=typeof window<"u"?window:void 0,lI=e=>({nodesSelectionActive:e.nodesSelectionActive,userSelectionActive:e.userSelectionActive});function dD({children:e,onPaneClick:n,onPaneMouseEnter:t,onPaneMouseMove:o,onPaneMouseLeave:r,onPaneContextMenu:i,onPaneScroll:a,paneClickDistance:s,deleteKeyCode:c,selectionKeyCode:l,selectionOnDrag:u,selectionMode:f,onSelectionStart:d,onSelectionEnd:p,multiSelectionKeyCode:m,panActivationKeyCode:g,zoomActivationKeyCode:x,elementsSelectable:h,zoomOnScroll:v,zoomOnPinch:y,panOnScroll:w,panOnScrollSpeed:b,panOnScrollMode:_,zoomOnDoubleClick:k,panOnDrag:D,autoPanOnSelection:E,defaultViewport:R,translateExtent:A,minZoom:P,maxZoom:I,preventScrolling:C,onSelectionContextMenu:T,noWheelClassName:q,noPanClassName:M,disableKeyboardA11y:N,onViewportChange:O,isControlledViewport:V}){let{nodesSelectionActive:H,userSelectionActive:U}=ue(lI,Ie),Y=Wc(l,{target:H_}),F=Wc(g,{target:H_}),G=F||D,oe=F||w,W=u&&G!==!0,j=Y||U||W;return jN({deleteKeyCode:c,multiSelectionKeyCode:m}),(0,z.jsx)(UN,{onPaneContextMenu:i,elementsSelectable:h,zoomOnScroll:v,zoomOnPinch:y,panOnScroll:oe,panActivationKeyPressed:F,panOnScrollSpeed:b,panOnScrollMode:_,zoomOnDoubleClick:k,panOnDrag:!Y&&G,defaultViewport:R,translateExtent:A,minZoom:P,maxZoom:I,zoomActivationKeyCode:x,preventScrolling:C,noWheelClassName:q,noPanClassName:M,onViewportChange:O,isControlledViewport:V,paneClickDistance:s,selectionOnDrag:W,children:(0,z.jsxs)(XN,{onSelectionStart:d,onSelectionEnd:p,onPaneClick:n,onPaneMouseEnter:t,onPaneMouseMove:o,onPaneMouseLeave:r,onPaneContextMenu:i,onPaneScroll:a,panOnDrag:G,autoPanOnSelection:E,isSelecting:!!j,selectionMode:f,selectionKeyPressed:Y,paneClickDistance:s,selectionOnDrag:W,children:[e,H&&(0,z.jsx)(cI,{onSelectionContextMenu:T,noPanClassName:M,disableKeyboardA11y:N})]})})}dD.displayName="FlowRenderer";var uI=(0,B.memo)(dD),dI=e=>n=>e?jd(n.nodeLookup,{x:0,y:0,width:n.width,height:n.height},n.transform,!0).map(t=>t.id):Array.from(n.nodeLookup.keys());function fI(e){return ue((0,B.useCallback)(dI(e),[e]),Ie)}var pI=e=>e.updateNodeInternals;function mI(){let e=ue(pI),[n]=(0,B.useState)(()=>typeof ResizeObserver>"u"?null:new ResizeObserver(t=>{let o=new Map;t.forEach(r=>{let i=r.target.getAttribute("data-id");o.set(i,{id:i,nodeElement:r.target,force:!0})}),e(o)}));return(0,B.useEffect)(()=>()=>{n?.disconnect()},[n]),n}function hI({node:e,nodeType:n,hasDimensions:t,resizeObserver:o}){let r=Me(),i=(0,B.useRef)(null),a=(0,B.useRef)(null),s=(0,B.useRef)(e.sourcePosition),c=(0,B.useRef)(e.targetPosition),l=(0,B.useRef)(n),u=t&&!!e.internals.handleBounds;return(0,B.useEffect)(()=>{i.current&&!e.hidden&&(!u||a.current!==i.current)&&(a.current&&o?.unobserve(a.current),o?.observe(i.current),a.current=i.current)},[u,e.hidden]),(0,B.useEffect)(()=>()=>{a.current&&(o?.unobserve(a.current),a.current=null)},[]),(0,B.useEffect)(()=>{if(i.current){let f=l.current!==n,d=s.current!==e.sourcePosition,p=c.current!==e.targetPosition;(f||d||p)&&(l.current=n,s.current=e.sourcePosition,c.current=e.targetPosition,r.getState().updateNodeInternals(new Map([[e.id,{id:e.id,nodeElement:i.current,force:!0}]])))}},[e.id,n,e.sourcePosition,e.targetPosition]),i}function yI({id:e,onClick:n,onMouseEnter:t,onMouseMove:o,onMouseLeave:r,onContextMenu:i,onDoubleClick:a,nodesDraggable:s,elementsSelectable:c,nodesConnectable:l,nodesFocusable:u,resizeObserver:f,noDragClassName:d,noPanClassName:p,disableKeyboardA11y:m,rfId:g,nodeTypes:x,nodeClickDistance:h,onError:v}){let{node:y,internals:w,isParent:b}=ue(j=>{let X=j.nodeLookup.get(e),Z=j.parentLookup.has(e);return{node:X,internals:X.internals,isParent:Z}},Ie),_=y.type||"default",k=x?.[_]||j_[_];k===void 0&&(v?.("003",at.error003(_)),_="default",k=x?.default||j_.default);let D=!!(y.draggable||s&&typeof y.draggable>"u"),E=!!(y.selectable||c&&typeof y.selectable>"u"),R=!!(y.connectable||l&&typeof y.connectable>"u"),A=!!(y.focusable||u&&typeof y.focusable>"u"),P=Me(),I=vy(y),C=hI({node:y,nodeType:_,hasDimensions:I,resizeObserver:f}),T=sD({nodeRef:C,disabled:y.hidden||!D,noDragClassName:d,handleSelector:y.dragHandle,nodeId:e,isSelectable:E,nodeClickDistance:h}),q=cD();if(y.hidden)return null;let M=St(y),N=aI(y),O=E||D||n||t||o||r,V=t?j=>t(j,{...w.userNode}):void 0,H=o?j=>o(j,{...w.userNode}):void 0,U=r?j=>r(j,{...w.userNode}):void 0,Y=i?j=>i(j,{...w.userNode}):void 0,F=a?j=>a(j,{...w.userNode}):void 0,G=j=>{let{selectNodesOnDrag:X,nodeDragThreshold:Z}=P.getState();E&&(!X||!D||Z>0)&&Oy({id:e,store:P,nodeRef:C}),n&&n(j,{...w.userNode})},oe=j=>{if(!(Sy(j.nativeEvent)||m)){if(cy.includes(j.key)&&E){let X=j.key==="Escape";Oy({id:e,store:P,unselect:X,nodeRef:C})}else if(D&&y.selected&&Object.prototype.hasOwnProperty.call(tf,j.key)){j.preventDefault();let{ariaLabelConfig:X}=P.getState();P.setState({ariaLiveMessage:X["node.a11yDescription.ariaLiveMessage"]({direction:j.key.replace("Arrow","").toLowerCase(),x:~~w.positionAbsolute.x,y:~~w.positionAbsolute.y})}),q({direction:tf[j.key],factor:j.shiftKey?4:1})}}},W=()=>{if(m||!C.current?.matches(":focus-visible"))return;let{transform:j,width:X,height:Z,autoPanOnNodeFocus:ne,setCenter:Q}=P.getState();if(!ne)return;jd(new Map([[e,y]]),{x:0,y:0,width:X,height:Z},j,!0).length>0||Q(y.position.x+M.width/2,y.position.y+M.height/2,{zoom:j[2]})};return(0,z.jsx)("div",{className:Ve(["react-flow__node",`react-flow__node-${_}`,{[p]:D},y.className,{selected:y.selected,selectable:E,parent:b,draggable:D,dragging:T}]),ref:C,style:{zIndex:w.z,transform:`translate(${w.positionAbsolute.x}px,${w.positionAbsolute.y}px)`,pointerEvents:O?"all":"none",visibility:I?"visible":"hidden",...y.style,...N},"data-id":e,"data-testid":`rf__node-${e}`,onMouseEnter:V,onMouseMove:H,onMouseLeave:U,onContextMenu:Y,onClick:G,onDoubleClick:F,onKeyDown:A?oe:void 0,tabIndex:A?0:void 0,onFocus:A?W:void 0,role:y.ariaRole??(A?"group":void 0),"aria-roledescription":"node","aria-describedby":m?void 0:`${eD}-${g}`,"aria-label":y.ariaLabel,...y.domAttributes,children:(0,z.jsx)(ZN,{value:e,children:(0,z.jsx)(k,{id:e,data:y.data,type:_,positionAbsoluteX:w.positionAbsolute.x,positionAbsoluteY:w.positionAbsolute.y,selected:y.selected??!1,selectable:E,draggable:D,deletable:y.deletable??!0,isConnectable:R,sourcePosition:y.sourcePosition,targetPosition:y.targetPosition,dragging:T,dragHandle:y.dragHandle,zIndex:w.z,parentId:y.parentId,...M})})})}var gI=(0,B.memo)(yI),vI=e=>({nodesConnectable:e.nodesConnectable,nodesFocusable:e.nodesFocusable,elementsSelectable:e.elementsSelectable,onError:e.onError});function fD(e){let{nodesConnectable:n,nodesFocusable:t,elementsSelectable:o,onError:r}=ue(vI,Ie),i=fI(e.onlyRenderVisibleElements),a=mI();return(0,z.jsx)("div",{className:"react-flow__nodes",style:af,children:i.map(s=>(0,z.jsx)(gI,{id:s,nodeTypes:e.nodeTypes,nodeExtent:e.nodeExtent,onClick:e.onNodeClick,onMouseEnter:e.onNodeMouseEnter,onMouseMove:e.onNodeMouseMove,onMouseLeave:e.onNodeMouseLeave,onContextMenu:e.onNodeContextMenu,onDoubleClick:e.onNodeDoubleClick,noDragClassName:e.noDragClassName,noPanClassName:e.noPanClassName,rfId:e.rfId,disableKeyboardA11y:e.disableKeyboardA11y,resizeObserver:a,nodesDraggable:e.nodesDraggable??!0,nodesConnectable:n,nodesFocusable:t,elementsSelectable:o,nodeClickDistance:e.nodeClickDistance,onError:r},s))})}fD.displayName="NodeRenderer";var xI=(0,B.memo)(fD);function wI(e){return ue((0,B.useCallback)(t=>{if(!e)return t.edges.map(r=>r.id);let o=[];if(t.width&&t.height)for(let r of t.edges){let i=t.nodeLookup.get(r.source),a=t.nodeLookup.get(r.target);i&&a&&YS({sourceNode:i,targetNode:a,width:t.width,height:t.height,transform:t.transform})&&o.push(r.id)}return o},[e]),Ie)}var bI=({color:e="none",strokeWidth:n=1})=>{let t={strokeWidth:n,...e&&{stroke:e}};return(0,z.jsx)("polyline",{className:"arrow",style:t,strokeLinecap:"round",fill:"none",strokeLinejoin:"round",points:"-5,-4 0,0 -5,4"})},kI=({color:e="none",strokeWidth:n=1})=>{let t={strokeWidth:n,...e&&{stroke:e,fill:e}};return(0,z.jsx)("polyline",{className:"arrowclosed",style:t,strokeLinecap:"round",strokeLinejoin:"round",points:"-5,-4 0,0 -5,4 -5,-4"})},V_={[Qa.Arrow]:bI,[Qa.ArrowClosed]:kI};function SI(e){let n=Me();return(0,B.useMemo)(()=>Object.prototype.hasOwnProperty.call(V_,e)?V_[e]:(n.getState().onError?.("009",at.error009(e)),null),[e])}var _I=({id:e,type:n,color:t,width:o=12.5,height:r=12.5,markerUnits:i="strokeWidth",strokeWidth:a,orient:s="auto-start-reverse"})=>{let c=SI(n);return c?(0,z.jsx)("marker",{className:"react-flow__arrowhead",id:e,markerWidth:`${o}`,markerHeight:`${r}`,viewBox:"-10 -10 20 20",markerUnits:i,orient:s,refX:"0",refY:"0",children:(0,z.jsx)(c,{color:t,strokeWidth:a})}):null},pD=({defaultColor:e,rfId:n})=>{let t=ue(i=>i.edges),o=ue(i=>i.defaultEdgeOptions),r=(0,B.useMemo)(()=>KS(t,{id:n,defaultColor:e,defaultMarkerStart:o?.markerStart,defaultMarkerEnd:o?.markerEnd}),[t,o,n,e]);return r.length?(0,z.jsx)("svg",{className:"react-flow__marker","aria-hidden":"true",children:(0,z.jsx)("defs",{children:r.map(i=>(0,z.jsx)(_I,{id:i.id,type:i.type,color:i.color,width:i.width,height:i.height,markerUnits:i.markerUnits,strokeWidth:i.strokeWidth,orient:i.orient},i.id))})}):null};pD.displayName="MarkerDefinitions";var DI=(0,B.memo)(pD);function mD({x:e,y:n,label:t,labelStyle:o,labelShowBg:r=!0,labelBgStyle:i,labelBgPadding:a=[2,4],labelBgBorderRadius:s=2,children:c,className:l,...u}){let[f,d]=(0,B.useState)({x:1,y:0,width:0,height:0}),p=Ve(["react-flow__edge-textwrapper",l]),m=(0,B.useRef)(null);return(0,B.useEffect)(()=>{if(m.current){let g=m.current.getBBox();d({x:g.x,y:g.y,width:g.width,height:g.height})}},[t]),t?(0,z.jsxs)("g",{transform:`translate(${e-f.width/2} ${n-f.height/2})`,className:p,visibility:f.width?"visible":"hidden",...u,children:[r&&(0,z.jsx)("rect",{width:f.width+2*a[0],x:-a[0],y:-a[1],height:f.height+2*a[1],className:"react-flow__edge-textbg",style:i,rx:s,ry:s}),(0,z.jsx)("text",{className:"react-flow__edge-text",y:f.height/2,dy:"0.3em",ref:m,style:o,children:t}),c]}):null}mD.displayName="EdgeText";var EI=(0,B.memo)(mD);function as({path:e,labelX:n,labelY:t,label:o,labelStyle:r,labelShowBg:i,labelBgStyle:a,labelBgPadding:s,labelBgBorderRadius:c,interactionWidth:l=20,...u}){return(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)("path",{...u,d:e,fill:"none",className:Ve(["react-flow__edge-path",u.className])}),l?(0,z.jsx)("path",{d:e,fill:"none",strokeOpacity:0,strokeWidth:l,className:"react-flow__edge-interaction"}):null,o&&bt(n)&&bt(t)?(0,z.jsx)(EI,{x:n,y:t,label:o,labelStyle:r,labelShowBg:i,labelBgStyle:a,labelBgPadding:s,labelBgBorderRadius:c}):null]})}function U_({pos:e,x1:n,y1:t,x2:o,y2:r}){return e===K.Left||e===K.Right?[.5*(n+o),t]:[n,.5*(t+r)]}function hD({sourceX:e,sourceY:n,sourcePosition:t=K.Bottom,targetX:o,targetY:r,targetPosition:i=K.Top}){let[a,s]=U_({pos:t,x1:e,y1:n,x2:o,y2:r}),[c,l]=U_({pos:i,x1:o,y1:r,x2:e,y2:n}),[u,f,d,p]=Yd({sourceX:e,sourceY:n,targetX:o,targetY:r,sourceControlX:a,sourceControlY:s,targetControlX:c,targetControlY:l});return[`M${e},${n} C${a},${s} ${c},${l} ${o},${r}`,u,f,d,p]}function yD(e){return(0,B.memo)(({id:n,sourceX:t,sourceY:o,targetX:r,targetY:i,sourcePosition:a,targetPosition:s,label:c,labelStyle:l,labelShowBg:u,labelBgStyle:f,labelBgPadding:d,labelBgBorderRadius:p,style:m,markerEnd:g,markerStart:x,interactionWidth:h})=>{let[v,y,w]=hD({sourceX:t,sourceY:o,sourcePosition:a,targetX:r,targetY:i,targetPosition:s}),b=e.isInternal?void 0:n;return(0,z.jsx)(as,{id:b,path:v,labelX:y,labelY:w,label:c,labelStyle:l,labelShowBg:u,labelBgStyle:f,labelBgPadding:d,labelBgBorderRadius:p,style:m,markerEnd:g,markerStart:x,interactionWidth:h})})}var CI=yD({isInternal:!1}),gD=yD({isInternal:!0});CI.displayName="SimpleBezierEdge";gD.displayName="SimpleBezierEdgeInternal";function vD(e){return(0,B.memo)(({id:n,sourceX:t,sourceY:o,targetX:r,targetY:i,label:a,labelStyle:s,labelShowBg:c,labelBgStyle:l,labelBgPadding:u,labelBgBorderRadius:f,style:d,sourcePosition:p=K.Bottom,targetPosition:m=K.Top,markerEnd:g,markerStart:x,pathOptions:h,interactionWidth:v})=>{let[y,w,b]=Qc({sourceX:t,sourceY:o,sourcePosition:p,targetX:r,targetY:i,targetPosition:m,borderRadius:h?.borderRadius,offset:h?.offset,stepPosition:h?.stepPosition}),_=e.isInternal?void 0:n;return(0,z.jsx)(as,{id:_,path:y,labelX:w,labelY:b,label:a,labelStyle:s,labelShowBg:c,labelBgStyle:l,labelBgPadding:u,labelBgBorderRadius:f,style:d,markerEnd:g,markerStart:x,interactionWidth:v})})}var xD=vD({isInternal:!1}),wD=vD({isInternal:!0});xD.displayName="SmoothStepEdge";wD.displayName="SmoothStepEdgeInternal";function bD(e){return(0,B.memo)(({id:n,...t})=>{let o=e.isInternal?void 0:n;return(0,z.jsx)(xD,{...t,id:o,pathOptions:(0,B.useMemo)(()=>({borderRadius:0,offset:t.pathOptions?.offset}),[t.pathOptions?.offset])})})}var TI=bD({isInternal:!1}),kD=bD({isInternal:!0});TI.displayName="StepEdge";kD.displayName="StepEdgeInternal";function SD(e){return(0,B.memo)(({id:n,sourceX:t,sourceY:o,targetX:r,targetY:i,label:a,labelStyle:s,labelShowBg:c,labelBgStyle:l,labelBgPadding:u,labelBgBorderRadius:f,style:d,markerEnd:p,markerStart:m,interactionWidth:g})=>{let[x,h,v]=Xd({sourceX:t,sourceY:o,targetX:r,targetY:i}),y=e.isInternal?void 0:n;return(0,z.jsx)(as,{id:y,path:x,labelX:h,labelY:v,label:a,labelStyle:s,labelShowBg:c,labelBgStyle:l,labelBgPadding:u,labelBgBorderRadius:f,style:d,markerEnd:p,markerStart:m,interactionWidth:g})})}var qI=SD({isInternal:!1}),_D=SD({isInternal:!0});qI.displayName="StraightEdge";_D.displayName="StraightEdgeInternal";function DD(e){return(0,B.memo)(({id:n,sourceX:t,sourceY:o,targetX:r,targetY:i,sourcePosition:a=K.Bottom,targetPosition:s=K.Top,label:c,labelStyle:l,labelShowBg:u,labelBgStyle:f,labelBgPadding:d,labelBgBorderRadius:p,style:m,markerEnd:g,markerStart:x,pathOptions:h,interactionWidth:v})=>{let[y,w,b]=Gd({sourceX:t,sourceY:o,sourcePosition:a,targetX:r,targetY:i,targetPosition:s,curvature:h?.curvature}),_=e.isInternal?void 0:n;return(0,z.jsx)(as,{id:_,path:y,labelX:w,labelY:b,label:c,labelStyle:l,labelShowBg:u,labelBgStyle:f,labelBgPadding:d,labelBgBorderRadius:p,style:m,markerEnd:g,markerStart:x,interactionWidth:v})})}var RI=DD({isInternal:!1}),ED=DD({isInternal:!0});RI.displayName="BezierEdge";ED.displayName="BezierEdgeInternal";var F_={default:ED,straight:_D,step:kD,smoothstep:wD,simplebezier:gD},Y_={sourceX:null,sourceY:null,targetX:null,targetY:null,sourcePosition:null,targetPosition:null,zIndex:void 0},MI=(e,n,t)=>t===K.Left?e-n:t===K.Right?e+n:e,AI=(e,n,t)=>t===K.Top?e-n:t===K.Bottom?e+n:e,G_="react-flow__edgeupdater";function X_({position:e,centerX:n,centerY:t,radius:o=10,onMouseDown:r,onMouseEnter:i,onMouseOut:a,type:s}){return(0,z.jsx)("circle",{onMouseDown:r,onMouseEnter:i,onMouseOut:a,className:Ve([G_,`${G_}-${s}`]),cx:MI(n,o,e),cy:AI(t,o,e),r:o,stroke:"transparent",fill:"transparent"})}function NI({isReconnectable:e,reconnectRadius:n,edge:t,sourceX:o,sourceY:r,targetX:i,targetY:a,sourcePosition:s,targetPosition:c,onReconnect:l,onReconnectStart:u,onReconnectEnd:f,setReconnecting:d,setUpdateHover:p}){let m=Me(),g=(w,b)=>{if(w.button!==0)return;let{autoPanOnConnect:_,domNode:k,connectionMode:D,connectionRadius:E,lib:R,onConnectStart:A,cancelConnection:P,nodeLookup:I,rfId:C,panBy:T,updateConnection:q}=m.getState(),M=b.type==="target",N=(H,U)=>{d(!1),f?.(H,t,b.type,U)},O=H=>l?.(t,H),V=(H,U)=>{d(!0),u?.(w,t,b.type),A?.(H,U)};Wd.onPointerDown(w.nativeEvent,{autoPanOnConnect:_,connectionMode:D,connectionRadius:E,domNode:k,handleId:b.id,nodeId:b.nodeId,nodeLookup:I,isTarget:M,edgeUpdaterType:b.type,lib:R,flowId:C,cancelConnection:P,panBy:T,isValidConnection:(...H)=>m.getState().isValidConnection?.(...H)??!0,onConnect:O,onConnectStart:V,onConnectEnd:(...H)=>m.getState().onConnectEnd?.(...H),onReconnectEnd:N,updateConnection:q,getTransform:()=>m.getState().transform,getFromHandle:()=>m.getState().connection.fromHandle,dragThreshold:m.getState().connectionDragThreshold,handleDomNode:w.currentTarget})},x=w=>g(w,{nodeId:t.target,id:t.targetHandle??null,type:"target"}),h=w=>g(w,{nodeId:t.source,id:t.sourceHandle??null,type:"source"}),v=()=>p(!0),y=()=>p(!1);return(0,z.jsxs)(z.Fragment,{children:[(e===!0||e==="source")&&(0,z.jsx)(X_,{position:s,centerX:o,centerY:r,radius:n,onMouseDown:x,onMouseEnter:v,onMouseOut:y,type:"source"}),(e===!0||e==="target")&&(0,z.jsx)(X_,{position:c,centerX:i,centerY:a,radius:n,onMouseDown:h,onMouseEnter:v,onMouseOut:y,type:"target"})]})}function II({id:e,edgesFocusable:n,edgesReconnectable:t,elementsSelectable:o,onClick:r,onDoubleClick:i,onContextMenu:a,onMouseEnter:s,onMouseMove:c,onMouseLeave:l,reconnectRadius:u,onReconnect:f,onReconnectStart:d,onReconnectEnd:p,rfId:m,edgeTypes:g,noPanClassName:x,onError:h,disableKeyboardA11y:v}){let y=ue(Q=>Q.edgeLookup.get(e)),w=ue(Q=>Q.defaultEdgeOptions);y=w?{...w,...y}:y;let b=y.type||"default",_=g?.[b]||F_[b];_===void 0&&(h?.("011",at.error011(b)),b="default",_=g?.default||F_.default);let k=!!(y.focusable||n&&typeof y.focusable>"u"),D=typeof f<"u"&&(y.reconnectable||t&&typeof y.reconnectable>"u"),E=!!(y.selectable||o&&typeof y.selectable>"u"),R=(0,B.useRef)(null),[A,P]=(0,B.useState)(!1),[I,C]=(0,B.useState)(!1),T=Me(),{zIndex:q=y.zIndex,sourceX:M,sourceY:N,targetX:O,targetY:V,sourcePosition:H,targetPosition:U}=ue((0,B.useCallback)(Q=>{let J=Q.nodeLookup.get(y.source),ie=Q.nodeLookup.get(y.target);if(!J||!ie)return Y_;let fe=XS({id:e,sourceNode:J,targetNode:ie,sourceHandle:y.sourceHandle||null,targetHandle:y.targetHandle||null,connectionMode:Q.connectionMode,onError:h}),we=FS({selected:y.selected,zIndex:y.zIndex,sourceNode:J,targetNode:ie,elevateOnSelect:Q.elevateEdgesOnSelect,zIndexMode:Q.zIndexMode});return{...fe||Y_,zIndex:we}},[y.source,y.target,y.sourceHandle,y.targetHandle,y.selected,y.zIndex,h]),Ie),Y=(0,B.useMemo)(()=>y.markerStart?`url('#${Kd(y.markerStart,m)}')`:void 0,[y.markerStart,m]),F=(0,B.useMemo)(()=>y.markerEnd?`url('#${Kd(y.markerEnd,m)}')`:void 0,[y.markerEnd,m]);if(y.hidden||M===null||N===null||O===null||V===null)return null;let G=Q=>{let{addSelectedEdges:J,unselectNodesAndEdges:ie,multiSelectionActive:fe}=T.getState();E&&(T.setState({nodesSelectionActive:!1}),y.selected&&fe?(ie({nodes:[],edges:[y]}),R.current?.blur()):J([e])),r&&r(Q,y)},oe=i?Q=>{i(Q,{...y})}:void 0,W=a?Q=>{a(Q,{...y})}:void 0,j=s?Q=>{s(Q,{...y})}:void 0,X=c?Q=>{c(Q,{...y})}:void 0,Z=l?Q=>{l(Q,{...y})}:void 0,ne=Q=>{if(!v&&cy.includes(Q.key)&&E){let{unselectNodesAndEdges:J,addSelectedEdges:ie}=T.getState();Q.key==="Escape"?(R.current?.blur(),J({edges:[y]})):ie([e])}};return(0,z.jsx)("svg",{style:{zIndex:q},children:(0,z.jsxs)("g",{className:Ve(["react-flow__edge",`react-flow__edge-${b}`,y.className,x,{selected:y.selected,animated:y.animated,inactive:!E&&!r,updating:A,selectable:E}]),onClick:G,onDoubleClick:oe,onContextMenu:W,onMouseEnter:j,onMouseMove:X,onMouseLeave:Z,onKeyDown:k?ne:void 0,tabIndex:k?0:void 0,role:y.ariaRole??(k?"group":"img"),"aria-roledescription":"edge","data-id":e,"data-testid":`rf__edge-${e}`,"aria-label":y.ariaLabel===null?void 0:y.ariaLabel||`Edge from ${y.source} to ${y.target}`,"aria-describedby":k?`${nD}-${m}`:void 0,ref:R,...y.domAttributes,children:[!I&&(0,z.jsx)(_,{id:e,source:y.source,target:y.target,type:y.type,selected:y.selected,animated:y.animated,selectable:E,deletable:y.deletable??!0,label:y.label,labelStyle:y.labelStyle,labelShowBg:y.labelShowBg,labelBgStyle:y.labelBgStyle,labelBgPadding:y.labelBgPadding,labelBgBorderRadius:y.labelBgBorderRadius,sourceX:M,sourceY:N,targetX:O,targetY:V,sourcePosition:H,targetPosition:U,data:y.data,style:y.style,sourceHandleId:y.sourceHandle,targetHandleId:y.targetHandle,markerStart:Y,markerEnd:F,pathOptions:"pathOptions"in y?y.pathOptions:void 0,interactionWidth:y.interactionWidth}),D&&(0,z.jsx)(NI,{edge:y,isReconnectable:D,reconnectRadius:u,onReconnect:f,onReconnectStart:d,onReconnectEnd:p,sourceX:M,sourceY:N,targetX:O,targetY:V,sourcePosition:H,targetPosition:U,setUpdateHover:P,setReconnecting:C})]})})}var OI=(0,B.memo)(II),zI=e=>({edgesFocusable:e.edgesFocusable,edgesReconnectable:e.edgesReconnectable,elementsSelectable:e.elementsSelectable,connectionMode:e.connectionMode,onError:e.onError});function CD({defaultMarkerColor:e,onlyRenderVisibleElements:n,rfId:t,edgeTypes:o,noPanClassName:r,onReconnect:i,onEdgeContextMenu:a,onEdgeMouseEnter:s,onEdgeMouseMove:c,onEdgeMouseLeave:l,onEdgeClick:u,reconnectRadius:f,onEdgeDoubleClick:d,onReconnectStart:p,onReconnectEnd:m,disableKeyboardA11y:g}){let{edgesFocusable:x,edgesReconnectable:h,elementsSelectable:v,onError:y}=ue(zI,Ie),w=wI(n);return(0,z.jsxs)("div",{className:"react-flow__edges",children:[(0,z.jsx)(DI,{defaultColor:e,rfId:t}),w.map(b=>(0,z.jsx)(OI,{id:b,edgesFocusable:x,edgesReconnectable:h,elementsSelectable:v,noPanClassName:r,onReconnect:i,onContextMenu:a,onMouseEnter:s,onMouseMove:c,onMouseLeave:l,onClick:u,reconnectRadius:f,onDoubleClick:d,onReconnectStart:p,onReconnectEnd:m,rfId:t,onError:y,edgeTypes:o,disableKeyboardA11y:g},b))]})}CD.displayName="EdgeRenderer";var BI=(0,B.memo)(CD),K_=e=>`translate(${e[0]}px,${e[1]}px) scale(${e[2]})`;function PI({children:e}){let n=Me(),t=(0,B.useRef)(null),[o]=(0,B.useState)(()=>n.getState().transform);return iD(()=>{let r=null,i=()=>{let a=n.getState().transform;r&&a[0]===r[0]&&a[1]===r[1]&&a[2]===r[2]||(r=a,t.current&&(t.current.style.transform=K_(a)))};return i(),n.subscribe(i)},[n]),(0,z.jsx)("div",{ref:t,className:"react-flow__viewport xyflow__viewport react-flow__container",style:{transform:K_(o)},children:e})}function LI(e){let n=$c(),t=(0,B.useRef)(!1);(0,B.useEffect)(()=>{!t.current&&n.viewportInitialized&&e&&(setTimeout(()=>e(n),1),t.current=!0)},[e,n.viewportInitialized])}var jI=e=>e.panZoom?.syncViewport;function HI(e){let n=ue(jI),t=Me();return(0,B.useEffect)(()=>{e&&(n?.(e),t.setState({transform:[e.x,e.y,e.zoom]}))},[e,n]),null}function Z_(e){return e.connection.inProgress?{...e.connection,to:ts(e.connection.to,e.transform)}:{...e.connection}}function VI(e){return e?t=>{let o=Z_(t);return e(o)}:Z_}function UI(e){let n=VI(e);return ue(n,Ie)}var FI=e=>({nodesConnectable:e.nodesConnectable,isValid:e.connection.isValid,inProgress:e.connection.inProgress,width:e.width,height:e.height});function YI({containerStyle:e,style:n,type:t,component:o}){let{nodesConnectable:r,width:i,height:a,isValid:s,inProgress:c}=ue(FI,Ie);return!(i&&r&&c)?null:(0,z.jsx)("svg",{style:e,width:i,height:a,className:"react-flow__connectionline react-flow__container",children:(0,z.jsx)("g",{className:Ve(["react-flow__connection",by(s)]),children:(0,z.jsx)(TD,{style:n,type:t,CustomComponent:o,isValid:s})})})}var TD=({style:e,type:n=ro.Bezier,CustomComponent:t,isValid:o})=>{let{inProgress:r,from:i,fromNode:a,fromHandle:s,fromPosition:c,to:l,toNode:u,toHandle:f,toPosition:d,pointer:p}=UI();if(!r)return;if(t)return(0,z.jsx)(t,{connectionLineType:n,connectionLineStyle:e,fromNode:a,fromHandle:s,fromX:i.x,fromY:i.y,toX:l.x,toY:l.y,fromPosition:c,toPosition:d,connectionStatus:by(o),toNode:u,toHandle:f,pointer:p});let m="",g={sourceX:i.x,sourceY:i.y,sourcePosition:c,targetX:l.x,targetY:l.y,targetPosition:d};switch(n){case ro.Bezier:[m]=Gd(g);break;case ro.SimpleBezier:[m]=hD(g);break;case ro.Step:[m]=Qc({...g,borderRadius:0});break;case ro.SmoothStep:[m]=Qc(g);break;default:[m]=Xd(g)}return(0,z.jsx)("path",{d:m,fill:"none",className:"react-flow__connection-path",style:e})};TD.displayName="ConnectionLine";var GI={};function Q_(e=GI){let n=(0,B.useRef)(e),t=Me();(0,B.useEffect)(()=>{},[e])}function XI(){let e=Me(),n=(0,B.useRef)(!1);(0,B.useEffect)(()=>{},[])}function qD({nodeTypes:e,edgeTypes:n,onInit:t,onNodeClick:o,onEdgeClick:r,onNodeDoubleClick:i,onEdgeDoubleClick:a,onNodeMouseEnter:s,onNodeMouseMove:c,onNodeMouseLeave:l,onNodeContextMenu:u,onSelectionContextMenu:f,onSelectionStart:d,onSelectionEnd:p,connectionLineType:m,connectionLineStyle:g,connectionLineComponent:x,connectionLineContainerStyle:h,selectionKeyCode:v,selectionOnDrag:y,selectionMode:w,multiSelectionKeyCode:b,panActivationKeyCode:_,zoomActivationKeyCode:k,deleteKeyCode:D,onlyRenderVisibleElements:E,elementsSelectable:R,defaultViewport:A,translateExtent:P,minZoom:I,maxZoom:C,preventScrolling:T,defaultMarkerColor:q,zoomOnScroll:M,zoomOnPinch:N,panOnScroll:O,panOnScrollSpeed:V,panOnScrollMode:H,zoomOnDoubleClick:U,panOnDrag:Y,autoPanOnSelection:F,onPaneClick:G,onPaneMouseEnter:oe,onPaneMouseMove:W,onPaneMouseLeave:j,onPaneScroll:X,onPaneContextMenu:Z,paneClickDistance:ne,nodeClickDistance:Q,onEdgeContextMenu:J,onEdgeMouseEnter:ie,onEdgeMouseMove:fe,onEdgeMouseLeave:we,reconnectRadius:cn,onReconnect:lo,onReconnectStart:jt,onReconnectEnd:Ht,noDragClassName:uo,noWheelClassName:bs,noPanClassName:Hr,disableKeyboardA11y:Vr,nodeExtent:qt,rfId:fo,viewport:po,onViewportChange:Ur,nodesDraggable:Bf}){return Q_(e),Q_(n),XI(),LI(t),HI(po),(0,z.jsx)(uI,{onPaneClick:G,onPaneMouseEnter:oe,onPaneMouseMove:W,onPaneMouseLeave:j,onPaneContextMenu:Z,onPaneScroll:X,paneClickDistance:ne,deleteKeyCode:D,selectionKeyCode:v,selectionOnDrag:y,selectionMode:w,onSelectionStart:d,onSelectionEnd:p,multiSelectionKeyCode:b,panActivationKeyCode:_,zoomActivationKeyCode:k,elementsSelectable:R,zoomOnScroll:M,zoomOnPinch:N,zoomOnDoubleClick:U,panOnScroll:O,panOnScrollSpeed:V,panOnScrollMode:H,panOnDrag:Y,autoPanOnSelection:F,defaultViewport:A,translateExtent:P,minZoom:I,maxZoom:C,onSelectionContextMenu:f,preventScrolling:T,noDragClassName:uo,noWheelClassName:bs,noPanClassName:Hr,disableKeyboardA11y:Vr,onViewportChange:Ur,isControlledViewport:!!po,children:(0,z.jsxs)(PI,{children:[(0,z.jsx)(BI,{edgeTypes:n,onEdgeClick:r,onEdgeDoubleClick:a,onReconnect:lo,onReconnectStart:jt,onReconnectEnd:Ht,onlyRenderVisibleElements:E,onEdgeContextMenu:J,onEdgeMouseEnter:ie,onEdgeMouseMove:fe,onEdgeMouseLeave:we,reconnectRadius:cn,defaultMarkerColor:q,noPanClassName:Hr,disableKeyboardA11y:Vr,rfId:fo}),(0,z.jsx)(YI,{style:g,type:m,component:x,containerStyle:h}),(0,z.jsx)("div",{className:"react-flow__edgelabel-renderer"}),(0,z.jsx)(xI,{nodeTypes:e,onNodeClick:o,onNodeDoubleClick:i,onNodeMouseEnter:s,onNodeMouseMove:c,onNodeMouseLeave:l,onNodeContextMenu:u,nodeClickDistance:Q,onlyRenderVisibleElements:E,noPanClassName:Hr,noDragClassName:uo,disableKeyboardA11y:Vr,nodeExtent:qt,rfId:fo,nodesDraggable:Bf}),(0,z.jsx)("div",{className:"react-flow__viewport-portal"})]})})}qD.displayName="GraphView";var KI=(0,B.memo)(qD),ZI=gy("React Flow","https://reactflow.dev/"),W_=({nodes:e,edges:n,defaultNodes:t,defaultEdges:o,width:r,height:i,fitView:a,fitViewOptions:s,minZoom:c=.5,maxZoom:l=2,nodeOrigin:u,nodeExtent:f,zIndexMode:d="basic"}={})=>{let p=new Map,m=new Map,g=new Map,x=new Map,h=o??n??[],v=t??e??[],y=u??[0,0],w=f??$a;Ry(g,x,h);let{nodesInitialized:b}=Zd(v,p,m,{nodeOrigin:y,nodeExtent:w,zIndexMode:d}),_=[0,0,1];if(a&&r&&i){let k=Ja(p,{filter:A=>!!((A.width||A.initialWidth)&&(A.height||A.initialHeight))}),{x:D,y:E,zoom:R}=Zc(k,r,i,c,l,s?.padding??.1);_=[D,E,R]}return{rfId:"1",width:r??0,height:i??0,transform:_,nodes:v,nodesInitialized:b,nodeLookup:p,parentLookup:m,edges:h,edgeLookup:x,connectionLookup:g,onNodesChange:null,onEdgesChange:null,hasDefaultNodes:t!==void 0,hasDefaultEdges:o!==void 0,panZoom:null,minZoom:c,maxZoom:l,translateExtent:$a,nodeExtent:w,nodesSelectionActive:!1,userSelectionActive:!1,userSelectionRect:null,connectionMode:Er.Strict,domNode:null,paneDragging:!1,noPanClassName:"nopan",nodeOrigin:y,nodeDragThreshold:1,connectionDragThreshold:1,snapGrid:[15,15],snapToGrid:!1,nodesDraggable:!0,nodesConnectable:!0,nodesFocusable:!0,edgesFocusable:!0,edgesReconnectable:!0,elementsSelectable:!0,elevateNodesOnSelect:!0,elevateEdgesOnSelect:!0,selectNodesOnDrag:!0,multiSelectionActive:!1,fitViewQueued:a??!1,fitViewOptions:s,fitViewResolver:null,connection:{...uy},connectionClickStartHandle:null,connectOnClick:!0,ariaLiveMessage:"",autoPanOnConnect:!0,autoPanOnNodeDrag:!0,autoPanOnNodeFocus:!0,autoPanSpeed:15,connectionRadius:20,onError:ZI,isValidConnection:void 0,onSelectionChangeHandlers:[],lib:"react",debug:!1,ariaLabelConfig:ly,zIndexMode:d,defaultEdgeOptions:void 0,onNodesChangeMiddlewareMap:new Map,onEdgesChangeMiddlewareMap:new Map,onNodesDelete:void 0,onEdgesDelete:void 0,onDelete:void 0,onBeforeDelete:void 0,onViewportChangeStart:void 0,onViewportChange:void 0,onViewportChangeEnd:void 0,onNodeDragStart:void 0,onNodeDrag:void 0,onNodeDragStop:void 0,onSelectionDragStart:void 0,onSelectionDrag:void 0,onSelectionDragStop:void 0,onMoveStart:void 0,onMove:void 0,onMoveEnd:void 0,onConnect:void 0,onConnectStart:void 0,onConnectEnd:void 0,onClickConnectStart:void 0,onClickConnectEnd:void 0}},QI=({nodes:e,edges:n,defaultNodes:t,defaultEdges:o,width:r,height:i,fitView:a,fitViewOptions:s,minZoom:c,maxZoom:l,nodeOrigin:u,nodeExtent:f,zIndexMode:d})=>E_((p,m)=>{async function g(){let{nodeLookup:x,panZoom:h,fitViewOptions:v,fitViewResolver:y,width:w,height:b,minZoom:_,maxZoom:k}=m();h&&(await PS({nodes:x,width:w,height:b,panZoom:h,minZoom:_,maxZoom:k},v),y?.resolve(!0),p({fitViewResolver:null}))}return{...W_({nodes:e,edges:n,width:r,height:i,fitView:a,fitViewOptions:s,minZoom:c,maxZoom:l,nodeOrigin:u,nodeExtent:f,defaultNodes:t,defaultEdges:o,zIndexMode:d}),setNodes:x=>{let{nodeLookup:h,parentLookup:v,nodeOrigin:y,nodeExtent:w,elevateNodesOnSelect:b,fitViewQueued:_,zIndexMode:k,nodesSelectionActive:D}=m(),{nodesInitialized:E,hasSelectedNodes:R}=Zd(x,h,v,{nodeOrigin:y,nodeExtent:w,elevateNodesOnSelect:b,checkEquality:!0,zIndexMode:k}),A=D&&R;_&&E?(g(),p({nodes:x,nodesInitialized:E,fitViewQueued:!1,fitViewOptions:void 0,nodesSelectionActive:A})):p({nodes:x,nodesInitialized:E,nodesSelectionActive:A})},setEdges:x=>{let{connectionLookup:h,edgeLookup:v}=m();Ry(h,v,x),p({edges:x})},setDefaultNodesAndEdges:(x,h)=>{if(x){let{setNodes:v}=m();v(x),p({hasDefaultNodes:!0})}if(h){let{setEdges:v}=m();v(h),p({hasDefaultEdges:!0})}},updateNodeInternals:x=>{let{triggerNodeChanges:h,nodeLookup:v,parentLookup:y,domNode:w,nodeOrigin:b,nodeExtent:_,debug:k,fitViewQueued:D,zIndexMode:E}=m(),{changes:R,updatedInternals:A}=$S(x,v,y,w,b,_,E);A&&(QS(v,y,{nodeOrigin:b,nodeExtent:_,zIndexMode:E}),D?(g(),p({fitViewQueued:!1,fitViewOptions:void 0})):p({}),R?.length>0&&(k&&console.log("React Flow: trigger node changes",R),h?.(R)))},updateNodePositions:(x,h=!1)=>{let v=[],y=[],{nodeLookup:w,triggerNodeChanges:b,connection:_,updateConnection:k,onNodesChangeMiddlewareMap:D}=m();for(let[E,R]of x){let A=w.get(E),P=!!(A?.expandParent&&A?.parentId&&R?.position),I={id:E,type:"position",position:P?{x:Math.max(0,R.position.x),y:Math.max(0,R.position.y)}:R.position,dragging:h};if(A&&_.inProgress&&_.fromNode.id===A.id){let C=Cr(A,_.fromHandle,K.Left,!0);k({..._,from:C})}P&&A.parentId&&v.push({id:E,parentId:A.parentId,rect:{...R.internals.positionAbsolute,width:R.measured.width??0,height:R.measured.height??0}}),y.push(I)}if(v.length>0){let{parentLookup:E,nodeOrigin:R}=m(),A=Qd(v,w,E,R);y.push(...A)}for(let E of D.values())y=E(y);b(y)},triggerNodeChanges:x=>{let{onNodesChange:h,setNodes:v,nodes:y,hasDefaultNodes:w,debug:b}=m();if(x?.length){if(w){let _=RN(x,y);v(_)}b&&console.log("React Flow: trigger node changes",x),h?.(x)}},triggerEdgeChanges:x=>{let{onEdgesChange:h,setEdges:v,edges:y,hasDefaultEdges:w,debug:b}=m();if(x?.length){if(w){let _=MN(x,y);v(_)}b&&console.log("React Flow: trigger edge changes",x),h?.(x)}},addSelectedNodes:x=>{let{multiSelectionActive:h,edgeLookup:v,nodeLookup:y,triggerNodeChanges:w,triggerEdgeChanges:b}=m();if(h){let _=x.map(k=>Ri(k,!0));w(_);return}w(is(y,new Set([...x]),!0)),b(is(v))},addSelectedEdges:x=>{let{multiSelectionActive:h,edgeLookup:v,nodeLookup:y,triggerNodeChanges:w,triggerEdgeChanges:b}=m();if(h){let _=x.map(k=>Ri(k,!0));b(_);return}b(is(v,new Set([...x]))),w(is(y,new Set,!0))},unselectNodesAndEdges:({nodes:x,edges:h}={})=>{let{edges:v,nodes:y,nodeLookup:w,triggerNodeChanges:b,triggerEdgeChanges:_}=m(),k=x||y,D=h||v,E=[];for(let A of k){if(!A.selected)continue;let P=w.get(A.id);P&&(P.selected=!1),E.push(Ri(A.id,!1))}let R=[];for(let A of D)A.selected&&R.push(Ri(A.id,!1));b(E),_(R)},setMinZoom:x=>{let{panZoom:h,maxZoom:v}=m();h?.setScaleExtent([x,v]),p({minZoom:x})},setMaxZoom:x=>{let{panZoom:h,minZoom:v}=m();h?.setScaleExtent([v,x]),p({maxZoom:x})},setTranslateExtent:x=>{m().panZoom?.setTranslateExtent(x),p({translateExtent:x})},resetSelectedElements:()=>{let{edges:x,nodes:h,triggerNodeChanges:v,triggerEdgeChanges:y,elementsSelectable:w}=m();if(!w)return;let b=h.reduce((k,D)=>D.selected?[...k,Ri(D.id,!1)]:k,[]),_=x.reduce((k,D)=>D.selected?[...k,Ri(D.id,!1)]:k,[]);v(b),y(_)},setNodeExtent:x=>{let{nodes:h,nodeLookup:v,parentLookup:y,nodeOrigin:w,elevateNodesOnSelect:b,nodeExtent:_,zIndexMode:k}=m();x[0][0]===_[0][0]&&x[0][1]===_[0][1]&&x[1][0]===_[1][0]&&x[1][1]===_[1][1]||(Zd(h,v,y,{nodeOrigin:w,nodeExtent:x,elevateNodesOnSelect:b,checkEquality:!1,zIndexMode:k}),p({nodeExtent:x}))},panBy:x=>{let{transform:h,width:v,height:y,panZoom:w,translateExtent:b}=m();return JS({delta:x,panZoom:w,transform:h,translateExtent:b,width:v,height:y})},setCenter:async(x,h,v)=>{let{width:y,height:w,maxZoom:b,panZoom:_}=m();if(!_)return!1;let k=typeof v?.zoom<"u"?v.zoom:b;return await _.setViewport({x:y/2-x*k,y:w/2-h*k,zoom:k},{duration:v?.duration,ease:v?.ease,interpolate:v?.interpolate}),!0},cancelConnection:()=>{p({connection:{...uy}})},updateConnection:x=>{p({connection:x})},reset:()=>p({...W_()})}},Object.is);function By({initialNodes:e,initialEdges:n,defaultNodes:t,defaultEdges:o,initialWidth:r,initialHeight:i,initialMinZoom:a,initialMaxZoom:s,initialFitViewOptions:c,fitView:l,nodeOrigin:u,nodeExtent:f,zIndexMode:d,children:p}){let[m]=(0,B.useState)(()=>QI({nodes:e,edges:n,defaultNodes:t,defaultEdges:o,width:r,height:i,fitView:l,minZoom:a,maxZoom:s,fitViewOptions:c,nodeOrigin:u,nodeExtent:f,zIndexMode:d}));return(0,z.jsx)(uN,{value:m,children:(0,z.jsx)(zN,{children:(0,z.jsx)(WN,{children:p})})})}function WI({children:e,nodes:n,edges:t,defaultNodes:o,defaultEdges:r,width:i,height:a,fitView:s,fitViewOptions:c,minZoom:l,maxZoom:u,nodeOrigin:f,nodeExtent:d,zIndexMode:p}){return(0,B.useContext)(of)?(0,z.jsx)(z.Fragment,{children:e}):(0,z.jsx)(By,{initialNodes:n,initialEdges:t,defaultNodes:o,defaultEdges:r,initialWidth:i,initialHeight:a,fitView:s,initialFitViewOptions:c,initialMinZoom:l,initialMaxZoom:u,nodeOrigin:f,nodeExtent:d,zIndexMode:p,children:e})}var $I={width:"100%",height:"100%",overflow:"hidden",position:"relative",zIndex:0};function JI({nodes:e,edges:n,defaultNodes:t,defaultEdges:o,className:r,nodeTypes:i,edgeTypes:a,onNodeClick:s,onEdgeClick:c,onInit:l,onMove:u,onMoveStart:f,onMoveEnd:d,onConnect:p,onConnectStart:m,onConnectEnd:g,onClickConnectStart:x,onClickConnectEnd:h,onNodeMouseEnter:v,onNodeMouseMove:y,onNodeMouseLeave:w,onNodeContextMenu:b,onNodeDoubleClick:_,onNodeDragStart:k,onNodeDrag:D,onNodeDragStop:E,onNodesDelete:R,onEdgesDelete:A,onDelete:P,onSelectionChange:I,onSelectionDragStart:C,onSelectionDrag:T,onSelectionDragStop:q,onSelectionContextMenu:M,onSelectionStart:N,onSelectionEnd:O,onBeforeDelete:V,connectionMode:H,connectionLineType:U=ro.Bezier,connectionLineStyle:Y,connectionLineComponent:F,connectionLineContainerStyle:G,deleteKeyCode:oe="Backspace",selectionKeyCode:W="Shift",selectionOnDrag:j=!1,selectionMode:X=Ei.Full,panActivationKeyCode:Z="Space",multiSelectionKeyCode:ne=os()?"Meta":"Control",zoomActivationKeyCode:Q=os()?"Meta":"Control",snapToGrid:J,snapGrid:ie,onlyRenderVisibleElements:fe=!1,selectNodesOnDrag:we,nodesDraggable:cn,autoPanOnNodeFocus:lo,nodesConnectable:jt,nodesFocusable:Ht,nodeOrigin:uo=tD,edgesFocusable:bs,edgesReconnectable:Hr,elementsSelectable:Vr=!0,defaultViewport:qt=SN,minZoom:fo=.5,maxZoom:po=2,translateExtent:Ur=$a,preventScrolling:Bf=!0,nodeExtent:Pf,defaultMarkerColor:h2="#b1b1b7",zoomOnScroll:y2=!0,zoomOnPinch:g2=!0,panOnScroll:v2=!1,panOnScrollSpeed:x2=.5,panOnScrollMode:w2=Io.Free,zoomOnDoubleClick:b2=!0,panOnDrag:k2=!0,onPaneClick:S2,onPaneMouseEnter:_2,onPaneMouseMove:D2,onPaneMouseLeave:E2,onPaneScroll:C2,onPaneContextMenu:T2,paneClickDistance:q2=1,nodeClickDistance:R2=0,children:M2,onReconnect:A2,onReconnectStart:N2,onReconnectEnd:I2,onEdgeContextMenu:O2,onEdgeDoubleClick:z2,onEdgeMouseEnter:B2,onEdgeMouseMove:P2,onEdgeMouseLeave:L2,reconnectRadius:j2=10,onNodesChange:H2,onEdgesChange:V2,noDragClassName:U2="nodrag",noWheelClassName:F2="nowheel",noPanClassName:Wg="nopan",fitView:$g,fitViewOptions:Jg,connectOnClick:Y2,attributionPosition:G2,proOptions:X2,defaultEdgeOptions:K2,elevateNodesOnSelect:Z2=!0,elevateEdgesOnSelect:Q2=!1,disableKeyboardA11y:e0=!1,autoPanOnConnect:W2,autoPanOnNodeDrag:$2,autoPanOnSelection:J2=!0,autoPanSpeed:eC,connectionRadius:nC,isValidConnection:tC,onError:oC,style:rC,id:n0,nodeDragThreshold:iC,connectionDragThreshold:aC,viewport:sC,onViewportChange:cC,width:lC,height:uC,colorMode:dC="light",debug:fC,onScroll:t0,ariaLabelConfig:pC,zIndexMode:o0="basic",...mC},hC){let Lf=n0||"1",yC=CN(dC),gC=(0,B.useCallback)(r0=>{r0.currentTarget.scrollTo({top:0,left:0,behavior:"instant"}),t0?.(r0)},[t0]);return(0,z.jsx)("div",{"data-testid":"rf__wrapper",...mC,onScroll:gC,style:{...rC,...$I},ref:hC,className:Ve(["react-flow",r,yC]),id:n0,role:"application",children:(0,z.jsxs)(WI,{nodes:e,edges:n,width:lC,height:uC,fitView:$g,fitViewOptions:Jg,minZoom:fo,maxZoom:po,nodeOrigin:uo,nodeExtent:Pf,zIndexMode:o0,children:[(0,z.jsx)(EN,{nodes:e,edges:n,defaultNodes:t,defaultEdges:o,onConnect:p,onConnectStart:m,onConnectEnd:g,onClickConnectStart:x,onClickConnectEnd:h,nodesDraggable:cn,autoPanOnNodeFocus:lo,nodesConnectable:jt,nodesFocusable:Ht,edgesFocusable:bs,edgesReconnectable:Hr,elementsSelectable:Vr,elevateNodesOnSelect:Z2,elevateEdgesOnSelect:Q2,minZoom:fo,maxZoom:po,nodeExtent:Pf,onNodesChange:H2,onEdgesChange:V2,snapToGrid:J,snapGrid:ie,connectionMode:H,translateExtent:Ur,connectOnClick:Y2,defaultEdgeOptions:K2,fitView:$g,fitViewOptions:Jg,onNodesDelete:R,onEdgesDelete:A,onDelete:P,onNodeDragStart:k,onNodeDrag:D,onNodeDragStop:E,onSelectionDrag:T,onSelectionDragStart:C,onSelectionDragStop:q,onMove:u,onMoveStart:f,onMoveEnd:d,noPanClassName:Wg,nodeOrigin:uo,rfId:Lf,autoPanOnConnect:W2,autoPanOnNodeDrag:$2,autoPanSpeed:eC,onError:oC,connectionRadius:nC,isValidConnection:tC,selectNodesOnDrag:we,nodeDragThreshold:iC,connectionDragThreshold:aC,onBeforeDelete:V,debug:fC,ariaLabelConfig:pC,zIndexMode:o0}),(0,z.jsx)(KI,{onInit:l,onNodeClick:s,onEdgeClick:c,onNodeMouseEnter:v,onNodeMouseMove:y,onNodeMouseLeave:w,onNodeContextMenu:b,onNodeDoubleClick:_,nodeTypes:i,edgeTypes:a,connectionLineType:U,connectionLineStyle:Y,connectionLineComponent:F,connectionLineContainerStyle:G,selectionKeyCode:W,selectionOnDrag:j,selectionMode:X,deleteKeyCode:oe,multiSelectionKeyCode:ne,panActivationKeyCode:Z,zoomActivationKeyCode:Q,onlyRenderVisibleElements:fe,defaultViewport:qt,translateExtent:Ur,minZoom:fo,maxZoom:po,preventScrolling:Bf,zoomOnScroll:y2,zoomOnPinch:g2,zoomOnDoubleClick:b2,panOnScroll:v2,panOnScrollSpeed:x2,panOnScrollMode:w2,panOnDrag:k2,autoPanOnSelection:J2,onPaneClick:S2,onPaneMouseEnter:_2,onPaneMouseMove:D2,onPaneMouseLeave:E2,onPaneScroll:C2,onPaneContextMenu:T2,paneClickDistance:q2,nodeClickDistance:R2,onSelectionContextMenu:M,onSelectionStart:N,onSelectionEnd:O,onReconnect:A2,onReconnectStart:N2,onReconnectEnd:I2,onEdgeContextMenu:O2,onEdgeDoubleClick:z2,onEdgeMouseEnter:B2,onEdgeMouseMove:P2,onEdgeMouseLeave:L2,reconnectRadius:j2,defaultMarkerColor:h2,noDragClassName:U2,noWheelClassName:F2,noPanClassName:Wg,rfId:Lf,disableKeyboardA11y:e0,nodeExtent:Pf,viewport:sC,onViewportChange:cC,nodesDraggable:cn}),(0,z.jsx)(kN,{onSelectionChange:I}),M2,(0,z.jsx)(gN,{proOptions:X2,position:G2}),(0,z.jsx)(yN,{rfId:Lf,disableKeyboardA11y:e0})]})})}var RD=rD(JI);var C9=at.error014();function eO({dimensions:e,lineWidth:n,variant:t,className:o}){return(0,z.jsx)("path",{strokeWidth:n,d:`M${e[0]/2} 0 V${e[1]} M0 ${e[1]/2} H${e[0]}`,className:Ve(["react-flow__background-pattern",t,o])})}function nO({radius:e,className:n}){return(0,z.jsx)("circle",{cx:e,cy:e,r:e,className:Ve(["react-flow__background-pattern","dots",n])})}var qr;(function(e){e.Lines="lines",e.Dots="dots",e.Cross="cross"})(qr||(qr={}));var tO={[qr.Dots]:1,[qr.Lines]:1,[qr.Cross]:6},oO=e=>({transform:e.transform,patternId:`pattern-${e.rfId}`});function MD({id:e,variant:n=qr.Dots,gap:t=20,size:o,lineWidth:r=1,offset:i=0,color:a,bgColor:s,style:c,className:l,patternClassName:u}){let f=(0,B.useRef)(null),{transform:d,patternId:p}=ue(oO,Ie),m=o||tO[n],g=n===qr.Dots,x=n===qr.Cross,h=Array.isArray(t)?t:[t,t],v=[h[0]*d[2]||1,h[1]*d[2]||1],y=m*d[2],w=Array.isArray(i)?i:[i,i],b=x?[y,y]:v,_=[w[0]*d[2]+b[0]/2,w[1]*d[2]+b[1]/2],k=`${p}${e||""}`;return(0,z.jsxs)("svg",{className:Ve(["react-flow__background",l]),style:{...c,...af,"--xy-background-color-props":s,"--xy-background-pattern-color-props":a},ref:f,"data-testid":"rf__background",children:[(0,z.jsx)("pattern",{id:k,x:d[0]%v[0],y:d[1]%v[1],width:v[0],height:v[1],patternUnits:"userSpaceOnUse",patternTransform:`translate(-${_[0]},-${_[1]})`,children:g?(0,z.jsx)(nO,{radius:y/2,className:u}):(0,z.jsx)(eO,{dimensions:b,lineWidth:r,variant:n,className:u})}),(0,z.jsx)("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:`url(#${k})`})]})}MD.displayName="Background";var AD=(0,B.memo)(MD);function rO(){return(0,z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",children:(0,z.jsx)("path",{d:"M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z"})})}function iO(){return(0,z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 5",children:(0,z.jsx)("path",{d:"M0 0h32v4.2H0z"})})}function aO(){return(0,z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 30",children:(0,z.jsx)("path",{d:"M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z"})})}function sO(){return(0,z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32",children:(0,z.jsx)("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"})})}function cO(){return(0,z.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 25 32",children:(0,z.jsx)("path",{d:"M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"})})}function nf({children:e,className:n,...t}){return(0,z.jsx)("button",{type:"button",className:Ve(["react-flow__controls-button",n]),...t,children:e})}var lO=e=>({isInteractive:e.nodesDraggable||e.nodesConnectable||e.elementsSelectable,minZoomReached:e.transform[2]<=e.minZoom,maxZoomReached:e.transform[2]>=e.maxZoom,ariaLabelConfig:e.ariaLabelConfig});function ND({style:e,showZoom:n=!0,showFitView:t=!0,showInteractive:o=!0,fitViewOptions:r,onZoomIn:i,onZoomOut:a,onFitView:s,onInteractiveChange:c,className:l,children:u,position:f="bottom-left",orientation:d="vertical","aria-label":p}){let m=Me(),{isInteractive:g,minZoomReached:x,maxZoomReached:h,ariaLabelConfig:v}=ue(lO,Ie),{zoomIn:y,zoomOut:w,fitView:b}=$c(),_=()=>{y(),i?.()},k=()=>{w(),a?.()},D=()=>{b(r),s?.()},E=()=>{m.setState({nodesDraggable:!g,nodesConnectable:!g,elementsSelectable:!g}),c?.(!g)};return(0,z.jsxs)(rf,{className:Ve(["react-flow__controls",d==="horizontal"?"horizontal":"vertical",l]),position:f,style:e,"data-testid":"rf__controls","aria-label":p??v["controls.ariaLabel"],children:[n&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(nf,{onClick:_,className:"react-flow__controls-zoomin",title:v["controls.zoomIn.ariaLabel"],"aria-label":v["controls.zoomIn.ariaLabel"],disabled:h,children:(0,z.jsx)(rO,{})}),(0,z.jsx)(nf,{onClick:k,className:"react-flow__controls-zoomout",title:v["controls.zoomOut.ariaLabel"],"aria-label":v["controls.zoomOut.ariaLabel"],disabled:x,children:(0,z.jsx)(iO,{})})]}),t&&(0,z.jsx)(nf,{className:"react-flow__controls-fitview",onClick:D,title:v["controls.fitView.ariaLabel"],"aria-label":v["controls.fitView.ariaLabel"],children:(0,z.jsx)(aO,{})}),o&&(0,z.jsx)(nf,{className:"react-flow__controls-interactive",onClick:E,title:v["controls.interactive.ariaLabel"],"aria-label":v["controls.interactive.ariaLabel"],children:g?(0,z.jsx)(cO,{}):(0,z.jsx)(sO,{})}),u]})}ND.displayName="Controls";var ID=(0,B.memo)(ND);function uO({id:e,x:n,y:t,width:o,height:r,style:i,color:a,strokeColor:s,strokeWidth:c,className:l,borderRadius:u,shapeRendering:f,selected:d,onClick:p}){let{background:m,backgroundColor:g}=i||{},x=a||m||g;return(0,z.jsx)("rect",{className:Ve(["react-flow__minimap-node",{selected:d},l]),x:n,y:t,rx:u,ry:u,width:o,height:r,style:{fill:x,stroke:s,strokeWidth:c},shapeRendering:f,onClick:p?h=>p(h,e):void 0})}var dO=(0,B.memo)(uO),fO=e=>e.nodes.map(n=>n.id),Iy=e=>e instanceof Function?e:()=>e;function pO({nodeStrokeColor:e,nodeColor:n,nodeClassName:t="",nodeBorderRadius:o=5,nodeStrokeWidth:r,nodeComponent:i=dO,onClick:a}){let s=ue(fO,Ie),c=Iy(n),l=Iy(e),u=Iy(t),f=typeof window>"u"||window.chrome?"crispEdges":"geometricPrecision";return(0,z.jsx)(z.Fragment,{children:s.map(d=>(0,z.jsx)(hO,{id:d,nodeColorFunc:c,nodeStrokeColorFunc:l,nodeClassNameFunc:u,nodeBorderRadius:o,nodeStrokeWidth:r,NodeComponent:i,onClick:a,shapeRendering:f},d))})}function mO({id:e,nodeColorFunc:n,nodeStrokeColorFunc:t,nodeClassNameFunc:o,nodeBorderRadius:r,nodeStrokeWidth:i,shapeRendering:a,NodeComponent:s,onClick:c}){let{node:l,x:u,y:f,width:d,height:p}=ue(m=>{let g=m.nodeLookup.get(e);if(!g)return{node:void 0,x:0,y:0,width:0,height:0};let x=g.internals.userNode,{x:h,y:v}=g.internals.positionAbsolute,{width:y,height:w}=St(x);return{node:x,x:h,y:v,width:y,height:w}},Ie);return!l||l.hidden||!vy(l)?null:(0,z.jsx)(s,{x:u,y:f,width:d,height:p,style:l.style,selected:!!l.selected,className:o(l),color:n(l),borderRadius:r,strokeColor:t(l),strokeWidth:i,shapeRendering:a,onClick:c,id:l.id})}var hO=(0,B.memo)(mO),yO=(0,B.memo)(pO),gO=200,vO=150,xO=e=>!e.hidden,wO=e=>{let n={x:-e.transform[0]/e.transform[2],y:-e.transform[1]/e.transform[2],width:e.width/e.transform[2],height:e.height/e.transform[2]},t=!1;for(let o of e.nodeLookup.values())if(!o.hidden){t=!0;break}return{viewBB:n,boundingRect:t?hy(Ja(e.nodeLookup,{filter:xO}),n):n,rfId:e.rfId,panZoom:e.panZoom,translateExtent:e.translateExtent,flowWidth:e.width,flowHeight:e.height,ariaLabelConfig:e.ariaLabelConfig}},$_=(e,n)=>e.x===n.x&&e.y===n.y&&e.width===n.width&&e.height===n.height,bO=(e,n)=>$_(e.viewBB,n.viewBB)&&$_(e.boundingRect,n.boundingRect)&&e.rfId===n.rfId&&e.panZoom===n.panZoom&&e.translateExtent===n.translateExtent&&e.flowWidth===n.flowWidth&&e.flowHeight===n.flowHeight&&e.ariaLabelConfig===n.ariaLabelConfig,kO="react-flow__minimap-desc";function OD({style:e,className:n,nodeStrokeColor:t,nodeColor:o,nodeClassName:r="",nodeBorderRadius:i=5,nodeStrokeWidth:a,nodeComponent:s,bgColor:c,maskColor:l,maskStrokeColor:u,maskStrokeWidth:f,position:d="bottom-right",onClick:p,onNodeClick:m,pannable:g=!1,zoomable:x=!1,ariaLabel:h,inversePan:v,zoomStep:y=1,offsetScale:w=5}){let b=Me(),_=(0,B.useRef)(null),{boundingRect:k,panZoom:D,viewBB:E,rfId:R,translateExtent:A,flowWidth:P,flowHeight:I,ariaLabelConfig:C}=ue(wO,bO),T=e?.width??gO,q=e?.height??vO,M=k.width/T,N=k.height/q,O=Math.max(M,N),V=O*T,H=O*q,U=w*O,Y=k.x-(V-k.width)/2-U,F=k.y-(H-k.height)/2-U,G=V+U*2,oe=H+U*2,W=`${kO}-${R}`,j=(0,B.useRef)(0),X=(0,B.useRef)();j.current=O,(0,B.useEffect)(()=>{let ie=b.getState().panZoom;if(_.current&&ie)return X.current=a_({domNode:_.current,panZoom:ie,getTransform:()=>b.getState().transform,getViewScale:()=>j.current}),()=>{X.current?.destroy()}},[D]),(0,B.useEffect)(()=>{X.current?.update({translateExtent:A,width:P,height:I,inversePan:v,pannable:g,zoomStep:y,zoomable:x})},[g,x,v,y,A,P,I]);let Z=p?ie=>{let[fe,we]=X.current?.pointer(ie)||[0,0];p(ie,{x:fe,y:we})}:void 0,ne=(0,B.useCallback)((ie,fe)=>{let we=b.getState().nodeLookup.get(fe).internals.userNode;m?.(ie,we)},[m]),Q=m?ne:void 0,J=h??C["minimap.ariaLabel"];return(0,z.jsx)(rf,{position:d,style:{...e,"--xy-minimap-background-color-props":typeof c=="string"?c:void 0,"--xy-minimap-mask-background-color-props":typeof l=="string"?l:void 0,"--xy-minimap-mask-stroke-color-props":typeof u=="string"?u:void 0,"--xy-minimap-mask-stroke-width-props":typeof f=="number"?f*O:void 0,"--xy-minimap-node-background-color-props":typeof o=="string"?o:void 0,"--xy-minimap-node-stroke-color-props":typeof t=="string"?t:void 0,"--xy-minimap-node-stroke-width-props":typeof a=="number"?a:void 0},className:Ve(["react-flow__minimap",n]),"data-testid":"rf__minimap",children:(0,z.jsxs)("svg",{width:T,height:q,viewBox:`${Y} ${F} ${G} ${oe}`,className:"react-flow__minimap-svg",role:"img","aria-labelledby":W,ref:_,onClick:Z,children:[J&&(0,z.jsx)("title",{id:W,children:J}),(0,z.jsx)(yO,{onClick:Q,nodeColor:o,nodeStrokeColor:t,nodeBorderRadius:i,nodeClassName:r,nodeStrokeWidth:a,nodeComponent:s}),(0,z.jsx)("path",{className:"react-flow__minimap-mask",d:`M${Y-U},${F-U}h${G+U*2}v${oe+U*2}h${-G-U*2}z
        M${E.x},${E.y}h${E.width}v${E.height}h${-E.width}z`,fillRule:"evenodd",pointerEvents:"none"})]})})}OD.displayName="MiniMap";var T9=(0,B.memo)(OD),SO=e=>n=>e?`${Math.max(1/n.transform[2],1)}`:void 0,_O={[Tr.Line]:"right",[Tr.Handle]:"bottom-right"};function DO({nodeId:e,position:n,variant:t=Tr.Handle,className:o,style:r=void 0,children:i,color:a,minWidth:s=10,minHeight:c=10,maxWidth:l=Number.MAX_VALUE,maxHeight:u=Number.MAX_VALUE,keepAspectRatio:f=!1,resizeDirection:d,autoScale:p=!0,shouldResize:m,onResizeStart:g,onResize:x,onResizeEnd:h}){let v=lD(),y=typeof e=="string"?e:v,w=Me(),b=(0,B.useRef)(null),_=t===Tr.Handle,k=ue((0,B.useCallback)(SO(_&&p),[_,p]),Ie),D=(0,B.useRef)(null),E=n??_O[t];(0,B.useEffect)(()=>{if(!(!b.current||!y))return D.current||(D.current=d_({domNode:b.current,nodeId:y,getStoreItems:()=>{let{nodeLookup:A,transform:P,snapGrid:I,snapToGrid:C,nodeOrigin:T,domNode:q}=w.getState();return{nodeLookup:A,transform:P,snapGrid:I,snapToGrid:C,nodeOrigin:T,paneDomNode:q}},onChange:(A,P)=>{let{triggerNodeChanges:I,nodeLookup:C,parentLookup:T,nodeOrigin:q}=w.getState(),M=[],N={x:A.x,y:A.y},O=C.get(y);if(O&&O.expandParent&&O.parentId){let V=O.origin??q,H=A.width??O.measured.width??0,U=A.height??O.measured.height??0,Y={id:O.id,parentId:O.parentId,rect:{width:H,height:U,...xy({x:A.x??O.position.x,y:A.y??O.position.y},{width:H,height:U},O.parentId,C,V)}},F=Qd([Y],C,T,q);M.push(...F),N.x=A.x?Math.max(V[0]*H,A.x):void 0,N.y=A.y?Math.max(V[1]*U,A.y):void 0}if(N.x!==void 0&&N.y!==void 0){let V={id:y,type:"position",position:{...N}};M.push(V)}if(A.width!==void 0&&A.height!==void 0){let H={id:y,type:"dimensions",resizing:!0,setAttributes:d?d==="horizontal"?"width":"height":!0,dimensions:{width:A.width,height:A.height}};M.push(H)}for(let V of P){let H={...V,type:"position"};M.push(H)}I(M)},onEnd:({width:A,height:P})=>{let I={id:y,type:"dimensions",resizing:!1,dimensions:{width:A,height:P}};w.getState().triggerNodeChanges([I])}})),D.current.update({controlPosition:E,boundaries:{minWidth:s,minHeight:c,maxWidth:l,maxHeight:u},keepAspectRatio:f,resizeDirection:d,onResizeStart:g,onResize:x,onResizeEnd:h,shouldResize:m}),()=>{D.current?.destroy()}},[E,s,c,l,u,f,g,x,h,m]);let R=E.split("-");return(0,z.jsx)("div",{className:Ve(["react-flow__resize-control","nodrag",...R,t,o]),ref:b,style:{...r,scale:k,...a&&{[_?"backgroundColor":"borderColor"]:a}},children:i})}var q9=(0,B.memo)(DO);function Oo(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function FD(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n}var Xn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},rl={duration:.5,overwrite:!1,delay:0},ng,gn,Oe,Dt=1e8,Ee=1/Dt,Yy=Math.PI*2,EO=Yy/4,CO=0,YD=Math.sqrt,TO=Math.cos,qO=Math.sin,nn=function(n){return typeof n=="string"},Fe=function(n){return typeof n=="function"},Bo=function(n){return typeof n=="number"},yf=function(n){return typeof n>"u"},so=function(n){return typeof n=="object"},Gn=function(n){return n!==!1},tg=function(){return typeof window<"u"},sf=function(n){return Fe(n)||nn(n)},GD=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Sn=Array.isArray,RO=/random\([^)]+\)/g,MO=/,\s*/g,zD=/(?:-?\.?\d|\.)+/gi,og=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Oi=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Py=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,rg=/[+-]=-?[.\d]+/,AO=/[^,'"\[\]\s]+/gi,NO=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Pe,io,Gy,ig,ct={},df={},XD,KD=function(n){return(df=cs(n,ct))&&_n},gf=function(n,t){return console.warn("Invalid property",n,"set to",t,"Missing plugin? gsap.registerPlugin()")},il=function(n,t){return!t&&console.warn(n)},ZD=function(n,t){return n&&(ct[n]=t)&&df&&(df[n]=t)||ct},al=function(){return 0},IO={suppressEvents:!0,isStart:!0,kill:!1},cf={suppressEvents:!0,kill:!1},OO={suppressEvents:!0},ag={},Mr=[],Xy={},QD,Fn={},Ly={},BD=30,lf=[],sg="",cg=function(n){var t=n[0],o,r;if(so(t)||Fe(t)||(n=[n]),!(o=(t._gsap||{}).harness)){for(r=lf.length;r--&&!lf[r].targetTest(t););o=lf[r]}for(r=n.length;r--;)n[r]&&(n[r]._gsap||(n[r]._gsap=new fg(n[r],o)))||n.splice(r,1);return n},Ar=function(n){return n._gsap||cg(Et(n))[0]._gsap},lg=function(n,t,o){return(o=n[t])&&Fe(o)?n[t]():yf(o)&&n.getAttribute&&n.getAttribute(t)||o},Nn=function(n,t){return(n=n.split(",")).forEach(t)||n},Ye=function(n){return Math.round(n*1e5)/1e5||0},Be=function(n){return Math.round(n*1e7)/1e7||0},zi=function(n,t){var o=t.charAt(0),r=parseFloat(t.substr(2));return n=parseFloat(n),o==="+"?n+r:o==="-"?n-r:o==="*"?n*r:n/r},zO=function(n,t){for(var o=t.length,r=0;n.indexOf(t[r])<0&&++r<o;);return r<o},ff=function(){var n=Mr.length,t=Mr.slice(0),o,r;for(Xy={},Mr.length=0,o=0;o<n;o++)r=t[o],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ug=function(n){return!!(n._initted||n._startAt||n.add)},WD=function(n,t,o,r){Mr.length&&!gn&&ff(),n.render(t,o,r||!!(gn&&t<0&&ug(n))),Mr.length&&!gn&&ff()},$D=function(n){var t=parseFloat(n);return(t||t===0)&&(n+"").match(AO).length<2?t:nn(n)?n.trim():n},JD=function(n){return n},lt=function(n,t){for(var o in t)o in n||(n[o]=t[o]);return n},BO=function(n){return function(t,o){for(var r in o)r in t||r==="duration"&&n||r==="ease"||(t[r]=o[r])}},cs=function(n,t){for(var o in t)n[o]=t[o];return n},PD=function e(n,t){for(var o in t)o!=="__proto__"&&o!=="constructor"&&o!=="prototype"&&(n[o]=so(t[o])?e(n[o]||(n[o]={}),t[o]):t[o]);return n},pf=function(n,t){var o={},r;for(r in n)r in t||(o[r]=n[r]);return o},nl=function(n){var t=n.parent||Pe,o=n.keyframes?BO(Sn(n.keyframes)):lt;if(Gn(n.inherit))for(;t;)o(n,t.vars.defaults),t=t.parent||t._dp;return n},PO=function(n,t){for(var o=n.length,r=o===t.length;r&&o--&&n[o]===t[o];);return o<0},eE=function(n,t,o,r,i){o===void 0&&(o="_first"),r===void 0&&(r="_last");var a=n[r],s;if(i)for(s=t[i];a&&a[i]>s;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=n[o],n[o]=t),t._next?t._next._prev=t:n[r]=t,t._prev=a,t.parent=t._dp=n,t},vf=function(n,t,o,r){o===void 0&&(o="_first"),r===void 0&&(r="_last");var i=t._prev,a=t._next;i?i._next=a:n[o]===t&&(n[o]=a),a?a._prev=i:n[r]===t&&(n[r]=i),t._next=t._prev=t.parent=null},Nr=function(n,t){n.parent&&(!t||n.parent.autoRemoveChildren)&&n.parent.remove&&n.parent.remove(n),n._act=0},Ai=function(n,t){if(n&&(!t||t._end>n._dur||t._start<0))for(var o=n;o;)o._dirty=1,o=o.parent;return n},LO=function(n){for(var t=n.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return n},Ky=function(n,t,o,r){return n._startAt&&(gn?n._startAt.revert(cf):n.vars.immediateRender&&!n.vars.autoRevert||n._startAt.render(t,!0,r))},jO=function e(n){return!n||n._ts&&e(n.parent)},LD=function(n){return n._repeat?ls(n._tTime,n=n.duration()+n._rDelay)*n:0},ls=function(n,t){var o=Math.floor(n=Be(n/t));return n&&o===n?o-1:o},mf=function(n,t){return(n-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},xf=function(n){return n._end=Be(n._start+(n._tDur/Math.abs(n._ts||n._rts||Ee)||0))},wf=function(n,t){var o=n._dp;return o&&o.smoothChildTiming&&n._ts&&(n._start=Be(o._time-(n._ts>0?t/n._ts:((n._dirty?n.totalDuration():n._tDur)-t)/-n._ts)),xf(n),o._dirty||Ai(o,n)),n},nE=function(n,t){var o;if((t._time||!t._dur&&t._initted||t._start<n._time&&(t._dur||!t.add))&&(o=mf(n.rawTime(),t),(!t._dur||ll(0,t.totalDuration(),o)-t._tTime>Ee)&&t.render(o,!0)),Ai(n,t)._dp&&n._initted&&n._time>=n._dur&&n._ts){if(n._dur<n.duration())for(o=n;o._dp;)o.rawTime()>=0&&o.totalTime(o._tTime),o=o._dp;n._zTime=-Ee}},ao=function(n,t,o,r){return t.parent&&Nr(t),t._start=Be((Bo(o)?o:o||n!==Pe?_t(n,o,t):n._time)+t._delay),t._end=Be(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),eE(n,t,"_first","_last",n._sort?"_start":0),Zy(t)||(n._recent=t),r||nE(n,t),n._ts<0&&wf(n,n._tTime),n},tE=function(n,t){return(ct.ScrollTrigger||gf("scrollTrigger",t))&&ct.ScrollTrigger.create(t,n)},oE=function(n,t,o,r,i){if(hg(n,t,i),!n._initted)return 1;if(!o&&n._pt&&!gn&&(n._dur&&n.vars.lazy!==!1||!n._dur&&n.vars.lazy)&&QD!==Yn.frame)return Mr.push(n),n._lazy=[i,r],1},HO=function e(n){var t=n.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||e(t))},Zy=function(n){var t=n.data;return t==="isFromStart"||t==="isStart"},VO=function(n,t,o,r){var i=n.ratio,a=t<0||!t&&(!n._start&&HO(n)&&!(!n._initted&&Zy(n))||(n._ts<0||n._dp._ts<0)&&!Zy(n))?0:1,s=n._rDelay,c=0,l,u,f;if(s&&n._repeat&&(c=ll(0,n._tDur,t),u=ls(c,s),n._yoyo&&u&1&&(a=1-a),u!==ls(n._tTime,s)&&(i=1-a,n.vars.repeatRefresh&&n._initted&&n.invalidate())),a!==i||gn||r||n._zTime===Ee||!t&&n._zTime){if(!n._initted&&oE(n,t,r,o,c))return;for(f=n._zTime,n._zTime=t||(o?Ee:0),o||(o=t&&!f),n.ratio=a,n._from&&(a=1-a),n._time=0,n._tTime=c,l=n._pt;l;)l.r(a,l.d),l=l._next;t<0&&Ky(n,t,o,!0),n._onUpdate&&!o&&st(n,"onUpdate"),c&&n._repeat&&!o&&n.parent&&st(n,"onRepeat"),(t>=n._tDur||t<0)&&n.ratio===a&&(a&&Nr(n,1),!o&&!gn&&(st(n,a?"onComplete":"onReverseComplete",!0),n._prom&&n._prom()))}else n._zTime||(n._zTime=t)},UO=function(n,t,o){var r;if(o>t)for(r=n._first;r&&r._start<=o;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=n._last;r&&r._start>=o;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},us=function(n,t,o,r){var i=n._repeat,a=Be(t)||0,s=n._tTime/n._tDur;return s&&!r&&(n._time*=a/n._dur),n._dur=a,n._tDur=i?i<0?1e10:Be(a*(i+1)+n._rDelay*i):a,s>0&&!r&&wf(n,n._tTime=n._tDur*s),n.parent&&xf(n),o||Ai(n.parent,n),n},jD=function(n){return n instanceof kn?Ai(n):us(n,n._dur)},FO={_start:0,endTime:al,totalDuration:al},_t=function e(n,t,o){var r=n.labels,i=n._recent||FO,a=n.duration()>=Dt?i.endTime(!1):n._dur,s,c,l;return nn(t)&&(isNaN(t)||t in r)?(c=t.charAt(0),l=t.substr(-1)==="%",s=t.indexOf("="),c==="<"||c===">"?(s>=0&&(t=t.replace(/=/,"")),(c==="<"?i._start:i.endTime(i._repeat>=0))+(parseFloat(t.substr(1))||0)*(l?(s<0?i:o).totalDuration()/100:1)):s<0?(t in r||(r[t]=a),r[t]):(c=parseFloat(t.charAt(s-1)+t.substr(s+1)),l&&o&&(c=c/100*(Sn(o)?o[0]:o).totalDuration()),s>1?e(n,t.substr(0,s-1),o)+c:a+c)):t==null?a:+t},tl=function(n,t,o){var r=Bo(t[1]),i=(r?2:1)+(n<2?0:1),a=t[i],s,c;if(r&&(a.duration=t[1]),a.parent=o,n){for(s=a,c=o;c&&!("immediateRender"in s);)s=c.vars.defaults||{},c=Gn(c.vars.inherit)&&c.parent;a.immediateRender=Gn(s.immediateRender),n<2?a.runBackwards=1:a.startAt=t[i-1]}return new Xe(t[0],a,t[i+1])},Ir=function(n,t){return n||n===0?t(n):t},ll=function(n,t,o){return o<n?n:o>t?t:o},vn=function(n,t){return!nn(n)||!(t=NO.exec(n))?"":t[1]},YO=function(n,t,o){return Ir(o,function(r){return ll(n,t,r)})},Qy=[].slice,rE=function(n,t){return n&&so(n)&&"length"in n&&(!t&&!n.length||n.length-1 in n&&so(n[0]))&&!n.nodeType&&n!==io},GO=function(n,t,o){return o===void 0&&(o=[]),n.forEach(function(r){var i;return nn(r)&&!t||rE(r,1)?(i=o).push.apply(i,Et(r)):o.push(r)})||o},Et=function(n,t,o){return Oe&&!t&&Oe.selector?Oe.selector(n):nn(n)&&!o&&(Gy||!ds())?Qy.call((t||ig).querySelectorAll(n),0):Sn(n)?GO(n,o):rE(n)?Qy.call(n,0):n?[n]:[]},Wy=function(n){return n=Et(n)[0]||il("Invalid scope")||{},function(t){var o=n.current||n.nativeElement||n;return Et(t,o.querySelectorAll?o:o===n?il("Invalid scope")||ig.createElement("div"):n)}},iE=function(n){return n.sort(function(){return .5-Math.random()})},aE=function(n){if(Fe(n))return n;var t=so(n)?n:{each:n},o=Ni(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},s=r>0&&r<1,c=isNaN(r)||s,l=t.axis,u=r,f=r;return nn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!s&&c&&(u=r[0],f=r[1]),function(d,p,m){var g=(m||t).length,x=a[g],h,v,y,w,b,_,k,D,E;if(!x){if(E=t.grid==="auto"?0:(t.grid||[1,Dt])[1],!E){for(k=-Dt;k<(k=m[E++].getBoundingClientRect().left)&&E<g;);E<g&&E--}for(x=a[g]=[],h=c?Math.min(E,g)*u-.5:r%E,v=E===Dt?0:c?g*f/E-.5:r/E|0,k=0,D=Dt,_=0;_<g;_++)y=_%E-h,w=v-(_/E|0),x[_]=b=l?Math.abs(l==="y"?w:y):YD(y*y+w*w),b>k&&(k=b),b<D&&(D=b);r==="random"&&iE(x),x.max=k-D,x.min=D,x.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(E>g?g-1:l?l==="y"?g/E:E:Math.max(E,g/E))||0)*(r==="edges"?-1:1),x.b=g<0?i-g:i,x.u=vn(t.amount||t.each)||0,o=o&&g<0?i3(o):o}return g=(x[d]-x.min)/x.max||0,Be(x.b+(o?o(g):g)*x.v)+x.u}},$y=function(n){var t=Math.pow(10,((n+"").split(".")[1]||"").length);return function(o){var r=Be(Math.round(parseFloat(o)/n)*n*t);return(r-r%1)/t+(Bo(o)?0:vn(o))}},sE=function(n,t){var o=Sn(n),r,i;return!o&&so(n)&&(r=o=n.radius||Dt,n.values?(n=Et(n.values),(i=!Bo(n[0]))&&(r*=r)):n=$y(n.increment)),Ir(t,o?Fe(n)?function(a){return i=n(a),Math.abs(i-a)<=r?i:a}:function(a){for(var s=parseFloat(i?a.x:a),c=parseFloat(i?a.y:0),l=Dt,u=0,f=n.length,d,p;f--;)i?(d=n[f].x-s,p=n[f].y-c,d=d*d+p*p):d=Math.abs(n[f]-s),d<l&&(l=d,u=f);return u=!r||l<=r?n[u]:a,i||u===a||Bo(a)?u:u+vn(a)}:$y(n))},cE=function(n,t,o,r){return Ir(Sn(n)?!t:o===!0?!!(o=0):!r,function(){return Sn(n)?n[~~(Math.random()*n.length)]:(o=o||1e-5)&&(r=o<1?Math.pow(10,(o+"").length-2):1)&&Math.floor(Math.round((n-o/2+Math.random()*(t-n+o*.99))/o)*o*r)/r})},XO=function(){for(var n=arguments.length,t=new Array(n),o=0;o<n;o++)t[o]=arguments[o];return function(r){return t.reduce(function(i,a){return a(i)},r)}},KO=function(n,t){return function(o){return n(parseFloat(o))+(t||vn(o))}},ZO=function(n,t,o){return uE(n,t,0,1,o)},lE=function(n,t,o){return Ir(o,function(r){return n[~~t(r)]})},QO=function e(n,t,o){var r=t-n;return Sn(n)?lE(n,e(0,n.length),t):Ir(o,function(i){return(r+(i-n)%r)%r+n})},WO=function e(n,t,o){var r=t-n,i=r*2;return Sn(n)?lE(n,e(0,n.length-1),t):Ir(o,function(a){return a=(i+(a-n)%i)%i||0,n+(a>r?i-a:a)})},fs=function(n){return n.replace(RO,function(t){var o=t.indexOf("[")+1,r=t.substring(o||7,o?t.indexOf("]"):t.length-1).split(MO);return cE(o?r:+r[0],o?0:+r[1],+r[2]||1e-5)})},uE=function(n,t,o,r,i){var a=t-n,s=r-o;return Ir(i,function(c){return o+((c-n)/a*s||0)})},$O=function e(n,t,o,r){var i=isNaN(n+t)?0:function(p){return(1-p)*n+p*t};if(!i){var a=nn(n),s={},c,l,u,f,d;if(o===!0&&(r=1)&&(o=null),a)n={p:n},t={p:t};else if(Sn(n)&&!Sn(t)){for(u=[],f=n.length,d=f-2,l=1;l<f;l++)u.push(e(n[l-1],n[l]));f--,i=function(m){m*=f;var g=Math.min(d,~~m);return u[g](m-g)},o=t}else r||(n=cs(Sn(n)?[]:{},n));if(!u){for(c in t)pg.call(s,n,c,"get",t[c]);i=function(m){return vg(m,s)||(a?n.p:n)}}}return Ir(o,i)},HD=function(n,t,o){var r=n.labels,i=Dt,a,s,c;for(a in r)s=r[a]-t,s<0==!!o&&s&&i>(s=Math.abs(s))&&(c=a,i=s);return c},st=function(n,t,o){var r=n.vars,i=r[t],a=Oe,s=n._ctx,c,l,u;if(i)return c=r[t+"Params"],l=r.callbackScope||n,o&&Mr.length&&ff(),s&&(Oe=s),u=c?i.apply(l,c):i.call(l),Oe=a,u},Jc=function(n){return Nr(n),n.scrollTrigger&&n.scrollTrigger.kill(!!gn),n.progress()<1&&st(n,"onInterrupt"),n},ss,dE=[],fE=function(n){if(n)if(n=!n.name&&n.default||n,tg()||n.headless){var t=n.name,o=Fe(n),r=t&&!o&&n.init?function(){this._props=[]}:n,i={init:al,render:vg,add:pg,kill:h3,modifier:m3,rawVars:0},a={targetTest:0,get:0,getSetter:bf,aliases:{},register:0};if(ds(),n!==r){if(Fn[t])return;lt(r,lt(pf(n,i),a)),cs(r.prototype,cs(i,pf(n,a))),Fn[r.prop=t]=r,n.targetTest&&(lf.push(r),ag[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}ZD(t,r),n.register&&n.register(_n,r,In)}else dE.push(n)},De=255,el={aqua:[0,De,De],lime:[0,De,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,De],navy:[0,0,128],white:[De,De,De],olive:[128,128,0],yellow:[De,De,0],orange:[De,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[De,0,0],pink:[De,192,203],cyan:[0,De,De],transparent:[De,De,De,0]},jy=function(n,t,o){return n+=n<0?1:n>1?-1:0,(n*6<1?t+(o-t)*n*6:n<.5?o:n*3<2?t+(o-t)*(2/3-n)*6:t)*De+.5|0},pE=function(n,t,o){var r=n?Bo(n)?[n>>16,n>>8&De,n&De]:0:el.black,i,a,s,c,l,u,f,d,p,m;if(!r){if(n.substr(-1)===","&&(n=n.substr(0,n.length-1)),el[n])r=el[n];else if(n.charAt(0)==="#"){if(n.length<6&&(i=n.charAt(1),a=n.charAt(2),s=n.charAt(3),n="#"+i+i+a+a+s+s+(n.length===5?n.charAt(4)+n.charAt(4):"")),n.length===9)return r=parseInt(n.substr(1,6),16),[r>>16,r>>8&De,r&De,parseInt(n.substr(7),16)/255];n=parseInt(n.substr(1),16),r=[n>>16,n>>8&De,n&De]}else if(n.substr(0,3)==="hsl"){if(r=m=n.match(zD),!t)c=+r[0]%360/360,l=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(l+1):u+l-u*l,i=u*2-a,r.length>3&&(r[3]*=1),r[0]=jy(c+1/3,i,a),r[1]=jy(c,i,a),r[2]=jy(c-1/3,i,a);else if(~n.indexOf("="))return r=n.match(og),o&&r.length<4&&(r[3]=1),r}else r=n.match(zD)||el.transparent;r=r.map(Number)}return t&&!m&&(i=r[0]/De,a=r[1]/De,s=r[2]/De,f=Math.max(i,a,s),d=Math.min(i,a,s),u=(f+d)/2,f===d?c=l=0:(p=f-d,l=u>.5?p/(2-f-d):p/(f+d),c=f===i?(a-s)/p+(a<s?6:0):f===a?(s-i)/p+2:(i-a)/p+4,c*=60),r[0]=~~(c+.5),r[1]=~~(l*100+.5),r[2]=~~(u*100+.5)),o&&r.length<4&&(r[3]=1),r},mE=function(n){var t=[],o=[],r=-1;return n.split(zo).forEach(function(i){var a=i.match(Oi)||[];t.push.apply(t,a),o.push(r+=a.length+1)}),t.c=o,t},VD=function(n,t,o){var r="",i=(n+r).match(zo),a=t?"hsla(":"rgba(",s=0,c,l,u,f;if(!i)return n;if(i=i.map(function(d){return(d=pE(d,t,1))&&a+(t?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),o&&(u=mE(n),c=o.c,c.join(r)!==u.c.join(r)))for(l=n.replace(zo,"1").split(Oi),f=l.length-1;s<f;s++)r+=l[s]+(~c.indexOf(s)?i.shift()||a+"0,0,0,0)":(u.length?u:i.length?i:o).shift());if(!l)for(l=n.split(zo),f=l.length-1;s<f;s++)r+=l[s]+i[s];return r+l[f]},zo=(function(){var e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",n;for(n in el)e+="|"+n+"\\b";return new RegExp(e+")","gi")})(),JO=/hsl[a]?\(/,dg=function(n){var t=n.join(" "),o;if(zo.lastIndex=0,zo.test(t))return o=JO.test(t),n[1]=VD(n[1],o),n[0]=VD(n[0],o,mE(n[1])),!0},sl,Yn=(function(){var e=Date.now,n=500,t=33,o=e(),r=o,i=1e3/240,a=i,s=[],c,l,u,f,d,p,m=function g(x){var h=e()-r,v=x===!0,y,w,b,_;if((h>n||h<0)&&(o+=h-t),r+=h,b=r-o,y=b-a,(y>0||v)&&(_=++f.frame,d=b-f.time*1e3,f.time=b=b/1e3,a+=y+(y>=i?4:i-y),w=1),v||(c=l(g)),w)for(p=0;p<s.length;p++)s[p](b,d,_,x)};return f={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(x){return d/(1e3/(x||60))},wake:function(){XD&&(!Gy&&tg()&&(io=Gy=window,ig=io.document||{},ct.gsap=_n,(io.gsapVersions||(io.gsapVersions=[])).push(_n.version),KD(df||io.GreenSockGlobals||!io.gsap&&io||{}),dE.forEach(fE)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&f.sleep(),l=u||function(x){return setTimeout(x,a-f.time*1e3+1|0)},sl=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),sl=0,l=al},lagSmoothing:function(x,h){n=x||1/0,t=Math.min(h||33,n)},fps:function(x){i=1e3/(x||240),a=f.time*1e3+i},add:function(x,h,v){var y=h?function(w,b,_,k){x(w,b,_,k),f.remove(y)}:x;return f.remove(x),s[v?"unshift":"push"](y),ds(),y},remove:function(x,h){~(h=s.indexOf(x))&&s.splice(h,1)&&p>=h&&p--},_listeners:s},f})(),ds=function(){return!sl&&Yn.wake()},le={},e3=/^[\d.\-M][\d.\-,\s]/,n3=/["']/g,t3=function(n){for(var t={},o=n.substr(1,n.length-3).split(":"),r=o[0],i=1,a=o.length,s,c,l;i<a;i++)c=o[i],s=i!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,s),t[r]=isNaN(l)?l.replace(n3,"").trim():+l,r=c.substr(s+1).trim();return t},o3=function(n){var t=n.indexOf("(")+1,o=n.indexOf(")"),r=n.indexOf("(",t);return n.substring(t,~r&&r<o?n.indexOf(")",o+1):o)},r3=function(n){var t=(n+"").split("("),o=le[t[0]];return o&&t.length>1&&o.config?o.config.apply(null,~n.indexOf("{")?[t3(t[1])]:o3(n).split(",").map($D)):le._CE&&e3.test(n)?le._CE("",n):o},i3=function(n){return function(t){return 1-n(1-t)}},Ni=function(n,t){return n&&(Fe(n)?n:le[n]||r3(n))||t},Bi=function(n,t,o,r){o===void 0&&(o=function(c){return 1-t(1-c)}),r===void 0&&(r=function(c){return c<.5?t(c*2)/2:1-t((1-c)*2)/2});var i={easeIn:t,easeOut:o,easeInOut:r},a;return Nn(n,function(s){le[s]=ct[s]=i,le[a=s.toLowerCase()]=o;for(var c in i)le[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=le[s+"."+c]=i[c]}),i},hE=function(n){return function(t){return t<.5?(1-n(1-t*2))/2:.5+n((t-.5)*2)/2}},Hy=function e(n,t,o){var r=t>=1?t:1,i=(o||(n?.3:.45))/(t<1?t:1),a=i/Yy*(Math.asin(1/r)||0),s=function(u){return u===1?1:r*Math.pow(2,-10*u)*qO((u-a)*i)+1},c=n==="out"?s:n==="in"?function(l){return 1-s(1-l)}:hE(s);return i=Yy/i,c.config=function(l,u){return e(n,l,u)},c},Vy=function e(n,t){t===void 0&&(t=1.70158);var o=function(a){return a?--a*a*((t+1)*a+t)+1:0},r=n==="out"?o:n==="in"?function(i){return 1-o(1-i)}:hE(o);return r.config=function(i){return e(n,i)},r};Nn("Linear,Quad,Cubic,Quart,Quint,Strong",function(e,n){var t=n<5?n+1:n;Bi(e+",Power"+(t-1),n?function(o){return Math.pow(o,t)}:function(o){return o},function(o){return 1-Math.pow(1-o,t)},function(o){return o<.5?Math.pow(o*2,t)/2:1-Math.pow((1-o)*2,t)/2})});le.Linear.easeNone=le.none=le.Linear.easeIn;Bi("Elastic",Hy("in"),Hy("out"),Hy());(function(e,n){var t=1/n,o=2*t,r=2.5*t,i=function(s){return s<t?e*s*s:s<o?e*Math.pow(s-1.5/n,2)+.75:s<r?e*(s-=2.25/n)*s+.9375:e*Math.pow(s-2.625/n,2)+.984375};Bi("Bounce",function(a){return 1-i(1-a)},i)})(7.5625,2.75);Bi("Expo",function(e){return Math.pow(2,10*(e-1))*e+e*e*e*e*e*e*(1-e)});Bi("Circ",function(e){return-(YD(1-e*e)-1)});Bi("Sine",function(e){return e===1?1:-TO(e*EO)+1});Bi("Back",Vy("in"),Vy("out"),Vy());le.SteppedEase=le.steps=ct.SteppedEase={config:function(n,t){n===void 0&&(n=1);var o=1/n,r=n+(t?0:1),i=t?1:0,a=1-Ee;return function(s){return((r*ll(0,a,s)|0)+i)*o}}};rl.ease=le["quad.out"];Nn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(e){return sg+=e+","+e+"Params,"});var fg=function(n,t){this.id=CO++,n._gsap=this,this.target=n,this.harness=t,this.get=t?t.get:lg,this.set=t?t.getSetter:bf},cl=(function(){function e(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,us(this,+t.duration,1,1),this.data=t.data,Oe&&(this._ctx=Oe,Oe.data.push(this)),sl||Yn.wake()}var n=e.prototype;return n.delay=function(o){return o||o===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+o-this._delay),this._delay=o,this):this._delay},n.duration=function(o){return arguments.length?this.totalDuration(this._repeat>0?o+(o+this._rDelay)*this._repeat:o):this.totalDuration()&&this._dur},n.totalDuration=function(o){return arguments.length?(this._dirty=0,us(this,this._repeat<0?o:(o-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},n.totalTime=function(o,r){if(ds(),!arguments.length)return this._tTime;var i=this._dp;if(i&&i.smoothChildTiming&&this._ts){for(wf(this,o),!i._dp||i.parent||nE(i,this);i&&i.parent;)i.parent._time!==i._start+(i._ts>=0?i._tTime/i._ts:(i.totalDuration()-i._tTime)/-i._ts)&&i.totalTime(i._tTime,!0),i=i.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&o<this._tDur||this._ts<0&&o>0||!this._tDur&&!o)&&ao(this._dp,this,this._start-this._delay)}return(this._tTime!==o||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Ee||!this._initted&&this._dur&&o||!o&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=o),WD(this,o,r)),this},n.time=function(o,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),o+LD(this))%(this._dur+this._rDelay)||(o?this._dur:0),r):this._time},n.totalProgress=function(o,r){return arguments.length?this.totalTime(this.totalDuration()*o,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},n.progress=function(o,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-o:o)+LD(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},n.iteration=function(o,r){var i=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(o-1)*i,r):this._repeat?ls(this._tTime,i)+1:1},n.timeScale=function(o,r){if(!arguments.length)return this._rts===-Ee?0:this._rts;if(this._rts===o)return this;var i=this.parent&&this._ts?mf(this.parent._time,this):this._tTime;return this._rts=+o||0,this._ts=this._ps||o===-Ee?0:this._rts,this.totalTime(ll(-Math.abs(this._delay),this.totalDuration(),i),r!==!1),xf(this),LO(this)},n.paused=function(o){return arguments.length?(this._ps!==o&&(this._ps=o,o?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ds(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ee&&(this._tTime-=Ee)))),this):this._ps},n.startTime=function(o){if(arguments.length){this._start=Be(o);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ao(r,this,this._start-this._delay),this}return this._start},n.endTime=function(o){return this._start+(Gn(o)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},n.rawTime=function(o){var r=this.parent||this._dp;return r?o&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?mf(r.rawTime(o),this):this._tTime:this._tTime},n.revert=function(o){o===void 0&&(o=OO);var r=gn;return gn=o,ug(this)&&(this.timeline&&this.timeline.revert(o),this.totalTime(-.01,o.suppressEvents)),this.data!=="nested"&&o.kill!==!1&&this.kill(),gn=r,this},n.globalTime=function(o){for(var r=this,i=arguments.length?o:r.rawTime();r;)i=r._start+i/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(o):i},n.repeat=function(o){return arguments.length?(this._repeat=o===1/0?-2:o,jD(this)):this._repeat===-2?1/0:this._repeat},n.repeatDelay=function(o){if(arguments.length){var r=this._time;return this._rDelay=o,jD(this),r?this.time(r):this}return this._rDelay},n.yoyo=function(o){return arguments.length?(this._yoyo=o,this):this._yoyo},n.seek=function(o,r){return this.totalTime(_t(this,o),Gn(r))},n.restart=function(o,r){return this.play().totalTime(o?-this._delay:0,Gn(r)),this._dur||(this._zTime=-Ee),this},n.play=function(o,r){return o!=null&&this.seek(o,r),this.reversed(!1).paused(!1)},n.reverse=function(o,r){return o!=null&&this.seek(o||this.totalDuration(),r),this.reversed(!0).paused(!1)},n.pause=function(o,r){return o!=null&&this.seek(o,r),this.paused(!0)},n.resume=function(){return this.paused(!1)},n.reversed=function(o){return arguments.length?(!!o!==this.reversed()&&this.timeScale(-this._rts||(o?-Ee:0)),this):this._rts<0},n.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ee,this},n.isActive=function(){var o=this.parent||this._dp,r=this._start,i;return!!(!o||this._ts&&this._initted&&o.isActive()&&(i=o.rawTime(!0))>=r&&i<this.endTime(!0)-Ee)},n.eventCallback=function(o,r,i){var a=this.vars;return arguments.length>1?(r?(a[o]=r,i&&(a[o+"Params"]=i),o==="onUpdate"&&(this._onUpdate=r)):delete a[o],this):a[o]},n.then=function(o){var r=this,i=r._prom;return new Promise(function(a){var s=Fe(o)?o:JD,c=function(){var u=r.then;r.then=null,i&&i(),Fe(s)&&(s=s(r))&&(s.then||s===r)&&(r.then=u),a(s),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?c():r._prom=c})},n.kill=function(){Jc(this)},e})();lt(cl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ee,_prom:0,_ps:!1,_rts:1});var kn=(function(e){FD(n,e);function n(o,r){var i;return o===void 0&&(o={}),i=e.call(this,o)||this,i.labels={},i.smoothChildTiming=!!o.smoothChildTiming,i.autoRemoveChildren=!!o.autoRemoveChildren,i._sort=Gn(o.sortChildren),Pe&&ao(o.parent||Pe,Oo(i),r),o.reversed&&i.reverse(),o.paused&&i.paused(!0),o.scrollTrigger&&tE(Oo(i),o.scrollTrigger),i}var t=n.prototype;return t.to=function(r,i,a){return tl(0,arguments,this),this},t.from=function(r,i,a){return tl(1,arguments,this),this},t.fromTo=function(r,i,a,s){return tl(2,arguments,this),this},t.set=function(r,i,a){return i.duration=0,i.parent=this,nl(i).repeatDelay||(i.repeat=0),i.immediateRender=!!i.immediateRender,new Xe(r,i,_t(this,a),1),this},t.call=function(r,i,a){return ao(this,Xe.delayedCall(0,r,i),a)},t.staggerTo=function(r,i,a,s,c,l,u){return a.duration=i,a.stagger=a.stagger||s,a.onComplete=l,a.onCompleteParams=u,a.parent=this,new Xe(r,a,_t(this,c)),this},t.staggerFrom=function(r,i,a,s,c,l,u){return a.runBackwards=1,nl(a).immediateRender=Gn(a.immediateRender),this.staggerTo(r,i,a,s,c,l,u)},t.staggerFromTo=function(r,i,a,s,c,l,u,f){return s.startAt=a,nl(s).immediateRender=Gn(s.immediateRender),this.staggerTo(r,i,s,c,l,u,f)},t.render=function(r,i,a){var s=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=r<=0?0:Be(r),f=this._zTime<0!=r<0&&(this._initted||!l),d,p,m,g,x,h,v,y,w,b,_,k;if(this!==Pe&&u>c&&r>=0&&(u=c),u!==this._tTime||a||f){if(s!==this._time&&l&&(u+=this._time-s,r+=this._time-s),d=u,w=this._start,y=this._ts,h=!y,f&&(l||(s=this._zTime),(r||!i)&&(this._zTime=r)),this._repeat){if(_=this._yoyo,x=l+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(x*100+r,i,a);if(d=Be(u%x),u===c?(g=this._repeat,d=l):(b=Be(u/x),g=~~b,g&&g===b&&(d=l,g--),d>l&&(d=l)),b=ls(this._tTime,x),!s&&this._tTime&&b!==g&&this._tTime-b*x-this._dur<=0&&(b=g),_&&g&1&&(d=l-d,k=1),g!==b&&!this._lock){var D=_&&b&1,E=D===(_&&g&1);if(g<b&&(D=!D),s=D?0:u%l?l:u,this._lock=1,this.render(s||(k?0:Be(g*x)),i,!l)._lock=0,this._tTime=u,!i&&this.parent&&st(this,"onRepeat"),this.vars.repeatRefresh&&!k&&(this.invalidate()._lock=1,b=g),s&&s!==this._time||h!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,E&&(this._lock=2,s=D?l:-1e-4,this.render(s,!0),this.vars.repeatRefresh&&!k&&this.invalidate()),this._lock=0,!this._ts&&!h)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=UO(this,Be(s),Be(d)),v&&(u-=d-(d=v._start))),this._tTime=u,this._time=d,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,s=0),!s&&u&&l&&!i&&!b&&(st(this,"onStart"),this._tTime!==u))return this;if(d>=s&&r>=0)for(p=this._first;p;){if(m=p._next,(p._act||d>=p._start)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,i,a);if(p.render(p._ts>0?(d-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(d-p._start)*p._ts,i,a),d!==this._time||!this._ts&&!h){v=0,m&&(u+=this._zTime=-Ee);break}}p=m}else{p=this._last;for(var R=r<0?r:d;p;){if(m=p._prev,(p._act||R<=p._end)&&p._ts&&v!==p){if(p.parent!==this)return this.render(r,i,a);if(p.render(p._ts>0?(R-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(R-p._start)*p._ts,i,a||gn&&ug(p)),d!==this._time||!this._ts&&!h){v=0,m&&(u+=this._zTime=R?-Ee:Ee);break}}p=m}}if(v&&!i&&(this.pause(),v.render(d>=s?0:-Ee)._zTime=d>=s?1:-1,this._ts))return this._start=w,xf(this),this.render(r,i,a);this._onUpdate&&!i&&st(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&s)&&(w===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((r||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&Nr(this,1),!i&&!(r<0&&!s)&&(u||s||!c)&&(st(this,u===c&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,i){var a=this;if(Bo(i)||(i=_t(this,i,r)),!(r instanceof cl)){if(Sn(r))return r.forEach(function(s){return a.add(s,i)}),this;if(nn(r))return this.addLabel(r,i);if(Fe(r))r=Xe.delayedCall(0,r);else return this}return this!==r?ao(this,r,i):this},t.getChildren=function(r,i,a,s){r===void 0&&(r=!0),i===void 0&&(i=!0),a===void 0&&(a=!0),s===void 0&&(s=-Dt);for(var c=[],l=this._first;l;)l._start>=s&&(l instanceof Xe?i&&c.push(l):(a&&c.push(l),r&&c.push.apply(c,l.getChildren(!0,i,a)))),l=l._next;return c},t.getById=function(r){for(var i=this.getChildren(1,1,1),a=i.length;a--;)if(i[a].vars.id===r)return i[a]},t.remove=function(r){return nn(r)?this.removeLabel(r):Fe(r)?this.killTweensOf(r):(r.parent===this&&vf(this,r),r===this._recent&&(this._recent=this._last),Ai(this))},t.totalTime=function(r,i){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Be(Yn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),e.prototype.totalTime.call(this,r,i),this._forcing=0,this):this._tTime},t.addLabel=function(r,i){return this.labels[r]=_t(this,i),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,i,a){var s=Xe.delayedCall(0,i||al,a);return s.data="isPause",this._hasPause=1,ao(this,s,_t(this,r))},t.removePause=function(r){var i=this._first;for(r=_t(this,r);i;)i._start===r&&i.data==="isPause"&&Nr(i),i=i._next},t.killTweensOf=function(r,i,a){for(var s=this.getTweensOf(r,a),c=s.length;c--;)Rr!==s[c]&&s[c].kill(r,i);return this},t.getTweensOf=function(r,i){for(var a=[],s=Et(r),c=this._first,l=Bo(i),u;c;)c instanceof Xe?zO(c._targets,s)&&(l?(!Rr||c._initted&&c._ts)&&c.globalTime(0)<=i&&c.globalTime(c.totalDuration())>i:!i||c.isActive())&&a.push(c):(u=c.getTweensOf(s,i)).length&&a.push.apply(a,u),c=c._next;return a},t.tweenTo=function(r,i){i=i||{};var a=this,s=_t(a,r),c=i,l=c.startAt,u=c.onStart,f=c.onStartParams,d=c.immediateRender,p,m=Xe.to(a,lt({ease:i.ease||"none",lazy:!1,immediateRender:!1,time:s,overwrite:"auto",duration:i.duration||Math.abs((s-(l&&"time"in l?l.time:a._time))/a.timeScale())||Ee,onStart:function(){if(a.pause(),!p){var x=i.duration||Math.abs((s-(l&&"time"in l?l.time:a._time))/a.timeScale());m._dur!==x&&us(m,x,0,1).render(m._time,!0,!0),p=1}u&&u.apply(m,f||[])}},i));return d?m.render(0):m},t.tweenFromTo=function(r,i,a){return this.tweenTo(i,lt({startAt:{time:_t(this,r)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),HD(this,_t(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),HD(this,_t(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Ee)},t.shiftChildren=function(r,i,a){a===void 0&&(a=0);var s=this._first,c=this.labels,l;for(r=Be(r);s;)s._start>=a&&(s._start+=r,s._end+=r),s=s._next;if(i)for(l in c)c[l]>=a&&(c[l]+=r);return Ai(this)},t.invalidate=function(r){var i=this._first;for(this._lock=0;i;)i.invalidate(r),i=i._next;return e.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var i=this._first,a;i;)a=i._next,this.remove(i),i=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Ai(this)},t.totalDuration=function(r){var i=0,a=this,s=a._last,c=Dt,l,u,f;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(f=a.parent;s;)l=s._prev,s._dirty&&s.totalDuration(),u=s._start,u>c&&a._sort&&s._ts&&!a._lock?(a._lock=1,ao(a,s,u-s._delay,1)._lock=0):c=u,u<0&&s._ts&&(i-=u,(!f&&!a._dp||f&&f.smoothChildTiming)&&(a._start+=Be(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),c=0),s._end>i&&s._ts&&(i=s._end),s=l;us(a,a===Pe&&a._time>i?a._time:i,1,1),a._dirty=0}return a._tDur},n.updateRoot=function(r){if(Pe._ts&&(WD(Pe,mf(r,Pe)),QD=Yn.frame),Yn.frame>=BD){BD+=Xn.autoSleep||120;var i=Pe._first;if((!i||!i._ts)&&Xn.autoSleep&&Yn._listeners.length<2){for(;i&&!i._ts;)i=i._next;i||Yn.sleep()}}},n})(cl);lt(kn.prototype,{_lock:0,_hasPause:0,_forcing:0});var a3=function(n,t,o,r,i,a,s){var c=new In(this._pt,n,t,0,1,gg,null,i),l=0,u=0,f,d,p,m,g,x,h,v;for(c.b=o,c.e=r,o+="",r+="",(h=~r.indexOf("random("))&&(r=fs(r)),a&&(v=[o,r],a(v,n,t),o=v[0],r=v[1]),d=o.match(Py)||[];f=Py.exec(r);)m=f[0],g=r.substring(l,f.index),p?p=(p+1)%5:g.substr(-5)==="rgba("&&(p=1),m!==d[u++]&&(x=parseFloat(d[u-1])||0,c._pt={_next:c._pt,p:g||u===1?g:",",s:x,c:m.charAt(1)==="="?zi(x,m)-x:parseFloat(m)-x,m:p&&p<4?Math.round:0},l=Py.lastIndex);return c.c=l<r.length?r.substring(l,r.length):"",c.fp=s,(rg.test(r)||h)&&(c.e=0),this._pt=c,c},pg=function(n,t,o,r,i,a,s,c,l,u){Fe(r)&&(r=r(i||0,n,a));var f=n[t],d=o!=="get"?o:Fe(f)?l?n[t.indexOf("set")||!Fe(n["get"+t.substr(3)])?t:"get"+t.substr(3)](l):n[t]():f,p=Fe(f)?l?d3:vE:yg,m;if(nn(r)&&(~r.indexOf("random(")&&(r=fs(r)),r.charAt(1)==="="&&(m=zi(d,r)+(vn(d)||0),(m||m===0)&&(r=m))),!u||d!==r||Jy)return!isNaN(d*r)&&r!==""?(m=new In(this._pt,n,t,+d||0,r-(d||0),typeof f=="boolean"?p3:xE,0,p),l&&(m.fp=l),s&&m.modifier(s,this,n),this._pt=m):(!f&&!(t in n)&&gf(t,r),a3.call(this,n,t,d,r,p,c||Xn.stringFilter,l))},s3=function(n,t,o,r,i){if(Fe(n)&&(n=ol(n,i,t,o,r)),!so(n)||n.style&&n.nodeType||Sn(n)||GD(n))return nn(n)?ol(n,i,t,o,r):n;var a={},s;for(s in n)a[s]=ol(n[s],i,t,o,r);return a},mg=function(n,t,o,r,i,a){var s,c,l,u;if(Fn[n]&&(s=new Fn[n]).init(i,s.rawVars?t[n]:s3(t[n],r,i,a,o),o,r,a)!==!1&&(o._pt=c=new In(o._pt,i,n,0,1,s.render,s,0,s.priority),o!==ss))for(l=o._ptLookup[o._targets.indexOf(i)],u=s._props.length;u--;)l[s._props[u]]=c;return s},Rr,Jy,hg=function e(n,t,o){var r=n.vars,i=r.ease,a=r.startAt,s=r.immediateRender,c=r.lazy,l=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,d=r.keyframes,p=r.autoRevert,m=n._dur,g=n._startAt,x=n._targets,h=n.parent,v=h&&h.data==="nested"?h.vars.targets:x,y=n._overwrite==="auto"&&!ng,w=n.timeline,b=r.easeReverse||f,_,k,D,E,R,A,P,I,C,T,q,M,N;if(w&&(!d||!i)&&(i="none"),n._ease=Ni(i,rl.ease),n._rEase=b&&(Ni(b)||n._ease),n._from=!w&&!!r.runBackwards,n._from&&(n.ratio=1),!w||d&&!r.stagger){if(I=x[0]?Ar(x[0]).harness:0,M=I&&r[I.prop],_=pf(r,ag),g&&(g._zTime<0&&g.progress(1),t<0&&u&&s&&!p?g.render(-1,!0):g.revert(u&&m?cf:IO),g._lazy=0),a){if(Nr(n._startAt=Xe.set(x,lt({data:"isStart",overwrite:!1,parent:h,immediateRender:!0,lazy:!g&&Gn(c),startAt:null,delay:0,onUpdate:l&&function(){return st(n,"onUpdate")},stagger:0},a))),n._startAt._dp=0,n._startAt._sat=n,t<0&&(gn||!s&&!p)&&n._startAt.revert(cf),s&&m&&t<=0&&o<=0){t&&(n._zTime=t);return}}else if(u&&m&&!g){if(t&&(s=!1),D=lt({overwrite:!1,data:"isFromStart",lazy:s&&!g&&Gn(c),immediateRender:s,stagger:0,parent:h},_),M&&(D[I.prop]=M),Nr(n._startAt=Xe.set(x,D)),n._startAt._dp=0,n._startAt._sat=n,t<0&&(gn?n._startAt.revert(cf):n._startAt.render(-1,!0)),n._zTime=t,!s)e(n._startAt,Ee,Ee);else if(!t)return}for(n._pt=n._ptCache=0,c=m&&Gn(c)||c&&!m,k=0;k<x.length;k++){if(R=x[k],P=R._gsap||cg(x)[k]._gsap,n._ptLookup[k]=T={},Xy[P.id]&&Mr.length&&ff(),q=v===x?k:v.indexOf(R),I&&(C=new I).init(R,M||_,n,q,v)!==!1&&(n._pt=E=new In(n._pt,R,C.name,0,1,C.render,C,0,C.priority),C._props.forEach(function(O){T[O]=E}),C.priority&&(A=1)),!I||M)for(D in _)Fn[D]&&(C=mg(D,_,n,q,R,v))?C.priority&&(A=1):T[D]=E=pg.call(n,R,D,"get",_[D],q,v,0,r.stringFilter);n._op&&n._op[k]&&n.kill(R,n._op[k]),y&&n._pt&&(Rr=n,Pe.killTweensOf(R,T,n.globalTime(t)),N=!n.parent,Rr=0),n._pt&&c&&(Xy[P.id]=1)}A&&xg(n),n._onInit&&n._onInit(n)}n._onUpdate=l,n._initted=(!n._op||n._pt)&&!N,d&&t<=0&&w.render(Dt,!0,!0)},c3=function(n,t,o,r,i,a,s,c){var l=(n._pt&&n._ptCache||(n._ptCache={}))[t],u,f,d,p;if(!l)for(l=n._ptCache[t]=[],d=n._ptLookup,p=n._targets.length;p--;){if(u=d[p][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Jy=1,n.vars[t]="+=0",hg(n,s),Jy=0,c?il(t+" not eligible for reset. Try splitting into individual properties"):1;l.push(u)}for(p=l.length;p--;)f=l[p],u=f._pt||f,u.s=(r||r===0)&&!i?r:u.s+(r||0)+a*u.c,u.c=o-u.s,f.e&&(f.e=Ye(o)+vn(f.e)),f.b&&(f.b=u.s+vn(f.b))},l3=function(n,t){var o=n[0]?Ar(n[0]).harness:0,r=o&&o.aliases,i,a,s,c;if(!r)return t;i=cs({},t);for(a in r)if(a in i)for(c=r[a].split(","),s=c.length;s--;)i[c[s]]=i[a];return i},u3=function(n,t,o,r){var i=t.ease||r||"power1.inOut",a,s;if(Sn(t))s=o[n]||(o[n]=[]),t.forEach(function(c,l){return s.push({t:l/(t.length-1)*100,v:c,e:i})});else for(a in t)s=o[a]||(o[a]=[]),a==="ease"||s.push({t:parseFloat(n),v:t[a],e:i})},ol=function(n,t,o,r,i){return Fe(n)?n.call(t,o,r,i):nn(n)&&~n.indexOf("random(")?fs(n):n},yE=sg+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",gE={};Nn(yE+",id,stagger,delay,duration,paused,scrollTrigger",function(e){return gE[e]=1});var Xe=(function(e){FD(n,e);function n(o,r,i,a){var s;typeof r=="number"&&(i.duration=r,r=i,i=null),s=e.call(this,a?r:nl(r))||this;var c=s.vars,l=c.duration,u=c.delay,f=c.immediateRender,d=c.stagger,p=c.overwrite,m=c.keyframes,g=c.defaults,x=c.scrollTrigger,h=r.parent||Pe,v=(Sn(o)||GD(o)?Bo(o[0]):"length"in r)?[o]:Et(o),y,w,b,_,k,D,E,R;if(s._targets=v.length?cg(v):il("GSAP target "+o+" not found. https://gsap.com",!Xn.nullTargetWarn)||[],s._ptLookup=[],s._overwrite=p,m||d||sf(l)||sf(u)){r=s.vars;var A=r.easeReverse||r.yoyoEase;if(y=s.timeline=new kn({data:"nested",defaults:g||{},targets:h&&h.data==="nested"?h.vars.targets:v}),y.kill(),y.parent=y._dp=Oo(s),y._start=0,d||sf(l)||sf(u)){if(_=v.length,E=d&&aE(d),so(d))for(k in d)~yE.indexOf(k)&&(R||(R={}),R[k]=d[k]);for(w=0;w<_;w++)b=pf(r,gE),b.stagger=0,A&&(b.easeReverse=A),R&&cs(b,R),D=v[w],b.duration=+ol(l,Oo(s),w,D,v),b.delay=(+ol(u,Oo(s),w,D,v)||0)-s._delay,!d&&_===1&&b.delay&&(s._delay=u=b.delay,s._start+=u,b.delay=0),y.to(D,b,E?E(w,D,v):0),y._ease=le.none;y.duration()?l=u=0:s.timeline=0}else if(m){nl(lt(y.vars.defaults,{ease:"none"})),y._ease=Ni(m.ease||r.ease||"none");var P=0,I,C,T;if(Sn(m))m.forEach(function(q){return y.to(v,q,">")}),y.duration();else{b={};for(k in m)k==="ease"||k==="easeEach"||u3(k,m[k],b,m.easeEach);for(k in b)for(I=b[k].sort(function(q,M){return q.t-M.t}),P=0,w=0;w<I.length;w++)C=I[w],T={ease:C.e,duration:(C.t-(w?I[w-1].t:0))/100*l},T[k]=C.v,y.to(v,T,P),P+=T.duration;y.duration()<l&&y.to({},{duration:l-y.duration()})}}l||s.duration(l=y.duration())}else s.timeline=0;return p===!0&&!ng&&(Rr=Oo(s),Pe.killTweensOf(v),Rr=0),ao(h,Oo(s),i),r.reversed&&s.reverse(),r.paused&&s.paused(!0),(f||!l&&!m&&s._start===Be(h._time)&&Gn(f)&&jO(Oo(s))&&h.data!=="nested")&&(s._tTime=-Ee,s.render(Math.max(0,-u)||0)),x&&tE(Oo(s),x),s}var t=n.prototype;return t.render=function(r,i,a){var s=this._time,c=this._tDur,l=this._dur,u=r<0,f=r>c-Ee&&!u?c:r<Ee?0:r,d,p,m,g,x,h,v,y;if(!l)VO(this,r,i,a);else if(f!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=f,y=this.timeline,this._repeat){if(g=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+r,i,a);if(d=Be(f%g),f===c?(m=this._repeat,d=l):(x=Be(f/g),m=~~x,m&&m===x?(d=l,m--):d>l&&(d=l)),h=this._yoyo&&m&1,h&&(d=l-d),x=ls(this._tTime,g),d===s&&!a&&this._initted&&m===x)return this._tTime=f,this;m!==x&&this.vars.repeatRefresh&&!h&&!this._lock&&d!==g&&this._initted&&(this._lock=a=1,this.render(Be(g*m),!0).invalidate()._lock=0)}if(!this._initted){if(oE(this,u?r:d,a,i,f))return this._tTime=0,this;if(s!==this._time&&!(a&&this.vars.repeatRefresh&&m!==x))return this;if(l!==this._dur)return this.render(r,i,a)}if(this._rEase){var w=d<s;if(w!==this._inv){var b=w?s:l-s;this._inv=w,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=s,this._invRecip=b?(w?-1:1)/b:0,this._invScale=w?-this.ratio:1-this.ratio,this._invEase=w?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(d/l);if(this._from&&(this.ratio=v=1-v),this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!s&&f&&!i&&!x&&(st(this,"onStart"),this._tTime!==f))return this;for(p=this._pt;p;)p.r(v,p.d),p=p._next;y&&y.render(r<0?r:y._dur*y._ease(d/this._dur),i,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!i&&(u&&Ky(this,r,i,a),st(this,"onUpdate")),this._repeat&&m!==x&&this.vars.onRepeat&&!i&&this.parent&&st(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Ky(this,r,!0,!0),(r||!l)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Nr(this,1),!i&&!(u&&!s)&&(f||s||h)&&(st(this,f===c?"onComplete":"onReverseComplete",!0),this._prom&&!(f<c&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),e.prototype.invalidate.call(this,r)},t.resetTo=function(r,i,a,s,c){sl||Yn.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||hg(this,l),u=this._ease(l/this._dur),c3(this,r,i,a,s,u,l,c)?this.resetTo(r,i,a,s,1):(wf(this,0),this.parent||eE(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,i){if(i===void 0&&(i="all"),!r&&(!i||i==="all"))return this._lazy=this._pt=0,this.parent?Jc(this):this.scrollTrigger&&this.scrollTrigger.kill(!!gn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,i,Rr&&Rr.vars.overwrite!==!0)._first||Jc(this),this.parent&&a!==this.timeline.totalDuration()&&us(this,this._dur*this.timeline._tDur/a,0,1),this}var s=this._targets,c=r?Et(r):s,l=this._ptLookup,u=this._pt,f,d,p,m,g,x,h;if((!i||i==="all")&&PO(s,c))return i==="all"&&(this._pt=0),Jc(this);for(f=this._op=this._op||[],i!=="all"&&(nn(i)&&(g={},Nn(i,function(v){return g[v]=1}),i=g),i=l3(s,i)),h=s.length;h--;)if(~c.indexOf(s[h])){d=l[h],i==="all"?(f[h]=i,m=d,p={}):(p=f[h]=f[h]||{},m=i);for(g in m)x=d&&d[g],x&&((!("kill"in x.d)||x.d.kill(g)===!0)&&vf(this,x,"_pt"),delete d[g]),p!=="all"&&(p[g]=1)}return this._initted&&!this._pt&&u&&Jc(this),this},n.to=function(r,i){return new n(r,i,arguments[2])},n.from=function(r,i){return tl(1,arguments)},n.delayedCall=function(r,i,a,s){return new n(i,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:i,onReverseComplete:i,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:s})},n.fromTo=function(r,i,a){return tl(2,arguments)},n.set=function(r,i){return i.duration=0,i.repeatDelay||(i.repeat=0),new n(r,i)},n.killTweensOf=function(r,i,a){return Pe.killTweensOf(r,i,a)},n})(cl);lt(Xe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Nn("staggerTo,staggerFrom,staggerFromTo",function(e){Xe[e]=function(){var n=new kn,t=Qy.call(arguments,0);return t.splice(e==="staggerFromTo"?5:4,0,0),n[e].apply(n,t)}});var yg=function(n,t,o){return n[t]=o},vE=function(n,t,o){return n[t](o)},d3=function(n,t,o,r){return n[t](r.fp,o)},f3=function(n,t,o){return n.setAttribute(t,o)},bf=function(n,t){return Fe(n[t])?vE:yf(n[t])&&n.setAttribute?f3:yg},xE=function(n,t){return t.set(t.t,t.p,Math.round((t.s+t.c*n)*1e6)/1e6,t)},p3=function(n,t){return t.set(t.t,t.p,!!(t.s+t.c*n),t)},gg=function(n,t){var o=t._pt,r="";if(!n&&t.b)r=t.b;else if(n===1&&t.e)r=t.e;else{for(;o;)r=o.p+(o.m?o.m(o.s+o.c*n):Math.round((o.s+o.c*n)*1e4)/1e4)+r,o=o._next;r+=t.c}t.set(t.t,t.p,r,t)},vg=function(n,t){for(var o=t._pt;o;)o.r(n,o.d),o=o._next},m3=function(n,t,o,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(n,t,o),i=a},h3=function(n){for(var t=this._pt,o,r;t;)r=t._next,t.p===n&&!t.op||t.op===n?vf(this,t,"_pt"):t.dep||(o=1),t=r;return!o},y3=function(n,t,o,r){r.mSet(n,t,r.m.call(r.tween,o,r.mt),r)},xg=function(n){for(var t=n._pt,o,r,i,a;t;){for(o=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=o}n._pt=i},In=(function(){function e(t,o,r,i,a,s,c,l,u){this.t=o,this.s=i,this.c=a,this.p=r,this.r=s||xE,this.d=c||this,this.set=l||yg,this.pr=u||0,this._next=t,t&&(t._prev=this)}var n=e.prototype;return n.modifier=function(o,r,i){this.mSet=this.mSet||this.set,this.set=y3,this.m=o,this.mt=i,this.tween=r},e})();Nn(sg+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(e){return ag[e]=1});ct.TweenMax=ct.TweenLite=Xe;ct.TimelineLite=ct.TimelineMax=kn;Pe=new kn({sortChildren:!1,defaults:rl,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Xn.stringFilter=dg;var Ii=[],uf={},g3=[],UD=0,v3=0,Uy=function(n){return(uf[n]||g3).map(function(t){return t()})},eg=function(){var n=Date.now(),t=[];n-UD>2&&(Uy("matchMediaInit"),Ii.forEach(function(o){var r=o.queries,i=o.conditions,a,s,c,l;for(s in r)a=io.matchMedia(r[s]).matches,a&&(c=1),a!==i[s]&&(i[s]=a,l=1);l&&(o.revert(),c&&t.push(o))}),Uy("matchMediaRevert"),t.forEach(function(o){return o.onMatch(o,function(r){return o.add(null,r)})}),UD=n,Uy("matchMedia"))},wE=(function(){function e(t,o){this.selector=o&&Wy(o),this.data=[],this._r=[],this.isReverted=!1,this.id=v3++,t&&this.add(t)}var n=e.prototype;return n.add=function(o,r,i){Fe(o)&&(i=r,r=o,o=Fe);var a=this,s=function(){var l=Oe,u=a.selector,f;return l&&l!==a&&l.data.push(a),i&&(a.selector=Wy(i)),Oe=a,f=r.apply(a,arguments),Fe(f)&&a._r.push(f),Oe=l,a.selector=u,a.isReverted=!1,f};return a.last=s,o===Fe?s(a,function(c){return a.add(null,c)}):o?a[o]=s:s},n.ignore=function(o){var r=Oe;Oe=null,o(this),Oe=r},n.getTweens=function(){var o=[];return this.data.forEach(function(r){return r instanceof e?o.push.apply(o,r.getTweens()):r instanceof Xe&&!(r.parent&&r.parent.data==="nested")&&o.push(r)}),o},n.clear=function(){this._r.length=this.data.length=0},n.kill=function(o,r){var i=this;if(o?(function(){for(var s=i.getTweens(),c=i.data.length,l;c--;)l=i.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return s.splice(s.indexOf(u),1)}));for(s.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(o)}),c=i.data.length;c--;)l=i.data[c],l instanceof kn?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Xe)&&l.revert&&l.revert(o);i._r.forEach(function(u){return u(o,i)}),i.isReverted=!0})():this.data.forEach(function(s){return s.kill&&s.kill()}),this.clear(),r)for(var a=Ii.length;a--;)Ii[a].id===this.id&&Ii.splice(a,1)},n.revert=function(o){this.kill(o||{})},e})(),x3=(function(){function e(t){this.contexts=[],this.scope=t,Oe&&Oe.data.push(this)}var n=e.prototype;return n.add=function(o,r,i){so(o)||(o={matches:o});var a=new wE(0,i||this.scope),s=a.conditions={},c,l,u;Oe&&!a.selector&&(a.selector=Oe.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=o;for(l in o)l==="all"?u=1:(c=io.matchMedia(o[l]),c&&(Ii.indexOf(a)<0&&Ii.push(a),(s[l]=c.matches)&&(u=1),c.addListener?c.addListener(eg):c.addEventListener("change",eg)));return u&&r(a,function(f){return a.add(null,f)}),this},n.revert=function(o){this.kill(o||{})},n.kill=function(o){this.contexts.forEach(function(r){return r.kill(o,!0)})},e})(),hf={registerPlugin:function(){for(var n=arguments.length,t=new Array(n),o=0;o<n;o++)t[o]=arguments[o];t.forEach(function(r){return fE(r)})},timeline:function(n){return new kn(n)},getTweensOf:function(n,t){return Pe.getTweensOf(n,t)},getProperty:function(n,t,o,r){nn(n)&&(n=Et(n)[0]);var i=Ar(n||{}).get,a=o?JD:$D;return o==="native"&&(o=""),n&&(t?a((Fn[t]&&Fn[t].get||i)(n,t,o,r)):function(s,c,l){return a((Fn[s]&&Fn[s].get||i)(n,s,c,l))})},quickSetter:function(n,t,o){if(n=Et(n),n.length>1){var r=n.map(function(u){return _n.quickSetter(u,t,o)}),i=r.length;return function(u){for(var f=i;f--;)r[f](u)}}n=n[0]||{};var a=Fn[t],s=Ar(n),c=s.harness&&(s.harness.aliases||{})[t]||t,l=a?function(u){var f=new a;ss._pt=0,f.init(n,o?u+o:u,ss,0,[n]),f.render(1,f),ss._pt&&vg(1,ss)}:s.set(n,c);return a?l:function(u){return l(n,c,o?u+o:u,s,1)}},quickTo:function(n,t,o){var r,i=_n.to(n,lt((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),o||{})),a=function(c,l,u){return i.resetTo(t,c,l,u)};return a.tween=i,a},isTweening:function(n){return Pe.getTweensOf(n,!0).length>0},defaults:function(n){return n&&n.ease&&(n.ease=Ni(n.ease,rl.ease)),PD(rl,n||{})},config:function(n){return PD(Xn,n||{})},registerEffect:function(n){var t=n.name,o=n.effect,r=n.plugins,i=n.defaults,a=n.extendTimeline;(r||"").split(",").forEach(function(s){return s&&!Fn[s]&&!ct[s]&&il(t+" effect requires "+s+" plugin.")}),Ly[t]=function(s,c,l){return o(Et(s),lt(c||{},i),l)},a&&(kn.prototype[t]=function(s,c,l){return this.add(Ly[t](s,so(c)?c:(l=c)&&{},this),l)})},registerEase:function(n,t){le[n]=Ni(t)},parseEase:function(n,t){return arguments.length?Ni(n,t):le},getById:function(n){return Pe.getById(n)},exportRoot:function(n,t){n===void 0&&(n={});var o=new kn(n),r,i;for(o.smoothChildTiming=Gn(n.smoothChildTiming),Pe.remove(o),o._dp=0,o._time=o._tTime=Pe._time,r=Pe._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Xe&&r.vars.onComplete===r._targets[0]))&&ao(o,r,r._start-r._delay),r=i;return ao(Pe,o,0),o},context:function(n,t){return n?new wE(n,t):Oe},matchMedia:function(n){return new x3(n)},matchMediaRefresh:function(){return Ii.forEach(function(n){var t=n.conditions,o,r;for(r in t)t[r]&&(t[r]=!1,o=1);o&&n.revert()})||eg()},addEventListener:function(n,t){var o=uf[n]||(uf[n]=[]);~o.indexOf(t)||o.push(t)},removeEventListener:function(n,t){var o=uf[n],r=o&&o.indexOf(t);r>=0&&o.splice(r,1)},utils:{wrap:QO,wrapYoyo:WO,distribute:aE,random:cE,snap:sE,normalize:ZO,getUnit:vn,clamp:YO,splitColor:pE,toArray:Et,selector:Wy,mapRange:uE,pipe:XO,unitize:KO,interpolate:$O,shuffle:iE},install:KD,effects:Ly,ticker:Yn,updateRoot:kn.updateRoot,plugins:Fn,globalTimeline:Pe,core:{PropTween:In,globals:ZD,Tween:Xe,Timeline:kn,Animation:cl,getCache:Ar,_removeLinkedListItem:vf,reverting:function(){return gn},context:function(n){return n&&Oe&&(Oe.data.push(n),n._ctx=Oe),Oe},suppressOverwrites:function(n){return ng=n}}};Nn("to,from,fromTo,delayedCall,set,killTweensOf",function(e){return hf[e]=Xe[e]});Yn.add(kn.updateRoot);ss=hf.to({},{duration:0});var w3=function(n,t){for(var o=n._pt;o&&o.p!==t&&o.op!==t&&o.fp!==t;)o=o._next;return o},b3=function(n,t){var o=n._targets,r,i,a;for(r in t)for(i=o.length;i--;)a=n._ptLookup[i][r],a&&(a=a.d)&&(a._pt&&(a=w3(a,r)),a&&a.modifier&&a.modifier(t[r],n,o[i],r))},Fy=function(n,t){return{name:n,headless:1,rawVars:1,init:function(r,i,a){a._onInit=function(s){var c,l;if(nn(i)&&(c={},Nn(i,function(u){return c[u]=1}),i=c),t){c={};for(l in i)c[l]=t(i[l]);i=c}b3(s,i)}}}},_n=hf.registerPlugin({name:"attr",init:function(n,t,o,r,i){var a,s,c;this.tween=o;for(a in t)c=n.getAttribute(a)||"",s=this.add(n,"setAttribute",(c||0)+"",t[a],r,i,0,0,a),s.op=a,s.b=c,this._props.push(a)},render:function(n,t){for(var o=t._pt;o;)gn?o.set(o.t,o.p,o.b,o):o.r(n,o.d),o=o._next}},{name:"endArray",headless:1,init:function(n,t){for(var o=t.length;o--;)this.add(n,o,n[o]||0,t[o],0,0,0,0,0,1)}},Fy("roundProps",$y),Fy("modifiers"),Fy("snap",sE))||hf;Xe.version=kn.version=_n.version="3.15.0";XD=1;tg()&&ds();var k3=le.Power0,S3=le.Power1,_3=le.Power2,D3=le.Power3,E3=le.Power4,C3=le.Linear,T3=le.Quad,q3=le.Cubic,R3=le.Quart,M3=le.Quint,A3=le.Strong,N3=le.Elastic,I3=le.Back,O3=le.SteppedEase,z3=le.Bounce,B3=le.Sine,P3=le.Expo,L3=le.Circ;var bE,Or,ms,Dg,Hi,j3,kE,Eg,H3=function(){return typeof window<"u"},Lo={},ji=180/Math.PI,hs=Math.PI/180,ps=Math.atan2,SE=1e8,Cg=/([A-Z])/g,V3=/(left|right|width|margin|padding|x)/i,U3=/[\s,\(]\S/,co={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},bg=function(n,t){return t.set(t.t,t.p,Math.round((t.s+t.c*n)*1e4)/1e4+t.u,t)},F3=function(n,t){return t.set(t.t,t.p,n===1?t.e:Math.round((t.s+t.c*n)*1e4)/1e4+t.u,t)},Y3=function(n,t){return t.set(t.t,t.p,n?Math.round((t.s+t.c*n)*1e4)/1e4+t.u:t.b,t)},G3=function(n,t){return t.set(t.t,t.p,n===1?t.e:n?Math.round((t.s+t.c*n)*1e4)/1e4+t.u:t.b,t)},X3=function(n,t){var o=t.s+t.c*n;t.set(t.t,t.p,~~(o+(o<0?-.5:.5))+t.u,t)},ME=function(n,t){return t.set(t.t,t.p,n?t.e:t.b,t)},AE=function(n,t){return t.set(t.t,t.p,n!==1?t.b:t.e,t)},K3=function(n,t,o){return n.style[t]=o},Z3=function(n,t,o){return n.style.setProperty(t,o)},Q3=function(n,t,o){return n._gsap[t]=o},W3=function(n,t,o){return n._gsap.scaleX=n._gsap.scaleY=o},$3=function(n,t,o,r,i){var a=n._gsap;a.scaleX=a.scaleY=o,a.renderTransform(i,a)},J3=function(n,t,o,r,i){var a=n._gsap;a[t]=o,a.renderTransform(i,a)},Le="transform",Kn=Le+"Origin",e4=function e(n,t){var o=this,r=this.target,i=r.style,a=r._gsap;if(n in Lo&&i){if(this.tfm=this.tfm||{},n!=="transform")n=co[n]||n,~n.indexOf(",")?n.split(",").forEach(function(s){return o.tfm[s]=Po(r,s)}):this.tfm[n]=a.x?a[n]:Po(r,n),n===Kn&&(this.tfm.zOrigin=a.zOrigin);else return co.transform.split(",").forEach(function(s){return e.call(o,s,t)});if(this.props.indexOf(Le)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Kn,t,"")),n=Le}(i||t)&&this.props.push(n,t,i[n])},NE=function(n){n.translate&&(n.removeProperty("translate"),n.removeProperty("scale"),n.removeProperty("rotate"))},n4=function(){var n=this.props,t=this.target,o=t.style,r=t._gsap,i,a;for(i=0;i<n.length;i+=3)n[i+1]?n[i+1]===2?t[n[i]](n[i+2]):t[n[i]]=n[i+2]:n[i+2]?o[n[i]]=n[i+2]:o.removeProperty(n[i].substr(0,2)==="--"?n[i]:n[i].replace(Cg,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),i=Eg(),(!i||!i.isStart)&&!o[Le]&&(NE(o),r.zOrigin&&o[Kn]&&(o[Kn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},IE=function(n,t){var o={target:n,props:[],revert:n4,save:e4};return n._gsap||_n.core.getCache(n),t&&n.style&&n.nodeType&&t.split(",").forEach(function(r){return o.save(r)}),o},OE,kg=function(n,t){var o=Or.createElementNS?Or.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),n):Or.createElement(n);return o&&o.style?o:Or.createElement(n)},ut=function e(n,t,o){var r=getComputedStyle(n);return r[t]||r.getPropertyValue(t.replace(Cg,"-$1").toLowerCase())||r.getPropertyValue(t)||!o&&e(n,ys(t)||t,1)||""},_E="O,Moz,ms,Ms,Webkit".split(","),ys=function(n,t,o){var r=t||Hi,i=r.style,a=5;if(n in i&&!o)return n;for(n=n.charAt(0).toUpperCase()+n.substr(1);a--&&!(_E[a]+n in i););return a<0?null:(a===3?"ms":a>=0?_E[a]:"")+n},Sg=function(){H3()&&window.document&&(bE=window,Or=bE.document,ms=Or.documentElement,Hi=kg("div")||{style:{}},j3=kg("div"),Le=ys(Le),Kn=Le+"Origin",Hi.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",OE=!!ys("perspective"),Eg=_n.core.reverting,Dg=1)},DE=function(n){var t=n.ownerSVGElement,o=kg("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=n.cloneNode(!0),i;r.style.display="block",o.appendChild(r),ms.appendChild(o);try{i=r.getBBox()}catch{}return o.removeChild(r),ms.removeChild(o),i},EE=function(n,t){for(var o=t.length;o--;)if(n.hasAttribute(t[o]))return n.getAttribute(t[o])},zE=function(n){var t,o;try{t=n.getBBox()}catch{t=DE(n),o=1}return t&&(t.width||t.height)||o||(t=DE(n)),t&&!t.width&&!t.x&&!t.y?{x:+EE(n,["x","cx","x1"])||0,y:+EE(n,["y","cy","y1"])||0,width:0,height:0}:t},BE=function(n){return!!(n.getCTM&&(!n.parentNode||n.ownerSVGElement)&&zE(n))},Br=function(n,t){if(t){var o=n.style,r;t in Lo&&t!==Kn&&(t=Le),o.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),o.removeProperty(r==="--"?t:t.replace(Cg,"-$1").toLowerCase())):o.removeAttribute(t)}},zr=function(n,t,o,r,i,a){var s=new In(n._pt,t,o,0,1,a?AE:ME);return n._pt=s,s.b=r,s.e=i,n._props.push(o),s},CE={deg:1,rad:1,turn:1},t4={grid:1,flex:1},Pr=function e(n,t,o,r){var i=parseFloat(o)||0,a=(o+"").trim().substr((i+"").length)||"px",s=Hi.style,c=V3.test(t),l=n.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),f=100,d=r==="px",p=r==="%",m,g,x,h;if(r===a||!i||CE[r]||CE[a])return i;if(a!=="px"&&!d&&(i=e(n,t,o,"px")),h=n.getCTM&&BE(n),(p||a==="%")&&(Lo[t]||~t.indexOf("adius")))return m=h?n.getBBox()[c?"width":"height"]:n[u],Ye(p?i/m*f:i/100*m);if(s[c?"width":"height"]=f+(d?a:r),g=r!=="rem"&&~t.indexOf("adius")||r==="em"&&n.appendChild&&!l?n:n.parentNode,h&&(g=(n.ownerSVGElement||{}).parentNode),(!g||g===Or||!g.appendChild)&&(g=Or.body),x=g._gsap,x&&p&&x.width&&c&&x.time===Yn.time&&!x.uncache)return Ye(i/x.width*f);if(p&&(t==="height"||t==="width")){var v=n.style[t];n.style[t]=f+r,m=n[u],v?n.style[t]=v:Br(n,t)}else(p||a==="%")&&!t4[ut(g,"display")]&&(s.position=ut(n,"position")),g===n&&(s.position="static"),g.appendChild(Hi),m=Hi[u],g.removeChild(Hi),s.position="absolute";return c&&p&&(x=Ar(g),x.time=Yn.time,x.width=g[u]),Ye(d?m*i/f:m&&i?f/m*i:0)},Po=function(n,t,o,r){var i;return Dg||Sg(),t in co&&t!=="transform"&&(t=co[t],~t.indexOf(",")&&(t=t.split(",")[0])),Lo[t]&&t!=="transform"?(i=fl(n,r),i=t!=="transformOrigin"?i[t]:i.svg?i.origin:Sf(ut(n,Kn))+" "+i.zOrigin+"px"):(i=n.style[t],(!i||i==="auto"||r||~(i+"").indexOf("calc("))&&(i=kf[t]&&kf[t](n,t,o)||ut(n,t)||lg(n,t)||(t==="opacity"?1:0))),o&&!~(i+"").trim().indexOf(" ")?Pr(n,t,i,o)+o:i},o4=function(n,t,o,r){if(!o||o==="none"){var i=ys(t,n,1),a=i&&ut(n,i,1);a&&a!==o?(t=i,o=a):t==="borderColor"&&(o=ut(n,"borderTopColor"))}var s=new In(this._pt,n.style,t,0,1,gg),c=0,l=0,u,f,d,p,m,g,x,h,v,y,w,b;if(s.b=o,s.e=r,o+="",r+="",r.substring(0,6)==="var(--"&&(r=ut(n,r.substring(4,r.indexOf(")")))),r==="auto"&&(g=n.style[t],n.style[t]=r,r=ut(n,t)||r,g?n.style[t]=g:Br(n,t)),u=[o,r],dg(u),o=u[0],r=u[1],d=o.match(Oi)||[],b=r.match(Oi)||[],b.length){for(;f=Oi.exec(r);)x=f[0],v=r.substring(c,f.index),m?m=(m+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(m=1),x!==(g=d[l++]||"")&&(p=parseFloat(g)||0,w=g.substr((p+"").length),x.charAt(1)==="="&&(x=zi(p,x)+w),h=parseFloat(x),y=x.substr((h+"").length),c=Oi.lastIndex-y.length,y||(y=y||Xn.units[t]||w,c===r.length&&(r+=y,s.e+=y)),w!==y&&(p=Pr(n,t,g,y)||0),s._pt={_next:s._pt,p:v||l===1?v:",",s:p,c:h-p,m:m&&m<4||t==="zIndex"?Math.round:0});s.c=c<r.length?r.substring(c,r.length):""}else s.r=t==="display"&&r==="none"?AE:ME;return rg.test(r)&&(s.e=0),this._pt=s,s},TE={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},r4=function(n){var t=n.split(" "),o=t[0],r=t[1]||"50%";return(o==="top"||o==="bottom"||r==="left"||r==="right")&&(n=o,o=r,r=n),t[0]=TE[o]||o,t[1]=TE[r]||r,t.join(" ")},i4=function(n,t){if(t.tween&&t.tween._time===t.tween._dur){var o=t.t,r=o.style,i=t.u,a=o._gsap,s,c,l;if(i==="all"||i===!0)r.cssText="",c=1;else for(i=i.split(","),l=i.length;--l>-1;)s=i[l],Lo[s]&&(c=1,s=s==="transformOrigin"?Kn:Le),Br(o,s);c&&(Br(o,Le),a&&(a.svg&&o.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",fl(o,1),a.uncache=1,NE(r)))}},kf={clearProps:function(n,t,o,r,i){if(i.data!=="isFromStart"){var a=n._pt=new In(n._pt,t,o,0,0,i4);return a.u=r,a.pr=-10,a.tween=i,n._props.push(o),1}}},dl=[1,0,0,1,0,0],PE={},LE=function(n){return n==="matrix(1, 0, 0, 1, 0, 0)"||n==="none"||!n},qE=function(n){var t=ut(n,Le);return LE(t)?dl:t.substr(7).match(og).map(Ye)},Tg=function(n,t){var o=n._gsap||Ar(n),r=n.style,i=qE(n),a,s,c,l;return o.svg&&n.getAttribute("transform")?(c=n.transform.baseVal.consolidate().matrix,i=[c.a,c.b,c.c,c.d,c.e,c.f],i.join(",")==="1,0,0,1,0,0"?dl:i):(i===dl&&!n.offsetParent&&n!==ms&&!o.svg&&(c=r.display,r.display="block",a=n.parentNode,(!a||!n.offsetParent&&!n.getBoundingClientRect().width)&&(l=1,s=n.nextElementSibling,ms.appendChild(n)),i=qE(n),c?r.display=c:Br(n,"display"),l&&(s?a.insertBefore(n,s):a?a.appendChild(n):ms.removeChild(n))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},_g=function(n,t,o,r,i,a){var s=n._gsap,c=i||Tg(n,!0),l=s.xOrigin||0,u=s.yOrigin||0,f=s.xOffset||0,d=s.yOffset||0,p=c[0],m=c[1],g=c[2],x=c[3],h=c[4],v=c[5],y=t.split(" "),w=parseFloat(y[0])||0,b=parseFloat(y[1])||0,_,k,D,E;o?c!==dl&&(k=p*x-m*g)&&(D=w*(x/k)+b*(-g/k)+(g*v-x*h)/k,E=w*(-m/k)+b*(p/k)-(p*v-m*h)/k,w=D,b=E):(_=zE(n),w=_.x+(~y[0].indexOf("%")?w/100*_.width:w),b=_.y+(~(y[1]||y[0]).indexOf("%")?b/100*_.height:b)),r||r!==!1&&s.smooth?(h=w-l,v=b-u,s.xOffset=f+(h*p+v*g)-h,s.yOffset=d+(h*m+v*x)-v):s.xOffset=s.yOffset=0,s.xOrigin=w,s.yOrigin=b,s.smooth=!!r,s.origin=t,s.originIsAbsolute=!!o,n.style[Kn]="0px 0px",a&&(zr(a,s,"xOrigin",l,w),zr(a,s,"yOrigin",u,b),zr(a,s,"xOffset",f,s.xOffset),zr(a,s,"yOffset",d,s.yOffset)),n.setAttribute("data-svg-origin",w+" "+b)},fl=function(n,t){var o=n._gsap||new fg(n);if("x"in o&&!t&&!o.uncache)return o;var r=n.style,i=o.scaleX<0,a="px",s="deg",c=getComputedStyle(n),l=ut(n,Kn)||"0",u,f,d,p,m,g,x,h,v,y,w,b,_,k,D,E,R,A,P,I,C,T,q,M,N,O,V,H,U,Y,F,G;return u=f=d=g=x=h=v=y=w=0,p=m=1,o.svg=!!(n.getCTM&&BE(n)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(r[Le]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[Le]!=="none"?c[Le]:"")),r.scale=r.rotate=r.translate="none"),k=Tg(n,o.svg),o.svg&&(o.uncache?(N=n.getBBox(),l=o.xOrigin-N.x+"px "+(o.yOrigin-N.y)+"px",M=""):M=!t&&n.getAttribute("data-svg-origin"),_g(n,M||l,!!M||o.originIsAbsolute,o.smooth!==!1,k)),b=o.xOrigin||0,_=o.yOrigin||0,k!==dl&&(A=k[0],P=k[1],I=k[2],C=k[3],u=T=k[4],f=q=k[5],k.length===6?(p=Math.sqrt(A*A+P*P),m=Math.sqrt(C*C+I*I),g=A||P?ps(P,A)*ji:0,v=I||C?ps(I,C)*ji+g:0,v&&(m*=Math.abs(Math.cos(v*hs))),o.svg&&(u-=b-(b*A+_*I),f-=_-(b*P+_*C))):(G=k[6],Y=k[7],V=k[8],H=k[9],U=k[10],F=k[11],u=k[12],f=k[13],d=k[14],D=ps(G,U),x=D*ji,D&&(E=Math.cos(-D),R=Math.sin(-D),M=T*E+V*R,N=q*E+H*R,O=G*E+U*R,V=T*-R+V*E,H=q*-R+H*E,U=G*-R+U*E,F=Y*-R+F*E,T=M,q=N,G=O),D=ps(-I,U),h=D*ji,D&&(E=Math.cos(-D),R=Math.sin(-D),M=A*E-V*R,N=P*E-H*R,O=I*E-U*R,F=C*R+F*E,A=M,P=N,I=O),D=ps(P,A),g=D*ji,D&&(E=Math.cos(D),R=Math.sin(D),M=A*E+P*R,N=T*E+q*R,P=P*E-A*R,q=q*E-T*R,A=M,T=N),x&&Math.abs(x)+Math.abs(g)>359.9&&(x=g=0,h=180-h),p=Ye(Math.sqrt(A*A+P*P+I*I)),m=Ye(Math.sqrt(q*q+G*G)),D=ps(T,q),v=Math.abs(D)>2e-4?D*ji:0,w=F?1/(F<0?-F:F):0),o.svg&&(M=n.getAttribute("transform"),o.forceCSS=n.setAttribute("transform","")||!LE(ut(n,Le)),M&&n.setAttribute("transform",M))),Math.abs(v)>90&&Math.abs(v)<270&&(i?(p*=-1,v+=g<=0?180:-180,g+=g<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),t=t||o.uncache,o.x=u-((o.xPercent=u&&(!t&&o.xPercent||(Math.round(n.offsetWidth/2)===Math.round(-u)?-50:0)))?n.offsetWidth*o.xPercent/100:0)+a,o.y=f-((o.yPercent=f&&(!t&&o.yPercent||(Math.round(n.offsetHeight/2)===Math.round(-f)?-50:0)))?n.offsetHeight*o.yPercent/100:0)+a,o.z=d+a,o.scaleX=Ye(p),o.scaleY=Ye(m),o.rotation=Ye(g)+s,o.rotationX=Ye(x)+s,o.rotationY=Ye(h)+s,o.skewX=v+s,o.skewY=y+s,o.transformPerspective=w+a,(o.zOrigin=parseFloat(l.split(" ")[2])||!t&&o.zOrigin||0)&&(r[Kn]=Sf(l)),o.xOffset=o.yOffset=0,o.force3D=Xn.force3D,o.renderTransform=o.svg?s4:OE?jE:a4,o.uncache=0,o},Sf=function(n){return(n=n.split(" "))[0]+" "+n[1]},wg=function(n,t,o){var r=vn(t);return Ye(parseFloat(t)+parseFloat(Pr(n,"x",o+"px",r)))+r},a4=function(n,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,jE(n,t)},Pi="0deg",ul="0px",Li=") ",jE=function(n,t){var o=t||this,r=o.xPercent,i=o.yPercent,a=o.x,s=o.y,c=o.z,l=o.rotation,u=o.rotationY,f=o.rotationX,d=o.skewX,p=o.skewY,m=o.scaleX,g=o.scaleY,x=o.transformPerspective,h=o.force3D,v=o.target,y=o.zOrigin,w="",b=h==="auto"&&n&&n!==1||h===!0;if(y&&(f!==Pi||u!==Pi)){var _=parseFloat(u)*hs,k=Math.sin(_),D=Math.cos(_),E;_=parseFloat(f)*hs,E=Math.cos(_),a=wg(v,a,k*E*-y),s=wg(v,s,-Math.sin(_)*-y),c=wg(v,c,D*E*-y+y)}x!==ul&&(w+="perspective("+x+Li),(r||i)&&(w+="translate("+r+"%, "+i+"%) "),(b||a!==ul||s!==ul||c!==ul)&&(w+=c!==ul||b?"translate3d("+a+", "+s+", "+c+") ":"translate("+a+", "+s+Li),l!==Pi&&(w+="rotate("+l+Li),u!==Pi&&(w+="rotateY("+u+Li),f!==Pi&&(w+="rotateX("+f+Li),(d!==Pi||p!==Pi)&&(w+="skew("+d+", "+p+Li),(m!==1||g!==1)&&(w+="scale("+m+", "+g+Li),v.style[Le]=w||"translate(0, 0)"},s4=function(n,t){var o=t||this,r=o.xPercent,i=o.yPercent,a=o.x,s=o.y,c=o.rotation,l=o.skewX,u=o.skewY,f=o.scaleX,d=o.scaleY,p=o.target,m=o.xOrigin,g=o.yOrigin,x=o.xOffset,h=o.yOffset,v=o.forceCSS,y=parseFloat(a),w=parseFloat(s),b,_,k,D,E;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=hs,l*=hs,b=Math.cos(c)*f,_=Math.sin(c)*f,k=Math.sin(c-l)*-d,D=Math.cos(c-l)*d,l&&(u*=hs,E=Math.tan(l-u),E=Math.sqrt(1+E*E),k*=E,D*=E,u&&(E=Math.tan(u),E=Math.sqrt(1+E*E),b*=E,_*=E)),b=Ye(b),_=Ye(_),k=Ye(k),D=Ye(D)):(b=f,D=d,_=k=0),(y&&!~(a+"").indexOf("px")||w&&!~(s+"").indexOf("px"))&&(y=Pr(p,"x",a,"px"),w=Pr(p,"y",s,"px")),(m||g||x||h)&&(y=Ye(y+m-(m*b+g*k)+x),w=Ye(w+g-(m*_+g*D)+h)),(r||i)&&(E=p.getBBox(),y=Ye(y+r/100*E.width),w=Ye(w+i/100*E.height)),E="matrix("+b+","+_+","+k+","+D+","+y+","+w+")",p.setAttribute("transform",E),v&&(p.style[Le]=E)},c4=function(n,t,o,r,i){var a=360,s=nn(i),c=parseFloat(i)*(s&&~i.indexOf("rad")?ji:1),l=c-r,u=r+l+"deg",f,d;return s&&(f=i.split("_")[1],f==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),f==="cw"&&l<0?l=(l+a*SE)%a-~~(l/a)*a:f==="ccw"&&l>0&&(l=(l-a*SE)%a-~~(l/a)*a)),n._pt=d=new In(n._pt,t,o,r,l,F3),d.e=u,d.u="deg",n._props.push(o),d},RE=function(n,t){for(var o in t)n[o]=t[o];return n},l4=function(n,t,o){var r=RE({},o._gsap),i="perspective,force3D,transformOrigin,svgOrigin",a=o.style,s,c,l,u,f,d,p,m;r.svg?(l=o.getAttribute("transform"),o.setAttribute("transform",""),a[Le]=t,s=fl(o,1),Br(o,Le),o.setAttribute("transform",l)):(l=getComputedStyle(o)[Le],a[Le]=t,s=fl(o,1),a[Le]=l);for(c in Lo)l=r[c],u=s[c],l!==u&&i.indexOf(c)<0&&(p=vn(l),m=vn(u),f=p!==m?Pr(o,c,l,m):parseFloat(l),d=parseFloat(u),n._pt=new In(n._pt,s,c,f,d-f,bg),n._pt.u=m||0,n._props.push(c));RE(s,r)};Nn("padding,margin,Width,Radius",function(e,n){var t="Top",o="Right",r="Bottom",i="Left",a=(n<3?[t,o,r,i]:[t+i,t+o,r+o,r+i]).map(function(s){return n<2?e+s:"border"+s+e});kf[n>1?"border"+e:e]=function(s,c,l,u,f){var d,p;if(arguments.length<4)return d=a.map(function(m){return Po(s,m,l)}),p=d.join(" "),p.split(d[0]).length===5?d[0]:p;d=(u+"").split(" "),p={},a.forEach(function(m,g){return p[m]=d[g]=d[g]||d[(g-1)/2|0]}),s.init(c,p,f)}});var qg={name:"css",register:Sg,targetTest:function(n){return n.style&&n.nodeType},init:function(n,t,o,r,i){var a=this._props,s=n.style,c=o.vars.startAt,l,u,f,d,p,m,g,x,h,v,y,w,b,_,k,D,E;Dg||Sg(),this.styles=this.styles||IE(n),D=this.styles.props,this.tween=o;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Fn[g]&&mg(g,t,o,r,n,i)))){if(p=typeof u,m=kf[g],p==="function"&&(u=u.call(o,r,n,i),p=typeof u),p==="string"&&~u.indexOf("random(")&&(u=fs(u)),m)m(this,n,g,u,o)&&(k=1);else if(g.substr(0,2)==="--")l=(getComputedStyle(n).getPropertyValue(g)+"").trim(),u+="",zo.lastIndex=0,zo.test(l)||(x=vn(l),h=vn(u),h?x!==h&&(l=Pr(n,g,l,h)+h):x&&(u+=x)),this.add(s,"setProperty",l,u,r,i,0,0,g),a.push(g),D.push(g,0,s[g]);else if(p!=="undefined"){if(c&&g in c?(l=typeof c[g]=="function"?c[g].call(o,r,n,i):c[g],nn(l)&&~l.indexOf("random(")&&(l=fs(l)),vn(l+"")||l==="auto"||(l+=Xn.units[g]||vn(Po(n,g))||""),(l+"").charAt(1)==="="&&(l=Po(n,g))):l=Po(n,g),d=parseFloat(l),v=p==="string"&&u.charAt(1)==="="&&u.substr(0,2),v&&(u=u.substr(2)),f=parseFloat(u),g in co&&(g==="autoAlpha"&&(d===1&&Po(n,"visibility")==="hidden"&&f&&(d=0),D.push("visibility",0,s.visibility),zr(this,s,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),g!=="scale"&&g!=="transform"&&(g=co[g],~g.indexOf(",")&&(g=g.split(",")[0]))),y=g in Lo,y){if(this.styles.save(g),E=u,p==="string"&&u.substring(0,6)==="var(--"){if(u=ut(n,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var R=n.style.perspective;n.style.perspective=u,u=ut(n,"perspective"),R?n.style.perspective=R:Br(n,"perspective")}f=parseFloat(u)}if(w||(b=n._gsap,b.renderTransform&&!t.parseTransform||fl(n,t.parseTransform),_=t.smoothOrigin!==!1&&b.smooth,w=this._pt=new In(this._pt,s,Le,0,1,b.renderTransform,b,0,-1),w.dep=1),g==="scale")this._pt=new In(this._pt,b,"scaleY",b.scaleY,(v?zi(b.scaleY,v+f):f)-b.scaleY||0,bg),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){D.push(Kn,0,s[Kn]),u=r4(u),b.svg?_g(n,u,0,_,0,this):(h=parseFloat(u.split(" ")[2])||0,h!==b.zOrigin&&zr(this,b,"zOrigin",b.zOrigin,h),zr(this,s,g,Sf(l),Sf(u)));continue}else if(g==="svgOrigin"){_g(n,u,1,_,0,this);continue}else if(g in PE){c4(this,b,g,d,v?zi(d,v+u):u);continue}else if(g==="smoothOrigin"){zr(this,b,"smooth",b.smooth,u);continue}else if(g==="force3D"){b[g]=u;continue}else if(g==="transform"){l4(this,u,n);continue}}else g in s||(g=ys(g)||g);if(y||(f||f===0)&&(d||d===0)&&!U3.test(u)&&g in s)x=(l+"").substr((d+"").length),f||(f=0),h=vn(u)||(g in Xn.units?Xn.units[g]:x),x!==h&&(d=Pr(n,g,l,h)),this._pt=new In(this._pt,y?b:s,g,d,(v?zi(d,v+f):f)-d,!y&&(h==="px"||g==="zIndex")&&t.autoRound!==!1?X3:bg),this._pt.u=h||0,y&&E!==u?(this._pt.b=l,this._pt.e=E,this._pt.r=G3):x!==h&&h!=="%"&&(this._pt.b=l,this._pt.r=Y3);else if(g in s)o4.call(this,n,g,l,v?v+u:u);else if(g in n)this.add(n,g,l||n[g],v?v+u:u,r,i);else if(g!=="parseTransform"){gf(g,u);continue}y||(g in s?D.push(g,0,s[g]):typeof n[g]=="function"?D.push(g,2,n[g]()):D.push(g,1,l||n[g])),a.push(g)}}k&&xg(this)},render:function(n,t){if(t.tween._time||!Eg())for(var o=t._pt;o;)o.r(n,o.d),o=o._next;else t.styles.revert()},get:Po,aliases:co,getSetter:function(n,t,o){var r=co[t];return r&&r.indexOf(",")<0&&(t=r),t in Lo&&t!==Kn&&(n._gsap.x||Po(n,"x"))?o&&kE===o?t==="scale"?W3:Q3:(kE=o||{})&&(t==="scale"?$3:J3):n.style&&!yf(n.style[t])?K3:~t.indexOf("-")?Z3:bf(n,t)},core:{_removeProperty:Br,_getMatrix:Tg}};_n.utils.checkPrefix=ys;_n.core.getStyleSaver=IE;(function(e,n,t,o){var r=Nn(e+","+n+","+t,function(i){Lo[i]=1});Nn(n,function(i){Xn.units[i]="deg",PE[i]=1}),co[r[13]]=e+","+n,Nn(o,function(i){var a=i.split(":");co[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Nn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(e){Xn.units[e]="px"});_n.registerPlugin(qg);var Lr=_n.registerPlugin(qg)||_n,L9=Lr.core.Tween;var u4=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,d4=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,f4=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,p4=/(^[#\.][a-z]|[a-y][a-z])/i,m4=Math.PI/180,h4=180/Math.PI,_f=Math.sin,Df=Math.cos,Ct=Math.abs,jo=Math.sqrt,y4=Math.atan2,Rg=1e8,HE=function(n){return typeof n=="string"},XE=function(n){return typeof n=="number"},g4=function(n){return typeof n>"u"},v4={},x4={},Ef=1e5,KE=function(n){return Math.round((n+Rg)%1*Ef)/Ef||(n<0?0:1)},he=function(n){return Math.round(n*Ef)/Ef||0},VE=function(n){return Math.round(n*1e10)/1e10||0},UE=function(n){return n.closed=Math.abs(n[0]-n[n.length-2])<.001&&Math.abs(n[1]-n[n.length-1])<.001},FE=function(n,t,o,r){var i=n[t],a=r===1?6:Mg(i,o,r);if((a||!r)&&a+o+2<i.length)return n.splice(t,0,i.slice(0,o+a+2)),i.splice(0,o+a),1},ZE=function(n,t,o){var r=n.length,i=~~(o*r);if(n[i]>t){for(;--i&&n[i]>t;);i<0&&(i=0)}else for(;n[++i]<t&&i<r;);return i<r?i:r-1},w4=function(n,t){var o=n.length;for(t||n.reverse();o--;)n[o].reversed||S4(n[o])},YE=function(n,t){return t.totalLength=n.totalLength,n.samples?(t.samples=n.samples.slice(0),t.lookup=n.lookup.slice(0),t.minLength=n.minLength,t.resolution=n.resolution):n.totalPoints&&(t.totalPoints=n.totalPoints),t},b4=function(n,t){var o=n.length,r=n[o-1]||[],i=r.length;o&&t[0]===r[i-2]&&t[1]===r[i-1]&&(t=r.concat(t.slice(2)),o--),n[o]=t};function ml(e){e=HE(e)&&p4.test(e)&&document.querySelector(e)||e;var n=e.getAttribute?e:0,t;return n&&(e=e.getAttribute("d"))?(n._gsPath||(n._gsPath={}),t=n._gsPath[e],t&&!t._dirty?t:n._gsPath[e]=pl(e)):e?HE(e)?pl(e):XE(e[0])?[e]:e:console.warn("Expecting a <path> element or an SVG path data string")}function k4(e){for(var n=[],t=0;t<e.length;t++)n[t]=YE(e[t],e[t].slice(0));return YE(e,n)}function S4(e){var n=0,t;for(e.reverse();n<e.length;n+=2)t=e[n],e[n]=e[n+1],e[n+1]=t;e.reversed=!e.reversed}var _4=function(n,t){var o=document.createElementNS("http://www.w3.org/2000/svg","path"),r=[].slice.call(n.attributes),i=r.length,a;for(t=","+t+",";--i>-1;)a=r[i].nodeName.toLowerCase(),t.indexOf(","+a+",")<0&&o.setAttributeNS(null,a,r[i].nodeValue);return o},D4={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},E4=function(n,t){for(var o=t?t.split(","):[],r={},i=o.length;--i>-1;)r[o[i]]=+n.getAttribute(o[i])||0;return r};function QE(e,n){var t=e.tagName.toLowerCase(),o=.552284749831,r,i,a,s,c,l,u,f,d,p,m,g,x,h,v,y,w,b,_,k,D,E;return t==="path"||!e.getBBox?e:(l=_4(e,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),E=E4(e,D4[t]),t==="rect"?(s=E.rx,c=E.ry||s,i=E.x,a=E.y,p=E.width-s*2,m=E.height-c*2,s||c?(g=i+s*(1-o),x=i+s,h=x+p,v=h+s*o,y=h+s,w=a+c*(1-o),b=a+c,_=b+m,k=_+c*o,D=_+c,r="M"+y+","+b+" V"+_+" C"+[y,k,v,D,h,D,h-(h-x)/3,D,x+(h-x)/3,D,x,D,g,D,i,k,i,_,i,_-(_-b)/3,i,b+(_-b)/3,i,b,i,w,g,a,x,a,x+(h-x)/3,a,h-(h-x)/3,a,h,a,v,a,y,w,y,b].join(",")+"z"):r="M"+(i+p)+","+a+" v"+m+" h"+-p+" v"+-m+" h"+p+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(s=c=E.r,f=s*o):(s=E.rx,c=E.ry,f=c*o),i=E.cx,a=E.cy,u=s*o,r="M"+(i+s)+","+a+" C"+[i+s,a+f,i+u,a+c,i,a+c,i-u,a+c,i-s,a+f,i-s,a,i-s,a-f,i-u,a-c,i,a-c,i+u,a-c,i+s,a-f,i+s,a].join(",")+"z"):t==="line"?r="M"+E.x1+","+E.y1+" L"+E.x2+","+E.y2:(t==="polyline"||t==="polygon")&&(d=(e.getAttribute("points")+"").match(d4)||[],i=d.shift(),a=d.shift(),r="M"+i+","+a+" L"+d.join(","),t==="polygon"&&(r+=","+i+","+a+"z")),l.setAttribute("d",Ig(l._gsRawPath=pl(r))),n&&e.parentNode&&(e.parentNode.insertBefore(l,e),e.parentNode.removeChild(e)),l)}function WE(e,n,t){var o=e[n],r=e[n+2],i=e[n+4],a;return o+=(r-o)*t,r+=(i-r)*t,o+=(r-o)*t,a=r+(i+(e[n+6]-i)*t-r)*t-o,o=e[n+1],r=e[n+3],i=e[n+5],o+=(r-o)*t,r+=(i-r)*t,o+=(r-o)*t,he(y4(r+(i+(e[n+7]-i)*t-r)*t-o,a)*h4)}function Ag(e,n,t){t=g4(t)?1:VE(t)||0,n=VE(n)||0;var o=Math.max(0,~~(Ct(t-n)-1e-8)),r=k4(e);if(n>t&&(n=1-n,t=1-t,w4(r),r.totalLength=0),n<0||t<0){var i=Math.abs(~~Math.min(n,t))+1;n+=i,t+=i}r.totalLength||jr(r);var a=t>1,s=GE(r,n,v4,!0),c=GE(r,t,x4),l=c.segment,u=s.segment,f=c.segIndex,d=s.segIndex,p=c.i,m=s.i,g=d===f,x=p===m&&g,h,v,y,w,b,_,k,D;if(a||o){for(h=f<d||g&&p<m||x&&c.t<s.t,FE(r,d,m,s.t)&&(d++,h||(f++,x?(c.t=(c.t-s.t)/(1-s.t),p=0):g&&(p-=m))),Math.abs(1-(t-n))<1e-5?f=d-1:!c.t&&f?f--:FE(r,f,p,c.t)&&h&&d++,s.t===1&&(d=(d+1)%r.length),b=[],_=r.length,k=1+_*o,D=d,k+=(_-d+f)%_,w=0;w<k;w++)b4(b,r[D++%_]);r=b}else if(y=c.t===1?6:Mg(l,p,c.t),n!==t)for(v=Mg(u,m,x?s.t/c.t:s.t),g&&(y+=v),l.splice(p+y+2),(v||m)&&u.splice(0,m+v),w=r.length;w--;)(w<d||w>f)&&r.splice(w,1);else l.angle=WE(l,p+y,0),p+=y,s=l[p],c=l[p+1],l.length=l.totalLength=0,l.totalPoints=r.totalPoints=8,l.push(s,c,s,c,s,c,s,c);return r.totalLength=0,r}function C4(e,n,t){n=n||0,e.samples||(e.samples=[],e.lookup=[]);var o=~~e.resolution||12,r=1/o,i=t?n+t*6+1:e.length,a=e[n],s=e[n+1],c=n?n/6*o:0,l=e.samples,u=e.lookup,f=(n?e.minLength:Rg)||Rg,d=l[c+t*o-1],p=n?l[c-1]:0,m,g,x,h,v,y,w,b,_,k,D,E,R,A,P,I,C;for(l.length=u.length=0,g=n+2;g<i;g+=6){if(x=e[g+4]-a,h=e[g+2]-a,v=e[g]-a,b=e[g+5]-s,_=e[g+3]-s,k=e[g+1]-s,y=w=D=E=0,Ct(x)<.01&&Ct(b)<.01&&Ct(v)+Ct(k)<.01)e.length>8&&(e.splice(g,6),g-=6,i-=6);else for(m=1;m<=o;m++)A=r*m,R=1-A,y=w-(w=(A*A*x+3*R*(A*h+R*v))*A),D=E-(E=(A*A*b+3*R*(A*_+R*k))*A),I=jo(D*D+y*y),I<f&&(f=I),p+=I,l[c++]=p;a+=x,s+=b}if(d)for(d-=p;c<l.length;c++)l[c]+=d;if(l.length&&f){if(e.totalLength=C=l[l.length-1]||0,e.minLength=f,C/f<9999)for(I=P=0,m=0;m<C;m+=f)u[I++]=l[P]<m?++P:P}else e.totalLength=l[0]=0;return n?p-l[n/2-1]:p}function jr(e,n){var t,o,r;for(r=t=o=0;r<e.length;r++)e[r].resolution=~~n||12,t+=C4(e[r]),o+=e[r].length;return e.totalPoints=o,e.totalLength=t,e}function Mg(e,n,t){if(t<=0||t>=1)return 0;var o=e[n],r=e[n+1],i=e[n+2],a=e[n+3],s=e[n+4],c=e[n+5],l=e[n+6],u=e[n+7],f=o+(i-o)*t,d=i+(s-i)*t,p=r+(a-r)*t,m=a+(c-a)*t,g=f+(d-f)*t,x=p+(m-p)*t,h=s+(l-s)*t,v=c+(u-c)*t;return d+=(h-d)*t,m+=(v-m)*t,e.splice(n+2,4,he(f),he(p),he(g),he(x),he(g+(d-g)*t),he(x+(m-x)*t),he(d),he(m),he(h),he(v)),e.samples&&e.samples.splice(n/6*e.resolution|0,0,0,0,0,0,0,0),6}function GE(e,n,t,o){t=t||{},e.totalLength||jr(e),(n<0||n>1)&&(n=KE(n));var r=0,i=e[0],a,s,c,l,u,f,d;if(!n)d=f=r=0,i=e[0];else if(n===1)d=1,r=e.length-1,i=e[r],f=i.length-8;else{if(e.length>1){for(c=e.totalLength*n,u=f=0;(u+=e[f++].totalLength)<c;)r=f;i=e[r],l=u-i.totalLength,n=(c-l)/(u-l)||0}a=i.samples,s=i.resolution,c=i.totalLength*n,f=i.lookup.length?i.lookup[~~(c/i.minLength)]||0:ZE(a,c,n),l=f?a[f-1]:0,u=a[f],u<c&&(l=u,u=a[++f]),d=1/s*((c-l)/(u-l)+f%s),f=~~(f/s)*6,o&&d===1&&(f+6<i.length?(f+=6,d=0):r+1<e.length&&(f=d=0,i=e[++r]))}return t.t=d,t.i=f,t.path=e,t.segment=i,t.segIndex=r,t}function Ng(e,n,t,o){var r=e[0],i=o||{},a,s,c,l,u,f,d,p,m;if((n<0||n>1)&&(n=KE(n)),r.lookup||jr(e),e.length>1){for(c=e.totalLength*n,u=f=0;(u+=e[f++].totalLength)<c;)r=e[f];l=u-r.totalLength,n=(c-l)/(u-l)||0}return a=r.samples,s=r.resolution,c=r.totalLength*n,f=r.lookup.length?r.lookup[n<1?~~(c/r.minLength):r.lookup.length-1]||0:ZE(a,c,n),l=f?a[f-1]:0,u=a[f],u<c&&(l=u,u=a[++f]),d=1/s*((c-l)/(u-l)+f%s)||0,m=1-d,f=~~(f/s)*6,p=r[f],i.x=he((d*d*(r[f+6]-p)+3*m*(d*(r[f+4]-p)+m*(r[f+2]-p)))*d+p),i.y=he((d*d*(r[f+7]-(p=r[f+1]))+3*m*(d*(r[f+5]-p)+m*(r[f+3]-p)))*d+p),t&&(i.angle=r.totalLength?WE(r,f,d>=1?1-1e-9:d||1e-9):r.angle||0),i}function gs(e,n,t,o,r,i,a){for(var s=e.length,c,l,u,f,d;--s>-1;)for(c=e[s],l=c.length,u=0;u<l;u+=2)f=c[u],d=c[u+1],c[u]=f*n+d*o+i,c[u+1]=f*t+d*r+a;return e._dirty=1,e}function T4(e,n,t,o,r,i,a,s,c){if(!(e===s&&n===c)){t=Ct(t),o=Ct(o);var l=r%360*m4,u=Df(l),f=_f(l),d=Math.PI,p=d*2,m=(e-s)/2,g=(n-c)/2,x=u*m+f*g,h=-f*m+u*g,v=x*x,y=h*h,w=v/(t*t)+y/(o*o);w>1&&(t=jo(w)*t,o=jo(w)*o);var b=t*t,_=o*o,k=(b*_-b*y-_*v)/(b*y+_*v);k<0&&(k=0);var D=(i===a?-1:1)*jo(k),E=D*(t*h/o),R=D*-(o*x/t),A=(e+s)/2,P=(n+c)/2,I=A+(u*E-f*R),C=P+(f*E+u*R),T=(x-E)/t,q=(h-R)/o,M=(-x-E)/t,N=(-h-R)/o,O=T*T+q*q,V=(q<0?-1:1)*Math.acos(T/jo(O)),H=(T*N-q*M<0?-1:1)*Math.acos((T*M+q*N)/jo(O*(M*M+N*N)));isNaN(H)&&(H=d),!a&&H>0?H-=p:a&&H<0&&(H+=p),V%=p,H%=p;var U=Math.ceil(Ct(H)/(p/4)),Y=[],F=H/U,G=4/3*_f(F/2)/(1+Df(F/2)),oe=u*t,W=f*t,j=f*-o,X=u*o,Z;for(Z=0;Z<U;Z++)r=V+Z*F,x=Df(r),h=_f(r),T=Df(r+=F),q=_f(r),Y.push(x-G*h,h+G*x,T+G*q,q-G*T,T,q);for(Z=0;Z<Y.length;Z+=2)x=Y[Z],h=Y[Z+1],Y[Z]=x*oe+h*j+I,Y[Z+1]=x*W+h*X+C;return Y[Z-2]=s,Y[Z-1]=c,Y}}function pl(e){var n=(e+"").replace(f4,function(E){var R=+E;return R<1e-4&&R>-1e-4?0:R}).match(u4)||[],t=[],o=0,r=0,i=2/3,a=n.length,s=0,c="ERROR: malformed path: "+e,l,u,f,d,p,m,g,x,h,v,y,w,b,_,k,D=function(R,A,P,I){v=(P-R)/3,y=(I-A)/3,g.push(R+v,A+y,P-v,I-y,P,I)};if(!e||!isNaN(n[0])||isNaN(n[1]))return console.log(c),t;for(l=0;l<a;l++)if(b=p,isNaN(n[l])?(p=n[l].toUpperCase(),m=p!==n[l]):l--,f=+n[l+1],d=+n[l+2],m&&(f+=o,d+=r),l||(x=f,h=d),p==="M")g&&(g.length<8?t.length-=1:s+=g.length,UE(g)),o=x=f,r=h=d,g=[f,d],t.push(g),l+=2,p="L";else if(p==="C")g||(g=[0,0]),m||(o=r=0),g.push(f,d,o+n[l+3]*1,r+n[l+4]*1,o+=n[l+5]*1,r+=n[l+6]*1),l+=6;else if(p==="S")v=o,y=r,(b==="C"||b==="S")&&(v+=o-g[g.length-4],y+=r-g[g.length-3]),m||(o=r=0),g.push(v,y,f,d,o+=n[l+3]*1,r+=n[l+4]*1),l+=4;else if(p==="Q")v=o+(f-o)*i,y=r+(d-r)*i,m||(o=r=0),o+=n[l+3]*1,r+=n[l+4]*1,g.push(v,y,o+(f-o)*i,r+(d-r)*i,o,r),l+=4;else if(p==="T")v=o-g[g.length-4],y=r-g[g.length-3],g.push(o+v,r+y,f+(o+v*1.5-f)*i,d+(r+y*1.5-d)*i,o=f,r=d),l+=2;else if(p==="H")D(o,r,o=f,r),l+=1;else if(p==="V")D(o,r,o,r=f+(m?r-o:0)),l+=1;else if(p==="L"||p==="Z")p==="Z"&&(f=x,d=h,g.closed=!0),(p==="L"||Ct(o-f)>.5||Ct(r-d)>.5)&&(D(o,r,f,d),p==="L"&&(l+=2)),o=f,r=d;else if(p==="A"){if(_=n[l+4],k=n[l+5],v=n[l+6],y=n[l+7],u=7,_.length>1&&(_.length<3?(y=v,v=k,u--):(y=k,v=_.substr(2),u-=2),k=_.charAt(1),_=_.charAt(0)),w=T4(o,r,+n[l+1],+n[l+2],+n[l+3],+_,+k,(m?o:0)+v*1,(m?r:0)+y*1),l+=u,w)for(u=0;u<w.length;u++)g.push(w[u]);o=g[g.length-2],r=g[g.length-1]}else console.log(c);return l=g.length,l<6?(t.pop(),l=0):UE(g),t.totalPoints=s+l,t}function $E(e,n){n===void 0&&(n=1);for(var t=e[0],o=0,r=[t,o],i=2;i<e.length;i+=2)r.push(t,o,e[i],o=(e[i]-t)*n/2,t=e[i],-o);return r}function Cf(e,n){Ct(e[0]-e[2])<1e-4&&Ct(e[1]-e[3])<1e-4&&(e=e.slice(2));var t=e.length-2,o=+e[0],r=+e[1],i=+e[2],a=+e[3],s=[o,r,o,r],c=i-o,l=a-r,u=e.nonSmooth||[],f=Math.abs(e[t]-o)<.001&&Math.abs(e[t+1]-r)<.001,d,p,m,g,x,h,v,y,w,b,_,k,D,E,R;if(!t)return[o,r,o,r,o,r,o,r];for(f&&(e.push(i,a),i=o,a=r,o=e[t-2],r=e[t-1],e.unshift(o,r),t+=4,u=[0,0].concat(u)),n=n||n===0?+n:1,m=2;m<t;m+=2)if(d=o,p=r,o=i,r=a,i=+e[m+2],a=+e[m+3],!(o===i&&r===a)){if(g=c,x=l,c=i-o,l=a-r,u[m]){s.push(o-(o-d)/4,r-(r-p)/4,o,r,o+(i-o)/4,r+(a-r)/4);continue}h=jo(g*g+x*x),v=jo(c*c+l*l),y=jo(Math.pow(c/v+g/h,2)+Math.pow(l/v+x/h,2)),w=(h+v)*n*.25/y,b=o-(o-d)*(h?w/h:0),_=o+(i-o)*(v?w/v:0),k=o-(b+((_-b)*(h*3/(h+v)+.5)/4||0)),D=r-(r-p)*(h?w/h:0),E=r+(a-r)*(v?w/v:0),R=r-(D+((E-D)*(h*3/(h+v)+.5)/4||0)),s.push(he(b+k),he(D+R),he(o),he(r),he(_+k),he(E+R))}return o!==i||r!==a||s.length<4?s.push(he(i),he(a),he(i),he(a)):s.length-=2,s.length===2?s.push(o,r,o,r,o,r):f&&(s.splice(0,6),s.length-=6),s.closed=f,s}function Ig(e){XE(e[0])&&(e=[e]);var n="",t=e.length,o,r,i,a;for(r=0;r<t;r++){for(a=e[r],n+="M"+he(a[0])+","+he(a[1])+" C",o=a.length,i=2;i<o;i++)n+=he(a[i++])+","+he(a[i++])+" "+he(a[i++])+","+he(a[i++])+" "+he(a[i++])+","+he(a[i])+" ";a.closed&&(n+="z")}return n}var Ho,Vi,Pg,Rf,hl,Tf,qf,yl,Lt="transform",Bg=Lt+"Origin",JE,e2=function(n){var t=n.ownerDocument||n;for(!(Lt in n.style)&&("msTransform"in n.style)&&(Lt="msTransform",Bg=Lt+"Origin");t.parentNode&&(t=t.parentNode););if(Vi=window,qf=new gl,t){Ho=t,Pg=t.documentElement,Rf=t.body,yl=Ho.createElementNS("http://www.w3.org/2000/svg","g"),yl.style.transform="none";var o=t.createElement("div"),r=t.createElement("div"),i=t&&(t.body||t.firstElementChild);i&&i.appendChild&&(i.appendChild(o),o.appendChild(r),o.style.position="static",o.style.transform="translate3d(0,0,1px)",JE=r.offsetParent!==o,i.removeChild(o))}return t},q4=function(n){for(var t,o;n&&n!==Rf;)o=n._gsap,o&&o.uncache&&o.get(n,"x"),o&&!o.scaleX&&!o.scaleY&&o.renderTransform&&(o.scaleX=o.scaleY=1e-4,o.renderTransform(1,o),t?t.push(o):t=[o]),n=n.parentNode;return t},n2=[],t2=[],R4=function(){return Vi.pageYOffset||Ho.scrollTop||Pg.scrollTop||Rf.scrollTop||0},M4=function(){return Vi.pageXOffset||Ho.scrollLeft||Pg.scrollLeft||Rf.scrollLeft||0},Lg=function(n){return n.ownerSVGElement||((n.tagName+"").toLowerCase()==="svg"?n:null)},A4=function e(n){if(Vi.getComputedStyle(n).position==="fixed")return!0;if(n=n.parentNode,n&&n.nodeType===1)return e(n)},Og=function e(n,t){if(n.parentNode&&(Ho||e2(n))){var o=Lg(n),r=o?o.getAttribute("xmlns")||"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",i=o?t?"rect":"g":"div",a=t!==2?0:100,s=t===3?100:0,c={position:"absolute",display:"block",pointerEvents:"none",margin:"0",padding:"0"},l=Ho.createElementNS?Ho.createElementNS(r.replace(/^https/,"http"),i):Ho.createElement(i);return t&&(o?(Tf||(Tf=e(n)),l.setAttribute("width",.01),l.setAttribute("height",.01),l.setAttribute("transform","translate("+a+","+s+")"),l.setAttribute("fill","transparent"),Tf.appendChild(l)):(hl||(hl=e(n),Object.assign(hl.style,c)),Object.assign(l.style,c,{width:"0.1px",height:"0.1px",top:s+"px",left:a+"px"}),hl.appendChild(l))),l}throw"Need document and parent."},N4=function(n){for(var t=new gl,o=0;o<n.numberOfItems;o++)t.multiply(n.getItem(o).matrix);return t},I4=function(n){var t=n.getCTM(),o;return t||(o=n.style[Lt],n.style[Lt]="none",n.appendChild(yl),t=yl.getCTM(),n.removeChild(yl),o?n.style[Lt]=o:n.style.removeProperty(Lt.replace(/([A-Z])/g,"-$1").toLowerCase())),t||qf.clone()},O4=function(n,t){var o=Lg(n),r=n===o,i=o?n2:t2,a=n.parentNode,s=a&&!o&&a.shadowRoot&&a.shadowRoot.appendChild?a.shadowRoot:a,c,l,u,f,d,p;if(n===Vi)return n;if(i.length||i.push(Og(n,1),Og(n,2),Og(n,3)),c=o?Tf:hl,o)r?(u=I4(n),f=-u.e/u.a,d=-u.f/u.d,l=qf):n.getBBox?(u=n.getBBox(),l=n.transform?n.transform.baseVal:{},l=l.numberOfItems?l.numberOfItems>1?N4(l):l.getItem(0).matrix:qf,f=l.a*u.x+l.c*u.y,d=l.b*u.x+l.d*u.y):(l=new gl,f=d=0),t&&n.tagName.toLowerCase()==="g"&&(f=d=0),(r||!n.getBoundingClientRect().width?o:a).appendChild(c),c.setAttribute("transform","matrix("+l.a+","+l.b+","+l.c+","+l.d+","+(l.e+f)+","+(l.f+d)+")");else{if(f=d=0,JE)for(l=n.offsetParent,u=n;u&&(u=u.parentNode)&&u!==l&&u.parentNode;)(Vi.getComputedStyle(u)[Lt]+"").length>4&&(f=u.offsetLeft,d=u.offsetTop,u=0);if(p=Vi.getComputedStyle(n),p.position!=="absolute"&&p.position!=="fixed")for(l=n.offsetParent;a&&a!==l;)f+=a.scrollLeft||0,d+=a.scrollTop||0,a=a.parentNode;u=c.style,u.top=n.offsetTop-d+"px",u.left=n.offsetLeft-f+"px",u[Lt]=p[Lt],u[Bg]=p[Bg],u.position=p.position==="fixed"?"fixed":"absolute",s.appendChild(c)}return c},zg=function(n,t,o,r,i,a,s){return n.a=t,n.b=o,n.c=r,n.d=i,n.e=a,n.f=s,n},gl=(function(){function e(t,o,r,i,a,s){t===void 0&&(t=1),o===void 0&&(o=0),r===void 0&&(r=0),i===void 0&&(i=1),a===void 0&&(a=0),s===void 0&&(s=0),zg(this,t,o,r,i,a,s)}var n=e.prototype;return n.inverse=function(){var o=this.a,r=this.b,i=this.c,a=this.d,s=this.e,c=this.f,l=o*a-r*i||1e-10;return zg(this,a/l,-r/l,-i/l,o/l,(i*c-a*s)/l,-(o*c-r*s)/l)},n.multiply=function(o){var r=this.a,i=this.b,a=this.c,s=this.d,c=this.e,l=this.f,u=o.a,f=o.c,d=o.b,p=o.d,m=o.e,g=o.f;return zg(this,u*r+d*a,u*i+d*s,f*r+p*a,f*i+p*s,c+m*r+g*a,l+m*i+g*s)},n.clone=function(){return new e(this.a,this.b,this.c,this.d,this.e,this.f)},n.equals=function(o){var r=this.a,i=this.b,a=this.c,s=this.d,c=this.e,l=this.f;return r===o.a&&i===o.b&&a===o.c&&s===o.d&&c===o.e&&l===o.f},n.apply=function(o,r){r===void 0&&(r={});var i=o.x,a=o.y,s=this.a,c=this.b,l=this.c,u=this.d,f=this.e,d=this.f;return r.x=i*s+a*l+f||0,r.y=i*c+a*u+d||0,r},e})();function Ui(e,n,t,o){if(!e||!e.parentNode||(Ho||e2(e)).documentElement===e)return new gl;var r=q4(e),i=Lg(e),a=i?n2:t2,s=O4(e,t),c=a[0].getBoundingClientRect(),l=a[1].getBoundingClientRect(),u=a[2].getBoundingClientRect(),f=s.parentNode,d=!o&&A4(e),p=new gl((l.left-c.left)/100,(l.top-c.top)/100,(u.left-c.left)/100,(u.top-c.top)/100,c.left+(d?0:M4()),c.top+(d?0:R4()));if(f.removeChild(s),r)for(c=r.length;c--;)l=r[c],l.scaleX=l.scaleY=0,l.renderTransform(1,l);return n?p.inverse():p}var z4="x,translateX,left,marginLeft,xPercent".split(","),B4="y,translateY,top,marginTop,yPercent".split(","),P4=Math.PI/180,Tt,a2,vs,Hg,jg,o2,L4=function(){return Tt||typeof window<"u"&&(Tt=window.gsap)&&Tt.registerPlugin&&Tt},vl=function(n,t,o,r){for(var i=t.length,a=r===2?0:r,s=0,c;s<i;s++)n[a]=c=parseFloat(t[s][o]),r===2&&(n[a+1]=0),a+=2;return n},xs=function(n,t,o){return parseFloat(n._gsap.get(n,t,o||"px"))||0},s2=function(n){var t=n[0],o=n[1],r;for(r=2;r<n.length;r+=2)t=n[r]+=t,o=n[r+1]+=o},r2=function(n,t,o,r,i,a,s,c,l){if(s.type==="cubic")t=[t];else{s.fromCurrent!==!1&&t.unshift(xs(o,r,c),i?xs(o,i,l):0),s.relative&&s2(t);var u=i?Cf:$E;t=[u(t,s.curviness)]}return t=a(c2(t,o,s)),Mf(n,o,r,t,"x",c),i&&Mf(n,o,i,t,"y",l),jr(t,s.resolution||(s.curviness===0?20:12))},j4=function(n){return n},H4=/[-+\.]*\d+\.?(?:e-|e\+)?\d*/g,i2=function(n,t,o){var r=Ui(n),i=0,a=0,s;return(n.tagName+"").toLowerCase()==="svg"?(s=n.viewBox.baseVal,s.width||(s={width:+n.getAttribute("width"),height:+n.getAttribute("height")})):s=t&&n.getBBox&&n.getBBox(),t&&t!=="auto"&&(i=t.push?t[0]*(s?s.width:n.offsetWidth||0):t.x,a=t.push?t[1]*(s?s.height:n.offsetHeight||0):t.y),o.apply(i||a?r.apply({x:i,y:a}):{x:r.e,y:r.f})},Vg=function(n,t,o,r){var i=Ui(n.parentNode,!0,!0),a=i.clone().multiply(Ui(t)),s=i2(n,o,i),c=i2(t,r,i),l=c.x,u=c.y,f;return a.e=a.f=0,r==="auto"&&t.getTotalLength&&t.tagName.toLowerCase()==="path"&&(f=t.getAttribute("d").match(H4)||[],f=a.apply({x:+f[0],y:+f[1]}),l+=f.x,u+=f.y),f&&(f=a.apply(t.getBBox()),l-=f.x,u-=f.y),a.e=l-s.x,a.f=u-s.y,a},c2=function(n,t,o){var r=o.align,i=o.matrix,a=o.offsetX,s=o.offsetY,c=o.alignOrigin,l=n[0][0],u=n[0][1],f=xs(t,"x"),d=xs(t,"y"),p,m,g;return!n||!n.length?ml("M0,0L0,0"):(r&&(r==="self"||(p=Hg(r)[0]||t)===t?gs(n,1,0,0,1,f-l,d-u):(c&&c[2]!==!1?Tt.set(t,{transformOrigin:c[0]*100+"% "+c[1]*100+"%"}):c=[xs(t,"xPercent")/-100,xs(t,"yPercent")/-100],m=Vg(t,p,c,"auto"),g=m.apply({x:l,y:u}),gs(n,m.a,m.b,m.c,m.d,f+m.e-(g.x-m.e),d+m.f-(g.y-m.f)))),i?gs(n,i.a,i.b,i.c,i.d,i.e,i.f):(a||s)&&gs(n,1,0,0,1,a||0,s||0),n)},Mf=function(n,t,o,r,i,a){var s=t._gsap,c=s.harness,l=c&&c.aliases&&c.aliases[o],u=l&&l.indexOf(",")<0?l:o,f=n._pt=new a2(n._pt,t,u,0,0,j4,0,s.set(t,u,n));f.u=vs(s.get(t,u,a))||0,f.path=r,f.pp=i,n._props.push(u)},V4=function(n,t){return function(o){return n||t!==1?Ag(o,n,t):o}},Ug={version:"3.15.0",name:"motionPath",register:function(n,t,o){Tt=n,vs=Tt.utils.getUnit,Hg=Tt.utils.toArray,jg=Tt.core.getStyleSaver,o2=Tt.core.reverting||function(){},a2=o},init:function(n,t,o){if(!Tt)return console.warn("Please gsap.registerPlugin(MotionPathPlugin)"),!1;(!(typeof t=="object"&&!t.style)||!t.path)&&(t={path:t});var r=[],i=t,a=i.path,s=i.autoRotate,c=i.unitX,l=i.unitY,u=i.x,f=i.y,d=a[0],p=V4(t.start,"end"in t?t.end:1),m,g;if(this.rawPaths=r,this.target=n,this.tween=o,this.styles=jg&&jg(n,"transform"),(this.rotate=s||s===0)&&(this.rOffset=parseFloat(s)||0,this.radians=!!t.useRadians,this.rProp=t.rotation||"rotation",this.rSet=n._gsap.set(n,this.rProp,this),this.ru=vs(n._gsap.get(n,this.rProp))||0),Array.isArray(a)&&!("closed"in a)&&typeof d!="number"){for(g in d)!u&&~z4.indexOf(g)?u=g:!f&&~B4.indexOf(g)&&(f=g);u&&f?r.push(r2(this,vl(vl([],a,u,0),a,f,1),n,u,f,p,t,c||vs(a[0][u]),l||vs(a[0][f]))):u=f=0;for(g in d)g!==u&&g!==f&&r.push(r2(this,vl([],a,g,2),n,g,0,p,t,vs(a[0][g])))}else m=p(c2(ml(t.path),n,t)),jr(m,t.resolution),r.push(m),Mf(this,n,t.x||"x",m,"x",t.unitX||"px"),Mf(this,n,t.y||"y",m,"y",t.unitY||"px");o.vars.immediateRender&&this.render(o.progress(),this)},render:function(n,t){var o=t.rawPaths,r=o.length,i=t._pt;if(t.tween._time||!o2()){for(n>1?n=1:n<0&&(n=0);r--;)Ng(o[r],n,!r&&t.rotate,o[r]);for(;i;)i.set(i.t,i.p,i.path[i.pp]+i.u,i.d,n),i=i._next;t.rotate&&t.rSet(t.target,t.rProp,o[0].angle*(t.radians?P4:1)+t.rOffset+t.ru,t,n)}else t.styles.revert()},getLength:function(n){return jr(ml(n)).totalLength},sliceRawPath:Ag,getRawPath:ml,pointsToSegment:Cf,stringToRawPath:pl,rawPathToString:Ig,transformRawPath:gs,getGlobalMatrix:Ui,getPositionOnPath:Ng,cacheRawPathMeasurements:jr,convertToPath:function(n,t){return Hg(n).map(function(o){return QE(o,t!==!1)})},convertCoordinates:function(n,t,o){var r=Ui(t,!0,!0).multiply(Ui(n));return o?r.apply(o):r},getAlignMatrix:Vg,getRelativePosition:function(n,t,o,r){var i=Vg(n,t,o,r);return{x:i.e,y:i.f}},arrayToRawPath:function(n,t){t=t||{};var o=vl(vl([],n,t.x||"x",0),n,t.y||"y",1);return t.relative&&s2(o),[t.type==="cubic"?o:Cf(o,t.curviness)]}};L4()&&Tt.registerPlugin(Ug);var Fg={id:"circuit",layoutOptions:{"elk.algorithm":"layered","elk.direction":"RIGHT","elk.edgeRouting":"ORTHOGONAL","elk.spacing.nodeNode":"44","elk.layered.spacing.nodeNodeBetweenLayers":"32","elk.layered.spacing.edgeNodeBetweenLayers":"12","elk.spacing.edgeNode":"12","elk.layered.nodePlacement.strategy":"NETWORK_SIMPLEX","elk.layered.considerModelOrder.strategy":"NODES_AND_EDGES","elk.padding":"[top=48,left=40,bottom=48,right=40]"},children:[{id:"route",width:150,height:148,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"route-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:73},{id:"route-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:150,y:73}],$H:277,x:42,y:48},{id:"wire",width:150,height:148,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"wire-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:73},{id:"wire-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:150,y:73}],$H:282,x:228,y:135},{id:"admission",width:248,height:335,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"admission-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:167},{id:"admission-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:248,y:167}],$H:286,x:414,y:135},{id:"fuse",width:168,height:148,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"fuse-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:73},{id:"fuse-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:168,y:73}],$H:290,x:716.5,y:322},{id:"retry",width:170,height:150,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"retry-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:74},{id:"retry-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:170,y:74}],$H:294,x:942,y:135},{id:"latch",width:176,height:168,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"latch-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:83},{id:"latch-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:176,y:83}],$H:298,x:939,y:495},{id:"recovery",width:205,height:228,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"recovery-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:113},{id:"recovery-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:205,y:113}],$H:302,x:698,y:495},{id:"ack",width:170,height:148,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"ack-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:73},{id:"ack-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:170,y:73}],$H:306,x:1161,y:601},{id:"local",width:157,height:128,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"local-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:63},{id:"local-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:157,y:63}],$H:310,x:1151,y:58},{id:"done",width:157,height:128,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"done-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:63},{id:"done-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:157,y:63}],$H:314,x:1377,y:611},{id:"halt",width:190,height:128,layoutOptions:{"elk.portConstraints":"FIXED_SIDE"},ports:[{id:"halt-in",width:2,height:2,layoutOptions:{"elk.port.side":"WEST"},x:-2,y:63},{id:"halt-out",width:2,height:2,layoutOptions:{"elk.port.side":"EAST"},x:190,y:63}],$H:318,x:1151,y:418}],edges:[{id:"route-wire",sources:["route-out"],targets:["wire-in"],sections:[{id:"route-wire_s0",startPoint:{x:194,y:122},endPoint:{x:226,y:209},bendPoints:[{x:206,y:122},{x:206,y:209}],incomingShape:"route-out",outgoingShape:"wire-in"}],junctionPoints:[{x:206,y:122}],container:"circuit"},{id:"route-local",sources:["route-out"],targets:["local-in"],sections:[{id:"route-local_s0",startPoint:{x:194,y:122},endPoint:{x:1149,y:122},incomingShape:"route-out",outgoingShape:"local-in"}],container:"circuit"},{id:"wire-admission",sources:["wire-out"],targets:["admission-in"],sections:[{id:"wire-admission_s0",startPoint:{x:380,y:209},endPoint:{x:412,y:303},bendPoints:[{x:392,y:209},{x:392,y:303}],incomingShape:"wire-out",outgoingShape:"admission-in"}],junctionPoints:[{x:392,y:209},{x:392,y:303}],container:"circuit"},{id:"wire-retry",sources:["wire-out"],targets:["retry-in"],sections:[{id:"wire-retry_s0",startPoint:{x:380,y:209},endPoint:{x:940,y:210},bendPoints:[{x:392,y:209},{x:392,y:122},{x:917,y:122},{x:917,y:210}],incomingShape:"wire-out",outgoingShape:"retry-in"}],junctionPoints:[{x:392,y:122},{x:917,y:122},{x:917,y:210}],container:"circuit"},{id:"wire-halt",sources:["wire-out"],targets:["halt-in"],sections:[{id:"wire-halt_s0",startPoint:{x:380,y:209},endPoint:{x:1149,y:482},bendPoints:[{x:392,y:209},{x:392,y:482}],incomingShape:"wire-out",outgoingShape:"halt-in"}],container:"circuit"},{id:"admission-fuse",sources:["admission-out"],targets:["fuse-in"],sections:[{id:"admission-fuse_s0",startPoint:{x:664,y:303},endPoint:{x:714.5,y:396},bendPoints:[{x:676,y:303},{x:676,y:396}],incomingShape:"admission-out",outgoingShape:"fuse-in"}],junctionPoints:[{x:676,y:396}],container:"circuit"},{id:"admission-latch",sources:["admission-out"],targets:["latch-in"],sections:[{id:"admission-latch_s0",startPoint:{x:664,y:303},endPoint:{x:937,y:579},bendPoints:[{x:676,y:303},{x:676,y:735},{x:917,y:735},{x:917,y:579}],incomingShape:"admission-out",outgoingShape:"latch-in"}],container:"circuit"},{id:"admission-halt",sources:["admission-out"],targets:["halt-in"],sections:[{id:"admission-halt_s0",startPoint:{x:664,y:303},endPoint:{x:1149,y:482},bendPoints:[{x:676,y:303},{x:676,y:482}],incomingShape:"admission-out",outgoingShape:"halt-in"}],junctionPoints:[{x:676,y:482}],container:"circuit"},{id:"fuse-retry",sources:["fuse-out"],targets:["retry-in"],sections:[{id:"fuse-retry_s0",startPoint:{x:886.5,y:396},endPoint:{x:940,y:210},bendPoints:[{x:917,y:396},{x:917,y:210}],incomingShape:"fuse-out",outgoingShape:"retry-in"}],junctionPoints:[{x:917,y:396}],container:"circuit"},{id:"fuse-halt",sources:["fuse-out"],targets:["halt-in"],sections:[{id:"fuse-halt_s0",startPoint:{x:886.5,y:396},endPoint:{x:1149,y:482},bendPoints:[{x:917,y:396},{x:917,y:482}],incomingShape:"fuse-out",outgoingShape:"halt-in"}],junctionPoints:[{x:917,y:482}],container:"circuit"},{id:"retry-local",sources:["retry-out"],targets:["local-in"],sections:[{id:"retry-local_s0",startPoint:{x:1114,y:210},endPoint:{x:1149,y:122},bendPoints:[{x:1129,y:210},{x:1129,y:122}],incomingShape:"retry-out",outgoingShape:"local-in"}],junctionPoints:[{x:1129,y:210},{x:1129,y:122}],container:"circuit"},{id:"retry-halt",sources:["retry-out"],targets:["halt-in"],sections:[{id:"retry-halt_s0",startPoint:{x:1114,y:210},endPoint:{x:1149,y:482},bendPoints:[{x:1129,y:210},{x:1129,y:482}],incomingShape:"retry-out",outgoingShape:"halt-in"}],junctionPoints:[{x:1129,y:482}],container:"circuit"},{id:"latch-ack",sources:["latch-out"],targets:["ack-in"],sections:[{id:"latch-ack_s0",startPoint:{x:1117,y:579},endPoint:{x:1159,y:675},bendPoints:[{x:1129,y:579},{x:1129,y:675}],incomingShape:"latch-out",outgoingShape:"ack-in"}],junctionPoints:[{x:1129,y:579},{x:1129,y:675}],container:"circuit"},{id:"latch-recovery",sources:["latch-out"],targets:["recovery-in"],sections:[{id:"latch-recovery_s0",startPoint:{x:1117,y:579},endPoint:{x:696,y:609},bendPoints:[{x:1129,y:579},{x:1129,y:482},{x:676,y:482},{x:676,y:609}],incomingShape:"latch-out",outgoingShape:"recovery-in"}],junctionPoints:[{x:676,y:609}],container:"circuit"},{id:"latch-halt",sources:["latch-out"],targets:["halt-in"],sections:[{id:"latch-halt_s0",startPoint:{x:1117,y:579},endPoint:{x:1149,y:482},bendPoints:[{x:1129,y:579},{x:1129,y:482}],incomingShape:"latch-out",outgoingShape:"halt-in"}],container:"circuit"},{id:"recovery-latch",sources:["recovery-out"],targets:["latch-in"],sections:[{id:"recovery-latch_s0",startPoint:{x:905,y:609},endPoint:{x:937,y:579},bendPoints:[{x:917,y:609},{x:917,y:579}],incomingShape:"recovery-out",outgoingShape:"latch-in"}],junctionPoints:[{x:917,y:609},{x:917,y:579}],container:"circuit"},{id:"recovery-ack",sources:["recovery-out"],targets:["ack-in"],sections:[{id:"recovery-ack_s0",startPoint:{x:905,y:609},endPoint:{x:1159,y:675},bendPoints:[{x:917,y:609},{x:917,y:675}],incomingShape:"recovery-out",outgoingShape:"ack-in"}],junctionPoints:[{x:917,y:675}],container:"circuit"},{id:"recovery-halt",sources:["recovery-out"],targets:["halt-in"],sections:[{id:"recovery-halt_s0",startPoint:{x:905,y:609},endPoint:{x:1149,y:482},bendPoints:[{x:917,y:609},{x:917,y:482}],incomingShape:"recovery-out",outgoingShape:"halt-in"}],container:"circuit"},{id:"ack-done",sources:["ack-out"],targets:["done-in"],sections:[{id:"ack-done_s0",startPoint:{x:1333,y:675},endPoint:{x:1375,y:675},incomingShape:"ack-out",outgoingShape:"done-in"}],container:"circuit"}],$H:13,x:0,y:0,width:1576,height:797};var l2={"head:packages/daemon/src/daemon-admission.ts":{version:"head",path:"packages/daemon/src/daemon-admission.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"6b381f171ec9523aa75e754caba82530240bd75c80d04774e7112a33e35b1cbe",text:`export type DaemonExecuteRejectionCode =
  | "not-ready"
  | "draining"
  | "resource-pressure"
  | "incompatible";

export type AcceptedRequestCompatibility = "unseen" | "matching" | "conflicting";

export type WorkspaceRequestQueueState = "accepting" | "draining" | "closed";

export type DaemonExecutionCoordinates = {
  readonly instanceId: string;
  readonly processToken: string;
  readonly requestId: string;
};

export type DaemonRejectedExecutionFrame = {
  readonly kind: "rejected";
  readonly instanceId: string;
  readonly processToken: string;
  readonly requestId: string;
  readonly code: DaemonExecuteRejectionCode;
  readonly retrySafe: boolean;
};

export interface DaemonAdmissionContext {
  readonly request: unknown;
  readonly authenticated: boolean;
  readonly workerReady: boolean;
  readonly resourceAdmissionPaused: boolean;
  readonly queueState: WorkspaceRequestQueueState;
  readonly compatibility: AcceptedRequestCompatibility;
}

export interface DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined;
}

export type DaemonAdmissionRejectionCode = "authentication" | DaemonExecuteRejectionCode;

export type DaemonAdmissionDecision =
  | { readonly kind: "accept" }
  | { readonly kind: "disconnect"; readonly code: "authentication" }
  | { readonly kind: "reject"; readonly code: DaemonExecuteRejectionCode };

class AuthenticationAdmissionGuard implements DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined {
    return context.authenticated ? undefined : "authentication";
  }
}

class WorkerReadinessAdmissionGuard implements DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined {
    return context.workerReady ? undefined : "not-ready";
  }
}

class ResourceAdmissionGuard implements DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined {
    return context.resourceAdmissionPaused ? "resource-pressure" : undefined;
  }
}

class QueueAdmissionGuard implements DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined {
    return context.queueState === "accepting" ? undefined : "draining";
  }
}

class CompatibilityAdmissionGuard implements DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined {
    return context.compatibility === "conflicting" ? "incompatible" : undefined;
  }
}

export class DaemonAdmissionPolicy {
  private readonly guards: readonly DaemonAdmissionGuard[] = [
    new AuthenticationAdmissionGuard(),
    new WorkerReadinessAdmissionGuard(),
    new ResourceAdmissionGuard(),
    new QueueAdmissionGuard(),
    new CompatibilityAdmissionGuard(),
  ];

  decide(context: DaemonAdmissionContext): DaemonAdmissionDecision {
    for (const guard of this.guards) {
      const rejection = guard.rejectionFor(context);
      if (rejection === undefined) continue;
      if (rejection === "authentication") return { kind: "disconnect", code: rejection };
      return { kind: "reject", code: rejection };
    }
    return { kind: "accept" };
  }
}

export class DaemonAdmissionRejections {
  private static readonly retrySafety: Readonly<Record<DaemonExecuteRejectionCode, boolean>> =
    Object.freeze({
      "not-ready": true,
      draining: true,
      "resource-pressure": true,
      incompatible: false,
    });

  static retrySafe(code: DaemonExecuteRejectionCode): boolean {
    return DaemonAdmissionRejections.retrySafety[code];
  }

  static frame(
    code: DaemonExecuteRejectionCode,
    coordinates: DaemonExecutionCoordinates,
  ): DaemonRejectedExecutionFrame {
    return {
      kind: "rejected",
      ...coordinates,
      code,
      retrySafe: DaemonAdmissionRejections.retrySafe(code),
    };
  }

  static assertConsistent(frame: DaemonRejectedExecutionFrame): void {
    if (
      !Object.hasOwn(DaemonAdmissionRejections.retrySafety, frame.code) ||
      frame.retrySafe !== DaemonAdmissionRejections.retrySafety[frame.code]
    ) {
      throw new Error("Inconsistent daemon execution rejection");
    }
  }
}
`},"head:packages/daemon/src/daemon-admission.test.ts":{version:"head",path:"packages/daemon/src/daemon-admission.test.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"f818e084a316db4d1b647a9518bea077db7b11a51d25f1e75dbf1c0e7f184f11",text:`import { describe, expect, expectTypeOf, it } from "vitest";

import {
  DaemonAdmissionPolicy,
  DaemonAdmissionRejections,
  type AcceptedRequestCompatibility,
  type DaemonAdmissionContext,
  type DaemonAdmissionDecision,
  type DaemonAdmissionGuard,
  type DaemonAdmissionRejectionCode,
  type DaemonExecuteRejectionCode,
  type DaemonExecutionCoordinates,
  type DaemonRejectedExecutionFrame,
  type WorkspaceRequestQueueState,
} from "./daemon-admission.js";

describe("DaemonAdmissionPolicy", () => {
  it("defines the closed admission contracts", () => {
    expectTypeOf<AcceptedRequestCompatibility>().toEqualTypeOf<
      "unseen" | "matching" | "conflicting"
    >();
    expectTypeOf<WorkspaceRequestQueueState>().toEqualTypeOf<"accepting" | "draining" | "closed">();
    expectTypeOf<DaemonAdmissionRejectionCode>().toEqualTypeOf<
      "authentication" | "not-ready" | "draining" | "resource-pressure" | "incompatible"
    >();
    expectTypeOf<DaemonAdmissionDecision>().toEqualTypeOf<
      | { readonly kind: "accept" }
      | { readonly kind: "disconnect"; readonly code: "authentication" }
      | { readonly kind: "reject"; readonly code: DaemonExecuteRejectionCode }
    >();
    expectTypeOf<DaemonAdmissionGuard>().toEqualTypeOf<{
      rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined;
    }>();
  });

  it.each([
    ["authentication before readiness", ["authentication", "worker"]],
    ["authentication before resources", ["authentication", "resource"]],
    ["authentication before draining", ["authentication", "queue"]],
    ["authentication before conflicts", ["authentication", "compatibility"]],
    ["readiness before resources", ["worker", "resource"]],
    ["readiness before draining", ["worker", "queue"]],
    ["readiness before conflicts", ["worker", "compatibility"]],
    ["resources before draining", ["resource", "queue"]],
    ["resources before conflicts", ["resource", "compatibility"]],
    ["draining before conflicts", ["queue", "compatibility"]],
  ] as const)("selects %s", (_name, failures) => {
    const context = AdmissionContexts.create();
    for (const failure of failures) AdmissionContexts.applyFailure(context, failure);

    expect(new DaemonAdmissionPolicy().decide(context)).toEqual(
      AdmissionContexts.decisionFor(failures[0]),
    );
  });

  it.each(["draining", "closed"] as const)("rejects a %s queue as draining", (queueState) => {
    expect(new DaemonAdmissionPolicy().decide(AdmissionContexts.create({ queueState }))).toEqual({
      kind: "reject",
      code: "draining",
    });
  });

  it.each(["unseen", "matching"] as const)("accepts %s compatible work", (compatibility) => {
    expect(new DaemonAdmissionPolicy().decide(AdmissionContexts.create({ compatibility }))).toEqual(
      { kind: "accept" },
    );
  });
});

describe("DaemonAdmissionRejections", () => {
  const retrySafety = [
    ["not-ready", true],
    ["resource-pressure", true],
    ["draining", true],
    ["incompatible", false],
  ] as const satisfies readonly (readonly [DaemonExecuteRejectionCode, boolean])[];

  it.each(retrySafety)("derives %s retry safety", (code, retrySafe) => {
    expect(DaemonAdmissionRejections.retrySafe(code)).toBe(retrySafe);
  });

  it.each(retrySafety)("constructs and validates %s frames", (code, retrySafe) => {
    const coordinates: DaemonExecutionCoordinates = {
      instanceId: "instance",
      processToken: "token",
      requestId: "request",
    };

    const frame = DaemonAdmissionRejections.frame(code, coordinates);

    expect(frame).toEqual({ kind: "rejected", ...coordinates, code, retrySafe });
    expect(() => DaemonAdmissionRejections.assertConsistent(frame)).not.toThrow();
  });

  it.each(retrySafety)("rejects contradictory %s wire retry safety", (code, retrySafe) => {
    const frame: DaemonRejectedExecutionFrame = {
      kind: "rejected",
      instanceId: "instance",
      processToken: "token",
      requestId: "request",
      code,
      retrySafe: !retrySafe,
    };

    expect(() => DaemonAdmissionRejections.assertConsistent(frame)).toThrow(
      "Inconsistent daemon execution rejection",
    );
  });
});

type AdmissionFailure = "authentication" | "worker" | "resource" | "queue" | "compatibility";

interface MutableAdmissionContext {
  request: unknown;
  authenticated: boolean;
  workerReady: boolean;
  resourceAdmissionPaused: boolean;
  queueState: WorkspaceRequestQueueState;
  compatibility: AcceptedRequestCompatibility;
}

class AdmissionContexts {
  static create(overrides: Partial<DaemonAdmissionContext> = {}): MutableAdmissionContext {
    return {
      request: {},
      authenticated: true,
      workerReady: true,
      resourceAdmissionPaused: false,
      queueState: "accepting",
      compatibility: "unseen",
      ...overrides,
    };
  }

  static applyFailure(context: MutableAdmissionContext, failure: AdmissionFailure): void {
    if (failure === "authentication") context.authenticated = false;
    if (failure === "worker") context.workerReady = false;
    if (failure === "resource") context.resourceAdmissionPaused = true;
    if (failure === "queue") context.queueState = "draining";
    if (failure === "compatibility") context.compatibility = "conflicting";
  }

  static decisionFor(failure: AdmissionFailure): DaemonAdmissionDecision {
    if (failure === "authentication") return { kind: "disconnect", code: "authentication" };
    if (failure === "worker") return { kind: "reject", code: "not-ready" };
    if (failure === "resource") return { kind: "reject", code: "resource-pressure" };
    if (failure === "queue") return { kind: "reject", code: "draining" };
    return { kind: "reject", code: "incompatible" };
  }
}
`},"head:packages/daemon/src/daemon-execution-failure.ts":{version:"head",path:"packages/daemon/src/daemon-execution-failure.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"b9f5290be42a10dd6745f4e0027e6e2b9af63a4d8cb0d42b1a6693d8cee4651b",text:`const executionFailureCodes = [
  "worker-exit",
  "controlled-resource",
  "response-capacity",
  "stopping",
  "internal",
] as const;

export type DaemonExecutionFailureCode = (typeof executionFailureCodes)[number];

export type DaemonWorkerFailureCode = "initialization" | "execution" | "protocol" | "resource";

export interface DaemonExecutionFailureContext {
  readonly resourceInterrupted: boolean;
  readonly responseCapacityExceeded: boolean;
  readonly workerExited: boolean;
  readonly shutdownFailureCode?: "stopping" | "controlled-resource";
  readonly shutdownStarted: boolean;
}

export class DaemonExecutionFailures {
  static isCode(value: unknown): value is DaemonExecutionFailureCode {
    return executionFailureCodes.includes(value as DaemonExecutionFailureCode);
  }

  static classify(context: DaemonExecutionFailureContext): DaemonExecutionFailureCode {
    if (context.resourceInterrupted) return "controlled-resource";
    if (context.responseCapacityExceeded) return "response-capacity";
    if (context.workerExited) {
      return context.shutdownFailureCode === "stopping" ? "stopping" : "worker-exit";
    }
    if (context.shutdownFailureCode !== undefined) return context.shutdownFailureCode;
    return context.shutdownStarted ? "stopping" : "internal";
  }
}
`},"head:packages/daemon/src/client/daemon-routing-policy.ts":{version:"head",path:"packages/daemon/src/client/daemon-routing-policy.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"42141320e27a7a87ddd26334da289355096599760e4c36276e7b9e3cae2a97e7",text:`import type { DaemonObservation } from "../registry/record-observer.js";
import type { DaemonWorkspaceIdentity } from "../registry/workspace-identity.js";
import type { DaemonRecord } from "../transport/protocol.js";

export type DaemonRouteSnapshot =
  | { readonly kind: "disabled" }
  | { readonly kind: "cold"; readonly reason: "absent" | "starting" | "recovering" }
  | { readonly kind: "warm"; readonly record: DaemonRecord }
  | { readonly kind: "fallback"; readonly reason: "dead" | "incompatible" };

export interface DaemonRoutingContext {
  readonly identity: DaemonWorkspaceIdentity;
  readonly productVersion: string;
  readRecord(): DaemonRecord | undefined;
  observe(record: DaemonRecord): Promise<DaemonObservation>;
  removeIfProcess(record: DaemonRecord): boolean;
}

export interface DaemonRoutingGuard {
  evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot | undefined>;
}

interface DaemonRoutingOperations {
  readonly readRecord: () => DaemonRecord | undefined;
  readonly observe: (record: DaemonRecord) => Promise<DaemonObservation>;
  readonly removeIfProcess: (record: DaemonRecord) => boolean;
}

export class DaemonRoutingContextState implements DaemonRoutingContext {
  private recordRead = false;
  private record: DaemonRecord | undefined;
  private recordFailure: unknown;
  private observation: Promise<DaemonObservation> | undefined;

  constructor(
    readonly identity: DaemonWorkspaceIdentity,
    readonly productVersion: string,
    private readonly readRecordOperation: DaemonRoutingOperations["readRecord"],
    private readonly observeOperation: DaemonRoutingOperations["observe"],
    private readonly removeIfProcessOperation: DaemonRoutingOperations["removeIfProcess"],
  ) {}

  readRecord(): DaemonRecord | undefined {
    if (!this.recordRead) {
      this.recordRead = true;
      try {
        this.record = this.readRecordOperation();
      } catch (error) {
        this.recordFailure = error;
      }
    }
    if (this.recordFailure !== undefined) throw this.recordFailure;
    return this.record;
  }

  observe(record: DaemonRecord): Promise<DaemonObservation> {
    this.observation ??= this.observeOperation(record);
    return this.observation;
  }

  removeIfProcess(record: DaemonRecord): boolean {
    return this.removeIfProcessOperation(record);
  }
}

class RecordPresentRoutingGuard implements DaemonRoutingGuard {
  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot | undefined> {
    try {
      return context.readRecord() === undefined ? { kind: "cold", reason: "absent" } : undefined;
    } catch {
      return { kind: "cold", reason: "recovering" };
    }
  }
}

class NotStartingRoutingGuard implements DaemonRoutingGuard {
  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot | undefined> {
    return context.readRecord()?.state === "starting"
      ? { kind: "cold", reason: "starting" }
      : undefined;
  }
}

class RecordVersionRoutingGuard implements DaemonRoutingGuard {
  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot | undefined> {
    return context.readRecord()?.symnavVersion !== context.productVersion
      ? { kind: "fallback", reason: "incompatible" }
      : undefined;
  }
}

class ResponsiveRoutingGuard implements DaemonRoutingGuard {
  async evaluate(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot> {
    const record = context.readRecord()!;
    let observation: DaemonObservation;
    try {
      observation = await context.observe(record);
    } catch {
      return { kind: "cold", reason: "recovering" };
    }
    if (observation.kind === "responsive") {
      if (observation.pong.symnavVersion !== context.productVersion) {
        return { kind: "fallback", reason: "incompatible" };
      }
      if (observation.pong.state === "starting") {
        return { kind: "cold", reason: "recovering" };
      }
      return { kind: "warm", record };
    }
    if (observation.kind === "starting") return { kind: "cold", reason: "starting" };
    if (observation.kind === "unresponsive") return { kind: "cold", reason: "recovering" };
    if (observation.kind === "exited") {
      try {
        context.removeIfProcess(record);
      } catch {}
      return { kind: "fallback", reason: "dead" };
    }
    return { kind: "fallback", reason: "incompatible" };
  }
}

export class DaemonRoutingPolicy {
  private readonly guards: readonly DaemonRoutingGuard[] = [
    new RecordPresentRoutingGuard(),
    new NotStartingRoutingGuard(),
    new RecordVersionRoutingGuard(),
    new ResponsiveRoutingGuard(),
  ];

  async decide(context: DaemonRoutingContext): Promise<DaemonRouteSnapshot> {
    for (const guard of this.guards) {
      const decision = await guard.evaluate(context);
      if (decision !== undefined) return decision;
    }
    throw new Error("Daemon routing guards did not produce a decision");
  }
}
`},"head:packages/daemon/src/client/daemon-client-runtime.ts":{version:"head",path:"packages/daemon/src/client/daemon-client-runtime.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"74b605887e1080b2a0a8e07b0b6c66730323f410550c611907d152712054bc3c",text:`import { randomUUID } from "node:crypto";
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
`},"head:packages/daemon/src/client/daemon-client.test.ts":{version:"head",path:"packages/daemon/src/client/daemon-client.test.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"df3f1ea9effb434e111ac41162aeaac9f13444a5ee71fb5126ba90c4d56c29fa",text:`import { afterEach, describe, expect, it, vi } from "vitest";
import { tmpdir } from "node:os";
import type {
  DaemonExecutor,
  DaemonExecutorExecutionResult,
  DaemonExecutorRequest,
} from "@symnav/daemon";
import type { DaemonExecutionFailureCode } from "../daemon-execution-failure.js";
import { DaemonPolicy } from "../daemon-policy.js";
import { CommandOutputSnapshot } from "../../test/helpers/executor-output.js";
import { DaemonStartupCoordinator } from "../registry/startup-coordinator.js";
import { DaemonRecordObserver, type DaemonObservation } from "../registry/record-observer.js";
import { DaemonRegistry } from "../registry/registry.js";
import { DaemonExecutionClient } from "../transport/execution-client.js";
import type { DaemonOutputCapture } from "../transport/client-result-capture.js";
import {
  DAEMON_PROTOCOL_VERSION,
  DAEMON_RECORD_SCHEMA_VERSION,
  type DaemonPong,
  type DaemonRecord,
} from "../transport/protocol.js";
import { DaemonTransportError } from "../transport/transport-error.js";
import { DaemonClientRuntime as DaemonClient } from "./daemon-client-runtime.js";

const success: DaemonExecutorExecutionResult = {
  exitCode: 0,
  output: new CommandOutputSnapshot([{ stream: "stdout", bytes: Buffer.from("answer\\n") }]),
};

describe("DaemonClient execution", () => {
  afterEach(() => vi.restoreAllMocks());

  it.each([
    ["disabled", { daemonEnabled: false }, "cold", "cold", 1, 0, 0, 0, 0, 0],
    ["absent", { record: undefined }, "cold", "cold", 1, 0, 1, 1, 0, 0],
    [
      "registry recovery",
      { readFailure: new Error("registry unavailable") },
      "cold",
      "cold",
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    [
      "starting record",
      { record: daemonRecord({ state: "starting" }) },
      "cold",
      "cold",
      1,
      0,
      0,
      1,
      0,
      0,
    ],
    ["ready idle", {}, "warm", undefined, 0, 1, 0, 1, 1, 0],
    ["ready busy", { pongState: "busy" }, "warm", undefined, 0, 1, 0, 1, 1, 0],
    ["responsive starting", { pongState: "starting" }, "cold", "cold", 1, 0, 0, 1, 1, 0],
    ["unresponsive", { observationKind: "unresponsive" }, "cold", "cold", 1, 0, 0, 1, 1, 0],
    ["exited", { observationKind: "exited" }, "fallback", "fallback", 1, 0, 1, 1, 1, 1],
    [
      "record version mismatch",
      { record: daemonRecord({ symnavVersion: "0.0.9" }) },
      "fallback",
      "fallback",
      1,
      0,
      1,
      1,
      0,
      0,
    ],
    ["pong version mismatch", { pongVersion: "0.0.9" }, "fallback", "fallback", 1, 0, 1, 1, 1, 0],
    [
      "invalid observation",
      { observationKind: "corrupt" },
      "fallback",
      "fallback",
      1,
      0,
      1,
      1,
      1,
      0,
    ],
  ] as const)(
    "routes %s with exact execution and first-decision effects",
    async (
      _name,
      options,
      mode,
      executionMode,
      localExecutions,
      warmExecutions,
      triggers,
      reads,
      observations,
      removals,
    ) => {
      const harness = new ClientHarness(options);

      await expect(harness.client.execute(harness.request())).resolves.toEqual({
        mode,
        result: success,
      });

      expect(harness.executorFactory).toHaveBeenCalledTimes(localExecutions);
      expect(harness.localRequests).toHaveLength(localExecutions);
      if (executionMode !== undefined) {
        expect(harness.localRequests).toEqual([
          expect.objectContaining({ executionMode, telemetryEnabled: true }),
        ]);
      }
      expect(harness.warmRequests).toHaveLength(warmExecutions);
      expect(harness.trigger).toHaveBeenCalledTimes(triggers);
      expect(harness.registryRead).toHaveBeenCalledTimes(reads);
      expect(harness.observe).toHaveBeenCalledTimes(observations);
      expect(harness.removeIfProcess).toHaveBeenCalledTimes(removals);
    },
  );

  it("does not await independent warmup or switch a chosen cold route", async () => {
    const harness = new ClientHarness({ record: undefined, neverResolveTrigger: true });

    await expect(harness.client.execute(harness.request())).resolves.toEqual({
      mode: "cold",
      result: success,
    });

    expect(harness.executorFactory).toHaveBeenCalledOnce();
    expect(harness.warmRequests).toHaveLength(0);
  });

  it("creates a new executor for every local attempt", async () => {
    const harness = new ClientHarness({ record: undefined });

    await harness.client.execute(harness.request());
    await harness.client.execute(harness.request());

    expect(harness.executorFactory).toHaveBeenCalledTimes(2);
    expect(harness.executors).toHaveLength(2);
    expect(harness.executors[0]).not.toBe(harness.executors[1]);
  });

  it("composes fresh warm result captures from output policy in the OS temporary directory", () => {
    const harness = new ClientHarness({});
    const createOutput = ClientCaptureInspection.createOutput(harness.client);

    const first = createOutput();
    const second = createOutput();

    expect(first).not.toBe(second);
    expect(ClientCaptureInspection.capture(first)).toMatchObject({
      directory: tmpdir(),
      maximumChunkRawBytes: DaemonPolicy.currentSystem().values.output.maximumChunkRawBytes,
      inlineRawBytes: DaemonPolicy.currentSystem().values.output.inlineRawBytes,
      maximumResultRawBytes: DaemonPolicy.currentSystem().values.output.maximumResultRawBytes,
    });
    expect(harness.executorFactory).not.toHaveBeenCalled();
  });

  it("executes ready requests warm without creating a host executor", async () => {
    const harness = new ClientHarness({});

    await expect(harness.client.execute(harness.request())).resolves.toEqual({
      mode: "warm",
      result: success,
    });

    expect(harness.executorFactory).not.toHaveBeenCalled();
    expect(harness.warmRequests).toEqual([
      expect.objectContaining({
        commandName: "overview",
        request: {
          argv: ["overview", "src/a.ts"],
          cwd: "/workspace",
          telemetryEnabled: true,
          executionMode: "warm",
        },
      }),
    ]);
  });

  it.each([
    new DaemonTransportError("unreachable", "not-submitted", "connection refused"),
    new DaemonTransportError(
      "rejected",
      "submitted-unconfirmed",
      "not ready",
      "instance-1",
      "not-ready",
    ),
  ])("falls back once after retry-safe warm failure %#", async (failure) => {
    const harness = new ClientHarness({ warmFailure: failure });

    await expect(harness.client.execute(harness.request())).resolves.toEqual({
      mode: "fallback",
      result: success,
    });

    expect(harness.executorFactory).toHaveBeenCalledOnce();
    expect(harness.localRequests).toHaveLength(1);
  });

  it.each([
    new DaemonTransportError("timeout", "submitted-unconfirmed", "request timed out"),
    new DaemonTransportError("closed", "accepted", "request closed", "instance-1"),
    new DaemonTransportError(
      "rejected",
      "submitted-unconfirmed",
      "incompatible",
      "instance-1",
      "incompatible",
    ),
    new Error("malformed response"),
  ])("does not replay uncertain warm failure %#", async (failure) => {
    const harness = new ClientHarness({ warmFailure: failure });

    const result = await harness.client.execute(harness.request());

    expect(result.mode).toBe("warm");
    expect(result.result.exitCode).toBe(1);
    await expect(outputText(result.result)).resolves.toBe(
      "Cannot answer: accepted daemon request did not complete.\\n",
    );
    expect(harness.executorFactory).not.toHaveBeenCalled();
  });

  it.each([
    ["controlled-resource", "Cannot answer: daemon workspace capacity exceeded.\\n"],
    ["response-capacity", "Cannot answer: daemon response capacity exceeded.\\n"],
    ["worker-exit", "Cannot answer: accepted daemon request did not complete.\\n"],
    ["stopping", "Cannot answer: accepted daemon request did not complete.\\n"],
    ["internal", "Cannot answer: accepted daemon request did not complete.\\n"],
  ] as const)("owns the exact controlled result for %s", async (code, message) => {
    const harness = new ClientHarness({ terminalFailure: code });

    const result = await harness.client.execute(harness.request());

    expect(result.mode).toBe("warm");
    expect(result.result.exitCode).toBe(1);
    await expect(outputText(result.result)).resolves.toBe(message);
    expect(harness.executorFactory).not.toHaveBeenCalled();
  });

  it("disposes malformed warm output before returning its controlled result", async () => {
    const output = new CommandOutputSnapshot([]);
    const dispose = vi.spyOn(output, "dispose");
    const harness = new ClientHarness({ warmResult: { exitCode: 1.5, output } });

    const result = await harness.client.execute(harness.request());

    expect(result.mode).toBe("warm");
    expect(result.result.exitCode).toBe(1);
    expect(dispose).toHaveBeenCalledOnce();
  });

  it("replaces a completed warm result without output and does not replay or mutate", async () => {
    const harness = new ClientHarness({
      warmResult: { exitCode: 0, output: undefined } as unknown as DaemonExecutorExecutionResult,
    });

    const result = await harness.client.execute(harness.request());

    expect(result.mode).toBe("warm");
    expect(result.result.exitCode).toBe(1);
    await expect(outputText(result.result)).resolves.toBe(
      "Cannot answer: accepted daemon request did not complete.\\n",
    );
    expect(harness.executorFactory).not.toHaveBeenCalled();
    expect(harness.trigger).not.toHaveBeenCalled();
    expect(harness.removeIfProcess).not.toHaveBeenCalled();
  });
});

interface ClientHarnessOptions {
  readonly daemonEnabled?: boolean;
  readonly record?: DaemonRecord | undefined;
  readonly readFailure?: Error;
  readonly neverResolveTrigger?: boolean;
  readonly observationKind?: DaemonObservation["kind"];
  readonly pongState?: DaemonPong["state"];
  readonly pongVersion?: string;
  readonly warmFailure?: Error;
  readonly warmResult?: DaemonExecutorExecutionResult;
  readonly terminalFailure?: DaemonExecutionFailureCode;
}

class ClientHarness {
  readonly executorFactory = vi.fn();
  readonly executors: DaemonExecutor[] = [];
  readonly localRequests: DaemonExecutorRequest[] = [];
  readonly warmRequests: unknown[] = [];
  readonly registryRead = vi.fn();
  readonly observe = vi.fn();
  readonly removeIfProcess = vi.fn(() => true);
  readonly trigger = vi.fn();
  readonly client: DaemonClient;

  constructor(options: ClientHarnessOptions) {
    this.registryRead.mockImplementation(() => {
      if (options.readFailure !== undefined) throw options.readFailure;
      return Object.hasOwn(options, "record") ? options.record : daemonRecord();
    });
    vi.spyOn(DaemonRegistry.prototype, "read").mockImplementation(this.registryRead);
    this.observe.mockImplementation(async (observed: DaemonRecord): Promise<DaemonObservation> => {
      const kind = options.observationKind ?? "responsive";
      if (kind === "responsive") {
        return {
          kind,
          record: observed,
          pong: {
            kind: "pong",
            protocolVersion: observed.protocolVersion,
            instanceId: observed.instanceId,
            symnavVersion: options.pongVersion ?? observed.symnavVersion,
            state: options.pongState ?? "ready",
          },
        };
      }
      if (kind === "starting" || kind === "exited") return { kind, record: observed };
      if (kind === "unresponsive") return { kind, record: observed, failureCode: "timeout" };
      return {
        kind,
        record: observed,
        evidence: {
          instanceId: observed.instanceId,
          processToken: observed.processToken,
          pid: observed.pid,
          startedAt: observed.startedAt,
        },
      };
    });
    vi.spyOn(DaemonRecordObserver.prototype, "observe").mockImplementation(this.observe);
    vi.spyOn(DaemonRegistry.prototype, "removeIfProcess").mockImplementation(this.removeIfProcess);
    this.trigger.mockImplementation(() =>
      options.neverResolveTrigger
        ? new Promise(() => {})
        : Promise.resolve({ status: "launched", instanceId: "replacement", pid: 321 }),
    );
    vi.spyOn(DaemonStartupCoordinator.prototype, "trigger").mockImplementation(this.trigger);
    vi.spyOn(DaemonExecutionClient.prototype, "execute").mockImplementation(
      async (_endpoint, request) => {
        this.warmRequests.push(request);
        if (options.warmFailure !== undefined) throw options.warmFailure;
        return {
          acceptance: {
            requestId: request.requestId,
            instanceId: request.instanceId,
            acceptedAt: 1,
            queuePosition: 0,
          },
          completion:
            options.terminalFailure === undefined
              ? Promise.resolve({ status: "completed", result: options.warmResult ?? success })
              : Promise.resolve({ status: "failed", code: options.terminalFailure }),
        };
      },
    );
    this.executorFactory.mockImplementation(() => {
      const executor: DaemonExecutor = {
        initialize: async () => ({ fileCount: 0 }),
        execute: async (request) => {
          this.localRequests.push(request);
          return success;
        },
        releaseTransientResources: async () => undefined,
      };
      this.executors.push(executor);
      return executor;
    });
    this.client = new DaemonClient({
      stateDirectory: "/state",
      productVersion: "0.1.0",
      daemonEnabled: options.daemonEnabled ?? true,
      executorFactory: this.executorFactory,
      executorModuleUrl: "file:///executor.js",
      readinessProbe: { commandName: "version", argv: ["--version"] },
      policy: DaemonPolicy.currentSystem(),
    });
  }

  request() {
    return {
      workspaceRoot: "/workspace",
      commandName: "overview" as const,
      argv: ["overview", "src/a.ts"],
      cwd: "/workspace",
      telemetryEnabled: true,
    };
  }
}

class ClientCaptureInspection {
  static createOutput(client: DaemonClient): () => DaemonOutputCapture {
    const composition = client as unknown as {
      readonly routingTransport: {
        readonly execution: {
          readonly options: { readonly createOutput: () => DaemonOutputCapture };
        };
      };
    };
    return composition.routingTransport.execution.options.createOutput;
  }

  static capture(capture: DaemonOutputCapture): {
    readonly directory: string;
    readonly maximumChunkRawBytes: number;
    readonly inlineRawBytes: number;
    readonly maximumResultRawBytes: number;
  } {
    return capture as unknown as ReturnType<typeof ClientCaptureInspection.capture>;
  }
}

function daemonRecord(overrides: Partial<DaemonRecord> = {}): DaemonRecord {
  return {
    schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
    protocolVersion: DAEMON_PROTOCOL_VERSION,
    symnavVersion: "0.1.0",
    workspaceRoot: "/workspace",
    workspaceKey: "workspace-key",
    stateKey: "state-key",
    identityKey: "identity-key",
    instanceId: "instance-1",
    processToken: "process-1",
    endpoint: "/endpoint",
    pid: 123,
    state: "ready",
    startedAt: 1,
    readyAt: 2,
    fileCount: 1,
    memoryCapBytes: 1024,
    ...overrides,
  };
}

async function outputText(result: DaemonExecutorExecutionResult): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const outputRecord of result.output.records()) chunks.push(outputRecord.bytes);
  await result.output.dispose();
  return Buffer.concat(chunks).toString();
}
`},"head:packages/daemon/src/transport/transport-error.ts":{version:"head",path:"packages/daemon/src/transport/transport-error.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"a9487b2a07d57c4a3f15e4a7ea3740617389e68027309e1ffa8e385d7a6090ea",text:`import { DaemonAdmissionRejections, type DaemonExecuteRejectionCode } from "../daemon-admission.js";

export type DaemonDeliveryState = "not-submitted" | "submitted-unconfirmed" | "accepted";

export type DaemonTransportFailureCode =
  | "unreachable"
  | "timeout"
  | "corrupt"
  | "incompatible"
  | "authentication"
  | "closed"
  | "rejected";

export class DaemonTransportError extends Error {
  readonly authenticatedInstanceId?: string;
  readonly retrySafe: boolean;

  constructor(
    readonly code: DaemonTransportFailureCode,
    readonly delivery: DaemonDeliveryState,
    message: string,
    authenticatedInstanceId?: string,
    authenticatedRejectionCode?: DaemonExecuteRejectionCode,
  ) {
    super(message);
    this.name = "DaemonTransportError";
    if (authenticatedInstanceId !== undefined) {
      this.authenticatedInstanceId = authenticatedInstanceId;
    }
    this.retrySafe =
      delivery === "not-submitted" ||
      (code === "rejected" &&
        delivery === "submitted-unconfirmed" &&
        authenticatedInstanceId !== undefined &&
        authenticatedRejectionCode !== undefined &&
        DaemonAdmissionRejections.retrySafe(authenticatedRejectionCode));
  }
}
`},"head:packages/daemon/src/transport/protocol-validator.ts":{version:"head",path:"packages/daemon/src/transport/protocol-validator.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"f4aab75b1bea9c604197500070409c72fed85420a52b82dc442766e90e1f8aaa",text:`import {
  DaemonAdmissionRejections,
  type DaemonRejectedExecutionFrame,
} from "../daemon-admission.js";
import { DaemonExecutionFailures } from "../daemon-execution-failure.js";
import type { CompletionSpoolManifest } from "../delivery/completion-spool.js";
import type {
  DaemonExecuteRequest,
  DaemonExecutionServerFrame,
  DaemonExecutionStatus,
  DaemonExecutionStatusRequest,
  DaemonExecutionStatusResponse,
  DaemonLifecycleRequest,
  DaemonLifecycleResponse,
  DaemonRequest,
  DaemonResponse,
} from "./protocol.js";
import { DaemonRuntimeValues } from "../process/runtime-values.js";

export class DaemonProtocolError extends Error {
  constructor(
    readonly code: "authentication" | "corrupt" | "incompatible",
    message: string,
    readonly authenticatedInstanceId?: string,
  ) {
    super(message);
  }
}

export class DaemonProtocolValidator {
  lifecycleRequest(value: unknown): DaemonLifecycleRequest {
    const request = this.request(value);
    if (
      request.kind !== "identify" &&
      request.kind !== "terminate" &&
      request.kind !== "kill" &&
      request.kind !== "ping" &&
      request.kind !== "stop"
    ) {
      throw new Error("Malformed daemon lifecycle request");
    }
    return request;
  }

  request(value: unknown): DaemonRequest {
    if (!DaemonProtocolValidator.isRecord(value) || typeof value.kind !== "string") {
      throw new Error("Malformed daemon request");
    }
    if (value.kind === "identify" || value.kind === "terminate" || value.kind === "kill") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, ["kind", "instanceId", "processToken"]) ||
        !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
        !DaemonProtocolValidator.isRuntimeString(value.processToken)
      ) {
        throw new Error("Malformed daemon identity request");
      }
      return value as unknown as DaemonRequest;
    }
    if (
      !DaemonProtocolValidator.isProtocolVersion(value.protocolVersion) ||
      !DaemonProtocolValidator.isRuntimeString(value.instanceId)
    ) {
      throw new Error("Malformed daemon request envelope");
    }
    if (value.kind === "ping" || value.kind === "stop") {
      if (!DaemonProtocolValidator.hasExactKeys(value, ["kind", "protocolVersion", "instanceId"])) {
        throw new Error("Malformed daemon request envelope");
      }
      return value as unknown as DaemonRequest;
    }
    if (!DaemonProtocolValidator.isExecutionRequestEnvelope(value)) {
      throw new Error("Malformed daemon execution request");
    }
    return value as unknown as DaemonRequest;
  }

  lifecycleResponse(request: DaemonLifecycleRequest, value: unknown): DaemonLifecycleResponse {
    const response = this.response(value);
    if (request.kind === "identify") {
      if (response.kind !== "identity") {
        throw new DaemonProtocolError("corrupt", "Daemon returned a non-identity response");
      }
      if (
        response.instanceId !== request.instanceId ||
        response.processToken !== request.processToken
      ) {
        throw new DaemonProtocolError(
          "authentication",
          "Daemon identity does not match process instance",
          response.instanceId === request.instanceId ? response.instanceId : undefined,
        );
      }
      return response;
    }
    if (request.kind === "terminate" || request.kind === "kill") {
      const expectedKind = request.kind === "terminate" ? "terminating" : "killing";
      if (response.kind !== expectedKind) {
        throw new DaemonProtocolError("corrupt", "Daemon returned a non-termination response");
      }
      if (
        response.instanceId !== request.instanceId ||
        response.processToken !== request.processToken
      ) {
        throw new DaemonProtocolError(
          "authentication",
          "Daemon termination does not match process instance",
          response.instanceId === request.instanceId ? response.instanceId : undefined,
        );
      }
      return response;
    }
    if (request.kind === "ping") {
      if (response.kind !== "pong") {
        throw new DaemonProtocolError(
          "corrupt",
          "Daemon pong does not match request protocol and instance",
        );
      }
      if (response.instanceId !== request.instanceId) {
        throw new DaemonProtocolError(
          "authentication",
          "Daemon pong does not match request instance",
        );
      }
      if (response.protocolVersion !== request.protocolVersion) {
        throw new DaemonProtocolError(
          "incompatible",
          "Daemon pong does not match request protocol",
          response.instanceId,
        );
      }
      return response;
    }
    if (response.kind !== "stopped") {
      throw new DaemonProtocolError("corrupt", "Daemon returned a non-stop response");
    }
    if (response.instanceId !== request.instanceId) {
      throw new DaemonProtocolError(
        "authentication",
        "Daemon stop response does not match instance",
      );
    }
    return response;
  }

  executionStatusResponse(
    request: DaemonExecutionStatusRequest,
    value: unknown,
  ): DaemonExecutionStatusResponse {
    const response = this.response(value);
    if (response.kind !== "execution-status") {
      throw new DaemonProtocolError("corrupt", "Daemon returned a non-status response");
    }
    this.assertExecutionCoordinates(request, response);
    return response;
  }

  executionFrame(
    request: Pick<DaemonExecuteRequest, "instanceId" | "processToken" | "requestId">,
    value: unknown,
  ): DaemonExecutionServerFrame {
    const response = this.response(value);
    if (
      response.kind !== "accepted" &&
      response.kind !== "rejected" &&
      response.kind !== "result-manifest" &&
      response.kind !== "result-end" &&
      response.kind !== "execution-failed"
    ) {
      throw new DaemonProtocolError("corrupt", "Daemon returned a non-execution frame");
    }
    this.assertExecutionCoordinates(request, response);
    return response;
  }

  resultAcknowledgement(
    request: Pick<DaemonExecuteRequest, "instanceId" | "processToken" | "requestId">,
    transferId: string,
    value: unknown,
  ): void {
    const response = this.response(value);
    if (
      response.kind !== "result-acknowledged" ||
      response.instanceId !== request.instanceId ||
      response.processToken !== request.processToken ||
      response.requestId !== request.requestId ||
      response.transferId !== transferId
    ) {
      throw new Error("Invalid daemon result acknowledgement");
    }
  }

  private response(value: unknown): DaemonResponse {
    if (!DaemonProtocolValidator.isRecord(value) || typeof value.kind !== "string") {
      throw new Error("Malformed daemon response");
    }
    if (value.kind === "pong") {
      this.assertPong(value);
      return value as unknown as DaemonResponse;
    }
    if (value.kind === "identity") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "pid",
          "startedAt",
        ]) ||
        !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
        !DaemonProtocolValidator.isRuntimeString(value.processToken) ||
        !DaemonProtocolValidator.isPositiveInteger(value.pid) ||
        !DaemonProtocolValidator.isMetric(value.startedAt)
      ) {
        throw new Error("Malformed daemon identity");
      }
      return value as unknown as DaemonResponse;
    }
    if (value.kind === "terminating" || value.kind === "killing") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, ["kind", "instanceId", "processToken"]) ||
        !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
        !DaemonProtocolValidator.isRuntimeString(value.processToken)
      ) {
        throw new Error("Malformed daemon termination response");
      }
      return value as unknown as DaemonResponse;
    }
    if (value.kind === "stopped") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, ["kind", "instanceId"]) ||
        !DaemonProtocolValidator.isRuntimeString(value.instanceId)
      ) {
        throw new Error("Malformed daemon stop response");
      }
      return value as unknown as DaemonResponse;
    }
    if (
      value.kind === "accepted" ||
      value.kind === "rejected" ||
      value.kind === "result-manifest" ||
      value.kind === "result-end" ||
      value.kind === "execution-failed"
    ) {
      this.assertExecutionFrame(value);
      return value as unknown as DaemonResponse;
    }
    if (value.kind === "execution-status") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "status",
        ]) ||
        !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
        !DaemonProtocolValidator.isRuntimeString(value.processToken) ||
        !DaemonRuntimeValues.isRequestId(value.requestId) ||
        !DaemonProtocolValidator.isExecutionStatus(value.status)
      ) {
        throw new Error("Malformed daemon execution status");
      }
      return value as unknown as DaemonResponse;
    }
    if (value.kind === "result-acknowledged") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "transferId",
        ]) ||
        !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
        !DaemonProtocolValidator.isRuntimeString(value.processToken) ||
        !DaemonRuntimeValues.isRequestId(value.requestId) ||
        !DaemonProtocolValidator.isRuntimeString(value.transferId)
      ) {
        throw new Error("Malformed daemon result acknowledgement");
      }
      return value as unknown as DaemonResponse;
    }
    throw new Error("Malformed daemon response");
  }

  private assertExecutionCoordinates(
    request: Pick<DaemonExecuteRequest, "instanceId" | "processToken" | "requestId">,
    response: Pick<DaemonExecutionServerFrame, "instanceId" | "processToken" | "requestId">,
  ): void {
    if (response.instanceId !== request.instanceId) {
      throw new DaemonProtocolError("authentication", "Daemon execution instance does not match");
    }
    if (response.processToken !== request.processToken) {
      throw new DaemonProtocolError(
        "authentication",
        "Daemon execution process token does not match",
        response.instanceId,
      );
    }
    if (response.requestId !== request.requestId) {
      throw new DaemonProtocolError(
        "corrupt",
        "Daemon execution request identifier does not match",
        response.instanceId,
      );
    }
  }

  private assertExecutionFrame(value: Record<string, unknown>): void {
    if (
      !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
      !DaemonProtocolValidator.isRuntimeString(value.processToken) ||
      !DaemonRuntimeValues.isRequestId(value.requestId)
    ) {
      throw new Error("Malformed daemon execution frame");
    }
    if (value.kind === "accepted") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "acceptedAt",
          "queuePosition",
        ]) ||
        !DaemonProtocolValidator.isMetric(value.acceptedAt) ||
        !DaemonProtocolValidator.isCount(value.queuePosition)
      ) {
        throw new Error("Malformed daemon acceptance");
      }
      return;
    }
    if (value.kind === "rejected") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "code",
          "retrySafe",
        ]) ||
        typeof value.retrySafe !== "boolean"
      ) {
        throw new Error("Malformed daemon execution rejection");
      }
      try {
        DaemonAdmissionRejections.assertConsistent(
          value as unknown as DaemonRejectedExecutionFrame,
        );
      } catch {
        throw new Error("Malformed daemon execution rejection");
      }
      return;
    }
    if (value.kind === "result-manifest") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "manifest",
        ]) ||
        !DaemonProtocolValidator.isCompletionManifest(value.manifest) ||
        value.manifest.instanceId !== value.instanceId ||
        value.manifest.requestId !== value.requestId
      ) {
        throw new Error("Malformed daemon result manifest");
      }
      return;
    }
    if (value.kind === "result-end") {
      if (
        !DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "instanceId",
          "processToken",
          "requestId",
          "transferId",
          "rawBytes",
          "recordCount",
          "sha256",
        ]) ||
        !DaemonProtocolValidator.isRuntimeString(value.transferId) ||
        !DaemonProtocolValidator.isCount(value.rawBytes) ||
        !DaemonProtocolValidator.isCount(value.recordCount) ||
        !DaemonProtocolValidator.isDigest(value.sha256)
      ) {
        throw new Error("Malformed daemon result end");
      }
      return;
    }
    if (
      !DaemonProtocolValidator.hasExactKeys(value, [
        "kind",
        "instanceId",
        "processToken",
        "requestId",
        "code",
      ]) ||
      !DaemonExecutionFailures.isCode(value.code)
    ) {
      throw new Error("Malformed daemon execution failure");
    }
  }

  private assertPong(value: Record<string, unknown>): void {
    const expectedKeys = ["kind", "protocolVersion", "instanceId", "symnavVersion"];
    for (const optionalKey of [
      "state",
      "startedAt",
      "fileCount",
      "memoryBytes",
      "lastNavigationAt",
      "currentCommand",
      "currentCommandElapsedMs",
      "queued",
      "activity",
    ]) {
      if (value[optionalKey] !== undefined) expectedKeys.push(optionalKey);
    }
    if (
      !DaemonProtocolValidator.hasExactKeys(value, expectedKeys) ||
      !DaemonProtocolValidator.isProtocolVersion(value.protocolVersion) ||
      !DaemonProtocolValidator.isRuntimeString(value.instanceId) ||
      !DaemonProtocolValidator.isRuntimeString(value.symnavVersion) ||
      (value.state !== undefined &&
        value.state !== "starting" &&
        value.state !== "ready" &&
        value.state !== "busy") ||
      (value.startedAt !== undefined && !DaemonProtocolValidator.isMetric(value.startedAt)) ||
      (value.fileCount !== undefined && !DaemonProtocolValidator.isCount(value.fileCount)) ||
      (value.memoryBytes !== undefined && !DaemonProtocolValidator.isCount(value.memoryBytes)) ||
      (value.lastNavigationAt !== undefined &&
        !DaemonProtocolValidator.isMetric(value.lastNavigationAt)) ||
      (value.currentCommand !== undefined &&
        !DaemonRuntimeValues.isCommandName(value.currentCommand)) ||
      (value.currentCommandElapsedMs !== undefined &&
        !DaemonProtocolValidator.isMetric(value.currentCommandElapsedMs)) ||
      (value.queued !== undefined && !DaemonProtocolValidator.isCount(value.queued)) ||
      (value.activity !== undefined && !DaemonProtocolValidator.isActivitySnapshot(value.activity))
    ) {
      throw new Error("Malformed daemon pong");
    }
  }

  private static isExecutionRequestEnvelope(value: Record<string, unknown>): boolean {
    if (
      (value.kind !== "execute" &&
        value.kind !== "execution-status" &&
        value.kind !== "result-fetch" &&
        value.kind !== "result-ack") ||
      !DaemonProtocolValidator.isRuntimeString(value.processToken) ||
      !DaemonRuntimeValues.isRequestId(value.requestId)
    ) {
      return false;
    }
    if (value.kind === "execute") {
      return (
        DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "protocolVersion",
          "instanceId",
          "processToken",
          "requestId",
          "commandName",
          "request",
        ]) &&
        DaemonRuntimeValues.isCommandName(value.commandName) &&
        DaemonProtocolValidator.isExecutorRequest(value.request)
      );
    }
    if (value.kind === "result-fetch") {
      return (
        DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "protocolVersion",
          "instanceId",
          "processToken",
          "requestId",
          "offset",
        ]) && DaemonProtocolValidator.isCount(value.offset)
      );
    }
    if (value.kind === "result-ack") {
      return (
        DaemonProtocolValidator.hasExactKeys(value, [
          "kind",
          "protocolVersion",
          "instanceId",
          "processToken",
          "requestId",
          "transferId",
        ]) && DaemonProtocolValidator.isRuntimeString(value.transferId)
      );
    }
    return DaemonProtocolValidator.hasExactKeys(value, [
      "kind",
      "protocolVersion",
      "instanceId",
      "processToken",
      "requestId",
    ]);
  }

  private static isExecutorRequest(value: unknown): boolean {
    if (!DaemonProtocolValidator.isRecord(value)) return false;
    return (
      DaemonProtocolValidator.hasExactKeys(value, [
        "argv",
        "cwd",
        "telemetryEnabled",
        "executionMode",
      ]) &&
      Array.isArray(value.argv) &&
      value.argv.every((argument) => typeof argument === "string") &&
      typeof value.cwd === "string" &&
      value.cwd.length > 0 &&
      typeof value.telemetryEnabled === "boolean" &&
      (value.executionMode === "cold" ||
        value.executionMode === "warm" ||
        value.executionMode === "fallback")
    );
  }

  private static isCompletionManifest(value: unknown): value is CompletionSpoolManifest {
    return (
      DaemonProtocolValidator.isRecord(value) &&
      DaemonProtocolValidator.hasExactKeys(value, [
        "transferId",
        "requestId",
        "instanceId",
        "exitCode",
        "rawBytes",
        "recordCount",
        "sha256",
      ]) &&
      DaemonProtocolValidator.isRuntimeString(value.transferId) &&
      DaemonRuntimeValues.isRequestId(value.requestId) &&
      DaemonProtocolValidator.isRuntimeString(value.instanceId) &&
      DaemonProtocolValidator.isCount(value.exitCode) &&
      DaemonProtocolValidator.isCount(value.rawBytes) &&
      DaemonProtocolValidator.isCount(value.recordCount) &&
      DaemonProtocolValidator.isDigest(value.sha256)
    );
  }

  private static isExecutionStatus(value: unknown): value is DaemonExecutionStatus {
    if (!DaemonProtocolValidator.isRecord(value)) return false;
    if (value.state === "unknown" || value.state === "completed") {
      return DaemonProtocolValidator.hasExactKeys(value, ["state"]);
    }
    if (value.state === "queued") {
      return (
        DaemonProtocolValidator.hasExactKeys(value, ["state", "queuePosition"]) &&
        DaemonProtocolValidator.isCount(value.queuePosition)
      );
    }
    if (value.state === "running") {
      return (
        DaemonProtocolValidator.hasExactKeys(value, ["state", "startedAt"]) &&
        DaemonProtocolValidator.isMetric(value.startedAt)
      );
    }
    return (
      value.state === "failed" &&
      DaemonProtocolValidator.hasExactKeys(value, ["state", "code"]) &&
      DaemonExecutionFailures.isCode(value.code)
    );
  }

  private static isActivitySnapshot(value: unknown): boolean {
    if (!DaemonProtocolValidator.isRecord(value)) return false;
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
      DaemonProtocolValidator.hasExactKeys(value, expectedKeys) &&
      (lifecycle !== "recovering" ||
        value.recoveryDetail === "resource-pressure" ||
        value.recoveryDetail === "worker-replacement") &&
      DaemonProtocolValidator.isPositiveInteger(value.pid) &&
      DaemonProtocolValidator.isMetric(value.startedAt) &&
      DaemonProtocolValidator.isMetric(value.startupElapsedMs) &&
      (lifecycle === "ready" || lifecycle === "busy"
        ? DaemonProtocolValidator.isCount(value.fileCount)
        : lifecycle === "starting"
          ? value.fileCount === undefined
          : value.fileCount === undefined || DaemonProtocolValidator.isCount(value.fileCount)) &&
      DaemonProtocolValidator.isCount(value.processRssBytes) &&
      DaemonProtocolValidator.isCount(value.hardProcessRssBytes) &&
      (value.workerHeapUsedBytes === undefined ||
        DaemonProtocolValidator.isCount(value.workerHeapUsedBytes)) &&
      DaemonProtocolValidator.isCount(value.workerGeneration) &&
      (lifecycle !== "busy" ||
        (DaemonProtocolValidator.isRecord(current) &&
          DaemonProtocolValidator.hasExactKeys(current, ["requestId", "command", "elapsedMs"]) &&
          DaemonRuntimeValues.isRequestId(current.requestId) &&
          DaemonRuntimeValues.isCommandName(current.command) &&
          DaemonProtocolValidator.isMetric(current.elapsedMs))) &&
      DaemonProtocolValidator.isCount(value.queued) &&
      (value.lastCompletedAgoMs === undefined ||
        DaemonProtocolValidator.isMetric(value.lastCompletedAgoMs)) &&
      DaemonProtocolValidator.isCount(value.spoolBytes)
    );
  }

  private static isProtocolVersion(value: unknown): boolean {
    return Number.isSafeInteger(value) && Number(value) >= 0;
  }

  private static isCount(value: unknown): boolean {
    return Number.isSafeInteger(value) && Number(value) >= 0;
  }

  private static isPositiveInteger(value: unknown): boolean {
    return Number.isSafeInteger(value) && Number(value) > 0;
  }

  private static isMetric(value: unknown): boolean {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  }

  private static isRuntimeString(value: unknown): value is string {
    return typeof value === "string" && value.length > 0;
  }

  private static isDigest(value: unknown): value is string {
    return typeof value === "string" && /^[a-f\\d]{64}$/.test(value);
  }

  private static isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  private static hasExactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    return (
      actual.length === expected.length && actual.every((key, index) => key === expected[index])
    );
  }
}
`},"head:packages/daemon/src/transport/execution-client.ts":{version:"head",path:"packages/daemon/src/transport/execution-client.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"39b580e9cd60fe8138082d069b53831befa8ea0f8e203dea1ddf440e5ad09eae",text:`import type { DaemonPolicyValues } from "@symnav/daemon";
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
`},"head:packages/daemon/src/transport/execution-client.test.ts":{version:"head",path:"packages/daemon/src/transport/execution-client.test.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"dd8dfd53e41987b1bf4e1b110d561870fbb02ed7075a2a2999e4f9e1662f1b52",text:`import { describe, expect, it } from "vitest";
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
`},"head:packages/daemon/src/transport/daemon-transport-execution.test.ts":{version:"head",path:"packages/daemon/src/transport/daemon-transport-execution.test.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"64f2f21cbabfc73ac1d66edb348971a682e7a125542793c4dec2270774fdeccf",text:`import { randomUUID } from "node:crypto";
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
`},"head:packages/daemon/src/transport/result-transfer-receiver.ts":{version:"head",path:"packages/daemon/src/transport/result-transfer-receiver.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"bc22ca7fc6a83b22cefec0550346f281ed04f99d3cc4c4334716836981cabdd5",text:`import type { DaemonExecutorExecutionResult } from "@symnav/daemon";
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
`},"head:packages/daemon/src/process/process-coordinator.ts":{version:"head",path:"packages/daemon/src/process/process-coordinator.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"bcd06169d47ab0d7e929ff1da6220f03aa87f832bb9b1b2d3f8668dd207a1832",text:`import { access } from "node:fs/promises";
import {
  type DaemonExecutorModuleUrl,
  type DaemonPolicy,
  type DaemonPolicyValues,
} from "@symnav/daemon";
import {
  DaemonAdmissionPolicy,
  DaemonAdmissionRejections,
  type DaemonAdmissionDecision,
  type DaemonExecuteRejectionCode,
} from "../daemon-admission.js";
import { DaemonPolicyCodec } from "../daemon-policy.js";
import { AcceptedRequestLedger } from "../execution/accepted-request-ledger.js";
import { AcceptedExecutionSession } from "../execution/accepted-execution-session.js";
import { DaemonActivityProjector } from "./activity-projector.js";
import type {
  DaemonExecutionServerFrame,
  DaemonIdentityCoordinates,
  DaemonRecord,
  DaemonRequest,
  DaemonResponse,
  DaemonServer,
} from "../transport/protocol.js";
import {
  DaemonCompletionSpoolStore,
  type CompletionSpoolStorage,
} from "../delivery/completion-spool.js";
import { DAEMON_PROTOCOL_VERSION, DAEMON_RECORD_SCHEMA_VERSION } from "../transport/protocol.js";
import { DaemonLifetime } from "../lifecycle/daemon-lifetime.js";
import { DaemonLogger } from "../diagnostics/logger.js";
import type { DaemonClock } from "../lifecycle/daemon-clock.js";
import { DaemonOperationObserver } from "../diagnostics/operation-observer.js";
import { DaemonDeliverySession } from "../delivery/delivery-session.js";
import {
  type DaemonNavigationWorker,
  NodeDaemonNavigationWorker,
} from "../worker/navigation-worker.js";
import { DaemonWorkerGenerationManager } from "../worker/worker-generation-manager.js";
import { DaemonResourceSupervisor } from "../resources/resource-supervisor.js";
import type { DaemonRegistry, DaemonStartupLease } from "../registry/registry.js";
import type { DaemonWorkspaceIdentity } from "../registry/workspace-identity.js";
import type { DaemonRequestServer, DaemonServerSend } from "../transport/contracts.js";
import { WorkspaceRequestQueue } from "../execution/request-queue.js";

export interface DaemonProcessCoordinatorOptions {
  readonly identity: DaemonWorkspaceIdentity;
  readonly coordinates: DaemonIdentityCoordinates;
  readonly productVersion: string;
  readonly executorModuleUrl?: DaemonExecutorModuleUrl;
  readonly policy: DaemonPolicy;
  readonly workspaceExists?: (workspaceRoot: string) => Promise<boolean>;
  readonly registry: DaemonRegistry;
  readonly server: DaemonRequestServer;
  readonly navigationWorker?: DaemonNavigationWorker;
  readonly navigationWorkerFactory?: (generation: number) => DaemonNavigationWorker;
  readonly clock: DaemonClock;
  readonly exit?: (code: number) => void;
  readonly residentMemoryBytes?: () => number;
  readonly completionSpoolStorage?: CompletionSpoolStorage;
  readonly logger?: DaemonLogger;
}

export class DaemonProcessCoordinator {
  private readonly clock: DaemonClock;
  private readonly exit: (code: number) => void;
  private readonly workerManager: DaemonWorkerGenerationManager;
  private readonly acceptedExecutionSession: AcceptedExecutionSession;
  private readonly logger: DaemonLogger;
  private readonly lifetime: DaemonLifetime;
  private readonly resourceSupervisor: DaemonResourceSupervisor;
  private readonly resourcePolicy: DaemonPolicyValues["resources"];
  private readonly policy: DaemonPolicy;
  private readonly operationObserver: DaemonOperationObserver;
  private readonly deliverySession: DaemonDeliverySession;
  private readonly admissionPolicy = new DaemonAdmissionPolicy();
  private server: DaemonServer | undefined;
  private startedAt = 0;
  private readonly startedMonotonicAt: number;
  private shutdownStarted = false;
  private shutdownFailureCode: "stopping" | "controlled-resource" | undefined;
  private shutdownOperation: Promise<void> | undefined;
  private forcedWorkerShutdown: Promise<void> | undefined;
  private readonly forceEscalated: Promise<void>;
  private resolveForceEscalated!: () => void;

  constructor(private readonly options: DaemonProcessCoordinatorOptions) {
    DaemonProcessCoordinator.validateCoordinates(options.identity, options.coordinates);
    const policy = options.policy;
    this.policy = policy;
    this.forceEscalated = new Promise((resolve) => {
      this.resolveForceEscalated = resolve;
    });
    this.clock = options.clock;
    this.startedMonotonicAt = this.clock.monotonicNowMs();
    const requestQueue = new WorkspaceRequestQueue(this.clock);
    const acceptedRequests = new AcceptedRequestLedger(this.clock);
    const completionSpools = new DaemonCompletionSpoolStore({
      directory: options.identity.spoolDirectory,
      workspaceKey: options.identity.workspaceKey,
      instanceId: options.coordinates.instanceId,
      policy: policy.values.output,
      ...(options.completionSpoolStorage === undefined
        ? {}
        : { storage: options.completionSpoolStorage }),
    });
    this.logger =
      options.logger ??
      new DaemonLogger(options.identity, options.coordinates.instanceId, this.clock, {
        policy: policy.values.diagnostics,
      });
    const resourcePolicy = policy.values.resources;
    this.resourcePolicy = resourcePolicy;
    const navigationWorkerFactory =
      options.navigationWorkerFactory ??
      (options.navigationWorker === undefined
        ? (generation) =>
            new NodeDaemonNavigationWorker({
              generation,
              configuration: {
                stateDirectory: options.identity.stateDirectory,
                productVersion: options.productVersion,
                executorModuleUrl:
                  options.executorModuleUrl ?? "file:///missing/symnav-daemon-executor.js",
                policy: DaemonPolicyCodec.serialize(policy),
              },
              resourceLimits: {
                maxOldGenerationSizeMb: resourcePolicy.workerMaxOldGenerationSizeMiB,
              },
            })
        : undefined);
    const createNavigationWorker = (generation: number): DaemonNavigationWorker => {
      const worker = navigationWorkerFactory?.(generation);
      if (worker === undefined) throw new Error("Navigation worker replacement is unavailable");
      if (worker.generation !== generation) {
        throw new Error("Navigation worker factory returned the wrong generation");
      }
      return worker;
    };
    const initialNavigationWorker = options.navigationWorker ?? createNavigationWorker(1);
    this.exit = options.exit ?? ((code) => process.exit(code));
    this.lifetime = new DaemonLifetime(this.clock, policy.values.shutdown, () =>
      this.drainAndShutdown("idle"),
    );
    this.workerManager = new DaemonWorkerGenerationManager({
      workspaceRoot: options.identity.workspaceRoot,
      initialWorker: initialNavigationWorker,
      createWorker: createNavigationWorker,
      exitRecovery: { recover: (workerExit) => this.recoverWorkerExit(workerExit) },
      onActiveResourceInterruption: (cause) =>
        this.acceptedExecutionSession.markActiveResourceInterrupted(cause),
      onDiagnostic: (diagnostic) => this.operationObserver.worker(diagnostic),
    });
    this.resourceSupervisor = new DaemonResourceSupervisor({
      policy: resourcePolicy,
      generation: this.workerManager.snapshot.generation,
      clock: this.clock,
      ...(options.residentMemoryBytes === undefined
        ? {}
        : { residentMemoryBytes: options.residentMemoryBytes }),
      spoolBytes: () => this.deliverySession.snapshot.spoolBytes,
      scheduleAtTurnBoundary: (operation) =>
        this.acceptedExecutionSession.scheduleAtTurnBoundary(operation),
      releaseTransientResources: async () => {
        const response = await this.workerManager.releaseTransientResources();
        this.resourceSupervisor.workerHeapReported(
          response.generation,
          response.usedHeapBytes,
          response.heapLimitBytes,
        );
      },
      replaceWorker: async (cause) => {
        const response = await this.workerManager.replace(cause);
        this.logger.record({ kind: "freshness", ...response.refresh });
        return response.generation;
      },
      drain: () => this.initiateResourceDrain(),
    });
    this.operationObserver = new DaemonOperationObserver(
      this.logger,
      this.clock,
      this.resourceSupervisor,
    );
    this.deliverySession = new DaemonDeliverySession({
      coordinates: {
        instanceId: options.coordinates.instanceId,
        processToken: options.coordinates.processToken,
      },
      journal: acceptedRequests,
      spoolStore: completionSpools,
      observer: this.operationObserver,
      diagnostics: this.logger,
      clock: this.clock,
      policy: policy.values,
    });
    this.acceptedExecutionSession = new AcceptedExecutionSession({
      ledger: acceptedRequests,
      queue: requestQueue,
      worker: this.workerManager,
      delivery: this.deliverySession,
      resourceSupervisor: this.resourceSupervisor,
      processLifecycle: {
        shutdownSnapshot: () => ({
          started: this.shutdownStarted,
          ...(this.shutdownFailureCode === undefined
            ? {}
            : { failureCode: this.shutdownFailureCode }),
        }),
        workspaceExists: () => this.workspaceExists(),
        workspaceDeletedAfterDelivery: () => this.workspaceDeletedAfterDelivery(),
      },
      lifetime: this.lifetime,
      diagnostics: this.logger,
      clock: {
        wallNowMs: () => this.clock.wallNowMs(),
        monotonicNowMs: () => this.clock.monotonicNowMs(),
      },
    });
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
      this.server = await this.options.server.listen(
        this.options.coordinates.endpoint,
        (request, send) => this.handle(request, send),
      );
      const response = await this.workerManager.start();
      this.operationObserver.startup({
        kind: "startup-completed",
        workerGeneration: response.generation,
        fileCount: response.fileCount,
        ...response.startupDurations,
      });
      this.logger.record({ kind: "freshness", ...response.refresh });
      await this.resourceSupervisor.sample("warmup");
      this.workerManager.activateReadiness();
      const readyRecord: DaemonRecord = {
        schemaVersion: DAEMON_RECORD_SCHEMA_VERSION,
        protocolVersion: DAEMON_PROTOCOL_VERSION,
        symnavVersion: this.options.productVersion,
        workspaceRoot: this.options.identity.workspaceRoot,
        workspaceKey: this.options.identity.workspaceKey,
        stateKey: this.options.identity.stateKey,
        identityKey: this.options.identity.identityKey,
        instanceId: this.options.coordinates.instanceId,
        processToken: this.options.coordinates.processToken,
        endpoint: this.options.coordinates.endpoint,
        pid: process.pid,
        state: "ready",
        startedAt: startingRecord.startedAt,
        readyAt: this.clock.wallNowMs(),
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
    const deadline = this.clock.wallNowMs() + this.policy.values.startup.coordinationGraceMs;
    while (this.clock.wallNowMs() <= deadline) {
      const record = this.options.registry.readInstance(
        this.options.identity,
        this.options.coordinates.instanceId,
      );
      if (
        record?.state === "starting" &&
        (record.pid === 0 || record.pid === process.pid) &&
        record.processToken === this.options.coordinates.processToken
      ) {
        const lease = this.options.registry.claimStartupForDaemon(
          this.options.identity,
          this.options.coordinates.instanceId,
          this.options.coordinates.processToken,
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
          this.options.coordinates.instanceId,
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
      await this.workerManager.terminate();
    } catch {}
    try {
      await this.server?.close();
    } catch {}
    startupLease?.release();
    this.options.registry.removeIfProcess(
      this.options.identity,
      this.options.coordinates.instanceId,
      this.options.coordinates.processToken,
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
      request.instanceId !== this.options.coordinates.instanceId
    ) {
      throw new Error("Daemon request does not match protocol or instance");
    }
    if (request.kind === "ping") return this.pong();
    if (request.kind === "execute") return this.acceptExecution(request, send);
    if (
      request.kind === "execution-status" ||
      request.kind === "result-fetch" ||
      request.kind === "result-ack"
    ) {
      if (request.processToken !== this.options.coordinates.processToken) {
        throw new Error("Daemon execution request does not match process instance");
      }
    }
    if (request.kind === "result-fetch") {
      await this.deliverySession.fetch(request, send);
      return;
    }
    if (request.kind === "result-ack") {
      return this.deliverySession.acknowledge(request);
    }
    if (request.kind === "execution-status") {
      return {
        kind: "execution-status",
        instanceId: this.options.coordinates.instanceId,
        processToken: this.options.coordinates.processToken,
        requestId: request.requestId,
        status: this.acceptedExecutionSession.status(request.requestId),
      };
    }
    this.beginGracefulShutdown();
    await this.acceptedExecutionSession.drain();
    await this.deliverySession.waitForCompletionAcknowledgements();
    setTimeout(() => void this.shutdown("graceful"), 0);
    return { kind: "stopped", instanceId: this.options.coordinates.instanceId };
  }

  private identify(request: Extract<DaemonRequest, { kind: "identify" }>): DaemonResponse {
    if (
      request.instanceId !== this.options.coordinates.instanceId ||
      request.processToken !== this.options.coordinates.processToken
    ) {
      throw new Error("Daemon identity request does not match process instance");
    }
    return {
      kind: "identity",
      instanceId: this.options.coordinates.instanceId,
      processToken: this.options.coordinates.processToken,
      pid: process.pid,
      startedAt: this.startedAt,
    };
  }

  private async terminate(
    request: Extract<DaemonRequest, { kind: "terminate" | "kill" }>,
  ): Promise<DaemonResponse> {
    if (
      request.instanceId !== this.options.coordinates.instanceId ||
      request.processToken !== this.options.coordinates.processToken
    ) {
      throw new Error("Daemon termination does not match process instance");
    }
    this.beginGracefulShutdown();
    if (request.kind === "terminate") {
      await this.acceptedExecutionSession.drain();
      await this.deliverySession.waitForCompletionAcknowledgements();
      setTimeout(() => void this.shutdown("graceful"), 0);
    } else {
      setTimeout(() => void this.shutdown("graceful", true), 0);
    }
    return {
      kind: request.kind === "terminate" ? "terminating" : "killing",
      instanceId: this.options.coordinates.instanceId,
      processToken: this.options.coordinates.processToken,
    };
  }

  private pong(): DaemonResponse {
    const execution = this.acceptedExecutionSession.snapshot;
    const resources = this.resourceSupervisor.snapshot;
    const worker = this.workerManager.snapshot;
    return DaemonActivityProjector.project({
      nowMonotonicMs: this.clock.monotonicNowMs(),
      pid: process.pid,
      processRssBytes: process.memoryUsage().rss,
      startedAt: this.startedAt,
      startedMonotonicAt: this.startedMonotonicAt,
      ...(execution.lastNavigationAt === undefined
        ? {}
        : { lastNavigationAt: execution.lastNavigationAt }),
      ...(execution.lastCompletedMonotonicAt === undefined
        ? {}
        : { lastCompletedMonotonicAt: execution.lastCompletedMonotonicAt }),
      productVersion: this.options.productVersion,
      instanceId: this.options.coordinates.instanceId,
      hardProcessRssBytes: this.resourcePolicy.hardProcessRssBytes,
      queue: execution.queue,
      resources,
      worker: {
        generation: worker.generation,
        ready: worker.ready,
        fileCount: worker.fileCount ?? 0,
      },
    }).pong;
  }

  private async acceptExecution(
    request: Extract<DaemonRequest, { kind: "execute" }>,
    send: DaemonServerSend,
  ): Promise<DaemonResponse | void> {
    const decision = this.decideAdmission(request);
    if (decision.kind === "disconnect") {
      throw new Error("Daemon execution request does not match process instance");
    }
    if (decision.kind === "reject") return this.rejection(request, decision.code);
    const admission = this.acceptedExecutionSession.accept(request);
    await this.deliverySession.attach(
      {
        ...admission.acceptance,
      },
      send,
    );
  }

  private decideAdmission(
    request: Extract<DaemonRequest, { kind: "execute" }>,
  ): DaemonAdmissionDecision {
    const authenticated = request.processToken === this.options.coordinates.processToken;
    if (!authenticated) {
      return this.admissionPolicy.decide({
        request,
        authenticated,
        workerReady: true,
        resourceAdmissionPaused: false,
        queueState: "accepting",
        compatibility: "unseen",
      });
    }
    void this.resourceSupervisor.sample("admission").catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "resource-sample",
        failureCode: "operation-failed",
        errorName: DaemonLogger.errorName(error),
      });
    });
    return this.admissionPolicy.decide({
      request,
      authenticated,
      workerReady: this.workerManager.snapshot.ready,
      resourceAdmissionPaused: this.resourceSupervisor.snapshot.admissionPaused,
      queueState: this.acceptedExecutionSession.snapshot.queue.state,
      compatibility: this.acceptedExecutionSession.compatibilityFor(request),
    });
  }

  private workspaceExists(): Promise<boolean> {
    return (
      this.options.workspaceExists?.(this.options.identity.workspaceRoot) ??
      DaemonProcessCoordinator.pathExists(this.options.identity.workspaceRoot)
    );
  }

  private async workspaceDeletedAfterDelivery(): Promise<void> {
    await this.deliverySession.waitForCompletionAcknowledgements();
    setTimeout(() => void this.shutdown("workspace-deleted", true), 0);
  }

  private static async pathExists(path: string): Promise<boolean> {
    try {
      await access(path);
      return true;
    } catch {
      return false;
    }
  }

  private static validateCoordinates(
    identity: DaemonWorkspaceIdentity,
    coordinates: DaemonIdentityCoordinates,
  ): void {
    if (
      coordinates.workspaceRoot !== identity.workspaceRoot ||
      coordinates.workspaceKey !== identity.workspaceKey ||
      coordinates.stateKey !== identity.stateKey ||
      coordinates.identityKey !== identity.identityKey ||
      coordinates.endpoint !== identity.endpoint(coordinates.instanceId)
    ) {
      throw new Error("Daemon process identity does not match configuration");
    }
  }

  private rejection(
    request: Extract<DaemonRequest, { kind: "execute" }>,
    code: DaemonExecuteRejectionCode,
  ): DaemonExecutionServerFrame {
    return DaemonAdmissionRejections.frame(code, {
      instanceId: this.options.coordinates.instanceId,
      processToken: this.options.coordinates.processToken,
      requestId: request.requestId,
    });
  }

  private async drainAndShutdown(reason: "idle"): Promise<void> {
    await this.acceptedExecutionSession.drain();
    await this.shutdown(reason);
  }

  private beginGracefulShutdown(): void {
    this.shutdownFailureCode ??= "stopping";
    this.resourceSupervisor.stop();
  }

  private async initiateResourceDrain(): Promise<void> {
    await this.deliverySession.waitForCompletionAcknowledgements();
    void this.shutdown("resource", true).catch((error) => {
      this.logger.record({
        kind: "failure",
        operation: "resource-drain",
        failureCode: "controlled-resource",
        errorName: DaemonLogger.errorName(error),
      });
    });
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
    await this.deliverySession.cleanupInstance();
    this.deliverySession.completeRetainedTraces();
    await this.logger.close();
    this.exit(0);
  }

  private async gracefullyShutdownWorker(): Promise<void> {
    await this.acceptedExecutionSession.drain();
    const gracefulClose = this.workerManager.close();
    await Promise.race([gracefulClose, this.forceEscalated.then(() => this.forceWorkerShutdown())]);
  }

  private forceWorkerShutdown(): Promise<void> {
    if (this.forcedWorkerShutdown !== undefined) return this.forcedWorkerShutdown;
    this.acceptedExecutionSession.close();
    this.forcedWorkerShutdown = this.workerManager
      .terminate()
      .then(() => this.acceptedExecutionSession.drain());
    this.resolveForceEscalated();
    return this.forcedWorkerShutdown;
  }

  private pause(): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(resolve, this.policy.values.startup.authorizationPollIntervalMs),
    );
  }

  private async recoverWorkerExit(
    workerExit: import("../worker/navigation-worker.js").DaemonNavigationWorkerExit,
  ): Promise<void> {
    if (this.shutdownStarted) return;
    this.logger.record({
      kind: "failure",
      operation: "worker-exit",
      failureCode: "worker-exit",
      errorName: DaemonLogger.errorName(
        workerExit.errorName === undefined ? undefined : { name: workerExit.errorName },
      ),
    });
    try {
      await this.resourceSupervisor.recover(workerExit);
    } catch (error) {
      this.logger.record({
        kind: "failure",
        operation: "worker-replacement",
        failureCode: "controlled-resource",
        errorName: DaemonLogger.errorName(error),
      });
      throw error;
    }
  }
}
`},"head:packages/daemon/src/execution/accepted-request-ledger.ts":{version:"head",path:"packages/daemon/src/execution/accepted-request-ledger.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"7fe61e7105b8eab436513a80890b19355b672f328963ad5218612a8a5f5a1157",text:`import { createHash } from "node:crypto";
import { type DaemonCommandName, type DaemonExecutorRequest } from "@symnav/daemon";
import type { AcceptedRequestCompatibility } from "../daemon-admission.js";
import {
  DaemonExecutionFailures,
  type DaemonExecutionFailureCode,
} from "../daemon-execution-failure.js";
import type { DaemonExecutionStatus } from "../transport/protocol.js";
import { NodeDaemonClock, type DaemonClock } from "../lifecycle/daemon-clock.js";

export type AcceptedRequestState =
  | { readonly state: "queued" }
  | { readonly state: "running"; readonly startedAt: number }
  | { readonly state: "completed"; readonly completedAt: number; readonly resultId: string }
  | {
      readonly state: "failed";
      readonly completedAt: number;
      readonly code: DaemonExecutionFailureCode;
    };

export interface AcceptedRequestEntry {
  readonly requestId: string;
  readonly requestFingerprint: string;
  readonly commandName: DaemonCommandName;
  readonly request: DaemonExecutorRequest;
  readonly acceptedAt: number;
  readonly queuePosition: number;
  readonly state: AcceptedRequestState;
  readonly deliveryTerminated: boolean;
}

export type AcceptedRequestSubscriber = (entry: AcceptedRequestEntry) => void;

export class AcceptedRequestCorruptionError extends Error {
  constructor(readonly requestId: string) {
    super(\`Accepted request identifier \${requestId} has a different payload\`);
    this.name = "AcceptedRequestCorruptionError";
  }
}

export class AcceptedRequestLedger {
  private readonly entries = new Map<string, AcceptedRequestEntry>();
  private readonly subscribers = new Map<string, Set<AcceptedRequestSubscriber>>();
  private readonly acknowledged = new Set<string>();

  constructor(private readonly clock: Pick<DaemonClock, "wallNowMs"> = new NodeDaemonClock()) {}

  get size(): number {
    return this.entries.size;
  }

  get hasUnacknowledgedCompletions(): boolean {
    for (const entry of this.entries.values()) {
      if (entry.state.state === "completed" && !this.acknowledged.has(entry.requestId)) return true;
    }
    return false;
  }

  compatibilityFor(
    requestId: string,
    commandName: DaemonCommandName,
    request: DaemonExecutorRequest,
  ): AcceptedRequestCompatibility {
    const existing = this.entries.get(requestId);
    if (existing === undefined) return "unseen";
    const requestFingerprint = AcceptedRequestLedger.fingerprint(commandName, request);
    return existing.requestFingerprint === requestFingerprint ? "matching" : "conflicting";
  }

  accept(
    requestId: string,
    commandName: DaemonCommandName,
    request: DaemonExecutorRequest,
  ): AcceptedRequestEntry {
    const requestFingerprint = AcceptedRequestLedger.fingerprint(commandName, request);
    const existing = this.entries.get(requestId);
    if (existing !== undefined) {
      if (existing.requestFingerprint !== requestFingerprint) {
        throw new AcceptedRequestCorruptionError(requestId);
      }
      return existing;
    }
    const entry: AcceptedRequestEntry = {
      requestId,
      requestFingerprint,
      commandName,
      request,
      acceptedAt: this.clock.wallNowMs(),
      queuePosition: this.nonterminalCount,
      deliveryTerminated: false,
      state: { state: "queued" },
    };
    this.entries.set(requestId, entry);
    return entry;
  }

  markRunning(requestId: string, startedAt: number): AcceptedRequestEntry {
    const entry = this.transitionable(requestId);
    if (entry.state.state !== "queued") {
      throw new Error(\`Accepted request \${requestId} is already \${entry.state.state}\`);
    }
    return this.publish({
      ...entry,
      state: { state: "running", startedAt },
    });
  }

  complete(requestId: string, resultId: string, completedAt: number): AcceptedRequestEntry {
    const entry = this.transitionable(requestId);
    return this.publish({
      ...entry,
      state: { state: "completed", completedAt, resultId },
    });
  }

  fail(
    requestId: string,
    code: DaemonExecutionFailureCode,
    completedAt: number,
  ): AcceptedRequestEntry {
    AcceptedRequestLedger.assertFailureCode(code);
    const entry = this.transitionable(requestId);
    return this.publish({
      ...entry,
      state: { state: "failed", completedAt, code },
    });
  }

  invalidateCompletion(
    requestId: string,
    code: DaemonExecutionFailureCode,
    completedAt: number,
  ): AcceptedRequestEntry {
    AcceptedRequestLedger.assertFailureCode(code);
    const entry = this.entry(requestId);
    if (entry.state.state === "failed" && entry.state.code === code) return entry;
    if (entry.state.state !== "completed") {
      throw new Error(\`Accepted request \${requestId} is not completed\`);
    }
    return this.publish({
      ...entry,
      state: { state: "failed", completedAt, code },
    });
  }

  private static assertFailureCode(code: unknown): asserts code is DaemonExecutionFailureCode {
    if (!DaemonExecutionFailures.isCode(code)) {
      throw new Error("Invalid daemon execution failure code");
    }
  }

  status(requestId: string): DaemonExecutionStatus {
    const entry = this.entries.get(requestId);
    if (entry === undefined) return { state: "unknown" };
    const state = entry.state;
    if (state.state === "queued") {
      return { state: "queued", queuePosition: entry.queuePosition };
    }
    if (state.state === "running") return { state: "running", startedAt: state.startedAt };
    if (state.state === "completed") return { state: "completed" };
    return { state: "failed", code: state.code };
  }

  acknowledge(requestId: string): void {
    const entry = this.entry(requestId);
    if (entry.state.state !== "completed" && entry.state.state !== "failed") {
      throw new Error(\`Accepted request \${requestId} is not terminal\`);
    }
    this.acknowledged.add(requestId);
  }

  isAcknowledged(requestId: string): boolean {
    return this.acknowledged.has(requestId);
  }

  terminateDelivery(requestId: string): boolean {
    const entry = this.entry(requestId);
    if (entry.deliveryTerminated) return false;
    this.entries.set(requestId, { ...entry, deliveryTerminated: true });
    return true;
  }

  isDeliveryTerminated(requestId: string): boolean {
    return this.entry(requestId).deliveryTerminated;
  }

  subscribe(requestId: string, subscriber: AcceptedRequestSubscriber): () => void {
    const entry = this.entry(requestId);
    let requestSubscribers = this.subscribers.get(requestId);
    if (requestSubscribers === undefined) {
      requestSubscribers = new Set();
      this.subscribers.set(requestId, requestSubscribers);
    }
    requestSubscribers.add(subscriber);
    subscriber(entry);
    return () => {
      requestSubscribers?.delete(subscriber);
      if (requestSubscribers?.size === 0) this.subscribers.delete(requestId);
    };
  }

  entryFor(requestId: string): AcceptedRequestEntry | undefined {
    return this.entries.get(requestId);
  }

  private get nonterminalCount(): number {
    let count = 0;
    for (const entry of this.entries.values()) {
      if (entry.state.state === "queued" || entry.state.state === "running") count += 1;
    }
    return count;
  }

  private transitionable(requestId: string): AcceptedRequestEntry {
    const entry = this.entry(requestId);
    if (entry.state.state === "completed" || entry.state.state === "failed") {
      throw new Error(\`Accepted request \${requestId} is already \${entry.state.state}\`);
    }
    return entry;
  }

  private entry(requestId: string): AcceptedRequestEntry {
    const entry = this.entries.get(requestId);
    if (entry === undefined) throw new Error(\`Accepted request \${requestId} was not accepted\`);
    return entry;
  }

  private publish(entry: AcceptedRequestEntry): AcceptedRequestEntry {
    this.entries.set(entry.requestId, entry);
    for (const subscriber of this.subscribers.get(entry.requestId) ?? []) subscriber(entry);
    return entry;
  }

  private static fingerprint(
    commandName: DaemonCommandName,
    request: DaemonExecutorRequest,
  ): string {
    const canonical = AcceptedRequestLedger.canonicalValue({ commandName, request });
    return createHash("sha256").update(JSON.stringify(canonical)).digest("hex");
  }

  private static canonicalValue(value: unknown): unknown {
    if (Array.isArray(value))
      return value.map((item) => AcceptedRequestLedger.canonicalValue(item));
    if (typeof value !== "object" || value === null) return value;
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, AcceptedRequestLedger.canonicalValue(item)]),
    );
  }
}
`},"head:packages/daemon/src/execution/accepted-execution-session.ts":{version:"head",path:"packages/daemon/src/execution/accepted-execution-session.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"a2dc1fda886eaca80cacd24c6e02580431a5797c4080a6106e725608ea51b860",text:`import { DaemonExecutionFailures } from "../daemon-execution-failure.js";
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
`},"head:packages/daemon/src/daemon-policy.ts":{version:"head",path:"packages/daemon/src/daemon-policy.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"449354742f82a5bd535aebb1f41919b5424929856acff468375ecac204e285d3",text:`const MEBIBYTE = 1024 * 1024;

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
`},"head:apps/cli/src/cli-invocation-coordinator.ts":{version:"head",path:"apps/cli/src/cli-invocation-coordinator.ts",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"9cd33904bc38a7337531d56c16361cce116c5d12ed1cf4c503bf76e333f5ddfa",text:`import type { DaemonClient, DaemonClientExecuteResult } from "@symnav/daemon";
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
`},"head:plans/005/daemon-policy.md":{version:"head",path:"plans/005/daemon-policy.md",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"99407e4b40068e01e53cf4baa6a20f17791eb0062508817ec5f6e8151071c728",text:"# Daemon policy\n\n`DaemonPolicy` is one immutable, complete snapshot. The CLI creates it from system memory and passes the same serialized values through daemon process and worker boundaries. Tests may replace individual values through `DaemonPolicyTestFactory`; users have no flag, environment variable, or configuration file for these values.\n\n| Policy path or recipe | Default or derivation | Applies to | Reason | Behavior oracle |\n| --- | --- | --- | --- | --- |\n| `transport.singleResponseTimeoutMs` | 250 ms | Ordinary lifecycle and execution-status exchanges | Bound one-response local socket waits | Transport timeout characterization |\n| `transport.statusResponseTimeoutMs` | 100 ms | Status observer lifecycle exchange | Keep status aggregation responsive independently of routing | Status timeout characterization |\n| `transport.executionAdmissionTimeoutMs` | 5 s | Execute submission until acceptance | Bound admission without timing accepted completion | Long-command transport characterization |\n| `transport.maximumJsonPayloadBytes` | 8 MiB | Ordinary JSON control frames | Bound decoded control input | Transport frame-cap tests |\n| `transport.maximumExecutionControlPayloadBytes` | 256 KiB | Execution transfer control frames | Keep binary-transfer control bounded separately | Transfer codec tests |\n| `startup.coordinationGraceMs` | 15 s | Startup ownership and missing-owner observation | Preserve election recovery grace | Registry/startup suites |\n| `startup.heartbeatIntervalMs` | 100 ms | Startup-owner heartbeat | Maintain live ownership while warming | Startup heartbeat tests |\n| `startup.authorizationPollIntervalMs` | 10 ms | Process authorization wait | Preserve the distinct fast authorization cadence | Authorization cadence characterization |\n| `startup.observationPollIntervalMs` | 20 ms | Launcher readiness observation | Preserve current readiness polling cadence | Startup observation tests |\n| `startup.previousInstanceTerminationTimeoutMs` | 5 min | Replacement of a previous instance | Allow controlled termination before new ownership proceeds | Startup replacement tests |\n| `startup.childFailureRetryLimit` | 1 retry | Explicit startup child failure | Preserve one fresh launch after a failed child | Startup retry tests |\n| `shutdown.idleTimeoutMs` | 30 min | Warm daemon idle lifetime | Release retained resources after inactivity | Lifetime tests |\n| `shutdown.stopTimeoutMs` | 5 s | User-requested stop | Bound graceful stop and forced escalation together | Controller stop tests |\n| `shutdown.forcedTerminationReserveMaximumMs` | 500 ms | Stop escalation reserve | Leave bounded time for authenticated force termination | Controller deadline tests |\n| `recipe.forcedTerminationReserve` | `min(forcedTerminationReserveMaximumMs, floor(stopTimeoutMs / 2))` | Effective stop escalation reserve | Preserve small overridden stop windows | Controller deadline tests |\n| `shutdown.controllerPollIntervalMs` | 20 ms | Controller process/registry observation | Preserve control-plane polling cadence | Controller polling tests |\n| `shutdown.processSignalExitTimeoutMs` | 500 ms after SIGTERM and 500 ms after SIGKILL | Direct process termination | Give each signal a bounded exit interval | Process terminator tests |\n| `shutdown.processExitPollIntervalMs` | 20 ms | Direct process termination | Preserve process-exit polling cadence independently | Process terminator tests |\n| `shutdown.resourceDrainAcknowledgementGraceMs` | 250 ms | Completion acknowledgement during drain | Permit an attached client to acknowledge before cleanup | Shutdown acknowledgement tests |\n| `shutdown.resourceDrainAcknowledgementPollIntervalMs` | 5 ms | Completion acknowledgement during drain | Preserve the distinct fast acknowledgement cadence | Acknowledgement cadence characterization |\n| `delivery.postAcceptanceExecutionReattachmentLimit` | 1 reattachment | Authenticated close after acceptance | Recover the accepted request without local replay | Reattachment tests |\n| `delivery.resultTransferResumeLimitPerExecutionAttempt` | 1 fetch resume per execute attempt | Interrupted manifest transfer | Resume one transfer independently for each execute attempt | Two-scope resume tests |\n| `output.maximumChunkRawBytes` | 64 KiB | Worker and result chunks | Bound one raw output record | Chunk codec and spool tests |\n| `output.inlineRawBytes` | 256 KiB | Inline result storage | Avoid files for small results | Spool threshold tests |\n| `output.maximumResultRawBytes` | 256 MiB | One completed result | Bound retained output for one request | Result-cap tests |\n| `output.maximumAggregateSpoolRawBytes` | 512 MiB | All retained completions for one daemon | Bound aggregate spool pressure | Aggregate-cap tests |\n| `recipe.effectiveMemorySelection` | Use constrained bytes only when positive and smaller than total bytes; preserve selected raw bytes | Memory derivation input | Respect real lower constraints without rounding identity | Policy derivation table |\n| `resources.effectiveMemoryBytes` | Selected raw effective bytes | Resource reports and derived thresholds | Preserve non-MiB-aligned system information exactly | Policy derivation table |\n| `recipe.effectiveMemoryMiB` | `max(1, floor(effectiveMemoryBytes / MiB))` | Memory threshold derivation | Give sub-MiB inputs a stable minimum | Policy boundary tests |\n| `recipe.hardProcessRss` | `clamp(floor(effectiveMemoryMiB / 2), 256, 8192) * MiB` | Hard daemon RSS limit | Reserve memory for the host while bounding small and large systems | Policy boundary tests |\n| `resources.hardProcessRssBytes` | Hard-process-RSS recipe | Process replacement and worker launch | Trigger controlled replacement before OOM | Resource supervision tests |\n| `resources.softProcessRssBytes` | `floor(hardProcessRssMiB * 0.8) * MiB` | Transient resource shedding | Shed before hard replacement | Resource hysteresis tests |\n| `resources.resumeProcessRssBytes` | `floor(hardProcessRssMiB * 0.7) * MiB` | Admission resumption | Require lower RSS before resuming work | Resource hysteresis tests |\n| `recipe.workerOldGeneration` | `clamp(floor(effectiveMemoryMiB / 4), 128, 4096)` MiB | Worker V8 old generation | Bound worker heap within process budget | Worker launch tests |\n| `resources.workerMaxOldGenerationSizeMiB` | Worker-old-generation recipe | Worker resource limits | Pass the derived V8 limit unchanged | Process/worker snapshot test |\n| `resources.supervisionIntervalMs` | 250 ms | Process RSS and spool sampling | Detect sustained pressure without per-operation overhead | Resource cadence tests |\n| `resources.replacementWindowMs` | 10 min | Replacement circuit | Count only recent replacements | Replacement-window tests |\n| `resources.replacementLimit` | 2 replacements; third drains | Replacement circuit | Stop persistent replacement churn | Persistent-pressure tests |\n| `resources.workerHeapSampleIntervalMs` | 25 ms | Active worker heap high-water sampling | Observe short-lived heap peaks | Worker cadence characterization |\n| `diagnostics.logRotateBytes` | 10 MiB | Diagnostic log rotation | Bound active diagnostic file size | Logger rotation tests |\n| `diagnostics.logBackupCount` | 4 backups plus active log | Diagnostic log rotation | Retain a bounded diagnostic history | Logger backup tests |\n| `diagnostics.maximumQueuedEvents` | 1,024 | Pending diagnostic writes | Bound memory when storage is slow | Logger queue tests |\n| `diagnostics.disconnectedTraceRetentionMs` | 5 min | Disconnected operation traces | Retain reconnect evidence without changing result retention | Trace expiry tests |\n| `diagnostics.maximumDisconnectedTraces` | 1,024 with effective minimum 1 | Disconnected operation traces | Bound diagnostic-only retention | Trace capacity tests |\n\n## Intentional absences\n\n| Deadline | Value | Reason |\n| --- | --- | --- |\n| healthy startup | None | Progressing warm-up has no project-size deadline. |\n| startup silence | None | Silence handling is deferred to the daemon follow-up contract. |\n| post-accept completion | None | Accepted work is not replayed or failed because it runs long. |\n| worker output acknowledgement | None | Backpressure waits for durable consumption without a timer. |\n| unacknowledged result | None | Retention eviction is deferred to the daemon follow-up contract. |\n\n## Migration access\n\nPolicy serialization is package-internal. Process and worker entries exchange complete snapshots through the internal codec without widening the host-facing `DaemonPolicy` surface.\n\nPolicy test factories remain package-local test helpers and are not exported.\n"},"head:plans/005/daemon-architecture-functional-spec.md":{version:"head",path:"plans/005/daemon-architecture-functional-spec.md",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"6055a00fc460ece848159e7e90e32c3f454425d4cb911425a9fef73f329c282b",text:`# Symnav Daemon Architecture Functional Spec

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
`},"main:apps/cli/src/daemon/daemon-command-dispatcher.ts":{version:"main",path:"apps/cli/src/daemon/daemon-command-dispatcher.ts",revision:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",sha256:"307c9aab041b70474bd4f22924feba8cce574757a208e74a54cb0404426830aa",text:`import { randomUUID } from "node:crypto";
import { createWorkspace } from "@symnav/core";
import { CliProgramExecutor } from "../cli-program-executor.js";
import type {
  CliExecutionRequest,
  CommandExecutionResult,
  DispatchedCommandResult,
} from "../command-execution-result.js";
import { ControlledCommandResult } from "../command-execution-result.js";
import type { ProgramDependencies } from "../program-dependencies.js";
import type {
  DaemonExecuteRequest,
  DaemonExecutionFailureCode,
  DaemonRecord,
} from "./daemon-protocol.js";
import { DaemonRegistry } from "./daemon-registry.js";
import {
  NodeDaemonProcessLauncher,
  NodeDaemonProcessTerminator,
} from "./daemon-process-launcher.js";
import {
  DaemonStartupCoordinator,
  type DaemonWarmupTriggerResult,
} from "./daemon-startup-coordinator.js";
import { DaemonWorkspaceIdentity } from "./daemon-workspace-identity.js";
import { InvocationWorkspaceSelector } from "./invocation-workspace-selector.js";
import {
  DaemonTransportError,
  type DaemonExecutionReceipt,
  LocalDaemonTransport,
} from "./local-daemon-transport.js";
import { DaemonRecordObserver, type DaemonObservation } from "./daemon-record-observer.js";

export type DaemonRouteSnapshot =
  | { readonly kind: "disabled" }
  | { readonly kind: "cold"; readonly reason: "absent" | "starting" | "recovering" }
  | { readonly kind: "warm"; readonly record: DaemonRecord }
  | { readonly kind: "fallback"; readonly reason: "dead" | "incompatible" };

export interface DaemonWarmupTrigger {
  trigger(identity: DaemonWorkspaceIdentity): Promise<DaemonWarmupTriggerResult>;
}

interface DaemonDispatchRegistry {
  read(identity: DaemonWorkspaceIdentity): DaemonRecord | undefined;
  removeIfProcess(
    identity: DaemonWorkspaceIdentity,
    instanceId: string,
    processToken: string,
  ): boolean;
}

interface DaemonDispatchTransport {
  execute(endpoint: string, request: DaemonExecuteRequest): Promise<DaemonExecutionReceipt>;
}

interface DaemonDispatchObserver {
  observe(record: DaemonRecord): Promise<DaemonObservation>;
}

export interface DaemonDispatchRuntime {
  readonly coordinator: DaemonWarmupTrigger;
  readonly observer: DaemonDispatchObserver;
  readonly registry: DaemonDispatchRegistry;
  readonly transport: DaemonDispatchTransport;
}

interface CommandExecutor {
  execute(request: CliExecutionRequest): Promise<CommandExecutionResult>;
}

export interface DaemonCommandDispatcherOptions {
  readonly createDependencies: (stateDirectory: string) => ProgramDependencies;
  readonly stateDirectory: string;
  readonly daemonEnabled?: () => boolean;
  readonly selector?: InvocationWorkspaceSelector;
  readonly resolveWorkspaceRoot?: (
    startDir: string,
    dependencies: ProgramDependencies,
  ) => Promise<string>;
  readonly runtimeFactory?: (
    identity: DaemonWorkspaceIdentity,
    dependencies: ProgramDependencies,
  ) => DaemonDispatchRuntime;
  readonly executorFactory?: (dependencies: ProgramDependencies) => CommandExecutor;
  readonly requestId?: () => string;
}

export class DaemonCommandDispatcher {
  private readonly selector: InvocationWorkspaceSelector;
  private readonly daemonEnabled: () => boolean;
  private readonly resolveWorkspaceRoot: (
    startDir: string,
    dependencies: ProgramDependencies,
  ) => Promise<string>;
  private readonly runtimeFactory: (
    identity: DaemonWorkspaceIdentity,
    dependencies: ProgramDependencies,
  ) => DaemonDispatchRuntime;
  private readonly executorFactory: (dependencies: ProgramDependencies) => CommandExecutor;
  private readonly requestId: () => string;

  constructor(private readonly options: DaemonCommandDispatcherOptions) {
    this.selector = options.selector ?? new InvocationWorkspaceSelector();
    this.daemonEnabled = options.daemonEnabled ?? (() => true);
    this.resolveWorkspaceRoot =
      options.resolveWorkspaceRoot ??
      (async (startDir, dependencies) =>
        (await createWorkspace({ startDir, fs: dependencies.fs })).root);
    this.runtimeFactory = options.runtimeFactory ?? DaemonCommandDispatcher.createRuntime;
    this.executorFactory =
      options.executorFactory ?? ((dependencies) => new CliProgramExecutor(dependencies));
    this.requestId = options.requestId ?? randomUUID;
  }

  async execute(request: CliExecutionRequest): Promise<DispatchedCommandResult> {
    const selected = this.selector.select(request.argv, request.cwd);
    const route = selected.route;
    if (route.kind !== "workspace") {
      return this.executeLocally(request, "cold");
    }
    const workspaceRequest: CliExecutionRequest = {
      ...request,
      argv: selected.argv,
    };
    if (!this.daemonEnabled()) {
      return this.executeRoute({ kind: "disabled" }, workspaceRequest);
    }

    const workspaceDependencies = this.options.createDependencies(this.options.stateDirectory);
    let workspaceRoot: string;
    try {
      workspaceRoot = await this.resolveWorkspaceRoot(route.startDir, workspaceDependencies);
    } catch {
      return this.executeLocally(workspaceRequest, "cold");
    }

    const identity = DaemonWorkspaceIdentity.from(workspaceRoot, this.options.stateDirectory);
    const runtime = this.runtimeFactory(identity, workspaceDependencies);
    const routeSnapshot = await this.routeFor(
      identity,
      runtime,
      workspaceDependencies.symnavVersion,
    );
    if (routeSnapshot.kind === "warm") {
      return this.executeWarm(runtime, routeSnapshot.record, workspaceRequest);
    }
    if (
      (routeSnapshot.kind === "cold" && routeSnapshot.reason === "absent") ||
      routeSnapshot.kind === "fallback"
    ) {
      DaemonCommandDispatcher.triggerIndependently(runtime.coordinator, identity);
    }
    return this.executeRoute(routeSnapshot, workspaceRequest);
  }

  private async routeFor(
    identity: DaemonWorkspaceIdentity,
    runtime: DaemonDispatchRuntime,
    symnavVersion: string,
  ): Promise<DaemonRouteSnapshot> {
    let record: DaemonRecord | undefined;
    try {
      record = runtime.registry.read(identity);
    } catch {
      return { kind: "cold", reason: "recovering" };
    }
    if (record === undefined) return { kind: "cold", reason: "absent" };
    if (record.state === "starting") return { kind: "cold", reason: "starting" };
    if (record.symnavVersion !== symnavVersion) {
      return { kind: "fallback", reason: "incompatible" };
    }
    let observation: DaemonObservation;
    try {
      observation = await runtime.observer.observe(record);
    } catch {
      return { kind: "cold", reason: "recovering" };
    }
    if (observation.kind === "responsive") {
      if (observation.pong.symnavVersion !== symnavVersion) {
        return { kind: "fallback", reason: "incompatible" };
      }
      if (observation.pong.state === "starting") {
        return { kind: "cold", reason: "recovering" };
      }
      return { kind: "warm", record };
    }
    if (observation.kind === "starting") return { kind: "cold", reason: "starting" };
    if (observation.kind === "unresponsive") return { kind: "cold", reason: "recovering" };
    if (observation.kind === "exited") {
      try {
        runtime.registry.removeIfProcess(identity, record.instanceId, record.processToken);
      } catch {}
      return { kind: "fallback", reason: "dead" };
    }
    return { kind: "fallback", reason: "incompatible" };
  }

  private async executeWarm(
    runtime: DaemonDispatchRuntime,
    record: DaemonRecord,
    request: CliExecutionRequest,
  ): Promise<DispatchedCommandResult> {
    let receipt: DaemonExecutionReceipt;
    try {
      receipt = await runtime.transport.execute(record.endpoint, {
        kind: "execute",
        protocolVersion: record.protocolVersion,
        instanceId: record.instanceId,
        processToken: record.processToken,
        requestId: this.requestId(),
        request: { ...request, executionMode: "warm" },
      });
    } catch (error) {
      if (DaemonCommandDispatcher.isRetrySafeFailure(error)) {
        return this.executeLocally(request, "fallback");
      }
      return { mode: "warm", result: ControlledCommandResult.acceptedRequestDidNotComplete() };
    }
    try {
      const completion = await receipt.completion;
      if (completion.status === "failed") {
        return {
          mode: "warm",
          result: DaemonCommandDispatcher.controlledFailure(completion.code),
        };
      }
      if (!DaemonCommandDispatcher.isCompleteResult(completion.result)) {
        return { mode: "warm", result: ControlledCommandResult.acceptedRequestDidNotComplete() };
      }
      return {
        mode: "warm",
        result: completion.result,
      };
    } catch {
      return { mode: "warm", result: ControlledCommandResult.acceptedRequestDidNotComplete() };
    }
  }

  private executeRoute(
    route: Exclude<DaemonRouteSnapshot, { readonly kind: "warm" }>,
    request: CliExecutionRequest,
  ): Promise<DispatchedCommandResult> {
    return this.executeLocally(request, route.kind === "fallback" ? "fallback" : "cold");
  }

  private executeLocally(
    request: CliExecutionRequest,
    mode: "cold" | "fallback",
  ): Promise<DispatchedCommandResult> {
    const executor = this.executorFactory(
      this.options.createDependencies(this.options.stateDirectory),
    );
    return executor
      .execute({ ...request, executionMode: mode })
      .then((result) => ({ mode, result }));
  }

  private static triggerIndependently(
    trigger: DaemonWarmupTrigger,
    identity: DaemonWorkspaceIdentity,
  ): void {
    try {
      void trigger.trigger(identity).catch(() => {});
    } catch {}
  }

  private static createRuntime(
    identity: DaemonWorkspaceIdentity,
    dependencies: ProgramDependencies,
  ): DaemonDispatchRuntime {
    const registry = new DaemonRegistry(identity.registryDirectory);
    const transport = new LocalDaemonTransport();
    const processTerminator = new NodeDaemonProcessTerminator();
    const launcher = new NodeDaemonProcessLauncher(
      dependencies.symnavVersion,
      undefined,
      processTerminator,
    );
    return {
      registry,
      transport,
      observer: new DaemonRecordObserver(transport, processTerminator),
      coordinator: new DaemonStartupCoordinator(registry, launcher, transport, {
        processTerminator,
      }),
    };
  }

  private static isCompleteResult(result: CommandExecutionResult): boolean {
    return Number.isInteger(result.exitCode) && result.output !== undefined;
  }

  private static isRetrySafeFailure(error: unknown): boolean {
    return error instanceof DaemonTransportError && error.retrySafe;
  }

  private static controlledFailure(code: DaemonExecutionFailureCode): CommandExecutionResult {
    if (code === "controlled-resource") return ControlledCommandResult.workspaceCapacityExceeded();
    if (code === "response-capacity") return ControlledCommandResult.responseCapacityExceeded();
    return ControlledCommandResult.acceptedRequestDidNotComplete();
  }
}
`},"main:apps/cli/src/daemon/local-daemon-transport.ts":{version:"main",path:"apps/cli/src/daemon/local-daemon-transport.ts",revision:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",sha256:"d3659cc57bee5c7fef70cd40b15c1764df5c5a815da4bf63a7f4090e1d611e02",text:`import { existsSync, mkdirSync, rmSync } from "node:fs";
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
`},"main:apps/cli/src/daemon/local-daemon-transport-execution.test.ts":{version:"main",path:"apps/cli/src/daemon/local-daemon-transport-execution.test.ts",revision:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",sha256:"ba3d633e79f911307ad1eb0347b74e107a60243c7cd18fed397f158c8014749a",text:`import { randomUUID } from "node:crypto";
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
`},"main:apps/cli/src/daemon/workspace-daemon.ts":{version:"main",path:"apps/cli/src/daemon/workspace-daemon.ts",revision:"b6801ebdd2421d0ca2e4bdd61ec0f04c24ddd73e",sha256:"d4bb1b51d7e7861f20994e5d010b09401d5c822e1ecdc367a75bf57f573fbf64",text:`import type { ProgramDependencies } from "../program-dependencies.js";
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
              configuration: { stateDirectory: options.identity.stateDirectory },
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
`},"pr-133.md":{version:"bundle",path:"pr-133.md",revision:"b62f93c541f1cfef93b73c3acb17ad1fa47f195c",sha256:"1da39a330bd644add14c0d11714101f5f764c86cbe38d0fc281ab9e09290190b",text:`## Context

Execution failures previously used an app-owned outer union, a colliding worker-thread alias, and repeated validators and classification branches. This change gives \`@symnav/daemon\` one outer authority while preserving every serialized string and client outcome.

## Shape

Before \u2014 outer execution failures had several app-owned authorities, while worker failures reused the same type name:

\`\`\`mermaid
flowchart LR
    Protocol["daemon-protocol<br/>outer failure union"]
    Workspace["WorkspaceDaemon<br/>inline terminal precedence"]
    Transport["LocalDaemonTransport<br/>duplicate validator"]
    Logger["DaemonLogger<br/>duplicate value set"]
    Ledger["ledger, status, wire,<br/>and client paths"]
    Worker["worker protocol<br/>colliding failure alias"]

    Workspace -->|"uses outer type"| Protocol
    Transport -->|"uses copied values"| Protocol
    Logger -->|"uses copied values"| Protocol
    Ledger -->|"uses outer type"| Protocol

    style Protocol fill:#ffdddd,stroke:#cc0000
    style Workspace fill:#fff2cc,stroke:#bf9000
    style Transport fill:#fff2cc,stroke:#bf9000
    style Logger fill:#fff2cc,stroke:#bf9000
    style Ledger fill:#fff2cc,stroke:#bf9000
    style Worker fill:#ffdddd,stroke:#cc0000
\`\`\`

After \u2014 daemon owns the closed outer vocabulary and precedence; the CLI supplies app-owned error identity facts:

\`\`\`mermaid
flowchart LR
    Authority["@symnav/daemon<br/>DaemonExecutionFailures"]
    Boundary["WorkspaceDaemon<br/>instanceof facts"]
    Consumers["ledger, transport, logger,<br/>status, wire, and client"]
    WorkerType["@symnav/daemon<br/>DaemonWorkerFailureCode"]
    WorkerPath["worker protocol<br/>and entry"]

    Boundary -->|"uses fact-only classifier"| Authority
    Consumers -->|"uses type and validator"| Authority
    WorkerPath -->|"uses distinct inner type"| WorkerType

    style Authority fill:#ddffdd,stroke:#008800
    style Boundary fill:#fff2cc,stroke:#bf9000
    style Consumers fill:#fff2cc,stroke:#bf9000
    style WorkerType fill:#ddffdd,stroke:#008800
    style WorkerPath fill:#fff2cc,stroke:#bf9000
\`\`\`

Legend: green = added authority; red = removed authority or collision; yellow = changed path.

- Outer classification preserves resource, capacity, worker-exit, and shutdown precedence.
- Worker values remain \`initialization\`, \`execution\`, \`protocol\`, and \`resource\` on the wire.
- Accepted terminal failures retain their controlled client result and never replay work.

## Where it lives

\`\`\`text
.
\u251C\u2500\u2500 packages/daemon/
\u2502   \u251C\u2500\u2500 src/
\u2502   \u2502   \u251C\u2500\u2500 ++ daemon-execution-failure.ts       # owns outer validation, precedence, and both vocabularies
\u2502   \u2502   \u251C\u2500\u2500 ++ daemon-execution-failure.test.ts  # locks closed sets and precedence
\u2502   \u2502   \u251C\u2500\u2500 ** host-contract.test.ts             # locks source and declaration exports
\u2502   \u2502   \u2514\u2500\u2500 ** index.ts                          # exposes root runtime and type contracts
\u2502   \u2514\u2500\u2500 test/
\u2502       \u2514\u2500\u2500 ** public-import.test.ts              # verifies consumer-visible imports
\u2514\u2500\u2500 apps/cli/src/daemon/
    \u251C\u2500\u2500 ** workspace-daemon.ts                   # derives app-owned identity facts
    \u251C\u2500\u2500 ** daemon-navigation-worker-protocol.ts  # adopts distinct worker failure type
    \u251C\u2500\u2500 ** daemon-navigation-worker-entry.ts     # emits unchanged worker values
    \u251C\u2500\u2500 ** ... 5 outer consumer files            # protocol, ledger, transport, logging, and client mapping
    \u2514\u2500\u2500 ** ... 5 colocated test files             # lock boundaries, subtype behavior, and no replay
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Public surface

Added at the \`@symnav/daemon\` root:

\`\`\`ts
export type DaemonExecutionFailureCode = (typeof executionFailureCodes)[number];
export type DaemonWorkerFailureCode = "initialization" | "execution" | "protocol" | "resource";
export interface DaemonExecutionFailureContext {
  readonly resourceInterrupted: boolean;
  readonly responseCapacityExceeded: boolean;
  readonly workerExited: boolean;
  readonly shutdownFailureCode?: "stopping" | "controlled-resource";
  readonly shutdownStarted: boolean;
}
export class DaemonExecutionFailures {
  static isCode(value: unknown): value is DaemonExecutionFailureCode;
  static classify(context: DaemonExecutionFailureContext): DaemonExecutionFailureCode;
}
\`\`\`

## Decisions

- Chose one private outer tuple with a derived union over repeated app-local unions, because runtime validation and compile-time vocabulary must change together.
- Chose a distinct worker type with no shared literals over retaining the colliding alias, because inner worker failures and outer request-completion failures are different domains.
- Chose a pure context classifier over lifecycle-specific branching at the call site, because precedence is exhaustively testable without constructing a workspace daemon.
- Chose app-owned \`instanceof\` fact derivation over constructor-name or \`error.name\` reflection, because it preserves subtype behavior without reversing package dependencies or accepting spoofed errors.

## Look here

- \`packages/daemon/src/daemon-execution-failure.ts:26\`
- \`apps/cli/src/daemon/workspace-daemon.ts:641\`
- \`apps/cli/src/daemon/local-daemon-transport.ts:1347\`
`},"pr-134.md":{version:"bundle",path:"pr-134.md",revision:"f51201124276a143efd8ba1bb99f081cc0dded0a",sha256:"b4b30b48991b59a85f3b208481506da7d4ea86119b091bf88a9b679df36916cd",text:`## Context

Execution admission mixed authentication, daemon state, duplicate compatibility, wire framing, and retry booleans in app-owned branches. \`@symnav/daemon\` now owns rejection order and retry meaning without changing disconnect, sampling, queue, duplicate, or fallback behavior.

## Shape

Before \u2014 app code owned admission order, rejection frames, and retry interpretation:

\`\`\`mermaid
flowchart LR
    Workspace["WorkspaceDaemon<br/>hand-ordered branches +<br/>mutation-time duplicate check"]
    Protocol["daemon-protocol<br/>app-owned rejection union"]
    Transport["LocalDaemonTransport<br/>copied code validator +<br/>trusted retrySafe"]
    Fallback["dispatcher fallback<br/>local replay gate"]

    Workspace -->|"uses caller-supplied retrySafe"| Protocol
    Transport -->|"uses copied rejection set"| Protocol
    Fallback -->|"uses wire retrySafe"| Transport

    style Workspace fill:#ffdddd,stroke:#cc0000
    style Protocol fill:#ffdddd,stroke:#cc0000
    style Transport fill:#ffdddd,stroke:#cc0000
\`\`\`

After \u2014 daemon contracts own first-failure decisions, frame consistency, and code-derived retry safety:

\`\`\`mermaid
flowchart LR
    Ledger["AcceptedRequestLedger<br/>side-effect-free compatibility"]
    Workspace["WorkspaceDaemon<br/>projects admission context"]
    Policy["@symnav/daemon<br/>DaemonAdmissionPolicy"]
    Rejections["@symnav/daemon<br/>DaemonAdmissionRejections"]
    Transport["LocalDaemonTransport<br/>validates and projects code"]
    Fallback["dispatcher fallback<br/>local replay gate"]

    Workspace -->|"uses compatibility"| Ledger
    Workspace -->|"uses ordered decision"| Policy
    Workspace -->|"uses derived frame"| Rejections
    Transport -->|"uses consistency + retry table"| Rejections
    Fallback -->|"uses derived retrySafe"| Transport

    style Ledger fill:#fff2cc,stroke:#bf9000
    style Workspace fill:#fff2cc,stroke:#bf9000
    style Policy fill:#ddffdd,stroke:#008800
    style Rejections fill:#ddffdd,stroke:#008800
    style Transport fill:#fff2cc,stroke:#bf9000
\`\`\`

Legend: green = added authority; red = removed authority; yellow = changed path.

- Guard precedence is authentication, worker readiness, resource pressure, queue state, then duplicate compatibility.
- Authentication mismatch still disconnects without a rejection frame or resource sample.
- Authenticated \`not-ready\`, \`resource-pressure\`, and \`draining\` rejections remain replayable; \`incompatible\` does not.

## Where it lives

\`\`\`text
.
\u251C\u2500\u2500 packages/daemon/
\u2502   \u251C\u2500\u2500 src/
\u2502   \u2502   \u251C\u2500\u2500 ++ daemon-admission.ts             # owns guards, frames, validation, and retry safety
\u2502   \u2502   \u251C\u2500\u2500 ++ daemon-admission.test.ts        # locks pairwise precedence and retry table
\u2502   \u2502   \u251C\u2500\u2500 ** host-contract.test.ts           # locks exact source and declaration surface
\u2502   \u2502   \u2514\u2500\u2500 ** index.ts                        # exposes admission contracts at package root
\u2502   \u2514\u2500\u2500 test/
\u2502       \u2514\u2500\u2500 ** public-import.test.ts            # verifies consumer-visible imports
\u2514\u2500\u2500 apps/cli/src/daemon/
    \u251C\u2500\u2500 ** workspace-daemon.ts                 # projects state into synchronous policy decisions
    \u251C\u2500\u2500 ** accepted-request-ledger.ts          # reports compatibility without mutation
    \u251C\u2500\u2500 ** local-daemon-transport.ts           # validates frames and derives retry projection
    \u251C\u2500\u2500 ** daemon-protocol.ts                  # reuses daemon-owned frame vocabulary
    \u251C\u2500\u2500 ** workspace-request-queue.ts          # reuses daemon-owned queue-state vocabulary
    \u2514\u2500\u2500 ** ... 4 test files                    # preserve admission, wire, duplicate, and fallback behavior
\`\`\`

Legend: \`++\` added, \`**\` changed, \`~~\` moved, \`--\` removed.

## Public surface

Added at the \`@symnav/daemon\` root:

\`\`\`ts
export type DaemonExecuteRejectionCode =
  | "not-ready"
  | "draining"
  | "resource-pressure"
  | "incompatible";
export type AcceptedRequestCompatibility = "unseen" | "matching" | "conflicting";
export type WorkspaceRequestQueueState = "accepting" | "draining" | "closed";
export type DaemonExecutionCoordinates = {
  readonly instanceId: string;
  readonly processToken: string;
  readonly requestId: string;
};
export type DaemonRejectedExecutionFrame = {
  readonly kind: "rejected";
  readonly instanceId: string;
  readonly processToken: string;
  readonly requestId: string;
  readonly code: DaemonExecuteRejectionCode;
  readonly retrySafe: boolean;
};
export interface DaemonAdmissionContext {
  readonly request: unknown;
  readonly authenticated: boolean;
  readonly workerReady: boolean;
  readonly resourceAdmissionPaused: boolean;
  readonly queueState: WorkspaceRequestQueueState;
  readonly compatibility: AcceptedRequestCompatibility;
}
export interface DaemonAdmissionGuard {
  rejectionFor(context: DaemonAdmissionContext): DaemonAdmissionRejectionCode | undefined;
}
export type DaemonAdmissionRejectionCode = "authentication" | DaemonExecuteRejectionCode;
export type DaemonAdmissionDecision =
  | { readonly kind: "accept" }
  | { readonly kind: "disconnect"; readonly code: "authentication" }
  | { readonly kind: "reject"; readonly code: DaemonExecuteRejectionCode };
export class DaemonAdmissionPolicy {
  decide(context: DaemonAdmissionContext): DaemonAdmissionDecision;
}
export class DaemonAdmissionRejections {
  static retrySafe(code: DaemonExecuteRejectionCode): boolean;
  static frame(
    code: DaemonExecuteRejectionCode,
    coordinates: DaemonExecutionCoordinates,
  ): DaemonRejectedExecutionFrame;
  static assertConsistent(frame: DaemonRejectedExecutionFrame): void;
}
\`\`\`

## Decisions

- Chose explicit guard classes over inline conditionals, because first-failure order is visible and exhaustively testable as one policy.
- Chose side-effect-free ledger compatibility over mutation-time corruption handling, because conflicts must reject without changing accepted state.
- Chose code-derived retry safety over trusting wire booleans, because contradictory frames must be corrupt rather than replayable.
- Chose \`unknown\` for the temporary request field over importing the CLI request type, because \`@symnav/daemon\` must remain dependency-free until the daemon-owned executor contract replaces it.

## Look here

- \`packages/daemon/src/daemon-admission.ts:85\`
- \`apps/cli/src/daemon/workspace-daemon.ts:556\`
- \`apps/cli/src/daemon/local-daemon-transport.ts:1293\`
`},"pr-137.md":{version:"bundle",path:"pr-137.md",revision:"757c41a213838bec2a5754d270f2b2ea7e029330",sha256:"dc9c03d8470cffe0b847bd23c79ac13676019d615f5106067f34484c58eae17d",text:`## Context

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
`},"pr-138.md":{version:"bundle",path:"pr-138.md",revision:"4e0dc1978cc5716cbed9f95b0f2216d707885fd9",sha256:"4b36d5b249132835e927b3e9f0ddb26515d264d8149eccb463c092aeea27a267",text:`## Context

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
`},"pr-139.md":{version:"bundle",path:"pr-139.md",revision:"29a747e95fa142aa7b88c8b84fcb9c2fd9b18d9a",sha256:"ff1408a14aa5552ff1b5cbcc9db0c5c049e5f84c5714831be9df25ecd877df70",text:`## Context

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
`},"pr-142.md":{version:"bundle",path:"pr-142.md",revision:"5e9ee2752b12f845a9f168072d37fd388462a748",sha256:"2eac54e96bc6861bcf9fc9c59c326a06f284ecdbdbef497196dd6ab2e8464a3f",text:`## Context

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
`},"pr-148.md":{version:"bundle",path:"pr-148.md",revision:"20838f8dbf413e04767543eb2380d0d114da6c60",sha256:"cce863c870678c3750057ee3f49c81c635d03bbf5a8614158dada4b60c7f7a6b",text:`## Context

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
`},"pr-149.md":{version:"bundle",path:"pr-149.md",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",sha256:"0d2968db58185c4d79dd79628e0638f3d0f81d245730cc441b01859cd5d90d6b",text:`## Context

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
`}};var u2={kind:"Actual compiled execution client with scripted socket streams, fake empty-output capture, and fake ACK port; no live daemon or host execution.",revision:"d07002357d3e9596bfaae910a1ac63b77981620b",policy:{reattach:1,fetch:1},results:{complete:{outcome:{status:"completed",exitCode:0},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"receive",i:0,kind:"result-manifest"},{event:"acceptance-received"},{event:"receive",i:0,kind:"result-end"},{event:"acknowledge"},{event:"eof",i:0}],captures:[{disposed:1}]},unreachable:{outcome:{status:"error",code:"unreachable",delivery:"not-submitted",retrySafe:!0,message:"Scripted connection refused"},writes:[],trace:[{event:"connect",i:0,timeout:5e3}],captures:[{disposed:1}]},uncertain:{outcome:{status:"error",code:"closed",delivery:"submitted-unconfirmed",retrySafe:!1,message:"Daemon connection ended before acceptance"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"eof",i:0}],captures:[{disposed:1}]},"not-ready":{outcome:{status:"error",code:"rejected",delivery:"submitted-unconfirmed",retrySafe:!0,message:"Daemon rejected execution: not-ready"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"rejected"}],captures:[{disposed:1}]},draining:{outcome:{status:"error",code:"rejected",delivery:"submitted-unconfirmed",retrySafe:!0,message:"Daemon rejected execution: draining"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"rejected"}],captures:[{disposed:1}]},incompatible:{outcome:{status:"error",code:"rejected",delivery:"submitted-unconfirmed",retrySafe:!1,message:"Daemon rejected execution: incompatible"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"rejected"}],captures:[{disposed:1}]},contradictory:{outcome:{status:"error",code:"corrupt",delivery:"submitted-unconfirmed",retrySafe:!1,message:"Malformed daemon execution rejection"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"rejected"}],captures:[{disposed:1}]},terminal:{outcome:{status:"failed",code:"internal"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"receive",i:0,kind:"execution-failed"},{event:"acceptance-received"},{event:"eof",i:0}],captures:[{disposed:1}]},reattach:{outcome:{status:"completed",exitCode:0},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}},{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"eof",i:0},{event:"acceptance-received"},{event:"connect",i:1,timeout:5e3},{event:"write",i:1,kind:"execute"},{event:"receive",i:1,kind:"accepted"},{event:"disable-admission-timeout",i:1},{event:"receive",i:1,kind:"result-manifest"},{event:"receive",i:1,kind:"result-end"},{event:"acknowledge"},{event:"eof",i:1}],captures:[{disposed:1},{disposed:1}]},fetch:{outcome:{status:"completed",exitCode:0},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}},{kind:"result-fetch",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",offset:0}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"receive",i:0,kind:"result-manifest"},{event:"acceptance-received"},{event:"eof",i:0},{event:"connect",i:1},{event:"write",i:1,kind:"result-fetch",offset:0},{event:"receive",i:1,kind:"result-manifest"},{event:"receive",i:1,kind:"result-end"},{event:"acknowledge"}],captures:[{disposed:1}]},both:{outcome:{status:"completed",exitCode:0},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}},{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}},{kind:"result-fetch",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",offset:0}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"eof",i:0},{event:"acceptance-received"},{event:"connect",i:1,timeout:5e3},{event:"write",i:1,kind:"execute"},{event:"receive",i:1,kind:"accepted"},{event:"disable-admission-timeout",i:1},{event:"receive",i:1,kind:"result-manifest"},{event:"eof",i:1},{event:"connect",i:2},{event:"write",i:2,kind:"result-fetch",offset:0},{event:"receive",i:2,kind:"result-manifest"},{event:"receive",i:2,kind:"result-end"},{event:"acknowledge"}],captures:[{disposed:1},{disposed:1}]},"exhaust-fetch":{outcome:{status:"error",code:"corrupt",delivery:"accepted",retrySafe:!1,message:"Daemon result resume ended before completion"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}},{kind:"result-fetch",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",offset:0}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"receive",i:0,kind:"result-manifest"},{event:"acceptance-received"},{event:"eof",i:0},{event:"connect",i:1},{event:"write",i:1,kind:"result-fetch",offset:0},{event:"receive",i:1,kind:"result-manifest"},{event:"eof",i:1}],captures:[{disposed:1}]},"exhaust-reattach":{outcome:{status:"error",code:"closed",delivery:"accepted",retrySafe:!1,message:"Daemon connection ended after acceptance before completion"},writes:[{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}},{kind:"execute",protocolVersion:5,instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72",commandName:"overview",request:{argv:["overview","src/a.ts"],cwd:"/bench",telemetryEnabled:!1,executionMode:"warm"}}],trace:[{event:"connect",i:0,timeout:5e3},{event:"write",i:0,kind:"execute"},{event:"receive",i:0,kind:"accepted"},{event:"disable-admission-timeout",i:0},{event:"eof",i:0},{event:"acceptance-received"},{event:"connect",i:1,timeout:5e3},{event:"write",i:1,kind:"execute"},{event:"receive",i:1,kind:"accepted"},{event:"disable-admission-timeout",i:1},{event:"eof",i:1}],captures:[{disposed:1},{disposed:1}]}},ledger:{matching:"matching",sameEntry:!0,size:1}};var d2=[{id:"route",ref:"U1",type:"mux",title:"ROUTE",sub:"one snapshot",owner:"caller",reading:"route",w:150,h:148},{id:"wire",ref:"J1",type:"socket",title:"SUBMIT",sub:"socket / write",owner:"caller",reading:"delivery",w:150,h:148},{id:"admission",ref:"U2",type:"admission",title:"ADMISSION",sub:"first failing guard wins",owner:"server",reading:"admission",w:248,h:335},{id:"fuse",ref:"F1",type:"fuse",title:"FRAME FUSE",sub:"code \u2194 retrySafe",owner:"caller",reading:"authority",w:168,h:148},{id:"retry",ref:"U3",type:"or",title:"LOCAL PERMIT",sub:"proof of safe replay",owner:"caller",reading:"authority",w:170,h:150},{id:"latch",ref:"U4",type:"latch",title:"ACCEPTED",sub:"request identity retained",owner:"caller",reading:"accepted",w:176,h:168},{id:"recovery",ref:"U5",type:"recovery",title:"RECOVERY",sub:"two independent counters",owner:"caller",reading:"recovery",w:205,h:228},{id:"ack",ref:"J2",type:"ack",title:"RESULT + ACK",sub:"verify \u2192 acknowledge",owner:"caller",reading:"recovery",w:170,h:148},{id:"local",ref:"D1",type:"led",title:"LOCAL RUN",sub:"cold / fallback",owner:"host",reading:"route",w:157,h:128},{id:"done",ref:"D2",type:"led",title:"DELIVERED",sub:"daemon result",owner:"caller",reading:"accepted",w:157,h:128},{id:"halt",ref:"D3",type:"led",title:"CONTROLLED",sub:"failure \xB7 no local replay",owner:"caller",reading:"accepted",w:190,h:128}],f2=[["route-wire","route","wire","signal","warm"],["route-local","route","local","local","cold / fallback"],["wire-admission","wire","admission","signal","submitted"],["wire-retry","wire","retry","transport","not submitted"],["wire-halt","wire","halt","transport","unconfirmed close"],["admission-fuse","admission","fuse","admission","rejected"],["admission-latch","admission","latch","signal","accepted"],["admission-halt","admission","halt","transport","disconnect"],["fuse-retry","fuse","retry","admission","consistent"],["fuse-halt","fuse","halt","transport","corrupt"],["retry-local","retry","local","local","retrySafe = true"],["retry-halt","retry","halt","admission","retrySafe = false"],["latch-ack","latch","ack","signal","result"],["latch-recovery","latch","recovery","transport","accepted close"],["latch-halt","latch","halt","execution","execution-failed"],["recovery-latch","recovery","latch","recovery","identical execute"],["recovery-ack","recovery","ack","recovery","result-fetch"],["recovery-halt","recovery","halt","transport","exhausted"],["ack-done","ack","done","signal","acknowledged"]].map(([e,n,t,o,r])=>({id:e,source:n,target:t,domain:o,label:r})),Af={signal:"#d6e6ab",admission:"#f0b75e",transport:"#ec938b",execution:"#c7a0ee",recovery:"#75d5d0",local:"#bedf82"};var ke="head:packages/daemon/src/",Fi=[{id:"owner",n:"01",title:"The mechanism changes its package.",summary:"Main keeps this circuit in apps/cli. #148 stages the daemon package; #149 connects the shipped CLI to DaemonClient. CLI keeps argv and workspace discovery; daemon owns routing, admission, transport and recovery.",reason:"Stated \xB7 separate mechanism ownership from the host invocation switch.",detail:"Package outlines and process badges answer different questions. In the final stack, client-side routing and recovery run in the caller process, while admission runs in the daemon process. They are source-owned by the same daemon package. Local execution is supplied by the host. The #148 package was staged while the CLI still used its frozen compatibility graph; #149 makes the package the active owner.",sources:[["pr-148.md",90,91],["pr-149.md",84,89],["pr-148.md",1,42],["pr-149.md",1,43],["head:apps/cli/src/cli-invocation-coordinator.ts",17,44],[ke+"client/daemon-client-runtime.ts",167,187]]},{id:"route",n:"02",title:"A route is chosen before submission.",summary:"Ordered lazy checks stop at the first route: record present \u2192 not starting \u2192 version compatible \u2192 responsive. Warm goes to the socket; cold/fallback go local. Selected startup runs independently and never switches the chosen route.",reason:"Stated \xB7 the first routing decision must prevent later side effects.",detail:"U1 receives one fixture route snapshot. The bench offers warm, cold/absent, and fallback/incompatible. In source, absent or unreadable records, starting state, version, and live observation have ordered guards. A warm snapshot is a candidate for daemon execution, not an admission receipt. For cold/absent and fallback, startup is triggered independently; local execution does not wait for that trigger. The fixed inputs deliberately keep the whole registry and startup implementation outside this circuit.",sources:[["pr-148.md",86,95],[ke+"client/daemon-routing-policy.ts",61,137],[ke+"client/daemon-client-runtime.ts",167,187],[ke+"client/daemon-client.test.ts",126,146]]},{id:"admission",n:"03",title:"The first failing gate names the rejection.",summary:"Token \u2192 worker \u2192 resources \u2192 queue \u2192 duplicate. Token mismatch disconnects with no rejection frame or resource sample. Not-ready, pressure and draining permit local fallback; incompatible does not. A matching duplicate reuses accepted state; a conflict leaves it untouched.",reason:"Stated \xB7 visible, testable order and nonmutating compatibility. Unexplained \xB7 why this exact original priority was chosen.",detail:"U2 is a priority chain, not a parallel Boolean AND. Only the earliest failing guard supplies the decision. The coordinator starts admission resource sampling only after authentication, then projects current state into the synchronous policy. Both closed and draining queues produce draining. An unseen or matching request passes compatibility; a conflict produces incompatible. Matching acceptance returns an existing ledger entry without starting another execution. This is why draining can mask a simultaneous duplicate conflict.",sources:[["pr-134.md",132,136],["pr-134.md",38,53],[ke+"daemon-admission.ts",44,129],[ke+"process/process-coordinator.ts",474,521],[ke+"execution/accepted-request-ledger.ts",59,103],[ke+"execution/accepted-execution-session.ts",45,77]]},{id:"delivery",n:"04",title:"A write is not an acceptance receipt.",summary:"Transport tracks not-submitted, submitted-unconfirmed, and accepted. Only the first state proves no submission. Silence after a write grants no local retry. Framing, validation and socket I/O have separate owners; reply coordinates must match.",reason:"Stated \xB7 preserve delivery and authentication classifications while splitting transport responsibilities.",detail:"J1 makes the delivery boundary visible. A failed connect remains not-submitted. Once the request is written, an early close leaves delivery uncertain. The authenticated accepted frame is what changes the delivery state. The codec and protocol validator separate byte framing from the meaning and correlation of frames; neither a successful write nor a retry flag authenticates a response. The fixture holds response instance, process token and request identifier matching, so only the retry-field contradiction is injected here.",sources:[["pr-137.md",72,78],["pr-137.md",1,45],[ke+"transport/execution-client.ts",233,300],[ke+"transport/protocol-validator.ts",287,309],[ke+"transport/transport-error.ts",1,38],[ke+"client/daemon-client-runtime.ts",210,243]]},{id:"authority",n:"05",title:"The code table owns the retry bit.",summary:"Local permit = not-submitted OR an authenticated, consistent rejection whose code is not-ready / resource-pressure / draining. #134 tightens main\u2019s trusted wire boolean: incompatible + true is corrupt, never replay permission.",reason:"Stated \xB7 contradictory frames must be corrupt rather than replayable.",detail:"F1 first checks that the wire retrySafe agrees with the rejection code. U3 then derives retry permission from the code and delivery context. In main, the rejection validator checks the code vocabulary and Boolean type, and the transport passes frame.retrySafe into the error. At head, the consistency check rejects contradictions and the transport error derives retrySafe from the authoritative table. The amber wire carries admission vocabulary; a contradiction exits onto the rose transport-corruption wire. The tamper switch is an illustrative malformed peer response, not an observed incident.",sources:[["pr-134.md",134,136],["pr-134.md",1,53],[ke+"daemon-admission.ts",104,129],[ke+"transport/protocol-validator.ts",334,359],[ke+"transport/transport-error.ts",13,38],["main:apps/cli/src/daemon/local-daemon-transport.ts",522,535],["main:apps/cli/src/daemon/local-daemon-transport.ts",1256,1277],[ke+"daemon-admission.test.ts",110,130]]},{id:"accepted",n:"06",title:"Accepted work cannot power local replay.",summary:"Acceptance keeps request identity and disables the admission timer; completion has no deadline. The outer terminal codes are worker-exit, controlled-resource, response-capacity, stopping, internal\u2014distinct from inner worker failures. Each yields a controlled result, with no local execution.",reason:"Stated \xB7 one outer vocabulary; accepted terminal failures never replay work.",detail:"U4 is a lossy latch analogy for client receipt state, not a hardware latch or a claim that the server ran instantly. Acceptance occurs before completion. Terminal execution-failed frames belong to the outer completion domain, so they travel on violet traces rather than amber rejection traces. The client handles completion in a separate try/catch that never invokes its local executor. The inner worker vocabulary is initialization, execution, protocol, resource; this circuit stops at the outer boundary. The admission timeout is disabled when acceptance is published, and there is no post-acceptance completion deadline.",sources:[["pr-133.md",100,105],["pr-133.md",1,52],[ke+"daemon-execution-failure.ts",1,18],[ke+"client/daemon-client-runtime.ts",225,243],[ke+"transport/execution-client.ts",146,151],["head:plans/005/daemon-policy.md",52,61]]},{id:"recovery",n:"07",title:"Recovery has two separate allowances.",summary:"With a manifest, result-fetch resumes at the next record offset in the same capture. An authenticated accepted close can reattach the identical execute request with a fresh capture. Current limits: 1 fetch per attempt, 1 reattachment per request. Clean fetch exhaustion \u2192 corrupt; reattachment failure retains the first accepted close. Verify output, then ACK before completion.",reason:"Stated \xB7 independent recovery scopes and capture lifetimes. Unexplained \xB7 quantitative basis for choosing exactly one.",detail:"U5 contains two counters because they spend different allowances. A fetch resumes an interrupted result delivery within the current execute attempt, preserving the contiguous record offset and capture. An identical-request reattachment starts another delivery attempt with a fresh capture and its own fetch allowance; the server reuses the accepted ledger entry. It never asks the local host to redo the command. A clean EOF during an exhausted fetch becomes accepted corruption and bypasses reattachment. Exhausted or failed reattachment preserves the original authenticated accepted-close error. J2 returns a completed result only after transfer validation and successful acknowledgement. The bench fixes current limits at one and models an empty transfer; lengths, delays and motion are illustrative.",sources:[["pr-142.md",1,75],[ke+"transport/execution-client.ts",51,81],[ke+"transport/execution-client.ts",122,151],[ke+"transport/execution-client.ts",207,230],[ke+"transport/execution-client.ts",375,434],[ke+"transport/result-transfer-receiver.ts",44,143],["head:plans/005/daemon-policy.md",27,28],[ke+"transport/daemon-transport-execution.test.ts",736,783],[ke+"transport/daemon-transport-execution.test.ts",1268,1315]]},{id:"evidence",n:"08",title:"This is a bounded teaching instrument.",summary:"Source-derived simulation: admission and retry gates execute frozen source; socket/host actions are modeled. Thirteen actual client probes use scripted I/O. 147 focused source tests passed. Added guard/contradiction and recovery tests support this slice; the full stack and human comprehension are untested here.",reason:"Stated \xB7 focused ownership/precedence and preserved recovery oracles. No correctness verdict or whole-stack parity claim.",detail:"The browser runs the exact captured DaemonAdmissionPolicy, DaemonAdmissionRejections and DaemonTransportError classes. Its route snapshots, socket events, capture lifecycle, local actions and animation are authored source-derived simulation. The companion recorder invokes the compiled head execution client with scripted socket streams, a fake empty-output capture and an ACK stub; it records thirteen cases and separately invokes the real accepted ledger for duplicate identity. Five existing test files passed 147 tests, including the real socket transfer tests. #134 adds policy precedence and contradictory-bit coverage; #142 adds direct client ownership/recovery tests. We did not audit every test change in the 26-PR stack or run its full suite. Rationale gaps refer to the supplied PR bodies/commits and policy/spec documents, not to an unseen implementing conversation.",sources:[[ke+"daemon-admission.test.ts",44,129],[ke+"transport/execution-client.test.ts",15,192],["pr-134.md",54,82],["pr-142.md",35,75]]}],p2=[["auth","TOKEN","authenticated"],["ready","READY","worker ready"],["pressure","MEMORY","not paused"],["queue","QUEUE","accepting"],["duplicate","MATCH","not conflicting"]];var Yg=class{rejectionFor(n){return n.authenticated?void 0:"authentication"}},Gg=class{rejectionFor(n){return n.workerReady?void 0:"not-ready"}},Xg=class{rejectionFor(n){return n.resourceAdmissionPaused?"resource-pressure":void 0}},Kg=class{rejectionFor(n){return n.queueState==="accepting"?void 0:"draining"}},Zg=class{rejectionFor(n){return n.compatibility==="conflicting"?"incompatible":void 0}},Nf=class{guards=[new Yg,new Gg,new Xg,new Kg,new Zg];decide(n){for(let t of this.guards){let o=t.rejectionFor(n);if(o!==void 0)return o==="authentication"?{kind:"disconnect",code:o}:{kind:"reject",code:o}}return{kind:"accept"}}},Yi=class e{static retrySafety=Object.freeze({"not-ready":!0,draining:!0,"resource-pressure":!0,incompatible:!1});static retrySafe(n){return e.retrySafety[n]}static frame(n,t){return{kind:"rejected",...t,code:n,retrySafe:e.retrySafe(n)}}static assertConsistent(n){if(!Object.hasOwn(e.retrySafety,n.code)||n.retrySafe!==e.retrySafety[n.code])throw new Error("Inconsistent daemon execution rejection")}};var xl=class extends Error{constructor(t,o,r,i,a){super(r);this.code=t;this.delivery=o;this.name="DaemonTransportError",i!==void 0&&(this.authenticatedInstanceId=i),this.retrySafe=o==="not-submitted"||t==="rejected"&&o==="submitted-unconfirmed"&&i!==void 0&&a!==void 0&&Yi.retrySafe(a)}authenticatedInstanceId;retrySafe};var wl={route:"warm",auth:!0,ready:!0,pressure:!1,queue:"accepting",duplicate:"unseen",wire:"intact",tamper:!1,ending:"complete"},If=[{id:"complete",name:"01 \xB7 A clean delivery",patch:{},note:"All five guards pass. Acceptance closes the local replay path."},{id:"precedence",name:"02 \xB7 Two failures at once",patch:{queue:"draining",duplicate:"conflicting"},note:"The queue is draining and the duplicate conflicts. Which rejection reaches the client?"},{id:"auth",name:"03 \xB7 Wrong process token",patch:{auth:!1,ready:!1,pressure:!0},note:"Authentication cuts the signal before a rejection frame or resource sample."},{id:"contradictory",name:"04 \xB7 A lying retry bit",patch:{duplicate:"conflicting",tamper:!0},note:"The wire says incompatible + retrySafe=true. The code table owns the answer."},{id:"unreachable",name:"05 \xB7 Socket never connects",patch:{wire:"before"},note:"Nothing was submitted. The local permit has proof of safe fallback."},{id:"uncertain",name:"06 \xB7 Silence after the write",patch:{wire:"unconfirmed"},note:"No acceptance was heard. That does not prove the daemon did no work."},{id:"both",name:"07 \xB7 Two recovery circuits",patch:{ending:"both"},note:"First reattach the identical execute request; then resume its result transfer."},{id:"exhaust-fetch",name:"08 \xB7 Fetch ends too soon",patch:{ending:"exhaust-fetch"},note:"A clean but incomplete fetch exhausts as accepted corruption. It cannot buy another execute attempt."},{id:"exhaust-reattach",name:"09 \xB7 Reattachment exhausted",patch:{ending:"exhaust-reattach"},note:"The original authenticated accepted-close error survives the recovery failure."},{id:"terminal",name:"10 \xB7 Worker exits after acceptance",patch:{ending:"worker-exit"},note:"A terminal execution code is a controlled result, never an admission rejection."},{id:"cold",name:"11 \xB7 No daemon record",patch:{route:"cold"},note:"Choose local now. Independent daemon warmup cannot switch this request to warm."}],G4=["auth","ready","pressure","queue","duplicate"];function Qg(e){let n={...wl,...e},t=[],o={localRuns:0,executeWrites:0,fetches:0,reattachments:0,accepted:!1,admissionSamples:0},r="pending",i="",a="not-submitted",s=!1,c=(m,g,x,h,v={})=>t.push({node:m,title:g,text:x,edge:h,delivery:a,...o,...v}),l=(m,g,x,h,v={})=>(r=m,c(m,g,x,h,v),{input:n,steps:t,stats:o,outcome:r,code:i,delivery:a,retrySafe:s});if(c("route","Choose one route",n.route==="warm"?"A compatible responsive daemon is available. This workspace request takes the warm route.":n.route==="cold"?"No daemon record: choose cold execution and trigger warmup independently.":"Incompatible route snapshot: choose local fallback and trigger startup independently."),n.route!=="warm")return o.localRuns=1,l("local",n.route==="cold"?"Cold local execution":"Local fallback","The selected route remains local even if independent warmup finishes.","route-local");if(c("wire","Connect to the execution socket","The request is not submitted until the write succeeds.","route-wire"),n.wire==="before"){let m=new xl("unreachable","not-submitted","simulated refused connection");return s=m.retrySafe,i=m.code,c("retry","not-submitted \u2192 safe","The transport error proves this request was not submitted.","wire-retry",{code:i,retrySafe:s}),o.localRuns=1,l("local","One local fallback","DaemonClientRuntime invokes its local executor once.","retry-local",{code:i,retrySafe:s})}if(o.executeWrites++,a="submitted-unconfirmed",c("wire","Write sent \xB7 acceptance unknown","A successful socket write is not an acceptance receipt."),n.wire==="unconfirmed")return i="closed",l("halt","Uncertain delivery \xB7 no local replay","A close after the write cannot prove that execution did not start.","wire-halt",{code:i,retrySafe:!1});let u=new Nf().decide({request:{},authenticated:n.auth,workerReady:n.ready,resourceAdmissionPaused:n.pressure,queueState:n.queue,compatibility:n.duplicate});n.auth&&(o.admissionSamples=1);let f=u.kind==="accept"?5:{authentication:0,"not-ready":1,"resource-pressure":2,draining:3,incompatible:4}[u.code],d=[["Authenticate","The process token must match. A mismatch disconnects; no rejection frame and no admission resource sample."],["Worker ready","A worker that is not ready rejects with not-ready."],["Resources allow","Paused resource admission rejects with resource-pressure."],["Queue accepts","Both draining and closed queues reject with draining."],["Duplicate matches","An unseen or matching request passes. A conflicting duplicate rejects without mutating its accepted entry."]];for(let m=0;m<Math.min(f+1,5);m++)c("admission",d[m][0],d[m][1],m===0?"wire-admission":void 0,{guard:G4[m],guardIndex:m,guardFailed:f===m,code:f===m?u.code:void 0});if(u.kind==="disconnect")return i="closed",l("halt","Authentication disconnect","The client sees a submitted-unconfirmed close, not an authenticated retry-safe rejection.","admission-halt",{code:i,retrySafe:!1});if(u.kind==="reject"){let m=Yi.frame(u.code,{instanceId:"bench-instance",processToken:"bench-token",requestId:"signal-72"});n.tamper&&(m.retrySafe=!m.retrySafe),c("fuse","Validate the rejection",`${m.code} + retrySafe=${m.retrySafe}. Identity is held matching in this bench; the two fields must agree with the authoritative code table.`,"admission-fuse",{frame:m});try{Yi.assertConsistent(m)}catch{return i="corrupt",l("halt","Contradictory frame \xB7 fuse open","The validator rejects this frame as corrupt before it can grant local retry permission.","fuse-halt",{code:i,retrySafe:!1,fuseBlown:!0})}return s=new xl("rejected",a,"simulated rejection",m.instanceId,m.code).retrySafe,i=m.code,c("retry",s?"Authenticated rejection \u2192 safe":"Incompatible \u2192 no replay",`${m.code} derives retrySafe=${s}. The wire boolean is checked, then the code supplies the client decision.`,"fuse-retry",{code:i,retrySafe:s}),s?(o.localRuns=1,l("local","One local fallback","The authenticated rejection proves admission did not accept this request.","retry-local",{code:i,retrySafe:s})):l("halt","Controlled failure \xB7 no local replay","An incompatible rejection does not grant retry permission.","retry-halt",{code:i,retrySafe:s})}if(o.accepted=!0,a="accepted",c("latch","Acceptance retained","The client has a receipt for signal-72. Its admission timeout is disabled; accepted completion has no deadline. Matching duplicates reuse the accepted entry.","admission-latch"),["worker-exit","controlled-resource","response-capacity","stopping","internal"].includes(n.ending))return i=n.ending,l("halt",`execution-failed \xB7 ${i}`,"This is the outer completion vocabulary. The client returns a controlled failure and does not invoke the local executor.","latch-halt",{code:i});if(n.ending!=="complete"){let m=["reattach","both","exhaust-reattach"].includes(n.ending);if(c("recovery",m?"Closed before a manifest":"Interrupted manifest transfer",m?"An authenticated close after acceptance may spend the request\u2019s reattachment allowance.":"A manifest exists: fetch the same transfer from its next contiguous record offset.","latch-recovery"),m&&(o.reattachments=1,o.executeWrites++,o.admissionSamples++,c("latch","Reattach \xB7 identical execute request","Send the same request identity and payload. A fresh capture is created; a matching accepted entry is reused. This is not local replay.","recovery-latch"),n.ending==="exhaust-reattach"))return c("recovery","Accepted close again","The request has spent its one reattachment allowance.","latch-recovery"),i="closed",l("halt","Reattachment budget exhausted","Current policy allows one reattachment. Preserve the first authenticated accepted-close error.","recovery-halt",{code:i});if(["fetch","both","exhaust-fetch"].includes(n.ending)&&(n.ending==="both"&&c("recovery","The new attempt owns its fetch allowance","This attempt has a manifest. Its result-fetch counter starts at zero independently of the request\u2019s spent reattachment.","latch-recovery"),o.fetches=1,c("recovery","Fetch \xB7 next record offset","Spend one fetch resume for this attempt; keep its existing capture. Offset counts complete records, not bytes."),n.ending==="exhaust-fetch"))return i="corrupt",l("halt","Clean fetch exhaustion \u2192 corrupt","A clean EOF before the result end becomes accepted corruption. It does not become an accepted-close reattachment.","recovery-halt",{code:i})}return c("ack","Finish result, then acknowledge","Verify the manifest and output summary; acknowledge the transfer before resolving completion.",["fetch","both"].includes(n.ending)?"recovery-ack":"latch-ack"),l("done","Daemon result delivered","The output is returned after successful acknowledgement. Local executions for this signal: zero.","ack-done")}Lr.registerPlugin(Ug);var X4=e=>e.sections.map(n=>[n.startPoint,...n.bendPoints??[],n.endPoint].map((t,o)=>`${o?"L":"M"} ${t.x} ${t.y}`).join(" ")).join(" "),zf=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches,K4=[0,1,2,3,4];function Z4({data:e}){let n=e.component,t=n.w,o=n.h,r=n.type==="led",i=e.active,a=e.visited,s=a?"#cde5a2":"#608574",c=e.step,l=u=>{let f=e.guardSteps.filter(d=>d.guardIndex===u).at(-1);return f?f.guardFailed?"fail":"pass":"skip"};return S.default.createElement("div",{className:`component ${n.owner} ${i?"active":""} ${a?"visited":""}`},S.default.createElement(Mi,{type:"target",id:"in",position:K.Left,style:{top:e.ports[0]?.y+1}}),S.default.createElement("button",{className:"component-button nodrag nopan","aria-label":`Inspect ${n.ref} ${n.title}`,onClick:()=>e.inspect(n.reading)},S.default.createElement("svg",{viewBox:`0 0 ${t} ${o}`,width:t,height:o,"aria-hidden":"true"},!r&&S.default.createElement(S.default.Fragment,null,K4.map(u=>S.default.createElement(S.default.Fragment,{key:u},S.default.createElement("path",{d:`M0 ${o*.28+u*13} h10 M${t-10} ${o*.28+u*13} h10`,className:"pin"}))),S.default.createElement("rect",{x:"10",y:"7",width:t-20,height:o-14,rx:n.owner==="server"?0:6,className:"package"}),n.owner==="server"&&S.default.createElement("rect",{x:"16",y:"13",width:t-32,height:o-26,className:"server-package"})),S.default.createElement("text",{x:"22",y:"30",className:"ref"},n.ref),S.default.createElement("text",{x:t-24,y:"30",className:"owner-stamp",textAnchor:"end"},n.owner==="server"?"D":n.owner==="host"?"H":"C"),n.type==="admission"?S.default.createElement(S.default.Fragment,null,S.default.createElement("text",{x:"24",y:"54",className:"part-name"},"ADMISSION"),S.default.createElement("text",{x:"24",y:"72",className:"part-sub"},"first failing guard wins"),p2.map(([u,f,d],p)=>{let m=91+p*42,g=l(p);return S.default.createElement("g",{key:u,className:`logic-gate ${g}`},p<4&&S.default.createElement("path",{d:`M52 ${m+28} v14`,className:"inner-wire"}),S.default.createElement("path",{d:`M34 ${m} h15 a14 14 0 0 1 0 28 H34 Z`,className:"and-shape"}),S.default.createElement("text",{x:"48",y:m+19,textAnchor:"middle",className:"gate-number"},p+1),S.default.createElement("circle",{cx:"213",cy:m+14,r:"4",className:"gate-led"}),S.default.createElement("text",{x:"78",y:m+11,className:"gate-name"},f),S.default.createElement("text",{x:"78",y:m+27,className:"gate-sub"},g==="fail"?e.guardSteps.find(x=>x.guardIndex===p)?.code:d),g==="skip"&&S.default.createElement("path",{d:`M194 ${m+7} l7 14 M201 ${m+7} l7 14`,className:"skip-mark"}))}),S.default.createElement("text",{x:"24",y:"316",className:"part-sub"},"TOKEN \u2192 STATE \u2192 IDENTITY")):r?S.default.createElement(S.default.Fragment,null,S.default.createElement("path",{d:`M0 ${o/2} H${t/2-22} V62`,className:"symbol"}),S.default.createElement("circle",{cx:t/2,cy:"62",r:"22",className:`output-led ${i?"on":""} ${n.id}`}),S.default.createElement("circle",{cx:t/2-6,cy:"55",r:"6",fill:i?"#f4ffdd":"#3f6154"}),S.default.createElement("text",{x:t/2,y:"104",textAnchor:"middle",className:"part-name"},n.title),S.default.createElement("text",{x:t/2,y:"124",textAnchor:"middle",className:"part-sub"},i&&c.code?c.code:n.sub)):S.default.createElement(S.default.Fragment,null,n.type==="mux"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("path",{d:"M54 45 L93 58 L93 90 L54 103 Z",className:"symbol"}),S.default.createElement("path",{d:"M38 62 H54 M38 85 H54 M93 74 H115",className:"symbol"}),S.default.createElement("text",{x:"73",y:"82",textAnchor:"middle",className:"symbol-text"},"1")),n.type==="socket"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("path",{d:"M38 67 H66 V51 H86 V67 H113 M66 91 V78 M86 91 V78",className:"symbol"}),S.default.createElement("path",{d:"M74 48 V95",strokeDasharray:"3 5",className:"symbol muted-symbol"}),S.default.createElement("circle",{cx:"39",cy:"67",r:"4",fill:s}),S.default.createElement("circle",{cx:"111",cy:"67",r:"4",fill:s})),n.type==="fuse"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("path",{d:"M29 72 H47 M119 72 H140",className:"symbol"}),S.default.createElement("rect",{x:"47",y:"55",width:"72",height:"34",rx:"17",className:"symbol"}),e.fuseBlown?S.default.createElement("path",{d:"M68 61 l28 22 M96 61 L68 83",className:"broken-fuse"}):S.default.createElement("path",{d:"M48 72 H119",className:"fuse-wire"})),n.type==="or"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("path",{d:"M48 45 Q87 46 113 73 Q87 101 48 102 Q70 73 48 45 Z",className:"symbol"}),S.default.createElement("text",{x:"82",y:"81",textAnchor:"middle",className:"symbol-text"},"\u22651")),n.type==="latch"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("rect",{x:"44",y:"49",width:"86",height:"58",className:"symbol"}),S.default.createElement("text",{x:"57",y:"72",className:"symbol-text"},"D"),S.default.createElement("text",{x:"111",y:"72",className:"symbol-text"},"Q"),S.default.createElement("path",{d:"M44 87 l10 7 l-10 7",className:"symbol"}),S.default.createElement("circle",{cx:"112",cy:"92",r:"6",fill:e.accepted?"#cde5a2":"#274d3d"})),n.type==="recovery"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("text",{x:"27",y:"62",className:"counter-label"},"PER REQUEST"),S.default.createElement("rect",{x:"25",y:"70",width:"156",height:"34",className:"counter-cell"}),S.default.createElement("text",{x:"35",y:"92",className:"counter-name"},"reattach"),S.default.createElement("text",{x:"167",y:"93",textAnchor:"end",className:"counter-value"},c.reattachments,"/1"),S.default.createElement("text",{x:"27",y:"129",className:"counter-label"},"PER ATTEMPT"),S.default.createElement("rect",{x:"25",y:"137",width:"156",height:"34",className:"counter-cell"}),S.default.createElement("text",{x:"35",y:"159",className:"counter-name"},"fetch"),S.default.createElement("text",{x:"167",y:"160",textAnchor:"end",className:"counter-value"},c.fetches,"/1")),n.type==="ack"&&S.default.createElement(S.default.Fragment,null,S.default.createElement("path",{d:"M36 58 H123 V89 H36 Z M44 73 l9 8 l15-19 M80 72 H113",className:"symbol"}),S.default.createElement("path",{d:"M98 47 h24 v-10 M121 47 l-6-6",className:"symbol"})),S.default.createElement("text",{x:t/2,y:o-36,textAnchor:"middle",className:"part-name"},n.title),S.default.createElement("text",{x:t/2,y:o-18,textAnchor:"middle",className:"part-sub"},n.sub)),i&&!r&&S.default.createElement("circle",{cx:t-23,cy:o-24,r:"3",fill:"#eef9b4"}))),S.default.createElement(Mi,{type:"source",id:"out",position:K.Right,style:{top:e.ports[1]?.y+1}}))}function Q4({id:e,data:n}){let t=(0,S.useRef)();return(0,S.useEffect)(()=>{let o=t.current;if(!o)return;if(!n.active||zf()){Lr.set(o,{opacity:0});return}let r=Lr.fromTo(o,{opacity:1},{motionPath:{path:n.path},duration:.8,ease:"none",onComplete:()=>Lr.set(o,{opacity:0})});return()=>{r.kill(),o.isConnected&&Lr.set(o,{opacity:0})}},[n.active,n.tick,n.path]),S.default.createElement("g",{className:`trace ${n.visited?"energized":""}`},S.default.createElement("defs",null,S.default.createElement("marker",{id:`arrow-${e}`,viewBox:"0 0 8 8",refX:"7",refY:"4",markerWidth:"5",markerHeight:"5",orient:"auto"},S.default.createElement("path",{d:"M0 1 L7 4 L0 7",fill:"none",stroke:Af[n.domain],strokeWidth:"1.3"}))),S.default.createElement(as,{id:e,path:n.path,markerEnd:`url(#arrow-${e})`,style:{stroke:Af[n.domain],strokeWidth:n.visited?3.2:1.6,opacity:n.visited?1:.4}}),S.default.createElement("circle",{ref:t,r:"5.5",fill:"#fcffd9",opacity:"0",className:"signal-dot"}),S.default.createElement("title",null,n.label))}var W4={gate:Z4},$4={circuit:Q4};function J4({sim:e,index:n,inspect:t}){let o=$c(),r=e.steps[n],i=e.steps.slice(0,n+1),a=(0,S.useMemo)(()=>Fg.children.map(c=>{let l=d2.find(u=>u.id===c.id);return{id:c.id,type:"gate",position:{x:c.x,y:c.y},width:c.width,height:c.height,draggable:!1,selectable:!1,data:{component:l,ports:c.ports,active:r.node===c.id,visited:i.some(u=>u.node===c.id),guardSteps:i.filter(u=>u.guard),accepted:r.accepted,fuseBlown:i.some(u=>u.fuseBlown),step:r,inspect:t}}}),[e,n,t]),s=(0,S.useMemo)(()=>Fg.edges.map(c=>{let l=f2.find(u=>u.id===c.id);return{...l,type:"circuit",sourceHandle:"out",targetHandle:"in",selectable:!1,data:{...l,path:X4(c),visited:i.some(u=>u.edge===c.id),active:r.edge===c.id,tick:n}}}),[e,n]);return S.default.createElement(RD,{nodes:a,edges:s,nodeTypes:W4,edgeTypes:$4,fitView:!0,fitViewOptions:{padding:.065},minZoom:.15,maxZoom:1.8,nodesConnectable:!1,nodesDraggable:!1,elementsSelectable:!1,deleteKeyCode:null,panOnScroll:!1,colorMode:"dark","aria-label":"Admission circuit. Drag to pan; use controls to zoom. Select a component for evidence."},S.default.createElement(AD,{gap:26,size:1,color:"#688775"}),S.default.createElement(ID,{showInteractive:!1}),S.default.createElement("div",{className:"board-view-tools"},S.default.createElement("button",{onClick:()=>o.fitView({padding:.065,duration:zf()?0:250})},"Fit board"),S.default.createElement("button",{onClick:()=>{let c=a.find(l=>l.id===r.node);o.setCenter(c.position.x+c.width/2,c.position.y+c.height/2,{zoom:1,duration:zf()?0:250})}},"Follow signal")))}function Of({label:e,value:n,onChange:t,help:o}){return S.default.createElement("label",{className:"dip-row"},S.default.createElement("span",null,e,o&&S.default.createElement("small",null,o)),S.default.createElement("input",{type:"checkbox",checked:n,onChange:r=>t(r.target.checked)}),S.default.createElement("span",{className:"dip","aria-hidden":"true"},S.default.createElement("i",null)))}function ws({label:e,value:n,onChange:t,children:o}){return S.default.createElement("label",{className:"field"},S.default.createElement("span",null,e),S.default.createElement("select",{"aria-label":e,value:n,onChange:r=>t(r.target.value)},o))}function e6({reading:e,close:n}){let t=(0,S.useRef)(),[o,r]=(0,S.useState)(0),i=()=>{t.current?.close(),n()},a=Fi.find(d=>d.id===e);if((0,S.useEffect)(()=>{a?(r(0),t.current.showModal()):t.current?.close()},[e]),!a)return null;let[s,c,l]=a.sources[Math.min(o,a.sources.length-1)],u=l2[s],f=u?.text.split(`
`).slice(c-1,l)??[];return S.default.createElement("dialog",{ref:t,className:"source-dialog","aria-labelledby":"reading-title",onCancel:d=>{d.preventDefault(),i()},onClick:d=>{d.target===d.currentTarget&&i()}},S.default.createElement("div",{className:"dialog-header"},S.default.createElement("span",{className:"mono"},"BOARD READING / ",a.n),S.default.createElement("button",{autoFocus:!0,onClick:i,"aria-label":"Close evidence and return"},"Return to board \u2197")),S.default.createElement("h2",{id:"reading-title"},a.title),S.default.createElement("p",{className:"mechanism"},a.detail),S.default.createElement("p",{className:"rationale"},a.reason),S.default.createElement("div",{className:"source-controls"},S.default.createElement("label",null,"Source receipt ",S.default.createElement("select",{"aria-label":"Source receipt",value:o,onChange:d=>r(Number(d.target.value))},a.sources.map(([d,p,m],g)=>S.default.createElement("option",{key:g,value:g},d.replace("head:packages/daemon/src/","head: ")," \xB7 ",p,"\u2013",m))))),u&&S.default.createElement(S.default.Fragment,null,S.default.createElement("div",{className:"source-caption"},S.default.createElement("span",null,u.version," \xB7 ",u.path," \xB7 L",c,"\u2013",Math.min(l,c+f.length-1)),u.version!=="bundle"&&S.default.createElement("a",{href:`https://github.com/mohasarc/symnav/blob/${u.revision}/${u.path}#L${c}`,target:"_blank",rel:"noreferrer"},"Pinned source \u2197")),S.default.createElement("pre",{className:"source-code",tabIndex:"0","aria-label":"Frozen source excerpt"},f.map((d,p)=>S.default.createElement("span",{className:"code-line",key:p},S.default.createElement("span",{className:"line-number"},c+p),S.default.createElement("code",null,d||" ")))),S.default.createElement("p",{className:"hash"},"SHA-256 ",u.sha256)),S.default.createElement("div",{className:"dialog-nav"},S.default.createElement("button",{onClick:()=>{let d=Fi.indexOf(a);window.dispatchEvent(new CustomEvent("open-reading",{detail:Fi[(d+7)%8].id}))}},"\u2190 Previous reading"),S.default.createElement("button",{onClick:()=>{let d=Fi.indexOf(a);window.dispatchEvent(new CustomEvent("open-reading",{detail:Fi[(d+1)%8].id}))}},"Next reading \u2192")))}function n6(){let[e,n]=(0,S.useState)({...wl,ending:"both"}),[t,o]=(0,S.useState)("both"),[r,i]=(0,S.useState)(()=>Qg({...wl,ending:"both"}).steps.length-1),[a,s]=(0,S.useState)(!1),[c,l]=(0,S.useState)(null),u=(0,S.useMemo)(()=>Qg(e),[e]),f=u.steps[Math.min(r,u.steps.length-1)],d=S.default.useCallback(x=>{s(!1),l(x)},[]),p=(x,h)=>{n(v=>({...v,[x]:h})),o("custom"),i(0),s(!1)},m=x=>{o(x),n({...wl,...If.find(h=>h.id===x).patch}),i(0),s(!1)};(0,S.useEffect)(()=>{if(!a)return;if(r===u.steps.length-1){s(!1);return}let x=Lr.delayedCall(zf()?.45:1.2,()=>i(h=>h+1));return()=>x.kill()},[a,r,u]),(0,S.useEffect)(()=>{let x=h=>d(h.detail);return window.addEventListener("open-reading",x),()=>window.removeEventListener("open-reading",x)},[d]),(0,S.useEffect)(()=>{window.__circuit={config:e,index:r,playing:a,step:f,result:u,probes:u2}},[e,r,a,u]);let g=()=>{s(!1),i(x=>Math.min(x+1,u.steps.length-1))};return S.default.createElement(S.default.Fragment,null,S.default.createElement("header",{className:"masthead"},S.default.createElement("a",{href:"#top",className:"wordmark"},S.default.createElement("span",{className:"mark"},"\u2301")," FIELD CIRCUITS"),S.default.createElement("span",null,"SYMNAV / DAEMON REFACTOR"),S.default.createElement("span",{className:"issue"},"BOARD ",S.default.createElement("b",null,"072"))),S.default.createElement("main",{id:"top"},S.default.createElement("section",{className:"hero"},S.default.createElement("div",null,S.default.createElement("p",{className:"eyebrow"},"ADMISSION \xB7 TRANSPORT \xB7 RECOVERY"),S.default.createElement("h1",null,"Accepted is a",S.default.createElement("br",null),S.default.createElement("em",null,"one-way gate."))),S.default.createElement("div",{className:"hero-right"},S.default.createElement("p",{className:"lead"},"Local fallback needs proof.",S.default.createElement("br",null),"An accepted request can recover its delivery, but it cannot energize a local replay."),S.default.createElement("div",{className:"ownership-strip"},S.default.createElement("span",null,"main",S.default.createElement("br",null),S.default.createElement("b",null,"CLI mechanisms")),S.default.createElement("span",{className:"arrow"},"\u2192"),S.default.createElement("span",null,"#148",S.default.createElement("br",null),S.default.createElement("b",null,"package staged")),S.default.createElement("span",{className:"arrow"},"\u2192"),S.default.createElement("button",{onClick:()=>d("owner")},"#149 \xB7 head",S.default.createElement("br",null),S.default.createElement("b",null,"package active \u2197"))),S.default.createElement("p",{className:"scope-note"},"One workspace command, one acceptance boundary. This is a narrow slice of the 26-PR stack."))),S.default.createElement("section",{className:"instrument","aria-label":"Interactive circuit simulation"},S.default.createElement("div",{className:"instrument-heading"},S.default.createElement("div",null,S.default.createElement("span",{className:"board-number"},"72 / A"),S.default.createElement("strong",null,"Admission circuit board"),S.default.createElement("span",{className:"mode-label"},"SOURCE-DERIVED SIMULATION")),S.default.createElement("button",{onClick:()=>d("evidence")},"Evidence & limits \u2197")),S.default.createElement("div",{className:"transport-controls"},S.default.createElement("div",{className:"run-buttons"},S.default.createElement("button",{className:"primary",onClick:()=>{r===u.steps.length-1&&i(0),s(x=>!x)}},a?"Pause signal":r===u.steps.length-1?"Trace again":"Inject signal",S.default.createElement("span",null,a?"\u2161":"\u2197")),S.default.createElement("button",{onClick:g,disabled:r===u.steps.length-1},"Step \u2192"),S.default.createElement("button",{className:"reset",onClick:()=>{s(!1),i(0)},"aria-label":"Reset signal"},"\u21BA")),S.default.createElement("label",{className:"scrubber"},S.default.createElement("span",null,"SIGNAL STAGE ",S.default.createElement("b",null,String(r+1).padStart(2,"0")," / ",String(u.steps.length).padStart(2,"0"))),S.default.createElement("input",{type:"range","aria-label":"Signal stage",min:"0",max:u.steps.length-1,value:r,onChange:x=>{s(!1),i(Number(x.target.value))}})),S.default.createElement("button",{className:"finish",onClick:()=>{s(!1),i(u.steps.length-1)}},"Show outcome \u2198")),S.default.createElement("div",{className:"bench"},S.default.createElement("aside",{className:"switch-panel","aria-label":"Signal inputs"},S.default.createElement(ws,{label:"LOAD A SIGNAL",value:t,onChange:m},t==="custom"&&S.default.createElement("option",{value:"custom"},"Custom conditions"),If.map(x=>S.default.createElement("option",{key:x.id,value:x.id},x.name))),S.default.createElement("p",{className:"scenario-note"},If.find(x=>x.id===t)?.note??"Change a condition, then trace the signal. Downstream conditions apply only when reached."),S.default.createElement(ws,{label:"U1 / ROUTE SNAPSHOT \xB7 FIXTURE",value:e.route,onChange:x=>p("route",x)},S.default.createElement("option",{value:"warm"},"Warm \xB7 responsive daemon"),S.default.createElement("option",{value:"cold"},"Cold \xB7 absent record"),S.default.createElement("option",{value:"fallback"},"Fallback \xB7 incompatible")),S.default.createElement("div",{className:"switch-label"},"U2 / ADMISSION CONDITIONS"),S.default.createElement(Of,{label:"Token matches",value:e.auth,onChange:x=>p("auth",x)}),S.default.createElement(Of,{label:"Worker ready",value:e.ready,onChange:x=>p("ready",x)}),S.default.createElement(Of,{label:"Resource pause",value:e.pressure,onChange:x=>p("pressure",x)}),S.default.createElement(ws,{label:"Queue",value:e.queue,onChange:x=>p("queue",x)},S.default.createElement("option",{value:"accepting"},"Accepting"),S.default.createElement("option",{value:"draining"},"Draining"),S.default.createElement("option",{value:"closed"},"Closed")),S.default.createElement(ws,{label:"Duplicate identity",value:e.duplicate,onChange:x=>p("duplicate",x)},S.default.createElement("option",{value:"unseen"},"Unseen"),S.default.createElement("option",{value:"matching"},"Matching"),S.default.createElement("option",{value:"conflicting"},"Conflicting")),S.default.createElement("div",{className:"switch-label"},"FAULT INJECTION \xB7 ILLUSTRATIVE"),S.default.createElement(ws,{label:"J1 / Socket",value:e.wire,onChange:x=>p("wire",x)},S.default.createElement("option",{value:"intact"},"Connects and writes"),S.default.createElement("option",{value:"before"},"Never connects"),S.default.createElement("option",{value:"unconfirmed"},"Closes after write")),S.default.createElement(Of,{label:"Flip wire retrySafe",help:"Rejection frames only",value:e.tamper,onChange:x=>p("tamper",x)}),S.default.createElement(ws,{label:"After acceptance",value:e.ending,onChange:x=>p("ending",x)},S.default.createElement("option",{value:"complete"},"Complete result"),S.default.createElement("option",{value:"reattach"},"Close \u2192 reattach"),S.default.createElement("option",{value:"fetch"},"Manifest \u2192 fetch"),S.default.createElement("option",{value:"both"},"Reattach \u2192 fetch"),S.default.createElement("option",{value:"exhaust-fetch"},"Fetch ends too soon"),S.default.createElement("option",{value:"exhaust-reattach"},"Reattachment exhausted"),["worker-exit","controlled-resource","response-capacity","stopping","internal"].map(x=>S.default.createElement("option",{key:x,value:x},"Terminal \xB7 ",x)))),S.default.createElement("div",{className:"board-area"},S.default.createElement("div",{className:"silkscreen"},S.default.createElement("span",null,"@symnav/daemon \xB7 active owner at #149"),S.default.createElement("span",null,"C caller \xB7 D daemon process \xB7 H host")),S.default.createElement("div",{className:"circuit-canvas"},S.default.createElement(By,null,S.default.createElement(J4,{sim:u,index:r,inspect:d}))),S.default.createElement("div",{className:"board-foot"},S.default.createElement("span",null,"\u25CF one signal / signal-72"),S.default.createElement("span",null,"Distances & motion are not time. Traces group calls; gate shapes are mnemonic.")))),S.default.createElement("div",{className:"readout","aria-live":"polite"},S.default.createElement("div",null,S.default.createElement("span",{className:"eyebrow"},f.delivery),f.code&&S.default.createElement("span",{className:"code-readout"},f.code),S.default.createElement("h2",null,f.title),S.default.createElement("p",null,f.text)),S.default.createElement("div",{className:"meters"},S.default.createElement("span",{className:"meter-title"},"MODEL COUNTERS"),S.default.createElement("span",null,"local runs ",S.default.createElement("b",{"data-testid":"local-count"},f.localRuns)),S.default.createElement("span",null,"execute writes ",S.default.createElement("b",null,f.executeWrites)),S.default.createElement("span",null,"admission samples ",S.default.createElement("b",null,f.admissionSamples))))),S.default.createElement("div",{className:"legend","aria-label":"Visual variable legend"},S.default.createElement("div",null,S.default.createElement("span",{className:"legend-title"},"READ THE BOARD"),S.default.createElement("span",null,"\u25B1 route selector \xB7 \u2293 ordered guards \xB7 \u22651 retry authority \xB7 D/Q acceptance latch")),S.default.createElement("div",{className:"color-key"},[["admission","rejection"],["transport","transport failure"],["execution","terminal failure"],["recovery","delivery recovery"],["local","local permit"]].map(([x,h])=>S.default.createElement("span",{key:x},S.default.createElement("i",{style:{background:Af[x]}}),h))),S.default.createElement("div",{className:"legend-bottom"},S.default.createElement("span",null,"Single package = caller process \xB7 double = daemon process \xB7 H = host supplied"),S.default.createElement("span",null,"Lit = reached / selected outcome \xB7 dark = unreached \xB7 // = skipped guard"))),S.default.createElement("p",{className:"simulation-note"},S.default.createElement("b",null,"Simulation, not a live daemon.")," Admission and retry logic run frozen source. Routing snapshots, socket/host I/O and recovery motion are modeled. Recovery loops abbreviate another delivery attempt; they do not add a local execution. ",S.default.createElement("button",{onClick:()=>d("evidence")},"Inspect the 13 controlled probes \u2197")),S.default.createElement("section",{className:"readings","aria-labelledby":"readings-title"},S.default.createElement("div",{className:"readings-header"},S.default.createElement("div",null,S.default.createElement("p",{className:"eyebrow"},"THE COMPLETE STOPPING LAYER"),S.default.createElement("h2",{id:"readings-title"},"Eight things the circuit tells you.")),S.default.createElement("p",null,"The board, legend and all eight readings are the complete layer. Open a reading or component for mechanism and pinned evidence.")),S.default.createElement("div",{className:"reading-list"},Fi.map(x=>S.default.createElement("article",{key:x.id,id:`reading-${x.id}`},S.default.createElement("button",{className:"reading-open",onClick:()=>d(x.id)},S.default.createElement("span",{className:"reading-number"},x.n),S.default.createElement("span",null,S.default.createElement("b",null,x.title),S.default.createElement("span",{className:"reading-summary"},x.summary),S.default.createElement("span",{className:"reading-reason"},x.reason)),S.default.createElement("span",{className:"reading-arrow"},"\u2197"))))),S.default.createElement("p",{className:"end-layer"},"END OF COMPLETE LAYER ",S.default.createElement("span",null,"Deeper views add mechanism and evidence to these same eight readings.")))),S.default.createElement("footer",null,S.default.createElement("span",null,"072 \xB7 ADMISSION CIRCUIT BOARD"),S.default.createElement("span",null,"main b6801eb \u2192 stack head d070023"),S.default.createElement("a",{href:"evidence/probes.json"},"Probe receipts \u2197"),S.default.createElement("a",{href:"evidence/focused-tests.log"},"147 source tests \u2197"),S.default.createElement("a",{href:"README.md"},"Experiment notes \u2197")),S.default.createElement(e6,{reading:c,close:()=>l(null)}))}(0,m2.createRoot)(document.getElementById("root")).render(S.default.createElement(n6,null));})();
/*! For license information please see app.js.LEGAL.txt */
