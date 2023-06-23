import { Car } from '@m-benz/data-models';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const carEditActions = createActionGroup({
  source: 'Car Edit',
  events: {
    updateCar: props<{ payload: Car }>(),
    updateCarSuccess: emptyProps(),
  },
});
