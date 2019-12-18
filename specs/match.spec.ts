import {
  ArgumentSymbol,
  CallArgsMatchRule,
  Func,
  hasSymbol,
  match,
  MatchRule,
  SetArgsMatchRule,
  setSymbol,
  SetterFnSymbol,
} from '../src';
import { is42Matcher, spy, spyMatcher } from './spec-helpers';

describe('match', () => {
  const fn = (a: number) => {};

  it('should always call all rules', () => {
    // arrange
    const rules: MatchRule[] = [
      {
        match: [is42Matcher],
        call: jasmine.createSpy(),
      },
      {
        match: [is42Matcher],
        set: jasmine.createSpy().and.returnValue({}),
      },
    ];

    // act
    match(fn, rules, 42);

    // assert
    expect((rules[0] as CallArgsMatchRule).call).toHaveBeenCalledTimes(1);
    expect((rules[1] as SetArgsMatchRule).set).toHaveBeenCalledTimes(1);
  });

  it('should call matchers of all rules', () => {
    // arrange
    const rules: MatchRule[] = [
      {
        match: [spyMatcher(true, '1.1'), spyMatcher(false, '1.2')],
        call: () => {},
      },
      {
        match: [spyMatcher(true, '2.1'), spyMatcher(false, '2.2')],
        set: () => ({}),
      },
    ];

    // act
    match(fn, rules, 42);

    // assert
    expect(rules[0].match[0]).toHaveBeenCalledTimes(1);
    expect(rules[0].match[1]).toHaveBeenCalledTimes(1);
    expect(rules[1].match[0]).toHaveBeenCalledTimes(1);
    expect(rules[1].match[1]).toHaveBeenCalledTimes(1);
  });

  it('should jump out of non-matching rules when the first rule`s matcher fails', () => {
    // arrange
    const rules: MatchRule[] = [
      {
        match: [spyMatcher(true, '1.1'), spyMatcher(false, '1.2')],
        call: () => {},
      },
      {
        match: [spyMatcher(false, '2.1'), spyMatcher(true, '2.2')],
        set: () => ({}),
      },
    ];

    // act
    match(fn, rules, 42);

    // assert: 1.x
    expect(rules[0].match[0]).toHaveBeenCalledTimes(1);
    // should be called as 1.1 succeeded.
    expect(rules[0].match[1]).toHaveBeenCalledTimes(1);

    // assert: 2.x
    expect(rules[1].match[0]).toHaveBeenCalledTimes(1);
    // should not be called since 2.1 failed.
    expect(rules[1].match[1]).not.toHaveBeenCalled();
  });

  it('should check a rule`s match length if exactMatch is set to true', () => {
    // arrange
    const spy1 = spyMatcher(true, '1');
    const spy2 = spyMatcher(false, '2');
    const rules: MatchRule[] = [
      {
        // match lenght = 1, but args length are 2. Due to exactMatch, it should not be called.
        match: [spy1],
        exactMatch: true,
        call: () => {},
      },
      {
        match: [spy2],
        exactMatch: false,
        set: () => ({}),
      },
    ];

    // act
    const twoArguments = [42, 4711];
    match(fn, rules, ...twoArguments);

    // assert
    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should compare constant values in match with given arg', () => {
    // arrange
    const rules: MatchRule[] = [
      {
        // comapare the given arg with 42:
        match: [42],
        call: spy(),
      },
    ];

    // act
    match(fn, rules, 42);

    // assert
    expect((rules[0] as CallArgsMatchRule).call).toHaveBeenCalledTimes(1);
  });

  it('should mark passed arguments with ArgumentSymbol, if they can carry symbols', () => {
    // assert
    const matcher = spyMatcher(true, '1', (arg: any) =>
      expect(hasSymbol(ArgumentSymbol, arg)).toBe(true),
    );

    // arrange
    const fn = (a: Func<[], void>, b: {}, c: any[]) => {};
    const rules: MatchRule[] = [
      {
        match: [matcher, matcher, matcher],
        call: () => {},
      },
    ];

    // act
    match(fn, rules, () => {}, {}, [1, 2, 3]);

    // assert
    expect(matcher).toHaveBeenCalledTimes(3);
  });

  it('should run before and after hooks, if it is a SetArgsMatchRule and the hooks are set', () => {
    // arrange
    const rules: MatchRule[] = [
      {
        match: [is42Matcher],
        before: spy('before'),
        set: () => ({}),
        after: spy('after'),
      },
    ];

    // act
    match(fn, rules, 42);

    // assert
    const setRule = rules[0] as SetArgsMatchRule;
    expect(setRule.before).toHaveBeenCalledTimes(1);
    expect(setRule.after).toHaveBeenCalledTimes(1);
  });

  it('should execute setter fns, which return value changes the result-args-output', () => {
    // arrange
    const setterReturn = 4711;
    const setter = setSymbol(SetterFnSymbol, spy().and.returnValue(setterReturn));
    const rules: MatchRule[] = [
      {
        match: [is42Matcher],
        set: () => ({ a: setter }),
      },
    ];

    // act
    const result = match(fn, rules, 42);

    // assert
    expect(setter).toHaveBeenCalledWith('a', 42, jasmine.any(Object));
    expect(result).toEqual({ a: setterReturn });
  });
});
