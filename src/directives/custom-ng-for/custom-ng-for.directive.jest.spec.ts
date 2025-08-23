import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomNgForDirective } from './custom-ng-for.directive';
import { provideZonelessChangeDetection } from '@angular/core';

@Component({
  template: `
    <div *appCustomNgFor="items; let item">
      {{ item.name }}
    </div>
  `,
  imports: [CustomNgForDirective],
  standalone: true,
})
class TestComponent {
  items: any[] = [];
}

describe('CustomNgForDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('должен создать экземпляр директивы', () => {
    expect(component).toBeTruthy();
  });

  it('если передать массив элементов, то должен создать представления для каждого элемента', () => {
    component.items = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const divs = element.querySelectorAll('div');
    expect(divs.length).toBe(3);
    expect(divs[0].textContent.trim()).toBe('Item 1');
    expect(divs[1].textContent.trim()).toBe('Item 2');
    expect(divs[2].textContent.trim()).toBe('Item 3');
  });

  it('если передать пустой массив, то не должен создавать представления', () => {
    component.items = [];
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const divs = element.querySelectorAll('div');
    expect(divs.length).toBe(0);
  });

  it('если передать null или undefined, то не должен создавать представления', () => {
    component.items = null as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const divs = element.querySelectorAll('div');
    expect(divs.length).toBe(0);
  });

  it('если передать один элемент в массив, то должен создать одно представление', () => {
    component.items = [{ name: 'Item 1' }];
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const divs = element.querySelectorAll('div');
    expect(divs.length).toBe(1);
    expect(divs[0].textContent.trim()).toBe('Item 1');
  });

  it('если передать два элемента в массив, то должен создать два представления', () => {
    component.items = [{ name: 'New Item' }, { name: 'Another Item' }];
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const divs = element.querySelectorAll('div');
    expect(divs.length).toBe(2);
    expect(divs[0].textContent.trim()).toBe('New Item');
    expect(divs[1].textContent.trim()).toBe('Another Item');
  });

  it('если передать массив с объектами, то должен предоставить доступ к свойствам объектов', () => {
    component.items = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
    ];
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const divs = element.querySelectorAll('div');
    expect(divs.length).toBe(2);
    expect(divs[0].textContent.trim()).toBe('John');
    expect(divs[1].textContent.trim()).toBe('Jane');
  });
});
