import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testMatch: ['**/*jest.spec.ts'],
  testEnvironment: '@happy-dom/jest-environment',
  setupFilesAfterEnv: ['<rootDir>/src/jest-test-setup.ts'],
  maxWorkers: '50%',
  maxConcurrency: 8,
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  collectCoverage: false,
  transform: {
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
        diagnostics: false,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'mjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  watch: false,
  bail: false,
  verbose: false,
  testTimeout: 10000,
  detectOpenHandles: false,
  forceExit: true,
  clearMocks: false,
  restoreMocks: false,
};

export default config;
