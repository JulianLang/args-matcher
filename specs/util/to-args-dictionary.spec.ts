import { toArgsDictionary } from '../../src/util';

describe('toArgsDictionary', () => {
  it('should convert a fn and a given args array into an object', () => {
    // arrange
    const fn = (a: number, b: string, c: any) => {};
    const args = [42, 'str', null];

    // act
    const obj = toArgsDictionary(fn, args);

    // assert
    expect(obj).toEqual({
      a: 42,
      b: 'str',
      c: null,
    });
  });

  it('should restore undefined arrays of rest parameters (variant 1)', () => {
    // arrange
    const fn = (a: string, ...b: number[]) => {};
    const args: any[] = ['str' /* given only argument for "a", "b" is empty */];

    // act
    const obj = toArgsDictionary(fn, args);

    // assert
    expect(obj.a).toEqual('str');
    expect(obj.b).toEqual([]);
  });

  it('should restore undefined arrays of rest parameters (variant 2)', () => {
    // arrange
    const fn = (...a: number[]) => {};
    const args: any[] = [
      /* no arguments given */
    ];

    // act
    const obj = toArgsDictionary(fn, args);

    // assert
    expect(obj.a).toEqual([]);
  });

  it('should throw for null and undefined', () => {
    // arrange, act, assert
    expect(() => toArgsDictionary(null as any, null as any)).toThrow();
    expect(() => toArgsDictionary(undefined as any, undefined as any)).toThrow();
  });
});
