import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRODUCTS } from '@data/product';
import { Product } from '@models/product.model';
import { ProductPromoWidget } from './product-promo-widget';
import { ProductsRepository } from '@services/products.repository';
import { provideTestTranslations } from '@testing/translate-testing';
import { SubscriptionFlowStore } from '@features/subscription/subscription-flow.store';

describe('ProductPromoWidget', () => {
  let component: ProductPromoWidget;
  let fixture: ComponentFixture<ProductPromoWidget>;
  let subscriptionFlow: InstanceType<typeof SubscriptionFlowStore>;

  async function createWith(products: Product[]): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [ProductPromoWidget],
      providers: [
        provideTestTranslations(),
        { provide: ProductsRepository, useValue: { getAll: () => of(products) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPromoWidget);
    component = fixture.componentInstance;
    subscriptionFlow = TestBed.inject(SubscriptionFlowStore);
    await fixture.whenStable();
  }

  it('should create', async () => {
    await createWith(PRODUCTS);
    expect(component).toBeTruthy();
  });

  it('offers the trial price when the product has one', async () => {
    const withTrial = PRODUCTS.find((product) => !!product.tariffs)!;
    await createWith([withTrial]);
    expect(component.ctaLabel()).toBe('Попробовать за $1');
  });

  it('falls back to the "learn more" CTA when the product has no tariffs', async () => {
    const withoutTariffs = PRODUCTS.find((product) => !product.tariffs)!;
    await createWith([withoutTariffs]);
    expect(component.ctaLabel()).toBe('Узнать больше');
  });

  it('offers the "subscribe" CTA for a product with tariffs but no trial', async () => {
    const withoutTrial: Product = {
      ...PRODUCTS[0],
      tariffs: PRODUCTS[0].tariffs!.filter((tariff) => tariff.id !== 'trial'),
    };
    await createWith([withoutTrial]);
    expect(component.ctaLabel()).toBe('Подписаться');
  });

  it('opens the subscription flow for a product with tariffs on cta click', async () => {
    const withTrial = PRODUCTS.find((product) => !!product.tariffs)!;
    await createWith([withTrial]);

    component.onCtaClick();
    expect(subscriptionFlow.product()).toBe(withTrial);
  });

  it('opens the external url instead of the subscription flow when the product has no tariffs', async () => {
    const withoutTariffs = PRODUCTS.find((product) => !product.tariffs)!;
    await createWith([withoutTariffs]);

    const windowOpen = vi.spyOn(window, 'open').mockReturnValue(null);
    component.onCtaClick();

    expect(windowOpen).toHaveBeenCalledWith(withoutTariffs.externalUrl, '_blank', 'noopener');
    expect(subscriptionFlow.product()).toBeNull();
  });

  it('renders nothing and does nothing on cta click while no product has resolved', async () => {
    await createWith([]);

    expect(fixture.nativeElement.querySelector('app-grid-cell')).toBeNull();

    const windowOpen = vi.spyOn(window, 'open').mockReturnValue(null);
    component.onCtaClick();

    expect(windowOpen).not.toHaveBeenCalled();
    expect(subscriptionFlow.product()).toBeNull();
  });
});
