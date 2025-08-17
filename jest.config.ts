import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testMatch: ['**/*jest.spec.ts'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest-test-setup.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': ['jest-preset-angular', {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    }],
  },
  moduleFileExtensions: ['ts', 'js', 'html', 'json', 'mjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!@angular|rxjs)'],
};

export default config;
