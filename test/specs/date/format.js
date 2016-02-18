/**
 * Testing
 * @ndaidong
 */
/* global describe it */
/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

import path from 'path';
import chai from 'chai';

chai.should();
var expect = chai.expect;

var rootDir = '../../../src/';

var bella = require(path.join(rootDir, 'bella'));

describe('.date', () => {

  let atime = 1455784100752;

  let samples = [
    { template: 'Y/m/d h:i:s', expectation: '2016/02/18 15:28:20' },
    { template: 'Y/m/d h:i:s A', expectation: '2016/02/18 03:28:20 PM' },
    { template: 'M j, Y h:i:s A', expectation: 'Feb 18, 2016 03:28:20 PM' },
    { template: 'l, j F Y h:i:s a', expectation: 'Thursday, 18 February 2016 03:28:20 pm' }
  ];

  samples.forEach((sample) => {
    let tpl = sample.template;
    let exp = sample.expectation;

    describe(` / bella.date.format(, "${tpl}", ${atime})`, () => {

      let result = bella.date.format(tpl, atime);
      it(' should be a string', () => {
        expect(result).to.be.a('string');
      });
      it(` should be "${exp}"`, () => {
        expect(result).to.be.equal(exp);
      });
    });
  });
});
