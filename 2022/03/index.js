const _ = require('lodash')
const R = require('ramda')

const parseInput = cb => R.pipe(
  R.trim(),
  R.split('\n'),
  R.map(R.split('')),
  cb
)

function asciiToScore(letter) {
  if(letter.charCodeAt() >= 97) return letter.charCodeAt() - 96 // a-z
  return letter.charCodeAt() - 38 // A-Z
}

// ==============================
// second attempt
// ==============================
const part1 = R.pipe(
  R.map(
    R.pipe(
      r => R.innerJoin(R.equals, ...R.splitAt(R.length(r)/2 , r)),
      R.last,
      asciiToScore
    )
  ),
  R.sum
)

const part2 = R.pipe(
  R.splitEvery(3),
  R.map(([first, second, third]) => R.innerJoin(
    R.equals,
    R.innerJoin(R.equals, first, second),
    third
  )),
  R.map(R.pipe(R.last, asciiToScore)),
  R.sum
)

// ==============================
// first attempt
// ==============================
function createLetterHash (list) {
  return list.reduce((hash, next) => {
    if(hash[next] === undefined) hash[next] = 0
    hash[next]++
    return hash
  }, {})
}

function part1(input) {
  return input
    .map(r => [r.slice(0, r.length/2), r.slice(r.length/2)])
    .reduce((total, [left, right]) => {
      const leftHash = createLetterHash(left)

      for(let r of right) {
        if(leftHash[r]) return total + asciiToScore(r)
      }
    }, 0)
}

function part2(input) {
  return _.chunk(input, 3)
    .reduce((list, badges) => {
      return [
        ...list,
        badges.map(createLetterHash)
      ]
    }, [])
    .reduce((total, [first, second, third]) => {
      for(let letter of Object.keys(first)) {
        if(second[letter] && third[letter]) return asciiToScore(letter) + total
      }
    }, 0)
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expectedOutput: '157'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expectedOutput: '70'
      }
    ]
  },
  testsOnly: true,
  trimpInput: true
}
