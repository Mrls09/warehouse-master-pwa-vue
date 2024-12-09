import{A as at,u as ke,s as w}from"./index.da889d62.js";function je(e,t){return function(){return e.apply(t,arguments)}}const{toString:ct}=Object.prototype,{getPrototypeOf:he}=Object,Q=(e=>t=>{const r=ct.call(t);return e[r]||(e[r]=r.slice(8,-1).toLowerCase())})(Object.create(null)),N=e=>(e=e.toLowerCase(),t=>Q(t)===e),Z=e=>t=>typeof t===e,{isArray:j}=Array,H=Z("undefined");function ut(e){return e!==null&&!H(e)&&e.constructor!==null&&!H(e.constructor)&&x(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const qe=N("ArrayBuffer");function lt(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&qe(e.buffer),t}const ft=Z("string"),x=Z("function"),Ie=Z("number"),Y=e=>e!==null&&typeof e=="object",dt=e=>e===!0||e===!1,J=e=>{if(Q(e)!=="object")return!1;const t=he(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},pt=N("Date"),ht=N("File"),mt=N("Blob"),yt=N("FileList"),bt=e=>Y(e)&&x(e.pipe),wt=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||x(e.append)&&((t=Q(e))==="formdata"||t==="object"&&x(e.toString)&&e.toString()==="[object FormData]"))},Et=N("URLSearchParams"),[gt,Rt,St,Tt]=["ReadableStream","Request","Response","Headers"].map(N),Ot=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function $(e,t,{allOwnKeys:r=!1}={}){if(e===null||typeof e>"u")return;let n,s;if(typeof e!="object"&&(e=[e]),j(e))for(n=0,s=e.length;n<s;n++)t.call(null,e[n],n,e);else{const o=r?Object.getOwnPropertyNames(e):Object.keys(e),i=o.length;let c;for(n=0;n<i;n++)c=o[n],t.call(null,e[c],c,e)}}function He(e,t){t=t.toLowerCase();const r=Object.keys(e);let n=r.length,s;for(;n-- >0;)if(s=r[n],t===s.toLowerCase())return s;return null}const D=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),$e=e=>!H(e)&&e!==D;function ce(){const{caseless:e}=$e(this)&&this||{},t={},r=(n,s)=>{const o=e&&He(t,s)||s;J(t[o])&&J(n)?t[o]=ce(t[o],n):J(n)?t[o]=ce({},n):j(n)?t[o]=n.slice():t[o]=n};for(let n=0,s=arguments.length;n<s;n++)arguments[n]&&$(arguments[n],r);return t}const At=(e,t,r,{allOwnKeys:n}={})=>($(t,(s,o)=>{r&&x(s)?e[o]=je(s,r):e[o]=s},{allOwnKeys:n}),e),xt=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ct=(e,t,r,n)=>{e.prototype=Object.create(t.prototype,n),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),r&&Object.assign(e.prototype,r)},Pt=(e,t,r,n)=>{let s,o,i;const c={};if(t=t||{},e==null)return t;do{for(s=Object.getOwnPropertyNames(e),o=s.length;o-- >0;)i=s[o],(!n||n(i,e,t))&&!c[i]&&(t[i]=e[i],c[i]=!0);e=r!==!1&&he(e)}while(e&&(!r||r(e,t))&&e!==Object.prototype);return t},Nt=(e,t,r)=>{e=String(e),(r===void 0||r>e.length)&&(r=e.length),r-=t.length;const n=e.indexOf(t,r);return n!==-1&&n===r},_t=e=>{if(!e)return null;if(j(e))return e;let t=e.length;if(!Ie(t))return null;const r=new Array(t);for(;t-- >0;)r[t]=e[t];return r},Ut=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&he(Uint8Array)),Ft=(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let s;for(;(s=n.next())&&!s.done;){const o=s.value;t.call(e,o[0],o[1])}},Lt=(e,t)=>{let r;const n=[];for(;(r=e.exec(t))!==null;)n.push(r);return n},Bt=N("HTMLFormElement"),Dt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(r,n,s){return n.toUpperCase()+s}),Re=(({hasOwnProperty:e})=>(t,r)=>e.call(t,r))(Object.prototype),kt=N("RegExp"),Me=(e,t)=>{const r=Object.getOwnPropertyDescriptors(e),n={};$(r,(s,o)=>{let i;(i=t(s,o,e))!==!1&&(n[o]=i||s)}),Object.defineProperties(e,n)},jt=e=>{Me(e,(t,r)=>{if(x(e)&&["arguments","caller","callee"].indexOf(r)!==-1)return!1;const n=e[r];if(!!x(n)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+r+"'")})}})},qt=(e,t)=>{const r={},n=s=>{s.forEach(o=>{r[o]=!0})};return j(e)?n(e):n(String(e).split(t)),r},It=()=>{},Ht=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t,se="abcdefghijklmnopqrstuvwxyz",Se="0123456789",ze={DIGIT:Se,ALPHA:se,ALPHA_DIGIT:se+se.toUpperCase()+Se},$t=(e=16,t=ze.ALPHA_DIGIT)=>{let r="";const{length:n}=t;for(;e--;)r+=t[Math.random()*n|0];return r};function Mt(e){return!!(e&&x(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const zt=e=>{const t=new Array(10),r=(n,s)=>{if(Y(n)){if(t.indexOf(n)>=0)return;if(!("toJSON"in n)){t[s]=n;const o=j(n)?[]:{};return $(n,(i,c)=>{const f=r(i,s+1);!H(f)&&(o[c]=f)}),t[s]=void 0,o}}return n};return r(e,0)},Jt=N("AsyncFunction"),Vt=e=>e&&(Y(e)||x(e))&&x(e.then)&&x(e.catch),Je=((e,t)=>e?setImmediate:t?((r,n)=>(D.addEventListener("message",({source:s,data:o})=>{s===D&&o===r&&n.length&&n.shift()()},!1),s=>{n.push(s),D.postMessage(r,"*")}))(`axios@${Math.random()}`,[]):r=>setTimeout(r))(typeof setImmediate=="function",x(D.postMessage)),vt=typeof queueMicrotask<"u"?queueMicrotask.bind(D):typeof process<"u"&&process.nextTick||Je,a={isArray:j,isArrayBuffer:qe,isBuffer:ut,isFormData:wt,isArrayBufferView:lt,isString:ft,isNumber:Ie,isBoolean:dt,isObject:Y,isPlainObject:J,isReadableStream:gt,isRequest:Rt,isResponse:St,isHeaders:Tt,isUndefined:H,isDate:pt,isFile:ht,isBlob:mt,isRegExp:kt,isFunction:x,isStream:bt,isURLSearchParams:Et,isTypedArray:Ut,isFileList:yt,forEach:$,merge:ce,extend:At,trim:Ot,stripBOM:xt,inherits:Ct,toFlatObject:Pt,kindOf:Q,kindOfTest:N,endsWith:Nt,toArray:_t,forEachEntry:Ft,matchAll:Lt,isHTMLForm:Bt,hasOwnProperty:Re,hasOwnProp:Re,reduceDescriptors:Me,freezeMethods:jt,toObjectSet:qt,toCamelCase:Dt,noop:It,toFiniteNumber:Ht,findKey:He,global:D,isContextDefined:$e,ALPHABET:ze,generateString:$t,isSpecCompliantForm:Mt,toJSONObject:zt,isAsyncFn:Jt,isThenable:Vt,setImmediate:Je,asap:vt};function m(e,t,r,n,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),r&&(this.config=r),n&&(this.request=n),s&&(this.response=s,this.status=s.status?s.status:null)}a.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.status}}});const Ve=m.prototype,ve={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{ve[e]={value:e}});Object.defineProperties(m,ve);Object.defineProperty(Ve,"isAxiosError",{value:!0});m.from=(e,t,r,n,s,o)=>{const i=Object.create(Ve);return a.toFlatObject(e,i,function(f){return f!==Error.prototype},c=>c!=="isAxiosError"),m.call(i,e.message,t,r,n,s),i.cause=e,i.name=e.name,o&&Object.assign(i,o),i};const Wt=null;function ue(e){return a.isPlainObject(e)||a.isArray(e)}function We(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function Te(e,t,r){return e?e.concat(t).map(function(s,o){return s=We(s),!r&&o?"["+s+"]":s}).join(r?".":""):t}function Kt(e){return a.isArray(e)&&!e.some(ue)}const Xt=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function ee(e,t,r){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,r=a.toFlatObject(r,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,h){return!a.isUndefined(h[y])});const n=r.metaTokens,s=r.visitor||l,o=r.dots,i=r.indexes,f=(r.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(s))throw new TypeError("visitor must be a function");function u(p){if(p===null)return"";if(a.isDate(p))return p.toISOString();if(!f&&a.isBlob(p))throw new m("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(p)||a.isTypedArray(p)?f&&typeof Blob=="function"?new Blob([p]):Buffer.from(p):p}function l(p,y,h){let E=p;if(p&&!h&&typeof p=="object"){if(a.endsWith(y,"{}"))y=n?y:y.slice(0,-2),p=JSON.stringify(p);else if(a.isArray(p)&&Kt(p)||(a.isFileList(p)||a.endsWith(y,"[]"))&&(E=a.toArray(p)))return y=We(y),E.forEach(function(T,F){!(a.isUndefined(T)||T===null)&&t.append(i===!0?Te([y],F,o):i===null?y:y+"[]",u(T))}),!1}return ue(p)?!0:(t.append(Te(h,y,o),u(p)),!1)}const d=[],b=Object.assign(Xt,{defaultVisitor:l,convertValue:u,isVisitable:ue});function R(p,y){if(!a.isUndefined(p)){if(d.indexOf(p)!==-1)throw Error("Circular reference detected in "+y.join("."));d.push(p),a.forEach(p,function(E,S){(!(a.isUndefined(E)||E===null)&&s.call(t,E,a.isString(S)?S.trim():S,y,b))===!0&&R(E,y?y.concat(S):[S])}),d.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return R(e),t}function Oe(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(n){return t[n]})}function me(e,t){this._pairs=[],e&&ee(e,this,t)}const Ke=me.prototype;Ke.append=function(t,r){this._pairs.push([t,r])};Ke.toString=function(t){const r=t?function(n){return t.call(this,n,Oe)}:Oe;return this._pairs.map(function(s){return r(s[0])+"="+r(s[1])},"").join("&")};function Gt(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Xe(e,t,r){if(!t)return e;const n=r&&r.encode||Gt;a.isFunction(r)&&(r={serialize:r});const s=r&&r.serialize;let o;if(s?o=s(t,r):o=a.isURLSearchParams(t)?t.toString():new me(t,r).toString(n),o){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class Qt{constructor(){this.handlers=[]}use(t,r,n){return this.handlers.push({fulfilled:t,rejected:r,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(n){n!==null&&t(n)})}}const Ae=Qt,Ge={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Zt=typeof URLSearchParams<"u"?URLSearchParams:me,Yt=typeof FormData<"u"?FormData:null,er=typeof Blob<"u"?Blob:null,tr={isBrowser:!0,classes:{URLSearchParams:Zt,FormData:Yt,Blob:er},protocols:["http","https","file","blob","url","data"]},ye=typeof window<"u"&&typeof document<"u",le=typeof navigator=="object"&&navigator||void 0,rr=ye&&(!le||["ReactNative","NativeScript","NS"].indexOf(le.product)<0),nr=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),sr=ye&&window.location.href||"http://localhost",or=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:ye,hasStandardBrowserWebWorkerEnv:nr,hasStandardBrowserEnv:rr,navigator:le,origin:sr},Symbol.toStringTag,{value:"Module"})),O={...or,...tr};function ir(e,t){return ee(e,new O.classes.URLSearchParams,Object.assign({visitor:function(r,n,s,o){return O.isNode&&a.isBuffer(r)?(this.append(n,r.toString("base64")),!1):o.defaultVisitor.apply(this,arguments)}},t))}function ar(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function cr(e){const t={},r=Object.keys(e);let n;const s=r.length;let o;for(n=0;n<s;n++)o=r[n],t[o]=e[o];return t}function Qe(e){function t(r,n,s,o){let i=r[o++];if(i==="__proto__")return!0;const c=Number.isFinite(+i),f=o>=r.length;return i=!i&&a.isArray(s)?s.length:i,f?(a.hasOwnProp(s,i)?s[i]=[s[i],n]:s[i]=n,!c):((!s[i]||!a.isObject(s[i]))&&(s[i]=[]),t(r,n,s[i],o)&&a.isArray(s[i])&&(s[i]=cr(s[i])),!c)}if(a.isFormData(e)&&a.isFunction(e.entries)){const r={};return a.forEachEntry(e,(n,s)=>{t(ar(n),s,r,0)}),r}return null}function ur(e,t,r){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(n){if(n.name!=="SyntaxError")throw n}return(r||JSON.stringify)(e)}const be={transitional:Ge,adapter:["xhr","http","fetch"],transformRequest:[function(t,r){const n=r.getContentType()||"",s=n.indexOf("application/json")>-1,o=a.isObject(t);if(o&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return s?JSON.stringify(Qe(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t)||a.isReadableStream(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return r.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return ir(t,this.formSerializer).toString();if((c=a.isFileList(t))||n.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return ee(c?{"files[]":t}:t,f&&new f,this.formSerializer)}}return o||s?(r.setContentType("application/json",!1),ur(t)):t}],transformResponse:[function(t){const r=this.transitional||be.transitional,n=r&&r.forcedJSONParsing,s=this.responseType==="json";if(a.isResponse(t)||a.isReadableStream(t))return t;if(t&&a.isString(t)&&(n&&!this.responseType||s)){const i=!(r&&r.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(c){if(i)throw c.name==="SyntaxError"?m.from(c,m.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};a.forEach(["delete","get","head","post","put","patch"],e=>{be.headers[e]={}});const we=be,lr=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),fr=e=>{const t={};let r,n,s;return e&&e.split(`
`).forEach(function(i){s=i.indexOf(":"),r=i.substring(0,s).trim().toLowerCase(),n=i.substring(s+1).trim(),!(!r||t[r]&&lr[r])&&(r==="set-cookie"?t[r]?t[r].push(n):t[r]=[n]:t[r]=t[r]?t[r]+", "+n:n)}),t},xe=Symbol("internals");function I(e){return e&&String(e).trim().toLowerCase()}function V(e){return e===!1||e==null?e:a.isArray(e)?e.map(V):String(e)}function dr(e){const t=Object.create(null),r=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let n;for(;n=r.exec(e);)t[n[1]]=n[2];return t}const pr=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function oe(e,t,r,n,s){if(a.isFunction(n))return n.call(this,t,r);if(s&&(t=r),!!a.isString(t)){if(a.isString(n))return t.indexOf(n)!==-1;if(a.isRegExp(n))return n.test(t)}}function hr(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,r,n)=>r.toUpperCase()+n)}function mr(e,t){const r=a.toCamelCase(" "+t);["get","set","has"].forEach(n=>{Object.defineProperty(e,n+r,{value:function(s,o,i){return this[n].call(this,t,s,o,i)},configurable:!0})})}class te{constructor(t){t&&this.set(t)}set(t,r,n){const s=this;function o(c,f,u){const l=I(f);if(!l)throw new Error("header name must be a non-empty string");const d=a.findKey(s,l);(!d||s[d]===void 0||u===!0||u===void 0&&s[d]!==!1)&&(s[d||f]=V(c))}const i=(c,f)=>a.forEach(c,(u,l)=>o(u,l,f));if(a.isPlainObject(t)||t instanceof this.constructor)i(t,r);else if(a.isString(t)&&(t=t.trim())&&!pr(t))i(fr(t),r);else if(a.isHeaders(t))for(const[c,f]of t.entries())o(f,c,n);else t!=null&&o(r,t,n);return this}get(t,r){if(t=I(t),t){const n=a.findKey(this,t);if(n){const s=this[n];if(!r)return s;if(r===!0)return dr(s);if(a.isFunction(r))return r.call(this,s,n);if(a.isRegExp(r))return r.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,r){if(t=I(t),t){const n=a.findKey(this,t);return!!(n&&this[n]!==void 0&&(!r||oe(this,this[n],n,r)))}return!1}delete(t,r){const n=this;let s=!1;function o(i){if(i=I(i),i){const c=a.findKey(n,i);c&&(!r||oe(n,n[c],c,r))&&(delete n[c],s=!0)}}return a.isArray(t)?t.forEach(o):o(t),s}clear(t){const r=Object.keys(this);let n=r.length,s=!1;for(;n--;){const o=r[n];(!t||oe(this,this[o],o,t,!0))&&(delete this[o],s=!0)}return s}normalize(t){const r=this,n={};return a.forEach(this,(s,o)=>{const i=a.findKey(n,o);if(i){r[i]=V(s),delete r[o];return}const c=t?hr(o):String(o).trim();c!==o&&delete r[o],r[c]=V(s),n[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const r=Object.create(null);return a.forEach(this,(n,s)=>{n!=null&&n!==!1&&(r[s]=t&&a.isArray(n)?n.join(", "):n)}),r}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,r])=>t+": "+r).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...r){const n=new this(t);return r.forEach(s=>n.set(s)),n}static accessor(t){const n=(this[xe]=this[xe]={accessors:{}}).accessors,s=this.prototype;function o(i){const c=I(i);n[c]||(mr(s,i),n[c]=!0)}return a.isArray(t)?t.forEach(o):o(t),this}}te.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.reduceDescriptors(te.prototype,({value:e},t)=>{let r=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(n){this[r]=n}}});a.freezeMethods(te);const C=te;function ie(e,t){const r=this||we,n=t||r,s=C.from(n.headers);let o=n.data;return a.forEach(e,function(c){o=c.call(r,o,s.normalize(),t?t.status:void 0)}),s.normalize(),o}function Ze(e){return!!(e&&e.__CANCEL__)}function q(e,t,r){m.call(this,e??"canceled",m.ERR_CANCELED,t,r),this.name="CanceledError"}a.inherits(q,m,{__CANCEL__:!0});function Ye(e,t,r){const n=r.config.validateStatus;!r.status||!n||n(r.status)?e(r):t(new m("Request failed with status code "+r.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(r.status/100)-4],r.config,r.request,r))}function yr(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function br(e,t){e=e||10;const r=new Array(e),n=new Array(e);let s=0,o=0,i;return t=t!==void 0?t:1e3,function(f){const u=Date.now(),l=n[o];i||(i=u),r[s]=f,n[s]=u;let d=o,b=0;for(;d!==s;)b+=r[d++],d=d%e;if(s=(s+1)%e,s===o&&(o=(o+1)%e),u-i<t)return;const R=l&&u-l;return R?Math.round(b*1e3/R):void 0}}function wr(e,t){let r=0,n=1e3/t,s,o;const i=(u,l=Date.now())=>{r=l,s=null,o&&(clearTimeout(o),o=null),e.apply(null,u)};return[(...u)=>{const l=Date.now(),d=l-r;d>=n?i(u,l):(s=u,o||(o=setTimeout(()=>{o=null,i(s)},n-d)))},()=>s&&i(s)]}const K=(e,t,r=3)=>{let n=0;const s=br(50,250);return wr(o=>{const i=o.loaded,c=o.lengthComputable?o.total:void 0,f=i-n,u=s(f),l=i<=c;n=i;const d={loaded:i,total:c,progress:c?i/c:void 0,bytes:f,rate:u||void 0,estimated:u&&c&&l?(c-i)/u:void 0,event:o,lengthComputable:c!=null,[t?"download":"upload"]:!0};e(d)},r)},Ce=(e,t)=>{const r=e!=null;return[n=>t[0]({lengthComputable:r,total:e,loaded:n}),t[1]]},Pe=e=>(...t)=>a.asap(()=>e(...t)),Er=O.hasStandardBrowserEnv?((e,t)=>r=>(r=new URL(r,O.origin),e.protocol===r.protocol&&e.host===r.host&&(t||e.port===r.port)))(new URL(O.origin),O.navigator&&/(msie|trident)/i.test(O.navigator.userAgent)):()=>!0,gr=O.hasStandardBrowserEnv?{write(e,t,r,n,s,o){const i=[e+"="+encodeURIComponent(t)];a.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),a.isString(n)&&i.push("path="+n),a.isString(s)&&i.push("domain="+s),o===!0&&i.push("secure"),document.cookie=i.join("; ")},read(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(e){this.write(e,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Rr(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function Sr(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function et(e,t){return e&&!Rr(t)?Sr(e,t):t}const Ne=e=>e instanceof C?{...e}:e;function k(e,t){t=t||{};const r={};function n(u,l,d,b){return a.isPlainObject(u)&&a.isPlainObject(l)?a.merge.call({caseless:b},u,l):a.isPlainObject(l)?a.merge({},l):a.isArray(l)?l.slice():l}function s(u,l,d,b){if(a.isUndefined(l)){if(!a.isUndefined(u))return n(void 0,u,d,b)}else return n(u,l,d,b)}function o(u,l){if(!a.isUndefined(l))return n(void 0,l)}function i(u,l){if(a.isUndefined(l)){if(!a.isUndefined(u))return n(void 0,u)}else return n(void 0,l)}function c(u,l,d){if(d in t)return n(u,l);if(d in e)return n(void 0,u)}const f={url:o,method:o,data:o,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c,headers:(u,l,d)=>s(Ne(u),Ne(l),d,!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(l){const d=f[l]||s,b=d(e[l],t[l],l);a.isUndefined(b)&&d!==c||(r[l]=b)}),r}const tt=e=>{const t=k({},e);let{data:r,withXSRFToken:n,xsrfHeaderName:s,xsrfCookieName:o,headers:i,auth:c}=t;t.headers=i=C.from(i),t.url=Xe(et(t.baseURL,t.url),e.params,e.paramsSerializer),c&&i.set("Authorization","Basic "+btoa((c.username||"")+":"+(c.password?unescape(encodeURIComponent(c.password)):"")));let f;if(a.isFormData(r)){if(O.hasStandardBrowserEnv||O.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if((f=i.getContentType())!==!1){const[u,...l]=f?f.split(";").map(d=>d.trim()).filter(Boolean):[];i.setContentType([u||"multipart/form-data",...l].join("; "))}}if(O.hasStandardBrowserEnv&&(n&&a.isFunction(n)&&(n=n(t)),n||n!==!1&&Er(t.url))){const u=s&&o&&gr.read(o);u&&i.set(s,u)}return t},Tr=typeof XMLHttpRequest<"u",Or=Tr&&function(e){return new Promise(function(r,n){const s=tt(e);let o=s.data;const i=C.from(s.headers).normalize();let{responseType:c,onUploadProgress:f,onDownloadProgress:u}=s,l,d,b,R,p;function y(){R&&R(),p&&p(),s.cancelToken&&s.cancelToken.unsubscribe(l),s.signal&&s.signal.removeEventListener("abort",l)}let h=new XMLHttpRequest;h.open(s.method.toUpperCase(),s.url,!0),h.timeout=s.timeout;function E(){if(!h)return;const T=C.from("getAllResponseHeaders"in h&&h.getAllResponseHeaders()),A={data:!c||c==="text"||c==="json"?h.responseText:h.response,status:h.status,statusText:h.statusText,headers:T,config:e,request:h};Ye(function(B){r(B),y()},function(B){n(B),y()},A),h=null}"onloadend"in h?h.onloadend=E:h.onreadystatechange=function(){!h||h.readyState!==4||h.status===0&&!(h.responseURL&&h.responseURL.indexOf("file:")===0)||setTimeout(E)},h.onabort=function(){!h||(n(new m("Request aborted",m.ECONNABORTED,e,h)),h=null)},h.onerror=function(){n(new m("Network Error",m.ERR_NETWORK,e,h)),h=null},h.ontimeout=function(){let F=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const A=s.transitional||Ge;s.timeoutErrorMessage&&(F=s.timeoutErrorMessage),n(new m(F,A.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,h)),h=null},o===void 0&&i.setContentType(null),"setRequestHeader"in h&&a.forEach(i.toJSON(),function(F,A){h.setRequestHeader(A,F)}),a.isUndefined(s.withCredentials)||(h.withCredentials=!!s.withCredentials),c&&c!=="json"&&(h.responseType=s.responseType),u&&([b,p]=K(u,!0),h.addEventListener("progress",b)),f&&h.upload&&([d,R]=K(f),h.upload.addEventListener("progress",d),h.upload.addEventListener("loadend",R)),(s.cancelToken||s.signal)&&(l=T=>{!h||(n(!T||T.type?new q(null,e,h):T),h.abort(),h=null)},s.cancelToken&&s.cancelToken.subscribe(l),s.signal&&(s.signal.aborted?l():s.signal.addEventListener("abort",l)));const S=yr(s.url);if(S&&O.protocols.indexOf(S)===-1){n(new m("Unsupported protocol "+S+":",m.ERR_BAD_REQUEST,e));return}h.send(o||null)})},Ar=(e,t)=>{const{length:r}=e=e?e.filter(Boolean):[];if(t||r){let n=new AbortController,s;const o=function(u){if(!s){s=!0,c();const l=u instanceof Error?u:this.reason;n.abort(l instanceof m?l:new q(l instanceof Error?l.message:l))}};let i=t&&setTimeout(()=>{i=null,o(new m(`timeout ${t} of ms exceeded`,m.ETIMEDOUT))},t);const c=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(o):u.removeEventListener("abort",o)}),e=null)};e.forEach(u=>u.addEventListener("abort",o));const{signal:f}=n;return f.unsubscribe=()=>a.asap(c),f}},xr=Ar,Cr=function*(e,t){let r=e.byteLength;if(!t||r<t){yield e;return}let n=0,s;for(;n<r;)s=n+t,yield e.slice(n,s),n=s},Pr=async function*(e,t){for await(const r of Nr(e))yield*Cr(r,t)},Nr=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:r,value:n}=await t.read();if(r)break;yield n}}finally{await t.cancel()}},_e=(e,t,r,n)=>{const s=Pr(e,t);let o=0,i,c=f=>{i||(i=!0,n&&n(f))};return new ReadableStream({async pull(f){try{const{done:u,value:l}=await s.next();if(u){c(),f.close();return}let d=l.byteLength;if(r){let b=o+=d;r(b)}f.enqueue(new Uint8Array(l))}catch(u){throw c(u),u}},cancel(f){return c(f),s.return()}},{highWaterMark:2})},re=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",rt=re&&typeof ReadableStream=="function",_r=re&&(typeof TextEncoder=="function"?(e=>t=>e.encode(t))(new TextEncoder):async e=>new Uint8Array(await new Response(e).arrayBuffer())),nt=(e,...t)=>{try{return!!e(...t)}catch{return!1}},Ur=rt&&nt(()=>{let e=!1;const t=new Request(O.origin,{body:new ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type");return e&&!t}),Ue=64*1024,fe=rt&&nt(()=>a.isReadableStream(new Response("").body)),X={stream:fe&&(e=>e.body)};re&&(e=>{["text","arrayBuffer","blob","formData","stream"].forEach(t=>{!X[t]&&(X[t]=a.isFunction(e[t])?r=>r[t]():(r,n)=>{throw new m(`Response type '${t}' is not supported`,m.ERR_NOT_SUPPORT,n)})})})(new Response);const Fr=async e=>{if(e==null)return 0;if(a.isBlob(e))return e.size;if(a.isSpecCompliantForm(e))return(await new Request(O.origin,{method:"POST",body:e}).arrayBuffer()).byteLength;if(a.isArrayBufferView(e)||a.isArrayBuffer(e))return e.byteLength;if(a.isURLSearchParams(e)&&(e=e+""),a.isString(e))return(await _r(e)).byteLength},Lr=async(e,t)=>{const r=a.toFiniteNumber(e.getContentLength());return r??Fr(t)},Br=re&&(async e=>{let{url:t,method:r,data:n,signal:s,cancelToken:o,timeout:i,onDownloadProgress:c,onUploadProgress:f,responseType:u,headers:l,withCredentials:d="same-origin",fetchOptions:b}=tt(e);u=u?(u+"").toLowerCase():"text";let R=xr([s,o&&o.toAbortSignal()],i),p;const y=R&&R.unsubscribe&&(()=>{R.unsubscribe()});let h;try{if(f&&Ur&&r!=="get"&&r!=="head"&&(h=await Lr(l,n))!==0){let A=new Request(t,{method:"POST",body:n,duplex:"half"}),L;if(a.isFormData(n)&&(L=A.headers.get("content-type"))&&l.setContentType(L),A.body){const[B,M]=Ce(h,K(Pe(f)));n=_e(A.body,Ue,B,M)}}a.isString(d)||(d=d?"include":"omit");const E="credentials"in Request.prototype;p=new Request(t,{...b,signal:R,method:r.toUpperCase(),headers:l.normalize().toJSON(),body:n,duplex:"half",credentials:E?d:void 0});let S=await fetch(p);const T=fe&&(u==="stream"||u==="response");if(fe&&(c||T&&y)){const A={};["status","statusText","headers"].forEach(ge=>{A[ge]=S[ge]});const L=a.toFiniteNumber(S.headers.get("content-length")),[B,M]=c&&Ce(L,K(Pe(c),!0))||[];S=new Response(_e(S.body,Ue,B,()=>{M&&M(),y&&y()}),A)}u=u||"text";let F=await X[a.findKey(X,u)||"text"](S,e);return!T&&y&&y(),await new Promise((A,L)=>{Ye(A,L,{data:F,headers:C.from(S.headers),status:S.status,statusText:S.statusText,config:e,request:p})})}catch(E){throw y&&y(),E&&E.name==="TypeError"&&/fetch/i.test(E.message)?Object.assign(new m("Network Error",m.ERR_NETWORK,e,p),{cause:E.cause||E}):m.from(E,E&&E.code,e,p)}}),de={http:Wt,xhr:Or,fetch:Br};a.forEach(de,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Fe=e=>`- ${e}`,Dr=e=>a.isFunction(e)||e===null||e===!1,st={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let r,n;const s={};for(let o=0;o<t;o++){r=e[o];let i;if(n=r,!Dr(r)&&(n=de[(i=String(r)).toLowerCase()],n===void 0))throw new m(`Unknown adapter '${i}'`);if(n)break;s[i||"#"+o]=n}if(!n){const o=Object.entries(s).map(([c,f])=>`adapter ${c} `+(f===!1?"is not supported by the environment":"is not available in the build"));let i=t?o.length>1?`since :
`+o.map(Fe).join(`
`):" "+Fe(o[0]):"as no adapter specified";throw new m("There is no suitable adapter to dispatch the request "+i,"ERR_NOT_SUPPORT")}return n},adapters:de};function ae(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new q(null,e)}function Le(e){return ae(e),e.headers=C.from(e.headers),e.data=ie.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),st.getAdapter(e.adapter||we.adapter)(e).then(function(n){return ae(e),n.data=ie.call(e,e.transformResponse,n),n.headers=C.from(n.headers),n},function(n){return Ze(n)||(ae(e),n&&n.response&&(n.response.data=ie.call(e,e.transformResponse,n.response),n.response.headers=C.from(n.response.headers))),Promise.reject(n)})}const ot="1.7.9",ne={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ne[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}});const Be={};ne.transitional=function(t,r,n){function s(o,i){return"[Axios v"+ot+"] Transitional option '"+o+"'"+i+(n?". "+n:"")}return(o,i,c)=>{if(t===!1)throw new m(s(i," has been removed"+(r?" in "+r:"")),m.ERR_DEPRECATED);return r&&!Be[i]&&(Be[i]=!0,console.warn(s(i," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(o,i,c):!0}};ne.spelling=function(t){return(r,n)=>(console.warn(`${n} is likely a misspelling of ${t}`),!0)};function kr(e,t,r){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const n=Object.keys(e);let s=n.length;for(;s-- >0;){const o=n[s],i=t[o];if(i){const c=e[o],f=c===void 0||i(c,o,e);if(f!==!0)throw new m("option "+o+" must be "+f,m.ERR_BAD_OPTION_VALUE);continue}if(r!==!0)throw new m("Unknown option "+o,m.ERR_BAD_OPTION)}}const v={assertOptions:kr,validators:ne},U=v.validators;class G{constructor(t){this.defaults=t,this.interceptors={request:new Ae,response:new Ae}}async request(t,r){try{return await this._request(t,r)}catch(n){if(n instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const o=s.stack?s.stack.replace(/^.+\n/,""):"";try{n.stack?o&&!String(n.stack).endsWith(o.replace(/^.+\n.+\n/,""))&&(n.stack+=`
`+o):n.stack=o}catch{}}throw n}}_request(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=k(this.defaults,r);const{transitional:n,paramsSerializer:s,headers:o}=r;n!==void 0&&v.assertOptions(n,{silentJSONParsing:U.transitional(U.boolean),forcedJSONParsing:U.transitional(U.boolean),clarifyTimeoutError:U.transitional(U.boolean)},!1),s!=null&&(a.isFunction(s)?r.paramsSerializer={serialize:s}:v.assertOptions(s,{encode:U.function,serialize:U.function},!0)),v.assertOptions(r,{baseUrl:U.spelling("baseURL"),withXsrfToken:U.spelling("withXSRFToken")},!0),r.method=(r.method||this.defaults.method||"get").toLowerCase();let i=o&&a.merge(o.common,o[r.method]);o&&a.forEach(["delete","get","head","post","put","patch","common"],p=>{delete o[p]}),r.headers=C.concat(i,o);const c=[];let f=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(r)===!1||(f=f&&y.synchronous,c.unshift(y.fulfilled,y.rejected))});const u=[];this.interceptors.response.forEach(function(y){u.push(y.fulfilled,y.rejected)});let l,d=0,b;if(!f){const p=[Le.bind(this),void 0];for(p.unshift.apply(p,c),p.push.apply(p,u),b=p.length,l=Promise.resolve(r);d<b;)l=l.then(p[d++],p[d++]);return l}b=c.length;let R=r;for(d=0;d<b;){const p=c[d++],y=c[d++];try{R=p(R)}catch(h){y.call(this,h);break}}try{l=Le.call(this,R)}catch(p){return Promise.reject(p)}for(d=0,b=u.length;d<b;)l=l.then(u[d++],u[d++]);return l}getUri(t){t=k(this.defaults,t);const r=et(t.baseURL,t.url);return Xe(r,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){G.prototype[t]=function(r,n){return this.request(k(n||{},{method:t,url:r,data:(n||{}).data}))}});a.forEach(["post","put","patch"],function(t){function r(n){return function(o,i,c){return this.request(k(c||{},{method:t,headers:n?{"Content-Type":"multipart/form-data"}:{},url:o,data:i}))}}G.prototype[t]=r(),G.prototype[t+"Form"]=r(!0)});const W=G;class Ee{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let r;this.promise=new Promise(function(o){r=o});const n=this;this.promise.then(s=>{if(!n._listeners)return;let o=n._listeners.length;for(;o-- >0;)n._listeners[o](s);n._listeners=null}),this.promise.then=s=>{let o;const i=new Promise(c=>{n.subscribe(c),o=c}).then(s);return i.cancel=function(){n.unsubscribe(o)},i},t(function(o,i,c){n.reason||(n.reason=new q(o,i,c),r(n.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}toAbortSignal(){const t=new AbortController,r=n=>{t.abort(n)};return this.subscribe(r),t.signal.unsubscribe=()=>this.unsubscribe(r),t.signal}static source(){let t;return{token:new Ee(function(s){t=s}),cancel:t}}}const jr=Ee;function qr(e){return function(r){return e.apply(null,r)}}function Ir(e){return a.isObject(e)&&e.isAxiosError===!0}const pe={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(pe).forEach(([e,t])=>{pe[t]=e});const Hr=pe;function it(e){const t=new W(e),r=je(W.prototype.request,t);return a.extend(r,W.prototype,t,{allOwnKeys:!0}),a.extend(r,t,null,{allOwnKeys:!0}),r.create=function(s){return it(k(e,s))},r}const g=it(we);g.Axios=W;g.CanceledError=q;g.CancelToken=jr;g.isCancel=Ze;g.VERSION=ot;g.toFormData=ee;g.AxiosError=m;g.Cancel=g.CanceledError;g.all=function(t){return Promise.all(t)};g.spread=qr;g.isAxiosError=Ir;g.mergeConfig=k;g.AxiosHeaders=C;g.formToJSON=e=>Qe(a.isHTMLForm(e)?new FormData(e):e);g.getAdapter=st.getAdapter;g.HttpStatusCode=Hr;g.default=g;const $r=g,_={get:z("get"),post:z("post"),put:z("put"),delete:z("delete")};function z(e){return async(t,r)=>{const n=Mr();r&&(n["Content-Type"]="application/json");try{const s=await $r({method:e,url:`${at}${t}`,headers:n,data:r});return De(s)}catch(s){if(s.response)return De(s.response);throw s}}}function Mr(e){const{user:t}=ke();return t?.token?{Authorization:`Bearer ${t.token}`}:{}}function De(e){const t=e.data;if(e.status>400){const{user:r}=ke();[401].includes(e.status)&&r&&w("error","Recurso mal solicitado o no autorizado");const n=t?.message||e.statusText;return Promise.reject(n)}return t}let P="/users";const zr=async()=>{try{return(await _.get(`${P}/`)).data}catch{w("error","Error al obtener usuarios")}},Jr=async(e,t)=>{try{return(await _.get(`${P}/paginado/${e}/${t}`)).data}catch{w("error","Error al obtener elementos del paginado")}},Vr=async e=>{try{return(await _.get(`${P}/${e}`)).data}catch{w("error","Error al obtener usuario")}},vr=async e=>{try{return(await _.get(`${P}/get-user-uid/${e}`)).data}catch{w("error","Error al obtener usuario")}},Wr=async e=>{try{const t=await _.post(`${P}/`,e);return t.data?w("success","Usuario creado"):w("error","Error al crear usuario"),t.data}catch{w("error","Error al crear usuario")}},Kr=async e=>{try{const t=await _.post(`${P}/create`,e);return console.log("se envia hacia: ",`${P}/public/`,e),t.data?w("success","Se ha registrado correctamente"):w("error","Error al crear usuario"),t.data}catch{w("error","Error al crear usuario")}},Xr=async e=>{try{(await _.delete(`${P}/${e}`)).data?w("success","Usuario eliminado"):w("error","Error al eliminar usuario")}catch{w("error","Error al eliminar usuario")}},Gr=async e=>{try{const t=await _.delete(`${P}/status/${e}`);return t.data?w("success","Estado del usuario cambiado"):w("error","Error al cambiar estado del usuario"),t.data}catch{w("error","Error al cambiar estado del usuario")}},Qr=async e=>{try{const t=await _.put(`${P}/`,e);return t.data?w("success","Usuario actualizado"):w("error","Error al actualizar usuario"),t.data}catch{w("error","Error al actualizar usuario")}},Zr=async e=>{try{const t=await _.put(`${P}/cambio-contrasena/`,e);return t.data?w("success","Contrase\xF1a actualizada"):w("error","Error al actualizar contrase\xF1a"),t.data}catch{w("error","Error al actualizar contrase\xF1a")}},Yr=async()=>{try{return(await _.get("/movements/")).data}catch{w("error","Error al obtener tus compras")}},tn={getUsers:zr,getUser:Vr,getMyUser:vr,insert:Wr,insertPublic:Kr,deleteUser:Xr,changeStatus:Gr,update:Qr,getAllPaginado:Jr,cambiarContrasena:Zr,getMyMovements:Yr};export{tn as U};