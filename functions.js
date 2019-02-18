import { isObject, isArray } from './base'

/**
 * 将对象或数组通过HTML字符串表现出来(尚无法正式使用)
 * @param {object/array} data
 * @param {string} prefix
 */
export function printObjToHTML(data, prefix) {
  if (!isObject(data) && !isArray(data)) {
    throw new Error('参数不是对象或数组')
  }

  return toHTMLList(data, prefix)

  function toHTMLList(data, prefix) {
    let str = `<ul class="${prefix ? prefix + '-' : ''}ul">`
    Object.keys(data).map(key => {
      str += `<li class="${prefix ? prefix + '-' : ''}li">`
      if (isArray(data[key]) || isObject(data[key])) {
        str += toHTMLList(data[key], prefix)
      } else {
        str += key + `<br />` + data[key]
      }
      str += `</li>`
    })
    str += `</ul>`
    return str
  }
}

/**
 * 导出全部
 */
export default {
  printObjToHTML
}