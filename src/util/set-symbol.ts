export function setSymbol<T extends symbol, K, V>(symbol: T, on: K, value?: V): K & Record<T, V> {
  if (value === undefined) {
    value = true as any;
  }

  (on as any)[symbol] = value as any;

  return on as K & Record<T, V>;
}
