/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

// unique
const checkSortby = (bella) => {
  test('Testing .sort() method', (assert) => {
    const a = [6, 4, 8];
    const sorted = bella.sort(a);

    assert.equals(sorted.join(''), '468', 'Array must be sorted');
    assert.end();
  });

  test('Testing .sortBy() method', (assert) => {
    const arr = [
      {age: 5, name: 'E'},
      {age: 9, name: 'B'},
      {age: 3, name: 'A'},
      {age: 12, name: 'D'},
      {age: 7, name: 'C'},
    ];
    const sortedByAge = [
      {age: 3, name: 'A'},
      {age: 5, name: 'E'},
      {age: 7, name: 'C'},
      {age: 9, name: 'B'},
      {age: 12, name: 'D'},
    ];
    const sortedArr = bella.sortBy('age', 1, arr);
    assert.equals(JSON.stringify(sortedArr), JSON.stringify(sortedByAge), 'Array must be sorted correctly');

    assert.end();
  });
};

variants.map(checkSortby);
