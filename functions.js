import { isObject, isArray } from './base'

/**
 * 将对象或数组通过HTML字符串表现出来(尚无法正式使用)
 * @param {object/array} data
 * @param {string} prefix
 */
export function printObjToHTML(data, prefix) {
  if (!isObject(data) && !isArray(data)) {
    throw new Error('参数不是对象或数组')
  }

  return toHTMLList(data, prefix)

  function toHTMLList(data, prefix) {
    let str = `<ul class="${prefix ? prefix + '-' : ''}ul">`
    Object.keys(data).map(key => {
      str += `<li class="${prefix ? prefix + '-' : ''}li">`
      if (isArray(data[key]) || isObject(data[key])) {
        str += toHTMLList(data[key], prefix)
      } else {
        str += key + `<br />` + data[key]
      }
      str += `</li>`
    })
    str += `</ul>`
    return str
  }
}

/**
 * 对于element ui弹窗的封装，用于删除信息的操作提示
 */
/**
 * 删除信息
 * @param self: 上下文
 * @param itemName: 待删除信息名称
 * @param uuid: 待删除信息uuid
 * @param callback：请求函数
 */
export function deleteInfo(self, itemName, uuid, callback) {
  return new Promise((resolve, reject) => {
    const h = self.$createElement
    self.$msgbox({
      title: '消息', 
      message: h('p', null, [
        h('span', null, '确定删除 ' + itemName + ' 吗？')
      ]),
      showCancelButton: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '执行中...'
          callback(uuid).then(response => {
            done()
            instance.confirmButtonLoading = false
          })
            .catch(e => {
              instance.confirmButtonLoading = false
              instance.confirmButtonText = '确定'
              reject(e)
            })
        } else {
          done()
          instance.confirmButtonLoading = false
        }
      }
    }).then(action => {
      self.$message({
        type: 'info',
        message: '删除' + itemName + '成功'
      })
      resolve(action)
    }).catch(action => {
      reject(action)
    })
  })
}

/**
 * 导出全部
 */
export default {
  printObjToHTML,
  deleteInfo
}