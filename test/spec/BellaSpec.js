/*
 * global describe, it, expect
 */

describe('BellaJS : DataType detection', function(){

  it('Bella.isObject(Object val) should  return true when val is an instance of Object', function(){
    var sampleObject = Object.create({});
    var testType = Bella.isObject(sampleObject);
    expect(testType).toBe(true);
  });

  it('Bella.isBoolean(Boolean val) should  return true when val is true or false', function(){
    var testType = Bella.isBoolean(true) && Bella.isBoolean(false);
    expect(testType).toBe(true);
  });

  it('Bella.isArray(Array val) should  return true when val is an instance of Array', function(){
    var sampleArray = [1, 2, 3];
    var testType = Bella.isArray(sampleArray);
    expect(testType).toBe(true);
  });

  it('Bella.isFunction(Function val) should  return true when val is an instance of Function', function(){
    var sampleFunction = function(){};
    var testType = Bella.isFunction(sampleFunction);
    expect(testType).toBe(true);
  });

  it('Bella.isNumber(Number val) should  return true when val is an instance of Number', function(){
    var sampleNumber = 1e4;
    var testType = Bella.isNumber(sampleNumber);
    expect(testType).toBe(true);
  });

  it('Bella.isString(String val) should return true when val is an instance of String', function(){
    var sampleString = 'Hello';
    var testType = Bella.isString(sampleString);
    expect(testType).toBe(true);
  });

  it('Bella.isElement(HTMLElement val) should return true when val is a DOM Element', function(){
    var sampleElement = document.createElement('SPAN');
    var testType = Bella.isElement(sampleElement);
    expect(testType).toBe(true);
  });

  it('Bella.isEmpty(Anything val) should return true when val is a no-value variable, [], {} and \'\' as Empty', function(){
    var sampleNothing;
    var sampleArrayEmpty = [];
    var sampleObjectEmpty = {};
    var sampleStringEmpty = '';
    var testType1 = Bella.isEmpty(sampleNothing);
    var testType2 = Bella.isEmpty(sampleArrayEmpty);
    var testType3 = Bella.isEmpty(sampleObjectEmpty);
    var testType4 = Bella.isEmpty(sampleStringEmpty);
    expect(testType1).toBe(true);
    expect(testType2).toBe(true);
    expect(testType3).toBe(true);
    expect(testType4).toBe(true);
  });

  describe('Bella.isInteger(Number) :', function(){
    var x1 = Math.round(Math.random() * 100000);
    it('It should return true with ' + x1, function(){
      var testType = Bella.isInteger(x1);
      expect(testType).toBe(true);
    });
    var x2 = 6.05;
    it('It should return false with ' + x2, function(){
      var testType = Bella.isInteger(x2);
      expect(testType).toBe(false);
    });
    var x3 = 'Alpes';
    it('It should return false with ' + x3, function(){
      var testType = Bella.isInteger(x3);
      expect(testType).toBe(false);
    });
    var x4 = -Math.round(Math.random() * 100000);
    it('It should return true with ' + x4, function(){
      var testType = Bella.isInteger(x4);
      expect(testType).toBe(true);
    });
  });

  describe('Bella.isLetter(String) :', function(){
    var x1 = 'google';
    it('It should return true with ' + x1, function(){
      var testType = Bella.isLetter(x1);
      expect(testType).toBe(true);
    });
    var x11 = 'Google';
    it('It should return true with ' + x11, function(){
      var testType = Bella.isLetter(x11);
      expect(testType).toBe(true);
    });
    var x12 = 'GOOGLE';
    it('It should return true with ' + x12, function(){
      var testType = Bella.isLetter(x12);
      expect(testType).toBe(true);
    });

    var x2 = Math.round(Math.random() * 100000);
    it('It should return false with ' + x2, function(){
      var testType = Bella.isLetter(x2);
      expect(testType).toBe(false);
    });
    var x3 = 'Noop!';
    it('It should return false with ' + x3, function(){
      var testType = Bella.isLetter(x3);
      expect(testType).toBe(false);
    });
  });

  describe('Bella.isEmail:', function(){
    [
      {
        input: 'ndaidong@gmail.com',
        expectation: true
      },
      {
        input: 'bob.nany@live.com',
        expectation: true
      },
      {
        input: 'karu@.com',
        expectation: false
      },
      {
        input: 'karu',
        expectation: false
      },
      {
        input: '',
        expectation: false
      },
      {
        input: 1000,
        expectation: false
      },
      {
        input: [],
        expectation: false
      }
    ].forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));
      it('Bella.isEmail(' + param + ') should return "' + e + '"', function(){
        var testType = Bella.isEmail(s);
        expect(testType).toBe(e);
      });
    });
  });

  describe('Bella.isGeneratedKey:', function(){
    var ids = [];
    while(ids.length < 10){
      ids.push({
        input: Bella.createId(),
        expectation: true
      });
    }
    ids = ids.concat([
      {
        input: ')jki',
        expectation: false
      },
      {
        input: 'asd_ki',
        expectation: false
      },
      {
        input: {},
        expectation: false
      },
      {
        input: '',
        expectation: false
      },
      {
        input: '       ',
        expectation: false
      },
      {
        input: false,
        expectation: false
      },
      {
        input: '10000',
        expectation: true
      },
      {
        input: 'uuuuuuuuuuuu',
        expectation: true
      }
    ]);
    ids.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;
      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));
      it('Bella.isGeneratedKey(' + param + ') should return "' + e + '"', function(){
        var testType = Bella.isGeneratedKey(s);
        expect(testType).toBe(e);
      });
    });
  });
});

