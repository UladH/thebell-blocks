import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { Product } from '@models/product.model';
import { ProductRotation } from '@services/product-rotation';
import { ProductsRepository } from '@services/products.repository';

interface ProductPromoState {
  product: Product | null;
  loading: boolean;
}

export const ProductPromoStore = signalStore(
  withState<ProductPromoState>({ product: null, loading: false }),
  withMethods(
    (store, repository = inject(ProductsRepository), rotation = inject(ProductRotation)) => ({
      loadProductOfTheDay: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() => repository.getAll()),
          tap((products) =>
            patchState(store, { product: rotation.getProductOfTheDay(products), loading: false }),
          ),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store) {
      store.loadProductOfTheDay();
    },
  }),
);
