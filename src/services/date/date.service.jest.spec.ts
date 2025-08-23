import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), DateService],
    });
    service = TestBed.inject(DateService);
  });

  it('должен создать сервис', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDate', () => {
    it('должен отформатировать дату в строку в формате DD.MM.YYYY', () => {
      const date = new Date(2023, 5, 15);
      const result = service.formatDate(date);
      expect(result).toBe('15.06.2023');
    });

    it('должен добавить ведущие нули к дням и месяцам', () => {
      const date = new Date(2023, 0, 5);
      const result = service.formatDate(date);
      expect(result).toBe('05.01.2023');
    });

    it('должен выбросить ошибку при невалидной дате', () => {
      expect(() => service.formatDate(new Date('invalid'))).toThrow('Invalid date provided');
      expect(() => service.formatDate(null as any)).toThrow('Invalid date provided');
      expect(() => service.formatDate(undefined as any)).toThrow('Invalid date provided');
    });
  });

  describe('getDaysDifference', () => {
    it('должен вернуть разницу в днях между двумя датами', () => {
      const startDate = new Date(2023, 0, 1);
      const endDate = new Date(2023, 0, 10);
      const result = service.getDaysDifference(startDate, endDate);
      expect(result).toBe(9);
    });

    it('должен вернуть 0 для одинаковых дат', () => {
      const date = new Date(2023, 0, 1);
      const result = service.getDaysDifference(date, date);
      expect(result).toBe(0);
    });

    it('должен вернуть положительное число независимо от порядка дат', () => {
      const startDate = new Date(2023, 0, 10);
      const endDate = new Date(2023, 0, 1);
      const result = service.getDaysDifference(startDate, endDate);
      expect(result).toBe(9);
    });

    it('должен игнорировать время при расчете разницы', () => {
      const startDate = new Date(2023, 0, 1, 23, 59, 59);
      const endDate = new Date(2023, 0, 2, 0, 0, 0);
      const result = service.getDaysDifference(startDate, endDate);
      expect(result).toBe(1);
    });

    it('должен выбросить ошибку при невалидных датах', () => {
      const validDate = new Date(2023, 0, 1);
      expect(() => service.getDaysDifference(new Date('invalid'), validDate)).toThrow(
        'Invalid date provided'
      );
      expect(() => service.getDaysDifference(validDate, new Date('invalid'))).toThrow(
        'Invalid date provided'
      );
      expect(() => service.getDaysDifference(null as any, validDate)).toThrow(
        'Invalid date provided'
      );
    });
  });

  describe('addDays', () => {
    it('должен добавить дни к дате', () => {
      const date = new Date(2023, 0, 1);
      const result = service.addDays(date, 5);
      expect(result.getDate()).toBe(6);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2023);
    });

    it('должен вычесть дни при отрицательном значении', () => {
      const date = new Date(2023, 0, 10);
      const result = service.addDays(date, -5);
      expect(result.getDate()).toBe(5);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2023);
    });

    it('должен корректно обрабатывать переход через месяц', () => {
      const date = new Date(2023, 0, 30);
      const result = service.addDays(date, 5);
      expect(result.getDate()).toBe(4);
      expect(result.getMonth()).toBe(1);
      expect(result.getFullYear()).toBe(2023);
    });

    it('должен корректно обрабатывать високосный год', () => {
      const date = new Date(2020, 1, 28);
      const result = service.addDays(date, 2);
      expect(result.getDate()).toBe(1);
      expect(result.getMonth()).toBe(2);
      expect(result.getFullYear()).toBe(2020);
    });

    it('должен выбросить ошибку при невалидной дате', () => {
      expect(() => service.addDays(new Date('invalid'), 5)).toThrow('Invalid date provided');
      expect(() => service.addDays(null as any, 5)).toThrow('Invalid date provided');
      expect(() => service.addDays(undefined as any, 5)).toThrow('Invalid date provided');
    });
  });
});
