import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ValiCode = 'ValiCode'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getValiCode(uuid) {
  if (uuid) {
    return Cookies.get(uuid)
  }
  return Cookies.get(ValiCode)
}

export function setValiCode(valicode) {
  return Cookies.set(ValiCode, valicode)
}

export function removeValiCode() {
  return Cookies.remove(ValiCode)
}
