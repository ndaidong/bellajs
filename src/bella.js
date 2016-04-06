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
  // import string
  // import md5
  // import collection
  // import date
  // import scheduler

  // exports
  if (Bella.ENV === 'node') {
    module.exports = Bella;
  } else {
    var root = context || window;
    if (root.define && root.define.amd) {
      root.define(() => {
        return Bella;
      });
    }
    root.Bella = Bella;
  }
})();
