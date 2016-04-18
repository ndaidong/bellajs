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

test('Testing .scheduler.every(String pattern, Function callback) method:', (assert) => {

  let clock = sinon.useFakeTimers();
  let callback = sinon.spy();

  bella.scheduler.every('5s', callback);

  clock.tick(21000);
  assert.deepEquals(callback.callCount, 4, 'Callback must be called 4 times');

  clock.restore();
  assert.end();
});

test('Testing .scheduler.once(String pattern, Function callback) method:', (assert) => {

  let clock = sinon.useFakeTimers();
  let callback = sinon.spy();

  bella.scheduler.once('5s', callback);

  clock.tick(21000);
  assert.deepEquals(callback.callCount, 1, 'Callback must be called 1 time');

  clock.restore();
  assert.end();
});

test('Testing other methods:', (assert) => {

  let t = new Date(2016, 3, 18, 14, 0, 0);

  // set start time is 14:00:00 04/18/2016
  let clock = sinon.useFakeTimers(t.getTime());
  let hourly = sinon.spy();
  let daily = sinon.spy();
  let monthly = sinon.spy();
  let yearly = sinon.spy();

  // every hour at 15th min
  bella.scheduler.hourly('15 00', hourly);

  // every day at 14:15:00
  bella.scheduler.daily('14 15 00', daily);

  // every month at 7th 14:15:00
  bella.scheduler.monthly('07 14 15 00', monthly);

  // every year at May 12 14:15:00
  bella.scheduler.yearly('05 12 14 15 00', yearly);

  // go ahead 2 hours --> 16:00:00 04/18/2016
  // events at 14:15 and 15:15
  clock.tick(6e4 * 60 * 2);
  assert.deepEquals(hourly.callCount, 2, 'Hourly task must be called 2 times');

  // go ahead 2 days --> 16:00:00 04/20/2016
  // events at 14:15 04/18/2016 and 14:15 04/19/2016 and 14:15 04/20/2016
  clock.tick(6e4 * 60 * 24 * 2);
  assert.deepEquals(daily.callCount, 3, 'Daily task must be called 3 times');

  // go ahead 120 days --> 16:00:00 08/18/2016
  // events at:
  // - 14:15 05/7/2016
  // - 14:15 06/7/2016
  // - 14:15 07/7/2016
  // - 14:15 08/7/2016
  clock.tick(6e4 * 60 * 24 * 120);
  assert.deepEquals(monthly.callCount, 4, 'Monthly task must be called 4 times');

  // go ahead 1500 days --> 16:00:00 05/29/2020
  // events at:
  // - 14:15 05/12/2016
  // - 14:15 05/12/2017
  // - 14:15 05/12/2018
  // - 14:15 05/12/2019
  // - 14:15 05/12/2020
  clock.tick(6e4 * 60 * 24 * 1500);
  assert.deepEquals(yearly.callCount, 5, 'Yearly task must be called 5 times');

  assert.end();
});
