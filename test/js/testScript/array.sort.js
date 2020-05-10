(() => {
  const T = tinyUtil

  /**
   * 测试数组 sort
   */
  test('array.sort-参数检查', () => {
    const _ = () => {
      return T.array.sort()
    }
    return chai.expect(_).to.throw()
  })
  
  test('array.sort-数字默认', () => {
    const _ = () => {
      return T.array.sort([3, 2, 5, 1])
    }
    return chai.expect(_()).to.deep.equal([1, 2, 3, 5])
  })
  
  test('array.sort-数字-指定函数', () => {
    const _ = () => {
      return T.array.sort([3, 2, 5, 1], (a, b) => a > b)
    }
    return chai.expect(_()).to.deep.equal([5, 3, 2, 1])
  })
  
  let arr1 = new Array(1000).fill(1)
  arr1.map((item, index) => {
    arr1[index] = index
  })
  let messArr1 = _.shuffle(arr1)
  let messArr1_1 = _.shuffle(arr1)
  test('array.sort-大量数字', () => {
    const _ = () => {
      return T.array.sort(messArr1)
    }
    return chai.expect(_()).to.deep.equal(arr1)
  })

  test('原生数组排序-大量数字', () => {
    const _ = () => {
      return messArr1_1.sort((a, b) => a - b)
    }
    return chai.expect(_()).to.deep.equal(arr1)
  })

  let arr2 = new Array(26).fill('A')
  arr2.map((item, index) => {
    arr2[index] = String.fromCharCode(item.charCodeAt(0) + index)
  })
  let messArr2 = _.shuffle(arr2)
  let messArr2_2 = _.cloneDeep(messArr2)
  test('array.sort-字母', () => {
    const _ = () => {
      return T.array.sort(messArr2)
    }
    return chai.expect(_()).to.deep.equal(arr2)
  })

  test('原生数组排序-字母', () => {
    const _ = () => {
      return messArr2_2.sort()
    }
    return chai.expect(_()).to.deep.equal(arr2)
  })
})()
