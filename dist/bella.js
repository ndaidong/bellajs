/**
 * bellajs
 * v6.3.22
 * built: Tue, 15 Nov 2016 16:00:29 GMT
 * git: https://github.com/ndaidong/bellajs
 * author: @ndaidong
 * License: MIT
**/

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function (name, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    var root = window || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('Bella', function () {

  var MAX_NUMBER = Number.MAX_SAFE_INTEGER;

  var UNDEF = undefined;

  var ENV = (typeof module === 'undefined' ? 'undefined' : _typeof(module)) !== UNDEF && module.exports ? 'node' : 'browser';

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

  var isElement = function isElement(val) {
    if (val && ENV === 'node' && val._root) {
      return true;
    }
    return ob2Str(val).match(/^\[object HTML\w*Element]$/);
  };

  var isLetter = function isLetter(val) {
    var re = /^[a-z]+$/i;
    return isString(val) && re.test(val);
  };

  var isEmail = function isEmail(val) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isString(val) && re.test(val);
  };

  var isGeneratedKey = function isGeneratedKey(val) {
    var re = /^[A-Z0-9]+$/i;
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

  var encode = function encode(s) {
    return isString(s) ? encodeURIComponent(s) : '';
  };

  var decode = function decode(s) {
    return isString(s) ? decodeURIComponent(s.replace(/\+/g, ' ')) : '';
  };

  var trim = function trim(s, all) {
    if (!isString(s)) {
      return '';
    }
    var x = s ? s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : s || '';
    if (x && all) {
      return x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
    }
    return x;
  };

  var truncate = function truncate(s, l) {
    s = trim(s);
    if (!s) {
      return s;
    }
    var t = l || 140;
    if (s.length <= t) {
      return s;
    }
    var x = s.substring(0, t);
    var a = x.split(' ');
    var b = a.length;
    var r = '';
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

  var stripTags = function stripTags(s) {
    if (!isString(s)) {
      return '';
    }
    var r = s.replace(/<.*?>/gi, ' ');
    if (r) {
      r = trim(r.replace(/\s\s+/g, ' '));
    }
    return r;
  };

  var escapeHTML = function escapeHTML(s) {
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  var unescapeHTML = function unescapeHTML(s) {
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  };

  var ucfirst = function ucfirst(s) {
    if (!isString(s)) {
      return '';
    }
    if (s.length === 1) {
      return s.toUpperCase();
    }
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  var ucwords = function ucwords(s) {
    if (!isString(s)) {
      return '';
    }
    var c = s.split(' ');
    var a = [];
    c.forEach(function (w) {
      a.push(ucfirst(w));
    });
    return a.join(' ');
  };

  var leftPad = function leftPad(s) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var pad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

    var o = String(s);
    return o.length >= size ? o : new Array(size - o.length + 1).join(pad) + o;
  };

  var rightPad = function rightPad(s) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var pad = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

    var o = String(s);
    return o.length >= size ? o : o + new Array(size - o.length + 1).join(pad);
  };

  var repeat = function repeat(s, m) {
    if (!s || !isString(s)) {
      return '';
    }
    if (!isInteger(m) || m < 1) {
      return s;
    }
    var a = [];
    a.length = m;
    return a.fill(s, 0, m).join('');
  };

  var genkey = function genkey() {
    return Math.random().toString(36).slice(2);
  };

  var createId = function createId(leng) {
    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    var a = [];
    while (a.length < 10) {
      a.push(genkey());
    }
    var r = a.join('');
    var t = r.length;
    var ln = Math.max(leng || 32, prefix.length);
    var s = prefix;
    while (s.length < ln) {
      var k = Math.floor(Math.random() * t);
      s += r.charAt(k) || '';
    }
    return s;
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
      var aa = [].concat(_toConsumableArray(a));
      var ba = [];
      aa.forEach(function (e) {
        if (isArray(e)) {
          ba.push(copyArray(e));
        } else if (isObject(e)) {
          ba.push(copyObject(e));
        } else {
          ba.push(clone(e));
        }
      });
      return ba;
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

  var stabilize = function () {

    var astabilize = function astabilize(data) {

      var a = clone(data);

      var unique = function unique() {
        var arr = [].concat(_toConsumableArray(a));
        var r = [];
        for (var i = 0; i < arr.length; i++) {
          if (r.indexOf(arr[i]) === -1) {
            r.push(arr[i]);
          }
        }
        return stabilize(r);
      };

      var min = function min() {
        return Math.min.apply({}, a);
      };

      var max = function max() {
        return Math.max.apply({}, a);
      };

      var first = function first() {
        var r = [].concat(_toConsumableArray(a))[0];
        return stabilize(r);
      };

      var last = function last() {
        var r = [].concat(_toConsumableArray(a))[a.length - 1];
        return stabilize(r);
      };

      var insert = function insert() {
        var _ref;

        for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          items[_key - 1] = arguments[_key];
        }

        var at = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var r = [].concat(_toConsumableArray(a));
        var p0 = r.slice(0, at);
        var p1 = r.slice(at, r.length);
        return stabilize((_ref = []).concat.apply(_ref, [p0].concat(items, [p1])));
      };

      var append = function append() {
        for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        return insert(a.length, items);
      };

      var remove = function remove() {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var r = [].concat(_toConsumableArray(a.slice(0, start)), _toConsumableArray(a.slice(start + count)));
        return stabilize(r);
      };

      var isort = function isort(fn) {
        var r = [].concat(_toConsumableArray(a)).sort(fn);
        return stabilize(r);
      };

      var msort = function msort() {
        var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var r = [].concat(_toConsumableArray(a));
        var one = r[0];
        if (o === 1 || o === -1) {
          r.sort(function (m, n) {
            return m > n ? o : m < n ? -1 * o : 0;
          });
        }
        if (isString(o) && hasProperty(one, o)) {
          r.sort(function (m, n) {
            return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0;
          });
        }
        if (isObject(o)) {
          var _loop = function _loop(key) {
            if (hasProperty(one, key)) {
              (function () {
                var order = o[key] === -1 ? -1 : 1;

                r.sort(function (m, n) {
                  return m[key] > n[key] ? order : m[key] < n[key] ? -1 * order : 0;
                });
              })();
            }
          };

          for (var key in o) {
            _loop(key);
          }
        }
        return stabilize(r);
      };

      var ireverse = function ireverse() {
        var r = [].concat(_toConsumableArray(a)).reverse();
        return stabilize(r);
      };

      var shuffle = function shuffle() {
        return isort(function () {
          return Math.random() - 0.5;
        });
      };

      var pick = function pick() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var b = a.shuffle();
        var c = Math.max(Math.min(count, b.length), 1);
        if (c >= b.length) {
          return b;
        }

        if (c === 1) {
          var ri = random(0, b.length - 1);
          return b[ri];
        }

        return stabilize(b.splice(0, c));
      };

      var addMethods = function addMethods(met) {
        Object.defineProperty(a, met[0], {
          enumerable: false,
          configurable: false,
          writable: false,
          value: met[1]
        });
      };

      [['min', min], ['max', max], ['unique', unique], ['first', first], ['last', last], ['pick', pick], ['insert', insert], ['append', append], ['remove', remove], ['isort', isort], ['msort', msort], ['ireverse', ireverse], ['shuffle', shuffle]].map(addMethods);

      return a;
    };

    var ostabilize = function ostabilize(data) {

      var o = Object.create({});

      var config = {
        enumerable: true,
        configurable: false,
        writable: false,
        value: 'undefined'
      };

      var setProp = function setProp(key) {
        var c = Object.assign({}, config);
        c.value = data[key];
        Object.defineProperty(o, key, c);
      };

      Object.keys(data).map(setProp);

      Object.defineProperty(o, 'get', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value(k) {
          return o[k];
        }
      });

      Object.defineProperty(o, 'set', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function value(key) {
          var _value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          var a = Object.assign({}, o);
          var _set = function _set(k, v) {
            a[k] = v;
          };
          if (isObject(key)) {
            Object.keys(key).forEach(function (k) {
              _set(k, key[k]);
            });
          } else {
            _set(key, _value);
          }
          return stabilize(a);
        }
      });

      return o;
    };

    return function (data) {
      if (isArray(data)) {
        return astabilize(data);
      }
      if (isObject(data)) {
        return ostabilize(data);
      }
      return data;
    };
  }();

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


  var replaceAll = function replaceAll(s, a, b) {
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
      var aa = s.split(a);
      s = aa.join(b);
    } else if (isArray(a) && isString(b)) {
      a.forEach(function (v) {
        s = replaceAll(s, v, b);
      });
    } else if (isArray(a) && isArray(b) && a.length === b.length) {
      var k = a.length;
      if (k > 0) {
        for (var i = 0; i < k; i++) {
          var aaa = a[i];
          var bb = b[i];
          s = replaceAll(s, aaa, bb);
        }
      }
    }
    return s;
  };

  var stripAccent = function stripAccent(s) {
    if (isNumber(s)) {
      return String(s);
    }
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

    var updateS = function updateS(ai, key) {
      s = replaceAll(s, ai, key);
    };

    var _loop2 = function _loop2(key) {
      if (hasProperty(map, key)) {
        var a = map[key].split('|');
        a.forEach(function (item) {
          return updateS(item, key);
        });
      }
    };

    for (var key in map) {
      _loop2(key);
    }
    return s;
  };

  var createAlias = function createAlias(s, delimiter) {
    s = String(s);
    var x = stripAccent(s);
    if (x) {
      var d = delimiter || '-';
      x = x.toLowerCase();
      x = trim(x);
      x = x.replace(/\W+/g, ' ');
      x = x.replace(/\s+/g, ' ');
      x = x.replace(/\s/g, d);
    }
    return x;
  };

  var compile = function compile(tpl, data) {
    var ns = [];
    var c = function c(s, ctx, namespace) {
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

  var now = function now() {
    return new Date();
  };

  var time = function time() {
    return Date.now();
  };

  var date = function () {
    var pattern = 'D, M d, Y  h:i:s A';
    var weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var tz = function () {
      var t = now().getTimezoneOffset();
      var z = Math.abs(t / 60);
      var sign = t < 0 ? '+' : '-';
      return ['GMT', sign, leftPad(z, 4)].join('');
    }();

    var format = function format(output) {
      var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : time();


      var vchar = /\.*\\?([a-z])/gi;

      var d = isDate(input) ? input : new Date(input);

      if (!isDate(d)) {
        return 'Invalid input!';
      }

      if (!output || !isString(output)) {
        output = pattern;
      }

      var meridiem = output.match(/(\.*)a{1}(\.*)*/i);

      var wn = weeks;
      var mn = months;
      var _num = function _num(n) {
        return String(n < 10 ? '0' + n : n);
      };
      var _ord = function _ord(day) {
        var s = day + ' ';
        var x = s.charAt(s.length - 2);
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

      var f = {
        Y: function Y() {
          return d.getFullYear();
        },
        y: function y() {
          return (f.Y() + '').slice(-2);
        },
        F: function F() {
          return mn[f.n() - 1];
        },
        M: function M() {
          return (f.F() + '').slice(0, 3);
        },
        m: function m() {
          return _num(f.n());
        },
        n: function n() {
          return d.getMonth() + 1;
        },
        S: function S() {
          return _ord(f.j());
        },
        j: function j() {
          return d.getDate();
        },
        d: function d() {
          return _num(f.j());
        },
        t: function t() {
          return new Date(f.Y(), f.n(), 0).getDate();
        },
        w: function w() {
          return d.getDay();
        },
        l: function l() {
          return wn[f.w()];
        },
        D: function D() {
          return (f.l() + '').slice(0, 3);
        },
        G: function G() {
          return d.getHours();
        },
        g: function g() {
          return f.G() % 12 || 12;
        },
        h: function h() {
          return _num(meridiem ? f.g() : f.G());
        },
        i: function i() {
          return _num(d.getMinutes());
        },
        s: function s() {
          return _num(d.getSeconds());
        },
        a: function a() {
          return f.G() > 11 ? 'pm' : 'am';
        },
        A: function A() {
          return f.a().toUpperCase();
        },
        O: function O() {
          return tz;
        }
      };


      var _term = function _term(t, s) {
        return f[t] ? f[t]() : s;
      };

      return output.replace(vchar, _term);
    };

    var relativize = function relativize(input) {
      var t = input instanceof Date ? input : new Date(input);
      var delta = now() - t;
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
          delta /= conversions[key];
        }
      }
      delta = Math.floor(delta);
      if (delta !== 1) {
        units += 's';
      }
      return [delta, units].join(' ') + ' ago';
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

    return {
      utc: utc,
      local: local,
      strtotime: strtotime,
      format: format,
      relativize: relativize
    };
  }();

  return {
    ENV: ENV,
    id: createId(),
    isUndefined: isUndefined,
    isNull: isNull,
    isString: isString,
    isNumber: isNumber,
    isInteger: isInteger,
    isBoolean: isBoolean,
    isArray: isArray,
    isObject: isObject,
    isDate: isDate,
    isFunction: isFunction,
    isElement: isElement,
    isEmpty: isEmpty,
    isLetter: isLetter,
    isEmail: isEmail,
    isGeneratedKey: isGeneratedKey,
    hasProperty: hasProperty,
    equals: equals,
    encode: encode,
    decode: decode,
    trim: trim,
    truncate: truncate,
    stripTags: stripTags,
    escapeHTML: escapeHTML,
    unescapeHTML: unescapeHTML,
    ucfirst: ucfirst,
    ucwords: ucwords,
    leftPad: leftPad,
    rightPad: rightPad,
    repeat: repeat,
    replaceAll: replaceAll,
    stripAccent: stripAccent,
    createAlias: createAlias,
    compile: compile,
    md5: md5,
    createId: createId,
    random: random,
    copies: copies,
    clone: clone,
    stabilize: stabilize,
    now: now,
    time: time,
    date: date
  };
});