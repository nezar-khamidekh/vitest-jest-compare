import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testMatch: ['**/*jest.spec.ts'],
  testEnvironment: '@happy-dom/jest-environment',
  setupFilesAfterEnv: ['<rootDir>/src/jest-test-setup.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'mjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
  watch: false,
};

export default config;
