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
  seed = isNumber(seed) ? seed : Date.now()
  max = isNumber(max) ? max : 1 
  min = isNumber(min) ? min : 0

  seed = (seed * 9301 + 49297) % 233280; 

  var rnd = seed / 233280.0; 
  
  return min + rnd * (max - min); 
}

/**
 * 导出全部
 */
export default {
  seedRandom
}
