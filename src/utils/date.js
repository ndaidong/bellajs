// utils / date

import {
  isObject
} from './detection.js'

const DATE_FORMAT = {
  dateStyle: 'medium',
  timeStyle: 'long'
}

const TIME_CONVERS = {
  second: 1000,
  minute: 60,
  hour: 60,
  day: 24,
  week: 7,
  month: 4,
  year: 12
}

const isValidLocal = (hl) => {
  try {
    const locale = new Intl.Locale(hl)
    return locale.language !== ''
  } catch (err) {
    return false
  }
}

export const formatDateString = (...args) => {
  const input = args[0]
  const lang = isValidLocal(args[1]) ? args[1] : 'en'
  const opt = args.length >= 3
    ? args[2]
    : args.length === 1
      ? DATE_FORMAT
      : isObject(args[1])
        ? args[1]
        : DATE_FORMAT
  const dtf = new Intl.DateTimeFormat(lang, opt)
  return dtf.format(new Date(input))
}

export const formatTimeAgo = (input, lang = 'en', justnow = 'just now') => {
  const t = new Date(input)
  let delta = Date.now() - t
  if (delta <= TIME_CONVERS.second) {
    return justnow
  }
  let unit = 'second'
  for (const key in TIME_CONVERS) {
    if (delta < TIME_CONVERS[key]) {
      break
    } else {
      unit = key
      delta /= TIME_CONVERS[key]
    }
  }
  delta = Math.floor(delta)
  const rel = new Intl.RelativeTimeFormat(lang)
  return rel.format(-delta, unit)
}
