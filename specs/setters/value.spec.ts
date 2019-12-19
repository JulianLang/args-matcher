import { createSetterFn, value } from '../../src';
import { spy } from '../spec-helpers';

describe('value', () => {
  const setter = createSetterFn(spy());

  it('should call the passed-in setter fn', () => {
    // arrange
    const ctx = {};
    const name = 'property';
    const val = 42;

    // act
    const resultFn = value(setter);
    resultFn(ctx, name, val);

    // assert
    expect(setter).toHaveBeenCalledTimes(1);
    expect(setter).toHaveBeenCalledWith(ctx, name, val);
  });

  it('should call the passed-in setter fn recursively if it returns a setter again', () => {
    // arrange
    const nested = createSetterFn(spy().and.returnValue(4711));
    const nested2 = createSetterFn(() => nested);
    const setter = createSetterFn(nested2);
    const ctx = {};
    const name = 'property';
    const val = 42;

    // act
    const resultFn = value(setter);
    resultFn(ctx, name, val);

    // assert
    expect(nested).toHaveBeenCalledTimes(1);
    expect(nested).toHaveBeenCalledWith(ctx, name, val);
  });

  it('should return the value of the passed-in setter fn', () => {
    // arrange
    const setter = createSetterFn(spy().and.returnValue(42));

    // act
    const resultFn = value(setter);
    const result = resultFn({}, 'property', null);

    // assert
    expect(result).toBe(42);
  });
});
