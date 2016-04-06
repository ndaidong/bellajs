/**
 * bellajs > dom
**/

/* global Bella ENV trim isObject isString isElement isEmpty isArray isInteger unique */

(() => {

  // for browser only
  if (ENV !== 'browser') {
    return false;
  }

  var _getElement, _addElement, _createElement, _query, _queryAll;

  _getElement = (el) => {
    let p = (isString(el) ? document.getElementById(el) : el) || null;
    if (p && isElement(p)) {
      p.hasClass = (c) => {
        let r = true, e = p.className.split(' '); c = c.split(' ');
        for (let i = 0; i < c.length; i++) {
          if (e.indexOf(c[i]) === -1) {
            r = false;
            break;
          }
        }
        return r;
      };
      p.addClass = (c) => {
        c = c.split(' ');
        let t = p.className.split(' ');
        let nc = c.concat(t);
        let sc = unique(nc);
        p.className = sc.join(' ');
        return p;
      };
      p.removeClass = (c) => {
        let e = p.className.split(' '); c = c.split(' ');
        for (let i = 0; i < c.length; i++) {
          if (p.hasClass(c[i])) {
            e.splice(e.indexOf(c[i]), 1);
          }
        }
        p.className = e.join(' ');
        return p;
      };
      p.toggleClass = (c) => {
        if (p.hasClass(c)) {
          p.removeClass(c);
        } else {
          p.addClass(c);
        }
        return p;
      };
      p.empty = () => {
        p.innerHTML = '';
        return p;
      };
      p.html = (s) => {
        if (s !== '' && isEmpty(s)) {
          return p.innerHTML;
        }
        p.innerHTML = s;
        return p;
      };
      p.destroy = () => {
        if (p.parentNode) {
          p.parentNode.removeChild(p);
        }
      };
    }
    return p;
  };

  _addElement = (tag, parent) => {
    let p = parent ? _getElement(parent) : document.body;
    let d = isElement(tag) ? tag : document.createElement(tag);
    p.appendChild(d);
    return _getElement(d);
  };

  _createElement = (tag) => {
    return _getElement(document.createElement(tag));
  };

  _query = (condition) => {
    let el, tmp = document.querySelector(condition);
    if (tmp) {
      el = _getElement(tmp);
    }
    return el;
  };

  _queryAll = (condition) => {
    let els = [], tmp = document.querySelectorAll(condition);
    if (tmp) {
      for (let i = 0; i < tmp.length; i++) {
        els.push(_getElement(tmp[i]));
      }
    }
    return els;
  };

  /*eslint-disable*/
  /** domready (c) Dustin Diaz 2014 - License MIT */
  var onready = (() => {
    let fns = [], listener, doc = document,
      hack = doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
    if (!loaded) {
      doc.addEventListener(domContentLoaded, listener = () => {
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while(listener = fns.shift()) {
          listener();
        }
      });
    }
    return (fn) => {
      loaded ? setTimeout(fn, 0) : fns.push(fn)
    }
  })();

  /*eslint-enable*/

  Bella.dom = {
    ready: onready,
    one: _query,
    all: _queryAll,
    get: _getElement,
    add: _addElement,
    create: _createElement
  };

  Bella.hostname = (() => {
    var atag = _createElement('A');
    atag.href = document.URL;
    var loc = atag.hostname;
    atag.destroy();
    return loc;
  })();

  var isGecko = ((ua) => {
    var n = ua.toLowerCase();
    return /gecko/i.test(n);
  })(navigator.userAgent);

  Bella.event = (() => {

    return {
      on: (element, event, callback) => {
        if (event === 'wheel') {
          event = isGecko ? 'DOMMouseScroll' : 'mousewheel';
        }
        let el = isString(element) ? _getElement(element) : element;
        let fn = () => {};
        let cb = callback || fn;

        if (el.addEventListener) {
          el.addEventListener(event, cb, false);
        } else if (el.attachEvent) {
          el.attachEvent('on' + event, cb);
        }
      },
      off: (element, event, callback) => {
        let el = isString(element) ? _getElement(element) : element;
        if (el.removeEventListener) {
          el.removeEventListener(event, callback, false);
        } else if (el.detachEvent) {
          el.detachEvent('on' + event, callback);
        }
      },
      simulate: (element, event) => {
        let evt, el = isString(element) ? _getElement(element) : element;
        if (document.createEventObject) {
          evt = document.createEventObject();
          el.fireEvent('on' + event, evt);
        } else {
          evt = document.createEvent('HTMLEvents');
          evt.initEvent(event, true, true);
          el.dispatchEvent(evt);
        }
      },
      stop: (e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      },
      detect: (e) => {
        let evt = e || window.event;
        let targ = evt.target || evt.srcElement;
        if (targ && targ.nodeType === 3) {
          targ = targ.parentNode;
        }
        return _getElement(targ);
      }
    };
  })();

  Bella.getMousePosition = (ev) => {
    let e = ev || window.event;
    let cursor = {
      x: 0,
      y: 0
    };
    if (e.pageX || e.pageY) {
      cursor.x = e.pageX;
      cursor.y = e.pageY;
    } else {
      let de = document.documentElement;
      let db = document.body;
      cursor.x = e.clientX + (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
      cursor.y = e.clientY + (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
  };

  Bella.getWindowSize = () => {
    let w = 0, h = 0;
    if (window.innerWidth) {
      w = window.innerWidth;
      h = window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientWidth) {
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    } else if (document.body) {
      w = document.body.clientWidth;
      h = document.body.clientHeight;
    }
    return {
      width: w,
      height: h
    };
  };

  var set = (name, value, expires, domain, path) => {
    let cdata = false;

    let parse = (ob) => {

      let tmp = [];
      let _name = ob.name || '';
      let _val = ob.value;
      let _exp = ob.expires || false;
      let _pat = ob.path || '/';
      let _dom = ob.domain || false;

      if (_name) {
        let iss = !isObject(_val) && !isArray(_val);
        let vx = iss ? _val : JSON.stringify(_val);
        let arr = [
          [ _name, isString(vx) ? encodeURIComponent(vx) : vx ],
          [ 'path', _pat ]
        ];
        if (_dom) {
          arr.push([ 'domain', _dom ]);
        }

        if (_exp && _exp.length && _exp.match(/(w|d|h|m|s)/gi)) {
          let v = parseInt(_exp, 10);
          let s = _exp.replace(v, '');
          let delta = 0;
          if (s === 's') {
            delta = 1;
          } else if (s === 'm') {
            delta = 60;
          } else if (s === 'h') {
            delta = 60 * 60;
          } else if (s === 'd') {
            delta = 60 * 60 * 24;
          } else if (s === 'w') {
            delta = 7 * 60 * 60 * 24;
          }
          let ms = delta * v * 1000;
          if (isInteger(ms)) {
            let d = new Date();
            let t = d.getTime() + ms;
            d.setTime(t);
            arr.push([ 'expires', d.toUTCString() ]);
          }
        }
        arr.forEach((item) => {
          tmp.push(item.join('='));
        });
      }
      return tmp.join('; ');
    };

    if (isObject(name)) {
      cdata = parse(name);
    } else {
      cdata = parse({
        name: name,
        value: value,
        path: path || false,
        expires: expires || false,
        domain: domain || false
      });
    }
    if (cdata) {
      document.cookie = cdata;
    }
  };

  var get = (name) => {
    if (document.cookie) {
      let a = document.cookie.split(';');
      let n = trim(name);
      for (let i = 0; i < a.length; i++) {
        let t = a[i], ac = t.split('='), x = trim(ac[0]);
        if (x === n) {
          return decodeURIComponent(ac[1]);
        }
      }
    }
    return null;
  };
  var unset = (name) => {
    set(name, '', '-1d');
  };
  Bella.cookie = {
    set: set,
    get: get,
    unset: unset
  };
  return null;
})();
