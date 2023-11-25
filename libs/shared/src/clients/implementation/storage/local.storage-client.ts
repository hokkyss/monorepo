import { injectable, singleton } from 'tsyringe';

import StorageClient from '../../abstract/storage/storage.client';

@injectable()
@singleton()
export default class LocalStorageClient extends StorageClient {
  public override async clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }

  public override async deleteItem(key: string) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  public override getItem<T>(key: string, deserialize: (value: string) => T): Promise<T | undefined>;
  public override getItem<T>(key: string, deserialize: (value: string) => T, defaultValue: T): Promise<T>;
  public override async getItem<T>(key: string, deserialize: (value: string) => T = JSON.parse, defaultValue?: T) {
    const item = localStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return deserialize(item);
  }

  public override async has(key: string) {
    return localStorage.getItem(key) !== null;
  }

  public override async setItem<T>(key: string, value: T, serialize: (value: T) => string = JSON.stringify) {
    try {
      localStorage.setItem(key, serialize(value));

      return true;
    } catch {
      return false;
    }
  }
}
