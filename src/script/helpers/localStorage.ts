export class LocalStorage {
  /**
   * Get data from localStorage
   * @param {*} key - Key you want to retrieve data
   * @returns - Return list items of key
   */
  static getItem<T>(key: string): T {
    const localStorageData = localStorage.getItem(key);

    return localStorageData ? JSON.parse(localStorageData) : '';
  }

  /**
   * Push an item data to current list
   * @param {*} key - Key you want to retrieve data
   * @param {*} item - Data you want to push key
   */
  static setItem<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Remove data from localStorage
   * @param {*} key - Key you want to retrieve data
   * @returns - Return updated data
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear all data from localStorage
   * @returns - Return updated data
   */
  static clear(): void {
    localStorage.clear();
  }
}
