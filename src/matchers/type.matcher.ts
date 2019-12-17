import { isPrimitive } from 'util';
import { ArgumentValueSymbol, TypeOfString } from '../types';
import { createMatcher, hasSymbol, isDefined } from '../util';

export const type = createMatcher('TypeMatcher', typeMatcher);

function typeMatcher(arg: TypeOfString) {
  if (!isDefined(arg) || !isPrimitive(arg) || hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`type-Matcher expects a type string as argument: type('function')`);
  }

  return createMatcher('TypeMatcher', (a: any) => typeof a === arg);
}
