import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { carActions } from '@m-benz/cars/data-access';
import { of } from 'rxjs';

export const carEditResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot
) => {
  const slug = route.params['slug'];
  const store = inject(Store);

  if (slug) {
    store.dispatch(carActions.loadCar({ slug }));
  }

  return of(true);
};
