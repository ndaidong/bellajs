// utils / string

import { hasProperty, isArray, isNumber, isString } from "./detection.ts";

const toString = (input: any): string => {
  return !isString(input) ? String(input) : input;
};

export const truncate = (s: string, len: number = 140): string => {
  const txt = toString(s);
  const txtlen = txt.length;
  if (txtlen <= len) {
    return txt;
  }
  const subtxt = txt.substring(0, len).trim();
  const subtxtArr = subtxt.split(" ");
  const subtxtLen = subtxtArr.length;
  if (subtxtLen > 1) {
    subtxtArr.pop();
    return subtxtArr.map((word: string) => word.trim()).join(" ") + "...";
  }
  return subtxt.substring(0, len - 3) + "...";
};

export const stripTags = (s: string): string => {
  return toString(s).replace(/(<([^>]+)>)/ig, "").trim();
};

export const escapeHTML = (s: string): string => {
  return toString(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

export const unescapeHTML = (s: string): string => {
  return toString(s)
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
};

export const ucfirst = (s: string): string => {
  const x = toString(s).toLowerCase();
  return x.length > 1
    ? x.charAt(0).toUpperCase() + x.slice(1)
    : x.toUpperCase();
};

export const ucwords = (s: string): string => {
  return toString(s).split(" ").map((w: string) => {
    return ucfirst(w);
  }).join(" ");
};

export const replaceAll = (s: string, a: string, b: string): string => {
  return toString(s).replaceAll(a, b);
};

const getCharMap = (): { [key: string]: string } => {
  const lmap: { [key: string]: string } = {
    a: "á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|ä|æ",
    c: "ç",
    d: "đ|ð",
    e: "é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|ë",
    i: "í|ì|ỉ|ĩ|ị|ï|î",
    n: "ñ",
    o: "ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|ö|ø",
    s: "ß",
    u: "ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|û",
    y: "ý|ỳ|ỷ|ỹ|ỵ|ÿ",
  };

  const map: { [key: string]: string } = {
    ...lmap,
  };
  Object.keys(lmap).forEach((k) => {
    const K = k.toUpperCase();
    map[K] = lmap[k].toUpperCase();
  });

  return map;
};

export const stripAccent = (s: string): string => {
  let x = toString(s);

  const updateS = (ai: string, key: string) => {
    x = replaceAll(x, ai, key);
  };

  const map = getCharMap();
  for (const key in map) {
    if (hasProperty(map, key)) {
      const a = map[key].split("|");
      a.forEach((item) => {
        return updateS(item, key);
      });
    }
  }
  return x;
};

export const slugify = (s: string, delimiter: string = "-"): string => {
  return stripAccent(s)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, delimiter)
    .replace(new RegExp(`${delimiter}+`, "g"), delimiter);
};
