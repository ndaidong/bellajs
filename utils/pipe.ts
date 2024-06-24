// utils / pipe

export const pipe = <T>(...fns: ((arg: T) => T)[]): (arg: T) => T => {
  return fns.reduce((f, g) => (x) => g(f(x)));
};
