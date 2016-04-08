/**
 * bellajs
 * @ndaidong
**/

/* eslint no-invalid-this: 0 */
/* eslint func-names: 0 */

(() => {

  var ENV = typeof module !== 'undefined' && module.exports ? 'node' : 'browser';

  var B = {
    ENV: ENV
  };

  var tof = (() => {
    var cache = {};
    return (obj) => {
      var key;
      return obj === null ? 'null'
        : (key = typeof obj) !== 'object' ? key
        : obj.nodeType ? 'object'
        : cache[key = {}.toString.call(obj)]
        || (cache[key] = key.slice(8, -1).toLowerCase());
    };
  })();

  var isDef = function(val) {
    return tof(val) !== 'undefined';
  };
  var isNull = function(val) {
    return tof(val) === null || val === null;
  };
  var isString = function(val) {
    return !isNull(val) && tof(val) === 'string';
  };
  var isNumber = function(val) {
    return val !== '' && !isNull(val) && isDef(val) && !isNaN(val) && tof(val) === 'number';
  };
  var isInteger = function(val) {
    return isNumber(val) && isFinite(val) && Math.floor(val) === val;
  };
  var isBoolean = function(val) {
    return val === true || val === false;
  };
  var isArray = function(val) {
    return !isNull(val) && tof(val) === 'array';
  };
  var isObject = function(val) {
    return !isNull(val) && tof(val) === 'object';
  };
  var isDate = function(val) {
    return val instanceof Date && !isNaN(val.valueOf());
  };
  var isFunction = function(val) {
    return !isNull(val) && tof(val) === 'function';
  };
  var isElement = function(val) {
    if (val && ENV === 'node' && val._root) {
      return true;
    }
    return !isNull(val) && tof(val) === 'element';
  };
  var isLetter = function(val) {
    var re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  };
  var isEmail = function(val) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isString(val) && re.test(val);
  };
  var isGeneratedKey = function(val) {
    var re = /^[A-Z0-9]+$/i;
    return isString(val) && re.test(val);
  };
  var isEmpty = function(val) {
    return !isDef(val) || isNull(val)
      || isString(val) && val === ''
      || isArray(val) && JSON.stringify(val) === '[]'
      || isObject(val) && JSON.stringify(val) === '{}';
  };
  var hasProperty = function(ob, k) {
    if (!ob || !k) {
      return false;
    }
    var r = true;
    if (!isDef(ob[k])) {
      r = k in ob;
    }
    return r;
  };
  var equals = function(a, b) {
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
      var as = [], bs = [];
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

  var createId = function(leng, prefix) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    chars += chars.toLowerCase();
    chars += '0123456789';
    var t = chars.length;
    var px = prefix || '';
    var ln = Math.max(leng || 32, px.length);
    var s = px;
    while (s.length < ln) {
      var k = Math.floor(Math.random() * t);
      s += chars.charAt(k) || '';
    }
    return s;
  };

  var random = function(min, max) {
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
    var offset = min;
    var range = max - min + 1;
    var rd = Math.floor(Math.random() * range) + offset;
    return rd;
  };

  var max = function(a) {
    return isArray(a) ? Math.max.apply({}, a) : a;
  };

  var min = function(a) {
    return isArray(a) ? Math.min.apply({}, a) : a;
  };

  var empty = function(a) {
    if (isArray(a)) {
      for (var i = a.length - 1; i >= 0; i--) {
        a[i] = null;
        delete a[i];
      }
      a.length = 0;
    } else if (isObject(a)) {
      for (var k in a) {
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

  var unique = function(a) {
    if (isArray(a)) {
      var r = [];
      for (var i = 0; i < a.length; i++) {
        if (r.indexOf(a[i]) === -1) {
          r.push(a[i]);
        }
      }
      return r;
    }
    return a || [];
  };

  var contains = function(a, el, key) {
    if (isArray(a)) {
      for (var i = 0; i < a.length; i++) {
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

  var first = function(a) {
    return a[0];
  };

  var last = function(a) {
    return a[a.length - 1];
  };

  var clone = function(obj) {
    if (!isObject(obj) && !isArray(obj) && !isDate(obj)) {
      return obj;
    }
    if (isDate(obj)) {
      var copy1 = new Date();
      copy1.setTime(obj.getTime());
      return copy1;
    }
    if (isArray(obj)) {
      var copy2 = [], arr = obj.slice(0);
      for (var i = 0, len = arr.length; i < len; ++i) {
        copy2[i] = clone(arr[i]);
      }
      return copy2;
    }
    if (isObject(obj)) {
      var copy = {};
      for (var attr in obj) {
        if (attr === 'clone') {
          continue;
        }
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = clone(obj[attr]);
        }
      }
      return copy;
    }
    return obj;
  };

  var copies = function(from, to, matched, excepts) {
    var mt = matched || false;
    var ex = excepts || [];
    for (var k in from) {
      if (ex.length > 0 && contains(ex, k)) {
        continue;
      }
      if (!mt || mt && to.hasOwnProperty(k)) {
        var oa = from[k];
        var ob = to[k];
        if (isObject(ob) && isObject(oa) || isArray(ob) && isArray(oa)) {
          to[k] = copies(oa, to[k], mt, ex);
        } else {
          to[k] = oa;
        }
      }
    }
    return to;
  };

  var sort = function(arr, opts) {
    var a = [];
    var one = {};
    var o = opts || 1;
    if (isArray(arr) && arr.length > 0) {
      a = clone(arr);
      one = a[0];
      if (o === 1 || o === -1) {
        a.sort((m, n) => {
          return m > n ? o : m < n ? -1 * o : 0;
        });
      } else if (isString(o) && hasProperty(one, o)) {
        a.sort((m, n) => {
          return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0;
        });
      } else if (isObject(o)) {
        for (var key in o) {
          if (hasProperty(one, key)) {
            var order = o[key] === -1 ? -1 : 1;
            /*eslint-disable*/
            a.sort(function(m, n) {
              return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
            });
            /*eslint-enable*/
          }
        }
      }
    }
    return a;
  };

  var shuffle = function(arr) {
    var a = clone(arr);
    var j, x, i;
    for (i = a.length - 1; i >= 0; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
    return a;
  };

  var pick = function(arr, count) {
    var c = count ? Math.min(count, arr.length) : 1;
    if (c < 1) {
      c = 1;
    }
    if (c >= arr.length) {
      return arr;
    }
    if (c === 1) {
      var ri = random(0, arr.length - 1);
      return arr[ri];
    }
    var ab = [], ba = clone(arr);
    while (ab.length < c) {
      var i = random(0, ba.length - 1);
      ab.push(ba[i]);
      ba.splice(i, 1);
    }
    return ab;
  };

  var debounce = function(fn, wait, immediate) {
    var timeout;
    return function() {
      var self = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) {
          fn.call(self, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);
      if (callNow) {
        fn.call(self, args);
      }
    };
  };

  var throttle = function(fn, wait) {
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

  var encode = function(s) {
    return isString(s) ? encodeURIComponent(s) : '';
  };

  var decode = function(s) {
    return isString(s) ? decodeURIComponent(s.replace(/\+/g, ' ')) : '';
  };

  var trim = function(s, all) {
    if (!isString(s)) {
      return '';
    }
    var x = s ? s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : s || '';
    if (x && all) {
      return x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };

  var truncate = function(s, l) {
    s = trim(s);
    if (!s) {
      return s;
    }
    var t = l || 140;
    if (s.length <= t) {
      return s;
    }
    var x = s.substring(0, t);
    var a = x.split(' '), b = a.length, r = '';
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

  var stripTags = function(s) {
    if (!isString(s)) {
      return '';
    }
    var r = s.replace(/<.*?>/gi, ' ');
    if (r) {
      r = trim(r.replace(/\s\s+/g, ' '));
    }
    return r;
  };

  var escapeHTML = function(s) {
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  var unescapeHTML = function(s) {
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  };

  var strtolower = function(s) {
    return isString(s) ? s.toLowerCase() : '';
  };

  var strtoupper = function(s) {
    return isString(s) ? s.toUpperCase() : '';
  };

  var ucfirst = function(s) {
    if (!isString(s)) {
      return '';
    }
    if (s.length === 1) {
      return s.toUpperCase();
    }
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  var ucwords = function(s) {
    if (!isString(s)) {
      return '';
    }
    var c = s.split(' '), a = [];
    c.forEach(function(w) {
      a.push(ucfirst(w));
    });
    return a.join(' ');
  };

  var leftPad = function(s, size, spad) {
    var o = String(s);
    var z = size || 2;
    var g = spad || '0';
    return o.length >= z ? o : new Array(z - o.length + 1).join(g) + o;
  };

  var rightPad = function(s, size, spad) {
    var o = String(s);
    var z = size || 2;
    var g = spad || '0';
    return o.length >= z ? o : o + new Array(z - o.length + 1).join(g);
  };

  var replaceAll = function(s, a, b) {
    if (!isString(s)) {
      return '';
    }
    if (isNumber(a)) {
      a = String(a);
    }
    if (isNumber(b)) {
      b = String(b);
    }
    if (isString(a) && isString(b)) {
      var aa = s.split(a);
      s = aa.join(b);
    } else if (isArray(a) && isString(b)) {
      a.forEach(function(v) {
        s = replaceAll(s, v, b);
      });
    } else if (isArray(a) && isArray(b) && a.length === b.length) {
      var k = a.length;
      if (k > 0) {
        for (var i = 0; i < k; i++) {
          var aaa = a[i], bb = b[i];
          s = replaceAll(s, aaa, bb);
        }
      }
    }
    return s;
  };
  var stripAccent = function(s) {
    if (!isString(s)) {
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
    };
    for (var key in map) {
      if (hasProperty(map, key)) {
        var a = map[key].split('|');
        for (var i = 0; i < a.length; i++) {
          s = replaceAll(s, a[i], key);
        }
      }
    }
    return s;
  };

  var createAlias = function(s, delimiter) {
    s = String(s);
    var x = stripAccent(s);
    if (x) {
      var d = delimiter || '-';
      x = strtolower(x);
      x = trim(x);
      x = x.replace(/\W+/g, ' ');
      x = x.replace(/\s+/g, ' ');
      x = x.replace(/\s/g, d);
    }
    return x;
  };

  var template = function(tpl, data) {
    var ns = [];
    var compile = function(s, ctx, namespace) {
      if (namespace) {
        ns.push(namespace);
      }
      var a = [];
      for (var k in ctx) {
        if (hasProperty(ctx, k)) {
          var v = ctx[k];
          if (isObject(v) || isArray(v)) {
            a.push({
              key: k,
              data: v
            });
          } else if (isString(v)) {
            v = replaceAll(v, [ '{', '}' ], [ '&#123;', '&#125;' ]);
            var cns = ns.concat([ k ]);
            var r = new RegExp('{' + cns.join('.') + '}', 'gi');
            s = s.replace(r, v);
          }
        }
      }
      if (a.length > 0) {
        a.forEach(function(item) {
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
  B.replaceAll = replaceAll;
  B.stripAccent = stripAccent;
  B.createAlias = createAlias;
  B.template = template;

  var now = function now() {
    return new Date();
  };

  var time = function time() {
    return now().getTime();
  };

  (function() {
    var pattern = 'D, M d, Y  h:i:s A';
    var weeks = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    var months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    var tz = (function() {
      var t = new Date().getTimezoneOffset();
      var z = Math.abs(t / 60);
      var sign = t < 0 ? '+' : '-';
      return [ 'GMT', sign, leftPad(z, 2) ].join('');
    })();

    var format = function format(output, input) {
      var meridiem = false;
      var d, f, vchar = /\.*\\?([a-z])/gi;
      if (!input) {
        input = time();
      } else {
        input = new Date(input).getTime();
      }
      if (!output) {
        output = pattern;
      }

      if (output.match(/(\.*)a{1}(\.*)*/i)) {
        meridiem = true;
      }

      var wn = weeks;
      var mn = months;
      var _num = function _num(n) {
        return String(n < 10 ? '0' + n : n);
      };
      var _ord = function _ord(day) {
        var s = day + ' ', x = s.charAt(s.length - 2);
        if (x === '1') {
          s += 'st';
        } else if (x === '2') {
          s += 'nd';
        } else if (x === '3') {
          s += 'rd';
        } else {
          s += 'th';
        }
        return s;
      };

      var _term = function _term(t, s) {
        return f[t] ? f[t]() : s;
      };

      d = input instanceof Date ? input : new Date(input);

      if (isNaN(d.getTime())) {
        var reg = /^(\d+-\d+-\d+)\s(\d+:\d+:\d+)$/i;
        if (reg.test(input)) {
          d = new Date(input.replace(' ', 'T'));
        } else {
          return input + ' !';
        }
      }

      /*eslint-disable */
      f = {
        Y: function Y() {
          return d.getFullYear();
        }, // 2015
        y: function y() {
          return (f.Y() + '').slice(-2);
        }, // 15
        F: function F() {
          return mn[f.n() - 1];
        }, // August
        M: function M() {
          return (f.F() + '').slice(0, 3);
        }, // Aug
        m: function m() {
          return _num(f.n());
        }, // 08
        n: function n() {
          return d.getMonth() + 1;
        }, // 8
        S: function S() {
          return _ord(f.j());
        }, // 1st, 2nd, 3rd, 4th
        j: function j() {
          return d.getDate();
        }, // 3
        d: function d() {
          return _num(f.j());
        }, // 03
        t: function t() {
          return new Date(f.Y(), f.n(), 0).getDate();
        }, // date in year
        w: function w() {
          return d.getDay();
        }, // weekday in number
        l: function l() {
          return wn[f.w()];
        }, // Sunday, Monday
        D: function D() {
          return (f.l() + '').slice(0, 3);
        }, // Sun, Mon
        G: function G() {
          return d.getHours();
        }, // 0 - 24
        g: function g() {
          return f.G() % 12 || 12;
        }, // 0 - 12
        h: function h() {
          return _num(meridiem ? f.g() : f.G());
        }, // 00 - 12 or 00 - 24
        i: function i() {
          return _num(d.getMinutes());
        }, // 00 - 59
        s: function s() {
          return _num(d.getSeconds());
        }, // 00 - 59
        a: function a() {
          return f.G() > 11 ? 'pm' : 'am';
        }, // am, pm
        A: function A() {
          return f.a().toUpperCase();
        }, // AM, PM
        O: function O() {
          return tz;
        }
      };
      /*eslint-enable */
      return output.replace(vchar, _term);
    };

    var relativize = function relativize(input) {
      var t = input instanceof Date ? input : new Date(input);
      var delta = new Date() - t;
      var nowThreshold = parseInt(t, 10);
      if (isNaN(nowThreshold)) {
        nowThreshold = 0;
      }
      if (delta <= nowThreshold) {
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
      };
      for (var key in conversions) {
        if (delta < conversions[key]) {
          break;
        } else {
          units = key;
          delta = delta / conversions[key];
        }
      }
      delta = Math.floor(delta);
      if (delta !== 1) {
        units += 's';
      }
      return [ delta, units ].join(' ') + ' ago';
    };

    var utc = function utc(t) {
      return new Date(t || now()).toUTCString();
    };

    var local = function local(t) {
      return format('D, j M Y h:i:s O', t);
    };

    var strtotime = function strtotime(t) {
      return new Date(t).getTime();
    };

    B.now = now;
    B.time = time;

    B.date = {
      utc: utc,
      local: local,
      strtotime: strtotime,
      format: format,
      relativize: relativize
    };

  })();

  (function() {

    // for browser only
    if (ENV !== 'browser') {
      return false;
    }

    var _getElement, _addElement, _createElement, _query, _queryAll;

    _getElement = function(el) {
      var p = (isString(el) ? document.getElementById(el) : el) || null;
      if (p && isElement(p)) {
        p.hasClass = function(c) {
          var r = true, e = p.className.split(' '); c = c.split(' ');
          for (var i = 0; i < c.length; i++) {
            if (e.indexOf(c[i]) === -1) {
              r = false;
              break;
            }
          }
          return r;
        };
        p.addClass = function(c) {
          c = c.split(' ');
          var t = p.className.split(' ');
          var nc = c.concat(t);
          var sc = unique(nc);
          p.className = sc.join(' ');
          return p;
        };
        p.removeClass = function(c) {
          var e = p.className.split(' '); c = c.split(' ');
          for (var i = 0; i < c.length; i++) {
            if (p.hasClass(c[i])) {
              e.splice(e.indexOf(c[i]), 1);
            }
          }
          p.className = e.join(' ');
          return p;
        };
        p.toggleClass = function(c) {
          if (p.hasClass(c)) {
            p.removeClass(c);
          } else {
            p.addClass(c);
          }
          return p;
        };
        p.empty = function() {
          p.innerHTML = '';
          return p;
        };
        p.html = function(s) {
          if (s !== '' && isEmpty(s)) {
            return p.innerHTML;
          }
          p.innerHTML = s;
          return p;
        };
        p.destroy = function() {
          if (p.parentNode) {
            p.parentNode.removeChild(p);
          }
        };
      }
      return p;
    };

    _addElement = function(tag, parent) {
      var p = parent ? _getElement(parent) : document.body;
      var d = isElement(tag) ? tag : document.createElement(tag);
      p.appendChild(d);
      return _getElement(d);
    };

    _createElement = function(tag) {
      return _getElement(document.createElement(tag));
    };

    _query = function(condition) {
      var el, tmp = document.querySelector(condition);
      if (tmp) {
        el = _getElement(tmp);
      }
      return el;
    };

    _queryAll = function(condition) {
      var els = [], tmp = document.querySelectorAll(condition);
      if (tmp) {
        for (var i = 0; i < tmp.length; i++) {
          els.push(_getElement(tmp[i]));
        }
      }
      return els;
    };

    /*eslint-disable*/
    /** domready (c) Dustin Diaz 2014 - License MIT */
    var onready = (function() {
      var fns = [], listener, doc = document,
        hack = doc.documentElement.doScroll,
        domContentLoaded = 'DOMContentLoaded',
        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
      if (!loaded) {
        doc.addEventListener(domContentLoaded, listener = () => {
          doc.removeEventListener(domContentLoaded, listener);
          loaded = 1;
          while(listener = fns.shift()) {
            listener();
          }
        });
      }
      return function(fn) {
        loaded ? setTimeout(fn, 0) : fns.push(fn)
      }
    })();

    /*eslint-enable*/

    B.dom = {
      ready: onready,
      one: _query,
      all: _queryAll,
      get: _getElement,
      add: _addElement,
      create: _createElement
    };

    B.hostname = (() => {
      var atag = _createElement('A');
      atag.href = document.URL;
      var loc = atag.hostname;
      atag.destroy();
      return loc;
    })();

    var isGecko = ((ua) => {
      var n = ua.toLowerCase();
      return /gecko/i.test(n);
    })(navigator.userAgent);

    B.event = (function() {

      return {
        on: function(element, event, callback) {
          if (event === 'wheel') {
            event = isGecko ? 'DOMMouseScroll' : 'mousewheel';
          }
          var el = isString(element) ? _getElement(element) : element;
          var fn = () => {};
          var cb = callback || fn;

          if (el.addEventListener) {
            el.addEventListener(event, cb, false);
          } else if (el.attachEvent) {
            el.attachEvent('on' + event, cb);
          }
        },
        off: function(element, event, callback) {
          var el = isString(element) ? _getElement(element) : element;
          if (el.removeEventListener) {
            el.removeEventListener(event, callback, false);
          } else if (el.detachEvent) {
            el.detachEvent('on' + event, callback);
          }
        },
        simulate: function(element, event) {
          var evt, el = isString(element) ? _getElement(element) : element;
          if (document.createEventObject) {
            evt = document.createEventObject();
            el.fireEvent('on' + event, evt);
          } else {
            evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            el.dispatchEvent(evt);
          }
        },
        stop: function(e) {
          e.cancelBubble = true;
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          if (e.preventDefault) {
            e.preventDefault();
          }
          return false;
        },
        detect: function(e) {
          var evt = e || window.event;
          var targ = evt.target || evt.srcElement;
          if (targ && targ.nodeType === 3) {
            targ = targ.parentNode;
          }
          return _getElement(targ);
        }
      };
    })();

    B.getMousePosition = function(ev) {
      var e = ev || window.event;
      var cursor = {
        x: 0,
        y: 0
      };
      if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
      } else {
        var de = document.documentElement;
        var db = document.body;
        cursor.x = e.clientX + (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY + (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
      }
      return cursor;
    };

    B.getWindowSize = function() {
      var w = 0, h = 0;
      if (window.innerWidth) {
        w = window.innerWidth;
        h = window.innerHeight;
      } else if (document.documentElement && document.documentElement.clientWidth) {
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
      } else if (document.body) {
        w = document.body.clientWidth;
        h = document.body.clientHeight;
      }
      return {
        width: w,
        height: h
      };
    };

    var setCookie = function(name, value, expires, domain, path) {
      var cdata = false;

      var parse = function(ob) {

        var tmp = [];
        var _name = ob.name || '';
        var _val = ob.value;
        var _exp = ob.expires || false;
        var _pat = ob.path || '/';
        var _dom = ob.domain || false;

        if (_name) {
          var iss = !isObject(_val) && !isArray(_val);
          var vx = iss ? _val : JSON.stringify(_val);
          var arr = [
            [ _name, isString(vx) ? encodeURIComponent(vx) : vx ],
            [ 'path', _pat ]
          ];
          if (_dom) {
            arr.push([ 'domain', _dom ]);
          }

          if (_exp && _exp.length && _exp.match(/(w|d|h|m|s)/gi)) {
            var v = parseInt(_exp, 10);
            var s = _exp.replace(v, '');
            var delta = 0;
            if (s === 's') {
              delta = 1;
            } else if (s === 'm') {
              delta = 60;
            } else if (s === 'h') {
              delta = 60 * 60;
            } else if (s === 'd') {
              delta = 60 * 60 * 24;
            } else if (s === 'w') {
              delta = 7 * 60 * 60 * 24;
            }
            var ms = delta * v * 1000;
            if (isInteger(ms)) {
              var d = new Date();
              var t = d.getTime() + ms;
              d.setTime(t);
              arr.push([ 'expires', d.toUTCString() ]);
            }
          }
          arr.forEach(function(item) {
            tmp.push(item.join('='));
          });
        }
        return tmp.join('; ');
      };

      if (isObject(name)) {
        cdata = parse(name);
      } else {
        cdata = parse({
          name: name,
          value: value,
          path: path || false,
          expires: expires || false,
          domain: domain || false
        });
      }
      if (cdata) {
        document.cookie = cdata;
      }
    };

    var getCookie = function(name) {
      if (document.cookie) {
        var a = document.cookie.split(';');
        var n = trim(name);
        for (var i = 0; i < a.length; i++) {
          var t = a[i], ac = t.split('='), x = trim(ac[0]);
          if (x === n) {
            return decodeURIComponent(ac[1]);
          }
        }
      }
      return null;
    };
    var unsetCookie = function(name) {
      setCookie(name, '', '-1d');
    };
    B.cookie = {
      set: setCookie,
      get: getCookie,
      unset: unsetCookie
    };

    return null;
  })();

  (() => {

    var TaskList = [];
    var pattern = 'Y m d h i s';
    var checkTimer;

    var compare = function(task, sysTime, sysDay, currTime) {

      var taskTime = task.time, beginAt = Math.round(task.at / 1000);

      if (taskTime.match(/^(sun|mon|tue|wed|thu|fri|sat)+(\w+)?(\s+)+(\d+(:\d)?)+$/gi)) {
        var a = taskTime.split(' ');
        var yes = false;
        if (a.length > 1) {

          var day = trim(a[0]), _time = trim(a[1]);

          if (sysDay.match(new RegExp(day, 'gi'))) {

            var a2 = _time.split(':');
            if (a2.length === 1) {
              a2 = a2.concat([ '00', '00' ]);
            }
            if (a2.length === 2) {
              a2 = a2.concat([ '00' ]);
            }

            var a3 = sysTime.split(' ').slice(3, 6);

            yes = true;
            for (var i = 0; i < a3.length; i++) {
              if (parseInt(a3[i], 10) !== parseInt(a2[i], 10)) {
                yes = false;
                break;
              }
            }
          }
        }
        return yes;
      } else if (taskTime.match(/(d|h|m|s)/gi)) {

        var v = parseInt(taskTime, 10);
        var s = taskTime.replace(v, '');

        var delta = 0;

        if (s === 's') {
          delta = 1;
        } else if (s === 'm') {
          delta = 60;
        } else if (s === 'h') {
          delta = 60 * 60;
        } else if (s === 'd') {
          delta = 60 * 60 * 24;
        }

        delta *= v;
        var sdur = currTime - beginAt;
        return delta > 0 && sdur % delta === 0;
      }

      var a1 = taskTime.split(' '), a21 = sysTime.split(' '), s1 = '', s2 = '';

      for (var j = 0; j < a1.length; j++) {
        if (a1[j] === '*') {
          a21[j] = '*';
        }
        s1 += a1[j];
        s2 += a21[j];
      }
      return s1 === s2;
    };

    var check = function() {

      var gt = time(), ggt = Math.round(gt / 1000);
      var sysTime = B.date.format(pattern, gt);
      var sysDay = B.date.format('l', gt);

      if (TaskList.length > 0) {
        for (var i = TaskList.length - 1; i >= 0; i--) {
          var t = TaskList[i];
          if (compare(t, sysTime, sysDay, ggt)) {
            t.fn();
            if (!t.repeat) {
              TaskList.splice(i, 1);
            }
          }
        }
      } else {
        clearInterval(checkTimer);
        checkTimer = null;
      }
    };

    var register = function(t, fn, single) {
      var ot = single || false;
      TaskList.push({
        fn: fn,
        time: t,
        at: time(),
        repeat: !ot
      });

      if (!checkTimer) {
        checkTimer = setInterval(check, 1000);
      }
    };

    B.scheduler = {
      yearly: function(t, fn) {
        var pt = '* ' + t;
        register(pt, fn);
      },
      monthly: function(t, fn) {
        var pt = '* * ' + t;
        register(pt, fn);
      },
      daily: function(t, fn) {
        var pt = '* * * ' + t;
        register(pt, fn);
      },
      hourly: function(t, fn) {
        var pt = '* * * * ' + t;
        register(pt, fn);
      },
      every: function(t, fn) {
        register(t, fn);
      },
      once: function(t, fn) {
        register(t, fn, true);
      }
    };
  })();

  // exports
  if (ENV === 'node') {
    module.exports = B;
  } else {
    var root = window || {};
    if (root.define && root.define.amd) {
      root.define(() => {
        return B;
      });
    }
    root.Bella = B;
  }
})();
