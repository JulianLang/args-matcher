import { ArgMatcherSymbol } from './symbols';

export interface ArgMatcher {
  [ArgMatcherSymbol]: string;
  (value?: any): boolean;
}
