const R = require('ramda')

// ==============================
// second attempt
// ==============================
const parseInput = cb => R.pipe(
  R.trim(),
  R.split('\n'),
  R.map(
    R.pipe(
      R.split(','),
      R.map(
        R.pipe(
          R.split('-'),
          R.map(Number)
        )
      ),
      R.map(([start, stop]) => R.range(start, stop+1))
    ),
  ),
  cb
)

const part1 = R.pipe(
  R.map(([ first, second ]) => [ first, second, R.intersection(first, second) ]),
  // R.tap(console.log),
  R.filter(([ first, second, intersect ]) => R.or(R.equals(first, intersect), R.equals(second, intersect))),
  R.length
)

const part2 = R.pipe(
  R.map(([ first, second ]) => R.innerJoin(R.equals,first, second)),
  R.filter(R.length),
  R.length
)

// ==============================
// first attempt
// ==============================
function parseInput(cb) {
  return function(rawInput) {
    const input = rawInput
      .trim()
      .split('\n')
      .map(r => r.split(',').map(e => e.split('-').map(Number)))

    return cb(input)
  }
}

function part1(input) {
  console.log('input: ', input);

  const result = input
    .filter(([first, second]) => {
      if(first[0] >= second[0] && first[1] <= second[1]) return true
      if(first[0] <= second[0] && first[1] >= second[1]) return true
      return false
    })

  return result.length
}

function part2(input) {
  const result = input
    .filter(([first, second]) => {
      if(first[0] >= second[0] && first[1] <= second[1]) return true
      if(first[0] <= second[0] && first[1] >= second[1]) return true
      if(first[1] >= second[0] && first[0] <= second[0]) return true
      if(second[1] >= first[0] && second[0] <= first[0]) return true
      return false
    })
  return result.length
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expectedOutput: '2'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expectedOutput: '4'
      },
      {
        input: `
          2-8,3-7
          6-6,4-6
          5-7,7-9
          7-9,5-7
          4-8,2-6
          2-6,4-8
          4-5,2-3
          2-3,4-5
        `,
        expectedOutput: '6'
      }
    ]
  },
  testsOnly: true
}
