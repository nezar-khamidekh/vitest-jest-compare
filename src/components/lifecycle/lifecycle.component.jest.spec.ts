import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LifecycleComponent } from './lifecycle.component';

describe('LifecycleComponent', () => {
  let fixture: ComponentFixture<LifecycleComponent>;
  let component: LifecycleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifecycleComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(LifecycleComponent);
    component = fixture.componentInstance;

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Если компонент создается, то он должен быть определен', () => {
    expect(component).toBeTruthy();
  });

  it('Если компонент инициализируется, то статус должен измениться на "Инициализирован"', () => {
    component.ngOnInit();
    expect(component.getStatus()).toBe('Инициализирован');
  });

  it('Если вызывается updateCounter, то счетчик должен увеличиться на 5', () => {
    component.updateCounter();
    expect(component.getCounter()).toBe(5);
  });

  it('Если вызывается toggleStatus, то статус должен переключиться', () => {
    component.ngOnInit();
    component.toggleStatus();
    expect(component.getStatus()).toBe('Активен');
    component.toggleStatus();
    expect(component.getStatus()).toBe('Неактивен');
  });

  it('Если компонент уничтожается, то статус должен измениться на "Уничтожен"', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.getStatus()).toBe('Уничтожен');
  });

  it('Если срабатывает эффект, то счетчик эффектов должен увеличиться', () => {
    fixture.detectChanges();

    const initialEffectCount = component.getEffectCount();
    component.updateCounter();
    fixture.detectChanges();

    expect(component.getEffectCount()).toBeGreaterThan(initialEffectCount);
  });

  it('Если проходит время, то счетчик должен автоматически увеличиваться', () => {
    component.ngOnInit();

    const initialCount = component.getCounter();

    jest.advanceTimersByTime(1000);

    expect(component.getCounter()).toBeGreaterThan(initialCount);
  });
});

