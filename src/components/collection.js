/**
 * bellajs > collection
**/

/* global Bella isArray isObject isString clone random hasProperty */

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
  return arr;
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

Bella.unique = unique;
Bella.contains = contains;
Bella.sort = sort;
Bella.shuffle = shuffle;
Bella.pick = pick;
