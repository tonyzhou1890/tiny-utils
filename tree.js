import { isArray } from './base'
/**
 * 父子联动情况下的选择
 * 响应点击复选框行为
 * 1.根据 para.single 判断是否可以复选
 * 2.根据 obj.children 判断是否包含子节点
 * 3.根据 obj.id 和 checkedObj.checkedKeys 判断是否选中
 * 4.设定除自身外的所有节点为未选中状态
 *    4.1.如果节点不包含子节点
 *        4.1.1.如果可以复选，不改变默认行为
 *        4.1.2.如果不可以复选，设定自身外的所有节点为(未)选中状态
 *    4.2.如果节点包含子节点
 *        4.2.1.如果可以复选，不改变默认行为
 *        4.2.2.如果不可以复选
 *            4.2.2.1.如果当前节点为半选，则取消选中状态
 *            4.2.2.2.如果当前为未选中状态，首先设定所有节点为未选中，然后设定后代节点中第一个节点为非父节点的为(未)选中状态
 * 5.将选中结果存入临时变量
 * 6.返回结果
 *    6.1.如果可以复选，返回obj和checkedObj组成的对象
 *    6.2.如果不可以复选，返回obj、checkObj和当前选中id组成的对象
 * @param {*} obj // element ui tree 组件 check 事件返回的传递给 data 属性的数组中该节点所对应的对象
 * @param {*} checkedObj // element ui tree 组件 check 事件返回的第二个参数：树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
 * @param {*} para // 自定义参数，包括 single 和 tree 两个属性。single 表明是否单选 true：单选，false：多选。tree 是 tree 组件元素的引用。比如 this.$refs.tree
 */
export function treeSelect(obj, checkedObj, para) {
  const single = para.single
  const tree = para.tree
  const temp = {
    obj,
    checkedObj
  }

  if (!single) {
    // 不做处理
  } else {
    if (!obj.children) {
      checkedObj.checkedKeys.map((item) => {
        if (item !== obj.id) {
          tree.setChecked(item, false)
        }
      })
      if (checkedObj.checkedKeys.indexOf(obj.id) !== -1) {
        tree.setChecked(obj.id, true)
        temp.id = obj.id
      }
    } else {
      checkedObj.checkedKeys.map((item) => {
        tree.setChecked(item, false)
      })
      if (checkedObj.checkedKeys.indexOf(obj.id) !== -1) {
        for (let tempO = obj.children; ;) {
          if (tempO[0].children) {
            tempO = tempO[0].children
            continue
          }
          tree.setChecked(tempO[0].id, true)
          temp.id = tempO[0].id
          break
        }
      }
    }
  }
  return temp
}

/**
 * 父子不联动情况下的选择（树组件添加 check-strictly="tree" ）
 * @param {*} obj // element ui tree 组件 check 事件返回的传递给 data 属性的数组中该节点所对应的对象
 * @param {*} checkedObj // element ui tree 组件 check 事件返回的第二个参数：树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
 * @param {*} para // 自定义参数，包括 single 和 tree 两个属性。single 表明是否单选 true：单选，false：多选。tree 是 tree 组件元素的引用。比如 this.$refs.tree
 */
export function treeSelectNoLinkage(obj, checkedObj, para) {
  const single = para.single
  const tree = para.tree
  const temp = {
    obj,
    checkedObj
  }

  if (!single) {
    // 不做处理
  } else {
    checkedObj.checkedKeys.map((item) => {
      if (item !== obj.id) {
        tree.setChecked(item, false)
      }
    })
    if (checkedObj.checkedKeys.indexOf(obj.id) !== -1) {
      tree.setCurrentNode(obj)
      temp.id = obj.id
    }
  }
  return temp
}

/**
 * 树回显
 * 调用 element ui tree 组件的 getCheckedKeys 方法和 setChecked 方法实现
 * @param {*} tree // tree 组件元素的引用。比如 this.$refs.tree
 * @param {*} checked // 选中节点或id数组
 */
export function showBack(tree, checked) {
  tree.getCheckedKeys().map(item => {
    tree.setChecked(item, false)
  })
  checked.map(item => {
    tree.setChecked(item, true)
  })
}

/**
 * 对树进行查找，找到则返回节点，否则返回false。
 * @param tree：树
 * @param key: 查找键名
 * @param value: 查找键值
 * @param childNodeName: 子节点名称
 */
export function findNodeInTree(tree, key, value, childNodeName) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i][key] === value) {
      return tree[i]
    }
    if (tree[i][childNodeName]) {
      const temp = findNodeInTree(tree[i][childNodeName], key, value, childNodeName)
      if (temp) {
        return temp
      }
    }
  }
  return false
}

