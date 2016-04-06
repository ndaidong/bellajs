/**
 * bellajs > schedule
**/

/* global Bella time trim date */

// schedule
(() => {

  var TaskList = [];
  var pattern = 'Y m d h i s';
  var checkTimer;

  var compare = (task, sysTime, sysDay, currTime) => {

    let taskTime = task.time, beginAt = Math.round(task.at / 1000);

    if (taskTime.match(/^(sun|mon|tue|wed|thu|fri|sat)+(\w+)?(\s+)+(\d+(:\d)?)+$/gi)) {
      let a = taskTime.split(' ');
      let yes = false;
      if (a.length > 1) {

        let day = trim(a[0]), time = trim(a[1]);

        if (sysDay.match(new RegExp(day, 'gi'))) {

          let a2 = time.split(':');
          if (a2.length === 1) {
            a2 = a2.concat([ '00', '00' ]);
          }
          if (a2.length === 2) {
            a2 = a2.concat([ '00' ]);
          }

          let a3 = sysTime.split(' ').slice(3, 6);

          yes = true;
          for (let i = 0; i < a3.length; i++) {
            if (parseInt(a3[i], 10) !== parseInt(a2[i], 10)) {
              yes = false;
              break;
            }
          }
        }
      }
      return yes;
    } else if (taskTime.match(/(d|h|m|s)/gi)) {

      let v = parseInt(taskTime, 10);
      let s = taskTime.replace(v, '');

      let delta = 0;

      if (s === 's') {
        delta = 1;
      } else if (s === 'm') {
        delta = 60;
      } else if (s === 'h') {
        delta = 60 * 60;
      } else if (s === 'd') {
        delta = 60 * 60 * 24;
      }

      delta *= v;
      let sdur = currTime - beginAt;
      return delta > 0 && sdur % delta === 0;
    }

    let a1 = taskTime.split(' '), a21 = sysTime.split(' '), s1 = '', s2 = '';

    for (let j = 0; j < a1.length; j++) {
      if (a1[j] === '*') {
        a21[j] = '*';
      }
      s1 += a1[j];
      s2 += a21[j];
    }
    return s1 === s2;
  };

  var check = () => {

    let gt = time(), ggt = Math.round(gt / 1000);
    let sysTime = date.format(pattern, gt);
    var sysDay = date.format('l', gt);

    if (TaskList.length > 0) {
      for (let i = TaskList.length - 1; i >= 0; i--) {
        let t = TaskList[i];
        if (compare(t, sysTime, sysDay, ggt)) {
          t.fn();
          if (!t.repeat) {
            TaskList.splice(i, 1);
          }
        }
      }
    } else {
      clearInterval(checkTimer);
      checkTimer = null;
    }
  };

  var register = (t, fn, single) => {
    let ot = single || false;
    TaskList.push({
      fn: fn,
      time: t,
      at: time(),
      repeat: !ot
    });

    if (!checkTimer) {
      checkTimer = setInterval(check, 1000);
    }
  };

  var yearly = (t, fn) => {
    let pt = '* ' + t;
    register(pt, fn);
  };

  var monthly = (t, fn) => {
    let pt = '* * ' + t;
    register(pt, fn);
  };

  var daily = (t, fn) => {
    let pt = '* * * ' + t;
    register(pt, fn);
  };

  var hourly = (t, fn) => {
    let pt = '* * * * ' + t;
    register(pt, fn);
  };

  var every = (t, fn) => {
    register(t, fn);
  };

  var once = (t, fn) => {
    register(t, fn, true);
  };

  Bella.scheduler = {
    yearly: yearly,
    monthly: monthly,
    daily: daily,
    hourly: hourly,
    every: every,
    once: once
  };
})();
