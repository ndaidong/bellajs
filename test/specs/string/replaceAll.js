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

describe('.replaceAll(String s, [String | Array] search, [String | Array] replace)', () => {

  let data = [
    {
      input: {
        a: 'Hello world',
        b: 'l',
        c: '2'
      },
      expectation: 'He22o wor2d'
    },
    {
      input: {
        a: 'Hello world',
        b: ['l', 'o'],
        c: ['2', '0']
      },
      expectation: 'He220 w0r2d'
    },
    {
      input: {
        a: 'Hello world',
        b: ['l', 'o'],
        c: '2'
      },
      expectation: 'He222 w2r2d'
    },
    {
      input: {
        a: 'Hello world',
        b: ['l'],
        c: ['2', '0']
      },
      expectation: 'Hello world'
    },
    {
      input: {
        a: 'Hello world',
        b: 'l'
      },
      expectation: 'Hello world'
    },
    {
      input: {
        a: 'Hello world'
      },
      expectation: 'Hello world'
    },
    {
      input: {
        a: false
      },
      expectation: ''
    },
    {
      input: {
        a: 10000
      },
      expectation: ''
    },
    {
      input: {
        a: {q: 97}
      },
      expectation: ''
    },
    {
      input: {
        a: [20, 15, 0, 'T']
      },
      expectation: ''
    }
  ];

  data.forEach((useCase) => {

    var input = useCase.input;
    var a = input.a;
    var b = input.b;
    var c = input.c;
    var e = useCase.expectation;

    var param;
    if (bella.isString(a)) {
      param = '"' + a + '"';
    } else if (bella.isBoolean(a) || bella.isNumber(a)) {
      param = a;
    } else if (bella.isFunction(a)) {
      param = a.toString();
    } else {
      param = JSON.stringify(a);
    }

    if (b) {
      param += ', ' + JSON.stringify(b);
    }
    if (c) {
      param += ', ' + JSON.stringify(c);
    }

    describe(' / bella.replaceAll(' + param + ')', () => {
      it(' should return "' + e + '"', () => {
        let result = bella.replaceAll(a, b, c);
        expect(result).to.equal(e);
      });

    });
  });

});

