/**
 * Common scenario for setting up and optimizing system
 * @ndaidong
 **/

/* eslint no-console: 0*/

import util from 'util';
import fs from 'fs';
import path from 'path';

var exec = require('child_process').execSync;
var mkdirp = require('mkdirp').sync;

var traceur = require('traceur/src/node/api.js');

var UglifyJS = require('uglify-js');

var distDir = './dist';

export var createDir = (ls) => {
  if (util.isArray(ls)) {
    ls.forEach((d) => {
      d = path.normalize(d);
      if (!fs.existsSync(d)) {
        mkdirp(d);
        console.log('Created dir "%s"... ', d);
      }
    });
  } else {
    ls = path.normalize(ls);
    if (!fs.existsSync(ls)) {
      mkdirp(ls);
    }
  }
};

export var removeDir = (ls) => {
  if (util.isArray(ls)) {
    let k = 0;
    ls.forEach((d) => {
      d = path.normalize(d);
      exec('rm -rf ' + d);
      ++k;
      console.log('%s, removed dir "%s"... ', k, d);
    });
  } else {
    ls = path.normalize(ls);
    exec('rm -rf ' + ls);
  }
  console.log('Done.');
};

export var reset = () => {
  removeDir(distDir);
};

export var build = () => {
  let file = distDir + '/bella.js';
  let fileMin = distDir + '/bella.min.js';

  let dir = './src/';
  let wrapper = dir + 'bella.js';

  let sw = fs.readFileSync(wrapper, 'utf8');

  let componentDir = dir + 'components';
  fs.readdirSync(componentDir).forEach((f) => {
    let bx = path.extname(f);
    if (bx === '.js') {
      let bs = fs.readFileSync(componentDir + '/' + f, 'utf8');
      sw = sw.replace('// import ' + f.replace(bx, ''), bs);
    }
  });

  var s = traceur.compile(sw);
  fs.writeFileSync(file, s, 'utf8');

  let minified = UglifyJS.minify(s, {
    fromString: true
  });
  fs.writeFileSync(fileMin, minified.code, 'utf8');
  console.log('Everything done.');
  return null;
};

export var setup = () => {
  console.log('Start building...');
  reset();
  createDir(distDir);
  build();
};
