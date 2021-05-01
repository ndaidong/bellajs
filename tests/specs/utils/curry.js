/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

const checkCurry = (bella) => {
  const curry = bella.curry;
  const isGreaterThan = curry((limit, value) => {
    return value > limit;
  });

  const sum3 = curry((a, b, c) => {
    return a + b + c;
  });

  test('Testing .curry() method', (assert) => {
    assert.deepEquals(isGreaterThan(10)(20), true, `isGreaterThan(10)(20) must return true`);
    assert.deepEquals(isGreaterThan(30)(20), false, `isGreaterThan(30)(20) must return false`);
    const greaterThanTen = isGreaterThan(10);
    assert.deepEquals(greaterThanTen(20), true, `greaterThanTen(20) must return true`);

    assert.deepEquals(sum3(3)(2)(1), 6, `sum3(3)(2)(1) must return 6`);
    assert.deepEquals(sum3(1)(2)(3), 6, `sum3(1)(2)(3) must return 6`);
    assert.deepEquals(sum3(1, 2)(3), 6, `sum3(1, 2)(3) must return 6`);
    assert.deepEquals(sum3(1)(2, 3), 6, `sum3(1)(2, 3) must return 6`);
    assert.deepEquals(sum3(1, 2, 3), 6, `sum3(1, 2, 3) must return 6`);

    assert.ok(bella.isFunction(sum3(1, 2)), `sum3(1, 2) must be a function`);
    assert.end();
  });
};

variants.map(checkCurry);
