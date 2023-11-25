import { injectable, singleton } from 'tsyringe';

import StorageClient from '../../abstract/storage/storage.client';

@injectable()
@singleton()
export default class SessionStorageClient extends StorageClient {
  public override async clear() {
    try {
      sessionStorage.clear();
      return true;
    } catch {
      return false;
    }
  }

  public override async deleteItem(key: string) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  public override getItem<T>(key: string, deserialize: (value: string) => T): Promise<T | undefined>;
  public override getItem<T>(key: string, deserialize: (value: string) => T, defaultValue: T): Promise<T>;
  public override async getItem<T>(key: string, deserialize: (value: string) => T = JSON.parse, defaultValue?: T) {
    const item = sessionStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return deserialize(item) as T;
  }

  public override async has(key: string) {
    return sessionStorage.getItem(key) !== null;
  }

  public override async setItem<T>(key: string, value: T, serialize: (value: T) => string = JSON.stringify) {
    try {
      sessionStorage.setItem(key, serialize(value));

      return true;
    } catch {
      return false;
    }
  }
}
