(() => {
  const T = tinyUtil

  /**
   * 树结构方法 deleteEmptyChildNode
   */
  test('tree.deleteEmptyChildNode-参数检查', () => {
    const _ = () => {
      return T.tree.deleteEmptyChildNode(2)
    }
    chai.expect(_).to.throw()
  })

  test('tree.deleteEmptyChildNode-无子节点名称', () => {
    const temp = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: []
          }
        ]
      },
      {
        id: 3
      }
    ]

    const temp2 = [
      {
        id: 1,
        children: [
          {
            id: 2
          }
        ]
      },
      {
        id: 3
      }
    ]
    const _ = () => {
      return T.tree.deleteEmptyChildNode(temp)
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

  test('tree.deleteEmptyChildNode-有子节点名称', () => {
    const temp = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: []
          }
        ]
      },
      {
        id: 3,
        child: []
      }
    ]

    const temp2 = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: []
          }
        ]
      },
      {
        id: 3
      }
    ]
    const _ = () => {
      return T.tree.deleteEmptyChildNode(temp, 'child')
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

})()
