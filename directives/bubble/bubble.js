import { isArray, isObject, isNumber } from '../../base'
import '../../theme/default/bubble.scss'

const clickEvent = (e) => {
  // 如果不支持某些特性，直接返回
  if(!window.FileReader){
    return
  }
  e = e || event
  // 如果是input这些元素，不操作
  const WhiteList = ['INPUT', 'TEXTAREA']
  if(WhiteList.includes(e.target.tagName)){
    return
  }
  const bindEl = e.currentTarget
  const temp = bindEl.$tuDirectiveData
  const setting = {
    text: isArray(temp.text) ? temp.text : [],
    color: isArray(temp.color) ? temp.color : [],
    duration: isNumber(temp.duration) ? Math.abs(temp.duration) : 3000,
    delay: isNumber(temp.delay) && Math.abs(temp.delay) > 10 ? Math.abs(temp.delay) : 10,
    distance: isNumber(temp.distance) ? Math.abs(temp.distance) : 50,
    offset: isArray(temp.offset) ? [isNumber(temp.offset[0]) ? temp.offset[0] : 0, isNumber(temp.offset[1]) ? temp.offset[1] : -40] : [0, -40]
  }
  const el = document.createElement('p')
  let text = setting.text[Math.floor(Math.random() * setting.text.length)] || 'tiny-utils.js'
  let color = setting.color[Math.floor(Math.random() * setting.color.length)] || 'orange'
  el.innerText = text
  el.style.position = 'fixed'
  el.style.top = e.clientY + setting.offset[1] + 'px'
  el.style.left = e.clientX + setting.offset[0] + 'px'
  el.style.color = color
  el.className = 'tu-bubble'
  setTimeout(() => {
    bindEl.appendChild(el)
    setTimeout(() => {
      el.style.transition = `all ${setting.duration / 1000}s`
      el.style.top = e.clientY + setting.offset[1] - setting.distance + 'px'
      el.className = 'tu-bubble tu-bubble-hidden'
      setTimeout(() => {
        bindEl.removeChild(el)
      }, setting.duration)
    }, 16)
  }, setting.delay)
}

export default {
	bind: (el, binding) => {
    if (!isObject(binding.value)) {
      throw Error('bubble 指令绑定值需要是对象')
    }
    el.$tuDirectiveData = binding.value
    el.addEventListener('click', clickEvent)
  },
  unbind: (el) => {
    el.removeEventListener('click', clickEvent)
  }
}
