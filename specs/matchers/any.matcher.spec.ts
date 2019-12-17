import { any } from '../../src';

describe('any', () => {
  it('should match any value', () => {
    // arrange, act, assert
    const matcher = any();

    expect(matcher(null)).toBe(true);
    expect(matcher(undefined)).toBe(true);
    expect(matcher({})).toBe(true);
    expect(matcher([])).toBe(true);
    expect(matcher(Symbol())).toBe(true);
    expect(matcher(42)).toBe(true);
    expect(matcher(false)).toBe(true);
    expect(matcher('str')).toBe(true);
    expect(matcher(() => {})).toBe(true);
  });
});
