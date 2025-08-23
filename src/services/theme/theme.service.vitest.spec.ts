import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { ThemeStorageService, Theme } from './theme.service';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ThemeStorageService', () => {
  let service: ThemeStorageService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    const localStorageMock = {
      getItem: (key: string): string | null => mockLocalStorage[key] || null,
      setItem: (key: string, value: string): void => {
        mockLocalStorage[key] = value;
      },
      removeItem: (key: string): void => {
        delete mockLocalStorage[key];
      },
      clear: (): void => {
        mockLocalStorage = {};
      },
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ThemeStorageService],
    });
    service = TestBed.inject(ThemeStorageService);
  });

  afterEach(() => {
    mockLocalStorage = {};
  });

  it('должен создать сервис', () => {
    expect(service).toBeTruthy();
  });

  it('должен инициализироваться светлой темой по умолчанию', async () => {
    const theme = await service.theme$.pipe(take(1)).toPromise();
    expect(theme).toBe('light');
  });

  it('должен возвращать текущую тему через currentTheme', () => {
    expect(service.currentTheme).toBe('light');
  });

  it('должен устанавливать темную тему', async () => {
    service.setTheme('dark');

    const theme = await service.theme$.pipe(take(1)).toPromise();
    expect(theme).toBe('dark');
  });

  it('должен переключать тему с light на dark', async () => {
    service.toggleTheme();

    const theme = await service.theme$.pipe(take(1)).toPromise();
    expect(theme).toBe('dark');
  });

  it('должен переключать тему с dark на light', async () => {
    service.setTheme('dark');

    service.toggleTheme();

    const theme = await service.theme$.pipe(take(1)).toPromise();
    expect(theme).toBe('light');
  });

  it('должен сохранять тему в localStorage при установке', () => {
    service.setTheme('dark');
    expect(mockLocalStorage['app-theme']).toBe('dark');

    service.setTheme('light');
    expect(mockLocalStorage['app-theme']).toBe('light');
  });

  it('должен загружать тему из localStorage при инициализации', () => {
    mockLocalStorage['app-theme'] = 'dark';

    const newService = new ThemeStorageService();

    expect(newService.currentTheme).toBe('dark');
  });

  it('должен использовать светлую тему по умолчанию при ошибке чтения из localStorage', () => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const newService = new ThemeStorageService();

    expect(newService.currentTheme).toBe('light');
  });

  it('должен обрабатывать ошибку при сохранении в localStorage', () => {
    vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    expect(() => service.setTheme('dark')).not.toThrow();
  });

  it('должен игнорировать невалидные значения из localStorage', () => {
    mockLocalStorage['app-theme'] = 'invalid-theme';

    const newService = new ThemeStorageService();

    expect(newService.currentTheme).toBe('light');
  });

  it('должен предоставлять Observable для отслеживания изменений темы', async () => {
    const themes: Theme[] = [];

    const subscription = service.theme$.subscribe((theme) => {
      themes.push(theme);
    });

    service.setTheme('dark');

    await new Promise((resolve) => setTimeout(resolve, 0));

    subscription.unsubscribe();

    expect(themes).toEqual(['light', 'dark']);
  });
});
