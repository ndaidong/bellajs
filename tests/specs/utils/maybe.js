/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

// maybe


const checkRandom = (bella) => {
  const plus5 = (x) => x + 5;
  const minus2 = (x) => x - 2;
  const isNumber = (x) => Number(x) === x;
  const toString = (x) => 'The value is ' + String(x);
  const getDefault = () => 'This is default value';

  test('Testing .maybe() method', (assert) => {
    const x1 = bella.maybe(5)
      .if(isNumber)
      .map(plus5)
      .map(minus2)
      .map(toString)
      .else(getDefault)
      .value();
    assert.ok(x1 === 'The value is 8', 'The value must be 8');

    const x2 = bella.maybe('nothing')
      .if(isNumber)
      .map(plus5)
      .map(minus2)
      .map(toString)
      .else(getDefault)
      .value();
    assert.ok(x2 === 'This is default value', 'It must return default value');
    assert.end();
  });
};

variants.map(checkRandom);
