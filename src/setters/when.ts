import { Func, SetterFnWrapper } from '../types';
import { createSetterFn } from '../util';

export const when: SetterFnWrapper = (matcher: Func<[any?], boolean>, setValue: any) => {
  return createSetterFn((ctx: any, name: string, value: any) => {
    if (matcher(value)) {
      ctx[name] = setValue;
    }

    return ctx;
  });
};
