import {transferProperties} from '../../object'

const source = {
  num: [1,2,3],
  str: 'str',
  strNum: ['12', '-12'],
  obj: {
    test1: '222',
    testArr: [
      {
        a: 1,
        b: 'b'
      }
    ]
  }
}

const dest = transferProperties(source, [
  ['strNum', 'num', strToNum],
  ['test1', 'str'],
  ['testArr', 'arr']
])

function strToNum(s) {
  s.map((item, index) => {
    s[index] = Number(item)
  })
  return s
}

console.log(dest)