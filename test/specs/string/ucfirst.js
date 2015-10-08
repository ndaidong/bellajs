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

describe('.ucfirst(String s)', () => {

  let sample = 'hello world';
  let expectation = 'Hello world';

  describe(' / bella.ucfirst("' + sample + '")', () => {

    let result = bella.ucfirst(sample);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.ucfirst("")', () => {

    let s1 = bella.ucfirst('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.ucfirst(123456)', () => {

    let s2 = bella.ucfirst(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

