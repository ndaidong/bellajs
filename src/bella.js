/**
 * BellaJS v3.6.4
 * Author by @ndaidong
 * GitHub : https://github.com/techpush/bella.js.git
 * Copyright by *.techpush.net
**/

;(function(context){

  var Bella = {
    ENV: 'browser'
  }

  if(typeof module!='undefined' && module.exports){
    Bella.ENV = 'node';
  }

  var tof = function(v){
    var ots = Object.prototype.toString;
    var s=typeof v;
    if(s=='object'){
      if(v){
      if((ots.call(v).indexOf('HTML')!==-1 && ots.call(v).indexOf('Element')!=-1)){
        return 'element';
      }
      if(v instanceof Array ||
         (
          !(v instanceof Object) &&
          (ots.call(v)=='[object Array]') ||
          typeof v.length=='number' &&
          typeof v.splice!='undefined' &&
          typeof v.propertyIsEnumerable!='undefined' &&
          !v.propertyIsEnumerable('splice')
        )
      ){
        return 'array';
      }
      if(!(v instanceof Object) &&
          (ots.call(v)=='[object Function]' ||
          typeof v.call!='undefined' &&
           typeof v.propertyIsEnumerable!='undefined' &&
            !v.propertyIsEnumerable('call')
          )
        ){
          return 'function';
        }
      }
      return 'null';
    }
    else if(s=='function' && typeof v.call=='undefined'){
      return 'object';
    }
    return s;
  }

  /*eslint-disable*/
  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
      throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
      if (hasOwnProperty.call(obj, prop)) {
        result.push(prop);
      }
      }

      if (hasDontEnumBug) {
      for (i = 0; i < dontEnumsLength; i++) {
        if (hasOwnProperty.call(obj, dontEnums[i])) {
        result.push(dontEnums[i]);
        }
      }
      }
      return result;
    };
    }());
  }
  /*eslint-enable*/

  var isDef = function(val){
    return tof(val)!=='undefined';
  }
  var isNull = function(val){
    return tof(val)===null || val===null;
  }

  var isString = function(val){
    return !isNull(val) && tof(val)==='string';
  }
  var isNumber = function(val){
    return !isNaN(val) && tof(Number(val))==='number';
  }
  var isBoolean = function(val){
    return val===true || val===false;
  }
  var isArray = function(val){
    return !isNull(val) && tof(val)==='array';
  }
  var isFunction = function(val){
    return !isNull(val) && tof(val)==='function';
  }
  var isElement = function(val){
    return !isNull(val) && tof(val)==='element';
  }
  var isObject = function(val){
    return !isNull(val) && typeof val==='object';
  }
  var isEmpty = function(val){
    return !isDef(val) || isNull(val) || (isString(val) && val==='') || (isArray(val) && val.length===0) || (isObject(val) && Object.keys(val).length===0);
  }
  var isLetter = function(val){
    var re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  }
  var isInteger = function(val){
    var re = /^[\d-]+$/i;
    var s = val+'';
    return isString(s) && re.test(s);
  }
  var isEmail = function(val){
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isString(val) && re.test(val);
  }
  var isGeneratedKey = function(val){
    var re = /^[A-Z0-9]+$/i;
    return isString(val) && re.test(val);
  }

  Bella.isDef = isDef;
  Bella.isNull = isNull;
  Bella.isEmpty = isEmpty;
  Bella.isBoolean = isBoolean;
  Bella.isArray = isArray;
  Bella.isString = isString;
  Bella.isNumber = isNumber;
  Bella.isFunction = isFunction;
  Bella.isElement = isElement;
  Bella.isObject = isObject;
  Bella.isLetter = isLetter;
  Bella.isInteger = isInteger;
  Bella.isEmail = isEmail;
  Bella.isGeneratedKey = isGeneratedKey;

  // device detection
  var detectDevice = function(userAgent){

    var re = {
      type: '',
      browser: '',
      engine: '',
      version: '',
      os: ''
    }

    var ua = userAgent || navigator.userAgent;
    var n = ua.toLowerCase();

    var detect = function(p){
      return p.test(n);
    }

    var isChrome = detect(/chrome/i);
    var isSafari = detect(/safari/i);
    var isFirefox = detect(/firefox/i);
    var isVivaldi = detect(/vivaldi/i);
    var isOpera = detect(/opera/i);
    var isOperaMini = detect(/opera mini/i);
    var isIE = detect(/msie/i);
    var isMidori = detect(/midori/i);
    var isMaxthon = detect(/maxthon/i);
    var isKonqueror = detect(/konqueror/i);
    var isMinefield = detect(/minefield/i);
    var isOmniWeb = detect(/omniweb/i);
    var isUCBrowser = detect(/ucbrowser/);

    var isWebkit = detect(/webkit/i);
    var isGecko = detect(/gecko/i);
    var isPresto = detect(/presto/i);
    var isTrident = detect(/trident/i);

    re.type = (function(){
      var t = 'Desktop';
      if(detect(/(ipad|android(?!.*mobile))/i) || detect(/\W(kindle|silk)\W/i)){
        t = 'Tablet';
      }
      else if(detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i)){
        t = 'Mobile';
      }
      return t;
    })();

    re.os = (function(){

      var o = 'Unknown';

      if(detect(/cros/i)){
        o = 'ChromeOS';
      }
      else if(detect(/android/i)){
        o = 'Android';
      }
      else if(detect(/(ipad|iphone|ipod)/i)){
        o = 'iOS';
      }
      else if(detect(/linux/i)){
        o = 'Linux';
      }
      else if(detect(/mac/i)){
        o = 'Mac';
      }
      else if(detect(/iemobile/i)){
        o = 'WindowsPhone';
      }
      else if(detect(/win/i)){
        o = 'Windows';
      }
      return o;
    })();

    re.browser = (function(){

      var b = 'Unknown';

      if(isWebkit && isChrome && !isMidori && !isVivaldi){
         b = 'Chrome';
      }
      else if(isMinefield){
        b = 'Minefield';
      }
      else if(isGecko && isFirefox){
        b = 'Firefox';
      }
      else if(isWebkit && isSafari && !isChrome && !isMidori && !isOmniWeb && !isUCBrowser && !isVivaldi && !isMaxthon){
        b = 'Safari';
      }
      else if(isOmniWeb){
        b = 'OmniWeb';
      }
      else if(isUCBrowser){
        b = 'UCBrowser';
      }
      else if(isKonqueror){
        b = 'Konqueror';
      }
      else if(isMaxthon){
        b = 'Maxthon';
      }
      else if(isVivaldi){
        b = 'Vivaldi';
      }
      else if(isMidori){
        b = 'Midori';
      }
      else if(isOperaMini){
        b = 'OperaMini';
      }
      else if(isOpera){
        b = 'Opera';
      }
      else if(detect(/iemobile/i)){
        b = 'IEMobile';
      }
      else if(isIE && !isOpera && !isVivaldi){
        b = 'MSIE';
      }
      return b;
    })();

    re.engine = (function(){
      var e = 'Unknown';

      if(isWebkit){
        e = 'Webkit';
      }
      else if(isGecko){
        e = 'Gecko';
      }
      else if(isTrident){
        e = 'Trident';
      }
      else if(isPresto){
        e = 'Presto';
      }

      return e;
    })();

    var getVersionByName = function(bname){

      var v = 'Unknown';
      var a = n.split(' ');

      var key = bname.toLowerCase();
      if(key=='safari'){
        key = 'version/';
      }
      else{
        key+='/';
      }

      for(var i=0; i<a.length; i++){
        var s = a[i];
        if(s.indexOf(key)!==-1){
          var x = s.split('/');
          if(x.length>1){
            v = x[1];
          }
          break;
        }
      }

      return v;
    }

    re.version = (function(){
      var v = getVersionByName(re.browser);
      return v;
    })();

    return re;
  }

  Bella.detectDevice = detectDevice;

  function createId(leng, prefix){
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    chars+=chars.toLowerCase();
    chars+='0123456789';
    var t = chars.length;
    var px = prefix || '';
    var ln = Math.max(leng || 32, px.length);

    var s = px;
    while(s.length<ln){
      var k = Math.floor(Math.random()*t);
      s+=chars.charAt(k) || '';
    }
    return s;
  }

  Bella.id = createId(32);
  Bella.createId = createId;


  // string
  Bella.encode = function(s){
    return isString(s)?encodeURIComponent(s):'';
  }
  Bella.decode = function(s){
    return isString(s)?decodeURIComponent(s.replace(/\+/g, ' ')):'';
  }
  Bella.trim = function(s){
    return ((s && isString(s))?s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ''):s) || '';
  }
  Bella.truncate = function(s, l){
    if(!s || !isString(s)){
      return '...';
    }
    s = Bella.trim(s);

    if(s==''){
      return s;
    }

    var t = l || 140;

    if(s.length<=t){
      return s;
    }

    var x = s.substring(0, t);
    var a = x.split(' '), b = a.length, r = '';
    if(b>1){
      a.pop();
      r+=a.join(' ');
      if(r.length<s.length){
        r+='...';
      }
    }
    else{
      x=x.substring(0, t-3);
      r+='...';
    }
    return r;
  }
  Bella.stripTags = function(s){
    return isString(s)?s.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, ''):'';
  }

  Bella.escapeHTML = function(s){
    return isString(s)?s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'):'';
  }
  Bella.unescapeHTML = function(s){
    return isString(s)?s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&'):'';
  }

  Bella.strtolower = function(s){
    return isString(s)?s.toLowerCase():'';
  }
  Bella.strtoupper = function(s){
    return isString(s)?s.toUpperCase():'';
  }
  Bella.ucfirst = function(s){
    if(!isString(s)){
      return '';
    }
    if(s.length===1){
      return s.toUpperCase();
    }
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase()+s.slice(1);
  }
  Bella.ucwords = function(s){
    if(isString(s)){
      var c = s.split(' '), a = [];
      c.forEach(function(w){
        a.push(Bella.ucfirst(w));
      });
      return a.join(' ');
    }
    return '';
  }
  Bella.leftPad = function(s, size, spad){
    if(isNumber(s)){
      s+='';
    }
    if(isString(s)){
      var g = spad || '0';
      var o = s+'';
      var z = size || 2;
      return o.length >= z ? o : (new Array(z - o.length + 1).join(g))+o;
    }
    return '';
  }
  Bella.rightPad = function(s, size, spad){
    if(isNumber(s)){
      s+='';
    }
    if(isString(s)){
      var g = spad || '0';
      var o = s+'';
      var z = size || 2;
      return o.length >= z ? o : o+(new Array(z - o.length + 1).join(g));
    }
    return '';
  }

  Bella.replaceAll = function(s, a, b){

    if(!isString(s)){
      return '';
    }
    if(isNumber(a)){
      a+='';
    }
    if(isNumber(b)){
      b+='';
    }
    if(isString(a) && isString(b)){
      var aa = s.split(a);
      s = aa.join(b);
    }
    else if(isArray(a) && isString(b)){
      a.forEach(function(v){
        s = Bella.replaceAll(s, v, b);
      });
    }
    else if(isArray(a) && isArray(b) && a.length===b.length){
      var k = a.length;
      if(k>0){
        for(var i=0; i<k; i++){
          var aaa = a[i], bb = b[i];
          s = Bella.replaceAll(s, aaa, bb);
        }
      }
    }
    return s;
  }

  Bella.stripAccent = function(s){
    if(!isString(s)){
      return '';
    }
    var map = {
      a: 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä',
      A: 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ä',
      c: 'ç',
      C: 'Ç',
      d: 'đ',
      D: 'Đ',
      e: 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë',
      E: 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ|Ë',
      i: 'í|ì|ỉ|ĩ|ị|ï|î',
      I: 'Í|Ì|Ỉ|Ĩ|Ị|Ï|Î',
      o: 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö',
      O: 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ô|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ|Ö',
      u: 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û',
      U: 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự|Û',
      y: 'ý|ỳ|ỷ|ỹ|ỵ',
      Y: 'Ý|Ỳ|Ỷ|Ỹ|Ỵ'
    }
    for(var key in map){
      var a = map[key].split('|');
      for(var i=0; i<a.length; i++){
        s = Bella.replaceAll(s, a[i], key);
      }
    }
    return s;
  }

  Bella.createAlias = function(s, delimiter){
    s = Bella.stripAccent(s);
    if(s){
      var d = delimiter || '-';
      s = Bella.strtolower(s);
      s = Bella.trim(s);
      s = s.replace(/\W+/g, ' ');
      s = s.replace(/\s+/g, ' ');
      s = s.replace(/\s/g, d);
    }
    return s;
  }

  Bella.compile = function(tpl, data){
    var ns = [];
    var compile = function(s, ctx, namespace){
      if(namespace){
        ns.push(namespace);
      }
      var a = [];
      for(var k in ctx){
        var v = ctx[k];
        if(isObject(v) || isArray(v)){
          a.push({key: k, data: v});
        }
        else if(isString(v)){
          v = Bella.replaceAll(v, ['{', '}'], ['&#123;', '&#125;']);
          var cns = ns.concat([k]);
          var r = new RegExp('{'+cns.join('.')+'}', 'gi');
          s = s.replace(r, v);
        }
      }
      if(a.length>0){
        a.forEach(function(item){
          s = compile(s, item.data, item.key);
        });
      }
      return s;
    }
    if(data && (isString(data) || isObject(data) || isArray(data))){
      return compile(tpl, data);
    }
    return tpl;
  }
  Bella.make = Bella.compile;

  /** https://github.com/jbt/js-crypto */
  /*eslint-disable*/
  Bella.md5 = function(){for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c){var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16){b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();
  Bella.sha256 = function(){function e(a,b){return a>>>b|a<<32-b}for(var b=1,a,n=[],m=[];18>++b;)for(a=b*b;312>a;a+=b)m[a]=1;b=1;for(a=0;313>b;)m[++b]||(m[a]=Math.pow(b,0.5)%1*4294967296|0,n[a++]=Math.pow(b,1/3)%1*4294967296|0);return function(g){for(var l=m.slice(b=0),c=unescape(encodeURI(g)),h=[],d=c.length,k=[],f,p;b<d;)k[b>>2]|=(c.charCodeAt(b)&255)<<8*(3-b++%4);d*=8;k[d>>5]|=128<<24-d%32;k[p=(d+64>>9<<4)+15]=d;for(b=0;b<p;b+=16){for(c=l.slice(a=0,8);64>a;c[4]+=f)h[a]=16>a?k[a+b]:(e(f=h[a-2],17)^e(f,19)^f>>>10)+(h[a-7]|0)+(e(f=h[a-15],7)^e(f,18)^f>>>3)+(h[a-16]|0),c.unshift((f=(c.pop()+(e(g=c[4],6)^e(g,11)^e(g,25))+((g&c[5]^~g&c[6])+n[a])|0)+(h[a++]|0))+(e(d=c[0],2)^e(d,13)^e(d,22))+(d&c[1]^c[1]&c[2]^c[2]&d));for(a=8;a--;)l[a]=c[a]+l[a]}for(c="";63>a;)c+=(l[++a>>3]>>4*(7-a%8)&15).toString(16);return c}}();
  /*eslint-enable*/

  // collection
  Bella.unique = function(a){
    if(isArray(a)){
      var r = [];
      for(var i = 0; i < a.length; i++){
         if(r.indexOf(a[i]) === -1){
          r.push(a[i]);
         }
      }
      return r;
    }
    return a || [];
  }
  Bella.max = function(a){
    return isArray(a)?Math.max.apply({}, a):a;
  }
  Bella.min = function(a){
    return isArray(a)?Math.min.apply({}, a):a;
  }
  Bella.contains = function(a, el, key){
    if(isArray(a)){
      for(var i=0; i<a.length; i++){
        var val = a[i];
        if((key && val[key]===el[key])||(val===el)){
          return true;
        }
      }
    }
    return false;
  }
  Bella.sort = function(arr, opts){
    var a = [], one;
    var o = opts || 1;
    if(isArray(arr) && arr.length>0){
      a = Bella.clone(arr);
      one = a[0];
      if(o===1 || o===-1){
        a.sort(function(m, n){
          return (m>n)?o:(m<n?(-1*o):0);
        });
      }
      else if(isString(o) && one.hasOwnProperty(o)){
        a.sort(function(m, n){
          return (m[o]>n[o])?1:(m[o]<n[o]?-1:0);
        });
      }
      else if(isObject(o)){
        for(var key in o){
          var order = 1;
          if(one.hasOwnProperty(key)){
            order = o[key]===-1?-1:1;
            /*eslint-disable*/
            a.sort(function(m, n){
              return (m[key]>n[key])?order:(m[key]<n[key]?(-1*order):0);
            });
            /*eslint-enable*/
          }
        }
      }
    }
    return a;
  }

  Bella.copies = function(from, to, matched, excepts){
    var mt = matched || false;
    var ex = excepts || [];
    for(var k in from){
      if(ex.length>0 && Bella.contains(ex, k)){
        continue;
      }
      if(!mt || (!!mt && to.hasOwnProperty(k))){
        var oa = from[k];
        var ob = to[k];
        if((isObject(ob) && isObject(oa))||(isArray(ob) && isArray(oa))){
          to[k] = Bella.copies(oa, to[k], mt, ex);
        }
        else{
          to[k] = oa;
        }
      }
    }
    return to;
  }

  Bella.clone = function(obj){
    if(obj==null || typeof obj!='object'){
      return obj;
    }
    if(obj instanceof Date){
      var copy1 = new Date();
      copy1.setTime(obj.getTime());
      return copy1;
    }
    if(isArray(obj)){
      var copy2 = [], arr = obj.slice(0);
      for(var i = 0, len = arr.length; i < len; ++i){
        copy2[i] = Bella.clone(arr[i]);
      }
      return copy2;
    }
    if(isObject(obj)){
      var copy = {};
      for(var attr in obj){
        if(attr=='clone'){
          continue;
        }
        if(obj.hasOwnProperty(attr)){
          copy[attr] = Bella.clone(obj[attr]);
        }
      }
      return copy;
    }
    return false;
  }

  Bella.empty = function(a){
    if(isArray(a)){
      for(var i=a.length-1; i>=0; i--){
        a[i] = null;
        delete a[i];
      }
      a.length = 0;
    }
    else if(isObject(a)){
      for(var k in a){
        a[k] = null;
        delete a[k];
      }
    }
    else if(isString(a)){
      a = '';
    }
    else if(isElement(a)){
      a.innerHTML = '';
    }
    return a;
  }

  Bella.hasProperty = function(ob, k){
    var r = true;
    if(ob[k]===undefined){
      r = (k in ob);
    }
    return r;
  }

  Bella.equals = function(a, b){
    if(isNumber(a) && isNumber(b)){
      return a===b;
    }
    else if(isString(a) && isString(b)){
      return a==b;
    }
    else if(isArray(a) && isArray(b)){
      if(a.length != b.length){
        return false;
      }
      var re = true;
      for(var i = 0, l = a.length; i < l; i++){
        if(!Bella.equals(a[i], b[i])){
          re = false;
          break;
        }
      }
      return re;
    }
    else if(isObject(a) && isObject(b)){
      var re = true;
      var as = [], bs = [];
      for(var k in a){
        as.push(k);
      }
      for(var k in b){
        bs.push(k);
      }
      if(as.length!=bs.length){
        re = false;
      }
      else{
        for(var k in a){
          if(!Bella.hasProperty(b, k) || !Bella.equals(a[k], b[k])){
            re = false;
            break;
          }
        }
      }
      return re;
    }
    else if(a instanceof Date && b instanceof Date){
      return a.getTime()===b.getTime();
    }
    return false;
  }

  // for browser only
  if(Bella.ENV=='browser'){

    Bella.device = detectDevice();

    var _getElement = function(el){
      var p = (isString(el)?document.getElementById(el):el)||null;
      if(!!p && isElement(p)){
        p.hasClass = function(c){
          var r = true, e = p.className.split(' '); c = c.split(' ');
          for(var i=0; i<c.length; i++){
            if(e.indexOf(c[i])===-1){
              r = false;
              break;
            }
          }
          return r;
        }
        p.addClass = function(c){
          c = c.split(' ');
          var t = p.className.split(' ');
          var nc = c.concat(t);
          var sc = Bella.unique(nc);
          p.className = sc.join(' ');
          return p;
        }
        p.removeClass = function(c){
          var e = p.className.split(' '); c = c.split(' ');
          for(var i=0; i<c.length; i++){
            if(p.hasClass(c[i])){
              e.splice(e.indexOf(c[i]), 1);
            }
          }
          p.className = e.join(' ');
          return p;
        }
        p.toggleClass = function(c){
          if(p.hasClass(c)){
            p.removeClass(c);
          }
          else{
            p.addClass(c);
          }
          return p;
        }
        p.empty = function(){
          p.innerHTML = '';
          return p;
        }
        p.html = function(s){
          if(s!=='' && isEmpty(s)){
            return p.innerHTML;
          }
          p.innerHTML = s;
          return p;
        }
        p.destroy = function(){
          if(p.parentNode){
            p.parentNode.removeChild(p);
          }
        }
      }
      return p;
    }

    var _addElement = function(tag, parent){
      var p = parent?_getElement(parent):document.body;
      var d = isElement(tag)?tag:document.createElement(tag);
      p.appendChild(d);
      return _getElement(d);
    }

    var _createElement = function(tag){
      return _getElement(document.createElement(tag));
    }

    var _query = function(condition){
      var el=null, tmp = document.querySelector(condition);
      if(tmp){
        el = _getElement(tmp);
      }
      return el;
    }

    var _queryAll = function(condition){
      var els=[], tmp = document.querySelectorAll(condition);
      if(tmp){
        for(var i=0; i<tmp.length; i++){
          els.push(_getElement(tmp[i]));
        }
      }
      return els;
    }

    /*eslint-disable*/
    /*!
      * domready (c) Dustin Diaz 2014 - License MIT
      */
    var onready = (function(){

      var fns = [], listener, doc = document,
        hack = doc.documentElement.doScroll,
        domContentLoaded = 'DOMContentLoaded',
        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

      if(!loaded){
        doc.addEventListener(domContentLoaded, listener = function(){
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while(listener = fns.shift()){
          listener();
        }
        });
      }

      return function (fn){
        loaded ? setTimeout(fn, 0) : fns.push(fn)
      }

    })();
    /*eslint-enable*/

    Bella.dom = {
      ready: onready,
      one: _query,
      all: _queryAll,
      get: _getElement,
      add: _addElement,
      create: _createElement
    }

    Bella.hostname = (function(){
      var atag = _createElement('A');
      atag.href = document.URL;
      var loc = atag.hostname;
      atag.destroy();
      return loc;
    })();

    Bella.event = (function(){

      return {
        on: function(element, event, callback){
          if(event=='wheel'){
            event = Bella.device.engine==='Gecko'?'DOMMouseScroll':'mousewheel';
          }
          var el = isString(element)?_getElement(element):element;
          var cb = callback || function(){};

          if(el.addEventListener){
            el.addEventListener(event, cb, false);
          }
          else if(el.attachEvent){
            el.attachEvent('on'+event, cb);
          }
        },
        off: function(element, event, callback){
          var el = isString(element)?_getElement(element):element;
          if(el.removeEventListener){
            el.removeEventListener(event, callback, false);
          }
          else if(el.detachEvent){
            el.detachEvent('on'+event, callback);
          }
        },
        simulate: function(element, event){
          var evt, el = isString(element)?_getElement(element):element;
          if(document.createEventObject){
            evt = document.createEventObject();
            el.fireEvent('on'+event, evt);
          }
          else{
            evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true );
            el.dispatchEvent(evt);
          }
        },
        stop: function(e){
          e.cancelBubble = true;
          if(e.stopPropagation){
            e.stopPropagation();
          }
          if(e.preventDefault){
            e.preventDefault();
          }
          return false;
        },
        detect: function(e){
          var evt = e || window.event;
          var targ = evt.target || evt.srcElement;
          if (targ && targ.nodeType == 3){
            targ = targ.parentNode;
          }
          return _getElement(targ);
        }
      }
    })();

    Bella.getMousePosition = function(ev){
      var e = ev || window.event;
      var cursor = {
        x: 0,
        y: 0
      }
      if(e.pageX||e.pageY){
        cursor.x=e.pageX;
        cursor.y=e.pageY;
      }
      else{
        var de=document.documentElement;
        var db=document.body;
        cursor.x=e.clientX+(de.scrollLeft||db.scrollLeft)-(de.clientLeft||0);
        cursor.y=e.clientY+(de.scrollTop||db.scrollTop)-(de.clientTop||0);
      }
      return cursor;
    }

    Bella.getWindowSize = function(){
      var w = 0, h = 0;
      if(window.innerWidth){
        w = window.innerWidth;
        h = window.innerHeight;
      }
      else if(document.documentElement && document.documentElement.clientWidth){
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
      }
      else if(document.body){
        w = document.body.clientWidth;
        h = document.body.clientHeight;
      }
      return {
        width: w,
        height: h
      }
    }

    var cookie = {
      set: function(name, value, expires, domain, path){
        var cdata = false;

        var parse = function(ob){

          var _name = ob.name || '';
          var _val = ob.value;
          var _exp = ob.expires || false;
          var _pat = ob.path || '/';
          var _dom = ob.domain || false;

          if(_name){
            var vx = (!isObject(_val) && !isArray(_val))?_val:JSON.stringify(_val);
            var arr = [
              [_name, isString(vx)?encodeURIComponent(vx):vx],
              ['path', _pat]
            ];
            if(_dom){
              arr.push(['domain', _dom]);
            }

            if(_exp && _exp.length && _exp.match(/(w|d|h|m|s)/gi)){
              var v = parseInt(_exp, 10);
              var s = _exp.replace(v, '');
              var delta = 0;
              if(s==='s'){
                delta = 1;
              }
              else if(s==='m'){
                delta = 60;
              }
              else if(s==='h'){
                delta = 60*60;
              }
              else if(s==='d'){
                delta = 60*60*24;
              }
              else if(s==='w'){
                delta = 7*60*60*24;
              }
              var ms = delta*v*1000;
              if(Bella.isInteger(ms)){
                var d = new Date();
                var t = d.getTime()+ms;
                d.setTime(t);
                arr.push(['expires', d.toUTCString()]);
              }
            }
            var tmp = [];
            arr.forEach(function(item){
              tmp.push(item.join('='));
            });
            return tmp.join('; ');
          }
        }

        if(arguments.length===1 && Bella.isObject(name)){
          cdata = parse(name);
        }
        else{
          cdata = parse({
            name: name,
            value: value,
            path: path || false,
            expires: expires || false,
            domain: domain || false
          });
        }
        if(cdata){
          document.cookie = cdata;
        }
      },
      get: function(name){
        if(document.cookie){
          var a = document.cookie.split(';');
          var n = Bella.trim(name);
          for(var i=0; i<a.length; i++){
            var t = a[i], ac = t.split('='), x = Bella.trim(ac[0]);
            if(x==n){
              return decodeURIComponent(ac[1]);
            }
          }
        }
        return null;
      },
      unset: function(name){
        cookie.set(name, '', '-1d');
      }
    }
    Bella.cookie = cookie;
  }

  // DateTime
  Bella.now = function(){
    return new Date();
  }
  Bella.time = function(){
    return (new Date()).getTime();
  }
  Bella.date = (function(){

    var pattern = 'D, M d, Y  H:i:s A';
    var weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var tz = (function(){
      var t = (new Date()).getTimezoneOffset();
      var z = Math.abs(t/60);
      var sign = t<0?'+':'-';
      return ['GMT', sign, Bella.leftPad(z, 2)].join('');
    })();

    var format = function(output, input){
      var meridiem=false, d, f, vchar=/\.*\\?([a-z])/gi;
      if(!input){
        input = Bella.time();
      }
      else{
        input = (new Date(input)).getTime();
      }
      if(!output){
        output = pattern;
      }
      var wn = weeks;
      var mn = months;
      var _num = function(n){
        return ''+(n<10?'0'+n:n);
      }
      var _ord = function(day){
        var s = day+' ', x = s.charAt(s.length-2);
        if(x==='1'){
          s+='st';
        }
        else if(x==='2'){
          s+='nd';
        }
        else if(x==='3'){
          s+='rd';
        }
        else{
          s+='th';
        }
        return s;
      }

      var _term = function(t, s){
        return f[t]?f[t]():s;
      }
      d = (input instanceof Date) ? input : new Date(input);

      if(isNaN(d.getTime())){
        var reg=/^(\d+-\d+-\d+)\s(\d+:\d+:\d+)$/i;
        if(reg.test(input)){
          d = new Date(input.replace(' ', 'T'));
        }
        else{
          return input+' !';
        }
      }
      if(output.indexOf('a')>0 || output.indexOf('A')>0){
        meridiem=true;
      }
      /*eslint-disable */
      f = {
        Y: function(){return d.getFullYear()},     // full year, ex: 2014
        y: function(){return (f.Y()+'').slice(-2)},  // short year, ex: 14
        F: function(){return mn[f.n()-1]},       // full month name, ex: August
        M: function(){return (f.F()+'').slice(0,3)}, // short month name, ex: Aug
        m: function(){return _num(f.n())},       // month index with zero, ex: 08 (in 08/24/2014)
        n: function(){return d.getMonth()+1},    // short month name with no zero, ex: 8 (in 8/24/2014)
        S: function(){return _ord(f.j())},       // the ordering subfix for date, ext: 1st, 2nd, 3rd, 4th
        j: function(){return d.getDate()},       // date, with no zero, ex: 3 (in 18/3/2014)
        d: function(){return _num(f.j())},       // date, with zero, ex: 03 (in 18/03/2014)
        t: function(){return (new Date(f.Y(), f.n(), 0)).getDate()}, // date in year
        w: function(){return d.getDay()},      // weekday in number
        l: function(){return wn[f.w()]},       // long name of weekday, ex: Sunday
        D: function(){return (f.l()+'').slice(0,3)},// short name of weekday, ex: Sun
        G: function(){return d.getHours()},      // hour, with no zero: 0 - 24
        g: function(){return (f.G()%12||12)},    // hour, with no zero: 0 - 12
        h: function(){return _num(f.g())},       // hour, with zero:  00 - 24
        H: function(){return (meridiem?f.h():_num(f.G()))}, // hour, with zero:  00 - 12
        i: function(){return _num(d.getMinutes())},  // minute:  00 - 59
        s: function(){return _num(d.getSeconds())},  // second:  00 - 59
        a: function(){return f.G()>11?'pm':'am'},  // am, pm
        A: function(){return (f.a()).toUpperCase()},  // AM, PM
        O: function(){return tz}
      }
      /*eslint-enable */
      return output.replace(vchar, _term);
    }

    var relativize = function(input){
      var time = (input instanceof Date?input:new Date(input));
      var delta = new Date()-time;
      var nowThreshold = parseInt(time, 10);
      if(isNaN(nowThreshold)){
        nowThreshold = 0;
      }
      if(delta <= nowThreshold){
        return 'Just now';
      }
      var units = null;
      var conversions = {
        millisecond: 1,
        second: 1000,
        minute: 60,
        hour: 60,
        day: 24,
        month: 30,
        year: 12
      }
      for(var key in conversions){
        if (delta < conversions[key]){
          break;
        }
        else{
          units = key;
          delta = delta / conversions[key];
        }
      }
      delta = Math.floor(delta);
      if (delta!==1){
        units+='s';
      }
      return [delta, units].join(' ')+' ago';
    }

    var utc = function(t){
      return (new Date(t || Bella.now())).toUTCString();
    }

    var local = function(t){
      return format('D, j M Y H:i:s O', t);
    }

    var strtotime = function(t){
      return (new Date(t)).getTime();
    }

    return {
      pattern: function(p){
        if(!p){
          return pattern;
        }
        pattern = p;
        return pattern;
      },
      utc: utc,
      local: local,
      strtotime: strtotime,
      format: format,
      relativize: relativize
    }
  })();

  // schedule
  Bella.scheduler = (function(){

    var TaskList = [], pattern = 'Y m d H i s', checkTimer;

    function check(){

      var gt = Bella.time(), ggt = Math.round(gt/1000);
      var sysTime = Bella.date.format(pattern, gt);
      var sysDay = Bella.date.format('l', gt);

      if(TaskList.length>0){
        for(var i=TaskList.length-1; i>=0; i--){
          var t = TaskList[i];
          if(compare(t, sysTime, sysDay, ggt)){
            t.fn();
            if(!t.repeat){
              TaskList.splice(i, 1);
            }
          }
        }
      }
      else{
        clearInterval(checkTimer);
        checkTimer = null;
      }
    }

    function compare(task, sysTime, sysDay, currTime){

      var taskTime = task.time, beginAt = Math.round(task.at/1000);

      if(taskTime.match(/^(sun|mon|tue|wed|thu|fri|sat)+(\w+)?(\s+)+(\d+(:\d)?)+$/gi)){
        var a = taskTime.split(' ');
        var yes = false;
        if(a.length>1){

          var day = Bella.trim(a[0]), time = Bella.trim(a[1]);

          if(sysDay.match(new RegExp(day, 'gi'))){

            var a2 = time.split(':');
            if(a2.length===1){
              a2 = a2.concat(['00', '00']);
            }
            if(a2.length===2){
              a2 = a2.concat(['00']);
            }

            var a3 = sysTime.split(' ').slice(3, 6);

            yes = true;
            for(var i=0; i< a3.length; i++){
              if(parseInt(a3[i], 10)!==parseInt(a2[i], 10)){
                yes = false;
                break;
              }
            }
          }
        }
        return yes;
      }
      else if(taskTime.match(/(d|h|m|s)/gi)){

        var v = parseInt(taskTime, 10);
        var s = taskTime.replace(v, '');

        var delta = 0;

        if(s==='s'){
          delta = 1;
        }
        else if(s==='m'){
          delta = 60;
        }
        else if(s==='h'){
          delta = 60*60;
        }
        else if(s==='d'){
          delta = 60*60*24;
        }

        delta*=v;
        var sdur = currTime - beginAt;
        return delta>0 && sdur%delta===0;
      }
      else{
        var a1 = taskTime.split(' '), a21 = sysTime.split(' '), s1 = '', s2 = '';

        for(var j=0; j<a1.length; j++){
          if(a1[j]==='*'){
            a21[j] = '*';
          }
          s1+=a1[j];
          s2+=a21[j];
        }
        return s1===s2;
      }
    }

    function register(t, fn, single){
      var ot = single || false;
      TaskList.push({
        fn: fn,
        time: t,
        at: Bella.time(),
        repeat: !ot
      });

      if(!checkTimer){
        checkTimer = setInterval(check, 1000);
      }
    }

    function yearly(t, fn){
      var pt = '* '+t;
      register(pt, fn);
    }

    function monthly(t, fn){
      var pt = '* * '+t;
      register(pt, fn);
    }

    function daily(t, fn){
      var pt = '* * * '+t;
      register(pt, fn);
    }

    function hourly(t, fn){
      var pt = '* * * * '+t;
      register(pt, fn);
    }

    function every(t, fn){
      register(t, fn);
    }

    function once(t, fn){
      register(t, fn, true);
    }

    return {
      yearly: yearly,
      monthly: monthly,
      daily: daily,
      hourly: hourly,
      every: every,
      once: once
    }
  })();


  // exports
  if(Bella.ENV==='node'){
    module.exports = Bella;
  }
  else{
    var root = context || window;
    if(isFunction(root.define) && root.define.amd){
      root.define(function(){
        return Bella;
      });
    }
    root.Bella = Bella;
  }
})();
