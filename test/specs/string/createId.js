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

describe('.createId(Number len, String prefix)', () => {

  describe(' / bella.createId()', () => {

    let id = bella.createId();
    it(' should generate a string of 32 characters', () => {
      expect(id).to.have.length(32);
    });

    it(' should contain only alphabet, 0-9', () => {
      expect(id).to.match(/^[0-9A-z_]+/i);
    });

  });

  describe(' / bella.createId(15)', () => {

    let id = bella.createId(15);

    it(' should generate a string of 15 characters', () => {
      expect(id).to.have.length(15);
    });

    it(' should contain only alphabet, 0-9', () => {
      expect(id).to.match(/^[0-9A-z_]+/i);
    });

  });

  describe(' / bella.createId(36, \'__prefix__\'', () => {

    let id = bella.createId(36, '__prefix__');

    it(' should generate a string of 36 characters', () => {
      expect(id).to.have.length(36);
    });

    it(' should contain only alphabet, 0-9', () => {
      expect(id).to.match(/^[0-9A-z_]+/i);
    });

    it(' should begin with \'__prefix__\'', () => {
      expect(id).to.match(/^__prefix__/);
    });
  });

});

