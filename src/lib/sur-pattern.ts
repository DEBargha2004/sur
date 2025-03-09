import { Sur } from "@/schema/sur";

/**
 *
 * @description surInputArray is an array of sur symbols
 * @description maxSurValue is the maximum sur index to generate
 */
export function surPattern({
  matra = 1,
  raag,
  maxSurValue,
}: {
  matra: number;
  raag: Sur[];
  maxSurValue?: number;
}): Promise<string[][]> {
  type SurValue = number | null;

  const INITIATOR: SurValue[] = [0];
  const FOLLOWER: SurValue[] = Array.from({ length: raag.length + 1 }, (_, i) =>
    i === 0 ? null : i - 1
  );

  const MAX_SUR_VALUE = Math.min(
    maxSurValue || raag.length - 1,
    raag.length - 1
  );

  console.log({ matra, raag, maxSurValue, MAX_SUR_VALUE, FOLLOWER });

  const patternCache = new Map<number, SurValue[][]>();

  return new Promise((res, rej) => {
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

    const patterns = generatePatterns(matra, INITIATOR);

    const surArrays = patterns.map((pattern) => {
      const nonNullValues = pattern.filter((i): i is number => i !== null);
      const maxVal = Math.max(...nonNullValues);
      const maxStep = MAX_SUR_VALUE - maxVal;

      return Array.from({ length: maxStep + 1 }, (_, step) =>
        pattern.map((i) => (i !== null ? raag[i + step] : "-")).join("")
      );
    });

    res(surArrays);
  });
}
