import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, beforeEach, it, expect } from 'vitest';

@Component({
  template: '<div appHighlight>Hover to highlight</div>',
  imports: [HighlightDirective],
  standalone: true,
})
class TestComponent {}

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divElement: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divElement = fixture.nativeElement.querySelector('div');
  });

  it('должен создать экземпляр директивы', () => {
    expect(component).toBeTruthy();
  });

  it('если навести курсор на элемент, то должен установить желтый фон', () => {
    const mouseenterEvent = new Event('mouseenter');
    divElement.dispatchEvent(mouseenterEvent);

    expect(divElement.style.backgroundColor).toBe('yellow');
  });

  it('если убрать курсор с элемента, то должен очистить фон', () => {
    const mouseenterEvent = new Event('mouseenter');
    divElement.dispatchEvent(mouseenterEvent);
    expect(divElement.style.backgroundColor).toBe('yellow');

    const mouseleaveEvent = new Event('mouseleave');
    divElement.dispatchEvent(mouseleaveEvent);

    expect(divElement.style.backgroundColor).toBe('');
  });

  it('если навести курсор на элемент несколько раз, то должен каждый раз устанавливать желтый фон', () => {
    const mouseenterEvent = new Event('mouseenter');

    divElement.dispatchEvent(mouseenterEvent);
    expect(divElement.style.backgroundColor).toBe('yellow');

    const mouseleaveEvent = new Event('mouseleave');
    divElement.dispatchEvent(mouseleaveEvent);
    expect(divElement.style.backgroundColor).toBe('');

    divElement.dispatchEvent(mouseenterEvent);
    expect(divElement.style.backgroundColor).toBe('yellow');
  });

  it('если убрать курсор с элемента несколько раз, то должен каждый раз очищать фон', () => {
    const mouseenterEvent = new Event('mouseenter');
    const mouseleaveEvent = new Event('mouseleave');

    divElement.dispatchEvent(mouseenterEvent);
    expect(divElement.style.backgroundColor).toBe('yellow');

    divElement.dispatchEvent(mouseleaveEvent);
    expect(divElement.style.backgroundColor).toBe('');

    divElement.dispatchEvent(mouseleaveEvent);
    expect(divElement.style.backgroundColor).toBe('');
  });

  it('если фон был установлен до применения директивы, то должен его перезаписать при наведении', () => {
    divElement.style.backgroundColor = 'red';
    expect(divElement.style.backgroundColor).toBe('red');

    const mouseenterEvent = new Event('mouseenter');
    divElement.dispatchEvent(mouseenterEvent);

    expect(divElement.style.backgroundColor).toBe('yellow');
  });

  it('если у элемента не было установленного фона, то должен установить желтый фон при наведении', () => {
    expect(divElement.style.backgroundColor).toBe('');

    const mouseenterEvent = new Event('mouseenter');
    divElement.dispatchEvent(mouseenterEvent);

    expect(divElement.style.backgroundColor).toBe('yellow');
  });

  it('если убрать курсор с элемента, то должен полностью очистить свойство backgroundColor', () => {
    const mouseenterEvent = new Event('mouseenter');
    const mouseleaveEvent = new Event('mouseleave');

    divElement.dispatchEvent(mouseenterEvent);
    expect(divElement.style.backgroundColor).toBe('yellow');

    divElement.dispatchEvent(mouseleaveEvent);
    expect(divElement.style.backgroundColor).toBe('');
  });
});
