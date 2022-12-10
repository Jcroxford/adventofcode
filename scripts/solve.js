require('dotenv').config()
const { ArgumentParser } = require('argparse')
const fs = require('node:fs')
const { Client } = require('../lib/client.js')
const chalk = require('chalk')
const { stripIndent } = require('common-tags')

const parser = new ArgumentParser({
  description: 'Run a given year & day\'s solutions tests and full input.'
})

parser.add_argument(
  '-y',
  '--year',
  {
    default: new Date().getFullYear().toString(),
    help: 'provide 4 digit year. If none is provided, script defaults to current year.'
  }
)
parser.add_argument(
  '-d',
  '--day',
  {
    required: true,
    help: 'calendar day you want to initialize'
  }
)

const { year, day } = parser.parse_args()
const paddedDay = day.padStart(2, 0)

const solver = require(`${__dirname}/../${year}/${paddedDay}/index.js`)
const rawInput = fs.readFileSync(`${__dirname}/../${year}/${paddedDay}/input.txt`, 'utf-8')

console.log(chalk.cyan(`================================= AOC ${year} day ${paddedDay} =================================`))

runSolverFor('part1', solver)
runSolverFor('part2', solver)

console.log(chalk.cyan('==================================================================================='))

function runSolverFor (part, solver) {
  console.log(chalk.bold(`\nRunning ${part} tests`))
  const testsFailed = solver[part].tests
    .filter((test, i) => {
      const output = solver.trimpInput ? solver[part].cb(stripIndent(test.input)) : solver[part].cb(test.input)

      // eslint-disable-next-line
      if (output == test.expectedOutput) {
        console.log(chalk.green(`test ${i + 1} passed!\n`))
        return false
      } else {
        console.log(chalk.red(chalk.bold(`test ${i + 1} failed`)))
        console.log(chalk.green(`expected ${test.expectedOutput}`))
        console.log(chalk.red(`actual ${output}\n`))
        return true
      }
    })

  if (!testsFailed || solver.testsOnly) return console.log(chalk.bold('\nSkipping real input\n'))

  console.log(chalk.bold('Running real input'))
  const output = solver[part].cb(rawInput)
  console.log(chalk.bold('\nSolution'), `${output}\n`)
}
