import { Component, OnInit, OnDestroy, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  template: `
    <div>
      <h3>Жизненный цикл: {{ status() }}</h3>
      <p>Счетчик: {{ counter() }}</p>
      <p>Эффект сработал: {{ effectTriggered() }} раз</p>
      <p>Статус активен: {{ isActive() }}</p>
      <button (click)="updateCounter()">Обновить счетчик</button>
      <button (click)="toggleStatus()">Переключить статус</button>
    </div>
  `,
})
export class LifecycleComponent implements OnInit, OnDestroy {
  status = signal('Инициализация');
  counter = signal(0);
  effectTriggered = signal(0);
  private intervalId: any;

  isActive = computed(() => this.status() === 'Активен');

  constructor() {
    effect(() => {
      const currentCounter = this.counter();
      this.effectTriggered.update((value) => value + 1);
      console.log(`Эффект сработал для счетчика: ${currentCounter}`);
    });
  }

  ngOnInit() {
    this.status.set('Инициализирован');
    this.intervalId = setInterval(() => {
      this.counter.update((value) => value + 1);
    }, 1000);
  }

  ngOnDestroy() {
    this.status.set('Уничтожен');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateCounter() {
    this.counter.update((value) => value + 5);
  }

  toggleStatus() {
    this.status.update((current) => (current === 'Активен' ? 'Неактивен' : 'Активен'));
  }

  getStatus() {
    return this.status();
  }

  getCounter() {
    return this.counter();
  }

  getEffectCount() {
    return this.effectTriggered();
  }
}
