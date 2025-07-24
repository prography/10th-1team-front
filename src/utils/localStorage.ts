class LocalStorage {
  static getItem(key: string) {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem(key);
  }

  static setItem(key: string, value: string) {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(key, value);
  }

  static removeItem(key: string) {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.removeItem(key);
  }

  static clear() {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.clear();
  }
}

export default LocalStorage;
