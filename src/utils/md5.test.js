// md5.test

/* eslint-env jest */

import { md5 } from './md5'

describe('test .md5() method:', () => {
  const keys = ['alpha', 'beta', '1277', 899]
  for (let i = 0; i < keys.length; i++) {
    const val = md5(keys[i])
    test(`test .md5() must return 32 chars (${val})`, () => {
      expect(val).toHaveLength(32)
    })
  }

  const sampleKey = 'bellajs'
  const md5Arr = []
  while (md5Arr.length < 20) {
    md5Arr.push(md5(sampleKey))
  }
  test(`test .md5(${sampleKey}) must return same value (${md5Arr[0]})`, () => {
    const uniqVal = Array.from(new Set(md5Arr))
    expect(uniqVal).toHaveLength(1)
    expect(uniqVal[0]).toEqual(md5Arr[3])
  })
})
