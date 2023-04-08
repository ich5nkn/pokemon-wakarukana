export type AnyObject = { [key: string]: any };

export type FixedLengthArray<
  T,
  N extends number,
  R extends ReadonlyArray<T> = []
> = R["length"] extends N ? R : FixedLengthArray<T, N, [T, ...R]>;
