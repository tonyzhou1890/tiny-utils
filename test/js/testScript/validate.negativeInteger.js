(() => {
  const T = tinyUtil

  /**
   * 验证方法 negativeInteger
   */
  test('validate.negativeInteger-1', () => {
    chai.expect(T.validate.negativeInteger('abc')).to.be.false
  })

  test('validate.negativeInteger-2', () => {
    chai.expect(T.validate.negativeInteger(0)).to.be.false
  })

  test('validate.negativeInteger-3', () => {
    chai.expect(T.validate.negativeInteger(-1)).to.be.true
  })

  test('validate.negativeInteger-4', () => {
    chai.expect(T.validate.negativeInteger(1)).to.be.false
  })

  test('validate.negativeInteger-5', () => {
    chai.expect(T.validate.negativeInteger(-1.1)).to.be.false
  })

  test('validate.negativeInteger-6', () => {
    chai.expect(T.validate.negativeInteger('-1.')).to.be.false
  })


})()
