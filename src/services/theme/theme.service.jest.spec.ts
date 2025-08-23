import { TestBed } from '@angular/core/testing';
import { ThemeStorageService, Theme } from './theme.service';
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

  it('должен инициализироваться светлой темой по умолчанию', (done) => {
    service.theme$.subscribe((theme) => {
      expect(theme).toBe('light');
      done();
    });
  });

  it('должен возвращать текущую тему через currentTheme', () => {
    expect(service.currentTheme).toBe('light');
  });

  it('должен устанавливать темную тему', (done) => {
    service.setTheme('dark');

    service.theme$.subscribe((theme) => {
      expect(theme).toBe('dark');
      done();
    });
  });

  it('должен переключать тему с light на dark', (done) => {
    service.toggleTheme();

    service.theme$.subscribe((theme) => {
      expect(theme).toBe('dark');
      done();
    });
  });

  it('должен переключать тему с dark на light', (done) => {
    service.setTheme('dark');

    service.toggleTheme();

    service.theme$.subscribe((theme) => {
      expect(theme).toBe('light');
      done();
    });
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
    jest.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const newService = new ThemeStorageService();

    expect(newService.currentTheme).toBe('light');
  });

  it('должен обрабатывать ошибку при сохранении в localStorage', () => {
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    expect(() => service.setTheme('dark')).not.toThrow();
  });

  it('должен игнорировать невалидные значения из localStorage', () => {
    mockLocalStorage['app-theme'] = 'invalid-theme';

    const newService = new ThemeStorageService();

    expect(newService.currentTheme).toBe('light');
  });

  it('должен предоставлять Observable для отслеживания изменений темы', (done) => {
    const themes: Theme[] = [];

    service.theme$.subscribe((theme) => {
      themes.push(theme);

      if (themes.length === 2) {
        expect(themes).toEqual(['light', 'dark']);
        done();
      }
    });

    setTimeout(() => service.setTheme('dark'), 0);
  });
});
