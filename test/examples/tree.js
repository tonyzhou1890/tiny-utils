import {setPropertyFromParent} from '../../tree'

const tree = [
  {
    id: 1,
    name: 'level1',
    children: [
      {
        id: 11,
        name: 'level11',
        children: [
          {
            id: 111,
            name: 'level111',
            children: null
          },
          {
            id: 112,
            name: 'level112',
            children: []
          }
        ]
      },
      {
        id: 12,
        name: 'level12',
        children: {}
      }
    ]
  },
  {
    id: 2,
    name: 'level2',
    children: {
      id: 21,
      name: 'level21'
    }
  },
  {
    id: 3,
    name: 'level3'
  }
]

console.log(setPropertyFromParent(tree, 'id', 'pid', 'children'))