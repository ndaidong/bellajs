// utils / curry

type AnyFunction = (...args: any[]) => any;

export const curry = <F extends AnyFunction>(
  fn: F,
): (...args: any[]) => any => {
  const totalArguments = fn.length;

  const next = (argumentLength: number, rest: any[]): any => {
    if (argumentLength > 0) {
      return (...args: any[]): any => {
        return next(argumentLength - args.length, [...rest, ...args]);
      };
    }
    return fn(...rest);
  };

  return next(totalArguments, []);
};
