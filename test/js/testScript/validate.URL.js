(() => {
  const T = tinyUtil

  /**
   * 验证方法 URL
   */
  test('validate.URL-1', () => {
    chai.expect(T.validate.URL()).to.be.false
  })

  test('validate.URL-2', () => {
    chai.expect(T.validate.URL('http:a.b.com')).to.be.false
  })

  test('validate.URL-3', () => {
    chai.expect(T.validate.URL('http://a.b.com?a=1')).to.be.true
  })

  test('validate.URL-4', () => {
    chai.expect(T.validate.URL('http://a.b.c.com')).to.be.true
  })

})()
