import { Car } from '@m-benz/data-models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { carActions } from './car.actions';
import { carEditActions } from '../car-edit/car-edit.actions';

export interface CarState {
  entity: Car | null;
  error: Error | null;
  loaded: boolean;
  loading: boolean;
}

export const carInitialState: CarState = {
  entity: null,
  error: null,
  loaded: false,
  loading: false,
};

export const carFeature = createFeature({
  name: 'car',
  reducer: createReducer(
    carInitialState,
    on(carActions.loadCar, (state) => ({
      ...state,
      loaded: false,
      error: null,
      loading: true,
    })),
    on(carActions.loadCarSuccess, (_, action) => ({
      entity: action.payload,
      error: null,
      loaded: true,
      loading: false,
    })),
    on(carEditActions.updateCar, (state) => ({
      ...state,
      loading: true,
    })),
    on(carEditActions.updateCarSuccess, () => carInitialState),
    on(carActions.loadCarFailure, (_, action) => ({
      entity: null,
      error: action.payload,
      loaded: false,
      loading: false,
    })),
    on(carActions.reset, () => carInitialState)
  ),
});
