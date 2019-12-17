import { type } from '../../src/matchers';
import { testThrowForArgumentCall } from '../spec-helpers';

describe('type', () => {
  it('should compare typeof', () => {
    // arrange, act, assert
    expect(type('boolean')(false)).toBe(true);
    expect(type('boolean')(42)).toBe(false);

    expect(type('function')(() => {})).toBe(true);
    expect(type('function')(42)).toBe(false);

    expect(type('number')(42)).toBe(true);
    expect(type('number')('str')).toBe(false);

    expect(type('object')({})).toBe(true);
    expect(type('object')('str')).toBe(false);

    expect(type('string')('str')).toBe(true);
    expect(type('string')(42)).toBe(false);

    expect(type('symbol')(Symbol('test-symbol'))).toBe(true);
    expect(type('symbol')(42)).toBe(false);

    expect(type('undefined')(undefined)).toBe(true);
    expect(type('undefined')(42)).toBe(false);
  });

  testThrowForArgumentCall(type);
});
