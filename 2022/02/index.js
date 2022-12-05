function parseInput(cb) {
  return function(rawInput) {
    const input = rawInput
      .trim()
      .split('\n')
      .map(r => r.split(' '))

    return cb(input)
  }
}

function part1(input) {
  const options = {
    'A': 1, // rock
    'X': 1, // rock
    'B': 2, // paper
    'Y': 2, // paper
    'C': 3, // scissors
    'Z': 3, // scissors
  }

  return input.reduce((total, [opponentChoice, myChoice]) => {
    const oppenentVal = options[opponentChoice]
    const myVal = options[myChoice]

    if(oppenentVal == myVal) total += 3 // draw
    if(oppenentVal < myVal || (oppenentVal == 3 && myVal == 1)) total += 6 // win & edge case win with rock vs scissors

    return total + myVal
  },0)
}

function part2(input) {
  const options = {
    'A': 1, // rock
    'B': 2, // paper
    'C': 3, // scissors
  }
  return input.reduce((total, [opponentChoice, myChoice]) => {
    const oppenentVal = options[opponentChoice]

    // lose
    if(myChoice == 'X') {
      if(oppenentVal == 1) return total + 3 // edge case lose to rock
      return total + oppenentVal - 1
    }

    // draw
    if(myChoice == 'Y') return total + 3 + oppenentVal

    // win
    if(myChoice == 'Z') {
      if (oppenentVal == 3) return total + 6 + 1 // edge case win with rock
      return total + 6 + oppenentVal + 1
    }
  }, 0)
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
        A Y
        B X
        C Z
        `,
        expectedOutput: '15'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expectedOutput: '12'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
