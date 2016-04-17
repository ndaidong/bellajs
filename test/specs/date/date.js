/**
 * Testing
 * @ndaidong
 */

'use strict';

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

var test = require('tape');

var config = require('../../config');
var bella = config.bella;

// .date.format
test('Testing .date.format(String pattern, Number timestamp) method:', (assert) => {

  let atime = 1455784100752;

  let samples = [
    { template: 'Y/m/d h:i:s', expectation: '2016/02/18 15:28:20' },
    { template: 'Y/m/d h:i:s A', expectation: '2016/02/18 03:28:20 PM' },
    { template: 'M j, Y h:i:s A', expectation: 'Feb 18, 2016 03:28:20 PM' },
    { template: 'l, j F Y h:i:s a', expectation: 'Thursday, 18 February 2016 03:28:20 pm' },
    { template: 'w D G O', expectation: '4 Thu 15 GMT+07' }
  ];

  samples.forEach((sample) => {
    let tpl = sample.template;
    let exp = sample.expectation;
    let result = bella.date.format(tpl, atime);
    assert.deepEqual(result, exp, `"${tpl}" must return ${exp}`);
  });

  assert.end();
});
