(() => {
  const T = tinyUtil

  /**
   * 验证方法 pwd
   */
  test('validate.pwd-1', () => {
    chai.expect(T.validate.pwd('abc')).to.be.false
  })

  test('validate.pwd-2', () => {
    chai.expect(T.validate.pwd(123456)).to.be.true
  })

  test('validate.pwd-3', () => {
    chai.expect(T.validate.pwd('123456qwertyQWERTYHGFD')).to.be.false
  })

  test('validate.pwd-4', () => {
    chai.expect(T.validate.pwd(1.1)).to.be.false
  })

  test('validate.pwd-5', () => {
    chai.expect(T.validate.pwd('1.')).to.be.false
  })

})()
