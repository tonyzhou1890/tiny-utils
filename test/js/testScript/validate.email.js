(() => {
  const T = tinyUtil

  /**
   * 验证方法 email
   */
  test('validate.email-1', () => {
    chai.expect(T.validate.email('abc')).to.be.false
  })

  test('validate.email-2', () => {
    chai.expect(T.validate.email('abc@')).to.be.false
  })

  test('validate.email-3', () => {
    chai.expect(T.validate.email('AaBbCc@qq.com')).to.be.true
  })

  test('validate.email-4', () => {
    chai.expect(T.validate.email('@qq')).to.be.false
  })

  test('validate.email-5', () => {
    chai.expect(T.validate.email('@qq.tda')).to.be.false
  })

  test('validate.email-6', () => {
    chai.expect(T.validate.email('123@qq.net')).to.be.true
  })

})()
