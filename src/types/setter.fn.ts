import { SetterFnSymbol } from './symbols';

export interface SetterFnWrapper<T = any> {
  (...params: any[]): SetterFn<T>;
}

export interface SetterFn<T = any> {
  [SetterFnSymbol]: true;
  (ctx: any, name: string, value: T): any;
}
