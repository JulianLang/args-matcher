import { createMatcher, isDefined } from '../util';

export const optional = createMatcher('OptionalMatcher', optionalMatcher);

function optionalMatcher(arg: any) {
  if (arg === undefined) {
    throw new Error(`optional-Matcher expects another matcher as argument: optional(MatcherFn)`);
  }

  return createMatcher('OptionalMatcher', (a: any) => arg(a) || !isDefined(a));
}
