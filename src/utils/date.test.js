// date.test

/* eslint-env jest */

import {
  isInteger
} from './detection'

import {
  now,
  time,
  toDateString,
  toLocalDateString,
  toUTCDateString,
  toRelativeTime
} from './date'

describe('test .now() method:', () => {
  test('  check if .now() returns Date instance', () => {
    const d = now()
    expect(d).toBeInstanceOf(Date)
  })
})

describe('test .time() method:', () => {
  test('  check if .time() returns integer', () => {
    const t = time()
    expect(isInteger(t)).toBeTruthy()
  })
})

describe('test .toDateString() method:', () => {
  const atime = 1455784100752

  const samples = [
    { ouput: 'Y/m/d h:i:s', expectation: '2016/02/18 15:28:20' },
    { ouput: 'Y/m/d h:i:s A', expectation: '2016/02/18 03:28:20 PM' },
    { ouput: 'M j, Y h:i:s A', expectation: 'Feb 18, 2016 03:28:20 PM' },
    { ouput: 'l, j F Y h:i:s a', expectation: 'Thursday, 18 February 2016 03:28:20 pm' },
    { ouput: 'w D G O', expectation: '4 Thu 15 GMT+0007' },
    { ouput: 'm/d/y', expectation: '02/18/16' },
    { ouput: 'm/d/y t', expectation: '02/18/16 29' },
    { ouput: 'M jS, Y', expectation: 'Feb 18th, 2016' },
    {
      ouput: 'M jS, Y',
      expectation: 'Feb 21st, 2016',
      input: atime + 3 * 24 * 60 * 6e4
    },
    {
      ouput: 'M jS, Y',
      expectation: 'Feb 22nd, 2016',
      input: atime + 4 * 24 * 60 * 6e4
    },
    {
      ouput: 'M jS, Y',
      expectation: 'Feb 23rd, 2016',
      input: atime + 5 * 24 * 60 * 6e4
    }
  ]

  samples.forEach((sample, k) => {
    const { input = atime, ouput, expectation } = sample
    test(`  check .toDateString(${atime}, ${k}) with regular params`, () => {
      const result = toDateString(input, ouput)
      expect(result === expectation).toBeTruthy()
    })
  })

  test('  check .toDateString(invalid date)', () => {
    expect(() => {
      toDateString({})
    }).toThrowError('InvalidInput')
    expect(() => {
      toDateString('ab')
    }).toThrowError('InvalidInput')
  })
})

describe('test .toLocalDateString() method:', () => {
  test('  check if .toLocalDateString() returns correct date string', () => {
    const t = 1455784100000
    const d = toLocalDateString(t)
    const e = 'Thu, 18 Feb 2016 15:28:20 GMT+0007'
    expect(d === e).toBeTruthy()
  })

  test('  check .toUTCDateString(invalid date)', () => {
    expect(() => {
      toLocalDateString({})
    }).toThrowError('InvalidInput')
  })
})

describe('test .toUTCDateString() method:', () => {
  test('  check if .toUTCDateString() returns correct date string', () => {
    const t = 1455784100752
    const d = toUTCDateString(t)
    const e = 'Thu, 18 Feb 2016 08:28:20 GMT+0000'
    expect(d === e).toBeTruthy()
  })

  test('  check .toUTCDateString(invalid date)', () => {
    expect(() => {
      toUTCDateString({})
    }).toThrowError('InvalidInput')
  })
})

describe('test .toRelativeTime() method:', () => {
  jest.useFakeTimers()
  jest.spyOn(global, 'setTimeout')

  const t = time()

  test('  check if .toRelativeTime(t) return "Just now"', () => {
    const result = toRelativeTime(t)
    expect(result === 'Just now').toBeTruthy()
  })

  test('  check .toRelativeTime(t) after 5s', () => {
    setTimeout(() => {
      const result = toRelativeTime(t)
      expect(result === '5 seconds ago').toBeTruthy()
    }, 5000)
    jest.advanceTimersByTime(5000)
  })

  test('  check .toRelativeTime(t) after 5m', () => {
    setTimeout(() => {
      const result = toRelativeTime(t)
      expect(result === '5 minutes ago').toBeTruthy()
    }, 6e4 * 5)
    jest.advanceTimersByTime(6e4 * 5)
  })

  test('  check .toRelativeTime(t) after 5h', () => {
    setTimeout(() => {
      const result = toRelativeTime(t)
      expect(result === '5 hours ago').toBeTruthy()
    }, 6e4 * 60 * 5)
    jest.advanceTimersByTime(6e4 * 60 * 5)
  })

  test('  check .toRelativeTime(t) after 5d', () => {
    setTimeout(() => {
      const result = toRelativeTime(t)
      expect(result === '5 days ago').toBeTruthy()
    }, 6e4 * 60 * 24 * 5)
    jest.advanceTimersByTime(6e4 * 60 * 24 * 5)
  })

  test('  check .toRelativeTime(invalid date)', () => {
    expect(() => {
      toRelativeTime({})
    }).toThrowError('InvalidInput')
  })
})
