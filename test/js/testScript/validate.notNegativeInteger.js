(() => {
  const T = tinyUtil

  /**
   * 验证方法 notNegativeInteger
   */
  test('validate.notNegativeInteger-1', () => {
    chai.expect(T.validate.notNegativeInteger('abc')).to.be.false
  })

  test('validate.notNegativeInteger-2', () => {
    chai.expect(T.validate.notNegativeInteger(0)).to.be.true
  })

  test('validate.notNegativeInteger-3', () => {
    chai.expect(T.validate.notNegativeInteger(-1)).to.be.false
  })

  test('validate.notNegativeInteger-4', () => {
    chai.expect(T.validate.notNegativeInteger(1)).to.be.true
  })

  test('validate.notNegativeInteger-5', () => {
    chai.expect(T.validate.notNegativeInteger(1.1)).to.be.false
  })

  test('validate.notNegativeInteger-6', () => {
    chai.expect(T.validate.notNegativeInteger('-1.')).to.be.false
  })


})()
