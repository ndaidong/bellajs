BellaJS
========

Lightweight util for handling data type, string... in your Node.js and browser apps.

[![NPM](https://badge.fury.io/js/bellajs.svg)](https://badge.fury.io/js/bellajs)
[![Build Status](https://travis-ci.org/ndaidong/bellajs.svg?branch=master)](https://travis-ci.org/ndaidong/bellajs)
[![codecov](https://codecov.io/gh/ndaidong/bellajs/branch/master/graph/badge.svg)](https://codecov.io/gh/ndaidong/bellajs)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/bellajs.svg)](https://gemnasium.com/github.com/ndaidong/bellajs)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/63f808aa-af9a-44ea-b744-3d6356d5e268/badge)](https://nodesecurity.io/orgs/techpush/projects/63f808aa-af9a-44ea-b744-3d6356d5e268)


# Contents

* [Setup](#setup)
* [APIs](#apis)
  * [DataType detection](#datatype-detection)
  * [String manipulation](#string-manipulation)
  * [Template](#template)
  * [Other utils](#other-utils)
    * [createId](#createid)
    * [equals](#equals)
    * [md5](#md5)
    * [random](#random)
    * [unique](#unique)
    * [curry](#curry)
    * [compose](#compose)
    * [pipe](#pipe)
* [Test](#test)
* [License](#license)


## Setup

- Node.js

  ```
  npm install bellajs
  ```

- CDN

  - [bella.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.js)
  - [bella.min.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.js)
  - [bella.min.map](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.map)

- Also supports ES6 Module, CommonJS, AMD and UMD style.


### Usage

```
var bella = require('bellajs');

// or:
import bella from 'bellajs';

// or import several methods only
import {
  isArray,
  isString
} from 'bellajs';

// similar:
var {
  isArray,
  isString
} = require('bellajs');

```


## APIs

### DataType detection
 - .isArray(Anything val)
 - .isBoolean(Anything val)
 - .isDate(Anything val)
 - .isElement(Anything val)
 - .isEmail(Anything val)
 - .isEmpty(Anything val)
 - .isFunction(Anything val)
 - .isInteger(Anything val)
 - .isLetter(Anything val)
 - .isNull(Anything val)
 - .isNumber(Anything val)
 - .isObject(Anything val)
 - .isString(Anything val)
 - .isUndefined(Anything val)


### String manipulation
  - .createAlias(String s)
  - .encode(String s)
  - .decode(String s)
  - .ucfirst(String s)
  - .ucwords(String s)
  - .escapeHTML(String s)
  - .unescapeHTML(String s)
  - .stripTags(String s)
  - .stripAccent(String s)
  - .trim(String s [, Boolean nospace])
  - .truncate(String s, Number limit)
  - .repeat(String s, Number times)
  - .leftPad(String s, Number limit, String pad)
  - .rightPad(String s, Number limit, String pad)
  - .replaceAll(String s, String|Array search, String|Array replace)

### Template
 - .template(String tpl)

Returns an object with .compile() method

Example:

```
var tpl = [
  '<article>',
    '<a href="{link}">{title}</a>',
    '<p>{content}</p>',
    '<p>',
      '<span>{author.name}</span>',
      '<span>{author.email}</span>',
    '</p>',
  '</article>'
].join('');

var data = {
  title: 'Hello world',
  link: 'http://google.com',
  content: 'This is an interesting thing, is that right?',
  author: {
    name: 'Dong Nguyen',
    email: 'ndaidong@gmail.com'
  }
}

var html = bella.template(tpl).compile(data);
console.log(html);

```

### Other utils

##### .clone(Anything val):

Return a copy of val.

```
let b = [
  1, 5, 0, 'a', -10, '-10', '',
  {
    a: 1,
    b: 'Awesome'
  }
];

let cb = bella.clone(b);
console.log(cb);
```

*cb* now has the same values as *b*, while the properties are standalone, not reference. So that:

```
cb[7].a = 2;
cb[7].b = 'Noop';

console.log(b[7]);
```

What you get is still:

```
{
  a: 1,
  b: 'Awesome'
}
```

##### .copies(Object source, Object target[[, Boolean requireMatching], Array excepts]):

Copy the properties from *source* to *target*.

- *requireMatching*: if true, BellaJS only copies the properties that are already exist in *target*.
- *excepts*: array of the properties properties in *source* that you don't want to copy.

Example:

```
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
console.log(b);
```

Output:

```
{
  level: 8,
  IQ: 140,
  epouse: {
    name: 'Alice',
    age: 27
  },
  nationality: {
    long: '18123.123123.12312',
    lat: '98984771.134231.1234',
    name: 'America'
  },
  name: 'Toto',
  age: 30
}
```

##### .createId([Number length [, String prefix]])

```
import {createId} from 'bellajs';

createId(); // => random 32 chars
createId(16); // => random 16 chars
createId(5); // => random 5 chars
createId(5, 'X_'); // => X_{random 3 chars}
```

##### .equals(Anything a, Anything b)

```
import {equals} from 'bellajs';

equals({}, {}); // => true
equals(0, 1); // => false
```

##### .md5(String s)

```
import {md5} from 'bellajs';

md5('abc'); // => 900150983cd24fb0d6963f7d28e17f72
```

##### .random([Number min [, Number max]])

```
import {random} from 'bellajs';

random(); // => a random integer
random(1, 5); // => a random integer between 3 and 5, including 1 and 5
```


##### .unique(Array a)

```
import {unique} from 'bellajs';

unique([1, 2, 3, 2, 3, 1, 5]); // => [ 1, 2, 3, 5 ]
```

##### .curry(fn)

```
import {curry} from 'bellajs';

let sum = curry((a, b, c) => {
  return a + b + c;
});

sum(3)(2)(1) // => 6
sum(1)(2)(3) // => 6
sum(1, 2)(3) // => 6
sum(1)(2, 3) // => 6
sum(1, 2, 3) // => 6
```

##### .compose(f1, f2, ...fN)

Performs right-to-left function composition.

```
import {compose} from 'bellajs';

let f1 = (name) => {
  return `f1 ${name}`;
};
let f2 = (name) => {
  return `f2 ${name}`;
};
let f3 = (name) => {
  return `f3 ${name}`;
};

let addF = compose(f1, f2, f3);

addF('Hello') // => 'f1 f2 f3 Hello'

let add1 = (num) => {
  return num + 1;
};

let mult2 = (num) => {
  return num * 2;
};

let add1AndMult2 = compose(add1, mult2);
add1AndMult2(3) // => 7
// because multiple to 2 first, then add 1 late => 3 * 2 + 1
```

##### .pipe(f1, f2, ...fN)

Performs left-to-right function composition.

```
import {pipe} from 'bellajs';

let f1 = (name) => {
  return `f1 ${name}`;
};
let f2 = (name) => {
  return `f2 ${name}`;
};
let f3 = (name) => {
  return `f3 ${name}`;
};

let addF = pipe(f1, f2, f3);

addF('Hello') // => 'f3 f2 f1 Hello'

let add1 = (num) => {
  return num + 1;
};

let mult2 = (num) => {
  return num * 2;
};

let add1AndMult2 = pipe(add1, mult2);
add1AndMult2(3) // => 8
// because add 1 first, then multiple to 2 late => (3 + 1) * 2
```

## Note

Some parts of `bella` have been split to separate modules, including:

- bella.stabilize: [stabilize.js](https://www.npmjs.com/package/stabilize.js)
- bella.date: [bella-date](https://www.npmjs.com/package/bella-date)
- bella.scheduler: [bella-scheduler](https://www.npmjs.com/package/bella-scheduler)
- bella.detector: [device-detector](https://www.npmjs.com/package/device-detector)


## Test

```
git clone https://github.com/ndaidong/bellajs.git
cd bellajs
npm install
npm test
```


# License

The MIT License (MIT)
