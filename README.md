BellaJS
========

Lightweight util for handling data type, data entries, datetime and schedule in your Node.js and browser apps.

[![NPM](https://badge.fury.io/js/bellajs.svg)](https://badge.fury.io/js/bellajs) ![Travis](https://travis-ci.org/ndaidong/bellajs.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/bellajs/badge.svg?branch=master&noop)](https://coveralls.io/github/ndaidong/bellajs?branch=master)
![devDependency Status](https://david-dm.org/ndaidong/bellajs.svg)
[![Known Vulnerabilities](https://snyk.io/test/npm/bellajs/badgesvg)](https://snyk.io/test/npm/bellajs)


# Contents

* [What's new](#changes)
* [Setup](#setup)
* [APIs](#apis)
  * [DataType detection](#datatype-detection)
  * [String manipulation](#string-manipulation)
  * [Template manipulation](#template-manipulation)
  * [Array & Object](#array--object)
  * [DateTime](#datetime)
  * [Scheduler](#scheduler)
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
 - .debounce(Function fn, Number delay, Boolean immediate)
 - .throttle(Function fn, Boolean wait)

How to use Bella.sort?

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

### Scheduler
 - .scheduler.every(String pattern, Function callback)
 - .scheduler.once(String pattern, Function callback)
 - .scheduler.hourly(String pattern, Function callback)
 - .scheduler.daily(String pattern, Function callback)
 - .scheduler.monthly(String pattern, Function callback)
 - .scheduler.yearly(String pattern, Function callback)


Scheduler is the best utility BellaJS provides. Almost cases you can use Bella.scheduler instead of setInterval or setTimeout, because it runs only one timer for the entire process. Regarding parameter "pattern" for Bella.scheduler.every, it may be:

**1, A string in the format of 'Y m d h i s'.**

For example:

    - Bella.scheduler.every('2040 05 16 15 30 10', callback);
       --> run callback at 15:30:10 on May 16, 2040
    - Bella.scheduler.every('* 05 16 15 30 10', callback);
       --> run callback at 15:30:10 on May 16 of years
       --> similar to yearly('05 16 15 30 10', callback)
    - Bella.scheduler.every('* * 16 15 30 10', callback);
       --> run callback at 15:30:10 on the 16th of months
       --> similar to monthly('16 15 30 10', callback)
    - Bella.scheduler.every('* * * 15 30 10', callback);
       --> run callback at 15:30:10 of days
       --> similar to daily('15 30 10', callback)
    - Bella.scheduler.every('* * * * 30 10', callback);
       --> run callback at the 10th second of the 30th minute of hours
       --> similar to hourly('30 10', callback)
    - Bella.scheduler.every('* * * * * 10', callback);
       --> run callback at the 10th second of minutes.

**2, A string in the format of 'weekday H:i:s'.**

For example:

    - Bella.scheduler.every('sunday 15:30:10', callback);
       --> run callback on Sundays at 15:30:10
    - Bella.scheduler.every('sunday 15:30', callback);
       --> run callback on Sundays at 15:30:00
    - Bella.scheduler.every('sunday 15', callback);
       --> run callback on Sundays at 15:00:00

It's possible to use "sun" instead of "sunday", "mon" for "monday", and so on.

**3, A string in the format of 'N unit'.**

For example:

    - Bella.scheduler.every('5m', callback)
       --> call callback every 5 minutes
    - Bella.scheduler.once('5m', callback)
       --> call callback in 5 minutes, then stop

The available units: **d** (days), **h** (hours), **m** (minutes), **s** (seconds).

Bella.scheduler.once do the same thing as Bella.scheduler.every, but just once. The 4 remain methods yearly(), monthly(), daily(), hourly() can be looked as the shortcuts of every().


# Test

```
git clone https://github.com/ndaidong/bella.js.git
cd bella.js
npm install
npm test
```

# License

The MIT License (MIT)
