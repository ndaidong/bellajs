/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var config = require('../../config');
var bellas = config.bellas;

var sequence = (start, end) => {
  let results = [];
  for (let i = start; i <= end; i++) {
    results.push(i);
  }
  return results;
};

let checkCurry = (bella) => {
  let curry = bella.curry;
  test('Testing .curry() method', (assert) => {
    let seq5 = curry(sequence, 1);

    let s5 = seq5(5);
    let e5 = [1, 2, 3, 4, 5];
    assert.deepEquals(s5, e5, `seq5(5) must return ${JSON.stringify(e5)}`);
    assert.end();
  });
};

bellas.map(checkCurry);
