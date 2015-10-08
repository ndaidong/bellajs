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

describe('.leftPad(String s, Number limit, String pad)', () => {


  let data = [
    {
      s: 7,
      limit: 4,
      pad: '0',
      expect: '0007'
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
      expect: '0123456'
    }
  ];

  data.forEach((item) => {

    let sample = item.s;
    let limit = item.limit;
    let pad = item.pad;
    let expectation = item.expect;

    describe(' / bella.leftPad("' + sample + '", ' + limit + ', "' + pad + '")', () => {

      let result = bella.leftPad(sample, limit, pad);

      it(' should return "' + expectation + '"', () => {
        expect(result).to.equal(expectation);
      });

    });
  });


  describe(' / bella.leftPad("")', () => {

    let s1 = bella.leftPad('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('00');
    });

  });

  describe(' / bella.leftPad(123456)', () => {

    let s2 = bella.leftPad(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

