import type { RuntimeEnvironment } from './types';

/**
 * Safely detect if we're in a browser environment
 */
export function isBrowser(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.document !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * Safely detect if we're in a Node.js environment
 */
export function isNode(): boolean {
  try {
    return (
      typeof process !== 'undefined' &&
      process.versions != null &&
      process.versions.node != null
    );
  } catch {
    return false;
  }
}

/**
 * Detect the current runtime environment
 */
export function detectEnvironment(): RuntimeEnvironment {
  try {
    if (isBrowser()) {
      return 'browser';
    }
    if (isNode()) {
      return 'node';
    }
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV) {
      return process.env.NODE_ENV === 'production';
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Check if logging should be enabled by default
 */
export function shouldLogByDefault(): boolean {
  return !isProduction();
}
