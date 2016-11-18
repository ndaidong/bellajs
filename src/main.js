/**
 * bellajs
 * @ndaidong
**/

const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
const MAX_STRING = 1 << 28; // eslint-disable-line no-bitwise

const UNDEF = undefined; // eslint-disable-line no-undefined

const ENV = typeof module !== UNDEF && module.exports ? 'node' : 'browser';

var ob2Str = (val) => {
  return {}.toString.call(val);
};

var isNull = (val) => {
  return ob2Str(val) === '[object Null]';
};

var isUndefined = (val) => {
  return ob2Str(val) === '[object Undefined]';
};

var isFunction = (val) => {
  return ob2Str(val) === '[object Function]';
};

var isString = (val) => {
  return ob2Str(val) === '[object String]';
};

var isNumber = (val) => {
  return ob2Str(val) === '[object Number]';
};

var isInteger = (val) => {
  return Number.isInteger(val);
};

var isArray = (val) => {
  return Array.isArray(val);
};

var isObject = (val) => {
  return ob2Str(val) === '[object Object]' && !isArray(val);
};

var isBoolean = (val) => {
  return val === true || val === false;
};

var isDate = (val) => {
  return val instanceof Date && !isNaN(val.valueOf());
};

var isElement = (val) => {
  if (val && ENV === 'node' && val._root) {
    return true;
  }
  return ob2Str(val).match(/^\[object HTML\w*Element]$/);
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
  return !val || isUndefined(val) || isNull(val) ||
    isString(val) && val === '' ||
    isArray(val) && JSON.stringify(val) === '[]' ||
    isObject(val) && JSON.stringify(val) === '{}';
};

