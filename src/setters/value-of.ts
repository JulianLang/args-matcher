import { SetterFn } from '../types';
import { createSetterFn } from '../util';

export function valueOf(targetName: string): SetterFn {
  return createSetterFn((ctx, name, value) => {
    return (ctx as any)[targetName];
  });
}
