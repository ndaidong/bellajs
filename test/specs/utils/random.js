/**
 * Testing
 * @ndaidong
 */

import is from 'is';

import {test} from 'tap';

import {variants} from '../../config';

// random
const checkRandom = (bella) => {
  test('Testing .random() method', (assert) => {
    const LIMIT = 5;
    assert.comment('Call the result R, it must:');
    let i1 = 0;
    while (i1 < LIMIT) {
      const a = bella.randint(50, 70);
      assert.ok(is.number(a), `"${a}" must be number.`);
      assert.ok(a >= 50 && a <= 70, 'bella.random(50, 70): 50 <= R <= 70');
      i1++;
    }

    let i2 = 0;
    while (i2 < LIMIT) {
      const a = bella.randint(70, 50);
      assert.ok(is.number(a), `"${a}" must be number.`);
      assert.ok(a >= 50 && a <= 70, 'bella.random(70, 50): 50 <= R <= 70');
      i2++;
    }

    let i3 = 0;
    while (i3 < LIMIT) {
      const a = bella.randint(50);
      assert.ok(is.number(a), `"${a}" must be number.`);
      assert.ok(a >= 50 && a <= 9007199254740991, 'bella.random(50): 50 <= R <= 9007199254740991');
      i3++;
    }

    let i4 = 0;
    while (i4 < LIMIT) {
      const a = bella.randint();
      assert.ok(is.number(a), `"${a}" must be number.`);
      assert.ok(a >= 0 && a <= 9007199254740991, 'With no parameter, 0 <= R <= 9007199254740991.');
      i4++;
    }

    const x = bella.randint(70, 70);
    assert.equals(70, x, 'bella.random(70, 70): R must be 70');

    assert.comment('Test shuffle() method');
    const arr = [1, 4, 9, 18, 55, 64, 2, 7, 33, 8, 11, 44, 99, 15, 35, 64, 12, 27, 13, 28];
    const arrs = bella.shuffle(arr);
    assert.ok(bella.isArray(arrs), 'Result of shuffle must be an array');
    assert.ok(arrs.length === arr.length, 'Shuffled array must has same length as original');
    assert.ok(arrs !== arr, 'Shuffled array must be different from original');

    assert.comment('Test pick() method');
    const arr2 = [1, 4, 9, 18, 55, 64, 2, 7, 33, 8, 11, 44, 99, 15, 35, 64, 12, 27, 13, 28];
    const arrs2 = bella.pick(5, arr2);
    const arrs3 = bella.pick(5, arr2);
    assert.ok(bella.isArray(arrs2), 'Result of pick must be an array');
    assert.ok(arrs2.length === 5, 'Picked array must has same length as request');
    assert.ok(arrs3.length === 5, 'Picked array must has same length as request');
    assert.ok(arrs3 !== arrs2, 'Picked array must be different from others');

    assert.end();
  });
};

variants.map(checkRandom);
