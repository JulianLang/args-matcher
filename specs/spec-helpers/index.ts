import { ArgMatcher, ArgMatcherSymbol, ArgumentSymbol } from '../../src';
import { createMatcher, isDefined, setSymbol } from '../../src/util';

export const is42Fn = (a: number) => a === 42;
export const is42Matcher = createMatcher('Is42', is42Fn);

export function testThrowForArgumentCall(matcher: ArgMatcher) {
  it('should throw if called with ArgumentSymbol', () => {
    // arrange, act, assert
    expect(() => matcher({ [ArgumentSymbol]: true })).toThrow();
  });
}

export function spy(name?: string, fn?: jasmine.Func): jasmine.Spy {
  return jasmine.createSpy(name, fn);
}

export function spyMatcher(returnValue?: boolean, name?: string, fn?: jasmine.Func): jasmine.Spy {
  const spyInstance = isDefined(returnValue)
    ? spy(name, fn).and.returnValue(returnValue)
    : spy(name, fn);

  return setSymbol(ArgMatcherSymbol, spyInstance);
}
