import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Car } from '@m-benz/data-models';

export const carListActions = createActionGroup({
  source: 'Car List',
  events: {
    loadCars: emptyProps(),
    loadCarsFailure: props<{ payload: Error }>(),
    loadCarsSuccess: props<{ payload: Car[] }>(),
    reset: emptyProps(),
  },
});
