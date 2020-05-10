(() => {
  const T = tinyUtil

  /**
   * 字符串方法 trimAll
   */
  test('string.trimAll', () => {
    const temp = [
      ' a',
      {
        a: '  ',
        b: ' b ',
        c: [
          null,
          {
            a: 1
          }
        ]
      },
      null,
      ' '
    ]
    const temp2 = [
      'a',
      {
        a: '',
        b: 'b',
        c: [
          null,
          {
            a: 1
          }
        ]
      },
      null,
      ''
    ]
    const _ = () => {
      return T.string.trimAll(temp)
    }
    chai.expect(_()).to.be.deep.equal(temp2)
  })
})()
