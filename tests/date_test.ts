import { assertEquals } from "assert";

import { formatDateString, formatTimeAgo } from "../utils/date.ts";

Deno.test("check if .formatDateString() works correctly", async (t) => {
  const d = new Date();

  await t.step("  check .formatDateString() with default options", () => {
    const result = formatDateString(d);
    const reg = /^\w+\s\d+,\s+\d{4},\s\d+:\d+:\d+\s(AM|PM)\s(GMT)\+\d+$/;
    assertEquals(result.match(reg) !== null, true);
  });

  await t.step("  check .formatDateString() with custom options", () => {
    const result = formatDateString(d, {
      dateStyle: "full",
      timeStyle: "medium",
      hour12: true,
    });
    const reg = /^\w+,\s\w+\s\d+,\s+\d{4}\sat\s\d+:\d+:\d+\s(AM|PM)$/;
    assertEquals(result.match(reg) !== null, true);
  });

  await t.step(
    "  check .formatDateString() with custom language and options",
    () => {
      const result = formatDateString(d, "en", {
        dateStyle: "full",
        timeStyle: "medium",
        hour12: true,
      });
      const reg = /^\w+,\s\w+\s\d+,\s+\d{4}\sat\s\d+:\d+:\d+\s(AM|PM)$/;
      assertEquals(result.match(reg) !== null, true);
    },
  );
});

Deno.test("check if .formatTimeAgo() works correctly", async (t) => {
  const d = new Date();

  await t.step('  check if .formatTimeAgo() return "just now"', () => {
    const result = formatTimeAgo(d);
    assertEquals(result, "just now");
    const justnowCustomMessage = formatTimeAgo(d, "vi", "vừa mới xong");
    assertEquals(justnowCustomMessage, "vừa mới xong");
  });

  await t.step("  check if .formatTimeAgo() after 5s", () => {
    const t = d.getSeconds();
    d.setSeconds(t - 5);
    const result = formatTimeAgo(d);
    assertEquals(result, "5 seconds ago");
  });

  await t.step("  check if .formatTimeAgo() after 2 days", () => {
    const t = d.getDate();
    d.setDate(t - 2);
    const result = formatTimeAgo(d);
    assertEquals(result, "2 days ago");
  });
});
