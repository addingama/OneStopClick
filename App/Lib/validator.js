export function isEmpty (text) {
  if (text !== '' && text != null) {
    return false
  }
  return true
}

export function isEmail (text) {
  if (text.match('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')) {
    return true
  }
  return false
}
