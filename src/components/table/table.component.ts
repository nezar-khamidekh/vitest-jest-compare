import { Component, signal, computed } from '@angular/core';

interface TableItem {
  id: number;
  name: string;
  status: string;
  action: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  template: `
    <div>
      <h3>Таблица данных</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Статус</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          @for (item of items(); track item.id) {
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.status }}</td>
            <td>
              <button (click)="editItem(item.id)">Редактировать</button>
              <button (click)="deleteItem(item.id)">Удалить</button>
            </td>
          </tr>
          }
        </tbody>
      </table>
      <div>
        <button (click)="addItem()">Добавить элемент</button>
        <button (click)="clearTable()">Очистить таблицу</button>
      </div>
      <p>Всего элементов: {{ itemsCount() }}</p>
      <p>Последнее действие: {{ lastAction() }}</p>
    </div>
  `,
})
export class TableComponent {
  items = signal<TableItem[]>([
    { id: 1, name: 'Элемент 1', status: 'Активен', action: 'Создан' },
    { id: 2, name: 'Элемент 2', status: 'Неактивен', action: 'Создан' },
    { id: 3, name: 'Элемент 3', status: 'Активен', action: 'Создан' },
  ]);

  lastAction = signal('Нет действий');
  nextId = signal(4);

  itemsCount = computed(() => this.items().length);

  addItem() {
    const newItem: TableItem = {
      id: this.nextId(),
      name: `Элемент ${this.nextId()}`,
      status: 'Активен',
      action: 'Создан',
    };

    this.items.update((items) => [...items, newItem]);
    this.nextId.update((id) => id + 1);
    this.lastAction.set(`Добавлен элемент ${newItem.id}`);
  }

  editItem(id: number) {
    this.items.update((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Активен' ? 'Неактивен' : 'Активен' }
          : item
      )
    );
    this.lastAction.set(`Отредактирован элемент ${id}`);
  }

  deleteItem(id: number) {
    this.items.update((items) => items.filter((item) => item.id !== id));
    this.lastAction.set(`Удален элемент ${id}`);
  }

  clearTable() {
    this.items.set([]);
    this.nextId.set(1);
    this.lastAction.set('Таблица очищена');
  }

  getItems() {
    return this.items();
  }

  getLastAction() {
    return this.lastAction();
  }

  getItemsCount() {
    return this.items().length;
  }
}
