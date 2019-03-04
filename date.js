import { isString, isUndefined } from './base'

/**
 * Created by jiachenpan on 16/11/18.
 * 时间转换
 * @param {*} time // 时间
 * @param {*} cFormat // 要转换的格式
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 将时间字符串转为 date 对象。参数需要是"2019-01-01 01:01:01"格式的字符串。如果参数是空字符串，则返回值也是空字符串。
 * @param {*} time 
 */
export function initDate(time) {
  if (!isString(time) || isUndefined(time)) {
    throw new Error('参数需要是字符串')
  }
  if (time === '') {
    return ''
  }
  time = time.replace(/-/g, '/')
  return new Date(time)
}

/**
 * 导出全部
 */
export default {
  parseTime,
  initDate
}