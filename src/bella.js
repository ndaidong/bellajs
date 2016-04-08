/**
 * bellajs
 * @ndaidong
**/

/* eslint no-invalid-this: 0 */
/* eslint func-names: 0 */

((context) => {

  var ENV = typeof module !== 'undefined' && module.exports ? 'node' : 'browser';

  var Bella = {
    ENV: ENV
  };

  // import detection
  // import utils
  // import md5
  //* import string
  //* import date
  //* import scheduler
  //* import dom

  // exports
  if (ENV === 'node') {
    module.exports = Bella;
  } else {
    var root = context || window || {};
    if (root.define && root.define.amd) {
      root.define(() => {
        return Bella;
      });
    }
    root.Bella = Bella;
  }
})();
