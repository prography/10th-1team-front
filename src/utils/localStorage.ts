class LocalStorage {
  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export default LocalStorage;
