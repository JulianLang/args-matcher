import { ArgMatcherSymbol } from '../types';
import { isDefined, setSymbol } from '../util';

export const unset = setSymbol(ArgMatcherSymbol, unsetMatcher);

function unsetMatcher(arg: any) {
  return !isDefined(arg);
}
