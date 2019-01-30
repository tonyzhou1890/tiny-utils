import { isArray } from './judgeTypeOfData'
/**
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
  console.log(temp)
  return temp
}

/**
 * 父子不联动情况下的单选（树组件添加 check-strictly="tree" ）
 * @param {*} obj
 * @param {*} checkedObj
 * @param {*} para
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
  console.log(temp)
  return temp
}

/**
 * 树回显
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
 * @param childNodeName: 子节点名称
 * @param key: 查找键名
 * @param value: 查找键值
 */
export function findNodeInTree(tree, childNodeName, key, value) {
  for (let i = 0, len = tree.length; i < len; i++) {
    if (tree[i][key] === value) {
      return tree[i]
    }
    if (tree[i][childNodeName]) {
      const temp = findNodeInTree(tree[i][childNodeName], childNodeName, key, value)
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
 * @param childNodeName: 子节点名称
 * @param key: 查找键名
 * @param value: 查找键值
 */
export function findNodeInTreeDeep(tree, childNodeName, key, value) {
  let res = []
  tree.map((item) => {
    if (item[key] === value) {
      res.push(item)
    }
    if (item[childNodeName]) {
      res = res.concat(findNodeInTreeDeep(item[childNodeName], childNodeName, key, value))
      console.log(res)
    }
  })
  return Array.from(new Set(res))
}

/**
 * 根据指定属性给树添加属性
 * @param {*} tree
 * @param {*} newProperty
 * @param {*} oldProperty
 * @param {*} childNodeName
 * @param {*} callback // 可选参数，转变过程中的回调函数，参数是旧值，返回值是新值
 */
export function initTree(tree, newProperty, oldProperty, childNodeName, callback) {
  tree.map(item => {
    item[newProperty] = callback === undefined ? item[oldProperty] : callback(item[oldProperty])
    if (item[childNodeName]) {
      initTree(item[childNodeName], newProperty, oldProperty, childNodeName, callback)
    }
  })
}

/**
 * 给树中的节点添加需要的父属性
 */
export function setParentProperty(tree, parentPropertyName, parentPropertyValue, childPropertyName, childNodeName) {
  tree.map(item => {
    const p = item[parentPropertyName]
    if (parentPropertyValue) {
      item[childPropertyName] = parentPropertyValue
    }
    if (item[childNodeName]) {
      setParentProperty(item[childNodeName], parentPropertyName, p, childPropertyName, childNodeName)
    }
  })
  return tree
}

/**
 * 将树扁平化
 * @param {*} tree
 * @param {*} childNodeName
 */
export function plainTree(tree, childNodeName) {
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
 * @param {*} tree
 * @param {*} childNodeName
 */
export function treeNodeNumber(tree, childNodeName) {
  let number = 0
  number += tree.length
  tree.map(item => {
    if (item[childNodeName]) {
      number += treeNodeNumber(item[childNodeName], childNodeName)
    }
  })
  console.log(number)
  return number
}

/**
 * 删除空的子节点
 * @param {*} tree
 * @param {*} childNodeName
 */
export function deleteEmptyChildNode(tree, childNodeName) {
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
 * 获取树中最后一级的选中节点，参数是checkedNodes
 */
export function getLastLevel(data) {
  let res = []
  for (let i = 0, len = data.length; i < len; i++) {
    if (data[i].children) {
      res = res.concat(getLastLevel(data[i].children))
    } else {
      res.push(data[i])
    }
  }
  return Array.from(new Set(res))
}
