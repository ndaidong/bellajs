import { assertEquals } from "assert";

import { curry } from "../utils/curry.ts";

Deno.test("check if .curry() works correctly", () => {
  const sum = curry((a: number, b: number, c: number): number => {
    return a + b + c;
  });
  assertEquals(sum(3)(2)(1), 6);
  assertEquals(sum(1)(2)(3), 6);
  assertEquals(sum(1, 2)(3), 6);
  assertEquals(sum(1)(2, 3), 6);
  assertEquals(sum(1, 2, 3), 6);
});
