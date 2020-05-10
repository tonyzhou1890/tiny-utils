(() => {
  const T = tinyUtil

  /**
   * 验证方法 upperCase
   */
  test('validate.upperCase-1', () => {
    chai.expect(T.validate.upperCase('abc')).to.be.false
  })

  test('validate.upperCase-2', () => {
    chai.expect(T.validate.upperCase('ABC')).to.be.true
  })

  test('validate.upperCase-3', () => {
    chai.expect(T.validate.upperCase('1AB')).to.be.false
  })

})()
