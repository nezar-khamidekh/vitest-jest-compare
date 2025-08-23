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
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false,
        isolate: false,
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
