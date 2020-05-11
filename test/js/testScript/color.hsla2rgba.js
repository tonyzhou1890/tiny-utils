(() => {
  const T = tinyUtil

  /**
   * 测试颜色 hsla2rgba
   */
  test('color.hsla2rgba-参数检查', () => {
    const _ = () => {
      return T.color.hsla2rgba()
    }
    return chai.expect(_).to.throw()
  })
  
  test('color.hsla2rgba-hsl', () => {
    const _ = () => {
      return T.color.hsla2rgba([0, 0, 0])
    }
    return chai.expect(_()).to.be.deep.equal([0, 0, 0, 1])
  })

  test('color.hsla2rgba-hsla-1', () => {
    const _ = () => {
      return T.color.hsla2rgba([2, 2, 2, 1])
    }
    return chai.expect(_()).to.be.deep.equal([255, 255, 255, 1])
  })
  
  test('color.hsla2rgba-hsla-2', () => {
    const _ = () => {
      return T.color.hsla2rgba([50, 0.5, 0.5, 1])
    }
    return chai.expect(_()).to.be.deep.equal([191, 170, 64, 1])
  })
})()
