/**
 * Helper to parse a numeric param into number | null
 */
const parseNumberParam = (value: string | null): number | null => {
  if (!value) return null;
  const n = Number(value);
  return isNaN(n) ? null : n;
};

/**
 * Helper to parse a numeric range param (e.g. beam, price)
 */
export const parseRangeParam = (param: string | null, defaultRange: [number, number]): [number, number] => {
  if (!param) return defaultRange;

  const parts = param.split(",").map(Number);
  if (parts.length === 2 && !parts.some(isNaN)) return [parts[0], parts[1]];

  return defaultRange;
};
