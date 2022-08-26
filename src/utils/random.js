// utils / random

export const randint = (min, max) => {
  const maxint = Number.MAX_SAFE_INTEGER
  if (!min || min < 0) {
    min = 0
  }
  if (!max) {
    max = maxint
  }
  if (min === max) {
    return max
  }
  if (min > max) {
    min = Math.min(min, max)
    max = Math.max(min, max)
  }
  const offset = min
  const range = max - min + 1
  return Math.floor(Math.random() * range) + offset
}
