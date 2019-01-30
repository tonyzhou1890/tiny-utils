import Cookies from 'js-cookie'

const NameKey = 'User-Name'

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  Cookies.set(NameKey, name)
}

export function removeName() {
  Cookies.remove(NameKey)
}
