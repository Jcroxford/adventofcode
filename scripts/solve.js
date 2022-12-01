require('dotenv').config()
const { ArgumentParser } = require('argparse')
const fs = require('node:fs')
const { Client } = require('../lib/client.js')

const parser = new ArgumentParser({
  description: `Run a given year & day's solutions tests and full input.`
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
console.log('rawInput: ', rawInput);


