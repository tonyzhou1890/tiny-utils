(() => {
  const T = tinyUtil

  /**
   * 验证方法 date
   */
  test('validate.date-1', () => {
    chai.expect(T.validate.date('abc')).to.be.false
  })

  test('validate.date-2', () => {
    chai.expect(T.validate.date('2020-12-12')).to.be.true
  })

  test('validate.date-3', () => {
    chai.expect(T.validate.date('2020.12.12')).to.be.false
  })

  test('validate.date-4', () => {
    chai.expect(T.validate.date('2020-12-12 12:12:12')).to.be.false
  })

})()
