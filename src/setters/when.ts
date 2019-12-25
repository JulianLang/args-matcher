import { AnyObject, Func } from '../types';
import { createSetterFn, isDefined } from '../util';

export const when = (matcher: Func<[any?], boolean> | boolean, setValue: any, elseValue?: any) => {
  return createSetterFn((ctx: Readonly<AnyObject>, name: string, value: any) => {
    if (typeof matcher === 'boolean' && matcher) {
      return setValue;
    } else if (typeof matcher === 'function' && matcher(value)) {
      return setValue;
    } else if (isDefined(elseValue)) {
      // TODO: langju: test this!
      return elseValue;
    }

    return value;
  });
};
