import { isDefined } from './is-defined';

export function setSymbol<T extends symbol, K, V>(symbol: T, on: K, value?: V): K & Record<T, V> {
  if (!isDefined(value)) {
    value = true as any;
  }

  (on as any)[symbol] = value as any;

  return on as K & Record<T, V>;
}
