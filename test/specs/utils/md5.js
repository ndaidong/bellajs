/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var config = require('../../config');
var bellas = config.bellas;

// md5
let checkMD5 = (bella) => {
  test('Testing .md5() method', (assert) => {
    let arr = [];
    while (arr.length < 10) {
      let k = bella.md5();
      arr.push(k);
      assert.deepEquals(k.length, 32, 'Returned value must be 32 chars');
    }

    assert.end();
  });
};

bellas.map(checkMD5);
