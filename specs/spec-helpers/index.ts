import { ArgMatcher, ArgumentValueSymbol } from '../../src';
import { createMatcher } from '../../src/util';

export const is42Fn = (a: number) => a === 42;
export const is42Matcher = createMatcher('Is42', is42Fn);

export function testThrowForArgumentCall(matcher: ArgMatcher) {
  it('should throw if called with ArgumentSymbol', () => {
    // arrange, act, assert
    expect(() => matcher({ [ArgumentValueSymbol]: true })).toThrow();
  });
}
