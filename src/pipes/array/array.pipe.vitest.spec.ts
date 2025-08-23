import { TestBed } from '@angular/core/testing';
import { ArrayPipe } from './array.pipe';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, beforeEach, it, expect } from 'vitest';

describe('ArrayPipe', () => {
  let pipe: ArrayPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ArrayPipe],
    });
    pipe = TestBed.inject(ArrayPipe);
  });

  it('должен создать экземпляр pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('если передать массив объектов с числовыми полями, то должен отсортировать по указанному полю в порядке возрастания', () => {
    const input = [
      { id: 3, name: 'C' },
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ];
    const result = pipe.transform(input, 'id');
    expect(result).toEqual([
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
    ]);
  });

  it('если передать пустой массив, то должен вернуть пустой массив', () => {
    const input: any[] = [];
    const result = pipe.transform(input, 'id');
    expect(result).toEqual([]);
  });

  it('если передать массив с одним элементом, то должен вернуть его без изменений', () => {
    const input = [{ id: 1, name: 'A' }];
    const result = pipe.transform(input, 'id');
    expect(result).toEqual([{ id: 1, name: 'A' }]);
  });

  it('если передать массив с отрицательными числами, то должен правильно отсортировать', () => {
    const input = [{ value: -3 }, { value: 2 }, { value: -1 }];
    const result = pipe.transform(input, 'value');
    expect(result).toEqual([{ value: -3 }, { value: -1 }, { value: 2 }]);
  });

  it('если передать null вместо массива, то должен вернуть null', () => {
    const input = null as any;
    const result = pipe.transform(input, 'id');
    expect(result).toBeNull();
  });

  it('если передать undefined вместо массива, то должен вернуть undefined', () => {
    const input = undefined as any;
    const result = pipe.transform(input, 'id');
    expect(result).toBeUndefined();
  });

  it('если передать массив с десятичными числами, то должен правильно отсортировать', () => {
    const input = [{ value: 1.5 }, { value: 0.5 }, { value: 2.1 }];
    const result = pipe.transform(input, 'value');
    expect(result).toEqual([{ value: 0.5 }, { value: 1.5 }, { value: 2.1 }]);
  });
});
