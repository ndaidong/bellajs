import { assertEquals } from "assert";

import {
  escapeHTML,
  slugify,
  stripTags,
  truncate,
  ucfirst,
  ucwords,
  unescapeHTML,
} from "../utils/string.ts";

Deno.test("check if .truncate() works correctly", async (t) => {
  const inputs = [
    {
      text:
        "If a property is non-configurable, its writable attribute can only be changed to false.",
      limit: 60,
      expectation:
        "If a property is non-configurable, its writable attribute...",
    },
    {
      text: "this string is less than limit",
      limit: 100,
      expectation: "this string is less than limit",
    },
    {
      text: "uyyiyirwqyiyiyrihklhkjhskdjfhkahfiusayiyfiudyiyqwiyriuqyiouroiuyi",
      limit: 20,
      expectation: "uyyiyirwqyiyiyrih...",
    },
  ];

  let k = 1;
  for (const input of inputs) {
    const { text, limit, expectation } = input;
    await t.step(`  check .truncate($${k})`, () => {
      const actual = truncate(text, limit);
      assertEquals(actual, expectation);
    });
    k++;
  }
});

Deno.test("check if .stripTags() works correctly", () => {
  const actual = stripTags("<a>Hello <b>world</b></a>");
  assertEquals(actual, "Hello world");
});

Deno.test("check if .escapeHTML() works correctly", () => {
  const actual = escapeHTML("<a>Hello <b>world</b></a>");
  assertEquals(actual, "&lt;a&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/a&gt;");
});

Deno.test("check if .unescapeHTML() works correctly", () => {
  const actual = unescapeHTML(
    "&lt;a&gt;Hello &lt;b&gt;world&lt;/b&gt;&lt;/a&gt;",
  );
  assertEquals(actual, "<a>Hello <b>world</b></a>");
});

Deno.test("check if .ucfirst() works correctly", () => {
  const actual = ucfirst("HElLo wOrLd");
  assertEquals(actual, "Hello world");
});

Deno.test("check if .ucwords() works correctly", () => {
  const actual = ucwords("HElLo wOrLd");
  assertEquals(actual, "Hello World");
});

Deno.test("check if .slugify() works correctly", () => {
  assertEquals(
    slugify("Sur l'année 2015"),
    "sur-lannee-2015",
  );
  assertEquals(
    slugify('Nghị luận tác phẩm "Đường kách mệnh" của Hồ Chí Minh?!'),
    "nghi-luan-tac-pham-duong-kach-menh-cua-ho-chi-minh",
  );
});
