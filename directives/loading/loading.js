import '../../theme/default/loading.scss'

export default {
	bind: (el, binding) => {
		const hasText = el.hasAttribute('tu-loading-text')
		const tempDiv = document.createElement('div')
		const round = document.createElement('div')
		const curStyle = window.getComputedStyle(el)
		const position = curStyle.position
		const text = document.createElement('p')
		tempDiv.className = 'tu-loading'
		round.className = 'tu-loading-round'
		text.className = 'tu-loading-text'
		tempDiv.tuLoadingRound = round
		tempDiv.tuLoadingText = text
		el.loadingElement = tempDiv
		if (hasText) {
			text.innerText = el.getAttribute('tu-loading-text')
			tempDiv.appendChild(tempDiv.tuLoadingText)
		} else {
			tempDiv.appendChild(tempDiv.tuLoadingRound)
		}
		if (position === 'absolute' || position === 'relative') {
			el.style.position = position
		} else {
			el.style.position = 'relative'
		}
		if (binding.value) {
			el.appendChild(tempDiv)
		}
	},
	update: (el, binding) => {
		if (binding.value) {
			if (el.loadingElement.parentNode === null) {
				const hasText = el.hasAttribute('tu-loading-text')
				if (hasText) {
					el.loadingElement.tuLoadingText.innerText = el.getAttribute('tu-loading-text')
					if (!el.loadingElement.querySelector('.tu-loading-text')) {
						el.loadingElement.appendChild(el.loadingElement.tuLoadingText)
					}
					if (el.loadingElement.querySelector('.tu-loading-round')) {
						el.loadingElement.removeChild(el.loadingElement.tuLoadingRound)
					}
				} else {
					if (el.loadingElement.querySelector('.tu-loading-text')) {
						el.loadingElement.removeChild(el.loadingElement.tuLoadingText)
					}
					if (!el.loadingElement.querySelector('.tu-loading-round')) {
						el.loadingElement.appendChild(el.loadingElement.tuLoadingRound)
					}
				}
				el.appendChild(el.loadingElement)
			}
		} else {
			if (el === el.loadingElement.parentNode) {
				el.removeChild(el.loadingElement)
			}
		}
	},
	unbind: (el) => {
		if (el.loadingElement.parentNode === el) {
			el.removeChild(el.loadingElement)
		}
		el.loadingElement = null
	}
}
