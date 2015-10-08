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

describe('.unescapeHTML(String s)', () => {

  let sample = '&lt;h1&gt;Hello world. I\'m a &quot;convertor&quot; function.&lt;/h1&gt;';
  let expectation = '<h1>Hello world. I\'m a "convertor" function.</h1>';

  describe(' / bella.unescapeHTML("' + sample + '")', () => {

    let result = bella.unescapeHTML(sample);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.unescapeHTML("")', () => {

    let s1 = bella.unescapeHTML('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.unescapeHTML(123456)', () => {

    let s2 = bella.unescapeHTML(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

