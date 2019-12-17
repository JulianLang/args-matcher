import { Func, SetterFnSymbol } from '../types';
import { setSymbol } from '../util';

export const when = (matcher: Func<[any?], boolean>, setValue: any) => {
  const whenFn = (name: string, value: any, ctx: any) => {
    if (matcher(value)) {
      return setValue;
    }

    return value;
  };
  setSymbol(SetterFnSymbol, whenFn);

  return whenFn;
};
