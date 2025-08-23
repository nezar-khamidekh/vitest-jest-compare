import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'language', standalone: true })
export class LanguagePipe implements PipeTransform {
  transform(value: string, language: string): string {
    const translations = {
      en: { greeting: 'Hello' },
      es: { greeting: 'Hola' },
      ru: { greeting: 'Привет' },
    };
    return translations[language]?.[value] || value;
  }
}
