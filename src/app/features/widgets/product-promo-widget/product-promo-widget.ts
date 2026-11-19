import { Component, computed, inject } from '@angular/core';

import { ProductPromoStore } from './product-promo.store';
import { GridCell } from '@components/grid-cell/grid-cell';
import { GridLine } from '@components/grid-line/grid-line';
import { TranslatePipe, translate } from '@ngx-translate/core';
import { SubscriptionFlowStore } from '@features/subscription/subscription-flow.store';

@Component({
  imports: [GridLine, GridCell, TranslatePipe],
  selector: 'app-product-promo-widget',
  providers: [ProductPromoStore],
  templateUrl: './product-promo-widget.html',
  host: {
    class: 'block min-w-0',
  },
})
export class ProductPromoWidget {
  private readonly store = inject(ProductPromoStore);
  private readonly subscriptionFlow = inject(SubscriptionFlowStore);

  readonly product = this.store.product;

  private readonly trialTariff = computed(() =>
    this.product()?.tariffs?.find((tariff) => tariff.id === 'trial'),
  );
  private readonly hasTariffs = computed(() => !!this.product()?.tariffs?.length);

  readonly ctaLabel = translate(
    () =>
      this.trialTariff()
        ? 'product.tryForPrice'
        : this.hasTariffs()
          ? 'product.subscribe'
          : 'product.learnMore',
    () => {
      const trial = this.trialTariff();
      return trial ? { amount: trial.priceUsd } : undefined;
    },
  );

  onCtaClick(): void {
    const product = this.product();
    if (!product) {
      return;
    }
    if (product.tariffs?.length) {
      this.subscriptionFlow.open(product);
    } else {
      window.open(product.externalUrl, '_blank', 'noopener');
    }
  }
}
