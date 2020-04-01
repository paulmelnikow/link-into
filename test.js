'use strict'

const path = require('path')
const { promises: fs } = require('fs')
const tmp = require('tmp-promise')
const linkInto = require('.')

describe('linkInto', function () {
  let rootDir
  let cleanup
  beforeEach(async function () {
    ;({ cleanup, path: rootDir } = await tmp.dir({ unsafeCleanup: true }))
    await fs.mkdir(path.join(rootDir, 'assets'))
    await fs.writeFile(path.join(rootDir, 'assets', 'bar.png'), 'is-png')
    await fs.writeFile(path.join(rootDir, 'assets', 'bar.svg'), 'is-svg')
  })
  afterEach(async function () {
    if (cleanup) {
      await cleanup()
      cleanup = undefined
    }
  })

  beforeEach(function () {
    process.chdir(rootDir)
  })

  it('links the expected paths', async function () {
    await linkInto('build/', ['**/*.png', '**/*.svg'])

    await fs.access(path.join(rootDir, 'build', 'assets', 'bar.png'))
    await fs.access(path.join(rootDir, 'build', 'assets', 'bar.svg'))
  })
})
