/**
 * Testing
 * @ndaidong
 */
var test = require('tape');
var sinon = require('sinon');

var config = require('../../config');
var bella = config.bella;

test('With invalid date time input:', (assert) => {

  let check = (t) => {
    let err = new Error('Invalid date input.');
    assert.throws(() => {
      console.log(bella.date(t));
    }, err, 'It must throw error if invalid input.');
  };

  [
    '',
    'noop',
    '1988-1-99',
    '4 Thu 15 GMT+0007',
    () => {
      return false;
    }
  ].map(check);

  assert.end();
});

test('With well-format date time input:', (assert) => {

  let check = (t) => {
    let d = bella.date(t);
    assert.ok(bella.isObject(d), 'It must return object.');
    assert.ok(bella.isFunction(d.format), 'It must have the method .format()');
    assert.ok(bella.isFunction(d.relativize), 'It must have the method .relativize()');
    assert.ok(bella.isFunction(d.utc), 'It must have the method .utc()');
    assert.ok(bella.isFunction(d.local), 'It must have the method .local()');
  };

  [
    2016,
    1455784100752,
    '2016/02/18 15:28:20',
    null,
    undefined // eslint-disable-line no-undefined
  ].map(check);
  assert.end();
});

test('Testing .date(Number timestamp).format(String pattern) method:', (assert) => {

  let atime = 1455784100752;

  let samples = [
    {ouput: 'Y/m/d h:i:s', expectation: '2016/02/18 15:28:20'},
    {ouput: 'Y/m/d h:i:s A', expectation: '2016/02/18 03:28:20 PM'},
    {ouput: 'M j, Y h:i:s A', expectation: 'Feb 18, 2016 03:28:20 PM'},
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
    let result = bella.date(input).format(tpl);
    assert.deepEqual(result, exp, `"${tpl}" must return ${exp}`);
  });

  assert.throws(() => {
    bella.date(atime).format(null);
  }, new Error('Invalid output pattern.'), 'Throw error if invalid pattern');

  assert.end();
});

test('Testing .date(Number timestamp).relativize() method:', (assert) => {

  let t = bella.time();
  let clock = sinon.useFakeTimers(t);

  // Just now
  setTimeout(() => {
    let r = bella.date(t).relativize();
    let e = 'Just now';
    assert.deepEqual(r, e, `At the begin it must return ${e}`);
  }, 0);

  // next 3 seconds
  setTimeout(() => {
    let r = bella.date(t).relativize();
    let e = '3 seconds ago';
    assert.deepEqual(r, e, `After 3 seconds must return ${e}`);
  }, 3000);

  // next 2 minutes
  setTimeout(() => {
    let r = bella.date(t).relativize();
    let e = '2 minutes ago';
    assert.deepEqual(r, e, `Next 2 minutes must return ${e}`);
  }, 2 * 6e4);

  // next 6 hours
  setTimeout(() => {
    let r = bella.date(t).relativize();
    let e = '6 hours ago';
    assert.deepEqual(r, e, `Next 6 hours must return ${e}`);
  }, 6 * 60 * 6e4);

  // next 2 days
  setTimeout(() => {
    let r = bella.date(t).relativize();
    let e = '2 days ago';
    assert.deepEqual(r, e, `Next 2 days must return ${e}`);
  }, 2 * 24 * 60 * 6e4);

  clock.tick(2 * 24 * 60 * 6e4 + 5e3);

  assert.end();
});

test('Testing .date(Number timestamp).utc() method:', (assert) => {
  let t = 1455784100752;
  let r = bella.date(t).utc();
  let e = 'Thu, 18 Feb 2016 08:28:20 GMT';
  assert.deepEqual(r, e, `bella.date.utc(${t}) must return ${e}`);
  assert.end();
});


test('Testing .date(Number timestamp).local() method:', (assert) => {
  let t = 1455784100000;
  let r = bella.date(t).local();
  let e = 'Thu, 18 Feb 2016 15:28:20 GMT+0007';
  assert.deepEqual(r, e, `bella.date.local(${t}) must return ${e}`);
  assert.end();
});
