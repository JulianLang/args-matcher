import { ArgMatcherSymbol } from '../../src';
import { isArgMatcher, setSymbol } from '../../src/util';

describe('isArgMatcher', () => {
  it('should return true for values having ArgMatcherSymbol, false otherwise', () => {
    // arrange, act, assert
    expect(isArgMatcher({ [ArgMatcherSymbol]: true })).toBe(true);
    expect(isArgMatcher(setSymbol(ArgMatcherSymbol, () => {}))).toBe(true);

    expect(isArgMatcher(null)).toBe(false);
    expect(isArgMatcher(undefined)).toBe(false);
    expect(isArgMatcher([])).toBe(false);
    expect(isArgMatcher({})).toBe(false);
    expect(isArgMatcher(42)).toBe(false);
    expect(isArgMatcher('str')).toBe(false);
    expect(isArgMatcher(true)).toBe(false);
    expect(isArgMatcher(() => {})).toBe(false);
  });
});
