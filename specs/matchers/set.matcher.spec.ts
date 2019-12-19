import { set } from '../../src';

describe('set', () => {
  it('should match for null and undefined but not for defined values', () => {
    // arrange, act, assert
    expect(set(undefined)).toBe(false);
    expect(set(null)).toBe(false);
    expect(set(42)).toBe(true);
    expect(set('str')).toBe(true);
    expect(set(true)).toBe(true);

    // do not call with non-primitives, as it is expected to throw (see other test).
  });

  it('should throw if called directly with non-primitive-arguments not having the ArgumentSymbol', () => {
    // arrange, act, assert
    expect(() => set({})).toThrow();
    expect(() => set(() => {})).toThrow();
    expect(() => set([])).toThrow();
  });
});
