(() => {
  const T = tinyUtil

  /**
   * 验证方法 alphabets
   */
  test('validate.alphabets-1', () => {
    chai.expect(T.validate.alphabets('abc')).to.be.true
  })

  test('validate.alphabets-2', () => {
    chai.expect(T.validate.alphabets('ABC')).to.be.true
  })

  test('validate.alphabets-3', () => {
    chai.expect(T.validate.alphabets('AaBbCc')).to.be.true
  })

  test('validate.alphabets-4', () => {
    chai.expect(T.validate.alphabets('1AB')).to.be.false
  })

})()
