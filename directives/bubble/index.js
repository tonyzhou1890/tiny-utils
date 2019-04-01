/**
 * 文字冒泡指令
 * 值为一个对象，内容为配置项：
 *   text 要显示的文字数组
 *   color 文字颜色数组
 *   duration 动画持续时间
 *   delay 动画延迟时间
 *   distance 动画时间内运动距离，数字，代表多少像素
 *   offset 文字偏移位置，是个数组，第一个元素是 x 轴偏移，第二个元素是 y 轴偏移
 * 相关样式：
 *   .tu-bubble bubble样式
 *   .tu-bubble-hidden 隐藏动画样式
 */
import bubble from './bubble'
import '../../theme/default/bubble.scss'
export default bubble