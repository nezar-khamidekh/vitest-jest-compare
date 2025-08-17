import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let component: TableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('Если компонент создается, то он должен быть определен', () => {
    expect(component).toBeTruthy();
  });

  it('Если компонент инициализируется, то в таблице должно быть 3 элемента', () => {
    expect(component.getItemsCount()).toBe(3);
  });

  it('Если вызывается addItem, то количество элементов должно увеличиться', () => {
    const initialCount = component.getItemsCount();

    component.addItem();

    expect(component.getItemsCount()).toBe(initialCount + 1);
    expect(component.getLastAction()).toContain('Добавлен элемент');
  });

  it('Если вызывается deleteItem, то элемент должен удалиться из таблицы', () => {
    const initialCount = component.getItemsCount();

    component.deleteItem(1);

    expect(component.getItemsCount()).toBe(initialCount - 1);
    expect(component.getLastAction()).toBe('Удален элемент 1');
  });

  it('Если вызывается editItem, то статус элемента должен измениться', () => {
    const items = component.getItems();
    const firstItem = items.find((item) => item.id === 1);

    expect(firstItem?.status).toBe('Активен');

    component.editItem(1);
    const updatedItems = component.getItems();
    const updatedItem = updatedItems.find((item) => item.id === 1);

    expect(updatedItem?.status).toBe('Неактивен');
    expect(component.getLastAction()).toBe('Отредактирован элемент 1');
  });

  it('Если вызывается clearTable, то таблица должна очиститься', () => {
    component.clearTable();

    expect(component.getItemsCount()).toBe(0);
    expect(component.getLastAction()).toBe('Таблица очищена');
  });

  it('Если таблица отображается, то должны быть видны заголовки колонок', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('ID');
    expect(compiled.textContent).toContain('Имя');
    expect(compiled.textContent).toContain('Статус');
    expect(compiled.textContent).toContain('Действие');
  });

  it('Если в таблице есть элементы, то должны отображаться кнопки действий', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Редактировать');
    expect(compiled.textContent).toContain('Удалить');
  });
});
