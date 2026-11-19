import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { SubscriptionStep } from './subscription-flow.model';
import { Product, ProductTariff } from '@models/product.model';

interface SubscriptionFlowState {
  product: Product | null;
  step: SubscriptionStep | null;
  tariff: ProductTariff | null;
  successStep: 1 | 2;
}

const initialState: SubscriptionFlowState = {
  product: null,
  step: null,
  tariff: null,
  successStep: 1,
};

export const SubscriptionFlowStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    open(product: Product): void {
      patchState(store, { product, step: SubscriptionStep.Tariffs, tariff: null, successStep: 1 });
    },
    close(): void {
      patchState(store, initialState);
    },
    selectTariff(tariff: ProductTariff): void {
      patchState(store, { tariff, step: SubscriptionStep.Payment });
    },
    backToTariffs(): void {
      patchState(store, { step: SubscriptionStep.Tariffs, tariff: null });
    },
    pay(): void {
      patchState(store, { step: SubscriptionStep.Success, successStep: 1 });
    },
    nextSuccessStep(): void {
      patchState(store, { successStep: 2 });
    },
    backToFirstSuccessStep(): void {
      patchState(store, { successStep: 1 });
    },
  })),
);
