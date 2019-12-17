import { isSetArgMatchRule } from '../../src/util';

describe('isSetArgMatchRule', () => {
  it('should return true if the value and property set is defined', () => {
    // arrange, act, assert
    expect(isSetArgMatchRule({ set: () => {} })).toBe(true);
    expect(isSetArgMatchRule({})).toBe(false);
  });
});
