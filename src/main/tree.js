/**
 * 树结构相关方法
 * @module tree
 */
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import cloneDeep from 'lodash/cloneDeep'
import uniq from 'lodash/uniq'
import { error } from './util'
import { validateNotEmpty } from './validate'

/**
 * 对树进行查找，找到则返回节点数组，否则返回空数组。
 * @memberOf module:tree
 * @param {Array} tree：树
 * @param {string} key: 查找键名，不包括 undefined、null、''
 * @param {primitive} value: 查找键值--只支持基本值，不包括 undefined、null、''
 * @param {string} childNodeName: 子节点名称，可选
 * @param {Boolean} deep: 是否深度查找--默认不深度查找。不深度查找的话，找到第一个即返回结果数组
 * @returns {Array} 结果数组，没找到为空数组
 */
export function findNode(tree, key, value, childNodeName, deep) {
  if (!isArray(tree)) {
    error('函数 findNode 树数据需要是数组')
  }
  // 如果键名/键值为空，直接返回空数组
  if (!validateNotEmpty(key) || !validateNotEmpty(value)) return []

  childNodeName = isString(childNodeName) ? childNodeName : 'children'

  let res = []
  let item = null
  for (let i = 0, len = tree.length; i < len; i++) {
    item = tree[i]
    // 检查是否满足条件
    if (item[key] === value) {
      res[res.length] = item
      // 如果非深度查找，直接返回
      if (!deep) return res
    }
    // 是否有子节点
    if (isArray(item[childNodeName])) {
      res = res.concat(findNode(item[childNodeName], key, value, childNodeName, deep))
    }
  }
  
  return uniq(res)
}

/**
 * 根据指定属性给树添加属性--改变原数据
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} oldProperty // 旧属性，不包括 undefined、null、''
 * @param {string} newProperty // 新属性，不包括 undefined、null、''
 * @param {string} childNodeName // 子节点名称，可选
 * @param {Function} callback // 可选参数，转变过程中的回调函数，参数是旧值和节点，返回值是新值
 * @returns {Array} 修改后的原数据
 */
export function setProperty(tree, oldProperty, newProperty, childNodeName, callback) {
  if (!isArray(tree)) {
    error('函数 setProperty 树数据需要是数组')
  }
  // 如果键名为空，直接返回原数组
  if (!validateNotEmpty(oldProperty) || !validateNotEmpty(newProperty)) return tree
  
  childNodeName = isString(childNodeName) ? childNodeName : 'children'

  let item = null
  for (let i = 0, len = tree.length; i < len; i++) {
    item = tree[i]
    item[newProperty] = isFunction(callback) ? callback(item[oldProperty], item) : item[oldProperty]
    // 是否有子节点
    if (isArray(item[childNodeName])) {
      setProperty(item[childNodeName], oldProperty, newProperty, childNodeName, callback)
    }
  }

  return tree
}

/**
 * 给树中的节点添加需要的父属性--改变原数据
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} parentProperty // 父节点属性名称，不包括 undefined、null、''
 * @param {string} childProperty // 需要添加的子节点属性名称，不包括 undefined、null、''
 * @param {string} childNodeName // 子节点名称，可选
 * @returns {Array} 修改后的原数据
 */
export function setPropertyFromParent(tree, parentProperty, childProperty, childNodeName) {
  if (!isArray(tree)) {
    error('函数 setPropertyFromParent 树数据需要是数组')
  }
  // 如果键名为空，直接返回原数组
  if (!validateNotEmpty(parentProperty) || !validateNotEmpty(childProperty)) return tree
  
  childNodeName = isString(childNodeName) ? childNodeName : 'children'

  _(tree, null)
  return tree

  function _(tree, parentPropertyValue) {
    let item = null
    for (let i = 0, len = tree.length; i < len; i++) {
      item = tree[i]
      item[childProperty] = parentPropertyValue
      if (isArray(item[childNodeName])) {
        const t = item[parentProperty]
        _(item[childNodeName], t)
      }
    }
  }
}

/**
 * 将树扁平化
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称
 */
export function plain(tree, childNodeName) {
  if (!isArray(tree)) {
    error('函数 plain 树数据需要是数组')
  }
  childNodeName = isString(childNodeName) ? childNodeName : 'children'

  let res = []
  let item = null
  for (let i = 0, len = tree.length; i < len; i++) {
    item = tree[i]
    res[res.length] = item
    if (isArray(item[childNodeName])) {
      res = res.concat(plain(item[childNodeName], childNodeName))
    }
  }
  
  return res
}

/**
 * 统计树有多少个节点
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称
 */
export function nodeNumber(tree, childNodeName) {
  if (!isArray(tree)) {
    error('函数 nodeNumber 树数据需要是数组')
  }
  childNodeName = isString(childNodeName) ? childNodeName : 'children'

  let number = 0
  number += tree.length
  for (let i = 0, len = tree.length; i < len; i++) {
    if (isArray(tree[i][childNodeName])) {
      number += nodeNumber(tree[i][childNodeName], childNodeName)
    }
  }
  
  return number
}

/**
 * 删除空的子节点
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称
 * @returns {Array} 返回新的树
 */
export function deleteEmptyChildNode(tree, childNodeName) {
  if (!isArray(tree)) {
    error('函数 deleteEmptyChildNode 树数据需要是数组')
  }
  childNodeName = isString(childNodeName) ? childNodeName : 'children'

  let temp = cloneDeep(tree)
  _(temp)
  return temp

  // 删除空子节点
  function _(tree) {
    for (let i = 0, len = tree.length; i < len; i++) {
      if (isArray(tree[i][childNodeName])) {
        if (tree[i][childNodeName].length === 0) {
          delete tree[i][childNodeName]
        } else {
          _(tree[i][childNodeName])
        }
      }
    }
  }
}

/**
 * 获取树中最后一级的节点
 * @memberOf module:tree
 * @param {Array} tree // 树
 * @param {string} childNodeName // 子节点名称，可选，默认 ‘children’
 * @param {string} key // 筛选键名，可选，不包括 undefined、null、''
 * @param {primitive} value // 筛选键值，可选，不包括 undefined、null、''
 * @returns {Array} 节点数组
 */
export function getLastLevel(tree, childNodeName, key, value) {
  if (!isArray(tree)) {
    error('函数 getLastLevel 树数据需要是数组')
  }
  let res = []
  // 确定子节点名称
  childNodeName = isString(childNodeName) ? childNodeName : 'children'
  for (let i = 0, len = tree.length; i < len; i++) {
    if (isArray(tree[i][childNodeName])) {
      res = res.concat(getLastLevel(tree[i][childNodeName], childNodeName, key, value))
    } else {
      // 键值过滤
      if (validateNotEmpty(key) && validateNotEmpty(value)) {
        if (tree[i][key] === value) {
          res.push(tree[i])
        }
      } else {
        // 不过滤
        res.push(tree[i])
      }
    }
  }
  return uniq(res)
}

/**
 * 全部导出
 */
export default {
  findNode,
  setProperty,
  setPropertyFromParent,
  plain,
  nodeNumber,
  deleteEmptyChildNode,
  getLastLevel
}