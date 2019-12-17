import { ArgMatcher, ArgMatcherSymbol } from '../types';
import { hasSymbol } from './has-symbol';

export function isArgMatcher(value: any): value is ArgMatcher {
  return hasSymbol(ArgMatcherSymbol, value);
}
