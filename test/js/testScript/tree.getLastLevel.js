(() => {
  const T = tinyUtil

  /**
   * 树结构方法 getLastLevel
   */
  test('tree.getLastLevel-参数检查', () => {
    const _ = () => {
      return T.tree.getLastLevel(2)
    }
    chai.expect(_).to.throw()
  })

  test('tree.getLastLevel-不过滤', () => {
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

    const temp2 = [
      {
        id: 4
      },
      {
        id: 3
      }
    ]
    const _ = () => {
      return T.tree.getLastLevel(temp)
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

  test('tree.getLastLevel-过滤', () => {
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

    const temp2 = [
      {
        id: 3
      }
    ]
    const _ = () => {
      return T.tree.getLastLevel(temp, 'children', 'id', 3)
    }
    chai.expect(_()).to.deep.equal(temp2)
  })

})()
