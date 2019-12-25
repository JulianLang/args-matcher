import { when } from '../../src';

describe('when', () => {
  it('should return a setter fn', () => {
    // arrange, act
    const result = when(() => true, null);

    // assert
    expect(typeof result).toBe('function');
  });

  it('should only manipulate the ctx object if it matches', () => {
    // arrange, act
    const succeed = when(() => true, 42);
    const dontSucceed = when(() => false, 42);
    const initialValue = null;

    // assert
    expect(succeed({}, 'prop', initialValue)).toEqual(42);
    expect(dontSucceed({}, 'prop', initialValue)).toEqual(initialValue);
  });
});
