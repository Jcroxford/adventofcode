const { lowToHigh } = require('../../utils/index')

function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput
      .split('\n')

    return cb(input)
  }
}

function part1 (input) {
  const root = buildFileSystem(input)

  const result = sumSmallDirs(root)
  return result
}

function sumSmallDirs (currentDir, total = 0) {
  const MAX_SIZE = 100000
  if (!Object.keys(currentDir.dirs).length) return currentDir.folderSize < MAX_SIZE ? total + currentDir.folderSize : total

  total += Object.keys(currentDir.dirs).reduce((total, next) => total + sumSmallDirs(currentDir.dirs[next]), 0)
  return currentDir.folderSize < MAX_SIZE ? total + currentDir.folderSize : total
}

function part2 (input) {
  const root = buildFileSystem(input)

  calculateDirSizes(root)
  const totalDiskSpace = 70000000
  const totalUnusedSpace = totalDiskSpace - root.folderSize
  const requiredSpace = 30000000 - totalUnusedSpace
  return findAllBigFolders(root, requiredSpace).sort(lowToHigh)[0]
}

function findAllBigFolders (currentDir, requiredSpace = Infinity) {
  if (currentDir.folderSize < requiredSpace) return []
  if (!Object.keys(currentDir.dirs).length) return currentDir.folderSize > requiredSpace ? [currentDir.folderSize] : []

  const childSizes = Object.keys(currentDir.dirs).map(key => findAllBigFolders(currentDir.dirs[key], requiredSpace))
  return [...childSizes, currentDir.folderSize].flat()
}

function buildFileSystem (input) {
  const initDir = name => ({ name, prevDir: null, dirs: {}, files: [], folderSize: null })
  const system = {
    dirs: {
      '/': initDir('/')
    }
  }
  let currentDir = system

  let line = input.shift()
  while (input.length) {
    if (line.startsWith('$ cd')) {
      if (line.includes('..')) {
        currentDir = currentDir.prevDir
      } else {
        const dirName = line.slice(5)
        currentDir = currentDir.dirs[dirName]
      }
      line = input.shift()
    } else if (line === '$ ls') {
      line = input.shift()
      while (!!line && !line.startsWith('$')) {
        if (line.startsWith('dir')) {
          const dirName = line.slice(4)
          currentDir.dirs[dirName] = initDir(dirName)
          currentDir.dirs[dirName].prevDir = currentDir
        } else {
          const [size] = line.split(' ')
          currentDir.files.push(Number(size))
        }
        line = input.shift()
      }
    }
  }

  const root = system.dirs['/']
  calculateDirSizes(root)
  return root
}

function calculateDirSizes (currentDir) {
  if (currentDir.folderSize) return currentDir.folderSize

  if (!Object.keys(currentDir.dirs).length) {
    currentDir.folderSize = currentDir.files.reduce((total, next) => total + next, 0)
    return currentDir.folderSize
  }

  const folderSizes = Object.keys(currentDir.dirs).reduce((total, next) => total + calculateDirSizes(currentDir.dirs[next]), 0)
  const fileSizes = currentDir.folderSize = currentDir.files.reduce((total, next) => total + next, 0)
  currentDir.folderSize = folderSizes + fileSizes
  return currentDir.folderSize
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `
          $ cd /
          $ ls
          dir a
          14848514 b.txt
          8504156 c.dat
          dir d
          $ cd a
          $ ls
          dir e
          29116 f
          2557 g
          62596 h.lst
          $ cd e
          $ ls
          584 i
          $ cd ..
          $ cd ..
          $ cd d
          $ ls
          4060174 j
          8033020 d.log
          5626152 d.ext
          7214296 k
        `,
        expectedOutput: '95437'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `
          $ cd /
          $ ls
          dir a
          14848514 b.txt
          8504156 c.dat
          dir d
          $ cd a
          $ ls
          dir e
          29116 f
          2557 g
          62596 h.lst
          $ cd e
          $ ls
          584 i
          $ cd ..
          $ cd ..
          $ cd d
          $ ls
          4060174 j
          8033020 d.log
          5626152 d.ext
          7214296 k
        `,
        expectedOutput: '24933642'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
