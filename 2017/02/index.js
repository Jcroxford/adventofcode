function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput.split("\n")

    return cb(input)
  }
}

const part1 = (input) => {
  let checksum = 0
  input.forEach(line => {
    const numbers = line.split(/\s/)
    checksum += Math.max(...numbers) - Math.min(...numbers)
  })
  return checksum
}

const part2 = (input) => {
  let checksum = 0
  input.forEach(line => {
    const numbers = line.split(/\s/)
    for (let i = 0; i <= numbers.length; i++) {
      for (let j = 0; j <= numbers.length; j++) {
        if (numbers[i] % numbers[j] === 0) {
          if (i === j) continue
          checksum += numbers[i] / numbers[j]
          continue
        }
      }
    }
  })
  return checksum
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
  testsOnly: false,
  trimpInput: true
}
