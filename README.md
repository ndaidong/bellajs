BellaJS
========

Lightweight util for handling data type, string... in your Node.js and browser apps.

[![NPM](https://badge.fury.io/js/bellajs.svg)](https://badge.fury.io/js/bellajs)
![CI test](https://github.com/ndaidong/bellajs/workflows/ci-test/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/bellajs/badge.svg)](https://coveralls.io/github/ndaidong/bellajs)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ndaidong_bellajs&metric=alert_status)](https://sonarcloud.io/dashboard?id=ndaidong_bellajs)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

You may be interested in [BellaPy](https://github.com/ndaidong/bellapy) too.

# Contents

* [Setup](#setup)
* [APIs](#apis)
  * [DataType detection](#datatype-detection)
  * [Date format](#date-format)
  * [String manipulation](#string-manipulation)
  * [Data handling](#data-handling): [clone](#clone), [copies](#copies)
  * [Array utils](#array-utils): [pick](#pick), [sort](#sort), [sortBy](#sortBy), [shuffle](#shuffle), [unique](#unique)
  * [Functional utils](#functional-utils): [curry](#curryfn), [compose](#compose), [pipe](#pipe), [maybe](#maybe)
  * [Other utils](#other-utils): [equals](#equals), [randint](#randint), [genid](#genid)

* [Test](#test)

* [License](#license)

## Setup

- Node.js

  ```bash
  npm i bellajs

  # pnpm
  pnpm i bellajs

  # yarn
  yarn add bellajs
  ```

- CDN

  - ES6 Module: [bella.esm.js](https://unpkg.com/bellajs/dist/bella.esm.js)
  - CommonJS: [bella.js](https://unpkg.com/bellajs/dist/cjs/bella.js)
  - For old browsers: [bella.min.js](https://unpkg.com/bellajs/dist/bella.min.js)


## Usage

### Node.js:

Sync v14, ECMAScript modules [have became the official standard format](https://nodejs.org/docs/latest-v14.x/api/esm.html#esm_modules_ecmascript_modules).

Just [enable](https://nodejs.org/api/packages.html#determining-module-system) and enjoy with ES6 import/export syntax.


```js
import { genid } from 'bellajs'
console.log(genid())
```

For regular CommonJS environment, `require` can be used as below:

```js
const bella = require('bellajs/dist/cjs/bella.js')
console.log(bella.genid())
```

### Browsers:

Currently ECMAScript modules work fine on almost browsers:

```html
<script type="module">
import { genid } from 'https://unpkg.com/bellajs/dist/bella.esm.js'
console.log(genid())
</script>
```

With outdated browsers, we can use traditional way:

```html
<script type="text/javascript" src="https://unpkg.com/bellajs/dist/bella.min.js"></script>

<script>
console.log(window.bella.genid())
</script>
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
- .isNil(Anything val)
- .isNull(Anything val)
- .isNumber(Anything val)
- .isObject(Anything val)
- .isString(Anything val)
- .isUndefined(Anything val)

### Date format

- `toRelativeTime([Date | Timestamp])`
- `toDateString([Date | Timestamp] [, String pattern])`

Default pattern for `toDateString()` method is `D, M d, Y  H:i:s A`.

Here are the available characters:

```
  - Y: full year, ex: 2050
  - y: short year, ex: 50
  - F: full month name, ex: August
  - M: short month name, ex: Aug
  - m: month index with zero, ex: 08 (in 08/24/2050)
  - n: short month name with no zero, ex: 8 (in 8/24/2050)
  - S: the ordering subfix for date, ext: 1st, 2nd, 3rd, 4th
  - j: day of the month, with no zero, ex: 3 (in 18/3/2050)
  - d: day of the month, with zero, ex: 03 (in 18/03/2050)
  - t: date in year
  - w: weekday in number
  - l: long name of weekday, ex: Sunday
  - D: short name of weekday, ex: Sun
  - G: hour, with no zero: 0 - 24
  - g: hour, with no zero: 0 - 12
  - h: hour, with zero:  00 - 24
  - i: minute:  00 - 59
  - s: second:  00 - 59
  - a: am, pm
  - A: AM, PM
  - O: timezone
```

Example:

```js
import {
  toRelativeTime,
  toDateString,
  LOCAL_DATE_PATTERN,
  UTC_DATE_PATTERN
} from 'bellajs'

const t = 1509628030108

toRelativeTime(t) // => 2 seconds ago
toDateString(t, 'Y/m/d h:i:s') // => 2017/11/02 20:07:10
toDateString(t, LOCAL_DATE_PATTERN) // => Thu, 2 Nov 2017 20:07:10 GMT+0007
toDateString(t, UTC_DATE_PATTERN) // => Thu, 2 Nov 2017 13:07:10 GMT+0000
```

### String manipulation

- .ucfirst(String s)
- .ucwords(String s)
- .escapeHTML(String s)
- .unescapeHTML(String s)
- .slugify(String s)
- .stripTags(String s)
- .stripAccent(String s)
- .truncate(String s, Number limit)
- .replaceAll(String s, String|Array search, String|Array replace)


### Data handling

#### clone

```js
clone(Anything val)
```

Return a copy of val.

```js
const b = [
  1, 5, 0, 'a', -10, '-10', '',
  {
    a: 1,
    b: 'Awesome'
  }
]

const cb = bella.clone(b)
console.log(cb)
```

*cb* now has the same values as *b*, while the properties are standalone, not reference. So that:

```js
cb[7].a = 2
cb[7].b = 'Noop'

console.log(b[7])
```

What you get is still:

```js
{
  a: 1,
  b: 'Awesome'
}
```

#### copies

Copy the properties from *source* to *target*.

```js
copies(Object source, Object target[[, Boolean requireMatching], Array excepts])
```

- *requireMatching*: if true, BellaJS only copies the properties that are already exist in *target*.
- *excepts*: array of the properties properties in *source* that you don't want to copy.


```js
const a = {
  name: 'Toto',
  age: 30,
  level: 8,
  nationality: {
    name: 'America'
  }
}
const b = {
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
}

bella.copies(a, b)
console.log(b)
```

Output:

```js
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

### Array utils

#### pick

Randomly choose N  elements from array.

```js
pick(Array arr [, Integer count = 1])
```

Examples:

```js
import { pick } from 'bellajs'

const arr = [1, 3, 8, 2, 5, 7]
pick(arr, 2) // --> [3, 5]
pick(arr, 2) // --> [8, 1]
pick(arr) // --> [3]
pick(arr) // --> [7]
```


#### sort

```js
sort(Array a [, Function compare])
```

For example:

```js
import { sort } from 'bellajs'

const fn = (a, b) => {
  return a < b ? 1 : a > b ? -1 : 0
}

sort([3, 1, 5, 2], fn) // => [ 1, 2, 3, 5 ]
```

#### sortBy

```js
sortBy(Array a, Number order, String property)
```

For example:

```js

import { sortBy } from 'bellajs'

const players = [
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
]

const result = sortBy(players, -1, 'age')
console.log(result)
```

#### shuffle

Shuffle an array.

```js
shuffle(Array arr)
```

For example:

```js
import { shuffle } from 'bellajs'

shuffle([1, 3, 8, 2, 5, 7])
```

#### unique

```js
unique(Array a)
```

For example:

```js
import { unique } from 'bellajs'

unique([1, 2, 3, 2, 3, 1, 5]) // => [ 1, 2, 3, 5 ]
```

### Functional utils

#### curry

```js
curry(fn)
```

Examples:

```js
import { curry } from 'bellajs'

const sum = curry((a, b, c) => {
  return a + b + c
})

sum(3)(2)(1) // => 6
sum(1)(2)(3) // => 6
sum(1, 2)(3) // => 6
sum(1)(2, 3) // => 6
sum(1, 2, 3) // => 6
```

#### compose

Performs right-to-left function composition.

```js
compose(f1, f2, ...fN)
```

Examples:

```js
import {compose} from 'bellajs'

const f1 = (name) => {
  return `f1 ${name}`
}
const f2 = (name) => {
  return `f2 ${name}`
}
const f3 = (name) => {
  return `f3 ${name}`
}

const addF = compose(f1, f2, f3)

addF('Hello') // => 'f1 f2 f3 Hello'

const add1 = (num) => {
  return num + 1
}

const mult2 = (num) => {
  return num * 2
}

const add1AndMult2 = compose(add1, mult2)
add1AndMult2(3) // => 7
// because multiple to 2 first, then add 1 late => 3 * 2 + 1
```


#### pipe

Performs left-to-right function composition.

```js
pipe(f1, f2, ...fN)
```

Examples:

```js
import { pipe } from 'bellajs'

const f1 = (name) => {
  return `f1 ${name}`
}
const f2 = (name) => {
  return `f2 ${name}`
}
const f3 = (name) => {
  return `f3 ${name}`
}

const addF = pipe(f1, f2, f3)

addF('Hello') // => 'f3 f2 f1 Hello'

const add1 = (num) => {
  return num + 1
}

const mult2 = (num) => {
  return num * 2
}

const add1AndMult2 = pipe(add1, mult2)
add1AndMult2(3) // => 8
// because add 1 first, then multiple to 2 late => (3 + 1) * 2
```

#### maybe

```js
maybe(Anything val)
```

Return a static variant of `Maybe` monad.

Examples:

```js
import { maybe } from 'bellajs'

const plus5 = x => x + 5
const minus2 = x => x - 2
const isNumber = x => Number(x) === x
const toString = x => 'The value is ' + String(x)
const getDefault = () => 'This is default value'

maybe(5)
  .map(plus5)
  .map(minus2)
  .value() // 8

maybe('noop')
  .map(plus5)
  .map(minus2)
  .value() // null

maybe(5)
  .if(isNumber)
  .map(plus5)
  .map(minus2)
  .else(getDefault)
  .map(toString)
  .value() // 'The value is 8'

maybe()
  .if(isNumber)
  .map(plus5)
  .map(minus2)
  .map(toString)
  .value() // null

maybe()
  .if(isNumber)
  .map(plus5)
  .map(minus2)
  .else(getDefault)
  .map(toString)
  .value() // 'This is default value'
```

### Other utils

#### equals

```js
equals(Anything a, Anything b)
```

Examples:

```js
import { equals } from 'bellajs'

equals({}, {}) // => true
equals(0, 1) // => false
```

#### randint

```js
randint([Number min [, Number max]])
```

Examples:

```js
import { randint } from 'bellajs'

randint() // => a random integer
randint(1, 5) // => a random integer between 3 and 5, including 1 and 5
```

#### genid

```js
genid([Number length [, String prefix]])
```

Examples:

```js
import { genid } from 'bellajs'

genid() // => random 32 chars
genid(16) // => random 16 chars
genid(5) // => random 5 chars
genid(5, 'X_') // => X_{random 3 chars}
```

## Test

```bash
git clone https://github.com/ndaidong/bellajs.git
cd bellajs
npm install
npm test
```

# License

The MIT License (MIT)
