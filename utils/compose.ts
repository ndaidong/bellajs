// utils / compose

export const compose = <T>(...fns: ((arg: T) => T)[]): (arg: T) => T => {
  return fns.reduce((f, g) => (x) => f(g(x)));
};
