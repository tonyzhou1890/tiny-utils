(() => {
  const T = tinyUtil

  /**
   * 验证方法 mobile
   */
  test('validate.mobile-1', () => {
    chai.expect(T.validate.mobile('abc')).to.be.false
  })

  test('validate.mobile-2', () => {
    chai.expect(T.validate.mobile('187787878787')).to.be.false
  })

  test('validate.mobile-3', () => {
    chai.expect(T.validate.mobile('11111111111')).to.be.false
  })

  test('validate.mobile-4', () => {
    chai.expect(T.validate.mobile('13709090909')).to.be.true
  })

})()
