/**
 * 对象相关方法
 * @module object
 */
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import isUndefined from 'lodash/isUndefined'
import cloneDeep from 'lodash/cloneDeep'
import { error } from './util'

/**
 * 对对象/数组进行过滤，提取需要的属性
 * @memberOf module:object
 * @param {Object|Array} source // 【对象/数组】源对象/数组
 * @param {Array} props // 【数组】需要提取的属性
 * @returns {Object|Array} 新的对象/数组
 */
export function filterProperties(source, props) {
  // 类型检查
  if (!isArray(source) && !isObject(source)) {
    error('函数 filterProperties 第一个参数需要是对象或数组')
  }
  if (!isArray(props)) {
    error('函数 filterProperties 第二个参数需要是数组')
  }
  // 开始过滤
  return _(source, props)

  // 过滤函数
  function _(source, props) {
    let dest = null
    // 源是否为数组
    if (isArray(source)) {
      dest = []
      for (let i = 0, len = source.length; i < len; i++) {
        // 如果元素是数组或对象，继续遍历
        if (isArray(source[i]) || isObject(source[i])) {
          dest[i] = _(source[i], props)
        } else { // 否则保留元素
          dest[i] = source[i]
        }
      }
    } else if (isObject(source)) { // 源是否为对象
      dest = {}
      for (let i = 0, len = props.length; i < len; i++) {
        if (isArray(source[props[i]])
          || isObject(source[props[i]])
        ) {
          dest[props[i]] = _(source[props[i]], props)
        } else if (!isUndefined(source[props[i]])) {
          dest[props[i]] = source[props[i]]
        }
      }
    }
    return dest
  }
}

/**
 * 属性名转换
 * @memberOf module:object
 * @param {Object|Array} source // 【对象/数组】源对象/数组
 * @param {Array} props // 【数组】需要转换的属性，未在其中的属性默认保留。合并策略：如果两个目的属性名相同并且都是数组或对象，则合并，否则直接覆盖。如果为转换值指定了转换函数，则调用函数，否则返回原值。
 */
export function transferProperties(source, props) {
  // 类型检查
  if (!isArray(source) && !isObject(source)) {
    error('函数 transferProperties 第一个参数需要是对象或数组')
  }
  if (!isArray(props)) {
    error('函数 transferProperties 第二个参数需要是数组')
  }
  // 开始转换
  return _(cloneDeep(source), props)

  // 转换函数
  function _(source, props) {
    let dest = null
    let keys = null
    let key = null
    // 源是否为数组
    if (isArray(source)) {
      dest = []
      for (let i = 0, len = source.length; i < len; i++) {
        // 如果元素是数组或对象，继续遍历
        if (isArray(source[i]) || isObject(source[i])) {
          dest[i] = _(source[i], props)
        } else { // 否则保留元素
          dest[i] = source[i]
        }
      }
    } else if (isObject(source)) { // 源是否为对象
      dest = {}
      keys = Object.keys(source)
      for (let i = 0, len = keys.length; i < len; i++) {
        key = keys[i]
        // 检查是否需要转换
        const newKey = inProp(key, props)
        // 如果需要转换并且有转换函数，则调用
        if (newKey && newKey.func) {
          source[key] = newKey.func(source[key])
        }
        // 如果属性是数组或对象，继续遍历
        if (isArray(source[key]) || isObject(source[key])) {
          if (newKey) {
            const res = _(source[key], props)
            if (isArray(dest[newKey.new]) && isArray(res)) { // 如果新的属性名已经存在，并且两者都是数组，则合并
              dest[newKey.new] = dest[newKey.new].concat(res)
            } else if (isObject(dest[newKey.new]) && isObject(res)) { // 如果新的属性名已经存在，并且两者都是对象，则合并
              dest[newKey.new] = Object.assign(dest[newKey.new], res)
            } else {
              dest[newKey.new] = _(source[key], props) // 其余的情况直接覆盖
            }
          } else {
            dest[key] = _(source[key], props)
          }
        } else if (newKey) { // 如果需要转换，则转换属性名
          dest[newKey.new] = source[key]
        } else { // 否则，直接用原来的属性名
          dest[key] = source[key]
        }
      }
    }
    return dest
  }

  // 是否需要转换
  function inProp(key, props) {
    let item = null

    for (let i = 0, len = props.length; i < len; i++) {
      item = props[i]
      if (item[0] === key) {
        return {
          old: key,
          new: item[1],
          func: isFunction(item[2]) ? item[2] : null
        }
      }
    }
  }
}

/**
 * 导出全部
 */
export default {
  filterProperties,
  transferProperties
}
