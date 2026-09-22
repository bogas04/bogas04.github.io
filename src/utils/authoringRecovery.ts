export type RecoverySnapshot<T> = {
  savedAt: string;
  value: T;
};

export function loadRecovery<T>(key: string): RecoverySnapshot<T> | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const snapshot = JSON.parse(raw) as RecoverySnapshot<T>;
    return snapshot?.value ? snapshot : null;
  } catch {
    return null;
  }
}

export function saveRecovery<T>(key: string, value: T) {
  window.localStorage.setItem(
    key,
    JSON.stringify({ savedAt: new Date().toISOString(), value }),
  );
}

export function discardRecovery(key: string) {
  window.localStorage.removeItem(key);
}
