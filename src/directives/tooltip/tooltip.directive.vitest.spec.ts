import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipDirective } from './tooltip.directive';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, beforeEach, it, expect } from 'vitest';

@Component({
  template: '<button appTooltip>Hover me</button>',
  imports: [TooltipDirective],
  standalone: true,
})
class TestComponent {}

describe('TooltipDirective', () => {
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

  it('если навести курсор на элемент, то должен установить title атрибут', () => {
    const mouseenterEvent = new Event('mouseenter');
    buttonElement.dispatchEvent(mouseenterEvent);

    expect(buttonElement.title).toBe('This is a tooltip');
  });

  it('если убрать курсор с элемента, то должен очистить title атрибут', () => {
    // Сначала устанавливаем title
    const mouseenterEvent = new Event('mouseenter');
    buttonElement.dispatchEvent(mouseenterEvent);
    expect(buttonElement.title).toBe('This is a tooltip');

    // Затем убираем курсор
    const mouseleaveEvent = new Event('mouseleave');
    buttonElement.dispatchEvent(mouseleaveEvent);

    expect(buttonElement.title).toBe('');
  });

  it('если навести курсор на элемент несколько раз, то должен каждый раз устанавливать title', () => {
    const mouseenterEvent = new Event('mouseenter');

    buttonElement.dispatchEvent(mouseenterEvent);
    expect(buttonElement.title).toBe('This is a tooltip');

    // Очищаем title
    const mouseleaveEvent = new Event('mouseleave');
    buttonElement.dispatchEvent(mouseleaveEvent);
    expect(buttonElement.title).toBe('');

    // Снова наводим курсор
    buttonElement.dispatchEvent(mouseenterEvent);
    expect(buttonElement.title).toBe('This is a tooltip');
  });

  it('если убрать курсор с элемента несколько раз, то должен каждый раз очищать title', () => {
    const mouseenterEvent = new Event('mouseenter');
    const mouseleaveEvent = new Event('mouseleave');

    // Устанавливаем title
    buttonElement.dispatchEvent(mouseenterEvent);
    expect(buttonElement.title).toBe('This is a tooltip');

    // Убираем курсор первый раз
    buttonElement.dispatchEvent(mouseleaveEvent);
    expect(buttonElement.title).toBe('');

    // Убираем курсор второй раз (title уже пустой)
    buttonElement.dispatchEvent(mouseleaveEvent);
    expect(buttonElement.title).toBe('');
  });

  it('если title атрибут был установлен до применения директивы, то должен его перезаписать при наведении', () => {
    buttonElement.title = 'Original title';
    expect(buttonElement.title).toBe('Original title');

    const mouseenterEvent = new Event('mouseenter');
    buttonElement.dispatchEvent(mouseenterEvent);

    expect(buttonElement.title).toBe('This is a tooltip');
  });
});
