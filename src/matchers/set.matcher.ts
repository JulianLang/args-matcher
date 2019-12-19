import { ArgMatcher } from '../types';
import { createMatcher, isDefined } from '../util';

export const set: ArgMatcher = createMatcher('set', (arg: any) => {
  return isDefined(arg);
});
