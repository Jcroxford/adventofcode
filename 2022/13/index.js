const R = require('ramda')

const parseInput = cb => R.pipe(
  R.trim,
  R.split('\n'),
  R.map(eval), // eslint-disable-line
  R.splitEvery(3),
  R.map(R.slice(0, 2)),
  cb
)

function part1 (input) {
  return input.reduce((total, pair, i) => {
    const result = comparePairs(...pair)
    // console.log('result: ', result);
    return result === resultsOptions.inOrder ? total + i + 1 : total
  }, 0)
}

function part2 (input) {
  const dividers = [[[2]], [[6]]]
  const result = [...input, dividers].flat().sort(comparePairs)

  const firstDividerLocation = result.findIndex(R.equals(dividers[0])) + 1
  const secondDividerLocation = result.findIndex(R.equals(dividers[1])) + 1
  return firstDividerLocation * secondDividerLocation
}

const resultsOptions = { inconclusive: 0, inOrder: -1, outOfOrder: 1 }

function comparePairs (left, right) {
  for (let i = 0; i < left.length; i++) {
    let leftNum = left[i]
    let rightNum = right[i]

    if (i >= right.length) return resultsOptions.outOfOrder // ran out of right array items
    if (Array.isArray(leftNum) || Array.isArray(rightNum)) {
      if (!Array.isArray(leftNum)) leftNum = [leftNum]
      if (!Array.isArray(rightNum)) rightNum = [rightNum]

      const results = comparePairs(leftNum, rightNum)
      if (results === resultsOptions.inconclusive) continue
      else return results
    }
    if (leftNum < rightNum) return resultsOptions.inOrder
    if (leftNum > rightNum) return resultsOptions.outOfOrder
  }
  if (left.length === right.length) return resultsOptions.inconclusive // both arrays perfectly match
  else return resultsOptions.inOrder // more items left in right array therefore in order
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          [1,1,3,1,1]
          [1,1,5,1,1]

          [[1],[2,3,4]]
          [[1],4]

          [9]
          [[8,7,6]]

          [[4,4],4,4]
          [[4,4],4,4,4]

          [7,7,7,7]
          [7,7,7]

          []
          [3]

          [[[]]]
          [[]]

          [1,[2,[3,[4,[5,6,7]]]],8,9]
          [1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expectedOutput: '13'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          [1,1,3,1,1]
          [1,1,5,1,1]

          [[1],[2,3,4]]
          [[1],4]

          [9]
          [[8,7,6]]

          [[4,4],4,4]
          [[4,4],4,4,4]

          [7,7,7,7]
          [7,7,7]

          []
          [3]

          [[[]]]
          [[]]

          [1,[2,[3,[4,[5,6,7]]]],8,9]
          [1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expectedOutput: '140'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
