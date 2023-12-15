function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput.trim().split('')

    return cb(input)
  }
}
// {{<a!>},{<a!>},{<a!>},{<ab>}}
// {{<ab>},{<ab>},{<ab>},{<ab>}}
// {{<!!>},{<!!>},{<!!>},{<!!>}}
function part1 (input) {
  cleanOutTheGarbage(input)
  input = input.filter(x => x != ',')
  console.log(input)
  console.log(input.filter(x => x == '}').length)
  console.log(input.filter(x => x == '{').length)
  const levelOfnesting = []
  let total = 0
  for (const char of input) {
    if (char == '{') levelOfnesting.push(char)
    if (char == '}') {
      total += levelOfnesting.length
      levelOfnesting.pop()
    }
  }

  return total
}

// function count(input, givenI = 0, total = 0) {
//   for (let i = givenI; i < input.length; i++) {
//     const char = input[i];

//     if(char == '{') total += count(input, i+1)
//     else if(char == '}') total++
//   }
// }
function cleanOutTheGarbage (input) {
  let skipNext = false
  let startGarbageIndex = null

  let i = 0
  while (i < input.length) {
    const char = input[i]
    if (skipNext) {
      skipNext = false
    } else if (char == '<' && startGarbageIndex == null) startGarbageIndex = i
    else if (startGarbageIndex != null && char == '>') {
      input.splice(startGarbageIndex, i - startGarbageIndex + 1)
      i = i - startGarbageIndex
      startGarbageIndex = null
    } else if (char == '!') skipNext = true

    i++
  }

  return input
}

function part2 (input) {
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      // {
      //   input: `{{<ab>},{<ab>},{<ab>},{<ab>}}`,
      //   expectedOutput: '9'
      // },
      // {
      //   input: `{{<a!>},{<a!>},{<a!>},{<ab>}}`,
      //   expectedOutput: '3'
      // },
      // {
      //   input: `{{{},{},{{}}}}`,
      //   expectedOutput: '16'
      // },
      // {
      //   input: `<>`,
      //   expectedOutput: ''
      // },
      // {
      //   input: `<!!!>>`,
      //   expectedOutput: ''
      // },
      // {
      //   input: `{<{o"i!a,}<{i<a>}`,
      //   expectedOutput: ''
      // },
      // {
      //   input: `<<<<>`,
      //   expectedOutput: ''
      // },
      // {
      //   input: `<{!>}>`,
      //   expectedOutput: ''
      // },
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
