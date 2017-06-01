// builder tools
// @ndaidong

var {join} = require('path');

var readFile = require('./readFile');
var writeFile = require('./writeFile');
var delFile = require('./delFile');

var rollupify = require('./rollupify');

var {
  repository,
  author,
  license,
  name,
  description,
  version
} = require(join(__dirname, '../package.json'));

module.exports = {
  rollupify,
  readFile,
  writeFile,
  delFile,
  repository,
  author,
  license,
  name,
  description,
  version
};
