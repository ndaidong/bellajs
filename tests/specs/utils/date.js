/**
 * Testing
 * @ndaidong
 */
const sinon = require('sinon');
const {test} = require('tap');

const {variants} = require('../../config');

const {
  time,
  now,
} = variants[0];

const isSameTimes = (t1, t2) => {
  return Math.abs(t1 - t2) < 5;
};

const checkDateMethods = (date) => {
  const {
    toDateString,
    toRelativeTime,
    toLocalDateString,
    toUTCDateString,
  } = date;

  test('Testing .time() method', (assert) => {
    const t = (new Date()).getTime();
    const b = time();
    assert.ok(isSameTimes(t, b), 'Time must be the same');
    assert.end();
  });

  test('Testing .date() method', (assert) => {
    const t = new Date();
    const b = now();
    assert.ok(isSameTimes(t.getTime(), b.getTime()), 'Date must be the same');
    assert.end();
  });

  test('With invalid date time input:', (assert) => {
    const check = (t) => {
      const err = new Error('InvalidInput: Number or Date required.');
      assert.throws(() => {
        console.log(toDateString(t)); // eslint-disable-line no-console
      }, err, 'It must throw error if invalid input.');
    };

    [
      '',
      'noop',
      '1988-1-99',
      '4 Thu 15 GMT+0007',
    ].map(check);

    assert.end();
  });

  test('Testing .toDateString(Number timestamp, String pattern) method:', (assert) => {
    const atime = 1455784100752;

    const samples = [
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
        input: atime + 3 * 24 * 60 * 6e4,
      },
      {
        ouput: 'M jS, Y',
        expectation: 'Feb 22nd, 2016',
        input: atime + 4 * 24 * 60 * 6e4,
      },
      {
        ouput: 'M jS, Y',
        expectation: 'Feb 23rd, 2016',
        input: atime + 5 * 24 * 60 * 6e4,
      },
    ];

    samples.forEach((sample) => {
      const tpl = sample.ouput;
      const exp = sample.expectation;
      const input = sample.input || atime;
      const result = toDateString(input, tpl);
      assert.deepEqual(result, exp, `"${tpl}" must return ${exp}`);
    });

    assert.throws(() => {
      toDateString(atime, null);
    }, new Error('Invalid output pattern.'), 'Throw error if invalid pattern');

    assert.end();
  });

  test('Testing .toRelativeTime(Number timestamp) method:', (assert) => {
    const t = time();
    const clock = sinon.useFakeTimers(t);

    // Just now
    setTimeout(() => {
      const r = toRelativeTime(t);
      const e = 'Just now';
      assert.deepEqual(r, e, `At the begin it must return ${e}`);
    }, 0);

    // next 3 seconds
    setTimeout(() => {
      const r = toRelativeTime(t);
      const e = '3 seconds ago';
      assert.deepEqual(r, e, `After 3 seconds must return ${e}`);
    }, 3000);

    // next 2 minutes
    setTimeout(() => {
      const r = toRelativeTime(t);
      const e = '2 minutes ago';
      assert.deepEqual(r, e, `Next 2 minutes must return ${e}`);
    }, 2 * 6e4);

    // next 6 hours
    setTimeout(() => {
      const r = toRelativeTime(t);
      const e = '6 hours ago';
      assert.deepEqual(r, e, `Next 6 hours must return ${e}`);
    }, 6 * 60 * 6e4);

    // next 2 days
    setTimeout(() => {
      const r = toRelativeTime(t);
      const e = '2 days ago';
      assert.deepEqual(r, e, `Next 2 days must return ${e}`);
    }, 2 * 24 * 60 * 6e4);

    clock.tick(2 * 24 * 60 * 6e4 + 5e3);

    assert.throws(() => {
      toRelativeTime('4 Thu 15 GMT+0007');
    }, new Error('InvalidInput: Number or Date required.'), 'Throw error if invalid pattern');

    assert.end();
  });

  test('Testing .toUTCDateString(Number timestamp) method:', (assert) => {
    const t = 1455784100752;
    const r = toUTCDateString(t);
    const e = 'Thu, 18 Feb 2016 08:28:20 GMT+0000';
    assert.deepEqual(r, e, `.toUTCDateString(${t}) must return ${e}`);

    assert.throws(() => {
      toUTCDateString('4 Thu 15 GMT+0007');
    }, new Error('InvalidInput: Number or Date required.'), 'Throw error if invalid pattern');
    assert.end();
  });


  test('Testing .toLocalDateString(Number timestamp) method:', (assert) => {
    const t = 1455784100000;
    const r = toLocalDateString(t);
    const e = 'Thu, 18 Feb 2016 15:28:20 GMT+0007';
    assert.deepEqual(r, e, `.toLocalDateString(${t}) must return ${e}`);

    assert.throws(() => {
      toLocalDateString('4 Thu 15 GMT+0007');
    }, new Error('InvalidInput: Number or Date required.'), 'Throw error if invalid pattern');
    assert.end();
  });
};

variants.map(checkDateMethods);
