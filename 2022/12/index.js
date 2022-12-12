const { lowToHigh } = require('../../utils/index')

function parseInput (cb) {
  return function (rawInput) {
    const starts = []
    let end = null
    const input = rawInput
      .trim()
      .split('\n')
      .map((r, rI) => r
        .split('')
        .map((c, cI) => {
          // find all starts and end location to make life easier later
          if (c === 'S' || c === 'a') starts.push({ r: rI, c: cI, startLetter: c })
          if (c === 'E') end = { c: cI, r: rI }

          if (c === 'S') return 0
          if (c === 'E') return 25
          return c.charCodeAt() - 'a'.charCodeAt()
        })
      )

    return cb(input, starts, end)
  }
}

function part1 (grid, starts, end) {
  // only use S start location for part 1
  const start = starts.filter(s => s.startLetter === 'S')[0]
  return bfs(grid, start, end).sort(lowToHigh)[0]
}

function part2 (grid, starts, end) {
  return starts
    .map(s => bfs(grid, s, end))
    .flat()
    .sort(lowToHigh)[0]
}

function bfs (grid, root, end) {
  const stack = []
  const visited = grid.map(r => r.map(c => false))

  stack.push({ point: root, steps: 0 })

  const potentialPaths = []

  while (stack.length) {
    const { point: { r, c }, steps } = stack.shift()
    if (visited[r][c]) continue

    if (r === end.r && c === end.c) {
      potentialPaths.push(steps)
      continue
    }

    const current = grid[r][c]
    if (canVisit(grid, visited, r - 1, c, current)) stack.push({ point: { r: r - 1, c }, steps: steps + 1 })
    if (canVisit(grid, visited, r + 1, c, current)) stack.push({ point: { r: r + 1, c }, steps: steps + 1 })
    if (canVisit(grid, visited, r, c - 1, current)) stack.push({ point: { r, c: c - 1 }, steps: steps + 1 })
    if (canVisit(grid, visited, r, c + 1, current)) stack.push({ point: { r, c: c + 1 }, steps: steps + 1 })

    visited[r][c] = true
  }

  return potentialPaths
}

function canVisit (grid, visited, r, c, currentLevel, stack) {
  if (grid[r]?.[c] === undefined) return false
  if (visited[r][c]) return false
  if (grid[r][c] - currentLevel > 1) return false
  return true
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          Sabqponm
          abcryxxl
          accszExk
          acctuvwj
          abdefghi`,
        expectedOutput: '31'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          Sabqponm
          abcryxxl
          accszExk
          acctuvwj
          abdefghi`,
        expectedOutput: '29'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
