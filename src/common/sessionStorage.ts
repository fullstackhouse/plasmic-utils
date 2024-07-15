export function getSessionStorageObject<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const value = sessionStorage.getItem(key);
  if (value === null) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function setSessionStorageObject<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}
