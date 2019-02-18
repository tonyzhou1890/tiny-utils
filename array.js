import { isArray, isNumber, isNull, isUndefined } from './base'

/**
 * 填充数组--返回值是原数组
 * @param {*} arr // 要填充的数组
 * @param {*} value // 要填充的值
 * @param {*} start // 开始填充位置，可选，默认0
 * @param {*} end // 结束填充位置，可选，默认最后一个元素
 * @param {*} replace // 是否替换现有值，可选，默认不替换
 */
export function fill(arr, value, start, end, replace) {
  if (!isArray(arr)) {
    throw new Error('第一个参数必须数组')
  }
  const s = ((start !== undefined) && isNumber(start)) ? start : 0
  const e = ((end !== undefined) && isNumber(end)) ? end : arr.length
  for (let i = s, len = e; i < len; i++) {
    // 如果元素未定义或为空或可以替换，则填充指定值
    if (isNull(arr[i]) || isUndefined(arr[i]) || replace) {
      arr[i] = value
    }
  }
  return arr
}

/**
 * 导出全部
 */
export default {
  fill
}