/**
 * 数组相关方法
 * @module array
 */
import isArray from 'lodash/isArray'
import isUndefined from 'lodash/isUndefined'
import isNull from 'lodash/isNull'
import isNumber from 'lodash/isNumber'
import isFunction from 'lodash/isFunction'
import { error } from './base'

/**
 * 填充数组--返回值是原数组
 * @memberOf module:array
 * @param {Array} arr // 要填充的数组
 * @param {*} value // 要填充的值
 * @param {number} start // 开始填充位置，可选，默认0
 * @param {number} end // 结束填充位置，可选，默认最后一个元素
 * @param {boolean} replace // 是否替换现有值，可选，默认不替换
 */
export function fill(arr, value, start, end, replace) {
  if (!isArray(arr)) {
    error('函数 fill 第一个参数必须是数组')
  }
  const s = isNumber(start) ? start : 0
  const e = isNumber(end) ? end : arr.length
  for (let i = s, len = e; i < len; i++) {
    // 如果元素未定义或为空或可以替换，则填充指定值
    if (isNull(arr[i]) || isUndefined(arr[i]) || replace) {
      arr[i] = value
    }
  }
  return arr
}

/**
 * 排序--返回值为原数组
 * @memberOf module:array
 * @param {Array} arr // 排序的数组
 * @param {Function} func // 比较函数：可选。参数为需要比较的两个元素，返回值为 true/false。
 */
export function sort(arr, func) {
  if (!isArray(arr)) {
    error('函数 sort 第一个参数必须是数组')
  }
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      let flag = false
      if (isFunction(func)) {
        if (!func(arr[j], arr[j + 1])) {
          flag = true
        }
      } else {
        if (arr[j] > arr[j + 1]) {
          flag = true
        }
      }
      if (flag) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}

// 导出全部
export default {
  fill,
  sort
}