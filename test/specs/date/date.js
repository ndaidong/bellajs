/**
 * Testing
 * @ndaidong
 */
var test = require('tape');
var sinon = require('sinon');

var config = require('../../config');
var bella = config.bella;

// .date.format
test('Testing .date.format(String pattern, Number timestamp) method:', (assert) => {

  let atime = 1455784100752;

  let samples = [
    {ouput: 'Y/m/d h:i:s', expectation: '2016/02/18 15:28:20'},
    {ouput: 'Y/m/d h:i:s A', expectation: '2016/02/18 03:28:20 PM'},
    {ouput: 'M j, Y h:i:s A', expectation: 'Feb 18, 2016 03:28:20 PM'},
    {ouput: null, expectation: 'Thu, Feb 18, 2016  03:28:20 PM'},
    {ouput: 'l, j F Y h:i:s a', expectation: 'Thursday, 18 February 2016 03:28:20 pm'},
    {ouput: 'w D G O', expectation: '4 Thu 15 GMT+0007'},
    {ouput: 'm/d/y', expectation: '02/18/16'},
    {ouput: 'm/d/y t', expectation: '02/18/16 29'},
    {ouput: 'M jS, Y', expectation: 'Feb 18th, 2016'},
    {
      ouput: 'M jS, Y',
      expectation: 'Feb 21st, 2016',
      input: atime + 3 * 24 * 60 * 6e4
    },
    {
      ouput: 'M jS, Y',
      expectation: 'Feb 22nd, 2016',
      input: atime + 4 * 24 * 60 * 6e4
    },
    {
      ouput: 'M jS, Y',
      expectation: 'Feb 23rd, 2016',
      input: atime + 5 * 24 * 60 * 6e4
    }
  ];

  samples.forEach((sample) => {
    let tpl = sample.ouput;
    let exp = sample.expectation;
    let input = sample.input || atime;
    let result = bella.date.format(tpl, input);
    assert.deepEqual(result, exp, `"${tpl}" must return ${exp}`);
  });

  let r1 = bella.date.format();
  let t1 = bella.time();
  let e1 = bella.date.format('D, M d, Y  h:i:s A', t1);
  assert.deepEqual(r1, e1, `No param must return ${e1}`);

  let r2 = bella.date.format(1298798);
  let t2 = bella.time();
  let e2 = bella.date.format('D, M d, Y  h:i:s A', t2);
  assert.deepEqual(r2, e2, `No param must return ${e2}`);

  let r3 = bella.date.format('D, M d, Y  h:i:s A', 1298798);
  let e3 = 'Thu, Jan 01, 1970  07:21:38 AM';
  assert.deepEqual(r3, e3, `Invalid timestamp must return ${e3}`);

  let r4 = bella.date.format('D, M d, Y  h:i:s A', 'something');
  let e4 = 'NaN !';
  assert.deepEqual(r4, e4, `Invalid string input must return ${e4}`);

  let r5 = bella.date.format('D, M d, Y  h:i:s A', '2016-04-18 13:25:05');
  let e5 = 'Mon, Apr 18, 2016  01:25:05 PM';
  assert.deepEqual(r5, e5, `With '2016-04-18 13:25:05' must return ${e5}`);

  assert.end();
});

// .date.format
test('Testing .date.relativize(Number timestamp) method:', (assert) => {

  let t = bella.time();
  let clock = sinon.useFakeTimers(t);

  // Just now
  setTimeout(() => {
    let r = bella.date.relativize(t);
    let e = 'Just now';
    assert.deepEqual(r, e, `At the begin it must return ${e}`);
  }, 0);

  // next 3 seconds
  setTimeout(() => {
    let r = bella.date.relativize(t);
    let e = '3 seconds ago';
    assert.deepEqual(r, e, `After 3 seconds must return ${e}`);
  }, 3000);

  // next 2 minutes
  setTimeout(() => {
    let r = bella.date.relativize(t);
    let e = '2 minutes ago';
    assert.deepEqual(r, e, `Next 2 minutes must return ${e}`);
  }, 2 * 6e4);

  // next 6 hours
  setTimeout(() => {
    let r = bella.date.relativize(t);
    let e = '6 hours ago';
    assert.deepEqual(r, e, `Next 6 hours must return ${e}`);
  }, 6 * 60 * 6e4);

  // next 2 days
  setTimeout(() => {
    let r = bella.date.relativize(t);
    let e = '2 days ago';
    assert.deepEqual(r, e, `Next 2 days must return ${e}`);
  }, 2 * 24 * 60 * 6e4);

  clock.tick(2 * 24 * 60 * 6e4 + 5e3);

  assert.end();
});

// .date.utc
test('Testing .date.utc(Number timestamp) method:', (assert) => {
  let t = 1455784100752;
  let r = bella.date.utc(t);
  let e = 'Thu, 18 Feb 2016 08:28:20 GMT';
  assert.deepEqual(r, e, `bella.date.utc(${t}) must return ${e}`);
  assert.end();
});

// .date.local
test('Testing .date.local(Number timestamp) method:', (assert) => {
  let t = 1455784100000;
  let r = bella.date.local(t);
  let e = 'Thu, 18 Feb 2016 15:28:20 GMT+0007';
  assert.deepEqual(r, e, `bella.date.local(${t}) must return ${e}`);
  assert.end();
});

// .date.format
test('Testing .date.strtotime(String Datetime) method:', (assert) => {
  let s = 'Thu, 18 Feb 2016 15:28:20 GMT+0007';
  let r = bella.date.strtotime(s);
  let e = 1455808880000;
  assert.deepEqual(r, e, `bella.date.strtotime('${s}') must return ${e}`);
  assert.end();
});
