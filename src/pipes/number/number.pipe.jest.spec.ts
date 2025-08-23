import { TestBed } from '@angular/core/testing';
import { NumberPipe } from './number.pipe';
import { provideZonelessChangeDetection } from '@angular/core';

describe('NumberPipe', () => {
  let pipe: NumberPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), NumberPipe],
    });
    pipe = TestBed.inject(NumberPipe);
  });

  it('должен создать экземпляр pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('если передать целое положительное число, то должен преобразовать в строку', () => {
    const result = pipe.transform(42);
    expect(result).toBe('42');
  });

  it('если передать отрицательное число, то должен преобразовать в строку', () => {
    const result = pipe.transform(-15);
    expect(result).toBe('-15');
  });

  it('если передать ноль, то должен преобразовать в строку', () => {
    const result = pipe.transform(0);
    expect(result).toBe('0');
  });

  it('если передать десятичное число, то должен преобразовать в строку', () => {
    const result = pipe.transform(3.14);
    expect(result).toBe('3.14');
  });

  it('если передать большое число, то должен преобразовать в строку', () => {
    const result = pipe.transform(1000000);
    expect(result).toBe('1000000');
  });
});
