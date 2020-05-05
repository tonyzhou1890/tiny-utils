/**
 * 字符串相关方法
 * @module string
 */
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'

/**
 * 删除对象或数组字符串项两边的空格
 * @memberOf module:string
 * @param {Object|Array} data
 */
export function trimAll(data) {
  if (!isObject(data) && !isArray(data)) {
    return data
  }
  const keys = Object.keys(data)
  keys.map(key => {
    if (isString(data[key])) data[key] = data[key].trim()
    if (isObject(data) || isArray(data)) data[key] = trimAll(data[key])
  })
  return data
}

/**
 * 生成 uuid
 * @memberOf module:string
 * @param {number} len uuid 长度：可选，默认 36 位
 * @param {number} radix 基数：可选--2（进制）、10（进制）、16（进制）等
 */
export function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

/**
 * 导出全部
 */
export default {
  trimAll,
  uuid
}
