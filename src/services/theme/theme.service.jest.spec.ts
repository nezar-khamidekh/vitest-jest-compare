import { TestBed } from '@angular/core/testing';
import { ThemeStorageService } from './theme.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ThemeStorageService', () => {
  let service: ThemeStorageService;
  let localStorageSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ThemeStorageService],
    });
    service = TestBed.inject(ThemeStorageService);

    localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('light');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('setTheme', () => {
    it('должен установить темную тему и сохранить в localStorage', () => {
      service.setTheme('dark');
      expect(service.currentTheme).toBe('dark');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'dark');
    });

    it('должен установить светлую тему и сохранить в localStorage', () => {
      service.setTheme('light');
      expect(service.currentTheme).toBe('light');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'light');
    });
  });

  describe('toggleTheme', () => {
    it('должен переключить с темной на светлую тему', () => {
      service.setTheme('dark');
      localStorageSpy.mockClear();

      service.toggleTheme();

      expect(service.currentTheme).toBe('light');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'light');
    });

    it('должен переключить со светлой на темную тему', () => {
      service.setTheme('light');
      localStorageSpy.mockClear();

      service.toggleTheme();

      expect(service.currentTheme).toBe('dark');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'dark');
    });
  });
});
