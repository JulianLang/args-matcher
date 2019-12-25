import { AnyObject, SetterFn } from '../types';
import { createSetterFn, isDefined } from '../util';

export function moveTo(targetName: string, props?: AnyObject): SetterFn {
  return createSetterFn((ctx, name, value) => {
    const target = (ctx as any)[targetName];

    if (Array.isArray(target)) {
      target.push(value);
    } else if (typeof target === 'object') {
      target[name] = value;
    } else {
      (ctx as any)[targetName] = value;
    }

    if (isDefined(props)) {
      for (const property of Object.keys(props)) {
        if (property === name) {
          return props[property];
        }
      }
    }

    return undefined;
  });
}
