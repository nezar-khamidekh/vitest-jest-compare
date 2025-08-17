import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpDataComponent } from './http-data.component';

describe('HttpDataComponent', () => {
  let fixture: ComponentFixture<HttpDataComponent>;
  let component: HttpDataComponent;

  beforeEach(async () => {
    jest.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [HttpDataComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpDataComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Если компонент создается, то он должен быть определен', () => {
    expect(component).toBeTruthy();
  });

  it('Если компонент инициализируется, то должен начаться процесс загрузки', () => {
    fixture.detectChanges();

    expect(component.getLoading()).toBe(true);
  });

  it('Если загрузка завершается успешно, то должны отобразиться пользователи', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(500);

    expect(component.getLoading()).toBe(false);
    expect(component.getUsers().length).toBe(3);
    expect(component.getLastUpdate()).toBeTruthy();
  });

  it('Если вызывается addUser, то количество пользователей должно увеличиться', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(500);
    const initialCount = component.getUsers().length;

    component.addUser();

    expect(component.getUsers().length).toBe(initialCount + 1);
    expect(component.getLastUpdate()).toBeTruthy();
  });

  it('Если вызывается toggleUserStatus, то статус пользователя должен измениться', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(500);
    const users = component.getUsers();
    const firstUser = users.find((user) => user.id === 1);

    expect(firstUser?.status).toBe('Активен');

    component.toggleUserStatus(1);
    const updatedUsers = component.getUsers();
    const updatedUser = updatedUsers.find((user) => user.id === 1);

    expect(updatedUser?.status).toBe('Неактивен');
    expect(component.getLastUpdate()).toBeTruthy();
  });

  it('Если вызывается clearUsers, то список пользователей должен очиститься', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(500);

    component.clearUsers();

    expect(component.getUsers().length).toBe(0);
    expect(component.getLastUpdate()).toBeTruthy();
  });

  it('Если вызывается loadUsers повторно, то данные должны обновиться', () => {
    const fixedTime = new Date(2025, 7, 17, 18, 55, 7);
    jest.useFakeTimers({ now: fixedTime });

    fixture.detectChanges();
    jest.advanceTimersByTime(500);
    const firstUpdate = component.getLastUpdate();

    jest.advanceTimersByTime(1000);
    component.clearUsers();
    expect(component.getUsers().length).toBe(0);

    component.loadUsers();
    expect(component.getLoading()).toBe(true);

    jest.advanceTimersByTime(500);

    expect(component.getUsers().length).toBe(3);
    expect(component.getLastUpdate()).not.toBe(firstUpdate);
    jest.useRealTimers();
  });

  it('Если данные загружаются, то должно отображаться сообщение о загрузке', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Загрузка данных...');
  });

  it('Если данные загружены, то должны отображаться пользователи', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(500);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Иван Иванов');
    expect(compiled.textContent).toContain('Петр Петров');
    expect(compiled.textContent).toContain('Анна Сидорова');
  });

  it('Если список пуст, то должно отображаться сообщение об отсутствии данных', () => {
    fixture.detectChanges();

    jest.advanceTimersByTime(500);
    component.clearUsers();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Нет данных для отображения');
  });
});
