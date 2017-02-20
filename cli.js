#!/usr/bin/env node

'use strict';

var linkInto = require('./link-into');

var args = process.argv.slice(2);

if (! args.length) {
    console.log('Usage: link-into destination source-pattern ...');
    process.exit(2);
}

var destination = args.shift(),
    sourcePatterns = args;

linkInto(destination, sourcePatterns)
    .catch(function (err) {
        console.log(err.stack);
        process.exit(1);
    });
