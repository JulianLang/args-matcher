import { ArgumentSymbol, createSetterFn, Func, hasSymbol, match, MatchRules } from '../src';
import { is42Matcher, spy, spyMatcher } from './spec-helpers';

describe('match', () => {
  const defaultTestFn = (a: number) => {};

  it('should call setter fns and set "normal" fns', () => {
    // arrange
    const testFn = (a: number | Function) => {};

    const setter = createSetterFn(spy().and.returnValue({ a: 4711 }));
    const normalFn = () => {};

    const ruleWithSetter: MatchRules = {
      a: [
        {
          when: [42],
          // sets "a" to 4711
          set: setter,
        },
      ],
    };
    const ruleWithNormalFn: MatchRules = {
      a: [
        {
          when: [42],
          // sets "a" to normalFn
          set: normalFn,
        },
      ],
    };

    // act
    const result1 = match(testFn, ruleWithSetter, 42);
    const result2 = match(testFn, ruleWithNormalFn, 42);

    // assert
    expect(result1.a).toBe(4711);
    expect(result2.a).toBe(normalFn);
  });

  it('should always call all rules for a property', () => {
    // arrange
    const setter1 = createSetterFn(spy().and.returnValue({}));
    const setter2 = createSetterFn(spy().and.returnValue({}));
    const rules: MatchRules = {
      a: [
        {
          when: [is42Matcher],
          set: setter1,
        },
        {
          when: [is42Matcher],
          set: setter2,
        },
      ],
    };

    // act
    match(defaultTestFn, rules, 42);

    // assert
    expect(rules.a[0].set).toHaveBeenCalledTimes(1);
    expect(rules.a[1].set).toHaveBeenCalledTimes(1);
  });

  it('should call all rules even for args that were not given', () => {
    // arrange
    const testFn = (a: any, b?: any) => {};
    const matcher1 = spyMatcher(false, '1');
    const matcher2 = spyMatcher(false, '2');
    const matcher3 = spyMatcher(false, '3');
    const matcher4 = spyMatcher(true, '4');
    const rules: MatchRules = {
      a: [
        {
          when: [matcher1, matcher2],
          set: null,
        },
      ],
      b: [
        {
          when: [matcher3, matcher4],
          set: null,
        },
      ],
    };

    // act
    match(testFn, rules, 42);

    // assert
    expect(matcher1).toHaveBeenCalledTimes(1);
    expect(matcher2).toHaveBeenCalledTimes(1);
    expect(matcher3).toHaveBeenCalledTimes(1);
    expect(matcher4).toHaveBeenCalledTimes(1);
  });

  it('should jump out early of rules as soon the first matcher matches', () => {
    // arrange
    const matcher1 = spyMatcher(false, '1');
    const matcher2 = spyMatcher(false, '2');
    const matcher3 = spyMatcher(true, '3');
    const matcher4 = spyMatcher(false, '4');

    const rules: MatchRules = {
      '*': [
        {
          when: [matcher1, matcher2],
          set: null,
        },
        {
          when: [matcher3, matcher4],
          set: null,
        },
      ],
    };

    // act
    match(defaultTestFn, rules, 42);

    // assert: 1.x
    expect(matcher1).toHaveBeenCalledTimes(1);
    // should be called as 1.1 didn't failed.
    expect(matcher2).toHaveBeenCalledTimes(1);

    // assert: 2.x
    expect(matcher3).toHaveBeenCalledTimes(1);
    // should not be called since 2.1 already matched.
    expect(matcher4).not.toHaveBeenCalled();
  });

  it('should compare constant values in match with given arg', () => {
    // arrange
    const setterFn = createSetterFn(spy().and.returnValue({}));
    const rules: MatchRules = {
      '*': [
        {
          // comapare the given arg with 42:
          when: [42],
          set: setterFn,
        },
      ],
    };

    // act
    match(defaultTestFn, rules, 42);

    // assert
    expect(setterFn).toHaveBeenCalledTimes(1);
  });

  it('should mark passed arguments with ArgumentSymbol, if they can carry symbols', () => {
    // assert
    const matcher = spyMatcher(true, '1', (arg: any) =>
      expect(hasSymbol(ArgumentSymbol, arg)).toBe(true),
    );

    // arrange
    const fn = (a: Func<[], void>, b: {}, c: any[]) => {};
    const rules: MatchRules = {
      '*': [
        {
          when: [matcher, matcher, matcher],
          set: null,
        },
      ],
    };

    // act
    match(fn, rules, () => {}, {}, [1, 2, 3]);

    // assert
    expect(matcher).toHaveBeenCalledTimes(3);
  });

  it('should execute setter fns, which return a ctx object that might be manipulated', () => {
    // arrange
    const setterReturn = 4711;
    const setter = createSetterFn(spy().and.returnValue({ a: setterReturn }));
    const rules: MatchRules = {
      '*': [
        {
          when: [is42Matcher],
          set: setter,
        },
      ],
    };

    // act
    const result = match(defaultTestFn, rules, 42);

    // assert
    expect(setter).toHaveBeenCalledWith(jasmine.any(Object), 'a', 42);
    expect(result).toEqual({ a: setterReturn });
  });

  it('should throw if a setter function did return null or undefined as context object', () => {
    // error, since it returns undefined.
    const matchValue = 42;
    const setterFn = createSetterFn(() => undefined!);
    const rules: MatchRules = { '*': [{ when: [matchValue], set: setterFn }] };

    // act, assert
    expect(() => match(defaultTestFn, rules, matchValue)).toThrowMatching((err: Error) =>
      err.message.includes('context'),
    );
  });
});
