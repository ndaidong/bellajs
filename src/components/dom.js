/**
 * bellajs
 * @ndaidong
**/

(function init(context) {


  // for browser only
  var _getElement, _addElement, _createElement, _query, _queryAll;

  if (Bella.ENV === 'browser') {

    _getElement = function __getElement(el) {
      var p = (isString(el) ? document.getElementById(el) : el) || null;
      if (p && isElement(p)) {
        p.hasClass = function hasClass(c) {
          var r = true, e = p.className.split(' '); c = c.split(' ');
          for (var i = 0; i < c.length; i++) {
            if (e.indexOf(c[i]) === -1) {
              r = false;
              break;
            }
          }
          return r;
        };
        p.addClass = function addClass(c) {
          c = c.split(' ');
          var t = p.className.split(' ');
          var nc = c.concat(t);
          var sc = Bella.unique(nc);
          p.className = sc.join(' ');
          return p;
        };
        p.removeClass = function removeClass(c) {
          var e = p.className.split(' '); c = c.split(' ');
          for (var i = 0; i < c.length; i++) {
            if (p.hasClass(c[i])) {
              e.splice(e.indexOf(c[i]), 1);
            }
          }
          p.className = e.join(' ');
          return p;
        };
        p.toggleClass = function toggleClass(c) {
          if (p.hasClass(c)) {
            p.removeClass(c);
          } else {
            p.addClass(c);
          }
          return p;
        };
        p.empty = function empty() {
          p.innerHTML = '';
          return p;
        };
        p.html = function html(s) {
          if (s !== '' && isEmpty(s)) {
            return p.innerHTML;
          }
          p.innerHTML = s;
          return p;
        };
        p.destroy = function destroy() {
          if (p.parentNode) {
            p.parentNode.removeChild(p);
          }
        };
      }
      return p;
    };

    _addElement = function __addElement(tag, parent) {
      var p = parent ? _getElement(parent) : document.body;
      var d = isElement(tag) ? tag : document.createElement(tag);
      p.appendChild(d);
      return _getElement(d);
    };

    _createElement = function __createElement(tag) {
      return _getElement(document.createElement(tag));
    };

    _query = function __query(condition) {
      var el, tmp = document.querySelector(condition);
      if (tmp) {
        el = _getElement(tmp);
      }
      return el;
    };

    _queryAll = function __queryAll(condition) {
      var els = [], tmp = document.querySelectorAll(condition);
      if (tmp) {
        for (var i = 0; i < tmp.length; i++) {
          els.push(_getElement(tmp[i]));
        }
      }
      return els;
    };

    /*eslint-disable*/
    /*!
      * domready (c) Dustin Diaz 2014 - License MIT
      */
    var onready = (function() {

      var fns = [], listener, doc = document,
        hack = doc.documentElement.doScroll,
        domContentLoaded = 'DOMContentLoaded',
        loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

      if (!loaded) {
        doc.addEventListener(domContentLoaded, listener = function() {
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while(listener = fns.shift()) {
          listener();
        }
        });
      }

      return function (fn) {
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

    Bella.hostname = (function _hostname() {
      var atag = _createElement('A');
      atag.href = document.URL;
      var loc = atag.hostname;
      atag.destroy();
      return loc;
    })();

    var isGecko = (function _isGecko(ua) {
      var n = ua.toLowerCase();
      return /gecko/i.test(n);
    })(navigator.userAgent);

    Bella.event = (function _event() {

      return {
        on: function on(element, event, callback) {
          if (event === 'wheel') {
            event = isGecko ? 'DOMMouseScroll' : 'mousewheel';
          }
          var el = isString(element) ? _getElement(element) : element;
          var cb = callback || function _callback() {};

          if (el.addEventListener) {
            el.addEventListener(event, cb, false);
          } else if (el.attachEvent) {
            el.attachEvent('on' + event, cb);
          }
        },
        off: function off(element, event, callback) {
          var el = isString(element) ? _getElement(element) : element;
          if (el.removeEventListener) {
            el.removeEventListener(event, callback, false);
          } else if (el.detachEvent) {
            el.detachEvent('on' + event, callback);
          }
        },
        simulate: function simulate(element, event) {
          var evt, el = isString(element) ? _getElement(element) : element;
          if (document.createEventObject) {
            evt = document.createEventObject();
            el.fireEvent('on' + event, evt);
          } else {
            evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            el.dispatchEvent(evt);
          }
        },
        stop: function stop(e) {
          e.cancelBubble = true;
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          if (e.preventDefault) {
            e.preventDefault();
          }
          return false;
        },
        detect: function detect(e) {
          var evt = e || window.event;
          var targ = evt.target || evt.srcElement;
          if (targ && targ.nodeType === 3) {
            targ = targ.parentNode;
          }
          return _getElement(targ);
        }
      };
    })();

    Bella.getMousePosition = function getMousePosition(ev) {
      var e = ev || window.event;
      var cursor = {
        x: 0,
        y: 0
      };
      if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
      } else {
        var de = document.documentElement;
        var db = document.body;
        cursor.x = e.clientX + (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY + (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
      }
      return cursor;
    };

    Bella.getWindowSize = function getWindowSize() {
      var w = 0, h = 0;
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

    var cookie = {
      set: function set(name, value, expires, domain, path) {
        var cdata = false;

        var parse = function parse(ob) {

          var tmp = [];
          var _name = ob.name || '';
          var _val = ob.value;
          var _exp = ob.expires || false;
          var _pat = ob.path || '/';
          var _dom = ob.domain || false;

          if (_name) {
            var iss = !isObject(_val) && !isArray(_val);
            var vx = iss ? _val : JSON.stringify(_val);
            var arr = [
              [ _name, isString(vx) ? encodeURIComponent(vx) : vx ],
              [ 'path', _pat ]
            ];
            if (_dom) {
              arr.push([ 'domain', _dom ]);
            }

            if (_exp && _exp.length && _exp.match(/(w|d|h|m|s)/gi)) {
              var v = parseInt(_exp, 10);
              var s = _exp.replace(v, '');
              var delta = 0;
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
              var ms = delta * v * 1000;
              if (Bella.isInteger(ms)) {
                var d = new Date();
                var t = d.getTime() + ms;
                d.setTime(t);
                arr.push([ 'expires', d.toUTCString() ]);
              }
            }
            arr.forEach(function join(item) {
              tmp.push(item.join('='));
            });
          }
          return tmp.join('; ');
        };

        if (arguments.length === 1 && Bella.isObject(name)) {
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
      },
      get: function get(name) {
        if (document.cookie) {
          var a = document.cookie.split(';');
          var n = Bella.trim(name);
          for (var i = 0; i < a.length; i++) {
            var t = a[i], ac = t.split('='), x = Bella.trim(ac[0]);
            if (x === n) {
              return decodeURIComponent(ac[1]);
            }
          }
        }
        return null;
      },
      unset: function unset(name) {
        cookie.set(name, '', '-1d');
      }
    };
    Bella.cookie = cookie;
  }


})();
