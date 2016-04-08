/**
 * Testing
 * @ndaidong
 */

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

import path from 'path';
import test from 'tape';

var rootDir = '../../../src';

var bella = require(path.join(rootDir, 'bella'));

// encode
test('Testing .encode(String s) method', (assert) => {
  let x = 'Hello world';
  let a = bella.encode(x);
  let e = 'Hello%20world';
  assert.deepEquals(a, e, `bella.encode(x) must return ${e}`);
  assert.end();
});

// decode
test('Testing .decode(String s) method', (assert) => {
  let x = 'Hello%20world';
  let a = bella.decode(x);
  let e = 'Hello world';
  assert.deepEquals(a, e, `bella.decode(x) must return ${e}`);
  assert.end();
});

// trim
test('Testing .trim(String s) method', (assert) => {
  let x = ' Hello    world. This is   my  dog.  ';
  let a1 = bella.trim(x);
  let e1 = 'Hello    world. This is   my  dog.';
  assert.deepEquals(a1, e1, `bella.trim(x) must return ${e1}`);

  let a2 = bella.trim(x, true);
  let e2 = 'Hello world. This is my dog.';
  assert.deepEquals(a2, e2, `bella.trim(x, true) must return ${e2}`);


  assert.deepEquals(bella.trim(), '', 'bella.trim() must return empty string');
  assert.deepEquals(bella.trim(100), '', 'bella.trim({}) must return empty string');
  assert.end();
});

// truncate
test('Testing .truncate(String s) method', (assert) => {

  let x = 'If a property is non-configurable, its writable attribute can only be changed to false.';
  let a = bella.truncate(x, 60);
  let e = 'If a property is non-configurable, its writable attribute...';
  assert.deepEquals(a, e, `bella.truncate('${x}', 60) must return "${e}"`);
  assert.deepEquals(bella.truncate(x, 200), x, `bella.truncate('${x}', 200) must return "${x}"`);

  let x1 = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Lorem Ipsum has been the industry\'s standard dummy text ever since',
    'the 1500s, when an unknown printer took a galley of',
    'type and scrambled it to make a type specimen book.'
  ].join(' ');

  let a1 = bella.truncate(x1);
  let e1 = [
    'Lorem Ipsum is simply dummy text of the printing and typesetting',
    'industry. Lorem Ipsum has been the industry\'s standard dummy text ever...'
  ].join(' ');

  assert.deepEquals(a1, e1, `bella.truncate('${x}') must return "${e1}"`);


  let x2 = 'uyyiyirwqyiyiyrihklhkjhskdjfhkahfiusayiyfiudyiyqwiyriuqyiouroiuyi';
  let a2 = bella.truncate(x2, 20);
  let e2 = 'uyyiyirwqyiyiyrih...';
  assert.deepEquals(a2, e2, `bella.truncate('${x2}', 20) must return "${e2}"`);

  let x3 = 'Lorem Ipsum is simply dummy text';
  let a3 = bella.truncate(x3, 120);
  assert.deepEquals(a3, x3, `bella.truncate('${x3}', 120) must return "${a3}"`);

  assert.deepEquals(bella.truncate(String('')), '', 'bella.truncate(String(\'\')) must return ""');
  assert.deepEquals(bella.truncate('     '), '', 'bella.truncate(\'    \') must return ""');
  assert.end();
});

// stripTags
test('Testing .stripTags(String s) method', (assert) => {
  let x = '<a>Hello <b>world</b></a>';
  let a1 = bella.stripTags(x);
  let e1 = 'Hello world';
  assert.deepEquals(a1, e1, `bella.stripTags('${x}') must return ${e1}`);
  assert.end();
});

// escapeHTML
test('Testing .escapeHTML(String s) method', (assert) => {
  let x = '<a>Hello <b>world</b></a>';
  let a1 = bella.escapeHTML(x);
  let e1 = '&lt;a&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/a&gt;';
  assert.deepEquals(a1, e1, `bella.escapeHTML('${x}') must return ${e1}`);

  assert.deepEquals(bella.escapeHTML({}), '', 'bella.escapeHTML({}) must return empty string');
  assert.end();
});
