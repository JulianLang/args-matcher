import { isPrimitive } from 'util';
import { ArgMatcher, ArgMatcherSymbol, ArgumentValueSymbol } from '../types';
import { createMatcher, hasSymbol, isDefined, setSymbol } from '../util';

export const is = setSymbol(ArgMatcherSymbol, isMatcher);

function isMatcher(arg: any): ArgMatcher {
  if (!isDefined(arg) || isPrimitive(arg) || hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`is-Matcher expects another matcher as argument: is(MatcherFn)`);
  }

  return hasSymbol(ArgMatcherSymbol, arg) ? arg : createMatcher('IsMatcher', arg);
}
