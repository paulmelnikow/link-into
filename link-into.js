/*global Promise */

var promisify = require('es6-promisify'),
    symlink = promisify(require('fs').symlink),
    mkdirp = promisify(require('mkdirp')),
    glob = promisify(require('glob')),
    path = require('path'),
    _ = require('underscore');

var createLink = function (target, linkPath) {
    var linkDir = path.dirname(linkPath);

    return mkdirp(linkDir).then(function () {
        return symlink(target, linkPath);
    });
};

var linkFilesMatchingPattern = function (destination, sourcePattern) {
    return glob(sourcePattern).then(function (files) {
        return Promise.all(files.map(function (file) {
            var linkPath = path.join(destination, file);

            // Interpret patterns relative to cwd.
            var relative = path.relative(path.dirname(linkPath), process.cwd());
            var linkPointsTo = path.join(relative, file);

            return createLink(linkPointsTo, linkPath);
        }));
    });
};

var linkInto = function (destination, sourcePatterns) {
    var patternIsAbsolute = _(sourcePatterns).map(path.isAbsolute);
    if (_(patternIsAbsolute).some()) {
        return Promise.reject(Error('Source patterns should be relative'));
    }
    return Promise.all(sourcePatterns.map(function (sourcePattern) {
        return linkFilesMatchingPattern(destination, sourcePattern);
    }));
};
module.exports = linkInto;
