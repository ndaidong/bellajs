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

describe('.rightPad(String s, Number limit, String pad)', () => {


  let data = [
    {
      s: 7,
      limit: 4,
      pad: '0',
      expect: '7000'
    },
    {
      s: 123456,
      limit: 5,
      pad: '0',
      expect: '123456'
    },
    {
      s: 123456,
      limit: 6,
      pad: '0',
      expect: '123456'
    },
    {
      s: 123456,
      limit: 7,
      pad: '0',
      expect: '1234560'
    }
  ];

  data.forEach((item) => {

    let sample = item.s;
    let limit = item.limit;
    let pad = item.pad;
    let expectation = item.expect;

    describe(' / bella.rightPad("' + sample + '", ' + limit + ', "' + pad + '")', () => {

      let result = bella.rightPad(sample, limit, pad);

      it(' should return "' + expectation + '"', () => {
        expect(result).to.equal(expectation);
      });

    });
  });


  describe(' / bella.rightPad("")', () => {

    let s1 = bella.rightPad('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('00');
    });

  });

  describe(' / bella.rightPad(123456)', () => {

    let s2 = bella.rightPad(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});
