import { Route } from '@angular/router';
import { LayoutComponent } from '@m-benz/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'cars',
    pathMatch: 'full',
  },
  {
    path: 'cars',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('@m-benz/cars/feature/car-list').then(
            (_) => _.CAR_LIST_ROUTES
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('@m-benz/cars/feature/car-edit').then(
            (_) => _.CAR_EDIT_ROUTES
          ),
      },
    ],
  },
];
