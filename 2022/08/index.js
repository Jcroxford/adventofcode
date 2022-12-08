const { highToLow } = require('../../utils')

function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput
      .split('\n')
      .map(r => r.split('').map(Number))

    return cb(input)
  }
}

function part1 (grid) {
  return grid.reduce((rTotal, row, r) => (
    rTotal + row.reduce((cTotal, col, c) => cTotal + visibleFromSomeOuterEdge(grid, r, c), 0)
  ), 0)
}

function visibleFromSomeOuterEdge (grid, rowIndex, colIndex) {
  const row = grid[rowIndex]
  const treeHeight = grid[rowIndex][colIndex]
  let visibleLeft = true
  let visibleRight = true
  let visibleUp = true
  let visibleDown = true

  // spiral checking 1 out in each direction unless a direction is marked not visible
  for (let k = 1; k < grid.length; k++) {
    if (!visibleLeft && !visibleRight && !visibleUp && !visibleDown) return 0

    // hit edge of grid
    if (visibleLeft && row[colIndex - k] === undefined) return 1
    if (visibleRight && row[colIndex + k] === undefined) return 1
    if (visibleUp && grid[rowIndex - k] === undefined) return 1
    if (visibleDown && grid[rowIndex + k] === undefined) return 1

    if (visibleLeft && row[colIndex - k] >= treeHeight) visibleLeft = false
    if (visibleRight && row[colIndex + k] >= treeHeight) visibleRight = false
    if (visibleUp && grid[rowIndex - k][colIndex] >= treeHeight) visibleUp = false
    if (visibleDown && grid[rowIndex + k][colIndex] >= treeHeight) visibleDown = false
  }
}

function part2 (grid) {
  return grid
    .map((row, r) => row.map((col, c) => ScenicScore(grid, r, c)))
    .flat()
    .sort(highToLow)[0]
}

function ScenicScore (grid, rowIndex, colIndex) {
  const row = grid[rowIndex]
  const treeHeight = grid[rowIndex][colIndex]
  let visibleLeft = true
  let visibleRight = true
  let visibleUp = true
  let visibleDown = true

  const scenicScore = { left: 0, right: 0, up: 0, down: 0 }
  // spiral checking 1 out in each direction unless a direction is marked not visible
  for (let k = 1; k < grid.length; k++) {
    if (!visibleLeft && !visibleRight && !visibleUp && !visibleDown) break

    // hit edge of grid
    if (visibleLeft && row[colIndex - k] === undefined) visibleLeft = false
    if (visibleRight && row[colIndex + k] === undefined) visibleRight = false
    if (visibleUp && grid[rowIndex - k] === undefined) visibleUp = false
    if (visibleDown && grid[rowIndex + k] === undefined) visibleDown = false

    if (visibleLeft) scenicScore.left++
    if (visibleRight) scenicScore.right++
    if (visibleUp) scenicScore.up++
    if (visibleDown) scenicScore.down++

    if (visibleLeft && row[colIndex - k] >= treeHeight) visibleLeft = false
    if (visibleRight && row[colIndex + k] >= treeHeight) visibleRight = false
    if (visibleUp && grid[rowIndex - k][colIndex] >= treeHeight) visibleUp = false
    if (visibleDown && grid[rowIndex + k][colIndex] >= treeHeight) visibleDown = false
  }
  return scenicScore.left * scenicScore.right * scenicScore.up * scenicScore.down
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          30373
          25512
          65332
          33549
          35390
        `,
        expectedOutput: '21'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          30373
          25512
          65332
          33549
          35390
        `,
        expectedOutput: '8'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
