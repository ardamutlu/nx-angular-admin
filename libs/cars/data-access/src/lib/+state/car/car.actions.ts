import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Car } from '@m-benz/data-models';

export const carActions = createActionGroup({
  source: 'Car',
  events: {
    loadCar: props<{ slug: string }>(),
    loadCarFailure: props<{ payload: Error }>(),
    loadCarSuccess: props<{ payload: Car }>(),
    reset: emptyProps(),
  },
});
