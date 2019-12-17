import { is } from '../../src';
import { is42Fn, is42Matcher, testThrowForArgumentCall } from '../spec-helpers';

describe('is', () => {
  it('should accept custom type-check fns', () => {
    // arrange, act
    const matcher = is(is42Fn);

    // assert
    expect(matcher(42)).toBe(true);
    expect(matcher(4711)).toBe(false);
  });

  it('should accept another matcher', () => {
    // arrange, act
    const matcher = is(is42Matcher);

    // assert
    expect(matcher(42)).toBe(true);
    expect(matcher(4711)).toBe(false);
  });

  testThrowForArgumentCall(is);
});
