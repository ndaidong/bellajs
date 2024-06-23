import { assertEquals } from "assert";

import { maybe } from "../utils/maybe.ts";

Deno.test("check if .maybe() works correctly", () => {
  const plus5 = (x: number): number => x + 5;
  const minus2 = (x: number): number => x - 2;
  const isNumber = (x: any): boolean => Number(x) === x;
  const toString = (x: string): string => "The value is " + String(x);
  const getDefault = (): string => "This is default value";

  const x1 = maybe(5)
    .if(isNumber)
    .map(plus5)
    .map(minus2)
    .map(toString)
    .else(getDefault)
    .value();
  assertEquals(x1, "The value is 8");

  const x2 = maybe("nothing")
    .if(isNumber)
    .map(plus5)
    .map(minus2)
    .map(toString)
    .else(getDefault)
    .value();
  assertEquals(x2, "This is default value");
});
