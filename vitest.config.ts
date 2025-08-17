import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    globals: true,
    setupFiles: ['src/vitest-test-setup.ts'],
    include: ['**/*.vitest.spec.ts'],
    environment: 'jsdom',
    watch: false,
    reporters: ['default'],
  },
});
