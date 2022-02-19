// random.test

/* eslint-env jest */

import { randint } from './random.js'

describe('test .randint() method:', () => {
  const randArr = []
  while (randArr.length < 20) {
    randArr.push(randint())
  }
  test(`test .randint() after ${randArr.length} times`, () => {
    expect(randArr).toHaveLength(20)
    const uniqVal = Array.from(new Set(randArr))
    expect(uniqVal.length).toBeGreaterThan(10)
  })

  test('test .randint() with same min/max', () => {
    const q = randint(10, 10)
    expect(q).toEqual(10)
  })

  const min = 50
  const max = 80
  test(`test .randint() between ${min} - ${max}`, () => {
    for (let i = 0; i < 100; i++) {
      const q = randint(min, max)
      expect(q).toBeGreaterThanOrEqual(min)
      expect(q).toBeLessThanOrEqual(max)
    }
  })

  const min2 = 100
  const max2 = 30
  test(`test .randint() between ${min2} - ${max2}`, () => {
    for (let i = 0; i < 100; i++) {
      const q = randint(min2, max2)
      expect(q).toBeGreaterThanOrEqual(max2)
      expect(q).toBeLessThanOrEqual(min2)
    }
  })
})
