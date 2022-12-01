function parseInput(cb) {
  return function(rawInput) {
    const input = rawInput.split('\n').map(Number)

    return cb(input)
  }
}

function part1(input) {
  for (let i = 0; i < input.length; i++) {
    const num1 = input[i]
    for (let j = i+1; j < input.length; j++) {
      const num2 = input[j];

      if(num1 + num2 == 2020) return num1 * num2
    }
  }
}

function part2(input) {
  for (let i = 0; i < input.length; i++) {
    const num1 = input[i]

    for (let j = i+1; j < input.length; j++) {
      const num2 = input[j];

      for (let k = j+1; k < input.length; k++) {
        const num3 = input[k];

        if(num1 + num2 + num3 == 2020) return num1 * num2 * num3
      }
    }
  }
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `1721
        979
        366
        299
        675
        1456`,
        expectedOutput: '514579'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `1721
        979
        366
        299
        675
        1456`,
        expectedOutput: '241861950'
      }
    ]
  },
  testsOnly: false
}
