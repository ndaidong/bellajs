// utils / string

import {
  isArray,
  isString,
  isNumber,
  hasProperty,
} from './detection';

import {randint} from './random';

const toString = (input) => {
  const s = isNumber(input) ? String(input) : input;
  if (!isString(s)) {
    throw new Error('InvalidInput: String required.');
  }
  return s;
};

export const truncate = (s, l) => {
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

export const stripTags = (s) => {
  const x = toString(s);
  return x.replace(/<.*?>/gi, ' ').replace(/\s\s+/g, ' ').trim();
};

export const escapeHTML = (s) => {
  const x = toString(s);
  return x.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

export const unescapeHTML = (s) => {
  const x = toString(s);
  return x.replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

export const ucfirst = (s) => {
  let x = toString(s);
  if (x.length === 1) {
    return x.toUpperCase();
  }
  x = x.toLowerCase();
  return x.charAt(0).toUpperCase() + x.slice(1);
};

export const ucwords = (s) => {
  const x = toString(s);
  const c = x.split(' ');
  const a = [];
  c.forEach((w) => {
    a.push(ucfirst(w));
  });
  return a.join(' ');
};

export const replaceAll = (s, a, b) => {
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

export const stripAccent = (s) => {
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

export const genid = (leng, prefix = '') => {
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

export const slugify = (s, delimiter) => {
  const x = stripAccent(s).trim();
  const d = delimiter || '-';
  return x.toLowerCase()
    .replace(/\W+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s/g, d);
};

