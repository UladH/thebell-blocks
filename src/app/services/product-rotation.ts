import { Service } from '@angular/core';

import { Product } from '@models/product.model';

@Service()
export class ProductRotation {
  getProductOfTheDay(products: Product[], date = new Date()): Product {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / 86_400_000);
    return products[dayOfYear % products.length];
  }
}
