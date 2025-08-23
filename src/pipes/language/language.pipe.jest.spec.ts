import { TestBed } from '@angular/core/testing';
import { LanguagePipe } from './language.pipe';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LanguagePipe', () => {
  let pipe: LanguagePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), LanguagePipe],
    });
    pipe = TestBed.inject(LanguagePipe);
  });

  it('должен создать экземпляр pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('если передать существующий язык и ключ перевода, то должен вернуть перевод', () => {
    const result = pipe.transform('greeting', 'en');
    expect(result).toBe('Hello');
  });

  it('если передать несуществующий язык, то должен вернуть исходное значение', () => {
    const result = pipe.transform('greeting', 'fr');
    expect(result).toBe('greeting');
  });

  it('если передать несуществующий ключ перевода, то должен вернуть исходное значение', () => {
    const result = pipe.transform('nonexistent', 'en');
    expect(result).toBe('nonexistent');
  });

  it('если передать пустую строку в качестве языка, то должен вернуть исходное значение', () => {
    const result = pipe.transform('greeting', '');
    expect(result).toBe('greeting');
  });

  it('если передать undefined в качестве языка, то должен вернуть исходное значение', () => {
    const result = pipe.transform('greeting', undefined as any);
    expect(result).toBe('greeting');
  });

  it('если передать null в качестве языка, то должен вернуть исходное значение', () => {
    const result = pipe.transform('greeting', null as any);
    expect(result).toBe('greeting');
  });

  it('если передать null в качестве значения, то должен вернуть null', () => {
    const result = pipe.transform(null as any, 'en');
    expect(result).toBeNull();
  });

  it('если передать undefined в качестве значения, то должен вернуть undefined', () => {
    const result = pipe.transform(undefined as any, 'en');
    expect(result).toBeUndefined();
  });
});
