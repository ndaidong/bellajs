// mod.ts

import {
  hasProperty,
  isArray,
  isDate,
  isObject,
  isString,
} from "./utils/detection.ts";

export type AnyObject = { [key: string]: any };

export const clone = (val: any, history: any = null): any => {
  const stack = history || new Set();

  if (stack.has(val)) {
    return val;
  }

  stack.add(val);

  if (isDate(val)) {
    return new Date(val.valueOf());
  }

  const copyObject = (o: any): any => {
    const oo = Object.create({});
    for (const k in o) {
      if (hasProperty(o, k)) {
        oo[k] = clone(o[k], stack);
      }
    }
    return oo;
  };

  const copyArray = (a: any): any => {
    return [...a].map((e: any): any => {
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

export function copies(
  source: AnyObject,
  dest: AnyObject,
  matched: boolean = false,
  excepts: string[] = [],
): AnyObject {
  for (const k in source) {
    if (excepts.length > 0 && excepts.includes(k)) {
      continue;
    }
    if (!matched || (matched && hasProperty(dest, k))) {
      const oa = source[k];
      const ob = dest[k];
      if ((isObject(ob) && isObject(oa)) || (isArray(ob) && isArray(oa))) {
        dest[k] = copies(oa, dest[k], matched, excepts);
      } else {
        dest[k] = clone(oa);
      }
    }
  }
  return dest;
}

export const unique = <T>(arr: T[] = []): T[] => {
  return [...new Set(arr)];
};

const fnSort = (a: any, b: any): number => {
  return a > b ? 1 : (a < b ? -1 : 0);
};

export const sort = <T>(
  arr: T[] = [],
  sorting: ((a: T, b: T) => number) | null = null,
): T[] => {
  const tmp: T[] = [...arr];
  const fn: (a: T, b: T) => number = sorting || fnSort;
  tmp.sort(fn);
  return tmp;
};

export const sortBy = <T extends Record<string, any>>(
  arr: T[] = [],
  order: number = 1,
  key: string = "",
): T[] => {
  if (!isString(key) || !hasProperty(arr[0], key)) {
    return arr;
  }
  return sort(arr, (m, n) => {
    return m[key] > n[key] ? order : (m[key] < n[key] ? (-1 * order) : 0);
  });
};

export const shuffle = <T>(arr: T[] = []): T[] => {
  const input: T[] = [...arr];
  const output: T[] = [];
  let inputLen: number = input.length;
  while (inputLen > 0) {
    const index: number = Math.floor(Math.random() * inputLen);
    output.push(input.splice(index, 1)[0]);
    inputLen--;
  }
  return output;
};

export const pick = <T>(arr: T[] = [], count: number = 1): T[] => {
  const a: T[] = shuffle(arr);
  const mc: number = Math.max(1, count);
  const c: number = Math.min(mc, a.length - 1);
  return a.splice(0, c);
};

export * from "./utils/detection.ts";
export * from "./utils/string.ts";
export * from "./utils/random.ts";
export * from "./utils/date.ts";

export * from "./utils/curry.ts";
export * from "./utils/compose.ts";
export * from "./utils/pipe.ts";
