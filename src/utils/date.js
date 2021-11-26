// utils / date

import {
  isDate,
  isString
} from './detection'

const PATTERN = 'D, M d, Y  h:i:s A'
const WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
]

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
]

export const now = () => {
  return new Date()
}

export const time = () => {
  return Date.now()
}

const tzone = now().getTimezoneOffset()

const tz = (() => {
  const z = Math.abs(tzone / 60)
  const sign = tzone < 0 ? '+' : '-'
  return ['GMT', sign, String(z).padStart(4, '0')].join('')
})()

const _num = (n) => {
  return String(n < 10 ? '0' + n : n)
}

const _ord = (day) => {
  let s = day + ' '
  const x = s.charAt(s.length - 2)
  if (x === '1') {
    s = 'st'
  } else if (x === '2') {
    s = 'nd'
  } else if (x === '3') {
    s = 'rd'
  } else {
    s = 'th'
  }
  return s
}

export const toDateString = (input, output = PATTERN) => {
  const d = isDate(input) ? input : new Date(input)
  if (!isDate(d)) {
    throw new Error('InvalidInput: Number or Date required.')
  }

  if (!isString(output)) {
    throw new Error('Invalid output pattern.')
  }

  const vchar = /\.*\\?([a-z])/gi
  const meridiem = output.match(/(\.*)a{1}(\.*)*/i)

  const wn = WEEKDAYS
  const mn = MONTHS

  const f = {
    Y () {
      return d.getFullYear() // 2015
    },
    y () {
      return (f.Y() + '').slice(-2) // 15
    },
    F () {
      return mn[f.n() - 1] // August
    },
    M () {
      return (f.F() + '').slice(0, 3) // Aug
    },
    m () {
      return _num(f.n()) // 08
    },
    n () {
      return d.getMonth() + 1 // 8
    },
    S () {
      return _ord(f.j()) // st, nd, rd, th
    },
    j () {
      return d.getDate() // 3
    },
    d () {
      return _num(f.j()) // 03
    },
    t () {
      return new Date(f.Y(), f.n(), 0).getDate() // date in year
    },
    w () {
      return d.getDay() // weekday in number
    },
    l () {
      return wn[f.w()] // Sunday, Monday
    },
    D () {
      return (f.l() + '').slice(0, 3) // Sun, Mon
    },
    G () {
      return d.getHours() // 0 - 24
    },
    g () {
      return f.G() % 12 || 12 // 0 - 12
    },
    h () {
      return _num(meridiem ? f.g() : f.G()) // 00 - 12 or 00 - 24
    },
    i () {
      return _num(d.getMinutes()) // 00 - 59
    },
    s () {
      return _num(d.getSeconds()) // 00 - 59
    },
    a () {
      return f.G() > 11 ? 'pm' : 'am' // am, pm
    },
    A () {
      return f.a().toUpperCase() // AM, PM
    },
    O () {
      return tz
    }
  }
  /* eslint-enable */

  const _term = (t, s) => {
    return f[t] ? f[t]() : s
  }

  return output.replace(vchar, _term)
}

export const toRelativeTime = (input = time()) => {
  const d = isDate(input) ? input : new Date(input)
  if (!isDate(d)) {
    throw new Error('InvalidInput: Number or Date required.')
  }

  let delta = now() - d
  let nowThreshold = parseInt(d, 10)
  if (isNaN(nowThreshold)) {
    nowThreshold = 0
  }
  if (delta <= nowThreshold) {
    return 'Just now'
  }
  let units = null
  const conversions = {
    millisecond: 1,
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    month: 30,
    year: 12
  }
  for (const key in conversions) {
    if (delta < conversions[key]) {
      break
    } else {
      units = key
      delta /= conversions[key]
    }
  }
  delta = Math.floor(delta)
  if (delta !== 1) {
    units += 's'
  }
  return [delta, units].join(' ') + ' ago'
}

export const toUTCDateString = (input = time()) => {
  const d = isDate(input) ? input : new Date(input)
  if (!isDate(d)) {
    throw new Error('InvalidInput: Number or Date required.')
  }
  const dMinutes = d.getMinutes()
  const dClone = new Date(d)
  dClone.setMinutes(dMinutes + tzone)
  return `${toDateString(dClone, 'D, j M Y h:i:s')} GMT+0000`
}

export const toLocalDateString = (input = time()) => {
  const d = isDate(input) ? input : new Date(input)
  if (!isDate(d)) {
    throw new Error('InvalidInput: Number or Date required.')
  }
  return toDateString(d, 'D, j M Y h:i:s O')
}
