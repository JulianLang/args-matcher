import { not } from '../../src';
import { is42Matcher, testThrowForArgumentCall } from '../spec-helpers';

describe('not', () => {
  it('should accept another matcher and negate its result', () => {
    // arrange, act
    const matcher = not(is42Matcher);

    // assert
    expect(is42Matcher(42)).toBe(true);
    expect(matcher(42)).toBe(false);
    expect(is42Matcher(4711)).toBe(false);
    expect(matcher(4711)).toBe(true);
  });

  testThrowForArgumentCall(not);
});
