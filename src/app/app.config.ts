import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpInterceptorService } from './core/service/interceptor.service';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    {provide: [LOCALE_ID, HTTP_INTERCEPTORS], useValue: 'pt-BR',useClass:HttpInterceptorService, multi: true },

  ]
};
