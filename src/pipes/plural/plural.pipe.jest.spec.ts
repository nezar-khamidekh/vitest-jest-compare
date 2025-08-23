import { TestBed } from '@angular/core/testing';
import { PluralPipe } from './plural.pipe';
import { provideZonelessChangeDetection } from '@angular/core';

describe('PluralPipe', () => {
  let pipe: PluralPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), PluralPipe],
    });
    pipe = TestBed.inject(PluralPipe);
  });

  it('должен создать экземпляр pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('если передать число 1, то должен вернуть "item"', () => {
    const result = pipe.transform(1);
    expect(result).toBe('item');
  });

  it('если передать число 0, то должен вернуть "items"', () => {
    const result = pipe.transform(0);
    expect(result).toBe('items');
  });

  it('если передать число больше 1, то должен вернуть "items"', () => {
    const result = pipe.transform(5);
    expect(result).toBe('items');
  });

  it('если передать отрицательное число, то должен вернуть "items"', () => {
    const result = pipe.transform(-3);
    expect(result).toBe('items');
  });

  it('если передать дробное число, то должен вернуть "items"', () => {
    const result = pipe.transform(2.5);
    expect(result).toBe('items');
  });
});
