import { Component, computed, input, linkedSignal, output } from '@angular/core';

import { Modal } from '@components/modal/modal';
import { Product, ProductTariff } from '@models/product.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Modal, TranslatePipe],
  selector: 'app-tariff-modal',
  templateUrl: './tariff-modal.html',
})
export class TariffModal {
  readonly product = input.required<Product>();

  readonly closed = output<void>();
  readonly tariffSelected = output<ProductTariff>();

  readonly selectedTariffId = linkedSignal(() => this.product().tariffs?.[0]?.id ?? null);

  readonly selectedTariff = computed(() =>
    this.product().tariffs?.find((tariff) => tariff.id === this.selectedTariffId()),
  );

  onNext(): void {
    const tariff = this.selectedTariff();
    if (tariff) {
      this.tariffSelected.emit(tariff);
    }
  }
}
