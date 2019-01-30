/**
 * 删除字符串两边的空格(简单情况)
 * @param {*} data
 */
export function deleteSpace(data) {
  if (!(data instanceof Object)) return data
  const keys = Object.keys(data)
  keys.map(key => {
    if ((typeof data[key]) === 'string') data[key] = data[key].trim()
    if (data[key] instanceof Object) data[key] = deleteSpace(data[key])
  })
  return data
}

/**
 * 删除字符串两端空格
 * @param {*} str
 */
export function deleteStrSpace(str) {
  if (!(typeof str === 'string')) return str
  return str.trim()
}
