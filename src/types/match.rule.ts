import { AnyObject } from './any-object';
import { ArgMatcher } from './arg-matcher';
import { SetterFn, SetterFnWrapper } from './setter.fn';

export type MatchExpr = ArgMatcher | any;

export type MatchRule = SetMatchRule | AndMatchRule;

interface MatchRuleBase {
  name?: string;
  when: MatchExpr[] | MatchExpr;
}

export interface SetMatchRule extends MatchRuleBase {
  set: SetterFnWrapper<any[]> | SetterFn | any;
  and?: never;
}

export interface AndMatchRule extends MatchRuleBase {
  and: SubMatchRule[];
  set?: never;
}

export interface SubMatchRule {
  args: AnyObject<MatchExpr[] | MatchExpr>;
  set: SetterFnWrapper<any[]> | SetterFn | any;
}
