(() => {
  const T = tinyUtil

  /**
   * 字符串方法 uuid
   */
  test('string.uuid-默认长度', () => {
    const _ = () => {
      return T.string.uuid()
    }
    chai.expect(_()).to.have.lengthOf(36)
  })

  test('string.uuid-指定长度', () => {
    const _ = () => {
      return T.string.uuid(12)
    }
    chai.expect(_()).to.have.lengthOf(12)
  })

  test('string.uuid-指定长度和基数', () => {
    const _ = () => {
      return T.string.uuid(12, 2)
    }
    chai.expect(_()).to.have.lengthOf(12).to.be.match(/^[01]{0,}$/)
  })

  test('string.uuid-唯一性', () => {
    const arr = new Array(10000).fill(1)
    const _ = () => {
      for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] = T.string.uuid()
      }
      return arr
    }
    chai.expect(_()).to.each.not.equal(T.string.uuid())
  })
})()
