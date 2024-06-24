import { assertEquals, assertStringIncludes } from "assert";

import {
  AnyObject,
  clone,
  copies,
  hasProperty,
  pick,
  sort,
  sortBy,
  unique,
} from "../mod.ts";

Deno.test("check if .clone() works correctly", async (t) => {
  await t.step(`check if .clone(object) works correctly`, () => {
    const x: any = {
      level: 4,
      IQ: 140,
      epouse: {
        name: "Alice",
        age: 27,
      },
      birthday: new Date(),
      a: 0,
      clone: false,
      reg: /^\w+@\s([a-z])$/gi,
    };
    const y = clone(x);
    Object.keys(x).forEach((k) => {
      assertEquals(hasProperty(y, k), true);
    });
    Object.keys(x.epouse).forEach((k) => {
      assertEquals(hasProperty(y.epouse, k), true);
      assertEquals(y.epouse[k], x.epouse[k as keyof typeof x.epouse]);
    });

    // check immutability
    y.epouse.age = 25;
    assertEquals(y.epouse.age, 25);
    assertEquals(x.epouse.age, 27);
  });

  await t.step(`check if .clone(array) works correctly`, () => {
    const x: any[] = [
      1,
      5,
      0,
      "a",
      -10,
      "-10",
      "",
      {
        a: 1,
        b: "Awesome",
      },
      [
        5,
        6,
        8,
        {
          name: "Lys",
          age: 11,
        },
      ],
    ];
    const y = clone(x);
    assertEquals(y.length, x.length);
    for (let i = 0; i < x.length; i++) {
      assertEquals(x[i], y[i]);
    }

    // check immutability
    y[8][3].age = 10;
    assertEquals(y[8][3].age, 10);
    assertEquals(x[8][3].age, 11);
  });
});

Deno.test("check if .copies() works correctly", async (t) => {
  await t.step(`copies: simple copy`, () => {
    const source: AnyObject = { a: 1, b: 2, c: 3 };
    const dest: AnyObject = { a: 10, b: 20, d: 40 };
    const result = copies(source, dest);
    const expected: AnyObject = { a: 1, b: 2, d: 40, c: 3 };
    assertEquals(result, expected);
  });

  await t.step(`copies: with matched`, () => {
    const source: AnyObject = { a: 1, b: 2, c: 3 };
    const dest: AnyObject = { a: 10, b: 20, d: 40 };
    const result = copies(source, dest, true);
    const expected: AnyObject = { a: 1, b: 2, d: 40 };
    assertEquals(result, expected);
  });

  await t.step(`copies: with excepts`, () => {
    const source: AnyObject = { a: 1, b: 2, c: 3 };
    const dest: AnyObject = { a: 10, b: 20, d: 40 };
    const result = copies(source, dest, false, ["b", "c"]);
    const expected: AnyObject = { a: 1, b: 20, d: 40 };
    assertEquals(result, expected);
  });

  await t.step(`copies: nested objects`, () => {
    const source: AnyObject = { a: 1, b: { b1: 2, b2: 3 }, c: 4 };
    const dest: AnyObject = { a: 10, b: { b1: 20, b2: 30 }, d: 50 };
    const result = copies(source, dest);
    const expected: AnyObject = { a: 1, b: { b1: 2, b2: 3 }, c: 4, d: 50 };
    assertEquals(result, expected);
  });

  await t.step(`copies: nested arrays`, () => {
    const source: AnyObject = { a: 1, b: [2, 3], c: 4 };
    const dest: AnyObject = { a: 10, b: [20, 30], d: 50 };
    const result = copies(source, dest);
    const expected: AnyObject = { a: 1, b: [2, 3], c: 4, d: 50 };
    assertEquals(result, expected);
  });
});

Deno.test("check if .unique(array) works correctly", () => {
  const arr = [1, 1, 2, 2, 3, 4, 5, 5, 6, 3, 5, 4];
  const uniqArr = unique(arr);
  assertEquals(uniqArr.length, 6);
});

Deno.test("check if .sort(array) works correctly", () => {
  const arr = [6, 4, 8, 2];
  const sortedArr = sort(arr);
  assertEquals(sortedArr.join(""), "2468");
});

Deno.test("check if .sortBy(array) works correctly", () => {
  const arr = [
    { age: 5, name: "E" },
    { age: 9, name: "B" },
    { age: 3, name: "A" },
    { age: 12, name: "D" },
    { age: 7, name: "C" },
  ];
  const sortedByAge = [
    { age: 3, name: "A" },
    { age: 5, name: "E" },
    { age: 7, name: "C" },
    { age: 9, name: "B" },
    { age: 12, name: "D" },
  ];
  const sortedArr = sortBy(arr, 1, "age");
  assertEquals(JSON.stringify(sortedArr), JSON.stringify(sortedByAge));

  const sortedByNonExistKey = sortBy(arr, 1, "balance");
  assertEquals(JSON.stringify(sortedByNonExistKey), JSON.stringify(arr));
});

Deno.test("check if .pick() works correctly", async (t) => {
  await t.step(`check if .pick(array) works correctly`, () => {
    const str = "abcdefghijklmnopqrstuvwxyz";
    const arr = str.split("");
    const uniqChar = pick(arr)[0];
    assertStringIncludes(str, uniqChar);
  });

  await t.step(`check if .pick(array, count) works correctly`, () => {
    const str = "abcdefghijklmnopqrstuvwxyz";
    const arr = str.split("");
    const picked = pick(arr, 10);
    assertEquals(picked.length, 10);
  });
});
