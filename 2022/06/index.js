const _ = require('lodash')

function parseInput(cb) {
  return function(rawInput) {
    const input = rawInput.split('')

    return cb(input)
  }
}

function findStartMarker(markerLength = 4) {
  return function(input) {
    const list = []
    for (let i = 0; i < input.length; i++) {
      const letter = input[i]

      list.push(letter)
      if(list.length < markerLength) {
        continue
      }

      if(_.uniq(list).length == markerLength) return i+1
      list.shift()
    }
  }
}

const part1 = findStartMarker()
const part2 = findStartMarker(14)

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expectedOutput: '7'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expectedOutput: '19'
      }
    ]
  },
  testsOnly: false,
  trimpInput: false
}
