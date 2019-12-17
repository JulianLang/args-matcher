import { optional } from '../../src';
import { is42Matcher, testThrowForArgumentCall } from '../spec-helpers';

describe('optional', () => {
  it('should accept another matcher', () => {
    // arrange, act
    const matcher = optional(is42Matcher);

    // assert
    expect(matcher(null)).toBe(true);
    expect(matcher(undefined)).toBe(true);
    expect(matcher(42)).toBe(true);
    expect(matcher(4711)).toBe(false);
  });

  it('should throw if called with undefined', () => {
    // arrange, act, assert
    expect(() => optional(undefined)).toThrow();
  });

  it('should not throw if called with constant', () => {
    // arrange, act, assert
    expect(() => optional(42)).not.toThrow();
  });

  testThrowForArgumentCall(optional);
});
