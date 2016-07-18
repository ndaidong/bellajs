BellaJS
========

Lightweight util for handling data type, string, data entries, datetime in your Node.js and browser apps.

[![NPM](https://badge.fury.io/js/bellajs.svg)](https://badge.fury.io/js/bellajs) ![Travis](https://travis-ci.org/ndaidong/bellajs.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/bellajs/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/bellajs?branch=master)
![devDependency Status](https://david-dm.org/ndaidong/bellajs.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/bellajs/badge.svg)](https://snyk.io/test/npm/bellajs)


# Contents

* [What's new](#changes)
* [Setup](#setup)
* [APIs](#apis)
  * [DataType detection](#datatype-detection)
  * [Array & Object](#array--object)
  * [String manipulation](#string-manipulation)
  * [Template compiler](#template-compiler)
  * [DateTime](#datetime)
* [Test](#test)


## Setup

- Node.js

  ```
  npm install bellajs --save
  ```

- CDN

  [bella.min.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.js)

  ```
  <script type="text/javascript" src="https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.js"></script>
  ```

- This library also supports ES6 Module, AMD and UMD style.


# APIs

### DataType detection
 - .isArray(Anything val)
 - .isBoolean(Anything val)
 - .isDate(Anything val)
 - .isDef(Anything val)
 - .isElement(Anything val)
 - .isEmail(Anything val)
 - .isEmpty(Anything val)
 - .isFunction(Anything val)
 - .isGeneratedKey(Anything val)
 - .isInteger(Anything val)
 - .isLetter(Anything val)
 - .isNull(Anything val)
 - .isNumber(Anything val)
 - .isObject(Anything val)
 - .isString(Anything val)



 ### Array & Object
  - .clone(Array|Object|Date o)
  - .contains(Array a, String|Object search [, String key])
  - .copies(Array|Object src, Array|Object dest [, Boolean mustMatch[, Array exclude] ])
  - .empty(Array|Object|Element|String o)
  - .equals(Anything a, Anything b)
  - .hasProperty(Array|Object o, String key)
  - .max(Array a)
  - .min(Array a)
  - .pick(Array a [, Number count])
  - .random([Number min [, Number max]])
  - .sort(Array a [, String order | Object option ])
  - .shuffle(Array a)
  - .unique(Array a)
  - .first(Array a)
  - .last(Array a)
  - .getIndex(String|Object element, Array a)
  - .getLastIndex(String|Object element, Array a)

  *How to use Bella.sort?*

  ```
  var a = [1, 5, 19, 6, 4, 11, 7, 22, 40, 3, 8];
  console.log('Array a, default:');
  console.log(a);

  console.log('Array a, from lower to higher:');
  var a1 = Bella.sort(a);
  console.log(a1);
  console.log('Array a, descendant:');
  var a2 = Bella.sort(a, -1);
  console.log(a2);

  var players = [
      {
        'name': 'Jerome Nash',
        'age': 24
      },
      {
        'name': 'Jackson Valdez',
        'age': 21
      },
      {
        'name': 'Benjamin Cole',
        'age': 23
      },
      {
        'name': 'Manuel Delgado',
        'age': 33
      },
      {
        'name': 'Caleb McKinney',
        'age': 28
      }
  ];

  console.log('\nList of players as it is:');
  players.forEach(function(item){
      console.log([item.name, item.age].join(' | '));
  });

  console.log('\nSort by age from young to old:');
  var players1 = Bella.sort(players, 'age');
  players1.forEach(function(item){
      console.log([item.name, item.age].join(' | '));
  });

  console.log('\nAnd then reverse them:');
  var players2 = Bella.sort(players, {age: -1});
  players2.forEach(function(item){
      console.log([item.name, item.age].join(' | '));
  });

  ```


### String manipulation
 - .createId(Number length [, String prefix])
 - .createAlias(String s)
 - .encode(String s)
 - .decode(String s)
 - .trim(String s)
 - .strtolower(String s)
 - .strtoupper(String s)
 - .ucfirst(String s)
 - .ucwords(String s)
 - .escapeHTML(String s)
 - .unescapeHTML(String s)
 - .stripTags(String s)
 - .stripAccent(String s)
 - .truncate(String s, Number limit)
 - .leftPad(String s, Number limit, String pad)
 - .rightPad(String s, Number limit, String pad)
 - .repeat(String s, Number times)
 - .warn(String message)
 - .replaceAll(String s, String|Array search, String|Array replace)
 - .md5(String s)


### Template compiler
 - .compile(String s, Object d)

What does Bella.compile do?

This is a simple template engine that allows to quickly assign the values from object "d" to the template string "s".

Here is an example:

```
var template = [
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

var html = Bella.compile(template, data);
console.log(html);
```

### DateTime
 - .date.format(String pattern, Date|Number|String input)
 - .date.relativize(Date|Number|String input)
 - .date.local(Date|Number|String input)
 - .date.utc(Date|Number|String input)
 - .date.strtotime(String input)

Default pattern is 'D, M d, Y  H:i:s A'. Without any parameter, Bella.date.format() return a string related to current time, in the format of default pattern.

BellaJS' datetime pattern is familiar with PHP developers than MomentJS. The available characters in the pattern are:

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

Examples:

```
// default datetime (local)
var t = Bella.now();
console.log(t);

// format it as 2015/09/25 09:44:51
var f = Bella.date.format('Y/m/d h:i:s', t);
console.log(f);

// this is a time in future

var atime = 80616962585961;
console.log(atime);

// display it as your local time
var local = Bella.date.local(atime);
console.log(local);

// display it as GMT time
var utc = Bella.date.utc(atime);
console.log(utc);

// display it with default pattern
var s = Bella.date.format(false, atime);
console.log(s);
```

# Test

```
git clone https://github.com/ndaidong/bellajs.git
cd bellajs
npm install
npm test
```

# License

The MIT License (MIT)
