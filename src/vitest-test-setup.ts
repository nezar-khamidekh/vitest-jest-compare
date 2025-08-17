import { NgModule } from '@angular/core';
import { ɵgetCleanupHook as getCleanupHook } from '@angular/core/testing';
import { afterEach, beforeEach, beforeAll } from 'vitest';

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

beforeAll(async () => {
  try {
    if (typeof process !== 'undefined' && process.versions?.node) {
      const { readFileSync } = await import('node:fs');
      const { ɵresolveComponentResources: resolveComponentResources } = await import(
        '@angular/core'
      );

      await resolveComponentResources((url) =>
        Promise.resolve(readFileSync(new URL(url, import.meta.url), 'utf-8'))
      );
    }
  } catch {
    return;
  }
});

beforeEach(getCleanupHook(false));
afterEach(getCleanupHook(true));
