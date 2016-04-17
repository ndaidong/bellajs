/**
 * Testing
 * @ndaidong
 */

'use strict';

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

var test = require('tape');
var sinon = require('sinon');

var config = require('../../config');
var bella = config.bella;

// .scheduler
test('Testing .scheduler.every(String pattern, Function callback) method:', (assert) => {

  let clock = sinon.useFakeTimers();
  let callback = sinon.spy();

  bella.scheduler.every('5s', callback);

  clock.tick(21000);
  assert.deepEquals(callback.callCount, 4, 'Callback must be called 4 times');

  clock.restore();
  assert.end();
});

// .scheduler
test('Testing .scheduler.once(String pattern, Function callback) method:', (assert) => {

  let clock = sinon.useFakeTimers();
  let callback = sinon.spy();

  bella.scheduler.once('5s', callback);

  clock.tick(21000);
  assert.deepEquals(callback.callCount, 1, 'Callback must be called 1 times');

  clock.restore();
  assert.end();
});
