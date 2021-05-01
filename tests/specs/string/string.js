/**
 * Testing
 * @ndaidong
 */

const {test} = require('tap');

const {variants} = require('../../config');

const checkStringMethods = (bella) => {
  test('With well-format string input:', (assert) => {
    const methods = [
      'ucfirst',
      'ucwords',
      'truncate',
      'stripTags',
      'stripAccent',
      'escapeHTML',
      'unescapeHTML',
      'replaceAll',
      'slugify',
    ];

    methods.forEach((m) => {
      assert.ok(bella.isFunction(bella[m]), `It must have the method .${m}()`);
    });

    assert.end();
  });

  // truncate
  test('Testing .truncate(String s) method', (assert) => {
    const x = 'If a property is non-configurable, its writable attribute can only be changed to false.';
    const a = bella.truncate(x, 60);
    const e = 'If a property is non-configurable, its writable attribute...';
    assert.deepEquals(a, e, `bella.truncate('${x}', 60) must return "${e}"`);
    assert.deepEquals(bella.truncate(x, 200), x, `bella.truncate('${x}', 200) must return "${x}"`);

    const x1 = [
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      'Lorem Ipsum has been the industry\'s standard dummy text ever since',
      'the 1500s, when an unknown printer took a galley of',
      'type and scrambled it to make a type specimen book.',
    ].join(' ');

    const a1 = bella.truncate(x1);
    const e1 = [
      'Lorem Ipsum is simply dummy text of the printing and typesetting',
      'industry. Lorem Ipsum has been the industry\'s standard dummy text ever...',
    ].join(' ');

    assert.deepEquals(a1, e1, `bella.truncate('${x}') must return "${e1}"`);


    const x2 = 'uyyiyirwqyiyiyrihklhkjhskdjfhkahfiusayiyfiudyiyqwiyriuqyiouroiuyi';
    const a2 = bella.truncate(x2, 20);
    const e2 = 'uyyiyirwqyiyiyrih...';
    assert.deepEquals(a2, e2, `bella.truncate('${x2}', 20) must return "${e2}"`);

    const x3 = 'Lorem Ipsum is simply dummy text';
    const a3 = bella.truncate(x3, 120);
    assert.deepEquals(a3, x3, `bella.truncate('${x3}', 120) must return "${a3}"`);

    assert.end();
  });

  // stripTags
  test('Testing .stripTags(String s) method', (assert) => {
    const x = '<a>Hello <b>world</b></a>';
    const a1 = bella.stripTags(x);
    const e1 = 'Hello world';
    assert.deepEquals(a1, e1, `bella.stripTags('${x}') must return ${e1}`);

    assert.deepEquals(bella.stripTags(1238), '1238', `bella.stripTags(1238) must return "1238"`);

    const fn = () => {
      return bella.stripTags({});
    };
    assert.throws(fn, 'Error: InvalidInput: String required', 'stripTag non-string must throw error');
    assert.end();
  });

  // escapeHTML
  test('Testing .escapeHTML(String s) method', (assert) => {
    const x = '<a>Hello <b>world</b></a>';
    const a1 = bella.escapeHTML(x);
    const e1 = '&lt;a&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/a&gt;';
    assert.deepEquals(a1, e1, `bella.escapeHTML('${x}') must return ${e1}`);
    assert.end();
  });

  // unescapeHTML
  test('Testing .unescapeHTML(String s) method', (assert) => {
    const x = '&lt;a&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/a&gt;';
    const a1 = bella.unescapeHTML(x);
    const e1 = '<a>Hello <b>world</b></a>';
    assert.deepEquals(a1, e1, `bella.unescapeHTML('${x}') must return ${e1}`);
    assert.end();
  });

  // ucfirst
  test('Testing .ucfirst(String s) method', (assert) => {
    const x1 = 'HElLo wOrLd';
    const a1 = bella.ucfirst(x1);
    const e1 = 'Hello world';
    assert.deepEquals(a1, e1, `bella.ucfirst('${x1}') must return ${e1}`);

    const x2 = 'a';
    const a2 = bella.ucfirst(x2);
    const e2 = 'A';
    assert.deepEquals(a2, e2, `bella.ucfirst('${x2}') must return ${e2}`);

    assert.end();
  });

  // ucwords
  test('Testing .ucwords(String s) method', (assert) => {
    const x = 'HElLo wOrLd';
    const a1 = bella.ucwords(x);
    const e1 = 'Hello World';
    assert.deepEquals(a1, e1, `bella.ucwords('${x}') must return ${e1}`);
    assert.end();
  });

  // replaceAll
  test('Testing .replaceAll(String s, String find, String replace) method', (assert) => {
    const data = [
      {
        input: {
          a: 'Hello world',
          b: 'l',
          c: '2',
        },
        expectation: 'He22o wor2d',
      },
      {
        input: {
          a: 'Hello world',
          b: 'l',
          c: 2,
        },
        expectation: 'He22o wor2d',
      },
      {
        input: {
          a: 798078967,
          b: 7,
          c: 1,
        },
        expectation: '198018961',
      },
      {
        input: {
          a: 'Hello world',
          b: ['l', 'o'],
          c: ['2', '0'],
        },
        expectation: 'He220 w0r2d',
      },
      {
        input: {
          a: 'Hello world',
          b: ['l', 'o'],
          c: '2',
        },
        expectation: 'He222 w2r2d',
      },
      {
        input: {
          a: 'Hello world',
          b: ['l'],
          c: ['2', '0'],
        },
        expectation: 'Hello world',
      },
      {
        input: {
          a: 'Hello world',
          b: 'l',
        },
        expectation: 'Hello world',
      },
      {
        input: {
          a: 'Hello world',
        },
        expectation: 'Hello world',
      },
      {
        input: {
          a: 10000,
        },
        expectation: '10000',
      },
      {
        input: {
          a: 0,
        },
        expectation: '0',
      },
    ];

    data.forEach((useCase) => {
      const input = useCase.input;
      const a = input.a;
      const b = input.b;
      const c = input.c;
      const e = useCase.expectation;

      const result = bella.replaceAll(a, b, c);
      assert.deepEquals(result, e, `bella.replaceAll('${a}', ${b}, ${c}) must return ${e}`);
    });
    assert.end();
  });


  // stripAccent
  test('Testing .stripAccent(String s) method', (assert) => {
    const x1 = 'Sur l\'année 2015 - ủ Ù ỹ Ỹ';
    const a1 = bella.stripAccent(x1);
    const e1 = 'Sur l\'annee 2015 - u U y Y';
    assert.deepEquals(a1, e1, `bella.stripAccent('${x1}') must return ${e1}`);

    const x2 = 12897;
    const a2 = bella.stripAccent(x2);
    const e2 = '12897';
    assert.deepEquals(a2, e2, `bella.stripAccent('${x2}') must return ${e2}`);

    assert.end();
  });

  // slugify
  test('Testing .slugify(String s) method', (assert) => {
    const x = 'Sur l\'année 2015';
    const a1 = bella.slugify(x);
    const e1 = 'sur-l-annee-2015';
    assert.deepEquals(a1, e1, `bella.slugify('${x}') must return ${e1}`);

    assert.end();
  });
};

variants.map(checkStringMethods);
