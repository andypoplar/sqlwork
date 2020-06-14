/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return str.trim().length >= 4
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  return str.trim().length >= 6
}

export function validPhone(str) {
  return /^[1]([3-9])[0-9]{9}$/.test(str)
}
