const { ArgumentParser } = require('argparse')
const fs = require('node:fs/promises')

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

fs.access(`${__dirname}/../${year}`, fs.constants.F_OK)
  .catch(() => fs.mkdir(`${__dirname}/../${year}`))


