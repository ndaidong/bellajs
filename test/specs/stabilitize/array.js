/**
 * Testing
 * @ndaidong
 */

var test = require('tape');

var config = require('../../config');
var bella = config.bella;

var stabilize = bella.stabilize;

var stringify = (x) => {
  if (bella.isArray(x) || bella.isObject(x)) {
    x = JSON.stringify(x);
  }
  return x;
};

let v = stabilize([
  {
    name: 'Alice',
    age: 22
  },
  {
    name: 'Nick',
    age: 19
  },
  {
    name: 'Tom',
    age: 25
  },
  {
    name: 'Paul',
    age: 16
  },
  {
    name: 'Tom',
    age: 25
  },
  {
    name: 'Rick',
    age: 26
  },
  {
    name: 'Mary',
    age: 28
  },
  {
    name: 'Kelly',
    age: 21
  }
]);

test('Test the APIs overview', (assert) => {

  assert.comment('Create an array using stabilize');

  assert.ok(bella.isArray(v), 'v must be an array');
  assert.ok(v.length === 8, 'v must have 8 elements');

  assert.comment('Check if the methods exist');
  let checkMethods = (m) => {
    assert.ok(bella.isFunction(v[m]), `v must have method "${m}"`);
  };

  [
    'min',
    'max',
    'unique',
    'first',
    'last',
    'pick',
    'insert',
    'append',
    'remove',
    'isort',
    'ireverse',
    'shuffle'
  ].map(checkMethods);

  assert.comment('Check the method ".min()"');
  let original1 = stabilize([
    1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8
  ]);
  let original1Min = original1.min();
  assert.ok(original1Min === 0, 'original1Min must be 0');

  assert.comment('Check the method ".max()"');
  let original2 = stabilize([
    1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8
  ]);
  let original2Max = original2.max();
  assert.ok(original2Max === 9, 'original2Max must be 9');

  assert.comment('Check the method ".unique()"');
  let original = stabilize([
    1, 6, 9, 0, 6, 5, 3, 5, 2, 7, 6, 8
  ]);
  let originalUnique = original.unique();
  assert.ok(original.length === 12, 'original.length must be 12 (no change)');
  assert.ok(bella.isArray(originalUnique), 'originalUnique must be an array');
  assert.ok(originalUnique.length === 9, 'originalUnique.length must be 9');

  assert.comment('Check the method ".first()"');
  let vfirst = v.first();
  assert.ok(bella.isObject(vfirst), 'vfirst must be an object');
  assert.ok(vfirst.name === 'Alice', 'vfirst must have name = Alice');
  assert.ok(vfirst.age === 22, 'vfirst must have age = 22');

  assert.comment('Check the method ".last()"');
  let vlast = v.last();
  assert.ok(bella.isObject(vlast), 'vlast must be an object');
  assert.ok(vlast.name === 'Kelly', 'vlast must have name = Kelly');
  assert.ok(vlast.age === 21, 'vlast must have age = 21');

  assert.comment('Check the method ".insert()"');
  let vinsert = v.insert(0, {
    name: 'Susan',
    age: 18
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vinsert), 'vinsert must be an array');
  assert.ok(vinsert.length === v.length + 1, `vinsert.length must be ${v.length + 1}`);
  let vinsertFirstItem = vinsert.first();
  assert.ok(vinsertFirstItem.name === 'Susan', 'vinsertFirstItem must have name = Susan');
  assert.ok(vinsertFirstItem.age === 18, 'vinsertFirstItem must have age = 18');

  let vinsert2 = vinsert.insert(4, {
    name: 'Simon',
    age: 29
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(vinsert.length === 9, 'vinsert.length must be 9 (no change)');
  assert.ok(bella.isArray(vinsert2), 'vinsert2 must be an array');
  assert.ok(vinsert2.length === vinsert.length + 1, `vinsert2.length must be ${vinsert.length + 1}`);
  let vinsert2Item4 = vinsert2[4];
  assert.ok(vinsert2Item4.name === 'Simon', 'vinsert2Item4 must have name = Simon');
  assert.ok(vinsert2Item4.age === 29, 'vinsert2Item4 must have age = 29');

  assert.comment('Check the method ".append()"');
  let vappend = v.append({
    name: 'Yumi',
    age: 21
  }, {
    name: 'Kate',
    age: 24
  }, {
    name: 'Jun',
    age: 31
  }, {
    name: 'Walker',
    age: 15
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vinsert2), 'vinsert2 must be an array');
  assert.ok(vappend.length === v.length + 4, `vappend.length must be ${v.length + 4}`);
  let vappendLastItem = vappend.last();
  assert.ok(vappendLastItem.name === 'Walker', 'vappendLastItem must have name = Walker');
  assert.ok(vappendLastItem.age === 15, 'vappendLastItem must have age = 15');

  assert.comment('Check the method ".remove()"');

  assert.comment('-- Remove nothing"');
  let vremoveNothing = v.remove();
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vremoveNothing), 'vremoveNothing must be an array');
  assert.ok(vremoveNothing.length === v.length, `vremoveNothing.length must be ${v.length}`);
  let vremoveNothingFirstItem = vremoveNothing.first();
  assert.ok(vremoveNothingFirstItem.name === 'Alice', 'vremoveNothingFirstItem must have name = Alice');
  assert.ok(vremoveNothingFirstItem.age === 22, 'vremoveNothingFirstItem must have age = 22');

  assert.comment('-- Remove 2 first items"');
  let vremove2first = v.remove(0, 2);
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vremove2first), 'vremove2first must be an array');
  assert.ok(vremove2first.length === v.length - 2, `vremove2first.length must be ${v.length - 2}`);
  let vremoveFirstItem = vremove2first.first();
  assert.ok(vremoveFirstItem.name === 'Tom', 'vremoveFirstItem must have name = Tom');
  assert.ok(vremoveFirstItem.age === 25, 'vremoveFirstItem must have age = 25');

  assert.comment('-- Remove 2 last items"');
  let vremove2Last = v.remove(v.length - 2, 2);
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(vremove2Last), 'vremove2Last must be an array');
  assert.ok(vremove2Last.length === v.length - 2, `vremove2Last.length must be ${v.length - 2}`);
  let vremoveLastItem = vremove2Last.last();
  assert.ok(vremoveLastItem.name === 'Rick', 'vremoveLastItem must have name = Rick');
  assert.ok(vremoveLastItem.age === 26, 'vremoveLastItem must have age = 26');

  assert.end();
});

