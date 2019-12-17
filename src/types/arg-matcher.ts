import { ArgMatcherSymbol } from './symbols';

export interface ArgMatcher<T, R> {
  [ArgMatcherSymbol]: string;
  (value?: T): R;
}
