/**
 * Testing
 * @ndaidong
 */

import {test} from 'tap';

import {variants} from '../../config';

const checkCompose = (bella) => {
  const {compose} = bella;

  const f1 = (name) => {
    return `f1 ${name}`;
  };
  const f2 = (name) => {
    return `f2 ${name}`;
  };
  const f3 = (name) => {
    return `f3 ${name}`;
  };

  const addDashes = compose(f1, f2, f3);

  const add3 = (num) => {
    return num + 3;
  };

  const mul6 = (num) => {
    return num * 6;
  };

  const div2 = (num) => {
    return num / 2;
  };

  const sub5 = (num) => {
    return num - 5;
  };

  const calculate = compose(sub5, div2, mul6, add3);

  test('Testing .compose() method', (assert) => {
    const ex = 'f1 f2 f3 Alice';
    assert.deepEquals(addDashes('Alice'), ex, `addDashes('Alice') must return "${ex}"`);

    assert.deepEquals(calculate(5), 19, `calculate(5) must return 19`);
    assert.end();
  });
};

variants.map(checkCompose);
