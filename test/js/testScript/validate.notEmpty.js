(() => {
  const T = tinyUtil

  /**
   * 验证方法 notEmpty
   */
  test('validate.notEmpty-1', () => {
    chai.expect(T.validate.notEmpty()).to.be.false
  })

  test('validate.notEmpty-2', () => {
    chai.expect(T.validate.notEmpty(null)).to.be.false
  })

  test('validate.notEmpty-3', () => {
    chai.expect(T.validate.notEmpty('')).to.be.false
  })

  test('validate.notEmpty-4', () => {
    chai.expect(T.validate.notEmpty(0)).to.be.true
  })

  test('validate.notEmpty-5', () => {
    chai.expect(T.validate.notEmpty(' ')).to.be.true
  })

})()
