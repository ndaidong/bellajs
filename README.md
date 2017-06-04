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
* [Test](#test)
* [License](#license)


## Setup

- Node.js

  ```
  npm install bellajs --save
  ```

- CDN

  - [bella.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.js)
  - [bella.min.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.js)

- This library also supports ES6 Module, AMD and UMD style.


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
 - .isArray(Anything val): check if val is Array
 - .isBoolean(Anything val): check if val is Boolean
 - .isDate(Anything val): check if val is Date
 - .isElement(Anything val): check if val is likely a DOM element
 - .isEmail(Anything val): check if val is well-format email address
 - .isEmpty(Anything val): check if val is [], {} or ''
 - .isFunction(Anything val): check if val is Function
 - .isInteger(Anything val): check if val is an integer
 - .isLetter(Anything val): check if val is letter
 - .isNull(Anything val): check if val is null
 - .isNumber(Anything val): check if val is Number
 - .isObject(Anything val): check if val is Object
 - .isString(Anything val): check if val is String
 - .isUndefined(Anything val): check if val is Undefined


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
##### .equals(Anything a, Anything b)
##### .md5(String s)
##### .random([Number min [, Number max]]):


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
