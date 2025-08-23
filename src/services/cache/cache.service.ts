import { Injectable } from '@angular/core';

export interface CacheItem<T> {
  value: T;
  timestamp: number;
  ttl?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();

  constructor() {}

  set<T>(key: string, value: T, ttl?: number): void {
    const item: CacheItem<T> = {
      value,
      timestamp: Date.now(),
      ttl,
    };
    this.cache.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);

    if (!item) {
      return false;
    }

    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  values(): any[] {
    return Array.from(this.cache.values()).map((item) => item.value);
  }

  entries(): [string, any][] {
    return Array.from(this.cache.entries()).map(([key, item]) => [key, item.value]);
  }

  getWithTimestamp<T>(key: string): { value: T; timestamp: number } | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (item.ttl && Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return {
      value: item.value,
      timestamp: item.timestamp,
    };
  }

  isExpired(key: string): boolean {
    const item = this.cache.get(key);

    if (!item || !item.ttl) {
      return false;
    }

    return Date.now() - item.timestamp > item.ttl;
  }

  getExpiredKeys(): string[] {
    const expiredKeys: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        expiredKeys.push(key);
      }
    }

    return expiredKeys;
  }

  cleanupExpired(): void {
    const expiredKeys = this.getExpiredKeys();
    expiredKeys.forEach((key) => this.cache.delete(key));
  }
}
