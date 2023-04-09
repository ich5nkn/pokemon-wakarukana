import { FixedLengthArray } from "@/types/utils";

export const randomPick = <T>(arr: Array<T>): T | undefined => {
  if (!arr.length) return;
  return arr[Math.floor(Math.random() * arr.length)];
};

export const shuffleArray = <T extends Array<any>>(array: T): T => {
  const shuffledArray: T = [...array] as T;
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const randomMultiplePick = <T, N extends number>(
  array: T[],
  count: N
): FixedLengthArray<T, N> => {
  const shuffledArray = shuffleArray(array);
  return shuffledArray.slice(0, count) as FixedLengthArray<T, N>;
};

export const replaceIsNaN = (
  num: number,
  replace?: number | string
): number | string => {
  if (!isNaN(num)) return num;
  return replace === undefined ? 0 : replace;
};
