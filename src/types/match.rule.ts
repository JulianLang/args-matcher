import { ArgMatcher } from './arg-matcher';
import { SetterFn } from './setter.fn';

export type MatchExpr = ArgMatcher | any;
export interface MatchRule {
  name?: string;
  when: MatchExpr[] | MatchExpr;
  set: SetterFn | any;
}
