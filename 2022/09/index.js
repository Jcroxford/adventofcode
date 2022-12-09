function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput
      .trim()
      .split('\n')
      .map(r => r.split(' '))
      .map(([direction, amount]) => [direction, Number(amount)])

    return cb(input)
  }
}

const part1 = run()

const part2 = run(10)

function run (size = 2) {
  return function (instructions) {
    const rope = new Array(size).fill(null).map(() => ({ x: 0, y: 0 }))
    const headPos = rope[0]
    const tailPos = rope[size - 1]
    const tailVisitedPositions = { '0,0': 1 }

    for (const [direction, amount] of instructions) {
      for (let i = 0; i < amount; i++) {
        // move head
        if (direction === 'R') headPos.x++
        if (direction === 'L') headPos.x--
        if (direction === 'U') headPos.y++
        if (direction === 'D') headPos.y--

        for (let j = 1; j < size; j++) {
          moveKnot(rope[j - 1], rope[j])
        }

        tailVisitedPositions[`${tailPos.x},${tailPos.y}`] = 1
      }
    }

    return Object.keys(tailVisitedPositions).length
  }
}

function moveKnot (head, tail) {
  if (Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1) return

  if (head.x === tail.x) { // vertical move
    if (head.y > tail.y) tail.y++
    else tail.y--
  } else if (head.y === tail.y) { // horizontal move
    if (head.x > tail.x) tail.x++
    else tail.x--
  } else {
    // diagonal move
    if (head.x > tail.x) tail.x++
    else tail.x--
    if (head.y > tail.y) tail.y++
    else tail.y--
  }
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          R 4
          U 4
          L 3
          D 1
          R 4
          D 1
          L 5
          R 2
        `,
        expectedOutput: '13'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          R 4
          U 4
          L 3
          D 1
          R 4
          D 1
          L 5
          R 2
        `,
        expectedOutput: '1'
      },
      {
        input: `
          R 5
          U 8
          L 8
          D 3
          R 17
          D 10
          L 25
          U 20
        `,
        expectedOutput: '36'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
