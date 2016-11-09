
var bella = require('../../src/main');

var generate = () => {

  let begin = bella.leftPad(bella.random(0, 9999), 4);
  let end = bella.leftPad(bella.random(0, 99999), 5);

  return {
    imei: `${begin}960079${end}`
  };
};

let a = bella.stabilize([]);
for (let i = 0; i < 5000; i++) {
  let c = generate();
  a = a.append(c);
}

let b = a.pick(20);

console.log(b);

((stabilize) => {

  var points = stabilize([1, 5, 19, 6, 4, 11, 7, 22, 40, 3, 8]);
  console.log('Array points, original:');
  console.log(points);

  console.log('Array points, lowest to highest:');
  var a1 = points.msort(); // without parameter
  console.log(a1);

  console.log('Array points, descendant:');
  var a2 = points.msort(-1);
  console.log(a2);

  var players = stabilize([
    {
      name: 'Jerome Nash',
      age: 24
    },
    {
      name: 'Jackson Valdez',
      age: 21
    },
    {
      name: 'Benjamin Cole',
      age: 23
    },
    {
      name: 'Manuel Delgado',
      age: 33
    },
    {
      name: 'Caleb McKinney',
      age: 28
    }
  ]);

  console.log('\nList of players as it is:');
  players.forEach((item) => {
    console.log([item.name, item.age].join(' | '));
  });

  console.log('\nSort by age from youngest to oldest:');
  var players1 = players.msort('age');
  players1.forEach((item) => {
    console.log([item.name, item.age].join(' | '));
  });

  console.log('\nSort by age from oldest to youngest:');
  var players2 = players.msort({age: -1});
  players2.forEach((item) => {
    console.log([item.name, item.age].join(' | '));
  });
})(bella.stabilize);
