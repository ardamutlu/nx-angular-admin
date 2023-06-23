import { carFeature } from './car.reducer';

const { selectEntity, selectLoading, selectError, selectLoaded } = carFeature;

export const carQuery = {
  selectEntity,
  selectError,
  selectLoaded,
  selectLoading,
};
