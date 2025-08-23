import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    globals: true,
    setupFiles: ['src/vitest-test-setup.ts'],
    include: ['**/*.vitest.spec.ts'],
    environment: 'happy-dom',
    watch: false,
    reporters: ['default'],
  },
});
