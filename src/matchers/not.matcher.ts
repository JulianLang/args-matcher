import { ArgumentValueSymbol } from '../types';
import { createMatcher, hasSymbol } from '../util';

export const not = createMatcher('NotMatcher', notMatcher);

function notMatcher(arg: any) {
  if (hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`not-Matcher expects another matcher as argument: not(MatcherFn)`);
  }

  const matcher = typeof arg === 'function' ? arg : (a: any) => a === arg;

  return createMatcher('NotMatcher', (a: any) => !matcher(a));
}
