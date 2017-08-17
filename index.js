#!/usr/bin/env node
'use strict'

const sketchJson = require('sketch-json')
const meow = require('meow')
const updateNotifier = require('update-notifier')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')

const cli = meow(
  `
  Usage:
    $ sketch-json               Convert sketch file to json
    $ sketch-json --json        Convert json file to sketch

  Options:
    -j, --json                  Convert json file to sketch
    -h, --help                  Show help options
    -v, --version               Show version
`,
  {
    alias: {
      j: 'json',
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = () => {
  if (cli.flags.json) {
    return sketchJson
      .toSketch()
      .then(() => shoutSuccess('JSON converted to sketch'))
      .catch(err => shoutError(err))
  }

  return sketchJson
    .toJson()
    .then(() => shoutSuccess('Sketch converted to json'))
    .catch(err => shoutError(err))
}

run()
