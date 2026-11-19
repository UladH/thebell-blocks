import { Component, input, output } from '@angular/core';

import { Modal } from '@components/modal/modal';
import { Product } from '@models/product.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [Modal, TranslatePipe],
  selector: 'app-success-modal',
  templateUrl: './success-modal.html',
})
export class SuccessModal {
  readonly product = input.required<Product>();
  readonly step = input.required<1 | 2>();

  readonly back = output<void>();
  readonly finish = output<void>();
  readonly next = output<void>();
}
