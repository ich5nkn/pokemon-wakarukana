export const randomPick = <T>(arr: Array<T>): T | null => {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
};
