/**
 * bellajs > detection
**/

/* global ENV Bella */

'use strict';
var Bella = {};

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

var isDef = (val) => {
  return tof(val) !== 'undefined';
};

var isNull = (val) => {
  return tof(val) === null || val === null;
};

var isString = (val) => {
  return !isNull(val) && tof(val) === 'string';
};

var isNumber = (val) => {
  return val !== '' && !isNull(val) && isDef(val) && !isNaN(val) && tof(val) === 'number';
};

var isInteger = (val) => {
  return isNumber(val) && isFinite(val) && Math.floor(val) === val;
};

var isBoolean = (val) => {
  return val === true || val === false;
};

var isArray = (val) => {
  return !isNull(val) && tof(val) === 'array';
};

var isObject = (val) => {
  return !isNull(val) && tof(val) === 'object';
};

var isDate = (val) => {
  return val instanceof Date && !isNaN(val.valueOf());
};

var isFunction = (val) => {
  return !isNull(val) && tof(val) === 'function';
};

var isElement = (val) => {
  if (val && ENV === 'node' && val._root) {
    return true;
  }
  return !isNull(val) && tof(val) === 'element';
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
  return !isDef(val) || isNull(val) ||
    isString(val) && val === '' ||
    isArray(val) && JSON.stringify(val) === '[]' ||
    isObject(val) && JSON.stringify(val) === '{}';
};

var hasProperty = (ob, k) => {
  if (!ob || !k) {
    return false;
  }
  let r = true;
  if (!isDef(ob[k])) {
    r = k in ob;
  }
  return r;
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
    let as = [], bs = [];
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
