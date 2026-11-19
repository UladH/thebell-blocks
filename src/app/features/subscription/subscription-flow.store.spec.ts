import { TestBed } from '@angular/core/testing';

import { PRODUCTS } from '@data/product';
import { SubscriptionStep } from './subscription-flow.model';
import { SubscriptionFlowStore } from './subscription-flow.store';

describe('SubscriptionFlowStore', () => {
  let store: InstanceType<typeof SubscriptionFlowStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(SubscriptionFlowStore);
  });

  it('is closed by default', () => {
    expect(store.step()).toBeNull();
  });

  it('opens the tariffs step for a product', () => {
    store.open(PRODUCTS[0]);
    expect(store.product()).toBe(PRODUCTS[0]);
    expect(store.step()).toBe(SubscriptionStep.Tariffs);
  });

  it('moves to payment after selecting a tariff', () => {
    store.open(PRODUCTS[0]);
    const tariff = PRODUCTS[0].tariffs![0];
    store.selectTariff(tariff);
    expect(store.tariff()).toBe(tariff);
    expect(store.step()).toBe(SubscriptionStep.Payment);
  });

  it('moves to success after paying', () => {
    store.open(PRODUCTS[0]);
    store.selectTariff(PRODUCTS[0].tariffs![0]);
    store.pay();
    expect(store.step()).toBe(SubscriptionStep.Success);
    expect(store.successStep()).toBe(1);
  });

  it('advances and rewinds success steps', () => {
    store.open(PRODUCTS[0]);
    store.pay();
    store.nextSuccessStep();
    expect(store.successStep()).toBe(2);
    store.backToFirstSuccessStep();
    expect(store.successStep()).toBe(1);
  });

  it('resets everything on close', () => {
    store.open(PRODUCTS[0]);
    store.close();
    expect(store.product()).toBeNull();
    expect(store.step()).toBeNull();
  });
});
