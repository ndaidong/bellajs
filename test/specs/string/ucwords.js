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

describe('.ucwords(String s)', () => {

  let sample = 'hello world';
  let expectation = 'Hello World';

  describe(' / bella.ucwords("' + sample + '")', () => {

    let result = bella.ucwords(sample);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.ucwords("")', () => {

    let s1 = bella.ucwords('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.ucwords(123456)', () => {

    let s2 = bella.ucwords(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

