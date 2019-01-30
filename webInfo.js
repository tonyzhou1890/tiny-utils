import Cookies from 'js-cookie'

const InfoTop = 'title'
const InfoBottom = 'bottom'

export function getTop() {
  return Cookies.get(InfoTop)
}

export function setTop(name) {
  Cookies.set(InfoTop, name)
}

export function removeTop() {
  Cookies.remove(InfoTop)
}

export function getBottom() {
  return Cookies.get(InfoBottom)
}

export function setBottom(name) {
  Cookies.set(InfoBottom, name)
}

export function removeBottom() {
  Cookies.remove(InfoBottom)
}
