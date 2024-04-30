import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    provideAnimations(),

    // { provide: HTTP_INTERCEPTORS, useClass: HTTP_INTERCEPTORS, multi: true },
    
  ]
};
