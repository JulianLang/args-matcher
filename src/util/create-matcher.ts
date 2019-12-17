import { ArgMatcher, ArgMatcherSymbol, Func } from '../types';
import { setSymbol } from './set-symbol';

export function createMatcher<T, R>(withName: string, fn: Func<[T], R>): ArgMatcher<T, R> {
  return setSymbol(ArgMatcherSymbol, fn, withName) as any;
}
