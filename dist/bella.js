"use strict";
(function(context) {
  var ENV = typeof module !== 'undefined' && module.exports ? 'node' : 'browser';
  var Bella = {ENV: ENV};
  var tof = function(v) {
    var ots = Object.prototype.toString;
    var s = (typeof v === 'undefined' ? 'undefined' : $traceurRuntime.typeof(v));
    if (s === 'object') {
      if (v) {
        if (ots.call(v).indexOf('HTML') !== -1 && ots.call(v).indexOf('Element') !== -1) {
          return 'element';
        }
        if (v instanceof Array || (!(v instanceof Object) && ots.call(v) === '[object Array]' || typeof v.length === 'number' && typeof v.splice !== 'undefined' && typeof v.propertyIsEnumerable !== 'undefined' && !v.propertyIsEnumerable('splice'))) {
          return 'array';
        }
        if (!(v instanceof Object) && (ots.call(v) === '[object Function]' || typeof v.call !== 'undefined' && typeof v.propertyIsEnumerable !== 'undefined' && !v.propertyIsEnumerable('call'))) {
          return 'function';
        }
      }
      return 'null';
    } else if (s === 'function' && typeof v.call === 'undefined') {
      return 'object';
    }
    return s;
  };
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
    return !isNull(val) && (typeof val === 'undefined' ? 'undefined' : $traceurRuntime.typeof(val)) === 'object';
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
    return !isDef(val) || isNull(val) || isString(val) && val === '' || isArray(val) && JSON.stringify(val) === '[]' || isObject(val) && JSON.stringify(val) === '{}';
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
    } else if (isDate(a) && isDate(b)) {
      return a.getTime() === b.getTime();
    } else if (isNumber(a) && isNumber(b) || isString(a) && isString(b)) {
      return a === b;
    } else if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      if (a.length > 0) {
        for (var i = 0,
            l = a.length; i < l; i++) {
          if (!Bella.equals(a[i], b[i])) {
            re = false;
            break;
          }
        }
      }
      return re;
    } else if (isObject(a) && isObject(b)) {
      var as = [],
          bs = [];
      for (var k1 in a) {
        if (Bella.hasProperty(a, k1)) {
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
      return re;
    }
    return false;
  };
  Bella.isDef = isDef;
  Bella.isNull = isNull;
  Bella.isString = isString;
  Bella.isNumber = isNumber;
  Bella.isInteger = isInteger;
  Bella.isBoolean = isBoolean;
  Bella.isArray = isArray;
  Bella.isObject = isObject;
  Bella.isDate = isDate;
  Bella.isFunction = isFunction;
  Bella.isElement = isElement;
  Bella.isEmpty = isEmpty;
  Bella.isLetter = isLetter;
  Bella.isEmail = isEmail;
  Bella.isGeneratedKey = isGeneratedKey;
  Bella.hasProperty = hasProperty;
  Bella.equals = equals;
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
        if (Bella.hasProperty(a, k)) {
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
  var assign = function(target) {
    for (var sources = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      sources[$__1 - 1] = arguments[$__1];
    sources.forEach(function(source) {
      var descriptors = Object.keys(source).reduce(function(_descriptors, key) {
        _descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return _descriptors;
      }, {});
      Object.getOwnPropertySymbols(source).forEach(function(sym) {
        var descriptor = Object.getOwnPropertyDescriptor(source, sym);
        if (descriptor.enumerable) {
          descriptors[sym] = descriptor;
        }
      });
      Object.defineProperties(target, descriptors);
    });
    return target;
  };
  var clone = function(o) {
    return assign({}, o);
  };
  var copies = function(from, to, matched, excepts) {
    var mt = matched || false;
    var ex = excepts || [];
    for (var k in from) {
      if (ex.length > 0 && Bella.contains(ex, k)) {
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
  Bella.id = createId();
  Bella.createId = createId;
  Bella.random = random;
  Bella.min = min;
  Bella.max = max;
  Bella.empty = empty;
  Bella.copies = copies;
  Bella.clone = clone;
  Bella.assign = assign;
  var encode = function(s) {
    s = String(s);
    return isString(s) ? encodeURIComponent(s) : '';
  };
  var decode = function(s) {
    s = String(s);
    return isString(s) ? decodeURIComponent(s.replace(/\+/g, ' ')) : '';
  };
  var trim = function(s, all) {
    s = String(s);
    var x = s && isString(s) ? s.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : s || '';
    if (x && all) {
      return x.replace(/\s\s+|\r?\n|\r/g, '');
    }
    return x;
  };
  var truncate = function(s, l) {
    s = String(s);
    if (!s || !isString(s)) {
      return '';
    }
    s = Bella.trim(s);
    if (s === '') {
      return s;
    }
    var t = l || 140;
    if (s.length <= t) {
      return s;
    }
    var x = s.substring(0, t);
    var a = x.split(' '),
        b = a.length,
        r = '';
    if (b > 1) {
      a.pop();
      r += a.join(' ');
      if (r.length < s.length) {
        r += '...';
      }
    } else {
      x = x.substring(0, t - 3);
      r += '...';
    }
    return r;
  };
  var stripTags = function(s) {
    s = String(s);
    var r = isString(s) ? s.replace(/<.*?>/gi, ' ') : '';
    if (r) {
      r = Bella.trim(r.replace(/\s\s+/g, ' '));
    }
    return r;
  };
  var escapeHTML = function(s) {
    s = String(s);
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var unescapeHTML = function(s) {
    s = String(s);
    if (!isString(s)) {
      return '';
    }
    return s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  };
  var strtolower = function(s) {
    s = String(s);
    return isString(s) ? s.toLowerCase() : '';
  };
  var strtoupper = function(s) {
    s = String(s);
    return isString(s) ? s.toUpperCase() : '';
  };
  var ucfirst = function(s) {
    s = String(s);
    if (s.length === 1) {
      return s.toUpperCase();
    }
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  var ucwords = function(s) {
    s = String(s);
    if (isString(s)) {
      var c = s.split(' '),
          a = [];
      c.forEach(function(w) {
        a.push(ucfirst(w));
      });
      return a.join(' ');
    }
    return s;
  };
  var leftPad = function(s, size, spad) {
    s = String(s);
    if (isString(s)) {
      var g = spad || '0';
      var o = String(s);
      var z = size || 2;
      return o.length >= z ? o : new Array(z - o.length + 1).join(g) + o;
    }
    return '';
  };
  var rightPad = function(s, size, spad) {
    s = String(s);
    if (isString(s)) {
      var g = spad || '0';
      var o = String(s);
      var z = size || 2;
      return o.length >= z ? o : o + new Array(z - o.length + 1).join(g);
    }
    return '';
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
          var aaa = a[i],
              bb = b[i];
          s = replaceAll(s, aaa, bb);
        }
      }
    }
    return s;
  };
  var stripAccent = function(s) {
    s = String(s);
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
            v = replaceAll(v, ['{', '}'], ['&#123;', '&#125;']);
            var cns = ns.concat([k]);
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
      return Bella.trim(s, true);
    };
    if (data && (isString(data) || isObject(data) || isArray(data))) {
      return compile(tpl, data);
    }
    return tpl;
  };
  Bella.encode = encode;
  Bella.decode = decode;
  Bella.trim = trim;
  Bella.truncate = truncate;
  Bella.stripTags = stripTags;
  Bella.escapeHTML = escapeHTML;
  Bella.unescapeHTML = unescapeHTML;
  Bella.strtolower = strtolower;
  Bella.strtoupper = strtoupper;
  Bella.ucfirst = ucfirst;
  Bella.ucwords = ucwords;
  Bella.leftPad = leftPad;
  Bella.rightPad = rightPad;
  Bella.replaceAll = replaceAll;
  Bella.stripAccent = stripAccent;
  Bella.createAlias = createAlias;
  Bella.template = template;
  var md5 = function() {
    for (var m = [],
        l = 0; 64 > l; )
      m[l] = 0 | 4294967296 * Math.abs(Math.sin(++l));
    return function(c) {
      var e,
          g,
          f,
          a,
          h = [];
      c = unescape(encodeURI(c));
      for (var b = c.length,
          k = [e = 1732584193, g = -271733879, ~e, ~g],
          d = 0; d <= b; )
        h[d >> 2] |= (c.charCodeAt(d) || 128) << 8 * (d++ % 4);
      h[c = 16 * (b + 8 >> 6) + 14] = 8 * b;
      for (d = 0; d < c; d += 16) {
        b = k;
        for (a = 0; 64 > a; )
          b = [f = b[3], (e = b[1] | 0) + ((f = b[0] + [e & (g = b[2]) | ~e & f, f & e | ~f & g, e ^ g ^ f, g ^ (e | ~f)][b = a >> 4] + (m[a] + (h[[a, 5 * a + 1, 3 * a + 5, 7 * a][b] % 16 + d] | 0))) << (b = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21][4 * b + a++ % 4]) | f >>> 32 - b), e, g];
        for (a = 4; a; )
          k[--a] = k[a] + b[a];
      }
      for (c = ""; 32 > a; )
        c += (k[a >> 3] >> 4 * (1 ^ a++ & 7) & 15).toString(16);
      return c;
    };
  }();
  Bella.md5 = md5;
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
    }
    return false;
  };
  var sort = function(arr, opts) {
    var a = [];
    var one = {};
    var o = opts || 1;
    if (isArray(arr) && arr.length > 0) {
      a = clone(arr);
      one = a[0];
      if (o === 1 || o === -1) {
        a.sort(function(m, n) {
          return m > n ? o : m < n ? -1 * o : 0;
        });
      } else if (isString(o) && hasProperty(one, o)) {
        a.sort(function(m, n) {
          return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0;
        });
      } else if (isObject(o)) {
        var order,
            $__2 = function(key) {
              if (hasProperty(one, key)) {
                order = o[key] === -1 ? -1 : 1;
                a.sort(function(m, n) {
                  return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
                });
              }
            };
        for (var key in o) {
          $__2(key);
        }
      }
    }
    return a;
  };
  var shuffle = function(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
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
    var ab = [],
        ba = clone(arr);
    while (ab.length < c) {
      var i = random(0, ba.length - 1);
      ab.push(ba[i]);
      ba.splice(i, 1);
    }
    return ab;
  };
  Bella.unique = unique;
  Bella.contains = contains;
  Bella.sort = sort;
  Bella.shuffle = shuffle;
  Bella.pick = pick;
  if (Bella.ENV === 'node') {
    module.exports = Bella;
  } else {
    var root = context || window;
    if (root.define && root.define.amd) {
      root.define(function() {
        return Bella;
      });
    }
    root.Bella = Bella;
  }
})();
//# sourceURL=<compile-source>
