import { Component, inject } from '@angular/core';

import { ProductTariff } from '@models/product.model';
import { TariffModal } from '../tariff-modal/tariff-modal';
import { PaymentModal } from '../payment-modal/payment-modal';
import { SuccessModal } from '../success-modal/success-modal';
import { SubscriptionStep } from '../subscription-flow.model';
import { SubscriptionFlowStore } from '../subscription-flow.store';

@Component({
  imports: [TariffModal, PaymentModal, SuccessModal],
  selector: 'app-subscription-flow',
  templateUrl: './subscription-flow.html',
})
export class SubscriptionFlow {
  readonly SubscriptionStep = SubscriptionStep;

  private readonly store = inject(SubscriptionFlowStore);

  readonly product = this.store.product;
  readonly step = this.store.step;
  readonly tariff = this.store.tariff;
  readonly successStep = this.store.successStep;

  onSelectTariff(tariff: ProductTariff): void {
    this.store.selectTariff(tariff);
  }

  onPay(): void {
    this.store.pay();
  }

  onBackToTariffs(): void {
    this.store.backToTariffs();
  }

  onNextSuccessStep(): void {
    this.store.nextSuccessStep();
  }

  onBackToFirstSuccessStep(): void {
    this.store.backToFirstSuccessStep();
  }

  onClose(): void {
    this.store.close();
  }
}
