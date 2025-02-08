export type TypeStorage = 'indexDB' | 'localStorage';

export type TableStorage = 'products' | 'auth' | 'cart';

export type DbNameStorage = 'products' | 'cart';

export interface Storage {
  setItem<T>(table: TableStorage, key: string, value: T, expireIn?: number): Promise<boolean>,
  getItem<T>(table: TableStorage, key: string): Promise<T | undefined>,
  removeItem(table: TableStorage, key: string): Promise<boolean>,
  clear(table?: TableStorage): Promise<boolean>,
  clearTables?: (tables: TableStorage[]) => any,
  clearAllTables?: (ignoreTables?: TableStorage[]) => any,
  getAllItemsKeyByTable?: (table: TableStorage) => Promise<string[]>,
}
