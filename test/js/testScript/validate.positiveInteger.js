(() => {
  const T = tinyUtil

  /**
   * 验证方法 positiveInteger
   */
  test('validate.positiveInteger-1', () => {
    chai.expect(T.validate.positiveInteger('abc')).to.be.false
  })

  test('validate.positiveInteger-2', () => {
    chai.expect(T.validate.positiveInteger(0)).to.be.false
  })

  test('validate.positiveInteger-3', () => {
    chai.expect(T.validate.positiveInteger(-1)).to.be.false
  })

  test('validate.positiveInteger-4', () => {
    chai.expect(T.validate.positiveInteger(1.1)).to.be.false
  })

  test('validate.positiveInteger-5', () => {
    chai.expect(T.validate.positiveInteger('1.')).to.be.false
  })

  test('validate.positiveInteger-6', () => {
    chai.expect(T.validate.positiveInteger(1)).to.be.true
  })


})()
