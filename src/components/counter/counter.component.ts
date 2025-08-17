import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div>
      <h2>Счетчик: {{ count() }}</h2>
      <p>Счетчик четный: {{ isEven() }}</p>
      <p>Счетчик положительный: {{ isPositive() }}</p>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Сброс</button>
    </div>
  `,
})
export class CounterComponent {
  count = signal(0);

  isEven = computed(() => this.count() % 2 === 0);
  isPositive = computed(() => this.count() > 0);

  increment() {
    this.count.update((value) => value + 1);
  }

  decrement() {
    this.count.update((value) => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
