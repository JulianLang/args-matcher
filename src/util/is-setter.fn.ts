import { SetterFn, SetterFnSymbol } from '../types';
import { hasSymbol } from './has-symbol';

export function isSetterFn(value: any): value is SetterFn {
  return hasSymbol(SetterFnSymbol, value);
}
