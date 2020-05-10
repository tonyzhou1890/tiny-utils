(() => {
  const T = tinyUtil

  /**
   * 验证方法 floatZ
   */
  test('validate.floatZ-1', () => {
    chai.expect(T.validate.floatZ('abc')).to.be.false
  })

  test('validate.floatZ-2', () => {
    chai.expect(T.validate.floatZ(0)).to.be.true
  })

  test('validate.floatZ-3', () => {
    chai.expect(T.validate.floatZ(-1)).to.be.false
  })

  test('validate.floatZ-4', () => {
    chai.expect(T.validate.floatZ(1.1)).to.be.true
  })

  test('validate.floatZ-5', () => {
    chai.expect(T.validate.floatZ(1.11)).to.be.true
  })

  test('validate.floatZ-6', () => {
    chai.expect(T.validate.floatZ(1.111)).to.be.false
  })

  test('validate.floatZ-7', () => {
    chai.expect(T.validate.floatZ(1.111, 3)).to.be.true
  })

})()
