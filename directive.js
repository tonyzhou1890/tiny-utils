/**
 * 导入loading。
 */
import loading from './directives/loading'

/**
 * 导入waves。
 */
import waves from './directives/waves'

/**
 * 导入bubble。
 */
import bubble from './directives/bubble'

/**
 * 导出全部指令，统一加上'tu'前缀
 */
export default {
  tuLoading: loading,
  tuWaves: waves,
  tuBubble: bubble
}