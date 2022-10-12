// bellajs@11.0.8 https://github.com/ndaidong/bellajs - built with esbuild at 2022-10-12T08:55:43.223Z
var F=Object.create;var y=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var $=Object.getOwnPropertyNames;var q=Object.getPrototypeOf,z=Object.prototype.hasOwnProperty;var B=(t,e)=>{for(var r in e)y(t,r,{get:e[r],enumerable:!0})},O=(t,e,r,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of $(e))!z.call(t,n)&&n!==r&&y(t,n,{get:()=>e[n],enumerable:!(o=H(e,n))||o.enumerable});return t};var R=(t,e,r)=>(r=t!=null?F(q(t)):{},O(e||!t||!t.__esModule?y(r,"default",{value:t,enumerable:!0}):r,t)),V=t=>O(y({},"__esModule",{value:!0}),t);var At={};B(At,{TextEncoder:()=>S.TextEncoder,clone:()=>A,compose:()=>bt,copies:()=>_,crypto:()=>g,curry:()=>ht,escapeHTML:()=>tt,formatDateString:()=>xt,formatTimeAgo:()=>gt,genid:()=>ut,hasProperty:()=>x,isArray:()=>u,isBoolean:()=>K,isDate:()=>M,isElement:()=>J,isEmail:()=>X,isEmpty:()=>Y,isFunction:()=>W,isInteger:()=>G,isLetter:()=>Q,isNil:()=>D,isNull:()=>U,isNumber:()=>b,isObject:()=>l,isString:()=>a,isUndefined:()=>N,maybe:()=>j,pick:()=>jt,pipe:()=>yt,randint:()=>st,replaceAll:()=>d,sha256:()=>pt,sha512:()=>at,shuffle:()=>P,slugify:()=>ot,sort:()=>I,sortBy:()=>St,stripAccent:()=>C,stripTags:()=>v,truncate:()=>Z,ucfirst:()=>E,ucwords:()=>rt,unescapeHTML:()=>et,unique:()=>dt,uuid:()=>ct});module.exports=V(At);var h=t=>({}).toString.call(t),G=t=>Number.isInteger(t),u=t=>Array.isArray(t),a=t=>String(t)===t,b=t=>Number(t)===t,K=t=>Boolean(t)===t,U=t=>h(t)==="[object Null]",N=t=>h(t)==="[object Undefined]",D=t=>N(t)||U(t),W=t=>h(t)==="[object Function]",l=t=>h(t)==="[object Object]"&&!u(t),M=t=>t instanceof Date&&!isNaN(t.valueOf()),J=t=>h(t).match(/^\[object HTML\w*Element]$/)!==null,Q=t=>{let e=/^[a-z]+$/i;return a(t)&&e.test(t)},X=t=>{let e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return a(t)&&e.test(t)},Y=t=>!t||D(t)||a(t)&&t===""||u(t)&&t.length===0||l(t)&&Object.keys(t).length===0,x=(t,e)=>!t||!e?!1:Object.prototype.hasOwnProperty.call(t,e);var f=t=>{let e=b(t)?String(t):t;if(!a(e))throw new Error("InvalidInput: String required.");return e},Z=(t,e=140)=>{let r=f(t);if(r.length<=e)return r;let n=r.substring(0,e).trim(),s=n.split(" ");return s.length>1?(s.pop(),s.map(i=>i.trim()).join(" ")+"..."):n.substring(0,e-3)+"..."},v=t=>f(t).replace(/(<([^>]+)>)/ig,"").trim(),tt=t=>f(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),et=t=>f(t).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),E=t=>{let e=f(t).toLowerCase();return e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e.toUpperCase()},rt=t=>f(t).split(" ").map(e=>E(e)).join(" "),d=(t,e,r)=>{let o=f(t),n=b(e)?String(e):e,s=b(r)?String(r):r;if(a(n)&&a(s))o=o.split(n).join(s);else if(u(n)&&a(s))n.forEach(c=>{o=d(o,c,s)});else if(u(n)&&u(s)&&n.length===s.length){let c=n.length;if(c>0)for(let i=0;i<c;i++){let p=n[i],k=s[i];o=d(o,p,k)}}return o},nt=()=>{let t={a:"á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä|æ",c:"ç",d:"đ|ð",e:"é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë",i:"í|ì|ỉ|ĩ|ị|ï|î",n:"ñ",o:"ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö|ø",s:"ß",u:"ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û",y:"ý|ỳ|ỷ|ỹ|ỵ|ÿ"},e={...t};return Object.keys(t).forEach(r=>{let o=r.toUpperCase();e[o]=t[r].toUpperCase()}),e},C=t=>{let e=f(t),r=(n,s)=>{e=d(e,n,s)},o=nt();for(let n in o)x(o,n)&&o[n].split("|").forEach(c=>r(c,n));return e},ot=(t,e="-")=>C(t).trim().toLowerCase().replace(/\W+/g," ").replace(/\s+/g," ").replace(/\s/g,e);var w=R(require("crypto"),1),S=require("util"),g=w.default.webcrypto?w.default.webcrypto:w.default,st=(t=0,e=1e6)=>{let r=new Uint8Array(1);g.getRandomValues(r);let o="0."+r[0].toString();return Math.floor(o*(e-t+1))+t},ct=()=>g.randomUUID(),it=(t=32,e="")=>{let r=e;for(let o=0;o<t;o++){let n=Math.random(),s=Math.floor(n*36),c=s.toString(36);r+=s>9&&n>.3&&n<.7?c.toUpperCase():c}return r.substring(0,t)},L=(t=32,e="")=>{let r=e,o=g.getRandomValues(new Uint16Array(t));for(let n=0;n<o.length;n++){let s=o[n].toString(36),c=Math.random(),i=s.charAt(Math.floor(c*s.length));r+=c>.3&&c<.7?i.toUpperCase():i}return r.substring(0,t)},ut=(t=32,e="")=>t<=128?L(t,e):`${L(99,e)}${it(t-99)}`;var T=async(t,e)=>{let r=new S.TextEncoder().encode(t),o=await g.subtle.digest(e,r);return[...new Uint8Array(o)].map(s=>s.toString(16).padStart(2,"0")).join("")},pt=async(t="")=>await T(t,"SHA-256"),at=async(t="")=>await T(t,"SHA-512");var lt=()=>({dateStyle:"medium",timeStyle:"long"}),ft=()=>({second:1e3,minute:60,hour:60,day:24,week:7,month:4,year:12}),mt=t=>{try{return new Intl.Locale(t).language!==""}catch{return!1}},xt=(...t)=>{let e=t[0],r=mt(t[1])?t[1]:"en",o=lt(),n=t.length>=3?t[2]:t.length===1?o:l(t[1])?t[1]:o;return new Intl.DateTimeFormat(r,n).format(new Date(e))},gt=(t,e="en",r="just now")=>{let o=new Date(t),n=Date.now()-o,s=ft();if(n<=s.second)return r;let c="second";for(let p in s){if(n<s[p])break;c=p,n/=s[p]}return n=Math.floor(n),new Intl.RelativeTimeFormat(e).format(-n,c)};var ht=t=>{let e=t.length,r=(o,n)=>o>0?(...s)=>r(o-s.length,[...n,...s]):t(...n);return r(e,[])};var bt=(...t)=>t.reduce((e,r)=>o=>e(r(o)));var yt=(...t)=>t.reduce((e,r)=>o=>r(e(o)));var m=(t,e,r,o={})=>{let{writable:n=!1,configurable:s=!1,enumerable:c=!1}=o;Object.defineProperty(t,e,{value:r,writable:n,configurable:s,enumerable:c})};var j=t=>{let e=t,r=()=>e==null,o=()=>e,n=p=>j(e||p()),s=p=>j(p(e)===!0?e:null),c=p=>j(r()?null:p(e)),i=Object.create({});return m(i,"__value__",e,{enumerable:!0}),m(i,"__type__","Maybe",{enumerable:!0}),m(i,"isNil",r),m(i,"value",o),m(i,"map",c),m(i,"if",s),m(i,"else",n),i};var A=(t,e=null)=>{let r=e||new Set;if(r.has(t))return t;if(r.add(t),M(t))return new Date(t.valueOf());let o=s=>{let c=Object.create({});for(let i in s)x(s,i)&&(c[i]=A(s[i],r));return c},n=s=>[...s].map(c=>u(c)?n(c):l(c)?o(c):A(c,r));return u(t)?n(t):l(t)?o(t):t},_=(t,e,r=!1,o=[])=>{for(let n in t)if(!(o.length>0&&o.includes(n))&&(!r||r&&x(e,n))){let s=t[n],c=e[n];l(c)&&l(s)||u(c)&&u(s)?e[n]=_(s,e[n],r,o):e[n]=A(s)}return e},dt=(t=[])=>[...new Set(t)],wt=(t,e)=>t>e?1:t<e?-1:0,I=(t=[],e=null)=>{let r=[...t],o=e||wt;return r.sort(o),r},St=(t=[],e=1,r="")=>!a(r)||!x(t[0],r)?t:I(t,(o,n)=>o[r]>n[r]?e:o[r]<n[r]?-1*e:0),P=(t=[])=>{let e=[...t],r=[],o=e.length;for(;o>0;){let n=Math.floor(Math.random()*o);r.push(e.splice(n,1)[0]),o--}return r},jt=(t=[],e=1)=>{let r=P(t),o=Math.max(1,e),n=Math.min(o,r.length-1);return r.splice(0,n)};0&&(module.exports={TextEncoder,clone,compose,copies,crypto,curry,escapeHTML,formatDateString,formatTimeAgo,genid,hasProperty,isArray,isBoolean,isDate,isElement,isEmail,isEmpty,isFunction,isInteger,isLetter,isNil,isNull,isNumber,isObject,isString,isUndefined,maybe,pick,pipe,randint,replaceAll,sha256,sha512,shuffle,slugify,sort,sortBy,stripAccent,stripTags,truncate,ucfirst,ucwords,unescapeHTML,unique,uuid});
