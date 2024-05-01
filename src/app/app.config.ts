import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { DecimalPipe, registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    provideAnimations(),
    {provide: LOCALE_ID, useValue: 'pt-BR' }

    // { provide: HTTP_INTERCEPTORS, useClass: HTTP_INTERCEPTORS, multi: true },
    
  ]
};
