// crypto.test

/* eslint-env jest */

import {
  sha256,
  sha512
} from './crypto.js'

describe('test .sha256() method:', () => {
  const inputs = [
    {
      text: 'my password',
      expectation: 'bb14292d91c6d0920a5536bb41f3a50f66351b7b9d94c804dfce8a96ca1051f2'
    },
    {
      text: 'very-"secret"-&-`long`-passphrase!!',
      expectation: '53456e0a34c7c70eb360db8e59ce45ef626546f3c0975236a988cea39bf10b29'
    }
  ]

  inputs.forEach(({ text, expectation }, k) => {
    test(`  check .sha256(${text})`, async () => {
      const actual = await sha256(text)
      expect(actual).toEqual(expectation)
    })
  })
})

describe('test .sha512() method:', () => {
  const inputs = [
    {
      text: 'my password',
      expectation: 'e28bdbf8faa97dab2203fcc89e397a4bf8d4a5b370421e5481a55f317caee4f81be5a810bb1cffc4695c32198717b9a6e835895852ee3a8689d0963463f2db15'
    },
    {
      text: 'very-"secret"-&-`long`-passphrase!!',
      expectation: 'be986f865ce339905cd57fb87aa4a56ca88a5e6021805a5a15b6426d1248c9e1135536c01ffa7f7300f453c551804e9682c5f1eaae8c1c5514812b7c68e028c7'
    }
  ]

  inputs.forEach(({ text, expectation }, k) => {
    test(`  check .sha512(${text})`, async () => {
      const actual = await sha512(text)
      expect(actual).toEqual(expectation)
    })
  })
})
