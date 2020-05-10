(() => {
  const T = tinyUtil

  /**
   * 验证方法 longitude
   */
  test('validate.longitude-1', () => {
    chai.expect(T.validate.longitude()).to.be.false
  })

  test('validate.longitude-2', () => {
    chai.expect(T.validate.longitude('0')).to.be.true
  })

  test('validate.longitude-3', () => {
    chai.expect(T.validate.longitude('120.123123')).to.be.true
  })

  test('validate.longitude-4', () => {
    chai.expect(T.validate.longitude('120.21212112')).to.be.false
  })

  test('validate.longitude-5', () => {
    chai.expect(T.validate.longitude('120.')).to.be.true
  })

  test('validate.longitude-6', () => {
    chai.expect(T.validate.longitude('189.12121212')).to.be.false
  })
  
  test('validate.longitude-7', () => {
    chai.expect(T.validate.longitude('-189.12121212')).to.be.false
  })
  
  test('validate.longitude-8', () => {
    chai.expect(T.validate.longitude('-19.121212')).to.be.true
  })

})()
