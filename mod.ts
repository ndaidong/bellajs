// mod.ts

import {
  hasProperty,
  isArray,
  isDate,
  isObject,
  isString,
} from "./utils/detection.ts";

export const clone = (val: any): any => {
  return structuredClone(val);
};

export const copies = (
  source: object,
  dest: object,
  matched: boolean = false,
  excepts: string[] = [],
): object => {
  const xdest = clone(dest)
  for (const k in source) {
    if (excepts.length > 0 && excepts.includes(k)) {
      continue;
    }
    if (!matched || (matched && hasProperty(dest, k))) {
      const oa: any = source[k as keyof typeof source];
      const ob: any = dest[k as keyof typeof dest];
      if ((isObject(ob) && isObject(oa)) || (isArray(ob) && isArray(oa))) {
        xdest[k] = copies(oa, dest[k as keyof typeof dest], matched, excepts);
      } else {
        xdest[k] = clone(oa);
      }
    }
  }
  return xdest;
};

export const unique = (arr: any[] = []): any[] => {
  return [...new Set(arr)];
};

const fnSort = (a: any, b: any): number => {
  return a > b ? 1 : (a < b ? -1 : 0);
};

export const sort = (
  arr: any[] = [],
  sorting: ((a: any, b: any) => number) | null = null,
): any[] => {
  const tmp: any[] = [...arr];
  const fn: (a: any, b: any) => number = sorting || fnSort;
  tmp.sort(fn);
  return tmp;
};

export const sortBy = (
  arr: any[] = [],
  order: number = 1,
  key: string = "",
): any[] => {
  if (!isString(key) || !hasProperty(arr[0], key)) {
    return arr;
  }
  return sort(arr, (m, n) => {
    return m[key] > n[key] ? order : (m[key] < n[key] ? (-1 * order) : 0);
  });
};

export const shuffle = (arr: any[] = []): any[] => {
  const input: any[] = [...arr];
  const output: any[] = [];
  let inputLen: number = input.length;
  while (inputLen > 0) {
    const index: number = Math.floor(Math.random() * inputLen);
    output.push(input.splice(index, 1)[0]);
    inputLen--;
  }
  return output;
};

export const pick = (arr: any[] = [], count: number = 1): any[] => {
  const a: any[] = shuffle(arr);
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
export * from "./utils/maybe.ts";
