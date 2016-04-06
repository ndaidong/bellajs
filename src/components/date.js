/**
 * bellajs > date
**/

/* global leftPad */

var now = () => {
  return new Date();
};

var time = () => {
  return (new Date()).getTime();
};

(() => {
  var pattern = 'D, M d, Y  h:i:s A';
  var weeks = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  var tz = (() => {
    let t = (new Date()).getTimezoneOffset();
    let z = Math.abs(t / 60);
    let sign = t < 0 ? '+' : '-';
    return [ 'GMT', sign, leftPad(z, 2) ].join('');
  })();

  var format = (output, input) => {
    let meridiem = false, d, f, vchar = /\.*\\?([a-z])/gi;
    if (!input) {
      input = time();
    } else {
      input = (new Date(input)).getTime();
    }
    if (!output) {
      output = pattern;
    }

    if (output.match(/(\.*)a{1}(\.*)*/i)) {
      meridiem = true;
    }

    var wn = weeks;
    var mn = months;
    var _num = (n) => {
      return String(n < 10 ? '0' + n : n);
    };
    var _ord = (day) => {
      let s = day + ' ', x = s.charAt(s.length - 2);
      if (x === '1') {
        s += 'st';
      } else if (x === '2') {
        s += 'nd';
      } else if (x === '3') {
        s += 'rd';
      } else {
        s += 'th';
      }
      return s;
    };

    var _term = (t, s) => {
      return f[t] ? f[t]() : s;
    };

    d = input instanceof Date ? input : new Date(input);

    if (isNaN(d.getTime())) {
      let reg = /^(\d+-\d+-\d+)\s(\d+:\d+:\d+)$/i;
      if (reg.test(input)) {
        d = new Date(input.replace(' ', 'T'));
      } else {
        return input + ' !';
      }
    }

    /*eslint-disable */
    f = {
      Y: function() {return d.getFullYear()},     // 2015
      y: function() {return (f.Y()+'').slice(-2)},  // 15
      F: function() {return mn[f.n()-1]},       // August
      M: function() {return (f.F()+'').slice(0,3)}, // Aug
      m: function() {return _num(f.n())},       // 08
      n: function() {return d.getMonth()+1},    // 8
      S: function() {return _ord(f.j())},       // 1st, 2nd, 3rd, 4th
      j: function() {return d.getDate()},       // 3
      d: function() {return _num(f.j())},       // 03
      t: function() {return (new Date(f.Y(), f.n(), 0)).getDate()}, // date in year
      w: function() {return d.getDay()},      // weekday in number
      l: function() {return wn[f.w()]},       // Sunday, Monday
      D: function() {return (f.l()+'').slice(0,3)},// Sun, Mon
      G: function() {return d.getHours()},      // 0 - 24
      g: function() {return (f.G()%12||12)},    // 0 - 12
      h: function() {return _num(meridiem?f.g():f.G())}, // 00 - 12 or 00 - 24
      i: function() {return _num(d.getMinutes())},  // 00 - 59
      s: function() {return _num(d.getSeconds())},  // 00 - 59
      a: function() {return f.G()>11?'pm':'am'},  // am, pm
      A: function() {return (f.a()).toUpperCase()},  // AM, PM
      O: function() {return tz}
    }
    /*eslint-enable */
    return output.replace(vchar, _term);
  };

  var relativize = (input) => {
    let t = input instanceof Date ? input : new Date(input);
    let delta = new Date() - t;
    let nowThreshold = parseInt(t, 10);
    if (isNaN(nowThreshold)) {
      nowThreshold = 0;
    }
    if (delta <= nowThreshold) {
      return 'Just now';
    }
    let units = null;
    let conversions = {
      millisecond: 1,
      second: 1000,
      minute: 60,
      hour: 60,
      day: 24,
      month: 30,
      year: 12
    };
    for (let key in conversions) {
      if (delta < conversions[key]) {
        break;
      } else {
        units = key;
        delta = delta / conversions[key];
      }
    }
    delta = Math.floor(delta);
    if (delta !== 1) {
      units += 's';
    }
    return [ delta, units ].join(' ') + ' ago';
  };

  var utc = (t) => {
    return (new Date(t || now())).toUTCString();
  };

  var local = (t) => {
    return format('D, j M Y h:i:s O', t);
  };

  var strtotime = (t) => {
    return (new Date(t)).getTime();
  };

  Bella.date = {
    utc: utc,
    local: local,
    strtotime: strtotime,
    format: format,
    relativize: relativize
  };
})();

Bella.now = now;
Bella.time = time;
