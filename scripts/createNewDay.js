require('dotenv').config()
const { ArgumentParser } = require('argparse')
const fs = require('node:fs/promises')
const { Client } = require('../lib/client.js')

const parser = new ArgumentParser({
  description: 'create new file for a given advent of code day.'
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

fs.access(`${__dirname}/../${year}`, fs.constants.F_OK)
  // create year folder if necessary
  .catch(() => fs.mkdir(`${__dirname}/../${year}`))
  .then(() => fs.access(`${__dirname}/../${year}/${paddedDay}`, fs.constants.F_OK))
  // create day folder folder if necessary
  .catch(() => fs.mkdir(`${__dirname}/../${year}/${paddedDay}`))
  // generate day js tempalte if necessary
  .then(() => fs.access(`${__dirname}/../${year}/${paddedDay}/index.js`, fs.constants.F_OK))
  .catch(() => fs.copyFile(`${__dirname}/../templates/dayTemplate.js`, `${__dirname}/../${year}/${paddedDay}/index.js`))
  // fetch input for the day from aoc
  .then(() => fs.access(`${__dirname}/../${year}/${paddedDay}/input.txt`, fs.constants.F_OK))
  .catch(() => {
    const client = new Client(process.env.SESSION_TOKEN)
    return client.getDayinput(year, day)
  })
  .then(res => {
    if(!res) return
    fs.writeFile(`${__dirname}/../${year}/${paddedDay}/input.txt`, res)
  })
  .catch(console.log)
