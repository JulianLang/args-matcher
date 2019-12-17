import { ArgMatcher, ArgMatcherSymbol, ArgumentValueSymbol } from '../types';
import { createMatcher, hasSymbol, isDefined, isPrimitive, setSymbol } from '../util';

export const optional = setSymbol(ArgMatcherSymbol, optionalMatcher);

function optionalMatcher(arg: any): ArgMatcher {
  if (!isDefined(arg) || isPrimitive(arg) || hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`optional-Matcher expects another matcher as argument: optional(MatcherFn)`);
  }

  return createMatcher('OptionalMatcher', (a: any) => arg(a) || !isDefined(a));
}
