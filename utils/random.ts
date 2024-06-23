// utils / random

const crypto = globalThis.crypto;

export const genid = (len: number = 32, prefix: string = ""): string => {
  let s: string = prefix;
  const nums: Uint32Array = new Uint32Array(len);
  crypto.getRandomValues(nums);
  for (let i: number = 0; i < nums.length; i++) {
    const n: string = nums[i].toString(36);
    const r: number = Math.random();
    const c: string = n.charAt(Math.floor(r * n.length));
    s += r > 0.3 && r < 0.7 ? c.toUpperCase() : c;
  }
  return s.substring(0, len);
};

export const randint = (min: number = 0, max: number = 1e6): number => {
  const byteArray = new Uint8Array(1);
  crypto.getRandomValues(byteArray);
  const floatNum = Number("0." + byteArray[0].toString());
  return Math.floor(floatNum * (max - min + 1)) + min;
};
