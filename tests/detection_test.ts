import { assertEquals } from "assert";

import {
  hasProperty,
  isArray,
  isBoolean,
  isDate,
  isEmail,
  isEmpty,
  isFunction,
  isInteger,
  isNil,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "../utils/detection.ts";

Deno.test("check if .isNumber() works correctly", async (t) => {
  const positives = [1, 1.5, 0, 9999, -2];
  for (const val of positives) {
    await t.step(`test .isNumber(${val}) --> true`, () => {
      assertEquals(isNumber(val), true);
    });
  }

  const negatives = [{}, [], "", null, undefined];
  for (const val of negatives) {
    await t.step(`test .isNumber(${val}) --> true`, () => {
      assertEquals(isNumber(val), false);
    });
  }
});

Deno.test("check if .isInteger() works correctly", async (t) => {
  const positives = [1, 1000, 9999, 0, -3];
  for (const val of positives) {
    await t.step(`test .isInteger(${val}) --> true`, () => {
      assertEquals(isInteger(val), true);
    });
  }

  const negatives = [1.5, -3.2, "", undefined];
  for (const val of negatives) {
    await t.step(`test .isInteger(${val}) --> true`, () => {
      assertEquals(isInteger(val), false);
    });
  }
});

Deno.test("check if .isArray() works correctly", async (t) => {
  const positives = [[], [1, 2, 3], Array.from(new Set())];
  for (const val of positives) {
    await t.step(`test .isArray(${val}) --> true`, () => {
      assertEquals(isArray(val), true);
    });
  }

  const negatives = [1.5, "", undefined];
  for (const val of negatives) {
    await t.step(`test .isArray(${val}) --> true`, () => {
      assertEquals(isArray(val), false);
    });
  }
});

Deno.test("check if .isString() works correctly", async (t) => {
  const positives = ["", "abc xyz", "10000"];
  for (const val of positives) {
    await t.step(`test .isString(${val}) --> true`, () => {
      assertEquals(isString(val), true);
    });
  }

  const negatives = [{}, 30, [], 1.5, null, undefined];
  for (const val of negatives) {
    await t.step(`test .isString(${val}) --> true`, () => {
      assertEquals(isString(val), false);
    });
  }
});

Deno.test("check if .isBoolean() works correctly", async (t) => {
  const positives = [true, false];
  for (const val of positives) {
    await t.step(`test .isBoolean(${val}) --> true`, () => {
      assertEquals(isBoolean(val), true);
    });
  }

  const negatives = [{}, [], "", 1, 0, null, undefined];
  for (const val of negatives) {
    await t.step(`test .isBoolean(${val}) --> true`, () => {
      assertEquals(isBoolean(val), false);
    });
  }
});

Deno.test("check if .isNull() works correctly", async (t) => {
  const positives = [null];
  for (const val of positives) {
    await t.step(`test .isNull(${val}) --> true`, () => {
      assertEquals(isNull(val), true);
    });
  }

  const negatives = [{}, [], "", 0, undefined];
  for (const val of negatives) {
    await t.step(`test .isNull(${val}) --> true`, () => {
      assertEquals(isNull(val), false);
    });
  }
});

Deno.test("check if .isUndefined() works correctly", async (t) => {
  let v;
  const positives = [undefined, v];
  for (const val of positives) {
    await t.step(`test .isUndefined(${val}) --> true`, () => {
      assertEquals(isUndefined(val), true);
    });
  }

  const negatives = [{}, [], "", 0, null];
  for (const val of negatives) {
    await t.step(`test .isUndefined(${val}) --> true`, () => {
      assertEquals(isUndefined(val), false);
    });
  }
});

Deno.test("check if .isNil() works correctly", async (t) => {
  let v;
  const positives = [undefined, v, null];
  for (const val of positives) {
    await t.step(`test .isNil(${val}) --> true`, () => {
      assertEquals(isNil(val), true);
    });
  }

  const negatives = [{}, [], "", 0];
  for (const val of negatives) {
    await t.step(`test .isNil(${val}) --> true`, () => {
      assertEquals(isNil(val), false);
    });
  }
});

Deno.test("check if .isFunction() works correctly", async (t) => {
  const positives = [function () {}, () => {}];
  for (const val of positives) {
    await t.step(`test .isFunction(${val}) --> true`, () => {
      assertEquals(isFunction(val), true);
    });
  }

  const negatives = [{}, [], "", 0, null];
  for (const val of negatives) {
    await t.step(`test .isFunction(${val}) --> true`, () => {
      assertEquals(isFunction(val), false);
    });
  }
});

Deno.test("check if .isObject() works correctly", async (t) => {
  const ob = new Object();
  const positives = [{}, ob, Object.create({})];
  for (const val of positives) {
    await t.step(`test .isObject(${val}) --> true`, () => {
      assertEquals(isObject(val), true);
    });
  }

  const negatives = [17, [], "", 0, null, () => {}, true];
  for (const val of negatives) {
    await t.step(`test .isObject(${val}) --> true`, () => {
      assertEquals(isObject(val), false);
    });
  }
});

Deno.test("check if .isDate() works correctly", async (t) => {
  const dt = new Date();
  const positives = [dt];
  for (const val of positives) {
    await t.step(`test .isDate(${val}) --> true`, () => {
      assertEquals(isDate(val), true);
    });
  }

  const negatives = [17, [], "", 0, null, () => {}, true, {}, dt.toUTCString()];
  for (const val of negatives) {
    await t.step(`test .isDate(${val}) --> true`, () => {
      assertEquals(isDate(val), false);
    });
  }
});

Deno.test("check if .isEmail() works correctly", async (t) => {
  const positives = ["admin@pwshub.com", "abc@qtest.com"];
  for (const val of positives) {
    await t.step(`test .isEmail(${val}) --> true`, () => {
      assertEquals(isEmail(val), true);
    });
  }

  const negatives = [{}, [], "", 0, undefined, "a23b@qtest@com"];
  for (const val of negatives) {
    await t.step(`test .isEmail(${val}) --> true`, () => {
      assertEquals(isEmail(val), false);
    });
  }
});

Deno.test("check if .isEmpty() works correctly", async (t) => {
  const positives = ["", 0, {}, [], undefined, null];
  for (const val of positives) {
    await t.step(`test .isEmpty(${val}) --> true`, () => {
      assertEquals(isEmpty(val), true);
    });
  }

  const negatives = [{ a: 1 }, "12", 9, [7, 1]];
  for (const val of negatives) {
    await t.step(`test .isEmpty(${val}) --> true`, () => {
      assertEquals(isEmpty(val), false);
    });
  }
});

Deno.test("check if .hasProperty() works correctly", async (t) => {
  const obj = {
    name: "alice",
    age: 17,
  };
  const positives = ["name", "age"];
  for (const val of positives) {
    await t.step(`test .hasProperty(${val}) --> true`, () => {
      assertEquals(hasProperty(obj, val), true);
    });
  }

  const negatives = ["email", "__proto__"];
  for (const val of negatives) {
    await t.step(`test .hasProperty(${val}) --> true`, () => {
      assertEquals(hasProperty(obj, val), false);
    });
  }
});
