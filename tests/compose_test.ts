import { assertEquals } from "assert";

import { compose } from "../utils/compose.ts";

Deno.test("check if .compose() works correctly", () => {
  const f1 = (name: string): string => {
    return `f1 ${name}`;
  };
  const f2 = (name: string): string => {
    return `f2 ${name}`;
  };
  const f3 = (name: string): string => {
    return `f3 ${name}`;
  };

  const addDashes = compose(f1, f2, f3);
  assertEquals(addDashes("Alice"), "f1 f2 f3 Alice");

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

  const calculate = compose(sub5, div2, mul6, add3);
  assertEquals(calculate(5), 19);
});
