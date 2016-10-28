
var bella = require('../src/main');

var Chance = require('chance');
var chance = new Chance();

var generate = () => {
  let id = bella.random(1000000000000, 9999999999999);
  let begin = bella.leftPad(bella.random(0, 9999), 4);
  let end = bella.leftPad(bella.random(0, 99999), 5);

  let pro = bella.random(1, 99);

  let adc = bella.random(1, 9999);

  let rssi = bella.random(1, 99);

  let ver = bella.pick(['1.0', '1.0', '1.0', '1.0', '0.9', '0.8', '1.1']);

  let t = bella.now() - bella.random(1000 * 60 * 5, 1000 * 60 * 60 * 24 * 7);
  let time = bella.date.relativize(new Date(t));

  let stat = bella.pick(['Active', 'Active', 'Active', 'Inactive']);

  let redFlag = bella.pick([0, 0, 1]);

  return {
    checked: bella.pick([0, 1]),
    id,
    imei: `${begin}960079${end}`,
    pro,
    adc,
    rssi,
    ver,
    redFlag,
    stat,
    time
  };
};

let a = [];
for (let i = 0; i < 1000; i++) {
  a.push(generate());
};

let b = bella.pick(a, 20);
let c = [];

b.forEach((item) => {
  let {
    checked,
    id,
    imei,
    pro,
    adc,
    rssi,
    ver,
    redFlag,
    stat,
    time
  } = item;

  var s = [
    '[' + (checked? 'x' : '') + ']',
    id,
    imei,
    pro,
    adc,
    rssi,
    ver,
    redFlag,
    stat,
    time
  ].join(', ');

  if (checked) {
    c.push(item);
  };
  console.log(s);
});

console.log('////////////////');

c.forEach((item) => {
  let {
    id,
    imei,
    pro,
    adc,
    rssi,
    ver,
    redFlag,
    stat,
    time
  } = item;

  var s = [
    id,
    imei,
    pro,
    adc,
    rssi,
    ver,
    redFlag,
    stat,
    time
  ].join(', ');
  console.log(s);
});
