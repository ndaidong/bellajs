/**
 * Common scenario for Gulp
 * @ndaidong at Twitter
 **/

 /* eslint no-console: 0*/

'use strict'; // enable strict mode to use "let" in node.js 4.x

var traceur = require('traceur');
traceur.require.makeDefault((filename) => {
  return !filename.includes('node_modules');
});

var builder = require('./builder');

var gulp = require('gulp');

gulp.task('build', builder.setup);
