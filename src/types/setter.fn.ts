import { AnyObject } from './any-object';
import { SetterFnSymbol } from './symbols';

export type SetterLikeFn<T = any> = (ctx: Readonly<AnyObject>, name: string, value: T) => any;

export interface SetterFnWrapper<T extends any[]> {
  (...params: T): SetterFn;
}

export interface SetterFn<T = any> {
  [SetterFnSymbol]: true;
  (ctx: Readonly<AnyObject>, name: Readonly<string>, value: Readonly<T>): any;
}
