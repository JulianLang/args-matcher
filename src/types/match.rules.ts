import { ParentMatchRule } from './match.rule';

export interface MatchRules {
  [propertyName: string]: ParentMatchRule[];
}
