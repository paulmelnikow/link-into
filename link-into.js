'use strict'

const { promisify } = require('util'),
  path = require('path'),
  fs = require('fs').promises,
  mkdirp = require('mkdirp'),
  glob = promisify(require('glob'))

async function createLink(target, linkPath) {
  const linkDir = path.dirname(linkPath)
  await mkdirp(linkDir)
  await fs.symlink(target, linkPath)
}

async function linkFilesMatchingPattern(destination, sourcePattern) {
  const files = await glob(sourcePattern)

  await Promise.all(
    files.map(async file => {
      const linkPath = path.join(destination, file)

      // Interpret patterns relative to cwd.
      const relative = path.relative(path.dirname(linkPath), process.cwd())
      const linkPointsTo = path.join(relative, file)

      return createLink(linkPointsTo, linkPath)
    })
  )
}

module.exports = async function linkInto(destination, sourcePatterns) {
  if (sourcePatterns.some(path.isAbsolute)) {
    throw Error('Source patterns should be relative')
  }

  await Promise.all(
    sourcePatterns.map(sourcePattern =>
      linkFilesMatchingPattern(destination, sourcePattern)
    )
  )
}
