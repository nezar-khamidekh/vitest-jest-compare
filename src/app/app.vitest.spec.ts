import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, beforeEach, it, expect, beforeAll } from 'vitest';
import { App } from './app';
import { resolveComponentResourcesForTest } from '../vitest-test-setup';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;

  beforeAll(async () => {
    await resolveComponentResourcesForTest(import.meta.url);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, vitest-jest-compare');
  });
});
