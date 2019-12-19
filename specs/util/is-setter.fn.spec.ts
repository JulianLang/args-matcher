import { isSetterFn, setSymbol, SetterFnSymbol } from '../../src';

describe('isSetterFn', () => {
  it('should return true for values having the SetterFnSymbol, false otherwise', () => {
    // arrange
    const setterFn = setSymbol(SetterFnSymbol, () => {});

    // act, assert
    expect(isSetterFn(setterFn)).toBe(true);
    expect(isSetterFn(() => {})).toBe(false);
  });
});
