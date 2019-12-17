import { ArgMatcher, ArgMatcherSymbol } from '../types';
import { createMatcher, setSymbol } from '../util';

export const any = setSymbol(ArgMatcherSymbol, anyMatcher);

function anyMatcher(): ArgMatcher {
  return createMatcher('AnyMatcher', () => true);
}
