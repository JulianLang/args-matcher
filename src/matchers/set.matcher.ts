import { ArgMatcher, ArgumentSymbol } from '../types';
import { createMatcher, hasSymbol, isDefined, isPrimitive } from '../util';

export const set: ArgMatcher = createMatcher('set', (arg: any) => {
  if (!isPrimitive(arg) && !hasSymbol(ArgumentSymbol, arg)) {
    throw new Error(`set-Matcher expects no arguments. Use it like that: "[set, ...]"`);
  }

  return isDefined(arg);
});
