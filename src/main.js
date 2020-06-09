/**
 * bellajs
 * @ndaidong
**/

import {
  isObject,
  isArray,
  isDate,
  hasProperty,
} from './utils/detection';

export const curry = (fn) => {
  const totalArguments = fn.length;
  const next = (argumentLength, rest) => {
    if (argumentLength > 0) {
      return (...args) => {
        return next(argumentLength - args.length, [...rest, ...args]);
      };
    }
    return fn(...rest);
  };
  return next(totalArguments, []);
};

export const compose = (...fns) => {
  return fns.reduce((f, g) => (x) => f(g(x)));
};

export const pipe = (...fns) => {
  return fns.reduce((f, g) => (x) => g(f(x)));
};

const defineProp = (ob, key, val, config = {}) => {
  const {
    writable = false,
    configurable = false,
    enumerable = false,
  } = config;
  Object.defineProperty(ob, key, {
    value: val,
    writable,
    configurable,
    enumerable,
  });
};

export const maybe = (val) => {
  const __val = val;
  const isNil = () => {
    return __val === null || __val === undefined;
  };
  const value = () => {
    return __val;
  };
  const getElse = (fn) => {
    return maybe(__val || fn());
  };
  const filter = (fn) => {
    return maybe(fn(__val) === true ? __val : null);
  };
  const map = (fn) => {
    return maybe(isNil() ? null : fn(__val));
  };
  const output = Object.create({});
  defineProp(output, '__value__', __val, {enumerable: true});
  defineProp(output, '__type__', 'Maybe', {enumerable: true});
  defineProp(output, 'isNil', isNil);
  defineProp(output, 'value', value);
  defineProp(output, 'map', map);
  defineProp(output, 'if', filter);
  defineProp(output, 'else', getElse);
  return output;
};


export const clone = (val, history = null) => {
  const stack = history || new Set();

  if (stack.has(val)) {
    return val;
  }

  stack.add(val);

  if (isDate(val)) {
    return new Date(val.valueOf());
  }

  const copyObject = (o) => {
    const oo = Object.create({});
    for (const k in o) {
      if (hasProperty(o, k)) {
        oo[k] = clone(o[k], stack);
      }
    }
    return oo;
  };

  const copyArray = (a) => {
    return [...a].map((e) => {
      if (isArray(e)) {
        return copyArray(e);
      } else if (isObject(e)) {
        return copyObject(e);
      }
      return clone(e, stack);
    });
  };

  if (isArray(val)) {
    return copyArray(val);
  }

  if (isObject(val)) {
    return copyObject(val);
  }

  return val;
};


export const copies = (source, dest, matched = false, excepts = []) => {
  for (const k in source) {
    if (excepts.length > 0 && excepts.includes(k)) {
      continue; // eslint-disable-line no-continue
    }
    if (!matched || matched && hasProperty(dest, k)) {
      const oa = source[k];
      const ob = dest[k];
      if (isObject(ob) && isObject(oa) || isArray(ob) && isArray(oa)) {
        dest[k] = copies(oa, dest[k], matched, excepts);
      } else {
        dest[k] = clone(oa);
      }
    }
  }
  return dest;
};

export const unique = (arr = []) => {
  return [...new Set(arr)];
};

const fnSort = (a, b) => {
  return a > b ? 1 : a < b ? -1 : 0;
};

export const sort = (arr = [], fn = fnSort) => {
  const tmp = [...arr];
  tmp.sort(fn);
  return tmp;
};

export const sortBy = (key, order = 1, arr = []) => {
  return sort(arr, (m, n) => {
    return m[key] > n[key] ? order : (m[key] < n[key] ? (-1 * order) : 0);
  });
};

export const shuffle = (arr = []) => {
  return sort([...arr], () => {
    return Math.random() > 0.5;
  });
};

export const pick = (count = 1, arr = []) => {
  const a = shuffle([...arr]);
  const mc = Math.max(1, count);
  const c = Math.min(mc, a.length - 1);
  return a.splice(0, c);
};

export * from './utils/detection';
export * from './utils/equals';
export * from './utils/string';
export * from './utils/random';
export * from './utils/date';
export * from './utils/md5';
