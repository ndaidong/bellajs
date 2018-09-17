/**
 * bellajs@7.5.0
 * built on: Mon, 17 Sep 2018 08:14:14 GMT
 * repository: https://github.com/ndaidong/bellajs
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.bella = {})));
}(this, (function (exports) { 'use strict';
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
    let re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  };
  const isEmail = (val) => {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
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
  const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
  const random = (min, max) => {
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
    let offset = min;
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + offset;
  };
  const MAX_STRING = 1 << 28;
  const toString = (input) => {
    let s = isNumber(input) ? String(input) : input;
    if (!isString(s)) {
      throw new Error('InvalidInput: String required.');
    }
    return s;
  };
  const encode = (s) => {
    let x = toString(s);
    return encodeURIComponent(x);
  };
  const decode = (s) => {
    let x = toString(s);
    return decodeURIComponent(x.replace(/\+/g, ' '));
  };
  const trim = (s, all = false) => {
    let x = toString(s);
    x = x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
    if (x && all) {
      x = x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };
  const truncate = (s, l) => {
    let o = toString(s);
    let t = l || 140;
    if (o.length <= t) {
      return o;
    }
    let x = o.substring(0, t);
    let a = x.split(' ');
    let b = a.length;
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
    let x = toString(s);
    return trim(x.replace(/<.*?>/gi, ' ').replace(/\s\s+/g, ' '));
  };
  const escapeHTML = (s) => {
    let x = toString(s);
    return x.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };
  const unescapeHTML = (s) => {
    let x = toString(s);
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
    let x = toString(s);
    let c = x.split(' ');
    let a = [];
    c.forEach((w) => {
      a.push(ucfirst(w));
    });
    return a.join(' ');
  };
  const leftPad = (s, size = 2, pad = '0') => {
    let x = toString(s);
    return x.length >= size ? x : new Array(size - x.length + 1).join(pad) + x;
  };
  const rightPad = (s, size = 2, pad = '0') => {
    let x = toString(s);
    return x.length >= size ? x : x + new Array(size - x.length + 1).join(pad);
  };
  const repeat = (s, m) => {
    let x = toString(s);
    if (!isInteger(m) || m < 1) {
      return x;
    }
    if (x.length * m >= MAX_STRING) {
      throw new RangeError(`Repeat count must not overflow maximum string size.`);
    }
    let a = [];
    a.length = m;
    return a.fill(x, 0, m).join('');
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
      let aa = x.split(a);
      x = aa.join(b);
    } else if (isArray(a) && isString(b)) {
      a.forEach((v) => {
        x = replaceAll(x, v, b);
      });
    } else if (isArray(a) && isArray(b) && a.length === b.length) {
      let k = a.length;
      if (k > 0) {
        for (let i = 0; i < k; i++) {
          let aaa = a[i];
          let bb = b[i];
          x = replaceAll(x, aaa, bb);
        }
      }
    }
    return x;
  };
  const stripAccent = (s) => {
    let x = toString(s);
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
      Y: 'Ý|Ỳ|Ỷ|Ỹ|Ỵ',
    };
    let updateS = (ai, key) => {
      x = replaceAll(x, ai, key);
    };
    for (let key in map) {
      if (hasProperty(map, key)) {
        let a = map[key].split('|');
        a.forEach((item) => {
          return updateS(item, key);
        });
      }
    }
    return x;
  };
  const createId = (leng, prefix = '') => {
    let lc = 'abcdefghijklmnopqrstuvwxyz';
    let uc = lc.toUpperCase();
    let nb = '0123456789';
    let cand = [
      lc,
      uc,
      nb,
    ].join('').split('').sort(() => {
      return Math.random() > 0.5;
    }).join('');
    let t = cand.length;
    let ln = Math.max(leng || 32, prefix.length);
    let s = prefix;
    while (s.length < ln) {
      let k = random(0, t);
      s += cand.charAt(k) || '';
    }
    return s;
  };
  const createAlias = (s, delimiter) => {
    let x = trim(stripAccent(s));
    let d = delimiter || '-';
    return x.toLowerCase()
      .replace(/\W+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s/g, d);
  };
  const compile = (tpl, data) => {
    let ns = [];
    let c = (s, ctx, namespace) => {
      if (namespace) {
        ns.push(namespace);
      }
      let a = [];
      for (let k in ctx) {
        if (hasProperty(ctx, k)) {
          let v = ctx[k];
          if (isNumber(v)) {
            v = String(v);
          }
          if (isObject(v) || isArray(v)) {
            a.push({
              key: k,
              data: v,
            });
          } else if (isString(v)) {
            v = replaceAll(v, [
              '{',
              '}',
            ], [
              '&#123;',
              '&#125;',
            ]);
            let cns = ns.concat([k]);
            let r = new RegExp('{' + cns.join('.') + '}', 'gi');
            s = s.replace(r, v);
          }
        }
      }
      if (a.length > 0) {
        a.forEach((item) => {
          s = c(s, item.data, item.key);
        });
      }
      return trim(s, true);
    };
    if (data && (isString(data) || isObject(data) || isArray(data))) {
      return c(tpl, data);
    }
    return tpl;
  };
  const template = (tpl) => {
    return {
      compile: (data) => {
        return compile(tpl, data);
      },
    };
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
    let z = Math.abs(tzone / 60);
    let sign = tzone < 0 ? '+' : '-';
    return ['GMT', sign, leftPad(z, 4)].join('');
  })();
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
  let format = (input, output = PATTERN) => {
    let d = isDate(input) ? input : new Date(input);
    if (!isDate(d)) {
      throw new Error('InvalidInput: Number or Date required.');
    }
    if (!isString(output)) {
      throw new Error('Invalid output pattern.');
    }
    let vchar = /\.*\\?([a-z])/gi;
    let meridiem = output.match(/(\.*)a{1}(\.*)*/i);
    let wn = WEEKDAYS;
    let mn = MONTHS;
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
    let _term = (t, s) => {
      return f[t] ? f[t]() : s;
    };
    return output.replace(vchar, _term);
  };
  let relativize = (input = time()) => {
    let d = isDate(input) ? input : new Date(input);
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
    let conversions = {
      millisecond: 1,
      second: 1000,
      minute: 60,
      hour: 60,
      day: 24,
      month: 30,
      year: 12,
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
  let utc = (input = time()) => {
    let d = isDate(input) ? input : new Date(input);
    if (!isDate(d)) {
      throw new Error('InvalidInput: Number or Date required.');
    }
    let dMinutes = d.getMinutes();
    let dClone = new Date(d);
    dClone.setMinutes(dMinutes + tzone);
    return `${format(dClone, 'D, j M Y h:i:s')} GMT+0000`;
  };
  let local = (input = time()) => {
    let d = isDate(input) ? input : new Date(input);
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
    let totalArguments = fn.length;
    let next = (argumentLength, rest) => {
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
    let copyObject = (o) => {
      let oo = Object.create({});
      for (let k in o) {
        if (hasProperty(o, k)) {
          oo[k] = clone(o[k]);
        }
      }
      return oo;
    };
    let copyArray = (a) => {
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
    for (let k in source) {
      if (excepts.length > 0 && excepts.includes(k)) {
        continue;
      }
      if (!matched || matched && dest.hasOwnProperty(k)) {
        let oa = source[k];
        let ob = dest[k];
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
  exports.curry = curry;
  exports.compose = compose;
  exports.pipe = pipe;
  exports.clone = clone;
  exports.copies = copies;
  exports.unique = unique;
  exports.isNull = isNull;
  exports.isUndefined = isUndefined;
  exports.isFunction = isFunction;
  exports.isString = isString;
  exports.isNumber = isNumber;
  exports.isInteger = isInteger;
  exports.isArray = isArray;
  exports.isObject = isObject;
  exports.isBoolean = isBoolean;
  exports.isDate = isDate;
  exports.isElement = isElement;
  exports.isLetter = isLetter;
  exports.isEmail = isEmail;
  exports.isEmpty = isEmpty;
  exports.hasProperty = hasProperty;
  exports.equals = equals;
  exports.encode = encode;
  exports.decode = decode;
  exports.trim = trim;
  exports.truncate = truncate;
  exports.stripTags = stripTags;
  exports.escapeHTML = escapeHTML;
  exports.unescapeHTML = unescapeHTML;
  exports.ucfirst = ucfirst;
  exports.ucwords = ucwords;
  exports.leftPad = leftPad;
  exports.rightPad = rightPad;
  exports.repeat = repeat;
  exports.replaceAll = replaceAll;
  exports.stripAccent = stripAccent;
  exports.createId = createId;
  exports.createAlias = createAlias;
  exports.template = template;
  exports.random = random;
  exports.now = now;
  exports.time = time;
  exports.format = format;
  exports.relativize = relativize;
  exports.utc = utc;
  exports.local = local;
  exports.md5 = md5;
  Object.defineProperty(exports, '__esModule', { value: true });
})));
