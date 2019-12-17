import { ArgMatcher, ArgMatcherSymbol, Func } from '../types';
import { setSymbol } from './set-symbol';

export function createMatcher(withName: string, fn: Func<[any?], boolean>): ArgMatcher {
  return setSymbol(ArgMatcherSymbol, fn, withName) as any;
}
