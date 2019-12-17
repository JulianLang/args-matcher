import { Func } from './func';
import { ArgMatcherSymbol } from './symbols';

export interface ArgMatcher {
  [ArgMatcherSymbol]: string;
  <T>(value?: T): T | Func<[any?], T>;
}
