(() => {
  const T = tinyUtil

  /**
   * 测试颜色 parse
   */
  test('color.parse-参数检查', () => {
    const _ = () => {
      return T.color.parse()
    }
    return chai.expect(_()).to.be.undefined
  })
  
  test('color.parse-参数检查', () => {
    const _ = () => {
      return T.color.parse('abc')
    }
    return chai.expect(_()).to.be.undefined
  })

  test('color.parse-颜色名称', () => {
    const _ = () => {
      return T.color.parse('red')
    }
    return chai.expect(_()).to.be.an.instanceOf(Array).to.have.lengthOf(4)
  })
  
  test('color.parse-十六进制', () => {
    const _ = () => {
      return T.color.parse('#123123')
    }
    return chai.expect(_()).to.be.an.instanceOf(Array).to.have.lengthOf(4)
  })
  
  test('color.parse-rgba', () => {
    const _ = () => {
      return T.color.parse('rgba(3, 2, 5, 1)')
    }
    return chai.expect(_()).to.be.deep.equal([3, 2, 5, 1])
  })

  test('color.parse-hsla', () => {
    const _ = () => {
      return T.color.parse('hsla(50%, 50%, 50%, 1)')
    }
    return chai.expect(_()).to.be.an.instanceOf(Array).to.have.lengthOf(4)
  })
})()