var hasProperty = (ob, k) => {
  if (!ob || !k) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(ob, k);
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

var def = (o, key, val = UNDEF, opt = {}) => {
  let {
    enumerable = false,
    configurable = false,
    writable = false,
    value = val
  } = opt;
  Object.defineProperty(o, key, {
    enumerable,
    configurable,
    writable,
    value
  });
  return o;
};

var toString = (input) => {
  let s = isNumber(input) ? String(input) : input;
  if (!isString(s)) {
    throw new Error('InvalidInput: String required.');
  }
  return s;
};

var encode = (s) => {
  let x = toString(s);
  return encodeURIComponent(x);
};

var decode = (s) => {
  let x = toString(s);
  return decodeURIComponent(x.replace(/\+/g, ' '));
};

var trim = (s, all = false) => {
  let x = toString(s);
  x = x.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
  if (x && all) {
    x = x.replace(/\r?\n|\r/g, ' ').replace(/\s\s+|\r/g, ' ');
  }
  return x;
};

var truncate = (s, l) => {
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

var stripTags = (s) => {
  let x = toString(s);
  return trim(x.replace(/<.*?>/gi, ' ').replace(/\s\s+/g, ' '));
};

var escapeHTML = (s) => {
  let x = toString(s);
  return x.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
};

var unescapeHTML = (s) => {
  let x = toString(s);
  return x.replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&');
};

var ucfirst = (s) => {
  let x = toString(s);
  if (x.length === 1) {
    return x.toUpperCase();
  }
  x = x.toLowerCase();
  return x.charAt(0).toUpperCase() + x.slice(1);
};

var ucwords = (s) => {
  let x = toString(s);
  let c = x.split(' ');
  let a = [];
  c.forEach((w) => {
    a.push(ucfirst(w));
  });
  return a.join(' ');
};

var leftPad = (s, size = 2, pad = '0') => {
  let x = toString(s);
  return x.length >= size ? x : new Array(size - x.length + 1).join(pad) + x;
};

var rightPad = (s, size = 2, pad = '0') => {
  let x = toString(s);
  return x.length >= size ? x : x + new Array(size - x.length + 1).join(pad);
};

var repeat = (s, m) => {
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

var replaceAll = (s, a, b) => {

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

var stripAccent = (s) => {

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
    Y: 'Ý|Ỳ|Ỷ|Ỹ|Ỵ'
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

var createAlias = (s, delimiter) => {
  let x = trim(stripAccent(s));
  let d = delimiter || '-';
  return x.toLowerCase()
        .replace(/\W+/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/\s/g, d);
};


/*eslint-disable*/
/** https://github.com/jbt/js-crypto */
var md5 = function() {for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c) {var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16) {b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();
/*eslint-enable*/


// bella.template
var compile = (tpl, data) => {
  let ns = [];
  let c = (s, ctx, namespace) => {
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

var template = (tpl) => {
  return {
    compile: (data) => {
      return compile(tpl, data);
    }
  };
};

var genkey = () => {
  return Math.random().toString(36).slice(2);
};

var createId = (leng, prefix = '') => {
  let a = [];
  while (a.length < 10) {
    a.push(genkey());
  }
  let r = a.join('');
  let t = r.length;
  let ln = Math.max(leng || 32, prefix.length);
  let s = prefix;
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

var clone = (val) => {

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
    let aa = [...a];
    let ba = [];
    aa.forEach((e) => {
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


var copies = (source, dest, matched = false, excepts = []) => {
  for (let k in source) {
    if (excepts.length > 0 && excepts.includes(k)) {
      continue; // eslint-disable-line no-continue
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

var stabilize = (() => {

  var astabilize = (data) => {

    let a = clone(data);

    let unique = () => {
      let arr = [...a];
      let r = [];
      for (let i = 0; i < arr.length; i++) {
        if (r.indexOf(arr[i]) === -1) {
          r.push(arr[i]);
        }
      }
      return stabilize(r);
    };

    let min = () => {
      return Math.min.apply({}, a);
    };

    let max = () => {
      return Math.max.apply({}, a);
    };

    let first = () => {
      let r = [...a][0];
      return stabilize(r);
    };

    let last = () => {
      let r = [...a][a.length - 1];
      return stabilize(r);
    };

    let insert = (at = 0, ...items) => {
      let r = [...a];
      let p0 = r.slice(0, at);
      let p1 = r.slice(at, r.length);
      return stabilize([].concat(p0, ...items, p1));
    };

    let append = (...items) => {
      return insert(a.length, items);
    };

    let remove = (start = 0, count = 0) => {
      let r = [...a.slice(0, start), ...a.slice(start + count)];
      return stabilize(r);
    };

    let isort = (fn) => {
      let r = [...a].sort(fn);
      return stabilize(r);
    };

    let msort = (o = 1) => {
      let r = [...a];
      let one = r[0];
      if (o === 1 || o === -1) {
        r.sort((m, n) => {
          return m > n ? o : m < n ? -1 * o : 0; // eslint-disable-line no-nested-ternary
        });
      }
      if (isString(o) && hasProperty(one, o)) {
        r.sort((m, n) => {
          return m[o] > n[o] ? 1 : m[o] < n[o] ? -1 : 0; // eslint-disable-line no-nested-ternary
        });
      }
      if (isObject(o)) {
        for (let key in o) {
          if (hasProperty(one, key)) {
            let order = o[key] === -1 ? -1 : 1;
            /*eslint-disable*/
            r.sort((m, n) => {
              return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
            });
            /*eslint-enable*/
          }
        }
      }
      return stabilize(r);
    };

    let ireverse = () => {
      let r = [...a].reverse();
      return stabilize(r);
    };

    let shuffle = () => {
      return isort(() => {
        return Math.random() - 0.5;
      });
    };

    let pick = (count = 1) => {
      let b = a.shuffle();
      let c = Math.max(Math.min(count, b.length), 1);
      if (c >= b.length) {
        return b;
      }

      if (c === 1) {
        let ri = random(0, b.length - 1);
        return b[ri];
      }

      return stabilize(b.splice(0, c));
    };

    let addMethods = (met) => {
      def(a, met[0], met[1]);
    };

    [
      ['min', min],
      ['max', max],
      ['unique', unique],
      ['first', first],
      ['last', last],
      ['pick', pick],
      ['insert', insert],
      ['append', append],
      ['remove', remove],
      ['isort', isort],
      ['msort', msort],
      ['ireverse', ireverse],
      ['shuffle', shuffle]
    ].map(addMethods);

    return a;
  };

  var ostabilize = (data) => {

    let o = Object.create({});

    let setProp = (key) => {
      def(o, key, data[key], {
        enumerable: true
      });
    };

    Object.keys(data).map(setProp);

    def(o, 'get', (k) => {
      return o[k];
    });

    def(o, 'set', (key, value = false) => {
      let a = Object.assign({}, o);
      let _set = (k, v) => {
        a[k] = v;
      };
      if (isObject(key)) {
        Object.keys(key).forEach((k) => {
          _set(k, key[k]);
        });
      } else {
        _set(key, value);
      }
      return stabilize(a);
    });

    return o;
  };

  return (data) => {
    if (isArray(data)) {
      return astabilize(data);
    }
    if (isObject(data)) {
      return ostabilize(data);
    }
    return data;
  };
})();

var now = () => {
  return new Date();
};

var time = () => {
  return Date.now();
};

const PATTERN = 'D, M d, Y  h:i:s A';
const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

var tz = (() => {
  let t = now().getTimezoneOffset();
  let z = Math.abs(t / 60);
  let sign = t < 0 ? '+' : '-';
  return ['GMT', sign, leftPad(z, 4)].join('');
})();

var date = (input = time()) => {
  let d = isDate(input) ? input : new Date(input);
  if (!isDate(d)) {
    throw new Error('InvalidInput: Number or Date required.');
  }

  var format = (output = PATTERN) => {

    if (!isString(output)) {
      throw new Error('Invalid output pattern.');
    }

    let vchar = /\.*\\?([a-z])/gi;
    let meridiem = output.match(/(\.*)a{1}(\.*)*/i);

    let wn = WEEKDAYS;
    let mn = MONTHS;

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

    /*eslint-disable */
    let f = {
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

    let _term = (t, s) => {
      return f[t] ? f[t]() : s;
    };

    return output.replace(vchar, _term);
  };

  let relativize = () => {
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

  let utc = () => {
    return new Date(d).toUTCString();
  };

  let local = () => {
    return format('D, j M Y h:i:s O', d);
  };

  return {
    utc,
    local,
    format,
    relativize
  };
};

// exports

let B = Object.create({});
let exp = {
  ENV,
  MAX_NUMBER,
  MAX_STRING,
  id: createId(),
  isUndefined,
  isNull,
  isString,
  isNumber,
  isInteger,
  isBoolean,
  isArray,
  isObject,
  isDate,
  isFunction,
  isElement,
  isEmpty,
  isLetter,
  isEmail,
  isGeneratedKey,
  hasProperty,
  equals,
  createId,
  md5,
  random,
  copies,
  clone,
  now,
  time,
  date,
  encode,
  decode,
  repeat,
  ucfirst,
  ucwords,
  leftPad,
  rightPad,
  createAlias,
  trim,
  truncate,
  stripTags,
  stripAccent,
  escapeHTML,
  unescapeHTML,
  replaceAll,
  stabilize,
  template
};

var setProp = (k) => {
  def(B, k, exp[k], {
    enumerable: true,
    configurable: true
  });
};

Object.keys(exp).map(setProp);

module.exports = B;
