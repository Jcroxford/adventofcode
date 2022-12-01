# Advent of Code
This repo is a javscript repo for the advent of code. It has a few scripts to auto generate daily template files, pull aoc data, and auto run tests & real daily input for advent of code puzzles.

## Scripts
To use the scripts, create a `.env` file and add the variable `SESSION_TOKEN` with your aoc token you can acquire from your browser's session cookie after logging in to https://adventofcode.com

### init day
This script creates a new daily index file and pulls the given day's input from aoc servers. If no year is provided, the current year is assumed.
```
yarn startDay -d <day> [-y <year>]
```

### run solver
This script should be run after initializing a day and filling out the `part1` and/or `part2` functions in the template. It will run all test cases in a simple test environment. Assuming all tests pass, it will also optionally run the solutoin code against the given day's input.
```
yarn solve -d <day> [-y <year>]
```