/**
 * 对树进行深度查找，找到则返回节点数组，否则返回空数组。
 * @param tree：树
 * @param key: 查找键名
 * @param value: 查找键值
 * @param childNodeName: 子节点名称
 */
export function findNodeInTreeDeep(tree, key, value, childNodeName ) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  let res = []
  tree.map((item) => {
    if (item[key] === value) {
      res.push(item)
    }
    if (item[childNodeName]) {
      res = res.concat(findNodeInTreeDeep(item[childNodeName], key, value, childNodeName))
    }
  })
  return Array.from(new Set(res))
}

/**
 * 根据指定属性给树添加属性
 * @param {*} tree // 树
 * @param {*} oldProperty // 旧属性
 * @param {*} newProperty // 新属性
 * @param {*} childNodeName // 子节点名称
 * @param {*} callback // 可选参数，转变过程中的回调函数，参数是旧值，返回值是新值
 */
export function setProperty(tree, oldProperty, newProperty, childNodeName, callback) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  tree.map(item => {
    item[newProperty] = callback === undefined ? item[oldProperty] : callback(item[oldProperty])
    if (item[childNodeName]) {
      setProperty(item[childNodeName], oldProperty, newProperty, childNodeName, callback)
    }
  })
}

/**
 * 给树中的节点添加需要的父属性
 * @param {*} tree // 树
 * @param {*} parentProperty // 父节点属性名称
 * @param {*} childProperty // 需要添加的子节点属性名称
 * @param {*} childNodeName // 子节点名称
 */
export function setPropertyFromParent(tree, parentProperty, childProperty, childNodeName) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  tempFunction(tree, parentProperty, null, childProperty, childNodeName)
  return tree

  function tempFunction(tree, parentProperty, parentPropertyValue, childProperty, childNodeName) {
    tree.map(item => {
      item[childProperty] = parentPropertyValue
      if (item[childNodeName] && isArray(item[childNodeName])) {
        const t = item[parentProperty]
        tempFunction(item[childNodeName], parentProperty, t, childProperty, childNodeName)
      }
    })
  }
}

/**
 * 将树扁平化
 * @param {*} tree // 树
 * @param {*} childNodeName // 子节点名称
 */
export function plainTree(tree, childNodeName) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  let res = []
  tree.map(item => {
    res.push(item)
    if (item[childNodeName]) {
      res = res.concat(plainTree(item[childNodeName], childNodeName))
    }
  })
  return res
}

/**
 * 统计树有多少个节点
 * @param {*} tree // 树
 * @param {*} childNodeName // 子节点名称
 */
export function treeNodeNumber(tree, childNodeName) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  let number = 0
  number += tree.length
  tree.map(item => {
    if (item[childNodeName]) {
      number += treeNodeNumber(item[childNodeName], childNodeName)
    }
  })
  return number
}

/**
 * 删除空的子节点
 * @param {*} tree // 树
 * @param {*} childNodeName // 子节点名称
 */
export function deleteEmptyChildNode(tree, childNodeName) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  const temp = JSON.parse(JSON.stringify(tree))
  deleteEmpty(temp, childNodeName)
  return temp

  // 删除空子节点
  function deleteEmpty(tree, childNodeName) {
    tree.map(item => {
      if (item[childNodeName] && isArray(item[childNodeName])) {
        if (item[childNodeName].length === 0) {
          delete item[childNodeName]
        } else {
          deleteEmpty(item[childNodeName], childNodeName)
        }
      }
    })
  }
}

/**
 * 获取树中最后一级的节点
 * @param {*} tree // 树
 * @param {*} childNodeName // 子节点名称，可选，，默认 ‘children’
 * @param {*} key // 筛选键名，可选
 * @param {*} value // 筛选键值，可选
 */
export function getLastLevel(tree, childNodeName, key, value) {
  if (!isArray(tree)) {
    throw new Error('树数据不是数组')
  }
  let res = []
  // 确定子节点名称
  let children = childNodeName || 'children'
  for (let i = 0, len = tree.length; i < len; i++) {
    if (isArray(tree[i][children])) {
      res = res.concat(getLastLevel(tree[i][children], key, value))
    } else {
      // 键值过滤
      if (key !== undefined && value !== undefined) {
        if (tree[i][key] === value) {
          res.push(tree[i])
        }
      } else {
        // 不过滤
        res.push(tree[i])
      }
    }
  }
  return Array.from(new Set(res))
}

/**
 * 全部导出
 */
export default {
  treeSelect,
  treeSelectNoLinkage,
  showBack,
  findNodeInTree,
  findNodeInTreeDeep,
  setProperty,
  setPropertyFromParent,
  plainTree,
  treeNodeNumber,
  deleteEmptyChildNode,
  getLastLevel
}