/**
 * Testing
 * @ndaidong
 */

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-empty-function: 0*/
/* eslint no-new-func: 0*/

require('jsdom-global')();

import is from 'is';
import {test} from 'tap';

import {variants} from '../../config';

const stringify = (x) => {
  if (is.array(x) || is.object(x)) {
    x = JSON.stringify(x);
  }
  return x;
};

const checkDetection = (bella) => {
  // isElement
  test('Testing .isElement(Anything) method:', (assert) => {
    const doc = window.document;
    const el = doc.createElement('DIV');
    const ra = bella.isElement(el);
    assert.ok(ra, 'Fragment must be an element.');

    [
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
      function x() {},
    ].forEach((item) => {
      const r = bella.isElement(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must be not element.`);
    });
    assert.end();
  });


  // isArray
  test('Testing .isArray(Anything) method:', (assert) => {
    [
      [],
      [
        1,
        2,
        3,
      ],
      new Array(),
      new Array(5),
    ].forEach((item) => {
      const r = bella.isArray(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be an array.`);
    });

    [
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
      function x() {},
    ].forEach((item) => {
      const r = bella.isArray(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must be not array.`);
    });
    assert.end();
  });

  // isObject
  test('Testing .isObject(Anything) method:', (assert) => {
    [
      is,
      {},
      {a: 1, b: 0},
      Object.create({}),
    ].forEach((item) => {
      const r = bella.isObject(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be an object.`);
    });

    [
      100,
      'ABC',
      '',
      null,
      undefined,
      0,
      [],
      new Date(),
    ].forEach((item) => {
      const r = bella.isObject(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must be not object.`);
    });
    assert.end();
  });


  // isString
  test('Testing .isString(Anything) method:', (assert) => {
    [
      'Something',
      '10000',
      '',
      'undefined',
      String(1000),
    ].forEach((item) => {
      const r = bella.isString(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be an string.`);
    });

    [
      false,
      true,
      null,
      undefined,
      Number('1000'),
      0,
    ].forEach((item) => {
      const r = bella.isString(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must be not string.`);
    });

    assert.end();
  });

  // isBoolean
  test('Testing .isBoolean(Anything) method:', (assert) => {
    [
      true,
      2 - 1 === 1,
    ].forEach((item) => {
      const r = bella.isBoolean(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be true.`);
    });

    [
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
      function x() {},
    ].forEach((item) => {
      const r = bella.isBoolean(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must be false.`);
    });
    assert.end();
  });

  // isDate
  test('Testing .isDate(Anything) method:', (assert) => {
    [new Date()].forEach((item) => {
      const r = bella.isDate(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be date.`);
    });

    [
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
      function x() {},
    ].forEach((item) => {
      const r = bella.isDate(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be date.`);
    });
    assert.end();
  });

  // isEmail
  test('Testing .isEmail(Anything) method:', (assert) => {
    [
      'ndaidong@gmail.com',
      'bob.nany@live.com',
      'bob.nany@live.com.vn',
    ].forEach((item) => {
      const r = bella.isEmail(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be email.`);
    });

    [
      'karu@.com',
      'karu',
      'bob.nany@live@com.v',
      '.bob.nany@live@com',
      '',
      undefined,
      0,
    ].forEach((item) => {
      const r = bella.isEmail(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be email.`);
    });
    assert.end();
  });


  // isEmpty
  test('Testing .isEmpty(Anything) method:', (assert) => {
    let something;
    [
      something,
      '',
      {},
      [],
      Object.create({}),
    ].forEach((item) => {
      const r = bella.isEmpty(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be empty.`);
    });

    [
      1,
      true,
      {a: 1},
      [
        1,
        3,
      ],
      function x() {},
    ].forEach((item) => {
      const r = bella.isEmpty(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be empty.`);
    });
    assert.end();
  });

  // isFunction
  test('Testing .isFunction(Anything) method:', (assert) => {
    [
      () => {},
      function x() {},
      new Function(),
    ].forEach((item) => {
      const r = bella.isFunction(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be function.`);
    });

    let something;
    [
      1,
      true,
      {a: 1},
      [
        1,
        3,
      ],
      something,
      '',
      {},
      [],
      Object.create({}),
    ].forEach((item) => {
      const r = bella.isFunction(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be function.`);
    });
    assert.end();
  });


  // isInteger
  test('Testing .isInteger(Anything) method:', (assert) => {
    [
      6e4,
      9,
      0,
    ].forEach((item) => {
      const r = bella.isInteger(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be integer.`);
    });

    [
      'ABC',
      '',
      '100',
      4.2,
      3 / 5,
      Math.PI,
      null,
      undefined,
    ].forEach((item) => {
      const r = bella.isInteger(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be integer.`);
    });
    assert.end();
  });


  // isLetter
  test('Testing .isLetter(Anything) method:', (assert) => {
    [
      'abc',
      'ABC',
      'AbCd',
    ].forEach((item) => {
      const r = bella.isLetter(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be letter.`);
    });

    [
      ')jki',
      'karu_',
      'bob.nany@',
      '-asd',
      '',
      undefined,
      0,
      1325,
      4.2,
      3 / 5,
      Math.PI,
      null,
      undefined,
    ].forEach((item) => {
      const r = bella.isLetter(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be letter.`);
    });
    assert.end();
  });


  // isNumber
  test('Testing .isNumber(Anything) method:', (assert) => {
    [
      4.2,
      3 / 5,
      6e4,
      Math.PI,
      9,
      0,
    ].forEach((item) => {
      const r = bella.isNumber(item);
      const x = stringify(item);
      assert.ok(r, `"${x}" must be number.`);
    });

    [
      ')jki',
      '',
      '100',
      null,
      undefined,
      new Function(),
    ].forEach((item) => {
      const r = bella.isNumber(item);
      const x = stringify(item);
      assert.error(r, `"${x}" must not be number.`);
    });
    assert.end();
  });

  // hasProperty
  test('Tesing .hasProperty(Object o, String propertyName) method:', (assert) => {
    const sample = {
      name: 'lemond',
      age: 15,
      group: null,
      label: 'undefined',
      color: 0,
    };

    const props = [
      'name',
      'age',
      'group',
      'label',
      'color',
    ];
    for (let i = 0; i < props.length; i++) {
      const k = props[i];
      assert.ok(bella.hasProperty(sample, k), `"${k}" must be recognized.`);
    }

    const fails = [
      'class',
      'year',
      'prototype',
      '__proto__',
      'toString',
    ];
    for (let i = 0; i < fails.length; i++) {
      const k = fails[i];
      assert.error(bella.hasProperty(sample, k), `"${k}" must be unrecognized.`);
    }

    assert.error(bella.hasProperty({a: 1}), 'Return false if missing k');
    assert.error(bella.hasProperty(), 'Return false if no parameter');
    assert.end();
  });

  // equals
  test('Tesing .equals(Anything a, Anything b) method:', (assert) => {
    const t = new Date();
    const a1 = [
      {},
      [],
      0,
      'a',
      [
        1,
        4,
        6,
        8,
      ],
      {
        a: 1,
        b: 4,
        c: 6,
      },
      t,
    ];
    const b1 = [
      {},
      [],
      0,
      'a',
      [
        1,
        4,
        6,
        8,
      ],
      {
        c: 6,
        b: 4,
        a: 1,
      },
      t,
    ];

    for (let i = 0; i < a1.length; i++) {
      const a = a1[i];
      const b = b1[i];
      const result = bella.equals(a, b);
      const as = stringify(a);
      const bs = stringify(b);
      assert.ok(result, `"${as}" must be equal to ${bs}.`);
    }


    const at = new Date();
    const bt = new Date(at.getTime() - 1000);
    const a2 = [
      {x: 5},
      [
        11,
        66,
        'ab',
      ],
      0,
      'a',
      [
        1,
        4,
        6,
        8,
      ],
      {
        a: 1,
        b: 4,
        c: 6,
      },
      at,
    ];
    const b2 = [
      {},
      ['ab'],
      8,
      'b',
      [
        1,
        6,
        4,
        8,
      ],
      {
        c: 6,
        b: 4,
        a: 2,
      },
      bt,
    ];

    for (let i = 0; i < a2.length; i++) {
      const a = a2[i];
      const b = b2[i];
      const result = bella.equals(a, b);
      const as = stringify(a);
      const bs = stringify(b);
      assert.error(result, `"${as}" must be not equal to ${bs}.`);
    }

    assert.end();
  });
};

variants.map(checkDetection);
