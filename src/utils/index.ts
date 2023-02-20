export const randomPick = <T>(arr: Array<T>): T | undefined => {
  if (!arr.length) return;
  return arr[Math.floor(Math.random() * arr.length)];
};
