/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var config = require('../../config');
var bellas = config.bellas;

let isSameTimes = (t1, t2) => {
  return Math.abs(t1 - t2) < 5;
};

let checkTimeNow = (bella) => {
  test('Testing .time() method', (assert) => {
    let t = (new Date()).getTime();
    let b = bella.time();
    assert.ok(isSameTimes(t, b), 'Time must be the same');
    assert.end();
  });

  test('Testing .date() method', (assert) => {
    let t = new Date();
    let b = bella.now();
    assert.ok(isSameTimes(t.getTime(), b.getTime()), 'Date must be the same');
    assert.end();
  });
};

bellas.map(checkTimeNow);
