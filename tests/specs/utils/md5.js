/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

// md5
const checkMD5 = (bella) => {
  test('Testing .md5() method', (assert) => {
    const arr = [];
    while (arr.length < 10) {
      const k = bella.md5();
      arr.push(k);
      assert.deepEquals(k.length, 32, 'Returned value must be 32 chars');
    }

    assert.end();
  });
};

variants.map(checkMD5);
