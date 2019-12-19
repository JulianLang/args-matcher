import { Func, SetterFn, SetterFnSymbol } from '../types';
import { setSymbol } from '../util';

export const when: SetterFn = (matcher: Func<[any?], boolean>, setValue: any) => {
  return setSymbol(SetterFnSymbol, (ctx: any, name: string, value: any) => {
    if (matcher(value)) {
      ctx[name] = setValue;
    }

    return ctx;
  });
};
