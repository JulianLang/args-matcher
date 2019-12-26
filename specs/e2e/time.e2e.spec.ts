import {
  createMatcher,
  hasSymbol,
  is,
  match,
  MatchRules,
  moveTo,
  not,
  setSymbol,
  unset,
  valueOf,
} from '../../src';

fdescribe('e2e: time', () => {
  type TimeInput = string | string[] | Date | number;
  const AttachedSymbol = Symbol('attached');
  interface AttachedFn {
    [AttachedSymbol]: boolean;
  }

  const attachedfn = createMatcher('AttachedFnMatcher', (arg: any) => {
    return hasSymbol(AttachedSymbol, arg);
  });

  const rules: MatchRules = {
    '*': [
      {
        when: 'now',
        set: new Date(),
      },
      {
        when: is(attachedfn),
        set: moveTo('attachedFns', {
          earliest: ['00:00:00:000'],
          latest: ['23:59:59:999'],
        }),
      },
    ],
    earliest: [
      {
        when: unset,
        set: ['00:00:00:000'],
      },
    ],
    latest: [
      {
        when: unset,
        and: [
          {
            args: { earliest: not(attachedfn) },
            set: valueOf('earliest'),
          },
          {
            args: { earliest: unset },
            set: ['23:59:59:999'],
          },
        ],
      },
    ],
  };

  function time(
    earliest?: TimeInput | null | AttachedFn,
    latest?: TimeInput | null | AttachedFn,
    ...attachedFns: (AttachedFn | Function)[]
  ): any {
    return match(time, rules, ...arguments);
  }

  it('should move AttachedFns to the attachedFns array', () => {
    // arrange
    const attachedFn: AttachedFn = setSymbol(AttachedSymbol, () => {});

    // act
    const result = time(attachedFn);

    // assert
    expect(result.earliest).toEqual(['00:00:00:000']);
    expect(result.latest).toEqual(['23:59:59:999']);
    expect(result.attachedFns).toEqual([attachedFn]);
  });

  it('should set earliest and latest param if not defined', () => {
    // arrange, act
    const result = time();

    // assert
    expect(result.earliest).toEqual(['00:00:00:000']);
    expect(result.latest).toEqual(['23:59:59:999']);
    expect(result.attachedFns).toEqual([]);
  });
});
