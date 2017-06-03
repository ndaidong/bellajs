// rollupify

var rollup = require('rollup');

var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var cleanup = require('rollup-plugin-cleanup');

var {minify} = require('uglify-js');

const ENV = process.env.NODE_ENV || 'development'; // eslint-disable-line

var jsminify = (source = '') => {
  console.log('Minifying...');
  return minify(source, {sourceMap: true});
};

let removeBr = (s) => {
  return s.replace(/(\r\n+|\n+|\r+)/gm, '\n');
};

var rollupify = (entry, name) => {
  console.log('Rollup start...');
  return rollup.rollup({
    entry,
    plugins: [
      nodeResolve({
        module: true,
        jsnext: true,
        extensions: [
          '.js'
        ]
      }),
      commonjs(),
      babel({
        babelrc: false,
        presets: [
          'es2015-rollup'
        ],
        plugins: [
          'external-helpers'
        ]
      }),
      cleanup()
    ]
  }).then((bundle) => {
    console.log('Generating code with bundle...');
    let result = bundle.generate({
      format: 'umd',
      indent: true,
      moduleId: name,
      moduleName: name
    });
    console.log('Rolling finished.');

    let {code} = result;

    let output = {
      code: removeBr(code)
    };

    if (ENV === 'production') {
      let min = jsminify(code);
      if (!min.error) {
        output.minified = min.code;
        output.map = min.map;
      }
    }

    console.log('Rollupified JS source.');
    return output;
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = async (entry, name) => {
  let output = await rollupify(entry, name);
  return output;
};
