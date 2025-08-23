import { TestBed } from '@angular/core/testing';
import { StringPipe } from './string.pipe';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, beforeEach, it, expect } from 'vitest';

describe('StringPipe', () => {
  let pipe: StringPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), StringPipe],
    });
    pipe = TestBed.inject(StringPipe);
  });

  it('должен создать экземпляр pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('если передать строку в нижнем регистре, то должен преобразовать в верхний регистр', () => {
    const result = pipe.transform('hello');
    expect(result).toBe('HELLO');
  });

  it('если передать строку в смешанном регистре, то должен преобразовать в верхний регистр', () => {
    const result = pipe.transform('Hello World');
    expect(result).toBe('HELLO WORLD');
  });

  it('если передать пустую строку, то должен вернуть пустую строку', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('если передать строку с числами и символами, то должен преобразовать буквы в верхний регистр', () => {
    const result = pipe.transform('hello123!@#');
    expect(result).toBe('HELLO123!@#');
  });

  it('если передать уже строку в верхнем регистре, то должен вернуть ее без изменений', () => {
    const result = pipe.transform('HELLO');
    expect(result).toBe('HELLO');
  });
});
