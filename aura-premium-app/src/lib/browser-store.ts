'use client';

// Stable snapshots keep persisted demo state compatible with server rendering.
export function createBrowserStore<T>(
  key: string,
  initial: T,
  validate: (value: unknown) => value is T
) {
  let snapshot = initial;
  let raw: string | null | undefined;
  let memoryOnly = false;
  const listeners = new Set<() => void>();
  function getSnapshot(): T {
    if (typeof window === 'undefined' || memoryOnly) return snapshot;
    try {
      const next = window.localStorage.getItem(key);
      if (next !== raw) {
        raw = next;
        try {
          const value: unknown = next ? JSON.parse(next) : initial;
          snapshot = validate(value) ? value : initial;
        } catch {
          snapshot = initial;
        }
      }
    } catch {
      memoryOnly = true;
    }
    return snapshot;
  }
  function set(update: T | ((current: T) => T)) {
    snapshot =
      typeof update === 'function'
        ? (update as (current: T) => T)(getSnapshot())
        : update;
    try {
      raw = JSON.stringify(snapshot);
      window.localStorage.setItem(key, raw);
    } catch {
      memoryOnly = true;
    }
    listeners.forEach((listener) => listener());
  }
  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }
  return { getSnapshot, getServerSnapshot: () => initial, subscribe, set };
}
