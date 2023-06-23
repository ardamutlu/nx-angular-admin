import { carListFeature } from './car-list.reducer';

const { selectEntities, selectLoading, selectError, selectLoaded } =
  carListFeature;

export const carListQuery = {
  selectEntities,
  selectError,
  selectLoaded,
  selectLoading,
};
