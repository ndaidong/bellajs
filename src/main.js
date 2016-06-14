/**
 * bellajs
 * @ndaidong
**/

((name, factory) => {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    let root = window || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('Bella', () => { // eslint-disable-line no-invalid-this

  var ENV = typeof module !== 'undefined' && module.exports ? 'node' : 'browser';

  var B = {ENV};

  var tof = (v) => {
    let ots = Object.prototype.toString;
    let s = typeof v;
    if (s === 'object') {
      if (v) {
        if (ots.call(v).indexOf('HTML') !== -1 && ots.call(v).indexOf('Element') !== -1) {
          return 'element';
        }
        if (v instanceof Array ||
          (
            !(v instanceof Object) &&
            ots.call(v) === '[object Array]' ||
            typeof v.length === 'number' && typeof v.splice !== 'undefined' &&
            typeof v.propertyIsEnumerable !== 'undefined' && !v.propertyIsEnumerable('splice')
          )
        ) {
          return 'array';
        }
        if (!(v instanceof Object) &&
          (ots.call(v) === '[object Function]' ||
          typeof v.call !== 'undefined' &&
           typeof v.propertyIsEnumerable !== 'undefined' &&
            !v.propertyIsEnumerable('call')
          )
        ) {
          return 'function';
        }
      }
      return 'object';
    } else if (s === 'function' && typeof v.call === 'undefined') {
      return 'object';
    }
    return s;
  };

  var isDef = (val) => {
    return tof(val) !== 'undefined';
  };
  var isNull = (val) => {
    return tof(val) === null || val === null;
  };

  var isString = (val) => {
    return !isNull(val) && tof(val) === 'string';
  };
  var isNumber = (val) => {
    return val !== '' && !isNull(val) && isDef(val) && !isNaN(val) && tof(val) === 'number';
  };
  var isInteger = (val) => {
    return isNumber(val) && isFinite(val) && Math.floor(val) === val;
  };
  var isBoolean = (val) => {
    return val === true || val === false;
  };
  var isArray = (val) => {
    return !isNull(val) && tof(val) === 'array';
  };
  var isObject = (val) => {
    return !isNull(val) && tof(val) === 'object';
  };

  var isDate = (val) => {
    return val instanceof Date && !isNaN(val.valueOf());
  };
  var isFunction = (val) => {
    return !isNull(val) && tof(val) === 'function';
  };
  var isElement = (val) => {
    if (val && ENV === 'node' && val._root) {
      return true;
    }
    return !isNull(val) && tof(val) === 'element';
  };
  var isLetter = (val) => {
    let re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  };
  var isEmail = (val) => {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isString(val) && re.test(val);
  };
  var isGeneratedKey = (val) => {
    let re = /^[A-Z0-9]+$/i;
    return isString(val) && re.test(val);
  };
  var isEmpty = (val) => {
    return !isDef(val) || isNull(val) ||
      isString(val) && val === '' ||
      isArray(val) && JSON.stringify(val) === '[]' ||
      isObject(val) && JSON.stringify(val) === '{}';
  };
  var hasProperty = (ob, k) => {
    if (!ob || !k) {
      return false;
    }
    let r = true;
    if (!isDef(ob[k])) {
      r = k in ob;
    }
    return r;
  };
  var equals = (a, b) => {
    let re = true;
    if (isEmpty(a) && isEmpty(b)) {
      return true;
    }
    if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    }
    if (isNumber(a) && isNumber(b) || isString(a) && isString(b)) {
      return a === b;
    }
    if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      if (a.length > 0) {
        for (let i = 0, l = a.length; i < l; i++) {
          if (!equals(a[i], b[i])) {
            re = false;
            break;
          }
        }
      }
    } else if (isObject(a) && isObject(b)) {
      let as = [];
      let bs = [];
      for (let k1 in a) {
        if (hasProperty(a, k1)) {
          as.push(k1);
        }
      }
      for (let k2 in b) {
        if (hasProperty(b, k2)) {
          bs.push(k2);
        }
      }
      if (as.length !== bs.length) {
        return false;
      }
      for (let k in a) {
        if (!hasProperty(b, k) || !equals(a[k], b[k])) {
          re = false;
          break;
        }
      }
    }
    return re;
  };

  B.isDef = isDef;
  B.isNull = isNull;
  B.isString = isString;
  B.isNumber = isNumber;
  B.isInteger = isInteger;
  B.isBoolean = isBoolean;
  B.isArray = isArray;
  B.isObject = isObject;
  B.isDate = isDate;
  B.isFunction = isFunction;
  B.isElement = isElement;
  B.isEmpty = isEmpty;
  B.isLetter = isLetter;
  B.isEmail = isEmail;
  B.isGeneratedKey = isGeneratedKey;
  B.hasProperty = hasProperty;
  B.equals = equals;

  var encode = (s) => {
    return isString(s) ? encodeURIComponent(s) : '';
  };

  var decode = (s) => {
    return isString(s) ? decodeURIComponent(s.replace(/\+/g, ' ')) : '';
  };

  var trim = (s, all) => {
    if (!isString(s)) {
      return '';
    }
    let x = s ? s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : s || '';
    if (x && all) {
      return x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };

  var truncate = (s, l) => {
    s = trim(s);
    if (!s) {
      return s;
    }
    let t = l || 140;
    if (s.length <= t) {
      return s;
    }
    let x = s.substring(0, t);
    let a = x.split(' ');
    let b = a.length;
    let r = '';
    if (b > 1) {
      a.pop();
      r += a.join(' ');
      if (r.length < s.length) {
        r += '...';
      }
    } else {
      x = x.substring(0, t - 3);
      r = x + '...';
    }
    return r;
  };

  var stripTags = (s) => {
    if (!isString(s)) {
      return '';
    }
    let r = s.replace(/<.*?>/gi, ' ');
    if (r) {
      r = trim(r.replace(/\s\s+/g, ' '));
    }
    return r;
  };

  var escapeHTML = (s) => {
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  var unescapeHTML = (s) => {
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  };

  var strtolower = (s) => {
    return isString(s) ? s.toLowerCase() : '';
  };

  var strtoupper = (s) => {
    return isString(s) ? s.toUpperCase() : '';
  };

  var ucfirst = (s) => {
    if (!isString(s)) {
      return '';
    }
    if (s.length === 1) {
      return s.toUpperCase();
    }
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  var ucwords = (s) => {
    if (!isString(s)) {
      return '';
    }
    let c = s.split(' ');
    let a = [];
    c.forEach((w) => {
      a.push(ucfirst(w));
    });
    return a.join(' ');
  };

  var leftPad = (s, size, spad) => {
    let o = String(s);
    let z = size || 2;
    let g = spad || '0';
    return o.length >= z ? o : new Array(z - o.length + 1).join(g) + o;
  };

  var rightPad = (s, size, spad) => {
    let o = String(s);
    let z = size || 2;
    let g = spad || '0';
    return o.length >= z ? o : o + new Array(z - o.length + 1).join(g);
  };

  var repeat = (s, m) => {
    if (!s || !isString(s)) {
      return '';
    }
    if (!isInteger(m) || m < 1) {
      return s;
    }
    let a = [];
    while (a.length < m) {
      a.push(s);
    }
    return a.join('');
  };

  B.encode = encode;
  B.decode = decode;
  B.trim = trim;
  B.truncate = truncate;
  B.stripTags = stripTags;
  B.escapeHTML = escapeHTML;
  B.unescapeHTML = unescapeHTML;
  B.strtolower = strtolower;
  B.strtoupper = strtoupper;
  B.ucfirst = ucfirst;
  B.ucwords = ucwords;
  B.leftPad = leftPad;
  B.rightPad = rightPad;
  B.repeat = repeat;

  var createId = (leng, prefix) => {
    let rn = () => {
      return Math.random().toString(36).slice(2);
    };
    let a = [];
    while (a.length < 10) {
      a.push(rn());
    }
    let r = a.join('');
    let t = r.length;
    let px = prefix || '';
    let ln = Math.max(leng || 32, px.length);
    let s = px;
    while (s.length < ln) {
      let k = Math.floor(Math.random() * t);
      s += r.charAt(k) || '';
    }
    return s;
  };

  var random = (min, max) => {
    if (!min || min < 0) {
      min = 0;
    }
    if (!max) {
      max = 9007199254740991;
    }
    if (min === max) {
      return max;
    }
    if (min > max) {
      min = Math.min(min, max);
      max = Math.max(min, max);
    }
    let offset = min;
    let range = max - min + 1;
    let rd = Math.floor(Math.random() * range) + offset;
    return rd;
  };

  var max = (a) => {
    return isArray(a) ? Math.max.apply({}, a) : a;
  };

  var min = (a) => {
    return isArray(a) ? Math.min.apply({}, a) : a;
  };

  var empty = (a) => {
    if (isArray(a)) {
      for (let i = a.length - 1; i >= 0; i--) {
        a[i] = null;
        delete a[i];
      }
      a.length = 0;
    } else if (isObject(a)) {
      for (let k in a) {
        if (B.hasProperty(a, k)) {
          a[k] = null;
          delete a[k];
        }
      }
    } else if (isString(a)) {
      a = '';
    } else if (isElement(a)) {
      a.innerHTML = '';
    }
    return a;
  };

  var unique = (a) => {
    if (isArray(a)) {
      let r = [];
      for (let i = 0; i < a.length; i++) {
        if (r.indexOf(a[i]) === -1) {
          r.push(a[i]);
        }
      }
      return r;
    }
    return a || [];
  };

  var contains = (a, el, key) => {
    if (isArray(a)) {
      for (let i = 0; i < a.length; i++) {
        var val = a[i];
        if (key && val[key] === el[key] || val === el) {
          return true;
        }
      }
    } else if (isObject(a) && isString(el)) {
      return hasProperty(a, el);
    } else if (isString(a) && isString(el)) {
      return a.includes(el);
    }
    return false;
  };

  var first = (a) => {
    return a[0];
  };

  var last = (a) => {
    return a[a.length - 1];
  };

  var getIndex = (arr, item) => {
    let r = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        r = i;
        break;
      }
    }
    return r;
  };

  var getLastIndex = (arr, item) => {
    let r = -1;
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === item) {
        r = i;
        break;
      }
    }
    return r;
  };

  var clone = (obj) => {
    if (!(obj instanceof Object)) {
      return obj;
    }
    let output;
    let Constructor = obj.constructor;
    switch (Constructor) {
      case RegExp:
        output = new Constructor(obj);
        break;
      case Date:
        output = new Constructor(obj.getTime());
        break;
      default:
        output = new Constructor();
    }
    for (let prop in obj) { // eslint-disable-line guard-for-in
      output[prop] = clone(obj[prop]);
    }
    return output;
  };


  var copies = (source, dest, matched, excepts) => {
    let mt = matched || false;
    let ex = excepts || [];
    for (let k in source) {
      if (ex.length > 0 && contains(ex, k)) {
        continue; // eslint-disable-line no-continue
      }
      if (!mt || mt && dest.hasOwnProperty(k)) {
        let oa = source[k];
        let ob = dest[k];
        if (isObject(ob) && isObject(oa) || isArray(ob) && isArray(oa)) {
          dest[k] = copies(oa, dest[k], mt, ex);
        } else {
          dest[k] = clone(oa);
        }
      }
    }
    return dest;
  };

  var sort = (arr, opts) => {
    let a = [];
    let one = {};
    let o = opts || 1;
    if (isArray(arr) && arr.length > 0) {
      a = clone(arr);
      one = a[0];
      if (o === 1 || o === -1) {
        a.sort((m, n) => {
          return m > n ? o : m < n ? -1 * o : 0; // eslint-disable-line no-nested-ternary
        });
      } else if (isString(o) && hasProperty(one, o)) {
        a.sort((m, n) => {
          return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0; // eslint-disable-line no-nested-ternary
        });
      } else if (isObject(o)) {
        for (let key in o) {
          if (hasProperty(one, key)) {
            let order = o[key] === -1 ? -1 : 1;
            /*eslint-disable*/
            a.sort((m, n) => {
              return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
            });
            /*eslint-enable*/
          }
        }
      }
    }
    return a;
  };

  var shuffle = (arr) => {
    let a = clone(arr);
    let i, j, x;
    for (i = a.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
    return a;
  };

  var pick = (arr, count) => {
    let c = count ? Math.min(count, arr.length) : 1;
    if (c < 1) {
      c = 1;
    }
    if (c >= arr.length) {
      return arr;
    }
    if (c === 1) {
      let ri = random(0, arr.length - 1);
      return arr[ri];
    }
    let ab = [];
    let ba = clone(arr);
    while (ab.length < c) {
      let i = random(0, ba.length - 1);
      ab.push(ba[i]);
      ba.splice(i, 1);
    }
    return ab;
  };

  var debounce = (fn, wait, immediate) => {
    let timeout;
    return () => {
      let later = () => {
        timeout = null;
        if (!immediate) {
          fn();
        }
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);
      if (callNow) {
        fn();
      }
    };
  };

  var throttle = (fn, wait) => {
    return debounce(fn, wait, true);
  };

  B.id = createId();
  B.createId = createId;
  B.random = random;
  B.min = min;
  B.max = max;
  B.unique = unique;
  B.contains = contains;
  B.first = first;
  B.last = last;
  B.getIndex = getIndex;
  B.getLastIndex = getLastIndex;
  B.sort = sort;
  B.shuffle = shuffle;
  B.pick = pick;
  B.empty = empty;
  B.copies = copies;
  B.clone = clone;
  B.debounce = debounce;
  B.throttle = throttle;

  /*eslint-disable*/
  /** https://github.com/jbt/js-crypto */
  B.md5 = function() {for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c) {var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16) {b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();
  /*eslint-enable*/

  var replaceAll = (s, a, b) => {
    if (isNumber(s)) {
      s = String(s);
    }

    if (!s || !isString(s)) {
      return '';
    }

    if (isNumber(a)) {
      a = String(a);
    }
    if (isNumber(b)) {
      b = String(b);
    }

    if (isString(a) && isString(b)) {
      let aa = s.split(a);
      s = aa.join(b);
    } else if (isArray(a) && isString(b)) {
      a.forEach((v) => {
        s = replaceAll(s, v, b);
      });
    } else if (isArray(a) && isArray(b) && a.length === b.length) {
      let k = a.length;
      if (k > 0) {
        for (let i = 0; i < k; i++) {
          let aaa = a[i];
          let bb = b[i];
          s = replaceAll(s, aaa, bb);
        }
      }
    }
    return s;
  };

  var stripAccent = (s) => {
    if (isNumber(s)) {
      return String(s);
    }
    if (!isString(s)) {
      return '';
    }
    let map = {
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
    };
    for (let key in map) {
      if (hasProperty(map, key)) {
        let a = map[key].split('|');
        for (let i = 0; i < a.length; i++) {
          s = replaceAll(s, a[i], key);
        }
      }
    }
    return s;
  };

  var createAlias = (s, delimiter) => {
    s = String(s);
    let x = stripAccent(s);
    if (x) {
      let d = delimiter || '-';
      x = strtolower(x);
      x = trim(x);
      x = x.replace(/\W+/g, ' ');
      x = x.replace(/\s+/g, ' ');
      x = x.replace(/\s/g, d);
    }
    return x;
  };

  var template = (tpl, data) => {
    let ns = [];
    let compile = (s, ctx, namespace) => {
      if (namespace) {
        ns.push(namespace);
      }
      let a = [];
      for (let k in ctx) {
        if (hasProperty(ctx, k)) {
          let v = ctx[k];
          if (isObject(v) || isArray(v)) {
            a.push({
              key: k,
              data: v
            });
          } else if (isString(v)) {
            v = replaceAll(v, ['{', '}'], ['&#123;', '&#125;']);
            let cns = ns.concat([k]);
            let r = new RegExp('{' + cns.join('.') + '}', 'gi');
            s = s.replace(r, v);
          }
        }
      }
      if (a.length > 0) {
        a.forEach((item) => {
          s = compile(s, item.data, item.key);
        });
      }
      return trim(s, true);
    };
    if (data && (isString(data) || isObject(data) || isArray(data))) {
      return compile(tpl, data);
    }
    return tpl;
  };

  B.replaceAll = replaceAll;
  B.stripAccent = stripAccent;
  B.createAlias = createAlias;
  B.template = template;

  var now = () => {
    return new Date();
  };

  var time = () => {
    return now().getTime();
  };

  (() => {
    var pattern = 'D, M d, Y  h:i:s A';
    var weeks = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    var months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    var tz = (() => {
      let t = new Date().getTimezoneOffset();
      let z = Math.abs(t / 60);
      let sign = t < 0 ? '+' : '-';
      return ['GMT', sign, leftPad(z, 4)].join('');
    })();

    var format = (output, timestamp) => {
      let meridiem = false;
      let d, f;
      let vchar = /\.*\\?([a-z])/gi;
      let input = timestamp ? new Date(timestamp).getTime() : time();

      if (!output || !isString(output)) {
        output = pattern;
      }

      if (output.match(/(\.*)a{1}(\.*)*/i)) {
        meridiem = true;
      }

      let wn = weeks;
      let mn = months;
      let _num = (n) => {
        return String(n < 10 ? '0' + n : n);
      };
      let _ord = (day) => {
        let s = day + ' ';
        let x = s.charAt(s.length - 2);
        if (x === '1') {
          s = 'st';
        } else if (x === '2') {
          s = 'nd';
        } else if (x === '3') {
          s = 'rd';
        } else {
          s = 'th';
        }
        return s;
      };

      var _term = (t, s) => {
        return f[t] ? f[t]() : s;
      };

      d = input instanceof Date ? input : new Date(input);

      if (isNaN(d.getTime())) {
        let reg = /^(\d+-\d+-\d+)\s(\d+:\d+:\d+)$/i;
        if (reg.test(input)) {
          d = new Date(input.replace(' ', 'T'));
        } else {
          return input + ' !';
        }
      }

      /*eslint-disable */
      f = {
        Y() {
          return d.getFullYear();
        }, // 2015
        y() {
          return (f.Y() + '').slice(-2);
        }, // 15
        F() {
          return mn[f.n() - 1];
        }, // August
        M() {
          return (f.F() + '').slice(0, 3);
        }, // Aug
        m() {
          return _num(f.n());
        }, // 08
        n() {
          return d.getMonth() + 1;
        }, // 8
        S() {
          return _ord(f.j());
        }, // st, nd, rd, th
        j() {
          return d.getDate();
        }, // 3
        d() {
          return _num(f.j());
        }, // 03
        t() {
          return new Date(f.Y(), f.n(), 0).getDate();
        }, // date in year
        w() {
          return d.getDay();
        }, // weekday in number
        l() {
          return wn[f.w()];
        }, // Sunday, Monday
        D() {
          return (f.l() + '').slice(0, 3);
        }, // Sun, Mon
        G() {
          return d.getHours();
        }, // 0 - 24
        g() {
          return f.G() % 12 || 12;
        }, // 0 - 12
        h() {
          return _num(meridiem ? f.g() : f.G());
        }, // 00 - 12 or 00 - 24
        i() {
          return _num(d.getMinutes());
        }, // 00 - 59
        s() {
          return _num(d.getSeconds());
        }, // 00 - 59
        a() {
          return f.G() > 11 ? 'pm' : 'am';
        }, // am, pm
        A() {
          return f.a().toUpperCase();
        }, // AM, PM
        O() {
          return tz;
        }
      };
      /*eslint-enable */
      return output.replace(vchar, _term);
    };

    let relativize = (input) => {
      let t = input instanceof Date ? input : new Date(input);
      let delta = new Date() - t;
      let nowThreshold = parseInt(t, 10);
      if (isNaN(nowThreshold)) {
        nowThreshold = 0;
      }
      if (delta <= nowThreshold) {
        return 'Just now';
      }
      let units = null;
      let conversions = {
        millisecond: 1,
        second: 1000,
        minute: 60,
        hour: 60,
        day: 24,
        month: 30,
        year: 12
      };
      for (let key in conversions) {
        if (delta < conversions[key]) {
          break;
        } else {
          units = key;
          delta /= conversions[key];
        }
      }
      delta = Math.floor(delta);
      if (delta !== 1) {
        units += 's';
      }
      return [delta, units].join(' ') + ' ago';
    };

    let utc = (t) => {
      return new Date(t || now()).toUTCString();
    };

    let local = (t) => {
      return format('D, j M Y h:i:s O', t);
    };

    let strtotime = (t) => {
      return new Date(t).getTime();
    };

    B.now = now;
    B.time = time;

    B.date = {
      utc,
      local,
      strtotime,
      format,
      relativize
    };

  })();

  (() => {

    const MAX_TIMEOUT = 2147483647;

    var TaskList = new Map();
    var checkTimer;

    var getNextDay = (t, tday) => {
      let d = new Date(t);
      d.setDate(d.getDate() + tday + 7 - d.getDay() % 7);
      return d;
    };

    var getDT1 = (mat, lastTick) => {

      let delta = 0;
      let passed = time() - lastTick;

      if (!mat) {
        return -1;
      }
      let v = parseInt(mat[1], 10);
      let s = mat[2];
      if (s === 's') {
        delta = 1000;
      } else if (s === 'm') {
        delta = 6e4;
      } else if (s === 'h') {
        delta = 6e4 * 60;
      } else if (s === 'd') {
        delta = 6e4 * 60 * 24;
      }
      delta *= v;
      return delta - passed;
    };

    var getDT2 = (mat) => {
      let wds = 'sun|mon|tue|wed|thu|fri|sat'.split('|');
      let today = new Date();
      let wday = today.getDay();

      let awd = wds[wday];
      let awi = getIndex(awd, wds);

      let dd = mat[1].toLowerCase();
      let ddi = getIndex(dd, wds);

      let hh = 0;
      let ii = 0;
      let ss = 0;
      if (mat[2]) {
        hh = parseInt(mat[2], 10);
      }
      if (mat[3]) {
        ii = parseInt(mat[3].replace(/\D/gi, ''), 10);
      }
      if (mat[4]) {
        ss = parseInt(mat[4].replace(/\D/gi, ''), 10);
      }

      today.setHours(hh);
      today.setMinutes(ii);
      today.setSeconds(ss);

      let ttime = today.getTime();
      let ctime = time();

      let nextDay = today;
      if (ddi < awi || ctime > ttime) {
        nextDay = getNextDay(today, awi);
      }
      nextDay.setHours(hh);
      nextDay.setMinutes(ii);
      nextDay.setSeconds(ss);

      return nextDay.getTime() - ctime;
    };

    var getDT3 = (mat) => {  // eslint-disable-line complexity

      let yy = mat[1] === '*' ? '*' : parseInt(mat[1], 10);
      let mm = mat[2] === '*' ? '*' : parseInt(mat[2], 10);
      let dd = mat[3] === '*' ? '*' : parseInt(mat[3], 10);
      let hh = mat[4] === '*' ? '*' : parseInt(mat[4], 10);
      let ii = mat[5] === '*' ? '*' : parseInt(mat[5], 10);
      let ss = mat[6] === '*' ? '*' : parseInt(mat[6], 10);

      let today = new Date();
      let ayy = today.getFullYear();

      if (yy !== '*' && yy < ayy) {
        return -1;
      }

      let tyy = yy;
      let tmm = mm;
      let tdd = dd;
      let thh = hh;
      let tii = ii;
      let tss = ss;

      if (yy === '*') {
        tyy = ayy;
      }

      let amm = today.getMonth() + 1;
      if (mm === '*') {
        tmm = amm;
      }
      let add = today.getDate();
      if (dd === '*') {
        tdd = add;
      }
      let ahh = today.getHours();
      if (hh === '*') {
        thh = ahh;
      }
      let aii = today.getMinutes();
      if (ii === '*') {
        tii = aii;
      }

      let gd = new Date(tyy, tmm - 1, tdd, thh, tii, tss);
      let ttime = gd.getTime();
      let ctime = time();
      let delta = ttime - ctime;

      if (delta < 0) {
        if (ii === '*') {
          gd.setMinutes(tii + 1);
          ttime = gd.getTime();
          delta = ttime - ctime;
        }
      }
      if (delta < 0) {
        if (hh === '*') {
          gd.setHours(thh + 1);
          ttime = gd.getTime();
          delta = ttime - ctime;
        }
      }
      if (delta < 0) {
        if (dd === '*') {
          gd.setDate(tdd + 1);
          ttime = gd.getTime();
          delta = ttime - ctime;
        }
      }

      if (delta < 0) {
        if (mm === '*') {
          gd.setMonth(tmm);
          ttime = gd.getTime();
          delta = ttime - ctime;
        }
      }

      if (delta < 0) {
        if (yy === '*') {
          gd.setFullYear(tyy + 1);
          ttime = gd.getTime();
          delta = ttime - ctime;
        }
      }

      return delta;
    };

    var getDelayTime = (pat, lastTick) => {

      let pt1 = /^(\d+)\s?(d|h|m|s)+$/i;
      let pt2 = /^(sun|mon|tue|wed|thu|fri|sat)+\w*\s+(\d+)(:\d+)?(:\d+)?$/i;
      let pt3 = /^(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\*|\d+)\s+(\d+)$/i;

      let mat = pat.match(pt1);
      if (mat) {
        return getDT1(mat, lastTick);
      }

      mat = pat.match(pt2);
      if (mat) {
        return getDT2(mat);
      }

      mat = pat.match(pt3);
      if (mat) {
        return getDT3(mat);
      }

      return -1;
    };

    var execute = (task) => {
      task.fn();
      let id = task.id;
      if (!task.repeat) {
        return TaskList.delete(id);
      }

      let t = time();
      task.lastTick = t;
      TaskList.set(id, task);
      return true;
    };

    var updateTimer = () => {
      if (TaskList.size > 0) {
        let minDelay = MAX_TIMEOUT;
        let candidates = [];
        TaskList.forEach((task) => {
          let id = task.id;
          let delay = getDelayTime(task.time, task.lastTick);
          if (delay < 0) {
            TaskList.delete(id);
          } else if (delay === 0) {
            task.delay = 0;
            candidates.push(task);
          } else {
            task.delay = delay;
            TaskList.set(id, task);
            if (delay <= minDelay) {
              minDelay = delay;
              let arr = [];
              arr = candidates.concat(task);
              candidates = arr.filter((item) => {
                return item.delay <= minDelay;
              });
            }
          }
        });
        if (checkTimer) {
          clearTimeout(checkTimer);
        }
        if (candidates.length) {
          checkTimer = setTimeout(() => {
            candidates.map(execute);
            setTimeout(updateTimer, 1);
          }, minDelay);
        }

      }
    };

    var register = (t, fn, once) => {
      let rep = once ? 0 : 1;
      let n = time();
      let id = createId(32);
      let task = {
        id,
        fn,
        time: t,
        repeat: rep,
        createdAt: n,
        lastTick: n,
        delay: 0
      };
      TaskList.set(id, task);
      updateTimer();
    };

    B.scheduler = {
      yearly(t, fn) {
        let pt = '* ' + t;
        register(pt, fn);
      },
      monthly(t, fn) {
        let pt = '* * ' + t;
        register(pt, fn);
      },
      daily(t, fn) {
        let pt = '* * * ' + t;
        register(pt, fn);
      },
      hourly(t, fn) {
        let pt = '* * * * ' + t;
        return register(pt, fn);
      },
      every(t, fn) {
        return register(t, fn);
      },
      once(t, fn) {
        return register(t, fn, 1);
      }
    };
  })();

  // exports
  return B;
});
