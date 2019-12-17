import { createMatcher } from '../util';

export const any = createMatcher('AnyMatcher', anyMatcher);

function anyMatcher() {
  return createMatcher('AnyMatcher', () => true);
}
