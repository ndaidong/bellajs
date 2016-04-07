/**
 * bellajs > utils
**/

/* global Bella isArray isObject isString hasProperty isObject isElement isDate */

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

var unique = (a) => {
  if (isArray(a)) {
    let r = [];
    for (let i = 0; i < a.length; i++) {
      if (r.indexOf(a[i]) === -1) {
        r.push(a[i]);
      }
    }
    return r;
  }
  return a || [];
};

var contains = (a, el, key) => {
  if (isArray(a)) {
    for (let i = 0; i < a.length; i++) {
      let val = a[i];
      if (key && val[key] === el[key] || val === el) {
        return true;
      }
    }
  }
  return false;
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

var clone = (obj) => {
  if (!isObject(obj) && !isArray(obj) && !isDate(obj)) {
    return obj;
  }
  if (isDate(obj)) {
    let copy1 = new Date();
    copy1.setTime(obj.getTime());
    return copy1;
  }
  if (isArray(obj)) {
    let copy2 = [], arr = obj.slice(0);
    for (let i = 0, len = arr.length; i < len; ++i) {
      copy2[i] = clone(arr[i]);
    }
    return copy2;
  }
  if (isObject(obj)) {
    let copy = {};
    for (let attr in obj) {
      if (attr === 'clone') {
        continue;
      }
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = clone(obj[attr]);
      }
    }
    return copy;
  }
  return false;
};

var copies = (from, to, matched, excepts) => {
  let mt = matched || false;
  let ex = excepts || [];
  for (let k in from) {
    if (ex.length > 0 && contains(ex, k)) {
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

var sort = (arr, opts) => {
  let a = [];
  let one = {};
  let o = opts || 1;
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
      for (let key in o) {
        if (hasProperty(one, key)) {
          var order = o[key] === -1 ? -1 : 1;
          /*eslint-disable*/
          a.sort((m, n) => {
            return (m[key] > n[key]) ? order : (m[key] < n[key] ? (-1 * order) : 0);
          });
          /*eslint-enable*/
        }
      }
    }
  }
  return a;
};

var shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return clone(arr);
};

var pick = (arr, count) => {
  let c = count ? Math.min(count, arr.length) : 1;
  if (c < 1) {
    c = 1;
  }
  if (c >= arr.length) {
    return arr;
  }
  if (c === 1) {
    let ri = random(0, arr.length - 1);
    return arr[ri];
  }
  let ab = [], ba = clone(arr);
  while (ab.length < c) {
    let i = random(0, ba.length - 1);
    ab.push(ba[i]);
    ba.splice(i, 1);
  }
  return ab;
};


var debounce = (fn, wait, immediate) => {
  let timeout;
  return () => {

    /* eslint no-invalid-this: 0 */
    let later = () => {
      timeout = null;
      if (!immediate) {
        fn();
      }
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 200);
    if (callNow) {
      fn();
    }
  };
};

var throttle = (fn, wait) => {
  return debounce(fn, wait, true);
};

Bella.id = createId();
Bella.createId = createId;
Bella.random = random;
Bella.min = min;
Bella.max = max;
Bella.unique = unique;
Bella.contains = contains;
Bella.sort = sort;
Bella.shuffle = shuffle;
Bella.pick = pick;
Bella.empty = empty;
Bella.copies = copies;
Bella.clone = clone;
Bella.assign = assign;
Bella.debounce = debounce;
Bella.throttle = throttle;
