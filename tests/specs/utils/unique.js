/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

// unique
const checkUnique = (bella) => {
  test('Testing .unique() method', (assert) => {
    const arr = [1, 1, 2, 2, 3, 4, 5, 5, 6, 3, 5, 4];

    const uniqArr = bella.unique(arr);
    assert.deepEquals(uniqArr.length, 6, 'Unique version must have 6 items');

    assert.end();
  });
};

variants.map(checkUnique);
