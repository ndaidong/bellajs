#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').execSync;

var {
  rollupify,
  writeFile,
  repository,
  author,
  license,
  name,
  version
} = require('./index');

const ENTRY_PATH = './src/main.js';
const GLOBAL_NAME = 'bella';
const OUTPUT_DIR = 'dist';

let releaseAt = (new Date()).toUTCString();

let minHeader = `// ${name}@${version}, by ${author} - built on ${releaseAt} - published under ${license} license`;

let fullHeader = [
  `/**`,
  ` * ${name}@${version}`,
  ` * built on: ${releaseAt}`,
  ` * repository: ${repository.url}`,
  ` * maintainer: ${author}`,
  ` * License: ${license}`,
  `**/`
].join('\n');

var release = (output) => {
  if (fs.existsSync(OUTPUT_DIR)) {
    exec('rm -rf ' + OUTPUT_DIR);
  }
  exec(`mkdir ${OUTPUT_DIR}`);

  writeFile(`${OUTPUT_DIR}/${GLOBAL_NAME}.js`, [fullHeader, output.code].join('\n'));

  if (output.minified) {
    writeFile(`${OUTPUT_DIR}/${GLOBAL_NAME}.min.js`, [minHeader, output.minified].join('\n'));
  }

  if (output.map) {
    writeFile(`${OUTPUT_DIR}/${GLOBAL_NAME}.min.map`, output.map);
  }
};


let start = async () => {
  let result = await rollupify(ENTRY_PATH, GLOBAL_NAME);
  release(result);
};

module.exports = start();

