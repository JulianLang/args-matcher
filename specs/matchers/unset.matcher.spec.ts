import { unset } from '../../src';

describe('unset', () => {
  it('should match for null and undefined but not for defined values', () => {
    // arrange, act, assert
    expect(unset(undefined)).toBe(true);
    expect(unset(null)).toBe(true);
    expect(unset(42)).toBe(false);
    expect(unset('str')).toBe(false);
    expect(unset(true)).toBe(false);

    // do not call with non-primitives, as it is expected to throw (see other test).
  });

  it('should throw if called directly with non-primitive-arguments not having the ArgumentSymbol', () => {
    // arrange, act, assert
    expect(() => unset({})).toThrow();
    expect(() => unset(() => {})).toThrow();
    expect(() => unset([])).toThrow();
  });
});
