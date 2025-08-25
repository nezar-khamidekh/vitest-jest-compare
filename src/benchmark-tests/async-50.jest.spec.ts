// Симуляция асинхронных операций
function simulateAsyncOperation(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Result after ${delay}ms`);
    }, delay);
  });
}

// Симуляция работы с файлами
function simulateFileRead(filename) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Content of ${filename}`);
    }, Math.random() * 10 + 5); // 5-15ms
  });
}

// Симуляция HTTP запросов
function simulateHttpRequest(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: { url, timestamp: Date.now() },
      });
    }, Math.random() * 20 + 10); // 10-30ms
  });
}

describe('Async 50 Tests', () => {
  describe('Basic Async Operations', () => {
    for (let i = 1; i <= 25; i++) {
      it(`should handle async operation ${i}`, async () => {
        const delay = i * 2;
        const result = await simulateAsyncOperation(delay);
        expect(result).toBe(`Result after ${delay}ms`);
        expect(typeof result).toBe('string');
      });
    }
  });

  describe('File Operations', () => {
    const filenames = ['config.json', 'data.csv', 'template.html', 'styles.css', 'script.js'];

    for (let i = 0; i < 15; i++) {
      const filename = filenames[i % filenames.length];
      it(`should read file ${i + 1}`, async () => {
        const content = await simulateFileRead(filename);
        expect(content).toContain(filename);
        expect(typeof content).toBe('string');
      });
    }
  });

  describe('HTTP Requests', () => {
    const urls = [
      'https://api.example.com/users',
      'https://api.example.com/posts',
      'https://api.example.com/comments',
      'https://api.example.com/likes',
    ];

    for (let i = 0; i < 10; i++) {
      const url = urls[i % urls.length];
      it(`should make HTTP request ${i + 1}`, async () => {
        const response = await simulateHttpRequest(url);
        expect(response.status).toBe(200);
        expect(response.data.url).toBe(url);
        expect(typeof response.data.timestamp).toBe('number');
      });
    }
  });
});


