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

describe('.truncate(String s, Number limit)', () => {

  let sample = 'What one man can invent, another can discover.';
  let expectation = 'What one man can invent, another can...';

  describe(' / bella.truncate("' + sample + '", 40)', () => {

    let result = bella.truncate(sample, 40);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.truncate("")', () => {

    let s1 = bella.truncate('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.truncate(123456)', () => {

    let s2 = bella.truncate(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

