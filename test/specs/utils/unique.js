/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var config = require('../../config');
var bellas = config.bellas;

// unique
let checkUnique = (bella) => {
  test('Testing .unique() method', (assert) => {
    let arr = [1, 1, 2, 2, 3, 4, 5, 5, 6, 3, 5, 4];

    let uniqArr = bella.unique(arr);
    assert.deepEquals(uniqArr.length, 6, 'Unique version must have 6 items');

    assert.end();
  });
};

bellas.map(checkUnique);
