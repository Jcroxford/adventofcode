const _ = require('lodash')

function parseInput(cb) {
  return function(rawInput) {
    let [ start, instructions ] = rawInput
      .split('\n\n')

    start = start
      .split('\n')
      .map(r => _.chunk(r, 4).map(y => y[1])) // each section always takes up 4 spaces, data we care about is always 2nd index
      .reverse()
      .reduce((hash, row, i) => {
        // { '1': [], '2': [], ... }
        if(i == 0) return row.reduce((hash, next) => ({ ...hash, [next]: [] }), {})

        // { '1': ['Z', 'N'], '2': ['M', 'C', 'D'], ... }
        row.forEach((item, i) => item == ' ' ? hash : hash[`${i+1}`].push(item))
        return hash
      }, {})

    instructions = instructions
      .trim()
      .split('\n')
      .map(str => str.replace(/move (\d+) from (\d+) to (\d+)/, '$1,$2,$3').split(',').map(Number))

    return cb({ start, instructions })
  }
}

function solver(lifo = true) {
  return function({ start, instructions }) {
    instructions.forEach(([ move, from, to ]) => {
      let chunk = start[from].splice(-move)
      if(lifo) chunk = chunk.reverse()
      start[to].push(...chunk)
    })

    return Object.keys(start).map(x => start[x].pop()).join('')
  }
}

const part1 = solver()
const part2 = solver(/* lifo */ false)

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expectedOutput: 'CMZ'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expectedOutput: 'MCD'
      }
    ]
  },
  testsOnly: false,
  trimpInput: false
}
