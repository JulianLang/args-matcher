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

  it('should throw for null and undefined', () => {
    // arrange, act, assert
    expect(() => toArgsDictionary(null as any, null as any)).toThrow();
    expect(() => toArgsDictionary(undefined as any, undefined as any)).toThrow();
  });
});
