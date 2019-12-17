import { ArgMatcherSymbol } from '../../src';
import { createMatcher, hasSymbol } from '../../src/util';

describe('createMatcher', () => {
  it('should set the ArgMatcherSymbol', () => {
    // arrange, act
    const matcher = createMatcher('', () => true);

    // assert
    expect(hasSymbol(ArgMatcherSymbol, matcher)).toBe(true);
  });
});
