(() => {
  const T = tinyUtil

  /**
   * 树结构方法 nodeNumber
   */
  test('tree.nodeNumber-参数检查', () => {
    const _ = () => {
      return T.tree.nodeNumber(2)
    }
    chai.expect(_).to.throw()
  })

  test('tree.nodeNumber-无子节点名称', () => {
    const temp = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 4
              }
            ]
          }
        ]
      },
      {
        id: 3
      }
    ]
    const _ = () => {
      return T.tree.nodeNumber(temp)
    }
    chai.expect(_()).to.equal(4)
  })

  test('tree.nodeNumber-有子节点名称', () => {
    const temp = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 4
              }
            ]
          }
        ]
      },
      {
        id: 3
      }
    ]
    const _ = () => {
      return T.tree.nodeNumber(temp, 'a')
    }
    chai.expect(_()).to.equal(2)
  })

})()
