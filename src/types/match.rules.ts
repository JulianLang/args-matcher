import { MatchRule } from './match.rule';

export interface MatchRules {
  [propertyName: string]: MatchRule[];
}
