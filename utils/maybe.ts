// utils / maybe

import { defineProp } from "./defineProp.ts";

export const maybe = <T>(val: T) => {
  const __val = val;
  const isNil = (): boolean => {
    return __val === null || __val === undefined;
  };
  const value = (): T => {
    return __val;
  };
  const getElse = (fn: () => T): typeof maybe => {
    return maybe(__val || fn());
  };
  const filter = (fn: (val: T) => boolean): typeof maybe => {
    return maybe(fn(__val) === true ? __val : null);
  };
  const map = <U>(fn: (val: T) => U): typeof maybe => {
    return maybe(isNil() ? null : fn(__val));
  };
  const output = Object.create({});
  Object.defineProperty(output, "__value__", {
    value: __val,
    enumerable: true,
  });
  Object.defineProperty(output, "__type__", {
    value: "Maybe",
    enumerable: true,
  });
  Object.defineProperty(output, "isNil", {
    value: isNil,
  });
  Object.defineProperty(output, "value", {
    value: value,
  });
  Object.defineProperty(output, "map", {
    value: map,
  });
  Object.defineProperty(output, "if", {
    value: filter,
  });
  Object.defineProperty(output, "else", {
    value: getElse,
  });
  return output;
};
