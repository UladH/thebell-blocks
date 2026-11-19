import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const luhnValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const digits = (control.value as string | null)?.replace(/\s/g, '') ?? '';
  if (!/^\d+$/.test(digits)) {
    return null;
  }

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0 ? null : { luhn: true };
};

export const expiryNotInPastValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const month = group.get('expMonth')?.value as string | undefined;
  const year = group.get('expYear')?.value as string | undefined;
  if (!month || !year || !/^\d{2}$/.test(month) || !/^\d{2}$/.test(year)) {
    return null;
  }

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  const enteredYear = Number(year);
  const enteredMonth = Number(month);

  const isInPast =
    enteredYear < currentYear || (enteredYear === currentYear && enteredMonth < currentMonth);

  return isInPast ? { expired: true } : null;
};
