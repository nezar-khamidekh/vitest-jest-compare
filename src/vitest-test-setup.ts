import { NgModule } from '@angular/core';
import { ɵgetCleanupHook as getCleanupHook, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { afterEach, beforeEach, beforeAll } from 'vitest';
import { globSync } from 'glob';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let testEnvironmentInitialized = false;

beforeAll(async () => {
  try {
    if (typeof process !== 'undefined' && process.versions?.node) {
      const { ɵresolveComponentResources: resolveComponentResources } = await import(
        '@angular/core'
      );

      await resolveComponentResources((url) => {
        const cwd = process.cwd();

        if (url.startsWith('./')) {
          const relativePath = url.substring(2);

          try {
            const pattern = `src/**/${relativePath}`;
            const matches = globSync(pattern, { cwd });

            if (matches.length > 0) {
              const fullPath = resolve(cwd, matches[0]);
              return Promise.resolve(readFileSync(fullPath, 'utf-8'));
            }

            throw new Error(`Could not resolve ${url} - file not found in src directory`);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Could not resolve ${url}: ${errorMessage}`);
          }
        }

        try {
          const fullPath = new URL(url, `file://${cwd}/`).pathname;
          return Promise.resolve(readFileSync(fullPath, 'utf-8'));
        } catch (error) {
          throw new Error(`Could not resolve ${url} from root directory ${cwd}`);
        }
      });
    }
  } catch (error) {
    console.warn('Component resource resolution failed:', error);
  }
});

const providers: NgModule['providers'] = [];

beforeEach(async () => {
  getCleanupHook(false)();
});

afterEach(getCleanupHook(true));

@NgModule({ providers })
export class TestModule {}

// Инициализируем тестовое окружение только один раз
if (!testEnvironmentInitialized) {
  try {
    getTestBed().initTestEnvironment([BrowserTestingModule, TestModule], platformBrowserTesting(), {
      errorOnUnknownElements: true,
      errorOnUnknownProperties: true,
    });
    testEnvironmentInitialized = true;
  } catch (error) {
    // Если окружение уже инициализировано, игнорируем ошибку
    if (!error.message.includes('already been called')) {
      throw error;
    }
  }
}
