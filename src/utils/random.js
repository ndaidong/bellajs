// utils / random
import ncrypto from 'node:crypto'
export { TextEncoder } from 'node:util'

export const crypto = ncrypto.webcrypto ? ncrypto.webcrypto : ncrypto

export const randint = (min = 0, max = 1e6) => {
  const byteArray = new Uint8Array(1)
  crypto.getRandomValues(byteArray)
  const floatNum = '0.' + byteArray[0].toString()
  return Math.floor(floatNum * (max - min + 1)) + min
}

const ranhex = (len) => {
  let s = ''
  const nums = crypto.getRandomValues(new Uint8Array(len))
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i].toString(16)
    const r = Math.random()
    const c = n.charAt(Math.floor(r * n.length))
    s += c
  }
  return s
}

const randomUUID = () => {
  return `${ranhex(8)}-${ranhex(4)}-${ranhex(4)}-${ranhex(4)}-${ranhex(12)}`
}

export const uuid = () => {
  return crypto.randomUUID ? crypto.randomUUID() : randomUUID()
}

const mathGen = (len = 32, prefix = '') => {
  let s = prefix
  for (let i = 0; i < len; i++) {
    const r = Math.random()
    const k = Math.floor(r * 36)
    const c = k.toString(36)
    s += (k > 9 && r > 0.3 && r < 0.7) ? c.toUpperCase() : c
  }
  return s.substring(0, len)
}

const cryptoGen = (len = 32, prefix = '') => {
  let s = prefix
  const nums = crypto.getRandomValues(new Uint16Array(len))
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i].toString(36)
    const r = Math.random()
    const c = n.charAt(Math.floor(r * n.length))
    s += (r > 0.3 && r < 0.7) ? c.toUpperCase() : c
  }
  return s.substring(0, len)
}

export const genid = (len = 32, prefix = '') => {
  return len <= 128 ? cryptoGen(len, prefix) : `${cryptoGen(99, prefix)}${mathGen(len - 99)}`
}