// createId
describe('BellaJS : Random key generating', function(){

  describe('BellaJS.createId() : ', function(){
    it('Bella.createId() should generate a string of 32 characters', function(){
      var id = Bella.createId();
      var len = id.length;
      expect(len).toEqual(32);
    });
    it('The keys should contain only alphabet, 0-9', function(){
      var id = Bella.createId(100);
      expect(id).toMatch(/^[0-9A-z]+/i);
    });
  });

  describe('BellaJS.createId(Number) : ', function(){

    it('Bella.createId(15) should generate a string of 15 characters', function(){
      var id = Bella.createId(15);
      var len = id.length;
      expect(len).toEqual(15);
    });
  });

  describe('BellaJS.createId(Number, String) : ', function(){

    it('Bella.createId(36, \'__prefix__\') should generate a string of 36 characters and begin with \'__prefix__\'', function(){
      var id = Bella.createId(36, '__prefix__');
      var len = id.length;
      expect(len).toEqual(36);
      expect(id).toMatch(/^__prefix__/);
    });
  });

});

// String
describe('BellaJS : String manipulation', function(){

  // encode
  describe('Bella.encode(String s) : ', function(){

    var data = [
      {
        input: 'Hello world!',
        expectation: 'Hello%20world!'
      },
      {
        input: '',
        expectation: ''
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.encode(' + param + ') should return "' + e + '"', function(){
        var v = Bella.encode(s);
        expect(v).toEqual(e);
      });
    });
  });

  // decode
  describe('Bella.decode(String s) : ', function(){

    var data = [
      {
        input: 'Hello%20world!',
        expectation: 'Hello world!'
      },
      {
        input: '',
        expectation: ''
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.decode(' + param + ') should return "' + e + '"', function(){
        var v = Bella.decode(s);
        expect(v).toEqual(e);
      });
    });
  });

  describe('Bella.trim(String s) : ', function(){

    var data = [
      {
        input: ' Hello world   ',
        expectation: 'Hello world'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: null,
        expectation: ''
      },
      {
        input: 2000,
        expectation: 2000
      },
      {
        input: '',
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;
      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.trim(' + param + ') should return "' + e + '"', function(){
        var v = Bella.trim(s);
        expect(v).toEqual(e);
      });
    });
  });

  // truncate
  describe('Bella.truncate(String s, Number t) : ', function(){

    var data = [
      {
        input: ['What one man can invent, another can discover.', 40],
        expectation: 'What one man can invent, another can...'
      },
      {
        input: [],
        expectation: '...'
      },
      {
        input: [{g: 100}],
        expectation: '...'
      },
      {
        input: [false],
        expectation: '...'
      },
      {
        input: [8],
        expectation: '...'
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input[0];
      var t = useCase.input[1] || false;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));
      if(t){
        param += (', ' + t);
      }

      it('Bella.truncate(' + param + ') should return "' + e + '"', function(){
        var v = Bella.truncate(s, t);
        expect(v).toEqual(e);
      });
    });
  });


  // stripTags
  describe('Bella.stripTags(String s) : ', function(){

    var data = [
      {
        input: '<h1>Hello world</h1>',
        expectation: 'Hello world'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.stripTags(' + param + ') should return "' + e + '"', function(){
        var v = Bella.stripTags(s);
        expect(v).toEqual(e);
      });
    });
  });

  // escapeHTML
  describe('Bella.escapeHTML(String s) : ', function(){

    var data = [
      {
        input: '<h1>Hello world. I\'m a "convertor" function.</h1>',
        expectation: '&lt;h1&gt;Hello world. I\'m a &quot;convertor&quot; function.&lt;/h1&gt;'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.escapeHTML(' + param + ') should return "' + e + '"', function(){
        var v = Bella.escapeHTML(s);
        expect(v).toEqual(e);
      });
    });
  });

  // unescapeHTML
  describe('Bella.unescapeHTML(String s) : ', function(){

    var data = [
      {
        input: '&lt;h1&gt;Hello world. I\'m a &quot;convertor&quot; function.&lt;/h1&gt;',
        expectation: '<h1>Hello world. I\'m a "convertor" function.</h1>'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.unescapeHTML(' + param + ') should return "' + e + '"', function(){
        var v = Bella.unescapeHTML(s);
        expect(v).toEqual(e);
      });
    });
  });

  // strtolower
  describe('Bella.strtolower(String s) : ', function(){

    var data = [
      {
        input: 'Hi, I\'m A.J. Hoge, the director of "Effortless English".',
        expectation: 'hi, i\'m a.j. hoge, the director of "effortless english".'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.strtolower(' + param + ') should return "' + e + '"', function(){
        var v = Bella.strtolower(s);
        expect(v).toEqual(e);
      });
    });
  });

  // strtoupper
  describe('Bella.strtoupper(String s) : ', function(){

    var data = [
      {
        input: 'Hi, I\'m A.J. Hoge, the director of "Effortless English".',
        expectation: 'HI, I\'M A.J. HOGE, THE DIRECTOR OF "EFFORTLESS ENGLISH".'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.strtoupper(' + param + ') should return "' + e + '"', function(){
        var v = Bella.strtoupper(s);
        expect(v).toEqual(e);
      });
    });

  });

  // ucfirst
  describe('Bella.ucfirst(String s) : ', function(){

    var data = [
      {
        input: 'hello world',
        expectation: 'Hello world'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.ucfirst(' + param + ') should return "' + e + '"', function(){
        var v = Bella.ucfirst(s);
        expect(v).toEqual(e);
      });
    });

  });

  // ucwords
  describe('Bella.ucwords(String s) : ', function(){

    var data = [
      {
        input: 'hello world',
        expectation: 'Hello World'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.ucwords(' + param + ') should return "' + e + '"', function(){
        var v = Bella.ucwords(s);
        expect(v).toEqual(e);
      });
    });

  });

  // leftPad
  describe('Bella.leftPad(String s, Number size, String pad) : ', function(){

    var data = [
      {
        input: {
          a: false
        },
        expectation: 'false'
      },
      {
        input: {
          a: '7'
        },
        expectation: '07'
      },
      {
        input: {
          a: '3',
          b: 4
        },
        expectation: '0003'
      },
      {
        input: {
          a: 6,
          b: 5,
          c: '0'
        },
        expectation: '00006'
      },
      {
        input: {
          a: '4',
          b: 5,
          c: '0'
        },
        expectation: '00004'
      },
      {
        input: {
          a: '52',
          b: 7,
          c: 'K'
        },
        expectation: 'KKKKK52'
      },
      {
        input: {
          a: '10102',
          b: 4,
          c: 'K'
        },
        expectation: '10102'
      },
      {
        input: {
          a: '10102',
          b: 5,
          c: 'K'
        },
        expectation: '10102'
      },
      {
        input: {
          a: '10102',
          b: 6,
          c: 'K'
        },
        expectation: 'K10102'
      }
    ];

    data.forEach(function(useCase){
      var input = useCase.input;
      var a = input.a;
      var b = input.b;
      var c = input.c;
      var e = useCase.expectation;

      var param = (Bella.isString(a)) ? '"' + a + '"' : (Bella.isBoolean(a) || Bella.isNumber(a)) ? a : (Bella.isFunction(a) ? a.toString() : JSON.stringify(a));
      if(b){
        param += (', ' + b);
      }
      if(c){
        param += (', "' + c + '"');
      }

      it('Bella.leftPad(' + param + ') should return "' + e + '"', function(){
        var v = Bella.leftPad(a, b, c);
        expect(v).toEqual(e);
      });
    });

  });

  // rightPad
  describe('Bella.rightPad(String s, Number size, String pad) : ', function(){

    var data = [
      {
        input: {
          a: false
        },
        expectation: 'false'
      },
      {
        input: {
          a: '7'
        },
        expectation: '70'
      },
      {
        input: {
          a: '3',
          b: 4
        },
        expectation: '3000'
      },
      {
        input: {
          a: 6,
          b: 5,
          c: '0'
        },
        expectation: '60000'
      },
      {
        input: {
          a: '4',
          b: 5,
          c: '0'
        },
        expectation: '40000'
      },
      {
        input: {
          a: '52',
          b: 7,
          c: 'K'
        },
        expectation: '52KKKKK'
      },
      {
        input: {
          a: '10102',
          b: 4,
          c: 'K'
        },
        expectation: '10102'
      },
      {
        input: {
          a: '10102',
          b: 5,
          c: 'K'
        },
        expectation: '10102'
      },
      {
        input: {
          a: '10102',
          b: 6,
          c: 'K'
        },
        expectation: '10102K'
      }
    ];

    data.forEach(function(useCase){
      var input = useCase.input;
      var a = input.a;
      var b = input.b;
      var c = input.c;
      var e = useCase.expectation;

      var param = (Bella.isString(a)) ? '"' + a + '"' : (Bella.isBoolean(a) || Bella.isNumber(a)) ? a : (Bella.isFunction(a) ? a.toString() : JSON.stringify(a));
      if(b){
        param += (', ' + b);
      }
      if(c){
        param += (', "' + c + '"');
      }

      it('Bella.rightPad(' + param + ') should return "' + e + '"', function(){
        var v = Bella.rightPad(a, b, c);
        expect(v).toEqual(e);
      });
    });

  });

  // replaceAll
  describe('Bella.replaceAll(String s, [String | Array] search, [String | Array] replace) : ', function(){

    var data = [
      {
        input: {
          a: 'Hello world',
          b: 'l',
          c: '2'
        },
        expectation: 'He22o wor2d'
      },
      {
        input: {
          a: 'Hello world',
          b: ['l', 'o'],
          c: ['2', '0']
        },
        expectation: 'He220 w0r2d'
      },
      {
        input: {
          a: 'Hello world',
          b: ['l', 'o'],
          c: ['2']
        },
        expectation: 'He222 w2r2d'
      },
      {
        input: {
          a: 'Hello world',
          b: ['l', 'o'],
          c: '2'
        },
        expectation: 'He222 w2r2d'
      },
      {
        input: {
          a: 'Hello world',
          b: ['l'],
          c: ['2', '0']
        },
        expectation: 'Hello world'
      },
      {
        input: {
          a: 'Hello world',
          b: 'l',
          c: ['2', '0']
        },
        expectation: 'Hello world'
      },
      {
        input: {
          a: 'Hello world',
          b: 'l'
        },
        expectation: 'Hello world'
      },
      {
        input: {
          a: 'Hello world'
        },
        expectation: 'Hello world'
      },
      {
        input: {
          a: false
        },
        expectation: ''
      },
      {
        input: {
          a: 10000
        },
        expectation: ''
      },
      {
        input: {
          a: {q: 97}
        },
        expectation: ''
      },
      {
        input: {
          a: [20, 15, 0, 'T']
        },
        expectation: ''
      }
    ];

    data.forEach(function(useCase){
      var input = useCase.input;
      var a = input.a;
      var b = input.b;
      var c = input.c;
      var e = useCase.expectation;

      var param = (Bella.isString(a)) ? '"' + a + '"' : (Bella.isBoolean(a) || Bella.isNumber(a)) ? a : (Bella.isFunction(a) ? a.toString() : JSON.stringify(a));
      if(b){
        param += ', ' + JSON.stringify(b);
      }
      if(c){
        param += ', ' + JSON.stringify(c);
      }

      it('Bella.replaceAll(' + param + ') should return "' + e + '"', function(){
        var v = Bella.replaceAll(a, b, c);
        expect(v).toEqual(e);
      });
    });
  });

  // stripAccent
  describe('Bella.stripAccent(String s) : ', function(){
    [
      {
        input: 'Quel est votre rôle en tant que directeur délégué de la métropole Montpellier French Tech ?',
        expectation: 'Quel est votre role en tant que directeur delegue de la metropole Montpellier French Tech ?'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ].forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.stripAccent(' + param + ') should return "' + e + '"', function(){
        var v = Bella.stripAccent(s);
        expect(v).toEqual(e);
      });
    });

  });

  // stripAccent
  describe('Bella.createAlias(String s) : ', function(){
    [
      {
        input: 'Sur l\'année 2015',
        expectation: 'sur-l-annee-2015'
      },
      {
        input: false,
        expectation: ''
      },
      {
        input: 1000,
        expectation: ''
      },
      {
        input: function(){},
        expectation: ''
      },
      {
        input: {a: 5},
        expectation: ''
      }
    ].forEach(function(useCase){
      var s = useCase.input;
      var e = useCase.expectation;

      var param = (Bella.isString(s)) ? '"' + s + '"' : (Bella.isFunction(s) ? s.toString() : JSON.stringify(s));

      it('Bella.createAlias(' + param + ') should return "' + e + '"', function(){
        var v = Bella.createAlias(s);
        expect(v).toEqual(e);
      });
    });
  });
});


