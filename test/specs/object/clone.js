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

describe('.clone(Array|Object|Date o)', () => {

  let sample1 = [ 'red', 'green', 'yellow', 'white', 'black' ];
  let result1 = bella.clone(sample1);

  describe(' / bella.clone(' + JSON.stringify(sample1) + ')', () => {

    it(' should be an array', () => {
      expect(result1).to.be.an('array');
    });

    it(' should have same size: ' + sample1.length, () => {
      expect(result1).to.have.length(sample1.length);
    });

    sample1.forEach((key) => {
      it(' should include "' + key + '"', () => {
        expect(result1).to.include(key);
      });
    });

    let falseResult = [ 'blue', 'orange' ];
    falseResult.forEach((key) => {
      it(' should not include "' + key + '"', () => {
        expect(result1).to.not.include(key);
      });
    });
  });

  let sample2 = {
    id: 1,
    name: 'Dong Nguyen',
    birthday: '02/01/1980',
    email: 'ndaidong@mailinator.com',
    phone: '12391403098'
  };

  let result2 = bella.clone(sample2);

  describe(' / bella.clone(' + JSON.stringify(sample2) + ')', () => {

    it(' should be an object', () => {
      expect(result2).to.be.an('object');
    });

    let mustHaveKeys = [];
    for (let key in sample2) {
      if (bella.hasProperty(sample2, key)) {
        mustHaveKeys.push(key);
      }
    }
    it(' should have these keys "' + JSON.stringify(mustHaveKeys) + '"', () => {
      expect(result2).to.have.all.keys(mustHaveKeys);
    });

    let falseResult = [ 'address', 'visa' ];
    it(' should not have these keys "' + JSON.stringify(falseResult) + '"', () => {
      expect(result2).to.not.have.all.keys(falseResult);
    });
  });
});
