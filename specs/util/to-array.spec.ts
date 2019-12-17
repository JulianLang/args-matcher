import { toArray } from '../../src/util';

describe('toArray', () => {
  it('should push all properties of an object into an array', () => {
    // arrange
    const obj = {
      a: 1,
      b: '2',
      c: true,
      d: () => {},
    };

    // act
    const array = toArray(obj);

    // assert
    expect(array).toEqual([obj.a, obj.b, obj.c, obj.d]);
  });

  it('should throw for null and undefined', () => {
    // arrange, act, assert
    expect(() => toArray(null)).toThrowMatching((err: Error) => err.message.includes('Refuse'));
    expect(() => toArray(undefined)).toThrowMatching((err: Error) =>
      err.message.includes('Refuse'),
    );
  });
});
