(() => {
  const T = tinyUtil

  /**
   * 测试数学方法 seedRandom
   */
  test('math.seedRandom-默认范围以内', () => {
    const _ = () => {
      const temp = new Array(1000).fill(1)
      for (let i = 0, len = temp.length; i < len; i++) {
        temp[i] = T.math.seedRandom()
      }
      return temp
    }
    chai.expect(_()).to.each.be.within(0, 1)
  })

  test('math.seedRandom-指定范围以内', () => {
    const _ = () => {
      const temp = new Array(1000).fill(1)
      for (let i = 0, len = temp.length; i < len; i++) {
        temp[i] = T.math.seedRandom(null, -10, 20)
      }
      return temp
    }
    chai.expect(_()).to.each.be.within(-10, 20)
  })

  test('math.seedRandom-指定种子相同', () => {
    const _ = () => {
      T.math.seedRandom(1)
    }
    chai.expect(_()).to.be.equal(_())
  })
  
})()
