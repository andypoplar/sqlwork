import Cookies from 'js-cookie'
// const inFifteenMinutes = new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
