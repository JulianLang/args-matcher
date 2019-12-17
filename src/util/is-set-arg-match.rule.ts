import { SetArgsMatchRule } from '../types';
import { isDefined } from './is-defined';

export function isSetArgMatchRule(value: any): value is SetArgsMatchRule<any, any> {
  return isDefined(value) && isDefined(value.set);
}
