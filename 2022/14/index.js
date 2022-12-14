const R = require('ramda')

const { highToLow } = require('../../utils/index')

function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput
      .trim()
      .split('\n')
      .map(r => r
        .split(' -> ')
        .map(pair => pair.split(',').map(Number))
      )

    return cb(input)
  }
}

const part1 = getSandCount()
const part2 = getSandCount(/* includeFloor */ true)

function getSandCount (includeFloor = false) {
  return function (wallCoords) {
    const grid = addWalls(wallCoords)

    if (includeFloor) { // add floor for part 2
      const caveFloorLevel = wallCoords.flat().map(pair => pair[1]).sort(highToLow)[0] + 2
      grid[caveFloorLevel] = grid[caveFloorLevel].map(() => '#')
    }

    let count = 0
    while (true) {
      if (!dropSand(grid)) return count
      count++
    }
  }
}

function dropSand (grid) {
  let col = 500
  let row = 0

  while (true) {
    if (!grid[row + 1] || grid[0][500] === 'o') return 0 // return false if no sand dropped (i.e. no sand can be dropped again)
    if (grid[row + 1][col] !== '.') { // check below
      if (grid[row + 1][col - 1] === '.') { // check left
        row = row + 1
        col = col - 1
        continue
      }
      if (grid[row + 1][col + 1] === '.') { // check right
        row = row + 1
        col = col + 1
        continue
      }

      grid[row][col] = 'o'
      return 1 // return true if sand dropped
    }

    row += 1
  }
}

function addWalls (wallCoords) {
  wallCoords = JSON.parse(JSON.stringify(wallCoords))
  const grid = new Array(1000).fill(null).map(r => new Array(1000).fill('.'))

  for (const wall of wallCoords) {
    let left
    let right = wall.shift()
    left = right
    while (wall.length) {
      left = right
      right = wall.shift()

      if (left[0] === right[0]) {
        const min = Math.min(left[1], right[1])
        const max = Math.max(left[1], right[1])
        for (let i = min; i <= max; i++) {
          grid[i][left[0]] = '#'
        }
      } else {
        const min = Math.min(left[0], right[0])
        const max = Math.max(left[0], right[0])
        for (let i = min; i <= max; i++) {
          grid[left[1]][i] = '#'
        }
      }
    }
  }

  return grid
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          498,4 -> 498,6 -> 496,6
          503,4 -> 502,4 -> 502,9 -> 494,9
        `,
        expectedOutput: '24'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          498,4 -> 498,6 -> 496,6
          503,4 -> 502,4 -> 502,9 -> 494,9
        `,
        expectedOutput: '93'
      }
    ]
  },
  testsOnly: true,
  trimpInput: true
}
