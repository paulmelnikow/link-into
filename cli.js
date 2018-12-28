#!/usr/bin/env node

/* eslint no-console: "off" */

'use strict'

const linkInto = require('./link-into')

const args = process.argv.slice(2)

if (!args.length) {
  console.log('Usage: link-into destination source-pattern ...')
  process.exit(2)
}

const destination = args.shift(),
  sourcePatterns = args

linkInto(destination, sourcePatterns).catch(err => {
  console.log(err.stack)
  process.exit(1)
})
