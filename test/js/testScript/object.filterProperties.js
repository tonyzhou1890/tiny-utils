(() => {
  const T = tinyUtil

  /**
   * 对象方法 filterProperties
   */
  test('object.filterProperties-参数校验1', () => {
    const _ = () => {
      return T.object.filterProperties()
    }
    chai.expect(_).to.throw()
  })

  test('object.filterProperties-参数校验2', () => {
    const _ = () => {
      return T.object.filterProperties([])
    }
    chai.expect(_).to.throw()
  })

  test('object.filterProperties', () => {
    const arr = [
      {
        a: 1,
        b: 2,
        c: {
          a: 1,
          b: 2,
          c: [1],
          d: 4
        }
      },
      {
        a: 1,
        b: 2
      }
    ]
    const arr2 = [
      {
        a: 1,
        c: {
          a: 1,
          c: [1]
        }
      },
      {
        a: 1
      }
    ]
    const _ = () => {
      return T.object.filterProperties(arr, ['a', 'c'])
    }
    chai.expect(JSON.stringify(_())).to.be.equal(JSON.stringify(arr2))
  })
  
})()
