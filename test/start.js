var fs = require('fs');
var path = require('path');

/**
 * Import specs
 */

var dirs = ['', 'detection', 'utils', 'stabilitize', 'string', 'date', 'scheduler'];

dirs.forEach((dir) => {
  let where = './test/specs/' + dir;
  if (fs.existsSync(where)) {
    fs.readdirSync(where).forEach((file) => {
      if (path.extname(file) === '.js') {
        require(path.join('.' + where, file));
      }
    });
  }
});
