(() => {
  const T = tinyUtil

  /**
   * 验证方法 notPositiveInteger
   */
  test('validate.notPositiveInteger-1', () => {
    chai.expect(T.validate.notPositiveInteger('abc')).to.be.false
  })

  test('validate.notPositiveInteger-2', () => {
    chai.expect(T.validate.notPositiveInteger(0)).to.be.true
  })

  test('validate.notPositiveInteger-3', () => {
    chai.expect(T.validate.notPositiveInteger(-1)).to.be.true
  })

  test('validate.notPositiveInteger-4', () => {
    chai.expect(T.validate.notPositiveInteger('-1.1')).to.be.false
  })

  test('validate.notPositiveInteger-5', () => {
    chai.expect(T.validate.notPositiveInteger('1.')).to.be.false
  })

  test('validate.notPositiveInteger-6', () => {
    chai.expect(T.validate.notPositiveInteger(1)).to.be.false
  })


})()
