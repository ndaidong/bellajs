// utils / date

import { isObject } from "./detection.ts";

interface DateFormat {
  dateStyle: string;
  timeStyle: string;
}

interface TimeConversions {
  second: number;
  minute: number;
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}

const getDateFormat = (): DateFormat => {
  return {
    dateStyle: "medium",
    timeStyle: "long",
  };
};

const getTimeConvers = (): TimeConversions => {
  return {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    week: 7,
    month: 4,
    year: 12,
  };
};

const isValidLocal = (hl: string): boolean => {
  try {
    const locale = new Intl.Locale(hl);
    return locale.language !== "";
  } catch {
    return false;
  }
};

export const formatDateString = (...args: any[]): string => {
  const input = args[0];
  const lang = isValidLocal(args[1]) ? args[1] : "en";
  const dfmt = getDateFormat();
  const opt = args.length >= 3
    ? args[2]
    : args.length === 1
    ? dfmt
    : isObject(args[1])
    ? args[1]
    : dfmt;
  const dtf = new Intl.DateTimeFormat(lang, opt);
  return dtf.format(new Date(input));
};

export const formatTimeAgo = (
  input: any,
  lang: string = "en",
  justnow: string = "just now",
): string => {
  const t: number = (new Date(input)).getTime();
  let delta: number = Date.now() - t;
  const tcv = getTimeConvers();
  if (delta <= tcv.second) {
    return justnow;
  }
  let unit: any = "second";
  for (const key in tcv) {
    if (delta < tcv[key as keyof typeof tcv]) {
      break;
    } else {
      unit = key;
      delta /= tcv[key as keyof typeof tcv];
    }
  }
  delta = Math.floor(delta);
  const rel = new Intl.RelativeTimeFormat(lang);
  return rel.format(-delta, unit);
};
