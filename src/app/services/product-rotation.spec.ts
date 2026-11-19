import { TestBed } from '@angular/core/testing';

import { PRODUCTS } from '@data/product';
import { ProductRotation } from './product-rotation';

describe('ProductRotation', () => {
  let service: ProductRotation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRotation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the same product for the same calendar day', () => {
    const date = new Date(2026, 10, 19);
    expect(service.getProductOfTheDay(PRODUCTS, date)).toBe(
      service.getProductOfTheDay(PRODUCTS, date),
    );
  });

  it('returns a product from the catalog', () => {
    const product = service.getProductOfTheDay(PRODUCTS, new Date(2026, 10, 19));
    expect(PRODUCTS).toContain(product);
  });

  it('rotates to a different product the next day', () => {
    const today = service.getProductOfTheDay(PRODUCTS, new Date(2026, 10, 19));
    const tomorrow = service.getProductOfTheDay(PRODUCTS, new Date(2026, 10, 20));
    expect(today).not.toBe(tomorrow);
  });
});
