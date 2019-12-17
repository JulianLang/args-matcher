import { ArgMatcher, ArgMatcherSymbol } from '../types';
import { createMatcher, isDefined, setSymbol } from '../util';

export const any = setSymbol(ArgMatcherSymbol, anyMatcher);

function anyMatcher(arg: any): ArgMatcher {
  if (isDefined(arg)) {
    throw new Error(`any-Matcher does not expect any arguments. Use it like this: "[any, ...]".`);
  }

  return createMatcher('AnyMatcher', () => true);
}
