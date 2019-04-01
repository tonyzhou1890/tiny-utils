<template>
  <div
    tabindex="-1"
    @keypress.left="prev"
    @keypress.right="next"
    @mousewheel.prevent="mousewheel"
    :style="`'color: ${color}; background: ${background}'; width: ${width}px; height: ${height}px; position: relative;`"
    class="tu-book-container">
    <!-- book cover -->
    <div
      v-show="show[0]"
      :style="`background-color: gray; background-imgage: url(${cover}); background-size: 100% 100%; position: absolute; left: ${left[0]}; top: 0; width: ${pageWidth}; height: 100%; z-index: ${zIndex[0]};`"
      class="tu-book-cover">
      <p class="tu-book-title">{{ title }}</p>
    </div>
    <!-- pape -->
    <div
      v-for="item in 6"
      :key="item"
      v-show="show[item]"
      :style="`background-color: ${background}; color: ${color}; position: absolute; left: ${left[item]}; top: 0; transform: rotateY(${rotate[item] ? '180deg' : ''}); width: ${pageWidth}; height: 100%; padding: ${padding}; font-size: ${fontSize}px; font-family: ${fontFamily}; z-index: ${zIndex[item]};`"
      :class="`tu-book-page tu-book-page-${item}`">
      <div
        :style="`width: 100%; height: ${pageHeight}px; position: relative;`"
        class="tu-book-content">
        <p
          ref="page"
          :style="`position: absolute; top: ${top[item]}px; line-height: ${lineHeight}px; width: 100%;`"
          :class="`tu-book-text tu-book-text-${item}`">{{ text }}</p>
      </div>
      <p
        v-if="showPageNumber"
        v-show="showPageNumberArray[item]"
        :style="`position: absolute;width: 100%; height: ${pageNumberHeight}; font-size: ${fontSize * 0.875}px; line-height: ${pageNumberHeight}; left: 0; bottom: 0;`"
        class="tu-book-page-number">{{ pageNumber[item] + pageSeparator + totalPage }}</p>
    </div>
    <!-- back-cover -->
    <div
      v-show="show[7]"
      :style="`background-color: gray; background-imgage: url(${backCover}); background-size: 100% 100%; position: absolute; left: ${left[7]}; top: 0; width: ${pageWidth}; height: 100%; transform: rotateY(${rotate[7] ? '180deg' : ''}); z-index: ${zIndex[7]};`"
      class="tu-book-back-cover">
      <p class="tu-book-end-title">End</p>
    </div>
  </div>
</template>

