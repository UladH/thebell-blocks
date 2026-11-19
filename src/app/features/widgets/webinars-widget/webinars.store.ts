import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';

import { Webinar } from '@models/webinar.model';
import { WebinarsRepository } from '@services/webinars.repository';

interface WebinarsState {
  webinars: Webinar[];
  loading: boolean;
}

export const WebinarsStore = signalStore(
  withState<WebinarsState>({ webinars: [], loading: false }),
  withMethods((store, repository = inject(WebinarsRepository)) => ({
    loadWebinars: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => repository.getAll()),
        tap((webinars) => patchState(store, { webinars, loading: false })),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadWebinars();
    },
  }),
);
