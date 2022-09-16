// bellajs@11.0.6 https://github.com/ndaidong/bellajs - built with esbuild at 2022-09-16T07:32:30.129Z
var x=t=>({}).toString.call(t),F=t=>Number.isInteger(t),p=t=>Array.isArray(t),l=t=>String(t)===t,h=t=>Number(t)===t,q=t=>Boolean(t)===t,M=t=>x(t)==="[object Null]",A=t=>x(t)==="[object Undefined]",O=t=>A(t)||M(t),z=t=>x(t)==="[object Function]",a=t=>x(t)==="[object Object]"&&!p(t),y=t=>t instanceof Date&&!isNaN(t.valueOf()),B=t=>x(t).match(/^\[object HTML\w*Element]$/)!==null,H=t=>{let e=/^[a-z]+$/i;return l(t)&&e.test(t)},$=t=>{let e=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return l(t)&&e.test(t)},R=t=>!t||O(t)||l(t)&&t===""||p(t)&&t.length===0||a(t)&&Object.keys(t).length===0,g=(t,e)=>!t||!e?!1:Object.prototype.hasOwnProperty.call(t,e);var j=(t,e)=>{let r=Number.MAX_SAFE_INTEGER;if((!t||t<0)&&(t=0),e||(e=r),t===e)return e;t>e&&(t=Math.min(t,e),e=Math.max(t,e));let o=t,n=e-t+1;return Math.floor(Math.random()*n)+o};var f=t=>{let e=h(t)?String(t):t;if(!l(e))throw new Error("InvalidInput: String required.");return e},X=(t,e=140)=>{let r=f(t);if(r.length<=e)return r;let n=r.substring(0,e).trim(),s=n.split(" ");return s.length>1?(s.pop(),s.map(u=>u.trim()).join(" ")+"..."):n.substring(0,e-3)+"..."},J=t=>f(t).replace(/(<([^>]+)>)/ig,"").trim(),Q=t=>f(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),Y=t=>f(t).replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&"),N=t=>{let e=f(t).toLowerCase();return e.length>1?e.charAt(0).toUpperCase()+e.slice(1):e.toUpperCase()},Z=t=>f(t).split(" ").map(e=>N(e)).join(" "),b=(t,e,r)=>{let o=f(t),n=h(e)?String(e):e,s=h(r)?String(r):r;if(l(n)&&l(s))o=o.split(n).join(s);else if(p(n)&&l(s))n.forEach(c=>{o=b(o,c,s)});else if(p(n)&&p(s)&&n.length===s.length){let c=n.length;if(c>0)for(let u=0;u<c;u++){let i=n[u],S=s[u];o=b(o,i,S)}}return o},C=()=>{let t={a:"á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä|æ",c:"ç",d:"đ|ð",e:"é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë",i:"í|ì|ỉ|ĩ|ị|ï|î",n:"ñ",o:"ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö|ø",s:"ß",u:"ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û",y:"ý|ỳ|ỷ|ỹ|ỵ|ÿ"},e={...t};return Object.keys(t).forEach(r=>{let o=r.toUpperCase();e[o]=t[r].toUpperCase()}),e},E=t=>{let e=f(t),r=(n,s)=>{e=b(e,n,s)},o=C();for(let n in o)g(o,n)&&o[n].split("|").forEach(c=>r(c,n));return e},_=()=>{let t="abcdefghijklmnopqrstuvwxyz",e=t.toUpperCase(),r="0123456789";return t.concat(e).concat(r).split("")},v=(t=32,e="")=>{let r=_().sort(()=>Math.random()>.5).join(""),o=r.length,n=Math.max(t,e.length),s=e;for(;s.length<n;){let c=j(0,o);s+=r.charAt(c)||""}return s},tt=(t,e="-")=>E(t).trim().toLowerCase().replace(/\W+/g," ").replace(/\s+/g," ").replace(/\s/g,e);var L=()=>({dateStyle:"medium",timeStyle:"long"}),D=()=>({second:1e3,minute:60,hour:60,day:24,week:7,month:4,year:12}),T=t=>{try{return new Intl.Locale(t).language!==""}catch{return!1}},nt=(...t)=>{let e=t[0],r=T(t[1])?t[1]:"en",o=L(),n=t.length>=3?t[2]:t.length===1?o:a(t[1])?t[1]:o;return new Intl.DateTimeFormat(r,n).format(new Date(e))},ot=(t,e="en",r="just now")=>{let o=new Date(t),n=Date.now()-o,s=D();if(n<=s.second)return r;let c="second";for(let i in s){if(n<s[i])break;c=i,n/=s[i]}return n=Math.floor(n),new Intl.RelativeTimeFormat(e).format(-n,c)};var ct=t=>{let e=t.length,r=(o,n)=>o>0?(...s)=>r(o-s.length,[...n,...s]):t(...n);return r(e,[])};var it=(...t)=>t.reduce((e,r)=>o=>e(r(o)));var lt=(...t)=>t.reduce((e,r)=>o=>r(e(o)));var m=(t,e,r,o={})=>{let{writable:n=!1,configurable:s=!1,enumerable:c=!1}=o;Object.defineProperty(t,e,{value:r,writable:n,configurable:s,enumerable:c})};var d=t=>{let e=t,r=()=>e==null,o=()=>e,n=i=>d(e||i()),s=i=>d(i(e)===!0?e:null),c=i=>d(r()?null:i(e)),u=Object.create({});return m(u,"__value__",e,{enumerable:!0}),m(u,"__type__","Maybe",{enumerable:!0}),m(u,"isNil",r),m(u,"value",o),m(u,"map",c),m(u,"if",s),m(u,"else",n),u};var w=(t,e=null)=>{let r=e||new Set;if(r.has(t))return t;if(r.add(t),y(t))return new Date(t.valueOf());let o=s=>{let c=Object.create({});for(let u in s)g(s,u)&&(c[u]=w(s[u],r));return c},n=s=>[...s].map(c=>p(c)?n(c):a(c)?o(c):w(c,r));return p(t)?n(t):a(t)?o(t):t},I=(t,e,r=!1,o=[])=>{for(let n in t)if(!(o.length>0&&o.includes(n))&&(!r||r&&g(e,n))){let s=t[n],c=e[n];a(c)&&a(s)||p(c)&&p(s)?e[n]=I(s,e[n],r,o):e[n]=w(s)}return e},ht=(t=[])=>[...new Set(t)],P=(t,e)=>t>e?1:t<e?-1:0,U=(t=[],e=null)=>{let r=[...t],o=e||P;return r.sort(o),r},bt=(t=[],e=1,r="")=>!l(r)||!g(t[0],r)?t:U(t,(o,n)=>o[r]>n[r]?e:o[r]<n[r]?-1*e:0),k=(t=[])=>{let e=[...t],r=[],o=e.length;for(;o>0;){let n=Math.floor(Math.random()*o);r.push(e.splice(n,1)[0]),o--}return r},dt=(t=[],e=1)=>{let r=k(t),o=Math.max(1,e),n=Math.min(o,r.length-1);return r.splice(0,n)};export{w as clone,it as compose,I as copies,ct as curry,Q as escapeHTML,nt as formatDateString,ot as formatTimeAgo,v as genid,g as hasProperty,p as isArray,q as isBoolean,y as isDate,B as isElement,$ as isEmail,R as isEmpty,z as isFunction,F as isInteger,H as isLetter,O as isNil,M as isNull,h as isNumber,a as isObject,l as isString,A as isUndefined,d as maybe,dt as pick,lt as pipe,j as randint,b as replaceAll,k as shuffle,tt as slugify,U as sort,bt as sortBy,E as stripAccent,J as stripTags,X as truncate,N as ucfirst,Z as ucwords,Y as unescapeHTML,ht as unique};
