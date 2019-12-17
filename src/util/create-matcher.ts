import { ArgMatcherSymbol, Func } from '../types';
import { setSymbol } from './set-symbol';

export function createMatcher(withName: string, fn: Func<[any], boolean>) {
  return setSymbol(ArgMatcherSymbol, fn, withName);
}
