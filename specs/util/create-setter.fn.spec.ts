import { createSetterFn, hasSymbol, SetterFnSymbol } from '../../src';

describe('createSetterFn', () => {
  it('should return a function with the SetterFnSymbol', () => {
    // arrange, act
    const setter = createSetterFn(() => ({}));

    // assert
    expect(hasSymbol(SetterFnSymbol, setter)).toBe(true);
  });
});
