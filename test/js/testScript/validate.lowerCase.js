(() => {
  const T = tinyUtil

  /**
   * 验证方法 lowerCase
   */
  test('validate.lowerCase-1', () => {
    chai.expect(T.validate.lowerCase('abc')).to.be.true
  })

  test('validate.lowerCase-2', () => {
    chai.expect(T.validate.lowerCase('Abc')).to.be.false
  })

  test('validate.lowerCase-3', () => {
    chai.expect(T.validate.lowerCase('1ac')).to.be.false
  })

})()
