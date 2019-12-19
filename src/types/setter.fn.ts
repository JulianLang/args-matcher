import { SetterFnSymbol } from './symbols';

export interface SetterFn<T = any> {
  (...params: any[]): SetterExecFn<T>;
}

export interface SetterExecFn<T = any> {
  [SetterFnSymbol]: true;
  (ctx: any, name: string, value: T): any;
}
