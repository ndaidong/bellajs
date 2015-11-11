var traceur = require('traceur');
traceur.require.makeDefault((filename) => {
  return !filename.includes('node_modules');
});

var fs = require('fs');
var path = require('path');

/**
 * Import specs
 */

var dirs = ['', 'types', 'string', 'template', 'array', 'object'];
dirs.forEach(function(dir){
  var where = './test/specs/' + dir;
  if(fs.existsSync(where)){
    fs.readdirSync(where).forEach(function(file){
      if(path.extname(file) === '.js'){
        require(path.join('.' + where, file));
      }
    });
  }
});
