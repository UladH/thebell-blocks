import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PRODUCTS } from '@data/product';
import { SubscriptionFlow } from './subscription-flow';
import { PaymentModal } from '../payment-modal/payment-modal';
import { SubscriptionFlowStore } from '../subscription-flow.store';
import { provideTestTranslations } from '@testing/translate-testing';

describe('SubscriptionFlow', () => {
  let component: SubscriptionFlow;
  let fixture: ComponentFixture<SubscriptionFlow>;
  let store: InstanceType<typeof SubscriptionFlowStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionFlow],
      providers: [provideTestTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionFlow);
    component = fixture.componentInstance;
    store = TestBed.inject(SubscriptionFlowStore);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders nothing when the flow is closed', () => {
    expect(fixture.nativeElement.querySelector('app-tariff-modal')).toBeNull();
  });

  it('renders the tariff modal once opened', async () => {
    store.open(PRODUCTS[0]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('app-tariff-modal')).toBeTruthy();
  });

  it('advances to payment when clicking next inside the tariff modal', async () => {
    store.open(PRODUCTS[0]);
    await fixture.whenStable();

    const ctaButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-tariff-modal .btn-brand',
    );
    ctaButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('app-payment-modal')).toBeTruthy();
  });

  it('closes the flow when closing the tariff modal', async () => {
    store.open(PRODUCTS[0]);
    await fixture.whenStable();

    const backdrop: HTMLElement = fixture.nativeElement.querySelector(
      'app-tariff-modal [tabindex="-1"]',
    );
    backdrop.click();
    await fixture.whenStable();

    expect(store.step()).toBeNull();
    expect(fixture.nativeElement.querySelector('app-tariff-modal')).toBeNull();
  });

  it('goes back to tariffs from payment', async () => {
    store.open(PRODUCTS[0]);
    store.selectTariff(PRODUCTS[0].tariffs![0]);
    await fixture.whenStable();

    const backButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-payment-modal button',
    );
    backButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('app-tariff-modal')).toBeTruthy();
  });

  it('advances to success when paying with a valid form', async () => {
    store.open(PRODUCTS[0]);
    store.selectTariff(PRODUCTS[0].tariffs![0]);
    await fixture.whenStable();

    const paymentModal = fixture.debugElement.query(By.directive(PaymentModal))
      .componentInstance as PaymentModal;
    paymentModal.form.setValue({
      cardNumber: '4111111111111111',
      expMonth: '09',
      expYear: '28',
      cvv: '123',
    });

    const payButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-payment-modal .btn-brand',
    );
    payButton.click();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('app-success-modal')).toBeTruthy();
    expect(store.successStep()).toBe(1);
  });

  it('advances and rewinds the success steps, then closes on finish', async () => {
    store.open(PRODUCTS[0]);
    store.selectTariff(PRODUCTS[0].tariffs![0]);
    store.pay();
    await fixture.whenStable();

    const nextButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-success-modal .btn-brand',
    );
    nextButton.click();
    await fixture.whenStable();
    expect(store.successStep()).toBe(2);

    const backButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-success-modal button',
    );
    backButton.click();
    await fixture.whenStable();
    expect(store.successStep()).toBe(1);

    store.nextSuccessStep();
    await fixture.whenStable();
    const finishButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'app-success-modal .btn-brand',
    );
    finishButton.click();
    await fixture.whenStable();

    expect(store.step()).toBeNull();
    expect(fixture.nativeElement.querySelector('app-success-modal')).toBeNull();
  });
});
