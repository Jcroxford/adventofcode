function parseInput (cb) {
  return function (rawInput) {
    const input = rawInput.split('').map(Number)

    return cb(input)
  }
}

function part1 (numbers) {
  // console.log(input);
  // let total = 0
  // input.push(input[0])
  // for (let i = 0; i < input.length-1; i++) {
  //   const current = input[i];
  //   const next = input[i+1];

  //   if(next == current) total += current
  // }

  // return total

  numbers.push(numbers[0])
  let sum = 0
  for(let i = 0; i < numbers.length-1; i++) {
    if(numbers[i] === numbers[i+1])
      sum += numbers[i]
  }
  console.log(sum)
  return sum

}

function part2 (numbers) {
  let sum = 0
  const numLength = numbers.length/2
  for(let i = 0; i < numbers.length-1; i++) {
    const currentNum = numbers[i]
    const nextNum = numbers[((i+numLength) % numbers.length)]
    if(currentNum == nextNum) sum += numbers[i]
  }

  return sum
}

module.exports = {
  part1: {
    cb: parseInput(part1),
    tests: [
      {
        input: `1122`,
        expectedOutput: '3'
      },
      {
        input: `1111`,
        expectedOutput: '4'
      },
      {
        input: `1234`,
        expectedOutput: '0'
      },
      {
        input: `91212129`,
        expectedOutput: '9'
      }
    ]
  },
  part2: {
    cb: parseInput(part2),
    tests: [
      {
        input: `1212`,
        expectedOutput: '6'
      }
    ]
  },
  testsOnly: false,
  trimpInput: true
}
