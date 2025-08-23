import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Если сервис кэширования работает, то', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), CacheService],
    });
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    service.clear();
  });

  describe('если данные сохраняются и извлекаются, то', () => {
    it('should set and get a value', () => {
      const key = 'test-key';
      const value = { data: 'test-data' };

      service.set(key, value);
      const result = service.get(key);

      expect(result).toEqual(value);
    });

    it('should return null for non-existent key', () => {
      const result = service.get('non-existent');
      expect(result).toBeNull();
    });

    it('should handle different data types', () => {
      const stringValue = 'test-string';
      const numberValue = 42;
      const objectValue = { key: 'value' };
      const arrayValue = [1, 2, 3];

      service.set('string', stringValue);
      service.set('number', numberValue);
      service.set('object', objectValue);
      service.set('array', arrayValue);

      expect(service.get('string')).toBe(stringValue);
      expect(service.get('number')).toBe(numberValue);
      expect(service.get('object')).toEqual(objectValue);
      expect(service.get('array')).toEqual(arrayValue);
    });
  });

  describe('если используется TTL функциональность, то', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should expire items after TTL', () => {
      const key = 'expiring-key';
      const value = 'test-value';
      const ttl = 1000;

      service.set(key, value, ttl);
      expect(service.get(key)).toBe(value);

      jest.advanceTimersByTime(1001);
      expect(service.get(key)).toBeNull();
    });

    it('should not expire items without TTL', () => {
      const key = 'non-expiring-key';
      const value = 'test-value';

      service.set(key, value);
      expect(service.get(key)).toBe(value);

      jest.advanceTimersByTime(10000);
      expect(service.get(key)).toBe(value);
    });

    it('should handle TTL in has method', () => {
      const key = 'expiring-key';
      const value = 'test-value';
      const ttl = 1000;

      service.set(key, value, ttl);
      expect(service.has(key)).toBe(true);

      jest.advanceTimersByTime(1001);
      expect(service.has(key)).toBe(false);
    });
  });

  describe('если проверяется наличие ключа, то', () => {
    it('should return true for existing key', () => {
      const key = 'test-key';
      service.set(key, 'value');
      expect(service.has(key)).toBe(true);
    });

    it('should return false for non-existing key', () => {
      expect(service.has('non-existent')).toBe(false);
    });
  });

  describe('если удаляется ключ, то', () => {
    it('should delete existing key', () => {
      const key = 'test-key';
      service.set(key, 'value');
      expect(service.has(key)).toBe(true);

      const result = service.delete(key);
      expect(result).toBe(true);
      expect(service.has(key)).toBe(false);
    });

    it('should return false for non-existing key', () => {
      const result = service.delete('non-existent');
      expect(result).toBe(false);
    });
  });

  describe('если очищается кэш, то', () => {
    it('should clear all items', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');
      expect(service.size()).toBe(2);

      service.clear();
      expect(service.size()).toBe(0);
      expect(service.get('key1')).toBeNull();
      expect(service.get('key2')).toBeNull();
    });
  });

  describe('если проверяется размер кэша, то', () => {
    it('should return correct size', () => {
      expect(service.size()).toBe(0);

      service.set('key1', 'value1');
      expect(service.size()).toBe(1);

      service.set('key2', 'value2');
      expect(service.size()).toBe(2);

      service.delete('key1');
      expect(service.size()).toBe(1);
    });
  });

  describe('если получаются все ключи, то', () => {
    it('should return all keys', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');
      service.set('key3', 'value3');

      const keys = service.keys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
      expect(keys).toHaveLength(3);
    });

    it('should return empty array when cache is empty', () => {
      const keys = service.keys();
      expect(keys).toEqual([]);
    });
  });

  describe('если получаются все значения, то', () => {
    it('should return all values', () => {
      const value1 = { id: 1, name: 'test1' };
      const value2 = { id: 2, name: 'test2' };

      service.set('key1', value1);
      service.set('key2', value2);

      const values = service.values();
      expect(values).toContain(value1);
      expect(values).toContain(value2);
      expect(values).toHaveLength(2);
    });
  });

  describe('если получаются все пары ключ-значение, то', () => {
    it('should return all key-value pairs', () => {
      const value1 = { id: 1, name: 'test1' };
      const value2 = { id: 2, name: 'test2' };

      service.set('key1', value1);
      service.set('key2', value2);

      const entries = service.entries();
      expect(entries).toContainEqual(['key1', value1]);
      expect(entries).toContainEqual(['key2', value2]);
      expect(entries).toHaveLength(2);
    });
  });

  describe('если получается значение с временной меткой, то', () => {
    it('should return value with timestamp', () => {
      const key = 'test-key';
      const value = 'test-value';

      service.set(key, value);
      const result = service.getWithTimestamp(key);

      expect(result).toEqual({
        value,
        timestamp: expect.any(Number),
      });
    });

    it('should return null for non-existent key', () => {
      const result = service.getWithTimestamp('non-existent');
      expect(result).toBeNull();
    });

    it('should handle TTL in getWithTimestamp', () => {
      jest.useFakeTimers();
      const key = 'expiring-key';
      const value = 'test-value';
      const ttl = 1000;

      service.set(key, value, ttl);
      const result = service.getWithTimestamp(key);
      expect(result).not.toBeNull();

      jest.advanceTimersByTime(1001);
      const expiredResult = service.getWithTimestamp(key);
      expect(expiredResult).toBeNull();

      jest.useRealTimers();
    });
  });

  describe('если проверяется истечение срока действия, то', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return false for non-expiring items', () => {
      const key = 'non-expiring';
      service.set(key, 'value');
      expect(service.isExpired(key)).toBe(false);
    });

    it('should return false for non-existent items', () => {
      expect(service.isExpired('non-existent')).toBe(false);
    });

    it('should return true for expired items', () => {
      const key = 'expiring';
      const ttl = 1000;
      service.set(key, 'value', ttl);

      jest.advanceTimersByTime(1001);
      expect(service.isExpired(key)).toBe(true);
    });

    it('should return false for non-expired items', () => {
      const key = 'expiring';
      const ttl = 1000;
      service.set(key, 'value', ttl);

      jest.advanceTimersByTime(500);
      expect(service.isExpired(key)).toBe(false);
    });
  });

  describe('если получаются истекшие ключи, то', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return expired keys', () => {
      service.set('expired1', 'value1', 1000);
      service.set('expired2', 'value2', 1000);
      service.set('valid', 'value3', 5000);
      service.set('no-ttl', 'value4');

      jest.advanceTimersByTime(1001);

      const expiredKeys = service.getExpiredKeys();
      expect(expiredKeys).toContain('expired1');
      expect(expiredKeys).toContain('expired2');
      expect(expiredKeys).not.toContain('valid');
      expect(expiredKeys).not.toContain('no-ttl');
    });

    it('should return empty array when no expired keys', () => {
      service.set('valid1', 'value1', 5000);
      service.set('valid2', 'value2');

      const expiredKeys = service.getExpiredKeys();
      expect(expiredKeys).toEqual([]);
    });
  });

  describe('если очищаются истекшие элементы, то', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should remove expired items', () => {
      service.set('expired1', 'value1', 1000);
      service.set('expired2', 'value2', 1000);
      service.set('valid', 'value3', 5000);
      service.set('no-ttl', 'value4');

      expect(service.size()).toBe(4);

      jest.advanceTimersByTime(1001);
      service.cleanupExpired();

      expect(service.size()).toBe(2);
      expect(service.get('expired1')).toBeNull();
      expect(service.get('expired2')).toBeNull();
      expect(service.get('valid')).toBe('value3');
      expect(service.get('no-ttl')).toBe('value4');
    });
  });
});
