/**
 * Testing
 * @ndaidong
 */

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

import path from 'path';
import test from 'tape';
import sinon from 'sinon';

var rootDir = '../../../src';

var bella = require(path.join(rootDir, 'bella'));

// .scheduler
test('Testing .scheduler.every(String pattern, Function callback) method:', (assert) => {

  let clock = sinon.useFakeTimers();
  let callback = sinon.spy();

  bella.scheduler.every('5s', callback);

  clock.tick(5000);
  assert.ok(callback.called, 'Callback must be called');
  clock.tick(10000);
  assert.ok(callback.called, 'Callback must be called');

  clock.restore();
  assert.end();
});
