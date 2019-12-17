import { isPrimitive } from 'util';
import { ArgumentValueSymbol } from '../types';
import { createMatcher, hasSymbol, isDefined } from '../util';

export const unset = createMatcher('UnsetMatcher', unsetMatcher);

function unsetMatcher(arg: any) {
  if (!isPrimitive(arg) && !hasSymbol(ArgumentValueSymbol, arg)) {
    throw new Error(`unset-Matcher expects no arguments. Use it like that: "[unset, ...]"`);
  }

  return !isDefined(arg);
}
