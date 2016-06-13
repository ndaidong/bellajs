/**
 * Testing
 * @ndaidong
 */

var bella = require('../../src/bella');

let a = {
  name: 'x',
  age: 10,
  reg: [9, 8, 7, 2]
};

let b = bella.copies(a, {});

console.log('Original:');
console.log('a');
console.log(a);
console.log('b');
console.log(b);

console.log('Changing...');
a.age = 15;
b.name = 'y';
b.reg.push(111);
console.log('After changing:');
console.log('a');
console.log(a);
console.log('b');
console.log(b);
