import { Pipe, PipeTransform } from '@angular/core';

interface Translation {
  [key: string]: string;
}

interface Translations {
  [language: string]: Translation;
}

@Pipe({ name: 'language', standalone: true })
export class LanguagePipe implements PipeTransform {
  transform(value: string, language: string): string {
    const translations: Translations = {
      en: { greeting: 'Hello' },
      es: { greeting: 'Hola' },
      ru: { greeting: 'Привет' },
    };

    const languageTranslations = translations[language];

    return languageTranslations?.[value] || value;
  }
}
