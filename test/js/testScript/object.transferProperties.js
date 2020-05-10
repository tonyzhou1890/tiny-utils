(() => {
  const T = tinyUtil

  /**
   * 对象方法 filterProperties
   */
  test('object.transferProperties-参数校验1', () => {
    const _ = () => {
      return T.object.transferProperties()
    }
    chai.expect(_).to.throw()
  })

  test('object.transferProperties-参数校验2', () => {
    const _ = () => {
      return T.object.transferProperties([])
    }
    chai.expect(_).to.throw()
  })

  test('object.transferProperties', () => {
    const arr = [
      {
        a: 1,
        b: 2,
        c: {
          a: 1,
          b: 2,
          c: [1]
        }
      },
      {
        a: 1,
        b: 2
      }
    ]
    const arr2 = [
      {
        aa: 1,
        b: {
          aa: 1,
          b: [1]
        }
      },
      {
        aa: 1,
        b: 2
      }
    ]
    const _ = () => {
      return T.object.transferProperties(arr, [['a', 'aa'], ['c', 'b']])
    }
    chai.expect(JSON.stringify(_())).to.be.equal(JSON.stringify(arr2))
  })
  
})()
