// utils / defineProp

export const defineProp = (
  ob: object,
  key: string,
  val: any,
  config: { writable?: boolean; configurable?: boolean; enumerable?: boolean } =
    {},
): void => {
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
