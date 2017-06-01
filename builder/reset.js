#!/usr/bin/env node

var {join} = require('path');
var exec = require('child_process').execSync;

var dirs = [
  join(__dirname, '../.nyc_output'),
  join(__dirname, '../coverage'),
  join(__dirname, '../node_modules')
];

dirs.forEach((d) => {
  exec(`rm -rf ${d}`);
});


