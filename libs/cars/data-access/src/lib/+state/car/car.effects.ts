import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { carActions } from './car.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { CarsService } from '../../car.service';

export const loadCar$ = createEffect(
  (actions$ = inject(Actions), carsService = inject(CarsService)) => {
    return actions$.pipe(
      ofType(carActions.loadCar),
      concatMap(({ slug }) =>
        carsService.getCar(slug).pipe(
          map((payload) =>
            carActions.loadCarSuccess({
              payload,
            })
          ),
          catchError((error) => of(carActions.loadCarFailure(error)))
        )
      )
    );
  },
  { functional: true }
);
