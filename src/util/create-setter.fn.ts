import { AnyObject, Func, SetterFn, SetterFnSymbol } from '../types';
import { setSymbol } from './set-symbol';

export function createSetterFn(fn: Func<[any, string, any], AnyObject>): SetterFn {
  return setSymbol(SetterFnSymbol, fn);
}
