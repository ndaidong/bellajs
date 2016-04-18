bella.js
========

BellaJS is a lightweight library with several helpful utils. It supports both Node.js and browser environments.

[![NPM](https://badge.fury.io/js/bellajs.svg)](https://badge.fury.io/js/bellajs) ![Travis](https://travis-ci.org/ndaidong/bella.js.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/bella.js/badge.svg?branch=master&noop)](https://coveralls.io/github/ndaidong/bella.js?branch=master)
![devDependency Status](https://david-dm.org/ndaidong/bella.js.svg)

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


# Changes

#### v5.0.1 - Apr 18, 2016
- Refactor scheduler's features
- Rewrite in ES6 syntax
- Remove browser side features
- Remove 3 methods "trace", "enableTrace" and "disableTrace"
- Add 6 methods "first", "last", "getIndex", "getLastIndex", "debounce" and "throttle"
- Build with Google Closure compiler
- Switch to Tape, Sinon instead of Mocha/Chai

#### v4.1.5 - Mar 18, 2016
- Implement nyc/istanbul to check test coverage
- Remove mocha.opts, move configs to package.json
- Use local mocha only. No longer require global mocha
- Update travis config

#### v4.1.4 - Feb 18, 2016
- Resolve issue with eslint 2.0.0 and node.js v5.6.0

#### v4.1.2 - Dec 24, 2015
- Update coding convension
- Remove .date.pattern

#### v4.0.12 - Nov 11, 2015
- Unsupports old node.js (< 4.0.0)
- Change test script to use Mocha instead of Jasmine

#### v3.7.6 - Sep 27, 2015
- Added 3 new methods: "random", "pick" and "shuffle"

#### v3.7.2 - Sep 24, 2015
- Removed "sha256" method
- Update pattern in Bella.scheduler

#### v3.7.1 - Sep 23, 2015
- Added 3 new methods "trace", "enableTrace" and "disableTrace"
- Removed "detectDevice" method. Recommend to use [DeviceDetector](https://www.npmjs.com/package/device-detector) instead.
- Removed "device" property

#### v3.6.8 - Sep 17, 2015
- Removed 'H' from date format pattern. Now it will automatically detect if the pattern contains 'a' or 'A'. If so, it will display as meridiem style. Otherwise, it would display 00-24 hour. See [DateTime](#datetime) pattern for more info.

#### v3.6.6 - Sep 13, 2015
- Added "isDate" method

#### v3.6.5 - Sep 10, 2015
- Added "equals" method

#### Aug 21, 2015
- Added "compile" as an alias for "make" method



# Setup

### In Node.js:

```
npm install bellajs
```

And then:

```
    var Bella = require('bellajs');
    console.log(Bella.date.utc());
```

### In the browsers


Assuming there is a file bella.min.js located at "/public/js/lib/", the following ways can be used to include BellaJS:

##### Using SystemJS

```
    System.config({
        baseURL: '/public/js/lib',
        map: {
            bella: 'bella.min'
        }
    });

    System.import('bella').then(function(Bella){
        console.log(Bella.date.utc());
    });

```

##### Using RequireJS

```
    require.config({
        baseUrl: '/public/js/lib',
        paths: {
            bella: 'bella.min'
        }
    });

    requirejs('bella', function(Bella){
        console.log(Bella.date.utc());
    });

```


##### CDN

```
<script type="text/javascript" src="https://cdn.rawgit.com/ndaidong/bella.js/master/dist/bella.min.js"></script>
```


# APIs

### DataType detection
 - Bella.isArray(Anything val)
 - Bella.isBoolean(Anything val)
 - Bella.isDate(Anything val)
 - Bella.isDef(Anything val)
 - Bella.isElement(Anything val)
 - Bella.isEmail(Anything val)
 - Bella.isEmpty(Anything val)
 - Bella.isFunction(Anything val)
 - Bella.isGeneratedKey(Anything val)
 - Bella.isInteger(Anything val)
 - Bella.isLetter(Anything val)
 - Bella.isNull(Anything val)
 - Bella.isNumber(Anything val)
 - Bella.isObject(Anything val)
 - Bella.isString(Anything val)

### String manipulation
 - Bella.createId(Number length [, String prefix])
 - Bella.createAlias(String s)
 - Bella.encode(String s)
 - Bella.decode(String s)
 - Bella.trim(String s)
 - Bella.strtolower(String s)
 - Bella.strtoupper(String s)
 - Bella.ucfirst(String s)
 - Bella.ucwords(String s)
 - Bella.escapeHTML(String s)
 - Bella.unescapeHTML(String s)
 - Bella.stripTags(String s)
 - Bella.stripAccent(String s)
 - Bella.truncate(String s, Number limit)
 - Bella.leftPad(String s, Number limit, String pad)
 - Bella.rightPad(String s, Number limit, String pad)
 - Bella.replaceAll(String s, String|Array search, String|Array replace)
 - Bella.md5(String s)


### Template manipulation
 - Bella.compile(String s, Object d)

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
 - Bella.clone(Array|Object|Date o)
 - Bella.contains(Array a, String|Object search [, String key])
 - Bella.copies(Array|Object src, Array|Object dest [, Boolean mustMatch[, Array exclude] ])
 - Bella.empty(Array|Object|Element|String o)
 - Bella.equals(Anything a, Anything b)
 - Bella.hasProperty(Array|Object o, String key)
 - Bella.inherits(Proto o)
 - Bella.max(Array a)
 - Bella.min(Array a)
 - Bella.pick(Array a [, Number count])
 - Bella.random([Number min [, Number max]])
 - Bella.sort(Array a [, String order | Object option ])
 - Bella.shuffle(Array a)
 - Bella.unique(Array a)
 - Bella.first(Array a)
 - Bella.last(Array a)
 - Bella.getIndex(String|Object element, Array a)
 - Bella.getLastIndex(String|Object element, Array a)
 - Bella.debounce(Function fn, Number delay, Boolean immediate)
 - Bella.throttle(Function fn, Boolean wait)

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
 - Bella.date.format(String pattern, Date|Number|String input)
 - Bella.date.relativize(Date|Number|String input)
 - Bella.date.local(Date|Number|String input)
 - Bella.date.utc(Date|Number|String input)
 - Bella.date.strtotime(String input)

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
 - Bella.scheduler.every(String pattern, Function callback)
 - Bella.scheduler.once(String pattern, Function callback)
 - Bella.scheduler.hourly(String pattern, Function callback)
 - Bella.scheduler.daily(String pattern, Function callback)
 - Bella.scheduler.monthly(String pattern, Function callback)
 - Bella.scheduler.yearly(String pattern, Function callback)


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

// test
npm run build
npm test
```




# License

The MIT License (MIT)
