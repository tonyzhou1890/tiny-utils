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
