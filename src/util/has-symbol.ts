import { isDefined } from './is-defined';

export function hasSymbol(symbol: symbol, on: any): boolean {
  if (!isDefined(on)) {
    return false;
  }

  return isDefined(on[symbol]);
}
