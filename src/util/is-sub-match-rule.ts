import { AndMatchRule } from '../types';
import { isDefined } from './is-defined';

export function isSubMatchRule(value: any): value is AndMatchRule {
  return isDefined(value) && Array.isArray(value.and);
}
