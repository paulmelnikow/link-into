'use strict'

const promisify = require('es6-promisify'),
  symlink = promisify(require('fs').symlink),
  mkdirp = promisify(require('mkdirp')),
  glob = promisify(require('glob')),
  path = require('path'),
  _ = require('underscore')

const createLink = (target, linkPath) => {
  const linkDir = path.dirname(linkPath)

  return mkdirp(linkDir).then(() => symlink(target, linkPath))
}

const linkFilesMatchingPattern = (destination, sourcePattern) =>
  glob(sourcePattern).then(files =>
    Promise.all(
      files.map(file => {
        const linkPath = path.join(destination, file)

        // Interpret patterns relative to cwd.
        const relative = path.relative(path.dirname(linkPath), process.cwd())
        const linkPointsTo = path.join(relative, file)

        return createLink(linkPointsTo, linkPath)
      })
    )
  )

const linkInto = (destination, sourcePatterns) => {
  const patternIsAbsolute = _(sourcePatterns).map(path.isAbsolute)
  if (_(patternIsAbsolute).some()) {
    return Promise.reject(Error('Source patterns should be relative'))
  }

  return Promise.all(
    sourcePatterns.map(sourcePattern =>
      linkFilesMatchingPattern(destination, sourcePattern)
    )
  )
}
module.exports = linkInto
