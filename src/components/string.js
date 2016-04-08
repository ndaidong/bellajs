/**
 * bellajs > string
**/

/* global Bella isString isArray isObject isNumber hasProperty */

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
  if (s === '') {
    return s;
  }
  let t = l || 140;
  if (s.length <= t) {
    return s;
  }
  let x = s.substring(0, t);
  let a = x.split(' '), b = a.length, r = '';
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
  s = String(s);
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

var unescapeHTML = (s) => {
  if (!isString(s)) {
    return '';
  }
  s = String(s);
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
  let c = s.split(' '), a = [];
  c.forEach((w) => {
    a.push(ucfirst(w));
  });
  return a.join(' ');
};

var leftPad = (s, size, spad) => {
  if (!isString(s)) {
    return '';
  }
  let g = spad || '0';
  let o = String(s);
  let z = size || 2;
  return o.length >= z ? o : new Array(z - o.length + 1).join(g) + o;
};

var rightPad = (s, size, spad) => {
  if (!isString(s)) {
    return '';
  }
  let g = spad || '0';
  let o = String(s);
  let z = size || 2;
  return o.length >= z ? o : o + new Array(z - o.length + 1).join(g);
};

var replaceAll = (s, a, b) => {
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
        let aaa = a[i], bb = b[i];
        s = replaceAll(s, aaa, bb);
      }
    }
  }
  return s;
};

var stripAccent = (s) => {
  s = String(s);
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
        var v = ctx[k];
        if (isObject(v) || isArray(v)) {
          a.push({ key: k, data: v });
        } else if (isString(v)) {
          v = replaceAll(v, [ '{', '}' ], [ '&#123;', '&#125;' ]);
          let cns = ns.concat([ k ]);
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
