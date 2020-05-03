import { isObject, isArray, isFunction } from './base'

/**
 * 对对象/数组进行过滤，提取需要的属性
 * @param {*} source // 【对象/数组】源对象/数组
 * @param {*} reserveProperties // 【数组】需要提取的属性
 */
export function filterProperties(source, reserveProperties) {
  let dest = null
  // 类型检查
  if (!isArray(source) && !isObject(source)) {
    throw new Error('第一个参数不是对象或数组')
  }
  if (!isArray(reserveProperties)) {
    throw new Error('第二个参数不是数组')
  }
  // 开始过滤
  dest = filter(source, reserveProperties)
  return dest

  // 过滤函数
  function filter(source, reserveProperties) {
    source = JSON.parse(JSON.stringify(source))
    let dest
    // 源是否为数组
    if (isArray(source)) {
      dest = source
      dest.map((element, index) => {
        // 如果元素是数组或对象，继续遍历
        if (isArray(element) || isObject(element)) {
          dest[index] = filter(element, reserveProperties)
        }
      })
    } else if (isObject(source)) { // 源是否为对象
      dest = {}
      reserveProperties.map(prop => {
        // 如果属性是数组或对象，继续遍历
        if (isArray(source[prop]) || isObject(source[prop])) {
          dest[prop] = filter(source[prop], reserveProperties)
        } else if (source[prop] !== undefined) {
          dest[prop] = source[prop]
        }
      })
    }
    return dest
  }
}

/**
 * 属性名转换
 * @param {*} source // 【对象/数组】源对象/数组
 * @param {*} transferProperties // 【数组】需要转换的属性，未在其中的属性默认保留。合并策略：如果两个目的属性名相同并且都是数组或对象，则合并，否则直接覆盖。如果为转换值指定了转换函数，则调用函数，否则返回原值。
 */
export function transferProperties(source, transferProperties) {
  let dest = null
  // 类型检查
  if (!isArray(source) && !isObject(source)) {
    throw new Error('第一个参数不是对象或数组')
  }
  if (!isArray(transferProperties)) {
    throw new Error('第二个参数不是数组')
  }
  // 开始转换
  dest = transfer(source, transferProperties)
  return dest

  // 转换函数
  function transfer(source, transferProperties) {
    source = JSON.parse(JSON.stringify(source))
    let dest
    // 源是否为数组
    if (isArray(source)) {
      dest = source
      dest.map((element, index) => {
        // 如果元素是数组或对象，继续遍历
        if (isArray(element) || isObject(element)) {
          dest[index] = transfer(element, transferProperties)
        }
      })
    } else if (isObject(source)) { // 源是否为对象
      dest = {}
      Object.keys(source).map(key => {
        // 检查是否需要转换
        const newKey = inProp(key, transferProperties)
        // 如果需要转换并且有转换函数，则调用
        if (newKey && newKey.func) {
          source[key] = newKey.func(source[key])
        }
        // 如果属性是数组或对象，继续遍历
        if (isArray(source[key]) || isObject(source[key])) {
          if (newKey) {
            const res = transfer(source[key], transferProperties)
            if (isArray(dest[newKey.new]) && isArray(res)) { // 如果新的属性名已经存在，并且两者都是数组，则合并
              dest[newKey.new] = dest[newKey.new].concat(res)
            } else if (isObject(dest[newKey.new]) && isObject(res)) { // 如果新的属性名已经存在，并且两者都是对象，则合并
              dest[newKey.new] = Object.assign(dest[newKey.new], res)
            } else {
              dest[newKey.new] = transfer(source[key], transferProperties) // 其余的情况直接覆盖
            }
          } else {
            dest[key] = transfer(source[key], transferProperties)
          }
        } else if (newKey) { // 如果需要转换，则转换属性名
          dest[newKey.new] = source[key]
        } else { // 否则，直接用原来的属性名
          dest[key] = source[key]
        }
      })
    }
    return dest
  }

  // 是否需要转换
  function inProp(key, transferProperties) {
    let res = null
    transferProperties.map(item => {
      if (item[0] === key) {
        res = {
          old: key,
          new: item[1],
          func: isFunction(item[2]) ? item[2] : null
        }
      }
    })
    return res
  }
}

/**
 * 导出全部
 */
export default {
  filterProperties,
  transferProperties
}
