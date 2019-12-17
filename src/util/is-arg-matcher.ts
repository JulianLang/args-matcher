import { ArgMatcher, ArgMatcherSymbol } from '../types';
import { hasSymbol } from './has-symbol';

export function isArgMatcher(value: any): value is ArgMatcher<any, any> {
  return hasSymbol(ArgMatcherSymbol, value);
}
