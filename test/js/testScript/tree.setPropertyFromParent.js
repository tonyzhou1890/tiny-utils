(() => {
  const T = tinyUtil

  /**
   * 树结构方法 setPropertyFromParent
   */
  test('tree.setPropertyFromParent-参数检查', () => {
    const _ = () => {
      return T.tree.setPropertyFromParent(2)
    }
    chai.expect(_).to.throw()
  })

  test('tree.setPropertyFromParent-不传入键名', () => {
    const _ = () => {
      return T.tree.setPropertyFromParent([{ a: 1 }])
    }
    chai.expect(_()).to.deep.equal([{ a: 1 }])
  })

  test('tree.setPropertyFromParent-不传入键值', () => {
    const _ = () => {
      return T.tree.setPropertyFromParent([{ a: 1 }], 'a')
    }
    chai.expect(_()).to.deep.equal([{ a: 1 }])
  })

  test('tree.setPropertyFromParent', () => {
    const temp = [
      {
        id: 1,
        children: [
          {
            id: 2
          }
        ]
      }
    ]

    const temp2 = [
      {
        id: 1,
        parentId: null,
        children: [
          {
            id: 2,
            parentId: 1
          }
        ]
      }
    ]
    const _ = () => {
      return T.tree.setPropertyFromParent(temp, 'id', 'parentId')
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

})()
