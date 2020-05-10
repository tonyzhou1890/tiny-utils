(() => {
  const T = tinyUtil

  /**
   * 验证方法 phone
   */
  test('validate.phone-1', () => {
    chai.expect(T.validate.phone()).to.be.false
  })

  test('validate.phone-2', () => {
    chai.expect(T.validate.phone(18878787878)).to.be.true
  })

  test('validate.phone-3', () => {
    chai.expect(T.validate.phone(123)).to.be.false
  })

  test('validate.phone-4', () => {
    chai.expect(T.validate.phone(1887878787878)).to.be.false
  })

  test('validate.phone-5', () => {
    chai.expect(T.validate.phone('0512-83808726')).to.be.true
  })

  test('validate.phone-6', () => {
    chai.expect(T.validate.phone('0512-830872')).to.be.false
  })

})()
