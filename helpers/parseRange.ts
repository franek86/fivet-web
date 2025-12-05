/**
 * Parses a search param string into a number or number range.
 *
 * @param param - string from URL searchParams
 * @param isRange - whether to parse as a range [from, to]
 * @returns number | [number, number] | null
 */

// Overload: when isRange = true → return tuple
export function parseRangeParam(param: string | null, isRange: true): [number, number] | null;

// Overload: when isRange = false → return number
export function parseRangeParam(param: string | null, isRange?: false): number | null;

export function parseRangeParam(param: string | null, isRange = false) {
  if (!param) return null;

  if (isRange) {
    const parts = param.split("-").map(Number);
    if (parts.length === 2 && !parts.some(isNaN)) {
      return [parts[0], parts[1]] as [number, number];
    }
    return null;
  }

  const num = Number(param);
  return isNaN(num) ? null : num;
}
