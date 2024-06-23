import { assertEquals } from "assert";

import { pipe } from "../utils/pipe.ts";

Deno.test("check if .pipe() works correctly", () => {
  const f1 = (name: string): string => {
    return `f1 ${name}`;
  };
  const f2 = (name: string): string => {
    return `f2 ${name}`;
  };
  const f3 = (name: string): string => {
    return `f3 ${name}`;
  };

  const addDashes = pipe(f1, f2, f3);
  assertEquals(addDashes("Alice"), "f3 f2 f1 Alice");

  const add3 = (num: number): number => {
    return num + 3;
  };

  const mul6 = (num: number): number => {
    return num * 6;
  };

  const div2 = (num: number): number => {
    return num / 2;
  };

  const sub5 = (num: number): number => {
    return num - 5;
  };

  const calculate = pipe(add3, mul6, div2, sub5);
  assertEquals(calculate(5), 19);
});
