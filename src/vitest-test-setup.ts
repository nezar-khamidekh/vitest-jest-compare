import { NgModule } from '@angular/core';
import { ɵgetCleanupHook as getCleanupHook, getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { afterEach, beforeEach } from 'vitest';

// Utility function to resolve component resources
export async function resolveComponentResourcesForTest(context: string) {
  try {
    if (typeof process !== 'undefined' && process.versions?.node) {
      const { readFileSync } = await import('node:fs');
      const { ɵresolveComponentResources: resolveComponentResources } = await import(
        '@angular/core'
      );

      await resolveComponentResources((url) =>
        Promise.resolve(readFileSync(new URL(url, context), 'utf-8'))
      );
    }
  } catch {
    return;
  }
}

const providers: NgModule['providers'] = [];

beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));

@NgModule({ providers })
export class TestModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, TestModule], platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});