<script>
import { isNumber, isArray } from '../../../base'
const defaultPagePadding = 25
export default {
  name: 'TuBook',
  props: {
    text: {
      type: String,
      default: 'this is a book component'
    },
    percent: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    },
    single: {
      type: Boolean,
      default: false
    },
    pagePadding: {
      type: [Number, Array],
      default: defaultPagePadding
    },
    showPageNumber: {
      type: Boolean,
      default: true
    },
    pageSeparator: {
      type: String,
      default: ' / '
    },
    fontSize: {
      type: Number,
      default: 16
    },
    lineHeight: {
      type: Number,
      default: 24
    },
    fontFamily: {
      type: String,
      default: 'sans-serif'
    },
    color: {
      type: String,
      default: '#333'
    },
    background: {
      type: String,
      default: 'seashell'
    },
    cover: {
      type: String,
      default: ''
    },
    backCover: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Title'
    }
  },
  data() {
    return {
      curPage: 0,
      totalPage: 1,
      left: ['25%', '25%', '25%', '25%', '25%', '25%', '25%', '25%'], // cover, paper1-1, paper1-2, paper2-1, paper2-2, paper3-1, paper3-2, backCover
      top: [0, 0, 0, 0, 0, 0, 0, 0],
      rotate: [false, false, true, false, true, false, true, false],
      pageNumber: [0, 0, 0, 0, 0, 0, 0, 0],
      showPageNumberArray: [true, true, true, true, true, true, true, true],
      zIndex: [8, 7, 6, 5, 4, 3, 2, 1]
    }
  },
  computed: {
    show() {
      // 默认双页，封面，封底都显示
      let temp = [true, true, false, true, false, false, false, true]
      if (!this.cover.length) {
        temp[0] = false
      }
      if (!this.backCover.length) {
        temp[7] = false
      }
      if (this.single) {
        temp[3] = false
      }
      if (this.curPage >= 1) {
        temp[0] = false
      }
      if (this.curPage > this.totalPage) {
        temp.fill(false)
        temp[7] = true
      }
      return temp
    },
    padding() {
      let temp = []
      if (isNumber(this.pagePadding)) {
        temp = new Array(4).fill(this.pagePadding)
      } else if (isArray(this.pagePadding)) {
        for (let i = 0; i < 4; i++) {
          temp[i] = this.pagePadding[i] !== undefined ? this.pagePadding[i] : defaultPagePadding
        }
      } else {
        temp = new Array(4).fill(defaultPagePadding)
      }
      temp.map((item, index) => {
        temp[index] = item + 'px'
      })
      return temp.join(' ')
    },
    pageWidth() {
      return this.single ? '100%' : '50%'
    },
    pageHeight() {
      return Math.floor((this.height - this.padding.split(' ')[0].split('px')[0] - this.padding.split(' ')[2].split('px')[0]) / this.lineHeight) * this.lineHeight
    },
    curPercent() {
      return this.curPage / this.totalPage * 100
    },
    pageNumberHeight() {
      return this.padding.split(' ')[2]
    },
    toWatch() {
      const { text, width, height, single, pagePadding, fontSize, lineHeight, fontFamily, cover, backCover } = this
      return { text, width, height, single, pagePadding, fontSize, lineHeight, fontFamily, cover, backCover }
    }
  },
  watch: {
    toWatch: {
      deep: true,
      handler() {
        this.init()
      },
      immediate: true
    } 
  },
  methods: {
    init() {
      this.$nextTick(_ => {
        // 计算总页数
        const s = window.getComputedStyle(this.$refs.page[0])
        window.s = s
        const h = s.height.split('px')[0]
        this.totalPage = Math.ceil(h / this.pageHeight)
        // 计算当前页
        let percent = null
        if (isNumber(this.percent) && 0 <= this.percent) {
          percent = this.percent
        } else {
          percent = 0
        }
        if (percent === 0 && this.cover.length) {
          this.curPage = 0
        } else if (percent === 0) {
          this.curPage = 1
        } else {
          let tempCurPage = Math.floor(percent / 100 * this.totalPage)
          if (tempCurPage === 0) {
            tempCurPage = 1
          }
          this.curPage = tempCurPage
        }
        // 设定一个临时数组
        let tempArr = []
        // 计算各页面页码
        tempArr = JSON.parse(JSON.stringify(this.pageNumber))
        tempArr[1] = this.curPage > this.totalPage ? this.totalPage % 2 === 1 ? this.totalPage : this.totalPage - 1 : this.curPage // 如果单页，只要设置第一个页面就可以
        if (!this.single) { // 如果双页，还需要设置第二张纸的第一页
          tempArr[3] = tempArr[1] + 1 > this.totalPage ? this.totalPage : tempArr[1] + 1
        }
        this.pageNumber = tempArr
        // 计算各页面（纸张）位置
        tempArr = JSON.parse(JSON.stringify(this.left))
        if (this.single) {  // 单页
          this.left = tempArr.fill('0')
        } else if (this.curPage === 0 || this.curPage > this.totalPage) { // 双页，并且进度为0或100
          this.left = tempArr.fill('25%')
        } else {  // 双页，并且进度不为0和100
          tempArr[0] = tempArr[1] = '0'
          tempArr[3] = '50%'
          this.left = tempArr
        }
        // 计算各页面文字内容位置
        this.computeTextTop()
      })
    },
    prev() {
      if (this.curPage <= 0) {
        return
      }
      let oldPageNumber = JSON.parse(JSON.stringify(this.pageNumber))
      // 设定临时数组
      let tempArr = []
      // 设定页码
      tempArr = JSON.parse(JSON.stringify(this.pageNumber))
      if (this.single) {
        tempArr[1] = tempArr[1] <= 1 ? 1 : tempArr[1] - 1
      } else {
        tempArr[1] = tempArr[1] <= 2 ? 1 : tempArr[1] - 2
        tempArr[3] = tempArr[1] + 1
      }
      this.pageNumber = tempArr
      // 设定当前页码
      if (oldPageNumber[1] <= 1) {
        this.curPage = 0
      } else {
        this.curPage = this.pageNumber[1]
      }
      // 计算各页面（纸张）位置
      if (!this.single && this.curPage <= 0 && this.cover.length) {
        this.left = new Array(8).fill('25%')
      } else {
        tempArr = new Array(8).fill('0')
        tempArr[3] = '50%'
        this.left = tempArr
      }
      // 计算各页面文字内容位置
      this.computeTextTop()
    },
    next() {
      if (this.curPage > this.totalPage) {
        return
      }
      let oldPageNumber = JSON.parse(JSON.stringify(this.pageNumber))
      // 设定临时数组
      let tempArr = []
      // 设定页码
      tempArr = JSON.parse(JSON.stringify(this.pageNumber))
      if (this.single) {
        tempArr[1] = tempArr[1] >= this.totalPage ? this.totalPage : tempArr[1] + 1
      } else {
        tempArr[1] = tempArr[1] + 1 >= this.totalPage ? tempArr[1] : tempArr[1] + 2
        tempArr[3] = tempArr[1] + 1
      }
      this.pageNumber = tempArr
      // 设定当前页码
      if (oldPageNumber[1] + 1 >= this.totalPage) {
        this.curPage = this.single ? oldPageNumber[1] + 1 : oldPageNumber[1] + 2
      } else {
        this.curPage = this.pageNumber[1]
      }
      // 计算各页面（纸张）位置
      if (!this.single && this.curPage > this.totalPage && this.backCover.length) {
        this.left = new Array(8).fill('25%')
      } else {
        tempArr = new Array(8).fill('0')
        tempArr[3] = '50%'
        this.left = tempArr
      }
      // 计算各页面文字内容位置
      this.computeTextTop()
    },
    // 计算各页面文字内容位置
    computeTextTop() {
      const tempArr = JSON.parse(JSON.stringify(this.top))
      tempArr[1] = - (this.pageNumber[1] - 1) * this.pageHeight  // 单页
      if (!this.single) { // 双页
        tempArr[3] = - (this.pageNumber[3] - 1) * this.pageHeight
      }
      this.top = tempArr
    },
    // 鼠标滚动事件
    mousewheel(e) {
      e.wheelDelta > 0 ? this.prev() : this.next()
    }
  }
}
</script>
