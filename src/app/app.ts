import { Component } from '@angular/core';
import { WebinarsWidget } from '@features/widgets/webinars-widget/webinars-widget';
import { SubscriptionFlow } from '@features/subscription/subscription-flow/subscription-flow';
import { ProductPromoWidget } from '@features/widgets/product-promo-widget/product-promo-widget';

@Component({
  imports: [ProductPromoWidget, WebinarsWidget, SubscriptionFlow],
  selector: 'app-root',
  templateUrl: './app.html',
  host: {
    class: 'font-sans mx-auto block max-w-[1200px] px-5',
  },
})
export class App {}
