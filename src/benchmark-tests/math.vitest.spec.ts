import { describe, it, expect } from 'vitest';

describe('Math Operations', () => {
  describe('Addition', () => {
    it('should add two positive numbers', () => {
      expect(2 + 3).toBe(5);
    });

    it('should add positive and negative numbers', () => {
      expect(5 + -3).toBe(2);
    });

    it('should add zero to a number', () => {
      expect(10 + 0).toBe(10);
    });

    it('should add two negative numbers', () => {
      expect(-5 + -3).toBe(-8);
    });

    it('should add decimal numbers', () => {
      expect(3.14 + 2.86).toBe(6);
    });
  });

  describe('Subtraction', () => {
    it('should subtract two positive numbers', () => {
      expect(10 - 3).toBe(7);
    });

    it('should subtract negative from positive', () => {
      expect(5 - -3).toBe(8);
    });

    it('should subtract zero from a number', () => {
      expect(10 - 0).toBe(10);
    });

    it('should subtract from zero', () => {
      expect(0 - 5).toBe(-5);
    });

    it('should subtract decimal numbers', () => {
      expect(5.5 - 2.3).toBe(3.2);
    });
  });

  describe('Multiplication', () => {
    it('should multiply two positive numbers', () => {
      expect(4 * 3).toBe(12);
    });

    it('should multiply by zero', () => {
      expect(10 * 0).toBe(0);
    });

    it('should multiply by one', () => {
      expect(7 * 1).toBe(7);
    });

    it('should multiply negative numbers', () => {
      expect(-3 * -4).toBe(12);
    });

    it('should multiply decimal numbers', () => {
      expect(2.5 * 3).toBe(7.5);
    });
  });

  describe('Division', () => {
    it('should divide two positive numbers', () => {
      expect(10 / 2).toBe(5);
    });

    it('should divide by one', () => {
      expect(15 / 1).toBe(15);
    });

    it('should handle decimal division', () => {
      expect(7 / 2).toBe(3.5);
    });

    it('should handle negative division', () => {
      expect(-10 / 2).toBe(-5);
    });

    it('should handle zero division', () => {
      expect(0 / 5).toBe(0);
    });
  });
});

