import { moveTo } from '../../src';

describe('moveTo', () => {
  it('should move the value to an array', () => {
    // arrange
    const arr: number[] = [];
    const ctx = {
      a: 42,
      b: arr,
    };

    // act
    const action = moveTo('b');
    const newValue = action(ctx, 'a', 42);

    // assert
    expect(newValue).toBe(undefined);
    expect(ctx.b).toEqual([42]);
  });

  it('should move the value to an object', () => {
    // arrange
    const obj: any = {};
    const ctx = {
      a: 42,
      b: obj,
    };

    // act
    const action = moveTo('b');
    const newValue = action(ctx, 'a', 42);

    // assert
    expect(newValue).toBe(undefined);
    expect(ctx.b).toEqual({ a: 42 });
  });

  it('should move the value within context if the target is no object', () => {
    // arrange
    const ctx: any = {
      a: 42,
      b: 4711,
    };

    // act
    const action = moveTo('b');
    const newValue = action(ctx, 'a', 42);

    // assert
    expect(newValue).toBe(undefined);
    expect(ctx.b).toBe(42);
  });

  it('should apply the given values for the right property', () => {
    // arrange
    const ctx: any = {
      a: 42,
      b: 4711,
    };
    const expectedValue = 'str';

    // act
    const action = moveTo('b', { a: expectedValue });
    const newValue = action(ctx, 'a', 42);

    // assert
    expect(newValue).toBe(expectedValue);
  });

  it('should not apply a given value if it does not match the property', () => {
    // arrange
    const ctx: any = {
      a: 42,
      b: 4711,
    };
    const shouldNotBeApplied = 'str';

    // act
    const action = moveTo('b', { notMatchingProp: shouldNotBeApplied });
    const newValue = action(ctx, 'a', 42);

    // assert
    expect(newValue).toBe(undefined);
  });
});
