/**
 * Testing
 * @ndaidong
 */

import {test} from 'tap';

import {variants} from '../../config';

// maybe


const checkRandom = (bella) => {
  const plus5 = (x) => x + 5;
  const minus2 = (x) => x - 2;
  const isNumber = (x) => Number(x) === x;
  const toString = (x) => 'The value is ' + String(x);
  test('Testing .maybe() method', (assert) => {
    const x1 = bella.maybe(5)
      .if(isNumber)
      .map(plus5)
      .map(minus2)
      .map(toString)
      .else('Noop')
      .value();
    assert.ok(x1 === 'The value is 8', 'The value must be 8');

    const x2 = bella.maybe('nothing')
      .if(isNumber)
      .map(plus5)
      .map(minus2)
      .map(toString)
      .else('Noop')
      .value();
    assert.ok(x2 === 'Noop', 'It must return "Noop"');
    assert.end();
  });
};

variants.map(checkRandom);
