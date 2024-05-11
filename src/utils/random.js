// utils / random

const crypto = globalThis.crypto

export const genid = (len = 32, prefix = '') => {
  let s = prefix
  const nums = crypto.getRandomValues(new Uint32Array(len))
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i].toString(36)
    const r = Math.random()
    const c = n.charAt(Math.floor(r * n.length))
    s += (r > 0.3 && r < 0.7) ? c.toUpperCase() : c
  }
  return s.substring(0, len)
}

export const randint = (min = 0, max = 1e6) => {
  const byteArray = new Uint8Array(1)
  crypto.getRandomValues(byteArray)
  const floatNum = '0.' + byteArray[0].toString()
  return Math.floor(floatNum * (max - min + 1)) + min
}