test('Testing .isort() method', (assert) => {

  let visort = v.isort((a, b) => {
    let ag = a.age;
    let bg = b.age;
    if (ag === bg) {
      return 0;
    }
    return ag < bg ? -1 : 1;
  });
  assert.ok(v.length === 8, 'v.length must be 8 (no change)');
  assert.ok(bella.isArray(visort), 'visort must be an array');
  assert.ok(visort.length === v.length, `visort.length must be ${v.length}`);
  let visortFirstItem = visort.first();
  assert.ok(visortFirstItem.name === 'Paul', 'visortFirstItem must have name = Paul');
  assert.ok(visortFirstItem.age === 16, 'visortFirstItem must have age = 16');
  let visortLastItem = visort.last();
  assert.ok(visortLastItem.name === 'Mary', 'visortLastItem must have name = Mary');
  assert.ok(visortLastItem.age === 28, 'visortLastItem must have age = 28');

  assert.end();
});

test('Testing .msort() method', (assert) => {
  let a1 = bella.stabilize([
    1,
    6,
    8,
    3,
    5
  ]);

  let e1 = [1, 3, 5, 6, 8];
  let r1 = a1.msort();
  assert.deepEquals(r1, e1, `Result must be ${stringify(e1)}`);

  let a2 = bella.stabilize([
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
  ]);

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

  let r21 = a2.msort('age');
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

  let r22 = a2.msort({age: -1});
  assert.deepEquals(r22, e22, `Result must be ${stringify(e22)}`);
  assert.end();
});

test('Testing .ireverse() method', (assert) => {

  let visort = v.isort((a, b) => {
    let ag = a.age;
    let bg = b.age;
    if (ag === bg) {
      return 0;
    }
    return ag < bg ? -1 : 1;
  });

  let vIsortIreverse = visort.ireverse();
  assert.ok(visort.length === 8, 'visort.length must be 8 (no change)');
  assert.ok(bella.isArray(vIsortIreverse), 'vIsortIreverse must be an array');
  assert.ok(vIsortIreverse.length === visort.length, `vIsortIreverse.length must be ${visort.length}`);
  let vIsortIreverseFirstItem = vIsortIreverse.first();
  assert.ok(vIsortIreverseFirstItem.name === 'Mary', 'vIsortIreverseFirstItem must have name = Mary');
  assert.ok(vIsortIreverseFirstItem.age === 28, 'vIsortIreverseFirstItem must have age = 28');
  let vIsortIreverseLastItem = vIsortIreverse.last();
  assert.ok(vIsortIreverseLastItem.name === 'Paul', 'vIsortIreverseLastItem must have name = Paul');
  assert.ok(vIsortIreverseLastItem.age === 16, 'vIsortIreverseLastItem must have age = 16');

  assert.end();
});

test('Testing .shuffle() method', (assert) => {

  let arr2Shuffle = stabilize([
    1, 4, 9, 18, 55, 64, 2, 7, 33, 8, 11, 44, 99, 15, 35, 64, 12, 27, 13, 28
  ]);

  let r1 = arr2Shuffle.shuffle();
  assert.deepEquals(r1.length, arr2Shuffle.length, 'Returned array has same length');
  assert.notDeepEqual(r1, arr2Shuffle, 'Returned array is not same as original');
  let r2 = arr2Shuffle.shuffle();
  assert.deepEquals(r2.length, arr2Shuffle.length, 'Returned array has same length');
  assert.notDeepEqual(r2, arr2Shuffle, 'Returned array is not same as original');

  assert.deepEquals(r2.length, r1.length, 'r2.length must be equal to r1.length');
  assert.notDeepEqual(r2, r1, 'r2 is not same as r1');

  assert.end();
});

test('Testing .pick() method', (assert) => {

  let arr2Pick = stabilize([
    1, 4, 9, 18, 55, 64, 2, 7, 33, 8, 11, 44, 99, 15, 35, 64, 12, 27, 13, 28
  ]);

  let k1 = arr2Pick.pick();
  assert.ok(bella.isNumber(k1), 'arr2Pick.pick() must return a number');

  let k2 = arr2Pick.pick(3);
  let size2 = Math.min(3, arr2Pick.length);
  assert.deepEquals(k2.length, size2, `arr2Pick.pick(3) must return array with ${size2} items`);

  let k3 = arr2Pick.pick(5);
  let size3 = Math.min(5, arr2Pick.length);
  assert.deepEquals(k3.length, size3, `arr2Pick.pick(5) must return array with ${size3} items`);

  let k4 = arr2Pick.pick(50);
  assert.deepEquals(k4.length, arr2Pick.length, 'arr2Pick.pick(50) must return shuffled original array');

  let k5 = arr2Pick.pick(-2);
  assert.ok(bella.isNumber(k5), 'arr2Pick.pick(-1) must return a number');

  assert.end();
});
