function parseInput(cb) {
  return function(rawInput) {
    const input = rawInput

    return cb(input)
  }
}

function part1(input) {

}

function part2(input) {

}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      // {
      //   input: ``,
      //   expectedOutput: ''
      // }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      // {
      //   input: ``,
      //   expectedOutput: ''
      // }
    ]
  },
  testsOnly: true,
  trimpInput: false
}
