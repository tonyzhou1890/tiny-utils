(() => {
  const T = tinyUtil

  /**
   * 树结构方法 setProperty
   */
  test('tree.setProperty-参数检查', () => {
    const _ = () => {
      return T.tree.setProperty(2)
    }
    chai.expect(_).to.throw()
  })

  test('tree.setProperty-不传入键名', () => {
    const _ = () => {
      return T.tree.setProperty([{ a: 1 }])
    }
    chai.expect(_()).to.deep.equal([{ a: 1 }])
  })

  test('tree.setProperty-不传入键值', () => {
    const _ = () => {
      return T.tree.setProperty([{ a: 1 }], 'a')
    }
    chai.expect(_()).to.deep.equal([{ a: 1 }])
  })

  test('tree.setProperty-无callback', () => {
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
        name: 1,
        children: [
          {
            id: 2,
            name: 2
          }
        ]
      }
    ]
    const _ = () => {
      return T.tree.setProperty(temp, 'id', 'name')
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

  test('tree.setProperty-有callback', () => {
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
        name: '1',
        children: [
          {
            id: 2,
            name: '2'
          }
        ]
      }
    ]
    const _ = () => {
      return T.tree.setProperty(temp, 'a', 'name', null, (value, item) => String(item.id))
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

})()
