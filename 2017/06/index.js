function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput.trim().split('\t').map(Number)
    return cb(input)
  }
}

function part1 (input) {
  let history = {}
  history[input.join('')] = 1
  while(true) {
    const max = Math.max(...input)

    const maxI = input.findIndex(x => x === max)
    let amount = input[maxI]
    input[maxI] = 0

    let i = maxI
    while(amount) {
      i = (i + 1) % (input.length)
      input[i] += 1
      amount--
      
    }

    const str = input.join('')
    if(history[str]) return Object.keys(history).length
    else history[str] = 1
  }
}

function part2 (input) {
  let history = {}
  history[input.join('')] = 1
  while(true) {
    const max = Math.max(...input)

    const maxI = input.findIndex(x => x === max)
    let amount = input[maxI]
    input[maxI] = 0

    let i = maxI
    while(amount) {
      i = (i + 1) % (input.length)
      input[i] += 1
      amount--
      
    }

    const str = input.join('')
    if(history[str] === 2) return Object.values(history).filter(x => x == 2).length
    else if(!history[str]) history[str] = 1
    else history[str]++
  }

}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `0	2	7	0`,
        expectedOutput: '5'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `0	2	7	0`,
        expectedOutput: '4'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
