/** Replace {placeholders} in a dictionary string */
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

/** Render numbers with Khmer numerals when the locale is Khmer */
export function localizeNumber(value: number | string, locale: string) {
  const s = String(value);
  return locale === "kh" ? s.replace(/\d/g, (d) => khmerDigits[Number(d)]) : s;
}
