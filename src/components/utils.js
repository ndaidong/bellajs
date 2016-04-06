/**
 * bellajs > utils
**/

/* global Bella isArray isObject isElement isString */

var createId = (leng, prefix) => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  chars += chars.toLowerCase();
  chars += '0123456789';
  let t = chars.length;
  let px = prefix || '';
  let ln = Math.max(leng || 32, px.length);

  let s = px;
  while (s.length < ln) {
    let k = Math.floor(Math.random() * t);
    s += chars.charAt(k) || '';
  }
  return s;
};

var random = (min, max) => {
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
  let offset = min;
  let range = max - min + 1;
  let rd = Math.floor(Math.random() * range) + offset;
  return rd;
};

var max = (a) => {
  return isArray(a) ? Math.max.apply({}, a) : a;
};

var min = (a) => {
  return isArray(a) ? Math.min.apply({}, a) : a;
};

var empty = (a) => {
  if (isArray(a)) {
    for (let i = a.length - 1; i >= 0; i--) {
      a[i] = null;
      delete a[i];
    }
    a.length = 0;
  } else if (isObject(a)) {
    for (let k in a) {
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

var assign = (target, ...sources) => {
  sources.forEach((source) => {
    let descriptors = Object.keys(source).reduce((_descriptors, key) => {
      _descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return _descriptors;
    }, {});
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
};

var clone = (o) => {
  return assign({}, o);
};

var copies = (from, to, matched, excepts) => {
  let mt = matched || false;
  let ex = excepts || [];
  for (let k in from) {
    if (ex.length > 0 && Bella.contains(ex, k)) {
      continue;
    }
    if (!mt || mt && to.hasOwnProperty(k)) {
      let oa = from[k];
      let ob = to[k];
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
