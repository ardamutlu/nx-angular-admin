import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  errorHandlerEffects,
  errorHandlerFeature,
  errorHandlingInterceptor,
} from '@m-benz/core/error-handler';
import { API_URL } from '@m-benz/core/http-client';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    provideStore({
      errorHandler: errorHandlerFeature.reducer,
    }),
    provideEffects(errorHandlerEffects),
    provideRouterStore(),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.apiUrl },
  ],
};