describe('BellaJS : Array & Object', function(){

  describe('Bella.unique(Array a)', function(){

    var sampleArray = [
      1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 4, 3, 2, 1
    ];

    it('Bella.unique(' + JSON.stringify(sampleArray) + ') should not contain duplicate items', function(){

      var uniqueArray = Bella.unique(sampleArray);

      var expectResult = 1;
      var arr1 = uniqueArray.filter(function(item){
        return item === 1;
      });
      expect(arr1.length).toEqual(expectResult);

      var arr2 = uniqueArray.filter(function(item){
        return item === 2;
      });
      expect(arr2.length).toEqual(expectResult);

      var arr3 = uniqueArray.filter(function(item){
        return item === 3;
      });
      expect(arr3.length).toEqual(expectResult);

      var arr4 = uniqueArray.filter(function(item){
        return item === 4;
      });
      expect(arr4.length).toEqual(expectResult);

      var arr5 = uniqueArray.filter(function(item){
        return item === 5;
      });
      expect(arr5.length).toEqual(expectResult);
    });

  });

  var sampleArray = [
    18, 55, 97, 1, 48, 100, 62, 80
  ];

  describe('Bella.max(Array a)', function(){
    it('Bella.max(' + JSON.stringify(sampleArray) + ') should return 100', function(){

      var realResult = Bella.max(sampleArray);

      var expectResult = 100;

      expect(realResult).toEqual(expectResult);
    });
  });

  describe('Bella.min(Array a)', function(){
    it('Bella.min(' + JSON.stringify(sampleArray) + ') should return 1', function(){

      var realResult = Bella.min(sampleArray);

      var expectResult = 1;

      expect(realResult).toEqual(expectResult);
    });
  });

  describe('Bella.contains(Array a, String|Object search [, String key])', function(){
    it('Bella.contains(' + JSON.stringify(sampleArray) + ', 1) should return true', function(){

      var realResult = Bella.contains(sampleArray, 1);

      var expectResult = true;

      expect(realResult).toBe(expectResult);
    });

    it('Bella.contains(' + JSON.stringify(sampleArray) + ', 80) should return true', function(){

      var realResult = Bella.contains(sampleArray, 80);

      var expectResult = true;

      expect(realResult).toBe(expectResult);
    });

    it('Bella.contains(' + JSON.stringify(sampleArray) + ', 1000) should return false', function(){

      var realResult = Bella.contains(sampleArray, 1000);

      var expectResult = false;

      expect(realResult).toBe(expectResult);
    });
  });

  describe('Bella.sort(Array a [, String order | Object option ])', function(){
    it('Bella.sort(' + JSON.stringify(sampleArray) + ') should have 1 at first', function(){

      var sortedArray = Bella.sort(sampleArray);

      var realResult = sortedArray[0];

      var expectResult = 1;

      expect(realResult).toEqual(expectResult);
    });

    it('Bella.sort(' + JSON.stringify(sampleArray) + ') should have 18 at second', function(){

      var sortedArray = Bella.sort(sampleArray);

      var realResult = sortedArray[1];

      var expectResult = 18;

      expect(realResult).toEqual(expectResult);
    });

    it('Bella.sort(' + JSON.stringify(sampleArray) + ') should have 97 at second last', function(){

      var sortedArray = Bella.sort(sampleArray);

      var realResult = sortedArray[sortedArray.length - 2];

      var expectResult = 97;

      expect(realResult).toEqual(expectResult);
    });

    it('Bella.sort(' + JSON.stringify(sampleArray) + ') should have 100 at last', function(){

      var sortedArray = Bella.sort(sampleArray);

      var realResult = sortedArray[sortedArray.length - 1];

      var expectResult = 100;

      expect(realResult).toEqual(expectResult);
    });


    it('Bella.sort(' + JSON.stringify(sampleArray) + ', -1) should have 100 at first', function(){

      var sortedArray = Bella.sort(sampleArray, -1);

      var realResult = sortedArray[0];

      var expectResult = 100;

      expect(realResult).toEqual(expectResult);
    });

    it('Bella.sort(' + JSON.stringify(sampleArray) + ', -1) should have 97 at second', function(){

      var sortedArray = Bella.sort(sampleArray, -1);

      var realResult = sortedArray[1];

      var expectResult = 97;

      expect(realResult).toEqual(expectResult);
    });

    it('Bella.sort(' + JSON.stringify(sampleArray) + ', -1) should have 18 at second last', function(){

      var sortedArray = Bella.sort(sampleArray, -1);

      var realResult = sortedArray[sortedArray.length - 2];

      var expectResult = 18;

      expect(realResult).toEqual(expectResult);
    });

    it('Bella.sort(' + JSON.stringify(sampleArray) + ', -1) should have 1 at last', function(){

      var sortedArray = Bella.sort(sampleArray, -1);

      var realResult = sortedArray[sortedArray.length - 1];

      var expectResult = 1;

      expect(realResult).toEqual(expectResult);
    });

  });

  describe('Bella.empty(Array a)', function(){
    it('Bella.empty(' + JSON.stringify(sampleArray) + ') should return []', function(){

      var realResult = Bella.empty(sampleArray);

      var expectResult = [];

      expect(realResult).toEqual(expectResult);
    });

    var sampleObject = {name: 'Alice', age: 18};
    it('Bella.empty(' + JSON.stringify(sampleObject) + ') should return {}', function(){

      var realResult = Bella.empty(sampleObject);

      var expectResult = {};

      expect(realResult).toEqual(expectResult);
    });
  });


  describe('Bella.clone(Array a)', function(){

    var sampleArray2 = [
      1, 3, 4, 6, 9, 12
    ];
    it('Bella.clone(' + JSON.stringify(sampleArray2) + ') should return ' + JSON.stringify(sampleArray2), function(){

      var realResult = Bella.clone(sampleArray2);

      var expectResult = [
        1, 3, 4, 6, 9, 12
      ];

      expect(realResult).toEqual(expectResult);
    });

    var sampleObject = {name: 'Alice', age: 18};
    it('Bella.clone(' + JSON.stringify(sampleObject) + ') should return ' + JSON.stringify(sampleObject), function(){

      var realResult = Bella.clone(sampleObject);

      var expectResult = {name: 'Alice', age: 18};

      expect(realResult).toEqual(expectResult);
    });
  });

  describe('Bella.copies(Array|Object src, Array|Object dest [, Boolean mustMatch[, Array exclude] ])', function(){

    var srcObject1 = {name: 'Alice', age: 18};
    var destObject1 = {country: 'USA'};
    var expectResult1 = {name: 'Alice', age: 18, country: 'USA'};
    it('Bella.copies(' + JSON.stringify(srcObject1) + ', ' + JSON.stringify(destObject1) + ') should return ' + JSON.stringify(expectResult1), function(){
      var realResult = Bella.copies(srcObject1, destObject1);
      expect(realResult).toEqual(expectResult1);
    });

    var srcObject2 = {name: 'Alice', age: 18};
    var destObject2 = {name: 'Helen', country: 'USA'};
    var expectResult2 = {name: 'Alice', country: 'USA'};
    it('Bella.copies(' + JSON.stringify(srcObject2) + ', ' + JSON.stringify(destObject2) + ', true) should return ' + JSON.stringify(expectResult2), function(){
      var realResult = Bella.copies(srcObject2, destObject2, true);
      expect(realResult).toEqual(expectResult2);
    });

    var srcObject3 = {name: 'Alice', age: 18};
    var destObject3 = {name: 'Helen', country: 'USA'};
    var expectResult3 = {name: 'Helen', country: 'USA'};
    it('Bella.copies(' + JSON.stringify(srcObject3) + ', ' + JSON.stringify(destObject3) + ', true, [\'name\']) should return ' + JSON.stringify(expectResult3), function(){
      var realResult = Bella.copies(srcObject3, destObject3, true, ['name']);
      expect(realResult).toEqual(expectResult3);
    });
  });

  describe('Bella.hasProperty(Array a | Object b, String key)', function(){

    var samOb = {
      a: 1,
      b: undefined,
      c: null,
      d: '',
      e: false
    }
    it('Bella.hasProperty({a: 1}, "a") should return true', function(){
      var realResult = Bella.hasProperty(samOb, 'a');
      var expectResult = true;
      expect(realResult).toEqual(expectResult);
    });
    it('Bella.hasProperty({b: undefined}, "b") should return true', function(){
      var realResult = Bella.hasProperty(samOb, 'b');
      var expectResult = true;
      expect(realResult).toEqual(expectResult);
    });
    it('Bella.hasProperty({c: null}, "c") should return true', function(){
      var realResult = Bella.hasProperty(samOb, 'c');
      var expectResult = true;
      expect(realResult).toEqual(expectResult);
    });
    it('Bella.hasProperty({d: \'\'}, "d") should return true', function(){
      var realResult = Bella.hasProperty(samOb, 'd');
      var expectResult = true;
      expect(realResult).toEqual(expectResult);
    });
    it('Bella.hasProperty({e: false}, "e") should return true', function(){
      var realResult = Bella.hasProperty(samOb, 'e');
      var expectResult = true;
      expect(realResult).toEqual(expectResult);
    });
    it('Bella.hasProperty({f: true}, "g") should return false', function(){
      var realResult = Bella.hasProperty(samOb, 'g');
      var expectResult = false;
      expect(realResult).toEqual(expectResult);
    });
  });

  describe('Bella.equals:', function(){
    [
      {
        input: {
          a: 1,
          b: 1
        },
        expectation: true
      },
      {
        input: {
          a: 1,
          b: 0
        },
        expectation: false
      },
      {
        input: {
          a: {name: 'X'},
          b: {name: 'Y'}
        },
        expectation: false
      },
      {
        input: {
          a: {name: 'X'},
          b: 'Hello'
        },
        expectation: false
      },
      {
        input: {
          a: 'Hello',
          b: 'Hello'
        },
        expectation: true
      },
      {
        input: {
          a: [1, 3, 5, 6],
          b: [1, 3, 5, 6]
        },
        expectation: true
      },
      {
        input: {
          a: [1, 3, 5, {name: 'X'}, [4, 6, 7]],
          b: [1, 3, 5, {name: 'X'}, [4, 6, 7]]
        },
        expectation: true
      },
      {
        input: {
          a: [3, 5, {name: 'X'}, [4, 6, 7]],
          b: [1, 3, 5, {name: 'X'}, [4, 6, 7]]
        },
        expectation: false
      },
      {
        input: {
          a: [1, 3, 5, {name: 'X'}, [4, 6, 7]],
          b: [1, 3, 5, {name: 'X'}, [4, 6, 8]]
        },
        expectation: false
      },
      {
        input: {
          a: [1, 3, 5, {name: 'X'}, [4, 6, 8]],
          b: [1, 3, 5, {name: 'X', email: 'ga@gmail.com'}, [4, 6, 8]]
        },
        expectation: false
      },
      {
        input: {
          a: [1, 3, 5, {email: 'ga@gmail.com', name: 'X'}, [4, 6, 8]],
          b: [1, 3, 5, {name: 'X', email: 'ga@gmail.com'}, [4, 6, 8]]
        },
        expectation: true
      },
      {
        input: {
          a: [],
          b: []
        },
        expectation: true
      }
    ].forEach(function(useCase){
      var s = useCase.input, a = s.a, b = s.b;
      var e = useCase.expectation;
      var p1 = (Bella.isString(a)) ? '"' + a + '"' : (Bella.isFunction(a) ? a.toString() : JSON.stringify(a));
      var p2 = (Bella.isString(b)) ? '"' + b + '"' : (Bella.isFunction(b) ? b.toString() : JSON.stringify(b));
      it('Bella.equals(' + p1 + ', ' + p2 + ') should return "' + e + '"', function(){
        var testType = Bella.equals(a, b);
        expect(testType).toBe(e);
      });
    });
  });

});
