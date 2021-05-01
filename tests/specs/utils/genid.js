/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

// createId
const checkGenid = (bella) => {
  test('Testing .genid() method', (assert) => {
    const arr = [];
    while (arr.length < 10) {
      const key = bella.genid();
      assert.deepEquals(key.length, 32, 'key must be a string with 32 chars');
      arr.push(key);
    }

    const uniqArr = bella.unique(arr);
    assert.deepEquals(uniqArr.length, arr.length, 'Every key must be unique');

    const key16 = bella.genid(16);
    assert.deepEquals(key16.length, 16, 'bella.createId(16) must return 16 chars');

    const key24 = bella.genid(24);
    assert.deepEquals(key24.length, 24, 'bella.createId(24) must return 24 chars');

    assert.end();
  });
};

variants.map(checkGenid);
