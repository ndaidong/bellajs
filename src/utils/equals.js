// utils / equals

import {
  isEmpty,
  isObject,
  isArray,
  isDate,
  hasProperty
} from './detection'

export const equals = (a, b) => {
  if (isEmpty(a) && isEmpty(b)) {
    return true
  }
  if (isDate(a) && isDate(b)) {
    return a.getTime() === b.getTime()
  }
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false
    }
    let re = true
    for (let i = 0; i < a.length; i++) {
      if (!equals(a[i], b[i])) {
        re = false
        break
      }
    }
    return re
  }
  if (isObject(a) && isObject(b)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false
    }
    let re = true
    for (const k in a) {
      if (!hasProperty(b, k) || !equals(a[k], b[k])) {
        re = false
        break
      }
    }
    return re
  }
  return a === b
}
