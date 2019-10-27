/**
 * Testing
 * @ndaidong
 */

import {test} from 'tap';

import {variants} from '../../config';

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
