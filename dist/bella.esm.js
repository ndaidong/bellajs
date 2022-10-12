// bellajs@11.1.0 https://github.com/ndaidong/bellajs - built with esbuild at 2022-10-12T09:30:15.025Z
var h=t=>({}).toString.call(t),z=t=>Number.isInteger(t),a=t=>Array.isArray(t),p=t=>String(t)===t,b=t=>Number(t)===t,B=t=>Boolean(t)===t,T=t=>h(t)==="[object Null]",E=t=>h(t)==="[object Undefined]",N=t=>E(t)||T(t),G=t=>h(t)==="[object Function]",l=t=>h(t)==="[object Object]"&&!a(t),U=t=>t instanceof Date&&!isNaN(t.valueOf()),K=t=>h(t).match(/^\[object HTML\w*Element]$/)!==null,W=t=>{let e=/^[a-z]+$/i;return p(t)&&e.test(t)},J=t=>{let e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return p(t)&&e.test(t)},Q=t=>!t||N(t)||p(t)&&t===""||a(t)&&t.length===0||l(t)&&Object.keys(t).length===0,g=(t,e)=>!t||!e?!1:Object.prototype.hasOwnProperty.call(t,e);var f=t=>{let e=b(t)?String(t):t;if(!p(e))throw new Error("InvalidInput: String required.");return e},Z=(t,e=140)=>{let r=f(t);if(r.length<=e)return r;let n=r.substring(0,e).trim(),s=n.split(" ");return s.length>1?(s.pop(),s.map(i=>i.trim()).join(" ")+"..."):n.substring(0,e-3)+"..."},v=t=>f(t).replace(/(<([^>]+)>)/ig,"").trim(),tt=t=>f(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),et=t=>f(t).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),C=t=>{let e=f(t).toLowerCase();return e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e.toUpperCase()},rt=t=>f(t).split(" ").map(e=>C(e)).join(" "),w=(t,e,r)=>{let o=f(t),n=b(e)?String(e):e,s=b(r)?String(r):r;if(p(n)&&p(s))o=o.split(n).join(s);else if(a(n)&&p(s))n.forEach(c=>{o=w(o,c,s)});else if(a(n)&&a(s)&&n.length===s.length){let c=n.length;if(c>0)for(let i=0;i<c;i++){let u=n[i],O=s[i];o=w(o,u,O)}}return o},I=()=>{let t={a:"á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä|æ",c:"ç",d:"đ|ð",e:"é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë",i:"í|ì|ỉ|ĩ|ị|ï|î",n:"ñ",o:"ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö|ø",s:"ß",u:"ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û",y:"ý|ỳ|ỷ|ỹ|ỵ|ÿ"},e={...t};return Object.keys(t).forEach(r=>{let o=r.toUpperCase();e[o]=t[r].toUpperCase()}),e},L=t=>{let e=f(t),r=(n,s)=>{e=w(e,n,s)},o=I();for(let n in o)g(o,n)&&o[n].split("|").forEach(c=>r(c,n));return e},nt=(t,e="-")=>L(t).trim().toLowerCase().replace(/\W+/g," ").replace(/\s+/g," ").replace(/\s/g,e);var y=crypto;var S=window.TextEncoder,ct=window.TextDecoder;var x=y.webcrypto?y.webcrypto:y,at=(t=0,e=1e6)=>{let r=new Uint8Array(1);x.getRandomValues(r);let o="0."+r[0].toString();return Math.floor(o*(e-t+1))+t},d=t=>{let e="",r=x.getRandomValues(new Uint8Array(t));for(let o=0;o<r.length;o++){let n=r[o].toString(16),s=Math.random();e+=n.charAt(Math.floor(s*n.length))}return e},_=()=>`${d(8)}-${d(4)}-${d(4)}-${d(4)}-${d(12)}`,pt=()=>x.randomUUID?x.randomUUID():_(),$=(t=32,e="")=>{let r=e;for(let o=0;o<t;o++){let n=Math.random(),s=Math.floor(n*36),c=s.toString(36);r+=s>9&&n>.3&&n<.7?c.toUpperCase():c}return r.substring(0,t)},M=(t=32,e="")=>{let r=e,o=x.getRandomValues(new Uint16Array(t));for(let n=0;n<o.length;n++){let s=o[n].toString(36),c=Math.random(),i=s.charAt(Math.floor(c*s.length));r+=c>.3&&c<.7?i.toUpperCase():i}return r.substring(0,t)},lt=(t=32,e="")=>t<=128?M(t,e):`${M(99,e)}${$(t-99)}`;var D=async(t,e)=>{let r=new S().encode(t),o=await x.subtle.digest(e,r);return[...new Uint8Array(o)].map(s=>s.toString(16).padStart(2,"0")).join("")},gt=async(t="")=>await D(t,"SHA-256"),ht=async(t="")=>await D(t,"SHA-512");var P=()=>({dateStyle:"medium",timeStyle:"long"}),k=()=>({second:1e3,minute:60,hour:60,day:24,week:7,month:4,year:12}),F=t=>{try{return new Intl.Locale(t).language!==""}catch{return!1}},yt=(...t)=>{let e=t[0],r=F(t[1])?t[1]:"en",o=P(),n=t.length>=3?t[2]:t.length===1?o:l(t[1])?t[1]:o;return new Intl.DateTimeFormat(r,n).format(new Date(e))},wt=(t,e="en",r="just now")=>{let o=new Date(t),n=Date.now()-o,s=k();if(n<=s.second)return r;let c="second";for(let u in s){if(n<s[u])break;c=u,n/=s[u]}return n=Math.floor(n),new Intl.RelativeTimeFormat(e).format(-n,c)};var jt=t=>{let e=t.length,r=(o,n)=>o>0?(...s)=>r(o-s.length,[...n,...s]):t(...n);return r(e,[])};var Ut=(...t)=>t.reduce((e,r)=>o=>e(r(o)));var Dt=(...t)=>t.reduce((e,r)=>o=>r(e(o)));var m=(t,e,r,o={})=>{let{writable:n=!1,configurable:s=!1,enumerable:c=!1}=o;Object.defineProperty(t,e,{value:r,writable:n,configurable:s,enumerable:c})};var j=t=>{let e=t,r=()=>e==null,o=()=>e,n=u=>j(e||u()),s=u=>j(u(e)===!0?e:null),c=u=>j(r()?null:u(e)),i=Object.create({});return m(i,"__value__",e,{enumerable:!0}),m(i,"__type__","Maybe",{enumerable:!0}),m(i,"isNil",r),m(i,"value",o),m(i,"map",c),m(i,"if",s),m(i,"else",n),i};var A=(t,e=null)=>{let r=e||new Set;if(r.has(t))return t;if(r.add(t),U(t))return new Date(t.valueOf());let o=s=>{let c=Object.create({});for(let i in s)g(s,i)&&(c[i]=A(s[i],r));return c},n=s=>[...s].map(c=>a(c)?n(c):l(c)?o(c):A(c,r));return a(t)?n(t):l(t)?o(t):t},H=(t,e,r=!1,o=[])=>{for(let n in t)if(!(o.length>0&&o.includes(n))&&(!r||r&&g(e,n))){let s=t[n],c=e[n];l(c)&&l(s)||a(c)&&a(s)?e[n]=H(s,e[n],r,o):e[n]=A(s)}return e},It=(t=[])=>[...new Set(t)],q=(t,e)=>t>e?1:t<e?-1:0,R=(t=[],e=null)=>{let r=[...t],o=e||q;return r.sort(o),r},Lt=(t=[],e=1,r="")=>!p(r)||!g(t[0],r)?t:R(t,(o,n)=>o[r]>n[r]?e:o[r]<n[r]?-1*e:0),V=(t=[])=>{let e=[...t],r=[],o=e.length;for(;o>0;){let n=Math.floor(Math.random()*o);r.push(e.splice(n,1)[0]),o--}return r},_t=(t=[],e=1)=>{let r=V(t),o=Math.max(1,e),n=Math.min(o,r.length-1);return r.splice(0,n)};export{S as TextEncoder,A as clone,Ut as compose,H as copies,x as crypto,jt as curry,tt as escapeHTML,yt as formatDateString,wt as formatTimeAgo,lt as genid,g as hasProperty,a as isArray,B as isBoolean,U as isDate,K as isElement,J as isEmail,Q as isEmpty,G as isFunction,z as isInteger,W as isLetter,N as isNil,T as isNull,b as isNumber,l as isObject,p as isString,E as isUndefined,j as maybe,_t as pick,Dt as pipe,at as randint,w as replaceAll,gt as sha256,ht as sha512,V as shuffle,nt as slugify,R as sort,Lt as sortBy,L as stripAccent,v as stripTags,Z as truncate,C as ucfirst,rt as ucwords,et as unescapeHTML,It as unique,pt as uuid};
