/**
 * bellajs
 * @ndaidong
**/

((name, factory) => {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    let root = window || global || {};
    if (root.define && root.define.amd) {
      root.define([], factory);
    } else if (root.exports) {
      root.exports = factory();
    } else {
      root[name] = factory();
    }
  }
})('Bella', () => {

  const MAX_NUMBER = 9007199254740991;

  const UNDEF = undefined; // eslint-disable-line no-undefined

  const ENV = typeof module !== UNDEF && module.exports ? 'node' : 'browser';

  var isNull = (val) => {
    return val === null;
  };

  var isUndefined = (val) => {
    return typeof val === UNDEF;
  };

  var isString = (val) => {
    return !isNull(val) && typeof val === 'string';
  };

  var isNumber = (val) => {
    return val !== '' && !isNull(val) && !isUndefined(val) && !isNaN(val) && typeof val === 'number';
  };

  var isInteger = (val) => {
    return isNumber(val) && isFinite(val) && Math.floor(val) === val;
  };

  var isBoolean = (val) => {
    return val === true || val === false;
  };

  var isArray = (val) => {
    return !isNull(val) && Array.isArray(val);
  };

  var isObject = (val) => {
    return val !== null && typeof val === 'object' && isArray(val) === false;
  };

  var isDate = (val) => {
    return val instanceof Date && !isNaN(val.valueOf());
  };

  var isFunction = (val) => {
    return typeof val === 'function';
  };

  var isElement = (val) => {
    if (val && ENV === 'node' && val._root) {
      return true;
    }
    let ots = Object.prototype.toString;
    let scall = ots.call(val);
    return typeof val === 'object' && scall.includes('HTML') && scall.includes('Element');
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
    return s.replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
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

  var leftPad = (s, size = 2, pad = '0') => {
    let o = String(s);
    return o.length >= size ? o : new Array(size - o.length + 1).join(pad) + o;
  };

  var rightPad = (s, size = 2, pad = '0') => {
    let o = String(s);
    return o.length >= size ? o : o + new Array(size - o.length + 1).join(pad);
  };

  var repeat = (s, m) => {
    if (!s || !isString(s)) {
      return '';
    }
    if (!isInteger(m) || m < 1) {
      return s;
    }
    let a = [];
    a.length = m;
    return a.fill(s, 0, m).join('');
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

  var stabilize = (() => {

    var astabilize = (data = []) => {

      let a = [...data];

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

        let d = [];
        while (d.length < c) {
          let i = random(0, b.length - 1);
          d.push(b[i]);
          b = b.splice(i, 1);
        }
        return d;
      };

      let addMethods = (met) => {
        Object.defineProperty(a, met[0], {
          enumerable: false,
          configurable: false,
          writable: false,
          value: met[1]
        });
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
        ['ireverse', ireverse],
        ['shuffle', shuffle]
      ].map(addMethods);

      return a;
    };

    var ostabilize = (data = {}) => {

      let o = Object.create({});

      let config = {
        enumerable: true,
        configurable: false,
        writable: false,
        value: 'undefined'
      };

      let setProp = (key) => {
        let c = Object.assign({}, config);
        c.value = data[key];
        Object.defineProperty(o, key, c);
      };

      Object.keys(data).map(setProp);

      Object.defineProperty(o, 'get', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (k) => {
          return o[k];
        }
      });

      Object.defineProperty(o, 'set', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (key, value = false) => {
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
        }
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

  /*eslint-disable*/
  /** https://github.com/jbt/js-crypto */
  var md5 = function() {for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c) {var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16) {b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();
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

    let updateS = (ai, key) => {
      s = replaceAll(s, ai, key);
    };

    for (let key in map) {
      if (hasProperty(map, key)) {
        let a = map[key].split('|');
        a.forEach((item) => {
          return updateS(item, key);
        });
      }
    }
    return s;
  };

  var createAlias = (s, delimiter) => {
    s = String(s);
    let x = stripAccent(s);
    if (x) {
      let d = delimiter || '-';
      x = x.toLowerCase();
      x = trim(x);
      x = x.replace(/\W+/g, ' ');
      x = x.replace(/\s+/g, ' ');
      x = x.replace(/\s/g, d);
    }
    return x;
  };

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


  var now = () => {
    return new Date();
  };

  var time = () => {
    return Date.now();
  };

  var date = (() => {
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
      let t = now().getTimezoneOffset();
      let z = Math.abs(t / 60);
      let sign = t < 0 ? '+' : '-';
      return ['GMT', sign, leftPad(z, 4)].join('');
    })();

    var format = (output, input = time()) => {

      let vchar = /\.*\\?([a-z])/gi;

      let d = isDate(input) ? input : new Date(input);

      if (!isDate(d)) {
        return 'Invalid input!';
      }

      if (!output || !isString(output)) {
        output = pattern;
      }

      let meridiem = output.match(/(\.*)a{1}(\.*)*/i);

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

      var _term = (t, s) => {
        return f[t] ? f[t]() : s;
      };

      return output.replace(vchar, _term);
    };

    let relativize = (input) => {
      let t = input instanceof Date ? input : new Date(input);
      let delta = now() - t;
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

    return {
      utc,
      local,
      strtotime,
      format,
      relativize
    };

  })();

  // exports
  return {
    ENV,
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
    encode,
    decode,
    trim,
    truncate,
    stripTags,
    escapeHTML,
    unescapeHTML,
    ucfirst,
    ucwords,
    leftPad,
    rightPad,
    repeat,
    replaceAll,
    stripAccent,
    createAlias,
    compile,
    md5,
    createId,
    random,
    stabilize,
    now,
    time,
    date
  };
});
