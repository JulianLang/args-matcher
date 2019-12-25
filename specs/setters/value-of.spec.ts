import { valueOf } from '../../src';

describe('valueOf', () => {
  it('should return the value of the given property', () => {
    // arrange
    const context = {
      a: 42,
    };

    // act
    const action = valueOf('a');
    const result = action(context, 'somePropName', null);

    // assert
    expect(result).toBe(42);
  });

  it('should return undefined for non-existing targets', () => {
    // arrange
    const context = {
      a: 42,
    };

    // act
    const action = valueOf('notExisting');
    const result = action(context, 'somePropName', null);

    // assert
    expect(result).toBe(undefined);
  });
});
