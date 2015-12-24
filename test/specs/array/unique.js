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

describe('.unique(Array a)', () => {

  let sample = ['red', 'green', 'yellow', 'green', 'red', 'red', 'black', 'white', 'yellow', 'black', 'white', 'black'];
  let result = bella.unique(sample);

  describe(' / bella.unique(' + JSON.stringify(sample) + ')', () => {

    result.forEach((element) => {
      let arr = result.filter((item) => {
        return item === element;
      });
      it(' should has just one "' + element + '"', () => {
        expect(arr).to.have.length(1);
      });
    });

  });
});
