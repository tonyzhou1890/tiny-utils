(() => {
  const T = tinyUtil

  /**
   * 树结构方法 plain
   */
  test('tree.plain-参数检查', () => {
    const _ = () => {
      return T.tree.plain()
    }
    chai.expect(_).to.throw()
  })

  test('tree.plain-平铺树', () => {
    const _ = () => {
      const temp = [
        {
          id: 1,
          name: '1',
          children: [
            {
              id: 2,
              name: '1.1'
            }
          ]
        }
      ]
      return T.tree.plain(temp)
    }
    chai.expect(_()).to.have.lengthOf(2)
  })

})()
