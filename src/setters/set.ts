import { SetterFn, SetterFnWrapper, SetterLikeFn } from '../types';
import { createSetterFn, isSetterFn } from '../util';

export const set: SetterFnWrapper<[SetterLikeFn]> = (setFn: SetterLikeFn) => {
  return createSetterFn((ctx: any, name: string, value: any) => {
    let currentValue: SetterFn | any = setFn;

    do {
      currentValue = currentValue(ctx, name, value);
    } while (isSetterFn(currentValue));

    return currentValue;
  });
};
