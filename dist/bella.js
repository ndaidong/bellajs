/**
 * bellajs@7.1.2
 * built on: Mon, 07 Aug 2017 06:41:40 GMT
 * repository: https://github.com/ndaidong/bellajs
 * maintainer: @ndaidong
 * License: MIT
**/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.bella = {})));
}(this, (function (exports) { 'use strict';
  var md5 = function () {
    for (var m = [], l = 0; 64 > l;) {
      m[l] = 0 | 4294967296 * Math.abs(Math.sin(++l));
    }return function (c) {
      var e,
          g,
          f,
          a,
          h = [];c = unescape(encodeURI(c));for (var b = c.length, k = [e = 1732584193, g = -271733879, ~e, ~g], d = 0; d <= b;) {
        h[d >> 2] |= (c.charCodeAt(d) || 128) << 8 * (d++ % 4);
      }h[c = 16 * (b + 8 >> 6) + 14] = 8 * b;for (d = 0; d < c; d += 16) {
        b = k;for (a = 0; 64 > a;) {
          b = [f = b[3], (e = b[1] | 0) + ((f = b[0] + [e & (g = b[2]) | ~e & f, f & e | ~f & g, e ^ g ^ f, g ^ (e | ~f)][b = a >> 4] + (m[a] + (h[[a, 5 * a + 1, 3 * a + 5, 7 * a][b] % 16 + d] | 0))) << (b = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * b + a++ % 4]) | f >>> 32 - b), e, g];
        }for (a = 4; a;) {
          k[--a] = k[a] + b[a];
        }
      }for (c = ""; 32 > a;) {
        c += (k[a >> 3] >> 4 * (1 ^ a++ & 7) & 15).toString(16);
      }return c;
    };
  }();
  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  };
  var MAX_NUMBER = Number.MAX_SAFE_INTEGER;
  var MAX_STRING = 1 << 28;
  var ob2Str = function ob2Str(val) {
    return {}.toString.call(val);
  };
  var isNull = function isNull(val) {
    return ob2Str(val) === '[object Null]';
  };
  var isUndefined = function isUndefined(val) {
    return ob2Str(val) === '[object Undefined]';
  };
  var isFunction = function isFunction(val) {
    return ob2Str(val) === '[object Function]';
  };
  var isString = function isString(val) {
    return ob2Str(val) === '[object String]';
  };
  var isNumber = function isNumber(val) {
    return ob2Str(val) === '[object Number]';
  };
  var isInteger = function isInteger(val) {
    return Number.isInteger(val);
  };
  var isArray = function isArray(val) {
    return Array.isArray(val);
  };
  var isObject = function isObject(val) {
    return ob2Str(val) === '[object Object]' && !isArray(val);
  };
  var isBoolean = function isBoolean(val) {
    return val === true || val === false;
  };
  var isDate = function isDate(val) {
    return val instanceof Date && !isNaN(val.valueOf());
  };
  var isElement = function isElement(v) {
    return ob2Str(v).match(/^\[object HTML\w*Element]$/);
  };
  var isLetter = function isLetter(val) {
    var re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  };
  var isEmail = function isEmail(val) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isString(val) && re.test(val);
  };
  var isEmpty = function isEmpty(val) {
    return !val || isUndefined(val) || isNull(val) || isString(val) && val === '' || isArray(val) && JSON.stringify(val) === '[]' || isObject(val) && JSON.stringify(val) === '{}';
  };
  var hasProperty = function hasProperty(ob, k) {
    if (!ob || !k) {
      return false;
    }
    return Object.prototype.hasOwnProperty.call(ob, k);
  };
  var equals = function equals(a, b) {
    var re = true;
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
        for (var i = 0, l = a.length; i < l; i++) {
          if (!equals(a[i], b[i])) {
            re = false;
            break;
          }
        }
      }
    } else if (isObject(a) && isObject(b)) {
      var as = [];
      var bs = [];
      for (var k1 in a) {
        if (hasProperty(a, k1)) {
          as.push(k1);
        }
      }
      for (var k2 in b) {
        if (hasProperty(b, k2)) {
          bs.push(k2);
        }
      }
      if (as.length !== bs.length) {
        return false;
      }
      for (var k in a) {
        if (!hasProperty(b, k) || !equals(a[k], b[k])) {
          re = false;
          break;
        }
      }
    }
    return re;
  };
  var toString = function toString(input) {
    var s = isNumber(input) ? String(input) : input;
    if (!isString(s)) {
      throw new Error('InvalidInput: String required.');
    }
    return s;
  };
  var encode = function encode(s) {
    var x = toString(s);
    return encodeURIComponent(x);
  };
  var decode = function decode(s) {
    var x = toString(s);
    return decodeURIComponent(x.replace(/\+/g, ' '));
  };
  var trim = function trim(s) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var x = toString(s);
    x = x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
    if (x && all) {
      x = x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };
  var truncate = function truncate(s, l) {
    var o = toString(s);
    var t = l || 140;
    if (o.length <= t) {
      return o;
    }
    var x = o.substring(0, t);
    var a = x.split(' ');
    var b = a.length;
    var r = '';
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
  var stripTags = function stripTags(s) {
    var x = toString(s);
    return trim(x.replace(/<.*?>/gi, ' ').replace(/\s\s+/g, ' '));
  };
  var escapeHTML = function escapeHTML(s) {
    var x = toString(s);
    return x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var unescapeHTML = function unescapeHTML(s) {
    var x = toString(s);
    return x.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  };
  var ucfirst = function ucfirst(s) {
    var x = toString(s);
    if (x.length === 1) {
      return x.toUpperCase();
    }
    x = x.toLowerCase();
    return x.charAt(0).toUpperCase() + x.slice(1);
  };
  var ucwords = function ucwords(s) {
    var x = toString(s);
    var c = x.split(' ');
    var a = [];
    c.forEach(function (w) {
      a.push(ucfirst(w));
    });
    return a.join(' ');
  };
  var leftPad = function leftPad(s) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var pad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
    var x = toString(s);
    return x.length >= size ? x : new Array(size - x.length + 1).join(pad) + x;
  };
  var rightPad = function rightPad(s) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var pad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
    var x = toString(s);
    return x.length >= size ? x : x + new Array(size - x.length + 1).join(pad);
  };
  var repeat = function repeat(s, m) {
    var x = toString(s);
    if (!isInteger(m) || m < 1) {
      return x;
    }
    if (x.length * m >= MAX_STRING) {
      throw new RangeError('Repeat count must not overflow maximum string size.');
    }
    var a = [];
    a.length = m;
    return a.fill(x, 0, m).join('');
  };
  var replaceAll = function replaceAll(s, a, b) {
    var x = toString(s);
    if (isNumber(a)) {
      a = String(a);
    }
    if (isNumber(b)) {
      b = String(b);
    }
    if (isString(a) && isString(b)) {
      var aa = x.split(a);
      x = aa.join(b);
    } else if (isArray(a) && isString(b)) {
      a.forEach(function (v) {
        x = replaceAll(x, v, b);
      });
    } else if (isArray(a) && isArray(b) && a.length === b.length) {
      var k = a.length;
      if (k > 0) {
        for (var i = 0; i < k; i++) {
          var aaa = a[i];
          var bb = b[i];
          x = replaceAll(x, aaa, bb);
        }
      }
    }
    return x;
  };
  var stripAccent = function stripAccent(s) {
    var x = toString(s);
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
    };
    var updateS = function updateS(ai, key) {
      x = replaceAll(x, ai, key);
    };
    var _loop = function _loop(key) {
      if (hasProperty(map, key)) {
        var a = map[key].split('|');
        a.forEach(function (item) {
          return updateS(item, key);
        });
      }
    };
    for (var key in map) {
      _loop(key);
    }
    return x;
  };
  var createAlias = function createAlias(s, delimiter) {
    var x = trim(stripAccent(s));
    var d = delimiter || '-';
    return x.toLowerCase().replace(/\W+/g, ' ').replace(/\s+/g, ' ').replace(/\s/g, d);
  };
  var _compile = function _compile(tpl, data) {
    var ns = [];
    var c = function c(s, ctx, namespace) {
      if (namespace) {
        ns.push(namespace);
      }
      var a = [];
      for (var k in ctx) {
        if (hasProperty(ctx, k)) {
          var v = ctx[k];
          if (isNumber(v)) {
            v = String(v);
          }
          if (isObject(v) || isArray(v)) {
            a.push({
              key: k,
              data: v
            });
          } else if (isString(v)) {
            v = replaceAll(v, ['{', '}'], ['&#123;', '&#125;']);
            var cns = ns.concat([k]);
            var r = new RegExp('{' + cns.join('.') + '}', 'gi');
            s = s.replace(r, v);
          }
        }
      }
      if (a.length > 0) {
        a.forEach(function (item) {
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
  var template = function template(tpl) {
    return {
      compile: function compile(data) {
        return _compile(tpl, data);
      }
    };
  };
  var random = function random(min, max) {
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
    var offset = min;
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + offset;
  };
  var createId = function createId(leng) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var lc = 'abcdefghijklmnopqrstuvwxyz';
    var uc = lc.toUpperCase();
    var nb = '0123456789';
    var cand = [lc, uc, nb].join('').split('').sort(function () {
      return Math.random() > 0.5;
    }).join('');
    var t = cand.length;
    var ln = Math.max(leng || 32, prefix.length);
    var s = prefix;
    while (s.length < ln) {
      var k = random(0, t);
      s += cand.charAt(k) || '';
    }
    return s;
  };
  var clone = function clone(val) {
    if (isDate(val)) {
      return new Date(val.valueOf());
    }
    var copyObject = function copyObject(o) {
      var oo = Object.create({});
      for (var k in o) {
        if (hasProperty(o, k)) {
          oo[k] = clone(o[k]);
        }
      }
      return oo;
    };
    var copyArray = function copyArray(a) {
      return [].concat(toConsumableArray(a)).map(function (e) {
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
  var copies = function copies(source, dest) {
    var matched = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var excepts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    for (var k in source) {
      if (excepts.length > 0 && excepts.includes(k)) {
        continue;
      }
      if (!matched || matched && dest.hasOwnProperty(k)) {
        var oa = source[k];
        var ob = dest[k];
        if (isObject(ob) && isObject(oa) || isArray(ob) && isArray(oa)) {
          dest[k] = copies(oa, dest[k], matched, excepts);
        } else {
          dest[k] = clone(oa);
        }
      }
    }
    return dest;
  };
  var unique = function unique() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return [].concat(toConsumableArray(new Set(arr)));
  };
  var curry = function curry(fn) {
    var totalArguments = fn.length;
    var next = function next(argumentLength, rest) {
      if (argumentLength > 0) {
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return next(argumentLength - args.length, [].concat(toConsumableArray(rest), args));
        };
      }
      return fn.apply(undefined, toConsumableArray(rest));
    };
    return next(totalArguments, []);
  };
  var compose = function compose() {
    for (var _len2 = arguments.length, fns = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      fns[_key2] = arguments[_key2];
    }
    return fns.reduce(function (f, g) {
      return function (x) {
        return f(g(x));
      };
    });
  };
  var pipe = function pipe() {
    for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      fns[_key3] = arguments[_key3];
    }
    return fns.reduce(function (f, g) {
      return function (x) {
        return g(f(x));
      };
    });
  };
  var now = function now() {
    return new Date();
  };
  var time = function time() {
    return Date.now();
  };
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
  exports.toString = toString;
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
  exports.createAlias = createAlias;
  exports.template = template;
  exports.random = random;
  exports.createId = createId;
  exports.clone = clone;
  exports.copies = copies;
  exports.unique = unique;
  exports.curry = curry;
  exports.compose = compose;
  exports.pipe = pipe;
  exports.now = now;
  exports.time = time;
  exports.md5 = md5;
  Object.defineProperty(exports, '__esModule', { value: true });
})));
