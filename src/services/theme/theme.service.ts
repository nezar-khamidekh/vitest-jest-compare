import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  private readonly THEME_STORAGE_KEY = 'app-theme';
  private themeSubject: BehaviorSubject<Theme>;

  constructor() {
    const savedTheme = this.getStoredTheme();
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);
  }

  get theme$(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.storeTheme(theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  private getStoredTheme(): Theme {
    if (typeof window === 'undefined' || !window.localStorage) {
      return 'light';
    }

    try {
      const storedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
      return storedTheme === 'dark' ? 'dark' : 'light';
    } catch (error) {
      console.error('Error reading theme from localStorage:', error);
      return 'light';
    }
  }

  private storeTheme(theme: Theme): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      localStorage.setItem(this.THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }
}
