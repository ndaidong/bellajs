// utils / date

const DATE_FORMAT = {
  dateStyle: 'medium',
  timeStyle: 'long',
  hour12: true
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

export const formatDateString = (input, lang = 'en', opt = DATE_FORMAT) => {
  const dtf = new Intl.DateTimeFormat([lang, 'en'], opt)
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
