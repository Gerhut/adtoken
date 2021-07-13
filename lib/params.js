const _e = window.encodeURIComponent
const _d = window.decodeURIComponent

/**
 * @param {string} string
 * @returns {{ [key: string]: string }}
 */
export function parse (string) {
  const object = Object.create(null)
  string.split('&').forEach(string => {
    const eqIndex = string.indexOf('=')
    if (eqIndex === -1) {
      object[_d(string)] = ''
    } else {
      const key = string.slice(0, eqIndex)
      const value = string.slice(eqIndex + 1)
      object[_d(key)] = _d(value)
    }
  })
  return object
}

/**
 * @param {{ [key: string]: string }} object
 * @returns {string}
 */
export function stringify (object) {
  return Object.keys(object).map(key => {
    const value = object[key]
    return `${_e(key)}=${_e(value)}`
  }).join('&')
}
