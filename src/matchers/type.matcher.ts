import { isPrimitive } from 'util';
import { ArgMatcher, ArgMatcherSymbol, ArgumentValueSymbol } from '../types';
import { createMatcher, hasSymbol, isDefined, setSymbol } from '../util';

export const type = setSymbol(ArgMatcherSymbol, typeMatcher);

function typeMatcher(arg: any): ArgMatcher {
  if (!isDefined(arg) || !isPrimitive(arg) || hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`type-Matcher expects a type string as argument: type('function')`);
  }

  return createMatcher('TypeMatcher', (a: any) => typeof a === arg);
}
