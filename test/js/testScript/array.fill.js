(() => {
  const T = tinyUtil

  /**
   * 测试数组 fill
   */
  test('array.fill-参数检查', () => {
    const _ = () => {
      return T.array.fill()
    }
    return chai.expect(_).to.throw()
  })

  test('array.fill-不替换', () => {
    const _ = () => {
      return T.array.fill([1, 2, 3, null, ,], 1)
    }
    return chai.expect(_()).to.deep.equal([1, 2, 3, 1, 1])
  })

  test('array.fill-替换', () => {
    const _ = () => {
      return T.array.fill([1, 2, 3, 4, null], 1, null, null, true)
    }
    return chai.expect(_()).to.deep.equal([1, 1, 1, 1, 1])
  })

  test('array.fill-补充不足的元素', () => {
    const _ = () => {
      return T.array.fill([1], 1, null, 5, true)
    }
    return chai.expect(_()).to.deep.equal([1, 1, 1, 1, 1])
  })
})()
