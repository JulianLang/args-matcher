import { ArgMatcherSymbol } from './symbols';

export interface ArgMatcher<T = any, R = any> {
  [ArgMatcherSymbol]: string;
  (value?: T): R;
}
