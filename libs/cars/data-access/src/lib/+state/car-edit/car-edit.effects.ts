import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarsService } from '../../car.service';
import { carEditActions } from './car-edit.actions';
import { carActions } from '../car/car.actions';

export const updateCar$ = createEffect(
  (
    actions$ = inject(Actions),
    carService = inject(CarsService),
    _snackBar = inject(MatSnackBar),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(carEditActions.updateCar),
      concatMap(({ payload }) =>
        carService.updateCar(payload).pipe(
          tap(() => router.navigate(['cars'])),
          tap(() =>
            _snackBar.open('Successfully saved', 'OK', {
              duration: 3000,
            })
          ),
          map(() => carEditActions.updateCarSuccess()),
          catchError((error) => of(carActions.loadCarFailure(error)))
        )
      )
    );
  },
  { functional: true }
);
