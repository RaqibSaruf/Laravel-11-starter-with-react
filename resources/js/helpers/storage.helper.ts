export const LocalStorage = {
  set: (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
};

export const SessionStorage = {
  set: (key: string, value: unknown): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: <T>(key: string): T | null => {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  },
};

export const Cookie = {
  set: (key: string, value: unknown, expires: Date | number): void => {
    let expiresString = '';

    if (expires instanceof Date) {
      expiresString = expires.toUTCString();
    } else {
      const date = new Date();
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      expiresString = date.toUTCString();
    }

    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expiresString}; path=/`;
  },
  get: <T>(key: string): T | null => {
    const item = document.cookie.split('; ').reduce((r, c) => {
      const [keyName, value] = c.split('=');
      return keyName === key ? decodeURIComponent(value) : r;
    }, '');

    return item ? (JSON.parse(item) as T) : null;
  },
  remove: (key: string): void => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
