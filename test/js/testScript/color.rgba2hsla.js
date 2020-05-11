(() => {
  const T = tinyUtil

  /**
   * 测试颜色 rgba2hsla
   */
  test('color.rgba2hsla-参数检查', () => {
    const _ = () => {
      return T.color.rgba2hsla()
    }
    return chai.expect(_()).to.be.undefined
  })
  
  test('color.rgba2hsla-rgb', () => {
    const _ = () => {
      return T.color.rgba2hsla([0, 0, 0])
    }
    return chai.expect(_()).to.be.deep.equal([0, 0, 0])
  })
  
  test('color.rgba2hsla-rgba', () => {
    const _ = () => {
      return T.color.rgba2hsla([191, 170, 64, 1])
    }
    return chai.expect(_()).to.be.an.instanceOf(Array).to.have.lengthOf(4)
  })
})()
