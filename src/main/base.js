/**
 * 基本方法--实际上是不好归类的方法
 * @module error
 */
/**
 * 报错
 * @memberOf module:error
 */
export function error(msg) {
  throw new Error(msg || '出错了')
}

// 导出全部
export default {
  error
}
