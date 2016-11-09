
var bella = require('../../src/main');

var generate = () => {

  let begin = bella.leftPad(bella.random(0, 9999), 4);
  let end = bella.leftPad(bella.random(0, 99999), 5);

  return {
    imei: `${begin}960079${end}`
  };
};

let a = bella.stabilize([]);
for (let i = 0; i < 1000; i++) {
  let c = generate();
  console.log(c);
  a = a.append(c);
}

let b = a.pick(20);

console.log(b);
