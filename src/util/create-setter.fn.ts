import { AnyObject, Func, SetterFn, SetterFnSymbol } from '../types';
import { setSymbol } from './set-symbol';

export function createSetterFn(fn: Func<[Readonly<AnyObject>, string, any], any>): SetterFn {
  return setSymbol(SetterFnSymbol, fn);
}
