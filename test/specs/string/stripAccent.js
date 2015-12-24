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

describe('.stripAccent(String s)', () => {

  let s = 'Sur l\'année 2015';
  describe(' / bella.stripAccent("' + s + '")', () => {

    let alias = bella.stripAccent(s);
    it(' should generate a standard slug', () => {
      expect(alias).to.equal('Sur l\'annee 2015');
    });

  });

  describe(' / bella.stripAccent("")', () => {

    let alias = bella.stripAccent('');
    it(' should generate an empty string', () => {
      expect(alias).to.equal('');
    });

  });

  describe(' / bella.stripAccent(123456)', () => {

    let alias = bella.stripAccent(123456);
    it(' should return "123456"', () => {
      expect(alias).to.equal('123456');
    });

  });
});
