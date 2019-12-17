import { when } from '../../src';

describe('when', () => {
  it('should return a setter fn', () => {
    // arrange, act
    const result = when(() => true, null);

    // assert
    expect(typeof result).toBe('function');
  });

  it('should only return newValue if matcher matches', () => {
    // arrange, act
    const succeed = when(() => true, 42);
    const dontSucceed = when(() => false, 42);

    // assert
    expect(succeed('prop', null, {})).toBe(42);
    expect(dontSucceed('prop', null, {})).toBe(null);
  });
});
