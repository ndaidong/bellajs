/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var config = require('../../config');
var bella = config.bella;

// md5
test('Testing .md5() method', (assert) => {
  let arr = [];
  while (arr.length < 10) {
    let k = bella.md5();
    arr.push(k);
    assert.deepEquals(k.length, 32, 'Returned value must be 32 chars');
  }

  assert.end();
});
