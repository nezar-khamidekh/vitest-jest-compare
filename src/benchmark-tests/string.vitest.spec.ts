import { describe, it, expect } from 'vitest';

describe('String Operations', () => {
  describe('String Length', () => {
    it('should return correct length for empty string', () => {
      expect(''.length).toBe(0);
    });

    it('should return correct length for single character', () => {
      expect('a'.length).toBe(1);
    });

    it('should return correct length for word', () => {
      expect('hello'.length).toBe(5);
    });

    it('should return correct length for sentence', () => {
      expect('Hello world!'.length).toBe(12);
    });

    it('should return correct length for unicode characters', () => {
      expect('привет'.length).toBe(6);
    });
  });

  describe('String Concatenation', () => {
    it('should concatenate two strings', () => {
      expect('hello' + ' ' + 'world').toBe('hello world');
    });

    it('should concatenate with empty string', () => {
      expect('test' + '').toBe('test');
    });

    it('should concatenate multiple strings', () => {
      expect('a' + 'b' + 'c' + 'd').toBe('abcd');
    });

    it('should concatenate with numbers', () => {
      expect('number: ' + 42).toBe('number: 42');
    });

    it('should concatenate with boolean', () => {
      expect('status: ' + true).toBe('status: true');
    });
  });

  describe('String Methods', () => {
    it('should convert to uppercase', () => {
      expect('hello'.toUpperCase()).toBe('HELLO');
    });

    it('should convert to lowercase', () => {
      expect('WORLD'.toLowerCase()).toBe('world');
    });

    it('should trim whitespace', () => {
      expect('  test  '.trim()).toBe('test');
    });

    it('should replace characters', () => {
      expect('hello world'.replace('world', 'universe')).toBe('hello universe');
    });

    it('should split string', () => {
      expect('a,b,c'.split(',')).toEqual(['a', 'b', 'c']);
    });
  });

  describe('String Comparison', () => {
    it('should compare equal strings', () => {
      expect('test' === 'test').toBe(true);
    });

    it('should compare different strings', () => {
      expect('test' === 'other').toBe(false);
    });

    it('should compare case sensitive', () => {
      expect('Test' === 'test').toBe(false);
    });

    it('should compare with includes', () => {
      expect('hello world'.includes('world')).toBe(true);
    });

    it('should compare with startsWith', () => {
      expect('hello world'.startsWith('hello')).toBe(true);
    });
  });
});
