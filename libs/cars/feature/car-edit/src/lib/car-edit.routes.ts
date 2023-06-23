import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CarEditComponent } from './car-edit.component';
import {
  carFeature,
  carEditEffects,
  carEffects,
} from '@m-benz/cars/data-access';
import { carEditResolver } from './resolvers/car-edit-resolver';
import { MatSnackBar } from '@angular/material/snack-bar';

export const CAR_EDIT_ROUTES: Routes = [
  {
    path: ':slug',
    component: CarEditComponent,
    providers: [
      provideState(carFeature),
      provideEffects(carEffects, carEditEffects),
      { provide: MatSnackBar },
    ],
    resolve: { carEditResolver },
  },
];
