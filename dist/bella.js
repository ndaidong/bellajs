/**
 * bellajs@8.0.1
 * built on: Sun, 27 Oct 2019 14:53:37 GMT
 * repository: https://github.com/ndaidong/bellajs
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.bella = {}));
}(this, (function (exports) {
  const ob2Str = (val) => {
    return {}.toString.call(val);
  };
  const isNull = (val) => {
    return ob2Str(val) === '[object Null]';
  };
  const isUndefined = (val) => {
    return ob2Str(val) === '[object Undefined]';
  };
  const isFunction = (val) => {
    return ob2Str(val) === '[object Function]';
  };
  const isString = (val) => {
    return ob2Str(val) === '[object String]';
  };
  const isNumber = (val) => {
    return ob2Str(val) === '[object Number]';
  };
  const isInteger = (val) => {
    return Number.isInteger(val);
  };
  const isArray = (val) => {
    return Array.isArray(val);
  };
  const isObject = (val) => {
    return ob2Str(val) === '[object Object]' && !isArray(val);
  };
  const isBoolean = (val) => {
    return val === true || val === false;
  };
  const isDate = (val) => {
    return val instanceof Date && !isNaN(val.valueOf());
  };
  const isElement = (v) => {
    return ob2Str(v).match(/^\[object HTML\w*Element]$/);
  };
  const isLetter = (val) => {
    const re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  };
  const isEmail = (val) => {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isString(val) && re.test(val);
  };
  const isEmpty = (val) => {
    return !val || isUndefined(val) || isNull(val) ||
      isString(val) && val === '' ||
      isArray(val) && JSON.stringify(val) === '[]' ||
      isObject(val) && JSON.stringify(val) === '{}';
  };
  const hasProperty = (ob, k) => {
    if (!ob || !k) {
      return false;
    }
    return Object.prototype.hasOwnProperty.call(ob, k);
  };

  const equals = (a, b) => {
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
      const as = [];
      const bs = [];
      for (const k1 in a) {
        if (hasProperty(a, k1)) {
          as.push(k1);
        }
      }
      for (const k2 in b) {
        if (hasProperty(b, k2)) {
          bs.push(k2);
        }
      }
      if (as.length !== bs.length) {
        return false;
      }
      for (const k in a) {
        if (!hasProperty(b, k) || !equals(a[k], b[k])) {
          re = false;
          break;
        }
      }
    }
    return re;
  };

  const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
  const randint = (min, max) => {
    if (!min || min < 0) {
      min = 0;
    }
    if (!max) {
      max = MAX_NUMBER;
    }
    if (min === max) {
      return max;
    }
    if (min > max) {
      min = Math.min(min, max);
      max = Math.max(min, max);
    }
    const offset = min;
    const range = max - min + 1;
    return Math.floor(Math.random() * range) + offset;
  };

  const toString = (input) => {
    const s = isNumber(input) ? String(input) : input;
    if (!isString(s)) {
      throw new Error('InvalidInput: String required.');
    }
    return s;
  };
  const truncate = (s, l) => {
    const o = toString(s);
    const t = l || 140;
    if (o.length <= t) {
      return o;
    }
    let x = o.substring(0, t);
    const a = x.split(' ');
    const b = a.length;
    let r = '';
    if (b > 1) {
      a.pop();
      r += a.join(' ');
      if (r.length < o.length) {
        r += '...';
      }
    } else {
      x = x.substring(0, t - 3);
      r = x + '...';
    }
    return r;
  };
  const stripTags = (s) => {
    const x = toString(s);
    return x.replace(/<.*?>/gi, ' ').replace(/\s\s+/g, ' ').trim();
  };
  const escapeHTML = (s) => {
    const x = toString(s);
    return x.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  const unescapeHTML = (s) => {
    const x = toString(s);
    return x.replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  };
  const ucfirst = (s) => {
    let x = toString(s);
    if (x.length === 1) {
      return x.toUpperCase();
    }
    x = x.toLowerCase();
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
  const ucwords = (s) => {
    const x = toString(s);
    const c = x.split(' ');
    const a = [];
    c.forEach((w) => {
      a.push(ucfirst(w));
    });
    return a.join(' ');
  };
  const replaceAll = (s, a, b) => {
    let x = toString(s);
    if (isNumber(a)) {
      a = String(a);
    }
    if (isNumber(b)) {
      b = String(b);
    }
    if (isString(a) && isString(b)) {
      const aa = x.split(a);
      x = aa.join(b);
    } else if (isArray(a) && isString(b)) {
      a.forEach((v) => {
        x = replaceAll(x, v, b);
      });
    } else if (isArray(a) && isArray(b) && a.length === b.length) {
      const k = a.length;
      if (k > 0) {
        for (let i = 0; i < k; i++) {
          const aaa = a[i];
          const bb = b[i];
          x = replaceAll(x, aaa, bb);
        }
      }
    }
    return x;
  };
  const stripAccent = (s) => {
    let x = toString(s);
    const map = {
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
      Y: 'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
    };
    const updateS = (ai, key) => {
      x = replaceAll(x, ai, key);
    };
    for (const key in map) {
      if (hasProperty(map, key)) {
        const a = map[key].split('|');
        a.forEach((item) => {
          return updateS(item, key);
        });
      }
    }
    return x;
  };
  const genid = (leng, prefix = '') => {
    const lc = 'abcdefghijklmnopqrstuvwxyz';
    const uc = lc.toUpperCase();
    const nb = '0123456789';
    const cand = [
      lc,
      uc,
      nb,
    ].join('').split('').sort(() => {
      return Math.random() > 0.5;
    }).join('');
    const t = cand.length;
    const ln = Math.max(leng || 32, prefix.length);
    let s = prefix;
    while (s.length < ln) {
      const k = randint(0, t);
      s += cand.charAt(k) || '';
    }
    return s;
  };
  const slugify = (s, delimiter) => {
    const x = stripAccent(s).trim();
    const d = delimiter || '-';
    return x.toLowerCase()
      .replace(/\W+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s/g, d);
  };

  const PATTERN = 'D, M d, Y  h:i:s A';
  const WEEKDAYS = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];
  const MONTHS = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];
  const now = () => {
    return new Date();
  };
  const time = () => {
    return Date.now();
  };
  const tzone = now().getTimezoneOffset();
  const tz = (() => {
    const z = Math.abs(tzone / 60);
    const sign = tzone < 0 ? '+' : '-';
    return ['GMT', sign, String(z).padStart(4, '0')].join('');
  })();
  const _num = (n) => {
    return String(n < 10 ? '0' + n : n);
  };
  const _ord = (day) => {
    let s = day + ' ';
    const x = s.charAt(s.length - 2);
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
  const format = (input, output = PATTERN) => {
    const d = isDate(input) ? input : new Date(input);
    if (!isDate(d)) {
      throw new Error('InvalidInput: Number or Date required.');
    }
    if (!isString(output)) {
      throw new Error('Invalid output pattern.');
    }
    const vchar = /\.*\\?([a-z])/gi;
    const meridiem = output.match(/(\.*)a{1}(\.*)*/i);
    const wn = WEEKDAYS;
    const mn = MONTHS;
    let f = {
      Y() {
        return d.getFullYear();
      },
      y() {
        return (f.Y() + '').slice(-2);
      },
      F() {
        return mn[f.n() - 1];
      },
      M() {
        return (f.F() + '').slice(0, 3);
      },
      m() {
        return _num(f.n());
      },
      n() {
        return d.getMonth() + 1;
      },
      S() {
        return _ord(f.j());
      },
      j() {
        return d.getDate();
      },
      d() {
        return _num(f.j());
      },
      t() {
        return new Date(f.Y(), f.n(), 0).getDate();
      },
      w() {
        return d.getDay();
      },
      l() {
        return wn[f.w()];
      },
      D() {
        return (f.l() + '').slice(0, 3);
      },
      G() {
        return d.getHours();
      },
      g() {
        return f.G() % 12 || 12;
      },
      h() {
        return _num(meridiem ? f.g() : f.G());
      },
      i() {
        return _num(d.getMinutes());
      },
      s() {
        return _num(d.getSeconds());
      },
      a() {
        return f.G() > 11 ? 'pm' : 'am';
      },
      A() {
        return f.a().toUpperCase();
      },
      O() {
        return tz;
      }
    };
    const _term = (t, s) => {
      return f[t] ? f[t]() : s;
    };
    return output.replace(vchar, _term);
  };
  const relativize = (input = time()) => {
    const d = isDate(input) ? input : new Date(input);
    if (!isDate(d)) {
      throw new Error('InvalidInput: Number or Date required.');
    }
    let delta = now() - d;
    let nowThreshold = parseInt(d, 10);
    if (isNaN(nowThreshold)) {
      nowThreshold = 0;
    }
    if (delta <= nowThreshold) {
      return 'Just now';
    }
    let units = null;
    const conversions = {
      millisecond: 1,
      second: 1000,
      minute: 60,
      hour: 60,
      day: 24,
      month: 30,
      year: 12,
    };
    for (const key in conversions) {
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
  const utc = (input = time()) => {
    const d = isDate(input) ? input : new Date(input);
    if (!isDate(d)) {
      throw new Error('InvalidInput: Number or Date required.');
    }
    const dMinutes = d.getMinutes();
    const dClone = new Date(d);
    dClone.setMinutes(dMinutes + tzone);
    return `${format(dClone, 'D, j M Y h:i:s')} GMT+0000`;
  };
  const local = (input = time()) => {
    const d = isDate(input) ? input : new Date(input);
    if (!isDate(d)) {
      throw new Error('InvalidInput: Number or Date required.');
    }
    return format(d, 'D, j M Y h:i:s O');
  };

  let md5 = (str) => {
    var k = [], i = 0;
    for(; i < 64; ){
      k[i] = 0|(Math.abs(Math.sin(++i)) * 4294967296);
    }
    var b, c, d, j,
        x = [],
        str2 = unescape(encodeURI(str)),
        a = str2.length,
        h = [b = 1732584193, c = -271733879, ~b, ~c],
        i = 0;
    for(; i <= a; ) x[i >> 2] |= (str2.charCodeAt(i)||128) << 8 * (i++ % 4);
    x[str = (a + 8 >> 6) * 16 + 14] = a * 8;
    i = 0;
    for(; i < str; i += 16){
      a = h; j = 0;
      for(; j < 64; ){
        a = [
          d = a[3],
          ((b = a[1]|0) +
            ((d = (
              (a[0] +
                [
                  b & (c = a[2]) | ~b&d,
                  d & b | ~d & c,
                  b ^ c ^ d,
                  c ^ (b | ~d)
                ][a = j >> 4]
              ) +
              (k[j] +
                (x[[
                  j,
                  5 * j + 1,
                  3 * j + 5,
                  7 * j
                ][a] % 16 + i]|0)
              )
            )) << (a = [
              7, 12, 17, 22,
              5,  9, 14, 20,
              4, 11, 16, 23,
              6, 10, 15, 21
            ][4 * a + j++ % 4]) | d >>> 32 - a)
          ),
          b,
          c
        ];
      }
      for(j = 4; j; ) h[--j] = h[j] + a[j];
    }
    str = '';
    for(; j < 32; ) str += ((h[j >> 3] >> ((1 ^ j++ & 7) * 4)) & 15).toString(16);
    return str;
  };

  const curry = (fn) => {
    const totalArguments = fn.length;
    const next = (argumentLength, rest) => {
      if (argumentLength > 0) {
        return (...args) => {
          return next(argumentLength - args.length, [...rest, ...args]);
        };
      }
      return fn(...rest);
    };
    return next(totalArguments, []);
  };
  const compose = (...fns) => {
    return fns.reduce((f, g) => (x) => f(g(x)));
  };
  const pipe = (...fns) => {
    return fns.reduce((f, g) => (x) => g(f(x)));
  };
  const clone = (val) => {
    if (isDate(val)) {
      return new Date(val.valueOf());
    }
    const copyObject = (o) => {
      const oo = Object.create({});
      for (const k in o) {
        if (hasProperty(o, k)) {
          oo[k] = clone(o[k]);
        }
      }
      return oo;
    };
    const copyArray = (a) => {
      return [...a].map((e) => {
        if (isArray(e)) {
          return copyArray(e);
        } else if (isObject(e)) {
          return copyObject(e);
        }
        return clone(e);
      });
    };
    if (isArray(val)) {
      return copyArray(val);
    }
    if (isObject(val)) {
      return copyObject(val);
    }
    return val;
  };
  const copies = (source, dest, matched = false, excepts = []) => {
    for (const k in source) {
      if (excepts.length > 0 && excepts.includes(k)) {
        continue;
      }
      if (!matched || matched && hasProperty(dest, k)) {
        const oa = source[k];
        const ob = dest[k];
        if (isObject(ob) && isObject(oa) || isArray(ob) && isArray(oa)) {
          dest[k] = copies(oa, dest[k], matched, excepts);
        } else {
          dest[k] = clone(oa);
        }
      }
    }
    return dest;
  };
  const unique = (arr = []) => {
    return [...new Set(arr)];
  };
  const sort = (fn, arr = []) => {
    return [...arr].sort(fn);
  };
  const sortBy = (key, order = 1, arr = []) => {
    return sort(arr, (m, n) => {
      return m[key] > n[key] ? order : (m[key] < n[key] ? (-1 * order) : 0);
    });
  };
  const shuffle = (arr = []) => {
    return sort(() => {
      return Math.random() > 0.5;
    }, [...arr]);
  };
  const pick = (count = 1, arr = []) => {
    const a = shuffle([...arr]);
    const mc = Math.max(1, count);
    const c = Math.min(mc, a.length - 1);
    return a.splice(0, c);
  };

  exports.clone = clone;
  exports.compose = compose;
  exports.copies = copies;
  exports.curry = curry;
  exports.equals = equals;
  exports.escapeHTML = escapeHTML;
  exports.format = format;
  exports.genid = genid;
  exports.hasProperty = hasProperty;
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isElement = isElement;
  exports.isEmail = isEmail;
  exports.isEmpty = isEmpty;
  exports.isFunction = isFunction;
  exports.isInteger = isInteger;
  exports.isLetter = isLetter;
  exports.isNull = isNull;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isUndefined = isUndefined;
  exports.local = local;
  exports.md5 = md5;
  exports.now = now;
  exports.pick = pick;
  exports.pipe = pipe;
  exports.randint = randint;
  exports.relativize = relativize;
  exports.replaceAll = replaceAll;
  exports.shuffle = shuffle;
  exports.slugify = slugify;
  exports.sort = sort;
  exports.sortBy = sortBy;
  exports.stripAccent = stripAccent;
  exports.stripTags = stripTags;
  exports.time = time;
  exports.truncate = truncate;
  exports.ucfirst = ucfirst;
  exports.ucwords = ucwords;
  exports.unescapeHTML = unescapeHTML;
  exports.unique = unique;
  exports.utc = utc;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
