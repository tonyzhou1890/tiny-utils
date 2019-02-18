import {isString, isObject, isArray} from './base'
/**
 * 字符串相关方法
 */
/**
 * 删除对象或数组字符串项两边的空格
 * @param {*} data
 */
export function deleteSpace(data) {
  if (!isObject(data) && !isArray(data)) {
    return data
  }
  const keys = Object.keys(data)
  keys.map(key => {
    if (isString(data[key])) data[key] = data[key].trim()
    if (isObject(data) || isArray(data)) data[key] = deleteSpace(data[key])
  })
  return data
}

/**
 * 删除字符串两端空格
 * @param {*} str
 */
export function deleteStrSpace(str) {
  if (!isString(str)) return str
  return str.trim()
}

/**
 * 导出全部
 */
export default {
  deleteSpace,
  deleteStrSpace
}
