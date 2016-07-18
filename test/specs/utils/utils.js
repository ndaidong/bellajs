/**
 * Testing
 * @ndaidong
 */

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

var test = require('tape');
var is = require('is');

var config = require('../../config');
var bella = config.bella;

var stringify = (x) => {
  if (is.array(x) || is.object(x)) {
    x = JSON.stringify(x);
  }
  return x;
};

// random
test('Testing .random() method', (assert) => {
  const LIMIT = 5;
  assert.comment('Call the result R, it must:');
  let i1 = 0;
  while (i1 < LIMIT) {
    let a = bella.random(50, 70);
    assert.ok(is.number(a), `"${a}" must be number.`);
    assert.ok(a >= 50 && a <= 70, 'bella.random(50, 70): 50 <= R <= 70');
    i1++;
  }

  let i2 = 0;
  while (i2 < LIMIT) {
    let a = bella.random(70, 50);
    assert.ok(is.number(a), `"${a}" must be number.`);
    assert.ok(a >= 50 && a <= 70, 'bella.random(70, 50): 50 <= R <= 70');
    i2++;
  }

  let i3 = 0;
  while (i3 < LIMIT) {
    let a = bella.random(50);
    assert.ok(is.number(a), `"${a}" must be number.`);
    assert.ok(a >= 50 && a <= 9007199254740991, 'bella.random(50): 50 <= R <= 9007199254740991');
    i3++;
  }

  let i4 = 0;
  while (i4 < LIMIT) {
    let a = bella.random();
    assert.ok(is.number(a), `"${a}" must be number.`);
    assert.ok(a >= 0 && a <= 9007199254740991, 'With no parameter, 0 <= R <= 9007199254740991.');
    i4++;
  }

  let x = bella.random(70, 70);
  assert.equals(70, x, 'bella.random(70, 70): R must be 70');
  assert.end();
});

// max
test('Testing .max(Array a) method', (assert) => {
  let x = [1, 9, 300, 200, 8, 58, 74];
  assert.equals(bella.max(x), 300, `bella.max(${stringify(x)}) must return 300`);
  assert.equals(bella.max(80), 80, 'bella.max(80) must return 80');
  assert.end();
});

// min
test('Testing .min(Array a) method', (assert) => {
  let x = [1, 9, 300, 200, 8, 58, 74];
  assert.equals(bella.min(x), 1, `bella.min(${stringify(x)}) must return 1`);
  assert.equals(bella.min(80), 80, 'bella.min(80) must return 80');
  assert.end();
});

// empty
test('Testing .empty(Anything) method', (assert) => {
  let a = [
    [1, 5, 67, 86, 12, 79],
    {name: 'olleH', age: 22},
    'Hello world'
  ];
  let e = [
    [],
    {},
    ''
  ];

  for (let i = 0; i < a.length; i++) {
    let k = a[i];
    let r = e[i];
    let x = stringify(k);
    let y = bella.empty(k);
    assert.deepEquals(y, r, `bella.empty(${x}) must return ${stringify(r)}`);
  }
  assert.end();
});

// clone
test('Testing .clone(Object target) method', (assert) => {
  let a = {
    level: 4,
    IQ: 140,
    epouse: {
      name: 'Alice',
      age: 27
    },
    birthday: new Date(),
    a: 0,
    clone: false,
    reg: /^\w+@\s([a-z])$/gi
  };


  let r = bella.clone(a);
  assert.ok(bella.hasProperty(r, 'level'), 'Result must have level');
  assert.ok(bella.hasProperty(r, 'IQ'), 'Result must have IQ');
  assert.ok(bella.hasProperty(r, 'epouse'), 'Result must have epouse');
  assert.ok(bella.hasProperty(r, 'birthday'), 'Result must have birthday');
  assert.ok(bella.hasProperty(r, 'reg'), 'Result must have reg');
  assert.error(bella.clone(), 'Clone nothing must return nothing');
  assert.end();
});

// copies
test('Testing .copies(Object target) method', (assert) => {
  let a = {
    name: 'Toto',
    age: 30,
    level: 8,
    nationality: {
      name: 'America'
    }
  };
  let b = {
    level: 4,
    IQ: 140,
    epouse: {
      name: 'Alice',
      age: 27
    },
    nationality: {
      long: '18123.123123.12312',
      lat: '98984771.134231.1234'
    }
  };

  bella.copies(a, b);
  assert.ok(bella.hasProperty(b, 'name'), 'Result must have name');
  assert.ok(bella.hasProperty(b, 'age'), 'Result must have age');
  assert.ok(bella.hasProperty(b, 'level'), 'Result must have level');
  assert.ok(bella.hasProperty(b, 'IQ'), 'Result must have IQ');
  assert.ok(bella.hasProperty(b, 'epouse'), 'Result must have epouse');
  assert.equals(b.level, 8, 'Level must be 8');

  let c = {
    name: 'Kiwi',
    age: 16,
    gender: 'male'
  };
  let d = {
    name: 'Aline',
    age: 20
  };
  bella.copies(c, d, true, ['age']);
  assert.ok(!bella.hasProperty(d, 'gender'), 'Result must have not gender');
  assert.end();
});

// unique
test('Testing .unique(Array a) method', (assert) => {
  let a = [
    1,
    6,
    8,
    6,
    'f',
    '1',
    13,
    99,
    8,
    'f',
    0
  ];

  let r = bella.unique(a);
  assert.deepEquals(r.length, 8, 'Result must have items');

  assert.deepEquals(bella.unique(), [], 'Result must be empty array');
  assert.end();
});

