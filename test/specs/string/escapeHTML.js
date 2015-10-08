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

describe('.escapeHTML(String s)', () => {

  let sample = '<h1>Hello world. I\'m a "convertor" function.</h1>';
  let expectation = '&lt;h1&gt;Hello world. I\'m a &quot;convertor&quot; function.&lt;/h1&gt;';

  describe(' / bella.escapeHTML("' + sample + '")', () => {

    let result = bella.escapeHTML(sample);

    it(' should return "' + expectation + '"', () => {
      expect(result).to.equal(expectation);
    });

  });

  describe(' / bella.escapeHTML("")', () => {

    let s1 = bella.escapeHTML('');
    it(' should return an empty string', () => {
      expect(s1).to.equal('');
    });

  });

  describe(' / bella.escapeHTML(123456)', () => {

    let s2 = bella.escapeHTML(123456);
    it(' should return "123456"', () => {
      expect(s2).to.equal('123456');
    });

  });
});

