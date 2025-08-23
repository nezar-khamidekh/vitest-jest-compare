import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ThemeStorageService } from './theme.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ThemeStorageService', () => {
  let service: ThemeStorageService;
  let localStorageSpy: any;
  let localStorageGetItemSpy: any;

  beforeEach(() => {
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue('light'),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    localStorageSpy = vi.spyOn(localStorageMock, 'setItem');
    localStorageGetItemSpy = vi.spyOn(localStorageMock, 'getItem');

    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ThemeStorageService],
    });
    service = TestBed.inject(ThemeStorageService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('setTheme', () => {
    it('должен установить темную тему и сохранить в localStorage', () => {
      service.setTheme('dark');
      expect(service.currentTheme).toBe('dark');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'dark');
    });

    it('должен установить светлую тему и сохранить в localStorage', () => {
      service.setTheme('dark');
      localStorageSpy.mockReset();

      service.setTheme('light');
      expect(service.currentTheme).toBe('light');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'light');
    });
  });

  describe('toggleTheme', () => {
    it('должен переключить с темной на светлую тему', () => {
      service.setTheme('dark');
      localStorageSpy.mockReset();

      service.toggleTheme();

      expect(service.currentTheme).toBe('light');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'light');
    });

    it('должен переключить со светлой на темную тему', () => {
      service.setTheme('light');
      localStorageSpy.mockReset();

      service.toggleTheme();

      expect(service.currentTheme).toBe('dark');
      expect(localStorageSpy).toHaveBeenCalledWith('app-theme', 'dark');
    });
  });
});
