/**
 * Import specs
 */

const {
  existsSync,
  readdirSync,
} = require('fs');

const {
  extname,
  join,
} = require('path');

const dirs = [
  '',
  'detection',
  'utils',
  'string',
];

dirs.forEach((dir) => {
  const where = './tests/specs/' + dir;
  if (existsSync(where)) {
    readdirSync(where).forEach((file) => {
      if (extname(file) === '.js') {
        require(join('.' + where, file));
      }
    });
  }
});
