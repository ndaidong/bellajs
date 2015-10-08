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

describe('.strtolower(String s)', () => {

  let sample = 'Hi, I\'m A.J. Hoge, the director of "Effortless English".';
  let expectation = 'hi, i\'m a.j. hoge, the director of "effortless english".';

  describe(' / bella.strtolower("' + sample + '")', () => {

    let result = bella.strtolower(sample);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.strtolower("")', () => {

    let s1 = bella.strtolower('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.strtolower(123456)', () => {

    let s2 = bella.strtolower(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

