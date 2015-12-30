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

describe('.contains(Array a, String|Object search [, String key])', () => {

  describe(' / bella.contains(Array, String)', () => {

    let sample = [ 'red', 'green', 'yellow', 'white', 'black' ];

    sample.forEach((color) => {
      describe(' / bella.contains(' + JSON.stringify(sample) + ', "' + color + '")', () => {
        it(' should return true', () => {
          let result = bella.contains(sample, color);
          expect(result).to.equal(true);
        });
      });
    });

    let falseResult = [ 'blue', 'orange' ];
    falseResult.forEach((color) => {
      describe(' / bella.contains(' + JSON.stringify(sample) + ', "' + color + '")', () => {
        it(' should return false', () => {
          let result = bella.contains(sample, color);
          expect(result).to.equal(false);
        });
      });
    });

  });

  describe(' / bella.contains(Array, Object, String)', () => {

    let sample = [
      {
        id: 1,
        name: 'red'
      },
      {
        id: 2,
        name: 'green'
      },
      {
        id: 3,
        name: 'yellow'
      },
      {
        id: 4,
        name: 'white'
      },
      {
        id: 5,
        name: 'black'
      }
    ];

    sample.forEach((color) => {
      it(' should return true', () => {
        let result = bella.contains(sample, color, 'name');
        expect(result).to.equal(true);
      });
    });

    it(' should return true', () => {
      let blue = {
        id: 5,
        name: 'blue'
      };
      let result = bella.contains(sample, blue, 'id');
      expect(result).to.equal(true);
    });

    it(' should return false', () => {
      let blue = {
        id: 5,
        name: 'blue'
      };
      let result = bella.contains(sample, blue, 'name');
      expect(result).to.equal(false);
    });

    it(' should return false', () => {
      let orange = {
        id: 1,
        name: 'orange'
      };
      let result = bella.contains(sample, orange, 'name');
      expect(result).to.equal(false);
    });
  });
});
