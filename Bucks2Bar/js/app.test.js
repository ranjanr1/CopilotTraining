const { validateUsername, usd } = require('./app');

/* ── validateUsername ───────────────────────────────────────────────────── */
describe('validateUsername', () => {
  test('rejects username shorter than 5 characters', () => {
    expect(validateUsername('Ab1!')).toBe('Username must be at least 5 characters.');
  });

  test('rejects username with no uppercase letter', () => {
    expect(validateUsername('abcd1!')).toBe('Username must contain at least 1 uppercase letter.');
  });

  test('rejects username with no number', () => {
    expect(validateUsername('Abcde!')).toBe('Username must contain at least 1 number.');
  });

  test('rejects username with no special character', () => {
    expect(validateUsername('Abcde1')).toBe('Username must contain at least 1 special character.');
  });

  test('accepts a valid username', () => {
    expect(validateUsername('Abcde1!')).toBe('');
  });
});

/* ── usd ────────────────────────────────────────────────────────────────── */
describe('usd', () => {
  test('formats a positive number as USD', () => {
    expect(usd(1234.56)).toBe('$1,234.56');
  });

  test('formats zero as USD', () => {
    expect(usd(0)).toBe('$0.00');
  });

  test('formats a negative number as USD', () => {
    expect(usd(-500)).toBe('-$500.00');
  });
});
