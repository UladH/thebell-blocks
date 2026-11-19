import { Component, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Modal } from '@components/modal/modal';
import { Product, ProductTariff } from '@models/product.model';
import { TranslatePipe } from '@ngx-translate/core';
import { expiryNotInPastValidator, luhnValidator } from './payment-form.validators';

@Component({
  imports: [Modal, ReactiveFormsModule, TranslatePipe],
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.html',
})
export class PaymentModal {
  private readonly fb = inject(NonNullableFormBuilder);

  readonly product = input.required<Product>();
  readonly tariff = input.required<ProductTariff>();

  readonly back = output<void>();
  readonly closed = output<void>();
  readonly pay = output<void>();

  readonly form = this.fb.group(
    {
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{13,19}$/), luhnValidator]],
      expMonth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expYear: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    },
    { validators: expiryNotInPastValidator },
  );

  onPayClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.pay.emit();
  }
}
