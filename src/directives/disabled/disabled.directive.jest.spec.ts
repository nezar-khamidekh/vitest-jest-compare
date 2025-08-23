import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisabledDirective } from './disabled.directive';
import { provideZonelessChangeDetection } from '@angular/core';

@Component({
  template: '<button [appDisabled]="isDisabled">Click me</button>',
  imports: [DisabledDirective],
  standalone: true,
})
class TestComponent {
  isDisabled = false;
}

describe('DisabledDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
  });

  it('должен создать экземпляр директивы', () => {
    expect(component).toBeTruthy();
  });

  it('если передать true в директиву, то должен отключить элемент', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    expect(buttonElement.disabled).toBe(true);
  });

  it('если передать false в директиву, то должен включить элемент', () => {
    component.isDisabled = false;
    fixture.detectChanges();

    expect(buttonElement.disabled).toBe(false);
  });

  it('если передать true в директиву, то должен отключить элемент', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    expect(buttonElement.disabled).toBe(true);
  });

  it('если передать false в директиву, то должен включить элемент', () => {
    component.isDisabled = false;
    fixture.detectChanges();
    expect(buttonElement.disabled).toBe(false);
  });

  it('если элемент уже был отключен, то должен сохранить состояние отключения', () => {
    buttonElement.disabled = true;
    expect(buttonElement.disabled).toBe(true);

    component.isDisabled = true;
    fixture.detectChanges();
    expect(buttonElement.disabled).toBe(true);
  });

  it('если элемент был включен, то должен включить его при передаче false', () => {
    buttonElement.disabled = false;
    expect(buttonElement.disabled).toBe(false);

    component.isDisabled = false;
    fixture.detectChanges();
    expect(buttonElement.disabled).toBe(false);
  });

  it('если передать undefined в директиву, то должен включить элемент', () => {
    component.isDisabled = undefined as any;
    fixture.detectChanges();

    expect(buttonElement.disabled).toBe(false);
  });

  it('если передать null в директиву, то должен включить элемент', () => {
    component.isDisabled = null as any;
    fixture.detectChanges();

    expect(buttonElement.disabled).toBe(false);
  });
});
