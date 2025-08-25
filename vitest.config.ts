import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    globals: true,
    setupFiles: ['src/vitest-test-setup.ts'],
    include: ['**/*.vitest.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
    environment: 'happy-dom',
    watch: false,
    reporters: ['default'],
    pool: 'threads',
    isolate: true,
    poolOptions: {
      threads: {
        singleThread: true,
        isolate: true,
      },
    },
    cache: {
      dir: 'node_modules/.vitest',
    },
    maxConcurrency: 8,
    coverage: {
      enabled: false,
    },
    deps: {
      inline: ['@angular/**'],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
  },
  optimizeDeps: {
    include: [
      '@angular/core',
      '@angular/common',
      '@angular/platform-browser',
      '@angular/forms',
      '@angular/router',
      'rxjs',
    ],
    exclude: ['@angular/compiler'],
  },
});
