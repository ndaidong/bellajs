// equals.test

/* eslint-env jest */

import { equals } from './equals'

describe('test .equals() method:', () => {
  let val
  const positives = [
    {
      a: val,
      b: val
    },
    {
      a: 1,
      b: 1
    },
    {
      a: 'hello',
      b: 'hello'
    },
    {
      a: { name: 'alice', age: 16 },
      b: { age: 16, name: 'alice' }
    },
    {
      a: [1, 7, 'a', 0, {}],
      b: [1, 7, 'a', 0, {}]
    },
    {
      a: new Date('2021-11-26T15:32:46.160Z'),
      b: new Date('2021-11-26T15:32:46.160Z')
    }
  ]
  positives.forEach((item) => {
    test(`test .equals(${item.a}, ${item.b}) --> true`, () => {
      expect(equals(item.a, item.b)).toBe(true)
    })
  })

  const negatives = [
    {
      a: 1,
      b: '1'
    },
    {
      a: 'hello',
      b: 'heLlo'
    },
    {
      a: { name: 'alice', age: 15 },
      b: { age: 16, name: 'alice' }
    },
    {
      a: { name: 'alice', age: 15, email: 'alice@gmail.com' },
      b: { age: 16, name: 'alice' }
    },
    {
      a: [1, 7, 'a', 0],
      b: [1, 7, 0, 'a', {}]
    },
    {
      a: [1, 7, 'a', 0, {}],
      b: [1, 7, 0, 'a', {}]
    },
    {
      a: new Date('2021-11-26T15:32:46.160Z'),
      b: new Date('2021-11-26T15:32:47.160Z')
    }
  ]
  negatives.forEach((item) => {
    test(`test .equals(${item.a}, ${item.b}) --> false`, () => {
      expect(equals(item.a, item.b)).toBe(false)
    })
  })
})
