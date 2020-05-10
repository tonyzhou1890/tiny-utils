(() => {
  const T = tinyUtil

  /**
   * 树结构方法 findNode
   */
  test('tree.findNode-参数检查', () => {
    const _ = () => {
      return T.tree.findNode(2)
    }
    chai.expect(_).to.throw()
  })

  test('tree.findNode-不传入键名', () => {
    const _ = () => {
      return T.tree.findNode([])
    }
    chai.expect(_()).to.deep.equal([])
  })

  test('tree.findNode-不传入键值', () => {
    const _ = () => {
      return T.tree.findNode([], 'a')
    }
    chai.expect(_()).to.deep.equal([])
  })

  test('tree.findNode-找不到节点', () => {
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
      return T.tree.findNode(temp, 'id', 3)
    }
    chai.expect(_()).to.deep.equal([])
  })

  test('tree.findNode-非深度查找', () => {
    const _ = () => {
      const temp = [
        {
          id: 1,
          name: '1',
          parent: null,
          children: [
            {
              id: 2,
              name: '1.1',
              parent: 1
            },
            {
              id: 3,
              name: '1.2',
              parent: 1
            }
          ]
        }
      ]
      return T.tree.findNode(temp, 'parent', 1)
    }
    chai.expect(_()).to.have.lengthOf(1)
  })

  test('tree.findNode-深度查找', () => {
    const _ = () => {
      const temp = [
        {
          id: 1,
          name: '1',
          parent: null,
          children: [
            {
              id: 2,
              name: '1.1',
              parent: 1
            },
            {
              id: 3,
              name: '1.2',
              parent: 1
            }
          ]
        }
      ]
      return T.tree.findNode(temp, 'parent', 1, 'children', true)
    }
    chai.expect(_()).to.have.lengthOf(2)
  })
})()
