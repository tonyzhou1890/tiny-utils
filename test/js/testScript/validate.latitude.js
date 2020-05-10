(() => {
  const T = tinyUtil

  /**
   * 验证方法 latitude
   */
  test('validate.latitude-1', () => {
    chai.expect(T.validate.latitude()).to.be.false
  })

  test('validate.latitude-2', () => {
    chai.expect(T.validate.latitude('0')).to.be.true
  })

  test('validate.latitude-3', () => {
    chai.expect(T.validate.latitude('90.123123')).to.be.false
  })

  test('validate.latitude-4', () => {
    chai.expect(T.validate.latitude('89.212112')).to.be.true
  })

  test('validate.latitude-5', () => {
    chai.expect(T.validate.latitude('-90')).to.be.true
  })

  test('validate.latitude-6', () => {
    chai.expect(T.validate.latitude('-91')).to.be.false
  })
  
  test('validate.latitude-7', () => {
    chai.expect(T.validate.latitude('89.11111111')).to.be.false
  })
  
  test('validate.latitude-8', () => {
    chai.expect(T.validate.latitude('-19.1212121')).to.be.false
  })

})()
