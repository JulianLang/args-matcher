import { ArgumentSymbol } from '../types';
import { createMatcher, hasSymbol, isDefined } from '../util';

export const optional = createMatcher('OptionalMatcher', optionalMatcher);

function optionalMatcher(arg: any) {
  if (arg === undefined || hasSymbol(ArgumentSymbol, arg)) {
    throw new Error(
      `optional-Matcher expects another matcher as argument: optional(MatcherFn | value)`,
    );
  }

  return createMatcher('OptionalMatcher', (a: any) => arg(a) || !isDefined(a));
}
