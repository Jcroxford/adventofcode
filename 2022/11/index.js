const _ = require('lodash')
const { highToLow } = require('../../utils/index')

function parseInput (cb) {
  return function (rawInput) {
    const input = _.chunk(
      rawInput.split('\n'),
      7
    )
      .map(monkey => {
        const operation = monkey[2].split('= ')[1].split(' ')
        return {
          startingItems: monkey[1].split(': ')[1].split(', ').map(BigInt),
          operation: {
            leftOperand: operation[0] === 'old' ? operation[0] : Number(operation[0]),
            operator: operation[1],
            rightOperand: operation[2] === 'old' ? operation[2] : Number(operation[2])
          },
          test: Number(monkey[3].split('by ')[1]),
          truthy: Number(monkey[4].split('monkey ')[1]),
          falsey: Number(monkey[5].split('monkey ')[1]),
          totalItemsInspected: 0
        }
      })

    return cb(input)
  }
}

const part1 = playMonkeyInTheMiddle()
const part2 = playMonkeyInTheMiddle(10000, /* panic */ true)

function playMonkeyInTheMiddle (rounds = 20, panic = false) {
  return function (monkeys) {
    const safeMod = monkeys.reduce((mod, m) => mod * m.test, 1)

    for (let i = 0; i < rounds; i++) {
      for (const monkey of monkeys) {
        let item = monkey.startingItems.shift()
        while (item) {
          monkey.totalItemsInspected++
          const { operation: { leftOperand, operator, rightOperand } } = monkey
          // eslint-disable-next-line
          item = eval(`${leftOperand === 'old' ? item : leftOperand} ${operator} ${rightOperand === 'old' ? item : rightOperand}`)
          item = panic ? item % safeMod : Math.floor(item / 3)

          const passesTest = item % monkey.test === 0

          if (passesTest) monkeys[monkey.truthy].startingItems.push(item)
          else monkeys[monkey.falsey].startingItems.push(item)

          item = monkey.startingItems.shift()
        }
      }
    }

    return monkeys.map(m => m.totalItemsInspected).sort(highToLow).slice(0, 2).reduce((t, n) => t * n, 1)
  }
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3

        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0

        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3

        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
        `,
        expectedOutput: '10605'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
        Monkey 0:
          Starting items: 79, 98
          Operation: new = old * 19
          Test: divisible by 23
            If true: throw to monkey 2
            If false: throw to monkey 3

        Monkey 1:
          Starting items: 54, 65, 75, 74
          Operation: new = old + 6
          Test: divisible by 19
            If true: throw to monkey 2
            If false: throw to monkey 0

        Monkey 2:
          Starting items: 79, 60, 97
          Operation: new = old * old
          Test: divisible by 13
            If true: throw to monkey 1
            If false: throw to monkey 3

        Monkey 3:
          Starting items: 74
          Operation: new = old + 3
          Test: divisible by 17
            If true: throw to monkey 0
            If false: throw to monkey 1
        `,
        expectedOutput: '2713310158'
      }
    ]
  },
  testsOnly: true,
  trimpInput: true
}
