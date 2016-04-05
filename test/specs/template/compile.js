/**
 * Testing
 * @ndaidong
 */

/* eslint no-undefined: 0*/
/* eslint no-array-constructor: 0*/
/* eslint no-new-func: 0*/

import path from 'path';
import test from 'tape';

var rootDir = '../../../src/';

var bella = require(path.join(rootDir, 'bella'));

// isArray
test('Testing .compile(String s, Object date) method:', (assert) => {
  let sample = `
    <article>
      <a href="{link}">{title}</a>
      <p>{content}</p>
      <p>
        <span>{author.name}</span>
        <span>{author.email}</span>
      </p>
    </article>`;

  let data = {
    title: 'Hello world',
    link: 'http://google.com',
    content: 'This is an interesting thing, is that right?',
    author: {
      name: 'Dong Nguyen',
      email: 'ndaidong@gmail.com'
    }
  };

  let expectation = `
    <article>
      <a href="http://google.com">Hello world</a>
      <p>This is an interesting thing, is that right?</p>
      <p>
        <span>Dong Nguyen</span>
        <span>ndaidong@gmail.com</span>
      </p>
    </article>`;

  let result = bella.compile(sample, data);
  assert.equal(result, bella.trim(expectation, true), 'Result must match expectation');
  assert.end();
});
