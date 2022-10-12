// utils / cryptography

import { TextEncoder, crypto } from './random.js'

const sha = async (message, algorithm) => {
  const enc = new TextEncoder().encode(message)
  const buff = await crypto.subtle.digest(algorithm, enc)
  const hex = [...new Uint8Array(buff)].map(b => b.toString(16).padStart(2, '0')).join('')
  return hex
}

export const sha256 = async (txt = '') => {
  const hash = await sha(txt, 'SHA-256')
  return hash
}

export const sha512 = async (txt = '') => {
  const hash = await sha(txt, 'SHA-512')
  return hash
}
