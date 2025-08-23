describe('Array Operations', () => {
  describe('Array Creation', () => {
    it('should create empty array', () => {
      expect([]).toEqual([]);
    });

    it('should create array with elements', () => {
      expect([1, 2, 3]).toEqual([1, 2, 3]);
    });

    it('should create array with Array constructor', () => {
      expect(new Array(3)).toEqual([undefined, undefined, undefined]);
    });

    it('should create array with Array.from', () => {
      expect(Array.from([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should create array with spread operator', () => {
      const arr = [1, 2, 3];
      expect([...arr]).toEqual([1, 2, 3]);
    });
  });

  describe('Array Methods', () => {
    it('should push element to array', () => {
      const arr = [1, 2];
      arr.push(3);
      expect(arr).toEqual([1, 2, 3]);
    });

    it('should pop element from array', () => {
      const arr = [1, 2, 3];
      const popped = arr.pop();
      expect(popped).toBe(3);
      expect(arr).toEqual([1, 2]);
    });

    it('should shift element from array', () => {
      const arr = [1, 2, 3];
      const shifted = arr.shift();
      expect(shifted).toBe(1);
      expect(arr).toEqual([2, 3]);
    });

    it('should unshift element to array', () => {
      const arr = [2, 3];
      arr.unshift(1);
      expect(arr).toEqual([1, 2, 3]);
    });

    it('should slice array', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(arr.slice(1, 3)).toEqual([2, 3]);
    });
  });

  describe('Array Iteration', () => {
    it('should map array', () => {
      const arr = [1, 2, 3];
      const mapped = arr.map((x) => x * 2);
      expect(mapped).toEqual([2, 4, 6]);
    });

    it('should filter array', () => {
      const arr = [1, 2, 3, 4, 5];
      const filtered = arr.filter((x) => x > 3);
      expect(filtered).toEqual([4, 5]);
    });

    it('should reduce array', () => {
      const arr = [1, 2, 3, 4];
      const reduced = arr.reduce((sum, x) => sum + x, 0);
      expect(reduced).toBe(10);
    });

    it('should find element in array', () => {
      const arr = [1, 2, 3, 4, 5];
      const found = arr.find((x) => x > 3);
      expect(found).toBe(4);
    });

    it('should find index in array', () => {
      const arr = [1, 2, 3, 4, 5];
      const index = arr.findIndex((x) => x > 3);
      expect(index).toBe(3);
    });
  });

  describe('Array Sorting', () => {
    it('should sort numbers', () => {
      const arr = [3, 1, 4, 1, 5];
      expect(arr.sort()).toEqual([1, 1, 3, 4, 5]);
    });

    it('should sort strings', () => {
      const arr = ['banana', 'apple', 'cherry'];
      expect(arr.sort()).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should sort with custom comparator', () => {
      const arr = [3, 1, 4, 1, 5];
      arr.sort((a, b) => b - a);
      expect(arr).toEqual([5, 4, 3, 1, 1]);
    });
  });

  describe('Array Search', () => {
    it('should check if array includes element', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(arr.includes(3)).toBe(true);
      expect(arr.includes(6)).toBe(false);
    });

    it('should find index of element', () => {
      const arr = [1, 2, 3, 4, 5];
      expect(arr.indexOf(3)).toBe(2);
      expect(arr.indexOf(6)).toBe(-1);
    });

    it('should find last index of element', () => {
      const arr = [1, 2, 3, 2, 5];
      expect(arr.lastIndexOf(2)).toBe(3);
    });
  });
});
