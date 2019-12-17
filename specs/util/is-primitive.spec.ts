import { isPrimitive } from '../../src/util';

describe('isPrimitive', () => {
  it('should return true for primitives, false otherwise', () => {
    // arrange, act, assert
    expect(isPrimitive(42)).toBe(true);
    expect(isPrimitive('str')).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(Symbol())).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(null)).toBe(true);

    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
  });
});
