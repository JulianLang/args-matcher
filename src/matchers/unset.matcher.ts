import { createMatcher, isDefined } from '../util';

export const unset = createMatcher('UnsetMatcher', unsetMatcher);

function unsetMatcher(arg: any) {
  return !isDefined(arg);
}
