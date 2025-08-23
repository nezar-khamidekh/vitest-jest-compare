import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeStorageService {
  private readonly THEME_STORAGE_KEY = 'app-theme';
  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.getStoredTheme());

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
    const storedTheme = localStorage.getItem(this.THEME_STORAGE_KEY) as Theme;
    return storedTheme === 'dark' ? 'dark' : 'light';
  }

  private storeTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_STORAGE_KEY, theme);
  }
}
