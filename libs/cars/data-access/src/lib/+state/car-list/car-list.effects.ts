import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { carListActions } from './car-list.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { CarsService } from '../../car.service';

export const loadCars$ = createEffect(
  (actions$ = inject(Actions), carsService = inject(CarsService)) => {
    return actions$.pipe(
      ofType(carListActions.loadCars),
      concatMap(() =>
        carsService.getCars().pipe(
          map((payload) =>
            carListActions.loadCarsSuccess({
              payload,
            })
          ),
          catchError((error) => of(carListActions.loadCarsFailure(error)))
        )
      )
    );
  },
  { functional: true }
);
