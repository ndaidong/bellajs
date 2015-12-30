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

describe('.isArray()', () => {

  let trueResult = [
    [],
    [ 1, 2, 3 ],
    new Array(),
    new Array(5)
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isArray(v);
      it(' should be "true"', (done) => {
        expect(result).to.equal(true);
        done();
      });
    });
  });

  let falseResult = [
    'ABC',
    '',
    '100',
    4.2,
    3 / 5,
    0,
    1,
    Math.PI,
    null,
    undefined,
    function x() {}
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isArray(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});

describe('.isBoolean()', () => {

  let trueResult = [
    true,
    2 - 1 === 1
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isBoolean(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    'ABC',
    '',
    '100',
    4.2,
    3 / 5,
    0,
    1,
    Math.PI,
    null,
    undefined,
    function x() {}
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isBoolean(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isDate()', () => {

  let trueResult = [
    new Date()
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isDate(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    'ABC',
    '',
    '100',
    4.2,
    3 / 5,
    0,
    1,
    Math.PI,
    null,
    undefined,
    function x() {}
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isDate(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isDef()', () => {

  let a = 1, b = null;
  let trueResult = [
    a,
    b
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isDef(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let something;
  let falseResult = [
    something
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isDef(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});

describe('.isEmail()', () => {

  let trueResult = [
    'ndaidong@gmail.com',
    'bob.nany@live.com',
    'bob.nany@live.com.vn'
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isEmail(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    'karu@.com',
    'karu',
    'bob.nany@live@com.v',
    '.bob.nany@live@com',
    '',
    undefined,
    0
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isEmail(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isEmpty()', () => {

  let something;
  let trueResult = [
    something,
    '',
    {},
    [],
    Object.create({})
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isEmpty(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });


  let falseResult = [
    1,
    true,
    { a: 1 },
    [ 1, 3 ],
    function x() {}
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isEmpty(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isFunction()', () => {


  let trueResult = [
    function x() {},
    new Function()
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isFunction(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let something;
  let falseResult = [
    1,
    true,
    { a: 1 },
    [ 1, 3 ],
    something,
    '',
    {},
    [],
    Object.create({})
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isFunction(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isGeneratedKey()', () => {

  let trueResult = [];
  while (trueResult.length < 10) {
    trueResult.push(bella.createId());
  }

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isGeneratedKey(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    ')jki',
    'karu_',
    'bob.nany@',
    '-asd',
    '',
    undefined,
    0
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isGeneratedKey(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isInteger()', () => {

  let trueResult = [
    6e4,
    9,
    0
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isInteger(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    'ABC',
    '',
    '100',
    4.2,
    3 / 5,
    Math.PI,
    null,
    undefined
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isInteger(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});

describe('.isLetter()', () => {

  let trueResult = [
    'abc',
    'ABC',
    'AbCd'
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isLetter(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    ')jki',
    'karu_',
    'bob.nany@',
    '-asd',
    '',
    undefined,
    0,
    1325
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isLetter(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isNumber()', () => {

  let trueResult = [
    4.2,
    3 / 5,
    6e4,
    Math.PI,
    9,
    0
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isNumber(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    'ABC',
    '',
    '100',
    null,
    undefined
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isNumber(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isObject()', () => {

  let trueResult = [
    chai,
    path,
    {},
    { a: 1, b: 0 },
    Object.create({}),
    [],
    new Date()
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isObject(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    100,
    'ABC',
    '',
    null,
    undefined,
    0
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isObject(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});


describe('.isString()', () => {

  let trueResult = [
    'Something',
    '10000',
    '',
    'undefined',
    String(1000)
  ];

  trueResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isString(v);
      it(' should be "true"', () => {
        expect(result).to.equal(true);
      });
    });
  });

  let falseResult = [
    false,
    true,
    null,
    undefined,
    Number('1000'),
    0
  ];

  falseResult.forEach((v) => {

    describe(' / Test for "' + v + '"', () => {

      let result = bella.isString(v);
      it(' should be "false"', () => {
        expect(result).to.equal(false);
      });
    });
  });
});
