import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number) {
  const intl = Intl.NumberFormat("en-IN", {});

  return intl.format(val);
}

export function segmentWords(text: string) {
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  return Array.from(segmenter.segment(text));
}
