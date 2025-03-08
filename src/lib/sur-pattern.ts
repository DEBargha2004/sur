export function surPattern() {
  type SurValue = number | null;

  const INITIATOR: SurValue[] = [0];
  const FOLLOWER: SurValue[] = [null, 0, 1, 2, 3, 4, 5, 6, 7];
  const SUR_SYMBOLS = ["সা", "রে", "গা", "মা", "পা", "ধা", "নি", "সাঁ"];
  const MAX_SUR_VALUE = 7;

  const patternCache = new Map<number, SurValue[][]>();

  function generatePatterns(matra: number, arr: SurValue[]): SurValue[][] {
    if (matra === 0) return [];

    const key = matra;
    const cached = patternCache.get(key);
    if (cached) return cached;

    const collector: SurValue[][] = [];

    arr.forEach((sur) => {
      const childPatterns = generatePatterns(matra - 1, FOLLOWER);
      if (childPatterns.length === 0) {
        collector.push([sur]);
      } else {
        childPatterns.forEach((pattern) => collector.push([sur, ...pattern]));
      }
    });

    patternCache.set(key, collector);
    return collector;
  }

  const patterns = generatePatterns(3, INITIATOR);

  const surArrays = patterns.map((pattern) => {
    const nonNullValues = pattern.filter((i): i is number => i !== null);
    const maxVal = Math.max(...nonNullValues);
    const maxStep = MAX_SUR_VALUE - maxVal;

    return Array.from({ length: maxStep + 1 }, (_, step) =>
      pattern.map((i) => (i !== null ? SUR_SYMBOLS[i + step] : "-")).join("")
    );
  });

  return surArrays;
}
