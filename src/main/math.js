/**
 * 数学相关方法
 * @module math
 */
import isNumber from 'lodash/isNumber'

/**
 * 种子随机数
 * @memberOf module:math
 * @param {number} seed 
 * @param {number} max 
 * @param {number} min 
 */
export function seedRandom(seed, max, min) {
  let rnd = null
  max = isNumber(max) ? max : 1 
  min = isNumber(min) ? min : 0
  // 如果有传入种子，按照种子计算
  if (isNumber(seed)) {
    seed = (seed * 9301 + 49297) % 233280; 
    rnd = seed / 233280.0; 
  } else {
    // 否则调用原生随机数方法--不使用时间戳是因为 1ms 内计算出的随机数都是一样的
    rnd = Math.random()
  }
  
  return min + rnd * (max - min); 
}

/**
 * 导出全部
 */
export default {
  seedRandom
}
