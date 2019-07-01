#!/usr/bin/env node

/* eslint no-console: "off" */

'use strict'

const linkInto = require('.')

async function main() {
  const args = process.argv.slice(2)

  if (!args.length) {
    console.log('Usage: link-into destination source-pattern ...')
    process.exit(2)
  }

  const destination = args.shift(),
    sourcePatterns = args

  await linkInto(destination, sourcePatterns)
}

module.export = main

if (require.main === module) {
  ;(async () => {
    try {
      await main()
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })()
}
