import { sanitizeParamName } from '../../src/util';

describe('sanitizeParamName', () => {
  it('should remove a spread operator', () => {
    // arrange
    const expectedName = 'fns';
    const spreadOperator = '...';
    const paramName = spreadOperator + expectedName;

    // act
    const sanitized = sanitizeParamName(paramName);

    // assert
    expect(sanitized).toBe(expectedName);
  });
});