// contains
test('Testing .contains(Anything a, String b) method', (assert) => {
  let a1 = [
    'Aline', 'Bach', 'Nina', 'Gravie', 'Mark',
    1, 89, 77, 4212, 878,
    {
      name: 'Chris',
      age: 22
    },
    new Date()
  ];

  let b1t = [
    'Bach', 1, 'Mark', 878, ['name', 'Chris']
  ];

  b1t.forEach((item) => {
    let e, k;
    if (is.array(item)) {
      k = item[0];
      e = bella.contains(a1, k, item[1]);
    } else {
      k = item;
      e = bella.contains(a1, k);
    }
    assert.ok(e, `Array must contain ${k}`);
  });

  let a2 = {
    name: 'Chris',
    age: 22,
    country: 'Italia',
    group: 'admin',
    status: 1
  };

  let b2t = [
    'name', 'country', 'status'
  ];

  b2t.forEach((k) => {
    let e = bella.contains(a2, k);
    assert.ok(e, `Array must contain ${k}`);
  });


  let a3 = 'Hello world. I have a dream.';

  let b3t = [
    'lo', 'wor', 'have'
  ];

  b3t.forEach((k) => {
    let e = bella.contains(a3, k);
    assert.ok(e, `Array must contain ${k}`);
  });

  assert.end();
});

// first
test('Testing .first(Array a) method', (assert) => {
  let a = [9, 77, 123, 51, 876, 124];
  let e = bella.first(a);
  assert.deepEquals(e, 9, 'First item must be 9');
  assert.end();
});

// first
test('Testing .last(Array a) method', (assert) => {
  let a = [9, 77, 66, 51, 876, 124];
  let e = bella.last(a);
  assert.deepEquals(e, 124, 'First item must be 124');
  assert.end();
});

// first
test('Testing .getIndex(Array a, Find) method', (assert) => {
  let a = [9, 77, 123, 51, 876, 124, 12, 51, 99, 46];
  let e = bella.getIndex(a, 51);
  assert.deepEquals(e, 3, 'Index of 51 must be 3');
  assert.end();
});

// first
test('Testing .getLastIndex(Array a, Find) method', (assert) => {
  let a = [9, 77, 123, 51, 876, 124, 12, 51, 99, 46];
  let e = bella.getLastIndex(a, 51);
  assert.deepEquals(e, 7, 'Last index of 51 must be 7');
  assert.end();
});

// sort
test('Testing .sort(Array a) method', (assert) => {
  let a1 = [
    1,
    6,
    8,
    3,
    5
  ];

  let e1 = [1, 3, 5, 6, 8];
  let r1 = bella.sort(a1);
  assert.deepEquals(r1, e1, `Result must be ${stringify(e1)}`);

  let a2 = [
    {
      name: 'Aline',
      age: 12
    },
    {
      name: 'Steve',
      age: 29
    },
    {
      name: 'Nick',
      age: 7
    },
    {
      name: 'Kate',
      age: 16
    }
  ];

  let e21 = [
    {
      name: 'Nick',
      age: 7
    },
    {
      name: 'Aline',
      age: 12
    },
    {
      name: 'Kate',
      age: 16
    },
    {
      name: 'Steve',
      age: 29
    }
  ];

  let r21 = bella.sort(a2, 'age');
  assert.deepEquals(r21, e21, `Result must be ${stringify(e21)}`);

  let e22 = [
    {
      name: 'Steve',
      age: 29
    },
    {
      name: 'Kate',
      age: 16
    },
    {
      name: 'Aline',
      age: 12
    },
    {
      name: 'Nick',
      age: 7
    }
  ];

  let r22 = bella.sort(a2, {age: -1});
  assert.deepEquals(r22, e22, `Result must be ${stringify(e22)}`);
  assert.end();
});


// shuffle
test('Testing .shuffle(Array a) method', (assert) => {
  let a = [
    1, 4, 9, 18, 55, 64, 2, 7, 33, 8
  ];

  let r1 = bella.shuffle(a);
  assert.deepEquals(r1.length, a.length, 'Returned array has same length');
  assert.notDeepEqual(r1, a, 'Returned array is not same as original');
  let r2 = bella.shuffle(a);
  assert.deepEquals(r2.length, a.length, 'Returned array has same length');
  assert.notDeepEqual(r2, a, 'Returned array is not same as original');
  assert.end();
});

// pick
test('Testing .pick(Array a, Number count) method', (assert) => {
  let a = [
    1, 4, 9, 18, 55, 64, 2, 7, 33, 8
  ];

  let r1 = bella.pick(a);
  assert.ok(is.number(r1), 'bella.pick(a) must return a number');

  let r2 = bella.pick(a, 3);
  assert.deepEquals(r2.length, 3, 'bella.pick(a, 3) must return array with 3 items');

  let r3 = bella.pick(a, 5);
  assert.deepEquals(r3.length, 5, 'bella.pick(a, 5) must return array with 5 items');

  let r4 = bella.pick(a, 50);
  assert.deepEquals(r4.length, a.length, 'bella.pick(a, 50) must return shuffled original array');

  let r5 = bella.pick(a, -2);
  assert.ok(is.number(r5), 'bella.pick(a, -1) must return a number');

  assert.end();
});

// md5
test('Testing .md5() method', (assert) => {
  let arr = [];
  while (arr.length < 10) {
    let k = bella.md5();
    arr.push(k);
    assert.deepEquals(k.length, 32, 'Returned value must be 32 chars');
  }

  assert.end();
});
