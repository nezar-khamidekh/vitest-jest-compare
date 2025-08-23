import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomNgIfDirective } from './custom-ng-if.directive';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, beforeEach, it, expect } from 'vitest';

@Component({
  template: ` <div *appCustomNgIf="isVisible">This content should be visible</div> `,
  imports: [CustomNgIfDirective],
  standalone: true,
})
class TestComponent {
  isVisible = false;
}

describe('CustomNgIfDirective', () => {
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

  it('если передать true в директиву, то должен показать содержимое', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeTruthy();
    expect(div.textContent.trim()).toBe('This content should be visible');
  });

  it('если передать false в директиву, то должен скрыть содержимое', () => {
    component.isVisible = false;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('если передать true в директиву, то должен показать содержимое', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeTruthy();
    expect(div.textContent.trim()).toBe('This content should be visible');
  });

  it('если передать false в директиву, то должен скрыть содержимое', () => {
    component.isVisible = false;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('если передать undefined в директиву, то должен скрыть содержимое', () => {
    component.isVisible = undefined as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('если передать null в директиву, то должен скрыть содержимое', () => {
    component.isVisible = null as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('если передать 0 в директиву, то должен скрыть содержимое', () => {
    component.isVisible = 0 as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('если передать пустую строку в директиву, то должен скрыть содержимое', () => {
    component.isVisible = '' as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeFalsy();
  });

  it('если передать число больше 0 в директиву, то должен показать содержимое', () => {
    component.isVisible = 1 as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeTruthy();
    expect(div.textContent.trim()).toBe('This content should be visible');
  });

  it('если передать непустую строку в директиву, то должен показать содержимое', () => {
    component.isVisible = 'hello' as any;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    const div = element.querySelector('div');
    expect(div).toBeTruthy();
    expect(div.textContent.trim()).toBe('This content should be visible');
  });
});
