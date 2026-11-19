import { Observable, of } from 'rxjs';
import { Service } from '@angular/core';

import { PRODUCTS } from '@data/product';
import { Product } from '@models/product.model';

@Service()
export class ProductsRepository {
  getAll(): Observable<Product[]> {
    return of(PRODUCTS);
  }
}
