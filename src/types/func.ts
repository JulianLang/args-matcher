export interface Func<T extends any[], R> {
  (...args: T): R;
}
