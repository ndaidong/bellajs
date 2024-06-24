// utils / detection

const ob2Str = (val: any): string => {
  return {}.toString.call(val);
};

export const isNumber = (val: any): boolean => {
  return Number(val) === val;
};

export const isInteger = (val: any): boolean => {
  return Number.isInteger(val);
};

export const isArray = (val: any): boolean => {
  return Array.isArray(val);
};

export const isString = (val: any): boolean => {
  return String(val) === val;
};

export const isBoolean = (val: any): boolean => {
  return Boolean(val) === val;
};

export const isNull = (val: any): boolean => {
  return ob2Str(val) === "[object Null]";
};

export const isUndefined = (val: any): boolean => {
  return ob2Str(val) === "[object Undefined]";
};

export const isNil = (val: any): boolean => {
  return isUndefined(val) || isNull(val);
};

export const isFunction = (val: any): boolean => {
  return ob2Str(val) === "[object Function]";
};

export const isObject = (val: any): boolean => {
  return ob2Str(val) === "[object Object]" && !isArray(val);
};

export const isDate = (val: any): boolean => {
  return val instanceof Date && !isNaN(val.valueOf());
};

export const isEmail = (val: any): boolean => {
  const re =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return isString(val) && re.test(val);
};

export const isEmpty = (val: any): boolean => {
  return !val || isNil(val) ||
    (isString(val) && val === "") ||
    (isArray(val) && val.length === 0) ||
    (isObject(val) && Object.keys(val).length === 0);
};

export const hasProperty = (obj: any, prop: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
