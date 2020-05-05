/**
 * 测试函数
 * @param {string} describe 描述
 * @param {Function} func 要执行的测试函数
 * @param {*} expect 结果
 */
function test(describe, func) {
  let s = Date.now()
  let success = true
  let res = null
  try {
    res = func()
  } catch (e) {
    res = e
    success = false
  }
  let color = res && success ? 'color: lightGreen;' : 'color: red;'
  let str = `%c ${describe}: ${success}, time: ${Date.now() - s}ms`
  console.log(str, color)
  if (!success) {
    console.error(res)
  }
}