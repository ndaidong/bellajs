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

describe('.stripTags(String s)', () => {

  let sample = '<h1>Hello world</h1>';
  let expectation = 'Hello world';

  describe(' / bella.stripTags("' + sample + '")', () => {

    let result = bella.stripTags(sample);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.stripTags("")', () => {

    let s1 = bella.stripTags('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.stripTags(123456)', () => {

    let s2 = bella.stripTags(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});
