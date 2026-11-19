import { FormControl, FormGroup } from '@angular/forms';
import { expiryNotInPastValidator, luhnValidator } from './payment-form.validators';

describe('luhnValidator', () => {
  it('passes a valid card number', () => {
    const control = new FormControl('4111111111111111');
    expect(luhnValidator(control)).toBeNull();
  });

  it('fails an invalid card number', () => {
    const control = new FormControl('4111111111111112');
    expect(luhnValidator(control)).toEqual({ luhn: true });
  });

  it('ignores spaces in the card number', () => {
    const control = new FormControl('4111 1111 1111 1111');
    expect(luhnValidator(control)).toBeNull();
  });

  it('does not flag an empty value', () => {
    const control = new FormControl('');
    expect(luhnValidator(control)).toBeNull();
  });

  it('handles doubled digits above 9', () => {
    const control = new FormControl('5555555555554444');
    expect(luhnValidator(control)).toBeNull();
  });

  it('does not flag a null value', () => {
    const control = new FormControl<string | null>(null);
    expect(luhnValidator(control)).toBeNull();
  });
});

describe('expiryNotInPastValidator', () => {
  function group(expMonth: string, expYear: string): FormGroup {
    return new FormGroup({
      expMonth: new FormControl(expMonth),
      expYear: new FormControl(expYear),
    });
  }

  it('rejects a date in the past', () => {
    expect(expiryNotInPastValidator(group('01', '20'))).toEqual({ expired: true });
  });

  it('accepts a date far in the future', () => {
    expect(expiryNotInPastValidator(group('09', '40'))).toBeNull();
  });

  it('does not flag an incomplete value', () => {
    expect(expiryNotInPastValidator(group('', ''))).toBeNull();
  });

  it('rejects an earlier month within the current year', () => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    if (currentMonth === 1) {
      return;
    }

    const currentYear = String(now.getFullYear() % 100).padStart(2, '0');
    const pastMonth = String(currentMonth - 1).padStart(2, '0');

    expect(expiryNotInPastValidator(group(pastMonth, currentYear))).toEqual({ expired: true });
  });
});
