/**
 * 判断是否是对象
 * @param {*} data
 */
export function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

/**
 * 判断是否是数组
 * @param {*} data
 */
export function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]'
}

/**
 * 导出全部
 */
export default {
  isObject,
  isArray
}
