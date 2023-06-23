import { Car } from '@m-benz/data-models';
import { createFeature, createReducer, on } from '@ngrx/store';
import { carListActions } from './car-list.actions';

export interface CarListState {
  entities: Car[];
  error: Error | null;
  loaded: boolean;
  loading: boolean;
}

export const carListInitialState: CarListState = {
  entities: [],
  error: null,
  loaded: false,
  loading: false,
};

export const carListFeature = createFeature({
  name: 'carList',
  reducer: createReducer(
    carListInitialState,
    on(carListActions.loadCars, (state) => ({
      ...state,
      loaded: false,
      error: null,
      loading: true,
    })),
    on(carListActions.loadCarsSuccess, (state, action) => ({
      entities: action.payload,
      error: null,
      loaded: true,
      loading: false,
    })),
    on(carListActions.loadCarsFailure, (_, action) => ({
      entities: [],
      error: action.payload,
      loaded: false,
      loading: false,
    })),
    on(carListActions.reset, () => carListInitialState)
  ),
});
