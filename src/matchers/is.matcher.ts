import { isPrimitive } from 'util';
import { ArgMatcher, ArgumentValueSymbol, Func } from '../types';
import { createMatcher, hasSymbol, isArgMatcher, isDefined } from '../util';

export const is = createMatcher('IsMatcher', isMatcher);

function isMatcher(arg: Func<any, boolean>): ArgMatcher<any, boolean> {
  if (!isDefined(arg) || isPrimitive(arg) || hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`is-Matcher expects another matcher as argument: is(MatcherFn)`);
  }

  return isArgMatcher(arg) ? arg : createMatcher('IsMatcher', arg);
}
