function parseInput(cb) {
  return function(rawInput) {
    const input = rawInput.split('\n\n').map(r => r.split('\n').map(c => c.trim()).map(Number))

    return cb(input)
  }
}

function part1(input) {
  return input
    .map(r => r.reduce((total, next) => total + next, 0))
    .sort((low, high) => high - low)[0]
}

function part2(input) {
  return input
    .map(r => r.reduce((total, next) => total + next, 0))
    .sort((low, high) => high - low)
    .slice(0,3)
    .reduce((total, next) => total + next, 0)
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expectedOutput: '24000'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `1000
        2000
        3000

        4000

        5000
        6000

        7000
        8000
        9000

        10000`,
        expectedOutput: '45000'
      }
    ]
  },
  testsOnly: false
}