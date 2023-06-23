import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CarListComponent } from './car-list.component';
import { carListFeature, carListEffects } from '@m-benz/cars/data-access';

export const CAR_LIST_ROUTES: Routes = [
  {
    path: '',
    component: CarListComponent,
    providers: [provideState(carListFeature), provideEffects(carListEffects)],
  },
];
