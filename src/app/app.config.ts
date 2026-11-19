import localeRu from '@angular/common/locales/ru';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: LOCALE_ID, useValue: 'ru' },
    provideHttpClient(),
    provideTranslateService({ lang: 'ru', fallbackLang: 'ru' }),
    provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
  ],
};
