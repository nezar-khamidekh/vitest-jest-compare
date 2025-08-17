import { Component, signal, computed, OnInit } from '@angular/core';
import { of, catchError, delay } from 'rxjs';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-http-data',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h3>HTTP данные</h3>

      @if (loading()) {
      <div class="loading">Загрузка данных...</div>
      } @if (error()) {
      <div class="error">Ошибка: {{ error() }}</div>
      } @if (!loading() && !error() && users().length > 0) {
      <div class="users-list">
        <h4>Пользователи:</h4>
        <ul>
          @for (user of users(); track user.id) {
          <li>
            {{ user.name }} ({{ user.email }}) - {{ user.status }}
            <button (click)="toggleUserStatus(user.id)">Изменить статус</button>
          </li>
          }
        </ul>
      </div>
      } @if (!loading() && !error() && users().length === 0) {
      <div class="no-data">Нет данных для отображения</div>
      }

      <div class="actions">
        <button (click)="loadUsers()" [disabled]="loading()">Загрузить пользователей</button>
        <button (click)="addUser()" [disabled]="loading()">Добавить пользователя</button>
        <button (click)="clearUsers()">Очистить список</button>
      </div>

      <p>Всего пользователей: {{ usersCount() }}</p>
      <p>Последнее обновление: {{ lastUpdate() || 'Нет' }}</p>
    </div>
  `,
})
export class HttpDataComponent implements OnInit {
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  lastUpdate = signal<string | null>(null);

  usersCount = computed(() => this.users().length);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    of(this.getMockUsers())
      .pipe(
        delay(500),
        catchError((err) => {
          this.error.set('Ошибка загрузки данных');
          return of([]);
        })
      )
      .subscribe((users) => {
        this.users.set(users);
        this.loading.set(false);
        this.lastUpdate.set(new Date().toLocaleString());
      });
  }

  addUser() {
    const newUser: User = {
      id: this.users().length + 1,
      name: `Пользователь ${this.users().length + 1}`,
      email: `user${this.users().length + 1}@example.com`,
      status: 'Активен',
    };

    this.users.update((users) => [...users, newUser]);
    this.lastUpdate.set(new Date().toLocaleString());
  }

  toggleUserStatus(userId: number) {
    this.users.update((users) =>
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'Активен' ? 'Неактивен' : 'Активен' }
          : user
      )
    );
    this.lastUpdate.set(new Date().toLocaleString());
  }

  clearUsers() {
    this.users.set([]);
    this.lastUpdate.set(new Date().toLocaleString());
  }

  private getMockUsers(): User[] {
    return [
      { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', status: 'Активен' },
      { id: 2, name: 'Петр Петров', email: 'petr@example.com', status: 'Неактивен' },
      { id: 3, name: 'Анна Сидорова', email: 'anna@example.com', status: 'Активен' },
    ];
  }

  getUsers() {
    return this.users();
  }

  getLoading() {
    return this.loading();
  }

  getError() {
    return this.error();
  }

  getLastUpdate() {
    return this.lastUpdate();
  }
}
