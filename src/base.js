/**
 * 定义一个 Object.prototype.toString 的简写
 */
const toString = Object.prototype.toString

/**
 * 检测函数，返回类型字符串，比如：Obejct，Array
 * @param {*} data // 需要检测的值
 */
const judge = function(data) {
  return toString.call(data).slice(8,-1)
}

/**
 * 判断是否是数字
 * @param {*} data 
 */
export function isNumber(data) {
  return judge(data) === 'Number'
}

/**
 * 判断是否是字符串
 * @param {*} data 
 */
export function isString(data) {
  return judge(data) === 'String'
}

/**
 * 判断是否是布尔值
 * @param {*} data 
 */
export function isBoolean(data) {
  return typeof data === 'boolean'
}

/**
 * 判断是否未定义
 * @param {*} data 
 */
export function isUndefined(data) {
  return typeof data === 'undefined'
}

/**
 * 判断是否是null
 * @param {*} data 
 */
export function isNull(data) {
  return data === null
}

/**
 * 判断是否是对象
 * @param {*} data
 */
export function isObject(data) {
  if (isUndefined(data) || isNull(data)) {
    return false
  }
  return judge(data) === 'Object'
}

/**
 * 判断是否是数组
 * @param {*} data
 */
export function isArray(data) {
  return judge(data) === 'Array'
}

/**
 * 判断是否是函数
 * @param {*} data 
 */
export function isFunction(data) {
  return judge(data) === 'Function'
}

/**
 * 导出全部
 */
export default {
  isNumber,
  isString,
  isBoolean,
  isUndefined,
  isNull,
  isObject,
  isArray,
  isFunction
}
