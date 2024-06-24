import { assertEquals } from "assert";

import { genid, randint } from "../utils/random.ts";

Deno.test("check if .randint() works correctly", async (t) => {
  const randArr: number[] = [];
  while (randArr.length < 20) {
    randArr.push(randint());
  }

  await t.step(`.randint() after ${randArr.length} times`, () => {
    assertEquals(randArr.length, 20);
    const uniqVal = Array.from(new Set(randArr));
    assertEquals(uniqVal.length > 10, true);
  });

  await t.step(".randint() with min = max", () => {
    const q = randint(10, 10);
    assertEquals(q, 10);
  });

  const min = 50;
  const max = 80;
  await t.step(`.randint() between ${min} - ${max}`, () => {
    for (let i = 0; i < 100; i++) {
      const q = randint(min, max);
      assertEquals(q >= min, true);
      assertEquals(q <= max, true);
    }
  });
});

Deno.test("check if .genid() works correctly", async (t) => {
  const randArr: number[] = [];
  while (randArr.length < 20) {
    randArr.push(randint());
  }

  await t.step(".genid() default param", () => {
    const actual = genid();
    assertEquals(actual.length, 32);
  });

  await t.step(".genid(512) default param", () => {
    const actual = genid(512);
    assertEquals(actual.length, 512);
  });

  const len = 100;
  const ids = [];
  while (ids.length < len) {
    ids.push(genid());
  }
  const uniques = Array.from(new Set(ids));

  await t.step(`.genid() always return unique string`, () => {
    assertEquals(ids.length, len);
    assertEquals(uniques.length, len);
  });
});
