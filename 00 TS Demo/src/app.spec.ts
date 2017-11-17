import app from './app';

describe('add:', () => {
  it('1 + 2 = 3.', () => {
    expect(app(1, 2)).toBe(3);
  });
});
