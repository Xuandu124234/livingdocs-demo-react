/**
 * Small helpers around the browser storage API.
 */

/**
 * Read a JSON value from local storage.
 */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * Write a JSON value to local storage.
 */
export function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (private mode, quota) — ignore silently.
  }
}

/**
 * Remove a key from local storage.
 */
export function removeKey(key: string): void {
  window.localStorage.removeItem(key);
}
