import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, beforeEach, it, expect, beforeAll } from 'vitest';
import { CounterComponent } from './counter.component';
import { resolveComponentResourcesForTest } from '../../vitest-test-setup';

describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;
  let component: CounterComponent;

  beforeAll(async () => {
    await resolveComponentResourcesForTest(import.meta.url);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
  });

  it('Если компонент создается, то он должен быть определен', () => {
    expect(component).toBeTruthy();
  });

  it('Если компонент инициализируется, то счетчик должен быть равен 0', () => {
    expect(component.count()).toBe(0);
  });

  it('Если вызывается increment, то счетчик должен увеличиться на 1', () => {
    component.increment();
    expect(component.count()).toBe(1);
  });

  it('Если вызывается decrement, то счетчик должен уменьшиться на 1', () => {
    component.increment();
    component.increment();
    component.decrement();
    expect(component.count()).toBe(1);
  });

  it('Если вызывается reset, то счетчик должен сброситься к 0', () => {
    component.increment();
    component.increment();
    component.reset();
    expect(component.count()).toBe(0);
  });
});
