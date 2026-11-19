import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRODUCTS } from '@data/product';
import { PaymentModal } from './payment-modal';
import { provideTestTranslations } from '@testing/translate-testing';

describe('PaymentModal', () => {
  let component: PaymentModal;
  let fixture: ComponentFixture<PaymentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentModal],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentModal);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', PRODUCTS[0]);
    fixture.componentRef.setInput('tariff', PRODUCTS[0].tariffs![0]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is invalid when the form is empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('does not emit pay and marks fields touched when the form is invalid', () => {
    let paid = false;
    component.pay.subscribe(() => (paid = true));
    fixture.nativeElement.querySelector('.btn-brand').click();

    expect(paid).toBe(false);
    expect(component.form.controls.cardNumber.touched).toBe(true);
  });

  it('emits pay when the cta is clicked with valid values', () => {
    component.form.setValue({
      cardNumber: '4111111111111111',
      expMonth: '09',
      expYear: '28',
      cvv: '123',
    });

    let paid = false;
    component.pay.subscribe(() => (paid = true));
    fixture.nativeElement.querySelector('.btn-brand').click();
    expect(paid).toBe(true);
  });

  it('rejects a card number that fails the Luhn check', () => {
    component.form.patchValue({ cardNumber: '4111111111111112' });
    expect(component.form.controls.cardNumber.hasError('luhn')).toBe(true);
  });

  it('rejects an expiry date in the past', () => {
    component.form.patchValue({ expMonth: '01', expYear: '20' });
    expect(component.form.hasError('expired')).toBe(true);
  });

  it('does not emit pay for an expired card even with an otherwise valid form', () => {
    component.form.setValue({
      cardNumber: '4111111111111111',
      expMonth: '01',
      expYear: '20',
      cvv: '123',
    });

    let paid = false;
    component.pay.subscribe(() => (paid = true));
    fixture.nativeElement.querySelector('.btn-brand').click();
    expect(paid).toBe(false);
  });

  it('emits back when going back', () => {
    let wentBack = false;
    component.back.subscribe(() => (wentBack = true));
    fixture.nativeElement.querySelector('button').click();
    expect(wentBack).toBe(true);
  });

  it('renders the card number error after an invalid submit', async () => {
    fixture.nativeElement.querySelector('.btn-brand').click();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Введите корректный номер карты');
  });

  it('renders the expiry/CVV error after an invalid submit', async () => {
    component.form.patchValue({ cardNumber: '4111111111111111' });
    fixture.nativeElement.querySelector('.btn-brand').click();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Проверьте срок действия и CVV');
  });

  it('renders the expired-card error once the other fields are valid', async () => {
    component.form.setValue({
      cardNumber: '4111111111111111',
      expMonth: '01',
      expYear: '20',
      cvv: '123',
    });
    fixture.nativeElement.querySelector('.btn-brand').click();
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Срок действия карты истёк');
  });
});
