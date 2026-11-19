import { Provider } from '@angular/core';
import {
  TranslateLoader,
  TranslationObject,
  provideTranslateLoader,
  provideTranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import ru from '../../public/i18n/ru.json';

class TestTranslateLoader implements TranslateLoader {
  getTranslation(): Observable<TranslationObject> {
    return of(ru);
  }
}

export function provideTestTranslations(): Provider[] {
  return provideTranslateService({
    lang: 'ru',
    fallbackLang: 'ru',
    loader: provideTranslateLoader(TestTranslateLoader),
  });
}
