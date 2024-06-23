// utils / curry

export const curry = <T extends (...args: any[]) => any>(fn: T) => {
  const totalArguments: number = fn.length;
  const next = (argumentLength: number, rest: any[]) => {
    if (argumentLength > 0) {
      return (...args: any[]) => {
        return next(argumentLength - args.length, [...rest, ...args]);
      };
    }
    return fn(...rest);
  };
  return next(totalArguments, []);
};
